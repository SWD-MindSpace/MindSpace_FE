import { z } from 'zod'

export const supportingProgramTableDataSchema = z.object({
    id: z.number(),
    title: z.string(),
    maxQuantity: z.number(),
    city: z.string(),
    street: z.string(),
    ward: z.string(),
    province: z.string(),
    postalCode: z.string(),
    isActive: z.boolean(),
    startDateAt: z.string()
})

export type SupportingProgramTableData = z.infer<typeof supportingProgramTableDataSchema>