var w = Object.defineProperty, _ = Object.defineProperties, D = Object.getOwnPropertyDescriptor, N = Object.getOwnPropertyDescriptors, W = Object.getOwnPropertyNames, y = Object.getOwnPropertySymbols;
var v = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable;
var L = (o, t, e) => t in o ? w(o, t, { enumerable: true, configurable: true, writable: true, value: e }) : o[t] = e, g = (o, t) => {
  for (var e in t || (t = {}))
    v.call(t, e) && L(o, e, t[e]);
  if (y)
    for (var e of y(t))
      C.call(t, e) && L(o, e, t[e]);
  return o;
}, E = (o, t) => _(o, N(t));
var q = (o, t) => {
  for (var e in t)
    w(o, e, { get: t[e], enumerable: true });
}, P = (o, t, e, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of W(t))
      !v.call(o, r) && r !== e && w(o, r, { get: () => t[r], enumerable: !(s = D(t, r)) || s.enumerable });
  return o;
};
var K = (o) => P(w({}, "__esModule", { value: true }), o);
var f = (o, t, e) => new Promise((s, r) => {
  var n = (c) => {
    try {
      u(e.next(c));
    } catch (l) {
      r(l);
    }
  }, a = (c) => {
    try {
      u(e.throw(c));
    } catch (l) {
      r(l);
    }
  }, u = (c) => c.done ? s(c.value) : Promise.resolve(c.value).then(n, a);
  u((e = e.apply(o, t)).next());
});
var V = {};
q(V, { getStreams: () => J });
module.exports = K(V);
var z = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function B(o, t) {
  return o >= 3840 || t >= 2160 ? "4K" : o >= 1920 || t >= 1080 ? "1080p" : o >= 1280 || t >= 720 ? "720p" : o >= 854 || t >= 480 ? "480p" : "360p";
}
function R(e) {
  return f(this, arguments, function* (o, t = {}) {
    try {
      let r = yield (yield fetch(o, { headers: g({ "User-Agent": z }, t), redirect: "follow" })).text();
      if (!r.includes("#EXT-X-STREAM-INF")) {
        let c = o.match(/[_-](\d{3,4})p/);
        return c ? `${c[1]}p` : "1080p";
      }
      let n = 0, a = 0, u = r.split(`
`);
      for (let c of u) {
        let l = c.match(/RESOLUTION=(\d+)x(\d+)/);
        if (l) {
          let i = parseInt(l[1]), p = parseInt(l[2]);
          p > a && (a = p, n = i);
        }
      }
      return a > 0 ? B(n, a) : "1080p";
    } catch (s) {
      return "1080p";
    }
  });
}
var U = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
function O(o) {
  let t = o.match(/eval\(function\(p,a,c,k,e,d\)\{.*?\}\('([\s\S]*?)',(\d+),(\d+),'([\s\S]*?)'\.split\('\|'\)\)\)/);
  if (!t)
    return null;
  let [, e, s, r, n] = t;
  for (s = parseInt(s), r = parseInt(r), n = n.split("|"); r--; )
    n[r] && (e = e.replace(new RegExp("\\b" + r.toString(s) + "\\b", "g"), n[r]));
  return e;
}
function F(o) {
  return f(this, null, function* () {
    var t;
    try {
      let s = yield (yield fetch(o, { headers: { "User-Agent": U, Referer: "https://www3.seriesmetro.net/" }, redirect: "follow" })).text(), r = O(s);
      if (!r)
        return null;
      let n = (t = r.match(/file:"(https?:\/\/[^"]+\.m3u8[^"]*)"/)) == null ? void 0 : t[1];
      if (!n)
        return null;
      let a = yield R(n, { Referer: "https://fastream.to/" });
      return { url: n, quality: a, headers: { "User-Agent": U, Referer: "https://fastream.to/" } };
    } catch (e) {
      return console.error("[Fastream] Error:", e.message), null;
    }
  });
}
var T = "439c478a771f35c05022f9feabcca01c", b = "https://www3.seriesmetro.net", X = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", M = { "User-Agent": X, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9", Connection: "keep-alive", "Upgrade-Insecure-Requests": "1" }, k = ["latino", "lat", "castellano", "espa\xF1ol", "esp", "vose", "sub", "subtitulado"], G = { latino: "Latino", lat: "Latino", castellano: "Espa\xF1ol", espa\u00F1ol: "Espa\xF1ol", esp: "Espa\xF1ol", vose: "Subtitulado", sub: "Subtitulado", subtitulado: "Subtitulado" };
function x(o) {
  return o.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "y").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function H(o, t) {
  return f(this, null, function* () {
    let e = [{ lang: "es-MX", name: "Latino" }, { lang: "en-US", name: "Ingl\xE9s" }], s = null;
    try {
      let r = `https://api.themoviedb.org/3/${t}/${o}?api_key=${T}&language=es-ES`, n = yield fetch(r).then((a) => a.json());
      s = t === "movie" ? n.title : n.name;
    } catch (r) {
    }
    for (let { lang: r, name: n } of e)
      try {
        let a = `https://api.themoviedb.org/3/${t}/${o}?api_key=${T}&language=${r}`, u = yield fetch(a).then((i) => i.json()), c = t === "movie" ? u.title : u.name, l = t === "movie" ? u.original_title : u.original_name;
        if (r === "es-MX" && /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(c))
          continue;
        return console.log(`[SeriesMetro] TMDB (${n}): "${c}"`), { title: c, originalTitle: l, titleEs: s };
      } catch (a) {
        console.log(`[SeriesMetro] Error TMDB ${n}: ${a.message}`);
      }
    return null;
  });
}
function j(o, t) {
  return f(this, null, function* () {
    let { title: e, originalTitle: s, titleEs: r } = o, n = t === "movie" ? "pelicula" : "serie", a = [];
    e && a.push(x(e)), s && s !== e && a.push(x(s)), r && r !== e && a.push(x(r));
    for (let u of a) {
      let c = `${b}/${n}/${u}/`;
      try {
        let l = yield fetch(c, { headers: M }).then((i) => i.text());
        if (l.includes("trembed=") || l.includes("data-post="))
          return console.log(`[SeriesMetro] \u2713 Encontrado: /${n}/${u}/`), { url: c, html: l };
      } catch (l) {
        console.log(`[SeriesMetro] Error fetch ${c}: ${l.message}`);
      }
    }
    return console.log("[SeriesMetro] No encontrado por slug"), null;
  });
}
function Q(o, t, e, s) {
  return f(this, null, function* () {
    var n;
    let r = (n = t.match(/data-post="(\d+)"/)) == null ? void 0 : n[1];
    if (!r)
      return console.log("[SeriesMetro] No se encontr\xF3 data-post"), null;
    try {
      let a = new URLSearchParams({ action: "action_select_season", post: r, season: String(e) }), i = [...(yield (yield fetch(`${b}/wp-admin/admin-ajax.php`, { method: "POST", headers: E(g({}, M), { "Content-Type": "application/x-www-form-urlencoded", Referer: o }), body: a })).text()).matchAll(/href="([^"]+\/capitulo\/[^"]+)"/g)].map((p) => p[1]).find((p) => {
        let m = p.match(/temporada-(\d+)-capitulo-(\d+)/i);
        return m && parseInt(m[1]) === e && parseInt(m[2]) === s;
      });
      return i ? (console.log(`[SeriesMetro] \u2713 Episodio S${e}E${s} encontrado: ${i}`), i) : (console.log(`[SeriesMetro] Episodio S${e}E${s} no encontrado`), null);
    } catch (a) {
      return console.log(`[SeriesMetro] Error getEpisodeUrl: ${a.message}`), null;
    }
  });
}
function Y(o, t) {
  return f(this, null, function* () {
    var l;
    let e = yield fetch(o, { headers: E(g({}, M), { Referer: t }) }).then((i) => i.text()), s = [...e.matchAll(/href="#options-(\d+)"[^>]*>[\s\S]*?<span class="server">([\s\S]*?)<\/span>/g)], r = [...e.matchAll(/\?trembed=(\d+)(?:&#038;|&)trid=(\d+)(?:&#038;|&)trtype=(\d+)/g)];
    if (r.length === 0 || s.length === 0)
      return [];
    let n = r[0][2], a = r[0][3], u = s.sort(([, , i], [, , p]) => {
      let m = i.replace(/<[^>]+>/g, "").split("-").pop().trim().toLowerCase(), S = p.replace(/<[^>]+>/g, "").split("-").pop().trim().toLowerCase(), d = k.indexOf(m), h = k.indexOf(S);
      return (d === -1 ? 99 : d) - (h === -1 ? 99 : h);
    }), c = [];
    for (let [, i, p] of u) {
      let S = p.replace(/<[^>]+>/g, "").trim().split("-").pop().trim().toLowerCase(), d = G[S] || S;
      try {
        let A = (l = (yield fetch(`${b}/?trembed=${i}&trid=${n}&trtype=${a}`, { headers: E(g({}, M), { Referer: o }) }).then((I) => I.text())).match(/<iframe[^>]*src="(https?:\/\/fastream\.to\/[^"]+)"/i)) == null ? void 0 : l[1];
        if (!A)
          continue;
        let $ = yield F(A);
        if (!$)
          continue;
        if (c.push({ name: "SeriesMetro", title: `${$.quality} \xB7 ${d} \xB7 Fastream`, url: $.url, quality: $.quality, headers: $.headers }), d === "Latino")
          return console.log("[SeriesMetro] Latino encontrado, retornando"), c;
      } catch (h) {
        console.log(`[SeriesMetro] Error embed ${i}: ${h.message}`);
      }
    }
    return c;
  });
}
function J(o, t, e, s) {
  return f(this, null, function* () {
    if (!o || !t)
      return [];
    let r = Date.now();
    console.log(`[SeriesMetro] Buscando: TMDB ${o} (${t})${e ? ` S${e}E${s}` : ""}`);
    try {
      let n = yield H(o, t);
      if (!n)
        return [];
      let a = yield j(n, t);
      if (!a)
        return [];
      let u = a.url;
      if (t === "tv" && e && s) {
        let i = yield Q(a.url, a.html, e, s);
        if (!i)
          return console.log(`[SeriesMetro] Episodio S${e}E${s} no encontrado`), [];
        console.log(`[SeriesMetro] Episodio: ${i}`), u = i;
      }
      let c = yield Y(u, a.url), l = ((Date.now() - r) / 1e3).toFixed(2);
      return console.log(`[SeriesMetro] \u2713 ${c.length} streams en ${l}s`), c;
    } catch (n) {
      return console.log(`[SeriesMetro] Error: ${n.message}`), [];
    }
  });
}
