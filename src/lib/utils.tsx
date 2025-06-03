import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, format: string = "MMM D, YYYY"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  
  // Return a fallback if invalid date
  if (isNaN(d.getTime())) {
    return "Invalid date";
  }
  
  // Simple formatter for common patterns
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const monthsLong = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Basic formatting
  if (format === "MMM D, YYYY") {
    return `${months[month]} ${day}, ${year}`;
  } else if (format === "MM/DD/YYYY") {
    return `${month + 1}/${day}/${year}`;
  } else if (format === "DD/MM/YYYY") {
    return `${day}/${month + 1}/${year}`;
  } else if (format === "YYYY/MM/DD") {
    return `${year}/${month + 1}/${day}`;
  }
  
  return `${months[month]} ${day}, ${year}`;
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (isNaN(diffInSeconds)) {
    return "Invalid date";
  }
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  if (diffInSeconds < 0) {
    return "just now";
  }
  
  let counter;
  for (const [key, value] of Object.entries(intervals)) {
    counter = Math.floor(diffInSeconds / value);
    
    if (counter > 0) {
      if (counter === 1) {
        return `${counter} ${key} ago`;
      } else {
        return `${counter} ${key}s ago`;
      }
    }
  }
  
  return "just now";
}

export function truncateText(text: string, maxLength: number = 50): string {
  if (!text) return "";
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength) + "...";
}

export function getInitials(name: string): string {
  if (!name) return "";
  
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 45%)`;
}

export function formatPrice(price: string | number): string {
  if (typeof price === 'string') {
    // If it already has a currency symbol, return as is
    if (price.includes('$') || price.includes('€') || price.includes('£')) {
      return price;
    }
    
    // Try to parse the string into a number
    const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    
    if (isNaN(parsedPrice)) {
      return price; // Return original if parsing fails
    }
    
    // Format with $ symbol and commas
    return `$${parsedPrice.toLocaleString()}`;
  }
  
  // If it's already a number, format with $ symbol and commas
  return `$${price.toLocaleString()}`;
}


