import { z } from 'zod'
import { parse, format } from 'date-fns'

export const supportingProgramSchema = z.object({
    id: z.number(),
    title: z.string(),
    thumbnailUrl: z.string(),
    pdfFileUrl: z.string(),
    maxQuantity: z.number(),
    city: z.string(),
    street: z.string(),
    ward: z.string(),
    province: z.string(),
    postalCode: z.string(),
    isActive: z.boolean(),
    startDateAt: z.string(),
})


export type SupportingProgram = z.infer<typeof supportingProgramSchema>