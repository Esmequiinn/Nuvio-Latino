var V = Object.create;
var $ = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var H = Object.getOwnPropertyNames, T = Object.getOwnPropertySymbols, F = Object.getPrototypeOf, L = Object.prototype.hasOwnProperty, j = Object.prototype.propertyIsEnumerable;
var k = (t, e, o) => e in t ? $(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, w = (t, e) => {
  for (var o in e || (e = {}))
    L.call(e, o) && k(t, o, e[o]);
  if (T)
    for (var o of T(e))
      j.call(e, o) && k(t, o, e[o]);
  return t;
};
var q = (t, e) => {
  for (var o in e)
    $(t, o, { get: e[o], enumerable: true });
}, b = (t, e, o, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of H(e))
      !L.call(t, s) && s !== o && $(t, s, { get: () => e[s], enumerable: !(r = G(e, s)) || r.enumerable });
  return t;
};
var z = (t, e, o) => (o = t != null ? V(F(t)) : {}, b(e || !t || !t.__esModule ? $(o, "default", { value: t, enumerable: true }) : o, t)), K = (t) => b($({}, "__esModule", { value: true }), t);
var h = (t, e, o) => new Promise((r, s) => {
  var u = (c) => {
    try {
      i(o.next(c));
    } catch (n) {
      s(n);
    }
  }, a = (c) => {
    try {
      i(o.throw(c));
    } catch (n) {
      s(n);
    }
  }, i = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(u, a);
  i((o = o.apply(t, e)).next());
});
var pe = {};
q(pe, { getStreams: () => de });
module.exports = K(pe);
var Y = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function J(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function S(o) {
  return h(this, arguments, function* (t, e = {}) {
    try {
      let s = yield (yield fetch(t, { headers: w({ "User-Agent": Y }, e), redirect: "follow" })).text();
      if (!s.includes("#EXT-X-STREAM-INF")) {
        let c = t.match(/[_-](\d{3,4})p/);
        return c ? `${c[1]}p` : "1080p";
      }
      let u = 0, a = 0, i = s.split(`
`);
      for (let c of i) {
        let n = c.match(/RESOLUTION=(\d+)x(\d+)/);
        if (n) {
          let l = parseInt(n[1]), p = parseInt(n[2]);
          p > a && (a = p, u = l);
        }
      }
      return a > 0 ? J(u, a) : "1080p";
    } catch (r) {
      return "1080p";
    }
  });
}
var Q = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function U(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function X(t, e) {
  try {
    let r = e.replace(/^\[|\]$/g, "").split("','").map((n) => n.replace(/^'+|'+$/g, "")).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), s = "";
    for (let n of t) {
      let l = n.charCodeAt(0);
      l > 64 && l < 91 ? l = (l - 52) % 26 + 65 : l > 96 && l < 123 && (l = (l - 84) % 26 + 97), s += String.fromCharCode(l);
    }
    for (let n of r)
      s = s.replace(new RegExp(n, "g"), "_");
    s = s.split("_").join("");
    let u = U(s);
    if (!u)
      return null;
    let a = "";
    for (let n = 0; n < u.length; n++)
      a += String.fromCharCode((u.charCodeAt(n) - 3 + 256) % 256);
    let i = a.split("").reverse().join(""), c = U(i);
    return c ? JSON.parse(c) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function E(o) {
  return h(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: w({ "User-Agent": Q, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function P(t) {
  return h(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let e = yield E(t, { Referer: t });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}`);
      let o = yield e.text();
      if (/permanentToken/i.test(o)) {
        let c = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (c) {
          console.log(`[VOE] Permanent token redirect -> ${c[1]}`);
          let n = yield E(c[1], { Referer: t });
          n.ok && (o = yield n.text());
        }
      }
      let r = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (r) {
        let c = r[1], n = r[2].startsWith("http") ? r[2] : new URL(r[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${n}`);
        let l = yield E(n, { Referer: t }), p = l.ok ? yield l.text() : "", d = p.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || p.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (d) {
          let f = X(c, d[1]);
          if (f && (f.source || f.direct_access_url)) {
            let g = f.source || f.direct_access_url, y = yield S(g, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${g.substring(0, 80)}...`), { url: g, quality: y, headers: { Referer: t } };
          }
        }
      }
      let s = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, u = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], i;
      for (; (i = s.exec(o)) !== null; )
        a.push(i);
      for (; (i = u.exec(o)) !== null; )
        a.push(i);
      for (let c of a) {
        let n = c[1];
        if (!n)
          continue;
        let l = n;
        if (l.startsWith("aHR0"))
          try {
            l = atob(l);
          } catch (p) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${l.substring(0, 80)}...`), { url: l, quality: yield S(l, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var C = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function O(t) {
  return h(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": C, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((n) => n.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let r = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], s = ["full", "hd", "sd", "low", "lowest"], u = r.map((n) => ({ type: n[1], url: n[2] })).filter((n) => !n.type.toLowerCase().includes("mobile") && n.url.startsWith("http"));
      if (u.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let i = u.sort((n, l) => {
        let p = s.findIndex((f) => n.type.toLowerCase().includes(f)), d = s.findIndex((f) => l.type.toLowerCase().includes(f));
        return (p === -1 ? 99 : p) - (d === -1 ? 99 : d);
      })[0];
      console.log(`[OkRu] URL encontrada (${i.type}): ${i.url.substring(0, 80)}...`);
      let c = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: i.url, quality: c[i.type] || i.type, headers: { "User-Agent": C, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var m = z(require("crypto-js"));
var R = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", D = m.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), _ = m.default.enc.Hex.parse("313233343536373839306f6975797472");
function Z(t) {
  return m.default.AES.encrypt(JSON.stringify(t), D, { iv: _, mode: m.default.mode.CBC, padding: m.default.pad.Pkcs7 }).ciphertext.toString(m.default.enc.Hex);
}
function ee(t) {
  let e = m.default.lib.CipherParams.create({ ciphertext: m.default.enc.Hex.parse(t) }), o = m.default.AES.decrypt(e, D, { iv: _, mode: m.default.mode.CBC, padding: m.default.pad.Pkcs7 });
  return JSON.parse(o.toString(m.default.enc.Utf8));
}
function I(t) {
  return h(this, null, function* () {
    var e, o;
    try {
      let r = t.includes("/") ? t.split("/").pop().replace("#", "") : t, s = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${r}`);
      let a = (yield fetch(`${s}/api/v1/info?id=${r}`, { headers: { "User-Agent": R, Referer: "https://gdtvid.p2pplay.pro/" } })).headers.get("set-cookie"), i = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: r, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, c = Z(i);
      yield fetch(`${s}/api/v1/player?t=${c}`, { headers: { "User-Agent": R, Referer: "https://gdtvid.p2pplay.pro/", Cookie: a || "" } });
      let l = yield (yield fetch(`${s}/api/v1/video?id=${r}&w=1536&h=864&r=null`, { headers: { "User-Agent": R, Referer: "https://gdtvid.p2pplay.pro/", Cookie: a || "" } })).text(), p = ee(l.trim()), d = "";
      if (p.hlsVideoTiktok && p.streamingConfig)
        try {
          let g = (o = (e = JSON.parse(p.streamingConfig).adjust) == null ? void 0 : e.Tiktok) == null ? void 0 : o.params, y = `${s}${p.hlsVideoTiktok}`;
          g && g.v && (y += `?v=${g.v}`), d = y, console.log("[Gdtvid] Usando ruta Proxy HLS (Tiktok) para Nuvio");
        } catch (f) {
          console.log("[Gdtvid] Error parseando streamingConfig, usando source fallback."), d = p.source;
        }
      else if (p.source)
        d = p.source, console.log("[Gdtvid] Usando ruta directa IP");
      else
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      return console.log(`[Gdtvid] URL final generada: ${d.substring(0, 80)}...`), { url: d, headers: { "User-Agent": R, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (r) {
      return console.log(`[Gdtvid] Error: ${r.message}`), null;
    }
  });
}
var te = "439c478a771f35c05022f9feabcca01c", B = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", N = { "User-Agent": B, Accept: "text/html,application/json" }, oe = "https://detodopeliculas.nu", ne = { "voe.sx": P, "ok.ru": O, gdtvid: I }, se = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, re = ["LAT", "ESP", "SUB"], A = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function x(o) {
  return h(this, arguments, function* (t, e = {}) {
    let r = yield fetch(t, { headers: w(w({}, N), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    return (r.headers.get("content-type") || "").includes("json") ? r.json() : r.text();
  });
}
function M(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function ce(t) {
  for (let [e, o] of Object.entries(ne))
    if (t.includes(e))
      return { resolver: o, serverName: se[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function ie(t, e) {
  return h(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "es-ES" }, { lang: "en-US" }], r = /* @__PURE__ */ new Set(), s = "";
    for (let { lang: u } of o)
      try {
        let a = yield x(`https://api.themoviedb.org/3/${e}/${t}?api_key=${te}&language=${u}`), i = e === "movie" ? a.title : a.name, c = e === "movie" ? a.original_title : a.original_name;
        s || (s = (a.release_date || a.first_air_date || "").substring(0, 4)), i && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(i) && r.add(i), c && r.add(c);
      } catch (a) {
      }
    return r.size > 0 ? { titles: Array.from(r), year: s } : null;
  });
}
function ae(t, e) {
  return h(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", r = /* @__PURE__ */ new Set();
    for (let s of t.titles)
      r.add(M(s, t.year)), r.add(M(s));
    for (let s of r) {
      let u = `${oe}/${o}/${s}/`;
      try {
        if ((yield fetch(u, { headers: N, redirect: "follow" })).ok)
          return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${u}`), u;
      } catch (a) {
        continue;
      }
    }
    return null;
  });
}
function le(t, e, o) {
  return h(this, null, function* () {
    try {
      let s = (yield x(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let u of s)
        if (u.includes(`>${e} - ${o}<`) || u.includes(`>${e}x${o}<`)) {
          let a = u.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (a)
            return a[1];
        }
    } catch (r) {
      return null;
    }
    return null;
  });
}
function ue(t) {
  return h(this, null, function* () {
    let e = yield x(t), o = /* @__PURE__ */ new Map(), r = e.split(/id=["']player-option-/i);
    for (let i = 1; i < r.length; i++) {
      let c = r[i], n = c.match(/^([a-z0-9-]+)/i), l = c.match(/^[^>]*>([\s\S]*?)<\/li>/i);
      if (!n || !l)
        continue;
      let p = n[1];
      if (p === "trailer")
        continue;
      let d = l[1].toLowerCase(), f = "SUB";
      d.includes("lat.png") || d.includes("latino") || d.includes("mx.png") ? f = "LAT" : d.includes("es.png") || d.includes("cas.png") || d.includes("castellano") || d.includes("espa\xF1ol") ? f = "ESP" : (d.includes("sub.png") || d.includes("vose") || d.includes("subtitulado")) && (f = "SUB"), o.set(p, f);
    }
    let s = { LAT: [], ESP: [], SUB: [] }, u = /* @__PURE__ */ new Set(), a = e.split(/id=["']source-player-/i);
    for (let i = 1; i < a.length; i++) {
      let c = a[i], n = c.match(/^([a-z0-9-]+)/i);
      if (!n)
        continue;
      let l = n[1];
      if (l === "trailer")
        continue;
      let p = c.match(/<iframe[^>]+src=["']([^"']+)["']/i);
      if (!p)
        continue;
      let d = p[1];
      if (!(d.includes("youtube.com") || d.includes("googletagmanager") || !d.startsWith("http")) && !u.has(d)) {
        u.add(d);
        let f = o.get(l) || "LAT";
        s[f].push(d);
      }
    }
    if (s.LAT.length === 0 && s.ESP.length === 0 && s.SUB.length === 0) {
      let i = [...e.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];
      for (let c of i) {
        let n = c[1];
        n.includes("youtube.com") || n.includes("googletagmanager") || !n.startsWith("http") || u.has(n) || (u.add(n), s.LAT.push(n));
      }
    }
    return s;
  });
}
function de(t, e, o, r) {
  return h(this, null, function* () {
    if (!t || !e)
      return [];
    let s = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${r}` : ""}`);
    try {
      let u = yield ie(t, e);
      if (!u)
        return [];
      let a = yield ae(u, e);
      if (!a)
        return [];
      let i = a;
      if (e === "tv" && o && r && (i = yield le(a, o, r), !i))
        return [];
      let c = yield ue(i);
      for (let n of re) {
        let l = c[n];
        if (!l || l.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${l.length} embeds en ${A[n]}...`);
        let p = l.map((g) => h(this, null, function* () {
          let { resolver: y, serverName: W } = ce(g);
          if (!y)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${g}`), null;
          try {
            let v = yield y(g);
            return v ? { name: "DeTodoPeliculas", title: `${v.quality || "1080p"} \xB7 ${A[n]} \xB7 ${W}`, url: v.url, quality: v.quality || "1080p", headers: v.headers || { "User-Agent": B, Referer: i } } : null;
          } catch (v) {
            return null;
          }
        })), f = (yield Promise.allSettled(p)).filter((g) => g.status === "fulfilled" && g.value !== null).map((g) => g.value);
        if (f.length > 0) {
          let g = ((Date.now() - s) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${f.length} streams encontrados en ${A[n]} (${g}s), omitiendo otros idiomas.`), f;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${A[n]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (u) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${u.message}`), [];
    }
  });
}
