import { z } from 'zod'

export const questionTableData = z.object({
    // schema here
    id: z.number()
})

export type QuestionTableData = z.infer<typeof questionTableData>