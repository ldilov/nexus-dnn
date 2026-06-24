function JE(e, a) {
  for (var i = 0; i < a.length; i++) {
    const l = a[i];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const s in l)
        if (s !== "default" && !(s in e)) {
          const u = Object.getOwnPropertyDescriptor(l, s);
          u && Object.defineProperty(e, s, u.get ? u : {
            enumerable: !0,
            get: () => l[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function xm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nh = { exports: {} }, Do = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kv;
function e2() {
  if (Kv) return Do;
  Kv = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(l, s, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), s.key !== void 0 && (c = "" + s.key), "key" in s) {
      u = {};
      for (var d in s)
        d !== "key" && (u[d] = s[d]);
    } else u = s;
    return s = u.ref, {
      $$typeof: e,
      type: l,
      key: c,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return Do.Fragment = a, Do.jsx = i, Do.jsxs = i, Do;
}
var Wv;
function t2() {
  return Wv || (Wv = 1, nh.exports = e2()), nh.exports;
}
var v = t2(), ah = { exports: {} }, Ie = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jv;
function n2() {
  if (Jv) return Ie;
  Jv = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), b = Symbol.iterator;
  function x(j) {
    return j === null || typeof j != "object" ? null : (j = b && j[b] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, R = Object.assign, C = {};
  function N(j, k, G) {
    this.props = j, this.context = k, this.refs = C, this.updater = G || w;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(j, k) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, k, "setState");
  }, N.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function D() {
  }
  D.prototype = N.prototype;
  function E(j, k, G) {
    this.props = j, this.context = k, this.refs = C, this.updater = G || w;
  }
  var O = E.prototype = new D();
  O.constructor = E, R(O, N.prototype), O.isPureReactComponent = !0;
  var H = Array.isArray;
  function B() {
  }
  var U = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function I(j, k, G) {
    var ee = G.ref;
    return {
      $$typeof: e,
      type: j,
      key: k,
      ref: ee !== void 0 ? ee : null,
      props: G
    };
  }
  function Q(j, k) {
    return I(j.type, k, j.props);
  }
  function $(j) {
    return typeof j == "object" && j !== null && j.$$typeof === e;
  }
  function K(j) {
    var k = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(G) {
      return k[G];
    });
  }
  var ne = /\/+/g;
  function L(j, k) {
    return typeof j == "object" && j !== null && j.key != null ? K("" + j.key) : k.toString(36);
  }
  function Y(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(B, B) : (j.status = "pending", j.then(
          function(k) {
            j.status === "pending" && (j.status = "fulfilled", j.value = k);
          },
          function(k) {
            j.status === "pending" && (j.status = "rejected", j.reason = k);
          }
        )), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason;
        }
    }
    throw j;
  }
  function T(j, k, G, ee, se) {
    var de = typeof j;
    (de === "undefined" || de === "boolean") && (j = null);
    var he = !1;
    if (j === null) he = !0;
    else
      switch (de) {
        case "bigint":
        case "string":
        case "number":
          he = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case e:
            case a:
              he = !0;
              break;
            case y:
              return he = j._init, T(
                he(j._payload),
                k,
                G,
                ee,
                se
              );
          }
      }
    if (he)
      return se = se(j), he = ee === "" ? "." + L(j, 0) : ee, H(se) ? (G = "", he != null && (G = he.replace(ne, "$&/") + "/"), T(se, k, G, "", function(De) {
        return De;
      })) : se != null && ($(se) && (se = Q(
        se,
        G + (se.key == null || j && j.key === se.key ? "" : ("" + se.key).replace(
          ne,
          "$&/"
        ) + "/") + he
      )), k.push(se)), 1;
    he = 0;
    var J = ee === "" ? "." : ee + ":";
    if (H(j))
      for (var ve = 0; ve < j.length; ve++)
        ee = j[ve], de = J + L(ee, ve), he += T(
          ee,
          k,
          G,
          de,
          se
        );
    else if (ve = x(j), typeof ve == "function")
      for (j = ve.call(j), ve = 0; !(ee = j.next()).done; )
        ee = ee.value, de = J + L(ee, ve++), he += T(
          ee,
          k,
          G,
          de,
          se
        );
    else if (de === "object") {
      if (typeof j.then == "function")
        return T(
          Y(j),
          k,
          G,
          ee,
          se
        );
      throw k = String(j), Error(
        "Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return he;
  }
  function z(j, k, G) {
    if (j == null) return j;
    var ee = [], se = 0;
    return T(j, ee, "", "", function(de) {
      return k.call(G, de, se++);
    }), ee;
  }
  function F(j) {
    if (j._status === -1) {
      var k = j._result;
      k = k(), k.then(
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = G);
        },
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = G);
        }
      ), j._status === -1 && (j._status = 0, j._result = k);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var X = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var k = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(k)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  }, ae = {
    map: z,
    forEach: function(j, k, G) {
      z(
        j,
        function() {
          k.apply(this, arguments);
        },
        G
      );
    },
    count: function(j) {
      var k = 0;
      return z(j, function() {
        k++;
      }), k;
    },
    toArray: function(j) {
      return z(j, function(k) {
        return k;
      }) || [];
    },
    only: function(j) {
      if (!$(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return Ie.Activity = g, Ie.Children = ae, Ie.Component = N, Ie.Fragment = i, Ie.Profiler = s, Ie.PureComponent = E, Ie.StrictMode = l, Ie.Suspense = p, Ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U, Ie.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return U.H.useMemoCache(j);
    }
  }, Ie.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, Ie.cacheSignal = function() {
    return null;
  }, Ie.cloneElement = function(j, k, G) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var ee = R({}, j.props), se = j.key;
    if (k != null)
      for (de in k.key !== void 0 && (se = "" + k.key), k)
        !A.call(k, de) || de === "key" || de === "__self" || de === "__source" || de === "ref" && k.ref === void 0 || (ee[de] = k[de]);
    var de = arguments.length - 2;
    if (de === 1) ee.children = G;
    else if (1 < de) {
      for (var he = Array(de), J = 0; J < de; J++)
        he[J] = arguments[J + 2];
      ee.children = he;
    }
    return I(j.type, se, ee);
  }, Ie.createContext = function(j) {
    return j = {
      $$typeof: c,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: u,
      _context: j
    }, j;
  }, Ie.createElement = function(j, k, G) {
    var ee, se = {}, de = null;
    if (k != null)
      for (ee in k.key !== void 0 && (de = "" + k.key), k)
        A.call(k, ee) && ee !== "key" && ee !== "__self" && ee !== "__source" && (se[ee] = k[ee]);
    var he = arguments.length - 2;
    if (he === 1) se.children = G;
    else if (1 < he) {
      for (var J = Array(he), ve = 0; ve < he; ve++)
        J[ve] = arguments[ve + 2];
      se.children = J;
    }
    if (j && j.defaultProps)
      for (ee in he = j.defaultProps, he)
        se[ee] === void 0 && (se[ee] = he[ee]);
    return I(j, de, se);
  }, Ie.createRef = function() {
    return { current: null };
  }, Ie.forwardRef = function(j) {
    return { $$typeof: d, render: j };
  }, Ie.isValidElement = $, Ie.lazy = function(j) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: j },
      _init: F
    };
  }, Ie.memo = function(j, k) {
    return {
      $$typeof: m,
      type: j,
      compare: k === void 0 ? null : k
    };
  }, Ie.startTransition = function(j) {
    var k = U.T, G = {};
    U.T = G;
    try {
      var ee = j(), se = U.S;
      se !== null && se(G, ee), typeof ee == "object" && ee !== null && typeof ee.then == "function" && ee.then(B, X);
    } catch (de) {
      X(de);
    } finally {
      k !== null && G.types !== null && (k.types = G.types), U.T = k;
    }
  }, Ie.unstable_useCacheRefresh = function() {
    return U.H.useCacheRefresh();
  }, Ie.use = function(j) {
    return U.H.use(j);
  }, Ie.useActionState = function(j, k, G) {
    return U.H.useActionState(j, k, G);
  }, Ie.useCallback = function(j, k) {
    return U.H.useCallback(j, k);
  }, Ie.useContext = function(j) {
    return U.H.useContext(j);
  }, Ie.useDebugValue = function() {
  }, Ie.useDeferredValue = function(j, k) {
    return U.H.useDeferredValue(j, k);
  }, Ie.useEffect = function(j, k) {
    return U.H.useEffect(j, k);
  }, Ie.useEffectEvent = function(j) {
    return U.H.useEffectEvent(j);
  }, Ie.useId = function() {
    return U.H.useId();
  }, Ie.useImperativeHandle = function(j, k, G) {
    return U.H.useImperativeHandle(j, k, G);
  }, Ie.useInsertionEffect = function(j, k) {
    return U.H.useInsertionEffect(j, k);
  }, Ie.useLayoutEffect = function(j, k) {
    return U.H.useLayoutEffect(j, k);
  }, Ie.useMemo = function(j, k) {
    return U.H.useMemo(j, k);
  }, Ie.useOptimistic = function(j, k) {
    return U.H.useOptimistic(j, k);
  }, Ie.useReducer = function(j, k, G) {
    return U.H.useReducer(j, k, G);
  }, Ie.useRef = function(j) {
    return U.H.useRef(j);
  }, Ie.useState = function(j) {
    return U.H.useState(j);
  }, Ie.useSyncExternalStore = function(j, k, G) {
    return U.H.useSyncExternalStore(
      j,
      k,
      G
    );
  }, Ie.useTransition = function() {
    return U.H.useTransition();
  }, Ie.version = "19.2.7", Ie;
}
var ey;
function us() {
  return ey || (ey = 1, ah.exports = n2()), ah.exports;
}
var S = us();
const be = /* @__PURE__ */ xm(S), a2 = /* @__PURE__ */ JE({
  __proto__: null,
  default: be
}, [S]);
var rh = { exports: {} }, Ao = {}, ih = { exports: {} }, lh = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ty;
function r2() {
  return ty || (ty = 1, (function(e) {
    function a(T, z) {
      var F = T.length;
      T.push(z);
      e: for (; 0 < F; ) {
        var X = F - 1 >>> 1, ae = T[X];
        if (0 < s(ae, z))
          T[X] = z, T[F] = ae, F = X;
        else break e;
      }
    }
    function i(T) {
      return T.length === 0 ? null : T[0];
    }
    function l(T) {
      if (T.length === 0) return null;
      var z = T[0], F = T.pop();
      if (F !== z) {
        T[0] = F;
        e: for (var X = 0, ae = T.length, j = ae >>> 1; X < j; ) {
          var k = 2 * (X + 1) - 1, G = T[k], ee = k + 1, se = T[ee];
          if (0 > s(G, F))
            ee < ae && 0 > s(se, G) ? (T[X] = se, T[ee] = F, X = ee) : (T[X] = G, T[k] = F, X = k);
          else if (ee < ae && 0 > s(se, F))
            T[X] = se, T[ee] = F, X = ee;
          else break e;
        }
      }
      return z;
    }
    function s(T, z) {
      var F = T.sortIndex - z.sortIndex;
      return F !== 0 ? F : T.id - z.id;
    }
    if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      e.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, d = c.now();
      e.unstable_now = function() {
        return c.now() - d;
      };
    }
    var p = [], m = [], y = 1, g = null, b = 3, x = !1, w = !1, R = !1, C = !1, N = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function O(T) {
      for (var z = i(m); z !== null; ) {
        if (z.callback === null) l(m);
        else if (z.startTime <= T)
          l(m), z.sortIndex = z.expirationTime, a(p, z);
        else break;
        z = i(m);
      }
    }
    function H(T) {
      if (R = !1, O(T), !w)
        if (i(p) !== null)
          w = !0, B || (B = !0, K());
        else {
          var z = i(m);
          z !== null && Y(H, z.startTime - T);
        }
    }
    var B = !1, U = -1, A = 5, I = -1;
    function Q() {
      return C ? !0 : !(e.unstable_now() - I < A);
    }
    function $() {
      if (C = !1, B) {
        var T = e.unstable_now();
        I = T;
        var z = !0;
        try {
          e: {
            w = !1, R && (R = !1, D(U), U = -1), x = !0;
            var F = b;
            try {
              t: {
                for (O(T), g = i(p); g !== null && !(g.expirationTime > T && Q()); ) {
                  var X = g.callback;
                  if (typeof X == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var ae = X(
                      g.expirationTime <= T
                    );
                    if (T = e.unstable_now(), typeof ae == "function") {
                      g.callback = ae, O(T), z = !0;
                      break t;
                    }
                    g === i(p) && l(p), O(T);
                  } else l(p);
                  g = i(p);
                }
                if (g !== null) z = !0;
                else {
                  var j = i(m);
                  j !== null && Y(
                    H,
                    j.startTime - T
                  ), z = !1;
                }
              }
              break e;
            } finally {
              g = null, b = F, x = !1;
            }
            z = void 0;
          }
        } finally {
          z ? K() : B = !1;
        }
      }
    }
    var K;
    if (typeof E == "function")
      K = function() {
        E($);
      };
    else if (typeof MessageChannel < "u") {
      var ne = new MessageChannel(), L = ne.port2;
      ne.port1.onmessage = $, K = function() {
        L.postMessage(null);
      };
    } else
      K = function() {
        N($, 0);
      };
    function Y(T, z) {
      U = N(function() {
        T(e.unstable_now());
      }, z);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, e.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < T ? Math.floor(1e3 / T) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, e.unstable_next = function(T) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = b;
      }
      var F = b;
      b = z;
      try {
        return T();
      } finally {
        b = F;
      }
    }, e.unstable_requestPaint = function() {
      C = !0;
    }, e.unstable_runWithPriority = function(T, z) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var F = b;
      b = T;
      try {
        return z();
      } finally {
        b = F;
      }
    }, e.unstable_scheduleCallback = function(T, z, F) {
      var X = e.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? X + F : X) : F = X, T) {
        case 1:
          var ae = -1;
          break;
        case 2:
          ae = 250;
          break;
        case 5:
          ae = 1073741823;
          break;
        case 4:
          ae = 1e4;
          break;
        default:
          ae = 5e3;
      }
      return ae = F + ae, T = {
        id: y++,
        callback: z,
        priorityLevel: T,
        startTime: F,
        expirationTime: ae,
        sortIndex: -1
      }, F > X ? (T.sortIndex = F, a(m, T), i(p) === null && T === i(m) && (R ? (D(U), U = -1) : R = !0, Y(H, F - X))) : (T.sortIndex = ae, a(p, T), w || x || (w = !0, B || (B = !0, K()))), T;
    }, e.unstable_shouldYield = Q, e.unstable_wrapCallback = function(T) {
      var z = b;
      return function() {
        var F = b;
        b = z;
        try {
          return T.apply(this, arguments);
        } finally {
          b = F;
        }
      };
    };
  })(lh)), lh;
}
var ny;
function i2() {
  return ny || (ny = 1, ih.exports = r2()), ih.exports;
}
var oh = { exports: {} }, hn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ay;
function l2() {
  if (ay) return hn;
  ay = 1;
  var e = us();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var l = {
    d: {
      f: i,
      r: function() {
        throw Error(a(522));
      },
      D: i,
      C: i,
      L: i,
      m: i,
      X: i,
      S: i,
      M: i
    },
    p: 0,
    findDOMNode: null
  }, s = Symbol.for("react.portal");
  function u(p, m, y) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: g == null ? null : "" + g,
      children: p,
      containerInfo: m,
      implementation: y
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(p, m) {
    if (p === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, hn.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(p, m, null, y);
  }, hn.flushSync = function(p) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, hn.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(p, m));
  }, hn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, hn.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, g = d(y, m.crossOrigin), b = typeof m.integrity == "string" ? m.integrity : void 0, x = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? l.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: g,
          integrity: b,
          fetchPriority: x
        }
      ) : y === "script" && l.d.X(p, {
        crossOrigin: g,
        integrity: b,
        fetchPriority: x,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, hn.preinitModule = function(p, m) {
    if (typeof p == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var y = d(
            m.as,
            m.crossOrigin
          );
          l.d.M(p, {
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && l.d.M(p);
  }, hn.preload = function(p, m) {
    if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var y = m.as, g = d(y, m.crossOrigin);
      l.d.L(p, y, {
        crossOrigin: g,
        integrity: typeof m.integrity == "string" ? m.integrity : void 0,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0,
        type: typeof m.type == "string" ? m.type : void 0,
        fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
        referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
        imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
        imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
        media: typeof m.media == "string" ? m.media : void 0
      });
    }
  }, hn.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = d(m.as, m.crossOrigin);
        l.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(p);
  }, hn.requestFormReset = function(p) {
    l.d.r(p);
  }, hn.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, hn.useFormState = function(p, m, y) {
    return c.H.useFormState(p, m, y);
  }, hn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, hn.version = "19.2.7", hn;
}
var ry;
function Ix() {
  if (ry) return oh.exports;
  ry = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), oh.exports = l2(), oh.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iy;
function o2() {
  if (iy) return Ao;
  iy = 1;
  var e = i2(), a = us(), i = Ix();
  function l(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function u(t) {
    var n = t, r = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do
        n = t, (n.flags & 4098) !== 0 && (r = n.return), t = n.return;
      while (t);
    }
    return n.tag === 3 ? r : null;
  }
  function c(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function d(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (u(t) !== t)
      throw Error(l(188));
  }
  function m(t) {
    var n = t.alternate;
    if (!n) {
      if (n = u(t), n === null) throw Error(l(188));
      return n !== t ? null : t;
    }
    for (var r = t, o = n; ; ) {
      var f = r.return;
      if (f === null) break;
      var h = f.alternate;
      if (h === null) {
        if (o = f.return, o !== null) {
          r = o;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === r) return p(f), t;
          if (h === o) return p(f), n;
          h = h.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== o.return) r = f, o = h;
      else {
        for (var _ = !1, M = f.child; M; ) {
          if (M === r) {
            _ = !0, r = f, o = h;
            break;
          }
          if (M === o) {
            _ = !0, o = f, r = h;
            break;
          }
          M = M.sibling;
        }
        if (!_) {
          for (M = h.child; M; ) {
            if (M === r) {
              _ = !0, r = h, o = f;
              break;
            }
            if (M === o) {
              _ = !0, o = h, r = f;
              break;
            }
            M = M.sibling;
          }
          if (!_) throw Error(l(189));
        }
      }
      if (r.alternate !== o) throw Error(l(190));
    }
    if (r.tag !== 3) throw Error(l(188));
    return r.stateNode.current === r ? t : n;
  }
  function y(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (n = y(t), n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var g = Object.assign, b = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), E = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), Q = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ne = Symbol.for("react.client.reference");
  function L(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ne ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case R:
        return "Fragment";
      case N:
        return "Profiler";
      case C:
        return "StrictMode";
      case H:
        return "Suspense";
      case B:
        return "SuspenseList";
      case I:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case E:
          return t.displayName || "Context";
        case D:
          return (t._context.displayName || "Context") + ".Consumer";
        case O:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case U:
          return n = t.displayName || null, n !== null ? n : L(t.type) || "Memo";
        case A:
          n = t._payload, t = t._init;
          try {
            return L(t(n));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, T = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, X = [], ae = -1;
  function j(t) {
    return { current: t };
  }
  function k(t) {
    0 > ae || (t.current = X[ae], X[ae] = null, ae--);
  }
  function G(t, n) {
    ae++, X[ae] = t.current, t.current = n;
  }
  var ee = j(null), se = j(null), de = j(null), he = j(null);
  function J(t, n) {
    switch (G(de, n), G(se, t), G(ee, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? xv(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = xv(n), t = wv(n, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    k(ee), G(ee, t);
  }
  function ve() {
    k(ee), k(se), k(de);
  }
  function De(t) {
    t.memoizedState !== null && G(he, t);
    var n = ee.current, r = wv(n, t.type);
    n !== r && (G(se, t), G(ee, r));
  }
  function Oe(t) {
    se.current === t && (k(ee), k(se)), he.current === t && (k(he), Co._currentValue = F);
  }
  var Ee, we;
  function Me(t) {
    if (Ee === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        Ee = n && n[1] || "", we = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ee + t + we;
  }
  var Ye = !1;
  function ye(t, n) {
    if (!t || Ye) return "";
    Ye = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var fe = function() {
                throw Error();
              };
              if (Object.defineProperty(fe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(fe, []);
                } catch (oe) {
                  var le = oe;
                }
                Reflect.construct(t, [], fe);
              } else {
                try {
                  fe.call();
                } catch (oe) {
                  le = oe;
                }
                t.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                le = oe;
              }
              (fe = t()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && le && typeof oe.stack == "string")
              return [oe.stack, le.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = o.DetermineComponentFrameRoot(), _ = h[0], M = h[1];
      if (_ && M) {
        var q = _.split(`
`), ie = M.split(`
`);
        for (f = o = 0; o < q.length && !q[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < ie.length && !ie[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === q.length || f === ie.length)
          for (o = q.length - 1, f = ie.length - 1; 1 <= o && 0 <= f && q[o] !== ie[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (q[o] !== ie[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || q[o] !== ie[f]) {
                  var ue = `
` + q[o].replace(" at new ", " at ");
                  return t.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", t.displayName)), ue;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      Ye = !1, Error.prepareStackTrace = r;
    }
    return (r = t ? t.displayName || t.name : "") ? Me(r) : "";
  }
  function pe(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Me(t.type);
      case 16:
        return Me("Lazy");
      case 13:
        return t.child !== n && n !== null ? Me("Suspense Fallback") : Me("Suspense");
      case 19:
        return Me("SuspenseList");
      case 0:
      case 15:
        return ye(t.type, !1);
      case 11:
        return ye(t.type.render, !1);
      case 1:
        return ye(t.type, !0);
      case 31:
        return Me("Activity");
      default:
        return "";
    }
  }
  function _e(t) {
    try {
      var n = "", r = null;
      do
        n += pe(t, r), r = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Re = Object.prototype.hasOwnProperty, Ae = e.unstable_scheduleCallback, lt = e.unstable_cancelCallback, Ze = e.unstable_shouldYield, Fe = e.unstable_requestPaint, Ke = e.unstable_now, vt = e.unstable_getCurrentPriorityLevel, yt = e.unstable_ImmediatePriority, Yt = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, pt = e.unstable_LowPriority, ut = e.unstable_IdlePriority, Zn = e.log, _n = e.unstable_setDisableYieldValue, nn = null, Kt = null;
  function Ot(t) {
    if (typeof Zn == "function" && _n(t), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(nn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : Sn, _r = Math.log, Aa = Math.LN2;
  function Sn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (_r(t) / Aa | 0) | 0;
  }
  var ma = 256, Ln = 262144, Qn = 4194304;
  function fn(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Ve(t, n, r) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0, h = t.suspendedLanes, _ = t.pingedLanes;
    t = t.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~h, o !== 0 ? f = fn(o) : (_ &= M, _ !== 0 ? f = fn(_) : r || (r = M & ~t, r !== 0 && (f = fn(r))))) : (M = o & ~h, M !== 0 ? f = fn(M) : _ !== 0 ? f = fn(_) : r || (r = o & ~t, r !== 0 && (f = fn(r)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : f;
  }
  function bt(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function kt(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Vt() {
    var t = Qn;
    return Qn <<= 1, (Qn & 62914560) === 0 && (Qn = 4194304), t;
  }
  function gn(t) {
    for (var n = [], r = 0; 31 > r; r++) n.push(t);
    return n;
  }
  function gt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Wt(t, n, r, o, f, h) {
    var _ = t.pendingLanes;
    t.pendingLanes = r, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= r, t.entangledLanes &= r, t.errorRecoveryDisabledLanes &= r, t.shellSuspendCounter = 0;
    var M = t.entanglements, q = t.expirationTimes, ie = t.hiddenUpdates;
    for (r = _ & ~r; 0 < r; ) {
      var ue = 31 - Ut(r), fe = 1 << ue;
      M[ue] = 0, q[ue] = -1;
      var le = ie[ue];
      if (le !== null)
        for (ie[ue] = null, ue = 0; ue < le.length; ue++) {
          var oe = le[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~fe;
    }
    o !== 0 && pa(t, o, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(_ & ~n));
  }
  function pa(t, n, r) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ut(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | r & 261930;
  }
  function en(t, n) {
    var r = t.entangledLanes |= n;
    for (t = t.entanglements; r; ) {
      var o = 31 - Ut(r), f = 1 << o;
      f & n | t[o] & n && (t[o] |= n), r &= ~f;
    }
  }
  function V(t, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : Z(r), (r & (t.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function Z(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function te(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function me() {
    var t = z.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Yv(t.type));
  }
  function ge(t, n) {
    var r = z.p;
    try {
      return z.p = t, n();
    } finally {
      z.p = r;
    }
  }
  var Ce = Math.random().toString(36).slice(2), xe = "__reactFiber$" + Ce, Ne = "__reactProps$" + Ce, Se = "__reactContainer$" + Ce, ze = "__reactEvents$" + Ce, Le = "__reactListeners$" + Ce, qe = "__reactHandles$" + Ce, Be = "__reactResources$" + Ce, Pe = "__reactMarker$" + Ce;
  function ot(t) {
    delete t[xe], delete t[Ne], delete t[ze], delete t[Le], delete t[qe];
  }
  function Ct(t) {
    var n = t[xe];
    if (n) return n;
    for (var r = t.parentNode; r; ) {
      if (n = r[Se] || r[xe]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (t = Tv(t); t !== null; ) {
            if (r = t[xe]) return r;
            t = Tv(t);
          }
        return n;
      }
      t = r, r = t.parentNode;
    }
    return null;
  }
  function ct(t) {
    if (t = t[xe] || t[Se]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function et(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(l(33));
  }
  function zt(t) {
    var n = t[Be];
    return n || (n = t[Be] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function rt(t) {
    t[Pe] = !0;
  }
  var ja = /* @__PURE__ */ new Set(), kn = {};
  function dn(t, n) {
    an(t, n), an(t + "Capture", n);
  }
  function an(t, n) {
    for (kn[t] = n, t = 0; t < n.length; t++)
      ja.add(n[t]);
  }
  var En = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Sr = {}, Nn = {};
  function Er(t) {
    return Re.call(Nn, t) ? !0 : Re.call(Sr, t) ? !1 : En.test(t) ? Nn[t] = !0 : (Sr[t] = !0, !1);
  }
  function ga(t, n, r) {
    if (Er(n))
      if (r === null) t.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, "" + r);
      }
  }
  function va(t, n, r) {
    if (r === null) t.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + r);
    }
  }
  function $e(t, n, r, o) {
    if (o === null) t.removeAttribute(r);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(r);
          return;
      }
      t.setAttributeNS(n, r, "" + o);
    }
  }
  function xt(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function vn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Hn(t, n, r) {
    var o = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      n
    );
    if (!t.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var f = o.get, h = o.set;
      return Object.defineProperty(t, n, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(_) {
          r = "" + _, h.call(this, _);
        }
      }), Object.defineProperty(t, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(_) {
          r = "" + _;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function Nr(t) {
    if (!t._valueTracker) {
      var n = vn(t) ? "checked" : "value";
      t._valueTracker = Hn(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Xa(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), o = "";
    return t && (o = vn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== r ? (n.setValue(t), !0) : !1;
  }
  function ht(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Kn = /[\n"\\]/g;
  function rn(t) {
    return t.replace(
      Kn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ai(t, n, r, o, f, h, _, M) {
    t.name = "", _ != null && typeof _ != "function" && typeof _ != "symbol" && typeof _ != "boolean" ? t.type = _ : t.removeAttribute("type"), n != null ? _ === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + xt(n)) : t.value !== "" + xt(n) && (t.value = "" + xt(n)) : _ !== "submit" && _ !== "reset" || t.removeAttribute("value"), n != null ? Vl(t, _, xt(n)) : r != null ? Vl(t, _, xt(r)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + xt(M) : t.removeAttribute("name");
  }
  function ki(t, n, r, o, f, h, _, M) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        Nr(t);
        return;
      }
      r = r != null ? "" + xt(r) : "", n = n != null ? "" + xt(n) : r, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, _ != null && typeof _ != "function" && typeof _ != "symbol" && typeof _ != "boolean" && (t.name = _), Nr(t);
  }
  function Vl(t, n, r) {
    n === "number" && ht(t.ownerDocument) === t || t.defaultValue === "" + r || (t.defaultValue = "" + r);
  }
  function Cr(t, n, r, o) {
    if (t = t.options, n) {
      n = {};
      for (var f = 0; f < r.length; f++)
        n["$" + r[f]] = !0;
      for (r = 0; r < t.length; r++)
        f = n.hasOwnProperty("$" + t[r].value), t[r].selected !== f && (t[r].selected = f), f && o && (t[r].defaultSelected = !0);
    } else {
      for (r = "" + xt(r), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === r) {
          t[f].selected = !0, o && (t[f].defaultSelected = !0);
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function $l(t, n, r) {
    if (n != null && (n = "" + xt(n), n !== t.value && (t.value = n), r == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = r != null ? "" + xt(r) : "";
  }
  function gp(t, n, r, o) {
    if (n == null) {
      if (o != null) {
        if (r != null) throw Error(l(92));
        if (Y(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        r = o;
      }
      r == null && (r = ""), n = r;
    }
    r = xt(n), t.defaultValue = r, o = t.textContent, o === r && o !== "" && o !== null && (t.value = o), Nr(t);
  }
  function Hi(t, n) {
    if (n) {
      var r = t.firstChild;
      if (r && r === t.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var P_ = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function vp(t, n, r) {
    var o = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, r) : typeof r != "number" || r === 0 || P_.has(n) ? n === "float" ? t.cssFloat = r : t[n] = ("" + r).trim() : t[n] = r + "px";
  }
  function yp(t, n, r) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, r != null) {
      for (var o in r)
        !r.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && r[f] !== o && vp(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && vp(t, h, n[h]);
  }
  function Kc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Z_ = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Q_ = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ws(t) {
    return Q_.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Pa() {
  }
  var Wc = null;
  function Jc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Bi = null, Ui = null;
  function bp(t) {
    var n = ct(t);
    if (n && (t = n.stateNode)) {
      var r = t[Ne] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (ai(
            t,
            r.value,
            r.defaultValue,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name
          ), n = r.name, r.type === "radio" && n != null) {
            for (r = t; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll(
              'input[name="' + rn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var o = r[n];
              if (o !== t && o.form === t.form) {
                var f = o[Ne] || null;
                if (!f) throw Error(l(90));
                ai(
                  o,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name
                );
              }
            }
            for (n = 0; n < r.length; n++)
              o = r[n], o.form === t.form && Xa(o);
          }
          break e;
        case "textarea":
          $l(t, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && Cr(t, !!r.multiple, n, !1);
      }
    }
  }
  var ef = !1;
  function xp(t, n, r) {
    if (ef) return t(n, r);
    ef = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (ef = !1, (Bi !== null || Ui !== null) && (su(), Bi && (n = Bi, t = Ui, Ui = Bi = null, bp(n), t)))
        for (n = 0; n < t.length; n++) bp(t[n]);
    }
  }
  function ql(t, n) {
    var r = t.stateNode;
    if (r === null) return null;
    var o = r[Ne] || null;
    if (o === null) return null;
    r = o[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (t = t.type, o = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !o;
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (r && typeof r != "function")
      throw Error(
        l(231, n, typeof r)
      );
    return r;
  }
  var Za = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), tf = !1;
  if (Za)
    try {
      var Il = {};
      Object.defineProperty(Il, "passive", {
        get: function() {
          tf = !0;
        }
      }), window.addEventListener("test", Il, Il), window.removeEventListener("test", Il, Il);
    } catch {
      tf = !1;
    }
  var Rr = null, nf = null, _s = null;
  function wp() {
    if (_s) return _s;
    var t, n = nf, r = n.length, o, f = "value" in Rr ? Rr.value : Rr.textContent, h = f.length;
    for (t = 0; t < r && n[t] === f[t]; t++) ;
    var _ = r - t;
    for (o = 1; o <= _ && n[r - o] === f[h - o]; o++) ;
    return _s = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Ss(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Es() {
    return !0;
  }
  function _p() {
    return !1;
  }
  function Cn(t) {
    function n(r, o, f, h, _) {
      this._reactName = r, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = _, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (r = t[M], this[M] = r ? r(h) : h[M]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Es : _p, this.isPropagationStopped = _p, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Es);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Es);
      },
      persist: function() {
      },
      isPersistent: Es
    }), n;
  }
  var ri = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ns = Cn(ri), Yl = g({}, ri, { view: 0, detail: 0 }), K_ = Cn(Yl), af, rf, Gl, Cs = g({}, Yl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: of,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Gl && (Gl && t.type === "mousemove" ? (af = t.screenX - Gl.screenX, rf = t.screenY - Gl.screenY) : rf = af = 0, Gl = t), af);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : rf;
    }
  }), Sp = Cn(Cs), W_ = g({}, Cs, { dataTransfer: 0 }), J_ = Cn(W_), eS = g({}, Yl, { relatedTarget: 0 }), lf = Cn(eS), tS = g({}, ri, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), nS = Cn(tS), aS = g({}, ri, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), rS = Cn(aS), iS = g({}, ri, { data: 0 }), Ep = Cn(iS), lS = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, oS = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, sS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function uS(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = sS[t]) ? !!n[t] : !1;
  }
  function of() {
    return uS;
  }
  var cS = g({}, Yl, {
    key: function(t) {
      if (t.key) {
        var n = lS[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Ss(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? oS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: of,
    charCode: function(t) {
      return t.type === "keypress" ? Ss(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Ss(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), fS = Cn(cS), dS = g({}, Cs, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Np = Cn(dS), hS = g({}, Yl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: of
  }), mS = Cn(hS), pS = g({}, ri, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), gS = Cn(pS), vS = g({}, Cs, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), yS = Cn(vS), bS = g({}, ri, {
    newState: 0,
    oldState: 0
  }), xS = Cn(bS), wS = [9, 13, 27, 32], sf = Za && "CompositionEvent" in window, Fl = null;
  Za && "documentMode" in document && (Fl = document.documentMode);
  var _S = Za && "TextEvent" in window && !Fl, Cp = Za && (!sf || Fl && 8 < Fl && 11 >= Fl), Rp = " ", Tp = !1;
  function Mp(t, n) {
    switch (t) {
      case "keyup":
        return wS.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Dp(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Vi = !1;
  function SS(t, n) {
    switch (t) {
      case "compositionend":
        return Dp(n);
      case "keypress":
        return n.which !== 32 ? null : (Tp = !0, Rp);
      case "textInput":
        return t = n.data, t === Rp && Tp ? null : t;
      default:
        return null;
    }
  }
  function ES(t, n) {
    if (Vi)
      return t === "compositionend" || !sf && Mp(t, n) ? (t = wp(), _s = nf = Rr = null, Vi = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Cp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var NS = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Ap(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!NS[t.type] : n === "textarea";
  }
  function jp(t, n, r, o) {
    Bi ? Ui ? Ui.push(o) : Ui = [o] : Bi = o, n = pu(n, "onChange"), 0 < n.length && (r = new Ns(
      "onChange",
      "change",
      null,
      r,
      o
    ), t.push({ event: r, listeners: n }));
  }
  var Xl = null, Pl = null;
  function CS(t) {
    mv(t, 0);
  }
  function Rs(t) {
    var n = et(t);
    if (Xa(n)) return t;
  }
  function Op(t, n) {
    if (t === "change") return n;
  }
  var zp = !1;
  if (Za) {
    var uf;
    if (Za) {
      var cf = "oninput" in document;
      if (!cf) {
        var Lp = document.createElement("div");
        Lp.setAttribute("oninput", "return;"), cf = typeof Lp.oninput == "function";
      }
      uf = cf;
    } else uf = !1;
    zp = uf && (!document.documentMode || 9 < document.documentMode);
  }
  function kp() {
    Xl && (Xl.detachEvent("onpropertychange", Hp), Pl = Xl = null);
  }
  function Hp(t) {
    if (t.propertyName === "value" && Rs(Pl)) {
      var n = [];
      jp(
        n,
        Pl,
        t,
        Jc(t)
      ), xp(CS, n);
    }
  }
  function RS(t, n, r) {
    t === "focusin" ? (kp(), Xl = n, Pl = r, Xl.attachEvent("onpropertychange", Hp)) : t === "focusout" && kp();
  }
  function TS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Rs(Pl);
  }
  function MS(t, n) {
    if (t === "click") return Rs(n);
  }
  function DS(t, n) {
    if (t === "input" || t === "change")
      return Rs(n);
  }
  function AS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Bn = typeof Object.is == "function" ? Object.is : AS;
  function Zl(t, n) {
    if (Bn(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(t), o = Object.keys(n);
    if (r.length !== o.length) return !1;
    for (o = 0; o < r.length; o++) {
      var f = r[o];
      if (!Re.call(n, f) || !Bn(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Bp(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Up(t, n) {
    var r = Bp(t);
    t = 0;
    for (var o; r; ) {
      if (r.nodeType === 3) {
        if (o = t + r.textContent.length, t <= n && o >= n)
          return { node: r, offset: n - t };
        t = o;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Bp(r);
    }
  }
  function Vp(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Vp(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function $p(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = ht(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) t = n.contentWindow;
      else break;
      n = ht(t.document);
    }
    return n;
  }
  function ff(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var jS = Za && "documentMode" in document && 11 >= document.documentMode, $i = null, df = null, Ql = null, hf = !1;
  function qp(t, n, r) {
    var o = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    hf || $i == null || $i !== ht(o) || (o = $i, "selectionStart" in o && ff(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ql && Zl(Ql, o) || (Ql = o, o = pu(df, "onSelect"), 0 < o.length && (n = new Ns(
      "onSelect",
      "select",
      null,
      n,
      r
    ), t.push({ event: n, listeners: o }), n.target = $i)));
  }
  function ii(t, n) {
    var r = {};
    return r[t.toLowerCase()] = n.toLowerCase(), r["Webkit" + t] = "webkit" + n, r["Moz" + t] = "moz" + n, r;
  }
  var qi = {
    animationend: ii("Animation", "AnimationEnd"),
    animationiteration: ii("Animation", "AnimationIteration"),
    animationstart: ii("Animation", "AnimationStart"),
    transitionrun: ii("Transition", "TransitionRun"),
    transitionstart: ii("Transition", "TransitionStart"),
    transitioncancel: ii("Transition", "TransitionCancel"),
    transitionend: ii("Transition", "TransitionEnd")
  }, mf = {}, Ip = {};
  Za && (Ip = document.createElement("div").style, "AnimationEvent" in window || (delete qi.animationend.animation, delete qi.animationiteration.animation, delete qi.animationstart.animation), "TransitionEvent" in window || delete qi.transitionend.transition);
  function li(t) {
    if (mf[t]) return mf[t];
    if (!qi[t]) return t;
    var n = qi[t], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Ip)
        return mf[t] = n[r];
    return t;
  }
  var Yp = li("animationend"), Gp = li("animationiteration"), Fp = li("animationstart"), OS = li("transitionrun"), zS = li("transitionstart"), LS = li("transitioncancel"), Xp = li("transitionend"), Pp = /* @__PURE__ */ new Map(), pf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pf.push("scrollEnd");
  function ya(t, n) {
    Pp.set(t, n), dn(n, [t]);
  }
  var Ts = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Wn = [], Ii = 0, gf = 0;
  function Ms() {
    for (var t = Ii, n = gf = Ii = 0; n < t; ) {
      var r = Wn[n];
      Wn[n++] = null;
      var o = Wn[n];
      Wn[n++] = null;
      var f = Wn[n];
      Wn[n++] = null;
      var h = Wn[n];
      if (Wn[n++] = null, o !== null && f !== null) {
        var _ = o.pending;
        _ === null ? f.next = f : (f.next = _.next, _.next = f), o.pending = f;
      }
      h !== 0 && Zp(r, f, h);
    }
  }
  function Ds(t, n, r, o) {
    Wn[Ii++] = t, Wn[Ii++] = n, Wn[Ii++] = r, Wn[Ii++] = o, gf |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function vf(t, n, r, o) {
    return Ds(t, n, r, o), As(t);
  }
  function oi(t, n) {
    return Ds(t, null, null, n), As(t);
  }
  function Zp(t, n, r) {
    t.lanes |= r;
    var o = t.alternate;
    o !== null && (o.lanes |= r);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= r, o = h.alternate, o !== null && (o.childLanes |= r), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(r), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = r | 536870912), h) : null;
  }
  function As(t) {
    if (50 < bo)
      throw bo = 0, Cd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Yi = {};
  function kS(t, n, r, o) {
    this.tag = t, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Un(t, n, r, o) {
    return new kS(t, n, r, o);
  }
  function yf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Qa(t, n) {
    var r = t.alternate;
    return r === null ? (r = Un(
      t.tag,
      n,
      t.key,
      t.mode
    ), r.elementType = t.elementType, r.type = t.type, r.stateNode = t.stateNode, r.alternate = t, t.alternate = r) : (r.pendingProps = n, r.type = t.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = t.flags & 65011712, r.childLanes = t.childLanes, r.lanes = t.lanes, r.child = t.child, r.memoizedProps = t.memoizedProps, r.memoizedState = t.memoizedState, r.updateQueue = t.updateQueue, n = t.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = t.sibling, r.index = t.index, r.ref = t.ref, r.refCleanup = t.refCleanup, r;
  }
  function Qp(t, n) {
    t.flags &= 65011714;
    var r = t.alternate;
    return r === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = r.childLanes, t.lanes = r.lanes, t.child = r.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = r.memoizedProps, t.memoizedState = r.memoizedState, t.updateQueue = r.updateQueue, t.type = r.type, n = r.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function js(t, n, r, o, f, h) {
    var _ = 0;
    if (o = t, typeof t == "function") yf(t) && (_ = 1);
    else if (typeof t == "string")
      _ = $E(
        t,
        r,
        ee.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case I:
          return t = Un(31, r, n, f), t.elementType = I, t.lanes = h, t;
        case R:
          return si(r.children, f, h, n);
        case C:
          _ = 8, f |= 24;
          break;
        case N:
          return t = Un(12, r, n, f | 2), t.elementType = N, t.lanes = h, t;
        case H:
          return t = Un(13, r, n, f), t.elementType = H, t.lanes = h, t;
        case B:
          return t = Un(19, r, n, f), t.elementType = B, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case E:
                _ = 10;
                break e;
              case D:
                _ = 9;
                break e;
              case O:
                _ = 11;
                break e;
              case U:
                _ = 14;
                break e;
              case A:
                _ = 16, o = null;
                break e;
            }
          _ = 29, r = Error(
            l(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = Un(_, r, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function si(t, n, r, o) {
    return t = Un(7, t, o, n), t.lanes = r, t;
  }
  function bf(t, n, r) {
    return t = Un(6, t, null, n), t.lanes = r, t;
  }
  function Kp(t) {
    var n = Un(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function xf(t, n, r) {
    return n = Un(
      4,
      t.children !== null ? t.children : [],
      t.key,
      n
    ), n.lanes = r, n.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, n;
  }
  var Wp = /* @__PURE__ */ new WeakMap();
  function Jn(t, n) {
    if (typeof t == "object" && t !== null) {
      var r = Wp.get(t);
      return r !== void 0 ? r : (n = {
        value: t,
        source: n,
        stack: _e(n)
      }, Wp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: _e(n)
    };
  }
  var Gi = [], Fi = 0, Os = null, Kl = 0, ea = [], ta = 0, Tr = null, Oa = 1, za = "";
  function Ka(t, n) {
    Gi[Fi++] = Kl, Gi[Fi++] = Os, Os = t, Kl = n;
  }
  function Jp(t, n, r) {
    ea[ta++] = Oa, ea[ta++] = za, ea[ta++] = Tr, Tr = t;
    var o = Oa;
    t = za;
    var f = 32 - Ut(o) - 1;
    o &= ~(1 << f), r += 1;
    var h = 32 - Ut(n) + f;
    if (30 < h) {
      var _ = f - f % 5;
      h = (o & (1 << _) - 1).toString(32), o >>= _, f -= _, Oa = 1 << 32 - Ut(n) + f | r << f | o, za = h + t;
    } else
      Oa = 1 << h | r << f | o, za = t;
  }
  function wf(t) {
    t.return !== null && (Ka(t, 1), Jp(t, 1, 0));
  }
  function _f(t) {
    for (; t === Os; )
      Os = Gi[--Fi], Gi[Fi] = null, Kl = Gi[--Fi], Gi[Fi] = null;
    for (; t === Tr; )
      Tr = ea[--ta], ea[ta] = null, za = ea[--ta], ea[ta] = null, Oa = ea[--ta], ea[ta] = null;
  }
  function eg(t, n) {
    ea[ta++] = Oa, ea[ta++] = za, ea[ta++] = Tr, Oa = n.id, za = n.overflow, Tr = t;
  }
  var ln = null, Tt = null, it = !1, Mr = null, na = !1, Sf = Error(l(519));
  function Dr(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wl(Jn(n, t)), Sf;
  }
  function tg(t) {
    var n = t.stateNode, r = t.type, o = t.memoizedProps;
    switch (n[xe] = t, n[Ne] = o, r) {
      case "dialog":
        Je("cancel", n), Je("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Je("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < wo.length; r++)
          Je(wo[r], n);
        break;
      case "source":
        Je("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Je("error", n), Je("load", n);
        break;
      case "details":
        Je("toggle", n);
        break;
      case "input":
        Je("invalid", n), ki(
          n,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        );
        break;
      case "select":
        Je("invalid", n);
        break;
      case "textarea":
        Je("invalid", n), gp(n, o.value, o.defaultValue, o.children);
    }
    r = o.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || o.suppressHydrationWarning === !0 || yv(n.textContent, r) ? (o.popover != null && (Je("beforetoggle", n), Je("toggle", n)), o.onScroll != null && Je("scroll", n), o.onScrollEnd != null && Je("scrollend", n), o.onClick != null && (n.onclick = Pa), n = !0) : n = !1, n || Dr(t, !0);
  }
  function ng(t) {
    for (ln = t.return; ln; )
      switch (ln.tag) {
        case 5:
        case 31:
        case 13:
          na = !1;
          return;
        case 27:
        case 3:
          na = !0;
          return;
        default:
          ln = ln.return;
      }
  }
  function Xi(t) {
    if (t !== ln) return !1;
    if (!it) return ng(t), it = !0, !1;
    var n = t.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = t.type, r = !(r !== "form" && r !== "button") || $d(t.type, t.memoizedProps)), r = !r), r && Tt && Dr(t), ng(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Rv(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Rv(t);
    } else
      n === 27 ? (n = Tt, Yr(t.type) ? (t = Fd, Fd = null, Tt = t) : Tt = n) : Tt = ln ? ra(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ui() {
    Tt = ln = null, it = !1;
  }
  function Ef() {
    var t = Mr;
    return t !== null && (Dn === null ? Dn = t : Dn.push.apply(
      Dn,
      t
    ), Mr = null), t;
  }
  function Wl(t) {
    Mr === null ? Mr = [t] : Mr.push(t);
  }
  var Nf = j(null), ci = null, Wa = null;
  function Ar(t, n, r) {
    G(Nf, n._currentValue), n._currentValue = r;
  }
  function Ja(t) {
    t._currentValue = Nf.current, k(Nf);
  }
  function Cf(t, n, r) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === r) break;
      t = t.return;
    }
  }
  function Rf(t, n, r, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var _ = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var M = h;
          h = f;
          for (var q = 0; q < n.length; q++)
            if (M.context === n[q]) {
              h.lanes |= r, M = h.alternate, M !== null && (M.lanes |= r), Cf(
                h.return,
                r,
                t
              ), o || (_ = null);
              break e;
            }
          h = M.next;
        }
      } else if (f.tag === 18) {
        if (_ = f.return, _ === null) throw Error(l(341));
        _.lanes |= r, h = _.alternate, h !== null && (h.lanes |= r), Cf(_, r, t), _ = null;
      } else _ = f.child;
      if (_ !== null) _.return = f;
      else
        for (_ = f; _ !== null; ) {
          if (_ === t) {
            _ = null;
            break;
          }
          if (f = _.sibling, f !== null) {
            f.return = _.return, _ = f;
            break;
          }
          _ = _.return;
        }
      f = _;
    }
  }
  function Pi(t, n, r, o) {
    t = null;
    for (var f = n, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var _ = f.alternate;
        if (_ === null) throw Error(l(387));
        if (_ = _.memoizedProps, _ !== null) {
          var M = f.type;
          Bn(f.pendingProps.value, _.value) || (t !== null ? t.push(M) : t = [M]);
        }
      } else if (f === he.current) {
        if (_ = f.alternate, _ === null) throw Error(l(387));
        _.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(Co) : t = [Co]);
      }
      f = f.return;
    }
    t !== null && Rf(
      n,
      t,
      r,
      o
    ), n.flags |= 262144;
  }
  function zs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Bn(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function fi(t) {
    ci = t, Wa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function on(t) {
    return ag(ci, t);
  }
  function Ls(t, n) {
    return ci === null && fi(t), ag(t, n);
  }
  function ag(t, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Wa === null) {
      if (t === null) throw Error(l(308));
      Wa = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Wa = Wa.next = n;
    return r;
  }
  var HS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(r, o) {
        t.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, t.forEach(function(r) {
        return r();
      });
    };
  }, BS = e.unstable_scheduleCallback, US = e.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tf() {
    return {
      controller: new HS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Jl(t) {
    t.refCount--, t.refCount === 0 && BS(US, function() {
      t.controller.abort();
    });
  }
  var eo = null, Mf = 0, Zi = 0, Qi = null;
  function VS(t, n) {
    if (eo === null) {
      var r = eo = [];
      Mf = 0, Zi = jd(), Qi = {
        status: "pending",
        value: void 0,
        then: function(o) {
          r.push(o);
        }
      };
    }
    return Mf++, n.then(rg, rg), n;
  }
  function rg() {
    if (--Mf === 0 && eo !== null) {
      Qi !== null && (Qi.status = "fulfilled");
      var t = eo;
      eo = null, Zi = 0, Qi = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function $S(t, n) {
    var r = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        r.push(f);
      }
    };
    return t.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var f = 0; f < r.length; f++) (0, r[f])(n);
      },
      function(f) {
        for (o.status = "rejected", o.reason = f, f = 0; f < r.length; f++)
          (0, r[f])(void 0);
      }
    ), o;
  }
  var ig = T.S;
  T.S = function(t, n) {
    q0 = Ke(), typeof n == "object" && n !== null && typeof n.then == "function" && VS(t, n), ig !== null && ig(t, n);
  };
  var di = j(null);
  function Df() {
    var t = di.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function ks(t, n) {
    n === null ? G(di, di.current) : G(di, n.pool);
  }
  function lg() {
    var t = Df();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Ki = Error(l(460)), Af = Error(l(474)), Hs = Error(l(542)), Bs = { then: function() {
  } };
  function og(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function sg(t, n, r) {
    switch (r = t[r], r === void 0 ? t.push(n) : r !== n && (n.then(Pa, Pa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, cg(t), t;
      default:
        if (typeof n.status == "string") n.then(Pa, Pa);
        else {
          if (t = Rt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(l(482));
          t = n, t.status = "pending", t.then(
            function(o) {
              if (n.status === "pending") {
                var f = n;
                f.status = "fulfilled", f.value = o;
              }
            },
            function(o) {
              if (n.status === "pending") {
                var f = n;
                f.status = "rejected", f.reason = o;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw t = n.reason, cg(t), t;
        }
        throw mi = n, Ki;
    }
  }
  function hi(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (mi = r, Ki) : r;
    }
  }
  var mi = null;
  function ug() {
    if (mi === null) throw Error(l(459));
    var t = mi;
    return mi = null, t;
  }
  function cg(t) {
    if (t === Ki || t === Hs)
      throw Error(l(483));
  }
  var Wi = null, to = 0;
  function Us(t) {
    var n = to;
    return to += 1, Wi === null && (Wi = []), sg(Wi, t, n);
  }
  function no(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Vs(t, n) {
    throw n.$$typeof === b ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function fg(t) {
    function n(W, P) {
      if (t) {
        var re = W.deletions;
        re === null ? (W.deletions = [P], W.flags |= 16) : re.push(P);
      }
    }
    function r(W, P) {
      if (!t) return null;
      for (; P !== null; )
        n(W, P), P = P.sibling;
      return null;
    }
    function o(W) {
      for (var P = /* @__PURE__ */ new Map(); W !== null; )
        W.key !== null ? P.set(W.key, W) : P.set(W.index, W), W = W.sibling;
      return P;
    }
    function f(W, P) {
      return W = Qa(W, P), W.index = 0, W.sibling = null, W;
    }
    function h(W, P, re) {
      return W.index = re, t ? (re = W.alternate, re !== null ? (re = re.index, re < P ? (W.flags |= 67108866, P) : re) : (W.flags |= 67108866, P)) : (W.flags |= 1048576, P);
    }
    function _(W) {
      return t && W.alternate === null && (W.flags |= 67108866), W;
    }
    function M(W, P, re, ce) {
      return P === null || P.tag !== 6 ? (P = bf(re, W.mode, ce), P.return = W, P) : (P = f(P, re), P.return = W, P);
    }
    function q(W, P, re, ce) {
      var He = re.type;
      return He === R ? ue(
        W,
        P,
        re.props.children,
        ce,
        re.key
      ) : P !== null && (P.elementType === He || typeof He == "object" && He !== null && He.$$typeof === A && hi(He) === P.type) ? (P = f(P, re.props), no(P, re), P.return = W, P) : (P = js(
        re.type,
        re.key,
        re.props,
        null,
        W.mode,
        ce
      ), no(P, re), P.return = W, P);
    }
    function ie(W, P, re, ce) {
      return P === null || P.tag !== 4 || P.stateNode.containerInfo !== re.containerInfo || P.stateNode.implementation !== re.implementation ? (P = xf(re, W.mode, ce), P.return = W, P) : (P = f(P, re.children || []), P.return = W, P);
    }
    function ue(W, P, re, ce, He) {
      return P === null || P.tag !== 7 ? (P = si(
        re,
        W.mode,
        ce,
        He
      ), P.return = W, P) : (P = f(P, re), P.return = W, P);
    }
    function fe(W, P, re) {
      if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint")
        return P = bf(
          "" + P,
          W.mode,
          re
        ), P.return = W, P;
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case x:
            return re = js(
              P.type,
              P.key,
              P.props,
              null,
              W.mode,
              re
            ), no(re, P), re.return = W, re;
          case w:
            return P = xf(
              P,
              W.mode,
              re
            ), P.return = W, P;
          case A:
            return P = hi(P), fe(W, P, re);
        }
        if (Y(P) || K(P))
          return P = si(
            P,
            W.mode,
            re,
            null
          ), P.return = W, P;
        if (typeof P.then == "function")
          return fe(W, Us(P), re);
        if (P.$$typeof === E)
          return fe(
            W,
            Ls(W, P),
            re
          );
        Vs(W, P);
      }
      return null;
    }
    function le(W, P, re, ce) {
      var He = P !== null ? P.key : null;
      if (typeof re == "string" && re !== "" || typeof re == "number" || typeof re == "bigint")
        return He !== null ? null : M(W, P, "" + re, ce);
      if (typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case x:
            return re.key === He ? q(W, P, re, ce) : null;
          case w:
            return re.key === He ? ie(W, P, re, ce) : null;
          case A:
            return re = hi(re), le(W, P, re, ce);
        }
        if (Y(re) || K(re))
          return He !== null ? null : ue(W, P, re, ce, null);
        if (typeof re.then == "function")
          return le(
            W,
            P,
            Us(re),
            ce
          );
        if (re.$$typeof === E)
          return le(
            W,
            P,
            Ls(W, re),
            ce
          );
        Vs(W, re);
      }
      return null;
    }
    function oe(W, P, re, ce, He) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return W = W.get(re) || null, M(P, W, "" + ce, He);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return W = W.get(
              ce.key === null ? re : ce.key
            ) || null, q(P, W, ce, He);
          case w:
            return W = W.get(
              ce.key === null ? re : ce.key
            ) || null, ie(P, W, ce, He);
          case A:
            return ce = hi(ce), oe(
              W,
              P,
              re,
              ce,
              He
            );
        }
        if (Y(ce) || K(ce))
          return W = W.get(re) || null, ue(P, W, ce, He, null);
        if (typeof ce.then == "function")
          return oe(
            W,
            P,
            re,
            Us(ce),
            He
          );
        if (ce.$$typeof === E)
          return oe(
            W,
            P,
            re,
            Ls(P, ce),
            He
          );
        Vs(P, ce);
      }
      return null;
    }
    function Te(W, P, re, ce) {
      for (var He = null, ft = null, je = P, Xe = P = 0, nt = null; je !== null && Xe < re.length; Xe++) {
        je.index > Xe ? (nt = je, je = null) : nt = je.sibling;
        var dt = le(
          W,
          je,
          re[Xe],
          ce
        );
        if (dt === null) {
          je === null && (je = nt);
          break;
        }
        t && je && dt.alternate === null && n(W, je), P = h(dt, P, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt, je = nt;
      }
      if (Xe === re.length)
        return r(W, je), it && Ka(W, Xe), He;
      if (je === null) {
        for (; Xe < re.length; Xe++)
          je = fe(W, re[Xe], ce), je !== null && (P = h(
            je,
            P,
            Xe
          ), ft === null ? He = je : ft.sibling = je, ft = je);
        return it && Ka(W, Xe), He;
      }
      for (je = o(je); Xe < re.length; Xe++)
        nt = oe(
          je,
          W,
          Xe,
          re[Xe],
          ce
        ), nt !== null && (t && nt.alternate !== null && je.delete(
          nt.key === null ? Xe : nt.key
        ), P = h(
          nt,
          P,
          Xe
        ), ft === null ? He = nt : ft.sibling = nt, ft = nt);
      return t && je.forEach(function(Zr) {
        return n(W, Zr);
      }), it && Ka(W, Xe), He;
    }
    function Ue(W, P, re, ce) {
      if (re == null) throw Error(l(151));
      for (var He = null, ft = null, je = P, Xe = P = 0, nt = null, dt = re.next(); je !== null && !dt.done; Xe++, dt = re.next()) {
        je.index > Xe ? (nt = je, je = null) : nt = je.sibling;
        var Zr = le(W, je, dt.value, ce);
        if (Zr === null) {
          je === null && (je = nt);
          break;
        }
        t && je && Zr.alternate === null && n(W, je), P = h(Zr, P, Xe), ft === null ? He = Zr : ft.sibling = Zr, ft = Zr, je = nt;
      }
      if (dt.done)
        return r(W, je), it && Ka(W, Xe), He;
      if (je === null) {
        for (; !dt.done; Xe++, dt = re.next())
          dt = fe(W, dt.value, ce), dt !== null && (P = h(dt, P, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt);
        return it && Ka(W, Xe), He;
      }
      for (je = o(je); !dt.done; Xe++, dt = re.next())
        dt = oe(je, W, Xe, dt.value, ce), dt !== null && (t && dt.alternate !== null && je.delete(dt.key === null ? Xe : dt.key), P = h(dt, P, Xe), ft === null ? He = dt : ft.sibling = dt, ft = dt);
      return t && je.forEach(function(WE) {
        return n(W, WE);
      }), it && Ka(W, Xe), He;
    }
    function Nt(W, P, re, ce) {
      if (typeof re == "object" && re !== null && re.type === R && re.key === null && (re = re.props.children), typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case x:
            e: {
              for (var He = re.key; P !== null; ) {
                if (P.key === He) {
                  if (He = re.type, He === R) {
                    if (P.tag === 7) {
                      r(
                        W,
                        P.sibling
                      ), ce = f(
                        P,
                        re.props.children
                      ), ce.return = W, W = ce;
                      break e;
                    }
                  } else if (P.elementType === He || typeof He == "object" && He !== null && He.$$typeof === A && hi(He) === P.type) {
                    r(
                      W,
                      P.sibling
                    ), ce = f(P, re.props), no(ce, re), ce.return = W, W = ce;
                    break e;
                  }
                  r(W, P);
                  break;
                } else n(W, P);
                P = P.sibling;
              }
              re.type === R ? (ce = si(
                re.props.children,
                W.mode,
                ce,
                re.key
              ), ce.return = W, W = ce) : (ce = js(
                re.type,
                re.key,
                re.props,
                null,
                W.mode,
                ce
              ), no(ce, re), ce.return = W, W = ce);
            }
            return _(W);
          case w:
            e: {
              for (He = re.key; P !== null; ) {
                if (P.key === He)
                  if (P.tag === 4 && P.stateNode.containerInfo === re.containerInfo && P.stateNode.implementation === re.implementation) {
                    r(
                      W,
                      P.sibling
                    ), ce = f(P, re.children || []), ce.return = W, W = ce;
                    break e;
                  } else {
                    r(W, P);
                    break;
                  }
                else n(W, P);
                P = P.sibling;
              }
              ce = xf(re, W.mode, ce), ce.return = W, W = ce;
            }
            return _(W);
          case A:
            return re = hi(re), Nt(
              W,
              P,
              re,
              ce
            );
        }
        if (Y(re))
          return Te(
            W,
            P,
            re,
            ce
          );
        if (K(re)) {
          if (He = K(re), typeof He != "function") throw Error(l(150));
          return re = He.call(re), Ue(
            W,
            P,
            re,
            ce
          );
        }
        if (typeof re.then == "function")
          return Nt(
            W,
            P,
            Us(re),
            ce
          );
        if (re.$$typeof === E)
          return Nt(
            W,
            P,
            Ls(W, re),
            ce
          );
        Vs(W, re);
      }
      return typeof re == "string" && re !== "" || typeof re == "number" || typeof re == "bigint" ? (re = "" + re, P !== null && P.tag === 6 ? (r(W, P.sibling), ce = f(P, re), ce.return = W, W = ce) : (r(W, P), ce = bf(re, W.mode, ce), ce.return = W, W = ce), _(W)) : r(W, P);
    }
    return function(W, P, re, ce) {
      try {
        to = 0;
        var He = Nt(
          W,
          P,
          re,
          ce
        );
        return Wi = null, He;
      } catch (je) {
        if (je === Ki || je === Hs) throw je;
        var ft = Un(29, je, null, W.mode);
        return ft.lanes = ce, ft.return = W, ft;
      } finally {
      }
    };
  }
  var pi = fg(!0), dg = fg(!1), jr = !1;
  function jf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Of(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Or(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function zr(t, n, r) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (mt & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = As(t), Zp(t, null, r), n;
    }
    return Ds(t, o, n, r), As(t);
  }
  function ao(t, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, r |= o, n.lanes = r, en(t, r);
    }
  }
  function zf(t, n) {
    var r = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, r === o)) {
      var f = null, h = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var _ = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = _ : h = h.next = _, r = r.next;
        } while (r !== null);
        h === null ? f = h = n : h = h.next = n;
      } else f = h = n;
      r = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: h,
        shared: o.shared,
        callbacks: o.callbacks
      }, t.updateQueue = r;
      return;
    }
    t = r.lastBaseUpdate, t === null ? r.firstBaseUpdate = n : t.next = n, r.lastBaseUpdate = n;
  }
  var Lf = !1;
  function ro() {
    if (Lf) {
      var t = Qi;
      if (t !== null) throw t;
    }
  }
  function io(t, n, r, o) {
    Lf = !1;
    var f = t.updateQueue;
    jr = !1;
    var h = f.firstBaseUpdate, _ = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var q = M, ie = q.next;
      q.next = null, _ === null ? h = ie : _.next = ie, _ = q;
      var ue = t.alternate;
      ue !== null && (ue = ue.updateQueue, M = ue.lastBaseUpdate, M !== _ && (M === null ? ue.firstBaseUpdate = ie : M.next = ie, ue.lastBaseUpdate = q));
    }
    if (h !== null) {
      var fe = f.baseState;
      _ = 0, ue = ie = q = null, M = h;
      do {
        var le = M.lane & -536870913, oe = le !== M.lane;
        if (oe ? (tt & le) === le : (o & le) === le) {
          le !== 0 && le === Zi && (Lf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var Te = t, Ue = M;
            le = n;
            var Nt = r;
            switch (Ue.tag) {
              case 1:
                if (Te = Ue.payload, typeof Te == "function") {
                  fe = Te.call(Nt, fe, le);
                  break e;
                }
                fe = Te;
                break e;
              case 3:
                Te.flags = Te.flags & -65537 | 128;
              case 0:
                if (Te = Ue.payload, le = typeof Te == "function" ? Te.call(Nt, fe, le) : Te, le == null) break e;
                fe = g({}, fe, le);
                break e;
              case 2:
                jr = !0;
            }
          }
          le = M.callback, le !== null && (t.flags |= 64, oe && (t.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [le] : oe.push(le));
        } else
          oe = {
            lane: le,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, ue === null ? (ie = ue = oe, q = fe) : ue = ue.next = oe, _ |= le;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          oe = M, M = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && (q = fe), f.baseState = q, f.firstBaseUpdate = ie, f.lastBaseUpdate = ue, h === null && (f.shared.lanes = 0), Ur |= _, t.lanes = _, t.memoizedState = fe;
    }
  }
  function hg(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function mg(t, n) {
    var r = t.callbacks;
    if (r !== null)
      for (t.callbacks = null, t = 0; t < r.length; t++)
        hg(r[t], n);
  }
  var Ji = j(null), $s = j(0);
  function pg(t, n) {
    t = sr, G($s, t), G(Ji, n), sr = t | n.baseLanes;
  }
  function kf() {
    G($s, sr), G(Ji, Ji.current);
  }
  function Hf() {
    sr = $s.current, k(Ji), k($s);
  }
  var Vn = j(null), aa = null;
  function Lr(t) {
    var n = t.alternate;
    G($t, $t.current & 1), G(Vn, t), aa === null && (n === null || Ji.current !== null || n.memoizedState !== null) && (aa = t);
  }
  function Bf(t) {
    G($t, $t.current), G(Vn, t), aa === null && (aa = t);
  }
  function gg(t) {
    t.tag === 22 ? (G($t, $t.current), G(Vn, t), aa === null && (aa = t)) : kr();
  }
  function kr() {
    G($t, $t.current), G(Vn, Vn.current);
  }
  function $n(t) {
    k(Vn), aa === t && (aa = null), k($t);
  }
  var $t = j(0);
  function qs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Yd(r) || Gd(r)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var er = 0, Ge = null, St = null, Ft = null, Is = !1, el = !1, gi = !1, Ys = 0, lo = 0, tl = null, qS = 0;
  function Ht() {
    throw Error(l(321));
  }
  function Uf(t, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < t.length; r++)
      if (!Bn(t[r], n[r])) return !1;
    return !0;
  }
  function Vf(t, n, r, o, f, h) {
    return er = h, Ge = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, T.H = t === null || t.memoizedState === null ? Jg : td, gi = !1, h = r(o, f), gi = !1, el && (h = yg(
      n,
      r,
      o,
      f
    )), vg(t), h;
  }
  function vg(t) {
    T.H = uo;
    var n = St !== null && St.next !== null;
    if (er = 0, Ft = St = Ge = null, Is = !1, lo = 0, tl = null, n) throw Error(l(300));
    t === null || Xt || (t = t.dependencies, t !== null && zs(t) && (Xt = !0));
  }
  function yg(t, n, r, o) {
    Ge = t;
    var f = 0;
    do {
      if (el && (tl = null), lo = 0, el = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Ft = St = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      T.H = e0, h = n(r, o);
    } while (el);
    return h;
  }
  function IS() {
    var t = T.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? oo(n) : n, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (Ge.flags |= 1024), n;
  }
  function $f() {
    var t = Ys !== 0;
    return Ys = 0, t;
  }
  function qf(t, n, r) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~r;
  }
  function If(t) {
    if (Is) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Is = !1;
    }
    er = 0, Ft = St = Ge = null, el = !1, lo = Ys = 0, tl = null;
  }
  function yn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ft === null ? Ge.memoizedState = Ft = t : Ft = Ft.next = t, Ft;
  }
  function qt() {
    if (St === null) {
      var t = Ge.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var n = Ft === null ? Ge.memoizedState : Ft.next;
    if (n !== null)
      Ft = n, St = t;
    else {
      if (t === null)
        throw Ge.alternate === null ? Error(l(467)) : Error(l(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, Ft === null ? Ge.memoizedState = Ft = t : Ft = Ft.next = t;
    }
    return Ft;
  }
  function Gs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function oo(t) {
    var n = lo;
    return lo += 1, tl === null && (tl = []), t = sg(tl, t, n), n = Ge, (Ft === null ? n.memoizedState : Ft.next) === null && (n = n.alternate, T.H = n === null || n.memoizedState === null ? Jg : td), t;
  }
  function Fs(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return oo(t);
      if (t.$$typeof === E) return on(t);
    }
    throw Error(l(438, String(t)));
  }
  function Yf(t) {
    var n = null, r = Ge.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var o = Ge.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = Gs(), Ge.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(t), o = 0; o < t; o++)
        r[o] = Q;
    return n.index++, r;
  }
  function tr(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Xs(t) {
    var n = qt();
    return Gf(n, St, t);
  }
  function Gf(t, n, r) {
    var o = t.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = r;
    var f = t.baseQueue, h = o.pending;
    if (h !== null) {
      if (f !== null) {
        var _ = f.next;
        f.next = h.next, h.next = _;
      }
      n.baseQueue = f = h, o.pending = null;
    }
    if (h = t.baseState, f === null) t.memoizedState = h;
    else {
      n = f.next;
      var M = _ = null, q = null, ie = n, ue = !1;
      do {
        var fe = ie.lane & -536870913;
        if (fe !== ie.lane ? (tt & fe) === fe : (er & fe) === fe) {
          var le = ie.revertLane;
          if (le === 0)
            q !== null && (q = q.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ie.action,
              hasEagerState: ie.hasEagerState,
              eagerState: ie.eagerState,
              next: null
            }), fe === Zi && (ue = !0);
          else if ((er & le) === le) {
            ie = ie.next, le === Zi && (ue = !0);
            continue;
          } else
            fe = {
              lane: 0,
              revertLane: ie.revertLane,
              gesture: null,
              action: ie.action,
              hasEagerState: ie.hasEagerState,
              eagerState: ie.eagerState,
              next: null
            }, q === null ? (M = q = fe, _ = h) : q = q.next = fe, Ge.lanes |= le, Ur |= le;
          fe = ie.action, gi && r(h, fe), h = ie.hasEagerState ? ie.eagerState : r(h, fe);
        } else
          le = {
            lane: fe,
            revertLane: ie.revertLane,
            gesture: ie.gesture,
            action: ie.action,
            hasEagerState: ie.hasEagerState,
            eagerState: ie.eagerState,
            next: null
          }, q === null ? (M = q = le, _ = h) : q = q.next = le, Ge.lanes |= fe, Ur |= fe;
        ie = ie.next;
      } while (ie !== null && ie !== n);
      if (q === null ? _ = h : q.next = M, !Bn(h, t.memoizedState) && (Xt = !0, ue && (r = Qi, r !== null)))
        throw r;
      t.memoizedState = h, t.baseState = _, t.baseQueue = q, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Ff(t) {
    var n = qt(), r = n.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = t;
    var o = r.dispatch, f = r.pending, h = n.memoizedState;
    if (f !== null) {
      r.pending = null;
      var _ = f = f.next;
      do
        h = t(h, _.action), _ = _.next;
      while (_ !== f);
      Bn(h, n.memoizedState) || (Xt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, o];
  }
  function bg(t, n, r) {
    var o = Ge, f = qt(), h = it;
    if (h) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else r = n();
    var _ = !Bn(
      (St || f).memoizedState,
      r
    );
    if (_ && (f.memoizedState = r, Xt = !0), f = f.queue, Zf(_g.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || _ || Ft !== null && Ft.memoizedState.tag & 1) {
      if (o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        wg.bind(
          null,
          o,
          f,
          r,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (er & 127) !== 0 || xg(o, n, r);
    }
    return r;
  }
  function xg(t, n, r) {
    t.flags |= 16384, t = { getSnapshot: n, value: r }, n = Ge.updateQueue, n === null ? (n = Gs(), Ge.updateQueue = n, n.stores = [t]) : (r = n.stores, r === null ? n.stores = [t] : r.push(t));
  }
  function wg(t, n, r, o) {
    n.value = r, n.getSnapshot = o, Sg(n) && Eg(t);
  }
  function _g(t, n, r) {
    return r(function() {
      Sg(n) && Eg(t);
    });
  }
  function Sg(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var r = n();
      return !Bn(t, r);
    } catch {
      return !0;
    }
  }
  function Eg(t) {
    var n = oi(t, 2);
    n !== null && An(n, t, 2);
  }
  function Xf(t) {
    var n = yn();
    if (typeof t == "function") {
      var r = t;
      if (t = r(), gi) {
        Ot(!0);
        try {
          r();
        } finally {
          Ot(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: tr,
      lastRenderedState: t
    }, n;
  }
  function Ng(t, n, r, o) {
    return t.baseState = r, Gf(
      t,
      St,
      typeof o == "function" ? o : tr
    );
  }
  function YS(t, n, r, o, f) {
    if (Qs(t)) throw Error(l(485));
    if (t = n.action, t !== null) {
      var h = {
        payload: f,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(_) {
          h.listeners.push(_);
        }
      };
      T.T !== null ? r(!0) : h.isTransition = !1, o(h), r = n.pending, r === null ? (h.next = n.pending = h, Cg(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Cg(t, n) {
    var r = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = T.T, _ = {};
      T.T = _;
      try {
        var M = r(f, o), q = T.S;
        q !== null && q(_, M), Rg(t, n, M);
      } catch (ie) {
        Pf(t, n, ie);
      } finally {
        h !== null && _.types !== null && (h.types = _.types), T.T = h;
      }
    } else
      try {
        h = r(f, o), Rg(t, n, h);
      } catch (ie) {
        Pf(t, n, ie);
      }
  }
  function Rg(t, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(o) {
        Tg(t, n, o);
      },
      function(o) {
        return Pf(t, n, o);
      }
    ) : Tg(t, n, r);
  }
  function Tg(t, n, r) {
    n.status = "fulfilled", n.value = r, Mg(n), t.state = r, n = t.pending, n !== null && (r = n.next, r === n ? t.pending = null : (r = r.next, n.next = r, Cg(t, r)));
  }
  function Pf(t, n, r) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = r, Mg(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function Mg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Dg(t, n) {
    return n;
  }
  function Ag(t, n) {
    if (it) {
      var r = Rt.formState;
      if (r !== null) {
        e: {
          var o = Ge;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, h = na; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = ra(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Tt = ra(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            Dr(o);
          }
          o = !1;
        }
        o && (n = r[0]);
      }
    }
    return r = yn(), r.memoizedState = r.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Dg,
      lastRenderedState: n
    }, r.queue = o, r = Qg.bind(
      null,
      Ge,
      o
    ), o.dispatch = r, o = Xf(!1), h = ed.bind(
      null,
      Ge,
      !1,
      o.queue
    ), o = yn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, r = YS.bind(
      null,
      Ge,
      f,
      h,
      r
    ), f.dispatch = r, o.memoizedState = t, [n, r, !1];
  }
  function jg(t) {
    var n = qt();
    return Og(n, St, t);
  }
  function Og(t, n, r) {
    if (n = Gf(
      t,
      n,
      Dg
    )[0], t = Xs(tr)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = oo(n);
      } catch (_) {
        throw _ === Ki ? Hs : _;
      }
    else o = n;
    n = qt();
    var f = n.queue, h = f.dispatch;
    return r !== n.memoizedState && (Ge.flags |= 2048, nl(
      9,
      { destroy: void 0 },
      GS.bind(null, f, r),
      null
    )), [o, h, t];
  }
  function GS(t, n) {
    t.action = n;
  }
  function zg(t) {
    var n = qt(), r = St;
    if (r !== null)
      return Og(n, r, t);
    qt(), n = n.memoizedState, r = qt();
    var o = r.queue.dispatch;
    return r.memoizedState = t, [n, o, !1];
  }
  function nl(t, n, r, o) {
    return t = { tag: t, create: r, deps: o, inst: n, next: null }, n = Ge.updateQueue, n === null && (n = Gs(), Ge.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = t.next = t : (o = r.next, r.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Lg() {
    return qt().memoizedState;
  }
  function Ps(t, n, r, o) {
    var f = yn();
    Ge.flags |= t, f.memoizedState = nl(
      1 | n,
      { destroy: void 0 },
      r,
      o === void 0 ? null : o
    );
  }
  function Zs(t, n, r, o) {
    var f = qt();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    St !== null && o !== null && Uf(o, St.memoizedState.deps) ? f.memoizedState = nl(n, h, r, o) : (Ge.flags |= t, f.memoizedState = nl(
      1 | n,
      h,
      r,
      o
    ));
  }
  function kg(t, n) {
    Ps(8390656, 8, t, n);
  }
  function Zf(t, n) {
    Zs(2048, 8, t, n);
  }
  function FS(t) {
    Ge.flags |= 4;
    var n = Ge.updateQueue;
    if (n === null)
      n = Gs(), Ge.updateQueue = n, n.events = [t];
    else {
      var r = n.events;
      r === null ? n.events = [t] : r.push(t);
    }
  }
  function Hg(t) {
    var n = qt().memoizedState;
    return FS({ ref: n, nextImpl: t }), function() {
      if ((mt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Bg(t, n) {
    return Zs(4, 2, t, n);
  }
  function Ug(t, n) {
    return Zs(4, 4, t, n);
  }
  function Vg(t, n) {
    if (typeof n == "function") {
      t = t();
      var r = n(t);
      return function() {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function $g(t, n, r) {
    r = r != null ? r.concat([t]) : null, Zs(4, 4, Vg.bind(null, n, t), r);
  }
  function Qf() {
  }
  function qg(t, n) {
    var r = qt();
    n = n === void 0 ? null : n;
    var o = r.memoizedState;
    return n !== null && Uf(n, o[1]) ? o[0] : (r.memoizedState = [t, n], t);
  }
  function Ig(t, n) {
    var r = qt();
    n = n === void 0 ? null : n;
    var o = r.memoizedState;
    if (n !== null && Uf(n, o[1]))
      return o[0];
    if (o = t(), gi) {
      Ot(!0);
      try {
        t();
      } finally {
        Ot(!1);
      }
    }
    return r.memoizedState = [o, n], o;
  }
  function Kf(t, n, r) {
    return r === void 0 || (er & 1073741824) !== 0 && (tt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = r, t = Y0(), Ge.lanes |= t, Ur |= t, r);
  }
  function Yg(t, n, r, o) {
    return Bn(r, n) ? r : Ji.current !== null ? (t = Kf(t, r, o), Bn(t, n) || (Xt = !0), t) : (er & 42) === 0 || (er & 1073741824) !== 0 && (tt & 261930) === 0 ? (Xt = !0, t.memoizedState = r) : (t = Y0(), Ge.lanes |= t, Ur |= t, n);
  }
  function Gg(t, n, r, o, f) {
    var h = z.p;
    z.p = h !== 0 && 8 > h ? h : 8;
    var _ = T.T, M = {};
    T.T = M, ed(t, !1, n, r);
    try {
      var q = f(), ie = T.S;
      if (ie !== null && ie(M, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var ue = $S(
          q,
          o
        );
        so(
          t,
          n,
          ue,
          Yn(t)
        );
      } else
        so(
          t,
          n,
          o,
          Yn(t)
        );
    } catch (fe) {
      so(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Yn()
      );
    } finally {
      z.p = h, _ !== null && M.types !== null && (_.types = M.types), T.T = _;
    }
  }
  function XS() {
  }
  function Wf(t, n, r, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = Fg(t).queue;
    Gg(
      t,
      f,
      n,
      F,
      r === null ? XS : function() {
        return Xg(t), r(o);
      }
    );
  }
  function Fg(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: tr,
        lastRenderedState: F
      },
      next: null
    };
    var r = {};
    return n.next = {
      memoizedState: r,
      baseState: r,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: tr,
        lastRenderedState: r
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Xg(t) {
    var n = Fg(t);
    n.next === null && (n = t.alternate.memoizedState), so(
      t,
      n.next.queue,
      {},
      Yn()
    );
  }
  function Jf() {
    return on(Co);
  }
  function Pg() {
    return qt().memoizedState;
  }
  function Zg() {
    return qt().memoizedState;
  }
  function PS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Yn();
          t = Or(r);
          var o = zr(n, t, r);
          o !== null && (An(o, n, r), ao(o, n, r)), n = { cache: Tf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function ZS(t, n, r) {
    var o = Yn();
    r = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qs(t) ? Kg(n, r) : (r = vf(t, n, r, o), r !== null && (An(r, t, o), Wg(r, n, o)));
  }
  function Qg(t, n, r) {
    var o = Yn();
    so(t, n, r, o);
  }
  function so(t, n, r, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Qs(t)) Kg(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var _ = n.lastRenderedState, M = h(_, r);
          if (f.hasEagerState = !0, f.eagerState = M, Bn(M, _))
            return Ds(t, n, f, 0), Rt === null && Ms(), !1;
        } catch {
        } finally {
        }
      if (r = vf(t, n, f, o), r !== null)
        return An(r, t, o), Wg(r, n, o), !0;
    }
    return !1;
  }
  function ed(t, n, r, o) {
    if (o = {
      lane: 2,
      revertLane: jd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qs(t)) {
      if (n) throw Error(l(479));
    } else
      n = vf(
        t,
        r,
        o,
        2
      ), n !== null && An(n, t, 2);
  }
  function Qs(t) {
    var n = t.alternate;
    return t === Ge || n !== null && n === Ge;
  }
  function Kg(t, n) {
    el = Is = !0;
    var r = t.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), t.pending = n;
  }
  function Wg(t, n, r) {
    if ((r & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, r |= o, n.lanes = r, en(t, r);
    }
  }
  var uo = {
    readContext: on,
    use: Fs,
    useCallback: Ht,
    useContext: Ht,
    useEffect: Ht,
    useImperativeHandle: Ht,
    useLayoutEffect: Ht,
    useInsertionEffect: Ht,
    useMemo: Ht,
    useReducer: Ht,
    useRef: Ht,
    useState: Ht,
    useDebugValue: Ht,
    useDeferredValue: Ht,
    useTransition: Ht,
    useSyncExternalStore: Ht,
    useId: Ht,
    useHostTransitionStatus: Ht,
    useFormState: Ht,
    useActionState: Ht,
    useOptimistic: Ht,
    useMemoCache: Ht,
    useCacheRefresh: Ht
  };
  uo.useEffectEvent = Ht;
  var Jg = {
    readContext: on,
    use: Fs,
    useCallback: function(t, n) {
      return yn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: on,
    useEffect: kg,
    useImperativeHandle: function(t, n, r) {
      r = r != null ? r.concat([t]) : null, Ps(
        4194308,
        4,
        Vg.bind(null, n, t),
        r
      );
    },
    useLayoutEffect: function(t, n) {
      return Ps(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      Ps(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var r = yn();
      n = n === void 0 ? null : n;
      var o = t();
      if (gi) {
        Ot(!0);
        try {
          t();
        } finally {
          Ot(!1);
        }
      }
      return r.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, r) {
      var o = yn();
      if (r !== void 0) {
        var f = r(n);
        if (gi) {
          Ot(!0);
          try {
            r(n);
          } finally {
            Ot(!1);
          }
        }
      } else f = n;
      return o.memoizedState = o.baseState = f, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: f
      }, o.queue = t, t = t.dispatch = ZS.bind(
        null,
        Ge,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = yn();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Xf(t);
      var n = t.queue, r = Qg.bind(null, Ge, n);
      return n.dispatch = r, [t.memoizedState, r];
    },
    useDebugValue: Qf,
    useDeferredValue: function(t, n) {
      var r = yn();
      return Kf(r, t, n);
    },
    useTransition: function() {
      var t = Xf(!1);
      return t = Gg.bind(
        null,
        Ge,
        t.queue,
        !0,
        !1
      ), yn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, r) {
      var o = Ge, f = yn();
      if (it) {
        if (r === void 0)
          throw Error(l(407));
        r = r();
      } else {
        if (r = n(), Rt === null)
          throw Error(l(349));
        (tt & 127) !== 0 || xg(o, n, r);
      }
      f.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return f.queue = h, kg(_g.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        wg.bind(
          null,
          o,
          h,
          r,
          n
        ),
        null
      ), r;
    },
    useId: function() {
      var t = yn(), n = Rt.identifierPrefix;
      if (it) {
        var r = za, o = Oa;
        r = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = Ys++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = qS++, n = "_" + n + "r_" + r.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Jf,
    useFormState: Ag,
    useActionState: Ag,
    useOptimistic: function(t) {
      var n = yn();
      n.memoizedState = n.baseState = t;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = ed.bind(
        null,
        Ge,
        !0,
        r
      ), r.dispatch = n, [t, n];
    },
    useMemoCache: Yf,
    useCacheRefresh: function() {
      return yn().memoizedState = PS.bind(
        null,
        Ge
      );
    },
    useEffectEvent: function(t) {
      var n = yn(), r = { impl: t };
      return n.memoizedState = r, function() {
        if ((mt & 2) !== 0)
          throw Error(l(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, td = {
    readContext: on,
    use: Fs,
    useCallback: qg,
    useContext: on,
    useEffect: Zf,
    useImperativeHandle: $g,
    useInsertionEffect: Bg,
    useLayoutEffect: Ug,
    useMemo: Ig,
    useReducer: Xs,
    useRef: Lg,
    useState: function() {
      return Xs(tr);
    },
    useDebugValue: Qf,
    useDeferredValue: function(t, n) {
      var r = qt();
      return Yg(
        r,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Xs(tr)[0], n = qt().memoizedState;
      return [
        typeof t == "boolean" ? t : oo(t),
        n
      ];
    },
    useSyncExternalStore: bg,
    useId: Pg,
    useHostTransitionStatus: Jf,
    useFormState: jg,
    useActionState: jg,
    useOptimistic: function(t, n) {
      var r = qt();
      return Ng(r, St, t, n);
    },
    useMemoCache: Yf,
    useCacheRefresh: Zg
  };
  td.useEffectEvent = Hg;
  var e0 = {
    readContext: on,
    use: Fs,
    useCallback: qg,
    useContext: on,
    useEffect: Zf,
    useImperativeHandle: $g,
    useInsertionEffect: Bg,
    useLayoutEffect: Ug,
    useMemo: Ig,
    useReducer: Ff,
    useRef: Lg,
    useState: function() {
      return Ff(tr);
    },
    useDebugValue: Qf,
    useDeferredValue: function(t, n) {
      var r = qt();
      return St === null ? Kf(r, t, n) : Yg(
        r,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Ff(tr)[0], n = qt().memoizedState;
      return [
        typeof t == "boolean" ? t : oo(t),
        n
      ];
    },
    useSyncExternalStore: bg,
    useId: Pg,
    useHostTransitionStatus: Jf,
    useFormState: zg,
    useActionState: zg,
    useOptimistic: function(t, n) {
      var r = qt();
      return St !== null ? Ng(r, St, t, n) : (r.baseState = t, [t, r.queue.dispatch]);
    },
    useMemoCache: Yf,
    useCacheRefresh: Zg
  };
  e0.useEffectEvent = Hg;
  function nd(t, n, r, o) {
    n = t.memoizedState, r = r(o, n), r = r == null ? n : g({}, n, r), t.memoizedState = r, t.lanes === 0 && (t.updateQueue.baseState = r);
  }
  var ad = {
    enqueueSetState: function(t, n, r) {
      t = t._reactInternals;
      var o = Yn(), f = Or(o);
      f.payload = n, r != null && (f.callback = r), n = zr(t, f, o), n !== null && (An(n, t, o), ao(n, t, o));
    },
    enqueueReplaceState: function(t, n, r) {
      t = t._reactInternals;
      var o = Yn(), f = Or(o);
      f.tag = 1, f.payload = n, r != null && (f.callback = r), n = zr(t, f, o), n !== null && (An(n, t, o), ao(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var r = Yn(), o = Or(r);
      o.tag = 2, n != null && (o.callback = n), n = zr(t, o, r), n !== null && (An(n, t, r), ao(n, t, r));
    }
  };
  function t0(t, n, r, o, f, h, _) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, _) : n.prototype && n.prototype.isPureReactComponent ? !Zl(r, o) || !Zl(f, h) : !0;
  }
  function n0(t, n, r, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, o), n.state !== t && ad.enqueueReplaceState(n, n.state, null);
  }
  function vi(t, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var o in n)
        o !== "ref" && (r[o] = n[o]);
    }
    if (t = t.defaultProps) {
      r === n && (r = g({}, r));
      for (var f in t)
        r[f] === void 0 && (r[f] = t[f]);
    }
    return r;
  }
  function a0(t) {
    Ts(t);
  }
  function r0(t) {
    console.error(t);
  }
  function i0(t) {
    Ts(t);
  }
  function Ks(t, n) {
    try {
      var r = t.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function l0(t, n, r) {
    try {
      var o = t.onCaughtError;
      o(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function rd(t, n, r) {
    return r = Or(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      Ks(t, n);
    }, r;
  }
  function o0(t) {
    return t = Or(t), t.tag = 3, t;
  }
  function s0(t, n, r, o) {
    var f = r.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        l0(n, r, o);
      };
    }
    var _ = r.stateNode;
    _ !== null && typeof _.componentDidCatch == "function" && (t.callback = function() {
      l0(n, r, o), typeof f != "function" && (Vr === null ? Vr = /* @__PURE__ */ new Set([this]) : Vr.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function QS(t, n, r, o, f) {
    if (r.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = r.alternate, n !== null && Pi(
        n,
        r,
        f,
        !0
      ), r = Vn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return aa === null ? uu() : r.alternate === null && Bt === 0 && (Bt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = f, o === Bs ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Md(t, o, f)), !1;
          case 22:
            return r.flags |= 65536, o === Bs ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : r.add(o)), Md(t, o, f)), !1;
        }
        throw Error(l(435, r.tag));
      }
      return Md(t, o, f), uu(), !1;
    }
    if (it)
      return n = Vn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== Sf && (t = Error(l(422), { cause: o }), Wl(Jn(t, r)))) : (o !== Sf && (n = Error(l(423), {
        cause: o
      }), Wl(
        Jn(n, r)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Jn(o, r), f = rd(
        t.stateNode,
        o,
        f
      ), zf(t, f), Bt !== 4 && (Bt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Jn(h, r), yo === null ? yo = [h] : yo.push(h), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Jn(o, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, t = f & -f, r.lanes |= t, t = rd(r.stateNode, o, t), zf(r, t), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (Vr === null || !Vr.has(h))))
            return r.flags |= 65536, f &= -f, r.lanes |= f, f = o0(f), s0(
              f,
              t,
              r,
              o
            ), zf(r, f), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var id = Error(l(461)), Xt = !1;
  function sn(t, n, r, o) {
    n.child = t === null ? dg(n, null, r, o) : pi(
      n,
      t.child,
      r,
      o
    );
  }
  function u0(t, n, r, o, f) {
    r = r.render;
    var h = n.ref;
    if ("ref" in o) {
      var _ = {};
      for (var M in o)
        M !== "ref" && (_[M] = o[M]);
    } else _ = o;
    return fi(n), o = Vf(
      t,
      n,
      r,
      _,
      h,
      f
    ), M = $f(), t !== null && !Xt ? (qf(t, n, f), nr(t, n, f)) : (it && M && wf(n), n.flags |= 1, sn(t, n, o, f), n.child);
  }
  function c0(t, n, r, o, f) {
    if (t === null) {
      var h = r.type;
      return typeof h == "function" && !yf(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, f0(
        t,
        n,
        h,
        o,
        f
      )) : (t = js(
        r.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !hd(t, f)) {
      var _ = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : Zl, r(_, o) && t.ref === n.ref)
        return nr(t, n, f);
    }
    return n.flags |= 1, t = Qa(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function f0(t, n, r, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Zl(h, o) && t.ref === n.ref)
        if (Xt = !1, n.pendingProps = o = h, hd(t, f))
          (t.flags & 131072) !== 0 && (Xt = !0);
        else
          return n.lanes = t.lanes, nr(t, n, f);
    }
    return ld(
      t,
      n,
      r,
      o,
      f
    );
  }
  function d0(t, n, r, o) {
    var f = o.children, h = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | r : r, t !== null) {
          for (o = n.child = t.child, f = 0; o !== null; )
            f = f | o.lanes | o.childLanes, o = o.sibling;
          o = f & ~h;
        } else o = 0, n.child = null;
        return h0(
          t,
          n,
          h,
          r,
          o
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && ks(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? pg(n, h) : kf(), gg(n);
      else
        return o = n.lanes = 536870912, h0(
          t,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          o
        );
    } else
      h !== null ? (ks(n, h.cachePool), pg(n, h), kr(), n.memoizedState = null) : (t !== null && ks(n, null), kf(), kr());
    return sn(t, n, f, r), n.child;
  }
  function co(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function h0(t, n, r, o, f) {
    var h = Df();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, t !== null && ks(n, null), kf(), gg(n), t !== null && Pi(t, n, o, !0), n.childLanes = f, null;
  }
  function Ws(t, n) {
    return n = eu(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function m0(t, n, r) {
    return pi(n, t.child, null, r), t = Ws(n, n.pendingProps), t.flags |= 2, $n(n), n.memoizedState = null, t;
  }
  function KS(t, n, r) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = Ws(n, o), n.lanes = 536870912, co(null, t);
        if (Bf(n), (t = Tt) ? (t = Cv(
          t,
          na
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Tr !== null ? { id: Oa, overflow: za } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Kp(t), r.return = n, n.child = r, ln = n, Tt = null)) : t = null, t === null) throw Dr(n);
        return n.lanes = 536870912, null;
      }
      return Ws(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var _ = h.dehydrated;
      if (Bf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = m0(
            t,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Xt || Pi(t, n, r, !1), f = (r & t.childLanes) !== 0, Xt || f) {
        if (o = Rt, o !== null && (_ = V(o, r), _ !== 0 && _ !== h.retryLane))
          throw h.retryLane = _, oi(t, _), An(o, t, _), id;
        uu(), n = m0(
          t,
          n,
          r
        );
      } else
        t = h.treeContext, Tt = ra(_.nextSibling), ln = n, it = !0, Mr = null, na = !1, t !== null && eg(n, t), n = Ws(n, o), n.flags |= 4096;
      return n;
    }
    return t = Qa(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Js(t, n) {
    var r = n.ref;
    if (r === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(l(284));
      (t === null || t.ref !== r) && (n.flags |= 4194816);
    }
  }
  function ld(t, n, r, o, f) {
    return fi(n), r = Vf(
      t,
      n,
      r,
      o,
      void 0,
      f
    ), o = $f(), t !== null && !Xt ? (qf(t, n, f), nr(t, n, f)) : (it && o && wf(n), n.flags |= 1, sn(t, n, r, f), n.child);
  }
  function p0(t, n, r, o, f, h) {
    return fi(n), n.updateQueue = null, r = yg(
      n,
      o,
      r,
      f
    ), vg(t), o = $f(), t !== null && !Xt ? (qf(t, n, h), nr(t, n, h)) : (it && o && wf(n), n.flags |= 1, sn(t, n, r, h), n.child);
  }
  function g0(t, n, r, o, f) {
    if (fi(n), n.stateNode === null) {
      var h = Yi, _ = r.contextType;
      typeof _ == "object" && _ !== null && (h = on(_)), h = new r(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = ad, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, jf(n), _ = r.contextType, h.context = typeof _ == "object" && _ !== null ? on(_) : Yi, h.state = n.memoizedState, _ = r.getDerivedStateFromProps, typeof _ == "function" && (nd(
        n,
        r,
        _,
        o
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (_ = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), _ !== h.state && ad.enqueueReplaceState(h, h.state, null), io(n, o, h, f), ro(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var M = n.memoizedProps, q = vi(r, M);
      h.props = q;
      var ie = h.context, ue = r.contextType;
      _ = Yi, typeof ue == "object" && ue !== null && (_ = on(ue));
      var fe = r.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof h.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (M || ie !== _) && n0(
        n,
        h,
        o,
        _
      ), jr = !1;
      var le = n.memoizedState;
      h.state = le, io(n, o, h, f), ro(), ie = n.memoizedState, M || le !== ie || jr ? (typeof fe == "function" && (nd(
        n,
        r,
        fe,
        o
      ), ie = n.memoizedState), (q = jr || t0(
        n,
        r,
        q,
        o,
        le,
        ie,
        _
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ie), h.props = o, h.state = ie, h.context = _, o = q) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, Of(t, n), _ = n.memoizedProps, ue = vi(r, _), h.props = ue, fe = n.pendingProps, le = h.context, ie = r.contextType, q = Yi, typeof ie == "object" && ie !== null && (q = on(ie)), M = r.getDerivedStateFromProps, (ie = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (_ !== fe || le !== q) && n0(
        n,
        h,
        o,
        q
      ), jr = !1, le = n.memoizedState, h.state = le, io(n, o, h, f), ro();
      var oe = n.memoizedState;
      _ !== fe || le !== oe || jr || t !== null && t.dependencies !== null && zs(t.dependencies) ? (typeof M == "function" && (nd(
        n,
        r,
        M,
        o
      ), oe = n.memoizedState), (ue = jr || t0(
        n,
        r,
        ue,
        o,
        le,
        oe,
        q
      ) || t !== null && t.dependencies !== null && zs(t.dependencies)) ? (ie || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, oe, q), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        oe,
        q
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || _ === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || _ === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), h.props = o, h.state = oe, h.context = q, o = ue) : (typeof h.componentDidUpdate != "function" || _ === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || _ === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, Js(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, r = o && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = pi(
      n,
      t.child,
      null,
      f
    ), n.child = pi(
      n,
      null,
      r,
      f
    )) : sn(t, n, r, f), n.memoizedState = h.state, t = n.child) : t = nr(
      t,
      n,
      f
    ), t;
  }
  function v0(t, n, r, o) {
    return ui(), n.flags |= 256, sn(t, n, r, o), n.child;
  }
  var od = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sd(t) {
    return { baseLanes: t, cachePool: lg() };
  }
  function ud(t, n, r) {
    return t = t !== null ? t.childLanes & ~r : 0, n && (t |= In), t;
  }
  function y0(t, n, r) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, _;
    if ((_ = h) || (_ = t !== null && t.memoizedState === null ? !1 : ($t.current & 2) !== 0), _ && (f = !0, n.flags &= -129), _ = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Lr(n) : kr(), (t = Tt) ? (t = Cv(
          t,
          na
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Tr !== null ? { id: Oa, overflow: za } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Kp(t), r.return = n, n.child = r, ln = n, Tt = null)) : t = null, t === null) throw Dr(n);
        return Gd(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (kr(), f = n.mode, M = eu(
        { mode: "hidden", children: M },
        f
      ), o = si(
        o,
        f,
        r,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = sd(r), o.childLanes = ud(
        t,
        _,
        r
      ), n.memoizedState = od, co(null, o)) : (Lr(n), cd(n, M));
    }
    var q = t.memoizedState;
    if (q !== null && (M = q.dehydrated, M !== null)) {
      if (h)
        n.flags & 256 ? (Lr(n), n.flags &= -257, n = fd(
          t,
          n,
          r
        )) : n.memoizedState !== null ? (kr(), n.child = t.child, n.flags |= 128, n = null) : (kr(), M = o.fallback, f = n.mode, o = eu(
          { mode: "visible", children: o.children },
          f
        ), M = si(
          M,
          f,
          r,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, pi(
          n,
          t.child,
          null,
          r
        ), o = n.child, o.memoizedState = sd(r), o.childLanes = ud(
          t,
          _,
          r
        ), n.memoizedState = od, n = co(null, o));
      else if (Lr(n), Gd(M)) {
        if (_ = M.nextSibling && M.nextSibling.dataset, _) var ie = _.dgst;
        _ = ie, o = Error(l(419)), o.stack = "", o.digest = _, Wl({ value: o, source: null, stack: null }), n = fd(
          t,
          n,
          r
        );
      } else if (Xt || Pi(t, n, r, !1), _ = (r & t.childLanes) !== 0, Xt || _) {
        if (_ = Rt, _ !== null && (o = V(_, r), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, oi(t, o), An(_, t, o), id;
        Yd(M) || uu(), n = fd(
          t,
          n,
          r
        );
      } else
        Yd(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = q.treeContext, Tt = ra(
          M.nextSibling
        ), ln = n, it = !0, Mr = null, na = !1, t !== null && eg(n, t), n = cd(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (kr(), M = o.fallback, f = n.mode, q = t.child, ie = q.sibling, o = Qa(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, ie !== null ? M = Qa(
      ie,
      M
    ) : (M = si(
      M,
      f,
      r,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, co(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = sd(r) : (f = M.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = lg(), M = {
      baseLanes: M.baseLanes | r,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = ud(
      t,
      _,
      r
    ), n.memoizedState = od, co(t.child, o)) : (Lr(n), r = t.child, t = r.sibling, r = Qa(r, {
      mode: "visible",
      children: o.children
    }), r.return = n, r.sibling = null, t !== null && (_ = n.deletions, _ === null ? (n.deletions = [t], n.flags |= 16) : _.push(t)), n.child = r, n.memoizedState = null, r);
  }
  function cd(t, n) {
    return n = eu(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function eu(t, n) {
    return t = Un(22, t, null, n), t.lanes = 0, t;
  }
  function fd(t, n, r) {
    return pi(n, t.child, null, r), t = cd(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function b0(t, n, r) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), Cf(t.return, n, r);
  }
  function dd(t, n, r, o, f, h) {
    var _ = t.memoizedState;
    _ === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: r,
      tailMode: f,
      treeForkCount: h
    } : (_.isBackwards = n, _.rendering = null, _.renderingStartTime = 0, _.last = o, _.tail = r, _.tailMode = f, _.treeForkCount = h);
  }
  function x0(t, n, r) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var _ = $t.current, M = (_ & 2) !== 0;
    if (M ? (_ = _ & 1 | 2, n.flags |= 128) : _ &= 1, G($t, _), sn(t, n, o, r), o = it ? Kl : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && b0(t, r, n);
        else if (t.tag === 19)
          b0(t, r, n);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === n) break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n)
            break e;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (f) {
      case "forwards":
        for (r = n.child, f = null; r !== null; )
          t = r.alternate, t !== null && qs(t) === null && (f = r), r = r.sibling;
        r = f, r === null ? (f = n.child, n.child = null) : (f = r.sibling, r.sibling = null), dd(
          n,
          !1,
          f,
          r,
          h,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, f = n.child, n.child = null; f !== null; ) {
          if (t = f.alternate, t !== null && qs(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = r, r = f, f = t;
        }
        dd(
          n,
          !0,
          r,
          null,
          h,
          o
        );
        break;
      case "together":
        dd(
          n,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function nr(t, n, r) {
    if (t !== null && (n.dependencies = t.dependencies), Ur |= n.lanes, (r & n.childLanes) === 0)
      if (t !== null) {
        if (Pi(
          t,
          n,
          r,
          !1
        ), (r & n.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && n.child !== t.child)
      throw Error(l(153));
    if (n.child !== null) {
      for (t = n.child, r = Qa(t, t.pendingProps), n.child = r, r.return = n; t.sibling !== null; )
        t = t.sibling, r = r.sibling = Qa(t, t.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function hd(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && zs(t)));
  }
  function WS(t, n, r) {
    switch (n.tag) {
      case 3:
        J(n, n.stateNode.containerInfo), Ar(n, Gt, t.memoizedState.cache), ui();
        break;
      case 27:
      case 5:
        De(n);
        break;
      case 4:
        J(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ar(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Bf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Lr(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? y0(t, n, r) : (Lr(n), t = nr(
            t,
            n,
            r
          ), t !== null ? t.sibling : null);
        Lr(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (r & n.childLanes) !== 0, o || (Pi(
          t,
          n,
          r,
          !1
        ), o = (r & n.childLanes) !== 0), f) {
          if (o)
            return x0(
              t,
              n,
              r
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), G($t, $t.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, d0(
          t,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Ar(n, Gt, t.memoizedState.cache);
    }
    return nr(t, n, r);
  }
  function w0(t, n, r) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Xt = !0;
      else {
        if (!hd(t, r) && (n.flags & 128) === 0)
          return Xt = !1, WS(
            t,
            n,
            r
          );
        Xt = (t.flags & 131072) !== 0;
      }
    else
      Xt = !1, it && (n.flags & 1048576) !== 0 && Jp(n, Kl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = hi(n.elementType), n.type = t, typeof t == "function")
            yf(t) ? (o = vi(t, o), n.tag = 1, n = g0(
              null,
              n,
              t,
              o,
              r
            )) : (n.tag = 0, n = ld(
              null,
              n,
              t,
              o,
              r
            ));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === O) {
                n.tag = 11, n = u0(
                  null,
                  n,
                  t,
                  o,
                  r
                );
                break e;
              } else if (f === U) {
                n.tag = 14, n = c0(
                  null,
                  n,
                  t,
                  o,
                  r
                );
                break e;
              }
            }
            throw n = L(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return ld(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return o = n.type, f = vi(
          o,
          n.pendingProps
        ), g0(
          t,
          n,
          o,
          f,
          r
        );
      case 3:
        e: {
          if (J(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, Of(t, n), io(n, o, null, r);
          var _ = n.memoizedState;
          if (o = _.cache, Ar(n, Gt, o), o !== h.cache && Rf(
            n,
            [Gt],
            r,
            !0
          ), ro(), o = _.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: _.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = v0(
                t,
                n,
                o,
                r
              );
              break e;
            } else if (o !== f) {
              f = Jn(
                Error(l(424)),
                n
              ), Wl(f), n = v0(
                t,
                n,
                o,
                r
              );
              break e;
            } else {
              switch (t = n.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Tt = ra(t.firstChild), ln = n, it = !0, Mr = null, na = !0, r = dg(
                n,
                null,
                o,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (ui(), o === f) {
              n = nr(
                t,
                n,
                r
              );
              break e;
            }
            sn(t, n, o, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Js(t, n), t === null ? (r = jv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : it || (r = n.type, t = n.pendingProps, o = gu(
          de.current
        ).createElement(r), o[xe] = n, o[Ne] = t, un(o, r, t), rt(o), n.stateNode = o) : n.memoizedState = jv(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return De(n), t === null && it && (o = n.stateNode = Mv(
          n.type,
          n.pendingProps,
          de.current
        ), ln = n, na = !0, f = Tt, Yr(n.type) ? (Fd = f, Tt = ra(o.firstChild)) : Tt = f), sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), Js(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Tt) && (o = TE(
          o,
          n.type,
          n.pendingProps,
          na
        ), o !== null ? (n.stateNode = o, ln = n, Tt = ra(o.firstChild), na = !1, f = !0) : f = !1), f || Dr(n)), De(n), f = n.type, h = n.pendingProps, _ = t !== null ? t.memoizedProps : null, o = h.children, $d(f, h) ? o = null : _ !== null && $d(f, _) && (n.flags |= 32), n.memoizedState !== null && (f = Vf(
          t,
          n,
          IS,
          null,
          null,
          r
        ), Co._currentValue = f), Js(t, n), sn(t, n, o, r), n.child;
      case 6:
        return t === null && it && ((t = r = Tt) && (r = ME(
          r,
          n.pendingProps,
          na
        ), r !== null ? (n.stateNode = r, ln = n, Tt = null, t = !0) : t = !1), t || Dr(n)), null;
      case 13:
        return y0(t, n, r);
      case 4:
        return J(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = pi(
          n,
          null,
          o,
          r
        ) : sn(t, n, o, r), n.child;
      case 11:
        return u0(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return sn(
          t,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return o = n.pendingProps, Ar(n, n.type, o.value), sn(t, n, o.children, r), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, fi(n), f = on(f), o = o(f), n.flags |= 1, sn(t, n, o, r), n.child;
      case 14:
        return c0(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return f0(
          t,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return x0(t, n, r);
      case 31:
        return KS(t, n, r);
      case 22:
        return d0(
          t,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return fi(n), o = on(Gt), t === null ? (f = Df(), f === null && (f = Rt, h = Tf(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= r), f = h), n.memoizedState = { parent: o, cache: f }, jf(n), Ar(n, Gt, f)) : ((t.lanes & r) !== 0 && (Of(t, n), io(n, null, null, r), ro()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ar(n, Gt, o)) : (o = h.cache, Ar(n, Gt, o), o !== f.cache && Rf(
          n,
          [Gt],
          r,
          !0
        ))), sn(
          t,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function ar(t) {
    t.flags |= 4;
  }
  function md(t, n, r, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (P0()) t.flags |= 8192;
        else
          throw mi = Bs, Af;
    } else t.flags &= -16777217;
  }
  function _0(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Hv(n))
      if (P0()) t.flags |= 8192;
      else
        throw mi = Bs, Af;
  }
  function tu(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, ll |= n);
  }
  function fo(t, n) {
    if (!it)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? t.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = t.tail;
          for (var o = null; r !== null; )
            r.alternate !== null && (o = r), r = r.sibling;
          o === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : o.sibling = null;
      }
  }
  function Mt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, r = 0, o = 0;
    if (n)
      for (var f = t.child; f !== null; )
        r |= f.lanes | f.childLanes, o |= f.subtreeFlags & 65011712, o |= f.flags & 65011712, f.return = t, f = f.sibling;
    else
      for (f = t.child; f !== null; )
        r |= f.lanes | f.childLanes, o |= f.subtreeFlags, o |= f.flags, f.return = t, f = f.sibling;
    return t.subtreeFlags |= o, t.childLanes = r, n;
  }
  function JS(t, n, r) {
    var o = n.pendingProps;
    switch (_f(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Mt(n), null;
      case 1:
        return Mt(n), null;
      case 3:
        return r = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Ja(Gt), ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (t === null || t.child === null) && (Xi(n) ? ar(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Ef())), Mt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (ar(n), h !== null ? (Mt(n), _0(n, h)) : (Mt(n), md(
          n,
          f,
          null,
          o,
          r
        ))) : h ? h !== t.memoizedState ? (ar(n), Mt(n), _0(n, h)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && ar(n), Mt(n), md(
          n,
          f,
          t,
          o,
          r
        )), null;
      case 27:
        if (Oe(n), r = de.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ar(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = ee.current, Xi(n) ? tg(n) : (t = Mv(f, o, r), n.stateNode = t, ar(n));
        }
        return Mt(n), null;
      case 5:
        if (Oe(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ar(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (h = ee.current, Xi(n))
            tg(n);
          else {
            var _ = gu(
              de.current
            );
            switch (h) {
              case 1:
                h = _.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = _.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = _.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = _.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = _.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof o.is == "string" ? _.createElement("select", {
                      is: o.is
                    }) : _.createElement("select"), o.multiple ? h.multiple = !0 : o.size && (h.size = o.size);
                    break;
                  default:
                    h = typeof o.is == "string" ? _.createElement(f, { is: o.is }) : _.createElement(f);
                }
            }
            h[xe] = n, h[Ne] = o;
            e: for (_ = n.child; _ !== null; ) {
              if (_.tag === 5 || _.tag === 6)
                h.appendChild(_.stateNode);
              else if (_.tag !== 4 && _.tag !== 27 && _.child !== null) {
                _.child.return = _, _ = _.child;
                continue;
              }
              if (_ === n) break e;
              for (; _.sibling === null; ) {
                if (_.return === null || _.return === n)
                  break e;
                _ = _.return;
              }
              _.sibling.return = _.return, _ = _.sibling;
            }
            n.stateNode = h;
            e: switch (un(h, f, o), f) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break e;
              case "img":
                o = !0;
                break e;
              default:
                o = !1;
            }
            o && ar(n);
          }
        }
        return Mt(n), md(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          r
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && ar(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = de.current, Xi(n)) {
            if (t = n.stateNode, r = n.memoizedProps, o = null, f = ln, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[xe] = n, t = !!(t.nodeValue === r || o !== null && o.suppressHydrationWarning === !0 || yv(t.nodeValue, r)), t || Dr(n, !0);
          } else
            t = gu(t).createTextNode(
              o
            ), t[xe] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (r = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Xi(n), r !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[xe] = n;
            } else
              ui(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            r = Ef(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), t = !0;
          if (!t)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Xi(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[xe] = n;
            } else
              ui(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = Ef(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
        }
        return $n(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = o !== null, t = t !== null && t.memoizedState !== null, r && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), r !== t && r && (n.child.flags |= 8192), tu(n, n.updateQueue), Mt(n), null);
      case 4:
        return ve(), t === null && kd(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Ja(n.type), Mt(n), null;
      case 19:
        if (k($t), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) fo(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = qs(t), h !== null) {
                  for (n.flags |= 128, fo(o, !1), t = h.updateQueue, n.updateQueue = t, tu(n, t), n.subtreeFlags = 0, t = r, r = n.child; r !== null; )
                    Qp(r, t), r = r.sibling;
                  return G(
                    $t,
                    $t.current & 1 | 2
                  ), it && Ka(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Ke() > lu && (n.flags |= 128, f = !0, fo(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = qs(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, tu(n, t), fo(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !it)
                return Mt(n), null;
            } else
              2 * Ke() - o.renderingStartTime > lu && r !== 536870912 && (n.flags |= 128, f = !0, fo(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ke(), t.sibling = null, r = $t.current, G(
          $t,
          f ? r & 1 | 2 : r & 1
        ), it && Ka(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return $n(n), Hf(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), r = n.updateQueue, r !== null && tu(n, r.retryQueue), r = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== r && (n.flags |= 2048), t !== null && k(di), null;
      case 24:
        return r = null, t !== null && (r = t.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ja(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function eE(t, n) {
    switch (_f(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Ja(Gt), ve(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Oe(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($n(n), n.alternate === null)
            throw Error(l(340));
          ui();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if ($n(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          ui();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return k($t), null;
      case 4:
        return ve(), null;
      case 10:
        return Ja(n.type), null;
      case 22:
      case 23:
        return $n(n), Hf(), t !== null && k(di), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Ja(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function S0(t, n) {
    switch (_f(n), n.tag) {
      case 3:
        Ja(Gt), ve();
        break;
      case 26:
      case 27:
      case 5:
        Oe(n);
        break;
      case 4:
        ve();
        break;
      case 31:
        n.memoizedState !== null && $n(n);
        break;
      case 13:
        $n(n);
        break;
      case 19:
        k($t);
        break;
      case 10:
        Ja(n.type);
        break;
      case 22:
      case 23:
        $n(n), Hf(), t !== null && k(di);
        break;
      case 24:
        Ja(Gt);
    }
  }
  function ho(t, n) {
    try {
      var r = n.updateQueue, o = r !== null ? r.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        r = f;
        do {
          if ((r.tag & t) === t) {
            o = void 0;
            var h = r.create, _ = r.inst;
            o = h(), _.destroy = o;
          }
          r = r.next;
        } while (r !== f);
      }
    } catch (M) {
      _t(n, n.return, M);
    }
  }
  function Hr(t, n, r) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        o = h;
        do {
          if ((o.tag & t) === t) {
            var _ = o.inst, M = _.destroy;
            if (M !== void 0) {
              _.destroy = void 0, f = n;
              var q = r, ie = M;
              try {
                ie();
              } catch (ue) {
                _t(
                  f,
                  q,
                  ue
                );
              }
            }
          }
          o = o.next;
        } while (o !== h);
      }
    } catch (ue) {
      _t(n, n.return, ue);
    }
  }
  function E0(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var r = t.stateNode;
      try {
        mg(n, r);
      } catch (o) {
        _t(t, t.return, o);
      }
    }
  }
  function N0(t, n, r) {
    r.props = vi(
      t.type,
      t.memoizedProps
    ), r.state = t.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (o) {
      _t(t, n, o);
    }
  }
  function mo(t, n) {
    try {
      var r = t.ref;
      if (r !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var o = t.stateNode;
            break;
          case 30:
            o = t.stateNode;
            break;
          default:
            o = t.stateNode;
        }
        typeof r == "function" ? t.refCleanup = r(o) : r.current = o;
      }
    } catch (f) {
      _t(t, n, f);
    }
  }
  function La(t, n) {
    var r = t.ref, o = t.refCleanup;
    if (r !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          _t(t, n, f);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (f) {
          _t(t, n, f);
        }
      else r.current = null;
  }
  function C0(t) {
    var n = t.type, r = t.memoizedProps, o = t.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && o.focus();
          break e;
        case "img":
          r.src ? o.src = r.src : r.srcSet && (o.srcset = r.srcSet);
      }
    } catch (f) {
      _t(t, t.return, f);
    }
  }
  function pd(t, n, r) {
    try {
      var o = t.stateNode;
      _E(o, t.type, r, n), o[Ne] = n;
    } catch (f) {
      _t(t, t.return, f);
    }
  }
  function R0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Yr(t.type) || t.tag === 4;
  }
  function gd(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || R0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Yr(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function vd(t, n, r) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(t, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(t), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = Pa));
    else if (o !== 4 && (o === 27 && Yr(t.type) && (r = t.stateNode, n = null), t = t.child, t !== null))
      for (vd(t, n, r), t = t.sibling; t !== null; )
        vd(t, n, r), t = t.sibling;
  }
  function nu(t, n, r) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? r.insertBefore(t, n) : r.appendChild(t);
    else if (o !== 4 && (o === 27 && Yr(t.type) && (r = t.stateNode), t = t.child, t !== null))
      for (nu(t, n, r), t = t.sibling; t !== null; )
        nu(t, n, r), t = t.sibling;
  }
  function T0(t) {
    var n = t.stateNode, r = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      un(n, o, r), n[xe] = t, n[Ne] = r;
    } catch (h) {
      _t(t, t.return, h);
    }
  }
  var rr = !1, Pt = !1, yd = !1, M0 = typeof WeakSet == "function" ? WeakSet : Set, tn = null;
  function tE(t, n) {
    if (t = t.containerInfo, Ud = Su, t = $p(t), ff(t)) {
      if ("selectionStart" in t)
        var r = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        e: {
          r = (r = t.ownerDocument) && r.defaultView || window;
          var o = r.getSelection && r.getSelection();
          if (o && o.rangeCount !== 0) {
            r = o.anchorNode;
            var f = o.anchorOffset, h = o.focusNode;
            o = o.focusOffset;
            try {
              r.nodeType, h.nodeType;
            } catch {
              r = null;
              break e;
            }
            var _ = 0, M = -1, q = -1, ie = 0, ue = 0, fe = t, le = null;
            t: for (; ; ) {
              for (var oe; fe !== r || f !== 0 && fe.nodeType !== 3 || (M = _ + f), fe !== h || o !== 0 && fe.nodeType !== 3 || (q = _ + o), fe.nodeType === 3 && (_ += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                le = fe, fe = oe;
              for (; ; ) {
                if (fe === t) break t;
                if (le === r && ++ie === f && (M = _), le === h && ++ue === o && (q = _), (oe = fe.nextSibling) !== null) break;
                fe = le, le = fe.parentNode;
              }
              fe = oe;
            }
            r = M === -1 || q === -1 ? null : { start: M, end: q };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Vd = { focusedElem: t, selectionRange: r }, Su = !1, tn = n; tn !== null; )
      if (n = tn, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, tn = t;
      else
        for (; tn !== null; ) {
          switch (n = tn, h = n.alternate, t = n.flags, n.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = n.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (r = 0; r < t.length; r++)
                  f = t[r], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && h !== null) {
                t = void 0, r = n, f = h.memoizedProps, h = h.memoizedState, o = r.stateNode;
                try {
                  var Te = vi(
                    r.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    Te,
                    h
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Ue) {
                  _t(
                    r,
                    r.return,
                    Ue
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, r = t.nodeType, r === 9)
                  Id(t);
                else if (r === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Id(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(l(163));
          }
          if (t = n.sibling, t !== null) {
            t.return = n.return, tn = t;
            break;
          }
          tn = n.return;
        }
  }
  function D0(t, n, r) {
    var o = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        lr(t, r), o & 4 && ho(5, r);
        break;
      case 1:
        if (lr(t, r), o & 4)
          if (t = r.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (_) {
              _t(r, r.return, _);
            }
          else {
            var f = vi(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              t.componentDidUpdate(
                f,
                n,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (_) {
              _t(
                r,
                r.return,
                _
              );
            }
          }
        o & 64 && E0(r), o & 512 && mo(r, r.return);
        break;
      case 3:
        if (lr(t, r), o & 64 && (t = r.updateQueue, t !== null)) {
          if (n = null, r.child !== null)
            switch (r.child.tag) {
              case 27:
              case 5:
                n = r.child.stateNode;
                break;
              case 1:
                n = r.child.stateNode;
            }
          try {
            mg(t, n);
          } catch (_) {
            _t(r, r.return, _);
          }
        }
        break;
      case 27:
        n === null && o & 4 && T0(r);
      case 26:
      case 5:
        lr(t, r), n === null && o & 4 && C0(r), o & 512 && mo(r, r.return);
        break;
      case 12:
        lr(t, r);
        break;
      case 31:
        lr(t, r), o & 4 && O0(t, r);
        break;
      case 13:
        lr(t, r), o & 4 && z0(t, r), o & 64 && (t = r.memoizedState, t !== null && (t = t.dehydrated, t !== null && (r = cE.bind(
          null,
          r
        ), DE(t, r))));
        break;
      case 22:
        if (o = r.memoizedState !== null || rr, !o) {
          n = n !== null && n.memoizedState !== null || Pt, f = rr;
          var h = Pt;
          rr = o, (Pt = n) && !h ? or(
            t,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : lr(t, r), rr = f, Pt = h;
        }
        break;
      case 30:
        break;
      default:
        lr(t, r);
    }
  }
  function A0(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, A0(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && ot(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, Rn = !1;
  function ir(t, n, r) {
    for (r = r.child; r !== null; )
      j0(t, n, r), r = r.sibling;
  }
  function j0(t, n, r) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(nn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Pt || La(r, n), ir(
          t,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Pt || La(r, n);
        var o = Dt, f = Rn;
        Yr(r.type) && (Dt = r.stateNode, Rn = !1), ir(
          t,
          n,
          r
        ), So(r.stateNode), Dt = o, Rn = f;
        break;
      case 5:
        Pt || La(r, n);
      case 6:
        if (o = Dt, f = Rn, Dt = null, ir(
          t,
          n,
          r
        ), Dt = o, Rn = f, Dt !== null)
          if (Rn)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(r.stateNode);
            } catch (h) {
              _t(
                r,
                n,
                h
              );
            }
          else
            try {
              Dt.removeChild(r.stateNode);
            } catch (h) {
              _t(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        Dt !== null && (Rn ? (t = Dt, Ev(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          r.stateNode
        ), ml(t)) : Ev(Dt, r.stateNode));
        break;
      case 4:
        o = Dt, f = Rn, Dt = r.stateNode.containerInfo, Rn = !0, ir(
          t,
          n,
          r
        ), Dt = o, Rn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Hr(2, r, n), Pt || Hr(4, r, n), ir(
          t,
          n,
          r
        );
        break;
      case 1:
        Pt || (La(r, n), o = r.stateNode, typeof o.componentWillUnmount == "function" && N0(
          r,
          n,
          o
        )), ir(
          t,
          n,
          r
        );
        break;
      case 21:
        ir(
          t,
          n,
          r
        );
        break;
      case 22:
        Pt = (o = Pt) || r.memoizedState !== null, ir(
          t,
          n,
          r
        ), Pt = o;
        break;
      default:
        ir(
          t,
          n,
          r
        );
    }
  }
  function O0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ml(t);
      } catch (r) {
        _t(n, n.return, r);
      }
    }
  }
  function z0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ml(t);
      } catch (r) {
        _t(n, n.return, r);
      }
  }
  function nE(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new M0()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new M0()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function au(t, n) {
    var r = nE(t);
    n.forEach(function(o) {
      if (!r.has(o)) {
        r.add(o);
        var f = fE.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Tn(t, n) {
    var r = n.deletions;
    if (r !== null)
      for (var o = 0; o < r.length; o++) {
        var f = r[o], h = t, _ = n, M = _;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Yr(M.type)) {
                Dt = M.stateNode, Rn = !1;
                break e;
              }
              break;
            case 5:
              Dt = M.stateNode, Rn = !1;
              break e;
            case 3:
            case 4:
              Dt = M.stateNode.containerInfo, Rn = !0;
              break e;
          }
          M = M.return;
        }
        if (Dt === null) throw Error(l(160));
        j0(h, _, f), Dt = null, Rn = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        L0(n, t), n = n.sibling;
  }
  var ba = null;
  function L0(t, n) {
    var r = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, t), Mn(t), o & 4 && (Hr(3, t, t.return), ho(3, t), Hr(5, t, t.return));
        break;
      case 1:
        Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), o & 64 && rr && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (r = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = r === null ? o : r.concat(o))));
        break;
      case 26:
        var f = ba;
        if (Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), o & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (o = t.memoizedState, r === null)
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  o = t.type, r = t.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Pe] || h[xe] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(o), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), un(h, o, r), h[xe] = t, rt(h), o = h;
                      break e;
                    case "link":
                      var _ = Lv(
                        "link",
                        "href",
                        f
                      ).get(o + (r.href || ""));
                      if (_) {
                        for (var M = 0; M < _.length; M++)
                          if (h = _[M], h.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && h.getAttribute("rel") === (r.rel == null ? null : r.rel) && h.getAttribute("title") === (r.title == null ? null : r.title) && h.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            _.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), un(h, o, r), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (_ = Lv(
                        "meta",
                        "content",
                        f
                      ).get(o + (r.content || ""))) {
                        for (M = 0; M < _.length; M++)
                          if (h = _[M], h.getAttribute("content") === (r.content == null ? null : "" + r.content) && h.getAttribute("name") === (r.name == null ? null : r.name) && h.getAttribute("property") === (r.property == null ? null : r.property) && h.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && h.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            _.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), un(h, o, r), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[xe] = t, rt(h), o = h;
                }
                t.stateNode = o;
              } else
                kv(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = zv(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, o === null ? kv(
              f,
              t.type,
              t.stateNode
            ) : zv(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && pd(
              t,
              t.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), r !== null && o & 4 && pd(
          t,
          t.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, t), Mn(t), o & 512 && (Pt || r === null || La(r, r.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            Hi(f, "");
          } catch (Te) {
            _t(t, t.return, Te);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, pd(
          t,
          f,
          r !== null ? r.memoizedProps : f
        )), o & 1024 && (yd = !0);
        break;
      case 6:
        if (Tn(n, t), Mn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, r = t.stateNode;
          try {
            r.nodeValue = o;
          } catch (Te) {
            _t(t, t.return, Te);
          }
        }
        break;
      case 3:
        if (bu = null, f = ba, ba = vu(n.containerInfo), Tn(n, t), ba = f, Mn(t), o & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            ml(n.containerInfo);
          } catch (Te) {
            _t(t, t.return, Te);
          }
        yd && (yd = !1, k0(t));
        break;
      case 4:
        o = ba, ba = vu(
          t.stateNode.containerInfo
        ), Tn(n, t), Mn(t), ba = o;
        break;
      case 12:
        Tn(n, t), Mn(t);
        break;
      case 31:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, au(t, o)));
        break;
      case 13:
        Tn(n, t), Mn(t), t.child.flags & 8192 && t.memoizedState !== null != (r !== null && r.memoizedState !== null) && (iu = Ke()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, au(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var q = r !== null && r.memoizedState !== null, ie = rr, ue = Pt;
        if (rr = ie || f, Pt = ue || q, Tn(n, t), Pt = ue, rr = ie, Mn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (r === null || q || rr || Pt || yi(t)), r = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                q = r = n;
                try {
                  if (h = q.stateNode, f)
                    _ = h.style, typeof _.setProperty == "function" ? _.setProperty("display", "none", "important") : _.display = "none";
                  else {
                    M = q.stateNode;
                    var fe = q.memoizedProps.style, le = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    M.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (Te) {
                  _t(q, q.return, Te);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                q = n;
                try {
                  q.stateNode.nodeValue = f ? "" : q.memoizedProps;
                } catch (Te) {
                  _t(q, q.return, Te);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                q = n;
                try {
                  var oe = q.stateNode;
                  f ? Nv(oe, !0) : Nv(q.stateNode, !1);
                } catch (Te) {
                  _t(q, q.return, Te);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === t) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              r === n && (r = null), n = n.return;
            }
            r === n && (r = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = t.updateQueue, o !== null && (r = o.retryQueue, r !== null && (o.retryQueue = null, au(t, r))));
        break;
      case 19:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, au(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Tn(n, t), Mn(t);
    }
  }
  function Mn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var r, o = t.return; o !== null; ) {
          if (R0(o)) {
            r = o;
            break;
          }
          o = o.return;
        }
        if (r == null) throw Error(l(160));
        switch (r.tag) {
          case 27:
            var f = r.stateNode, h = gd(t);
            nu(t, h, f);
            break;
          case 5:
            var _ = r.stateNode;
            r.flags & 32 && (Hi(_, ""), r.flags &= -33);
            var M = gd(t);
            nu(t, M, _);
            break;
          case 3:
          case 4:
            var q = r.stateNode.containerInfo, ie = gd(t);
            vd(
              t,
              ie,
              q
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ue) {
        _t(t, t.return, ue);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function k0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        k0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function lr(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        D0(t, n.alternate, n), n = n.sibling;
  }
  function yi(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Hr(4, n, n.return), yi(n);
          break;
        case 1:
          La(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && N0(
            n,
            n.return,
            r
          ), yi(n);
          break;
        case 27:
          So(n.stateNode);
        case 26:
        case 5:
          La(n, n.return), yi(n);
          break;
        case 22:
          n.memoizedState === null && yi(n);
          break;
        case 30:
          yi(n);
          break;
        default:
          yi(n);
      }
      t = t.sibling;
    }
  }
  function or(t, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, h = n, _ = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          or(
            f,
            h,
            r
          ), ho(4, h);
          break;
        case 1:
          if (or(
            f,
            h,
            r
          ), o = h, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (ie) {
              _t(o, o.return, ie);
            }
          if (o = h, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var q = f.shared.hiddenCallbacks;
              if (q !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < q.length; f++)
                  hg(q[f], M);
            } catch (ie) {
              _t(o, o.return, ie);
            }
          }
          r && _ & 64 && E0(h), mo(h, h.return);
          break;
        case 27:
          T0(h);
        case 26:
        case 5:
          or(
            f,
            h,
            r
          ), r && o === null && _ & 4 && C0(h), mo(h, h.return);
          break;
        case 12:
          or(
            f,
            h,
            r
          );
          break;
        case 31:
          or(
            f,
            h,
            r
          ), r && _ & 4 && O0(f, h);
          break;
        case 13:
          or(
            f,
            h,
            r
          ), r && _ & 4 && z0(f, h);
          break;
        case 22:
          h.memoizedState === null && or(
            f,
            h,
            r
          ), mo(h, h.return);
          break;
        case 30:
          break;
        default:
          or(
            f,
            h,
            r
          );
      }
      n = n.sibling;
    }
  }
  function bd(t, n) {
    var r = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== r && (t != null && t.refCount++, r != null && Jl(r));
  }
  function xd(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Jl(t));
  }
  function xa(t, n, r, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        H0(
          t,
          n,
          r,
          o
        ), n = n.sibling;
  }
  function H0(t, n, r, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xa(
          t,
          n,
          r,
          o
        ), f & 2048 && ho(9, n);
        break;
      case 1:
        xa(
          t,
          n,
          r,
          o
        );
        break;
      case 3:
        xa(
          t,
          n,
          r,
          o
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Jl(t)));
        break;
      case 12:
        if (f & 2048) {
          xa(
            t,
            n,
            r,
            o
          ), t = n.stateNode;
          try {
            var h = n.memoizedProps, _ = h.id, M = h.onPostCommit;
            typeof M == "function" && M(
              _,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (q) {
            _t(n, n.return, q);
          }
        } else
          xa(
            t,
            n,
            r,
            o
          );
        break;
      case 31:
        xa(
          t,
          n,
          r,
          o
        );
        break;
      case 13:
        xa(
          t,
          n,
          r,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, _ = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? xa(
          t,
          n,
          r,
          o
        ) : po(t, n) : h._visibility & 2 ? xa(
          t,
          n,
          r,
          o
        ) : (h._visibility |= 2, al(
          t,
          n,
          r,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && bd(_, n);
        break;
      case 24:
        xa(
          t,
          n,
          r,
          o
        ), f & 2048 && xd(n.alternate, n);
        break;
      default:
        xa(
          t,
          n,
          r,
          o
        );
    }
  }
  function al(t, n, r, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, _ = n, M = r, q = o, ie = _.flags;
      switch (_.tag) {
        case 0:
        case 11:
        case 15:
          al(
            h,
            _,
            M,
            q,
            f
          ), ho(8, _);
          break;
        case 23:
          break;
        case 22:
          var ue = _.stateNode;
          _.memoizedState !== null ? ue._visibility & 2 ? al(
            h,
            _,
            M,
            q,
            f
          ) : po(
            h,
            _
          ) : (ue._visibility |= 2, al(
            h,
            _,
            M,
            q,
            f
          )), f && ie & 2048 && bd(
            _.alternate,
            _
          );
          break;
        case 24:
          al(
            h,
            _,
            M,
            q,
            f
          ), f && ie & 2048 && xd(_.alternate, _);
          break;
        default:
          al(
            h,
            _,
            M,
            q,
            f
          );
      }
      n = n.sibling;
    }
  }
  function po(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            po(r, o), f & 2048 && bd(
              o.alternate,
              o
            );
            break;
          case 24:
            po(r, o), f & 2048 && xd(o.alternate, o);
            break;
          default:
            po(r, o);
        }
        n = n.sibling;
      }
  }
  var go = 8192;
  function rl(t, n, r) {
    if (t.subtreeFlags & go)
      for (t = t.child; t !== null; )
        B0(
          t,
          n,
          r
        ), t = t.sibling;
  }
  function B0(t, n, r) {
    switch (t.tag) {
      case 26:
        rl(
          t,
          n,
          r
        ), t.flags & go && t.memoizedState !== null && qE(
          r,
          ba,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        rl(
          t,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var o = ba;
        ba = vu(t.stateNode.containerInfo), rl(
          t,
          n,
          r
        ), ba = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = go, go = 16777216, rl(
          t,
          n,
          r
        ), go = o) : rl(
          t,
          n,
          r
        ));
        break;
      default:
        rl(
          t,
          n,
          r
        );
    }
  }
  function U0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function vo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          tn = o, $0(
            o,
            t
          );
        }
      U0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        V0(t), t = t.sibling;
  }
  function V0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        vo(t), t.flags & 2048 && Hr(9, t, t.return);
        break;
      case 3:
        vo(t);
        break;
      case 12:
        vo(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, ru(t)) : vo(t);
        break;
      default:
        vo(t);
    }
  }
  function ru(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          tn = o, $0(
            o,
            t
          );
        }
      U0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Hr(8, n, n.return), ru(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, ru(n));
          break;
        default:
          ru(n);
      }
      t = t.sibling;
    }
  }
  function $0(t, n) {
    for (; tn !== null; ) {
      var r = tn;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Hr(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var o = r.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Jl(r.memoizedState.cache);
      }
      if (o = r.child, o !== null) o.return = r, tn = o;
      else
        e: for (r = t; tn !== null; ) {
          o = tn;
          var f = o.sibling, h = o.return;
          if (A0(o), o === r) {
            tn = null;
            break e;
          }
          if (f !== null) {
            f.return = h, tn = f;
            break e;
          }
          tn = h;
        }
    }
  }
  var aE = {
    getCacheForType: function(t) {
      var n = on(Gt), r = n.data.get(t);
      return r === void 0 && (r = t(), n.data.set(t, r)), r;
    },
    cacheSignal: function() {
      return on(Gt).controller.signal;
    }
  }, rE = typeof WeakMap == "function" ? WeakMap : Map, mt = 0, Rt = null, We = null, tt = 0, wt = 0, qn = null, Br = !1, il = !1, wd = !1, sr = 0, Bt = 0, Ur = 0, bi = 0, _d = 0, In = 0, ll = 0, yo = null, Dn = null, Sd = !1, iu = 0, q0 = 0, lu = 1 / 0, ou = null, Vr = null, Jt = 0, $r = null, ol = null, ur = 0, Ed = 0, Nd = null, I0 = null, bo = 0, Cd = null;
  function Yn() {
    return (mt & 2) !== 0 && tt !== 0 ? tt & -tt : T.T !== null ? jd() : me();
  }
  function Y0() {
    if (In === 0)
      if ((tt & 536870912) === 0 || it) {
        var t = Ln;
        Ln <<= 1, (Ln & 3932160) === 0 && (Ln = 262144), In = t;
      } else In = 536870912;
    return t = Vn.current, t !== null && (t.flags |= 32), In;
  }
  function An(t, n, r) {
    (t === Rt && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null) && (sl(t, 0), qr(
      t,
      tt,
      In,
      !1
    )), gt(t, r), ((mt & 2) === 0 || t !== Rt) && (t === Rt && ((mt & 2) === 0 && (bi |= r), Bt === 4 && qr(
      t,
      tt,
      In,
      !1
    )), ka(t));
  }
  function G0(t, n, r) {
    if ((mt & 6) !== 0) throw Error(l(327));
    var o = !r && (n & 127) === 0 && (n & t.expiredLanes) === 0 || bt(t, n), f = o ? oE(t, n) : Td(t, n, !0), h = o;
    do {
      if (f === 0) {
        il && !o && qr(t, n, 0, !1);
        break;
      } else {
        if (r = t.current.alternate, h && !iE(r)) {
          f = Td(t, n, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var _ = 0;
          else
            _ = t.pendingLanes & -536870913, _ = _ !== 0 ? _ : _ & 536870912 ? 536870912 : 0;
          if (_ !== 0) {
            n = _;
            e: {
              var M = t;
              f = yo;
              var q = M.current.memoizedState.isDehydrated;
              if (q && (sl(M, _).flags |= 256), _ = Td(
                M,
                _,
                !1
              ), _ !== 2) {
                if (wd && !q) {
                  M.errorRecoveryDisabledLanes |= h, bi |= h, f = 4;
                  break e;
                }
                h = Dn, Dn = f, h !== null && (Dn === null ? Dn = h : Dn.push.apply(
                  Dn,
                  h
                ));
              }
              f = _;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          sl(t, 0), qr(t, n, 0, !0);
          break;
        }
        e: {
          switch (o = t, h = f, h) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              qr(
                o,
                n,
                In,
                !Br
              );
              break e;
            case 2:
              Dn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = iu + 300 - Ke(), 10 < f)) {
            if (qr(
              o,
              n,
              In,
              !Br
            ), Ve(o, 0, !0) !== 0) break e;
            ur = n, o.timeoutHandle = _v(
              F0.bind(
                null,
                o,
                r,
                Dn,
                ou,
                Sd,
                n,
                In,
                bi,
                ll,
                Br,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          F0(
            o,
            r,
            Dn,
            ou,
            Sd,
            n,
            In,
            bi,
            ll,
            Br,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ka(t);
  }
  function F0(t, n, r, o, f, h, _, M, q, ie, ue, fe, le, oe) {
    if (t.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pa
      }, B0(
        n,
        h,
        fe
      );
      var Te = (h & 62914560) === h ? iu - Ke() : (h & 4194048) === h ? q0 - Ke() : 0;
      if (Te = IE(
        fe,
        Te
      ), Te !== null) {
        ur = h, t.cancelPendingCommit = Te(
          ev.bind(
            null,
            t,
            n,
            h,
            r,
            o,
            f,
            _,
            M,
            q,
            ue,
            fe,
            null,
            le,
            oe
          )
        ), qr(t, h, _, !ie);
        return;
      }
    }
    ev(
      t,
      n,
      h,
      r,
      o,
      f,
      _,
      M,
      q
    );
  }
  function iE(t) {
    for (var n = t; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var o = 0; o < r.length; o++) {
          var f = r[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Bn(h(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (r = n.child, n.subtreeFlags & 16384 && r !== null)
        r.return = n, n = r;
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function qr(t, n, r, o) {
    n &= ~_d, n &= ~bi, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), _ = 1 << h;
      o[h] = -1, f &= ~_;
    }
    r !== 0 && pa(t, r, n);
  }
  function su() {
    return (mt & 6) === 0 ? (xo(0), !1) : !0;
  }
  function Rd() {
    if (We !== null) {
      if (wt === 0)
        var t = We.return;
      else
        t = We, Wa = ci = null, If(t), Wi = null, to = 0, t = We;
      for (; t !== null; )
        S0(t.alternate, t), t = t.return;
      We = null;
    }
  }
  function sl(t, n) {
    var r = t.timeoutHandle;
    r !== -1 && (t.timeoutHandle = -1, NE(r)), r = t.cancelPendingCommit, r !== null && (t.cancelPendingCommit = null, r()), ur = 0, Rd(), Rt = t, We = r = Qa(t.current, null), tt = n, wt = 0, qn = null, Br = !1, il = bt(t, n), wd = !1, ll = In = _d = bi = Ur = Bt = 0, Dn = yo = null, Sd = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return sr = n, Ms(), r;
  }
  function X0(t, n) {
    Ge = null, T.H = uo, n === Ki || n === Hs ? (n = ug(), wt = 3) : n === Af ? (n = ug(), wt = 4) : wt = n === id ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, qn = n, We === null && (Bt = 1, Ks(
      t,
      Jn(n, t.current)
    ));
  }
  function P0() {
    var t = Vn.current;
    return t === null ? !0 : (tt & 4194048) === tt ? aa === null : (tt & 62914560) === tt || (tt & 536870912) !== 0 ? t === aa : !1;
  }
  function Z0() {
    var t = T.H;
    return T.H = uo, t === null ? uo : t;
  }
  function Q0() {
    var t = T.A;
    return T.A = aE, t;
  }
  function uu() {
    Bt = 4, Br || (tt & 4194048) !== tt && Vn.current !== null || (il = !0), (Ur & 134217727) === 0 && (bi & 134217727) === 0 || Rt === null || qr(
      Rt,
      tt,
      In,
      !1
    );
  }
  function Td(t, n, r) {
    var o = mt;
    mt |= 2;
    var f = Z0(), h = Q0();
    (Rt !== t || tt !== n) && (ou = null, sl(t, n)), n = !1;
    var _ = Bt;
    e: do
      try {
        if (wt !== 0 && We !== null) {
          var M = We, q = qn;
          switch (wt) {
            case 8:
              Rd(), _ = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Vn.current === null && (n = !0);
              var ie = wt;
              if (wt = 0, qn = null, ul(t, M, q, ie), r && il) {
                _ = 0;
                break e;
              }
              break;
            default:
              ie = wt, wt = 0, qn = null, ul(t, M, q, ie);
          }
        }
        lE(), _ = Bt;
        break;
      } catch (ue) {
        X0(t, ue);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Wa = ci = null, mt = o, T.H = f, T.A = h, We === null && (Rt = null, tt = 0, Ms()), _;
  }
  function lE() {
    for (; We !== null; ) K0(We);
  }
  function oE(t, n) {
    var r = mt;
    mt |= 2;
    var o = Z0(), f = Q0();
    Rt !== t || tt !== n ? (ou = null, lu = Ke() + 500, sl(t, n)) : il = bt(
      t,
      n
    );
    e: do
      try {
        if (wt !== 0 && We !== null) {
          n = We;
          var h = qn;
          t: switch (wt) {
            case 1:
              wt = 0, qn = null, ul(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (og(h)) {
                wt = 0, qn = null, W0(n);
                break;
              }
              n = function() {
                wt !== 2 && wt !== 9 || Rt !== t || (wt = 7), ka(t);
              }, h.then(n, n);
              break e;
            case 3:
              wt = 7;
              break e;
            case 4:
              wt = 5;
              break e;
            case 7:
              og(h) ? (wt = 0, qn = null, W0(n)) : (wt = 0, qn = null, ul(t, n, h, 7));
              break;
            case 5:
              var _ = null;
              switch (We.tag) {
                case 26:
                  _ = We.memoizedState;
                case 5:
                case 27:
                  var M = We;
                  if (_ ? Hv(_) : M.stateNode.complete) {
                    wt = 0, qn = null;
                    var q = M.sibling;
                    if (q !== null) We = q;
                    else {
                      var ie = M.return;
                      ie !== null ? (We = ie, cu(ie)) : We = null;
                    }
                    break t;
                  }
              }
              wt = 0, qn = null, ul(t, n, h, 5);
              break;
            case 6:
              wt = 0, qn = null, ul(t, n, h, 6);
              break;
            case 8:
              Rd(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        sE();
        break;
      } catch (ue) {
        X0(t, ue);
      }
    while (!0);
    return Wa = ci = null, T.H = o, T.A = f, mt = r, We !== null ? 0 : (Rt = null, tt = 0, Ms(), Bt);
  }
  function sE() {
    for (; We !== null && !Ze(); )
      K0(We);
  }
  function K0(t) {
    var n = w0(t.alternate, t, sr);
    t.memoizedProps = t.pendingProps, n === null ? cu(t) : We = n;
  }
  function W0(t) {
    var n = t, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = p0(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          tt
        );
        break;
      case 11:
        n = p0(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          tt
        );
        break;
      case 5:
        If(n);
      default:
        S0(r, n), n = We = Qp(n, sr), n = w0(r, n, sr);
    }
    t.memoizedProps = t.pendingProps, n === null ? cu(t) : We = n;
  }
  function ul(t, n, r, o) {
    Wa = ci = null, If(n), Wi = null, to = 0;
    var f = n.return;
    try {
      if (QS(
        t,
        f,
        n,
        r,
        tt
      )) {
        Bt = 1, Ks(
          t,
          Jn(r, t.current)
        ), We = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw We = f, h;
      Bt = 1, Ks(
        t,
        Jn(r, t.current)
      ), We = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : il || (tt & 536870912) !== 0 ? t = !1 : (Br = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Vn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), J0(n, t)) : cu(n);
  }
  function cu(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        J0(
          n,
          Br
        );
        return;
      }
      t = n.return;
      var r = JS(
        n.alternate,
        n,
        sr
      );
      if (r !== null) {
        We = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        We = n;
        return;
      }
      We = n = t;
    } while (n !== null);
    Bt === 0 && (Bt = 5);
  }
  function J0(t, n) {
    do {
      var r = eE(t.alternate, t);
      if (r !== null) {
        r.flags &= 32767, We = r;
        return;
      }
      if (r = t.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (t = t.sibling, t !== null)) {
        We = t;
        return;
      }
      We = t = r;
    } while (t !== null);
    Bt = 6, We = null;
  }
  function ev(t, n, r, o, f, h, _, M, q) {
    t.cancelPendingCommit = null;
    do
      fu();
    while (Jt !== 0);
    if ((mt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= gf, Wt(
        t,
        r,
        h,
        _,
        M,
        q
      ), t === Rt && (We = Rt = null, tt = 0), ol = n, $r = t, ur = r, Ed = h, Nd = f, I0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, dE(Lt, function() {
        return iv(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = T.T, T.T = null, f = z.p, z.p = 2, _ = mt, mt |= 4;
        try {
          tE(t, n, r);
        } finally {
          mt = _, z.p = f, T.T = o;
        }
      }
      Jt = 1, tv(), nv(), av();
    }
  }
  function tv() {
    if (Jt === 1) {
      Jt = 0;
      var t = $r, n = ol, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = T.T, T.T = null;
        var o = z.p;
        z.p = 2;
        var f = mt;
        mt |= 4;
        try {
          L0(n, t);
          var h = Vd, _ = $p(t.containerInfo), M = h.focusedElem, q = h.selectionRange;
          if (_ !== M && M && M.ownerDocument && Vp(
            M.ownerDocument.documentElement,
            M
          )) {
            if (q !== null && ff(M)) {
              var ie = q.start, ue = q.end;
              if (ue === void 0 && (ue = ie), "selectionStart" in M)
                M.selectionStart = ie, M.selectionEnd = Math.min(
                  ue,
                  M.value.length
                );
              else {
                var fe = M.ownerDocument || document, le = fe && fe.defaultView || window;
                if (le.getSelection) {
                  var oe = le.getSelection(), Te = M.textContent.length, Ue = Math.min(q.start, Te), Nt = q.end === void 0 ? Ue : Math.min(q.end, Te);
                  !oe.extend && Ue > Nt && (_ = Nt, Nt = Ue, Ue = _);
                  var W = Up(
                    M,
                    Ue
                  ), P = Up(
                    M,
                    Nt
                  );
                  if (W && P && (oe.rangeCount !== 1 || oe.anchorNode !== W.node || oe.anchorOffset !== W.offset || oe.focusNode !== P.node || oe.focusOffset !== P.offset)) {
                    var re = fe.createRange();
                    re.setStart(W.node, W.offset), oe.removeAllRanges(), Ue > Nt ? (oe.addRange(re), oe.extend(P.node, P.offset)) : (re.setEnd(P.node, P.offset), oe.addRange(re));
                  }
                }
              }
            }
            for (fe = [], oe = M; oe = oe.parentNode; )
              oe.nodeType === 1 && fe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof M.focus == "function" && M.focus(), M = 0; M < fe.length; M++) {
              var ce = fe[M];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          Su = !!Ud, Vd = Ud = null;
        } finally {
          mt = f, z.p = o, T.T = r;
        }
      }
      t.current = n, Jt = 2;
    }
  }
  function nv() {
    if (Jt === 2) {
      Jt = 0;
      var t = $r, n = ol, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = T.T, T.T = null;
        var o = z.p;
        z.p = 2;
        var f = mt;
        mt |= 4;
        try {
          D0(t, n.alternate, n);
        } finally {
          mt = f, z.p = o, T.T = r;
        }
      }
      Jt = 3;
    }
  }
  function av() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Fe();
      var t = $r, n = ol, r = ur, o = I0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, ol = $r = null, rv(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (Vr = null), te(r), n = n.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
        try {
          Kt.onCommitFiberRoot(
            nn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = T.T, f = z.p, z.p = 2, T.T = null;
        try {
          for (var h = t.onRecoverableError, _ = 0; _ < o.length; _++) {
            var M = o[_];
            h(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          T.T = n, z.p = f;
        }
      }
      (ur & 3) !== 0 && fu(), ka(t), f = t.pendingLanes, (r & 261930) !== 0 && (f & 42) !== 0 ? t === Cd ? bo++ : (bo = 0, Cd = t) : bo = 0, xo(0);
    }
  }
  function rv(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Jl(n)));
  }
  function fu() {
    return tv(), nv(), av(), iv();
  }
  function iv() {
    if (Jt !== 5) return !1;
    var t = $r, n = Ed;
    Ed = 0;
    var r = te(ur), o = T.T, f = z.p;
    try {
      z.p = 32 > r ? 32 : r, T.T = null, r = Nd, Nd = null;
      var h = $r, _ = ur;
      if (Jt = 0, ol = $r = null, ur = 0, (mt & 6) !== 0) throw Error(l(331));
      var M = mt;
      if (mt |= 4, V0(h.current), H0(
        h,
        h.current,
        _,
        r
      ), mt = M, xo(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(nn, h);
        } catch {
        }
      return !0;
    } finally {
      z.p = f, T.T = o, rv(t, n);
    }
  }
  function lv(t, n, r) {
    n = Jn(r, n), n = rd(t.stateNode, n, 2), t = zr(t, n, 2), t !== null && (gt(t, 2), ka(t));
  }
  function _t(t, n, r) {
    if (t.tag === 3)
      lv(t, t, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          lv(
            n,
            t,
            r
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Vr === null || !Vr.has(o))) {
            t = Jn(r, t), r = o0(2), o = zr(n, r, 2), o !== null && (s0(
              r,
              o,
              n,
              t
            ), gt(o, 2), ka(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Md(t, n, r) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new rE();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(r) || (wd = !0, f.add(r), t = uE.bind(null, t, n, r), n.then(t, t));
  }
  function uE(t, n, r) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & r, t.warmLanes &= ~r, Rt === t && (tt & r) === r && (Bt === 4 || Bt === 3 && (tt & 62914560) === tt && 300 > Ke() - iu ? (mt & 2) === 0 && sl(t, 0) : _d |= r, ll === tt && (ll = 0)), ka(t);
  }
  function ov(t, n) {
    n === 0 && (n = Vt()), t = oi(t, n), t !== null && (gt(t, n), ka(t));
  }
  function cE(t) {
    var n = t.memoizedState, r = 0;
    n !== null && (r = n.retryLane), ov(t, r);
  }
  function fE(t, n) {
    var r = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode, f = t.memoizedState;
        f !== null && (r = f.retryLane);
        break;
      case 19:
        o = t.stateNode;
        break;
      case 22:
        o = t.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    o !== null && o.delete(n), ov(t, r);
  }
  function dE(t, n) {
    return Ae(t, n);
  }
  var du = null, cl = null, Dd = !1, hu = !1, Ad = !1, Ir = 0;
  function ka(t) {
    t !== cl && t.next === null && (cl === null ? du = cl = t : cl = cl.next = t), hu = !0, Dd || (Dd = !0, mE());
  }
  function xo(t, n) {
    if (!Ad && hu) {
      Ad = !0;
      do
        for (var r = !1, o = du; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var _ = o.suspendedLanes, M = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(_ & ~M), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, fv(o, h));
          } else
            h = tt, h = Ve(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || bt(o, h) || (r = !0, fv(o, h));
          o = o.next;
        }
      while (r);
      Ad = !1;
    }
  }
  function hE() {
    sv();
  }
  function sv() {
    hu = Dd = !1;
    var t = 0;
    Ir !== 0 && EE() && (t = Ir);
    for (var n = Ke(), r = null, o = du; o !== null; ) {
      var f = o.next, h = uv(o, n);
      h === 0 ? (o.next = null, r === null ? du = f : r.next = f, f === null && (cl = r)) : (r = o, (t !== 0 || (h & 3) !== 0) && (hu = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || xo(t), Ir !== 0 && (Ir = 0);
  }
  function uv(t, n) {
    for (var r = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var _ = 31 - Ut(h), M = 1 << _, q = f[_];
      q === -1 ? ((M & r) === 0 || (M & o) !== 0) && (f[_] = kt(M, n)) : q <= n && (t.expiredLanes |= M), h &= ~M;
    }
    if (n = Rt, r = tt, r = Ve(
      t,
      t === n ? r : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, r === 0 || t === n && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && lt(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((r & 3) === 0 || bt(t, r)) {
      if (n = r & -r, n === t.callbackPriority) return n;
      switch (o !== null && lt(o), te(r)) {
        case 2:
        case 8:
          r = Yt;
          break;
        case 32:
          r = Lt;
          break;
        case 268435456:
          r = ut;
          break;
        default:
          r = Lt;
      }
      return o = cv.bind(null, t), r = Ae(r, o), t.callbackPriority = n, t.callbackNode = r, n;
    }
    return o !== null && o !== null && lt(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function cv(t, n) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var r = t.callbackNode;
    if (fu() && t.callbackNode !== r)
      return null;
    var o = tt;
    return o = Ve(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (G0(t, o, n), uv(t, Ke()), t.callbackNode != null && t.callbackNode === r ? cv.bind(null, t) : null);
  }
  function fv(t, n) {
    if (fu()) return null;
    G0(t, n, !0);
  }
  function mE() {
    CE(function() {
      (mt & 6) !== 0 ? Ae(
        yt,
        hE
      ) : sv();
    });
  }
  function jd() {
    if (Ir === 0) {
      var t = Zi;
      t === 0 && (t = ma, ma <<= 1, (ma & 261888) === 0 && (ma = 256)), Ir = t;
    }
    return Ir;
  }
  function dv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ws("" + t);
  }
  function hv(t, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, t.id && r.setAttribute("form", t.id), n.parentNode.insertBefore(r, n), t = new FormData(t), r.parentNode.removeChild(r), t;
  }
  function pE(t, n, r, o, f) {
    if (n === "submit" && r && r.stateNode === f) {
      var h = dv(
        (f[Ne] || null).action
      ), _ = o.submitter;
      _ && (n = (n = _[Ne] || null) ? dv(n.formAction) : _.getAttribute("formAction"), n !== null && (h = n, _ = null));
      var M = new Ns(
        "action",
        "action",
        null,
        o,
        f
      );
      t.push({
        event: M,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (Ir !== 0) {
                  var q = _ ? hv(f, _) : new FormData(f);
                  Wf(
                    r,
                    {
                      pending: !0,
                      data: q,
                      method: f.method,
                      action: h
                    },
                    null,
                    q
                  );
                }
              } else
                typeof h == "function" && (M.preventDefault(), q = _ ? hv(f, _) : new FormData(f), Wf(
                  r,
                  {
                    pending: !0,
                    data: q,
                    method: f.method,
                    action: h
                  },
                  h,
                  q
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var Od = 0; Od < pf.length; Od++) {
    var zd = pf[Od], gE = zd.toLowerCase(), vE = zd[0].toUpperCase() + zd.slice(1);
    ya(
      gE,
      "on" + vE
    );
  }
  ya(Yp, "onAnimationEnd"), ya(Gp, "onAnimationIteration"), ya(Fp, "onAnimationStart"), ya("dblclick", "onDoubleClick"), ya("focusin", "onFocus"), ya("focusout", "onBlur"), ya(OS, "onTransitionRun"), ya(zS, "onTransitionStart"), ya(LS, "onTransitionCancel"), ya(Xp, "onTransitionEnd"), an("onMouseEnter", ["mouseout", "mouseover"]), an("onMouseLeave", ["mouseout", "mouseover"]), an("onPointerEnter", ["pointerout", "pointerover"]), an("onPointerLeave", ["pointerout", "pointerover"]), dn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), dn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), dn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), dn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), dn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), dn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var wo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), yE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wo)
  );
  function mv(t, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < t.length; r++) {
      var o = t[r], f = o.event;
      o = o.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var _ = o.length - 1; 0 <= _; _--) {
            var M = o[_], q = M.instance, ie = M.currentTarget;
            if (M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              Ts(ue);
            }
            f.currentTarget = null, h = q;
          }
        else
          for (_ = 0; _ < o.length; _++) {
            if (M = o[_], q = M.instance, ie = M.currentTarget, M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              Ts(ue);
            }
            f.currentTarget = null, h = q;
          }
      }
    }
  }
  function Je(t, n) {
    var r = n[ze];
    r === void 0 && (r = n[ze] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    r.has(o) || (pv(n, t, 2, !1), r.add(o));
  }
  function Ld(t, n, r) {
    var o = 0;
    n && (o |= 4), pv(
      r,
      t,
      o,
      n
    );
  }
  var mu = "_reactListening" + Math.random().toString(36).slice(2);
  function kd(t) {
    if (!t[mu]) {
      t[mu] = !0, ja.forEach(function(r) {
        r !== "selectionchange" && (yE.has(r) || Ld(r, !1, t), Ld(r, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[mu] || (n[mu] = !0, Ld("selectionchange", !1, n));
    }
  }
  function pv(t, n, r, o) {
    switch (Yv(n)) {
      case 2:
        var f = FE;
        break;
      case 8:
        f = XE;
        break;
      default:
        f = Kd;
    }
    r = f.bind(
      null,
      n,
      r,
      t
    ), f = void 0, !tf || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, r, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, r, !0) : f !== void 0 ? t.addEventListener(n, r, {
      passive: f
    }) : t.addEventListener(n, r, !1);
  }
  function Hd(t, n, r, o, f) {
    var h = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var _ = o.tag;
        if (_ === 3 || _ === 4) {
          var M = o.stateNode.containerInfo;
          if (M === f) break;
          if (_ === 4)
            for (_ = o.return; _ !== null; ) {
              var q = _.tag;
              if ((q === 3 || q === 4) && _.stateNode.containerInfo === f)
                return;
              _ = _.return;
            }
          for (; M !== null; ) {
            if (_ = Ct(M), _ === null) return;
            if (q = _.tag, q === 5 || q === 6 || q === 26 || q === 27) {
              o = h = _;
              continue e;
            }
            M = M.parentNode;
          }
        }
        o = o.return;
      }
    xp(function() {
      var ie = h, ue = Jc(r), fe = [];
      e: {
        var le = Pp.get(t);
        if (le !== void 0) {
          var oe = Ns, Te = t;
          switch (t) {
            case "keypress":
              if (Ss(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = fS;
              break;
            case "focusin":
              Te = "focus", oe = lf;
              break;
            case "focusout":
              Te = "blur", oe = lf;
              break;
            case "beforeblur":
            case "afterblur":
              oe = lf;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              oe = Sp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = J_;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = mS;
              break;
            case Yp:
            case Gp:
            case Fp:
              oe = nS;
              break;
            case Xp:
              oe = gS;
              break;
            case "scroll":
            case "scrollend":
              oe = K_;
              break;
            case "wheel":
              oe = yS;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = rS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Np;
              break;
            case "toggle":
            case "beforetoggle":
              oe = xS;
          }
          var Ue = (n & 4) !== 0, Nt = !Ue && (t === "scroll" || t === "scrollend"), W = Ue ? le !== null ? le + "Capture" : null : le;
          Ue = [];
          for (var P = ie, re; P !== null; ) {
            var ce = P;
            if (re = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || re === null || W === null || (ce = ql(P, W), ce != null && Ue.push(
              _o(P, ce, re)
            )), Nt) break;
            P = P.return;
          }
          0 < Ue.length && (le = new oe(
            le,
            Te,
            null,
            r,
            ue
          ), fe.push({ event: le, listeners: Ue }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = t === "mouseover" || t === "pointerover", oe = t === "mouseout" || t === "pointerout", le && r !== Wc && (Te = r.relatedTarget || r.fromElement) && (Ct(Te) || Te[Se]))
            break e;
          if ((oe || le) && (le = ue.window === ue ? ue : (le = ue.ownerDocument) ? le.defaultView || le.parentWindow : window, oe ? (Te = r.relatedTarget || r.toElement, oe = ie, Te = Te ? Ct(Te) : null, Te !== null && (Nt = u(Te), Ue = Te.tag, Te !== Nt || Ue !== 5 && Ue !== 27 && Ue !== 6) && (Te = null)) : (oe = null, Te = ie), oe !== Te)) {
            if (Ue = Sp, ce = "onMouseLeave", W = "onMouseEnter", P = "mouse", (t === "pointerout" || t === "pointerover") && (Ue = Np, ce = "onPointerLeave", W = "onPointerEnter", P = "pointer"), Nt = oe == null ? le : et(oe), re = Te == null ? le : et(Te), le = new Ue(
              ce,
              P + "leave",
              oe,
              r,
              ue
            ), le.target = Nt, le.relatedTarget = re, ce = null, Ct(ue) === ie && (Ue = new Ue(
              W,
              P + "enter",
              Te,
              r,
              ue
            ), Ue.target = re, Ue.relatedTarget = Nt, ce = Ue), Nt = ce, oe && Te)
              t: {
                for (Ue = bE, W = oe, P = Te, re = 0, ce = W; ce; ce = Ue(ce))
                  re++;
                ce = 0;
                for (var He = P; He; He = Ue(He))
                  ce++;
                for (; 0 < re - ce; )
                  W = Ue(W), re--;
                for (; 0 < ce - re; )
                  P = Ue(P), ce--;
                for (; re--; ) {
                  if (W === P || P !== null && W === P.alternate) {
                    Ue = W;
                    break t;
                  }
                  W = Ue(W), P = Ue(P);
                }
                Ue = null;
              }
            else Ue = null;
            oe !== null && gv(
              fe,
              le,
              oe,
              Ue,
              !1
            ), Te !== null && Nt !== null && gv(
              fe,
              Nt,
              Te,
              Ue,
              !0
            );
          }
        }
        e: {
          if (le = ie ? et(ie) : window, oe = le.nodeName && le.nodeName.toLowerCase(), oe === "select" || oe === "input" && le.type === "file")
            var ft = Op;
          else if (Ap(le))
            if (zp)
              ft = DS;
            else {
              ft = TS;
              var je = RS;
            }
          else
            oe = le.nodeName, !oe || oe.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? ie && Kc(ie.elementType) && (ft = Op) : ft = MS;
          if (ft && (ft = ft(t, ie))) {
            jp(
              fe,
              ft,
              r,
              ue
            );
            break e;
          }
          je && je(t, le, ie), t === "focusout" && ie && le.type === "number" && ie.memoizedProps.value != null && Vl(le, "number", le.value);
        }
        switch (je = ie ? et(ie) : window, t) {
          case "focusin":
            (Ap(je) || je.contentEditable === "true") && ($i = je, df = ie, Ql = null);
            break;
          case "focusout":
            Ql = df = $i = null;
            break;
          case "mousedown":
            hf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hf = !1, qp(fe, r, ue);
            break;
          case "selectionchange":
            if (jS) break;
          case "keydown":
          case "keyup":
            qp(fe, r, ue);
        }
        var Xe;
        if (sf)
          e: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break e;
              case "compositionend":
                nt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break e;
            }
            nt = void 0;
          }
        else
          Vi ? Mp(t, r) && (nt = "onCompositionEnd") : t === "keydown" && r.keyCode === 229 && (nt = "onCompositionStart");
        nt && (Cp && r.locale !== "ko" && (Vi || nt !== "onCompositionStart" ? nt === "onCompositionEnd" && Vi && (Xe = wp()) : (Rr = ue, nf = "value" in Rr ? Rr.value : Rr.textContent, Vi = !0)), je = pu(ie, nt), 0 < je.length && (nt = new Ep(
          nt,
          t,
          null,
          r,
          ue
        ), fe.push({ event: nt, listeners: je }), Xe ? nt.data = Xe : (Xe = Dp(r), Xe !== null && (nt.data = Xe)))), (Xe = _S ? SS(t, r) : ES(t, r)) && (nt = pu(ie, "onBeforeInput"), 0 < nt.length && (je = new Ep(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ue
        ), fe.push({
          event: je,
          listeners: nt
        }), je.data = Xe)), pE(
          fe,
          t,
          ie,
          r,
          ue
        );
      }
      mv(fe, n);
    });
  }
  function _o(t, n, r) {
    return {
      instance: t,
      listener: n,
      currentTarget: r
    };
  }
  function pu(t, n) {
    for (var r = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = ql(t, r), f != null && o.unshift(
        _o(t, f, h)
      ), f = ql(t, n), f != null && o.push(
        _o(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function bE(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function gv(t, n, r, o, f) {
    for (var h = n._reactName, _ = []; r !== null && r !== o; ) {
      var M = r, q = M.alternate, ie = M.stateNode;
      if (M = M.tag, q !== null && q === o) break;
      M !== 5 && M !== 26 && M !== 27 || ie === null || (q = ie, f ? (ie = ql(r, h), ie != null && _.unshift(
        _o(r, ie, q)
      )) : f || (ie = ql(r, h), ie != null && _.push(
        _o(r, ie, q)
      ))), r = r.return;
    }
    _.length !== 0 && t.push({ event: n, listeners: _ });
  }
  var xE = /\r\n?/g, wE = /\u0000|\uFFFD/g;
  function vv(t) {
    return (typeof t == "string" ? t : "" + t).replace(xE, `
`).replace(wE, "");
  }
  function yv(t, n) {
    return n = vv(n), vv(t) === n;
  }
  function Et(t, n, r, o, f, h) {
    switch (r) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Hi(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Hi(t, "" + o);
        break;
      case "className":
        va(t, "class", o);
        break;
      case "tabIndex":
        va(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        va(t, r, o);
        break;
      case "style":
        yp(t, o, h);
        break;
      case "data":
        if (n !== "object") {
          va(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || r !== "href")) {
          t.removeAttribute(r);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(r);
          break;
        }
        o = ws("" + o), t.setAttribute(r, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (r === "formAction" ? (n !== "input" && Et(t, n, "name", f.name, f, null), Et(
            t,
            n,
            "formEncType",
            f.formEncType,
            f,
            null
          ), Et(
            t,
            n,
            "formMethod",
            f.formMethod,
            f,
            null
          ), Et(
            t,
            n,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (Et(t, n, "encType", f.encType, f, null), Et(t, n, "method", f.method, f, null), Et(t, n, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(r);
          break;
        }
        o = ws("" + o), t.setAttribute(r, o);
        break;
      case "onClick":
        o != null && (t.onclick = Pa);
        break;
      case "onScroll":
        o != null && Je("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Je("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (r = o.__html, r != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = r;
          }
        }
        break;
      case "multiple":
        t.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        t.muted = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        r = ws("" + o), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          r
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(r, "" + o) : t.removeAttribute(r);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(r, "") : t.removeAttribute(r);
        break;
      case "capture":
      case "download":
        o === !0 ? t.setAttribute(r, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(r, o) : t.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? t.setAttribute(r, o) : t.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? t.removeAttribute(r) : t.setAttribute(r, o);
        break;
      case "popover":
        Je("beforetoggle", t), Je("toggle", t), ga(t, "popover", o);
        break;
      case "xlinkActuate":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        ga(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = Z_.get(r) || r, ga(t, r, o));
    }
  }
  function Bd(t, n, r, o, f, h) {
    switch (r) {
      case "style":
        yp(t, o, h);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (r = o.__html, r != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Hi(t, o) : (typeof o == "number" || typeof o == "bigint") && Hi(t, "" + o);
        break;
      case "onScroll":
        o != null && Je("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Je("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Pa);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!kn.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (f = r.endsWith("Capture"), n = r.slice(2, f ? r.length - 7 : void 0), h = t[Ne] || null, h = h != null ? h[r] : null, typeof h == "function" && t.removeEventListener(n, h, f), typeof o == "function")) {
              typeof h != "function" && h !== null && (r in t ? t[r] = null : t.hasAttribute(r) && t.removeAttribute(r)), t.addEventListener(n, o, f);
              break e;
            }
            r in t ? t[r] = o : o === !0 ? t.setAttribute(r, "") : ga(t, r, o);
          }
    }
  }
  function un(t, n, r) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Je("error", t), Je("load", t);
        var o = !1, f = !1, h;
        for (h in r)
          if (r.hasOwnProperty(h)) {
            var _ = r[h];
            if (_ != null)
              switch (h) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, n));
                default:
                  Et(t, n, h, _, r, null);
              }
          }
        f && Et(t, n, "srcSet", r.srcSet, r, null), o && Et(t, n, "src", r.src, r, null);
        return;
      case "input":
        Je("invalid", t);
        var M = h = _ = f = null, q = null, ie = null;
        for (o in r)
          if (r.hasOwnProperty(o)) {
            var ue = r[o];
            if (ue != null)
              switch (o) {
                case "name":
                  f = ue;
                  break;
                case "type":
                  _ = ue;
                  break;
                case "checked":
                  q = ue;
                  break;
                case "defaultChecked":
                  ie = ue;
                  break;
                case "value":
                  h = ue;
                  break;
                case "defaultValue":
                  M = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(l(137, n));
                  break;
                default:
                  Et(t, n, o, ue, r, null);
              }
          }
        ki(
          t,
          h,
          M,
          q,
          ie,
          _,
          f,
          !1
        );
        return;
      case "select":
        Je("invalid", t), o = _ = h = null;
        for (f in r)
          if (r.hasOwnProperty(f) && (M = r[f], M != null))
            switch (f) {
              case "value":
                h = M;
                break;
              case "defaultValue":
                _ = M;
                break;
              case "multiple":
                o = M;
              default:
                Et(t, n, f, M, r, null);
            }
        n = h, r = _, t.multiple = !!o, n != null ? Cr(t, !!o, n, !1) : r != null && Cr(t, !!o, r, !0);
        return;
      case "textarea":
        Je("invalid", t), h = f = o = null;
        for (_ in r)
          if (r.hasOwnProperty(_) && (M = r[_], M != null))
            switch (_) {
              case "value":
                o = M;
                break;
              case "defaultValue":
                f = M;
                break;
              case "children":
                h = M;
                break;
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(l(91));
                break;
              default:
                Et(t, n, _, M, r, null);
            }
        gp(t, o, f, h);
        return;
      case "option":
        for (q in r)
          if (r.hasOwnProperty(q) && (o = r[q], o != null))
            switch (q) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Et(t, n, q, o, r, null);
            }
        return;
      case "dialog":
        Je("beforetoggle", t), Je("toggle", t), Je("cancel", t), Je("close", t);
        break;
      case "iframe":
      case "object":
        Je("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < wo.length; o++)
          Je(wo[o], t);
        break;
      case "image":
        Je("error", t), Je("load", t);
        break;
      case "details":
        Je("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Je("error", t), Je("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (ie in r)
          if (r.hasOwnProperty(ie) && (o = r[ie], o != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                Et(t, n, ie, o, r, null);
            }
        return;
      default:
        if (Kc(n)) {
          for (ue in r)
            r.hasOwnProperty(ue) && (o = r[ue], o !== void 0 && Bd(
              t,
              n,
              ue,
              o,
              r,
              void 0
            ));
          return;
        }
    }
    for (M in r)
      r.hasOwnProperty(M) && (o = r[M], o != null && Et(t, n, M, o, r, null));
  }
  function _E(t, n, r, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var f = null, h = null, _ = null, M = null, q = null, ie = null, ue = null;
        for (oe in r) {
          var fe = r[oe];
          if (r.hasOwnProperty(oe) && fe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = fe;
              default:
                o.hasOwnProperty(oe) || Et(t, n, oe, null, o, fe);
            }
        }
        for (var le in o) {
          var oe = o[le];
          if (fe = r[le], o.hasOwnProperty(le) && (oe != null || fe != null))
            switch (le) {
              case "type":
                h = oe;
                break;
              case "name":
                f = oe;
                break;
              case "checked":
                ie = oe;
                break;
              case "defaultChecked":
                ue = oe;
                break;
              case "value":
                _ = oe;
                break;
              case "defaultValue":
                M = oe;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (oe != null)
                  throw Error(l(137, n));
                break;
              default:
                oe !== fe && Et(
                  t,
                  n,
                  le,
                  oe,
                  o,
                  fe
                );
            }
        }
        ai(
          t,
          _,
          M,
          q,
          ie,
          ue,
          h,
          f
        );
        return;
      case "select":
        oe = _ = M = le = null;
        for (h in r)
          if (q = r[h], r.hasOwnProperty(h) && q != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = q;
              default:
                o.hasOwnProperty(h) || Et(
                  t,
                  n,
                  h,
                  null,
                  o,
                  q
                );
            }
        for (f in o)
          if (h = o[f], q = r[f], o.hasOwnProperty(f) && (h != null || q != null))
            switch (f) {
              case "value":
                le = h;
                break;
              case "defaultValue":
                M = h;
                break;
              case "multiple":
                _ = h;
              default:
                h !== q && Et(
                  t,
                  n,
                  f,
                  h,
                  o,
                  q
                );
            }
        n = M, r = _, o = oe, le != null ? Cr(t, !!r, le, !1) : !!o != !!r && (n != null ? Cr(t, !!r, n, !0) : Cr(t, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        oe = le = null;
        for (M in r)
          if (f = r[M], r.hasOwnProperty(M) && f != null && !o.hasOwnProperty(M))
            switch (M) {
              case "value":
                break;
              case "children":
                break;
              default:
                Et(t, n, M, null, o, f);
            }
        for (_ in o)
          if (f = o[_], h = r[_], o.hasOwnProperty(_) && (f != null || h != null))
            switch (_) {
              case "value":
                le = f;
                break;
              case "defaultValue":
                oe = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(l(91));
                break;
              default:
                f !== h && Et(t, n, _, f, o, h);
            }
        $l(t, le, oe);
        return;
      case "option":
        for (var Te in r)
          if (le = r[Te], r.hasOwnProperty(Te) && le != null && !o.hasOwnProperty(Te))
            switch (Te) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  n,
                  Te,
                  null,
                  o,
                  le
                );
            }
        for (q in o)
          if (le = o[q], oe = r[q], o.hasOwnProperty(q) && le !== oe && (le != null || oe != null))
            switch (q) {
              case "selected":
                t.selected = le && typeof le != "function" && typeof le != "symbol";
                break;
              default:
                Et(
                  t,
                  n,
                  q,
                  le,
                  o,
                  oe
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Ue in r)
          le = r[Ue], r.hasOwnProperty(Ue) && le != null && !o.hasOwnProperty(Ue) && Et(t, n, Ue, null, o, le);
        for (ie in o)
          if (le = o[ie], oe = r[ie], o.hasOwnProperty(ie) && le !== oe && (le != null || oe != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(l(137, n));
                break;
              default:
                Et(
                  t,
                  n,
                  ie,
                  le,
                  o,
                  oe
                );
            }
        return;
      default:
        if (Kc(n)) {
          for (var Nt in r)
            le = r[Nt], r.hasOwnProperty(Nt) && le !== void 0 && !o.hasOwnProperty(Nt) && Bd(
              t,
              n,
              Nt,
              void 0,
              o,
              le
            );
          for (ue in o)
            le = o[ue], oe = r[ue], !o.hasOwnProperty(ue) || le === oe || le === void 0 && oe === void 0 || Bd(
              t,
              n,
              ue,
              le,
              o,
              oe
            );
          return;
        }
    }
    for (var W in r)
      le = r[W], r.hasOwnProperty(W) && le != null && !o.hasOwnProperty(W) && Et(t, n, W, null, o, le);
    for (fe in o)
      le = o[fe], oe = r[fe], !o.hasOwnProperty(fe) || le === oe || le == null && oe == null || Et(t, n, fe, le, o, oe);
  }
  function bv(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function SE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, r = performance.getEntriesByType("resource"), o = 0; o < r.length; o++) {
        var f = r[o], h = f.transferSize, _ = f.initiatorType, M = f.duration;
        if (h && M && bv(_)) {
          for (_ = 0, M = f.responseEnd, o += 1; o < r.length; o++) {
            var q = r[o], ie = q.startTime;
            if (ie > M) break;
            var ue = q.transferSize, fe = q.initiatorType;
            ue && bv(fe) && (q = q.responseEnd, _ += ue * (q < M ? 1 : (M - ie) / (q - ie)));
          }
          if (--o, n += 8 * (h + _) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ud = null, Vd = null;
  function gu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function xv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wv(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function $d(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var qd = null;
  function EE() {
    var t = window.event;
    return t && t.type === "popstate" ? t === qd ? !1 : (qd = t, !0) : (qd = null, !1);
  }
  var _v = typeof setTimeout == "function" ? setTimeout : void 0, NE = typeof clearTimeout == "function" ? clearTimeout : void 0, Sv = typeof Promise == "function" ? Promise : void 0, CE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sv < "u" ? function(t) {
    return Sv.resolve(null).then(t).catch(RE);
  } : _v;
  function RE(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Yr(t) {
    return t === "head";
  }
  function Ev(t, n) {
    var r = n, o = 0;
    do {
      var f = r.nextSibling;
      if (t.removeChild(r), f && f.nodeType === 8)
        if (r = f.data, r === "/$" || r === "/&") {
          if (o === 0) {
            t.removeChild(f), ml(n);
            return;
          }
          o--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          o++;
        else if (r === "html")
          So(t.ownerDocument.documentElement);
        else if (r === "head") {
          r = t.ownerDocument.head, So(r);
          for (var h = r.firstChild; h; ) {
            var _ = h.nextSibling, M = h.nodeName;
            h[Pe] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = _;
          }
        } else
          r === "body" && So(t.ownerDocument.body);
      r = f;
    } while (r);
    ml(n);
  }
  function Nv(t, n) {
    var r = t;
    t = 0;
    do {
      var o = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), o && o.nodeType === 8)
        if (r = o.data, r === "/$") {
          if (t === 0) break;
          t--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || t++;
      r = o;
    } while (r);
  }
  function Id(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Id(r), ot(r);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(r);
    }
  }
  function TE(t, n, r, o) {
    for (; t.nodeType === 1; ) {
      var f = r;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[Pe])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (h = t.getAttribute("rel"), h === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (h !== f.rel || t.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || t.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (h = t.getAttribute("src"), (h !== (f.src == null ? null : f.src) || t.getAttribute("type") !== (f.type == null ? null : f.type) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && h && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var h = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && t.getAttribute("name") === h)
          return t;
      } else return t;
      if (t = ra(t.nextSibling), t === null) break;
    }
    return null;
  }
  function ME(t, n, r) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r || (t = ra(t.nextSibling), t === null)) return null;
    return t;
  }
  function Cv(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ra(t.nextSibling), t === null)) return null;
    return t;
  }
  function Yd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Gd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function DE(t, n) {
    var r = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || r.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), r.removeEventListener("DOMContentLoaded", o);
      };
      r.addEventListener("DOMContentLoaded", o), t._reactRetry = o;
    }
  }
  function ra(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = t.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return t;
  }
  var Fd = null;
  function Rv(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return ra(t.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Tv(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0) return t;
          n--;
        } else r !== "/$" && r !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Mv(t, n, r) {
    switch (n = gu(r), t) {
      case "html":
        if (t = n.documentElement, !t) throw Error(l(452));
        return t;
      case "head":
        if (t = n.head, !t) throw Error(l(453));
        return t;
      case "body":
        if (t = n.body, !t) throw Error(l(454));
        return t;
      default:
        throw Error(l(451));
    }
  }
  function So(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    ot(t);
  }
  var ia = /* @__PURE__ */ new Map(), Dv = /* @__PURE__ */ new Set();
  function vu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var cr = z.d;
  z.d = {
    f: AE,
    r: jE,
    D: OE,
    C: zE,
    L: LE,
    m: kE,
    X: BE,
    S: HE,
    M: UE
  };
  function AE() {
    var t = cr.f(), n = su();
    return t || n;
  }
  function jE(t) {
    var n = ct(t);
    n !== null && n.tag === 5 && n.type === "form" ? Xg(n) : cr.r(t);
  }
  var fl = typeof document > "u" ? null : document;
  function Av(t, n, r) {
    var o = fl;
    if (o && typeof n == "string" && n) {
      var f = rn(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof r == "string" && (f += '[crossorigin="' + r + '"]'), Dv.has(f) || (Dv.add(f), t = { rel: t, crossOrigin: r, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), un(n, "link", t), rt(n), o.head.appendChild(n)));
    }
  }
  function OE(t) {
    cr.D(t), Av("dns-prefetch", t, null);
  }
  function zE(t, n) {
    cr.C(t, n), Av("preconnect", t, n);
  }
  function LE(t, n, r) {
    cr.L(t, n, r);
    var o = fl;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + rn(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (f += '[imagesrcset="' + rn(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (f += '[imagesizes="' + rn(
        r.imageSizes
      ) + '"]')) : f += '[href="' + rn(t) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = dl(t);
          break;
        case "script":
          h = hl(t);
      }
      ia.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : t,
          as: n
        },
        r
      ), ia.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(Eo(h)) || n === "script" && o.querySelector(No(h)) || (n = o.createElement("link"), un(n, "link", t), rt(n), o.head.appendChild(n)));
    }
  }
  function kE(t, n) {
    cr.m(t, n);
    var r = fl;
    if (r && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + rn(o) + '"][href="' + rn(t) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = hl(t);
      }
      if (!ia.has(h) && (t = g({ rel: "modulepreload", href: t }, n), ia.set(h, t), r.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(No(h)))
              return;
        }
        o = r.createElement("link"), un(o, "link", t), rt(o), r.head.appendChild(o);
      }
    }
  }
  function HE(t, n, r) {
    cr.S(t, n, r);
    var o = fl;
    if (o && t) {
      var f = zt(o).hoistableStyles, h = dl(t);
      n = n || "default";
      var _ = f.get(h);
      if (!_) {
        var M = { loading: 0, preload: null };
        if (_ = o.querySelector(
          Eo(h)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            r
          ), (r = ia.get(h)) && Xd(t, r);
          var q = _ = o.createElement("link");
          rt(q), un(q, "link", t), q._p = new Promise(function(ie, ue) {
            q.onload = ie, q.onerror = ue;
          }), q.addEventListener("load", function() {
            M.loading |= 1;
          }), q.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, yu(_, n, o);
        }
        _ = {
          type: "stylesheet",
          instance: _,
          count: 1,
          state: M
        }, f.set(h, _);
      }
    }
  }
  function BE(t, n) {
    cr.X(t, n);
    var r = fl;
    if (r && t) {
      var o = zt(r).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = r.querySelector(No(f)), h || (t = g({ src: t, async: !0 }, n), (n = ia.get(f)) && Pd(t, n), h = r.createElement("script"), rt(h), un(h, "link", t), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function UE(t, n) {
    cr.M(t, n);
    var r = fl;
    if (r && t) {
      var o = zt(r).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = r.querySelector(No(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = ia.get(f)) && Pd(t, n), h = r.createElement("script"), rt(h), un(h, "link", t), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function jv(t, n, r, o) {
    var f = (f = de.current) ? vu(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = dl(r.href), r = zt(
          f
        ).hoistableStyles, o = r.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          t = dl(r.href);
          var h = zt(
            f
          ).hoistableStyles, _ = h.get(t);
          if (_ || (f = f.ownerDocument || f, _ = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, _), (h = f.querySelector(
            Eo(t)
          )) && !h._p && (_.instance = h, _.state.loading = 5), ia.has(t) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, ia.set(t, r), h || VE(
            f,
            t,
            r,
            _.state
          ))), n && o === null)
            throw Error(l(528, ""));
          return _;
        }
        if (n && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = hl(r), r = zt(
          f
        ).hoistableScripts, o = r.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, t));
    }
  }
  function dl(t) {
    return 'href="' + rn(t) + '"';
  }
  function Eo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Ov(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function VE(t, n, r, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), un(n, "link", r), rt(n), t.head.appendChild(n));
  }
  function hl(t) {
    return '[src="' + rn(t) + '"]';
  }
  function No(t) {
    return "script[async]" + t;
  }
  function zv(t, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + rn(r.href) + '"]'
          );
          if (o)
            return n.instance = o, rt(o), o;
          var f = g({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), rt(o), un(o, "style", f), yu(o, r.precedence, t), n.instance = o;
        case "stylesheet":
          f = dl(r.href);
          var h = t.querySelector(
            Eo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, rt(h), h;
          o = Ov(r), (f = ia.get(f)) && Xd(o, f), h = (t.ownerDocument || t).createElement("link"), rt(h);
          var _ = h;
          return _._p = new Promise(function(M, q) {
            _.onload = M, _.onerror = q;
          }), un(h, "link", o), n.state.loading |= 4, yu(h, r.precedence, t), n.instance = h;
        case "script":
          return h = hl(r.src), (f = t.querySelector(
            No(h)
          )) ? (n.instance = f, rt(f), f) : (o = r, (f = ia.get(h)) && (o = g({}, r), Pd(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), rt(f), un(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, yu(o, r.precedence, t));
    return n.instance;
  }
  function yu(t, n, r) {
    for (var o = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, _ = 0; _ < o.length; _++) {
      var M = o[_];
      if (M.dataset.precedence === n) h = M;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(t, n.firstChild));
  }
  function Xd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Pd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var bu = null;
  function Lv(t, n, r) {
    if (bu === null) {
      var o = /* @__PURE__ */ new Map(), f = bu = /* @__PURE__ */ new Map();
      f.set(r, o);
    } else
      f = bu, o = f.get(r), o || (o = /* @__PURE__ */ new Map(), f.set(r, o));
    if (o.has(t)) return o;
    for (o.set(t, null), r = r.getElementsByTagName(t), f = 0; f < r.length; f++) {
      var h = r[f];
      if (!(h[Pe] || h[xe] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var _ = h.getAttribute(n) || "";
        _ = t + _;
        var M = o.get(_);
        M ? M.push(h) : o.set(_, [h]);
      }
    }
    return o;
  }
  function kv(t, n, r) {
    t = t.ownerDocument || t, t.head.insertBefore(
      r,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function $E(t, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return t = n.disabled, typeof n.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Hv(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function qE(t, n, r, o) {
    if (r.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var f = dl(o.href), h = n.querySelector(
          Eo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = xu.bind(t), n.then(t, t)), r.state.loading |= 4, r.instance = h, rt(h);
          return;
        }
        h = n.ownerDocument || n, o = Ov(o), (f = ia.get(f)) && Xd(o, f), h = h.createElement("link"), rt(h);
        var _ = h;
        _._p = new Promise(function(M, q) {
          _.onload = M, _.onerror = q;
        }), un(h, "link", o), r.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (t.count++, r = xu.bind(t), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Zd = 0;
  function IE(t, n) {
    return t.stylesheets && t.count === 0 && _u(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(r) {
      var o = setTimeout(function() {
        if (t.stylesheets && _u(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Zd === 0 && (Zd = 62500 * SE());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && _u(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Zd ? 50 : 800) + n
      );
      return t.unsuspend = r, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function xu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) _u(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var wu = null;
  function _u(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, wu = /* @__PURE__ */ new Map(), n.forEach(YE, t), wu = null, xu.call(t));
  }
  function YE(t, n) {
    if (!(n.state.loading & 4)) {
      var r = wu.get(t);
      if (r) var o = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), wu.set(t, r);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var _ = f[h];
          (_.nodeName === "LINK" || _.getAttribute("media") !== "not all") && (r.set(_.dataset.precedence, _), o = _);
        }
        o && r.set(null, o);
      }
      f = n.instance, _ = f.getAttribute("data-precedence"), h = r.get(_) || o, h === o && r.set(null, f), r.set(_, f), this.count++, o = xu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Co = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function GE(t, n, r, o, f, h, _, M, q) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gn(0), this.hiddenUpdates = gn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = _, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Bv(t, n, r, o, f, h, _, M, q, ie, ue, fe) {
    return t = new GE(
      t,
      n,
      r,
      _,
      q,
      ie,
      ue,
      fe,
      M
    ), n = 1, h === !0 && (n |= 24), h = Un(3, null, null, n), t.current = h, h.stateNode = t, n = Tf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: r,
      cache: n
    }, jf(h), t;
  }
  function Uv(t) {
    return t ? (t = Yi, t) : Yi;
  }
  function Vv(t, n, r, o, f, h) {
    f = Uv(f), o.context === null ? o.context = f : o.pendingContext = f, o = Or(n), o.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (o.callback = h), r = zr(t, o, n), r !== null && (An(r, t, n), ao(r, t, n));
  }
  function $v(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var r = t.retryLane;
      t.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Qd(t, n) {
    $v(t, n), (t = t.alternate) && $v(t, n);
  }
  function qv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = oi(t, 67108864);
      n !== null && An(n, t, 67108864), Qd(t, 67108864);
    }
  }
  function Iv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Yn();
      n = Z(n);
      var r = oi(t, n);
      r !== null && An(r, t, n), Qd(t, n);
    }
  }
  var Su = !0;
  function FE(t, n, r, o) {
    var f = T.T;
    T.T = null;
    var h = z.p;
    try {
      z.p = 2, Kd(t, n, r, o);
    } finally {
      z.p = h, T.T = f;
    }
  }
  function XE(t, n, r, o) {
    var f = T.T;
    T.T = null;
    var h = z.p;
    try {
      z.p = 8, Kd(t, n, r, o);
    } finally {
      z.p = h, T.T = f;
    }
  }
  function Kd(t, n, r, o) {
    if (Su) {
      var f = Wd(o);
      if (f === null)
        Hd(
          t,
          n,
          o,
          Eu,
          r
        ), Gv(t, o);
      else if (ZE(
        f,
        t,
        n,
        r,
        o
      ))
        o.stopPropagation();
      else if (Gv(t, o), n & 4 && -1 < PE.indexOf(t)) {
        for (; f !== null; ) {
          var h = ct(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var _ = fn(h.pendingLanes);
                  if (_ !== 0) {
                    var M = h;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; _; ) {
                      var q = 1 << 31 - Ut(_);
                      M.entanglements[1] |= q, _ &= ~q;
                    }
                    ka(h), (mt & 6) === 0 && (lu = Ke() + 500, xo(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = oi(h, 2), M !== null && An(M, h, 2), su(), Qd(h, 2);
            }
          if (h = Wd(o), h === null && Hd(
            t,
            n,
            o,
            Eu,
            r
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        Hd(
          t,
          n,
          o,
          null,
          r
        );
    }
  }
  function Wd(t) {
    return t = Jc(t), Jd(t);
  }
  var Eu = null;
  function Jd(t) {
    if (Eu = null, t = Ct(t), t !== null) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (t = c(n), t !== null) return t;
          t = null;
        } else if (r === 31) {
          if (t = d(n), t !== null) return t;
          t = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return Eu = t, null;
  }
  function Yv(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (vt()) {
          case yt:
            return 2;
          case Yt:
            return 8;
          case Lt:
          case pt:
            return 32;
          case ut:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var eh = !1, Gr = null, Fr = null, Xr = null, Ro = /* @__PURE__ */ new Map(), To = /* @__PURE__ */ new Map(), Pr = [], PE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Gv(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Gr = null;
        break;
      case "dragenter":
      case "dragleave":
        Fr = null;
        break;
      case "mouseover":
      case "mouseout":
        Xr = null;
        break;
      case "pointerover":
      case "pointerout":
        Ro.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        To.delete(n.pointerId);
    }
  }
  function Mo(t, n, r, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = ct(n), n !== null && qv(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function ZE(t, n, r, o, f) {
    switch (n) {
      case "focusin":
        return Gr = Mo(
          Gr,
          t,
          n,
          r,
          o,
          f
        ), !0;
      case "dragenter":
        return Fr = Mo(
          Fr,
          t,
          n,
          r,
          o,
          f
        ), !0;
      case "mouseover":
        return Xr = Mo(
          Xr,
          t,
          n,
          r,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return Ro.set(
          h,
          Mo(
            Ro.get(h) || null,
            t,
            n,
            r,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, To.set(
          h,
          Mo(
            To.get(h) || null,
            t,
            n,
            r,
            o,
            f
          )
        ), !0;
    }
    return !1;
  }
  function Fv(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = c(r), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Iv(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(r), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Iv(r);
            });
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Nu(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var r = Wd(t.nativeEvent);
      if (r === null) {
        r = t.nativeEvent;
        var o = new r.constructor(
          r.type,
          r
        );
        Wc = o, r.target.dispatchEvent(o), Wc = null;
      } else
        return n = ct(r), n !== null && qv(n), t.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Xv(t, n, r) {
    Nu(t) && r.delete(n);
  }
  function QE() {
    eh = !1, Gr !== null && Nu(Gr) && (Gr = null), Fr !== null && Nu(Fr) && (Fr = null), Xr !== null && Nu(Xr) && (Xr = null), Ro.forEach(Xv), To.forEach(Xv);
  }
  function Cu(t, n) {
    t.blockedOn === n && (t.blockedOn = null, eh || (eh = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      QE
    )));
  }
  var Ru = null;
  function Pv(t) {
    Ru !== t && (Ru = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        Ru === t && (Ru = null);
        for (var n = 0; n < t.length; n += 3) {
          var r = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Jd(o || r) === null)
              continue;
            break;
          }
          var h = ct(r);
          h !== null && (t.splice(n, 3), n -= 3, Wf(
            h,
            {
              pending: !0,
              data: f,
              method: r.method,
              action: o
            },
            o,
            f
          ));
        }
      }
    ));
  }
  function ml(t) {
    function n(q) {
      return Cu(q, t);
    }
    Gr !== null && Cu(Gr, t), Fr !== null && Cu(Fr, t), Xr !== null && Cu(Xr, t), Ro.forEach(n), To.forEach(n);
    for (var r = 0; r < Pr.length; r++) {
      var o = Pr[r];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Pr.length && (r = Pr[0], r.blockedOn === null); )
      Fv(r), r.blockedOn === null && Pr.shift();
    if (r = (t.ownerDocument || t).$$reactFormReplay, r != null)
      for (o = 0; o < r.length; o += 3) {
        var f = r[o], h = r[o + 1], _ = f[Ne] || null;
        if (typeof h == "function")
          _ || Pv(r);
        else if (_) {
          var M = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, _ = h[Ne] || null)
              M = _.formAction;
            else if (Jd(f) !== null) continue;
          } else M = _.action;
          typeof M == "function" ? r[o + 1] = M : (r.splice(o, 3), o -= 3), Pv(r);
        }
      }
  }
  function Zv() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(_) {
            return f = _;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      f !== null && (f(), f = null), o || setTimeout(r, 20);
    }
    function r() {
      if (!o && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, f = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        o = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function th(t) {
    this._internalRoot = t;
  }
  Tu.prototype.render = th.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var r = n.current, o = Yn();
    Vv(r, o, t, n, null, null);
  }, Tu.prototype.unmount = th.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      Vv(t.current, 2, null, t, null, null), su(), n[Se] = null;
    }
  };
  function Tu(t) {
    this._internalRoot = t;
  }
  Tu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = me();
      t = { blockedOn: null, target: t, priority: n };
      for (var r = 0; r < Pr.length && n !== 0 && n < Pr[r].priority; r++) ;
      Pr.splice(r, 0, t), r === 0 && Fv(t);
    }
  };
  var Qv = a.version;
  if (Qv !== "19.2.7")
    throw Error(
      l(
        527,
        Qv,
        "19.2.7"
      )
    );
  z.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var KE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Mu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Mu.isDisabled && Mu.supportsFiber)
      try {
        nn = Mu.inject(
          KE
        ), Kt = Mu;
      } catch {
      }
  }
  return Ao.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var r = !1, o = "", f = a0, h = r0, _ = i0;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (_ = n.onRecoverableError)), n = Bv(
      t,
      1,
      !1,
      null,
      null,
      r,
      o,
      null,
      f,
      h,
      _,
      Zv
    ), t[Se] = n.current, kd(t), new th(n);
  }, Ao.hydrateRoot = function(t, n, r) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = a0, _ = r0, M = i0, q = null;
    return r != null && (r.unstable_strictMode === !0 && (o = !0), r.identifierPrefix !== void 0 && (f = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (_ = r.onCaughtError), r.onRecoverableError !== void 0 && (M = r.onRecoverableError), r.formState !== void 0 && (q = r.formState)), n = Bv(
      t,
      1,
      !0,
      n,
      r ?? null,
      o,
      f,
      q,
      h,
      _,
      M,
      Zv
    ), n.context = Uv(null), r = n.current, o = Yn(), o = Z(o), f = Or(o), f.callback = null, zr(r, f, o), r = o, n.current.lanes = r, gt(n, r), ka(n), t[Se] = n.current, kd(t), new Tu(n);
  }, Ao.version = "19.2.7", Ao;
}
var ly;
function s2() {
  if (ly) return rh.exports;
  ly = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), rh.exports = o2(), rh.exports;
}
var u2 = s2();
/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var Yx = (e) => {
  throw TypeError(e);
}, Gx = (e, a, i) => a.has(e) || Yx("Cannot " + i), oa = (e, a, i) => (Gx(e, a, "read from private field"), i ? i.call(e) : a.get(e)), Vo = (e, a, i) => a.has(e) ? Yx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, i), Ha = (e, a, i, l) => (Gx(e, a, "write to private field"), a.set(e, i), i);
function oy(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function c2(e = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: l = !1 } = e, s;
  s = a.map(
    (x, w) => y(
      x,
      typeof x == "string" ? null : x.state,
      w === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = p(
    i ?? s.length - 1
  ), c = "POP", d = null;
  function p(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function m() {
    return s[u];
  }
  function y(x, w = null, R, C) {
    let N = $h(
      s ? m().pathname : "/",
      x,
      w,
      R,
      C
    );
    return It(
      N.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), N;
  }
  function g(x) {
    return typeof x == "string" ? x : Ga(x);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return c;
    },
    get location() {
      return m();
    },
    createHref: g,
    createURL(x) {
      return new URL(g(x), "http://localhost");
    },
    encodeLocation(x) {
      let w = typeof x == "string" ? Ta(x) : x;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(x, w) {
      c = "PUSH";
      let R = oy(x) ? x : y(x, w);
      u += 1, s.splice(u, s.length, R), l && d && d({ action: c, location: R, delta: 1 });
    },
    replace(x, w) {
      c = "REPLACE";
      let R = oy(x) ? x : y(x, w);
      s[u] = R, l && d && d({ action: c, location: R, delta: 0 });
    },
    go(x) {
      c = "POP";
      let w = p(u + x), R = s[w];
      u = w, d && d({ action: c, location: R, delta: x });
    },
    listen(x) {
      return d = x, () => {
        d = null;
      };
    }
  };
}
function Qe(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function It(e, a) {
  if (!e) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function f2() {
  return Math.random().toString(36).substring(2, 10);
}
function $h(e, a, i = null, l, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Ta(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || f2(),
    mask: s
  };
}
function Ga({
  pathname: e = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (e += i.charAt(0) === "#" ? i : "#" + i), e;
}
function Ta(e) {
  let a = {};
  if (e) {
    let i = e.indexOf("#");
    i >= 0 && (a.hash = e.substring(i), e = e.substring(0, i));
    let l = e.indexOf("?");
    l >= 0 && (a.search = e.substring(l), e = e.substring(0, l)), e && (a.pathname = e);
  }
  return a;
}
function d2(e, a, i = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Qe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ga(a);
  return s = s.replace(/ $/, "%20"), !i && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var $o, sy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (Vo(this, $o, /* @__PURE__ */ new Map()), e)
      for (let [a, i] of e)
        this.set(a, i);
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(e) {
    if (oa(this, $o).has(e))
      return oa(this, $o).get(e);
    if (e.defaultValue !== void 0)
      return e.defaultValue;
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(e, a) {
    oa(this, $o).set(e, a);
  }
};
$o = /* @__PURE__ */ new WeakMap();
var h2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function m2(e) {
  return h2.has(
    e
  );
}
var p2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function g2(e) {
  return p2.has(
    e
  );
}
function v2(e) {
  return e.index === !0;
}
function Po(e, a, i = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...i, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Qe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Qe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), v2(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = uy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = uy(
        m,
        a(m)
      ), u.children && (m.children = Po(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function uy(e, a) {
  return Object.assign(e, {
    ...a,
    ...typeof a.lazy == "object" && a.lazy != null ? {
      lazy: {
        ...e.lazy,
        ...a.lazy
      }
    } : {}
  });
}
function Fx(e, a, i = "/") {
  return _a(e, a, i, !1);
}
function _a(e, a, i, l, s) {
  let u = typeof a == "string" ? Ta(a) : a, c = da(u.pathname || "/", i);
  if (c == null)
    return null;
  let d = s ?? nc(e), p = null, m = D2(c);
  for (let y = 0; p == null && y < d.length; ++y)
    p = T2(
      d[y],
      m,
      l
    );
  return p;
}
function y2(e, a) {
  let { route: i, pathname: l, params: s } = e;
  return {
    id: i.id,
    pathname: l,
    params: s,
    data: a[i.id],
    loaderData: a[i.id],
    handle: i.handle
  };
}
function nc(e) {
  let a = Xx(e);
  return b2(a), a;
}
function Xx(e, a = [], i = [], l = "", s = !1) {
  let u = (c, d, p = s, m) => {
    let y = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: d,
      route: c
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(l) && p)
        return;
      Qe(
        y.relativePath.startsWith(l),
        `Absolute route path "${y.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(l.length);
    }
    let g = fa([l, y.relativePath]), b = i.concat(y);
    c.children && c.children.length > 0 && (Qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Xx(
      c.children,
      a,
      b,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: C2(g, c.index),
      routesMeta: b
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of Px(c.path))
        u(c, d, !0, p);
  }), a;
}
function Px(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [i, ...l] = a, s = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Px(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function b2(e) {
  e.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : R2(
      a.routesMeta.map((l) => l.childrenIndex),
      i.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var x2 = /^:[\w-]+$/, w2 = 3, _2 = 2, S2 = 1, E2 = 10, N2 = -2, cy = (e) => e === "*";
function C2(e, a) {
  let i = e.split("/"), l = i.length;
  return i.some(cy) && (l += N2), a && (l += _2), i.filter((s) => !cy(s)).reduce(
    (s, u) => s + (x2.test(u) ? w2 : u === "" ? S2 : E2),
    l
  );
}
function R2(e, a) {
  return e.length === a.length && e.slice(0, -1).every((l, s) => l === a[s]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - a[a.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function T2(e, a, i = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", g = hc(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), b = p.route;
    if (!g && m && i && !l[l.length - 1].route.index && (g = hc(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !g)
      return null;
    Object.assign(s, g.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: fa([u, g.pathname]),
      pathnameBase: O2(
        fa([u, g.pathnameBase])
      ),
      route: b
    }), g.pathnameBase !== "/" && (u = fa([u, g.pathnameBase]));
  }
  return c;
}
function hc(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [i, l] = M2(
    e.path,
    e.caseSensitive,
    e.end
  ), s = a.match(i);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: l.reduce(
      (m, { paramName: y, isOptional: g }, b) => {
        if (y === "*") {
          let w = d[b] || "";
          c = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const x = d[b];
        return g && !x ? m[y] = void 0 : m[y] = (x || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: e
  };
}
function M2(e, a = !1, i = !0) {
  It(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let l = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, d, p, m, y) => {
      if (l.push({ paramName: d, isOptional: p != null }), p) {
        let g = y.charAt(m + c.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (l.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function D2(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return It(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), e;
  }
}
function da(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, l = e.charAt(i);
  return l && l !== "/" ? null : e.slice(i) || "/";
}
function A2({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : fa([e, a]);
}
var Zx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, wm = (e) => Zx.test(e);
function j2(e, a = "/") {
  let {
    pathname: i,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Ta(e) : e, u;
  return i ? (i = Sm(i), i.startsWith("/") ? u = fy(i.substring(1), "/") : u = fy(i, a)) : u = a, {
    pathname: u,
    search: z2(l),
    hash: L2(s)
  };
}
function fy(e, a) {
  let i = mc(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? i.length > 1 && i.pop() : s !== "." && i.push(s);
  }), i.length > 1 ? i.join("/") : "/";
}
function sh(e, a, i, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Qx(e) {
  return e.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function _m(e) {
  let a = Qx(e);
  return a.map(
    (i, l) => l === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Mc(e, a, i, l = !1) {
  let s;
  typeof e == "string" ? s = Ta(e) : (s = { ...e }, Qe(
    !s.pathname || !s.pathname.includes("?"),
    sh("?", "pathname", "search", s)
  ), Qe(
    !s.pathname || !s.pathname.includes("#"),
    sh("#", "pathname", "hash", s)
  ), Qe(
    !s.search || !s.search.includes("#"),
    sh("#", "search", "hash", s)
  ));
  let u = e === "" || s.pathname === "", c = u ? "/" : s.pathname, d;
  if (c == null)
    d = i;
  else {
    let g = a.length - 1;
    if (!l && c.startsWith("..")) {
      let b = c.split("/");
      for (; b[0] === ".."; )
        b.shift(), g -= 1;
      s.pathname = b.join("/");
    }
    d = g >= 0 ? a[g] : "/";
  }
  let p = j2(s, d), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && i.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var Sm = (e) => e.replace(/\/\/+/g, "/"), fa = (e) => Sm(e.join("/")), mc = (e) => e.replace(/\/+$/, ""), O2 = (e) => mc(e).replace(/^\/*/, "/"), z2 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, L2 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, dy = (e, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let l = new Headers(i.headers);
  return l.set("Location", e), new Response(null, { ...i, headers: l });
}, Dc = class {
  constructor(e, a, i, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function Zo(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function cs(e) {
  let a = e.map((i) => i.route.path).filter(Boolean);
  return fa(a) || "/";
}
var Kx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Wx(e, a) {
  let i = e;
  if (typeof i != "string" || !Zx.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let l = i, s = !1;
  if (Kx)
    try {
      let u = new URL(window.location.href), c = i.startsWith("//") ? new URL(u.protocol + i) : new URL(i), d = da(c.pathname, a);
      c.origin === u.origin && d != null ? i = d + c.search + c.hash : s = !0;
    } catch {
      It(
        !1,
        `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: l,
    isExternal: s,
    to: i
  };
}
var ti = Symbol("Uninstrumented");
function k2(e, a) {
  let i = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  e.forEach(
    (s) => s({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(u) {
        let c = Object.keys(i);
        for (let d of c)
          u[d] && i[d].push(u[d]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let s = wl(i.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = i[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = wl(d, c, () => {
        });
        p && (l.lazy = Object.assign(l.lazy || {}, {
          [u]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && i[s].length > 0) {
      let c = u[ti] ?? u, d = wl(
        i[s],
        c,
        (...p) => hy(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[ti] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[ti] ?? s, c = wl(
      i.middleware,
      u,
      (...d) => hy(d[0])
    );
    return c ? (c[ti] = u, c) : s;
  })), l;
}
function H2(e, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (l) => l({
      instrument(s) {
        let u = Object.keys(s);
        for (let c of u)
          s[c] && i[c].push(s[c]);
      }
    })
  ), i.navigate.length > 0) {
    let l = e.navigate[ti] ?? e.navigate, s = wl(
      i.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? Ga(c) : ".",
          ...my(e, d ?? {})
        };
      }
    );
    s && (s[ti] = l, e.navigate = s);
  }
  if (i.fetch.length > 0) {
    let l = e.fetch[ti] ?? e.fetch, s = wl(i.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...my(e, p ?? {})
      };
    });
    s && (s[ti] = l, e.fetch = s);
  }
  return e;
}
function wl(e, a, i) {
  return e.length === 0 ? null : async (...l) => {
    let s = await Jx(
      e,
      i(...l),
      () => a(...l),
      e.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function Jx(e, a, i, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Jx(e, a, i, l - 1), u = await c, Qe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(d, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    c || await d(), await c;
  } else
    try {
      u = { type: "success", value: await i() };
    } catch (c) {
      u = { type: "error", value: c };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function hy(e) {
  let { request: a, context: i, params: l, pattern: s } = e;
  return {
    request: B2(a),
    params: { ...l },
    pattern: s,
    context: U2(i)
  };
}
function my(e, a) {
  return {
    currentUrl: Ga(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function B2(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function U2(e) {
  if ($2(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var V2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function $2(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === V2;
}
var e1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], q2 = new Set(
  e1
), I2 = [
  "GET",
  ...e1
], Y2 = new Set(I2), t1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), G2 = /* @__PURE__ */ new Set([307, 308]), uh = {
  state: "idle",
  location: void 0,
  matches: void 0,
  historyAction: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, F2 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, jo = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, X2 = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), n1 = "remix-router-transitions", a1 = Symbol("ResetLoaderData"), xi, vl, Wr, yl, P2 = class {
  constructor(e) {
    Vo(this, xi), Vo(this, vl), Vo(this, Wr), Vo(this, yl), Ha(this, xi, e), Ha(this, vl, nc(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return oa(this, xi);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return oa(this, Wr) ?? oa(this, xi);
  }
  /** Pre-computed branches */
  get branches() {
    return oa(this, yl) ?? oa(this, vl);
  }
  get hasHMRRoutes() {
    return oa(this, Wr) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Ha(this, xi, e), Ha(this, vl, nc(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Ha(this, Wr, e), Ha(this, yl, nc(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    oa(this, Wr) && (Ha(this, xi, oa(this, Wr)), Ha(this, vl, oa(this, yl)), Ha(this, Wr, void 0), Ha(this, yl, void 0));
  }
};
xi = /* @__PURE__ */ new WeakMap();
vl = /* @__PURE__ */ new WeakMap();
Wr = /* @__PURE__ */ new WeakMap();
yl = /* @__PURE__ */ new WeakMap();
function Z2(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Qe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || X2, u = s;
  if (e.instrumentations) {
    let V = e.instrumentations;
    u = (Z) => ({
      ...s(Z),
      ...k2(
        V.map((te) => te.route).filter(Boolean),
        Z
      )
    });
  }
  let c = {}, d = new P2(
    Po(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || eN, y = {
    ...e.future
  }, g = null, b = /* @__PURE__ */ new Set(), x = null, w = null, R = null, C = null, N = e.hydrationData != null, D = _a(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), E = !1, O = null, H, B;
  if (D == null && !e.patchRoutesOnNavigation) {
    let V = sa(404, {
      pathname: e.history.location.pathname
    }), { matches: Z, route: te } = Du(d.activeRoutes);
    H = !0, B = !H, D = Z, O = { [te.id]: V };
  } else if (D && !e.hydrationData && gn(
    D,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (D = null), D)
    if (D.some((V) => V.route.lazy))
      H = !1, B = !H;
    else if (!D.some((V) => Em(V.route)))
      H = !0, B = !H;
    else {
      let V = e.hydrationData ? e.hydrationData.loaderData : null, Z = e.hydrationData ? e.hydrationData.errors : null, te = D;
      if (Z) {
        let me = D.findIndex(
          (ge) => Z[ge.route.id] !== void 0
        );
        te = te.slice(0, me + 1);
      }
      B = !1, H = !0, te.forEach((me) => {
        let ge = r1(me.route, V, Z);
        B = B || ge.renderFallback, H = H && !ge.shouldLoad;
      });
    }
  else {
    H = !1, B = !H, D = [];
    let V = gn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    V.active && V.matches && (E = !0, D = V.matches);
  }
  let U, A = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: D,
    initialized: H,
    renderFallback: B,
    navigation: uh,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", Q = null, $ = !1, K, ne = !1, L = /* @__PURE__ */ new Map(), Y = null, T = !1, z = !1, F = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Map(), ae = 0, j = -1, k = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Set(), he = /* @__PURE__ */ new Map(), J, ve = null;
  function De() {
    if (g = e.history.listen(
      ({ action: V, location: Z, delta: te }) => {
        if (J) {
          J(), J = void 0;
          return;
        }
        It(
          he.size === 0 || te != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let me = Qn({
          currentLocation: A.location,
          nextLocation: Z,
          historyAction: V
        });
        if (me && te != null) {
          let ge = new Promise((Ce) => {
            J = Ce;
          });
          e.history.go(te * -1), Ln(me, {
            state: "blocked",
            location: Z,
            proceed() {
              Ln(me, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Z
              }), ge.then(() => e.history.go(te));
            },
            reset() {
              let Ce = new Map(A.blockers);
              Ce.set(me, jo), we({ blockers: Ce });
            }
          }), Q?.resolve(), Q = null;
          return;
        }
        return pe(V, Z);
      }
    ), i) {
      yN(a, L);
      let V = () => bN(a, L);
      a.addEventListener("pagehide", V), Y = () => a.removeEventListener("pagehide", V);
    }
    return A.initialized || pe("POP", A.location, {
      initialHydration: !0
    }), U;
  }
  function Oe() {
    g && g(), Y && Y(), b.clear(), K && K.abort(), A.fetchers.forEach((V, Z) => nn(A.fetchers, Z)), A.blockers.forEach((V, Z) => ma(Z));
  }
  function Ee(V) {
    if (b.add(V), x) {
      let { newErrors: Z } = x;
      x = null, V(A, {
        deletedFetchers: [],
        newErrors: Z,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => b.delete(V);
  }
  function we(V, Z = {}) {
    V.matches && (V.matches = V.matches.map((ge) => {
      let Ce = c[ge.route.id], xe = ge.route;
      return xe.element !== Ce.element || xe.errorElement !== Ce.errorElement || xe.hydrateFallbackElement !== Ce.hydrateFallbackElement ? {
        ...ge,
        route: Ce
      } : ge;
    })), A = {
      ...A,
      ...V
    };
    let te = [], me = [];
    A.fetchers.forEach((ge, Ce) => {
      ge.state === "idle" && (de.has(Ce) ? te.push(Ce) : me.push(Ce));
    }), de.forEach((ge) => {
      !A.fetchers.has(ge) && !X.has(ge) && te.push(ge);
    }), b.size === 0 && (x = { newErrors: V.errors ?? null }), [...b].forEach(
      (ge) => ge(A, {
        deletedFetchers: te,
        newErrors: V.errors ?? null,
        viewTransitionOpts: Z.viewTransitionOpts,
        flushSync: Z.flushSync === !0
      })
    ), te.forEach((ge) => nn(A.fetchers, ge)), me.forEach((ge) => A.fetchers.delete(ge));
  }
  function Me(V, Z, { flushSync: te } = {}) {
    let me = A.actionData != null && A.navigation.formMethod != null && mn(A.navigation.formMethod) && A.navigation.state === "loading" && V.state?._isRedirect !== !0, ge;
    Z.actionData ? Object.keys(Z.actionData).length > 0 ? ge = Z.actionData : ge = null : me ? ge = A.actionData : ge = null;
    let Ce = Z.loaderData ? Ny(
      A.loaderData,
      Z.loaderData,
      Z.matches || [],
      Z.errors
    ) : A.loaderData, xe = A.blockers;
    xe.size > 0 && (xe = new Map(xe), xe.forEach((Le, qe) => xe.set(qe, jo)));
    let Ne = T ? !1 : Vt(V, Z.matches || A.matches), Se = $ === !0 || A.navigation.formMethod != null && mn(A.navigation.formMethod) && V.state?._isRedirect !== !0;
    d.commitHmrRoutes(), T || I === "POP" || (I === "PUSH" ? e.history.push(V, V.state) : I === "REPLACE" && e.history.replace(V, V.state));
    let ze;
    if (I === "POP") {
      let Le = L.get(A.location.pathname);
      Le && Le.has(V.pathname) ? ze = {
        currentLocation: A.location,
        nextLocation: V
      } : L.has(V.pathname) && (ze = {
        currentLocation: V,
        nextLocation: A.location
      });
    } else if (ne) {
      let Le = L.get(A.location.pathname);
      Le ? Le.add(V.pathname) : (Le = /* @__PURE__ */ new Set([V.pathname]), L.set(A.location.pathname, Le)), ze = {
        currentLocation: A.location,
        nextLocation: V
      };
    }
    we(
      {
        ...Z,
        // matches, errors, fetchers go through as-is
        actionData: ge,
        loaderData: Ce,
        historyAction: I,
        location: V,
        initialized: !0,
        renderFallback: !1,
        navigation: uh,
        revalidation: "idle",
        restoreScrollPosition: Ne,
        preventScrollReset: Se,
        blockers: xe
      },
      {
        viewTransitionOpts: ze,
        flushSync: te === !0
      }
    ), I = "POP", $ = !1, ne = !1, T = !1, z = !1, Q?.resolve(), Q = null, ve?.resolve(), ve = null;
  }
  async function Ye(V, Z) {
    if (Q?.resolve(), Q = null, typeof V == "number") {
      Q || (Q = My());
      let ot = Q.promise;
      return e.history.go(V), ot;
    }
    let te = qh(
      A.location,
      A.matches,
      p,
      V,
      Z?.fromRouteId,
      Z?.relative
    ), { path: me, submission: ge, error: Ce } = py(
      !1,
      te,
      Z
    ), xe;
    Z?.mask && (xe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Z.mask == "string" ? Ta(Z.mask) : {
        ...A.location.mask,
        ...Z.mask
      }
    });
    let Ne = A.location, Se = $h(
      Ne,
      me,
      Z && Z.state,
      void 0,
      xe
    );
    Se = {
      ...Se,
      ...e.history.encodeLocation(Se)
    };
    let ze = Z && Z.replace != null ? Z.replace : void 0, Le = "PUSH";
    ze === !0 ? Le = "REPLACE" : ze === !1 || ge != null && mn(ge.formMethod) && ge.formAction === A.location.pathname + A.location.search && (Le = "REPLACE");
    let qe = Z && "preventScrollReset" in Z ? Z.preventScrollReset === !0 : void 0, Be = (Z && Z.flushSync) === !0, Pe = Qn({
      currentLocation: Ne,
      nextLocation: Se,
      historyAction: Le
    });
    if (Pe) {
      Ln(Pe, {
        state: "blocked",
        location: Se,
        proceed() {
          Ln(Pe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Se
          }), Ye(V, Z);
        },
        reset() {
          let ot = new Map(A.blockers);
          ot.set(Pe, jo), we({ blockers: ot });
        }
      });
      return;
    }
    await pe(Le, Se, {
      submission: ge,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ce,
      preventScrollReset: qe,
      replace: Z && Z.replace,
      enableViewTransition: Z && Z.viewTransition,
      flushSync: Be,
      callSiteDefaultShouldRevalidate: Z && Z.defaultShouldRevalidate
    });
  }
  function ye() {
    ve || (ve = My()), Lt(), we({ revalidation: "loading" });
    let V = ve.promise;
    return A.navigation.state === "submitting" ? V : A.navigation.state === "idle" ? (pe(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), V) : (pe(
      I || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ne === !0
      }
    ), V);
  }
  async function pe(V, Z, te) {
    K && K.abort(), K = null, I = V, T = (te && te.startUninterruptedRevalidation) === !0, kt(A.location, A.matches), $ = (te && te.preventScrollReset) === !0, ne = (te && te.enableViewTransition) === !0;
    let me = d.activeRoutes, ge = te?.initialHydration && A.matches && A.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : _a(
      me,
      Z,
      p,
      !1,
      d.branches
    ), Ce = (te && te.flushSync) === !0;
    if (ge && A.initialized && !z && sN(A.location, Z) && !(te && te.submission && mn(te.submission.formMethod))) {
      Me(Z, { matches: ge }, { flushSync: Ce });
      return;
    }
    let xe = gn(ge, me, Z.pathname);
    if (xe.active && xe.matches && (ge = xe.matches), !ge) {
      let { error: ct, notFoundMatches: et, route: zt } = fn(
        Z.pathname
      );
      Me(
        Z,
        {
          matches: et,
          loaderData: {},
          errors: {
            [zt.id]: ct
          }
        },
        { flushSync: Ce }
      );
      return;
    }
    let Ne = te && te.overrideNavigation ? {
      ...te.overrideNavigation,
      matches: ge,
      historyAction: V
    } : void 0;
    K = new AbortController();
    let Se = bl(
      e.history,
      Z,
      K.signal,
      te && te.submission
    ), ze = e.getContext ? await e.getContext() : new sy(), Le;
    if (te && te.pendingError)
      Le = [
        Jr(ge).route.id,
        { type: "error", error: te.pendingError }
      ];
    else if (te && te.submission && mn(te.submission.formMethod)) {
      let ct = await _e(
        Se,
        Z,
        te.submission,
        ge,
        V,
        ze,
        xe.active,
        te && te.initialHydration === !0,
        { replace: te.replace, flushSync: Ce }
      );
      if (ct.shortCircuited)
        return;
      if (ct.pendingActionResult) {
        let [et, zt] = ct.pendingActionResult;
        if (Gn(zt) && Zo(zt.error) && zt.error.status === 404) {
          K = null, Me(Z, {
            matches: ct.matches,
            loaderData: {},
            errors: {
              [et]: zt.error
            }
          });
          return;
        }
      }
      ge = ct.matches || ge, Le = ct.pendingActionResult, Ne = ch(
        Z,
        ge,
        V,
        te.submission
      ), Ce = !1, xe.active = !1, Se = bl(
        e.history,
        Se.url,
        Se.signal
      );
    }
    let {
      shortCircuited: qe,
      matches: Be,
      loaderData: Pe,
      errors: ot,
      workingFetchers: Ct
    } = await Re(
      Se,
      Z,
      ge,
      V,
      ze,
      xe.active,
      Ne,
      te && te.submission,
      te && te.fetcherSubmission,
      te && te.replace,
      te && te.initialHydration === !0,
      Ce,
      Le,
      te && te.callSiteDefaultShouldRevalidate
    );
    qe || (K = null, Me(Z, {
      matches: Be || ge,
      ...Cy(Le),
      loaderData: Pe,
      errors: ot,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function _e(V, Z, te, me, ge, Ce, xe, Ne, Se = {}) {
    Lt();
    let ze = gN(
      Z,
      me,
      ge,
      te
    );
    if (we({ navigation: ze }, { flushSync: Se.flushSync === !0 }), xe) {
      let Be = await gt(
        me,
        Z.pathname,
        V.signal
      );
      if (Be.type === "aborted")
        return { shortCircuited: !0 };
      if (Be.type === "error") {
        if (Be.partialMatches.length === 0) {
          let { matches: ot, route: Ct } = Du(
            d.activeRoutes
          );
          return {
            matches: ot,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: Be.error
              }
            ]
          };
        }
        let Pe = Jr(Be.partialMatches).route.id;
        return {
          matches: Be.partialMatches,
          pendingActionResult: [
            Pe,
            {
              type: "error",
              error: Be.error
            }
          ]
        };
      } else if (Be.matches)
        me = Be.matches;
      else {
        let { notFoundMatches: Pe, error: ot, route: Ct } = fn(
          Z.pathname
        );
        return {
          matches: Pe,
          pendingActionResult: [
            Ct.id,
            {
              type: "error",
              error: ot
            }
          ]
        };
      }
    }
    let Le, qe = ac(me, Z);
    if (!qe.route.action && !qe.route.lazy)
      Le = {
        type: "error",
        error: sa(405, {
          method: V.method,
          pathname: Z.pathname,
          routeId: qe.route.id
        })
      };
    else {
      let Be = El(
        u,
        c,
        V,
        Z,
        me,
        qe,
        Ne ? [] : l,
        Ce
      ), Pe = await yt(
        V,
        Z,
        Be,
        Ce,
        null
      );
      if (Le = Pe[qe.route.id], !Le) {
        for (let ot of me)
          if (Pe[ot.route.id]) {
            Le = Pe[ot.route.id];
            break;
          }
      }
      if (V.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (_i(Le)) {
      let Be;
      return Se && Se.replace != null ? Be = Se.replace : Be = _y(
        Le.response.headers.get("Location"),
        new URL(V.url),
        p,
        e.history
      ) === A.location.pathname + A.location.search, await vt(V, Le, !0, {
        submission: te,
        replace: Be
      }), { shortCircuited: !0 };
    }
    if (Gn(Le)) {
      let Be = Jr(me, qe.route.id);
      return (Se && Se.replace) !== !0 && (I = "PUSH"), {
        matches: me,
        pendingActionResult: [
          Be.route.id,
          Le,
          qe.route.id
        ]
      };
    }
    return {
      matches: me,
      pendingActionResult: [qe.route.id, Le]
    };
  }
  async function Re(V, Z, te, me, ge, Ce, xe, Ne, Se, ze, Le, qe, Be, Pe) {
    let ot = xe || ch(Z, te, me, Ne), Ct = Ne || Se || Ty(ot), ct = !T && !Le;
    if (Ce) {
      if (ct) {
        let xt = Ae(Be);
        we(
          {
            navigation: ot,
            ...xt !== void 0 ? { actionData: xt } : {}
          },
          {
            flushSync: qe
          }
        );
      }
      let $e = await gt(
        te,
        Z.pathname,
        V.signal
      );
      if ($e.type === "aborted")
        return { shortCircuited: !0 };
      if ($e.type === "error") {
        if ($e.partialMatches.length === 0) {
          let { matches: vn, route: Hn } = Du(
            d.activeRoutes
          );
          return {
            matches: vn,
            loaderData: {},
            errors: {
              [Hn.id]: $e.error
            }
          };
        }
        let xt = Jr($e.partialMatches).route.id;
        return {
          matches: $e.partialMatches,
          loaderData: {},
          errors: {
            [xt]: $e.error
          }
        };
      } else if ($e.matches)
        te = $e.matches;
      else {
        let { error: xt, notFoundMatches: vn, route: Hn } = fn(
          Z.pathname
        );
        return {
          matches: vn,
          loaderData: {},
          errors: {
            [Hn.id]: xt
          }
        };
      }
    }
    let et = d.activeRoutes, { dsMatches: zt, revalidatingFetchers: rt } = gy(
      V,
      ge,
      u,
      c,
      e.history,
      A,
      te,
      Ct,
      Z,
      Le ? [] : l,
      Le === !0,
      z,
      F,
      de,
      ee,
      G,
      et,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      Be,
      Pe
    );
    if (j = ++ae, !e.dataStrategy && !zt.some(($e) => $e.shouldLoad) && !zt.some(
      ($e) => $e.route.middleware && $e.route.middleware.length > 0
    ) && rt.length === 0) {
      let $e = new Map(A.fetchers), xt = _r($e);
      return Me(
        Z,
        {
          matches: te,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Be && Gn(Be[1]) ? { [Be[0]]: Be[1].error } : null,
          ...Cy(Be),
          ...xt ? { fetchers: $e } : {}
        },
        { flushSync: qe }
      ), { shortCircuited: !0 };
    }
    if (ct) {
      let $e = {};
      if (!Ce) {
        $e.navigation = ot;
        let xt = Ae(Be);
        xt !== void 0 && ($e.actionData = xt);
      }
      rt.length > 0 && ($e.fetchers = lt(rt)), we($e, { flushSync: qe });
    }
    rt.forEach(($e) => {
      Ot($e.key), $e.controller && X.set($e.key, $e.controller);
    });
    let ja = () => rt.forEach(($e) => Ot($e.key));
    K && K.signal.addEventListener(
      "abort",
      ja
    );
    let { loaderResults: kn, fetcherResults: dn } = await Yt(
      zt,
      rt,
      V,
      Z,
      ge
    );
    if (V.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      ja
    ), rt.forEach(($e) => X.delete($e.key));
    let an = Au(kn);
    if (an)
      return await vt(V, an.result, !0, {
        replace: ze
      }), { shortCircuited: !0 };
    if (an = Au(dn), an)
      return G.add(an.key), await vt(V, an.result, !0, {
        replace: ze
      }), { shortCircuited: !0 };
    let En = new Map(A.fetchers), { loaderData: Sr, errors: Nn } = Ey(
      A,
      te,
      kn,
      Be,
      rt,
      dn,
      En
    );
    Le && A.errors && (Nn = { ...A.errors, ...Nn });
    let Er = _r(En), ga = Aa(
      j,
      En
    ), va = Er || ga || rt.length > 0;
    return {
      matches: te,
      loaderData: Sr,
      errors: Nn,
      ...va ? { workingFetchers: En } : {}
    };
  }
  function Ae(V) {
    if (V && !Gn(V[1]))
      return {
        [V[0]]: V[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function lt(V) {
    let Z = new Map(A.fetchers);
    return V.forEach((te) => {
      let me = Z.get(te.key), ge = Oo(
        void 0,
        me ? me.data : void 0
      );
      Z.set(te.key, ge);
    }), Z;
  }
  async function Ze(V, Z, te, me) {
    Ot(V);
    let ge = (me && me.flushSync) === !0, Ce = d.activeRoutes, xe = qh(
      A.location,
      A.matches,
      p,
      te,
      Z,
      me?.relative
    ), Ne = _a(
      Ce,
      xe,
      p,
      !1,
      d.branches
    ), Se = gn(Ne, Ce, xe);
    if (Se.active && Se.matches && (Ne = Se.matches), !Ne) {
      ut(
        V,
        Z,
        sa(404, { pathname: xe }),
        { flushSync: ge }
      );
      return;
    }
    let { path: ze, submission: Le, error: qe } = py(
      !0,
      xe,
      me
    );
    if (qe) {
      ut(V, Z, qe, { flushSync: ge });
      return;
    }
    let Be = e.getContext ? await e.getContext() : new sy(), Pe = (me && me.preventScrollReset) === !0;
    if (Le && mn(Le.formMethod)) {
      await Fe(
        V,
        Z,
        ze,
        Ne,
        Be,
        Se.active,
        ge,
        Pe,
        Le,
        me && me.defaultShouldRevalidate
      );
      return;
    }
    ee.set(V, { routeId: Z, path: ze }), await Ke(
      V,
      Z,
      ze,
      Ne,
      Be,
      Se.active,
      ge,
      Pe,
      Le
    );
  }
  async function Fe(V, Z, te, me, ge, Ce, xe, Ne, Se, ze) {
    Lt(), ee.delete(V);
    let Le = A.fetchers.get(V);
    pt(V, vN(Se, Le), {
      flushSync: xe
    });
    let qe = new AbortController(), Be = bl(
      e.history,
      te,
      qe.signal,
      Se
    );
    if (Ce) {
      let ht = await gt(
        me,
        new URL(Be.url).pathname,
        Be.signal,
        V
      );
      if (ht.type === "aborted")
        return;
      if (ht.type === "error") {
        ut(V, Z, ht.error, { flushSync: xe });
        return;
      } else if (ht.matches)
        me = ht.matches;
      else {
        ut(
          V,
          Z,
          sa(404, { pathname: te }),
          { flushSync: xe }
        );
        return;
      }
    }
    let Pe = ac(me, te);
    if (!Pe.route.action && !Pe.route.lazy) {
      let ht = sa(405, {
        method: Se.formMethod,
        pathname: te,
        routeId: Z
      });
      ut(V, Z, ht, { flushSync: xe });
      return;
    }
    X.set(V, qe);
    let ot = ae, Ct = El(
      u,
      c,
      Be,
      te,
      me,
      Pe,
      l,
      ge
    ), ct = await yt(
      Be,
      te,
      Ct,
      ge,
      V
    ), et = ct[Pe.route.id];
    if (!et) {
      for (let ht of Ct)
        if (ct[ht.route.id]) {
          et = ct[ht.route.id];
          break;
        }
    }
    if (Be.signal.aborted) {
      X.get(V) === qe && X.delete(V);
      return;
    }
    if (de.has(V)) {
      if (_i(et) || Gn(et)) {
        pt(V, Ua(void 0));
        return;
      }
    } else {
      if (_i(et))
        if (X.delete(V), j > ot) {
          pt(V, Ua(void 0));
          return;
        } else
          return G.add(V), pt(V, Oo(Se)), vt(Be, et, !1, {
            fetcherSubmission: Se,
            preventScrollReset: Ne
          });
      if (Gn(et)) {
        ut(V, Z, et.error);
        return;
      }
    }
    let zt = A.navigation.location || A.location, rt = bl(
      e.history,
      zt,
      qe.signal
    ), ja = d.activeRoutes, kn = A.navigation.state !== "idle" ? _a(
      ja,
      A.navigation.location,
      p,
      !1,
      d.branches
    ) : A.matches;
    Qe(kn, "Didn't find any matches after fetcher action");
    let dn = ++ae;
    k.set(V, dn);
    let { dsMatches: an, revalidatingFetchers: En } = gy(
      rt,
      ge,
      u,
      c,
      e.history,
      A,
      kn,
      Se,
      zt,
      l,
      !1,
      z,
      F,
      de,
      ee,
      G,
      ja,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Pe.route.id, et],
      ze
    ), Sr = Oo(Se, et.data), Nn = new Map(A.fetchers);
    Nn.set(V, Sr), En.filter((ht) => ht.key !== V).forEach((ht) => {
      let Kn = ht.key, rn = Nn.get(Kn), ai = Oo(
        void 0,
        rn ? rn.data : void 0
      );
      Nn.set(Kn, ai), Ot(Kn), ht.controller && X.set(Kn, ht.controller);
    }), we({ fetchers: Nn });
    let Er = () => En.forEach((ht) => Ot(ht.key));
    qe.signal.addEventListener(
      "abort",
      Er
    );
    let { loaderResults: ga, fetcherResults: va } = await Yt(
      an,
      En,
      rt,
      zt,
      ge
    );
    if (qe.signal.aborted)
      return;
    qe.signal.removeEventListener(
      "abort",
      Er
    ), k.delete(V), X.delete(V), En.forEach((ht) => X.delete(ht.key));
    let $e = A.fetchers.has(V), xt = (ht) => {
      if (!$e) return ht;
      let Kn = new Map(ht.fetchers);
      return Kn.set(V, Ua(et.data)), { ...ht, fetchers: Kn };
    }, vn = Au(ga);
    if (vn)
      return A = xt(A), vt(
        rt,
        vn.result,
        !1,
        { preventScrollReset: Ne }
      );
    if (vn = Au(va), vn)
      return G.add(vn.key), A = xt(A), vt(
        rt,
        vn.result,
        !1,
        { preventScrollReset: Ne }
      );
    let Hn = new Map(A.fetchers);
    $e && Hn.set(V, Ua(et.data));
    let { loaderData: Nr, errors: Xa } = Ey(
      A,
      kn,
      ga,
      void 0,
      En,
      va,
      Hn
    );
    Aa(dn, Hn), A.navigation.state === "loading" && dn > j ? (Qe(I, "Expected pending action"), K && K.abort(), Me(A.navigation.location, {
      matches: kn,
      loaderData: Nr,
      errors: Xa,
      fetchers: Hn
    })) : (we({
      errors: Xa,
      loaderData: Ny(
        A.loaderData,
        Nr,
        kn,
        Xa
      ),
      fetchers: Hn
    }), z = !1);
  }
  async function Ke(V, Z, te, me, ge, Ce, xe, Ne, Se) {
    let ze = A.fetchers.get(V);
    pt(
      V,
      Oo(
        Se,
        ze ? ze.data : void 0
      ),
      { flushSync: xe }
    );
    let Le = new AbortController(), qe = bl(
      e.history,
      te,
      Le.signal
    );
    if (Ce) {
      let et = await gt(
        me,
        new URL(qe.url).pathname,
        qe.signal,
        V
      );
      if (et.type === "aborted")
        return;
      if (et.type === "error") {
        ut(V, Z, et.error, { flushSync: xe });
        return;
      } else if (et.matches)
        me = et.matches;
      else {
        ut(
          V,
          Z,
          sa(404, { pathname: te }),
          { flushSync: xe }
        );
        return;
      }
    }
    let Be = ac(me, te);
    X.set(V, Le);
    let Pe = ae, ot = El(
      u,
      c,
      qe,
      te,
      me,
      Be,
      l,
      ge
    ), Ct = await yt(
      qe,
      te,
      ot,
      ge,
      V
    ), ct = Ct[Be.route.id];
    if (!ct) {
      for (let et of me)
        if (Ct[et.route.id]) {
          ct = Ct[et.route.id];
          break;
        }
    }
    if (X.get(V) === Le && X.delete(V), !qe.signal.aborted) {
      if (de.has(V)) {
        pt(V, Ua(void 0));
        return;
      }
      if (_i(ct))
        if (j > Pe) {
          pt(V, Ua(void 0));
          return;
        } else {
          G.add(V), await vt(qe, ct, !1, {
            preventScrollReset: Ne
          });
          return;
        }
      if (Gn(ct)) {
        ut(V, Z, ct.error);
        return;
      }
      pt(V, Ua(ct.data));
    }
  }
  async function vt(V, Z, te, {
    submission: me,
    fetcherSubmission: ge,
    preventScrollReset: Ce,
    replace: xe
  } = {}) {
    te || (Q?.resolve(), Q = null), Z.response.headers.has("X-Remix-Revalidate") && (z = !0);
    let Ne = Z.response.headers.get("Location");
    Qe(Ne, "Expected a Location header on the redirect Response"), Ne = _y(
      Ne,
      new URL(V.url),
      p,
      e.history
    );
    let Se = $h(A.location, Ne, {
      _isRedirect: !0
    });
    if (i) {
      let ot = !1;
      if (Z.response.headers.has("X-Remix-Reload-Document"))
        ot = !0;
      else if (wm(Ne)) {
        const Ct = d2(a, Ne, !0);
        ot = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        da(Ct.pathname, p) == null;
      }
      if (ot) {
        xe ? a.location.replace(Ne) : a.location.assign(Ne);
        return;
      }
    }
    K = null;
    let ze = xe === !0 || Z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Le, formAction: qe, formEncType: Be } = A.navigation;
    !me && !ge && Le && qe && Be && (me = Ty(A.navigation));
    let Pe = me || ge;
    if (G2.has(Z.response.status) && Pe && mn(Pe.formMethod))
      await pe(ze, Se, {
        submission: {
          ...Pe,
          formAction: Ne
        },
        // Preserve these flags across redirects
        preventScrollReset: Ce || $,
        enableViewTransition: te ? ne : void 0
      });
    else {
      let ot = ch(
        Se,
        [],
        ze,
        me
      );
      await pe(ze, Se, {
        overrideNavigation: ot,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ge,
        // Preserve these flags across redirects
        preventScrollReset: Ce || $,
        enableViewTransition: te ? ne : void 0
      });
    }
  }
  async function yt(V, Z, te, me, ge) {
    let Ce, xe = {};
    try {
      Ce = await nN(
        m,
        V,
        Z,
        te,
        ge,
        me,
        !1
      );
    } catch (Ne) {
      return te.filter((Se) => Se.shouldLoad).forEach((Se) => {
        xe[Se.route.id] = {
          type: "error",
          error: Ne
        };
      }), xe;
    }
    if (V.signal.aborted)
      return xe;
    if (!mn(V.method))
      for (let Ne of te) {
        if (Ce[Ne.route.id]?.type === "error")
          break;
        !Ce.hasOwnProperty(Ne.route.id) && !A.loaderData.hasOwnProperty(Ne.route.id) && (!A.errors || !A.errors.hasOwnProperty(Ne.route.id)) && Ne.shouldCallHandler() && (Ce[Ne.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ne.route.id}`
          )
        });
      }
    for (let [Ne, Se] of Object.entries(Ce))
      if (dN(Se)) {
        let ze = Se.result;
        xe[Ne] = {
          type: "redirect",
          response: lN(
            ze,
            V,
            Ne,
            te,
            p
          )
        };
      } else
        xe[Ne] = await iN(Se);
    return xe;
  }
  async function Yt(V, Z, te, me, ge) {
    let Ce = yt(
      te,
      me,
      V,
      ge,
      null
    ), xe = Promise.all(
      Z.map(async (ze) => {
        if (ze.matches && ze.match && ze.request && ze.controller) {
          let qe = (await yt(
            ze.request,
            ze.path,
            ze.matches,
            ge,
            ze.key
          ))[ze.match.route.id];
          return { [ze.key]: qe };
        } else
          return Promise.resolve({
            [ze.key]: {
              type: "error",
              error: sa(404, {
                pathname: ze.path
              })
            }
          });
      })
    ), Ne = await Ce, Se = (await xe).reduce(
      (ze, Le) => Object.assign(ze, Le),
      {}
    );
    return {
      loaderResults: Ne,
      fetcherResults: Se
    };
  }
  function Lt() {
    z = !0, ee.forEach((V, Z) => {
      X.has(Z) && F.add(Z), Ot(Z);
    });
  }
  function pt(V, Z, te = {}) {
    let me = new Map(A.fetchers);
    me.set(V, Z), we(
      { fetchers: me },
      { flushSync: (te && te.flushSync) === !0 }
    );
  }
  function ut(V, Z, te, me = {}) {
    let ge = Jr(A.matches, Z), Ce = new Map(A.fetchers);
    nn(Ce, V), we(
      {
        errors: {
          [ge.route.id]: te
        },
        fetchers: Ce
      },
      { flushSync: (me && me.flushSync) === !0 }
    );
  }
  function Zn(V) {
    return se.set(V, (se.get(V) || 0) + 1), de.has(V) && de.delete(V), A.fetchers.get(V) || F2;
  }
  function _n(V, Z) {
    Ot(V, Z?.reason), pt(V, Ua(null));
  }
  function nn(V, Z) {
    let te = A.fetchers.get(Z);
    X.has(Z) && !(te && te.state === "loading" && k.has(Z)) && Ot(Z), ee.delete(Z), k.delete(Z), G.delete(Z), de.delete(Z), F.delete(Z), V.delete(Z);
  }
  function Kt(V) {
    let Z = (se.get(V) || 0) - 1;
    Z <= 0 ? (se.delete(V), de.add(V)) : se.set(V, Z), we({ fetchers: new Map(A.fetchers) });
  }
  function Ot(V, Z) {
    let te = X.get(V);
    te && (te.abort(Z), X.delete(V));
  }
  function Ut(V, Z) {
    for (let te of V) {
      let me = Z.get(te);
      Qe(me, `Expected fetcher: ${te}`);
      let ge = Ua(me.data);
      Z.set(te, ge);
    }
  }
  function _r(V) {
    let Z = [], te = !1;
    for (let me of G) {
      let ge = V.get(me);
      Qe(ge, `Expected fetcher: ${me}`), ge.state === "loading" && (G.delete(me), Z.push(me), te = !0);
    }
    return Ut(Z, V), te;
  }
  function Aa(V, Z) {
    let te = [];
    for (let [me, ge] of k)
      if (ge < V) {
        let Ce = Z.get(me);
        Qe(Ce, `Expected fetcher: ${me}`), Ce.state === "loading" && (Ot(me), k.delete(me), te.push(me));
      }
    return Ut(te, Z), te.length > 0;
  }
  function Sn(V, Z) {
    let te = A.blockers.get(V) || jo;
    return he.get(V) !== Z && he.set(V, Z), te;
  }
  function ma(V) {
    A.blockers.delete(V), he.delete(V);
  }
  function Ln(V, Z) {
    let te = A.blockers.get(V) || jo;
    Qe(
      te.state === "unblocked" && Z.state === "blocked" || te.state === "blocked" && Z.state === "blocked" || te.state === "blocked" && Z.state === "proceeding" || te.state === "blocked" && Z.state === "unblocked" || te.state === "proceeding" && Z.state === "unblocked",
      `Invalid blocker state transition: ${te.state} -> ${Z.state}`
    );
    let me = new Map(A.blockers);
    me.set(V, Z), we({ blockers: me });
  }
  function Qn({
    currentLocation: V,
    nextLocation: Z,
    historyAction: te
  }) {
    if (he.size === 0)
      return;
    he.size > 1 && It(!1, "A router only supports one blocker at a time");
    let me = Array.from(he.entries()), [ge, Ce] = me[me.length - 1], xe = A.blockers.get(ge);
    if (!(xe && xe.state === "proceeding") && Ce({ currentLocation: V, nextLocation: Z, historyAction: te }))
      return ge;
  }
  function fn(V) {
    let Z = sa(404, { pathname: V }), te = d.activeRoutes, { matches: me, route: ge } = Du(te);
    return { notFoundMatches: me, route: ge, error: Z };
  }
  function Ve(V, Z, te) {
    if (w = V, C = Z, R = te || null, !N && A.navigation === uh) {
      N = !0;
      let me = Vt(A.location, A.matches);
      me != null && we({ restoreScrollPosition: me });
    }
    return () => {
      w = null, C = null, R = null;
    };
  }
  function bt(V, Z) {
    return R && R(
      V,
      Z.map((me) => y2(me, A.loaderData))
    ) || V.key;
  }
  function kt(V, Z) {
    if (w && C) {
      let te = bt(V, Z);
      w[te] = C();
    }
  }
  function Vt(V, Z) {
    if (w) {
      let te = bt(V, Z), me = w[te];
      if (typeof me == "number")
        return me;
    }
    return null;
  }
  function gn(V, Z, te) {
    if (e.patchRoutesOnNavigation) {
      let me = d.branches;
      if (V) {
        if (Object.keys(V[0].params).length > 0)
          return { active: !0, matches: _a(
            Z,
            te,
            p,
            !0,
            me
          ) };
      } else
        return { active: !0, matches: _a(
          Z,
          te,
          p,
          !0,
          me
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function gt(V, Z, te, me) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: V };
    let ge = V;
    for (; ; ) {
      let Ce = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: te,
          path: Z,
          matches: ge,
          fetcherKey: me,
          patch: (ze, Le) => {
            te.aborted || vy(
              ze,
              Le,
              d,
              Ce,
              u,
              !1
            );
          }
        });
      } catch (ze) {
        return { type: "error", error: ze, partialMatches: ge };
      }
      if (te.aborted)
        return { type: "aborted" };
      let xe = d.branches, Ne = _a(
        d.activeRoutes,
        Z,
        p,
        !1,
        xe
      ), Se = null;
      if (Ne) {
        if (Object.keys(Ne[0].params).length === 0)
          return { type: "success", matches: Ne };
        if (Se = _a(
          d.activeRoutes,
          Z,
          p,
          !0,
          xe
        ), !(Se && ge.length < Se.length && Wt(
          ge,
          Se.slice(0, ge.length)
        )))
          return { type: "success", matches: Ne };
      }
      if (Se || (Se = _a(
        d.activeRoutes,
        Z,
        p,
        !0,
        xe
      )), !Se || Wt(ge, Se))
        return { type: "success", matches: null };
      ge = Se;
    }
  }
  function Wt(V, Z) {
    return V.length === Z.length && V.every((te, me) => te.route.id === Z[me].route.id);
  }
  function pa(V) {
    c = {}, d.setHmrRoutes(
      Po(
        V,
        u,
        void 0,
        c
      )
    );
  }
  function en(V, Z, te = !1) {
    vy(
      V,
      Z,
      d,
      c,
      u,
      te
    ), d.hasHMRRoutes || we({});
  }
  return U = {
    get basename() {
      return p;
    },
    get future() {
      return y;
    },
    get state() {
      return A;
    },
    get routes() {
      return d.stableRoutes;
    },
    get branches() {
      return d.branches;
    },
    get manifest() {
      return c;
    },
    get window() {
      return a;
    },
    initialize: De,
    subscribe: Ee,
    enableScrollRestoration: Ve,
    navigate: Ye,
    fetch: Ze,
    revalidate: ye,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (V) => e.history.createHref(V),
    encodeLocation: (V) => e.history.encodeLocation(V),
    getFetcher: Zn,
    resetFetcher: _n,
    deleteFetcher: Kt,
    dispose: Oe,
    getBlocker: Sn,
    deleteBlocker: ma,
    patchRoutes: en,
    _internalFetchControllers: X,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: pa,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(V) {
      we(V);
    }
  }, e.instrumentations && (U = H2(
    U,
    e.instrumentations.map((V) => V.router).filter(Boolean)
  )), U;
}
function Q2(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function qh(e, a, i, l, s, u) {
  let c, d;
  if (s) {
    c = [];
    for (let m of a)
      if (c.push(m), m.route.id === s) {
        d = m;
        break;
      }
  } else
    c = a, d = a[a.length - 1];
  let p = Mc(
    l || ".",
    _m(c),
    da(e.pathname, i) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = Cm(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let y = new URLSearchParams(p.search), g = y.getAll("index");
      y.delete("index"), g.filter((x) => x).forEach((x) => y.append("index", x));
      let b = y.toString();
      p.search = b ? `?${b}` : "";
    }
  }
  return i !== "/" && (p.pathname = A2({ basename: i, pathname: p.pathname })), Ga(p);
}
function py(e, a, i) {
  if (!i || !Q2(i))
    return { path: a };
  if (i.formMethod && !pN(i.formMethod))
    return {
      path: a,
      error: sa(405, { method: i.formMethod })
    };
  let l = () => ({
    path: a,
    error: sa(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), c = f1(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!mn(u))
        return l();
      let g = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (b, [x, w]) => `${b}${x}=${w}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: c,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!mn(u))
        return l();
      try {
        let g = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: i.formEncType,
            formData: void 0,
            json: g,
            text: void 0
          }
        };
      } catch {
        return l();
      }
    }
  }
  Qe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let d, p;
  if (i.formData)
    d = Yh(i.formData), p = i.formData;
  else if (i.body instanceof FormData)
    d = Yh(i.body), p = i.body;
  else if (i.body instanceof URLSearchParams)
    d = i.body, p = Sy(d);
  else if (i.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(i.body), p = Sy(d);
    } catch {
      return l();
    }
  let m = {
    formMethod: u,
    formAction: c,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (mn(m.formMethod))
    return { path: a, submission: m };
  let y = Ta(a);
  return e && y.search && Cm(y.search) && d.append("index", ""), y.search = `?${d}`, { path: Ga(y), submission: m };
}
function gy(e, a, i, l, s, u, c, d, p, m, y, g, b, x, w, R, C, N, D, E, O, H) {
  let B = O ? Gn(O[1]) ? O[1].error : O[1].data : void 0, U = s.createURL(u.location), A = s.createURL(p), I;
  if (y && u.errors) {
    let T = Object.keys(u.errors)[0];
    I = c.findIndex((z) => z.route.id === T);
  } else if (O && Gn(O[1])) {
    let T = O[0];
    I = c.findIndex((z) => z.route.id === T) - 1;
  }
  let Q = O ? O[1].statusCode : void 0, $ = Q && Q >= 400, K = {
    currentUrl: U,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...d,
    actionResult: B,
    actionStatus: Q
  }, ne = cs(c), L = c.map((T, z) => {
    let { route: F } = T, X = null;
    if (I != null && z > I)
      X = !1;
    else if (F.lazy)
      X = !0;
    else if (!Em(F))
      X = !1;
    else if (y) {
      let { shouldLoad: G } = r1(
        F,
        u.loaderData,
        u.errors
      );
      X = G;
    } else K2(u.loaderData, u.matches[z], T) && (X = !0);
    if (X !== null)
      return Ih(
        i,
        l,
        e,
        p,
        ne,
        T,
        m,
        a,
        X
      );
    let ae = !1;
    typeof H == "boolean" ? ae = H : $ ? ae = !1 : (g || U.pathname + U.search === A.pathname + A.search || U.search !== A.search || W2(u.matches[z], T)) && (ae = !0);
    let j = {
      ...K,
      defaultShouldRevalidate: ae
    }, k = Yo(T, j);
    return Ih(
      i,
      l,
      e,
      p,
      ne,
      T,
      m,
      a,
      k,
      j,
      H
    );
  }), Y = [];
  return w.forEach((T, z) => {
    if (y || !c.some((se) => se.route.id === T.routeId) || x.has(z))
      return;
    let F = u.fetchers.get(z), X = F && F.state !== "idle" && F.data === void 0, ae = _a(
      C,
      T.path,
      N ?? "/",
      !1,
      E
    );
    if (!ae) {
      if (D && X)
        return;
      Y.push({
        key: z,
        routeId: T.routeId,
        path: T.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(z))
      return;
    let j = ac(ae, T.path), k = new AbortController(), G = bl(
      s,
      T.path,
      k.signal
    ), ee = null;
    if (b.has(z))
      b.delete(z), ee = El(
        i,
        l,
        G,
        T.path,
        ae,
        j,
        m,
        a
      );
    else if (X)
      g && (ee = El(
        i,
        l,
        G,
        T.path,
        ae,
        j,
        m,
        a
      ));
    else {
      let se;
      typeof H == "boolean" ? se = H : $ ? se = !1 : se = g;
      let de = {
        ...K,
        defaultShouldRevalidate: se
      };
      Yo(j, de) && (ee = El(
        i,
        l,
        G,
        T.path,
        ae,
        j,
        m,
        a,
        de
      ));
    }
    ee && Y.push({
      key: z,
      routeId: T.routeId,
      path: T.path,
      matches: ee,
      match: j,
      request: G,
      controller: k
    });
  }), { dsMatches: L, revalidatingFetchers: Y };
}
function Em(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function r1(e, a, i) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Em(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = i != null && i[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function K2(e, a, i) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), s = !e.hasOwnProperty(i.route.id);
  return l || s;
}
function W2(e, a) {
  let i = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function Yo(e, a) {
  if (e.route.shouldRevalidate) {
    let i = e.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function vy(e, a, i, l, s, u) {
  let c;
  if (e) {
    let m = l[e];
    Qe(
      m,
      `No route found to patch children into: routeId = ${e}`
    ), m.children || (m.children = []), c = m.children;
  } else
    c = i.activeRoutes;
  let d = [], p = [];
  if (a.forEach((m) => {
    let y = c.find(
      (g) => i1(m, g)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = Po(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: g } = p[m], b = y, [x] = Po(
        [g],
        s,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(b, {
        element: x.element ? x.element : b.element,
        errorElement: x.errorElement ? x.errorElement : b.errorElement,
        hydrateFallbackElement: x.hydrateFallbackElement ? x.hydrateFallbackElement : b.hydrateFallbackElement
      });
    }
  i.hasHMRRoutes || i.setRoutes([...i.activeRoutes]);
}
function i1(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (i, l) => a.children?.some((s) => i1(i, s))
  ) ?? !1 : !1;
}
var yy = /* @__PURE__ */ new WeakMap(), l1 = ({
  key: e,
  route: a,
  manifest: i,
  mapRouteProperties: l
}) => {
  let s = i[a.id];
  if (Qe(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[e];
  if (!u)
    return;
  let c = yy.get(s);
  c || (c = {}, yy.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = m2(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
    if (m)
      It(
        !m,
        "Route property " + e + " is not a supported lazy route property. This property will be ignored."
      ), c[e] = Promise.resolve();
    else if (g)
      It(
        !1,
        `Route "${s.id}" has a static property "${e}" defined. The lazy property will be ignored.`
      );
    else {
      let b = await u();
      b != null && (Object.assign(s, { [e]: b }), Object.assign(s, l(s)));
    }
    typeof s.lazy == "object" && (s.lazy[e] = void 0, Object.values(s.lazy).every((b) => b === void 0) && (s.lazy = void 0));
  })();
  return c[e] = p, p;
}, by = /* @__PURE__ */ new WeakMap();
function J2(e, a, i, l, s) {
  let u = i[e.id];
  if (Qe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let y = by.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let g = (async () => {
      Qe(
        typeof e.lazy == "function",
        "No lazy route function found"
      );
      let b = await e.lazy(), x = {};
      for (let w in b) {
        let R = b[w];
        if (R === void 0)
          continue;
        let C = g2(w), D = u[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        C ? It(
          !C,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : D ? It(
          !D,
          `Route "${u.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : x[w] = R;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return by.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let g = l1({
      key: y,
      route: e,
      manifest: i,
      mapRouteProperties: l
    });
    g && (d.push(g), y === a && (p = g));
  }
  let m = d.length > 0 ? Promise.all(d).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: p
  };
}
async function xy(e) {
  let a = e.matches.filter((s) => s.shouldLoad), i = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    i[a[u].route.id] = s;
  }), i;
}
async function eN(e) {
  return e.matches.some((a) => a.route.middleware) ? o1(e, () => xy(e)) : xy(e);
}
function o1(e, a) {
  return tN(
    e,
    a,
    (l) => {
      if (mN(l))
        throw l;
      return l;
    },
    cN,
    i
  );
  function i(l, s, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [s]: { type: "error", result: l }
        })
      );
    {
      let { matches: c } = e, d = Math.min(
        // Throwing route
        Math.max(
          c.findIndex((m) => m.route.id === s),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          c.findIndex((m) => m.shouldCallHandler()),
          0
        )
      ), p = Jr(
        c,
        c[d].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: l }
      });
    }
  }
}
async function tN(e, a, i, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await s1(
    c,
    d,
    a,
    i,
    l,
    s
  );
}
async function s1(e, a, i, l, s, u, c = 0) {
  let { request: d } = e;
  if (d.signal.aborted)
    throw d.signal.reason ?? new Error(`Request aborted: ${d.method} ${d.url}`);
  let p = a[c];
  if (!p)
    return await i();
  let [m, y] = p, g, b = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await s1(
        e,
        a,
        i,
        l,
        s,
        u,
        c + 1
      ) }, g.value;
    } catch (x) {
      return g = { value: await u(x, m, g) }, g.value;
    }
  };
  try {
    let x = await y(e, b), w = x != null ? l(x) : void 0;
    return s(w) ? w : g ? w ?? g.value : (g = { value: await b() }, g.value);
  } catch (x) {
    return await u(x, m, g);
  }
}
function u1(e, a, i, l, s) {
  let u = l1({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = J2(
    l.route,
    mn(i.method) ? "action" : "loader",
    a,
    e,
    s
  );
  return {
    middleware: u,
    route: c.lazyRoutePromise,
    handler: c.lazyHandlerPromise
  };
}
function Ih(e, a, i, l, s, u, c, d, p, m = null, y) {
  let g = !1, b = u1(
    e,
    a,
    i,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: b,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(x) {
      return g = !0, m ? typeof y == "boolean" ? Yo(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? Yo(u, {
        ...m,
        defaultShouldRevalidate: x
      }) : Yo(u, m) : p;
    },
    resolve(x) {
      let { lazy: w, loader: R, middleware: C } = u.route, N = g || p || x && !mn(i.method) && (w || R), D = C && C.length > 0 && !R && !w;
      return N && (mn(i.method) || !D) ? aN({
        request: i,
        path: l,
        pattern: s,
        match: u,
        lazyHandlerPromise: b?.handler,
        lazyRoutePromise: b?.route,
        handlerOverride: x,
        scopedContext: d
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function El(e, a, i, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: u1(
      e,
      a,
      i,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Ih(
    e,
    a,
    i,
    l,
    cs(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function nN(e, a, i, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let d = {
    request: a,
    url: c1(a, i),
    pattern: cs(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let g = d;
      return o1(g, () => y({
        ...g,
        fetcherKey: s,
        runClientMiddleware: () => {
          throw new Error(
            "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
          );
        }
      }));
    }
  });
  try {
    await Promise.all(
      l.flatMap((y) => [
        y._lazyPromises?.handler,
        y._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function aN({
  request: e,
  path: a,
  pattern: i,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, m, y = mn(e.method), g = y ? "action" : "loader", b = (x) => {
    let w, R = new Promise((D, E) => w = E);
    m = () => w(), e.signal.addEventListener("abort", m);
    let C = (D) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: c1(e, a),
        pattern: i,
        params: l.params,
        context: d
      },
      ...D !== void 0 ? [D] : []
    ), N = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => C(E)) : C()) };
      } catch (D) {
        return { type: "error", result: D };
      }
    })();
    return Promise.race([N, R]);
  };
  try {
    let x = y ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let w, [R] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          b(x).catch((C) => {
            w = C;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (w !== void 0)
          throw w;
        p = R;
      } else {
        await s;
        let w = y ? l.route.action : l.route.loader;
        if (w)
          [p] = await Promise.all([b(w), u]);
        else if (g === "action") {
          let R = new URL(e.url), C = R.pathname + R.search;
          throw sa(405, {
            method: e.method,
            pathname: C,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await b(x);
    else {
      let w = new URL(e.url), R = w.pathname + w.search;
      throw sa(404, {
        pathname: R
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    m && e.signal.removeEventListener("abort", m);
  }
  return p;
}
async function rN(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function iN(e) {
  let { result: a, type: i } = e;
  if (Nm(a)) {
    let l;
    try {
      l = await rN(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return i === "error" ? {
      type: "error",
      error: new Dc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Ry(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: uN(a),
    statusCode: Zo(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Zo(a) ? a.status : void 0
  } : Ry(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function lN(e, a, i, l, s) {
  let u = e.headers.get("Location");
  if (Qe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !wm(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === i) + 1
    );
    u = qh(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var wy = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  // eslint-disable-next-line no-script-url
  "javascript:"
];
function _y(e, a, i, l) {
  if (wm(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (wy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = da(u.pathname, i) != null;
    if (u.origin === a.origin && c)
      return Sm(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (wy.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function bl(e, a, i, l) {
  let s = e.createURL(f1(a)).toString(), u = { signal: i };
  if (l && mn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = Yh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function c1(e, a) {
  let i = new URL(e.url), l = typeof a == "string" ? Ta(a) : a;
  if (i.pathname = l.pathname || "/", l.search) {
    let s = new URLSearchParams(l.search), u = s.getAll("index");
    s.delete("index");
    for (let c of u.filter(Boolean))
      s.append("index", c);
    i.search = s.size ? `?${s.toString()}` : "";
  } else
    i.search = "";
  return i.hash = l.hash || "", i;
}
function Yh(e) {
  let a = new URLSearchParams();
  for (let [i, l] of e.entries())
    a.append(i, typeof l == "string" ? l : l.name);
  return a;
}
function Sy(e) {
  let a = new FormData();
  for (let [i, l] of e.entries())
    a.append(i, l);
  return a;
}
function oN(e, a, i, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, y = i && Gn(i[1]) ? i[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let b = g.route.id, x = a[b];
    if (Qe(
      !_i(x),
      "Cannot handle redirect results in processLoaderData"
    ), Gn(x)) {
      let w = x.error;
      if (y !== void 0 && (w = y, y = void 0), c = c || {}, s)
        c[b] = w;
      else {
        let R = Jr(e, b);
        c[R.route.id] == null && (c[R.route.id] = w);
      }
      l || (u[b] = a1), p || (p = !0, d = Zo(x.error) ? x.error.status : 500), x.headers && (m[b] = x.headers);
    } else
      u[b] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (m[b] = x.headers);
  }), y !== void 0 && i && (c = { [i[0]]: y }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function Ey(e, a, i, l, s, u, c) {
  let { loaderData: d, errors: p } = oN(
    a,
    i,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: g, controller: b } = m;
    if (b && b.signal.aborted)
      return;
    let x = u[y];
    if (Qe(x, "Did not find corresponding fetcher result"), Gn(x)) {
      let w = Jr(e.matches, g?.route.id);
      p && p[w.route.id] || (p = {
        ...p,
        [w.route.id]: x.error
      }), c.delete(y);
    } else if (_i(x))
      Qe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Ua(x.data);
      c.set(y, w);
    }
  }), { loaderData: d, errors: p };
}
function Ny(e, a, i, l) {
  let s = Object.entries(a).filter(([, u]) => u !== a1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of i) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Cy(e) {
  return e ? Gn(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Jr(e, a) {
  return (a ? e.slice(0, e.findIndex((l) => l.route.id === a) + 1) : [...e]).reverse().find((l) => l.route.hasErrorBoundary === !0) || e[0];
}
function Du(e) {
  let a = e.length === 1 ? e[0] : e.find((i) => i.index || !i.path || i.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route: a
      }
    ],
    route: a
  };
}
function sa(e, {
  pathname: a,
  routeId: i,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", d = "Unknown @remix-run/router error";
  return e === 400 ? (c = "Bad Request", l && a && i ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${i}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && i ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new Dc(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function Au(e) {
  let a = Object.entries(e);
  for (let i = a.length - 1; i >= 0; i--) {
    let [l, s] = a[i];
    if (_i(s))
      return { key: l, result: s };
  }
}
function f1(e) {
  let a = typeof e == "string" ? Ta(e) : e;
  return Ga({ ...a, hash: "" });
}
function sN(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function uN(e) {
  return new Dc(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function cN(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, i]) => typeof a == "string" && fN(i)
  );
}
function fN(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function dN(e) {
  return Nm(e.result) && t1.has(e.result.status);
}
function Gn(e) {
  return e.type === "error";
}
function _i(e) {
  return (e && e.type) === "redirect";
}
function Ry(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function Nm(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function hN(e) {
  return t1.has(e);
}
function mN(e) {
  return Nm(e) && hN(e.status) && e.headers.has("Location");
}
function pN(e) {
  return Y2.has(e.toUpperCase());
}
function mn(e) {
  return q2.has(e.toUpperCase());
}
function Cm(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function ac(e, a) {
  let i = typeof a == "string" ? Ta(a).search : a.search;
  if (e[e.length - 1].route.index && Cm(i || ""))
    return e[e.length - 1];
  let l = Qx(e);
  return l[l.length - 1];
}
function Ty(e) {
  let { formMethod: a, formAction: i, formEncType: l, text: s, formData: u, json: c } = e;
  if (!(!a || !i || !l)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: void 0,
        text: s
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (c !== void 0)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: c,
        text: void 0
      };
  }
}
function ch(e, a, i, l) {
  return l ? {
    state: "loading",
    location: e,
    matches: a,
    historyAction: i,
    formMethod: l.formMethod,
    formAction: l.formAction,
    formEncType: l.formEncType,
    formData: l.formData,
    json: l.json,
    text: l.text
  } : {
    state: "loading",
    location: e,
    matches: a,
    historyAction: i,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function gN(e, a, i, l) {
  return {
    state: "submitting",
    location: e,
    matches: a,
    historyAction: i,
    formMethod: l.formMethod,
    formAction: l.formAction,
    formEncType: l.formEncType,
    formData: l.formData,
    json: l.json,
    text: l.text
  };
}
function Oo(e, a) {
  return e ? {
    state: "loading",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: a
  } : {
    state: "loading",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: a
  };
}
function vN(e, a) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: a ? a.data : void 0
  };
}
function Ua(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e
  };
}
function yN(e, a) {
  try {
    let i = e.sessionStorage.getItem(
      n1
    );
    if (i) {
      let l = JSON.parse(i);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function bN(e, a) {
  if (a.size > 0) {
    let i = {};
    for (let [l, s] of a)
      i[l] = [...s];
    try {
      e.sessionStorage.setItem(
        n1,
        JSON.stringify(i)
      );
    } catch (l) {
      It(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function My() {
  let e, a, i = new Promise((l, s) => {
    e = async (u) => {
      l(u);
      try {
        await i;
      } catch {
      }
    }, a = async (u) => {
      s(u);
      try {
        await i;
      } catch {
      }
    };
  });
  return {
    promise: i,
    //@ts-ignore
    resolve: e,
    //@ts-ignore
    reject: a
  };
}
var Li = S.createContext(null);
Li.displayName = "DataRouter";
var fs = S.createContext(null);
fs.displayName = "DataRouterState";
var d1 = S.createContext(!1);
function h1() {
  return S.useContext(d1);
}
var Rm = S.createContext({
  isTransitioning: !1
});
Rm.displayName = "ViewTransition";
var m1 = S.createContext(
  /* @__PURE__ */ new Map()
);
m1.displayName = "Fetchers";
var xN = S.createContext(null);
xN.displayName = "Await";
var ha = S.createContext(
  null
);
ha.displayName = "Navigation";
var Ac = S.createContext(
  null
);
Ac.displayName = "Location";
var Ma = S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ma.displayName = "Route";
var Tm = S.createContext(null);
Tm.displayName = "RouteError";
var p1 = "REACT_ROUTER_ERROR", wN = "REDIRECT", _N = "ROUTE_ERROR_RESPONSE";
function SN(e) {
  if (e.startsWith(`${p1}:${wN}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function EN(e) {
  if (e.startsWith(
    `${p1}:${_N}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Dc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function NN(e, { relative: a } = {}) {
  Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: l } = S.useContext(ha), { hash: s, pathname: u, search: c } = hs(e, { relative: a }), d = u;
  return i !== "/" && (d = u === "/" ? i : fa([i, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function ds() {
  return S.useContext(Ac) != null;
}
function br() {
  return Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(Ac).location;
}
var g1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function v1(e) {
  S.useContext(ha).static || S.useLayoutEffect(e);
}
function CN() {
  let { isDataRoute: e } = S.useContext(Ma);
  return e ? qN() : RN();
}
function RN() {
  Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = S.useContext(Li), { basename: a, navigator: i } = S.useContext(ha), { matches: l } = S.useContext(Ma), { pathname: s } = br(), u = JSON.stringify(_m(l)), c = S.useRef(!1);
  return v1(() => {
    c.current = !0;
  }), S.useCallback(
    (p, m = {}) => {
      if (It(c.current, g1), !c.current) return;
      if (typeof p == "number") {
        i.go(p);
        return;
      }
      let y = Mc(
        p,
        JSON.parse(u),
        s,
        m.relative === "path"
      );
      e == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : fa([a, y.pathname])), (m.replace ? i.replace : i.push)(
        y,
        m.state,
        m
      );
    },
    [
      a,
      i,
      u,
      s,
      e
    ]
  );
}
var TN = S.createContext(null);
function MN(e) {
  let a = S.useContext(Ma).outlet;
  return S.useMemo(
    () => a && /* @__PURE__ */ S.createElement(TN.Provider, { value: e }, a),
    [a, e]
  );
}
function DN() {
  let { matches: e } = S.useContext(Ma);
  return e[e.length - 1]?.params ?? {};
}
function hs(e, { relative: a } = {}) {
  let { matches: i } = S.useContext(Ma), { pathname: l } = br(), s = JSON.stringify(_m(i));
  return S.useMemo(
    () => Mc(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function AN(e, a, i) {
  Qe(
    ds(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = S.useContext(ha), { matches: s } = S.useContext(Ma), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let C = m && m.path || "";
    x1(
      d,
      !m || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let y = br(), g;
  g = y;
  let b = g.pathname || "/", x = b;
  if (p !== "/") {
    let C = p.replace(/^\//, "").split("/");
    x = "/" + b.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let w = i && i.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    i.state.matches.map(
      (C) => Object.assign(C, {
        route: i.manifest[C.route.id] || C.route
      })
    )
  ) : Fx(e, { pathname: x });
  return It(
    m || w != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), It(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), kN(
    w && w.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, c, C.params),
        pathname: fa([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            C.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? p : fa([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            C.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathnameBase
        ])
      })
    ),
    s,
    i
  );
}
function jN() {
  let e = $N(), a = Zo(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), i = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ S.createElement("pre", { style: s }, i) : null, c);
}
var ON = /* @__PURE__ */ S.createElement(jN, null), y1 = class extends S.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, a) {
    return a.location !== e.location || a.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : a.error,
      location: a.location,
      revalidation: e.revalidation || a.revalidation
    };
  }
  componentDidCatch(e, a) {
    this.props.onError ? this.props.onError(e, a) : console.error(
      "React Router caught the following error during render",
      e
    );
  }
  render() {
    let e = this.state.error;
    if (this.context && typeof e == "object" && e && "digest" in e && typeof e.digest == "string") {
      const i = EN(e.digest);
      i && (e = i);
    }
    let a = e !== void 0 ? /* @__PURE__ */ S.createElement(Ma.Provider, { value: this.props.routeContext }, /* @__PURE__ */ S.createElement(
      Tm.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ S.createElement(zN, { error: e }, a) : a;
  }
};
y1.contextType = d1;
var fh = /* @__PURE__ */ new WeakMap();
function zN({
  children: e,
  error: a
}) {
  let { basename: i } = S.useContext(ha);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = SN(a.digest);
    if (l) {
      let s = fh.get(a);
      if (s) throw s;
      let u = Wx(l.location, i);
      if (Kx && !fh.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw fh.set(a, c), c;
        }
      return /* @__PURE__ */ S.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${u.absoluteURL || u.to}`
        }
      );
    }
  }
  return e;
}
function LN({ routeContext: e, match: a, children: i }) {
  let l = S.useContext(Li);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ S.createElement(Ma.Provider, { value: e }, i);
}
function kN(e, a = [], i) {
  let l = i?.state;
  if (e == null) {
    if (!l)
      return null;
    if (l.errors)
      e = l.matches;
    else if (a.length === 0 && !l.initialized && l.matches.length > 0)
      e = l.matches;
    else
      return null;
  }
  let s = e, u = l?.errors;
  if (u != null) {
    let y = s.findIndex(
      (g) => g.route.id && u?.[g.route.id] !== void 0
    );
    Qe(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, y + 1)
    );
  }
  let c = !1, d = -1;
  if (i && l) {
    c = l.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let g = s[y];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (d = y), g.route.id) {
        let { loaderData: b, errors: x } = l, w = g.route.loader && !b.hasOwnProperty(g.route.id) && (!x || x[g.route.id] === void 0);
        if (g.route.lazy || w) {
          i.isStatic && (c = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = i?.onError, m = l && p ? (y, g) => {
    p(y, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      pattern: cs(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (y, g, b) => {
      let x, w = !1, R = null, C = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, R = g.route.errorElement || ON, c && (d < 0 && b === 0 ? (x1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, C = null) : d === b && (w = !0, C = g.route.hydrateFallbackElement || null)));
      let N = a.concat(s.slice(0, b + 1)), D = () => {
        let E;
        return x ? E = R : w ? E = C : g.route.Component ? E = /* @__PURE__ */ S.createElement(g.route.Component, null) : g.route.element ? E = g.route.element : E = y, /* @__PURE__ */ S.createElement(
          LN,
          {
            match: g,
            routeContext: {
              outlet: y,
              matches: N,
              isDataRoute: l != null
            },
            children: E
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || b === 0) ? /* @__PURE__ */ S.createElement(
        y1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: R,
          error: x,
          children: D(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: m
        }
      ) : D();
    },
    null
  );
}
function Mm(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function HN(e) {
  let a = S.useContext(Li);
  return Qe(a, Mm(e)), a;
}
function b1(e) {
  let a = S.useContext(fs);
  return Qe(a, Mm(e)), a;
}
function BN(e) {
  let a = S.useContext(Ma);
  return Qe(a, Mm(e)), a;
}
function jc(e) {
  let a = BN(e), i = a.matches[a.matches.length - 1];
  return Qe(
    i.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function UN() {
  return jc(
    "useRouteId"
    /* UseRouteId */
  );
}
function VN() {
  let e = b1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = jc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function $N() {
  let e = S.useContext(Tm), a = b1(
    "useRouteError"
    /* UseRouteError */
  ), i = jc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[i];
}
function qN() {
  let { router: e } = HN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = jc(
    "useNavigate"
    /* UseNavigateStable */
  ), i = S.useRef(!1);
  return v1(() => {
    i.current = !0;
  }), S.useCallback(
    async (s, u = {}) => {
      It(i.current, g1), i.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var Dy = {};
function x1(e, a, i) {
  !a && !Dy[e] && (Dy[e] = !0, It(!1, i));
}
var Ay = {};
function jy(e, a) {
  !e && !Ay[a] && (Ay[a] = !0, console.warn(a));
}
var IN = "useOptimistic", Oy = a2[IN], YN = () => {
};
function GN(e) {
  return Oy ? Oy(e) : [e, YN];
}
function FN(e) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null
  };
  return e.Component && (e.element && It(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: S.createElement(e.Component),
    Component: void 0
  })), e.HydrateFallback && (e.hydrateFallbackElement && It(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: S.createElement(e.HydrateFallback),
    HydrateFallback: void 0
  })), e.ErrorBoundary && (e.errorElement && It(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: S.createElement(e.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var XN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function PN(e, a) {
  return Z2({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: c2({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: XN,
    mapRouteProperties: FN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var ZN = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((e, a) => {
      this.resolve = (i) => {
        this.status === "pending" && (this.status = "resolved", e(i));
      }, this.reject = (i) => {
        this.status === "pending" && (this.status = "rejected", a(i));
      };
    });
  }
};
function QN({
  router: e,
  flushSync: a,
  onError: i,
  useTransitions: l
}) {
  l = h1() || l;
  let [u, c] = S.useState(e.state), [d, p] = GN(u), [m, y] = S.useState(), [g, b] = S.useState({
    isTransitioning: !1
  }), [x, w] = S.useState(), [R, C] = S.useState(), [N, D] = S.useState(), E = S.useRef(/* @__PURE__ */ new Map()), O = S.useCallback(
    (A, { deletedFetchers: I, newErrors: Q, flushSync: $, viewTransitionOpts: K }) => {
      Q && i && Object.values(Q).forEach(
        (L) => i(L, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: cs(A.matches)
        })
      ), A.fetchers.forEach((L, Y) => {
        L.data !== void 0 && E.current.set(Y, L.data);
      }), I.forEach((L) => E.current.delete(L)), jy(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ne = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (jy(
        K == null || ne,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !ne) {
        a && $ ? a(() => c(A)) : l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p((L) => zy(L, A)), c(A);
        });
        return;
      }
      if (a && $) {
        a(() => {
          R && (x?.resolve(), R.skipTransition()), b({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let L = e.window.document.startViewTransition(() => {
          a(() => c(A));
        });
        L.finished.finally(() => {
          a(() => {
            w(void 0), C(void 0), y(void 0), b({ isTransitioning: !1 });
          });
        }), a(() => C(L));
        return;
      }
      R ? (x?.resolve(), R.skipTransition(), D({
        state: A,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (y(A), b({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      }));
    },
    [
      e.window,
      a,
      R,
      x,
      l,
      p,
      i
    ]
  );
  S.useLayoutEffect(() => e.subscribe(O), [e, O]), S.useEffect(() => {
    g.isTransitioning && !g.flushSync && w(new ZN());
  }, [g]), S.useEffect(() => {
    if (x && m && e.window) {
      let A = m, I = x.promise, Q = e.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p(($) => zy($, A)), c(A);
        }), await I;
      });
      Q.finished.finally(() => {
        w(void 0), C(void 0), y(void 0), b({ isTransitioning: !1 });
      }), C(Q);
    }
  }, [
    m,
    x,
    e.window,
    l,
    p
  ]), S.useEffect(() => {
    x && m && d.location.key === m.location.key && x.resolve();
  }, [x, R, d.location, m]), S.useEffect(() => {
    !g.isTransitioning && N && (y(N.state), b({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: N.currentLocation,
      nextLocation: N.nextLocation
    }), D(void 0));
  }, [g.isTransitioning, N]);
  let H = S.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (A) => e.navigate(A),
    push: (A, I, Q) => e.navigate(A, {
      state: I,
      preventScrollReset: Q?.preventScrollReset
    }),
    replace: (A, I, Q) => e.navigate(A, {
      replace: !0,
      state: I,
      preventScrollReset: Q?.preventScrollReset
    })
  }), [e]), B = e.basename || "/", U = S.useMemo(
    () => ({
      router: e,
      navigator: H,
      static: !1,
      basename: B,
      onError: i
    }),
    [e, H, B, i]
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Li.Provider, { value: U }, /* @__PURE__ */ S.createElement(fs.Provider, { value: d }, /* @__PURE__ */ S.createElement(m1.Provider, { value: E.current }, /* @__PURE__ */ S.createElement(Rm.Provider, { value: g }, /* @__PURE__ */ S.createElement(
    eC,
    {
      basename: B,
      location: d.location,
      navigationType: d.historyAction,
      navigator: H,
      useTransitions: l
    },
    /* @__PURE__ */ S.createElement(
      KN,
      {
        routes: e.routes,
        manifest: e.manifest,
        future: e.future,
        state: d,
        isStatic: !1,
        onError: i
      }
    )
  ))))), null);
}
function zy(e, a) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...e,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: a.navigation.state !== "idle" ? a.navigation : e.navigation,
    revalidation: a.revalidation !== "idle" ? a.revalidation : e.revalidation,
    actionData: a.navigation.state !== "submitting" ? a.actionData : e.actionData,
    fetchers: a.fetchers
  };
}
var KN = S.memo(WN);
function WN({
  routes: e,
  manifest: a,
  future: i,
  state: l,
  isStatic: s,
  onError: u
}) {
  return AN(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function JN(e) {
  return MN(e.context);
}
function eC({
  basename: e = "/",
  children: a = null,
  location: i,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Qe(
    !ds(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), p = S.useMemo(
    () => ({
      basename: d,
      navigator: s,
      static: u,
      useTransitions: c,
      future: {}
    }),
    [d, s, u, c]
  );
  typeof i == "string" && (i = Ta(i));
  let {
    pathname: m = "/",
    search: y = "",
    hash: g = "",
    state: b = null,
    key: x = "default",
    mask: w
  } = i, R = S.useMemo(() => {
    let C = da(m, d);
    return C == null ? null : {
      location: {
        pathname: C,
        search: y,
        hash: g,
        state: b,
        key: x,
        mask: w
      },
      navigationType: l
    };
  }, [d, m, y, g, b, x, l, w]);
  return It(
    R != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), R == null ? null : /* @__PURE__ */ S.createElement(ha.Provider, { value: p }, /* @__PURE__ */ S.createElement(Ac.Provider, { children: a, value: R }));
}
var rc = "get", ic = "application/x-www-form-urlencoded";
function Oc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function tC(e) {
  return Oc(e) && e.tagName.toLowerCase() === "button";
}
function nC(e) {
  return Oc(e) && e.tagName.toLowerCase() === "form";
}
function aC(e) {
  return Oc(e) && e.tagName.toLowerCase() === "input";
}
function rC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function iC(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !rC(e);
}
var ju = null;
function lC() {
  if (ju === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ju = !1;
    } catch {
      ju = !0;
    }
  return ju;
}
var oC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function dh(e) {
  return e != null && !oC.has(e) ? (It(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ic}"`
  ), null) : e;
}
function sC(e, a) {
  let i, l, s, u, c;
  if (nC(e)) {
    let d = e.getAttribute("action");
    l = d ? da(d, a) : null, i = e.getAttribute("method") || rc, s = dh(e.getAttribute("enctype")) || ic, u = new FormData(e);
  } else if (tC(e) || aC(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? da(p, a) : null, i = e.getAttribute("formmethod") || d.getAttribute("method") || rc, s = dh(e.getAttribute("formenctype")) || dh(d.getAttribute("enctype")) || ic, u = new FormData(d, e), !lC()) {
      let { name: m, type: y, value: g } = e;
      if (y === "image") {
        let b = m ? `${m}.` : "";
        u.append(`${b}x`, "0"), u.append(`${b}y`, "0");
      } else m && u.append(m, g);
    }
  } else {
    if (Oc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = rc, l = null, s = ic, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: i.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Dm(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function w1(e, a, i, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return i ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && da(s.pathname, a) === "/" ? s.pathname = `${mc(a)}/_root.${l}` : s.pathname = `${mc(s.pathname)}.${l}`, s;
}
async function uC(e, a) {
  if (e.id in a)
    return a[e.id];
  try {
    let i = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return a[e.id] = i, i;
  } catch (i) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(i), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function cC(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function fC(e, a, i) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await uC(u, i);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return pC(
    l.flat(1).filter(cC).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function Ly(e, a, i, l, s, u) {
  let c = (p, m) => i[m] ? p.route.id !== i[m].route.id : !0, d = (p, m) => (
    // param change, /users/123 -> /users/456
    i[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[m].route.path?.endsWith("*") && i[m].params["*"] !== p.params["*"]
  );
  return u === "assets" ? a.filter(
    (p, m) => c(p, m) || d(p, m)
  ) : u === "data" ? a.filter((p, m) => {
    let y = l.routes[p.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (c(p, m) || d(p, m))
      return !0;
    if (p.route.shouldRevalidate) {
      let g = p.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: i[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function dC(e, a, { includeHydrateFallback: i } = {}) {
  return hC(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), i && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function hC(e) {
  return [...new Set(e)];
}
function mC(e) {
  let a = {}, i = Object.keys(e).sort();
  for (let l of i)
    a[l] = e[l];
  return a;
}
function pC(e, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(mC(s));
    return i.has(u) || (i.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function Am() {
  let e = S.useContext(Li);
  return Dm(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function gC() {
  let e = S.useContext(fs);
  return Dm(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var jm = S.createContext(void 0);
jm.displayName = "FrameworkContext";
function Om() {
  let e = S.useContext(jm);
  return Dm(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function vC(e, a) {
  let i = S.useContext(jm), [l, s] = S.useState(!1), [u, c] = S.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: g } = a, b = S.useRef(null);
  S.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let R = (N) => {
        N.forEach((D) => {
          c(D.isIntersecting);
        });
      }, C = new IntersectionObserver(R, { threshold: 0.5 });
      return b.current && C.observe(b.current), () => {
        C.disconnect();
      };
    }
  }, [e]), S.useEffect(() => {
    if (l) {
      let R = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(R);
      };
    }
  }, [l]);
  let x = () => {
    s(!0);
  }, w = () => {
    s(!1), c(!1);
  };
  return i ? e !== "intent" ? [u, b, {}] : [
    u,
    b,
    {
      onFocus: zo(d, x),
      onBlur: zo(p, w),
      onMouseEnter: zo(m, x),
      onMouseLeave: zo(y, w),
      onTouchStart: zo(g, x)
    }
  ] : [!1, b, {}];
}
function zo(e, a) {
  return (i) => {
    e && e(i), i.defaultPrevented || a(i);
  };
}
function yC({ page: e, ...a }) {
  let i = h1(), { router: l } = Am(), s = S.useMemo(
    () => Fx(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? i ? /* @__PURE__ */ S.createElement(xC, { page: e, matches: s, ...a }) : /* @__PURE__ */ S.createElement(wC, { page: e, matches: s, ...a }) : null;
}
function bC(e) {
  let { manifest: a, routeModules: i } = Om(), [l, s] = S.useState([]);
  return S.useEffect(() => {
    let u = !1;
    return fC(e, a, i).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, i]), l;
}
function xC({
  page: e,
  matches: a,
  ...i
}) {
  let l = br(), { future: s } = Om(), { basename: u } = Am(), c = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = w1(
      e,
      u,
      s.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, m = [];
    for (let y of a)
      typeof y.route.shouldRevalidate == "function" ? p = !0 : m.push(y.route.id);
    return p && m.length > 0 && d.searchParams.set("_routes", m.join(",")), [d.pathname + d.search];
  }, [
    u,
    s.v8_trailingSlashAwareDataRequests,
    e,
    l,
    a
  ]);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, c.map((d) => /* @__PURE__ */ S.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...i })));
}
function wC({
  page: e,
  matches: a,
  ...i
}) {
  let l = br(), { future: s, manifest: u, routeModules: c } = Om(), { basename: d } = Am(), { loaderData: p, matches: m } = gC(), y = S.useMemo(
    () => Ly(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = S.useMemo(
    () => Ly(
      e,
      a,
      m,
      u,
      l,
      "assets"
    ),
    [e, a, m, u, l]
  ), b = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let R = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((D) => {
      let E = u.routes[D.route.id];
      !E || !E.hasLoader || (!y.some((O) => O.route.id === D.route.id) && D.route.id in p && c[D.route.id]?.shouldRevalidate || E.hasClientLoader ? C = !0 : R.add(D.route.id));
    }), R.size === 0)
      return [];
    let N = w1(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return C && R.size > 0 && N.searchParams.set(
      "_routes",
      a.filter((D) => R.has(D.route.id)).map((D) => D.route.id).join(",")
    ), [N.pathname + N.search];
  }, [
    d,
    s.v8_trailingSlashAwareDataRequests,
    p,
    l,
    u,
    y,
    a,
    e,
    c
  ]), x = S.useMemo(
    () => dC(g, u),
    [g, u]
  ), w = bC(g);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, b.map((R) => /* @__PURE__ */ S.createElement("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...i })), x.map((R) => /* @__PURE__ */ S.createElement("link", { key: R, rel: "modulepreload", href: R, ...i })), w.map(({ key: R, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ S.createElement(
      "link",
      {
        key: R,
        nonce: i.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function _C(...e) {
  return (a) => {
    e.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var SC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  SC && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var _1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, S1 = S.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: l = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: d,
    state: p,
    target: m,
    to: y,
    preventScrollReset: g,
    viewTransition: b,
    defaultShouldRevalidate: x,
    ...w
  }, R) {
    let { basename: C, navigator: N, useTransitions: D } = S.useContext(ha), E = typeof y == "string" && _1.test(y), O = Wx(y, C);
    y = O.to;
    let H = NN(y, { relative: s }), B = br(), U = null;
    if (d) {
      let Y = Mc(
        d,
        [],
        B.mask ? B.mask.pathname : "/",
        !0
      );
      C !== "/" && (Y.pathname = Y.pathname === "/" ? C : fa([C, Y.pathname])), U = N.createHref(Y);
    }
    let [A, I, Q] = vC(
      l,
      w
    ), $ = RC(y, {
      replace: c,
      mask: d,
      state: p,
      target: m,
      preventScrollReset: g,
      relative: s,
      viewTransition: b,
      defaultShouldRevalidate: x,
      useTransitions: D
    });
    function K(Y) {
      a && a(Y), Y.defaultPrevented || $(Y);
    }
    let ne = !(O.isExternal || u), L = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ S.createElement(
        "a",
        {
          ...w,
          ...Q,
          href: (ne ? U : void 0) || O.absoluteURL || H,
          onClick: ne ? K : a,
          ref: _C(R, I),
          target: m,
          "data-discover": !E && i === "render" ? "true" : void 0
        }
      )
    );
    return A && !E ? /* @__PURE__ */ S.createElement(S.Fragment, null, L, /* @__PURE__ */ S.createElement(yC, { page: H })) : L;
  }
);
S1.displayName = "Link";
var EC = S.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: l = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: d,
    children: p,
    ...m
  }, y) {
    let g = hs(c, { relative: m.relative }), b = br(), x = S.useContext(fs), { navigator: w, basename: R } = S.useContext(ha), C = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    jC(g) && d === !0, N = w.encodeLocation ? w.encodeLocation(g).pathname : g.pathname, D = b.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    i || (D = D.toLowerCase(), E = E ? E.toLowerCase() : null, N = N.toLowerCase()), E && R && (E = da(E, R) || E);
    const O = N !== "/" && N.endsWith("/") ? N.length - 1 : N.length;
    let H = D === N || !s && D.startsWith(N) && D.charAt(O) === "/", B = E != null && (E === N || !s && E.startsWith(N) && E.charAt(N.length) === "/"), U = {
      isActive: H,
      isPending: B,
      isTransitioning: C
    }, A = H ? a : void 0, I;
    typeof l == "function" ? I = l(U) : I = [
      l,
      H ? "active" : null,
      B ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let Q = typeof u == "function" ? u(U) : u;
    return /* @__PURE__ */ S.createElement(
      S1,
      {
        ...m,
        "aria-current": A,
        className: I,
        ref: y,
        style: Q,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(U) : p
    );
  }
);
EC.displayName = "NavLink";
var NC = S.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = rc,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: g,
    defaultShouldRevalidate: b,
    ...x
  }, w) => {
    let { useTransitions: R } = S.useContext(ha), C = DC(), N = AC(d, { relative: m }), D = c.toLowerCase() === "get" ? "get" : "post", E = typeof d == "string" && _1.test(d), O = (H) => {
      if (p && p(H), H.defaultPrevented) return;
      H.preventDefault();
      let B = H.nativeEvent.submitter, U = B?.getAttribute("formmethod") || c, A = () => C(B || H.currentTarget, {
        fetcherKey: a,
        method: U,
        navigate: i,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: y,
        viewTransition: g,
        defaultShouldRevalidate: b
      });
      R && i !== !1 ? S.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ S.createElement(
      "form",
      {
        ref: w,
        method: D,
        action: N,
        onSubmit: l ? p : O,
        ...x,
        "data-discover": !E && e === "render" ? "true" : void 0
      }
    );
  }
);
NC.displayName = "Form";
function CC(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function E1(e) {
  let a = S.useContext(Li);
  return Qe(a, CC(e)), a;
}
function RC(e, {
  target: a,
  replace: i,
  mask: l,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: d,
  defaultShouldRevalidate: p,
  useTransitions: m
} = {}) {
  let y = CN(), g = br(), b = hs(e, { relative: c });
  return S.useCallback(
    (x) => {
      if (iC(x, a)) {
        x.preventDefault();
        let w = i !== void 0 ? i : Ga(g) === Ga(b), R = () => y(e, {
          replace: w,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? S.startTransition(() => R()) : R();
      }
    },
    [
      g,
      y,
      b,
      i,
      l,
      s,
      a,
      e,
      u,
      c,
      d,
      p,
      m
    ]
  );
}
var TC = 0, MC = () => `__${String(++TC)}__`;
function DC() {
  let { router: e } = E1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = S.useContext(ha), i = UN(), l = e.fetch, s = e.navigate;
  return S.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: y, body: g } = sC(
        u,
        a
      );
      if (c.navigate === !1) {
        let b = c.fetcherKey || MC();
        await l(b, i, c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: g,
          formMethod: c.method || p,
          formEncType: c.encType || m,
          flushSync: c.flushSync
        });
      } else
        await s(c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: g,
          formMethod: c.method || p,
          formEncType: c.encType || m,
          replace: c.replace,
          state: c.state,
          fromRouteId: i,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition
        });
    },
    [l, s, a, i]
  );
}
function AC(e, { relative: a } = {}) {
  let { basename: i } = S.useContext(ha), l = S.useContext(Ma);
  Qe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...hs(e || ".", { relative: a }) }, c = br();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search), p = d.getAll("index");
    if (p.some((y) => y === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let y = d.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : fa([i, u.pathname])), Ga(u);
}
function jC(e, { relative: a } = {}) {
  let i = S.useContext(Rm);
  Qe(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = E1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = hs(e, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = da(i.currentLocation.pathname, l) || i.currentLocation.pathname, c = da(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return hc(s.pathname, c) != null || hc(s.pathname, u) != null;
}
const zm = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "flash3_fp4", label: "FlashAttention 3 FP4" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], OC = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], zC = [
  { value: "high", label: "High-noise SVI LoRA" },
  { value: "low", label: "Low-noise SVI LoRA" },
  { value: "off", label: "No SVI LoRA" }
], LC = [
  { value: "default", label: "Default (inductor)" },
  { value: "reduce-overhead", label: "Reduce-overhead (CUDA graphs)" },
  { value: "max-autotune", label: "Max-autotune (slow first build)" }
], Lm = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  fastParallel: !0,
  batchPromptEncode: !1,
  outputDir: "",
  baseModelFamilyId: "",
  ditHighPath: "",
  ditLowPath: "",
  sviLoraTier: "high"
};
class zc extends Error {
  constructor(a, i, l, s) {
    super(l), this.status = a, this.category = i, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const Lc = "/api/v1/extensions/nexus.video.svi2-pro";
async function xr(e, a) {
  const i = e.startsWith("http") ? e : `${Lc}${e}`, l = await fetch(i, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!l.ok) {
    let s = null;
    try {
      s = await l.json();
    } catch {
      s = null;
    }
    throw new zc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function kC(e, a, i) {
  const l = e.startsWith("http") ? e : `${Lc}${e}`, s = new EventSource(l);
  return s.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, s.onerror = (u) => {
    i?.(u);
  }, () => s.close();
}
async function N1() {
  return xr("/presets");
}
async function HC() {
  const e = await xr("/settings");
  return { ...Lm, ...e };
}
async function C1(e) {
  return xr("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var BC = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function Fn({ tone: e = "neutral", children: a, className: i }) {
  const l = [BC[e], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("span", { className: l, children: a });
}
var UC = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, VC = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, $C = "_1h48t1v9";
function ua({
  variant: e = "primary",
  size: a = "md",
  type: i = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...d
}) {
  const p = [UC[e], VC[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs(
    "button",
    {
      type: i,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ v.jsx("span", { className: $C, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Zt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let a = "";
  if (Array.isArray(e))
    for (let i = 0, l; i < e.length; i++)
      (l = Zt(e[i])) !== "" && (a += (a && " ") + l);
  else
    for (let i in e)
      e[i] && (a += (a && " ") + i);
  return a;
}
var qC = { value: () => {
} };
function kc() {
  for (var e = 0, a = arguments.length, i = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in i || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    i[l] = [];
  }
  return new lc(i);
}
function lc(e) {
  this._ = e;
}
function IC(e, a) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var l = "", s = i.indexOf(".");
    if (s >= 0 && (l = i.slice(s + 1), i = i.slice(0, s)), i && !a.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: l };
  });
}
lc.prototype = kc.prototype = {
  constructor: lc,
  on: function(e, a) {
    var i = this._, l = IC(e + "", i), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = YC(i[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) i[s] = ky(i[s], e.name, a);
      else if (a == null) for (s in i) i[s] = ky(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var i in a) e[i] = a[i].slice();
    return new lc(e);
  },
  call: function(e, a) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), l = 0, s, u; l < s; ++l) i[l] = arguments[l + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (u = this._[e], l = 0, s = u.length; l < s; ++l) u[l].value.apply(a, i);
  },
  apply: function(e, a, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var l = this._[e], s = 0, u = l.length; s < u; ++s) l[s].value.apply(a, i);
  }
};
function YC(e, a) {
  for (var i = 0, l = e.length, s; i < l; ++i)
    if ((s = e[i]).name === a)
      return s.value;
}
function ky(e, a, i) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = qC, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return i != null && e.push({ name: a, value: i }), e;
}
var Gh = "http://www.w3.org/1999/xhtml";
const Hy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Gh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Hc(e) {
  var a = e += "", i = a.indexOf(":");
  return i >= 0 && (a = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Hy.hasOwnProperty(a) ? { space: Hy[a], local: e } : e;
}
function GC(e) {
  return function() {
    var a = this.ownerDocument, i = this.namespaceURI;
    return i === Gh && a.documentElement.namespaceURI === Gh ? a.createElement(e) : a.createElementNS(i, e);
  };
}
function FC(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function R1(e) {
  var a = Hc(e);
  return (a.local ? FC : GC)(a);
}
function XC() {
}
function km(e) {
  return e == null ? XC : function() {
    return this.querySelector(e);
  };
}
function PC(e) {
  typeof e != "function" && (e = km(e));
  for (var a = this._groups, i = a.length, l = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, y = 0; y < c; ++y)
      (p = u[y]) && (m = e.call(p, p.__data__, y, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[y] = m);
  return new Pn(l, this._parents);
}
function ZC(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function QC() {
  return [];
}
function T1(e) {
  return e == null ? QC : function() {
    return this.querySelectorAll(e);
  };
}
function KC(e) {
  return function() {
    return ZC(e.apply(this, arguments));
  };
}
function WC(e) {
  typeof e == "function" ? e = KC(e) : e = T1(e);
  for (var a = this._groups, i = a.length, l = [], s = [], u = 0; u < i; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new Pn(l, s);
}
function M1(e) {
  return function() {
    return this.matches(e);
  };
}
function D1(e) {
  return function(a) {
    return a.matches(e);
  };
}
var JC = Array.prototype.find;
function eR(e) {
  return function() {
    return JC.call(this.children, e);
  };
}
function tR() {
  return this.firstElementChild;
}
function nR(e) {
  return this.select(e == null ? tR : eR(typeof e == "function" ? e : D1(e)));
}
var aR = Array.prototype.filter;
function rR() {
  return Array.from(this.children);
}
function iR(e) {
  return function() {
    return aR.call(this.children, e);
  };
}
function lR(e) {
  return this.selectAll(e == null ? rR : iR(typeof e == "function" ? e : D1(e)));
}
function oR(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, i = a.length, l = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Pn(l, this._parents);
}
function A1(e) {
  return new Array(e.length);
}
function sR() {
  return new Pn(this._enter || this._groups.map(A1), this._parents);
}
function pc(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
pc.prototype = {
  constructor: pc,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, a) {
    return this._parent.insertBefore(e, a);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function uR(e) {
  return function() {
    return e;
  };
}
function cR(e, a, i, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : i[c] = new pc(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function fR(e, a, i, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), y = a.length, g = u.length, b = new Array(y), x;
  for (d = 0; d < y; ++d)
    (p = a[d]) && (b[d] = x = c.call(p, p.__data__, d, a) + "", m.has(x) ? s[d] = p : m.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = m.get(x)) ? (l[d] = p, p.__data__ = u[d], m.delete(x)) : i[d] = new pc(e, u[d]);
  for (d = 0; d < y; ++d)
    (p = a[d]) && m.get(b[d]) === p && (s[d] = p);
}
function dR(e) {
  return e.__data__;
}
function hR(e, a) {
  if (!arguments.length) return Array.from(this, dR);
  var i = a ? fR : cR, l = this._parents, s = this._groups;
  typeof e != "function" && (e = uR(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], g = s[m], b = g.length, x = mR(e.call(y, y && y.__data__, m, l)), w = x.length, R = d[m] = new Array(w), C = c[m] = new Array(w), N = p[m] = new Array(b);
    i(y, g, R, C, N, x, a);
    for (var D = 0, E = 0, O, H; D < w; ++D)
      if (O = R[D]) {
        for (D >= E && (E = D + 1); !(H = C[E]) && ++E < w; ) ;
        O._next = H || null;
      }
  }
  return c = new Pn(c, l), c._enter = d, c._exit = p, c;
}
function mR(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function pR() {
  return new Pn(this._exit || this._groups.map(A1), this._parents);
}
function gR(e, a, i) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), i == null ? u.remove() : i(u), l && s ? l.merge(s).order() : s;
}
function vR(e) {
  for (var a = e.selection ? e.selection() : e, i = this._groups, l = a._groups, s = i.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = i[p], y = l[p], g = m.length, b = d[p] = new Array(g), x, w = 0; w < g; ++w)
      (x = m[w] || y[w]) && (b[w] = x);
  for (; p < s; ++p)
    d[p] = i[p];
  return new Pn(d, this._parents);
}
function yR() {
  for (var e = this._groups, a = -1, i = e.length; ++a < i; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function bR(e) {
  e || (e = xR);
  function a(g, b) {
    return g && b ? e(g.__data__, b.__data__) : !g - !b;
  }
  for (var i = this._groups, l = i.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = i[u], d = c.length, p = s[u] = new Array(d), m, y = 0; y < d; ++y)
      (m = c[y]) && (p[y] = m);
    p.sort(a);
  }
  return new Pn(s, this._parents).order();
}
function xR(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function wR() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function _R() {
  return Array.from(this);
}
function SR() {
  for (var e = this._groups, a = 0, i = e.length; a < i; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function ER() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function NR() {
  return !this.node();
}
function CR(e) {
  for (var a = this._groups, i = 0, l = a.length; i < l; ++i)
    for (var s = a[i], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function RR(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function TR(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function MR(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function DR(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function AR(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function jR(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function OR(e, a) {
  var i = Hc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return i.local ? l.getAttributeNS(i.space, i.local) : l.getAttribute(i);
  }
  return this.each((a == null ? i.local ? TR : RR : typeof a == "function" ? i.local ? jR : AR : i.local ? DR : MR)(i, a));
}
function j1(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function zR(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function LR(e, a, i) {
  return function() {
    this.style.setProperty(e, a, i);
  };
}
function kR(e, a, i) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, i);
  };
}
function HR(e, a, i) {
  return arguments.length > 1 ? this.each((a == null ? zR : typeof a == "function" ? kR : LR)(e, a, i ?? "")) : Tl(this.node(), e);
}
function Tl(e, a) {
  return e.style.getPropertyValue(a) || j1(e).getComputedStyle(e, null).getPropertyValue(a);
}
function BR(e) {
  return function() {
    delete this[e];
  };
}
function UR(e, a) {
  return function() {
    this[e] = a;
  };
}
function VR(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function $R(e, a) {
  return arguments.length > 1 ? this.each((a == null ? BR : typeof a == "function" ? VR : UR)(e, a)) : this.node()[e];
}
function O1(e) {
  return e.trim().split(/^|\s+/);
}
function Hm(e) {
  return e.classList || new z1(e);
}
function z1(e) {
  this._node = e, this._names = O1(e.getAttribute("class") || "");
}
z1.prototype = {
  add: function(e) {
    var a = this._names.indexOf(e);
    a < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var a = this._names.indexOf(e);
    a >= 0 && (this._names.splice(a, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function L1(e, a) {
  for (var i = Hm(e), l = -1, s = a.length; ++l < s; ) i.add(a[l]);
}
function k1(e, a) {
  for (var i = Hm(e), l = -1, s = a.length; ++l < s; ) i.remove(a[l]);
}
function qR(e) {
  return function() {
    L1(this, e);
  };
}
function IR(e) {
  return function() {
    k1(this, e);
  };
}
function YR(e, a) {
  return function() {
    (a.apply(this, arguments) ? L1 : k1)(this, e);
  };
}
function GR(e, a) {
  var i = O1(e + "");
  if (arguments.length < 2) {
    for (var l = Hm(this.node()), s = -1, u = i.length; ++s < u; ) if (!l.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? YR : a ? qR : IR)(i, a));
}
function FR() {
  this.textContent = "";
}
function XR(e) {
  return function() {
    this.textContent = e;
  };
}
function PR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function ZR(e) {
  return arguments.length ? this.each(e == null ? FR : (typeof e == "function" ? PR : XR)(e)) : this.node().textContent;
}
function QR() {
  this.innerHTML = "";
}
function KR(e) {
  return function() {
    this.innerHTML = e;
  };
}
function WR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function JR(e) {
  return arguments.length ? this.each(e == null ? QR : (typeof e == "function" ? WR : KR)(e)) : this.node().innerHTML;
}
function eT() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function tT() {
  return this.each(eT);
}
function nT() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function aT() {
  return this.each(nT);
}
function rT(e) {
  var a = typeof e == "function" ? e : R1(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function iT() {
  return null;
}
function lT(e, a) {
  var i = typeof e == "function" ? e : R1(e), l = a == null ? iT : typeof a == "function" ? a : km(a);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function oT() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function sT() {
  return this.each(oT);
}
function uT() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function cT() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function fT(e) {
  return this.select(e ? cT : uT);
}
function dT(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function hT(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function mT(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var i = "", l = a.indexOf(".");
    return l >= 0 && (i = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: i };
  });
}
function pT(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var i = 0, l = -1, s = a.length, u; i < s; ++i)
        u = a[i], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function gT(e, a, i) {
  return function() {
    var l = this.__on, s, u = hT(a);
    if (l) {
      for (var c = 0, d = l.length; c < d; ++c)
        if ((s = l[c]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = i), s.value = a;
          return;
        }
    }
    this.addEventListener(e.type, u, i), s = { type: e.type, name: e.name, value: a, listener: u, options: i }, l ? l.push(s) : this.__on = [s];
  };
}
function vT(e, a, i) {
  var l = mT(e + ""), s, u = l.length, c;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var p = 0, m = d.length, y; p < m; ++p)
        for (s = 0, y = d[p]; s < u; ++s)
          if ((c = l[s]).type === y.type && c.name === y.name)
            return y.value;
    }
    return;
  }
  for (d = a ? gT : pT, s = 0; s < u; ++s) this.each(d(l[s], a, i));
  return this;
}
function H1(e, a, i) {
  var l = j1(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, i) : (s = l.document.createEvent("Event"), i ? (s.initEvent(a, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function yT(e, a) {
  return function() {
    return H1(this, e, a);
  };
}
function bT(e, a) {
  return function() {
    return H1(this, e, a.apply(this, arguments));
  };
}
function xT(e, a) {
  return this.each((typeof a == "function" ? bT : yT)(e, a));
}
function* wT() {
  for (var e = this._groups, a = 0, i = e.length; a < i; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var B1 = [null];
function Pn(e, a) {
  this._groups = e, this._parents = a;
}
function ms() {
  return new Pn([[document.documentElement]], B1);
}
function _T() {
  return this;
}
Pn.prototype = ms.prototype = {
  constructor: Pn,
  select: PC,
  selectAll: WC,
  selectChild: nR,
  selectChildren: lR,
  filter: oR,
  data: hR,
  enter: sR,
  exit: pR,
  join: gR,
  merge: vR,
  selection: _T,
  order: yR,
  sort: bR,
  call: wR,
  nodes: _R,
  node: SR,
  size: ER,
  empty: NR,
  each: CR,
  attr: OR,
  style: HR,
  property: $R,
  classed: GR,
  text: ZR,
  html: JR,
  raise: tT,
  lower: aT,
  append: rT,
  insert: lT,
  remove: sT,
  clone: fT,
  datum: dT,
  on: vT,
  dispatch: xT,
  [Symbol.iterator]: wT
};
function Xn(e) {
  return typeof e == "string" ? new Pn([[document.querySelector(e)]], [document.documentElement]) : new Pn([[e]], B1);
}
function ST(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function Sa(e, a) {
  if (e = ST(e), a === void 0 && (a = e.currentTarget), a) {
    var i = a.ownerSVGElement || a;
    if (i.createSVGPoint) {
      var l = i.createSVGPoint();
      return l.x = e.clientX, l.y = e.clientY, l = l.matrixTransform(a.getScreenCTM().inverse()), [l.x, l.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [e.clientX - s.left - a.clientLeft, e.clientY - s.top - a.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const ET = { passive: !1 }, Qo = { capture: !0, passive: !1 };
function hh(e) {
  e.stopImmediatePropagation();
}
function Nl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function U1(e) {
  var a = e.document.documentElement, i = Xn(e).on("dragstart.drag", Nl, Qo);
  "onselectstart" in a ? i.on("selectstart.drag", Nl, Qo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function V1(e, a) {
  var i = e.document.documentElement, l = Xn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", Nl, Qo), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in i ? l.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
const Ou = (e) => () => e;
function Fh(e, {
  sourceEvent: a,
  subject: i,
  target: l,
  identifier: s,
  active: u,
  x: c,
  y: d,
  dx: p,
  dy: m,
  dispatch: y
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    subject: { value: i, enumerable: !0, configurable: !0 },
    target: { value: l, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: d, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: m, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
Fh.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function NT(e) {
  return !e.ctrlKey && !e.button;
}
function CT() {
  return this.parentNode;
}
function RT(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function TT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function $1() {
  var e = NT, a = CT, i = RT, l = TT, s = {}, u = kc("start", "drag", "end"), c = 0, d, p, m, y, g = 0;
  function b(O) {
    O.on("mousedown.drag", x).filter(l).on("touchstart.drag", C).on("touchmove.drag", N, ET).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(O, H) {
    if (!(y || !e.call(this, O, H))) {
      var B = E(this, a.call(this, O, H), O, H, "mouse");
      B && (Xn(O.view).on("mousemove.drag", w, Qo).on("mouseup.drag", R, Qo), U1(O.view), hh(O), m = !1, d = O.clientX, p = O.clientY, B("start", O));
    }
  }
  function w(O) {
    if (Nl(O), !m) {
      var H = O.clientX - d, B = O.clientY - p;
      m = H * H + B * B > g;
    }
    s.mouse("drag", O);
  }
  function R(O) {
    Xn(O.view).on("mousemove.drag mouseup.drag", null), V1(O.view, m), Nl(O), s.mouse("end", O);
  }
  function C(O, H) {
    if (e.call(this, O, H)) {
      var B = O.changedTouches, U = a.call(this, O, H), A = B.length, I, Q;
      for (I = 0; I < A; ++I)
        (Q = E(this, U, O, H, B[I].identifier, B[I])) && (hh(O), Q("start", O, B[I]));
    }
  }
  function N(O) {
    var H = O.changedTouches, B = H.length, U, A;
    for (U = 0; U < B; ++U)
      (A = s[H[U].identifier]) && (Nl(O), A("drag", O, H[U]));
  }
  function D(O) {
    var H = O.changedTouches, B = H.length, U, A;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), U = 0; U < B; ++U)
      (A = s[H[U].identifier]) && (hh(O), A("end", O, H[U]));
  }
  function E(O, H, B, U, A, I) {
    var Q = u.copy(), $ = Sa(I || B, H), K, ne, L;
    if ((L = i.call(O, new Fh("beforestart", {
      sourceEvent: B,
      target: b,
      identifier: A,
      active: c,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: Q
    }), U)) != null)
      return K = L.x - $[0] || 0, ne = L.y - $[1] || 0, function Y(T, z, F) {
        var X = $, ae;
        switch (T) {
          case "start":
            s[A] = Y, ae = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            $ = Sa(F || z, H), ae = c;
            break;
        }
        Q.call(
          T,
          O,
          new Fh(T, {
            sourceEvent: z,
            subject: L,
            target: b,
            identifier: A,
            active: ae,
            x: $[0] + K,
            y: $[1] + ne,
            dx: $[0] - X[0],
            dy: $[1] - X[1],
            dispatch: Q
          }),
          U
        );
      };
  }
  return b.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : Ou(!!O), b) : e;
  }, b.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : Ou(O), b) : a;
  }, b.subject = function(O) {
    return arguments.length ? (i = typeof O == "function" ? O : Ou(O), b) : i;
  }, b.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : Ou(!!O), b) : l;
  }, b.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? b : O;
  }, b.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, b) : Math.sqrt(g);
  }, b;
}
function Bm(e, a, i) {
  e.prototype = a.prototype = i, i.constructor = e;
}
function q1(e, a) {
  var i = Object.create(e.prototype);
  for (var l in a) i[l] = a[l];
  return i;
}
function ps() {
}
var Ko = 0.7, gc = 1 / Ko, Cl = "\\s*([+-]?\\d+)\\s*", Wo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ia = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", MT = /^#([0-9a-f]{3,8})$/, DT = new RegExp(`^rgb\\(${Cl},${Cl},${Cl}\\)$`), AT = new RegExp(`^rgb\\(${Ia},${Ia},${Ia}\\)$`), jT = new RegExp(`^rgba\\(${Cl},${Cl},${Cl},${Wo}\\)$`), OT = new RegExp(`^rgba\\(${Ia},${Ia},${Ia},${Wo}\\)$`), zT = new RegExp(`^hsl\\(${Wo},${Ia},${Ia}\\)$`), LT = new RegExp(`^hsla\\(${Wo},${Ia},${Ia},${Wo}\\)$`), By = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Bm(ps, Ti, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Uy,
  // Deprecated! Use color.formatHex.
  formatHex: Uy,
  formatHex8: kT,
  formatHsl: HT,
  formatRgb: Vy,
  toString: Vy
});
function Uy() {
  return this.rgb().formatHex();
}
function kT() {
  return this.rgb().formatHex8();
}
function HT() {
  return I1(this).formatHsl();
}
function Vy() {
  return this.rgb().formatRgb();
}
function Ti(e) {
  var a, i;
  return e = (e + "").trim().toLowerCase(), (a = MT.exec(e)) ? (i = a[1].length, a = parseInt(a[1], 16), i === 6 ? $y(a) : i === 3 ? new On(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : i === 8 ? zu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : i === 4 ? zu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = DT.exec(e)) ? new On(a[1], a[2], a[3], 1) : (a = AT.exec(e)) ? new On(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = jT.exec(e)) ? zu(a[1], a[2], a[3], a[4]) : (a = OT.exec(e)) ? zu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = zT.exec(e)) ? Yy(a[1], a[2] / 100, a[3] / 100, 1) : (a = LT.exec(e)) ? Yy(a[1], a[2] / 100, a[3] / 100, a[4]) : By.hasOwnProperty(e) ? $y(By[e]) : e === "transparent" ? new On(NaN, NaN, NaN, 0) : null;
}
function $y(e) {
  return new On(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function zu(e, a, i, l) {
  return l <= 0 && (e = a = i = NaN), new On(e, a, i, l);
}
function BT(e) {
  return e instanceof ps || (e = Ti(e)), e ? (e = e.rgb(), new On(e.r, e.g, e.b, e.opacity)) : new On();
}
function Xh(e, a, i, l) {
  return arguments.length === 1 ? BT(e) : new On(e, a, i, l ?? 1);
}
function On(e, a, i, l) {
  this.r = +e, this.g = +a, this.b = +i, this.opacity = +l;
}
Bm(On, Xh, q1(ps, {
  brighter(e) {
    return e = e == null ? gc : Math.pow(gc, e), new On(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ko : Math.pow(Ko, e), new On(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new On(Ei(this.r), Ei(this.g), Ei(this.b), vc(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: qy,
  // Deprecated! Use color.formatHex.
  formatHex: qy,
  formatHex8: UT,
  formatRgb: Iy,
  toString: Iy
}));
function qy() {
  return `#${Si(this.r)}${Si(this.g)}${Si(this.b)}`;
}
function UT() {
  return `#${Si(this.r)}${Si(this.g)}${Si(this.b)}${Si((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Iy() {
  const e = vc(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ei(this.r)}, ${Ei(this.g)}, ${Ei(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function vc(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ei(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Si(e) {
  return e = Ei(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Yy(e, a, i, l) {
  return l <= 0 ? e = a = i = NaN : i <= 0 || i >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new Ea(e, a, i, l);
}
function I1(e) {
  if (e instanceof Ea) return new Ea(e.h, e.s, e.l, e.opacity);
  if (e instanceof ps || (e = Ti(e)), !e) return new Ea();
  if (e instanceof Ea) return e;
  e = e.rgb();
  var a = e.r / 255, i = e.g / 255, l = e.b / 255, s = Math.min(a, i, l), u = Math.max(a, i, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (i - l) / d + (i < l) * 6 : i === u ? c = (l - a) / d + 2 : c = (a - i) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new Ea(c, d, p, e.opacity);
}
function VT(e, a, i, l) {
  return arguments.length === 1 ? I1(e) : new Ea(e, a, i, l ?? 1);
}
function Ea(e, a, i, l) {
  this.h = +e, this.s = +a, this.l = +i, this.opacity = +l;
}
Bm(Ea, VT, q1(ps, {
  brighter(e) {
    return e = e == null ? gc : Math.pow(gc, e), new Ea(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ko : Math.pow(Ko, e), new Ea(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, l = i + (i < 0.5 ? i : 1 - i) * a, s = 2 * i - l;
    return new On(
      mh(e >= 240 ? e - 240 : e + 120, s, l),
      mh(e, s, l),
      mh(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new Ea(Gy(this.h), Lu(this.s), Lu(this.l), vc(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = vc(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Gy(this.h)}, ${Lu(this.s) * 100}%, ${Lu(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Gy(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Lu(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function mh(e, a, i) {
  return (e < 60 ? a + (i - a) * e / 60 : e < 180 ? i : e < 240 ? a + (i - a) * (240 - e) / 60 : a) * 255;
}
const Um = (e) => () => e;
function $T(e, a) {
  return function(i) {
    return e + i * a;
  };
}
function qT(e, a, i) {
  return e = Math.pow(e, i), a = Math.pow(a, i) - e, i = 1 / i, function(l) {
    return Math.pow(e + l * a, i);
  };
}
function IT(e) {
  return (e = +e) == 1 ? Y1 : function(a, i) {
    return i - a ? qT(a, i, e) : Um(isNaN(a) ? i : a);
  };
}
function Y1(e, a) {
  var i = a - e;
  return i ? $T(e, i) : Um(isNaN(e) ? a : e);
}
const yc = (function e(a) {
  var i = IT(a);
  function l(s, u) {
    var c = i((s = Xh(s)).r, (u = Xh(u)).r), d = i(s.g, u.g), p = i(s.b, u.b), m = Y1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = d(y), s.b = p(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function YT(e, a) {
  a || (a = []);
  var i = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < i; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function GT(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function FT(e, a) {
  var i = a ? a.length : 0, l = e ? Math.min(i, e.length) : 0, s = new Array(l), u = new Array(i), c;
  for (c = 0; c < l; ++c) s[c] = Go(e[c], a[c]);
  for (; c < i; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function XT(e, a) {
  var i = /* @__PURE__ */ new Date();
  return e = +e, a = +a, function(l) {
    return i.setTime(e * (1 - l) + a * l), i;
  };
}
function $a(e, a) {
  return e = +e, a = +a, function(i) {
    return e * (1 - i) + a * i;
  };
}
function PT(e, a) {
  var i = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? i[s] = Go(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in i) l[s] = i[s](u);
    return l;
  };
}
var Ph = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ph = new RegExp(Ph.source, "g");
function ZT(e) {
  return function() {
    return e;
  };
}
function QT(e) {
  return function(a) {
    return e(a) + "";
  };
}
function G1(e, a) {
  var i = Ph.lastIndex = ph.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = Ph.exec(e)) && (s = ph.exec(a)); )
    (u = s.index) > i && (u = a.slice(i, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: $a(l, s) })), i = ph.lastIndex;
  return i < a.length && (u = a.slice(i), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? QT(p[0].x) : ZT(a) : (a = p.length, function(m) {
    for (var y = 0, g; y < a; ++y) d[(g = p[y]).i] = g.x(m);
    return d.join("");
  });
}
function Go(e, a) {
  var i = typeof a, l;
  return a == null || i === "boolean" ? Um(a) : (i === "number" ? $a : i === "string" ? (l = Ti(a)) ? (a = l, yc) : G1 : a instanceof Ti ? yc : a instanceof Date ? XT : GT(a) ? YT : Array.isArray(a) ? FT : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? PT : $a)(e, a);
}
var Fy = 180 / Math.PI, Zh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function F1(e, a, i, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * i + a * l) && (i -= e * p, l -= a * p), (d = Math.sqrt(i * i + l * l)) && (i /= d, l /= d, p /= d), e * l < a * i && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * Fy,
    skewX: Math.atan(p) * Fy,
    scaleX: c,
    scaleY: d
  };
}
var ku;
function KT(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Zh : F1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function WT(e) {
  return e == null || (ku || (ku = document.createElementNS("http://www.w3.org/2000/svg", "g")), ku.setAttribute("transform", e), !(e = ku.transform.baseVal.consolidate())) ? Zh : (e = e.matrix, F1(e.a, e.b, e.c, e.d, e.e, e.f));
}
function X1(e, a, i, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, g, b, x, w) {
    if (m !== g || y !== b) {
      var R = x.push("translate(", null, a, null, i);
      w.push({ i: R - 4, x: $a(m, g) }, { i: R - 2, x: $a(y, b) });
    } else (g || b) && x.push("translate(" + g + a + b + i);
  }
  function c(m, y, g, b) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), b.push({ i: g.push(s(g) + "rotate(", null, l) - 2, x: $a(m, y) })) : y && g.push(s(g) + "rotate(" + y + l);
  }
  function d(m, y, g, b) {
    m !== y ? b.push({ i: g.push(s(g) + "skewX(", null, l) - 2, x: $a(m, y) }) : y && g.push(s(g) + "skewX(" + y + l);
  }
  function p(m, y, g, b, x, w) {
    if (m !== g || y !== b) {
      var R = x.push(s(x) + "scale(", null, ",", null, ")");
      w.push({ i: R - 4, x: $a(m, g) }, { i: R - 2, x: $a(y, b) });
    } else (g !== 1 || b !== 1) && x.push(s(x) + "scale(" + g + "," + b + ")");
  }
  return function(m, y) {
    var g = [], b = [];
    return m = e(m), y = e(y), u(m.translateX, m.translateY, y.translateX, y.translateY, g, b), c(m.rotate, y.rotate, g, b), d(m.skewX, y.skewX, g, b), p(m.scaleX, m.scaleY, y.scaleX, y.scaleY, g, b), m = y = null, function(x) {
      for (var w = -1, R = b.length, C; ++w < R; ) g[(C = b[w]).i] = C.x(x);
      return g.join("");
    };
  };
}
var JT = X1(KT, "px, ", "px)", "deg)"), eM = X1(WT, ", ", ")", ")"), tM = 1e-12;
function Xy(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function nM(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function aM(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const oc = (function e(a, i, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], y = c[0], g = c[1], b = c[2], x = y - d, w = g - p, R = x * x + w * w, C, N;
    if (R < tM)
      N = Math.log(b / m) / a, C = function(U) {
        return [
          d + U * x,
          p + U * w,
          m * Math.exp(a * U * N)
        ];
      };
    else {
      var D = Math.sqrt(R), E = (b * b - m * m + l * R) / (2 * m * i * D), O = (b * b - m * m - l * R) / (2 * b * i * D), H = Math.log(Math.sqrt(E * E + 1) - E), B = Math.log(Math.sqrt(O * O + 1) - O);
      N = (B - H) / a, C = function(U) {
        var A = U * N, I = Xy(H), Q = m / (i * D) * (I * aM(a * A + H) - nM(H));
        return [
          d + Q * x,
          p + Q * w,
          m * I / Xy(a * A + H)
        ];
      };
    }
    return C.duration = N * 1e3 * a / Math.SQRT2, C;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Ml = 0, qo = 0, Lo = 0, P1 = 1e3, bc, Io, xc = 0, Mi = 0, Bc = 0, Jo = typeof performance == "object" && performance.now ? performance : Date, Z1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Vm() {
  return Mi || (Z1(rM), Mi = Jo.now() + Bc);
}
function rM() {
  Mi = 0;
}
function wc() {
  this._call = this._time = this._next = null;
}
wc.prototype = Q1.prototype = {
  constructor: wc,
  restart: function(e, a, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? Vm() : +i) + (a == null ? 0 : +a), !this._next && Io !== this && (Io ? Io._next = this : bc = this, Io = this), this._call = e, this._time = i, Qh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Qh());
  }
};
function Q1(e, a, i) {
  var l = new wc();
  return l.restart(e, a, i), l;
}
function iM() {
  Vm(), ++Ml;
  for (var e = bc, a; e; )
    (a = Mi - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Ml;
}
function Py() {
  Mi = (xc = Jo.now()) + Bc, Ml = qo = 0;
  try {
    iM();
  } finally {
    Ml = 0, oM(), Mi = 0;
  }
}
function lM() {
  var e = Jo.now(), a = e - xc;
  a > P1 && (Bc -= a, xc = e);
}
function oM() {
  for (var e, a = bc, i, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (i = a._next, a._next = null, a = e ? e._next = i : bc = i);
  Io = e, Qh(l);
}
function Qh(e) {
  if (!Ml) {
    qo && (qo = clearTimeout(qo));
    var a = e - Mi;
    a > 24 ? (e < 1 / 0 && (qo = setTimeout(Py, e - Jo.now() - Bc)), Lo && (Lo = clearInterval(Lo))) : (Lo || (xc = Jo.now(), Lo = setInterval(lM, P1)), Ml = 1, Z1(Py));
  }
}
function Zy(e, a, i) {
  var l = new wc();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, i), l;
}
var sM = kc("start", "end", "cancel", "interrupt"), uM = [], K1 = 0, Qy = 1, Kh = 2, sc = 3, Ky = 4, Wh = 5, uc = 6;
function Uc(e, a, i, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (i in c) return;
  cM(e, i, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: sM,
    tween: uM,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: K1
  });
}
function $m(e, a) {
  var i = Da(e, a);
  if (i.state > K1) throw new Error("too late; already scheduled");
  return i;
}
function Fa(e, a) {
  var i = Da(e, a);
  if (i.state > sc) throw new Error("too late; already running");
  return i;
}
function Da(e, a) {
  var i = e.__transition;
  if (!i || !(i = i[a])) throw new Error("transition not found");
  return i;
}
function cM(e, a, i) {
  var l = e.__transition, s;
  l[a] = i, i.timer = Q1(u, 0, i.time);
  function u(m) {
    i.state = Qy, i.timer.restart(c, i.delay, i.time), i.delay <= m && c(m - i.delay);
  }
  function c(m) {
    var y, g, b, x;
    if (i.state !== Qy) return p();
    for (y in l)
      if (x = l[y], x.name === i.name) {
        if (x.state === sc) return Zy(c);
        x.state === Ky ? (x.state = uc, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[y]) : +y < a && (x.state = uc, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[y]);
      }
    if (Zy(function() {
      i.state === sc && (i.state = Ky, i.timer.restart(d, i.delay, i.time), d(m));
    }), i.state = Kh, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Kh) {
      for (i.state = sc, s = new Array(b = i.tween.length), y = 0, g = -1; y < b; ++y)
        (x = i.tween[y].value.call(e, e.__data__, i.index, i.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var y = m < i.duration ? i.ease.call(null, m / i.duration) : (i.timer.restart(p), i.state = Wh, 1), g = -1, b = s.length; ++g < b; )
      s[g].call(e, y);
    i.state === Wh && (i.on.call("end", e, e.__data__, i.index, i.group), p());
  }
  function p() {
    i.state = uc, i.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function cc(e, a) {
  var i = e.__transition, l, s, u = !0, c;
  if (i) {
    a = a == null ? null : a + "";
    for (c in i) {
      if ((l = i[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > Kh && l.state < Wh, l.state = uc, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete i[c];
    }
    u && delete e.__transition;
  }
}
function fM(e) {
  return this.each(function() {
    cc(this, e);
  });
}
function dM(e, a) {
  var i, l;
  return function() {
    var s = Fa(this, e), u = s.tween;
    if (u !== i) {
      l = i = u;
      for (var c = 0, d = l.length; c < d; ++c)
        if (l[c].name === a) {
          l = l.slice(), l.splice(c, 1);
          break;
        }
    }
    s.tween = l;
  };
}
function hM(e, a, i) {
  var l, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var u = Fa(this, e), c = u.tween;
    if (c !== l) {
      s = (l = c).slice();
      for (var d = { name: a, value: i }, p = 0, m = s.length; p < m; ++p)
        if (s[p].name === a) {
          s[p] = d;
          break;
        }
      p === m && s.push(d);
    }
    u.tween = s;
  };
}
function mM(e, a) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = Da(this.node(), i).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? dM : hM)(i, e, a));
}
function qm(e, a, i) {
  var l = e._id;
  return e.each(function() {
    var s = Fa(this, l);
    (s.value || (s.value = {}))[a] = i.apply(this, arguments);
  }), function(s) {
    return Da(s, l).value[a];
  };
}
function W1(e, a) {
  var i;
  return (typeof a == "number" ? $a : a instanceof Ti ? yc : (i = Ti(a)) ? (a = i, yc) : G1)(e, a);
}
function pM(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function gM(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function vM(e, a, i) {
  var l, s = i + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, i);
  };
}
function yM(e, a, i) {
  var l, s = i + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, i);
  };
}
function bM(e, a, i) {
  var l, s, u;
  return function() {
    var c, d = i(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function xM(e, a, i) {
  var l, s, u;
  return function() {
    var c, d = i(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function wM(e, a) {
  var i = Hc(e), l = i === "transform" ? eM : W1;
  return this.attrTween(e, typeof a == "function" ? (i.local ? xM : bM)(i, l, qm(this, "attr." + e, a)) : a == null ? (i.local ? gM : pM)(i) : (i.local ? yM : vM)(i, l, a));
}
function _M(e, a) {
  return function(i) {
    this.setAttribute(e, a.call(this, i));
  };
}
function SM(e, a) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, a.call(this, i));
  };
}
function EM(e, a) {
  var i, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (i = (l = u) && SM(e, u)), i;
  }
  return s._value = a, s;
}
function NM(e, a) {
  var i, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (i = (l = u) && _M(e, u)), i;
  }
  return s._value = a, s;
}
function CM(e, a) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (a == null) return this.tween(i, null);
  if (typeof a != "function") throw new Error();
  var l = Hc(e);
  return this.tween(i, (l.local ? EM : NM)(l, a));
}
function RM(e, a) {
  return function() {
    $m(this, e).delay = +a.apply(this, arguments);
  };
}
function TM(e, a) {
  return a = +a, function() {
    $m(this, e).delay = a;
  };
}
function MM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? RM : TM)(a, e)) : Da(this.node(), a).delay;
}
function DM(e, a) {
  return function() {
    Fa(this, e).duration = +a.apply(this, arguments);
  };
}
function AM(e, a) {
  return a = +a, function() {
    Fa(this, e).duration = a;
  };
}
function jM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? DM : AM)(a, e)) : Da(this.node(), a).duration;
}
function OM(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Fa(this, e).ease = a;
  };
}
function zM(e) {
  var a = this._id;
  return arguments.length ? this.each(OM(a, e)) : Da(this.node(), a).ease;
}
function LM(e, a) {
  return function() {
    var i = a.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Fa(this, e).ease = i;
  };
}
function kM(e) {
  if (typeof e != "function") throw new Error();
  return this.each(LM(this._id, e));
}
function HM(e) {
  typeof e != "function" && (e = M1(e));
  for (var a = this._groups, i = a.length, l = new Array(i), s = 0; s < i; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new yr(l, this._parents, this._name, this._id);
}
function BM(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, i = e._groups, l = a.length, s = i.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = i[d], y = p.length, g = c[d] = new Array(y), b, x = 0; x < y; ++x)
      (b = p[x] || m[x]) && (g[x] = b);
  for (; d < l; ++d)
    c[d] = a[d];
  return new yr(c, this._parents, this._name, this._id);
}
function UM(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var i = a.indexOf(".");
    return i >= 0 && (a = a.slice(0, i)), !a || a === "start";
  });
}
function VM(e, a, i) {
  var l, s, u = UM(a) ? $m : Fa;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, i), c.on = s;
  };
}
function $M(e, a) {
  var i = this._id;
  return arguments.length < 2 ? Da(this.node(), i).on.on(e) : this.each(VM(i, e, a));
}
function qM(e) {
  return function() {
    var a = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    a && a.removeChild(this);
  };
}
function IM() {
  return this.on("end.remove", qM(this._id));
}
function YM(e) {
  var a = this._name, i = this._id;
  typeof e != "function" && (e = km(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), y, g, b = 0; b < p; ++b)
      (y = d[b]) && (g = e.call(y, y.__data__, b, d)) && ("__data__" in y && (g.__data__ = y.__data__), m[b] = g, Uc(m[b], a, i, b, m, Da(y, i)));
  return new yr(u, this._parents, a, i);
}
function GM(e) {
  var a = this._name, i = this._id;
  typeof e != "function" && (e = T1(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, y, g = 0; g < m; ++g)
      if (y = p[g]) {
        for (var b = e.call(y, y.__data__, g, p), x, w = Da(y, i), R = 0, C = b.length; R < C; ++R)
          (x = b[R]) && Uc(x, a, i, R, b, w);
        u.push(b), c.push(y);
      }
  return new yr(u, c, a, i);
}
var FM = ms.prototype.constructor;
function XM() {
  return new FM(this._groups, this._parents);
}
function PM(e, a) {
  var i, l, s;
  return function() {
    var u = Tl(this, e), c = (this.style.removeProperty(e), Tl(this, e));
    return u === c ? null : u === i && c === l ? s : s = a(i = u, l = c);
  };
}
function J1(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ZM(e, a, i) {
  var l, s = i + "", u;
  return function() {
    var c = Tl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, i);
  };
}
function QM(e, a, i) {
  var l, s, u;
  return function() {
    var c = Tl(this, e), d = i(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), Tl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function KM(e, a) {
  var i, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = Fa(this, e), m = p.on, y = p.value[u] == null ? d || (d = J1(a)) : void 0;
    (m !== i || s !== y) && (l = (i = m).copy()).on(c, s = y), p.on = l;
  };
}
function WM(e, a, i) {
  var l = (e += "") == "transform" ? JT : W1;
  return a == null ? this.styleTween(e, PM(e, l)).on("end.style." + e, J1(e)) : typeof a == "function" ? this.styleTween(e, QM(e, l, qm(this, "style." + e, a))).each(KM(this._id, e)) : this.styleTween(e, ZM(e, l, a), i).on("end.style." + e, null);
}
function JM(e, a, i) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), i);
  };
}
function eD(e, a, i) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && JM(e, c, i)), l;
  }
  return u._value = a, u;
}
function tD(e, a, i) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, eD(e, a, i ?? ""));
}
function nD(e) {
  return function() {
    this.textContent = e;
  };
}
function aD(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function rD(e) {
  return this.tween("text", typeof e == "function" ? aD(qm(this, "text", e)) : nD(e == null ? "" : e + ""));
}
function iD(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function lD(e) {
  var a, i;
  function l() {
    var s = e.apply(this, arguments);
    return s !== i && (a = (i = s) && iD(s)), a;
  }
  return l._value = e, l;
}
function oD(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, lD(e));
}
function sD() {
  for (var e = this._name, a = this._id, i = ew(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var y = Da(p, a);
        Uc(p, e, i, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new yr(l, this._parents, e, i);
}
function uD() {
  var e, a, i = this, l = i._id, s = i.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    i.each(function() {
      var m = Fa(this, l), y = m.on;
      y !== e && (a = (e = y).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), m.on = a;
    }), s === 0 && u();
  });
}
var cD = 0;
function yr(e, a, i, l) {
  this._groups = e, this._parents = a, this._name = i, this._id = l;
}
function ew() {
  return ++cD;
}
var fr = ms.prototype;
yr.prototype = {
  constructor: yr,
  select: YM,
  selectAll: GM,
  selectChild: fr.selectChild,
  selectChildren: fr.selectChildren,
  filter: HM,
  merge: BM,
  selection: XM,
  transition: sD,
  call: fr.call,
  nodes: fr.nodes,
  node: fr.node,
  size: fr.size,
  empty: fr.empty,
  each: fr.each,
  on: $M,
  attr: wM,
  attrTween: CM,
  style: WM,
  styleTween: tD,
  text: rD,
  textTween: oD,
  remove: IM,
  tween: mM,
  delay: MM,
  duration: jM,
  ease: zM,
  easeVarying: kM,
  end: uD,
  [Symbol.iterator]: fr[Symbol.iterator]
};
function fD(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var dD = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: fD
};
function hD(e, a) {
  for (var i; !(i = e.__transition) || !(i = i[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return i;
}
function mD(e) {
  var a, i;
  e instanceof yr ? (a = e._id, e = e._name) : (a = ew(), (i = dD).time = Vm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && Uc(p, e, a, m, c, i || hD(p, a));
  return new yr(l, this._parents, e, a);
}
ms.prototype.interrupt = fM;
ms.prototype.transition = mD;
const Hu = (e) => () => e;
function pD(e, {
  sourceEvent: a,
  target: i,
  transform: l,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: l, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function gr(e, a, i) {
  this.k = e, this.x = a, this.y = i;
}
gr.prototype = {
  constructor: gr,
  scale: function(e) {
    return e === 1 ? this : new gr(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new gr(this.k, this.x + this.k * e, this.y + this.k * a);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Vc = new gr(1, 0, 0);
tw.prototype = gr.prototype;
function tw(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Vc;
  return e.__zoom;
}
function gh(e) {
  e.stopImmediatePropagation();
}
function ko(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function gD(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function vD() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Wy() {
  return this.__zoom || Vc;
}
function yD(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function bD() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function xD(e, a, i) {
  var l = e.invertX(a[0][0]) - i[0][0], s = e.invertX(a[1][0]) - i[1][0], u = e.invertY(a[0][1]) - i[0][1], c = e.invertY(a[1][1]) - i[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function nw() {
  var e = gD, a = vD, i = xD, l = yD, s = bD, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = oc, m = kc("start", "zoom", "end"), y, g, b, x = 500, w = 150, R = 0, C = 10;
  function N(L) {
    L.property("__zoom", Wy).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", Q).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", ne).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(L, Y, T, z) {
    var F = L.selection ? L.selection() : L;
    F.property("__zoom", Wy), L !== F ? H(L, Y, T, z) : F.interrupt().each(function() {
      B(this, arguments).event(z).start().zoom(null, typeof Y == "function" ? Y.apply(this, arguments) : Y).end();
    });
  }, N.scaleBy = function(L, Y, T, z) {
    N.scaleTo(L, function() {
      var F = this.__zoom.k, X = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return F * X;
    }, T, z);
  }, N.scaleTo = function(L, Y, T, z) {
    N.transform(L, function() {
      var F = a.apply(this, arguments), X = this.__zoom, ae = T == null ? O(F) : typeof T == "function" ? T.apply(this, arguments) : T, j = X.invert(ae), k = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return i(E(D(X, k), ae, j), F, c);
    }, T, z);
  }, N.translateBy = function(L, Y, T, z) {
    N.transform(L, function() {
      return i(this.__zoom.translate(
        typeof Y == "function" ? Y.apply(this, arguments) : Y,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), a.apply(this, arguments), c);
    }, null, z);
  }, N.translateTo = function(L, Y, T, z, F) {
    N.transform(L, function() {
      var X = a.apply(this, arguments), ae = this.__zoom, j = z == null ? O(X) : typeof z == "function" ? z.apply(this, arguments) : z;
      return i(Vc.translate(j[0], j[1]).scale(ae.k).translate(
        typeof Y == "function" ? -Y.apply(this, arguments) : -Y,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), X, c);
    }, z, F);
  };
  function D(L, Y) {
    return Y = Math.max(u[0], Math.min(u[1], Y)), Y === L.k ? L : new gr(Y, L.x, L.y);
  }
  function E(L, Y, T) {
    var z = Y[0] - T[0] * L.k, F = Y[1] - T[1] * L.k;
    return z === L.x && F === L.y ? L : new gr(L.k, z, F);
  }
  function O(L) {
    return [(+L[0][0] + +L[1][0]) / 2, (+L[0][1] + +L[1][1]) / 2];
  }
  function H(L, Y, T, z) {
    L.on("start.zoom", function() {
      B(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var F = this, X = arguments, ae = B(F, X).event(z), j = a.apply(F, X), k = T == null ? O(j) : typeof T == "function" ? T.apply(F, X) : T, G = Math.max(j[1][0] - j[0][0], j[1][1] - j[0][1]), ee = F.__zoom, se = typeof Y == "function" ? Y.apply(F, X) : Y, de = p(ee.invert(k).concat(G / ee.k), se.invert(k).concat(G / se.k));
      return function(he) {
        if (he === 1) he = se;
        else {
          var J = de(he), ve = G / J[2];
          he = new gr(ve, k[0] - J[0] * ve, k[1] - J[1] * ve);
        }
        ae.zoom(null, he);
      };
    });
  }
  function B(L, Y, T) {
    return !T && L.__zooming || new U(L, Y);
  }
  function U(L, Y) {
    this.that = L, this.args = Y, this.active = 0, this.sourceEvent = null, this.extent = a.apply(L, Y), this.taps = 0;
  }
  U.prototype = {
    event: function(L) {
      return L && (this.sourceEvent = L), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(L, Y) {
      return this.mouse && L !== "mouse" && (this.mouse[1] = Y.invert(this.mouse[0])), this.touch0 && L !== "touch" && (this.touch0[1] = Y.invert(this.touch0[0])), this.touch1 && L !== "touch" && (this.touch1[1] = Y.invert(this.touch1[0])), this.that.__zoom = Y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(L) {
      var Y = Xn(this.that).datum();
      m.call(
        L,
        this.that,
        new pD(L, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: m
        }),
        Y
      );
    }
  };
  function A(L, ...Y) {
    if (!e.apply(this, arguments)) return;
    var T = B(this, Y).event(L), z = this.__zoom, F = Math.max(u[0], Math.min(u[1], z.k * Math.pow(2, l.apply(this, arguments)))), X = Sa(L);
    if (T.wheel)
      (T.mouse[0][0] !== X[0] || T.mouse[0][1] !== X[1]) && (T.mouse[1] = z.invert(T.mouse[0] = X)), clearTimeout(T.wheel);
    else {
      if (z.k === F) return;
      T.mouse = [X, z.invert(X)], cc(this), T.start();
    }
    ko(L), T.wheel = setTimeout(ae, w), T.zoom("mouse", i(E(D(z, F), T.mouse[0], T.mouse[1]), T.extent, c));
    function ae() {
      T.wheel = null, T.end();
    }
  }
  function I(L, ...Y) {
    if (b || !e.apply(this, arguments)) return;
    var T = L.currentTarget, z = B(this, Y, !0).event(L), F = Xn(L.view).on("mousemove.zoom", k, !0).on("mouseup.zoom", G, !0), X = Sa(L, T), ae = L.clientX, j = L.clientY;
    U1(L.view), gh(L), z.mouse = [X, this.__zoom.invert(X)], cc(this), z.start();
    function k(ee) {
      if (ko(ee), !z.moved) {
        var se = ee.clientX - ae, de = ee.clientY - j;
        z.moved = se * se + de * de > R;
      }
      z.event(ee).zoom("mouse", i(E(z.that.__zoom, z.mouse[0] = Sa(ee, T), z.mouse[1]), z.extent, c));
    }
    function G(ee) {
      F.on("mousemove.zoom mouseup.zoom", null), V1(ee.view, z.moved), ko(ee), z.event(ee).end();
    }
  }
  function Q(L, ...Y) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, z = Sa(L.changedTouches ? L.changedTouches[0] : L, this), F = T.invert(z), X = T.k * (L.shiftKey ? 0.5 : 2), ae = i(E(D(T, X), z, F), a.apply(this, Y), c);
      ko(L), d > 0 ? Xn(this).transition().duration(d).call(H, ae, z, L) : Xn(this).call(N.transform, ae, z, L);
    }
  }
  function $(L, ...Y) {
    if (e.apply(this, arguments)) {
      var T = L.touches, z = T.length, F = B(this, Y, L.changedTouches.length === z).event(L), X, ae, j, k;
      for (gh(L), ae = 0; ae < z; ++ae)
        j = T[ae], k = Sa(j, this), k = [k, this.__zoom.invert(k), j.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== k[2] && (F.touch1 = k, F.taps = 0) : (F.touch0 = k, X = !0, F.taps = 1 + !!y);
      y && (y = clearTimeout(y)), X && (F.taps < 2 && (g = k[0], y = setTimeout(function() {
        y = null;
      }, x)), cc(this), F.start());
    }
  }
  function K(L, ...Y) {
    if (this.__zooming) {
      var T = B(this, Y).event(L), z = L.changedTouches, F = z.length, X, ae, j, k;
      for (ko(L), X = 0; X < F; ++X)
        ae = z[X], j = Sa(ae, this), T.touch0 && T.touch0[2] === ae.identifier ? T.touch0[0] = j : T.touch1 && T.touch1[2] === ae.identifier && (T.touch1[0] = j);
      if (ae = T.that.__zoom, T.touch1) {
        var G = T.touch0[0], ee = T.touch0[1], se = T.touch1[0], de = T.touch1[1], he = (he = se[0] - G[0]) * he + (he = se[1] - G[1]) * he, J = (J = de[0] - ee[0]) * J + (J = de[1] - ee[1]) * J;
        ae = D(ae, Math.sqrt(he / J)), j = [(G[0] + se[0]) / 2, (G[1] + se[1]) / 2], k = [(ee[0] + de[0]) / 2, (ee[1] + de[1]) / 2];
      } else if (T.touch0) j = T.touch0[0], k = T.touch0[1];
      else return;
      T.zoom("touch", i(E(ae, j, k), T.extent, c));
    }
  }
  function ne(L, ...Y) {
    if (this.__zooming) {
      var T = B(this, Y).event(L), z = L.changedTouches, F = z.length, X, ae;
      for (gh(L), b && clearTimeout(b), b = setTimeout(function() {
        b = null;
      }, x), X = 0; X < F; ++X)
        ae = z[X], T.touch0 && T.touch0[2] === ae.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === ae.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (ae = Sa(ae, this), Math.hypot(g[0] - ae[0], g[1] - ae[1]) < C)) {
        var j = Xn(this).on("dblclick.zoom");
        j && j.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(L) {
    return arguments.length ? (l = typeof L == "function" ? L : Hu(+L), N) : l;
  }, N.filter = function(L) {
    return arguments.length ? (e = typeof L == "function" ? L : Hu(!!L), N) : e;
  }, N.touchable = function(L) {
    return arguments.length ? (s = typeof L == "function" ? L : Hu(!!L), N) : s;
  }, N.extent = function(L) {
    return arguments.length ? (a = typeof L == "function" ? L : Hu([[+L[0][0], +L[0][1]], [+L[1][0], +L[1][1]]]), N) : a;
  }, N.scaleExtent = function(L) {
    return arguments.length ? (u[0] = +L[0], u[1] = +L[1], N) : [u[0], u[1]];
  }, N.translateExtent = function(L) {
    return arguments.length ? (c[0][0] = +L[0][0], c[1][0] = +L[1][0], c[0][1] = +L[0][1], c[1][1] = +L[1][1], N) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, N.constrain = function(L) {
    return arguments.length ? (i = L, N) : i;
  }, N.duration = function(L) {
    return arguments.length ? (d = +L, N) : d;
  }, N.interpolate = function(L) {
    return arguments.length ? (p = L, N) : p;
  }, N.on = function() {
    var L = m.on.apply(m, arguments);
    return L === m ? N : L;
  }, N.clickDistance = function(L) {
    return arguments.length ? (R = (L = +L) * L, N) : Math.sqrt(R);
  }, N.tapDistance = function(L) {
    return arguments.length ? (C = +L, N) : C;
  }, N;
}
const Ra = {
  error001: (e = "react") => `Seems like you have not used zustand provider as an ancestor. Help: https://${e}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (e) => `The old edge with id=${e} does not exist.`,
  error009: (e) => `Marker type "${e}" doesn't exist.`,
  error008: (e, { id: a, sourceHandle: i, targetHandle: l }) => `Couldn't create edge for ${e} handle id: "${e === "source" ? i : l}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
  error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (e = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (e) => `Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, es = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], aw = ["Enter", " ", "Escape"], rw = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: a, y: i }) => `Moved selected node ${e}. New position, x: ${a}, y: ${i}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var Dl;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Dl || (Dl = {}));
var Ni;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Ni || (Ni = {}));
var ts;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(ts || (ts = {}));
const iw = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null
};
var ei;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(ei || (ei = {}));
var _c;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(_c || (_c = {}));
var ke;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(ke || (ke = {}));
const Jy = {
  [ke.Left]: ke.Right,
  [ke.Right]: ke.Left,
  [ke.Top]: ke.Bottom,
  [ke.Bottom]: ke.Top
};
function lw(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const ow = (e) => "id" in e && "source" in e && "target" in e, wD = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Im = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), gs = (e, a = [0, 0]) => {
  const { width: i, height: l } = wr(e), s = e.origin ?? a, u = i * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, _D = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const i = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Im(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? Sc(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return $c(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return qc(i);
}, vs = (e, a = {}) => {
  let i = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (i = $c(i, Sc(s)), l = !0);
  }), l ? qc(i) : { x: 0, y: 0, width: 0, height: 0 };
}, Ym = (e, a, [i, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...Ul(a, [i, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: y, selectable: g = !0, hidden: b = !1 } = m;
    if (c && !g || b)
      continue;
    const x = y.width ?? m.width ?? m.initialWidth ?? null, w = y.height ?? m.height ?? m.initialHeight ?? null, R = ns(d, jl(m)), C = (x ?? 0) * (w ?? 0), N = u && R > 0;
    (!m.internals.handleBounds || N || R >= C || m.dragging) && p.push(m);
  }
  return p;
}, SD = (e, a) => {
  const i = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    i.add(l.id);
  }), a.filter((l) => i.has(l.source) || i.has(l.target));
};
function ED(e, a) {
  const i = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && i.set(s.id, s);
  }), i;
}
async function ND({ nodes: e, width: a, height: i, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = ED(e, c), p = vs(d), m = Fm(p, a, i, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function sw({ nodeId: e, nextPosition: a, nodeLookup: i, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = i.get(e), d = c.parentId ? i.get(c.parentId) : void 0, { x: p, y: m } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? l;
  let g = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", Ra.error005());
    else {
      const x = d.measured.width, w = d.measured.height;
      x && w && (g = [
        [p, m],
        [p + x, m + w]
      ]);
    }
  else d && Ai(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + m],
    [c.extent[1][0] + p, c.extent[1][1] + m]
  ]);
  const b = Ai(g) ? Di(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", Ra.error015()), {
    position: {
      x: b.x - p + (c.measured.width ?? 0) * y[0],
      y: b.y - m + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: b
  };
}
async function CD({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: i, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((b) => b.id)), c = [];
  for (const b of i) {
    if (b.deletable === !1)
      continue;
    const x = u.has(b.id), w = !x && b.parentId && c.find((R) => R.id === b.parentId);
    (x || w) && c.push(b);
  }
  const d = new Set(a.map((b) => b.id)), p = l.filter((b) => b.deletable !== !1), y = SD(c, p);
  for (const b of p)
    d.has(b.id) && !y.find((w) => w.id === b.id) && y.push(b);
  if (!s)
    return {
      edges: y,
      nodes: c
    };
  const g = await s({
    nodes: c,
    edges: y
  });
  return typeof g == "boolean" ? g ? { edges: y, nodes: c } : { edges: [], nodes: [] } : g;
}
const Al = (e, a = 0, i = 1) => Math.min(Math.max(e, a), i), Di = (e = { x: 0, y: 0 }, a, i) => ({
  x: Al(e.x, a[0][0], a[1][0] - (i?.width ?? 0)),
  y: Al(e.y, a[0][1], a[1][1] - (i?.height ?? 0))
});
function uw(e, a, i) {
  const { width: l, height: s } = wr(i), { x: u, y: c } = i.internals.positionAbsolute;
  return Di(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const eb = (e, a, i) => e < a ? Al(Math.abs(e - a), 1, a) / a : e > i ? -Al(Math.abs(e - i), 1, a) / a : 0, Gm = (e, a, i = 15, l = 40) => {
  const s = eb(e.x, l, a.width - l) * i, u = eb(e.y, l, a.height - l) * i;
  return [s, u];
}, $c = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), Jh = ({ x: e, y: a, width: i, height: l }) => ({
  x: e,
  y: a,
  x2: e + i,
  y2: a + l
}), qc = ({ x: e, y: a, x2: i, y2: l }) => ({
  x: e,
  y: a,
  width: i - e,
  height: l - a
}), jl = (e, a = [0, 0]) => {
  const { x: i, y: l } = Im(e) ? e.internals.positionAbsolute : gs(e, a);
  return {
    x: i,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, Sc = (e, a = [0, 0]) => {
  const { x: i, y: l } = Im(e) ? e.internals.positionAbsolute : gs(e, a);
  return {
    x: i,
    y: l,
    x2: i + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, cw = (e, a) => qc($c(Jh(e), Jh(a))), ns = (e, a) => {
  const i = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(i * l);
}, tb = (e) => Na(e.width) && Na(e.height) && Na(e.x) && Na(e.y), Na = (e) => !isNaN(e) && isFinite(e), fw = (e, a) => (i, l) => {
}, ys = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), Ul = ({ x: e, y: a }, [i, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - i) / s,
    y: (a - l) / s
  };
  return u ? ys(d, c) : d;
}, Ol = ({ x: e, y: a }, [i, l, s]) => ({
  x: e * s + i,
  y: a * s + l
});
function pl(e, a) {
  if (typeof e == "number")
    return Math.floor((a - a / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const i = parseFloat(e);
    if (!Number.isNaN(i))
      return Math.floor(i);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const i = parseFloat(e);
    if (!Number.isNaN(i))
      return Math.floor(a * i * 0.01);
  }
  return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function RD(e, a, i) {
  if (typeof e == "string" || typeof e == "number") {
    const l = pl(e, i), s = pl(e, a);
    return {
      top: l,
      right: s,
      bottom: l,
      left: s,
      x: s * 2,
      y: l * 2
    };
  }
  if (typeof e == "object") {
    const l = pl(e.top ?? e.y ?? 0, i), s = pl(e.bottom ?? e.y ?? 0, i), u = pl(e.left ?? e.x ?? 0, a), c = pl(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function TD(e, a, i, l, s, u) {
  const { x: c, y: d } = Ol(e, [a, i, l]), { x: p, y: m } = Ol({ x: e.x + e.width, y: e.y + e.height }, [a, i, l]), y = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(y),
    bottom: Math.floor(g)
  };
}
const Fm = (e, a, i, l, s, u) => {
  const c = RD(u, a, i), d = (a - c.x) / e.width, p = (i - c.y) / e.height, m = Math.min(d, p), y = Al(m, l, s), g = e.x + e.width / 2, b = e.y + e.height / 2, x = a / 2 - g * y, w = i / 2 - b * y, R = TD(e, x, w, y, a, i), C = {
    left: Math.min(R.left - c.left, 0),
    top: Math.min(R.top - c.top, 0),
    right: Math.min(R.right - c.right, 0),
    bottom: Math.min(R.bottom - c.bottom, 0)
  };
  return {
    x: x - C.left + C.right,
    y: w - C.top + C.bottom,
    zoom: y
  };
}, as = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Ai(e) {
  return e != null && e !== "parent";
}
function wr(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function dw(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function hw(e, a = { width: 0, height: 0 }, i, l, s) {
  const u = { ...e }, c = l.get(i);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function nb(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const i of e)
    if (!a.has(i))
      return !1;
  return !0;
}
function MD() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function DD(e) {
  return { ...rw, ...e || {} };
}
function Fo(e, { snapGrid: a = [0, 0], snapToGrid: i = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = Ca(e), d = Ul({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = i ? ys(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const Xm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), mw = (e) => e?.getRootNode?.() || window?.document, AD = ["INPUT", "SELECT", "TEXTAREA"];
function pw(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : AD.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const gw = (e) => "clientX" in e, Ca = (e, a) => {
  const i = gw(e), l = i ? e.clientX : e.touches?.[0].clientX, s = i ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, ab = (e, a, i, l, s) => {
  const u = a.querySelectorAll(`.${e}`);
  return !u || !u.length ? null : Array.from(u).map((c) => {
    const d = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      type: e,
      nodeId: s,
      position: c.getAttribute("data-handlepos"),
      x: (d.left - i.left) / l,
      y: (d.top - i.top) / l,
      ...Xm(c)
    };
  });
};
function vw({ sourceX: e, sourceY: a, targetX: i, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + i * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, y = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, y, g];
}
function Bu(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function rb({ pos: e, x1: a, y1: i, x2: l, y2: s, c: u }) {
  switch (e) {
    case ke.Left:
      return [a - Bu(a - l, u), i];
    case ke.Right:
      return [a + Bu(l - a, u), i];
    case ke.Top:
      return [a, i - Bu(i - s, u)];
    case ke.Bottom:
      return [a, i + Bu(s - i, u)];
  }
}
function yw({ sourceX: e, sourceY: a, sourcePosition: i = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top, curvature: c = 0.25 }) {
  const [d, p] = rb({
    pos: i,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = rb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, b, x, w] = vw({
    sourceX: e,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: d,
    sourceControlY: p,
    targetControlX: m,
    targetControlY: y
  });
  return [
    `M${e},${a} C${d},${p} ${m},${y} ${l},${s}`,
    g,
    b,
    x,
    w
  ];
}
function bw({ sourceX: e, sourceY: a, targetX: i, targetY: l }) {
  const s = Math.abs(i - e) / 2, u = i < e ? i + s : i - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function jD({ sourceNode: e, targetNode: a, selected: i = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && i ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function OD({ sourceNode: e, targetNode: a, width: i, height: l, transform: s }) {
  const u = $c(Sc(e), Sc(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: i / s[2],
    height: l / s[2]
  };
  return ns(c, qc(u)) > 0;
}
const zD = ({ source: e, sourceHandle: a, target: i, targetHandle: l }) => `xy-edge__${e}${a || ""}-${i}${l || ""}`, LD = (e, a) => a.some((i) => i.source === e.source && i.target === e.target && (i.sourceHandle === e.sourceHandle || !i.sourceHandle && !e.sourceHandle) && (i.targetHandle === e.targetHandle || !i.targetHandle && !e.targetHandle)), kD = (e, a, i = {}) => {
  if (!e.source || !e.target)
    return i.onError?.("006", Ra.error006()), a;
  const l = i.getEdgeId || zD;
  let s;
  return ow(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, LD(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function xw({ sourceX: e, sourceY: a, targetX: i, targetY: l }) {
  const [s, u, c, d] = bw({
    sourceX: e,
    sourceY: a,
    targetX: i,
    targetY: l
  });
  return [`M ${e},${a}L ${i},${l}`, s, u, c, d];
}
const ib = {
  [ke.Left]: { x: -1, y: 0 },
  [ke.Right]: { x: 1, y: 0 },
  [ke.Top]: { x: 0, y: -1 },
  [ke.Bottom]: { x: 0, y: 1 }
}, HD = ({ source: e, sourcePosition: a = ke.Bottom, target: i }) => a === ke.Left || a === ke.Right ? e.x < i.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < i.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, lb = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function BD({ source: e, sourcePosition: a = ke.Bottom, target: i, targetPosition: l = ke.Top, center: s, offset: u, stepPosition: c }) {
  const d = ib[a], p = ib[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, y = { x: i.x + p.x * u, y: i.y + p.y * u }, g = HD({
    source: m,
    sourcePosition: a,
    target: y
  }), b = g.x !== 0 ? "x" : "y", x = g[b];
  let w = [], R, C;
  const N = { x: 0, y: 0 }, D = { x: 0, y: 0 }, [, , E, O] = bw({
    sourceX: e.x,
    sourceY: e.y,
    targetX: i.x,
    targetY: i.y
  });
  if (d[b] * p[b] === -1) {
    b === "x" ? (R = s.x ?? m.x + (y.x - m.x) * c, C = s.y ?? (m.y + y.y) / 2) : (R = s.x ?? (m.x + y.x) / 2, C = s.y ?? m.y + (y.y - m.y) * c);
    const A = [
      { x: R, y: m.y },
      { x: R, y: y.y }
    ], I = [
      { x: m.x, y: C },
      { x: y.x, y: C }
    ];
    d[b] === x ? w = b === "x" ? A : I : w = b === "x" ? I : A;
  } else {
    const A = [{ x: m.x, y: y.y }], I = [{ x: y.x, y: m.y }];
    if (b === "x" ? w = d.x === x ? I : A : w = d.y === x ? A : I, a === l) {
      const L = Math.abs(e[b] - i[b]);
      if (L <= u) {
        const Y = Math.min(u - 1, u - L);
        d[b] === x ? N[b] = (m[b] > e[b] ? -1 : 1) * Y : D[b] = (y[b] > i[b] ? -1 : 1) * Y;
      }
    }
    if (a !== l) {
      const L = b === "x" ? "y" : "x", Y = d[b] === p[L], T = m[L] > y[L], z = m[L] < y[L];
      (d[b] === 1 && (!Y && T || Y && z) || d[b] !== 1 && (!Y && z || Y && T)) && (w = b === "x" ? A : I);
    }
    const Q = { x: m.x + N.x, y: m.y + N.y }, $ = { x: y.x + D.x, y: y.y + D.y }, K = Math.max(Math.abs(Q.x - w[0].x), Math.abs($.x - w[0].x)), ne = Math.max(Math.abs(Q.y - w[0].y), Math.abs($.y - w[0].y));
    K >= ne ? (R = (Q.x + $.x) / 2, C = w[0].y) : (R = w[0].x, C = (Q.y + $.y) / 2);
  }
  const H = { x: m.x + N.x, y: m.y + N.y }, B = { x: y.x + D.x, y: y.y + D.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...H.x !== w[0].x || H.y !== w[0].y ? [H] : [],
    ...w,
    ...B.x !== w[w.length - 1].x || B.y !== w[w.length - 1].y ? [B] : [],
    i
  ], R, C, E, O];
}
function UD(e, a, i, l) {
  const s = Math.min(lb(e, a) / 2, lb(a, i) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === i.x || e.y === c && c === i.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < i.x ? -1 : 1, y = e.y < i.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const d = e.x < i.x ? 1 : -1, p = e.y < i.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function em({ sourceX: e, sourceY: a, sourcePosition: i = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: y = 0.5 }) {
  const [g, b, x, w, R] = BD({
    source: { x: e, y: a },
    sourcePosition: i,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: y
  });
  let C = `M${g[0].x} ${g[0].y}`;
  for (let N = 1; N < g.length - 1; N++)
    C += UD(g[N - 1], g[N], g[N + 1], c);
  return C += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [C, b, x, w, R];
}
function ob(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function VD(e) {
  const { sourceNode: a, targetNode: i } = e;
  if (!ob(a) || !ob(i))
    return null;
  const l = a.internals.handleBounds || sb(a.handles), s = i.internals.handleBounds || sb(i.handles), u = ub(l?.source ?? [], e.sourceHandle), c = ub(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Dl.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", Ra.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || ke.Bottom, p = c?.position || ke.Top, m = ji(a, u, d), y = ji(i, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function sb(e) {
  if (!e)
    return null;
  const a = [], i = [];
  for (const l of e)
    l.width = l.width ?? 1, l.height = l.height ?? 1, l.type === "source" ? a.push(l) : l.type === "target" && i.push(l);
  return {
    source: a,
    target: i
  };
}
function ji(e, a, i = ke.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? wr(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? i) {
    case ke.Top:
      return { x: s + c / 2, y: u };
    case ke.Right:
      return { x: s + c, y: u + d / 2 };
    case ke.Bottom:
      return { x: s + c / 2, y: u + d };
    case ke.Left:
      return { x: s, y: u + d / 2 };
  }
}
function ub(e, a) {
  return e && (a ? e.find((i) => i.id === a) : e[0]) || null;
}
function tm(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function $D(e, { id: a, defaultColor: i, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = tm(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || i, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const ww = 1e3, qD = 10, Pm = {
  nodeOrigin: [0, 0],
  nodeExtent: es,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, ID = {
  ...Pm,
  checkEquality: !0
};
function Zm(e, a) {
  const i = { ...e };
  for (const l in a)
    a[l] !== void 0 && (i[l] = a[l]);
  return i;
}
function YD(e, a, i) {
  const l = Zm(Pm, i);
  for (const s of e.values())
    if (s.parentId)
      Km(s, e, a, l);
    else {
      const u = gs(s, l.nodeOrigin), c = Ai(s.extent) ? s.extent : l.nodeExtent, d = Di(u, c, wr(s));
      s.internals.positionAbsolute = d;
    }
}
function GD(e, a) {
  if (!e.handles)
    return e.measured ? a?.internals.handleBounds : void 0;
  const i = [], l = [];
  for (const s of e.handles) {
    const u = {
      id: s.id,
      width: s.width ?? 1,
      height: s.height ?? 1,
      nodeId: e.id,
      x: s.x,
      y: s.y,
      position: s.position,
      type: s.type
    };
    s.type === "source" ? i.push(u) : s.type === "target" && l.push(u);
  }
  return {
    source: i,
    target: l
  };
}
function Qm(e) {
  return e === "manual";
}
function nm(e, a, i, l = {}) {
  const s = Zm(ID, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !Qm(s.zIndexMode) ? ww : 0;
  let p = e.length > 0, m = !1;
  a.clear(), i.clear();
  for (const y of e) {
    let g = c.get(y.id);
    if (s.checkEquality && y === g?.internals.userNode)
      a.set(y.id, g);
    else {
      const b = gs(y, s.nodeOrigin), x = Ai(y.extent) ? y.extent : s.nodeExtent, w = Di(b, x, wr(y));
      g = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: w,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: GD(y, g),
          z: _w(y, d, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), y.parentId && Km(g, a, i, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function FD(e, a) {
  if (!e.parentId)
    return;
  const i = a.get(e.parentId);
  i ? i.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Km(e, a, i, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = Zm(Pm, l), m = e.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  FD(e, i), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * qD), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const g = u && !Qm(p) ? ww : 0, { x: b, y: x, z: w } = XD(e, y, c, d, g, p), { positionAbsolute: R } = e.internals, C = b !== R.x || x !== R.y;
  (C || w !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: C ? { x: b, y: x } : R,
      z: w
    }
  });
}
function _w(e, a, i) {
  const l = Na(e.zIndex) ? e.zIndex : 0;
  return Qm(i) ? l : l + (e.selected ? a : 0);
}
function XD(e, a, i, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = wr(e), m = gs(e, i), y = Ai(e.extent) ? Di(m, e.extent, p) : m;
  let g = Di({ x: c + y.x, y: d + y.y }, l, p);
  e.extent === "parent" && (g = uw(g, p, a));
  const b = _w(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= b ? x + 1 : b
  };
}
function Wm(e, a, i, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? jl(d), m = cw(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, y = wr(d), g = d.origin ?? l, b = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, x = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, w = Math.max(y.width, Math.round(c.width)), R = Math.max(y.height, Math.round(c.height)), C = (w - y.width) * g[0], N = (R - y.height) * g[1];
    (b > 0 || x > 0 || C || N) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - b + C,
        y: d.position.y - x + N
      }
    }), i.get(p)?.forEach((D) => {
      e.some((E) => E.id === D.id) || s.push({
        id: D.id,
        type: "position",
        position: {
          x: D.position.x + b,
          y: D.position.y + x
        }
      });
    })), (y.width < c.width || y.height < c.height || b || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (b ? g[0] * b - C : 0),
        height: R + (x ? g[1] * x - N : 0)
      }
    });
  }), s;
}
function PD(e, a, i, l, s, u, c) {
  const d = l?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d)
    return { changes: [], updatedInternals: p };
  const m = [], y = window.getComputedStyle(d), { m22: g } = new window.DOMMatrixReadOnly(y.transform), b = [];
  for (const x of e.values()) {
    const w = a.get(x.id);
    if (!w)
      continue;
    if (w.hidden) {
      a.set(w.id, {
        ...w,
        internals: {
          ...w.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const R = Xm(x.nodeElement), C = w.measured.width !== R.width || w.measured.height !== R.height;
    if (!!(R.width && R.height && (C || !w.internals.handleBounds || x.force))) {
      const D = x.nodeElement.getBoundingClientRect(), E = Ai(w.extent) ? w.extent : u;
      let { positionAbsolute: O } = w.internals;
      w.parentId && w.extent === "parent" ? O = uw(O, R, a.get(w.parentId)) : E && (O = Di(O, E, R));
      const H = {
        ...w,
        measured: R,
        internals: {
          ...w.internals,
          positionAbsolute: O,
          handleBounds: {
            source: ab("source", x.nodeElement, D, g, w.id),
            target: ab("target", x.nodeElement, D, g, w.id)
          }
        }
      };
      a.set(w.id, H), w.parentId && Km(H, a, i, { nodeOrigin: s, zIndexMode: c }), p = !0, C && (m.push({
        id: w.id,
        type: "dimensions",
        dimensions: R
      }), w.expandParent && w.parentId && b.push({
        id: w.id,
        parentId: w.parentId,
        rect: jl(H, s)
      }));
    }
  }
  if (b.length > 0) {
    const x = Wm(b, a, i, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: p };
}
async function ZD({ delta: e, panZoom: a, transform: i, translateExtent: l, width: s, height: u }) {
  if (!a || !e.x && !e.y)
    return !1;
  const c = await a.setViewportConstrained({
    x: i[0] + e.x,
    y: i[1] + e.y,
    zoom: i[2]
  }, [
    [0, 0],
    [s, u]
  ], l);
  return !!c && (c.x !== i[0] || c.y !== i[1] || c.k !== i[2]);
}
function cb(e, a, i, l, s, u) {
  let c = s;
  const d = l.get(c) || /* @__PURE__ */ new Map();
  l.set(c, d.set(i, a)), c = `${s}-${e}`;
  const p = l.get(c) || /* @__PURE__ */ new Map();
  if (l.set(c, p.set(i, a)), u) {
    c = `${s}-${e}-${u}`;
    const m = l.get(c) || /* @__PURE__ */ new Map();
    l.set(c, m.set(i, a));
  }
}
function Sw(e, a, i) {
  e.clear(), a.clear();
  for (const l of i) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, y = `${u}-${d}--${s}-${c}`;
    cb("source", p, y, e, s, c), cb("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function Ew(e, a) {
  if (!e.parentId)
    return !1;
  const i = a.get(e.parentId);
  return i ? i.selected ? !0 : Ew(i, a) : !1;
}
function fb(e, a, i) {
  let l = e;
  do {
    if (l?.matches?.(a))
      return !0;
    if (l === i)
      return !1;
    l = l?.parentElement;
  } while (l);
  return !1;
}
function QD(e, a, i, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !Ew(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
      const d = e.get(u);
      d && s.set(u, {
        id: u,
        position: d.position || { x: 0, y: 0 },
        distance: {
          x: i.x - d.internals.positionAbsolute.x,
          y: i.y - d.internals.positionAbsolute.y
        },
        extent: d.extent,
        parentId: d.parentId,
        origin: d.origin,
        expandParent: d.expandParent,
        internals: {
          positionAbsolute: d.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: d.measured.width ?? 0,
          height: d.measured.height ?? 0
        }
      });
    }
  return s;
}
function vh({ nodeId: e, dragItems: a, nodeLookup: i, dragging: l = !0 }) {
  const s = [];
  for (const [c, d] of a) {
    const p = i.get(c)?.internals.userNode;
    p && s.push({
      ...p,
      position: d.position,
      dragging: l
    });
  }
  if (!e)
    return [s[0], s];
  const u = i.get(e)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(e)?.position || u.position,
      dragging: l
    } : s[0],
    s
  ];
}
function KD({ dragItems: e, snapGrid: a, x: i, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: i - s.distance.x,
    y: l - s.distance.y
  }, c = ys(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function WD({ onNodeMouseDown: e, getStoreItems: a, onDragStart: i, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, y = null, g = !1, b = null, x = !1, w = !1, R = null;
  function C({ noDragClassName: D, handleSelector: E, domNode: O, isSelectable: H, nodeId: B, nodeClickDistance: U = 0 }) {
    b = Xn(O);
    function A({ x: K, y: ne }) {
      const { nodeLookup: L, nodeExtent: Y, snapGrid: T, snapToGrid: z, nodeOrigin: F, onNodeDrag: X, onSelectionDrag: ae, onError: j, updateNodePositions: k } = a();
      u = { x: K, y: ne };
      let G = !1;
      const ee = d.size > 1, se = ee && Y ? Jh(vs(d)) : null, de = ee && z ? KD({
        dragItems: d,
        snapGrid: T,
        x: K,
        y: ne
      }) : null;
      for (const [he, J] of d) {
        if (!L.has(he))
          continue;
        let ve = { x: K - J.distance.x, y: ne - J.distance.y };
        z && (ve = de ? {
          x: Math.round(ve.x + de.x),
          y: Math.round(ve.y + de.y)
        } : ys(ve, T));
        let De = null;
        if (ee && Y && !J.extent && se) {
          const { positionAbsolute: we } = J.internals, Me = we.x - se.x + Y[0][0], Ye = we.x + J.measured.width - se.x2 + Y[1][0], ye = we.y - se.y + Y[0][1], pe = we.y + J.measured.height - se.y2 + Y[1][1];
          De = [
            [Me, ye],
            [Ye, pe]
          ];
        }
        const { position: Oe, positionAbsolute: Ee } = sw({
          nodeId: he,
          nextPosition: ve,
          nodeLookup: L,
          nodeExtent: De || Y,
          nodeOrigin: F,
          onError: j
        });
        G = G || J.position.x !== Oe.x || J.position.y !== Oe.y, J.position = Oe, J.internals.positionAbsolute = Ee;
      }
      if (w = w || G, !!G && (k(d, !0), R && (l || X || !B && ae))) {
        const [he, J] = vh({
          nodeId: B,
          dragItems: d,
          nodeLookup: L
        });
        l?.(R, d, he, J), X?.(R, he, J), B || ae?.(R, J);
      }
    }
    async function I() {
      if (!y)
        return;
      const { transform: K, panBy: ne, autoPanSpeed: L, autoPanOnNodeDrag: Y } = a();
      if (!Y) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [T, z] = Gm(m, y, L);
      (T !== 0 || z !== 0) && (u.x = (u.x ?? 0) - T / K[2], u.y = (u.y ?? 0) - z / K[2], await ne({ x: T, y: z }) && A(u)), c = requestAnimationFrame(I);
    }
    function Q(K) {
      const { nodeLookup: ne, multiSelectionActive: L, nodesDraggable: Y, transform: T, snapGrid: z, snapToGrid: F, selectNodesOnDrag: X, onNodeDragStart: ae, onSelectionDragStart: j, unselectNodesAndEdges: k } = a();
      g = !0, (!X || !H) && !L && B && (ne.get(B)?.selected || k()), H && X && B && e?.(B);
      const G = Fo(K.sourceEvent, { transform: T, snapGrid: z, snapToGrid: F, containerBounds: y });
      if (u = G, d = QD(ne, Y, G, B), d.size > 0 && (i || ae || !B && j)) {
        const [ee, se] = vh({
          nodeId: B,
          dragItems: d,
          nodeLookup: ne
        });
        i?.(K.sourceEvent, d, ee, se), ae?.(K.sourceEvent, ee, se), B || j?.(K.sourceEvent, se);
      }
    }
    const $ = $1().clickDistance(U).on("start", (K) => {
      const { domNode: ne, nodeDragThreshold: L, transform: Y, snapGrid: T, snapToGrid: z } = a();
      y = ne?.getBoundingClientRect() || null, x = !1, w = !1, R = K.sourceEvent, L === 0 && Q(K), u = Fo(K.sourceEvent, { transform: Y, snapGrid: T, snapToGrid: z, containerBounds: y }), m = Ca(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: ne, transform: L, snapGrid: Y, snapToGrid: T, nodeDragThreshold: z, nodeLookup: F } = a(), X = Fo(K.sourceEvent, { transform: L, snapGrid: Y, snapToGrid: T, containerBounds: y });
      if (R = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      B && !F.has(B)) && (x = !0), !x) {
        if (!p && ne && g && (p = !0, I()), !g) {
          const ae = Ca(K.sourceEvent, y), j = ae.x - m.x, k = ae.y - m.y;
          Math.sqrt(j * j + k * k) > z && Q(K);
        }
        (u.x !== X.xSnapped || u.y !== X.ySnapped) && d && g && (m = Ca(K.sourceEvent, y), A(X));
      }
    }).on("end", (K) => {
      if (!g || x) {
        x && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: ne, updateNodePositions: L, onNodeDragStop: Y, onSelectionDragStop: T } = a();
        if (w && (L(d, !1), w = !1), s || Y || !B && T) {
          const [z, F] = vh({
            nodeId: B,
            dragItems: d,
            nodeLookup: ne,
            dragging: !1
          });
          s?.(K.sourceEvent, d, z, F), Y?.(K.sourceEvent, z, F), B || T?.(K.sourceEvent, F);
        }
      }
    }).filter((K) => {
      const ne = K.target;
      return !K.button && (!D || !fb(ne, `.${D}`, O)) && (!E || fb(ne, E, O));
    });
    b.call($);
  }
  function N() {
    b?.on(".drag", null);
  }
  return {
    update: C,
    destroy: N
  };
}
function JD(e, a, i) {
  const l = [], s = {
    x: e.x - i,
    y: e.y - i,
    width: i * 2,
    height: i * 2
  };
  for (const u of a.values())
    ns(s, jl(u)) > 0 && l.push(u);
  return l;
}
const eA = 250;
function tA(e, a, i, l) {
  let s = [], u = 1 / 0;
  const c = JD(e, i, a + eA);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const m of p) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: y, y: g } = ji(d, m, m.position, !0), b = Math.sqrt(Math.pow(y - e.x, 2) + Math.pow(g - e.y, 2));
      b > a || (b < u ? (s = [{ ...m, x: y, y: g }], u = b) : b === u && s.push({ ...m, x: y, y: g }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const d = l.type === "source" ? "target" : "source";
    return s.find((p) => p.type === d) ?? s[0];
  }
  return s[0];
}
function Nw(e, a, i, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (i ? d?.find((m) => m.id === i) : d?.[0]) ?? null;
  return p && u ? { ...p, ...ji(c, p, p.position, !0) } : p;
}
function Cw(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function nA(e, a) {
  let i = null;
  return a ? i = !0 : e && !a && (i = !1), i;
}
const Rw = () => !0;
function aA(e, { connectionMode: a, connectionRadius: i, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: y, flowId: g, panBy: b, cancelConnection: x, onConnectStart: w, onConnect: R, onConnectEnd: C, isValidConnection: N = Rw, onReconnectEnd: D, updateConnection: E, getTransform: O, getFromHandle: H, autoPanSpeed: B, dragThreshold: U = 1, handleDomNode: A }) {
  const I = mw(e.target);
  let Q = 0, $;
  const { x: K, y: ne } = Ca(e), L = Cw(u, A), Y = d?.getBoundingClientRect();
  let T = !1;
  if (!Y || !L)
    return;
  const z = Nw(s, L, l, p, a);
  if (!z)
    return;
  let F = Ca(e, Y), X = !1, ae = null, j = !1, k = null;
  function G() {
    if (!y || !Y)
      return;
    const [Oe, Ee] = Gm(F, Y, B);
    b({ x: Oe, y: Ee }), Q = requestAnimationFrame(G);
  }
  const ee = {
    ...z,
    nodeId: s,
    type: L,
    position: z.position
  }, se = p.get(s);
  let he = {
    inProgress: !0,
    isValid: null,
    from: ji(se, ee, ke.Left, !0),
    fromHandle: ee,
    fromPosition: ee.position,
    fromNode: se,
    to: F,
    toHandle: null,
    toPosition: Jy[ee.position],
    toNode: null,
    pointer: F
  };
  function J() {
    T = !0, E(he), w?.(e, { nodeId: s, handleId: l, handleType: L });
  }
  U === 0 && J();
  function ve(Oe) {
    if (!T) {
      const { x: pe, y: _e } = Ca(Oe), Re = pe - K, Ae = _e - ne;
      if (!(Re * Re + Ae * Ae > U * U))
        return;
      J();
    }
    if (!H() || !ee) {
      De(Oe);
      return;
    }
    const Ee = O();
    F = Ca(Oe, Y), $ = tA(Ul(F, Ee, !1, [1, 1]), i, p, ee), X || (G(), X = !0);
    const we = Tw(Oe, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: N,
      doc: I,
      lib: m,
      flowId: g,
      nodeLookup: p
    });
    k = we.handleDomNode, ae = we.connection, j = nA(!!$, we.isValid);
    const Me = p.get(s), Ye = Me ? ji(Me, ee, ke.Left, !0) : he.from, ye = {
      ...he,
      from: Ye,
      isValid: j,
      to: we.toHandle && j ? Ol({ x: we.toHandle.x, y: we.toHandle.y }, Ee) : F,
      toHandle: we.toHandle,
      toPosition: j && we.toHandle ? we.toHandle.position : Jy[ee.position],
      toNode: we.toHandle ? p.get(we.toHandle.nodeId) : null,
      pointer: F
    };
    E(ye), he = ye;
  }
  function De(Oe) {
    if (!("touches" in Oe && Oe.touches.length > 0)) {
      if (T) {
        ($ || k) && ae && j && R?.(ae);
        const { inProgress: Ee, ...we } = he, Me = {
          ...we,
          toPosition: he.toHandle ? he.toPosition : null
        };
        C?.(Oe, Me), u && D?.(Oe, Me);
      }
      x(), cancelAnimationFrame(Q), X = !1, j = !1, ae = null, k = null, I.removeEventListener("mousemove", ve), I.removeEventListener("mouseup", De), I.removeEventListener("touchmove", ve), I.removeEventListener("touchend", De);
    }
  }
  I.addEventListener("mousemove", ve), I.addEventListener("mouseup", De), I.addEventListener("touchmove", ve), I.addEventListener("touchend", De);
}
function Tw(e, { handle: a, connectionMode: i, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = Rw, nodeLookup: y }) {
  const g = u === "target", b = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: w } = Ca(e), R = c.elementFromPoint(x, w), C = R?.classList.contains(`${d}-flow__handle`) ? R : b, N = {
    handleDomNode: C,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (C) {
    const D = Cw(void 0, C), E = C.getAttribute("data-nodeid"), O = C.getAttribute("data-handleid"), H = C.classList.contains("connectable"), B = C.classList.contains("connectableend");
    if (!E || !D)
      return N;
    const U = {
      source: g ? E : l,
      sourceHandle: g ? O : s,
      target: g ? l : E,
      targetHandle: g ? s : O
    };
    N.connection = U;
    const I = H && B && (i === Dl.Strict ? g && D === "source" || !g && D === "target" : E !== l || O !== s);
    N.isValid = I && m(U), N.toHandle = Nw(E, D, O, y, i, !0);
  }
  return N;
}
const am = {
  onPointerDown: aA,
  isValid: Tw
};
function rA({ domNode: e, panZoom: a, getTransform: i, getViewScale: l }) {
  const s = Xn(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: y = 1, pannable: g = !0, zoomable: b = !0, inversePan: x = !1 }) {
    const w = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const O = i(), H = E.sourceEvent.ctrlKey && as() ? 10 : 1, B = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, U = O[2] * Math.pow(2, B * H);
      a.scaleTo(U);
    };
    let R = [0, 0];
    const C = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (R = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, N = (E) => {
      const O = i();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const H = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], B = [H[0] - R[0], H[1] - R[1]];
      R = H;
      const U = l() * Math.max(O[2], Math.log(O[2])) * (x ? -1 : 1), A = {
        x: O[0] - B[0] * U,
        y: O[1] - B[1] * U
      }, I = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: O[2]
      }, I, d);
    }, D = nw().on("start", C).on("zoom", g ? N : null).on("zoom.wheel", b ? w : null);
    s.call(D, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: Sa
  };
}
const Ic = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), yh = ({ x: e, y: a, zoom: i }) => Vc.translate(e, a).scale(i), _l = (e, a) => e.target.closest(`.${a}`), Mw = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), iA = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, bh = (e, a = 0, i = iA, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(i).on("end", l) : e;
}, Dw = (e) => {
  const a = e.ctrlKey && as() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function lA({ zoomPanValues: e, noWheelClassName: a, d3Selection: i, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (y) => {
    if (_l(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const g = i.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const C = Sa(y), N = Dw(y), D = g * Math.pow(2, N);
      l.scaleTo(i, D, C, y);
      return;
    }
    const b = y.deltaMode === 1 ? 20 : 1;
    let x = s === Ni.Vertical ? 0 : y.deltaX * b, w = s === Ni.Horizontal ? 0 : y.deltaY * b;
    !as() && y.shiftKey && s !== Ni.Vertical && (x = y.deltaY * b, w = 0), l.translateBy(
      i,
      -(x / g) * u,
      -(w / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const R = Ic(i.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(y, R), e.panScrollTimeout = setTimeout(() => {
      m?.(y, R), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(y, R));
  };
}
function oA({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: i }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = _l(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), i.call(this, l, s);
  };
}
function sA({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: i }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = Ic(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), i && i?.(l.sourceEvent, s);
  };
}
function uA({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: i, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(i && Mw(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Ic(u.transform));
  };
}
function cA({ zoomPanValues: e, panOnDrag: a, panOnScroll: i, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && Mw(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = Ic(c.transform);
      e.prevViewport = d, clearTimeout(e.timerId), e.timerId = setTimeout(
        () => {
          s?.(c.sourceEvent, d);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        i ? 150 : 0
      );
    }
  };
}
function fA({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: i, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: y }) {
  return (g) => {
    const b = e || a, x = i && g.ctrlKey, w = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (_l(g, `${m}-flow__node`) || _l(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !b && !s && !u && !i || c || y && !w || _l(g, d) && w || _l(g, p) && (!w || s && w && !e) || !i && g.ctrlKey && w)
      return !1;
    if (!i && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!b && !s && !x && w || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const R = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || w) && R;
  };
}
function dA({ domNode: e, minZoom: a, maxZoom: i, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = e.getBoundingClientRect(), g = nw().scaleExtent([a, i]).translateExtent(l), b = Xn(e).call(g);
  D({
    x: s.x,
    y: s.y,
    zoom: Al(s.zoom, a, i)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const x = b.on("wheel.zoom"), w = b.on("dblclick.zoom");
  g.wheelDelta(Dw);
  async function R($, K) {
    return b ? new Promise((ne) => {
      g?.interpolate(K?.interpolate === "linear" ? Go : oc).transform(bh(b, K?.duration, K?.ease, () => ne(!0)), $);
    }) : !1;
  }
  function C({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: ne, userSelectionActive: L, panOnScroll: Y, panOnDrag: T, panOnScrollMode: z, panOnScrollSpeed: F, preventScrolling: X, zoomOnPinch: ae, zoomOnScroll: j, zoomOnDoubleClick: k, zoomActivationKeyPressed: G, lib: ee, onTransformChange: se, connectionInProgress: de, paneClickDistance: he, selectionOnDrag: J }) {
    L && !m.isZoomingOrPanning && N();
    const ve = Y && !G && !L;
    g.clickDistance(J ? 1 / 0 : !Na(he) || he < 0 ? 0 : he);
    const De = ve ? lA({
      zoomPanValues: m,
      noWheelClassName: $,
      d3Selection: b,
      d3Zoom: g,
      panOnScrollMode: z,
      panOnScrollSpeed: F,
      zoomOnPinch: ae,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : oA({
      noWheelClassName: $,
      preventScrolling: X,
      d3ZoomHandler: x
    });
    b.on("wheel.zoom", De, { passive: !1 });
    const Oe = sA({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", Oe);
    const Ee = uA({
      zoomPanValues: m,
      panOnDrag: T,
      onPaneContextMenu: !!ne,
      onPanZoom: u,
      onTransformChange: se
    });
    g.on("zoom", Ee);
    const we = cA({
      zoomPanValues: m,
      panOnDrag: T,
      panOnScroll: Y,
      onPaneContextMenu: ne,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", we);
    const Me = fA({
      zoomActivationKeyPressed: G,
      panOnDrag: T,
      zoomOnScroll: j,
      panOnScroll: Y,
      zoomOnDoubleClick: k,
      zoomOnPinch: ae,
      userSelectionActive: L,
      noPanClassName: K,
      noWheelClassName: $,
      lib: ee,
      connectionInProgress: de
    });
    g.filter(Me), k ? b.on("dblclick.zoom", w) : b.on("dblclick.zoom", null);
  }
  function N() {
    g.on("zoom", null);
  }
  async function D($, K, ne) {
    const L = yh($), Y = g?.constrain()(L, K, ne);
    return Y && await R(Y), Y;
  }
  async function E($, K) {
    const ne = yh($);
    return await R(ne, K), ne;
  }
  function O($) {
    if (b) {
      const K = yh($), ne = b.property("__zoom");
      (ne.k !== $.zoom || ne.x !== $.x || ne.y !== $.y) && g?.transform(b, K, null, { sync: !0 });
    }
  }
  function H() {
    const $ = b ? tw(b.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function B($, K) {
    return b ? new Promise((ne) => {
      g?.interpolate(K?.interpolate === "linear" ? Go : oc).scaleTo(bh(b, K?.duration, K?.ease, () => ne(!0)), $);
    }) : !1;
  }
  async function U($, K) {
    return b ? new Promise((ne) => {
      g?.interpolate(K?.interpolate === "linear" ? Go : oc).scaleBy(bh(b, K?.duration, K?.ease, () => ne(!0)), $);
    }) : !1;
  }
  function A($) {
    g?.scaleExtent($);
  }
  function I($) {
    g?.translateExtent($);
  }
  function Q($) {
    const K = !Na($) || $ < 0 ? 0 : $;
    g?.clickDistance(K);
  }
  return {
    update: C,
    destroy: N,
    setViewport: E,
    setViewportConstrained: D,
    getViewport: H,
    scaleTo: B,
    scaleBy: U,
    setScaleExtent: A,
    setTranslateExtent: I,
    syncViewport: O,
    setClickDistance: Q
  };
}
var zl;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(zl || (zl = {}));
function hA({ width: e, prevWidth: a, height: i, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = i - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function db(e) {
  const a = e.includes("right") || e.includes("left"), i = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: i,
    affectsX: l,
    affectsY: s
  };
}
function Qr(e, a) {
  return Math.max(0, a - e);
}
function Kr(e, a) {
  return Math.max(0, e - a);
}
function Uu(e, a, i) {
  return Math.max(0, a - e, e - i);
}
function hb(e, a) {
  return e ? !a : a;
}
function mA(e, a, i, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: y, isVertical: g } = a, b = y && g, { xSnapped: x, ySnapped: w } = i, { minWidth: R, maxWidth: C, minHeight: N, maxHeight: D } = l, { x: E, y: O, width: H, height: B, aspectRatio: U } = e;
  let A = Math.floor(y ? x - e.pointerX : 0), I = Math.floor(g ? w - e.pointerY : 0);
  const Q = H + (p ? -A : A), $ = B + (m ? -I : I), K = -u[0] * H, ne = -u[1] * B;
  let L = Uu(Q, R, C), Y = Uu($, N, D);
  if (c) {
    let F = 0, X = 0;
    p && A < 0 ? F = Qr(E + A + K, c[0][0]) : !p && A > 0 && (F = Kr(E + Q + K, c[1][0])), m && I < 0 ? X = Qr(O + I + ne, c[0][1]) : !m && I > 0 && (X = Kr(O + $ + ne, c[1][1])), L = Math.max(L, F), Y = Math.max(Y, X);
  }
  if (d) {
    let F = 0, X = 0;
    p && A > 0 ? F = Kr(E + A, d[0][0]) : !p && A < 0 && (F = Qr(E + Q, d[1][0])), m && I > 0 ? X = Kr(O + I, d[0][1]) : !m && I < 0 && (X = Qr(O + $, d[1][1])), L = Math.max(L, F), Y = Math.max(Y, X);
  }
  if (s) {
    if (y) {
      const F = Uu(Q / U, N, D) * U;
      if (L = Math.max(L, F), c) {
        let X = 0;
        !p && !m || p && !m && b ? X = Kr(O + ne + Q / U, c[1][1]) * U : X = Qr(O + ne + (p ? A : -A) / U, c[0][1]) * U, L = Math.max(L, X);
      }
      if (d) {
        let X = 0;
        !p && !m || p && !m && b ? X = Qr(O + Q / U, d[1][1]) * U : X = Kr(O + (p ? A : -A) / U, d[0][1]) * U, L = Math.max(L, X);
      }
    }
    if (g) {
      const F = Uu($ * U, R, C) / U;
      if (Y = Math.max(Y, F), c) {
        let X = 0;
        !p && !m || m && !p && b ? X = Kr(E + $ * U + K, c[1][0]) / U : X = Qr(E + (m ? I : -I) * U + K, c[0][0]) / U, Y = Math.max(Y, X);
      }
      if (d) {
        let X = 0;
        !p && !m || m && !p && b ? X = Qr(E + $ * U, d[1][0]) / U : X = Kr(E + (m ? I : -I) * U, d[0][0]) / U, Y = Math.max(Y, X);
      }
    }
  }
  I = I + (I < 0 ? Y : -Y), A = A + (A < 0 ? L : -L), s && (b ? Q > $ * U ? I = (hb(p, m) ? -A : A) / U : A = (hb(p, m) ? -I : I) * U : y ? (I = A / U, m = p) : (A = I * U, p = m));
  const T = p ? E + A : E, z = m ? O + I : O;
  return {
    width: H + (p ? -A : A),
    height: B + (m ? -I : I),
    x: u[0] * A * (p ? -1 : 1) + T,
    y: u[1] * I * (m ? -1 : 1) + z
  };
}
const Aw = { width: 0, height: 0, x: 0, y: 0 }, pA = {
  ...Aw,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function gA(e, a, i) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = i[0] * u, p = i[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function vA({ domNode: e, nodeId: a, getStoreItems: i, onChange: l, onEnd: s }) {
  const u = Xn(e);
  let c = {
    controlDirection: db("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: y, keepAspectRatio: g, resizeDirection: b, onResizeStart: x, onResize: w, onResizeEnd: R, shouldResize: C }) {
    let N = { ...Aw }, D = { ...pA };
    c = {
      boundaries: y,
      resizeDirection: b,
      keepAspectRatio: g,
      controlDirection: db(m)
    };
    let E, O = null, H = [], B, U, A, I = !1;
    const Q = $1().on("start", ($) => {
      const { nodeLookup: K, transform: ne, snapGrid: L, snapToGrid: Y, nodeOrigin: T, paneDomNode: z } = i();
      if (E = K.get(a), !E)
        return;
      O = z?.getBoundingClientRect() ?? null;
      const { xSnapped: F, ySnapped: X } = Fo($.sourceEvent, {
        transform: ne,
        snapGrid: L,
        snapToGrid: Y,
        containerBounds: O
      });
      N = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, D = {
        ...N,
        pointerX: F,
        pointerY: X,
        aspectRatio: N.width / N.height
      }, B = void 0, U = Ai(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (B = K.get(E.parentId)), B && E.extent === "parent" && (U = [
        [0, 0],
        [B.measured.width, B.measured.height]
      ]), H = [], A = void 0;
      for (const [ae, j] of K)
        if (j.parentId === a && (H.push({
          id: ae,
          position: { ...j.position },
          extent: j.extent
        }), j.extent === "parent" || j.expandParent)) {
          const k = gA(j, E, j.origin ?? T);
          A ? A = [
            [Math.min(k[0][0], A[0][0]), Math.min(k[0][1], A[0][1])],
            [Math.max(k[1][0], A[1][0]), Math.max(k[1][1], A[1][1])]
          ] : A = k;
        }
      x?.($, { ...N });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: ne, snapToGrid: L, nodeOrigin: Y } = i(), T = Fo($.sourceEvent, {
        transform: K,
        snapGrid: ne,
        snapToGrid: L,
        containerBounds: O
      }), z = [];
      if (!E)
        return;
      const { x: F, y: X, width: ae, height: j } = N, k = {}, G = E.origin ?? Y, { width: ee, height: se, x: de, y: he } = mA(D, c.controlDirection, T, c.boundaries, c.keepAspectRatio, G, U, A), J = ee !== ae, ve = se !== j, De = de !== F && J, Oe = he !== X && ve;
      if (!De && !Oe && !J && !ve)
        return;
      if ((De || Oe || G[0] === 1 || G[1] === 1) && (k.x = De ? de : N.x, k.y = Oe ? he : N.y, N.x = k.x, N.y = k.y, H.length > 0)) {
        const Ye = de - F, ye = he - X;
        for (const pe of H)
          pe.position = {
            x: pe.position.x - Ye + G[0] * (ee - ae),
            y: pe.position.y - ye + G[1] * (se - j)
          }, z.push(pe);
      }
      if ((J || ve) && (k.width = J && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ee : N.width, k.height = ve && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : N.height, N.width = k.width, N.height = k.height), B && E.expandParent) {
        const Ye = G[0] * (k.width ?? 0);
        k.x && k.x < Ye && (N.x = Ye, D.x = D.x - (k.x - Ye));
        const ye = G[1] * (k.height ?? 0);
        k.y && k.y < ye && (N.y = ye, D.y = D.y - (k.y - ye));
      }
      const Ee = hA({
        width: N.width,
        prevWidth: ae,
        height: N.height,
        prevHeight: j,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), we = { ...N, direction: Ee };
      C?.($, we) !== !1 && (I = !0, w?.($, we), l(k, z));
    }).on("end", ($) => {
      I && (R?.($, { ...N }), s?.({ ...N }), I = !1);
    });
    u.call(Q);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: p
  };
}
var xh = { exports: {} }, wh = {}, _h = { exports: {} }, Sh = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mb;
function yA() {
  if (mb) return Sh;
  mb = 1;
  var e = us();
  function a(g, b) {
    return g === b && (g !== 0 || 1 / g === 1 / b) || g !== g && b !== b;
  }
  var i = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, b) {
    var x = b(), w = l({ inst: { value: x, getSnapshot: b } }), R = w[0].inst, C = w[1];
    return u(
      function() {
        R.value = x, R.getSnapshot = b, p(R) && C({ inst: R });
      },
      [g, x, b]
    ), s(
      function() {
        return p(R) && C({ inst: R }), g(function() {
          p(R) && C({ inst: R });
        });
      },
      [g]
    ), c(x), x;
  }
  function p(g) {
    var b = g.getSnapshot;
    g = g.value;
    try {
      var x = b();
      return !i(g, x);
    } catch {
      return !0;
    }
  }
  function m(g, b) {
    return b();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : d;
  return Sh.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y, Sh;
}
var pb;
function jw() {
  return pb || (pb = 1, _h.exports = yA()), _h.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gb;
function bA() {
  if (gb) return wh;
  gb = 1;
  var e = us(), a = jw();
  function i(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : i, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return wh.useSyncExternalStoreWithSelector = function(m, y, g, b, x) {
    var w = u(null);
    if (w.current === null) {
      var R = { hasValue: !1, value: null };
      w.current = R;
    } else R = w.current;
    w = d(
      function() {
        function N(B) {
          if (!D) {
            if (D = !0, E = B, B = b(B), x !== void 0 && R.hasValue) {
              var U = R.value;
              if (x(U, B))
                return O = U;
            }
            return O = B;
          }
          if (U = O, l(E, B)) return U;
          var A = b(B);
          return x !== void 0 && x(U, A) ? (E = B, U) : (E = B, O = A);
        }
        var D = !1, E, O, H = g === void 0 ? null : g;
        return [
          function() {
            return N(y());
          },
          H === null ? void 0 : function() {
            return N(H());
          }
        ];
      },
      [y, g, b, x]
    );
    var C = s(m, w[0], w[1]);
    return c(
      function() {
        R.hasValue = !0, R.value = C;
      },
      [C]
    ), p(C), C;
  }, wh;
}
var vb;
function xA() {
  return vb || (vb = 1, xh.exports = bA()), xh.exports;
}
var wA = xA();
const _A = /* @__PURE__ */ xm(wA), SA = {}, yb = (e) => {
  let a;
  const i = /* @__PURE__ */ new Set(), l = (y, g) => {
    const b = typeof y == "function" ? y(a) : y;
    if (!Object.is(b, a)) {
      const x = a;
      a = g ?? (typeof b != "object" || b === null) ? b : Object.assign({}, a, b), i.forEach((w) => w(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (i.add(y), () => i.delete(y)), destroy: () => {
    (SA ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), i.clear();
  } }, m = a = e(l, s, p);
  return p;
}, EA = (e) => e ? yb(e) : yb, { useDebugValue: NA } = be, { useSyncExternalStoreWithSelector: CA } = _A, RA = (e) => e;
function Ow(e, a = RA, i) {
  const l = CA(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    i
  );
  return NA(l), l;
}
const bb = (e, a) => {
  const i = EA(e), l = (s, u = a) => Ow(i, s, u);
  return Object.assign(l, i), l;
}, TA = (e, a) => e ? bb(e, a) : bb;
function At(e, a) {
  if (Object.is(e, a))
    return !0;
  if (typeof e != "object" || e === null || typeof a != "object" || a === null)
    return !1;
  if (e instanceof Map && a instanceof Map) {
    if (e.size !== a.size) return !1;
    for (const [l, s] of e)
      if (!Object.is(s, a.get(l)))
        return !1;
    return !0;
  }
  if (e instanceof Set && a instanceof Set) {
    if (e.size !== a.size) return !1;
    for (const l of e)
      if (!a.has(l))
        return !1;
    return !0;
  }
  const i = Object.keys(e);
  if (i.length !== Object.keys(a).length)
    return !1;
  for (const l of i)
    if (!Object.prototype.hasOwnProperty.call(a, l) || !Object.is(e[l], a[l]))
      return !1;
  return !0;
}
var MA = Ix();
const DA = /* @__PURE__ */ xm(MA), Yc = S.createContext(null), AA = Yc.Provider, zw = Ra.error001("react");
function st(e, a) {
  const i = S.useContext(Yc);
  if (i === null)
    throw new Error(zw);
  return Ow(i, e, a);
}
function jt() {
  const e = S.useContext(Yc);
  if (e === null)
    throw new Error(zw);
  return S.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const xb = { display: "none" }, jA = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Lw = "react-flow__node-desc", kw = "react-flow__edge-desc", OA = "react-flow__aria-live", zA = (e) => e.ariaLiveMessage, LA = (e) => e.ariaLabelConfig;
function kA({ rfId: e }) {
  const a = st(zA);
  return v.jsx("div", { id: `${OA}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: jA, children: a });
}
function HA({ rfId: e, disableKeyboardA11y: a }) {
  const i = st(LA);
  return v.jsxs(v.Fragment, { children: [v.jsx("div", { id: `${Lw}-${e}`, style: xb, children: a ? i["node.a11yDescription.default"] : i["node.a11yDescription.keyboardDisabled"] }), v.jsx("div", { id: `${kw}-${e}`, style: xb, children: i["edge.a11yDescription.default"] }), !a && v.jsx(kA, { rfId: e })] });
}
const Gc = S.forwardRef(({ position: e = "top-left", children: a, className: i, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return v.jsx("div", { className: Zt(["react-flow__panel", i, ...c]), style: l, ref: u, ...s, children: a });
});
Gc.displayName = "Panel";
function BA({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : v.jsx(Gc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: v.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const UA = (e) => {
  const a = [], i = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && i.push(l);
  return { selectedNodes: a, selectedEdges: i };
}, Vu = (e) => e.id;
function VA(e, a) {
  return At(e.selectedNodes.map(Vu), a.selectedNodes.map(Vu)) && At(e.selectedEdges.map(Vu), a.selectedEdges.map(Vu));
}
function $A({ onSelectionChange: e }) {
  const a = jt(), { selectedNodes: i, selectedEdges: l } = st(UA, VA);
  return S.useEffect(() => {
    const s = { nodes: i, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [i, l, e]), null;
}
const qA = (e) => !!e.onSelectionChangeHandlers;
function IA({ onSelectionChange: e }) {
  const a = st(qA);
  return e || a ? v.jsx($A, { onSelectionChange: e }) : null;
}
const Hw = [0, 0], YA = { x: 0, y: 0, zoom: 1 }, GA = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "ariaLabelConfig",
  "zIndexMode"
], wb = [...GA, "rfId"], FA = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), _b = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: es,
  nodeOrigin: Hw,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function XA(e) {
  const { setNodes: a, setEdges: i, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = st(FA, At), m = jt();
  S.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    y.current = _b, d();
  }), []);
  const y = S.useRef(_b);
  return S.useEffect(
    () => {
      for (const g of wb) {
        const b = e[g], x = y.current[g];
        b !== x && (typeof e[g] > "u" || (g === "nodes" ? a(b) : g === "edges" ? i(b) : g === "minZoom" ? l(b) : g === "maxZoom" ? s(b) : g === "translateExtent" ? u(b) : g === "nodeExtent" ? c(b) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: DD(b) }) : g === "fitView" ? m.setState({ fitViewQueued: b }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: b }) : m.setState({ [g]: b })));
      }
      y.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    wb.map((g) => e[g])
  ), null;
}
function Sb() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function PA(e) {
  const [a, i] = S.useState(e === "system" ? null : e);
  return S.useEffect(() => {
    if (e !== "system") {
      i(e);
      return;
    }
    const l = Sb(), s = () => i(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : Sb()?.matches ? "dark" : "light";
}
const Eb = typeof document < "u" ? document : null;
function rs(e = null, a = { target: Eb, actInsideInputWithModifier: !0 }) {
  const [i, l] = S.useState(!1), s = S.useRef(!1), u = S.useRef(/* @__PURE__ */ new Set([])), [c, d] = S.useMemo(() => {
    if (e !== null) {
      const m = (Array.isArray(e) ? e : [e]).filter((g) => typeof g == "string").map((g) => g.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = m.reduce((g, b) => g.concat(...b), []);
      return [m, y];
    }
    return [[], []];
  }, [e]);
  return S.useEffect(() => {
    const p = a?.target ?? Eb, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && pw(x))
          return !1;
        const R = Cb(x.code, d);
        if (u.current.add(x[R]), Nb(c, u.current, !1)) {
          const C = x.composedPath?.()?.[0] || x.target, N = C?.nodeName === "BUTTON" || C?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !N) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const w = Cb(x.code, d);
        Nb(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[w]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, b = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", g), window.addEventListener("blur", b), window.addEventListener("contextmenu", b), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", g), window.removeEventListener("blur", b), window.removeEventListener("contextmenu", b);
      };
    }
  }, [e, l]), i;
}
function Nb(e, a, i) {
  return e.filter((l) => i || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Cb(e, a) {
  return a.includes(e) ? "code" : "key";
}
const ZA = () => {
  const e = jt();
  return S.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: i } = e.getState();
      return i ? i.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: i } = e.getState();
      return i ? i.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, i) => {
      const { panZoom: l } = e.getState();
      return l ? l.scaleTo(a, i) : !1;
    },
    getZoom: () => e.getState().transform[2],
    setViewport: async (a, i) => {
      const { transform: [l, s, u], panZoom: c } = e.getState();
      return c ? (await c.setViewport({
        x: a.x ?? l,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, i), !0) : !1;
    },
    getViewport: () => {
      const [a, i, l] = e.getState().transform;
      return { x: a, y: i, zoom: l };
    },
    setCenter: async (a, i, l) => e.getState().setCenter(a, i, l),
    fitBounds: async (a, i) => {
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = Fm(a, l, s, u, c, i?.padding ?? 0.1);
      return d ? (await d.setViewport(p, {
        duration: i?.duration,
        ease: i?.ease,
        interpolate: i?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, i = {}) => {
      const { transform: l, snapGrid: s, snapToGrid: u, domNode: c } = e.getState();
      if (!c)
        return a;
      const { x: d, y: p } = c.getBoundingClientRect(), m = {
        x: a.x - d,
        y: a.y - p
      }, y = i.snapGrid ?? s, g = i.snapToGrid ?? u;
      return Ul(m, l, g, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: i, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = Ol(a, i);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function Bw(e, a) {
  const i = [], l = /* @__PURE__ */ new Map(), s = [];
  for (const u of e)
    if (u.type === "add") {
      s.push(u);
      continue;
    } else if (u.type === "remove" || u.type === "replace")
      l.set(u.id, [u]);
    else {
      const c = l.get(u.id);
      c ? c.push(u) : l.set(u.id, [u]);
    }
  for (const u of a) {
    const c = l.get(u.id);
    if (!c) {
      i.push(u);
      continue;
    }
    if (c[0].type === "remove")
      continue;
    if (c[0].type === "replace") {
      i.push({ ...c[0].item });
      continue;
    }
    const d = { ...u };
    for (const p of c)
      QA(p, d);
    i.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? i.splice(u.index, 0, { ...u.item }) : i.push({ ...u.item });
  }), i;
}
function QA(e, a) {
  switch (e.type) {
    case "select": {
      a.selected = e.selected;
      break;
    }
    case "position": {
      typeof e.position < "u" && (a.position = e.position), typeof e.dragging < "u" && (a.dragging = e.dragging);
      break;
    }
    case "dimensions": {
      typeof e.dimensions < "u" && (a.measured = {
        ...e.dimensions
      }, e.setAttributes && ((e.setAttributes === !0 || e.setAttributes === "width") && (a.width = e.dimensions.width), (e.setAttributes === !0 || e.setAttributes === "height") && (a.height = e.dimensions.height))), typeof e.resizing == "boolean" && (a.resizing = e.resizing);
      break;
    }
  }
}
function KA(e, a) {
  return Bw(e, a);
}
function WA(e, a) {
  return Bw(e, a);
}
function wi(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function Sl(e, a = /* @__PURE__ */ new Set(), i = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (i && (u.selected = c), l.push(wi(u.id, c)));
  }
  return l;
}
function Rb({ items: e = [], lookup: a }) {
  const i = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && i.push({ id: u.id, item: u, type: "replace" }), d === void 0 && i.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && i.push({ id: s, type: "remove" });
  return i;
}
function Tb(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const JA = fw();
function ej(e, a, i = {}) {
  return kD(e, a, {
    ...i,
    onError: i.onError ?? JA
  });
}
const Mb = (e) => wD(e), tj = (e) => ow(e);
function Uw(e) {
  return S.forwardRef(e);
}
const nj = typeof window < "u" ? S.useLayoutEffect : S.useEffect;
function Db(e) {
  const [a, i] = S.useState(BigInt(0)), [l] = S.useState(() => aj(() => i((s) => s + BigInt(1))));
  return nj(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function aj(e) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (i) => {
      a.push(i), e();
    }
  };
}
const Vw = S.createContext(null);
function rj({ children: e }) {
  const a = jt(), i = S.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: y, onNodesChange: g, nodeLookup: b, fitViewQueued: x, onNodesChangeMiddlewareMap: w } = a.getState();
    let R = p;
    for (const N of d)
      R = typeof N == "function" ? N(R) : N;
    let C = Rb({
      items: R,
      lookup: b
    });
    for (const N of w.values())
      C = N(C);
    y && m(R), C.length > 0 ? g?.(C) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: N, nodes: D, setNodes: E } = a.getState();
      N && E(D);
    });
  }, []), l = Db(i), s = S.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: g, edgeLookup: b } = a.getState();
    let x = p;
    for (const w of d)
      x = typeof w == "function" ? w(x) : w;
    y ? m(x) : g && g(Rb({
      items: x,
      lookup: b
    }));
  }, []), u = Db(s), c = S.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return v.jsx(Vw.Provider, { value: c, children: e });
}
function ij() {
  const e = S.useContext(Vw);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const lj = (e) => !!e.panZoom;
function Jm() {
  const e = ZA(), a = jt(), i = ij(), l = st(lj), s = S.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      i.nodeQueue.push(g);
    }, d = (g) => {
      i.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: b, nodeOrigin: x } = a.getState(), w = Mb(g) ? g : b.get(g.id), R = w.parentId ? hw(w.position, w.measured, w.parentId, b, x) : w.position, C = {
        ...w,
        position: R,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return jl(C);
    }, m = (g, b, x = { replace: !1 }) => {
      c((w) => w.map((R) => {
        if (R.id === g) {
          const C = typeof b == "function" ? b(R) : b;
          return x.replace && Mb(C) ? C : { ...R, ...C };
        }
        return R;
      }));
    }, y = (g, b, x = { replace: !1 }) => {
      d((w) => w.map((R) => {
        if (R.id === g) {
          const C = typeof b == "function" ? b(R) : b;
          return x.replace && tj(C) ? C : { ...R, ...C };
        }
        return R;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((g) => ({ ...g })),
      getNode: (g) => u(g)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: g = [] } = a.getState();
        return g.map((b) => ({ ...b }));
      },
      getEdge: (g) => a.getState().edgeLookup.get(g),
      setNodes: c,
      setEdges: d,
      addNodes: (g) => {
        const b = Array.isArray(g) ? g : [g];
        i.nodeQueue.push((x) => [...x, ...b]);
      },
      addEdges: (g) => {
        const b = Array.isArray(g) ? g : [g];
        i.edgeQueue.push((x) => [...x, ...b]);
      },
      toObject: () => {
        const { nodes: g = [], edges: b = [], transform: x } = a.getState(), [w, R, C] = x;
        return {
          nodes: g.map((N) => ({ ...N })),
          edges: b.map((N) => ({ ...N })),
          viewport: {
            x: w,
            y: R,
            zoom: C
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: b = [] }) => {
        const { nodes: x, edges: w, onNodesDelete: R, onEdgesDelete: C, triggerNodeChanges: N, triggerEdgeChanges: D, onDelete: E, onBeforeDelete: O } = a.getState(), { nodes: H, edges: B } = await CD({
          nodesToRemove: g,
          edgesToRemove: b,
          nodes: x,
          edges: w,
          onBeforeDelete: O
        }), U = B.length > 0, A = H.length > 0;
        if (U) {
          const I = B.map(Tb);
          C?.(B), D(I);
        }
        if (A) {
          const I = H.map(Tb);
          R?.(H), N(I);
        }
        return (A || U) && E?.({ nodes: H, edges: B }), { deletedNodes: H, deletedEdges: B };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, b = !0, x) => {
        const w = tb(g), R = w ? g : p(g), C = x !== void 0;
        return R ? (x || a.getState().nodes).filter((N) => {
          const D = a.getState().nodeLookup.get(N.id);
          if (D && !w && (N.id === g.id || !D.internals.positionAbsolute))
            return !1;
          const E = jl(C ? N : D), O = ns(E, R);
          return b && O > 0 || O >= E.width * E.height || O >= R.width * R.height;
        }) : [];
      },
      isNodeIntersecting: (g, b, x = !0) => {
        const R = tb(g) ? g : p(g);
        if (!R)
          return !1;
        const C = ns(R, b);
        return x && C > 0 || C >= b.width * b.height || C >= R.width * R.height;
      },
      updateNode: m,
      updateNodeData: (g, b, x = { replace: !1 }) => {
        m(g, (w) => {
          const R = typeof b == "function" ? b(w) : b;
          return x.replace ? { ...w, data: R } : { ...w, data: { ...w.data, ...R } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (g, b, x = { replace: !1 }) => {
        y(g, (w) => {
          const R = typeof b == "function" ? b(w) : b;
          return x.replace ? { ...w, data: R } : { ...w, data: { ...w.data, ...R } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: b, nodeOrigin: x } = a.getState();
        return _D(g, { nodeLookup: b, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${b ? `-${b}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? b ? `-${g}-${b}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const b = a.getState().fitViewResolver ?? MD();
        return a.setState({ fitViewQueued: !0, fitViewOptions: g, fitViewResolver: b }), i.nodeQueue.push((x) => [...x]), b.promise;
      }
    };
  }, []);
  return S.useMemo(() => ({
    ...s,
    ...e,
    viewportInitialized: l
  }), [l]);
}
const Ab = (e) => e.selected, oj = typeof window < "u" ? window : void 0;
function sj({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const i = jt(), { deleteElements: l } = Jm(), s = rs(e, { actInsideInputWithModifier: !1 }), u = rs(a, { target: oj });
  S.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = i.getState();
      l({ nodes: d.filter(Ab), edges: c.filter(Ab) }), i.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), S.useEffect(() => {
    i.setState({ multiSelectionActive: u });
  }, [u]);
}
function uj(e) {
  const a = jt();
  S.useEffect(() => {
    const i = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = Xm(e.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", Ra.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
    };
    if (e.current) {
      i(), window.addEventListener("resize", i);
      const l = new ResizeObserver(() => i());
      return l.observe(e.current), () => {
        window.removeEventListener("resize", i), l && e.current && l.unobserve(e.current);
      };
    }
  }, []);
}
const Fc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, cj = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function fj({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: i = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = Ni.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: y, maxZoom: g, zoomActivationKeyCode: b, preventScrolling: x = !0, children: w, noWheelClassName: R, noPanClassName: C, onViewportChange: N, isControlledViewport: D, paneClickDistance: E, selectionOnDrag: O }) {
  const H = jt(), B = S.useRef(null), { userSelectionActive: U, lib: A, connectionInProgress: I } = st(cj, At), Q = rs(b), $ = S.useRef();
  uj(B);
  const K = S.useCallback((ne) => {
    N?.({ x: ne[0], y: ne[1], zoom: ne[2] }), D || H.setState({ transform: ne });
  }, [N, D]);
  return S.useEffect(() => {
    if (B.current) {
      $.current = dA({
        domNode: B.current,
        minZoom: y,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (T) => H.setState((z) => z.paneDragging === T ? z : { paneDragging: T }),
        onPanZoomStart: (T, z) => {
          const { onViewportChangeStart: F, onMoveStart: X } = H.getState();
          X?.(T, z), F?.(z);
        },
        onPanZoom: (T, z) => {
          const { onViewportChange: F, onMove: X } = H.getState();
          X?.(T, z), F?.(z);
        },
        onPanZoomEnd: (T, z) => {
          const { onViewportChangeEnd: F, onMoveEnd: X } = H.getState();
          X?.(T, z), F?.(z);
        }
      });
      const { x: ne, y: L, zoom: Y } = $.current.getViewport();
      return H.setState({
        panZoom: $.current,
        transform: [ne, L, Y],
        domNode: B.current.closest(".react-flow")
      }), () => {
        $.current?.destroy();
      };
    }
  }, []), S.useEffect(() => {
    $.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: a,
      zoomOnPinch: i,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: Q,
      preventScrolling: x,
      noPanClassName: C,
      userSelectionActive: U,
      noWheelClassName: R,
      lib: A,
      onTransformChange: K,
      connectionInProgress: I,
      selectionOnDrag: O,
      paneClickDistance: E
    });
  }, [
    e,
    a,
    i,
    l,
    s,
    u,
    c,
    d,
    Q,
    x,
    C,
    U,
    R,
    A,
    K,
    I,
    O,
    E
  ]), v.jsx("div", { className: "react-flow__renderer", ref: B, style: Fc, children: w });
}
const dj = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function hj() {
  const { userSelectionActive: e, userSelectionRect: a } = st(dj, At);
  return e && a ? v.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const Eh = (e, a) => (i) => {
  i.target === a.current && e?.(i);
}, mj = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function pj({ isSelecting: e, selectionKeyPressed: a, selectionMode: i = ts.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: g, onPaneMouseEnter: b, onPaneMouseMove: x, onPaneMouseLeave: w, children: R }) {
  const C = S.useRef(0), N = jt(), { userSelectionActive: D, elementsSelectable: E, dragging: O, connectionInProgress: H, panBy: B, autoPanSpeed: U } = st(mj, At), A = E && (e || D), I = S.useRef(null), Q = S.useRef(), $ = S.useRef(/* @__PURE__ */ new Set()), K = S.useRef(/* @__PURE__ */ new Set()), ne = S.useRef(!1), L = S.useRef({ x: 0, y: 0 }), Y = S.useRef(!1), T = (J) => {
    if (ne.current || H) {
      ne.current = !1;
      return;
    }
    m?.(J), N.getState().resetSelectedElements(), N.setState({ nodesSelectionActive: !1 });
  }, z = (J) => {
    if (Array.isArray(l) && l?.includes(2)) {
      J.preventDefault();
      return;
    }
    y?.(J);
  }, F = g ? (J) => g(J) : void 0, X = (J) => {
    ne.current && (J.stopPropagation(), ne.current = !1);
  }, ae = (J) => {
    const { domNode: ve, transform: De } = N.getState();
    if (Q.current = ve?.getBoundingClientRect(), !Q.current)
      return;
    const Oe = J.target === I.current;
    if (!Oe && !!J.target.closest(".nokey") || !e || !(c && Oe || a) || J.button !== 0 || !J.isPrimary)
      return;
    J.target?.setPointerCapture?.(J.pointerId), ne.current = !1;
    const { x: Me, y: Ye } = Ca(J.nativeEvent, Q.current), ye = Ul({ x: Me, y: Ye }, De);
    N.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ye.x,
        startY: ye.y,
        x: Me,
        y: Ye
      }
    }), Oe || (J.stopPropagation(), J.preventDefault());
  };
  function j(J, ve) {
    const { userSelectionRect: De } = N.getState();
    if (!De)
      return;
    const { transform: Oe, nodeLookup: Ee, edgeLookup: we, connectionLookup: Me, triggerNodeChanges: Ye, triggerEdgeChanges: ye, defaultEdgeOptions: pe } = N.getState(), _e = { x: De.startX, y: De.startY }, { x: Re, y: Ae } = Ol(_e, Oe), lt = {
      startX: _e.x,
      startY: _e.y,
      x: J < Re ? J : Re,
      y: ve < Ae ? ve : Ae,
      width: Math.abs(J - Re),
      height: Math.abs(ve - Ae)
    }, Ze = $.current, Fe = K.current;
    $.current = new Set(Ym(Ee, lt, Oe, i === ts.Partial, !0).map((vt) => vt.id)), K.current = /* @__PURE__ */ new Set();
    const Ke = pe?.selectable ?? !0;
    for (const vt of $.current) {
      const yt = Me.get(vt);
      if (yt)
        for (const { edgeId: Yt } of yt.values()) {
          const Lt = we.get(Yt);
          Lt && (Lt.selectable ?? Ke) && K.current.add(Yt);
        }
    }
    if (!nb(Ze, $.current)) {
      const vt = Sl(Ee, $.current, !0);
      Ye(vt);
    }
    if (!nb(Fe, K.current)) {
      const vt = Sl(we, K.current);
      ye(vt);
    }
    N.setState({
      userSelectionRect: lt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function k() {
    if (!s || !Q.current)
      return;
    const [J, ve] = Gm(L.current, Q.current, U);
    B({ x: J, y: ve }).then((De) => {
      if (!ne.current || !De) {
        C.current = requestAnimationFrame(k);
        return;
      }
      const { x: Oe, y: Ee } = L.current;
      j(Oe, Ee), C.current = requestAnimationFrame(k);
    });
  }
  const G = () => {
    cancelAnimationFrame(C.current), C.current = 0, Y.current = !1;
  };
  S.useEffect(() => () => G(), []);
  const ee = (J) => {
    const { userSelectionRect: ve, transform: De, resetSelectedElements: Oe } = N.getState();
    if (!Q.current || !ve)
      return;
    const { x: Ee, y: we } = Ca(J.nativeEvent, Q.current);
    L.current = { x: Ee, y: we };
    const Me = Ol({ x: ve.startX, y: ve.startY }, De);
    if (!ne.current) {
      const Ye = a ? 0 : u;
      if (Math.hypot(Ee - Me.x, we - Me.y) <= Ye)
        return;
      Oe(), d?.(J);
    }
    ne.current = !0, Y.current || (k(), Y.current = !0), j(Ee, we);
  }, se = (J) => {
    J.button === 0 && (J.target?.releasePointerCapture?.(J.pointerId), !D && J.target === I.current && N.getState().userSelectionRect && T?.(J), N.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), ne.current && (p?.(J), N.setState({
      nodesSelectionActive: $.current.size > 0
    })), G());
  }, de = (J) => {
    J.target?.releasePointerCapture?.(J.pointerId), G();
  }, he = l === !0 || Array.isArray(l) && l.includes(0);
  return v.jsxs("div", { className: Zt(["react-flow__pane", { draggable: he, dragging: O, selection: e }]), onClick: A ? void 0 : Eh(T, I), onContextMenu: Eh(z, I), onWheel: Eh(F, I), onPointerEnter: A ? void 0 : b, onPointerMove: A ? ee : x, onPointerUp: A ? se : void 0, onPointerCancel: A ? de : void 0, onPointerDownCapture: A ? ae : void 0, onClickCapture: A ? X : void 0, onPointerLeave: w, ref: I, style: Fc, children: [R, v.jsx(hj, {})] });
}
function rm({ id: e, store: a, unselect: i = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", Ra.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (i || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function $w({ nodeRef: e, disabled: a = !1, noDragClassName: i, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = jt(), [p, m] = S.useState(!1), y = S.useRef();
  return S.useEffect(() => {
    y.current = WD({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        rm({
          id: g,
          store: d,
          nodeRef: e
        });
      },
      onDragStart: () => {
        m(!0);
      },
      onDragStop: () => {
        m(!1);
      }
    });
  }, []), S.useEffect(() => {
    if (!(a || !e.current || !y.current))
      return y.current.update({
        noDragClassName: i,
        handleSelector: l,
        domNode: e.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        y.current?.destroy();
      };
  }, [i, l, a, u, e, s, c]), p;
}
const gj = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function qw() {
  const e = jt();
  return S.useCallback((i) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: y } = e.getState(), g = /* @__PURE__ */ new Map(), b = gj(c), x = s ? u[0] : 5, w = s ? u[1] : 5, R = i.direction.x * x * i.factor, C = i.direction.y * w * i.factor;
    for (const [, N] of m) {
      if (!b(N))
        continue;
      let D = {
        x: N.internals.positionAbsolute.x + R,
        y: N.internals.positionAbsolute.y + C
      };
      s && (D = ys(D, u));
      const { position: E, positionAbsolute: O } = sw({
        nodeId: N.id,
        nextPosition: D,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: d
      });
      N.position = E, N.internals.positionAbsolute = O, g.set(N.id, N);
    }
    p(g);
  }, []);
}
const ep = S.createContext(null), vj = ep.Provider;
ep.Consumer;
const Iw = () => S.useContext(ep), yj = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), bj = (e, a, i) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, y = p?.nodeId === e && p?.id === a && p?.type === i;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === i,
    connectingTo: y,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === i,
    isPossibleEndHandle: u === Dl.Strict ? d?.type !== i : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function xj({ type: e = "source", position: a = ke.Top, isValidConnection: i, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: y, onTouchStart: g, ...b }, x) {
  const w = c || null, R = e === "target", C = jt(), N = Iw(), { connectOnClick: D, noPanClassName: E, rfId: O } = st(yj, At), { connectingFrom: H, connectingTo: B, clickConnecting: U, isPossibleEndHandle: A, connectionInProcess: I, clickConnectionInProcess: Q, valid: $ } = st(bj(N, w, e), At);
  N || C.getState().onError?.("010", Ra.error010());
  const K = (Y) => {
    const { defaultEdgeOptions: T, onConnect: z, hasDefaultEdges: F } = C.getState(), X = {
      ...T,
      ...Y
    };
    if (F) {
      const { edges: ae, setEdges: j, onError: k } = C.getState();
      j(ej(X, ae, { onError: k }));
    }
    z?.(X), d?.(X);
  }, ne = (Y) => {
    if (!N)
      return;
    const T = gw(Y.nativeEvent);
    if (s && (T && Y.button === 0 || !T)) {
      const z = C.getState();
      am.onPointerDown(Y.nativeEvent, {
        handleDomNode: Y.currentTarget,
        autoPanOnConnect: z.autoPanOnConnect,
        connectionMode: z.connectionMode,
        connectionRadius: z.connectionRadius,
        domNode: z.domNode,
        nodeLookup: z.nodeLookup,
        lib: z.lib,
        isTarget: R,
        handleId: w,
        nodeId: N,
        flowId: z.rfId,
        panBy: z.panBy,
        cancelConnection: z.cancelConnection,
        onConnectStart: z.onConnectStart,
        onConnectEnd: (...F) => C.getState().onConnectEnd?.(...F),
        updateConnection: z.updateConnection,
        onConnect: K,
        isValidConnection: i || ((...F) => C.getState().isValidConnection?.(...F) ?? !0),
        getTransform: () => C.getState().transform,
        getFromHandle: () => C.getState().connection.fromHandle,
        autoPanSpeed: z.autoPanSpeed,
        dragThreshold: z.connectionDragThreshold
      });
    }
    T ? y?.(Y) : g?.(Y);
  }, L = (Y) => {
    const { onClickConnectStart: T, onClickConnectEnd: z, connectionClickStartHandle: F, connectionMode: X, isValidConnection: ae, lib: j, rfId: k, nodeLookup: G, connection: ee } = C.getState();
    if (!N || !F && !s)
      return;
    if (!F) {
      T?.(Y.nativeEvent, { nodeId: N, handleId: w, handleType: e }), C.setState({ connectionClickStartHandle: { nodeId: N, type: e, id: w } });
      return;
    }
    const se = mw(Y.target), de = i || ae, { connection: he, isValid: J } = am.isValid(Y.nativeEvent, {
      handle: {
        nodeId: N,
        id: w,
        type: e
      },
      connectionMode: X,
      fromNodeId: F.nodeId,
      fromHandleId: F.id || null,
      fromType: F.type,
      isValidConnection: de,
      flowId: k,
      doc: se,
      lib: j,
      nodeLookup: G
    });
    J && he && K(he);
    const ve = structuredClone(ee);
    delete ve.inProgress, ve.toPosition = ve.toHandle ? ve.toHandle.position : null, z?.(Y, ve), C.setState({ connectionClickStartHandle: null });
  };
  return v.jsx("div", { "data-handleid": w, "data-nodeid": N, "data-handlepos": a, "data-id": `${O}-${N}-${w}-${e}`, className: Zt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    m,
    {
      source: !R,
      target: R,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: U,
      connectingfrom: H,
      connectingto: B,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!I || A) && (I || Q ? u : s)
    }
  ]), onMouseDown: ne, onTouchStart: ne, onClick: D ? L : void 0, ref: x, ...b, children: p });
}
const Ll = S.memo(Uw(xj));
function wj({ data: e, isConnectable: a, sourcePosition: i = ke.Bottom }) {
  return v.jsxs(v.Fragment, { children: [e?.label, v.jsx(Ll, { type: "source", position: i, isConnectable: a })] });
}
function _j({ data: e, isConnectable: a, targetPosition: i = ke.Top, sourcePosition: l = ke.Bottom }) {
  return v.jsxs(v.Fragment, { children: [v.jsx(Ll, { type: "target", position: i, isConnectable: a }), e?.label, v.jsx(Ll, { type: "source", position: l, isConnectable: a })] });
}
function Sj() {
  return null;
}
function Ej({ data: e, isConnectable: a, targetPosition: i = ke.Top }) {
  return v.jsxs(v.Fragment, { children: [v.jsx(Ll, { type: "target", position: i, isConnectable: a }), e?.label] });
}
const Ec = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, jb = {
  input: wj,
  default: _j,
  output: Ej,
  group: Sj
};
function Nj(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const Cj = (e) => {
  const { width: a, height: i, x: l, y: s } = vs(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: Na(a) ? a : null,
    height: Na(i) ? i : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function Rj({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: i }) {
  const l = jt(), { width: s, height: u, transformString: c, userSelectionActive: d } = st(Cj, At), p = qw(), m = S.useRef(null);
  S.useEffect(() => {
    i || m.current?.focus({
      preventScroll: !0
    });
  }, [i]);
  const y = !d && s !== null && u !== null;
  if ($w({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const g = e ? (x) => {
    const w = l.getState().nodes.filter((R) => R.selected);
    e(x, w);
  } : void 0, b = (x) => {
    Object.prototype.hasOwnProperty.call(Ec, x.key) && (x.preventDefault(), p({
      direction: Ec[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return v.jsx("div", { className: Zt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: v.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: i ? void 0 : -1, onKeyDown: i ? void 0 : b, style: {
    width: s,
    height: u
  } }) });
}
const Ob = typeof window < "u" ? window : void 0, Tj = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Yw({ children: e, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: y, selectionMode: g, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: w, panActivationKeyCode: R, zoomActivationKeyCode: C, elementsSelectable: N, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: H, panOnScrollMode: B, zoomOnDoubleClick: U, panOnDrag: A, autoPanOnSelection: I, defaultViewport: Q, translateExtent: $, minZoom: K, maxZoom: ne, preventScrolling: L, onSelectionContextMenu: Y, noWheelClassName: T, noPanClassName: z, disableKeyboardA11y: F, onViewportChange: X, isControlledViewport: ae }) {
  const { nodesSelectionActive: j, userSelectionActive: k } = st(Tj, At), G = rs(m, { target: Ob }), ee = rs(R, { target: Ob }), se = ee || A, de = ee || O, he = y && se !== !0, J = G || k || he;
  return sj({ deleteKeyCode: p, multiSelectionKeyCode: w }), v.jsx(fj, { onPaneContextMenu: u, elementsSelectable: N, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: de, panOnScrollSpeed: H, panOnScrollMode: B, zoomOnDoubleClick: U, panOnDrag: !G && se, defaultViewport: Q, translateExtent: $, minZoom: K, maxZoom: ne, zoomActivationKeyCode: C, preventScrolling: L, noWheelClassName: T, noPanClassName: z, onViewportChange: X, isControlledViewport: ae, paneClickDistance: d, selectionOnDrag: he, children: v.jsxs(pj, { onSelectionStart: b, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: i, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: I, isSelecting: !!J, selectionMode: g, selectionKeyPressed: G, paneClickDistance: d, selectionOnDrag: he, children: [e, j && v.jsx(Rj, { onSelectionContextMenu: Y, noPanClassName: z, disableKeyboardA11y: F })] }) });
}
Yw.displayName = "FlowRenderer";
const Mj = S.memo(Yw), Dj = (e) => (a) => e ? Ym(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((i) => i.id) : Array.from(a.nodeLookup.keys());
function Aj(e) {
  return st(S.useCallback(Dj(e), [e]), At);
}
const jj = (e) => e.updateNodeInternals;
function Oj() {
  const e = st(jj), [a] = S.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((i) => {
    const l = /* @__PURE__ */ new Map();
    i.forEach((s) => {
      const u = s.target.getAttribute("data-id");
      l.set(u, {
        id: u,
        nodeElement: s.target,
        force: !0
      });
    }), e(l);
  }));
  return S.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function zj({ node: e, nodeType: a, hasDimensions: i, resizeObserver: l }) {
  const s = jt(), u = S.useRef(null), c = S.useRef(null), d = S.useRef(e.sourcePosition), p = S.useRef(e.targetPosition), m = S.useRef(a), y = i && !!e.internals.handleBounds;
  return S.useEffect(() => {
    u.current && !e.hidden && (!y || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [y, e.hidden]), S.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), S.useEffect(() => {
    if (u.current) {
      const g = m.current !== a, b = d.current !== e.sourcePosition, x = p.current !== e.targetPosition;
      (g || b || x) && (m.current = a, d.current = e.sourcePosition, p.current = e.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [e.id, a, e.sourcePosition, e.targetPosition]), u;
}
function Lj({ id: e, onClick: a, onMouseEnter: i, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: y, resizeObserver: g, noDragClassName: b, noPanClassName: x, disableKeyboardA11y: w, rfId: R, nodeTypes: C, nodeClickDistance: N, onError: D }) {
  const { node: E, internals: O, isParent: H } = st((J) => {
    const ve = J.nodeLookup.get(e), De = J.parentLookup.has(e);
    return {
      node: ve,
      internals: ve.internals,
      isParent: De
    };
  }, At);
  let B = E.type || "default", U = C?.[B] || jb[B];
  U === void 0 && (D?.("003", Ra.error003(B)), B = "default", U = C?.default || jb.default);
  const A = !!(E.draggable || d && typeof E.draggable > "u"), I = !!(E.selectable || p && typeof E.selectable > "u"), Q = !!(E.connectable || m && typeof E.connectable > "u"), $ = !!(E.focusable || y && typeof E.focusable > "u"), K = jt(), ne = dw(E), L = zj({ node: E, nodeType: B, hasDimensions: ne, resizeObserver: g }), Y = $w({
    nodeRef: L,
    disabled: E.hidden || !A,
    noDragClassName: b,
    handleSelector: E.dragHandle,
    nodeId: e,
    isSelectable: I,
    nodeClickDistance: N
  }), T = qw();
  if (E.hidden)
    return null;
  const z = wr(E), F = Nj(E), X = I || A || a || i || l || s, ae = i ? (J) => i(J, { ...O.userNode }) : void 0, j = l ? (J) => l(J, { ...O.userNode }) : void 0, k = s ? (J) => s(J, { ...O.userNode }) : void 0, G = u ? (J) => u(J, { ...O.userNode }) : void 0, ee = c ? (J) => c(J, { ...O.userNode }) : void 0, se = (J) => {
    const { selectNodesOnDrag: ve, nodeDragThreshold: De } = K.getState();
    I && (!ve || !A || De > 0) && rm({
      id: e,
      store: K,
      nodeRef: L
    }), a && a(J, { ...O.userNode });
  }, de = (J) => {
    if (!(pw(J.nativeEvent) || w)) {
      if (aw.includes(J.key) && I) {
        const ve = J.key === "Escape";
        rm({
          id: e,
          store: K,
          unselect: ve,
          nodeRef: L
        });
      } else if (A && E.selected && Object.prototype.hasOwnProperty.call(Ec, J.key)) {
        J.preventDefault();
        const { ariaLabelConfig: ve } = K.getState();
        K.setState({
          ariaLiveMessage: ve["node.a11yDescription.ariaLiveMessage"]({
            direction: J.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), T({
          direction: Ec[J.key],
          factor: J.shiftKey ? 4 : 1
        });
      }
    }
  }, he = () => {
    if (w || !L.current?.matches(":focus-visible"))
      return;
    const { transform: J, width: ve, height: De, autoPanOnNodeFocus: Oe, setCenter: Ee } = K.getState();
    if (!Oe)
      return;
    Ym(/* @__PURE__ */ new Map([[e, E]]), { x: 0, y: 0, width: ve, height: De }, J, !0).length > 0 || Ee(E.position.x + z.width / 2, E.position.y + z.height / 2, {
      zoom: J[2]
    });
  };
  return v.jsx("div", { className: Zt([
    "react-flow__node",
    `react-flow__node-${B}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: A
    },
    E.className,
    {
      selected: E.selected,
      selectable: I,
      parent: H,
      draggable: A,
      dragging: Y
    }
  ]), ref: L, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: X ? "all" : "none",
    visibility: ne ? "visible" : "hidden",
    ...E.style,
    ...F
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: ae, onMouseMove: j, onMouseLeave: k, onContextMenu: G, onClick: se, onDoubleClick: ee, onKeyDown: $ ? de : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? he : void 0, role: E.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${Lw}-${R}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: v.jsx(vj, { value: e, children: v.jsx(U, { id: e, data: E.data, type: B, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: E.selected ?? !1, selectable: I, draggable: A, deletable: E.deletable ?? !0, isConnectable: Q, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: Y, dragHandle: E.dragHandle, zIndex: O.z, parentId: E.parentId, ...z }) }) });
}
var kj = S.memo(Lj);
const Hj = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Gw(e) {
  const { nodesDraggable: a, nodesConnectable: i, nodesFocusable: l, elementsSelectable: s, onError: u } = st(Hj, At), c = Aj(e.onlyRenderVisibleElements), d = Oj();
  return v.jsx("div", { className: "react-flow__nodes", style: Fc, children: c.map((p) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    v.jsx(kj, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: i, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
Gw.displayName = "NodeRenderer";
const Bj = S.memo(Gw);
function Uj(e) {
  return st(S.useCallback((i) => {
    if (!e)
      return i.edges.map((s) => s.id);
    const l = [];
    if (i.width && i.height)
      for (const s of i.edges) {
        const u = i.nodeLookup.get(s.source), c = i.nodeLookup.get(s.target);
        u && c && OD({
          sourceNode: u,
          targetNode: c,
          width: i.width,
          height: i.height,
          transform: i.transform
        }) && l.push(s.id);
      }
    return l;
  }, [e]), At);
}
const Vj = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return v.jsx("polyline", { className: "arrow", style: i, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, $j = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const i = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return v.jsx("polyline", { className: "arrowclosed", style: i, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, zb = {
  [_c.Arrow]: Vj,
  [_c.ArrowClosed]: $j
};
function qj(e) {
  const a = jt();
  return S.useMemo(() => Object.prototype.hasOwnProperty.call(zb, e) ? zb[e] : (a.getState().onError?.("009", Ra.error009(e)), null), [e]);
}
const Ij = ({ id: e, type: a, color: i, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = qj(a);
  return p ? v.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: v.jsx(p, { color: i, strokeWidth: c }) }) : null;
}, Fw = ({ defaultColor: e, rfId: a }) => {
  const i = st((u) => u.edges), l = st((u) => u.defaultEdgeOptions), s = S.useMemo(() => $D(i, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [i, l, a, e]);
  return s.length ? v.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: v.jsx("defs", { children: s.map((u) => v.jsx(Ij, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Fw.displayName = "MarkerDefinitions";
var Yj = S.memo(Fw);
function Xw({ x: e, y: a, label: i, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...y }) {
  const [g, b] = S.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Zt(["react-flow__edge-textwrapper", m]), w = S.useRef(null);
  return S.useEffect(() => {
    if (w.current) {
      const R = w.current.getBBox();
      b({
        x: R.x,
        y: R.y,
        width: R.width,
        height: R.height
      });
    }
  }, [i]), i ? v.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...y, children: [s && v.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), v.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: w, style: l, children: i }), p] }) : null;
}
Xw.displayName = "EdgeText";
const Gj = S.memo(Xw);
function Xc({ path: e, labelX: a, labelY: i, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...y }) {
  return v.jsxs(v.Fragment, { children: [v.jsx("path", { ...y, d: e, fill: "none", className: Zt(["react-flow__edge-path", y.className]) }), m ? v.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && Na(a) && Na(i) ? v.jsx(Gj, { x: a, y: i, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function Lb({ pos: e, x1: a, y1: i, x2: l, y2: s }) {
  return e === ke.Left || e === ke.Right ? [0.5 * (a + l), i] : [a, 0.5 * (i + s)];
}
function Pw({ sourceX: e, sourceY: a, sourcePosition: i = ke.Bottom, targetX: l, targetY: s, targetPosition: u = ke.Top }) {
  const [c, d] = Lb({
    pos: i,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = Lb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [y, g, b, x] = vw({
    sourceX: e,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: c,
    sourceControlY: d,
    targetControlX: p,
    targetControlY: m
  });
  return [
    `M${e},${a} C${c},${d} ${p},${m} ${l},${s}`,
    y,
    g,
    b,
    x
  ];
}
function Zw(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: w, markerEnd: R, markerStart: C, interactionWidth: N }) => {
    const [D, E, O] = Pw({
      sourceX: i,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), H = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: H, path: D, labelX: E, labelY: O, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: w, markerEnd: R, markerStart: C, interactionWidth: N });
  });
}
const Fj = Zw({ isInternal: !1 }), Qw = Zw({ isInternal: !0 });
Fj.displayName = "SimpleBezierEdge";
Qw.displayName = "SimpleBezierEdgeInternal";
function Kw(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, sourcePosition: x = ke.Bottom, targetPosition: w = ke.Top, markerEnd: R, markerStart: C, pathOptions: N, interactionWidth: D }) => {
    const [E, O, H] = em({
      sourceX: i,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: w,
      borderRadius: N?.borderRadius,
      offset: N?.offset,
      stepPosition: N?.stepPosition
    }), B = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: B, path: E, labelX: O, labelY: H, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: R, markerStart: C, interactionWidth: D });
  });
}
const Ww = Kw({ isInternal: !1 }), Jw = Kw({ isInternal: !0 });
Ww.displayName = "SmoothStepEdge";
Jw.displayName = "SmoothStepEdgeInternal";
function e_(e) {
  return S.memo(({ id: a, ...i }) => {
    const l = e.isInternal ? void 0 : a;
    return v.jsx(Ww, { ...i, id: l, pathOptions: S.useMemo(() => ({ borderRadius: 0, offset: i.pathOptions?.offset }), [i.pathOptions?.offset]) });
  });
}
const Xj = e_({ isInternal: !1 }), t_ = e_({ isInternal: !0 });
Xj.displayName = "StepEdge";
t_.displayName = "StepEdgeInternal";
function n_(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: w, interactionWidth: R }) => {
    const [C, N, D] = xw({ sourceX: i, sourceY: l, targetX: s, targetY: u }), E = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: E, path: C, labelX: N, labelY: D, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: w, interactionWidth: R });
  });
}
const Pj = n_({ isInternal: !1 }), a_ = n_({ isInternal: !0 });
Pj.displayName = "StraightEdge";
a_.displayName = "StraightEdgeInternal";
function r_(e) {
  return S.memo(({ id: a, sourceX: i, sourceY: l, targetX: s, targetY: u, sourcePosition: c = ke.Bottom, targetPosition: d = ke.Top, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: w, markerEnd: R, markerStart: C, pathOptions: N, interactionWidth: D }) => {
    const [E, O, H] = yw({
      sourceX: i,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: N?.curvature
    }), B = e.isInternal ? void 0 : a;
    return v.jsx(Xc, { id: B, path: E, labelX: O, labelY: H, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: w, markerEnd: R, markerStart: C, interactionWidth: D });
  });
}
const Zj = r_({ isInternal: !1 }), i_ = r_({ isInternal: !0 });
Zj.displayName = "BezierEdge";
i_.displayName = "BezierEdgeInternal";
const kb = {
  default: i_,
  straight: a_,
  step: t_,
  smoothstep: Jw,
  simplebezier: Qw
}, Hb = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, Qj = (e, a, i) => i === ke.Left ? e - a : i === ke.Right ? e + a : e, Kj = (e, a, i) => i === ke.Top ? e - a : i === ke.Bottom ? e + a : e, Bb = "react-flow__edgeupdater";
function Ub({ position: e, centerX: a, centerY: i, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return v.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Zt([Bb, `${Bb}-${d}`]), cx: Qj(a, l, e), cy: Kj(i, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function Wj({ isReconnectable: e, reconnectRadius: a, edge: i, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: y, onReconnectEnd: g, setReconnecting: b, setUpdateHover: x }) {
  const w = jt(), R = (O, H) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: B, domNode: U, connectionMode: A, connectionRadius: I, lib: Q, onConnectStart: $, cancelConnection: K, nodeLookup: ne, rfId: L, panBy: Y, updateConnection: T } = w.getState(), z = H.type === "target", F = (j, k) => {
      b(!1), g?.(j, i, H.type, k);
    }, X = (j) => m?.(i, j), ae = (j, k) => {
      b(!0), y?.(O, i, H.type), $?.(j, k);
    };
    am.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: B,
      connectionMode: A,
      connectionRadius: I,
      domNode: U,
      handleId: H.id,
      nodeId: H.nodeId,
      nodeLookup: ne,
      isTarget: z,
      edgeUpdaterType: H.type,
      lib: Q,
      flowId: L,
      cancelConnection: K,
      panBy: Y,
      isValidConnection: (...j) => w.getState().isValidConnection?.(...j) ?? !0,
      onConnect: X,
      onConnectStart: ae,
      onConnectEnd: (...j) => w.getState().onConnectEnd?.(...j),
      onReconnectEnd: F,
      updateConnection: T,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, C = (O) => R(O, { nodeId: i.target, id: i.targetHandle ?? null, type: "target" }), N = (O) => R(O, { nodeId: i.source, id: i.sourceHandle ?? null, type: "source" }), D = () => x(!0), E = () => x(!1);
  return v.jsxs(v.Fragment, { children: [(e === !0 || e === "source") && v.jsx(Ub, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: C, onMouseEnter: D, onMouseOut: E, type: "source" }), (e === !0 || e === "target") && v.jsx(Ub, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: N, onMouseEnter: D, onMouseOut: E, type: "target" })] });
}
function Jj({ id: e, edgesFocusable: a, edgesReconnectable: i, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: y, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, rfId: w, edgeTypes: R, noPanClassName: C, onError: N, disableKeyboardA11y: D }) {
  let E = st((Ee) => Ee.edgeLookup.get(e));
  const O = st((Ee) => Ee.defaultEdgeOptions);
  E = O ? { ...O, ...E } : E;
  let H = E.type || "default", B = R?.[H] || kb[H];
  B === void 0 && (N?.("011", Ra.error011(H)), H = "default", B = R?.default || kb.default);
  const U = !!(E.focusable || a && typeof E.focusable > "u"), A = typeof g < "u" && (E.reconnectable || i && typeof E.reconnectable > "u"), I = !!(E.selectable || l && typeof E.selectable > "u"), Q = S.useRef(null), [$, K] = S.useState(!1), [ne, L] = S.useState(!1), Y = jt(), { zIndex: T, sourceX: z, sourceY: F, targetX: X, targetY: ae, sourcePosition: j, targetPosition: k } = st(S.useCallback((Ee) => {
    const we = Ee.nodeLookup.get(E.source), Me = Ee.nodeLookup.get(E.target);
    if (!we || !Me)
      return {
        zIndex: E.zIndex,
        ...Hb
      };
    const Ye = VD({
      id: e,
      sourceNode: we,
      targetNode: Me,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: Ee.connectionMode,
      onError: N
    });
    return {
      zIndex: jD({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: we,
        targetNode: Me,
        elevateOnSelect: Ee.elevateEdgesOnSelect,
        zIndexMode: Ee.zIndexMode
      }),
      ...Ye || Hb
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), G = S.useMemo(() => E.markerStart ? `url('#${tm(E.markerStart, w)}')` : void 0, [E.markerStart, w]), ee = S.useMemo(() => E.markerEnd ? `url('#${tm(E.markerEnd, w)}')` : void 0, [E.markerEnd, w]);
  if (E.hidden || z === null || F === null || X === null || ae === null)
    return null;
  const se = (Ee) => {
    const { addSelectedEdges: we, unselectNodesAndEdges: Me, multiSelectionActive: Ye } = Y.getState();
    I && (Y.setState({ nodesSelectionActive: !1 }), E.selected && Ye ? (Me({ nodes: [], edges: [E] }), Q.current?.blur()) : we([e])), s && s(Ee, E);
  }, de = u ? (Ee) => {
    u(Ee, { ...E });
  } : void 0, he = c ? (Ee) => {
    c(Ee, { ...E });
  } : void 0, J = d ? (Ee) => {
    d(Ee, { ...E });
  } : void 0, ve = p ? (Ee) => {
    p(Ee, { ...E });
  } : void 0, De = m ? (Ee) => {
    m(Ee, { ...E });
  } : void 0, Oe = (Ee) => {
    if (!D && aw.includes(Ee.key) && I) {
      const { unselectNodesAndEdges: we, addSelectedEdges: Me } = Y.getState();
      Ee.key === "Escape" ? (Q.current?.blur(), we({ edges: [E] })) : Me([e]);
    }
  };
  return v.jsx("svg", { style: { zIndex: T }, children: v.jsxs("g", { className: Zt([
    "react-flow__edge",
    `react-flow__edge-${H}`,
    E.className,
    C,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !I && !s,
      updating: $,
      selectable: I
    }
  ]), onClick: se, onDoubleClick: de, onContextMenu: he, onMouseEnter: J, onMouseMove: ve, onMouseLeave: De, onKeyDown: U ? Oe : void 0, tabIndex: U ? 0 : void 0, role: E.ariaRole ?? (U ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": U ? `${kw}-${w}` : void 0, ref: Q, ...E.domAttributes, children: [!ne && v.jsx(B, { id: e, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: I, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: z, sourceY: F, targetX: X, targetY: ae, sourcePosition: j, targetPosition: k, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: G, markerEnd: ee, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), A && v.jsx(Wj, { edge: E, isReconnectable: A, reconnectRadius: y, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, sourceX: z, sourceY: F, targetX: X, targetY: ae, sourcePosition: j, targetPosition: k, setUpdateHover: K, setReconnecting: L })] }) });
}
var e4 = S.memo(Jj);
const t4 = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function l_({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: i, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: g, onEdgeDoubleClick: b, onReconnectStart: x, onReconnectEnd: w, disableKeyboardA11y: R }) {
  const { edgesFocusable: C, edgesReconnectable: N, elementsSelectable: D, onError: E } = st(t4, At), O = Uj(a);
  return v.jsxs("div", { className: "react-flow__edges", children: [v.jsx(Yj, { defaultColor: e, rfId: i }), O.map((H) => v.jsx(e4, { id: H, edgesFocusable: C, edgesReconnectable: N, elementsSelectable: D, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: y, reconnectRadius: g, onDoubleClick: b, onReconnectStart: x, onReconnectEnd: w, rfId: i, onError: E, edgeTypes: l, disableKeyboardA11y: R }, H))] });
}
l_.displayName = "EdgeRenderer";
const n4 = S.memo(l_), a4 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function r4({ children: e }) {
  const a = st(a4);
  return v.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function i4(e) {
  const a = Jm(), i = S.useRef(!1);
  S.useEffect(() => {
    !i.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), i.current = !0);
  }, [e, a.viewportInitialized]);
}
const l4 = (e) => e.panZoom?.syncViewport;
function o4(e) {
  const a = st(l4), i = jt();
  return S.useEffect(() => {
    e && (a?.(e), i.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function s4(e) {
  return e.connection.inProgress ? { ...e.connection, to: Ul(e.connection.to, e.transform) } : { ...e.connection };
}
function u4(e) {
  return s4;
}
function c4(e) {
  const a = u4();
  return st(a, At);
}
const f4 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function d4({ containerStyle: e, style: a, type: i, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = st(f4, At);
  return !(u && s && p) ? null : v.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: v.jsx("g", { className: Zt(["react-flow__connection", lw(d)]), children: v.jsx(o_, { style: a, type: i, CustomComponent: l, isValid: d }) }) });
}
const o_ = ({ style: e, type: a = ei.Bezier, CustomComponent: i, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: y, toHandle: g, toPosition: b, pointer: x } = c4();
  if (!s)
    return;
  if (i)
    return v.jsx(i, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: b, connectionStatus: lw(l), toNode: y, toHandle: g, pointer: x });
  let w = "";
  const R = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: b
  };
  switch (a) {
    case ei.Bezier:
      [w] = yw(R);
      break;
    case ei.SimpleBezier:
      [w] = Pw(R);
      break;
    case ei.Step:
      [w] = em({
        ...R,
        borderRadius: 0
      });
      break;
    case ei.SmoothStep:
      [w] = em(R);
      break;
    default:
      [w] = xw(R);
  }
  return v.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: e });
};
o_.displayName = "ConnectionLine";
const h4 = {};
function Vb(e = h4) {
  S.useRef(e), jt(), S.useEffect(() => {
  }, [e]);
}
function m4() {
  jt(), S.useRef(!1), S.useEffect(() => {
  }, []);
}
function s_({ nodeTypes: e, edgeTypes: a, onInit: i, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: g, onSelectionStart: b, onSelectionEnd: x, connectionLineType: w, connectionLineStyle: R, connectionLineComponent: C, connectionLineContainerStyle: N, selectionKeyCode: D, selectionOnDrag: E, selectionMode: O, multiSelectionKeyCode: H, panActivationKeyCode: B, zoomActivationKeyCode: U, deleteKeyCode: A, onlyRenderVisibleElements: I, elementsSelectable: Q, defaultViewport: $, translateExtent: K, minZoom: ne, maxZoom: L, preventScrolling: Y, defaultMarkerColor: T, zoomOnScroll: z, zoomOnPinch: F, panOnScroll: X, panOnScrollSpeed: ae, panOnScrollMode: j, zoomOnDoubleClick: k, panOnDrag: G, autoPanOnSelection: ee, onPaneClick: se, onPaneMouseEnter: de, onPaneMouseMove: he, onPaneMouseLeave: J, onPaneScroll: ve, onPaneContextMenu: De, paneClickDistance: Oe, nodeClickDistance: Ee, onEdgeContextMenu: we, onEdgeMouseEnter: Me, onEdgeMouseMove: Ye, onEdgeMouseLeave: ye, reconnectRadius: pe, onReconnect: _e, onReconnectStart: Re, onReconnectEnd: Ae, noDragClassName: lt, noWheelClassName: Ze, noPanClassName: Fe, disableKeyboardA11y: Ke, nodeExtent: vt, rfId: yt, viewport: Yt, onViewportChange: Lt }) {
  return Vb(e), Vb(a), m4(), i4(i), o4(Yt), v.jsx(Mj, { onPaneClick: se, onPaneMouseEnter: de, onPaneMouseMove: he, onPaneMouseLeave: J, onPaneContextMenu: De, onPaneScroll: ve, paneClickDistance: Oe, deleteKeyCode: A, selectionKeyCode: D, selectionOnDrag: E, selectionMode: O, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: H, panActivationKeyCode: B, zoomActivationKeyCode: U, elementsSelectable: Q, zoomOnScroll: z, zoomOnPinch: F, zoomOnDoubleClick: k, panOnScroll: X, panOnScrollSpeed: ae, panOnScrollMode: j, panOnDrag: G, autoPanOnSelection: ee, defaultViewport: $, translateExtent: K, minZoom: ne, maxZoom: L, onSelectionContextMenu: g, preventScrolling: Y, noDragClassName: lt, noWheelClassName: Ze, noPanClassName: Fe, disableKeyboardA11y: Ke, onViewportChange: Lt, isControlledViewport: !!Yt, children: v.jsxs(r4, { children: [v.jsx(n4, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: _e, onReconnectStart: Re, onReconnectEnd: Ae, onlyRenderVisibleElements: I, onEdgeContextMenu: we, onEdgeMouseEnter: Me, onEdgeMouseMove: Ye, onEdgeMouseLeave: ye, reconnectRadius: pe, defaultMarkerColor: T, noPanClassName: Fe, disableKeyboardA11y: Ke, rfId: yt }), v.jsx(d4, { style: R, type: w, component: C, containerStyle: N }), v.jsx("div", { className: "react-flow__edgelabel-renderer" }), v.jsx(Bj, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: Ee, onlyRenderVisibleElements: I, noPanClassName: Fe, noDragClassName: lt, disableKeyboardA11y: Ke, nodeExtent: vt, rfId: yt }), v.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
s_.displayName = "GraphView";
const p4 = S.memo(s_), g4 = fw(), $b = ({ nodes: e, edges: a, defaultNodes: i, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: g, zIndexMode: b = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), N = l ?? a ?? [], D = i ?? e ?? [], E = y ?? [0, 0], O = g ?? es;
  Sw(R, C, N);
  const { nodesInitialized: H } = nm(D, x, w, {
    nodeOrigin: E,
    nodeExtent: O,
    zIndexMode: b
  });
  let B = [0, 0, 1];
  if (c && s && u) {
    const U = vs(x, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: A, y: I, zoom: Q } = Fm(U, s, u, p, m, d?.padding ?? 0.1);
    B = [A, I, Q];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: B,
    nodes: D,
    nodesInitialized: H,
    nodeLookup: x,
    parentLookup: w,
    edges: N,
    edgeLookup: C,
    connectionLookup: R,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: i !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: es,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Dl.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: E,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: c ?? !1,
    fitViewOptions: d,
    fitViewResolver: null,
    connection: { ...iw },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: g4,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: rw,
    zIndexMode: b,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, v4 = ({ nodes: e, edges: a, defaultNodes: i, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: y, nodeExtent: g, zIndexMode: b }) => TA((x, w) => {
  async function R() {
    const { nodeLookup: C, panZoom: N, fitViewOptions: D, fitViewResolver: E, width: O, height: H, minZoom: B, maxZoom: U } = w();
    N && (await ND({
      nodes: C,
      width: O,
      height: H,
      panZoom: N,
      minZoom: B,
      maxZoom: U
    }, D), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...$b({
      nodes: e,
      edges: a,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: d,
      minZoom: p,
      maxZoom: m,
      nodeOrigin: y,
      nodeExtent: g,
      defaultNodes: i,
      defaultEdges: l,
      zIndexMode: b
    }),
    setNodes: (C) => {
      const { nodeLookup: N, parentLookup: D, nodeOrigin: E, elevateNodesOnSelect: O, fitViewQueued: H, zIndexMode: B, nodesSelectionActive: U } = w(), { nodesInitialized: A, hasSelectedNodes: I } = nm(C, N, D, {
        nodeOrigin: E,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: B
      }), Q = U && I;
      H && A ? (R(), x({
        nodes: C,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: Q
      })) : x({ nodes: C, nodesInitialized: A, nodesSelectionActive: Q });
    },
    setEdges: (C) => {
      const { connectionLookup: N, edgeLookup: D } = w();
      Sw(N, D, C), x({ edges: C });
    },
    setDefaultNodesAndEdges: (C, N) => {
      if (C) {
        const { setNodes: D } = w();
        D(C), x({ hasDefaultNodes: !0 });
      }
      if (N) {
        const { setEdges: D } = w();
        D(N), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (C) => {
      const { triggerNodeChanges: N, nodeLookup: D, parentLookup: E, domNode: O, nodeOrigin: H, nodeExtent: B, debug: U, fitViewQueued: A, zIndexMode: I } = w(), { changes: Q, updatedInternals: $ } = PD(C, D, E, O, H, B, I);
      $ && (YD(D, E, { nodeOrigin: H, nodeExtent: B, zIndexMode: I }), A ? (R(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), Q?.length > 0 && (U && console.log("React Flow: trigger node changes", Q), N?.(Q)));
    },
    updateNodePositions: (C, N = !1) => {
      const D = [];
      let E = [];
      const { nodeLookup: O, triggerNodeChanges: H, connection: B, updateConnection: U, onNodesChangeMiddlewareMap: A } = w();
      for (const [I, Q] of C) {
        const $ = O.get(I), K = !!($?.expandParent && $?.parentId && Q?.position), ne = {
          id: I,
          type: "position",
          position: K ? {
            x: Math.max(0, Q.position.x),
            y: Math.max(0, Q.position.y)
          } : Q.position,
          dragging: N
        };
        if ($ && B.inProgress && B.fromNode.id === $.id) {
          const L = ji($, B.fromHandle, ke.Left, !0);
          U({ ...B, from: L });
        }
        K && $.parentId && D.push({
          id: I,
          parentId: $.parentId,
          rect: {
            ...Q.internals.positionAbsolute,
            width: Q.measured.width ?? 0,
            height: Q.measured.height ?? 0
          }
        }), E.push(ne);
      }
      if (D.length > 0) {
        const { parentLookup: I, nodeOrigin: Q } = w(), $ = Wm(D, O, I, Q);
        E.push(...$);
      }
      for (const I of A.values())
        E = I(E);
      H(E);
    },
    triggerNodeChanges: (C) => {
      const { onNodesChange: N, setNodes: D, nodes: E, hasDefaultNodes: O, debug: H } = w();
      if (C?.length) {
        if (O) {
          const B = KA(C, E);
          D(B);
        }
        H && console.log("React Flow: trigger node changes", C), N?.(C);
      }
    },
    triggerEdgeChanges: (C) => {
      const { onEdgesChange: N, setEdges: D, edges: E, hasDefaultEdges: O, debug: H } = w();
      if (C?.length) {
        if (O) {
          const B = WA(C, E);
          D(B);
        }
        H && console.log("React Flow: trigger edge changes", C), N?.(C);
      }
    },
    addSelectedNodes: (C) => {
      const { multiSelectionActive: N, edgeLookup: D, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = w();
      if (N) {
        const B = C.map((U) => wi(U, !0));
        O(B);
        return;
      }
      O(Sl(E, /* @__PURE__ */ new Set([...C]), !0)), H(Sl(D));
    },
    addSelectedEdges: (C) => {
      const { multiSelectionActive: N, edgeLookup: D, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = w();
      if (N) {
        const B = C.map((U) => wi(U, !0));
        H(B);
        return;
      }
      H(Sl(D, /* @__PURE__ */ new Set([...C]))), O(Sl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: C, edges: N } = {}) => {
      const { edges: D, nodes: E, nodeLookup: O, triggerNodeChanges: H, triggerEdgeChanges: B } = w(), U = C || E, A = N || D, I = [];
      for (const $ of U) {
        if (!$.selected)
          continue;
        const K = O.get($.id);
        K && (K.selected = !1), I.push(wi($.id, !1));
      }
      const Q = [];
      for (const $ of A)
        $.selected && Q.push(wi($.id, !1));
      H(I), B(Q);
    },
    setMinZoom: (C) => {
      const { panZoom: N, maxZoom: D } = w();
      N?.setScaleExtent([C, D]), x({ minZoom: C });
    },
    setMaxZoom: (C) => {
      const { panZoom: N, minZoom: D } = w();
      N?.setScaleExtent([D, C]), x({ maxZoom: C });
    },
    setTranslateExtent: (C) => {
      w().panZoom?.setTranslateExtent(C), x({ translateExtent: C });
    },
    resetSelectedElements: () => {
      const { edges: C, nodes: N, triggerNodeChanges: D, triggerEdgeChanges: E, elementsSelectable: O } = w();
      if (!O)
        return;
      const H = N.reduce((U, A) => A.selected ? [...U, wi(A.id, !1)] : U, []), B = C.reduce((U, A) => A.selected ? [...U, wi(A.id, !1)] : U, []);
      D(H), E(B);
    },
    setNodeExtent: (C) => {
      const { nodes: N, nodeLookup: D, parentLookup: E, nodeOrigin: O, elevateNodesOnSelect: H, nodeExtent: B, zIndexMode: U } = w();
      C[0][0] === B[0][0] && C[0][1] === B[0][1] && C[1][0] === B[1][0] && C[1][1] === B[1][1] || (nm(N, D, E, {
        nodeOrigin: O,
        nodeExtent: C,
        elevateNodesOnSelect: H,
        checkEquality: !1,
        zIndexMode: U
      }), x({ nodeExtent: C }));
    },
    panBy: (C) => {
      const { transform: N, width: D, height: E, panZoom: O, translateExtent: H } = w();
      return ZD({ delta: C, panZoom: O, transform: N, translateExtent: H, width: D, height: E });
    },
    setCenter: async (C, N, D) => {
      const { width: E, height: O, maxZoom: H, panZoom: B } = w();
      if (!B)
        return !1;
      const U = typeof D?.zoom < "u" ? D.zoom : H;
      return await B.setViewport({
        x: E / 2 - C * U,
        y: O / 2 - N * U,
        zoom: U
      }, { duration: D?.duration, ease: D?.ease, interpolate: D?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...iw }
      });
    },
    updateConnection: (C) => {
      x({ connection: C });
    },
    reset: () => x({ ...$b() })
  };
}, Object.is);
function u_({ initialNodes: e, initialEdges: a, defaultNodes: i, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: y, nodeExtent: g, zIndexMode: b, children: x }) {
  const [w] = S.useState(() => v4({
    nodes: e,
    edges: a,
    defaultNodes: i,
    defaultEdges: l,
    width: s,
    height: u,
    fitView: m,
    minZoom: c,
    maxZoom: d,
    fitViewOptions: p,
    nodeOrigin: y,
    nodeExtent: g,
    zIndexMode: b
  }));
  return v.jsx(AA, { value: w, children: v.jsx(rj, { children: x }) });
}
function y4({ children: e, nodes: a, edges: i, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: b, zIndexMode: x }) {
  return S.useContext(Yc) ? v.jsx(v.Fragment, { children: e }) : v.jsx(u_, { initialNodes: a, initialEdges: i, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: g, nodeExtent: b, zIndexMode: x, children: e });
}
const b4 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function x4({ nodes: e, edges: a, defaultNodes: i, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: y, onMoveStart: g, onMoveEnd: b, onConnect: x, onConnectStart: w, onConnectEnd: R, onClickConnectStart: C, onClickConnectEnd: N, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: B, onNodeDragStart: U, onNodeDrag: A, onNodeDragStop: I, onNodesDelete: Q, onEdgesDelete: $, onDelete: K, onSelectionChange: ne, onSelectionDragStart: L, onSelectionDrag: Y, onSelectionDragStop: T, onSelectionContextMenu: z, onSelectionStart: F, onSelectionEnd: X, onBeforeDelete: ae, connectionMode: j, connectionLineType: k = ei.Bezier, connectionLineStyle: G, connectionLineComponent: ee, connectionLineContainerStyle: se, deleteKeyCode: de = "Backspace", selectionKeyCode: he = "Shift", selectionOnDrag: J = !1, selectionMode: ve = ts.Full, panActivationKeyCode: De = "Space", multiSelectionKeyCode: Oe = as() ? "Meta" : "Control", zoomActivationKeyCode: Ee = as() ? "Meta" : "Control", snapToGrid: we, snapGrid: Me, onlyRenderVisibleElements: Ye = !1, selectNodesOnDrag: ye, nodesDraggable: pe, autoPanOnNodeFocus: _e, nodesConnectable: Re, nodesFocusable: Ae, nodeOrigin: lt = Hw, edgesFocusable: Ze, edgesReconnectable: Fe, elementsSelectable: Ke = !0, defaultViewport: vt = YA, minZoom: yt = 0.5, maxZoom: Yt = 2, translateExtent: Lt = es, preventScrolling: pt = !0, nodeExtent: ut, defaultMarkerColor: Zn = "#b1b1b7", zoomOnScroll: _n = !0, zoomOnPinch: nn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = Ni.Free, zoomOnDoubleClick: _r = !0, panOnDrag: Aa = !0, onPaneClick: Sn, onPaneMouseEnter: ma, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: fn, onPaneContextMenu: Ve, paneClickDistance: bt = 1, nodeClickDistance: kt = 0, children: Vt, onReconnect: gn, onReconnectStart: gt, onReconnectEnd: Wt, onEdgeContextMenu: pa, onEdgeDoubleClick: en, onEdgeMouseEnter: V, onEdgeMouseMove: Z, onEdgeMouseLeave: te, reconnectRadius: me = 10, onNodesChange: ge, onEdgesChange: Ce, noDragClassName: xe = "nodrag", noWheelClassName: Ne = "nowheel", noPanClassName: Se = "nopan", fitView: ze, fitViewOptions: Le, connectOnClick: qe, attributionPosition: Be, proOptions: Pe, defaultEdgeOptions: ot, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: ct = !1, disableKeyboardA11y: et = !1, autoPanOnConnect: zt, autoPanOnNodeDrag: rt, autoPanOnSelection: ja = !0, autoPanSpeed: kn, connectionRadius: dn, isValidConnection: an, onError: En, style: Sr, id: Nn, nodeDragThreshold: Er, connectionDragThreshold: ga, viewport: va, onViewportChange: $e, width: xt, height: vn, colorMode: Hn = "light", debug: Nr, onScroll: Xa, ariaLabelConfig: ht, zIndexMode: Kn = "basic", ...rn }, ai) {
  const ki = Nn || "1", Vl = PA(Hn), Cr = S.useCallback(($l) => {
    $l.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Xa?.($l);
  }, [Xa]);
  return v.jsx("div", { "data-testid": "rf__wrapper", ...rn, onScroll: Cr, style: { ...Sr, ...b4 }, ref: ai, className: Zt(["react-flow", s, Vl]), id: Nn, role: "application", children: v.jsxs(y4, { nodes: e, edges: a, width: xt, height: vn, fitView: ze, fitViewOptions: Le, minZoom: yt, maxZoom: Yt, nodeOrigin: lt, nodeExtent: ut, zIndexMode: Kn, children: [v.jsx(XA, { nodes: e, edges: a, defaultNodes: i, defaultEdges: l, onConnect: x, onConnectStart: w, onConnectEnd: R, onClickConnectStart: C, onClickConnectEnd: N, nodesDraggable: pe, autoPanOnNodeFocus: _e, nodesConnectable: Re, nodesFocusable: Ae, edgesFocusable: Ze, edgesReconnectable: Fe, elementsSelectable: Ke, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: ct, minZoom: yt, maxZoom: Yt, nodeExtent: ut, onNodesChange: ge, onEdgesChange: Ce, snapToGrid: we, snapGrid: Me, connectionMode: j, translateExtent: Lt, connectOnClick: qe, defaultEdgeOptions: ot, fitView: ze, fitViewOptions: Le, onNodesDelete: Q, onEdgesDelete: $, onDelete: K, onNodeDragStart: U, onNodeDrag: A, onNodeDragStop: I, onSelectionDrag: Y, onSelectionDragStart: L, onSelectionDragStop: T, onMove: y, onMoveStart: g, onMoveEnd: b, noPanClassName: Se, nodeOrigin: lt, rfId: ki, autoPanOnConnect: zt, autoPanOnNodeDrag: rt, autoPanSpeed: kn, onError: En, connectionRadius: dn, isValidConnection: an, selectNodesOnDrag: ye, nodeDragThreshold: Er, connectionDragThreshold: ga, onBeforeDelete: ae, debug: Nr, ariaLabelConfig: ht, zIndexMode: Kn }), v.jsx(p4, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: B, nodeTypes: u, edgeTypes: c, connectionLineType: k, connectionLineStyle: G, connectionLineComponent: ee, connectionLineContainerStyle: se, selectionKeyCode: he, selectionOnDrag: J, selectionMode: ve, deleteKeyCode: de, multiSelectionKeyCode: Oe, panActivationKeyCode: De, zoomActivationKeyCode: Ee, onlyRenderVisibleElements: Ye, defaultViewport: vt, translateExtent: Lt, minZoom: yt, maxZoom: Yt, preventScrolling: pt, zoomOnScroll: _n, zoomOnPinch: nn, zoomOnDoubleClick: _r, panOnScroll: Kt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: Aa, autoPanOnSelection: ja, onPaneClick: Sn, onPaneMouseEnter: ma, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: fn, onPaneContextMenu: Ve, paneClickDistance: bt, nodeClickDistance: kt, onSelectionContextMenu: z, onSelectionStart: F, onSelectionEnd: X, onReconnect: gn, onReconnectStart: gt, onReconnectEnd: Wt, onEdgeContextMenu: pa, onEdgeDoubleClick: en, onEdgeMouseEnter: V, onEdgeMouseMove: Z, onEdgeMouseLeave: te, reconnectRadius: me, defaultMarkerColor: Zn, noDragClassName: xe, noWheelClassName: Ne, noPanClassName: Se, rfId: ki, disableKeyboardA11y: et, nodeExtent: ut, viewport: va, onViewportChange: $e }), v.jsx(IA, { onSelectionChange: ne }), Vt, v.jsx(BA, { proOptions: Pe, position: Be }), v.jsx(HA, { rfId: ki, disableKeyboardA11y: et })] }) });
}
var w4 = Uw(x4);
function _4({ dimensions: e, lineWidth: a, variant: i, className: l }) {
  return v.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Zt(["react-flow__background-pattern", i, l]) });
}
function S4({ radius: e, className: a }) {
  return v.jsx("circle", { cx: e, cy: e, r: e, className: Zt(["react-flow__background-pattern", "dots", a]) });
}
var Ya;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ya || (Ya = {}));
const E4 = {
  [Ya.Dots]: 1,
  [Ya.Lines]: 1,
  [Ya.Cross]: 6
}, N4 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function c_({
  id: e,
  variant: a = Ya.Dots,
  // only used for dots and cross
  gap: i = 20,
  // only used for lines and cross
  size: l,
  lineWidth: s = 1,
  offset: u = 0,
  color: c,
  bgColor: d,
  style: p,
  className: m,
  patternClassName: y
}) {
  const g = S.useRef(null), { transform: b, patternId: x } = st(N4, At), w = l || E4[a], R = a === Ya.Dots, C = a === Ya.Cross, N = Array.isArray(i) ? i : [i, i], D = [N[0] * b[2] || 1, N[1] * b[2] || 1], E = w * b[2], O = Array.isArray(u) ? u : [u, u], H = C ? [E, E] : D, B = [
    O[0] * b[2] || 1 + H[0] / 2,
    O[1] * b[2] || 1 + H[1] / 2
  ], U = `${x}${e || ""}`;
  return v.jsxs("svg", { className: Zt(["react-flow__background", m]), style: {
    ...p,
    ...Fc,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [v.jsx("pattern", { id: U, x: b[0] % D[0], y: b[1] % D[1], width: D[0], height: D[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${B[0]},-${B[1]})`, children: R ? v.jsx(S4, { radius: E / 2, className: y }) : v.jsx(_4, { dimensions: H, lineWidth: s, variant: a, className: y }) }), v.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${U})` })] });
}
c_.displayName = "Background";
const qb = S.memo(c_);
function C4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: v.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function R4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: v.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function T4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: v.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function M4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: v.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function D4() {
  return v.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: v.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function $u({ children: e, className: a, ...i }) {
  return v.jsx("button", { type: "button", className: Zt(["react-flow__controls-button", a]), ...i, children: e });
}
const A4 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function f_({ style: e, showZoom: a = !0, showFitView: i = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: y, position: g = "bottom-left", orientation: b = "vertical", "aria-label": x }) {
  const w = jt(), { isInteractive: R, minZoomReached: C, maxZoomReached: N, ariaLabelConfig: D } = st(A4, At), { zoomIn: E, zoomOut: O, fitView: H } = Jm(), B = () => {
    E(), u?.();
  }, U = () => {
    O(), c?.();
  }, A = () => {
    H(s), d?.();
  }, I = () => {
    w.setState({
      nodesDraggable: !R,
      nodesConnectable: !R,
      elementsSelectable: !R
    }), p?.(!R);
  }, Q = b === "horizontal" ? "horizontal" : "vertical";
  return v.jsxs(Gc, { className: Zt(["react-flow__controls", Q, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? D["controls.ariaLabel"], children: [a && v.jsxs(v.Fragment, { children: [v.jsx($u, { onClick: B, className: "react-flow__controls-zoomin", title: D["controls.zoomIn.ariaLabel"], "aria-label": D["controls.zoomIn.ariaLabel"], disabled: N, children: v.jsx(C4, {}) }), v.jsx($u, { onClick: U, className: "react-flow__controls-zoomout", title: D["controls.zoomOut.ariaLabel"], "aria-label": D["controls.zoomOut.ariaLabel"], disabled: C, children: v.jsx(R4, {}) })] }), i && v.jsx($u, { className: "react-flow__controls-fitview", onClick: A, title: D["controls.fitView.ariaLabel"], "aria-label": D["controls.fitView.ariaLabel"], children: v.jsx(T4, {}) }), l && v.jsx($u, { className: "react-flow__controls-interactive", onClick: I, title: D["controls.interactive.ariaLabel"], "aria-label": D["controls.interactive.ariaLabel"], children: R ? v.jsx(D4, {}) : v.jsx(M4, {}) }), y] });
}
f_.displayName = "Controls";
const j4 = S.memo(f_);
function O4({ id: e, x: a, y: i, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: y, shapeRendering: g, selected: b, onClick: x }) {
  const { background: w, backgroundColor: R } = u || {}, C = c || w || R;
  return v.jsx("rect", { className: Zt(["react-flow__minimap-node", { selected: b }, m]), x: a, y: i, rx: y, ry: y, width: l, height: s, style: {
    fill: C,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (N) => x(N, e) : void 0 });
}
const z4 = S.memo(O4), L4 = (e) => e.nodes.map((a) => a.id), Nh = (e) => e instanceof Function ? e : () => e;
function k4({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: i = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = z4,
  onClick: c
}) {
  const d = st(L4, At), p = Nh(a), m = Nh(e), y = Nh(i), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return v.jsx(v.Fragment, { children: d.map((b) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    v.jsx(B4, { id: b, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, b)
  )) });
}
function H4({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: i, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: y, y: g, width: b, height: x } = st((w) => {
    const R = w.nodeLookup.get(e);
    if (!R)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const C = R.internals.userNode, { x: N, y: D } = R.internals.positionAbsolute, { width: E, height: O } = wr(C);
    return {
      node: C,
      x: N,
      y: D,
      width: E,
      height: O
    };
  }, At);
  return !m || m.hidden || !dw(m) ? null : v.jsx(d, { x: y, y: g, width: b, height: x, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: i(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const B4 = S.memo(H4);
var U4 = S.memo(k4);
const V4 = 200, $4 = 150, q4 = (e) => !e.hidden, I4 = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? cw(vs(e.nodeLookup, { filter: q4 }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, Y4 = "react-flow__minimap-desc";
function d_({
  style: e,
  className: a,
  nodeStrokeColor: i,
  nodeColor: l,
  nodeClassName: s = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: c,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: d,
  bgColor: p,
  maskColor: m,
  maskStrokeColor: y,
  maskStrokeWidth: g,
  position: b = "bottom-right",
  onClick: x,
  onNodeClick: w,
  pannable: R = !1,
  zoomable: C = !1,
  ariaLabel: N,
  inversePan: D,
  zoomStep: E = 1,
  offsetScale: O = 5
}) {
  const H = jt(), B = S.useRef(null), { boundingRect: U, viewBB: A, rfId: I, panZoom: Q, translateExtent: $, flowWidth: K, flowHeight: ne, ariaLabelConfig: L } = st(I4, At), Y = e?.width ?? V4, T = e?.height ?? $4, z = U.width / Y, F = U.height / T, X = Math.max(z, F), ae = X * Y, j = X * T, k = O * X, G = U.x - (ae - U.width) / 2 - k, ee = U.y - (j - U.height) / 2 - k, se = ae + k * 2, de = j + k * 2, he = `${Y4}-${I}`, J = S.useRef(0), ve = S.useRef();
  J.current = X, S.useEffect(() => {
    if (B.current && Q)
      return ve.current = rA({
        domNode: B.current,
        panZoom: Q,
        getTransform: () => H.getState().transform,
        getViewScale: () => J.current
      }), () => {
        ve.current?.destroy();
      };
  }, [Q]), S.useEffect(() => {
    ve.current?.update({
      translateExtent: $,
      width: K,
      height: ne,
      inversePan: D,
      pannable: R,
      zoomStep: E,
      zoomable: C
    });
  }, [R, C, D, E, $, K, ne]);
  const De = x ? (we) => {
    const [Me, Ye] = ve.current?.pointer(we) || [0, 0];
    x(we, { x: Me, y: Ye });
  } : void 0, Oe = w ? S.useCallback((we, Me) => {
    const Ye = H.getState().nodeLookup.get(Me).internals.userNode;
    w(we, Ye);
  }, []) : void 0, Ee = N ?? L["minimap.ariaLabel"];
  return v.jsx(Gc, { position: b, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * X : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof i == "string" ? i : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Zt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: v.jsxs("svg", { width: Y, height: T, viewBox: `${G} ${ee} ${se} ${de}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": he, ref: B, onClick: De, children: [Ee && v.jsx("title", { id: he, children: Ee }), v.jsx(U4, { onClick: Oe, nodeColor: l, nodeStrokeColor: i, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), v.jsx("path", { className: "react-flow__minimap-mask", d: `M${G - k},${ee - k}h${se + k * 2}v${de + k * 2}h${-se - k * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
d_.displayName = "MiniMap";
const G4 = S.memo(d_), F4 = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, X4 = {
  [zl.Line]: "right",
  [zl.Handle]: "bottom-right"
};
function P4({ nodeId: e, position: a, variant: i = zl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: b, autoScale: x = !0, shouldResize: w, onResizeStart: R, onResize: C, onResizeEnd: N }) {
  const D = Iw(), E = typeof e == "string" ? e : D, O = jt(), H = S.useRef(null), B = i === zl.Handle, U = st(S.useCallback(F4(B && x), [B, x]), At), A = S.useRef(null), I = a ?? X4[i];
  S.useEffect(() => {
    if (!(!H.current || !E))
      return A.current || (A.current = vA({
        domNode: H.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: ne, snapToGrid: L, nodeOrigin: Y, domNode: T } = O.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: ne,
            snapToGrid: L,
            nodeOrigin: Y,
            paneDomNode: T
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: ne, nodeLookup: L, parentLookup: Y, nodeOrigin: T } = O.getState(), z = [], F = { x: $.x, y: $.y }, X = L.get(E);
          if (X && X.expandParent && X.parentId) {
            const ae = X.origin ?? T, j = $.width ?? X.measured.width ?? 0, k = $.height ?? X.measured.height ?? 0, G = {
              id: X.id,
              parentId: X.parentId,
              rect: {
                width: j,
                height: k,
                ...hw({
                  x: $.x ?? X.position.x,
                  y: $.y ?? X.position.y
                }, { width: j, height: k }, X.parentId, L, ae)
              }
            }, ee = Wm([G], L, Y, T);
            z.push(...ee), F.x = $.x ? Math.max(ae[0] * j, $.x) : void 0, F.y = $.y ? Math.max(ae[1] * k, $.y) : void 0;
          }
          if (F.x !== void 0 && F.y !== void 0) {
            const ae = {
              id: E,
              type: "position",
              position: { ...F }
            };
            z.push(ae);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const j = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: b ? b === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            z.push(j);
          }
          for (const ae of K) {
            const j = {
              ...ae,
              type: "position"
            };
            z.push(j);
          }
          ne(z);
        },
        onEnd: ({ width: $, height: K }) => {
          const ne = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: $,
              height: K
            }
          };
          O.getState().triggerNodeChanges([ne]);
        }
      })), A.current.update({
        controlPosition: I,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: g,
        resizeDirection: b,
        onResizeStart: R,
        onResize: C,
        onResizeEnd: N,
        shouldResize: w
      }), () => {
        A.current?.destroy();
      };
  }, [
    I,
    d,
    p,
    m,
    y,
    g,
    R,
    C,
    N,
    w
  ]);
  const Q = I.split("-");
  return v.jsx("div", { className: Zt(["react-flow__resize-control", "nodrag", ...Q, i, l]), ref: H, style: {
    ...s,
    scale: U,
    ...c && { [B ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
S.memo(P4);
var Z4 = "_1bllf8b0", Q4 = "_1bllf8b1";
const Ib = 16, K4 = "rgba(186, 158, 255, 0.14)", W4 = "rgba(186, 158, 255, 0.06)", J4 = "rgba(0, 0, 0, 0.6)", e3 = "#1d2023", t3 = "#ba9eff";
function n3({
  nodes: e,
  edges: a,
  nodeTypes: i,
  showMiniMap: l = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: d,
  children: p,
  onNodeClick: m
}) {
  const y = [Z4, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsx("div", { className: y, "aria-label": d ?? "node graph", children: /* @__PURE__ */ v.jsxs(
    w4,
    {
      nodes: e,
      edges: a,
      ...i ? { nodeTypes: i } : {},
      fitView: u,
      fitViewOptions: { padding: 0.2 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !0,
      minZoom: 0.2,
      maxZoom: 1.8,
      proOptions: { hideAttribution: !0 },
      onNodeClick: (g, b) => m?.(b),
      children: [
        /* @__PURE__ */ v.jsx(
          qb,
          {
            id: "minor",
            variant: Ya.Dots,
            gap: Ib,
            size: 1.1,
            color: K4
          }
        ),
        /* @__PURE__ */ v.jsx(
          qb,
          {
            id: "major",
            variant: Ya.Lines,
            gap: Ib * 5,
            lineWidth: 1,
            color: W4
          }
        ),
        s && /* @__PURE__ */ v.jsx(j4, { showInteractive: !1 }),
        l && /* @__PURE__ */ v.jsx(
          G4,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: J4,
            nodeColor: () => e3,
            nodeStrokeColor: () => t3,
            className: Q4
          }
        ),
        p
      ]
    }
  ) });
}
function a3(e) {
  return /* @__PURE__ */ v.jsx(u_, { children: /* @__PURE__ */ v.jsx(n3, { ...e }) });
}
var r3 = "a9gtw0", i3 = "a9gtw1", l3 = "a9gtw2", o3 = "a9gtw3", s3 = "a9gtw4", u3 = "a9gtw5", c3 = "a9gtw6", f3 = "a9gtw7";
const d3 = {
  default: "",
  raised: i3,
  inset: l3
};
function Va({
  title: e,
  description: a,
  actions: i,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [r3, d3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("section", { className: c, children: [
    (e || i) && /* @__PURE__ */ v.jsxs("header", { className: o3, children: [
      /* @__PURE__ */ v.jsxs("div", { className: s3, children: [
        e && /* @__PURE__ */ v.jsx("span", { className: c3, children: e }),
        a && /* @__PURE__ */ v.jsx("span", { className: f3, children: a })
      ] }),
      i && /* @__PURE__ */ v.jsx("div", { className: u3, children: i })
    ] }),
    l
  ] });
}
const tp = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function np() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function Nc() {
  return {
    phase: "idle",
    jobId: null,
    stage: null,
    stageDetail: null,
    overallFraction: 0,
    clipIndex: 0,
    numClips: 0,
    step: 0,
    totalSteps: 0,
    secondsPerStep: null,
    vramPeakGib: null,
    outputPath: null,
    renderReport: null,
    errorCode: null,
    errorMessage: null,
    stalled: !1,
    lastFrameAt: null,
    stageStates: np()
  };
}
function Yb(e, a, i = Date.now()) {
  return {
    ...Nc(),
    phase: "running",
    jobId: e,
    lastFrameAt: i,
    stageStates: {
      ...np(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function h3(e, a, i = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: i };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: v3(a.params.fraction),
        stage: a.params.stage ?? l.stage,
        stageDetail: a.params.detail ?? l.stageDetail
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: w3(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: b3(
          l.secondsPerStep,
          a.params.seconds_per_step
        )
      };
    case "svi2.video.clip.completed":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        stageStates: a.params.clip_index >= a.params.num_clips - 1 ? { ...l.stageStates, diffusion: "done", stitch: "active" } : l.stageStates
      };
    case "runtime.memory_stats": {
      const s = a.params.vram_peak_gib ?? a.params.vram_used_gib ?? null;
      return s === null ? l : { ...l, vramPeakGib: Math.max(s, l.vramPeakGib ?? 0) };
    }
    case "svi2.video.done":
      return {
        ...l,
        phase: "done",
        overallFraction: 1,
        outputPath: a.params.output_path,
        renderReport: a.params.render_report ?? null,
        vramPeakGib: a.params.render_report?.vram_peak_gib ?? l.vramPeakGib,
        stageStates: {
          anchor: "done",
          qwen_edit: l.stageStates.qwen_edit === "idle" ? "idle" : "done",
          diffusion: "done",
          stitch: "done",
          interpolate: "done",
          mux: "done"
        }
      };
    case "svi2.video.error":
      return {
        ...l,
        phase: "error",
        errorCode: a.params.code,
        errorMessage: a.params.message,
        stageStates: h_(l.stageStates)
      };
    default:
      return l;
  }
}
function m3(e) {
  return { ...e, phase: "cancelled", stageStates: np() };
}
const p3 = -32108;
function g3(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: p3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: h_(e.stageStates)
  };
}
function Gb(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function Ho(e) {
  const a = Nc();
  return e.status === "succeeded" && e.outputPath ? {
    ...a,
    phase: "done",
    jobId: e.id,
    overallFraction: 1,
    outputPath: e.outputPath,
    renderReport: e.renderReport,
    vramPeakGib: e.renderReport?.vram_peak_gib ?? null,
    stageStates: {
      anchor: "done",
      qwen_edit: "done",
      diffusion: "done",
      stitch: "done",
      interpolate: "done",
      mux: "done"
    }
  } : e.status === "failed" ? {
    ...a,
    phase: "error",
    jobId: e.id,
    errorCode: e.errorCode,
    errorMessage: e.errorMessage
  } : e.status === "cancelled" ? { ...a, phase: "cancelled", jobId: e.id } : { ...a, jobId: e.id };
}
function v3(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const y3 = 0.3;
function b3(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + y3 * (a - e);
}
function x3(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), i = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + i * e.totalSteps) * e.secondsPerStep;
}
function w3(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function h_(e) {
  const a = { ...e };
  for (const i of tp)
    a[i] === "active" && (a[i] = "error");
  return a;
}
function _3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e));
}
const S3 = (e) => {
  switch (e) {
    case "success":
      return C3;
    case "info":
      return T3;
    case "warning":
      return R3;
    case "error":
      return M3;
    default:
      return null;
  }
}, E3 = Array(12).fill(0), N3 = ({ visible: e, className: a }) => /* @__PURE__ */ be.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ be.createElement("div", {
  className: "sonner-spinner"
}, E3.map((i, l) => /* @__PURE__ */ be.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), C3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), R3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), T3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), M3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ be.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), D3 = /* @__PURE__ */ be.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ be.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ be.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), A3 = () => {
  const [e, a] = be.useState(document.hidden);
  return be.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), e;
};
let im = 1;
class j3 {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const i = this.subscribers.indexOf(a);
      this.subscribers.splice(i, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((i) => i(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var i;
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : im++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), c ? this.toasts = this.toasts.map((p) => p.id === u ? (this.publish({
        ...p,
        ...a,
        id: u,
        title: l
      }), {
        ...p,
        ...a,
        id: u,
        dismissible: d,
        title: l
      }) : p) : this.addToast({
        title: l,
        ...s,
        dismissible: d,
        id: u
      }), u;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((i) => i({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((i) => {
      this.subscribers.forEach((l) => l({
        id: i.id,
        dismiss: !0
      }));
    }), a), this.message = (a, i) => this.create({
      ...i,
      message: a
    }), this.error = (a, i) => this.create({
      ...i,
      message: a,
      type: "error"
    }), this.success = (a, i) => this.create({
      ...i,
      type: "success",
      message: a
    }), this.info = (a, i) => this.create({
      ...i,
      type: "info",
      message: a
    }), this.warning = (a, i) => this.create({
      ...i,
      type: "warning",
      message: a
    }), this.loading = (a, i) => this.create({
      ...i,
      type: "loading",
      message: a
    }), this.promise = (a, i) => {
      if (!i)
        return;
      let l;
      i.loading !== void 0 && (l = this.create({
        ...i,
        promise: a,
        type: "loading",
        message: i.loading,
        description: typeof i.description != "function" ? i.description : void 0
      }));
      const s = Promise.resolve(a instanceof Function ? a() : a);
      let u = l !== void 0, c;
      const d = s.then(async (m) => {
        if (c = [
          "resolve",
          m
        ], be.isValidElement(m))
          u = !1, this.create({
            id: l,
            type: "default",
            message: m
          });
        else if (z3(m) && !m.ok) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(`HTTP error! status: ${m.status}`) : i.error, b = typeof i.description == "function" ? await i.description(`HTTP error! status: ${m.status}`) : i.description, w = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ...w
          });
        } else if (m instanceof Error) {
          u = !1;
          const g = typeof i.error == "function" ? await i.error(m) : i.error, b = typeof i.description == "function" ? await i.description(m) : i.description, w = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ...w
          });
        } else if (i.success !== void 0) {
          u = !1;
          const g = typeof i.success == "function" ? await i.success(m) : i.success, b = typeof i.description == "function" ? await i.description(m) : i.description, w = typeof g == "object" && !be.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "success",
            description: b,
            ...w
          });
        }
      }).catch(async (m) => {
        if (c = [
          "reject",
          m
        ], i.error !== void 0) {
          u = !1;
          const y = typeof i.error == "function" ? await i.error(m) : i.error, g = typeof i.description == "function" ? await i.description(m) : i.description, x = typeof y == "object" && !be.isValidElement(y) ? y : {
            message: y
          };
          this.create({
            id: l,
            type: "error",
            description: g,
            ...x
          });
        }
      }).finally(() => {
        u && (this.dismiss(l), l = void 0), i.finally == null || i.finally.call(i);
      }), p = () => new Promise((m, y) => d.then(() => c[0] === "reject" ? y(c[1]) : m(c[1])).catch(y));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: p
      } : Object.assign(l, {
        unwrap: p
      });
    }, this.custom = (a, i) => {
      const l = i?.id || im++;
      return this.create({
        jsx: a(l),
        id: l,
        ...i
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const jn = new j3(), O3 = (e, a) => {
  const i = a?.id || im++;
  return jn.addToast({
    title: e,
    ...a,
    id: i
  }), i;
}, z3 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", L3 = O3, k3 = () => jn.toasts, H3 = () => jn.getActiveToasts(), ca = Object.assign(L3, {
  success: jn.success,
  info: jn.info,
  warning: jn.warning,
  error: jn.error,
  custom: jn.custom,
  message: jn.message,
  promise: jn.promise,
  dismiss: jn.dismiss,
  loading: jn.loading
}, {
  getHistory: k3,
  getToasts: H3
});
_3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function qu(e) {
  return e.label !== void 0;
}
const B3 = 3, U3 = "24px", V3 = "16px", Fb = 4e3, $3 = 356, q3 = 14, I3 = 45, Y3 = 200;
function Ba(...e) {
  return e.filter(Boolean).join(" ");
}
function G3(e) {
  const [a, i] = e.split("-"), l = [];
  return a && l.push(a), i && l.push(i), l;
}
const F3 = (e) => {
  var a, i, l, s, u, c, d, p, m;
  const { invert: y, toast: g, unstyled: b, interacting: x, setHeights: w, visibleToasts: R, heights: C, index: N, toasts: D, expanded: E, removeToast: O, defaultRichColors: H, closeButton: B, style: U, cancelButtonStyle: A, actionButtonStyle: I, className: Q = "", descriptionClassName: $ = "", duration: K, position: ne, gap: L, expandByDefault: Y, classNames: T, icons: z, closeButtonAriaLabel: F = "Close toast" } = e, [X, ae] = be.useState(null), [j, k] = be.useState(null), [G, ee] = be.useState(!1), [se, de] = be.useState(!1), [he, J] = be.useState(!1), [ve, De] = be.useState(!1), [Oe, Ee] = be.useState(!1), [we, Me] = be.useState(0), [Ye, ye] = be.useState(0), pe = be.useRef(g.duration || K || Fb), _e = be.useRef(null), Re = be.useRef(null), Ae = N === 0, lt = N + 1 <= R, Ze = g.type, Fe = g.dismissible !== !1, Ke = g.className || "", vt = g.descriptionClassName || "", yt = be.useMemo(() => C.findIndex((Ve) => Ve.toastId === g.id) || 0, [
    C,
    g.id
  ]), Yt = be.useMemo(() => {
    var Ve;
    return (Ve = g.closeButton) != null ? Ve : B;
  }, [
    g.closeButton,
    B
  ]), Lt = be.useMemo(() => g.duration || K || Fb, [
    g.duration,
    K
  ]), pt = be.useRef(0), ut = be.useRef(0), Zn = be.useRef(0), _n = be.useRef(null), [nn, Kt] = ne.split("-"), Ot = be.useMemo(() => C.reduce((Ve, bt, kt) => kt >= yt ? Ve : Ve + bt.height, 0), [
    C,
    yt
  ]), Ut = A3(), _r = g.invert || y, Aa = Ze === "loading";
  ut.current = be.useMemo(() => yt * L + Ot, [
    yt,
    Ot
  ]), be.useEffect(() => {
    pe.current = Lt;
  }, [
    Lt
  ]), be.useEffect(() => {
    ee(!0);
  }, []), be.useEffect(() => {
    const Ve = Re.current;
    if (Ve) {
      const bt = Ve.getBoundingClientRect().height;
      return ye(bt), w((kt) => [
        {
          toastId: g.id,
          height: bt,
          position: g.position
        },
        ...kt
      ]), () => w((kt) => kt.filter((Vt) => Vt.toastId !== g.id));
    }
  }, [
    w,
    g.id
  ]), be.useLayoutEffect(() => {
    if (!G) return;
    const Ve = Re.current, bt = Ve.style.height;
    Ve.style.height = "auto";
    const kt = Ve.getBoundingClientRect().height;
    Ve.style.height = bt, ye(kt), w((Vt) => Vt.find((gt) => gt.toastId === g.id) ? Vt.map((gt) => gt.toastId === g.id ? {
      ...gt,
      height: kt
    } : gt) : [
      {
        toastId: g.id,
        height: kt,
        position: g.position
      },
      ...Vt
    ]);
  }, [
    G,
    g.title,
    g.description,
    w,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const Sn = be.useCallback(() => {
    de(!0), Me(ut.current), w((Ve) => Ve.filter((bt) => bt.toastId !== g.id)), setTimeout(() => {
      O(g);
    }, Y3);
  }, [
    g,
    O,
    w,
    ut
  ]);
  be.useEffect(() => {
    if (g.promise && Ze === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let Ve;
    return E || x || Ut ? (() => {
      if (Zn.current < pt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - pt.current;
        pe.current = pe.current - Vt;
      }
      Zn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      pe.current !== 1 / 0 && (pt.current = (/* @__PURE__ */ new Date()).getTime(), Ve = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), Sn();
      }, pe.current));
    })(), () => clearTimeout(Ve);
  }, [
    E,
    x,
    g,
    Ze,
    Ut,
    Sn
  ]), be.useEffect(() => {
    g.delete && (Sn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    Sn,
    g.delete
  ]);
  function ma() {
    var Ve;
    if (z?.loading) {
      var bt;
      return /* @__PURE__ */ be.createElement("div", {
        className: Ba(T?.loader, g == null || (bt = g.classNames) == null ? void 0 : bt.loader, "sonner-loader"),
        "data-visible": Ze === "loading"
      }, z.loading);
    }
    return /* @__PURE__ */ be.createElement(N3, {
      className: Ba(T?.loader, g == null || (Ve = g.classNames) == null ? void 0 : Ve.loader),
      visible: Ze === "loading"
    });
  }
  const Ln = g.icon || z?.[Ze] || S3(Ze);
  var Qn, fn;
  return /* @__PURE__ */ be.createElement("li", {
    tabIndex: 0,
    ref: Re,
    className: Ba(Q, Ke, T?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, T?.default, T?.[Ze], g == null || (i = g.classNames) == null ? void 0 : i[Ze]),
    "data-sonner-toast": "",
    "data-rich-colors": (Qn = g.richColors) != null ? Qn : H,
    "data-styled": !(g.jsx || g.unstyled || b),
    "data-mounted": G,
    "data-promise": !!g.promise,
    "data-swiped": Oe,
    "data-removed": se,
    "data-visible": lt,
    "data-y-position": nn,
    "data-x-position": Kt,
    "data-index": N,
    "data-front": Ae,
    "data-swiping": he,
    "data-dismissible": Fe,
    "data-type": Ze,
    "data-invert": _r,
    "data-swipe-out": ve,
    "data-swipe-direction": j,
    "data-expanded": !!(E || Y && G),
    "data-testid": g.testId,
    style: {
      "--index": N,
      "--toasts-before": N,
      "--z-index": D.length - N,
      "--offset": `${se ? we : ut.current}px`,
      "--initial-height": Y ? "auto" : `${Ye}px`,
      ...U,
      ...g.style
    },
    onDragEnd: () => {
      J(!1), ae(null), _n.current = null;
    },
    onPointerDown: (Ve) => {
      Ve.button !== 2 && (Aa || !Fe || (_e.current = /* @__PURE__ */ new Date(), Me(ut.current), Ve.target.setPointerCapture(Ve.pointerId), Ve.target.tagName !== "BUTTON" && (J(!0), _n.current = {
        x: Ve.clientX,
        y: Ve.clientY
      })));
    },
    onPointerUp: () => {
      var Ve, bt, kt;
      if (ve || !Fe) return;
      _n.current = null;
      const Vt = Number(((Ve = Re.current) == null ? void 0 : Ve.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), gn = Number(((bt = Re.current) == null ? void 0 : bt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), gt = (/* @__PURE__ */ new Date()).getTime() - ((kt = _e.current) == null ? void 0 : kt.getTime()), Wt = X === "x" ? Vt : gn, pa = Math.abs(Wt) / gt;
      if (Math.abs(Wt) >= I3 || pa > 0.11) {
        Me(ut.current), g.onDismiss == null || g.onDismiss.call(g, g), k(X === "x" ? Vt > 0 ? "right" : "left" : gn > 0 ? "down" : "up"), Sn(), De(!0);
        return;
      } else {
        var en, V;
        (en = Re.current) == null || en.style.setProperty("--swipe-amount-x", "0px"), (V = Re.current) == null || V.style.setProperty("--swipe-amount-y", "0px");
      }
      Ee(!1), J(!1), ae(null);
    },
    onPointerMove: (Ve) => {
      var bt, kt, Vt;
      if (!_n.current || !Fe || ((bt = window.getSelection()) == null ? void 0 : bt.toString().length) > 0) return;
      const gt = Ve.clientY - _n.current.y, Wt = Ve.clientX - _n.current.x;
      var pa;
      const en = (pa = e.swipeDirections) != null ? pa : G3(ne);
      !X && (Math.abs(Wt) > 1 || Math.abs(gt) > 1) && ae(Math.abs(Wt) > Math.abs(gt) ? "x" : "y");
      let V = {
        x: 0,
        y: 0
      };
      const Z = (te) => 1 / (1.5 + Math.abs(te) / 20);
      if (X === "y") {
        if (en.includes("top") || en.includes("bottom"))
          if (en.includes("top") && gt < 0 || en.includes("bottom") && gt > 0)
            V.y = gt;
          else {
            const te = gt * Z(gt);
            V.y = Math.abs(te) < Math.abs(gt) ? te : gt;
          }
      } else if (X === "x" && (en.includes("left") || en.includes("right")))
        if (en.includes("left") && Wt < 0 || en.includes("right") && Wt > 0)
          V.x = Wt;
        else {
          const te = Wt * Z(Wt);
          V.x = Math.abs(te) < Math.abs(Wt) ? te : Wt;
        }
      (Math.abs(V.x) > 0 || Math.abs(V.y) > 0) && Ee(!0), (kt = Re.current) == null || kt.style.setProperty("--swipe-amount-x", `${V.x}px`), (Vt = Re.current) == null || Vt.style.setProperty("--swipe-amount-y", `${V.y}px`);
    }
  }, Yt && !g.jsx && Ze !== "loading" ? /* @__PURE__ */ be.createElement("button", {
    "aria-label": F,
    "data-disabled": Aa,
    "data-close-button": !0,
    onClick: Aa || !Fe ? () => {
    } : () => {
      Sn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: Ba(T?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (fn = z?.close) != null ? fn : D3) : null, (Ze || g.icon || g.promise) && g.icon !== null && (z?.[Ze] !== null || g.icon) ? /* @__PURE__ */ be.createElement("div", {
    "data-icon": "",
    className: Ba(T?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ma() : null, g.type !== "loading" ? Ln : null) : null, /* @__PURE__ */ be.createElement("div", {
    "data-content": "",
    className: Ba(T?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ be.createElement("div", {
    "data-title": "",
    className: Ba(T?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ be.createElement("div", {
    "data-description": "",
    className: Ba($, vt, T?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ be.isValidElement(g.cancel) ? g.cancel : g.cancel && qu(g.cancel) ? /* @__PURE__ */ be.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (Ve) => {
      qu(g.cancel) && Fe && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, Ve), Sn());
    },
    className: Ba(T?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ be.isValidElement(g.action) ? g.action : g.action && qu(g.action) ? /* @__PURE__ */ be.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || I,
    onClick: (Ve) => {
      qu(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, Ve), !Ve.defaultPrevented && Sn());
    },
    className: Ba(T?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function Xb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function X3(e, a) {
  const i = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? V3 : U3;
    function p(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        i[`${c}-${y}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof l == "number" || typeof l == "string" ? p(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      l[m] === void 0 ? i[`${c}-${m}`] = d : i[`${c}-${m}`] = typeof l[m] == "number" ? `${l[m]}px` : l[m];
    }) : p(d);
  }), i;
}
const P3 = /* @__PURE__ */ be.forwardRef(function(a, i) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: y, mobileOffset: g, theme: b = "light", richColors: x, duration: w, style: R, visibleToasts: C = B3, toastOptions: N, dir: D = Xb(), gap: E = q3, icons: O, containerAriaLabel: H = "Notifications" } = a, [B, U] = be.useState([]), A = be.useMemo(() => l ? B.filter((G) => G.toasterId === l) : B.filter((G) => !G.toasterId), [
    B,
    l
  ]), I = be.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((G) => G.position).map((G) => G.position)))), [
    A,
    u
  ]), [Q, $] = be.useState([]), [K, ne] = be.useState(!1), [L, Y] = be.useState(!1), [T, z] = be.useState(b !== "system" ? b : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = be.useRef(null), X = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ae = be.useRef(null), j = be.useRef(!1), k = be.useCallback((G) => {
    U((ee) => {
      var se;
      return (se = ee.find((de) => de.id === G.id)) != null && se.delete || jn.dismiss(G.id), ee.filter(({ id: de }) => de !== G.id);
    });
  }, []);
  return be.useEffect(() => jn.subscribe((G) => {
    if (G.dismiss) {
      requestAnimationFrame(() => {
        U((ee) => ee.map((se) => se.id === G.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      DA.flushSync(() => {
        U((ee) => {
          const se = ee.findIndex((de) => de.id === G.id);
          return se !== -1 ? [
            ...ee.slice(0, se),
            {
              ...ee[se],
              ...G
            },
            ...ee.slice(se + 1)
          ] : [
            G,
            ...ee
          ];
        });
      });
    });
  }), [
    B
  ]), be.useEffect(() => {
    if (b !== "system") {
      z(b);
      return;
    }
    if (b === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? z("dark") : z("light")), typeof window > "u") return;
    const G = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      G.addEventListener("change", ({ matches: ee }) => {
        z(ee ? "dark" : "light");
      });
    } catch {
      G.addListener(({ matches: se }) => {
        try {
          z(se ? "dark" : "light");
        } catch (de) {
          console.error(de);
        }
      });
    }
  }, [
    b
  ]), be.useEffect(() => {
    B.length <= 1 && ne(!1);
  }, [
    B
  ]), be.useEffect(() => {
    const G = (ee) => {
      var se;
      if (c.every((J) => ee[J] || ee.code === J)) {
        var he;
        ne(!0), (he = F.current) == null || he.focus();
      }
      ee.code === "Escape" && (document.activeElement === F.current || (se = F.current) != null && se.contains(document.activeElement)) && ne(!1);
    };
    return document.addEventListener("keydown", G), () => document.removeEventListener("keydown", G);
  }, [
    c
  ]), be.useEffect(() => {
    if (F.current)
      return () => {
        ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null, j.current = !1);
      };
  }, [
    F.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ be.createElement("section", {
    ref: i,
    "aria-label": `${H} ${X}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((G, ee) => {
    var se;
    const [de, he] = G.split("-");
    return A.length ? /* @__PURE__ */ be.createElement("ol", {
      key: G,
      dir: D === "auto" ? Xb() : D,
      tabIndex: -1,
      ref: F,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": T,
      "data-y-position": de,
      "data-x-position": he,
      style: {
        "--front-toast-height": `${((se = Q[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${$3}px`,
        "--gap": `${E}px`,
        ...R,
        ...X3(y, g)
      },
      onBlur: (J) => {
        j.current && !J.currentTarget.contains(J.relatedTarget) && (j.current = !1, ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null));
      },
      onFocus: (J) => {
        J.target instanceof HTMLElement && J.target.dataset.dismissible === "false" || j.current || (j.current = !0, ae.current = J.relatedTarget);
      },
      onMouseEnter: () => ne(!0),
      onMouseMove: () => ne(!0),
      onMouseLeave: () => {
        L || ne(!1);
      },
      onDragEnd: () => ne(!1),
      onPointerDown: (J) => {
        J.target instanceof HTMLElement && J.target.dataset.dismissible === "false" || Y(!0);
      },
      onPointerUp: () => Y(!1)
    }, A.filter((J) => !J.position && ee === 0 || J.position === G).map((J, ve) => {
      var De, Oe;
      return /* @__PURE__ */ be.createElement(F3, {
        key: J.id,
        icons: O,
        index: ve,
        toast: J,
        defaultRichColors: x,
        duration: (De = N?.duration) != null ? De : w,
        className: N?.className,
        descriptionClassName: N?.descriptionClassName,
        invert: s,
        visibleToasts: C,
        closeButton: (Oe = N?.closeButton) != null ? Oe : p,
        interacting: L,
        position: G,
        style: N?.style,
        unstyled: N?.unstyled,
        classNames: N?.classNames,
        cancelButtonStyle: N?.cancelButtonStyle,
        actionButtonStyle: N?.actionButtonStyle,
        closeButtonAriaLabel: N?.closeButtonAriaLabel,
        removeToast: k,
        toasts: A.filter((Ee) => Ee.position == J.position),
        heights: Q.filter((Ee) => Ee.position == J.position),
        setHeights: $,
        expandByDefault: d,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), m_ = [
  {
    id: "core",
    title: "Basics",
    description: "Resolution, length and playback — the essentials.",
    defaultCollapsed: !1
  },
  {
    id: "quality",
    title: "Quality",
    description: "Denoise steps, guidance, flow shift and seed.",
    defaultCollapsed: !1
  },
  {
    id: "coherence",
    title: "Coherence (canonical mechanics)",
    description: "Canonical chaining plus exact clip/size overrides. Change only for A/B.",
    defaultCollapsed: !0
  },
  {
    id: "transform",
    title: "Transform (let the prompt change the scene)",
    description: "Loosen the input-image grip so the prompt can reshape the scene. Off = input stays locked (default).",
    defaultCollapsed: !0
  },
  {
    id: "identity",
    title: "Identity (keep the look steady)",
    description: "Hold colour & identity steady across chained clips. Off = default; turn up only if later clips drift.",
    defaultCollapsed: !0
  },
  {
    id: "motion",
    title: "Motion (advanced, diagnostic)",
    description: "RoPE motion scaling. >1.5 deforms faces.",
    defaultCollapsed: !0
  },
  {
    id: "perf",
    title: "Performance / VRAM",
    description: "Block-swap. Higher = less VRAM (counterintuitive).",
    defaultCollapsed: !0
  }
], Pc = [
  {
    key: "num_clips",
    label: "Clips",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 64,
    step: 1,
    default: 6,
    help: "Number of chained clips. Driven by the Length control; edit for exact counts."
  },
  {
    key: "frames_per_clip",
    label: "Frames per clip",
    tier: "coherence",
    control: "number",
    min: 5,
    max: 129,
    step: 4,
    default: 85,
    help: "Must be 4n+1 (49, 65, 85, 129). 85 @ 16 fps ≈ 5.3s per segment."
  },
  {
    key: "width",
    label: "Width (custom)",
    tier: "coherence",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 832,
    help: "Must be divisible by 16. Prefer the Generation resolution presets; 832×480 is the trained budget."
  },
  {
    key: "height",
    label: "Height (custom)",
    tier: "coherence",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 480,
    help: "Must be divisible by 16. Off-budget weakens identity-lock."
  },
  {
    key: "fps",
    label: "Render fps",
    tier: "core",
    control: "number",
    min: 1,
    max: 60,
    step: 1,
    default: 16,
    help: "Native render fps (playback speed). 16 is the SVI clip rate."
  },
  {
    key: "interpolate_fps",
    label: "Interpolate to fps",
    tier: "core",
    control: "number",
    min: 0,
    max: 120,
    step: 1,
    default: 48,
    help: "Post-render target fps. Adds in-between frames, no speed-up. 0 = off."
  },
  {
    key: "interpolate_method",
    label: "Interpolation",
    tier: "core",
    control: "select",
    default: "rife",
    options: [
      { value: "rife", label: "RIFE (auto)" },
      { value: "rife_torch", label: "RIFE torch" },
      { value: "rife_ncnn", label: "RIFE ncnn" },
      { value: "ffmpeg", label: "ffmpeg minterpolate" }
    ],
    help: "rife = torch IFNet on CUDA → ncnn → ffmpeg fallback."
  },
  {
    key: "num_inference_steps",
    label: "Steps",
    tier: "quality",
    control: "number",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    help: "Denoise steps per clip. 50 = SVI reference. Fewer = faster, lower quality."
  },
  {
    key: "cfg_scale",
    label: "Guidance (CFG)",
    tier: "quality",
    control: "slider",
    min: 1,
    max: 12,
    step: 0.5,
    default: 4,
    help: "SVI reference = 4.0. Higher = stronger prompt adherence (~1–6)."
  },
  {
    key: "sigma_shift",
    label: "Sigma shift",
    tier: "quality",
    control: "slider",
    min: 0,
    max: 20,
    step: 0.5,
    default: 5,
    help: "FlowMatch shift. Wan default 5.0. Lower (3.5–4.0) = more motion."
  },
  {
    key: "switch_boundary",
    label: "MoE switch boundary",
    tier: "quality",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0.9,
    help: "When the high-noise (structure) expert hands off to the low-noise (detail) expert. Higher = switch sooner = more detail steps; lower = more structure steps. Wan2.2 = 0.9 (2 high + 2 low at 4 steps)."
  },
  {
    key: "solver",
    label: "Solver",
    tier: "quality",
    control: "select",
    default: "euler",
    options: [
      { value: "euler", label: "Euler (standard)" },
      { value: "euler_ancestral", label: "Euler ancestral (distill / lightx2v)" },
      { value: "heun", label: "Heun (2nd-order, ~2× slower)" }
    ],
    help: "Euler = standard flow step (fast). Euler ancestral = re-noises each step; matches ComfyUI euler_ancestral for distill (lightx2v) models. Heun = 2nd-order, ~2× render time. Heun disables TeaCache."
  },
  {
    key: "sigma_preset",
    label: "Schedule",
    tier: "quality",
    control: "select",
    default: "auto",
    options: [
      { value: "auto", label: "Auto (flow-match)" },
      { value: "distilled_4step", label: "Distilled 4-step (lightx2v / Lightning)" }
    ],
    help: "Auto = standard flow-match for fp8/bf16 base models. Distilled 4-step = exact lightx2v/Lightning sigmas [1.0, 0.9375, 0.833, 0.625] for NVFP4-Sparse / Lightning-distilled weights — forces 4 steps (2 high + 2 low) + CFG off; Steps / Guidance / Sigma-shift are ignored. Pure-noise output on distilled weights means you need this."
  },
  {
    key: "seed_multiplier",
    label: "Seed multiplier",
    tier: "quality",
    control: "number",
    min: 0,
    max: 1e6,
    step: 1,
    default: 42,
    help: "Per-clip seed = seed × clip_idx. Clip 0 always seed 0. Fix for reproducibility."
  },
  {
    key: "pixel_re_encode",
    label: "Pixel re-encode",
    tier: "coherence",
    control: "toggle",
    default: !1,
    help: "Keep OFF (canonical). On = decode→re-encode tail, injects drift. A/B only."
  },
  {
    key: "stitch_mode",
    label: "Stitch mode",
    tier: "coherence",
    control: "select",
    default: "trim",
    options: [
      { value: "trim", label: "Trim (canonical)" },
      { value: "crossfade", label: "Crossfade" }
    ],
    help: "trim = concat + drop overlap (canonical). crossfade = blend seams."
  },
  {
    key: "num_overlap_frame",
    label: "Overlap frames",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 8,
    step: 1,
    default: 5,
    help: "Frames overlapped between clips. SVI reference = 5."
  },
  {
    key: "num_motion_latent",
    label: "Motion latent frames",
    tier: "coherence",
    control: "number",
    min: 0,
    max: 5,
    step: 1,
    default: 1,
    help: "Latent frames carried as motion conditioning. SVI = 1. Higher can freeze motion."
  },
  {
    key: "num_motion_frame",
    label: "Motion tail frames",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 16,
    step: 1,
    default: 4,
    help: "Pixel frames for the motion tail / re-encode depth."
  },
  {
    key: "image_cond_noise_scale",
    label: "ICN scale",
    tier: "transform",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    help: "Loosens the input image's grip so the prompt can change the scene. 0 = input locked (default). 0.3–0.45 = transforms while keeping identity. 0.7+ = swaps the subject entirely."
  },
  {
    key: "image_cond_noise_bg_protect",
    label: "ICN background protect",
    tier: "transform",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    help: "Protects edges/background from the Transform change, focusing it on the centre. 0 = whole frame changes; 1 = corners/background kept."
  },
  {
    key: "ref_pad_num",
    label: "Ref-pad slots",
    tier: "identity",
    control: "number",
    min: -1,
    max: 16,
    step: 1,
    default: 0,
    help: "Anchors each new clip back to the first frame — holds the look/identity, but costs motion. 0 = off (default). Higher = stronger anchor. -1 = max (freezes motion)."
  },
  {
    key: "adain_factor",
    label: "AdaIN factor",
    tier: "identity",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    help: "Keeps colour & skin-tone consistent across clips by matching each clip to clip 1. Fixes colour/brightness drift in later clips — not shape. 0 = off; 0.2–0.3 if colours shift; 0.5 = strong."
  },
  {
    key: "blocks_to_swap",
    label: "Blocks to swap",
    tier: "perf",
    control: "slider",
    min: 0,
    max: 40,
    step: 1,
    default: 40,
    help: "DiT blocks offloaded to CPU. Higher = LESS VRAM (40 = lowest peak ~10 GiB). 40 is 16 GB-safe."
  },
  {
    key: "fp8_compute",
    label: "FP8 compute",
    tier: "perf",
    control: "select",
    default: "bf16",
    options: [
      { value: "bf16", label: "bf16 dequant (Blackwell colour fix)" },
      { value: "scaled_mm", label: "fp8 rowwise _scaled_mm (faster)" }
    ],
    help: "bf16 = dequant→bf16 matmul (safe, slower). scaled_mm = per-row fp8 GEMM (faster; auto-falls back to bf16 if the kernel rejects it)."
  },
  {
    key: "teacache_multiplier",
    label: "TeaCache speedup",
    tier: "perf",
    control: "select",
    numeric: !0,
    default: 1,
    options: [
      { value: "1", label: "Off (1×)" },
      { value: "1.25", label: "1.25× (near-lossless)" },
      { value: "1.5", label: "1.5×" },
      { value: "1.75", label: "1.75×" },
      { value: "2", label: "2× (softer)" },
      { value: "2.25", label: "2.25×" },
      { value: "2.5", label: "2.5× (artifacts likely)" }
    ],
    help: "Caches diffusion steps when frame-to-frame change is small — higher = faster but more ghosting/artifacts. Off = full quality."
  }
];
function Z3(e) {
  return Pc.filter((a) => a.tier === e);
}
function Q3() {
  const e = {};
  for (const a of Pc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function Ch(e) {
  return {
    ...Q3(),
    mode: "image_to_video",
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    upscale_factor: 0,
    upscale_model: "auto",
    upscale_quality: "HIGH",
    blocks_to_swap: e.blocksToSwap,
    attention: e.attentionBackend,
    interpolate_method: e.interpolateMethod,
    interpolate_fps: e.interpolateFps,
    models_dir: e.modelsDir || void 0,
    output_path: e.outputDir ? `${e.outputDir}/svi2_out.mp4` : void 0,
    dit_high_path: e.ditHighPath || void 0,
    dit_low_path: e.ditLowPath || void 0,
    svi_lora_tier: e.sviLoraTier ?? "high",
    torch_compile_mode: "default",
    fast_parallel: e.fastParallel,
    batch_prompt_encode: e.batchPromptEncode
  };
}
function Pb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const p_ = 1, K3 = "nexus.video.svi2-pro.recipe", W3 = ["ref_image_path", "last_image_path"];
function g_(e) {
  return `${K3}.${e}`;
}
function v_() {
  try {
    return typeof window < "u" ? window.localStorage : null;
  } catch {
    return null;
  }
}
function J3(e) {
  if (!e) return null;
  const a = v_();
  if (!a) return null;
  try {
    const i = a.getItem(g_(e));
    if (!i) return null;
    const l = JSON.parse(i);
    return l.v !== p_ || typeof l.params != "object" || l.params === null ? null : l.params;
  } catch {
    return null;
  }
}
function e5(e, a) {
  if (!e) return;
  const i = v_();
  if (i)
    try {
      const l = { ...a };
      for (const u of W3) delete l[u];
      const s = {
        v: p_,
        params: l
      };
      i.setItem(g_(e), JSON.stringify(s));
    } catch {
    }
}
const y_ = [10, 20, 30, 60, 120], t5 = "custom", xl = 85, Rh = { framesPerClip: xl, fps: 16, overlap: 5 };
function Oi(e) {
  return {
    framesPerClip: e.frames_per_clip ?? Rh.framesPerClip,
    fps: e.fps ?? Rh.fps,
    overlap: e.num_overlap_frame ?? Rh.overlap
  };
}
function b_(e, a) {
  const { framesPerClip: i, overlap: l } = a;
  return i + (e - 1) * (i - l);
}
function lm(e, a) {
  return a.fps <= 0 ? 0 : b_(e, a) / a.fps;
}
function n5(e, a) {
  const { framesPerClip: i, fps: l, overlap: s } = a, u = i - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - i) / u) + 1);
}
function a5(e, a) {
  const { fps: i, overlap: l } = a;
  if (i <= 0) return { numClips: 1, framesPerClip: xl };
  const s = Math.round(e * i);
  if (s <= ap)
    return { numClips: 1, framesPerClip: rp(s) };
  const u = xl - l;
  return u <= 0 ? { numClips: 1, framesPerClip: xl } : { numClips: Math.max(2, Math.round((s - xl) / u) + 1), framesPerClip: xl };
}
const r5 = 5, ap = 129, i5 = [2, 3, 4, 5, 6, 8];
function rp(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(ap, Math.max(r5, a));
}
function Zb(e, a) {
  return rp(e * a);
}
function l5(e) {
  return e <= 0 ? 0 : Math.floor(ap / e);
}
function x_(e) {
  const { framesPerClip: a, fps: i } = Oi(e);
  return i <= 0 ? 0 : a / i;
}
function o5(e) {
  const { framesPerClip: a, fps: i } = Oi(e), l = `1 × ${a} frames @ ${i} fps → ${x_(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function s5(e, a) {
  for (const i of y_)
    if (n5(i, a) === e) return i;
  return t5;
}
function u5(e) {
  const a = Oi(e), i = e.num_clips ?? 1, l = lm(i, a), s = `${i} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
function ip(e) {
  return e ? `${Lc}/media?path=${encodeURIComponent(e)}` : null;
}
function c5(e) {
  return ip(e);
}
async function Qb(e) {
  const a = ip(e);
  if (!a) return !1;
  try {
    return (await fetch(a, { method: "HEAD" })).ok;
  } catch {
    return !1;
  }
}
function Kb(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
const is = "svi-canonical", f5 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), d5 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), h5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function m5(e) {
  const a = e.frames_per_clip, i = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !i ? null : a + (i - 1) * (a - l);
}
function p5(e) {
  const a = e.params, i = a.width ?? 480, l = a.height ?? 832, s = `${i}×${l}`, u = m5(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = f5.has(e.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: y,
    isLowVram: p,
    isOffDistribution: d5.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : h5.has(e.id)
  };
}
function g5(e) {
  return [...e].sort((a, i) => a.id === is ? -1 : i.id === is ? 1 : 0);
}
function v5(e) {
  const a = e.filter((i) => !i.hidden);
  return {
    featured: g5(a.filter((i) => !i.legacy)),
    legacy: a.filter((i) => i.legacy === !0)
  };
}
async function y5(e = 25) {
  return xr(`/render/jobs?limit=${e}`);
}
async function Iu(e) {
  return xr(`/render/jobs/${e}`);
}
async function b5(e) {
  await xr(`/render/jobs/${encodeURIComponent(e)}`, { method: "DELETE" });
}
async function x5(e) {
  return xr("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function w_(e) {
  return xr(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function w5(e, a, i) {
  return kC(`/render/jobs/${e}/events`, a, i);
}
const _5 = 9e4, Wb = 24e4, S5 = 5e3, lp = "nexus.video.svi2-pro.active-render";
function E5(e) {
  try {
    sessionStorage.setItem(lp, JSON.stringify({ jobId: e }));
  } catch {
  }
}
function Yu() {
  try {
    sessionStorage.removeItem(lp);
  } catch {
  }
}
function N5() {
  try {
    const e = sessionStorage.getItem(lp);
    if (!e) return null;
    const a = JSON.parse(e);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
const __ = S.createContext(null);
function C5({
  initialSettings: e = Lm,
  initialPreset: a = null,
  deploymentId: i,
  children: l
}) {
  const [s, u] = S.useState(e), [c, d] = S.useState(
    a?.id ?? is
  ), [p, m] = S.useState(a !== null), [y, g] = S.useState(() => {
    const ye = Ch(e), pe = a ? Pb(ye, a) : ye, _e = J3(i);
    return _e ? { ...pe, ..._e } : pe;
  }), [b, x] = S.useState(null), [w, R] = S.useState(null), [C, N] = S.useState({
    enabled: !1,
    prompt: ""
  }), [D, E] = S.useState(Nc), [O, H] = S.useState(!1), B = S.useRef(!1), U = S.useRef(null), A = S.useRef(null), I = S.useRef(D);
  I.current = D;
  const Q = S.useRef(!1), $ = S.useRef(0), K = S.useRef(null), ne = S.useCallback(() => {
    A.current !== null && (clearInterval(A.current), A.current = null);
  }, []), L = S.useCallback(() => {
    ne(), A.current = setInterval(() => {
      const ye = I.current;
      if (ye.phase !== "running" || ye.lastFrameAt === null || Q.current) return;
      const pe = Date.now() - ye.lastFrameAt, _e = Date.now() - $.current;
      if (pe >= Wb && _e >= Wb) {
        ye.jobId && K.current?.(ye.jobId);
        return;
      }
      pe >= _5 && E((Re) => Gb(Re));
    }, S5);
  }, [ne]), Y = S.useCallback(
    (ye) => {
      U.current?.(), U.current = w5(
        ye,
        (pe) => {
          E((_e) => h3(_e, pe));
        },
        () => {
          Q.current || E((pe) => Gb(pe));
        }
      ), L();
    },
    [L]
  ), T = S.useCallback(
    (ye) => {
      if (Q.current) return;
      const pe = ye;
      Q.current = !0, $.current = Date.now(), Y(ye), E(
        (Ae) => Ae.phase === "running" ? { ...Ae, lastFrameAt: Date.now() } : Ae
      );
      const _e = () => I.current.jobId === pe && I.current.phase === "running", Re = (Ae) => {
        _e() && (U.current?.(), U.current = null, ne(), E(Ae));
      };
      Iu(ye).then((Ae) => {
        (Ae.status === "succeeded" || Ae.status === "failed" || Ae.status === "cancelled") && Re(Ho(Ae));
      }).catch(() => {
        Re(g3(I.current));
      }).finally(() => {
        Q.current = !1;
      });
    },
    [Y, ne]
  );
  K.current = T;
  const z = S.useCallback(() => {
    B.current || (B.current = !0, H(!0));
  }, []), F = S.useCallback(() => {
    B.current = !1, H(!1);
  }, []), X = S.useCallback(
    (ye, pe) => {
      pe?.markDirty !== !1 && z();
      const _e = ye.params.requires_last_image === !0;
      d(ye.id), m(!0), g((Re) => {
        const Ae = {
          ...Ch(s),
          mode: Re.mode ?? "image_to_video",
          ref_image_path: Re.ref_image_path,
          prompts: Re.prompts,
          last_image_path: _e ? Re.last_image_path ?? null : null
        };
        return Pb(Ae, ye);
      }), _e || R(null);
    },
    [s, z]
  ), ae = S.useCallback(
    (ye) => {
      z(), g((pe) => {
        if (ye === "text_to_video") return { ...pe, mode: ye };
        const { seed: _e, ...Re } = pe;
        return { ...Re, mode: ye };
      });
    },
    [z]
  ), j = S.useCallback(
    (ye, pe) => {
      z(), g((_e) => ({ ..._e, [ye]: pe }));
    },
    [z]
  ), k = S.useCallback(
    (ye) => {
      z(), g((pe) => ({ ...pe, prompts: ye }));
    },
    [z]
  ), G = S.useCallback(
    (ye, pe) => {
      z(), x(ye), g((_e) => ({ ..._e, ref_image_path: pe }));
    },
    [z]
  ), ee = S.useCallback(
    (ye, pe) => {
      z(), R(ye), g((_e) => pe === null || pe.length === 0 ? { ..._e, last_image_path: pe } : {
        ..._e,
        last_image_path: pe,
        num_clips: 1,
        frames_per_clip: rp(_e.frames_per_clip ?? 81)
      });
    },
    [z]
  ), se = S.useCallback(() => {
    x(null), g((ye) => ({ ...ye, ref_image_path: "" }));
  }, []), de = S.useCallback(() => {
    R(null), g((ye) => ({ ...ye, last_image_path: null }));
  }, []), he = S.useCallback(
    (ye) => {
      z(), N((pe) => ({ ...pe, ...ye }));
    },
    [z]
  ), J = S.useCallback(() => B.current, []), ve = S.useCallback((ye) => {
    u(ye), g((pe) => ({
      ...pe,
      fast_parallel: ye.fastParallel,
      batch_prompt_encode: ye.batchPromptEncode
    }));
  }, []), De = S.useCallback(() => {
    U.current?.(), U.current = null, ne(), Yu(), E(Nc());
  }, [ne]), Oe = S.useCallback(async () => {
    F(), U.current?.(), $.current = 0, console.info("[svi2] render → params", {
      base_model: {
        dit_high_path: y.dit_high_path ?? "(bundled)",
        dit_low_path: y.dit_low_path ?? "(bundled)",
        svi_lora_tier: y.svi_lora_tier ?? "high"
      },
      quality: {
        num_inference_steps: y.num_inference_steps,
        cfg_scale: y.cfg_scale,
        sigma_shift: y.sigma_shift,
        switch_boundary: y.switch_boundary,
        solver: y.solver,
        seed: y.seed,
        seed_multiplier: y.seed_multiplier
      },
      basics: {
        width: y.width,
        height: y.height,
        num_clips: y.num_clips,
        frames_per_clip: y.frames_per_clip,
        fps: y.fps,
        interpolate_fps: y.interpolate_fps,
        interpolate_method: y.interpolate_method,
        upscale_factor: y.upscale_factor,
        upscale_model: y.upscale_model,
        upscale_quality: y.upscale_quality
      },
      compile: {
        use_torch_compile: y.use_torch_compile,
        torch_compile_mode: y.torch_compile_mode,
        blocks_to_swap: y.blocks_to_swap
      },
      parallel: {
        fast_parallel: y.fast_parallel,
        batch_prompt_encode: y.batch_prompt_encode
      },
      user_loras: y.user_loras ?? [],
      presetId: c
    });
    const { jobId: ye } = await x5({ presetId: c, params: y });
    E(Yb(ye, C.enabled)), E5(ye), Y(ye);
  }, [y, c, C.enabled, Y, F]), Ee = S.useCallback(async () => {
    const ye = I.current.jobId ?? D.jobId;
    if (!ye) return;
    const { status: pe } = await w_(ye);
    pe !== "cancelling" && (U.current?.(), U.current = null, ne(), Yu(), E((_e) => m3(_e)));
  }, [D.jobId, ne]), we = S.useCallback(
    async (ye) => {
      U.current?.(), U.current = null, ne();
      try {
        const pe = await Iu(ye.id);
        E(Ho(pe));
      } catch {
        E(Ho(ye));
      }
    },
    [ne]
  ), Me = S.useCallback(
    async (ye) => {
      U.current?.(), U.current = null, ne();
      let pe = ye;
      try {
        pe = await Iu(ye.id);
      } catch {
        pe = ye;
      }
      const _e = pe.params.ref_image_path ?? "";
      let Re = _e, Ae = null;
      _e.length > 0 && (await Qb(_e) ? Ae = Kb(_e) : (Re = "", ca.warning("Input image no longer on disk — re-upload to render")));
      const lt = pe.params.last_image_path ?? null;
      let Ze = lt, Fe = null;
      lt && lt.length > 0 && (await Qb(lt) ? Fe = Kb(lt) : (Ze = null, ca.warning("Last image no longer on disk — re-upload to render"))), g({
        ...Ch(s),
        ...pe.params,
        ref_image_path: Re,
        last_image_path: Ze
      }), d(pe.presetId), m(pe.presetId !== null), x(Ae), R(Fe), E(Ho(pe)), F();
    },
    [s, ne, F]
  );
  S.useEffect(() => {
    e5(i, y);
  }, [i, y]), S.useEffect(() => {
    (D.phase === "done" || D.phase === "error" || D.phase === "cancelled") && Yu();
  }, [D.phase]), S.useEffect(() => {
    const ye = () => {
      const Re = I.current;
      Re.phase !== "running" || !Re.jobId || (Y(Re.jobId), E(
        (Ae) => Ae.phase === "running" ? { ...Ae, stalled: !1, lastFrameAt: Date.now() } : Ae
      ));
    }, pe = () => {
      document.visibilityState === "visible" && ye();
    }, _e = () => ye();
    return document.addEventListener("visibilitychange", pe), window.addEventListener("focus", _e), () => {
      document.removeEventListener("visibilitychange", pe), window.removeEventListener("focus", _e);
    };
  }, [Y]), S.useEffect(() => {
    const ye = N5();
    if (!ye) return;
    let pe = !1;
    return Iu(ye).then((_e) => {
      if (!pe) {
        if (_e.status === "succeeded" || _e.status === "failed" || _e.status === "cancelled") {
          Yu(), E(Ho(_e));
          return;
        }
        E(Yb(ye, !1)), Y(ye);
      }
    }).catch(() => {
    }), () => {
      pe = !0;
    };
  }, [Y]), S.useEffect(() => () => {
    U.current?.(), U.current = null, ne();
  }, [ne]);
  const Ye = S.useMemo(
    () => ({
      settings: s,
      presetId: c,
      presetApplied: p,
      params: y,
      refImageName: b,
      lastImageName: w,
      qwenEdit: C,
      render: D,
      isDirty: O,
      applyPresetById: X,
      setMode: ae,
      updateParam: j,
      setPrompts: k,
      setRefImage: G,
      setLastImage: ee,
      clearRefImageSilent: se,
      clearLastImageSilent: de,
      setQwenEdit: he,
      setSettings: ve,
      startRenderJob: Oe,
      cancelRenderJob: Ee,
      resetRender: De,
      showJobResult: we,
      restoreJobIntoForm: Me,
      getIsDirty: J
    }),
    [
      s,
      c,
      p,
      y,
      b,
      w,
      C,
      D,
      O,
      X,
      ae,
      j,
      k,
      G,
      ee,
      se,
      de,
      he,
      ve,
      Oe,
      Ee,
      De,
      we,
      Me,
      J
    ]
  );
  return /* @__PURE__ */ v.jsx(__.Provider, { value: Ye, children: l });
}
function Qt() {
  const e = S.useContext(__);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
const om = "svi2-pro:trigger-render", sm = "svi2-pro:render-state";
function R5() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(om));
}
function T5(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(sm, { detail: e }));
}
function M5(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(om, e), () => window.removeEventListener(om, e));
}
function D5(e) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const l = i.detail;
    l && e(l);
  };
  return window.addEventListener(sm, a), () => window.removeEventListener(sm, a);
}
const A5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), j5 = 832 * 480, O5 = 0.85;
function op(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && A5.has(e);
}
function Zc(e, a) {
  return op(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function Jb(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function z5(e, a) {
  const i = [];
  (e.mode ?? "image_to_video") !== "text_to_video" && (!a.hasRefImage || !e.ref_image_path) && i.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (e.prompts ?? []).some((b) => b.trim().length > 0) || i.push({
    field: "prompts",
    message: "At least one prompt is required.",
    severity: "error"
  });
  const c = e.frames_per_clip ?? 81;
  (c - 1) % 4 !== 0 && i.push({
    field: "frames_per_clip",
    message: `Frames per clip must be 4n+1 (got ${c}). Try ${c - (c - 1) % 4}.`,
    severity: "error"
  });
  const d = e.width ?? 480, p = e.height ?? 832;
  Jb(d, 16) || i.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), Jb(p, 16) || i.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${p}).`,
    severity: "error"
  });
  const m = e.num_inference_steps ?? 50;
  (m < 1 || m > 100) && i.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const y = e.cfg_scale ?? 5;
  (y < 1 || y > 12) && i.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const g = e.num_clips;
  return g !== void 0 && g < 1 && i.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), op(a.presetId, a.presetParams) && !a.hasLastImage && i.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Zc(a.presetId, e) && g !== void 0 && g > 1 && i.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < j5 * O5 && i.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), i;
}
function L5(e) {
  return e.some((a) => a.severity === "error");
}
function S_() {
  const {
    params: e,
    presetId: a,
    refImageName: i,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Qt(), d = S.useMemo(
    () => z5(e, {
      presetId: a,
      hasRefImage: !!i,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, i, l]
  ), p = L5(d), m = s.phase === "running", [y, g] = S.useState(null), b = S.useCallback(async () => {
    if (p) {
      const w = d.find((R) => R.severity === "error");
      w && g({ field: w.field, token: Date.now() }), ca.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), ca.success("Render started.");
    } catch (w) {
      const R = w instanceof zc ? w.message : "Could not start the render.";
      ca.error(R);
    }
  }, [p, d, u]), x = S.useCallback(async () => {
    try {
      await c();
    } catch {
      ca.error("Could not cancel the render.");
    }
  }, [c]);
  return S.useEffect(() => M5(() => void b()), [b]), S.useEffect(() => {
    T5({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: b, cancel: x, focusRequest: y };
}
const k5 = 220, H5 = 80;
function B5(e) {
  switch (e) {
    case "anchor":
      return "Anchor";
    case "qwen_edit":
      return "Qwen edit";
    case "diffusion":
      return "Diffusion";
    case "stitch":
      return "Stitch";
    case "interpolate":
      return "Interpolate";
    case "mux":
      return "Mux";
  }
}
function U5(e, a) {
  const i = a.params;
  switch (e) {
    case "anchor":
      return "Reference image";
    case "qwen_edit":
      return a.qwenEditEnabled ? "Edit-then-animate" : "Skipped";
    case "diffusion": {
      const l = i.num_clips ?? 1, s = a.render.clipIndex + 1;
      return a.render.phase === "running" ? `Clip ${Math.min(s, l)}/${l}` : `${l} clip${l === 1 ? "" : "s"}`;
    }
    case "stitch":
      return i.stitch_mode === "crossfade" ? "Crossfade" : "Overlap trim";
    case "interpolate":
      return i.interpolate_fps && i.interpolate_fps > 0 ? `→ ${i.interpolate_fps} fps` : "Off";
    case "mux":
      return "Encode mp4";
  }
}
function V5(e) {
  const a = tp.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), i = a.map((s, u) => {
    const c = {
      title: B5(s),
      subtitle: U5(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * k5, y: H5 },
      data: c
    };
  }), l = [];
  for (let s = 1; s < a.length; s += 1) {
    const u = a[s - 1], c = a[s];
    !u || !c || l.push({
      id: `${u}->${c}`,
      source: u,
      target: c,
      animated: e.render.stageStates[c] === "active"
    });
  }
  return { nodes: i, edges: l };
}
var $5 = "dk8hba0", q5 = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, I5 = "dk8hba5", Y5 = "dk8hba6", G5 = "dk8hba7", F5 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, X5 = "dk8hbac";
function P5({ data: e }) {
  const a = e, i = [$5, q5[a.state]].join(" "), l = [X5, F5[a.state]].join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: i, children: [
    a.hasInput && /* @__PURE__ */ v.jsx(Ll, { type: "target", position: ke.Left }),
    /* @__PURE__ */ v.jsxs("div", { className: I5, children: [
      /* @__PURE__ */ v.jsx("span", { className: Y5, children: a.title }),
      /* @__PURE__ */ v.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ v.jsx("span", { className: G5, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ v.jsx(Ll, { type: "source", position: ke.Right })
  ] });
}
const Z5 = { pipeline: P5 };
var Q5 = "_1g4g8kk0", K5 = "_1g4g8kk1", W5 = "_1g4g8kk2", J5 = "_1g4g8kk3", eO = "_1g4g8kk4", tO = "_1g4g8kk5";
const nO = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, aO = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function rO() {
  const { render: e, params: a, qwenEdit: i } = Qt(), { busy: l, blocked: s, submit: u, cancel: c } = S_(), d = S.useMemo(
    () => V5({ render: e, params: a, qwenEditEnabled: i.enabled }),
    [e, a, i.enabled]
  ), p = tp.filter(
    (m) => m !== "qwen_edit" || i.enabled
  );
  return /* @__PURE__ */ v.jsxs("div", { className: Q5, children: [
    /* @__PURE__ */ v.jsx("div", { className: K5, children: /* @__PURE__ */ v.jsx(
      a3,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: Z5,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ v.jsx("div", { className: W5, children: /* @__PURE__ */ v.jsxs(
      Va,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ v.jsx("div", { className: J5, children: p.map((m) => /* @__PURE__ */ v.jsxs("div", { className: eO, children: [
            /* @__PURE__ */ v.jsx("span", { children: aO[m] }),
            /* @__PURE__ */ v.jsx(Fn, { tone: nO[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ v.jsx("div", { className: tO, children: l ? /* @__PURE__ */ v.jsx(ua, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ v.jsx(ua, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var ex = jw();
const E_ = 0, N_ = 1, C_ = 2, tx = 3;
var nx = Object.prototype.hasOwnProperty;
function um(e, a) {
  var i, l;
  if (e === a) return !0;
  if (e && a && (i = e.constructor) === a.constructor) {
    if (i === Date) return e.getTime() === a.getTime();
    if (i === RegExp) return e.toString() === a.toString();
    if (i === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && um(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!i || typeof e == "object") {
      l = 0;
      for (i in e)
        if (nx.call(e, i) && ++l && !nx.call(a, i) || !(i in a) || !um(e[i], a[i])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const pr = /* @__PURE__ */ new WeakMap(), vr = () => {
}, pn = (
  /*#__NOINLINE__*/
  vr()
), cm = Object, at = (e) => e === pn, qa = (e) => typeof e == "function", ni = (e, a) => ({
  ...e,
  ...a
}), R_ = (e) => qa(e.then), Th = {}, Gu = {}, sp = "undefined", bs = typeof window != sp, fm = typeof document != sp, iO = bs && "Deno" in window, lO = () => bs && typeof window.requestAnimationFrame != sp, T_ = (e, a) => {
  const i = pr.get(e);
  return [
    // Getter
    () => !at(a) && e.get(a) || Th,
    // Setter
    (l) => {
      if (!at(a)) {
        const s = e.get(a);
        a in Gu || (Gu[a] = s), i[5](a, ni(s, l), s || Th);
      }
    },
    // Subscriber
    i[6],
    // Get server cache snapshot
    () => !at(a) && a in Gu ? Gu[a] : !at(a) && e.get(a) || Th
  ];
};
let dm = !0;
const oO = () => dm, [hm, mm] = bs && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  vr,
  vr
], sO = () => {
  const e = fm && document.visibilityState;
  return at(e) || e !== "hidden";
}, uO = (e) => (fm && document.addEventListener("visibilitychange", e), hm("focus", e), () => {
  fm && document.removeEventListener("visibilitychange", e), mm("focus", e);
}), cO = (e) => {
  const a = () => {
    dm = !0, e();
  }, i = () => {
    dm = !1;
  };
  return hm("online", a), hm("offline", i), () => {
    mm("online", a), mm("offline", i);
  };
}, fO = {
  isOnline: oO,
  isVisible: sO
}, dO = {
  initFocus: uO,
  initReconnect: cO
}, ax = !be.useId, Rl = !bs || iO, hO = (e) => lO() ? window.requestAnimationFrame(e) : setTimeout(e, 1), Mh = Rl ? S.useEffect : S.useLayoutEffect, Dh = typeof navigator < "u" && navigator.connection, rx = !Rl && Dh && ([
  "slow-2g",
  "2g"
].includes(Dh.effectiveType) || Dh.saveData), Fu = /* @__PURE__ */ new WeakMap(), mO = (e) => cm.prototype.toString.call(e), Ah = (e, a) => e === `[object ${a}]`;
let pO = 0;
const pm = (e) => {
  const a = typeof e, i = mO(e), l = Ah(i, "Date"), s = Ah(i, "RegExp"), u = Ah(i, "Object");
  let c, d;
  if (cm(e) === e && !l && !s) {
    if (c = Fu.get(e), c) return c;
    if (c = ++pO + "~", Fu.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += pm(e[d]) + ",";
      Fu.set(e, c);
    }
    if (u) {
      c = "#";
      const p = cm.keys(e).sort();
      for (; !at(d = p.pop()); )
        at(e[d]) || (c += d + ":" + pm(e[d]) + ",");
      Fu.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, up = (e) => {
  if (qa(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? pm(e) : "", [
    e,
    a
  ];
};
let gO = 0;
const gm = () => ++gO;
async function M_(...e) {
  const [a, i, l, s] = e, u = ni({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const d = u.rollbackOnError;
  let p = u.optimisticData;
  const m = (b) => typeof d == "function" ? d(b) : d !== !1, y = u.throwOnError;
  if (qa(i)) {
    const b = i, x = [], w = a.keys();
    for (const R of w)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(R) && b(a.get(R)._k) && x.push(R);
    return Promise.all(x.map(g));
  }
  return g(i);
  async function g(b) {
    const [x] = up(b);
    if (!x) return;
    const [w, R] = T_(a, x), [C, N, D, E] = pr.get(a), O = () => {
      const L = C[x];
      return (qa(u.revalidate) ? u.revalidate(w().data, b) : u.revalidate !== !1) && (delete D[x], delete E[x], L && L[0]) ? L[0](C_).then(() => w().data) : w().data;
    };
    if (e.length < 3)
      return O();
    let H = l, B, U = !1;
    const A = gm();
    N[x] = [
      A,
      0
    ];
    const I = !at(p), Q = w(), $ = Q.data, K = Q._c, ne = at(K) ? $ : K;
    if (I && (p = qa(p) ? p(ne, $) : p, R({
      data: p,
      _c: ne
    })), qa(H))
      try {
        H = H(ne);
      } catch (L) {
        B = L, U = !0;
      }
    if (H && R_(H))
      if (H = await H.catch((L) => {
        B = L, U = !0;
      }), A !== N[x][0]) {
        if (U) throw B;
        return H;
      } else U && I && m(B) && (c = !0, R({
        data: ne,
        _c: pn
      }));
    if (c && !U)
      if (qa(c)) {
        const L = c(H, ne);
        R({
          data: L,
          error: pn,
          _c: pn
        });
      } else
        R({
          data: H,
          error: pn,
          _c: pn
        });
    if (N[x][1] = gm(), Promise.resolve(O()).then(() => {
      R({
        _c: pn
      });
    }), U) {
      if (y) throw B;
      return;
    }
    return H;
  }
}
const ix = (e, a) => {
  for (const i in e)
    e[i][0] && e[i][0](a);
}, vO = (e, a) => {
  if (!pr.has(e)) {
    const i = ni(dO, a), l = /* @__PURE__ */ Object.create(null), s = M_.bind(pn, e);
    let u = vr;
    const c = /* @__PURE__ */ Object.create(null), d = (y, g) => {
      const b = c[y] || [];
      return c[y] = b, b.push(g), () => b.splice(b.indexOf(g), 1);
    }, p = (y, g, b) => {
      e.set(y, g);
      const x = c[y];
      if (x)
        for (const w of x)
          w(g, b);
    }, m = () => {
      if (!pr.has(e) && (pr.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !Rl)) {
        const y = i.initFocus(setTimeout.bind(pn, ix.bind(pn, l, E_))), g = i.initReconnect(setTimeout.bind(pn, ix.bind(pn, l, N_)));
        u = () => {
          y && y(), g && g(), pr.delete(e);
        };
      }
    };
    return m(), [
      e,
      s,
      m,
      u
    ];
  }
  return [
    e,
    pr.get(e)[4]
  ];
}, yO = (e, a, i, l, s) => {
  const u = i.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * i.errorRetryInterval;
  !at(u) && c > u || setTimeout(l, d, s);
}, bO = um, [D_, xO] = vO(/* @__PURE__ */ new Map()), wO = ni(
  {
    // events
    onLoadingSlow: vr,
    onSuccess: vr,
    onError: vr,
    onErrorRetry: yO,
    onDiscarded: vr,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: rx ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: rx ? 5e3 : 3e3,
    // providers
    compare: bO,
    isPaused: () => !1,
    cache: D_,
    mutate: xO,
    fallback: {}
  },
  // use web preset by default
  fO
), _O = (e, a) => {
  const i = ni(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (i.use = l.concat(u)), s && c && (i.fallback = ni(s, c));
  }
  return i;
}, SO = S.createContext({}), EO = "$inf$", A_ = bs && window.__SWR_DEVTOOLS_USE__, NO = A_ ? window.__SWR_DEVTOOLS_USE__ : [], CO = () => {
  A_ && (window.__SWR_DEVTOOLS_REACT__ = be);
}, RO = (e) => qa(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], TO = () => {
  const e = S.useContext(SO);
  return S.useMemo(() => ni(wO, e), [
    e
  ]);
}, MO = (e) => (a, i, l) => e(a, i && ((...u) => {
  const [c] = up(a), [, , , d] = pr.get(D_);
  if (c.startsWith(EO))
    return i(...u);
  const p = d[c];
  return at(p) ? i(...u) : (delete d[c], p);
}), l), DO = NO.concat(MO), AO = (e) => function(...i) {
  const l = TO(), [s, u, c] = RO(i), d = _O(l, c);
  let p = e;
  const { use: m } = d, y = (m || []).concat(DO);
  for (let g = y.length; g--; )
    p = y[g](p);
  return p(s, u || d.fetcher || null, d);
}, jO = (e, a, i) => {
  const l = a[e] || (a[e] = []);
  return l.push(i), () => {
    const s = l.indexOf(i);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
CO();
const jh = be.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((e) => {
  switch (e.status) {
    case "pending":
      throw e;
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      throw e.status = "pending", e.then((a) => {
        e.status = "fulfilled", e.value = a;
      }, (a) => {
        e.status = "rejected", e.reason = a;
      }), e;
  }
}), Oh = {
  dedupe: !0
}, lx = Promise.resolve(pn), OO = () => vr, zO = (e, a, i) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: g, keepPreviousData: b, strictServerPrefetchWarning: x } = i, [w, R, C, N] = pr.get(l), [D, E] = up(e), O = S.useRef(!1), H = S.useRef(!1), B = S.useRef(D), U = S.useRef(a), A = S.useRef(i), I = () => A.current, Q = () => I().isVisible() && I().isOnline(), [$, K, ne, L] = T_(l, D), Y = S.useRef({}).current, T = at(c) ? at(i.fallback) ? pn : i.fallback[D] : c, z = (pe, _e) => {
    for (const Re in Y) {
      const Ae = Re;
      if (Ae === "data") {
        if (!s(pe[Ae], _e[Ae]) && (!at(pe[Ae]) || !s(de, _e[Ae])))
          return !1;
      } else if (_e[Ae] !== pe[Ae])
        return !1;
    }
    return !0;
  }, F = !O.current, X = S.useMemo(() => {
    const pe = $(), _e = L(), Re = (Fe) => {
      const Ke = ni(Fe);
      return delete Ke._k, (() => {
        if (!D || !a || I().isPaused()) return !1;
        if (F && !at(d)) return d;
        const yt = at(T) ? Ke.data : T;
        return at(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ke
      } : Ke;
    }, Ae = Re(pe), lt = pe === _e ? Ae : Re(_e);
    let Ze = Ae;
    return [
      () => {
        const Fe = Re($());
        return z(Fe, Ze) ? (Ze.data = Fe.data, Ze.isLoading = Fe.isLoading, Ze.isValidating = Fe.isValidating, Ze.error = Fe.error, Ze) : (Ze = Fe, Fe);
      },
      () => lt
    ];
  }, [
    l,
    D
  ]), ae = ex.useSyncExternalStore(S.useCallback(
    (pe) => ne(D, (_e, Re) => {
      z(Re, _e) || pe();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      D
    ]
  ), X[0], X[1]), j = w[D] && w[D].length > 0, k = ae.data, G = at(k) ? T && R_(T) ? jh(T) : T : k, ee = ae.error, se = S.useRef(G), de = b ? at(k) ? at(se.current) ? G : se.current : k : G, he = D && at(G), J = S.useRef(null);
  !Rl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  ex.useSyncExternalStore(OO, () => (J.current = !1, J), () => (J.current = !0, J));
  const ve = J.current;
  x && ve && !u && he && console.warn(`Missing pre-initiated data for serialized key "${D}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const De = !D || !a || I().isPaused() || j && !at(ee) ? !1 : F && !at(d) ? d : u ? at(G) ? !1 : p : at(G) || p, Oe = F && De, Ee = at(ae.isValidating) ? Oe : ae.isValidating, we = at(ae.isLoading) ? Oe : ae.isLoading, Me = S.useCallback(
    async (pe) => {
      const _e = U.current;
      if (!D || !_e || H.current || I().isPaused())
        return !1;
      let Re, Ae, lt = !0;
      const Ze = pe || {}, Fe = !C[D] || !Ze.dedupe, Ke = () => ax ? !H.current && D === B.current && O.current : D === B.current, vt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(vt);
      }, Yt = () => {
        const pt = C[D];
        pt && pt[1] === Ae && delete C[D];
      }, Lt = {
        isValidating: !0
      };
      at($().data) && (Lt.isLoading = !0);
      try {
        if (Fe && (K(Lt), i.loadingTimeout && at($().data) && setTimeout(() => {
          lt && Ke() && I().onLoadingSlow(D, i);
        }, i.loadingTimeout), C[D] = [
          _e(E),
          gm()
        ]), [Re, Ae] = C[D], Re = await Re, Fe && setTimeout(Yt, i.dedupingInterval), !C[D] || C[D][1] !== Ae)
          return Fe && Ke() && I().onDiscarded(D), !1;
        vt.error = pn;
        const pt = R[D];
        if (!at(pt) && // case 1
        (Ae <= pt[0] || // case 2
        Ae <= pt[1] || // case 3
        pt[1] === 0))
          return yt(), Fe && Ke() && I().onDiscarded(D), !1;
        const ut = $().data;
        vt.data = s(ut, Re) ? ut : Re, Fe && Ke() && I().onSuccess(Re, D, i);
      } catch (pt) {
        Yt();
        const ut = I(), { shouldRetryOnError: Zn } = ut;
        ut.isPaused() || (vt.error = pt, Fe && Ke() && (ut.onError(pt, D, ut), (Zn === !0 || qa(Zn) && Zn(pt)) && (!I().revalidateOnFocus || !I().revalidateOnReconnect || Q()) && ut.onErrorRetry(pt, D, ut, (_n) => {
          const nn = w[D];
          nn && nn[0] && nn[0](tx, _n);
        }, {
          retryCount: (Ze.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return lt = !1, yt(), !0;
    },
    // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      D,
      l
    ]
  ), Ye = S.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...pe) => M_(l, B.current, ...pe),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Mh(() => {
    U.current = a, A.current = i, at(k) || (se.current = k);
  }), Mh(() => {
    if (!D) return;
    const pe = Me.bind(pn, Oh);
    let _e = 0;
    I().revalidateOnFocus && (_e = Date.now() + I().focusThrottleInterval);
    const Ae = jO(D, w, (lt, Ze = {}) => {
      if (lt == E_) {
        const Fe = Date.now();
        I().revalidateOnFocus && Fe > _e && Q() && (_e = Fe + I().focusThrottleInterval, pe());
      } else if (lt == N_)
        I().revalidateOnReconnect && Q() && pe();
      else {
        if (lt == C_)
          return Me();
        if (lt == tx)
          return Me(Ze);
      }
    });
    return H.current = !1, B.current = D, O.current = !0, K({
      _k: E
    }), De && (C[D] || (at(G) || Rl ? pe() : hO(pe))), () => {
      H.current = !0, Ae();
    };
  }, [
    D
  ]), Mh(() => {
    let pe;
    function _e() {
      const Ae = qa(m) ? m($().data) : m;
      Ae && pe !== -1 && (pe = setTimeout(Re, Ae));
    }
    function Re() {
      !$().error && (y || I().isVisible()) && (g || I().isOnline()) ? Me(Oh).then(_e) : _e();
    }
    return _e(), () => {
      pe && (clearTimeout(pe), pe = -1);
    };
  }, [
    m,
    y,
    g,
    D
  ]), S.useDebugValue(de), u) {
    if (!ax && Rl && he)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    he && (U.current = a, A.current = i, H.current = !1);
    const pe = N[D], _e = !at(pe) && he ? Ye(pe) : lx;
    if (jh(_e), !at(ee) && he)
      throw ee;
    const Re = he ? Me(Oh) : lx;
    !at(de) && he && (Re.status = "fulfilled", Re.value = !0), jh(Re);
  }
  return {
    mutate: Ye,
    get data() {
      return Y.data = !0, de;
    },
    get error() {
      return Y.error = !0, ee;
    },
    get isValidating() {
      return Y.isValidating = !0, Ee;
    },
    get isLoading() {
      return Y.isLoading = !0, we;
    }
  };
}, ls = AO(zO);
var LO = "eb2vop0", kO = "eb2vop1", HO = "eb2vop2", BO = "eb2vop3", UO = "eb2vop4";
function VO({
  open: e,
  title: a,
  message: i,
  confirmLabel: l = "Confirm",
  cancelLabel: s = "Cancel",
  onConfirm: u,
  onCancel: c
}) {
  const d = S.useRef(null), p = S.useRef(c);
  return p.current = c, S.useEffect(() => {
    if (!e) return;
    d.current?.querySelector("button[data-confirm]")?.focus();
    const m = (y) => {
      y.key === "Escape" && p.current();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [e]), e ? (
    // biome-ignore lint/a11y/useKeyWithClickEvents: scrim dismiss is a convenience; Escape is handled above
    /* @__PURE__ */ v.jsx("div", { className: LO, onClick: c, children: /* @__PURE__ */ v.jsxs(
      "div",
      {
        ref: d,
        className: kO,
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": a,
        onClick: (m) => m.stopPropagation(),
        children: [
          /* @__PURE__ */ v.jsx("span", { className: HO, children: a }),
          /* @__PURE__ */ v.jsx("span", { className: BO, children: i }),
          /* @__PURE__ */ v.jsxs("div", { className: UO, children: [
            /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: c, children: s }),
            /* @__PURE__ */ v.jsx(ua, { variant: "primary", onClick: u, "data-confirm": !0, children: l })
          ] })
        ]
      }
    ) })
  ) : null;
}
var $O = "_1xasopc0", qO = "_1xasopc1", IO = "_1xasopc2", YO = "_1xasopc3", GO = "_1xasopc4", FO = "_1xasopc5", XO = "_1xasopc6", PO = "_1xasopc7", ZO = "_1xasopc8";
function QO(e, a) {
  const i = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (i.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return i.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function KO(e, a, i) {
  for (const l of e) {
    if (a && !QO(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (i !== void 0 && l.size > i)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function ox({
  accept: e,
  maxSizeBytes: a,
  multiple: i = !1,
  disabled: l = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: d,
  renderPreview: p,
  onFiles: m
}) {
  const y = S.useRef(null), g = S.useId(), b = S.useId(), [x, w] = S.useState(!1), [R, C] = S.useState(null), [N, D] = S.useState([]), E = S.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), ne = i ? K : K.slice(0, 1), L = KO(ne, e, a);
      if (L) {
        C(L);
        return;
      }
      C(null), D(ne), m(ne);
    },
    [e, a, i, m]
  ), O = S.useCallback(() => {
    l || y.current?.click();
  }, [l]), H = S.useCallback(
    ($) => {
      l || ($.key === "Enter" || $.key === " ") && ($.preventDefault(), O());
    },
    [l, O]
  ), B = S.useCallback(
    ($) => {
      $.preventDefault(), w(!1), !l && E($.dataTransfer.files);
    },
    [l, E]
  ), U = S.useCallback(
    ($) => {
      $.preventDefault(), l || w(!0);
    },
    [l]
  ), A = S.useCallback(($) => {
    $.preventDefault(), w(!1);
  }, []), I = [u ? b : null, R ? g : null].filter(Boolean).join(" "), Q = [
    $O,
    x ? qO : "",
    l ? IO : "",
    R !== null ? YO : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": l,
        "aria-describedby": I || void 0,
        className: Q,
        onClick: O,
        onKeyDown: H,
        onDrop: B,
        onDragOver: U,
        onDragLeave: A,
        children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: GO,
              accept: e,
              multiple: i,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => E($.target.files)
            }
          ),
          /* @__PURE__ */ v.jsx("span", { className: FO, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ v.jsx("span", { id: b, className: XO, children: u }),
          p && N.length > 0 && /* @__PURE__ */ v.jsx("div", { className: ZO, children: p(N) })
        ]
      }
    ),
    R && /* @__PURE__ */ v.jsx("div", { id: g, role: "alert", className: PO, children: R })
  ] });
}
function WO(e) {
  const [a, i] = S.useState(null);
  return S.useEffect(() => {
    if (!e) {
      i(null);
      return;
    }
    const l = URL.createObjectURL(e);
    return i(l), () => URL.revokeObjectURL(l);
  }, [e]), a;
}
async function JO(e) {
  const a = new FormData();
  a.append("file", e);
  const i = await fetch(`${Lc}/uploads`, { method: "POST", body: a });
  if (!i.ok) {
    let l = null;
    try {
      l = await i.json();
    } catch {
      l = null;
    }
    throw new zc(
      i.status,
      l?.category ?? "unknown",
      l?.message ?? i.statusText,
      l?.requestId
    );
  }
  return await i.json();
}
function sx(e, a, i) {
  const [l, s] = S.useState(null), [u, c] = S.useState(!1), [d, p] = S.useState(null), m = WO(l), y = S.useCallback(
    async (w) => {
      if (s(w), p(null), !w) {
        e(null, null);
        return;
      }
      c(!0);
      try {
        const { path: R } = await JO(w);
        e(w.name, R);
      } catch (R) {
        const C = R instanceof zc ? R.message : "Upload failed. Try again.";
        p(C), e(null, null), ca.error(C);
      } finally {
        c(!1);
      }
    },
    [e]
  ), g = S.useCallback(() => {
    i(), ca.warning("Input image no longer on disk — re-upload to render");
  }, [i]), b = l ? null : ip(a);
  return { file: l, uploading: u, uploadError: d, previewUrl: m ?? b, pick: y, handleRemotePreviewError: g };
}
var ez = "cyswg40", ux = "cyswg41", cx = "cyswg42", Xu = "cyswg43", fx = "cyswg44", dx = "cyswg45", hx = "cyswg46", mx = "cyswg47", Pu = "cyswg48";
const px = 32 * 1024 * 1024;
function tz({
  refImageRequired: e,
  lastImageRequired: a,
  refError: i,
  lastError: l
}) {
  const {
    params: s,
    refImageName: u,
    lastImageName: c,
    setRefImage: d,
    setLastImage: p,
    clearRefImageSilent: m,
    clearLastImageSilent: y
  } = Qt(), g = S.useCallback(
    (E, O) => d(E, O ?? ""),
    [d]
  ), b = S.useCallback(
    (E, O) => p(E, O),
    [p]
  ), x = s.ref_image_path && s.ref_image_path.length > 0 ? s.ref_image_path : null, w = s.last_image_path && s.last_image_path.length > 0 ? s.last_image_path : null, R = sx(g, x, m), C = sx(b, w, y), N = R.previewUrl, D = C.previewUrl;
  return /* @__PURE__ */ v.jsxs("div", { className: ez, children: [
    /* @__PURE__ */ v.jsxs("div", { className: ux, children: [
      /* @__PURE__ */ v.jsxs("span", { className: cx, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ v.jsx(Fn, { tone: "accent", children: "required" }) : /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ v.jsx(
        ox,
        {
          accept: "image/*",
          maxSizeBytes: px,
          ariaLabel: "reference image upload",
          label: R.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (E) => void R.pick(E[0] ?? null),
          renderPreview: () => R.file && N ? /* @__PURE__ */ v.jsx("img", { className: Xu, src: N, alt: "reference preview" }) : null
        }
      ),
      !R.file && N && /* @__PURE__ */ v.jsxs("div", { className: fx, children: [
        /* @__PURE__ */ v.jsx(
          "img",
          {
            className: Xu,
            src: N,
            alt: "reference preview",
            onError: R.handleRemotePreviewError
          }
        ),
        /* @__PURE__ */ v.jsxs("span", { className: dx, children: [
          "Restored from a past run",
          u ? ` · ${u}` : ""
        ] })
      ] }),
      R.uploading && /* @__PURE__ */ v.jsx("span", { className: mx, children: "Uploading…" }),
      !R.uploading && R.file && /* @__PURE__ */ v.jsx("span", { className: hx, children: R.file.name }),
      R.uploadError && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: R.uploadError }),
      i && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: i })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: ux, children: [
      /* @__PURE__ */ v.jsxs("span", { className: cx, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ v.jsx(
        ox,
        {
          accept: "image/*",
          maxSizeBytes: px,
          ariaLabel: "last image upload",
          label: C.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (E) => void C.pick(E[0] ?? null),
          renderPreview: () => C.file && D ? /* @__PURE__ */ v.jsx("img", { className: Xu, src: D, alt: "last preview" }) : null
        }
      ),
      !C.file && D && /* @__PURE__ */ v.jsxs("div", { className: fx, children: [
        /* @__PURE__ */ v.jsx(
          "img",
          {
            className: Xu,
            src: D,
            alt: "last preview",
            onError: C.handleRemotePreviewError
          }
        ),
        /* @__PURE__ */ v.jsxs("span", { className: dx, children: [
          "Restored from a past run",
          c ? ` · ${c}` : ""
        ] })
      ] }),
      C.uploading && /* @__PURE__ */ v.jsx("span", { className: mx, children: "Uploading…" }),
      !C.uploading && C.file && /* @__PURE__ */ v.jsx("span", { className: hx, children: C.file.name }),
      C.uploadError && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: C.uploadError }),
      l && /* @__PURE__ */ v.jsx("span", { role: "alert", className: Pu, children: l })
    ] })
  ] });
}
var nz = "_1hbttwg0", az = "_1hbttwg1", rz = "_1hbttwg2", iz = "_1hbttwg3", j_ = "_1hbttwg4", lz = "_1hbttwg5", oz = "_1hbttwg7 _1hbttwg6", sz = "_1hbttwg8 _1hbttwg6", gx = "_1hbttwg9", O_ = "_1hbttwga", kl = "_1hbttwgb", Hl = "_1hbttwgc", Bl = "_1hbttwgd", uz = "lb0y1x0", cz = "lb0y1x1", fz = "lb0y1x2", dz = "lb0y1x3 lb0y1x2", hz = "lb0y1x4", mz = "lb0y1x6", pz = "lb0y1x7", gz = "lb0y1x8", vz = "lb0y1x9", yz = "lb0y1xa", bz = "lb0y1xb", xz = "lb0y1xc", wz = "lb0y1xd", _z = "lb0y1xe", Sz = "lb0y1xf";
function Ez() {
  return /* @__PURE__ */ v.jsx("span", { className: hz, "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(
    "path",
    {
      d: "M4 6l4 4 4-4",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
function Nz() {
  return /* @__PURE__ */ v.jsx("span", { className: _z, "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(
    "path",
    {
      d: "M3.5 8.5l3 3 6-7.5",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
function Cz({
  id: e,
  value: a,
  options: i,
  onChange: l,
  placeholder: s = "Select…",
  searchPlaceholder: u = "Search…",
  searchLabel: c = "Search options",
  disabled: d = !1
}) {
  const [p, m] = S.useState(!1), [y, g] = S.useState(""), [b, x] = S.useState(0), w = S.useRef(null), R = S.useRef(null), C = S.useRef(null), N = S.useRef(null), D = S.useId(), E = S.useMemo(() => i.find((Q) => Q.value === a) ?? null, [i, a]), O = S.useMemo(() => {
    const Q = y.trim().toLowerCase();
    return Q ? i.filter(($) => $.label.toLowerCase().includes(Q)) : i;
  }, [i, y]), H = S.useCallback((Q) => {
    m(!1), g(""), Q && R.current?.focus();
  }, []), B = S.useCallback(
    (Q) => {
      l(Q.value), H(!0);
    },
    [l, H]
  );
  S.useEffect(() => {
    if (!p) return;
    C.current?.focus();
    const Q = i.findIndex(($) => $.value === a);
    x(Q >= 0 ? Q : 0);
  }, [p, i, a]), S.useEffect(() => {
    x((Q) => Math.min(Math.max(0, Q), Math.max(0, O.length - 1)));
  }, [O.length]), S.useEffect(() => {
    if (!p) return;
    N.current?.children[b]?.scrollIntoView?.({ block: "nearest" });
  }, [p, b]), S.useEffect(() => {
    if (!p) return;
    const Q = ($) => {
      w.current && !w.current.contains($.target) && H(!1);
    };
    return document.addEventListener("mousedown", Q), () => document.removeEventListener("mousedown", Q);
  }, [p, H]);
  const U = (Q) => {
    switch (Q.key) {
      case "ArrowDown":
        Q.preventDefault(), x(($) => Math.min(O.length - 1, Math.max(0, $) + 1));
        break;
      case "ArrowUp":
        Q.preventDefault(), x(($) => Math.max(0, $ - 1));
        break;
      case "Home":
        Q.preventDefault(), x(0);
        break;
      case "End":
        Q.preventDefault(), x(Math.max(0, O.length - 1));
        break;
      case "Enter": {
        Q.preventDefault();
        const $ = O[b];
        $ && B($);
        break;
      }
      case "Escape":
        Q.preventDefault(), H(!0);
        break;
    }
  }, A = (Q) => {
    !p && (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), m(!0));
  }, I = p && O[b] ? `${D}-opt-${b}` : void 0;
  return /* @__PURE__ */ v.jsxs("div", { className: uz, ref: w, children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        id: e,
        ref: R,
        className: cz,
        "aria-haspopup": "listbox",
        "aria-expanded": p,
        "aria-controls": p ? D : void 0,
        disabled: d,
        "aria-busy": d || void 0,
        onClick: () => p ? H(!1) : m(!0),
        onKeyDown: A,
        children: [
          /* @__PURE__ */ v.jsx("span", { className: E ? fz : dz, children: E ? E.label : s }),
          /* @__PURE__ */ v.jsx(Ez, {})
        ]
      }
    ),
    p && /* @__PURE__ */ v.jsxs("div", { className: mz, children: [
      /* @__PURE__ */ v.jsx("div", { className: pz, children: /* @__PURE__ */ v.jsx(
        "input",
        {
          ref: C,
          type: "text",
          role: "combobox",
          "aria-expanded": !0,
          "aria-controls": D,
          "aria-activedescendant": I,
          "aria-autocomplete": "list",
          "aria-label": c,
          className: gz,
          placeholder: u,
          value: y,
          onChange: (Q) => g(Q.target.value),
          onKeyDown: U
        }
      ) }),
      /* @__PURE__ */ v.jsx(
        "div",
        {
          ref: N,
          id: D,
          role: "listbox",
          "aria-label": c,
          tabIndex: -1,
          className: vz,
          children: O.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: Sz, children: "No matches" }) : O.map((Q, $) => {
            const K = Q.value === a, ne = $ === b, L = [
              yz,
              ne ? bz : "",
              K ? xz : ""
            ].filter(Boolean).join(" ");
            return /* @__PURE__ */ v.jsxs(
              "button",
              {
                type: "button",
                id: `${D}-opt-${$}`,
                role: "option",
                "aria-selected": K,
                tabIndex: -1,
                "data-active": ne || void 0,
                className: L,
                onClick: () => B(Q),
                onMouseMove: () => x($),
                children: [
                  /* @__PURE__ */ v.jsx("span", { className: wz, children: Q.label }),
                  K && /* @__PURE__ */ v.jsx(Nz, {})
                ]
              },
              Q.value
            );
          })
        }
      )
    ] })
  ] });
}
const Rz = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function Tz(e) {
  return e.replace(/^[a-z0-9_]+:/i, "");
}
function Mz(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function Dz(e) {
  return Rz.has(e.format) && e.install_path !== null;
}
function Az(e) {
  return e.filter((a) => Dz(a) && a.install_path).map((a) => ({
    value: a.install_path,
    label: `${Mz(a.filename)}${a.family_id ? ` (${Tz(a.family_id)})` : ""}`
  })).sort((a, i) => a.label.localeCompare(i.label));
}
function z_() {
  const [e, a] = S.useState(!1), i = S.useRef(0), l = S.useRef(!0);
  S.useEffect(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const s = S.useCallback((u) => {
    i.current += 1, a(!0), C1(u).catch(() => {
    }).finally(() => {
      i.current -= 1, l.current && i.current === 0 && a(!1);
    });
  }, []);
  return { saving: e, persist: s };
}
const jz = "/api/v1/model-store/installed";
async function Oz() {
  const e = await fetch(jz, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var zn = "_1czy96m0", wn = "_1czy96m1", Qc = "_1czy96m2", cp = "_1czy96m3", fp = "_1czy96m4", L_ = "_1czy96m5", k_ = "_1czy96m6", H_ = "_1czy96m7", B_ = "_1czy96m8", dp = "_1czy96m9", zz = "_1czy96ma", vx = "_1czy96mb", yx = "_1czy96mc", bx = "_1czy96md", xx = "_1czy96me", wx = "_1czy96mf", _x = "_1czy96mg", Sx = "_1czy96mh", Lz = "_1czy96mi", kz = "_1czy96mk _1czy96mj", Hz = "_1czy96ml _1czy96mj", Bz = "_1czy96mm", Uz = "_1czy96mn", Vz = "_1czy96mo", $z = "_1czy96mp", qz = "_1czy96mq", U_ = "_1czy96mr", Iz = "_1czy96ms", Ex = "_1czy96mt", Yz = "_1czy96mu", Gz = "_1czy96mv", Fz = "_1czy96mw", Xz = "_1czy96mx", Pz = "_1czy96my", Zz = "_1czy96mz", Qz = "_1czy96m10", Kz = "_1czy96m11", Wz = "_1czy96m12", zh = "_1czy96m13", Ci = "_1czy96m14", Ri = "_1czy96m15", xs = "_1czy96m16", cn = "_1czy96m17", Jz = "_1czy96m18", eL = "_1czy96m19";
const Zu = "__bundled__";
function tL() {
  return /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "open" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M4 6l4 4 4-4",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) });
}
function Lh({
  id: e,
  label: a,
  value: i,
  options: l,
  includeBundled: s,
  disabled: u,
  onChange: c
}) {
  const d = S.useMemo(() => {
    const p = s ? [{ value: Zu, label: "Bundled Wan2.2 (default)" }, ...l] : l;
    if (i && i !== Zu && !p.some((m) => m.value === i)) {
      const m = i.split(/[\\/]/).pop() || i;
      return [...p, { value: i, label: `${m} (not installed)` }];
    }
    return p;
  }, [s, l, i]);
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: e, children: a }),
    /* @__PURE__ */ v.jsx(
      Cz,
      {
        id: e,
        value: i ?? Zu,
        options: d,
        onChange: (p) => c(p === Zu ? void 0 : p),
        placeholder: "Select a model file",
        searchPlaceholder: "Search models…",
        searchLabel: `${a} — search installed models`,
        disabled: u
      }
    )
  ] });
}
function nL() {
  const { params: e, settings: a, updateParam: i, setSettings: l } = Qt(), { saving: s, persist: u } = z_(), c = ls("svi2/installed-models", Oz), d = S.useMemo(
    () => Az(c.data?.installed ?? []),
    [c.data]
  ), p = e.dit_high_path ?? void 0, m = e.dit_low_path ?? void 0, y = typeof p == "string" && p.length > 0 && p === m, g = y, b = c.error !== void 0, x = a.sviLoraTier ?? e.svi_lora_tier ?? "high", w = S.useCallback(
    (N, D) => {
      i("dit_high_path", N), i("dit_low_path", D);
      const E = { ...a, ditHighPath: N ?? "", ditLowPath: D ?? "" };
      l(E), u(E);
    },
    [a, i, l, u]
  ), R = S.useCallback(
    (N) => {
      if (N) {
        const D = p ?? m ?? d[0]?.value;
        D && w(D, D);
      } else
        w(p, void 0);
    },
    [p, m, d, w]
  ), C = S.useCallback(
    (N) => {
      const D = N;
      i("svi_lora_tier", D);
      const E = { ...a, sviLoraTier: D };
      l(E), u(E);
    },
    [a, i, l, u]
  );
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-label": "Use one model file for both experts",
          className: Hl,
          disabled: s,
          "aria-busy": s || void 0,
          onClick: () => R(!y),
          children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Same file for both experts (single-file model)" })
    ] }),
    y ? /* @__PURE__ */ v.jsx(
      Lh,
      {
        id: "svi2-base-model",
        label: "Base model",
        value: p,
        options: d,
        includeBundled: !1,
        disabled: s,
        onChange: (N) => w(N, N)
      }
    ) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(
        Lh,
        {
          id: "svi2-model-high",
          label: "High-noise expert (runs first)",
          value: p,
          options: d,
          includeBundled: !0,
          disabled: s,
          onChange: (N) => w(N, m)
        }
      ),
      /* @__PURE__ */ v.jsx(
        Lh,
        {
          id: "svi2-model-low",
          label: "Low-noise expert (runs second)",
          value: m,
          options: d,
          includeBundled: !0,
          disabled: s,
          onChange: (N) => w(p, N)
        }
      )
    ] }),
    !g && /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": x !== "off",
          "aria-label": "Apply SVI LoRA to both experts",
          className: Hl,
          disabled: s,
          "aria-busy": s || void 0,
          onClick: () => C(x === "off" ? "high" : "off"),
          children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "SVI LoRA (auto: high→high, low→low). Turn off for merged checkpoints (e.g. SmoothMix)." })
    ] }),
    b && /* @__PURE__ */ v.jsx("span", { className: cn, children: "Model Foundry list unavailable — using the bundled base model." }),
    !b && d.length === 0 && /* @__PURE__ */ v.jsx("span", { className: cn, children: "No models installed via Model Foundry yet — using the bundled base model." }),
    g && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-svi-lora-tier", children: "SVI LoRA" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-svi-lora-tier",
            className: Ri,
            value: x,
            disabled: s,
            "aria-busy": s || void 0,
            onChange: (N) => C(N.target.value),
            children: zC.map((N) => /* @__PURE__ */ v.jsx("option", { value: N.value, children: N.label }, N.value))
          }
        ),
        /* @__PURE__ */ v.jsx(tL, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Which SVI2 LoRA wraps this single-file model. Off for community merges (e.g. SmoothMix)." })
    ] })
  ] });
}
const aL = "/api/v1/model-store/installed";
function rL(e) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const l of e) {
    if (!(l.role === "lora" || l.format === "safetensors") || l.install_path === null || l.install_path.length === 0)
      continue;
    const u = `${l.family_id}/${l.filename}`;
    a.has(u) || (a.add(u), i.push({
      artifactId: l.artifact_id,
      familyId: l.family_id,
      filename: l.filename,
      installPath: l.install_path
    }));
  }
  return i;
}
async function iL() {
  const e = await fetch(aL, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json(), i = "installed" in a ? a : a.data ?? { installed: [] };
  return rL(i.installed);
}
const fc = 4, kh = 4;
function lL(e) {
  return e.weight_high ?? e.weight ?? 1;
}
function oL(e) {
  return e.weight_low ?? e.weight ?? 1;
}
function sL(e) {
  return e.length >= fc ? e : [...e, { path: "", weight_high: 1, weight_low: 1 }];
}
function uL(e, a) {
  return e.filter((i, l) => l !== a);
}
function cL(e, a, i) {
  return e.map((l, s) => s === a ? { ...l, path: i } : l);
}
function fL(e, a, i) {
  return e.map((l, s) => s === a ? { ...l, weight_high: i } : l);
}
function dL(e, a, i) {
  return e.map((l, s) => s === a ? { ...l, weight_low: i } : l);
}
const Qu = "__none__";
function Nx({
  tier: e,
  value: a,
  onChange: i
}) {
  const l = S.useId(), u = { flex: 1, "--svi2-slider-fill": `${Math.max(0, Math.min(kh, a)) / kh * 100}%` };
  return /* @__PURE__ */ v.jsxs("div", { className: eL, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: l, style: { width: "34px" }, children: e }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        id: l,
        type: "range",
        className: O_,
        min: 0,
        max: kh,
        step: 0.05,
        value: a,
        onChange: (c) => i(parseFloat(c.target.value)),
        style: u
      }
    ),
    /* @__PURE__ */ v.jsx("span", { className: dp, children: a.toFixed(2) })
  ] });
}
function hL({
  rowIndex: e,
  row: a,
  options: i,
  onPath: l,
  onWeightHigh: s,
  onWeightLow: u,
  onRemove: c
}) {
  const d = S.useId(), p = a.path.length > 0 ? a.path : Qu, m = (y) => {
    l(y === Qu ? null : y);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
      /* @__PURE__ */ v.jsxs("label", { className: wn, htmlFor: d, style: { flex: 1 }, children: [
        "LoRA ",
        e + 1
      ] }),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          "aria-label": `Remove LoRA ${e + 1}`,
          onClick: c,
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
            lineHeight: 1,
            color: "var(--color-text-muted, #888)"
          },
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: d,
          className: Ri,
          value: p,
          onChange: (y) => m(y.target.value),
          children: [
            /* @__PURE__ */ v.jsx("option", { value: Qu, children: "None" }),
            i.map((y) => /* @__PURE__ */ v.jsxs("option", { value: y.installPath, children: [
              y.filename,
              y.familyId ? ` (${y.familyId.replace(/^[^:]+:/, "")})` : ""
            ] }, y.artifactId))
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            d: "M4 6l4 4 4-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }) })
    ] }),
    p !== Qu && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx(Nx, { tier: "High", value: lL(a), onChange: s }),
      /* @__PURE__ */ v.jsx(Nx, { tier: "Low", value: oL(a), onChange: u }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Per-expert weight (0 = off for that expert). Distill LoRAs like lightx2v run High>Low, e.g. 3.0 / 1.5." })
    ] })
  ] });
}
function mL() {
  const { params: e, updateParam: a } = Qt(), i = ls("svi2/installed-loras", iL, {
    shouldRetryOnError: !1
  }), l = i.data ?? [], s = e.user_loras ?? [], u = (c) => a("user_loras", c);
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    i.error && /* @__PURE__ */ v.jsx("div", { className: Jz, role: "alert", children: "Failed to load installed LoRAs" }),
    /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("span", { className: wn, children: "LoRAs (applied to both experts)" }),
      s.map((c, d) => /* @__PURE__ */ v.jsx(
        hL,
        {
          rowIndex: d,
          row: c,
          options: l,
          onPath: (p) => u(cL(s, d, p ?? "")),
          onWeightHigh: (p) => u(fL(s, d, p)),
          onWeightLow: (p) => u(dL(s, d, p)),
          onRemove: () => u(uL(s, d))
        },
        d
      )),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          onClick: () => u(sL(s)),
          disabled: s.length >= fc,
          className: cn,
          style: {
            background: "none",
            border: "none",
            cursor: s.length >= fc ? "not-allowed" : "pointer",
            padding: "4px 0",
            textAlign: "left",
            opacity: s.length >= fc ? 0.45 : 1
          },
          children: "+ Add LoRA"
        }
      )
    ] })
  ] });
}
const os = "custom", pL = [
  {
    presetId: "svi-canonical",
    label: "Native",
    sub: "SVI 2.0 Pro 480p training budget",
    stepsDown: 0,
    offDistribution: !1
  },
  {
    presetId: "svi-canonical-704",
    label: "One step down",
    sub: "Mild downscale from native",
    stepsDown: 1,
    offDistribution: !0
  },
  {
    presetId: "svi-canonical-640",
    label: "Two steps down",
    sub: "Below 480p training budget",
    stepsDown: 2,
    offDistribution: !0
  }
];
function hp(e) {
  const a = new Map(e.map((l) => [l.id, l])), i = [];
  for (const l of pL) {
    const s = a.get(l.presetId), u = s?.params.width, c = s?.params.height;
    !u || !c || i.push({
      id: l.presetId,
      width: u,
      height: c,
      label: l.label,
      sub: l.sub,
      stepsDown: l.stepsDown,
      offDistribution: l.offDistribution
    });
  }
  return i;
}
function mp(e, a) {
  const i = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return i ? i.id : os;
}
var gL = "_14qe5430", vL = "_14qe5431", yL = "_14qe5432", bL = "_14qe5433", xL = "_14qe5434", wL = "_14qe5435", _L = "_14qe5436", SL = "_14qe5437", EL = "_14qe5438", NL = "_14qe543a _14qe5439", CL = "_14qe543b _14qe5439", RL = "_14qe543c _14qe5439";
const TL = {
  ok: vL,
  neutral: yL,
  warn: bL
}, ML = {
  ok: wL,
  neutral: _L,
  warn: SL
}, DL = {
  ok: NL,
  neutral: CL,
  warn: RL
};
function AL(e, a) {
  return e === 0 ? {
    tone: "ok",
    text: "In distribution — identity-lock nominal at the native 480p budget.",
    tag: "in-distribution"
  } : e === 1 ? {
    tone: "neutral",
    text: "One step below native — minor identity drift possible, but well within bounds.",
    tag: "caution"
  } : e !== null && e >= 2 ? {
    tone: "warn",
    text: "Below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.",
    tag: "off-distribution"
  } : a ? { tone: "warn", text: a, tag: "custom" } : {
    tone: "neutral",
    text: "Custom resolution — outside the preset ladder. Identity-lock is untested here.",
    tag: "custom"
  };
}
function jL({ tone: e }) {
  return e === "ok" ? /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "in distribution" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M7 10l2.1 2.1L13.2 8",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) : e === "warn" ? /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "warning" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M10 2.6L18.6 17H1.4L10 2.6z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ v.jsx("path", { d: "M10 8v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "14.4", r: "0.9", fill: "currentColor" })
  ] }) : /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "info" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ v.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "6.2", r: "0.9", fill: "currentColor" })
  ] });
}
function OL({
  presets: e,
  warningText: a
}) {
  const { params: i } = Qt(), l = S.useMemo(() => hp(e), [e]);
  if (l.length === 0) return null;
  const s = mp(i, l), u = s === os ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = AL(u, a);
  return /* @__PURE__ */ v.jsxs(
    "output",
    {
      className: [gL, TL[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ v.jsx("span", { className: [xL, ML[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(jL, { tone: c.tone }) }),
        /* @__PURE__ */ v.jsx("span", { className: EL, children: c.text }),
        /* @__PURE__ */ v.jsx("span", { className: DL[c.tone], children: c.tag })
      ]
    }
  );
}
var zL = "_5d10lv0";
const Bo = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], LL = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.", kL = /* @__PURE__ */ new Set(["ArrowRight", "ArrowDown"]), HL = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowUp"]);
function BL(e) {
  return [fp, e ? L_ : ""].filter(Boolean).join(" ");
}
function UL({ value: e, onChange: a }) {
  const i = S.useId(), l = (s) => {
    const u = kL.has(s.key), c = HL.has(s.key);
    if (!u && !c) return;
    s.preventDefault();
    const d = Bo.findIndex((y) => y.value === e), m = Bo[(d + (u ? 1 : -1) + Bo.length) % Bo.length];
    m && m.value !== e && a(m.value);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: i, children: "Mode" }),
    /* @__PURE__ */ v.jsx("div", { className: Qc, children: /* @__PURE__ */ v.jsx(
      "div",
      {
        className: cp,
        role: "radiogroup",
        "aria-labelledby": i,
        onKeyDown: l,
        children: Bo.map((s) => {
          const u = e === s.value;
          return /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": u,
              tabIndex: u ? 0 : -1,
              className: BL(u),
              onClick: () => a(s.value),
              children: s.label
            },
            s.value
          );
        })
      }
    ) }),
    e === "text_to_video" && /* @__PURE__ */ v.jsx("p", { className: zL, "aria-live": "polite", children: LL })
  ] });
}
var VL = "dck790", $L = "dck791", qL = "dck792";
function Cc({ title: e, detail: a, action: i, className: l }) {
  const s = [VL, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: s, children: [
    /* @__PURE__ */ v.jsx("span", { className: $L, children: e }),
    a && /* @__PURE__ */ v.jsx("span", { className: qL, children: a }),
    i
  ] });
}
var IL = "_1880igs0", YL = "_1880igs1", GL = "_1880igs2", FL = "_1880igs3", XL = "_1880igs4", PL = "_1880igs5", ZL = "_1880igs6", QL = "_1880igs7", KL = "_1880igs8";
const WL = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function JL({ jobs: e, onOpen: a, onDelete: i }) {
  return e.length === 0 ? /* @__PURE__ */ v.jsx(
    Cc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ v.jsx("div", { className: IL, children: e.map((l) => /* @__PURE__ */ v.jsxs("div", { className: YL, children: [
    /* @__PURE__ */ v.jsxs("button", { type: "button", className: GL, onClick: () => a(l), children: [
      /* @__PURE__ */ v.jsxs("span", { className: XL, children: [
        /* @__PURE__ */ v.jsx("span", { className: PL, children: l.presetId ?? "custom" }),
        /* @__PURE__ */ v.jsx("span", { className: ZL, children: t6(l) })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: QL, children: [
        /* @__PURE__ */ v.jsx(
          "time",
          {
            className: KL,
            dateTime: l.createdAt,
            title: n6(l.createdAt),
            children: a6(l.createdAt)
          }
        ),
        /* @__PURE__ */ v.jsx(Fn, { tone: WL[l.status], children: l.status })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: FL,
        "aria-label": `Delete ${l.presetId ?? "custom"} render from history`,
        title: "Delete from history",
        onClick: () => i(l),
        children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 24 24", width: "15", height: "15", "aria-hidden": "true", children: [
          /* @__PURE__ */ v.jsx("title", { children: "delete" }),
          /* @__PURE__ */ v.jsx(
            "path",
            {
              d: "M6 6l12 12M18 6L6 18",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          )
        ] })
      }
    )
  ] }, l.id)) });
}
const e6 = S.memo(JL);
function t6(e) {
  const a = e.params, i = [];
  return a.width && a.height && i.push(`${a.width}×${a.height}`), a.num_clips && i.push(`${a.num_clips} clips`), a.num_inference_steps && i.push(`${a.num_inference_steps} steps`), i.join(" · ") || "—";
}
function n6(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function a6(e) {
  const a = new Date(e), i = a.getTime();
  if (Number.isNaN(i)) return "";
  const l = Date.now() - i;
  if (l < 0) return "just now";
  const s = Math.floor(l / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const u = Math.floor(s / 60);
  if (u < 24) return `${u}h ago`;
  const c = Math.floor(u / 24);
  return c < 7 ? `${c}d ago` : a.toLocaleDateString();
}
function r6() {
  const { presetId: e, params: a } = Qt();
  return Zc(e, a) ? /* @__PURE__ */ v.jsx(l6, {}) : /* @__PURE__ */ v.jsx(i6, {});
}
function V_(e) {
  return [fp, e ? L_ : ""].filter(Boolean).join(" ");
}
function i6() {
  const { params: e, updateParam: a } = Qt(), i = Oi(e), l = s5(e.num_clips ?? 1, i), [s, u] = S.useState(
    () => Number(lm(e.num_clips ?? 1, i).toFixed(1))
  ), c = (d) => {
    const p = a5(d, i);
    a("num_clips", p.numClips), a("frames_per_clip", p.framesPerClip);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ v.jsxs("div", { className: Qc, children: [
      /* @__PURE__ */ v.jsx("div", { className: cp, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: y_.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: V_(p),
            onClick: () => {
              u(d), c(d);
            },
            children: [
              d,
              "s"
            ]
          },
          d
        );
      }) }),
      /* @__PURE__ */ v.jsxs("div", { className: k_, children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: H_,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            },
            onBlur: () => {
              u(Number(lm(e.num_clips ?? 1, Oi(e)).toFixed(1)));
            }
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: B_, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("output", { className: dp, "aria-live": "polite", children: u5(e) })
  ] });
}
function l6() {
  const { params: e, updateParam: a } = Qt(), i = Oi(e), l = l5(i.fps), [s, u] = S.useState(() => Number(x_(e).toFixed(1))), c = i5.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", Zb(m, i.fps));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ v.jsxs("div", { className: Qc, children: [
      /* @__PURE__ */ v.jsx("div", { className: cp, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = Zb(p, i.fps) === i.framesPerClip;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: V_(m),
            onClick: () => {
              u(p), d(p);
            },
            children: [
              p,
              "s"
            ]
          },
          p
        );
      }) : /* @__PURE__ */ v.jsxs("span", { className: fp, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ v.jsxs("div", { className: k_, children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: H_,
            min: 1,
            max: l,
            step: 0.5,
            value: s,
            onChange: (p) => {
              const m = Number(p.target.value);
              u(m), Number.isFinite(m) && m > 0 && d(m);
            }
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: B_, children: "sec" })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: cn, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        i.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("output", { className: dp, "aria-live": "polite", children: o5(e) })
  ] });
}
var o6 = "_17owg2e0", s6 = "_17owg2e1", u6 = "_17owg2e2", Ku = "_17owg2e3", Wu = "_17owg2e4", c6 = "_17owg2e5", f6 = "_17owg2e6", d6 = "_17owg2e7", h6 = "_17owg2e8";
function Hh() {
  return /* @__PURE__ */ v.jsx("span", { className: c6, "aria-hidden": "true" });
}
function m6({ presets: e }) {
  const { presetId: a, params: i } = Qt(), l = S.useMemo(() => hp(e), [e]), s = Oi(i), u = Zc(a, i), c = u ? 1 : i.num_clips ?? 1, d = u ? s.framesPerClip : b_(c, s), p = s.fps > 0 ? d / s.fps : 0, m = i.interpolate_fps ?? 0, y = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, b = typeof i.upscale_factor == "number" ? i.upscale_factor : 0, x = b > 0 ? b : 1, w = (i.width ?? 0) * x, R = (i.height ?? 0) * x, C = mp(i, l), N = C === os || (l.find((E) => E.id === C)?.stepsDown ?? 0) >= 2, D = [d6, N ? h6 : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ v.jsxs("div", { className: o6, children: [
    /* @__PURE__ */ v.jsx("span", { className: s6, children: "Output" }),
    /* @__PURE__ */ v.jsxs("div", { className: u6, children: [
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Ku, children: g }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "frames" })
      ] }),
      /* @__PURE__ */ v.jsx(Hh, {}),
      /* @__PURE__ */ v.jsxs("span", { className: Ku, children: [
        w,
        "×",
        R
      ] }),
      /* @__PURE__ */ v.jsx(Hh, {}),
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Ku, children: y }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "fps" })
      ] }),
      /* @__PURE__ */ v.jsx(Hh, {}),
      /* @__PURE__ */ v.jsxs("span", { children: [
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "~" }),
        /* @__PURE__ */ v.jsx("span", { className: Ku, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: Wu, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("span", { className: f6, children: [
      /* @__PURE__ */ v.jsx("span", { className: D, "aria-hidden": "true" }),
      N ? "off-distribution" : "ready"
    ] })
  ] });
}
var p6 = "dgx4n20", g6 = "dgx4n21", v6 = "dgx4n22", y6 = "dgx4n23", b6 = "dgx4n24", x6 = "dgx4n25", w6 = "dgx4n26", _6 = "dgx4n27", S6 = "dgx4n28", E6 = "dgx4n29", N6 = "dgx4n2a", C6 = "dgx4n2b", Cx = "dgx4n2c", R6 = "dgx4n2d", T6 = "dgx4n2e";
function M6(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function D6({ presets: e, selectedId: a, onSelect: i }) {
  const [l, s] = S.useState(!1), u = S.useMemo(() => v5(e), [e]), c = S.useMemo(() => {
    const b = u.legacy.filter((w) => w.id === a), x = l ? u.legacy : b;
    return [...u.featured, ...x];
  }, [u, l, a]), d = S.useRef([]), p = S.useCallback(
    (b) => {
      const x = c[b];
      x && (d.current[b]?.focus(), i(x));
    },
    [c, i]
  ), m = S.useCallback(
    (b, x) => {
      const w = c.length - 1;
      switch (b.key) {
        case "ArrowRight":
        case "ArrowDown":
          b.preventDefault(), p(x === w ? 0 : x + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          b.preventDefault(), p(x === 0 ? w : x - 1);
          break;
        case "Home":
          b.preventDefault(), p(0);
          break;
        case "End":
          b.preventDefault(), p(w);
          break;
      }
    },
    [c, p]
  );
  if (e.length === 0)
    return /* @__PURE__ */ v.jsx(
      Cc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((b) => b.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ v.jsxs("div", { className: N6, children: [
    /* @__PURE__ */ v.jsx("div", { className: p6, role: "radiogroup", "aria-label": "Render presets", children: c.map((b, x) => {
      const w = p5(b), R = b.id === a, C = b.id === is, N = [
        g6,
        b.legacy ? "" : v6,
        C ? y6 : "",
        R ? b6 : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ v.jsxs(
        "button",
        {
          ref: (D) => {
            d.current[x] = D;
          },
          type: "button",
          role: "radio",
          "aria-checked": R,
          tabIndex: x === y ? 0 : -1,
          title: b.description,
          className: N,
          onClick: () => i(b),
          onKeyDown: (D) => m(D, x),
          children: [
            /* @__PURE__ */ v.jsxs("div", { className: w6, children: [
              /* @__PURE__ */ v.jsx("span", { className: _6, children: b.label }),
              C && /* @__PURE__ */ v.jsx(Fn, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ v.jsx("span", { className: x6, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
                /* @__PURE__ */ v.jsx("title", { children: "selected" }),
                /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
                /* @__PURE__ */ v.jsx(
                  "path",
                  {
                    d: "M6.5 10.2l2.3 2.3 4.7-4.8",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: S6, children: M6(b.description) }),
            /* @__PURE__ */ v.jsxs("div", { className: E6, children: [
              /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: w.resolution }),
              /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: w.duration }),
              /* @__PURE__ */ v.jsx(Fn, { tone: w.isLowVram ? "success" : "neutral", children: w.vram }),
              w.isOffDistribution && /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "off-distribution" }),
              w.requiresLastImage && /* @__PURE__ */ v.jsx(Fn, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        b.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ v.jsxs("div", { className: C6, children: [
      /* @__PURE__ */ v.jsx("span", { className: Cx, "aria-hidden": "true" }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: R6,
          "aria-expanded": l,
          onClick: () => s((b) => !b),
          children: [
            /* @__PURE__ */ v.jsx("span", { className: T6, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: Cx, "aria-hidden": "true" })
    ] })
  ] });
}
const A6 = S.memo(D6);
var j6 = "_1ntn2zv0", O6 = "_1ntn2zv1", z6 = "_1ntn2zv2", L6 = "_1ntn2zv3", k6 = "_1ntn2zv4", H6 = "_1ntn2zv5", Rx = "_1ntn2zv6", B6 = "_1ntn2zv7", U6 = "_1ntn2zv8", V6 = "_1ntn2zv9", $6 = "_1ntn2zva";
function q6({ error: e, textareaId: a }) {
  const { params: i, setPrompts: l } = Qt(), [s, u] = S.useState(!1), c = i.prompts ?? [""], d = S.useMemo(
    () => Math.max(1, i.num_clips ?? c.length ?? 1),
    [i.num_clips, c.length]
  ), p = S.useMemo(
    () => c.slice(d).filter((b) => b.trim().length > 0).length,
    [c, d]
  ), m = (b) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = b, l(x);
  }, y = (b, x) => {
    const w = Math.max(d, c.length, b + 1), R = Array.from({ length: w }, (C, N) => c[N] ?? "");
    R[b] = x, l(R);
  }, g = (b) => {
    if (u(b), b) {
      const x = c[0] ?? "", w = Math.max(d, c.length);
      l(Array.from({ length: w }, (R, C) => c[C] ?? x));
    }
  };
  return /* @__PURE__ */ v.jsxs("div", { className: j6, children: [
    /* @__PURE__ */ v.jsx("div", { className: O6, children: /* @__PURE__ */ v.jsxs("span", { className: z6, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: L6,
          onClick: () => g(!s),
          children: /* @__PURE__ */ v.jsx("span", { className: k6, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (b, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ v.jsxs("div", { className: B6, children: [
        /* @__PURE__ */ v.jsxs("span", { className: U6, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ v.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: Rx,
            "aria-label": `prompt for clip ${x + 1}`,
            "aria-invalid": x === 0 && e !== void 0 ? !0 : void 0,
            value: c[x] ?? "",
            onChange: (w) => y(x, w.target.value)
          }
        )
      ] }, `clip-${x}`)
    )) : /* @__PURE__ */ v.jsx(
      "textarea",
      {
        id: a,
        className: Rx,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (b) => m(b.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ v.jsxs("output", { className: H6, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ v.jsx("p", { className: V6, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ v.jsx("span", { role: "alert", className: $6, children: e })
  ] });
}
var I6 = "_1itrxk30", Y6 = "_1itrxk31", G6 = "_1itrxk32", F6 = "_1itrxk33", X6 = "_1itrxk34", P6 = "_1itrxk35", Z6 = "_1itrxk36", Q6 = "_1itrxk37";
function K6() {
  const { qwenEdit: e, setQwenEdit: a } = Qt();
  return /* @__PURE__ */ v.jsxs("div", { className: I6, children: [
    /* @__PURE__ */ v.jsxs("div", { className: Y6, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: Z6,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ v.jsx("span", { className: Q6, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsxs("span", { className: G6, children: [
        /* @__PURE__ */ v.jsx("span", { className: F6, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ v.jsx("span", { className: X6, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ v.jsx(
      "textarea",
      {
        className: P6,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (i) => a({ prompt: i.target.value })
      }
    )
  ] });
}
var W6 = "ob7g5b0", J6 = "ob7g5b1", e8 = "ob7g5b3", t8 = "ob7g5b4", n8 = "ob7g5b5", a8 = "ob7g5b6", r8 = "ob7g5b7", i8 = "ob7g5b8", l8 = "ob7g5b9", o8 = "ob7g5ba";
function s8({
  src: e,
  poster: a,
  fpsLabel: i,
  controls: l = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: d,
  className: p,
  emptyContent: m,
  onEnded: y,
  onReady: g,
  onError: b
}) {
  const [x, w] = S.useState("loading"), [R, C] = S.useState(null), N = S.useCallback(() => {
    w("ready"), g?.();
  }, [g]), D = S.useCallback(
    (O) => {
      const H = O.target, B = H.error?.message || `media error code ${H.error?.code ?? "?"}`;
      w("error"), C(B), b?.(new Error(B));
    },
    [b]
  ), E = [W6, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ v.jsx("div", { className: E, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ v.jsxs("div", { className: r8, children: [
    /* @__PURE__ */ v.jsx("div", { className: i8, children: "Could not play video" }),
    /* @__PURE__ */ v.jsx("div", { className: l8, children: R ?? "unknown error" }),
    /* @__PURE__ */ v.jsx("a", { className: o8, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ v.jsxs("div", { className: E, children: [
    x === "loading" && /* @__PURE__ */ v.jsx("div", { className: e8, "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("div", { className: t8 }) }),
    i && /* @__PURE__ */ v.jsx("span", { className: n8, children: i }),
    /* @__PURE__ */ v.jsx(
      "video",
      {
        className: J6,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: N,
        onEnded: y,
        onError: D,
        children: /* @__PURE__ */ v.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ v.jsx("div", { className: E, "aria-label": d ?? "no video", children: /* @__PURE__ */ v.jsx("div", { className: a8, children: m ?? "No video to display yet." }) });
}
const dr = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, Tx = {
  [dr.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [dr.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [dr.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [dr.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [dr.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [dr.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [dr.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [dr.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [dr.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function u8(e, a) {
  return e !== null && Tx[e] ? Tx[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
var Ju = "_1ojc56g0", c8 = "_1ojc56g1", f8 = "_1ojc56g2", d8 = "_1ojc56g3", h8 = "_1ojc56g4", m8 = "_1ojc56g5", p8 = "_1ojc56g6", g8 = "_1ojc56g7", v8 = "_1ojc56g8", ec = "_1ojc56g9", y8 = "_1ojc56ga", b8 = "_1ojc56gb", x8 = "_1ojc56gc", w8 = "_1ojc56gd", _8 = "_1ojc56ge", S8 = "_1ojc56gf", E8 = "_1ojc56gg", N8 = "_1ojc56gh", C8 = "_51y2ql0", R8 = "_51y2ql1", T8 = "_51y2ql2", M8 = "_51y2ql3", D8 = "_51y2ql4", Bh = "_51y2ql5", A8 = "_51y2ql6", j8 = "_51y2ql7 _51y2ql6", O8 = "_51y2ql8 _51y2ql6", z8 = "_51y2ql9", L8 = "_51y2qla", k8 = "_51y2qlb", H8 = "_51y2qlc", B8 = "_51y2qld", U8 = "_51y2qle";
const bn = 60, la = 62, xn = 46, V8 = 180, Xo = 75, dc = 45, $8 = [0, 0.25, 0.5, 0.75, 1];
function q8(e) {
  const a = Math.PI * (1 - e), i = Math.cos(a), l = Math.sin(a);
  return {
    x1: bn + i * (xn - 9),
    y1: la - l * (xn - 9),
    x2: bn + i * (xn - 14),
    y2: la - l * (xn - 14)
  };
}
function I8(e) {
  const a = Xo - dc, i = (Xo - e) / a;
  return Math.min(1, Math.max(0.02, i));
}
function Y8(e) {
  return e >= 0.55 ? A8 : e >= 0.25 ? j8 : O8;
}
function G8({ secondsPerStep: e }) {
  const a = e !== null && e > 0, i = a ? I8(e) : 0, l = V8 * i, s = a ? e.toFixed(1) : "—", u = a ? 1 / e : null, c = u === null ? "—" : u >= 1 ? u.toFixed(2) : u.toFixed(3);
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: C8,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": dc,
      "aria-valuemax": Xo,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ v.jsx("span", { className: R8, children: "Speed" }),
        /* @__PURE__ */ v.jsxs("svg", { className: T8, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ v.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ v.jsx(
            "path",
            {
              className: M8,
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          $8.map((d) => {
            const p = q8(d);
            return /* @__PURE__ */ v.jsx(
              "line",
              {
                className: D8,
                strokeWidth: 1.4,
                x1: p.x1,
                y1: p.y1,
                x2: p.x2,
                y2: p.y2
              },
              d
            );
          }),
          /* @__PURE__ */ v.jsx("text", { className: Bh, x: bn - xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: Xo }),
          /* @__PURE__ */ v.jsx("text", { className: Bh, x: bn, y: 9, fontSize: 6, textAnchor: "middle", children: (Xo + dc) / 2 }),
          /* @__PURE__ */ v.jsx("text", { className: Bh, x: bn + xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: dc }),
          a && /* @__PURE__ */ v.jsx(
            "path",
            {
              className: Y8(i),
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, i * 100)} 100`
            }
          ),
          /* @__PURE__ */ v.jsx(
            "g",
            {
              className: z8,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${bn}px ${la}px`
              },
              children: /* @__PURE__ */ v.jsx(
                "line",
                {
                  className: L8,
                  strokeWidth: 2.4,
                  x1: bn,
                  y1: la,
                  x2: bn - xn + 16,
                  y2: la
                }
              )
            }
          ),
          /* @__PURE__ */ v.jsx("circle", { className: k8, cx: bn, cy: la, r: 3.6 }),
          /* @__PURE__ */ v.jsx("text", { className: H8, x: bn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ v.jsx("text", { className: B8, x: bn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] }),
        /* @__PURE__ */ v.jsxs("span", { className: U8, children: [
          c,
          " it/s"
        ] })
      ]
    }
  );
}
function F8({ state: e, onCancel: a, onReset: i }) {
  const [l, s] = S.useState(!1);
  S.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = S.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ v.jsx(
      Cc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = u8(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ v.jsxs("div", { className: Ju, children: [
      /* @__PURE__ */ v.jsxs("div", { className: S8, role: "alert", children: [
        /* @__PURE__ */ v.jsx("span", { className: E8, children: m.title }),
        /* @__PURE__ */ v.jsx("span", { className: N8, children: m.hint })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: i, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ v.jsxs("div", { className: Ju, children: [
      /* @__PURE__ */ v.jsx(Cc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: i, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ v.jsxs("output", { className: Ju, children: [
      /* @__PURE__ */ v.jsx(
        s8,
        {
          src: c5(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ v.jsx(W8, { state: e }),
      /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "secondary", onClick: i, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ v.jsxs("div", { className: Ju, children: [
    /* @__PURE__ */ v.jsx("output", { className: c8, "aria-live": "polite", children: Z8(e) }),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        className: g8,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ v.jsx(
          "div",
          {
            className: v8,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ v.jsx("output", { className: _8, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ v.jsxs("div", { className: f8, "aria-live": "polite", children: [
      /* @__PURE__ */ v.jsx(G8, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ v.jsxs("div", { className: d8, children: [
        /* @__PURE__ */ v.jsx(Uo, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ v.jsx(
          Uo,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ v.jsx(
          Uo,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ v.jsx(Uo, { label: "ETA", value: X8(x3(e)) }),
        /* @__PURE__ */ v.jsx(
          Uo,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: ec, children: /* @__PURE__ */ v.jsx(ua, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function X8(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), i = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return i > 0 ? `${i}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const P8 = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading diffusion experts…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function Z8(e) {
  if (!e.stage) return "Starting worker…";
  if (e.stage === "loading_experts" && e.stageDetail) return e.stageDetail;
  const a = P8[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function Q8(e) {
  const a = e.base_model_high, i = e.base_model_low;
  if (typeof a != "string") return null;
  const l = e.base_model_override === !0, s = l ? "custom" : "bundled", u = Mx(a);
  if (typeof i == "string" && i !== a)
    return `${u} + ${Mx(i)} (${s})`;
  const c = e.svi_lora_tier, d = l && typeof c == "string" ? `, SVI ${c}` : "";
  return `${u} (${s}${d})`;
}
function K8(e) {
  const a = e.torch_compile;
  if (!a || typeof a != "object") return null;
  const i = a;
  if (i.requested !== !0) return null;
  if (i.blocked_by_block_swap === !0) return "skipped — block-swap on";
  if (typeof i.error == "string") return "failed → eager";
  if (i.engaged !== !0) return "not engaged";
  const l = typeof i.mode == "string" ? i.mode : "default", s = i.dynamo ?? {}, u = typeof s.unique_graphs == "number" ? s.unique_graphs : null, c = typeof s.calls_captured == "number" ? s.calls_captured : null, d = typeof s.graph_breaks == "number" ? s.graph_breaks : null;
  if (u !== null && c !== null) {
    const p = d ? `, ${d} breaks` : "";
    return `${l} — ${u} graphs / ${c} calls${p}`;
  }
  return `${l} — engaged`;
}
function Mx(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function Uo({ label: e, value: a }) {
  return /* @__PURE__ */ v.jsxs("div", { className: h8, children: [
    /* @__PURE__ */ v.jsx("span", { className: m8, children: e }),
    /* @__PURE__ */ v.jsx("span", { className: p8, children: a })
  ] });
}
function W8({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const i = [], l = Q8(a);
  l && i.push(["Base model", l]);
  const s = K8(a);
  return s && i.push(["torch.compile", s]), typeof a.frames == "number" && i.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && i.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && i.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && i.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && i.push(["Output", e.outputPath]), i.length === 0 ? null : /* @__PURE__ */ v.jsx("div", { className: y8, children: i.map(([u, c]) => /* @__PURE__ */ v.jsxs("div", { className: b8, children: [
    /* @__PURE__ */ v.jsx("span", { className: x8, children: u }),
    /* @__PURE__ */ v.jsx("span", { className: w8, children: c })
  ] }, u)) });
}
const vm = 16, zi = 128, Rc = 1920, J8 = 832 * 480, ek = { width: 848, height: 480 }, $_ = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "3:2", label: "3:2", w: 3, h: 2 },
  { id: "4:3", label: "4:3", w: 4, h: 3 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "3:4", label: "3:4", w: 3, h: 4 },
  { id: "9:16", label: "9:16", w: 9, h: 16 }
];
function q_(e, a, i) {
  return Math.min(i, Math.max(a, e));
}
function ss(e) {
  if (!Number.isFinite(e)) return zi;
  const a = Math.round(e / vm) * vm;
  return q_(a, zi, Rc);
}
function Dx(e, a) {
  const i = ss(e);
  return q_(i + a * vm, zi, Rc);
}
function Tc(e, a) {
  return { width: ss(e), height: ss(a) };
}
function tk(e) {
  return { width: e.height, height: e.width };
}
function I_(e) {
  return e.width * e.height;
}
function Y_(e) {
  return e.height === 0 ? 0 : e.width / e.height;
}
function nk(e, a, i) {
  if (e <= 0 || a <= 0 || i <= 0)
    return Tc(zi, zi);
  const l = e / a, s = Math.sqrt(i * l), u = i / s;
  return Tc(s, u);
}
function G_(e) {
  const a = Y_(e);
  if (a <= 0) return null;
  let i = null;
  for (const l of $_) {
    const s = Math.abs(a - l.w / l.h);
    s < 0.06 && (i === null || s < i.delta) && (i = { id: l.id, delta: s });
  }
  return i?.id ?? null;
}
function ak(e) {
  return e.width === e.height ? "square" : e.width > e.height ? "landscape" : "portrait";
}
function F_(e, a) {
  return a === 0 ? e : F_(a, e % a);
}
function rk(e) {
  const a = G_(e);
  if (a) return a;
  const i = F_(e.width, e.height) || 1, l = e.width / i, s = e.height / i;
  return l <= 64 && s <= 64 ? `${l}:${s}` : `${Y_(e).toFixed(2)}:1`;
}
function ik(e) {
  const a = I_(e);
  return {
    megapixels: (a / 1e6).toFixed(2),
    aspect: rk(e),
    orientation: ak(e),
    budgetPct: Math.round(a / J8 * 100)
  };
}
function lk() {
  return /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "swap" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M6.5 3.5L3.5 6.5l3 3M3.5 6.5h9M13.5 16.5l3-3-3-3M16.5 13.5h-9",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function Ax({
  id: e,
  label: a,
  value: i,
  draft: l,
  onDraft: s,
  onCommit: u,
  onStep: c
}) {
  return /* @__PURE__ */ v.jsxs("div", { className: qz, children: [
    /* @__PURE__ */ v.jsx("label", { className: U_, htmlFor: e, children: a }),
    /* @__PURE__ */ v.jsxs("div", { className: Iz, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Ex,
          "aria-label": `Decrease ${a} by 16`,
          disabled: i <= zi,
          onClick: () => c(-1),
          children: "−"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          id: e,
          type: "number",
          inputMode: "numeric",
          className: Yz,
          "aria-label": a,
          min: zi,
          max: Rc,
          step: 16,
          value: l,
          onChange: (d) => s(d.target.value),
          onBlur: (d) => u(Number(d.target.value)),
          onKeyDown: (d) => {
            d.key === "Enter" && u(Number(d.target.value));
          }
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Ex,
          "aria-label": `Increase ${a} by 16`,
          disabled: i >= Rc,
          onClick: () => c(1),
          children: "+"
        }
      )
    ] })
  ] });
}
function ok({
  width: e,
  height: a,
  onChange: i
}) {
  const [l, s] = S.useState(() => String(e)), [u, c] = S.useState(() => String(a));
  S.useEffect(() => {
    s(String(e));
  }, [e]), S.useEffect(() => {
    c(String(a));
  }, [a]);
  const d = { width: e, height: a }, p = ik(d), m = G_(d), y = (C) => {
    const N = ss(C);
    s(String(N)), N !== e && i({ width: N, height: a });
  }, g = (C) => {
    const N = ss(C);
    c(String(N)), N !== a && i({ width: e, height: N });
  }, b = (C) => {
    i({ width: Dx(e, C), height: a });
  }, x = (C) => {
    i({ width: e, height: Dx(a, C) });
  }, w = () => i(tk(d)), R = (C, N) => {
    i(nk(C, N, I_(d)));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: Vz, children: [
    /* @__PURE__ */ v.jsxs("div", { className: $z, children: [
      /* @__PURE__ */ v.jsx(
        Ax,
        {
          id: "svi2-custom-width",
          label: "Width",
          value: e,
          draft: l,
          onDraft: s,
          onCommit: y,
          onStep: b
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: Gz, "aria-hidden": "true", children: "×" }),
      /* @__PURE__ */ v.jsx(
        Ax,
        {
          id: "svi2-custom-height",
          label: "Height",
          value: a,
          draft: u,
          onDraft: c,
          onCommit: g,
          onStep: x
        }
      ),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: Fz,
          onClick: w,
          title: "Reverse the aspect ratio — swap width and height at the same pixel count",
          children: [
            /* @__PURE__ */ v.jsx("span", { className: Xz, children: /* @__PURE__ */ v.jsx(lk, {}) }),
            "Swap"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Pz, children: [
      /* @__PURE__ */ v.jsx("span", { className: U_, children: "Aspect ratio · same pixel budget" }),
      /* @__PURE__ */ v.jsx(
        "div",
        {
          className: Zz,
          role: "group",
          "aria-label": "Aspect ratio presets",
          children: $_.map((C) => {
            const N = m === C.id, D = [Qz, N ? Kz : ""].filter(Boolean).join(" ");
            return /* @__PURE__ */ v.jsx(
              "button",
              {
                type: "button",
                className: D,
                "aria-pressed": N,
                onClick: () => R(C.w, C.h),
                children: C.label
              },
              C.id
            );
          })
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("output", { className: Wz, "aria-live": "polite", children: [
      Tc(e, a).width,
      "×",
      Tc(e, a).height,
      /* @__PURE__ */ v.jsx("span", { className: zh, children: "·" }),
      p.megapixels,
      " MP",
      /* @__PURE__ */ v.jsx("span", { className: zh, children: "·" }),
      p.aspect,
      " ",
      p.orientation,
      /* @__PURE__ */ v.jsx("span", { className: zh, children: "·" }),
      p.budgetPct,
      "% of 480p budget"
    ] })
  ] });
}
function jx() {
  return /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "selected" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M6.5 10.2l2.3 2.3 4.7-4.8",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function sk({ presets: e }) {
  const { params: a, updateParam: i } = Qt(), l = S.useMemo(() => hp(e), [e]), [s, u] = S.useState(!1);
  if (l.length === 0) return null;
  const c = mp(a, l), d = c === os || s, p = a.width ?? 832, m = a.height ?? 480, y = (g) => {
    i("width", g.width), i("height", g.height);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ v.jsxs("div", { className: zz, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: [
      l.map((g) => {
        const b = !d && c === g.id, x = [vx, b ? yx : ""].filter(Boolean).join(" "), w = [wx, b ? _x : ""].filter(Boolean).join(" ");
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": b,
            className: x,
            onClick: () => {
              u(!1), i("width", g.width), i("height", g.height);
            },
            children: [
              /* @__PURE__ */ v.jsxs("span", { className: bx, children: [
                /* @__PURE__ */ v.jsxs("span", { className: xx, children: [
                  g.width,
                  "×",
                  g.height
                ] }),
                /* @__PURE__ */ v.jsx("span", { className: w, children: /* @__PURE__ */ v.jsx(jx, {}) })
              ] }),
              /* @__PURE__ */ v.jsx("span", { className: Sx, children: g.label }),
              /* @__PURE__ */ v.jsx("span", { className: Lz, children: g.sub }),
              g.stepsDown > 0 && /* @__PURE__ */ v.jsx(
                "span",
                {
                  className: g.stepsDown >= 2 ? Hz : kz,
                  children: g.stepsDown >= 2 ? "off-distribution" : "below native"
                }
              )
            ]
          },
          g.id
        );
      }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": d,
          className: [vx, Bz, d ? yx : ""].filter(Boolean).join(" "),
          onClick: () => {
            u(!0), c !== os && y(ek);
          },
          children: [
            /* @__PURE__ */ v.jsxs("span", { className: bx, children: [
              /* @__PURE__ */ v.jsx("span", { className: xx, children: "Custom" }),
              /* @__PURE__ */ v.jsx(
                "span",
                {
                  className: [wx, d ? _x : ""].join(" "),
                  children: /* @__PURE__ */ v.jsx(jx, {})
                }
              )
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: Sx, children: "Any aspect & budget" }),
            /* @__PURE__ */ v.jsx("span", { className: Uz, children: "9:16 portrait, square, or a custom Wan2.2 canvas" })
          ]
        }
      )
    ] }),
    d && /* @__PURE__ */ v.jsx(ok, { width: p, height: m, onChange: y })
  ] });
}
var uk = "_1x63kpu0";
const ck = "Random each render";
function fk(e) {
  const a = e.trim();
  if (a.length === 0) return;
  const i = Number(a);
  if (!(!Number.isFinite(i) || i < 0))
    return Math.trunc(i);
}
function dk() {
  const { params: e, updateParam: a } = Qt(), i = S.useId(), l = e.seed, s = (u) => {
    a("seed", fk(u.target.value));
  };
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("span", { className: wn, id: i, children: "Seed" }),
    /* @__PURE__ */ v.jsxs("div", { className: Qc, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          className: uk,
          "aria-labelledby": i,
          min: 0,
          step: 1,
          placeholder: ck,
          value: l ?? "",
          onChange: s
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize." })
    ] })
  ] });
}
function hk({
  spec: e,
  value: a,
  error: i,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = S.useId(), d = `${c}-help`, p = i ? `${c}-error` : d;
  return /* @__PURE__ */ v.jsxs("div", { className: nz, title: s ? u : void 0, children: [
    /* @__PURE__ */ v.jsxs("div", { className: az, children: [
      /* @__PURE__ */ v.jsx("label", { className: rz, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ v.jsx("span", { className: iz, children: pk(a, e.step) })
    ] }),
    mk(e, a, l, c, p, i !== void 0, s),
    /* @__PURE__ */ v.jsx("span", { id: d, className: j_, children: s && u ? u : e.help }),
    i && /* @__PURE__ */ v.jsx("span", { id: `${c}-error`, role: "alert", className: lz, children: i })
  ] });
}
function mk(e, a, i, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: Hl,
            onClick: () => i(!d),
            children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ v.jsx("span", { className: j_, children: d ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ v.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [sz, u ? gx : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => i(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ v.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = Ox(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ v.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: O_,
          style: g,
          min: e.min,
          max: e.max,
          step: e.step,
          value: d,
          onChange: (b) => i(Number(b.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ v.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [oz, u ? gx : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: Ox(a, e),
          onChange: (d) => i(Number(d.target.value))
        }
      );
  }
}
function Ox(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function pk(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var gk = "_1f0q5gf0", vk = "_1f0q5gf1", yk = "_1f0q5gf2", bk = "_1f0q5gf3", xk = "_1f0q5gf4", wk = "_1f0q5gf5", _k = "_1f0q5gf6", Sk = "_1f0q5gf7", Ek = "_1f0q5gf8", Nk = "_1f0q5gf9", Ck = "_1f0q5gfa", Rk = "_1f0q5gfb", Tk = "_1f0q5gfc";
function Mk({
  title: e,
  description: a,
  badge: i,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = S.useId(), [m, y] = S.useState(u ? s : !1), g = [gk, c].filter(Boolean).join(" "), b = [yk, m ? bk : ""].filter(Boolean).join(" "), x = !u || !m;
  return /* @__PURE__ */ v.jsxs("section", { className: g, children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        className: vk,
        "aria-expanded": x,
        "aria-controls": p,
        disabled: !u,
        onClick: () => u && y((w) => !w),
        children: [
          u && /* @__PURE__ */ v.jsx("span", { className: b, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ v.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ v.jsx(
              "path",
              {
                d: "M4 6l4 4 4-4",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          ] }) }),
          /* @__PURE__ */ v.jsxs("span", { className: xk, children: [
            /* @__PURE__ */ v.jsx("span", { className: wk, children: e }),
            a && /* @__PURE__ */ v.jsx("span", { className: _k, children: a })
          ] }),
          (l || i) && /* @__PURE__ */ v.jsxs("span", { className: Sk, children: [
            l && /* @__PURE__ */ v.jsx("span", { className: Ek, children: l }),
            i
          ] })
        ]
      }
    ),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        id: p,
        className: [Nk, x ? Ck : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ v.jsx("div", { className: Rk, children: /* @__PURE__ */ v.jsx("div", { className: Tk, children: d }) })
      }
    )
  ] });
}
const Dk = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function zx(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function Ak(e) {
  return Pc.find((a) => a.key === e)?.default;
}
function gl(e, a) {
  const i = e[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  const l = Ak(a);
  return typeof l == "number" ? l : 0;
}
function jk(e, a) {
  if (e === "core") {
    const i = gl(a, "fps"), l = gl(a, "interpolate_fps"), s = l > 0 ? l : i, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = Dk[u] ?? u, d = gl(a, "upscale_factor"), p = `${i} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const i = gl(a, "num_inference_steps"), l = gl(a, "cfg_scale"), s = gl(a, "sigma_shift");
    return `${i} steps · CFG ${zx(l)} · shift ${zx(s)}`;
  }
  return null;
}
async function Ok() {
  return xr("/capabilities/attention");
}
const Lx = Object.fromEntries(
  zm.map((e) => [e.value, e.label])
);
function zk() {
  const { params: e, settings: a, updateParam: i, setSettings: l } = Qt(), { saving: s, persist: u } = z_(), c = ls("svi2/attention-capabilities", Ok, {
    shouldRetryOnError: !1
  }), d = e.attention ?? a.attentionBackend ?? "flash2", p = S.useCallback(
    (w) => {
      i("attention", w);
      const R = { ...a, attentionBackend: w };
      l(R), u(R);
    },
    [a, i, l, u]
  ), m = c.data, y = m === void 0, g = c.error !== void 0, b = m?.backends.find((w) => w.id === d), x = b !== void 0 && !b.supported;
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-attention", children: "Attention mechanism" }),
    /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: "svi2-attention",
          className: Ri,
          value: d,
          disabled: s,
          "aria-busy": s || void 0,
          onChange: (w) => p(w.target.value),
          children: [
            /* @__PURE__ */ v.jsx("option", { value: "auto", children: Lx.auto }),
            m ? m.backends.map((w) => /* @__PURE__ */ v.jsx(
              "option",
              {
                value: w.id,
                disabled: !w.supported,
                title: w.reason ?? void 0,
                children: Lx[w.id] ?? w.id
              },
              w.id
            )) : zm.filter((w) => w.value !== "auto").map((w) => /* @__PURE__ */ v.jsx("option", { value: w.value, children: w.label }, w.value))
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            d: "M4 6l4 4 4-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }) })
    ] }),
    g && /* @__PURE__ */ v.jsx("span", { className: cn, children: "GPU capabilities unavailable — all options shown." }),
    x && /* @__PURE__ */ v.jsxs("span", { className: cn, children: [
      b.reason ?? "This backend is not supported on the current GPU",
      " — will fall back to flash2 at render time."
    ] }),
    !y && d === "sage3_fp4" && !x && /* @__PURE__ */ v.jsx("span", { className: cn, children: "FP4 — may show artifacts on some GPUs." })
  ] });
}
function Lk() {
  const { params: e, updateParam: a } = Qt(), i = (e.blocks_to_swap ?? 0) > 0, l = !i && (e.use_torch_compile ?? !1), s = e.torch_compile_mode ?? "default";
  return /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
    /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-torch-compile", children: "torch.compile (experimental)" }),
    /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          id: "svi2-torch-compile",
          role: "switch",
          "aria-checked": l,
          disabled: i,
          className: Hl,
          onClick: () => a("use_torch_compile", !l),
          children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: l ? "On" : "Off" })
    ] }),
    l && /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
      /* @__PURE__ */ v.jsx(
        "select",
        {
          "aria-label": "torch.compile mode",
          className: Ri,
          value: s,
          onChange: (u) => a("torch_compile_mode", u.target.value),
          children: LC.map((u) => /* @__PURE__ */ v.jsx("option", { value: u.value, children: u.label }, u.value))
        }
      ),
      /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ v.jsx("title", { children: "open" }),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            d: "M4 6l4 4 4-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ v.jsx("span", { className: cn, children: i ? "Set Blocks to swap = 0 to enable — compile needs both experts VRAM-resident (no offload)." : "Compiles the DiT for faster steps; CUDA graphs via reduce-overhead. Falls back to eager if the backend is unavailable. Render report shows whether it engaged." })
  ] });
}
const pp = "off", kk = [
  { value: "off", label: "Off (native resolution)" },
  { value: "auto", label: "Auto (best available)" },
  { value: "maxine", label: "Maxine VSR — RTX (Windows only)" },
  { value: "drct-l-hq", label: "DRCT-L HQ (best, slow)" },
  { value: "drct-l-real", label: "DRCT-L Real (degraded sources)" },
  { value: "hat-l", label: "HAT-L (transformer)" },
  { value: "swinir-l", label: "SwinIR-L (real-world)" },
  { value: "realesrgan", label: "Real-ESRGAN (fast)" }
], Hk = [
  { value: 2, label: "2×" },
  { value: 3, label: "3×" },
  { value: 4, label: "4×" }
], Bk = [
  { value: "LOW", label: "Low (fastest)" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "ULTRA", label: "Ultra (best)" },
  { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
  { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" }
], Uk = 2;
function Vk(e) {
  return e === "maxine" || e === "auto";
}
function $k(e, a) {
  return !e || e <= 0 ? pp : a ?? "auto";
}
function qk(e, a) {
  return e === pp ? { upscale_factor: 0 } : { upscale_factor: a && a > 0 ? a : Uk, upscale_model: e };
}
function Uh() {
  return /* @__PURE__ */ v.jsx("span", { className: xs, "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("title", { children: "open" }),
    /* @__PURE__ */ v.jsx(
      "path",
      {
        d: "M4 6l4 4 4-4",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) });
}
function Ik() {
  const { params: e, updateParam: a } = Qt(), i = $k(e.upscale_factor, e.upscale_model), l = i === pp, s = Vk(i), u = S.useCallback(
    (c) => {
      const d = qk(c, e.upscale_factor);
      a("upscale_factor", d.upscale_factor), d.upscale_model !== void 0 && a("upscale_model", d.upscale_model);
    },
    [e.upscale_factor, a]
  );
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-engine", children: "Upscaler" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-engine",
            className: Ri,
            value: i,
            onChange: (c) => u(c.target.value),
            children: kk.map((c) => /* @__PURE__ */ v.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Uh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Super-resolution after stitch, before interpolation. Auto = Maxine (RTX/Windows) → DRCT-L → Real-ESRGAN. DRCT-L is the highest-quality transformer (runs on aarch64/GB10)." })
    ] }),
    !l && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-scale", children: "Scale" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-scale",
            className: Ri,
            value: String(e.upscale_factor ?? 2),
            onChange: (c) => a("upscale_factor", Number(c.target.value)),
            children: Hk.map((c) => /* @__PURE__ */ v.jsx("option", { value: String(c.value), children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Uh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Output multiplier applied to the rendered resolution." })
    ] }),
    !l && s && /* @__PURE__ */ v.jsxs("div", { className: zn, children: [
      /* @__PURE__ */ v.jsx("label", { className: wn, htmlFor: "svi2-upscale-quality", children: "Maxine quality" }),
      /* @__PURE__ */ v.jsxs("div", { className: Ci, children: [
        /* @__PURE__ */ v.jsx(
          "select",
          {
            id: "svi2-upscale-quality",
            className: Ri,
            value: String(e.upscale_quality ?? "HIGH"),
            onChange: (c) => a("upscale_quality", c.target.value),
            children: Bk.map((c) => /* @__PURE__ */ v.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ v.jsx(Uh, {})
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: cn, children: "Maxine VSR preset (Maxine/Auto on Windows only; ignored by DRCT-L/Real-ESRGAN)." })
    ] })
  ] });
}
var Yk = "kn07ek0", Gk = "kn07ek1";
const Fk = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function Xk({ issues: e }) {
  const { presetId: a, params: i, updateParam: l } = Qt(), s = Zc(a, i), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ v.jsx("div", { className: Yk, children: m_.map((c) => {
    const d = Z3(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ v.jsx(
      Mk,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: jk(c.id, i),
        badge: c.defaultCollapsed ? /* @__PURE__ */ v.jsx(Fn, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ v.jsxs("div", { className: Gk, children: [
          c.id === "perf" && /* @__PURE__ */ v.jsx(zk, {}),
          c.id === "perf" && /* @__PURE__ */ v.jsx(Lk, {}),
          d.map((p) => {
            const m = s ? Fk[p.key] : void 0;
            return /* @__PURE__ */ v.jsx(
              hk,
              {
                spec: p,
                value: i[p.key],
                error: u(p.key),
                disabled: m !== void 0,
                disabledReason: m,
                onChange: (y) => l(p.key, y)
              },
              p.key
            );
          }),
          c.id === "core" && /* @__PURE__ */ v.jsx(Ik, {})
        ] })
      },
      c.id
    );
  }) });
}
var Pk = "_1w9jfpf0", Zk = "_1w9jfpf1", Qk = "_1w9jfpf2", Kk = "_1w9jfpf3", Wk = "_1w9jfpf4", Jk = "_1w9jfpf5";
const ym = "svi2-anchor-panel", X_ = "svi2-prompt-input";
function eH() {
  const {
    presetId: e,
    presetApplied: a,
    params: i,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d,
    restoreJobIntoForm: p,
    getIsDirty: m
  } = Qt(), { issues: y, blocked: g, busy: b, submit: x, cancel: w, focusRequest: R } = S_(), [C, N] = S.useState(null);
  nH(R);
  const D = ls("svi2/presets", N1), E = ls("svi2/history", () => y5(25)), O = D.data?.presets ?? [];
  S.useEffect(() => {
    if (a || O.length === 0) return;
    const k = O.find((G) => G.id === e) ?? O[0];
    k && s(k, { markDirty: !1 });
  }, [a, O, e, s]);
  const H = E.data?.jobs ?? [], B = i.mode ?? "image_to_video", U = B !== "text_to_video", A = op(e, i), I = y.find((k) => k.field === "ref_image_path")?.message, Q = y.find((k) => k.field === "last_image_path")?.message, $ = y.find((k) => k.field === "prompts")?.message, K = y.find(
    (k) => k.field === "width" && k.severity === "warning"
  )?.message, ne = S.useCallback(
    (k) => {
      if (k.status !== "succeeded") {
        d(k);
        return;
      }
      if (m()) {
        N(k.id);
        return;
      }
      p(k);
    },
    [d, p, m]
  ), L = S.useCallback(() => {
    const k = H.find((G) => G.id === C);
    N(null), k && p(k);
  }, [C, H, p]), Y = S.useCallback(() => N(null), []), [T, z] = S.useState(() => /* @__PURE__ */ new Set()), F = S.useRef(/* @__PURE__ */ new Map()), X = E.mutate;
  S.useEffect(() => {
    const k = F.current;
    return () => {
      k.forEach((G) => clearTimeout(G)), k.clear();
    };
  }, []);
  const ae = S.useCallback(
    (k) => {
      const G = k.id, ee = k.status === "running" || k.status === "queued";
      z((J) => new Set(J).add(G));
      const se = F.current.get(G);
      se && clearTimeout(se);
      const de = (J) => z((ve) => {
        const De = new Set(ve);
        return De.delete(J), De;
      }), he = setTimeout(() => {
        F.current.delete(G), (async () => {
          try {
            ee && await w_(G).catch(() => {
            }), await b5(G), await X(), de(G);
          } catch {
            de(G), ca.error("Couldn't delete that render.");
          }
        })();
      }, 5e3);
      F.current.set(G, he), ca.success("Render removed", {
        action: {
          label: "Undo",
          onClick: () => {
            const J = F.current.get(G);
            J && clearTimeout(J), F.current.delete(G), de(G);
          }
        }
      });
    },
    [X]
  ), j = T.size === 0 ? H : H.filter((k) => !T.has(k.id));
  return /* @__PURE__ */ v.jsxs("div", { className: Pk, children: [
    /* @__PURE__ */ v.jsx(
      VO,
      {
        open: C !== null,
        title: "Load this run into the form?",
        message: "Unsaved changes will be replaced.",
        confirmLabel: "Load run",
        cancelLabel: "Keep editing",
        onConfirm: L,
        onCancel: Y
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Zk, children: [
      /* @__PURE__ */ v.jsx(
        Va,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ v.jsx(A6, { presets: O, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ v.jsxs(
        Va,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: [
            /* @__PURE__ */ v.jsx(UL, { value: B, onChange: u }),
            B === "text_to_video" && /* @__PURE__ */ v.jsx(dk, {})
          ]
        }
      ),
      /* @__PURE__ */ v.jsx("div", { id: ym, children: /* @__PURE__ */ v.jsx(
        Va,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ v.jsx(
            tz,
            {
              refImageRequired: U,
              lastImageRequired: A,
              refError: I,
              lastError: Q
            }
          )
        }
      ) }),
      /* @__PURE__ */ v.jsx(Va, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ v.jsx(q6, { error: $, textareaId: X_ }) }),
      /* @__PURE__ */ v.jsx(Va, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ v.jsx(K6, {}) }),
      /* @__PURE__ */ v.jsxs(
        Va,
        {
          title: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            /* @__PURE__ */ v.jsx("span", { className: Wk, children: "Inference · Parameters" }),
            "Parameters"
          ] }),
          description: "Grouped by tier. Advanced tiers stay collapsed.",
          actions: /* @__PURE__ */ v.jsx(
            ua,
            {
              variant: "secondary",
              size: "sm",
              title: "Re-apply the active preset's defaults",
              onClick: () => {
                const k = O.find((G) => G.id === e);
                k && s(k);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ v.jsx(OL, { presets: O, warningText: K }),
            /* @__PURE__ */ v.jsxs("div", { className: Jk, children: [
              /* @__PURE__ */ v.jsx(r6, {}),
              /* @__PURE__ */ v.jsx(sk, { presets: O }),
              /* @__PURE__ */ v.jsx(nL, {}),
              /* @__PURE__ */ v.jsx(mL, {})
            ] }),
            /* @__PURE__ */ v.jsx(Xk, { issues: y }),
            /* @__PURE__ */ v.jsx(m6, { presets: O })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Qk, children: [
      /* @__PURE__ */ v.jsxs(
        Va,
        {
          title: "Render",
          description: b ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ v.jsx(F8, { state: l, onCancel: w, onReset: c }),
            !b && /* @__PURE__ */ v.jsx("div", { className: Kk, children: /* @__PURE__ */ v.jsx(
              ua,
              {
                variant: "primary",
                disabled: g,
                title: g ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void x(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ v.jsx(Va, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ v.jsx(e6, { jobs: j, onOpen: ne, onDelete: ae }) })
    ] })
  ] });
}
const tH = {
  ref_image_path: ym,
  last_image_path: ym,
  prompts: X_
};
function nH(e) {
  S.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = tH[e.field];
    if (a) {
      const l = document.getElementById(a);
      kx(l);
      return;
    }
    aH(e.field);
    const i = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      kx(l);
    });
    return () => window.cancelAnimationFrame(i);
  }, [e]);
}
function aH(e) {
  const a = Pc.find((s) => s.key === e);
  if (!a) return;
  const i = m_.find((s) => s.id === a.tier);
  if (!i) return;
  const l = document.querySelectorAll(
    'button[aria-expanded="false"][aria-controls]'
  );
  for (const s of l)
    if (s.textContent?.includes(i.title)) {
      s.click();
      return;
    }
}
function kx(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var rH = "_1smvon90", hr = "_1smvon91", mr = "_1smvon92", wa = "_1smvon93", tc = "_1smvon94", Vh = "_1smvon95 _1smvon94", iH = "_1smvon96", lH = "_1smvon97";
const oH = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function sH() {
  const { settings: e, setSettings: a } = Qt(), [i, l] = S.useState(e), [s, u] = S.useState(!1), c = S.useMemo(
    () => Object.keys(i).some(
      (m) => i[m] !== e[m]
    ),
    [i, e]
  ), d = (m, y) => {
    l((g) => ({ ...g, [m]: y }));
  }, p = async () => {
    u(!0);
    try {
      const m = await C1(i);
      a(m), l(m), ca.success("Settings saved. Applied to new renders.");
    } catch {
      ca.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ v.jsxs(
    Va,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ v.jsxs("div", { className: rH, children: [
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Models directory" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                value: i.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => d("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Output directory" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                value: i.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => d("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: Vh,
                value: i.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: zm.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: Vh,
                value: i.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: OC.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Blocks to swap" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                type: "number",
                min: 0,
                max: 40,
                value: i.blocksToSwap,
                onChange: (m) => d("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Interpolation method" }),
            /* @__PURE__ */ v.jsx(
              "select",
              {
                className: Vh,
                value: i.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: oH.map((m) => /* @__PURE__ */ v.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ v.jsxs("label", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, children: "Interpolate target fps" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                className: tc,
                type: "number",
                min: 0,
                max: 120,
                value: i.interpolateFps,
                onChange: (m) => d("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] }),
          /* @__PURE__ */ v.jsxs("div", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, id: "svi2-fast-parallel-label", children: "Fast parallel (CPU & encode threads)" }),
            /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": i.fastParallel,
                  "aria-labelledby": "svi2-fast-parallel-label",
                  className: Hl,
                  onClick: () => d("fastParallel", !i.fastParallel),
                  children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ v.jsx("span", { className: wa, children: i.fastParallel ? "On" : "Off" })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Uses ~half the CPU cores for prompt-encode and ffmpeg. Visually identical; only mp4 sha differs." })
          ] }),
          /* @__PURE__ */ v.jsxs("div", { className: hr, children: [
            /* @__PURE__ */ v.jsx("span", { className: mr, id: "svi2-batch-prompt-encode-label", children: "Batch prompt encoding (experimental — alters exact output)" }),
            /* @__PURE__ */ v.jsxs("div", { className: kl, children: [
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": i.batchPromptEncode,
                  "aria-labelledby": "svi2-batch-prompt-encode-label",
                  className: Hl,
                  onClick: () => d("batchPromptEncode", !i.batchPromptEncode),
                  children: /* @__PURE__ */ v.jsx("span", { className: Bl, "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ v.jsx("span", { className: wa, children: i.batchPromptEncode ? "On" : "Off" })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: wa, children: "Encodes all prompts in one forward pass. Faster, but changes text conditioning at the bit level — off by default." })
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: iH, children: [
          /* @__PURE__ */ v.jsx(ua, { loading: s, disabled: !c, onClick: () => void p(), children: "Save settings" }),
          /* @__PURE__ */ v.jsx(
            ua,
            {
              variant: "secondary",
              onClick: () => l(e),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ v.jsx("output", { className: lH, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var uH = "_1ugwva20", cH = "_1ugwva21", fH = "_1ugwva22", dH = "_1ugwva23", hH = "_1ugwva24", mH = "_1ugwva25";
function pH() {
  const e = VN(), { deploymentId: a } = DN(), i = gH(e.catalog?.presets ?? []);
  return /* @__PURE__ */ v.jsxs(
    C5,
    {
      initialSettings: e.settings,
      initialPreset: i,
      deploymentId: a,
      children: [
        /* @__PURE__ */ v.jsxs("div", { className: uH, children: [
          /* @__PURE__ */ v.jsx("header", { className: cH, children: /* @__PURE__ */ v.jsxs("div", { className: fH, children: [
            /* @__PURE__ */ v.jsx("h1", { className: dH, children: "SVI 2.0 Pro" }),
            /* @__PURE__ */ v.jsx("p", { className: hH, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
          ] }) }),
          /* @__PURE__ */ v.jsx("main", { className: mH, children: /* @__PURE__ */ v.jsx(JN, {}) })
        ] }),
        /* @__PURE__ */ v.jsx(P3, { position: "bottom-right", theme: "dark", richColors: !0 })
      ]
    }
  );
}
function gH(e) {
  return e.find((a) => a.id === is) ?? e[0] ?? null;
}
async function vH() {
  const [e, a] = await Promise.all([
    N1().catch(() => null),
    HC().catch(() => Lm)
  ]);
  return { catalog: e, settings: a };
}
function yH() {
  return [
    {
      path: "/",
      loader: () => dy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: vH,
      Component: pH,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => dy(`/${bH(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: eH },
        { path: "dag", Component: rO },
        { path: "settings", Component: sH }
      ]
    }
  ];
}
function bH(e, a) {
  const i = e[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Hx = "ext-actions-request", xH = "ext-actions-declare", wH = "ext-action-state", Bx = "ext-action-invoke", Ux = "svi2-pro:navigate", Vx = "svi2-pro.render";
function _H(e, a) {
  let i = !1, l = !1;
  const s = () => ({
    id: Vx,
    label: i ? "Rendering…" : "Render",
    icon: i ? "hourglass_top" : "movie",
    tone: "primary",
    state: i ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(xH, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(wH, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === Vx && R5();
  }, y = D5((g) => {
    i = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(Hx, p), e.addEventListener(Bx, m), c(), {
    dispose: () => {
      y(), e.removeEventListener(Hx, p), e.removeEventListener(Bx, m);
    }
  };
}
const bm = "svi2-pro-app", SH = "ext-event", $x = "svi2-pro-stylesheet", qx = ["accent", "density", "card"];
function EH(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function NH() {
  if (typeof document > "u" || document.getElementById($x)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = $x, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
NH();
class CH extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  actionBridge = null;
  actionBridgeDeploymentId = null;
  router = null;
  navigateListener = null;
  paintedEntry = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = u2.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Ux, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = _H(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const l = i.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(Ux, a);
  }
  syncTweaksFromBody() {
    for (const a of qx) {
      const i = EH(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: qx.map((a) => `data-${a}`)
    }));
  }
  set hostContext(a) {
    this.ctx = a, this.paint();
  }
  get hostContext() {
    return this.ctx;
  }
  paint() {
    if (!this.root || !this.isConnected) return;
    const a = this.resolveInitialEntry();
    if (this.router && this.paintedEntry === a) return;
    const i = PN(yH(), { initialEntries: [a] });
    this.router = i, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ v.jsx(S.StrictMode, { children: /* @__PURE__ */ v.jsx(QN, { router: i }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const i = this.getAttribute("deployment-id");
    return i && i.length > 0 ? `/${i}/recipe` : "/";
  }
  emitHostEvent(a, i) {
    this.dispatchEvent(
      new CustomEvent(SH, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function RH() {
  typeof customElements > "u" || customElements.get(bm) || customElements.define(bm, CH);
}
typeof customElements < "u" && !customElements.get(bm) && RH();
export {
  RH as register
};
//# sourceMappingURL=svi2-pro.js.map
