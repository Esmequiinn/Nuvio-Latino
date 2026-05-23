var S = Object.defineProperty, b = Object.defineProperties, E = Object.getOwnPropertyDescriptor, C = Object.getOwnPropertyDescriptors, D = Object.getOwnPropertyNames, k = Object.getOwnPropertySymbols;
var A = Object.prototype.hasOwnProperty, M = Object.prototype.propertyIsEnumerable;
var U = (t, e, s) => e in t ? S(t, e, { enumerable: true, configurable: true, writable: true, value: s }) : t[e] = s, $ = (t, e) => {
  for (var s in e || (e = {}))
    A.call(e, s) && U(t, s, e[s]);
  if (k)
    for (var s of k(e))
      M.call(e, s) && U(t, s, e[s]);
  return t;
}, y = (t, e) => b(t, C(e));
var B = (t, e) => {
  for (var s in e)
    S(t, s, { get: e[s], enumerable: true });
}, I = (t, e, s, l) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of D(e))
      !A.call(t, r) && r !== s && S(t, r, { get: () => e[r], enumerable: !(l = E(e, r)) || l.enumerable });
  return t;
};
var N = (t) => I(S({}, "__esModule", { value: true }), t);
var P = (t, e, s) => new Promise((l, r) => {
  var h = (n) => {
    try {
      i(s.next(n));
    } catch (f) {
      r(f);
    }
  }, m = (n) => {
    try {
      i(s.throw(n));
    } catch (f) {
      r(f);
    }
  }, i = (n) => n.done ? l(n.value) : Promise.resolve(n.value).then(h, m);
  i((s = s.apply(t, e)).next());
});
var K = {};
B(K, { getStreams: () => z });
module.exports = N(K);
var L = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", p = "https://player.pelisserieshoy.com", H = "439c478a771f35c05022f9feabcca01c", O = ["LAT", "ESP", "SUB"];
function j(t, e) {
  return P(this, null, function* () {
    let s = e === "movie" ? `https://api.themoviedb.org/3/movie/${t}/external_ids?api_key=${H}` : `https://api.themoviedb.org/3/tv/${t}/external_ids?api_key=${H}`;
    return (yield fetch(s, { headers: { "User-Agent": L } }).then((r) => r.json())).imdb_id || null;
  });
}
function z(t, e, s, l) {
  return P(this, null, function* () {
    if (!t || !e)
      return [];
    let r = Date.now();
    console.log(`[PelisSeriesHoy] Buscando: TMDB ${t} (${e})`);
    try {
      let T2 = function(o, u, g) {
        return P(this, null, function* () {
          try {
            let a = yield fetch(`${p}/s.php`, { method: "POST", headers: y($({}, n), { Referer: i }), body: new URLSearchParams({ a: "2", v: u, tok: v }).toString() }).then((c) => c.json());
            if (a.u && a.sig) {
              let c = `${p}/p.php?url=${encodeURIComponent(a.u)}&sig=${encodeURIComponent(a.sig)}`, d = o.replace(/[^a-zA-Z0-9 ]/g, "").trim() || a.src || "Server";
              return { name: "PelisSeriesHoy", title: `1080p \xB7 ${g} \xB7 ${d}`, url: c, quality: "1080p", headers: { Referer: p } };
            }
            if (a.type === "mp4" && a.u) {
              let c = o.replace(/[^a-zA-Z0-9 ]/g, "").trim() || "Directo";
              return { name: "PelisSeriesHoy", title: `1080p \xB7 ${g} \xB7 ${c}`, url: a.u, quality: "1080p", headers: { Referer: p } };
            }
          } catch (a) {
            console.log(`[PelisSeriesHoy] Error en resolver ${o}: ${a.message}`);
          }
          return null;
        });
      };
      var T = T2;
      let h = yield j(t, e);
      if (!h)
        return [];
      let m = h;
      if (e === "tv") {
        let o = String(l).padStart(2, "0");
        m = `${h}-${parseInt(s)}x${o}`;
      }
      let i = `${p}/f/${m}`;
      console.log(`[PelisSeriesHoy] Fetching HTML: ${i}`);
      let n = { "User-Agent": L, Referer: "https://sololatino.net/", "Content-Type": "application/x-www-form-urlencoded" }, _ = (yield fetch(i, { headers: n }).then((o) => o.text())).match(/const _t\s*=\s*'([^']+)'/);
      if (!_)
        return console.log("[PelisSeriesHoy] No se encontr\xF3 el token de sesi\xF3n (_t)"), [];
      let v = _[1];
      yield fetch(`${p}/s.php`, { method: "POST", headers: y($({}, n), { Referer: i }), body: new URLSearchParams({ a: "click", tok: v }).toString() });
      let w = yield fetch(`${p}/s.php`, { method: "POST", headers: y($({}, n), { Referer: i }), body: new URLSearchParams({ a: "1", tok: v }).toString() }).then((o) => o.json());
      if (!w || !w.langs_s)
        return [];
      let R = [];
      for (let o of O) {
        let u = w.langs_s[o];
        if (!u || u.length === 0)
          continue;
        let g = o === "LAT" ? "Latino" : o === "ESP" ? "Espa\xF1ol" : "Subtitulado";
        console.log(`[PelisSeriesHoy] Resolviendo ${u.length} servidores en ${g}...`);
        let c = (yield Promise.all(u.map((d) => T2(d[0], d[1], g)))).filter((d) => d !== null);
        if (c.length > 0) {
          R.push(...c);
          break;
        }
      }
      let x = ((Date.now() - r) / 1e3).toFixed(2);
      return console.log(`[PelisSeriesHoy] \u2713 ${R.length} streams en ${x}s`), R;
    } catch (h) {
      return console.error(`[PelisSeriesHoy] Error: ${h.message}`), [];
    }
  });
}
