import crypto from 'crypto';

export function generateBase32Secret(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < bytes.length; i++) {
    secret += chars[bytes[i] % chars.length];
  }
  return secret;
}

function base32ToHex(base32: string) {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (let i = 0; i < base32.length; i++) {
    const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += val.toString(2).padStart(5, '0');
  }
  let hex = '';
  for (let i = 0; i + 4 <= bits.length; i += 4) {
    hex += parseInt(bits.substr(i, 4), 2).toString(16);
  }
  return hex;
}

export function totpToken(secret: string, window = 0) {
  const key = Buffer.from(base32ToHex(secret), 'hex');
  const epoch = Math.floor(Date.now() / 1000 / 30) + window;
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(epoch));
  const hmac = crypto.createHmac('sha1', key).update(msg).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = ((hmac.readUInt32BE(offset) & 0x7fffffff) % 1000000).toString();
  return code.padStart(6, '0');
}

export function verifyTotp(secret: string, token: string, window = 1) {
  for (let w = -window; w <= window; w++) {
    if (totpToken(secret, w) === token) return true;
  }
  return false;
}

export function otpauthURI(secret: string, label: string, issuer = 'RHC') {
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
}
