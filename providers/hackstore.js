var y = Object.defineProperty, P = Object.defineProperties, z = Object.getOwnPropertyDescriptor, D = Object.getOwnPropertyDescriptors, Q = Object.getOwnPropertyNames, U = Object.getOwnPropertySymbols;
var H = Object.prototype.hasOwnProperty, j = Object.prototype.propertyIsEnumerable;
var W = (t, o, r) => o in t ? y(t, o, { enumerable: true, configurable: true, writable: true, value: r }) : t[o] = r, $ = (t, o) => {
  for (var r in o || (o = {}))
    H.call(o, r) && W(t, r, o[r]);
  if (U)
    for (var r of U(o))
      j.call(o, r) && W(t, r, o[r]);
  return t;
}, M = (t, o) => P(t, D(o));
var C = (t, o) => {
  for (var r in o)
    y(t, r, { get: o[r], enumerable: true });
}, K = (t, o, r, n) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let s of Q(o))
      !H.call(t, s) && s !== r && y(t, s, { get: () => o[s], enumerable: !(n = z(o, s)) || n.enumerable });
  return t;
};
var B = (t) => K(y({}, "__esModule", { value: true }), t);
var d = (t, o, r) => new Promise((n, s) => {
  var i = (l) => {
    try {
      f(r.next(l));
    } catch (a) {
      s(a);
    }
  }, c = (l) => {
    try {
      f(r.throw(l));
    } catch (a) {
      s(a);
    }
  }, f = (l) => l.done ? n(l.value) : Promise.resolve(l.value).then(i, c);
  f((r = r.apply(t, o)).next());
});
var we = {};
C(we, { getStreams: () => me });
module.exports = B(we);
var G = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", v = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, F = ["x", "o", "h", "n", "l"];
function X(t) {
  return t.includes("vimeos") ? v.vimeos : t.includes("goodstream") ? v.goodstream : t.includes("cloudwindow-route") ? v.voe : t.includes("minochinos") || t.includes("vidhide") || t.includes("dintezuvio") || t.includes("dramiyos") ? v.vidhide : t.includes("premilkyway") || t.includes("hlswish") || t.includes("vibuxer") || t.includes("streamwish") ? v.streamwish : null;
}
function R(r) {
  return d(this, arguments, function* (t, o = {}) {
    let n = m(t);
    return n !== "Unknown" ? n : yield Y(t, o);
  });
}
function m(t) {
  if (!t)
    return "Unknown";
  let o = X(t);
  if (o) {
    let n = t.match(/_,([a-z,]+),\.urlset/);
    if (n) {
      let s = n[1].split(",").filter(Boolean);
      for (let i of F)
        if (s.includes(i) && o[i])
          return o[i];
    }
  }
  let r = t.match(/[_\-\/](\d{3,4})p/);
  return r ? r[1] + "p" : "Unknown";
}
function J(t, o) {
  return t >= 3840 || o >= 2160 ? "4K" : t >= 1920 || o >= 1080 ? "1080p" : t >= 1280 || o >= 720 ? "720p" : t >= 854 || o >= 480 ? "480p" : "360p";
}
function Y(r) {
  return d(this, arguments, function* (t, o = {}) {
    try {
      console.log("[detectQuality] Fetching:", t.substring(0, 80));
      let n = yield fetch(t, { headers: $({ "User-Agent": G }, o), redirect: "follow" });
      console.log("[detectQuality] Status:", n.status, "ok:", n.ok);
      let s = yield n.text();
      if (console.log("[detectQuality] Response length:", s.length, "primeros 100:", s.substring(0, 100)), !s.includes("#EXT-X-STREAM-INF")) {
        let f = t.match(/[_-](\d{3,4})p/);
        return f ? `${f[1]}p` : "Unknown";
      }
      let i = 0, c = 0;
      for (let f of s.split(`
`)) {
        let l = f.match(/RESOLUTION=(\d+)x(\d+)/);
        if (l) {
          let a = parseInt(l[2]);
          a > c && (c = a, i = parseInt(l[1]));
        }
      }
      return c > 0 ? J(i, c) : "Unknown";
    } catch (n) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var L = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function T(t) {
  return d(this, null, function* () {
    try {
      console.log(`[GoodStream] Resolviendo: ${t}`);
      let o = yield fetch(t, { headers: { "User-Agent": L, Referer: "https://goodstream.one", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!o.ok)
        throw new Error(`HTTP ${o.status}`);
      let n = (yield o.text()).match(/file:\s*"([^"]+)"/);
      if (!n)
        return console.log('[GoodStream] No se encontr\xF3 patr\xF3n file:"..."'), null;
      let s = n[1], i = { Referer: t, Origin: "https://goodstream.one", "User-Agent": L }, c = m(s);
      return console.log(`[GoodStream] URL encontrada (${c}): ${s.substring(0, 80)}...`), { url: s, quality: c, headers: i };
    } catch (o) {
      return console.log(`[GoodStream] Error: ${o.message}`), null;
    }
  });
}
var Z = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function _(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (o) {
    return null;
  }
}
function ee(t, o) {
  try {
    let n = o.replace(/^\[|\]$/g, "").split("','").map((a) => a.replace(/^'+|'+$/g, "")).map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), s = "";
    for (let a of t) {
      let u = a.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), s += String.fromCharCode(u);
    }
    for (let a of n)
      s = s.replace(new RegExp(a, "g"), "_");
    s = s.split("_").join("");
    let i = _(s);
    if (!i)
      return null;
    let c = "";
    for (let a = 0; a < i.length; a++)
      c += String.fromCharCode((i.charCodeAt(a) - 3 + 256) % 256);
    let f = c.split("").reverse().join(""), l = _(f);
    return l ? JSON.parse(l) : null;
  } catch (r) {
    return console.log("[VOE] voeDecode error:", r.message), null;
  }
}
function S(r) {
  return d(this, arguments, function* (t, o = {}) {
    return yield fetch(t, { method: "GET", headers: $({ "User-Agent": Z, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, o), redirect: "follow" });
  });
}
function O(t) {
  return d(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let o = yield S(t, { Referer: t });
      if (!o.ok)
        throw new Error(`HTTP ${o.status}`);
      let r = yield o.text();
      if (/permanentToken/i.test(r)) {
        let l = r.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (l) {
          console.log(`[VOE] Permanent token redirect -> ${l[1]}`);
          let a = yield S(l[1], { Referer: t });
          a.ok && (r = yield a.text());
        }
      }
      let n = r.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (n) {
        let l = n[1], a = n[2].startsWith("http") ? n[2] : new URL(n[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${a}`);
        let u = yield S(a, { Referer: t }), h = u.ok ? yield u.text() : "", p = h.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || h.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (p) {
          let g = ee(l, p[1]);
          if (g && (g.source || g.direct_access_url)) {
            let k = g.source || g.direct_access_url, I = m(k);
            return console.log(`[VOE] URL encontrada: ${k.substring(0, 80)}...`), { url: k, quality: I, headers: { Referer: t } };
          }
        }
      }
      let s = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, i = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, c = [], f;
      for (; (f = s.exec(r)) !== null; )
        c.push(f);
      for (; (f = i.exec(r)) !== null; )
        c.push(f);
      for (let l of c) {
        let a = l[1];
        if (!a)
          continue;
        let u = a;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (h) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: m(u), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (o) {
      return console.log(`[VOE] Error: ${o.message}`), null;
    }
  });
}
var w = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function te(t, o, r) {
  let n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", s = (i) => {
    let c = 0;
    for (let f = 0; f < i.length; f++) {
      let l = n.indexOf(i[f]);
      if (l === -1)
        return NaN;
      c = c * o + l;
    }
    return c;
  };
  return t.replace(/\b([0-9a-zA-Z]+)\b/g, (i) => {
    let c = s(i);
    return isNaN(c) || c >= r.length ? i : r[c] && r[c] !== "" ? r[c] : i;
  });
}
function oe(t, o) {
  let r = t.match(/\{[^{}]*"hls[234]"\s*:\s*"([^"]+)"[^{}]*\}/);
  if (r)
    try {
      let s = r[0].replace(/(\w+)\s*:/g, '"$1":'), i = JSON.parse(s), c = i.hls4 || i.hls3 || i.hls2;
      if (c)
        return c.startsWith("/") ? o + c : c;
    } catch (s) {
      let i = r[0].match(/"hls[234]"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
      if (i) {
        let c = i[1];
        return c.startsWith("/") ? o + c : c;
      }
    }
  let n = t.match(/["']([^"']{30,}\.m3u8[^"']*)['"]/i);
  if (n) {
    let s = n[1];
    return s.startsWith("/") ? o + s : s;
  }
  return null;
}
var re = { "hglink.to": "vibuxer.com" };
function x(t) {
  return d(this, null, function* () {
    var o;
    try {
      let r = t;
      for (let [a, u] of Object.entries(re))
        if (r.includes(a)) {
          r = r.replace(a, u);
          break;
        }
      let n = ((o = r.match(/^(https?:\/\/[^/]+)/)) == null ? void 0 : o[1]) || "https://hlswish.com";
      console.log(`[HLSWish] Resolviendo: ${t}`), r !== t && console.log(`[HLSWish] \u2192 Mapped to: ${r}`);
      let s = yield fetch(r, { headers: { "User-Agent": w, Referer: "https://embed69.org/", Origin: "https://embed69.org", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9" }, redirect: "follow" });
      if (!s.ok)
        throw new Error(`HTTP ${s.status}`);
      let i = yield s.text(), c = i.match(/file\s*:\s*["']([^"']+)["']/i);
      if (c) {
        let a = c[1];
        if (a.startsWith("/") && (a = n + a), a.includes("vibuxer.com/stream/")) {
          console.log(`[HLSWish] Siguiendo redirect: ${a.substring(0, 80)}...`);
          try {
            let h = (yield fetch(a, { headers: { "User-Agent": w, Referer: n + "/" }, redirect: "follow" })).url;
            h && h.includes(".m3u8") && (a = h);
          } catch (u) {
          }
        }
        return console.log(`[HLSWish] URL encontrada: ${a.substring(0, 80)}...`), { url: a, quality: yield R(a, { Referer: n + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: n + "/" } };
      }
      let f = i.match(/eval\(function\(p,a,c,k,e,[a-z]\)\{[^}]+\}\s*\('([\s\S]+?)',\s*(\d+),\s*(\d+),\s*'([\s\S]+?)'\.split\('\|'\)/);
      if (f) {
        let a = te(f[1], parseInt(f[2]), f[4].split("|")), u = oe(a, n);
        if (u)
          return console.log(`[HLSWish] URL encontrada: ${u.substring(0, 80)}...`), { url: u, quality: yield R(u, { Referer: n + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: n + "/" } };
      }
      let l = i.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
      return l ? (console.log(`[HLSWish] URL encontrada: ${l[0].substring(0, 80)}...`), { url: l[0], quality: yield R(l[0], { Referer: n + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: n + "/" } }) : (console.log("[HLSWish] No se encontr\xF3 URL"), null);
    } catch (r) {
      return console.log(`[HLSWish] Error: ${r.message}`), null;
    }
  });
}
var N = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function q(t) {
  return d(this, null, function* () {
    try {
      console.log(`[Vimeos] Resolviendo: ${t}`);
      let o = yield fetch(t, { headers: { "User-Agent": N, Referer: "https://vimeos.net/", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!o.ok)
        throw new Error(`HTTP ${o.status}`);
      let n = (yield o.text()).match(/eval\(function\(p,a,c,k,e,[dr]\)\{[\s\S]+?\}\('([\s\S]+?)',(\d+),(\d+),'([\s\S]+?)'\.split\('\|'\)/);
      if (n) {
        let s = n[1], i = parseInt(n[2]), c = n[4].split("|"), f = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l = (h) => {
          let p = 0;
          for (let g = 0; g < h.length; g++)
            p = p * i + f.indexOf(h[g]);
          return p;
        }, u = s.replace(/\b(\w+)\b/g, (h) => {
          let p = l(h);
          return c[p] && c[p] !== "" ? c[p] : h;
        }).match(/["']([^"']+\.m3u8[^"']*)['"]/i);
        if (u) {
          let h = u[1], p = { "User-Agent": N, Referer: "https://vimeos.net/" }, g = m(h);
          return console.log(`[Vimeos] URL encontrada: ${h.substring(0, 80)}...`), { url: h, quality: g, headers: p };
        }
      }
      return console.log("[Vimeos] No se encontr\xF3 URL"), null;
    } catch (o) {
      return console.log(`[Vimeos] Error: ${o.message}`), null;
    }
  });
}
var ne = "439c478a771f35c05022f9feabcca01c", E = "https://hackstore2.com", b = `${E}/api/rest`, se = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", ce = { "User-Agent": se, Accept: "application/json", Referer: `${E}/`, Origin: E }, ie = { "goodstream.one": T, "hlswish.com": x, "streamwish.com": x, "streamwish.to": x, "strwish.com": x, "voe.sx": O, "vimeos.net": q };
function ae(t) {
  for (let [o, r] of Object.entries(ie))
    if (t.includes(o))
      return r;
  return null;
}
function A(t) {
  return d(this, null, function* () {
    let o = yield fetch(t, { headers: ce, redirect: "follow" });
    if (!o.ok)
      throw new Error(`HTTP ${o.status}`);
    return o.json();
  });
}
function le(t = "") {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function V(t, o) {
  let r = le(t).replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return o ? `${r}-${o}` : r;
}
function ue(t) {
  return t.includes("goodstream") ? "GoodStream" : t.includes("hlswish") || t.includes("streamwish") ? "StreamWish" : t.includes("voe") ? "VOE" : t.includes("vimeos") ? "Vimeos" : t.includes("filemoon") ? "Filemoon" : "Online";
}
function fe(t, o) {
  return d(this, null, function* () {
    var i;
    let n = `https://api.themoviedb.org/3/${o === "movie" ? "movie" : "tv"}/${t}?api_key=${ne}&language=es-MX`, s = yield A(n);
    return { title: o === "movie" ? s.title : s.name, year: (i = o === "movie" ? s.release_date : s.first_air_date) == null ? void 0 : i.slice(0, 4), seasons: s.number_of_seasons || 0 };
  });
}
function pe(t) {
  return d(this, null, function* () {
    var r;
    let o = yield A(`${b}/single?post_name=${t}&post_type=movies`);
    return ((r = o == null ? void 0 : o.data) == null ? void 0 : r._id) || null;
  });
}
function de(t) {
  return d(this, null, function* () {
    var r, n;
    let o = yield A(`${b}/single?post_name=${t}&post_type=episodes`);
    return ((n = (r = o == null ? void 0 : o.data) == null ? void 0 : r.episode) == null ? void 0 : n._id) || null;
  });
}
function he(t) {
  return d(this, null, function* () {
    let o = yield A(`${b}/player?post_id=${t}`);
    return (o == null ? void 0 : o.data) || [];
  });
}
function ge(t) {
  return d(this, null, function* () {
    try {
      let o = ae(t.url);
      if (!o)
        return console.log(`[Hackstore] No resolver: ${t.url}`), null;
      console.log(`[Hackstore] Resolviendo: ${t.url}`);
      let r = yield o(t.url);
      if (!(r != null && r.url))
        return null;
      let n = r.quality || "Unknown";
      return { name: "Hackstore", title: `${n} \xB7 ${t.lang} \xB7 ${ue(t.url)}`, quality: n, url: r.url, headers: r.headers || {} };
    } catch (o) {
      return console.log(`[Hackstore] Error resolver: ${o.message}`), null;
    }
  });
}
function me(t, o, r, n) {
  return d(this, null, function* () {
    let s = Date.now();
    console.log(`[Hackstore] Buscando TMDB ${t} (${o})` + (r ? ` S${r}E${n}` : ""));
    try {
      let i = yield fe(t, o);
      if (!i)
        return [];
      let c, f;
      if (o === "movie" ? (c = V(i.title, i.year), console.log(`[Hackstore] Slug pel\xEDcula: ${c}`), f = yield pe(c)) : (c = `${V(i.title)}-temporada-${r}-episodio-${n}`, console.log(`[Hackstore] Slug episodio: ${c}`), f = yield de(c)), !f)
        return console.log("[Hackstore] No se encontr\xF3 ID"), [];
      console.log(`[Hackstore] Post ID: ${f}`);
      let l = yield he(f);
      if (!l.length)
        return console.log("[Hackstore] No embeds"), [];
      console.log(`[Hackstore] Embeds encontrados: ${l.length}`);
      let u = (yield Promise.allSettled(l.map((p) => {
        let g = M($({}, p), { lang: p.lang || "LAT" });
        return ge(g);
      }))).filter((p) => p.status === "fulfilled" && p.value !== null).map((p) => p.value), h = ((Date.now() - s) / 1e3).toFixed(2);
      return console.log(`[Hackstore] \u2713 ${u.length} streams encontrados (${h}s)`), u;
    } catch (i) {
      return console.log(`[Hackstore] Error: ${i.message}`), [];
    }
  });
}
