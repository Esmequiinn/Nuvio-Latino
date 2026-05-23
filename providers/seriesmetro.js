var w = Object.defineProperty, k = Object.defineProperties, D = Object.getOwnPropertyDescriptor, N = Object.getOwnPropertyDescriptors, W = Object.getOwnPropertyNames, A = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty, _ = Object.prototype.propertyIsEnumerable;
var y = (o, t, e) => t in o ? w(o, t, { enumerable: true, configurable: true, writable: true, value: e }) : o[t] = e, d = (o, t) => {
  for (var e in t || (t = {}))
    L.call(t, e) && y(o, e, t[e]);
  if (A)
    for (var e of A(t))
      _.call(t, e) && y(o, e, t[e]);
  return o;
}, E = (o, t) => k(o, N(t));
var C = (o, t) => {
  for (var e in t)
    w(o, e, { get: t[e], enumerable: true });
}, q = (o, t, e, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of W(t))
      !L.call(o, r) && r !== e && w(o, r, { get: () => t[r], enumerable: !(n = D(t, r)) || n.enumerable });
  return o;
};
var P = (o) => q(w({}, "__esModule", { value: true }), o);
var f = (o, t, e) => new Promise((n, r) => {
  var s = (c) => {
    try {
      l(e.next(c));
    } catch (i) {
      r(i);
    }
  }, a = (c) => {
    try {
      l(e.throw(c));
    } catch (i) {
      r(i);
    }
  }, l = (c) => c.done ? n(c.value) : Promise.resolve(c.value).then(s, a);
  l((e = e.apply(o, t)).next());
});
var V = {};
C(V, { getStreams: () => J });
module.exports = P(V);
var K = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function z(o, t) {
  return o >= 3840 || t >= 2160 ? "4K" : o >= 1920 || t >= 1080 ? "1080p" : o >= 1280 || t >= 720 ? "720p" : o >= 854 || t >= 480 ? "480p" : "360p";
}
function R(e) {
  return f(this, arguments, function* (o, t = {}) {
    try {
      let r = yield (yield fetch(o, { headers: d({ "User-Agent": K }, t), redirect: "follow" })).text();
      if (!r.includes("#EXT-X-STREAM-INF")) {
        let c = o.match(/[_-](\d{3,4})p/);
        return c ? `${c[1]}p` : "1080p";
      }
      let s = 0, a = 0, l = r.split(`
`);
      for (let c of l) {
        let i = c.match(/RESOLUTION=(\d+)x(\d+)/);
        if (i) {
          let u = parseInt(i[1]), p = parseInt(i[2]);
          p > a && (a = p, s = u);
        }
      }
      return a > 0 ? z(s, a) : "1080p";
    } catch (n) {
      return "1080p";
    }
  });
}
var U = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
function B(o) {
  let t = o.match(/eval\(function\(p,a,c,k,e,d\)\{.*?\}\('([\s\S]*?)',(\d+),(\d+),'([\s\S]*?)'\.split\('\|'\)\)\)/);
  if (!t)
    return null;
  let [, e, n, r, s] = t;
  for (n = parseInt(n), r = parseInt(r), s = s.split("|"); r--; )
    s[r] && (e = e.replace(new RegExp("\\b" + r.toString(n) + "\\b", "g"), s[r]));
  return e;
}
function v(o) {
  return f(this, null, function* () {
    var t;
    try {
      let n = yield (yield fetch(o, { headers: { "User-Agent": U, Referer: "https://www3.seriesmetro.net/" }, redirect: "follow" })).text(), r = B(n);
      if (!r)
        return null;
      let s = (t = r.match(/file:"(https?:\/\/[^"]+\.m3u8[^"]*)"/)) == null ? void 0 : t[1];
      if (!s)
        return null;
      let a = yield R(s, { Referer: "https://fastream.to/" });
      return { url: s, quality: a, headers: { "User-Agent": U, Referer: "https://fastream.to/" } };
    } catch (e) {
      return console.error("[Fastream] Error:", e.message), null;
    }
  });
}
var O = "439c478a771f35c05022f9feabcca01c", x = "https://www3.seriesmetro.net", X = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", M = { "User-Agent": X, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9", Connection: "keep-alive", "Upgrade-Insecure-Requests": "1" }, T = ["latino", "lat", "castellano", "espa\xF1ol", "esp", "vose", "sub", "subtitulado"], G = { latino: "Latino", lat: "Latino", castellano: "Espa\xF1ol", espa\u00F1ol: "Espa\xF1ol", esp: "Espa\xF1ol", vose: "Subtitulado", sub: "Subtitulado", subtitulado: "Subtitulado" };
function F(o) {
  return o.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "y").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function H(o, t) {
  return f(this, null, function* () {
    let e = [{ lang: "es-MX", name: "Latino" }, { lang: "es-ES", name: "Espa\xF1a" }, { lang: "en-US", name: "Ingl\xE9s" }];
    for (let { lang: n, name: r } of e)
      try {
        let s = `https://api.themoviedb.org/3/${t}/${o}?api_key=${O}&language=${n}`, a = yield fetch(s).then((i) => i.json()), l = t === "movie" ? a.title : a.name, c = t === "movie" ? a.original_title : a.original_name;
        if (n === "es-MX" && /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(l))
          continue;
        return console.log(`[SeriesMetro] TMDB (${r}): "${l}"`), { title: l, originalTitle: c };
      } catch (s) {
        console.log(`[SeriesMetro] Error TMDB ${r}: ${s.message}`);
      }
    return null;
  });
}
function j(o, t) {
  return f(this, null, function* () {
    let { title: e, originalTitle: n } = o, r = t === "movie" ? "pelicula" : "serie", s = [];
    e && s.push(F(e)), n && n !== e && s.push(F(n));
    for (let a of s) {
      let l = `${x}/${r}/${a}/`;
      try {
        let c = yield fetch(l, { headers: M }).then((i) => i.text());
        if (c.includes("trembed=") || c.includes("data-post="))
          return console.log(`[SeriesMetro] \u2713 Encontrado: /${r}/${a}/`), { url: l, html: c };
      } catch (c) {
        console.log(`[SeriesMetro] Error fetch ${l}: ${c.message}`);
      }
    }
    return console.log("[SeriesMetro] No encontrado por slug"), null;
  });
}
function Q(o, t, e, n) {
  return f(this, null, function* () {
    var s;
    let r = (s = t.match(/data-post="(\d+)"/)) == null ? void 0 : s[1];
    if (!r)
      return console.log("[SeriesMetro] No se encontr\xF3 data-post"), null;
    try {
      let a = new URLSearchParams({ action: "action_select_season", post: r, season: String(e) }), u = [...(yield (yield fetch(`${x}/wp-admin/admin-ajax.php`, { method: "POST", headers: E(d({}, M), { "Content-Type": "application/x-www-form-urlencoded", Referer: o }), body: a })).text()).matchAll(/href="([^"]+\/capitulo\/[^"]+)"/g)].map((p) => p[1]).find((p) => {
        let m = p.match(/temporada-(\d+)-capitulo-(\d+)/i);
        return m && parseInt(m[1]) === e && parseInt(m[2]) === n;
      });
      return u ? (console.log(`[SeriesMetro] \u2713 Episodio S${e}E${n} encontrado: ${u}`), u) : (console.log(`[SeriesMetro] Episodio S${e}E${n} no encontrado`), null);
    } catch (a) {
      return console.log(`[SeriesMetro] Error getEpisodeUrl: ${a.message}`), null;
    }
  });
}
function Y(o, t) {
  return f(this, null, function* () {
    var i;
    let e = yield fetch(o, { headers: E(d({}, M), { Referer: t }) }).then((u) => u.text()), n = [...e.matchAll(/href="#options-(\d+)"[^>]*>[\s\S]*?<span class="server">([\s\S]*?)<\/span>/g)], r = [...e.matchAll(/\?trembed=(\d+)(?:&#038;|&)trid=(\d+)(?:&#038;|&)trtype=(\d+)/g)];
    if (r.length === 0 || n.length === 0)
      return [];
    let s = r[0][2], a = r[0][3], l = n.sort(([, , u], [, , p]) => {
      let m = u.replace(/<[^>]+>/g, "").split("-").pop().trim().toLowerCase(), $ = p.replace(/<[^>]+>/g, "").split("-").pop().trim().toLowerCase(), g = T.indexOf(m), h = T.indexOf($);
      return (g === -1 ? 99 : g) - (h === -1 ? 99 : h);
    }), c = [];
    for (let [, u, p] of l) {
      let $ = p.replace(/<[^>]+>/g, "").trim().split("-").pop().trim().toLowerCase(), g = G[$] || $;
      try {
        let b = (i = (yield fetch(`${x}/?trembed=${u}&trid=${s}&trtype=${a}`, { headers: E(d({}, M), { Referer: o }) }).then((I) => I.text())).match(/<iframe[^>]*src="(https?:\/\/fastream\.to\/[^"]+)"/i)) == null ? void 0 : i[1];
        if (!b)
          continue;
        let S = yield v(b);
        if (!S)
          continue;
        if (c.push({ name: "SeriesMetro", title: `${S.quality} \xB7 ${g} \xB7 Fastream`, url: S.url, quality: S.quality, headers: S.headers }), g === "Latino")
          return console.log("[SeriesMetro] Latino encontrado, retornando"), c;
      } catch (h) {
        console.log(`[SeriesMetro] Error embed ${u}: ${h.message}`);
      }
    }
    return c;
  });
}
function J(o, t, e, n) {
  return f(this, null, function* () {
    if (!o || !t)
      return [];
    let r = Date.now();
    console.log(`[SeriesMetro] Buscando: TMDB ${o} (${t})${e ? ` S${e}E${n}` : ""}`);
    try {
      let s = yield H(o, t);
      if (!s)
        return [];
      let a = yield j(s, t);
      if (!a)
        return [];
      let l = a.url;
      if (t === "tv" && e && n) {
        let u = yield Q(a.url, a.html, e, n);
        if (!u)
          return console.log(`[SeriesMetro] Episodio S${e}E${n} no encontrado`), [];
        console.log(`[SeriesMetro] Episodio: ${u}`), l = u;
      }
      let c = yield Y(l, a.url), i = ((Date.now() - r) / 1e3).toFixed(2);
      return console.log(`[SeriesMetro] \u2713 ${c.length} streams en ${i}s`), c;
    } catch (s) {
      return console.log(`[SeriesMetro] Error: ${s.message}`), [];
    }
  });
}
