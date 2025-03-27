import React from "react";
import type { Metadata } from "next";
import AppointmentHistoryList from "@/features/appointments/components/AppointmentHistoryList";

export const metadata: Metadata = {
  title: "Appointment History | MindSpace",
  description: "View past appointments and their details",
};

export default function AppointmentsHistory() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Appointment History</h1>
      <AppointmentHistoryList />
    </div>
  );
}
