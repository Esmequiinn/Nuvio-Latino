var P = Object.defineProperty, C = Object.defineProperties, N = Object.getOwnPropertyDescriptor, O = Object.getOwnPropertyDescriptors, z = Object.getOwnPropertyNames, b = Object.getOwnPropertySymbols;
var H = Object.prototype.hasOwnProperty, B = Object.prototype.propertyIsEnumerable;
var A = (t, n, o) => n in t ? P(t, n, { enumerable: true, configurable: true, writable: true, value: o }) : t[n] = o, S = (t, n) => {
  for (var o in n || (n = {}))
    H.call(n, o) && A(t, o, n[o]);
  if (b)
    for (var o of b(n))
      B.call(n, o) && A(t, o, n[o]);
  return t;
}, R = (t, n) => C(t, O(n));
var D = (t, n) => {
  for (var o in n)
    P(t, o, { get: n[o], enumerable: true });
}, F = (t, n, o, r) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let s of z(n))
      !H.call(t, s) && s !== o && P(t, s, { get: () => n[s], enumerable: !(r = N(n, s)) || r.enumerable });
  return t;
};
var K = (t) => F(P({}, "__esModule", { value: true }), t);
var g = (t, n, o) => new Promise((r, s) => {
  var a = (i) => {
    try {
      c(o.next(i));
    } catch (m) {
      s(m);
    }
  }, p = (i) => {
    try {
      c(o.throw(i));
    } catch (m) {
      s(m);
    }
  }, c = (i) => i.done ? r(i.value) : Promise.resolve(i.value).then(a, p);
  c((o = o.apply(t, n)).next());
});
var te = {};
D(te, { getStreams: () => ee });
module.exports = K(te);
var j = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", w = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, q = ["x", "o", "h", "n", "l"];
function Y(t) {
  return t.includes("vimeos") ? w.vimeos : t.includes("goodstream") ? w.goodstream : t.includes("cloudwindow-route") ? w.voe : t.includes("minochinos") || t.includes("vidhide") || t.includes("dintezuvio") || t.includes("dramiyos") ? w.vidhide : t.includes("premilkyway") || t.includes("hlswish") || t.includes("vibuxer") || t.includes("streamwish") ? w.streamwish : null;
}
function M(o) {
  return g(this, arguments, function* (t, n = {}) {
    let r = G(t);
    return r !== "Unknown" ? r : yield Z(t, n);
  });
}
function G(t) {
  if (!t)
    return "Unknown";
  let n = Y(t);
  if (n) {
    let r = t.match(/_,([a-z,]+),\.urlset/);
    if (r) {
      let s = r[1].split(",").filter(Boolean);
      for (let a of q)
        if (s.includes(a) && n[a])
          return n[a];
    }
  }
  let o = t.match(/[_\-\/](\d{3,4})p/);
  return o ? o[1] + "p" : "Unknown";
}
function X(t, n) {
  return t >= 3840 || n >= 2160 ? "4K" : t >= 1920 || n >= 1080 ? "1080p" : t >= 1280 || n >= 720 ? "720p" : t >= 854 || n >= 480 ? "480p" : "360p";
}
function Z(o) {
  return g(this, arguments, function* (t, n = {}) {
    try {
      console.log("[detectQuality] Fetching:", t.substring(0, 80));
      let r = yield fetch(t, { headers: S({ "User-Agent": j }, n), redirect: "follow" });
      console.log("[detectQuality] Status:", r.status, "ok:", r.ok);
      let s = yield r.text();
      if (console.log("[detectQuality] Response length:", s.length, "primeros 100:", s.substring(0, 100)), !s.includes("#EXT-X-STREAM-INF")) {
        let c = t.match(/[_-](\d{3,4})p/);
        return c ? `${c[1]}p` : "Unknown";
      }
      let a = 0, p = 0;
      for (let c of s.split(`
`)) {
        let i = c.match(/RESOLUTION=(\d+)x(\d+)/);
        if (i) {
          let m = parseInt(i[2]);
          m > p && (p = m, a = parseInt(i[1]));
        }
      }
      return p > 0 ? X(a, p) : "Unknown";
    } catch (r) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var I = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", f = "https://player.pelisserieshoy.com", E = "439c478a771f35c05022f9feabcca01c", J = ["LAT", "ESP", "SUB"];
function V(t, n) {
  return g(this, null, function* () {
    let o = n === "movie" ? `https://api.themoviedb.org/3/movie/${t}/external_ids?api_key=${E}` : `https://api.themoviedb.org/3/tv/${t}/external_ids?api_key=${E}`;
    return (yield fetch(o, { headers: { "User-Agent": I } }).then((s) => s.json())).imdb_id || null;
  });
}
function ee(t, n, o, r) {
  return g(this, null, function* () {
    if (!t || !n)
      return [];
    let s = Date.now();
    console.log(`[PelisSeriesHoy] Buscando: TMDB ${t} (${n})`);
    try {
      let L2 = function(u, y, $) {
        return g(this, null, function* () {
          try {
            let d = yield fetch(`${f}/s.php`, { method: "POST", headers: R(S({}, i), { Referer: c }), body: new URLSearchParams({ a: "2", v: y, tok: k }).toString() }).then((T) => T.json());
            if (!d || !d.u)
              return null;
            let l = d.u;
            l.startsWith("/") && (l = `${f}${l}`);
            let h = u.replace(/[^a-zA-Z0-9 ]/g, "").trim() || d.src || "Server", v = d.quality || d.q || (yield M(l)), W = l.includes("sprintcdn") || l.includes("r66nv9ed") || h.toLowerCase().includes("filemoon");
            if (l.includes("p.php?v=") || W)
              return console.log(`[PelisSeriesHoy] \u{1F5D1}\uFE0F Descartando servidor problem\xE1tico (HTML/Filemoon): ${h}`), null;
            if (d.sig) {
              let T = `${f}/p.php?url=${encodeURIComponent(l)}&sig=${encodeURIComponent(d.sig)}`;
              return { name: "PelisSeriesHoy", title: `${v} \xB7 ${$} \xB7 ${h}`, url: T, quality: v, headers: { Referer: f } };
            }
            return d.type === "mp4" || l.includes(".mp4") || l.includes(".m3u8") ? { name: "PelisSeriesHoy", title: `${v} \xB7 ${$} \xB7 ${h}`, url: l, quality: v, headers: { Referer: f } } : null;
          } catch (d) {
            console.log(`[PelisSeriesHoy] Error en resolver ${u}: ${d.message}`);
          }
          return null;
        });
      };
      var L = L2;
      let a = yield V(t, n);
      if (!a)
        return [];
      let p = a;
      if (n === "tv") {
        let u = String(r).padStart(2, "0");
        p = `${a}-${parseInt(o)}x${u}`;
      }
      let c = `${f}/f/${p}`;
      console.log(`[PelisSeriesHoy] Fetching HTML: ${c}`);
      let i = { "User-Agent": I, Referer: "https://sololatino.net/", "Content-Type": "application/x-www-form-urlencoded" }, _ = (yield fetch(c, { headers: i }).then((u) => u.text())).match(/const _t\s*=\s*'([^']+)'/);
      if (!_)
        return console.log("[PelisSeriesHoy] No se encontr\xF3 el token de sesi\xF3n (_t)"), [];
      let k = _[1];
      yield fetch(`${f}/s.php`, { method: "POST", headers: R(S({}, i), { Referer: c }), body: new URLSearchParams({ a: "click", tok: k }).toString() });
      let x = yield fetch(`${f}/s.php`, { method: "POST", headers: R(S({}, i), { Referer: c }), body: new URLSearchParams({ a: "1", tok: k }).toString() }).then((u) => u.json());
      if (!x || !x.langs_s)
        return [];
      let U = [];
      for (let u of J) {
        let y = x.langs_s[u];
        if (!y || y.length === 0)
          continue;
        let $ = u === "LAT" ? "Latino" : u === "ESP" ? "Espa\xF1ol" : "Subtitulado";
        console.log(`[PelisSeriesHoy] Resolviendo ${y.length} servidores en ${$}...`);
        let l = (yield Promise.all(y.map((h) => L2(h[0], h[1], $)))).filter((h) => h !== null);
        if (l.length > 0) {
          U.push(...l);
          break;
        }
      }
      let Q = ((Date.now() - s) / 1e3).toFixed(2);
      return console.log(`[PelisSeriesHoy] \u2713 ${U.length} streams en ${Q}s`), U;
    } catch (a) {
      return console.error(`[PelisSeriesHoy] Error: ${a.message}`), [];
    }
  });
}
