var F = Object.create;
var S = Object.defineProperty, J = Object.defineProperties, j = Object.getOwnPropertyDescriptor, z = Object.getOwnPropertyDescriptors, K = Object.getOwnPropertyNames, O = Object.getOwnPropertySymbols, X = Object.getPrototypeOf, k = Object.prototype.hasOwnProperty, Y = Object.prototype.propertyIsEnumerable;
var P = (t, e, o) => e in t ? S(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, R = (t, e) => {
  for (var o in e || (e = {}))
    k.call(e, o) && P(t, o, e[o]);
  if (O)
    for (var o of O(e))
      Y.call(e, o) && P(t, o, e[o]);
  return t;
}, U = (t, e) => J(t, z(e));
var Q = (t, e) => {
  for (var o in e)
    S(t, o, { get: e[o], enumerable: true });
}, D = (t, e, o, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of K(e))
      !k.call(t, r) && r !== o && S(t, r, { get: () => e[r], enumerable: !(n = j(e, r)) || n.enumerable });
  return t;
};
var Z = (t, e, o) => (o = t != null ? F(X(t)) : {}, D(e || !t || !t.__esModule ? S(o, "default", { value: t, enumerable: true }) : o, t)), ee = (t) => D(S({}, "__esModule", { value: true }), t);
var p = (t, e, o) => new Promise((n, r) => {
  var l = (i) => {
    try {
      c(o.next(i));
    } catch (s) {
      r(s);
    }
  }, a = (i) => {
    try {
      c(o.throw(i));
    } catch (s) {
      r(s);
    }
  }, c = (i) => i.done ? n(i.value) : Promise.resolve(i.value).then(l, a);
  c((o = o.apply(t, e)).next());
});
var $e = {};
Q($e, { getStreams: () => Re });
module.exports = ee($e);
var te = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function oe(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function v(o) {
  return p(this, arguments, function* (t, e = {}) {
    try {
      let r = yield (yield fetch(t, { headers: R({ "User-Agent": te }, e), redirect: "follow" })).text();
      if (!r.includes("#EXT-X-STREAM-INF")) {
        let i = t.match(/[_-](\d{3,4})p/);
        return i ? `${i[1]}p` : "1080p";
      }
      let l = 0, a = 0, c = r.split(`
`);
      for (let i of c) {
        let s = i.match(/RESOLUTION=(\d+)x(\d+)/);
        if (s) {
          let u = parseInt(s[1]), g = parseInt(s[2]);
          g > a && (a = g, l = u);
        }
      }
      return a > 0 ? oe(l, a) : "1080p";
    } catch (n) {
      return "1080p";
    }
  });
}
var ne = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function _(t) {
  try {
    return typeof atob != "undefined" ? atob(t) : Buffer.from(t, "base64").toString("utf8");
  } catch (e) {
    return null;
  }
}
function se(t, e) {
  try {
    let n = e.replace(/^\[|\]$/g, "").split("','").map((s) => s.replace(/^'+|'+$/g, "")).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), r = "";
    for (let s of t) {
      let u = s.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), r += String.fromCharCode(u);
    }
    for (let s of n)
      r = r.replace(new RegExp(s, "g"), "_");
    r = r.split("_").join("");
    let l = _(r);
    if (!l)
      return null;
    let a = "";
    for (let s = 0; s < l.length; s++)
      a += String.fromCharCode((l.charCodeAt(s) - 3 + 256) % 256);
    let c = a.split("").reverse().join(""), i = _(c);
    return i ? JSON.parse(i) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function x(o) {
  return p(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: R({ "User-Agent": ne, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function C(t) {
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
      let n = o.match(/json">\s*\[\s*['"]([^'"]+)['"]\s*\]\s*<\/script>\s*<script[^>]*src=['"]([^'"]+)['"]/i);
      if (n) {
        let i = n[1], s = n[2].startsWith("http") ? n[2] : new URL(n[2], t).href;
        console.log(`[VOE] Found encoded array + loader: ${s}`);
        let u = yield x(s, { Referer: t }), g = u.ok ? yield u.text() : "", w = g.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || g.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (w) {
          let f = se(i, w[1]);
          if (f && (f.source || f.direct_access_url)) {
            let d = f.source || f.direct_access_url, h = yield v(d, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${d.substring(0, 80)}...`), { url: d, quality: h, headers: { Referer: t } };
          }
        }
      }
      let r = /(?:mp4|hls)'\s*:\s*'([^']+)'/gi, l = /(?:mp4|hls)"\s*:\s*"([^"]+)"/gi, a = [], c;
      for (; (c = r.exec(o)) !== null; )
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
          } catch (g) {
          }
        return console.log(`[VOE] URL encontrada (fallback): ${u.substring(0, 80)}...`), { url: u, quality: yield v(u, { Referer: t }), headers: { Referer: t } };
      }
      return console.log("[VOE] No se encontr\xF3 URL"), null;
    } catch (e) {
      return console.log(`[VOE] Error: ${e.message}`), null;
    }
  });
}
var N = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function W(t) {
  return p(this, null, function* () {
    try {
      console.log(`[OkRu] Resolviendo: ${t}`);
      let e = yield fetch(t, { headers: { "User-Agent": N, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((s) => s.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let n = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], r = ["full", "hd", "sd", "low", "lowest"], l = n.map((s) => ({ type: s[1], url: s[2] })).filter((s) => !s.type.toLowerCase().includes("mobile") && s.url.startsWith("http"));
      if (l.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let c = l.sort((s, u) => {
        let g = r.findIndex((f) => s.type.toLowerCase().includes(f)), w = r.findIndex((f) => u.type.toLowerCase().includes(f));
        return (g === -1 ? 99 : g) - (w === -1 ? 99 : w);
      })[0];
      console.log(`[OkRu] URL encontrada (${c.type}): ${c.url.substring(0, 80)}...`);
      let i = { full: "1080p", hd: "720p", sd: "480p", low: "360p", lowest: "240p" };
      return { url: c.url, quality: i[c.type] || c.type, headers: { "User-Agent": N, Referer: "https://ok.ru/" } };
    } catch (e) {
      return console.log(`[OkRu] Error: ${e.message}`), null;
    }
  });
}
var y = Z(require("crypto-js"));
var B = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36", re = y.default.enc.Hex.parse("6b69656d7469656e6d75613931316361"), ce = y.default.enc.Hex.parse("313233343536373839306f6975797472");
function ae(t) {
  let e = y.default.lib.CipherParams.create({ ciphertext: y.default.enc.Hex.parse(t) }), o = y.default.AES.decrypt(e, re, { iv: ce, mode: y.default.mode.CBC, padding: y.default.pad.Pkcs7 });
  return JSON.parse(o.toString(y.default.enc.Utf8));
}
function le(t) {
  return p(this, null, function* () {
    let e = t.body.getReader(), o = new TextDecoder(), n = "";
    for (; ; ) {
      let { done: r, value: l } = yield e.read();
      if (r)
        break;
      n += o.decode(l, { stream: true });
    }
    return n += o.decode(), n;
  });
}
function M(t) {
  return p(this, null, function* () {
    try {
      let e = t.includes("#") ? t.split("#").pop() : t.split("/").pop().replace("#", ""), o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let n = yield fetch(`${o}/api/v1/info?id=${e}`, { headers: { "User-Agent": B, Referer: "https://gdtvid.p2pplay.pro/" } }), r = yield le(n);
      console.log(`[Gdtvid - Debug] Info Raw Hex recibido: ${r.trim().substring(0, 100)}...`);
      let l = ae(r.trim());
      console.log(`[Gdtvid - Debug] Info JSON descifrado: ${JSON.stringify(l, null, 2)}`);
      let a = l.poster;
      if (!a)
        throw console.error("[Gdtvid - Error] No se encontr\xF3 'poster' en la respuesta:", l), new Error("No se encontr\xF3 poster en info");
      let c = a.replace(/\/poster\.[^/]+$/, "/tt/master.m3u8"), i = `${o}/hls${c}`;
      return console.log(`[Gdtvid] URL construida desde poster: ${i}...`), { url: i, headers: { "User-Agent": B, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var ie = "439c478a771f35c05022f9feabcca01c", G = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", T = { "User-Agent": G, Accept: "text/html,application/json" }, V = "https://detodopeliculas.nu", ue = { "voe.sx": C, "ok.ru": W, gdtvid: M }, de = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, pe = ["LAT", "ESP", "SUB"], E = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function L(o) {
  return p(this, arguments, function* (t, e = {}) {
    let n = yield fetch(t, { headers: R(R({}, T), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!n.ok)
      throw new Error(`HTTP ${n.status}`);
    return (n.headers.get("content-type") || "").includes("json") ? n.json() : n.text();
  });
}
function I(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function fe(t) {
  for (let [e, o] of Object.entries(ue))
    if (t.includes(e))
      return { resolver: o, serverName: de[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function ge(t) {
  if (!t)
    return null;
  let e = t.match(/src=["']([^"']+)["']/i);
  return e ? e[1] : t;
}
function he(t, e) {
  return p(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], n = /* @__PURE__ */ new Set(), r = "";
    for (let { lang: l } of o)
      try {
        let a = yield L(`https://api.themoviedb.org/3/${e}/${t}?api_key=${ie}&language=${l}`), c = e === "movie" ? a.title : a.name, i = e === "movie" ? a.original_title : a.original_name;
        r || (r = (a.release_date || a.first_air_date || "").substring(0, 4)), c && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(c) && n.add(c), i && n.add(i);
      } catch (a) {
      }
    return n.size > 0 ? { titles: Array.from(n), year: r } : null;
  });
}
function me(t, e) {
  return p(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", n = /* @__PURE__ */ new Set();
    for (let r of t.titles)
      n.add(I(r, t.year)), n.add(I(r));
    for (let r of n) {
      let l = `${V}/${o}/${r}/`;
      try {
        if ((yield fetch(l, { headers: T, redirect: "follow" })).ok)
          return console.log(`[DeTodoPeliculas] \u2713 P\xE1gina encontrada: ${l}`), l;
      } catch (a) {
        continue;
      }
    }
    return null;
  });
}
function ye(t, e, o) {
  return p(this, null, function* () {
    try {
      let r = (yield L(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
      for (let l of r)
        if (l.includes(`>${e} - ${o}<`) || l.includes(`>${e}x${o}<`)) {
          let a = l.match(/href=["'](https:\/\/detodopeliculas\.nu\/episodio\/[^"']+)["']/i);
          if (a)
            return a[1];
        }
    } catch (n) {
      return null;
    }
    return null;
  });
}
function we(t) {
  return p(this, null, function* () {
    let e = yield L(t), o = { LAT: [], ESP: [], SUB: [] }, n = /* @__PURE__ */ new Set(), r = [...e.matchAll(/<li[^>]*class=["'][^"']*dooplay_player_option[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`[AJAX] opciones encontradas: ${r.length}`);
    for (let l of r) {
      let a = l[0], c = l[1].toLowerCase(), i = a.match(/data-post=["']([^"']+)["']/i), s = a.match(/data-nume=["']([^"']+)["']/i), u = a.match(/data-type=["']([^"']+)["']/i);
      if (!i || !s || !u)
        continue;
      let g = i[1], w = s[1], f = u[1], d = "SUB";
      c.includes("lat") || c.includes("latino") || c.includes("mx") ? d = "LAT" : (c.includes("cast") || c.includes("espa\xF1ol") || c.includes("es ")) && (d = "ESP");
      try {
        let h = new URLSearchParams();
        h.append("action", "doo_player_ajax"), h.append("post", g), h.append("nume", w), h.append("type", f);
        let m = yield (yield fetch(`${V}/wp-admin/admin-ajax.php`, { method: "POST", headers: U(R({}, T), { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: h.toString() })).text(), $;
        try {
          $ = JSON.parse(m);
        } catch (Ae) {
          console.log("[AJAX ERROR] Respuesta no JSON:", m.slice(0, 200));
          continue;
        }
        let H = $ == null ? void 0 : $.embed_url, A = ge(H), q = $ == null ? void 0 : $.type;
        if (!A || q === "trailer" || !A.startsWith("http") || A.includes("youtube.com") || A.includes("googletagmanager"))
          continue;
        n.has(A) || (n.add(A), o[d].push(A));
      } catch (h) {
        console.log("[AJAX ERROR]", h.message);
      }
    }
    if (o.LAT.length === 0 && o.ESP.length === 0 && o.SUB.length === 0) {
      let l = [...e.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)];
      for (let a of l) {
        let c = a[1];
        c.startsWith("http") && (c.includes("youtube.com") || c.includes("googletagmanager") || n.has(c) || (n.add(c), o.LAT.push(c)));
      }
    }
    return o;
  });
}
function Re(t, e, o, n) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    let r = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${n}` : ""}`);
    try {
      let l = yield he(t, e);
      if (!l)
        return [];
      let a = yield me(l, e);
      if (!a)
        return [];
      let c = a;
      if (e === "tv" && o && n && (c = yield ye(a, o, n), !c))
        return [];
      let i = yield we(c);
      console.log("[DeTodoPeliculas] Embeds encontrados:", JSON.stringify({ LAT: i.LAT.length, ESP: i.ESP.length, SUB: i.SUB.length }));
      for (let s of pe) {
        let u = i[s];
        if (!u || u.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${u.length} embeds en ${E[s]}...`);
        let g = u.map((d) => p(this, null, function* () {
          let { resolver: h, serverName: b } = fe(d);
          if (!h)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${d}`), null;
          try {
            let m = yield h(d);
            return m ? { name: "DeTodoPeliculas", title: `${m.quality || "Unknown"} \xB7 ${E[s]} \xB7 ${b}`, url: m.url, quality: m.quality || "Unknown", headers: m.headers || { "User-Agent": G, Referer: c } } : null;
          } catch (m) {
            return null;
          }
        })), f = (yield Promise.allSettled(g)).filter((d) => d.status === "fulfilled" && d.value !== null).map((d) => d.value);
        if (f.length > 0) {
          let d = ((Date.now() - r) / 1e3).toFixed(2);
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
