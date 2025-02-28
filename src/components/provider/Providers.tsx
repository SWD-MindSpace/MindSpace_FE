'use client'

import { HeroUIProvider } from "@heroui/react";
import React, { ReactNode } from 'react'
import { ToastContainer } from "react-toastify";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastContainer
                position="top-right"
                autoClose={6000}
            />
            {children}
        </HeroUIProvider>
    )
}
