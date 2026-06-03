var $ = Object.defineProperty;
var V = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames, U = Object.getOwnPropertySymbols;
var T = Object.prototype.hasOwnProperty, P = Object.prototype.propertyIsEnumerable;
var W = (t, n, o) => n in t ? $(t, n, { enumerable: true, configurable: true, writable: true, value: o }) : t[n] = o, v = (t, n) => {
  for (var o in n || (n = {}))
    T.call(n, o) && W(t, o, n[o]);
  if (U)
    for (var o of U(n))
      P.call(n, o) && W(t, o, n[o]);
  return t;
};
var D = (t, n) => {
  for (var o in n)
    $(t, o, { get: n[o], enumerable: true });
}, F = (t, n, o, r) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let i of z(n))
      !T.call(t, i) && i !== o && $(t, i, { get: () => n[i], enumerable: !(r = V(n, i)) || r.enumerable });
  return t;
};
var j = (t) => F($({}, "__esModule", { value: true }), t);
var h = (t, n, o) => new Promise((r, i) => {
  var s = (l) => {
    try {
      f(o.next(l));
    } catch (c) {
      i(c);
    }
  }, a = (l) => {
    try {
      f(o.throw(l));
    } catch (c) {
      i(c);
    }
  }, f = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(s, a);
  f((o = o.apply(t, n)).next());
});
var ve = {};
D(ve, { getStreams: () => we });
module.exports = j(ve);
var Q = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", x = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, B = ["x", "o", "h", "n", "l"];
function G(t) {
  return t.includes("vimeos") ? x.vimeos : t.includes("goodstream") ? x.goodstream : t.includes("cloudwindow-route") ? x.voe : t.includes("minochinos") || t.includes("vidhide") || t.includes("dintezuvio") || t.includes("dramiyos") ? x.vidhide : t.includes("premilkyway") || t.includes("hlswish") || t.includes("vibuxer") || t.includes("streamwish") ? x.streamwish : null;
}
function A(o) {
  return h(this, arguments, function* (t, n = {}) {
    let r = g(t);
    return r !== "Unknown" ? r : yield X(t, n);
  });
}
function g(t) {
  if (!t)
    return "Unknown";
  let n = G(t);
  if (n) {
    let r = t.match(/_,([a-z,]+),\.urlset/);
    if (r) {
      let i = r[1].split(",").filter(Boolean);
      for (let s of B)
        if (i.includes(s) && n[s])
          return n[s];
    }
  }
  let o = t.match(/[_\-\/](\d{3,4})p/);
  return o ? o[1] + "p" : "Unknown";
}
function K(t, n) {
  return t >= 3840 || n >= 2160 ? "4K" : t >= 1920 || n >= 1080 ? "1080p" : t >= 1280 || n >= 720 ? "720p" : t >= 854 || n >= 480 ? "480p" : "360p";
}
function X(o) {
  return h(this, arguments, function* (t, n = {}) {
    try {
      console.log("[detectQuality] Fetching:", t.substring(0, 80));
      let r = yield fetch(t, { headers: v({ "User-Agent": Q }, n), redirect: "follow" });
      console.log("[detectQuality] Status:", r.status, "ok:", r.ok);
      let i = yield r.text();
      if (console.log("[detectQuality] Response length:", i.length, "primeros 100:", i.substring(0, 100)), !i.includes("#EXT-X-STREAM-INF")) {
        let f = t.match(/[_-](\d{3,4})p/);
        return f ? `${f[1]}p` : "Unknown";
      }
      let s = 0, a = 0;
      for (let f of i.split(`
`)) {
        let l = f.match(/RESOLUTION=(\d+)x(\d+)/);
        if (l) {
          let c = parseInt(l[2]);
          c > a && (a = c, s = parseInt(l[1]));
        }
      }
      return a > 0 ? K(s, a) : "Unknown";
    } catch (r) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var k = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function N(t) {
  return h(this, null, function* () {
    try {
      console.log(`[GoodStream] Resolviendo: ${t}`);
      let n = yield fetch(t, { headers: { "User-Agent": k, Referer: "https://goodstream.one", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let r = (yield n.text()).match(/file:\s*"([^"]+)"/);
      if (!r)
        return console.log('[GoodStream] No se encontr\xF3 patr\xF3n file:"..."'), null;
      let i = r[1], s = { Referer: t, Origin: "https://goodstream.one", "User-Agent": k }, a = g(i);
      return console.log(`[GoodStream] URL encontrada (${a}): ${i.substring(0, 80)}...`), { url: i, quality: a, headers: s };
    } catch (n) {
      return console.log(`[GoodStream] Error: ${n.message}`), null;
    }
  });
}
var J = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function _(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (n) {
    return null;
  }
}
function Y(t, n) {
  try {
    let r = n.replace(/^\[|\]$/g, "").split("','").map((c) => c.replace(/^'+|'+$/g, "")).map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), i = "";
    for (let c of t) {
      let u = c.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), i += String.fromCharCode(u);
    }
    for (let c of r)
      i = i.replace(new RegExp(c, "g"), "_");
    i = i.split("_").join("");
    let s = _(i);
    if (!s)
      return null;
    let a = "";
    for (let c = 0; c < s.length; c++)
      a += String.fromCharCode((s.charCodeAt(c) - 3 + 256) % 256);
    let f = a.split("").reverse().join(""), l = _(f);
    return l ? JSON.parse(l) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function E(o) {
  return h(this, arguments, function* (t, n = {}) {
    return yield fetch(t, { method: "GET", headers: v({ "User-Agent": J, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, n), redirect: "follow" });
  });
}
function O(t) {
  return h(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let n = yield E(t, { Referer: t });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let o = yield n.text();
      if (/permanentToken/i.test(o)) {
        let l = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (l) {
          console.log(`[VOE] Permanent token redirect -> ${l[1]}`);
          let c = yield E(l[1], { Referer: t });
          c.ok && (o = yield c.text());
        }
      }
      let r = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (r) {
        let l = r[1], c = r[2].startsWith("http") ? r[2] : new URL(r[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${c}`);
        let u = yield E(c, { Referer: t }), p = u.ok ? yield u.text() : "", m = p.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || p.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (m) {
          let d = Y(l, m[1]);
          if (d && (d.source || d.direct_access_url)) {
            let S = d.source || d.direct_access_url, C = g(S);
            return console.log(`[VOE] URL encontrada: ${S.substring(0, 80)}...`), { url: S, quality: C, headers: { Referer: t } };
          }
        }
      }
      let i = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, s = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], f;
      for (; (f = i.exec(o)) !== null; )
        a.push(f);
      for (; (f = s.exec(o)) !== null; )
        a.push(f);
      for (let l of a) {
        let c = l[1];
        if (!c)
          continue;
        let u = c;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (p) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: g(u), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (n) {
      return console.log(`[VOE] Error: ${n.message}`), null;
    }
  });
}
var w = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function Z(t, n, o) {
  let r = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", i = (s) => {
    let a = 0;
    for (let f = 0; f < s.length; f++) {
      let l = r.indexOf(s[f]);
      if (l === -1)
        return NaN;
      a = a * n + l;
    }
    return a;
  };
  return t.replace(/\b([0-9a-zA-Z]+)\b/g, (s) => {
    let a = i(s);
    return isNaN(a) || a >= o.length ? s : o[a] && o[a] !== "" ? o[a] : s;
  });
}
function ee(t, n) {
  let o = t.match(/\{[^{}]*"hls[234]"\s*:\s*"([^"]+)"[^{}]*\}/);
  if (o)
    try {
      let i = o[0].replace(/(\w+)\s*:/g, '"$1":'), s = JSON.parse(i), a = s.hls4 || s.hls3 || s.hls2;
      if (a)
        return a.startsWith("/") ? n + a : a;
    } catch (i) {
      let s = o[0].match(/"hls[234]"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
      if (s) {
        let a = s[1];
        return a.startsWith("/") ? n + a : a;
      }
    }
  let r = t.match(/["']([^"']{30,}\.m3u8[^"']*)['"]/i);
  if (r) {
    let i = r[1];
    return i.startsWith("/") ? n + i : i;
  }
  return null;
}
var te = { "hglink.to": "vibuxer.com" };
function y(t) {
  return h(this, null, function* () {
    var n;
    try {
      let o = t;
      for (let [c, u] of Object.entries(te))
        if (o.includes(c)) {
          o = o.replace(c, u);
          break;
        }
      let r = ((n = o.match(/^(https?:\/\/[^/]+)/)) == null ? void 0 : n[1]) || "https://hlswish.com";
      console.log(`[HLSWish] Resolviendo: ${t}`), o !== t && console.log(`[HLSWish] \u2192 Mapped to: ${o}`);
      let i = yield fetch(o, { headers: { "User-Agent": w, Referer: "https://embed69.org/", Origin: "https://embed69.org", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9" }, redirect: "follow" });
      if (!i.ok)
        throw new Error(`HTTP ${i.status}`);
      let s = yield i.text(), a = s.match(/file\s*:\s*["']([^"']+)["']/i);
      if (a) {
        let c = a[1];
        if (c.startsWith("/") && (c = r + c), c.includes("vibuxer.com/stream/")) {
          console.log(`[HLSWish] Siguiendo redirect: ${c.substring(0, 80)}...`);
          try {
            let p = (yield fetch(c, { headers: { "User-Agent": w, Referer: r + "/" }, redirect: "follow" })).url;
            p && p.includes(".m3u8") && (c = p);
          } catch (u) {
          }
        }
        return console.log(`[HLSWish] URL encontrada: ${c.substring(0, 80)}...`), { url: c, quality: yield A(c, { Referer: r + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: r + "/" } };
      }
      let f = s.match(/eval\(function\(p,a,c,k,e,[a-z]\)\{[^}]+\}\s*\('([\s\S]+?)',\s*(\d+),\s*(\d+),\s*'([\s\S]+?)'\.split\('\|'\)/);
      if (f) {
        let c = Z(f[1], parseInt(f[2]), f[4].split("|")), u = ee(c, r);
        if (u)
          return console.log(`[HLSWish] URL encontrada: ${u.substring(0, 80)}...`), { url: u, quality: yield A(u, { Referer: r + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: r + "/" } };
      }
      let l = s.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
      return l ? (console.log(`[HLSWish] URL encontrada: ${l[0].substring(0, 80)}...`), { url: l[0], quality: yield A(l[0], { Referer: r + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: r + "/" } }) : (console.log("[HLSWish] No se encontr\xF3 URL"), null);
    } catch (o) {
      return console.log(`[HLSWish] Error: ${o.message}`), null;
    }
  });
}
var I = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function H(t) {
  return h(this, null, function* () {
    try {
      console.log(`[Vimeos] Resolviendo: ${t}`);
      let n = yield fetch(t, { headers: { "User-Agent": I, Referer: "https://vimeos.net/", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let r = (yield n.text()).match(/eval\(function\(p,a,c,k,e,[dr]\)\{[\s\S]+?\}\('([\s\S]+?)',(\d+),(\d+),'([\s\S]+?)'\.split\('\|'\)/);
      if (r) {
        let i = r[1], s = parseInt(r[2]), a = r[4].split("|"), f = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l = (p) => {
          let m = 0;
          for (let d = 0; d < p.length; d++)
            m = m * s + f.indexOf(p[d]);
          return m;
        }, u = i.replace(/\b(\w+)\b/g, (p) => {
          let m = l(p);
          return a[m] && a[m] !== "" ? a[m] : p;
        }).match(/["']([^"']+\.m3u8[^"']*)['"]/i);
        if (u) {
          let p = u[1], m = { "User-Agent": I, Referer: "https://vimeos.net/" }, d = g(p);
          return console.log(`[Vimeos] URL encontrada: ${p.substring(0, 80)}...`), { url: p, quality: d, headers: m };
        }
      }
      return console.log("[Vimeos] No se encontr\xF3 URL"), null;
    } catch (n) {
      return console.log(`[Vimeos] Error: ${n.message}`), null;
    }
  });
}
var ne = "439c478a771f35c05022f9feabcca01c", M = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", L = { "User-Agent": M, Accept: "application/json" }, b = "https://lamovie.org", oe = ["JP", "CN", "KR"], re = 16, se = { "goodstream.one": N, "hlswish.com": y, "streamwish.com": y, "streamwish.to": y, "strwish.com": y, "voe.sx": O, "vimeos.net": H }, ie = [];
function R(o) {
  return h(this, arguments, function* (t, n = {}) {
    let r = yield fetch(t, { headers: v({ "User-Agent": M }, n.headers), redirect: "follow" });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    return (r.headers.get("content-type") || "").includes("json") ? r.json() : r.text();
  });
}
var ae = (t) => t.includes("goodstream") ? "GoodStream" : t.includes("hlswish") || t.includes("streamwish") ? "StreamWish" : t.includes("voe.sx") ? "VOE" : t.includes("filemoon") ? "Filemoon" : t.includes("vimeos.net") ? "Vimeos" : "Online", ce = (t) => {
  try {
    if (ie.some((n) => t.includes(n)))
      return null;
    for (let [n, o] of Object.entries(se))
      if (t.includes(n))
        return o;
  } catch (n) {
  }
  return null;
};
function q(t, n) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return n ? `${o}-${n}` : o;
}
function le(t, n, o) {
  return t === "movie" ? ["peliculas"] : (n || []).includes(re) ? (o || []).some((s) => oe.includes(s)) ? ["animes"] : ["animes", "series"] : ["series"];
}
function ue(t, n) {
  return h(this, null, function* () {
    var c;
    let o = [{ lang: "es-MX", name: "Latino" }, { lang: "en-US", name: "Ingl\xE9s" }], [r, i] = yield Promise.all(o.map(({ lang: u }) => R(`https://api.themoviedb.org/3/${n}/${t}?api_key=${ne}&language=${u}`, { headers: L }).catch(() => null))), s = r && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(r.title || r.name) ? r : i;
    if (!s)
      return null;
    let a = n === "movie" ? s.title : s.name, f = n === "movie" ? s.original_title : s.original_name;
    return console.log(`[LaMovie] TMDB (${s === r ? "Latino" : "Ingl\xE9s"}): "${a}"${a !== f ? ` | Original: "${f}"` : ""}`), { title: a, originalTitle: f, year: (s.release_date || s.first_air_date || "").substring(0, 4), genres: (s.genres || []).map((u) => u.id), originCountries: s.origin_country || ((c = s.production_countries) == null ? void 0 : c.map((u) => u.iso_3166_1)) || [] };
  });
}
var fe = { "User-Agent": M, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9", Connection: "keep-alive", "Upgrade-Insecure-Requests": "1" };
function pe(t) {
  let n = t.match(/rel=['"]shortlink['"]\s+href=['"][^'"]*\?p=(\d+)['"]/);
  return n ? n[1] : null;
}
function de(t, n) {
  return h(this, null, function* () {
    let o = `${b}/${t}/${n}/`;
    try {
      let r = yield R(o, { headers: fe, validateStatus: (s) => s === 200 }), i = pe(r);
      return i ? (console.log(`[LaMovie] \u2713 Slug directo: /${t}/${n} \u2192 id:${i}`), { id: i }) : null;
    } catch (r) {
      return null;
    }
  });
}
function he(t, n) {
  return h(this, null, function* () {
    let { title: o, originalTitle: r, year: i, genres: s, originCountries: a } = t, f = le(n, s, a), l = [];
    o && l.push(q(o, i)), r && r !== o && l.push(q(r, i));
    let c = l.flatMap((u) => f.map((p) => de(p, u)));
    try {
      return yield Promise.any(c);
    } catch (u) {
      return null;
    }
  });
}
function me(t, n, o) {
  return h(this, null, function* () {
    var i;
    let r = `${b}/wp-api/v1/single/episodes/list?_id=${t}&season=${n}&page=1&postsPerPage=50`;
    try {
      let s = yield R(r, { headers: L });
      if (!((i = s == null ? void 0 : s.data) != null && i.posts))
        return null;
      let a = s.data.posts.find((f) => f.season_number == n && f.episode_number == o);
      return (a == null ? void 0 : a._id) || null;
    } catch (s) {
      return console.log(`[LaMovie] Error episodios: ${s.message}`), null;
    }
  });
}
function ge(t) {
  return h(this, null, function* () {
    try {
      let n = ce(t.url);
      if (!n)
        return console.log(`[LaMovie] Sin resolver para: ${t.url}`), null;
      let o = yield n(t.url);
      if (!o || !o.url)
        return null;
      let r = ae(t.url), i = o.quality || "Unknown";
      return { name: "LaMovie", title: `${i} \xB7 ${r}`, url: o.url, quality: i, headers: o.headers || {} };
    } catch (n) {
      return console.log(`[LaMovie] Error procesando embed: ${n.message}`), null;
    }
  });
}
function we(t, n, o, r) {
  return h(this, null, function* () {
    var s;
    if (!t || !n)
      return [];
    let i = Date.now();
    console.log(`[LaMovie] Buscando: TMDB ${t} (${n})${o ? ` S${o}E${r}` : ""}`);
    try {
      let a = yield ue(t, n);
      if (!a)
        return [];
      let f = yield he(a, n);
      if (!f)
        return console.log("[LaMovie] No encontrado por slug"), [];
      let l = f.id;
      if (n === "tv" && o && r) {
        let d = yield me(l, o, r);
        if (!d)
          return console.log(`[LaMovie] Episodio S${o}E${r} no encontrado`), [];
        l = d;
      }
      let c = yield R(`${b}/wp-api/v1/player?postId=${l}&demo=0`, { headers: L });
      if (!((s = c == null ? void 0 : c.data) != null && s.embeds))
        return console.log("[LaMovie] No hay embeds disponibles"), [];
      let p = (yield Promise.allSettled(c.data.embeds.map((d) => ge(d)))).filter((d) => d.status === "fulfilled" && d.value).map((d) => d.value), m = ((Date.now() - i) / 1e3).toFixed(2);
      return console.log(`[LaMovie] \u2713 ${p.length} streams en ${m}s`), p;
    } catch (a) {
      return console.log(`[LaMovie] Error: ${a.message}`), [];
    }
  });
}
