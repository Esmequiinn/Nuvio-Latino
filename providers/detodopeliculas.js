var F = Object.create;
var R = Object.defineProperty, G = Object.defineProperties, z = Object.getOwnPropertyDescriptor, K = Object.getOwnPropertyDescriptors, X = Object.getOwnPropertyNames, k = Object.getOwnPropertySymbols, Y = Object.getPrototypeOf, _ = Object.prototype.hasOwnProperty, J = Object.prototype.propertyIsEnumerable;
var P = (t, e, o) => e in t ? R(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, y = (t, e) => {
  for (var o in e || (e = {}))
    _.call(e, o) && P(t, o, e[o]);
  if (k)
    for (var o of k(e))
      J.call(e, o) && P(t, o, e[o]);
  return t;
}, O = (t, e) => G(t, K(e));
var Q = (t, e) => {
  for (var o in e)
    R(t, o, { get: e[o], enumerable: true });
}, C = (t, e, o, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of X(e))
      !_.call(t, s) && s !== o && R(t, s, { get: () => e[s], enumerable: !(r = z(e, s)) || r.enumerable });
  return t;
};
var Z = (t, e, o) => (o = t != null ? F(Y(t)) : {}, C(e || !t || !t.__esModule ? R(o, "default", { value: t, enumerable: true }) : o, t)), ee = (t) => C(R({}, "__esModule", { value: true }), t);
var d = (t, e, o) => new Promise((r, s) => {
  var i = (l) => {
    try {
      c(o.next(l));
    } catch (n) {
      s(n);
    }
  }, u = (l) => {
    try {
      c(o.throw(l));
    } catch (n) {
      s(n);
    }
  }, c = (l) => l.done ? r(l.value) : Promise.resolve(l.value).then(i, u);
  c((o = o.apply(t, e)).next());
});
var ye = {};
Q(ye, { getStreams: () => we });
module.exports = ee(ye);
var te = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function oe(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function S(o) {
  return d(this, arguments, function* (t, e = {}) {
    try {
      let s = yield (yield fetch(t, { headers: y({ "User-Agent": te }, e), redirect: "follow" })).text();
      if (!s.includes("#EXT-X-STREAM-INF")) {
        let l = t.match(/[_-](\d{3,4})p/);
        return l ? `${l[1]}p` : "1080p";
      }
      let i = 0, u = 0, c = s.split(`
`);
      for (let l of c) {
        let n = l.match(/RESOLUTION=(\d+)x(\d+)/);
        if (n) {
          let a = parseInt(n[1]), f = parseInt(n[2]);
          f > u && (u = f, i = a);
        }
      }
      return u > 0 ? oe(i, u) : "1080p";
    } catch (r) {
      return "1080p";
    }
  });
}
var ne = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function D(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function se(t, e) {
  try {
    let r = e.replace(/^\[|\]$/g, "").split("','").map((n) => n.replace(/^'+|'+$/g, "")).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), s = "";
    for (let n of t) {
      let a = n.charCodeAt(0);
      a > 64 && a < 91 ? a = (a - 52) % 26 + 65 : a > 96 && a < 123 && (a = (a - 84) % 26 + 97), s += String.fromCharCode(a);
    }
    for (let n of r)
      s = s.replace(new RegExp(n, "g"), "_");
    s = s.split("_").join("");
    let i = D(s);
    if (!i)
      return null;
    let u = "";
    for (let n = 0; n < i.length; n++)
      u += String.fromCharCode((i.charCodeAt(n) - 3 + 256) % 256);
    let c = u.split("").reverse().join(""), l = D(c);
    return l ? JSON.parse(l) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function x(o) {
  return d(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: y({ "User-Agent": ne, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function W(t) {
  return d(this, null, function* () {
    try {
      console.log(`[VOE] Resolviendo: ${t}`);
      let e = yield x(t, { Referer: t });
      if (!e.ok)
        throw new Error(`HTTP ${e.status}`);
      let o = yield e.text();
      if (/permanentToken/i.test(o)) {
        let l = o.match(/window\.location\.href\s*=\s*'([^']+)'/i);
        if (l) {
          console.log(`[VOE] Permanent token redirect -> ${l[1]}`);
          let n = yield x(l[1], { Referer: t });
          n.ok && (o = yield n.text());
        }
      }
      let r = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (r) {
        let l = r[1], n = r[2].startsWith("http") ? r[2] : new URL(r[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${n}`);
        let a = yield x(n, { Referer: t }), f = a.ok ? yield a.text() : "", m = f.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || f.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (m) {
          let h = se(l, m[1]);
          if (h && (h.source || h.direct_access_url)) {
            let p = h.source || h.direct_access_url, w = yield S(p, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${p.substring(0, 80)}...`), { url: p, quality: w, headers: { Referer: t } };
          }
        }
      }
      let s = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, i = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, u = [], c;
      for (; (c = s.exec(o)) !== null; )
        u.push(c);
      for (; (c = i.exec(o)) !== null; )
        u.push(c);
      for (let l of u) {
        let n = l[1];
        if (!n)
          continue;
        let a = n;
        if (a.startsWith("aHR0"))
          try {
            a = atob(a);
          } catch (f) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${a.substring(0, 80)}...`), { url: a, quality: yield S(a, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var N = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function B(t) {
  return d(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": N, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((n) => n.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let r = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], s = ["full", "hd", "sd", "low", "lowest"], i = r.map((n) => ({ type: n[1], url: n[2] })).filter((n) => !n.type.toLowerCase().includes("mobile") && n.url.startsWith("http"));
      if (i.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let c = i.sort((n, a) => {
        let f = s.findIndex((h) => n.type.toLowerCase().includes(h)), m = s.findIndex((h) => a.type.toLowerCase().includes(h));
        return (f === -1 ? 99 : f) - (m === -1 ? 99 : m);
      })[0];
      console.log(`[OkRu] URL encontrada (${c.type}): ${c.url.substring(0, 80)}...`);
      let l = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: c.url, quality: l[c.type] || c.type, headers: { "User-Agent": N, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var g = Z(require("crypto-js"));
var $ = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", I = g.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), M = g.default.enc.Hex.parse("313233343536373839306f6975797472");
function re(t) {
  return g.default.AES.encrypt(JSON.stringify(t), I, { iv: M, mode: g.default.mode.CBC, padding: g.default.pad.Pkcs7 }).ciphertext.toString(g.default.enc.Hex);
}
function ae(t) {
  let e = g.default.lib.CipherParams.create({ ciphertext: g.default.enc.Hex.parse(t) }), o = g.default.AES.decrypt(e, I, { iv: M, mode: g.default.mode.CBC, padding: g.default.pad.Pkcs7 });
  return JSON.parse(o.toString(g.default.enc.Utf8));
}
function j(t) {
  return d(this, null, function* () {
    try {
      let e = t.includes("/") ? t.split("/").pop().replace("#", "") : t, o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let s = (yield fetch(`${o}/api/v1/info?id=${e}`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/" } })).headers.get("set-cookie"), i = { sessionId: "p2pplay_test_session", userId: "null", playerId: "jw8", videoId: e, country: "US", platform: "web", browser: "chrome", os: "windows", timestamp: Date.now() }, u = re(i);
      yield fetch(`${o}/api/v1/player?t=${u}`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: s || "" } });
      let l = yield (yield fetch(`${o}/api/v1/video?id=${e}&w=1536&h=864&r=null`, { headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Cookie: s || "" } })).text(), n = ae(l.trim()), a = "";
      if (n.source)
        a = n.source;
      else
        throw new Error("No se encontr\xF3 ning\xFAn enlace de video v\xE1lido en la respuesta");
      return console.log(`[Gdtvid] URL final generada: ${a.substring(0, 80)}...`), { url: a, headers: { "User-Agent": $, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var ce = "439c478a771f35c05022f9feabcca01c", H = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", E = { "User-Agent": H, Accept: "text/html,application/json" }, V = "https://detodopeliculas.nu", le = { "voe.sx": W, "ok.ru": B, gdtvid: j }, ie = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, ue = ["LAT", "ESP", "SUB"], A = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function L(o) {
  return d(this, arguments, function* (t, e = {}) {
    let r = yield fetch(t, { headers: y(y({}, E), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    return (r.headers.get("content-type") || "").includes("json") ? r.json() : r.text();
  });
}
function q(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function de(t) {
  try {
    let e = new URL(t).hostname;
    for (let [o, r] of Object.entries(le))
      if (e.includes(o))
        return { resolver: r, serverName: ie[o] || "Online" };
  } catch (e) {
  }
  return { resolver: null, serverName: "Desconocido" };
}
function pe(t) {
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
function fe(t, e) {
  return d(this, null, function* () {
    let r = ["es-MX", "en-US", "es-ES"].map((c) => L(`https://api.themoviedb.org/3/${e}/${t}?api_key=${ce}&language=${c}`).catch(() => null)), s = yield Promise.all(r), i = /* @__PURE__ */ new Set(), u = "";
    for (let c of s) {
      if (!c)
        continue;
      let l = e === "movie" ? c.title : c.name, n = e === "movie" ? c.original_title : c.original_name;
      u || (u = (c.release_date || c.first_air_date || "").substring(0, 4)), l && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(l) && i.add(l), n && i.add(n);
    }
    return i.size ? { titles: [...i], year: u } : null;
  });
}
function he(t, e) {
  return d(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", r = [.../* @__PURE__ */ new Set([...t.titles.map((s) => `${V}/${o}/${q(s, t.year)}/`), ...t.titles.map((s) => `${V}/${o}/${q(s)}/`)])];
    try {
      let s = r.map((i) => d(this, null, function* () {
        if ((yield fetch(i, { headers: E, redirect: "follow" })).ok)
          return i;
        throw new Error("not found");
      }));
      return yield Promise.any(s);
    } catch (s) {
      return null;
    }
  });
}
function ge(t, e, o) {
  return d(this, null, function* () {
    try {
      let s = (yield L(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let i of s)
        if (i.includes(`>${e} - ${o}<`) || i.includes(`>${e}x${o}<`)) {
          let u = i.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (u)
            return u[1];
        }
    } catch (r) {
      return null;
    }
    return null;
  });
}
function me(t, e) {
  return d(this, null, function* () {
    let o = yield L(t), r = { LAT: [], ESP: [], SUB: [] }, s = /* @__PURE__ */ new Set(), u = [...o.matchAll(/<li[^>]+id=["']player-option-[^"']+["'][^>]*data-post=["'](\d+)["'][^>]*data-nume=["']([^"']+)["'][^>]*>([\s\S]*?)<\/li>/gi)].map((c) => d(this, null, function* () {
      let l = c[1], n = c[2], a = c[3].toLowerCase(), f = "SUB";
      a.includes("latino") || a.includes("lat.png") || a.includes("mx.png") ? f = "LAT" : (a.includes("castellano") || a.includes("espa\xF1ol") || a.includes("es.png")) && (f = "ESP");
      try {
        let m = new URLSearchParams({ action: "doo_player_ajax", post: l, nume: n, type: e === "tv" ? "tv" : "movie" }), p = yield (yield fetch("https://detodopeliculas.nu/wp-admin/admin-ajax.php", { method: "POST", headers: O(y({}, E), { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: m })).json();
        if (!(p != null && p.embed_url))
          return;
        let w = p.embed_url;
        !s.has(w) && w.startsWith("http") && (s.add(w), r[f].push(w));
      } catch (m) {
        console.log(`AJAX error: ${m.message}`);
      }
    }));
    return yield Promise.allSettled(u), r;
  });
}
function we(t, e, o, r) {
  return d(this, null, function* () {
    if (!t || !e)
      return [];
    let s = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${r}` : ""}`);
    try {
      let i = yield fe(t, e);
      if (!i)
        return [];
      let u = yield he(i, e);
      if (!u)
        return [];
      let c = u;
      if (e === "tv" && o && r && (c = yield ge(u, o, r), !c))
        return [];
      let l = yield me(c, e);
      for (let n of ue) {
        let a = l[n];
        if (!a || a.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${a.length} embeds en ${A[n]}...`);
        let f = a.map((p) => d(this, null, function* () {
          let w = pe(p), { resolver: T, serverName: U } = de(w);
          if (!T)
            return null;
          try {
            let v = yield T(w);
            if (!v)
              return null;
            let b = v.quality || "Unknown";
            return { name: "DeTodoPeliculas", title: `${b} \xB7 ${A[n]} \xB7 ${U}`, url: v.url, quality: b, headers: v.headers || { "User-Agent": H, Referer: c } };
          } catch (v) {
            return console.log(`[${U}] Resolver error: ${v.message}`), null;
          }
        })), h = (yield Promise.allSettled(f)).filter((p) => p.status === "fulfilled" && p.value !== null).map((p) => p.value);
        if (h.length > 0) {
          let p = ((Date.now() - s) / 1e3).toFixed(2);
          return console.log(`[DeTodoPeliculas] \u2713 ${h.length} streams encontrados en ${A[n]} (${p}s), omitiendo otros idiomas.`), h;
        } else
          console.log(`[DeTodoPeliculas] Sin streams exitosos en ${A[n]}, intentando siguiente idioma...`);
      }
      return console.log("[DeTodoPeliculas] Agotada la b\xFAsqueda en todos los idiomas sin \xE9xito."), [];
    } catch (i) {
      return console.log(`[DeTodoPeliculas] Error Cr\xEDtico: ${i.message}`), [];
    }
  });
}
