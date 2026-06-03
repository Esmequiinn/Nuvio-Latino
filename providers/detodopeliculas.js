var z = Object.create;
var E = Object.defineProperty, Q = Object.defineProperties, K = Object.getOwnPropertyDescriptor, X = Object.getOwnPropertyDescriptors, J = Object.getOwnPropertyNames, U = Object.getOwnPropertySymbols, Y = Object.getPrototypeOf, O = Object.prototype.hasOwnProperty, Z = Object.prototype.propertyIsEnumerable;
var _ = (t, o, n) => o in t ? E(t, o, { enumerable: true, configurable: true, writable: true, value: n }) : t[o] = n, v = (t, o) => {
  for (var n in o || (o = {}))
    O.call(o, n) && _(t, n, o[n]);
  if (U)
    for (var n of U(o))
      Z.call(o, n) && _(t, n, o[n]);
  return t;
}, C = (t, o) => Q(t, X(o));
var ee = (t, o) => {
  for (var n in o)
    E(t, n, { get: o[n], enumerable: true });
}, D = (t, o, n, i) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let r of J(o))
      !O.call(t, r) && r !== n && E(t, r, { get: () => o[r], enumerable: !(i = K(o, r)) || i.enumerable });
  return t;
};
var te = (t, o, n) => (n = t != null ? z(Y(t)) : {}, D(o || !t || !t.__esModule ? E(n, "default", { value: t, enumerable: true }) : n, t)), oe = (t) => D(E({}, "__esModule", { value: true }), t);
var p = (t, o, n) => new Promise((i, r) => {
  var c = (a) => {
    try {
      l(n.next(a));
    } catch (s) {
      r(s);
    }
  }, u = (a) => {
    try {
      l(n.throw(a));
    } catch (s) {
      r(s);
    }
  }, l = (a) => a.done ? i(a.value) : Promise.resolve(a.value).then(c, u);
  l((n = n.apply(t, o)).next());
});
var Ee = {};
ee(Ee, { getStreams: () => xe });
module.exports = oe(Ee);
var ne = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", S = { vimeos: { h: "720p", n: "480p" }, goodstream: { x: "1080p", h: "720p", n: "480p", l: "360p" }, vidhide: { n: "720p", l: "480p" }, streamwish: { x: "1080p", h: "1080p", n: "720p", l: "480p" }, voe: { n: "720p", l: "360p" } }, se = ["x", "o", "h", "n", "l"];
function re(t) {
  return t.includes("vimeos") ? S.vimeos : t.includes("goodstream") ? S.goodstream : t.includes("cloudwindow-route") ? S.voe : t.includes("minochinos") || t.includes("vidhide") || t.includes("dintezuvio") || t.includes("dramiyos") ? S.vidhide : t.includes("premilkyway") || t.includes("hlswish") || t.includes("vibuxer") || t.includes("streamwish") ? S.streamwish : null;
}
function T(t) {
  if (!t)
    return "Unknown";
  let o = re(t);
  if (o) {
    let i = t.match(/_,([a-z,]+),\.urlset/);
    if (i) {
      let r = i[1].split(",").filter(Boolean);
      for (let c of se)
        if (r.includes(c) && o[c])
          return o[c];
    }
  }
  let n = t.match(/[_\-\/](\d{3,4})p/);
  return n ? n[1] + "p" : "Unknown";
}
function ie(t, o) {
  return t >= 3840 || o >= 2160 ? "4K" : t >= 1920 || o >= 1080 ? "1080p" : t >= 1280 || o >= 720 ? "720p" : t >= 854 || o >= 480 ? "480p" : "360p";
}
function M(n) {
  return p(this, arguments, function* (t, o = {}) {
    try {
      console.log("[detectQuality] Fetching:", t.substring(0, 80));
      let i = yield fetch(t, { headers: v({ "User-Agent": ne }, o), redirect: "follow" });
      console.log("[detectQuality] Status:", i.status, "ok:", i.ok);
      let r = yield i.text();
      if (console.log("[detectQuality] Response length:", r.length, "primeros 100:", r.substring(0, 100)), !r.includes("#EXT-X-STREAM-INF")) {
        let l = t.match(/[_-](\d{3,4})p/);
        return l ? `${l[1]}p` : "Unknown";
      }
      let c = 0, u = 0;
      for (let l of r.split(`
`)) {
        let a = l.match(/RESOLUTION=(\d+)x(\d+)/);
        if (a) {
          let s = parseInt(a[2]);
          s > u && (u = s, c = parseInt(a[1]));
        }
      }
      return u > 0 ? ie(c, u) : "Unknown";
    } catch (i) {
      return console.log("[detectQuality] Error:", e.message), "Unknown";
    }
  });
}
var ae = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function I(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (o) {
    return null;
  }
}
function ce(t, o) {
  try {
    let i = o.replace(/^\[|\]$/g, "").split("','").map((s) => s.replace(/^'+|'+$/g, "")).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), r = "";
    for (let s of t) {
      let d = s.charCodeAt(0);
      d > 64 && d < 91 ? d = (d - 52) % 26 + 65 : d > 96 && d < 123 && (d = (d - 84) % 26 + 97), r += String.fromCharCode(d);
    }
    for (let s of i)
      r = r.replace(new RegExp(s, "g"), "_");
    r = r.split("_").join("");
    let c = I(r);
    if (!c)
      return null;
    let u = "";
    for (let s = 0; s < c.length; s++)
      u += String.fromCharCode((c.charCodeAt(s) - 3 + 256) % 256);
    let l = u.split("").reverse().join(""), a = I(l);
    return a ? JSON.parse(a) : null;
  } catch (n) {
    return console.log("[VOE] voeDecode error:", n.message), null;
  }
}
function k(n) {
  return p(this, arguments, function* (t, o = {}) {
    return yield fetch(t, { method: "GET", headers: v({ "User-Agent": ae, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, o), redirect: "follow" });
  });
}
function B(t) {
  return p(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let o = yield k(t, { Referer: t });
      if (!o.ok)
        throw new Error(`HTTP ${o.status}`);
      let n = yield o.text();
      if (/permanentToken/i.test(n)) {
        let a = n.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (a) {
          console.log(`[VOE] Permanent token redirect -> ${a[1]}`);
          let s = yield k(a[1], { Referer: t });
          s.ok && (n = yield s.text());
        }
      }
      let i = n.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (i) {
        let a = i[1], s = i[2].startsWith("http") ? i[2] : new URL(i[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${s}`);
        let d = yield k(s, { Referer: t }), w = d.ok ? yield d.text() : "", h = w.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || w.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (h) {
          let f = ce(a, h[1]);
          if (f && (f.source || f.direct_access_url)) {
            let g = f.source || f.direct_access_url, y = T(g);
            return console.log(`[VOE] URL encontrada: ${g.substring(0, 80)}...`), { url: g, quality: y, headers: { Referer: t } };
          }
        }
      }
      let r = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, c = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, u = [], l;
      for (; (l = r.exec(n)) !== null; )
        u.push(l);
      for (; (l = c.exec(n)) !== null; )
        u.push(l);
      for (let a of u) {
        let s = a[1];
        if (!s)
          continue;
        let d = s;
        if (d.startsWith("aHR0"))
          try {
            d = atob(d);
          } catch (w) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${d.substring(0, 80)}...`), { url: d, quality: T(d), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (o) {
      return console.log(`[VOE] Error: ${o.message}`), null;
    }
  });
}
var W = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function N(t) {
  return p(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let o = yield fetch(t, { headers: { "User-Agent": W, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((s) => s.text());
      if (o.includes("copyrightsRestricted") || o.includes("COPYRIGHTS_RESTRICTED") || o.includes("LIMITED_ACCESS") || o.includes("notFound") || !o.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let i = [...o.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], r = ["full", "hd", "sd", "low", "lowest"], c = i.map((s) => ({ type: s[1], url: s[2] })).filter((s) => !s.type.toLowerCase().includes("mobile") && s.url.startsWith("http"));
      if (c.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let l = c.sort((s, d) => {
        let w = r.findIndex((f) => s.type.toLowerCase().includes(f)), h = r.findIndex((f) => d.type.toLowerCase().includes(f));
        return (w === -1 ? 99 : w) - (h === -1 ? 99 : h);
      })[0];
      console.log(`[OkRu] URL encontrada (${l.type}): ${l.url.substring(0, 80)}...`);
      let a = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: l.url, quality: a[l.type] || l.type, headers: { "User-Agent": W, Referer: "https://ok.ru/" } };
    } catch (o) {
      return console.log(`[OkRu] Error: ${o.message}`), null;
    }
  });
}
var m = te(require("crypto-js"));
var $ = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", H = m.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), q = m.default.enc.Hex.parse("313233343536373839306f6975797472");
function le(t) {
  return m.default.AES.encrypt(JSON.stringify(t), H, { iv: q, mode: m.default.mode.CBC, padding: m.default.pad.Pkcs7 }).ciphertext.toString(m.default.enc.Hex);
}
function ue(t) {
  let o = m.default.lib.CipherParams.create({ ciphertext: m.default.enc.Hex.parse(t) }), n = m.default.AES.decrypt(o, H, { iv: q, mode: m.default.mode.CBC, padding: m.default.pad.Pkcs7 });
  return JSON.parse(n.toString(m.default.enc.Utf8));
}
function L(t, o) {
  return p(this, null, function* () {
    if (typeof XMLHttpRequest != "undefined")
      return new Promise((n, i) => {
        let r = new XMLHttpRequest();
        r.open("GET", t), r.responseType = "text";
        for (let [c, u] of Object.entries(o))
          r.setRequestHeader(c, u);
        r.onload = () => {
          if (r.status >= 200 && r.status < 300) {
            let c = r.getResponseHeader("set-cookie") || "";
            n({ text: r.responseText, cookie: c });
          } else
            i(new Error(`HTTP ${r.status}`));
        }, r.onerror = () => i(new Error("XHR network error")), r.send();
      });
    {
      let n = yield fetch(t, { headers: o });
      if (!n.ok)
        throw new Error(`HTTP ${n.status}`);
      let i = n.headers.get("set-cookie") || "";
      return { text: yield n.text(), cookie: i };
    }
  });
}
function V(t) {
  return p(this, null, function* () {
    try {
      let o = t.includes("/") ? t.split("/").pop().replace("#", "") : t, n = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${o}`);
      let r = (yield L(`${n}/api/v1/info?id=${o}`, { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/" })).cookie, c = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: o, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, u = le(c), [, l] = yield Promise.all([L(`${n}/api/v1/player?t=${u}`, { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" }), L(`${n}/api/v1/video?id=${o}&w=1536&h=864&r=null`, { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" })]), a = ue(l.text.trim());
      if (!a.source)
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      console.log(`[Gdtvid] URL final generada: ${a.source.substring(0, 80)}...`);
      let s = yield M(a.source, { Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" });
      return { url: a.source, quality: s, headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (o) {
      return console.log(`[Gdtvid] Error: ${o.message}`), null;
    }
  });
}
var de = "439c478a771f35c05022f9feabcca01c", F = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", b = { "User-Agent": F, Accept: "text/html,application/json" }, G = "https://detodopeliculas.nu", pe = { "voe.sx": B, "ok.ru": N, gdtvid: V }, fe = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, he = ["LAT", "ESP", "SUB"], A = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function P(n) {
  return p(this, arguments, function* (t, o = {}) {
    let i = yield fetch(t, { headers: v(v({}, b), o.headers), method: o.method || "GET", redirect: "follow" });
    if (!i.ok)
      throw new Error(`HTTP ${i.status}`);
    return (i.headers.get("content-type") || "").includes("json") ? i.json() : i.text();
  });
}
function j(t, o = null) {
  let n = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return o ? `${n}-${o}` : n;
}
function ge(t) {
  for (let [o, n] of Object.entries(pe))
    if (t.includes(o))
      return { resolver: n, serverName: fe[o] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function me(t) {
  if (!t)
    return null;
  let o = t.match(/src=["']([^"']+)["']/i);
  return o ? o[1] : t;
}
function we(t, o) {
  return p(this, null, function* () {
    let n = ["es-MX", "en-US", "es-ES"], i = yield Promise.all(n.map((u) => P(`https://api.themoviedb.org/3/${o}/${t}?api_key=${de}&language=${u}`).catch(() => null))), r = /* @__PURE__ */ new Set(), c = "";
    for (let u of i) {
      if (!u)
        continue;
      let l = o === "movie" ? u.title : u.name, a = o === "movie" ? u.original_title : u.original_name;
      c || (c = (u.release_date || u.first_air_date || "").substring(0, 4)), l && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(l) && r.add(l), a && r.add(a);
    }
    return r.size > 0 ? { titles: Array.from(r), year: c } : null;
  });
}
function ye(t, o) {
  return p(this, null, function* () {
    let n = o === "movie" ? "pelicula" : "serie", i = /* @__PURE__ */ new Set();
    for (let r of t.titles)
      i.add(j(r, t.year)), i.add(j(r));
    try {
      return yield Promise.any([...i].map((r) => p(this, null, function* () {
        let c = `${G}/${n}/${r}/`;
        if (!(yield fetch(c, { headers: b, redirect: "follow" })).ok)
          throw new Error();
        return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${c}`), c;
      })));
    } catch (r) {
      return null;
    }
  });
}
function ve(t, o, n) {
  return p(this, null, function* () {
    try {
      let r = (yield P(`${t}?ep_season=${o}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let c of r)
        if (c.includes(`>${o} - ${n}<`) || c.includes(`>${o}x${n}<`)) {
          let u = c.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (u)
            return u[1];
        }
    } catch (i) {
      return null;
    }
    return null;
  });
}
function Re(t) {
  return p(this, null, function* () {
    let o = yield P(t), n = { LAT: [], ESP: [], SUB: [] }, i = /* @__PURE__ */ new Set(), r = [...o.matchAll(/<li[^>]*class=["'][^"']*dooplay_player_option[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`[AJAX] opciones encontradas: ${r.length}`);
    let c = [];
    for (let l of r) {
      let a = l[0], s = l[1].toLowerCase(), d = a.match(/data-post=["']([^"']+)["']/i), w = a.match(/data-nume=["']([^"']+)["']/i), h = a.match(/data-type=["']([^"']+)["']/i);
      if (!d || !w || !h)
        continue;
      let f = "SUB";
      s.includes("lat") || s.includes("latino") || s.includes("mx") ? f = "LAT" : (s.includes("cast") || s.includes("espa\xF1ol") || s.includes("es ")) && (f = "ESP"), c.push({ post: d[1], nume: w[1], playerType: h[1], lang: f });
    }
    let u = yield Promise.allSettled(c.map((w) => p(this, [w], function* ({ post: l, nume: a, playerType: s, lang: d }) {
      let h = new URLSearchParams();
      h.append("action", "doo_player_ajax"), h.append("post", l), h.append("nume", a), h.append("type", s);
      let g = yield (yield fetch(`${G}/wp-admin/admin-ajax.php`, { method: "POST", headers: C(v({}, b), { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: h.toString() })).text(), y = JSON.parse(g), R = me(y == null ? void 0 : y.embed_url);
      return !R || (y == null ? void 0 : y.type) === "trailer" || !R.startsWith("http") || R.includes("youtube.com") || R.includes("googletagmanager") ? null : { embedUrl: R, lang: d };
    })));
    for (let l of u) {
      if (l.status !== "fulfilled" || !l.value)
        continue;
      let { embedUrl: a, lang: s } = l.value;
      i.has(a) || (i.add(a), n[s].push(a));
    }
    if (n.LAT.length === 0 && n.ESP.length === 0 && n.SUB.length === 0) {
      let l = [...o.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];
      for (let a of l) {
        let s = a[1];
        s.startsWith("http") && (s.includes("youtube.com") || s.includes("googletagmanager") || i.has(s) || (i.add(s), n.LAT.push(s)));
      }
    }
    return n;
  });
}
function xe(t, o, n, i) {
  return p(this, null, function* () {
    if (!t || !o)
      return [];
    let r = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${o})${n ? ` S${n}E${i}` : ""}`);
    try {
      let c = yield we(t, o);
      if (!c)
        return [];
      let u = yield ye(c, o);
      if (!u)
        return [];
      let l = u;
      if (o === "tv" && n && i && (l = yield ve(u, n, i), !l))
        return [];
      let a = yield Re(l);
      console.log("[DeTodoPeliculas] Embeds encontrados:", JSON.stringify({ LAT: a.LAT.length, ESP: a.ESP.length, SUB: a.SUB.length }));
      for (let s of he) {
        let d = a[s];
        if (!d || d.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${d.length} embeds en ${A[s]}...`);
        let w = d.map((g) => p(this, null, function* () {
          let { resolver: y, serverName: R } = ge(g);
          if (!y)
            return null;
          try {
            let x = yield y(g);
            return x ? { name: "DeTodoPeliculas", title: `${x.quality || "Unknown"} \xB7 ${A[s]} \xB7 ${R}`, url: x.url, quality: x.quality || "Unknown", headers: x.headers || { "User-Agent": F, Referer: l } } : null;
          } catch (x) {
            return null;
          }
        })), f = (yield Promise.allSettled(w)).filter((g) => g.status === "fulfilled" && g.value !== null).map((g) => g.value);
        if (f.length > 0) {
          let g = ((Date.now() - r) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${f.length} streams encontrados en ${A[s]} (${g}s), omitiendo otros idiomas.`), f;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${A[s]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (c) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${c.message}`), [];
    }
  });
}
