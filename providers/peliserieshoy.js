var S = Object.defineProperty, E = Object.defineProperties, q = Object.getOwnPropertyDescriptor, C = Object.getOwnPropertyDescriptors, D = Object.getOwnPropertyNames, _ = Object.getOwnPropertySymbols;
var H = Object.prototype.hasOwnProperty, M = Object.prototype.propertyIsEnumerable;
var A = (t, e, o) => e in t ? S(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, $ = (t, e) => {
  for (var o in e || (e = {}))
    H.call(e, o) && A(t, o, e[o]);
  if (_)
    for (var o of _(e))
      M.call(e, o) && A(t, o, e[o]);
  return t;
}, y = (t, e) => E(t, C(e));
var B = (t, e) => {
  for (var o in e)
    S(t, o, { get: e[o], enumerable: true });
}, I = (t, e, o, h) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of D(e))
      !H.call(t, r) && r !== o && S(t, r, { get: () => e[r], enumerable: !(h = q(e, r)) || h.enumerable });
  return t;
};
var N = (t) => I(S({}, "__esModule", { value: true }), t);
var P = (t, e, o) => new Promise((h, r) => {
  var u = (a) => {
    try {
      i(o.next(a));
    } catch (f) {
      r(f);
    }
  }, m = (a) => {
    try {
      i(o.throw(a));
    } catch (f) {
      r(f);
    }
  }, i = (a) => a.done ? h(a.value) : Promise.resolve(a.value).then(u, m);
  i((o = o.apply(t, e)).next());
});
var K = {};
B(K, { getStreams: () => z });
module.exports = N(K);
var T = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", p = "https://player.pelisserieshoy.com", L = "439c478a771f35c05022f9feabcca01c", O = ["LAT", "ESP", "SUB"];
function j(t, e) {
  return P(this, null, function* () {
    let o = e === "movie" ? `https://api.themoviedb.org/3/movie/${t}/external_ids?api_key=${L}` : `https://api.themoviedb.org/3/tv/${t}/external_ids?api_key=${L}`;
    return (yield fetch(o, { headers: { "User-Agent": T } }).then((r) => r.json())).imdb_id || null;
  });
}
function z(t, e, o, h) {
  return P(this, null, function* () {
    if (!t || !e)
      return [];
    let r = Date.now();
    console.log(`[PelisSeriesHoy] Buscando: TMDB ${t} (${e})`);
    try {
      let x2 = function(n, d, g) {
        return P(this, null, function* () {
          try {
            let s = yield fetch(`${p}/s.php`, { method: "POST", headers: y($({}, a), { Referer: i }), body: new URLSearchParams({ a: "2", v: d, tok: w }).toString() }).then((l) => l.json());
            if (s.u && s.sig) {
              let l = `${p}/p.php?url=${encodeURIComponent(s.u)}&sig=${encodeURIComponent(s.sig)}`, c = n.replace(/[^a-zA-Z0-9 ]/g, "").trim() || s.src || "Server", U = s.quality || s.q || "Unknown";
              return { name: "PelisSeriesHoy", title: `${U} \xB7 ${g} \xB7 ${c}`, url: l, quality: U, headers: { Referer: p } };
            }
            if (s.type === "mp4" && s.u) {
              let l = n.replace(/[^a-zA-Z0-9 ]/g, "").trim() || "Directo", c = s.quality || s.q || "Unknown";
              return { name: "PelisSeriesHoy", title: `${c} \xB7 ${g} \xB7 ${l}`, url: s.u, quality: c, headers: { Referer: p } };
            }
          } catch (s) {
            console.log(`[PelisSeriesHoy] Error en resolver ${n}: ${s.message}`);
          }
          return null;
        });
      };
      var x = x2;
      let u = yield j(t, e);
      if (!u)
        return [];
      let m = u;
      if (e === "tv") {
        let n = String(h).padStart(2, "0");
        m = `${u}-${parseInt(o)}x${n}`;
      }
      let i = `${p}/f/${m}`;
      console.log(`[PelisSeriesHoy] Fetching HTML: ${i}`);
      let a = { "User-Agent": T, Referer: "https://sololatino.net/", "Content-Type": "application/x-www-form-urlencoded" }, k = (yield fetch(i, { headers: a }).then((n) => n.text())).match(/const _t\s*=\s*'([^']+)'/);
      if (!k)
        return console.log("[PelisSeriesHoy] No se encontr\xF3 el token de sesi\xF3n (_t)"), [];
      let w = k[1];
      yield fetch(`${p}/s.php`, { method: "POST", headers: y($({}, a), { Referer: i }), body: new URLSearchParams({ a: "click", tok: w }).toString() });
      let v = yield fetch(`${p}/s.php`, { method: "POST", headers: y($({}, a), { Referer: i }), body: new URLSearchParams({ a: "1", tok: w }).toString() }).then((n) => n.json());
      if (!v || !v.langs_s)
        return [];
      let R = [];
      for (let n of O) {
        let d = v.langs_s[n];
        if (!d || d.length === 0)
          continue;
        let g = n === "LAT" ? "Latino" : n === "ESP" ? "Espa\xF1ol" : "Subtitulado";
        console.log(`[PelisSeriesHoy] Resolviendo ${d.length} servidores en ${g}...`);
        let l = (yield Promise.all(d.map((c) => x2(c[0], c[1], g)))).filter((c) => c !== null);
        if (l.length > 0) {
          R.push(...l);
          break;
        }
      }
      let b = ((Date.now() - r) / 1e3).toFixed(2);
      return console.log(`[PelisSeriesHoy] \u2713 ${R.length} streams en ${b}s`), R;
    } catch (u) {
      return console.error(`[PelisSeriesHoy] Error: ${u.message}`), [];
    }
  });
}
