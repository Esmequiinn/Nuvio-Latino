var g = Object.defineProperty;
var S = Object.getOwnPropertyDescriptor;
var T = Object.getOwnPropertyNames;
var E = Object.prototype.hasOwnProperty;
var P = (t, n) => {
  for (var s in n)
    g(t, s, { get: n[s], enumerable: true });
}, I = (t, n, s, i) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let e of T(n))
      !E.call(t, e) && e !== s && g(t, e, { get: () => n[e], enumerable: !(i = S(n, e)) || i.enumerable });
  return t;
};
var V = (t) => I(g({}, "__esModule", { value: true }), t);
var p = (t, n, s) => new Promise((i, e) => {
  var l = (a) => {
    try {
      r(s.next(a));
    } catch (c) {
      e(c);
    }
  }, o = (a) => {
    try {
      r(s.throw(a));
    } catch (c) {
      e(c);
    }
  }, r = (a) => a.done ? i(a.value) : Promise.resolve(a.value).then(l, o);
  r((s = s.apply(t, n)).next());
});
var O = {};
P(O, { getStreams: () => L });
module.exports = V(O);
var A = "439c478a771f35c05022f9feabcca01c", d = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", Accept: "application/json, text/plain, */*", Origin: "https://pluto.tv", Referer: "https://pluto.tv/" };
function M(t, n) {
  return p(this, null, function* () {
    let s = [], i = {};
    function e(l) {
      let o = String(l || "").trim();
      !o || i[o] || (i[o] = true, s.push(o));
    }
    for (let l of ["es-MX", "es-ES", "en-US"])
      try {
        let o = `https://api.themoviedb.org/3/${n}/${t}?api_key=${A}&language=${l}`, r = yield fetch(o).then((u) => u.json()), a = n === "movie" ? r.title : r.name, c = n === "movie" ? r.original_title : r.original_name;
        e(a), e(c);
      } catch (o) {
      }
    return s;
  });
}
function k(t, n) {
  return p(this, null, function* () {
    try {
      let s = `https://service-media-search.clusters.pluto.tv/v1/search?q=${encodeURIComponent(t)}&limit=30`;
      return (yield (yield fetch(s, { headers: { authorization: "Bearer " + n.sessionToken, origin: "https://pluto.tv", referer: "https://pluto.tv/", "user-agent": d["User-Agent"] } })).json()).data || [];
    } catch (s) {
      return [];
    }
  });
}
function w(t) {
  return String(t || "").toLowerCase().replace(/[!\-:'".,]/g, " ").replace(/\s+/g, " ").trim();
}
function B(t, n, s) {
  return p(this, null, function* () {
    for (let i of t) {
      let e = yield k(i, s);
      console.log('[PlutoTV] B\xFAsqueda "' + i + '":', JSON.stringify(e.map((o) => ({ name: o.name, type: o.type, id: o.id }))));
      let l = n === "movie" ? "movie" : "series";
      for (let o of e) {
        if (o.type !== l)
          continue;
        let r = w(o.name), a = w(i);
        if (r === a || r.startsWith(a) || a.startsWith(r))
          return console.log(`[PlutoTV] Match: "${o.name}" (slug: ${o.slug})`), o;
      }
    }
    return null;
  });
}
function N(t) {
  let n = [];
  for (let s in t)
    Object.prototype.hasOwnProperty.call(t, s) && n.push(encodeURIComponent(s) + "=" + encodeURIComponent(t[s]));
  return n.join("&");
}
function m() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    let n = Math.random() * 16 | 0;
    return (t === "x" ? n : n & 3 | 8).toString(16);
  });
}
function x(t) {
  if (!t)
    return null;
  if (typeof t.stitchUrl == "string" && t.stitchUrl)
    return t.stitchUrl;
  if (t.stitched) {
    if (typeof t.stitched == "string" && t.stitched)
      return t.stitched;
    if (t.stitched.url)
      return t.stitched.url;
    if (t.stitched.urls && Array.isArray(t.stitched.urls) && t.stitched.urls.length > 0 && t.stitched.urls[0].url)
      return t.stitched.urls[0].url;
  }
  if (t.clip) {
    if (typeof t.clip == "string" && t.clip)
      return t.clip;
    if (t.clip.url)
      return t.clip.url;
  }
  return t.url ? t.url : t.streamUrl ? t.streamUrl : null;
}
function D(t, n) {
  return p(this, null, function* () {
    let s = { accept: "application/json, text/javascript, */*; q=0.01", authorization: "Bearer " + t.sessionToken, origin: "https://pluto.tv", referer: "https://pluto.tv/", "user-agent": d["User-Agent"] }, i = "https://api.pluto.tv/v3/vod/series/" + n + "/seasons?includeItems=true&deviceType=web";
    try {
      let e = yield fetch(i, { method: "GET", headers: s });
      if (console.log("[PlutoTV DEBUG] Seasons status: " + e.status), !e.ok) {
        let l = yield e.text();
        return console.log("[PlutoTV DEBUG] Seasons error body: " + l), null;
      }
      return yield e.json();
    } catch (e) {
      return console.log("[PlutoTV DEBUG] Excepci\xF3n seasons Pluto: " + e.message), null;
    }
  });
}
function G(t, n, s) {
  if (!t)
    return null;
  let i = parseInt(n, 10), e = parseInt(s, 10), l = t.seasons || (Array.isArray(t) ? t : []);
  for (let o of l) {
    let r = o.episodes || o.items || [];
    for (let a of r) {
      let c = parseInt(a.season || a.seasonNumber || 0, 10), u = parseInt(a.number || a.episode || a.episodeNumber || 0, 10), f = u % 100;
      if (c === i && (u === e || f === e))
        return a;
    }
  }
  return null;
}
function j(t, n) {
  return p(this, null, function* () {
    try {
      let i = yield (yield fetch(t, { method: "GET", headers: n || {}, redirect: "follow" })).text();
      if (!i.includes("#EXT-X-STREAM-INF")) {
        let r = t.match(/[_-](\d{3,4})p/);
        return r ? r[1] + "p" : "1080p";
      }
      let e = 0, l = 0, o = i.split(`
`);
      for (let r = 0; r < o.length; r++) {
        let c = o[r].match(/RESOLUTION=(\d+)x(\d+)/);
        if (c) {
          let u = parseInt(c[1], 10), f = parseInt(c[2], 10);
          f > e && (e = f, l = u);
        }
      }
      return e >= 2160 || l >= 3840 ? "4K" : e >= 1080 || l >= 1920 ? "1080p" : e >= 720 || l >= 1280 ? "720p" : e >= 480 || l >= 854 ? "480p" : "360p";
    } catch (s) {
      return "1080p";
    }
  });
}
function C(t, n) {
  return p(this, null, function* () {
    try {
      let s = `https://api.pluto.tv/v3/vod/slugs/${t.slug}?deviceType=web`;
      return yield (yield fetch(s, { headers: { authorization: "Bearer " + n.sessionToken, origin: "https://pluto.tv", referer: "https://pluto.tv/", "user-agent": d["User-Agent"] } })).json();
    } catch (s) {
      return null;
    }
  });
}
function R(t, n) {
  let [s, i] = t.split("?"), e = new URLSearchParams(i || "");
  return e.set("appName", "web"), e.set("deviceMake", "Chrome"), e.set("deviceModel", "web"), e.set("deviceType", "web"), e.set("jwt", n.sessionToken), s + "?" + e.toString();
}
function L(t, n, s, i) {
  return p(this, null, function* () {
    if (!t || !n)
      return [];
    try {
      let e = { appName: "web", appVersion: "9.0.0", deviceVersion: "120.0.0", deviceType: "web", deviceMake: "Chrome", deviceModel: "web", sid: m(), clientID: m(), clientModelNumber: "na", drmCapabilities: "widevine:L3", includeExtendedEvents: "false" }, l = "https://boot.pluto.tv/v4/start?" + N(e);
      console.log("[PlutoTV DEBUG] URL de Handshake: " + l);
      let o = yield fetch(l, { method: "GET", headers: d });
      if (!o.ok) {
        let h = yield o.text();
        return console.log("[PlutoTV DEBUG] Handshake fallido. Status: " + o.status), console.log("[PlutoTV DEBUG] Cuerpo del error: " + h), [];
      }
      let r = yield o.json();
      if (!r.sessionToken)
        return console.log("[PlutoTV DEBUG] Error: No se recibi\xF3 sessionToken"), [];
      let a = yield M(t, n);
      console.log("[PlutoTV] Candidatos: " + JSON.stringify(a));
      let c = yield B(a, n, r);
      if (!c)
        return console.log("[PlutoTV] No se encontr\xF3 match"), [];
      console.log("[PlutoTV DEBUG] Match elegido: " + (c.name || c.title || c.slug || "sin nombre"));
      let u = null;
      if (n === "movie") {
        let h = yield C(c, r);
        u = x(h);
      } else if (n === "tv") {
        let h = c.seriesID || c._id || c.id || null;
        if (h) {
          let y = yield D(r, c.id);
          console.log("[PlutoTV] Seasons snippet:", JSON.stringify(y).substring(0, 2e3));
          let U = G(y, s, i);
          U && (u = x(U)), console.log("[PlutoTV] seriesId:", h);
        }
        u || (u = x(c));
      }
      if (!u)
        return console.log("[PlutoTV DEBUG] No se encontr\xF3 stitch URL en el match"), [];
      let f = R(u, r), v = yield j(f, { "User-Agent": d["User-Agent"] }), b = n === "tv" ? " S" + s + "E" + i : "";
      return [{ name: "PlutoTV", title: v + " " + (c.name || c.title || media.title) + b, url: f, quality: v, headers: { "User-Agent": d["User-Agent"] } }];
    } catch (e) {
      return console.log("[PlutoTV DEBUG] Error en getStreams: " + e.message), [];
    }
  });
}
