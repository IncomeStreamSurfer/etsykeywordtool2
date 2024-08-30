import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateTotalSearchVolume(monthlySearches: Array<{ search_volume: number }>) {
  return monthlySearches.reduce((total, month) => total + month.search_volume, 0);
}