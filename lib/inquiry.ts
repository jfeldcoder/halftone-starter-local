import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(1, "Please add your name.").max(120),
  email: z.string().email("Please add a valid email."),
  phone: z.string().max(40).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(1, "Tell us a little about what you are after.").max(2000),
  // Honeypot — real users leave this empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type Inquiry = z.infer<typeof InquirySchema>;
