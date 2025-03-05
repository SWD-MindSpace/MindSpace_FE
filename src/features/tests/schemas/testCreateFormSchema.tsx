import { z } from 'zod'

export const testCreateFormSchema = z.object({
    id: z.number(),
    title: z.string(),
    testCode: z.string(),
    description: z.string(),
    testCategoryId: z.number(),
    authorId: z.number(),
    specializationId: z.number(),
    questionCount: z.number(),
    price: z.number(),
    targetUser: z.string(),
    questionItems: z.array(z.object({
        id: z.number(),
        content: z.string(),
        questionOptions: z.array(z.object({
            id: z.number(),
            displayedText: z.string()
        }))
    }))
})

export type TestCreateForm = z.infer<typeof testCreateFormSchema>