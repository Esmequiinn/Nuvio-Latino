var V = Object.create;
var v = Object.defineProperty, q = Object.defineProperties, F = Object.getOwnPropertyDescriptor, H = Object.getOwnPropertyDescriptors, G = Object.getOwnPropertyNames, L = Object.getOwnPropertySymbols, z = Object.getPrototypeOf, k = Object.prototype.hasOwnProperty, K = Object.prototype.propertyIsEnumerable;
var b = (t, e, o) => e in t ? v(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, w = (t, e) => {
  for (var o in e || (e = {}))
    k.call(e, o) && b(t, o, e[o]);
  if (L)
    for (var o of L(e))
      K.call(e, o) && b(t, o, e[o]);
  return t;
}, U = (t, e) => q(t, H(e));
var X = (t, e) => {
  for (var o in e)
    v(t, o, { get: e[o], enumerable: true });
}, _ = (t, e, o, s) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of G(e))
      !k.call(t, r) && r !== o && v(t, r, { get: () => e[r], enumerable: !(s = F(e, r)) || s.enumerable });
  return t;
};
var Y = (t, e, o) => (o = t != null ? V(z(t)) : {}, _(e || !t || !t.__esModule ? v(o, "default", { value: t, enumerable: true }) : o, t)), J = (t) => _(v({}, "__esModule", { value: true }), t);
var p = (t, e, o) => new Promise((s, r) => {
  var i = (a) => {
    try {
      u(o.next(a));
    } catch (n) {
      r(n);
    }
  }, l = (a) => {
    try {
      u(o.throw(a));
    } catch (n) {
      r(n);
    }
  }, u = (a) => a.done ? s(a.value) : Promise.resolve(a.value).then(i, l);
  u((o = o.apply(t, e)).next());
});
var ge = {};
X(ge, { getStreams: () => he });
module.exports = J(ge);
var Q = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function Z(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function x(o) {
  return p(this, arguments, function* (t, e = {}) {
    try {
      let r = yield (yield fetch(t, { headers: w({ "User-Agent": Q }, e), redirect: "follow" })).text();
      if (!r.includes("#EXT-X-STREAM-INF")) {
        let a = t.match(/[_-](\d{3,4})p/);
        return a ? `${a[1]}p` : "1080p";
      }
      let i = 0, l = 0, u = r.split(`
`);
      for (let a of u) {
        let n = a.match(/RESOLUTION=(\d+)x(\d+)/);
        if (n) {
          let c = parseInt(n[1]), g = parseInt(n[2]);
          g > l && (l = g, i = c);
        }
      }
      return l > 0 ? Z(i, l) : "1080p";
    } catch (s) {
      return "1080p";
    }
  });
}
var ee = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function O(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function te(t, e) {
  try {
    let s = e.replace(/^\[|\]$/g, "").split("','").map((n) => n.replace(/^'+|'+$/g, "")).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), r = "";
    for (let n of t) {
      let c = n.charCodeAt(0);
      c > 64 && c < 91 ? c = (c - 52) % 26 + 65 : c > 96 && c < 123 && (c = (c - 84) % 26 + 97), r += String.fromCharCode(c);
    }
    for (let n of s)
      r = r.replace(new RegExp(n, "g"), "_");
    r = r.split("_").join("");
    let i = O(r);
    if (!i)
      return null;
    let l = "";
    for (let n = 0; n < i.length; n++)
      l += String.fromCharCode((i.charCodeAt(n) - 3 + 256) % 256);
    let u = l.split("").reverse().join(""), a = O(u);
    return a ? JSON.parse(a) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function E(o) {
  return p(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: w({ "User-Agent": ee, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function P(t) {
  return p(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let e = yield E(t, { Referer: t });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}`);
      let o = yield e.text();
      if (/permanentToken/i.test(o)) {
        let a = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (a) {
          console.log(`[VOE] Permanent token redirect -> ${a[1]}`);
          let n = yield E(a[1], { Referer: t });
          n.ok && (o = yield n.text());
        }
      }
      let s = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (s) {
        let a = s[1], n = s[2].startsWith("http") ? s[2] : new URL(s[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${n}`);
        let c = yield E(n, { Referer: t }), g = c.ok ? yield c.text() : "", m = g.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || g.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (m) {
          let d = te(a, m[1]);
          if (d && (d.source || d.direct_access_url)) {
            let f = d.source || d.direct_access_url, R = yield x(f, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${f.substring(0, 80)}...`), { url: f, quality: R, headers: { Referer: t } };
          }
        }
      }
      let r = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, i = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, l = [], u;
      for (; (u = r.exec(o)) !== null; )
        l.push(u);
      for (; (u = i.exec(o)) !== null; )
        l.push(u);
      for (let a of l) {
        let n = a[1];
        if (!n)
          continue;
        let c = n;
        if (c.startsWith("aHR0"))
          try {
            c = atob(c);
          } catch (g) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${c.substring(0, 80)}...`), { url: c, quality: yield x(c, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var C = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function D(t) {
  return p(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": C, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((n) => n.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let s = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], r = ["full", "hd", "sd", "low", "lowest"], i = s.map((n) => ({ type: n[1], url: n[2] })).filter((n) => !n.type.toLowerCase().includes("mobile") && n.url.startsWith("http"));
      if (i.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let u = i.sort((n, c) => {
        let g = r.findIndex((d) => n.type.toLowerCase().includes(d)), m = r.findIndex((d) => c.type.toLowerCase().includes(d));
        return (g === -1 ? 99 : g) - (m === -1 ? 99 : m);
      })[0];
      console.log(`[OkRu] URL encontrada (${u.type}): ${u.url.substring(0, 80)}...`);
      let a = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: u.url, quality: a[u.type] || u.type, headers: { "User-Agent": C, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var h = Y(require("crypto-js"));
var $ = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", W = h.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), I = h.default.enc.Hex.parse("313233343536373839306f6975797472");
function oe(t) {
  return h.default.AES.encrypt(JSON.stringify(t), W, { iv: I, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 }).ciphertext.toString(h.default.enc.Hex);
}
function ne(t) {
  let e = h.default.lib.CipherParams.create({ ciphertext: h.default.enc.Hex.parse(t) }), o = h.default.AES.decrypt(e, W, { iv: I, mode: h.default.mode.CBC, padding: h.default.pad.Pkcs7 });
  return JSON.parse(o.toString(h.default.enc.Utf8));
}
function N(t) {
  return p(this, null, function* () {
    try {
      let e = t.includes("/") ? t.split("/").pop().replace("#", "") : t, o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let r = (yield fetch(`${o}/api/v1/info?id=${e}`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/" } })).headers.get("set-cookie"), i = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: e, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, l = oe(i);
      yield fetch(`${o}/api/v1/player?t=${l}`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" } });
      let a = yield (yield fetch(`${o}/api/v1/video?id=${e}&w=1536&h=864&r=null`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: r || "" } })).text(), n = ne(a.trim()), c = "";
      if (n.source)
        c = n.source;
      else
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      return console.log(`[Gdtvid] URL final generada: ${c.substring(0, 80)}...`), { url: c, headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var se = "439c478a771f35c05022f9feabcca01c", M = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", S = { "User-Agent": M, Accept: "text/html,application/json" }, re = "https://detodopeliculas.nu", ae = { "voe.sx": P, "ok.ru": D, gdtvid: N }, ce = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, le = ["LAT", "ESP", "SUB"], A = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function T(o) {
  return p(this, arguments, function* (t, e = {}) {
    let s = yield fetch(t, { headers: w(w({}, S), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!s.ok)
      throw new Error(`HTTP ${s.status}`);
    return (s.headers.get("content-type") || "").includes("json") ? s.json() : s.text();
  });
}
function B(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function ie(t) {
  for (let [e, o] of Object.entries(ae))
    if (t.includes(e))
      return { resolver: o, serverName: ce[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function ue(t, e) {
  return p(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], s = /* @__PURE__ */ new Set(), r = "";
    for (let { lang: i } of o)
      try {
        let l = yield T(`https://api.themoviedb.org/3/${e}/${t}?api_key=${se}&language=${i}`), u = e === "movie" ? l.title : l.name, a = e === "movie" ? l.original_title : l.original_name;
        r || (r = (l.release_date || l.first_air_date || "").substring(0, 4)), u && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(u) && s.add(u), a && s.add(a);
      } catch (l) {
      }
    return s.size > 0 ? { titles: Array.from(s), year: r } : null;
  });
}
function de(t, e) {
  return p(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", s = /* @__PURE__ */ new Set();
    for (let r of t.titles)
      s.add(B(r, t.year)), s.add(B(r));
    for (let r of s) {
      let i = `${re}/${o}/${r}/`;
      try {
        if ((yield fetch(i, { headers: S, redirect: "follow" })).ok)
          return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${i}`), i;
      } catch (l) {
        continue;
      }
    }
    return null;
  });
}
function pe(t, e, o) {
  return p(this, null, function* () {
    try {
      let r = (yield T(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let i of r)
        if (i.includes(`>${e} - ${o}<`) || i.includes(`>${e}x${o}<`)) {
          let l = i.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (l)
            return l[1];
        }
    } catch (s) {
      return null;
    }
    return null;
  });
}
function fe(t) {
  return p(this, null, function* () {
    let e = yield T(t), o = { LAT: [], ESP: [], SUB: [] }, s = /* @__PURE__ */ new Set(), r = [...e.matchAll(/<li[^>]+id=["']player-option-[^"']+["'][^>]*data-post=["'](\d+)["'][^>]*data-nume=["']([^"']+)["'][^>]*>([\s\S]*?)<\/li>/gi)];
    for (let i of r) {
      let l = i[1], u = i[2], a = i[3].toLowerCase(), n = "SUB";
      a.includes("latino") || a.includes("lat.png") || a.includes("mx.png") ? n = "LAT" : (a.includes("castellano") || a.includes("espa\xF1ol") || a.includes("es.png")) && (n = "ESP");
      try {
        let c = new URLSearchParams({ action: "doo_player_ajax", post: l, nume: u, type: "movie" }), m = yield (yield fetch("https://detodopeliculas.nu/wp-admin/admin-ajax.php", { method: "POST", headers: U(w({}, S), { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: c })).json();
        if (!(m != null && m.embed_url))
          continue;
        let d = m.embed_url;
        !s.has(d) && d.startsWith("http") && (s.add(d), o[n].push(d));
      } catch (c) {
        console.log(`AJAX error: ${c.message}`);
      }
    }
    return o;
  });
}
function he(t, e, o, s) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    let r = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${s}` : ""}`);
    try {
      let i = yield ue(t, e);
      if (!i)
        return [];
      let l = yield de(i, e);
      if (!l)
        return [];
      let u = l;
      if (e === "tv" && o && s && (u = yield pe(l, o, s), !u))
        return [];
      let a = yield fe(u);
      for (let n of le) {
        let c = a[n];
        if (!c || c.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${c.length} embeds en ${A[n]}...`);
        let g = c.map((f) => p(this, null, function* () {
          let { resolver: R, serverName: j } = ie(f);
          if (!R)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${f}`), null;
          try {
            let y = yield R(f);
            return y ? { name: "DeTodoPeliculas", title: `${y.quality || "1080p"} \xB7 ${A[n]} \xB7 ${j}`, url: y.url, quality: y.quality || "1080p", headers: y.headers || { "User-Agent": M, Referer: u } } : null;
          } catch (y) {
            return null;
          }
        })), d = (yield Promise.allSettled(g)).filter((f) => f.status === "fulfilled" && f.value !== null).map((f) => f.value);
        if (d.length > 0) {
          let f = ((Date.now() - r) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${d.length} streams encontrados en ${A[n]} (${f}s), omitiendo otros idiomas.`), d;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${A[n]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (i) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${i.message}`), [];
    }
  });
}
