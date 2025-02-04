import z from "zod";

export const emailVerificationSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
});