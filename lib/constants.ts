import type { Product, SubTier, PortfolioItem, PartyExperience, FaqItem, Testimonial, Class } from "./types";

// ── Palette ────────────────────────────────────────────────────────────────────
export const SAGE    = "#5A6B54";
export const SAGE_D  = "#3f4e3a";
export const GOLD    = "#B8995A";
export const GOLD_L  = "#d4b578";
export const IVORY   = "#FAF8F3";
export const CARD    = "#EEEADC";
export const INK     = "#1A1A14";
export const MUTED   = "#6B6B58";
export const BORDER  = "rgba(90,107,84,0.18)";
export const BORDER_G= "rgba(184,153,90,0.22)";

export const serif = "'Playfair Display', serif";
export const sans  = "'DM Sans', sans-serif";

// ── Unsplash images ────────────────────────────────────────────────────────────
export const HERO_IMG        = "https://images.unsplash.com/photo-1572454591674-2739f30d8c40?w=1800&h=1100&fit=crop&auto=format";
export const STUDIO_IMG      = "https://images.unsplash.com/photo-1594843225243-0a7ed5242c5a?w=900&h=1200&fit=crop&auto=format";
export const ROSE_IMG        = "https://images.unsplash.com/photo-1592125661285-79820f2fdf7a?w=800&h=1000&fit=crop&auto=format";
export const WHITE_FLORAL    = "https://images.unsplash.com/photo-1529330821961-0414396878d8?w=800&h=1000&fit=crop&auto=format";
export const PINK_BOUQUET    = "https://images.unsplash.com/photo-1610599929746-e79dbd785f18?w=800&h=1000&fit=crop&auto=format";
export const PURPLE_BOUQUET  = "https://images.unsplash.com/photo-1606101083393-bded314215cd?w=800&h=1000&fit=crop&auto=format";
export const MIXED_VASE      = "https://images.unsplash.com/photo-1558879860-45f24b366ea1?w=800&h=1000&fit=crop&auto=format";
export const GARDEN_MIX      = "https://images.unsplash.com/photo-1601753016831-a7d97aaf16ab?w=800&h=1000&fit=crop&auto=format";
export const PETAL_MACRO     = "https://images.unsplash.com/photo-1532614208657-10b8d7815f40?w=800&h=1000&fit=crop&auto=format";
export const ORCHID_DARK     = "https://images.unsplash.com/photo-1771099077435-6dbcac9fd65e?w=800&h=1000&fit=crop&auto=format";
export const FLOWER_CLOSEUP  = "https://images.unsplash.com/photo-1777382730647-86ca1a05cecb?w=800&h=1000&fit=crop&auto=format";
export const WEDDING_ARCH    = "https://images.unsplash.com/photo-1769812343890-4e406a33cfbe?w=1200&h=800&fit=crop&auto=format";
export const WEDDING_BRIDE   = "https://images.unsplash.com/photo-1766149481900-328c59e7f17a?w=800&h=1000&fit=crop&auto=format";
export const WEDDING_DECOR   = "https://images.unsplash.com/photo-1769812344096-8993973bd233?w=800&h=1000&fit=crop&auto=format";
export const RECEPTION_TABLE = "https://images.unsplash.com/photo-1767986012138-4893f40932d5?w=800&h=1000&fit=crop&auto=format";
export const PARTY_IMG       = "https://images.unsplash.com/photo-1562483565-984444c3cf8e?w=1200&h=700&fit=crop&auto=format";
export const WORKSHOP_IMG    = "https://images.unsplash.com/photo-1615554108316-955645d13bdd?w=600&h=700&fit=crop&auto=format";

