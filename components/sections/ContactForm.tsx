'use client';

import React, { useState } from 'react';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { Send } from 'lucide-react';
import { contactDepartments, contactFormSchema } from '@/lib/validations/contact';

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
    subject: '',
    department: 'others' as (typeof contactDepartments)[number],
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', companyName: '', phone: '', subject: '', department: 'others', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="glass p-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

          {status === 'success' && (
            <div className="bg-cluso-green/10 text-cluso-green border border-cluso-green/20 rounded-xl p-4 mb-6">
              Thank you! Your message has been sent successfully.
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 mb-6">
              Something went wrong. Please try again later.
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <GlassInput
                label="Name *"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <GlassInput
                label="Email *"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassInput
              label="Company name"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Your company"
            />
            <GlassInput
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <GlassInput
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50 focus:border-cluso-mid/50 transition-all"
            >
              {contactDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'hr' ? 'HR' : dept.charAt(0).toUpperCase() + dept.slice(1)}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cluso-mid/50 focus:border-cluso-mid/50 transition-all resize-none"
              placeholder="Tell us about your requirements..."
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            className="flex items-center gap-2"
            disabled={status === 'sending'}
          >
            <Send size={16} />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </GlassButton>
        </form>
      </div>
    </div>
  );
}
