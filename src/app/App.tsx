import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Search, Menu, X, ChevronRight, Star, ArrowRight, Heart,
  Plus, Minus, Instagram, Facebook, ChevronDown, Truck, Leaf, Phone,
  Mail, Calendar, Users, Clock, Check, MapPin, Droplets, Wind, Sun, Scissors,
  RefreshCw, Package, Repeat
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/A461AF6B-1E66-4F28-AB8E-ACF36B69D0EC.PNG";
import amiDayneImg from "@/imports/IMG_4085.jpeg";

// ── Real Afuvai product photos ─────────────────────────────────────────────────
import imgPurse         from "@/imports/192548D1-5CD9-4724-999F-905849B3F3A9.PNG"; // The Afuvai Purse — gold chain
import imgPurseBlack    from "@/imports/E6E727B0-E375-4F30-8FAC-CABAD935E553.PNG"; // The Afuvai Purse — black chain
import imgGoldenHour    from "@/imports/91D3CEBC-BF25-47FE-B689-A1444C492868.PNG"; // Gold vase anniversary
import imgSummerRadiance from "@/imports/871BF9EC-404A-4CD1-811E-CF2943818F85.png"; // Pedestal bowl birthday
import imgVividFiesta   from "@/imports/2B62E5F4-65C3-4EE1-96D3-136806D5A756.PNG"; // Rainbow vase everyday
import imgGardenSunrise from "@/imports/A2D24D91-E689-4272-AB74-5FD492C48DA7.PNG"; // Glass vase everyday
import imgStatement     from "@/imports/44C6B361-EE02-4548-B9D5-063055F91E2C.PNG"; // Tall corporate vase
import imgJewelGarden   from "@/imports/3FDEF952-54C1-46BF-AE5F-B9312A1C09A1.PNG"; // Jewel bouquet anniversary
import imgWildMeadow    from "@/imports/2C71E011-59DA-4DA8-A68A-337A9BEFCA48.png"; // Wild garden wedding
import imgHeartWreath   from "@/imports/A14C55C7-0E6A-421C-A483-F36BC910794B.png"; // Heart wreath sympathy
import imgBlushingGarden from "@/imports/D83893F6-822A-449C-9790-EE1848EE12CA.PNG"; // Pink roses + hydrangea — anniversary
import imgBlushingAlt   from "@/imports/A6833862-1DA9-497B-AF6B-48CCAB8F90A0.PNG"; // Same arrangement, white bg
import imgKaleidoscope  from "@/imports/A57FB4D6-3F64-4785-9EA7-1B2E352EAF8A.PNG"; // Colorful pedestal vase — birthday
import imgBlushReverie  from "@/imports/ChatGPT_Image_Jun_29__2026__06_01_45_PM.png"; // Pink ranunculus + roses
import imgFestivalBloom from "@/imports/ChatGPT_Image_Jun_29__2026__06_02_01_PM.png"; // Vibrant multicolor
import imgPureSerenity  from "@/imports/ChatGPT_Image_Jun_29__2026__06_02_06_PM.png"; // All-white arrangement
import imgGoldenHarvest from "@/imports/ChatGPT_Image_Jun_29__2026__06_02_15_PM.png"; // Fall harvest sunflowers
import imgHexArch       from "@/imports/F5A3BCCF-8599-476F-860B-F44AD6C1175D.PNG"; // Hex wood wedding arch
import imgMetalArch     from "@/imports/BF3BFEB0-F648-4841-A02F-586616084367.PNG"; // Metal garden arch

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

// Maps product+size to your Stripe Price ID.
// Add from Stripe Dashboard → Products → [product] → Prices → Copy price ID
const STRIPE_PRICE_IDS: Record<string, string> = {
  // "Ivory Reverie|Standard": "price_xxx",
};

async function redirectToStripeCheckout(
  items: { name: string; price: number; qty: number; size: string }[]
) {
  if (!STRIPE_KEY) {
    toast.error("Add VITE_STRIPE_PUBLISHABLE_KEY to your project environment variables to enable checkout.", { duration: 5000 });
    return;
  }

  // Dynamically import Stripe so a missing package never crashes the module
  let loadStripe: ((key: string) => Promise<unknown>) | null = null;
  try {
    const mod = await import("@stripe/stripe-js");
    loadStripe = mod.loadStripe as typeof loadStripe;
  } catch {
    toast.error("Stripe could not be loaded. Please try again.");
    return;
  }

  const stripe = await loadStripe(STRIPE_KEY) as {
    redirectToCheckout: (opts: { lineItems: { price: string; quantity: number }[]; mode: string; successUrl: string; cancelUrl: string }) => Promise<{ error?: { message?: string } }>;
  } | null;
  if (!stripe) { toast.error("Stripe failed to initialise."); return; }

  const lineItems = items
    .map((i) => ({ price: STRIPE_PRICE_IDS[`${i.name}|${i.size}`], quantity: i.qty }))
    .filter((li) => !!li.price);

  if (lineItems.length === 0) {
    toast.error("Link your Stripe Price IDs in the STRIPE_PRICE_IDS map in App.tsx to enable checkout.", { duration: 6000 });
    return;
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems,
    mode: "payment",
    successUrl: `${window.location.origin}?checkout=success`,
    cancelUrl:  `${window.location.origin}?checkout=cancelled`,
  });
  if (error) toast.error(error.message ?? "Checkout error. Please try again.");
}

// ── Palette ────────────────────────────────────────────────────────────────────
const SAGE    = "#5A6B54";
const SAGE_D  = "#3f4e3a";
const GOLD    = "#B8995A";
const GOLD_L  = "#d4b578";
const IVORY   = "#FAF8F3";
const CARD    = "#EEEADC";
const INK     = "#1A1A14";
const MUTED   = "#6B6B58";
const BORDER  = "rgba(90,107,84,0.18)";
const BORDER_G= "rgba(184,153,90,0.22)";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

// ── Images ─────────────────────────────────────────────────────────────────────
const HERO_IMG        = "https://images.unsplash.com/photo-1572454591674-2739f30d8c40?w=1800&h=1100&fit=crop&auto=format";
const STUDIO_IMG      = "https://images.unsplash.com/photo-1594843225243-0a7ed5242c5a?w=900&h=1200&fit=crop&auto=format";
const FLORIST_IMG     = "https://images.unsplash.com/photo-1615554108316-955645d13bdd?w=700&h=900&fit=crop&auto=format";
const ROSE_IMG        = "https://images.unsplash.com/photo-1592125661285-79820f2fdf7a?w=800&h=1000&fit=crop&auto=format";
const WHITE_FLORAL    = "https://images.unsplash.com/photo-1529330821961-0414396878d8?w=800&h=1000&fit=crop&auto=format";
const PINK_BOUQUET    = "https://images.unsplash.com/photo-1610599929746-e79dbd785f18?w=800&h=1000&fit=crop&auto=format";
const PURPLE_BOUQUET  = "https://images.unsplash.com/photo-1606101083393-bded314215cd?w=800&h=1000&fit=crop&auto=format";
const MIXED_VASE      = "https://images.unsplash.com/photo-1558879860-45f24b366ea1?w=800&h=1000&fit=crop&auto=format";
const GARDEN_MIX      = "https://images.unsplash.com/photo-1601753016831-a7d97aaf16ab?w=800&h=1000&fit=crop&auto=format";
const PETAL_MACRO     = "https://images.unsplash.com/photo-1532614208657-10b8d7815f40?w=800&h=1000&fit=crop&auto=format";
const ORCHID_DARK     = "https://images.unsplash.com/photo-1771099077435-6dbcac9fd65e?w=800&h=1000&fit=crop&auto=format";
const FLOWER_CLOSEUP  = "https://images.unsplash.com/photo-1777382730647-86ca1a05cecb?w=800&h=1000&fit=crop&auto=format";
const WEDDING_ARCH    = "https://images.unsplash.com/photo-1769812343890-4e406a33cfbe?w=1200&h=800&fit=crop&auto=format";
const WEDDING_BRIDE   = "https://images.unsplash.com/photo-1766149481900-328c59e7f17a?w=800&h=1000&fit=crop&auto=format";
const WEDDING_DECOR   = "https://images.unsplash.com/photo-1769812344096-8993973bd233?w=800&h=1000&fit=crop&auto=format";
const RECEPTION_TABLE = "https://images.unsplash.com/photo-1767986012138-4893f40932d5?w=800&h=1000&fit=crop&auto=format";
const PARTY_IMG       = "https://images.unsplash.com/photo-1562483565-984444c3cf8e?w=1200&h=700&fit=crop&auto=format";
const WORKSHOP_IMG    = "https://images.unsplash.com/photo-1615554108316-955645d13bdd?w=600&h=700&fit=crop&auto=format";

// ── Types ──────────────────────────────────────────────────────────────────────
type Page = "home" | "portfolio" | "weddings" | "parties" | "product" | "subscriptions" | "florist" | "care" | "bulk" | "classes" | "collabs";

// ── Nav links ──────────────────────────────────────────────────────────────────
const PRIMARY_NAV: { label: string; page: Page }[] = [
  { label: "Shop Collections", page: "home" },
  { label: "Classes",          page: "classes" },
  { label: "Portfolio",        page: "portfolio" },
  { label: "Weddings",         page: "weddings" },
  { label: "Meet AmiDayne",    page: "florist" },
];

const DROPDOWN_NAV: { section: string; links: { label: string; page: Page }[] }[] = [
  {
    section: "Experiences",
    links: [
      { label: "Host an Event",    page: "parties" },
      { label: "Collaborate with Us", page: "collabs" },
      { label: "Bulk Flower Orders",  page: "bulk" },
    ],
  },
  {
    section: "Explore",
    links: [
      { label: "Subscriptions",       page: "subscriptions" },
      { label: "Care Guide",          page: "care" },
      { label: "Portfolio",           page: "portfolio" },
    ],
  },
];

// All nav for mobile menu
const ALL_NAV_MOBILE: { label: string; page: Page }[] = [
  { label: "Shop Collections", page: "home" },
  { label: "Classes",          page: "classes" },
  { label: "Portfolio",        page: "portfolio" },
  { label: "Weddings",         page: "weddings" },
  { label: "Host an Event", page: "parties" },
  { label: "Collaborate",      page: "collabs" },
  { label: "Subscriptions",    page: "subscriptions" },
  { label: "Bulk Orders",      page: "bulk" },
  { label: "Meet AmiDayne",    page: "florist" },
  { label: "Care Guide",       page: "care" },
];

const OCCASIONS = ["All", "Signature", "Wedding", "Anniversary", "Birthday", "Sympathy", "Corporate", "Everyday"];

const PRODUCTS = [
  {
    id: 1, name: "The Afuvai Purse", price: 285, category: "Signature", img: imgPurse, tag: "Bestseller",
    desc: "Our most iconic creation — a fully bloomed luxury handbag hand-crafted from the freshest garden roses, peonies, carnations, and ranunculus. Choose your chain: lustrous gold or sleek matte black. No two are identical.",
    sizes: [{ label: "Mini", price: 225 }, { label: "Classic", price: 285 }, { label: "Grand", price: 385 }],
    variants: [{ label: "Gold Chain", img: imgPurse }, { label: "Black Chain", img: imgPurseBlack }],
  },
  {
    id: 2, name: "Golden Hour", price: 195, category: "Anniversary", img: imgGoldenHour, tag: "Signature",
    desc: "Red roses and white oriental lilies rise from a gold-brushed cylinder vase, accented with white hydrangea, pink waxflower, and trailing greenery. Romantic, luxurious, and designed to impress.",
    sizes: [{ label: "Small", price: 145 }, { label: "Standard", price: 195 }, { label: "Deluxe", price: 275 }],
  },
  {
    id: 3, name: "Summer Radiance", price: 165, category: "Birthday", img: imgSummerRadiance, tag: "",
    desc: "A jubilant pedestal arrangement overflowing with sunflowers, pink roses, cream roses, and pink snapdragons, nestled in lush eucalyptus. Full, bold, and impossible to miss.",
    sizes: [{ label: "Small", price: 115 }, { label: "Standard", price: 165 }, { label: "Deluxe", price: 235 }],
  },
  {
    id: 4, name: "Vivid Fiesta", price: 145, category: "Everyday", img: imgVividFiesta, tag: "New",
    desc: "An energetic vase arrangement of red roses, yellow snapdragons, orange alstroemeria, and blue delphinium — a bold palette that fills any room with warmth and personality.",
    sizes: [{ label: "Small", price: 98 }, { label: "Standard", price: 145 }, { label: "Deluxe", price: 210 }],
  },
  {
    id: 5, name: "Garden Sunrise", price: 128, category: "Everyday", img: imgGardenSunrise, tag: "",
    desc: "White roses, white tulips, and sunflowers bloom alongside blue delphinium and baby's breath in a clear glass vase. Fresh, clean, and effortlessly elegant for any occasion.",
    sizes: [{ label: "Small", price: 88 }, { label: "Standard", price: 128 }, { label: "Deluxe", price: 185 }],
  },
  {
    id: 6, name: "The Statement", price: 195, category: "Corporate", img: imgStatement, tag: "Exclusive",
    desc: "A commanding tall-vase arrangement of red roses, white hydrangea, pink carnations, tropical foliage, and cascading burgundy amaranthus. Designed for boardrooms, lobbies, and grand entrances.",
    sizes: [{ label: "Standard", price: 195 }, { label: "Premium", price: 265 }, { label: "Prestige", price: 365 }],
  },
  {
    id: 7, name: "Jewel Garden", price: 185, category: "Anniversary", img: imgJewelGarden, tag: "",
    desc: "A richly textured hand-tied bouquet of burgundy dahlias, magenta gerbera, king protea, blue delphinium, and orange accents — jewel-toned and dramatic, perfect for milestone celebrations.",
    sizes: [{ label: "Small", price: 135 }, { label: "Standard", price: 185 }, { label: "Deluxe", price: 260 }],
  },
  {
    id: 8, name: "Wild Meadow", price: 245, category: "Wedding", img: imgWildMeadow, tag: "",
    desc: "A free-spirited bridal bouquet of blue delphinium, peach garden roses, white roses, purple statice, and flowing wild greenery — beautifully untamed and entirely unique.",
    sizes: [{ label: "Petite", price: 175 }, { label: "Standard", price: 245 }, { label: "Lush", price: 340 }],
  },
  {
    id: 9, name: "Heart of Remembrance", price: 325, category: "Sympathy", img: imgHeartWreath, tag: "",
    desc: "A standing heart-shaped wreath woven with red, pink, yellow, and white roses, peonies, and baby's breath — a graceful tribute that honors the love left behind.",
    sizes: [{ label: "Standard", price: 325 }, { label: "Large", price: 425 }, { label: "Grand", price: 545 }],
  },
  {
    id: 10, name: "Blushing Garden", price: 175, category: "Anniversary", img: imgBlushingGarden, tag: "New",
    desc: "Pink garden roses, white hydrangea, and burgundy astilbe cascade from a white square vase with trailing eucalyptus. Soft, romantic, and endlessly elegant — designed for moments that deserve to be remembered.",
    sizes: [{ label: "Small", price: 125 }, { label: "Standard", price: 175 }, { label: "Deluxe", price: 245 }],
  },
  {
    id: 11, name: "Kaleidoscope", price: 158, category: "Birthday", img: imgKaleidoscope, tag: "",
    desc: "A jubilant explosion of hot pink gerbera daisies, peach and yellow lilies, purple statice, and orange blooms in a sleek dark pedestal vase. Bold, playful, and impossible not to smile at.",
    sizes: [{ label: "Small", price: 108 }, { label: "Standard", price: 158 }, { label: "Deluxe", price: 225 }],
  },
  {
    id: 12, name: "Blush Reverie", price: 168, category: "Anniversary", img: imgBlushReverie, tag: "",
    desc: "An airy cloud of pink garden roses and blush ranunculus with white spray roses and silver-green eucalyptus in a clear cylinder vase. Dreamy, feminine, and utterly timeless.",
    sizes: [{ label: "Small", price: 118 }, { label: "Standard", price: 168 }, { label: "Deluxe", price: 238 }],
  },
  {
    id: 13, name: "Festival Bloom", price: 178, category: "Birthday", img: imgFestivalBloom, tag: "",
    desc: "A showstopping arrangement of orange Asiatic lilies, hot pink roses, magenta carnations, yellow and orange gerbera daisies, and electric blue delphinium. Maximum color, maximum joy.",
    sizes: [{ label: "Small", price: 128 }, { label: "Standard", price: 178 }, { label: "Deluxe", price: 248 }],
  },
  {
    id: 14, name: "Pure Serenity", price: 195, category: "Wedding", img: imgPureSerenity, tag: "Exclusive",
    desc: "An all-white masterpiece of garden roses, white hydrangea, lisianthus, baby's breath, and dusty miller arranged in an ivory ribbed column vase. Pristine, peaceful, and utterly sophisticated.",
    sizes: [{ label: "Small", price: 145 }, { label: "Standard", price: 195 }, { label: "Deluxe", price: 275 }],
  },
  {
    id: 15, name: "Golden Harvest", price: 155, category: "Everyday", img: imgGoldenHarvest, tag: "",
    desc: "A warm, abundant arrangement of sunflowers, orange roses, rust and yellow gerbera daisies, and bronze marigolds spilling from a terracotta vase with cascading eucalyptus. Bright, earthy, and full of life.",
    sizes: [{ label: "Small", price: 105 }, { label: "Standard", price: 155 }, { label: "Deluxe", price: 220 }],
  },
];