// ── Product image paths (served from /public/images/products/) ─────────────────
export const IMG_PURSE           = "/images/products/192548D1-5CD9-4724-999F-905849B3F3A9.PNG";
export const IMG_GOLDEN_HOUR     = "/images/products/91D3CEBC-BF25-47FE-B689-A1444C492868.PNG";
export const IMG_VIVID_FIESTA    = "/images/products/2B62E5F4-65C3-4EE1-96D3-136806D5A756.PNG";
export const IMG_STATEMENT       = "/images/products/44C6B361-EE02-4548-B9D5-063055F91E2C.PNG";
export const IMG_JEWEL_GARDEN    = "/images/products/3FDEF952-54C1-46BF-AE5F-B9312A1C09A1.PNG";
export const IMG_WILD_MEADOW     = "/images/products/2C71E011-59DA-4DA8-A68A-337A9BEFCA48.png";
export const IMG_VIOLET_REVERIE  = "/images/products/8749B384-30FA-4216-ABB8-B0B4449F38A3.PNG";
export const IMG_HARVEST_BASKET  = "/images/products/5242898A-0D71-4784-83B0-26E876662B8F.PNG";
export const IMG_AMI_DAYNE       = "/images/products/381B6162-70AE-44A1-B86C-1996E58817A4.PNG";
export const IMG_KALEIDOSCOPE    = "/images/products/A57FB4D6-3F64-4785-9EA7-1B2E352EAF8A.PNG";
export const IMG_GARDEN_SUNRISE  = "/images/products/A2D24D91-E689-4272-AB74-5FD492C48DA7.PNG";
export const IMG_BLUSHING_GARDEN = "/images/products/A6833862-1DA9-497B-AF6B-48CCAB8F90A0.PNG";
export const IMG_METAL_ARCH      = "/images/products/BF3BFEB0-F648-4841-A02F-586616084367.PNG";
export const IMG_GARDEN_REVERIE  = "/images/products/CACF91E0-0695-4449-A65D-91919C42A0E8.PNG";
export const IMG_CRIMSON_AFFAIR  = "/images/products/CBE4EF77-18CB-4AF9-ABE8-47095B5E9CBD.PNG";
export const IMG_BLOOM_BOX       = "/images/products/CCD04473-3E00-47D6-BA41-569A4E1688CB.PNG";
export const IMG_IVORY_REVERIE   = "/images/products/D9FDA797-0736-4490-BC86-46D5FBADB119.PNG";
export const IMG_GARDEN_BLISS    = "/images/products/D83893F6-822A-449C-9790-EE1848EE12CA.PNG";
export const IMG_PURSE_BLACK     = "/images/products/E6E727B0-E375-4F30-8FAC-CABAD935E553.PNG";
export const IMG_LAVENDER_DREAMS = "/images/products/E23EBA24-8A31-4CB2-A9B4-DFED5A013FED.PNG";
export const IMG_PRIMARY_BURST   = "/images/products/E247C2A8-30BC-423E-BA43-B3B99705B761.PNG";
export const IMG_TROPICAL_BOX    = "/images/products/EAFC7A60-68A7-43B3-8680-C90754BC9147.PNG";
export const IMG_HEX_ARCH        = "/images/products/F5A3BCCF-8599-476F-860B-F44AD6C1175D.PNG";
export const IMG_PARADISE_BOX    = "/images/products/FF2C056A-1636-48C5-AAB6-7ED07B66D1BC.PNG";
export const IMG_PURSE_LIFESTYLE = "/images/products/IMG_4773.PNG";

// Unsplash fallbacks for products without real photos
export const IMG_SUMMER_RADIANCE = "https://images.unsplash.com/photo-1610599929746-e79dbd785f18?w=800&h=1000&fit=crop&auto=format";
export const IMG_HEART_WREATH    = "https://images.unsplash.com/photo-1777382730647-86ca1a05cecb?w=800&h=1000&fit=crop&auto=format";
export const IMG_BLUSH_REVERIE   = "https://images.unsplash.com/photo-1592125661285-79820f2fdf7a?w=800&h=1000&fit=crop&auto=format";
export const IMG_FESTIVAL_BLOOM  = "https://images.unsplash.com/photo-1610599929746-e79dbd785f18?w=800&h=1000&fit=crop&auto=format";
export const IMG_PURE_SERENITY   = "https://images.unsplash.com/photo-1529330821961-0414396878d8?w=800&h=1000&fit=crop&auto=format";
export const IMG_GOLDEN_HARVEST  = "https://images.unsplash.com/photo-1558879860-45f24b366ea1?w=800&h=1000&fit=crop&auto=format";

