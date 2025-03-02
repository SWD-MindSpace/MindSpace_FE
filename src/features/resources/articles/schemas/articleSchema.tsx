import { z } from 'zod'

export const articleSchema = z.object({
    id: z.number(),
    resourceType: z.string(),
    articleUrl: z.string(),
    title: z.string(),
    introduction: z.string(),
    thumbnailUrl: z.string(),
    isActive: z.boolean(),
    specializationName: z.string(),
    schoolManagerName: z.string()
})

export type Article = z.infer<typeof articleSchema>