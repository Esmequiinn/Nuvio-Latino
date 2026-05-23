var S = Object.defineProperty, b = Object.defineProperties, E = Object.getOwnPropertyDescriptor, C = Object.getOwnPropertyDescriptors, D = Object.getOwnPropertyNames, _ = Object.getOwnPropertySymbols;
var A = Object.prototype.hasOwnProperty, M = Object.prototype.propertyIsEnumerable;
var U = (t, e, s) => e in t ? S(t, e, { enumerable: true, configurable: true, writable: true, value: s }) : t[e] = s, y = (t, e) => {
  for (var s in e || (e = {}))
    A.call(e, s) && U(t, s, e[s]);
  if (_)
    for (var s of _(e))
      M.call(e, s) && U(t, s, e[s]);
  return t;
}, P = (t, e) => b(t, C(e));
var B = (t, e) => {
  for (var s in e)
    S(t, s, { get: e[s], enumerable: true });
}, I = (t, e, s, h) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of D(e))
      !A.call(t, r) && r !== s && S(t, r, { get: () => e[r], enumerable: !(h = E(e, r)) || h.enumerable });
  return t;
};
var N = (t) => I(S({}, "__esModule", { value: true }), t);
var v = (t, e, s) => new Promise((h, r) => {
  var p = (n) => {
    try {
      i(s.next(n));
    } catch (m) {
      r(m);
    }
  }, g = (n) => {
    try {
      i(s.throw(n));
    } catch (m) {
      r(m);
    }
  }, i = (n) => n.done ? h(n.value) : Promise.resolve(n.value).then(p, g);
  i((s = s.apply(t, e)).next());
});
var K = {};
B(K, { getStreams: () => z });
module.exports = N(K);
var L = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", c = "https://player.pelisserieshoy.com", H = "439c478a771f35c05022f9feabcca01c", O = ["LAT", "ESP", "SUB"];
function j(t, e) {
  return v(this, null, function* () {
    let s = e === "movie" ? `https://api.themoviedb.org/3/movie/${t}/external_ids?api_key=${H}` : `https://api.themoviedb.org/3/tv/${t}/external_ids?api_key=${H}`;
    return (yield fetch(s, { headers: { "User-Agent": L } }).then((r) => r.json())).imdb_id || null;
  });
}
function z(t, e, s, h) {
  return v(this, null, function* () {
    if (!t || !e)
      return [];
    let r = Date.now();
    console.log(`[PelisSeriesHoy] Buscando: TMDB ${t} (${e})`);
    try {
      let T2 = function(o, u, f) {
        return v(this, null, function* () {
          try {
            let a = yield fetch(`${c}/s.php`, { method: "POST", headers: P(y({}, n), { Referer: i }), body: new URLSearchParams({ a: "2", v: u, tok: $ }).toString() }).then((l) => l.json());
            if (a.u || a.sig) {
              let l = a.u ? `${c}/p.php?url=${encodeURIComponent(a.u)}&sig=${encodeURIComponent(a.sig || "")}` : `${c}/p.php?v=${u}&tok=${$}`, d = o.replace(/[^a-zA-Z0-9 ]/g, "").trim() || a.src || "Server";
              return { name: "PelisSeriesHoy", title: `1080p \xB7 ${f} \xB7 ${d}`, url: l, quality: "1080p", headers: { Referer: c } };
            }
            if (a.type === "mp4" && a.u) {
              let l = o.replace(/[^a-zA-Z0-9 ]/g, "").trim() || "Directo";
              return { name: "PelisSeriesHoy", title: `1080p \xB7 ${f} \xB7 ${l}`, url: a.u, quality: "1080p", headers: { Referer: c } };
            }
          } catch (a) {
            console.log(`[PelisSeriesHoy] Error en resolver ${o}: ${a.message}`);
          }
          return null;
        });
      };
      var T = T2;
      let p = yield j(t, e);
      if (!p)
        return [];
      let g = p;
      if (e === "tv") {
        let o = String(h).padStart(2, "0");
        g = `${p}-${parseInt(s)}x${o}`;
      }
      let i = `${c}/f/${g}`;
      console.log(`[PelisSeriesHoy] Fetching HTML: ${i}`);
      let n = { "User-Agent": L, Referer: "https://sololatino.net/", "Content-Type": "application/x-www-form-urlencoded" }, k = (yield fetch(i, { headers: n }).then((o) => o.text())).match(/const _t\s*=\s*'([^']+)'/);
      if (!k)
        return console.log("[PelisSeriesHoy] No se encontr\xF3 el token de sesi\xF3n (_t)"), [];
      let $ = k[1];
      yield fetch(`${c}/s.php`, { method: "POST", headers: P(y({}, n), { Referer: i }), body: new URLSearchParams({ a: "click", tok: $ }).toString() });
      let w = yield fetch(`${c}/s.php`, { method: "POST", headers: P(y({}, n), { Referer: i }), body: new URLSearchParams({ a: "1", tok: $ }).toString() }).then((o) => o.json());
      if (!w || !w.langs_s)
        return [];
      let R = [];
      for (let o of O) {
        let u = w.langs_s[o];
        if (!u || u.length === 0)
          continue;
        let f = o === "LAT" ? "Latino" : o === "ESP" ? "Espa\xF1ol" : "Subtitulado";
        console.log(`[PelisSeriesHoy] Resolviendo ${u.length} servidores en ${f}...`);
        let l = (yield Promise.all(u.map((d) => T2(d[0], d[1], f)))).filter((d) => d !== null);
        if (l.length > 0) {
          R.push(...l);
          break;
        }
      }
      let x = ((Date.now() - r) / 1e3).toFixed(2);
      return console.log(`[PelisSeriesHoy] \u2713 ${R.length} streams en ${x}s`), R;
    } catch (p) {
      return console.error(`[PelisSeriesHoy] Error: ${p.message}`), [];
    }
  });
}