// ── Products ───────────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: 1, name: "The Afuvai Purse — Gold Chain", price: 285, category: "Signature", img: IMG_PURSE, tag: "Bestseller", whiteBg: true, pairedProductId: 23,
    desc: "Our most iconic creation — pink and coral garden roses, peonies, ranunculus, and lush greenery hand-arranged inside a luxury acrylic purse with a lustrous gold chain handle. A wearable work of art. No two are ever identical.",
    sizes: [{ label: "Mini", price: 225 }, { label: "Classic", price: 285 }, { label: "Grand", price: 385 }],
  },
  {
    id: 2, name: "Golden Hour", price: 195, category: "Anniversary", img: IMG_GOLDEN_HOUR, tag: "Signature",
    desc: "Red roses and white oriental lilies crown a gold mercury-glass cylinder vase alongside white hydrangea, pink waxflower, and soft eucalyptus. Warm, luminous, and impossibly romantic — designed for moments that deserve to be remembered.",
    sizes: [{ label: "Small", price: 145 }, { label: "Standard", price: 195 }, { label: "Deluxe", price: 275 }],
  },
  {
    id: 3, name: "Summer Radiance", price: 165, category: "Birthday", img: IMG_SUMMER_RADIANCE, tag: "",
    desc: "A jubilant pedestal arrangement overflowing with sunflowers, pink roses, cream roses, and pink snapdragons, nestled in lush eucalyptus. Full, bold, and impossible to miss.",
    sizes: [{ label: "Small", price: 115 }, { label: "Standard", price: 165 }, { label: "Deluxe", price: 235 }],
  },
  {
    id: 4, name: "Vivid Fiesta", price: 145, category: "Everyday", img: IMG_VIVID_FIESTA, tag: "New", whiteBg: true,
    desc: "Red roses, golden snapdragons, orange Asiatic lilies, and sapphire blue delphinium erupt from a clear glass vase with lush cascading greenery. A bold, joyful palette that transforms any space.",
    sizes: [{ label: "Small", price: 98 }, { label: "Standard", price: 145 }, { label: "Deluxe", price: 210 }],
  },
  {
    id: 5, name: "Garden Sunrise", price: 128, category: "Everyday", img: IMG_GARDEN_SUNRISE, tag: "",
    desc: "White roses, sunflowers, blue delphinium, and baby's breath glow inside a clear glass vase. A bright, generous arrangement that brings fresh energy to any room or occasion.",
    sizes: [{ label: "Small", price: 88 }, { label: "Standard", price: 128 }, { label: "Deluxe", price: 185 }],
  },
  {
    id: 6, name: "The Statement", price: 195, category: "Corporate", img: IMG_STATEMENT, tag: "Exclusive", whiteBg: true,
    desc: "Red roses, creamy white hydrangea, and pink carnations rise dramatically from a tall white vase with tropical foliage, sculptural branches, and cascading burgundy amaranthus. Designed for lobbies, boardrooms, and grand entrances that demand presence.",
    sizes: [{ label: "Standard", price: 195 }, { label: "Premium", price: 265 }, { label: "Prestige", price: 365 }],
  },
  {
    id: 7, name: "Jewel Garden", price: 185, category: "Anniversary", img: IMG_JEWEL_GARDEN, tag: "", whiteBg: true,
    desc: "Burgundy dahlias, king protea, magenta gerbera, and blue delphinium form a richly textured hand-tied bouquet bursting with jewel-toned drama. Bold, dimensional, and entirely unforgettable for milestone celebrations.",
    sizes: [{ label: "Small", price: 135 }, { label: "Standard", price: 185 }, { label: "Deluxe", price: 260 }],
  },
  {
    id: 8, name: "Wild Meadow", price: 245, category: "Wedding", img: IMG_WILD_MEADOW, tag: "", whiteBg: true,
    desc: "Blue delphinium, peach and white garden roses, purple statice, lavender, and untamed wild greenery — a free-spirited bridal bouquet that looks as though it was gathered at sunrise in an English garden. Beautifully undone, entirely intentional.",
    sizes: [{ label: "Petite", price: 175 }, { label: "Standard", price: 245 }, { label: "Lush", price: 340 }],
  },
  {
    id: 9, name: "Heart of Remembrance", price: 325, category: "Sympathy", img: IMG_HEART_WREATH, tag: "",
    desc: "A standing heart-shaped wreath woven with red, pink, yellow, and white roses, peonies, and baby's breath — a graceful, enduring tribute that honors the love left behind.",
    sizes: [{ label: "Standard", price: 325 }, { label: "Large", price: 425 }, { label: "Grand", price: 545 }],
  },
  {
    id: 10, name: "Blushing Garden", price: 175, category: "Anniversary", img: IMG_BLUSHING_GARDEN, tag: "New", whiteBg: true,
    desc: "Pink garden roses, blush spray roses, white hydrangea, and deep burgundy astilbe cascade from a tall white square vase with trailing eucalyptus. Soft, romantic, and endlessly elegant — designed for the love that speaks in soft tones.",
    sizes: [{ label: "Small", price: 125 }, { label: "Standard", price: 175 }, { label: "Deluxe", price: 245 }],
  },
  {
    id: 11, name: "Kaleidoscope", price: 158, category: "Birthday", img: IMG_KALEIDOSCOPE, tag: "", whiteBg: true,
    desc: "Hot pink gerbera daisies, peach and yellow Asiatic lilies, purple statice, and amaranth burst from a dark green pedestal vase with a sculptural curling branch. A maximalist celebration in every bloom.",
    sizes: [{ label: "Small", price: 108 }, { label: "Standard", price: 158 }, { label: "Deluxe", price: 225 }],
  },
  {
    id: 12, name: "Blush Reverie", price: 168, category: "Anniversary", img: IMG_BLUSH_REVERIE, tag: "",
    desc: "An airy cloud of pink garden roses and blush ranunculus with white spray roses and silver-green eucalyptus in a clear cylinder vase. Dreamy, feminine, and utterly timeless.",
    sizes: [{ label: "Small", price: 118 }, { label: "Standard", price: 168 }, { label: "Deluxe", price: 238 }],
  },
  {
    id: 13, name: "Festival Bloom", price: 178, category: "Birthday", img: IMG_FESTIVAL_BLOOM, tag: "",
    desc: "A showstopping arrangement of orange Asiatic lilies, hot pink roses, magenta carnations, yellow and orange gerbera daisies, and electric blue delphinium. Maximum color, maximum joy.",
    sizes: [{ label: "Small", price: 128 }, { label: "Standard", price: 178 }, { label: "Deluxe", price: 248 }],
  },
  {
    id: 14, name: "Pure Serenity", price: 195, category: "Wedding", img: IMG_PURE_SERENITY, tag: "Exclusive",
    desc: "An all-white masterpiece of garden roses, white hydrangea, lisianthus, baby's breath, and dusty miller arranged in an ivory ribbed column vase. Pristine, peaceful, and utterly sophisticated.",
    sizes: [{ label: "Small", price: 145 }, { label: "Standard", price: 195 }, { label: "Deluxe", price: 275 }],
  },
  {
    id: 15, name: "Golden Harvest", price: 155, category: "Everyday", img: IMG_GOLDEN_HARVEST, tag: "",
    desc: "A warm, abundant arrangement of sunflowers, orange roses, rust and yellow gerbera daisies, and bronze marigolds spilling from a terracotta vase with cascading eucalyptus.",
    sizes: [{ label: "Small", price: 105 }, { label: "Standard", price: 155 }, { label: "Deluxe", price: 220 }],
  },
  {
    id: 16, name: "Violet Reverie", price: 188, category: "Anniversary", img: IMG_VIOLET_REVERIE, tag: "New",
    desc: "Purple roses, white hydrangea, deep plum carnations, lavender delphinium, pampas grass, and towering gladioli spires rise from a moody plum vase. Architectural, romantic, and impossible to ignore.",
    sizes: [{ label: "Small", price: 138 }, { label: "Standard", price: 188 }, { label: "Deluxe", price: 268 }],
  },
  {
    id: 17, name: "Garden of Peace", price: 345, category: "Sympathy", img: IMG_GARDEN_BLISS, tag: "",
    desc: "A sweeping casket spray of pink Asiatic lilies, coral roses, white stock, garden roses, and soft purple lavender — a graceful, unhurried tribute that speaks to the beauty of a life fully lived.",
    sizes: [{ label: "Standard", price: 345 }, { label: "Large", price: 445 }, { label: "Grand", price: 565 }],
  },
  {
    id: 18, name: "Harvest Basket", price: 168, category: "Birthday", img: IMG_HARVEST_BASKET, tag: "New",
    desc: "Orange gerbera daisies, coral roses, king protea, orange Asiatic lilies, white anemones, and yellow button blooms spill from a rustic wooden box. Warm, abundant, and brimming with personality.",
    sizes: [{ label: "Small", price: 118 }, { label: "Standard", price: 168 }, { label: "Deluxe", price: 238 }],
  },
  {
    id: 19, name: "Ivory Reverie", price: 195, category: "Anniversary", img: IMG_IVORY_REVERIE, tag: "", whiteBg: true,
    desc: "White and cream garden roses, blush garden roses, peach dahlias, lime green hydrangea, pink astilbe, lavender, and baby's breath overflow from a rose gold pedestal urn. Soft, ethereal, and quietly magnificent.",
    sizes: [{ label: "Small", price: 145 }, { label: "Standard", price: 195 }, { label: "Deluxe", price: 278 }],
  },
  {
    id: 20, name: "Garden Reverie", price: 225, category: "Anniversary", img: IMG_GARDEN_REVERIE, tag: "Signature", whiteBg: true,
    desc: "Cream and blush garden roses, coral dahlias, pink roses, lime green hydrangea, purple astilbe, and cascading ivy tumble luxuriously from a rose gold pedestal urn. Painterly, abundant, and entirely unforgettable.",
    sizes: [{ label: "Small", price: 165 }, { label: "Standard", price: 225 }, { label: "Deluxe", price: 318 }],
  },
  {
    id: 21, name: "Crimson Affair", price: 185, category: "Anniversary", img: IMG_CRIMSON_AFFAIR, tag: "New",
    desc: "Red roses, white carnations, and white hydrangea rise from a sleek white cylindrical vase adorned with heart details, with dramatic dark red feathers reaching skyward and cascading pink amaranth below.",
    sizes: [{ label: "Small", price: 135 }, { label: "Standard", price: 185 }, { label: "Deluxe", price: 265 }],
  },
  {
    id: 22, name: "Bloom Box", price: 145, category: "Birthday", img: IMG_BLOOM_BOX, tag: "New", whiteBg: true,
    desc: "Coral roses, orange gerbera daisies, yellow-green chrysanthemums, pink carnations, white Asiatic lilies, and blue delphinium overflow from a ribboned white hat box tied with a silk bow.",
    sizes: [{ label: "Small", price: 98 }, { label: "Standard", price: 145 }, { label: "Deluxe", price: 208 }],
  },
  {
    id: 23, name: "The Afuvai Purse — Black Chain", price: 285, category: "Signature", img: IMG_PURSE_BLACK, tag: "Bestseller", whiteBg: true, pairedProductId: 1,
    desc: "The same iconic bloom-filled luxury acrylic purse — pink and coral garden roses, peonies, and ranunculus — reimagined with a sleek matte black chain handle. Striking, bold, and effortlessly editorial.",
    sizes: [{ label: "Mini", price: 225 }, { label: "Classic", price: 285 }, { label: "Grand", price: 385 }],
  },
  {
    id: 24, name: "Garden Bliss", price: 178, category: "Anniversary", img: IMG_GARDEN_BLISS, tag: "",
    desc: "Pink garden roses, blush spray roses, white hydrangea, deep pink astilbe, and fragrant pink stock spill from a clean white square vase with trailing sage eucalyptus.",
    sizes: [{ label: "Small", price: 128 }, { label: "Standard", price: 178 }, { label: "Deluxe", price: 252 }],
  },
  {
    id: 25, name: "Lavender Dreams", price: 215, category: "Sympathy", img: IMG_LAVENDER_DREAMS, tag: "",
    desc: "Purple and lavender roses, white hydrangea, deep plum carnations, pink stock, and towering gladioli and delphinium spires cascade from a frosted white pedestal urn. Grand in scale, serene in spirit.",
    sizes: [{ label: "Standard", price: 215 }, { label: "Large", price: 295 }, { label: "Grand", price: 395 }],
  },
  {
    id: 26, name: "Primary Burst", price: 158, category: "Everyday", img: IMG_PRIMARY_BURST, tag: "New",
    desc: "Red roses, yellow snapdragons, golden Asiatic lilies, orange alstroemeria, and sapphire blue delphinium fill a round glass fishbowl vase in an explosion of primary color.",
    sizes: [{ label: "Small", price: 108 }, { label: "Standard", price: 158 }, { label: "Deluxe", price: 225 }],
  },
  {
    id: 27, name: "Paradise Box", price: 155, category: "Birthday", img: IMG_PARADISE_BOX, tag: "New",
    desc: "Bird of paradise, magenta and orange roses, pink gypsophila, succulents, and tropical foliage burst from a lavender gift box, with sculptural curling branches reaching skyward.",
    sizes: [{ label: "Small", price: 105 }, { label: "Standard", price: 155 }, { label: "Deluxe", price: 218 }],
  },
];

