import { accountSchema } from '@/features/accounts/common/schemas/AccountSchema'
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
    author: accountSchema
})

export type Test = z.infer<typeof testSchema>