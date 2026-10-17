/* AFUVAI Wedding Calculator — pricing & content configuration.
 * Everything a non-developer should ever need to change lives here.
 * The admin panel (admin.html) can override any of the PRICING values without editing this file.
 *
 * HOW PRICES ARE BUILT (per piece, per tier):
 *   price = (stems x wholesale cost per stem x FLOWER_MARKUP)
 *         + (hard goods cost x HARDGOODS_MARKUP)
 *         + (design minutes / 60 x LABOR_RATE)
 *   rounded to the nearest $5. Rentals are charged on their own line.
 * Stem categories: f = focal blooms, a = accent blooms, x = filler/texture, g = greenery.
 * Every array is [Classic, Lush, Statement].
 */
(function (root) {
  var C = {
    version: 1,

    /* ---------- Contact & business ---------- */
    business: {
      name: "AFUVAI Floral Society",
      designer: "AmiDayne",
      city: "Las Vegas, Nevada",
      email: "amidaynenelsen@gmail.com",
      phone: "(725) 400-6231",
      showContactAfterSubmit: true,
      insured: false,            /* set true once general liability insurance is active: shows the COI line */
      introVideoUrl: "",         /* e.g. a hosted .mp4 of the Runway brand film; hidden while empty */
      siteUrl: "https://afuvai.com"
    },

    /* ---------- Integrations (deploy only; leave blank in the prototype) ---------- */
    integrations: {
      apiBase: "",               /* "" = no custom server (current launch). Set to "auto" only once the /api Netlify Functions exist. */
      /* Where "Send my estimate" goes.
       *   mode "netlify"   = Netlify Forms (host on Netlify, turn on form detection, set the notification email in Netlify).
       *   mode "formspree" = POST to formspreeUrl (e.g. "https://formspree.io/f/abcd1234"), works on any host.
       * If sending ever fails, the client gets a one-tap email to AmiDayne with the full estimate instead. */
      form: { mode: "api", url: "/api/weddings/lead", name: "wedding-estimate", formspreeUrl: "" },
      /* Proposals, signing, Stripe payments and the status view (netlify/functions). "" = preview mode, "auto" = live on afuvai.com / netlify.app. */
      bookingApi: "auto",
      turnstileSiteKey: "",
      clarityId: "",
      plausibleDomain: ""
    },

    /* ---------- Tiers ---------- */
    tiers: [
      { key: "classic", name: "Classic", desc: "Premium roses, hydrangea and lisianthus, styled with seasonal greenery. Graceful and full." },
      { key: "lush", name: "Lush", desc: "Garden roses and luxury seasonal blooms, layered for depth. Our most-loved level." },
      { key: "statement", name: "Statement", desc: "Peonies, orchids and imported rarities, abundant and sculptural. The showstopper." }
    ],
    defaultTier: 1,

    /* ---------- Pricing ---------- */
    pricing: {
      stemCost: {               /* estimated Las Vegas wholesale $/stem by category, per tier */
        f: [2.40, 5.25, 7.75],
        a: [1.85, 2.90, 3.90],
        x: [1.20, 1.70, 2.40],
        g: [0.95, 1.25, 1.70]
      },
      flowerMarkup: 3.0,
      hardgoodsMarkup: 2.5,
      laborRate: 70,             /* $/hr design labor, built into piece prices (never shown) */
      laborCostRate: 30,         /* what design time actually costs you, for the margin view */
      roundTo: 5,
      productionPct: 0.15,       /* Production, delivery team & installation, % of florals */
      productionMin: 250,
      rangeLow: 0.95,
      rangeHigh: 1.08,
      taxRate: 0.08375,          /* Clark County combined rate; applied to florals + rentals. Confirm with CPA. */
      marginTarget: 0.60,
      truckCapacity: 40,         /* truck units per F-150 trip (1 unit = one low centerpiece) */
      extraTripFee: 175,
      zones: {
        core:  { name: "Las Vegas Strip, central Las Vegas, Henderson, Summerlin", delivery: 275 },
        outer: { name: "Boulder City, North Las Vegas, Lake Las Vegas, Mountain's Edge and beyond", delivery: 375 },
        far:   { name: "Red Rock Canyon, Mount Charleston, Valley of Fire, Lake Mead", delivery: 650 }
      },
      strike: { standard: 250, resortLateNight: 400 },
      resortLoadIn: 250,
      heat: { months: [6, 7, 8, 9], flat: 150, pct: 0.04 },   /* outdoor summer: hydration, shade staging, extra hands */
      wind: { fee: 200 },                                     /* desert sites with arches, aisle or ground pieces */
      reuseMoveFee: 150,
      minimums: { elopement: 650, intimate: 2500, classic: 5000, grand: 10000 },
      peakDates: [
        { name: "Valentine's week", from: "02-07", to: "02-16", pct: 0.15 },
        { name: "Mother's Day week", from: "05-04", to: "05-12", pct: 0.10 },
        { name: "New Year's Eve weekend", from: "12-29", to: "01-01", pct: 0.10 }
      ],
      quoteValidDays: 14
    },

    /* ---------- Pieces ----------
     * truck: truck units per piece. rent: rental price per piece [C,L,S] (vessels, stands, structures).
     * candles: true = adds the candle package per table. fixed: flat price instead of a recipe.
     */
    groups: [
      { key: "party", title: "Wedding party", items: [
        { id: "bride", nm: "Bridal bouquet", nt: "Your hero piece, hand-tied and finished in silk ribbon.", truck: 1,
          r: { f: [10, 12, 16], a: [8, 8, 10], x: [6, 6, 8], g: [8, 8, 10], hg: [8, 12, 20], min: [40, 45, 60] } },
        { id: "maid", nm: "Bridesmaid bouquets", nt: "Each.", truck: 0.5,
          r: { f: [4, 4, 6], a: [3, 4, 5], x: [3, 3, 4], g: [4, 4, 5], hg: [4, 5, 8], min: [12, 15, 20] } },
        { id: "toss", nm: "Toss bouquet", nt: "A smaller keepsake so you can keep your bridal bouquet.", truck: 0.5,
          r: { f: [2, 2, 3], a: [2, 2, 3], x: [2, 2, 2], g: [2, 2, 3], hg: [3, 4, 6], min: [8, 10, 12] } },
        { id: "bout", nm: "Boutonnières", nt: "Groom, groomsmen, fathers, grandfathers.", truck: 0.1,
          r: { f: [1, 1, 1], a: [0, 0, 1], x: [1, 1, 1], g: [1, 1, 2], hg: [1, 1.5, 2.5], min: [6, 7, 9] } },
        { id: "cors", nm: "Corsages", nt: "Wrist or pin-on, for mothers and grandmothers.", truck: 0.1,
          r: { f: [1, 1, 2], a: [1, 1, 2], x: [2, 2, 2], g: [1, 1, 2], hg: [4, 5, 7], min: [8, 10, 12] } },
        { id: "fgirl", nm: "Flower girl petals or crown", nt: "Each child.", truck: 0.3,
          r: { f: [1, 2, 3], a: [1, 2, 2], x: [2, 2, 3], g: [2, 2, 2], hg: [4, 5, 8], min: [8, 10, 14] } },
        { id: "hair", nm: "Hair flowers or floral comb", nt: "For the bride or the bridal party.", truck: 0.1,
          r: { f: [1, 1, 2], a: [1, 2, 2], x: [2, 2, 3], g: [1, 1, 1], hg: [3, 4, 6], min: [10, 12, 15] } }
      ]},
      { key: "ceremony", title: "Ceremony", items: [
        { id: "arch", nm: "Ceremony arch or backdrop", nt: "Florals plus the arch structure. Larger builds are sized at your consultation.", truck: 8,
          rent: [275, 375, 550],
          r: { f: [60, 70, 95], a: [40, 50, 70], x: [30, 40, 50], g: [60, 70, 90], hg: [40, 60, 90], min: [180, 240, 330] } },
        { id: "aisle", nm: "Aisle arrangements", nt: "Each. Lines the aisle on stands or at the ground.", truck: 2,
          rent: [10, 15, 25],
          r: { f: [5, 5, 8], a: [4, 4, 6], x: [4, 4, 5], g: [6, 6, 8], hg: [3, 4, 6], min: [15, 18, 25] } },
        { id: "cerground", nm: "Ceremony statement urns", nt: "Each. Large ground arrangements to frame the altar or a chapel aisle.", truck: 4,
          rent: [35, 55, 85],
          r: { f: [14, 18, 26], a: [12, 15, 20], x: [10, 12, 15], g: [18, 20, 25], hg: [10, 15, 25], min: [45, 55, 75] } },
        { id: "petals", nm: "Aisle petal runner", nt: "Fresh petals lining the aisle, per aisle.", truck: 1,
          r: { f: [0, 0, 0], a: [0, 0, 0], x: [20, 30, 45], g: [0, 0, 0], hg: [5, 8, 10], min: [20, 25, 35] } }
      ]},
      { key: "cocktail", title: "Entrance and cocktail hour", items: [
        { id: "welcome", nm: "Welcome sign florals", nt: "Easel included.", truck: 2,
          rent: [25, 35, 50],
          r: { f: [6, 7, 11], a: [5, 6, 8], x: [5, 6, 8], g: [10, 10, 12], hg: [6, 8, 12], min: [25, 30, 40] } },
        { id: "escort", nm: "Escort card or seating chart display", nt: "Display frame included.", truck: 3,
          rent: [75, 95, 150],
          r: { f: [7, 9, 14], a: [6, 8, 10], x: [6, 6, 8], g: [12, 14, 18], hg: [10, 14, 20], min: [40, 50, 65] } },
        { id: "bar", nm: "Bar and cocktail table arrangements", nt: "Each.", truck: 1,
          rent: [10, 15, 25],
          r: { f: [4, 5, 7], a: [3, 4, 5], x: [3, 3, 4], g: [4, 4, 6], hg: [3, 4, 6], min: [12, 14, 18] } }
      ]},
      { key: "reception", title: "Reception", items: [
        { id: "cplow", nm: "Low centerpieces", nt: "Per table, with vessel and candles.", truck: 1, candles: true,
          rent: [14, 22, 35],
          r: { f: [6, 7, 10], a: [5, 6, 8], x: [4, 5, 6], g: [6, 7, 8], hg: [3, 4, 6], min: [14, 16, 22] } },
        { id: "cptall", nm: "Tall centerpieces", nt: "Per table, on a stand, with candles.", truck: 2.5, candles: true,
          rent: [45, 65, 95],
          r: { f: [12, 15, 20], a: [8, 10, 13], x: [7, 8, 10], g: [10, 12, 15], hg: [6, 8, 12], min: [25, 30, 40] } },
        { id: "sweet", nm: "Sweetheart or head table", nt: "One design for the whole table, with candles.", truck: 4,
          rent: [45, 65, 95],
          r: { f: [18, 22, 30], a: [12, 14, 18], x: [10, 12, 15], g: [16, 18, 22], hg: [8, 10, 15], min: [45, 55, 70] } },
        { id: "cake", nm: "Cake flowers", nt: "Food-safe placement, coordinated with your baker.", truck: 0.5,
          r: { f: [2, 3, 4], a: [2, 2, 3], x: [2, 2, 3], g: [2, 2, 2], hg: [2, 2, 3], min: [10, 12, 15] } }
      ]},
      { key: "signature", title: "Statement installations", items: [
        { id: "wall", nm: "Floral wall", nt: "8 by 8 feet, frame included. A Las Vegas favorite for photos.", truck: 14,
          rent: [350, 450, 600],
          r: { f: [160, 190, 240], a: [100, 120, 150], x: [80, 90, 100], g: [60, 70, 80], hg: [150, 200, 250], min: [480, 600, 780] } },
        { id: "hang", nm: "Hanging installation", nt: "Per 10 feet, rigging included. Venue approval required.", truck: 8,
          rent: [250, 350, 450],
          r: { f: [60, 75, 100], a: [40, 50, 65], x: [40, 45, 55], g: [80, 90, 110], hg: [60, 80, 100], min: [180, 220, 280] } },
        { id: "purse", nm: "Signature floral purse", nt: "Our acrylic floral handbag with your custom monogram. Works as a bouquet, an accessory and a centerpiece.", truck: 0.5,
          fixed: [150, 225, 325], hasText: true }
      ]},
      { key: "weekend", title: "Your wedding weekend", items: [
        { id: "suite", nm: "Getting-ready suite florals", nt: "Arrangements for the bridal suite and photos.", truck: 1,
          r: { f: [6, 7, 10], a: [6, 7, 9], x: [5, 6, 7], g: [6, 7, 8], hg: [6, 8, 12], min: [20, 25, 30] } },
        { id: "rooms", nm: "Guest room welcome flowers", nt: "Per hotel room, delivered with a note from you.", truck: 0.2,
          r: { f: [1, 2, 3], a: [1, 1, 2], x: [1, 1, 2], g: [1, 1, 2], hg: [2, 3, 4], min: [4, 5, 6] } },
        { id: "evwelcome", nm: "Welcome party arrangements", nt: "Each.", truck: 1,
          rent: [10, 15, 25],
          r: { f: [4, 5, 7], a: [3, 4, 5], x: [3, 3, 4], g: [4, 4, 6], hg: [3, 4, 6], min: [12, 14, 18] } },
        { id: "evrehearsal", nm: "Rehearsal dinner arrangements", nt: "Per table.", truck: 0.8,
          rent: [10, 15, 25],
          r: { f: [3, 4, 6], a: [3, 3, 4], x: [2, 3, 3], g: [3, 3, 4], hg: [2, 3, 4], min: [10, 12, 15] } },
        { id: "evafter", nm: "After-party statement arrangements", nt: "Each. Sized for a lounge, suite or nightclub table.", truck: 2,
          rent: [15, 25, 35],
          r: { f: [10, 12, 16], a: [6, 8, 10], x: [5, 6, 8], g: [8, 8, 10], hg: [6, 8, 12], min: [25, 30, 40] } },
        { id: "evbrunch", nm: "Farewell brunch arrangements", nt: "Per table.", truck: 0.8,
          rent: [10, 15, 25],
          r: { f: [3, 4, 6], a: [3, 3, 4], x: [2, 3, 3], g: [3, 3, 4], hg: [2, 3, 4], min: [10, 12, 15] } }
      ]},
      { key: "keepsakes", title: "Keepsakes", items: [
        { id: "preserve", nm: "Bouquet preservation", nt: "Your bridal bouquet preserved as a framed keepsake through our preservation partner.", truck: 0,
          fixed: [425, 425, 425], service: true },
        { id: "anniv", nm: "First-anniversary flowers", nt: "Reserved today, delivered on your first anniversary in your wedding palette.", truck: 0,
          fixed: [175, 250, 375], service: true }
      ]}
    ],
    candlePackage: [24, 32, 48],   /* per table with a centerpiece */

    /* ---------- Packages (auto-fill from guest count) ---------- */
    packages: [
      { key: "elopement", name: "Elopement", range: "Up to 20 guests", maxGuests: 20 },
      { key: "intimate", name: "Intimate", range: "21 to 60 guests", maxGuests: 60 },
      { key: "classic", name: "Celebration", range: "61 to 160 guests", maxGuests: 160 },
      { key: "grand", name: "Grand", range: "161 guests and up", maxGuests: 100000 }
    ],

    /* ---------- Style directions ---------- */
    styles: [
      { key: "garden", name: "Romantic Garden", line: "Soft, airy and abundant, with movement.", tallShare: 0.33,
        palette: ["Ivory", "Blush", "Champagne", "Sage"], favor: ["Garden rose", "Ranunculus", "Sweet pea", "Peony", "Lisianthus"] },
      { key: "modern", name: "Modern Minimal", line: "Clean lines, few varieties, real negative space.", tallShare: 0.25,
        palette: ["White", "Green", "Black"], favor: ["Calla lily", "Phalaenopsis orchid", "Anthurium", "Tulip"] },
      { key: "glam", name: "Vegas Glam", line: "Tall, candlelit and opulent. Made for a ballroom.", tallShare: 0.6,
        palette: ["White", "Champagne", "Gold", "Blush"], favor: ["Premium rose", "Phalaenopsis orchid", "Hydrangea", "Cymbidium orchid"] },
      { key: "boho", name: "Desert Boho", line: "Warm tones, texture and dried accents.", tallShare: 0.2,
        palette: ["Terracotta", "Peach", "Champagne", "Brown"], favor: ["Protea", "Dahlia", "Pampas grass", "Garden rose"] },
      { key: "white", name: "Timeless White", line: "All white and green. Classic for a reason.", tallShare: 0.4,
        palette: ["White", "Ivory", "Green"], favor: ["Garden rose", "Hydrangea", "Phalaenopsis orchid", "Lily of the valley"] }
    ],

    colors: [
      ["White", "#ffffff"], ["Ivory", "#f3ecdc"], ["Champagne", "#e6d2ab"], ["Blush", "#f2cfca"], ["Pink", "#ec9db3"],
      ["Fuchsia", "#c42f84"], ["Peach", "#f6c19e"], ["Coral", "#ef6f5c"], ["Orange", "#e98a32"], ["Terracotta", "#b5603f"],
      ["Yellow", "#f1d04d"], ["Gold", "#d9a94e"], ["Red", "#bd2531"], ["Burgundy", "#6c1f2e"], ["Plum", "#5a2a4d"],
      ["Lavender", "#c3afdf"], ["Purple", "#76489c"], ["Dusty Blue", "#8aa6c1"], ["Navy", "#1f2b4c"], ["Sage", "#a3b298"],
      ["Green", "#47794d"], ["Brown", "#7a5539"], ["Black", "#1d1c1b"]
    ],

    /* ---------- Bloom catalog (design board + seasonality) ----------
     * m = months available locally at good quality (1-12). lvl = lowest tier it normally appears in (0 Classic, 1 Lush, 2 Statement).
     * heat = holds up in outdoor desert heat. c = colors it comes in.
     */
    blooms: [
      { n: "Premium rose", lvl: 0, heat: false, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Ivory","Champagne","Blush","Pink","Fuchsia","Peach","Coral","Orange","Yellow","Red","Burgundy","Lavender"] },
      { n: "Spray rose", lvl: 0, heat: false, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Ivory","Blush","Pink","Peach","Coral","Yellow","Red","Burgundy","Lavender"] },
      { n: "Hydrangea", lvl: 0, heat: false, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Ivory","Blush","Pink","Lavender","Dusty Blue","Navy","Green","Burgundy"] },
      { n: "Lisianthus", lvl: 0, heat: false, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Ivory","Champagne","Blush","Lavender","Purple","Green"] },
      { n: "Stock", lvl: 0, heat: false, m: [1,2,3,4,5,10,11,12], c: ["White","Ivory","Blush","Pink","Lavender","Purple","Peach"] },
      { n: "Snapdragon", lvl: 0, heat: false, m: [1,2,3,4,5,6,9,10,11,12], c: ["White","Blush","Pink","Peach","Yellow","Burgundy","Orange"] },
      { n: "Garden rose", lvl: 1, heat: false, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Ivory","Champagne","Blush","Pink","Peach","Coral","Yellow","Red","Burgundy","Lavender"] },
      { n: "Ranunculus", lvl: 1, heat: false, m: [1,2,3,4,5,11,12], c: ["White","Blush","Pink","Peach","Coral","Orange","Yellow","Red","Burgundy","Plum","Champagne"] },
      { n: "Anemone", lvl: 1, heat: false, m: [1,2,3,4,11,12], c: ["White","Red","Blush","Purple","Plum","Navy"] },
      { n: "Sweet pea", lvl: 1, heat: false, m: [3,4,5,6], c: ["White","Blush","Pink","Lavender","Purple","Burgundy","Peach"] },
      { n: "Dahlia", lvl: 1, heat: false, m: [7,8,9,10], c: ["White","Blush","Peach","Coral","Orange","Burgundy","Plum","Pink","Yellow","Champagne"] },
      { n: "Calla lily", lvl: 1, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Ivory","Blush","Burgundy","Plum","Orange","Yellow","Purple","Black"] },
      { n: "Tulip", lvl: 1, heat: false, m: [1,2,3,4,12], c: ["White","Pink","Red","Yellow","Purple","Orange","Peach","Blush"] },
      { n: "Delphinium", lvl: 1, heat: false, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["Dusty Blue","Navy","Lavender","White","Purple"] },
      { n: "Cymbidium orchid", lvl: 1, heat: true, m: [1,2,3,4,10,11,12], c: ["White","Green","Blush","Burgundy","Yellow","Champagne"] },
      { n: "Anthurium", lvl: 1, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Red","Pink","Burgundy","Green","Blush"] },
      { n: "Peony", lvl: 2, heat: false, m: [4,5,6], c: ["White","Ivory","Blush","Pink","Coral","Burgundy","Fuchsia"] },
      { n: "Phalaenopsis orchid", lvl: 2, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["White","Pink","Fuchsia","Purple","Yellow","Blush"] },
      { n: "Protea", lvl: 2, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["Pink","Blush","White","Burgundy","Champagne"] },
      { n: "Lily of the valley", lvl: 2, heat: false, m: [4,5,6], c: ["White"] },
      { n: "Pampas grass", lvl: 0, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["Champagne","Ivory","Brown","Terracotta"] },
      { n: "Eucalyptus", lvl: 0, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["Sage","Green"], green: true },
      { n: "Italian ruscus", lvl: 0, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["Green"], green: true },
      { n: "Olive branch", lvl: 1, heat: true, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["Sage"], green: true },
      { n: "Smilax garland", lvl: 1, heat: false, m: [1,2,3,4,5,6,7,8,9,10,11,12], c: ["Green"], green: true }
    ],
    /* chips shown under "Have flower favorites?" — tap once to love, twice for never */
    favoriteChips: ["Peony", "Garden rose", "Ranunculus", "Hydrangea", "Phalaenopsis orchid", "Calla lily", "Dahlia", "Protea", "Tulip", "Anemone", "Sweet pea", "Lily of the valley", "Pampas grass", "Baby's breath", "Carnation", "Lilies (fragrant)"],
    substitutes: {
      "Peony": "garden roses, which give the same full, ruffled look",
      "Sweet pea": "spray roses and lisianthus for the same soft movement",
      "Lily of the valley": "stephanotis and white spray roses",
      "Ranunculus": "garden roses and lisianthus",
      "Anemone": "white lisianthus with dark-center accents",
      "Dahlia": "garden roses and protea",
      "Tulip": "calla lilies for a similar clean line",
      "Hydrangea": "heat-hardy orchids and anthurium for outdoor summer pieces"
    },

    /* ---------- Venues ----------
     * type: resort | chapel | club | outdoor | private. zone: core | outer | far.
     * Fees follow the venue TYPE (resort load-in, late-night breakdown, desert wind), not venue-specific rules.
     * Ami: confirm each venue's actual vendor rules before relying on them.
     */
    venues: [
      { id: "bellagio", n: "Bellagio", type: "resort", zone: "core", setting: "indoor" },
      { id: "wynn", n: "Wynn and Encore Las Vegas", type: "resort", zone: "core", setting: "both" },
      { id: "caesars", n: "Caesars Palace", type: "resort", zone: "core", setting: "both" },
      { id: "fontainebleau", n: "Fontainebleau Las Vegas", type: "resort", zone: "core", setting: "both" },
      { id: "aria", n: "ARIA Resort and Casino", type: "resort", zone: "core", setting: "indoor" },
      { id: "cosmo", n: "The Cosmopolitan of Las Vegas", type: "resort", zone: "core", setting: "both" },
      { id: "venetian", n: "The Venetian Resort", type: "resort", zone: "core", setting: "both" },
      { id: "waldorf", n: "Waldorf Astoria Las Vegas", type: "resort", zone: "core", setting: "indoor" },
      { id: "fourseasons", n: "Four Seasons Hotel Las Vegas", type: "resort", zone: "core", setting: "both" },
      { id: "resortsworld", n: "Resorts World Las Vegas", type: "resort", zone: "core", setting: "both" },
      { id: "mgm", n: "MGM Grand", type: "resort", zone: "core", setting: "both" },
      { id: "mandalay", n: "Mandalay Bay", type: "resort", zone: "core", setting: "both" },
      { id: "paris", n: "Paris Las Vegas", type: "resort", zone: "core", setting: "indoor" },
      { id: "circa", n: "Circa Resort and Casino", type: "resort", zone: "core", setting: "both" },
      { id: "redrockresort", n: "Red Rock Casino Resort and Spa", type: "resort", zone: "core", setting: "both" },
      { id: "gvr", n: "Green Valley Ranch Resort", type: "resort", zone: "core", setting: "both" },
      { id: "jwsummerlin", n: "JW Marriott Las Vegas Resort", type: "resort", zone: "core", setting: "both" },
      { id: "mresort", n: "M Resort Spa Casino", type: "resort", zone: "outer", setting: "both" },
      { id: "lakelv", n: "Lake Las Vegas resorts", type: "resort", zone: "outer", setting: "both" },
      { id: "lwchapel", n: "Little White Wedding Chapel", type: "chapel", zone: "core", setting: "indoor" },
      { id: "chapelflowers", n: "Chapel of the Flowers", type: "chapel", zone: "core", setting: "both" },
      { id: "graceland", n: "Graceland Wedding Chapel", type: "chapel", zone: "core", setting: "indoor" },
      { id: "littlechurch", n: "Little Church of the West", type: "chapel", zone: "core", setting: "indoor" },
      { id: "springs", n: "Springs Preserve", type: "outdoor", zone: "core", setting: "outdoor" },
      { id: "southernhighlands", n: "Southern Highlands Golf Club", type: "club", zone: "core", setting: "both" },
      { id: "tpc", n: "TPC Las Vegas", type: "club", zone: "core", setting: "both" },
      { id: "dragonridge", n: "DragonRidge Country Club", type: "club", zone: "core", setting: "both" },
      { id: "redrockcanyon", n: "Red Rock Canyon area", type: "outdoor", zone: "far", setting: "outdoor", desert: true },
      { id: "valleyfire", n: "Valley of Fire State Park", type: "outdoor", zone: "far", setting: "outdoor", desert: true },
      { id: "charleston", n: "Mount Charleston area", type: "outdoor", zone: "far", setting: "outdoor", desert: true },
      { id: "lakemead", n: "Lake Mead and Hoover Dam area", type: "outdoor", zone: "far", setting: "outdoor", desert: true },
      { id: "private", n: "Private home or estate", type: "private", zone: "core", setting: "both" }
    ],

    /* ---------- Capacity (one designer) ----------
     * The deploy version reads real bookings; these lists drive the preview.
     */
    capacity: {
      perDay: 1, perWeekend: 2,
      booked: [],        /* "YYYY-MM-DD" fully booked */
      limited: [],       /* "YYYY-MM-DD" one spot left */
      inDemandMonths: [3, 4, 5, 9, 10, 11]
    },

    /* ---------- Consultations ---------- */
    consult: {
      lengthMin: 45,
      days: { 2: ["10:00", "12:00", "15:00", "17:30"], 3: ["10:00", "12:00", "15:00", "17:30"], 4: ["10:00", "12:00", "15:00", "17:30"], 6: ["10:00", "11:30"] },
      leadDays: 2, horizonDays: 14,
      modes: ["Video call", "In person"]
    },

    /* ---------- Lead questions ---------- */
    lead: {
      deciders: ["Just the two of us", "Parents", "Our planner", "Someone else"],
      timing: [
        { key: "now", label: "Ready to book", pts: 2, why: "ready to book" },
        { key: "month", label: "Within a month", pts: 1, why: "deciding this month" },
        { key: "exploring", label: "Just exploring", pts: 0, why: "" }
      ]
    },

    /* ---------- Payment terms (shown to couples, enforced by the booking server) ----------
     * Every plan starts with the retainer. Everything is paid off balanceDaysBefore the wedding.
     * Edge cases: booked under designDaysBefore -> retainer + design payment combined at booking.
     *             booked under balanceDaysBefore -> paid in full at booking.
     */
    payments: {
      retainerPct: 0.30,
      designPct: 0.30,
      designDaysBefore: 90,
      balanceDaysBefore: 30,
      lockDaysBefore: 45,        /* final design and guest count */
      addUntilDaysBefore: 14,    /* pieces can still be added (billed separately) until this */
      monthlyMinGapDays: 14,     /* a monthly date closer than this to the final due date is folded into the final payment */
      reminderDaysBefore: 3,     /* autopay reminder */
      holdHours: 72,             /* date hold after a proposal is sent */
      noteAtHours: 48,           /* AmiDayne's follow-up note while the hold runs */
      fullPerk: { item: "anniv", name: "Complimentary first-anniversary flowers", line: "Pay in full today and your first-anniversary flowers are our gift." }
    },

    /* ---------- Booking (proposal, agreement, payment) ---------- */
    booking: {
      /* AmiDayne's follow-up note, sent 48 hours into the 72-hour hold if the couple has not booked. {first}, {date}, {hours} and {link} are filled in. */
      holdNote: "Hi {first}, I loved designing with you. I am still holding {date} for you for {hours} more hours. Your contract is right here whenever you are ready: {link}. If anything is on your mind, just reply and we will figure it out together. AmiDayne",
      /* Agreement terms, confirmed by NOVA and AmiDayne on 2026-10-15. Change agreementVersion whenever the wording changes. */
      agreementVersion: "2026-10-16",
      agreement: [
        { h: "Your date and your retainer", p: "Your date is reserved for your wedding only when this agreement is signed and your retainer is paid. The retainer is non-refundable because we turn away other weddings for your date." },
        { h: "Your price is locked", p: "The design level and total in this contract are locked. Final flower varieties are confirmed at your design lock {lock} days before your wedding. If a bloom is unavailable or not at its best, we substitute flowers of equal or greater value that keep your look, and we tell you before your wedding, never on the day." },
        { h: "Payments", p: "You choose a payment plan below. Every plan is paid in full {balance} days before your wedding. If you choose Standard or Monthly, you authorize AFUVAI Floral Society to charge the card or bank account you use today on each date shown, and we remind you {reminder} days before each charge." },
        { h: "Changes", p: "Your guest count and pieces can change until {lock} days before your wedding. Pieces can be added until {adds} days before, billed separately. Reductions after your design lock are not refunded, because flowers and rentals are already ordered." },
        { h: "Missed payments", p: "If a scheduled payment fails, we let you know right away and try again after three days. If a payment is more than ten days late, your date may be released, and payments already made are handled as described under cancellation." },
        { h: "Cancellation", p: "If you cancel, the retainer is kept. Payments beyond the retainer are refunded if you cancel more than 90 days before your wedding, refunded at 50% between 90 and 46 days, and not refunded within 45 days, because your flowers and rentals are ordered by then." },
        { h: "Moving your date", p: "You can move your wedding once to a date we have open within 12 months of your original date, and everything you have paid moves with it. Prices for a new season may be adjusted." },
        { h: "Venue rules", p: "We follow your venue's vendor rules. If your venue changes load-in, setup or breakdown times after you book, any added labor or late-night fees are billed at cost." },
        { h: "Rentals", p: "Vessels, stands, structures and candles stay the property of AFUVAI Floral Society. Items lost or damaged at the venue are billed at replacement cost." },
        { h: "Things outside anyone's control", p: "If severe weather, a venue closure or another event outside either party's control prevents your wedding, we apply everything you have paid to a new date within 12 months, or deliver the flowers we can for your original day." }
      ]
    },

    readiness: [
      { t: "Resort-ready logistics", d: "Dock load-ins, timed setup and late-night breakdown coordinated directly with your venue.", ifInsured: " Certificate of insurance provided ahead of load-in." },
      { t: "Fresh for the whole night", d: "Premium blooms sourced for your date and designed in the final days before it, so every piece holds through the last dance." },
      { t: "Heat-smart desert design", d: "Blooms chosen and staged to hold up at outdoor summer ceremonies." },
      { t: "A design board made for you", d: "Built from your selections before your consultation, so you see your wedding before you commit." },
      { t: "Allergy-aware on request", d: "Low-fragrance and low-pollen designs for guests and venues that need them." },
      { t: "One wedding at a time", d: "AmiDayne designs every wedding herself, so each weekend has a strict limit." }
    ],

    faq: [
      { q: "Is this a quote?", a: "It is a planning range built from our real recipes and Las Vegas wholesale costs. Your exact price comes in your custom contract after your consultation." },
      { q: "What happens after I send it?", a: "AmiDayne reviews your selections and builds a design board for you. At your consultation, by video or in person, you see your design, adjust anything, and leave with your contract. If you love it, you can reserve your date right there." },
      { q: "How do payments work?", a: "A 30% retainer reserves your date. Then choose what suits you: a 30% design payment 90 days before and the balance 30 days before, monthly payments, or pay in full and receive your first-anniversary flowers as our gift. Everything is paid 30 days before your wedding. Nothing is charged through this page." },
      { q: "Do we have to decide at the consultation?", a: "No. If you are ready, you can sign and reserve on the spot. If you want to think it over, we hold your date for 72 hours while you decide." },
      { q: "What if my flowers are out of season?", a: "We design with blooms of equal or greater value that keep your look, and we tell you before your contract, never on the day." },
      { q: "How far ahead should we book?", a: "Most couples book four to nine months out, and spring and fall Saturdays fill first. Shorter notice is often possible because our flower orders need about 14 days." },
      { q: "Do you work at resorts and outdoor venues?", a: "Yes. Strip resorts, chapels, private estates and desert locations. For outdoor summer weddings we use heat-hardy blooms and stage everything in shade until the last moment." },
      { q: "Can we change things later?", a: "Yes. Pieces and guest counts can change until 45 days before your wedding, and you can add pieces until 14 days before." }
    ]
  };

  if (typeof module !== "undefined" && module.exports) { module.exports = C; }
  else { root.AFUVAI_CONFIG = C; }
})(typeof self !== "undefined" ? self : this);