export const OCCASIONS = ["All", "Signature", "Wedding", "Anniversary", "Birthday", "Sympathy", "Corporate", "Everyday"];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1,  img: IMG_PURSE,           category: "Signature",   title: "The Afuvai Purse — Gold",           venue: "Las Vegas, NV" },
  { id: 16, img: IMG_PURSE_BLACK,     category: "Signature",   title: "The Afuvai Purse — Black",          venue: "Las Vegas, NV" },
  { id: 2,  img: IMG_WILD_MEADOW,     category: "Wedding",     title: "Wild Meadow Bridal Bouquet",        venue: "Red Rock Canyon", whiteBg: true },
  { id: 3,  img: IMG_HEX_ARCH,        category: "Wedding",     title: "Hexagonal Wood Arch",               venue: "Private Estate", whiteBg: true },
  { id: 17, img: IMG_METAL_ARCH,      category: "Wedding",     title: "Garden Iron Arch — Blue & Coral",   venue: "Bellagio", whiteBg: true },
  { id: 5,  img: WEDDING_DECOR,       category: "Wedding",     title: "Reception Tablescape",              venue: "Wynn Las Vegas" },
  { id: 6,  img: RECEPTION_TABLE,     category: "Wedding",     title: "Ceremony Altar Styling",            venue: "Four Seasons" },
  { id: 18, img: IMG_PURE_SERENITY,   category: "Wedding",     title: "Pure Serenity",                     venue: "The Venetian" },
  { id: 7,  img: IMG_SUMMER_RADIANCE, category: "Birthday",    title: "Summer Radiance Pedestal",          venue: "Henderson, NV" },
  { id: 8,  img: IMG_VIVID_FIESTA,    category: "Birthday",    title: "Vivid Fiesta Vase",                 venue: "Las Vegas, NV", whiteBg: true },
  { id: 19, img: IMG_KALEIDOSCOPE,    category: "Birthday",    title: "Kaleidoscope",                      venue: "Summerlin, NV", whiteBg: true },
  { id: 20, img: IMG_FESTIVAL_BLOOM,  category: "Birthday",    title: "Festival Bloom",                    venue: "Las Vegas, NV" },
  { id: 9,  img: IMG_GOLDEN_HOUR,     category: "Anniversary", title: "Golden Hour Arrangement",           venue: "The Venetian" },
  { id: 10, img: IMG_JEWEL_GARDEN,    category: "Anniversary", title: "Jewel Garden Bouquet",              venue: "Private Delivery", whiteBg: true },
  { id: 21, img: IMG_BLUSHING_GARDEN, category: "Anniversary", title: "Blushing Garden",                   venue: "Caesars Palace", whiteBg: true },
  { id: 22, img: IMG_BLUSH_REVERIE,   category: "Anniversary", title: "Blush Reverie",                     venue: "Las Vegas, NV" },
  { id: 11, img: IMG_GARDEN_SUNRISE,  category: "Everyday",    title: "Garden Sunrise Vase",               venue: "Residential" },
  { id: 23, img: IMG_GOLDEN_HARVEST,  category: "Everyday",    title: "Golden Harvest",                    venue: "Corporate Client" },
  { id: 12, img: IMG_STATEMENT,       category: "Corporate",   title: "The Statement",                     venue: "Caesars Palace" },
  { id: 13, img: IMG_HEART_WREATH,    category: "Sympathy",    title: "Heart of Remembrance Wreath",       venue: "Las Vegas, NV" },
  { id: 24, img: IMG_VIOLET_REVERIE,  category: "Anniversary", title: "Violet Reverie",                    venue: "Las Vegas, NV" },
  { id: 25, img: IMG_LAVENDER_DREAMS, category: "Anniversary", title: "Lavender Dreams",                   venue: "Las Vegas, NV" },
  { id: 26, img: IMG_HARVEST_BASKET,  category: "Birthday",    title: "Harvest Basket",                    venue: "Henderson, NV" },
  { id: 27, img: IMG_IVORY_REVERIE,   category: "Anniversary", title: "Ivory Reverie",                     venue: "Las Vegas, NV", whiteBg: true },
  { id: 28, img: IMG_GARDEN_REVERIE,  category: "Anniversary", title: "Garden Reverie",                    venue: "The Venetian", whiteBg: true },
  { id: 29, img: IMG_CRIMSON_AFFAIR,  category: "Anniversary", title: "Crimson Affair",                    venue: "Las Vegas, NV" },
  { id: 30, img: IMG_BLOOM_BOX,       category: "Birthday",    title: "Bloom Box",                         venue: "Las Vegas, NV", whiteBg: true },
  { id: 31, img: IMG_PURSE_BLACK,     category: "Signature",   title: "The Afuvai Purse — Black Chain",    venue: "Las Vegas, NV", whiteBg: true },
  { id: 32, img: IMG_GARDEN_BLISS,    category: "Anniversary", title: "Garden Bliss",                      venue: "Las Vegas, NV" },
  { id: 33, img: IMG_LAVENDER_DREAMS, category: "Sympathy",    title: "Lavender Dreams",                   venue: "Las Vegas, NV" },
  { id: 34, img: IMG_PRIMARY_BURST,   category: "Everyday",    title: "Primary Burst",                     venue: "Las Vegas, NV" },
  { id: 35, img: IMG_TROPICAL_BOX,    category: "Birthday",    title: "Tropical Bliss Box",                venue: "Las Vegas, NV", whiteBg: true },
  { id: 36, img: IMG_PARADISE_BOX,    category: "Birthday",    title: "Paradise Box",                      venue: "Las Vegas, NV" },
  { id: 14, img: PARTY_IMG,           category: "Parties",     title: "Bouquet Bar Setup",                 venue: "Private Event" },
  { id: 15, img: WORKSHOP_IMG,        category: "Parties",     title: "Crown Workshop Experience",         venue: "Bachelorette Party" },
];

