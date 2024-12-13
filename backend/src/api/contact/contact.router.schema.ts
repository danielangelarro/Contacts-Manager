import { z } from "zod";

export const contactCreateSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    company: z.string().min(1, { message: "Company name is required" }),
    position: z.string().min(1, { message: "Position is required" }),
    status: z.enum(["New", "Contacted", "Qualified", "Lost"], { message: "Status is required" }),
});

export const contactUpdateSchema = z.object({
    id: z.number().min(1, { message: "Id is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    company: z.string().min(1, { message: "Company name is required" }),
    position: z.string().min(1, { message: "Position is required" }),
    status: z.enum(["New", "Contacted", "Qualified", "Lost"], { message: "Status is required" }),
});
