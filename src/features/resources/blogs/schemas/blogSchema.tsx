import { z } from 'zod'
import { sectionSchema } from './sectionSchema'

export const blogSchema = z.object({
    id: z.number(),
    resourceType: z.string(),
    title: z.string(),
    introduction: z.string(),
    thumbnailUrl: z.string(),
    isActive: z.boolean(),
    specializationName: z.string(),
    schoolManagerName: z.string(),
    sections: z.array(sectionSchema)
})

export type Blog = z.infer<typeof blogSchema>