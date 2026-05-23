var m = Object.defineProperty, E = Object.defineProperties, M = Object.getOwnPropertyDescriptor, B = Object.getOwnPropertyDescriptors, C = Object.getOwnPropertyNames, _ = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty, D = Object.prototype.propertyIsEnumerable;
var A = (t, e, s) => e in t ? m(t, e, { enumerable: true, configurable: true, writable: true, value: s }) : t[e] = s, y = (t, e) => {
  for (var s in e || (e = {}))
    L.call(e, s) && A(t, s, e[s]);
  if (_)
    for (var s of _(e))
      D.call(e, s) && A(t, s, e[s]);
  return t;
}, P = (t, e) => E(t, B(e));
var I = (t, e) => {
  for (var s in e)
    m(t, s, { get: e[s], enumerable: true });
}, N = (t, e, s, l) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of C(e))
      !L.call(t, o) && o !== s && m(t, o, { get: () => e[o], enumerable: !(l = M(e, o)) || l.enumerable });
  return t;
};
var O = (t) => N(m({}, "__esModule", { value: true }), t);
var w = (t, e, s) => new Promise((l, o) => {
  var c = (n) => {
    try {
      a(s.next(n));
    } catch (f) {
      o(f);
    }
  }, u = (n) => {
    try {
      a(s.throw(n));
    } catch (f) {
      o(f);
    }
  }, a = (n) => n.done ? l(n.value) : Promise.resolve(n.value).then(c, u);
  a((s = s.apply(t, e)).next());
});
var z = {};
I(z, { getStreams: () => K });
module.exports = O(z);
var k = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", d = "https://player.pelisserieshoy.com", b = "439c478a771f35c05022f9feabcca01c", W = ["LAT", "ESP", "SUB"];
function j(t, e) {
  return w(this, null, function* () {
    let s = e === "movie" ? `https://api.themoviedb.org/3/movie/${t}/external_ids?api_key=${b}` : `https://api.themoviedb.org/3/tv/${t}/external_ids?api_key=${b}`;
    return (yield fetch(s, { headers: { "User-Agent": k } }).then((o) => o.json())).imdb_id || null;
  });
}
function K(t, e, s, l) {
  return w(this, null, function* () {
    if (!t || !e)
      return [];
    let o = Date.now();
    console.log(`[PelisSeriesHoy] Buscando: TMDB ${t} (${e})`);
    try {
      let H2 = function(r, h, $) {
        return w(this, null, function* () {
          try {
            let i = yield fetch(`${d}/s.php`, { method: "POST", headers: P(y({}, n), { Referer: a }), body: new URLSearchParams({ a: "2", v: h, tok: S }).toString() }).then((x) => x.json()), p = "";
            i.u && i.u.startsWith("http") ? p = `${d}/p.php?url=${encodeURIComponent(i.u)}&sig=${encodeURIComponent(i.sig || "")}` : p = `${d}/p.php?v=${h}&tok=${S}`;
            let g = r.replace(/[^a-zA-Z0-9 ]/g, "").trim() || i.src || "Server";
            return { name: "PelisSeriesHoy", title: `1080p \xB7 ${$} \xB7 ${g}`, url: p, quality: "1080p", headers: { Referer: "https://sololatino.net/", "User-Agent": k } };
          } catch (i) {
            return console.log(`[PelisSeriesHoy] Error: ${i.message}`), null;
          }
        });
      };
      var H = H2;
      let c = yield j(t, e);
      if (!c)
        return [];
      let u = c;
      if (e === "tv") {
        let r = String(l).padStart(2, "0");
        u = `${c}-${parseInt(s)}x${r}`;
      }
      let a = `${d}/f/${u}`;
      console.log(`[PelisSeriesHoy] Fetching HTML: ${a}`);
      let n = { "User-Agent": k, Referer: "https://sololatino.net/", "Content-Type": "application/x-www-form-urlencoded" }, U = (yield fetch(a, { headers: n }).then((r) => r.text())).match(/const _t\s*=\s*'([^']+)'/);
      if (!U)
        return console.log("[PelisSeriesHoy] No se encontr\xF3 el token de sesi\xF3n (_t)"), [];
      let S = U[1];
      yield fetch(`${d}/s.php`, { method: "POST", headers: P(y({}, n), { Referer: a }), body: new URLSearchParams({ a: "click", tok: S }).toString() });
      let v = yield fetch(`${d}/s.php`, { method: "POST", headers: P(y({}, n), { Referer: a }), body: new URLSearchParams({ a: "1", tok: S }).toString() }).then((r) => r.json());
      if (!v || !v.langs_s)
        return [];
      let R = [];
      for (let r of W) {
        let h = v.langs_s[r];
        if (!h || h.length === 0)
          continue;
        let $ = r === "LAT" ? "Latino" : r === "ESP" ? "Espa\xF1ol" : "Subtitulado";
        console.log(`[PelisSeriesHoy] Resolviendo ${h.length} servidores en ${$}...`);
        let p = (yield Promise.all(h.map((g) => H2(g[0], g[1], $)))).filter((g) => g !== null);
        if (p.length > 0) {
          R.push(...p);
          break;
        }
      }
      let T = ((Date.now() - o) / 1e3).toFixed(2);
      return console.log(`[PelisSeriesHoy] \u2713 ${R.length} streams en ${T}s`), R;
    } catch (c) {
      return console.error(`[PelisSeriesHoy] Error: ${c.message}`), [];
    }
  });
}
