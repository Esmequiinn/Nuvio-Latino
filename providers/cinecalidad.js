var S = Object.defineProperty;
var D = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames, M = Object.getOwnPropertySymbols;
var k = Object.prototype.hasOwnProperty, I = Object.prototype.propertyIsEnumerable;
var W = (t, n, o) => n in t ? S(t, n, { enumerable: true, configurable: true, writable: true, value: o }) : t[n] = o, R = (t, n) => {
  for (var o in n || (n = {}))
    k.call(n, o) && W(t, o, n[o]);
  if (M)
    for (var o of M(n))
      I.call(n, o) && W(t, o, n[o]);
  return t;
};
var P = (t, n) => {
  for (var o in n)
    S(t, o, { get: n[o], enumerable: true });
}, B = (t, n, o, r) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let s of z(n))
      !k.call(t, s) && s !== o && S(t, s, { get: () => n[s], enumerable: !(r = D(n, s)) || r.enumerable });
  return t;
};
var K = (t) => B(S({}, "__esModule", { value: true }), t);
var p = (t, n, o) => new Promise((r, s) => {
  var i = (l) => {
    try {
      f(o.next(l));
    } catch (c) {
      s(c);
    }
  }, a = (l) => {
    try {
      f(o.throw(l));
    } catch (c) {
      s(c);
    }
  }, f = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(i, a);
  f((o = o.apply(t, n)).next());
});
var me = {};
P(me, { getStreams: () => pe });
module.exports = K(me);
var Q = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", y = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, j = ["x", "o", "h", "n", "l"];
function F(t) {
  return t.includes("vimeos") ? y.vimeos : t.includes("goodstream") ? y.goodstream : t.includes("cloudwindow-route") ? y.voe : t.includes("minochinos") || t.includes("vidhide") || t.includes("dintezuvio") || t.includes("dramiyos") ? y.vidhide : t.includes("premilkyway") || t.includes("hlswish") || t.includes("vibuxer") || t.includes("streamwish") ? y.streamwish : null;
}
function b(o) {
  return p(this, arguments, function* (t, n = {}) {
    let r = g(t);
    return r !== "Unknown" ? r : yield X(t, n);
  });
}
function g(t) {
  if (!t)
    return "Unknown";
  let n = F(t);
  if (n) {
    let r = t.match(/_,([a-z,]+),\.urlset/);
    if (r) {
      let s = r[1].split(",").filter(Boolean);
      for (let i of j)
        if (s.includes(i) && n[i])
          return n[i];
    }
  }
  let o = t.match(/[_\-\/](\d{3,4})p/);
  return o ? o[1] + "p" : "Unknown";
}
function G(t, n) {
  return t >= 3840 || n >= 2160 ? "4K" : t >= 1920 || n >= 1080 ? "1080p" : t >= 1280 || n >= 720 ? "720p" : t >= 854 || n >= 480 ? "480p" : "360p";
}
function X(o) {
  return p(this, arguments, function* (t, n = {}) {
    try {
      console.log("[detectQuality] Fetching:", t.substring(0, 80));
      let r = yield fetch(t, { headers: R({ "User-Agent": Q }, n), redirect: "follow" });
      console.log("[detectQuality] Status:", r.status, "ok:", r.ok);
      let s = yield r.text();
      if (console.log("[detectQuality] Response length:", s.length, "primeros 100:", s.substring(0, 100)), !s.includes("#EXT-X-STREAM-INF")) {
        let f = t.match(/[_-](\d{3,4})p/);
        return f ? `${f[1]}p` : "Unknown";
      }
      let i = 0, a = 0;
      for (let f of s.split(`
`)) {
        let l = f.match(/RESOLUTION=(\d+)x(\d+)/);
        if (l) {
          let c = parseInt(l[2]);
          c > a && (a = c, i = parseInt(l[1]));
        }
      }
      return a > 0 ? G(i, a) : "Unknown";
    } catch (r) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var C = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function L(t) {
  return p(this, null, function* () {
    try {
      console.log(`[GoodStream] Resolviendo: ${t}`);
      let n = yield fetch(t, { headers: { "User-Agent": C, Referer: "https://goodstream.one", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let r = (yield n.text()).match(/file:\s*"([^"]+)"/);
      if (!r)
        return console.log('[GoodStream] No se encontr\xF3 patr\xF3n file:"..."'), null;
      let s = r[1], i = { Referer: t, Origin: "https://goodstream.one", "User-Agent": C }, a = g(s);
      return console.log(`[GoodStream] URL encontrada (${a}): ${s.substring(0, 80)}...`), { url: s, quality: a, headers: i };
    } catch (n) {
      return console.log(`[GoodStream] Error: ${n.message}`), null;
    }
  });
}
var J = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function T(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (n) {
    return null;
  }
}
function Z(t, n) {
  try {
    let r = n.replace(/^\[|\]$/g, "").split("','").map((c) => c.replace(/^'+|'+$/g, "")).map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), s = "";
    for (let c of t) {
      let u = c.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), s += String.fromCharCode(u);
    }
    for (let c of r)
      s = s.replace(new RegExp(c, "g"), "_");
    s = s.split("_").join("");
    let i = T(s);
    if (!i)
      return null;
    let a = "";
    for (let c = 0; c < i.length; c++)
      a += String.fromCharCode((i.charCodeAt(c) - 3 + 256) % 256);
    let f = a.split("").reverse().join(""), l = T(f);
    return l ? JSON.parse(l) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function A(o) {
  return p(this, arguments, function* (t, n = {}) {
    return yield fetch(t, { method: "GET", headers: R({ "User-Agent": J, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, n), redirect: "follow" });
  });
}
function N(t) {
  return p(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let n = yield A(t, { Referer: t });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let o = yield n.text();
      if (/permanentToken/i.test(o)) {
        let l = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (l) {
          console.log(`[VOE] Permanent token redirect -> ${l[1]}`);
          let c = yield A(l[1], { Referer: t });
          c.ok && (o = yield c.text());
        }
      }
      let r = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (r) {
        let l = r[1], c = r[2].startsWith("http") ? r[2] : new URL(r[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${c}`);
        let u = yield A(c, { Referer: t }), d = u.ok ? yield u.text() : "", h = d.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || d.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (h) {
          let m = Z(l, h[1]);
          if (m && (m.source || m.direct_access_url)) {
            let v = m.source || m.direct_access_url, x = g(v);
            return console.log(`[VOE] URL encontrada: ${v.substring(0, 80)}...`), { url: v, quality: x, headers: { Referer: t } };
          }
        }
      }
      let s = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, i = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], f;
      for (; (f = s.exec(o)) !== null; )
        a.push(f);
      for (; (f = i.exec(o)) !== null; )
        a.push(f);
      for (let l of a) {
        let c = l[1];
        if (!c)
          continue;
        let u = c;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (d) {
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
function Y(t, n, o) {
  let r = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", s = (i) => {
    let a = 0;
    for (let f = 0; f < i.length; f++) {
      let l = r.indexOf(i[f]);
      if (l === -1)
        return NaN;
      a = a * n + l;
    }
    return a;
  };
  return t.replace(/\b([0-9a-zA-Z]+)\b/g, (i) => {
    let a = s(i);
    return isNaN(a) || a >= o.length ? i : o[a] && o[a] !== "" ? o[a] : i;
  });
}
function ee(t, n) {
  let o = t.match(/\{[^{}]*"hls[234]"\s*:\s*"([^"]+)"[^{}]*\}/);
  if (o)
    try {
      let s = o[0].replace(/(\w+)\s*:/g, '"$1":'), i = JSON.parse(s), a = i.hls4 || i.hls3 || i.hls2;
      if (a)
        return a.startsWith("/") ? n + a : a;
    } catch (s) {
      let i = o[0].match(/"hls[234]"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
      if (i) {
        let a = i[1];
        return a.startsWith("/") ? n + a : a;
      }
    }
  let r = t.match(/["']([^"']{30,}\.m3u8[^"']*)['"]/i);
  if (r) {
    let s = r[1];
    return s.startsWith("/") ? n + s : s;
  }
  return null;
}
var te = { "hglink.to": "vibuxer.com" };
function $(t) {
  return p(this, null, function* () {
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
      let s = yield fetch(o, { headers: { "User-Agent": w, Referer: "https://embed69.org/", Origin: "https://embed69.org", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9" }, redirect: "follow" });
      if (!s.ok)
        throw new Error(`HTTP ${s.status}`);
      let i = yield s.text(), a = i.match(/file\s*:\s*["']([^"']+)["']/i);
      if (a) {
        let c = a[1];
        if (c.startsWith("/") && (c = r + c), c.includes("vibuxer.com/stream/")) {
          console.log(`[HLSWish] Siguiendo redirect: ${c.substring(0, 80)}...`);
          try {
            let d = (yield fetch(c, { headers: { "User-Agent": w, Referer: r + "/" }, redirect: "follow" })).url;
            d && d.includes(".m3u8") && (c = d);
          } catch (u) {
          }
        }
        return console.log(`[HLSWish] URL encontrada: ${c.substring(0, 80)}...`), { url: c, quality: yield b(c, { Referer: r + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: r + "/" } };
      }
      let f = i.match(/eval\(function\(p,a,c,k,e,[a-z]\)\{[^}]+\}\s*\('([\s\S]+?)',\s*(\d+),\s*(\d+),\s*'([\s\S]+?)'\.split\('\|'\)/);
      if (f) {
        let c = Y(f[1], parseInt(f[2]), f[4].split("|")), u = ee(c, r);
        if (u)
          return console.log(`[HLSWish] URL encontrada: ${u.substring(0, 80)}...`), { url: u, quality: yield b(u, { Referer: r + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: r + "/" } };
      }
      let l = i.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
      return l ? (console.log(`[HLSWish] URL encontrada: ${l[0].substring(0, 80)}...`), { url: l[0], quality: yield b(l[0], { Referer: r + "/", "User-Agent": w }), headers: { "User-Agent": w, Referer: r + "/" } }) : (console.log("[HLSWish] No se encontr\xF3 URL"), null);
    } catch (o) {
      return console.log(`[HLSWish] Error: ${o.message}`), null;
    }
  });
}
var O = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function q(t) {
  return p(this, null, function* () {
    try {
      console.log(`[Vimeos] Resolviendo: ${t}`);
      let n = yield fetch(t, { headers: { "User-Agent": O, Referer: "https://vimeos.net/", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let r = (yield n.text()).match(/eval\(function\(p,a,c,k,e,[dr]\)\{[\s\S]+?\}\('([\s\S]+?)',(\d+),(\d+),'([\s\S]+?)'\.split\('\|'\)/);
      if (r) {
        let s = r[1], i = parseInt(r[2]), a = r[4].split("|"), f = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l = (d) => {
          let h = 0;
          for (let m = 0; m < d.length; m++)
            h = h * i + f.indexOf(d[m]);
          return h;
        }, u = s.replace(/\b(\w+)\b/g, (d) => {
          let h = l(d);
          return a[h] && a[h] !== "" ? a[h] : d;
        }).match(/["']([^"']+\.m3u8[^"']*)['"]/i);
        if (u) {
          let d = u[1], h = { "User-Agent": O, Referer: "https://vimeos.net/" }, m = g(d);
          return console.log(`[Vimeos] URL encontrada: ${d.substring(0, 80)}...`), { url: d, quality: m, headers: h };
        }
      }
      return console.log("[Vimeos] No se encontr\xF3 URL"), null;
    } catch (n) {
      return console.log(`[Vimeos] Error: ${n.message}`), null;
    }
  });
}
var ne = "439c478a771f35c05022f9feabcca01c", oe = "https://www.cinecalidad.vg", re = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", U = { "User-Agent": re, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9", Connection: "keep-alive", "Upgrade-Insecure-Requests": "1", Referer: "https://www.cinecalidad.vg/" }, H = { "goodstream.one": L, "hlswish.com": $, "streamwish.com": $, "streamwish.to": $, "strwish.com": $, "voe.sx": N, "vimeos.net": q }, se = (t) => t.includes("goodstream") ? "GoodStream" : t.includes("hlswish") || t.includes("streamwish") || t.includes("strwish") ? "StreamWish" : t.includes("voe.sx") ? "VOE" : t.includes("filemoon") ? "Filemoon" : t.includes("vimeos") ? "Vimeos" : "Online", ie = (t) => {
  if (!t || !t.startsWith("http"))
    return null;
  for (let n in H)
    if (t.includes(n))
      return H[n];
  return null;
};
function ae(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (n) {
    return null;
  }
}
function ce(t, n) {
  return p(this, null, function* () {
    let o = ["es-MX", "es-ES", "en-US"], r = yield Promise.all(o.map((x) => fetch(`https://api.themoviedb.org/3/${n}/${t}?api_key=${ne}&language=${x}`, { headers: U }).then((V) => V.json()).catch(() => null))), [s, i, a] = r, f = s || i || a;
    if (!f)
      return null;
    let l = (x) => x ? n === "movie" ? x.title : x.name : null, c = l(s), u = l(i), d = l(a), h = n === "movie" ? f.original_title : f.original_name, m = (f.release_date || f.first_air_date || "").substring(0, 4);
    return console.log(`[CineCalidad] TMDB: "${c || u || d}" | ES: "${u}" | Original: "${h}"`), { title: c || u || d, titleEs: u, originalTitle: h, year: m };
  });
}
function E(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function le(t) {
  let n = t.match(/<h1[^>]*>[^<]*\((\d{4})\)[^<]*<\/h1>/);
  return n ? n[1] : null;
}
function ue(t, n) {
  return p(this, null, function* () {
    let o = [t, `${t}-2`, `${t}-3`];
    for (let r of o) {
      let s = `${oe}/pelicula/${r}/`;
      try {
        let i = yield fetch(s, { headers: U }).then((f) => f.text()), a = le(i);
        if (!a || !n || a === n)
          return console.log(`[CineCalidad] \u2713 Slug directo: /pelicula/${r}/ (${a || "?"})`), { url: s, html: i };
        console.log(`[CineCalidad] A\xF1o no coincide: esperado ${n}, encontrado ${a} en /pelicula/${r}/`);
      } catch (i) {
      }
    }
    return null;
  });
}
var fe = ["goodstream.one", "voe.sx", "filemoon.sx", "filemoon.to", "hlswish.com", "streamwish.com", "streamwish.to", "strwish.com", "vimeos.net"];
function _(t) {
  return fe.some((n) => t.includes(n));
}
function he(t) {
  return p(this, null, function* () {
    try {
      let n = [], o = /data-src="([A-Za-z0-9+/=]{20,})"/g, r;
      for (; (r = o.exec(t)) !== null; )
        n.push(r[1]);
      let s = [...new Set(n.map((l) => ae(l)).filter((l) => l && l.startsWith("http")))], i = s.filter(_), a = s.filter((l) => !_(l));
      console.log(`[CineCalidad] ${i.length} embeds directos, ${a.length} intermedios`);
      let f = new Set(i);
      return a.length > 0 && (yield Promise.allSettled(a.map((l) => p(this, null, function* () {
        try {
          let c = yield fetch(l, { headers: U }).then((h) => h.text()), u = "", d = c.match(/id="btn_enlace"[^>]*>[\s\S]*?href="([^"]+)"/);
          if (d && (u = d[1]), !u) {
            let h = c.match(/<iframe[^>]+src="([^"]+)"/);
            h && (u = h[1]);
          }
          !u && l.includes("/e/") && (u = l), u && u.startsWith("http") && f.add(u);
        } catch (c) {
        }
      })))), [...f];
    } catch (n) {
      return console.log(`[CineCalidad] Error obteniendo embeds: ${n.message}`), [];
    }
  });
}
function de(t) {
  return p(this, null, function* () {
    let n = se(t), o = Date.now();
    try {
      let r = ie(t);
      if (!r)
        return console.log(`[${n}] Sin resolver`), null;
      let s = yield r(t);
      return s != null && s.url ? { name: "CineCalidad", title: `${s.quality || "Unknown"} \xB7 ${n}`, url: s.url, quality: s.quality || "Unknown", headers: s.headers || {} } : (console.log(`[${n}] Sin URL final`), null);
    } catch (r) {
      return null;
    }
  });
}
function pe(t, n, o, r) {
  return p(this, null, function* () {
    if (!t || !n)
      return [];
    let s = Date.now();
    if (console.log(`[CineCalidad] Buscando: TMDB ${t} (${n})${o ? ` S${o}E${r}` : ""}`), n === "tv")
      return console.log("[CineCalidad] Series no soportadas a\xFAn"), [];
    try {
      let i = yield ce(t, n);
      if (!i)
        return [];
      let a = [...new Set([i.title && E(i.title), i.titleEs && E(i.titleEs), i.originalTitle && E(i.originalTitle)].filter(Boolean))], f = null;
      try {
        f = yield Promise.any(a.map((h) => ue(h, i.year).then((m) => {
          if (!m)
            throw new Error();
          return m;
        })));
      } catch (h) {
      }
      if (!f)
        return console.log("[CineCalidad] No encontrado por slug"), [];
      let l = yield he(f.html);
      if (l.length === 0)
        return console.log("[CineCalidad] No se encontraron embeds"), [];
      let c = [...new Set(l)], u = (yield Promise.allSettled(c.map(de))).filter((h) => h.status === "fulfilled").map((h) => h.value).filter(Boolean), d = ((Date.now() - s) / 1e3).toFixed(2);
      return console.log(`[CineCalidad] \u2713 ${u.length} streams en ${d}s`), u;
    } catch (i) {
      return console.log(`[CineCalidad] Error: ${i.message}`), [];
    }
  });
}
