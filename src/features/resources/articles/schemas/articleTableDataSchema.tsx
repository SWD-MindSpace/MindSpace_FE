import { z } from 'zod'

export const articleTableDataSchema = z.object({
    id: z.number(),
    resourceType: z.string(),
    articleUrl: z.string(),
    title: z.string(),
    introduction: z.string(),
    isActive: z.boolean(),
    specializationName: z.string(),
    schoolManagerName: z.string()
})

export type ArticleTableData = z.infer<typeof articleTableDataSchema>