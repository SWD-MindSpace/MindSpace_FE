import { SupportingProgram } from './../../supporting-programs/schemas/supportingProgramSchema';
// overview stat
export interface CountOverview {
    "totalStudentsCount": number,
    "totalTestsCount": number,
    "totalSupportingProgramCount": number,
    "totalResourcesCount": number,
    "startDate": string,
    "endDate": string
}

export interface Specialization {
    "id": number,
    "name": string
}

// appointment stat
export interface AppointmentPair {
    "specialization": Specialization,
    "appointmentCount": number
}
export interface AppointmentStatistics {
    "schoolId": number,
    "totalAppointmentCount": number,
    "keyValuePairs": AppointmentPair[]
}

// supporting stat
export interface SupportingProgramPair {
    "specialization": Specialization,
    "supportingProgramCount": number
}
export interface SupportingProgramStatistics {
    "schoolId": number,
    "totalSupportingProgramCount": number,
    "keyValuePairs": SupportingProgramPair[]
}
