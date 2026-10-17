/* AFUVAI Wedding Calculator — pricing engine (pure functions, no DOM).
 * Shared by the calculator, the admin panel and the server (Netlify Functions recompute every estimate).
 */
(function (root) {
  var E = {};

  E.clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  E.roundTo = function (n, to) { return Math.round(n / to) * to; };
  E.clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); };

  /* Deep-merge an admin override (pricing values and recipes) onto the base config. */
  E.mergeConfig = function (base, over) {
    var c = E.clone(base);
    if (!over) { return c; }
    if (over.pricing) {
      Object.keys(over.pricing).forEach(function (k) {
        var v = over.pricing[k];
        if (v && typeof v === "object" && !Array.isArray(v) && c.pricing[k] && typeof c.pricing[k] === "object") {
          Object.keys(v).forEach(function (kk) { c.pricing[k][kk] = v[kk]; });
        } else { c.pricing[k] = v; }
      });
    }
    if (over.candlePackage) { c.candlePackage = over.candlePackage; }
    if (over.items) {
      c.groups.forEach(function (g) {
        g.items.forEach(function (i) {
          var o = over.items[i.id];
          if (!o) { return; }
          if (o.r) { Object.keys(o.r).forEach(function (k) { i.r[k] = o.r[k]; }); }
          if (o.fixed) { i.fixed = o.fixed; }
          if (o.rent) { i.rent = o.rent; }
        });
      });
    }
    if (over.capacity) { Object.keys(over.capacity).forEach(function (k) { c.capacity[k] = over.capacity[k]; }); }
    return c;
  };

  E.itemMap = function (cfg) {
    var m = {};
    cfg.groups.forEach(function (g) { g.items.forEach(function (i) { m[i.id] = { item: i, group: g }; }); });
    return m;
  };

  /* Price one piece at tier t. Returns price plus the cost build-up for the margin view. */
  E.piece = function (cfg, item, t) {
    var P = cfg.pricing;
    var rent = item.rent ? item.rent[t] : 0;
    if (item.fixed) {
      return { price: item.fixed[t], flowers: null, hardgoods: null, labor: null, cost: null, rent: rent, fixed: true };
    }
    var r = item.r, w = 0;
    ["f", "a", "x", "g"].forEach(function (k) { w += (r[k] ? r[k][t] : 0) * P.stemCost[k][t]; });
    var hg = r.hg ? r.hg[t] : 0, mins = r.min ? r.min[t] : 0;
    var raw = w * P.flowerMarkup + hg * P.hardgoodsMarkup + (mins / 60) * P.laborRate;
    var price = E.roundTo(raw, P.roundTo);
    var laborCost = (mins / 60) * P.laborCostRate;
    return { price: price, flowers: w, hardgoods: hg, labor: laborCost, cost: w + hg + laborCost, rent: rent, stems: (r.f[t] + r.a[t] + r.x[t] + r.g[t]) };
  };

  E.packageFor = function (cfg, guests) {
    for (var i = 0; i < cfg.packages.length; i++) { if (guests <= cfg.packages[i].maxGuests) { return cfg.packages[i].key; } }
    return "grand";
  };

  E.style = function (cfg, key) {
    for (var i = 0; i < cfg.styles.length; i++) { if (cfg.styles[i].key === key) { return cfg.styles[i]; } }
    return cfg.styles[0];
  };

  /* Suggested pieces for a guest count, package and style. */
  E.autofill = function (cfg, guests, pkg, styleKey) {
    var q = {};
    cfg.groups.forEach(function (g) { g.items.forEach(function (i) { q[i.id] = 0; }); });
    var g = Math.max(2, guests | 0), st = E.style(cfg, styleKey);
    var split = function (tables) {
      var tall = Math.round(tables * st.tallShare);
      q.cptall = tall; q.cplow = tables - tall;
    };
    if (pkg === "elopement") {
      q.bride = 1; q.bout = 1;
      q.cors = g >= 6 ? 2 : 0;
      q.cplow = g >= 10 ? Math.ceil(g / 10) : 0;
    } else if (pkg === "intimate") {
      q.bride = 1; q.maid = 2; q.bout = 4; q.cors = 2;
      q.cerground = 2; q.welcome = 1; q.bar = 1; q.sweet = 1; q.cake = 1;
      split(Math.ceil(g / 8));
    } else if (pkg === "grand") {
      q.bride = 1; q.maid = E.clamp(Math.round(g / 28), 5, 8); q.bout = q.maid + 3; q.cors = 4;
      q.arch = 1; q.aisle = 8; q.cerground = 2; q.welcome = 1; q.escort = 1;
      q.bar = Math.ceil(g / 50); q.sweet = 1; q.cake = 1; q.wall = 1;
      split(Math.ceil(g / 10));
    } else {
      q.bride = 1; q.maid = E.clamp(Math.round(g / 24), 3, 6); q.bout = q.maid + 2; q.cors = 3;
      q.arch = 1; q.aisle = g >= 100 ? 6 : 4; q.welcome = 1; q.escort = 1;
      q.bar = Math.ceil(g / 50); q.sweet = 1; q.cake = 1;
      split(Math.ceil(g / 10));
    }
    return q;
  };

  /* ---------- Dates ---------- */
  E.parseDate = function (s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) { return null; }
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  };
  E.iso = function (d) {
    var m = d.getMonth() + 1, dd = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (dd < 10 ? "0" : "") + dd;
  };
  E.addDays = function (d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; };

  E.dateInfo = function (cfg, s, today) {
    var d = E.parseDate(s);
    if (!d) { return null; }
    var t = today ? new Date(today.getFullYear(), today.getMonth(), today.getDate()) : (function () { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
    var days = Math.round((d - t) / 86400000);
    var m = d.getMonth() + 1;
    var season = (m === 12 || m <= 2) ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "fall";
    var md = (m < 10 ? "0" : "") + m + "-" + (d.getDate() < 10 ? "0" : "") + d.getDate();
    var peak = null;
    cfg.pricing.peakDates.forEach(function (p) {
      var hit = p.from <= p.to ? (md >= p.from && md <= p.to) : (md >= p.from || md <= p.to);
      if (hit) { peak = p; }
    });
    return { date: d, days: days, month: m, season: season, peak: peak, dow: d.getDay() };
  };

  E.availability = function (cfg, s, today) {
    var info = E.dateInfo(cfg, s, today);
    if (!info) { return null; }
    if (info.days < 0) { return { status: "past", label: "That date has passed. Check the year." }; }
    var cap = cfg.capacity;
    if (cap.booked.indexOf(s) > -1) { return { status: "booked", label: "This date is fully booked. Send your request and we will add you to the waitlist." }; }
    if (info.days < 14) { return { status: "short", label: "Under two weeks away. Our flower orders need about 14 days, so send your request today and we will tell you what is possible." }; }
    if (cap.limited.indexOf(s) > -1) { return { status: "limited", label: "One spot left on this date." }; }
    if (info.dow === 6 && cap.inDemandMonths.indexOf(info.month) > -1) { return { status: "demand", label: "Your date is open. Spring and fall Saturdays book first." }; }
    if (info.days < 45) { return { status: "open", label: "Your date is open. Short notice works, so send your request soon." }; }
    return { status: "open", label: "Your date is open." };
  };

  /* ---------- Venue ---------- */
  E.venue = function (cfg, state) {
    if (state.venueId && state.venueId !== "custom") {
      for (var i = 0; i < cfg.venues.length; i++) { if (cfg.venues[i].id === state.venueId) { return cfg.venues[i]; } }
    }
    var c = state.venueCustom || {};
    return { id: "custom", n: c.name || "", type: c.type || "private", zone: c.zone || "core", setting: c.setting || "both", desert: c.zone === "far" };
  };
  E.isOutdoor = function (cfg, state) {
    if (state.setting === "outdoor" || state.setting === "mixed") { return true; }
    if (state.setting === "indoor") { return false; }
    return E.venue(cfg, state).setting === "outdoor";
  };

  /* ---------- The estimate ---------- */
  E.calc = function (cfg, state, t) {
    var P = cfg.pricing, im = E.itemMap(cfg), q = state.qty || {};
    var lines = [], groups = {}, florals = 0, keepsakes = 0, rentals = 0, units = 0, candleTables = 0, cost = 0;
    var priceOf = function (id) { return im[id] ? E.piece(cfg, im[id].item, t).price : 0; };
    var reuse = { sweet: 0, bar: 0, fee: 0 };
    if (state.reuse) {
      if ((q.arch || 0) > 0 && (q.sweet || 0) > 0) { reuse.sweet = 1; }
      reuse.bar = Math.min(q.aisle || 0, q.bar || 0);
      if (reuse.sweet || reuse.bar) { reuse.fee = P.reuseMoveFee; }
    }
    cfg.groups.forEach(function (g) {
      g.items.forEach(function (i) {
        var n = q[i.id] || 0;
        if (n <= 0) { return; }
        var pc = E.piece(cfg, i, t);
        var charged = n;
        if (i.id === "sweet" && reuse.sweet) { charged = Math.max(0, n - 1); }
        if (i.id === "bar" && reuse.bar) { charged = Math.max(0, n - reuse.bar); }
        var amt = charged * pc.price;
        var line = { id: i.id, nm: i.nm, q: n, unit: pc.price, amt: amt, group: g.key, moved: n - charged };
        lines.push(line);
        if (i.service) { keepsakes += amt; } else { florals += amt; }
        groups[g.key] = (groups[g.key] || 0) + amt;
        rentals += n * (pc.rent || 0);
        units += n * (i.truck || 0);
        if (i.candles) { candleTables += n; }
        if (pc.cost != null) { cost += charged * pc.cost; }
        else if (!i.service) { cost += amt * (1 - P.marginTarget); }
      });
    });
    var empty = !lines.length;
    var candles = candleTables * cfg.candlePackage[t];
    rentals += candles;
    var info = E.dateInfo(cfg, state.date);
    var venue = E.venue(cfg, state);
    var zone = P.zones[venue.zone] || P.zones.core;
    var fees = [];
    var peak = info && info.peak && florals ? Math.round(florals * info.peak.pct) : 0;
    var production = florals ? Math.max(P.productionMin, Math.round(florals * P.productionPct)) : 0;
    if (reuse.fee) { production += reuse.fee; }
    var delivery = empty ? 0 : zone.delivery;
    var loads = Math.max(1, Math.ceil(units / P.truckCapacity));
    var trips = empty ? 0 : (loads - 1) * P.extraTripFee;
    var isResort = venue.type === "resort";
    var loadIn = (!empty && isResort) ? P.resortLoadIn : 0;
    var strike = (!empty && state.strike !== false && rentals > 0) ? (isResort ? P.strike.resortLateNight : P.strike.standard) : 0;
    var outdoor = E.isOutdoor(cfg, state);
    var heat = (!empty && outdoor && info && P.heat.months.indexOf(info.month) > -1) ? Math.round(P.heat.flat + florals * P.heat.pct) : 0;
    var windy = venue.desert && ((q.arch || 0) + (q.aisle || 0) + (q.cerground || 0) + (q.petals || 0) > 0);
    var wind = (!empty && windy) ? P.wind.fee : 0;
    var pkg = state.pkg || E.packageFor(cfg, state.guests || 0);
    var minimum = P.minimums[pkg] || 0;
    var design = florals + peak + rentals;
    var minAdj = (!empty && florals && design < minimum) ? Math.round(minimum - design) : 0;
    if (peak) { fees.push({ k: "peak", nm: info.peak.name + " flower premium", amt: peak }); }
    if (rentals) { fees.push({ k: "rentals", nm: "Rentals: vessels, stands, structures and candles", amt: rentals }); }
    if (production) { fees.push({ k: "production", nm: reuse.fee ? "Production and installation, including moving ceremony pieces" : "Production and installation", amt: production }); }
    if (delivery) { fees.push({ k: "delivery", nm: "Delivery and setup team", amt: delivery }); }
    if (trips) { fees.push({ k: "trips", nm: "Additional delivery trip" + (loads - 1 > 1 ? "s (" + (loads - 1) + ")" : ""), amt: trips }); }
    if (loadIn) { fees.push({ k: "loadin", nm: "Resort load-in and timed setup", amt: loadIn }); }
    if (strike) { fees.push({ k: "strike", nm: isResort ? "Late-night breakdown and haul-away" : "Breakdown and haul-away", amt: strike }); }
    if (heat) { fees.push({ k: "heat", nm: "Outdoor heat care: hydration and shade staging", amt: heat }); }
    if (wind) { fees.push({ k: "wind", nm: "Desert wind anchoring", amt: wind }); }
    if (minAdj) { fees.push({ k: "minimum", nm: "Design minimum for this collection", amt: minAdj }); }
    var feeSum = 0; fees.forEach(function (f) { feeSum += f.amt; });
    var pretax = florals + keepsakes + feeSum;
    var tax = Math.round((florals + peak + rentals + minAdj) * P.taxRate);
    var total = pretax + tax;
    var guests = Math.max(1, state.guests || 1);
    var directCost = cost + rentals * 0.35 + delivery * 0.5 + trips * 0.5 + strike * 0.5;
    return {
      tier: t, empty: empty, lines: lines, groups: groups, florals: florals, keepsakes: keepsakes, fees: fees, feeSum: feeSum,
      pretax: pretax, tax: tax, total: total,
      low: E.roundTo(total * P.rangeLow, 50), high: E.roundTo(total * P.rangeHigh, 50),
      perGuest: Math.round(pretax / guests), units: Math.round(units * 10) / 10, loads: empty ? 0 : loads,
      minimum: minimum, minAdj: minAdj, outdoor: outdoor, venue: venue, info: info,
      reuseSavings: (reuse.sweet ? priceOf("sweet") : 0) + reuse.bar * priceOf("bar") - reuse.fee,
      margin: pretax ? (pretax - directCost) / pretax : 0
    };
  };

  E.calcAll = function (cfg, state) { return cfg.tiers.map(function (_, t) { return E.calc(cfg, state, t); }); };

  /* ---------- Payment plans ----------
   * plans(cfg, total, weddingDate, bookedOn, perkAmt) -> { standard, monthly, full } (a plan is null when not offered).
   * Every plan is paid off cfg.payments.balanceDaysBefore the wedding.
   *   standard: 30% now, 30% at 90 days out, 40% at 30 days out.
   *             Booked under 90 days out: 60% now, 40% at 30 days out.
   *   monthly:  30% now, the rest in equal monthly payments; the last one lands on the final due date.
   *             Offered only when at least two monthly payments fit.
   *   full:     everything now, with the pay-in-full gift (perkAmt is taken off when the gift is already in the order).
   *   Booked under 30 days out: only "full" is offered.
   */
  E.addMonths = function (d, n) {
    var y = d.getFullYear(), m = d.getMonth() + n, day = d.getDate();
    var last = new Date(y, m + 1, 0).getDate();
    return new Date(y, m, Math.min(day, last));
  };
  E.dayStart = function (d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
  E.plans = function (cfg, total, dateStr, bookedOn, perkAmt) {
    var P = cfg.payments, wd = E.parseDate(dateStr);
    var today = E.dayStart(bookedOn || new Date());
    total = Math.round(total); perkAmt = Math.round(perkAmt || 0);
    var out = { standard: null, monthly: null, full: null, finalDue: null, designDue: null, lockDate: null, days: null, rule: "" };
    var pay = function (key, label, amt, due, now) { return { key: key, label: label, amt: Math.round(amt), due: E.iso(due), now: !!now }; };
    out.full = { key: "full", name: "Pay in full", perk: P.fullPerk ? P.fullPerk.name : "", total: total - perkAmt, payments: [pay("full", "Paid in full", total - perkAmt, today, true)] };
    if (!wd) { return out; }
    var days = Math.round((E.dayStart(wd) - today) / 86400000);
    var finalDue = E.addDays(wd, -P.balanceDaysBefore), designDue = E.addDays(wd, -P.designDaysBefore);
    out.days = days; out.finalDue = E.iso(finalDue); out.designDue = E.iso(designDue); out.lockDate = E.iso(E.addDays(wd, -P.lockDaysBefore));
    if (days < P.balanceDaysBefore) { out.rule = "under" + P.balanceDaysBefore; return out; }
    var ret = Math.round(total * P.retainerPct), des = Math.round(total * P.designPct);
    if (days >= P.designDaysBefore) {
      out.standard = { key: "standard", name: "Standard", total: total, payments: [
        pay("retainer", "Retainer", ret, today, true),
        pay("design", "Design payment", des, designDue),
        pay("balance", "Balance", total - ret - des, finalDue)
      ] };
    } else {
      out.rule = "under" + P.designDaysBefore;
      out.standard = { key: "standard", name: "Standard", total: total, payments: [
        pay("retainer", "Retainer and design payment", ret + des, today, true),
        pay("balance", "Balance", total - ret - des, finalDue)
      ] };
    }
    var dates = [], k = 1, d;
    while ((d = E.addMonths(today, k)) && Math.round((finalDue - d) / 86400000) >= P.monthlyMinGapDays) { dates.push(d); k++; }
    dates.push(finalDue);
    if (dates.length >= 2) {
      var rest = total - ret, each = Math.floor(rest / dates.length), list = [pay("retainer", "Retainer", ret, today, true)];
      dates.forEach(function (dd, i) { list.push(pay("m" + (i + 1), "Payment " + (i + 1) + " of " + dates.length, i === dates.length - 1 ? rest - each * (dates.length - 1) : each, dd)); });
      out.monthly = { key: "monthly", name: "Monthly", total: total, count: dates.length, each: each, payments: list };
    }
    return out;
  };
  /* Kept for older callers: retainer and the final due date. */
  E.payments = function (cfg, total, dateStr) {
    var pl = E.plans(cfg, total, dateStr), d = E.parseDate(dateStr), first = pl.standard || pl.full;
    return { retainer: first.payments[0].amt, balance: total - first.payments[0].amt,
      balanceDue: d ? E.addDays(d, -cfg.payments.balanceDaysBefore) : null, lockDate: d ? E.addDays(d, -cfg.payments.lockDaysBefore) : null };
  };
  /* Price of the pay-in-full gift when it is already in the order at tier t (so it can be taken off). */
  E.perkCredit = function (cfg, state, t) {
    var P = cfg.payments.fullPerk, im = E.itemMap(cfg);
    if (!P || !im[P.item] || !(state.qty && state.qty[P.item] > 0)) { return 0; }
    return E.piece(cfg, im[P.item].item, t).price;
  };

  /* ---------- Ways to reach a budget (design changes only, never discounts) ---------- */
  E.tips = function (cfg, state, t) {
    var base = E.calc(cfg, state, t).total, out = [];
    var tryIt = function (label, change, note) {
      var s = E.clone(state);
      change(s);
      var tt = s.tier != null ? s.tier : t;
      var after = E.calc(cfg, s, tt).total;
      var save = Math.round((base - after) / 10) * 10;
      if (save >= 50) { out.push({ label: label, note: note || "", save: save, state: s }); }
    };
    var q = state.qty || {};
    if (t > 0) { tryIt("Design it at the " + cfg.tiers[t - 1].name + " level", function (s) { s.tier = t - 1; }, "Same pieces, different bloom mix."); }
    if ((q.cptall || 0) >= 2) {
      var n = Math.floor(q.cptall / 2);
      tryIt("Make " + n + " of your tall centerpieces low", function (s) { s.qty.cptall -= n; s.qty.cplow = (s.qty.cplow || 0) + n; }, "Alternating heights still reads as full.");
    }
    if (!state.reuse && (((q.arch || 0) && (q.sweet || 0)) || ((q.aisle || 0) && (q.bar || 0)))) {
      tryIt("Move your ceremony pieces to the reception", function (s) { s.reuse = true; }, "Your arch florals become the sweetheart table, aisle pieces dress the bar.");
    }
    if ((q.aisle || 0) >= 6) {
      tryIt("Line every other row of the aisle", function (s) { s.qty.aisle = Math.ceil(s.qty.aisle / 2); }, "Add petals between for the same effect.");
    }
    if ((q.wall || 0) && (q.arch || 0)) {
      tryIt("Use your ceremony arch as the photo backdrop", function (s) { s.qty.wall = 0; }, "We move it after the ceremony instead of building a wall.");
    }
    out.sort(function (a, b) { return b.save - a.save; });
    return out.slice(0, 3);
  };

  /* ---------- Design board: blooms for the date, colors, tier and style ---------- */
  E.board = function (cfg, state, t) {
    var info = E.dateInfo(cfg, state.date), st = E.style(cfg, state.style);
    var colors = (state.colors && state.colors.length) ? state.colors : st.palette;
    var loves = [], nevers = [];
    Object.keys(state.flowers || {}).forEach(function (k) { if (state.flowers[k] === 1) { loves.push(k); } else if (state.flowers[k] === -1) { nevers.push(k); } });
    var hot = info && E.isOutdoor(cfg, state) && cfg.pricing.heat.months.indexOf(info.month) > -1;
    var scored = [];
    cfg.blooms.forEach(function (b) {
      if (nevers.indexOf(b.n) > -1 || b.green) { return; }
      if (b.lvl > t && loves.indexOf(b.n) < 0) { return; }
      if (info && b.m.indexOf(info.month) < 0) { return; }
      var match = b.c.filter(function (c) { return colors.indexOf(c) > -1; });
      if (!match.length && loves.indexOf(b.n) < 0) { return; }
      var s = match.length * 2 + (st.favor.indexOf(b.n) > -1 ? 3 : 0) + (b.lvl === t ? 1.5 : 0) + (loves.indexOf(b.n) > -1 ? 10 : 0) + (hot && b.heat ? 3 : 0) - (hot && !b.heat ? 1 : 0);
      scored.push({ n: b.n, s: s, colors: match.length ? match : b.c.slice(0, 2), heat: b.heat });
    });
    scored.sort(function (a, b) { return b.s - a.s; });
    var greens = cfg.blooms.filter(function (b) { return b.green && nevers.indexOf(b.n) < 0 && (b.lvl <= t); }).map(function (b) { return b.n; });
    if (st.key === "boho" && greens.indexOf("Olive branch") > -1) { greens.unshift("Olive branch"); }
    var outOfSeason = [];
    if (info) {
      loves.forEach(function (n) {
        var b = cfg.blooms.filter(function (x) { return x.n === n; })[0];
        if (b && b.m.indexOf(info.month) < 0) { outOfSeason.push({ n: n, sub: cfg.substitutes[n] || "a bloom of equal value with the same feel" }); }
      });
    }
    return { blooms: scored.slice(0, 6), greens: greens.filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 2), colors: colors, outOfSeason: outOfSeason, hot: !!hot, season: info ? info.season : null, nevers: nevers };
  };

  /* ---------- Lead score (for Ami's alerts) ---------- */
  E.leadScore = function (cfg, state, res) {
    var r = res[state.tier != null ? state.tier : 1], pts = 0, why = [];
    if (r.total >= 20000) { pts += 3; why.push("$20K+ estimate"); } else if (r.total >= 12000) { pts += 2; why.push("$12K+ estimate"); } else if (r.total >= 6000) { pts += 1; }
    var info = E.dateInfo(cfg, state.date);
    if (info) {
      if (info.days >= 90 && info.days <= 365) { pts += 2; why.push("ideal lead time"); }
      else if (info.days >= 14) { pts += 1; why.push(info.days < 90 ? "soon" : "far out"); }
    }
    if ((state.guests || 0) >= 150) { pts += 1; why.push("150+ guests"); }
    if (E.venue(cfg, state).type === "resort") { pts += 1; why.push("resort venue"); }
    if (state.budget && state.budget >= r.low) { pts += 1; why.push("budget fits"); }
    if (state.contact && state.contact.phone) { pts += 1; }
    if (state.consult) { pts += 2; why.push("booked a consultation"); }
    var tm = (cfg.lead && cfg.lead.timing || []).filter(function (x) { return x.key === state.timing; })[0];
    if (tm && tm.pts) { pts += tm.pts; if (tm.why) { why.push(tm.why); } }
    if (state.deciders && state.deciders.some(function (d) { return d !== "Just the two of us"; })) { why.push("decides with " + state.deciders.filter(function (d) { return d !== "Just the two of us"; }).join(" and ").toLowerCase()); }
    return { points: pts, label: pts >= 7 ? "Hot" : pts >= 4 ? "Warm" : "Cool", why: why };
  };

  /* ---------- Consultation slots ---------- */
  E.consultSlots = function (cfg, now, busy) {
    var c = cfg.consult, out = [], start = E.addDays(new Date(now.getFullYear(), now.getMonth(), now.getDate()), c.leadDays);
    busy = busy || [];
    for (var i = 0; i < c.horizonDays && out.length < 12; i++) {
      var d = E.addDays(start, i), times = c.days[d.getDay()];
      if (!times) { continue; }
      times.forEach(function (hm) {
        var p = hm.split(":"), s = new Date(d.getFullYear(), d.getMonth(), d.getDate(), +p[0], +p[1]);
        var e = new Date(s.getTime() + c.lengthMin * 60000);
        var clash = busy.some(function (b) { return new Date(b.start) < e && new Date(b.end) > s; });
        if (!clash) { out.push({ start: s.toISOString(), local: E.iso(d) + "T" + hm }); }
      });
    }
    return out;
  };

  /* ---------- State (shared by page, links and server) ---------- */
  E.defaultState = function (cfg) {
    var g = 120, pkg = "classic", style = "garden";
    return {
      date: "", guests: g, pkg: pkg, pkgAuto: true, style: style, colors: [], flowers: {}, inspo: "",
      qty: E.autofill(cfg, g, pkg, style), touched: false,
      venueId: "", venueCustom: { name: "", zone: "core", setting: "both" }, setting: "", strike: true, reuse: false,
      budget: 0, tier: cfg.defaultTier, purseText: "", consult: null, consultMode: cfg.consult.modes[0]
    };
  };
  E.pack = function (s) {
    var q = {}; Object.keys(s.qty).forEach(function (k) { if (s.qty[k]) { q[k] = s.qty[k]; } });
    return { v: 1, d: s.date, g: s.guests, p: s.pkg, pa: s.pkgAuto ? 1 : 0, st: s.style, c: s.colors, f: s.flowers, q: q, tc: s.touched ? 1 : 0,
      vi: s.venueId, vc: s.venueCustom, se: s.setting, sk: s.strike ? 1 : 0, ru: s.reuse ? 1 : 0, b: s.budget, t: s.tier, pt: s.purseText, i: s.inspo };
  };
  E.unpack = function (cfg, o) {
    var s = E.defaultState(cfg), colors = {};
    cfg.colors.forEach(function (c) { colors[c[0]] = 1; });
    if (!o || o.v !== 1) { return s; }
    s.date = typeof o.d === "string" ? o.d : ""; s.guests = E.clamp(+o.g || s.guests, 2, 1000); s.pkg = o.p || s.pkg; s.pkgAuto = !!o.pa; s.style = o.st || s.style;
    s.colors = (o.c || []).filter(function (c) { return colors[c]; }); s.flowers = (o.f && typeof o.f === "object") ? o.f : {};
    var q = {}, im = E.itemMap(cfg); Object.keys(im).forEach(function (k) { q[k] = 0; });
    Object.keys(o.q || {}).forEach(function (k) { if (k in q) { q[k] = E.clamp(+o.q[k] || 0, 0, 300); } });
    s.qty = q; s.touched = !!o.tc; s.venueId = o.vi || ""; s.venueCustom = o.vc || s.venueCustom; s.setting = o.se || "";
    s.strike = o.sk !== 0; s.reuse = !!o.ru; s.budget = +o.b || 0; s.tier = (o.t >= 0 && o.t <= 2) ? o.t : cfg.defaultTier; s.purseText = o.pt || ""; s.inspo = o.i || "";
    return s;
  };
  /* "auto" = live API on the real site, preview mode anywhere else */
  E.apiBase = function (cfg, loc) {
    var a = cfg.integrations.apiBase || "";
    if (a !== "auto") { return a.replace(/\/$/, ""); }
    var host = (loc && loc.hostname) || "";
    return /(^|\.)afuvai\.com$|\.netlify\.app$/.test(host) ? "/api" : "";
  };

  E.bookingBase = function (cfg, loc) {
    var a = (cfg.integrations && cfg.integrations.bookingApi) || "";
    if (a !== "auto") { return a.replace(/\/$/, ""); }
    var host = (loc && loc.hostname) || "";
    if (/(^|\.)afuvai\.com$|\.vercel\.app$/.test(host)) { return "/api/weddings"; }
    return /\.netlify\.app$/.test(host) ? "/api" : "";
  };

  /* ---------- Proposal (frozen at the consultation: the price lock) ---------- */
  E.makeProposal = function (cfg, state, o) {
    var t = state.tier, r = E.calc(cfg, state, t), now = o.now ? new Date(o.now) : new Date();
    var adj = Math.round(+((o.adj && o.adj.amt) || 0));
    var adjTax = adj ? Math.max(-r.tax, Math.round(adj * cfg.pricing.taxRate)) : 0; /* a discount can remove the tax, never make it negative */
    var total = r.total + adj + adjTax;
    var perk = E.perkCredit(cfg, state, t);
    var venue = E.venue(cfg, state);
    return {
      v: 1, ref: o.ref || ("AFV-" + (state.date ? state.date.replace(/-/g, "").slice(2) : "TBD") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase()),
      created: now.toISOString(), holdUntil: new Date(now.getTime() + cfg.payments.holdHours * 3600000).toISOString(),
      couple: o.couple || {}, note: o.note || "", state: E.pack(state),
      tierKey: cfg.tiers[t].key, tierName: cfg.tiers[t].name, date: state.date, guests: state.guests,
      venue: venue.n || "", style: E.style(cfg, state.style).name,
      lines: r.lines.map(function (l) { return { nm: l.nm, q: l.q, amt: l.amt, group: l.group, moved: l.moved }; }),
      groups: cfg.groups.filter(function (g) { return r.groups[g.key]; }).map(function (g) { return { key: g.key, title: g.title, amt: r.groups[g.key] }; }),
      fees: r.fees.slice(), adj: adj ? { label: (o.adj.label || "Custom design adjustment"), amt: adj } : null,
      tax: r.tax + adjTax, total: total, perkCredit: perk,
      agreementVersion: cfg.booking ? cfg.booking.agreementVersion : "", status: "sent"
    };
  };

  if (typeof module !== "undefined" && module.exports) { module.exports = E; }
  else { root.AFUVAI_ENGINE = E; }
})(typeof self !== "undefined" ? self : this);
