/* AFUVAI proposal status board for NOVA and AmiDayne.
 * Live: reads /api/admin/proposals with the admin key. Preview: reads proposals created in Consult Mode in this browser.
 */
(function () {
  "use strict";
  var cfg = window.AFUVAI_CONFIG, E = window.AFUVAI_ENGINE;
  var BOOK = E.bookingBase(cfg, location), PREVIEW = !BOOK;
  var $ = function (id) { return document.getElementById(id); };
  var money = function (n) { n = Math.round(n); return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US"); };
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var sd = function (iso) { var d = E.parseDate((iso || "").slice(0, 10)); return d ? MON[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() : ""; };
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
  var STATUS = {
    sent: "Sent, date held", signed: "Signed, awaiting payment", processing: "Booked, bank transfer clearing", booked: "Booked",
    paid: "Paid in full", expired: "Hold ended", failed: "Payment failed", cancelled: "Cancelled"
  };
  var rows = [], filter = "all";

  /* One view model per proposal, the same for preview and live records. */
  function view(x) {
    var now = Date.now(), status = x.status || "sent";
    if ((status === "sent" || status === "signed") && new Date(x.holdUntil).getTime() < now) { status = "expired"; }
    var sched = x.schedule || [], paid = 0, next = null;
    sched.forEach(function (p) { if (p.paid) { paid += p.amt; } else if (!next) { next = p; } });
    if ((status === "booked") && sched.length && !next) { status = "paid"; }
    if (sched.some(function (p) { return p.failed && !p.paid; })) { status = "failed"; }
    var hoursLeft = (new Date(x.holdUntil).getTime() - now) / 3600000;
    return { x: x, status: status, paid: paid, next: next, hoursLeft: hoursLeft,
      open: status === "sent" || status === "signed", noteDue: (status === "sent" || status === "signed") && hoursLeft <= (cfg.payments.holdHours - cfg.payments.noteAtHours) && !x.noteSentAt };
  }
  function holdNote(x) {
    var first = ((x.couple && x.couple.name) || "").split(" ")[0] || "there";
    var hrs = Math.max(1, Math.round((new Date(x.holdUntil).getTime() - Date.now()) / 3600000));
    return cfg.booking.holdNote.replace("{first}", first).replace("{date}", sd(x.date)).replace("{hours}", hrs).replace("{link}", x.link || "");
  }

  function load() {
    if (PREVIEW) {
      $("previewNote").hidden = false;
      $("previewNote").textContent = "Preview: showing proposals created in Consult Mode on this device. Once live, this shows every proposal for both of you.";
      rows = (LS.get("afuvai_demo_proposals") || []).map(view); render(); return;
    }
    var key = LS.get("afuvai_admin_key") || window.prompt("Admin key");
    if (!key) { return; }
    fetch(BOOK + "/admin/proposals", { headers: { "x-admin-key": key } }).then(function (r) {
      if (r.status === 401) { LS.set("afuvai_admin_key", null); throw new Error("That admin key did not work. Reload to try again."); }
      return r.json();
    }).then(function (j) { LS.set("afuvai_admin_key", key); rows = (j.proposals || []).map(view); render(); })
      .catch(function (e) { $("list").textContent = e.message || "Could not load proposals."; });
  }

  function render() {
    var c = { open: 0, booked: 0, value: 0, due30: 0 }, soon = Date.now() + 30 * 86400000;
    rows.forEach(function (r) {
      if (r.open) { c.open++; }
      if (["booked", "paid", "processing", "failed"].indexOf(r.status) > -1) { c.booked++; c.value += r.x.total; }
      (r.x.schedule || []).forEach(function (p) { if (!p.paid && E.parseDate(p.due) && E.parseDate(p.due).getTime() <= soon) { c.due30 += p.amt; } });
    });
    var st = $("stats"); st.innerHTML = "";
    [["Open holds", c.open], ["Booked", c.booked], ["Booked value", money(c.value)], ["Due next 30 days", money(c.due30)]].forEach(function (s) {
      st.appendChild(h("div", null, [h("span", { text: s[0] }), h("b", { class: "num", text: String(s[1]) })]));
    });
    var fh = $("filters"); fh.innerHTML = "";
    [["all", "All"], ["open", "Open holds"], ["booked", "Booked"], ["attention", "Needs attention"], ["closed", "Ended"]].forEach(function (f) {
      fh.appendChild(h("button", { type: "button", class: "chip", "aria-pressed": filter === f[0] ? "true" : "false", onclick: function () { filter = f[0]; render(); } }, [f[1]]));
    });
    var list = $("list"); list.innerHTML = "";
    var shown = rows.filter(function (r) {
      if (filter === "open") { return r.open; }
      if (filter === "booked") { return ["booked", "paid", "processing"].indexOf(r.status) > -1; }
      if (filter === "attention") { return r.status === "failed" || r.noteDue || (r.open && r.hoursLeft < 12); }
      if (filter === "closed") { return r.status === "expired" || r.status === "cancelled"; }
      return true;
    }).sort(function (a, b) { return (a.open === b.open) ? (a.x.date < b.x.date ? -1 : 1) : (a.open ? -1 : 1); });
    if (!shown.length) { list.appendChild(h("p", { class: "hint", text: rows.length ? "Nothing here." : "No proposals yet. Create one in Consult Mode." })); }
    shown.forEach(function (r) { list.appendChild(card(r)); });
    $("foot").textContent = "Updated " + new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) + ".";
  }

  function card(r) {
    var x = r.x, c = x.couple || {};
    var who = [c.name, c.partner].filter(Boolean).join(" & ") || "Couple";
    var line2 = [sd(x.date), x.venue, x.tierName, money(x.total)].filter(Boolean).join(" · ");
    var facts = [];
    if (r.open) { facts.push(["Hold", r.hoursLeft > 0 ? Math.floor(r.hoursLeft) + " hr left" : "ending"]); }
    if (x.plan) { facts.push(["Plan", { standard: "Standard", monthly: "Monthly", full: "Pay in full" }[x.plan] || x.plan]); }
    if (x.schedule) { facts.push(["Paid", money(r.paid) + " of " + money(x.schedule.reduce(function (t, p) { return t + p.amt; }, 0))]); }
    if (r.next) { facts.push(["Next", money(r.next.amt) + " on " + sd(r.next.due)]); }
    if (x.signature) { facts.push(["Signed", x.signature.name]); }
    var acts = h("div", { class: "sacts" });
    if (x.link || x.id) { acts.appendChild(h("a", { class: "linkbtn", href: x.link || ("proposal.html?id=" + x.id), target: "_blank", rel: "noopener", text: "Open proposal" })); }
    if (r.open) {
      var note = holdNote(x);
      acts.appendChild(h("a", { class: "linkbtn", href: "sms:" + (c.phone || "") + "?&body=" + encodeURIComponent(note), text: "Text Ami's note" }));
      acts.appendChild(h("a", { class: "linkbtn", href: "mailto:" + (c.email || "") + "?subject=" + encodeURIComponent("Still holding your date") + "&body=" + encodeURIComponent(note), text: "Email Ami's note" }));
    }
    if (c.email) { acts.appendChild(h("a", { class: "linkbtn", href: "mailto:" + c.email, text: c.email })); }
    if (!PREVIEW && x.id && r.status !== "cancelled" && r.status !== "expired") {
      acts.appendChild(h("button", { type: "button", class: "linkbtn", text: "Cancel", onclick: function () {
        var why = window.prompt("Cancel " + who + " (" + sd(x.date) + ")? This releases the date and stops scheduled payments. It does not refund. Type a reason to confirm:");
        if (!why) { return; }
        fetch(BOOK + "/admin/cancel", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-key": LS.get("afuvai_admin_key") || "" }, body: JSON.stringify({ id: x.id, reason: why }) })
          .then(function (res) { if (!res.ok) { throw new Error(); } x.status = "cancelled"; rows = rows.map(function (rr) { return view(rr.x); }); render(); })
          .catch(function () { window.alert("Could not cancel. Check the studio password and try again."); });
      } }));
    }
    return h("article", { class: "scard s-" + r.status }, [
      h("div", { class: "stop" }, [h("b", { text: who }), h("span", { class: "spill", text: STATUS[r.status] || r.status })]),
      h("p", { class: "hint", text: line2 + " · " + x.ref }),
      r.noteDue ? h("p", { class: "snote", text: x.noteSentAt ? "" : (PREVIEW ? "48 hours in: time for Ami's note." : "48 hours in: Ami's note goes out automatically.") }) : null,
      facts.length ? h("dl", { class: "sfacts" }, facts.map(function (f) { return h("div", null, [h("dt", { text: f[0] }), h("dd", { class: "num", text: f[1] })]); })) : null,
      acts
    ]);
  }
  load();
  setInterval(function () { rows = rows.map(function (r) { return view(r.x); }); render(); }, 60000);
})();
