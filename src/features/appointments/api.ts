import { get, post, put, remove } from "@/lib/apiCaller";
import { AppointmentHistory } from "./types";

/**
 * Fetch appointment history with filtering and pagination
 * @param params - Query parameters for filtering and pagination
 */
export const getAppointmentHistory = async (params: Record<string, any>) => {
  return get("/appointments/history", params);
};

/**
 * Fetch a specific appointment by ID
 * @param id - Appointment ID
 */
export const getAppointmentById = async (id: string) => {
  return get(`/appointments/${id}`);
};

/**
 * Cancel an appointment
 * @param id - Appointment ID
 */
export const cancelAppointment = async (id: string) => {
  return put(`/appointments/${id}/cancel`);
};

/**
 * Reschedule an appointment
 * @param id - Appointment ID
 * @param data - New appointment details
 */
export const rescheduleAppointment = async (
  id: string,
  data: Record<string, any>
) => {
  return put(`/appointments/${id}/reschedule`, data);
};
