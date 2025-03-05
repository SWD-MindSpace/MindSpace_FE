import { z } from 'zod'

export const accountSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    fullName: z.string(),
    phoneNumber: z.string().nullable(),
    userName: z.string(),
    dateOfBirth: z.string(),
    imageUrl: z.string().nullable(),
    status: z.string(),
    role: z.string().nullable(),
    school: z.string().nullable()
})

export type Account = z.infer<typeof accountSchema>