export const PORTFOLIO_CATS = ["All", "Signature", "Wedding", "Birthday", "Anniversary", "Everyday", "Corporate", "Sympathy", "Parties"];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Wendy N.",   city: "Las Vegas, NV",  rating: 5, text: "AmiDayne did our entire wedding — ceremony arch, reception tables, bouquets, everything. I walked in and genuinely started crying. My guests are still messaging me asking who did the flowers. I cannot recommend Afuvai enough." },
  { name: "Michele A.", city: "Henderson, NV",  rating: 5, text: "I've had a monthly subscription for almost a year now and every single delivery feels like a gift to myself. My home has never looked this beautiful. The quality is unlike anything else I've found in the valley — I am a forever customer." },
  { name: "Myke N.",    city: "Summerlin, NV",  rating: 5, text: "I ordered the Ivory Reverie for my anniversary and my husband completely lost it — the good kind of lost it. He said it was the most beautiful thing I had ever given him. Afuvai made me look incredible. I will be ordering from them for every occasion from here on." },
];

export const SUB_FREQUENCIES = ["Weekly", "Bi-Weekly", "Monthly"];
export const SUB_TIERS: SubTier[] = [
  { name: "Ivory",  img: IMG_GARDEN_SUNRISE, badge: "",             price: { Weekly: 65,  "Bi-Weekly": 55,  Monthly: 45  }, items: ["One seasonal arrangement", "Hand-wrapped with ribbon", "Personal note card", "Free delivery"] },
  { name: "Sage",   img: IMG_SUMMER_RADIANCE, badge: "Most Popular", price: { Weekly: 135, "Bi-Weekly": 115, Monthly: 90  }, items: ["Two signature arrangements", "Designer-curated selection", "Vase included", "Priority same-day LV delivery", "Occasion reminders"] },
  { name: "Gold",   img: IMG_GOLDEN_HOUR,    badge: "Best Value",   price: { Weekly: 280, "Bi-Weekly": 240, Monthly: 195 }, items: ["Four bespoke arrangements", "Dedicated design concierge", "Weekly refresh option", "Vases included", "20% off all events & parties", "First access to limited collections"] },
];

