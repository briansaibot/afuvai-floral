/* Live bouquet sketch: redraws in the couple's colors, fuller at each tier. Pure canvas, no assets. */
(function (root) {
  function hexToRgb(h) { h = h.replace("#", ""); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
  function mix(rgb, to, a) { return [0, 1, 2].map(function (i) { return Math.round(rgb[i] + (to[i] - rgb[i]) * a); }); }
  function css(rgb, al) { return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (al == null ? 1 : al) + ")"; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h; }

  var GREEN = { "Sage": 1, "Green": 1 };

  function rose(ctx, x, y, r, base, rand) {
    var dark = mix(base, [40, 30, 30], 0.28), light = mix(base, [255, 255, 255], 0.35), mid = mix(base, [60, 40, 40], 0.12);
    var n = 7, rot = rand() * Math.PI;
    for (var i = 0; i < n; i++) {
      var a = rot + i * (Math.PI * 2 / n);
      ctx.save(); ctx.translate(x + Math.cos(a) * r * 0.42, y + Math.sin(a) * r * 0.42); ctx.rotate(a);
      ctx.beginPath(); ctx.ellipse(0, 0, r * 0.52, r * 0.42, 0, 0, Math.PI * 2);
      ctx.fillStyle = css(i % 2 ? base : mid); ctx.fill();
      ctx.strokeStyle = css(dark, 0.35); ctx.lineWidth = Math.max(0.6, r * 0.04); ctx.stroke();
      ctx.restore();
    }
    var g = ctx.createRadialGradient(x - r * 0.15, y - r * 0.2, r * 0.05, x, y, r * 0.62);
    g.addColorStop(0, css(light)); g.addColorStop(1, css(base));
    ctx.beginPath(); ctx.arc(x, y, r * 0.6, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = css(dark, 0.55); ctx.lineWidth = Math.max(0.7, r * 0.05); ctx.lineCap = "round";
    for (var k = 0; k < 3; k++) {
      ctx.beginPath(); ctx.arc(x + (rand() - 0.5) * r * 0.08, y + (rand() - 0.5) * r * 0.08, r * (0.18 + k * 0.13), rot + k * 1.7, rot + k * 1.7 + Math.PI * (1.1 + rand() * 0.4)); ctx.stroke();
    }
  }
  function bloom(ctx, x, y, r, base, rand) { /* open bloom: ranunculus/anemone feel */
    var dark = mix(base, [30, 25, 25], 0.3), n = 10;
    for (var i = 0; i < n; i++) {
      var a = i * (Math.PI * 2 / n) + rand() * 0.2;
      ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * r * 0.5, y + Math.sin(a) * r * 0.5, r * 0.45, r * 0.26, a, 0, Math.PI * 2);
      ctx.fillStyle = css(mix(base, [255, 255, 255], 0.12 * (i % 3))); ctx.fill();
      ctx.strokeStyle = css(dark, 0.3); ctx.lineWidth = Math.max(0.5, r * 0.035); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(x, y, r * 0.24, 0, Math.PI * 2); ctx.fillStyle = css(mix(base, [40, 35, 30], 0.55)); ctx.fill();
  }
  function leaf(ctx, x, y, len, ang, col) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.5, -len * 0.28, len, 0); ctx.quadraticCurveTo(len * 0.5, len * 0.28, 0, 0);
    ctx.fillStyle = css(col); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len * 0.92, 0); ctx.strokeStyle = css(mix(col, [20, 30, 20], 0.35), 0.6); ctx.lineWidth = 0.8; ctx.stroke();
    ctx.restore();
  }
  function plume(ctx, x, y, len, ang, col, rand) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = css(col, 0.55); ctx.lineWidth = 1;
    for (var i = 0; i < 26; i++) { var t = i / 26; ctx.beginPath(); ctx.moveTo(len * t, 0); ctx.lineTo(len * t + len * 0.12, (rand() - 0.5) * len * 0.35 * (1 - t * 0.6)); ctx.stroke(); }
    ctx.restore();
  }

  /* opts: colors [[name,hex]...], tier 0-2, style key */
  function draw(canvas, opts) {
    if (!canvas || !canvas.getContext) { return; }
    var ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    var tier = opts.tier || 0, style = opts.style || "garden";
    var flowers = opts.colors.filter(function (c) { return !GREEN[c[0]]; });
    if (!flowers.length) { flowers = [["Ivory", "#f3ecdc"]]; }
    var greens = opts.colors.filter(function (c) { return GREEN[c[0]]; });
    var leafCol = hexToRgb(greens.length ? greens[0][1] : "#8d9a7e");
    var rand = rng(hash(opts.colors.map(function (c) { return c[0]; }).join() + tier + style));
    var s = W / 220, cx = W / 2, cy = H * 0.4;
    var count = [9, 14, 20][tier], spread = [52, 60, 70][tier] * s;
    if (style === "modern") { count = [5, 7, 10][tier]; spread *= 0.8; }

    /* stems */
    ctx.strokeStyle = css(mix(leafCol, [40, 55, 40], 0.4)); ctx.lineWidth = 2.2 * s; ctx.lineCap = "round";
    for (var i = 0; i < 9; i++) { var off = (i - 4) * 4 * s; ctx.beginPath(); ctx.moveTo(cx + off * 2.2, cy + 10 * s); ctx.quadraticCurveTo(cx + off, cy + 70 * s, cx + off * 0.55, H * 0.94); ctx.stroke(); }
    /* ribbon */
    var gold = [217, 169, 78];
    ctx.fillStyle = css(gold); ctx.fillRect(cx - 18 * s, H * 0.7, 36 * s, 14 * s);
    ctx.beginPath(); ctx.moveTo(cx - 4 * s, H * 0.72); ctx.quadraticCurveTo(cx - 22 * s, H * 0.84, cx - 26 * s, H * 0.92); ctx.lineTo(cx - 18 * s, H * 0.9); ctx.quadraticCurveTo(cx - 12 * s, H * 0.8, cx, H * 0.73); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + 4 * s, H * 0.72); ctx.quadraticCurveTo(cx + 18 * s, H * 0.83, cx + 28 * s, H * 0.9); ctx.lineTo(cx + 20 * s, H * 0.92); ctx.quadraticCurveTo(cx + 10 * s, H * 0.82, cx, H * 0.73); ctx.fill();

    /* foliage behind */
    var leaves = style === "modern" ? 6 : 12 + tier * 4;
    for (var l = 0; l < leaves; l++) {
      var a = Math.PI + (l / (leaves - 1)) * Math.PI + (rand() - 0.5) * 0.3;
      var col = mix(leafCol, [255, 255, 255], rand() * 0.25);
      leaf(ctx, cx + Math.cos(a) * spread * 0.55, cy + Math.sin(a) * spread * 0.45, (30 + rand() * 18) * s, a, col);
    }
    if (style === "boho") { for (var p = 0; p < 4; p++) { var pa = Math.PI * 1.15 + p * 0.25 + rand() * 0.1; plume(ctx, cx + Math.cos(pa) * spread * 0.5, cy + Math.sin(pa) * spread * 0.4, 44 * s, pa, [214, 196, 160], rand); } }

    /* blooms on a dome, back to front */
    var pts = [], golden = Math.PI * (3 - Math.sqrt(5));
    for (var k = 0; k < count; k++) {
      var rr = Math.sqrt((k + 0.5) / count), th = k * golden + rand() * 0.3;
      pts.push({ x: cx + Math.cos(th) * rr * spread, y: cy + Math.sin(th) * rr * spread * 0.72, r: (17 - rr * 3 + rand() * 4) * s * (tier === 2 ? 0.95 : 1), c: flowers[k % flowers.length] });
    }
    pts.sort(function (a, b) { return a.y - b.y; });
    pts.forEach(function (pt, idx) {
      var base = hexToRgb(pt.c[1]);
      if (pt.c[0] === "White" || pt.c[0] === "Ivory") { base = mix(base, [215, 205, 185], 0.12); }
      if ((idx % 4 === 3 && style !== "modern") || style === "boho" && idx % 3 === 0) { bloom(ctx, pt.x, pt.y, pt.r, base, rand); }
      else { rose(ctx, pt.x, pt.y, pt.r, base, rand); }
    });
    /* filler sprigs */
    var dots = style === "modern" ? 0 : 10 + tier * 8;
    for (var d = 0; d < dots; d++) {
      var da = rand() * Math.PI * 2, dr = Math.sqrt(rand()) * spread * 1.02;
      var fc = flowers[(d + 1) % flowers.length];
      ctx.beginPath(); ctx.arc(cx + Math.cos(da) * dr, cy + Math.sin(da) * dr * 0.72, (1.6 + rand() * 1.6) * s, 0, Math.PI * 2);
      ctx.fillStyle = css(mix(hexToRgb(fc[1]), [255, 255, 255], 0.25)); ctx.fill();
    }
  }
  root.AFUVAI_BOUQUET = { draw: draw };
})(typeof self !== "undefined" ? self : this);