// Add-ons now include thumbnail images
const ADDONS = [
  { id: "vase",      img: MIXED_VASE,    label: "Premium Glass Vase",    price: 28, desc: "Hand-blown clear glass vase" },
  { id: "choc",      img: GARDEN_MIX,    label: "Artisan Chocolates",    price: 22, desc: "Local artisan chocolate box, 6-piece" },
  { id: "card",      img: PETAL_MACRO,   label: "Handwritten Note Card", price: 8,  desc: "Calligraphy note on premium stock" },
  { id: "preserved", img: ROSE_IMG,      label: "Preserved Rose Add-on", price: 35, desc: "Lasting preserved rose keepsake" },
];

const PORTFOLIO_ITEMS = [
  { id: 1,  img: imgPurse,          category: "Signature",   title: "The Afuvai Purse — Gold",     venue: "Las Vegas, NV" },
  { id: 16, img: imgPurseBlack,     category: "Signature",   title: "The Afuvai Purse — Black",    venue: "Las Vegas, NV" },
  { id: 2,  img: imgWildMeadow,     category: "Wedding",     title: "Wild Meadow Bridal Bouquet",  venue: "Red Rock Canyon" },
  { id: 3,  img: imgHexArch,        category: "Wedding",     title: "Hexagonal Wood Arch",         venue: "Private Estate" },
  { id: 17, img: imgMetalArch,      category: "Wedding",     title: "Garden Iron Arch",            venue: "Bellagio" },
  { id: 5,  img: WEDDING_DECOR,     category: "Wedding",     title: "Reception Tablescape",        venue: "Wynn Las Vegas" },
  { id: 6,  img: RECEPTION_TABLE,   category: "Wedding",     title: "Ceremony Altar Styling",      venue: "Four Seasons" },
  { id: 18, img: imgPureSerenity,   category: "Wedding",     title: "Pure Serenity",               venue: "The Venetian" },
  { id: 7,  img: imgSummerRadiance, category: "Birthday",    title: "Summer Radiance Pedestal",    venue: "Henderson, NV" },
  { id: 8,  img: imgVividFiesta,    category: "Birthday",    title: "Vivid Fiesta Vase",           venue: "Las Vegas, NV" },
  { id: 19, img: imgKaleidoscope,   category: "Birthday",    title: "Kaleidoscope",                venue: "Summerlin, NV" },
  { id: 20, img: imgFestivalBloom,  category: "Birthday",    title: "Festival Bloom",              venue: "Las Vegas, NV" },
  { id: 9,  img: imgGoldenHour,     category: "Anniversary", title: "Golden Hour Arrangement",     venue: "The Venetian" },
  { id: 10, img: imgJewelGarden,    category: "Anniversary", title: "Jewel Garden Bouquet",        venue: "Private Delivery" },
  { id: 21, img: imgBlushingGarden, category: "Anniversary", title: "Blushing Garden",             venue: "Caesars Palace" },
  { id: 22, img: imgBlushReverie,   category: "Anniversary", title: "Blush Reverie",               venue: "Las Vegas, NV" },
  { id: 11, img: imgGardenSunrise,  category: "Everyday",    title: "Garden Sunrise Vase",         venue: "Residential" },
  { id: 23, img: imgGoldenHarvest,  category: "Everyday",    title: "Golden Harvest",              venue: "Corporate Client" },
  { id: 12, img: imgStatement,      category: "Corporate",   title: "The Statement",               venue: "Caesars Palace" },
  { id: 13, img: imgHeartWreath,    category: "Sympathy",    title: "Heart of Remembrance Wreath", venue: "Las Vegas, NV" },
  { id: 14, img: PARTY_IMG,         category: "Parties",     title: "Bouquet Bar Setup",           venue: "Private Event" },
  { id: 15, img: WORKSHOP_IMG,      category: "Parties",     title: "Crown Workshop Experience",   venue: "Bachelorette Party" },
];
const PORTFOLIO_CATS = ["All", "Signature", "Wedding", "Birthday", "Anniversary", "Everyday", "Corporate", "Sympathy", "Parties"];

const TESTIMONIALS = [
  { name: "Margaux T.", city: "Las Vegas, NV",  rating: 5, text: "Afuvai transformed our Bellagio wedding into something from a dream. Every arrangement was a work of art — guests are still talking about it." },
  { name: "Serena L.",  city: "Henderson, NV",  rating: 5, text: "I subscribe to their monthly curation and it has completely changed how my home feels. The quality is unmatched anywhere in the valley." },
  { name: "James W.",   city: "Summerlin, NV",  rating: 5, text: "Sent the Ivory Reverie to my wife for our anniversary. She cried. That's all I needed to know — I am a lifetime customer." },
];

const SUB_FREQUENCIES = ["Weekly", "Bi-Weekly", "Monthly"];
const SUB_TIERS = [
  { name: "Bloom",   img: imgGardenSunrise, badge: "",             price: { Weekly: 65,  "Bi-Weekly": 55,  Monthly: 45  }, items: ["One seasonal arrangement", "Hand-wrapped with ribbon", "Personal note card", "Free delivery"] },
  { name: "Atelier", img: imgSummerRadiance, badge: "Most Popular", price: { Weekly: 135, "Bi-Weekly": 115, Monthly: 90  }, items: ["Two signature arrangements", "Designer-curated selection", "Vase included", "Priority same-day LV delivery", "Occasion reminders"] },
  { name: "Maison",  img: imgGoldenHour,    badge: "Best Value",   price: { Weekly: 280, "Bi-Weekly": 240, Monthly: 195 }, items: ["Four bespoke arrangements", "Dedicated design concierge", "Weekly refresh option", "Vases included", "20% off all events & parties", "First access to limited collections"] },
];

const PARTY_EXPERIENCES = [
  { name: "Bouquet Bar",            price: "From $65 per guest",  group: "10–50 guests", duration: "2 hrs",   symbol: "✦", desc: "Guests hand-select seasonal stems and build their own hand-tied bouquet with guidance from our floral artists. Ideal for bridal showers, birthdays, and private gatherings.",                                                                                     img: PARTY_IMG },
  { name: "Arrangement Workshop",   price: "From $95 per guest",  group: "6–20 guests",  duration: "2.5 hrs", symbol: "◆", desc: "Learn the fundamentals of floral design. Each guest leaves with a finished vase arrangement and a take-home care guide.",                                                                                                                                  img: WORKSHOP_IMG },
  { name: "Floral Crown Bar",       price: "From $75 per guest",  group: "8–30 guests",  duration: "2 hrs",   symbol: "◇", desc: "Design and wear your own floral crown using seasonal blooms and greenery. A signature experience for bachelorette parties and milestone celebrations.",                                                                                                   img: FLOWER_CLOSEUP },
  { name: "Flower Purse Party",     price: "From $125 per guest", group: "10–30+ guests",duration: "2 hrs",   symbol: "✺", desc: "The ultimate bachelorette experience. Each guest designs their own bouquet arranged inside a stunning acrylic purse with a gold chain handle — a luxury floral keepsake and the most stunning party photos of the year. Perfect for bachelorettes, bridal showers, birthdays, and girls' nights. Custom nameplates add-on available (+$20).", img: imgPurse },
  { name: "Private Dinner Florals", price: "From $400 total",     group: "Up to 12",     duration: "Setup",   symbol: "—", desc: "Bespoke table florals designed and installed for your private dinner. Tablescapes, place settings, and ambient arrangements. Teardown included.",                                                                                                           img: RECEPTION_TABLE },
  { name: "Bachelorette Pop-Up",    price: "Custom quote",        group: "Any size",     duration: "3 hrs",   symbol: "·", desc: "Full floral pop-up with branded setup, photo-ready flower wall, and a guided design activity. Las Vegas's most beautiful way to celebrate.",                                                                                                              img: PINK_BOUQUET },
  { name: "Birthday Experience",    price: "From $55 per guest",  group: "10–40 guests", duration: "1.5 hrs", symbol: "·", desc: "A celebratory floral experience tailored to the guest of honor. Choose your activity, color palette, and optional add-ons like dried flower kits or keepsake vases.",                                                                                    img: PURPLE_BOUQUET },
];

const FAQS_PARTIES = [
  { q: "Do you travel to our venue?",          a: "Yes — we come to you anywhere in the Las Vegas Valley, Henderson, Summerlin, and North Las Vegas. Travel fees may apply beyond 30 miles." },
  { q: "How far in advance should we book?",   a: "We recommend 3–4 weeks for private events, 2+ weeks for workshops. Peak season (October–May) fills quickly." },
  { q: "What is included in the guest price?", a: "All materials, stems, tools, and wrapping are included. We bring everything and set up and break down at no extra charge." },
  { q: "Can we customize the color palette?",  a: "Absolutely. Every experience can be tailored to your color story, theme, and aesthetic." },
  { q: "Is a deposit required?",               a: "Yes — a 50% deposit secures your date. The balance is due 7 days before your event." },
];
const FAQS_SUB = [
  { q: "When will my first delivery arrive?",    a: "Your first arrangement ships within 2–3 business days of subscribing. All future deliveries follow your chosen frequency." },
  { q: "Can I pause or skip a delivery?",        a: "Yes. Pause, skip, or reschedule any delivery with at least 3 days' notice." },
  { q: "Do I get to choose my flowers?",         a: "Atelier and Maison subscribers receive a designer-curated selection. Bloom subscribers can indicate a color preference." },
  { q: "How does the 20% event discount work?",  a: "Maison subscribers receive 20% off all party bookings, wedding florals, and one-time arrangements — applied automatically at checkout." },
  { q: "Is there a contract?",                   a: "No contracts. Cancel anytime with 7 days' notice before your next delivery." },
];
const FAQS_WEDDINGS = [
  { q: "How far in advance should we book?",   a: "We recommend booking 6–12 months out for weddings, especially for peak season (October–May). Shorter timelines are accommodated when availability allows." },
  { q: "Do you travel to the venue?",          a: "Yes — we travel to any venue in the Las Vegas Valley and greater Nevada area. Travel fees apply beyond 30 miles from central Las Vegas." },
  { q: "What is included in a consultation?",  a: "Your complimentary consultation includes a vision discussion, venue review, color palette planning, and a custom proposal delivered within 5 business days." },
  { q: "Can we see samples before booking?",   a: "Yes. For full-service clients, we offer a paid sample session where we create mini versions of your planned arrangements for your approval." },
  { q: "What is your minimum for weddings?",   a: "Our wedding minimum is $1,500. Most full-service weddings range from $3,000–$15,000+ depending on scope, guest count, and design complexity." },
];

const CLASSES = [
  { name: "Beginner Bouquet",        price: 85,  duration: "90 min", group: "Up to 12",  img: PINK_BOUQUET,   desc: "The perfect introduction to floral design. Learn stem selection, color theory, and hand-tying technique. Leave with your own wrapped bouquet and a care card." },
  { name: "Seasonal Design",         price: 110, duration: "2 hrs",  group: "Up to 10",  img: GARDEN_MIX,     desc: "Design with what's in season. AmiDayne walks you through the seasonal palette, pairing stems, and creating arrangements that reflect the time of year." },
  { name: "Advanced Arrangement",    price: 145, duration: "2.5 hrs",group: "Up to 8",   img: PURPLE_BOUQUET, desc: "For those ready to go deeper. Asymmetric design, tension and flow, negative space, and architectural arrangement techniques guided by AmiDayne." },
  { name: "Private Group Workshop",  price: 0,   duration: "Custom", group: "4–20 people",img: WORKSHOP_IMG,  desc: "Book a private class for your team, friends, or family. Fully customizable — choose your activity, color palette, and experience level. Custom pricing." },
];

// ── Shared UI components ───────────────────────────────────────────────────────
const SectionHead = ({ label, heading, center = false, light = false }: { label: string; heading: React.ReactNode; center?: boolean; light?: boolean }) => (
  <div className={center ? "text-center" : ""}>
    <p style={{ fontSize: "0.7rem", letterSpacing: "0.28em", color: light ? GOLD_L : GOLD, textTransform: "uppercase", marginBottom: "0.75rem" }}>{label}</p>
    <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 500, color: light ? IVORY : INK, lineHeight: 1.12 }}>{heading}</h2>
  </div>
);

const FaqBlock = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((faq, i) => (
        <div key={i} className="border-b" style={{ borderColor: BORDER }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left gap-4">
            <span style={{ fontFamily: serif, fontSize: "1.05rem", color: INK }}>{faq.q}</span>
            <ChevronDown size={15} style={{ color: MUTED, flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
          </button>
          {open === i && <div className="pb-5 pr-6" style={{ color: MUTED, lineHeight: 1.8, fontSize: "0.97rem" }}>{faq.a}</div>}
        </div>
      ))}
    </div>
  );
};

