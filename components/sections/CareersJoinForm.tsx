'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';

type FormState = {
  name: string;
  email: string;
  phone: string;
};

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

export function CareersJoinForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleResumeChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setResume(file);
    setErrors((prev) => ({ ...prev, resume: '' }));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    } else if (!isValidPhone(form.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number';
    }

    if (!resume) {
      nextErrors.resume = 'Resume is required';
    } else {
      if (!isAllowedResumeFile(resume)) {
        nextErrors.resume = 'Only PDF files are allowed';
      } else if (resume.size > MAX_RESUME_BYTES) {
        nextErrors.resume = 'Resume must be smaller than 5MB';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!validate()) return;
    if (!resume) return;

    setStatus('sending');

    const payload = new FormData();
    payload.append('name', form.name.trim());
    payload.append('email', form.email.trim());
    payload.append('phone', form.phone.trim());
    payload.append('resume', resume);

    try {
      const response = await fetch('/api/candidate-requests', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setMessage(typeof data.error === 'string' ? data.error : 'Failed to submit request. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setMessage('Thank you! Your application has been submitted.');
      setForm({ name: '', email: '', phone: '' });
      setResume(null);
      setErrors({});
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="glass p-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">Join Us</h2>
        <p className="text-sm text-gray-600 mb-6">
          Share your details and resume. Our team will reach out if your profile matches our requirements.
        </p>

        {status === 'success' && (
          <div className="bg-cluso-green/10 text-cluso-green border border-cluso-green/20 rounded-xl p-4 mb-6">
            {message}
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 mb-6">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <GlassInput
              label="Name *"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <GlassInput
              label="Email *"
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <GlassInput
              label="Phone Number *"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF, max 5MB) *</label>
            <input
              type="file"
              name="resume"
              onChange={handleResumeChange}
              accept=".pdf,application/pdf"
              className="w-full bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50 focus:border-cluso-mid/50 transition-all"
            />
            {resume && <p className="text-xs text-gray-500 mt-2">Selected: {resume.name}</p>}
            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
          </div>

          <GlassButton type="submit" variant="primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Submitting...' : 'Submit Application'}
          </GlassButton>
        </form>
      </div>
    </div>
  );
}
