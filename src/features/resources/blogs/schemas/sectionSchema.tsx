import { z } from 'zod'

export const sectionSchema = z.object({
    heading: z.string(),
    htmlContent: z.string()
})

export type Section = z.infer<typeof sectionSchema>