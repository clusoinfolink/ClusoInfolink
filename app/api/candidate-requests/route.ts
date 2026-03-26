import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CandidateRequest from '@/lib/models/CandidateRequest';
import CandidateRequestDocument from '@/lib/models/CandidateRequestDocument';

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const allowedResumeMimeTypes = new Set([
  'application/pdf',
]);

const allowedResumeExtensions = ['.pdf'];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function isAllowedResumeFile(file: File) {
  if (allowedResumeMimeTypes.has(file.type)) return true;
  const lower = file.name.toLowerCase();
  return allowedResumeExtensions.some((ext) => lower.endsWith(ext));
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const resumeEntry = formData.get('resume');

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    if (!(resumeEntry instanceof File) || !resumeEntry.name || resumeEntry.size <= 0) {
      return NextResponse.json({ error: 'Resume document is required' }, { status: 400 });
    }

    if (resumeEntry.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: 'Resume must be smaller than 5MB' }, { status: 400 });
    }

    if (!isAllowedResumeFile(resumeEntry)) {
      return NextResponse.json({ error: 'Only PDF resumes are allowed' }, { status: 400 });
    }

    await dbConnect();

    const resumeDocument = await CandidateRequestDocument.create({
      filename: resumeEntry.name,
      mimeType: resumeEntry.type || 'application/octet-stream',
      size: resumeEntry.size,
      data: Buffer.from(await resumeEntry.arrayBuffer()),
    });

    const candidate = await CandidateRequest.create({
      name,
      email,
      phone,
      resumeDocumentId: resumeDocument._id,
      resumeFileName: resumeEntry.name,
      read: false,
    });

    return NextResponse.json({ success: true, id: candidate._id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
