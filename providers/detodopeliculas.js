var J = Object.create;
var v = Object.defineProperty, z = Object.defineProperties, K = Object.getOwnPropertyDescriptor, Y = Object.getOwnPropertyDescriptors, Q = Object.getOwnPropertyNames, O = Object.getOwnPropertySymbols, Z = Object.getPrototypeOf, _ = Object.prototype.hasOwnProperty, ee = Object.prototype.propertyIsEnumerable;
var U = (t, e, o) => e in t ? v(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, R = (t, e) => {
  for (var o in e || (e = {}))
    _.call(e, o) && U(t, o, e[o]);
  if (O)
    for (var o of O(e))
      ee.call(e, o) && U(t, o, e[o]);
  return t;
}, D = (t, e) => z(t, Y(e));
var te = (t, e) => {
  for (var o in e)
    v(t, o, { get: e[o], enumerable: true });
}, C = (t, e, o, s) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of Q(e))
      !_.call(t, n) && n !== o && v(t, n, { get: () => e[n], enumerable: !(s = K(e, n)) || s.enumerable });
  return t;
};
var oe = (t, e, o) => (o = t != null ? J(Z(t)) : {}, C(e || !t || !t.__esModule ? v(o, "default", { value: t, enumerable: true }) : o, t)), ne = (t) => C(v({}, "__esModule", { value: true }), t);
var p = (t, e, o) => new Promise((s, n) => {
  var l = (i) => {
    try {
      c(o.next(i));
    } catch (r) {
      n(r);
    }
  }, a = (i) => {
    try {
      c(o.throw(i));
    } catch (r) {
      n(r);
    }
  }, c = (i) => i.done ? s(i.value) : Promise.resolve(i.value).then(l, a);
  c((o = o.apply(t, e)).next());
});
var $e = {};
te($e, { getStreams: () => Ae });
module.exports = ne($e);
var se = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function re(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function x(o) {
  return p(this, arguments, function* (t, e = {}) {
    try {
      let n = yield (yield fetch(t, { headers: R({ "User-Agent": se }, e), redirect: "follow" })).text();
      if (!n.includes("#EXT-X-STREAM-INF")) {
        let i = t.match(/[_-](\d{3,4})p/);
        return i ? `${i[1]}p` : "1080p";
      }
      let l = 0, a = 0, c = n.split(`
`);
      for (let i of c) {
        let r = i.match(/RESOLUTION=(\d+)x(\d+)/);
        if (r) {
          let u = parseInt(r[1]), g = parseInt(r[2]);
          g > a && (a = g, l = u);
        }
      }
      return a > 0 ? re(l, a) : "1080p";
    } catch (s) {
      return "1080p";
    }
  });
}
var ce = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function M(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function ae(t, e) {
  try {
    let s = e.replace(/^\[|\]$/g, "").split("','").map((r) => r.replace(/^'+|'+$/g, "")).map((r) => r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), n = "";
    for (let r of t) {
      let u = r.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), n += String.fromCharCode(u);
    }
    for (let r of s)
      n = n.replace(new RegExp(r, "g"), "_");
    n = n.split("_").join("");
    let l = M(n);
    if (!l)
      return null;
    let a = "";
    for (let r = 0; r < l.length; r++)
      a += String.fromCharCode((l.charCodeAt(r) - 3 + 256) % 256);
    let c = a.split("").reverse().join(""), i = M(c);
    return i ? JSON.parse(i) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function T(o) {
  return p(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: R({ "User-Agent": ce, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function N(t) {
  return p(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let e = yield T(t, { Referer: t });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}`);
      let o = yield e.text();
      if (/permanentToken/i.test(o)) {
        let i = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (i) {
          console.log(`[VOE] Permanent token redirect -> ${i[1]}`);
          let r = yield T(i[1], { Referer: t });
          r.ok && (o = yield r.text());
        }
      }
      let s = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (s) {
        let i = s[1], r = s[2].startsWith("http") ? s[2] : new URL(s[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${r}`);
        let u = yield T(r, { Referer: t }), g = u.ok ? yield u.text() : "", w = g.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || g.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (w) {
          let f = ae(i, w[1]);
          if (f && (f.source || f.direct_access_url)) {
            let d = f.source || f.direct_access_url, m = yield x(d, { Referer: t });
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
        let r = i[1];
        if (!r)
          continue;
        let u = r;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (g) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: yield x(u, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var W = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function B(t) {
  return p(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": W, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((r) => r.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let s = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], n = ["full", "hd", "sd", "low", "lowest"], l = s.map((r) => ({ type: r[1], url: r[2] })).filter((r) => !r.type.toLowerCase().includes("mobile") && r.url.startsWith("http"));
      if (l.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let c = l.sort((r, u) => {
        let g = n.findIndex((f) => r.type.toLowerCase().includes(f)), w = n.findIndex((f) => u.type.toLowerCase().includes(f));
        return (g === -1 ? 99 : g) - (w === -1 ? 99 : w);
      })[0];
      console.log(`[OkRu] URL encontrada (${c.type}): ${c.url.substring(0, 80)}...`);
      let i = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: c.url, quality: i[c.type] || c.type, headers: { "User-Agent": W, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var h = oe(require("crypto-js"));
var E = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", I = h.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), H = h.default.enc.Hex.parse("313233343536373839306f6975797472");
function ie(t) {
  return h.default.AES.encrypt(JSON.stringify(t), I, { iv: H, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 }).ciphertext.toString(h.default.enc.Hex);
}
function le(t) {
  let e = h.default.lib.CipherParams.create({ ciphertext: h.default.enc.Hex.parse(t) }), o = h.default.AES.decrypt(e, I, { iv: H, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 });
  return JSON.parse(o.toString(h.default.enc.Utf8));
}
function k(t, e) {
  return p(this, null, function* () {
    if (typeof XMLHttpRequest != "undefined")
      return new Promise((o, s) => {
        let n = new XMLHttpRequest();
        n.open("GET", t), n.responseType = "text";
        for (let [l, a] of Object.entries(e))
          n.setRequestHeader(l, a);
        n.onload = () => {
          if (n.status >= 200 && n.status < 300) {
            let l = n.getResponseHeader("set-cookie") || "";
            o({ text: n.responseText, cookie: l });
          } else
            s(new Error(`HTTP ${n.status}`));
        }, n.onerror = () => s(new Error("XHR network error")), n.send();
      });
    {
      let o = yield fetch(t, { headers: e });
      if (!o.ok)
        throw new Error(`HTTP ${o.status}`);
      let s = o.headers.get("set-cookie") || "";
      return { text: yield o.text(), cookie: s };
    }
  });
}
function q(t) {
  return p(this, null, function* () {
    try {
      let e = t.includes("/") ? t.split("/").pop().replace("#", "") : t, o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let n = (yield k(`${o}/api/v1/info?id=${e}`, { "User-Agent": E, Referer: "https://gdtvid.p2pplay.pro/" })).cookie, l = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: e, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, a = ie(l);
      yield k(`${o}/api/v1/player?t=${a}`, { "User-Agent": E, Referer: "https://gdtvid.p2pplay.pro/", Cookie: n || "" });
      let c = yield k(`${o}/api/v1/video?id=${e}&w=1536&h=864&r=null`, { "User-Agent": E, Referer: "https://gdtvid.p2pplay.pro/", Cookie: n || "" }), i = le(c.text.trim());
      if (!i.source)
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      return console.log(`[Gdtvid] URL final generada: ${i.source.substring(0, 80)}...`), { url: i.source, headers: { "User-Agent": E, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var ue = "439c478a771f35c05022f9feabcca01c", F = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", L = { "User-Agent": F, Accept: "text/html,application/json" }, G = "https://detodopeliculas.nu", de = { "voe.sx": N, "ok.ru": B, gdtvid: q }, pe = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, fe = ["LAT", "ESP", "SUB"], S = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function b(o) {
  return p(this, arguments, function* (t, e = {}) {
    let s = yield fetch(t, { headers: R(R({}, L), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!s.ok)
      throw new Error(`HTTP ${s.status}`);
    return (s.headers.get("content-type") || "").includes("json") ? s.json() : s.text();
  });
}
function V(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function ge(t) {
  for (let [e, o] of Object.entries(de))
    if (t.includes(e))
      return { resolver: o, serverName: pe[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function he(t) {
  if (!t)
    return null;
  let e = t.match(/src=["']([^"']+)["']/i);
  return e ? e[1] : t;
}
function me(t, e) {
  return p(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], s = /* @__PURE__ */ new Set(), n = "";
    for (let { lang: l } of o)
      try {
        let a = yield b(`https://api.themoviedb.org/3/${e}/${t}?api_key=${ue}&language=${l}`), c = e === "movie" ? a.title : a.name, i = e === "movie" ? a.original_title : a.original_name;
        n || (n = (a.release_date || a.first_air_date || "").substring(0, 4)), c && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(c) && s.add(c), i && s.add(i);
      } catch (a) {
      }
    return s.size > 0 ? { titles: Array.from(s), year: n } : null;
  });
}
function ye(t, e) {
  return p(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", s = /* @__PURE__ */ new Set();
    for (let n of t.titles)
      s.add(V(n, t.year)), s.add(V(n));
    for (let n of s) {
      let l = `${G}/${o}/${n}/`;
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
    } catch (s) {
      return null;
    }
    return null;
  });
}
function Re(t) {
  return p(this, null, function* () {
    let e = yield b(t), o = { LAT: [], ESP: [], SUB: [] }, s = /* @__PURE__ */ new Set(), n = [...e.matchAll(/<li[^>]*class=["'][^"']*dooplay_player_option[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`[AJAX] opciones encontradas: ${n.length}`);
    for (let l of n) {
      let a = l[0], c = l[1].toLowerCase(), i = a.match(/data-post=["']([^"']+)["']/i), r = a.match(/data-nume=["']([^"']+)["']/i), u = a.match(/data-type=["']([^"']+)["']/i);
      if (!i || !r || !u)
        continue;
      let g = i[1], w = r[1], f = u[1], d = "SUB";
      c.includes("lat") || c.includes("latino") || c.includes("mx") ? d = "LAT" : (c.includes("cast") || c.includes("espa\xF1ol") || c.includes("es ")) && (d = "ESP");
      try {
        let m = new URLSearchParams();
        m.append("action", "doo_player_ajax"), m.append("post", g), m.append("nume", w), m.append("type", f);
        let y = yield (yield fetch(`${G}/wp-admin/admin-ajax.php`, { method: "POST", headers: D(R({}, L), { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: m.toString() })).text(), A;
        try {
          A = JSON.parse(y);
        } catch (ve) {
          console.log("[AJAX ERROR] Respuesta no JSON:", y.slice(0, 200));
          continue;
        }
        let j = A == null ? void 0 : A.embed_url, $ = he(j), X = A == null ? void 0 : A.type;
        if (!$ || X === "trailer" || !$.startsWith("http") || $.includes("youtube.com") || $.includes("googletagmanager"))
          continue;
        s.has($) || (s.add($), o[d].push($));
      } catch (m) {
        console.log("[AJAX ERROR]", m.message);
      }
    }
    if (o.LAT.length === 0 && o.ESP.length === 0 && o.SUB.length === 0) {
      let l = [...e.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];
      for (let a of l) {
        let c = a[1];
        c.startsWith("http") && (c.includes("youtube.com") || c.includes("googletagmanager") || s.has(c) || (s.add(c), o.LAT.push(c)));
      }
    }
    return o;
  });
}
function Ae(t, e, o, s) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    let n = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${s}` : ""}`);
    try {
      let l = yield me(t, e);
      if (!l)
        return [];
      let a = yield ye(l, e);
      if (!a)
        return [];
      let c = a;
      if (e === "tv" && o && s && (c = yield we(a, o, s), !c))
        return [];
      let i = yield Re(c);
      console.log("[DeTodoPeliculas] Embeds encontrados:", JSON.stringify({ LAT: i.LAT.length, ESP: i.ESP.length, SUB: i.SUB.length }));
      for (let r of fe) {
        let u = i[r];
        if (!u || u.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${u.length} embeds en ${S[r]}...`);
        let g = u.map((d) => p(this, null, function* () {
          let { resolver: m, serverName: P } = ge(d);
          if (!m)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${d}`), null;
          try {
            let y = yield m(d);
            return y ? { name: "DeTodoPeliculas", title: `${y.quality || "Unknown"} \xB7 ${S[r]} \xB7 ${P}`, url: y.url, quality: y.quality || "Unknown", headers: y.headers || { "User-Agent": F, Referer: c } } : null;
          } catch (y) {
            return null;
          }
        })), f = (yield Promise.allSettled(g)).filter((d) => d.status === "fulfilled" && d.value !== null).map((d) => d.value);
        if (f.length > 0) {
          let d = ((Date.now() - n) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${f.length} streams encontrados en ${S[r]} (${d}s), omitiendo otros idiomas.`), f;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${S[r]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (l) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${l.message}`), [];
    }
  });
}