export const PARTY_EXPERIENCES: PartyExperience[] = [
  { name: "Bouquet Bar",            price: "From $65 per guest",  group: "10–50 guests",  duration: "2 hrs",   symbol: "✦", desc: "Guests hand-select seasonal stems and build their own hand-tied bouquet with guidance from our floral artists. Ideal for bridal showers, birthdays, and private gatherings.", img: PARTY_IMG },
  { name: "Arrangement Workshop",   price: "From $95 per guest",  group: "6–20 guests",   duration: "2.5 hrs", symbol: "◆", desc: "Learn the fundamentals of floral design. Each guest leaves with a finished vase arrangement and a take-home care guide.", img: WORKSHOP_IMG },
  { name: "Floral Crown Bar",       price: "From $75 per guest",  group: "8–30 guests",   duration: "2 hrs",   symbol: "◇", desc: "Design and wear your own floral crown using seasonal blooms and greenery. A signature experience for bachelorette parties and milestone celebrations.", img: FLOWER_CLOSEUP },
  { name: "Flower Purse Party",     price: "From $125 per guest", group: "10–30+ guests", duration: "2 hrs",   symbol: "✺", desc: "The ultimate bachelorette experience. Each guest designs their own bouquet arranged inside a stunning acrylic purse with a gold chain handle — a luxury floral keepsake.", img: IMG_PURSE },
  { name: "Private Dinner Florals", price: "From $400 total",     group: "Up to 12",      duration: "Setup",   symbol: "—", desc: "Bespoke table florals designed and installed for your private dinner. Tablescapes, place settings, and ambient arrangements. Teardown included.", img: RECEPTION_TABLE },
  { name: "Bachelorette Pop-Up",    price: "Custom quote",        group: "Any size",      duration: "3 hrs",   symbol: "·", desc: "Full floral pop-up with branded setup, photo-ready flower wall, and a guided design activity. Las Vegas's most beautiful way to celebrate.", img: PINK_BOUQUET },
  { name: "Birthday Experience",    price: "From $55 per guest",  group: "10–40 guests",  duration: "1.5 hrs", symbol: "·", desc: "A celebratory floral experience tailored to the guest of honor. Choose your activity, color palette, and optional add-ons.", img: PURPLE_BOUQUET },
];

