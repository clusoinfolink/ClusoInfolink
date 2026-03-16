import { z } from 'zod';

export const contactDepartments = ['sales', 'hr', 'marketing', 'others'] as const;

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  companyName: z.string().max(150).optional(),
  phone: z.string().max(20).optional(),
  subject: z.string().max(200).optional(),
  department: z.enum(contactDepartments).default('others'),
  message: z.string().min(1, 'Message is required').max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
