var z = Object.create;
var v = Object.defineProperty, K = Object.defineProperties, X = Object.getOwnPropertyDescriptor, Y = Object.getOwnPropertyDescriptors, Q = Object.getOwnPropertyNames, P = Object.getOwnPropertySymbols, Z = Object.getPrototypeOf, _ = Object.prototype.hasOwnProperty, ee = Object.prototype.propertyIsEnumerable;
var U = (t, e, o) => e in t ? v(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, R = (t, e) => {
  for (var o in e || (e = {}))
    _.call(e, o) && U(t, o, e[o]);
  if (P)
    for (var o of P(e))
      ee.call(e, o) && U(t, o, e[o]);
  return t;
}, D = (t, e) => K(t, Y(e));
var te = (t, e) => {
  for (var o in e)
    v(t, o, { get: e[o], enumerable: true });
}, C = (t, e, o, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of Q(e))
      !_.call(t, r) && r !== o && v(t, r, { get: () => e[r], enumerable: !(n = X(e, r)) || n.enumerable });
  return t;
};
var oe = (t, e, o) => (o = t != null ? z(Z(t)) : {}, C(e || !t || !t.__esModule ? v(o, "default", { value: t, enumerable: true }) : o, t)), ne = (t) => C(v({}, "__esModule", { value: true }), t);
var p = (t, e, o) => new Promise((n, r) => {
  var i = (a) => {
    try {
      c(o.next(a));
    } catch (s) {
      r(s);
    }
  }, l = (a) => {
    try {
      c(o.throw(a));
    } catch (s) {
      r(s);
    }
  }, c = (a) => a.done ? n(a.value) : Promise.resolve(a.value).then(i, l);
  c((o = o.apply(t, e)).next());
});
var $e = {};
te($e, { getStreams: () => Ae });
module.exports = ne($e);
var se = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function re(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function T(o) {
  return p(this, arguments, function* (t, e = {}) {
    try {
      let r = yield (yield fetch(t, { headers: R({ "User-Agent": se }, e), redirect: "follow" })).text();
      if (!r.includes("#EXT-X-STREAM-INF")) {
        let a = t.match(/[_-](\d{3,4})p/);
        return a ? `${a[1]}p` : "1080p";
      }
      let i = 0, l = 0, c = r.split(`
`);
      for (let a of c) {
        let s = a.match(/RESOLUTION=(\d+)x(\d+)/);
        if (s) {
          let u = parseInt(s[1]), f = parseInt(s[2]);
          f > l && (l = f, i = u);
        }
      }
      return l > 0 ? re(i, l) : "1080p";
    } catch (n) {
      return "1080p";
    }
  });
}
var ce = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function N(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function ae(t, e) {
  try {
    let n = e.replace(/^\[|\]$/g, "").split("','").map((s) => s.replace(/^'+|'+$/g, "")).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), r = "";
    for (let s of t) {
      let u = s.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), r += String.fromCharCode(u);
    }
    for (let s of n)
      r = r.replace(new RegExp(s, "g"), "_");
    r = r.split("_").join("");
    let i = N(r);
    if (!i)
      return null;
    let l = "";
    for (let s = 0; s < i.length; s++)
      l += String.fromCharCode((i.charCodeAt(s) - 3 + 256) % 256);
    let c = l.split("").reverse().join(""), a = N(c);
    return a ? JSON.parse(a) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function x(o) {
  return p(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: R({ "User-Agent": ce, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function W(t) {
  return p(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let e = yield x(t, { Referer: t });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}`);
      let o = yield e.text();
      if (/permanentToken/i.test(o)) {
        let a = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (a) {
          console.log(`[VOE] Permanent token redirect -> ${a[1]}`);
          let s = yield x(a[1], { Referer: t });
          s.ok && (o = yield s.text());
        }
      }
      let n = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (n) {
        let a = n[1], s = n[2].startsWith("http") ? n[2] : new URL(n[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${s}`);
        let u = yield x(s, { Referer: t }), f = u.ok ? yield u.text() : "", w = f.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || f.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (w) {
          let g = ae(a, w[1]);
          if (g && (g.source || g.direct_access_url)) {
            let d = g.source || g.direct_access_url, m = yield T(d, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${d.substring(0, 80)}...`), { url: d, quality: m, headers: { Referer: t } };
          }
        }
      }
      let r = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, i = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, l = [], c;
      for (; (c = r.exec(o)) !== null; )
        l.push(c);
      for (; (c = i.exec(o)) !== null; )
        l.push(c);
      for (let a of l) {
        let s = a[1];
        if (!s)
          continue;
        let u = s;
        if (u.startsWith("aHR0"))
          try {
            u = atob(u);
          } catch (f) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: yield T(u, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var B = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function I(t) {
  return p(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": B, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((s) => s.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let n = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], r = ["full", "hd", "sd", "low", "lowest"], i = n.map((s) => ({ type: s[1], url: s[2] })).filter((s) => !s.type.toLowerCase().includes("mobile") && s.url.startsWith("http"));
      if (i.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let c = i.sort((s, u) => {
        let f = r.findIndex((g) => s.type.toLowerCase().includes(g)), w = r.findIndex((g) => u.type.toLowerCase().includes(g));
        return (f === -1 ? 99 : f) - (w === -1 ? 99 : w);
      })[0];
      console.log(`[OkRu] URL encontrada (${c.type}): ${c.url.substring(0, 80)}...`);
      let a = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: c.url, quality: a[c.type] || c.type, headers: { "User-Agent": B, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var h = oe(require("crypto-js"));
var S = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", M = h.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), V = h.default.enc.Hex.parse("313233343536373839306f6975797472");
function le(t) {
  return h.default.AES.encrypt(JSON.stringify(t), M, { iv: V, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 }).ciphertext.toString(h.default.enc.Hex);
}
function ie(t) {
  let e = h.default.lib.CipherParams.create({ ciphertext: h.default.enc.Hex.parse(t) }), o = h.default.AES.decrypt(e, M, { iv: V, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 });
  return JSON.parse(o.toString(h.default.enc.Utf8));
}
function b(t) {
  return p(this, null, function* () {
    let e = t.body.getReader(), o = new TextDecoder(), n = "";
    for (; ; ) {
      let { done: r, value: i } = yield e.read();
      if (r)
        break;
      n += o.decode(i, { stream: true });
    }
    return n += o.decode(), n;
  });
}
function G(t) {
  return p(this, null, function* () {
    try {
      let e = t.includes("#") ? t.split("#").pop() : t.split("/").pop().replace("#", ""), o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let n = yield fetch(`${o}/api/v1/info?id=${e}`, { headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/" } }), r = n.headers.get("set-cookie");
      yield b(n);
      let i = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: e, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, l = le(i), c = yield fetch(`${o}/api/v1/player?t=${l}`, { headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" } });
      yield b(c);
      let a = yield fetch(`${o}/api/v1/video?id=${e}&w=1536&h=864&r=null`, { headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" } }), s = a.headers.get("content-type");
      console.log(`[Gdtvid - Debug] Content-Type recibido: ${s}`), console.log(`[Gdtvid - Debug] Estado de la respuesta: ${a.status}`);
      let u = yield b(a), f = ie(u.trim());
      if (!f.source)
        throw new Error("No se encontr\xF3 source en la respuesta");
      return console.log(`[Gdtvid] URL final: ${f.source.substring(0, 80)}...`), { url: f.source, headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var ue = "439c478a771f35c05022f9feabcca01c", H = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", L = { "User-Agent": H, Accept: "text/html,application/json" }, j = "https://detodopeliculas.nu", de = { "voe.sx": W, "ok.ru": I, gdtvid: G }, pe = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, fe = ["LAT", "ESP", "SUB"], E = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function k(o) {
  return p(this, arguments, function* (t, e = {}) {
    let n = yield fetch(t, { headers: R(R({}, L), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!n.ok)
      throw new Error(`HTTP ${n.status}`);
    return (n.headers.get("content-type") || "").includes("json") ? n.json() : n.text();
  });
}
function q(t, e = null) {
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
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], n = /* @__PURE__ */ new Set(), r = "";
    for (let { lang: i } of o)
      try {
        let l = yield k(`https://api.themoviedb.org/3/${e}/${t}?api_key=${ue}&language=${i}`), c = e === "movie" ? l.title : l.name, a = e === "movie" ? l.original_title : l.original_name;
        r || (r = (l.release_date || l.first_air_date || "").substring(0, 4)), c && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(c) && n.add(c), a && n.add(a);
      } catch (l) {
      }
    return n.size > 0 ? { titles: Array.from(n), year: r } : null;
  });
}
function ye(t, e) {
  return p(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", n = /* @__PURE__ */ new Set();
    for (let r of t.titles)
      n.add(q(r, t.year)), n.add(q(r));
    for (let r of n) {
      let i = `${j}/${o}/${r}/`;
      try {
        if ((yield fetch(i, { headers: L, redirect: "follow" })).ok)
          return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${i}`), i;
      } catch (l) {
        continue;
      }
    }
    return null;
  });
}
function we(t, e, o) {
  return p(this, null, function* () {
    try {
      let r = (yield k(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let i of r)
        if (i.includes(`>${e} - ${o}<`) || i.includes(`>${e}x${o}<`)) {
          let l = i.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (l)
            return l[1];
        }
    } catch (n) {
      return null;
    }
    return null;
  });
}
function Re(t) {
  return p(this, null, function* () {
    let e = yield k(t), o = { LAT: [], ESP: [], SUB: [] }, n = /* @__PURE__ */ new Set(), r = [...e.matchAll(/<li[^>]*class=["'][^"']*dooplay_player_option[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`[AJAX] opciones encontradas: ${r.length}`);
    for (let i of r) {
      let l = i[0], c = i[1].toLowerCase(), a = l.match(/data-post=["']([^"']+)["']/i), s = l.match(/data-nume=["']([^"']+)["']/i), u = l.match(/data-type=["']([^"']+)["']/i);
      if (!a || !s || !u)
        continue;
      let f = a[1], w = s[1], g = u[1], d = "SUB";
      c.includes("lat") || c.includes("latino") || c.includes("mx") ? d = "LAT" : (c.includes("cast") || c.includes("espa\xF1ol") || c.includes("es ")) && (d = "ESP");
      try {
        let m = new URLSearchParams();
        m.append("action", "doo_player_ajax"), m.append("post", f), m.append("nume", w), m.append("type", g);
        let y = yield (yield fetch(`${j}/wp-admin/admin-ajax.php`, { method: "POST", headers: D(R({}, L), { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: m.toString() })).text(), A;
        try {
          A = JSON.parse(y);
        } catch (ve) {
          console.log("[AJAX ERROR] Respuesta no JSON:", y.slice(0, 200));
          continue;
        }
        let F = A == null ? void 0 : A.embed_url, $ = he(F), J = A == null ? void 0 : A.type;
        if (!$ || J === "trailer" || !$.startsWith("http") || $.includes("youtube.com") || $.includes("googletagmanager"))
          continue;
        n.has($) || (n.add($), o[d].push($));
      } catch (m) {
        console.log("[AJAX ERROR]", m.message);
      }
    }
    if (o.LAT.length === 0 && o.ESP.length === 0 && o.SUB.length === 0) {
      let i = [...e.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];
      for (let l of i) {
        let c = l[1];
        c.startsWith("http") && (c.includes("youtube.com") || c.includes("googletagmanager") || n.has(c) || (n.add(c), o.LAT.push(c)));
      }
    }
    return o;
  });
}
function Ae(t, e, o, n) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    let r = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${n}` : ""}`);
    try {
      let i = yield me(t, e);
      if (!i)
        return [];
      let l = yield ye(i, e);
      if (!l)
        return [];
      let c = l;
      if (e === "tv" && o && n && (c = yield we(l, o, n), !c))
        return [];
      let a = yield Re(c);
      console.log("[DeTodoPeliculas] Embeds encontrados:", JSON.stringify({ LAT: a.LAT.length, ESP: a.ESP.length, SUB: a.SUB.length }));
      for (let s of fe) {
        let u = a[s];
        if (!u || u.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${u.length} embeds en ${E[s]}...`);
        let f = u.map((d) => p(this, null, function* () {
          let { resolver: m, serverName: O } = ge(d);
          if (!m)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${d}`), null;
          try {
            let y = yield m(d);
            return y ? { name: "DeTodoPeliculas", title: `${y.quality || "Unknown"} \xB7 ${E[s]} \xB7 ${O}`, url: y.url, quality: y.quality || "Unknown", headers: y.headers || { "User-Agent": H, Referer: c } } : null;
          } catch (y) {
            return null;
          }
        })), g = (yield Promise.allSettled(f)).filter((d) => d.status === "fulfilled" && d.value !== null).map((d) => d.value);
        if (g.length > 0) {
          let d = ((Date.now() - r) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${g.length} streams encontrados en ${E[s]} (${d}s), omitiendo otros idiomas.`), g;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${E[s]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (i) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${i.message}`), [];
    }
  });
}
