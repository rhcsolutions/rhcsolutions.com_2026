// Password Hashing Utility
// Run this to generate hashed passwords for new admin users

import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Example: Generate hash for "admin123"
async function generateExampleHash() {
  const password = 'admin123';
  const hash = await hashPassword(password);
  
  console.log('\n=== Password Hash Generator ===\n');
  console.log(`Password: ${password}`);
  console.log(`Hashed:   ${hash}\n`);
  console.log('Copy this hash to src/lib/auth/config.ts in the users array\n');
}

// Run if called directly
if (require.main === module) {
  generateExampleHash();
}

export { hashPassword };