export const FAQS_PARTIES: FaqItem[] = [
  { q: "Do you travel to our venue?",          a: "Yes — we come to you anywhere in the Las Vegas Valley, Henderson, Summerlin, and North Las Vegas. Travel fees may apply beyond 30 miles." },
  { q: "How far in advance should we book?",   a: "We recommend 3–4 weeks for private events, 2+ weeks for workshops. Peak season (October–May) fills quickly." },
  { q: "What is included in the guest price?", a: "All materials, stems, tools, and wrapping are included. We bring everything and set up and break down at no extra charge." },
  { q: "Can we customize the color palette?",  a: "Absolutely. Every experience can be tailored to your color story, theme, and aesthetic." },
  { q: "Is a deposit required?",               a: "Yes — a 50% deposit secures your date. The balance is due 7 days before your event." },
];

export const FAQS_SUB: FaqItem[] = [
  { q: "When will my first delivery arrive?",   a: "Your first arrangement ships within 2–3 business days of subscribing. All future deliveries follow your chosen frequency." },
  { q: "Can I pause or skip a delivery?",       a: "Yes. Pause, skip, or reschedule any delivery with at least 3 days' notice." },
  { q: "Do I get to choose my flowers?",        a: "Sage and Gold members receive a designer-curated selection. Ivory members can indicate a color preference." },
  { q: "How does the 20% event discount work?", a: "Gold members receive 20% off all party bookings, wedding florals, and one-time arrangements — applied automatically at checkout." },
  { q: "Is there a contract?",                  a: "No contracts. Cancel anytime with 7 days' notice before your next delivery." },
];

