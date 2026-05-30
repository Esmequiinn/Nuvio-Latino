var F = Object.create;
var E = Object.defineProperty, j = Object.defineProperties, X = Object.getOwnPropertyDescriptor, J = Object.getOwnPropertyDescriptors, z = Object.getOwnPropertyNames, P = Object.getOwnPropertySymbols, K = Object.getPrototypeOf, U = Object.prototype.hasOwnProperty, Y = Object.prototype.propertyIsEnumerable;
var O = (t, e, o) => e in t ? E(t, e, { enumerable: true, configurable: true, writable: true, value: o }) : t[e] = o, R = (t, e) => {
  for (var o in e || (e = {}))
    U.call(e, o) && O(t, o, e[o]);
  if (P)
    for (var o of P(e))
      Y.call(e, o) && O(t, o, e[o]);
  return t;
}, k = (t, e) => j(t, J(e));
var Q = (t, e) => {
  for (var o in e)
    E(t, o, { get: e[o], enumerable: true });
}, _ = (t, e, o, s) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of z(e))
      !U.call(t, n) && n !== o && E(t, n, { get: () => e[n], enumerable: !(s = X(e, n)) || s.enumerable });
  return t;
};
var Z = (t, e, o) => (o = t != null ? F(K(t)) : {}, _(e || !t || !t.__esModule ? E(o, "default", { value: t, enumerable: true }) : o, t)), ee = (t) => _(E({}, "__esModule", { value: true }), t);
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
Q($e, { getStreams: () => Re });
module.exports = ee($e);
var te = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function oe(t, e) {
  return t >= 3840 || e >= 2160 ? "4K" : t >= 1920 || e >= 1080 ? "1080p" : t >= 1280 || e >= 720 ? "720p" : t >= 854 || e >= 480 ? "480p" : "360p";
}
function v(o) {
  return p(this, arguments, function* (t, e = {}) {
    try {
      let n = yield (yield fetch(t, { headers: R({ "User-Agent": te }, e), redirect: "follow" })).text();
      if (!n.includes("#EXT-X-STREAM-INF")) {
        let i = t.match(/[_-](\d{3,4})p/);
        return i ? `${i[1]}p` : "1080p";
      }
      let l = 0, a = 0, c = n.split(`
`);
      for (let i of c) {
        let r = i.match(/RESOLUTION=(\d+)x(\d+)/);
        if (r) {
          let u = parseInt(r[1]), h = parseInt(r[2]);
          h > a && (a = h, l = u);
        }
      }
      return a > 0 ? oe(l, a) : "1080p";
    } catch (s) {
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
    let s = e.replace(/^\[|\]$/g, "").split("','").map((r) => r.replace(/^'+|'+$/g, "")).map((r) => r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), n = "";
    for (let r of t) {
      let u = r.charCodeAt(0);
      u > 64 && u < 91 ? u = (u - 52) % 26 + 65 : u > 96 && u < 123 && (u = (u - 84) % 26 + 97), n += String.fromCharCode(u);
    }
    for (let r of s)
      n = n.replace(new RegExp(r, "g"), "_");
    n = n.split("_").join("");
    let l = D(n);
    if (!l)
      return null;
    let a = "";
    for (let r = 0; r < l.length; r++)
      a += String.fromCharCode((l.charCodeAt(r) - 3 + 256) % 256);
    let c = a.split("").reverse().join(""), i = D(c);
    return i ? JSON.parse(i) : null;
  } catch (o) {
    return console.log("[VOE] voeDecode error:", o.message), null;
  }
}
function T(o) {
  return p(this, arguments, function* (t, e = {}) {
    return yield fetch(t, { method: "GET", headers: R({ "User-Agent": ne, Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" }, e), redirect: "follow" });
  });
}
function C(t) {
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
        let u = yield T(r, { Referer: t }), h = u.ok ? yield u.text() : "", w = h.match(/(\[(?:'[^']{1,10}'[\s,]*){4,12}\])/i) || h.match(/(\[(?:"[^"]{1,10}"[,\s]*){4,12}\])/i);
        if (w) {
          let f = se(i, w[1]);
          if (f && (f.source || f.direct_access_url)) {
            let d = f.source || f.direct_access_url, g = yield v(d, { Referer: t });
            return console.log(`[VOE] URL encontrada: ${d.substring(0, 80)}...`), { url: d, quality: g, headers: { Referer: t } };
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
          } catch (h) {
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
      let e = yield fetch(t, { headers: { "User-Agent": N, Accept: "text/html", Referer: "https://ok.ru/" }, redirect: "follow" }).then((r) => r.text());
      if (e.includes("copyrightsRestricted") || e.includes("COPYRIGHTS_RESTRICTED") || e.includes("LIMITED_ACCESS") || e.includes("notFound") || !e.includes("urls"))
        return console.log("[OkRu] Video no disponible o eliminado"), null;
      let s = [...e.replace(/\\&quot;/g, '"').replace(/\\u0026/g, "&").replace(/\\/g, "").matchAll(/"name":"([^"]+)","url":"([^"]+)"/g)], n = ["full", "hd", "sd", "low", "lowest"], l = s.map((r) => ({ type: r[1], url: r[2] })).filter((r) => !r.type.toLowerCase().includes("mobile") && r.url.startsWith("http"));
      if (l.length === 0)
        return console.log("[OkRu] No se encontraron URLs"), null;
      let c = l.sort((r, u) => {
        let h = n.findIndex((f) => r.type.toLowerCase().includes(f)), w = n.findIndex((f) => u.type.toLowerCase().includes(f));
        return (h === -1 ? 99 : h) - (w === -1 ? 99 : w);
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
function le(t, e) {
  return new Promise((o, s) => {
    let n = new XMLHttpRequest();
    n.open("GET", t), n.responseType = "text";
    for (let [l, a] of Object.entries(e))
      n.setRequestHeader(l, a);
    n.onload = () => {
      n.status >= 200 && n.status < 300 ? o(n.responseText) : s(new Error(`HTTP Error ${n.status}`));
    }, n.onerror = () => s(new Error("Network error via XHR")), n.send();
  });
}
function M(t) {
  return p(this, null, function* () {
    try {
      let e = t.includes("#") ? t.split("#").pop() : t.split("/").pop().replace("#", ""), o = "https://gdtvid.p2pplay.pro";
      console.log(`[Gdtvid] Resolviendo: ${e}`);
      let s = yield le(`${o}/api/v1/info?id=${e}`, { "User-Agent": B, Referer: "https://gdtvid.p2pplay.pro/" });
      console.log("[Gdtvid - Debug] Info Raw Hex extra\xEDdo por XHR");
      let n = ae(s.trim()), l = n.poster;
      if (!l)
        throw console.log(`[Gdtvid - Debug] No poster found. Payload: ${JSON.stringify(n)}`), new Error("No se encontr\xF3 poster en info");
      let a = l.replace(/\/poster\.[^/]+$/, "/tt/master.m3u8"), c = `${o}/hls${a}`;
      return console.log(`[Gdtvid] URL final construida: ${c}`), { url: c, headers: { "User-Agent": B, Referer: "https://gdtvid.p2pplay.pro/", Origin: "https://gdtvid.p2pplay.pro" } };
    } catch (e) {
      return console.log(`[Gdtvid] Error: ${e.message}`), null;
    }
  });
}
var ie = "439c478a771f35c05022f9feabcca01c", I = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", x = { "User-Agent": I, Accept: "text/html,application/json" }, q = "https://detodopeliculas.nu", ue = { "voe.sx": C, "ok.ru": W, gdtvid: M }, de = { "voe.sx": "VOE", "ok.ru": "OkRu", gdtvid: "GDTvid" }, pe = ["LAT", "ESP", "SUB"], S = { LAT: "Latino", ESP: "Castellano", SUB: "Subtitulado" };
function L(o) {
  return p(this, arguments, function* (t, e = {}) {
    let s = yield fetch(t, { headers: R(R({}, x), e.headers), method: e.method || "GET", redirect: "follow" });
    if (!s.ok)
      throw new Error(`HTTP ${s.status}`);
    return (s.headers.get("content-type") || "").includes("json") ? s.json() : s.text();
  });
}
function H(t, e = null) {
  let o = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return e ? `${o}-${e}` : o;
}
function fe(t) {
  for (let [e, o] of Object.entries(ue))
    if (t.includes(e))
      return { resolver: o, serverName: de[e] || "Online" };
  return { resolver: null, serverName: "Desconocido" };
}
function he(t) {
  if (!t)
    return null;
  let e = t.match(/src=["']([^"']+)["']/i);
  return e ? e[1] : t;
}
function ge(t, e) {
  return p(this, null, function* () {
    let o = [{ lang: "es-MX" }, { lang: "en-US" }, { lang: "es-ES" }], s = /* @__PURE__ */ new Set(), n = "";
    for (let { lang: l } of o)
      try {
        let a = yield L(`https://api.themoviedb.org/3/${e}/${t}?api_key=${ie}&language=${l}`), c = e === "movie" ? a.title : a.name, i = e === "movie" ? a.original_title : a.original_name;
        n || (n = (a.release_date || a.first_air_date || "").substring(0, 4)), c && !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(c) && s.add(c), i && s.add(i);
      } catch (a) {
      }
    return s.size > 0 ? { titles: Array.from(s), year: n } : null;
  });
}
function me(t, e) {
  return p(this, null, function* () {
    let o = e === "movie" ? "pelicula" : "serie", s = /* @__PURE__ */ new Set();
    for (let n of t.titles)
      s.add(H(n, t.year)), s.add(H(n));
    for (let n of s) {
      let l = `${q}/${o}/${n}/`;
      try {
        if ((yield fetch(l, { headers: x, redirect: "follow" })).ok)
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
      let n = (yield L(`${t}?ep_season=${e}`)).split(/<article|<li|<div class=["']episodios/i);
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
function we(t) {
  return p(this, null, function* () {
    let e = yield L(t), o = { LAT: [], ESP: [], SUB: [] }, s = /* @__PURE__ */ new Set(), n = [...e.matchAll(/<li[^>]*class=["'][^"']*dooplay_player_option[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    console.log(`[AJAX] opciones encontradas: ${n.length}`);
    for (let l of n) {
      let a = l[0], c = l[1].toLowerCase(), i = a.match(/data-post=["']([^"']+)["']/i), r = a.match(/data-nume=["']([^"']+)["']/i), u = a.match(/data-type=["']([^"']+)["']/i);
      if (!i || !r || !u)
        continue;
      let h = i[1], w = r[1], f = u[1], d = "SUB";
      c.includes("lat") || c.includes("latino") || c.includes("mx") ? d = "LAT" : (c.includes("cast") || c.includes("espa\xF1ol") || c.includes("es ")) && (d = "ESP");
      try {
        let g = new URLSearchParams();
        g.append("action", "doo_player_ajax"), g.append("post", h), g.append("nume", w), g.append("type", f);
        let m = yield (yield fetch(`${q}/wp-admin/admin-ajax.php`, { method: "POST", headers: k(R({}, x), { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest", Referer: t }), body: g.toString() })).text(), $;
        try {
          $ = JSON.parse(m);
        } catch (Ae) {
          console.log("[AJAX ERROR] Respuesta no JSON:", m.slice(0, 200));
          continue;
        }
        let G = $ == null ? void 0 : $.embed_url, A = he(G), V = $ == null ? void 0 : $.type;
        if (!A || V === "trailer" || !A.startsWith("http") || A.includes("youtube.com") || A.includes("googletagmanager"))
          continue;
        s.has(A) || (s.add(A), o[d].push(A));
      } catch (g) {
        console.log("[AJAX ERROR]", g.message);
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
function Re(t, e, o, s) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    let n = Date.now();
    console.log(`[DeTodoPeliculas] Buscando: TMDB ${t} (${e})${o ? ` S${o}E${s}` : ""}`);
    try {
      let l = yield ge(t, e);
      if (!l)
        return [];
      let a = yield me(l, e);
      if (!a)
        return [];
      let c = a;
      if (e === "tv" && o && s && (c = yield ye(a, o, s), !c))
        return [];
      let i = yield we(c);
      console.log("[DeTodoPeliculas] Embeds encontrados:", JSON.stringify({ LAT: i.LAT.length, ESP: i.ESP.length, SUB: i.SUB.length }));
      for (let r of pe) {
        let u = i[r];
        if (!u || u.length === 0)
          continue;
        console.log(`[DeTodoPeliculas] Resolviendo ${u.length} embeds en ${S[r]}...`);
        let h = u.map((d) => p(this, null, function* () {
          let { resolver: g, serverName: b } = fe(d);
          if (!g)
            return console.log(`[DeTodoPeliculas] \u26A0\uFE0F Falta resolver para: ${d}`), null;
          try {
            let m = yield g(d);
            return m ? { name: "DeTodoPeliculas", title: `${m.quality || "Unknown"} \xB7 ${S[r]} \xB7 ${b}`, url: m.url, quality: m.quality || "Unknown", headers: m.headers || { "User-Agent": I, Referer: c } } : null;
          } catch (m) {
            return null;
          }
        })), f = (yield Promise.allSettled(h)).filter((d) => d.status === "fulfilled" && d.value !== null).map((d) => d.value);
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
