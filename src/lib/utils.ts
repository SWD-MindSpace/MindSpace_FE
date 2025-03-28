
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const truncateText = (text: string) => {
    return text.length >= 100 ? text.slice(0, 100).concat('...') : text
}
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDateForInput = (date: Date): string => {
    const formattedDate = new Date(date); 
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = formattedDate.getFullYear();

    return `${day}/${month}/${year}`;
}