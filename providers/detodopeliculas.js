var G = Object.create;
var $ = Object.defineProperty, J = Object.defineProperties, z = Object.getOwnPropertyDescriptor, K = Object.getOwnPropertyDescriptors, X = Object.getOwnPropertyNames, k = Object.getOwnPropertySymbols, Y = Object.getPrototypeOf, U = Object.prototype.hasOwnProperty, Q = Object.prototype.propertyIsEnumerable;
var P = (t, e, o) => e in t ? $(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, A = (t, e) => {
  for (var o in e || (e = {}))
    U.call(e, o) && P(t, o, e[o]);
  if (k)
    for (var o of k(e))
      Q.call(e, o) && P(t, o, e[o]);
  return t;
}, _ = (t, e) => J(t, K(e));
var Z = (t, e) => {
  for (var o in e)
    $(t, o, { get: e[o], enumerable: true });
}, C = (t, e, o, s) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of X(e))
      !U.call(t, r) && r !== o && $(t, r, { get: () => e[r], enumerable: !(s = z(e, r)) || s.enumerable });
  return t;
};
var ee = (t, e, o) => (o = t != null ? G(Y(t)) : {}, C(e || !t || !t.__esModule ? $(o, "default", { value: t, enumerable: true }) : o, t)), te = (t) => C($({}, "__esModule", { value: true }), t);
var p = (t, e, o) => new Promise((s, r) => {
  var i = (l) => {
    try {
      c(o.next(l));
    } catch (n) {
      r(n);
    }
  }, a = (l) => {
    try {
      c(o.throw(l));
    } catch (n) {
      r(n);
    }
  }, c = (l) => l.done ? s(l.value) : Promise.resolve(l.value).then(i, a);
  c((o = o.apply(t, e)).next());
});
var we = {};
Z(we, { getStreams: () => ye });
module.exports = te(we);
var oe = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function ne(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function x(o) {
  return p(this, arguments, function* (t, e = {}) {
    try {
      let r = yield (yield fetch(t, { headers: A({ "User-Agent": oe }, e), redirect: "follow" })).text();
      if (!r.includes("#EXT-X-STREAM-INF")) {
        let l = t.match(/[_-](\d{3,4})p/);
        return l ? `${l[1]}p` : "1080p";
      }
      let i = 0, a = 0, c = r.split(`
`);
      for (let l of c) {
        let n = l.match(/RESOLUTION=(\d+)x(\d+)/);
        if (n) {
          let u = parseInt(n[1]), g = parseInt(n[2]);
          g > a && (a = g, i = u);
        }
      }
      return a > 0 ? ne(i, a) : "1080p";
    } catch (s) {
      return "1080p";
    }
  });
}
var se = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function D(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function re(t, e) {
  try {
    let s = e.replace(/^\[|\]$/g, "").split("','").map((n) => n.replace(/^'+|'+$/g, "")).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), r = "";
    for (let n of t) {
      let u = n.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), r += String.fromCharCode(u);
    }
    for (let n of s)
      r = r.replace(new RegExp(n, "g"), "_");
    r = r.split("_").join("");
    let i = D(r);
    if (!i)
      return null;
    let a = "";
    for (let n = 0; n < i.length; n++)
      a += String.fromCharCode((i.charCodeAt(n) - 3 + 256) % 256);
    let c = a.split("").reverse().join(""), l = D(c);
    return l ? JSON.parse(l) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function T(o) {
  return p(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: A({ "User-Agent": se, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
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
        let l = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (l) {
          console.log(`[VOE] Permanent token redirect -> ${l[1]}`);
          let n = yield T(l[1], { Referer: t });
          n.ok && (o = yield n.text());
        }
      }
      let s = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (s) {
        let l = s[1], n = s[2].startsWith("http") ? s[2] : new URL(s[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${n}`);
        let u = yield T(n, { Referer: t }), g = u.ok ? yield u.text() : "", R = g.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || g.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (R) {
          let f = re(l, R[1]);
          if (f && (f.source || f.direct_access_url)) {
            let d = f.source || f.direct_access_url, m = yield x(d, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${d.substring(0, 80)}...`), { url: d, quality: m, headers: { Referer: t } };
          }
        }
      }
      let r = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, i = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], c;
      for (; (c = r.exec(o)) !== null; )
        a.push(c);
      for (; (c = i.exec(o)) !== null; )
        a.push(c);
      for (let l of a) {
        let n = l[1];
        if (!n)
          continue;
        let u = n;
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
      let e = yield fetch(t, { headers: { "User-Agent": W, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((n) => n.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let s = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], r = ["full", "hd", "sd", "low", "lowest"], i = s.map((n) => ({ type: n[1], url: n[2] })).filter((n) => !n.type.toLowerCase().includes("mobile") && n.url.startsWith("http"));
      if (i.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let c = i.sort((n, u) => {
        let g = r.findIndex((f) => n.type.toLowerCase().includes(f)), R = r.findIndex((f) => u.type.toLowerCase().includes(f));
        return (g === -1 ? 99 : g) - (R === -1 ? 99 : R);
      })[0];
      console.log(`[OkRu] URL encontrada (${c.type}): ${c.url.substring(0, 80)}...`);
      let l = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: c.url, quality: l[c.type] || c.type, headers: { "User-Agent": W, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var h = ee(require("crypto-js"));
var S = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", I = h.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), M = h.default.enc.Hex.parse("313233343536373839306f6975797472");
function ce(t) {
  return h.default.AES.encrypt(JSON.stringify(t), I, { iv: M, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 }).ciphertext.toString(h.default.enc.Hex);
}
function ae(t) {
  let e = h.default.lib.CipherParams.create({ ciphertext: h.default.enc.Hex.parse(t) }), o = h.default.AES.decrypt(e, I, { iv: M, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 });
  return JSON.parse(o.toString(h.default.enc.Utf8));
}
function V(t) {
  return p(this, null, function* () {
    try {
      let e = t.includes("/") ? t.split("/").pop().replace("#", "") : t, o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let r = (yield fetch(`${o}/api/v1/info?id=${e}`, { headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/" } })).headers.get("set-cookie"), i = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: e, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, a = ce(i);
      yield fetch(`${o}/api/v1/player?t=${a}`, { headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" } });
      let l = yield (yield fetch(`${o}/api/v1/video?id=${e}&w=1536&h=864&r=null`, { headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" } })).text(), n = ae(l.trim()), u = "";
      if (n.source)
        u = n.source;
      else
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      return console.log(`[Gdtvid] URL final generada: ${u.substring(0, 80)}...`), { url: u, headers: { "User-Agent": S, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var le = "439c478a771f35c05022f9feabcca01c", H = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", L = { "User-Agent": H, Accept: "text/html,application/json" }, j = "https://detodopeliculas.nu", ie = { "voe.sx": N, "ok.ru": B, gdtvid: V }, ue = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, de = ["LAT", "ESP", "SUB"], E = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function b(o) {
  return p(this, arguments, function* (t, e = {}) {
    let s = yield fetch(t, { headers: A(A({}, L), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!s.ok)
      throw new Error(`HTTP ${s.status}`);
    return (s.headers.get("content-type") || "").includes("json") ? s.json() : s.text();
  });
}
function q(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function pe(t) {
  for (let [e, o] of Object.entries(ie))
    if (t.includes(e))
      return { resolver: o, serverName: ue[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function fe(t, e) {
  return p(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], s = /* @__PURE__ */ new Set(), r = "";
    for (let { lang: i } of o)
      try {
        let a = yield b(`https://api.themoviedb.org/3/${e}/${t}?api_key=${le}&language=${i}`), c = e === "movie" ? a.title : a.name, l = e === "movie" ? a.original_title : a.original_name;
        r || (r = (a.release_date || a.first_air_date || "").substring(0, 4)), c && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(c) && s.add(c), l && s.add(l);
      } catch (a) {
      }
    return s.size > 0 ? { titles: Array.from(s), year: r } : null;
  });
}
function ge(t, e) {
  return p(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", s = /* @__PURE__ */ new Set();
    for (let r of t.titles)
      s.add(q(r, t.year)), s.add(q(r));
    for (let r of s) {
      let i = `${j}/${o}/${r}/`;
      try {
        if ((yield fetch(i, { headers: L, redirect: "follow" })).ok)
          return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${i}`), i;
      } catch (a) {
        continue;
      }
    }
    return null;
  });
}
function he(t, e, o) {
  return p(this, null, function* () {
    try {
      let r = (yield b(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let i of r)
        if (i.includes(`>${e} - ${o}<`) || i.includes(`>${e}x${o}<`)) {
          let a = i.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (a)
            return a[1];
        }
    } catch (s) {
      return null;
    }
    return null;
  });
}
function me(t) {
  return p(this, null, function* () {
    let e = yield b(t), o = { LAT: [], ESP: [], SUB: [] }, s = /* @__PURE__ */ new Set(), r = [...e.matchAll(/<li[^>]*class=["'][^"']*dooplay_player_option[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`[AJAX] opciones encontradas: ${r.length}`);
    for (let i of r) {
      let a = i[0], c = i[1].toLowerCase(), l = a.match(/data-post=["']([^"']+)["']/i), n = a.match(/data-nume=["']([^"']+)["']/i), u = a.match(/data-type=["']([^"']+)["']/i);
      if (!l || !n || !u)
        continue;
      let g = l[1], R = n[1], f = u[1], d = "SUB";
      c.includes("lat") || c.includes("latino") || c.includes("mx") ? d = "LAT" : (c.includes("cast") || c.includes("espa\xF1ol") || c.includes("es ")) && (d = "ESP");
      try {
        let m = new URLSearchParams();
        m.append("action", "doo_player_ajax"), m.append("post", g), m.append("nume", R), m.append("type", f);
        let w = yield (yield fetch(`${j}/wp-admin/admin-ajax.php`, { method: "POST", headers: _(A({}, L), { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: m.toString() })).text(), y;
        try {
          y = JSON.parse(w);
        } catch (Re) {
          console.log("[AJAX ERROR] Respuesta no JSON:", w.slice(0, 200));
          continue;
        }
        let v = (y == null ? void 0 : y.embed_url) || (y == null ? void 0 : y.url), F = y == null ? void 0 : y.type;
        if (!v || F === "trailer" || !v.startsWith("http") || v.includes("youtube.com") || v.includes("googletagmanager"))
          continue;
        s.has(v) || (s.add(v), o[d].push(v));
      } catch (m) {
        console.log("[AJAX ERROR]", m.message);
      }
    }
    if (o.LAT.length === 0 && o.ESP.length === 0 && o.SUB.length === 0) {
      let i = [...e.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];
      for (let a of i) {
        let c = a[1];
        c.startsWith("http") && (c.includes("youtube.com") || c.includes("googletagmanager") || s.has(c) || (s.add(c), o.LAT.push(c)));
      }
    }
    return o;
  });
}
function ye(t, e, o, s) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    let r = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${s}` : ""}`);
    try {
      let i = yield fe(t, e);
      if (!i)
        return [];
      let a = yield ge(i, e);
      if (!a)
        return [];
      let c = a;
      if (e === "tv" && o && s && (c = yield he(a, o, s), !c))
        return [];
      let l = yield me(c);
      console.log("[DeTodoPeliculas] Embeds encontrados:", JSON.stringify({ LAT: l.LAT.length, ESP: l.ESP.length, SUB: l.SUB.length }));
      for (let n of de) {
        let u = l[n];
        if (!u || u.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${u.length} embeds en ${E[n]}...`);
        let g = u.map((d) => p(this, null, function* () {
          let { resolver: m, serverName: O } = pe(d);
          if (!m)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${d}`), null;
          try {
            let w = yield m(d);
            return w ? { name: "DeTodoPeliculas", title: `${w.quality || "1080p"} \xB7 ${E[n]} \xB7 ${O}`, url: w.url, quality: w.quality || "1080p", headers: w.headers || { "User-Agent": H, Referer: c } } : null;
          } catch (w) {
            return null;
          }
        })), f = (yield Promise.allSettled(g)).filter((d) => d.status === "fulfilled" && d.value !== null).map((d) => d.value);
        if (f.length > 0) {
          let d = ((Date.now() - r) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${f.length} streams encontrados en ${E[n]} (${d}s), omitiendo otros idiomas.`), f;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${E[n]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (i) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${i.message}`), [];
    }
  });
}
