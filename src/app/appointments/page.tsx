import React from "react";
import type { Metadata } from "next";
import AppointmentList from "@/features/appointments/components/AppointmentList";

export const metadata: Metadata = {
  title: "Appointments | MindSpace",
  description: "View your appointment history",
};

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Appointment History</h1>
      <AppointmentList />
    </div>
  );
}
