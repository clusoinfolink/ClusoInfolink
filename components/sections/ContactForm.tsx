'use client';

import React, { useState } from 'react';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { contactFormSchema } from '@/lib/validations/contact';

interface ContactFormProps {
  contactEmail: string;
  contactPhone: string;
  address: string;
  siteName: string;
}

export function ContactForm({ contactEmail, contactPhone, address, siteName }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Form */}
      <div className="lg:col-span-2">
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
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />
              <GlassInput
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="How can we help?"
              />
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

      {/* Sidebar Info */}
      <div className="space-y-6">
        {contactEmail && (
          <div className="glass p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cluso-deep/10 flex items-center justify-center shrink-0">
                <Mail className="text-cluso-deep" size={18} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 mb-1">Email</h3>
                <a href={`mailto:${contactEmail}`} className="text-cluso-deep hover:text-cluso-mid transition-colors text-sm">
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>
        )}

        {contactPhone && (
          <div className="glass p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cluso-deep/10 flex items-center justify-center shrink-0">
                <Phone className="text-cluso-deep" size={18} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-600 text-sm">{contactPhone}</p>
              </div>
            </div>
          </div>
        )}

        {(address || siteName) && (
          <div className="glass p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cluso-deep/10 flex items-center justify-center shrink-0">
                <MapPin className="text-cluso-deep" size={18} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 mb-1">Office</h3>
                <p className="text-gray-600 text-sm">
                  {siteName && <>{siteName}<br /></>}
                  {address}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
