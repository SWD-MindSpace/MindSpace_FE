import axiosInstance from "@/lib/interceptor";

export type AppointmentQueryParams = {
  startDate?: string;
  endDate?: string;
  pageIndex?: number;
  pageSize?: number;
};

export interface AppointmentResponse {
  date: string;
  startTime: string;
  endTime: string;
  studentName: string;
  isUpcoming: boolean;
  meetUrl: string | null;
}

export interface AppointmentListResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: AppointmentResponse[];
}

/**
 * Get all appointments for the psychologist within a date range
 */
export const getPsychologistAppointments = async (
  searchParams: AppointmentQueryParams
) => {
  // Convert to type Record<string,string> -> Convert to a query string
  const queryString = new URLSearchParams(
    Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const url = queryString
    ? `/api/v1/appointments/psychologist?${queryString}`
    : `/api/v1/appointments/psychologist`;

  try {
    const response = await axiosInstance.get(url, {
      headers: {
        requiresAuth: true,
      },
    });

    return {
      status: "success",
      data: response.data as AppointmentListResponse,
    };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Failed to fetch appointments" };
  }
};
