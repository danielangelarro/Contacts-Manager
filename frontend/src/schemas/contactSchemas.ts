import { z } from 'zod';


export const contactSchema = z.object({
  firstName: z.string().min(1, "The first name is required"),
  lastName: z.string().min(1, "The last name is required"),
  email: z.string().email("The email is not valid"),
  phone: z.string().min(1, "The  phone is required"),
  company: z.string().min(1, "The company is required"),
  position: z.string().min(1, "The position is required"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
});
