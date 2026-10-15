/* AFUVAI proposal page: the couple reviews their design, picks a payment plan, signs and reserves their date.
 * Live: proposal.html?id=<id> loads the stored, price-locked proposal from the booking API and pays through Stripe Checkout.
 * Preview: proposal.html#p.<data> rebuilds the proposal from the link and simulates payment (nothing is charged).
 */
(function () {
  "use strict";
  var cfg = window.AFUVAI_CONFIG, E = window.AFUVAI_ENGINE, BQ = window.AFUVAI_BOUQUET;
  var BOOK = E.bookingBase(cfg, location);
  var $ = function (id) { return document.getElementById(id); };
  var money = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  var DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var COLORS = {}; cfg.colors.forEach(function (c) { COLORS[c[0]] = c[1]; });
  var LS = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) { Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (k === "class") { n.className = v; } else if (k === "text") { n.textContent = v; }
      else if (k.slice(0, 2) === "on") { n.addEventListener(k.slice(2), v); } else if (v === true) { n.setAttribute(k, ""); } else if (v !== false && v != null) { n.setAttribute(k, v); }
    }); }
    (kids || []).forEach(function (c) { if (c != null) { n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); } });
    return n;
  }
  function b64d(str) { str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) { str += "="; } return decodeURIComponent(escape(atob(str))); }
  var longDate = function (iso) { var d = E.parseDate(iso); return d ? DOW[d.getDay()] + ", " + MON[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() : ""; };
  var shortDate = function (iso) { var d = E.parseDate(iso); return d ? MON[d.getMonth()].slice(0, 3) + " " + d.getDate() + ", " + d.getFullYear() : ""; };
  var whenTime = function (d) { return DOW[d.getDay()] + ", " + MON[d.getMonth()] + " " + d.getDate() + " at " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }); };
  var fill = function (s) {
    var P = cfg.payments;
    return s.replace(/\{lock\}/g, P.lockDaysBefore).replace(/\{balance\}/g, P.balanceDaysBefore).replace(/\{reminder\}/g, P.reminderDaysBefore).replace(/\{adds\}/g, P.addUntilDaysBefore);
  };

  var params = new URLSearchParams(location.search);
  var ID = params.get("id");
  var PREVIEW = !(BOOK && ID);
  var pr = null, live = { status: "sent", signature: null, plan: null, schedule: null }, ui = { plan: null };

  /* ---------- Load ---------- */
  function load() {
    $("footContact").textContent = "Questions? " + cfg.business.designer + " · " + cfg.business.email + " · " + cfg.business.phone;
    if (!PREVIEW) {
      fetch(BOOK + "/proposal?id=" + encodeURIComponent(ID)).then(function (r) { return r.json(); }).then(function (j) {
        if (!j || !j.ok) { throw new Error(); }
        pr = j.proposal; live = { status: j.status, signature: j.signature || null, plan: j.plan || null, schedule: j.schedule || null };
        if (params.get("paid") && live.status !== "booked" && live.status !== "processing") { return waitForPayment(0); }
        render();
      }).catch(function () { fail("We could not open this proposal. Check the link, or contact " + cfg.business.designer + "."); });
      return;
    }
    try {
      if (location.hash.indexOf("#p.") !== 0) { throw new Error(); }
      var c = JSON.parse(b64d(location.hash.slice(3)));
      pr = E.makeProposal(cfg, E.unpack(cfg, c.s), { couple: c.c || {}, note: c.n || "", adj: c.a || null, now: c.cr, ref: c.r });
      var saved = (LS.get("afuvai_demo_proposals") || []).filter(function (x) { return x.ref === pr.ref; })[0];
      if (saved) { live = { status: saved.status || "sent", signature: saved.signature || null, plan: saved.plan || null, schedule: saved.schedule || null }; }
      var pn = $("previewNote"); pn.hidden = false;
      pn.textContent = "Preview: payment is simulated and nothing is charged.";
      render();
    } catch (e) { fail("This proposal link is incomplete. Ask " + cfg.business.designer + " to send it again."); }
  }
  function waitForPayment(n) {
    $("app").innerHTML = ""; $("app").appendChild(h("p", { class: "loading", text: "Confirming your payment…" }));
    setTimeout(function () {
      fetch(BOOK + "/proposal?id=" + encodeURIComponent(ID)).then(function (r) { return r.json(); }).then(function (j) {
        pr = j.proposal; live = { status: j.status, signature: j.signature || null, plan: j.plan || null, schedule: j.schedule || null };
        if (live.status === "booked" || live.status === "processing" || n >= 8) { render(); } else { waitForPayment(n + 1); }
      }).catch(function () { if (n >= 8) { render(); } else { waitForPayment(n + 1); } });
    }, 1500);
  }
  function fail(msg) { $("app").innerHTML = ""; $("app").appendChild(h("div", { class: "psec" }, [h("h2", { text: "Hmm." }), h("p", { text: msg })])); }

  /* ---------- Render ---------- */
  function names() { var c = pr.couple || {}; return [c.name, c.partner].filter(Boolean).map(function (n) { return n.split(" ")[0]; }).join(" & "); }
  function render() {
    var app = $("app"); app.innerHTML = "";
    document.title = "Proposal for " + (names() || "your wedding") + " · AFUVAI";
    var booked = live.status === "booked" || live.status === "processing" || live.status === "paid";
    app.appendChild(head(booked));
    if (booked) { app.appendChild(confirmation()); }
    if (pr.note) { app.appendChild(note()); }
    app.appendChild(design());
    app.appendChild(pricing());
    if (!booked) {
      var expired = holdExpired();
      if (expired) { app.appendChild(expiredBox()); }
      else { app.appendChild(plans()); app.appendChild(agreement()); app.appendChild(reserve()); }
    }
    tick();
  }
  function holdExpired() { return Date.now() > new Date(pr.holdUntil).getTime(); }

  function head(booked) {
    var hold = new Date(pr.holdUntil);
    var meta = [longDate(pr.date), pr.venue, pr.guests + " guests", pr.style, pr.tierName + " level"].filter(Boolean);
    return h("header", { class: "phero" }, [
      h("div", { class: "brand" }, [h("img", { src: "assets/afs-monogram.png", alt: "", width: "56", height: "56" }), h("span", { text: "AFUVAI Floral Society" })]),
      h("p", { class: "eyebrow", text: "Your wedding flowers · " + pr.ref }),
      h("h1", null, ["A proposal for ", h("em", { text: names() || "you" })]),
      h("p", { class: "pmeta", text: meta.join(" · ") }),
      booked ? h("p", { class: "phold ok" }, [h("b", { text: "Your date is reserved." })])
        : holdExpired() ? null
        : h("p", { class: "phold" }, [h("b", { text: "Your date is held for you" }), " until " + whenTime(hold) + ". ", h("span", { id: "countdown", class: "num" })])
    ]);
  }
  function tick() {
    var el = $("countdown"); if (!el) { return; }
    var ms = new Date(pr.holdUntil).getTime() - Date.now();
    if (ms <= 0) { render(); return; }
    var hrs = Math.floor(ms / 3600000), min = Math.floor((ms % 3600000) / 60000);
    el.textContent = hrs + " hr " + min + " min left.";
    clearTimeout(tick.t); tick.t = setTimeout(tick, 30000);
  }
  function note() {
    return h("section", { class: "psec pnote" }, [
      h("p", { class: "eyebrow", text: "A note from " + cfg.business.designer }),
      h("blockquote", { text: pr.note })
    ]);
  }
  function design() {
    var st = E.unpack(cfg, pr.state), t = Math.max(0, cfg.tiers.map(function (x) { return x.key; }).indexOf(pr.tierKey));
    var b = E.board(cfg, st, t);
    var canvas = h("canvas", { width: "440", height: "480", role: "img", "aria-label": "Sketch of your bouquet in your colors" });
    var cols = (st.colors.length ? st.colors : E.style(cfg, st.style).palette).map(function (c) { return [c, COLORS[c]]; });
    setTimeout(function () { BQ.draw(canvas, { colors: cols, tier: t, style: st.style }); }, 0);
    var blooms = h("ul", { class: "pblooms" });
    b.blooms.forEach(function (x) { blooms.appendChild(h("li", null, [h("i", { style: "background:" + (COLORS[x.colors[0]] || "#eee") }), x.n])); });
    b.greens.forEach(function (n) { blooms.appendChild(h("li", null, [h("i", { style: "background:" + COLORS.Sage }), n])); });
    var notes = b.outOfSeason.map(function (o) { return o.n + " is out of season for your date, so we design with " + o.sub + "."; });
    if (b.hot) { notes.push("Outdoor summer date: we lead with heat-hardy blooms and stage everything in shade."); }
    return h("section", { class: "psec pdesign" }, [
      h("div", { class: "part" }, [canvas]),
      h("div", null, [
        h("p", { class: "eyebrow", text: "Your design" }),
        h("h2", { text: pr.style + ", " + pr.tierName.toLowerCase() }),
        h("div", { class: "pswatch" }, b.colors.map(function (c) { return h("span", null, [h("i", { style: "background:" + (COLORS[c] || "#eee") }), c]); })),
        blooms,
        notes.length ? h("p", { class: "hint gold", text: notes.join(" ") }) : null,
        h("p", { class: "hint", text: "Final flower varieties are confirmed at your design lock, " + cfg.payments.lockDaysBefore + " days before your wedding." })
      ])
    ]);
  }
  function pricing() {
    var box = h("div", { class: "plines" });
    var add = function (cls, a, b2) { box.appendChild(h("div", { class: "l " + cls }, [h("span", { text: a }), h("span", { class: "num", text: b2 })])); };
    pr.groups.forEach(function (g) {
      add("g", g.title, money(g.amt));
      pr.lines.filter(function (l) { return l.group === g.key; }).forEach(function (l) {
        add("sec", l.q + " × " + l.nm + (l.moved ? " (" + l.moved + " moved from the ceremony)" : ""), money(l.amt));
      });
    });
    box.appendChild(h("hr"));
    pr.fees.forEach(function (f) { add("sub", f.nm, money(f.amt)); });
    if (pr.adj) { add("sub", pr.adj.label, money(pr.adj.amt)); }
    add("sub", "Sales tax", money(pr.tax));
    add("tot", "Your total", money(pr.total));
    return h("section", { class: "psec" }, [
      h("p", { class: "eyebrow", text: "Your flowers" }),
      h("h2", { text: "Everything in your proposal" }),
      box,
      h("p", { class: "plock" }, [h("b", { text: "Your price is locked. " }), "This total does not change when flower prices move. Add pieces any time until " + cfg.payments.addUntilDaysBefore + " days before your wedding."])
    ]);
  }

  /* ---------- Plans ---------- */
  var planData = null;
  function plans() {
    planData = E.plans(cfg, pr.total, pr.date, new Date(), pr.perkCredit);
    var opts = ["standard", "monthly", "full"].filter(function (k) { return planData[k]; });
    if (!ui.plan || opts.indexOf(ui.plan) < 0) { ui.plan = opts[0]; }
    var P = cfg.payments, sec = h("section", { class: "psec", id: "plans" });
    sec.appendChild(h("p", { class: "eyebrow", text: "Step 1" }));
    sec.appendChild(h("h2", { text: "Choose how you would like to pay" }));
    if (planData.rule === "under" + P.balanceDaysBefore) { sec.appendChild(h("p", { class: "hint", text: "Your wedding is under " + P.balanceDaysBefore + " days away, so your date is reserved with payment in full." })); }
    else if (planData.rule === "under" + P.designDaysBefore) { sec.appendChild(h("p", { class: "hint", text: "Your wedding is under " + P.designDaysBefore + " days away, so the design payment is included with your retainer." })); }
    var grid = h("div", { class: "pplans", role: "radiogroup", "aria-label": "Payment plan" });
    opts.forEach(function (k) {
      var p = planData[k], on = ui.plan === k;
      var desc = k === "standard" ? (p.payments.length === 3 ? "30% today, 30% at 90 days before, the rest at 30 days before." : "60% today, the rest at 30 days before.")
        : k === "monthly" ? p.count + " monthly payments of about " + money(p.each) + " after your retainer."
        : (P.fullPerk ? P.fullPerk.line : "Everything today.");
      var sched = h("ol", { class: "psched" });
      p.payments.forEach(function (x) { sched.appendChild(h("li", null, [h("span", { text: x.now ? "Today" : shortDate(x.due) }), h("span", { text: x.label }), h("span", { class: "num", text: money(x.amt) })])); });
      if (k === "full" && pr.perkCredit) { sched.appendChild(h("li", { class: "perk" }, [h("span", { text: "" }), h("span", { text: "Anniversary flowers, our gift" }), h("span", { class: "num", text: "−" + money(pr.perkCredit) })])); }
      grid.appendChild(h("button", { type: "button", class: "pplan", role: "radio", "aria-checked": on ? "true" : "false", onclick: function () { keepSig(); ui.plan = k; render(); var el = $("plans"); if (el) { el.scrollIntoView({ block: "start" }); } } }, [
        h("span", { class: "pp-top" }, [h("b", { text: p.name }), h("span", { class: "num pp-now", text: money(p.payments[0].amt) + " today" })]),
        h("span", { class: "pp-desc", text: desc }),
        k === "full" && P.fullPerk ? h("span", { class: "pp-perk", text: P.fullPerk.name }) : null,
        on ? sched : null
      ]));
    });
    sec.appendChild(grid);
    if (ui.plan !== "full") { sec.appendChild(h("p", { class: "fine", text: "Scheduled payments are charged automatically to the card or bank account you use today. We email you " + P.reminderDaysBefore + " days before each one." })); }
    return sec;
  }

  function keepSig() { if ($("sig1")) { ui.sig1 = $("sig1").value; ui.sig2 = $("sig2").value; ui.agree = $("agree").checked; } }
  /* ---------- Agreement ---------- */
  function agreement() {
    var A = cfg.booking.agreement, sec = h("section", { class: "psec", id: "agreement" });
    sec.appendChild(h("p", { class: "eyebrow", text: "Step 2" }));
    sec.appendChild(h("h2", { text: "Your agreement" }));
    var ol = h("ol", { class: "pagree" });
    A.forEach(function (c) { ol.appendChild(h("li", null, [h("b", null, [c.h, PREVIEW && c.confirm ? h("em", { text: "To confirm" }) : null]), h("p", { text: fill(c.p) })])); });
    sec.appendChild(h("div", { class: "pagree-box", tabindex: "0", "aria-label": "Agreement terms" }, [ol]));
    if (live.signature) {
      sec.appendChild(h("p", { class: "signed" }, ["Signed by " + [live.signature.name, live.signature.partner].filter(Boolean).join(" and ") + " on " + whenTime(new Date(live.signature.at)) + "."]));
      return sec;
    }
    var c = pr.couple || {};
    var n1 = h("input", { type: "text", id: "sig1", autocomplete: "name", placeholder: c.name || "Full name" });
    var n2 = h("input", { type: "text", id: "sig2", autocomplete: "off", placeholder: c.partner || "Full name" });
    var ok = h("input", { type: "checkbox", id: "agree" });
    n1.value = ui.sig1 || ""; n2.value = ui.sig2 || ""; ok.checked = !!ui.agree;
    sec.appendChild(h("div", { class: "row" }, [
      h("label", { class: "f", for: "sig1" }, ["Type your full name to sign", n1]),
      h("label", { class: "f", for: "sig2" }, ["Partner (optional)", n2])
    ]));
    sec.appendChild(h("label", { class: "check", for: "agree" }, [ok, h("span", null, ["I have read and agree to this agreement" + (ui.plan !== "full" ? ", and I authorize the scheduled payments shown above." : "."), h("small", { text: "Typing your name and checking this box is your electronic signature." })])]));
    return sec;
  }

  /* ---------- Reserve ---------- */
  function reserve() {
    var p = planData[ui.plan], first = p.payments[0].amt;
    var err = h("p", { class: "err", hidden: true, role: "alert" });
    var btn = h("button", { type: "button", class: "btn gold", text: "Sign and reserve my date · " + money(first), onclick: function () { pay(btn, err); } });
    var link = location.href.split("&paid")[0];
    var share = function () {
      var text = "Our wedding flower proposal from AFUVAI. Our date is held until " + whenTime(new Date(pr.holdUntil)) + ".";
      if (navigator.share) { navigator.share({ title: "Wedding flower proposal", text: text, url: link }).catch(function () {}); }
      else if (navigator.clipboard) { navigator.clipboard.writeText(link).then(function () { err.hidden = false; err.className = "toast"; err.textContent = "Link copied. Send it to whoever is paying."; }); }
    };
    var kids = [
      h("p", { class: "eyebrow", text: "Step 3" }),
      h("h2", { text: "Reserve your date" }),
      h("p", { class: "hint", text: "Pay by card, Apple Pay, Google Pay or US bank account on Stripe's secure checkout." }),
      err, btn
    ];
    if (!live.signature) {
      kids.push(h("button", { type: "button", class: "btn ghost", text: "Sign now, someone else is paying", onclick: function () { signOnly(err, share); } }));
    } else {
      kids.push(h("button", { type: "button", class: "btn ghost", text: "Send this page to whoever is paying", onclick: share }));
    }
    kids.push(h("p", { class: "fine", text: "Questions before you reserve? " + cfg.business.designer + " · " + cfg.business.phone }));
    return h("section", { class: "psec preserve" }, kids);
  }
  function readSig(err) {
    if (live.signature) { return live.signature; }
    var n1 = $("sig1").value.trim(), n2 = $("sig2").value.trim();
    if (n1.length < 3) { err.hidden = false; err.className = "err"; err.textContent = "Type your full name to sign."; $("sig1").focus(); return null; }
    if (!$("agree").checked) { err.hidden = false; err.className = "err"; err.textContent = "Check the box to agree."; $("agree").focus(); return null; }
    return { name: n1, partner: n2, at: new Date().toISOString(), version: cfg.booking.agreementVersion, plan: ui.plan };
  }
  function signOnly(err, share) {
    var sig = readSig(err); if (!sig) { return; }
    var done = function () { live.signature = sig; live.status = "signed"; render(); share(); };
    if (PREVIEW) { saveDemo({ status: "signed", signature: sig }); done(); return; }
    post("/sign", { id: ID, signature: sig }).then(done).catch(function (e) { err.hidden = false; err.className = "err"; err.textContent = e.message; });
  }
  function pay(btn, err) {
    var sig = readSig(err); if (!sig) { return; }
    err.hidden = true;
    btn.disabled = true; btn.textContent = "Opening secure checkout";
    if (PREVIEW) {
      var sched = planData[ui.plan].payments.map(function (x) { return { key: x.key, label: x.label, amt: x.amt, due: x.due, paid: !!x.now }; });
      saveDemo({ status: "booked", signature: sig, plan: ui.plan, schedule: sched, bookedAt: new Date().toISOString() });
      setTimeout(function () { live = { status: "booked", signature: sig, plan: ui.plan, schedule: sched }; render(); window.scrollTo(0, 0); }, 900);
      return;
    }
    post("/checkout", { id: ID, plan: ui.plan, signature: sig }).then(function (j) { location.href = j.url; })
      .catch(function (e) { btn.disabled = false; btn.textContent = "Sign and reserve my date"; err.hidden = false; err.className = "err"; err.textContent = e.message; });
  }
  function post(path, body) {
    return fetch(BOOK + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.ok) { throw new Error(j.error || "That did not go through. Try again, or call " + cfg.business.phone + "."); } return j; }); });
  }
  function saveDemo(patch) {
    var list = LS.get("afuvai_demo_proposals") || [], found = false;
    list.forEach(function (x) { if (x.ref === pr.ref) { Object.assign(x, patch); found = true; } });
    if (!found) { list.unshift(Object.assign({}, pr, { link: location.href }, patch)); }
    LS.set("afuvai_demo_proposals", list);
  }

  /* ---------- After booking ---------- */
  function confirmation() {
    var s = live.schedule || [], P = cfg.payments, wd = E.parseDate(pr.date);
    var ol = h("ol", { class: "psched big" });
    s.forEach(function (x) { ol.appendChild(h("li", { class: x.paid ? "paid" : "" }, [h("span", { text: x.paid ? "Paid" : shortDate(x.due) }), h("span", { text: x.label }), h("span", { class: "num", text: money(x.amt) })])); });
    var keys = wd ? [
      ["Final design and guest count", shortDate(E.iso(E.addDays(wd, -P.lockDaysBefore)))],
      ["Last day to add pieces", shortDate(E.iso(E.addDays(wd, -P.addUntilDaysBefore)))],
      ["Everything paid by", shortDate(E.iso(E.addDays(wd, -P.balanceDaysBefore)))]
    ] : [];
    return h("section", { class: "psec pdone" }, [
      h("p", { class: "eyebrow", text: live.status === "processing" ? "Bank transfer clearing" : "Booked" }),
      h("h2", { text: "We are making your wedding flowers." }),
      h("p", { text: live.status === "processing" ? "Your date is reserved while your bank transfer clears, usually within four business days. A confirmation is on its way to your email." : "Your date is reserved and a confirmation is on its way to your email. " + cfg.business.designer + " will be in touch with your next steps." }),
      s.length ? h("div", null, [h("p", { class: "eyebrow", text: "Your payments" }), ol]) : null,
      live.plan === "full" && P.fullPerk ? h("p", { class: "hint gold", text: P.fullPerk.name + " are reserved for your first anniversary." }) : null,
      h("dl", { class: "pkeys" }, keys.map(function (k) { return h("div", null, [h("dt", { text: k[0] }), h("dd", { text: k[1] })]); }))
    ]);
  }
  function expiredBox() {
    var mail = "mailto:" + cfg.business.email + "?subject=" + encodeURIComponent("Is " + longDate(pr.date) + " still open? (" + pr.ref + ")");
    return h("section", { class: "psec preserve" }, [
      h("p", { class: "eyebrow", text: "Date hold ended" }),
      h("h2", { text: "Your " + cfg.payments.holdHours + "-hour hold ended " + whenTime(new Date(pr.holdUntil)) + "." }),
      h("p", { text: "Your date may still be open. Reach " + cfg.business.designer + " and she will check her calendar and send a fresh proposal." }),
      h("a", { class: "btn gold", href: mail, text: "Email " + cfg.business.designer }),
      h("a", { class: "btn ghost", href: "tel:" + cfg.business.phone.replace(/[^\d+]/g, ""), text: "Call " + cfg.business.phone })
    ]);
  }

  load();
})();
