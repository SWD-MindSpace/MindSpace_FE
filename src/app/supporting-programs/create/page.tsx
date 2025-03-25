'use client'

import React, { useEffect, useState } from 'react'
import { getDistricts, getProvinces, getWards } from '@/lib/api';
import { getAllPsychologists } from '@/features/accounts/common/APIs';
import { createNewSupportingProgram } from '@/features/supporting-programs/APIs';
import { toast } from 'react-toastify'
import CreateSPForm from '@/features/supporting-programs/components/CreateSPForm';
import ImageUpload from '@/features/resources/blogs/components/ImageUpload';

// interface Blog Form

export default function SPCreatePage() {

    const [address, setAddress] = useState({
        provinces: [],
        districts: [],
        wards: []
    })

    const [thumbnailUrl, setThumbnailUrl] = useState('https://placehold.co/600x400')

    const [psychologistArr, setPsychologistArr] = useState(null)


    const fetchAllPsychologists = async () => {
        const result = await getAllPsychologists()

        if (result.status === 'success') {
            setPsychologistArr(result.data)
        } else {
            toast.error(result?.error)
        }
    }


    const handleThumbnailUrlChange = (key: string, url: string) => {
        setThumbnailUrl(url)
    }


    const handleClearAllFields = async () => {
        window.location.reload()
    }


    const handleSubmitForm = async (spForm) => {

        const newSupportingProgram = {
            ...spForm,
            thumbnailUrl: thumbnailUrl,
            schoolManagerId: JSON.parse(localStorage.getItem('userInfo')).userId
        }


        const result = await createNewSupportingProgram(newSupportingProgram)

        // upon successful submission
        if (result.status === 'success') {
            window.location.replace(`detail/${result.data}`)
        } else {
            toast.error(result.error)
        }
    }

    const fetchAddress = async () => {
        const provinces = await getProvinces()

        setAddress({
            ...address,
            provinces: provinces
        })
    }

    const handleAdressChange = async (type: string, id: number) => {
        let result = []
        if (type === 'provinces') {
            result = await getDistricts(id)
            setAddress({
                ...address,
                districts: result
            })
        }
        if (type === 'districts') {
            result = await getWards(id)
            setAddress({
                ...address,
                wards: result
            })
        }

    }

    useEffect(() => {
        fetchAddress()
        fetchAllPsychologists()
    }, [])


    return (
        psychologistArr && (
            <div className='flex flex-row h-full gap-x-5'>

                <div className='w-[60%]'>
                    {/* TEST FORM */}
                    <CreateSPForm
                        psychologistArr={psychologistArr}
                        address={address}
                        onClearAllFields={handleClearAllFields}
                        onSubmit={handleSubmitForm}
                        onAdressChange={handleAdressChange}
                    />
                </div>



                <div className='w-[40%]'>
                    <ImageUpload
                        form={{ thumbnailUrl: thumbnailUrl }}
                        onFormInputChange={handleThumbnailUrlChange}
                    />
                </div>

            </div>
        )
    )
}
