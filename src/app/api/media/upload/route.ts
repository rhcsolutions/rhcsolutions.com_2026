import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

// Ensure images directory exists
if (!fs.existsSync(PUBLIC_IMAGES)) {
  fs.mkdirSync(PUBLIC_IMAGES, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 });
    }

    // Parse multipart form data manually
    const buffer = await request.arrayBuffer();
    const boundary = contentType.split('boundary=')[1];
    
    if (!boundary) {
      return NextResponse.json({ error: 'Invalid multipart boundary' }, { status: 400 });
    }

    const parts = parseMultipart(Buffer.from(buffer), boundary);
    
    // Find file part
    const filePart = parts.find(p => p.filename);
    if (!filePart) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Sanitize filename
    const filename = sanitizeFilename(filePart.filename);
    const fileExt = path.extname(filename);
    const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    if (!allowedExts.includes(fileExt.toLowerCase())) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
    }

    // Save file
    const filepath = path.join(PUBLIC_IMAGES, filename);
    fs.writeFileSync(filepath, filePart.body);

    // Add to media.json
    const mediaItem = CMSDatabase.addMedia({
      filename,
      url: `/images/${filename}`,
      type: 'image',
      size: filePart.body.length,
      alt: filePart.formFields?.alt || '',
      caption: filePart.formFields?.caption || ''
    });

    return NextResponse.json(mediaItem, { status: 201 });
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// Simple multipart parser
function parseMultipart(buffer: Buffer, boundary: string) {
  const parts: Array<{
    filename?: string;
    body: Buffer;
    formFields?: Record<string, string>;
  }> = [];

  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const endBoundaryBuffer = Buffer.from(`--${boundary}--`);
  
  let start = 0;
  let end = buffer.indexOf(boundaryBuffer);

  while (end !== -1) {
    const part = buffer.slice(start + boundaryBuffer.length, end);
    
    if (part.length > 2) {
      const { headers, body } = extractPart(part);
      
      if (headers['content-disposition']) {
        const filename = extractFilename(headers['content-disposition']);
        if (filename) {
          parts.push({ filename, body });
        }
      }
    }

    start = end + boundaryBuffer.length;
    end = buffer.indexOf(boundaryBuffer, start);

    if (buffer.indexOf(endBoundaryBuffer, start) === start) {
      break;
    }
  }

  return parts;
}

function extractPart(buffer: Buffer) {
  const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'));
  if (headerEnd === -1) return { headers: {}, body: Buffer.alloc(0) };

  const headerStr = buffer.slice(0, headerEnd).toString('utf-8');
  const body = buffer.slice(headerEnd + 4);

  // Remove trailing CRLF
  const bodyTrimmed = body.slice(0, Math.max(0, body.length - 2));

  const headers: Record<string, string> = {};
  headerStr.split('\r\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length > 0) {
      headers[key.toLowerCase().trim()] = rest.join(':').trim();
    }
  });

  return { headers, body: bodyTrimmed };
}

function extractFilename(dispositionHeader: string): string | null {
  const match = dispositionHeader.match(/filename="?([^";\r\n]+)"?/i);
  return match ? match[1] : null;
}

function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  return filename
    .replace(/[\/\\]/g, '')
    .replace(/\.\./g, '')
    .replace(/[<>:"|?*]/g, '')
    .substring(0, 255);
}
