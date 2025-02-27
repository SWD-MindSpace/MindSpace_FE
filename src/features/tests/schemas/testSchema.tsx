import { z } from 'zod'

export const testSchema = z.object({
    id: z.number(),
    title: z.string(),
    testCode: z.string(),
    testCategory: z.object({
        id: z.number(),
        name: z.string()
    }).optional(),
    specializationId: z.object({
        id: z.number(),
        name: z.string()
    }).optional(),
    targetUser: z.string(),
    description: z.string(),
    questionCount: z.number(),
    price: z.number(),
    author: z.object({
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
    }).optional()
})

export type Test = z.infer<typeof testSchema>