import { get } from '@/lib/apiCaller';
import { AppointmentQueryParams } from '../schemas';
const appointmentEndpoint = '/api/v1/appointments/history';

export const getAppointmentList = async (searchParams: AppointmentQueryParams) => {
    return get(`${appointmentEndpoint}`, searchParams)
}