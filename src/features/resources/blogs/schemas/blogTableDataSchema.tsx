import { z } from 'zod'
import { sectionSchema } from './sectionSchema'

export const blogTableDataSchema = z.object({
    id: z.number(),
    resourceType: z.string(),
    title: z.string(),
    introduction: z.string(),
    isActive: z.boolean(),
    specializationName: z.string(),
    schoolManagerName: z.string()
})

export type BlogTableData = z.infer<typeof blogTableDataSchema>