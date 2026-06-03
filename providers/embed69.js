var J = Object.create;
var k = Object.defineProperty, G = Object.defineProperties, Y = Object.getOwnPropertyDescriptor, X = Object.getOwnPropertyDescriptors, Z = Object.getOwnPropertyNames, N = Object.getOwnPropertySymbols, ee = Object.getPrototypeOf, P = Object.prototype.hasOwnProperty, te = Object.prototype.propertyIsEnumerable;
var I = (t, n, o) => n in t ? k(t, n, { enumerable: true, configurable: true, writable: true, value: o }) : t[n] = o, x = (t, n) => {
  for (var o in n || (n = {}))
    P.call(n, o) && I(t, o, n[o]);
  if (N)
    for (var o of N(n))
      te.call(n, o) && I(t, o, n[o]);
  return t;
}, V = (t, n) => G(t, X(n));
var ne = (t, n) => {
  for (var o in n)
    k(t, o, { get: n[o], enumerable: true });
}, q = (t, n, o, s) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let i of Z(n))
      !P.call(t, i) && i !== o && k(t, i, { get: () => n[i], enumerable: !(s = Y(n, i)) || s.enumerable });
  return t;
};
var oe = (t, n, o) => (o = t != null ? J(ee(t)) : {}, q(n || !t || !t.__esModule ? k(o, "default", { value: t, enumerable: true }) : o, t)), re = (t) => q(k({}, "__esModule", { value: true }), t);
var g = (t, n, o) => new Promise((s, i) => {
  var c = (a) => {
    try {
      u(o.next(a));
    } catch (r) {
      i(r);
    }
  }, l = (a) => {
    try {
      u(o.throw(a));
    } catch (r) {
      i(r);
    }
  }, u = (a) => a.done ? s(a.value) : Promise.resolve(a.value).then(c, l);
  u((o = o.apply(t, n)).next());
});
var Ae = {};
ne(Ae, { getStreams: () => Re });
module.exports = re(Ae);
var se = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", W = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, ie = ["x", "o", "h", "n", "l"];
function ce(t) {
  return t.includes("vimeos") ? W.vimeos : t.includes("goodstream") ? W.goodstream : t.includes("cloudwindow-route") ? W.voe : t.includes("minochinos") || t.includes("vidhide") || t.includes("dintezuvio") || t.includes("dramiyos") ? W.vidhide : t.includes("premilkyway") || t.includes("hlswish") || t.includes("vibuxer") || t.includes("streamwish") ? W.streamwish : null;
}
function R(o) {
  return g(this, arguments, function* (t, n = {}) {
    let s = M(t);
    return s !== "Unknown" ? s : yield le(t, n);
  });
}
function M(t) {
  if (!t)
    return "Unknown";
  let n = ce(t);
  if (n) {
    let s = t.match(/_,([a-z,]+),\.urlset/);
    if (s) {
      let i = s[1].split(",").filter(Boolean);
      for (let c of ie)
        if (i.includes(c) && n[c])
          return n[c];
    }
  }
  let o = t.match(/[_\-\/](\d{3,4})p/);
  return o ? o[1] + "p" : "Unknown";
}
function ae(t, n) {
  return t >= 3840 || n >= 2160 ? "4K" : t >= 1920 || n >= 1080 ? "1080p" : t >= 1280 || n >= 720 ? "720p" : t >= 854 || n >= 480 ? "480p" : "360p";
}
function le(o) {
  return g(this, arguments, function* (t, n = {}) {
    try {
      console.log("[detectQuality] Fetching:", t.substring(0, 80));
      let s = yield fetch(t, { headers: x({ "User-Agent": se }, n), redirect: "follow" });
      console.log("[detectQuality] Status:", s.status, "ok:", s.ok);
      let i = yield s.text();
      if (console.log("[detectQuality] Response length:", i.length, "primeros 100:", i.substring(0, 100)), !i.includes("#EXT-X-STREAM-INF")) {
        let u = t.match(/[_-](\d{3,4})p/);
        return u ? `${u[1]}p` : "Unknown";
      }
      let c = 0, l = 0;
      for (let u of i.split(`
`)) {
        let a = u.match(/RESOLUTION=(\d+)x(\d+)/);
        if (a) {
          let r = parseInt(a[2]);
          r > l && (l = r, c = parseInt(a[1]));
        }
      }
      return l > 0 ? ae(c, l) : "Unknown";
    } catch (s) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var ue = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function C(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (n) {
    return null;
  }
}
function de(t, n) {
  try {
    let s = n.replace(/^\[|\]$/g, "").split("','").map((r) => r.replace(/^'+|'+$/g, "")).map((r) => r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), i = "";
    for (let r of t) {
      let d = r.charCodeAt(0);
      d > 64 && d < 91 ? d = (d - 52) % 26 + 65 : d > 96 && d < 123 && (d = (d - 84) % 26 + 97), i += String.fromCharCode(d);
    }
    for (let r of s)
      i = i.replace(new RegExp(r, "g"), "_");
    i = i.split("_").join("");
    let c = C(i);
    if (!c)
      return null;
    let l = "";
    for (let r = 0; r < c.length; r++)
      l += String.fromCharCode((c.charCodeAt(r) - 3 + 256) % 256);
    let u = l.split("").reverse().join(""), a = C(u);
    return a ? JSON.parse(a) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function _(o) {
  return g(this, arguments, function* (t, n = {}) {
    return yield fetch(t, { method: "GET", headers: x({ "User-Agent": ue, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, n), redirect: "follow" });
  });
}
function D(t) {
  return g(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let n = yield _(t, { Referer: t });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let o = yield n.text();
      if (/permanentToken/i.test(o)) {
        let a = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (a) {
          console.log(`[VOE] Permanent token redirect -> ${a[1]}`);
          let r = yield _(a[1], { Referer: t });
          r.ok && (o = yield r.text());
        }
      }
      let s = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (s) {
        let a = s[1], r = s[2].startsWith("http") ? s[2] : new URL(s[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${r}`);
        let d = yield _(r, { Referer: t }), b = d.ok ? yield d.text() : "", U = b.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || b.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (U) {
          let v = de(a, U[1]);
          if (v && (v.source || v.direct_access_url)) {
            let S = v.source || v.direct_access_url, h = M(S);
            return console.log(`[VOE] URL encontrada: ${S.substring(0, 80)}...`), { url: S, quality: h, headers: { Referer: t } };
          }
        }
      }
      let i = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, c = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, l = [], u;
      for (; (u = i.exec(o)) !== null; )
        l.push(u);
      for (; (u = c.exec(o)) !== null; )
        l.push(u);
      for (let a of l) {
        let r = a[1];
        if (!r)
          continue;
        let d = r;
        if (d.startsWith("aHR0"))
          try {
            d = atob(d);
          } catch (b) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${d.substring(0, 80)}...`), { url: d, quality: M(d), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (n) {
      return console.log(`[VOE] Error: ${n.message}`), null;
    }
  });
}
var y = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function he(t, n, o) {
  let s = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", i = (c) => {
    let l = 0;
    for (let u = 0; u < c.length; u++) {
      let a = s.indexOf(c[u]);
      if (a === -1)
        return NaN;
      l = l * n + a;
    }
    return l;
  };
  return t.replace(/\b([0-9a-zA-Z]+)\b/g, (c) => {
    let l = i(c);
    return isNaN(l) || l >= o.length ? c : o[l] && o[l] !== "" ? o[l] : c;
  });
}
function fe(t, n) {
  let o = t.match(/\{[^{}]*"hls[234]"\s*:\s*"([^"]+)"[^{}]*\}/);
  if (o)
    try {
      let i = o[0].replace(/(\w+)\s*:/g, '"$1":'), c = JSON.parse(i), l = c.hls4 || c.hls3 || c.hls2;
      if (l)
        return l.startsWith("/") ? n + l : l;
    } catch (i) {
      let c = o[0].match(/"hls[234]"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
      if (c) {
        let l = c[1];
        return l.startsWith("/") ? n + l : l;
      }
    }
  let s = t.match(/["']([^"']{30,}\.m3u8[^"']*)['"]/i);
  if (s) {
    let i = s[1];
    return i.startsWith("/") ? n + i : i;
  }
  return null;
}
var pe = { "hglink.to": "vibuxer.com" };
function A(t) {
  return g(this, null, function* () {
    var n;
    try {
      let o = t;
      for (let [r, d] of Object.entries(pe))
        if (o.includes(r)) {
          o = o.replace(r, d);
          break;
        }
      let s = ((n = o.match(/^(https?:\/\/[^/]+)/)) == null ? void 0 : n[1]) || "https://hlswish.com";
      console.log(`[HLSWish] Resolviendo: ${t}`), o !== t && console.log(`[HLSWish] \u2192 Mapped to: ${o}`);
      let i = yield fetch(o, { headers: { "User-Agent": y, Referer: "https://embed69.org/", Origin: "https://embed69.org", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9" }, redirect: "follow" });
      if (!i.ok)
        throw new Error(`HTTP ${i.status}`);
      let c = yield i.text(), l = c.match(/file\s*:\s*["']([^"']+)["']/i);
      if (l) {
        let r = l[1];
        if (r.startsWith("/") && (r = s + r), r.includes("vibuxer.com/stream/")) {
          console.log(`[HLSWish] Siguiendo redirect: ${r.substring(0, 80)}...`);
          try {
            let b = (yield fetch(r, { headers: { "User-Agent": y, Referer: s + "/" }, redirect: "follow" })).url;
            b && b.includes(".m3u8") && (r = b);
          } catch (d) {
          }
        }
        return console.log(`[HLSWish] URL encontrada: ${r.substring(0, 80)}...`), { url: r, quality: yield R(r, { Referer: s + "/", "User-Agent": y }), headers: { "User-Agent": y, Referer: s + "/" } };
      }
      let u = c.match(/eval\(function\(p,a,c,k,e,[a-z]\)\{[^}]+\}\s*\('([\s\S]+?)',\s*(\d+),\s*(\d+),\s*'([\s\S]+?)'\.split\('\|'\)/);
      if (u) {
        let r = he(u[1], parseInt(u[2]), u[4].split("|")), d = fe(r, s);
        if (d)
          return console.log(`[HLSWish] URL encontrada: ${d.substring(0, 80)}...`), { url: d, quality: yield R(d, { Referer: s + "/", "User-Agent": y }), headers: { "User-Agent": y, Referer: s + "/" } };
      }
      let a = c.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
      return a ? (console.log(`[HLSWish] URL encontrada: ${a[0].substring(0, 80)}...`), { url: a[0], quality: yield R(a[0], { Referer: s + "/", "User-Agent": y }), headers: { "User-Agent": y, Referer: s + "/" } }) : (console.log("[HLSWish] No se encontr\xF3 URL"), null);
    } catch (o) {
      return console.log(`[HLSWish] Error: ${o.message}`), null;
    }
  });
}
var O = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function me(t) {
  try {
    let n = t.match(/eval\(function\(p,a,c,k,e,[rd]\)\{.*?\}\s*\('([\s\S]*?)',\s*(\d+),\s*(\d+),\s*'([\s\S]*?)'\.split\('\|'\)/);
    if (!n)
      return null;
    let [, o, s, i, c] = n;
    s = parseInt(s), i = parseInt(i), c = c.split("|");
    let l = (u, a) => {
      let r = "0123456789abcdefghijklmnopqrstuvwxyz", d = "";
      for (; u > 0; )
        d = r[u % a] + d, u = Math.floor(u / a);
      return d || "0";
    };
    return o = o.replace(/\b\w+\b/g, (u) => {
      let a = parseInt(u, 36);
      return a < c.length && c[a] ? c[a] : l(a, s);
    }), o;
  } catch (n) {
    return null;
  }
}
function T(t) {
  return g(this, null, function* () {
    var n;
    try {
      console.log(`[VidHide] Resolviendo: ${t}`);
      let o = yield fetch(t, { method: "GET", headers: { "User-Agent": O, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Referer: "https://embed69.org/" }, redirect: "follow" });
      if (!o.ok)
        throw new Error(`HTTP ${o.status}`);
      let i = (yield o.text()).match(/eval\(function\(p,a,c,k,e,[rd]\)[\s\S]*?\.split\('\|'\)[^\)]*\)\)/);
      if (!i)
        return console.log("[VidHide] No se encontr\xF3 bloque eval"), null;
      let c = me(i[0]);
      if (!c)
        return console.log("[VidHide] No se pudo desempacar"), null;
      let l = c.match(/"hls4"\s*:\s*"([^"]+)"/), u = c.match(/"hls2"\s*:\s*"([^"]+)"/), a = (n = l || u) == null ? void 0 : n[1];
      if (!a)
        return console.log("[VidHide] No se encontr\xF3 hls4/hls2"), null;
      let r = a;
      a.startsWith("http") || (r = `${new URL(t).origin}${a}`), console.log(`[VidHide] URL encontrada: ${r.substring(0, 80)}...`);
      let d = new URL(t).origin;
      return { url: r, quality: yield R(r, { Referer: `${d}/`, "User-Agent": O }), headers: { "User-Agent": O, Referer: `${d}/`, Origin: d } };
    } catch (o) {
      return console.log(`[VidHide] Error: ${o.message}`), null;
    }
  });
}
var w = oe(require("crypto-js"));
var B = "439c478a771f35c05022f9feabcca01c", j = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", z = "https://embed69.org", ge = { "voe.sx": D, "hglink.to": A, "streamwish.com": A, "streamwish.to": A, "wishembed.online": A, "filelions.com": A, "dintezuvio.com": T, "vidhide.com": T, "minochinos.com": T }, we = { voe: "VOE", streamwish: "StreamWish", filemoon: "Filemoon", vidhide: "VidHide" }, be = ["LAT", "ESP", "SUB"];
function ve(t, n) {
  try {
    let o = w.default.enc.Base64.parse(t), s = w.default.lib.WordArray.create(o.words.slice(0, 4), 16), i = w.default.lib.WordArray.create(o.words.slice(4), o.sigBytes - 16), c = w.default.lib.CipherParams.create({ ciphertext: i });
    return w.default.AES.decrypt(c, n, { iv: s, mode: w.default.mode.CBC, padding: w.default.pad.Pkcs7 }).toString(w.default.enc.Utf8) || null;
  } catch (o) {
    return console.log(`[Embed69] Error desencriptando con CryptoJS: ${o.message}`), null;
  }
}
function Ee(t) {
  try {
    let n = t.match(/let\s+dataLink\s*=\s*(\[.+\]);/);
    return n ? JSON.parse(n[1]) : null;
  } catch (n) {
    return null;
  }
}
function $e(t) {
  if (!t)
    return null;
  for (let [n, o] of Object.entries(ge))
    if (t.includes(n))
      return o;
  return null;
}
function ye(t, n) {
  return g(this, null, function* () {
    let o = n === "movie" ? `https://api.themoviedb.org/3/movie/${t}/external_ids?api_key=${B}` : `https://api.themoviedb.org/3/tv/${t}/external_ids?api_key=${B}`;
    return (yield fetch(o, { headers: { "User-Agent": j } }).then((i) => i.json())).imdb_id || null;
  });
}
function xe(t, n, o, s) {
  if (n === "movie")
    return `${z}/f/${t}`;
  let i = String(s).padStart(2, "0");
  return `${z}/f/${t}-${parseInt(o)}x${i}`;
}
function Re(t, n, o, s) {
  return g(this, null, function* () {
    if (!t || !n)
      return [];
    let i = Date.now();
    console.log(`[Embed69] Buscando: TMDB ${t} (${n})${o ? ` S${o}E${s}` : ""}`);
    try {
      let U2 = function(h) {
        return g(this, null, function* () {
          return (yield Promise.allSettled(h.map(({ url: p, resolver: m, lang: f, servername: E }) => m(p).then((L) => L ? V(x({}, L), { lang: f, servername: E }) : null)))).filter((p) => {
            var m;
            return p.status === "fulfilled" && ((m = p.value) == null ? void 0 : m.url);
          }).map((p) => p.value);
        });
      };
      var U = U2;
      let b = function(h) {
        let $ = h.video_language || "LAT", p = [];
        for (let m of h.sortedEmbeds || []) {
          if (m.servername === "download")
            continue;
          let f = ve(m.link, r);
          if (!f)
            continue;
          let E = $e(f);
          if (!E) {
            console.log(`[Embed69] Sin resolver para ${m.servername}: ${f.substring(0, 60)}`);
            continue;
          }
          p.push({ url: f, resolver: E, lang: $, servername: m.servername });
        }
        return p;
      }, c = yield ye(t, n);
      if (!c)
        return console.log("[Embed69] No se encontr\xF3 IMDB ID"), [];
      console.log(`[Embed69] IMDB ID: ${c}`);
      let l = xe(c, n, o, s);
      console.log(`[Embed69] Fetching: ${l}`);
      let u = yield fetch(l, { headers: { "User-Agent": j, Referer: "https://sololatino.net/", Accept: "text/html,application/xhtml+xml" } }).then((h) => h.text()), a = Ee(u);
      if (!a || a.length === 0)
        return console.log("[Embed69] No se encontr\xF3 dataLink en el HTML"), [];
      console.log(`[Embed69] ${a.length} idiomas disponibles: ${a.map((h) => h.video_language).join(", ")}`);
      let r;
      try {
        let h = u.match(/POW_CHALLENGE = '([^']+)'/)[1], $ = parseInt(u.match(/POW_DIFFICULTY = (\d+)/)[1]), p = u.match(/POW_SALT = '([^']+)'/)[1], m = "0".repeat($), f = 0;
        for (console.log(`[Embed69] Resolviendo PoW con CryptoJS (Dificultad: ${$})...`); ; ) {
          if (w.default.SHA256(h + f).toString(w.default.enc.Hex).startsWith(m)) {
            r = w.default.SHA256(h + f + p), console.log(`[Embed69] PoW Resuelto. Nonce: ${f}`);
            break;
          }
          f++;
        }
      } catch (h) {
        return console.log(`[Embed69] Error al resolver el PoW: ${h.message}`), [];
      }
      let d = {};
      for (let h of a)
        d[h.video_language] = h;
      let v = [];
      for (let h of be) {
        let $ = d[h];
        if (!$)
          continue;
        let p = b($);
        if (p.length === 0)
          continue;
        console.log(`[Embed69] Resolviendo ${p.length} embeds (${h})...`);
        let m = yield U2(p);
        if (m.length > 0) {
          for (let { url: f, quality: E, lang: L, servername: H, headers: Q } of m) {
            let K = L === "LAT" ? "Latino" : L === "ESP" ? "Espa\xF1ol" : "Subtitulado", F = we[H] || H;
            v.push({ name: "Embed69", title: `${E || "Unknown"} \xB7 ${K} \xB7 ${F}`, url: f, quality: E || "Unknown", headers: Q || {} }), console.log(`[Embed69] Resolved: ${H} quality=${E} url=${f == null ? void 0 : f.substring(0, 50)}`);
          }
          console.log(`[Embed69] \u2713 Streams encontrados en ${h}, omitiendo idiomas de menor prioridad`);
          break;
        } else
          console.log(`[Embed69] Sin streams en ${h}, intentando siguiente idioma...`);
      }
      let S = ((Date.now() - i) / 1e3).toFixed(2);
      return console.log(`[Embed69] \u2713 ${v.length} streams en ${S}s`), v;
    } catch (c) {
      return console.log(`[Embed69] Error: ${c.message}`), [];
    }
  });
}
