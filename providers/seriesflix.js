var S = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var A = Object.getOwnPropertyNames;
var D = Object.prototype.hasOwnProperty;
var F = (l, o) => {
  for (var t in o)
    S(l, t, { get: o[t], enumerable: true });
}, b = (l, o, t, s) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of A(o))
      !D.call(l, n) && n !== t && S(l, n, { get: () => o[n], enumerable: !(s = y(o, n)) || s.enumerable });
  return l;
};
var T = (l) => b(S({}, "__esModule", { value: true }), l);
var p = (l, o, t) => new Promise((s, n) => {
  var e = (r) => {
    try {
      i(t.next(r));
    } catch (c) {
      n(c);
    }
  }, a = (r) => {
    try {
      i(t.throw(r));
    } catch (c) {
      n(c);
    }
  }, i = (r) => r.done ? s(r.value) : Promise.resolve(r.value).then(e, a);
  i((t = t.apply(l, o)).next());
});
var R = {};
F(R, { getStreams: () => M });
module.exports = T(R);
var w = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", U = "https://nupload.me";
function N(l) {
  return p(this, null, function* () {
    var o;
    try {
      console.log(`[Nupload] Resolviendo: ${l}`);
      let t = yield fetch(l, { headers: { "User-Agent": w, Referer: U + "/" } }), s = yield t.text();
      if (!t.ok)
        throw new Error(`HTTP ${t.status} al cargar el embed`);
      let n = s.match(/([A-Za-z]+)\.forEach\s*\(function\s+\w+\s*\(value\)\s*\{[^}]+atob/);
      if (!n)
        return console.log("[Nupload] No se encontr\xF3 patr\xF3n de ofuscaci\xF3n"), null;
      let e = n[1], a = s.match(new RegExp(e + "\\.forEach[^-]+-\\s*(\\d+)"));
      if (!a)
        return console.log("[Nupload] No se pudo extraer el offset num\xE9rico"), null;
      let i = parseInt(a[1]), r = s.match(new RegExp("var\\s+" + e + "\\s*=\\s*(\\[[^\\]]+\\])"));
      if (!r)
        return console.log("[Nupload] No se encontr\xF3 el array de valores ofuscados"), null;
      let c = JSON.parse(r[1]), g = "";
      c.forEach((m) => {
        g += String.fromCharCode(parseInt(atob(m).replace(/\D/g, "")) - i);
      });
      let h = (o = s.match(/var sesz\s*=\s*"([^"]+)"/)) == null ? void 0 : o[1];
      if (!h)
        return console.log("[Nupload] No se encontr\xF3 el token sesz"), null;
      let x = g + "?s=" + h;
      console.log("[Nupload] Siguiendo redirecci\xF3n de la URL construida...");
      let u = yield fetch(x, { headers: { "User-Agent": w }, redirect: "follow" });
      if (!u.ok)
        throw new Error(`HTTP ${u.status} al seguir la redirecci\xF3n final`);
      let $ = u.url, E = { "User-Agent": w, Referer: "https://nupload.me/", Origin: "https://nupload.me" };
      return console.log(`[Nupload] URL encontrada (${$.substring(0, 80)}...`), { url: $, headers: E };
    } catch (t) {
      return console.log(`[Nupload] Error: ${t.message}`), null;
    }
  });
}
var v = "439c478a771f35c05022f9feabcca01c", H = "https://seriesflixhd.buzz", L = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
function d(l) {
  return l.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "y").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function _(l, o) {
  return p(this, null, function* () {
    let t = null;
    try {
      let s = `https://api.themoviedb.org/3/${o}/${l}?api_key=${v}&language=es-ES`, n = yield fetch(s).then((e) => e.json());
      t = o === "movie" ? n.title : n.name;
    } catch (s) {
    }
    for (let s of ["es-MX", "en-US"])
      try {
        let n = `https://api.themoviedb.org/3/${o}/${l}?api_key=${v}&language=${s}`, e = yield fetch(n).then((c) => c.json()), a = o === "movie" ? e.title : e.name, i = o === "movie" ? e.original_title : e.original_name;
        if (s === "es-MX" && /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(a))
          continue;
        let r = (e.release_date || e.first_air_date || "").substring(0, 4);
        return console.log(`[SeriesFlixHD] TMDB (${s}): "${a}" (${r})`), { title: a, originalTitle: i, year: r, titleEs: t };
      } catch (n) {
      }
    return null;
  });
}
function z(l) {
  return p(this, null, function* () {
    let o = `${H}/episodio/${l}`;
    try {
      let t = yield fetch(o, { headers: { "User-Agent": L, Accept: "text/html" } });
      return t.ok ? yield t.text() : null;
    } catch (t) {
      return console.log(`[SeriesFlixHD] fetch error: ${t.message}`), null;
    }
  });
}
function k(l) {
  let o = { latino: [], castellano: [] }, t = l.match(/LATINO[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/), s = l.match(/CASTELLANO[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/), n = (e) => e ? [...e.matchAll(/data-url="([^"]+)"/g)].map((a) => {
    try {
      return Buffer.from(a[1], "base64").toString("utf8");
    } catch (i) {
      return null;
    }
  }).filter(Boolean).filter((a) => a.includes("nupload.me/watch/")) : [];
  return o.latino = n(t == null ? void 0 : t[1]), o.castellano = n(s == null ? void 0 : s[1]), o;
}
function M(l, o, t, s) {
  return p(this, null, function* () {
    if (!l || o !== "tv")
      return [];
    let n = Date.now();
    console.log(`[SeriesFlixHD] Buscando: TMDB ${l} S${t}E${s}`);
    try {
      let e = yield _(l, o);
      if (!e)
        return [];
      let a = String(s), i = parseInt(t), r = [];
      e.title && (r.push(`${d(e.title)}-${i}x${a}`), r.push(`${d(e.title)}-${e.year}-${i}x${a}`)), e.originalTitle && e.originalTitle !== e.title && (r.push(`${d(e.originalTitle)}-${i}x${a}`), r.push(`${d(e.originalTitle)}-${e.year}-${i}x${a}`)), e.titleEs && e.titleEs !== e.title && (r.push(`${d(e.titleEs)}-${i}x${a}`), r.push(`${d(e.titleEs)}-${e.year}-${i}x${a}`));
      let c = null;
      for (let u of r)
        if (console.log(`[SeriesFlixHD] Probando: /episodio/${u}`), c = yield z(u), c && c.includes("data-url"))
          break;
      if (!c || !c.includes("data-url"))
        return console.log("[SeriesFlixHD] No encontrado"), [];
      let g = k(c);
      console.log(`[SeriesFlixHD] Latino: ${g.latino.length} | Castellano: ${g.castellano.length}`);
      let h = [];
      for (let [u, $] of [[g.latino, "Latino"], [g.castellano, "Castellano"]]) {
        if (u.length === 0)
          continue;
        let m = (yield Promise.allSettled(u.map((f) => N(f)))).filter((f) => f.status === "fulfilled" && f.value).map((f, B) => ({ name: "SeriesFlixHD", title: `${f.value.quality} \xB7 ${$} \xB7 Nupload`, url: f.value.url, quality: f.value.quality, headers: f.value.headers }));
        if (h.push(...m), m.length > 0)
          break;
      }
      let x = ((Date.now() - n) / 1e3).toFixed(2);
      return console.log(`[SeriesFlixHD] \u2713 ${h.length} streams en ${x}s`), h;
    } catch (e) {
      return console.log(`[SeriesFlixHD] Error: ${e.message}`), [];
    }
  });
}
