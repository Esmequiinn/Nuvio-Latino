var x = Object.defineProperty, _ = Object.defineProperties, P = Object.getOwnPropertyDescriptor, C = Object.getOwnPropertyDescriptors, N = Object.getOwnPropertyNames, U = Object.getOwnPropertySymbols;
var k = Object.prototype.hasOwnProperty, W = Object.prototype.propertyIsEnumerable;
var R = (o, t, n) => t in o ? x(o, t, { enumerable: true, configurable: true, writable: true, value: n }) : o[t] = n, h = (o, t) => {
  for (var n in t || (t = {}))
    k.call(t, n) && R(o, n, t[n]);
  if (U)
    for (var n of U(t))
      W.call(t, n) && R(o, n, t[n]);
  return o;
}, E = (o, t) => _(o, C(t));
var D = (o, t) => {
  for (var n in t)
    x(o, n, { get: t[n], enumerable: true });
}, q = (o, t, n, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of N(t))
      !k.call(o, r) && r !== n && x(o, r, { get: () => t[r], enumerable: !(s = P(t, r)) || s.enumerable });
  return o;
};
var z = (o) => q(x({}, "__esModule", { value: true }), o);
var d = (o, t, n) => new Promise((s, r) => {
  var i = (c) => {
    try {
      l(n.next(c));
    } catch (p) {
      r(p);
    }
  }, a = (c) => {
    try {
      l(n.throw(c));
    } catch (p) {
      r(p);
    }
  }, l = (c) => c.done ? s(c.value) : Promise.resolve(c.value).then(i, a);
  l((n = n.apply(o, t)).next());
});
var Z = {};
D(Z, { getStreams: () => V });
module.exports = z(Z);
var Q = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function K(o, t) {
  return o >= 3840 || t >= 2160 ? "4K" : o >= 1920 || t >= 1080 ? "1080p" : o >= 1280 || t >= 720 ? "720p" : o >= 854 || t >= 480 ? "480p" : "360p";
}
function L(n) {
  return d(this, arguments, function* (o, t = {}) {
    try {
      console.log("[detectQuality] Fetching:", o.substring(0, 80));
      let s = yield fetch(o, { headers: h({ "User-Agent": Q }, t), redirect: "follow" });
      console.log("[detectQuality] Status:", s.status, "ok:", s.ok);
      let r = yield s.text();
      if (console.log("[detectQuality] Response length:", r.length, "primeros 100:", r.substring(0, 100)), !r.includes("#EXT-X-STREAM-INF")) {
        let l = o.match(/[_-](\d{3,4})p/);
        return l ? `${l[1]}p` : "Unknown";
      }
      let i = 0, a = 0;
      for (let l of r.split(`
`)) {
        let c = l.match(/RESOLUTION=(\d+)x(\d+)/);
        if (c) {
          let p = parseInt(c[2]);
          p > a && (a = p, i = parseInt(c[1]));
        }
      }
      return a > 0 ? K(i, a) : "Unknown";
    } catch (s) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var y = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
function O(o) {
  let t = o.match(/eval\(function\(p,a,c,k,e,d\)\{.*?\}\('([\s\S]*?)',(\d+),(\d+),'([\s\S]*?)'\.split\('\|'\)\)\)/);
  if (!t)
    return null;
  let [, n, s, r, i] = t;
  for (s = parseInt(s), r = parseInt(r), i = i.split("|"); r--; )
    i[r] && (n = n.replace(new RegExp("\\b" + r.toString(s) + "\\b", "g"), i[r]));
  return n;
}
function I(o) {
  return d(this, null, function* () {
    var t;
    try {
      let s = yield (yield fetch(o, { headers: { "User-Agent": y, Referer: "https://www3.seriesmetro.net/" }, redirect: "follow" })).text(), r = O(s);
      if (!r)
        return null;
      let i = (t = r.match(/file:"(https?:\/\/[^"]+\.m3u8[^"]*)"/)) == null ? void 0 : t[1];
      if (!i)
        return null;
      let a = yield L(i, { Referer: "https://fastream.to/", "User-Agent": y });
      return { url: i, quality: a, headers: { "User-Agent": y, Referer: "https://fastream.to/" } };
    } catch (n) {
      return console.error("[Fastream] Error:", n), null;
    }
  });
}
var B = "439c478a771f35c05022f9feabcca01c", v = "https://www3.seriesmetro.net", G = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", M = { "User-Agent": G, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9", Connection: "keep-alive", "Upgrade-Insecure-Requests": "1" }, T = ["latino", "lat", "castellano", "espa\xF1ol", "esp", "vose", "sub", "subtitulado"], H = { latino: "Latino", lat: "Latino", castellano: "Espa\xF1ol", espa\u00F1ol: "Espa\xF1ol", esp: "Espa\xF1ol", vose: "Subtitulado", sub: "Subtitulado", subtitulado: "Subtitulado" };
function b(o) {
  return o.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "y").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function X(o, t) {
  return d(this, null, function* () {
    let [n, s, r] = yield Promise.all(["es-ES", "es-MX", "en-US"].map((u) => fetch(`https://api.themoviedb.org/3/${t}/${o}?api_key=${B}&language=${u}`).then((f) => f.json()).catch(() => null))), i = n ? t === "movie" ? n.title : n.name : null, a = s && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(t === "movie" ? s.title : s.name) ? s : r;
    if (!a)
      return null;
    let l = t === "movie" ? a.title : a.name, c = t === "movie" ? a.original_title : a.original_name;
    return console.log(`[SeriesMetro] TMDB (${a === s ? "Latino" : "Ingl\xE9s"}): "${l}"`), { title: l, originalTitle: c, titleEs: i };
  });
}
function Y(o, t) {
  return d(this, null, function* () {
    let { title: n, originalTitle: s, titleEs: r } = o, i = t === "movie" ? "pelicula" : "serie", a = [];
    n && a.push(b(n)), s && s !== n && a.push(b(s)), r && r !== n && a.push(b(r));
    try {
      return yield Promise.any(a.map((l) => d(this, null, function* () {
        let c = `${v}/${i}/${l}/`, p = yield fetch(c, { headers: M }).then((u) => u.text());
        if (!p.includes("trembed=") && !p.includes("data-post="))
          throw new Error("not found");
        return console.log(`[SeriesMetro] \u2713 Encontrado: /${i}/${l}/`), { url: c, html: p };
      })));
    } catch (l) {
      return console.log("[SeriesMetro] No encontrado por slug"), null;
    }
  });
}
function j(o, t, n, s) {
  return d(this, null, function* () {
    var i;
    let r = (i = t.match(/data-post="(\d+)"/)) == null ? void 0 : i[1];
    if (!r)
      return console.log("[SeriesMetro] No se encontr\xF3 data-post"), null;
    try {
      let a = new URLSearchParams({ action: "action_select_season", post: r, season: String(n) }), u = [...(yield (yield fetch(`${v}/wp-admin/admin-ajax.php`, { method: "POST", headers: E(h({}, M), { "Content-Type": "application/x-www-form-urlencoded", Referer: o }), body: a.toString() })).text()).matchAll(/href="([^"]+\/capitulo\/[^"]+)"/g)].map((f) => f[1]).find((f) => {
        let m = f.match(/temporada-(\d+)-capitulo-(\d+)/i);
        return m && parseInt(m[1]) === n && parseInt(m[2]) === s;
      });
      return u ? (console.log(`[SeriesMetro] \u2713 Episodio S${n}E${s} encontrado: ${u}`), u) : (console.log(`[SeriesMetro] Episodio S${n}E${s} no encontrado`), null);
    } catch (a) {
      return console.log(`[SeriesMetro] Error getEpisodeUrl: ${a.message}`), null;
    }
  });
}
function J(o, t) {
  return d(this, null, function* () {
    var p;
    let n = yield fetch(o, { headers: E(h({}, M), { Referer: t }) }).then((u) => u.text()), s = [...n.matchAll(/href="#options-(\d+)"[^>]*>[\s\S]*?<span class="server">([\s\S]*?)<\/span>/g)], r = [...n.matchAll(/\?trembed=(\d+)(?:&#038;|&)trid=(\d+)(?:&#038;|&)trtype=(\d+)/g)];
    if (r.length === 0 || s.length === 0)
      return [];
    let i = r[0][2], a = r[0][3], l = s.sort(([, , u], [, , f]) => {
      let m = u.replace(/<[^>]+>/g, "").split("-").pop().trim().toLowerCase(), $ = f.replace(/<[^>]+>/g, "").split("-").pop().trim().toLowerCase(), g = T.indexOf(m), w = T.indexOf($);
      return (g === -1 ? 99 : g) - (w === -1 ? 99 : w);
    }), c = [];
    for (let [, u, f] of l) {
      let $ = f.replace(/<[^>]+>/g, "").trim().split("-").pop().trim().toLowerCase(), g = H[$] || $;
      try {
        let A = (p = (yield fetch(`${v}/?trembed=${u}&trid=${i}&trtype=${a}`, { headers: E(h({}, M), { Referer: o }) }).then((F) => F.text())).match(/<iframe[^>]*src="(https?:\/\/fastream\.to\/[^"]+)"/i)) == null ? void 0 : p[1];
        if (!A)
          continue;
        let S = yield I(A);
        if (!S)
          continue;
        if (c.push({ name: "SeriesMetro", title: `${S.quality} \xB7 ${g} \xB7 Fastream`, url: S.url, quality: S.quality, headers: S.headers }), g === "Latino")
          return console.log("[SeriesMetro] Latino encontrado, retornando"), c;
      } catch (w) {
        console.log(`[SeriesMetro] Error embed ${u}: ${w.message}`);
      }
    }
    return c;
  });
}
function V(o, t, n, s) {
  return d(this, null, function* () {
    if (!o || !t)
      return [];
    let r = Date.now();
    console.log(`[SeriesMetro] Buscando: TMDB ${o} (${t})${n ? ` S${n}E${s}` : ""}`);
    try {
      let i = yield X(o, t);
      if (!i)
        return [];
      let a = yield Y(i, t);
      if (!a)
        return [];
      let l = a.url;
      if (t === "tv" && n && s) {
        let u = yield j(a.url, a.html, n, s);
        if (!u)
          return console.log(`[SeriesMetro] Episodio S${n}E${s} no encontrado`), [];
        console.log(`[SeriesMetro] Episodio: ${u}`), l = u;
      }
      let c = yield J(l, l), p = ((Date.now() - r) / 1e3).toFixed(2);
      return console.log(`[SeriesMetro] \u2713 ${c.length} streams en ${p}s`), c;
    } catch (i) {
      return console.log(`[SeriesMetro] Error: ${i.message}`), [];
    }
  });
}
