'use client'

import React from 'react'
import LoginForm from '../../../features/auth/login/components/LoginForm'

export default function Login() {
    return (
        <>
            <div className='grid grid-cols-2 h-screen bg-primary-blue'>
                <div className='h-full w-full text-center flex flex-col items-center justify-center gap-y-7'>
                    <h1 className='font-bevnpro text-white text-5xl font-semibold'>
                        Hệ thống quản lý
                    </h1>
                    <h1 className='font-league-spartan text-5xl font-semibold bg-white text-primary-blue py-4 px-10 rounded-full'>
                        MindSpace
                    </h1>
                </div>
                <div className='h-full w-full flex items-center justify-center'>
                    <LoginForm />
                </div>

            </div>
        </>

    )
}
