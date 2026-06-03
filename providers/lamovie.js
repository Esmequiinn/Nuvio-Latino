var $ = Object.defineProperty;
var C = Object.getOwnPropertyDescriptor;
var V = Object.getOwnPropertyNames, U = Object.getOwnPropertySymbols;
var W = Object.prototype.hasOwnProperty, z = Object.prototype.propertyIsEnumerable;
var b = (e, t, n) => t in e ? $(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n, w = (e, t) => {
  for (var n in t || (t = {}))
    W.call(t, n) && b(e, n, t[n]);
  if (U)
    for (var n of U(t))
      z.call(t, n) && b(e, n, t[n]);
  return e;
};
var P = (e, t) => {
  for (var n in t)
    $(e, n, { get: t[n], enumerable: true });
}, D = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let s of V(t))
      !W.call(e, s) && s !== n && $(e, s, { get: () => t[s], enumerable: !(r = C(t, s)) || r.enumerable });
  return e;
};
var F = (e) => D($({}, "__esModule", { value: true }), e);
var d = (e, t, n) => new Promise((r, s) => {
  var o = (c) => {
    try {
      u(n.next(c));
    } catch (a) {
      s(a);
    }
  }, i = (c) => {
    try {
      u(n.throw(c));
    } catch (a) {
      s(a);
    }
  }, u = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(o, i);
  u((n = n.apply(e, t)).next());
});
var we = {};
P(we, { getStreams: () => ge });
module.exports = F(we);
var j = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", v = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, B = ["x", "o", "h", "n", "l"];
function G(e) {
  return e.includes("vimeos") ? v.vimeos : e.includes("goodstream") ? v.goodstream : e.includes("cloudwindow-route") ? v.voe : e.includes("minochinos") || e.includes("vidhide") || e.includes("dintezuvio") || e.includes("dramiyos") ? v.vidhide : e.includes("premilkyway") || e.includes("hlswish") || e.includes("vibuxer") || e.includes("streamwish") ? v.streamwish : null;
}
function y(n) {
  return d(this, arguments, function* (e, t = {}) {
    let r = m(e);
    return r !== "Unknown" ? r : yield Q(e, t);
  });
}
function m(e) {
  if (!e)
    return "Unknown";
  let t = G(e);
  if (t) {
    let r = e.match(/_,([a-z,]+),\.urlset/);
    if (r) {
      let s = r[1].split(",").filter(Boolean);
      for (let o of B)
        if (s.includes(o) && t[o])
          return t[o];
    }
  }
  let n = e.match(/[_\-\/](\d{3,4})p/);
  return n ? n[1] + "p" : "Unknown";
}
function K(e, t) {
  return e >= 3840 || t >= 2160 ? "4K" : e >= 1920 || t >= 1080 ? "1080p" : e >= 1280 || t >= 720 ? "720p" : e >= 854 || t >= 480 ? "480p" : "360p";
}
function Q(n) {
  return d(this, arguments, function* (e, t = {}) {
    try {
      let s = yield (yield fetch(e, { headers: w({ "User-Agent": j }, t), redirect: "follow" })).text();
      if (!s.includes("#EXT-X-STREAM-INF")) {
        let u = e.match(/[_-](\d{3,4})p/);
        return u ? `${u[1]}p` : "Unknown";
      }
      let o = 0, i = 0;
      for (let u of s.split(`
`)) {
        let c = u.match(/RESOLUTION=(\d+)x(\d+)/);
        if (c) {
          let a = parseInt(c[2]);
          a > i && (i = a, o = parseInt(c[1]));
        }
      }
      return i > 0 ? K(o, i) : "Unknown";
    } catch (r) {
      return "Unknown";
    }
  });
}
var T = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function N(e) {
  return d(this, null, function* () {
    try {
      console.log(`[GoodStream] Resolviendo: ${e}`);
      let t = yield fetch(e, { headers: { "User-Agent": T, Referer: "https://goodstream.one", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!t.ok)
        throw new Error(`HTTP ${t.status}`);
      let r = (yield t.text()).match(/file:\s*"([^"]+)"/);
      if (!r)
        return console.log('[GoodStream] No se encontr\xF3 patr\xF3n file:"..."'), null;
      let s = r[1], o = { Referer: e, Origin: "https://goodstream.one", "User-Agent": T }, i = m(s);
      return console.log(`[GoodStream] URL encontrada (${i}): ${s.substring(0, 80)}...`), { url: s, quality: i, headers: o };
    } catch (t) {
      return console.log(`[GoodStream] Error: ${t.message}`), null;
    }
  });
}
var X = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function _(e) {
  try {
    return typeof atob != "undefined" ? atob(e) : Buffer.from(e, "base64").toString("utf8");
  } catch (t) {
    return null;
  }
}
function J(e, t) {
  try {
    let r = t.replace(/^\[|\]$/g, "").split("','").map((a) => a.replace(/^'+|'+$/g, "")).map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), s = "";
    for (let a of e) {
      let l = a.charCodeAt(0);
      l > 64 && l < 91 ? l = (l - 52) % 26 + 65 : l > 96 && l < 123 && (l = (l - 84) % 26 + 97), s += String.fromCharCode(l);
    }
    for (let a of r)
      s = s.replace(new RegExp(a, "g"), "_");
    s = s.split("_").join("");
    let o = _(s);
    if (!o)
      return null;
    let i = "";
    for (let a = 0; a < o.length; a++)
      i += String.fromCharCode((o.charCodeAt(a) - 3 + 256) % 256);
    let u = i.split("").reverse().join(""), c = _(u);
    return c ? JSON.parse(c) : null;
  } catch (n) {
    return console.log("[VOE] voeDecode error:", n.message), null;
  }
}
function S(n) {
  return d(this, arguments, function* (e, t = {}) {
    return yield fetch(e, { method: "GET", headers: w({ "User-Agent": X, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, t), redirect: "follow" });
  });
}
function k(e) {
  return d(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${e}`);
      let t = yield S(e, { Referer: e });
      if (!t.ok)
        throw new Error(`HTTP ${t.status}`);
      let n = yield t.text();
      if (/permanentToken/i.test(n)) {
        let c = n.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (c) {
          console.log(`[VOE] Permanent token redirect -> ${c[1]}`);
          let a = yield S(c[1], { Referer: e });
          a.ok && (n = yield a.text());
        }
      }
      let r = n.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (r) {
        let c = r[1], a = r[2].startsWith("http") ? r[2] : new URL(r[2], e).href;
        console.log(`[VOE] Found encoded array + loader: ${a}`);
        let l = yield S(a, { Referer: e }), f = l.ok ? yield l.text() : "", h = f.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || f.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (h) {
          let p = J(c, h[1]);
          if (p && (p.source || p.direct_access_url)) {
            let R = p.source || p.direct_access_url, q = m(R);
            return console.log(`[VOE] URL encontrada: ${R.substring(0, 80)}...`), { url: R, quality: q, headers: { Referer: e } };
          }
        }
      }
      let s = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, o = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, i = [], u;
      for (; (u = s.exec(n)) !== null; )
        i.push(u);
      for (; (u = o.exec(n)) !== null; )
        i.push(u);
      for (let c of i) {
        let a = c[1];
        if (!a)
          continue;
        let l = a;
        if (l.startsWith("aHR0"))
          try {
            l = atob(l);
          } catch (f) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${l.substring(0, 80)}...`), { url: l, quality: m(l), headers: { Referer: e } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (t) {
      return console.log(`[VOE] Error: ${t.message}`), null;
    }
  });
}
var g = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function Y(e, t, n) {
  let r = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", s = (o) => {
    let i = 0;
    for (let u = 0; u < o.length; u++) {
      let c = r.indexOf(o[u]);
      if (c === -1)
        return NaN;
      i = i * t + c;
    }
    return i;
  };
  return e.replace(/\b([0-9a-zA-Z]+)\b/g, (o) => {
    let i = s(o);
    return isNaN(i) || i >= n.length ? o : n[i] && n[i] !== "" ? n[i] : o;
  });
}
function Z(e, t) {
  let n = e.match(/\{[^{}]*"hls[234]"\s*:\s*"([^"]+)"[^{}]*\}/);
  if (n)
    try {
      let s = n[0].replace(/(\w+)\s*:/g, '"$1":'), o = JSON.parse(s), i = o.hls4 || o.hls3 || o.hls2;
      if (i)
        return i.startsWith("/") ? t + i : i;
    } catch (s) {
      let o = n[0].match(/"hls[234]"\s*:\s*"([^"]+\.m3u8[^"]*)"/);
      if (o) {
        let i = o[1];
        return i.startsWith("/") ? t + i : i;
      }
    }
  let r = e.match(/["']([^"']{30,}\.m3u8[^"']*)['"]/i);
  if (r) {
    let s = r[1];
    return s.startsWith("/") ? t + s : s;
  }
  return null;
}
var ee = { "hglink.to": "vibuxer.com" };
function x(e) {
  return d(this, null, function* () {
    var t;
    try {
      let n = e;
      for (let [a, l] of Object.entries(ee))
        if (n.includes(a)) {
          n = n.replace(a, l);
          break;
        }
      let r = ((t = n.match(/^(https?:\/\/[^/]+)/)) == null ? void 0 : t[1]) || "https://hlswish.com";
      console.log(`[HLSWish] Resolviendo: ${e}`), n !== e && console.log(`[HLSWish] \u2192 Mapped to: ${n}`);
      let s = yield fetch(n, { headers: { "User-Agent": g, Referer: "https://embed69.org/", Origin: "https://embed69.org", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9" }, redirect: "follow" });
      if (!s.ok)
        throw new Error(`HTTP ${s.status}`);
      let o = yield s.text(), i = o.match(/file\s*:\s*["']([^"']+)["']/i);
      if (i) {
        let a = i[1];
        if (a.startsWith("/") && (a = r + a), a.includes("vibuxer.com/stream/")) {
          console.log(`[HLSWish] Siguiendo redirect: ${a.substring(0, 80)}...`);
          try {
            let f = (yield fetch(a, { headers: { "User-Agent": g, Referer: r + "/" }, redirect: "follow" })).url;
            f && f.includes(".m3u8") && (a = f);
          } catch (l) {
          }
        }
        return console.log(`[HLSWish] URL encontrada: ${a.substring(0, 80)}...`), { url: a, quality: yield y(a, { Referer: r + "/", "User-Agent": g }), headers: { "User-Agent": g, Referer: r + "/" } };
      }
      let u = o.match(/eval\(function\(p,a,c,k,e,[a-z]\)\{[^}]+\}\s*\('([\s\S]+?)',\s*(\d+),\s*(\d+),\s*'([\s\S]+?)'\.split\('\|'\)/);
      if (u) {
        let a = Y(u[1], parseInt(u[2]), u[4].split("|")), l = Z(a, r);
        if (l)
          return console.log(`[HLSWish] URL encontrada: ${l.substring(0, 80)}...`), { url: l, quality: yield y(l, { Referer: r + "/", "User-Agent": g }), headers: { "User-Agent": g, Referer: r + "/" } };
      }
      let c = o.match(/https?:\/\/[^"'\s\\]+\.m3u8[^"'\s\\]*/i);
      return c ? (console.log(`[HLSWish] URL encontrada: ${c[0].substring(0, 80)}...`), { url: c[0], quality: yield y(c[0], { Referer: r + "/", "User-Agent": g }), headers: { "User-Agent": g, Referer: r + "/" } }) : (console.log("[HLSWish] No se encontr\xF3 URL"), null);
    } catch (n) {
      return console.log(`[HLSWish] Error: ${n.message}`), null;
    }
  });
}
var O = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function I(e) {
  return d(this, null, function* () {
    try {
      console.log(`[Vimeos] Resolviendo: ${e}`);
      let t = yield fetch(e, { headers: { "User-Agent": O, Referer: "https://vimeos.net/", Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, redirect: "follow" });
      if (!t.ok)
        throw new Error(`HTTP ${t.status}`);
      let r = (yield t.text()).match(/eval\(function\(p,a,c,k,e,[dr]\)\{[\s\S]+?\}\('([\s\S]+?)',(\d+),(\d+),'([\s\S]+?)'\.split\('\|'\)/);
      if (r) {
        let s = r[1], o = parseInt(r[2]), i = r[4].split("|"), u = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", c = (f) => {
          let h = 0;
          for (let p = 0; p < f.length; p++)
            h = h * o + u.indexOf(f[p]);
          return h;
        }, l = s.replace(/\b(\w+)\b/g, (f) => {
          let h = c(f);
          return i[h] && i[h] !== "" ? i[h] : f;
        }).match(/["']([^"']+\.m3u8[^"']*)['"]/i);
        if (l) {
          let f = l[1], h = { "User-Agent": O, Referer: "https://vimeos.net/" }, p = m(f);
          return console.log(`[Vimeos] URL encontrada: ${f.substring(0, 80)}...`), { url: f, quality: p, headers: h };
        }
      }
      return console.log("[Vimeos] No se encontr\xF3 URL"), null;
    } catch (t) {
      return console.log(`[Vimeos] Error: ${t.message}`), null;
    }
  });
}
var te = "439c478a771f35c05022f9feabcca01c", E = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", M = { "User-Agent": E, Accept: "application/json" }, L = "https://lamovie.org", ne = ["JP", "CN", "KR"], re = 16, oe = { "goodstream.one": N, "hlswish.com": x, "streamwish.com": x, "streamwish.to": x, "strwish.com": x, "voe.sx": k, "vimeos.net": I }, se = [];
function A(n) {
  return d(this, arguments, function* (e, t = {}) {
    let r = yield fetch(e, { headers: w({ "User-Agent": E }, t.headers), redirect: "follow" });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    return (r.headers.get("content-type") || "").includes("json") ? r.json() : r.text();
  });
}
var ie = (e) => e.includes("goodstream") ? "GoodStream" : e.includes("hlswish") || e.includes("streamwish") ? "StreamWish" : e.includes("voe.sx") ? "VOE" : e.includes("filemoon") ? "Filemoon" : e.includes("vimeos.net") ? "Vimeos" : "Online", ae = (e) => {
  try {
    if (se.some((t) => e.includes(t)))
      return null;
    for (let [t, n] of Object.entries(oe))
      if (e.includes(t))
        return n;
  } catch (t) {
  }
  return null;
};
function H(e, t) {
  let n = e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return t ? `${n}-${t}` : n;
}
function ce(e, t, n) {
  return e === "movie" ? ["peliculas"] : (t || []).includes(re) ? (n || []).some((o) => ne.includes(o)) ? ["animes"] : ["animes", "series"] : ["series"];
}
function le(e, t) {
  return d(this, null, function* () {
    var a;
    let n = [{ lang: "es-MX", name: "Latino" }, { lang: "en-US", name: "Ingl\xE9s" }], [r, s] = yield Promise.all(n.map(({ lang: l }) => A(`https://api.themoviedb.org/3/${t}/${e}?api_key=${te}&language=${l}`, { headers: M }).catch(() => null))), o = r && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(r.title || r.name) ? r : s;
    if (!o)
      return null;
    let i = t === "movie" ? o.title : o.name, u = t === "movie" ? o.original_title : o.original_name;
    return console.log(`[LaMovie] TMDB (${o === r ? "Latino" : "Ingl\xE9s"}): "${i}"${i !== u ? ` | Original: "${u}"` : ""}`), { title: i, originalTitle: u, year: (o.release_date || o.first_air_date || "").substring(0, 4), genres: (o.genres || []).map((l) => l.id), originCountries: o.origin_country || ((a = o.production_countries) == null ? void 0 : a.map((l) => l.iso_3166_1)) || [] };
  });
}
var ue = { "User-Agent": E, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "es-MX,es;q=0.9", Connection: "keep-alive", "Upgrade-Insecure-Requests": "1" };
function fe(e) {
  let t = e.match(/rel=['"]shortlink['"]\s+href=['"][^'"]*\?p=(\d+)['"]/);
  return t ? t[1] : null;
}
function pe(e, t) {
  return d(this, null, function* () {
    let n = `${L}/${e}/${t}/`;
    try {
      let r = yield A(n, { headers: ue, validateStatus: (o) => o === 200 }), s = fe(r);
      return s ? (console.log(`[LaMovie] \u2713 Slug directo: /${e}/${t} \u2192 id:${s}`), { id: s }) : null;
    } catch (r) {
      return null;
    }
  });
}
function de(e, t) {
  return d(this, null, function* () {
    let { title: n, originalTitle: r, year: s, genres: o, originCountries: i } = e, u = ce(t, o, i), c = [];
    n && c.push(H(n, s)), r && r !== n && c.push(H(r, s));
    let a = c.flatMap((l) => u.map((f) => pe(f, l)));
    try {
      return yield Promise.any(a);
    } catch (l) {
      return null;
    }
  });
}
function he(e, t, n) {
  return d(this, null, function* () {
    var s;
    let r = `${L}/wp-api/v1/single/episodes/list?_id=${e}&season=${t}&page=1&postsPerPage=50`;
    try {
      let o = yield A(r, { headers: M });
      if (!((s = o == null ? void 0 : o.data) != null && s.posts))
        return null;
      let i = o.data.posts.find((u) => u.season_number == t && u.episode_number == n);
      return (i == null ? void 0 : i._id) || null;
    } catch (o) {
      return console.log(`[LaMovie] Error episodios: ${o.message}`), null;
    }
  });
}
function me(e) {
  return d(this, null, function* () {
    try {
      let t = ae(e.url);
      if (!t)
        return console.log(`[LaMovie] Sin resolver para: ${e.url}`), null;
      let n = yield t(e.url);
      if (!n || !n.url)
        return null;
      let r = ie(e.url), s = n.quality || "Unknown";
      return { name: "LaMovie", title: `${s} \xB7 ${r}`, url: n.url, quality: s, headers: n.headers || {} };
    } catch (t) {
      return console.log(`[LaMovie] Error procesando embed: ${t.message}`), null;
    }
  });
}
function ge(e, t, n, r) {
  return d(this, null, function* () {
    var o;
    if (!e || !t)
      return [];
    let s = Date.now();
    console.log(`[LaMovie] Buscando: TMDB ${e} (${t})${n ? ` S${n}E${r}` : ""}`);
    try {
      let i = yield le(e, t);
      if (!i)
        return [];
      let u = yield de(i, t);
      if (!u)
        return console.log("[LaMovie] No encontrado por slug"), [];
      let c = u.id;
      if (t === "tv" && n && r) {
        let p = yield he(c, n, r);
        if (!p)
          return console.log(`[LaMovie] Episodio S${n}E${r} no encontrado`), [];
        c = p;
      }
      let a = yield A(`${L}/wp-api/v1/player?postId=${c}&demo=0`, { headers: M });
      if (!((o = a == null ? void 0 : a.data) != null && o.embeds))
        return console.log("[LaMovie] No hay embeds disponibles"), [];
      let f = (yield Promise.allSettled(a.data.embeds.map((p) => me(p)))).filter((p) => p.status === "fulfilled" && p.value).map((p) => p.value), h = ((Date.now() - s) / 1e3).toFixed(2);
      return console.log(`[LaMovie] \u2713 ${f.length} streams en ${h}s`), f;
    } catch (i) {
      return console.log(`[LaMovie] Error: ${i.message}`), [];
    }
  });
}
