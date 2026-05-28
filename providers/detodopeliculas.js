var F = Object.create;
var R = Object.defineProperty, H = Object.defineProperties, G = Object.getOwnPropertyDescriptor, z = Object.getOwnPropertyDescriptors, K = Object.getOwnPropertyNames, b = Object.getOwnPropertySymbols, X = Object.getPrototypeOf, U = Object.prototype.hasOwnProperty, Y = Object.prototype.propertyIsEnumerable;
var P = (t, e, o) => e in t ? R(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, m = (t, e) => {
  for (var o in e || (e = {}))
    U.call(e, o) && P(t, o, e[o]);
  if (b)
    for (var o of b(e))
      Y.call(e, o) && P(t, o, e[o]);
  return t;
}, k = (t, e) => H(t, z(e));
var J = (t, e) => {
  for (var o in e)
    R(t, o, { get: e[o], enumerable: true });
}, _ = (t, e, o, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of K(e))
      !U.call(t, s) && s !== o && R(t, s, { get: () => e[s], enumerable: !(r = G(e, s)) || r.enumerable });
  return t;
};
var Q = (t, e, o) => (o = t != null ? F(X(t)) : {}, _(e || !t || !t.__esModule ? R(o, "default", { value: t, enumerable: true }) : o, t)), Z = (t) => _(R({}, "__esModule", { value: true }), t);
var d = (t, e, o) => new Promise((r, s) => {
  var c = (i) => {
    try {
      u(o.next(i));
    } catch (n) {
      s(n);
    }
  }, a = (i) => {
    try {
      u(o.throw(i));
    } catch (n) {
      s(n);
    }
  }, u = (i) => i.done ? r(i.value) : Promise.resolve(i.value).then(c, a);
  u((o = o.apply(t, e)).next());
});
var ye = {};
J(ye, { getStreams: () => me });
module.exports = Z(ye);
var ee = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function te(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function x(o) {
  return d(this, arguments, function* (t, e = {}) {
    try {
      let s = yield (yield fetch(t, { headers: m({ "User-Agent": ee }, e), redirect: "follow" })).text();
      if (!s.includes("#EXT-X-STREAM-INF")) {
        let i = t.match(/[_-](\d{3,4})p/);
        return i ? `${i[1]}p` : "1080p";
      }
      let c = 0, a = 0, u = s.split(`
`);
      for (let i of u) {
        let n = i.match(/RESOLUTION=(\d+)x(\d+)/);
        if (n) {
          let l = parseInt(n[1]), h = parseInt(n[2]);
          h > a && (a = h, c = l);
        }
      }
      return a > 0 ? te(c, a) : "1080p";
    } catch (r) {
      return "1080p";
    }
  });
}
var oe = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function O(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function ne(t, e) {
  try {
    let r = e.replace(/^\[|\]$/g, "").split("','").map((n) => n.replace(/^'+|'+$/g, "")).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), s = "";
    for (let n of t) {
      let l = n.charCodeAt(0);
      l > 64 && l < 91 ? l = (l - 52) % 26 + 65 : l > 96 && l < 123 && (l = (l - 84) % 26 + 97), s += String.fromCharCode(l);
    }
    for (let n of r)
      s = s.replace(new RegExp(n, "g"), "_");
    s = s.split("_").join("");
    let c = O(s);
    if (!c)
      return null;
    let a = "";
    for (let n = 0; n < c.length; n++)
      a += String.fromCharCode((c.charCodeAt(n) - 3 + 256) % 256);
    let u = a.split("").reverse().join(""), i = O(u);
    return i ? JSON.parse(i) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function E(o) {
  return d(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: m({ "User-Agent": oe, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function C(t) {
  return d(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let e = yield E(t, { Referer: t });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}`);
      let o = yield e.text();
      if (/permanentToken/i.test(o)) {
        let i = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (i) {
          console.log(`[VOE] Permanent token redirect -> ${i[1]}`);
          let n = yield E(i[1], { Referer: t });
          n.ok && (o = yield n.text());
        }
      }
      let r = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (r) {
        let i = r[1], n = r[2].startsWith("http") ? r[2] : new URL(r[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${n}`);
        let l = yield E(n, { Referer: t }), h = l.ok ? yield l.text() : "", y = h.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || h.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (y) {
          let p = ne(i, y[1]);
          if (p && (p.source || p.direct_access_url)) {
            let f = p.source || p.direct_access_url, v = yield x(f, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${f.substring(0, 80)}...`), { url: f, quality: v, headers: { Referer: t } };
          }
        }
      }
      let s = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, c = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], u;
      for (; (u = s.exec(o)) !== null; )
        a.push(u);
      for (; (u = c.exec(o)) !== null; )
        a.push(u);
      for (let i of a) {
        let n = i[1];
        if (!n)
          continue;
        let l = n;
        if (l.startsWith("aHR0"))
          try {
            l = atob(l);
          } catch (h) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${l.substring(0, 80)}...`), { url: l, quality: yield x(l, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var D = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function W(t) {
  return d(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": D, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((n) => n.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let r = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], s = ["full", "hd", "sd", "low", "lowest"], c = r.map((n) => ({ type: n[1], url: n[2] })).filter((n) => !n.type.toLowerCase().includes("mobile") && n.url.startsWith("http"));
      if (c.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let u = c.sort((n, l) => {
        let h = s.findIndex((p) => n.type.toLowerCase().includes(p)), y = s.findIndex((p) => l.type.toLowerCase().includes(p));
        return (h === -1 ? 99 : h) - (y === -1 ? 99 : y);
      })[0];
      console.log(`[OkRu] URL encontrada (${u.type}): ${u.url.substring(0, 80)}...`);
      let i = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: u.url, quality: i[u.type] || u.type, headers: { "User-Agent": D, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var g = Q(require("crypto-js"));
var $ = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", I = g.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), N = g.default.enc.Hex.parse("313233343536373839306f6975797472");
function re(t) {
  return g.default.AES.encrypt(JSON.stringify(t), I, { iv: N, mode: g.default.mode.CBC, padding: g.default.pad.Pkcs7 }).ciphertext.toString(g.default.enc.Hex);
}
function se(t) {
  let e = g.default.lib.CipherParams.create({ ciphertext: g.default.enc.Hex.parse(t) }), o = g.default.AES.decrypt(e, I, { iv: N, mode: g.default.mode.CBC, padding: g.default.pad.Pkcs7 });
  return JSON.parse(o.toString(g.default.enc.Utf8));
}
function B(t) {
  return d(this, null, function* () {
    try {
      let e = t.includes("/") ? t.split("/").pop().replace("#", "") : t, o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let s = (yield fetch(`${o}/api/v1/info?id=${e}`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/" } })).headers.get("set-cookie"), c = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: e, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, a = re(c);
      yield fetch(`${o}/api/v1/player?t=${a}`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: s || "" } });
      let i = yield (yield fetch(`${o}/api/v1/video?id=${e}&w=1536&h=864&r=null`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: s || "" } })).text(), n = se(i.trim()), l = "";
      if (n.source)
        l = n.source;
      else
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      return console.log(`[Gdtvid] URL final generada: ${l.substring(0, 80)}...`), { url: l, headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var ae = "439c478a771f35c05022f9feabcca01c", V = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", S = { "User-Agent": V, Accept: "text/html,application/json" }, M = "https://detodopeliculas.nu", ce = { "voe.sx": C, "ok.ru": W, gdtvid: B }, le = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, ie = ["LAT", "ESP", "SUB"], A = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function T(o) {
  return d(this, arguments, function* (t, e = {}) {
    let r = yield fetch(t, { headers: m(m({}, S), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    return (r.headers.get("content-type") || "").includes("json") ? r.json() : r.text();
  });
}
function j(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function ue(t) {
  for (let [e, o] of Object.entries(ce))
    if (t.includes(e))
      return { resolver: o, serverName: le[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function de(t) {
  try {
    let e = new URL(t);
    if (e.hostname.includes("detodopeliculas.nu") && e.pathname.includes("/player/")) {
      let o = e.searchParams.get("id");
      if (!o)
        return t;
      let r = Buffer.from(o, "base64").toString("utf-8");
      if (r.startsWith("http"))
        return r;
    }
    return t;
  } catch (e) {
    return t;
  }
}
function pe(t, e) {
  return d(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], r = /* @__PURE__ */ new Set(), s = "";
    for (let { lang: c } of o)
      try {
        let a = yield T(`https://api.themoviedb.org/3/${e}/${t}?api_key=${ae}&language=${c}`), u = e === "movie" ? a.title : a.name, i = e === "movie" ? a.original_title : a.original_name;
        s || (s = (a.release_date || a.first_air_date || "").substring(0, 4)), u && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(u) && r.add(u), i && r.add(i);
      } catch (a) {
      }
    return r.size > 0 ? { titles: Array.from(r), year: s } : null;
  });
}
function fe(t, e) {
  return d(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", r = [];
    for (let c of t.titles)
      r.push(`${M}/${o}/${j(c, t.year)}/`), r.push(`${M}/${o}/${j(c)}/`);
    let s = r.map((c) => d(this, null, function* () {
      try {
        if ((yield fetch(c, { headers: S, redirect: "follow" })).ok)
          return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${c}`), c;
      } catch (a) {
      }
      throw new Error("not found");
    }));
    try {
      return yield Promise.any(s);
    } catch (c) {
      return null;
    }
  });
}
function he(t, e, o) {
  return d(this, null, function* () {
    try {
      let s = (yield T(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let c of s)
        if (c.includes(`>${e} - ${o}<`) || c.includes(`>${e}x${o}<`)) {
          let a = c.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (a)
            return a[1];
        }
    } catch (r) {
      return null;
    }
    return null;
  });
}
function ge(t) {
  return d(this, null, function* () {
    let e = yield T(t), o = { LAT: [], ESP: [], SUB: [] }, r = /* @__PURE__ */ new Set(), c = [...e.matchAll(/<li[^>]+id=["']player-option-[^"']+["'][^>]*data-post=["'](\d+)["'][^>]*data-nume=["']([^"']+)["'][^>]*>([\s\S]*?)<\/li>/gi)].map((a) => d(this, null, function* () {
      let u = a[1], i = a[2], n = a[3].toLowerCase(), l = "SUB";
      n.includes("latino") || n.includes("lat.png") || n.includes("mx.png") ? l = "LAT" : (n.includes("castellano") || n.includes("espa\xF1ol") || n.includes("es.png")) && (l = "ESP");
      try {
        let h = new URLSearchParams({ action: "doo_player_ajax", post: u, nume: i, type: "movie" }), p = yield (yield fetch("https://detodopeliculas.nu/wp-admin/admin-ajax.php", { method: "POST", headers: k(m({}, S), { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: h })).json();
        if (!(p != null && p.embed_url))
          return;
        let f = p.embed_url;
        !r.has(f) && f.startsWith("http") && (r.add(f), o[l].push(f));
      } catch (h) {
        console.log(`AJAX error: ${h.message}`);
      }
    }));
    return yield Promise.allSettled(c), o;
  });
}
function me(t, e, o, r) {
  return d(this, null, function* () {
    if (!t || !e)
      return [];
    let s = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${r}` : ""}`);
    try {
      let c = yield pe(t, e);
      if (!c)
        return [];
      let a = yield fe(c, e);
      if (!a)
        return [];
      let u = a;
      if (e === "tv" && o && r && (u = yield he(a, o, r), !u))
        return [];
      let i = yield ge(u);
      for (let n of ie) {
        let l = i[n];
        if (!l || l.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${l.length} embeds en ${A[n]}...`);
        let h = l.map((f) => d(this, null, function* () {
          let v = de(f), { resolver: L, serverName: q } = ue(v);
          if (!L)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${v}`), null;
          try {
            let w = yield L(v);
            return w ? { name: "DeTodoPeliculas", title: `${w.quality || "1080p"} \xB7 ${A[n]} \xB7 ${q}`, url: w.url, quality: w.quality || "1080p", headers: w.headers || { "User-Agent": V, Referer: u } } : null;
          } catch (w) {
            return null;
          }
        })), p = (yield Promise.allSettled(h)).filter((f) => f.status === "fulfilled" && f.value !== null).map((f) => f.value);
        if (p.length > 0) {
          let f = ((Date.now() - s) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${p.length} streams encontrados en ${A[n]} (${f}s), omitiendo otros idiomas.`), p;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${A[n]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (c) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${c.message}`), [];
    }
  });
}
