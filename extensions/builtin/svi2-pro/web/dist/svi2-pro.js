function KE(e, a) {
  for (var r = 0; r < a.length; r++) {
    const l = a[r];
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
function Fh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var jd = { exports: {} }, xo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yy;
function JE() {
  if (yy) return xo;
  yy = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(l, s, u) {
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
  return xo.Fragment = a, xo.jsx = r, xo.jsxs = r, xo;
}
var vy;
function WE() {
  return vy || (vy = 1, jd.exports = JE()), jd.exports;
}
var b = WE(), Ld = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var by;
function e_() {
  if (by) return Ve;
  by = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), v = Symbol.iterator;
  function x(D) {
    return D === null || typeof D != "object" ? null : (D = v && D[v] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var S = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, N = Object.assign, C = {};
  function R(D, H, P) {
    this.props = D, this.context = H, this.refs = C, this.updater = P || S;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(D, H) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, H, "setState");
  }, R.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function z() {
  }
  z.prototype = R.prototype;
  function E(D, H, P) {
    this.props = D, this.context = H, this.refs = C, this.updater = P || S;
  }
  var O = E.prototype = new z();
  O.constructor = E, N(O, R.prototype), O.isPureReactComponent = !0;
  var k = Array.isArray;
  function B() {
  }
  var V = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function Y(D, H, P) {
    var ne = P.ref;
    return {
      $$typeof: e,
      type: D,
      key: H,
      ref: ne !== void 0 ? ne : null,
      props: P
    };
  }
  function te(D, H) {
    return Y(D.type, H, D.props);
  }
  function $(D) {
    return typeof D == "object" && D !== null && D.$$typeof === e;
  }
  function K(D) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(P) {
      return H[P];
    });
  }
  var le = /\/+/g;
  function j(D, H) {
    return typeof D == "object" && D !== null && D.key != null ? K("" + D.key) : H.toString(36);
  }
  function I(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(B, B) : (D.status = "pending", D.then(
          function(H) {
            D.status === "pending" && (D.status = "fulfilled", D.value = H);
          },
          function(H) {
            D.status === "pending" && (D.status = "rejected", D.reason = H);
          }
        )), D.status) {
          case "fulfilled":
            return D.value;
          case "rejected":
            throw D.reason;
        }
    }
    throw D;
  }
  function T(D, H, P, ne, se) {
    var he = typeof D;
    (he === "undefined" || he === "boolean") && (D = null);
    var me = !1;
    if (D === null) me = !0;
    else
      switch (he) {
        case "bigint":
        case "string":
        case "number":
          me = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case e:
            case a:
              me = !0;
              break;
            case y:
              return me = D._init, T(
                me(D._payload),
                H,
                P,
                ne,
                se
              );
          }
      }
    if (me)
      return se = se(D), me = ne === "" ? "." + j(D, 0) : ne, k(se) ? (P = "", me != null && (P = me.replace(le, "$&/") + "/"), T(se, H, P, "", function(ze) {
        return ze;
      })) : se != null && ($(se) && (se = te(
        se,
        P + (se.key == null || D && D.key === se.key ? "" : ("" + se.key).replace(
          le,
          "$&/"
        ) + "/") + me
      )), H.push(se)), 1;
    me = 0;
    var ee = ne === "" ? "." : ne + ":";
    if (k(D))
      for (var ge = 0; ge < D.length; ge++)
        ne = D[ge], he = ee + j(ne, ge), me += T(
          ne,
          H,
          P,
          he,
          se
        );
    else if (ge = x(D), typeof ge == "function")
      for (D = ge.call(D), ge = 0; !(ne = D.next()).done; )
        ne = ne.value, he = ee + j(ne, ge++), me += T(
          ne,
          H,
          P,
          he,
          se
        );
    else if (he === "object") {
      if (typeof D.then == "function")
        return T(
          I(D),
          H,
          P,
          ne,
          se
        );
      throw H = String(D), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return me;
  }
  function L(D, H, P) {
    if (D == null) return D;
    var ne = [], se = 0;
    return T(D, ne, "", "", function(he) {
      return H.call(P, he, se++);
    }), ne;
  }
  function F(D) {
    if (D._status === -1) {
      var H = D._result;
      H = H(), H.then(
        function(P) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = P);
        },
        function(P) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = P);
        }
      ), D._status === -1 && (D._status = 0, D._result = H);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var G = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, Z = {
    map: L,
    forEach: function(D, H, P) {
      L(
        D,
        function() {
          H.apply(this, arguments);
        },
        P
      );
    },
    count: function(D) {
      var H = 0;
      return L(D, function() {
        H++;
      }), H;
    },
    toArray: function(D) {
      return L(D, function(H) {
        return H;
      }) || [];
    },
    only: function(D) {
      if (!$(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Ve.Activity = g, Ve.Children = Z, Ve.Component = R, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = l, Ve.Suspense = p, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return V.H.useMemoCache(D);
    }
  }, Ve.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, Ve.cacheSignal = function() {
    return null;
  }, Ve.cloneElement = function(D, H, P) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var ne = N({}, D.props), se = D.key;
    if (H != null)
      for (he in H.key !== void 0 && (se = "" + H.key), H)
        !A.call(H, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && H.ref === void 0 || (ne[he] = H[he]);
    var he = arguments.length - 2;
    if (he === 1) ne.children = P;
    else if (1 < he) {
      for (var me = Array(he), ee = 0; ee < he; ee++)
        me[ee] = arguments[ee + 2];
      ne.children = me;
    }
    return Y(D.type, se, ne);
  }, Ve.createContext = function(D) {
    return D = {
      $$typeof: c,
      _currentValue: D,
      _currentValue2: D,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, D.Provider = D, D.Consumer = {
      $$typeof: u,
      _context: D
    }, D;
  }, Ve.createElement = function(D, H, P) {
    var ne, se = {}, he = null;
    if (H != null)
      for (ne in H.key !== void 0 && (he = "" + H.key), H)
        A.call(H, ne) && ne !== "key" && ne !== "__self" && ne !== "__source" && (se[ne] = H[ne]);
    var me = arguments.length - 2;
    if (me === 1) se.children = P;
    else if (1 < me) {
      for (var ee = Array(me), ge = 0; ge < me; ge++)
        ee[ge] = arguments[ge + 2];
      se.children = ee;
    }
    if (D && D.defaultProps)
      for (ne in me = D.defaultProps, me)
        se[ne] === void 0 && (se[ne] = me[ne]);
    return Y(D, he, se);
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(D) {
    return { $$typeof: d, render: D };
  }, Ve.isValidElement = $, Ve.lazy = function(D) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: D },
      _init: F
    };
  }, Ve.memo = function(D, H) {
    return {
      $$typeof: m,
      type: D,
      compare: H === void 0 ? null : H
    };
  }, Ve.startTransition = function(D) {
    var H = V.T, P = {};
    V.T = P;
    try {
      var ne = D(), se = V.S;
      se !== null && se(P, ne), typeof ne == "object" && ne !== null && typeof ne.then == "function" && ne.then(B, G);
    } catch (he) {
      G(he);
    } finally {
      H !== null && P.types !== null && (H.types = P.types), V.T = H;
    }
  }, Ve.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ve.use = function(D) {
    return V.H.use(D);
  }, Ve.useActionState = function(D, H, P) {
    return V.H.useActionState(D, H, P);
  }, Ve.useCallback = function(D, H) {
    return V.H.useCallback(D, H);
  }, Ve.useContext = function(D) {
    return V.H.useContext(D);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(D, H) {
    return V.H.useDeferredValue(D, H);
  }, Ve.useEffect = function(D, H) {
    return V.H.useEffect(D, H);
  }, Ve.useEffectEvent = function(D) {
    return V.H.useEffectEvent(D);
  }, Ve.useId = function() {
    return V.H.useId();
  }, Ve.useImperativeHandle = function(D, H, P) {
    return V.H.useImperativeHandle(D, H, P);
  }, Ve.useInsertionEffect = function(D, H) {
    return V.H.useInsertionEffect(D, H);
  }, Ve.useLayoutEffect = function(D, H) {
    return V.H.useLayoutEffect(D, H);
  }, Ve.useMemo = function(D, H) {
    return V.H.useMemo(D, H);
  }, Ve.useOptimistic = function(D, H) {
    return V.H.useOptimistic(D, H);
  }, Ve.useReducer = function(D, H, P) {
    return V.H.useReducer(D, H, P);
  }, Ve.useRef = function(D) {
    return V.H.useRef(D);
  }, Ve.useState = function(D) {
    return V.H.useState(D);
  }, Ve.useSyncExternalStore = function(D, H, P) {
    return V.H.useSyncExternalStore(
      D,
      H,
      P
    );
  }, Ve.useTransition = function() {
    return V.H.useTransition();
  }, Ve.version = "19.2.7", Ve;
}
var xy;
function Zo() {
  return xy || (xy = 1, Ld.exports = e_()), Ld.exports;
}
var _ = Zo();
const ye = /* @__PURE__ */ Fh(_), t_ = /* @__PURE__ */ KE({
  __proto__: null,
  default: ye
}, [_]);
var Hd = { exports: {} }, wo = {}, kd = { exports: {} }, Bd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wy;
function n_() {
  return wy || (wy = 1, (function(e) {
    function a(T, L) {
      var F = T.length;
      T.push(L);
      e: for (; 0 < F; ) {
        var G = F - 1 >>> 1, Z = T[G];
        if (0 < s(Z, L))
          T[G] = L, T[F] = Z, F = G;
        else break e;
      }
    }
    function r(T) {
      return T.length === 0 ? null : T[0];
    }
    function l(T) {
      if (T.length === 0) return null;
      var L = T[0], F = T.pop();
      if (F !== L) {
        T[0] = F;
        e: for (var G = 0, Z = T.length, D = Z >>> 1; G < D; ) {
          var H = 2 * (G + 1) - 1, P = T[H], ne = H + 1, se = T[ne];
          if (0 > s(P, F))
            ne < Z && 0 > s(se, P) ? (T[G] = se, T[ne] = F, G = ne) : (T[G] = P, T[H] = F, G = H);
          else if (ne < Z && 0 > s(se, F))
            T[G] = se, T[ne] = F, G = ne;
          else break e;
        }
      }
      return L;
    }
    function s(T, L) {
      var F = T.sortIndex - L.sortIndex;
      return F !== 0 ? F : T.id - L.id;
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
    var p = [], m = [], y = 1, g = null, v = 3, x = !1, S = !1, N = !1, C = !1, R = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function O(T) {
      for (var L = r(m); L !== null; ) {
        if (L.callback === null) l(m);
        else if (L.startTime <= T)
          l(m), L.sortIndex = L.expirationTime, a(p, L);
        else break;
        L = r(m);
      }
    }
    function k(T) {
      if (N = !1, O(T), !S)
        if (r(p) !== null)
          S = !0, B || (B = !0, K());
        else {
          var L = r(m);
          L !== null && I(k, L.startTime - T);
        }
    }
    var B = !1, V = -1, A = 5, Y = -1;
    function te() {
      return C ? !0 : !(e.unstable_now() - Y < A);
    }
    function $() {
      if (C = !1, B) {
        var T = e.unstable_now();
        Y = T;
        var L = !0;
        try {
          e: {
            S = !1, N && (N = !1, z(V), V = -1), x = !0;
            var F = v;
            try {
              t: {
                for (O(T), g = r(p); g !== null && !(g.expirationTime > T && te()); ) {
                  var G = g.callback;
                  if (typeof G == "function") {
                    g.callback = null, v = g.priorityLevel;
                    var Z = G(
                      g.expirationTime <= T
                    );
                    if (T = e.unstable_now(), typeof Z == "function") {
                      g.callback = Z, O(T), L = !0;
                      break t;
                    }
                    g === r(p) && l(p), O(T);
                  } else l(p);
                  g = r(p);
                }
                if (g !== null) L = !0;
                else {
                  var D = r(m);
                  D !== null && I(
                    k,
                    D.startTime - T
                  ), L = !1;
                }
              }
              break e;
            } finally {
              g = null, v = F, x = !1;
            }
            L = void 0;
          }
        } finally {
          L ? K() : B = !1;
        }
      }
    }
    var K;
    if (typeof E == "function")
      K = function() {
        E($);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), j = le.port2;
      le.port1.onmessage = $, K = function() {
        j.postMessage(null);
      };
    } else
      K = function() {
        R($, 0);
      };
    function I(T, L) {
      V = R(function() {
        T(e.unstable_now());
      }, L);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, e.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < T ? Math.floor(1e3 / T) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, e.unstable_next = function(T) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = v;
      }
      var F = v;
      v = L;
      try {
        return T();
      } finally {
        v = F;
      }
    }, e.unstable_requestPaint = function() {
      C = !0;
    }, e.unstable_runWithPriority = function(T, L) {
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
      var F = v;
      v = T;
      try {
        return L();
      } finally {
        v = F;
      }
    }, e.unstable_scheduleCallback = function(T, L, F) {
      var G = e.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? G + F : G) : F = G, T) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return Z = F + Z, T = {
        id: y++,
        callback: L,
        priorityLevel: T,
        startTime: F,
        expirationTime: Z,
        sortIndex: -1
      }, F > G ? (T.sortIndex = F, a(m, T), r(p) === null && T === r(m) && (N ? (z(V), V = -1) : N = !0, I(k, F - G))) : (T.sortIndex = Z, a(p, T), S || x || (S = !0, B || (B = !0, K()))), T;
    }, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(T) {
      var L = v;
      return function() {
        var F = v;
        v = L;
        try {
          return T.apply(this, arguments);
        } finally {
          v = F;
        }
      };
    };
  })(Bd)), Bd;
}
var Sy;
function a_() {
  return Sy || (Sy = 1, kd.exports = n_()), kd.exports;
}
var Ud = { exports: {} }, fn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ey;
function i_() {
  if (Ey) return fn;
  Ey = 1;
  var e = Zo();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var l = {
    d: {
      f: r,
      r: function() {
        throw Error(a(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
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
  return fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, fn.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(p, m, null, y);
  }, fn.flushSync = function(p) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, fn.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(p, m));
  }, fn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, fn.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, g = d(y, m.crossOrigin), v = typeof m.integrity == "string" ? m.integrity : void 0, x = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? l.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: g,
          integrity: v,
          fetchPriority: x
        }
      ) : y === "script" && l.d.X(p, {
        crossOrigin: g,
        integrity: v,
        fetchPriority: x,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, fn.preinitModule = function(p, m) {
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
  }, fn.preload = function(p, m) {
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
  }, fn.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = d(m.as, m.crossOrigin);
        l.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(p);
  }, fn.requestFormReset = function(p) {
    l.d.r(p);
  }, fn.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, fn.useFormState = function(p, m, y) {
    return c.H.useFormState(p, m, y);
  }, fn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, fn.version = "19.2.7", fn;
}
var _y;
function Zb() {
  if (_y) return Ud.exports;
  _y = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Ud.exports = i_(), Ud.exports;
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
var Ny;
function r_() {
  if (Ny) return wo;
  Ny = 1;
  var e = a_(), a = Zo(), r = Zb();
  function l(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        n += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function u(t) {
    var n = t, i = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do
        n = t, (n.flags & 4098) !== 0 && (i = n.return), t = n.return;
      while (t);
    }
    return n.tag === 3 ? i : null;
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
    for (var i = t, o = n; ; ) {
      var f = i.return;
      if (f === null) break;
      var h = f.alternate;
      if (h === null) {
        if (o = f.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === i) return p(f), t;
          if (h === o) return p(f), n;
          h = h.sibling;
        }
        throw Error(l(188));
      }
      if (i.return !== o.return) i = f, o = h;
      else {
        for (var w = !1, M = f.child; M; ) {
          if (M === i) {
            w = !0, i = f, o = h;
            break;
          }
          if (M === o) {
            w = !0, o = f, i = h;
            break;
          }
          M = M.sibling;
        }
        if (!w) {
          for (M = h.child; M; ) {
            if (M === i) {
              w = !0, i = h, o = f;
              break;
            }
            if (M === o) {
              w = !0, o = h, i = f;
              break;
            }
            M = M.sibling;
          }
          if (!w) throw Error(l(189));
        }
      }
      if (i.alternate !== o) throw Error(l(190));
    }
    if (i.tag !== 3) throw Error(l(188));
    return i.stateNode.current === i ? t : n;
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
  var g = Object.assign, v = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), E = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var le = Symbol.for("react.client.reference");
  function j(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === le ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case N:
        return "Fragment";
      case R:
        return "Profiler";
      case C:
        return "StrictMode";
      case k:
        return "Suspense";
      case B:
        return "SuspenseList";
      case Y:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case S:
          return "Portal";
        case E:
          return t.displayName || "Context";
        case z:
          return (t._context.displayName || "Context") + ".Consumer";
        case O:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case V:
          return n = t.displayName || null, n !== null ? n : j(t.type) || "Memo";
        case A:
          n = t._payload, t = t._init;
          try {
            return j(t(n));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, T = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], Z = -1;
  function D(t) {
    return { current: t };
  }
  function H(t) {
    0 > Z || (t.current = G[Z], G[Z] = null, Z--);
  }
  function P(t, n) {
    Z++, G[Z] = t.current, t.current = n;
  }
  var ne = D(null), se = D(null), he = D(null), me = D(null);
  function ee(t, n) {
    switch (P(he, n), P(se, t), P(ne, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? V0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = V0(n), t = q0(n, t);
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
    H(ne), P(ne, t);
  }
  function ge() {
    H(ne), H(se), H(he);
  }
  function ze(t) {
    t.memoizedState !== null && P(me, t);
    var n = ne.current, i = q0(n, t.type);
    n !== i && (P(se, t), P(ne, i));
  }
  function Re(t) {
    se.current === t && (H(ne), H(se)), me.current === t && (H(me), go._currentValue = F);
  }
  var Se, xe;
  function Ce(t) {
    if (Se === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        Se = n && n[1] || "", xe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Se + t + xe;
  }
  var $e = !1;
  function ft(t, n) {
    if (!t || $e) return "";
    $e = !0;
    var i = Error.prepareStackTrace;
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
                  var re = oe;
                }
                Reflect.construct(t, [], fe);
              } else {
                try {
                  fe.call();
                } catch (oe) {
                  re = oe;
                }
                t.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                re = oe;
              }
              (fe = t()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && re && typeof oe.stack == "string")
              return [oe.stack, re.stack];
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
      var h = o.DetermineComponentFrameRoot(), w = h[0], M = h[1];
      if (w && M) {
        var q = w.split(`
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
      $e = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? Ce(i) : "";
  }
  function Te(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ce(t.type);
      case 16:
        return Ce("Lazy");
      case 13:
        return t.child !== n && n !== null ? Ce("Suspense Fallback") : Ce("Suspense");
      case 19:
        return Ce("SuspenseList");
      case 0:
      case 15:
        return ft(t.type, !1);
      case 11:
        return ft(t.type.render, !1);
      case 1:
        return ft(t.type, !0);
      case 31:
        return Ce("Activity");
      default:
        return "";
    }
  }
  function Xe(t) {
    try {
      var n = "", i = null;
      do
        n += Te(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var ke = Object.prototype.hasOwnProperty, Ye = e.unstable_scheduleCallback, St = e.unstable_cancelCallback, Je = e.unstable_shouldYield, Ze = e.unstable_requestPaint, Qe = e.unstable_now, gt = e.unstable_getCurrentPriorityLevel, yt = e.unstable_ImmediatePriority, It = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, mt = e.unstable_LowPriority, ot = e.unstable_IdlePriority, Xn = e.log, xn = e.unstable_setDisableYieldValue, tn = null, Pt = null;
  function Ot(t) {
    if (typeof Xn == "function" && xn(t), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(tn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : wn, mi = Math.log, _a = Math.LN2;
  function wn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (mi(t) / _a | 0) | 0;
  }
  var ua = 256, On = 262144, Fn = 4194304;
  function un(t) {
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
  function He(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0, h = t.suspendedLanes, w = t.pingedLanes;
    t = t.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~h, o !== 0 ? f = un(o) : (w &= M, w !== 0 ? f = un(w) : i || (i = M & ~t, i !== 0 && (f = un(i))))) : (M = o & ~h, M !== 0 ? f = un(M) : w !== 0 ? f = un(w) : i || (i = o & ~t, i !== 0 && (f = un(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, i = n & -n, h >= i || h === 32 && (i & 4194048) !== 0) ? n : f;
  }
  function vt(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Ht(t, n) {
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
    var t = Fn;
    return Fn <<= 1, (Fn & 62914560) === 0 && (Fn = 4194304), t;
  }
  function mn(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function pt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Kt(t, n, i, o, f, h) {
    var w = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var M = t.entanglements, q = t.expirationTimes, ie = t.hiddenUpdates;
    for (i = w & ~i; 0 < i; ) {
      var ue = 31 - Ut(i), fe = 1 << ue;
      M[ue] = 0, q[ue] = -1;
      var re = ie[ue];
      if (re !== null)
        for (ie[ue] = null, ue = 0; ue < re.length; ue++) {
          var oe = re[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      i &= ~fe;
    }
    o !== 0 && ca(t, o, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(w & ~n));
  }
  function ca(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ut(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function Wt(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ut(i), f = 1 << o;
      f & n | t[o] & n && (t[o] |= n), i &= ~f;
    }
  }
  function U(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Q(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Q(t) {
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
  function W(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function de() {
    var t = L.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : cy(t.type));
  }
  function pe(t, n) {
    var i = L.p;
    try {
      return L.p = t, n();
    } finally {
      L.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, we = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Me = "__reactEvents$" + Ee, De = "__reactListeners$" + Ee, Ue = "__reactHandles$" + Ee, je = "__reactResources$" + Ee, Ge = "__reactMarker$" + Ee;
  function rt(t) {
    delete t[ve], delete t[we], delete t[Me], delete t[De], delete t[Ue];
  }
  function Ct(t) {
    var n = t[ve];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = Z0(t); t !== null; ) {
            if (i = t[ve]) return i;
            t = Z0(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function st(t) {
    if (t = t[ve] || t[be]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function We(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(l(33));
  }
  function jt(t) {
    var n = t[je];
    return n || (n = t[je] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(t) {
    t[Ge] = !0;
  }
  var Na = /* @__PURE__ */ new Set(), jn = {};
  function cn(t, n) {
    nn(t, n), nn(t + "Capture", n);
  }
  function nn(t, n) {
    for (jn[t] = n, t = 0; t < n.length; t++)
      Na.add(n[t]);
  }
  var Sn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), pi = {}, En = {};
  function gi(t) {
    return ke.call(En, t) ? !0 : ke.call(pi, t) ? !1 : Sn.test(t) ? En[t] = !0 : (pi[t] = !0, !1);
  }
  function fa(t, n, i) {
    if (gi(n))
      if (i === null) t.removeAttribute(n);
      else {
        switch (typeof i) {
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
        t.setAttribute(n, "" + i);
      }
  }
  function da(t, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + i);
    }
  }
  function Be(t, n, i, o) {
    if (o === null) t.removeAttribute(i);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(i);
          return;
      }
      t.setAttributeNS(n, i, "" + o);
    }
  }
  function bt(t) {
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
  function pn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Ln(t, n, i) {
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
        set: function(w) {
          i = "" + w, h.call(this, w);
        }
      }), Object.defineProperty(t, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(w) {
          i = "" + w;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function yi(t) {
    if (!t._valueTracker) {
      var n = pn(t) ? "checked" : "value";
      t._valueTracker = Ln(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function $a(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = pn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function dt(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Zn = /[\n"\\]/g;
  function an(t) {
    return t.replace(
      Zn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Qi(t, n, i, o, f, h, w, M) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + bt(n)) : t.value !== "" + bt(n) && (t.value = "" + bt(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? Dl(t, w, bt(n)) : i != null ? Dl(t, w, bt(i)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + bt(M) : t.removeAttribute("name");
  }
  function Mr(t, n, i, o, f, h, w, M) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || i != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        yi(t);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), yi(t);
  }
  function Dl(t, n, i) {
    n === "number" && dt(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function vi(t, n, i, o) {
    if (t = t.options, n) {
      n = {};
      for (var f = 0; f < i.length; f++)
        n["$" + i[f]] = !0;
      for (i = 0; i < t.length; i++)
        f = n.hasOwnProperty("$" + t[i].value), t[i].selected !== f && (t[i].selected = f), f && o && (t[i].defaultSelected = !0);
    } else {
      for (i = "" + bt(i), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === i) {
          t[f].selected = !0, o && (t[f].defaultSelected = !0);
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Al(t, n, i) {
    if (n != null && (n = "" + bt(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + bt(i) : "";
  }
  function Hm(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(l(92));
        if (I(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = bt(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), yi(t);
  }
  function Dr(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var Xw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function km(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || Xw.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function Bm(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && km(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && km(t, h, n[h]);
  }
  function Mc(t) {
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
  var Fw = /* @__PURE__ */ new Map([
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
  ]), Zw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function os(t) {
    return Zw.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Ya() {
  }
  var Dc = null;
  function Ac(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ar = null, zr = null;
  function Um(t) {
    var n = st(t);
    if (n && (t = n.stateNode)) {
      var i = t[we] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (Qi(
            t,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), n = i.name, i.type === "radio" && n != null) {
            for (i = t; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + an(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var f = o[we] || null;
                if (!f) throw Error(l(90));
                Qi(
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
            for (n = 0; n < i.length; n++)
              o = i[n], o.form === t.form && $a(o);
          }
          break e;
        case "textarea":
          Al(t, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && vi(t, !!i.multiple, n, !1);
      }
    }
  }
  var zc = !1;
  function Vm(t, n, i) {
    if (zc) return t(n, i);
    zc = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (zc = !1, (Ar !== null || zr !== null) && (Zs(), Ar && (n = Ar, t = zr, zr = Ar = null, Um(n), t)))
        for (n = 0; n < t.length; n++) Um(t[n]);
    }
  }
  function zl(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[we] || null;
    if (o === null) return null;
    i = o[n];
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
    if (i && typeof i != "function")
      throw Error(
        l(231, n, typeof i)
      );
    return i;
  }
  var Ia = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Oc = !1;
  if (Ia)
    try {
      var Ol = {};
      Object.defineProperty(Ol, "passive", {
        get: function() {
          Oc = !0;
        }
      }), window.addEventListener("test", Ol, Ol), window.removeEventListener("test", Ol, Ol);
    } catch {
      Oc = !1;
    }
  var bi = null, jc = null, ss = null;
  function qm() {
    if (ss) return ss;
    var t, n = jc, i = n.length, o, f = "value" in bi ? bi.value : bi.textContent, h = f.length;
    for (t = 0; t < i && n[t] === f[t]; t++) ;
    var w = i - t;
    for (o = 1; o <= w && n[i - o] === f[h - o]; o++) ;
    return ss = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function us(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function cs() {
    return !0;
  }
  function $m() {
    return !1;
  }
  function _n(t) {
    function n(i, o, f, h, w) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (i = t[M], this[M] = i ? i(h) : h[M]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? cs : $m, this.isPropagationStopped = $m, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = cs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = cs);
      },
      persist: function() {
      },
      isPersistent: cs
    }), n;
  }
  var Pi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, fs = _n(Pi), jl = g({}, Pi, { view: 0, detail: 0 }), Qw = _n(jl), Lc, Hc, Ll, ds = g({}, jl, {
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
    getModifierState: Bc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ll && (Ll && t.type === "mousemove" ? (Lc = t.screenX - Ll.screenX, Hc = t.screenY - Ll.screenY) : Hc = Lc = 0, Ll = t), Lc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Hc;
    }
  }), Ym = _n(ds), Pw = g({}, ds, { dataTransfer: 0 }), Kw = _n(Pw), Jw = g({}, jl, { relatedTarget: 0 }), kc = _n(Jw), Ww = g({}, Pi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eS = _n(Ww), tS = g({}, Pi, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), nS = _n(tS), aS = g({}, Pi, { data: 0 }), Im = _n(aS), iS = {
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
  }, rS = {
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
  }, lS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function oS(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = lS[t]) ? !!n[t] : !1;
  }
  function Bc() {
    return oS;
  }
  var sS = g({}, jl, {
    key: function(t) {
      if (t.key) {
        var n = iS[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = us(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? rS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Bc,
    charCode: function(t) {
      return t.type === "keypress" ? us(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? us(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), uS = _n(sS), cS = g({}, ds, {
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
  }), Gm = _n(cS), fS = g({}, jl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Bc
  }), dS = _n(fS), hS = g({}, Pi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mS = _n(hS), pS = g({}, ds, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gS = _n(pS), yS = g({}, Pi, {
    newState: 0,
    oldState: 0
  }), vS = _n(yS), bS = [9, 13, 27, 32], Uc = Ia && "CompositionEvent" in window, Hl = null;
  Ia && "documentMode" in document && (Hl = document.documentMode);
  var xS = Ia && "TextEvent" in window && !Hl, Xm = Ia && (!Uc || Hl && 8 < Hl && 11 >= Hl), Fm = " ", Zm = !1;
  function Qm(t, n) {
    switch (t) {
      case "keyup":
        return bS.indexOf(n.keyCode) !== -1;
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
  function Pm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Or = !1;
  function wS(t, n) {
    switch (t) {
      case "compositionend":
        return Pm(n);
      case "keypress":
        return n.which !== 32 ? null : (Zm = !0, Fm);
      case "textInput":
        return t = n.data, t === Fm && Zm ? null : t;
      default:
        return null;
    }
  }
  function SS(t, n) {
    if (Or)
      return t === "compositionend" || !Uc && Qm(t, n) ? (t = qm(), ss = jc = bi = null, Or = !1, t) : null;
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
        return Xm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var ES = {
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
  function Km(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!ES[t.type] : n === "textarea";
  }
  function Jm(t, n, i, o) {
    Ar ? zr ? zr.push(o) : zr = [o] : Ar = o, n = tu(n, "onChange"), 0 < n.length && (i = new fs(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var kl = null, Bl = null;
  function _S(t) {
    j0(t, 0);
  }
  function hs(t) {
    var n = We(t);
    if ($a(n)) return t;
  }
  function Wm(t, n) {
    if (t === "change") return n;
  }
  var ep = !1;
  if (Ia) {
    var Vc;
    if (Ia) {
      var qc = "oninput" in document;
      if (!qc) {
        var tp = document.createElement("div");
        tp.setAttribute("oninput", "return;"), qc = typeof tp.oninput == "function";
      }
      Vc = qc;
    } else Vc = !1;
    ep = Vc && (!document.documentMode || 9 < document.documentMode);
  }
  function np() {
    kl && (kl.detachEvent("onpropertychange", ap), Bl = kl = null);
  }
  function ap(t) {
    if (t.propertyName === "value" && hs(Bl)) {
      var n = [];
      Jm(
        n,
        Bl,
        t,
        Ac(t)
      ), Vm(_S, n);
    }
  }
  function NS(t, n, i) {
    t === "focusin" ? (np(), kl = n, Bl = i, kl.attachEvent("onpropertychange", ap)) : t === "focusout" && np();
  }
  function CS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return hs(Bl);
  }
  function RS(t, n) {
    if (t === "click") return hs(n);
  }
  function TS(t, n) {
    if (t === "input" || t === "change")
      return hs(n);
  }
  function MS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Hn = typeof Object.is == "function" ? Object.is : MS;
  function Ul(t, n) {
    if (Hn(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!ke.call(n, f) || !Hn(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function ip(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function rp(t, n) {
    var i = ip(t);
    t = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (o = t + i.textContent.length, t <= n && o >= n)
          return { node: i, offset: n - t };
        t = o;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = ip(i);
    }
  }
  function lp(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? lp(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function op(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = dt(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = dt(t.document);
    }
    return n;
  }
  function $c(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var DS = Ia && "documentMode" in document && 11 >= document.documentMode, jr = null, Yc = null, Vl = null, Ic = !1;
  function sp(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Ic || jr == null || jr !== dt(o) || (o = jr, "selectionStart" in o && $c(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Vl && Ul(Vl, o) || (Vl = o, o = tu(Yc, "onSelect"), 0 < o.length && (n = new fs(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = jr)));
  }
  function Ki(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var Lr = {
    animationend: Ki("Animation", "AnimationEnd"),
    animationiteration: Ki("Animation", "AnimationIteration"),
    animationstart: Ki("Animation", "AnimationStart"),
    transitionrun: Ki("Transition", "TransitionRun"),
    transitionstart: Ki("Transition", "TransitionStart"),
    transitioncancel: Ki("Transition", "TransitionCancel"),
    transitionend: Ki("Transition", "TransitionEnd")
  }, Gc = {}, up = {};
  Ia && (up = document.createElement("div").style, "AnimationEvent" in window || (delete Lr.animationend.animation, delete Lr.animationiteration.animation, delete Lr.animationstart.animation), "TransitionEvent" in window || delete Lr.transitionend.transition);
  function Ji(t) {
    if (Gc[t]) return Gc[t];
    if (!Lr[t]) return t;
    var n = Lr[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in up)
        return Gc[t] = n[i];
    return t;
  }
  var cp = Ji("animationend"), fp = Ji("animationiteration"), dp = Ji("animationstart"), AS = Ji("transitionrun"), zS = Ji("transitionstart"), OS = Ji("transitioncancel"), hp = Ji("transitionend"), mp = /* @__PURE__ */ new Map(), Xc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Xc.push("scrollEnd");
  function ha(t, n) {
    mp.set(t, n), cn(n, [t]);
  }
  var ms = typeof reportError == "function" ? reportError : function(t) {
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
  }, Qn = [], Hr = 0, Fc = 0;
  function ps() {
    for (var t = Hr, n = Fc = Hr = 0; n < t; ) {
      var i = Qn[n];
      Qn[n++] = null;
      var o = Qn[n];
      Qn[n++] = null;
      var f = Qn[n];
      Qn[n++] = null;
      var h = Qn[n];
      if (Qn[n++] = null, o !== null && f !== null) {
        var w = o.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), o.pending = f;
      }
      h !== 0 && pp(i, f, h);
    }
  }
  function gs(t, n, i, o) {
    Qn[Hr++] = t, Qn[Hr++] = n, Qn[Hr++] = i, Qn[Hr++] = o, Fc |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function Zc(t, n, i, o) {
    return gs(t, n, i, o), ys(t);
  }
  function Wi(t, n) {
    return gs(t, null, null, n), ys(t);
  }
  function pp(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= i, o = h.alternate, o !== null && (o.childLanes |= i), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(i), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = i | 536870912), h) : null;
  }
  function ys(t) {
    if (50 < so)
      throw so = 0, id = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var kr = {};
  function jS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function kn(t, n, i, o) {
    return new jS(t, n, i, o);
  }
  function Qc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ga(t, n) {
    var i = t.alternate;
    return i === null ? (i = kn(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function gp(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function vs(t, n, i, o, f, h) {
    var w = 0;
    if (o = t, typeof t == "function") Qc(t) && (w = 1);
    else if (typeof t == "string")
      w = UE(
        t,
        i,
        ne.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case Y:
          return t = kn(31, i, n, f), t.elementType = Y, t.lanes = h, t;
        case N:
          return er(i.children, f, h, n);
        case C:
          w = 8, f |= 24;
          break;
        case R:
          return t = kn(12, i, n, f | 2), t.elementType = R, t.lanes = h, t;
        case k:
          return t = kn(13, i, n, f), t.elementType = k, t.lanes = h, t;
        case B:
          return t = kn(19, i, n, f), t.elementType = B, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case E:
                w = 10;
                break e;
              case z:
                w = 9;
                break e;
              case O:
                w = 11;
                break e;
              case V:
                w = 14;
                break e;
              case A:
                w = 16, o = null;
                break e;
            }
          w = 29, i = Error(
            l(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = kn(w, i, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function er(t, n, i, o) {
    return t = kn(7, t, o, n), t.lanes = i, t;
  }
  function Pc(t, n, i) {
    return t = kn(6, t, null, n), t.lanes = i, t;
  }
  function yp(t) {
    var n = kn(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function Kc(t, n, i) {
    return n = kn(
      4,
      t.children !== null ? t.children : [],
      t.key,
      n
    ), n.lanes = i, n.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, n;
  }
  var vp = /* @__PURE__ */ new WeakMap();
  function Pn(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = vp.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Xe(n)
      }, vp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Xe(n)
    };
  }
  var Br = [], Ur = 0, bs = null, ql = 0, Kn = [], Jn = 0, xi = null, Ca = 1, Ra = "";
  function Xa(t, n) {
    Br[Ur++] = ql, Br[Ur++] = bs, bs = t, ql = n;
  }
  function bp(t, n, i) {
    Kn[Jn++] = Ca, Kn[Jn++] = Ra, Kn[Jn++] = xi, xi = t;
    var o = Ca;
    t = Ra;
    var f = 32 - Ut(o) - 1;
    o &= ~(1 << f), i += 1;
    var h = 32 - Ut(n) + f;
    if (30 < h) {
      var w = f - f % 5;
      h = (o & (1 << w) - 1).toString(32), o >>= w, f -= w, Ca = 1 << 32 - Ut(n) + f | i << f | o, Ra = h + t;
    } else
      Ca = 1 << h | i << f | o, Ra = t;
  }
  function Jc(t) {
    t.return !== null && (Xa(t, 1), bp(t, 1, 0));
  }
  function Wc(t) {
    for (; t === bs; )
      bs = Br[--Ur], Br[Ur] = null, ql = Br[--Ur], Br[Ur] = null;
    for (; t === xi; )
      xi = Kn[--Jn], Kn[Jn] = null, Ra = Kn[--Jn], Kn[Jn] = null, Ca = Kn[--Jn], Kn[Jn] = null;
  }
  function xp(t, n) {
    Kn[Jn++] = Ca, Kn[Jn++] = Ra, Kn[Jn++] = xi, Ca = n.id, Ra = n.overflow, xi = t;
  }
  var rn = null, Tt = null, it = !1, wi = null, Wn = !1, ef = Error(l(519));
  function Si(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $l(Pn(n, t)), ef;
  }
  function wp(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ve] = t, n[we] = o, i) {
      case "dialog":
        Ke("cancel", n), Ke("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ke("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < co.length; i++)
          Ke(co[i], n);
        break;
      case "source":
        Ke("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ke("error", n), Ke("load", n);
        break;
      case "details":
        Ke("toggle", n);
        break;
      case "input":
        Ke("invalid", n), Mr(
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
        Ke("invalid", n);
        break;
      case "textarea":
        Ke("invalid", n), Hm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || B0(n.textContent, i) ? (o.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), o.onScroll != null && Ke("scroll", n), o.onScrollEnd != null && Ke("scrollend", n), o.onClick != null && (n.onclick = Ya), n = !0) : n = !1, n || Si(t, !0);
  }
  function Sp(t) {
    for (rn = t.return; rn; )
      switch (rn.tag) {
        case 5:
        case 31:
        case 13:
          Wn = !1;
          return;
        case 27:
        case 3:
          Wn = !0;
          return;
        default:
          rn = rn.return;
      }
  }
  function Vr(t) {
    if (t !== rn) return !1;
    if (!it) return Sp(t), it = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || bd(t.type, t.memoizedProps)), i = !i), i && Tt && Si(t), Sp(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = F0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = F0(t);
    } else
      n === 27 ? (n = Tt, Hi(t.type) ? (t = _d, _d = null, Tt = t) : Tt = n) : Tt = rn ? ta(t.stateNode.nextSibling) : null;
    return !0;
  }
  function tr() {
    Tt = rn = null, it = !1;
  }
  function tf() {
    var t = wi;
    return t !== null && (Tn === null ? Tn = t : Tn.push.apply(
      Tn,
      t
    ), wi = null), t;
  }
  function $l(t) {
    wi === null ? wi = [t] : wi.push(t);
  }
  var nf = D(null), nr = null, Fa = null;
  function Ei(t, n, i) {
    P(nf, n._currentValue), n._currentValue = i;
  }
  function Za(t) {
    t._currentValue = nf.current, H(nf);
  }
  function af(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function rf(t, n, i, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var w = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var M = h;
          h = f;
          for (var q = 0; q < n.length; q++)
            if (M.context === n[q]) {
              h.lanes |= i, M = h.alternate, M !== null && (M.lanes |= i), af(
                h.return,
                i,
                t
              ), o || (w = null);
              break e;
            }
          h = M.next;
        }
      } else if (f.tag === 18) {
        if (w = f.return, w === null) throw Error(l(341));
        w.lanes |= i, h = w.alternate, h !== null && (h.lanes |= i), af(w, i, t), w = null;
      } else w = f.child;
      if (w !== null) w.return = f;
      else
        for (w = f; w !== null; ) {
          if (w === t) {
            w = null;
            break;
          }
          if (f = w.sibling, f !== null) {
            f.return = w.return, w = f;
            break;
          }
          w = w.return;
        }
      f = w;
    }
  }
  function qr(t, n, i, o) {
    t = null;
    for (var f = n, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var w = f.alternate;
        if (w === null) throw Error(l(387));
        if (w = w.memoizedProps, w !== null) {
          var M = f.type;
          Hn(f.pendingProps.value, w.value) || (t !== null ? t.push(M) : t = [M]);
        }
      } else if (f === me.current) {
        if (w = f.alternate, w === null) throw Error(l(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(go) : t = [go]);
      }
      f = f.return;
    }
    t !== null && rf(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function xs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Hn(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ar(t) {
    nr = t, Fa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ln(t) {
    return Ep(nr, t);
  }
  function ws(t, n) {
    return nr === null && ar(t), Ep(t, n);
  }
  function Ep(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Fa === null) {
      if (t === null) throw Error(l(308));
      Fa = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Fa = Fa.next = n;
    return i;
  }
  var LS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(i, o) {
        t.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, t.forEach(function(i) {
        return i();
      });
    };
  }, HS = e.unstable_scheduleCallback, kS = e.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function lf() {
    return {
      controller: new LS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Yl(t) {
    t.refCount--, t.refCount === 0 && HS(kS, function() {
      t.controller.abort();
    });
  }
  var Il = null, of = 0, $r = 0, Yr = null;
  function BS(t, n) {
    if (Il === null) {
      var i = Il = [];
      of = 0, $r = cd(), Yr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return of++, n.then(_p, _p), n;
  }
  function _p() {
    if (--of === 0 && Il !== null) {
      Yr !== null && (Yr.status = "fulfilled");
      var t = Il;
      Il = null, $r = 0, Yr = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function US(t, n) {
    var i = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        i.push(f);
      }
    };
    return t.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var f = 0; f < i.length; f++) (0, i[f])(n);
      },
      function(f) {
        for (o.status = "rejected", o.reason = f, f = 0; f < i.length; f++)
          (0, i[f])(void 0);
      }
    ), o;
  }
  var Np = T.S;
  T.S = function(t, n) {
    s0 = Qe(), typeof n == "object" && n !== null && typeof n.then == "function" && BS(t, n), Np !== null && Np(t, n);
  };
  var ir = D(null);
  function sf() {
    var t = ir.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function Ss(t, n) {
    n === null ? P(ir, ir.current) : P(ir, n.pool);
  }
  function Cp() {
    var t = sf();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Ir = Error(l(460)), uf = Error(l(474)), Es = Error(l(542)), _s = { then: function() {
  } };
  function Rp(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Tp(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Ya, Ya), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, Dp(t), t;
      default:
        if (typeof n.status == "string") n.then(Ya, Ya);
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
            throw t = n.reason, Dp(t), t;
        }
        throw lr = n, Ir;
    }
  }
  function rr(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (lr = i, Ir) : i;
    }
  }
  var lr = null;
  function Mp() {
    if (lr === null) throw Error(l(459));
    var t = lr;
    return lr = null, t;
  }
  function Dp(t) {
    if (t === Ir || t === Es)
      throw Error(l(483));
  }
  var Gr = null, Gl = 0;
  function Ns(t) {
    var n = Gl;
    return Gl += 1, Gr === null && (Gr = []), Tp(Gr, t, n);
  }
  function Xl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Cs(t, n) {
    throw n.$$typeof === v ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function Ap(t) {
    function n(J, X) {
      if (t) {
        var ae = J.deletions;
        ae === null ? (J.deletions = [X], J.flags |= 16) : ae.push(X);
      }
    }
    function i(J, X) {
      if (!t) return null;
      for (; X !== null; )
        n(J, X), X = X.sibling;
      return null;
    }
    function o(J) {
      for (var X = /* @__PURE__ */ new Map(); J !== null; )
        J.key !== null ? X.set(J.key, J) : X.set(J.index, J), J = J.sibling;
      return X;
    }
    function f(J, X) {
      return J = Ga(J, X), J.index = 0, J.sibling = null, J;
    }
    function h(J, X, ae) {
      return J.index = ae, t ? (ae = J.alternate, ae !== null ? (ae = ae.index, ae < X ? (J.flags |= 67108866, X) : ae) : (J.flags |= 67108866, X)) : (J.flags |= 1048576, X);
    }
    function w(J) {
      return t && J.alternate === null && (J.flags |= 67108866), J;
    }
    function M(J, X, ae, ce) {
      return X === null || X.tag !== 6 ? (X = Pc(ae, J.mode, ce), X.return = J, X) : (X = f(X, ae), X.return = J, X);
    }
    function q(J, X, ae, ce) {
      var Oe = ae.type;
      return Oe === N ? ue(
        J,
        X,
        ae.props.children,
        ce,
        ae.key
      ) : X !== null && (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && rr(Oe) === X.type) ? (X = f(X, ae.props), Xl(X, ae), X.return = J, X) : (X = vs(
        ae.type,
        ae.key,
        ae.props,
        null,
        J.mode,
        ce
      ), Xl(X, ae), X.return = J, X);
    }
    function ie(J, X, ae, ce) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ae.containerInfo || X.stateNode.implementation !== ae.implementation ? (X = Kc(ae, J.mode, ce), X.return = J, X) : (X = f(X, ae.children || []), X.return = J, X);
    }
    function ue(J, X, ae, ce, Oe) {
      return X === null || X.tag !== 7 ? (X = er(
        ae,
        J.mode,
        ce,
        Oe
      ), X.return = J, X) : (X = f(X, ae), X.return = J, X);
    }
    function fe(J, X, ae) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return X = Pc(
          "" + X,
          J.mode,
          ae
        ), X.return = J, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return ae = vs(
              X.type,
              X.key,
              X.props,
              null,
              J.mode,
              ae
            ), Xl(ae, X), ae.return = J, ae;
          case S:
            return X = Kc(
              X,
              J.mode,
              ae
            ), X.return = J, X;
          case A:
            return X = rr(X), fe(J, X, ae);
        }
        if (I(X) || K(X))
          return X = er(
            X,
            J.mode,
            ae,
            null
          ), X.return = J, X;
        if (typeof X.then == "function")
          return fe(J, Ns(X), ae);
        if (X.$$typeof === E)
          return fe(
            J,
            ws(J, X),
            ae
          );
        Cs(J, X);
      }
      return null;
    }
    function re(J, X, ae, ce) {
      var Oe = X !== null ? X.key : null;
      if (typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint")
        return Oe !== null ? null : M(J, X, "" + ae, ce);
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            return ae.key === Oe ? q(J, X, ae, ce) : null;
          case S:
            return ae.key === Oe ? ie(J, X, ae, ce) : null;
          case A:
            return ae = rr(ae), re(J, X, ae, ce);
        }
        if (I(ae) || K(ae))
          return Oe !== null ? null : ue(J, X, ae, ce, null);
        if (typeof ae.then == "function")
          return re(
            J,
            X,
            Ns(ae),
            ce
          );
        if (ae.$$typeof === E)
          return re(
            J,
            X,
            ws(J, ae),
            ce
          );
        Cs(J, ae);
      }
      return null;
    }
    function oe(J, X, ae, ce, Oe) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return J = J.get(ae) || null, M(X, J, "" + ce, Oe);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return J = J.get(
              ce.key === null ? ae : ce.key
            ) || null, q(X, J, ce, Oe);
          case S:
            return J = J.get(
              ce.key === null ? ae : ce.key
            ) || null, ie(X, J, ce, Oe);
          case A:
            return ce = rr(ce), oe(
              J,
              X,
              ae,
              ce,
              Oe
            );
        }
        if (I(ce) || K(ce))
          return J = J.get(ae) || null, ue(X, J, ce, Oe, null);
        if (typeof ce.then == "function")
          return oe(
            J,
            X,
            ae,
            Ns(ce),
            Oe
          );
        if (ce.$$typeof === E)
          return oe(
            J,
            X,
            ae,
            ws(X, ce),
            Oe
          );
        Cs(X, ce);
      }
      return null;
    }
    function _e(J, X, ae, ce) {
      for (var Oe = null, ut = null, Ne = X, Ie = X = 0, tt = null; Ne !== null && Ie < ae.length; Ie++) {
        Ne.index > Ie ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var ct = re(
          J,
          Ne,
          ae[Ie],
          ce
        );
        if (ct === null) {
          Ne === null && (Ne = tt);
          break;
        }
        t && Ne && ct.alternate === null && n(J, Ne), X = h(ct, X, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ne = tt;
      }
      if (Ie === ae.length)
        return i(J, Ne), it && Xa(J, Ie), Oe;
      if (Ne === null) {
        for (; Ie < ae.length; Ie++)
          Ne = fe(J, ae[Ie], ce), Ne !== null && (X = h(
            Ne,
            X,
            Ie
          ), ut === null ? Oe = Ne : ut.sibling = Ne, ut = Ne);
        return it && Xa(J, Ie), Oe;
      }
      for (Ne = o(Ne); Ie < ae.length; Ie++)
        tt = oe(
          Ne,
          J,
          Ie,
          ae[Ie],
          ce
        ), tt !== null && (t && tt.alternate !== null && Ne.delete(
          tt.key === null ? Ie : tt.key
        ), X = h(
          tt,
          X,
          Ie
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return t && Ne.forEach(function(qi) {
        return n(J, qi);
      }), it && Xa(J, Ie), Oe;
    }
    function Le(J, X, ae, ce) {
      if (ae == null) throw Error(l(151));
      for (var Oe = null, ut = null, Ne = X, Ie = X = 0, tt = null, ct = ae.next(); Ne !== null && !ct.done; Ie++, ct = ae.next()) {
        Ne.index > Ie ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var qi = re(J, Ne, ct.value, ce);
        if (qi === null) {
          Ne === null && (Ne = tt);
          break;
        }
        t && Ne && qi.alternate === null && n(J, Ne), X = h(qi, X, Ie), ut === null ? Oe = qi : ut.sibling = qi, ut = qi, Ne = tt;
      }
      if (ct.done)
        return i(J, Ne), it && Xa(J, Ie), Oe;
      if (Ne === null) {
        for (; !ct.done; Ie++, ct = ae.next())
          ct = fe(J, ct.value, ce), ct !== null && (X = h(ct, X, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && Xa(J, Ie), Oe;
      }
      for (Ne = o(Ne); !ct.done; Ie++, ct = ae.next())
        ct = oe(Ne, J, Ie, ct.value, ce), ct !== null && (t && ct.alternate !== null && Ne.delete(ct.key === null ? Ie : ct.key), X = h(ct, X, Ie), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return t && Ne.forEach(function(PE) {
        return n(J, PE);
      }), it && Xa(J, Ie), Oe;
    }
    function Nt(J, X, ae, ce) {
      if (typeof ae == "object" && ae !== null && ae.type === N && ae.key === null && (ae = ae.props.children), typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            e: {
              for (var Oe = ae.key; X !== null; ) {
                if (X.key === Oe) {
                  if (Oe = ae.type, Oe === N) {
                    if (X.tag === 7) {
                      i(
                        J,
                        X.sibling
                      ), ce = f(
                        X,
                        ae.props.children
                      ), ce.return = J, J = ce;
                      break e;
                    }
                  } else if (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && rr(Oe) === X.type) {
                    i(
                      J,
                      X.sibling
                    ), ce = f(X, ae.props), Xl(ce, ae), ce.return = J, J = ce;
                    break e;
                  }
                  i(J, X);
                  break;
                } else n(J, X);
                X = X.sibling;
              }
              ae.type === N ? (ce = er(
                ae.props.children,
                J.mode,
                ce,
                ae.key
              ), ce.return = J, J = ce) : (ce = vs(
                ae.type,
                ae.key,
                ae.props,
                null,
                J.mode,
                ce
              ), Xl(ce, ae), ce.return = J, J = ce);
            }
            return w(J);
          case S:
            e: {
              for (Oe = ae.key; X !== null; ) {
                if (X.key === Oe)
                  if (X.tag === 4 && X.stateNode.containerInfo === ae.containerInfo && X.stateNode.implementation === ae.implementation) {
                    i(
                      J,
                      X.sibling
                    ), ce = f(X, ae.children || []), ce.return = J, J = ce;
                    break e;
                  } else {
                    i(J, X);
                    break;
                  }
                else n(J, X);
                X = X.sibling;
              }
              ce = Kc(ae, J.mode, ce), ce.return = J, J = ce;
            }
            return w(J);
          case A:
            return ae = rr(ae), Nt(
              J,
              X,
              ae,
              ce
            );
        }
        if (I(ae))
          return _e(
            J,
            X,
            ae,
            ce
          );
        if (K(ae)) {
          if (Oe = K(ae), typeof Oe != "function") throw Error(l(150));
          return ae = Oe.call(ae), Le(
            J,
            X,
            ae,
            ce
          );
        }
        if (typeof ae.then == "function")
          return Nt(
            J,
            X,
            Ns(ae),
            ce
          );
        if (ae.$$typeof === E)
          return Nt(
            J,
            X,
            ws(J, ae),
            ce
          );
        Cs(J, ae);
      }
      return typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint" ? (ae = "" + ae, X !== null && X.tag === 6 ? (i(J, X.sibling), ce = f(X, ae), ce.return = J, J = ce) : (i(J, X), ce = Pc(ae, J.mode, ce), ce.return = J, J = ce), w(J)) : i(J, X);
    }
    return function(J, X, ae, ce) {
      try {
        Gl = 0;
        var Oe = Nt(
          J,
          X,
          ae,
          ce
        );
        return Gr = null, Oe;
      } catch (Ne) {
        if (Ne === Ir || Ne === Es) throw Ne;
        var ut = kn(29, Ne, null, J.mode);
        return ut.lanes = ce, ut.return = J, ut;
      } finally {
      }
    };
  }
  var or = Ap(!0), zp = Ap(!1), _i = !1;
  function cf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ff(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ni(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ci(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = ys(t), pp(t, null, i), n;
    }
    return gs(t, o, n, i), ys(t);
  }
  function Fl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Wt(t, i);
    }
  }
  function df(t, n) {
    var i = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var f = null, h = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var w = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = w : h = h.next = w, i = i.next;
        } while (i !== null);
        h === null ? f = h = n : h = h.next = n;
      } else f = h = n;
      i = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: h,
        shared: o.shared,
        callbacks: o.callbacks
      }, t.updateQueue = i;
      return;
    }
    t = i.lastBaseUpdate, t === null ? i.firstBaseUpdate = n : t.next = n, i.lastBaseUpdate = n;
  }
  var hf = !1;
  function Zl() {
    if (hf) {
      var t = Yr;
      if (t !== null) throw t;
    }
  }
  function Ql(t, n, i, o) {
    hf = !1;
    var f = t.updateQueue;
    _i = !1;
    var h = f.firstBaseUpdate, w = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var q = M, ie = q.next;
      q.next = null, w === null ? h = ie : w.next = ie, w = q;
      var ue = t.alternate;
      ue !== null && (ue = ue.updateQueue, M = ue.lastBaseUpdate, M !== w && (M === null ? ue.firstBaseUpdate = ie : M.next = ie, ue.lastBaseUpdate = q));
    }
    if (h !== null) {
      var fe = f.baseState;
      w = 0, ue = ie = q = null, M = h;
      do {
        var re = M.lane & -536870913, oe = re !== M.lane;
        if (oe ? (et & re) === re : (o & re) === re) {
          re !== 0 && re === $r && (hf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = t, Le = M;
            re = n;
            var Nt = i;
            switch (Le.tag) {
              case 1:
                if (_e = Le.payload, typeof _e == "function") {
                  fe = _e.call(Nt, fe, re);
                  break e;
                }
                fe = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = Le.payload, re = typeof _e == "function" ? _e.call(Nt, fe, re) : _e, re == null) break e;
                fe = g({}, fe, re);
                break e;
              case 2:
                _i = !0;
            }
          }
          re = M.callback, re !== null && (t.flags |= 64, oe && (t.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [re] : oe.push(re));
        } else
          oe = {
            lane: re,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, ue === null ? (ie = ue = oe, q = fe) : ue = ue.next = oe, w |= re;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          oe = M, M = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && (q = fe), f.baseState = q, f.firstBaseUpdate = ie, f.lastBaseUpdate = ue, h === null && (f.shared.lanes = 0), Ai |= w, t.lanes = w, t.memoizedState = fe;
    }
  }
  function Op(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function jp(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        Op(i[t], n);
  }
  var Xr = D(null), Rs = D(0);
  function Lp(t, n) {
    t = ai, P(Rs, t), P(Xr, n), ai = t | n.baseLanes;
  }
  function mf() {
    P(Rs, ai), P(Xr, Xr.current);
  }
  function pf() {
    ai = Rs.current, H(Xr), H(Rs);
  }
  var Bn = D(null), ea = null;
  function Ri(t) {
    var n = t.alternate;
    P(qt, qt.current & 1), P(Bn, t), ea === null && (n === null || Xr.current !== null || n.memoizedState !== null) && (ea = t);
  }
  function gf(t) {
    P(qt, qt.current), P(Bn, t), ea === null && (ea = t);
  }
  function Hp(t) {
    t.tag === 22 ? (P(qt, qt.current), P(Bn, t), ea === null && (ea = t)) : Ti();
  }
  function Ti() {
    P(qt, qt.current), P(Bn, Bn.current);
  }
  function Un(t) {
    H(Bn), ea === t && (ea = null), H(qt);
  }
  var qt = D(0);
  function Ts(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Sd(i) || Ed(i)))
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
  var Qa = 0, qe = null, Et = null, Xt = null, Ms = !1, Fr = !1, sr = !1, Ds = 0, Pl = 0, Zr = null, VS = 0;
  function kt() {
    throw Error(l(321));
  }
  function yf(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Hn(t[i], n[i])) return !1;
    return !0;
  }
  function vf(t, n, i, o, f, h) {
    return Qa = h, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, T.H = t === null || t.memoizedState === null ? bg : Of, sr = !1, h = i(o, f), sr = !1, Fr && (h = Bp(
      n,
      i,
      o,
      f
    )), kp(t), h;
  }
  function kp(t) {
    T.H = Wl;
    var n = Et !== null && Et.next !== null;
    if (Qa = 0, Xt = Et = qe = null, Ms = !1, Pl = 0, Zr = null, n) throw Error(l(300));
    t === null || Ft || (t = t.dependencies, t !== null && xs(t) && (Ft = !0));
  }
  function Bp(t, n, i, o) {
    qe = t;
    var f = 0;
    do {
      if (Fr && (Zr = null), Pl = 0, Fr = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Xt = Et = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      T.H = xg, h = n(i, o);
    } while (Fr);
    return h;
  }
  function qS() {
    var t = T.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? Kl(n) : n, t = t.useState()[0], (Et !== null ? Et.memoizedState : null) !== t && (qe.flags |= 1024), n;
  }
  function bf() {
    var t = Ds !== 0;
    return Ds = 0, t;
  }
  function xf(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function wf(t) {
    if (Ms) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Ms = !1;
    }
    Qa = 0, Xt = Et = qe = null, Fr = !1, Pl = Ds = 0, Zr = null;
  }
  function gn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Xt === null ? qe.memoizedState = Xt = t : Xt = Xt.next = t, Xt;
  }
  function $t() {
    if (Et === null) {
      var t = qe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Et.next;
    var n = Xt === null ? qe.memoizedState : Xt.next;
    if (n !== null)
      Xt = n, Et = t;
    else {
      if (t === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      Et = t, t = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Xt === null ? qe.memoizedState = Xt = t : Xt = Xt.next = t;
    }
    return Xt;
  }
  function As() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Kl(t) {
    var n = Pl;
    return Pl += 1, Zr === null && (Zr = []), t = Tp(Zr, t, n), n = qe, (Xt === null ? n.memoizedState : Xt.next) === null && (n = n.alternate, T.H = n === null || n.memoizedState === null ? bg : Of), t;
  }
  function zs(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Kl(t);
      if (t.$$typeof === E) return ln(t);
    }
    throw Error(l(438, String(t)));
  }
  function Sf(t) {
    var n = null, i = qe.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var o = qe.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = As(), qe.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = te;
    return n.index++, i;
  }
  function Pa(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Os(t) {
    var n = $t();
    return Ef(n, Et, t);
  }
  function Ef(t, n, i) {
    var o = t.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = i;
    var f = t.baseQueue, h = o.pending;
    if (h !== null) {
      if (f !== null) {
        var w = f.next;
        f.next = h.next, h.next = w;
      }
      n.baseQueue = f = h, o.pending = null;
    }
    if (h = t.baseState, f === null) t.memoizedState = h;
    else {
      n = f.next;
      var M = w = null, q = null, ie = n, ue = !1;
      do {
        var fe = ie.lane & -536870913;
        if (fe !== ie.lane ? (et & fe) === fe : (Qa & fe) === fe) {
          var re = ie.revertLane;
          if (re === 0)
            q !== null && (q = q.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ie.action,
              hasEagerState: ie.hasEagerState,
              eagerState: ie.eagerState,
              next: null
            }), fe === $r && (ue = !0);
          else if ((Qa & re) === re) {
            ie = ie.next, re === $r && (ue = !0);
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
            }, q === null ? (M = q = fe, w = h) : q = q.next = fe, qe.lanes |= re, Ai |= re;
          fe = ie.action, sr && i(h, fe), h = ie.hasEagerState ? ie.eagerState : i(h, fe);
        } else
          re = {
            lane: fe,
            revertLane: ie.revertLane,
            gesture: ie.gesture,
            action: ie.action,
            hasEagerState: ie.hasEagerState,
            eagerState: ie.eagerState,
            next: null
          }, q === null ? (M = q = re, w = h) : q = q.next = re, qe.lanes |= fe, Ai |= fe;
        ie = ie.next;
      } while (ie !== null && ie !== n);
      if (q === null ? w = h : q.next = M, !Hn(h, t.memoizedState) && (Ft = !0, ue && (i = Yr, i !== null)))
        throw i;
      t.memoizedState = h, t.baseState = w, t.baseQueue = q, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function _f(t) {
    var n = $t(), i = n.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, f = i.pending, h = n.memoizedState;
    if (f !== null) {
      i.pending = null;
      var w = f = f.next;
      do
        h = t(h, w.action), w = w.next;
      while (w !== f);
      Hn(h, n.memoizedState) || (Ft = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), i.lastRenderedState = h;
    }
    return [h, o];
  }
  function Up(t, n, i) {
    var o = qe, f = $t(), h = it;
    if (h) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var w = !Hn(
      (Et || f).memoizedState,
      i
    );
    if (w && (f.memoizedState = i, Ft = !0), f = f.queue, Rf($p.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || w || Xt !== null && Xt.memoizedState.tag & 1) {
      if (o.flags |= 2048, Qr(
        9,
        { destroy: void 0 },
        qp.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (Qa & 127) !== 0 || Vp(o, n, i);
    }
    return i;
  }
  function Vp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = As(), qe.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function qp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, Yp(n) && Ip(t);
  }
  function $p(t, n, i) {
    return i(function() {
      Yp(n) && Ip(t);
    });
  }
  function Yp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Hn(t, i);
    } catch {
      return !0;
    }
  }
  function Ip(t) {
    var n = Wi(t, 2);
    n !== null && Mn(n, t, 2);
  }
  function Nf(t) {
    var n = gn();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), sr) {
        Ot(!0);
        try {
          i();
        } finally {
          Ot(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Pa,
      lastRenderedState: t
    }, n;
  }
  function Gp(t, n, i, o) {
    return t.baseState = i, Ef(
      t,
      Et,
      typeof o == "function" ? o : Pa
    );
  }
  function $S(t, n, i, o, f) {
    if (Hs(t)) throw Error(l(485));
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
        then: function(w) {
          h.listeners.push(w);
        }
      };
      T.T !== null ? i(!0) : h.isTransition = !1, o(h), i = n.pending, i === null ? (h.next = n.pending = h, Xp(n, h)) : (h.next = i.next, n.pending = i.next = h);
    }
  }
  function Xp(t, n) {
    var i = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = T.T, w = {};
      T.T = w;
      try {
        var M = i(f, o), q = T.S;
        q !== null && q(w, M), Fp(t, n, M);
      } catch (ie) {
        Cf(t, n, ie);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), T.T = h;
      }
    } else
      try {
        h = i(f, o), Fp(t, n, h);
      } catch (ie) {
        Cf(t, n, ie);
      }
  }
  function Fp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        Zp(t, n, o);
      },
      function(o) {
        return Cf(t, n, o);
      }
    ) : Zp(t, n, i);
  }
  function Zp(t, n, i) {
    n.status = "fulfilled", n.value = i, Qp(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, Xp(t, i)));
  }
  function Cf(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, Qp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function Qp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Pp(t, n) {
    return n;
  }
  function Kp(t, n) {
    if (it) {
      var i = Rt.formState;
      if (i !== null) {
        e: {
          var o = qe;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, h = Wn; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = ta(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Tt = ta(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            Si(o);
          }
          o = !1;
        }
        o && (n = i[0]);
      }
    }
    return i = gn(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Pp,
      lastRenderedState: n
    }, i.queue = o, i = gg.bind(
      null,
      qe,
      o
    ), o.dispatch = i, o = Nf(!1), h = zf.bind(
      null,
      qe,
      !1,
      o.queue
    ), o = gn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, i = $S.bind(
      null,
      qe,
      f,
      h,
      i
    ), f.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function Jp(t) {
    var n = $t();
    return Wp(n, Et, t);
  }
  function Wp(t, n, i) {
    if (n = Ef(
      t,
      n,
      Pp
    )[0], t = Os(Pa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Kl(n);
      } catch (w) {
        throw w === Ir ? Es : w;
      }
    else o = n;
    n = $t();
    var f = n.queue, h = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, Qr(
      9,
      { destroy: void 0 },
      YS.bind(null, f, i),
      null
    )), [o, h, t];
  }
  function YS(t, n) {
    t.action = n;
  }
  function eg(t) {
    var n = $t(), i = Et;
    if (i !== null)
      return Wp(n, i, t);
    $t(), n = n.memoizedState, i = $t();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Qr(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = As(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function tg() {
    return $t().memoizedState;
  }
  function js(t, n, i, o) {
    var f = gn();
    qe.flags |= t, f.memoizedState = Qr(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Ls(t, n, i, o) {
    var f = $t();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    Et !== null && o !== null && yf(o, Et.memoizedState.deps) ? f.memoizedState = Qr(n, h, i, o) : (qe.flags |= t, f.memoizedState = Qr(
      1 | n,
      h,
      i,
      o
    ));
  }
  function ng(t, n) {
    js(8390656, 8, t, n);
  }
  function Rf(t, n) {
    Ls(2048, 8, t, n);
  }
  function IS(t) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = As(), qe.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function ag(t) {
    var n = $t().memoizedState;
    return IS({ ref: n, nextImpl: t }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function ig(t, n) {
    return Ls(4, 2, t, n);
  }
  function rg(t, n) {
    return Ls(4, 4, t, n);
  }
  function lg(t, n) {
    if (typeof n == "function") {
      t = t();
      var i = n(t);
      return function() {
        typeof i == "function" ? i() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function og(t, n, i) {
    i = i != null ? i.concat([t]) : null, Ls(4, 4, lg.bind(null, n, t), i);
  }
  function Tf() {
  }
  function sg(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && yf(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function ug(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && yf(n, o[1]))
      return o[0];
    if (o = t(), sr) {
      Ot(!0);
      try {
        t();
      } finally {
        Ot(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function Mf(t, n, i) {
    return i === void 0 || (Qa & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = c0(), qe.lanes |= t, Ai |= t, i);
  }
  function cg(t, n, i, o) {
    return Hn(i, n) ? i : Xr.current !== null ? (t = Mf(t, i, o), Hn(t, n) || (Ft = !0), t) : (Qa & 42) === 0 || (Qa & 1073741824) !== 0 && (et & 261930) === 0 ? (Ft = !0, t.memoizedState = i) : (t = c0(), qe.lanes |= t, Ai |= t, n);
  }
  function fg(t, n, i, o, f) {
    var h = L.p;
    L.p = h !== 0 && 8 > h ? h : 8;
    var w = T.T, M = {};
    T.T = M, zf(t, !1, n, i);
    try {
      var q = f(), ie = T.S;
      if (ie !== null && ie(M, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var ue = US(
          q,
          o
        );
        Jl(
          t,
          n,
          ue,
          $n(t)
        );
      } else
        Jl(
          t,
          n,
          o,
          $n(t)
        );
    } catch (fe) {
      Jl(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        $n()
      );
    } finally {
      L.p = h, w !== null && M.types !== null && (w.types = M.types), T.T = w;
    }
  }
  function GS() {
  }
  function Df(t, n, i, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = dg(t).queue;
    fg(
      t,
      f,
      n,
      F,
      i === null ? GS : function() {
        return hg(t), i(o);
      }
    );
  }
  function dg(t) {
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
        lastRenderedReducer: Pa,
        lastRenderedState: F
      },
      next: null
    };
    var i = {};
    return n.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pa,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function hg(t) {
    var n = dg(t);
    n.next === null && (n = t.alternate.memoizedState), Jl(
      t,
      n.next.queue,
      {},
      $n()
    );
  }
  function Af() {
    return ln(go);
  }
  function mg() {
    return $t().memoizedState;
  }
  function pg() {
    return $t().memoizedState;
  }
  function XS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = $n();
          t = Ni(i);
          var o = Ci(n, t, i);
          o !== null && (Mn(o, n, i), Fl(o, n, i)), n = { cache: lf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function FS(t, n, i) {
    var o = $n();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hs(t) ? yg(n, i) : (i = Zc(t, n, i, o), i !== null && (Mn(i, t, o), vg(i, n, o)));
  }
  function gg(t, n, i) {
    var o = $n();
    Jl(t, n, i, o);
  }
  function Jl(t, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hs(t)) yg(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, M = h(w, i);
          if (f.hasEagerState = !0, f.eagerState = M, Hn(M, w))
            return gs(t, n, f, 0), Rt === null && ps(), !1;
        } catch {
        } finally {
        }
      if (i = Zc(t, n, f, o), i !== null)
        return Mn(i, t, o), vg(i, n, o), !0;
    }
    return !1;
  }
  function zf(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: cd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hs(t)) {
      if (n) throw Error(l(479));
    } else
      n = Zc(
        t,
        i,
        o,
        2
      ), n !== null && Mn(n, t, 2);
  }
  function Hs(t) {
    var n = t.alternate;
    return t === qe || n !== null && n === qe;
  }
  function yg(t, n) {
    Fr = Ms = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function vg(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Wt(t, i);
    }
  }
  var Wl = {
    readContext: ln,
    use: zs,
    useCallback: kt,
    useContext: kt,
    useEffect: kt,
    useImperativeHandle: kt,
    useLayoutEffect: kt,
    useInsertionEffect: kt,
    useMemo: kt,
    useReducer: kt,
    useRef: kt,
    useState: kt,
    useDebugValue: kt,
    useDeferredValue: kt,
    useTransition: kt,
    useSyncExternalStore: kt,
    useId: kt,
    useHostTransitionStatus: kt,
    useFormState: kt,
    useActionState: kt,
    useOptimistic: kt,
    useMemoCache: kt,
    useCacheRefresh: kt
  };
  Wl.useEffectEvent = kt;
  var bg = {
    readContext: ln,
    use: zs,
    useCallback: function(t, n) {
      return gn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: ln,
    useEffect: ng,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, js(
        4194308,
        4,
        lg.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return js(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      js(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = gn();
      n = n === void 0 ? null : n;
      var o = t();
      if (sr) {
        Ot(!0);
        try {
          t();
        } finally {
          Ot(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, i) {
      var o = gn();
      if (i !== void 0) {
        var f = i(n);
        if (sr) {
          Ot(!0);
          try {
            i(n);
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
      }, o.queue = t, t = t.dispatch = FS.bind(
        null,
        qe,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = gn();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Nf(t);
      var n = t.queue, i = gg.bind(null, qe, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Tf,
    useDeferredValue: function(t, n) {
      var i = gn();
      return Mf(i, t, n);
    },
    useTransition: function() {
      var t = Nf(!1);
      return t = fg.bind(
        null,
        qe,
        t.queue,
        !0,
        !1
      ), gn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = qe, f = gn();
      if (it) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = n(), Rt === null)
          throw Error(l(349));
        (et & 127) !== 0 || Vp(o, n, i);
      }
      f.memoizedState = i;
      var h = { value: i, getSnapshot: n };
      return f.queue = h, ng($p.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, Qr(
        9,
        { destroy: void 0 },
        qp.bind(
          null,
          o,
          h,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var t = gn(), n = Rt.identifierPrefix;
      if (it) {
        var i = Ra, o = Ca;
        i = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Ds++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = VS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Af,
    useFormState: Kp,
    useActionState: Kp,
    useOptimistic: function(t) {
      var n = gn();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = zf.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Sf,
    useCacheRefresh: function() {
      return gn().memoizedState = XS.bind(
        null,
        qe
      );
    },
    useEffectEvent: function(t) {
      var n = gn(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((ht & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Of = {
    readContext: ln,
    use: zs,
    useCallback: sg,
    useContext: ln,
    useEffect: Rf,
    useImperativeHandle: og,
    useInsertionEffect: ig,
    useLayoutEffect: rg,
    useMemo: ug,
    useReducer: Os,
    useRef: tg,
    useState: function() {
      return Os(Pa);
    },
    useDebugValue: Tf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return cg(
        i,
        Et.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Os(Pa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : Kl(t),
        n
      ];
    },
    useSyncExternalStore: Up,
    useId: mg,
    useHostTransitionStatus: Af,
    useFormState: Jp,
    useActionState: Jp,
    useOptimistic: function(t, n) {
      var i = $t();
      return Gp(i, Et, t, n);
    },
    useMemoCache: Sf,
    useCacheRefresh: pg
  };
  Of.useEffectEvent = ag;
  var xg = {
    readContext: ln,
    use: zs,
    useCallback: sg,
    useContext: ln,
    useEffect: Rf,
    useImperativeHandle: og,
    useInsertionEffect: ig,
    useLayoutEffect: rg,
    useMemo: ug,
    useReducer: _f,
    useRef: tg,
    useState: function() {
      return _f(Pa);
    },
    useDebugValue: Tf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return Et === null ? Mf(i, t, n) : cg(
        i,
        Et.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = _f(Pa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : Kl(t),
        n
      ];
    },
    useSyncExternalStore: Up,
    useId: mg,
    useHostTransitionStatus: Af,
    useFormState: eg,
    useActionState: eg,
    useOptimistic: function(t, n) {
      var i = $t();
      return Et !== null ? Gp(i, Et, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Sf,
    useCacheRefresh: pg
  };
  xg.useEffectEvent = ag;
  function jf(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : g({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var Lf = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = $n(), f = Ni(o);
      f.payload = n, i != null && (f.callback = i), n = Ci(t, f, o), n !== null && (Mn(n, t, o), Fl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = $n(), f = Ni(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Ci(t, f, o), n !== null && (Mn(n, t, o), Fl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = $n(), o = Ni(i);
      o.tag = 2, n != null && (o.callback = n), n = Ci(t, o, i), n !== null && (Mn(n, t, i), Fl(n, t, i));
    }
  };
  function wg(t, n, i, o, f, h, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, w) : n.prototype && n.prototype.isPureReactComponent ? !Ul(i, o) || !Ul(f, h) : !0;
  }
  function Sg(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && Lf.enqueueReplaceState(n, n.state, null);
  }
  function ur(t, n) {
    var i = n;
    if ("ref" in n) {
      i = {};
      for (var o in n)
        o !== "ref" && (i[o] = n[o]);
    }
    if (t = t.defaultProps) {
      i === n && (i = g({}, i));
      for (var f in t)
        i[f] === void 0 && (i[f] = t[f]);
    }
    return i;
  }
  function Eg(t) {
    ms(t);
  }
  function _g(t) {
    console.error(t);
  }
  function Ng(t) {
    ms(t);
  }
  function ks(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Cg(t, n, i) {
    try {
      var o = t.onCaughtError;
      o(i.value, {
        componentStack: i.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function Hf(t, n, i) {
    return i = Ni(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      ks(t, n);
    }, i;
  }
  function Rg(t) {
    return t = Ni(t), t.tag = 3, t;
  }
  function Tg(t, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        Cg(n, i, o);
      };
    }
    var w = i.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      Cg(n, i, o), typeof f != "function" && (zi === null ? zi = /* @__PURE__ */ new Set([this]) : zi.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function ZS(t, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && qr(
        n,
        i,
        f,
        !0
      ), i = Bn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return ea === null ? Qs() : i.alternate === null && Bt === 0 && (Bt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === _s ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), od(t, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === _s ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), od(t, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return od(t, o, f), Qs(), !1;
    }
    if (it)
      return n = Bn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== ef && (t = Error(l(422), { cause: o }), $l(Pn(t, i)))) : (o !== ef && (n = Error(l(423), {
        cause: o
      }), $l(
        Pn(n, i)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Pn(o, i), f = Hf(
        t.stateNode,
        o,
        f
      ), df(t, f), Bt !== 4 && (Bt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Pn(h, i), oo === null ? oo = [h] : oo.push(h), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Pn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = f & -f, i.lanes |= t, t = Hf(i.stateNode, o, t), df(i, t), !1;
        case 1:
          if (n = i.type, h = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (zi === null || !zi.has(h))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = Rg(f), Tg(
              f,
              t,
              i,
              o
            ), df(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var kf = Error(l(461)), Ft = !1;
  function on(t, n, i, o) {
    n.child = t === null ? zp(n, null, i, o) : or(
      n,
      t.child,
      i,
      o
    );
  }
  function Mg(t, n, i, o, f) {
    i = i.render;
    var h = n.ref;
    if ("ref" in o) {
      var w = {};
      for (var M in o)
        M !== "ref" && (w[M] = o[M]);
    } else w = o;
    return ar(n), o = vf(
      t,
      n,
      i,
      w,
      h,
      f
    ), M = bf(), t !== null && !Ft ? (xf(t, n, f), Ka(t, n, f)) : (it && M && Jc(n), n.flags |= 1, on(t, n, o, f), n.child);
  }
  function Dg(t, n, i, o, f) {
    if (t === null) {
      var h = i.type;
      return typeof h == "function" && !Qc(h) && h.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = h, Ag(
        t,
        n,
        h,
        o,
        f
      )) : (t = vs(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !Gf(t, f)) {
      var w = h.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Ul, i(w, o) && t.ref === n.ref)
        return Ka(t, n, f);
    }
    return n.flags |= 1, t = Ga(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function Ag(t, n, i, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Ul(h, o) && t.ref === n.ref)
        if (Ft = !1, n.pendingProps = o = h, Gf(t, f))
          (t.flags & 131072) !== 0 && (Ft = !0);
        else
          return n.lanes = t.lanes, Ka(t, n, f);
    }
    return Bf(
      t,
      n,
      i,
      o,
      f
    );
  }
  function zg(t, n, i, o) {
    var f = o.children, h = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | i : i, t !== null) {
          for (o = n.child = t.child, f = 0; o !== null; )
            f = f | o.lanes | o.childLanes, o = o.sibling;
          o = f & ~h;
        } else o = 0, n.child = null;
        return Og(
          t,
          n,
          h,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ss(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Lp(n, h) : mf(), Hp(n);
      else
        return o = n.lanes = 536870912, Og(
          t,
          n,
          h !== null ? h.baseLanes | i : i,
          i,
          o
        );
    } else
      h !== null ? (Ss(n, h.cachePool), Lp(n, h), Ti(), n.memoizedState = null) : (t !== null && Ss(n, null), mf(), Ti());
    return on(t, n, f, i), n.child;
  }
  function eo(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Og(t, n, i, o, f) {
    var h = sf();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: i,
      cachePool: h
    }, t !== null && Ss(n, null), mf(), Hp(n), t !== null && qr(t, n, o, !0), n.childLanes = f, null;
  }
  function Bs(t, n) {
    return n = Vs(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function jg(t, n, i) {
    return or(n, t.child, null, i), t = Bs(n, n.pendingProps), t.flags |= 2, Un(n), n.memoizedState = null, t;
  }
  function QS(t, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = Bs(n, o), n.lanes = 536870912, eo(null, t);
        if (gf(n), (t = Tt) ? (t = X0(
          t,
          Wn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: xi !== null ? { id: Ca, overflow: Ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = yp(t), i.return = n, n.child = i, rn = n, Tt = null)) : t = null, t === null) throw Si(n);
        return n.lanes = 536870912, null;
      }
      return Bs(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if (gf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = jg(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ft || qr(t, n, i, !1), f = (i & t.childLanes) !== 0, Ft || f) {
        if (o = Rt, o !== null && (w = U(o, i), w !== 0 && w !== h.retryLane))
          throw h.retryLane = w, Wi(t, w), Mn(o, t, w), kf;
        Qs(), n = jg(
          t,
          n,
          i
        );
      } else
        t = h.treeContext, Tt = ta(w.nextSibling), rn = n, it = !0, wi = null, Wn = !1, t !== null && xp(n, t), n = Bs(n, o), n.flags |= 4096;
      return n;
    }
    return t = Ga(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Us(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Bf(t, n, i, o, f) {
    return ar(n), i = vf(
      t,
      n,
      i,
      o,
      void 0,
      f
    ), o = bf(), t !== null && !Ft ? (xf(t, n, f), Ka(t, n, f)) : (it && o && Jc(n), n.flags |= 1, on(t, n, i, f), n.child);
  }
  function Lg(t, n, i, o, f, h) {
    return ar(n), n.updateQueue = null, i = Bp(
      n,
      o,
      i,
      f
    ), kp(t), o = bf(), t !== null && !Ft ? (xf(t, n, h), Ka(t, n, h)) : (it && o && Jc(n), n.flags |= 1, on(t, n, i, h), n.child);
  }
  function Hg(t, n, i, o, f) {
    if (ar(n), n.stateNode === null) {
      var h = kr, w = i.contextType;
      typeof w == "object" && w !== null && (h = ln(w)), h = new i(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = Lf, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, cf(n), w = i.contextType, h.context = typeof w == "object" && w !== null ? ln(w) : kr, h.state = n.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (jf(
        n,
        i,
        w,
        o
      ), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && Lf.enqueueReplaceState(h, h.state, null), Ql(n, o, h, f), Zl(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var M = n.memoizedProps, q = ur(i, M);
      h.props = q;
      var ie = h.context, ue = i.contextType;
      w = kr, typeof ue == "object" && ue !== null && (w = ln(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof h.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (M || ie !== w) && Sg(
        n,
        h,
        o,
        w
      ), _i = !1;
      var re = n.memoizedState;
      h.state = re, Ql(n, o, h, f), Zl(), ie = n.memoizedState, M || re !== ie || _i ? (typeof fe == "function" && (jf(
        n,
        i,
        fe,
        o
      ), ie = n.memoizedState), (q = _i || wg(
        n,
        i,
        q,
        o,
        re,
        ie,
        w
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ie), h.props = o, h.state = ie, h.context = w, o = q) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, ff(t, n), w = n.memoizedProps, ue = ur(i, w), h.props = ue, fe = n.pendingProps, re = h.context, ie = i.contextType, q = kr, typeof ie == "object" && ie !== null && (q = ln(ie)), M = i.getDerivedStateFromProps, (ie = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== fe || re !== q) && Sg(
        n,
        h,
        o,
        q
      ), _i = !1, re = n.memoizedState, h.state = re, Ql(n, o, h, f), Zl();
      var oe = n.memoizedState;
      w !== fe || re !== oe || _i || t !== null && t.dependencies !== null && xs(t.dependencies) ? (typeof M == "function" && (jf(
        n,
        i,
        M,
        o
      ), oe = n.memoizedState), (ue = _i || wg(
        n,
        i,
        ue,
        o,
        re,
        oe,
        q
      ) || t !== null && t.dependencies !== null && xs(t.dependencies)) ? (ie || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, oe, q), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        oe,
        q
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), h.props = o, h.state = oe, h.context = q, o = ue) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, Us(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = or(
      n,
      t.child,
      null,
      f
    ), n.child = or(
      n,
      null,
      i,
      f
    )) : on(t, n, i, f), n.memoizedState = h.state, t = n.child) : t = Ka(
      t,
      n,
      f
    ), t;
  }
  function kg(t, n, i, o) {
    return tr(), n.flags |= 256, on(t, n, i, o), n.child;
  }
  var Uf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Vf(t) {
    return { baseLanes: t, cachePool: Cp() };
  }
  function qf(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= qn), t;
  }
  function Bg(t, n, i) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = t !== null && t.memoizedState === null ? !1 : (qt.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Ri(n) : Ti(), (t = Tt) ? (t = X0(
          t,
          Wn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: xi !== null ? { id: Ca, overflow: Ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = yp(t), i.return = n, n.child = i, rn = n, Tt = null)) : t = null, t === null) throw Si(n);
        return Ed(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (Ti(), f = n.mode, M = Vs(
        { mode: "hidden", children: M },
        f
      ), o = er(
        o,
        f,
        i,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = Vf(i), o.childLanes = qf(
        t,
        w,
        i
      ), n.memoizedState = Uf, eo(null, o)) : (Ri(n), $f(n, M));
    }
    var q = t.memoizedState;
    if (q !== null && (M = q.dehydrated, M !== null)) {
      if (h)
        n.flags & 256 ? (Ri(n), n.flags &= -257, n = Yf(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (Ti(), n.child = t.child, n.flags |= 128, n = null) : (Ti(), M = o.fallback, f = n.mode, o = Vs(
          { mode: "visible", children: o.children },
          f
        ), M = er(
          M,
          f,
          i,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, or(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = Vf(i), o.childLanes = qf(
          t,
          w,
          i
        ), n.memoizedState = Uf, n = eo(null, o));
      else if (Ri(n), Ed(M)) {
        if (w = M.nextSibling && M.nextSibling.dataset, w) var ie = w.dgst;
        w = ie, o = Error(l(419)), o.stack = "", o.digest = w, $l({ value: o, source: null, stack: null }), n = Yf(
          t,
          n,
          i
        );
      } else if (Ft || qr(t, n, i, !1), w = (i & t.childLanes) !== 0, Ft || w) {
        if (w = Rt, w !== null && (o = U(w, i), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, Wi(t, o), Mn(w, t, o), kf;
        Sd(M) || Qs(), n = Yf(
          t,
          n,
          i
        );
      } else
        Sd(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = q.treeContext, Tt = ta(
          M.nextSibling
        ), rn = n, it = !0, wi = null, Wn = !1, t !== null && xp(n, t), n = $f(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Ti(), M = o.fallback, f = n.mode, q = t.child, ie = q.sibling, o = Ga(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, ie !== null ? M = Ga(
      ie,
      M
    ) : (M = er(
      M,
      f,
      i,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, eo(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = Vf(i) : (f = M.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = Cp(), M = {
      baseLanes: M.baseLanes | i,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = qf(
      t,
      w,
      i
    ), n.memoizedState = Uf, eo(t.child, o)) : (Ri(n), i = t.child, t = i.sibling, i = Ga(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function $f(t, n) {
    return n = Vs(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Vs(t, n) {
    return t = kn(22, t, null, n), t.lanes = 0, t;
  }
  function Yf(t, n, i) {
    return or(n, t.child, null, i), t = $f(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function Ug(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), af(t.return, n, i);
  }
  function If(t, n, i, o, f, h) {
    var w = t.memoizedState;
    w === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: f,
      treeForkCount: h
    } : (w.isBackwards = n, w.rendering = null, w.renderingStartTime = 0, w.last = o, w.tail = i, w.tailMode = f, w.treeForkCount = h);
  }
  function Vg(t, n, i) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var w = qt.current, M = (w & 2) !== 0;
    if (M ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, P(qt, w), on(t, n, o, i), o = it ? ql : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Ug(t, i, n);
        else if (t.tag === 19)
          Ug(t, i, n);
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
        for (i = n.child, f = null; i !== null; )
          t = i.alternate, t !== null && Ts(t) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), If(
          n,
          !1,
          f,
          i,
          h,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, f = n.child, n.child = null; f !== null; ) {
          if (t = f.alternate, t !== null && Ts(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = i, i = f, f = t;
        }
        If(
          n,
          !0,
          i,
          null,
          h,
          o
        );
        break;
      case "together":
        If(
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
  function Ka(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), Ai |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (qr(
          t,
          n,
          i,
          !1
        ), (i & n.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && n.child !== t.child)
      throw Error(l(153));
    if (n.child !== null) {
      for (t = n.child, i = Ga(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Ga(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Gf(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && xs(t)));
  }
  function PS(t, n, i) {
    switch (n.tag) {
      case 3:
        ee(n, n.stateNode.containerInfo), Ei(n, Gt, t.memoizedState.cache), tr();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        ee(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ei(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, gf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Ri(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? Bg(t, n, i) : (Ri(n), t = Ka(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        Ri(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (qr(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return Vg(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), P(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, zg(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ei(n, Gt, t.memoizedState.cache);
    }
    return Ka(t, n, i);
  }
  function qg(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Ft = !0;
      else {
        if (!Gf(t, i) && (n.flags & 128) === 0)
          return Ft = !1, PS(
            t,
            n,
            i
          );
        Ft = (t.flags & 131072) !== 0;
      }
    else
      Ft = !1, it && (n.flags & 1048576) !== 0 && bp(n, ql, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = rr(n.elementType), n.type = t, typeof t == "function")
            Qc(t) ? (o = ur(t, o), n.tag = 1, n = Hg(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = Bf(
              null,
              n,
              t,
              o,
              i
            ));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === O) {
                n.tag = 11, n = Mg(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = Dg(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              }
            }
            throw n = j(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return Bf(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, f = ur(
          o,
          n.pendingProps
        ), Hg(
          t,
          n,
          o,
          f,
          i
        );
      case 3:
        e: {
          if (ee(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, ff(t, n), Ql(n, o, null, i);
          var w = n.memoizedState;
          if (o = w.cache, Ei(n, Gt, o), o !== h.cache && rf(
            n,
            [Gt],
            i,
            !0
          ), Zl(), o = w.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = kg(
                t,
                n,
                o,
                i
              );
              break e;
            } else if (o !== f) {
              f = Pn(
                Error(l(424)),
                n
              ), $l(f), n = kg(
                t,
                n,
                o,
                i
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
              for (Tt = ta(t.firstChild), rn = n, it = !0, wi = null, Wn = !0, i = zp(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (tr(), o === f) {
              n = Ka(
                t,
                n,
                i
              );
              break e;
            }
            on(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Us(t, n), t === null ? (i = J0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, t = n.pendingProps, o = nu(
          he.current
        ).createElement(i), o[ve] = n, o[we] = t, sn(o, i, t), at(o), n.stateNode = o) : n.memoizedState = J0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ze(n), t === null && it && (o = n.stateNode = Q0(
          n.type,
          n.pendingProps,
          he.current
        ), rn = n, Wn = !0, f = Tt, Hi(n.type) ? (_d = f, Tt = ta(o.firstChild)) : Tt = f), on(
          t,
          n,
          n.pendingProps.children,
          i
        ), Us(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Tt) && (o = CE(
          o,
          n.type,
          n.pendingProps,
          Wn
        ), o !== null ? (n.stateNode = o, rn = n, Tt = ta(o.firstChild), Wn = !1, f = !0) : f = !1), f || Si(n)), ze(n), f = n.type, h = n.pendingProps, w = t !== null ? t.memoizedProps : null, o = h.children, bd(f, h) ? o = null : w !== null && bd(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = vf(
          t,
          n,
          qS,
          null,
          null,
          i
        ), go._currentValue = f), Us(t, n), on(t, n, o, i), n.child;
      case 6:
        return t === null && it && ((t = i = Tt) && (i = RE(
          i,
          n.pendingProps,
          Wn
        ), i !== null ? (n.stateNode = i, rn = n, Tt = null, t = !0) : t = !1), t || Si(n)), null;
      case 13:
        return Bg(t, n, i);
      case 4:
        return ee(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = or(
          n,
          null,
          o,
          i
        ) : on(t, n, o, i), n.child;
      case 11:
        return Mg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return on(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return on(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return on(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, Ei(n, n.type, o.value), on(t, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, ar(n), f = ln(f), o = o(f), n.flags |= 1, on(t, n, o, i), n.child;
      case 14:
        return Dg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Ag(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return Vg(t, n, i);
      case 31:
        return QS(t, n, i);
      case 22:
        return zg(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return ar(n), o = ln(Gt), t === null ? (f = sf(), f === null && (f = Rt, h = lf(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= i), f = h), n.memoizedState = { parent: o, cache: f }, cf(n), Ei(n, Gt, f)) : ((t.lanes & i) !== 0 && (ff(t, n), Ql(n, null, null, i), Zl()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ei(n, Gt, o)) : (o = h.cache, Ei(n, Gt, o), o !== f.cache && rf(
          n,
          [Gt],
          i,
          !0
        ))), on(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function Ja(t) {
    t.flags |= 4;
  }
  function Xf(t, n, i, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (m0()) t.flags |= 8192;
        else
          throw lr = _s, uf;
    } else t.flags &= -16777217;
  }
  function $g(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !ay(n))
      if (m0()) t.flags |= 8192;
      else
        throw lr = _s, uf;
  }
  function qs(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, Wr |= n);
  }
  function to(t, n) {
    if (!it)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? t.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = t.tail;
          for (var o = null; i !== null; )
            i.alternate !== null && (o = i), i = i.sibling;
          o === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : o.sibling = null;
      }
  }
  function Mt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, i = 0, o = 0;
    if (n)
      for (var f = t.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags & 65011712, o |= f.flags & 65011712, f.return = t, f = f.sibling;
    else
      for (f = t.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags, o |= f.flags, f.return = t, f = f.sibling;
    return t.subtreeFlags |= o, t.childLanes = i, n;
  }
  function KS(t, n, i) {
    var o = n.pendingProps;
    switch (Wc(n), n.tag) {
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
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Za(Gt), ge(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Vr(n) ? Ja(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, tf())), Mt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (Ja(n), h !== null ? (Mt(n), $g(n, h)) : (Mt(n), Xf(
          n,
          f,
          null,
          o,
          i
        ))) : h ? h !== t.memoizedState ? (Ja(n), Mt(n), $g(n, h)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Ja(n), Mt(n), Xf(
          n,
          f,
          t,
          o,
          i
        )), null;
      case 27:
        if (Re(n), i = he.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Ja(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = ne.current, Vr(n) ? wp(n) : (t = Q0(f, o, i), n.stateNode = t, Ja(n));
        }
        return Mt(n), null;
      case 5:
        if (Re(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Ja(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (h = ne.current, Vr(n))
            wp(n);
          else {
            var w = nu(
              he.current
            );
            switch (h) {
              case 1:
                h = w.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = w.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = w.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = w.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = w.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof o.is == "string" ? w.createElement("select", {
                      is: o.is
                    }) : w.createElement("select"), o.multiple ? h.multiple = !0 : o.size && (h.size = o.size);
                    break;
                  default:
                    h = typeof o.is == "string" ? w.createElement(f, { is: o.is }) : w.createElement(f);
                }
            }
            h[ve] = n, h[we] = o;
            e: for (w = n.child; w !== null; ) {
              if (w.tag === 5 || w.tag === 6)
                h.appendChild(w.stateNode);
              else if (w.tag !== 4 && w.tag !== 27 && w.child !== null) {
                w.child.return = w, w = w.child;
                continue;
              }
              if (w === n) break e;
              for (; w.sibling === null; ) {
                if (w.return === null || w.return === n)
                  break e;
                w = w.return;
              }
              w.sibling.return = w.return, w = w.sibling;
            }
            n.stateNode = h;
            e: switch (sn(h, f, o), f) {
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
            o && Ja(n);
          }
        }
        return Mt(n), Xf(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Ja(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = he.current, Vr(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, f = rn, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[ve] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || B0(t.nodeValue, i)), t || Si(n, !0);
          } else
            t = nu(t).createTextNode(
              o
            ), t[ve] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Vr(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[ve] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            i = tf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Vr(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ve] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = tf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
        }
        return Un(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), qs(n, n.updateQueue), Mt(n), null);
      case 4:
        return ge(), t === null && md(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Za(n.type), Mt(n), null;
      case 19:
        if (H(qt), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) to(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = Ts(t), h !== null) {
                  for (n.flags |= 128, to(o, !1), t = h.updateQueue, n.updateQueue = t, qs(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    gp(i, t), i = i.sibling;
                  return P(
                    qt,
                    qt.current & 1 | 2
                  ), it && Xa(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Qe() > Xs && (n.flags |= 128, f = !0, to(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = Ts(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, qs(n, t), to(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !it)
                return Mt(n), null;
            } else
              2 * Qe() - o.renderingStartTime > Xs && i !== 536870912 && (n.flags |= 128, f = !0, to(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Qe(), t.sibling = null, i = qt.current, P(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && Xa(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return Un(n), pf(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && qs(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && H(ir), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Za(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function JS(t, n) {
    switch (Wc(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Za(Gt), ge(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Re(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Un(n), n.alternate === null)
            throw Error(l(340));
          tr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (Un(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          tr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return H(qt), null;
      case 4:
        return ge(), null;
      case 10:
        return Za(n.type), null;
      case 22:
      case 23:
        return Un(n), pf(), t !== null && H(ir), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Za(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Yg(t, n) {
    switch (Wc(n), n.tag) {
      case 3:
        Za(Gt), ge();
        break;
      case 26:
      case 27:
      case 5:
        Re(n);
        break;
      case 4:
        ge();
        break;
      case 31:
        n.memoizedState !== null && Un(n);
        break;
      case 13:
        Un(n);
        break;
      case 19:
        H(qt);
        break;
      case 10:
        Za(n.type);
        break;
      case 22:
      case 23:
        Un(n), pf(), t !== null && H(ir);
        break;
      case 24:
        Za(Gt);
    }
  }
  function no(t, n) {
    try {
      var i = n.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        i = f;
        do {
          if ((i.tag & t) === t) {
            o = void 0;
            var h = i.create, w = i.inst;
            o = h(), w.destroy = o;
          }
          i = i.next;
        } while (i !== f);
      }
    } catch (M) {
      wt(n, n.return, M);
    }
  }
  function Mi(t, n, i) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        o = h;
        do {
          if ((o.tag & t) === t) {
            var w = o.inst, M = w.destroy;
            if (M !== void 0) {
              w.destroy = void 0, f = n;
              var q = i, ie = M;
              try {
                ie();
              } catch (ue) {
                wt(
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
      wt(n, n.return, ue);
    }
  }
  function Ig(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        jp(n, i);
      } catch (o) {
        wt(t, t.return, o);
      }
    }
  }
  function Gg(t, n, i) {
    i.props = ur(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      wt(t, n, o);
    }
  }
  function ao(t, n) {
    try {
      var i = t.ref;
      if (i !== null) {
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
        typeof i == "function" ? t.refCleanup = i(o) : i.current = o;
      }
    } catch (f) {
      wt(t, n, f);
    }
  }
  function Ta(t, n) {
    var i = t.ref, o = t.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          wt(t, n, f);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (f) {
          wt(t, n, f);
        }
      else i.current = null;
  }
  function Xg(t) {
    var n = t.type, i = t.memoizedProps, o = t.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && o.focus();
          break e;
        case "img":
          i.src ? o.src = i.src : i.srcSet && (o.srcset = i.srcSet);
      }
    } catch (f) {
      wt(t, t.return, f);
    }
  }
  function Ff(t, n, i) {
    try {
      var o = t.stateNode;
      xE(o, t.type, i, n), o[we] = n;
    } catch (f) {
      wt(t, t.return, f);
    }
  }
  function Fg(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Hi(t.type) || t.tag === 4;
  }
  function Zf(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Fg(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Hi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Qf(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Ya));
    else if (o !== 4 && (o === 27 && Hi(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (Qf(t, n, i), t = t.sibling; t !== null; )
        Qf(t, n, i), t = t.sibling;
  }
  function $s(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && Hi(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for ($s(t, n, i), t = t.sibling; t !== null; )
        $s(t, n, i), t = t.sibling;
  }
  function Zg(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      sn(n, o, i), n[ve] = t, n[we] = i;
    } catch (h) {
      wt(t, t.return, h);
    }
  }
  var Wa = !1, Zt = !1, Pf = !1, Qg = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function WS(t, n) {
    if (t = t.containerInfo, yd = uu, t = op(t), $c(t)) {
      if ("selectionStart" in t)
        var i = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        e: {
          i = (i = t.ownerDocument) && i.defaultView || window;
          var o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            var f = o.anchorOffset, h = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, h.nodeType;
            } catch {
              i = null;
              break e;
            }
            var w = 0, M = -1, q = -1, ie = 0, ue = 0, fe = t, re = null;
            t: for (; ; ) {
              for (var oe; fe !== i || f !== 0 && fe.nodeType !== 3 || (M = w + f), fe !== h || o !== 0 && fe.nodeType !== 3 || (q = w + o), fe.nodeType === 3 && (w += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                re = fe, fe = oe;
              for (; ; ) {
                if (fe === t) break t;
                if (re === i && ++ie === f && (M = w), re === h && ++ue === o && (q = w), (oe = fe.nextSibling) !== null) break;
                fe = re, re = fe.parentNode;
              }
              fe = oe;
            }
            i = M === -1 || q === -1 ? null : { start: M, end: q };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (vd = { focusedElem: t, selectionRange: i }, uu = !1, en = n; en !== null; )
      if (n = en, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, en = t;
      else
        for (; en !== null; ) {
          switch (n = en, h = n.alternate, t = n.flags, n.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = n.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (i = 0; i < t.length; i++)
                  f = t[i], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && h !== null) {
                t = void 0, i = n, f = h.memoizedProps, h = h.memoizedState, o = i.stateNode;
                try {
                  var _e = ur(
                    i.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    _e,
                    h
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Le) {
                  wt(
                    i,
                    i.return,
                    Le
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, i = t.nodeType, i === 9)
                  wd(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wd(t);
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
            t.return = n.return, en = t;
            break;
          }
          en = n.return;
        }
  }
  function Pg(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ti(t, i), o & 4 && no(5, i);
        break;
      case 1:
        if (ti(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (w) {
              wt(i, i.return, w);
            }
          else {
            var f = ur(
              i.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              t.componentDidUpdate(
                f,
                n,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (w) {
              wt(
                i,
                i.return,
                w
              );
            }
          }
        o & 64 && Ig(i), o & 512 && ao(i, i.return);
        break;
      case 3:
        if (ti(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
          if (n = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                n = i.child.stateNode;
                break;
              case 1:
                n = i.child.stateNode;
            }
          try {
            jp(t, n);
          } catch (w) {
            wt(i, i.return, w);
          }
        }
        break;
      case 27:
        n === null && o & 4 && Zg(i);
      case 26:
      case 5:
        ti(t, i), n === null && o & 4 && Xg(i), o & 512 && ao(i, i.return);
        break;
      case 12:
        ti(t, i);
        break;
      case 31:
        ti(t, i), o & 4 && Wg(t, i);
        break;
      case 13:
        ti(t, i), o & 4 && e0(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = sE.bind(
          null,
          i
        ), TE(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Wa, !o) {
          n = n !== null && n.memoizedState !== null || Zt, f = Wa;
          var h = Zt;
          Wa = o, (Zt = n) && !h ? ni(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ti(t, i), Wa = f, Zt = h;
        }
        break;
      case 30:
        break;
      default:
        ti(t, i);
    }
  }
  function Kg(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, Kg(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && rt(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, Nn = !1;
  function ei(t, n, i) {
    for (i = i.child; i !== null; )
      Jg(t, n, i), i = i.sibling;
  }
  function Jg(t, n, i) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(tn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Zt || Ta(i, n), ei(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Zt || Ta(i, n);
        var o = Dt, f = Nn;
        Hi(i.type) && (Dt = i.stateNode, Nn = !1), ei(
          t,
          n,
          i
        ), ho(i.stateNode), Dt = o, Nn = f;
        break;
      case 5:
        Zt || Ta(i, n);
      case 6:
        if (o = Dt, f = Nn, Dt = null, ei(
          t,
          n,
          i
        ), Dt = o, Nn = f, Dt !== null)
          if (Nn)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(i.stateNode);
            } catch (h) {
              wt(
                i,
                n,
                h
              );
            }
          else
            try {
              Dt.removeChild(i.stateNode);
            } catch (h) {
              wt(
                i,
                n,
                h
              );
            }
        break;
      case 18:
        Dt !== null && (Nn ? (t = Dt, I0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), ol(t)) : I0(Dt, i.stateNode));
        break;
      case 4:
        o = Dt, f = Nn, Dt = i.stateNode.containerInfo, Nn = !0, ei(
          t,
          n,
          i
        ), Dt = o, Nn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Mi(2, i, n), Zt || Mi(4, i, n), ei(
          t,
          n,
          i
        );
        break;
      case 1:
        Zt || (Ta(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && Gg(
          i,
          n,
          o
        )), ei(
          t,
          n,
          i
        );
        break;
      case 21:
        ei(
          t,
          n,
          i
        );
        break;
      case 22:
        Zt = (o = Zt) || i.memoizedState !== null, ei(
          t,
          n,
          i
        ), Zt = o;
        break;
      default:
        ei(
          t,
          n,
          i
        );
    }
  }
  function Wg(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ol(t);
      } catch (i) {
        wt(n, n.return, i);
      }
    }
  }
  function e0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ol(t);
      } catch (i) {
        wt(n, n.return, i);
      }
  }
  function eE(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new Qg()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new Qg()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function Ys(t, n) {
    var i = eE(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = uE.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Cn(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], h = t, w = n, M = w;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Hi(M.type)) {
                Dt = M.stateNode, Nn = !1;
                break e;
              }
              break;
            case 5:
              Dt = M.stateNode, Nn = !1;
              break e;
            case 3:
            case 4:
              Dt = M.stateNode.containerInfo, Nn = !0;
              break e;
          }
          M = M.return;
        }
        if (Dt === null) throw Error(l(160));
        Jg(h, w, f), Dt = null, Nn = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        t0(n, t), n = n.sibling;
  }
  var ma = null;
  function t0(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Cn(n, t), Rn(t), o & 4 && (Mi(3, t, t.return), no(3, t), Mi(5, t, t.return));
        break;
      case 1:
        Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ta(i, i.return)), o & 64 && Wa && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = ma;
        if (Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ta(i, i.return)), o & 4) {
          var h = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  o = t.type, i = t.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Ge] || h[ve] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(o), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), sn(h, o, i), h[ve] = t, at(h), o = h;
                      break e;
                    case "link":
                      var w = ty(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (w) {
                        for (var M = 0; M < w.length; M++)
                          if (h = w[M], h.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && h.getAttribute("rel") === (i.rel == null ? null : i.rel) && h.getAttribute("title") === (i.title == null ? null : i.title) && h.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), sn(h, o, i), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (w = ty(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (M = 0; M < w.length; M++)
                          if (h = w[M], h.getAttribute("content") === (i.content == null ? null : "" + i.content) && h.getAttribute("name") === (i.name == null ? null : i.name) && h.getAttribute("property") === (i.property == null ? null : i.property) && h.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && h.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            w.splice(M, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), sn(h, o, i), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[ve] = t, at(h), o = h;
                }
                t.stateNode = o;
              } else
                ny(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = ey(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : h.count--, o === null ? ny(
              f,
              t.type,
              t.stateNode
            ) : ey(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && Ff(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ta(i, i.return)), i !== null && o & 4 && Ff(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ta(i, i.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            Dr(f, "");
          } catch (_e) {
            wt(t, t.return, _e);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, Ff(
          t,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (Pf = !0);
        break;
      case 6:
        if (Cn(n, t), Rn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (_e) {
            wt(t, t.return, _e);
          }
        }
        break;
      case 3:
        if (ru = null, f = ma, ma = au(n.containerInfo), Cn(n, t), ma = f, Rn(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            ol(n.containerInfo);
          } catch (_e) {
            wt(t, t.return, _e);
          }
        Pf && (Pf = !1, n0(t));
        break;
      case 4:
        o = ma, ma = au(
          t.stateNode.containerInfo
        ), Cn(n, t), Rn(t), ma = o;
        break;
      case 12:
        Cn(n, t), Rn(t);
        break;
      case 31:
        Cn(n, t), Rn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Ys(t, o)));
        break;
      case 13:
        Cn(n, t), Rn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Gs = Qe()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Ys(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var q = i !== null && i.memoizedState !== null, ie = Wa, ue = Zt;
        if (Wa = ie || f, Zt = ue || q, Cn(n, t), Zt = ue, Wa = ie, Rn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || q || Wa || Zt || cr(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                q = i = n;
                try {
                  if (h = q.stateNode, f)
                    w = h.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    M = q.stateNode;
                    var fe = q.memoizedProps.style, re = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    M.style.display = re == null || typeof re == "boolean" ? "" : ("" + re).trim();
                  }
                } catch (_e) {
                  wt(q, q.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                q = n;
                try {
                  q.stateNode.nodeValue = f ? "" : q.memoizedProps;
                } catch (_e) {
                  wt(q, q.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                q = n;
                try {
                  var oe = q.stateNode;
                  f ? G0(oe, !0) : G0(q.stateNode, !1);
                } catch (_e) {
                  wt(q, q.return, _e);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === t) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              i === n && (i = null), n = n.return;
            }
            i === n && (i = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Ys(t, i))));
        break;
      case 19:
        Cn(n, t), Rn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Ys(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Cn(n, t), Rn(t);
    }
  }
  function Rn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (Fg(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, h = Zf(t);
            $s(t, h, f);
            break;
          case 5:
            var w = i.stateNode;
            i.flags & 32 && (Dr(w, ""), i.flags &= -33);
            var M = Zf(t);
            $s(t, M, w);
            break;
          case 3:
          case 4:
            var q = i.stateNode.containerInfo, ie = Zf(t);
            Qf(
              t,
              ie,
              q
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ue) {
        wt(t, t.return, ue);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function n0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        n0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function ti(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Pg(t, n.alternate, n), n = n.sibling;
  }
  function cr(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Mi(4, n, n.return), cr(n);
          break;
        case 1:
          Ta(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && Gg(
            n,
            n.return,
            i
          ), cr(n);
          break;
        case 27:
          ho(n.stateNode);
        case 26:
        case 5:
          Ta(n, n.return), cr(n);
          break;
        case 22:
          n.memoizedState === null && cr(n);
          break;
        case 30:
          cr(n);
          break;
        default:
          cr(n);
      }
      t = t.sibling;
    }
  }
  function ni(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, h = n, w = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ni(
            f,
            h,
            i
          ), no(4, h);
          break;
        case 1:
          if (ni(
            f,
            h,
            i
          ), o = h, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (ie) {
              wt(o, o.return, ie);
            }
          if (o = h, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var q = f.shared.hiddenCallbacks;
              if (q !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < q.length; f++)
                  Op(q[f], M);
            } catch (ie) {
              wt(o, o.return, ie);
            }
          }
          i && w & 64 && Ig(h), ao(h, h.return);
          break;
        case 27:
          Zg(h);
        case 26:
        case 5:
          ni(
            f,
            h,
            i
          ), i && o === null && w & 4 && Xg(h), ao(h, h.return);
          break;
        case 12:
          ni(
            f,
            h,
            i
          );
          break;
        case 31:
          ni(
            f,
            h,
            i
          ), i && w & 4 && Wg(f, h);
          break;
        case 13:
          ni(
            f,
            h,
            i
          ), i && w & 4 && e0(f, h);
          break;
        case 22:
          h.memoizedState === null && ni(
            f,
            h,
            i
          ), ao(h, h.return);
          break;
        case 30:
          break;
        default:
          ni(
            f,
            h,
            i
          );
      }
      n = n.sibling;
    }
  }
  function Kf(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Yl(i));
  }
  function Jf(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Yl(t));
  }
  function pa(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        a0(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function a0(t, n, i, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        pa(
          t,
          n,
          i,
          o
        ), f & 2048 && no(9, n);
        break;
      case 1:
        pa(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        pa(
          t,
          n,
          i,
          o
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Yl(t)));
        break;
      case 12:
        if (f & 2048) {
          pa(
            t,
            n,
            i,
            o
          ), t = n.stateNode;
          try {
            var h = n.memoizedProps, w = h.id, M = h.onPostCommit;
            typeof M == "function" && M(
              w,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (q) {
            wt(n, n.return, q);
          }
        } else
          pa(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        pa(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        pa(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, w = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? pa(
          t,
          n,
          i,
          o
        ) : io(t, n) : h._visibility & 2 ? pa(
          t,
          n,
          i,
          o
        ) : (h._visibility |= 2, Pr(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && Kf(w, n);
        break;
      case 24:
        pa(
          t,
          n,
          i,
          o
        ), f & 2048 && Jf(n.alternate, n);
        break;
      default:
        pa(
          t,
          n,
          i,
          o
        );
    }
  }
  function Pr(t, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, w = n, M = i, q = o, ie = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          Pr(
            h,
            w,
            M,
            q,
            f
          ), no(8, w);
          break;
        case 23:
          break;
        case 22:
          var ue = w.stateNode;
          w.memoizedState !== null ? ue._visibility & 2 ? Pr(
            h,
            w,
            M,
            q,
            f
          ) : io(
            h,
            w
          ) : (ue._visibility |= 2, Pr(
            h,
            w,
            M,
            q,
            f
          )), f && ie & 2048 && Kf(
            w.alternate,
            w
          );
          break;
        case 24:
          Pr(
            h,
            w,
            M,
            q,
            f
          ), f && ie & 2048 && Jf(w.alternate, w);
          break;
        default:
          Pr(
            h,
            w,
            M,
            q,
            f
          );
      }
      n = n.sibling;
    }
  }
  function io(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            io(i, o), f & 2048 && Kf(
              o.alternate,
              o
            );
            break;
          case 24:
            io(i, o), f & 2048 && Jf(o.alternate, o);
            break;
          default:
            io(i, o);
        }
        n = n.sibling;
      }
  }
  var ro = 8192;
  function Kr(t, n, i) {
    if (t.subtreeFlags & ro)
      for (t = t.child; t !== null; )
        i0(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function i0(t, n, i) {
    switch (t.tag) {
      case 26:
        Kr(
          t,
          n,
          i
        ), t.flags & ro && t.memoizedState !== null && VE(
          i,
          ma,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Kr(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = ma;
        ma = au(t.stateNode.containerInfo), Kr(
          t,
          n,
          i
        ), ma = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = ro, ro = 16777216, Kr(
          t,
          n,
          i
        ), ro = o) : Kr(
          t,
          n,
          i
        ));
        break;
      default:
        Kr(
          t,
          n,
          i
        );
    }
  }
  function r0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function lo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, o0(
            o,
            t
          );
        }
      r0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        l0(t), t = t.sibling;
  }
  function l0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        lo(t), t.flags & 2048 && Mi(9, t, t.return);
        break;
      case 3:
        lo(t);
        break;
      case 12:
        lo(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, Is(t)) : lo(t);
        break;
      default:
        lo(t);
    }
  }
  function Is(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, o0(
            o,
            t
          );
        }
      r0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Mi(8, n, n.return), Is(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, Is(n));
          break;
        default:
          Is(n);
      }
      t = t.sibling;
    }
  }
  function o0(t, n) {
    for (; en !== null; ) {
      var i = en;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Mi(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Yl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, en = o;
      else
        e: for (i = t; en !== null; ) {
          o = en;
          var f = o.sibling, h = o.return;
          if (Kg(o), o === i) {
            en = null;
            break e;
          }
          if (f !== null) {
            f.return = h, en = f;
            break e;
          }
          en = h;
        }
    }
  }
  var tE = {
    getCacheForType: function(t) {
      var n = ln(Gt), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return ln(Gt).controller.signal;
    }
  }, nE = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Rt = null, Pe = null, et = 0, xt = 0, Vn = null, Di = !1, Jr = !1, Wf = !1, ai = 0, Bt = 0, Ai = 0, fr = 0, ed = 0, qn = 0, Wr = 0, oo = null, Tn = null, td = !1, Gs = 0, s0 = 0, Xs = 1 / 0, Fs = null, zi = null, Jt = 0, Oi = null, el = null, ii = 0, nd = 0, ad = null, u0 = null, so = 0, id = null;
  function $n() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : T.T !== null ? cd() : de();
  }
  function c0() {
    if (qn === 0)
      if ((et & 536870912) === 0 || it) {
        var t = On;
        On <<= 1, (On & 3932160) === 0 && (On = 262144), qn = t;
      } else qn = 536870912;
    return t = Bn.current, t !== null && (t.flags |= 32), qn;
  }
  function Mn(t, n, i) {
    (t === Rt && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null) && (tl(t, 0), ji(
      t,
      et,
      qn,
      !1
    )), pt(t, i), ((ht & 2) === 0 || t !== Rt) && (t === Rt && ((ht & 2) === 0 && (fr |= i), Bt === 4 && ji(
      t,
      et,
      qn,
      !1
    )), Ma(t));
  }
  function f0(t, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || vt(t, n), f = o ? rE(t, n) : ld(t, n, !0), h = o;
    do {
      if (f === 0) {
        Jr && !o && ji(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, h && !aE(i)) {
          f = ld(t, n, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var w = 0;
          else
            w = t.pendingLanes & -536870913, w = w !== 0 ? w : w & 536870912 ? 536870912 : 0;
          if (w !== 0) {
            n = w;
            e: {
              var M = t;
              f = oo;
              var q = M.current.memoizedState.isDehydrated;
              if (q && (tl(M, w).flags |= 256), w = ld(
                M,
                w,
                !1
              ), w !== 2) {
                if (Wf && !q) {
                  M.errorRecoveryDisabledLanes |= h, fr |= h, f = 4;
                  break e;
                }
                h = Tn, Tn = f, h !== null && (Tn === null ? Tn = h : Tn.push.apply(
                  Tn,
                  h
                ));
              }
              f = w;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          tl(t, 0), ji(t, n, 0, !0);
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
              ji(
                o,
                n,
                qn,
                !Di
              );
              break e;
            case 2:
              Tn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = Gs + 300 - Qe(), 10 < f)) {
            if (ji(
              o,
              n,
              qn,
              !Di
            ), He(o, 0, !0) !== 0) break e;
            ii = n, o.timeoutHandle = $0(
              d0.bind(
                null,
                o,
                i,
                Tn,
                Fs,
                td,
                n,
                qn,
                fr,
                Wr,
                Di,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          d0(
            o,
            i,
            Tn,
            Fs,
            td,
            n,
            qn,
            fr,
            Wr,
            Di,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ma(t);
  }
  function d0(t, n, i, o, f, h, w, M, q, ie, ue, fe, re, oe) {
    if (t.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ya
      }, i0(
        n,
        h,
        fe
      );
      var _e = (h & 62914560) === h ? Gs - Qe() : (h & 4194048) === h ? s0 - Qe() : 0;
      if (_e = qE(
        fe,
        _e
      ), _e !== null) {
        ii = h, t.cancelPendingCommit = _e(
          x0.bind(
            null,
            t,
            n,
            h,
            i,
            o,
            f,
            w,
            M,
            q,
            ue,
            fe,
            null,
            re,
            oe
          )
        ), ji(t, h, w, !ie);
        return;
      }
    }
    x0(
      t,
      n,
      h,
      i,
      o,
      f,
      w,
      M,
      q
    );
  }
  function aE(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Hn(h(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = n.child, n.subtreeFlags & 16384 && i !== null)
        i.return = n, n = i;
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
  function ji(t, n, i, o) {
    n &= ~ed, n &= ~fr, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), w = 1 << h;
      o[h] = -1, f &= ~w;
    }
    i !== 0 && ca(t, i, n);
  }
  function Zs() {
    return (ht & 6) === 0 ? (uo(0), !1) : !0;
  }
  function rd() {
    if (Pe !== null) {
      if (xt === 0)
        var t = Pe.return;
      else
        t = Pe, Fa = nr = null, wf(t), Gr = null, Gl = 0, t = Pe;
      for (; t !== null; )
        Yg(t.alternate, t), t = t.return;
      Pe = null;
    }
  }
  function tl(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, EE(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), ii = 0, rd(), Rt = t, Pe = i = Ga(t.current, null), et = n, xt = 0, Vn = null, Di = !1, Jr = vt(t, n), Wf = !1, Wr = qn = ed = fr = Ai = Bt = 0, Tn = oo = null, td = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return ai = n, ps(), i;
  }
  function h0(t, n) {
    qe = null, T.H = Wl, n === Ir || n === Es ? (n = Mp(), xt = 3) : n === uf ? (n = Mp(), xt = 4) : xt = n === kf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Vn = n, Pe === null && (Bt = 1, ks(
      t,
      Pn(n, t.current)
    ));
  }
  function m0() {
    var t = Bn.current;
    return t === null ? !0 : (et & 4194048) === et ? ea === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === ea : !1;
  }
  function p0() {
    var t = T.H;
    return T.H = Wl, t === null ? Wl : t;
  }
  function g0() {
    var t = T.A;
    return T.A = tE, t;
  }
  function Qs() {
    Bt = 4, Di || (et & 4194048) !== et && Bn.current !== null || (Jr = !0), (Ai & 134217727) === 0 && (fr & 134217727) === 0 || Rt === null || ji(
      Rt,
      et,
      qn,
      !1
    );
  }
  function ld(t, n, i) {
    var o = ht;
    ht |= 2;
    var f = p0(), h = g0();
    (Rt !== t || et !== n) && (Fs = null, tl(t, n)), n = !1;
    var w = Bt;
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          var M = Pe, q = Vn;
          switch (xt) {
            case 8:
              rd(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Bn.current === null && (n = !0);
              var ie = xt;
              if (xt = 0, Vn = null, nl(t, M, q, ie), i && Jr) {
                w = 0;
                break e;
              }
              break;
            default:
              ie = xt, xt = 0, Vn = null, nl(t, M, q, ie);
          }
        }
        iE(), w = Bt;
        break;
      } catch (ue) {
        h0(t, ue);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Fa = nr = null, ht = o, T.H = f, T.A = h, Pe === null && (Rt = null, et = 0, ps()), w;
  }
  function iE() {
    for (; Pe !== null; ) y0(Pe);
  }
  function rE(t, n) {
    var i = ht;
    ht |= 2;
    var o = p0(), f = g0();
    Rt !== t || et !== n ? (Fs = null, Xs = Qe() + 500, tl(t, n)) : Jr = vt(
      t,
      n
    );
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          n = Pe;
          var h = Vn;
          t: switch (xt) {
            case 1:
              xt = 0, Vn = null, nl(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (Rp(h)) {
                xt = 0, Vn = null, v0(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Rt !== t || (xt = 7), Ma(t);
              }, h.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              Rp(h) ? (xt = 0, Vn = null, v0(n)) : (xt = 0, Vn = null, nl(t, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (Pe.tag) {
                case 26:
                  w = Pe.memoizedState;
                case 5:
                case 27:
                  var M = Pe;
                  if (w ? ay(w) : M.stateNode.complete) {
                    xt = 0, Vn = null;
                    var q = M.sibling;
                    if (q !== null) Pe = q;
                    else {
                      var ie = M.return;
                      ie !== null ? (Pe = ie, Ps(ie)) : Pe = null;
                    }
                    break t;
                  }
              }
              xt = 0, Vn = null, nl(t, n, h, 5);
              break;
            case 6:
              xt = 0, Vn = null, nl(t, n, h, 6);
              break;
            case 8:
              rd(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        lE();
        break;
      } catch (ue) {
        h0(t, ue);
      }
    while (!0);
    return Fa = nr = null, T.H = o, T.A = f, ht = i, Pe !== null ? 0 : (Rt = null, et = 0, ps(), Bt);
  }
  function lE() {
    for (; Pe !== null && !Je(); )
      y0(Pe);
  }
  function y0(t) {
    var n = qg(t.alternate, t, ai);
    t.memoizedProps = t.pendingProps, n === null ? Ps(t) : Pe = n;
  }
  function v0(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Lg(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = Lg(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        wf(n);
      default:
        Yg(i, n), n = Pe = gp(n, ai), n = qg(i, n, ai);
    }
    t.memoizedProps = t.pendingProps, n === null ? Ps(t) : Pe = n;
  }
  function nl(t, n, i, o) {
    Fa = nr = null, wf(n), Gr = null, Gl = 0;
    var f = n.return;
    try {
      if (ZS(
        t,
        f,
        n,
        i,
        et
      )) {
        Bt = 1, ks(
          t,
          Pn(i, t.current)
        ), Pe = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Pe = f, h;
      Bt = 1, ks(
        t,
        Pn(i, t.current)
      ), Pe = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : Jr || (et & 536870912) !== 0 ? t = !1 : (Di = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Bn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), b0(n, t)) : Ps(n);
  }
  function Ps(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        b0(
          n,
          Di
        );
        return;
      }
      t = n.return;
      var i = KS(
        n.alternate,
        n,
        ai
      );
      if (i !== null) {
        Pe = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Pe = n;
        return;
      }
      Pe = n = t;
    } while (n !== null);
    Bt === 0 && (Bt = 5);
  }
  function b0(t, n) {
    do {
      var i = JS(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, Pe = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        Pe = t;
        return;
      }
      Pe = t = i;
    } while (t !== null);
    Bt = 6, Pe = null;
  }
  function x0(t, n, i, o, f, h, w, M, q) {
    t.cancelPendingCommit = null;
    do
      Ks();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= Fc, Kt(
        t,
        i,
        h,
        w,
        M,
        q
      ), t === Rt && (Pe = Rt = null, et = 0), el = n, Oi = t, ii = i, nd = h, ad = f, u0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, cE(Lt, function() {
        return N0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = T.T, T.T = null, f = L.p, L.p = 2, w = ht, ht |= 4;
        try {
          WS(t, n, i);
        } finally {
          ht = w, L.p = f, T.T = o;
        }
      }
      Jt = 1, w0(), S0(), E0();
    }
  }
  function w0() {
    if (Jt === 1) {
      Jt = 0;
      var t = Oi, n = el, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          t0(n, t);
          var h = vd, w = op(t.containerInfo), M = h.focusedElem, q = h.selectionRange;
          if (w !== M && M && M.ownerDocument && lp(
            M.ownerDocument.documentElement,
            M
          )) {
            if (q !== null && $c(M)) {
              var ie = q.start, ue = q.end;
              if (ue === void 0 && (ue = ie), "selectionStart" in M)
                M.selectionStart = ie, M.selectionEnd = Math.min(
                  ue,
                  M.value.length
                );
              else {
                var fe = M.ownerDocument || document, re = fe && fe.defaultView || window;
                if (re.getSelection) {
                  var oe = re.getSelection(), _e = M.textContent.length, Le = Math.min(q.start, _e), Nt = q.end === void 0 ? Le : Math.min(q.end, _e);
                  !oe.extend && Le > Nt && (w = Nt, Nt = Le, Le = w);
                  var J = rp(
                    M,
                    Le
                  ), X = rp(
                    M,
                    Nt
                  );
                  if (J && X && (oe.rangeCount !== 1 || oe.anchorNode !== J.node || oe.anchorOffset !== J.offset || oe.focusNode !== X.node || oe.focusOffset !== X.offset)) {
                    var ae = fe.createRange();
                    ae.setStart(J.node, J.offset), oe.removeAllRanges(), Le > Nt ? (oe.addRange(ae), oe.extend(X.node, X.offset)) : (ae.setEnd(X.node, X.offset), oe.addRange(ae));
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
          uu = !!yd, vd = yd = null;
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      t.current = n, Jt = 2;
    }
  }
  function S0() {
    if (Jt === 2) {
      Jt = 0;
      var t = Oi, n = el, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          Pg(t, n.alternate, n);
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      Jt = 3;
    }
  }
  function E0() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Ze();
      var t = Oi, n = el, i = ii, o = u0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, el = Oi = null, _0(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (zi = null), W(i), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
        try {
          Pt.onCommitFiberRoot(
            tn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = T.T, f = L.p, L.p = 2, T.T = null;
        try {
          for (var h = t.onRecoverableError, w = 0; w < o.length; w++) {
            var M = o[w];
            h(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          T.T = n, L.p = f;
        }
      }
      (ii & 3) !== 0 && Ks(), Ma(t), f = t.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? t === id ? so++ : (so = 0, id = t) : so = 0, uo(0);
    }
  }
  function _0(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Yl(n)));
  }
  function Ks() {
    return w0(), S0(), E0(), N0();
  }
  function N0() {
    if (Jt !== 5) return !1;
    var t = Oi, n = nd;
    nd = 0;
    var i = W(ii), o = T.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, T.T = null, i = ad, ad = null;
      var h = Oi, w = ii;
      if (Jt = 0, el = Oi = null, ii = 0, (ht & 6) !== 0) throw Error(l(331));
      var M = ht;
      if (ht |= 4, l0(h.current), a0(
        h,
        h.current,
        w,
        i
      ), ht = M, uo(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(tn, h);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, T.T = o, _0(t, n);
    }
  }
  function C0(t, n, i) {
    n = Pn(i, n), n = Hf(t.stateNode, n, 2), t = Ci(t, n, 2), t !== null && (pt(t, 2), Ma(t));
  }
  function wt(t, n, i) {
    if (t.tag === 3)
      C0(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          C0(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (zi === null || !zi.has(o))) {
            t = Pn(i, t), i = Rg(2), o = Ci(n, i, 2), o !== null && (Tg(
              i,
              o,
              n,
              t
            ), pt(o, 2), Ma(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function od(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new nE();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (Wf = !0, f.add(i), t = oE.bind(null, t, n, i), n.then(t, t));
  }
  function oE(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Rt === t && (et & i) === i && (Bt === 4 || Bt === 3 && (et & 62914560) === et && 300 > Qe() - Gs ? (ht & 2) === 0 && tl(t, 0) : ed |= i, Wr === et && (Wr = 0)), Ma(t);
  }
  function R0(t, n) {
    n === 0 && (n = Vt()), t = Wi(t, n), t !== null && (pt(t, n), Ma(t));
  }
  function sE(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), R0(t, i);
  }
  function uE(t, n) {
    var i = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode, f = t.memoizedState;
        f !== null && (i = f.retryLane);
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
    o !== null && o.delete(n), R0(t, i);
  }
  function cE(t, n) {
    return Ye(t, n);
  }
  var Js = null, al = null, sd = !1, Ws = !1, ud = !1, Li = 0;
  function Ma(t) {
    t !== al && t.next === null && (al === null ? Js = al = t : al = al.next = t), Ws = !0, sd || (sd = !0, dE());
  }
  function uo(t, n) {
    if (!ud && Ws) {
      ud = !0;
      do
        for (var i = !1, o = Js; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var w = o.suspendedLanes, M = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(w & ~M), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (i = !0, A0(o, h));
          } else
            h = et, h = He(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || vt(o, h) || (i = !0, A0(o, h));
          o = o.next;
        }
      while (i);
      ud = !1;
    }
  }
  function fE() {
    T0();
  }
  function T0() {
    Ws = sd = !1;
    var t = 0;
    Li !== 0 && SE() && (t = Li);
    for (var n = Qe(), i = null, o = Js; o !== null; ) {
      var f = o.next, h = M0(o, n);
      h === 0 ? (o.next = null, i === null ? Js = f : i.next = f, f === null && (al = i)) : (i = o, (t !== 0 || (h & 3) !== 0) && (Ws = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || uo(t), Li !== 0 && (Li = 0);
  }
  function M0(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var w = 31 - Ut(h), M = 1 << w, q = f[w];
      q === -1 ? ((M & i) === 0 || (M & o) !== 0) && (f[w] = Ht(M, n)) : q <= n && (t.expiredLanes |= M), h &= ~M;
    }
    if (n = Rt, i = et, i = He(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && St(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || vt(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && St(o), W(i)) {
        case 2:
        case 8:
          i = It;
          break;
        case 32:
          i = Lt;
          break;
        case 268435456:
          i = ot;
          break;
        default:
          i = Lt;
      }
      return o = D0.bind(null, t), i = Ye(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && St(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function D0(t, n) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (Ks() && t.callbackNode !== i)
      return null;
    var o = et;
    return o = He(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (f0(t, o, n), M0(t, Qe()), t.callbackNode != null && t.callbackNode === i ? D0.bind(null, t) : null);
  }
  function A0(t, n) {
    if (Ks()) return null;
    f0(t, n, !0);
  }
  function dE() {
    _E(function() {
      (ht & 6) !== 0 ? Ye(
        yt,
        fE
      ) : T0();
    });
  }
  function cd() {
    if (Li === 0) {
      var t = $r;
      t === 0 && (t = ua, ua <<= 1, (ua & 261888) === 0 && (ua = 256)), Li = t;
    }
    return Li;
  }
  function z0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : os("" + t);
  }
  function O0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function hE(t, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var h = z0(
        (f[we] || null).action
      ), w = o.submitter;
      w && (n = (n = w[we] || null) ? z0(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var M = new fs(
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
                if (Li !== 0) {
                  var q = w ? O0(f, w) : new FormData(f);
                  Df(
                    i,
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
                typeof h == "function" && (M.preventDefault(), q = w ? O0(f, w) : new FormData(f), Df(
                  i,
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
  for (var fd = 0; fd < Xc.length; fd++) {
    var dd = Xc[fd], mE = dd.toLowerCase(), pE = dd[0].toUpperCase() + dd.slice(1);
    ha(
      mE,
      "on" + pE
    );
  }
  ha(cp, "onAnimationEnd"), ha(fp, "onAnimationIteration"), ha(dp, "onAnimationStart"), ha("dblclick", "onDoubleClick"), ha("focusin", "onFocus"), ha("focusout", "onBlur"), ha(AS, "onTransitionRun"), ha(zS, "onTransitionStart"), ha(OS, "onTransitionCancel"), ha(hp, "onTransitionEnd"), nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]), cn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), cn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), cn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), cn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), cn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), cn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var co = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), gE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(co)
  );
  function j0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], f = o.event;
      o = o.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var w = o.length - 1; 0 <= w; w--) {
            var M = o[w], q = M.instance, ie = M.currentTarget;
            if (M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              ms(ue);
            }
            f.currentTarget = null, h = q;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (M = o[w], q = M.instance, ie = M.currentTarget, M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              ms(ue);
            }
            f.currentTarget = null, h = q;
          }
      }
    }
  }
  function Ke(t, n) {
    var i = n[Me];
    i === void 0 && (i = n[Me] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (L0(n, t, 2, !1), i.add(o));
  }
  function hd(t, n, i) {
    var o = 0;
    n && (o |= 4), L0(
      i,
      t,
      o,
      n
    );
  }
  var eu = "_reactListening" + Math.random().toString(36).slice(2);
  function md(t) {
    if (!t[eu]) {
      t[eu] = !0, Na.forEach(function(i) {
        i !== "selectionchange" && (gE.has(i) || hd(i, !1, t), hd(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[eu] || (n[eu] = !0, hd("selectionchange", !1, n));
    }
  }
  function L0(t, n, i, o) {
    switch (cy(n)) {
      case 2:
        var f = IE;
        break;
      case 8:
        f = GE;
        break;
      default:
        f = Md;
    }
    i = f.bind(
      null,
      n,
      i,
      t
    ), f = void 0, !Oc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, i, !0) : f !== void 0 ? t.addEventListener(n, i, {
      passive: f
    }) : t.addEventListener(n, i, !1);
  }
  function pd(t, n, i, o, f) {
    var h = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var w = o.tag;
        if (w === 3 || w === 4) {
          var M = o.stateNode.containerInfo;
          if (M === f) break;
          if (w === 4)
            for (w = o.return; w !== null; ) {
              var q = w.tag;
              if ((q === 3 || q === 4) && w.stateNode.containerInfo === f)
                return;
              w = w.return;
            }
          for (; M !== null; ) {
            if (w = Ct(M), w === null) return;
            if (q = w.tag, q === 5 || q === 6 || q === 26 || q === 27) {
              o = h = w;
              continue e;
            }
            M = M.parentNode;
          }
        }
        o = o.return;
      }
    Vm(function() {
      var ie = h, ue = Ac(i), fe = [];
      e: {
        var re = mp.get(t);
        if (re !== void 0) {
          var oe = fs, _e = t;
          switch (t) {
            case "keypress":
              if (us(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = uS;
              break;
            case "focusin":
              _e = "focus", oe = kc;
              break;
            case "focusout":
              _e = "blur", oe = kc;
              break;
            case "beforeblur":
            case "afterblur":
              oe = kc;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              oe = Ym;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = Kw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = dS;
              break;
            case cp:
            case fp:
            case dp:
              oe = eS;
              break;
            case hp:
              oe = mS;
              break;
            case "scroll":
            case "scrollend":
              oe = Qw;
              break;
            case "wheel":
              oe = gS;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = nS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Gm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = vS;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (t === "scroll" || t === "scrollend"), J = Le ? re !== null ? re + "Capture" : null : re;
          Le = [];
          for (var X = ie, ae; X !== null; ) {
            var ce = X;
            if (ae = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ae === null || J === null || (ce = zl(X, J), ce != null && Le.push(
              fo(X, ce, ae)
            )), Nt) break;
            X = X.return;
          }
          0 < Le.length && (re = new oe(
            re,
            _e,
            null,
            i,
            ue
          ), fe.push({ event: re, listeners: Le }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (re = t === "mouseover" || t === "pointerover", oe = t === "mouseout" || t === "pointerout", re && i !== Dc && (_e = i.relatedTarget || i.fromElement) && (Ct(_e) || _e[be]))
            break e;
          if ((oe || re) && (re = ue.window === ue ? ue : (re = ue.ownerDocument) ? re.defaultView || re.parentWindow : window, oe ? (_e = i.relatedTarget || i.toElement, oe = ie, _e = _e ? Ct(_e) : null, _e !== null && (Nt = u(_e), Le = _e.tag, _e !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (_e = null)) : (oe = null, _e = ie), oe !== _e)) {
            if (Le = Ym, ce = "onMouseLeave", J = "onMouseEnter", X = "mouse", (t === "pointerout" || t === "pointerover") && (Le = Gm, ce = "onPointerLeave", J = "onPointerEnter", X = "pointer"), Nt = oe == null ? re : We(oe), ae = _e == null ? re : We(_e), re = new Le(
              ce,
              X + "leave",
              oe,
              i,
              ue
            ), re.target = Nt, re.relatedTarget = ae, ce = null, Ct(ue) === ie && (Le = new Le(
              J,
              X + "enter",
              _e,
              i,
              ue
            ), Le.target = ae, Le.relatedTarget = Nt, ce = Le), Nt = ce, oe && _e)
              t: {
                for (Le = yE, J = oe, X = _e, ae = 0, ce = J; ce; ce = Le(ce))
                  ae++;
                ce = 0;
                for (var Oe = X; Oe; Oe = Le(Oe))
                  ce++;
                for (; 0 < ae - ce; )
                  J = Le(J), ae--;
                for (; 0 < ce - ae; )
                  X = Le(X), ce--;
                for (; ae--; ) {
                  if (J === X || X !== null && J === X.alternate) {
                    Le = J;
                    break t;
                  }
                  J = Le(J), X = Le(X);
                }
                Le = null;
              }
            else Le = null;
            oe !== null && H0(
              fe,
              re,
              oe,
              Le,
              !1
            ), _e !== null && Nt !== null && H0(
              fe,
              Nt,
              _e,
              Le,
              !0
            );
          }
        }
        e: {
          if (re = ie ? We(ie) : window, oe = re.nodeName && re.nodeName.toLowerCase(), oe === "select" || oe === "input" && re.type === "file")
            var ut = Wm;
          else if (Km(re))
            if (ep)
              ut = TS;
            else {
              ut = CS;
              var Ne = NS;
            }
          else
            oe = re.nodeName, !oe || oe.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? ie && Mc(ie.elementType) && (ut = Wm) : ut = RS;
          if (ut && (ut = ut(t, ie))) {
            Jm(
              fe,
              ut,
              i,
              ue
            );
            break e;
          }
          Ne && Ne(t, re, ie), t === "focusout" && ie && re.type === "number" && ie.memoizedProps.value != null && Dl(re, "number", re.value);
        }
        switch (Ne = ie ? We(ie) : window, t) {
          case "focusin":
            (Km(Ne) || Ne.contentEditable === "true") && (jr = Ne, Yc = ie, Vl = null);
            break;
          case "focusout":
            Vl = Yc = jr = null;
            break;
          case "mousedown":
            Ic = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ic = !1, sp(fe, i, ue);
            break;
          case "selectionchange":
            if (DS) break;
          case "keydown":
          case "keyup":
            sp(fe, i, ue);
        }
        var Ie;
        if (Uc)
          e: {
            switch (t) {
              case "compositionstart":
                var tt = "onCompositionStart";
                break e;
              case "compositionend":
                tt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                tt = "onCompositionUpdate";
                break e;
            }
            tt = void 0;
          }
        else
          Or ? Qm(t, i) && (tt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Xm && i.locale !== "ko" && (Or || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Or && (Ie = qm()) : (bi = ue, jc = "value" in bi ? bi.value : bi.textContent, Or = !0)), Ne = tu(ie, tt), 0 < Ne.length && (tt = new Im(
          tt,
          t,
          null,
          i,
          ue
        ), fe.push({ event: tt, listeners: Ne }), Ie ? tt.data = Ie : (Ie = Pm(i), Ie !== null && (tt.data = Ie)))), (Ie = xS ? wS(t, i) : SS(t, i)) && (tt = tu(ie, "onBeforeInput"), 0 < tt.length && (Ne = new Im(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: tt
        }), Ne.data = Ie)), hE(
          fe,
          t,
          ie,
          i,
          ue
        );
      }
      j0(fe, n);
    });
  }
  function fo(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function tu(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = zl(t, i), f != null && o.unshift(
        fo(t, f, h)
      ), f = zl(t, n), f != null && o.push(
        fo(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function yE(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function H0(t, n, i, o, f) {
    for (var h = n._reactName, w = []; i !== null && i !== o; ) {
      var M = i, q = M.alternate, ie = M.stateNode;
      if (M = M.tag, q !== null && q === o) break;
      M !== 5 && M !== 26 && M !== 27 || ie === null || (q = ie, f ? (ie = zl(i, h), ie != null && w.unshift(
        fo(i, ie, q)
      )) : f || (ie = zl(i, h), ie != null && w.push(
        fo(i, ie, q)
      ))), i = i.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var vE = /\r\n?/g, bE = /\u0000|\uFFFD/g;
  function k0(t) {
    return (typeof t == "string" ? t : "" + t).replace(vE, `
`).replace(bE, "");
  }
  function B0(t, n) {
    return n = k0(n), k0(t) === n;
  }
  function _t(t, n, i, o, f, h) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Dr(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Dr(t, "" + o);
        break;
      case "className":
        da(t, "class", o);
        break;
      case "tabIndex":
        da(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        da(t, i, o);
        break;
      case "style":
        Bm(t, o, h);
        break;
      case "data":
        if (n !== "object") {
          da(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || i !== "href")) {
          t.removeAttribute(i);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = os("" + o), t.setAttribute(i, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (i === "formAction" ? (n !== "input" && _t(t, n, "name", f.name, f, null), _t(
            t,
            n,
            "formEncType",
            f.formEncType,
            f,
            null
          ), _t(
            t,
            n,
            "formMethod",
            f.formMethod,
            f,
            null
          ), _t(
            t,
            n,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (_t(t, n, "encType", f.encType, f, null), _t(t, n, "method", f.method, f, null), _t(t, n, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = os("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = Ya);
        break;
      case "onScroll":
        o != null && Ke("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = i;
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
        i = os("" + o), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          i
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
        o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, "" + o) : t.removeAttribute(i);
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
        o && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, "") : t.removeAttribute(i);
        break;
      case "capture":
      case "download":
        o === !0 ? t.setAttribute(i, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, o) : t.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? t.setAttribute(i, o) : t.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? t.removeAttribute(i) : t.setAttribute(i, o);
        break;
      case "popover":
        Ke("beforetoggle", t), Ke("toggle", t), fa(t, "popover", o);
        break;
      case "xlinkActuate":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Be(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Be(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Be(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Be(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        fa(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Fw.get(i) || i, fa(t, i, o));
    }
  }
  function gd(t, n, i, o, f, h) {
    switch (i) {
      case "style":
        Bm(t, o, h);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            t.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Dr(t, o) : (typeof o == "number" || typeof o == "bigint") && Dr(t, "" + o);
        break;
      case "onScroll":
        o != null && Ke("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Ya);
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
        if (!jn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), n = i.slice(2, f ? i.length - 7 : void 0), h = t[we] || null, h = h != null ? h[i] : null, typeof h == "function" && t.removeEventListener(n, h, f), typeof o == "function")) {
              typeof h != "function" && h !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, f);
              break e;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : fa(t, i, o);
          }
    }
  }
  function sn(t, n, i) {
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
        Ke("error", t), Ke("load", t);
        var o = !1, f = !1, h;
        for (h in i)
          if (i.hasOwnProperty(h)) {
            var w = i[h];
            if (w != null)
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
                  _t(t, n, h, w, i, null);
              }
          }
        f && _t(t, n, "srcSet", i.srcSet, i, null), o && _t(t, n, "src", i.src, i, null);
        return;
      case "input":
        Ke("invalid", t);
        var M = h = w = f = null, q = null, ie = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var ue = i[o];
            if (ue != null)
              switch (o) {
                case "name":
                  f = ue;
                  break;
                case "type":
                  w = ue;
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
                  _t(t, n, o, ue, i, null);
              }
          }
        Mr(
          t,
          h,
          M,
          q,
          ie,
          w,
          f,
          !1
        );
        return;
      case "select":
        Ke("invalid", t), o = w = h = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (M = i[f], M != null))
            switch (f) {
              case "value":
                h = M;
                break;
              case "defaultValue":
                w = M;
                break;
              case "multiple":
                o = M;
              default:
                _t(t, n, f, M, i, null);
            }
        n = h, i = w, t.multiple = !!o, n != null ? vi(t, !!o, n, !1) : i != null && vi(t, !!o, i, !0);
        return;
      case "textarea":
        Ke("invalid", t), h = f = o = null;
        for (w in i)
          if (i.hasOwnProperty(w) && (M = i[w], M != null))
            switch (w) {
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
                _t(t, n, w, M, i, null);
            }
        Hm(t, o, f, h);
        return;
      case "option":
        for (q in i)
          if (i.hasOwnProperty(q) && (o = i[q], o != null))
            switch (q) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                _t(t, n, q, o, i, null);
            }
        return;
      case "dialog":
        Ke("beforetoggle", t), Ke("toggle", t), Ke("cancel", t), Ke("close", t);
        break;
      case "iframe":
      case "object":
        Ke("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < co.length; o++)
          Ke(co[o], t);
        break;
      case "image":
        Ke("error", t), Ke("load", t);
        break;
      case "details":
        Ke("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Ke("error", t), Ke("load", t);
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
        for (ie in i)
          if (i.hasOwnProperty(ie) && (o = i[ie], o != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                _t(t, n, ie, o, i, null);
            }
        return;
      default:
        if (Mc(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (o = i[ue], o !== void 0 && gd(
              t,
              n,
              ue,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (M in i)
      i.hasOwnProperty(M) && (o = i[M], o != null && _t(t, n, M, o, i, null));
  }
  function xE(t, n, i, o) {
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
        var f = null, h = null, w = null, M = null, q = null, ie = null, ue = null;
        for (oe in i) {
          var fe = i[oe];
          if (i.hasOwnProperty(oe) && fe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = fe;
              default:
                o.hasOwnProperty(oe) || _t(t, n, oe, null, o, fe);
            }
        }
        for (var re in o) {
          var oe = o[re];
          if (fe = i[re], o.hasOwnProperty(re) && (oe != null || fe != null))
            switch (re) {
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
                w = oe;
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
                oe !== fe && _t(
                  t,
                  n,
                  re,
                  oe,
                  o,
                  fe
                );
            }
        }
        Qi(
          t,
          w,
          M,
          q,
          ie,
          ue,
          h,
          f
        );
        return;
      case "select":
        oe = w = M = re = null;
        for (h in i)
          if (q = i[h], i.hasOwnProperty(h) && q != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = q;
              default:
                o.hasOwnProperty(h) || _t(
                  t,
                  n,
                  h,
                  null,
                  o,
                  q
                );
            }
        for (f in o)
          if (h = o[f], q = i[f], o.hasOwnProperty(f) && (h != null || q != null))
            switch (f) {
              case "value":
                re = h;
                break;
              case "defaultValue":
                M = h;
                break;
              case "multiple":
                w = h;
              default:
                h !== q && _t(
                  t,
                  n,
                  f,
                  h,
                  o,
                  q
                );
            }
        n = M, i = w, o = oe, re != null ? vi(t, !!i, re, !1) : !!o != !!i && (n != null ? vi(t, !!i, n, !0) : vi(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        oe = re = null;
        for (M in i)
          if (f = i[M], i.hasOwnProperty(M) && f != null && !o.hasOwnProperty(M))
            switch (M) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(t, n, M, null, o, f);
            }
        for (w in o)
          if (f = o[w], h = i[w], o.hasOwnProperty(w) && (f != null || h != null))
            switch (w) {
              case "value":
                re = f;
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
                f !== h && _t(t, n, w, f, o, h);
            }
        Al(t, re, oe);
        return;
      case "option":
        for (var _e in i)
          if (re = i[_e], i.hasOwnProperty(_e) && re != null && !o.hasOwnProperty(_e))
            switch (_e) {
              case "selected":
                t.selected = !1;
                break;
              default:
                _t(
                  t,
                  n,
                  _e,
                  null,
                  o,
                  re
                );
            }
        for (q in o)
          if (re = o[q], oe = i[q], o.hasOwnProperty(q) && re !== oe && (re != null || oe != null))
            switch (q) {
              case "selected":
                t.selected = re && typeof re != "function" && typeof re != "symbol";
                break;
              default:
                _t(
                  t,
                  n,
                  q,
                  re,
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
        for (var Le in i)
          re = i[Le], i.hasOwnProperty(Le) && re != null && !o.hasOwnProperty(Le) && _t(t, n, Le, null, o, re);
        for (ie in o)
          if (re = o[ie], oe = i[ie], o.hasOwnProperty(ie) && re !== oe && (re != null || oe != null))
            switch (ie) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(l(137, n));
                break;
              default:
                _t(
                  t,
                  n,
                  ie,
                  re,
                  o,
                  oe
                );
            }
        return;
      default:
        if (Mc(n)) {
          for (var Nt in i)
            re = i[Nt], i.hasOwnProperty(Nt) && re !== void 0 && !o.hasOwnProperty(Nt) && gd(
              t,
              n,
              Nt,
              void 0,
              o,
              re
            );
          for (ue in o)
            re = o[ue], oe = i[ue], !o.hasOwnProperty(ue) || re === oe || re === void 0 && oe === void 0 || gd(
              t,
              n,
              ue,
              re,
              o,
              oe
            );
          return;
        }
    }
    for (var J in i)
      re = i[J], i.hasOwnProperty(J) && re != null && !o.hasOwnProperty(J) && _t(t, n, J, null, o, re);
    for (fe in o)
      re = o[fe], oe = i[fe], !o.hasOwnProperty(fe) || re === oe || re == null && oe == null || _t(t, n, fe, re, o, oe);
  }
  function U0(t) {
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
  function wE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], h = f.transferSize, w = f.initiatorType, M = f.duration;
        if (h && M && U0(w)) {
          for (w = 0, M = f.responseEnd, o += 1; o < i.length; o++) {
            var q = i[o], ie = q.startTime;
            if (ie > M) break;
            var ue = q.transferSize, fe = q.initiatorType;
            ue && U0(fe) && (q = q.responseEnd, w += ue * (q < M ? 1 : (M - ie) / (q - ie)));
          }
          if (--o, n += 8 * (h + w) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var yd = null, vd = null;
  function nu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function V0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function q0(t, n) {
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
  function bd(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var xd = null;
  function SE() {
    var t = window.event;
    return t && t.type === "popstate" ? t === xd ? !1 : (xd = t, !0) : (xd = null, !1);
  }
  var $0 = typeof setTimeout == "function" ? setTimeout : void 0, EE = typeof clearTimeout == "function" ? clearTimeout : void 0, Y0 = typeof Promise == "function" ? Promise : void 0, _E = typeof queueMicrotask == "function" ? queueMicrotask : typeof Y0 < "u" ? function(t) {
    return Y0.resolve(null).then(t).catch(NE);
  } : $0;
  function NE(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Hi(t) {
    return t === "head";
  }
  function I0(t, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (t.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(f), ol(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          ho(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, ho(i);
          for (var h = i.firstChild; h; ) {
            var w = h.nextSibling, M = h.nodeName;
            h[Ge] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && h.rel.toLowerCase() === "stylesheet" || i.removeChild(h), h = w;
          }
        } else
          i === "body" && ho(t.ownerDocument.body);
      i = f;
    } while (i);
    ol(n);
  }
  function G0(t, n) {
    var i = t;
    t = 0;
    do {
      var o = i.nextSibling;
      if (i.nodeType === 1 ? n ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (n ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), o && o.nodeType === 8)
        if (i = o.data, i === "/$") {
          if (t === 0) break;
          t--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || t++;
      i = o;
    } while (i);
  }
  function wd(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wd(i), rt(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(i);
    }
  }
  function CE(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var f = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[Ge])
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
      if (t = ta(t.nextSibling), t === null) break;
    }
    return null;
  }
  function RE(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ta(t.nextSibling), t === null)) return null;
    return t;
  }
  function X0(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ta(t.nextSibling), t === null)) return null;
    return t;
  }
  function Sd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ed(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function TE(t, n) {
    var i = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || i.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), i.removeEventListener("DOMContentLoaded", o);
      };
      i.addEventListener("DOMContentLoaded", o), t._reactRetry = o;
    }
  }
  function ta(t) {
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
  var _d = null;
  function F0(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return ta(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Z0(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (n === 0) return t;
          n--;
        } else i !== "/$" && i !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Q0(t, n, i) {
    switch (n = nu(i), t) {
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
  function ho(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    rt(t);
  }
  var na = /* @__PURE__ */ new Map(), P0 = /* @__PURE__ */ new Set();
  function au(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ri = L.d;
  L.d = {
    f: ME,
    r: DE,
    D: AE,
    C: zE,
    L: OE,
    m: jE,
    X: HE,
    S: LE,
    M: kE
  };
  function ME() {
    var t = ri.f(), n = Zs();
    return t || n;
  }
  function DE(t) {
    var n = st(t);
    n !== null && n.tag === 5 && n.type === "form" ? hg(n) : ri.r(t);
  }
  var il = typeof document > "u" ? null : document;
  function K0(t, n, i) {
    var o = il;
    if (o && typeof n == "string" && n) {
      var f = an(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), P0.has(f) || (P0.add(f), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), sn(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function AE(t) {
    ri.D(t), K0("dns-prefetch", t, null);
  }
  function zE(t, n) {
    ri.C(t, n), K0("preconnect", t, n);
  }
  function OE(t, n, i) {
    ri.L(t, n, i);
    var o = il;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + an(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + an(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + an(
        i.imageSizes
      ) + '"]')) : f += '[href="' + an(t) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = rl(t);
          break;
        case "script":
          h = ll(t);
      }
      na.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), na.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(mo(h)) || n === "script" && o.querySelector(po(h)) || (n = o.createElement("link"), sn(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function jE(t, n) {
    ri.m(t, n);
    var i = il;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + an(o) + '"][href="' + an(t) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = ll(t);
      }
      if (!na.has(h) && (t = g({ rel: "modulepreload", href: t }, n), na.set(h, t), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(po(h)))
              return;
        }
        o = i.createElement("link"), sn(o, "link", t), at(o), i.head.appendChild(o);
      }
    }
  }
  function LE(t, n, i) {
    ri.S(t, n, i);
    var o = il;
    if (o && t) {
      var f = jt(o).hoistableStyles, h = rl(t);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var M = { loading: 0, preload: null };
        if (w = o.querySelector(
          mo(h)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = na.get(h)) && Nd(t, i);
          var q = w = o.createElement("link");
          at(q), sn(q, "link", t), q._p = new Promise(function(ie, ue) {
            q.onload = ie, q.onerror = ue;
          }), q.addEventListener("load", function() {
            M.loading |= 1;
          }), q.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, iu(w, n, o);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: M
        }, f.set(h, w);
      }
    }
  }
  function HE(t, n) {
    ri.X(t, n);
    var i = il;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = ll(t), h = o.get(f);
      h || (h = i.querySelector(po(f)), h || (t = g({ src: t, async: !0 }, n), (n = na.get(f)) && Cd(t, n), h = i.createElement("script"), at(h), sn(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function kE(t, n) {
    ri.M(t, n);
    var i = il;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = ll(t), h = o.get(f);
      h || (h = i.querySelector(po(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = na.get(f)) && Cd(t, n), h = i.createElement("script"), at(h), sn(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function J0(t, n, i, o) {
    var f = (f = he.current) ? au(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = rl(i.href), i = jt(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = rl(i.href);
          var h = jt(
            f
          ).hoistableStyles, w = h.get(t);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, w), (h = f.querySelector(
            mo(t)
          )) && !h._p && (w.instance = h, w.state.loading = 5), na.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, na.set(t, i), h || BE(
            f,
            t,
            i,
            w.state
          ))), n && o === null)
            throw Error(l(528, ""));
          return w;
        }
        if (n && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ll(i), i = jt(
          f
        ).hoistableScripts, o = i.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, t));
    }
  }
  function rl(t) {
    return 'href="' + an(t) + '"';
  }
  function mo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function W0(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function BE(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), sn(n, "link", i), at(n), t.head.appendChild(n));
  }
  function ll(t) {
    return '[src="' + an(t) + '"]';
  }
  function po(t) {
    return "script[async]" + t;
  }
  function ey(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + an(i.href) + '"]'
          );
          if (o)
            return n.instance = o, at(o), o;
          var f = g({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), at(o), sn(o, "style", f), iu(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          f = rl(i.href);
          var h = t.querySelector(
            mo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, at(h), h;
          o = W0(i), (f = na.get(f)) && Nd(o, f), h = (t.ownerDocument || t).createElement("link"), at(h);
          var w = h;
          return w._p = new Promise(function(M, q) {
            w.onload = M, w.onerror = q;
          }), sn(h, "link", o), n.state.loading |= 4, iu(h, i.precedence, t), n.instance = h;
        case "script":
          return h = ll(i.src), (f = t.querySelector(
            po(h)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = na.get(h)) && (o = g({}, i), Cd(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), at(f), sn(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, iu(o, i.precedence, t));
    return n.instance;
  }
  function iu(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, w = 0; w < o.length; w++) {
      var M = o[w];
      if (M.dataset.precedence === n) h = M;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Nd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Cd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var ru = null;
  function ty(t, n, i) {
    if (ru === null) {
      var o = /* @__PURE__ */ new Map(), f = ru = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = ru, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), f = 0; f < i.length; f++) {
      var h = i[f];
      if (!(h[Ge] || h[ve] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = h.getAttribute(n) || "";
        w = t + w;
        var M = o.get(w);
        M ? M.push(h) : o.set(w, [h]);
      }
    }
    return o;
  }
  function ny(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function UE(t, n, i) {
    if (i === 1 || n.itemProp != null) return !1;
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
  function ay(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function VE(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = rl(o.href), h = n.querySelector(
          mo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = lu.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = h, at(h);
          return;
        }
        h = n.ownerDocument || n, o = W0(o), (f = na.get(f)) && Nd(o, f), h = h.createElement("link"), at(h);
        var w = h;
        w._p = new Promise(function(M, q) {
          w.onload = M, w.onerror = q;
        }), sn(h, "link", o), i.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = lu.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Rd = 0;
  function qE(t, n) {
    return t.stylesheets && t.count === 0 && su(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && su(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Rd === 0 && (Rd = 62500 * wE());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && su(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Rd ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function lu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) su(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var ou = null;
  function su(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, ou = /* @__PURE__ */ new Map(), n.forEach($E, t), ou = null, lu.call(t));
  }
  function $E(t, n) {
    if (!(n.state.loading & 4)) {
      var i = ou.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), ou.set(t, i);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (i.set(w.dataset.precedence, w), o = w);
        }
        o && i.set(null, o);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = i.get(w) || o, h === o && i.set(null, f), i.set(w, f), this.count++, o = lu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var go = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function YE(t, n, i, o, f, h, w, M, q) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = mn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mn(0), this.hiddenUpdates = mn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function iy(t, n, i, o, f, h, w, M, q, ie, ue, fe) {
    return t = new YE(
      t,
      n,
      i,
      w,
      q,
      ie,
      ue,
      fe,
      M
    ), n = 1, h === !0 && (n |= 24), h = kn(3, null, null, n), t.current = h, h.stateNode = t, n = lf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, cf(h), t;
  }
  function ry(t) {
    return t ? (t = kr, t) : kr;
  }
  function ly(t, n, i, o, f, h) {
    f = ry(f), o.context === null ? o.context = f : o.pendingContext = f, o = Ni(n), o.payload = { element: i }, h = h === void 0 ? null : h, h !== null && (o.callback = h), i = Ci(t, o, n), i !== null && (Mn(i, t, n), Fl(i, t, n));
  }
  function oy(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Td(t, n) {
    oy(t, n), (t = t.alternate) && oy(t, n);
  }
  function sy(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Wi(t, 67108864);
      n !== null && Mn(n, t, 67108864), Td(t, 67108864);
    }
  }
  function uy(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = $n();
      n = Q(n);
      var i = Wi(t, n);
      i !== null && Mn(i, t, n), Td(t, n);
    }
  }
  var uu = !0;
  function IE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = L.p;
    try {
      L.p = 2, Md(t, n, i, o);
    } finally {
      L.p = h, T.T = f;
    }
  }
  function GE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = L.p;
    try {
      L.p = 8, Md(t, n, i, o);
    } finally {
      L.p = h, T.T = f;
    }
  }
  function Md(t, n, i, o) {
    if (uu) {
      var f = Dd(o);
      if (f === null)
        pd(
          t,
          n,
          o,
          cu,
          i
        ), fy(t, o);
      else if (FE(
        f,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (fy(t, o), n & 4 && -1 < XE.indexOf(t)) {
        for (; f !== null; ) {
          var h = st(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var w = un(h.pendingLanes);
                  if (w !== 0) {
                    var M = h;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; w; ) {
                      var q = 1 << 31 - Ut(w);
                      M.entanglements[1] |= q, w &= ~q;
                    }
                    Ma(h), (ht & 6) === 0 && (Xs = Qe() + 500, uo(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = Wi(h, 2), M !== null && Mn(M, h, 2), Zs(), Td(h, 2);
            }
          if (h = Dd(o), h === null && pd(
            t,
            n,
            o,
            cu,
            i
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        pd(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function Dd(t) {
    return t = Ac(t), Ad(t);
  }
  var cu = null;
  function Ad(t) {
    if (cu = null, t = Ct(t), t !== null) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var i = n.tag;
        if (i === 13) {
          if (t = c(n), t !== null) return t;
          t = null;
        } else if (i === 31) {
          if (t = d(n), t !== null) return t;
          t = null;
        } else if (i === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return cu = t, null;
  }
  function cy(t) {
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
        switch (gt()) {
          case yt:
            return 2;
          case It:
            return 8;
          case Lt:
          case mt:
            return 32;
          case ot:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var zd = !1, ki = null, Bi = null, Ui = null, yo = /* @__PURE__ */ new Map(), vo = /* @__PURE__ */ new Map(), Vi = [], XE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function fy(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        ki = null;
        break;
      case "dragenter":
      case "dragleave":
        Bi = null;
        break;
      case "mouseover":
      case "mouseout":
        Ui = null;
        break;
      case "pointerover":
      case "pointerout":
        yo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vo.delete(n.pointerId);
    }
  }
  function bo(t, n, i, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && sy(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function FE(t, n, i, o, f) {
    switch (n) {
      case "focusin":
        return ki = bo(
          ki,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return Bi = bo(
          Bi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return Ui = bo(
          Ui,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return yo.set(
          h,
          bo(
            yo.get(h) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, vo.set(
          h,
          bo(
            vo.get(h) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
    }
    return !1;
  }
  function dy(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            t.blockedOn = n, pe(t.priority, function() {
              uy(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(i), n !== null) {
            t.blockedOn = n, pe(t.priority, function() {
              uy(i);
            });
            return;
          }
        } else if (n === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function fu(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Dd(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Dc = o, i.target.dispatchEvent(o), Dc = null;
      } else
        return n = st(i), n !== null && sy(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function hy(t, n, i) {
    fu(t) && i.delete(n);
  }
  function ZE() {
    zd = !1, ki !== null && fu(ki) && (ki = null), Bi !== null && fu(Bi) && (Bi = null), Ui !== null && fu(Ui) && (Ui = null), yo.forEach(hy), vo.forEach(hy);
  }
  function du(t, n) {
    t.blockedOn === n && (t.blockedOn = null, zd || (zd = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      ZE
    )));
  }
  var hu = null;
  function my(t) {
    hu !== t && (hu = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        hu === t && (hu = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Ad(o || i) === null)
              continue;
            break;
          }
          var h = st(i);
          h !== null && (t.splice(n, 3), n -= 3, Df(
            h,
            {
              pending: !0,
              data: f,
              method: i.method,
              action: o
            },
            o,
            f
          ));
        }
      }
    ));
  }
  function ol(t) {
    function n(q) {
      return du(q, t);
    }
    ki !== null && du(ki, t), Bi !== null && du(Bi, t), Ui !== null && du(Ui, t), yo.forEach(n), vo.forEach(n);
    for (var i = 0; i < Vi.length; i++) {
      var o = Vi[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Vi.length && (i = Vi[0], i.blockedOn === null); )
      dy(i), i.blockedOn === null && Vi.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], h = i[o + 1], w = f[we] || null;
        if (typeof h == "function")
          w || my(i);
        else if (w) {
          var M = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[we] || null)
              M = w.formAction;
            else if (Ad(f) !== null) continue;
          } else M = w.action;
          typeof M == "function" ? i[o + 1] = M : (i.splice(o, 3), o -= 3), my(i);
        }
      }
  }
  function py() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(w) {
            return f = w;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      f !== null && (f(), f = null), o || setTimeout(i, 20);
    }
    function i() {
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
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        o = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function Od(t) {
    this._internalRoot = t;
  }
  mu.prototype.render = Od.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = $n();
    ly(i, o, t, n, null, null);
  }, mu.prototype.unmount = Od.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      ly(t.current, 2, null, t, null, null), Zs(), n[be] = null;
    }
  };
  function mu(t) {
    this._internalRoot = t;
  }
  mu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = de();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < Vi.length && n !== 0 && n < Vi[i].priority; i++) ;
      Vi.splice(i, 0, t), i === 0 && dy(t);
    }
  };
  var gy = a.version;
  if (gy !== "19.2.7")
    throw Error(
      l(
        527,
        gy,
        "19.2.7"
      )
    );
  L.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var QE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pu.isDisabled && pu.supportsFiber)
      try {
        tn = pu.inject(
          QE
        ), Pt = pu;
      } catch {
      }
  }
  return wo.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var i = !1, o = "", f = Eg, h = _g, w = Ng;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = iy(
      t,
      1,
      !1,
      null,
      null,
      i,
      o,
      null,
      f,
      h,
      w,
      py
    ), t[be] = n.current, md(t), new Od(n);
  }, wo.hydrateRoot = function(t, n, i) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = Eg, w = _g, M = Ng, q = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (w = i.onCaughtError), i.onRecoverableError !== void 0 && (M = i.onRecoverableError), i.formState !== void 0 && (q = i.formState)), n = iy(
      t,
      1,
      !0,
      n,
      i ?? null,
      o,
      f,
      q,
      h,
      w,
      M,
      py
    ), n.context = ry(null), i = n.current, o = $n(), o = Q(o), f = Ni(o), f.callback = null, Ci(i, f, o), i = o, n.current.lanes = i, pt(n, i), Ma(n), t[be] = n.current, md(t), new mu(n);
  }, wo.version = "19.2.7", wo;
}
var Cy;
function l_() {
  if (Cy) return Hd.exports;
  Cy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Hd.exports = r_(), Hd.exports;
}
var o_ = l_();
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
var Qb = (e) => {
  throw TypeError(e);
}, Pb = (e, a, r) => a.has(e) || Qb("Cannot " + r), ia = (e, a, r) => (Pb(e, a, "read from private field"), r ? r.call(e) : a.get(e)), To = (e, a, r) => a.has(e) ? Qb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), Da = (e, a, r, l) => (Pb(e, a, "write to private field"), a.set(e, r), r);
function Ry(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function s_(e = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: l = !1 } = e, s;
  s = a.map(
    (x, S) => y(
      x,
      typeof x == "string" ? null : x.state,
      S === 0 ? "default" : void 0,
      typeof x == "string" ? void 0 : x.mask
    )
  );
  let u = p(
    r ?? s.length - 1
  ), c = "POP", d = null;
  function p(x) {
    return Math.min(Math.max(x, 0), s.length - 1);
  }
  function m() {
    return s[u];
  }
  function y(x, S = null, N, C) {
    let R = mh(
      s ? m().pathname : "/",
      x,
      S,
      N,
      C
    );
    return Yt(
      R.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), R;
  }
  function g(x) {
    return typeof x == "string" ? x : Ua(x);
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
      let S = typeof x == "string" ? Sa(x) : x;
      return {
        pathname: S.pathname || "",
        search: S.search || "",
        hash: S.hash || ""
      };
    },
    push(x, S) {
      c = "PUSH";
      let N = Ry(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, N), l && d && d({ action: c, location: N, delta: 1 });
    },
    replace(x, S) {
      c = "REPLACE";
      let N = Ry(x) ? x : y(x, S);
      s[u] = N, l && d && d({ action: c, location: N, delta: 0 });
    },
    go(x) {
      c = "POP";
      let S = p(u + x), N = s[S];
      u = S, d && d({ action: c, location: N, delta: x });
    },
    listen(x) {
      return d = x, () => {
        d = null;
      };
    }
  };
}
function Fe(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function Yt(e, a) {
  if (!e) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function u_() {
  return Math.random().toString(36).substring(2, 10);
}
function mh(e, a, r = null, l, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Sa(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || u_(),
    mask: s
  };
}
function Ua({
  pathname: e = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function Sa(e) {
  let a = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (a.hash = e.substring(r), e = e.substring(0, r));
    let l = e.indexOf("?");
    l >= 0 && (a.search = e.substring(l), e = e.substring(0, l)), e && (a.pathname = e);
  }
  return a;
}
function c_(e, a, r = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Fe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ua(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Mo, Ty = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (To(this, Mo, /* @__PURE__ */ new Map()), e)
      for (let [a, r] of e)
        this.set(a, r);
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
    if (ia(this, Mo).has(e))
      return ia(this, Mo).get(e);
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
    ia(this, Mo).set(e, a);
  }
};
Mo = /* @__PURE__ */ new WeakMap();
var f_ = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function d_(e) {
  return f_.has(
    e
  );
}
var h_ = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function m_(e) {
  return h_.has(
    e
  );
}
function p_(e) {
  return e.index === !0;
}
function Ho(e, a, r = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...r, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Fe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Fe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), p_(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = My(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = My(
        m,
        a(m)
      ), u.children && (m.children = Ho(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function My(e, a) {
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
function Kb(e, a, r = "/") {
  return ga(e, a, r, !1);
}
function ga(e, a, r, l, s) {
  let u = typeof a == "string" ? Sa(a) : a, c = oa(u.pathname || "/", r);
  if (c == null)
    return null;
  let d = s ?? ku(e), p = null, m = T_(c);
  for (let y = 0; p == null && y < d.length; ++y)
    p = C_(
      d[y],
      m,
      l
    );
  return p;
}
function g_(e, a) {
  let { route: r, pathname: l, params: s } = e;
  return {
    id: r.id,
    pathname: l,
    params: s,
    data: a[r.id],
    loaderData: a[r.id],
    handle: r.handle
  };
}
function ku(e) {
  let a = Jb(e);
  return y_(a), a;
}
function Jb(e, a = [], r = [], l = "", s = !1) {
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
      Fe(
        y.relativePath.startsWith(l),
        `Absolute route path "${y.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(l.length);
    }
    let g = la([l, y.relativePath]), v = r.concat(y);
    c.children && c.children.length > 0 && (Fe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Jb(
      c.children,
      a,
      v,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: __(g, c.index),
      routesMeta: v
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of Wb(c.path))
        u(c, d, !0, p);
  }), a;
}
function Wb(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Wb(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function y_(e) {
  e.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : N_(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var v_ = /^:[\w-]+$/, b_ = 3, x_ = 2, w_ = 1, S_ = 10, E_ = -2, Dy = (e) => e === "*";
function __(e, a) {
  let r = e.split("/"), l = r.length;
  return r.some(Dy) && (l += E_), a && (l += x_), r.filter((s) => !Dy(s)).reduce(
    (s, u) => s + (v_.test(u) ? b_ : u === "" ? w_ : S_),
    l
  );
}
function N_(e, a) {
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
function C_(e, a, r = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", g = Fu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), v = p.route;
    if (!g && m && r && !l[l.length - 1].route.index && (g = Fu(
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
      pathname: la([u, g.pathname]),
      pathnameBase: A_(
        la([u, g.pathnameBase])
      ),
      route: v
    }), g.pathnameBase !== "/" && (u = la([u, g.pathnameBase]));
  }
  return c;
}
function Fu(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, l] = R_(
    e.path,
    e.caseSensitive,
    e.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: l.reduce(
      (m, { paramName: y, isOptional: g }, v) => {
        if (y === "*") {
          let S = d[v] || "";
          c = u.slice(0, u.length - S.length).replace(/(.)\/+$/, "$1");
        }
        const x = d[v];
        return g && !x ? m[y] = void 0 : m[y] = (x || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: e
  };
}
function R_(e, a = !1, r = !0) {
  Yt(
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
  return e.endsWith("*") ? (l.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function T_(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Yt(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), e;
  }
}
function oa(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, l = e.charAt(r);
  return l && l !== "/" ? null : e.slice(r) || "/";
}
function M_({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : la([e, a]);
}
var e1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Zh = (e) => e1.test(e);
function D_(e, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Sa(e) : e, u;
  return r ? (r = Ph(r), r.startsWith("/") ? u = Ay(r.substring(1), "/") : u = Ay(r, a)) : u = a, {
    pathname: u,
    search: z_(l),
    hash: O_(s)
  };
}
function Ay(e, a) {
  let r = Zu(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Vd(e, a, r, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function t1(e) {
  return e.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Qh(e) {
  let a = t1(e);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function oc(e, a, r, l = !1) {
  let s;
  typeof e == "string" ? s = Sa(e) : (s = { ...e }, Fe(
    !s.pathname || !s.pathname.includes("?"),
    Vd("?", "pathname", "search", s)
  ), Fe(
    !s.pathname || !s.pathname.includes("#"),
    Vd("#", "pathname", "hash", s)
  ), Fe(
    !s.search || !s.search.includes("#"),
    Vd("#", "search", "hash", s)
  ));
  let u = e === "" || s.pathname === "", c = u ? "/" : s.pathname, d;
  if (c == null)
    d = r;
  else {
    let g = a.length - 1;
    if (!l && c.startsWith("..")) {
      let v = c.split("/");
      for (; v[0] === ".."; )
        v.shift(), g -= 1;
      s.pathname = v.join("/");
    }
    d = g >= 0 ? a[g] : "/";
  }
  let p = D_(s, d), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var Ph = (e) => e.replace(/\/\/+/g, "/"), la = (e) => Ph(e.join("/")), Zu = (e) => e.replace(/\/+$/, ""), A_ = (e) => Zu(e).replace(/^\/*/, "/"), z_ = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, O_ = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, zy = (e, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", e), new Response(null, { ...r, headers: l });
}, sc = class {
  constructor(e, a, r, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function ko(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function Qo(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return la(a) || "/";
}
var n1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function a1(e, a) {
  let r = e;
  if (typeof r != "string" || !e1.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (n1)
    try {
      let u = new URL(window.location.href), c = r.startsWith("//") ? new URL(u.protocol + r) : new URL(r), d = oa(c.pathname, a);
      c.origin === u.origin && d != null ? r = d + c.search + c.hash : s = !0;
    } catch {
      Yt(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: l,
    isExternal: s,
    to: r
  };
}
var Fi = Symbol("Uninstrumented");
function j_(e, a) {
  let r = {
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
        let c = Object.keys(r);
        for (let d of c)
          u[d] && r[d].push(u[d]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let s = hl(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = r[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = hl(d, c, () => {
        });
        p && (l.lazy = Object.assign(l.lazy || {}, {
          [u]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && r[s].length > 0) {
      let c = u[Fi] ?? u, d = hl(
        r[s],
        c,
        (...p) => Oy(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[Fi] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Fi] ?? s, c = hl(
      r.middleware,
      u,
      (...d) => Oy(d[0])
    );
    return c ? (c[Fi] = u, c) : s;
  })), l;
}
function L_(e, a) {
  let r = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (l) => l({
      instrument(s) {
        let u = Object.keys(s);
        for (let c of u)
          s[c] && r[c].push(s[c]);
      }
    })
  ), r.navigate.length > 0) {
    let l = e.navigate[Fi] ?? e.navigate, s = hl(
      r.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? Ua(c) : ".",
          ...jy(e, d ?? {})
        };
      }
    );
    s && (s[Fi] = l, e.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = e.fetch[Fi] ?? e.fetch, s = hl(r.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...jy(e, p ?? {})
      };
    });
    s && (s[Fi] = l, e.fetch = s);
  }
  return e;
}
function hl(e, a, r) {
  return e.length === 0 ? null : async (...l) => {
    let s = await i1(
      e,
      r(...l),
      () => a(...l),
      e.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function i1(e, a, r, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = i1(e, a, r, l - 1), u = await c, Fe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(d, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    c || await d(), await c;
  } else
    try {
      u = { type: "success", value: await r() };
    } catch (c) {
      u = { type: "error", value: c };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Oy(e) {
  let { request: a, context: r, params: l, pattern: s } = e;
  return {
    request: H_(a),
    params: { ...l },
    pattern: s,
    context: k_(r)
  };
}
function jy(e, a) {
  return {
    currentUrl: Ua(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function H_(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function k_(e) {
  if (U_(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var B_ = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function U_(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === B_;
}
var r1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], V_ = new Set(
  r1
), q_ = [
  "GET",
  ...r1
], $_ = new Set(q_), l1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Y_ = /* @__PURE__ */ new Set([307, 308]), qd = {
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
}, I_ = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, So = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, G_ = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), o1 = "remix-router-transitions", s1 = Symbol("ResetLoaderData"), pr, cl, Ii, fl, X_ = class {
  constructor(e) {
    To(this, pr), To(this, cl), To(this, Ii), To(this, fl), Da(this, pr, e), Da(this, cl, ku(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return ia(this, pr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return ia(this, Ii) ?? ia(this, pr);
  }
  /** Pre-computed branches */
  get branches() {
    return ia(this, fl) ?? ia(this, cl);
  }
  get hasHMRRoutes() {
    return ia(this, Ii) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Da(this, pr, e), Da(this, cl, ku(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Da(this, Ii, e), Da(this, fl, ku(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    ia(this, Ii) && (Da(this, pr, ia(this, Ii)), Da(this, cl, ia(this, fl)), Da(this, Ii, void 0), Da(this, fl, void 0));
  }
};
pr = /* @__PURE__ */ new WeakMap();
cl = /* @__PURE__ */ new WeakMap();
Ii = /* @__PURE__ */ new WeakMap();
fl = /* @__PURE__ */ new WeakMap();
function F_(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Fe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || G_, u = s;
  if (e.instrumentations) {
    let U = e.instrumentations;
    u = (Q) => ({
      ...s(Q),
      ...j_(
        U.map((W) => W.route).filter(Boolean),
        Q
      )
    });
  }
  let c = {}, d = new X_(
    Ho(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || J_, y = {
    ...e.future
  }, g = null, v = /* @__PURE__ */ new Set(), x = null, S = null, N = null, C = null, R = e.hydrationData != null, z = ga(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), E = !1, O = null, k, B;
  if (z == null && !e.patchRoutesOnNavigation) {
    let U = ra(404, {
      pathname: e.history.location.pathname
    }), { matches: Q, route: W } = gu(d.activeRoutes);
    k = !0, B = !k, z = Q, O = { [W.id]: U };
  } else if (z && !e.hydrationData && mn(
    z,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (z = null), z)
    if (z.some((U) => U.route.lazy))
      k = !1, B = !k;
    else if (!z.some((U) => Kh(U.route)))
      k = !0, B = !k;
    else {
      let U = e.hydrationData ? e.hydrationData.loaderData : null, Q = e.hydrationData ? e.hydrationData.errors : null, W = z;
      if (Q) {
        let de = z.findIndex(
          (pe) => Q[pe.route.id] !== void 0
        );
        W = W.slice(0, de + 1);
      }
      B = !1, k = !0, W.forEach((de) => {
        let pe = u1(de.route, U, Q);
        B = B || pe.renderFallback, k = k && !pe.shouldLoad;
      });
    }
  else {
    k = !1, B = !k, z = [];
    let U = mn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    U.active && U.matches && (E = !0, z = U.matches);
  }
  let V, A = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: z,
    initialized: k,
    renderFallback: B,
    navigation: qd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Y = "POP", te = null, $ = !1, K, le = !1, j = /* @__PURE__ */ new Map(), I = null, T = !1, L = !1, F = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), Z = 0, D = -1, H = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), me = /* @__PURE__ */ new Map(), ee, ge = null;
  function ze() {
    if (g = e.history.listen(
      ({ action: U, location: Q, delta: W }) => {
        if (ee) {
          ee(), ee = void 0;
          return;
        }
        Yt(
          me.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = Fn({
          currentLocation: A.location,
          nextLocation: Q,
          historyAction: U
        });
        if (de && W != null) {
          let pe = new Promise((Ee) => {
            ee = Ee;
          });
          e.history.go(W * -1), On(de, {
            state: "blocked",
            location: Q,
            proceed() {
              On(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Q
              }), pe.then(() => e.history.go(W));
            },
            reset() {
              let Ee = new Map(A.blockers);
              Ee.set(de, So), xe({ blockers: Ee });
            }
          }), te?.resolve(), te = null;
          return;
        }
        return Te(U, Q);
      }
    ), r) {
      g2(a, j);
      let U = () => y2(a, j);
      a.addEventListener("pagehide", U), I = () => a.removeEventListener("pagehide", U);
    }
    return A.initialized || Te("POP", A.location, {
      initialHydration: !0
    }), V;
  }
  function Re() {
    g && g(), I && I(), v.clear(), K && K.abort(), A.fetchers.forEach((U, Q) => tn(A.fetchers, Q)), A.blockers.forEach((U, Q) => ua(Q));
  }
  function Se(U) {
    if (v.add(U), x) {
      let { newErrors: Q } = x;
      x = null, U(A, {
        deletedFetchers: [],
        newErrors: Q,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(U);
  }
  function xe(U, Q = {}) {
    U.matches && (U.matches = U.matches.map((pe) => {
      let Ee = c[pe.route.id], ve = pe.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...pe,
        route: Ee
      } : pe;
    })), A = {
      ...A,
      ...U
    };
    let W = [], de = [];
    A.fetchers.forEach((pe, Ee) => {
      pe.state === "idle" && (he.has(Ee) ? W.push(Ee) : de.push(Ee));
    }), he.forEach((pe) => {
      !A.fetchers.has(pe) && !G.has(pe) && W.push(pe);
    }), v.size === 0 && (x = { newErrors: U.errors ?? null }), [...v].forEach(
      (pe) => pe(A, {
        deletedFetchers: W,
        newErrors: U.errors ?? null,
        viewTransitionOpts: Q.viewTransitionOpts,
        flushSync: Q.flushSync === !0
      })
    ), W.forEach((pe) => tn(A.fetchers, pe)), de.forEach((pe) => A.fetchers.delete(pe));
  }
  function Ce(U, Q, { flushSync: W } = {}) {
    let de = A.actionData != null && A.navigation.formMethod != null && dn(A.navigation.formMethod) && A.navigation.state === "loading" && U.state?._isRedirect !== !0, pe;
    Q.actionData ? Object.keys(Q.actionData).length > 0 ? pe = Q.actionData : pe = null : de ? pe = A.actionData : pe = null;
    let Ee = Q.loaderData ? Gy(
      A.loaderData,
      Q.loaderData,
      Q.matches || [],
      Q.errors
    ) : A.loaderData, ve = A.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((De, Ue) => ve.set(Ue, So)));
    let we = T ? !1 : Vt(U, Q.matches || A.matches), be = $ === !0 || A.navigation.formMethod != null && dn(A.navigation.formMethod) && U.state?._isRedirect !== !0;
    d.commitHmrRoutes(), T || Y === "POP" || (Y === "PUSH" ? e.history.push(U, U.state) : Y === "REPLACE" && e.history.replace(U, U.state));
    let Me;
    if (Y === "POP") {
      let De = j.get(A.location.pathname);
      De && De.has(U.pathname) ? Me = {
        currentLocation: A.location,
        nextLocation: U
      } : j.has(U.pathname) && (Me = {
        currentLocation: U,
        nextLocation: A.location
      });
    } else if (le) {
      let De = j.get(A.location.pathname);
      De ? De.add(U.pathname) : (De = /* @__PURE__ */ new Set([U.pathname]), j.set(A.location.pathname, De)), Me = {
        currentLocation: A.location,
        nextLocation: U
      };
    }
    xe(
      {
        ...Q,
        // matches, errors, fetchers go through as-is
        actionData: pe,
        loaderData: Ee,
        historyAction: Y,
        location: U,
        initialized: !0,
        renderFallback: !1,
        navigation: qd,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Me,
        flushSync: W === !0
      }
    ), Y = "POP", $ = !1, le = !1, T = !1, L = !1, te?.resolve(), te = null, ge?.resolve(), ge = null;
  }
  async function $e(U, Q) {
    if (te?.resolve(), te = null, typeof U == "number") {
      te || (te = Qy());
      let rt = te.promise;
      return e.history.go(U), rt;
    }
    let W = ph(
      A.location,
      A.matches,
      p,
      U,
      Q?.fromRouteId,
      Q?.relative
    ), { path: de, submission: pe, error: Ee } = Ly(
      !1,
      W,
      Q
    ), ve;
    Q?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Q.mask == "string" ? Sa(Q.mask) : {
        ...A.location.mask,
        ...Q.mask
      }
    });
    let we = A.location, be = mh(
      we,
      de,
      Q && Q.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...e.history.encodeLocation(be)
    };
    let Me = Q && Q.replace != null ? Q.replace : void 0, De = "PUSH";
    Me === !0 ? De = "REPLACE" : Me === !1 || pe != null && dn(pe.formMethod) && pe.formAction === A.location.pathname + A.location.search && (De = "REPLACE");
    let Ue = Q && "preventScrollReset" in Q ? Q.preventScrollReset === !0 : void 0, je = (Q && Q.flushSync) === !0, Ge = Fn({
      currentLocation: we,
      nextLocation: be,
      historyAction: De
    });
    if (Ge) {
      On(Ge, {
        state: "blocked",
        location: be,
        proceed() {
          On(Ge, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), $e(U, Q);
        },
        reset() {
          let rt = new Map(A.blockers);
          rt.set(Ge, So), xe({ blockers: rt });
        }
      });
      return;
    }
    await Te(De, be, {
      submission: pe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: Ue,
      replace: Q && Q.replace,
      enableViewTransition: Q && Q.viewTransition,
      flushSync: je,
      callSiteDefaultShouldRevalidate: Q && Q.defaultShouldRevalidate
    });
  }
  function ft() {
    ge || (ge = Qy()), Lt(), xe({ revalidation: "loading" });
    let U = ge.promise;
    return A.navigation.state === "submitting" ? U : A.navigation.state === "idle" ? (Te(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), U) : (Te(
      Y || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: le === !0
      }
    ), U);
  }
  async function Te(U, Q, W) {
    K && K.abort(), K = null, Y = U, T = (W && W.startUninterruptedRevalidation) === !0, Ht(A.location, A.matches), $ = (W && W.preventScrollReset) === !0, le = (W && W.enableViewTransition) === !0;
    let de = d.activeRoutes, pe = W?.initialHydration && A.matches && A.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : ga(
      de,
      Q,
      p,
      !1,
      d.branches
    ), Ee = (W && W.flushSync) === !0;
    if (pe && A.initialized && !L && l2(A.location, Q) && !(W && W.submission && dn(W.submission.formMethod))) {
      Ce(Q, { matches: pe }, { flushSync: Ee });
      return;
    }
    let ve = mn(pe, de, Q.pathname);
    if (ve.active && ve.matches && (pe = ve.matches), !pe) {
      let { error: st, notFoundMatches: We, route: jt } = un(
        Q.pathname
      );
      Ce(
        Q,
        {
          matches: We,
          loaderData: {},
          errors: {
            [jt.id]: st
          }
        },
        { flushSync: Ee }
      );
      return;
    }
    let we = W && W.overrideNavigation ? {
      ...W.overrideNavigation,
      matches: pe,
      historyAction: U
    } : void 0;
    K = new AbortController();
    let be = dl(
      e.history,
      Q,
      K.signal,
      W && W.submission
    ), Me = e.getContext ? await e.getContext() : new Ty(), De;
    if (W && W.pendingError)
      De = [
        Gi(pe).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && dn(W.submission.formMethod)) {
      let st = await Xe(
        be,
        Q,
        W.submission,
        pe,
        U,
        Me,
        ve.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, jt] = st.pendingActionResult;
        if (Yn(jt) && ko(jt.error) && jt.error.status === 404) {
          K = null, Ce(Q, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [We]: jt.error
            }
          });
          return;
        }
      }
      pe = st.matches || pe, De = st.pendingActionResult, we = $d(
        Q,
        pe,
        U,
        W.submission
      ), Ee = !1, ve.active = !1, be = dl(
        e.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: Ue,
      matches: je,
      loaderData: Ge,
      errors: rt,
      workingFetchers: Ct
    } = await ke(
      be,
      Q,
      pe,
      U,
      Me,
      ve.active,
      we,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ee,
      De,
      W && W.callSiteDefaultShouldRevalidate
    );
    Ue || (K = null, Ce(Q, {
      matches: je || pe,
      ...Xy(De),
      loaderData: Ge,
      errors: rt,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function Xe(U, Q, W, de, pe, Ee, ve, we, be = {}) {
    Lt();
    let Me = m2(
      Q,
      de,
      pe,
      W
    );
    if (xe({ navigation: Me }, { flushSync: be.flushSync === !0 }), ve) {
      let je = await pt(
        de,
        Q.pathname,
        U.signal
      );
      if (je.type === "aborted")
        return { shortCircuited: !0 };
      if (je.type === "error") {
        if (je.partialMatches.length === 0) {
          let { matches: rt, route: Ct } = gu(
            d.activeRoutes
          );
          return {
            matches: rt,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: je.error
              }
            ]
          };
        }
        let Ge = Gi(je.partialMatches).route.id;
        return {
          matches: je.partialMatches,
          pendingActionResult: [
            Ge,
            {
              type: "error",
              error: je.error
            }
          ]
        };
      } else if (je.matches)
        de = je.matches;
      else {
        let { notFoundMatches: Ge, error: rt, route: Ct } = un(
          Q.pathname
        );
        return {
          matches: Ge,
          pendingActionResult: [
            Ct.id,
            {
              type: "error",
              error: rt
            }
          ]
        };
      }
    }
    let De, Ue = Bu(de, Q);
    if (!Ue.route.action && !Ue.route.lazy)
      De = {
        type: "error",
        error: ra(405, {
          method: U.method,
          pathname: Q.pathname,
          routeId: Ue.route.id
        })
      };
    else {
      let je = gl(
        u,
        c,
        U,
        Q,
        de,
        Ue,
        we ? [] : l,
        Ee
      ), Ge = await yt(
        U,
        Q,
        je,
        Ee,
        null
      );
      if (De = Ge[Ue.route.id], !De) {
        for (let rt of de)
          if (Ge[rt.route.id]) {
            De = Ge[rt.route.id];
            break;
          }
      }
      if (U.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (yr(De)) {
      let je;
      return be && be.replace != null ? je = be.replace : je = $y(
        De.response.headers.get("Location"),
        new URL(U.url),
        p,
        e.history
      ) === A.location.pathname + A.location.search, await gt(U, De, !0, {
        submission: W,
        replace: je
      }), { shortCircuited: !0 };
    }
    if (Yn(De)) {
      let je = Gi(de, Ue.route.id);
      return (be && be.replace) !== !0 && (Y = "PUSH"), {
        matches: de,
        pendingActionResult: [
          je.route.id,
          De,
          Ue.route.id
        ]
      };
    }
    return {
      matches: de,
      pendingActionResult: [Ue.route.id, De]
    };
  }
  async function ke(U, Q, W, de, pe, Ee, ve, we, be, Me, De, Ue, je, Ge) {
    let rt = ve || $d(Q, W, de, we), Ct = we || be || Zy(rt), st = !T && !De;
    if (Ee) {
      if (st) {
        let bt = Ye(je);
        xe(
          {
            navigation: rt,
            ...bt !== void 0 ? { actionData: bt } : {}
          },
          {
            flushSync: Ue
          }
        );
      }
      let Be = await pt(
        W,
        Q.pathname,
        U.signal
      );
      if (Be.type === "aborted")
        return { shortCircuited: !0 };
      if (Be.type === "error") {
        if (Be.partialMatches.length === 0) {
          let { matches: pn, route: Ln } = gu(
            d.activeRoutes
          );
          return {
            matches: pn,
            loaderData: {},
            errors: {
              [Ln.id]: Be.error
            }
          };
        }
        let bt = Gi(Be.partialMatches).route.id;
        return {
          matches: Be.partialMatches,
          loaderData: {},
          errors: {
            [bt]: Be.error
          }
        };
      } else if (Be.matches)
        W = Be.matches;
      else {
        let { error: bt, notFoundMatches: pn, route: Ln } = un(
          Q.pathname
        );
        return {
          matches: pn,
          loaderData: {},
          errors: {
            [Ln.id]: bt
          }
        };
      }
    }
    let We = d.activeRoutes, { dsMatches: jt, revalidatingFetchers: at } = Hy(
      U,
      pe,
      u,
      c,
      e.history,
      A,
      W,
      Ct,
      Q,
      De ? [] : l,
      De === !0,
      L,
      F,
      he,
      ne,
      P,
      We,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      je,
      Ge
    );
    if (D = ++Z, !e.dataStrategy && !jt.some((Be) => Be.shouldLoad) && !jt.some(
      (Be) => Be.route.middleware && Be.route.middleware.length > 0
    ) && at.length === 0) {
      let Be = new Map(A.fetchers), bt = mi(Be);
      return Ce(
        Q,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: je && Yn(je[1]) ? { [je[0]]: je[1].error } : null,
          ...Xy(je),
          ...bt ? { fetchers: Be } : {}
        },
        { flushSync: Ue }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let Be = {};
      if (!Ee) {
        Be.navigation = rt;
        let bt = Ye(je);
        bt !== void 0 && (Be.actionData = bt);
      }
      at.length > 0 && (Be.fetchers = St(at)), xe(Be, { flushSync: Ue });
    }
    at.forEach((Be) => {
      Ot(Be.key), Be.controller && G.set(Be.key, Be.controller);
    });
    let Na = () => at.forEach((Be) => Ot(Be.key));
    K && K.signal.addEventListener(
      "abort",
      Na
    );
    let { loaderResults: jn, fetcherResults: cn } = await It(
      jt,
      at,
      U,
      Q,
      pe
    );
    if (U.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      Na
    ), at.forEach((Be) => G.delete(Be.key));
    let nn = yu(jn);
    if (nn)
      return await gt(U, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    if (nn = yu(cn), nn)
      return P.add(nn.key), await gt(U, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    let Sn = new Map(A.fetchers), { loaderData: pi, errors: En } = Iy(
      A,
      W,
      jn,
      je,
      at,
      cn,
      Sn
    );
    De && A.errors && (En = { ...A.errors, ...En });
    let gi = mi(Sn), fa = _a(
      D,
      Sn
    ), da = gi || fa || at.length > 0;
    return {
      matches: W,
      loaderData: pi,
      errors: En,
      ...da ? { workingFetchers: Sn } : {}
    };
  }
  function Ye(U) {
    if (U && !Yn(U[1]))
      return {
        [U[0]]: U[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function St(U) {
    let Q = new Map(A.fetchers);
    return U.forEach((W) => {
      let de = Q.get(W.key), pe = Eo(
        void 0,
        de ? de.data : void 0
      );
      Q.set(W.key, pe);
    }), Q;
  }
  async function Je(U, Q, W, de) {
    Ot(U);
    let pe = (de && de.flushSync) === !0, Ee = d.activeRoutes, ve = ph(
      A.location,
      A.matches,
      p,
      W,
      Q,
      de?.relative
    ), we = ga(
      Ee,
      ve,
      p,
      !1,
      d.branches
    ), be = mn(we, Ee, ve);
    if (be.active && be.matches && (we = be.matches), !we) {
      ot(
        U,
        Q,
        ra(404, { pathname: ve }),
        { flushSync: pe }
      );
      return;
    }
    let { path: Me, submission: De, error: Ue } = Ly(
      !0,
      ve,
      de
    );
    if (Ue) {
      ot(U, Q, Ue, { flushSync: pe });
      return;
    }
    let je = e.getContext ? await e.getContext() : new Ty(), Ge = (de && de.preventScrollReset) === !0;
    if (De && dn(De.formMethod)) {
      await Ze(
        U,
        Q,
        Me,
        we,
        je,
        be.active,
        pe,
        Ge,
        De,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    ne.set(U, { routeId: Q, path: Me }), await Qe(
      U,
      Q,
      Me,
      we,
      je,
      be.active,
      pe,
      Ge,
      De
    );
  }
  async function Ze(U, Q, W, de, pe, Ee, ve, we, be, Me) {
    Lt(), ne.delete(U);
    let De = A.fetchers.get(U);
    mt(U, p2(be, De), {
      flushSync: ve
    });
    let Ue = new AbortController(), je = dl(
      e.history,
      W,
      Ue.signal,
      be
    );
    if (Ee) {
      let dt = await pt(
        de,
        new URL(je.url).pathname,
        je.signal,
        U
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(U, Q, dt.error, { flushSync: ve });
        return;
      } else if (dt.matches)
        de = dt.matches;
      else {
        ot(
          U,
          Q,
          ra(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ge = Bu(de, W);
    if (!Ge.route.action && !Ge.route.lazy) {
      let dt = ra(405, {
        method: be.formMethod,
        pathname: W,
        routeId: Q
      });
      ot(U, Q, dt, { flushSync: ve });
      return;
    }
    G.set(U, Ue);
    let rt = Z, Ct = gl(
      u,
      c,
      je,
      W,
      de,
      Ge,
      l,
      pe
    ), st = await yt(
      je,
      W,
      Ct,
      pe,
      U
    ), We = st[Ge.route.id];
    if (!We) {
      for (let dt of Ct)
        if (st[dt.route.id]) {
          We = st[dt.route.id];
          break;
        }
    }
    if (je.signal.aborted) {
      G.get(U) === Ue && G.delete(U);
      return;
    }
    if (he.has(U)) {
      if (yr(We) || Yn(We)) {
        mt(U, za(void 0));
        return;
      }
    } else {
      if (yr(We))
        if (G.delete(U), D > rt) {
          mt(U, za(void 0));
          return;
        } else
          return P.add(U), mt(U, Eo(be)), gt(je, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: we
          });
      if (Yn(We)) {
        ot(U, Q, We.error);
        return;
      }
    }
    let jt = A.navigation.location || A.location, at = dl(
      e.history,
      jt,
      Ue.signal
    ), Na = d.activeRoutes, jn = A.navigation.state !== "idle" ? ga(
      Na,
      A.navigation.location,
      p,
      !1,
      d.branches
    ) : A.matches;
    Fe(jn, "Didn't find any matches after fetcher action");
    let cn = ++Z;
    H.set(U, cn);
    let { dsMatches: nn, revalidatingFetchers: Sn } = Hy(
      at,
      pe,
      u,
      c,
      e.history,
      A,
      jn,
      be,
      jt,
      l,
      !1,
      L,
      F,
      he,
      ne,
      P,
      Na,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Ge.route.id, We],
      Me
    ), pi = Eo(be, We.data), En = new Map(A.fetchers);
    En.set(U, pi), Sn.filter((dt) => dt.key !== U).forEach((dt) => {
      let Zn = dt.key, an = En.get(Zn), Qi = Eo(
        void 0,
        an ? an.data : void 0
      );
      En.set(Zn, Qi), Ot(Zn), dt.controller && G.set(Zn, dt.controller);
    }), xe({ fetchers: En });
    let gi = () => Sn.forEach((dt) => Ot(dt.key));
    Ue.signal.addEventListener(
      "abort",
      gi
    );
    let { loaderResults: fa, fetcherResults: da } = await It(
      nn,
      Sn,
      at,
      jt,
      pe
    );
    if (Ue.signal.aborted)
      return;
    Ue.signal.removeEventListener(
      "abort",
      gi
    ), H.delete(U), G.delete(U), Sn.forEach((dt) => G.delete(dt.key));
    let Be = A.fetchers.has(U), bt = (dt) => {
      if (!Be) return dt;
      let Zn = new Map(dt.fetchers);
      return Zn.set(U, za(We.data)), { ...dt, fetchers: Zn };
    }, pn = yu(fa);
    if (pn)
      return A = bt(A), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: we }
      );
    if (pn = yu(da), pn)
      return P.add(pn.key), A = bt(A), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: we }
      );
    let Ln = new Map(A.fetchers);
    Be && Ln.set(U, za(We.data));
    let { loaderData: yi, errors: $a } = Iy(
      A,
      jn,
      fa,
      void 0,
      Sn,
      da,
      Ln
    );
    _a(cn, Ln), A.navigation.state === "loading" && cn > D ? (Fe(Y, "Expected pending action"), K && K.abort(), Ce(A.navigation.location, {
      matches: jn,
      loaderData: yi,
      errors: $a,
      fetchers: Ln
    })) : (xe({
      errors: $a,
      loaderData: Gy(
        A.loaderData,
        yi,
        jn,
        $a
      ),
      fetchers: Ln
    }), L = !1);
  }
  async function Qe(U, Q, W, de, pe, Ee, ve, we, be) {
    let Me = A.fetchers.get(U);
    mt(
      U,
      Eo(
        be,
        Me ? Me.data : void 0
      ),
      { flushSync: ve }
    );
    let De = new AbortController(), Ue = dl(
      e.history,
      W,
      De.signal
    );
    if (Ee) {
      let We = await pt(
        de,
        new URL(Ue.url).pathname,
        Ue.signal,
        U
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        ot(U, Q, We.error, { flushSync: ve });
        return;
      } else if (We.matches)
        de = We.matches;
      else {
        ot(
          U,
          Q,
          ra(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let je = Bu(de, W);
    G.set(U, De);
    let Ge = Z, rt = gl(
      u,
      c,
      Ue,
      W,
      de,
      je,
      l,
      pe
    ), Ct = await yt(
      Ue,
      W,
      rt,
      pe,
      U
    ), st = Ct[je.route.id];
    if (!st) {
      for (let We of de)
        if (Ct[We.route.id]) {
          st = Ct[We.route.id];
          break;
        }
    }
    if (G.get(U) === De && G.delete(U), !Ue.signal.aborted) {
      if (he.has(U)) {
        mt(U, za(void 0));
        return;
      }
      if (yr(st))
        if (D > Ge) {
          mt(U, za(void 0));
          return;
        } else {
          P.add(U), await gt(Ue, st, !1, {
            preventScrollReset: we
          });
          return;
        }
      if (Yn(st)) {
        ot(U, Q, st.error);
        return;
      }
      mt(U, za(st.data));
    }
  }
  async function gt(U, Q, W, {
    submission: de,
    fetcherSubmission: pe,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    W || (te?.resolve(), te = null), Q.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let we = Q.response.headers.get("Location");
    Fe(we, "Expected a Location header on the redirect Response"), we = $y(
      we,
      new URL(U.url),
      p,
      e.history
    );
    let be = mh(A.location, we, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Q.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (Zh(we)) {
        const Ct = c_(a, we, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        oa(Ct.pathname, p) == null;
      }
      if (rt) {
        ve ? a.location.replace(we) : a.location.assign(we);
        return;
      }
    }
    K = null;
    let Me = ve === !0 || Q.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: Ue, formEncType: je } = A.navigation;
    !de && !pe && De && Ue && je && (de = Zy(A.navigation));
    let Ge = de || pe;
    if (Y_.has(Q.response.status) && Ge && dn(Ge.formMethod))
      await Te(Me, be, {
        submission: {
          ...Ge,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? le : void 0
      });
    else {
      let rt = $d(
        be,
        [],
        Me,
        de
      );
      await Te(Me, be, {
        overrideNavigation: rt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: pe,
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? le : void 0
      });
    }
  }
  async function yt(U, Q, W, de, pe) {
    let Ee, ve = {};
    try {
      Ee = await e2(
        m,
        U,
        Q,
        W,
        pe,
        de,
        !1
      );
    } catch (we) {
      return W.filter((be) => be.shouldLoad).forEach((be) => {
        ve[be.route.id] = {
          type: "error",
          error: we
        };
      }), ve;
    }
    if (U.signal.aborted)
      return ve;
    if (!dn(U.method))
      for (let we of W) {
        if (Ee[we.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(we.route.id) && !A.loaderData.hasOwnProperty(we.route.id) && (!A.errors || !A.errors.hasOwnProperty(we.route.id)) && we.shouldCallHandler() && (Ee[we.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${we.route.id}`
          )
        });
      }
    for (let [we, be] of Object.entries(Ee))
      if (c2(be)) {
        let Me = be.result;
        ve[we] = {
          type: "redirect",
          response: i2(
            Me,
            U,
            we,
            W,
            p
          )
        };
      } else
        ve[we] = await a2(be);
    return ve;
  }
  async function It(U, Q, W, de, pe) {
    let Ee = yt(
      W,
      de,
      U,
      pe,
      null
    ), ve = Promise.all(
      Q.map(async (Me) => {
        if (Me.matches && Me.match && Me.request && Me.controller) {
          let Ue = (await yt(
            Me.request,
            Me.path,
            Me.matches,
            pe,
            Me.key
          ))[Me.match.route.id];
          return { [Me.key]: Ue };
        } else
          return Promise.resolve({
            [Me.key]: {
              type: "error",
              error: ra(404, {
                pathname: Me.path
              })
            }
          });
      })
    ), we = await Ee, be = (await ve).reduce(
      (Me, De) => Object.assign(Me, De),
      {}
    );
    return {
      loaderResults: we,
      fetcherResults: be
    };
  }
  function Lt() {
    L = !0, ne.forEach((U, Q) => {
      G.has(Q) && F.add(Q), Ot(Q);
    });
  }
  function mt(U, Q, W = {}) {
    let de = new Map(A.fetchers);
    de.set(U, Q), xe(
      { fetchers: de },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function ot(U, Q, W, de = {}) {
    let pe = Gi(A.matches, Q), Ee = new Map(A.fetchers);
    tn(Ee, U), xe(
      {
        errors: {
          [pe.route.id]: W
        },
        fetchers: Ee
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function Xn(U) {
    return se.set(U, (se.get(U) || 0) + 1), he.has(U) && he.delete(U), A.fetchers.get(U) || I_;
  }
  function xn(U, Q) {
    Ot(U, Q?.reason), mt(U, za(null));
  }
  function tn(U, Q) {
    let W = A.fetchers.get(Q);
    G.has(Q) && !(W && W.state === "loading" && H.has(Q)) && Ot(Q), ne.delete(Q), H.delete(Q), P.delete(Q), he.delete(Q), F.delete(Q), U.delete(Q);
  }
  function Pt(U) {
    let Q = (se.get(U) || 0) - 1;
    Q <= 0 ? (se.delete(U), he.add(U)) : se.set(U, Q), xe({ fetchers: new Map(A.fetchers) });
  }
  function Ot(U, Q) {
    let W = G.get(U);
    W && (W.abort(Q), G.delete(U));
  }
  function Ut(U, Q) {
    for (let W of U) {
      let de = Q.get(W);
      Fe(de, `Expected fetcher: ${W}`);
      let pe = za(de.data);
      Q.set(W, pe);
    }
  }
  function mi(U) {
    let Q = [], W = !1;
    for (let de of P) {
      let pe = U.get(de);
      Fe(pe, `Expected fetcher: ${de}`), pe.state === "loading" && (P.delete(de), Q.push(de), W = !0);
    }
    return Ut(Q, U), W;
  }
  function _a(U, Q) {
    let W = [];
    for (let [de, pe] of H)
      if (pe < U) {
        let Ee = Q.get(de);
        Fe(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Ot(de), H.delete(de), W.push(de));
      }
    return Ut(W, Q), W.length > 0;
  }
  function wn(U, Q) {
    let W = A.blockers.get(U) || So;
    return me.get(U) !== Q && me.set(U, Q), W;
  }
  function ua(U) {
    A.blockers.delete(U), me.delete(U);
  }
  function On(U, Q) {
    let W = A.blockers.get(U) || So;
    Fe(
      W.state === "unblocked" && Q.state === "blocked" || W.state === "blocked" && Q.state === "blocked" || W.state === "blocked" && Q.state === "proceeding" || W.state === "blocked" && Q.state === "unblocked" || W.state === "proceeding" && Q.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${Q.state}`
    );
    let de = new Map(A.blockers);
    de.set(U, Q), xe({ blockers: de });
  }
  function Fn({
    currentLocation: U,
    nextLocation: Q,
    historyAction: W
  }) {
    if (me.size === 0)
      return;
    me.size > 1 && Yt(!1, "A router only supports one blocker at a time");
    let de = Array.from(me.entries()), [pe, Ee] = de[de.length - 1], ve = A.blockers.get(pe);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: U, nextLocation: Q, historyAction: W }))
      return pe;
  }
  function un(U) {
    let Q = ra(404, { pathname: U }), W = d.activeRoutes, { matches: de, route: pe } = gu(W);
    return { notFoundMatches: de, route: pe, error: Q };
  }
  function He(U, Q, W) {
    if (S = U, C = Q, N = W || null, !R && A.navigation === qd) {
      R = !0;
      let de = Vt(A.location, A.matches);
      de != null && xe({ restoreScrollPosition: de });
    }
    return () => {
      S = null, C = null, N = null;
    };
  }
  function vt(U, Q) {
    return N && N(
      U,
      Q.map((de) => g_(de, A.loaderData))
    ) || U.key;
  }
  function Ht(U, Q) {
    if (S && C) {
      let W = vt(U, Q);
      S[W] = C();
    }
  }
  function Vt(U, Q) {
    if (S) {
      let W = vt(U, Q), de = S[W];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function mn(U, Q, W) {
    if (e.patchRoutesOnNavigation) {
      let de = d.branches;
      if (U) {
        if (Object.keys(U[0].params).length > 0)
          return { active: !0, matches: ga(
            Q,
            W,
            p,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: ga(
          Q,
          W,
          p,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(U, Q, W, de) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: U };
    let pe = U;
    for (; ; ) {
      let Ee = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: W,
          path: Q,
          matches: pe,
          fetcherKey: de,
          patch: (Me, De) => {
            W.aborted || ky(
              Me,
              De,
              d,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Me) {
        return { type: "error", error: Me, partialMatches: pe };
      }
      if (W.aborted)
        return { type: "aborted" };
      let ve = d.branches, we = ga(
        d.activeRoutes,
        Q,
        p,
        !1,
        ve
      ), be = null;
      if (we) {
        if (Object.keys(we[0].params).length === 0)
          return { type: "success", matches: we };
        if (be = ga(
          d.activeRoutes,
          Q,
          p,
          !0,
          ve
        ), !(be && pe.length < be.length && Kt(
          pe,
          be.slice(0, pe.length)
        )))
          return { type: "success", matches: we };
      }
      if (be || (be = ga(
        d.activeRoutes,
        Q,
        p,
        !0,
        ve
      )), !be || Kt(pe, be))
        return { type: "success", matches: null };
      pe = be;
    }
  }
  function Kt(U, Q) {
    return U.length === Q.length && U.every((W, de) => W.route.id === Q[de].route.id);
  }
  function ca(U) {
    c = {}, d.setHmrRoutes(
      Ho(
        U,
        u,
        void 0,
        c
      )
    );
  }
  function Wt(U, Q, W = !1) {
    ky(
      U,
      Q,
      d,
      c,
      u,
      W
    ), d.hasHMRRoutes || xe({});
  }
  return V = {
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
    initialize: ze,
    subscribe: Se,
    enableScrollRestoration: He,
    navigate: $e,
    fetch: Je,
    revalidate: ft,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (U) => e.history.createHref(U),
    encodeLocation: (U) => e.history.encodeLocation(U),
    getFetcher: Xn,
    resetFetcher: xn,
    deleteFetcher: Pt,
    dispose: Re,
    getBlocker: wn,
    deleteBlocker: ua,
    patchRoutes: Wt,
    _internalFetchControllers: G,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ca,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(U) {
      xe(U);
    }
  }, e.instrumentations && (V = L_(
    V,
    e.instrumentations.map((U) => U.router).filter(Boolean)
  )), V;
}
function Z_(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function ph(e, a, r, l, s, u) {
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
  let p = oc(
    l || ".",
    Qh(c),
    oa(e.pathname, r) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = Wh(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let y = new URLSearchParams(p.search), g = y.getAll("index");
      y.delete("index"), g.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (p.pathname = M_({ basename: r, pathname: p.pathname })), Ua(p);
}
function Ly(e, a, r) {
  if (!r || !Z_(r))
    return { path: a };
  if (r.formMethod && !h2(r.formMethod))
    return {
      path: a,
      error: ra(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: ra(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = g1(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!dn(u))
        return l();
      let g = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (v, [x, S]) => `${v}${x}=${S}
`,
          ""
        )
      ) : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: c,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!dn(u))
        return l();
      try {
        let g = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: r.formEncType,
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
  Fe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let d, p;
  if (r.formData)
    d = yh(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    d = yh(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    d = r.body, p = Yy(d);
  else if (r.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(r.body), p = Yy(d);
    } catch {
      return l();
    }
  let m = {
    formMethod: u,
    formAction: c,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (dn(m.formMethod))
    return { path: a, submission: m };
  let y = Sa(a);
  return e && y.search && Wh(y.search) && d.append("index", ""), y.search = `?${d}`, { path: Ua(y), submission: m };
}
function Hy(e, a, r, l, s, u, c, d, p, m, y, g, v, x, S, N, C, R, z, E, O, k) {
  let B = O ? Yn(O[1]) ? O[1].error : O[1].data : void 0, V = s.createURL(u.location), A = s.createURL(p), Y;
  if (y && u.errors) {
    let T = Object.keys(u.errors)[0];
    Y = c.findIndex((L) => L.route.id === T);
  } else if (O && Yn(O[1])) {
    let T = O[0];
    Y = c.findIndex((L) => L.route.id === T) - 1;
  }
  let te = O ? O[1].statusCode : void 0, $ = te && te >= 400, K = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...d,
    actionResult: B,
    actionStatus: te
  }, le = Qo(c), j = c.map((T, L) => {
    let { route: F } = T, G = null;
    if (Y != null && L > Y)
      G = !1;
    else if (F.lazy)
      G = !0;
    else if (!Kh(F))
      G = !1;
    else if (y) {
      let { shouldLoad: P } = u1(
        F,
        u.loaderData,
        u.errors
      );
      G = P;
    } else Q_(u.loaderData, u.matches[L], T) && (G = !0);
    if (G !== null)
      return gh(
        r,
        l,
        e,
        p,
        le,
        T,
        m,
        a,
        G
      );
    let Z = !1;
    typeof k == "boolean" ? Z = k : $ ? Z = !1 : (g || V.pathname + V.search === A.pathname + A.search || V.search !== A.search || P_(u.matches[L], T)) && (Z = !0);
    let D = {
      ...K,
      defaultShouldRevalidate: Z
    }, H = zo(T, D);
    return gh(
      r,
      l,
      e,
      p,
      le,
      T,
      m,
      a,
      H,
      D,
      k
    );
  }), I = [];
  return S.forEach((T, L) => {
    if (y || !c.some((se) => se.route.id === T.routeId) || x.has(L))
      return;
    let F = u.fetchers.get(L), G = F && F.state !== "idle" && F.data === void 0, Z = ga(
      C,
      T.path,
      R ?? "/",
      !1,
      E
    );
    if (!Z) {
      if (z && G)
        return;
      I.push({
        key: L,
        routeId: T.routeId,
        path: T.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(L))
      return;
    let D = Bu(Z, T.path), H = new AbortController(), P = dl(
      s,
      T.path,
      H.signal
    ), ne = null;
    if (v.has(L))
      v.delete(L), ne = gl(
        r,
        l,
        P,
        T.path,
        Z,
        D,
        m,
        a
      );
    else if (G)
      g && (ne = gl(
        r,
        l,
        P,
        T.path,
        Z,
        D,
        m,
        a
      ));
    else {
      let se;
      typeof k == "boolean" ? se = k : $ ? se = !1 : se = g;
      let he = {
        ...K,
        defaultShouldRevalidate: se
      };
      zo(D, he) && (ne = gl(
        r,
        l,
        P,
        T.path,
        Z,
        D,
        m,
        a,
        he
      ));
    }
    ne && I.push({
      key: L,
      routeId: T.routeId,
      path: T.path,
      matches: ne,
      match: D,
      request: P,
      controller: H
    });
  }), { dsMatches: j, revalidatingFetchers: I };
}
function Kh(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function u1(e, a, r) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Kh(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = r != null && r[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function Q_(e, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !e.hasOwnProperty(r.route.id);
  return l || s;
}
function P_(e, a) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function zo(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function ky(e, a, r, l, s, u) {
  let c;
  if (e) {
    let m = l[e];
    Fe(
      m,
      `No route found to patch children into: routeId = ${e}`
    ), m.children || (m.children = []), c = m.children;
  } else
    c = r.activeRoutes;
  let d = [], p = [];
  if (a.forEach((m) => {
    let y = c.find(
      (g) => c1(m, g)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = Ho(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: g } = p[m], v = y, [x] = Ho(
        [g],
        s,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(v, {
        element: x.element ? x.element : v.element,
        errorElement: x.errorElement ? x.errorElement : v.errorElement,
        hydrateFallbackElement: x.hydrateFallbackElement ? x.hydrateFallbackElement : v.hydrateFallbackElement
      });
    }
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function c1(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (r, l) => a.children?.some((s) => c1(r, s))
  ) ?? !1 : !1;
}
var By = /* @__PURE__ */ new WeakMap(), f1 = ({
  key: e,
  route: a,
  manifest: r,
  mapRouteProperties: l
}) => {
  let s = r[a.id];
  if (Fe(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[e];
  if (!u)
    return;
  let c = By.get(s);
  c || (c = {}, By.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = d_(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
    if (m)
      Yt(
        !m,
        "Route property " + e + " is not a supported lazy route property. This property will be ignored."
      ), c[e] = Promise.resolve();
    else if (g)
      Yt(
        !1,
        `Route "${s.id}" has a static property "${e}" defined. The lazy property will be ignored.`
      );
    else {
      let v = await u();
      v != null && (Object.assign(s, { [e]: v }), Object.assign(s, l(s)));
    }
    typeof s.lazy == "object" && (s.lazy[e] = void 0, Object.values(s.lazy).every((v) => v === void 0) && (s.lazy = void 0));
  })();
  return c[e] = p, p;
}, Uy = /* @__PURE__ */ new WeakMap();
function K_(e, a, r, l, s) {
  let u = r[e.id];
  if (Fe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let y = Uy.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let g = (async () => {
      Fe(
        typeof e.lazy == "function",
        "No lazy route function found"
      );
      let v = await e.lazy(), x = {};
      for (let S in v) {
        let N = v[S];
        if (N === void 0)
          continue;
        let C = m_(S), z = u[S] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        S !== "hasErrorBoundary";
        C ? Yt(
          !C,
          "Route property " + S + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? Yt(
          !z,
          `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`
        ) : x[S] = N;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return Uy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let g = f1({
      key: y,
      route: e,
      manifest: r,
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
async function Vy(e) {
  let a = e.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function J_(e) {
  return e.matches.some((a) => a.route.middleware) ? d1(e, () => Vy(e)) : Vy(e);
}
function d1(e, a) {
  return W_(
    e,
    a,
    (l) => {
      if (d2(l))
        throw l;
      return l;
    },
    s2,
    r
  );
  function r(l, s, u) {
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
      ), p = Gi(
        c,
        c[d].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: l }
      });
    }
  }
}
async function W_(e, a, r, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await h1(
    c,
    d,
    a,
    r,
    l,
    s
  );
}
async function h1(e, a, r, l, s, u, c = 0) {
  let { request: d } = e;
  if (d.signal.aborted)
    throw d.signal.reason ?? new Error(`Request aborted: ${d.method} ${d.url}`);
  let p = a[c];
  if (!p)
    return await r();
  let [m, y] = p, g, v = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await h1(
        e,
        a,
        r,
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
    let x = await y(e, v), S = x != null ? l(x) : void 0;
    return s(S) ? S : g ? S ?? g.value : (g = { value: await v() }, g.value);
  } catch (x) {
    return await u(x, m, g);
  }
}
function m1(e, a, r, l, s) {
  let u = f1({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = K_(
    l.route,
    dn(r.method) ? "action" : "loader",
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
function gh(e, a, r, l, s, u, c, d, p, m = null, y) {
  let g = !1, v = m1(
    e,
    a,
    r,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: v,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(x) {
      return g = !0, m ? typeof y == "boolean" ? zo(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? zo(u, {
        ...m,
        defaultShouldRevalidate: x
      }) : zo(u, m) : p;
    },
    resolve(x) {
      let { lazy: S, loader: N, middleware: C } = u.route, R = g || p || x && !dn(r.method) && (S || N), z = C && C.length > 0 && !N && !S;
      return R && (dn(r.method) || !z) ? t2({
        request: r,
        path: l,
        pattern: s,
        match: u,
        lazyHandlerPromise: v?.handler,
        lazyRoutePromise: v?.route,
        handlerOverride: x,
        scopedContext: d
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function gl(e, a, r, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: m1(
      e,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : gh(
    e,
    a,
    r,
    l,
    Qo(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function e2(e, a, r, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let d = {
    request: a,
    url: p1(a, r),
    pattern: Qo(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let g = d;
      return d1(g, () => y({
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
async function t2({
  request: e,
  path: a,
  pattern: r,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, m, y = dn(e.method), g = y ? "action" : "loader", v = (x) => {
    let S, N = new Promise((z, E) => S = E);
    m = () => S(), e.signal.addEventListener("abort", m);
    let C = (z) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: p1(e, a),
        pattern: r,
        params: l.params,
        context: d
      },
      ...z !== void 0 ? [z] : []
    ), R = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => C(E)) : C()) };
      } catch (z) {
        return { type: "error", result: z };
      }
    })();
    return Promise.race([R, N]);
  };
  try {
    let x = y ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let S, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(x).catch((C) => {
            S = C;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (S !== void 0)
          throw S;
        p = N;
      } else {
        await s;
        let S = y ? l.route.action : l.route.loader;
        if (S)
          [p] = await Promise.all([v(S), u]);
        else if (g === "action") {
          let N = new URL(e.url), C = N.pathname + N.search;
          throw ra(405, {
            method: e.method,
            pathname: C,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await v(x);
    else {
      let S = new URL(e.url), N = S.pathname + S.search;
      throw ra(404, {
        pathname: N
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    m && e.signal.removeEventListener("abort", m);
  }
  return p;
}
async function n2(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function a2(e) {
  let { result: a, type: r } = e;
  if (Jh(a)) {
    let l;
    try {
      l = await n2(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new sc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Fy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: o2(a),
    statusCode: ko(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ko(a) ? a.status : void 0
  } : Fy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function i2(e, a, r, l, s) {
  let u = e.headers.get("Location");
  if (Fe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Zh(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === r) + 1
    );
    u = ph(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var qy = [
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
function $y(e, a, r, l) {
  if (Zh(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (qy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = oa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return Ph(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (qy.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function dl(e, a, r, l) {
  let s = e.createURL(g1(a)).toString(), u = { signal: r };
  if (l && dn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = yh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function p1(e, a) {
  let r = new URL(e.url), l = typeof a == "string" ? Sa(a) : a;
  if (r.pathname = l.pathname || "/", l.search) {
    let s = new URLSearchParams(l.search), u = s.getAll("index");
    s.delete("index");
    for (let c of u.filter(Boolean))
      s.append("index", c);
    r.search = s.size ? `?${s.toString()}` : "";
  } else
    r.search = "";
  return r.hash = l.hash || "", r;
}
function yh(e) {
  let a = new URLSearchParams();
  for (let [r, l] of e.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function Yy(e) {
  let a = new FormData();
  for (let [r, l] of e.entries())
    a.append(r, l);
  return a;
}
function r2(e, a, r, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, y = r && Yn(r[1]) ? r[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let v = g.route.id, x = a[v];
    if (Fe(
      !yr(x),
      "Cannot handle redirect results in processLoaderData"
    ), Yn(x)) {
      let S = x.error;
      if (y !== void 0 && (S = y, y = void 0), c = c || {}, s)
        c[v] = S;
      else {
        let N = Gi(e, v);
        c[N.route.id] == null && (c[N.route.id] = S);
      }
      l || (u[v] = s1), p || (p = !0, d = ko(x.error) ? x.error.status : 500), x.headers && (m[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (m[v] = x.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function Iy(e, a, r, l, s, u, c) {
  let { loaderData: d, errors: p } = r2(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: g, controller: v } = m;
    if (v && v.signal.aborted)
      return;
    let x = u[y];
    if (Fe(x, "Did not find corresponding fetcher result"), Yn(x)) {
      let S = Gi(e.matches, g?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: x.error
      }), c.delete(y);
    } else if (yr(x))
      Fe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = za(x.data);
      c.set(y, S);
    }
  }), { loaderData: d, errors: p };
}
function Gy(e, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== s1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Xy(e) {
  return e ? Yn(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Gi(e, a) {
  return (a ? e.slice(0, e.findIndex((l) => l.route.id === a) + 1) : [...e]).reverse().find((l) => l.route.hasErrorBoundary === !0) || e[0];
}
function gu(e) {
  let a = e.length === 1 ? e[0] : e.find((r) => r.index || !r.path || r.path === "/") || {
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
function ra(e, {
  pathname: a,
  routeId: r,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", d = "Unknown @remix-run/router error";
  return e === 400 ? (c = "Bad Request", l && a && r ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${r}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && r ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new sc(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function yu(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (yr(s))
      return { key: l, result: s };
  }
}
function g1(e) {
  let a = typeof e == "string" ? Sa(e) : e;
  return Ua({ ...a, hash: "" });
}
function l2(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function o2(e) {
  return new sc(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function s2(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, r]) => typeof a == "string" && u2(r)
  );
}
function u2(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function c2(e) {
  return Jh(e.result) && l1.has(e.result.status);
}
function Yn(e) {
  return e.type === "error";
}
function yr(e) {
  return (e && e.type) === "redirect";
}
function Fy(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function Jh(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function f2(e) {
  return l1.has(e);
}
function d2(e) {
  return Jh(e) && f2(e.status) && e.headers.has("Location");
}
function h2(e) {
  return $_.has(e.toUpperCase());
}
function dn(e) {
  return V_.has(e.toUpperCase());
}
function Wh(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function Bu(e, a) {
  let r = typeof a == "string" ? Sa(a).search : a.search;
  if (e[e.length - 1].route.index && Wh(r || ""))
    return e[e.length - 1];
  let l = t1(e);
  return l[l.length - 1];
}
function Zy(e) {
  let { formMethod: a, formAction: r, formEncType: l, text: s, formData: u, json: c } = e;
  if (!(!a || !r || !l)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: l,
        formData: void 0,
        json: void 0,
        text: s
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: l,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (c !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: l,
        formData: void 0,
        json: c,
        text: void 0
      };
  }
}
function $d(e, a, r, l) {
  return l ? {
    state: "loading",
    location: e,
    matches: a,
    historyAction: r,
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
    historyAction: r,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function m2(e, a, r, l) {
  return {
    state: "submitting",
    location: e,
    matches: a,
    historyAction: r,
    formMethod: l.formMethod,
    formAction: l.formAction,
    formEncType: l.formEncType,
    formData: l.formData,
    json: l.json,
    text: l.text
  };
}
function Eo(e, a) {
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
function p2(e, a) {
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
function za(e) {
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
function g2(e, a) {
  try {
    let r = e.sessionStorage.getItem(
      o1
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function y2(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      e.sessionStorage.setItem(
        o1,
        JSON.stringify(r)
      );
    } catch (l) {
      Yt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function Qy() {
  let e, a, r = new Promise((l, s) => {
    e = async (u) => {
      l(u);
      try {
        await r;
      } catch {
      }
    }, a = async (u) => {
      s(u);
      try {
        await r;
      } catch {
      }
    };
  });
  return {
    promise: r,
    //@ts-ignore
    resolve: e,
    //@ts-ignore
    reject: a
  };
}
var Rr = _.createContext(null);
Rr.displayName = "DataRouter";
var Po = _.createContext(null);
Po.displayName = "DataRouterState";
var y1 = _.createContext(!1);
function v1() {
  return _.useContext(y1);
}
var em = _.createContext({
  isTransitioning: !1
});
em.displayName = "ViewTransition";
var b1 = _.createContext(
  /* @__PURE__ */ new Map()
);
b1.displayName = "Fetchers";
var v2 = _.createContext(null);
v2.displayName = "Await";
var sa = _.createContext(
  null
);
sa.displayName = "Navigation";
var uc = _.createContext(
  null
);
uc.displayName = "Location";
var Va = _.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Va.displayName = "Route";
var tm = _.createContext(null);
tm.displayName = "RouteError";
var x1 = "REACT_ROUTER_ERROR", b2 = "REDIRECT", x2 = "ROUTE_ERROR_RESPONSE";
function w2(e) {
  if (e.startsWith(`${x1}:${b2}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function S2(e) {
  if (e.startsWith(
    `${x1}:${x2}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new sc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function E2(e, { relative: a } = {}) {
  Fe(
    Ko(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = _.useContext(sa), { hash: s, pathname: u, search: c } = Jo(e, { relative: a }), d = u;
  return r !== "/" && (d = u === "/" ? r : la([r, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function Ko() {
  return _.useContext(uc) != null;
}
function di() {
  return Fe(
    Ko(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), _.useContext(uc).location;
}
var w1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function S1(e) {
  _.useContext(sa).static || _.useLayoutEffect(e);
}
function _2() {
  let { isDataRoute: e } = _.useContext(Va);
  return e ? U2() : N2();
}
function N2() {
  Fe(
    Ko(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = _.useContext(Rr), { basename: a, navigator: r } = _.useContext(sa), { matches: l } = _.useContext(Va), { pathname: s } = di(), u = JSON.stringify(Qh(l)), c = _.useRef(!1);
  return S1(() => {
    c.current = !0;
  }), _.useCallback(
    (p, m = {}) => {
      if (Yt(c.current, w1), !c.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let y = oc(
        p,
        JSON.parse(u),
        s,
        m.relative === "path"
      );
      e == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : la([a, y.pathname])), (m.replace ? r.replace : r.push)(
        y,
        m.state,
        m
      );
    },
    [
      a,
      r,
      u,
      s,
      e
    ]
  );
}
var C2 = _.createContext(null);
function R2(e) {
  let a = _.useContext(Va).outlet;
  return _.useMemo(
    () => a && /* @__PURE__ */ _.createElement(C2.Provider, { value: e }, a),
    [a, e]
  );
}
function Jo(e, { relative: a } = {}) {
  let { matches: r } = _.useContext(Va), { pathname: l } = di(), s = JSON.stringify(Qh(r));
  return _.useMemo(
    () => oc(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function T2(e, a, r) {
  Fe(
    Ko(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = _.useContext(sa), { matches: s } = _.useContext(Va), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let C = m && m.path || "";
    N1(
      d,
      !m || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let y = di(), g;
  g = y;
  let v = g.pathname || "/", x = v;
  if (p !== "/") {
    let C = p.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let S = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (C) => Object.assign(C, {
        route: r.manifest[C.route.id] || C.route
      })
    )
  ) : Kb(e, { pathname: x });
  return Yt(
    m || S != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), Yt(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), O2(
    S && S.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, c, C.params),
        pathname: la([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            C.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? p : la([
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
    r
  );
}
function M2() {
  let e = B2(), a = ko(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ _.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ _.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ _.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ _.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ _.createElement("pre", { style: s }, r) : null, c);
}
var D2 = /* @__PURE__ */ _.createElement(M2, null), E1 = class extends _.Component {
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
      const r = S2(e.digest);
      r && (e = r);
    }
    let a = e !== void 0 ? /* @__PURE__ */ _.createElement(Va.Provider, { value: this.props.routeContext }, /* @__PURE__ */ _.createElement(
      tm.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ _.createElement(A2, { error: e }, a) : a;
  }
};
E1.contextType = y1;
var Yd = /* @__PURE__ */ new WeakMap();
function A2({
  children: e,
  error: a
}) {
  let { basename: r } = _.useContext(sa);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = w2(a.digest);
    if (l) {
      let s = Yd.get(a);
      if (s) throw s;
      let u = a1(l.location, r);
      if (n1 && !Yd.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw Yd.set(a, c), c;
        }
      return /* @__PURE__ */ _.createElement(
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
function z2({ routeContext: e, match: a, children: r }) {
  let l = _.useContext(Rr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ _.createElement(Va.Provider, { value: e }, r);
}
function O2(e, a = [], r) {
  let l = r?.state;
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
    Fe(
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
  if (r && l) {
    c = l.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let g = s[y];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (d = y), g.route.id) {
        let { loaderData: v, errors: x } = l, S = g.route.loader && !v.hasOwnProperty(g.route.id) && (!x || x[g.route.id] === void 0);
        if (g.route.lazy || S) {
          r.isStatic && (c = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, m = l && p ? (y, g) => {
    p(y, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      pattern: Qo(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (y, g, v) => {
      let x, S = !1, N = null, C = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, N = g.route.errorElement || D2, c && (d < 0 && v === 0 ? (N1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, C = null) : d === v && (S = !0, C = g.route.hydrateFallbackElement || null)));
      let R = a.concat(s.slice(0, v + 1)), z = () => {
        let E;
        return x ? E = N : S ? E = C : g.route.Component ? E = /* @__PURE__ */ _.createElement(g.route.Component, null) : g.route.element ? E = g.route.element : E = y, /* @__PURE__ */ _.createElement(
          z2,
          {
            match: g,
            routeContext: {
              outlet: y,
              matches: R,
              isDataRoute: l != null
            },
            children: E
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || v === 0) ? /* @__PURE__ */ _.createElement(
        E1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: N,
          error: x,
          children: z(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: m
        }
      ) : z();
    },
    null
  );
}
function nm(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function j2(e) {
  let a = _.useContext(Rr);
  return Fe(a, nm(e)), a;
}
function _1(e) {
  let a = _.useContext(Po);
  return Fe(a, nm(e)), a;
}
function L2(e) {
  let a = _.useContext(Va);
  return Fe(a, nm(e)), a;
}
function cc(e) {
  let a = L2(e), r = a.matches[a.matches.length - 1];
  return Fe(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function H2() {
  return cc(
    "useRouteId"
    /* UseRouteId */
  );
}
function k2() {
  let e = _1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = cc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function B2() {
  let e = _.useContext(tm), a = _1(
    "useRouteError"
    /* UseRouteError */
  ), r = cc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[r];
}
function U2() {
  let { router: e } = j2(
    "useNavigate"
    /* UseNavigateStable */
  ), a = cc(
    "useNavigate"
    /* UseNavigateStable */
  ), r = _.useRef(!1);
  return S1(() => {
    r.current = !0;
  }), _.useCallback(
    async (s, u = {}) => {
      Yt(r.current, w1), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var Py = {};
function N1(e, a, r) {
  !a && !Py[e] && (Py[e] = !0, Yt(!1, r));
}
var Ky = {};
function Jy(e, a) {
  !e && !Ky[a] && (Ky[a] = !0, console.warn(a));
}
var V2 = "useOptimistic", Wy = t_[V2], q2 = () => {
};
function $2(e) {
  return Wy ? Wy(e) : [e, q2];
}
function Y2(e) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null
  };
  return e.Component && (e.element && Yt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: _.createElement(e.Component),
    Component: void 0
  })), e.HydrateFallback && (e.hydrateFallbackElement && Yt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: _.createElement(e.HydrateFallback),
    HydrateFallback: void 0
  })), e.ErrorBoundary && (e.errorElement && Yt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: _.createElement(e.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var I2 = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function G2(e, a) {
  return F_({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: s_({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: I2,
    mapRouteProperties: Y2,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var X2 = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((e, a) => {
      this.resolve = (r) => {
        this.status === "pending" && (this.status = "resolved", e(r));
      }, this.reject = (r) => {
        this.status === "pending" && (this.status = "rejected", a(r));
      };
    });
  }
};
function F2({
  router: e,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = v1() || l;
  let [u, c] = _.useState(e.state), [d, p] = $2(u), [m, y] = _.useState(), [g, v] = _.useState({
    isTransitioning: !1
  }), [x, S] = _.useState(), [N, C] = _.useState(), [R, z] = _.useState(), E = _.useRef(/* @__PURE__ */ new Map()), O = _.useCallback(
    (A, { deletedFetchers: Y, newErrors: te, flushSync: $, viewTransitionOpts: K }) => {
      te && r && Object.values(te).forEach(
        (j) => r(j, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: Qo(A.matches)
        })
      ), A.fetchers.forEach((j, I) => {
        j.data !== void 0 && E.current.set(I, j.data);
      }), Y.forEach((j) => E.current.delete(j)), Jy(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let le = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (Jy(
        K == null || le,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !le) {
        a && $ ? a(() => c(A)) : l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && p((j) => ev(j, A)), c(A);
        });
        return;
      }
      if (a && $) {
        a(() => {
          N && (x?.resolve(), N.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let j = e.window.document.startViewTransition(() => {
          a(() => c(A));
        });
        j.finished.finally(() => {
          a(() => {
            S(void 0), C(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => C(j));
        return;
      }
      N ? (x?.resolve(), N.skipTransition(), z({
        state: A,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (y(A), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      }));
    },
    [
      e.window,
      a,
      N,
      x,
      l,
      p,
      r
    ]
  );
  _.useLayoutEffect(() => e.subscribe(O), [e, O]), _.useEffect(() => {
    g.isTransitioning && !g.flushSync && S(new X2());
  }, [g]), _.useEffect(() => {
    if (x && m && e.window) {
      let A = m, Y = x.promise, te = e.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && p(($) => ev($, A)), c(A);
        }), await Y;
      });
      te.finished.finally(() => {
        S(void 0), C(void 0), y(void 0), v({ isTransitioning: !1 });
      }), C(te);
    }
  }, [
    m,
    x,
    e.window,
    l,
    p
  ]), _.useEffect(() => {
    x && m && d.location.key === m.location.key && x.resolve();
  }, [x, N, d.location, m]), _.useEffect(() => {
    !g.isTransitioning && R && (y(R.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: R.currentLocation,
      nextLocation: R.nextLocation
    }), z(void 0));
  }, [g.isTransitioning, R]);
  let k = _.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (A) => e.navigate(A),
    push: (A, Y, te) => e.navigate(A, {
      state: Y,
      preventScrollReset: te?.preventScrollReset
    }),
    replace: (A, Y, te) => e.navigate(A, {
      replace: !0,
      state: Y,
      preventScrollReset: te?.preventScrollReset
    })
  }), [e]), B = e.basename || "/", V = _.useMemo(
    () => ({
      router: e,
      navigator: k,
      static: !1,
      basename: B,
      onError: r
    }),
    [e, k, B, r]
  );
  return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(Rr.Provider, { value: V }, /* @__PURE__ */ _.createElement(Po.Provider, { value: d }, /* @__PURE__ */ _.createElement(b1.Provider, { value: E.current }, /* @__PURE__ */ _.createElement(em.Provider, { value: g }, /* @__PURE__ */ _.createElement(
    K2,
    {
      basename: B,
      location: d.location,
      navigationType: d.historyAction,
      navigator: k,
      useTransitions: l
    },
    /* @__PURE__ */ _.createElement(
      Z2,
      {
        routes: e.routes,
        manifest: e.manifest,
        future: e.future,
        state: d,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function ev(e, a) {
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
var Z2 = _.memo(Q2);
function Q2({
  routes: e,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return T2(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function P2(e) {
  return R2(e.context);
}
function K2({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Fe(
    !Ko(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let d = e.replace(/^\/*/, "/"), p = _.useMemo(
    () => ({
      basename: d,
      navigator: s,
      static: u,
      useTransitions: c,
      future: {}
    }),
    [d, s, u, c]
  );
  typeof r == "string" && (r = Sa(r));
  let {
    pathname: m = "/",
    search: y = "",
    hash: g = "",
    state: v = null,
    key: x = "default",
    mask: S
  } = r, N = _.useMemo(() => {
    let C = oa(m, d);
    return C == null ? null : {
      location: {
        pathname: C,
        search: y,
        hash: g,
        state: v,
        key: x,
        mask: S
      },
      navigationType: l
    };
  }, [d, m, y, g, v, x, l, S]);
  return Yt(
    N != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ _.createElement(sa.Provider, { value: p }, /* @__PURE__ */ _.createElement(uc.Provider, { children: a, value: N }));
}
var Uu = "get", Vu = "application/x-www-form-urlencoded";
function fc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function J2(e) {
  return fc(e) && e.tagName.toLowerCase() === "button";
}
function W2(e) {
  return fc(e) && e.tagName.toLowerCase() === "form";
}
function eN(e) {
  return fc(e) && e.tagName.toLowerCase() === "input";
}
function tN(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function nN(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !tN(e);
}
var vu = null;
function aN() {
  if (vu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), vu = !1;
    } catch {
      vu = !0;
    }
  return vu;
}
var iN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Id(e) {
  return e != null && !iN.has(e) ? (Yt(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Vu}"`
  ), null) : e;
}
function rN(e, a) {
  let r, l, s, u, c;
  if (W2(e)) {
    let d = e.getAttribute("action");
    l = d ? oa(d, a) : null, r = e.getAttribute("method") || Uu, s = Id(e.getAttribute("enctype")) || Vu, u = new FormData(e);
  } else if (J2(e) || eN(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? oa(p, a) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || Uu, s = Id(e.getAttribute("formenctype")) || Id(d.getAttribute("enctype")) || Vu, u = new FormData(d, e), !aN()) {
      let { name: m, type: y, value: g } = e;
      if (y === "image") {
        let v = m ? `${m}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else m && u.append(m, g);
    }
  } else {
    if (fc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Uu, l = null, s = Vu, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function am(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function C1(e, a, r, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && oa(s.pathname, a) === "/" ? s.pathname = `${Zu(a)}/_root.${l}` : s.pathname = `${Zu(s.pathname)}.${l}`, s;
}
async function lN(e, a) {
  if (e.id in a)
    return a[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return a[e.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function oN(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function sN(e, a, r) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await lN(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return dN(
    l.flat(1).filter(oN).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function tv(e, a, r, l, s, u) {
  let c = (p, m) => r[m] ? p.route.id !== r[m].route.id : !0, d = (p, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== p.params["*"]
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
        currentParams: r[0]?.params || {},
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
function uN(e, a, { includeHydrateFallback: r } = {}) {
  return cN(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function cN(e) {
  return [...new Set(e)];
}
function fN(e) {
  let a = {}, r = Object.keys(e).sort();
  for (let l of r)
    a[l] = e[l];
  return a;
}
function dN(e, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(fN(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function im() {
  let e = _.useContext(Rr);
  return am(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function hN() {
  let e = _.useContext(Po);
  return am(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var rm = _.createContext(void 0);
rm.displayName = "FrameworkContext";
function lm() {
  let e = _.useContext(rm);
  return am(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function mN(e, a) {
  let r = _.useContext(rm), [l, s] = _.useState(!1), [u, c] = _.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: g } = a, v = _.useRef(null);
  _.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let N = (R) => {
        R.forEach((z) => {
          c(z.isIntersecting);
        });
      }, C = new IntersectionObserver(N, { threshold: 0.5 });
      return v.current && C.observe(v.current), () => {
        C.disconnect();
      };
    }
  }, [e]), _.useEffect(() => {
    if (l) {
      let N = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(N);
      };
    }
  }, [l]);
  let x = () => {
    s(!0);
  }, S = () => {
    s(!1), c(!1);
  };
  return r ? e !== "intent" ? [u, v, {}] : [
    u,
    v,
    {
      onFocus: _o(d, x),
      onBlur: _o(p, S),
      onMouseEnter: _o(m, x),
      onMouseLeave: _o(y, S),
      onTouchStart: _o(g, x)
    }
  ] : [!1, v, {}];
}
function _o(e, a) {
  return (r) => {
    e && e(r), r.defaultPrevented || a(r);
  };
}
function pN({ page: e, ...a }) {
  let r = v1(), { router: l } = im(), s = _.useMemo(
    () => Kb(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? r ? /* @__PURE__ */ _.createElement(yN, { page: e, matches: s, ...a }) : /* @__PURE__ */ _.createElement(vN, { page: e, matches: s, ...a }) : null;
}
function gN(e) {
  let { manifest: a, routeModules: r } = lm(), [l, s] = _.useState([]);
  return _.useEffect(() => {
    let u = !1;
    return sN(e, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, r]), l;
}
function yN({
  page: e,
  matches: a,
  ...r
}) {
  let l = di(), { future: s } = lm(), { basename: u } = im(), c = _.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = C1(
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
  return /* @__PURE__ */ _.createElement(_.Fragment, null, c.map((d) => /* @__PURE__ */ _.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })));
}
function vN({
  page: e,
  matches: a,
  ...r
}) {
  let l = di(), { future: s, manifest: u, routeModules: c } = lm(), { basename: d } = im(), { loaderData: p, matches: m } = hN(), y = _.useMemo(
    () => tv(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = _.useMemo(
    () => tv(
      e,
      a,
      m,
      u,
      l,
      "assets"
    ),
    [e, a, m, u, l]
  ), v = _.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((z) => {
      let E = u.routes[z.route.id];
      !E || !E.hasLoader || (!y.some((O) => O.route.id === z.route.id) && z.route.id in p && c[z.route.id]?.shouldRevalidate || E.hasClientLoader ? C = !0 : N.add(z.route.id));
    }), N.size === 0)
      return [];
    let R = C1(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return C && N.size > 0 && R.searchParams.set(
      "_routes",
      a.filter((z) => N.has(z.route.id)).map((z) => z.route.id).join(",")
    ), [R.pathname + R.search];
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
  ]), x = _.useMemo(
    () => uN(g, u),
    [g, u]
  ), S = gN(g);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, v.map((N) => /* @__PURE__ */ _.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...r })), x.map((N) => /* @__PURE__ */ _.createElement("link", { key: N, rel: "modulepreload", href: N, ...r })), S.map(({ key: N, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ _.createElement(
      "link",
      {
        key: N,
        nonce: r.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function bN(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var xN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  xN && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var R1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, T1 = _.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: l = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: d,
    state: p,
    target: m,
    to: y,
    preventScrollReset: g,
    viewTransition: v,
    defaultShouldRevalidate: x,
    ...S
  }, N) {
    let { basename: C, navigator: R, useTransitions: z } = _.useContext(sa), E = typeof y == "string" && R1.test(y), O = a1(y, C);
    y = O.to;
    let k = E2(y, { relative: s }), B = di(), V = null;
    if (d) {
      let I = oc(
        d,
        [],
        B.mask ? B.mask.pathname : "/",
        !0
      );
      C !== "/" && (I.pathname = I.pathname === "/" ? C : la([C, I.pathname])), V = R.createHref(I);
    }
    let [A, Y, te] = mN(
      l,
      S
    ), $ = _N(y, {
      replace: c,
      mask: d,
      state: p,
      target: m,
      preventScrollReset: g,
      relative: s,
      viewTransition: v,
      defaultShouldRevalidate: x,
      useTransitions: z
    });
    function K(I) {
      a && a(I), I.defaultPrevented || $(I);
    }
    let le = !(O.isExternal || u), j = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ _.createElement(
        "a",
        {
          ...S,
          ...te,
          href: (le ? V : void 0) || O.absoluteURL || k,
          onClick: le ? K : a,
          ref: bN(N, Y),
          target: m,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !E ? /* @__PURE__ */ _.createElement(_.Fragment, null, j, /* @__PURE__ */ _.createElement(pN, { page: k })) : j;
  }
);
T1.displayName = "Link";
var wN = _.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: l = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: d,
    children: p,
    ...m
  }, y) {
    let g = Jo(c, { relative: m.relative }), v = di(), x = _.useContext(Po), { navigator: S, basename: N } = _.useContext(sa), C = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    MN(g) && d === !0, R = S.encodeLocation ? S.encodeLocation(g).pathname : g.pathname, z = v.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (z = z.toLowerCase(), E = E ? E.toLowerCase() : null, R = R.toLowerCase()), E && N && (E = oa(E, N) || E);
    const O = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let k = z === R || !s && z.startsWith(R) && z.charAt(O) === "/", B = E != null && (E === R || !s && E.startsWith(R) && E.charAt(R.length) === "/"), V = {
      isActive: k,
      isPending: B,
      isTransitioning: C
    }, A = k ? a : void 0, Y;
    typeof l == "function" ? Y = l(V) : Y = [
      l,
      k ? "active" : null,
      B ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let te = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ _.createElement(
      T1,
      {
        ...m,
        "aria-current": A,
        className: Y,
        ref: y,
        style: te,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(V) : p
    );
  }
);
wN.displayName = "NavLink";
var SN = _.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = Uu,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: g,
    defaultShouldRevalidate: v,
    ...x
  }, S) => {
    let { useTransitions: N } = _.useContext(sa), C = RN(), R = TN(d, { relative: m }), z = c.toLowerCase() === "get" ? "get" : "post", E = typeof d == "string" && R1.test(d), O = (k) => {
      if (p && p(k), k.defaultPrevented) return;
      k.preventDefault();
      let B = k.nativeEvent.submitter, V = B?.getAttribute("formmethod") || c, A = () => C(B || k.currentTarget, {
        fetcherKey: a,
        method: V,
        navigate: r,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: y,
        viewTransition: g,
        defaultShouldRevalidate: v
      });
      N && r !== !1 ? _.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ _.createElement(
      "form",
      {
        ref: S,
        method: z,
        action: R,
        onSubmit: l ? p : O,
        ...x,
        "data-discover": !E && e === "render" ? "true" : void 0
      }
    );
  }
);
SN.displayName = "Form";
function EN(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function M1(e) {
  let a = _.useContext(Rr);
  return Fe(a, EN(e)), a;
}
function _N(e, {
  target: a,
  replace: r,
  mask: l,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: d,
  defaultShouldRevalidate: p,
  useTransitions: m
} = {}) {
  let y = _2(), g = di(), v = Jo(e, { relative: c });
  return _.useCallback(
    (x) => {
      if (nN(x, a)) {
        x.preventDefault();
        let S = r !== void 0 ? r : Ua(g) === Ua(v), N = () => y(e, {
          replace: S,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? _.startTransition(() => N()) : N();
      }
    },
    [
      g,
      y,
      v,
      r,
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
var NN = 0, CN = () => `__${String(++NN)}__`;
function RN() {
  let { router: e } = M1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = _.useContext(sa), r = H2(), l = e.fetch, s = e.navigate;
  return _.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: y, body: g } = rN(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || CN();
        await l(v, r, c.action || d, {
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
          fromRouteId: r,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition
        });
    },
    [l, s, a, r]
  );
}
function TN(e, { relative: a } = {}) {
  let { basename: r } = _.useContext(sa), l = _.useContext(Va);
  Fe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...Jo(e || ".", { relative: a }) }, c = di();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search), p = d.getAll("index");
    if (p.some((y) => y === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let y = d.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : la([r, u.pathname])), Ua(u);
}
function MN(e, { relative: a } = {}) {
  let r = _.useContext(em);
  Fe(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = M1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Jo(e, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = oa(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = oa(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return Fu(s.pathname, c) != null || Fu(s.pathname, u) != null;
}
const DN = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], AN = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], D1 = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  outputDir: "",
  baseModelFamilyId: "",
  ditHighPath: "",
  ditLowPath: ""
}, zN = "Wan2.2-I2V-A14B fp8 (Kijai, bundled)";
class dc extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const hc = "/api/v1/extensions/nexus.video.svi2-pro";
async function Tr(e, a) {
  const r = e.startsWith("http") ? e : `${hc}${e}`, l = await fetch(r, {
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
    throw new dc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function ON(e, a, r) {
  const l = e.startsWith("http") ? e : `${hc}${e}`, s = new EventSource(l);
  return s.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, s.onerror = (u) => {
    r?.(u);
  }, () => s.close();
}
async function A1() {
  return Tr("/presets");
}
async function jN() {
  return Tr("/settings");
}
async function z1(e) {
  return Tr("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var LN = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function An({ tone: e = "neutral", children: a, className: r }) {
  const l = [LN[e], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsx("span", { className: l, children: a });
}
var HN = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, kN = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, BN = "_1h48t1v9";
function Ha({
  variant: e = "primary",
  size: a = "md",
  type: r = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...d
}) {
  const p = [HN[e], kN[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ b.jsx("span", { className: BN, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Qt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let a = "";
  if (Array.isArray(e))
    for (let r = 0, l; r < e.length; r++)
      (l = Qt(e[r])) !== "" && (a += (a && " ") + l);
  else
    for (let r in e)
      e[r] && (a += (a && " ") + r);
  return a;
}
var UN = { value: () => {
} };
function mc() {
  for (var e = 0, a = arguments.length, r = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new qu(r);
}
function qu(e) {
  this._ = e;
}
function VN(e, a) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
qu.prototype = mc.prototype = {
  constructor: qu,
  on: function(e, a) {
    var r = this._, l = VN(e + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = qN(r[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) r[s] = nv(r[s], e.name, a);
      else if (a == null) for (s in r) r[s] = nv(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var r in a) e[r] = a[r].slice();
    return new qu(e);
  },
  call: function(e, a) {
    if ((s = arguments.length - 2) > 0) for (var r = new Array(s), l = 0, s, u; l < s; ++l) r[l] = arguments[l + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (u = this._[e], l = 0, s = u.length; l < s; ++l) u[l].value.apply(a, r);
  },
  apply: function(e, a, r) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var l = this._[e], s = 0, u = l.length; s < u; ++s) l[s].value.apply(a, r);
  }
};
function qN(e, a) {
  for (var r = 0, l = e.length, s; r < l; ++r)
    if ((s = e[r]).name === a)
      return s.value;
}
function nv(e, a, r) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = UN, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return r != null && e.push({ name: a, value: r }), e;
}
var vh = "http://www.w3.org/1999/xhtml";
const av = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: vh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function pc(e) {
  var a = e += "", r = a.indexOf(":");
  return r >= 0 && (a = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), av.hasOwnProperty(a) ? { space: av[a], local: e } : e;
}
function $N(e) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === vh && a.documentElement.namespaceURI === vh ? a.createElement(e) : a.createElementNS(r, e);
  };
}
function YN(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function O1(e) {
  var a = pc(e);
  return (a.local ? YN : $N)(a);
}
function IN() {
}
function om(e) {
  return e == null ? IN : function() {
    return this.querySelector(e);
  };
}
function GN(e) {
  typeof e != "function" && (e = om(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, y = 0; y < c; ++y)
      (p = u[y]) && (m = e.call(p, p.__data__, y, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[y] = m);
  return new Gn(l, this._parents);
}
function XN(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function FN() {
  return [];
}
function j1(e) {
  return e == null ? FN : function() {
    return this.querySelectorAll(e);
  };
}
function ZN(e) {
  return function() {
    return XN(e.apply(this, arguments));
  };
}
function QN(e) {
  typeof e == "function" ? e = ZN(e) : e = j1(e);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new Gn(l, s);
}
function L1(e) {
  return function() {
    return this.matches(e);
  };
}
function H1(e) {
  return function(a) {
    return a.matches(e);
  };
}
var PN = Array.prototype.find;
function KN(e) {
  return function() {
    return PN.call(this.children, e);
  };
}
function JN() {
  return this.firstElementChild;
}
function WN(e) {
  return this.select(e == null ? JN : KN(typeof e == "function" ? e : H1(e)));
}
var eC = Array.prototype.filter;
function tC() {
  return Array.from(this.children);
}
function nC(e) {
  return function() {
    return eC.call(this.children, e);
  };
}
function aC(e) {
  return this.selectAll(e == null ? tC : nC(typeof e == "function" ? e : H1(e)));
}
function iC(e) {
  typeof e != "function" && (e = L1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Gn(l, this._parents);
}
function k1(e) {
  return new Array(e.length);
}
function rC() {
  return new Gn(this._enter || this._groups.map(k1), this._parents);
}
function Qu(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
Qu.prototype = {
  constructor: Qu,
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
function lC(e) {
  return function() {
    return e;
  };
}
function oC(e, a, r, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : r[c] = new Qu(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function sC(e, a, r, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), y = a.length, g = u.length, v = new Array(y), x;
  for (d = 0; d < y; ++d)
    (p = a[d]) && (v[d] = x = c.call(p, p.__data__, d, a) + "", m.has(x) ? s[d] = p : m.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = m.get(x)) ? (l[d] = p, p.__data__ = u[d], m.delete(x)) : r[d] = new Qu(e, u[d]);
  for (d = 0; d < y; ++d)
    (p = a[d]) && m.get(v[d]) === p && (s[d] = p);
}
function uC(e) {
  return e.__data__;
}
function cC(e, a) {
  if (!arguments.length) return Array.from(this, uC);
  var r = a ? sC : oC, l = this._parents, s = this._groups;
  typeof e != "function" && (e = lC(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], g = s[m], v = g.length, x = fC(e.call(y, y && y.__data__, m, l)), S = x.length, N = d[m] = new Array(S), C = c[m] = new Array(S), R = p[m] = new Array(v);
    r(y, g, N, C, R, x, a);
    for (var z = 0, E = 0, O, k; z < S; ++z)
      if (O = N[z]) {
        for (z >= E && (E = z + 1); !(k = C[E]) && ++E < S; ) ;
        O._next = k || null;
      }
  }
  return c = new Gn(c, l), c._enter = d, c._exit = p, c;
}
function fC(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function dC() {
  return new Gn(this._exit || this._groups.map(k1), this._parents);
}
function hC(e, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function mC(e) {
  for (var a = e.selection ? e.selection() : e, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = r[p], y = l[p], g = m.length, v = d[p] = new Array(g), x, S = 0; S < g; ++S)
      (x = m[S] || y[S]) && (v[S] = x);
  for (; p < s; ++p)
    d[p] = r[p];
  return new Gn(d, this._parents);
}
function pC() {
  for (var e = this._groups, a = -1, r = e.length; ++a < r; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function gC(e) {
  e || (e = yC);
  function a(g, v) {
    return g && v ? e(g.__data__, v.__data__) : !g - !v;
  }
  for (var r = this._groups, l = r.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = r[u], d = c.length, p = s[u] = new Array(d), m, y = 0; y < d; ++y)
      (m = c[y]) && (p[y] = m);
    p.sort(a);
  }
  return new Gn(s, this._parents).order();
}
function yC(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function vC() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function bC() {
  return Array.from(this);
}
function xC() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function wC() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function SC() {
  return !this.node();
}
function EC(e) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function _C(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function NC(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function CC(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function RC(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function TC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function MC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function DC(e, a) {
  var r = pc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? NC : _C : typeof a == "function" ? r.local ? MC : TC : r.local ? RC : CC)(r, a));
}
function B1(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function AC(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function zC(e, a, r) {
  return function() {
    this.style.setProperty(e, a, r);
  };
}
function OC(e, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, r);
  };
}
function jC(e, a, r) {
  return arguments.length > 1 ? this.each((a == null ? AC : typeof a == "function" ? OC : zC)(e, a, r ?? "")) : xl(this.node(), e);
}
function xl(e, a) {
  return e.style.getPropertyValue(a) || B1(e).getComputedStyle(e, null).getPropertyValue(a);
}
function LC(e) {
  return function() {
    delete this[e];
  };
}
function HC(e, a) {
  return function() {
    this[e] = a;
  };
}
function kC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function BC(e, a) {
  return arguments.length > 1 ? this.each((a == null ? LC : typeof a == "function" ? kC : HC)(e, a)) : this.node()[e];
}
function U1(e) {
  return e.trim().split(/^|\s+/);
}
function sm(e) {
  return e.classList || new V1(e);
}
function V1(e) {
  this._node = e, this._names = U1(e.getAttribute("class") || "");
}
V1.prototype = {
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
function q1(e, a) {
  for (var r = sm(e), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function $1(e, a) {
  for (var r = sm(e), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function UC(e) {
  return function() {
    q1(this, e);
  };
}
function VC(e) {
  return function() {
    $1(this, e);
  };
}
function qC(e, a) {
  return function() {
    (a.apply(this, arguments) ? q1 : $1)(this, e);
  };
}
function $C(e, a) {
  var r = U1(e + "");
  if (arguments.length < 2) {
    for (var l = sm(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? qC : a ? UC : VC)(r, a));
}
function YC() {
  this.textContent = "";
}
function IC(e) {
  return function() {
    this.textContent = e;
  };
}
function GC(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function XC(e) {
  return arguments.length ? this.each(e == null ? YC : (typeof e == "function" ? GC : IC)(e)) : this.node().textContent;
}
function FC() {
  this.innerHTML = "";
}
function ZC(e) {
  return function() {
    this.innerHTML = e;
  };
}
function QC(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function PC(e) {
  return arguments.length ? this.each(e == null ? FC : (typeof e == "function" ? QC : ZC)(e)) : this.node().innerHTML;
}
function KC() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function JC() {
  return this.each(KC);
}
function WC() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function eR() {
  return this.each(WC);
}
function tR(e) {
  var a = typeof e == "function" ? e : O1(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function nR() {
  return null;
}
function aR(e, a) {
  var r = typeof e == "function" ? e : O1(e), l = a == null ? nR : typeof a == "function" ? a : om(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function iR() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function rR() {
  return this.each(iR);
}
function lR() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function oR() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function sR(e) {
  return this.select(e ? oR : lR);
}
function uR(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function cR(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function fR(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function dR(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function hR(e, a, r) {
  return function() {
    var l = this.__on, s, u = cR(a);
    if (l) {
      for (var c = 0, d = l.length; c < d; ++c)
        if ((s = l[c]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = r), s.value = a;
          return;
        }
    }
    this.addEventListener(e.type, u, r), s = { type: e.type, name: e.name, value: a, listener: u, options: r }, l ? l.push(s) : this.__on = [s];
  };
}
function mR(e, a, r) {
  var l = fR(e + ""), s, u = l.length, c;
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
  for (d = a ? hR : dR, s = 0; s < u; ++s) this.each(d(l[s], a, r));
  return this;
}
function Y1(e, a, r) {
  var l = B1(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function pR(e, a) {
  return function() {
    return Y1(this, e, a);
  };
}
function gR(e, a) {
  return function() {
    return Y1(this, e, a.apply(this, arguments));
  };
}
function yR(e, a) {
  return this.each((typeof a == "function" ? gR : pR)(e, a));
}
function* vR() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var I1 = [null];
function Gn(e, a) {
  this._groups = e, this._parents = a;
}
function Wo() {
  return new Gn([[document.documentElement]], I1);
}
function bR() {
  return this;
}
Gn.prototype = Wo.prototype = {
  constructor: Gn,
  select: GN,
  selectAll: QN,
  selectChild: WN,
  selectChildren: aC,
  filter: iC,
  data: cC,
  enter: rC,
  exit: dC,
  join: hC,
  merge: mC,
  selection: bR,
  order: pC,
  sort: gC,
  call: vC,
  nodes: bC,
  node: xC,
  size: wC,
  empty: SC,
  each: EC,
  attr: DC,
  style: jC,
  property: BC,
  classed: $C,
  text: XC,
  html: PC,
  raise: JC,
  lower: eR,
  append: tR,
  insert: aR,
  remove: rR,
  clone: sR,
  datum: uR,
  on: mR,
  dispatch: yR,
  [Symbol.iterator]: vR
};
function In(e) {
  return typeof e == "string" ? new Gn([[document.querySelector(e)]], [document.documentElement]) : new Gn([[e]], I1);
}
function xR(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function ya(e, a) {
  if (e = xR(e), a === void 0 && (a = e.currentTarget), a) {
    var r = a.ownerSVGElement || a;
    if (r.createSVGPoint) {
      var l = r.createSVGPoint();
      return l.x = e.clientX, l.y = e.clientY, l = l.matrixTransform(a.getScreenCTM().inverse()), [l.x, l.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [e.clientX - s.left - a.clientLeft, e.clientY - s.top - a.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const wR = { passive: !1 }, Bo = { capture: !0, passive: !1 };
function Gd(e) {
  e.stopImmediatePropagation();
}
function yl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function G1(e) {
  var a = e.document.documentElement, r = In(e).on("dragstart.drag", yl, Bo);
  "onselectstart" in a ? r.on("selectstart.drag", yl, Bo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function X1(e, a) {
  var r = e.document.documentElement, l = In(e).on("dragstart.drag", null);
  a && (l.on("click.drag", yl, Bo), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const bu = (e) => () => e;
function bh(e, {
  sourceEvent: a,
  subject: r,
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
    subject: { value: r, enumerable: !0, configurable: !0 },
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
bh.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function SR(e) {
  return !e.ctrlKey && !e.button;
}
function ER() {
  return this.parentNode;
}
function _R(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function NR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function F1() {
  var e = SR, a = ER, r = _R, l = NR, s = {}, u = mc("start", "drag", "end"), c = 0, d, p, m, y, g = 0;
  function v(O) {
    O.on("mousedown.drag", x).filter(l).on("touchstart.drag", C).on("touchmove.drag", R, wR).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(O, k) {
    if (!(y || !e.call(this, O, k))) {
      var B = E(this, a.call(this, O, k), O, k, "mouse");
      B && (In(O.view).on("mousemove.drag", S, Bo).on("mouseup.drag", N, Bo), G1(O.view), Gd(O), m = !1, d = O.clientX, p = O.clientY, B("start", O));
    }
  }
  function S(O) {
    if (yl(O), !m) {
      var k = O.clientX - d, B = O.clientY - p;
      m = k * k + B * B > g;
    }
    s.mouse("drag", O);
  }
  function N(O) {
    In(O.view).on("mousemove.drag mouseup.drag", null), X1(O.view, m), yl(O), s.mouse("end", O);
  }
  function C(O, k) {
    if (e.call(this, O, k)) {
      var B = O.changedTouches, V = a.call(this, O, k), A = B.length, Y, te;
      for (Y = 0; Y < A; ++Y)
        (te = E(this, V, O, k, B[Y].identifier, B[Y])) && (Gd(O), te("start", O, B[Y]));
    }
  }
  function R(O) {
    var k = O.changedTouches, B = k.length, V, A;
    for (V = 0; V < B; ++V)
      (A = s[k[V].identifier]) && (yl(O), A("drag", O, k[V]));
  }
  function z(O) {
    var k = O.changedTouches, B = k.length, V, A;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), V = 0; V < B; ++V)
      (A = s[k[V].identifier]) && (Gd(O), A("end", O, k[V]));
  }
  function E(O, k, B, V, A, Y) {
    var te = u.copy(), $ = ya(Y || B, k), K, le, j;
    if ((j = r.call(O, new bh("beforestart", {
      sourceEvent: B,
      target: v,
      identifier: A,
      active: c,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: te
    }), V)) != null)
      return K = j.x - $[0] || 0, le = j.y - $[1] || 0, function I(T, L, F) {
        var G = $, Z;
        switch (T) {
          case "start":
            s[A] = I, Z = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            $ = ya(F || L, k), Z = c;
            break;
        }
        te.call(
          T,
          O,
          new bh(T, {
            sourceEvent: L,
            subject: j,
            target: v,
            identifier: A,
            active: Z,
            x: $[0] + K,
            y: $[1] + le,
            dx: $[0] - G[0],
            dy: $[1] - G[1],
            dispatch: te
          }),
          V
        );
      };
  }
  return v.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : bu(!!O), v) : e;
  }, v.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : bu(O), v) : a;
  }, v.subject = function(O) {
    return arguments.length ? (r = typeof O == "function" ? O : bu(O), v) : r;
  }, v.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : bu(!!O), v) : l;
  }, v.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? v : O;
  }, v.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, v) : Math.sqrt(g);
  }, v;
}
function um(e, a, r) {
  e.prototype = a.prototype = r, r.constructor = e;
}
function Z1(e, a) {
  var r = Object.create(e.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function es() {
}
var Uo = 0.7, Pu = 1 / Uo, vl = "\\s*([+-]?\\d+)\\s*", Vo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ka = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", CR = /^#([0-9a-f]{3,8})$/, RR = new RegExp(`^rgb\\(${vl},${vl},${vl}\\)$`), TR = new RegExp(`^rgb\\(${ka},${ka},${ka}\\)$`), MR = new RegExp(`^rgba\\(${vl},${vl},${vl},${Vo}\\)$`), DR = new RegExp(`^rgba\\(${ka},${ka},${ka},${Vo}\\)$`), AR = new RegExp(`^hsl\\(${Vo},${ka},${ka}\\)$`), zR = new RegExp(`^hsla\\(${Vo},${ka},${ka},${Vo}\\)$`), iv = {
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
um(es, Sr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: rv,
  // Deprecated! Use color.formatHex.
  formatHex: rv,
  formatHex8: OR,
  formatHsl: jR,
  formatRgb: lv,
  toString: lv
});
function rv() {
  return this.rgb().formatHex();
}
function OR() {
  return this.rgb().formatHex8();
}
function jR() {
  return Q1(this).formatHsl();
}
function lv() {
  return this.rgb().formatRgb();
}
function Sr(e) {
  var a, r;
  return e = (e + "").trim().toLowerCase(), (a = CR.exec(e)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? ov(a) : r === 3 ? new zn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? xu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? xu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = RR.exec(e)) ? new zn(a[1], a[2], a[3], 1) : (a = TR.exec(e)) ? new zn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = MR.exec(e)) ? xu(a[1], a[2], a[3], a[4]) : (a = DR.exec(e)) ? xu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = AR.exec(e)) ? cv(a[1], a[2] / 100, a[3] / 100, 1) : (a = zR.exec(e)) ? cv(a[1], a[2] / 100, a[3] / 100, a[4]) : iv.hasOwnProperty(e) ? ov(iv[e]) : e === "transparent" ? new zn(NaN, NaN, NaN, 0) : null;
}
function ov(e) {
  return new zn(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function xu(e, a, r, l) {
  return l <= 0 && (e = a = r = NaN), new zn(e, a, r, l);
}
function LR(e) {
  return e instanceof es || (e = Sr(e)), e ? (e = e.rgb(), new zn(e.r, e.g, e.b, e.opacity)) : new zn();
}
function xh(e, a, r, l) {
  return arguments.length === 1 ? LR(e) : new zn(e, a, r, l ?? 1);
}
function zn(e, a, r, l) {
  this.r = +e, this.g = +a, this.b = +r, this.opacity = +l;
}
um(zn, xh, Z1(es, {
  brighter(e) {
    return e = e == null ? Pu : Math.pow(Pu, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Uo : Math.pow(Uo, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new zn(xr(this.r), xr(this.g), xr(this.b), Ku(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: sv,
  // Deprecated! Use color.formatHex.
  formatHex: sv,
  formatHex8: HR,
  formatRgb: uv,
  toString: uv
}));
function sv() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}`;
}
function HR() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}${vr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function uv() {
  const e = Ku(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${xr(this.r)}, ${xr(this.g)}, ${xr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ku(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function xr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function vr(e) {
  return e = xr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function cv(e, a, r, l) {
  return l <= 0 ? e = a = r = NaN : r <= 0 || r >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new va(e, a, r, l);
}
function Q1(e) {
  if (e instanceof va) return new va(e.h, e.s, e.l, e.opacity);
  if (e instanceof es || (e = Sr(e)), !e) return new va();
  if (e instanceof va) return e;
  e = e.rgb();
  var a = e.r / 255, r = e.g / 255, l = e.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (r - l) / d + (r < l) * 6 : r === u ? c = (l - a) / d + 2 : c = (a - r) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new va(c, d, p, e.opacity);
}
function kR(e, a, r, l) {
  return arguments.length === 1 ? Q1(e) : new va(e, a, r, l ?? 1);
}
function va(e, a, r, l) {
  this.h = +e, this.s = +a, this.l = +r, this.opacity = +l;
}
um(va, kR, Z1(es, {
  brighter(e) {
    return e = e == null ? Pu : Math.pow(Pu, e), new va(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Uo : Math.pow(Uo, e), new va(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new zn(
      Xd(e >= 240 ? e - 240 : e + 120, s, l),
      Xd(e, s, l),
      Xd(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new va(fv(this.h), wu(this.s), wu(this.l), Ku(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ku(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${fv(this.h)}, ${wu(this.s) * 100}%, ${wu(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function fv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function wu(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Xd(e, a, r) {
  return (e < 60 ? a + (r - a) * e / 60 : e < 180 ? r : e < 240 ? a + (r - a) * (240 - e) / 60 : a) * 255;
}
const cm = (e) => () => e;
function BR(e, a) {
  return function(r) {
    return e + r * a;
  };
}
function UR(e, a, r) {
  return e = Math.pow(e, r), a = Math.pow(a, r) - e, r = 1 / r, function(l) {
    return Math.pow(e + l * a, r);
  };
}
function VR(e) {
  return (e = +e) == 1 ? P1 : function(a, r) {
    return r - a ? UR(a, r, e) : cm(isNaN(a) ? r : a);
  };
}
function P1(e, a) {
  var r = a - e;
  return r ? BR(e, r) : cm(isNaN(e) ? a : e);
}
const Ju = (function e(a) {
  var r = VR(a);
  function l(s, u) {
    var c = r((s = xh(s)).r, (u = xh(u)).r), d = r(s.g, u.g), p = r(s.b, u.b), m = P1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = d(y), s.b = p(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function qR(e, a) {
  a || (a = []);
  var r = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function $R(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function YR(e, a) {
  var r = a ? a.length : 0, l = e ? Math.min(r, e.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = Oo(e[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function IR(e, a) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, a = +a, function(l) {
    return r.setTime(e * (1 - l) + a * l), r;
  };
}
function ja(e, a) {
  return e = +e, a = +a, function(r) {
    return e * (1 - r) + a * r;
  };
}
function GR(e, a) {
  var r = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? r[s] = Oo(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var wh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Fd = new RegExp(wh.source, "g");
function XR(e) {
  return function() {
    return e;
  };
}
function FR(e) {
  return function(a) {
    return e(a) + "";
  };
}
function K1(e, a) {
  var r = wh.lastIndex = Fd.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = wh.exec(e)) && (s = Fd.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: ja(l, s) })), r = Fd.lastIndex;
  return r < a.length && (u = a.slice(r), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? FR(p[0].x) : XR(a) : (a = p.length, function(m) {
    for (var y = 0, g; y < a; ++y) d[(g = p[y]).i] = g.x(m);
    return d.join("");
  });
}
function Oo(e, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? cm(a) : (r === "number" ? ja : r === "string" ? (l = Sr(a)) ? (a = l, Ju) : K1 : a instanceof Sr ? Ju : a instanceof Date ? IR : $R(a) ? qR : Array.isArray(a) ? YR : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? GR : ja)(e, a);
}
var dv = 180 / Math.PI, Sh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function J1(e, a, r, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * r + a * l) && (r -= e * p, l -= a * p), (d = Math.sqrt(r * r + l * l)) && (r /= d, l /= d, p /= d), e * l < a * r && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * dv,
    skewX: Math.atan(p) * dv,
    scaleX: c,
    scaleY: d
  };
}
var Su;
function ZR(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Sh : J1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function QR(e) {
  return e == null || (Su || (Su = document.createElementNS("http://www.w3.org/2000/svg", "g")), Su.setAttribute("transform", e), !(e = Su.transform.baseVal.consolidate())) ? Sh : (e = e.matrix, J1(e.a, e.b, e.c, e.d, e.e, e.f));
}
function W1(e, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, g, v, x, S) {
    if (m !== g || y !== v) {
      var N = x.push("translate(", null, a, null, r);
      S.push({ i: N - 4, x: ja(m, g) }, { i: N - 2, x: ja(y, v) });
    } else (g || v) && x.push("translate(" + g + a + v + r);
  }
  function c(m, y, g, v) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), v.push({ i: g.push(s(g) + "rotate(", null, l) - 2, x: ja(m, y) })) : y && g.push(s(g) + "rotate(" + y + l);
  }
  function d(m, y, g, v) {
    m !== y ? v.push({ i: g.push(s(g) + "skewX(", null, l) - 2, x: ja(m, y) }) : y && g.push(s(g) + "skewX(" + y + l);
  }
  function p(m, y, g, v, x, S) {
    if (m !== g || y !== v) {
      var N = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: N - 4, x: ja(m, g) }, { i: N - 2, x: ja(y, v) });
    } else (g !== 1 || v !== 1) && x.push(s(x) + "scale(" + g + "," + v + ")");
  }
  return function(m, y) {
    var g = [], v = [];
    return m = e(m), y = e(y), u(m.translateX, m.translateY, y.translateX, y.translateY, g, v), c(m.rotate, y.rotate, g, v), d(m.skewX, y.skewX, g, v), p(m.scaleX, m.scaleY, y.scaleX, y.scaleY, g, v), m = y = null, function(x) {
      for (var S = -1, N = v.length, C; ++S < N; ) g[(C = v[S]).i] = C.x(x);
      return g.join("");
    };
  };
}
var PR = W1(ZR, "px, ", "px)", "deg)"), KR = W1(QR, ", ", ")", ")"), JR = 1e-12;
function hv(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function WR(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function eT(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const $u = (function e(a, r, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], y = c[0], g = c[1], v = c[2], x = y - d, S = g - p, N = x * x + S * S, C, R;
    if (N < JR)
      R = Math.log(v / m) / a, C = function(V) {
        return [
          d + V * x,
          p + V * S,
          m * Math.exp(a * V * R)
        ];
      };
    else {
      var z = Math.sqrt(N), E = (v * v - m * m + l * N) / (2 * m * r * z), O = (v * v - m * m - l * N) / (2 * v * r * z), k = Math.log(Math.sqrt(E * E + 1) - E), B = Math.log(Math.sqrt(O * O + 1) - O);
      R = (B - k) / a, C = function(V) {
        var A = V * R, Y = hv(k), te = m / (r * z) * (Y * eT(a * A + k) - WR(k));
        return [
          d + te * x,
          p + te * S,
          m * Y / hv(a * A + k)
        ];
      };
    }
    return C.duration = R * 1e3 * a / Math.SQRT2, C;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var wl = 0, Do = 0, No = 0, ex = 1e3, Wu, Ao, ec = 0, Er = 0, gc = 0, qo = typeof performance == "object" && performance.now ? performance : Date, tx = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function fm() {
  return Er || (tx(tT), Er = qo.now() + gc);
}
function tT() {
  Er = 0;
}
function tc() {
  this._call = this._time = this._next = null;
}
tc.prototype = nx.prototype = {
  constructor: tc,
  restart: function(e, a, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? fm() : +r) + (a == null ? 0 : +a), !this._next && Ao !== this && (Ao ? Ao._next = this : Wu = this, Ao = this), this._call = e, this._time = r, Eh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Eh());
  }
};
function nx(e, a, r) {
  var l = new tc();
  return l.restart(e, a, r), l;
}
function nT() {
  fm(), ++wl;
  for (var e = Wu, a; e; )
    (a = Er - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --wl;
}
function mv() {
  Er = (ec = qo.now()) + gc, wl = Do = 0;
  try {
    nT();
  } finally {
    wl = 0, iT(), Er = 0;
  }
}
function aT() {
  var e = qo.now(), a = e - ec;
  a > ex && (gc -= a, ec = e);
}
function iT() {
  for (var e, a = Wu, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (r = a._next, a._next = null, a = e ? e._next = r : Wu = r);
  Ao = e, Eh(l);
}
function Eh(e) {
  if (!wl) {
    Do && (Do = clearTimeout(Do));
    var a = e - Er;
    a > 24 ? (e < 1 / 0 && (Do = setTimeout(mv, e - qo.now() - gc)), No && (No = clearInterval(No))) : (No || (ec = qo.now(), No = setInterval(aT, ex)), wl = 1, tx(mv));
  }
}
function pv(e, a, r) {
  var l = new tc();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, r), l;
}
var rT = mc("start", "end", "cancel", "interrupt"), lT = [], ax = 0, gv = 1, _h = 2, Yu = 3, yv = 4, Nh = 5, Iu = 6;
function yc(e, a, r, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (r in c) return;
  oT(e, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: rT,
    tween: lT,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: ax
  });
}
function dm(e, a) {
  var r = Ea(e, a);
  if (r.state > ax) throw new Error("too late; already scheduled");
  return r;
}
function qa(e, a) {
  var r = Ea(e, a);
  if (r.state > Yu) throw new Error("too late; already running");
  return r;
}
function Ea(e, a) {
  var r = e.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function oT(e, a, r) {
  var l = e.__transition, s;
  l[a] = r, r.timer = nx(u, 0, r.time);
  function u(m) {
    r.state = gv, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var y, g, v, x;
    if (r.state !== gv) return p();
    for (y in l)
      if (x = l[y], x.name === r.name) {
        if (x.state === Yu) return pv(c);
        x.state === yv ? (x.state = Iu, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[y]) : +y < a && (x.state = Iu, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[y]);
      }
    if (pv(function() {
      r.state === Yu && (r.state = yv, r.timer.restart(d, r.delay, r.time), d(m));
    }), r.state = _h, r.on.call("start", e, e.__data__, r.index, r.group), r.state === _h) {
      for (r.state = Yu, s = new Array(v = r.tween.length), y = 0, g = -1; y < v; ++y)
        (x = r.tween[y].value.call(e, e.__data__, r.index, r.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var y = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(p), r.state = Nh, 1), g = -1, v = s.length; ++g < v; )
      s[g].call(e, y);
    r.state === Nh && (r.on.call("end", e, e.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = Iu, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function Gu(e, a) {
  var r = e.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > _h && l.state < Nh, l.state = Iu, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete r[c];
    }
    u && delete e.__transition;
  }
}
function sT(e) {
  return this.each(function() {
    Gu(this, e);
  });
}
function uT(e, a) {
  var r, l;
  return function() {
    var s = qa(this, e), u = s.tween;
    if (u !== r) {
      l = r = u;
      for (var c = 0, d = l.length; c < d; ++c)
        if (l[c].name === a) {
          l = l.slice(), l.splice(c, 1);
          break;
        }
    }
    s.tween = l;
  };
}
function cT(e, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = qa(this, e), c = u.tween;
    if (c !== l) {
      s = (l = c).slice();
      for (var d = { name: a, value: r }, p = 0, m = s.length; p < m; ++p)
        if (s[p].name === a) {
          s[p] = d;
          break;
        }
      p === m && s.push(d);
    }
    u.tween = s;
  };
}
function fT(e, a) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = Ea(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? uT : cT)(r, e, a));
}
function hm(e, a, r) {
  var l = e._id;
  return e.each(function() {
    var s = qa(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return Ea(s, l).value[a];
  };
}
function ix(e, a) {
  var r;
  return (typeof a == "number" ? ja : a instanceof Sr ? Ju : (r = Sr(a)) ? (a = r, Ju) : K1)(e, a);
}
function dT(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function hT(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function mT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function pT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function gT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function yT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function vT(e, a) {
  var r = pc(e), l = r === "transform" ? KR : ix;
  return this.attrTween(e, typeof a == "function" ? (r.local ? yT : gT)(r, l, hm(this, "attr." + e, a)) : a == null ? (r.local ? hT : dT)(r) : (r.local ? pT : mT)(r, l, a));
}
function bT(e, a) {
  return function(r) {
    this.setAttribute(e, a.call(this, r));
  };
}
function xT(e, a) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, a.call(this, r));
  };
}
function wT(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && xT(e, u)), r;
  }
  return s._value = a, s;
}
function ST(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && bT(e, u)), r;
  }
  return s._value = a, s;
}
function ET(e, a) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = pc(e);
  return this.tween(r, (l.local ? wT : ST)(l, a));
}
function _T(e, a) {
  return function() {
    dm(this, e).delay = +a.apply(this, arguments);
  };
}
function NT(e, a) {
  return a = +a, function() {
    dm(this, e).delay = a;
  };
}
function CT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? _T : NT)(a, e)) : Ea(this.node(), a).delay;
}
function RT(e, a) {
  return function() {
    qa(this, e).duration = +a.apply(this, arguments);
  };
}
function TT(e, a) {
  return a = +a, function() {
    qa(this, e).duration = a;
  };
}
function MT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? RT : TT)(a, e)) : Ea(this.node(), a).duration;
}
function DT(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    qa(this, e).ease = a;
  };
}
function AT(e) {
  var a = this._id;
  return arguments.length ? this.each(DT(a, e)) : Ea(this.node(), a).ease;
}
function zT(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    qa(this, e).ease = r;
  };
}
function OT(e) {
  if (typeof e != "function") throw new Error();
  return this.each(zT(this._id, e));
}
function jT(e) {
  typeof e != "function" && (e = L1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new fi(l, this._parents, this._name, this._id);
}
function LT(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, r = e._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = r[d], y = p.length, g = c[d] = new Array(y), v, x = 0; x < y; ++x)
      (v = p[x] || m[x]) && (g[x] = v);
  for (; d < l; ++d)
    c[d] = a[d];
  return new fi(c, this._parents, this._name, this._id);
}
function HT(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function kT(e, a, r) {
  var l, s, u = HT(a) ? dm : qa;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, r), c.on = s;
  };
}
function BT(e, a) {
  var r = this._id;
  return arguments.length < 2 ? Ea(this.node(), r).on.on(e) : this.each(kT(r, e, a));
}
function UT(e) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    a && a.removeChild(this);
  };
}
function VT() {
  return this.on("end.remove", UT(this._id));
}
function qT(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = om(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), y, g, v = 0; v < p; ++v)
      (y = d[v]) && (g = e.call(y, y.__data__, v, d)) && ("__data__" in y && (g.__data__ = y.__data__), m[v] = g, yc(m[v], a, r, v, m, Ea(y, r)));
  return new fi(u, this._parents, a, r);
}
function $T(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = j1(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, y, g = 0; g < m; ++g)
      if (y = p[g]) {
        for (var v = e.call(y, y.__data__, g, p), x, S = Ea(y, r), N = 0, C = v.length; N < C; ++N)
          (x = v[N]) && yc(x, a, r, N, v, S);
        u.push(v), c.push(y);
      }
  return new fi(u, c, a, r);
}
var YT = Wo.prototype.constructor;
function IT() {
  return new YT(this._groups, this._parents);
}
function GT(e, a) {
  var r, l, s;
  return function() {
    var u = xl(this, e), c = (this.style.removeProperty(e), xl(this, e));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function rx(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function XT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = xl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function FT(e, a, r) {
  var l, s, u;
  return function() {
    var c = xl(this, e), d = r(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), xl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function ZT(e, a) {
  var r, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = qa(this, e), m = p.on, y = p.value[u] == null ? d || (d = rx(a)) : void 0;
    (m !== r || s !== y) && (l = (r = m).copy()).on(c, s = y), p.on = l;
  };
}
function QT(e, a, r) {
  var l = (e += "") == "transform" ? PR : ix;
  return a == null ? this.styleTween(e, GT(e, l)).on("end.style." + e, rx(e)) : typeof a == "function" ? this.styleTween(e, FT(e, l, hm(this, "style." + e, a))).each(ZT(this._id, e)) : this.styleTween(e, XT(e, l, a), r).on("end.style." + e, null);
}
function PT(e, a, r) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), r);
  };
}
function KT(e, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && PT(e, c, r)), l;
  }
  return u._value = a, u;
}
function JT(e, a, r) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, KT(e, a, r ?? ""));
}
function WT(e) {
  return function() {
    this.textContent = e;
  };
}
function eM(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function tM(e) {
  return this.tween("text", typeof e == "function" ? eM(hm(this, "text", e)) : WT(e == null ? "" : e + ""));
}
function nM(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function aM(e) {
  var a, r;
  function l() {
    var s = e.apply(this, arguments);
    return s !== r && (a = (r = s) && nM(s)), a;
  }
  return l._value = e, l;
}
function iM(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, aM(e));
}
function rM() {
  for (var e = this._name, a = this._id, r = lx(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var y = Ea(p, a);
        yc(p, e, r, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new fi(l, this._parents, e, r);
}
function lM() {
  var e, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var m = qa(this, l), y = m.on;
      y !== e && (a = (e = y).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), m.on = a;
    }), s === 0 && u();
  });
}
var oM = 0;
function fi(e, a, r, l) {
  this._groups = e, this._parents = a, this._name = r, this._id = l;
}
function lx() {
  return ++oM;
}
var li = Wo.prototype;
fi.prototype = {
  constructor: fi,
  select: qT,
  selectAll: $T,
  selectChild: li.selectChild,
  selectChildren: li.selectChildren,
  filter: jT,
  merge: LT,
  selection: IT,
  transition: rM,
  call: li.call,
  nodes: li.nodes,
  node: li.node,
  size: li.size,
  empty: li.empty,
  each: li.each,
  on: BT,
  attr: vT,
  attrTween: ET,
  style: QT,
  styleTween: JT,
  text: tM,
  textTween: iM,
  remove: VT,
  tween: fT,
  delay: CT,
  duration: MT,
  ease: AT,
  easeVarying: OT,
  end: lM,
  [Symbol.iterator]: li[Symbol.iterator]
};
function sM(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var uM = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: sM
};
function cM(e, a) {
  for (var r; !(r = e.__transition) || !(r = r[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function fM(e) {
  var a, r;
  e instanceof fi ? (a = e._id, e = e._name) : (a = lx(), (r = uM).time = fm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && yc(p, e, a, m, c, r || cM(p, a));
  return new fi(l, this._parents, e, a);
}
Wo.prototype.interrupt = sT;
Wo.prototype.transition = fM;
const Eu = (e) => () => e;
function dM(e, {
  sourceEvent: a,
  target: r,
  transform: l,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: l, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function ui(e, a, r) {
  this.k = e, this.x = a, this.y = r;
}
ui.prototype = {
  constructor: ui,
  scale: function(e) {
    return e === 1 ? this : new ui(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new ui(this.k, this.x + this.k * e, this.y + this.k * a);
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
var vc = new ui(1, 0, 0);
ox.prototype = ui.prototype;
function ox(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return vc;
  return e.__zoom;
}
function Zd(e) {
  e.stopImmediatePropagation();
}
function Co(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function hM(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function mM() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function vv() {
  return this.__zoom || vc;
}
function pM(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function gM() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function yM(e, a, r) {
  var l = e.invertX(a[0][0]) - r[0][0], s = e.invertX(a[1][0]) - r[1][0], u = e.invertY(a[0][1]) - r[0][1], c = e.invertY(a[1][1]) - r[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function sx() {
  var e = hM, a = mM, r = yM, l = pM, s = gM, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = $u, m = mc("start", "zoom", "end"), y, g, v, x = 500, S = 150, N = 0, C = 10;
  function R(j) {
    j.property("__zoom", vv).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", Y).on("dblclick.zoom", te).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", le).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  R.transform = function(j, I, T, L) {
    var F = j.selection ? j.selection() : j;
    F.property("__zoom", vv), j !== F ? k(j, I, T, L) : F.interrupt().each(function() {
      B(this, arguments).event(L).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, R.scaleBy = function(j, I, T, L) {
    R.scaleTo(j, function() {
      var F = this.__zoom.k, G = typeof I == "function" ? I.apply(this, arguments) : I;
      return F * G;
    }, T, L);
  }, R.scaleTo = function(j, I, T, L) {
    R.transform(j, function() {
      var F = a.apply(this, arguments), G = this.__zoom, Z = T == null ? O(F) : typeof T == "function" ? T.apply(this, arguments) : T, D = G.invert(Z), H = typeof I == "function" ? I.apply(this, arguments) : I;
      return r(E(z(G, H), Z, D), F, c);
    }, T, L);
  }, R.translateBy = function(j, I, T, L) {
    R.transform(j, function() {
      return r(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), a.apply(this, arguments), c);
    }, null, L);
  }, R.translateTo = function(j, I, T, L, F) {
    R.transform(j, function() {
      var G = a.apply(this, arguments), Z = this.__zoom, D = L == null ? O(G) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(vc.translate(D[0], D[1]).scale(Z.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), G, c);
    }, L, F);
  };
  function z(j, I) {
    return I = Math.max(u[0], Math.min(u[1], I)), I === j.k ? j : new ui(I, j.x, j.y);
  }
  function E(j, I, T) {
    var L = I[0] - T[0] * j.k, F = I[1] - T[1] * j.k;
    return L === j.x && F === j.y ? j : new ui(j.k, L, F);
  }
  function O(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function k(j, I, T, L) {
    j.on("start.zoom", function() {
      B(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var F = this, G = arguments, Z = B(F, G).event(L), D = a.apply(F, G), H = T == null ? O(D) : typeof T == "function" ? T.apply(F, G) : T, P = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), ne = F.__zoom, se = typeof I == "function" ? I.apply(F, G) : I, he = p(ne.invert(H).concat(P / ne.k), se.invert(H).concat(P / se.k));
      return function(me) {
        if (me === 1) me = se;
        else {
          var ee = he(me), ge = P / ee[2];
          me = new ui(ge, H[0] - ee[0] * ge, H[1] - ee[1] * ge);
        }
        Z.zoom(null, me);
      };
    });
  }
  function B(j, I, T) {
    return !T && j.__zooming || new V(j, I);
  }
  function V(j, I) {
    this.that = j, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = a.apply(j, I), this.taps = 0;
  }
  V.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, I) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = I.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = I.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = I.invert(this.touch1[0])), this.that.__zoom = I, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var I = In(this.that).datum();
      m.call(
        j,
        this.that,
        new dM(j, {
          sourceEvent: this.sourceEvent,
          target: R,
          transform: this.that.__zoom,
          dispatch: m
        }),
        I
      );
    }
  };
  function A(j, ...I) {
    if (!e.apply(this, arguments)) return;
    var T = B(this, I).event(j), L = this.__zoom, F = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, l.apply(this, arguments)))), G = ya(j);
    if (T.wheel)
      (T.mouse[0][0] !== G[0] || T.mouse[0][1] !== G[1]) && (T.mouse[1] = L.invert(T.mouse[0] = G)), clearTimeout(T.wheel);
    else {
      if (L.k === F) return;
      T.mouse = [G, L.invert(G)], Gu(this), T.start();
    }
    Co(j), T.wheel = setTimeout(Z, S), T.zoom("mouse", r(E(z(L, F), T.mouse[0], T.mouse[1]), T.extent, c));
    function Z() {
      T.wheel = null, T.end();
    }
  }
  function Y(j, ...I) {
    if (v || !e.apply(this, arguments)) return;
    var T = j.currentTarget, L = B(this, I, !0).event(j), F = In(j.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", P, !0), G = ya(j, T), Z = j.clientX, D = j.clientY;
    G1(j.view), Zd(j), L.mouse = [G, this.__zoom.invert(G)], Gu(this), L.start();
    function H(ne) {
      if (Co(ne), !L.moved) {
        var se = ne.clientX - Z, he = ne.clientY - D;
        L.moved = se * se + he * he > N;
      }
      L.event(ne).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = ya(ne, T), L.mouse[1]), L.extent, c));
    }
    function P(ne) {
      F.on("mousemove.zoom mouseup.zoom", null), X1(ne.view, L.moved), Co(ne), L.event(ne).end();
    }
  }
  function te(j, ...I) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, L = ya(j.changedTouches ? j.changedTouches[0] : j, this), F = T.invert(L), G = T.k * (j.shiftKey ? 0.5 : 2), Z = r(E(z(T, G), L, F), a.apply(this, I), c);
      Co(j), d > 0 ? In(this).transition().duration(d).call(k, Z, L, j) : In(this).call(R.transform, Z, L, j);
    }
  }
  function $(j, ...I) {
    if (e.apply(this, arguments)) {
      var T = j.touches, L = T.length, F = B(this, I, j.changedTouches.length === L).event(j), G, Z, D, H;
      for (Zd(j), Z = 0; Z < L; ++Z)
        D = T[Z], H = ya(D, this), H = [H, this.__zoom.invert(H), D.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== H[2] && (F.touch1 = H, F.taps = 0) : (F.touch0 = H, G = !0, F.taps = 1 + !!y);
      y && (y = clearTimeout(y)), G && (F.taps < 2 && (g = H[0], y = setTimeout(function() {
        y = null;
      }, x)), Gu(this), F.start());
    }
  }
  function K(j, ...I) {
    if (this.__zooming) {
      var T = B(this, I).event(j), L = j.changedTouches, F = L.length, G, Z, D, H;
      for (Co(j), G = 0; G < F; ++G)
        Z = L[G], D = ya(Z, this), T.touch0 && T.touch0[2] === Z.identifier ? T.touch0[0] = D : T.touch1 && T.touch1[2] === Z.identifier && (T.touch1[0] = D);
      if (Z = T.that.__zoom, T.touch1) {
        var P = T.touch0[0], ne = T.touch0[1], se = T.touch1[0], he = T.touch1[1], me = (me = se[0] - P[0]) * me + (me = se[1] - P[1]) * me, ee = (ee = he[0] - ne[0]) * ee + (ee = he[1] - ne[1]) * ee;
        Z = z(Z, Math.sqrt(me / ee)), D = [(P[0] + se[0]) / 2, (P[1] + se[1]) / 2], H = [(ne[0] + he[0]) / 2, (ne[1] + he[1]) / 2];
      } else if (T.touch0) D = T.touch0[0], H = T.touch0[1];
      else return;
      T.zoom("touch", r(E(Z, D, H), T.extent, c));
    }
  }
  function le(j, ...I) {
    if (this.__zooming) {
      var T = B(this, I).event(j), L = j.changedTouches, F = L.length, G, Z;
      for (Zd(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), G = 0; G < F; ++G)
        Z = L[G], T.touch0 && T.touch0[2] === Z.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === Z.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (Z = ya(Z, this), Math.hypot(g[0] - Z[0], g[1] - Z[1]) < C)) {
        var D = In(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return R.wheelDelta = function(j) {
    return arguments.length ? (l = typeof j == "function" ? j : Eu(+j), R) : l;
  }, R.filter = function(j) {
    return arguments.length ? (e = typeof j == "function" ? j : Eu(!!j), R) : e;
  }, R.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : Eu(!!j), R) : s;
  }, R.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : Eu([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), R) : a;
  }, R.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], R) : [u[0], u[1]];
  }, R.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], R) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, R.constrain = function(j) {
    return arguments.length ? (r = j, R) : r;
  }, R.duration = function(j) {
    return arguments.length ? (d = +j, R) : d;
  }, R.interpolate = function(j) {
    return arguments.length ? (p = j, R) : p;
  }, R.on = function() {
    var j = m.on.apply(m, arguments);
    return j === m ? R : j;
  }, R.clickDistance = function(j) {
    return arguments.length ? (N = (j = +j) * j, R) : Math.sqrt(N);
  }, R.tapDistance = function(j) {
    return arguments.length ? (C = +j, R) : C;
  }, R;
}
const wa = {
  error001: (e = "react") => `Seems like you have not used zustand provider as an ancestor. Help: https://${e}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (e) => `The old edge with id=${e} does not exist.`,
  error009: (e) => `Marker type "${e}" doesn't exist.`,
  error008: (e, { id: a, sourceHandle: r, targetHandle: l }) => `Couldn't create edge for ${e} handle id: "${e === "source" ? r : l}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
  error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (e = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (e) => `Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, $o = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], ux = ["Enter", " ", "Escape"], cx = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: a, y: r }) => `Moved selected node ${e}. New position, x: ${a}, y: ${r}`,
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
var Sl;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Sl || (Sl = {}));
var wr;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(wr || (wr = {}));
var Yo;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Yo || (Yo = {}));
const fx = {
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
var Xi;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Xi || (Xi = {}));
var nc;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(nc || (nc = {}));
var Ae;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(Ae || (Ae = {}));
const bv = {
  [Ae.Left]: Ae.Right,
  [Ae.Right]: Ae.Left,
  [Ae.Top]: Ae.Bottom,
  [Ae.Bottom]: Ae.Top
};
function dx(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const hx = (e) => "id" in e && "source" in e && "target" in e, vM = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), mm = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), ts = (e, a = [0, 0]) => {
  const { width: r, height: l } = hi(e), s = e.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, bM = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : mm(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? ac(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return bc(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return xc(r);
}, ns = (e, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = bc(r, ac(s)), l = !0);
  }), l ? xc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, pm = (e, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...Tl(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: y, selectable: g = !0, hidden: v = !1 } = m;
    if (c && !g || v)
      continue;
    const x = y.width ?? m.width ?? m.initialWidth ?? null, S = y.height ?? m.height ?? m.initialHeight ?? null, N = Io(d, _l(m)), C = (x ?? 0) * (S ?? 0), R = u && N > 0;
    (!m.internals.handleBounds || R || N >= C || m.dragging) && p.push(m);
  }
  return p;
}, xM = (e, a) => {
  const r = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function wM(e, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function SM({ nodes: e, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = wM(e, c), p = ns(d), m = ym(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function mx({ nodeId: e, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(e), d = c.parentId ? r.get(c.parentId) : void 0, { x: p, y: m } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? l;
  let g = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", wa.error005());
    else {
      const x = d.measured.width, S = d.measured.height;
      x && S && (g = [
        [p, m],
        [p + x, m + S]
      ]);
    }
  else d && Nr(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + m],
    [c.extent[1][0] + p, c.extent[1][1] + m]
  ]);
  const v = Nr(g) ? _r(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", wa.error015()), {
    position: {
      x: v.x - p + (c.measured.width ?? 0) * y[0],
      y: v.y - m + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function EM({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && c.find((N) => N.id === v.parentId);
    (x || S) && c.push(v);
  }
  const d = new Set(a.map((v) => v.id)), p = l.filter((v) => v.deletable !== !1), y = xM(c, p);
  for (const v of p)
    d.has(v.id) && !y.find((S) => S.id === v.id) && y.push(v);
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
const El = (e, a = 0, r = 1) => Math.min(Math.max(e, a), r), _r = (e = { x: 0, y: 0 }, a, r) => ({
  x: El(e.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: El(e.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function px(e, a, r) {
  const { width: l, height: s } = hi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return _r(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const xv = (e, a, r) => e < a ? El(Math.abs(e - a), 1, a) / a : e > r ? -El(Math.abs(e - r), 1, a) / a : 0, gm = (e, a, r = 15, l = 40) => {
  const s = xv(e.x, l, a.width - l) * r, u = xv(e.y, l, a.height - l) * r;
  return [s, u];
}, bc = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), Ch = ({ x: e, y: a, width: r, height: l }) => ({
  x: e,
  y: a,
  x2: e + r,
  y2: a + l
}), xc = ({ x: e, y: a, x2: r, y2: l }) => ({
  x: e,
  y: a,
  width: r - e,
  height: l - a
}), _l = (e, a = [0, 0]) => {
  const { x: r, y: l } = mm(e) ? e.internals.positionAbsolute : ts(e, a);
  return {
    x: r,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, ac = (e, a = [0, 0]) => {
  const { x: r, y: l } = mm(e) ? e.internals.positionAbsolute : ts(e, a);
  return {
    x: r,
    y: l,
    x2: r + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, gx = (e, a) => xc(bc(Ch(e), Ch(a))), Io = (e, a) => {
  const r = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(r * l);
}, wv = (e) => ba(e.width) && ba(e.height) && ba(e.x) && ba(e.y), ba = (e) => !isNaN(e) && isFinite(e), yx = (e, a) => (r, l) => {
}, as = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), Tl = ({ x: e, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - r) / s,
    y: (a - l) / s
  };
  return u ? as(d, c) : d;
}, Nl = ({ x: e, y: a }, [r, l, s]) => ({
  x: e * s + r,
  y: a * s + l
});
function sl(e, a) {
  if (typeof e == "number")
    return Math.floor((a - a / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const r = parseFloat(e);
    if (!Number.isNaN(r))
      return Math.floor(r);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const r = parseFloat(e);
    if (!Number.isNaN(r))
      return Math.floor(a * r * 0.01);
  }
  return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function _M(e, a, r) {
  if (typeof e == "string" || typeof e == "number") {
    const l = sl(e, r), s = sl(e, a);
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
    const l = sl(e.top ?? e.y ?? 0, r), s = sl(e.bottom ?? e.y ?? 0, r), u = sl(e.left ?? e.x ?? 0, a), c = sl(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function NM(e, a, r, l, s, u) {
  const { x: c, y: d } = Nl(e, [a, r, l]), { x: p, y: m } = Nl({ x: e.x + e.width, y: e.y + e.height }, [a, r, l]), y = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(y),
    bottom: Math.floor(g)
  };
}
const ym = (e, a, r, l, s, u) => {
  const c = _M(u, a, r), d = (a - c.x) / e.width, p = (r - c.y) / e.height, m = Math.min(d, p), y = El(m, l, s), g = e.x + e.width / 2, v = e.y + e.height / 2, x = a / 2 - g * y, S = r / 2 - v * y, N = NM(e, x, S, y, a, r), C = {
    left: Math.min(N.left - c.left, 0),
    top: Math.min(N.top - c.top, 0),
    right: Math.min(N.right - c.right, 0),
    bottom: Math.min(N.bottom - c.bottom, 0)
  };
  return {
    x: x - C.left + C.right,
    y: S - C.top + C.bottom,
    zoom: y
  };
}, Go = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Nr(e) {
  return e != null && e !== "parent";
}
function hi(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function vx(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function bx(e, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...e }, c = l.get(r);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function Sv(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const r of e)
    if (!a.has(r))
      return !1;
  return !0;
}
function CM() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function RM(e) {
  return { ...cx, ...e || {} };
}
function jo(e, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = xa(e), d = Tl({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = r ? as(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const vm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), xx = (e) => e?.getRootNode?.() || window?.document, TM = ["INPUT", "SELECT", "TEXTAREA"];
function wx(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : TM.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const Sx = (e) => "clientX" in e, xa = (e, a) => {
  const r = Sx(e), l = r ? e.clientX : e.touches?.[0].clientX, s = r ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, Ev = (e, a, r, l, s) => {
  const u = a.querySelectorAll(`.${e}`);
  return !u || !u.length ? null : Array.from(u).map((c) => {
    const d = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      type: e,
      nodeId: s,
      position: c.getAttribute("data-handlepos"),
      x: (d.left - r.left) / l,
      y: (d.top - r.top) / l,
      ...vm(c)
    };
  });
};
function Ex({ sourceX: e, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, y = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, y, g];
}
function _u(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function _v({ pos: e, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (e) {
    case Ae.Left:
      return [a - _u(a - l, u), r];
    case Ae.Right:
      return [a + _u(l - a, u), r];
    case Ae.Top:
      return [a, r - _u(r - s, u)];
    case Ae.Bottom:
      return [a, r + _u(s - r, u)];
  }
}
function _x({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, curvature: c = 0.25 }) {
  const [d, p] = _v({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = _v({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, v, x, S] = Ex({
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
    v,
    x,
    S
  ];
}
function Nx({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - e) / 2, u = r < e ? r + s : r - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function MM({ sourceNode: e, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function DM({ sourceNode: e, targetNode: a, width: r, height: l, transform: s }) {
  const u = bc(ac(e), ac(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Io(c, xc(u)) > 0;
}
const AM = ({ source: e, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${e}${a || ""}-${r}${l || ""}`, zM = (e, a) => a.some((r) => r.source === e.source && r.target === e.target && (r.sourceHandle === e.sourceHandle || !r.sourceHandle && !e.sourceHandle) && (r.targetHandle === e.targetHandle || !r.targetHandle && !e.targetHandle)), OM = (e, a, r = {}) => {
  if (!e.source || !e.target)
    return r.onError?.("006", wa.error006()), a;
  const l = r.getEdgeId || AM;
  let s;
  return hx(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, zM(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function Cx({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, d] = Nx({
    sourceX: e,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${e},${a}L ${r},${l}`, s, u, c, d];
}
const Nv = {
  [Ae.Left]: { x: -1, y: 0 },
  [Ae.Right]: { x: 1, y: 0 },
  [Ae.Top]: { x: 0, y: -1 },
  [Ae.Bottom]: { x: 0, y: 1 }
}, jM = ({ source: e, sourcePosition: a = Ae.Bottom, target: r }) => a === Ae.Left || a === Ae.Right ? e.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Cv = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function LM({ source: e, sourcePosition: a = Ae.Bottom, target: r, targetPosition: l = Ae.Top, center: s, offset: u, stepPosition: c }) {
  const d = Nv[a], p = Nv[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, y = { x: r.x + p.x * u, y: r.y + p.y * u }, g = jM({
    source: m,
    sourcePosition: a,
    target: y
  }), v = g.x !== 0 ? "x" : "y", x = g[v];
  let S = [], N, C;
  const R = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [, , E, O] = Nx({
    sourceX: e.x,
    sourceY: e.y,
    targetX: r.x,
    targetY: r.y
  });
  if (d[v] * p[v] === -1) {
    v === "x" ? (N = s.x ?? m.x + (y.x - m.x) * c, C = s.y ?? (m.y + y.y) / 2) : (N = s.x ?? (m.x + y.x) / 2, C = s.y ?? m.y + (y.y - m.y) * c);
    const A = [
      { x: N, y: m.y },
      { x: N, y: y.y }
    ], Y = [
      { x: m.x, y: C },
      { x: y.x, y: C }
    ];
    d[v] === x ? S = v === "x" ? A : Y : S = v === "x" ? Y : A;
  } else {
    const A = [{ x: m.x, y: y.y }], Y = [{ x: y.x, y: m.y }];
    if (v === "x" ? S = d.x === x ? Y : A : S = d.y === x ? A : Y, a === l) {
      const j = Math.abs(e[v] - r[v]);
      if (j <= u) {
        const I = Math.min(u - 1, u - j);
        d[v] === x ? R[v] = (m[v] > e[v] ? -1 : 1) * I : z[v] = (y[v] > r[v] ? -1 : 1) * I;
      }
    }
    if (a !== l) {
      const j = v === "x" ? "y" : "x", I = d[v] === p[j], T = m[j] > y[j], L = m[j] < y[j];
      (d[v] === 1 && (!I && T || I && L) || d[v] !== 1 && (!I && L || I && T)) && (S = v === "x" ? A : Y);
    }
    const te = { x: m.x + R.x, y: m.y + R.y }, $ = { x: y.x + z.x, y: y.y + z.y }, K = Math.max(Math.abs(te.x - S[0].x), Math.abs($.x - S[0].x)), le = Math.max(Math.abs(te.y - S[0].y), Math.abs($.y - S[0].y));
    K >= le ? (N = (te.x + $.x) / 2, C = S[0].y) : (N = S[0].x, C = (te.y + $.y) / 2);
  }
  const k = { x: m.x + R.x, y: m.y + R.y }, B = { x: y.x + z.x, y: y.y + z.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...k.x !== S[0].x || k.y !== S[0].y ? [k] : [],
    ...S,
    ...B.x !== S[S.length - 1].x || B.y !== S[S.length - 1].y ? [B] : [],
    r
  ], N, C, E, O];
}
function HM(e, a, r, l) {
  const s = Math.min(Cv(e, a) / 2, Cv(a, r) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === r.x || e.y === c && c === r.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < r.x ? -1 : 1, y = e.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const d = e.x < r.x ? 1 : -1, p = e.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function Rh({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: y = 0.5 }) {
  const [g, v, x, S, N] = LM({
    source: { x: e, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: y
  });
  let C = `M${g[0].x} ${g[0].y}`;
  for (let R = 1; R < g.length - 1; R++)
    C += HM(g[R - 1], g[R], g[R + 1], c);
  return C += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [C, v, x, S, N];
}
function Rv(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function kM(e) {
  const { sourceNode: a, targetNode: r } = e;
  if (!Rv(a) || !Rv(r))
    return null;
  const l = a.internals.handleBounds || Tv(a.handles), s = r.internals.handleBounds || Tv(r.handles), u = Mv(l?.source ?? [], e.sourceHandle), c = Mv(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Sl.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", wa.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || Ae.Bottom, p = c?.position || Ae.Top, m = Cr(a, u, d), y = Cr(r, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function Tv(e) {
  if (!e)
    return null;
  const a = [], r = [];
  for (const l of e)
    l.width = l.width ?? 1, l.height = l.height ?? 1, l.type === "source" ? a.push(l) : l.type === "target" && r.push(l);
  return {
    source: a,
    target: r
  };
}
function Cr(e, a, r = Ae.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? hi(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? r) {
    case Ae.Top:
      return { x: s + c / 2, y: u };
    case Ae.Right:
      return { x: s + c, y: u + d / 2 };
    case Ae.Bottom:
      return { x: s + c / 2, y: u + d };
    case Ae.Left:
      return { x: s, y: u + d / 2 };
  }
}
function Mv(e, a) {
  return e && (a ? e.find((r) => r.id === a) : e[0]) || null;
}
function Th(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function BM(e, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = Th(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || r, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const Rx = 1e3, UM = 10, bm = {
  nodeOrigin: [0, 0],
  nodeExtent: $o,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, VM = {
  ...bm,
  checkEquality: !0
};
function xm(e, a) {
  const r = { ...e };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function qM(e, a, r) {
  const l = xm(bm, r);
  for (const s of e.values())
    if (s.parentId)
      Sm(s, e, a, l);
    else {
      const u = ts(s, l.nodeOrigin), c = Nr(s.extent) ? s.extent : l.nodeExtent, d = _r(u, c, hi(s));
      s.internals.positionAbsolute = d;
    }
}
function $M(e, a) {
  if (!e.handles)
    return e.measured ? a?.internals.handleBounds : void 0;
  const r = [], l = [];
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
    s.type === "source" ? r.push(u) : s.type === "target" && l.push(u);
  }
  return {
    source: r,
    target: l
  };
}
function wm(e) {
  return e === "manual";
}
function Mh(e, a, r, l = {}) {
  const s = xm(VM, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !wm(s.zIndexMode) ? Rx : 0;
  let p = e.length > 0, m = !1;
  a.clear(), r.clear();
  for (const y of e) {
    let g = c.get(y.id);
    if (s.checkEquality && y === g?.internals.userNode)
      a.set(y.id, g);
    else {
      const v = ts(y, s.nodeOrigin), x = Nr(y.extent) ? y.extent : s.nodeExtent, S = _r(v, x, hi(y));
      g = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: S,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: $M(y, g),
          z: Tx(y, d, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), y.parentId && Sm(g, a, r, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function YM(e, a) {
  if (!e.parentId)
    return;
  const r = a.get(e.parentId);
  r ? r.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Sm(e, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = xm(bm, l), m = e.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  YM(e, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * UM), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const g = u && !wm(p) ? Rx : 0, { x: v, y: x, z: S } = IM(e, y, c, d, g, p), { positionAbsolute: N } = e.internals, C = v !== N.x || x !== N.y;
  (C || S !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: C ? { x: v, y: x } : N,
      z: S
    }
  });
}
function Tx(e, a, r) {
  const l = ba(e.zIndex) ? e.zIndex : 0;
  return wm(r) ? l : l + (e.selected ? a : 0);
}
function IM(e, a, r, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = hi(e), m = ts(e, r), y = Nr(e.extent) ? _r(m, e.extent, p) : m;
  let g = _r({ x: c + y.x, y: d + y.y }, l, p);
  e.extent === "parent" && (g = px(g, p, a));
  const v = Tx(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= v ? x + 1 : v
  };
}
function Em(e, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? _l(d), m = gx(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, y = hi(d), g = d.origin ?? l, v = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, x = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, S = Math.max(y.width, Math.round(c.width)), N = Math.max(y.height, Math.round(c.height)), C = (S - y.width) * g[0], R = (N - y.height) * g[1];
    (v > 0 || x > 0 || C || R) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - v + C,
        y: d.position.y - x + R
      }
    }), r.get(p)?.forEach((z) => {
      e.some((E) => E.id === z.id) || s.push({
        id: z.id,
        type: "position",
        position: {
          x: z.position.x + v,
          y: z.position.y + x
        }
      });
    })), (y.width < c.width || y.height < c.height || v || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: S + (v ? g[0] * v - C : 0),
        height: N + (x ? g[1] * x - R : 0)
      }
    });
  }), s;
}
function GM(e, a, r, l, s, u, c) {
  const d = l?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d)
    return { changes: [], updatedInternals: p };
  const m = [], y = window.getComputedStyle(d), { m22: g } = new window.DOMMatrixReadOnly(y.transform), v = [];
  for (const x of e.values()) {
    const S = a.get(x.id);
    if (!S)
      continue;
    if (S.hidden) {
      a.set(S.id, {
        ...S,
        internals: {
          ...S.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const N = vm(x.nodeElement), C = S.measured.width !== N.width || S.measured.height !== N.height;
    if (!!(N.width && N.height && (C || !S.internals.handleBounds || x.force))) {
      const z = x.nodeElement.getBoundingClientRect(), E = Nr(S.extent) ? S.extent : u;
      let { positionAbsolute: O } = S.internals;
      S.parentId && S.extent === "parent" ? O = px(O, N, a.get(S.parentId)) : E && (O = _r(O, E, N));
      const k = {
        ...S,
        measured: N,
        internals: {
          ...S.internals,
          positionAbsolute: O,
          handleBounds: {
            source: Ev("source", x.nodeElement, z, g, S.id),
            target: Ev("target", x.nodeElement, z, g, S.id)
          }
        }
      };
      a.set(S.id, k), S.parentId && Sm(k, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, C && (m.push({
        id: S.id,
        type: "dimensions",
        dimensions: N
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: _l(k, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Em(v, a, r, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: p };
}
async function XM({ delta: e, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
  if (!a || !e.x && !e.y)
    return !1;
  const c = await a.setViewportConstrained({
    x: r[0] + e.x,
    y: r[1] + e.y,
    zoom: r[2]
  }, [
    [0, 0],
    [s, u]
  ], l);
  return !!c && (c.x !== r[0] || c.y !== r[1] || c.k !== r[2]);
}
function Dv(e, a, r, l, s, u) {
  let c = s;
  const d = l.get(c) || /* @__PURE__ */ new Map();
  l.set(c, d.set(r, a)), c = `${s}-${e}`;
  const p = l.get(c) || /* @__PURE__ */ new Map();
  if (l.set(c, p.set(r, a)), u) {
    c = `${s}-${e}-${u}`;
    const m = l.get(c) || /* @__PURE__ */ new Map();
    l.set(c, m.set(r, a));
  }
}
function Mx(e, a, r) {
  e.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, y = `${u}-${d}--${s}-${c}`;
    Dv("source", p, y, e, s, c), Dv("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function Dx(e, a) {
  if (!e.parentId)
    return !1;
  const r = a.get(e.parentId);
  return r ? r.selected ? !0 : Dx(r, a) : !1;
}
function Av(e, a, r) {
  let l = e;
  do {
    if (l?.matches?.(a))
      return !0;
    if (l === r)
      return !1;
    l = l?.parentElement;
  } while (l);
  return !1;
}
function FM(e, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !Dx(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
      const d = e.get(u);
      d && s.set(u, {
        id: u,
        position: d.position || { x: 0, y: 0 },
        distance: {
          x: r.x - d.internals.positionAbsolute.x,
          y: r.y - d.internals.positionAbsolute.y
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
function Qd({ nodeId: e, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
  const s = [];
  for (const [c, d] of a) {
    const p = r.get(c)?.internals.userNode;
    p && s.push({
      ...p,
      position: d.position,
      dragging: l
    });
  }
  if (!e)
    return [s[0], s];
  const u = r.get(e)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(e)?.position || u.position,
      dragging: l
    } : s[0],
    s
  ];
}
function ZM({ dragItems: e, snapGrid: a, x: r, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = as(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function QM({ onNodeMouseDown: e, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, y = null, g = !1, v = null, x = !1, S = !1, N = null;
  function C({ noDragClassName: z, handleSelector: E, domNode: O, isSelectable: k, nodeId: B, nodeClickDistance: V = 0 }) {
    v = In(O);
    function A({ x: K, y: le }) {
      const { nodeLookup: j, nodeExtent: I, snapGrid: T, snapToGrid: L, nodeOrigin: F, onNodeDrag: G, onSelectionDrag: Z, onError: D, updateNodePositions: H } = a();
      u = { x: K, y: le };
      let P = !1;
      const ne = d.size > 1, se = ne && I ? Ch(ns(d)) : null, he = ne && L ? ZM({
        dragItems: d,
        snapGrid: T,
        x: K,
        y: le
      }) : null;
      for (const [me, ee] of d) {
        if (!j.has(me))
          continue;
        let ge = { x: K - ee.distance.x, y: le - ee.distance.y };
        L && (ge = he ? {
          x: Math.round(ge.x + he.x),
          y: Math.round(ge.y + he.y)
        } : as(ge, T));
        let ze = null;
        if (ne && I && !ee.extent && se) {
          const { positionAbsolute: xe } = ee.internals, Ce = xe.x - se.x + I[0][0], $e = xe.x + ee.measured.width - se.x2 + I[1][0], ft = xe.y - se.y + I[0][1], Te = xe.y + ee.measured.height - se.y2 + I[1][1];
          ze = [
            [Ce, ft],
            [$e, Te]
          ];
        }
        const { position: Re, positionAbsolute: Se } = mx({
          nodeId: me,
          nextPosition: ge,
          nodeLookup: j,
          nodeExtent: ze || I,
          nodeOrigin: F,
          onError: D
        });
        P = P || ee.position.x !== Re.x || ee.position.y !== Re.y, ee.position = Re, ee.internals.positionAbsolute = Se;
      }
      if (S = S || P, !!P && (H(d, !0), N && (l || G || !B && Z))) {
        const [me, ee] = Qd({
          nodeId: B,
          dragItems: d,
          nodeLookup: j
        });
        l?.(N, d, me, ee), G?.(N, me, ee), B || Z?.(N, ee);
      }
    }
    async function Y() {
      if (!y)
        return;
      const { transform: K, panBy: le, autoPanSpeed: j, autoPanOnNodeDrag: I } = a();
      if (!I) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [T, L] = gm(m, y, j);
      (T !== 0 || L !== 0) && (u.x = (u.x ?? 0) - T / K[2], u.y = (u.y ?? 0) - L / K[2], await le({ x: T, y: L }) && A(u)), c = requestAnimationFrame(Y);
    }
    function te(K) {
      const { nodeLookup: le, multiSelectionActive: j, nodesDraggable: I, transform: T, snapGrid: L, snapToGrid: F, selectNodesOnDrag: G, onNodeDragStart: Z, onSelectionDragStart: D, unselectNodesAndEdges: H } = a();
      g = !0, (!G || !k) && !j && B && (le.get(B)?.selected || H()), k && G && B && e?.(B);
      const P = jo(K.sourceEvent, { transform: T, snapGrid: L, snapToGrid: F, containerBounds: y });
      if (u = P, d = FM(le, I, P, B), d.size > 0 && (r || Z || !B && D)) {
        const [ne, se] = Qd({
          nodeId: B,
          dragItems: d,
          nodeLookup: le
        });
        r?.(K.sourceEvent, d, ne, se), Z?.(K.sourceEvent, ne, se), B || D?.(K.sourceEvent, se);
      }
    }
    const $ = F1().clickDistance(V).on("start", (K) => {
      const { domNode: le, nodeDragThreshold: j, transform: I, snapGrid: T, snapToGrid: L } = a();
      y = le?.getBoundingClientRect() || null, x = !1, S = !1, N = K.sourceEvent, j === 0 && te(K), u = jo(K.sourceEvent, { transform: I, snapGrid: T, snapToGrid: L, containerBounds: y }), m = xa(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: le, transform: j, snapGrid: I, snapToGrid: T, nodeDragThreshold: L, nodeLookup: F } = a(), G = jo(K.sourceEvent, { transform: j, snapGrid: I, snapToGrid: T, containerBounds: y });
      if (N = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      B && !F.has(B)) && (x = !0), !x) {
        if (!p && le && g && (p = !0, Y()), !g) {
          const Z = xa(K.sourceEvent, y), D = Z.x - m.x, H = Z.y - m.y;
          Math.sqrt(D * D + H * H) > L && te(K);
        }
        (u.x !== G.xSnapped || u.y !== G.ySnapped) && d && g && (m = xa(K.sourceEvent, y), A(G));
      }
    }).on("end", (K) => {
      if (!g || x) {
        x && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: le, updateNodePositions: j, onNodeDragStop: I, onSelectionDragStop: T } = a();
        if (S && (j(d, !1), S = !1), s || I || !B && T) {
          const [L, F] = Qd({
            nodeId: B,
            dragItems: d,
            nodeLookup: le,
            dragging: !1
          });
          s?.(K.sourceEvent, d, L, F), I?.(K.sourceEvent, L, F), B || T?.(K.sourceEvent, F);
        }
      }
    }).filter((K) => {
      const le = K.target;
      return !K.button && (!z || !Av(le, `.${z}`, O)) && (!E || Av(le, E, O));
    });
    v.call($);
  }
  function R() {
    v?.on(".drag", null);
  }
  return {
    update: C,
    destroy: R
  };
}
function PM(e, a, r) {
  const l = [], s = {
    x: e.x - r,
    y: e.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Io(s, _l(u)) > 0 && l.push(u);
  return l;
}
const KM = 250;
function JM(e, a, r, l) {
  let s = [], u = 1 / 0;
  const c = PM(e, r, a + KM);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const m of p) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: y, y: g } = Cr(d, m, m.position, !0), v = Math.sqrt(Math.pow(y - e.x, 2) + Math.pow(g - e.y, 2));
      v > a || (v < u ? (s = [{ ...m, x: y, y: g }], u = v) : v === u && s.push({ ...m, x: y, y: g }));
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
function Ax(e, a, r, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? d?.find((m) => m.id === r) : d?.[0]) ?? null;
  return p && u ? { ...p, ...Cr(c, p, p.position, !0) } : p;
}
function zx(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function WM(e, a) {
  let r = null;
  return a ? r = !0 : e && !a && (r = !1), r;
}
const Ox = () => !0;
function eD(e, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: y, flowId: g, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: N, onConnectEnd: C, isValidConnection: R = Ox, onReconnectEnd: z, updateConnection: E, getTransform: O, getFromHandle: k, autoPanSpeed: B, dragThreshold: V = 1, handleDomNode: A }) {
  const Y = xx(e.target);
  let te = 0, $;
  const { x: K, y: le } = xa(e), j = zx(u, A), I = d?.getBoundingClientRect();
  let T = !1;
  if (!I || !j)
    return;
  const L = Ax(s, j, l, p, a);
  if (!L)
    return;
  let F = xa(e, I), G = !1, Z = null, D = !1, H = null;
  function P() {
    if (!y || !I)
      return;
    const [Re, Se] = gm(F, I, B);
    v({ x: Re, y: Se }), te = requestAnimationFrame(P);
  }
  const ne = {
    ...L,
    nodeId: s,
    type: j,
    position: L.position
  }, se = p.get(s);
  let me = {
    inProgress: !0,
    isValid: null,
    from: Cr(se, ne, Ae.Left, !0),
    fromHandle: ne,
    fromPosition: ne.position,
    fromNode: se,
    to: F,
    toHandle: null,
    toPosition: bv[ne.position],
    toNode: null,
    pointer: F
  };
  function ee() {
    T = !0, E(me), S?.(e, { nodeId: s, handleId: l, handleType: j });
  }
  V === 0 && ee();
  function ge(Re) {
    if (!T) {
      const { x: Te, y: Xe } = xa(Re), ke = Te - K, Ye = Xe - le;
      if (!(ke * ke + Ye * Ye > V * V))
        return;
      ee();
    }
    if (!k() || !ne) {
      ze(Re);
      return;
    }
    const Se = O();
    F = xa(Re, I), $ = JM(Tl(F, Se, !1, [1, 1]), r, p, ne), G || (P(), G = !0);
    const xe = jx(Re, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: R,
      doc: Y,
      lib: m,
      flowId: g,
      nodeLookup: p
    });
    H = xe.handleDomNode, Z = xe.connection, D = WM(!!$, xe.isValid);
    const Ce = p.get(s), $e = Ce ? Cr(Ce, ne, Ae.Left, !0) : me.from, ft = {
      ...me,
      from: $e,
      isValid: D,
      to: xe.toHandle && D ? Nl({ x: xe.toHandle.x, y: xe.toHandle.y }, Se) : F,
      toHandle: xe.toHandle,
      toPosition: D && xe.toHandle ? xe.toHandle.position : bv[ne.position],
      toNode: xe.toHandle ? p.get(xe.toHandle.nodeId) : null,
      pointer: F
    };
    E(ft), me = ft;
  }
  function ze(Re) {
    if (!("touches" in Re && Re.touches.length > 0)) {
      if (T) {
        ($ || H) && Z && D && N?.(Z);
        const { inProgress: Se, ...xe } = me, Ce = {
          ...xe,
          toPosition: me.toHandle ? me.toPosition : null
        };
        C?.(Re, Ce), u && z?.(Re, Ce);
      }
      x(), cancelAnimationFrame(te), G = !1, D = !1, Z = null, H = null, Y.removeEventListener("mousemove", ge), Y.removeEventListener("mouseup", ze), Y.removeEventListener("touchmove", ge), Y.removeEventListener("touchend", ze);
    }
  }
  Y.addEventListener("mousemove", ge), Y.addEventListener("mouseup", ze), Y.addEventListener("touchmove", ge), Y.addEventListener("touchend", ze);
}
function jx(e, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = Ox, nodeLookup: y }) {
  const g = u === "target", v = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = xa(e), N = c.elementFromPoint(x, S), C = N?.classList.contains(`${d}-flow__handle`) ? N : v, R = {
    handleDomNode: C,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (C) {
    const z = zx(void 0, C), E = C.getAttribute("data-nodeid"), O = C.getAttribute("data-handleid"), k = C.classList.contains("connectable"), B = C.classList.contains("connectableend");
    if (!E || !z)
      return R;
    const V = {
      source: g ? E : l,
      sourceHandle: g ? O : s,
      target: g ? l : E,
      targetHandle: g ? s : O
    };
    R.connection = V;
    const Y = k && B && (r === Sl.Strict ? g && z === "source" || !g && z === "target" : E !== l || O !== s);
    R.isValid = Y && m(V), R.toHandle = Ax(E, z, O, y, r, !0);
  }
  return R;
}
const Dh = {
  onPointerDown: eD,
  isValid: jx
};
function tD({ domNode: e, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = In(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: y = 1, pannable: g = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const O = r(), k = E.sourceEvent.ctrlKey && Go() ? 10 : 1, B = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, V = O[2] * Math.pow(2, B * k);
      a.scaleTo(V);
    };
    let N = [0, 0];
    const C = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (N = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, R = (E) => {
      const O = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const k = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], B = [k[0] - N[0], k[1] - N[1]];
      N = k;
      const V = l() * Math.max(O[2], Math.log(O[2])) * (x ? -1 : 1), A = {
        x: O[0] - B[0] * V,
        y: O[1] - B[1] * V
      }, Y = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: O[2]
      }, Y, d);
    }, z = sx().on("start", C).on("zoom", g ? R : null).on("zoom.wheel", v ? S : null);
    s.call(z, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: ya
  };
}
const wc = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), Pd = ({ x: e, y: a, zoom: r }) => vc.translate(e, a).scale(r), ml = (e, a) => e.target.closest(`.${a}`), Lx = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), nD = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, Kd = (e, a = 0, r = nD, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(r).on("end", l) : e;
}, Hx = (e) => {
  const a = e.ctrlKey && Go() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function aD({ zoomPanValues: e, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (y) => {
    if (ml(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const g = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const C = ya(y), R = Hx(y), z = g * Math.pow(2, R);
      l.scaleTo(r, z, C, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === wr.Vertical ? 0 : y.deltaX * v, S = s === wr.Horizontal ? 0 : y.deltaY * v;
    !Go() && y.shiftKey && s !== wr.Vertical && (x = y.deltaY * v, S = 0), l.translateBy(
      r,
      -(x / g) * u,
      -(S / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const N = wc(r.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(y, N), e.panScrollTimeout = setTimeout(() => {
      m?.(y, N), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(y, N));
  };
}
function iD({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = ml(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function rD({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = wc(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function lD({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(r && Lx(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, wc(u.transform));
  };
}
function oD({ zoomPanValues: e, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && Lx(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = wc(c.transform);
      e.prevViewport = d, clearTimeout(e.timerId), e.timerId = setTimeout(
        () => {
          s?.(c.sourceEvent, d);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        r ? 150 : 0
      );
    }
  };
}
function sD({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: y }) {
  return (g) => {
    const v = e || a, x = r && g.ctrlKey, S = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (ml(g, `${m}-flow__node`) || ml(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !v && !s && !u && !r || c || y && !S || ml(g, d) && S || ml(g, p) && (!S || s && S && !e) || !r && g.ctrlKey && S)
      return !1;
    if (!r && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!v && !s && !x && S || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const N = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || S) && N;
  };
}
function uD({ domNode: e, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = e.getBoundingClientRect(), g = sx().scaleExtent([a, r]).translateExtent(l), v = In(e).call(g);
  z({
    x: s.x,
    y: s.y,
    zoom: El(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  g.wheelDelta(Hx);
  async function N($, K) {
    return v ? new Promise((le) => {
      g?.interpolate(K?.interpolate === "linear" ? Oo : $u).transform(Kd(v, K?.duration, K?.ease, () => le(!0)), $);
    }) : !1;
  }
  function C({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: le, userSelectionActive: j, panOnScroll: I, panOnDrag: T, panOnScrollMode: L, panOnScrollSpeed: F, preventScrolling: G, zoomOnPinch: Z, zoomOnScroll: D, zoomOnDoubleClick: H, zoomActivationKeyPressed: P, lib: ne, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: ee }) {
    j && !m.isZoomingOrPanning && R();
    const ge = I && !P && !j;
    g.clickDistance(ee ? 1 / 0 : !ba(me) || me < 0 ? 0 : me);
    const ze = ge ? aD({
      zoomPanValues: m,
      noWheelClassName: $,
      d3Selection: v,
      d3Zoom: g,
      panOnScrollMode: L,
      panOnScrollSpeed: F,
      zoomOnPinch: Z,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : iD({
      noWheelClassName: $,
      preventScrolling: G,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Re = rD({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", Re);
    const Se = lD({
      zoomPanValues: m,
      panOnDrag: T,
      onPaneContextMenu: !!le,
      onPanZoom: u,
      onTransformChange: se
    });
    g.on("zoom", Se);
    const xe = oD({
      zoomPanValues: m,
      panOnDrag: T,
      panOnScroll: I,
      onPaneContextMenu: le,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", xe);
    const Ce = sD({
      zoomActivationKeyPressed: P,
      panOnDrag: T,
      zoomOnScroll: D,
      panOnScroll: I,
      zoomOnDoubleClick: H,
      zoomOnPinch: Z,
      userSelectionActive: j,
      noPanClassName: K,
      noWheelClassName: $,
      lib: ne,
      connectionInProgress: he
    });
    g.filter(Ce), H ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function R() {
    g.on("zoom", null);
  }
  async function z($, K, le) {
    const j = Pd($), I = g?.constrain()(j, K, le);
    return I && await N(I), I;
  }
  async function E($, K) {
    const le = Pd($);
    return await N(le, K), le;
  }
  function O($) {
    if (v) {
      const K = Pd($), le = v.property("__zoom");
      (le.k !== $.zoom || le.x !== $.x || le.y !== $.y) && g?.transform(v, K, null, { sync: !0 });
    }
  }
  function k() {
    const $ = v ? ox(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function B($, K) {
    return v ? new Promise((le) => {
      g?.interpolate(K?.interpolate === "linear" ? Oo : $u).scaleTo(Kd(v, K?.duration, K?.ease, () => le(!0)), $);
    }) : !1;
  }
  async function V($, K) {
    return v ? new Promise((le) => {
      g?.interpolate(K?.interpolate === "linear" ? Oo : $u).scaleBy(Kd(v, K?.duration, K?.ease, () => le(!0)), $);
    }) : !1;
  }
  function A($) {
    g?.scaleExtent($);
  }
  function Y($) {
    g?.translateExtent($);
  }
  function te($) {
    const K = !ba($) || $ < 0 ? 0 : $;
    g?.clickDistance(K);
  }
  return {
    update: C,
    destroy: R,
    setViewport: E,
    setViewportConstrained: z,
    getViewport: k,
    scaleTo: B,
    scaleBy: V,
    setScaleExtent: A,
    setTranslateExtent: Y,
    syncViewport: O,
    setClickDistance: te
  };
}
var Cl;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Cl || (Cl = {}));
function cD({ width: e, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = r - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function zv(e) {
  const a = e.includes("right") || e.includes("left"), r = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function $i(e, a) {
  return Math.max(0, a - e);
}
function Yi(e, a) {
  return Math.max(0, e - a);
}
function Nu(e, a, r) {
  return Math.max(0, a - e, e - r);
}
function Ov(e, a) {
  return e ? !a : a;
}
function fD(e, a, r, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: y, isVertical: g } = a, v = y && g, { xSnapped: x, ySnapped: S } = r, { minWidth: N, maxWidth: C, minHeight: R, maxHeight: z } = l, { x: E, y: O, width: k, height: B, aspectRatio: V } = e;
  let A = Math.floor(y ? x - e.pointerX : 0), Y = Math.floor(g ? S - e.pointerY : 0);
  const te = k + (p ? -A : A), $ = B + (m ? -Y : Y), K = -u[0] * k, le = -u[1] * B;
  let j = Nu(te, N, C), I = Nu($, R, z);
  if (c) {
    let F = 0, G = 0;
    p && A < 0 ? F = $i(E + A + K, c[0][0]) : !p && A > 0 && (F = Yi(E + te + K, c[1][0])), m && Y < 0 ? G = $i(O + Y + le, c[0][1]) : !m && Y > 0 && (G = Yi(O + $ + le, c[1][1])), j = Math.max(j, F), I = Math.max(I, G);
  }
  if (d) {
    let F = 0, G = 0;
    p && A > 0 ? F = Yi(E + A, d[0][0]) : !p && A < 0 && (F = $i(E + te, d[1][0])), m && Y > 0 ? G = Yi(O + Y, d[0][1]) : !m && Y < 0 && (G = $i(O + $, d[1][1])), j = Math.max(j, F), I = Math.max(I, G);
  }
  if (s) {
    if (y) {
      const F = Nu(te / V, R, z) * V;
      if (j = Math.max(j, F), c) {
        let G = 0;
        !p && !m || p && !m && v ? G = Yi(O + le + te / V, c[1][1]) * V : G = $i(O + le + (p ? A : -A) / V, c[0][1]) * V, j = Math.max(j, G);
      }
      if (d) {
        let G = 0;
        !p && !m || p && !m && v ? G = $i(O + te / V, d[1][1]) * V : G = Yi(O + (p ? A : -A) / V, d[0][1]) * V, j = Math.max(j, G);
      }
    }
    if (g) {
      const F = Nu($ * V, N, C) / V;
      if (I = Math.max(I, F), c) {
        let G = 0;
        !p && !m || m && !p && v ? G = Yi(E + $ * V + K, c[1][0]) / V : G = $i(E + (m ? Y : -Y) * V + K, c[0][0]) / V, I = Math.max(I, G);
      }
      if (d) {
        let G = 0;
        !p && !m || m && !p && v ? G = $i(E + $ * V, d[1][0]) / V : G = Yi(E + (m ? Y : -Y) * V, d[0][0]) / V, I = Math.max(I, G);
      }
    }
  }
  Y = Y + (Y < 0 ? I : -I), A = A + (A < 0 ? j : -j), s && (v ? te > $ * V ? Y = (Ov(p, m) ? -A : A) / V : A = (Ov(p, m) ? -Y : Y) * V : y ? (Y = A / V, m = p) : (A = Y * V, p = m));
  const T = p ? E + A : E, L = m ? O + Y : O;
  return {
    width: k + (p ? -A : A),
    height: B + (m ? -Y : Y),
    x: u[0] * A * (p ? -1 : 1) + T,
    y: u[1] * Y * (m ? -1 : 1) + L
  };
}
const kx = { width: 0, height: 0, x: 0, y: 0 }, dD = {
  ...kx,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function hD(e, a, r) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = r[0] * u, p = r[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function mD({ domNode: e, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = In(e);
  let c = {
    controlDirection: zv("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: y, keepAspectRatio: g, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: N, shouldResize: C }) {
    let R = { ...kx }, z = { ...dD };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: g,
      controlDirection: zv(m)
    };
    let E, O = null, k = [], B, V, A, Y = !1;
    const te = F1().on("start", ($) => {
      const { nodeLookup: K, transform: le, snapGrid: j, snapToGrid: I, nodeOrigin: T, paneDomNode: L } = r();
      if (E = K.get(a), !E)
        return;
      O = L?.getBoundingClientRect() ?? null;
      const { xSnapped: F, ySnapped: G } = jo($.sourceEvent, {
        transform: le,
        snapGrid: j,
        snapToGrid: I,
        containerBounds: O
      });
      R = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, z = {
        ...R,
        pointerX: F,
        pointerY: G,
        aspectRatio: R.width / R.height
      }, B = void 0, V = Nr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (B = K.get(E.parentId)), B && E.extent === "parent" && (V = [
        [0, 0],
        [B.measured.width, B.measured.height]
      ]), k = [], A = void 0;
      for (const [Z, D] of K)
        if (D.parentId === a && (k.push({
          id: Z,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const H = hD(D, E, D.origin ?? T);
          A ? A = [
            [Math.min(H[0][0], A[0][0]), Math.min(H[0][1], A[0][1])],
            [Math.max(H[1][0], A[1][0]), Math.max(H[1][1], A[1][1])]
          ] : A = H;
        }
      x?.($, { ...R });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: le, snapToGrid: j, nodeOrigin: I } = r(), T = jo($.sourceEvent, {
        transform: K,
        snapGrid: le,
        snapToGrid: j,
        containerBounds: O
      }), L = [];
      if (!E)
        return;
      const { x: F, y: G, width: Z, height: D } = R, H = {}, P = E.origin ?? I, { width: ne, height: se, x: he, y: me } = fD(z, c.controlDirection, T, c.boundaries, c.keepAspectRatio, P, V, A), ee = ne !== Z, ge = se !== D, ze = he !== F && ee, Re = me !== G && ge;
      if (!ze && !Re && !ee && !ge)
        return;
      if ((ze || Re || P[0] === 1 || P[1] === 1) && (H.x = ze ? he : R.x, H.y = Re ? me : R.y, R.x = H.x, R.y = H.y, k.length > 0)) {
        const $e = he - F, ft = me - G;
        for (const Te of k)
          Te.position = {
            x: Te.position.x - $e + P[0] * (ne - Z),
            y: Te.position.y - ft + P[1] * (se - D)
          }, L.push(Te);
      }
      if ((ee || ge) && (H.width = ee && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ne : R.width, H.height = ge && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : R.height, R.width = H.width, R.height = H.height), B && E.expandParent) {
        const $e = P[0] * (H.width ?? 0);
        H.x && H.x < $e && (R.x = $e, z.x = z.x - (H.x - $e));
        const ft = P[1] * (H.height ?? 0);
        H.y && H.y < ft && (R.y = ft, z.y = z.y - (H.y - ft));
      }
      const Se = cD({
        width: R.width,
        prevWidth: Z,
        height: R.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...R, direction: Se };
      C?.($, xe) !== !1 && (Y = !0, S?.($, xe), l(H, L));
    }).on("end", ($) => {
      Y && (N?.($, { ...R }), s?.({ ...R }), Y = !1);
    });
    u.call(te);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: p
  };
}
var Jd = { exports: {} }, Wd = {}, eh = { exports: {} }, th = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jv;
function pD() {
  if (jv) return th;
  jv = 1;
  var e = Zo();
  function a(g, v) {
    return g === v && (g !== 0 || 1 / g === 1 / v) || g !== g && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, v) {
    var x = v(), S = l({ inst: { value: x, getSnapshot: v } }), N = S[0].inst, C = S[1];
    return u(
      function() {
        N.value = x, N.getSnapshot = v, p(N) && C({ inst: N });
      },
      [g, x, v]
    ), s(
      function() {
        return p(N) && C({ inst: N }), g(function() {
          p(N) && C({ inst: N });
        });
      },
      [g]
    ), c(x), x;
  }
  function p(g) {
    var v = g.getSnapshot;
    g = g.value;
    try {
      var x = v();
      return !r(g, x);
    } catch {
      return !0;
    }
  }
  function m(g, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : d;
  return th.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y, th;
}
var Lv;
function Bx() {
  return Lv || (Lv = 1, eh.exports = pD()), eh.exports;
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
var Hv;
function gD() {
  if (Hv) return Wd;
  Hv = 1;
  var e = Zo(), a = Bx();
  function r(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return Wd.useSyncExternalStoreWithSelector = function(m, y, g, v, x) {
    var S = u(null);
    if (S.current === null) {
      var N = { hasValue: !1, value: null };
      S.current = N;
    } else N = S.current;
    S = d(
      function() {
        function R(B) {
          if (!z) {
            if (z = !0, E = B, B = v(B), x !== void 0 && N.hasValue) {
              var V = N.value;
              if (x(V, B))
                return O = V;
            }
            return O = B;
          }
          if (V = O, l(E, B)) return V;
          var A = v(B);
          return x !== void 0 && x(V, A) ? (E = B, V) : (E = B, O = A);
        }
        var z = !1, E, O, k = g === void 0 ? null : g;
        return [
          function() {
            return R(y());
          },
          k === null ? void 0 : function() {
            return R(k());
          }
        ];
      },
      [y, g, v, x]
    );
    var C = s(m, S[0], S[1]);
    return c(
      function() {
        N.hasValue = !0, N.value = C;
      },
      [C]
    ), p(C), C;
  }, Wd;
}
var kv;
function yD() {
  return kv || (kv = 1, Jd.exports = gD()), Jd.exports;
}
var vD = yD();
const bD = /* @__PURE__ */ Fh(vD), xD = {}, Bv = (e) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (y, g) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = g ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((S) => S(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (xD ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = e(l, s, p);
  return p;
}, wD = (e) => e ? Bv(e) : Bv, { useDebugValue: SD } = ye, { useSyncExternalStoreWithSelector: ED } = bD, _D = (e) => e;
function Ux(e, a = _D, r) {
  const l = ED(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    r
  );
  return SD(l), l;
}
const Uv = (e, a) => {
  const r = wD(e), l = (s, u = a) => Ux(r, s, u);
  return Object.assign(l, r), l;
}, ND = (e, a) => e ? Uv(e, a) : Uv;
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
  const r = Object.keys(e);
  if (r.length !== Object.keys(a).length)
    return !1;
  for (const l of r)
    if (!Object.prototype.hasOwnProperty.call(a, l) || !Object.is(e[l], a[l]))
      return !1;
  return !0;
}
var CD = Zb();
const RD = /* @__PURE__ */ Fh(CD), Sc = _.createContext(null), TD = Sc.Provider, Vx = wa.error001("react");
function lt(e, a) {
  const r = _.useContext(Sc);
  if (r === null)
    throw new Error(Vx);
  return Ux(r, e, a);
}
function zt() {
  const e = _.useContext(Sc);
  if (e === null)
    throw new Error(Vx);
  return _.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const Vv = { display: "none" }, MD = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, qx = "react-flow__node-desc", $x = "react-flow__edge-desc", DD = "react-flow__aria-live", AD = (e) => e.ariaLiveMessage, zD = (e) => e.ariaLabelConfig;
function OD({ rfId: e }) {
  const a = lt(AD);
  return b.jsx("div", { id: `${DD}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: MD, children: a });
}
function jD({ rfId: e, disableKeyboardA11y: a }) {
  const r = lt(zD);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${qx}-${e}`, style: Vv, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${$x}-${e}`, style: Vv, children: r["edge.a11yDescription.default"] }), !a && b.jsx(OD, { rfId: e })] });
}
const Ec = _.forwardRef(({ position: e = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return b.jsx("div", { className: Qt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
Ec.displayName = "Panel";
function LD({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : b.jsx(Ec, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: b.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const HD = (e) => {
  const a = [], r = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, Cu = (e) => e.id;
function kD(e, a) {
  return At(e.selectedNodes.map(Cu), a.selectedNodes.map(Cu)) && At(e.selectedEdges.map(Cu), a.selectedEdges.map(Cu));
}
function BD({ onSelectionChange: e }) {
  const a = zt(), { selectedNodes: r, selectedEdges: l } = lt(HD, kD);
  return _.useEffect(() => {
    const s = { nodes: r, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, e]), null;
}
const UD = (e) => !!e.onSelectionChangeHandlers;
function VD({ onSelectionChange: e }) {
  const a = lt(UD);
  return e || a ? b.jsx(BD, { onSelectionChange: e }) : null;
}
const Yx = [0, 0], qD = { x: 0, y: 0, zoom: 1 }, $D = [
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
], qv = [...$D, "rfId"], YD = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), $v = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: $o,
  nodeOrigin: Yx,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function ID(e) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = lt(YD, At), m = zt();
  _.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    y.current = $v, d();
  }), []);
  const y = _.useRef($v);
  return _.useEffect(
    () => {
      for (const g of qv) {
        const v = e[g], x = y.current[g];
        v !== x && (typeof e[g] > "u" || (g === "nodes" ? a(v) : g === "edges" ? r(v) : g === "minZoom" ? l(v) : g === "maxZoom" ? s(v) : g === "translateExtent" ? u(v) : g === "nodeExtent" ? c(v) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: RM(v) }) : g === "fitView" ? m.setState({ fitViewQueued: v }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: v }) : m.setState({ [g]: v })));
      }
      y.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    qv.map((g) => e[g])
  ), null;
}
function Yv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function GD(e) {
  const [a, r] = _.useState(e === "system" ? null : e);
  return _.useEffect(() => {
    if (e !== "system") {
      r(e);
      return;
    }
    const l = Yv(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : Yv()?.matches ? "dark" : "light";
}
const Iv = typeof document < "u" ? document : null;
function Xo(e = null, a = { target: Iv, actInsideInputWithModifier: !0 }) {
  const [r, l] = _.useState(!1), s = _.useRef(!1), u = _.useRef(/* @__PURE__ */ new Set([])), [c, d] = _.useMemo(() => {
    if (e !== null) {
      const m = (Array.isArray(e) ? e : [e]).filter((g) => typeof g == "string").map((g) => g.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = m.reduce((g, v) => g.concat(...v), []);
      return [m, y];
    }
    return [[], []];
  }, [e]);
  return _.useEffect(() => {
    const p = a?.target ?? Iv, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && wx(x))
          return !1;
        const N = Xv(x.code, d);
        if (u.current.add(x[N]), Gv(c, u.current, !1)) {
          const C = x.composedPath?.()?.[0] || x.target, R = C?.nodeName === "BUTTON" || C?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !R) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const S = Xv(x.code, d);
        Gv(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", g), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", g), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [e, l]), r;
}
function Gv(e, a, r) {
  return e.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Xv(e, a) {
  return a.includes(e) ? "code" : "key";
}
const XD = () => {
  const e = zt();
  return _.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: r } = e.getState();
      return r ? r.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: r } = e.getState();
      return r ? r.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, r) => {
      const { panZoom: l } = e.getState();
      return l ? l.scaleTo(a, r) : !1;
    },
    getZoom: () => e.getState().transform[2],
    setViewport: async (a, r) => {
      const { transform: [l, s, u], panZoom: c } = e.getState();
      return c ? (await c.setViewport({
        x: a.x ?? l,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, r), !0) : !1;
    },
    getViewport: () => {
      const [a, r, l] = e.getState().transform;
      return { x: a, y: r, zoom: l };
    },
    setCenter: async (a, r, l) => e.getState().setCenter(a, r, l),
    fitBounds: async (a, r) => {
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = ym(a, l, s, u, c, r?.padding ?? 0.1);
      return d ? (await d.setViewport(p, {
        duration: r?.duration,
        ease: r?.ease,
        interpolate: r?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, r = {}) => {
      const { transform: l, snapGrid: s, snapToGrid: u, domNode: c } = e.getState();
      if (!c)
        return a;
      const { x: d, y: p } = c.getBoundingClientRect(), m = {
        x: a.x - d,
        y: a.y - p
      }, y = r.snapGrid ?? s, g = r.snapToGrid ?? u;
      return Tl(m, l, g, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = Nl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function Ix(e, a) {
  const r = [], l = /* @__PURE__ */ new Map(), s = [];
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
      r.push(u);
      continue;
    }
    if (c[0].type === "remove")
      continue;
    if (c[0].type === "replace") {
      r.push({ ...c[0].item });
      continue;
    }
    const d = { ...u };
    for (const p of c)
      FD(p, d);
    r.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function FD(e, a) {
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
function ZD(e, a) {
  return Ix(e, a);
}
function QD(e, a) {
  return Ix(e, a);
}
function gr(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function pl(e, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(gr(u.id, c)));
  }
  return l;
}
function Fv({ items: e = [], lookup: a }) {
  const r = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && r.push({ id: u.id, item: u, type: "replace" }), d === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function Zv(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const PD = yx();
function KD(e, a, r = {}) {
  return OM(e, a, {
    ...r,
    onError: r.onError ?? PD
  });
}
const Qv = (e) => vM(e), JD = (e) => hx(e);
function Gx(e) {
  return _.forwardRef(e);
}
const WD = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function Pv(e) {
  const [a, r] = _.useState(BigInt(0)), [l] = _.useState(() => eA(() => r((s) => s + BigInt(1))));
  return WD(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function eA(e) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (r) => {
      a.push(r), e();
    }
  };
}
const Xx = _.createContext(null);
function tA({ children: e }) {
  const a = zt(), r = _.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: y, onNodesChange: g, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let N = p;
    for (const R of d)
      N = typeof R == "function" ? R(N) : R;
    let C = Fv({
      items: N,
      lookup: v
    });
    for (const R of S.values())
      C = R(C);
    y && m(N), C.length > 0 ? g?.(C) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: R, nodes: z, setNodes: E } = a.getState();
      R && E(z);
    });
  }, []), l = Pv(r), s = _.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: g, edgeLookup: v } = a.getState();
    let x = p;
    for (const S of d)
      x = typeof S == "function" ? S(x) : S;
    y ? m(x) : g && g(Fv({
      items: x,
      lookup: v
    }));
  }, []), u = Pv(s), c = _.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return b.jsx(Xx.Provider, { value: c, children: e });
}
function nA() {
  const e = _.useContext(Xx);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const aA = (e) => !!e.panZoom;
function _m() {
  const e = XD(), a = zt(), r = nA(), l = lt(aA), s = _.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      r.nodeQueue.push(g);
    }, d = (g) => {
      r.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = Qv(g) ? g : v.get(g.id), N = S.parentId ? bx(S.position, S.measured, S.parentId, v, x) : S.position, C = {
        ...S,
        position: N,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return _l(C);
    }, m = (g, v, x = { replace: !1 }) => {
      c((S) => S.map((N) => {
        if (N.id === g) {
          const C = typeof v == "function" ? v(N) : v;
          return x.replace && Qv(C) ? C : { ...N, ...C };
        }
        return N;
      }));
    }, y = (g, v, x = { replace: !1 }) => {
      d((S) => S.map((N) => {
        if (N.id === g) {
          const C = typeof v == "function" ? v(N) : v;
          return x.replace && JD(C) ? C : { ...N, ...C };
        }
        return N;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((g) => ({ ...g })),
      getNode: (g) => u(g)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: g = [] } = a.getState();
        return g.map((v) => ({ ...v }));
      },
      getEdge: (g) => a.getState().edgeLookup.get(g),
      setNodes: c,
      setEdges: d,
      addNodes: (g) => {
        const v = Array.isArray(g) ? g : [g];
        r.nodeQueue.push((x) => [...x, ...v]);
      },
      addEdges: (g) => {
        const v = Array.isArray(g) ? g : [g];
        r.edgeQueue.push((x) => [...x, ...v]);
      },
      toObject: () => {
        const { nodes: g = [], edges: v = [], transform: x } = a.getState(), [S, N, C] = x;
        return {
          nodes: g.map((R) => ({ ...R })),
          edges: v.map((R) => ({ ...R })),
          viewport: {
            x: S,
            y: N,
            zoom: C
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: N, onEdgesDelete: C, triggerNodeChanges: R, triggerEdgeChanges: z, onDelete: E, onBeforeDelete: O } = a.getState(), { nodes: k, edges: B } = await EM({
          nodesToRemove: g,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: O
        }), V = B.length > 0, A = k.length > 0;
        if (V) {
          const Y = B.map(Zv);
          C?.(B), z(Y);
        }
        if (A) {
          const Y = k.map(Zv);
          N?.(k), R(Y);
        }
        return (A || V) && E?.({ nodes: k, edges: B }), { deletedNodes: k, deletedEdges: B };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, v = !0, x) => {
        const S = wv(g), N = S ? g : p(g), C = x !== void 0;
        return N ? (x || a.getState().nodes).filter((R) => {
          const z = a.getState().nodeLookup.get(R.id);
          if (z && !S && (R.id === g.id || !z.internals.positionAbsolute))
            return !1;
          const E = _l(C ? R : z), O = Io(E, N);
          return v && O > 0 || O >= E.width * E.height || O >= N.width * N.height;
        }) : [];
      },
      isNodeIntersecting: (g, v, x = !0) => {
        const N = wv(g) ? g : p(g);
        if (!N)
          return !1;
        const C = Io(N, v);
        return x && C > 0 || C >= v.width * v.height || C >= N.width * N.height;
      },
      updateNode: m,
      updateNodeData: (g, v, x = { replace: !1 }) => {
        m(g, (S) => {
          const N = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: N } : { ...S, data: { ...S.data, ...N } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (g, v, x = { replace: !1 }) => {
        y(g, (S) => {
          const N = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: N } : { ...S, data: { ...S.data, ...N } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: v, nodeOrigin: x } = a.getState();
        return bM(g, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? v ? `-${g}-${v}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const v = a.getState().fitViewResolver ?? CM();
        return a.setState({ fitViewQueued: !0, fitViewOptions: g, fitViewResolver: v }), r.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return _.useMemo(() => ({
    ...s,
    ...e,
    viewportInitialized: l
  }), [l]);
}
const Kv = (e) => e.selected, iA = typeof window < "u" ? window : void 0;
function rA({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: l } = _m(), s = Xo(e, { actInsideInputWithModifier: !1 }), u = Xo(a, { target: iA });
  _.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = r.getState();
      l({ nodes: d.filter(Kv), edges: c.filter(Kv) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), _.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function lA(e) {
  const a = zt();
  _.useEffect(() => {
    const r = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = vm(e.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", wa.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
    };
    if (e.current) {
      r(), window.addEventListener("resize", r);
      const l = new ResizeObserver(() => r());
      return l.observe(e.current), () => {
        window.removeEventListener("resize", r), l && e.current && l.unobserve(e.current);
      };
    }
  }, []);
}
const _c = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, oA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function sA({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = wr.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: y, maxZoom: g, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: N, noPanClassName: C, onViewportChange: R, isControlledViewport: z, paneClickDistance: E, selectionOnDrag: O }) {
  const k = zt(), B = _.useRef(null), { userSelectionActive: V, lib: A, connectionInProgress: Y } = lt(oA, At), te = Xo(v), $ = _.useRef();
  lA(B);
  const K = _.useCallback((le) => {
    R?.({ x: le[0], y: le[1], zoom: le[2] }), z || k.setState({ transform: le });
  }, [R, z]);
  return _.useEffect(() => {
    if (B.current) {
      $.current = uD({
        domNode: B.current,
        minZoom: y,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (T) => k.setState((L) => L.paneDragging === T ? L : { paneDragging: T }),
        onPanZoomStart: (T, L) => {
          const { onViewportChangeStart: F, onMoveStart: G } = k.getState();
          G?.(T, L), F?.(L);
        },
        onPanZoom: (T, L) => {
          const { onViewportChange: F, onMove: G } = k.getState();
          G?.(T, L), F?.(L);
        },
        onPanZoomEnd: (T, L) => {
          const { onViewportChangeEnd: F, onMoveEnd: G } = k.getState();
          G?.(T, L), F?.(L);
        }
      });
      const { x: le, y: j, zoom: I } = $.current.getViewport();
      return k.setState({
        panZoom: $.current,
        transform: [le, j, I],
        domNode: B.current.closest(".react-flow")
      }), () => {
        $.current?.destroy();
      };
    }
  }, []), _.useEffect(() => {
    $.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: a,
      zoomOnPinch: r,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: te,
      preventScrolling: x,
      noPanClassName: C,
      userSelectionActive: V,
      noWheelClassName: N,
      lib: A,
      onTransformChange: K,
      connectionInProgress: Y,
      selectionOnDrag: O,
      paneClickDistance: E
    });
  }, [
    e,
    a,
    r,
    l,
    s,
    u,
    c,
    d,
    te,
    x,
    C,
    V,
    N,
    A,
    K,
    Y,
    O,
    E
  ]), b.jsx("div", { className: "react-flow__renderer", ref: B, style: _c, children: S });
}
const uA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function cA() {
  const { userSelectionActive: e, userSelectionRect: a } = lt(uA, At);
  return e && a ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const nh = (e, a) => (r) => {
  r.target === a.current && e?.(r);
}, fA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function dA({ isSelecting: e, selectionKeyPressed: a, selectionMode: r = Yo.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: g, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: N }) {
  const C = _.useRef(0), R = zt(), { userSelectionActive: z, elementsSelectable: E, dragging: O, connectionInProgress: k, panBy: B, autoPanSpeed: V } = lt(fA, At), A = E && (e || z), Y = _.useRef(null), te = _.useRef(), $ = _.useRef(/* @__PURE__ */ new Set()), K = _.useRef(/* @__PURE__ */ new Set()), le = _.useRef(!1), j = _.useRef({ x: 0, y: 0 }), I = _.useRef(!1), T = (ee) => {
    if (le.current || k) {
      le.current = !1;
      return;
    }
    m?.(ee), R.getState().resetSelectedElements(), R.setState({ nodesSelectionActive: !1 });
  }, L = (ee) => {
    if (Array.isArray(l) && l?.includes(2)) {
      ee.preventDefault();
      return;
    }
    y?.(ee);
  }, F = g ? (ee) => g(ee) : void 0, G = (ee) => {
    le.current && (ee.stopPropagation(), le.current = !1);
  }, Z = (ee) => {
    const { domNode: ge, transform: ze } = R.getState();
    if (te.current = ge?.getBoundingClientRect(), !te.current)
      return;
    const Re = ee.target === Y.current;
    if (!Re && !!ee.target.closest(".nokey") || !e || !(c && Re || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), le.current = !1;
    const { x: Ce, y: $e } = xa(ee.nativeEvent, te.current), ft = Tl({ x: Ce, y: $e }, ze);
    R.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Ce,
        y: $e
      }
    }), Re || (ee.stopPropagation(), ee.preventDefault());
  };
  function D(ee, ge) {
    const { userSelectionRect: ze } = R.getState();
    if (!ze)
      return;
    const { transform: Re, nodeLookup: Se, edgeLookup: xe, connectionLookup: Ce, triggerNodeChanges: $e, triggerEdgeChanges: ft, defaultEdgeOptions: Te } = R.getState(), Xe = { x: ze.startX, y: ze.startY }, { x: ke, y: Ye } = Nl(Xe, Re), St = {
      startX: Xe.x,
      startY: Xe.y,
      x: ee < ke ? ee : ke,
      y: ge < Ye ? ge : Ye,
      width: Math.abs(ee - ke),
      height: Math.abs(ge - Ye)
    }, Je = $.current, Ze = K.current;
    $.current = new Set(pm(Se, St, Re, r === Yo.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Qe = Te?.selectable ?? !0;
    for (const gt of $.current) {
      const yt = Ce.get(gt);
      if (yt)
        for (const { edgeId: It } of yt.values()) {
          const Lt = xe.get(It);
          Lt && (Lt.selectable ?? Qe) && K.current.add(It);
        }
    }
    if (!Sv(Je, $.current)) {
      const gt = pl(Se, $.current, !0);
      $e(gt);
    }
    if (!Sv(Ze, K.current)) {
      const gt = pl(xe, K.current);
      ft(gt);
    }
    R.setState({
      userSelectionRect: St,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function H() {
    if (!s || !te.current)
      return;
    const [ee, ge] = gm(j.current, te.current, V);
    B({ x: ee, y: ge }).then((ze) => {
      if (!le.current || !ze) {
        C.current = requestAnimationFrame(H);
        return;
      }
      const { x: Re, y: Se } = j.current;
      D(Re, Se), C.current = requestAnimationFrame(H);
    });
  }
  const P = () => {
    cancelAnimationFrame(C.current), C.current = 0, I.current = !1;
  };
  _.useEffect(() => () => P(), []);
  const ne = (ee) => {
    const { userSelectionRect: ge, transform: ze, resetSelectedElements: Re } = R.getState();
    if (!te.current || !ge)
      return;
    const { x: Se, y: xe } = xa(ee.nativeEvent, te.current);
    j.current = { x: Se, y: xe };
    const Ce = Nl({ x: ge.startX, y: ge.startY }, ze);
    if (!le.current) {
      const $e = a ? 0 : u;
      if (Math.hypot(Se - Ce.x, xe - Ce.y) <= $e)
        return;
      Re(), d?.(ee);
    }
    le.current = !0, I.current || (H(), I.current = !0), D(Se, xe);
  }, se = (ee) => {
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !z && ee.target === Y.current && R.getState().userSelectionRect && T?.(ee), R.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), le.current && (p?.(ee), R.setState({
      nodesSelectionActive: $.current.size > 0
    })), P());
  }, he = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), P();
  }, me = l === !0 || Array.isArray(l) && l.includes(0);
  return b.jsxs("div", { className: Qt(["react-flow__pane", { draggable: me, dragging: O, selection: e }]), onClick: A ? void 0 : nh(T, Y), onContextMenu: nh(L, Y), onWheel: nh(F, Y), onPointerEnter: A ? void 0 : v, onPointerMove: A ? ne : x, onPointerUp: A ? se : void 0, onPointerCancel: A ? he : void 0, onPointerDownCapture: A ? Z : void 0, onClickCapture: A ? G : void 0, onPointerLeave: S, ref: Y, style: _c, children: [N, b.jsx(cA, {})] });
}
function Ah({ id: e, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", wa.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function Fx({ nodeRef: e, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = zt(), [p, m] = _.useState(!1), y = _.useRef();
  return _.useEffect(() => {
    y.current = QM({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        Ah({
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
  }, []), _.useEffect(() => {
    if (!(a || !e.current || !y.current))
      return y.current.update({
        noDragClassName: r,
        handleSelector: l,
        domNode: e.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        y.current?.destroy();
      };
  }, [r, l, a, u, e, s, c]), p;
}
const hA = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function Zx() {
  const e = zt();
  return _.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: y } = e.getState(), g = /* @__PURE__ */ new Map(), v = hA(c), x = s ? u[0] : 5, S = s ? u[1] : 5, N = r.direction.x * x * r.factor, C = r.direction.y * S * r.factor;
    for (const [, R] of m) {
      if (!v(R))
        continue;
      let z = {
        x: R.internals.positionAbsolute.x + N,
        y: R.internals.positionAbsolute.y + C
      };
      s && (z = as(z, u));
      const { position: E, positionAbsolute: O } = mx({
        nodeId: R.id,
        nextPosition: z,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: d
      });
      R.position = E, R.internals.positionAbsolute = O, g.set(R.id, R);
    }
    p(g);
  }, []);
}
const Nm = _.createContext(null), mA = Nm.Provider;
Nm.Consumer;
const Qx = () => _.useContext(Nm), pA = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), gA = (e, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, y = p?.nodeId === e && p?.id === a && p?.type === r;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === Sl.Strict ? d?.type !== r : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function yA({ type: e = "source", position: a = Ae.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: y, onTouchStart: g, ...v }, x) {
  const S = c || null, N = e === "target", C = zt(), R = Qx(), { connectOnClick: z, noPanClassName: E, rfId: O } = lt(pA, At), { connectingFrom: k, connectingTo: B, clickConnecting: V, isPossibleEndHandle: A, connectionInProcess: Y, clickConnectionInProcess: te, valid: $ } = lt(gA(R, S, e), At);
  R || C.getState().onError?.("010", wa.error010());
  const K = (I) => {
    const { defaultEdgeOptions: T, onConnect: L, hasDefaultEdges: F } = C.getState(), G = {
      ...T,
      ...I
    };
    if (F) {
      const { edges: Z, setEdges: D, onError: H } = C.getState();
      D(KD(G, Z, { onError: H }));
    }
    L?.(G), d?.(G);
  }, le = (I) => {
    if (!R)
      return;
    const T = Sx(I.nativeEvent);
    if (s && (T && I.button === 0 || !T)) {
      const L = C.getState();
      Dh.onPointerDown(I.nativeEvent, {
        handleDomNode: I.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: N,
        handleId: S,
        nodeId: R,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...F) => C.getState().onConnectEnd?.(...F),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...F) => C.getState().isValidConnection?.(...F) ?? !0),
        getTransform: () => C.getState().transform,
        getFromHandle: () => C.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    T ? y?.(I) : g?.(I);
  }, j = (I) => {
    const { onClickConnectStart: T, onClickConnectEnd: L, connectionClickStartHandle: F, connectionMode: G, isValidConnection: Z, lib: D, rfId: H, nodeLookup: P, connection: ne } = C.getState();
    if (!R || !F && !s)
      return;
    if (!F) {
      T?.(I.nativeEvent, { nodeId: R, handleId: S, handleType: e }), C.setState({ connectionClickStartHandle: { nodeId: R, type: e, id: S } });
      return;
    }
    const se = xx(I.target), he = r || Z, { connection: me, isValid: ee } = Dh.isValid(I.nativeEvent, {
      handle: {
        nodeId: R,
        id: S,
        type: e
      },
      connectionMode: G,
      fromNodeId: F.nodeId,
      fromHandleId: F.id || null,
      fromType: F.type,
      isValidConnection: he,
      flowId: H,
      doc: se,
      lib: D,
      nodeLookup: P
    });
    ee && me && K(me);
    const ge = structuredClone(ne);
    delete ge.inProgress, ge.toPosition = ge.toHandle ? ge.toHandle.position : null, L?.(I, ge), C.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": S, "data-nodeid": R, "data-handlepos": a, "data-id": `${O}-${R}-${S}-${e}`, className: Qt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    m,
    {
      source: !N,
      target: N,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: V,
      connectingfrom: k,
      connectingto: B,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!Y || A) && (Y || te ? u : s)
    }
  ]), onMouseDown: le, onTouchStart: le, onClick: z ? j : void 0, ref: x, ...v, children: p });
}
const Rl = _.memo(Gx(yA));
function vA({ data: e, isConnectable: a, sourcePosition: r = Ae.Bottom }) {
  return b.jsxs(b.Fragment, { children: [e?.label, b.jsx(Rl, { type: "source", position: r, isConnectable: a })] });
}
function bA({ data: e, isConnectable: a, targetPosition: r = Ae.Top, sourcePosition: l = Ae.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Rl, { type: "target", position: r, isConnectable: a }), e?.label, b.jsx(Rl, { type: "source", position: l, isConnectable: a })] });
}
function xA() {
  return null;
}
function wA({ data: e, isConnectable: a, targetPosition: r = Ae.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Rl, { type: "target", position: r, isConnectable: a }), e?.label] });
}
const ic = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Jv = {
  input: vA,
  default: bA,
  output: wA,
  group: xA
};
function SA(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const EA = (e) => {
  const { width: a, height: r, x: l, y: s } = ns(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: ba(a) ? a : null,
    height: ba(r) ? r : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function _A({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = zt(), { width: s, height: u, transformString: c, userSelectionActive: d } = lt(EA, At), p = Zx(), m = _.useRef(null);
  _.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !d && s !== null && u !== null;
  if (Fx({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const g = e ? (x) => {
    const S = l.getState().nodes.filter((N) => N.selected);
    e(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(ic, x.key) && (x.preventDefault(), p({
      direction: ic[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return b.jsx("div", { className: Qt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: b.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const Wv = typeof window < "u" ? window : void 0, NA = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Px({ children: e, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: y, selectionMode: g, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: N, zoomActivationKeyCode: C, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: k, panOnScrollMode: B, zoomOnDoubleClick: V, panOnDrag: A, autoPanOnSelection: Y, defaultViewport: te, translateExtent: $, minZoom: K, maxZoom: le, preventScrolling: j, onSelectionContextMenu: I, noWheelClassName: T, noPanClassName: L, disableKeyboardA11y: F, onViewportChange: G, isControlledViewport: Z }) {
  const { nodesSelectionActive: D, userSelectionActive: H } = lt(NA, At), P = Xo(m, { target: Wv }), ne = Xo(N, { target: Wv }), se = ne || A, he = ne || O, me = y && se !== !0, ee = P || H || me;
  return rA({ deleteKeyCode: p, multiSelectionKeyCode: S }), b.jsx(sA, { onPaneContextMenu: u, elementsSelectable: R, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: he, panOnScrollSpeed: k, panOnScrollMode: B, zoomOnDoubleClick: V, panOnDrag: !P && se, defaultViewport: te, translateExtent: $, minZoom: K, maxZoom: le, zoomActivationKeyCode: C, preventScrolling: j, noWheelClassName: T, noPanClassName: L, onViewportChange: G, isControlledViewport: Z, paneClickDistance: d, selectionOnDrag: me, children: b.jsxs(dA, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: Y, isSelecting: !!ee, selectionMode: g, selectionKeyPressed: P, paneClickDistance: d, selectionOnDrag: me, children: [e, D && b.jsx(_A, { onSelectionContextMenu: I, noPanClassName: L, disableKeyboardA11y: F })] }) });
}
Px.displayName = "FlowRenderer";
const CA = _.memo(Px), RA = (e) => (a) => e ? pm(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function TA(e) {
  return lt(_.useCallback(RA(e), [e]), At);
}
const MA = (e) => e.updateNodeInternals;
function DA() {
  const e = lt(MA), [a] = _.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
    const l = /* @__PURE__ */ new Map();
    r.forEach((s) => {
      const u = s.target.getAttribute("data-id");
      l.set(u, {
        id: u,
        nodeElement: s.target,
        force: !0
      });
    }), e(l);
  }));
  return _.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function AA({ node: e, nodeType: a, hasDimensions: r, resizeObserver: l }) {
  const s = zt(), u = _.useRef(null), c = _.useRef(null), d = _.useRef(e.sourcePosition), p = _.useRef(e.targetPosition), m = _.useRef(a), y = r && !!e.internals.handleBounds;
  return _.useEffect(() => {
    u.current && !e.hidden && (!y || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [y, e.hidden]), _.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), _.useEffect(() => {
    if (u.current) {
      const g = m.current !== a, v = d.current !== e.sourcePosition, x = p.current !== e.targetPosition;
      (g || v || x) && (m.current = a, d.current = e.sourcePosition, p.current = e.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [e.id, a, e.sourcePosition, e.targetPosition]), u;
}
function zA({ id: e, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: y, resizeObserver: g, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: N, nodeTypes: C, nodeClickDistance: R, onError: z }) {
  const { node: E, internals: O, isParent: k } = lt((ee) => {
    const ge = ee.nodeLookup.get(e), ze = ee.parentLookup.has(e);
    return {
      node: ge,
      internals: ge.internals,
      isParent: ze
    };
  }, At);
  let B = E.type || "default", V = C?.[B] || Jv[B];
  V === void 0 && (z?.("003", wa.error003(B)), B = "default", V = C?.default || Jv.default);
  const A = !!(E.draggable || d && typeof E.draggable > "u"), Y = !!(E.selectable || p && typeof E.selectable > "u"), te = !!(E.connectable || m && typeof E.connectable > "u"), $ = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), le = vx(E), j = AA({ node: E, nodeType: B, hasDimensions: le, resizeObserver: g }), I = Fx({
    nodeRef: j,
    disabled: E.hidden || !A,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: e,
    isSelectable: Y,
    nodeClickDistance: R
  }), T = Zx();
  if (E.hidden)
    return null;
  const L = hi(E), F = SA(E), G = Y || A || a || r || l || s, Z = r ? (ee) => r(ee, { ...O.userNode }) : void 0, D = l ? (ee) => l(ee, { ...O.userNode }) : void 0, H = s ? (ee) => s(ee, { ...O.userNode }) : void 0, P = u ? (ee) => u(ee, { ...O.userNode }) : void 0, ne = c ? (ee) => c(ee, { ...O.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: ge, nodeDragThreshold: ze } = K.getState();
    Y && (!ge || !A || ze > 0) && Ah({
      id: e,
      store: K,
      nodeRef: j
    }), a && a(ee, { ...O.userNode });
  }, he = (ee) => {
    if (!(wx(ee.nativeEvent) || S)) {
      if (ux.includes(ee.key) && Y) {
        const ge = ee.key === "Escape";
        Ah({
          id: e,
          store: K,
          unselect: ge,
          nodeRef: j
        });
      } else if (A && E.selected && Object.prototype.hasOwnProperty.call(ic, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: ge } = K.getState();
        K.setState({
          ariaLiveMessage: ge["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), T({
          direction: ic[ee.key],
          factor: ee.shiftKey ? 4 : 1
        });
      }
    }
  }, me = () => {
    if (S || !j.current?.matches(":focus-visible"))
      return;
    const { transform: ee, width: ge, height: ze, autoPanOnNodeFocus: Re, setCenter: Se } = K.getState();
    if (!Re)
      return;
    pm(/* @__PURE__ */ new Map([[e, E]]), { x: 0, y: 0, width: ge, height: ze }, ee, !0).length > 0 || Se(E.position.x + L.width / 2, E.position.y + L.height / 2, {
      zoom: ee[2]
    });
  };
  return b.jsx("div", { className: Qt([
    "react-flow__node",
    `react-flow__node-${B}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: A
    },
    E.className,
    {
      selected: E.selected,
      selectable: Y,
      parent: k,
      draggable: A,
      dragging: I
    }
  ]), ref: j, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: G ? "all" : "none",
    visibility: le ? "visible" : "hidden",
    ...E.style,
    ...F
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: Z, onMouseMove: D, onMouseLeave: H, onContextMenu: P, onClick: se, onDoubleClick: ne, onKeyDown: $ ? he : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? me : void 0, role: E.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${qx}-${N}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: b.jsx(mA, { value: e, children: b.jsx(V, { id: e, data: E.data, type: B, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: E.selected ?? !1, selectable: Y, draggable: A, deletable: E.deletable ?? !0, isConnectable: te, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: I, dragHandle: E.dragHandle, zIndex: O.z, parentId: E.parentId, ...L }) }) });
}
var OA = _.memo(zA);
const jA = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Kx(e) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(jA, At), c = TA(e.onlyRenderVisibleElements), d = DA();
  return b.jsx("div", { className: "react-flow__nodes", style: _c, children: c.map((p) => (
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
    b.jsx(OA, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
Kx.displayName = "NodeRenderer";
const LA = _.memo(Kx);
function HA(e) {
  return lt(_.useCallback((r) => {
    if (!e)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && DM({
          sourceNode: u,
          targetNode: c,
          width: r.width,
          height: r.height,
          transform: r.transform
        }) && l.push(s.id);
      }
    return l;
  }, [e]), At);
}
const kA = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return b.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, BA = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return b.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, eb = {
  [nc.Arrow]: kA,
  [nc.ArrowClosed]: BA
};
function UA(e) {
  const a = zt();
  return _.useMemo(() => Object.prototype.hasOwnProperty.call(eb, e) ? eb[e] : (a.getState().onError?.("009", wa.error009(e)), null), [e]);
}
const VA = ({ id: e, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = UA(a);
  return p ? b.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: b.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, Jx = ({ defaultColor: e, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = _.useMemo(() => BM(r, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, e]);
  return s.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: s.map((u) => b.jsx(VA, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Jx.displayName = "MarkerDefinitions";
var qA = _.memo(Jx);
function Wx({ x: e, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...y }) {
  const [g, v] = _.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Qt(["react-flow__edge-textwrapper", m]), S = _.useRef(null);
  return _.useEffect(() => {
    if (S.current) {
      const N = S.current.getBBox();
      v({
        x: N.x,
        y: N.y,
        width: N.width,
        height: N.height
      });
    }
  }, [r]), r ? b.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...y, children: [s && b.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), b.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: S, style: l, children: r }), p] }) : null;
}
Wx.displayName = "EdgeText";
const $A = _.memo(Wx);
function Nc({ path: e, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...y }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...y, d: e, fill: "none", className: Qt(["react-flow__edge-path", y.className]) }), m ? b.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && ba(a) && ba(r) ? b.jsx($A, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function tb({ pos: e, x1: a, y1: r, x2: l, y2: s }) {
  return e === Ae.Left || e === Ae.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function ew({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top }) {
  const [c, d] = tb({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = tb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [y, g, v, x] = Ex({
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
    v,
    x
  ];
}
function tw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: N, markerStart: C, interactionWidth: R }) => {
    const [z, E, O] = ew({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), k = e.isInternal ? void 0 : a;
    return b.jsx(Nc, { id: k, path: z, labelX: E, labelY: O, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: N, markerStart: C, interactionWidth: R });
  });
}
const YA = tw({ isInternal: !1 }), nw = tw({ isInternal: !0 });
YA.displayName = "SimpleBezierEdge";
nw.displayName = "SimpleBezierEdgeInternal";
function aw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, sourcePosition: x = Ae.Bottom, targetPosition: S = Ae.Top, markerEnd: N, markerStart: C, pathOptions: R, interactionWidth: z }) => {
    const [E, O, k] = Rh({
      sourceX: r,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: R?.borderRadius,
      offset: R?.offset,
      stepPosition: R?.stepPosition
    }), B = e.isInternal ? void 0 : a;
    return b.jsx(Nc, { id: B, path: E, labelX: O, labelY: k, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: N, markerStart: C, interactionWidth: z });
  });
}
const iw = aw({ isInternal: !1 }), rw = aw({ isInternal: !0 });
iw.displayName = "SmoothStepEdge";
rw.displayName = "SmoothStepEdgeInternal";
function lw(e) {
  return _.memo(({ id: a, ...r }) => {
    const l = e.isInternal ? void 0 : a;
    return b.jsx(iw, { ...r, id: l, pathOptions: _.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const IA = lw({ isInternal: !1 }), ow = lw({ isInternal: !0 });
IA.displayName = "StepEdge";
ow.displayName = "StepEdgeInternal";
function sw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: x, markerStart: S, interactionWidth: N }) => {
    const [C, R, z] = Cx({ sourceX: r, sourceY: l, targetX: s, targetY: u }), E = e.isInternal ? void 0 : a;
    return b.jsx(Nc, { id: E, path: C, labelX: R, labelY: z, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: x, markerStart: S, interactionWidth: N });
  });
}
const GA = sw({ isInternal: !1 }), uw = sw({ isInternal: !0 });
GA.displayName = "StraightEdge";
uw.displayName = "StraightEdgeInternal";
function cw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = Ae.Bottom, targetPosition: d = Ae.Top, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: N, markerStart: C, pathOptions: R, interactionWidth: z }) => {
    const [E, O, k] = _x({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: R?.curvature
    }), B = e.isInternal ? void 0 : a;
    return b.jsx(Nc, { id: B, path: E, labelX: O, labelY: k, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: N, markerStart: C, interactionWidth: z });
  });
}
const XA = cw({ isInternal: !1 }), fw = cw({ isInternal: !0 });
XA.displayName = "BezierEdge";
fw.displayName = "BezierEdgeInternal";
const nb = {
  default: fw,
  straight: uw,
  step: ow,
  smoothstep: rw,
  simplebezier: nw
}, ab = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, FA = (e, a, r) => r === Ae.Left ? e - a : r === Ae.Right ? e + a : e, ZA = (e, a, r) => r === Ae.Top ? e - a : r === Ae.Bottom ? e + a : e, ib = "react-flow__edgeupdater";
function rb({ position: e, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return b.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Qt([ib, `${ib}-${d}`]), cx: FA(a, l, e), cy: ZA(r, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function QA({ isReconnectable: e, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: y, onReconnectEnd: g, setReconnecting: v, setUpdateHover: x }) {
  const S = zt(), N = (O, k) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: B, domNode: V, connectionMode: A, connectionRadius: Y, lib: te, onConnectStart: $, cancelConnection: K, nodeLookup: le, rfId: j, panBy: I, updateConnection: T } = S.getState(), L = k.type === "target", F = (D, H) => {
      v(!1), g?.(D, r, k.type, H);
    }, G = (D) => m?.(r, D), Z = (D, H) => {
      v(!0), y?.(O, r, k.type), $?.(D, H);
    };
    Dh.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: B,
      connectionMode: A,
      connectionRadius: Y,
      domNode: V,
      handleId: k.id,
      nodeId: k.nodeId,
      nodeLookup: le,
      isTarget: L,
      edgeUpdaterType: k.type,
      lib: te,
      flowId: j,
      cancelConnection: K,
      panBy: I,
      isValidConnection: (...D) => S.getState().isValidConnection?.(...D) ?? !0,
      onConnect: G,
      onConnectStart: Z,
      onConnectEnd: (...D) => S.getState().onConnectEnd?.(...D),
      onReconnectEnd: F,
      updateConnection: T,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, C = (O) => N(O, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), R = (O) => N(O, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), z = () => x(!0), E = () => x(!1);
  return b.jsxs(b.Fragment, { children: [(e === !0 || e === "source") && b.jsx(rb, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: C, onMouseEnter: z, onMouseOut: E, type: "source" }), (e === !0 || e === "target") && b.jsx(rb, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: R, onMouseEnter: z, onMouseOut: E, type: "target" })] });
}
function PA({ id: e, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: N, noPanClassName: C, onError: R, disableKeyboardA11y: z }) {
  let E = lt((Se) => Se.edgeLookup.get(e));
  const O = lt((Se) => Se.defaultEdgeOptions);
  E = O ? { ...O, ...E } : E;
  let k = E.type || "default", B = N?.[k] || nb[k];
  B === void 0 && (R?.("011", wa.error011(k)), k = "default", B = N?.default || nb.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), A = typeof g < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), Y = !!(E.selectable || l && typeof E.selectable > "u"), te = _.useRef(null), [$, K] = _.useState(!1), [le, j] = _.useState(!1), I = zt(), { zIndex: T, sourceX: L, sourceY: F, targetX: G, targetY: Z, sourcePosition: D, targetPosition: H } = lt(_.useCallback((Se) => {
    const xe = Se.nodeLookup.get(E.source), Ce = Se.nodeLookup.get(E.target);
    if (!xe || !Ce)
      return {
        zIndex: E.zIndex,
        ...ab
      };
    const $e = kM({
      id: e,
      sourceNode: xe,
      targetNode: Ce,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: Se.connectionMode,
      onError: R
    });
    return {
      zIndex: MM({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Ce,
        elevateOnSelect: Se.elevateEdgesOnSelect,
        zIndexMode: Se.zIndexMode
      }),
      ...$e || ab
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), P = _.useMemo(() => E.markerStart ? `url('#${Th(E.markerStart, S)}')` : void 0, [E.markerStart, S]), ne = _.useMemo(() => E.markerEnd ? `url('#${Th(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
  if (E.hidden || L === null || F === null || G === null || Z === null)
    return null;
  const se = (Se) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Ce, multiSelectionActive: $e } = I.getState();
    Y && (I.setState({ nodesSelectionActive: !1 }), E.selected && $e ? (Ce({ nodes: [], edges: [E] }), te.current?.blur()) : xe([e])), s && s(Se, E);
  }, he = u ? (Se) => {
    u(Se, { ...E });
  } : void 0, me = c ? (Se) => {
    c(Se, { ...E });
  } : void 0, ee = d ? (Se) => {
    d(Se, { ...E });
  } : void 0, ge = p ? (Se) => {
    p(Se, { ...E });
  } : void 0, ze = m ? (Se) => {
    m(Se, { ...E });
  } : void 0, Re = (Se) => {
    if (!z && ux.includes(Se.key) && Y) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Ce } = I.getState();
      Se.key === "Escape" ? (te.current?.blur(), xe({ edges: [E] })) : Ce([e]);
    }
  };
  return b.jsx("svg", { style: { zIndex: T }, children: b.jsxs("g", { className: Qt([
    "react-flow__edge",
    `react-flow__edge-${k}`,
    E.className,
    C,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !Y && !s,
      updating: $,
      selectable: Y
    }
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: ee, onMouseMove: ge, onMouseLeave: ze, onKeyDown: V ? Re : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${$x}-${S}` : void 0, ref: te, ...E.domAttributes, children: [!le && b.jsx(B, { id: e, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: Y, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: F, targetX: G, targetY: Z, sourcePosition: D, targetPosition: H, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: P, markerEnd: ne, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), A && b.jsx(QA, { edge: E, isReconnectable: A, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: x, sourceX: L, sourceY: F, targetX: G, targetY: Z, sourcePosition: D, targetPosition: H, setUpdateHover: K, setReconnecting: j })] }) });
}
var KA = _.memo(PA);
const JA = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function dw({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: g, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: N }) {
  const { edgesFocusable: C, edgesReconnectable: R, elementsSelectable: z, onError: E } = lt(JA, At), O = HA(a);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(qA, { defaultColor: e, rfId: r }), O.map((k) => b.jsx(KA, { id: k, edgesFocusable: C, edgesReconnectable: R, elementsSelectable: z, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: y, reconnectRadius: g, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: r, onError: E, edgeTypes: l, disableKeyboardA11y: N }, k))] });
}
dw.displayName = "EdgeRenderer";
const WA = _.memo(dw), e4 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function t4({ children: e }) {
  const a = lt(e4);
  return b.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function n4(e) {
  const a = _m(), r = _.useRef(!1);
  _.useEffect(() => {
    !r.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), r.current = !0);
  }, [e, a.viewportInitialized]);
}
const a4 = (e) => e.panZoom?.syncViewport;
function i4(e) {
  const a = lt(a4), r = zt();
  return _.useEffect(() => {
    e && (a?.(e), r.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function r4(e) {
  return e.connection.inProgress ? { ...e.connection, to: Tl(e.connection.to, e.transform) } : { ...e.connection };
}
function l4(e) {
  return r4;
}
function o4(e) {
  const a = l4();
  return lt(a, At);
}
const s4 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function u4({ containerStyle: e, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = lt(s4, At);
  return !(u && s && p) ? null : b.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: Qt(["react-flow__connection", dx(d)]), children: b.jsx(hw, { style: a, type: r, CustomComponent: l, isValid: d }) }) });
}
const hw = ({ style: e, type: a = Xi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: y, toHandle: g, toPosition: v, pointer: x } = o4();
  if (!s)
    return;
  if (r)
    return b.jsx(r, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: v, connectionStatus: dx(l), toNode: y, toHandle: g, pointer: x });
  let S = "";
  const N = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v
  };
  switch (a) {
    case Xi.Bezier:
      [S] = _x(N);
      break;
    case Xi.SimpleBezier:
      [S] = ew(N);
      break;
    case Xi.Step:
      [S] = Rh({
        ...N,
        borderRadius: 0
      });
      break;
    case Xi.SmoothStep:
      [S] = Rh(N);
      break;
    default:
      [S] = Cx(N);
  }
  return b.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: e });
};
hw.displayName = "ConnectionLine";
const c4 = {};
function lb(e = c4) {
  _.useRef(e), zt(), _.useEffect(() => {
  }, [e]);
}
function f4() {
  zt(), _.useRef(!1), _.useEffect(() => {
  }, []);
}
function mw({ nodeTypes: e, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: g, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: N, connectionLineComponent: C, connectionLineContainerStyle: R, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, multiSelectionKeyCode: k, panActivationKeyCode: B, zoomActivationKeyCode: V, deleteKeyCode: A, onlyRenderVisibleElements: Y, elementsSelectable: te, defaultViewport: $, translateExtent: K, minZoom: le, maxZoom: j, preventScrolling: I, defaultMarkerColor: T, zoomOnScroll: L, zoomOnPinch: F, panOnScroll: G, panOnScrollSpeed: Z, panOnScrollMode: D, zoomOnDoubleClick: H, panOnDrag: P, autoPanOnSelection: ne, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneScroll: ge, onPaneContextMenu: ze, paneClickDistance: Re, nodeClickDistance: Se, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Te, onReconnect: Xe, onReconnectStart: ke, onReconnectEnd: Ye, noDragClassName: St, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt, viewport: It, onViewportChange: Lt }) {
  return lb(e), lb(a), f4(), n4(r), i4(It), b.jsx(CA, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: ge, paneClickDistance: Re, deleteKeyCode: A, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: k, panActivationKeyCode: B, zoomActivationKeyCode: V, elementsSelectable: te, zoomOnScroll: L, zoomOnPinch: F, zoomOnDoubleClick: H, panOnScroll: G, panOnScrollSpeed: Z, panOnScrollMode: D, panOnDrag: P, autoPanOnSelection: ne, defaultViewport: $, translateExtent: K, minZoom: le, maxZoom: j, onSelectionContextMenu: g, preventScrolling: I, noDragClassName: St, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Qe, onViewportChange: Lt, isControlledViewport: !!It, children: b.jsxs(t4, { children: [b.jsx(WA, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Xe, onReconnectStart: ke, onReconnectEnd: Ye, onlyRenderVisibleElements: Y, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Te, defaultMarkerColor: T, noPanClassName: Ze, disableKeyboardA11y: Qe, rfId: yt }), b.jsx(u4, { style: N, type: S, component: C, containerStyle: R }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(LA, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: Se, onlyRenderVisibleElements: Y, noPanClassName: Ze, noDragClassName: St, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
mw.displayName = "GraphView";
const d4 = _.memo(mw), h4 = yx(), ob = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: g, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), R = l ?? a ?? [], z = r ?? e ?? [], E = y ?? [0, 0], O = g ?? $o;
  Mx(N, C, R);
  const { nodesInitialized: k } = Mh(z, x, S, {
    nodeOrigin: E,
    nodeExtent: O,
    zIndexMode: v
  });
  let B = [0, 0, 1];
  if (c && s && u) {
    const V = ns(x, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: A, y: Y, zoom: te } = ym(V, s, u, p, m, d?.padding ?? 0.1);
    B = [A, Y, te];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: B,
    nodes: z,
    nodesInitialized: k,
    nodeLookup: x,
    parentLookup: S,
    edges: R,
    edgeLookup: C,
    connectionLookup: N,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: $o,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Sl.Strict,
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
    connection: { ...fx },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: h4,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: cx,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, m4 = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v }) => ND((x, S) => {
  async function N() {
    const { nodeLookup: C, panZoom: R, fitViewOptions: z, fitViewResolver: E, width: O, height: k, minZoom: B, maxZoom: V } = S();
    R && (await SM({
      nodes: C,
      width: O,
      height: k,
      panZoom: R,
      minZoom: B,
      maxZoom: V
    }, z), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...ob({
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
      defaultNodes: r,
      defaultEdges: l,
      zIndexMode: v
    }),
    setNodes: (C) => {
      const { nodeLookup: R, parentLookup: z, nodeOrigin: E, elevateNodesOnSelect: O, fitViewQueued: k, zIndexMode: B, nodesSelectionActive: V } = S(), { nodesInitialized: A, hasSelectedNodes: Y } = Mh(C, R, z, {
        nodeOrigin: E,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: B
      }), te = V && Y;
      k && A ? (N(), x({
        nodes: C,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: te
      })) : x({ nodes: C, nodesInitialized: A, nodesSelectionActive: te });
    },
    setEdges: (C) => {
      const { connectionLookup: R, edgeLookup: z } = S();
      Mx(R, z, C), x({ edges: C });
    },
    setDefaultNodesAndEdges: (C, R) => {
      if (C) {
        const { setNodes: z } = S();
        z(C), x({ hasDefaultNodes: !0 });
      }
      if (R) {
        const { setEdges: z } = S();
        z(R), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (C) => {
      const { triggerNodeChanges: R, nodeLookup: z, parentLookup: E, domNode: O, nodeOrigin: k, nodeExtent: B, debug: V, fitViewQueued: A, zIndexMode: Y } = S(), { changes: te, updatedInternals: $ } = GM(C, z, E, O, k, B, Y);
      $ && (qM(z, E, { nodeOrigin: k, nodeExtent: B, zIndexMode: Y }), A ? (N(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), te?.length > 0 && (V && console.log("React Flow: trigger node changes", te), R?.(te)));
    },
    updateNodePositions: (C, R = !1) => {
      const z = [];
      let E = [];
      const { nodeLookup: O, triggerNodeChanges: k, connection: B, updateConnection: V, onNodesChangeMiddlewareMap: A } = S();
      for (const [Y, te] of C) {
        const $ = O.get(Y), K = !!($?.expandParent && $?.parentId && te?.position), le = {
          id: Y,
          type: "position",
          position: K ? {
            x: Math.max(0, te.position.x),
            y: Math.max(0, te.position.y)
          } : te.position,
          dragging: R
        };
        if ($ && B.inProgress && B.fromNode.id === $.id) {
          const j = Cr($, B.fromHandle, Ae.Left, !0);
          V({ ...B, from: j });
        }
        K && $.parentId && z.push({
          id: Y,
          parentId: $.parentId,
          rect: {
            ...te.internals.positionAbsolute,
            width: te.measured.width ?? 0,
            height: te.measured.height ?? 0
          }
        }), E.push(le);
      }
      if (z.length > 0) {
        const { parentLookup: Y, nodeOrigin: te } = S(), $ = Em(z, O, Y, te);
        E.push(...$);
      }
      for (const Y of A.values())
        E = Y(E);
      k(E);
    },
    triggerNodeChanges: (C) => {
      const { onNodesChange: R, setNodes: z, nodes: E, hasDefaultNodes: O, debug: k } = S();
      if (C?.length) {
        if (O) {
          const B = ZD(C, E);
          z(B);
        }
        k && console.log("React Flow: trigger node changes", C), R?.(C);
      }
    },
    triggerEdgeChanges: (C) => {
      const { onEdgesChange: R, setEdges: z, edges: E, hasDefaultEdges: O, debug: k } = S();
      if (C?.length) {
        if (O) {
          const B = QD(C, E);
          z(B);
        }
        k && console.log("React Flow: trigger edge changes", C), R?.(C);
      }
    },
    addSelectedNodes: (C) => {
      const { multiSelectionActive: R, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: k } = S();
      if (R) {
        const B = C.map((V) => gr(V, !0));
        O(B);
        return;
      }
      O(pl(E, /* @__PURE__ */ new Set([...C]), !0)), k(pl(z));
    },
    addSelectedEdges: (C) => {
      const { multiSelectionActive: R, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: k } = S();
      if (R) {
        const B = C.map((V) => gr(V, !0));
        k(B);
        return;
      }
      k(pl(z, /* @__PURE__ */ new Set([...C]))), O(pl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: C, edges: R } = {}) => {
      const { edges: z, nodes: E, nodeLookup: O, triggerNodeChanges: k, triggerEdgeChanges: B } = S(), V = C || E, A = R || z, Y = [];
      for (const $ of V) {
        if (!$.selected)
          continue;
        const K = O.get($.id);
        K && (K.selected = !1), Y.push(gr($.id, !1));
      }
      const te = [];
      for (const $ of A)
        $.selected && te.push(gr($.id, !1));
      k(Y), B(te);
    },
    setMinZoom: (C) => {
      const { panZoom: R, maxZoom: z } = S();
      R?.setScaleExtent([C, z]), x({ minZoom: C });
    },
    setMaxZoom: (C) => {
      const { panZoom: R, minZoom: z } = S();
      R?.setScaleExtent([z, C]), x({ maxZoom: C });
    },
    setTranslateExtent: (C) => {
      S().panZoom?.setTranslateExtent(C), x({ translateExtent: C });
    },
    resetSelectedElements: () => {
      const { edges: C, nodes: R, triggerNodeChanges: z, triggerEdgeChanges: E, elementsSelectable: O } = S();
      if (!O)
        return;
      const k = R.reduce((V, A) => A.selected ? [...V, gr(A.id, !1)] : V, []), B = C.reduce((V, A) => A.selected ? [...V, gr(A.id, !1)] : V, []);
      z(k), E(B);
    },
    setNodeExtent: (C) => {
      const { nodes: R, nodeLookup: z, parentLookup: E, nodeOrigin: O, elevateNodesOnSelect: k, nodeExtent: B, zIndexMode: V } = S();
      C[0][0] === B[0][0] && C[0][1] === B[0][1] && C[1][0] === B[1][0] && C[1][1] === B[1][1] || (Mh(R, z, E, {
        nodeOrigin: O,
        nodeExtent: C,
        elevateNodesOnSelect: k,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: C }));
    },
    panBy: (C) => {
      const { transform: R, width: z, height: E, panZoom: O, translateExtent: k } = S();
      return XM({ delta: C, panZoom: O, transform: R, translateExtent: k, width: z, height: E });
    },
    setCenter: async (C, R, z) => {
      const { width: E, height: O, maxZoom: k, panZoom: B } = S();
      if (!B)
        return !1;
      const V = typeof z?.zoom < "u" ? z.zoom : k;
      return await B.setViewport({
        x: E / 2 - C * V,
        y: O / 2 - R * V,
        zoom: V
      }, { duration: z?.duration, ease: z?.ease, interpolate: z?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...fx }
      });
    },
    updateConnection: (C) => {
      x({ connection: C });
    },
    reset: () => x({ ...ob() })
  };
}, Object.is);
function pw({ initialNodes: e, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v, children: x }) {
  const [S] = _.useState(() => m4({
    nodes: e,
    edges: a,
    defaultNodes: r,
    defaultEdges: l,
    width: s,
    height: u,
    fitView: m,
    minZoom: c,
    maxZoom: d,
    fitViewOptions: p,
    nodeOrigin: y,
    nodeExtent: g,
    zIndexMode: v
  }));
  return b.jsx(TD, { value: S, children: b.jsx(tA, { children: x }) });
}
function p4({ children: e, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: x }) {
  return _.useContext(Sc) ? b.jsx(b.Fragment, { children: e }) : b.jsx(pw, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: x, children: e });
}
const g4 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function y4({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: y, onMoveStart: g, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: N, onClickConnectStart: C, onClickConnectEnd: R, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: k, onNodeDoubleClick: B, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: Y, onNodesDelete: te, onEdgesDelete: $, onDelete: K, onSelectionChange: le, onSelectionDragStart: j, onSelectionDrag: I, onSelectionDragStop: T, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onBeforeDelete: Z, connectionMode: D, connectionLineType: H = Xi.Bezier, connectionLineStyle: P, connectionLineComponent: ne, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: ee = !1, selectionMode: ge = Yo.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Re = Go() ? "Meta" : "Control", zoomActivationKeyCode: Se = Go() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Ce, onlyRenderVisibleElements: $e = !1, selectNodesOnDrag: ft, nodesDraggable: Te, autoPanOnNodeFocus: Xe, nodesConnectable: ke, nodesFocusable: Ye, nodeOrigin: St = Yx, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Qe = !0, defaultViewport: gt = qD, minZoom: yt = 0.5, maxZoom: It = 2, translateExtent: Lt = $o, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: Xn = "#b1b1b7", zoomOnScroll: xn = !0, zoomOnPinch: tn = !0, panOnScroll: Pt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = wr.Free, zoomOnDoubleClick: mi = !0, panOnDrag: _a = !0, onPaneClick: wn, onPaneMouseEnter: ua, onPaneMouseMove: On, onPaneMouseLeave: Fn, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ca, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Q, onEdgeMouseLeave: W, reconnectRadius: de = 10, onNodesChange: pe, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: we = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: De, connectOnClick: Ue, attributionPosition: je, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanOnSelection: Na = !0, autoPanSpeed: jn, connectionRadius: cn, isValidConnection: nn, onError: Sn, style: pi, id: En, nodeDragThreshold: gi, connectionDragThreshold: fa, viewport: da, onViewportChange: Be, width: bt, height: pn, colorMode: Ln = "light", debug: yi, onScroll: $a, ariaLabelConfig: dt, zIndexMode: Zn = "basic", ...an }, Qi) {
  const Mr = En || "1", Dl = GD(Ln), vi = _.useCallback((Al) => {
    Al.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), $a?.(Al);
  }, [$a]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ...an, onScroll: vi, style: { ...pi, ...g4 }, ref: Qi, className: Qt(["react-flow", s, Dl]), id: En, role: "application", children: b.jsxs(p4, { nodes: e, edges: a, width: bt, height: pn, fitView: Me, fitViewOptions: De, minZoom: yt, maxZoom: It, nodeOrigin: St, nodeExtent: ot, zIndexMode: Zn, children: [b.jsx(ID, { nodes: e, edges: a, defaultNodes: r, defaultEdges: l, onConnect: x, onConnectStart: S, onConnectEnd: N, onClickConnectStart: C, onClickConnectEnd: R, nodesDraggable: Te, autoPanOnNodeFocus: Xe, nodesConnectable: ke, nodesFocusable: Ye, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Qe, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: It, nodeExtent: ot, onNodesChange: pe, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Ce, connectionMode: D, translateExtent: Lt, connectOnClick: Ue, defaultEdgeOptions: rt, fitView: Me, fitViewOptions: De, onNodesDelete: te, onEdgesDelete: $, onDelete: K, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: Y, onSelectionDrag: I, onSelectionDragStart: j, onSelectionDragStop: T, onMove: y, onMoveStart: g, onMoveEnd: v, noPanClassName: be, nodeOrigin: St, rfId: Mr, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanSpeed: jn, onError: Sn, connectionRadius: cn, isValidConnection: nn, selectNodesOnDrag: ft, nodeDragThreshold: gi, connectionDragThreshold: fa, onBeforeDelete: Z, debug: yi, ariaLabelConfig: dt, zIndexMode: Zn }), b.jsx(d4, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: k, onNodeDoubleClick: B, nodeTypes: u, edgeTypes: c, connectionLineType: H, connectionLineStyle: P, connectionLineComponent: ne, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: ee, selectionMode: ge, deleteKeyCode: he, multiSelectionKeyCode: Re, panActivationKeyCode: ze, zoomActivationKeyCode: Se, onlyRenderVisibleElements: $e, defaultViewport: gt, translateExtent: Lt, minZoom: yt, maxZoom: It, preventScrolling: mt, zoomOnScroll: xn, zoomOnPinch: tn, zoomOnDoubleClick: mi, panOnScroll: Pt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: _a, autoPanOnSelection: Na, onPaneClick: wn, onPaneMouseEnter: ua, onPaneMouseMove: On, onPaneMouseLeave: Fn, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ca, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Q, onEdgeMouseLeave: W, reconnectRadius: de, defaultMarkerColor: Xn, noDragClassName: ve, noWheelClassName: we, noPanClassName: be, rfId: Mr, disableKeyboardA11y: We, nodeExtent: ot, viewport: da, onViewportChange: Be }), b.jsx(VD, { onSelectionChange: le }), Vt, b.jsx(LD, { proOptions: Ge, position: je }), b.jsx(jD, { rfId: Mr, disableKeyboardA11y: We })] }) });
}
var v4 = Gx(y4);
function b4({ dimensions: e, lineWidth: a, variant: r, className: l }) {
  return b.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Qt(["react-flow__background-pattern", r, l]) });
}
function x4({ radius: e, className: a }) {
  return b.jsx("circle", { cx: e, cy: e, r: e, className: Qt(["react-flow__background-pattern", "dots", a]) });
}
var Ba;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ba || (Ba = {}));
const w4 = {
  [Ba.Dots]: 1,
  [Ba.Lines]: 1,
  [Ba.Cross]: 6
}, S4 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function gw({
  id: e,
  variant: a = Ba.Dots,
  // only used for dots and cross
  gap: r = 20,
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
  const g = _.useRef(null), { transform: v, patternId: x } = lt(S4, At), S = l || w4[a], N = a === Ba.Dots, C = a === Ba.Cross, R = Array.isArray(r) ? r : [r, r], z = [R[0] * v[2] || 1, R[1] * v[2] || 1], E = S * v[2], O = Array.isArray(u) ? u : [u, u], k = C ? [E, E] : z, B = [
    O[0] * v[2] || 1 + k[0] / 2,
    O[1] * v[2] || 1 + k[1] / 2
  ], V = `${x}${e || ""}`;
  return b.jsxs("svg", { className: Qt(["react-flow__background", m]), style: {
    ...p,
    ..._c,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [b.jsx("pattern", { id: V, x: v[0] % z[0], y: v[1] % z[1], width: z[0], height: z[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${B[0]},-${B[1]})`, children: N ? b.jsx(x4, { radius: E / 2, className: y }) : b.jsx(b4, { dimensions: k, lineWidth: s, variant: a, className: y }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
gw.displayName = "Background";
const sb = _.memo(gw);
function E4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function _4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function N4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function C4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function R4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Ru({ children: e, className: a, ...r }) {
  return b.jsx("button", { type: "button", className: Qt(["react-flow__controls-button", a]), ...r, children: e });
}
const T4 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function yw({ style: e, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: y, position: g = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = zt(), { isInteractive: N, minZoomReached: C, maxZoomReached: R, ariaLabelConfig: z } = lt(T4, At), { zoomIn: E, zoomOut: O, fitView: k } = _m(), B = () => {
    E(), u?.();
  }, V = () => {
    O(), c?.();
  }, A = () => {
    k(s), d?.();
  }, Y = () => {
    S.setState({
      nodesDraggable: !N,
      nodesConnectable: !N,
      elementsSelectable: !N
    }), p?.(!N);
  }, te = v === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(Ec, { className: Qt(["react-flow__controls", te, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? z["controls.ariaLabel"], children: [a && b.jsxs(b.Fragment, { children: [b.jsx(Ru, { onClick: B, className: "react-flow__controls-zoomin", title: z["controls.zoomIn.ariaLabel"], "aria-label": z["controls.zoomIn.ariaLabel"], disabled: R, children: b.jsx(E4, {}) }), b.jsx(Ru, { onClick: V, className: "react-flow__controls-zoomout", title: z["controls.zoomOut.ariaLabel"], "aria-label": z["controls.zoomOut.ariaLabel"], disabled: C, children: b.jsx(_4, {}) })] }), r && b.jsx(Ru, { className: "react-flow__controls-fitview", onClick: A, title: z["controls.fitView.ariaLabel"], "aria-label": z["controls.fitView.ariaLabel"], children: b.jsx(N4, {}) }), l && b.jsx(Ru, { className: "react-flow__controls-interactive", onClick: Y, title: z["controls.interactive.ariaLabel"], "aria-label": z["controls.interactive.ariaLabel"], children: N ? b.jsx(R4, {}) : b.jsx(C4, {}) }), y] });
}
yw.displayName = "Controls";
const M4 = _.memo(yw);
function D4({ id: e, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: y, shapeRendering: g, selected: v, onClick: x }) {
  const { background: S, backgroundColor: N } = u || {}, C = c || S || N;
  return b.jsx("rect", { className: Qt(["react-flow__minimap-node", { selected: v }, m]), x: a, y: r, rx: y, ry: y, width: l, height: s, style: {
    fill: C,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (R) => x(R, e) : void 0 });
}
const A4 = _.memo(D4), z4 = (e) => e.nodes.map((a) => a.id), ah = (e) => e instanceof Function ? e : () => e;
function O4({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = A4,
  onClick: c
}) {
  const d = lt(z4, At), p = ah(a), m = ah(e), y = ah(r), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: d.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    b.jsx(L4, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, v)
  )) });
}
function j4({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: y, y: g, width: v, height: x } = lt((S) => {
    const N = S.nodeLookup.get(e);
    if (!N)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const C = N.internals.userNode, { x: R, y: z } = N.internals.positionAbsolute, { width: E, height: O } = hi(C);
    return {
      node: C,
      x: R,
      y: z,
      width: E,
      height: O
    };
  }, At);
  return !m || m.hidden || !vx(m) ? null : b.jsx(d, { x: y, y: g, width: v, height: x, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const L4 = _.memo(j4);
var H4 = _.memo(O4);
const k4 = 200, B4 = 150, U4 = (e) => !e.hidden, V4 = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? gx(ns(e.nodeLookup, { filter: U4 }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, q4 = "react-flow__minimap-desc";
function vw({
  style: e,
  className: a,
  nodeStrokeColor: r,
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
  position: v = "bottom-right",
  onClick: x,
  onNodeClick: S,
  pannable: N = !1,
  zoomable: C = !1,
  ariaLabel: R,
  inversePan: z,
  zoomStep: E = 1,
  offsetScale: O = 5
}) {
  const k = zt(), B = _.useRef(null), { boundingRect: V, viewBB: A, rfId: Y, panZoom: te, translateExtent: $, flowWidth: K, flowHeight: le, ariaLabelConfig: j } = lt(V4, At), I = e?.width ?? k4, T = e?.height ?? B4, L = V.width / I, F = V.height / T, G = Math.max(L, F), Z = G * I, D = G * T, H = O * G, P = V.x - (Z - V.width) / 2 - H, ne = V.y - (D - V.height) / 2 - H, se = Z + H * 2, he = D + H * 2, me = `${q4}-${Y}`, ee = _.useRef(0), ge = _.useRef();
  ee.current = G, _.useEffect(() => {
    if (B.current && te)
      return ge.current = tD({
        domNode: B.current,
        panZoom: te,
        getTransform: () => k.getState().transform,
        getViewScale: () => ee.current
      }), () => {
        ge.current?.destroy();
      };
  }, [te]), _.useEffect(() => {
    ge.current?.update({
      translateExtent: $,
      width: K,
      height: le,
      inversePan: z,
      pannable: N,
      zoomStep: E,
      zoomable: C
    });
  }, [N, C, z, E, $, K, le]);
  const ze = x ? (xe) => {
    const [Ce, $e] = ge.current?.pointer(xe) || [0, 0];
    x(xe, { x: Ce, y: $e });
  } : void 0, Re = S ? _.useCallback((xe, Ce) => {
    const $e = k.getState().nodeLookup.get(Ce).internals.userNode;
    S(xe, $e);
  }, []) : void 0, Se = R ?? j["minimap.ariaLabel"];
  return b.jsx(Ec, { position: v, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * G : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Qt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: I, height: T, viewBox: `${P} ${ne} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: B, onClick: ze, children: [Se && b.jsx("title", { id: me, children: Se }), b.jsx(H4, { onClick: Re, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${P - H},${ne - H}h${se + H * 2}v${he + H * 2}h${-se - H * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
vw.displayName = "MiniMap";
const $4 = _.memo(vw), Y4 = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, I4 = {
  [Cl.Line]: "right",
  [Cl.Handle]: "bottom-right"
};
function G4({ nodeId: e, position: a, variant: r = Cl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: N, onResize: C, onResizeEnd: R }) {
  const z = Qx(), E = typeof e == "string" ? e : z, O = zt(), k = _.useRef(null), B = r === Cl.Handle, V = lt(_.useCallback(Y4(B && x), [B, x]), At), A = _.useRef(null), Y = a ?? I4[r];
  _.useEffect(() => {
    if (!(!k.current || !E))
      return A.current || (A.current = mD({
        domNode: k.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: le, snapToGrid: j, nodeOrigin: I, domNode: T } = O.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: le,
            snapToGrid: j,
            nodeOrigin: I,
            paneDomNode: T
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: le, nodeLookup: j, parentLookup: I, nodeOrigin: T } = O.getState(), L = [], F = { x: $.x, y: $.y }, G = j.get(E);
          if (G && G.expandParent && G.parentId) {
            const Z = G.origin ?? T, D = $.width ?? G.measured.width ?? 0, H = $.height ?? G.measured.height ?? 0, P = {
              id: G.id,
              parentId: G.parentId,
              rect: {
                width: D,
                height: H,
                ...bx({
                  x: $.x ?? G.position.x,
                  y: $.y ?? G.position.y
                }, { width: D, height: H }, G.parentId, j, Z)
              }
            }, ne = Em([P], j, I, T);
            L.push(...ne), F.x = $.x ? Math.max(Z[0] * D, $.x) : void 0, F.y = $.y ? Math.max(Z[1] * H, $.y) : void 0;
          }
          if (F.x !== void 0 && F.y !== void 0) {
            const Z = {
              id: E,
              type: "position",
              position: { ...F }
            };
            L.push(Z);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const D = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            L.push(D);
          }
          for (const Z of K) {
            const D = {
              ...Z,
              type: "position"
            };
            L.push(D);
          }
          le(L);
        },
        onEnd: ({ width: $, height: K }) => {
          const le = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: $,
              height: K
            }
          };
          O.getState().triggerNodeChanges([le]);
        }
      })), A.current.update({
        controlPosition: Y,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: g,
        resizeDirection: v,
        onResizeStart: N,
        onResize: C,
        onResizeEnd: R,
        shouldResize: S
      }), () => {
        A.current?.destroy();
      };
  }, [
    Y,
    d,
    p,
    m,
    y,
    g,
    N,
    C,
    R,
    S
  ]);
  const te = Y.split("-");
  return b.jsx("div", { className: Qt(["react-flow__resize-control", "nodrag", ...te, r, l]), ref: k, style: {
    ...s,
    scale: V,
    ...c && { [B ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
_.memo(G4);
var X4 = "_1bllf8b0", F4 = "_1bllf8b1";
const ub = 16, Z4 = "rgba(186, 158, 255, 0.14)", Q4 = "rgba(186, 158, 255, 0.06)", P4 = "rgba(0, 0, 0, 0.6)", K4 = "#1d2023", J4 = "#ba9eff";
function W4({
  nodes: e,
  edges: a,
  nodeTypes: r,
  showMiniMap: l = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: d,
  children: p,
  onNodeClick: m
}) {
  const y = [X4, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsx("div", { className: y, "aria-label": d ?? "node graph", children: /* @__PURE__ */ b.jsxs(
    v4,
    {
      nodes: e,
      edges: a,
      ...r ? { nodeTypes: r } : {},
      fitView: u,
      fitViewOptions: { padding: 0.2 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !0,
      minZoom: 0.2,
      maxZoom: 1.8,
      proOptions: { hideAttribution: !0 },
      onNodeClick: (g, v) => m?.(v),
      children: [
        /* @__PURE__ */ b.jsx(
          sb,
          {
            id: "minor",
            variant: Ba.Dots,
            gap: ub,
            size: 1.1,
            color: Z4
          }
        ),
        /* @__PURE__ */ b.jsx(
          sb,
          {
            id: "major",
            variant: Ba.Lines,
            gap: ub * 5,
            lineWidth: 1,
            color: Q4
          }
        ),
        s && /* @__PURE__ */ b.jsx(M4, { showInteractive: !1 }),
        l && /* @__PURE__ */ b.jsx(
          $4,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: P4,
            nodeColor: () => K4,
            nodeStrokeColor: () => J4,
            className: F4
          }
        ),
        p
      ]
    }
  ) });
}
function e3(e) {
  return /* @__PURE__ */ b.jsx(pw, { children: /* @__PURE__ */ b.jsx(W4, { ...e }) });
}
var t3 = "a9gtw0", n3 = "a9gtw1", a3 = "a9gtw2", i3 = "a9gtw3", r3 = "a9gtw4", l3 = "a9gtw5", o3 = "a9gtw6", s3 = "a9gtw7";
const u3 = {
  default: "",
  raised: n3,
  inset: a3
};
function Oa({
  title: e,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [t3, u3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("section", { className: c, children: [
    (e || r) && /* @__PURE__ */ b.jsxs("header", { className: i3, children: [
      /* @__PURE__ */ b.jsxs("div", { className: r3, children: [
        e && /* @__PURE__ */ b.jsx("span", { className: o3, children: e }),
        a && /* @__PURE__ */ b.jsx("span", { className: s3, children: a })
      ] }),
      r && /* @__PURE__ */ b.jsx("div", { className: l3, children: r })
    ] }),
    l
  ] });
}
const Cm = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function Rm() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function rc() {
  return {
    phase: "idle",
    jobId: null,
    stage: null,
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
    stageStates: Rm()
  };
}
function c3(e, a, r = Date.now()) {
  return {
    ...rc(),
    phase: "running",
    jobId: e,
    lastFrameAt: r,
    stageStates: {
      ...Rm(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function f3(e, a, r = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: p3(a.params.fraction),
        stage: a.params.stage ?? l.stage
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: b3(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: y3(
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
        stageStates: bw(l.stageStates)
      };
    default:
      return l;
  }
}
function d3(e) {
  return { ...e, phase: "cancelled", stageStates: Rm() };
}
const h3 = -32108;
function m3(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: h3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: bw(e.stageStates)
  };
}
function cb(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function fb(e) {
  const a = rc();
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
function p3(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const g3 = 0.3;
function y3(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + g3 * (a - e);
}
function v3(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), r = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + r * e.totalSteps) * e.secondsPerStep;
}
function b3(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function bw(e) {
  const a = { ...e };
  for (const r of Cm)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const xw = [
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
    title: "Transform",
    description: "ICN conditioning noise. Off = rigid ref-lock (recommended).",
    defaultCollapsed: !0
  },
  {
    id: "identity",
    title: "Identity (advanced crutches)",
    description: "Off = canonical. Levers for off-budget drift only.",
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
], Cc = [
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
    key: "upscale_factor",
    label: "RTX upscale",
    tier: "core",
    control: "select",
    numeric: !0,
    default: 0,
    options: [
      { value: "0", label: "Off" },
      { value: "2", label: "2× (Maxine VSR)" },
      { value: "3", label: "3× (Maxine VSR)" },
      { value: "4", label: "4× (Maxine VSR)" }
    ],
    help: "NVIDIA Maxine RTX Video Super Resolution after stitch, before interpolation. Tensor-Core fast; Windows + RTX only."
  },
  {
    key: "upscale_quality",
    label: "Upscale quality",
    tier: "core",
    control: "select",
    default: "HIGH",
    options: [
      { value: "LOW", label: "Low (fastest)" },
      { value: "MEDIUM", label: "Medium" },
      { value: "HIGH", label: "High" },
      { value: "ULTRA", label: "Ultra (best)" },
      { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
      { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" }
    ],
    help: "Maxine VSR quality preset. HIGHBITRATE_* favours clean (uncompressed) sources like fresh renders."
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
    help: "High→low expert switch. Wan2.2 i2v = 0.9. Rarely changed."
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
    help: "Noise the anchor so the prompt can override the input. 0 = rigid. ~0.7 swaps subject. Prefer edit-then-animate."
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
    help: "Spatially mask ICN toward frame centre. 0 = uniform, 1 = corners protected."
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
    help: "Bias padding toward the anchor. 0 = off (canonical). -1 = all (freezes motion)."
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
    help: "Per-channel stat-match toward clip-0. Caps colour drift, not geometry. 0.1–0.5 typical."
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
  }
];
function x3(e) {
  return Cc.filter((a) => a.tier === e);
}
function w3() {
  const e = {};
  for (const a of Cc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function db(e) {
  return {
    ...w3(),
    mode: "image_to_video",
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    blocks_to_swap: e.blocksToSwap,
    interpolate_method: e.interpolateMethod,
    interpolate_fps: e.interpolateFps,
    models_dir: e.modelsDir || void 0,
    output_path: e.outputDir ? `${e.outputDir}/svi2_out.mp4` : void 0,
    dit_high_path: e.ditHighPath || void 0,
    dit_low_path: e.ditLowPath || void 0
  };
}
function hb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const ww = [10, 20, 30, 60, 120], S3 = "custom", ih = { framesPerClip: 85, fps: 16, overlap: 5 };
function Ml(e) {
  return {
    framesPerClip: e.frames_per_clip ?? ih.framesPerClip,
    fps: e.fps ?? ih.fps,
    overlap: e.num_overlap_frame ?? ih.overlap
  };
}
function Sw(e, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (e - 1) * (r - l);
}
function Ew(e, a) {
  return a.fps <= 0 ? 0 : Sw(e, a) / a.fps;
}
function _w(e, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
const E3 = 5, Nw = 129, _3 = [2, 3, 4, 5, 6, 8];
function Cw(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(Nw, Math.max(E3, a));
}
function mb(e, a) {
  return Cw(e * a);
}
function N3(e) {
  return e <= 0 ? 0 : Math.floor(Nw / e);
}
function Rw(e) {
  const { framesPerClip: a, fps: r } = Ml(e);
  return r <= 0 ? 0 : a / r;
}
function C3(e) {
  const { framesPerClip: a, fps: r } = Ml(e), l = `1 × ${a} frames @ ${r} fps → ${Rw(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function R3(e, a) {
  for (const r of ww)
    if (_w(r, a) === e) return r;
  return S3;
}
function T3(e) {
  const a = Ml(e), r = e.num_clips ?? 1, l = Ew(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
const Fo = "svi-canonical", M3 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), D3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), A3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function z3(e) {
  const a = e.frames_per_clip, r = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function O3(e) {
  const a = e.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = z3(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = M3.has(e.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: y,
    isLowVram: p,
    isOffDistribution: D3.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : A3.has(e.id)
  };
}
function j3(e) {
  return [...e].sort((a, r) => a.id === Fo ? -1 : r.id === Fo ? 1 : 0);
}
function L3(e) {
  const a = e.filter((r) => !r.hidden);
  return {
    featured: j3(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function H3(e = 25) {
  return Tr(`/render/jobs?limit=${e}`);
}
async function k3(e) {
  return Tr(`/render/jobs/${e}`);
}
async function B3(e) {
  return Tr("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function U3(e) {
  return Tr(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function V3(e, a, r) {
  return ON(`/render/jobs/${e}/events`, a, r);
}
const q3 = 9e4, $3 = 24e4, Y3 = 5e3, Tw = _.createContext(null);
function I3({
  initialSettings: e = D1,
  initialPreset: a = null,
  children: r
}) {
  const [l, s] = _.useState(e), [u, c] = _.useState(
    a?.id ?? Fo
  ), [d, p] = _.useState(a !== null), [m, y] = _.useState(() => {
    const Z = db(e);
    return a ? hb(Z, a) : Z;
  }), [g, v] = _.useState(null), [x, S] = _.useState(null), [N, C] = _.useState({
    enabled: !1,
    prompt: ""
  }), [R, z] = _.useState(rc), E = _.useRef(null), O = _.useRef(null), k = _.useCallback(() => {
    O.current !== null && (clearInterval(O.current), O.current = null);
  }, []), B = _.useCallback(() => {
    k(), O.current = setInterval(() => {
      z((Z) => {
        if (Z.phase !== "running" || Z.lastFrameAt === null) return Z;
        const D = Date.now() - Z.lastFrameAt;
        return D >= $3 ? (E.current?.(), E.current = null, k(), m3(Z)) : D >= q3 ? cb(Z) : Z;
      });
    }, Y3);
  }, [k]), V = _.useCallback(
    (Z) => {
      const D = Z.params.requires_last_image === !0;
      c(Z.id), p(!0), y((H) => {
        const P = {
          ...db(l),
          mode: H.mode ?? "image_to_video",
          ref_image_path: H.ref_image_path,
          prompts: H.prompts,
          last_image_path: D ? H.last_image_path ?? null : null
        };
        return hb(P, Z);
      }), D || S(null);
    },
    [l]
  ), A = _.useCallback((Z) => {
    y((D) => ({ ...D, mode: Z }));
  }, []), Y = _.useCallback(
    (Z, D) => {
      y((H) => ({ ...H, [Z]: D }));
    },
    []
  ), te = _.useCallback((Z) => {
    y((D) => ({ ...D, prompts: Z }));
  }, []), $ = _.useCallback((Z, D) => {
    v(Z), y((H) => ({ ...H, ref_image_path: D }));
  }, []), K = _.useCallback((Z, D) => {
    S(Z), y((H) => D === null || D.length === 0 ? { ...H, last_image_path: D } : {
      ...H,
      last_image_path: D,
      num_clips: 1,
      frames_per_clip: Cw(H.frames_per_clip ?? 81)
    });
  }, []), le = _.useCallback((Z) => {
    C((D) => ({ ...D, ...Z }));
  }, []), j = _.useCallback((Z) => {
    s(Z);
  }, []), I = _.useCallback(() => {
    E.current?.(), E.current = null, k(), z(rc());
  }, [k]), T = _.useCallback(async () => {
    E.current?.();
    const { jobId: Z } = await B3({ presetId: u, params: m });
    z(c3(Z, N.enabled)), E.current = V3(
      Z,
      (D) => {
        z((H) => f3(H, D));
      },
      () => {
        z((D) => cb(D));
      }
    ), B();
  }, [m, u, N.enabled, B]), L = _.useCallback(async () => {
    const Z = R.jobId;
    if (!Z) return;
    const { status: D } = await U3(Z);
    D !== "cancelling" && (E.current?.(), E.current = null, k(), z((H) => d3(H)));
  }, [R.jobId, k]), F = _.useCallback(
    async (Z) => {
      E.current?.(), E.current = null, k();
      try {
        const D = await k3(Z.id);
        z(fb(D));
      } catch {
        z(fb(Z));
      }
    },
    [k]
  );
  _.useEffect(() => () => {
    E.current?.(), E.current = null, k();
  }, [k]);
  const G = _.useMemo(
    () => ({
      settings: l,
      presetId: u,
      presetApplied: d,
      params: m,
      refImageName: g,
      lastImageName: x,
      qwenEdit: N,
      render: R,
      applyPresetById: V,
      setMode: A,
      updateParam: Y,
      setPrompts: te,
      setRefImage: $,
      setLastImage: K,
      setQwenEdit: le,
      setSettings: j,
      startRenderJob: T,
      cancelRenderJob: L,
      resetRender: I,
      showJobResult: F
    }),
    [
      l,
      u,
      d,
      m,
      g,
      x,
      N,
      R,
      V,
      A,
      Y,
      te,
      $,
      K,
      le,
      j,
      T,
      L,
      I,
      F
    ]
  );
  return /* @__PURE__ */ b.jsx(Tw.Provider, { value: G, children: r });
}
function bn() {
  const e = _.useContext(Tw);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
function G3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
const X3 = (e) => {
  switch (e) {
    case "success":
      return Q3;
    case "info":
      return K3;
    case "warning":
      return P3;
    case "error":
      return J3;
    default:
      return null;
  }
}, F3 = Array(12).fill(0), Z3 = ({ visible: e, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, F3.map((r, l) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), Q3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), P3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), K3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), J3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), W3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ ye.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ ye.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), e5 = () => {
  const [e, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), e;
};
let zh = 1;
class t5 {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const r = this.subscribers.indexOf(a);
      this.subscribers.splice(r, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((r) => r(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var r;
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : zh++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
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
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((r) => r({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((r) => {
      this.subscribers.forEach((l) => l({
        id: r.id,
        dismiss: !0
      }));
    }), a), this.message = (a, r) => this.create({
      ...r,
      message: a
    }), this.error = (a, r) => this.create({
      ...r,
      message: a,
      type: "error"
    }), this.success = (a, r) => this.create({
      ...r,
      type: "success",
      message: a
    }), this.info = (a, r) => this.create({
      ...r,
      type: "info",
      message: a
    }), this.warning = (a, r) => this.create({
      ...r,
      type: "warning",
      message: a
    }), this.loading = (a, r) => this.create({
      ...r,
      type: "loading",
      message: a
    }), this.promise = (a, r) => {
      if (!r)
        return;
      let l;
      r.loading !== void 0 && (l = this.create({
        ...r,
        promise: a,
        type: "loading",
        message: r.loading,
        description: typeof r.description != "function" ? r.description : void 0
      }));
      const s = Promise.resolve(a instanceof Function ? a() : a);
      let u = l !== void 0, c;
      const d = s.then(async (m) => {
        if (c = [
          "resolve",
          m
        ], ye.isValidElement(m))
          u = !1, this.create({
            id: l,
            type: "default",
            message: m
          });
        else if (a5(m) && !m.ok) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${m.status}`) : r.error, v = typeof r.description == "function" ? await r.description(`HTTP error! status: ${m.status}`) : r.description, S = typeof g == "object" && !ye.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...S
          });
        } else if (m instanceof Error) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(m) : r.error, v = typeof r.description == "function" ? await r.description(m) : r.description, S = typeof g == "object" && !ye.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...S
          });
        } else if (r.success !== void 0) {
          u = !1;
          const g = typeof r.success == "function" ? await r.success(m) : r.success, v = typeof r.description == "function" ? await r.description(m) : r.description, S = typeof g == "object" && !ye.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "success",
            description: v,
            ...S
          });
        }
      }).catch(async (m) => {
        if (c = [
          "reject",
          m
        ], r.error !== void 0) {
          u = !1;
          const y = typeof r.error == "function" ? await r.error(m) : r.error, g = typeof r.description == "function" ? await r.description(m) : r.description, x = typeof y == "object" && !ye.isValidElement(y) ? y : {
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
        u && (this.dismiss(l), l = void 0), r.finally == null || r.finally.call(r);
      }), p = () => new Promise((m, y) => d.then(() => c[0] === "reject" ? y(c[1]) : m(c[1])).catch(y));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: p
      } : Object.assign(l, {
        unwrap: p
      });
    }, this.custom = (a, r) => {
      const l = r?.id || zh++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Dn = new t5(), n5 = (e, a) => {
  const r = a?.id || zh++;
  return Dn.addToast({
    title: e,
    ...a,
    id: r
  }), r;
}, a5 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", i5 = n5, r5 = () => Dn.toasts, l5 = () => Dn.getActiveToasts(), br = Object.assign(i5, {
  success: Dn.success,
  info: Dn.info,
  warning: Dn.warning,
  error: Dn.error,
  custom: Dn.custom,
  message: Dn.message,
  promise: Dn.promise,
  dismiss: Dn.dismiss,
  loading: Dn.loading
}, {
  getHistory: r5,
  getToasts: l5
});
G3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Tu(e) {
  return e.label !== void 0;
}
const o5 = 3, s5 = "24px", u5 = "16px", pb = 4e3, c5 = 356, f5 = 14, d5 = 45, h5 = 200;
function Aa(...e) {
  return e.filter(Boolean).join(" ");
}
function m5(e) {
  const [a, r] = e.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const p5 = (e) => {
  var a, r, l, s, u, c, d, p, m;
  const { invert: y, toast: g, unstyled: v, interacting: x, setHeights: S, visibleToasts: N, heights: C, index: R, toasts: z, expanded: E, removeToast: O, defaultRichColors: k, closeButton: B, style: V, cancelButtonStyle: A, actionButtonStyle: Y, className: te = "", descriptionClassName: $ = "", duration: K, position: le, gap: j, expandByDefault: I, classNames: T, icons: L, closeButtonAriaLabel: F = "Close toast" } = e, [G, Z] = ye.useState(null), [D, H] = ye.useState(null), [P, ne] = ye.useState(!1), [se, he] = ye.useState(!1), [me, ee] = ye.useState(!1), [ge, ze] = ye.useState(!1), [Re, Se] = ye.useState(!1), [xe, Ce] = ye.useState(0), [$e, ft] = ye.useState(0), Te = ye.useRef(g.duration || K || pb), Xe = ye.useRef(null), ke = ye.useRef(null), Ye = R === 0, St = R + 1 <= N, Je = g.type, Ze = g.dismissible !== !1, Qe = g.className || "", gt = g.descriptionClassName || "", yt = ye.useMemo(() => C.findIndex((He) => He.toastId === g.id) || 0, [
    C,
    g.id
  ]), It = ye.useMemo(() => {
    var He;
    return (He = g.closeButton) != null ? He : B;
  }, [
    g.closeButton,
    B
  ]), Lt = ye.useMemo(() => g.duration || K || pb, [
    g.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), Xn = ye.useRef(0), xn = ye.useRef(null), [tn, Pt] = le.split("-"), Ot = ye.useMemo(() => C.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    C,
    yt
  ]), Ut = e5(), mi = g.invert || y, _a = Je === "loading";
  ot.current = ye.useMemo(() => yt * j + Ot, [
    yt,
    Ot
  ]), ye.useEffect(() => {
    Te.current = Lt;
  }, [
    Lt
  ]), ye.useEffect(() => {
    ne(!0);
  }, []), ye.useEffect(() => {
    const He = ke.current;
    if (He) {
      const vt = He.getBoundingClientRect().height;
      return ft(vt), S((Ht) => [
        {
          toastId: g.id,
          height: vt,
          position: g.position
        },
        ...Ht
      ]), () => S((Ht) => Ht.filter((Vt) => Vt.toastId !== g.id));
    }
  }, [
    S,
    g.id
  ]), ye.useLayoutEffect(() => {
    if (!P) return;
    const He = ke.current, vt = He.style.height;
    He.style.height = "auto";
    const Ht = He.getBoundingClientRect().height;
    He.style.height = vt, ft(Ht), S((Vt) => Vt.find((pt) => pt.toastId === g.id) ? Vt.map((pt) => pt.toastId === g.id ? {
      ...pt,
      height: Ht
    } : pt) : [
      {
        toastId: g.id,
        height: Ht,
        position: g.position
      },
      ...Vt
    ]);
  }, [
    P,
    g.title,
    g.description,
    S,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const wn = ye.useCallback(() => {
    he(!0), Ce(ot.current), S((He) => He.filter((vt) => vt.toastId !== g.id)), setTimeout(() => {
      O(g);
    }, h5);
  }, [
    g,
    O,
    S,
    ot
  ]);
  ye.useEffect(() => {
    if (g.promise && Je === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let He;
    return E || x || Ut ? (() => {
      if (Xn.current < mt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - mt.current;
        Te.current = Te.current - Vt;
      }
      Xn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Te.current !== 1 / 0 && (mt.current = (/* @__PURE__ */ new Date()).getTime(), He = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), wn();
      }, Te.current));
    })(), () => clearTimeout(He);
  }, [
    E,
    x,
    g,
    Je,
    Ut,
    wn
  ]), ye.useEffect(() => {
    g.delete && (wn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    wn,
    g.delete
  ]);
  function ua() {
    var He;
    if (L?.loading) {
      var vt;
      return /* @__PURE__ */ ye.createElement("div", {
        className: Aa(T?.loader, g == null || (vt = g.classNames) == null ? void 0 : vt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ye.createElement(Z3, {
      className: Aa(T?.loader, g == null || (He = g.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const On = g.icon || L?.[Je] || X3(Je);
  var Fn, un;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: ke,
    className: Aa(te, Qe, T?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, T?.default, T?.[Je], g == null || (r = g.classNames) == null ? void 0 : r[Je]),
    "data-sonner-toast": "",
    "data-rich-colors": (Fn = g.richColors) != null ? Fn : k,
    "data-styled": !(g.jsx || g.unstyled || v),
    "data-mounted": P,
    "data-promise": !!g.promise,
    "data-swiped": Re,
    "data-removed": se,
    "data-visible": St,
    "data-y-position": tn,
    "data-x-position": Pt,
    "data-index": R,
    "data-front": Ye,
    "data-swiping": me,
    "data-dismissible": Ze,
    "data-type": Je,
    "data-invert": mi,
    "data-swipe-out": ge,
    "data-swipe-direction": D,
    "data-expanded": !!(E || I && P),
    "data-testid": g.testId,
    style: {
      "--index": R,
      "--toasts-before": R,
      "--z-index": z.length - R,
      "--offset": `${se ? xe : ot.current}px`,
      "--initial-height": I ? "auto" : `${$e}px`,
      ...V,
      ...g.style
    },
    onDragEnd: () => {
      ee(!1), Z(null), xn.current = null;
    },
    onPointerDown: (He) => {
      He.button !== 2 && (_a || !Ze || (Xe.current = /* @__PURE__ */ new Date(), Ce(ot.current), He.target.setPointerCapture(He.pointerId), He.target.tagName !== "BUTTON" && (ee(!0), xn.current = {
        x: He.clientX,
        y: He.clientY
      })));
    },
    onPointerUp: () => {
      var He, vt, Ht;
      if (ge || !Ze) return;
      xn.current = null;
      const Vt = Number(((He = ke.current) == null ? void 0 : He.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), mn = Number(((vt = ke.current) == null ? void 0 : vt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((Ht = Xe.current) == null ? void 0 : Ht.getTime()), Kt = G === "x" ? Vt : mn, ca = Math.abs(Kt) / pt;
      if (Math.abs(Kt) >= d5 || ca > 0.11) {
        Ce(ot.current), g.onDismiss == null || g.onDismiss.call(g, g), H(G === "x" ? Vt > 0 ? "right" : "left" : mn > 0 ? "down" : "up"), wn(), ze(!0);
        return;
      } else {
        var Wt, U;
        (Wt = ke.current) == null || Wt.style.setProperty("--swipe-amount-x", "0px"), (U = ke.current) == null || U.style.setProperty("--swipe-amount-y", "0px");
      }
      Se(!1), ee(!1), Z(null);
    },
    onPointerMove: (He) => {
      var vt, Ht, Vt;
      if (!xn.current || !Ze || ((vt = window.getSelection()) == null ? void 0 : vt.toString().length) > 0) return;
      const pt = He.clientY - xn.current.y, Kt = He.clientX - xn.current.x;
      var ca;
      const Wt = (ca = e.swipeDirections) != null ? ca : m5(le);
      !G && (Math.abs(Kt) > 1 || Math.abs(pt) > 1) && Z(Math.abs(Kt) > Math.abs(pt) ? "x" : "y");
      let U = {
        x: 0,
        y: 0
      };
      const Q = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if (G === "y") {
        if (Wt.includes("top") || Wt.includes("bottom"))
          if (Wt.includes("top") && pt < 0 || Wt.includes("bottom") && pt > 0)
            U.y = pt;
          else {
            const W = pt * Q(pt);
            U.y = Math.abs(W) < Math.abs(pt) ? W : pt;
          }
      } else if (G === "x" && (Wt.includes("left") || Wt.includes("right")))
        if (Wt.includes("left") && Kt < 0 || Wt.includes("right") && Kt > 0)
          U.x = Kt;
        else {
          const W = Kt * Q(Kt);
          U.x = Math.abs(W) < Math.abs(Kt) ? W : Kt;
        }
      (Math.abs(U.x) > 0 || Math.abs(U.y) > 0) && Se(!0), (Ht = ke.current) == null || Ht.style.setProperty("--swipe-amount-x", `${U.x}px`), (Vt = ke.current) == null || Vt.style.setProperty("--swipe-amount-y", `${U.y}px`);
    }
  }, It && !g.jsx && Je !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": F,
    "data-disabled": _a,
    "data-close-button": !0,
    onClick: _a || !Ze ? () => {
    } : () => {
      wn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: Aa(T?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (un = L?.close) != null ? un : W3) : null, (Je || g.icon || g.promise) && g.icon !== null && (L?.[Je] !== null || g.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Aa(T?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ua() : null, g.type !== "loading" ? On : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Aa(T?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Aa(T?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Aa($, gt, T?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ ye.isValidElement(g.cancel) ? g.cancel : g.cancel && Tu(g.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (He) => {
      Tu(g.cancel) && Ze && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, He), wn());
    },
    className: Aa(T?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(g.action) ? g.action : g.action && Tu(g.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || Y,
    onClick: (He) => {
      Tu(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, He), !He.defaultPrevented && wn());
    },
    className: Aa(T?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function gb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function g5(e, a) {
  const r = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? u5 : s5;
    function p(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        r[`${c}-${y}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof l == "number" || typeof l == "string" ? p(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      l[m] === void 0 ? r[`${c}-${m}`] = d : r[`${c}-${m}`] = typeof l[m] == "number" ? `${l[m]}px` : l[m];
    }) : p(d);
  }), r;
}
const y5 = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: y, mobileOffset: g, theme: v = "light", richColors: x, duration: S, style: N, visibleToasts: C = o5, toastOptions: R, dir: z = gb(), gap: E = f5, icons: O, containerAriaLabel: k = "Notifications" } = a, [B, V] = ye.useState([]), A = ye.useMemo(() => l ? B.filter((P) => P.toasterId === l) : B.filter((P) => !P.toasterId), [
    B,
    l
  ]), Y = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((P) => P.position).map((P) => P.position)))), [
    A,
    u
  ]), [te, $] = ye.useState([]), [K, le] = ye.useState(!1), [j, I] = ye.useState(!1), [T, L] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = ye.useRef(null), G = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), Z = ye.useRef(null), D = ye.useRef(!1), H = ye.useCallback((P) => {
    V((ne) => {
      var se;
      return (se = ne.find((he) => he.id === P.id)) != null && se.delete || Dn.dismiss(P.id), ne.filter(({ id: he }) => he !== P.id);
    });
  }, []);
  return ye.useEffect(() => Dn.subscribe((P) => {
    if (P.dismiss) {
      requestAnimationFrame(() => {
        V((ne) => ne.map((se) => se.id === P.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      RD.flushSync(() => {
        V((ne) => {
          const se = ne.findIndex((he) => he.id === P.id);
          return se !== -1 ? [
            ...ne.slice(0, se),
            {
              ...ne[se],
              ...P
            },
            ...ne.slice(se + 1)
          ] : [
            P,
            ...ne
          ];
        });
      });
    });
  }), [
    B
  ]), ye.useEffect(() => {
    if (v !== "system") {
      L(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), typeof window > "u") return;
    const P = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      P.addEventListener("change", ({ matches: ne }) => {
        L(ne ? "dark" : "light");
      });
    } catch {
      P.addListener(({ matches: se }) => {
        try {
          L(se ? "dark" : "light");
        } catch (he) {
          console.error(he);
        }
      });
    }
  }, [
    v
  ]), ye.useEffect(() => {
    B.length <= 1 && le(!1);
  }, [
    B
  ]), ye.useEffect(() => {
    const P = (ne) => {
      var se;
      if (c.every((ee) => ne[ee] || ne.code === ee)) {
        var me;
        le(!0), (me = F.current) == null || me.focus();
      }
      ne.code === "Escape" && (document.activeElement === F.current || (se = F.current) != null && se.contains(document.activeElement)) && le(!1);
    };
    return document.addEventListener("keydown", P), () => document.removeEventListener("keydown", P);
  }, [
    c
  ]), ye.useEffect(() => {
    if (F.current)
      return () => {
        Z.current && (Z.current.focus({
          preventScroll: !0
        }), Z.current = null, D.current = !1);
      };
  }, [
    F.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: r,
    "aria-label": `${k} ${G}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, Y.map((P, ne) => {
    var se;
    const [he, me] = P.split("-");
    return A.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: P,
      dir: z === "auto" ? gb() : z,
      tabIndex: -1,
      ref: F,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": T,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = te[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${c5}px`,
        "--gap": `${E}px`,
        ...N,
        ...g5(y, g)
      },
      onBlur: (ee) => {
        D.current && !ee.currentTarget.contains(ee.relatedTarget) && (D.current = !1, Z.current && (Z.current.focus({
          preventScroll: !0
        }), Z.current = null));
      },
      onFocus: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || D.current || (D.current = !0, Z.current = ee.relatedTarget);
      },
      onMouseEnter: () => le(!0),
      onMouseMove: () => le(!0),
      onMouseLeave: () => {
        j || le(!1);
      },
      onDragEnd: () => le(!1),
      onPointerDown: (ee) => {
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || I(!0);
      },
      onPointerUp: () => I(!1)
    }, A.filter((ee) => !ee.position && ne === 0 || ee.position === P).map((ee, ge) => {
      var ze, Re;
      return /* @__PURE__ */ ye.createElement(p5, {
        key: ee.id,
        icons: O,
        index: ge,
        toast: ee,
        defaultRichColors: x,
        duration: (ze = R?.duration) != null ? ze : S,
        className: R?.className,
        descriptionClassName: R?.descriptionClassName,
        invert: s,
        visibleToasts: C,
        closeButton: (Re = R?.closeButton) != null ? Re : p,
        interacting: j,
        position: P,
        style: R?.style,
        unstyled: R?.unstyled,
        classNames: R?.classNames,
        cancelButtonStyle: R?.cancelButtonStyle,
        actionButtonStyle: R?.actionButtonStyle,
        closeButtonAriaLabel: R?.closeButtonAriaLabel,
        removeToast: H,
        toasts: A.filter((Se) => Se.position == ee.position),
        heights: te.filter((Se) => Se.position == ee.position),
        setHeights: $,
        expandByDefault: d,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Oh = "svi2-pro:trigger-render", jh = "svi2-pro:render-state";
function v5() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Oh));
}
function b5(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(jh, { detail: e }));
}
function x5(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Oh, e), () => window.removeEventListener(Oh, e));
}
function w5(e) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && e(l);
  };
  return window.addEventListener(jh, a), () => window.removeEventListener(jh, a);
}
const S5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), E5 = 832 * 480, _5 = 0.85;
function Tm(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && S5.has(e);
}
function Rc(e, a) {
  return Tm(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function yb(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function N5(e, a) {
  const r = [];
  e.mode !== "text_to_video" && (!a.hasRefImage || !e.ref_image_path) && r.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (e.prompts ?? []).some((v) => v.trim().length > 0) || r.push({
    field: "prompts",
    message: "At least one prompt is required.",
    severity: "error"
  });
  const c = e.frames_per_clip ?? 81;
  (c - 1) % 4 !== 0 && r.push({
    field: "frames_per_clip",
    message: `Frames per clip must be 4n+1 (got ${c}). Try ${c - (c - 1) % 4}.`,
    severity: "error"
  });
  const d = e.width ?? 480, p = e.height ?? 832;
  yb(d, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), yb(p, 16) || r.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${p}).`,
    severity: "error"
  });
  const m = e.num_inference_steps ?? 50;
  (m < 1 || m > 100) && r.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const y = e.cfg_scale ?? 5;
  (y < 1 || y > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const g = e.num_clips;
  return g !== void 0 && g < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), Tm(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Rc(a.presetId, e) && g !== void 0 && g > 1 && r.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < E5 * _5 && r.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function C5(e) {
  return e.some((a) => a.severity === "error");
}
function Mw() {
  const {
    params: e,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = bn(), d = _.useMemo(
    () => N5(e, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, r, l]
  ), p = C5(d), m = s.phase === "running", [y, g] = _.useState(null), v = _.useCallback(async () => {
    if (p) {
      const S = d.find((N) => N.severity === "error");
      S && g({ field: S.field, token: Date.now() }), br.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), br.success("Render started.");
    } catch (S) {
      const N = S instanceof dc ? S.message : "Could not start the render.";
      br.error(N);
    }
  }, [p, d, u]), x = _.useCallback(async () => {
    try {
      await c();
    } catch {
      br.error("Could not cancel the render.");
    }
  }, [c]);
  return _.useEffect(() => x5(() => void v()), [v]), _.useEffect(() => {
    b5({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: v, cancel: x, focusRequest: y };
}
const R5 = 220, T5 = 80;
function M5(e) {
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
function D5(e, a) {
  const r = a.params;
  switch (e) {
    case "anchor":
      return "Reference image";
    case "qwen_edit":
      return a.qwenEditEnabled ? "Edit-then-animate" : "Skipped";
    case "diffusion": {
      const l = r.num_clips ?? 1, s = a.render.clipIndex + 1;
      return a.render.phase === "running" ? `Clip ${Math.min(s, l)}/${l}` : `${l} clip${l === 1 ? "" : "s"}`;
    }
    case "stitch":
      return r.stitch_mode === "crossfade" ? "Crossfade" : "Overlap trim";
    case "interpolate":
      return r.interpolate_fps && r.interpolate_fps > 0 ? `→ ${r.interpolate_fps} fps` : "Off";
    case "mux":
      return "Encode mp4";
  }
}
function A5(e) {
  const a = Cm.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: M5(s),
      subtitle: D5(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * R5, y: T5 },
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
  return { nodes: r, edges: l };
}
var z5 = "dk8hba0", O5 = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, j5 = "dk8hba5", L5 = "dk8hba6", H5 = "dk8hba7", k5 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, B5 = "dk8hbac";
function U5({ data: e }) {
  const a = e, r = [z5, O5[a.state]].join(" "), l = [B5, k5[a.state]].join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ b.jsx(Rl, { type: "target", position: Ae.Left }),
    /* @__PURE__ */ b.jsxs("div", { className: j5, children: [
      /* @__PURE__ */ b.jsx("span", { className: L5, children: a.title }),
      /* @__PURE__ */ b.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ b.jsx("span", { className: H5, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ b.jsx(Rl, { type: "source", position: Ae.Right })
  ] });
}
const V5 = { pipeline: U5 };
var q5 = "_1g4g8kk0", $5 = "_1g4g8kk1", Y5 = "_1g4g8kk2", I5 = "_1g4g8kk3", G5 = "_1g4g8kk4", X5 = "_1g4g8kk5";
const F5 = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, Z5 = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function Q5() {
  const { render: e, params: a, qwenEdit: r } = bn(), { busy: l, blocked: s, submit: u, cancel: c } = Mw(), d = _.useMemo(
    () => A5({ render: e, params: a, qwenEditEnabled: r.enabled }),
    [e, a, r.enabled]
  ), p = Cm.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ b.jsxs("div", { className: q5, children: [
    /* @__PURE__ */ b.jsx("div", { className: $5, children: /* @__PURE__ */ b.jsx(
      e3,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: V5,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ b.jsx("div", { className: Y5, children: /* @__PURE__ */ b.jsxs(
      Oa,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ b.jsx("div", { className: I5, children: p.map((m) => /* @__PURE__ */ b.jsxs("div", { className: G5, children: [
            /* @__PURE__ */ b.jsx("span", { children: Z5[m] }),
            /* @__PURE__ */ b.jsx(An, { tone: F5[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ b.jsx("div", { className: X5, children: l ? /* @__PURE__ */ b.jsx(Ha, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ b.jsx(Ha, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var vb = Bx();
const Dw = 0, Aw = 1, zw = 2, bb = 3;
var xb = Object.prototype.hasOwnProperty;
function Lh(e, a) {
  var r, l;
  if (e === a) return !0;
  if (e && a && (r = e.constructor) === a.constructor) {
    if (r === Date) return e.getTime() === a.getTime();
    if (r === RegExp) return e.toString() === a.toString();
    if (r === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && Lh(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof e == "object") {
      l = 0;
      for (r in e)
        if (xb.call(e, r) && ++l && !xb.call(a, r) || !(r in a) || !Lh(e[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const si = /* @__PURE__ */ new WeakMap(), ci = () => {
}, hn = (
  /*#__NOINLINE__*/
  ci()
), Hh = Object, nt = (e) => e === hn, La = (e) => typeof e == "function", Zi = (e, a) => ({
  ...e,
  ...a
}), Ow = (e) => La(e.then), rh = {}, Mu = {}, Mm = "undefined", is = typeof window != Mm, kh = typeof document != Mm, P5 = is && "Deno" in window, K5 = () => is && typeof window.requestAnimationFrame != Mm, jw = (e, a) => {
  const r = si.get(e);
  return [
    // Getter
    () => !nt(a) && e.get(a) || rh,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = e.get(a);
        a in Mu || (Mu[a] = s), r[5](a, Zi(s, l), s || rh);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in Mu ? Mu[a] : !nt(a) && e.get(a) || rh
  ];
};
let Bh = !0;
const J5 = () => Bh, [Uh, Vh] = is && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ci,
  ci
], W5 = () => {
  const e = kh && document.visibilityState;
  return nt(e) || e !== "hidden";
}, ez = (e) => (kh && document.addEventListener("visibilitychange", e), Uh("focus", e), () => {
  kh && document.removeEventListener("visibilitychange", e), Vh("focus", e);
}), tz = (e) => {
  const a = () => {
    Bh = !0, e();
  }, r = () => {
    Bh = !1;
  };
  return Uh("online", a), Uh("offline", r), () => {
    Vh("online", a), Vh("offline", r);
  };
}, nz = {
  isOnline: J5,
  isVisible: W5
}, az = {
  initFocus: ez,
  initReconnect: tz
}, wb = !ye.useId, bl = !is || P5, iz = (e) => K5() ? window.requestAnimationFrame(e) : setTimeout(e, 1), lh = bl ? _.useEffect : _.useLayoutEffect, oh = typeof navigator < "u" && navigator.connection, Sb = !bl && oh && ([
  "slow-2g",
  "2g"
].includes(oh.effectiveType) || oh.saveData), Du = /* @__PURE__ */ new WeakMap(), rz = (e) => Hh.prototype.toString.call(e), sh = (e, a) => e === `[object ${a}]`;
let lz = 0;
const qh = (e) => {
  const a = typeof e, r = rz(e), l = sh(r, "Date"), s = sh(r, "RegExp"), u = sh(r, "Object");
  let c, d;
  if (Hh(e) === e && !l && !s) {
    if (c = Du.get(e), c) return c;
    if (c = ++lz + "~", Du.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += qh(e[d]) + ",";
      Du.set(e, c);
    }
    if (u) {
      c = "#";
      const p = Hh.keys(e).sort();
      for (; !nt(d = p.pop()); )
        nt(e[d]) || (c += d + ":" + qh(e[d]) + ",");
      Du.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, Dm = (e) => {
  if (La(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? qh(e) : "", [
    e,
    a
  ];
};
let oz = 0;
const $h = () => ++oz;
async function Lw(...e) {
  const [a, r, l, s] = e, u = Zi({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const d = u.rollbackOnError;
  let p = u.optimisticData;
  const m = (v) => typeof d == "function" ? d(v) : d !== !1, y = u.throwOnError;
  if (La(r)) {
    const v = r, x = [], S = a.keys();
    for (const N of S)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(N) && v(a.get(N)._k) && x.push(N);
    return Promise.all(x.map(g));
  }
  return g(r);
  async function g(v) {
    const [x] = Dm(v);
    if (!x) return;
    const [S, N] = jw(a, x), [C, R, z, E] = si.get(a), O = () => {
      const j = C[x];
      return (La(u.revalidate) ? u.revalidate(S().data, v) : u.revalidate !== !1) && (delete z[x], delete E[x], j && j[0]) ? j[0](zw).then(() => S().data) : S().data;
    };
    if (e.length < 3)
      return O();
    let k = l, B, V = !1;
    const A = $h();
    R[x] = [
      A,
      0
    ];
    const Y = !nt(p), te = S(), $ = te.data, K = te._c, le = nt(K) ? $ : K;
    if (Y && (p = La(p) ? p(le, $) : p, N({
      data: p,
      _c: le
    })), La(k))
      try {
        k = k(le);
      } catch (j) {
        B = j, V = !0;
      }
    if (k && Ow(k))
      if (k = await k.catch((j) => {
        B = j, V = !0;
      }), A !== R[x][0]) {
        if (V) throw B;
        return k;
      } else V && Y && m(B) && (c = !0, N({
        data: le,
        _c: hn
      }));
    if (c && !V)
      if (La(c)) {
        const j = c(k, le);
        N({
          data: j,
          error: hn,
          _c: hn
        });
      } else
        N({
          data: k,
          error: hn,
          _c: hn
        });
    if (R[x][1] = $h(), Promise.resolve(O()).then(() => {
      N({
        _c: hn
      });
    }), V) {
      if (y) throw B;
      return;
    }
    return k;
  }
}
const Eb = (e, a) => {
  for (const r in e)
    e[r][0] && e[r][0](a);
}, sz = (e, a) => {
  if (!si.has(e)) {
    const r = Zi(az, a), l = /* @__PURE__ */ Object.create(null), s = Lw.bind(hn, e);
    let u = ci;
    const c = /* @__PURE__ */ Object.create(null), d = (y, g) => {
      const v = c[y] || [];
      return c[y] = v, v.push(g), () => v.splice(v.indexOf(g), 1);
    }, p = (y, g, v) => {
      e.set(y, g);
      const x = c[y];
      if (x)
        for (const S of x)
          S(g, v);
    }, m = () => {
      if (!si.has(e) && (si.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !bl)) {
        const y = r.initFocus(setTimeout.bind(hn, Eb.bind(hn, l, Dw))), g = r.initReconnect(setTimeout.bind(hn, Eb.bind(hn, l, Aw)));
        u = () => {
          y && y(), g && g(), si.delete(e);
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
    si.get(e)[4]
  ];
}, uz = (e, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, d, s);
}, cz = Lh, [Hw, fz] = sz(/* @__PURE__ */ new Map()), dz = Zi(
  {
    // events
    onLoadingSlow: ci,
    onSuccess: ci,
    onError: ci,
    onErrorRetry: uz,
    onDiscarded: ci,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Sb ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Sb ? 5e3 : 3e3,
    // providers
    compare: cz,
    isPaused: () => !1,
    cache: Hw,
    mutate: fz,
    fallback: {}
  },
  // use web preset by default
  nz
), hz = (e, a) => {
  const r = Zi(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Zi(s, c));
  }
  return r;
}, mz = _.createContext({}), pz = "$inf$", kw = is && window.__SWR_DEVTOOLS_USE__, gz = kw ? window.__SWR_DEVTOOLS_USE__ : [], yz = () => {
  kw && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, vz = (e) => La(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], bz = () => {
  const e = _.useContext(mz);
  return _.useMemo(() => Zi(dz, e), [
    e
  ]);
}, xz = (e) => (a, r, l) => e(a, r && ((...u) => {
  const [c] = Dm(a), [, , , d] = si.get(Hw);
  if (c.startsWith(pz))
    return r(...u);
  const p = d[c];
  return nt(p) ? r(...u) : (delete d[c], p);
}), l), wz = gz.concat(xz), Sz = (e) => function(...r) {
  const l = bz(), [s, u, c] = vz(r), d = hz(l, c);
  let p = e;
  const { use: m } = d, y = (m || []).concat(wz);
  for (let g = y.length; g--; )
    p = y[g](p);
  return p(s, u || d.fetcher || null, d);
}, Ez = (e, a, r) => {
  const l = a[e] || (a[e] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
yz();
const uh = ye.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), ch = {
  dedupe: !0
}, _b = Promise.resolve(hn), _z = () => ci, Nz = (e, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: g, keepPreviousData: v, strictServerPrefetchWarning: x } = r, [S, N, C, R] = si.get(l), [z, E] = Dm(e), O = _.useRef(!1), k = _.useRef(!1), B = _.useRef(z), V = _.useRef(a), A = _.useRef(r), Y = () => A.current, te = () => Y().isVisible() && Y().isOnline(), [$, K, le, j] = jw(l, z), I = _.useRef({}).current, T = nt(c) ? nt(r.fallback) ? hn : r.fallback[z] : c, L = (Te, Xe) => {
    for (const ke in I) {
      const Ye = ke;
      if (Ye === "data") {
        if (!s(Te[Ye], Xe[Ye]) && (!nt(Te[Ye]) || !s(he, Xe[Ye])))
          return !1;
      } else if (Xe[Ye] !== Te[Ye])
        return !1;
    }
    return !0;
  }, F = !O.current, G = _.useMemo(() => {
    const Te = $(), Xe = j(), ke = (Ze) => {
      const Qe = Zi(Ze);
      return delete Qe._k, (() => {
        if (!z || !a || Y().isPaused()) return !1;
        if (F && !nt(d)) return d;
        const yt = nt(T) ? Qe.data : T;
        return nt(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Qe
      } : Qe;
    }, Ye = ke(Te), St = Te === Xe ? Ye : ke(Xe);
    let Je = Ye;
    return [
      () => {
        const Ze = ke($());
        return L(Ze, Je) ? (Je.data = Ze.data, Je.isLoading = Ze.isLoading, Je.isValidating = Ze.isValidating, Je.error = Ze.error, Je) : (Je = Ze, Ze);
      },
      () => St
    ];
  }, [
    l,
    z
  ]), Z = vb.useSyncExternalStore(_.useCallback(
    (Te) => le(z, (Xe, ke) => {
      L(ke, Xe) || Te();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      z
    ]
  ), G[0], G[1]), D = S[z] && S[z].length > 0, H = Z.data, P = nt(H) ? T && Ow(T) ? uh(T) : T : H, ne = Z.error, se = _.useRef(P), he = v ? nt(H) ? nt(se.current) ? P : se.current : H : P, me = z && nt(P), ee = _.useRef(null);
  !bl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  vb.useSyncExternalStore(_z, () => (ee.current = !1, ee), () => (ee.current = !0, ee));
  const ge = ee.current;
  x && ge && !u && me && console.warn(`Missing pre-initiated data for serialized key "${z}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ze = !z || !a || Y().isPaused() || D && !nt(ne) ? !1 : F && !nt(d) ? d : u ? nt(P) ? !1 : p : nt(P) || p, Re = F && ze, Se = nt(Z.isValidating) ? Re : Z.isValidating, xe = nt(Z.isLoading) ? Re : Z.isLoading, Ce = _.useCallback(
    async (Te) => {
      const Xe = V.current;
      if (!z || !Xe || k.current || Y().isPaused())
        return !1;
      let ke, Ye, St = !0;
      const Je = Te || {}, Ze = !C[z] || !Je.dedupe, Qe = () => wb ? !k.current && z === B.current && O.current : z === B.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(gt);
      }, It = () => {
        const mt = C[z];
        mt && mt[1] === Ye && delete C[z];
      }, Lt = {
        isValidating: !0
      };
      nt($().data) && (Lt.isLoading = !0);
      try {
        if (Ze && (K(Lt), r.loadingTimeout && nt($().data) && setTimeout(() => {
          St && Qe() && Y().onLoadingSlow(z, r);
        }, r.loadingTimeout), C[z] = [
          Xe(E),
          $h()
        ]), [ke, Ye] = C[z], ke = await ke, Ze && setTimeout(It, r.dedupingInterval), !C[z] || C[z][1] !== Ye)
          return Ze && Qe() && Y().onDiscarded(z), !1;
        gt.error = hn;
        const mt = N[z];
        if (!nt(mt) && // case 1
        (Ye <= mt[0] || // case 2
        Ye <= mt[1] || // case 3
        mt[1] === 0))
          return yt(), Ze && Qe() && Y().onDiscarded(z), !1;
        const ot = $().data;
        gt.data = s(ot, ke) ? ot : ke, Ze && Qe() && Y().onSuccess(ke, z, r);
      } catch (mt) {
        It();
        const ot = Y(), { shouldRetryOnError: Xn } = ot;
        ot.isPaused() || (gt.error = mt, Ze && Qe() && (ot.onError(mt, z, ot), (Xn === !0 || La(Xn) && Xn(mt)) && (!Y().revalidateOnFocus || !Y().revalidateOnReconnect || te()) && ot.onErrorRetry(mt, z, ot, (xn) => {
          const tn = S[z];
          tn && tn[0] && tn[0](bb, xn);
        }, {
          retryCount: (Je.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return St = !1, yt(), !0;
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
      z,
      l
    ]
  ), $e = _.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Te) => Lw(l, B.current, ...Te),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (lh(() => {
    V.current = a, A.current = r, nt(H) || (se.current = H);
  }), lh(() => {
    if (!z) return;
    const Te = Ce.bind(hn, ch);
    let Xe = 0;
    Y().revalidateOnFocus && (Xe = Date.now() + Y().focusThrottleInterval);
    const Ye = Ez(z, S, (St, Je = {}) => {
      if (St == Dw) {
        const Ze = Date.now();
        Y().revalidateOnFocus && Ze > Xe && te() && (Xe = Ze + Y().focusThrottleInterval, Te());
      } else if (St == Aw)
        Y().revalidateOnReconnect && te() && Te();
      else {
        if (St == zw)
          return Ce();
        if (St == bb)
          return Ce(Je);
      }
    });
    return k.current = !1, B.current = z, O.current = !0, K({
      _k: E
    }), ze && (C[z] || (nt(P) || bl ? Te() : iz(Te))), () => {
      k.current = !0, Ye();
    };
  }, [
    z
  ]), lh(() => {
    let Te;
    function Xe() {
      const Ye = La(m) ? m($().data) : m;
      Ye && Te !== -1 && (Te = setTimeout(ke, Ye));
    }
    function ke() {
      !$().error && (y || Y().isVisible()) && (g || Y().isOnline()) ? Ce(ch).then(Xe) : Xe();
    }
    return Xe(), () => {
      Te && (clearTimeout(Te), Te = -1);
    };
  }, [
    m,
    y,
    g,
    z
  ]), _.useDebugValue(he), u) {
    if (!wb && bl && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (V.current = a, A.current = r, k.current = !1);
    const Te = R[z], Xe = !nt(Te) && me ? $e(Te) : _b;
    if (uh(Xe), !nt(ne) && me)
      throw ne;
    const ke = me ? Ce(ch) : _b;
    !nt(he) && me && (ke.status = "fulfilled", ke.value = !0), uh(ke);
  }
  return {
    mutate: $e,
    get data() {
      return I.data = !0, he;
    },
    get error() {
      return I.error = !0, ne;
    },
    get isValidating() {
      return I.isValidating = !0, Se;
    },
    get isLoading() {
      return I.isLoading = !0, xe;
    }
  };
}, Yh = Sz(Nz);
var Cz = "_1xasopc0", Rz = "_1xasopc1", Tz = "_1xasopc2", Mz = "_1xasopc3", Dz = "_1xasopc4", Az = "_1xasopc5", zz = "_1xasopc6", Oz = "_1xasopc7", jz = "_1xasopc8";
function Lz(e, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function Hz(e, a, r) {
  for (const l of e) {
    if (a && !Lz(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function Nb({
  accept: e,
  maxSizeBytes: a,
  multiple: r = !1,
  disabled: l = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: d,
  renderPreview: p,
  onFiles: m
}) {
  const y = _.useRef(null), g = _.useId(), v = _.useId(), [x, S] = _.useState(!1), [N, C] = _.useState(null), [R, z] = _.useState([]), E = _.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), le = r ? K : K.slice(0, 1), j = Hz(le, e, a);
      if (j) {
        C(j);
        return;
      }
      C(null), z(le), m(le);
    },
    [e, a, r, m]
  ), O = _.useCallback(() => {
    l || y.current?.click();
  }, [l]), k = _.useCallback(
    ($) => {
      l || ($.key === "Enter" || $.key === " ") && ($.preventDefault(), O());
    },
    [l, O]
  ), B = _.useCallback(
    ($) => {
      $.preventDefault(), S(!1), !l && E($.dataTransfer.files);
    },
    [l, E]
  ), V = _.useCallback(
    ($) => {
      $.preventDefault(), l || S(!0);
    },
    [l]
  ), A = _.useCallback(($) => {
    $.preventDefault(), S(!1);
  }, []), Y = [u ? v : null, N ? g : null].filter(Boolean).join(" "), te = [
    Cz,
    x ? Rz : "",
    l ? Tz : "",
    N !== null ? Mz : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": l,
        "aria-describedby": Y || void 0,
        className: te,
        onClick: O,
        onKeyDown: k,
        onDrop: B,
        onDragOver: V,
        onDragLeave: A,
        children: [
          /* @__PURE__ */ b.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: Dz,
              accept: e,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => E($.target.files)
            }
          ),
          /* @__PURE__ */ b.jsx("span", { className: Az, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ b.jsx("span", { id: v, className: zz, children: u }),
          p && R.length > 0 && /* @__PURE__ */ b.jsx("div", { className: jz, children: p(R) })
        ]
      }
    ),
    N && /* @__PURE__ */ b.jsx("div", { id: g, role: "alert", className: Oz, children: N })
  ] });
}
function Cb(e) {
  const [a, r] = _.useState(null);
  return _.useEffect(() => {
    if (!e) {
      r(null);
      return;
    }
    const l = URL.createObjectURL(e);
    return r(l), () => URL.revokeObjectURL(l);
  }, [e]), a;
}
async function kz(e) {
  const a = new FormData();
  a.append("file", e);
  const r = await fetch(`${hc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new dc(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function Rb(e) {
  const [a, r] = _.useState(null), [l, s] = _.useState(!1), [u, c] = _.useState(null), d = _.useCallback(
    async (p) => {
      if (r(p), c(null), !p) {
        e(null, null);
        return;
      }
      s(!0);
      try {
        const { path: m } = await kz(p);
        e(p.name, m);
      } catch (m) {
        const y = m instanceof dc ? m.message : "Upload failed. Try again.";
        c(y), e(null, null), br.error(y);
      } finally {
        s(!1);
      }
    },
    [e]
  );
  return { file: a, uploading: l, uploadError: u, pick: d };
}
var Bz = "cyswg40", Tb = "cyswg41", Mb = "cyswg42", Db = "cyswg43", Ab = "cyswg44", zb = "cyswg45", Au = "cyswg46";
const Ob = 32 * 1024 * 1024;
function Uz({
  refImageRequired: e,
  lastImageRequired: a,
  refError: r,
  lastError: l
}) {
  const { setRefImage: s, setLastImage: u } = bn(), c = _.useCallback(
    (v, x) => s(v, x ?? ""),
    [s]
  ), d = _.useCallback(
    (v, x) => u(v, x),
    [u]
  ), p = Rb(c), m = Rb(d), y = Cb(p.file), g = Cb(m.file);
  return /* @__PURE__ */ b.jsxs("div", { className: Bz, children: [
    /* @__PURE__ */ b.jsxs("div", { className: Tb, children: [
      /* @__PURE__ */ b.jsxs("span", { className: Mb, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ b.jsx(An, { tone: "accent", children: "required" }) : /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ b.jsx(
        Nb,
        {
          accept: "image/*",
          maxSizeBytes: Ob,
          ariaLabel: "reference image upload",
          label: p.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (v) => void p.pick(v[0] ?? null),
          renderPreview: () => y ? /* @__PURE__ */ b.jsx("img", { className: Db, src: y, alt: "reference preview" }) : null
        }
      ),
      p.uploading && /* @__PURE__ */ b.jsx("span", { className: zb, children: "Uploading…" }),
      !p.uploading && p.file && /* @__PURE__ */ b.jsx("span", { className: Ab, children: p.file.name }),
      p.uploadError && /* @__PURE__ */ b.jsx("span", { role: "alert", className: Au, children: p.uploadError }),
      r && /* @__PURE__ */ b.jsx("span", { role: "alert", className: Au, children: r })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Tb, children: [
      /* @__PURE__ */ b.jsxs("span", { className: Mb, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ b.jsx(An, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ b.jsx(
        Nb,
        {
          accept: "image/*",
          maxSizeBytes: Ob,
          ariaLabel: "last image upload",
          label: m.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (v) => void m.pick(v[0] ?? null),
          renderPreview: () => g ? /* @__PURE__ */ b.jsx("img", { className: Db, src: g, alt: "last preview" }) : null
        }
      ),
      m.uploading && /* @__PURE__ */ b.jsx("span", { className: zb, children: "Uploading…" }),
      !m.uploading && m.file && /* @__PURE__ */ b.jsx("span", { className: Ab, children: m.file.name }),
      m.uploadError && /* @__PURE__ */ b.jsx("span", { role: "alert", className: Au, children: m.uploadError }),
      l && /* @__PURE__ */ b.jsx("span", { role: "alert", className: Au, children: l })
    ] })
  ] });
}
const Vz = /wan[\s._-]?2[._]2/i, qz = /i2v/i, $z = /high/i, Yz = /low/i, Iz = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function Gz(e) {
  const a = `${e.family_id} ${e.filename}`;
  return Iz.has(e.format) && e.install_path !== null && Vz.test(a) && qz.test(a);
}
function Xz(e) {
  const a = /* @__PURE__ */ new Map();
  for (const l of e) {
    if (!Gz(l)) continue;
    const s = a.get(l.family_id) ?? [];
    a.set(l.family_id, [...s, l]);
  }
  const r = [];
  for (const [l, s] of a) {
    const u = s.find((d) => $z.test(d.filename)), c = s.find((d) => Yz.test(d.filename) && d !== u);
    !u?.install_path || !c?.install_path || r.push({
      familyId: l,
      label: l.replace(/^huggingface:/, ""),
      ditHighPath: u.install_path,
      ditLowPath: c.install_path
    });
  }
  return r.sort((l, s) => l.label.localeCompare(s.label));
}
const Fz = "/api/v1/model-store/installed";
async function Zz() {
  const e = await fetch(Fz, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var rs = "_1czy96m0", ls = "_1czy96m1", Am = "_1czy96m2", zm = "_1czy96m3", Om = "_1czy96m4", Bw = "_1czy96m5", Uw = "_1czy96m6", Vw = "_1czy96m7", qw = "_1czy96m8", $w = "_1czy96m9", Qz = "_1czy96ma", Pz = "_1czy96mb", Kz = "_1czy96mc", Jz = "_1czy96md", Wz = "_1czy96me", eO = "_1czy96mf", tO = "_1czy96mg", nO = "_1czy96mh", aO = "_1czy96mi", iO = "_1czy96mk _1czy96mj", rO = "_1czy96ml _1czy96mj", lO = "_1czy96mm", oO = "_1czy96mn", sO = "_1czy96mo", Ih = "_1czy96mp", uO = "_1czy96mq";
const jb = "__bundled__";
function cO() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = bn(), s = Yh("svi2/installed-models", Zz), u = _.useMemo(
    () => Xz(s.data?.installed ?? []),
    [s.data]
  ), c = u.find((m) => m.ditHighPath === e.dit_high_path)?.familyId ?? jb, d = _.useCallback(
    (m) => {
      const y = u.find((v) => v.familyId === m), g = y ? {
        ...a,
        baseModelFamilyId: y.familyId,
        ditHighPath: y.ditHighPath,
        ditLowPath: y.ditLowPath
      } : { ...a, baseModelFamilyId: "", ditHighPath: "", ditLowPath: "" };
      r("dit_high_path", y ? y.ditHighPath : void 0), r("dit_low_path", y ? y.ditLowPath : void 0), l(g), z1(g).catch(() => {
      });
    },
    [u, a, r, l]
  ), p = s.error !== void 0;
  return /* @__PURE__ */ b.jsxs("div", { className: rs, children: [
    /* @__PURE__ */ b.jsx("label", { className: ls, htmlFor: "svi2-base-model", children: "Base model (Wan2.2-I2V)" }),
    /* @__PURE__ */ b.jsxs("div", { className: lO, children: [
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          id: "svi2-base-model",
          className: oO,
          value: c,
          onChange: (m) => d(m.target.value),
          children: [
            /* @__PURE__ */ b.jsx("option", { value: jb, children: zN }),
            u.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.familyId, children: m.label }, m.familyId))
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: sO, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ b.jsx("title", { children: "open" }),
        /* @__PURE__ */ b.jsx(
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
    p && /* @__PURE__ */ b.jsx("span", { className: Ih, children: "Model Foundry list unavailable — using the bundled base model." }),
    !p && u.length === 0 && /* @__PURE__ */ b.jsx("span", { className: Ih, children: "No substitutable Wan2.2-I2V high/low pairs installed via Model Foundry yet." })
  ] });
}
const Tc = "custom", fO = [
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
function jm(e) {
  const a = new Map(e.map((l) => [l.id, l])), r = [];
  for (const l of fO) {
    const s = a.get(l.presetId), u = s?.params.width, c = s?.params.height;
    !u || !c || r.push({
      id: l.presetId,
      width: u,
      height: c,
      label: l.label,
      sub: l.sub,
      stepsDown: l.stepsDown,
      offDistribution: l.offDistribution
    });
  }
  return r;
}
function Lm(e, a) {
  const r = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return r ? r.id : Tc;
}
var dO = "_14qe5430", hO = "_14qe5431", mO = "_14qe5432", pO = "_14qe5433", gO = "_14qe5434", yO = "_14qe5435", vO = "_14qe5436", bO = "_14qe5437", xO = "_14qe5438", wO = "_14qe543a _14qe5439", SO = "_14qe543b _14qe5439", EO = "_14qe543c _14qe5439";
const _O = {
  ok: hO,
  neutral: mO,
  warn: pO
}, NO = {
  ok: yO,
  neutral: vO,
  warn: bO
}, CO = {
  ok: wO,
  neutral: SO,
  warn: EO
};
function RO(e, a) {
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
function TO({ tone: e }) {
  return e === "ok" ? /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("title", { children: "in distribution" }),
    /* @__PURE__ */ b.jsx(
      "path",
      {
        d: "M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ b.jsx(
      "path",
      {
        d: "M7 10l2.1 2.1L13.2 8",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) : e === "warn" ? /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("title", { children: "warning" }),
    /* @__PURE__ */ b.jsx(
      "path",
      {
        d: "M10 2.6L18.6 17H1.4L10 2.6z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ b.jsx("path", { d: "M10 8v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ b.jsx("circle", { cx: "10", cy: "14.4", r: "0.9", fill: "currentColor" })
  ] }) : /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("title", { children: "info" }),
    /* @__PURE__ */ b.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ b.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ b.jsx("circle", { cx: "10", cy: "6.2", r: "0.9", fill: "currentColor" })
  ] });
}
function MO({
  presets: e,
  warningText: a
}) {
  const { params: r } = bn(), l = _.useMemo(() => jm(e), [e]);
  if (l.length === 0) return null;
  const s = Lm(r, l), u = s === Tc ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = RO(u, a);
  return /* @__PURE__ */ b.jsxs(
    "output",
    {
      className: [dO, _O[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ b.jsx("span", { className: [gO, NO[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ b.jsx(TO, { tone: c.tone }) }),
        /* @__PURE__ */ b.jsx("span", { className: xO, children: c.text }),
        /* @__PURE__ */ b.jsx("span", { className: CO[c.tone], children: c.tag })
      ]
    }
  );
}
var DO = "_5d10lv0";
const AO = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], zO = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.";
function OO(e) {
  return [Om, e ? Bw : ""].filter(Boolean).join(" ");
}
function jO({ value: e, onChange: a }) {
  return /* @__PURE__ */ b.jsxs("div", { className: rs, children: [
    /* @__PURE__ */ b.jsx("span", { className: ls, id: "svi2-mode-label", children: "Mode" }),
    /* @__PURE__ */ b.jsx("div", { className: Am, children: /* @__PURE__ */ b.jsx("div", { className: zm, role: "radiogroup", "aria-labelledby": "svi2-mode-label", children: AO.map((r) => {
      const l = e === r.value;
      return /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": l,
          className: OO(l),
          onClick: () => a(r.value),
          children: r.label
        },
        r.value
      );
    }) }) }),
    e === "text_to_video" && /* @__PURE__ */ b.jsx("p", { className: DO, "aria-live": "polite", children: zO })
  ] });
}
var LO = "dck790", HO = "dck791", kO = "dck792";
function lc({ title: e, detail: a, action: r, className: l }) {
  const s = [LO, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: s, children: [
    /* @__PURE__ */ b.jsx("span", { className: HO, children: e }),
    a && /* @__PURE__ */ b.jsx("span", { className: kO, children: a }),
    r
  ] });
}
var BO = "_1880igs0", UO = "_1880igs1", VO = "_1880igs2", qO = "_1880igs3", $O = "_1880igs4", YO = "_1880igs5", IO = "_1880igs6";
const GO = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function XO({ jobs: e, onOpen: a }) {
  return e.length === 0 ? /* @__PURE__ */ b.jsx(
    lc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ b.jsx("div", { className: BO, children: e.map((r) => /* @__PURE__ */ b.jsxs("button", { type: "button", className: UO, onClick: () => a(r), children: [
    /* @__PURE__ */ b.jsxs("span", { className: VO, children: [
      /* @__PURE__ */ b.jsx("span", { className: qO, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ b.jsx("span", { className: $O, children: FO(r) })
    ] }),
    /* @__PURE__ */ b.jsxs("span", { className: YO, children: [
      /* @__PURE__ */ b.jsx("time", { className: IO, dateTime: r.createdAt, title: ZO(r.createdAt), children: QO(r.createdAt) }),
      /* @__PURE__ */ b.jsx(An, { tone: GO[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function FO(e) {
  const a = e.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function ZO(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function QO(e) {
  const a = new Date(e), r = a.getTime();
  if (Number.isNaN(r)) return "";
  const l = Date.now() - r;
  if (l < 0) return "just now";
  const s = Math.floor(l / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const u = Math.floor(s / 60);
  if (u < 24) return `${u}h ago`;
  const c = Math.floor(u / 24);
  return c < 7 ? `${c}d ago` : a.toLocaleDateString();
}
function PO() {
  const { presetId: e, params: a } = bn();
  return Rc(e, a) ? /* @__PURE__ */ b.jsx(JO, {}) : /* @__PURE__ */ b.jsx(KO, {});
}
function Yw(e) {
  return [Om, e ? Bw : ""].filter(Boolean).join(" ");
}
function KO() {
  const { params: e, updateParam: a } = bn(), r = Ml(e), l = R3(e.num_clips ?? 1, r), [s, u] = _.useState(
    () => Number(Ew(e.num_clips ?? 1, r).toFixed(1))
  ), c = (d) => {
    a("num_clips", _w(d, r));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: rs, children: [
    /* @__PURE__ */ b.jsx("span", { className: ls, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ b.jsxs("div", { className: Am, children: [
      /* @__PURE__ */ b.jsx("div", { className: zm, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: ww.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: Yw(p),
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
      /* @__PURE__ */ b.jsxs("div", { className: Uw, children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: Vw,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            }
          }
        ),
        /* @__PURE__ */ b.jsx("span", { className: qw, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("output", { className: $w, "aria-live": "polite", children: T3(e) })
  ] });
}
function JO() {
  const { params: e, updateParam: a } = bn(), r = Ml(e), l = N3(r.fps), [s, u] = _.useState(() => Number(Rw(e).toFixed(1))), c = _3.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", mb(m, r.fps));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: rs, children: [
    /* @__PURE__ */ b.jsx("span", { className: ls, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ b.jsxs("div", { className: Am, children: [
      /* @__PURE__ */ b.jsx("div", { className: zm, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = mb(p, r.fps) === r.framesPerClip;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: Yw(m),
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
      }) : /* @__PURE__ */ b.jsxs("span", { className: Om, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ b.jsxs("div", { className: Uw, children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: Vw,
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
        /* @__PURE__ */ b.jsx("span", { className: qw, children: "sec" })
      ] }),
      /* @__PURE__ */ b.jsxs("span", { className: Ih, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        r.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("output", { className: $w, "aria-live": "polite", children: C3(e) })
  ] });
}
var WO = "_17owg2e0", ej = "_17owg2e1", tj = "_17owg2e2", zu = "_17owg2e3", Ou = "_17owg2e4", nj = "_17owg2e5", aj = "_17owg2e6", ij = "_17owg2e7", rj = "_17owg2e8";
function fh() {
  return /* @__PURE__ */ b.jsx("span", { className: nj, "aria-hidden": "true" });
}
function lj({ presets: e }) {
  const { presetId: a, params: r } = bn(), l = _.useMemo(() => jm(e), [e]), s = Ml(r), u = Rc(a, r), c = u ? 1 : r.num_clips ?? 1, d = u ? s.framesPerClip : Sw(c, s), p = s.fps > 0 ? d / s.fps : 0, m = r.interpolate_fps ?? 0, y = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, v = typeof r.upscale_factor == "number" ? r.upscale_factor : 0, x = v > 0 ? v : 1, S = (r.width ?? 0) * x, N = (r.height ?? 0) * x, C = Lm(r, l), R = C === Tc || (l.find((E) => E.id === C)?.stepsDown ?? 0) >= 2, z = [ij, R ? rj : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: WO, children: [
    /* @__PURE__ */ b.jsx("span", { className: ej, children: "Output" }),
    /* @__PURE__ */ b.jsxs("div", { className: tj, children: [
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: zu, children: g }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Ou, children: "frames" })
      ] }),
      /* @__PURE__ */ b.jsx(fh, {}),
      /* @__PURE__ */ b.jsxs("span", { className: zu, children: [
        S,
        "×",
        N
      ] }),
      /* @__PURE__ */ b.jsx(fh, {}),
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: zu, children: y }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Ou, children: "fps" })
      ] }),
      /* @__PURE__ */ b.jsx(fh, {}),
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: Ou, children: "~" }),
        /* @__PURE__ */ b.jsx("span", { className: zu, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Ou, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("span", { className: aj, children: [
      /* @__PURE__ */ b.jsx("span", { className: z, "aria-hidden": "true" }),
      R ? "off-distribution" : "ready"
    ] })
  ] });
}
var oj = "dgx4n20", sj = "dgx4n21", uj = "dgx4n22", cj = "dgx4n23", fj = "dgx4n24", dj = "dgx4n25", hj = "dgx4n26", mj = "dgx4n27", pj = "dgx4n28", gj = "dgx4n29", yj = "dgx4n2a", vj = "dgx4n2b", Lb = "dgx4n2c", bj = "dgx4n2d", xj = "dgx4n2e";
function wj(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function Sj({
  presets: e,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = _.useState(!1), u = _.useMemo(() => L3(e), [e]), c = _.useMemo(() => {
    const v = u.legacy.filter((S) => S.id === a), x = l ? u.legacy : v;
    return [...u.featured, ...x];
  }, [u, l, a]), d = _.useRef([]), p = _.useCallback(
    (v) => {
      const x = c[v];
      x && (d.current[v]?.focus(), r(x));
    },
    [c, r]
  ), m = _.useCallback(
    (v, x) => {
      const S = c.length - 1;
      switch (v.key) {
        case "ArrowRight":
        case "ArrowDown":
          v.preventDefault(), p(x === S ? 0 : x + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          v.preventDefault(), p(x === 0 ? S : x - 1);
          break;
        case "Home":
          v.preventDefault(), p(0);
          break;
        case "End":
          v.preventDefault(), p(S);
          break;
      }
    },
    [c, p]
  );
  if (e.length === 0)
    return /* @__PURE__ */ b.jsx(
      lc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((v) => v.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ b.jsxs("div", { className: yj, children: [
    /* @__PURE__ */ b.jsx("div", { className: oj, role: "radiogroup", "aria-label": "Render presets", children: c.map((v, x) => {
      const S = O3(v), N = v.id === a, C = v.id === Fo, R = [
        sj,
        v.legacy ? "" : uj,
        C ? cj : "",
        N ? fj : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ b.jsxs(
        "button",
        {
          ref: (z) => {
            d.current[x] = z;
          },
          type: "button",
          role: "radio",
          "aria-checked": N,
          tabIndex: x === y ? 0 : -1,
          title: v.description,
          className: R,
          onClick: () => r(v),
          onKeyDown: (z) => m(z, x),
          children: [
            /* @__PURE__ */ b.jsxs("div", { className: hj, children: [
              /* @__PURE__ */ b.jsx("span", { className: mj, children: v.label }),
              C && /* @__PURE__ */ b.jsx(An, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ b.jsx("span", { className: dj, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
                /* @__PURE__ */ b.jsx("title", { children: "selected" }),
                /* @__PURE__ */ b.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
                /* @__PURE__ */ b.jsx(
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
            /* @__PURE__ */ b.jsx("span", { className: pj, children: wj(v.description) }),
            /* @__PURE__ */ b.jsxs("div", { className: gj, children: [
              /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: S.resolution }),
              /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: S.duration }),
              /* @__PURE__ */ b.jsx(An, { tone: S.isLowVram ? "success" : "neutral", children: S.vram }),
              S.isOffDistribution && /* @__PURE__ */ b.jsx(An, { tone: "warning", children: "off-distribution" }),
              S.requiresLastImage && /* @__PURE__ */ b.jsx(An, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        v.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ b.jsxs("div", { className: vj, children: [
      /* @__PURE__ */ b.jsx("span", { className: Lb, "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: bj,
          "aria-expanded": l,
          onClick: () => s((v) => !v),
          children: [
            /* @__PURE__ */ b.jsx("span", { className: xj, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Lb, "aria-hidden": "true" })
    ] })
  ] });
}
var Ej = "_1ntn2zv0", _j = "_1ntn2zv1", Nj = "_1ntn2zv2", Cj = "_1ntn2zv3", Rj = "_1ntn2zv4", Tj = "_1ntn2zv5", Hb = "_1ntn2zv6", Mj = "_1ntn2zv7", Dj = "_1ntn2zv8", Aj = "_1ntn2zv9", zj = "_1ntn2zva";
function Oj({ error: e, textareaId: a }) {
  const { params: r, setPrompts: l } = bn(), [s, u] = _.useState(!1), c = r.prompts ?? [""], d = _.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), p = _.useMemo(
    () => c.slice(d).filter((v) => v.trim().length > 0).length,
    [c, d]
  ), m = (v) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = v, l(x);
  }, y = (v, x) => {
    const S = Math.max(d, c.length, v + 1), N = Array.from({ length: S }, (C, R) => c[R] ?? "");
    N[v] = x, l(N);
  }, g = (v) => {
    if (u(v), v) {
      const x = c[0] ?? "", S = Math.max(d, c.length);
      l(Array.from({ length: S }, (N, C) => c[C] ?? x));
    }
  };
  return /* @__PURE__ */ b.jsxs("div", { className: Ej, children: [
    /* @__PURE__ */ b.jsx("div", { className: _j, children: /* @__PURE__ */ b.jsxs("span", { className: Nj, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: Cj,
          onClick: () => g(!s),
          children: /* @__PURE__ */ b.jsx("span", { className: Rj, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (v, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ b.jsxs("div", { className: Mj, children: [
        /* @__PURE__ */ b.jsxs("span", { className: Dj, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ b.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: Hb,
            "aria-label": `prompt for clip ${x + 1}`,
            "aria-invalid": x === 0 && e !== void 0 ? !0 : void 0,
            value: c[x] ?? "",
            onChange: (S) => y(x, S.target.value)
          }
        )
      ] }, `clip-${x}`)
    )) : /* @__PURE__ */ b.jsx(
      "textarea",
      {
        id: a,
        className: Hb,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (v) => m(v.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ b.jsxs("output", { className: Tj, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ b.jsx("p", { className: Aj, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ b.jsx("span", { role: "alert", className: zj, children: e })
  ] });
}
var jj = "_1itrxk30", Lj = "_1itrxk31", Hj = "_1itrxk32", kj = "_1itrxk33", Bj = "_1itrxk34", Uj = "_1itrxk35", Vj = "_1itrxk36", qj = "_1itrxk37";
function $j() {
  const { qwenEdit: e, setQwenEdit: a } = bn();
  return /* @__PURE__ */ b.jsxs("div", { className: jj, children: [
    /* @__PURE__ */ b.jsxs("div", { className: Lj, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: Vj,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ b.jsx("span", { className: qj, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ b.jsxs("span", { className: Hj, children: [
        /* @__PURE__ */ b.jsx("span", { className: kj, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ b.jsx("span", { className: Bj, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: Uj,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var Yj = "ob7g5b0", Ij = "ob7g5b1", Gj = "ob7g5b3", Xj = "ob7g5b4", Fj = "ob7g5b5", Zj = "ob7g5b6", Qj = "ob7g5b7", Pj = "ob7g5b8", Kj = "ob7g5b9", Jj = "ob7g5ba";
function Wj({
  src: e,
  poster: a,
  fpsLabel: r,
  controls: l = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: d,
  className: p,
  emptyContent: m,
  onEnded: y,
  onReady: g,
  onError: v
}) {
  const [x, S] = _.useState("loading"), [N, C] = _.useState(null), R = _.useCallback(() => {
    S("ready"), g?.();
  }, [g]), z = _.useCallback(
    (O) => {
      const k = O.target, B = k.error?.message || `media error code ${k.error?.code ?? "?"}`;
      S("error"), C(B), v?.(new Error(B));
    },
    [v]
  ), E = [Yj, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ b.jsx("div", { className: E, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ b.jsxs("div", { className: Qj, children: [
    /* @__PURE__ */ b.jsx("div", { className: Pj, children: "Could not play video" }),
    /* @__PURE__ */ b.jsx("div", { className: Kj, children: N ?? "unknown error" }),
    /* @__PURE__ */ b.jsx("a", { className: Jj, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ b.jsxs("div", { className: E, children: [
    x === "loading" && /* @__PURE__ */ b.jsx("div", { className: Gj, "aria-hidden": "true", children: /* @__PURE__ */ b.jsx("div", { className: Xj }) }),
    r && /* @__PURE__ */ b.jsx("span", { className: Fj, children: r }),
    /* @__PURE__ */ b.jsx(
      "video",
      {
        className: Ij,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: R,
        onEnded: y,
        onError: z,
        children: /* @__PURE__ */ b.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ b.jsx("div", { className: E, "aria-label": d ?? "no video", children: /* @__PURE__ */ b.jsx("div", { className: Zj, children: m ?? "No video to display yet." }) });
}
const oi = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, kb = {
  [oi.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [oi.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [oi.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [oi.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [oi.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [oi.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [oi.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [oi.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [oi.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function e6(e, a) {
  return e !== null && kb[e] ? kb[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function t6(e) {
  return e ? `${hc}/media?path=${encodeURIComponent(e)}` : null;
}
var ju = "_1ojc56g0", n6 = "_1ojc56g1", a6 = "_1ojc56g2", i6 = "_1ojc56g3", r6 = "_1ojc56g4", l6 = "_1ojc56g5", o6 = "_1ojc56g6", s6 = "_1ojc56g7", u6 = "_1ojc56g8", Lu = "_1ojc56g9", c6 = "_1ojc56ga", f6 = "_1ojc56gb", d6 = "_1ojc56gc", h6 = "_1ojc56gd", m6 = "_1ojc56ge", p6 = "_1ojc56gf", g6 = "_1ojc56gg", y6 = "_1ojc56gh", v6 = "_51y2ql0", b6 = "_51y2ql1", x6 = "_51y2ql2", w6 = "_51y2ql3", S6 = "_51y2ql4", dh = "_51y2ql5", E6 = "_51y2ql6", _6 = "_51y2ql7 _51y2ql6", N6 = "_51y2ql8 _51y2ql6", C6 = "_51y2ql9", R6 = "_51y2qla", T6 = "_51y2qlb", M6 = "_51y2qlc", D6 = "_51y2qld";
const yn = 60, aa = 62, vn = 46, A6 = 180, Lo = 75, Xu = 45, z6 = [0, 0.25, 0.5, 0.75, 1];
function O6(e) {
  const a = Math.PI * (1 - e), r = Math.cos(a), l = Math.sin(a);
  return {
    x1: yn + r * (vn - 9),
    y1: aa - l * (vn - 9),
    x2: yn + r * (vn - 14),
    y2: aa - l * (vn - 14)
  };
}
function j6(e) {
  const a = Lo - Xu, r = (Lo - e) / a;
  return Math.min(1, Math.max(0.02, r));
}
function L6(e) {
  return e >= 0.55 ? E6 : e >= 0.25 ? _6 : N6;
}
function H6({ secondsPerStep: e }) {
  const a = e !== null && e > 0, r = a ? j6(e) : 0, l = A6 * r, s = a ? e.toFixed(1) : "—";
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: v6,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": Xu,
      "aria-valuemax": Lo,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ b.jsx("span", { className: b6, children: "Speed" }),
        /* @__PURE__ */ b.jsxs("svg", { className: x6, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ b.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ b.jsx(
            "path",
            {
              className: w6,
              d: `M ${yn - vn} ${aa} A ${vn} ${vn} 0 0 1 ${yn + vn} ${aa}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          z6.map((u) => {
            const c = O6(u);
            return /* @__PURE__ */ b.jsx(
              "line",
              {
                className: S6,
                strokeWidth: 1.4,
                x1: c.x1,
                y1: c.y1,
                x2: c.x2,
                y2: c.y2
              },
              u
            );
          }),
          /* @__PURE__ */ b.jsx("text", { className: dh, x: yn - vn, y: aa + 12, fontSize: 6, textAnchor: "middle", children: Lo }),
          /* @__PURE__ */ b.jsx("text", { className: dh, x: yn, y: 9, fontSize: 6, textAnchor: "middle", children: (Lo + Xu) / 2 }),
          /* @__PURE__ */ b.jsx("text", { className: dh, x: yn + vn, y: aa + 12, fontSize: 6, textAnchor: "middle", children: Xu }),
          a && /* @__PURE__ */ b.jsx(
            "path",
            {
              className: L6(r),
              d: `M ${yn - vn} ${aa} A ${vn} ${vn} 0 0 1 ${yn + vn} ${aa}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, r * 100)} 100`
            }
          ),
          /* @__PURE__ */ b.jsx(
            "g",
            {
              className: C6,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${yn}px ${aa}px`
              },
              children: /* @__PURE__ */ b.jsx(
                "line",
                {
                  className: R6,
                  strokeWidth: 2.4,
                  x1: yn,
                  y1: aa,
                  x2: yn - vn + 16,
                  y2: aa
                }
              )
            }
          ),
          /* @__PURE__ */ b.jsx("circle", { className: T6, cx: yn, cy: aa, r: 3.6 }),
          /* @__PURE__ */ b.jsx("text", { className: M6, x: yn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ b.jsx("text", { className: D6, x: yn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] })
      ]
    }
  );
}
function k6({ state: e, onCancel: a, onReset: r }) {
  const [l, s] = _.useState(!1);
  _.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = _.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ b.jsx(
      lc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = e6(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ b.jsxs("div", { className: ju, children: [
      /* @__PURE__ */ b.jsxs("div", { className: p6, role: "alert", children: [
        /* @__PURE__ */ b.jsx("span", { className: g6, children: m.title }),
        /* @__PURE__ */ b.jsx("span", { className: y6, children: m.hint })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: Lu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ b.jsxs("div", { className: ju, children: [
      /* @__PURE__ */ b.jsx(lc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ b.jsx("div", { className: Lu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ b.jsxs("output", { className: ju, children: [
      /* @__PURE__ */ b.jsx(
        Wj,
        {
          src: t6(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ b.jsx(q6, { state: e }),
      /* @__PURE__ */ b.jsx("div", { className: Lu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ b.jsxs("div", { className: ju, children: [
    /* @__PURE__ */ b.jsx("output", { className: n6, "aria-live": "polite", children: V6(e) }),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        className: s6,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ b.jsx(
          "div",
          {
            className: u6,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ b.jsx("output", { className: m6, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ b.jsxs("div", { className: a6, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx(H6, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ b.jsxs("div", { className: i6, children: [
        /* @__PURE__ */ b.jsx(Ro, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ b.jsx(
          Ro,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ b.jsx(
          Ro,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ b.jsx(Ro, { label: "ETA", value: B6(v3(e)) }),
        /* @__PURE__ */ b.jsx(
          Ro,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("div", { className: Lu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function B6(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), r = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return r > 0 ? `${r}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const U6 = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading Wan2.2 diffusion experts (~28 GiB)…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function V6(e) {
  if (!e.stage) return "Starting worker…";
  const a = U6[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function Ro({ label: e, value: a }) {
  return /* @__PURE__ */ b.jsxs("div", { className: r6, children: [
    /* @__PURE__ */ b.jsx("span", { className: l6, children: e }),
    /* @__PURE__ */ b.jsx("span", { className: o6, children: a })
  ] });
}
function q6({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && r.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && r.push(["Output", e.outputPath]), r.length === 0 ? null : /* @__PURE__ */ b.jsx("div", { className: c6, children: r.map(([l, s]) => /* @__PURE__ */ b.jsxs("div", { className: f6, children: [
    /* @__PURE__ */ b.jsx("span", { className: d6, children: l }),
    /* @__PURE__ */ b.jsx("span", { className: h6, children: s })
  ] }, l)) });
}
function $6() {
  return /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("title", { children: "selected" }),
    /* @__PURE__ */ b.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ b.jsx(
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
function Y6({ presets: e }) {
  const { params: a, updateParam: r } = bn(), l = _.useMemo(() => jm(e), [e]);
  if (l.length === 0) return null;
  const s = Lm(a, l);
  return /* @__PURE__ */ b.jsxs("div", { className: rs, children: [
    /* @__PURE__ */ b.jsx("span", { className: ls, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ b.jsx("div", { className: Qz, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: l.map((u) => {
      const c = s === u.id, d = [Pz, c ? Kz : ""].filter(Boolean).join(" "), p = [eO, c ? tO : ""].filter(Boolean).join(" ");
      return /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": c,
          className: d,
          onClick: () => {
            r("width", u.width), r("height", u.height);
          },
          children: [
            /* @__PURE__ */ b.jsxs("span", { className: Jz, children: [
              /* @__PURE__ */ b.jsxs("span", { className: Wz, children: [
                u.width,
                "×",
                u.height
              ] }),
              /* @__PURE__ */ b.jsx("span", { className: p, children: /* @__PURE__ */ b.jsx($6, {}) })
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: nO, children: u.label }),
            /* @__PURE__ */ b.jsx("span", { className: aO, children: u.sub }),
            u.stepsDown > 0 && /* @__PURE__ */ b.jsx(
              "span",
              {
                className: u.stepsDown >= 2 ? rO : iO,
                children: u.stepsDown >= 2 ? "off-distribution" : "below native"
              }
            )
          ]
        },
        u.id
      );
    }) }),
    s === Tc && /* @__PURE__ */ b.jsx("div", { className: uO, children: /* @__PURE__ */ b.jsxs(An, { tone: "warning", children: [
      "custom ",
      a.width,
      "×",
      a.height
    ] }) })
  ] });
}
var I6 = "_1hbttwg0", G6 = "_1hbttwg1", X6 = "_1hbttwg2", F6 = "_1hbttwg3", Iw = "_1hbttwg4", Z6 = "_1hbttwg5", Q6 = "_1hbttwg7 _1hbttwg6", P6 = "_1hbttwg8 _1hbttwg6", Bb = "_1hbttwg9", K6 = "_1hbttwga", J6 = "_1hbttwgb", W6 = "_1hbttwgc", eL = "_1hbttwgd";
function tL({
  spec: e,
  value: a,
  error: r,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = _.useId(), d = `${c}-help`, p = r ? `${c}-error` : d;
  return /* @__PURE__ */ b.jsxs("div", { className: I6, title: s ? u : void 0, children: [
    /* @__PURE__ */ b.jsxs("div", { className: G6, children: [
      /* @__PURE__ */ b.jsx("label", { className: X6, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ b.jsx("span", { className: F6, children: aL(a, e.step) })
    ] }),
    nL(e, a, l, c, p, r !== void 0, s),
    /* @__PURE__ */ b.jsx("span", { id: d, className: Iw, children: s && u ? u : e.help }),
    r && /* @__PURE__ */ b.jsx("span", { id: `${c}-error`, role: "alert", className: Z6, children: r })
  ] });
}
function nL(e, a, r, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ b.jsxs("div", { className: J6, children: [
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: W6,
            onClick: () => r(!d),
            children: /* @__PURE__ */ b.jsx("span", { className: eL, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ b.jsx("span", { className: Iw, children: d ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ b.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [P6, u ? Bb : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => r(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ b.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = Ub(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ b.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: K6,
          style: g,
          min: e.min,
          max: e.max,
          step: e.step,
          value: d,
          onChange: (v) => r(Number(v.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ b.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [Q6, u ? Bb : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: Ub(a, e),
          onChange: (d) => r(Number(d.target.value))
        }
      );
  }
}
function Ub(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function aL(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var iL = "_1f0q5gf0", rL = "_1f0q5gf1", lL = "_1f0q5gf2", oL = "_1f0q5gf3", sL = "_1f0q5gf4", uL = "_1f0q5gf5", cL = "_1f0q5gf6", fL = "_1f0q5gf7", dL = "_1f0q5gf8", hL = "_1f0q5gf9", mL = "_1f0q5gfa", pL = "_1f0q5gfb", gL = "_1f0q5gfc";
function yL({
  title: e,
  description: a,
  badge: r,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = _.useId(), [m, y] = _.useState(u ? s : !1), g = [iL, c].filter(Boolean).join(" "), v = [lL, m ? oL : ""].filter(Boolean).join(" "), x = !u || !m;
  return /* @__PURE__ */ b.jsxs("section", { className: g, children: [
    /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        className: rL,
        "aria-expanded": x,
        "aria-controls": p,
        disabled: !u,
        onClick: () => u && y((S) => !S),
        children: [
          u && /* @__PURE__ */ b.jsx("span", { className: v, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ b.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ b.jsx(
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
          /* @__PURE__ */ b.jsxs("span", { className: sL, children: [
            /* @__PURE__ */ b.jsx("span", { className: uL, children: e }),
            a && /* @__PURE__ */ b.jsx("span", { className: cL, children: a })
          ] }),
          (l || r) && /* @__PURE__ */ b.jsxs("span", { className: fL, children: [
            l && /* @__PURE__ */ b.jsx("span", { className: dL, children: l }),
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        id: p,
        className: [hL, x ? mL : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ b.jsx("div", { className: pL, children: /* @__PURE__ */ b.jsx("div", { className: gL, children: d }) })
      }
    )
  ] });
}
const vL = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function Vb(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function bL(e) {
  return Cc.find((a) => a.key === e)?.default;
}
function ul(e, a) {
  const r = e[a];
  if (typeof r == "number" && Number.isFinite(r)) return r;
  const l = bL(a);
  return typeof l == "number" ? l : 0;
}
function xL(e, a) {
  if (e === "core") {
    const r = ul(a, "fps"), l = ul(a, "interpolate_fps"), s = l > 0 ? l : r, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = vL[u] ?? u, d = ul(a, "upscale_factor"), p = `${r} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const r = ul(a, "num_inference_steps"), l = ul(a, "cfg_scale"), s = ul(a, "sigma_shift");
    return `${r} steps · CFG ${Vb(l)} · shift ${Vb(s)}`;
  }
  return null;
}
var wL = "kn07ek0", SL = "kn07ek1";
const EL = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function _L({ issues: e }) {
  const { presetId: a, params: r, updateParam: l } = bn(), s = Rc(a, r), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ b.jsx("div", { className: wL, children: xw.map((c) => {
    const d = x3(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ b.jsx(
      yL,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: xL(c.id, r),
        badge: c.defaultCollapsed ? /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ b.jsx("div", { className: SL, children: d.map((p) => {
          const m = s ? EL[p.key] : void 0;
          return /* @__PURE__ */ b.jsx(
            tL,
            {
              spec: p,
              value: r[p.key],
              error: u(p.key),
              disabled: m !== void 0,
              disabledReason: m,
              onChange: (y) => l(p.key, y)
            },
            p.key
          );
        }) })
      },
      c.id
    );
  }) });
}
var NL = "_1w9jfpf0", CL = "_1w9jfpf1", RL = "_1w9jfpf2", TL = "_1w9jfpf3", ML = "_1w9jfpf4", DL = "_1w9jfpf5";
const Gh = "svi2-anchor-panel", Gw = "svi2-prompt-input";
function AL() {
  const {
    presetId: e,
    presetApplied: a,
    params: r,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d
  } = bn(), { issues: p, blocked: m, busy: y, submit: g, cancel: v, focusRequest: x } = Mw();
  OL(x);
  const S = Yh("svi2/presets", A1), N = Yh("svi2/history", () => H3(25)), C = S.data?.presets ?? [];
  _.useEffect(() => {
    if (a || C.length === 0) return;
    const te = C.find(($) => $.id === e) ?? C[0];
    te && s(te);
  }, [a, C, e, s]);
  const R = N.data?.jobs ?? [], z = r.mode ?? "image_to_video", E = z !== "text_to_video", O = Tm(e, r), k = p.find((te) => te.field === "ref_image_path")?.message, B = p.find((te) => te.field === "last_image_path")?.message, V = p.find((te) => te.field === "prompts")?.message, A = p.find(
    (te) => te.field === "width" && te.severity === "warning"
  )?.message, Y = _.useCallback(
    (te) => {
      d(te);
    },
    [d]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: NL, children: [
    /* @__PURE__ */ b.jsxs("div", { className: CL, children: [
      /* @__PURE__ */ b.jsx(
        Oa,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ b.jsx(Sj, { presets: C, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ b.jsx(
        Oa,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: /* @__PURE__ */ b.jsx(jO, { value: z, onChange: u })
        }
      ),
      /* @__PURE__ */ b.jsx("div", { id: Gh, children: /* @__PURE__ */ b.jsx(
        Oa,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ b.jsx(
            Uz,
            {
              refImageRequired: E,
              lastImageRequired: O,
              refError: k,
              lastError: B
            }
          )
        }
      ) }),
      /* @__PURE__ */ b.jsx(Oa, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ b.jsx(Oj, { error: V, textareaId: Gw }) }),
      /* @__PURE__ */ b.jsx(Oa, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ b.jsx($j, {}) }),
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            /* @__PURE__ */ b.jsx("span", { className: ML, children: "Inference · Parameters" }),
            "Parameters"
          ] }),
          description: "Grouped by tier. Advanced tiers stay collapsed.",
          actions: /* @__PURE__ */ b.jsx(
            Ha,
            {
              variant: "secondary",
              size: "sm",
              title: "Re-apply the active preset's defaults",
              onClick: () => {
                const te = C.find(($) => $.id === e);
                te && s(te);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ b.jsx(MO, { presets: C, warningText: A }),
            /* @__PURE__ */ b.jsxs("div", { className: DL, children: [
              /* @__PURE__ */ b.jsx(PO, {}),
              /* @__PURE__ */ b.jsx(Y6, { presets: C }),
              /* @__PURE__ */ b.jsx(cO, {})
            ] }),
            /* @__PURE__ */ b.jsx(_L, { issues: p }),
            /* @__PURE__ */ b.jsx(lj, { presets: C })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: RL, children: [
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: "Render",
          description: y ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ b.jsx(k6, { state: l, onCancel: v, onReset: c }),
            !y && /* @__PURE__ */ b.jsx("div", { className: TL, children: /* @__PURE__ */ b.jsx(
              Ha,
              {
                variant: "primary",
                disabled: m,
                title: m ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void g(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ b.jsx(Oa, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ b.jsx(XO, { jobs: R, onOpen: Y }) })
    ] })
  ] });
}
const zL = {
  ref_image_path: Gh,
  last_image_path: Gh,
  prompts: Gw
};
function OL(e) {
  _.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = zL[e.field];
    if (a) {
      const l = document.getElementById(a);
      qb(l);
      return;
    }
    jL(e.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      qb(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [e]);
}
function jL(e) {
  const a = Cc.find((s) => s.key === e);
  if (!a) return;
  const r = xw.find((s) => s.id === a.tier);
  if (!r) return;
  const l = document.querySelectorAll(
    'button[aria-expanded="false"][aria-controls]'
  );
  for (const s of l)
    if (s.textContent?.includes(r.title)) {
      s.click();
      return;
    }
}
function qb(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var LL = "_1smvon90", dr = "_1smvon91", hr = "_1smvon92", mr = "_1smvon93", Hu = "_1smvon94", hh = "_1smvon95 _1smvon94", HL = "_1smvon96", kL = "_1smvon97";
const BL = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function UL() {
  const { settings: e, setSettings: a } = bn(), [r, l] = _.useState(e), [s, u] = _.useState(!1), c = _.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== e[m]
    ),
    [r, e]
  ), d = (m, y) => {
    l((g) => ({ ...g, [m]: y }));
  }, p = async () => {
    u(!0);
    try {
      const m = await z1(r);
      a(m), l(m), br.success("Settings saved. Applied to new renders.");
    } catch {
      br.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ b.jsxs(
    Oa,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: LL, children: [
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Models directory" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Hu,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => d("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Output directory" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Hu,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => d("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ b.jsx(
              "select",
              {
                className: hh,
                value: r.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: DN.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ b.jsx(
              "select",
              {
                className: hh,
                value: r.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: AN.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Blocks to swap" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Hu,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (m) => d("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Interpolation method" }),
            /* @__PURE__ */ b.jsx(
              "select",
              {
                className: hh,
                value: r.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: BL.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Interpolate target fps" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Hu,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (m) => d("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ b.jsxs("div", { className: HL, children: [
          /* @__PURE__ */ b.jsx(Ha, { loading: s, disabled: !c, onClick: () => void p(), children: "Save settings" }),
          /* @__PURE__ */ b.jsx(
            Ha,
            {
              variant: "secondary",
              onClick: () => l(e),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ b.jsx("output", { className: kL, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var VL = "_1ugwva20", qL = "_1ugwva21", $L = "_1ugwva22", YL = "_1ugwva23", IL = "_1ugwva24", GL = "_1ugwva25";
function XL() {
  const e = k2(), a = FL(e.catalog?.presets ?? []);
  return /* @__PURE__ */ b.jsxs(I3, { initialSettings: e.settings, initialPreset: a, children: [
    /* @__PURE__ */ b.jsxs("div", { className: VL, children: [
      /* @__PURE__ */ b.jsx("header", { className: qL, children: /* @__PURE__ */ b.jsxs("div", { className: $L, children: [
        /* @__PURE__ */ b.jsx("h1", { className: YL, children: "SVI 2.0 Pro" }),
        /* @__PURE__ */ b.jsx("p", { className: IL, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
      ] }) }),
      /* @__PURE__ */ b.jsx("main", { className: GL, children: /* @__PURE__ */ b.jsx(P2, {}) })
    ] }),
    /* @__PURE__ */ b.jsx(y5, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function FL(e) {
  return e.find((a) => a.id === Fo) ?? e[0] ?? null;
}
async function ZL() {
  const [e, a] = await Promise.all([
    A1().catch(() => null),
    jN().catch(() => D1)
  ]);
  return { catalog: e, settings: a };
}
function QL() {
  return [
    {
      path: "/",
      loader: () => zy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: ZL,
      Component: XL,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => zy(`/${PL(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: AL },
        { path: "dag", Component: Q5 },
        { path: "settings", Component: UL }
      ]
    }
  ];
}
function PL(e, a) {
  const r = e[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const $b = "ext-actions-request", KL = "ext-actions-declare", JL = "ext-action-state", Yb = "ext-action-invoke", Ib = "svi2-pro:navigate", Gb = "svi2-pro.render";
function WL(e, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: Gb,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(KL, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(JL, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === Gb && v5();
  }, y = w5((g) => {
    r = g.busy, l = g.blocked, d();
  });
  return e.addEventListener($b, p), e.addEventListener(Yb, m), c(), {
    dispose: () => {
      y(), e.removeEventListener($b, p), e.removeEventListener(Yb, m);
    }
  };
}
const Xh = "svi2-pro-app", e8 = "ext-event", Xb = "svi2-pro-stylesheet", Fb = ["accent", "density", "card"];
function t8(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function n8() {
  if (typeof document > "u" || document.getElementById(Xb)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = Xb, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
n8();
class a8 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  actionBridge = null;
  actionBridgeDeploymentId = null;
  router = null;
  navigateListener = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = o_.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Ib, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = WL(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(Ib, a);
  }
  syncTweaksFromBody() {
    for (const a of Fb) {
      const r = t8(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Fb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = G2(QL(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ b.jsx(_.StrictMode, { children: /* @__PURE__ */ b.jsx(F2, { router: r }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const r = this.getAttribute("deployment-id");
    return r && r.length > 0 ? `/${r}/recipe` : "/";
  }
  emitHostEvent(a, r) {
    this.dispatchEvent(
      new CustomEvent(e8, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function i8() {
  typeof customElements > "u" || customElements.get(Xh) || customElements.define(Xh, a8);
}
typeof customElements < "u" && !customElements.get(Xh) && i8();
export {
  i8 as register
};
//# sourceMappingURL=svi2-pro.js.map
