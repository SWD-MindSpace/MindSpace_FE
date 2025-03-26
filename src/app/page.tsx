'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the dashboard after the component mounts
        router.push('/dashboard')
    }, [router])

}
