var J = Object.create;
var L = Object.defineProperty, Q = Object.defineProperties, G = Object.getOwnPropertyDescriptor, Y = Object.getOwnPropertyDescriptors, X = Object.getOwnPropertyNames, O = Object.getOwnPropertySymbols, Z = Object.getPrototypeOf, I = Object.prototype.hasOwnProperty, ee = Object.prototype.propertyIsEnumerable;
var N = (e, t, n) => t in e ? L(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n, x = (e, t) => {
  for (var n in t || (t = {}))
    I.call(t, n) && N(e, n, t[n]);
  if (O)
    for (var n of O(t))
      ee.call(t, n) && N(e, n, t[n]);
  return e;
}, P = (e, t) => Q(e, Y(t));
var te = (e, t) => {
  for (var n in t)
    L(e, n, { get: t[n], enumerable: true });
}, V = (e, t, n, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of X(t))
      !I.call(e, i) && i !== n && L(e, i, { get: () => t[i], enumerable: !(s = G(t, i)) || s.enumerable });
  return e;
};
var ne = (e, t, n) => (n = e != null ? J(Z(e)) : {}, V(t || !e || !e.__esModule ? L(n, "default", { value: e, enumerable: true }) : n, e)), oe = (e) => V(L({}, "__esModule", { value: true }), e);
var m = (e, t, n) => new Promise((s, i) => {
  var r = (c) => {
    try {
      l(n.next(c));
    } catch (o) {
      i(o);
    }
  }, a = (c) => {
    try {
      l(n.throw(c));
    } catch (o) {
      i(o);
    }
  }, l = (c) => c.done ? s(c.value) : Promise.resolve(c.value).then(r, a);
  l((n = n.apply(e, t)).next());
});
var Re = {};
te(Re, { getStreams: () => ye });
module.exports = oe(Re);
var re = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", k = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, se = ["x", "o", "h", "n", "l"];
function ie(e) {
  return e.includes("vimeos") ? k.vimeos : e.includes("goodstream") ? k.goodstream : e.includes("cloudwindow-route") ? k.voe : e.includes("minochinos") || e.includes("vidhide") || e.includes("dintezuvio") || e.includes("dramiyos") ? k.vidhide : e.includes("premilkyway") || e.includes("hlswish") || e.includes("vibuxer") || e.includes("streamwish") ? k.streamwish : null;
}
function y(n) {
  return m(this, arguments, function* (e, t = {}) {
    let s = W(e);
    return s !== "Unknown" ? s : yield ae(e, t);
  });
}
function W(e) {
  if (!e)
    return "Unknown";
  let t = ie(e);
  if (t) {
    let s = e.match(/_,([a-z,]+),\.urlset/);
    if (s) {
      let i = s[1].split(",").filter(Boolean);
      for (let r of se)
        if (i.includes(r) && t[r])
          return t[r];
    }
  }
  let n = e.match(/[_\-\/](\d{3,4})p/);
  return n ? n[1] + "p" : "Unknown";
}
function ce(e, t) {
  return e >= 3840 || t >= 2160 ? "4K" : e >= 1920 || t >= 1080 ? "1080p" : e >= 1280 || t >= 720 ? "720p" : e >= 854 || t >= 480 ? "480p" : "360p";
}
function ae(n) {
  return m(this, arguments, function* (e, t = {}) {
    try {
      let i = yield (yield fetch(e, { headers: x({ "User-Agent": re }, t), redirect: "follow" })).text();
      if (!i.includes("#EXT-X-STREAM-INF")) {
        let l = e.match(/[_-](\d{3,4})p/);
        return l ? `${l[1]}p` : "Unknown";
      }
      let r = 0, a = 0;
      for (let l of i.split(`
`)) {
        let c = l.match(/RESOLUTION=(\d+)x(\d+)/);
        if (c) {
          let o = parseInt(c[2]);
          o > a && (a = o, r = parseInt(c[1]));
        }
      }
      return a > 0 ? ce(r, a) : "Unknown";
    } catch (s) {
      return "Unknown";
    }
  });
}
var le = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function q(e) {
  try {
    return typeof atob != "undefined" ? atob(e) : Buffer.from(e, "base64").toString("utf8");
  } catch (t) {
    return null;
  }
}
function ue(e, t) {
  try {
    let s = t.replace(/^\[|\]$/g, "").split("','").map((o) => o.replace(/^'+|'+$/g, "")).map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), i = "";
    for (let o of e) {
      let u = o.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), i += String.fromCharCode(u);
    }
    for (let o of s)
      i = i.replace(new RegExp(o, "g"), "_");
    i = i.split("_").join("");
    let r = q(i);
    if (!r)
      return null;
    let a = "";
    for (let o = 0; o < r.length; o++)
      a += String.fromCharCode((r.charCodeAt(o) - 3 + 256) % 256);
    let l = a.split("").reverse().join(""), c = q(l);
    return c ? JSON.parse(c) : null;
  } catch (n) {
    return console.log("[VOE] voeDecode error:", n.message), null;
  }
}
function H(n) {
  return m(this, arguments, function* (e, t = {}) {
    return yield fetch(e, { method: "GET", headers: x({ "User-Agent": le, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, t), redirect: "follow" });
  });
}
function C(e) {
  return m(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${e}`);
      let t = yield H(e, { Referer: e });
      if (!t.ok)
        throw new Error(`HTTP ${t.status}`);
      let n = yield t.text();
      if (/permanentToken/i.test(n)) {
        let c = n.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (c) {
          console.log(`[VOE] Permanent token redirect -> ${c[1]}`);
          let o = yield H(c[1], { Referer: e });
          o.ok && (n = yield o.text());
        }
      }
      let s = n.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (s) {
        let c = s[1], o = s[2].startsWith("http") ? s[2] : new URL(s[2], e).href;
        console.log(`[VOE] Found encoded array + loader: ${o}`);
        let u = yield H(o, { Referer: e }), w = u.ok ? yield u.text() : "", U = w.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || w.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (U) {
          let b = ue(c, U[1]);
          if (b && (b.source || b.direct_access_url)) {
            let A = b.source || b.direct_access_url, d = W(A);
            return console.log(`[VOE] URL encontrada: ${A.substring(0, 80)}...`), { url: A, quality: d, headers: { Referer: e } };
          }
        }
      }
      let i = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, r = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], l;
      for (; (l = i.exec(n)) !== null; )
        a.push(l);
      for (; (l = r.exec(n)) !== null; )
        a.push(l);
      for (let c of a) {
        let o = c[1];
        if (!o)
          continue;
        let u = o;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (w) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: W(u), headers: { Referer: e } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (t) {
      return console.log(`[VOE] Error: ${t.message}`), null;
    }
  });
}
var E = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function de(e, t, n) {
  let s = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", i = (r) => {
    let a = 0;
    for (let l = 0; l < r.length; l++) {
      let c = s.indexOf(r[l]);
      if (c === -1)
        return NaN;
      a = a * t + c;
    }
    return a;
  };
  return e.replace(/\b([0-9a-zA-Z]+)\b/g, (r) => {
    let a = i(r);
    return isNaN(a) || a >= n.length ? r : n[a] && n[a] !== "" ? n[a] : r;
  });
}
function he(e, t) {
  let n = e.match(/\{[^{}]*"hls[234]"\s*:\s*"([^"]+)"[^{}]*\}/);
  if (n)
    try {
      let i = n[0].replace(/(\w+)\s*:/g, '"$1":'), r = JSON.parse(i), a = r.hls4 || r.hls3 || r.hls2;
      if (a)
        return a.startsWith("/") ? t + a : a;
    } catch (i) {
      let r = n[0].match(/"hls[234]"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
      if (r) {
        let a = r[1];
        return a.startsWith("/") ? t + a : a;
      }
    }
  let s = e.match(/["']([^"']{30,}\.m3u8[^"']*)['"]/i);
  if (s) {
    let i = s[1];
    return i.startsWith("/") ? t + i : i;
  }
  return null;
}
var fe = { "hglink.to": "vibuxer.com" };
function R(e) {
  return m(this, null, function* () {
    var t;
    try {
      let n = e;
      for (let [o, u] of Object.entries(fe))
        if (n.includes(o)) {
          n = n.replace(o, u);
          break;
        }
      let s = ((t = n.match(/^(https?:\/\/[^/]+)/)) == null ? void 0 : t[1]) || "https://hlswish.com";
      console.log(`[HLSWish] Resolviendo: ${e}`), n !== e && console.log(`[HLSWish] \u2192 Mapped to: ${n}`);
      let i = yield fetch(n, { headers: { "User-Agent": E, Referer: "https://embed69.org/", Origin: "https://embed69.org", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9" }, redirect: "follow" });
      if (!i.ok)
        throw new Error(`HTTP ${i.status}`);
      let r = yield i.text(), a = r.match(/file\s*:\s*["']([^"']+)["']/i);
      if (a) {
        let o = a[1];
        if (o.startsWith("/") && (o = s + o), o.includes("vibuxer.com/stream/")) {
          console.log(`[HLSWish] Siguiendo redirect: ${o.substring(0, 80)}...`);
          try {
            let w = (yield fetch(o, { headers: { "User-Agent": E, Referer: s + "/" }, redirect: "follow" })).url;
            w && w.includes(".m3u8") && (o = w);
          } catch (u) {
          }
        }
        return console.log(`[HLSWish] URL encontrada: ${o.substring(0, 80)}...`), { url: o, quality: yield y(o, { Referer: s + "/", "User-Agent": E }), headers: { "User-Agent": E, Referer: s + "/" } };
      }
      let l = r.match(/eval\(function\(p,a,c,k,e,[a-z]\)\{[^}]+\}\s*\('([\s\S]+?)',\s*(\d+),\s*(\d+),\s*'([\s\S]+?)'\.split\('\|'\)/);
      if (l) {
        let o = de(l[1], parseInt(l[2]), l[4].split("|")), u = he(o, s);
        if (u)
          return console.log(`[HLSWish] URL encontrada: ${u.substring(0, 80)}...`), { url: u, quality: yield y(u, { Referer: s + "/", "User-Agent": E }), headers: { "User-Agent": E, Referer: s + "/" } };
      }
      let c = r.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
      return c ? (console.log(`[HLSWish] URL encontrada: ${c[0].substring(0, 80)}...`), { url: c[0], quality: yield y(c[0], { Referer: s + "/", "User-Agent": E }), headers: { "User-Agent": E, Referer: s + "/" } }) : (console.log("[HLSWish] No se encontr\xF3 URL"), null);
    } catch (n) {
      return console.log(`[HLSWish] Error: ${n.message}`), null;
    }
  });
}
var _ = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function pe(e) {
  try {
    let t = e.match(/eval\(function\(p,a,c,k,e,[rd]\)\{.*?\}\s*\('([\s\S]*?)',\s*(\d+),\s*(\d+),\s*'([\s\S]*?)'\.split\('\|'\)/);
    if (!t)
      return null;
    let [, n, s, i, r] = t;
    s = parseInt(s), i = parseInt(i), r = r.split("|");
    let a = (l, c) => {
      let o = "0123456789abcdefghijklmnopqrstuvwxyz", u = "";
      for (; l > 0; )
        u = o[l % c] + u, l = Math.floor(l / c);
      return u || "0";
    };
    return n = n.replace(/\b\w+\b/g, (l) => {
      let c = parseInt(l, 36);
      return c < r.length && r[c] ? r[c] : a(c, s);
    }), n;
  } catch (t) {
    return null;
  }
}
function M(e) {
  return m(this, null, function* () {
    var t;
    try {
      console.log(`[VidHide] Resolviendo: ${e}`);
      let n = yield fetch(e, { method: "GET", headers: { "User-Agent": _, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Referer: "https://embed69.org/" }, redirect: "follow" });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let i = (yield n.text()).match(/eval\(function\(p,a,c,k,e,[rd]\)[\s\S]*?\.split\('\|'\)[^\)]*\)\)/);
      if (!i)
        return console.log("[VidHide] No se encontr\xF3 bloque eval"), null;
      let r = pe(i[0]);
      if (!r)
        return console.log("[VidHide] No se pudo desempacar"), null;
      let a = r.match(/"hls4"\s*:\s*"([^"]+)"/), l = r.match(/"hls2"\s*:\s*"([^"]+)"/), c = (t = a || l) == null ? void 0 : t[1];
      if (!c)
        return console.log("[VidHide] No se encontr\xF3 hls4/hls2"), null;
      let o = c;
      c.startsWith("http") || (o = `${new URL(e).origin}${c}`), console.log(`[VidHide] URL encontrada: ${o.substring(0, 80)}...`);
      let u = new URL(e).origin;
      return { url: o, quality: yield y(o, { Referer: `${u}/`, "User-Agent": _ }), headers: { "User-Agent": _, Referer: `${u}/`, Origin: u } };
    } catch (n) {
      return console.log(`[VidHide] Error: ${n.message}`), null;
    }
  });
}
var g = ne(require("crypto-js"));
var D = "439c478a771f35c05022f9feabcca01c", z = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", B = "https://embed69.org", me = { "voe.sx": C, "hglink.to": R, "streamwish.com": R, "streamwish.to": R, "wishembed.online": R, "filelions.com": R, "dintezuvio.com": M, "vidhide.com": M, "minochinos.com": M }, ge = { voe: "VOE", streamwish: "StreamWish", filemoon: "Filemoon", vidhide: "VidHide" }, we = ["LAT", "ESP", "SUB"];
function be(e, t) {
  try {
    let n = g.default.enc.Base64.parse(e), s = g.default.lib.WordArray.create(n.words.slice(0, 4), 16), i = g.default.lib.WordArray.create(n.words.slice(4), n.sigBytes - 16), r = g.default.lib.CipherParams.create({ ciphertext: i });
    return g.default.AES.decrypt(r, t, { iv: s, mode: g.default.mode.CBC, padding: g.default.pad.Pkcs7 }).toString(g.default.enc.Utf8) || null;
  } catch (n) {
    return console.log(`[Embed69] Error desencriptando con CryptoJS: ${n.message}`), null;
  }
}
function ve(e) {
  try {
    let t = e.match(/let\s+dataLink\s*=\s*(\[.+\]);/);
    return t ? JSON.parse(t[1]) : null;
  } catch (t) {
    return null;
  }
}
function $e(e) {
  if (!e)
    return null;
  for (let [t, n] of Object.entries(me))
    if (e.includes(t))
      return n;
  return null;
}
function Ee(e, t) {
  return m(this, null, function* () {
    let n = t === "movie" ? `https://api.themoviedb.org/3/movie/${e}/external_ids?api_key=${D}` : `https://api.themoviedb.org/3/tv/${e}/external_ids?api_key=${D}`;
    return (yield fetch(n, { headers: { "User-Agent": z } }).then((i) => i.json())).imdb_id || null;
  });
}
function xe(e, t, n, s) {
  if (t === "movie")
    return `${B}/f/${e}`;
  let i = String(s).padStart(2, "0");
  return `${B}/f/${e}-${parseInt(n)}x${i}`;
}
function ye(e, t, n, s) {
  return m(this, null, function* () {
    if (!e || !t)
      return [];
    let i = Date.now();
    console.log(`[Embed69] Buscando: TMDB ${e} (${t})${n ? ` S${n}E${s}` : ""}`);
    try {
      let U2 = function(d) {
        return m(this, null, function* () {
          return (yield Promise.allSettled(d.map(({ url: f, resolver: p, lang: h, servername: v }) => p(f).then((S) => S ? P(x({}, S), { lang: h, servername: v }) : null)))).filter((f) => {
            var p;
            return f.status === "fulfilled" && ((p = f.value) == null ? void 0 : p.url);
          }).map((f) => f.value);
        });
      };
      var U = U2;
      let w = function(d) {
        let $ = d.video_language || "LAT", f = [];
        for (let p of d.sortedEmbeds || []) {
          if (p.servername === "download")
            continue;
          let h = be(p.link, o);
          if (!h)
            continue;
          let v = $e(h);
          if (!v) {
            console.log(`[Embed69] Sin resolver para ${p.servername}: ${h.substring(0, 60)}`);
            continue;
          }
          f.push({ url: h, resolver: v, lang: $, servername: p.servername });
        }
        return f;
      }, r = yield Ee(e, t);
      if (!r)
        return console.log("[Embed69] No se encontr\xF3 IMDB ID"), [];
      console.log(`[Embed69] IMDB ID: ${r}`);
      let a = xe(r, t, n, s);
      console.log(`[Embed69] Fetching: ${a}`);
      let l = yield fetch(a, { headers: { "User-Agent": z, Referer: "https://sololatino.net/", Accept: "text/html,application/xhtml+xml" } }).then((d) => d.text()), c = ve(l);
      if (!c || c.length === 0)
        return console.log("[Embed69] No se encontr\xF3 dataLink en el HTML"), [];
      console.log(`[Embed69] ${c.length} idiomas disponibles: ${c.map((d) => d.video_language).join(", ")}`);
      let o;
      try {
        let d = l.match(/POW_CHALLENGE = '([^']+)'/)[1], $ = parseInt(l.match(/POW_DIFFICULTY = (\d+)/)[1]), f = l.match(/POW_SALT = '([^']+)'/)[1], p = "0".repeat($), h = 0;
        for (console.log(`[Embed69] Resolviendo PoW con CryptoJS (Dificultad: ${$})...`); ; ) {
          if (g.default.SHA256(d + h).toString(g.default.enc.Hex).startsWith(p)) {
            o = g.default.SHA256(d + h + f), console.log(`[Embed69] PoW Resuelto. Nonce: ${h}`);
            break;
          }
          h++;
        }
      } catch (d) {
        return console.log(`[Embed69] Error al resolver el PoW: ${d.message}`), [];
      }
      let u = {};
      for (let d of c)
        u[d.video_language] = d;
      let b = [];
      for (let d of we) {
        let $ = u[d];
        if (!$)
          continue;
        let f = w($);
        if (f.length === 0)
          continue;
        console.log(`[Embed69] Resolviendo ${f.length} embeds (${d})...`);
        let p = yield U2(f);
        if (p.length > 0) {
          for (let { url: h, quality: v, lang: S, servername: T, headers: j } of p) {
            let K = S === "LAT" ? "Latino" : S === "ESP" ? "Espa\xF1ol" : "Subtitulado", F = ge[T] || T;
            b.push({ name: "Embed69", title: `${v || "Unknown"} \xB7 ${K} \xB7 ${F}`, url: h, quality: v || "Unknown", headers: j || {} }), console.log(`[Embed69] Resolved: ${T} quality=${v} url=${h == null ? void 0 : h.substring(0, 50)}`);
          }
          console.log(`[Embed69] \u2713 Streams encontrados en ${d}, omitiendo idiomas de menor prioridad`);
          break;
        } else
          console.log(`[Embed69] Sin streams en ${d}, intentando siguiente idioma...`);
      }
      let A = ((Date.now() - i) / 1e3).toFixed(2);
      return console.log(`[Embed69] \u2713 ${b.length} streams en ${A}s`), b;
    } catch (r) {
      return console.log(`[Embed69] Error: ${r.message}`), [];
    }
  });
}
