/* AFUVAI Wedding Calculator — page behavior. */
(function () {
  "use strict";
  var BASE = window.AFUVAI_CONFIG, E = window.AFUVAI_ENGINE, BQ = window.AFUVAI_BOUQUET;
  var LS = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  var cfg = E.mergeConfig(BASE, LS.get("afuvai_pricing_override"));
  var API = E.apiBase(cfg, location);
  var BOOK = E.bookingBase(cfg, location);
  var PREVIEW = !API;
  var $ = function (id) { return document.getElementById(id); };
  var money = function (n) { n = Math.round(n); return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US"); };
  var rng = function (r) { return money(r.low) + " – " + money(r.high); };
  var COLORS = {}; cfg.colors.forEach(function (c) { COLORS[c[0]] = c[1]; });
  var ITEMS = E.itemMap(cfg);
  var KEEP = [];
  cfg.groups.forEach(function (g) { if (g.key === "weekend" || g.key === "keepsakes") { g.items.forEach(function (i) { KEEP.push(i.id); }); } });
  KEEP.push("purse");
  var TYPE_LABEL = { resort: "Resort", chapel: "Chapel", club: "Club and estate", outdoor: "Outdoor", private: "Private" };
  var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var fmtDate = function (d) { return d ? DOW[d.getDay()] + ", " + MON[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() : ""; };
  var fmtTime = function (hm) { var p = hm.split(":"), h = +p[0]; return (h % 12 || 12) + ":" + p[1] + (h < 12 ? " AM" : " PM"); };

  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) { Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (k === "class") { n.className = v; } else if (k === "text") { n.textContent = v; } else if (k === "html") { n.innerHTML = v; }
      else if (k.slice(0, 2) === "on") { n.addEventListener(k.slice(2), v); } else if (v === true) { n.setAttribute(k, ""); } else if (v !== false && v != null) { n.setAttribute(k, v); }
    }); }
    (kids || []).forEach(function (c) { if (c != null) { n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); } });
    return n;
  }

  /* ---------- State ---------- */
  function defaultState() { return E.defaultState(cfg); }
  function pack(s) { return E.pack(s); }
  function unpack(o) { return E.unpack(cfg, o); }
  function b64e(str) { return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function b64d(str) { str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) { str += "="; } return decodeURIComponent(escape(atob(str))); }
  /* Link hash: "#e.<estimate>" for couples; Consult Mode adds "~c.<contact>~consult" (works where query strings are stripped). */
  function hashPart(prefix) { var parts = location.hash.slice(1).split("~"); for (var i = 0; i < parts.length; i++) { if (parts[i].indexOf(prefix) === 0) { return parts[i].slice(prefix.length); } } return ""; }
  function shareUrl() { return location.href.split("#")[0] + "#e." + b64e(JSON.stringify(pack(state))); }

  var state = (function () {
    try { var ep = hashPart("e."); if (ep) { return unpack(JSON.parse(b64d(ep))); } } catch (e) { /* bad link */ }
    var saved = LS.get("afuvai_estimate");
    return saved ? unpack(saved) : defaultState();
  })();
  var contact = LS.get("afuvai_contact") || {};
  var flags = { showAll: false, submitted: false, captured: !!contact.captured, loaded: Date.now() };
  var params = (function () { try { return new URLSearchParams(location.search); } catch (e) { return { get: function () { return null; } }; } })();
  var source = { ref: params.get("ref") || "", utm_source: params.get("utm_source") || "", utm_medium: params.get("utm_medium") || "", utm_campaign: params.get("utm_campaign") || "" };
  var CONSULT = params.get("consult") != null || location.hash.slice(1).split("~").indexOf("consult") > -1;
  var lead = { deciders: (contact.deciders || []).slice(), timing: contact.timing || "" };
  var consultContact = (function () { try { var c = params.get("c") || hashPart("c."); return c ? JSON.parse(b64d(c)) : null; } catch (e) { return null; } })();

  function save() { LS.set("afuvai_estimate", pack(state)); }

  /* ---------- Analytics ---------- */
  var seen = {};
  function track(name, props) {
    try {
      window.dataLayer = window.dataLayer || []; window.dataLayer.push(Object.assign({ event: "afuvai_" + name }, props || {}));
      if (window.plausible) { window.plausible(name, { props: props || {} }); }
      if (window.clarity) { window.clarity("event", name); }
    } catch (e) { /* analytics optional */ }
  }
  function trackOnce(name, props) { if (!seen[name]) { seen[name] = 1; track(name, props); } }

  /* ---------- Step 1 ---------- */
  function setGuests(v) {
    v = E.clamp(Math.round(+v || 0), 2, 1000);
    state.guests = v; $("guests").value = v;
    if (state.pkgAuto) { state.pkg = E.packageFor(cfg, v); }
    if (!state.touched) { refill(); }
    renderPkgs(); update();
  }
  function refill() {
    var keep = {}; KEEP.forEach(function (id) { keep[id] = state.qty[id] || 0; });
    state.qty = E.autofill(cfg, state.guests, state.pkg, state.style);
    Object.keys(keep).forEach(function (id) { if (keep[id]) { state.qty[id] = keep[id]; } });
    state.touched = false;
    syncPieces();
  }
  function renderPkgs() {
    var host = $("pkgs"); host.innerHTML = "";
    cfg.packages.forEach(function (p) {
      host.appendChild(h("button", { type: "button", class: "pkg", "aria-pressed": state.pkg === p.key ? "true" : "false", onclick: function () {
        state.pkg = p.key; state.pkgAuto = false; refill(); renderPkgs(); update(); track("collection", { pkg: p.key });
      } }, [h("b", { text: p.name }), h("span", { text: p.range }), (state.pkgAuto && state.pkg === p.key) ? h("em", { text: "Suggested" }) : null]));
    });
  }
  function renderDate() {
    var a = E.availability(cfg, state.date), el = $("dateStatus");
    el.className = "status " + (a ? a.status : "");
    el.lastChild.textContent = a ? a.label : "Add your date to check availability.";
    if (a && (BOOK || API) && state.date) { /* live capacity check */
      fetch((BOOK || API) + "/availability?date=" + encodeURIComponent(state.date)).then(function (r) { return r.json(); }).then(function (j) {
        if (j && j.label && state.date) { el.className = "status " + j.status; el.lastChild.textContent = j.label; }
      }).catch(function () {});
    }
  }

  /* ---------- Step 2 ---------- */
  function renderStyles() {
    var host = $("styles"); host.innerHTML = "";
    cfg.styles.forEach(function (st) {
      var strip = h("span", { class: "strip", "aria-hidden": "true" }, st.palette.map(function (c) { return h("i", { style: "background:" + COLORS[c] }); }));
      host.appendChild(h("button", { type: "button", class: "style", "aria-pressed": state.style === st.key ? "true" : "false", onclick: function () {
        state.style = st.key; if (!state.touched) { refill(); } renderStyles(); update(); track("style", { style: st.key });
      } }, [strip, h("b", { text: st.name }), h("span", { text: st.line })]));
    });
  }
  function renderColors() {
    var host = $("colors"); host.innerHTML = "";
    cfg.colors.forEach(function (c) {
      var on = state.colors.indexOf(c[0]) > -1;
      host.appendChild(h("button", { type: "button", class: "sw", "aria-pressed": on ? "true" : "false", onclick: function () {
        var k = state.colors.indexOf(c[0]); if (k > -1) { state.colors.splice(k, 1); } else { state.colors.push(c[0]); }
        renderColors(); update();
      } }, [h("i", { style: "background:" + c[1] }), h("span", { text: c[0] })]));
    });
  }
  function renderFavs() {
    var host = $("favs"); host.innerHTML = "";
    cfg.favoriteChips.forEach(function (n) {
      var v = state.flowers[n] || 0;
      host.appendChild(h("button", { type: "button", class: "chip" + (v === 1 ? " love" : v === -1 ? " never" : ""), "aria-label": n + (v === 1 ? ", favorite" : v === -1 ? ", never" : ""), onclick: function () {
        var cur = state.flowers[n] || 0, nx = cur === 0 ? 1 : cur === 1 ? -1 : 0;
        if (nx) { state.flowers[n] = nx; } else { delete state.flowers[n]; }
        renderFavs(); update();
      } }, [n, v === 1 ? h("small", { text: "favorite" }) : v === -1 ? h("small", { text: "never" }) : null]));
    });
  }

  /* ---------- Step 3 ---------- */
  var WEEKEND = [
    { id: "suite", nm: "Getting-ready suite", n: function () { return 1; } },
    { id: "rooms", nm: "Guest room flowers", n: function () { return 10; } },
    { id: "evwelcome", nm: "Welcome party", n: function () { return Math.ceil(state.guests / 25) + 1; } },
    { id: "evrehearsal", nm: "Rehearsal dinner", n: function () { return Math.max(2, Math.ceil(state.guests * 0.5 / 8)); } },
    { id: "evafter", nm: "After-party", n: function () { return 4; } },
    { id: "evbrunch", nm: "Farewell brunch", n: function () { return Math.max(2, Math.ceil(state.guests * 0.4 / 8)); } },
    { id: "preserve", nm: "Bouquet preservation", n: function () { return 1; } },
    { id: "anniv", nm: "First-anniversary flowers", n: function () { return 1; } }
  ];
  function renderWeekend() {
    var host = $("weekend"); host.innerHTML = "";
    WEEKEND.forEach(function (w) {
      var on = (state.qty[w.id] || 0) > 0;
      host.appendChild(h("button", { type: "button", class: "chip", "aria-pressed": on ? "true" : "false", onclick: function () {
        state.qty[w.id] = on ? 0 : w.n(); syncPieces(); renderWeekend(); update(); track("weekend_add", { id: w.id, on: !on });
      } }, [on ? "✓ " + w.nm : "+ " + w.nm]));
    });
  }
  var refs = { items: {}, groups: {} };
  function buildPieces() {
    var host = $("groups"); host.innerHTML = "";
    cfg.groups.forEach(function (g) {
      var gc = h("span", { class: "gc" }), gs = h("span", { class: "gs" });
      var list = h("div", { class: "items" });
      var det = h("details", { class: "grp" }, [h("summary", null, [h("h3", { text: g.title }), gc, gs]), list]);
      refs.groups[g.key] = { gc: gc, gs: gs, det: det };
      g.items.forEach(function (i) {
        var out = h("output", { "aria-live": "polite" });
        var up = h("span", { class: "up" });
        var row = h("div", { class: "item" }, [
          h("span", { class: "nm", text: i.nm }),
          h("span", { class: "stepper" }, [
            h("button", { type: "button", "aria-label": "Fewer " + i.nm, text: "−", onclick: function () { setQty(i.id, (state.qty[i.id] || 0) - 1); } }),
            out,
            h("button", { type: "button", "aria-label": "More " + i.nm, text: "+", onclick: function () { setQty(i.id, (state.qty[i.id] || 0) + 1); } })
          ]),
          h("span", { class: "nt", text: i.nt }), up
        ]);
        var ex = null;
        if (i.hasText) {
          var inp = h("input", { type: "text", id: "purseText", placeholder: "A name, a date, initials, a phrase", value: state.purseText || "", oninput: function (e) { state.purseText = e.target.value; save(); } });
          ex = h("label", { class: "f ex", for: "purseText" }, ["What should the monogram say?", inp]);
          row.appendChild(ex);
        }
        refs.items[i.id] = { out: out, up: up, row: row, ex: ex };
        list.appendChild(row);
      });
      host.appendChild(det);
    });
    syncPieces();
  }
  function setQty(id, v) {
    state.qty[id] = E.clamp(v, 0, 300); state.touched = true;
    syncPieces(); renderWeekend(); update(); trackOnce("pieces_edit");
  }
  function syncPieces() {
    Object.keys(refs.items).forEach(function (id) {
      var r = refs.items[id], n = state.qty[id] || 0;
      r.out.textContent = n; r.row.classList.toggle("zero", n === 0);
      if (r.ex) { r.ex.hidden = n < 1; }
    });
  }
  function piecesPrices(res) {
    var t = state.tier, r = res[t];
    Object.keys(refs.items).forEach(function (id) {
      var it = ITEMS[id].item, p = E.piece(cfg, it, t).price;
      refs.items[id].up.textContent = money(p) + (it.service ? "" : " each") + " · " + cfg.tiers[t].name;
    });
    cfg.groups.forEach(function (g) {
      var count = 0; g.items.forEach(function (i) { count += state.qty[i.id] || 0; });
      refs.groups[g.key].gc.textContent = count ? count + (count === 1 ? " piece" : " pieces") : "None yet";
      refs.groups[g.key].gs.textContent = r.groups[g.key] ? money(r.groups[g.key]) : "";
    });
    $("filledNote").textContent = state.touched ? "You have adjusted your pieces." : "Filled in for " + state.guests + " guests, " + (E.style(cfg, state.style).name) + " style.";
    var rb = $("refill"); rb.hidden = !state.touched; rb.textContent = "Reset to the plan for " + state.guests + " guests";
    var q = state.qty, can = ((q.arch || 0) && (q.sweet || 0)) || ((q.aisle || 0) && (q.bar || 0));
    $("reuse").disabled = !can; $("reuse").checked = !!state.reuse && can;
    var s2 = E.clone(state); s2.reuse = true; var save1 = r.total - E.calc(cfg, s2, t).total;
    if (state.reuse) { var s3 = E.clone(state); s3.reuse = false; save1 = E.calc(cfg, s3, t).total - r.total; }
    $("reuseSave").textContent = can && save1 > 0 ? (state.reuse ? "Saving about " : "Saves about ") + money(save1) + "." : can ? "" : "Add an arch and sweetheart table, or aisle and bar pieces, to use this.";
  }

  /* ---------- Step 4 ---------- */
  function venueObj() { return E.venue(cfg, state); }
  function renderVenue() {
    var chosen = !!state.venueId, v = venueObj();
    $("venuePick").hidden = chosen; $("venueChosen").hidden = !chosen;
    $("venueCustom").hidden = state.venueId !== "custom";
    var showSet = chosen && (state.venueId === "custom" || v.setting === "both");
    $("settingWrap").hidden = !showSet;
    if (chosen) {
      var notes = [];
      if (v.type === "resort") { notes.push("Resort load-in, timed setup and late-night breakdown are included."); }
      if (v.type === "chapel") { notes.push("We coordinate with the chapel's vendor rules."); }
      if (v.desert) { notes.push("Desert site: wind anchoring and heat care are added where needed."); }
      notes.push((cfg.pricing.zones[v.zone] || cfg.pricing.zones.core).name + ".");
      var card = h("div", { class: "vcard" }, [
        h("div", null, [h("b", { text: v.n || "Your venue" }), h("p", { text: (state.venueId === "custom" ? "Not on our list yet · " : TYPE_LABEL[v.type] + " venue · ") + notes.join(" ") })]),
        h("button", { type: "button", class: "linkbtn", text: "Change", onclick: function () { state.venueId = ""; state.setting = ""; renderVenue(); update(); $("venueQ").value = ""; $("venueQ").focus(); } })
      ]);
      $("venueChosen").innerHTML = ""; $("venueChosen").appendChild(card);
    }
    var host = $("setting"); host.innerHTML = "";
    [["indoor", "Indoors"], ["outdoor", "Outdoors"], ["mixed", "Some of each"]].forEach(function (o) {
      host.appendChild(h("button", { type: "button", class: "chip", "aria-pressed": state.setting === o[0] ? "true" : "false", onclick: function () { state.setting = o[0]; renderVenue(); update(); } }, [o[1]]));
    });
    var resort = chosen && v.type === "resort";
    $("strike").checked = resort ? true : state.strike !== false; $("strike").disabled = resort;
    $("strikeNote").textContent = resort ? "Required by resort venues. We clear everything after your last dance." : "We return after your event and clear every vessel and stand.";
  }
  function pickVenue(v) {
    state.venueId = v.id; state.setting = v.setting === "outdoor" ? "outdoor" : v.setting === "indoor" ? "indoor" : "";
    $("vlist").hidden = true; $("venueQ").setAttribute("aria-expanded", "false");
    renderVenue(); update(); track("venue", { type: v.type });
  }
  function searchVenues() {
    var q = $("venueQ").value.trim().toLowerCase(), list = $("vlist"); list.innerHTML = "";
    if (!q) { list.hidden = true; $("venueQ").setAttribute("aria-expanded", "false"); return; }
    var hits = cfg.venues.filter(function (v) { return v.n.toLowerCase().indexOf(q) > -1; }).slice(0, 6);
    hits.forEach(function (v) {
      list.appendChild(h("li", { role: "option" }, [h("button", { type: "button", onclick: function () { pickVenue(v); } }, [h("span", { text: v.n }), h("small", { text: TYPE_LABEL[v.type] })])]));
    });
    var typed = $("venueQ").value.trim();
    list.appendChild(h("li", { role: "option" }, [h("button", { type: "button", onclick: function () {
      state.venueCustom.name = typed; pickVenue({ id: "custom", setting: "both", type: "private" });
    } }, [h("span", { text: "Use “" + typed + "”" }), h("small", { text: "Not listed" })])]));
    list.hidden = false; $("venueQ").setAttribute("aria-expanded", "true");
  }

  /* ---------- Step 5 ---------- */
  var slots = [];
  function loadSlots() {
    slots = E.consultSlots(cfg, new Date());
    renderSlots();
    if (API) {
      fetch(API + "/consult-slots").then(function (r) { return r.json(); }).then(function (j) { if (j && j.slots && j.slots.length) { slots = j.slots; renderSlots(); } }).catch(function () {});
    }
  }
  function renderSlots() {
    var mh = $("cmode"); mh.innerHTML = "";
    cfg.consult.modes.forEach(function (m) {
      mh.appendChild(h("button", { type: "button", class: "chip", "aria-pressed": state.consultMode === m ? "true" : "false", onclick: function () { state.consultMode = m; renderSlots(); } }, [m]));
    });
    var host = $("slots"); host.innerHTML = "";
    slots.slice(0, 8).forEach(function (s) {
      var p = s.local.split("T"), d = E.parseDate(p[0]);
      var on = state.consult && state.consult.start === s.start;
      host.appendChild(h("button", { type: "button", class: "slot", "aria-pressed": on ? "true" : "false", onclick: function () {
        state.consult = on ? null : s; renderSlots(); track("consult_pick");
      } }, [h("b", { text: DOW[d.getDay()] + ", " + MON[d.getMonth()] + " " + d.getDate() }), fmtTime(p[1])]));
    });
  }

  function timingLabel(k) { var t = (cfg.lead.timing || []).filter(function (x) { return x.key === k; })[0]; return t ? t.label : ""; }
  function saveLead() { contact.deciders = lead.deciders; contact.timing = lead.timing; LS.set("afuvai_contact", contact); }
  function renderLeadQs() {
    var dh = $("deciders"), th = $("timing"); if (!dh || !th) { return; }
    dh.innerHTML = ""; th.innerHTML = "";
    cfg.lead.deciders.forEach(function (d) {
      var on = lead.deciders.indexOf(d) > -1;
      dh.appendChild(h("button", { type: "button", class: "chip", "aria-pressed": on ? "true" : "false", onclick: function () {
        var k = lead.deciders.indexOf(d);
        if (k > -1) { lead.deciders.splice(k, 1); } else {
          if (d === "Just the two of us") { lead.deciders = []; } else { lead.deciders = lead.deciders.filter(function (x) { return x !== "Just the two of us"; }); }
          lead.deciders.push(d);
        }
        saveLead(); renderLeadQs();
      } }, [d]));
    });
    var others = lead.deciders.filter(function (d) { return d !== "Just the two of us"; });
    $("decidersNote").hidden = !others.length;
    $("decidersNote").textContent = others.length ? "Bring " + (others.length === 1 ? "them" : "everyone") + " to your consultation, in person or on the video call, so you can decide together." : "";
    cfg.lead.timing.forEach(function (t) {
      th.appendChild(h("button", { type: "button", class: "chip", "aria-pressed": lead.timing === t.key ? "true" : "false", onclick: function () {
        lead.timing = lead.timing === t.key ? "" : t.key; saveLead(); renderLeadQs(); track("decision_timing", { timing: lead.timing });
      } }, [t.label]));
    });
  }

  /* ---------- Consult Mode (AmiDayne, during the consultation) ---------- */
  function consultUrl(c) {
    var base = location.href.split("#")[0].split("?")[0];
    var cc = c ? { name: c.name || "", partner: c.partner || "", email: c.email || "", phone: c.phone || "" } : null;
    return base + "#e." + b64e(JSON.stringify(pack(state))) + (cc ? "~c." + b64e(JSON.stringify(cc)) : "") + "~consult";
  }
  function proposalBase() { return location.href.split("#")[0].split("?")[0].replace(/[^\/]*$/, "") + "proposal.html"; }
  var cref = {};
  function adminKey() {
    var typed = cref.key ? cref.key.value.trim() : "";
    if (typed) { LS.set("afuvai_admin_key", typed); return typed; }
    return LS.get("afuvai_admin_key") || "";
  }
  function consultProposal() {
    var c = { name: cref.name.value.trim(), partner: cref.partner.value.trim(), email: cref.email.value.trim(), phone: cref.phone.value.trim() };
    var adjAmt = Math.round(+cref.adj.value || 0);
    return { couple: c, note: cref.note.value.trim(), adj: adjAmt ? { label: cref.adjLabel.value.trim() || "Custom design adjustment", amt: adjAmt } : null };
  }
  function renderConsultTotal() {
    if (!cref.total) { return; }
    var o = consultProposal(), pr = E.makeProposal(cfg, state, o);
    var pl = E.plans(cfg, pr.total, state.date, new Date(), pr.perkCredit);
    cref.total.textContent = money(pr.total);
    cref.totalSub.textContent = cfg.tiers[state.tier].name + " · " + (state.date ? fmtDate(E.parseDate(state.date)) : "add the wedding date") + " · " +
      (pl.standard ? money(pl.standard.payments[0].amt) + " to reserve" : money(pl.full.total) + " in full to reserve");
  }
  function buildConsult() {
    document.body.classList.add("consult-mode");
    document.title = "Consult Mode · AFUVAI";
    var c = consultContact || {};
    var mk = function (id, label, type, val, ph) { var i = h(type === "textarea" ? "textarea" : "input", { id: id, type: type === "textarea" ? null : type, value: type === "textarea" ? null : (val || ""), placeholder: ph || "", oninput: renderConsultTotal }); if (type === "textarea") { i.value = val || ""; } cref[id.replace("c_", "")] = i; return h("label", { class: "f", for: id }, [label, i]); };
    var banner = h("div", { class: "consult-bar" }, [
      h("span", null, [h("b", { text: "Consult Mode" }), " · Adjust anything live, then create the contract."]),
      h("a", { href: "status.html", text: "Status board" })
    ]);
    document.body.insertBefore(banner, document.body.firstChild);
    cref.total = h("p", { class: "ct-total num" }); cref.totalSub = h("p", { class: "hint" });
    cref.out = h("div", { class: "ct-out", hidden: true });
    cref.err = h("p", { class: "err", hidden: true });
    cref.btn = h("button", { type: "button", class: "btn gold", text: "Create contract", onclick: createProposal });
    cref.key = h("input", { type: "password", id: "c_key", autocomplete: "current-password", placeholder: "Asked once on this device" });
    cref.keyWrap = h("label", { class: "f", for: "c_key", hidden: !!(LS.get("afuvai_admin_key") || !BOOK) }, ["Studio password", cref.key]);
    var panel = h("div", { class: "consult-panel" }, [
      h("p", { class: "eyebrow", text: "Contract" }),
      cref.total, cref.totalSub,
      h("div", { class: "row" }, [mk("c_name", "Name", "text", c.name), mk("c_partner", "Partner", "text", c.partner), mk("c_email", "Email", "email", c.email), mk("c_phone", "Mobile", "tel", c.phone)]),
      mk("c_note", "A note from you on the contract", "textarea", "", "What you loved about their vision, what you will make sure of..."),
      h("details", { class: "more" }, [h("summary", { text: "Custom adjustment" }), h("div", null, [
        h("p", { class: "hint", text: "For a larger build or anything the calculator does not price. Taxed like florals. Use a minus amount for a credit." }),
        h("div", { class: "row" }, [mk("c_adjLabel", "Label", "text", "", "Extended arch install"), mk("c_adj", "Amount", "number", "", "0")])
      ])]),
      cref.keyWrap, cref.err, cref.btn, cref.out
    ]);
    var acts = document.querySelector(".est-actions");
    acts.parentNode.insertBefore(panel, acts);
    renderConsultTotal();
  }
  function loadQr(cb) {
    if (window.qrcode) { cb(); return; }
    var sc = document.createElement("script"); sc.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";
    sc.onload = cb; sc.onerror = cb; document.head.appendChild(sc);
  }
  function showProposalLink(url, pr) {
    var out = cref.out; out.innerHTML = ""; out.hidden = false;
    var qrBox = h("div", { class: "ct-qr" });
    var first = (pr.couple.name || "").split(" ")[0];
    var hold = new Date(pr.holdUntil);
    var sms = "sms:" + (pr.couple.phone || "") + "?&body=" + encodeURIComponent("Your AFUVAI contract: " + url);
    var mail = "mailto:" + (pr.couple.email || "") + "?subject=" + encodeURIComponent("Your wedding flower contract") + "&body=" + encodeURIComponent("Hi " + (first || "there") + ",\n\nHere is your contract. Your date is held for you for 72 hours.\n\n" + url + "\n\nAmiDayne");
    out.appendChild(h("p", { class: "eyebrow", text: "Ready for " + (first || "the couple") }));
    out.appendChild(qrBox);
    out.appendChild(h("p", { class: "hint", text: "Scan to open and pay on their phone. Date held until " + DOW[hold.getDay()] + " " + MON[hold.getMonth()] + " " + hold.getDate() + ", " + hold.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) + "." }));
    out.appendChild(h("a", { class: "btn", href: url, text: "Open it here on this screen" }));
    out.appendChild(h("div", { class: "pair" }, [
      h("button", { type: "button", class: "btn ghost", text: "Copy link", onclick: function () { copyText(url, "Contract link copied. Paste it into the video call chat."); } }),
      h("a", { class: "btn ghost", href: sms, text: "Text it" })
    ]));
    out.appendChild(h("a", { class: "btn ghost", href: mail, text: "Email it" }));
    loadQr(function () {
      if (!window.qrcode) { qrBox.appendChild(h("p", { class: "hint", text: "QR code unavailable offline. Use Copy link." })); return; }
      try { var q = window.qrcode(0, url.length > 900 ? "L" : "M"); q.addData(url); q.make(); qrBox.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); }
      catch (e) { qrBox.appendChild(h("p", { class: "hint", text: "This preview link is too long for a QR code. Live contracts use short links." })); }
    });
    out.scrollIntoView({ block: "nearest" });
  }
  function createProposal() {
    var o = consultProposal(), err = cref.err; err.hidden = true;
    if (!o.couple.name || !validEmail(o.couple.email)) { err.hidden = false; err.textContent = "Add the couple's name and email."; return; }
    if (!state.date) { err.hidden = false; err.textContent = "Add the wedding date in step 1."; return; }
    if (res[state.tier].empty) { err.hidden = false; err.textContent = "Add pieces first."; return; }
    var pr = E.makeProposal(cfg, state, o);
    track("proposal_created", { tier: pr.tierKey });
    if (!BOOK) {
      var compact = { v: 1, r: pr.ref, cr: pr.created, s: pr.state, c: o.couple, n: o.note, a: o.adj };
      var url = proposalBase() + "#p." + b64e(JSON.stringify(compact));
      var list = LS.get("afuvai_demo_proposals") || [];
      pr.link = url; list.unshift(pr); LS.set("afuvai_demo_proposals", list.slice(0, 50));
      showProposalLink(url, pr);
      return;
    }
    cref.btn.disabled = true; cref.btn.textContent = "Creating";
    var send = function (key) {
      return fetch(BOOK + "/proposals", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-key": key }, body: JSON.stringify({ state: pack(state), couple: o.couple, note: o.note, adj: o.adj }) })
        .then(function (r) { return r.json().then(function (j) { return { r: r, j: j }; }); });
    };
    var key = adminKey();
    if (!key) { err.hidden = false; err.textContent = "Enter the studio password above, then try again."; cref.keyWrap.hidden = false; cref.key.focus(); cref.btn.disabled = false; cref.btn.textContent = "Create contract"; return; }
    send(key).then(function (x) {
      if (x.r.status === 401) { LS.set("afuvai_admin_key", null); cref.keyWrap.hidden = false; cref.key.value = ""; cref.key.focus(); throw new Error("That studio password did not work. Enter it again."); }
      if (!x.r.ok || !x.j.ok) { throw new Error(x.j.error || "Could not create the contract."); }
      cref.keyWrap.hidden = true;
      showProposalLink(x.j.url, x.j.proposal);
    }).catch(function (e) { err.hidden = false; err.textContent = e.message || "Could not create the contract."; })
      .then(function () { cref.btn.disabled = false; cref.btn.textContent = "Create contract"; });
  }

  /* ---------- Estimate ---------- */
  var res = null;
  function renderEstimate() {
    res = E.calcAll(cfg, state);
    var t = state.tier, r = res[t], budget = +state.budget || 0;
    var tiers = $("tiers"); tiers.innerHTML = "";
    cfg.tiers.forEach(function (T, i) {
      var x = res[i], kids = [h("span", { class: "tn", text: T.name }), h("span", { class: "tr", text: x.empty ? "—" : rng(x) }),
        h("span", { class: "td", text: T.desc }), h("span", { class: "tg", text: x.empty ? "" : "≈ " + money(x.perGuest) + " per guest" })];
      if (budget && !x.empty) {
        kids.push(x.high <= budget ? h("span", { class: "tb ok", text: "Within your budget" }) : x.low <= budget ? h("span", { class: "tb ok", text: "Within reach of your budget" }) : h("span", { class: "tb over", text: "About " + money(x.low - budget) + " over your budget" }));
      }
      tiers.appendChild(h("button", { type: "button", class: "tier", "aria-pressed": t === i ? "true" : "false", onclick: function () { state.tier = i; update(); track("tier", { tier: T.key }); } }, kids));
    });
    var lines = $("lines"); lines.innerHTML = "";
    var add = function (cls, a, b) { lines.appendChild(h("div", { class: "l " + cls }, [h("span", { text: a }), h("span", { text: b })])); };
    if (r.empty) {
      lines.appendChild(h("p", { class: "empty", text: "Add pieces in step 3 and your estimate appears here." }));
    } else {
      cfg.groups.forEach(function (g) {
        if (!r.groups[g.key] && !r.lines.some(function (l) { return l.group === g.key; })) { return; }
        add("", g.title, money(r.groups[g.key] || 0));
        if (flags.showAll) {
          r.lines.filter(function (l) { return l.group === g.key; }).forEach(function (l) {
            add("sec", l.q + " × " + l.nm + (l.moved ? " (" + l.moved + " moved from ceremony)" : ""), money(l.amt));
          });
        }
      });
      lines.appendChild(h("hr"));
      r.fees.forEach(function (f) { add("sub", f.nm, money(f.amt)); });
      add("sub", "Estimated sales tax", money(r.tax));
      add("tot", cfg.tiers[t].name + " estimate", rng(r));
    }
    $("showAll").textContent = flags.showAll ? "Hide piece details" : "Show every piece";
    $("showAll").hidden = r.empty;

    /* design board */
    var b = E.board(cfg, state, t), board = $("board"); board.innerHTML = "";
    b.blooms.forEach(function (x) { board.appendChild(h("span", null, [h("i", { style: "background:" + (COLORS[x.colors[0]] || "#eee") }), x.n])); });
    b.greens.forEach(function (n) { board.appendChild(h("span", null, [h("i", { style: "background:" + COLORS.Sage }), n])); });
    var notes = [];
    b.outOfSeason.forEach(function (o) { notes.push(o.n + " is out of season for your date. We design with " + o.sub + "."); });
    if (b.hot) { notes.push("Outdoor summer date: we lead with heat-hardy blooms and stage everything in shade."); }
    $("boardNote").hidden = !notes.length; $("boardNote").textContent = notes.join(" ");
    $("favNote").hidden = !b.outOfSeason.length; $("favNote").textContent = b.outOfSeason.map(function (o) { return o.n + " is out of season for your date, so we would use " + o.sub + "."; }).join(" ");

    /* budget */
    var bn = $("budgetNote"), tipsHost = $("tips"); tipsHost.innerHTML = "";
    if (budget && !r.empty) {
      var fit = res.filter(function (x) { return x.low <= budget; }).length;
      bn.className = "hint " + (r.low <= budget ? "ok" : "warn");
      var fitNames = cfg.tiers.filter(function (_, i) { return res[i].low <= budget; }).map(function (T) { return T.name; });
      bn.textContent = fit ? fitNames.join(" and ") + (fit === 1 ? " fits " : " fit ") + "your " + money(budget) + " budget." + (r.low > budget ? " To keep " + cfg.tiers[t].name + ", try one of these:" : "") : "All three levels run over " + money(budget) + " with these pieces. These changes keep the design intact:";
      if (r.low > budget) {
        E.tips(cfg, state, t).forEach(function (tp) {
          tipsHost.appendChild(h("div", { class: "tip" }, [
            h("span", null, [tp.label + " ", h("span", { class: "sv", text: "saves about " + money(tp.save) })]),
            h("small", { text: tp.note }),
            h("button", { type: "button", text: "Apply", onclick: function () {
              ["qty", "reuse", "tier"].forEach(function (k) { if (tp.state[k] != null) { state[k] = tp.state[k]; } });
              state.touched = true; syncPieces(); renderWeekend(); update(); track("tip_apply", { label: tp.label });
            } })
          ]));
        });
      }
    } else { bn.textContent = ""; }

    /* payments */
    renderPay(r);
    var valid = E.addDays(new Date(), cfg.pricing.quoteValidDays);
    $("fine").textContent = "A planning range including estimated sales tax, held through " + MON[valid.getMonth()] + " " + valid.getDate() + ". Final pricing is confirmed in your contract.";

    /* bar + art */
    $("barT").textContent = cfg.tiers[t].name + " estimate";
    $("barV").textContent = r.empty ? "Add pieces" : rng(r);
    var cols = (state.colors.length ? state.colors : E.style(cfg, state.style).palette).map(function (c) { return [c, COLORS[c]]; });
    BQ.draw($("bqDesk"), { colors: cols, tier: t, style: state.style });
    BQ.draw($("bqMobile"), { colors: cols, tier: t, style: state.style });
    piecesPrices(res);
  }

  var shortDate = function (iso) { var d = E.parseDate(iso); return d ? MON[d.getMonth()] + " " + d.getDate() : ""; };
  function renderPay(r) {
    var pay = $("pay"); pay.innerHTML = "";
    if (r.empty) { return; }
    var P = cfg.payments, pl = E.plans(cfg, r.total, state.date, new Date(), E.perkCredit(cfg, state, state.tier));
    pay.appendChild(h("p", { class: "pay-h", text: "Ways to pay" }));
    var row = function (name, main, sub) {
      pay.appendChild(h("div", { class: "pay-opt" }, [h("b", { text: name }), h("span", { class: "num", text: main }), sub ? h("small", { text: sub }) : null]));
    };
    var pct = function (x) { return Math.round(x * 100) + "%"; };
    if (pl.standard) {
      var sp = pl.standard.payments;
      row("Standard", "≈ " + money(sp[0].amt) + " to reserve",
        sp.length === 3 ? pct(P.retainerPct) + " to reserve, " + pct(P.designPct) + " by " + shortDate(sp[1].due) + ", the rest by " + shortDate(sp[2].due) + "."
          : (state.date ? "Your date is under " + P.designDaysBefore + " days away, so the design payment is included up front. The rest is due " + shortDate(sp[1].due) + "." : ""));
    } else if (!state.date) {
      row("Standard", pct(P.retainerPct) + " to reserve", pct(P.designPct) + " at " + P.designDaysBefore + " days before, the rest at " + P.balanceDaysBefore + " days before.");
    }
    if (pl.monthly) {
      row("Monthly", "≈ " + money(pl.monthly.payments[0].amt) + " to reserve", "Then " + pl.monthly.count + " monthly payments of about " + money(pl.monthly.each) + ", on autopay, finished by " + shortDate(pl.finalDue) + ".");
    } else if (!state.date) {
      row("Monthly", pct(P.retainerPct) + " to reserve", "The rest in equal monthly payments on autopay.");
    }
    row("Pay in full", "≈ " + money(pl.full.total), (P.fullPerk ? P.fullPerk.name + " as our gift." : "") + (pl.rule === "under" + P.balanceDaysBefore ? " Your date is under " + P.balanceDaysBefore + " days away, so payment in full reserves it." : ""));
    pay.appendChild(h("p", { class: "fine", text: "Everything is paid " + P.balanceDaysBefore + " days before your wedding. Final design and guest count by " + (pl.lockDate ? shortDate(pl.lockDate) : P.lockDaysBefore + " days before") + ". Nothing is charged here." }));
  }

  function update() { renderEstimate(); save(); if (CONSULT) { renderConsultTotal(); } }

  /* ---------- Share, save, submit ---------- */
  function toast(msg) { $("toast").textContent = msg; clearTimeout(toast.t); toast.t = setTimeout(function () { $("toast").textContent = ""; }, 6000); }
  function copyText(text, ok) {
    var done = function () { toast(ok); };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, function () { toast("Copy this link: " + text); }); }
    else { toast("Copy this link: " + text); }
  }
  function validEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || ""); }
  function summary() {
    return res.map(function (x, i) { return { tier: cfg.tiers[i].name, low: x.low, high: x.high, total: x.total, pretax: x.pretax, perGuest: x.perGuest }; });
  }
  function capture(email, where) {
    if (!validEmail(email)) { toast("Add a valid email address."); return; }
    contact.email = contact.email || email; contact.captured = true; flags.captured = true; LS.set("afuvai_contact", contact);
    var body = { email: email, state: pack(state), estimates: summary(), tier: state.tier, link: shareUrl(), source: source };
    track("estimate_saved", { where: where });
    if (PREVIEW) {
      var leads = LS.get("afuvai_demo_leads") || [];
      leads.unshift({ ref: "PARTIAL", created: new Date().toISOString(), status: "partial", contact: { email: email }, estimates: body.estimates, tier: cfg.tiers[state.tier].name, guests: state.guests, date: state.date });
      LS.set("afuvai_demo_leads", leads.slice(0, 50));
      toast("Preview: once live, this emails " + email + " a link to this estimate.");
      return;
    }
    fetch(API + "/save-estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) { throw new Error(); } toast("Sent to " + email + ". The link opens this exact estimate."); })
      .catch(function () { toast("That did not send. Check your connection and try again."); });
  }
  function leadText(p) {
    var L = [], s = state, v = venueObj();
    L.push("NEW WEDDING ESTIMATE · " + (p.score ? p.score.label.toUpperCase() + " LEAD (" + p.score.why.join(", ") + ")" : ""));
    L.push("Ref " + p.ref);
    L.push("");
    L.push(p.contact.name + (p.contact.partner ? " & " + p.contact.partner : "") + " · " + p.contact.email + (p.contact.phone ? " · " + p.contact.phone : ""));
    L.push("Date: " + (s.date ? fmtDate(E.parseDate(s.date)) : "not set") + " · Guests: " + s.guests + " · Collection: " + (cfg.packages.filter(function (x) { return x.key === s.pkg; })[0] || {}).name);
    L.push("Venue: " + (v.n || "not set") + (s.setting ? " (" + s.setting + ")" : ""));
    L.push("Style: " + E.style(cfg, s.style).name + " · Colors: " + (s.colors.join(", ") || "not chosen"));
    var loves = Object.keys(s.flowers).filter(function (k) { return s.flowers[k] === 1; }), nev = Object.keys(s.flowers).filter(function (k) { return s.flowers[k] === -1; });
    if (loves.length) { L.push("Favorites: " + loves.join(", ")); }
    if (nev.length) { L.push("Never: " + nev.join(", ")); }
    if (s.inspo) { L.push("Inspiration: " + s.inspo); }
    if (s.budget) { L.push("Budget: " + money(s.budget)); }
    if (p.lead) {
      L.push("Deciding: " + (timingLabel(p.lead.timing) || "not said") + " · With: " + ((p.lead.deciders || []).join(", ") || "not said"));
      if ((p.lead.deciders || []).some(function (d) { return d !== "Just the two of us"; })) { L.push("  → Invite them to the consultation so the decision can happen there."); }
    }
    L.push("Consultation: " + (p.consult ? fmtDate(E.parseDate(p.consult.local.split("T")[0])) + " " + fmtTime(p.consult.local.split("T")[1]) + " · " + p.consult.mode : "not picked"));
    L.push("");
    L.push("ESTIMATES (selected: " + p.tier + ")");
    p.estimates.forEach(function (e) { L.push("  " + e.tier + ": " + money(e.low) + " – " + money(e.high)); });
    L.push("");
    L.push("PIECES");
    res[s.tier].lines.forEach(function (l) { L.push("  " + l.q + " × " + l.nm + (l.id === "purse" && s.purseText ? " (monogram: " + s.purseText + ")" : "")); });
    if (s.reuse) { L.push("  Ceremony pieces move to reception"); }
    if (p.contact.notes) { L.push(""); L.push("Notes: " + p.contact.notes); }
    if (p.source.ref) { L.push("Referred by: " + p.source.ref); }
    L.push(""); L.push("Open in Consult Mode: " + consultUrl(p.contact));
    return L.join("\n");
  }
  /* Send the lead through a form service (Netlify Forms or Formspree). Field names match the hidden form in index.html. */
  function leadFields(p) {
    var sel = res[state.tier], v = venueObj();
    return {
      name: p.contact.name, email: p.contact.email, phone: p.contact.phone, partner: p.contact.partner,
      wedding_date: state.date ? fmtDate(E.parseDate(state.date)) : "", guests: String(state.guests),
      venue: (v.n || "not set") + (state.setting ? " (" + state.setting + ")" : ""),
      selected_level: p.tier, selected_estimate: rng(sel),
      all_estimates: p.estimates.map(function (e) { return e.tier + " " + money(e.low) + "–" + money(e.high); }).join(" | "),
      consultation: p.consult ? fmtDate(E.parseDate(p.consult.local.split("T")[0])) + " " + fmtTime(p.consult.local.split("T")[1]) + " · " + p.consult.mode : "not picked",
      ref: p.ref, lead_rating: p.score.label + (p.score.why.length ? " (" + p.score.why.join(", ") + ")" : ""),
      estimate_link: p.link, consult_link: consultUrl(p.contact), deciders: (p.lead.deciders || []).join(", "), decision_timing: timingLabel(p.lead.timing),
      notes: p.contact.notes, full_details: leadText(p), company: $("company").value
    };
  }
  function sendLead(p) {
    var F = cfg.integrations.form || {}, fields = leadFields(p);
    if (F.mode === "api" && F.url) {
      return fetch(F.url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields: fields, ref: p.ref, score: p.score, lead: p.lead, consult: p.consult, created: p.created }) })
        .then(function (r) { if (!r.ok) { throw new Error("send"); } });
    }
    if (F.mode === "formspree" && F.formspreeUrl) {
      fields._subject = "New wedding estimate · " + p.contact.name + " · " + fields.wedding_date;
      fields._replyto = p.contact.email;
      return fetch(F.formspreeUrl, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(fields) })
        .then(function (r) { if (!r.ok) { throw new Error("send"); } });
    }
    var body = new URLSearchParams(); body.append("form-name", F.name || "wedding-estimate");
    Object.keys(fields).forEach(function (k) { body.append(k, fields[k] || ""); });
    return fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() })
      .then(function (r) { if (!r.ok) { throw new Error("send"); } });
  }
  function mailFallback(p) {
    var err = $("formErr"), text = leadText(p).replace(/^NEW WEDDING ESTIMATE[^\n]*\n/, "");
    if (text.length > 1600) { text = text.slice(0, 1600) + "\n…"; }
    text += "\n\nEstimate link: " + p.link;
    var href = "mailto:" + cfg.business.email + "?subject=" + encodeURIComponent("Wedding estimate · " + p.contact.name) + "&body=" + encodeURIComponent(text);
    err.hidden = false; err.innerHTML = "";
    err.appendChild(document.createTextNode("That did not send. "));
    err.appendChild(h("a", { href: href, text: "Tap here to email your estimate to AmiDayne" }));
    err.appendChild(document.createTextNode(", or try again in a moment."));
  }
  function showDone(p) {
    flags.submitted = true;
    $("form").hidden = true;
    var d = $("done"); d.innerHTML = ""; d.hidden = false;
    d.appendChild(h("p", { class: "eyebrow", text: "Sent" }));
    d.appendChild(h("h3", { text: "AmiDayne has your selections." }));
    d.appendChild(h("p", { class: "hint", text: p.consult ? "You asked for a consultation on " + fmtDate(E.parseDate(p.consult.local.split("T")[0])) + " at " + fmtTime(p.consult.local.split("T")[1]) + " (" + p.consult.mode.toLowerCase() + "). AmiDayne will confirm the time by email within one business day." : "AmiDayne will email you within one business day to set your consultation." }));
    d.appendChild(h("ol", { class: "timeline" }, [
      h("li", { text: "AmiDayne reviews your selections and replies to " + p.contact.email + "." }),
      h("li", { text: "AmiDayne builds a design board from your colors, style and pieces." }),
      h("li", { text: "You meet, adjust anything together, and leave with your contract." }),
      h("li", { text: "Ready? Reserve your date on the spot with a 30% retainer. Want to think it over? We hold your date for 72 hours." })
    ]));
    var acts = h("div", { class: "est-actions" });
    if (p.contact.phone && API) {
      acts.appendChild(h("button", { type: "button", class: "btn ghost", text: "Text me a link to this estimate", onclick: function () {
        if (PREVIEW) { toast("Preview: once live, this texts " + p.contact.phone + " a link."); return; }
        fetch(API + "/text-estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: p.ref, phone: p.contact.phone, link: shareUrl() }) })
          .then(function (r) { toast(r.ok ? "Texted to " + p.contact.phone + "." : "That did not send. Try again in a moment."); }).catch(function () { toast("That did not send. Try again in a moment."); });
      } }));
    }
    acts.appendChild(h("button", { type: "button", class: "btn ghost", text: "Copy a link to share with your partner", onclick: function () { copyText(shareUrl(), "Link copied. It opens this exact estimate."); } }));
    d.appendChild(acts);
    if (cfg.business.showContactAfterSubmit) {
      d.appendChild(h("p", { class: "contact", text: "Questions? AmiDayne · " + cfg.business.email + " · " + cfg.business.phone }));
    }
    d.scrollIntoView({ block: "start" });
  }
  function submit(e) {
    e.preventDefault();
    var err = $("formErr"), name = $("name").value.trim(), email = $("email").value.trim();
    if (!name || !validEmail(email)) { err.hidden = false; err.textContent = "Add your name and a valid email so AmiDayne can reach you."; (name ? $("email") : $("name")).focus(); return; }
    if (!state.date) { err.hidden = false; err.textContent = "Add your wedding date in step 1 so AmiDayne can check her calendar."; $("date").focus(); return; }
    if (res[state.tier].empty) { err.hidden = false; err.textContent = "Add at least one piece in step 3 first."; return; }
    if ($("company").value) { showDone({ contact: { name: name, email: email } }); return; }
    err.hidden = true;
    var p = {
      ref: "AFV-" + (state.date ? state.date.replace(/-/g, "").slice(2) : "TBD") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
      created: new Date().toISOString(),
      contact: { name: name, email: email, phone: $("phone").value.trim(), partner: $("partner").value.trim(), notes: $("notes").value.trim() },
      consult: state.consult ? { start: state.consult.start, local: state.consult.local, mode: state.consultMode } : null,
      state: pack(state), tier: cfg.tiers[state.tier].name, estimates: summary(), link: shareUrl(), source: source,
      lead: { deciders: lead.deciders.slice(), timing: lead.timing }
    };
    p.score = E.leadScore(cfg, Object.assign({}, state, { contact: p.contact, consult: p.consult, deciders: lead.deciders, timing: lead.timing }), res);
    track("submit", { tier: p.tier, score: p.score.label });
    var btn = $("submitBtn"); btn.disabled = true; btn.textContent = "Sending";
    if (!API) {
      sendLead(p).then(function () { showDone(p); }).catch(function () {
        btn.disabled = false; btn.textContent = "Send my estimate";
        mailFallback(p);
      });
      return;
    }
    var ts = document.querySelector("[name='cf-turnstile-response']");
    p.turnstile = ts ? ts.value : "";
    fetch(API + "/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.ok) { throw new Error(j.error || "send"); } return j; }); })
      .then(function (j) { p.ref = j.ref || p.ref; showDone(p); })
      .catch(function () { btn.disabled = false; btn.textContent = "Send my estimate"; err.hidden = false; err.textContent = "That did not send. Check your connection and try again, or email " + cfg.business.email + "."; });
  }

  /* ---------- Static content ---------- */
  function renderStatic() {
    var rl = $("readyList"); rl.innerHTML = "";
    cfg.readiness.forEach(function (x) { rl.appendChild(h("div", null, [h("b", { text: x.t }), h("span", { text: x.d + (cfg.business.insured && x.ifInsured ? x.ifInsured : "") })])); });
    var fq = $("faq"); fq.innerHTML = "";
    cfg.faq.forEach(function (x) { fq.appendChild(h("details", null, [h("summary", { text: x.q }), h("p", { text: x.a })])); });
    if (cfg.business.introVideoUrl) { $("video").appendChild(h("video", { src: cfg.business.introVideoUrl, controls: true, playsinline: true, preload: "metadata" })); }
    var zs = $("zone"); zs.innerHTML = "";
    Object.keys(cfg.pricing.zones).forEach(function (k) { zs.appendChild(h("option", { value: k, text: cfg.pricing.zones[k].name })); });
    zs.value = state.venueCustom.zone || "core";
    try {
      var ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: cfg.faq.map(function (x) { return { "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } }; }) };
      document.head.appendChild(h("script", { type: "application/ld+json", text: JSON.stringify(ld) }));
    } catch (e) { /* optional */ }
  }
  function loadIntegrations() {
    var I = cfg.integrations;
    if (PREVIEW) { return; }
    if (I.clarityId) {
      (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", I.clarityId);
    }
    if (I.plausibleDomain) { document.head.appendChild(h("script", { defer: true, "data-domain": I.plausibleDomain, src: "https://plausible.io/js/script.js" })); }
    if (I.turnstileSiteKey) {
      $("turnstile").appendChild(h("div", { class: "cf-turnstile", "data-sitekey": I.turnstileSiteKey, "data-theme": "light" }));
      document.head.appendChild(h("script", { src: "https://challenges.cloudflare.com/turnstile/v0/api.js", async: true, defer: true }));
    }
    fetch(API + "/pricing").then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.override) { cfg = E.mergeConfig(BASE, j.override); ITEMS = E.itemMap(cfg); update(); }
    }).catch(function () {});
  }

  /* ---------- Wire up ---------- */
  function init() {
    $("date").min = E.iso(new Date());
    $("date").value = state.date; $("guests").value = state.guests; $("budget").value = state.budget || ""; $("inspo").value = state.inspo || "";
    ["name", "email", "phone", "partner", "notes"].forEach(function (k) { if (contact[k] && $(k)) { $(k).value = contact[k]; } });
    renderStatic(); renderPkgs(); renderDate(); renderStyles(); renderColors(); renderFavs(); renderWeekend(); buildPieces(); renderVenue(); loadSlots(); renderLeadQs();
    var studio = $("studioLink");
    if (studio) { studio.addEventListener("click", function (e) { e.preventDefault(); location.href = consultUrl(null); location.reload(); }); }
    if (CONSULT) { buildConsult(); document.querySelectorAll("details.grp").forEach(function (d) { d.open = true; }); }
    update();

    $("date").addEventListener("change", function () { state.date = $("date").value; renderDate(); update(); trackOnce("date_set"); });
    $("guests").addEventListener("change", function () { setGuests($("guests").value); });
    $("gMinus").addEventListener("click", function () { setGuests(state.guests - 10); });
    $("gPlus").addEventListener("click", function () { setGuests(state.guests + 10); });
    $("inspo").addEventListener("input", function () { state.inspo = $("inspo").value.trim(); save(); });
    $("refill").addEventListener("click", function () { refill(); renderWeekend(); update(); });
    $("reuse").addEventListener("change", function () { state.reuse = $("reuse").checked; syncPieces(); update(); });
    $("venueQ").addEventListener("input", searchVenues);
    $("venueQ").addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { var b = $("vlist").querySelector("button"); if (b) { e.preventDefault(); b.focus(); } }
      if (e.key === "Enter") { var f = $("vlist").querySelector("button"); if (f) { e.preventDefault(); f.click(); } }
    });
    $("vlist").addEventListener("keydown", function (e) {
      var bs = Array.prototype.slice.call($("vlist").querySelectorAll("button")), i = bs.indexOf(document.activeElement);
      if (e.key === "ArrowDown" && i < bs.length - 1) { e.preventDefault(); bs[i + 1].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); (i > 0 ? bs[i - 1] : $("venueQ")).focus(); }
    });
    $("zone").addEventListener("change", function () { state.venueCustom.zone = $("zone").value; renderVenue(); update(); });
    $("strike").addEventListener("change", function () { state.strike = $("strike").checked; update(); });
    $("budget").addEventListener("input", function () { state.budget = +$("budget").value || 0; update(); trackOnce("budget_set"); });
    $("showAll").addEventListener("click", function () { flags.showAll = !flags.showAll; renderEstimate(); });
    $("form").addEventListener("submit", submit);
    ["name", "email", "phone", "partner", "notes"].forEach(function (k) { $(k).addEventListener("input", function () { contact[k] = $(k).value; LS.set("afuvai_contact", contact); }); });
    $("copyLink").addEventListener("click", function () { copyText(shareUrl(), "Link copied. It opens this exact estimate."); track("copy_link"); });
    $("emailMe").addEventListener("click", function () { var f = $("saveForm"); f.hidden = !f.hidden; if (!f.hidden) { $("saveEmail").value = contact.email || ""; $("saveEmail").focus(); } });
    $("saveForm").addEventListener("submit", function (e) { e.preventDefault(); capture($("saveEmail").value.trim(), "panel"); $("saveForm").hidden = true; });
    var sheet = $("sheet");
    var openSheet = function () { sheet.classList.add("open"); $("sheetClose").focus(); track("sheet_open"); };
    var closeSheet = function () { sheet.classList.remove("open"); };
    $("barGo").addEventListener("click", openSheet);
    $("sheetClose").addEventListener("click", closeSheet);
    sheet.addEventListener("click", function (e) { if (e.target === sheet) { closeSheet(); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeSheet(); $("keep").hidden = true; } });
    $("goSend").addEventListener("click", function () { closeSheet(); $("s5").scrollIntoView({ block: "start" }); setTimeout(function () { $("name").focus({ preventScroll: true }); }, 350); });
    /* exit intent (desktop only, once) */
    if (API) document.addEventListener("mouseout", function (e) {
      if (CONSULT || e.relatedTarget || e.clientY > 0 || window.innerWidth < 1000 || flags.submitted || flags.captured || Date.now() - flags.loaded < 15000 || res[state.tier].empty) { return; }
      try { if (sessionStorage.getItem("afuvai_keep")) { return; } sessionStorage.setItem("afuvai_keep", "1"); } catch (x) { if (flags.kept) { return; } }
      flags.kept = true; $("keep").hidden = false; $("keepEmail").focus(); track("exit_prompt");
    });
    $("keepNo").addEventListener("click", function () { $("keep").hidden = true; });
    $("keepForm").addEventListener("submit", function (e) { e.preventDefault(); capture($("keepEmail").value.trim(), "exit"); $("keep").hidden = true; });
    /* step views */
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { trackOnce("view_" + x.target.id); } }); }, { threshold: 0.4 });
      ["s1", "s2", "s3", "s4", "s5"].forEach(function (id) { io.observe($(id)); });
    }
    loadIntegrations();
    if (source.ref) { track("referral_visit", { ref: source.ref }); }
  }
  init();
})();
