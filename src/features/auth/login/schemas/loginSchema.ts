import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email({
        message:'Email không hợp lệ'
    }),
    password: z.string().min(6, {
        message: 'Mật khẩu phải từ 6 ký tự trở lên'
    })
})

export type LoginSchema = z.infer<typeof loginSchema>
