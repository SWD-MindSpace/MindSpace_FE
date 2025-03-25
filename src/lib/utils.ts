
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const truncateText = (text: string) => {
    return text.length >= 100 ? text.slice(0, 100).concat('...') : text
}
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}