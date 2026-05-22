var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var peliserieshoy_exports = {};
__export(peliserieshoy_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(peliserieshoy_exports);
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var BASE_URL = "https://player.pelisserieshoy.com";
var TMDB_API_KEY = "439c478a771f35c05022f9feabcca01c";
var LANG_PRIORITY = ["LAT", "ESP", "SUB"];
function getImdbId(tmdbId, mediaType) {
  return __async(this, null, function* () {
    const endpoint = mediaType === "movie" ? `https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=${TMDB_API_KEY}` : `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=${TMDB_API_KEY}`;
    const data = yield fetch(endpoint, { headers: { "User-Agent": UA } }).then((r) => r.json());
    return data.imdb_id || null;
  });
}
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    if (!tmdbId || !mediaType)
      return [];
    const startTime = Date.now();
    console.log(`[PelisSeriesHoy] Buscando: TMDB ${tmdbId} (${mediaType})`);
    try {
      let resolveServer2 = function(lbl, hash, langLabel) {
        return __async(this, null, function* () {
          try {
            const d = yield fetch(`${BASE_URL}/s.php`, {
              method: "POST",
              headers: __spreadProps(__spreadValues({}, headers), { "Referer": htmlUrl }),
              body: new URLSearchParams({ a: "2", v: hash, tok }).toString()
            }).then((r) => r.json());
            if (d.u && d.sig) {
              const proxyUrl = `${BASE_URL}/p.php?url=${encodeURIComponent(d.u)}&sig=${encodeURIComponent(d.sig)}`;
              const serverNameClean = lbl.replace(/[^a-zA-Z0-9 ]/g, "").trim() || d.src || "Server";
              return {
                name: "PelisSeriesHoy",
                title: `1080p \xB7 ${langLabel} \xB7 ${serverNameClean}`,
                url: proxyUrl,
                quality: "1080p",
                headers: { "Referer": BASE_URL }
                // Header vital para pasar el proxy
              };
            }
            if (d.type === "mp4" && d.u) {
              const serverNameClean = lbl.replace(/[^a-zA-Z0-9 ]/g, "").trim() || "Directo";
              return {
                name: "PelisSeriesHoy",
                title: `1080p \xB7 ${langLabel} \xB7 ${serverNameClean}`,
                url: d.u,
                quality: "1080p",
                headers: { "Referer": BASE_URL }
              };
            }
          } catch (e) {
            console.log(`[PelisSeriesHoy] Error en resolver ${lbl}: ${e.message}`);
          }
          return null;
        });
      };
      var resolveServer = resolveServer2;
      const imdbId = yield getImdbId(tmdbId, mediaType);
      if (!imdbId)
        return [];
      let urlSlug = imdbId;
      if (mediaType === "tv") {
        const e = String(episode).padStart(2, "0");
        urlSlug = `${imdbId}-${parseInt(season)}x${e}`;
      }
      const htmlUrl = `${BASE_URL}/f/${urlSlug}`;
      console.log(`[PelisSeriesHoy] Fetching HTML: ${htmlUrl}`);
      const headers = {
        "User-Agent": UA,
        "Referer": "https://sololatino.net/",
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const html = yield fetch(htmlUrl, { headers }).then((r) => r.text());
      const tokenMatch = html.match(/const _t\s*=\s*'([^']+)'/);
      if (!tokenMatch) {
        console.log("[PelisSeriesHoy] No se encontr\xF3 el token de sesi\xF3n (_t)");
        return [];
      }
      const tok = tokenMatch[1];
      yield fetch(`${BASE_URL}/s.php`, {
        method: "POST",
        headers: __spreadProps(__spreadValues({}, headers), { "Referer": htmlUrl }),
        body: new URLSearchParams({ a: "click", tok }).toString()
      });
      const scanData = yield fetch(`${BASE_URL}/s.php`, {
        method: "POST",
        headers: __spreadProps(__spreadValues({}, headers), { "Referer": htmlUrl }),
        body: new URLSearchParams({ a: "1", tok }).toString()
      }).then((r) => r.json());
      if (!scanData || !scanData.langs_s)
        return [];
      const streams = [];
      for (const lang of LANG_PRIORITY) {
        const servers = scanData.langs_s[lang];
        if (!servers || servers.length === 0)
          continue;
        const langLabel = lang === "LAT" ? "Latino" : lang === "ESP" ? "Espa\xF1ol" : "Subtitulado";
        console.log(`[PelisSeriesHoy] Resolviendo ${servers.length} servidores en ${langLabel}...`);
        const results = yield Promise.all(
          servers.map((serverInfo) => resolveServer2(serverInfo[0], serverInfo[1], langLabel))
        );
        const validStreams = results.filter((r) => r !== null);
        if (validStreams.length > 0) {
          streams.push(...validStreams);
          break;
        }
      }
      const elapsed = ((Date.now() - startTime) / 1e3).toFixed(2);
      console.log(`[PelisSeriesHoy] \u2713 ${streams.length} streams en ${elapsed}s`);
      return streams;
    } catch (err) {
      console.error(`[PelisSeriesHoy] Error: ${err.message}`);
      return [];
    }
  });
}
