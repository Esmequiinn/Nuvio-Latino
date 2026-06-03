var y = Object.defineProperty;
var b = Object.getOwnPropertyDescriptor;
var F = Object.getOwnPropertyNames, S = Object.getOwnPropertySymbols;
var U = Object.prototype.hasOwnProperty, k = Object.prototype.propertyIsEnumerable;
var N = (o, t, n) => t in o ? y(o, t, { enumerable: true, configurable: true, writable: true, value: n }) : o[t] = n, A = (o, t) => {
  for (var n in t || (t = {}))
    U.call(t, n) && N(o, n, t[n]);
  if (S)
    for (var n of S(t))
      k.call(t, n) && N(o, n, t[n]);
  return o;
};
var H = (o, t) => {
  for (var n in t)
    y(o, n, { get: t[n], enumerable: true });
}, M = (o, t, n, a) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of F(t))
      !U.call(o, r) && r !== n && y(o, r, { get: () => t[r], enumerable: !(a = b(t, r)) || a.enumerable });
  return o;
};
var D = (o) => M(y({}, "__esModule", { value: true }), o);
var g = (o, t, n) => new Promise((a, r) => {
  var s = (i) => {
    try {
      c(n.next(i));
    } catch (u) {
      r(u);
    }
  }, l = (i) => {
    try {
      c(n.throw(i));
    } catch (u) {
      r(u);
    }
  }, c = (i) => i.done ? a(i.value) : Promise.resolve(i.value).then(s, l);
  c((n = n.apply(o, t)).next());
});
var K = {};
H(K, { getStreams: () => q });
module.exports = D(K);
var L = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function _(o, t) {
  return o >= 3840 || t >= 2160 ? "4K" : o >= 1920 || t >= 1080 ? "1080p" : o >= 1280 || t >= 720 ? "720p" : o >= 854 || t >= 480 ? "480p" : "360p";
}
function T(n) {
  return g(this, arguments, function* (o, t = {}) {
    try {
      console.log("[detectQuality] Fetching:", o.substring(0, 80));
      let a = yield fetch(o, { headers: A({ "User-Agent": L }, t), redirect: "follow" });
      console.log("[detectQuality] Status:", a.status, "ok:", a.ok);
      let r = yield a.text();
      if (console.log("[detectQuality] Response length:", r.length, "primeros 100:", r.substring(0, 100)), !r.includes("#EXT-X-STREAM-INF")) {
        let c = o.match(/[_-](\d{3,4})p/);
        return c ? `${c[1]}p` : "Unknown";
      }
      let s = 0, l = 0;
      for (let c of r.split(`
`)) {
        let i = c.match(/RESOLUTION=(\d+)x(\d+)/);
        if (i) {
          let u = parseInt(i[2]);
          u > l && (l = u, s = parseInt(i[1]));
        }
      }
      return l > 0 ? _(s, l) : "Unknown";
    } catch (a) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var E = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", z = "https://nupload.me";
function I(o, t) {
  return g(this, null, function* () {
    if (typeof XMLHttpRequest != "undefined")
      return new Promise((n, a) => {
        let r = new XMLHttpRequest();
        r.open("GET", o), r.responseType = "text";
        for (let [s, l] of Object.entries(t))
          r.setRequestHeader(s, l);
        r.onload = () => {
          n(r.responseURL || o);
        }, r.onerror = () => a(new Error("Network error via XHR")), r.send();
      });
    {
      let n = yield fetch(o, { headers: t, redirect: "follow" });
      if (!n.ok)
        throw new Error(`HTTP ${n.status} al seguir redirecci\xF3n`);
      return n.url;
    }
  });
}
function R(o) {
  return g(this, null, function* () {
    var t;
    try {
      console.log(`[Nupload] Resolviendo: ${o}`);
      let n = yield fetch(o, { headers: { "User-Agent": E, Referer: z + "/" } }), a = yield n.text();
      if (!n.ok)
        throw new Error(`HTTP ${n.status} al cargar el embed`);
      let r = a.match(/([A-Za-z]+)\.forEach\s*\(function\s+\w+\s*\(value\)\s*\{[^}]+atob/);
      if (!r)
        return console.log("[Nupload] No se encontr\xF3 patr\xF3n de ofuscaci\xF3n ni iframe."), null;
      let s = r[1], l = a.match(new RegExp(s + "\\.forEach[^-]+-\\s*(\\d+)"));
      if (!l)
        return console.log("[Nupload] No se pudo extraer el offset num\xE9rico"), null;
      let c = parseInt(l[1]), i = a.match(new RegExp("var\\s+" + s + "\\s*=\\s*(\\[[^\\]]+\\])"));
      if (!i)
        return console.log("[Nupload] No se encontr\xF3 el array de valores ofuscados"), null;
      let u = JSON.parse(i[1]), f = "";
      u.forEach((x) => {
        f += String.fromCharCode(parseInt(atob(x).replace(/\D/g, "")) - c);
      });
      let h = (t = a.match(/var sesz\s*=\s*"([^"]+)"/)) == null ? void 0 : t[1];
      if (!h)
        return console.log("[Nupload] No se encontr\xF3 el token sesz"), null;
      let v = f + "?s=" + h;
      console.log("[Nupload] Siguiendo redirecci\xF3n de la URL construida...");
      let p = yield I(v, { "User-Agent": E }), m = { "User-Agent": E, Referer: "https://nupload.me/", Origin: "https://nupload.me" }, w = yield T(p, { Referer: "https://nupload.me/", "User-Agent": E });
      return console.log("[Nupload] Quality detectada:", w), console.log(`[Nupload] URL encontrada (${w}): ${p.substring(0, 80)}...`), { url: p, quality: w, headers: m };
    } catch (n) {
      return console.log(`[Nupload] Error: ${n.message}`), null;
    }
  });
}
var P = "439c478a771f35c05022f9feabcca01c", W = "https://seriesflixhd.best", B = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
function $(o) {
  return o.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "y").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function Q(o, t) {
  return g(this, null, function* () {
    let [n, a, r] = yield Promise.all(["es-ES", "es-MX", "en-US"].map((f) => fetch(`https://api.themoviedb.org/3/${t}/${o}?api_key=${P}&language=${f}`).then((h) => h.json()).catch(() => null))), s = n ? t === "movie" ? n.title : n.name : null, l = a && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(t === "movie" ? a.title : a.name) ? a : r;
    if (!l)
      return null;
    let c = t === "movie" ? l.title : l.name, i = t === "movie" ? l.original_title : l.original_name, u = (l.release_date || l.first_air_date || "").substring(0, 4);
    return console.log(`[SeriesFlixHD] TMDB: "${c}" (${u})`), { title: c, originalTitle: i, year: u, titleEs: s };
  });
}
function C(o) {
  return g(this, null, function* () {
    let t = `${W}/episodio/${o}`;
    try {
      let n = yield fetch(t, { headers: { "User-Agent": B, Accept: "text/html" } });
      return n.ok ? yield n.text() : null;
    } catch (n) {
      return console.log(`[SeriesFlixHD] fetch error: ${n.message}`), null;
    }
  });
}
function O(o) {
  let t = { latino: [], castellano: [] }, n = o.match(/LATINO[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/), a = o.match(/CASTELLANO[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/), r = (s) => s ? [...s.matchAll(/data-url="([^"]+)"/g)].map((l) => {
    try {
      return atob(l[1]);
    } catch (c) {
      return console.log(`[SeriesFlixHD] Error decodificando base64: ${c.message}`), null;
    }
  }).filter(Boolean).filter((l) => l.includes("nupload.me/watch/")) : [];
  return t.latino = r(n == null ? void 0 : n[1]), t.castellano = r(a == null ? void 0 : a[1]), t;
}
function q(o, t, n, a) {
  return g(this, null, function* () {
    if (!o || t !== "tv")
      return [];
    let r = Date.now();
    console.log(`[SeriesFlixHD] Buscando: TMDB ${o} S${n}E${a}`);
    try {
      let s = yield Q(o, t);
      if (!s)
        return [];
      let l = String(a), c = parseInt(n), i = [];
      s.title && (i.push(`${$(s.title)}-${c}x${l}`), i.push(`${$(s.title)}-${s.year}-${c}x${l}`)), s.originalTitle && s.originalTitle !== s.title && (i.push(`${$(s.originalTitle)}-${c}x${l}`), i.push(`${$(s.originalTitle)}-${s.year}-${c}x${l}`)), s.titleEs && s.titleEs !== s.title && (i.push(`${$(s.titleEs)}-${c}x${l}`), i.push(`${$(s.titleEs)}-${s.year}-${c}x${l}`));
      let u = null;
      try {
        u = yield Promise.any(i.map((p) => C(p).then((m) => {
          if (!m || !m.includes("data-url"))
            throw new Error("not found");
          return console.log("[SeriesFlixHD] \u2713 Slug encontrado"), m;
        })));
      } catch (p) {
        u = null;
      }
      let f = O(u);
      console.log(`[SeriesFlixHD] Latino: ${f.latino.length} | Castellano: ${f.castellano.length}`);
      let h = [];
      for (let [p, m] of [[f.latino, "Latino"], [f.castellano, "Castellano"]]) {
        if (p.length === 0)
          continue;
        let x = (yield Promise.allSettled(p.map((d) => R(d)))).filter((d) => d.status === "fulfilled" && d.value).map((d, X) => ({ name: "SeriesFlixHD", title: `${d.value.quality} \xB7 ${m} \xB7 Nupload`, url: d.value.url, quality: d.value.quality, headers: d.value.headers }));
        if (h.push(...x), x.length > 0)
          break;
      }
      let v = ((Date.now() - r) / 1e3).toFixed(2);
      return console.log(`[SeriesFlixHD] \u2713 ${h.length} streams en ${v}s`), h;
    } catch (s) {
      return console.log(`[SeriesFlixHD] Error: ${s.message}`), [];
    }
  });
}
