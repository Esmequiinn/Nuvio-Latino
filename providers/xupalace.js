var A = Object.defineProperty;
var T = Object.getOwnPropertyDescriptor;
var O = Object.getOwnPropertyNames, L = Object.getOwnPropertySymbols;
var H = Object.prototype.hasOwnProperty, I = Object.prototype.propertyIsEnumerable;
var W = (t, n, o) => n in t ? A(t, n, { enumerable: true, configurable: true, writable: true, value: o }) : t[n] = o, b = (t, n) => {
  for (var o in n || (n = {}))
    H.call(n, o) && W(t, o, n[o]);
  if (L)
    for (var o of L(n))
      I.call(n, o) && W(t, o, n[o]);
  return t;
};
var X = (t, n) => {
  for (var o in n)
    A(t, o, { get: n[o], enumerable: true });
}, q = (t, n, o, c) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let r of O(n))
      !H.call(t, r) && r !== o && A(t, r, { get: () => n[r], enumerable: !(c = T(n, r)) || c.enumerable });
  return t;
};
var D = (t) => q(A({}, "__esModule", { value: true }), t);
var d = (t, n, o) => new Promise((c, r) => {
  var l = (a) => {
    try {
      h(o.next(a));
    } catch (s) {
      r(s);
    }
  }, i = (a) => {
    try {
      h(o.throw(a));
    } catch (s) {
      r(s);
    }
  }, h = (a) => a.done ? c(a.value) : Promise.resolve(a.value).then(l, i);
  h((o = o.apply(t, n)).next());
});
var ae = {};
X(ae, { getStreams: () => re });
module.exports = D(ae);
var z = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", v = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, j = ["x", "o", "h", "n", "l"];
function Q(t) {
  return t.includes("vimeos") ? v.vimeos : t.includes("goodstream") ? v.goodstream : t.includes("cloudwindow-route") ? v.voe : t.includes("minochinos") || t.includes("vidhide") || t.includes("dintezuvio") || t.includes("dramiyos") ? v.vidhide : t.includes("premilkyway") || t.includes("hlswish") || t.includes("vibuxer") || t.includes("streamwish") ? v.streamwish : null;
}
function $(o) {
  return d(this, arguments, function* (t, n = {}) {
    let c = E(t);
    return c !== "Unknown" ? c : yield C(t, n);
  });
}
function E(t) {
  if (!t)
    return "Unknown";
  let n = Q(t);
  if (n) {
    let c = t.match(/_,([a-z,]+),\.urlset/);
    if (c) {
      let r = c[1].split(",").filter(Boolean);
      for (let l of j)
        if (r.includes(l) && n[l])
          return n[l];
    }
  }
  let o = t.match(/[_\-\/](\d{3,4})p/);
  return o ? o[1] + "p" : "Unknown";
}
function B(t, n) {
  return t >= 3840 || n >= 2160 ? "4K" : t >= 1920 || n >= 1080 ? "1080p" : t >= 1280 || n >= 720 ? "720p" : t >= 854 || n >= 480 ? "480p" : "360p";
}
function C(o) {
  return d(this, arguments, function* (t, n = {}) {
    try {
      console.log("[detectQuality] Fetching:", t.substring(0, 80));
      let c = yield fetch(t, { headers: b({ "User-Agent": z }, n), redirect: "follow" });
      console.log("[detectQuality] Status:", c.status, "ok:", c.ok);
      let r = yield c.text();
      if (console.log("[detectQuality] Response length:", r.length, "primeros 100:", r.substring(0, 100)), !r.includes("#EXT-X-STREAM-INF")) {
        let h = t.match(/[_-](\d{3,4})p/);
        return h ? `${h[1]}p` : "Unknown";
      }
      let l = 0, i = 0;
      for (let h of r.split(`
`)) {
        let a = h.match(/RESOLUTION=(\d+)x(\d+)/);
        if (a) {
          let s = parseInt(a[2]);
          s > i && (i = s, l = parseInt(a[1]));
        }
      }
      return i > 0 ? B(l, i) : "Unknown";
    } catch (c) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var m = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function K(t, n, o) {
  let c = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = (l) => {
    let i = 0;
    for (let h = 0; h < l.length; h++) {
      let a = c.indexOf(l[h]);
      if (a === -1)
        return NaN;
      i = i * n + a;
    }
    return i;
  };
  return t.replace(/\b([0-9a-zA-Z]+)\b/g, (l) => {
    let i = r(l);
    return isNaN(i) || i >= o.length ? l : o[i] && o[i] !== "" ? o[i] : l;
  });
}
function F(t, n) {
  let o = t.match(/\{[^{}]*"hls[234]"\s*:\s*"([^"]+)"[^{}]*\}/);
  if (o)
    try {
      let r = o[0].replace(/(\w+)\s*:/g, '"$1":'), l = JSON.parse(r), i = l.hls4 || l.hls3 || l.hls2;
      if (i)
        return i.startsWith("/") ? n + i : i;
    } catch (r) {
      let l = o[0].match(/"hls[234]"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
      if (l) {
        let i = l[1];
        return i.startsWith("/") ? n + i : i;
      }
    }
  let c = t.match(/["']([^"']{30,}\.m3u8[^"']*)['"]/i);
  if (c) {
    let r = c[1];
    return r.startsWith("/") ? n + r : r;
  }
  return null;
}
var G = { "hglink.to": "vibuxer.com" };
function S(t) {
  return d(this, null, function* () {
    var n;
    try {
      let o = t;
      for (let [s, u] of Object.entries(G))
        if (o.includes(s)) {
          o = o.replace(s, u);
          break;
        }
      let c = ((n = o.match(/^(https?:\/\/[^/]+)/)) == null ? void 0 : n[1]) || "https://hlswish.com";
      console.log(`[HLSWish] Resolviendo: ${t}`), o !== t && console.log(`[HLSWish] \u2192 Mapped to: ${o}`);
      let r = yield fetch(o, { headers: { "User-Agent": m, Referer: "https://embed69.org/", Origin: "https://embed69.org", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9" }, redirect: "follow" });
      if (!r.ok)
        throw new Error(`HTTP ${r.status}`);
      let l = yield r.text(), i = l.match(/file\s*:\s*["']([^"']+)["']/i);
      if (i) {
        let s = i[1];
        if (s.startsWith("/") && (s = c + s), s.includes("vibuxer.com/stream/")) {
          console.log(`[HLSWish] Siguiendo redirect: ${s.substring(0, 80)}...`);
          try {
            let p = (yield fetch(s, { headers: { "User-Agent": m, Referer: c + "/" }, redirect: "follow" })).url;
            p && p.includes(".m3u8") && (s = p);
          } catch (u) {
          }
        }
        return console.log(`[HLSWish] URL encontrada: ${s.substring(0, 80)}...`), { url: s, quality: yield $(s, { Referer: c + "/", "User-Agent": m }), headers: { "User-Agent": m, Referer: c + "/" } };
      }
      let h = l.match(/eval\(function\(p,a,c,k,e,[a-z]\)\{[^}]+\}\s*\('([\s\S]+?)',\s*(\d+),\s*(\d+),\s*'([\s\S]+?)'\.split\('\|'\)/);
      if (h) {
        let s = K(h[1], parseInt(h[2]), h[4].split("|")), u = F(s, c);
        if (u)
          return console.log(`[HLSWish] URL encontrada: ${u.substring(0, 80)}...`), { url: u, quality: yield $(u, { Referer: c + "/", "User-Agent": m }), headers: { "User-Agent": m, Referer: c + "/" } };
      }
      let a = l.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
      return a ? (console.log(`[HLSWish] URL encontrada: ${a[0].substring(0, 80)}...`), { url: a[0], quality: yield $(a[0], { Referer: c + "/", "User-Agent": m }), headers: { "User-Agent": m, Referer: c + "/" } }) : (console.log("[HLSWish] No se encontr\xF3 URL"), null);
    } catch (o) {
      return console.log(`[HLSWish] Error: ${o.message}`), null;
    }
  });
}
var J = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function N(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (n) {
    return null;
  }
}
function Y(t, n) {
  try {
    let c = n.replace(/^\[|\]$/g, "").split("','").map((s) => s.replace(/^'+|'+$/g, "")).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), r = "";
    for (let s of t) {
      let u = s.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), r += String.fromCharCode(u);
    }
    for (let s of c)
      r = r.replace(new RegExp(s, "g"), "_");
    r = r.split("_").join("");
    let l = N(r);
    if (!l)
      return null;
    let i = "";
    for (let s = 0; s < l.length; s++)
      i += String.fromCharCode((l.charCodeAt(s) - 3 + 256) % 256);
    let h = i.split("").reverse().join(""), a = N(h);
    return a ? JSON.parse(a) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function M(o) {
  return d(this, arguments, function* (t, n = {}) {
    return yield fetch(t, { method: "GET", headers: b({ "User-Agent": J, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, n), redirect: "follow" });
  });
}
function P(t) {
  return d(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let n = yield M(t, { Referer: t });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let o = yield n.text();
      if (/permanentToken/i.test(o)) {
        let a = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (a) {
          console.log(`[VOE] Permanent token redirect -> ${a[1]}`);
          let s = yield M(a[1], { Referer: t });
          s.ok && (o = yield s.text());
        }
      }
      let c = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (c) {
        let a = c[1], s = c[2].startsWith("http") ? c[2] : new URL(c[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${s}`);
        let u = yield M(s, { Referer: t }), p = u.ok ? yield u.text() : "", w = p.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || p.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (w) {
          let f = Y(a, w[1]);
          if (f && (f.source || f.direct_access_url)) {
            let g = f.source || f.direct_access_url, y = E(g);
            return console.log(`[VOE] URL encontrada: ${g.substring(0, 80)}...`), { url: g, quality: y, headers: { Referer: t } };
          }
        }
      }
      let r = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, l = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, i = [], h;
      for (; (h = r.exec(o)) !== null; )
        i.push(h);
      for (; (h = l.exec(o)) !== null; )
        i.push(h);
      for (let a of i) {
        let s = a[1];
        if (!s)
          continue;
        let u = s;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (p) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: E(u), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (n) {
      return console.log(`[VOE] Error: ${n.message}`), null;
    }
  });
}
var U = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function Z(t) {
  try {
    let n = t.match(/eval\(function\(p,a,c,k,e,[rd]\)\{.*?\}\s*\('([\s\S]*?)',\s*(\d+),\s*(\d+),\s*'([\s\S]*?)'\.split\('\|'\)/);
    if (!n)
      return null;
    let [, o, c, r, l] = n;
    c = parseInt(c), r = parseInt(r), l = l.split("|");
    let i = (h, a) => {
      let s = "0123456789abcdefghijklmnopqrstuvwxyz", u = "";
      for (; h > 0; )
        u = s[h % a] + u, h = Math.floor(h / a);
      return u || "0";
    };
    return o = o.replace(/\b\w+\b/g, (h) => {
      let a = parseInt(h, 36);
      return a < l.length && l[a] ? l[a] : i(a, c);
    }), o;
  } catch (n) {
    return null;
  }
}
function R(t) {
  return d(this, null, function* () {
    var n;
    try {
      console.log(`[VidHide] Resolviendo: ${t}`);
      let o = yield fetch(t, { method: "GET", headers: { "User-Agent": U, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", Referer: "https://embed69.org/" }, redirect: "follow" });
      if (!o.ok)
        throw new Error(`HTTP ${o.status}`);
      let r = (yield o.text()).match(/eval\(function\(p,a,c,k,e,[rd]\)[\s\S]*?\.split\('\|'\)[^\)]*\)\)/);
      if (!r)
        return console.log("[VidHide] No se encontr\xF3 bloque eval"), null;
      let l = Z(r[0]);
      if (!l)
        return console.log("[VidHide] No se pudo desempacar"), null;
      let i = l.match(/"hls4"\s*:\s*"([^"]+)"/), h = l.match(/"hls2"\s*:\s*"([^"]+)"/), a = (n = i || h) == null ? void 0 : n[1];
      if (!a)
        return console.log("[VidHide] No se encontr\xF3 hls4/hls2"), null;
      let s = a;
      a.startsWith("http") || (s = `${new URL(t).origin}${a}`), console.log(`[VidHide] URL encontrada: ${s.substring(0, 80)}...`);
      let u = new URL(t).origin;
      return { url: s, quality: yield $(s, { Referer: `${u}/`, "User-Agent": U }), headers: { "User-Agent": U, Referer: `${u}/`, Origin: u } };
    } catch (o) {
      return console.log(`[VidHide] Error: ${o.message}`), null;
    }
  });
}
var ee = "439c478a771f35c05022f9feabcca01c", V = "https://xupalace.org", _ = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", te = { "User-Agent": _, Accept: "text/html", "Accept-Language": "es-MX,es;q=0.9", Connection: "keep-alive" }, ne = { "hglink.to": { fn: S, name: "StreamWish" }, "vibuxer.com": { fn: S, name: "StreamWish" }, "voe.sx": { fn: P, name: "VOE" }, "vidhidepro.com": { fn: R, name: "VidHide" }, "vidhide.com": { fn: R, name: "VidHide" }, "dintezuvio.com": { fn: R, name: "VidHide" }, "filelions.to": { fn: R, name: "VidHide" } };
function oe(t, n) {
  return d(this, null, function* () {
    try {
      let o = `https://api.themoviedb.org/3/${n}/${t}/external_ids?api_key=${ee}`;
      return (yield fetch(o, { headers: { "User-Agent": _ } }).then((r) => r.json())).imdb_id || null;
    } catch (o) {
      return console.log(`[XuPalace] Error IMDB ID: ${o.message}`), null;
    }
  });
}
function se(t, n, o, c) {
  return d(this, null, function* () {
    try {
      let r;
      n === "movie" ? r = `/video/${t}/` : r = `/video/${t}-${o}x${String(c).padStart(2, "0")}/`, console.log(`[XuPalace] Fetching: ${V}${r}`);
      let l = yield fetch(`${V}${r}`, { headers: te }).then((a) => a.text()), i = [...l.matchAll(/go_to_playerVast\('(https?:\/\/[^']+)'[^)]+\)[^<]*data-lang="(\d+)"/g)];
      if (i.length === 0) {
        let a = [...l.matchAll(/go_to_playerVast\('(https?:\/\/[^']+)'/g)];
        return { 0: [...new Set(a.map((s) => s[1]))] };
      }
      let h = {};
      for (let a of i) {
        let s = a[1], u = parseInt(a[2]);
        h[u] || (h[u] = []), h[u].includes(s) || h[u].push(s);
      }
      return h;
    } catch (r) {
      return console.log(`[XuPalace] Error fetch: ${r.message}`), {};
    }
  });
}
function re(t, n, o, c) {
  return d(this, null, function* () {
    if (!t)
      return [];
    let r = Date.now();
    console.log(`[XuPalace] Buscando: TMDB ${t} (${n})`);
    let l = { 0: "Latino", 1: "Espa\xF1ol", 2: "Subtitulado" };
    try {
      let i = yield oe(t, n);
      if (!i)
        return console.log("[XuPalace] No se encontr\xF3 IMDB ID"), [];
      console.log(`[XuPalace] IMDB ID: ${i}`);
      let h = yield se(i, n, o, c);
      if (Object.keys(h).length === 0)
        return console.log("[XuPalace] No hay embeds"), [];
      for (let a of [0, 1, 2]) {
        let s = h[a];
        if (!s || s.length === 0)
          continue;
        let u = l[a];
        console.log(`[XuPalace] Resolviendo ${s.length} embeds (${u})...`);
        let w = (yield Promise.allSettled(s.map((f) => d(this, null, function* () {
          try {
            let g = new URL(f).hostname.replace("www.", ""), y = ne[g];
            if (!y)
              return console.log(`[XuPalace] Sin resolver para: ${g} \u2192 ${f}`), null;
            let x = yield y.fn(f);
            if (!x || !x.url)
              return null;
            let k = x.quality || "Unknown";
            return { name: "XuPalace", title: `${k} \xB7 ${u} \xB7 ${y.name}`, url: x.url, quality: k, headers: x.headers || {} };
          } catch (g) {
            return console.log(`[XuPalace] Error resolviendo URL [${f}]: ${g.message}`), null;
          }
        })))).filter((f) => f.status === "fulfilled" && f.value).map((f) => f.value);
        if (w.length > 0) {
          console.log(`[XuPalace] \u2713 Streams encontrados en ${u}, omitiendo idiomas de menor prioridad`);
          let f = ((Date.now() - r) / 1e3).toFixed(2);
          return console.log(`[XuPalace] \u2713 ${w.length} streams en ${f}s`), w;
        }
      }
      return console.log("[XuPalace] No se encontraron streams en ning\xFAn idioma"), [];
    } catch (i) {
      return console.log(`[XuPalace] Error: ${i.message}`), [];
    }
  });
}
