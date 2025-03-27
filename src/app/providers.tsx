"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastContainer position="top-right" autoClose={6000} />
      {children}
    </HeroUIProvider>
  );
}
