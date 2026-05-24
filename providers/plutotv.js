var g = Object.defineProperty;
var S = Object.getOwnPropertyDescriptor;
var E = Object.getOwnPropertyNames;
var b = Object.prototype.hasOwnProperty;
var P = (t, e) => {
  for (var n in e)
    g(t, n, { get: e[n], enumerable: true });
}, I = (t, e, n, c) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of E(e))
      !b.call(t, s) && s !== n && g(t, s, { get: () => e[s], enumerable: !(c = S(e, s)) || c.enumerable });
  return t;
};
var V = (t) => I(g({}, "__esModule", { value: true }), t);
var p = (t, e, n) => new Promise((c, s) => {
  var l = (i) => {
    try {
      r(n.next(i));
    } catch (a) {
      s(a);
    }
  }, o = (i) => {
    try {
      r(n.throw(i));
    } catch (a) {
      s(a);
    }
  }, r = (i) => i.done ? c(i.value) : Promise.resolve(i.value).then(l, o);
  r((n = n.apply(t, e)).next());
});
var L = {};
P(L, { getStreams: () => R });
module.exports = V(L);
var A = "439c478a771f35c05022f9feabcca01c", d = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", Accept: "application/json, text/plain, */*", Origin: "https://pluto.tv", Referer: "https://pluto.tv/" };
function B(t, e) {
  return p(this, null, function* () {
    let n = [], c = {};
    function s(l) {
      let o = String(l || "").trim();
      !o || c[o] || (c[o] = true, n.push(o));
    }
    for (let l of ["es-MX", "es-ES", "en-US"])
      try {
        let o = `https://api.themoviedb.org/3/${e}/${t}?api_key=${A}&language=${l}`, r = yield fetch(o).then((u) => u.json()), i = e === "movie" ? r.title : r.name, a = e === "movie" ? r.original_title : r.original_name;
        s(i), s(a);
      } catch (o) {
      }
    return n;
  });
}
function M(t, e) {
  return p(this, null, function* () {
    try {
      let n = `https://service-media-search.clusters.pluto.tv/v1/search?q=${encodeURIComponent(t)}&limit=30`;
      return (yield (yield fetch(n, { headers: { authorization: "Bearer " + e.sessionToken, origin: "https://pluto.tv", referer: "https://pluto.tv/", "user-agent": d["User-Agent"] } })).json()).data || [];
    } catch (n) {
      return [];
    }
  });
}
function w(t) {
  return String(t || "").toLowerCase().replace(/[!\-:'".,]/g, " ").replace(/\s+/g, " ").trim();
}
function k(t, e, n) {
  return p(this, null, function* () {
    for (let c of t) {
      let s = yield M(c, n);
      console.log('[PlutoTV] B\xFAsqueda "' + c + '":', JSON.stringify(s.map((o) => ({ name: o.name, type: o.type, id: o.id }))));
      let l = e === "movie" ? "movie" : "series";
      for (let o of s) {
        if (o.type !== l)
          continue;
        let r = w(o.name), i = w(c);
        if (r === i || r.startsWith(i) || i.startsWith(r))
          return console.log(`[PlutoTV] Match: "${o.name}" (slug: ${o.slug})`), o;
      }
    }
    return null;
  });
}
function N(t) {
  let e = [];
  for (let n in t)
    Object.prototype.hasOwnProperty.call(t, n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e.join("&");
}
function m() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    let e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
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
function D(t, e) {
  return p(this, null, function* () {
    let n = { accept: "application/json, text/javascript, */*; q=0.01", authorization: "Bearer " + t.sessionToken, origin: "https://pluto.tv", referer: "https://pluto.tv/", "user-agent": d["User-Agent"] }, c = "https://api.pluto.tv/v3/vod/series/" + e + "/seasons?includeItems=true&deviceType=web";
    try {
      let s = yield fetch(c, { method: "GET", headers: n });
      if (console.log("[PlutoTV DEBUG] Seasons status: " + s.status), !s.ok) {
        let l = yield s.text();
        return console.log("[PlutoTV DEBUG] Seasons error body: " + l), null;
      }
      return yield s.json();
    } catch (s) {
      return console.log("[PlutoTV DEBUG] Excepci\xF3n seasons Pluto: " + s.message), null;
    }
  });
}
function G(t, e, n) {
  if (!t)
    return null;
  let c = parseInt(e, 10), s = parseInt(n, 10), l = t.seasons || (Array.isArray(t) ? t : []);
  for (let o of l) {
    let r = o.episodes || o.items || [];
    for (let i of r) {
      let a = parseInt(i.season || i.seasonNumber || 0, 10), u = parseInt(i.number || i.episode || i.episodeNumber || 0, 10), f = u % 100;
      if (a === c && (u === s || f === s))
        return i;
    }
  }
  return null;
}
function j(t, e) {
  return p(this, null, function* () {
    try {
      let c = yield (yield fetch(t, { method: "GET", headers: e || {}, redirect: "follow" })).text();
      if (!c.includes("#EXT-X-STREAM-INF")) {
        let r = t.match(/[_-](\d{3,4})p/);
        return r ? r[1] + "p" : "1080p";
      }
      let s = 0, l = 0, o = c.split(`
`);
      for (let r = 0; r < o.length; r++) {
        let a = o[r].match(/RESOLUTION=(\d+)x(\d+)/);
        if (a) {
          let u = parseInt(a[1], 10), f = parseInt(a[2], 10);
          f > s && (s = f, l = u);
        }
      }
      return s >= 2160 || l >= 3840 ? "4K" : s >= 1080 || l >= 1920 ? "1080p" : s >= 720 || l >= 1280 ? "720p" : s >= 480 || l >= 854 ? "480p" : "360p";
    } catch (n) {
      return "1080p";
    }
  });
}
function C(t, e) {
  return p(this, null, function* () {
    try {
      let n = `https://api.pluto.tv/v3/vod/slugs/${t.slug}?deviceType=web`;
      return yield (yield fetch(n, { headers: { authorization: "Bearer " + e.sessionToken, origin: "https://pluto.tv", referer: "https://pluto.tv/", "user-agent": d["User-Agent"] } })).json();
    } catch (n) {
      return null;
    }
  });
}
function O(t, e) {
  let n = t.indexOf("?") === -1 ? "?" : "&";
  return t + n + e.stitcherParams + "&jwt=" + e.sessionToken;
}
function R(t, e, n, c) {
  return p(this, null, function* () {
    if (!t || !e)
      return [];
    try {
      let s = { appName: "web", appVersion: "9.0.0", deviceVersion: "120.0.0", deviceType: "web", deviceMake: "Chrome", deviceModel: "web", sid: m(), clientID: m(), clientModelNumber: "na", drmCapabilities: "widevine:L3", includeExtendedEvents: "false" }, l = "https://boot.pluto.tv/v4/start?" + N(s);
      console.log("[PlutoTV DEBUG] URL de Handshake: " + l);
      let o = yield fetch(l, { method: "GET", headers: d });
      if (!o.ok) {
        let h = yield o.text();
        return console.log("[PlutoTV DEBUG] Handshake fallido. Status: " + o.status), console.log("[PlutoTV DEBUG] Cuerpo del error: " + h), [];
      }
      let r = yield o.json();
      if (!r.sessionToken)
        return console.log("[PlutoTV DEBUG] Error: No se recibi\xF3 sessionToken"), [];
      let i = yield B(t, e);
      console.log("[PlutoTV] Candidatos: " + JSON.stringify(i));
      let a = yield k(i, e, r);
      if (!a)
        return console.log("[PlutoTV] No se encontr\xF3 match"), [];
      console.log("[PlutoTV DEBUG] Match elegido: " + (a.name || a.title || a.slug || "sin nombre"));
      let u = null;
      if (e === "movie") {
        let h = yield C(a, r);
        u = x(h);
      } else if (e === "tv") {
        let h = a.seriesID || a._id || a.id || null;
        if (h) {
          let y = yield D(r, a.id);
          console.log("[PlutoTV] Seasons snippet:", JSON.stringify(y).substring(0, 2e3));
          let U = G(y, n, c);
          U && (u = x(U)), console.log("[PlutoTV] seriesId:", h);
        }
        u || (u = x(a));
      }
      if (!u)
        return console.log("[PlutoTV DEBUG] No se encontr\xF3 stitch URL en el match"), [];
      let f = O(u, r), v = yield j(f, { "User-Agent": d["User-Agent"] }), T = e === "tv" ? " S" + n + "E" + c : "";
      return [{ name: "PlutoTV", title: v + (a.name || a.title || media.title) + T, url: f, quality: v, headers: { "User-Agent": d["User-Agent"] } }];
    } catch (s) {
      return console.log("[PlutoTV DEBUG] Error en getStreams: " + s.message), [];
    }
  });
}
