import { z } from 'zod'

export const accountTableSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    fullName: z.string(),
    phoneNumber: z.string().nullable(),
    userName: z.string(),
    dateOfBirth: z.string(),
    status: z.string(),
})

export type AccountTableData = z.infer<typeof accountTableSchema>