'use client'

import React from 'react'

export default function TestCreateForm() {
    return (
        <div className='flex flex-row h-screen gap-x-5'>

            {/* NEW TEST FORM */}
            <div className='w-1/2 border-1 border-primary-blue text-center'>
                NEW TEST FORM
            </div>

            <div className='w-1/2 border-1 border-secondary-blue flex flex-col p-10 gap-y-10'>
                {/* QUESTION LIST */}
                <div className='h-2/3 border-1 border-black'>

                </div>

                {/* ADD NEW QUESTIONS SECTION */}
                <div className='h-1/3 border-1 border-black'>

                </div>
            </div>




        </div>
    )
}
