var F = Object.create;
var A = Object.defineProperty, J = Object.defineProperties, z = Object.getOwnPropertyDescriptor, K = Object.getOwnPropertyDescriptors, Y = Object.getOwnPropertyNames, P = Object.getOwnPropertySymbols, Q = Object.getPrototypeOf, U = Object.prototype.hasOwnProperty, Z = Object.prototype.propertyIsEnumerable;
var O = (t, e, o) => e in t ? A(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, R = (t, e) => {
  for (var o in e || (e = {}))
    U.call(e, o) && O(t, o, e[o]);
  if (P)
    for (var o of P(e))
      Z.call(e, o) && O(t, o, e[o]);
  return t;
}, _ = (t, e) => J(t, K(e));
var ee = (t, e) => {
  for (var o in e)
    A(t, o, { get: e[o], enumerable: true });
}, C = (t, e, o, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of Y(e))
      !U.call(t, n) && n !== o && A(t, n, { get: () => e[n], enumerable: !(r = z(e, n)) || r.enumerable });
  return t;
};
var te = (t, e, o) => (o = t != null ? F(Q(t)) : {}, C(e || !t || !t.__esModule ? A(o, "default", { value: t, enumerable: true }) : o, t)), oe = (t) => C(A({}, "__esModule", { value: true }), t);
var p = (t, e, o) => new Promise((r, n) => {
  var l = (i) => {
    try {
      c(o.next(i));
    } catch (s) {
      n(s);
    }
  }, a = (i) => {
    try {
      c(o.throw(i));
    } catch (s) {
      n(s);
    }
  }, c = (i) => i.done ? r(i.value) : Promise.resolve(i.value).then(l, a);
  c((o = o.apply(t, e)).next());
});
var $e = {};
ee($e, { getStreams: () => ve });
module.exports = oe($e);
var ne = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function se(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function S(o) {
  return p(this, arguments, function* (t, e = {}) {
    try {
      let n = yield (yield fetch(t, { headers: R({ "User-Agent": ne }, e), redirect: "follow" })).text();
      if (!n.includes("#EXT-X-STREAM-INF")) {
        let i = t.match(/[_-](\d{3,4})p/);
        return i ? `${i[1]}p` : "1080p";
      }
      let l = 0, a = 0, c = n.split(`
`);
      for (let i of c) {
        let s = i.match(/RESOLUTION=(\d+)x(\d+)/);
        if (s) {
          let u = parseInt(s[1]), h = parseInt(s[2]);
          h > a && (a = h, l = u);
        }
      }
      return a > 0 ? se(l, a) : "1080p";
    } catch (r) {
      return "1080p";
    }
  });
}
var re = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function D(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function ce(t, e) {
  try {
    let r = e.replace(/^\[|\]$/g, "").split("','").map((s) => s.replace(/^'+|'+$/g, "")).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), n = "";
    for (let s of t) {
      let u = s.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), n += String.fromCharCode(u);
    }
    for (let s of r)
      n = n.replace(new RegExp(s, "g"), "_");
    n = n.split("_").join("");
    let l = D(n);
    if (!l)
      return null;
    let a = "";
    for (let s = 0; s < l.length; s++)
      a += String.fromCharCode((l.charCodeAt(s) - 3 + 256) % 256);
    let c = a.split("").reverse().join(""), i = D(c);
    return i ? JSON.parse(i) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function x(o) {
  return p(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: R({ "User-Agent": re, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function M(t) {
  return p(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let e = yield x(t, { Referer: t });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}`);
      let o = yield e.text();
      if (/permanentToken/i.test(o)) {
        let i = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (i) {
          console.log(`[VOE] Permanent token redirect -> ${i[1]}`);
          let s = yield x(i[1], { Referer: t });
          s.ok && (o = yield s.text());
        }
      }
      let r = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (r) {
        let i = r[1], s = r[2].startsWith("http") ? r[2] : new URL(r[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${s}`);
        let u = yield x(s, { Referer: t }), h = u.ok ? yield u.text() : "", w = h.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || h.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (w) {
          let f = ce(i, w[1]);
          if (f && (f.source || f.direct_access_url)) {
            let d = f.source || f.direct_access_url, m = yield S(d, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${d.substring(0, 80)}...`), { url: d, quality: m, headers: { Referer: t } };
          }
        }
      }
      let n = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, l = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], c;
      for (; (c = n.exec(o)) !== null; )
        a.push(c);
      for (; (c = l.exec(o)) !== null; )
        a.push(c);
      for (let i of a) {
        let s = i[1];
        if (!s)
          continue;
        let u = s;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (h) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: yield S(u, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var W = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function H(t) {
  return p(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": W, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((s) => s.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let r = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], n = ["full", "hd", "sd", "low", "lowest"], l = r.map((s) => ({ type: s[1], url: s[2] })).filter((s) => !s.type.toLowerCase().includes("mobile") && s.url.startsWith("http"));
      if (l.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let c = l.sort((s, u) => {
        let h = n.findIndex((f) => s.type.toLowerCase().includes(f)), w = n.findIndex((f) => u.type.toLowerCase().includes(f));
        return (h === -1 ? 99 : h) - (w === -1 ? 99 : w);
      })[0];
      console.log(`[OkRu] URL encontrada (${c.type}): ${c.url.substring(0, 80)}...`);
      let i = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: c.url, quality: i[c.type] || c.type, headers: { "User-Agent": W, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var g = te(require("crypto-js"));
var T = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", N = g.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), B = g.default.enc.Hex.parse("313233343536373839306f6975797472");
function ae(t) {
  return g.default.AES.encrypt(JSON.stringify(t), N, { iv: B, mode: g.default.mode.CBC, padding: g.default.pad.Pkcs7 }).ciphertext.toString(g.default.enc.Hex);
}
function le(t) {
  let e = g.default.lib.CipherParams.create({ ciphertext: g.default.enc.Hex.parse(t) }), o = g.default.AES.decrypt(e, N, { iv: B, mode: g.default.mode.CBC, padding: g.default.pad.Pkcs7 });
  return JSON.parse(o.toString(g.default.enc.Utf8));
}
function ie(t, e) {
  return typeof XMLHttpRequest != "undefined" ? new Promise((o, r) => {
    let n = new XMLHttpRequest();
    n.open("GET", t), n.responseType = "text";
    for (let [l, a] of Object.entries(e))
      n.setRequestHeader(l, a);
    n.onload = () => {
      if (n.status >= 200 && n.status < 300) {
        let l = n.getResponseHeader("content-type") || "";
        console.log(`[Gdtvid - XHR] Content-Type del servidor: ${l}`), o(n.responseText);
      } else
        r(new Error(`HTTP ${n.status}`));
    }, n.onerror = () => r(new Error("XHR network error")), n.send();
  }) : fetch(t, { headers: e }).then((o) => {
    if (!o.ok)
      throw new Error(`HTTP ${o.status}`);
    let r = o.headers.get("content-type") || "";
    return console.log(`[Gdtvid - Fetch] Content-Type del servidor: ${r}`), o.text();
  });
}
function I(t) {
  return p(this, null, function* () {
    try {
      let e = t.includes("/") ? t.split("/").pop().replace("#", "") : t, o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let n = (yield fetch(`${o}/api/v1/info?id=${e}`, { headers: { "User-Agent": T, Referer: "https://gdtvid.p2pplay.pro/", Accept: "application/json, text/plain, */*", "X-Requested-With": "XMLHttpRequest" } })).headers.get("set-cookie"), l = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: e, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, a = ae(l);
      yield fetch(`${o}/api/v1/player?t=${a}`, { headers: { "User-Agent": T, Referer: "https://gdtvid.p2pplay.pro/", Cookie: n || "" } });
      let c = yield ie(`${o}/api/v1/video?id=${e}&w=1536&h=864&r=null`, { "User-Agent": T, Referer: "https://gdtvid.p2pplay.pro/", Cookie: n || "" }), i = le(c.trim()), s = "";
      if (i.source)
        s = i.source;
      else
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      return console.log(`[Gdtvid] URL final generada: ${s.substring(0, 80)}...`), { url: s, headers: { "User-Agent": T, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var ue = "439c478a771f35c05022f9feabcca01c", G = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", L = { "User-Agent": G, Accept: "text/html,application/json" }, V = "https://detodopeliculas.nu", de = { "voe.sx": M, "ok.ru": H, gdtvid: I }, pe = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, fe = ["LAT", "ESP", "SUB"], E = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function b(o) {
  return p(this, arguments, function* (t, e = {}) {
    let r = yield fetch(t, { headers: R(R({}, L), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    return (r.headers.get("content-type") || "").includes("json") ? r.json() : r.text();
  });
}
function q(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function he(t) {
  for (let [e, o] of Object.entries(de))
    if (t.includes(e))
      return { resolver: o, serverName: pe[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function ge(t) {
  if (!t)
    return null;
  let e = t.match(/src=["']([^"']+)["']/i);
  return e ? e[1] : t;
}
function me(t, e) {
  return p(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], r = /* @__PURE__ */ new Set(), n = "";
    for (let { lang: l } of o)
      try {
        let a = yield b(`https://api.themoviedb.org/3/${e}/${t}?api_key=${ue}&language=${l}`), c = e === "movie" ? a.title : a.name, i = e === "movie" ? a.original_title : a.original_name;
        n || (n = (a.release_date || a.first_air_date || "").substring(0, 4)), c && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(c) && r.add(c), i && r.add(i);
      } catch (a) {
      }
    return r.size > 0 ? { titles: Array.from(r), year: n } : null;
  });
}
function ye(t, e) {
  return p(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", r = /* @__PURE__ */ new Set();
    for (let n of t.titles)
      r.add(q(n, t.year)), r.add(q(n));
    for (let n of r) {
      let l = `${V}/${o}/${n}/`;
      try {
        if ((yield fetch(l, { headers: L, redirect: "follow" })).ok)
          return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${l}`), l;
      } catch (a) {
        continue;
      }
    }
    return null;
  });
}
function we(t, e, o) {
  return p(this, null, function* () {
    try {
      let n = (yield b(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let l of n)
        if (l.includes(`>${e} - ${o}<`) || l.includes(`>${e}x${o}<`)) {
          let a = l.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (a)
            return a[1];
        }
    } catch (r) {
      return null;
    }
    return null;
  });
}
function Re(t) {
  return p(this, null, function* () {
    let e = yield b(t), o = { LAT: [], ESP: [], SUB: [] }, r = /* @__PURE__ */ new Set(), n = [...e.matchAll(/<li[^>]*class=["'][^"']*dooplay_player_option[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`[AJAX] opciones encontradas: ${n.length}`);
    for (let l of n) {
      let a = l[0], c = l[1].toLowerCase(), i = a.match(/data-post=["']([^"']+)["']/i), s = a.match(/data-nume=["']([^"']+)["']/i), u = a.match(/data-type=["']([^"']+)["']/i);
      if (!i || !s || !u)
        continue;
      let h = i[1], w = s[1], f = u[1], d = "SUB";
      c.includes("lat") || c.includes("latino") || c.includes("mx") ? d = "LAT" : (c.includes("cast") || c.includes("espa\xF1ol") || c.includes("es ")) && (d = "ESP");
      try {
        let m = new URLSearchParams();
        m.append("action", "doo_player_ajax"), m.append("post", h), m.append("nume", w), m.append("type", f);
        let y = yield (yield fetch(`${V}/wp-admin/admin-ajax.php`, { method: "POST", headers: _(R({}, L), { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: m.toString() })).text(), v;
        try {
          v = JSON.parse(y);
        } catch (Ae) {
          console.log("[AJAX ERROR] Respuesta no JSON:", y.slice(0, 200));
          continue;
        }
        let X = v == null ? void 0 : v.embed_url, $ = ge(X), j = v == null ? void 0 : v.type;
        if (!$ || j === "trailer" || !$.startsWith("http") || $.includes("youtube.com") || $.includes("googletagmanager"))
          continue;
        r.has($) || (r.add($), o[d].push($));
      } catch (m) {
        console.log("[AJAX ERROR]", m.message);
      }
    }
    if (o.LAT.length === 0 && o.ESP.length === 0 && o.SUB.length === 0) {
      let l = [...e.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];
      for (let a of l) {
        let c = a[1];
        c.startsWith("http") && (c.includes("youtube.com") || c.includes("googletagmanager") || r.has(c) || (r.add(c), o.LAT.push(c)));
      }
    }
    return o;
  });
}
function ve(t, e, o, r) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    let n = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${r}` : ""}`);
    try {
      let l = yield me(t, e);
      if (!l)
        return [];
      let a = yield ye(l, e);
      if (!a)
        return [];
      let c = a;
      if (e === "tv" && o && r && (c = yield we(a, o, r), !c))
        return [];
      let i = yield Re(c);
      console.log("[DeTodoPeliculas] Embeds encontrados:", JSON.stringify({ LAT: i.LAT.length, ESP: i.ESP.length, SUB: i.SUB.length }));
      for (let s of fe) {
        let u = i[s];
        if (!u || u.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${u.length} embeds en ${E[s]}...`);
        let h = u.map((d) => p(this, null, function* () {
          let { resolver: m, serverName: k } = he(d);
          if (!m)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${d}`), null;
          try {
            let y = yield m(d);
            return y ? { name: "DeTodoPeliculas", title: `${y.quality || "Unknown"} \xB7 ${E[s]} \xB7 ${k}`, url: y.url, quality: y.quality || "Unknown", headers: y.headers || { "User-Agent": G, Referer: c } } : null;
          } catch (y) {
            return null;
          }
        })), f = (yield Promise.allSettled(h)).filter((d) => d.status === "fulfilled" && d.value !== null).map((d) => d.value);
        if (f.length > 0) {
          let d = ((Date.now() - n) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${f.length} streams encontrados en ${E[s]} (${d}s), omitiendo otros idiomas.`), f;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${E[s]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (l) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${l.message}`), [];
    }
  });
}