export const FAQS_WEDDINGS: FaqItem[] = [
  { q: "How far in advance should we book?",   a: "We recommend booking 6–12 months out for weddings, especially for peak season (October–May). Shorter timelines are accommodated when availability allows." },
  { q: "Do you travel to the venue?",          a: "Yes — we travel to any venue in the Las Vegas Valley and greater Nevada area. Travel fees apply beyond 30 miles from central Las Vegas." },
  { q: "What is included in a consultation?",  a: "Your complimentary consultation includes a vision discussion, venue review, color palette planning, and a custom proposal delivered within 5 business days." },
  { q: "Can we see samples before booking?",   a: "Yes. For full-service clients, we offer a paid sample session where we create mini versions of your planned arrangements for your approval." },
  { q: "What is your minimum for weddings?",   a: "Our wedding minimum is $1,500. Most full-service weddings range from $3,000–$15,000+ depending on scope, guest count, and design complexity." },
];

export const CLASSES: Class[] = [
  { name: "Beginner Bouquet",       price: 85,  duration: "90 min",  group: "Up to 12",    img: PINK_BOUQUET,   desc: "The perfect introduction to floral design. Learn stem selection, color theory, and hand-tying technique. Leave with your own wrapped bouquet and a care card." },
  { name: "Seasonal Design",        price: 110, duration: "2 hrs",   group: "Up to 10",    img: GARDEN_MIX,     desc: "Design with what's in season. AmiDayne walks you through the seasonal palette, pairing stems, and creating arrangements that reflect the time of year." },
  { name: "Advanced Arrangement",   price: 145, duration: "2.5 hrs", group: "Up to 8",     img: PURPLE_BOUQUET, desc: "For those ready to go deeper. Asymmetric design, tension and flow, negative space, and architectural arrangement techniques guided by AmiDayne." },
  { name: "Private Group Workshop", price: 0,   duration: "Custom",  group: "4–20 people", img: WORKSHOP_IMG,   desc: "Book a private class for your team, friends, or family. Fully customizable — choose your activity, color palette, and experience level. Custom pricing." },
];

export const ADDONS = [
  { id: "vase",      img: MIXED_VASE,  label: "Premium Glass Vase",    price: 28, desc: "Hand-blown clear glass vase" },
  { id: "choc",      img: GARDEN_MIX, label: "Artisan Chocolates",     price: 22, desc: "Local artisan chocolate box, 6-piece" },
  { id: "card",      img: PETAL_MACRO, label: "Handwritten Note Card", price: 8,  desc: "Calligraphy note on premium stock" },
  { id: "preserved", img: ROSE_IMG,   label: "Preserved Rose Add-on",  price: 35, desc: "Lasting preserved rose keepsake" },
];

export const PRIMARY_NAV = [
  { label: "Shop Collections", href: "/#collections" },
  { label: "Classes",          href: "/classes" },
  { label: "Weddings",         href: "/weddings" },
  { label: "Meet AmiDayne",    href: "/florist" },
];

export const DROPDOWN_NAV = [
  {
    section: "Experiences",
    links: [
      { label: "Host an Event",       href: "/parties" },
      { label: "Collaborate with Us", href: "/collabs" },
      { label: "Bulk Flower Orders",  href: "/bulk" },
      { label: "Build Your Bouquet",  href: "/quiz" },
    ],
  },
  {
    section: "Explore",
    links: [
      { label: "Specialty Services",  href: "/specialty" },
      { label: "Design Inspiration",  href: "/journal" },
      { label: "Care Guide",          href: "/care-tips" },
      { label: "Free Consultation",   href: "/consultation" },
      { label: "Portfolio",           href: "/portfolio" },
      { label: "Subscriptions",       href: "/subscriptions" },
      { label: "Gift Cards",          href: "/gift-cards" },
    ],
  },
];

export const ALL_NAV_MOBILE = [
  { label: "Shop Collections",   href: "/#collections" },
  { label: "Classes",            href: "/classes" },
  { label: "Weddings",           href: "/weddings" },
  { label: "Host an Event",      href: "/parties" },
  { label: "Specialty Services", href: "/specialty" },
  { label: "Design Inspiration", href: "/journal" },
  { label: "Build Your Bouquet", href: "/quiz" },
  { label: "Gift Cards",         href: "/gift-cards" },
  { label: "Collaborate",        href: "/collabs" },
  { label: "Subscriptions",      href: "/subscriptions" },
  { label: "Bulk Orders",        href: "/bulk" },
  { label: "Meet AmiDayne",      href: "/florist" },
  { label: "Care Tips",          href: "/care-tips" },
  { label: "Free Consultation",  href: "/consultation" },
];
