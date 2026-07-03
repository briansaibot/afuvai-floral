export type Page =
  | "home"
  | "portfolio"
  | "weddings"
  | "parties"
  | "product"
  | "subscriptions"
  | "florist"
  | "care"
  | "bulk"
  | "classes"
  | "collabs"
  | "gift-cards"
  | "quiz"
  | "account";

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  tag: string;
  whiteBg?: boolean;
  pairedProductId?: number;
  desc: string;
  sizes: ProductSize[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
  size: string;
}

export interface SubTier {
  name: string;
  img: string;
  badge: string;
  price: Record<string, number>;
  items: string[];
}

export interface PortfolioItem {
  id: number;
  img: string;
  category: string;
  title: string;
  venue: string;
  whiteBg?: boolean;
}

export interface PartyExperience {
  name: string;
  price: string;
  group: string;
  duration: string;
  symbol: string;
  desc: string;
  img: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
}

export interface Class {
  name: string;
  price: number;
  duration: string;
  group: string;
  img: string;
  desc: string;
}
