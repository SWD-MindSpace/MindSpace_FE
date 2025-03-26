'use client'

import { Card, CardHeader, CardBody, Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from '../schemas/loginSchema'
import { login } from '../APIs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    })

    const onSubmit = async (data: LoginSchema) => {
        const result = await login(data)
        if (result?.status === 'success') {
            router.replace('/dashboard')
        } else {
            toast.error(result?.error)
        }
    }


    return (
        <div className='w-[70%]'>
            <Card className='mx-auto py-8 px-3'>
                <CardHeader className='flex flex-col items-center justify-center text-center'>
                    <div className='flex flex-row items-center'>
                        <p className='text-2xl font-bold text-primary-blue font-noto-sans'>Đăng nhập vào MindSpace</p>
                    </div>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-5'>
                            <Input
                                defaultValue=''
                                label='Email'
                                variant='bordered'
                                radius='sm'
                                {...register('email')}
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message as string}
                            />
                            <Input
                                defaultValue=''
                                label='Mật khẩu'
                                variant='bordered'
                                type='password'
                                {...register('password')}
                                isInvalid={!!errors.password}
                                errorMessage={errors.password?.message as string}
                            />
                            <Button
                                isLoading={isSubmitting}
                                isDisabled={!isValid}
                                fullWidth
                                className='bg-primary-blue text-white font-noto-sans font-semibold py-7'
                                type='submit'
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>


        </div>
    )
}