// ── Purse spotlight (own component so it can hold its own useState) ────────────
function PurseSpotlight({ onOrder }: { onOrder: () => void }) {
  const [spotVariant, setSpotVariant] = useState(0);
  const purseImgs   = [imgPurse, imgPurseBlack];
  const purseLabels = ["Gold Chain", "Black Chain"];
  return (
    <section className="border-b" style={{ borderColor: BORDER, background: CARD }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image panel — white bg so the purse pops */}
          <div className="flex flex-col items-center justify-center py-10 px-6 gap-5 order-2 md:order-1" style={{ background: "#fff", minHeight: "320px" }}>
            <ImageWithFallback
              src={purseImgs[spotVariant]}
              alt={`The Afuvai Purse — ${purseLabels[spotVariant]}`}
              style={{ maxHeight: "380px", width: "auto", objectFit: "contain" }}
            />
            {/* Chain toggle */}
            <div className="flex gap-3">
              {purseLabels.map((label, idx) => (
                <button key={label} onClick={() => setSpotVariant(idx)}
                  className="flex items-center gap-2 px-5 py-2.5 border text-sm font-medium transition-all"
                  style={{ borderColor: spotVariant === idx ? INK : BORDER, background: spotVariant === idx ? INK : "transparent", color: spotVariant === idx ? "#fff" : MUTED, letterSpacing: "0.06em" }}>
                  {spotVariant === idx && <Check size={11} strokeWidth={2.5} />}
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* Copy */}
          <div className="flex flex-col justify-center px-8 md:px-14 py-14 order-1 md:order-2 border-b md:border-b-0 md:border-l" style={{ borderColor: BORDER }}>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 self-start border" style={{ borderColor: BORDER_G, background: "rgba(184,153,90,0.08)" }}>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase" }}>✦ Signature Creation · Bestseller</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: INK, lineHeight: 1.1, marginBottom: "1.2rem" }}>
              The Afuvai<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Purse</em>
            </h2>
            <p style={{ color: MUTED, lineHeight: 1.85, fontSize: "1rem", marginBottom: "1.5rem", maxWidth: "420px" }}>
              Our most iconic creation — a fully bloomed luxury handbag hand-crafted from garden roses, peonies, carnations, and ranunculus. Available with a lustrous gold chain or a sleek matte black chain. No two are ever identical. Designed in Las Vegas, delivered to your door.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Garden Roses","Peonies","Carnations","Ranunculus","Gold or Black Chain"].map((t) => (
                <span key={t} className="px-3 py-1 border text-xs" style={{ color: SAGE, borderColor: SAGE, letterSpacing: "0.05em" }}>{t}</span>
              ))}
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: GOLD }}>From $225</span>
              <span style={{ fontSize: "0.82rem", color: MUTED }}>· Mini, Classic & Grand sizes</span>
            </div>
            <button onClick={onOrder}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold self-start hover:opacity-85 transition-opacity"
              style={{ background: SAGE, color: "#fff", letterSpacing: "0.06em" }}>
              Order The Purse <span style={{ marginLeft: "2px" }}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]             = useState<Page>("home");
  const [activeProd, setActiveProd] = useState<typeof PRODUCTS[0] | null>(null);
  const [activeOccasion, setActiveOccasion] = useState("All");
  const [cartItems, setCartItems]   = useState<{ id: number; name: string; price: number; qty: number; img: string; size: string }[]>([]);
  const [wishlist, setWishlist]     = useState<number[]>([]);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen]     = useState(false);
  const [showFab, setShowFab]       = useState(false);
  const [visible, setVisible]       = useState<Set<string>>(new Set());
  const searchRef = useRef<HTMLInputElement>(null);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);
  useEffect(() => {
    // Don't reset visible — keep already-seen sections visible across renders
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setVisible((p) => new Set([...p, e.target.id])); }),
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    const t = setTimeout(() => {
      document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
      // Immediately mark anything already in the viewport
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setVisible((p) => new Set([...p, el.id]));
        }
      });
    }, 30);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [page]);
  useEffect(() => {
    const fn = () => setShowFab(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const show = (id: string) => visible.has(id);

  const navigate = (p: Page, prod?: typeof PRODUCTS[0]) => {
    if (prod) setActiveProd(prod);
    setPage(p); setMenuOpen(false); setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigate to a page then scroll to a section anchor
  const goToSection = (p: Page, sectionId: string) => {
    setPage(p); setMenuOpen(false); setSearchOpen(false);
    window.scrollTo({ top: 0 });
    setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 180);
  };

  const addToCart = (product: typeof PRODUCTS[0], size: string, price: number) => {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.id === product.id && i.size === size);
      if (ex) return prev.map((i) => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price, qty: 1, img: product.img, size }];
    });
    setCartOpen(true);
    toast.success(`${product.name} (${size}) added to cart`);
  };

  const updateQty = (id: number, size: string, delta: number) =>
    setCartItems((prev) => prev.map((i) => i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0));

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filtered = activeOccasion === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeOccasion);
  const searchResults = searchQuery.length > 1
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // ── Logo ──────────────────────────────────────────────────────────────────────
  const Logo = ({ h = "44px" }: { h?: string }) => (
    <ImageWithFallback src={logoImg} alt="Afuvai Floral Society" style={{ height: h, width: "auto", objectFit: "contain" }} />
  );

  // ── Nav ───────────────────────────────────────────────────────────────────────
  const Nav = () => {
    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);
    const dropTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openDrop = () => { if (dropTimeout.current) clearTimeout(dropTimeout.current); setDropOpen(true); };
    const closeDrop = () => { dropTimeout.current = setTimeout(() => setDropOpen(false), 120); };

    const allDropPages = DROPDOWN_NAV.flatMap((s) => s.links.map((l) => l.page));
    const dropActive = allDropPages.includes(page as Page);

    return (
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(250,248,243,0.97)", borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(14px)" }}>
        {/* Marquee */}
        <div className="overflow-hidden py-1.5" style={{ background: SAGE }}>
          <div className="marquee-track flex gap-20 whitespace-nowrap" style={{ fontSize: "0.63rem", letterSpacing: "0.2em", color: "rgba(250,248,243,0.78)", textTransform: "uppercase" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex gap-20 flex-shrink-0">
                {["Las Vegas · Same-Day Delivery", "Floral Design Classes", "Hosted Floral Parties", "Now Booking 2026–2027", "Las Vegas · Henderson · Summerlin · North Las Vegas", "VIP Floral Experiences", "Bulk Flower Orders"].map((t) => (
                  <span key={t} className="flex items-center gap-2"><span style={{ color: GOLD_L }}>✦</span> {t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[62px] flex items-center justify-between gap-4">
          <button onClick={() => navigate("home")} className="flex-shrink-0"><Logo /></button>

          {/* Right side: nav links + icons together */}
          <div className="flex items-center gap-4">

          {/* Desktop primary links + dropdown */}
          <div className="hidden lg:flex items-center gap-5">
            {PRIMARY_NAV.map(({ label, page: target }) => {
              const active = page === target || (target === "home" && (page === "product" || page === "home"));
              return (
                <button key={label}
                  onClick={() => label === "Shop Collections" ? goToSection("home", "collections") : navigate(target)}
                  style={{ fontSize: "0.71rem", letterSpacing: "0.1em", textTransform: "uppercase", color: active ? SAGE : MUTED, fontWeight: active ? 500 : 400, transition: "color 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = active ? SAGE : MUTED)}>
                  {label}
                </button>
              );
            })}

            {/* "More" dropdown trigger */}
            <div className="relative" ref={dropRef} onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button
                className="flex items-center gap-1"
                style={{ fontSize: "0.71rem", letterSpacing: "0.1em", textTransform: "uppercase", color: dropActive ? SAGE : MUTED, fontWeight: dropActive ? 500 : 400, transition: "color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
                onMouseLeave={(e) => (e.currentTarget.style.color = dropActive ? SAGE : MUTED)}>
                More
                <ChevronDown size={12} style={{ transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "none" }} />
              </button>

              {/* Dropdown panel */}
              {dropOpen && (
                <div className="absolute top-full right-0 mt-3 border shadow-lg z-50"
                  style={{ background: IVORY, borderColor: BORDER, minWidth: "420px", boxShadow: "0 8px 32px rgba(26,26,20,0.10)" }}>
                  {/* Thin gold top accent */}
                  <div style={{ height: "2px", background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                  <div className="grid grid-cols-2 gap-0">
                    {DROPDOWN_NAV.map((section, si) => (
                      <div key={section.section} className={si === 0 ? "border-r p-5" : "p-5"} style={{ borderColor: BORDER }}>
                        <p style={{ fontSize: "0.6rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem", fontWeight: 600 }}>
                          {section.section}
                        </p>
                        <div className="space-y-1">
                          {section.links.map(({ label, page: target }) => {
                            const isActive = page === target;
                            return (
                              <button key={label} onClick={() => { navigate(target); setDropOpen(false); }}
                                className="w-full text-left flex items-center gap-2 px-3 py-2 transition-colors group"
                                style={{ background: isActive ? CARD : "transparent" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = CARD; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = isActive ? CARD : "transparent"; }}>
                                {isActive && <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: SAGE }} />}
                                <span style={{ fontSize: "0.85rem", color: isActive ? SAGE : INK, fontWeight: isActive ? 500 : 400 }}>{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Footer strip inside dropdown */}
                  <div className="border-t px-5 py-3 flex flex-wrap gap-x-5 gap-y-1" style={{ borderColor: BORDER, background: CARD }}>
                    {[
                      { label: "Subscriptions", page: "subscriptions" as Page },
                      { label: "Care Guide", page: "care" as Page },
                      { label: "Contact", page: "florist" as Page },
                      { label: "hello@afuvai.com", page: "florist" as Page },
                    ].map(({ label, page: target }) => (
                      <button key={label} onClick={() => { navigate(target); setDropOpen(false); }}
                        style={{ fontSize: "0.73rem", color: MUTED, letterSpacing: "0.04em" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = SAGE)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Icons */}
          <button onClick={() => setSearchOpen(!searchOpen)} style={{ color: MUTED }} className="hover:opacity-60 transition-opacity" aria-label="Search"><Search size={18} /></button>
          <button onClick={() => setCartOpen(!cartOpen)} className="relative hover:opacity-60 transition-opacity" style={{ color: MUTED }} aria-label="Cart">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 w-[17px] h-[17px] rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: SAGE, color: "#fff" }}>{cartCount}</span>}
          </button>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden hover:opacity-60 transition-opacity" style={{ color: MUTED }} aria-label="Menu"><Menu size={20} /></button>
        </div>{/* end right side */}
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t px-5 md:px-8 py-3" style={{ borderColor: BORDER, background: IVORY }}>
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <Search size={15} style={{ color: MUTED, flexShrink: 0 }} />
              <input ref={searchRef} type="text" placeholder="Search arrangements, occasions, classes..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base" style={{ color: INK }} />
              {searchQuery && <button onClick={() => setSearchQuery("")} style={{ color: MUTED }}><X size={13} /></button>}
            </div>
            {searchResults.length > 0 && (
              <div className="max-w-7xl mx-auto mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 pb-2">
                {searchResults.map((p) => (
                  <button key={p.id} onClick={() => navigate("product", p)} className="flex items-center gap-3 p-2.5 text-left rounded-sm" style={{ background: CARD }}>
                    <img src={p.img} alt={p.name} className="w-10 h-10 rounded-sm object-cover" />
                    <div>
                      <div className="text-sm font-medium" style={{ color: INK }}>{p.name}</div>
                      <div className="text-sm" style={{ color: MUTED }}>From ${p.sizes[0].price}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    );
  };

  // ── Mobile menu ───────────────────────────────────────────────────────────────
  const MobileMenu = () => (
    <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: SAGE }}>
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate("home")}><Logo h="40px" /></button>
        <button onClick={() => setMenuOpen(false)} style={{ color: "rgba(250,248,243,0.75)" }}><X size={22} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-8 py-4">
        {/* Primary links — large */}
        <div className="mb-4">
          {ALL_NAV_MOBILE.slice(0, 5).map(({ label, page: target }, i) => (
            <button key={label}
              onClick={() => label === "Shop Collections" ? goToSection("home", "collections") : navigate(target)}
              className="w-full text-left py-3 border-b"
              style={{ fontFamily: serif, fontSize: "1.55rem", color: IVORY, borderColor: "rgba(250,248,243,0.1)", animation: `fadeSlideIn 0.38s ease ${i * 0.05}s both` }}>
              {label}
            </button>
          ))}
        </div>
        {/* Secondary links — smaller, with label */}
        <div className="pt-4">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.24em", color: GOLD_L, textTransform: "uppercase", marginBottom: "0.75rem" }}>More</p>
          {ALL_NAV_MOBILE.slice(5).map(({ label, page: target }, i) => (
            <button key={label} onClick={() => navigate(target)}
              className="w-full text-left py-2.5 border-b"
              style={{ fontSize: "1rem", color: "rgba(250,248,243,0.75)", borderColor: "rgba(250,248,243,0.08)", fontFamily: sans, animation: `fadeSlideIn 0.38s ease ${(i + 5) * 0.04}s both` }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Footer info */}
      <div className="px-8 py-5 border-t" style={{ borderColor: "rgba(250,248,243,0.12)" }}>
        <p style={{ fontSize: "0.78rem", color: "rgba(250,248,243,0.5)", marginBottom: "0.75rem" }}>hello@afuvai.com · Open daily 9am–5pm</p>
        <div className="flex gap-5">
          <a href="https://instagram.com/afuvaifloral" target="_blank" rel="noreferrer" style={{ color: "rgba(250,248,243,0.45)" }}><Instagram size={17} /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: "rgba(250,248,243,0.45)" }}><Facebook size={17} /></a>
        </div>
      </div>
    </div>
  );

  // ── Cart drawer ───────────────────────────────────────────────────────────────
  const CartDrawer = () => (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
      <div className="relative w-full sm:max-w-sm flex flex-col h-full sm:border-l" style={{ background: IVORY, borderColor: BORDER }}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: BORDER }}>
          <span style={{ fontFamily: serif, fontSize: "1.1rem", color: INK }}>Your Selection</span>
          <button onClick={() => setCartOpen(false)} style={{ color: MUTED }}><X size={19} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {cartItems.length === 0
            ? <p className="text-center py-14" style={{ color: MUTED }}>Your cart is empty</p>
            : cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-sm flex-shrink-0" style={{ background: CARD }} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate" style={{ color: INK }}>{item.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: MUTED }}>{item.size} · ${item.price}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => updateQty(item.id, item.size, -1)} className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: BORDER }}><Minus size={9} /></button>
                  <span className="text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.size, 1)} className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: BORDER }}><Plus size={9} /></button>
                </div>
              </div>
            ))
          }
        </div>
        {cartItems.length > 0 && (
          <div className="px-6 py-6 border-t space-y-4" style={{ borderColor: BORDER }}>
            <div className="flex justify-between text-base"><span style={{ color: MUTED }}>Subtotal</span><span className="font-semibold" style={{ color: INK }}>${cartTotal}</span></div>
            <p className="text-xs flex items-center gap-1.5" style={{ color: SAGE }}><Truck size={12} /> Order by 2 pm for same-day Las Vegas delivery</p>
            <button
              onClick={() => redirectToStripeCheckout(cartItems)}
              className="w-full py-3.5 text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
              style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── FAB ───────────────────────────────────────────────────────────────────────
  const FloatingCTA = () => (
    <button onClick={() => navigate("parties")} className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 shadow-lg"
      style={{ background: GOLD, color: "#fff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", fontFamily: sans,
        opacity: showFab ? 1 : 0, transform: showFab ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease", pointerEvents: showFab ? "auto" : "none" }}>
      <Calendar size={14} /> Book a Party
    </button>
  );

  // ── Footer ────────────────────────────────────────────────────────────────────
  const Footer = () => (
    <footer className="border-t py-14" style={{ borderColor: BORDER, background: CARD }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-12">
          <div className="sm:col-span-2 md:col-span-2">
            <div className="mb-4"><Logo h="52px" /></div>
            <p style={{ fontSize: "0.87rem", color: MUTED, lineHeight: 1.75, maxWidth: "240px" }}>Luxury floral design, VIP experiences, and floral education delivered across the Las Vegas Valley.</p>
            <div className="mt-4 space-y-1.5">
              <a href="mailto:hello@afuvai.com" className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity" style={{ color: MUTED }}><Mail size={13} /> hello@afuvai.com</a>
              <p className="flex items-center gap-2 text-sm" style={{ color: MUTED }}><Clock size={13} /> Open daily, 9 am – 5 pm</p>
              <p className="flex items-center gap-2 text-sm" style={{ color: MUTED }}><MapPin size={13} /> Las Vegas Valley — delivery only</p>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/afuvaifloral" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity" style={{ color: SAGE }}><Instagram size={16} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity" style={{ color: SAGE }}><Facebook size={16} /></a>
            </div>
          </div>
          {[
            { title: "Shop", links: [
              { label: "All Arrangements", action: () => goToSection("home", "collections") },
              { label: "Bulk Orders",      action: () => navigate("bulk") },
              { label: "Portfolio",        action: () => navigate("portfolio") },
              { label: "Weddings",         action: () => navigate("weddings") },
              { label: "Subscriptions",    action: () => navigate("subscriptions") },
            ]},
            { title: "Experiences", links: [
              { label: "Bouquet Bar",      action: () => navigate("parties") },
              { label: "Floral Crown Bar", action: () => navigate("parties") },
              { label: "Classes",          action: () => navigate("classes") },
              { label: "Bachelorette",     action: () => navigate("parties") },
              { label: "Private Events",   action: () => navigate("parties") },
            ]},
            { title: "Company", links: [
              { label: "Meet AmiDayne",   action: () => navigate("florist") },
              { label: "Collaborations",  action: () => navigate("collabs") },
              { label: "Care Guide",      action: () => navigate("care") },
              { label: "Weddings",        action: () => navigate("weddings") },
              { label: "Contact",         action: () => navigate("florist") },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "1.1rem" }}>{col.title}</div>
              <div className="space-y-2.5">
                {col.links.map(({ label, action }) => (
                  <button key={label} onClick={action} className="block text-sm text-left transition-colors" style={{ color: MUTED }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = SAGE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>{label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t flex flex-col items-center md:flex-row md:justify-between gap-3 text-center md:text-left" style={{ borderColor: BORDER }}>
          <p style={{ fontSize: "0.75rem", color: MUTED }}>© 2025 Afuvai Floral Society · Las Vegas, NV</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            <button onClick={() => navigate("care")} className="transition-colors" style={{ fontSize: "0.78rem", color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = SAGE)} onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>Care Guide</button>
            <span style={{ fontSize: "0.78rem", color: MUTED }}>Privacy Policy</span>
            <span style={{ fontSize: "0.78rem", color: MUTED }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );

  // ── Product grid ──────────────────────────────────────────────────────────────
  const ProductGrid = () => (
    <>
      <div className="border-b sticky top-[88px] z-30" style={{ borderColor: BORDER, background: IVORY }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-hide">
            {OCCASIONS.map((occ) => (
              <button key={occ} onClick={() => setActiveOccasion(occ)} className="flex-shrink-0 px-5 py-2 text-sm font-medium rounded-full transition-all"
                style={{ letterSpacing: "0.08em", textTransform: "uppercase", background: activeOccasion === occ ? SAGE : "transparent", color: activeOccasion === occ ? "#fff" : MUTED, border: activeOccasion === occ ? `1px solid ${SAGE}` : "1px solid transparent" }}>
                {occ}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section id="collections" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div id="col-hdr" data-reveal className="flex items-end justify-between mb-12">
            <SectionHead label="Seasonal Selections" heading={<>The Current<br />Collection</>} />
            <button onClick={() => navigate("portfolio")} className="hidden md:flex items-center gap-1.5 text-sm" style={{ color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = SAGE)} onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
              View Portfolio <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((product, i) => (
              <div key={product.id} className="group cursor-pointer"
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => navigate("product", product)}>
                <div className="relative overflow-hidden rounded-sm aspect-[3/4] mb-4" style={{ background: CARD }}>
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {product.tag && <div className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold" style={{ background: GOLD, color: "#fff", letterSpacing: "0.08em" }}>{product.tag}</div>}
                  <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(250,248,243,0.9)", backdropFilter: "blur(4px)" }}>
                    <Heart size={14} fill={wishlist.includes(product.id) ? SAGE : "none"} stroke={wishlist.includes(product.id) ? SAGE : INK} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: "rgba(250,248,243,0.97)" }}>
                    <button onClick={(e) => { e.stopPropagation(); navigate("product", product); }} className="w-full py-3 text-sm font-semibold uppercase hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>Select Options</button>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 style={{ fontFamily: serif, fontSize: "1.08rem", fontWeight: 500, color: INK, marginBottom: "4px" }}>{product.name}</h3>
                    <p style={{ fontSize: "0.86rem", color: MUTED, lineHeight: 1.55 }}>{product.desc}</p>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: "1rem", color: GOLD, flexShrink: 0 }}>From ${product.sizes[0].price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // HOME PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const HomePage = () => (
    <>
      {/* Hero — full-bleed, fixed nav gap corrected */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "100dvh", paddingTop: "90px" }}>
        <div className="absolute inset-0" style={{ background: CARD }}>
          <img src={HERO_IMG} alt="Luxury floral arrangement by Afuvai Floral Society" className="w-full h-full object-cover" style={{ opacity: 0.62 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 22%, rgba(250,248,243,0.55) 58%, rgba(250,248,243,0.04) 100%)` }} />
        </div>

        {/* Announcement pill — positioned relative to section padding */}
        <div className="absolute left-0 right-0 flex justify-center" style={{ top: "96px" }}>
          <div className="flex items-center gap-2.5 px-5 py-2 border" style={{ background: "rgba(250,248,243,0.9)", borderColor: BORDER_G, backdropFilter: "blur(10px)" }}>
            <span style={{ color: SAGE, fontSize: "0.7rem" }}>✦</span>
            <span style={{ fontSize: "0.67rem", letterSpacing: "0.18em", color: SAGE, textTransform: "uppercase" }}>Same-day delivery · Las Vegas Valley</span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
          <div className="max-w-2xl">
            
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 7vw, 5.6rem)", fontWeight: 500, lineHeight: 1.06, color: INK, marginBottom: "1.5rem", marginTop: "3.5rem" }}>
              Flowers that<br /><em style={{ color: GOLD, fontStyle: "italic" }}>speak</em> before<br />words do.
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: MUTED, maxWidth: "480px", marginBottom: "2.5rem" }}>
              Afuvai Floral Society crafts bespoke arrangements, teaches floral design, and hosts VIP experiences across Las Vegas, Henderson & Summerlin.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button onClick={() => goToSection("home", "collections")} className="flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium hover:opacity-85 transition-opacity" style={{ background: GOLD, color: "#fff", letterSpacing: "0.06em" }}>
                Shop Collections <ArrowRight size={15} />
              </button>
              <button onClick={() => navigate("classes")} className="flex items-center justify-center gap-2 px-6 py-3.5 text-base border hover:bg-card transition-colors" style={{ color: INK, borderColor: BORDER, letterSpacing: "0.06em" }}>
                View Classes
              </button>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-6 md:gap-14 border-t pt-6" style={{ borderColor: BORDER }}>
            {[["1,200+","Events Designed"],["6+","Years of Craft"],["4.9 ★","Avg. Rating"],["LV","Same-Day Delivery"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: serif, fontSize: "1.5rem", color: GOLD, fontWeight: 500 }}>{val}</div>
                <div style={{ fontSize: "0.7rem", color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{icon:Leaf,label:"Sustainably Sourced"},{icon:Truck,label:"Same-Day LV Delivery"},{icon:Star,label:"4.9 ★ Rated"},{icon:Heart,label:"Bespoke, Hand-Arranged"}].map(({icon:Icon,label}) => (
            <div key={label} className="flex items-center gap-2.5"><Icon size={15} style={{ color: SAGE, flexShrink: 0 }} /><span style={{ fontSize: "0.82rem", color: MUTED }}>{label}</span></div>
          ))}
        </div>
      </div>


      {/* Collaborations strip */}
      <div id="collaborations" className="border-b py-6" style={{ borderColor: BORDER, background: IVORY }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.25em", color: MUTED, textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>Collaborations & Venue Partners</p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide items-center justify-start md:justify-center pb-1">
            {[
              { name: "The Venetian",   cat: "Wedding Venue" },
              { name: "Bellagio",       cat: "Luxury Hotel" },
              { name: "Wynn Las Vegas", cat: "Events Partner" },
              { name: "Four Seasons",   cat: "Floral Partner" },
              { name: "Caesars Palace", cat: "Corporate Client" },
              { name: "MGM Grand",      cat: "Event Florals" },
            ].map((p) => (
              <button key={p.name} onClick={() => navigate("collabs")}
                className="flex-shrink-0 flex flex-col items-center gap-1 px-5 py-3 border rounded-sm transition-all hover:border-current"
                style={{ borderColor: BORDER }}>
                <span style={{ fontFamily: serif, fontSize: "0.92rem", color: INK, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{p.name}</span>
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase" }}>{p.cat}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-4">
            <button onClick={() => navigate("collabs")} style={{ fontSize: "0.78rem", color: SAGE, letterSpacing: "0.08em" }}>
              Partner with us → Become a collaborator
            </button>
          </div>
        </div>
      </div>

      {/* Classes teaser */}
      <section className="py-8 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-5 min-w-0">
              <div className="overflow-hidden rounded-sm flex-shrink-0" style={{ width: "80px", height: "80px" }}>
                <img src={WORKSHOP_IMG} alt="Floral design classes" className="w-full h-full object-cover" />
              </div>
              <div>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "0.25rem" }}>Learn · Create · Connect</p>
                <h3 style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 500, color: INK }}>Floral Design Classes with AmiDayne</h3>
                <p style={{ fontSize: "0.85rem", color: MUTED, marginTop: "2px" }}>Beginner Bouquet · Seasonal Design · Advanced · Private Group</p>
              </div>
            </div>
            <button onClick={() => navigate("classes")} className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.06em" }}>
              View Classes <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <ProductGrid />

      {/* Venue strip */}
      <div className="border-y py-8" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.25em", color: MUTED, textTransform: "uppercase", textAlign: "center", marginBottom: "1.2rem" }}>Trusted at Las Vegas's finest venues</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center">
            {["The Venetian","Bellagio","Wynn","Four Seasons","Caesars Palace"].map((v) => (
              <span key={v} style={{ fontFamily: serif, fontSize: "0.92rem", color: MUTED, letterSpacing: "0.05em", opacity: 0.65 }}>{v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="py-20 md:py-28 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-7">
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.4rem" }}>Our Process</p>
            <h2 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 500, color: INK }}>How it works</h2>
          </div>
          <div className="grid md:grid-cols-3">
            {[{num:"01",title:"Consult",desc:"Tell us your vision, occasion, and palette. Every arrangement begins with a conversation.",img:amiDayneImg},
              {num:"02",title:"Design",desc:"Our floral artists craft each arrangement by hand using sustainably sourced seasonal blooms.",img:WORKSHOP_IMG},
              {num:"03",title:"Deliver",desc:"White-glove delivery anywhere in the Las Vegas Valley. Same-day available on select orders.",img:imgGoldenHour}].map((s) => (
              <div key={s.num} className="border-b md:border-b-0 md:border-r last:border-0" style={{ borderColor: BORDER }}>
                <div className="overflow-hidden" style={{ height: "140px" }}><img src={s.img} alt={s.title} className="w-full h-full object-cover" /></div>
                <div className="flex items-start gap-3 p-5">
                  <div style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD, opacity: 0.4, lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>{s.num}</div>
                  <div>
                    <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{s.title}</h3>
                    <p style={{ color: MUTED, lineHeight: 1.65, fontSize: "0.87rem" }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weddings teaser */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">
          <div className="grid md:grid-cols-2 border" style={{ borderColor: BORDER }}>
            <div className="relative overflow-hidden" style={{ minHeight: "260px" }}>
              <img src={imgHexArch} alt="Wedding floral arch" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center px-8 md:px-12 py-14 border-t md:border-t-0 md:border-l" style={{ borderColor: BORDER, background: CARD }}>
              <SectionHead label="Weddings & Events" heading={<>Your day,<br /><em style={{ color: SAGE, fontStyle: "italic" }}>reimagined</em><br />in bloom.</>} />
              <p style={{ color: MUTED, lineHeight: 1.8, fontSize: "1rem", marginTop: "1.4rem", marginBottom: "2rem", maxWidth: "420px" }}>
                From intimate elopements at Red Rock Canyon to grand receptions on the Strip — our wedding team handles every floral detail.
              </p>
              <div className="space-y-2.5 mb-8">
                {["Full ceremony & reception florals","Bridal party packages","On-site installation & styling","Custom consultation included"].map((item) => (
                  <div key={item} className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: SAGE }} /><span style={{ fontSize: "0.94rem", color: MUTED }}>{item}</span></div>
                ))}
              </div>
              <button onClick={() => navigate("weddings")} className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold self-start hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.06em" }}>
                Explore Weddings <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Parties teaser */}
      <section className="py-20 md:py-24 border-b" style={{ borderColor: BORDER, background: SAGE }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <SectionHead label="Hosted Floral Experiences" heading={<>Floral parties<br /><em style={{ color: GOLD_L, fontStyle: "italic" }}>unlike anything</em><br />else in Las Vegas.</>} light />
            <p style={{ color: "rgba(250,248,243,0.7)", lineHeight: 1.8, fontSize: "1rem", marginTop: "1.2rem", marginBottom: "2rem" }}>From intimate bouquet bars to full bachelorette pop-ups, we bring the studio to you.</p>
            <button onClick={() => navigate("parties")} className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold hover:opacity-85 transition-opacity" style={{ background: GOLD, color: "#fff", letterSpacing: "0.06em" }}>
              Explore & Book <ArrowRight size={15} />
            </button>
          </div>
          <div className="relative overflow-hidden" style={{ minHeight: "360px", background: SAGE_D }}>
            <img src={PARTY_IMG} alt="Afuvai floral party experience" className="w-full h-full object-cover" style={{ opacity: 0.82 }} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12"><SectionHead label="Client Stories" heading="What our clients say" center /></div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-7 border" style={{ borderColor: BORDER, background: IVORY }}>
                <div className="flex gap-1 mb-4">{Array.from({length:t.rating}).map((_,i) => <Star key={i} size={12} fill={GOLD} stroke="none" />)}</div>
                <p style={{ color: MUTED, lineHeight: 1.85, fontSize: "0.94rem", marginBottom: "1.5rem", fontStyle: "italic" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm" style={{ background: SAGE, color: "#fff" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: "0.94rem", color: INK }}>{t.name}</div>
                    <div style={{ fontSize: "0.7rem", color: MUTED }}>{t.city}</div>
                  </div>
                  <span className="ml-auto text-xs flex items-center gap-1" style={{ color: SAGE }}><Check size={10} /> Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="border-b py-14" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3"><Instagram size={16} style={{ color: SAGE }} /><span style={{ fontFamily: serif, fontSize: "1.05rem", color: INK }}>@afuvaifloral</span></div>
            <a href="https://instagram.com/afuvaifloral" target="_blank" rel="noreferrer" className="text-sm" style={{ color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = SAGE)} onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>Follow Us</a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[imgPurse,imgGoldenHour,imgSummerRadiance,imgJewelGarden,imgWildMeadow,imgStatement].map((img,i) => (
              <a key={i} href="https://instagram.com/afuvaifloral" target="_blank" rel="noreferrer" className="relative overflow-hidden aspect-square group block">
                <img src={img} alt="Afuvai Instagram" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(90,107,84,0.48)" }}><Instagram size={20} color="#fff" /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
          <SectionHead label="Stay in Bloom" heading={<span style={{ color:"#fff" }}>Seasonal stories,<br />new arrivals & class dates.</span>} center light />
          <p style={{ color:"rgba(250,248,243,0.65)", fontSize:"1rem", marginTop:"1rem", marginBottom:"2rem" }}>Join 8,400+ subscribers for Las Vegas floral news, care guides, class announcements, and early booking access.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-0">
            <input type="email" placeholder="Your email address" className="flex-1 px-5 py-4 text-base outline-none" style={{ background:"rgba(255,255,255,0.12)", color:"#fff" }} />
            <button className="px-6 py-4 text-sm font-semibold flex-shrink-0 hover:opacity-85 transition-opacity" style={{ background:GOLD, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase" }}>Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // PRODUCT PAGE — Bouqs-style with subscribe-first, add-on photos
  // ─────────────────────────────────────────────────────────────────────────────
  const ProductPage = ({ product }: { product: typeof PRODUCTS[0] }) => {
    const [purchaseMode, setPurchaseMode] = useState<"subscribe" | "onetime">("subscribe");
    const [selSize, setSelSize]     = useState(product.sizes[1]);
    const [subFreq, setSubFreq]     = useState("Monthly");
    const [selDate, setSelDate]     = useState("");
    const [zipcode, setZipcode]     = useState("");
    const [note, setNote]           = useState("");
    const [noNote, setNoNote]       = useState(false);
    const [selAddons, setSelAddons] = useState<string[]>([]);
    const hasVariants = !!(product as typeof PRODUCTS[0] & { variants?: { label: string; img: string }[] }).variants;
    const variants = (product as typeof PRODUCTS[0] & { variants?: { label: string; img: string }[] }).variants ?? [];
    const [selVariant, setSelVariant] = useState(0);
    const displayImg = hasVariants ? variants[selVariant].img : product.img;

    const toggleAddon = (id: string) => setSelAddons((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    const addonTotal = ADDONS.filter((a) => selAddons.includes(a.id)).reduce((s, a) => s + a.price, 0);
    const basePrice = purchaseMode === "subscribe" ? Math.round(selSize.price * 0.85) : selSize.price;
    const total = basePrice + addonTotal;
    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

    const handleAdd = () => {
      if (!zipcode) { toast.error("Please enter a delivery zip code."); return; }
      addToCart(product, selSize.label, total);
    };

    return (
      <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
        {/* Breadcrumb */}
        <div className="border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center gap-2 text-sm" style={{ color: MUTED }}>
            <button onClick={() => navigate("home")} className="hover:underline">Collections</button>
            <ChevronRight size={13} />
            <span style={{ color: INK }}>{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">

            {/* Left: product image */}
            <div className="md:sticky md:top-[100px] md:self-start">
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm" style={{ background: product.id === 1 ? "#fff" : CARD }}>
                <ImageWithFallback src={displayImg} alt={product.name} className="w-full h-full object-contain" style={{ objectFit: product.id === 1 ? "contain" : "cover" }} />
                {product.tag && <div className="absolute top-5 left-5 px-3 py-1 text-xs font-semibold" style={{ background: GOLD, color: "#fff", letterSpacing: "0.08em" }}>{product.tag}</div>}
                <button onClick={() => toggleWishlist(product.id)} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(250,248,243,0.9)", backdropFilter: "blur(4px)" }}>
                  <Heart size={16} fill={wishlist.includes(product.id) ? SAGE : "none"} stroke={wishlist.includes(product.id) ? SAGE : INK} />
                </button>
              </div>
              {/* Variant thumbnails for purse */}
              {hasVariants && (
                <div className="flex gap-3 mt-3">
                  {variants.map((v, idx) => (
                    <button key={v.label} onClick={() => setSelVariant(idx)}
                      className="flex-1 flex items-center gap-2 p-2 border transition-all"
                      style={{ borderColor: selVariant === idx ? SAGE : BORDER, background: selVariant === idx ? CARD : IVORY }}>
                      <div className="w-10 h-10 overflow-hidden flex-shrink-0" style={{ background: "#fff" }}>
                        <ImageWithFallback src={v.img} alt={v.label} className="w-full h-full object-contain" />
                      </div>
                      <span style={{ fontSize: "0.78rem", color: selVariant === idx ? INK : MUTED, fontWeight: selVariant === idx ? 500 : 400 }}>{v.label}</span>
                      {selVariant === idx && <Check size={12} style={{ color: SAGE, marginLeft: "auto" }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: purchase panel */}
            <div className="flex flex-col gap-7">

              {/* Name + desc */}
              <div>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.5rem" }}>{product.category}</p>
                <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 500, color: INK, marginBottom: "0.6rem" }}>{product.name}</h1>
                <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.97rem" }}>{product.desc}</p>
              </div>

              {/* ── CHAIN COLOR (Purse only) ── */}
              {hasVariants && (
                <div>
                  <p className="mb-3" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Chain Color</p>
                  <div className="grid grid-cols-2 gap-3">
                    {variants.map((v, idx) => (
                      <button key={v.label} onClick={() => setSelVariant(idx)}
                        className="flex items-center gap-3 p-3 border transition-all"
                        style={{ borderColor: selVariant === idx ? SAGE : BORDER, background: selVariant === idx ? CARD : "transparent",
                          outline: selVariant === idx ? `2px solid ${SAGE}` : "none", outlineOffset: "-1px" }}>
                        <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0" style={{ background: "#fff" }}>
                          <ImageWithFallback src={v.img} alt={v.label} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 text-left">
                          <div style={{ fontSize: "0.88rem", color: INK, fontWeight: selVariant === idx ? 600 : 400 }}>{v.label}</div>
                        </div>
                        {selVariant === idx && <Check size={14} style={{ color: SAGE, flexShrink: 0 }} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── PURCHASING OPTIONS ── */}
              <div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: MUTED, textTransform: "uppercase", marginBottom: "0.75rem" }}>Purchasing Options</p>
                <div className="grid grid-cols-2 gap-0">
                  <button onClick={() => setPurchaseMode("subscribe")} className="py-3.5 text-sm font-medium border-y border-l transition-all"
                    style={{ background: purchaseMode === "subscribe" ? SAGE : IVORY, color: purchaseMode === "subscribe" ? "#fff" : MUTED, borderColor: BORDER, letterSpacing: "0.06em" }}>
                    Subscribe & Save
                  </button>
                  <button onClick={() => setPurchaseMode("onetime")} className="py-3.5 text-sm font-medium border transition-all"
                    style={{ background: purchaseMode === "onetime" ? SAGE : IVORY, color: purchaseMode === "onetime" ? "#fff" : MUTED, borderColor: BORDER, letterSpacing: "0.06em" }}>
                    One-Time
                  </button>
                </div>

                {/* Subscribe panel — warm ivory, gold accent border */}
                {purchaseMode === "subscribe" && (
                  <div className="p-5 border-x border-b" style={{ borderColor: BORDER, background: IVORY }}>
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: BORDER }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: SAGE }}>
                        <Repeat size={13} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: INK }}>Subscribe & Save 15%</div>
                        <div style={{ fontSize: "0.72rem", color: MUTED }}>On every delivery — cancel anytime</div>
                      </div>
                    </div>
                    <div className="space-y-2.5 mb-5">
                      {[
                        { dot: GOLD, text: "Best Value — save 15% on every order" },
                        { dot: SAGE, text: "Flexible — pick weekly, bi-weekly, or monthly" },
                        { dot: SAGE, text: "No Obligations — skip, pause, or cancel anytime" },
                      ].map(({ dot, text }) => (
                        <div key={text} className="flex items-center gap-3 text-sm" style={{ color: MUTED }}>
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
                          {text}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: "0.6rem" }}>Delivery Frequency</p>
                      <div className="flex gap-2">
                        {["Weekly","Bi-Weekly","Monthly"].map((f) => (
                          <button key={f} onClick={() => setSubFreq(f)} className="flex-1 py-2.5 text-xs font-medium border transition-all"
                            style={{ background: subFreq === f ? SAGE : "transparent", color: subFreq === f ? "#fff" : MUTED, borderColor: subFreq === f ? SAGE : BORDER, letterSpacing: "0.05em" }}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size selection */}
              <div>
                <p className="mb-3" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Select Size</p>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {product.sizes.map((s, idx) => (
                    <button key={s.label} onClick={() => setSelSize(s)} className="relative py-3.5 px-1 border text-center transition-all"
                      style={{ borderColor: selSize.label === s.label ? SAGE : BORDER, background: selSize.label === s.label ? CARD : "transparent", outline: selSize.label === s.label ? `2px solid ${SAGE}` : "none", outlineOffset: "-1px" }}>
                      {idx === 1 && (
                        <div className="absolute -top-2.5 left-0 right-0 flex justify-center">
                          <span className="px-2 py-0.5 text-[9px] font-semibold" style={{ background: GOLD, color: "#fff", letterSpacing: "0.06em" }}>MOST POPULAR</span>
                        </div>
                      )}
                      <div style={{ fontFamily: serif, fontSize: "0.95rem", color: INK }}>{s.label}</div>
                      <div style={{ fontSize: "0.9rem", color: purchaseMode === "subscribe" ? SAGE : GOLD, fontWeight: 600, marginTop: "4px" }}>
                        ${purchaseMode === "subscribe" ? Math.round(s.price * 0.85) : s.price}
                      </div>
                      {purchaseMode === "subscribe" && (
                        <div className="line-through text-xs mt-0.5" style={{ color: MUTED }}>${s.price}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery date */}
              <div>
                <label className="block mb-2" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
                  <Calendar size={12} className="inline mr-1.5" />Delivery Date
                </label>
                <input type="date" value={selDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setSelDate(e.target.value)}
                  className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }} />
                <p className="text-xs mt-1.5" style={{ color: MUTED }}>Order by 2 pm for same-day delivery.</p>
              </div>

              {/* Zip */}
              <div>
                <label className="block mb-2" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
                  <MapPin size={12} className="inline mr-1.5" />Delivery Zip Code <span style={{ color: MUTED, fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional — enter at checkout)</span>
                </label>
                <input type="text" placeholder="e.g. 89101" maxLength={5} value={zipcode}
                  onChange={(e) => setZipcode(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 text-base outline-none border transition-colors"
                  style={{ background: CARD, borderColor: zipcode.length > 0 && zipcode.length < 5 ? "#c0392b" : BORDER, color: INK }} />
                {zipcode.length > 0 && zipcode.length < 5 && (
                  <p className="text-xs mt-1.5" style={{ color: "#c0392b" }}>Please enter a full 5-digit zip code.</p>
                )}
                {zipcode.length === 0 && (
                  <p className="text-xs mt-1.5" style={{ color: MUTED }}>We deliver across Las Vegas, Henderson, Summerlin & North Las Vegas.</p>
                )}
                {zipcode.length === 5 && (
                  <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: SAGE }}><Check size={11} strokeWidth={2.5} /> Delivery available to this area</p>
                )}
              </div>

              {/* Gift note */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Gift Note</label>
                  {/* Custom toggle instead of checkbox */}
                  <button onClick={() => setNoNote(!noNote)}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: noNote ? SAGE : MUTED }}>
                    <div className="w-4 h-4 border flex items-center justify-center transition-all"
                      style={{ borderColor: noNote ? SAGE : BORDER, background: noNote ? SAGE : "transparent" }}>
                      {noNote && <Check size={10} color="#fff" strokeWidth={3} />}
                    </div>
                    No note
                  </button>
                </div>
                <textarea rows={3} placeholder="Write a personal message for the recipient..."
                  value={noNote ? "" : note} disabled={noNote} onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 text-base outline-none border resize-none"
                  style={{ background: noNote ? CARD : IVORY, borderColor: BORDER, color: INK, opacity: noNote ? 0.45 : 1, transition: "opacity 0.2s" }} />
              </div>

              {/* Add-ons WITH PHOTOS */}
              <div>
                <p className="mb-3" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Add-Ons</p>
                <div className="space-y-2">
                  {ADDONS.map((addon) => {
                    const selected = selAddons.includes(addon.id);
                    return (
                      <button key={addon.id} onClick={() => toggleAddon(addon.id)}
                        className="w-full flex items-center gap-3 p-3 border text-left transition-all"
                        style={{ borderColor: selected ? SAGE : BORDER, background: selected ? CARD : IVORY }}>
                        {/* Custom check indicator */}
                        <div className="w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all"
                          style={{ borderColor: selected ? SAGE : BORDER, background: selected ? SAGE : "transparent" }}>
                          {selected && <Check size={11} color="#fff" strokeWidth={2.5} />}
                        </div>
                        <img src={addon.img} alt={addon.label} className="w-10 h-10 rounded-sm object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: "0.88rem", color: INK, fontWeight: 500 }}>{addon.label}</div>
                          <div className="hidden sm:block" style={{ fontSize: "0.75rem", color: MUTED, marginTop: "1px" }}>{addon.desc}</div>
                        </div>
                        <span style={{ fontSize: "0.88rem", color: GOLD, fontWeight: 600, flexShrink: 0 }}>+${addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total + CTA */}
              <div className="pt-4 border-t" style={{ borderColor: BORDER }}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div style={{ color: MUTED, fontSize: "0.85rem" }}>Total</div>
                    {purchaseMode === "subscribe" && (
                      <div style={{ fontSize: "0.75rem", color: SAGE }}>Includes 15% subscription discount</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div style={{ fontFamily: serif, fontSize: "1.7rem", color: INK }}>${total}</div>
                    {purchaseMode === "subscribe" && (
                      <div className="line-through text-sm" style={{ color: MUTED }}>${selSize.price + addonTotal}</div>
                    )}
                  </div>
                </div>

                {/* Primary CTA — always enabled, zip validated at checkout */}
                <button
                  onClick={() => {
                    if (zipcode.length > 0 && zipcode.length < 5) {
                      toast.error("Please enter a complete 5-digit zip code.");
                      return;
                    }
                    addToCart(product, selSize.label, total);
                  }}
                  className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity"
                  style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>
                  {purchaseMode === "subscribe" ? `Subscribe — ${subFreq}` : "Add to Cart"}
                </button>

                {/* View Cart shortcut */}
                <button
                  onClick={() => {
                    if (zipcode.length > 0 && zipcode.length < 5) {
                      toast.error("Please enter a complete 5-digit zip code.");
                      return;
                    }
                    addToCart(product, selSize.label, total);
                    // cart drawer opens automatically via addToCart
                  }}
                  className="w-full py-3 mt-2 text-sm font-medium border hover:bg-card transition-colors flex items-center justify-center gap-2"
                  style={{ borderColor: BORDER, color: INK, letterSpacing: "0.06em" }}>
                  <ShoppingBag size={14} /> Add to Cart & View Cart
                </button>

                <p className="text-xs text-center mt-3 flex items-center justify-center gap-1.5" style={{ color: MUTED }}>
                  <Truck size={12} /> Complimentary delivery on orders over $200
                </p>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t" style={{ borderColor: BORDER }}>
              <h3 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 500, color: INK, marginBottom: "1.5rem" }}>You may also like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => (
                  <div key={p.id} className="group cursor-pointer" onClick={() => { navigate("product", p); window.scrollTo({ top: 0 }); }}>
                    <div className="relative overflow-hidden aspect-[3/4] mb-3" style={{ background: CARD }}>
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div style={{ fontFamily: serif, fontSize: "1rem", color: INK }}>{p.name}</div>
                    <div style={{ fontSize: "0.88rem", color: GOLD, marginTop: "2px" }}>From ${p.sizes[0].price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // PORTFOLIO PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const PortfolioPage = () => {
    const [cat, setCat] = useState("All");
    const items = cat === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === cat);
    return (
      <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
        <div className="relative overflow-hidden" style={{ height: "300px", background: CARD }}>
          <img src={imgHexArch} alt="Portfolio" className="w-full h-full object-cover" style={{ opacity: 0.55 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 10%, rgba(250,248,243,0.3) 100%)` }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>Our Work</p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 500, color: INK, textAlign: "center" }}>Portfolio</h1>
          </div>
        </div>
        <div className="border-b sticky top-[88px] z-30" style={{ borderColor: BORDER, background: IVORY }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-hide">
              {PORTFOLIO_CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className="flex-shrink-0 px-5 py-2 text-sm font-medium rounded-full transition-all"
                  style={{ letterSpacing: "0.08em", textTransform: "uppercase", background: cat === c ? SAGE : "transparent", color: cat === c ? "#fff" : MUTED, border: cat === c ? `1px solid ${SAGE}` : "1px solid transparent" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <div key={item.id} className="group relative overflow-hidden cursor-pointer" style={{ aspectRatio: i % 7 === 0 ? "3/4" : i % 5 === 0 ? "4/3" : "1/1", background: CARD }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(26,26,20,0.82) 40%, transparent 100%)" }}>
                  <div style={{ fontSize: "0.68rem", color: GOLD_L, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.category}</div>
                  <div style={{ fontFamily: serif, fontSize: "0.95rem", color: "#fff" }}>{item.title}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>{item.venue}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <p style={{ color: MUTED, marginBottom: "1.5rem", fontSize: "0.97rem" }}>Like what you see? Let's create something extraordinary together.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate("weddings")} className="px-7 py-3.5 text-base font-medium hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff" }}>Plan a Wedding</button>
              <button onClick={() => navigate("parties")} className="px-7 py-3.5 text-base border hover:bg-card transition-colors" style={{ color: INK, borderColor: BORDER }}>Book a Party</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // WEDDINGS PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const WeddingsPage = () => {
    const [form, setForm] = useState({ name:"", email:"", phone:"", date:"", venue:"", guests:"", budget:"", notes:"" });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Consultation request received! We'll be in touch within 48 hours."); setForm({ name:"", email:"", phone:"", date:"", venue:"", guests:"", budget:"", notes:"" }); };
    return (
      <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
        <section className="relative overflow-hidden" style={{ minHeight: "clamp(320px, 65vh, 600px)" }}>
          <img src={imgHexArch} alt="Wedding floral arch" className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.6 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 15%, rgba(250,248,243,0.2) 100%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 flex flex-col justify-end" style={{ minHeight: "clamp(320px, 65vh, 600px)" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Las Vegas Luxury Wedding Florals</p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05, marginBottom: "1.2rem" }}>
              Your day,<br /><em style={{ color: GOLD, fontStyle: "italic" }}>reimagined</em><br />in bloom.
            </h1>
          </div>
        </section>
        <section className="py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-14"><SectionHead label="What We Do" heading={<>Full-service wedding<br />floral design.</>} /></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{img:imgWildMeadow,title:"Bridal Bouquet",desc:"Your signature bouquet designed around your vision, gown, and color story."},
                {img:imgHexArch,title:"Ceremony Arch & Altar",desc:"Dramatic ceremony installations — hexagonal wood arches, iron garden arches, columns, and pew arrangements."},
                {img:RECEPTION_TABLE,title:"Reception Tablescapes",desc:"Full table florals including centerpieces, runners, and place settings."},
                {img:WEDDING_DECOR,title:"Bridal Party Flowers",desc:"Coordinated bouquets and boutonnieres for your entire wedding party."},
                {img:WHITE_FLORAL,title:"Venue Styling",desc:"Ambient floral styling throughout your venue — cocktail hour, lounge, and signage."},
                {img:ORCHID_DARK,title:"Custom Installations",desc:"Bespoke large-scale floral walls, chandeliers, and statement pieces."}].map((s) => (
                <div key={s.title} className="group">
                  <div className="overflow-hidden rounded-sm aspect-[4/3] mb-4" style={{ background: CARD }}>
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: INK, marginBottom: "4px" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-10 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center mb-7">
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.4rem" }}>Our Wedding Process</p>
              <h2 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 500, color: INK }}>From first hello to your big day</h2>
            </div>
            <div className="grid md:grid-cols-4">
              {[{num:"01",title:"Complimentary Consult",desc:"We meet to discuss your vision, venue, and palette."},
                {num:"02",title:"Custom Proposal",desc:"Detailed design proposal and quote within 5 days."},
                {num:"03",title:"Sample Session",desc:"Mini versions of your arrangements for your approval."},
                {num:"04",title:"Your Wedding Day",desc:"We arrive early, install everything, and handle all florals."}].map((s) => (
                <div key={s.num} className="flex items-start gap-3 p-5 border-b md:border-b-0 md:border-r last:border-0" style={{ borderColor: BORDER }}>
                  <div style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD, opacity: 0.4, lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>{s.num}</div>
                  <div>
                    <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{s.title}</h3>
                    <p style={{ color: MUTED, lineHeight: 1.65, fontSize: "0.87rem" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <SectionHead label="Wedding Gallery" heading="Recent work" />
              <button onClick={() => navigate("portfolio")} className="hidden md:flex items-center gap-1.5 text-sm" style={{ color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = SAGE)} onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}>
                Full Portfolio <ChevronRight size={13} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[imgHexArch,imgMetalArch,imgWildMeadow,imgPureSerenity,RECEPTION_TABLE,WHITE_FLORAL].map((img,i) => (
                <div key={i} className="relative overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/5", background: CARD }}>
                  <img src={img} alt="Wedding florals" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <SectionHead label="Let's Begin" heading="Request a consultation" center />
              <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem" }}>Complimentary consultations for all wedding inquiries. We respond within 48 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {[{label:"Full Name",key:"name",type:"text",placeholder:"Jane Smith"},{label:"Email",key:"email",type:"email",placeholder:"jane@example.com"},
                  {label:"Phone",key:"phone",type:"tel",placeholder:"(702) 555-0100"},{label:"Wedding Date",key:"date",type:"date",placeholder:""},
                  {label:"Venue Name",key:"venue",type:"text",placeholder:"e.g. Bellagio, private estate..."},{label:"Estimated Guests",key:"guests",type:"text",placeholder:"e.g. 150"}].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                    <input required={key !== "venue"} type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Estimated Budget</label>
                <select value={form.budget} onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))} className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }}>
                  <option value="">Select a range</option><option>$1,500 – $3,000</option><option>$3,000 – $6,000</option><option>$6,000 – $10,000</option><option>$10,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Vision & Notes</label>
                <textarea rows={4} placeholder="Color palette, style inspiration, anything special about your day..." value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border resize-none" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
              </div>
              <button type="submit" className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>Request Consultation</button>
            </form>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-5 md:px-8">
            <div className="text-center mb-12"><SectionHead label="Questions" heading="Wedding FAQ" center /></div>
            <FaqBlock items={FAQS_WEDDINGS} />
          </div>
        </section>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // PARTIES PAGE — experiences first, form second
  // ─────────────────────────────────────────────────────────────────────────────
  const PartiesPage = () => {
    const [form, setForm] = useState({ name:"", email:"", phone:"", type:"private", guests:"", date:"", occasion:"", notes:"" });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Inquiry sent! We'll be in touch within 24 hours."); setForm({ name:"", email:"", phone:"", type:"private", guests:"", date:"", occasion:"", notes:"" }); };
    return (
      <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: "clamp(260px, 50vh, 480px)" }}>
          <img src={PARTY_IMG} alt="Afuvai floral party" className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.55 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 15%, rgba(250,248,243,0.2) 100%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 flex flex-col justify-end" style={{ minHeight: "clamp(260px, 50vh, 480px)" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Las Vegas · Public & Private</p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}>Hosted Floral<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Experiences</em></h1>
          </div>
        </section>

        {/* ── EXPERIENCES FIRST ── */}
        <section className="py-20 md:py-28 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center mb-14"><SectionHead label="What We Offer" heading="Choose your experience" center /></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTY_EXPERIENCES.map((exp) => (
                <div key={exp.name} className="border overflow-hidden" style={{ borderColor: BORDER, background: IVORY }}>
                  <div className="overflow-hidden" style={{ height: "200px", background: CARD }}>
                    <img src={exp.img} alt={exp.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-7">
                    <div style={{ fontFamily: serif, fontSize: "1.3rem", color: GOLD, marginBottom: "0.6rem" }}>{exp.symbol}</div>
                    <h3 style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 500, color: INK, marginBottom: "0.5rem" }}>{exp.name}</h3>
                    <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.72, marginBottom: "1.2rem" }}>{exp.desc}</p>
                    <div className="flex flex-wrap gap-3 text-xs pt-4 border-t" style={{ borderColor: BORDER }}>
                      <span className="flex items-center gap-1.5" style={{ color: SAGE }}><Users size={11} />{exp.group}</span>
                      <span className="flex items-center gap-1.5" style={{ color: SAGE }}><Clock size={11} />{exp.duration}</span>
                      <span className="ml-auto font-semibold" style={{ color: GOLD }}>{exp.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ before form */}
        <section className="py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-2xl mx-auto px-5 md:px-8">
            <div className="text-center mb-12"><SectionHead label="Questions" heading="Frequently asked" center /></div>
            <FaqBlock items={FAQS_PARTIES} />
          </div>
        </section>

        {/* ── INQUIRY FORM — after experiences ── */}
        <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <SectionHead label="Ready to Book?" heading="Tell us about your event" center />
              <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem" }}>We'll follow up within 24 hours to confirm details and availability.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {[{label:"Full Name",key:"name",type:"text",placeholder:"Jane Smith"},{label:"Email",key:"email",type:"email",placeholder:"jane@example.com"},
                  {label:"Phone",key:"phone",type:"tel",placeholder:"(702) 555-0100"},{label:"Guest Count",key:"guests",type:"text",placeholder:"e.g. 20"}].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                    <input required type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Event Type</label>
                  <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }}>
                    <option value="private">Private Event</option><option value="public">Public / Open Event</option><option value="corporate">Corporate Event</option><option value="wedding">Wedding Pre-Party</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Preferred Date</label>
                  <input type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Which Experience Interests You?</label>
                <select value={form.occasion} onChange={(e) => setForm((p) => ({ ...p, occasion: e.target.value }))} className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }}>
                  <option value="">Select an experience...</option>
                  {PARTY_EXPERIENCES.map((e) => <option key={e.name} value={e.name}>{e.name}</option>)}
                  <option value="not sure">I'm not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Additional Notes</label>
                <textarea rows={4} placeholder="Venue, color palette, special requests..." value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border resize-none" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
              </div>
              <button type="submit" className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>Send Inquiry</button>
              <p className="text-sm text-center" style={{ color: MUTED }}>We respond within 24 hours · Las Vegas Valley service area</p>
            </form>
          </div>
        </section>

        <section className="py-16" style={{ background: SAGE }}>
          <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 500, color: IVORY, marginBottom: "1rem" }}>Ready to bloom together?</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a href="tel:+17025550100" className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium border hover:bg-white/10 transition-colors" style={{ color: IVORY, borderColor: "rgba(250,248,243,0.28)" }}><Phone size={14} /> (702) 555-0100</a>
              <a href="mailto:hello@afuvai.com" className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium border hover:bg-white/10 transition-colors" style={{ color: IVORY, borderColor: "rgba(250,248,243,0.28)" }}><Mail size={14} /> hello@afuvai.com</a>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // SUBSCRIPTIONS PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const SubscriptionsPage = () => {
    const [freq, setFreq] = useState("Monthly");
    const [tier, setTier] = useState("Atelier");
    return (
      <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
        <section className="relative overflow-hidden" style={{ minHeight: "clamp(260px, 50vh, 480px)" }}>
          <img src={ROSE_IMG} alt="Subscription florals" className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.5 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 15%, rgba(250,248,243,0.2) 100%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 flex flex-col justify-end" style={{ minHeight: "clamp(260px, 50vh, 480px)" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Monthly Curation</p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}>Fresh flowers,<br /><em style={{ color: GOLD, fontStyle: "italic" }}>on your schedule.</em></h1>
          </div>
        </section>
        <section className="py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-7">
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.4rem" }}>Getting Started</p>
              <h2 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 500, color: INK }}>How subscriptions work</h2>
            </div>
            <div className="grid md:grid-cols-4">
              {[{num:"01",title:"Choose a plan",desc:"Select your tier and delivery frequency.",img:MIXED_VASE},
                {num:"02",title:"We design it",desc:"AmiDayne curates each arrangement by hand.",img:STUDIO_IMG},
                {num:"03",title:"We deliver it",desc:"Arrives fresh, hand-wrapped, with a note.",img:GARDEN_MIX},
                {num:"04",title:"You enjoy it",desc:"Pause, skip, or cancel anytime.",img:FLOWER_CLOSEUP}].map((s) => (
                <div key={s.num} className="border-b md:border-b-0 md:border-r last:border-0" style={{ borderColor: BORDER }}>
                  <div style={{ height: "110px", overflow: "hidden" }}><img src={s.img} alt={s.title} className="w-full h-full object-cover" /></div>
                  <div className="flex items-start gap-3 p-4">
                    <div style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD, opacity: 0.4, lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>{s.num}</div>
                    <div>
                      <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{s.title}</h3>
                      <p style={{ color: MUTED, lineHeight: 1.65, fontSize: "0.87rem" }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center mb-12"><SectionHead label="Pricing" heading="Select your frequency" center /></div>
            <div className="flex justify-center gap-0 mb-12">
              {SUB_FREQUENCIES.map((f) => (
                <button key={f} onClick={() => setFreq(f)} className="px-7 py-3 text-sm font-medium border transition-all" style={{ background: freq===f ? SAGE : "transparent", color: freq===f ? "#fff" : MUTED, borderColor: freq===f ? SAGE : BORDER, letterSpacing: "0.08em" }}>{f}</button>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {SUB_TIERS.map((t) => (
                <div key={t.name} onClick={() => setTier(t.name)} className="cursor-pointer border overflow-hidden transition-all duration-300" style={{ borderColor: tier===t.name ? SAGE : BORDER, outline: tier===t.name ? `2px solid ${SAGE}` : "none", outlineOffset: "-1px" }}>
                  <div style={{ height: "200px", overflow: "hidden", background: CARD }}><img src={t.img} alt={t.name} className="w-full h-full object-cover" /></div>
                  <div className="p-7" style={{ background: tier===t.name ? IVORY : "transparent" }}>
                    {t.badge && <div className="inline-block mb-3 px-3 py-1 text-xs font-semibold" style={{ background: SAGE, color: "#fff", letterSpacing: "0.08em" }}>{t.badge}</div>}
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div style={{ fontFamily: serif, fontSize: "1.3rem", color: INK, fontWeight: 500 }}>{t.name}</div>
                        <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginTop: "2px" }}>{freq}</div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontFamily: serif, fontSize: "1.9rem", color: GOLD }}>${t.price[freq as keyof typeof t.price]}</div>
                        <div style={{ fontSize: "0.68rem", color: MUTED }}>/ delivery</div>
                      </div>
                    </div>
                    <div className="space-y-2.5 mb-6">
                      {t.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5"><Check size={13} style={{ color: SAGE, marginTop: "3px", flexShrink: 0 }} /><span style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.5 }}>{item}</span></div>
                      ))}
                    </div>
                    <div className="w-full py-2.5 text-sm font-semibold text-center transition-all" style={{ letterSpacing: "0.1em", textTransform: "uppercase", background: tier===t.name ? SAGE : "transparent", color: tier===t.name ? "#fff" : SAGE, border: `1.5px solid ${SAGE}` }}>
                      {tier===t.name ? "Selected" : "Choose Plan"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button className="px-10 py-4 text-base font-semibold hover:opacity-85 transition-opacity" style={{ background: GOLD, color: "#fff", letterSpacing: "0.08em" }}>
                Subscribe — {SUB_TIERS.find((t)=>t.name===tier)?.name} · ${SUB_TIERS.find((t)=>t.name===tier)?.price[freq as keyof (typeof SUB_TIERS)[0]["price"]]} / {freq.toLowerCase()}
              </button>
              <p className="mt-3 text-sm" style={{ color: MUTED }}>No contracts. Cancel anytime with 7 days' notice.</p>
            </div>
          </div>
        </section>
        <section className="py-12 border-b" style={{ borderColor: BORDER, background: SAGE }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
            <div style={{ fontFamily: serif, fontSize: "2rem", color: GOLD_L, opacity: 0.5, marginBottom: "0.4rem" }}>◆</div>
            <h3 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 500, color: IVORY, marginBottom: "0.6rem" }}>Maison members receive 20% off all events</h3>
            <p style={{ color: "rgba(250,248,243,0.72)", lineHeight: 1.78, fontSize: "0.94rem" }}>Maison subscribers get 20% off all wedding florals, party bookings, and one-time arrangements — applied automatically at checkout.</p>
          </div>
        </section>
        <section className="py-20" style={{ background: CARD }}>
          <div className="max-w-2xl mx-auto px-5 md:px-8">
            <div className="text-center mb-12"><SectionHead label="Questions" heading="Subscription FAQ" center /></div>
            <FaqBlock items={FAQS_SUB} />
          </div>
        </section>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CLASSES PAGE (new standalone)
  // ─────────────────────────────────────────────────────────────────────────────
  const ClassesPage = () => {
    const [form, setForm] = useState({ name:"", email:"", phone:"", classType:"", date:"", groupSize:"", notes:"" });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Class inquiry sent! We'll be in touch within 24 hours."); setForm({ name:"", email:"", phone:"", classType:"", date:"", groupSize:"", notes:"" }); };
    return (
      <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: "clamp(280px, 55vh, 520px)" }}>
          <img src={WORKSHOP_IMG} alt="Afuvai floral design class" className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.58 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 18%, rgba(250,248,243,0.2) 100%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 flex flex-col justify-end" style={{ minHeight: "clamp(280px, 55vh, 520px)" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Learn · Create · Connect</p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}>
              Floral Design<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Classes</em>
            </h1>
          </div>
        </section>

        {/* Intro */}
        <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 text-center">
            <p style={{ color: MUTED, lineHeight: 1.85, fontSize: "1.05rem" }}>
              Join AmiDayne for intimate hands-on floral design classes in Las Vegas. From beginner bouquets to advanced arrangements, every class is designed around creativity, connection, and taking home something beautiful. In-studio and private group sessions available.
            </p>
          </div>
        </div>

        {/* Class cards */}
        {/* Class cards — compact 4-up grid */}
        <section className="py-10 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-6"><SectionHead label="What We Teach" heading="Available classes" /></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CLASSES.map((cls) => (
                <div key={cls.name} className="border overflow-hidden group" style={{ borderColor: BORDER, background: CARD }}>
                  <div className="overflow-hidden" style={{ height: "140px" }}>
                    <img src={cls.img} alt={cls.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, lineHeight: 1.2 }}>{cls.name}</h3>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div style={{ fontFamily: serif, fontSize: "1rem", color: GOLD }}>{cls.price > 0 ? `$${cls.price}` : "Custom"}</div>
                      </div>
                    </div>
                    <p style={{ color: MUTED, lineHeight: 1.6, fontSize: "0.82rem", marginBottom: "0.75rem" }}>{cls.desc}</p>
                    <div className="flex flex-wrap gap-3 text-xs pt-3 border-t" style={{ borderColor: BORDER }}>
                      <span className="flex items-center gap-1" style={{ color: SAGE }}><Clock size={10} /> {cls.duration}</span>
                      <span className="flex items-center gap-1" style={{ color: SAGE }}><Users size={10} /> {cls.group}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Workshops */}
        <section className="py-14 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: GOLD }} />
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase" }}>Upcoming Workshops</span>
            </div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 500, color: INK, marginBottom: "0.5rem" }}>Reserve your seat.</h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Dates and themes rotate seasonally. Seats are limited and reserved on a first-come basis.
            </p>
            <div className="space-y-0">
              {[
                { date: "Jul 18",  name: "Summer Garden Hand-Tie",        detail: "Friday · 6:00–8:00pm · AFUVAI Studio",      seats: 8,  price: 125 },
                { date: "Aug 02",  name: "Compote & Centerpiece Workshop", detail: "Saturday · 11:00am–1:00pm · AFUVAI Studio", seats: 12, price: 145 },
                { date: "Aug 21",  name: "Moody Autumn Arrangement",       detail: "Thursday · 6:00–8:00pm · AFUVAI Studio",   seats: 6,  price: 135 },
              ].map((w) => (
                <div key={w.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t" style={{ borderColor: BORDER }}>
                  <div className="flex items-start sm:items-center gap-5">
                    <div style={{ fontFamily: serif, fontSize: "0.88rem", color: GOLD, minWidth: "48px", flexShrink: 0 }}>{w.date}</div>
                    <div>
                      <div style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK }}>{w.name}</div>
                      <div style={{ fontSize: "0.82rem", color: MUTED, marginTop: "2px" }}>{w.detail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 flex-shrink-0">
                    <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: MUTED, textTransform: "uppercase" }}>{w.seats} seats left</span>
                    <span style={{ fontFamily: serif, fontSize: "1rem", color: INK }}>${w.price}</span>
                    <button className="px-5 py-2 text-xs font-semibold uppercase border hover:opacity-85 transition-opacity"
                      style={{ borderColor: INK, color: INK, letterSpacing: "0.12em" }}>
                      Reserve
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-5 border-t" style={{ borderColor: BORDER }}>
                <button style={{ fontSize: "0.88rem", color: SAGE }}>
                  Don't see a date that works? <span className="underline">Ask about the next class →</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="py-10 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center mb-7">
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.4rem" }}>The Experience</p>
              <h2 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 500, color: INK }}>What to expect</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-0">
              {[
                { num: "01", title: "All Materials Included", desc: "Stems, tools, wrapping, ribbon, and take-home materials — just bring yourself." },
                { num: "02", title: "Small Group Setting",    desc: "Intentionally small classes with personal guidance from AmiDayne." },
                { num: "03", title: "Take It All Home",       desc: "Your finished arrangement, a care card, and 10% off your next Afuvai order." },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-4 p-5 border-b md:border-b-0 md:border-r last:border-0" style={{ borderColor: BORDER }}>
                  <div style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD, opacity: 0.4, lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>{s.num}</div>
                  <div>
                    <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{s.title}</h3>
                    <p style={{ color: MUTED, lineHeight: 1.65, fontSize: "0.87rem" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking form */}
        <section className="py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <SectionHead label="Book Your Spot" heading="Reserve a class" center />
              <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem" }}>We'll confirm availability and send all class details within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {[{label:"Full Name",key:"name",type:"text",placeholder:"Jane Smith"},{label:"Email",key:"email",type:"email",placeholder:"jane@example.com"},
                  {label:"Phone",key:"phone",type:"tel",placeholder:"(702) 555-0100"},{label:"Group Size",key:"groupSize",type:"text",placeholder:"e.g. 4 people"}].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                    <input required type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }} />
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Class Interest</label>
                  <select value={form.classType} onChange={(e) => setForm((p) => ({ ...p, classType: e.target.value }))} className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }}>
                    <option value="">Select a class...</option>
                    {CLASSES.map((c) => <option key={c.name} value={c.name}>{c.name}{c.price > 0 ? ` — $${c.price}/person` : " — Custom pricing"}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Preferred Date</label>
                  <input type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Additional Notes</label>
                <textarea rows={3} placeholder="Anything you'd like us to know — allergies, occasion, skill level..." value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border resize-none" style={{ background: CARD, borderColor: BORDER, color: INK }} />
              </div>
              <button type="submit" className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>Reserve My Spot</button>
            </form>
          </div>
        </section>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // BULK ORDERS PAGE (new)
  // ─────────────────────────────────────────────────────────────────────────────
  const BulkPage = () => {
    const [form, setForm] = useState({ name:"", email:"", phone:"", occasion:"", stems:"", date:"", palette:"", notes:"" });
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Bulk inquiry submitted! We'll be in touch within 48 hours."); setForm({ name:"", email:"", phone:"", occasion:"", stems:"", date:"", palette:"", notes:"" }); };
    return (
      <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
        <section className="relative overflow-hidden" style={{ minHeight: "clamp(280px, 55vh, 520px)" }}>
          <img src={ORCHID_DARK} alt="Bulk flowers Las Vegas" className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.55 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 18%, rgba(250,248,243,0.2) 100%)` }} />
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 flex flex-col justify-end" style={{ minHeight: "clamp(280px, 55vh, 520px)" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>For Makers, Events & Trade</p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}>
              Flowers in<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Bulk</em>
            </h1>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-14"><SectionHead label="Who We Serve" heading="Built for volume" /></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { img: WEDDING_ARCH,    title: "Event Planners",      desc: "Large-scale event florals delivered ready-to-arrange. Minimums starting at 25 stems." },
                { img: RECEPTION_TABLE, title: "Restaurants & Hotels", desc: "Weekly fresh-cut stems and table arrangements for dining and hospitality venues." },
                { img: WHITE_FLORAL,    title: "DIY Brides",          desc: "Curate your own wedding florals with guidance from AmiDayne. Order by stem type or color palette." },
                { img: PETAL_MACRO,     title: "Floral Studios",      desc: "Wholesale stem supply for working florists and studio owners in the Las Vegas Valley." },
              ].map((s) => (
                <div key={s.title} className="border overflow-hidden group" style={{ borderColor: BORDER, background: IVORY }}>
                  <div className="overflow-hidden" style={{ height: "180px" }}>
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: INK, marginBottom: "0.5rem" }}>{s.title}</h3>
                    <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-10 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center mb-7">
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.4rem" }}>The Process</p>
              <h2 style={{ fontFamily: serif, fontSize: "1.4rem", fontWeight: 500, color: INK }}>Simple from start to stem</h2>
            </div>
            <div className="grid md:grid-cols-3">
              {[
                { num: "01", title: "Submit an Inquiry",    desc: "Tell us your occasion, stem count, color palette, and desired date." },
                { num: "02", title: "Receive a Quote",      desc: "Custom stem list and pricing based on availability. Turnaround: 24–48 hours." },
                { num: "03", title: "Same-Day LV Delivery", desc: "Arrives fresh, bundled by variety, and ready to arrange across Las Vegas Valley." },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-3 p-5 border-b md:border-b-0 md:border-r last:border-0" style={{ borderColor: BORDER }}>
                  <div style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD, opacity: 0.4, lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>{s.num}</div>
                  <div>
                    <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{s.title}</h3>
                    <p style={{ color: MUTED, lineHeight: 1.65, fontSize: "0.87rem" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimums & details */}
        <section className="py-14 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Minimum Order",   value: "25 stems" },
                { label: "Lead Time",       value: "48–72 hrs" },
                { label: "Service Area",    value: "Las Vegas Valley" },
                { label: "Custom Palettes", value: "Always available" },
              ].map((s) => (
                <div key={s.label} className="p-5 border text-center" style={{ borderColor: BORDER, background: IVORY }}>
                  <div style={{ fontFamily: serif, fontSize: "1.5rem", color: GOLD, marginBottom: "4px" }}>{s.value}</div>
                  <div style={{ fontSize: "0.72rem", color: MUTED, letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry form */}
        <section className="py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <SectionHead label="Get a Quote" heading="Tell us about your order" center />
              <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem" }}>We'll respond within 48 hours with a curated quote and stem list.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {[{label:"Full Name",key:"name",type:"text",placeholder:"Jane Smith"},{label:"Email",key:"email",type:"email",placeholder:"jane@example.com"},
                  {label:"Phone",key:"phone",type:"tel",placeholder:"(702) 555-0100"},{label:"Approx. Stem Count",key:"stems",type:"text",placeholder:"e.g. 100 stems"}].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                    <input required type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }} />
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Occasion / Use Case</label>
                  <select value={form.occasion} onChange={(e) => setForm((p) => ({ ...p, occasion: e.target.value }))} className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }}>
                    <option value="">Select...</option>
                    <option>Wedding / DIY Bride</option><option>Corporate Event</option><option>Restaurant / Hotel</option><option>Photo Shoot</option><option>Floral Studio</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Needed By Date</label>
                  <input type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Color Palette or Flower Preferences</label>
                <input type="text" placeholder="e.g. White and blush, lots of greenery, garden-style..." value={form.palette} onChange={(e) => setForm((p) => ({ ...p, palette: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border" style={{ background: CARD, borderColor: BORDER, color: INK }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: INK, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Additional Notes</label>
                <textarea rows={4} placeholder="Venue, specific stem requests, delivery address area, budget..." value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border resize-none" style={{ background: CARD, borderColor: BORDER, color: INK }} />
              </div>
              <button type="submit" className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>Submit Bulk Inquiry</button>
              <p className="text-sm text-center" style={{ color: MUTED }}>Delivery only · Las Vegas Valley · hello@afuvai.com</p>
            </form>
          </div>
        </section>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FLORIST PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const FloristPage = () => (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2" style={{ minHeight: "clamp(360px, 70vh, 620px)" }}>
            <div className="relative overflow-hidden order-2 md:order-1" style={{ minHeight: "260px", background: CARD }}>
              <ImageWithFallback src={amiDayneImg} alt="AmiDayne Nelsen, Founder & Head Floral Designer" className="w-full h-full object-cover" style={{ objectPosition: "center top" }} />
            </div>
            <div className="flex flex-col justify-center px-8 md:px-14 py-16 order-1 md:order-2">
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase", marginBottom: "0.75rem" }}>Meet the Artist</p>
              <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 500, color: INK, lineHeight: 1.1, marginBottom: "0.4rem" }}>AmiDayne Nelsen</h1>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", color: SAGE, textTransform: "uppercase", marginBottom: "1.6rem" }}>Founder & Head Floral Designer</p>
              <blockquote style={{ fontFamily: serif, fontSize: "1.1rem", fontStyle: "italic", color: MUTED, lineHeight: 1.78, borderLeft: `3px solid ${GOLD}`, paddingLeft: "1.2rem", marginBottom: "2rem" }}>
                "I believe every bloom has something to say. My job is simply to help it find the right words."
              </blockquote>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {["Las Vegas, NV","Est. 2018","6+ Years Experience","Sustainable Design"].map((t) => (
                  <span key={t} className="px-3 py-1.5 border text-sm" style={{ color: MUTED, borderColor: BORDER }}>{t}</span>
                ))}
              </div>
              <div className="space-y-2">
                <a href="mailto:hello@afuvai.com" className="flex items-center gap-2 text-sm" style={{ color: MUTED }}><Mail size={14} /> hello@afuvai.com</a>
                <p className="flex items-center gap-2 text-sm" style={{ color: MUTED }}><Clock size={14} /> Open daily, 9 am – 5 pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <SectionHead label="The Story" heading="How Afuvai began" />
          <div className="mt-8 space-y-5" style={{ color: MUTED, lineHeight: 1.9, fontSize: "1.02rem" }}>
            <p>AmiDayne Nelsen founded Afuvai Floral Society in Las Vegas in 2018 after years spent studying floral design, sustainable sourcing, and the intersection of art and nature. What began as a small weekend arrangement practice quickly grew into one of the valley's most sought-after boutique floral studios.</p>
            <p>Raised with a deep appreciation for natural beauty, AmiDayne's aesthetic is rooted in organic texture, tonal restraint, and the quiet drama of a perfectly chosen stem. Her work draws from botanical art, Scandinavian minimalism, and the lush gardens of the Pacific Northwest — reimagined for Las Vegas.</p>
            <p>Every arrangement Afuvai creates passes through AmiDayne's hands. She designs each piece individually, sources directly from sustainable farms, and personally trains every team member on her design principles. Never mass-produced, never templated.</p>
            <p>Today, Afuvai Floral Society serves couples on their wedding day, residents who want their homes to feel alive, students who want to learn the craft, and anyone who believes that the right arrangement can change the feeling of a room.</p>
          </div>
        </div>
      </section>
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">
          <div className="grid md:grid-cols-2 border" style={{ borderColor: BORDER }}>
            <div className="overflow-hidden" style={{ minHeight: "400px", background: CARD }}>
              <img src={PETAL_MACRO} alt="Floral detail" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center px-8 md:px-12 py-14 border-t md:border-t-0 md:border-l" style={{ borderColor: BORDER, background: CARD }}>
              <SectionHead label="Design Philosophy" heading="The principles behind every arrangement" />
              <div className="mt-8 space-y-6">
                {[{symbol:"✦",title:"Intention Over Abundance",body:"Every stem is chosen deliberately — not to fill space, but to say something."},
                  {symbol:"◇",title:"Seasonality First",body:"Afuvai works with what nature is offering right now, resulting in arrangements that feel alive and of the moment."},
                  {symbol:"◆",title:"Sustainability as Standard",body:"All flowers are sourced from certified sustainable farms. Packaging is compostable."}].map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <div style={{ fontFamily: serif, fontSize: "1.2rem", color: GOLD, flexShrink: 0, marginTop: "2px" }}>{v.symbol}</div>
                    <div>
                      <div style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{v.title}</div>
                      <div style={{ color: MUTED, lineHeight: 1.72, fontSize: "0.92rem" }}>{v.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <SectionHead label="Background" heading="Credentials & experience" />
            <div className="mt-8 space-y-4">
              {[{year:"2018",detail:"Founded Afuvai Floral Society, Las Vegas NV"},
                {year:"2019",detail:"Certified Sustainable Floral Design, AIFD"},
                {year:"2020",detail:"Named one of Nevada's top 10 wedding florists"},
                {year:"2021",detail:"Expanded into hosted floral experiences and workshops"},
                {year:"2022",detail:"Launched floral design class program"},
                {year:"2023",detail:"Launched monthly subscription — now 1,200+ active subscribers"},
                {year:"2024",detail:"Partner florist for four Strip hotel properties"}].map((c) => (
                <div key={c.year} className="flex gap-5">
                  <div style={{ fontFamily: serif, fontSize: "0.85rem", color: GOLD, minWidth: "36px", fontWeight: 500 }}>{c.year}</div>
                  <div style={{ fontSize: "0.94rem", color: MUTED, lineHeight: 1.65 }}>{c.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHead label="Connect" heading="Work with AmiDayne" />
            <div className="mt-8 space-y-4">
              {[{icon:Mail,label:"Email",value:"hello@afuvai.com",href:"mailto:hello@afuvai.com"},
                {icon:Clock,label:"Hours",value:"Open daily, 9 am – 5 pm",href:null},
                {icon:MapPin,label:"Service Area",value:"Las Vegas Valley — delivery only",href:null},
                {icon:Instagram,label:"Instagram",value:"@afuvaifloral",href:"https://instagram.com/afuvaifloral"}].map(({ icon:Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3 p-4 border" style={{ borderColor: BORDER, background: CARD }}>
                  <Icon size={16} style={{ color: SAGE, marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.67rem", letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
                    {href ? <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: "0.97rem", color: INK }}>{value}</a> : <div style={{ fontSize: "0.97rem", color: INK }}>{value}</div>}
                  </div>
                </div>
              ))}
              <button onClick={() => navigate("parties")} className="inline-flex items-center gap-2 px-7 py-4 mt-2 text-base font-semibold hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff", letterSpacing: "0.06em" }}>
                Book an Experience <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // COLLABORATIONS PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const CollabsPage = () => {
    const [notifyEmail, setNotifyEmail] = useState("");
    const [pitchForm, setPitchForm] = useState({ name: "", business: "", email: "", phone: "", type: "", space: "", notes: "" });
    const handleNotify = (e: React.FormEvent) => {
      e.preventDefault();
      toast.success("You're on the list! We'll notify you when public events go live.");
      setNotifyEmail("");
    };
    const handlePitch = (e: React.FormEvent) => {
      e.preventDefault();
      toast.success("Pitch received! We'll be in touch within 48 hours with a proposal.");
      setPitchForm({ name: "", business: "", email: "", phone: "", type: "", space: "", notes: "" });
    };

    const formats = [
      {
        title: "Wine & Flowers", sub: "Sip & arrange.",
        desc: "The evergreen favorite. Guests build a bouquet over a flight or a glass at your tasting room. Best paired with intimate, urban tasting rooms, wine bars, and bars.",
        ideal: "WINERIES · TASTING ROOMS",
      },
      {
        title: "Coffee & Blooms", sub: "Morning bouquets.",
        desc: "A bright daytime build over specialty coffee. Low-cost, high frequency, and endlessly photogenic. Perfect with first-time collaborator roasters.",
        ideal: "ROASTERS · CAFÉS",
      },
      {
        title: "Scent & Stem", sub: "A sensory pairing.",
        desc: "Florals meet fragrance — guests design an arrangement and a personalized candle or scent to fill it with. Best for candle studios and perfumeries.",
        ideal: "CANDLE · FRAGRANCE STUDIOS",
      },
      {
        title: "Self-Care Sunday", sub: "Bloom & glow.",
        desc: "A wellness-focused experience — facials, mini treatments, and florals in one afternoon. Built for high-aesthetic, appointment-based studios and salons.",
        ideal: "MED SPAS · WELLNESS STUDIOS",
      },
      {
        title: "Petals & Pairings", sub: "Design & dine.",
        desc: "An elevated evening of arranging alongside chocolate, dessert, tea, or a chef's idea. A premium ticket with patisseries, chocolatiers, and tea houses.",
        ideal: "PATISSERIES · TEA HOUSES",
      },
      {
        title: "Vow & Vase", sub: "Bridal collab.",
        desc: "A weekend pop-up or bridal workshop with a bridal boutique or jeweler — brides build a bouquet while they browse. The strongest lead-gen pairing of them all.",
        ideal: "BRIDAL · JEWELRY BOUTIQUES",
      },
    ];

    const partnerTypes = [
      "Boutique wineries & tasting rooms", "Specialty coffee roasters", "Candle & fragrance studios", "Bridal boutiques",
      "Med spas & aesthetic clinics", "Pilates, yoga & boutique fitness", "Champagne bars & lounges", "Interior & design showrooms",
      "Jewelry boutiques", "Boutique hotels & resort spas", "Patisseries & chocolatiers", "Tea houses",
      "Country & golf clubs", "Luxury real estate brokerages", "Lifestyle concept shops", "Photography studios",
    ];

    const events = [
      { title: "Wine & Flowers", partner: "Partner Tasting Room", detail: "Date to be announced · Partner venue · Las Vegas" },
      { title: "Coffee & Blooms", partner: "Partner Roaster", detail: "Date to be announced · Partner venue · Las Vegas" },
      { title: "Scent & Stem", partner: "Partner Studio", detail: "Date to be announced · Partner venue · Las Vegas" },
    ];

    return (
      <div className="pt-[88px] min-h-screen overflow-x-hidden" style={{ background: IVORY }}>

        {/* ── HERO ── sage background */}
        <section style={{ background: SAGE }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-px" style={{ background: GOLD_L }} />
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD_L, textTransform: "uppercase" }}>Partner With Us</span>
            </div>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 500, lineHeight: 1.06, color: IVORY, marginBottom: "1.5rem", maxWidth: "700px" }}>
              Better together, in bloom.
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.82, color: "rgba(250,248,243,0.75)", maxWidth: "540px", marginBottom: "2.5rem" }}>
              AFUVAI co-hosts public floral experiences with the best independent brands in Las Vegas — wineries, roasters, boutiques, and spas. Shared audiences, beautiful content, and a sold-out room. If your space and our flowers belong in the same photo, let's collaborate.
            </p>
            <button onClick={() => document.getElementById("pitch-form")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 text-sm font-semibold uppercase border-2 hover:bg-white/10 transition-colors"
              style={{ color: IVORY, borderColor: IVORY, letterSpacing: "0.14em" }}>
              Become a Partner
            </button>
          </div>
        </section>

        {/* ── THE MODEL ── */}
        <section className="border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative overflow-hidden order-2 md:order-1" style={{ minHeight: "400px", background: CARD }}>
                <img src={imgWildMeadow} alt="Afuvai collaboration event" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, rgba(250,248,243,0.06))" }} />
              </div>
              {/* Copy */}
              <div className="flex flex-col justify-center px-8 md:px-12 py-14 order-1 md:order-2 border-b md:border-b-0 md:border-l" style={{ borderColor: BORDER }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-px" style={{ background: GOLD }} />
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase" }}>The Model</span>
                </div>
                <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 500, color: INK, lineHeight: 1.15, marginBottom: "1.2rem" }}>
                  One event.<br />Two audiences.
                </h2>
                <p style={{ color: MUTED, lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "1.8rem" }}>
                  A co-hosted floral event puts your brand and ours in front of each other's followers, fills your space on a slow night, and generates a week of content for both of us. We handle the floral experience end to end — blooms, tools, guidance, and styling. You bring the venue, your product, and your audience. We split promotion and grow two lists at once.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Shared cross-promotion to both audiences",
                    "Foot traffic & bar/retail sales for your space",
                    "Professionally styled, share-ready content",
                    "New email & social followers for both brands",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: GOLD }} />
                      <span style={{ fontSize: "0.94rem", color: MUTED }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SIGNATURE FORMATS ── */}
        <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px" style={{ background: GOLD }} />
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase" }}>Signature Collaborations</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: INK, marginBottom: "0.75rem" }}>
                Formats that sell out.
              </h2>
              <p style={{ color: MUTED, fontSize: "0.97rem", lineHeight: 1.75, maxWidth: "500px" }}>
                Proven event concepts, each built to pair with a specific kind of partner. We tailor the theme, palette, and price to your space and crowd.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formats.map((f) => (
                <div key={f.title} className="p-6 border" style={{ borderColor: BORDER, background: IVORY }}>
                  <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: INK, marginBottom: "0.25rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: GOLD, marginBottom: "0.75rem" }}>{f.sub}</p>
                  <p style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.72, marginBottom: "1.25rem" }}>{f.desc}</p>
                  <div className="pt-4 border-t" style={{ borderColor: BORDER }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: MUTED, textTransform: "uppercase" }}>Ideal: {f.ideal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE PARTNER WITH ── */}
        <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px" style={{ background: GOLD }} />
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase" }}>Who We Partner With</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: INK, marginBottom: "0.75rem" }}>
                The right rooms, the right crowd.
              </h2>
              <p style={{ color: MUTED, fontSize: "0.97rem", lineHeight: 1.75, maxWidth: "520px" }}>
                We seek out independent Las Vegas brands whose audience overlaps ours — affluent, design-led, and celebration-minded.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {partnerTypes.map((type) => (
                <div key={type} className="flex items-center justify-center px-4 py-5 border text-center"
                  style={{ borderColor: BORDER, background: IVORY, fontSize: "0.88rem", color: INK, lineHeight: 1.45 }}>
                  {type}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW A COLLAB COMES TOGETHER ── sage */}
        <section className="py-16 md:py-20 border-b" style={{ background: SAGE }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: GOLD_L }} />
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD_L, textTransform: "uppercase" }}>How a Collab Comes Together</span>
            </div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: IVORY, marginBottom: "3rem" }}>
              Simple to say yes to.
            </h2>
            <div className="grid md:grid-cols-3 gap-0">
              {[
                { num: "01", title: "Pitch & pair", desc: "Reach out and we'll propose a format, date, ticket price, and split that fits your space and audience." },
                { num: "02", title: "Promote together", desc: "We co-create the assets and each promote to our own lists and socials. Tickets sell through one shared link." },
                { num: "03", title: "Host & grow", desc: "We run the floral experience; you host the room. Both brands gain content, sales, and new followers." },
              ].map((s, i) => (
                <div key={s.num} className="py-8 pr-10 border-b md:border-b-0 md:border-r last:border-0 pl-0 md:pl-8 first:pl-0"
                  style={{ borderColor: "rgba(250,248,243,0.15)" }}>
                  <div style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD_L, marginBottom: "0.5rem" }}>{s.num}</div>
                  <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: IVORY, marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ color: "rgba(250,248,243,0.68)", lineHeight: 1.75, fontSize: "0.9rem" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── UPCOMING PUBLIC EVENTS ── */}
        <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px" style={{ background: GOLD }} />
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase" }}>Upcoming Public Events</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: INK, marginBottom: "0.6rem" }}>
                Join us out in the city.
              </h2>
              <p style={{ color: MUTED, fontSize: "0.97rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                Public co-hosted events open to all. Seats are limited and reserved first-come.
              </p>
            </div>

            <div className="space-y-0">
              {events.map((ev) => (
                <div key={ev.title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t" style={{ borderColor: BORDER }}>
                  <div className="flex items-start sm:items-center gap-5">
                    <div style={{ fontFamily: serif, fontSize: "0.82rem", color: GOLD, letterSpacing: "0.08em", flexShrink: 0, minWidth: "32px" }}>TBA</div>
                    <div>
                      <div style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK }}>
                        {ev.title} <span style={{ color: MUTED, fontWeight: 400 }}>· {ev.partner}</span>
                      </div>
                      <div style={{ fontSize: "0.82rem", color: MUTED, marginTop: "2px" }}>{ev.detail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 flex-shrink-0">
                    <span style={{ fontSize: "0.78rem", letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>Coming Soon</span>
                    <span style={{ fontSize: "0.88rem", color: MUTED }}>$—</span>
                    <form onSubmit={handleNotify} className="flex gap-0">
                      <input type="email" placeholder="your@email.com" value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} required
                        className="px-3 py-2 text-xs outline-none border border-r-0" style={{ background: CARD, borderColor: BORDER, color: INK, width: "160px" }} />
                      <button type="submit" className="px-4 py-2 text-xs font-semibold border uppercase tracking-widest hover:opacity-85 transition-opacity"
                        style={{ borderColor: INK, color: INK, background: "transparent", letterSpacing: "0.12em" }}>
                        Notify Me
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t" style={{ borderColor: BORDER }}>
                <button onClick={() => document.getElementById("pitch-form")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ fontSize: "0.88rem", color: SAGE }}>
                  Want first access to public events? <span className="underline">Join the studio list →</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BECOME A HOST VENUE ── */}
        <section className="border-b" style={{ borderColor: BORDER }}>
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Copy */}
              <div className="flex flex-col justify-center py-14 pr-0 md:pr-12 border-b md:border-b-0 md:border-r" style={{ borderColor: BORDER }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-px" style={{ background: GOLD }} />
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase" }}>Become a Host Venue</span>
                </div>
                <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 500, color: INK, lineHeight: 1.15, marginBottom: "1.2rem" }}>
                  Have a space worth filling?
                </h2>
                <p style={{ color: MUTED, lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "1rem" }}>
                  If you run a winery, café, boutique, spa, or lounge in the Las Vegas valley, we'd love to bring an AFUVAI event to your room. No cost to start the conversation — just tell us about your space and your audience, and we'll send a proposal built around it.
                </p>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: "2rem" }}>
                  Revenue-share & flat-fee options · We bring everything floral
                </p>
                <button onClick={() => document.getElementById("pitch-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold self-start border-2 hover:opacity-85 transition-opacity"
                  style={{ borderColor: SAGE, color: SAGE, background: "transparent", letterSpacing: "0.08em" }}>
                  Pitch a Collaboration
                </button>
              </div>
              {/* Image */}
              <div className="relative overflow-hidden" style={{ minHeight: "380px", background: CARD }}>
                <img src={imgHexArch} alt="Venue for collaboration" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ── PITCH FORM ── */}
        <section id="pitch-form" className="py-16 md:py-20" style={{ background: CARD }}>
          <div className="max-w-2xl mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-px" style={{ background: GOLD }} />
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase" }}>Start a Conversation</span>
                <div className="w-6 h-px" style={{ background: GOLD }} />
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 500, color: INK, marginBottom: "0.6rem" }}>
                Pitch a collaboration.
              </h2>
              <p style={{ color: MUTED, fontSize: "0.96rem" }}>
                Tell us about your space and we'll send a proposal within 48 hours. No commitment required.
              </p>
            </div>
            <form onSubmit={handlePitch} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Your Name", key: "name", type: "text", placeholder: "Jane Smith" },
                  { label: "Business Name", key: "business", type: "text", placeholder: "The Bloom Room" },
                  { label: "Email", key: "email", type: "email", placeholder: "jane@yourbrand.com" },
                  { label: "Phone", key: "phone", type: "tel", placeholder: "(702) 555-0100" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>{label}</label>
                    <input required type={type} placeholder={placeholder} value={pitchForm[key as keyof typeof pitchForm]}
                      onChange={(e) => setPitchForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                  Type of Space
                </label>
                <select value={pitchForm.type} onChange={(e) => setPitchForm((p) => ({ ...p, type: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border" style={{ background: IVORY, borderColor: BORDER, color: INK }}>
                  <option value="">Select your space type...</option>
                  <option>Winery / Tasting Room</option>
                  <option>Coffee Roaster / Café</option>
                  <option>Candle / Fragrance Studio</option>
                  <option>Med Spa / Wellness Studio</option>
                  <option>Patisserie / Tea House</option>
                  <option>Bridal / Jewelry Boutique</option>
                  <option>Boutique Hotel / Resort</option>
                  <option>Fitness Studio</option>
                  <option>Restaurant / Bar / Lounge</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                  Tell Us About Your Space & Audience
                </label>
                <textarea rows={4} placeholder="Capacity, vibe, typical guest, why you think we'd be a good fit..."
                  value={pitchForm.space} onChange={(e) => setPitchForm((p) => ({ ...p, space: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border resize-none" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                  Anything Else?
                </label>
                <textarea rows={3} placeholder="Preferred dates, format ideas, questions..."
                  value={pitchForm.notes} onChange={(e) => setPitchForm((p) => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border resize-none" style={{ background: IVORY, borderColor: BORDER, color: INK }} />
              </div>
              <button type="submit" className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}>
                Send My Pitch
              </button>
              <p className="text-sm text-center" style={{ color: MUTED }}>
                We respond within 48 hours · hello@afuvai.com
              </p>
            </form>
          </div>
        </section>

      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CARE GUIDE PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  const CarePage = () => (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Compact header strip */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase", marginBottom: "0.5rem" }}>From Our Studio</p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 500, color: INK }}>Flower Care Guide</h1>
          <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.95rem", marginTop: "0.75rem" }}>
            Your Afuvai arrangement was crafted the morning of delivery. With proper care, most arrangements last 7–14 days.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
        <div className="space-y-0">
          {[{icon:Scissors,num:"01",title:"Trim the stems",body:"Re-cut each stem at a 45-degree angle — about one inch from the bottom. Repeat every 2–3 days."},
            {icon:Droplets,num:"02",title:"Change the water daily",body:"Fresh, clean water is the single most important thing. Change daily, rinse the vase, and re-trim stems. Use room-temperature water."},
            {icon:Sun,num:"03",title:"Find the right light",body:"Bright, indirect light is ideal. Avoid direct sunlight and heating vents — both dehydrate blooms quickly."},
            {icon:Wind,num:"04",title:"Keep away from heat",body:"Heat and fruit bowls both speed wilting — fruit releases ethylene gas. Keep your arrangement in a cool, stable spot."},
            {icon:Heart,num:"05",title:"Remove wilted blooms",body:"Remove fading stems promptly. Decaying flowers release bacteria that shorten the life of healthy blooms."},
            {icon:Leaf,num:"06",title:"Use the flower food",body:"Dissolve the included flower food packet in your vase water. It genuinely extends vase life."}].map((tip) => (
            <div key={tip.num} className="flex items-start gap-4 py-5 border-b" style={{ borderColor: BORDER }}>
              <div className="flex flex-col items-center gap-1 flex-shrink-0 w-10">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}><tip.icon size={15} style={{ color: SAGE }} /></div>
                <div style={{ fontFamily: serif, fontSize: "0.68rem", color: GOLD, opacity: 0.5 }}>{tip.num}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{tip.title}</h3>
                <p style={{ color: MUTED, lineHeight: 1.7, fontSize: "0.88rem" }}>{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-5 border" style={{ borderColor: BORDER_G, background: CARD }}>
          <div style={{ fontSize: "0.82rem", color: GOLD, marginBottom: "0.5rem" }}>✦ A note from AmiDayne</div>
          <p style={{ fontFamily: serif, fontStyle: "italic", color: MUTED, lineHeight: 1.75, fontSize: "0.92rem" }}>
            "Every arrangement I design is meant to live with you — to change the feeling of a room, mark a moment, or simply remind you that beauty is worth paying attention to."
          </p>
          <div className="mt-3" style={{ fontSize: "0.75rem", color: MUTED }}>— AmiDayne Nelsen, Founder</div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t" style={{ borderColor: BORDER }}>
          <p style={{ color: MUTED, fontSize: "0.88rem" }}>Questions about your arrangement?</p>
          <a href="mailto:hello@afuvai.com" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-85 transition-opacity" style={{ background: SAGE, color: "#fff" }}><Mail size={13} /> hello@afuvai.com</a>
        </div>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: IVORY, color: INK, fontFamily: sans }}>
      <Toaster position="top-right" toastOptions={{ style: { background: IVORY, color: INK, border: `1px solid ${BORDER}`, fontFamily: sans, fontSize: "0.9rem" } }} />
      <Nav />
      {menuOpen && <MobileMenu />}
      {cartOpen && <CartDrawer />}
      <FloatingCTA />
      <main>
        {page === "home"          && <HomePage />}
        {page === "portfolio"     && <PortfolioPage />}
        {page === "weddings"      && <WeddingsPage />}
        {page === "parties"       && <PartiesPage />}
        {page === "product"       && activeProd && <ProductPage product={activeProd} />}
        {page === "subscriptions" && <SubscriptionsPage />}
        {page === "florist"       && <FloristPage />}
        {page === "care"          && <CarePage />}
        {page === "classes"       && <ClassesPage />}
        {page === "bulk"          && <BulkPage />}
        {page === "collabs"       && <CollabsPage />}
      </main>
      <Footer />
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .marquee-track { animation: marquee 34s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        /* ── Mobile ── */
        @media (max-width: 640px) {
          html { font-size: 16px; }
          body, #root { overflow-x: hidden; }
          /* inputs: prevent iOS zoom */
          input, select, textarea { font-size: 16px !important; }
          /* tighter section padding on mobile */
          .py-20 { padding-top: 3rem !important; padding-bottom: 3rem !important; }
          .py-28 { padding-top: 3.5rem !important; padding-bottom: 3.5rem !important; }
          .md\\:py-28 { padding-top: 3.5rem !important; padding-bottom: 3.5rem !important; }
          /* ensure grid items don't overflow */
          .grid { min-width: 0; }
          .grid > * { min-width: 0; }
        }
        /* hide overflowing content on all viewports */
        .overflow-x-clip { overflow-x: clip; }
      `}</style>
    </div>
  );
}
