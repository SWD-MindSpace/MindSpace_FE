// utils/timeSlots.ts
export const generateTimeSlots = (): string[] => {
    const times: string[] = [];
    for (let hour = 7; hour <= 21; hour++) {
        times.push(`${hour.toString().padStart(2, "0")}:00`);
        times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return times;
};
