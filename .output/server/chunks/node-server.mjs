globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

function isObject$1(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject$1(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject$1(value) && isObject$1(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/api/**":{"proxy":{"to":"http://localhost:3000/**","_proxyStripBase":"/api"}},"/images/**":{"proxy":{"to":"http://localhost:3000/images/**","_proxyStripBase":"/images"}},"/sw.js":{"headers":{"Cache-Control":"public, max-age=0, must-revalidate"}},"/manifest.webmanifest":{"headers":{"Content-Type":"application/manifest+json","Cache-Control":"public, max-age=0, must-revalidate"}},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"\",t=\"\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _QHDBUDl9uP = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _QHDBUDl9uP
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"bde-W/NsBBTBXb8LAIxQ/um4bIAQOB4\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 3038,
    "path": "../public/apple-touch-icon.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-hcFA+Spzq/s/QET4QirWSOed7h0\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"1df-PW6O40xRUALny9RBp2jM1VNBfhs\"",
    "mtime": "2023-06-01T08:40:37.079Z",
    "size": 479,
    "path": "../public/manifest.webmanifest"
  },
  "/maskable-icon.png": {
    "type": "image/png",
    "etag": "\"11db-Xp1FEW+nABqCs4AV8yeLLtc6N+4\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 4571,
    "path": "../public/maskable-icon.png"
  },
  "/nuxt.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c0-zTfGEIaPrno0cGypzpawhE/FLvs\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 1216,
    "path": "../public/nuxt.svg"
  },
  "/pwa-192x192.png": {
    "type": "image/png",
    "etag": "\"cab-vN6XDfHwQKRh30rUtZHMRypMfr4\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 3243,
    "path": "../public/pwa-192x192.png"
  },
  "/pwa-512x512.png": {
    "type": "image/png",
    "etag": "\"1c26-JUKxnM0jjzuGrhkxljlFBbLF/VM\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 7206,
    "path": "../public/pwa-512x512.png"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"c92-QksQklEXb6IGQo1UgrCfCCz3nLc\"",
    "mtime": "2023-06-01T08:40:52.174Z",
    "size": 3218,
    "path": "../public/sw.js"
  },
  "/vite.png": {
    "type": "image/png",
    "etag": "\"daa-9QB0vADWlAJoHjvml3HVjIqSvUs\"",
    "mtime": "2023-05-10T16:03:30.000Z",
    "size": 3498,
    "path": "../public/vite.png"
  },
  "/workbox-118fddf1.js": {
    "type": "application/javascript",
    "etag": "\"5579-ImenQs6LWUOAoHRiY/xDcNuiK8Y\"",
    "mtime": "2023-06-01T08:40:52.176Z",
    "size": 21881,
    "path": "../public/workbox-118fddf1.js"
  },
  "/_nuxt/blog.511be74c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"53d-GTJLZrM3sMz5Av7htPW8vC4CI/E\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 1341,
    "path": "../public/_nuxt/blog.511be74c.css"
  },
  "/_nuxt/blog.a7a9fa7d.js": {
    "type": "application/javascript",
    "etag": "\"1ce6-EAM1hd7McYBFs3tgTLF689tO2lc\"",
    "mtime": "2023-06-01T08:40:37.066Z",
    "size": 7398,
    "path": "../public/_nuxt/blog.a7a9fa7d.js"
  },
  "/_nuxt/client-only.102ce02d.js": {
    "type": "application/javascript",
    "etag": "\"1d4-1rEDw75ThEh/UlhMCCy+CWTgKRY\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 468,
    "path": "../public/_nuxt/client-only.102ce02d.js"
  },
  "/_nuxt/default.3eed31c9.js": {
    "type": "application/javascript",
    "etag": "\"fbd-KXlodwvcM+98O3cmXEsqJ+cIu9Y\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 4029,
    "path": "../public/_nuxt/default.3eed31c9.js"
  },
  "/_nuxt/demos.9e433908.js": {
    "type": "application/javascript",
    "etag": "\"1d3-dUlzJYxcUVjOLVXrofduQwwygTM\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 467,
    "path": "../public/_nuxt/demos.9e433908.js"
  },
  "/_nuxt/entry.ceb2f081.js": {
    "type": "application/javascript",
    "etag": "\"280ba-B8bj64v/eIE0QLKzbNDm1ij11b4\"",
    "mtime": "2023-06-01T08:40:37.066Z",
    "size": 164026,
    "path": "../public/_nuxt/entry.ceb2f081.js"
  },
  "/_nuxt/entry.faa5d5d4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"617b-UKgMs7Ejj2vIP3F1pYfXkRHx0CY\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 24955,
    "path": "../public/_nuxt/entry.faa5d5d4.css"
  },
  "/_nuxt/error-404.53e0d6a2.js": {
    "type": "application/javascript",
    "etag": "\"90a-/9mj1RQPoAGmo70b9mKFIpBihvM\"",
    "mtime": "2023-06-01T08:40:37.063Z",
    "size": 2314,
    "path": "../public/_nuxt/error-404.53e0d6a2.js"
  },
  "/_nuxt/error-404.dd29d79a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-JYQmAncl9ODY78yRqUt9FOyUmA4\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.dd29d79a.css"
  },
  "/_nuxt/error-500.26873dcc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-fa2OB1jZnGuSyj7jz6LP6nKsFoY\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.26873dcc.css"
  },
  "/_nuxt/error-500.85beac19.js": {
    "type": "application/javascript",
    "etag": "\"78e-sekSguue0L0J1hCI7uudEx2Fm4s\"",
    "mtime": "2023-06-01T08:40:37.066Z",
    "size": 1934,
    "path": "../public/_nuxt/error-500.85beac19.js"
  },
  "/_nuxt/error-component.5204d79e.js": {
    "type": "application/javascript",
    "etag": "\"4d9-2DDD+tpsnbsbA8lOfOQ+1zdNzqI\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 1241,
    "path": "../public/_nuxt/error-component.5204d79e.js"
  },
  "/_nuxt/Footer.0b93ca84.js": {
    "type": "application/javascript",
    "etag": "\"101c-e3/wVT65n9fUYr8VhMrDvKYBBa4\"",
    "mtime": "2023-06-01T08:40:37.066Z",
    "size": 4124,
    "path": "../public/_nuxt/Footer.0b93ca84.js"
  },
  "/_nuxt/Footer.ad183bf5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"106-3Kl5AUhSQWZ5/Wo4A2tXLnTUgtQ\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 262,
    "path": "../public/_nuxt/Footer.ad183bf5.css"
  },
  "/_nuxt/index.1f85c339.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f30-axJKuU1Ds6pbqfvOIZ0LIK6IIV0\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 12080,
    "path": "../public/_nuxt/index.1f85c339.css"
  },
  "/_nuxt/index.489ae96c.js": {
    "type": "application/javascript",
    "etag": "\"8bde-jSetel8zKsIzlRBcVWQGG49RC94\"",
    "mtime": "2023-06-01T08:40:37.066Z",
    "size": 35806,
    "path": "../public/_nuxt/index.489ae96c.js"
  },
  "/_nuxt/index.96b08b23.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"878-D23pPbXtkRD8BNimaWt1qvtpJks\"",
    "mtime": "2023-06-01T08:40:37.059Z",
    "size": 2168,
    "path": "../public/_nuxt/index.96b08b23.css"
  },
  "/_nuxt/index.b7b3eede.js": {
    "type": "application/javascript",
    "etag": "\"3e2-TAC75hJk8Mo2OfR/KM8rx39QMt8\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 994,
    "path": "../public/_nuxt/index.b7b3eede.js"
  },
  "/_nuxt/index.f2eb07ba.js": {
    "type": "application/javascript",
    "etag": "\"146-mx55KV03SMD1IVhmWvtC/SEtUIQ\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 326,
    "path": "../public/_nuxt/index.f2eb07ba.js"
  },
  "/_nuxt/index.f74f8708.js": {
    "type": "application/javascript",
    "etag": "\"23c8-/oIh7sb/1qzVh4H9Taa1FnDjEZs\"",
    "mtime": "2023-06-01T08:40:37.062Z",
    "size": 9160,
    "path": "../public/_nuxt/index.f74f8708.js"
  },
  "/_nuxt/index.ffa419b1.js": {
    "type": "application/javascript",
    "etag": "\"159d-MxWbiqWtyZkms816jK3zpCJs0d8\"",
    "mtime": "2023-06-01T08:40:37.062Z",
    "size": 5533,
    "path": "../public/_nuxt/index.ffa419b1.js"
  },
  "/_nuxt/nuxt-link.7d0ba829.js": {
    "type": "application/javascript",
    "etag": "\"10e9-moC5n0OMCSpsSoOna2Q++U7J7cI\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 4329,
    "path": "../public/_nuxt/nuxt-link.7d0ba829.js"
  },
  "/_nuxt/workbox-window.prod.es5.dc90f814.js": {
    "type": "application/javascript",
    "etag": "\"14a9-f+VD9+jGbxRSAYS8alrqDRXPmw4\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 5289,
    "path": "../public/_nuxt/workbox-window.prod.es5.dc90f814.js"
  },
  "/_nuxt/_...all_.1a0122ea.js": {
    "type": "application/javascript",
    "etag": "\"a8-oF4HgMq8hb7ZOunKt+EsufTLMPU\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 168,
    "path": "../public/_nuxt/_...all_.1a0122ea.js"
  },
  "/_nuxt/_id_.1600db41.js": {
    "type": "application/javascript",
    "etag": "\"10b496-s3CfRnKqCeAHlSon3Sh8rWqb0PE\"",
    "mtime": "2023-06-01T08:40:37.067Z",
    "size": 1094806,
    "path": "../public/_nuxt/_id_.1600db41.js"
  },
  "/_nuxt/_id_.9c8e419e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8ce2-3hrGyRmT9PecDBsg8kc5Y14Kcy0\"",
    "mtime": "2023-06-01T08:40:37.055Z",
    "size": 36066,
    "path": "../public/_nuxt/_id_.9c8e419e.css"
  },
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2023-06-01T08:40:37.061Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.c27b6911.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_s7pkWg = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_s7pkWg, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_s7pkWg, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, defu as d, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
