export interface AppointmentQueryParams {
    sort: string;
    psychologistName: string;
    studentEmail: string;
    startDate: string | null;
    endDate: string | null;
    schoolId: string;
    appointmentStatus: number | null; // Thay đổi thành number | null,
    pageIndex?: number;
    pageSize?: number;
}

export interface Appointment {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    psychologistId: number | null;
    psychologistName: string | null;
    studentId: number | null;
    studentName: string | null;
    isUpcoming: boolean;
    meetUrl: string;
    status: string | null;
}