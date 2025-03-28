import { z } from 'zod'

export const testTableData = z.object({
    id: z.number(),
    title: z.string(),
    testCode: z.string(),
    targetUser: z.string(),
    description: z.string(),
    questionCount: z.number(),
    testStatus: z.string(),
})

export type TestTableData = z.infer<typeof testTableData>