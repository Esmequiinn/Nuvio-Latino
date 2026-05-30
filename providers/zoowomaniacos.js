var w = Object.defineProperty, D = Object.defineProperties, U = Object.getOwnPropertyDescriptor, L = Object.getOwnPropertyDescriptors, M = Object.getOwnPropertyNames, $ = Object.getOwnPropertySymbols;
var b = Object.prototype.hasOwnProperty, Z = Object.prototype.propertyIsEnumerable;
var v = (t, e, n) => e in t ? w(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n, R = (t, e) => {
  for (var n in e || (e = {}))
    b.call(e, n) && v(t, n, e[n]);
  if ($)
    for (var n of $(e))
      Z.call(e, n) && v(t, n, e[n]);
  return t;
}, T = (t, e) => D(t, L(e));
var x = (t, e) => {
  for (var n in e)
    w(t, n, { get: e[n], enumerable: true });
}, N = (t, e, n, a) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of M(e))
      !b.call(t, s) && s !== n && w(t, s, { get: () => e[s], enumerable: !(a = U(e, s)) || a.enumerable });
  return t;
};
var O = (t) => N(w({}, "__esModule", { value: true }), t);
var h = (t, e, n) => new Promise((a, s) => {
  var l = (r) => {
    try {
      o(n.next(r));
    } catch (i) {
      s(i);
    }
  }, c = (r) => {
    try {
      o(n.throw(r));
    } catch (i) {
      s(i);
    }
  }, o = (r) => r.done ? a(r.value) : Promise.resolve(r.value).then(l, c);
  o((n = n.apply(t, e)).next());
});
var j = {};
x(j, { getStreams: () => Y });
module.exports = O(j);
var k = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function A(t) {
  return h(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": k, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((i) => i.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let a = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], s = ["full", "hd", "sd", "low", "lowest"], l = a.map((i) => ({ type: i[1], url: i[2] })).filter((i) => !i.type.toLowerCase().includes("mobile") && i.url.startsWith("http"));
      if (l.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let o = l.sort((i, d) => {
        let g = s.findIndex((u) => i.type.toLowerCase().includes(u)), f = s.findIndex((u) => d.type.toLowerCase().includes(u));
        return (g === -1 ? 99 : g) - (f === -1 ? 99 : f);
      })[0];
      console.log(`[OkRu] URL encontrada (${o.type}): ${o.url.substring(0, 80)}...`);
      let r = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: o.url, quality: r[o.type] || o.type, headers: { "User-Agent": k, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var C = "439c478a771f35c05022f9feabcca01c", m = "https://proyectox.yoyatengoabuela.com", y = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", W = { "User-Agent": y, Accept: "application/json, text/javascript, */*", Connection: "keep-alive", Referer: m + "/", Origin: m, "X-Requested-With": "XMLHttpRequest" };
function _(t, e) {
  return h(this, null, function* () {
    let n = [{ lang: "es-MX", name: "Latino" }, { lang: "es-ES", name: "Espa\xF1a" }, { lang: "en-US", name: "Ingl\xE9s" }];
    for (let { lang: a, name: s } of n)
      try {
        let l = `https://api.themoviedb.org/3/${e}/${t}?api_key=${C}&language=${a}`, c = yield fetch(l, { headers: { "User-Agent": y } }).then((i) => i.json()), o = e === "movie" ? c.title : c.name, r = e === "movie" ? c.original_title : c.original_name;
        if (!o || a === "es-MX" && /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(o))
          continue;
        return console.log(`[Zoowomaniacos] TMDB (${s}): "${o}"`), { title: o, originalTitle: r, year: (c.release_date || "").substring(0, 4) };
      } catch (l) {
        console.log(`[Zoowomaniacos] Error TMDB ${s}: ${l.message}`);
      }
    return null;
  });
}
function B(t) {
  return h(this, null, function* () {
    var e, n, a, s;
    try {
      let l = new URLSearchParams({ start: "0", length: "20", metodo: "ObtenerListaTotal", "search[value]": t }).toString(), o = yield (yield fetch(`${m}/alternativo3/server.php`, { method: "POST", headers: T(R({}, W), { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }), body: l })).json();
      return !o.data || o.data.length === 0 ? console.log(`[Debug] El servidor respondi\xF3 vac\xEDo para: "${t}"`) : console.log(`[Debug] El servidor respondi\xF3 con ${o.data.length} resultados para: "${t}"`), (e = o == null ? void 0 : o.data) != null && e.length && console.log("[Debug] Primer resultado:", { a1: (n = o.data[0]) == null ? void 0 : n.a1, a2: (a = o.data[0]) == null ? void 0 : a.a2, a4: (s = o.data[0]) == null ? void 0 : s.a4 }), (o == null ? void 0 : o.data) || [];
    } catch (l) {
      return console.log(`[Zoowomaniacos] Error fatal en b\xFAsqueda: ${l.message}`), [];
    }
  });
}
function p(t = "") {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}
function E(t = "") {
  return p(t).split(" ").filter(Boolean);
}
function F(t) {
  var c, o, r;
  let e = (c = t.title) == null ? void 0 : c.trim(), n = (o = t.originalTitle) == null ? void 0 : o.trim(), a = (r = t.year) == null ? void 0 : r.trim(), s = [e, n, e && a ? `${e} ${a}` : null, n && a ? `${n} ${a}` : null], l = /* @__PURE__ */ new Set();
  return s.filter(Boolean).filter((i) => {
    let d = p(i);
    return !d || l.has(d) ? false : (l.add(d), true);
  });
}
function S(t, e) {
  let n = p(t.a2 || ""), a = [e.title, e.originalTitle].filter(Boolean).map(p), s = Number(e.year), l = Number(t.a4), c = -9999;
  for (let o of a) {
    let r = 0, i = E(o), d = E(n), g = o.length <= 3;
    n === o && (r += 500);
    let f = i.filter((u) => d.includes(u));
    if (r += f.length * 40, i.length > 1 && i.every((u) => d.includes(u)) && (r += 200), g || (n.includes(o) && (r += 120), o.includes(n) && (r += 60)), g && n !== o && (r -= 250), !isNaN(s) && !isNaN(l)) {
      let u = Math.abs(s - l);
      u === 0 ? r += 150 : u === 1 ? r += 75 : u === 2 ? r += 25 : u <= 5 ? r -= u * 15 : r -= u * 40;
    }
    e.originalTitle && n.includes(p(e.originalTitle)) && (r += 80), c = Math.max(c, r);
  }
  return c;
}
function q(t, e) {
  if (!Array.isArray(t) || t.length === 0)
    return null;
  let a = t.map((s) => ({ r: s, score: S(s, e) })).sort((s, l) => l.score - s.score)[0];
  return !a || a.score < 250 ? null : a.r;
}
function P(t) {
  return h(this, null, function* () {
    try {
      let n = yield (yield fetch(`${m}/testplayer.php?id=${t}`, { headers: { "User-Agent": y, Referer: m + "/" } })).text(), a = [...n.matchAll(/src=["'](https?:\/\/[^"']+)["']/g)], s = [...new Set(a.map((o) => o[1]))];
      s.length === 0 ? console.log(`[Debug Embeds] No encontr\xE9 URLs. HTML recibido (inicio): ${n.substring(0, 300)}`) : console.log(`[Debug Embeds] Encontradas: ${s.length} URLs.`);
      let l = s.filter((o) => o.includes("ok.ru/videoembed/")), c = s.filter((o) => o.includes("archive.org") && (o.endsWith(".mp4") || o.endsWith(".mkv") || o.endsWith(".avi")));
      return { okru: l, archive: c };
    } catch (e) {
      return console.log(`[Zoowomaniacos] Error player: ${e.message}`), { okru: [], archive: [] };
    }
  });
}
function Y(t, e) {
  return h(this, null, function* () {
    if (!t || e !== "movie")
      return [];
    let n = Date.now();
    console.log(`[Zoowomaniacos] Buscando: TMDB ${t}`);
    try {
      let a = yield _(t, e);
      if (!a)
        return [];
      let s = F(a), l = null, c = -1 / 0;
      for (let d of s) {
        console.log(`[Zoowomaniacos] Intentando buscar: "${d}"`);
        let g = yield B(d);
        if (!g.length)
          continue;
        let f = q(g, a);
        if (!f)
          continue;
        let u = S(f, a);
        if (console.log(`[Zoowomaniacos] Candidato: "${f.a2}" | score=${u}`), u >= 600) {
          l = f, c = u;
          break;
        }
        u > c && (c = u, l = f);
      }
      if (!l || c < 550)
        return console.log(`[Zoowomaniacos] Mejor score insuficiente (${c})`), [];
      console.log("[Zoowomaniacos] Seleccionado:", { id: l.a1, titulo: l.a2, year: l.a4, score: c });
      let { okru: o, archive: r } = yield P(l.a1);
      if (o.length === 0 && r.length === 0)
        return console.log("[Zoowomaniacos] No hay embeds v\xE1lidos"), [];
      let i = [];
      o.length > 0 && (console.log(`[Zoowomaniacos] Resolviendo ${o.length} embeds ok.ru...`), (yield Promise.allSettled(o.map((g) => A(g)))).filter((g) => g.status === "fulfilled" && g.value).forEach((g) => i.push({ name: "Zoowomaniacos", title: `${g.value.quality} \xB7 OkRu`, url: g.value.url, quality: g.value.quality, headers: g.value.headers || {} })));
      for (let d of r)
        i.push({ name: "Zoowomaniacos", title: "SD \xB7 Archive.org", url: d, quality: "SD", headers: { "User-Agent": y } });
      return console.log(`[Zoowomaniacos] \u2713 ${i.length} streams en ${((Date.now() - n) / 1e3).toFixed(2)}s`), i;
    } catch (a) {
      return console.log(`[Zoowomaniacos] Error cr\xEDtico: ${a.message}`), [];
    }
  });
}
