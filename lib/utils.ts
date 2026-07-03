import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function redirectToStripeCheckout(
  _items: { name: string; price: number; qty: number; size: string }[]
) {
  // Stripe checkout stub — Phase 3
  const { toast } = await import("sonner");
  toast.error("Online checkout is coming soon — contact hello@afuvai.com to place your order.", { duration: 5000 });
}
