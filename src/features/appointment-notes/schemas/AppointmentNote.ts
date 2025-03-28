export interface AppointmentNotes {
    appointmentId: number;
    notesTitle: string;
    keyIssues: string;
    suggestions: string;
    otherNotes: string | null;
    isNoteShown: boolean;
    psychologistId: number;
    studentId: number;
    psychologistName: string;
    studentName: string;
    psychologistImageUrl: string | null;
    studentImageUrl: string | null;
}