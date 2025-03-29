
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const truncateText = (text: string) => {
    return text.length >= 100 ? text.slice(0, 100).concat('...') : text
}
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const formatDate = (dateInput: string | Date | null): string => {
    if (!dateInput) return 'N/A';

    // Convert to Date object if it's a string
    const date = dateInput instanceof Date
        ? dateInput
        : new Date(dateInput);

    // Check if date is valid
    if (isNaN(date.getTime())) return 'N/A';

    // Format to 'DD-MM-YYYY'
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-');
};

export const formatDateForInput = (date: Date): string => {
    const formattedDate = new Date(date);
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = formattedDate.getFullYear();

    return `${day}/${month}/${year}`;
}

export const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}