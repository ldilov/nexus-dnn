function N_(e, a) {
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
function im(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Id = { exports: {} }, Eo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ry;
function C_() {
  if (Ry) return Eo;
  Ry = 1;
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
  return Eo.Fragment = a, Eo.jsx = r, Eo.jsxs = r, Eo;
}
var My;
function R_() {
  return My || (My = 1, Id.exports = C_()), Id.exports;
}
var b = R_(), Yd = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ty;
function M_() {
  if (Ty) return Ve;
  Ty = 1;
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
  }, R = Object.assign, N = {};
  function C(D, H, P) {
    this.props = D, this.context = H, this.refs = N, this.updater = P || S;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(D, H) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, H, "setState");
  }, C.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function z() {
  }
  z.prototype = C.prototype;
  function E(D, H, P) {
    this.props = D, this.context = H, this.refs = N, this.updater = P || S;
  }
  var O = E.prototype = new z();
  O.constructor = E, R(O, C.prototype), O.isPureReactComponent = !0;
  var k = Array.isArray;
  function B() {
  }
  var V = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function I(D, H, P) {
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
    return I(D.type, H, D.props);
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
  function Y(D) {
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
  function M(D, H, P, ne, se) {
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
              return me = D._init, M(
                me(D._payload),
                H,
                P,
                ne,
                se
              );
          }
      }
    if (me)
      return se = se(D), me = ne === "" ? "." + j(D, 0) : ne, k(se) ? (P = "", me != null && (P = me.replace(le, "$&/") + "/"), M(se, H, P, "", function(ze) {
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
        ne = D[ge], he = ee + j(ne, ge), me += M(
          ne,
          H,
          P,
          he,
          se
        );
    else if (ge = x(D), typeof ge == "function")
      for (D = ge.call(D), ge = 0; !(ne = D.next()).done; )
        ne = ne.value, he = ee + j(ne, ge++), me += M(
          ne,
          H,
          P,
          he,
          se
        );
    else if (he === "object") {
      if (typeof D.then == "function")
        return M(
          Y(D),
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
    return M(D, ne, "", "", function(he) {
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
  return Ve.Activity = g, Ve.Children = Z, Ve.Component = C, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = l, Ve.Suspense = p, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
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
    var ne = R({}, D.props), se = D.key;
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
    return I(D.type, se, ne);
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
    return I(D, he, se);
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
var Dy;
function Wo() {
  return Dy || (Dy = 1, Yd.exports = M_()), Yd.exports;
}
var _ = Wo();
const ye = /* @__PURE__ */ im(_), T_ = /* @__PURE__ */ N_({
  __proto__: null,
  default: ye
}, [_]);
var Gd = { exports: {} }, _o = {}, Xd = { exports: {} }, Fd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ay;
function D_() {
  return Ay || (Ay = 1, (function(e) {
    function a(M, L) {
      var F = M.length;
      M.push(L);
      e: for (; 0 < F; ) {
        var G = F - 1 >>> 1, Z = M[G];
        if (0 < s(Z, L))
          M[G] = L, M[F] = Z, F = G;
        else break e;
      }
    }
    function r(M) {
      return M.length === 0 ? null : M[0];
    }
    function l(M) {
      if (M.length === 0) return null;
      var L = M[0], F = M.pop();
      if (F !== L) {
        M[0] = F;
        e: for (var G = 0, Z = M.length, D = Z >>> 1; G < D; ) {
          var H = 2 * (G + 1) - 1, P = M[H], ne = H + 1, se = M[ne];
          if (0 > s(P, F))
            ne < Z && 0 > s(se, P) ? (M[G] = se, M[ne] = F, G = ne) : (M[G] = P, M[H] = F, G = H);
          else if (ne < Z && 0 > s(se, F))
            M[G] = se, M[ne] = F, G = ne;
          else break e;
        }
      }
      return L;
    }
    function s(M, L) {
      var F = M.sortIndex - L.sortIndex;
      return F !== 0 ? F : M.id - L.id;
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
    var p = [], m = [], y = 1, g = null, v = 3, x = !1, S = !1, R = !1, N = !1, C = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function O(M) {
      for (var L = r(m); L !== null; ) {
        if (L.callback === null) l(m);
        else if (L.startTime <= M)
          l(m), L.sortIndex = L.expirationTime, a(p, L);
        else break;
        L = r(m);
      }
    }
    function k(M) {
      if (R = !1, O(M), !S)
        if (r(p) !== null)
          S = !0, B || (B = !0, K());
        else {
          var L = r(m);
          L !== null && Y(k, L.startTime - M);
        }
    }
    var B = !1, V = -1, A = 5, I = -1;
    function te() {
      return N ? !0 : !(e.unstable_now() - I < A);
    }
    function $() {
      if (N = !1, B) {
        var M = e.unstable_now();
        I = M;
        var L = !0;
        try {
          e: {
            S = !1, R && (R = !1, z(V), V = -1), x = !0;
            var F = v;
            try {
              t: {
                for (O(M), g = r(p); g !== null && !(g.expirationTime > M && te()); ) {
                  var G = g.callback;
                  if (typeof G == "function") {
                    g.callback = null, v = g.priorityLevel;
                    var Z = G(
                      g.expirationTime <= M
                    );
                    if (M = e.unstable_now(), typeof Z == "function") {
                      g.callback = Z, O(M), L = !0;
                      break t;
                    }
                    g === r(p) && l(p), O(M);
                  } else l(p);
                  g = r(p);
                }
                if (g !== null) L = !0;
                else {
                  var D = r(m);
                  D !== null && Y(
                    k,
                    D.startTime - M
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
        C($, 0);
      };
    function Y(M, L) {
      V = C(function() {
        M(e.unstable_now());
      }, L);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(M) {
      M.callback = null;
    }, e.unstable_forceFrameRate = function(M) {
      0 > M || 125 < M ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < M ? Math.floor(1e3 / M) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, e.unstable_next = function(M) {
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
        return M();
      } finally {
        v = F;
      }
    }, e.unstable_requestPaint = function() {
      N = !0;
    }, e.unstable_runWithPriority = function(M, L) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var F = v;
      v = M;
      try {
        return L();
      } finally {
        v = F;
      }
    }, e.unstable_scheduleCallback = function(M, L, F) {
      var G = e.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? G + F : G) : F = G, M) {
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
      return Z = F + Z, M = {
        id: y++,
        callback: L,
        priorityLevel: M,
        startTime: F,
        expirationTime: Z,
        sortIndex: -1
      }, F > G ? (M.sortIndex = F, a(m, M), r(p) === null && M === r(m) && (R ? (z(V), V = -1) : R = !0, Y(k, F - G))) : (M.sortIndex = Z, a(p, M), S || x || (S = !0, B || (B = !0, K()))), M;
    }, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(M) {
      var L = v;
      return function() {
        var F = v;
        v = L;
        try {
          return M.apply(this, arguments);
        } finally {
          v = F;
        }
      };
    };
  })(Fd)), Fd;
}
var zy;
function A_() {
  return zy || (zy = 1, Xd.exports = D_()), Xd.exports;
}
var Zd = { exports: {} }, fn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oy;
function z_() {
  if (Oy) return fn;
  Oy = 1;
  var e = Wo();
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
var jy;
function m1() {
  if (jy) return Zd.exports;
  jy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Zd.exports = z_(), Zd.exports;
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
var Ly;
function O_() {
  if (Ly) return _o;
  Ly = 1;
  var e = A_(), a = Wo(), r = m1();
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
        for (var w = !1, T = f.child; T; ) {
          if (T === i) {
            w = !0, i = f, o = h;
            break;
          }
          if (T === o) {
            w = !0, o = f, i = h;
            break;
          }
          T = T.sibling;
        }
        if (!w) {
          for (T = h.child; T; ) {
            if (T === i) {
              w = !0, i = h, o = f;
              break;
            }
            if (T === o) {
              w = !0, o = h, i = f;
              break;
            }
            T = T.sibling;
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
  var g = Object.assign, v = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), E = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
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
      case R:
        return "Fragment";
      case C:
        return "Profiler";
      case N:
        return "StrictMode";
      case k:
        return "Suspense";
      case B:
        return "SuspenseList";
      case I:
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
  var Y = Array.isArray, M = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
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
        t = (t = n.documentElement) && (t = t.namespaceURI) ? P0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = P0(n), t = K0(n, t);
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
    var n = ne.current, i = K0(n, t.type);
    n !== i && (P(se, t), P(ne, i));
  }
  function Re(t) {
    se.current === t && (H(ne), H(se)), me.current === t && (H(me), bo._currentValue = F);
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
      var h = o.DetermineComponentFrameRoot(), w = h[0], T = h[1];
      if (w && T) {
        var q = w.split(`
`), ie = T.split(`
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
  function Me(t, n) {
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
        n += Me(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var ke = Object.prototype.hasOwnProperty, Ie = e.unstable_scheduleCallback, St = e.unstable_cancelCallback, Je = e.unstable_shouldYield, Ze = e.unstable_requestPaint, Qe = e.unstable_now, gt = e.unstable_getCurrentPriorityLevel, yt = e.unstable_ImmediatePriority, Yt = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, mt = e.unstable_LowPriority, ot = e.unstable_IdlePriority, Xn = e.log, xn = e.unstable_setDisableYieldValue, tn = null, Pt = null;
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
  var ua = 256, zn = 262144, Fn = 4194304;
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
    var T = o & 134217727;
    return T !== 0 ? (o = T & ~h, o !== 0 ? f = un(o) : (w &= T, w !== 0 ? f = un(w) : i || (i = T & ~t, i !== 0 && (f = un(i))))) : (T = o & ~h, T !== 0 ? f = un(T) : w !== 0 ? f = un(w) : i || (i = o & ~t, i !== 0 && (f = un(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, i = n & -n, h >= i || h === 32 && (i & 4194048) !== 0) ? n : f;
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
  function pn(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function pt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Kt(t, n, i, o, f, h) {
    var w = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var T = t.entanglements, q = t.expirationTimes, ie = t.hiddenUpdates;
    for (i = w & ~i; 0 < i; ) {
      var ue = 31 - Ut(i), fe = 1 << ue;
      T[ue] = 0, q[ue] = -1;
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
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : xy(t.type));
  }
  function pe(t, n) {
    var i = L.p;
    try {
      return L.p = t, n();
    } finally {
      L.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, we = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Te = "__reactEvents$" + Ee, De = "__reactListeners$" + Ee, Ue = "__reactHandles$" + Ee, je = "__reactResources$" + Ee, Ge = "__reactMarker$" + Ee;
  function rt(t) {
    delete t[ve], delete t[we], delete t[Te], delete t[De], delete t[Ue];
  }
  function Ct(t) {
    var n = t[ve];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = iy(t); t !== null; ) {
            if (i = t[ve]) return i;
            t = iy(t);
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
  var Na = /* @__PURE__ */ new Set(), On = {};
  function cn(t, n) {
    nn(t, n), nn(t + "Capture", n);
  }
  function nn(t, n) {
    for (On[t] = n, t = 0; t < n.length; t++)
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
  function gn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function jn(t, n, i) {
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
      var n = gn(t) ? "checked" : "value";
      t._valueTracker = jn(
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
    return t && (o = gn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
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
  function Qi(t, n, i, o, f, h, w, T) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + bt(n)) : t.value !== "" + bt(n) && (t.value = "" + bt(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? Ol(t, w, bt(n)) : i != null ? Ol(t, w, bt(i)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), T != null && typeof T != "function" && typeof T != "symbol" && typeof T != "boolean" ? t.name = "" + bt(T) : t.removeAttribute("name");
  }
  function Dr(t, n, i, o, f, h, w, T) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || i != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        yi(t);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, T || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = T ? t.checked : !!o, t.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), yi(t);
  }
  function Ol(t, n, i) {
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
  function jl(t, n, i) {
    if (n != null && (n = "" + bt(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + bt(i) : "";
  }
  function Xm(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(l(92));
        if (Y(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = bt(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), yi(t);
  }
  function Ar(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var xS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Fm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || xS.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function Zm(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && Fm(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Fm(t, h, n[h]);
  }
  function Bc(t) {
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
  var wS = /* @__PURE__ */ new Map([
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
  ]), SS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function cs(t) {
    return SS.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Ia() {
  }
  var Uc = null;
  function Vc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var zr = null, Or = null;
  function Qm(t) {
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
          jl(t, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && vi(t, !!i.multiple, n, !1);
      }
    }
  }
  var qc = !1;
  function Pm(t, n, i) {
    if (qc) return t(n, i);
    qc = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (qc = !1, (zr !== null || Or !== null) && (Ks(), zr && (n = zr, t = Or, Or = zr = null, Qm(n), t)))
        for (n = 0; n < t.length; n++) Qm(t[n]);
    }
  }
  function Ll(t, n) {
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
  var Ya = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $c = !1;
  if (Ya)
    try {
      var Hl = {};
      Object.defineProperty(Hl, "passive", {
        get: function() {
          $c = !0;
        }
      }), window.addEventListener("test", Hl, Hl), window.removeEventListener("test", Hl, Hl);
    } catch {
      $c = !1;
    }
  var bi = null, Ic = null, fs = null;
  function Km() {
    if (fs) return fs;
    var t, n = Ic, i = n.length, o, f = "value" in bi ? bi.value : bi.textContent, h = f.length;
    for (t = 0; t < i && n[t] === f[t]; t++) ;
    var w = i - t;
    for (o = 1; o <= w && n[i - o] === f[h - o]; o++) ;
    return fs = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function ds(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function hs() {
    return !0;
  }
  function Jm() {
    return !1;
  }
  function _n(t) {
    function n(i, o, f, h, w) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var T in t)
        t.hasOwnProperty(T) && (i = t[T], this[T] = i ? i(h) : h[T]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? hs : Jm, this.isPropagationStopped = Jm, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = hs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = hs);
      },
      persist: function() {
      },
      isPersistent: hs
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
  }, ms = _n(Pi), kl = g({}, Pi, { view: 0, detail: 0 }), ES = _n(kl), Yc, Gc, Bl, ps = g({}, kl, {
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
    getModifierState: Fc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Bl && (Bl && t.type === "mousemove" ? (Yc = t.screenX - Bl.screenX, Gc = t.screenY - Bl.screenY) : Gc = Yc = 0, Bl = t), Yc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Gc;
    }
  }), Wm = _n(ps), _S = g({}, ps, { dataTransfer: 0 }), NS = _n(_S), CS = g({}, kl, { relatedTarget: 0 }), Xc = _n(CS), RS = g({}, Pi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), MS = _n(RS), TS = g({}, Pi, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), DS = _n(TS), AS = g({}, Pi, { data: 0 }), ep = _n(AS), zS = {
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
  }, OS = {
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
  }, jS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function LS(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = jS[t]) ? !!n[t] : !1;
  }
  function Fc() {
    return LS;
  }
  var HS = g({}, kl, {
    key: function(t) {
      if (t.key) {
        var n = zS[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = ds(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? OS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fc,
    charCode: function(t) {
      return t.type === "keypress" ? ds(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ds(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), kS = _n(HS), BS = g({}, ps, {
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
  }), tp = _n(BS), US = g({}, kl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fc
  }), VS = _n(US), qS = g({}, Pi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), $S = _n(qS), IS = g({}, ps, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), YS = _n(IS), GS = g({}, Pi, {
    newState: 0,
    oldState: 0
  }), XS = _n(GS), FS = [9, 13, 27, 32], Zc = Ya && "CompositionEvent" in window, Ul = null;
  Ya && "documentMode" in document && (Ul = document.documentMode);
  var ZS = Ya && "TextEvent" in window && !Ul, np = Ya && (!Zc || Ul && 8 < Ul && 11 >= Ul), ap = " ", ip = !1;
  function rp(t, n) {
    switch (t) {
      case "keyup":
        return FS.indexOf(n.keyCode) !== -1;
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
  function lp(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var jr = !1;
  function QS(t, n) {
    switch (t) {
      case "compositionend":
        return lp(n);
      case "keypress":
        return n.which !== 32 ? null : (ip = !0, ap);
      case "textInput":
        return t = n.data, t === ap && ip ? null : t;
      default:
        return null;
    }
  }
  function PS(t, n) {
    if (jr)
      return t === "compositionend" || !Zc && rp(t, n) ? (t = Km(), fs = Ic = bi = null, jr = !1, t) : null;
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
        return np && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var KS = {
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
  function op(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!KS[t.type] : n === "textarea";
  }
  function sp(t, n, i, o) {
    zr ? Or ? Or.push(o) : Or = [o] : zr = o, n = iu(n, "onChange"), 0 < n.length && (i = new ms(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var Vl = null, ql = null;
  function JS(t) {
    Y0(t, 0);
  }
  function gs(t) {
    var n = We(t);
    if ($a(n)) return t;
  }
  function up(t, n) {
    if (t === "change") return n;
  }
  var cp = !1;
  if (Ya) {
    var Qc;
    if (Ya) {
      var Pc = "oninput" in document;
      if (!Pc) {
        var fp = document.createElement("div");
        fp.setAttribute("oninput", "return;"), Pc = typeof fp.oninput == "function";
      }
      Qc = Pc;
    } else Qc = !1;
    cp = Qc && (!document.documentMode || 9 < document.documentMode);
  }
  function dp() {
    Vl && (Vl.detachEvent("onpropertychange", hp), ql = Vl = null);
  }
  function hp(t) {
    if (t.propertyName === "value" && gs(ql)) {
      var n = [];
      sp(
        n,
        ql,
        t,
        Vc(t)
      ), Pm(JS, n);
    }
  }
  function WS(t, n, i) {
    t === "focusin" ? (dp(), Vl = n, ql = i, Vl.attachEvent("onpropertychange", hp)) : t === "focusout" && dp();
  }
  function eE(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return gs(ql);
  }
  function tE(t, n) {
    if (t === "click") return gs(n);
  }
  function nE(t, n) {
    if (t === "input" || t === "change")
      return gs(n);
  }
  function aE(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Ln = typeof Object.is == "function" ? Object.is : aE;
  function $l(t, n) {
    if (Ln(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!ke.call(n, f) || !Ln(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function mp(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function pp(t, n) {
    var i = mp(t);
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
      i = mp(i);
    }
  }
  function gp(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? gp(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function yp(t) {
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
  function Kc(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var iE = Ya && "documentMode" in document && 11 >= document.documentMode, Lr = null, Jc = null, Il = null, Wc = !1;
  function vp(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Wc || Lr == null || Lr !== dt(o) || (o = Lr, "selectionStart" in o && Kc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Il && $l(Il, o) || (Il = o, o = iu(Jc, "onSelect"), 0 < o.length && (n = new ms(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = Lr)));
  }
  function Ki(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var Hr = {
    animationend: Ki("Animation", "AnimationEnd"),
    animationiteration: Ki("Animation", "AnimationIteration"),
    animationstart: Ki("Animation", "AnimationStart"),
    transitionrun: Ki("Transition", "TransitionRun"),
    transitionstart: Ki("Transition", "TransitionStart"),
    transitioncancel: Ki("Transition", "TransitionCancel"),
    transitionend: Ki("Transition", "TransitionEnd")
  }, ef = {}, bp = {};
  Ya && (bp = document.createElement("div").style, "AnimationEvent" in window || (delete Hr.animationend.animation, delete Hr.animationiteration.animation, delete Hr.animationstart.animation), "TransitionEvent" in window || delete Hr.transitionend.transition);
  function Ji(t) {
    if (ef[t]) return ef[t];
    if (!Hr[t]) return t;
    var n = Hr[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in bp)
        return ef[t] = n[i];
    return t;
  }
  var xp = Ji("animationend"), wp = Ji("animationiteration"), Sp = Ji("animationstart"), rE = Ji("transitionrun"), lE = Ji("transitionstart"), oE = Ji("transitioncancel"), Ep = Ji("transitionend"), _p = /* @__PURE__ */ new Map(), tf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  tf.push("scrollEnd");
  function ha(t, n) {
    _p.set(t, n), cn(n, [t]);
  }
  var ys = typeof reportError == "function" ? reportError : function(t) {
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
  }, Qn = [], kr = 0, nf = 0;
  function vs() {
    for (var t = kr, n = nf = kr = 0; n < t; ) {
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
      h !== 0 && Np(i, f, h);
    }
  }
  function bs(t, n, i, o) {
    Qn[kr++] = t, Qn[kr++] = n, Qn[kr++] = i, Qn[kr++] = o, nf |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function af(t, n, i, o) {
    return bs(t, n, i, o), xs(t);
  }
  function Wi(t, n) {
    return bs(t, null, null, n), xs(t);
  }
  function Np(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= i, o = h.alternate, o !== null && (o.childLanes |= i), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(i), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = i | 536870912), h) : null;
  }
  function xs(t) {
    if (50 < fo)
      throw fo = 0, hd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Br = {};
  function sE(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Hn(t, n, i, o) {
    return new sE(t, n, i, o);
  }
  function rf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ga(t, n) {
    var i = t.alternate;
    return i === null ? (i = Hn(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Cp(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function ws(t, n, i, o, f, h) {
    var w = 0;
    if (o = t, typeof t == "function") rf(t) && (w = 1);
    else if (typeof t == "string")
      w = h_(
        t,
        i,
        ne.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case I:
          return t = Hn(31, i, n, f), t.elementType = I, t.lanes = h, t;
        case R:
          return er(i.children, f, h, n);
        case N:
          w = 8, f |= 24;
          break;
        case C:
          return t = Hn(12, i, n, f | 2), t.elementType = C, t.lanes = h, t;
        case k:
          return t = Hn(13, i, n, f), t.elementType = k, t.lanes = h, t;
        case B:
          return t = Hn(19, i, n, f), t.elementType = B, t.lanes = h, t;
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
    return n = Hn(w, i, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function er(t, n, i, o) {
    return t = Hn(7, t, o, n), t.lanes = i, t;
  }
  function lf(t, n, i) {
    return t = Hn(6, t, null, n), t.lanes = i, t;
  }
  function Rp(t) {
    var n = Hn(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function of(t, n, i) {
    return n = Hn(
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
  var Mp = /* @__PURE__ */ new WeakMap();
  function Pn(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Mp.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Xe(n)
      }, Mp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Xe(n)
    };
  }
  var Ur = [], Vr = 0, Ss = null, Yl = 0, Kn = [], Jn = 0, xi = null, Ca = 1, Ra = "";
  function Xa(t, n) {
    Ur[Vr++] = Yl, Ur[Vr++] = Ss, Ss = t, Yl = n;
  }
  function Tp(t, n, i) {
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
  function sf(t) {
    t.return !== null && (Xa(t, 1), Tp(t, 1, 0));
  }
  function uf(t) {
    for (; t === Ss; )
      Ss = Ur[--Vr], Ur[Vr] = null, Yl = Ur[--Vr], Ur[Vr] = null;
    for (; t === xi; )
      xi = Kn[--Jn], Kn[Jn] = null, Ra = Kn[--Jn], Kn[Jn] = null, Ca = Kn[--Jn], Kn[Jn] = null;
  }
  function Dp(t, n) {
    Kn[Jn++] = Ca, Kn[Jn++] = Ra, Kn[Jn++] = xi, Ca = n.id, Ra = n.overflow, xi = t;
  }
  var rn = null, Mt = null, it = !1, wi = null, Wn = !1, cf = Error(l(519));
  function Si(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Gl(Pn(n, t)), cf;
  }
  function Ap(t) {
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
        for (i = 0; i < mo.length; i++)
          Ke(mo[i], n);
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
        Ke("invalid", n), Dr(
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
        Ke("invalid", n), Xm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || Z0(n.textContent, i) ? (o.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), o.onScroll != null && Ke("scroll", n), o.onScrollEnd != null && Ke("scrollend", n), o.onClick != null && (n.onclick = Ia), n = !0) : n = !1, n || Si(t, !0);
  }
  function zp(t) {
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
  function qr(t) {
    if (t !== rn) return !1;
    if (!it) return zp(t), it = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || Md(t.type, t.memoizedProps)), i = !i), i && Mt && Si(t), zp(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Mt = ay(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Mt = ay(t);
    } else
      n === 27 ? (n = Mt, Hi(t.type) ? (t = Od, Od = null, Mt = t) : Mt = n) : Mt = rn ? ta(t.stateNode.nextSibling) : null;
    return !0;
  }
  function tr() {
    Mt = rn = null, it = !1;
  }
  function ff() {
    var t = wi;
    return t !== null && (Mn === null ? Mn = t : Mn.push.apply(
      Mn,
      t
    ), wi = null), t;
  }
  function Gl(t) {
    wi === null ? wi = [t] : wi.push(t);
  }
  var df = D(null), nr = null, Fa = null;
  function Ei(t, n, i) {
    P(df, n._currentValue), n._currentValue = i;
  }
  function Za(t) {
    t._currentValue = df.current, H(df);
  }
  function hf(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function mf(t, n, i, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var w = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var T = h;
          h = f;
          for (var q = 0; q < n.length; q++)
            if (T.context === n[q]) {
              h.lanes |= i, T = h.alternate, T !== null && (T.lanes |= i), hf(
                h.return,
                i,
                t
              ), o || (w = null);
              break e;
            }
          h = T.next;
        }
      } else if (f.tag === 18) {
        if (w = f.return, w === null) throw Error(l(341));
        w.lanes |= i, h = w.alternate, h !== null && (h.lanes |= i), hf(w, i, t), w = null;
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
  function $r(t, n, i, o) {
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
          var T = f.type;
          Ln(f.pendingProps.value, w.value) || (t !== null ? t.push(T) : t = [T]);
        }
      } else if (f === me.current) {
        if (w = f.alternate, w === null) throw Error(l(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(bo) : t = [bo]);
      }
      f = f.return;
    }
    t !== null && mf(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Es(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ln(
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
    return Op(nr, t);
  }
  function _s(t, n) {
    return nr === null && ar(t), Op(t, n);
  }
  function Op(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Fa === null) {
      if (t === null) throw Error(l(308));
      Fa = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Fa = Fa.next = n;
    return i;
  }
  var uE = typeof AbortController < "u" ? AbortController : function() {
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
  }, cE = e.unstable_scheduleCallback, fE = e.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function pf() {
    return {
      controller: new uE(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Xl(t) {
    t.refCount--, t.refCount === 0 && cE(fE, function() {
      t.controller.abort();
    });
  }
  var Fl = null, gf = 0, Ir = 0, Yr = null;
  function dE(t, n) {
    if (Fl === null) {
      var i = Fl = [];
      gf = 0, Ir = bd(), Yr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return gf++, n.then(jp, jp), n;
  }
  function jp() {
    if (--gf === 0 && Fl !== null) {
      Yr !== null && (Yr.status = "fulfilled");
      var t = Fl;
      Fl = null, Ir = 0, Yr = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function hE(t, n) {
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
  var Lp = M.S;
  M.S = function(t, n) {
    v0 = Qe(), typeof n == "object" && n !== null && typeof n.then == "function" && dE(t, n), Lp !== null && Lp(t, n);
  };
  var ir = D(null);
  function yf() {
    var t = ir.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function Ns(t, n) {
    n === null ? P(ir, ir.current) : P(ir, n.pool);
  }
  function Hp() {
    var t = yf();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Gr = Error(l(460)), vf = Error(l(474)), Cs = Error(l(542)), Rs = { then: function() {
  } };
  function kp(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Bp(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Ia, Ia), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, Vp(t), t;
      default:
        if (typeof n.status == "string") n.then(Ia, Ia);
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
            throw t = n.reason, Vp(t), t;
        }
        throw lr = n, Gr;
    }
  }
  function rr(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (lr = i, Gr) : i;
    }
  }
  var lr = null;
  function Up() {
    if (lr === null) throw Error(l(459));
    var t = lr;
    return lr = null, t;
  }
  function Vp(t) {
    if (t === Gr || t === Cs)
      throw Error(l(483));
  }
  var Xr = null, Zl = 0;
  function Ms(t) {
    var n = Zl;
    return Zl += 1, Xr === null && (Xr = []), Bp(Xr, t, n);
  }
  function Ql(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Ts(t, n) {
    throw n.$$typeof === v ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function qp(t) {
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
    function T(J, X, ae, ce) {
      return X === null || X.tag !== 6 ? (X = lf(ae, J.mode, ce), X.return = J, X) : (X = f(X, ae), X.return = J, X);
    }
    function q(J, X, ae, ce) {
      var Oe = ae.type;
      return Oe === R ? ue(
        J,
        X,
        ae.props.children,
        ce,
        ae.key
      ) : X !== null && (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === A && rr(Oe) === X.type) ? (X = f(X, ae.props), Ql(X, ae), X.return = J, X) : (X = ws(
        ae.type,
        ae.key,
        ae.props,
        null,
        J.mode,
        ce
      ), Ql(X, ae), X.return = J, X);
    }
    function ie(J, X, ae, ce) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ae.containerInfo || X.stateNode.implementation !== ae.implementation ? (X = of(ae, J.mode, ce), X.return = J, X) : (X = f(X, ae.children || []), X.return = J, X);
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
        return X = lf(
          "" + X,
          J.mode,
          ae
        ), X.return = J, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return ae = ws(
              X.type,
              X.key,
              X.props,
              null,
              J.mode,
              ae
            ), Ql(ae, X), ae.return = J, ae;
          case S:
            return X = of(
              X,
              J.mode,
              ae
            ), X.return = J, X;
          case A:
            return X = rr(X), fe(J, X, ae);
        }
        if (Y(X) || K(X))
          return X = er(
            X,
            J.mode,
            ae,
            null
          ), X.return = J, X;
        if (typeof X.then == "function")
          return fe(J, Ms(X), ae);
        if (X.$$typeof === E)
          return fe(
            J,
            _s(J, X),
            ae
          );
        Ts(J, X);
      }
      return null;
    }
    function re(J, X, ae, ce) {
      var Oe = X !== null ? X.key : null;
      if (typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint")
        return Oe !== null ? null : T(J, X, "" + ae, ce);
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            return ae.key === Oe ? q(J, X, ae, ce) : null;
          case S:
            return ae.key === Oe ? ie(J, X, ae, ce) : null;
          case A:
            return ae = rr(ae), re(J, X, ae, ce);
        }
        if (Y(ae) || K(ae))
          return Oe !== null ? null : ue(J, X, ae, ce, null);
        if (typeof ae.then == "function")
          return re(
            J,
            X,
            Ms(ae),
            ce
          );
        if (ae.$$typeof === E)
          return re(
            J,
            X,
            _s(J, ae),
            ce
          );
        Ts(J, ae);
      }
      return null;
    }
    function oe(J, X, ae, ce, Oe) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return J = J.get(ae) || null, T(X, J, "" + ce, Oe);
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
        if (Y(ce) || K(ce))
          return J = J.get(ae) || null, ue(X, J, ce, Oe, null);
        if (typeof ce.then == "function")
          return oe(
            J,
            X,
            ae,
            Ms(ce),
            Oe
          );
        if (ce.$$typeof === E)
          return oe(
            J,
            X,
            ae,
            _s(X, ce),
            Oe
          );
        Ts(X, ce);
      }
      return null;
    }
    function _e(J, X, ae, ce) {
      for (var Oe = null, ut = null, Ne = X, Ye = X = 0, tt = null; Ne !== null && Ye < ae.length; Ye++) {
        Ne.index > Ye ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var ct = re(
          J,
          Ne,
          ae[Ye],
          ce
        );
        if (ct === null) {
          Ne === null && (Ne = tt);
          break;
        }
        t && Ne && ct.alternate === null && n(J, Ne), X = h(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ne = tt;
      }
      if (Ye === ae.length)
        return i(J, Ne), it && Xa(J, Ye), Oe;
      if (Ne === null) {
        for (; Ye < ae.length; Ye++)
          Ne = fe(J, ae[Ye], ce), Ne !== null && (X = h(
            Ne,
            X,
            Ye
          ), ut === null ? Oe = Ne : ut.sibling = Ne, ut = Ne);
        return it && Xa(J, Ye), Oe;
      }
      for (Ne = o(Ne); Ye < ae.length; Ye++)
        tt = oe(
          Ne,
          J,
          Ye,
          ae[Ye],
          ce
        ), tt !== null && (t && tt.alternate !== null && Ne.delete(
          tt.key === null ? Ye : tt.key
        ), X = h(
          tt,
          X,
          Ye
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return t && Ne.forEach(function(qi) {
        return n(J, qi);
      }), it && Xa(J, Ye), Oe;
    }
    function Le(J, X, ae, ce) {
      if (ae == null) throw Error(l(151));
      for (var Oe = null, ut = null, Ne = X, Ye = X = 0, tt = null, ct = ae.next(); Ne !== null && !ct.done; Ye++, ct = ae.next()) {
        Ne.index > Ye ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var qi = re(J, Ne, ct.value, ce);
        if (qi === null) {
          Ne === null && (Ne = tt);
          break;
        }
        t && Ne && qi.alternate === null && n(J, Ne), X = h(qi, X, Ye), ut === null ? Oe = qi : ut.sibling = qi, ut = qi, Ne = tt;
      }
      if (ct.done)
        return i(J, Ne), it && Xa(J, Ye), Oe;
      if (Ne === null) {
        for (; !ct.done; Ye++, ct = ae.next())
          ct = fe(J, ct.value, ce), ct !== null && (X = h(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && Xa(J, Ye), Oe;
      }
      for (Ne = o(Ne); !ct.done; Ye++, ct = ae.next())
        ct = oe(Ne, J, Ye, ct.value, ce), ct !== null && (t && ct.alternate !== null && Ne.delete(ct.key === null ? Ye : ct.key), X = h(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return t && Ne.forEach(function(__) {
        return n(J, __);
      }), it && Xa(J, Ye), Oe;
    }
    function Nt(J, X, ae, ce) {
      if (typeof ae == "object" && ae !== null && ae.type === R && ae.key === null && (ae = ae.props.children), typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case x:
            e: {
              for (var Oe = ae.key; X !== null; ) {
                if (X.key === Oe) {
                  if (Oe = ae.type, Oe === R) {
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
                    ), ce = f(X, ae.props), Ql(ce, ae), ce.return = J, J = ce;
                    break e;
                  }
                  i(J, X);
                  break;
                } else n(J, X);
                X = X.sibling;
              }
              ae.type === R ? (ce = er(
                ae.props.children,
                J.mode,
                ce,
                ae.key
              ), ce.return = J, J = ce) : (ce = ws(
                ae.type,
                ae.key,
                ae.props,
                null,
                J.mode,
                ce
              ), Ql(ce, ae), ce.return = J, J = ce);
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
              ce = of(ae, J.mode, ce), ce.return = J, J = ce;
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
        if (Y(ae))
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
            Ms(ae),
            ce
          );
        if (ae.$$typeof === E)
          return Nt(
            J,
            X,
            _s(J, ae),
            ce
          );
        Ts(J, ae);
      }
      return typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint" ? (ae = "" + ae, X !== null && X.tag === 6 ? (i(J, X.sibling), ce = f(X, ae), ce.return = J, J = ce) : (i(J, X), ce = lf(ae, J.mode, ce), ce.return = J, J = ce), w(J)) : i(J, X);
    }
    return function(J, X, ae, ce) {
      try {
        Zl = 0;
        var Oe = Nt(
          J,
          X,
          ae,
          ce
        );
        return Xr = null, Oe;
      } catch (Ne) {
        if (Ne === Gr || Ne === Cs) throw Ne;
        var ut = Hn(29, Ne, null, J.mode);
        return ut.lanes = ce, ut.return = J, ut;
      } finally {
      }
    };
  }
  var or = qp(!0), $p = qp(!1), _i = !1;
  function bf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function xf(t, n) {
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
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = xs(t), Np(t, null, i), n;
    }
    return bs(t, o, n, i), xs(t);
  }
  function Pl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Wt(t, i);
    }
  }
  function wf(t, n) {
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
  var Sf = !1;
  function Kl() {
    if (Sf) {
      var t = Yr;
      if (t !== null) throw t;
    }
  }
  function Jl(t, n, i, o) {
    Sf = !1;
    var f = t.updateQueue;
    _i = !1;
    var h = f.firstBaseUpdate, w = f.lastBaseUpdate, T = f.shared.pending;
    if (T !== null) {
      f.shared.pending = null;
      var q = T, ie = q.next;
      q.next = null, w === null ? h = ie : w.next = ie, w = q;
      var ue = t.alternate;
      ue !== null && (ue = ue.updateQueue, T = ue.lastBaseUpdate, T !== w && (T === null ? ue.firstBaseUpdate = ie : T.next = ie, ue.lastBaseUpdate = q));
    }
    if (h !== null) {
      var fe = f.baseState;
      w = 0, ue = ie = q = null, T = h;
      do {
        var re = T.lane & -536870913, oe = re !== T.lane;
        if (oe ? (et & re) === re : (o & re) === re) {
          re !== 0 && re === Ir && (Sf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = t, Le = T;
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
          re = T.callback, re !== null && (t.flags |= 64, oe && (t.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [re] : oe.push(re));
        } else
          oe = {
            lane: re,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          }, ue === null ? (ie = ue = oe, q = fe) : ue = ue.next = oe, w |= re;
        if (T = T.next, T === null) {
          if (T = f.shared.pending, T === null)
            break;
          oe = T, T = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && (q = fe), f.baseState = q, f.firstBaseUpdate = ie, f.lastBaseUpdate = ue, h === null && (f.shared.lanes = 0), Ai |= w, t.lanes = w, t.memoizedState = fe;
    }
  }
  function Ip(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function Yp(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        Ip(i[t], n);
  }
  var Fr = D(null), Ds = D(0);
  function Gp(t, n) {
    t = ai, P(Ds, t), P(Fr, n), ai = t | n.baseLanes;
  }
  function Ef() {
    P(Ds, ai), P(Fr, Fr.current);
  }
  function _f() {
    ai = Ds.current, H(Fr), H(Ds);
  }
  var kn = D(null), ea = null;
  function Ri(t) {
    var n = t.alternate;
    P(qt, qt.current & 1), P(kn, t), ea === null && (n === null || Fr.current !== null || n.memoizedState !== null) && (ea = t);
  }
  function Nf(t) {
    P(qt, qt.current), P(kn, t), ea === null && (ea = t);
  }
  function Xp(t) {
    t.tag === 22 ? (P(qt, qt.current), P(kn, t), ea === null && (ea = t)) : Mi();
  }
  function Mi() {
    P(qt, qt.current), P(kn, kn.current);
  }
  function Bn(t) {
    H(kn), ea === t && (ea = null), H(qt);
  }
  var qt = D(0);
  function As(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Ad(i) || zd(i)))
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
  var Qa = 0, qe = null, Et = null, Xt = null, zs = !1, Zr = !1, sr = !1, Os = 0, Wl = 0, Qr = null, mE = 0;
  function kt() {
    throw Error(l(321));
  }
  function Cf(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Ln(t[i], n[i])) return !1;
    return !0;
  }
  function Rf(t, n, i, o, f, h) {
    return Qa = h, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, M.H = t === null || t.memoizedState === null ? Tg : $f, sr = !1, h = i(o, f), sr = !1, Zr && (h = Zp(
      n,
      i,
      o,
      f
    )), Fp(t), h;
  }
  function Fp(t) {
    M.H = no;
    var n = Et !== null && Et.next !== null;
    if (Qa = 0, Xt = Et = qe = null, zs = !1, Wl = 0, Qr = null, n) throw Error(l(300));
    t === null || Ft || (t = t.dependencies, t !== null && Es(t) && (Ft = !0));
  }
  function Zp(t, n, i, o) {
    qe = t;
    var f = 0;
    do {
      if (Zr && (Qr = null), Wl = 0, Zr = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Xt = Et = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      M.H = Dg, h = n(i, o);
    } while (Zr);
    return h;
  }
  function pE() {
    var t = M.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? eo(n) : n, t = t.useState()[0], (Et !== null ? Et.memoizedState : null) !== t && (qe.flags |= 1024), n;
  }
  function Mf() {
    var t = Os !== 0;
    return Os = 0, t;
  }
  function Tf(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Df(t) {
    if (zs) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      zs = !1;
    }
    Qa = 0, Xt = Et = qe = null, Zr = !1, Wl = Os = 0, Qr = null;
  }
  function yn() {
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
  function js() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function eo(t) {
    var n = Wl;
    return Wl += 1, Qr === null && (Qr = []), t = Bp(Qr, t, n), n = qe, (Xt === null ? n.memoizedState : Xt.next) === null && (n = n.alternate, M.H = n === null || n.memoizedState === null ? Tg : $f), t;
  }
  function Ls(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return eo(t);
      if (t.$$typeof === E) return ln(t);
    }
    throw Error(l(438, String(t)));
  }
  function Af(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = js(), qe.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = te;
    return n.index++, i;
  }
  function Pa(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Hs(t) {
    var n = $t();
    return zf(n, Et, t);
  }
  function zf(t, n, i) {
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
      var T = w = null, q = null, ie = n, ue = !1;
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
            }), fe === Ir && (ue = !0);
          else if ((Qa & re) === re) {
            ie = ie.next, re === Ir && (ue = !0);
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
            }, q === null ? (T = q = fe, w = h) : q = q.next = fe, qe.lanes |= re, Ai |= re;
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
          }, q === null ? (T = q = re, w = h) : q = q.next = re, qe.lanes |= fe, Ai |= fe;
        ie = ie.next;
      } while (ie !== null && ie !== n);
      if (q === null ? w = h : q.next = T, !Ln(h, t.memoizedState) && (Ft = !0, ue && (i = Yr, i !== null)))
        throw i;
      t.memoizedState = h, t.baseState = w, t.baseQueue = q, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Of(t) {
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
      Ln(h, n.memoizedState) || (Ft = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), i.lastRenderedState = h;
    }
    return [h, o];
  }
  function Qp(t, n, i) {
    var o = qe, f = $t(), h = it;
    if (h) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var w = !Ln(
      (Et || f).memoizedState,
      i
    );
    if (w && (f.memoizedState = i, Ft = !0), f = f.queue, Hf(Jp.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || w || Xt !== null && Xt.memoizedState.tag & 1) {
      if (o.flags |= 2048, Pr(
        9,
        { destroy: void 0 },
        Kp.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (Qa & 127) !== 0 || Pp(o, n, i);
    }
    return i;
  }
  function Pp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = js(), qe.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function Kp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, Wp(n) && eg(t);
  }
  function Jp(t, n, i) {
    return i(function() {
      Wp(n) && eg(t);
    });
  }
  function Wp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Ln(t, i);
    } catch {
      return !0;
    }
  }
  function eg(t) {
    var n = Wi(t, 2);
    n !== null && Tn(n, t, 2);
  }
  function jf(t) {
    var n = yn();
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
  function tg(t, n, i, o) {
    return t.baseState = i, zf(
      t,
      Et,
      typeof o == "function" ? o : Pa
    );
  }
  function gE(t, n, i, o, f) {
    if (Us(t)) throw Error(l(485));
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
      M.T !== null ? i(!0) : h.isTransition = !1, o(h), i = n.pending, i === null ? (h.next = n.pending = h, ng(n, h)) : (h.next = i.next, n.pending = i.next = h);
    }
  }
  function ng(t, n) {
    var i = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = M.T, w = {};
      M.T = w;
      try {
        var T = i(f, o), q = M.S;
        q !== null && q(w, T), ag(t, n, T);
      } catch (ie) {
        Lf(t, n, ie);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), M.T = h;
      }
    } else
      try {
        h = i(f, o), ag(t, n, h);
      } catch (ie) {
        Lf(t, n, ie);
      }
  }
  function ag(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        ig(t, n, o);
      },
      function(o) {
        return Lf(t, n, o);
      }
    ) : ig(t, n, i);
  }
  function ig(t, n, i) {
    n.status = "fulfilled", n.value = i, rg(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, ng(t, i)));
  }
  function Lf(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, rg(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function rg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function lg(t, n) {
    return n;
  }
  function og(t, n) {
    if (it) {
      var i = Rt.formState;
      if (i !== null) {
        e: {
          var o = qe;
          if (it) {
            if (Mt) {
              t: {
                for (var f = Mt, h = Wn; f.nodeType !== 8; ) {
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
                Mt = ta(
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
    return i = yn(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lg,
      lastRenderedState: n
    }, i.queue = o, i = Cg.bind(
      null,
      qe,
      o
    ), o.dispatch = i, o = jf(!1), h = qf.bind(
      null,
      qe,
      !1,
      o.queue
    ), o = yn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, i = gE.bind(
      null,
      qe,
      f,
      h,
      i
    ), f.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function sg(t) {
    var n = $t();
    return ug(n, Et, t);
  }
  function ug(t, n, i) {
    if (n = zf(
      t,
      n,
      lg
    )[0], t = Hs(Pa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = eo(n);
      } catch (w) {
        throw w === Gr ? Cs : w;
      }
    else o = n;
    n = $t();
    var f = n.queue, h = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, Pr(
      9,
      { destroy: void 0 },
      yE.bind(null, f, i),
      null
    )), [o, h, t];
  }
  function yE(t, n) {
    t.action = n;
  }
  function cg(t) {
    var n = $t(), i = Et;
    if (i !== null)
      return ug(n, i, t);
    $t(), n = n.memoizedState, i = $t();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Pr(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = js(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function fg() {
    return $t().memoizedState;
  }
  function ks(t, n, i, o) {
    var f = yn();
    qe.flags |= t, f.memoizedState = Pr(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Bs(t, n, i, o) {
    var f = $t();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    Et !== null && o !== null && Cf(o, Et.memoizedState.deps) ? f.memoizedState = Pr(n, h, i, o) : (qe.flags |= t, f.memoizedState = Pr(
      1 | n,
      h,
      i,
      o
    ));
  }
  function dg(t, n) {
    ks(8390656, 8, t, n);
  }
  function Hf(t, n) {
    Bs(2048, 8, t, n);
  }
  function vE(t) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = js(), qe.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function hg(t) {
    var n = $t().memoizedState;
    return vE({ ref: n, nextImpl: t }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function mg(t, n) {
    return Bs(4, 2, t, n);
  }
  function pg(t, n) {
    return Bs(4, 4, t, n);
  }
  function gg(t, n) {
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
  function yg(t, n, i) {
    i = i != null ? i.concat([t]) : null, Bs(4, 4, gg.bind(null, n, t), i);
  }
  function kf() {
  }
  function vg(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && Cf(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function bg(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && Cf(n, o[1]))
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
  function Bf(t, n, i) {
    return i === void 0 || (Qa & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = x0(), qe.lanes |= t, Ai |= t, i);
  }
  function xg(t, n, i, o) {
    return Ln(i, n) ? i : Fr.current !== null ? (t = Bf(t, i, o), Ln(t, n) || (Ft = !0), t) : (Qa & 42) === 0 || (Qa & 1073741824) !== 0 && (et & 261930) === 0 ? (Ft = !0, t.memoizedState = i) : (t = x0(), qe.lanes |= t, Ai |= t, n);
  }
  function wg(t, n, i, o, f) {
    var h = L.p;
    L.p = h !== 0 && 8 > h ? h : 8;
    var w = M.T, T = {};
    M.T = T, qf(t, !1, n, i);
    try {
      var q = f(), ie = M.S;
      if (ie !== null && ie(T, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var ue = hE(
          q,
          o
        );
        to(
          t,
          n,
          ue,
          qn(t)
        );
      } else
        to(
          t,
          n,
          o,
          qn(t)
        );
    } catch (fe) {
      to(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        qn()
      );
    } finally {
      L.p = h, w !== null && T.types !== null && (w.types = T.types), M.T = w;
    }
  }
  function bE() {
  }
  function Uf(t, n, i, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = Sg(t).queue;
    wg(
      t,
      f,
      n,
      F,
      i === null ? bE : function() {
        return Eg(t), i(o);
      }
    );
  }
  function Sg(t) {
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
  function Eg(t) {
    var n = Sg(t);
    n.next === null && (n = t.alternate.memoizedState), to(
      t,
      n.next.queue,
      {},
      qn()
    );
  }
  function Vf() {
    return ln(bo);
  }
  function _g() {
    return $t().memoizedState;
  }
  function Ng() {
    return $t().memoizedState;
  }
  function xE(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = qn();
          t = Ni(i);
          var o = Ci(n, t, i);
          o !== null && (Tn(o, n, i), Pl(o, n, i)), n = { cache: pf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function wE(t, n, i) {
    var o = qn();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Us(t) ? Rg(n, i) : (i = af(t, n, i, o), i !== null && (Tn(i, t, o), Mg(i, n, o)));
  }
  function Cg(t, n, i) {
    var o = qn();
    to(t, n, i, o);
  }
  function to(t, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Us(t)) Rg(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, T = h(w, i);
          if (f.hasEagerState = !0, f.eagerState = T, Ln(T, w))
            return bs(t, n, f, 0), Rt === null && vs(), !1;
        } catch {
        } finally {
        }
      if (i = af(t, n, f, o), i !== null)
        return Tn(i, t, o), Mg(i, n, o), !0;
    }
    return !1;
  }
  function qf(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: bd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Us(t)) {
      if (n) throw Error(l(479));
    } else
      n = af(
        t,
        i,
        o,
        2
      ), n !== null && Tn(n, t, 2);
  }
  function Us(t) {
    var n = t.alternate;
    return t === qe || n !== null && n === qe;
  }
  function Rg(t, n) {
    Zr = zs = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Mg(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Wt(t, i);
    }
  }
  var no = {
    readContext: ln,
    use: Ls,
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
  no.useEffectEvent = kt;
  var Tg = {
    readContext: ln,
    use: Ls,
    useCallback: function(t, n) {
      return yn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: ln,
    useEffect: dg,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, ks(
        4194308,
        4,
        gg.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return ks(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      ks(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = yn();
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
      var o = yn();
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
      }, o.queue = t, t = t.dispatch = wE.bind(
        null,
        qe,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = yn();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = jf(t);
      var n = t.queue, i = Cg.bind(null, qe, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: kf,
    useDeferredValue: function(t, n) {
      var i = yn();
      return Bf(i, t, n);
    },
    useTransition: function() {
      var t = jf(!1);
      return t = wg.bind(
        null,
        qe,
        t.queue,
        !0,
        !1
      ), yn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = qe, f = yn();
      if (it) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = n(), Rt === null)
          throw Error(l(349));
        (et & 127) !== 0 || Pp(o, n, i);
      }
      f.memoizedState = i;
      var h = { value: i, getSnapshot: n };
      return f.queue = h, dg(Jp.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, Pr(
        9,
        { destroy: void 0 },
        Kp.bind(
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
      var t = yn(), n = Rt.identifierPrefix;
      if (it) {
        var i = Ra, o = Ca;
        i = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Os++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = mE++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Vf,
    useFormState: og,
    useActionState: og,
    useOptimistic: function(t) {
      var n = yn();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = qf.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Af,
    useCacheRefresh: function() {
      return yn().memoizedState = xE.bind(
        null,
        qe
      );
    },
    useEffectEvent: function(t) {
      var n = yn(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((ht & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, $f = {
    readContext: ln,
    use: Ls,
    useCallback: vg,
    useContext: ln,
    useEffect: Hf,
    useImperativeHandle: yg,
    useInsertionEffect: mg,
    useLayoutEffect: pg,
    useMemo: bg,
    useReducer: Hs,
    useRef: fg,
    useState: function() {
      return Hs(Pa);
    },
    useDebugValue: kf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return xg(
        i,
        Et.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Hs(Pa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : eo(t),
        n
      ];
    },
    useSyncExternalStore: Qp,
    useId: _g,
    useHostTransitionStatus: Vf,
    useFormState: sg,
    useActionState: sg,
    useOptimistic: function(t, n) {
      var i = $t();
      return tg(i, Et, t, n);
    },
    useMemoCache: Af,
    useCacheRefresh: Ng
  };
  $f.useEffectEvent = hg;
  var Dg = {
    readContext: ln,
    use: Ls,
    useCallback: vg,
    useContext: ln,
    useEffect: Hf,
    useImperativeHandle: yg,
    useInsertionEffect: mg,
    useLayoutEffect: pg,
    useMemo: bg,
    useReducer: Of,
    useRef: fg,
    useState: function() {
      return Of(Pa);
    },
    useDebugValue: kf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return Et === null ? Bf(i, t, n) : xg(
        i,
        Et.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Of(Pa)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : eo(t),
        n
      ];
    },
    useSyncExternalStore: Qp,
    useId: _g,
    useHostTransitionStatus: Vf,
    useFormState: cg,
    useActionState: cg,
    useOptimistic: function(t, n) {
      var i = $t();
      return Et !== null ? tg(i, Et, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Af,
    useCacheRefresh: Ng
  };
  Dg.useEffectEvent = hg;
  function If(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : g({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var Yf = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = qn(), f = Ni(o);
      f.payload = n, i != null && (f.callback = i), n = Ci(t, f, o), n !== null && (Tn(n, t, o), Pl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = qn(), f = Ni(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Ci(t, f, o), n !== null && (Tn(n, t, o), Pl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = qn(), o = Ni(i);
      o.tag = 2, n != null && (o.callback = n), n = Ci(t, o, i), n !== null && (Tn(n, t, i), Pl(n, t, i));
    }
  };
  function Ag(t, n, i, o, f, h, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, w) : n.prototype && n.prototype.isPureReactComponent ? !$l(i, o) || !$l(f, h) : !0;
  }
  function zg(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && Yf.enqueueReplaceState(n, n.state, null);
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
  function Og(t) {
    ys(t);
  }
  function jg(t) {
    console.error(t);
  }
  function Lg(t) {
    ys(t);
  }
  function Vs(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Hg(t, n, i) {
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
  function Gf(t, n, i) {
    return i = Ni(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Vs(t, n);
    }, i;
  }
  function kg(t) {
    return t = Ni(t), t.tag = 3, t;
  }
  function Bg(t, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        Hg(n, i, o);
      };
    }
    var w = i.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      Hg(n, i, o), typeof f != "function" && (zi === null ? zi = /* @__PURE__ */ new Set([this]) : zi.add(this));
      var T = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: T !== null ? T : ""
      });
    });
  }
  function SE(t, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && $r(
        n,
        i,
        f,
        !0
      ), i = kn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return ea === null ? Js() : i.alternate === null && Bt === 0 && (Bt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === Rs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), gd(t, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === Rs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), gd(t, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return gd(t, o, f), Js(), !1;
    }
    if (it)
      return n = kn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== cf && (t = Error(l(422), { cause: o }), Gl(Pn(t, i)))) : (o !== cf && (n = Error(l(423), {
        cause: o
      }), Gl(
        Pn(n, i)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Pn(o, i), f = Gf(
        t.stateNode,
        o,
        f
      ), wf(t, f), Bt !== 4 && (Bt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Pn(h, i), co === null ? co = [h] : co.push(h), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Pn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = f & -f, i.lanes |= t, t = Gf(i.stateNode, o, t), wf(i, t), !1;
        case 1:
          if (n = i.type, h = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (zi === null || !zi.has(h))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = kg(f), Bg(
              f,
              t,
              i,
              o
            ), wf(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Xf = Error(l(461)), Ft = !1;
  function on(t, n, i, o) {
    n.child = t === null ? $p(n, null, i, o) : or(
      n,
      t.child,
      i,
      o
    );
  }
  function Ug(t, n, i, o, f) {
    i = i.render;
    var h = n.ref;
    if ("ref" in o) {
      var w = {};
      for (var T in o)
        T !== "ref" && (w[T] = o[T]);
    } else w = o;
    return ar(n), o = Rf(
      t,
      n,
      i,
      w,
      h,
      f
    ), T = Mf(), t !== null && !Ft ? (Tf(t, n, f), Ka(t, n, f)) : (it && T && sf(n), n.flags |= 1, on(t, n, o, f), n.child);
  }
  function Vg(t, n, i, o, f) {
    if (t === null) {
      var h = i.type;
      return typeof h == "function" && !rf(h) && h.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = h, qg(
        t,
        n,
        h,
        o,
        f
      )) : (t = ws(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !ed(t, f)) {
      var w = h.memoizedProps;
      if (i = i.compare, i = i !== null ? i : $l, i(w, o) && t.ref === n.ref)
        return Ka(t, n, f);
    }
    return n.flags |= 1, t = Ga(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function qg(t, n, i, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if ($l(h, o) && t.ref === n.ref)
        if (Ft = !1, n.pendingProps = o = h, ed(t, f))
          (t.flags & 131072) !== 0 && (Ft = !0);
        else
          return n.lanes = t.lanes, Ka(t, n, f);
    }
    return Ff(
      t,
      n,
      i,
      o,
      f
    );
  }
  function $g(t, n, i, o) {
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
        return Ig(
          t,
          n,
          h,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ns(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Gp(n, h) : Ef(), Xp(n);
      else
        return o = n.lanes = 536870912, Ig(
          t,
          n,
          h !== null ? h.baseLanes | i : i,
          i,
          o
        );
    } else
      h !== null ? (Ns(n, h.cachePool), Gp(n, h), Mi(), n.memoizedState = null) : (t !== null && Ns(n, null), Ef(), Mi());
    return on(t, n, f, i), n.child;
  }
  function ao(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Ig(t, n, i, o, f) {
    var h = yf();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: i,
      cachePool: h
    }, t !== null && Ns(n, null), Ef(), Xp(n), t !== null && $r(t, n, o, !0), n.childLanes = f, null;
  }
  function qs(t, n) {
    return n = Is(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function Yg(t, n, i) {
    return or(n, t.child, null, i), t = qs(n, n.pendingProps), t.flags |= 2, Bn(n), n.memoizedState = null, t;
  }
  function EE(t, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = qs(n, o), n.lanes = 536870912, ao(null, t);
        if (Nf(n), (t = Mt) ? (t = ny(
          t,
          Wn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: xi !== null ? { id: Ca, overflow: Ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Rp(t), i.return = n, n.child = i, rn = n, Mt = null)) : t = null, t === null) throw Si(n);
        return n.lanes = 536870912, null;
      }
      return qs(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if (Nf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = Yg(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ft || $r(t, n, i, !1), f = (i & t.childLanes) !== 0, Ft || f) {
        if (o = Rt, o !== null && (w = U(o, i), w !== 0 && w !== h.retryLane))
          throw h.retryLane = w, Wi(t, w), Tn(o, t, w), Xf;
        Js(), n = Yg(
          t,
          n,
          i
        );
      } else
        t = h.treeContext, Mt = ta(w.nextSibling), rn = n, it = !0, wi = null, Wn = !1, t !== null && Dp(n, t), n = qs(n, o), n.flags |= 4096;
      return n;
    }
    return t = Ga(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function $s(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Ff(t, n, i, o, f) {
    return ar(n), i = Rf(
      t,
      n,
      i,
      o,
      void 0,
      f
    ), o = Mf(), t !== null && !Ft ? (Tf(t, n, f), Ka(t, n, f)) : (it && o && sf(n), n.flags |= 1, on(t, n, i, f), n.child);
  }
  function Gg(t, n, i, o, f, h) {
    return ar(n), n.updateQueue = null, i = Zp(
      n,
      o,
      i,
      f
    ), Fp(t), o = Mf(), t !== null && !Ft ? (Tf(t, n, h), Ka(t, n, h)) : (it && o && sf(n), n.flags |= 1, on(t, n, i, h), n.child);
  }
  function Xg(t, n, i, o, f) {
    if (ar(n), n.stateNode === null) {
      var h = Br, w = i.contextType;
      typeof w == "object" && w !== null && (h = ln(w)), h = new i(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = Yf, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, bf(n), w = i.contextType, h.context = typeof w == "object" && w !== null ? ln(w) : Br, h.state = n.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (If(
        n,
        i,
        w,
        o
      ), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && Yf.enqueueReplaceState(h, h.state, null), Jl(n, o, h, f), Kl(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var T = n.memoizedProps, q = ur(i, T);
      h.props = q;
      var ie = h.context, ue = i.contextType;
      w = Br, typeof ue == "object" && ue !== null && (w = ln(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof h.getSnapshotBeforeUpdate == "function", T = n.pendingProps !== T, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (T || ie !== w) && zg(
        n,
        h,
        o,
        w
      ), _i = !1;
      var re = n.memoizedState;
      h.state = re, Jl(n, o, h, f), Kl(), ie = n.memoizedState, T || re !== ie || _i ? (typeof fe == "function" && (If(
        n,
        i,
        fe,
        o
      ), ie = n.memoizedState), (q = _i || Ag(
        n,
        i,
        q,
        o,
        re,
        ie,
        w
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ie), h.props = o, h.state = ie, h.context = w, o = q) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, xf(t, n), w = n.memoizedProps, ue = ur(i, w), h.props = ue, fe = n.pendingProps, re = h.context, ie = i.contextType, q = Br, typeof ie == "object" && ie !== null && (q = ln(ie)), T = i.getDerivedStateFromProps, (ie = typeof T == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== fe || re !== q) && zg(
        n,
        h,
        o,
        q
      ), _i = !1, re = n.memoizedState, h.state = re, Jl(n, o, h, f), Kl();
      var oe = n.memoizedState;
      w !== fe || re !== oe || _i || t !== null && t.dependencies !== null && Es(t.dependencies) ? (typeof T == "function" && (If(
        n,
        i,
        T,
        o
      ), oe = n.memoizedState), (ue = _i || Ag(
        n,
        i,
        ue,
        o,
        re,
        oe,
        q
      ) || t !== null && t.dependencies !== null && Es(t.dependencies)) ? (ie || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, oe, q), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        oe,
        q
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), h.props = o, h.state = oe, h.context = q, o = ue) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && re === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, $s(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = or(
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
  function Fg(t, n, i, o) {
    return tr(), n.flags |= 256, on(t, n, i, o), n.child;
  }
  var Zf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Qf(t) {
    return { baseLanes: t, cachePool: Hp() };
  }
  function Pf(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Vn), t;
  }
  function Zg(t, n, i) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = t !== null && t.memoizedState === null ? !1 : (qt.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Ri(n) : Mi(), (t = Mt) ? (t = ny(
          t,
          Wn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: xi !== null ? { id: Ca, overflow: Ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Rp(t), i.return = n, n.child = i, rn = n, Mt = null)) : t = null, t === null) throw Si(n);
        return zd(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var T = o.children;
      return o = o.fallback, f ? (Mi(), f = n.mode, T = Is(
        { mode: "hidden", children: T },
        f
      ), o = er(
        o,
        f,
        i,
        null
      ), T.return = n, o.return = n, T.sibling = o, n.child = T, o = n.child, o.memoizedState = Qf(i), o.childLanes = Pf(
        t,
        w,
        i
      ), n.memoizedState = Zf, ao(null, o)) : (Ri(n), Kf(n, T));
    }
    var q = t.memoizedState;
    if (q !== null && (T = q.dehydrated, T !== null)) {
      if (h)
        n.flags & 256 ? (Ri(n), n.flags &= -257, n = Jf(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (Mi(), n.child = t.child, n.flags |= 128, n = null) : (Mi(), T = o.fallback, f = n.mode, o = Is(
          { mode: "visible", children: o.children },
          f
        ), T = er(
          T,
          f,
          i,
          null
        ), T.flags |= 2, o.return = n, T.return = n, o.sibling = T, n.child = o, or(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = Qf(i), o.childLanes = Pf(
          t,
          w,
          i
        ), n.memoizedState = Zf, n = ao(null, o));
      else if (Ri(n), zd(T)) {
        if (w = T.nextSibling && T.nextSibling.dataset, w) var ie = w.dgst;
        w = ie, o = Error(l(419)), o.stack = "", o.digest = w, Gl({ value: o, source: null, stack: null }), n = Jf(
          t,
          n,
          i
        );
      } else if (Ft || $r(t, n, i, !1), w = (i & t.childLanes) !== 0, Ft || w) {
        if (w = Rt, w !== null && (o = U(w, i), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, Wi(t, o), Tn(w, t, o), Xf;
        Ad(T) || Js(), n = Jf(
          t,
          n,
          i
        );
      } else
        Ad(T) ? (n.flags |= 192, n.child = t.child, n = null) : (t = q.treeContext, Mt = ta(
          T.nextSibling
        ), rn = n, it = !0, wi = null, Wn = !1, t !== null && Dp(n, t), n = Kf(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Mi(), T = o.fallback, f = n.mode, q = t.child, ie = q.sibling, o = Ga(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, ie !== null ? T = Ga(
      ie,
      T
    ) : (T = er(
      T,
      f,
      i,
      null
    ), T.flags |= 2), T.return = n, o.return = n, o.sibling = T, n.child = o, ao(null, o), o = n.child, T = t.child.memoizedState, T === null ? T = Qf(i) : (f = T.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = Hp(), T = {
      baseLanes: T.baseLanes | i,
      cachePool: f
    }), o.memoizedState = T, o.childLanes = Pf(
      t,
      w,
      i
    ), n.memoizedState = Zf, ao(t.child, o)) : (Ri(n), i = t.child, t = i.sibling, i = Ga(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function Kf(t, n) {
    return n = Is(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Is(t, n) {
    return t = Hn(22, t, null, n), t.lanes = 0, t;
  }
  function Jf(t, n, i) {
    return or(n, t.child, null, i), t = Kf(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function Qg(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), hf(t.return, n, i);
  }
  function Wf(t, n, i, o, f, h) {
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
  function Pg(t, n, i) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var w = qt.current, T = (w & 2) !== 0;
    if (T ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, P(qt, w), on(t, n, o, i), o = it ? Yl : 0, !T && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Qg(t, i, n);
        else if (t.tag === 19)
          Qg(t, i, n);
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
          t = i.alternate, t !== null && As(t) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), Wf(
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
          if (t = f.alternate, t !== null && As(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = i, i = f, f = t;
        }
        Wf(
          n,
          !0,
          i,
          null,
          h,
          o
        );
        break;
      case "together":
        Wf(
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
        if ($r(
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
  function ed(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Es(t)));
  }
  function _E(t, n, i) {
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
          return n.flags |= 128, Nf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Ri(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? Zg(t, n, i) : (Ri(n), t = Ka(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        Ri(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || ($r(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return Pg(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), P(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, $g(
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
  function Kg(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Ft = !0;
      else {
        if (!ed(t, i) && (n.flags & 128) === 0)
          return Ft = !1, _E(
            t,
            n,
            i
          );
        Ft = (t.flags & 131072) !== 0;
      }
    else
      Ft = !1, it && (n.flags & 1048576) !== 0 && Tp(n, Yl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = rr(n.elementType), n.type = t, typeof t == "function")
            rf(t) ? (o = ur(t, o), n.tag = 1, n = Xg(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = Ff(
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
                n.tag = 11, n = Ug(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = Vg(
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
        return Ff(
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
        ), Xg(
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
          f = h.element, xf(t, n), Jl(n, o, null, i);
          var w = n.memoizedState;
          if (o = w.cache, Ei(n, Gt, o), o !== h.cache && mf(
            n,
            [Gt],
            i,
            !0
          ), Kl(), o = w.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Fg(
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
              ), Gl(f), n = Fg(
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
              for (Mt = ta(t.firstChild), rn = n, it = !0, wi = null, Wn = !0, i = $p(
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
        return $s(t, n), t === null ? (i = sy(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, t = n.pendingProps, o = ru(
          he.current
        ).createElement(i), o[ve] = n, o[we] = t, sn(o, i, t), at(o), n.stateNode = o) : n.memoizedState = sy(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ze(n), t === null && it && (o = n.stateNode = ry(
          n.type,
          n.pendingProps,
          he.current
        ), rn = n, Wn = !0, f = Mt, Hi(n.type) ? (Od = f, Mt = ta(o.firstChild)) : Mt = f), on(
          t,
          n,
          n.pendingProps.children,
          i
        ), $s(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Mt) && (o = e_(
          o,
          n.type,
          n.pendingProps,
          Wn
        ), o !== null ? (n.stateNode = o, rn = n, Mt = ta(o.firstChild), Wn = !1, f = !0) : f = !1), f || Si(n)), ze(n), f = n.type, h = n.pendingProps, w = t !== null ? t.memoizedProps : null, o = h.children, Md(f, h) ? o = null : w !== null && Md(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = Rf(
          t,
          n,
          pE,
          null,
          null,
          i
        ), bo._currentValue = f), $s(t, n), on(t, n, o, i), n.child;
      case 6:
        return t === null && it && ((t = i = Mt) && (i = t_(
          i,
          n.pendingProps,
          Wn
        ), i !== null ? (n.stateNode = i, rn = n, Mt = null, t = !0) : t = !1), t || Si(n)), null;
      case 13:
        return Zg(t, n, i);
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
        return Ug(
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
        return Vg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return qg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return Pg(t, n, i);
      case 31:
        return EE(t, n, i);
      case 22:
        return $g(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return ar(n), o = ln(Gt), t === null ? (f = yf(), f === null && (f = Rt, h = pf(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= i), f = h), n.memoizedState = { parent: o, cache: f }, bf(n), Ei(n, Gt, f)) : ((t.lanes & i) !== 0 && (xf(t, n), Jl(n, null, null, i), Kl()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ei(n, Gt, o)) : (o = h.cache, Ei(n, Gt, o), o !== f.cache && mf(
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
  function td(t, n, i, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (_0()) t.flags |= 8192;
        else
          throw lr = Rs, vf;
    } else t.flags &= -16777217;
  }
  function Jg(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !hy(n))
      if (_0()) t.flags |= 8192;
      else
        throw lr = Rs, vf;
  }
  function Ys(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, el |= n);
  }
  function io(t, n) {
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
  function Tt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, i = 0, o = 0;
    if (n)
      for (var f = t.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags & 65011712, o |= f.flags & 65011712, f.return = t, f = f.sibling;
    else
      for (f = t.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags, o |= f.flags, f.return = t, f = f.sibling;
    return t.subtreeFlags |= o, t.childLanes = i, n;
  }
  function NE(t, n, i) {
    var o = n.pendingProps;
    switch (uf(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Tt(n), null;
      case 1:
        return Tt(n), null;
      case 3:
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Za(Gt), ge(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (qr(n) ? Ja(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, ff())), Tt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (Ja(n), h !== null ? (Tt(n), Jg(n, h)) : (Tt(n), td(
          n,
          f,
          null,
          o,
          i
        ))) : h ? h !== t.memoizedState ? (Ja(n), Tt(n), Jg(n, h)) : (Tt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Ja(n), Tt(n), td(
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
            return Tt(n), null;
          }
          t = ne.current, qr(n) ? Ap(n) : (t = ry(f, o, i), n.stateNode = t, Ja(n));
        }
        return Tt(n), null;
      case 5:
        if (Re(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Ja(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Tt(n), null;
          }
          if (h = ne.current, qr(n))
            Ap(n);
          else {
            var w = ru(
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
        return Tt(n), td(
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
          if (t = he.current, qr(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, f = rn, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[ve] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || Z0(t.nodeValue, i)), t || Si(n, !0);
          } else
            t = ru(t).createTextNode(
              o
            ), t[ve] = n, n.stateNode = t;
        }
        return Tt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = qr(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[ve] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Tt(n), t = !1;
          } else
            i = ff(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (Bn(n), n) : (Bn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Tt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = qr(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ve] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Tt(n), f = !1;
          } else
            f = ff(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (Bn(n), n) : (Bn(n), null);
        }
        return Bn(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), Ys(n, n.updateQueue), Tt(n), null);
      case 4:
        return ge(), t === null && Ed(n.stateNode.containerInfo), Tt(n), null;
      case 10:
        return Za(n.type), Tt(n), null;
      case 19:
        if (H(qt), o = n.memoizedState, o === null) return Tt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) io(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = As(t), h !== null) {
                  for (n.flags |= 128, io(o, !1), t = h.updateQueue, n.updateQueue = t, Ys(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Cp(i, t), i = i.sibling;
                  return P(
                    qt,
                    qt.current & 1 | 2
                  ), it && Xa(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Qe() > Qs && (n.flags |= 128, f = !0, io(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = As(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, Ys(n, t), io(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !it)
                return Tt(n), null;
            } else
              2 * Qe() - o.renderingStartTime > Qs && i !== 536870912 && (n.flags |= 128, f = !0, io(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Qe(), t.sibling = null, i = qt.current, P(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && Xa(n, o.treeForkCount), t) : (Tt(n), null);
      case 22:
      case 23:
        return Bn(n), _f(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Tt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Tt(n), i = n.updateQueue, i !== null && Ys(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && H(ir), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Za(Gt), Tt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function CE(t, n) {
    switch (uf(n), n.tag) {
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
          if (Bn(n), n.alternate === null)
            throw Error(l(340));
          tr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (Bn(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
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
        return Bn(n), _f(), t !== null && H(ir), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Za(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Wg(t, n) {
    switch (uf(n), n.tag) {
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
        n.memoizedState !== null && Bn(n);
        break;
      case 13:
        Bn(n);
        break;
      case 19:
        H(qt);
        break;
      case 10:
        Za(n.type);
        break;
      case 22:
      case 23:
        Bn(n), _f(), t !== null && H(ir);
        break;
      case 24:
        Za(Gt);
    }
  }
  function ro(t, n) {
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
    } catch (T) {
      wt(n, n.return, T);
    }
  }
  function Ti(t, n, i) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        o = h;
        do {
          if ((o.tag & t) === t) {
            var w = o.inst, T = w.destroy;
            if (T !== void 0) {
              w.destroy = void 0, f = n;
              var q = i, ie = T;
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
  function e0(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        Yp(n, i);
      } catch (o) {
        wt(t, t.return, o);
      }
    }
  }
  function t0(t, n, i) {
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
  function lo(t, n) {
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
  function Ma(t, n) {
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
  function n0(t) {
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
  function nd(t, n, i) {
    try {
      var o = t.stateNode;
      ZE(o, t.type, i, n), o[we] = n;
    } catch (f) {
      wt(t, t.return, f);
    }
  }
  function a0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Hi(t.type) || t.tag === 4;
  }
  function ad(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || a0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Hi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function id(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Ia));
    else if (o !== 4 && (o === 27 && Hi(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (id(t, n, i), t = t.sibling; t !== null; )
        id(t, n, i), t = t.sibling;
  }
  function Gs(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && Hi(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (Gs(t, n, i), t = t.sibling; t !== null; )
        Gs(t, n, i), t = t.sibling;
  }
  function i0(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      sn(n, o, i), n[ve] = t, n[we] = i;
    } catch (h) {
      wt(t, t.return, h);
    }
  }
  var Wa = !1, Zt = !1, rd = !1, r0 = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function RE(t, n) {
    if (t = t.containerInfo, Cd = du, t = yp(t), Kc(t)) {
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
            var w = 0, T = -1, q = -1, ie = 0, ue = 0, fe = t, re = null;
            t: for (; ; ) {
              for (var oe; fe !== i || f !== 0 && fe.nodeType !== 3 || (T = w + f), fe !== h || o !== 0 && fe.nodeType !== 3 || (q = w + o), fe.nodeType === 3 && (w += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                re = fe, fe = oe;
              for (; ; ) {
                if (fe === t) break t;
                if (re === i && ++ie === f && (T = w), re === h && ++ue === o && (q = w), (oe = fe.nextSibling) !== null) break;
                fe = re, re = fe.parentNode;
              }
              fe = oe;
            }
            i = T === -1 || q === -1 ? null : { start: T, end: q };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Rd = { focusedElem: t, selectionRange: i }, du = !1, en = n; en !== null; )
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
                  Dd(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Dd(t);
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
  function l0(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ti(t, i), o & 4 && ro(5, i);
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
        o & 64 && e0(i), o & 512 && lo(i, i.return);
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
            Yp(t, n);
          } catch (w) {
            wt(i, i.return, w);
          }
        }
        break;
      case 27:
        n === null && o & 4 && i0(i);
      case 26:
      case 5:
        ti(t, i), n === null && o & 4 && n0(i), o & 512 && lo(i, i.return);
        break;
      case 12:
        ti(t, i);
        break;
      case 31:
        ti(t, i), o & 4 && u0(t, i);
        break;
      case 13:
        ti(t, i), o & 4 && c0(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = HE.bind(
          null,
          i
        ), n_(t, i))));
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
  function o0(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, o0(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && rt(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, Nn = !1;
  function ei(t, n, i) {
    for (i = i.child; i !== null; )
      s0(t, n, i), i = i.sibling;
  }
  function s0(t, n, i) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(tn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Zt || Ma(i, n), ei(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Zt || Ma(i, n);
        var o = Dt, f = Nn;
        Hi(i.type) && (Dt = i.stateNode, Nn = !1), ei(
          t,
          n,
          i
        ), go(i.stateNode), Dt = o, Nn = f;
        break;
      case 5:
        Zt || Ma(i, n);
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
        Dt !== null && (Nn ? (t = Dt, ey(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), sl(t)) : ey(Dt, i.stateNode));
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
        Ti(2, i, n), Zt || Ti(4, i, n), ei(
          t,
          n,
          i
        );
        break;
      case 1:
        Zt || (Ma(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && t0(
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
  function u0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        sl(t);
      } catch (i) {
        wt(n, n.return, i);
      }
    }
  }
  function c0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        sl(t);
      } catch (i) {
        wt(n, n.return, i);
      }
  }
  function ME(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new r0()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new r0()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function Xs(t, n) {
    var i = ME(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = kE.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Cn(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], h = t, w = n, T = w;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 27:
              if (Hi(T.type)) {
                Dt = T.stateNode, Nn = !1;
                break e;
              }
              break;
            case 5:
              Dt = T.stateNode, Nn = !1;
              break e;
            case 3:
            case 4:
              Dt = T.stateNode.containerInfo, Nn = !0;
              break e;
          }
          T = T.return;
        }
        if (Dt === null) throw Error(l(160));
        s0(h, w, f), Dt = null, Nn = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        f0(n, t), n = n.sibling;
  }
  var ma = null;
  function f0(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Cn(n, t), Rn(t), o & 4 && (Ti(3, t, t.return), ro(3, t), Ti(5, t, t.return));
        break;
      case 1:
        Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ma(i, i.return)), o & 64 && Wa && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = ma;
        if (Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ma(i, i.return)), o & 4) {
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
                      var w = fy(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (w) {
                        for (var T = 0; T < w.length; T++)
                          if (h = w[T], h.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && h.getAttribute("rel") === (i.rel == null ? null : i.rel) && h.getAttribute("title") === (i.title == null ? null : i.title) && h.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            w.splice(T, 1);
                            break t;
                          }
                      }
                      h = f.createElement(o), sn(h, o, i), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (w = fy(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (T = 0; T < w.length; T++)
                          if (h = w[T], h.getAttribute("content") === (i.content == null ? null : "" + i.content) && h.getAttribute("name") === (i.name == null ? null : i.name) && h.getAttribute("property") === (i.property == null ? null : i.property) && h.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && h.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            w.splice(T, 1);
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
                dy(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = cy(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : h.count--, o === null ? dy(
              f,
              t.type,
              t.stateNode
            ) : cy(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && nd(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ma(i, i.return)), i !== null && o & 4 && nd(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ma(i, i.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            Ar(f, "");
          } catch (_e) {
            wt(t, t.return, _e);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, nd(
          t,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (rd = !0);
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
        if (su = null, f = ma, ma = lu(n.containerInfo), Cn(n, t), ma = f, Rn(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            sl(n.containerInfo);
          } catch (_e) {
            wt(t, t.return, _e);
          }
        rd && (rd = !1, d0(t));
        break;
      case 4:
        o = ma, ma = lu(
          t.stateNode.containerInfo
        ), Cn(n, t), Rn(t), ma = o;
        break;
      case 12:
        Cn(n, t), Rn(t);
        break;
      case 31:
        Cn(n, t), Rn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Xs(t, o)));
        break;
      case 13:
        Cn(n, t), Rn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Zs = Qe()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Xs(t, o)));
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
                    T = q.stateNode;
                    var fe = q.memoizedProps.style, re = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    T.style.display = re == null || typeof re == "boolean" ? "" : ("" + re).trim();
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
                  f ? ty(oe, !0) : ty(q.stateNode, !1);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Xs(t, i))));
        break;
      case 19:
        Cn(n, t), Rn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Xs(t, o)));
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
          if (a0(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, h = ad(t);
            Gs(t, h, f);
            break;
          case 5:
            var w = i.stateNode;
            i.flags & 32 && (Ar(w, ""), i.flags &= -33);
            var T = ad(t);
            Gs(t, T, w);
            break;
          case 3:
          case 4:
            var q = i.stateNode.containerInfo, ie = ad(t);
            id(
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
  function d0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        d0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function ti(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        l0(t, n.alternate, n), n = n.sibling;
  }
  function cr(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ti(4, n, n.return), cr(n);
          break;
        case 1:
          Ma(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && t0(
            n,
            n.return,
            i
          ), cr(n);
          break;
        case 27:
          go(n.stateNode);
        case 26:
        case 5:
          Ma(n, n.return), cr(n);
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
          ), ro(4, h);
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
            var T = o.stateNode;
            try {
              var q = f.shared.hiddenCallbacks;
              if (q !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < q.length; f++)
                  Ip(q[f], T);
            } catch (ie) {
              wt(o, o.return, ie);
            }
          }
          i && w & 64 && e0(h), lo(h, h.return);
          break;
        case 27:
          i0(h);
        case 26:
        case 5:
          ni(
            f,
            h,
            i
          ), i && o === null && w & 4 && n0(h), lo(h, h.return);
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
          ), i && w & 4 && u0(f, h);
          break;
        case 13:
          ni(
            f,
            h,
            i
          ), i && w & 4 && c0(f, h);
          break;
        case 22:
          h.memoizedState === null && ni(
            f,
            h,
            i
          ), lo(h, h.return);
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
  function ld(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Xl(i));
  }
  function od(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Xl(t));
  }
  function pa(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        h0(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function h0(t, n, i, o) {
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
        ), f & 2048 && ro(9, n);
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
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Xl(t)));
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
            var h = n.memoizedProps, w = h.id, T = h.onPostCommit;
            typeof T == "function" && T(
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
        ) : oo(t, n) : h._visibility & 2 ? pa(
          t,
          n,
          i,
          o
        ) : (h._visibility |= 2, Kr(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && ld(w, n);
        break;
      case 24:
        pa(
          t,
          n,
          i,
          o
        ), f & 2048 && od(n.alternate, n);
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
  function Kr(t, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, w = n, T = i, q = o, ie = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          Kr(
            h,
            w,
            T,
            q,
            f
          ), ro(8, w);
          break;
        case 23:
          break;
        case 22:
          var ue = w.stateNode;
          w.memoizedState !== null ? ue._visibility & 2 ? Kr(
            h,
            w,
            T,
            q,
            f
          ) : oo(
            h,
            w
          ) : (ue._visibility |= 2, Kr(
            h,
            w,
            T,
            q,
            f
          )), f && ie & 2048 && ld(
            w.alternate,
            w
          );
          break;
        case 24:
          Kr(
            h,
            w,
            T,
            q,
            f
          ), f && ie & 2048 && od(w.alternate, w);
          break;
        default:
          Kr(
            h,
            w,
            T,
            q,
            f
          );
      }
      n = n.sibling;
    }
  }
  function oo(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            oo(i, o), f & 2048 && ld(
              o.alternate,
              o
            );
            break;
          case 24:
            oo(i, o), f & 2048 && od(o.alternate, o);
            break;
          default:
            oo(i, o);
        }
        n = n.sibling;
      }
  }
  var so = 8192;
  function Jr(t, n, i) {
    if (t.subtreeFlags & so)
      for (t = t.child; t !== null; )
        m0(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function m0(t, n, i) {
    switch (t.tag) {
      case 26:
        Jr(
          t,
          n,
          i
        ), t.flags & so && t.memoizedState !== null && m_(
          i,
          ma,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Jr(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = ma;
        ma = lu(t.stateNode.containerInfo), Jr(
          t,
          n,
          i
        ), ma = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = so, so = 16777216, Jr(
          t,
          n,
          i
        ), so = o) : Jr(
          t,
          n,
          i
        ));
        break;
      default:
        Jr(
          t,
          n,
          i
        );
    }
  }
  function p0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function uo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, y0(
            o,
            t
          );
        }
      p0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        g0(t), t = t.sibling;
  }
  function g0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        uo(t), t.flags & 2048 && Ti(9, t, t.return);
        break;
      case 3:
        uo(t);
        break;
      case 12:
        uo(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, Fs(t)) : uo(t);
        break;
      default:
        uo(t);
    }
  }
  function Fs(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, y0(
            o,
            t
          );
        }
      p0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Ti(8, n, n.return), Fs(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, Fs(n));
          break;
        default:
          Fs(n);
      }
      t = t.sibling;
    }
  }
  function y0(t, n) {
    for (; en !== null; ) {
      var i = en;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ti(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Xl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, en = o;
      else
        e: for (i = t; en !== null; ) {
          o = en;
          var f = o.sibling, h = o.return;
          if (o0(o), o === i) {
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
  var TE = {
    getCacheForType: function(t) {
      var n = ln(Gt), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return ln(Gt).controller.signal;
    }
  }, DE = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Rt = null, Pe = null, et = 0, xt = 0, Un = null, Di = !1, Wr = !1, sd = !1, ai = 0, Bt = 0, Ai = 0, fr = 0, ud = 0, Vn = 0, el = 0, co = null, Mn = null, cd = !1, Zs = 0, v0 = 0, Qs = 1 / 0, Ps = null, zi = null, Jt = 0, Oi = null, tl = null, ii = 0, fd = 0, dd = null, b0 = null, fo = 0, hd = null;
  function qn() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : M.T !== null ? bd() : de();
  }
  function x0() {
    if (Vn === 0)
      if ((et & 536870912) === 0 || it) {
        var t = zn;
        zn <<= 1, (zn & 3932160) === 0 && (zn = 262144), Vn = t;
      } else Vn = 536870912;
    return t = kn.current, t !== null && (t.flags |= 32), Vn;
  }
  function Tn(t, n, i) {
    (t === Rt && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null) && (nl(t, 0), ji(
      t,
      et,
      Vn,
      !1
    )), pt(t, i), ((ht & 2) === 0 || t !== Rt) && (t === Rt && ((ht & 2) === 0 && (fr |= i), Bt === 4 && ji(
      t,
      et,
      Vn,
      !1
    )), Ta(t));
  }
  function w0(t, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || vt(t, n), f = o ? OE(t, n) : pd(t, n, !0), h = o;
    do {
      if (f === 0) {
        Wr && !o && ji(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, h && !AE(i)) {
          f = pd(t, n, !1), h = !1;
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
              var T = t;
              f = co;
              var q = T.current.memoizedState.isDehydrated;
              if (q && (nl(T, w).flags |= 256), w = pd(
                T,
                w,
                !1
              ), w !== 2) {
                if (sd && !q) {
                  T.errorRecoveryDisabledLanes |= h, fr |= h, f = 4;
                  break e;
                }
                h = Mn, Mn = f, h !== null && (Mn === null ? Mn = h : Mn.push.apply(
                  Mn,
                  h
                ));
              }
              f = w;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          nl(t, 0), ji(t, n, 0, !0);
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
                Vn,
                !Di
              );
              break e;
            case 2:
              Mn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = Zs + 300 - Qe(), 10 < f)) {
            if (ji(
              o,
              n,
              Vn,
              !Di
            ), He(o, 0, !0) !== 0) break e;
            ii = n, o.timeoutHandle = J0(
              S0.bind(
                null,
                o,
                i,
                Mn,
                Ps,
                cd,
                n,
                Vn,
                fr,
                el,
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
          S0(
            o,
            i,
            Mn,
            Ps,
            cd,
            n,
            Vn,
            fr,
            el,
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
    Ta(t);
  }
  function S0(t, n, i, o, f, h, w, T, q, ie, ue, fe, re, oe) {
    if (t.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ia
      }, m0(
        n,
        h,
        fe
      );
      var _e = (h & 62914560) === h ? Zs - Qe() : (h & 4194048) === h ? v0 - Qe() : 0;
      if (_e = p_(
        fe,
        _e
      ), _e !== null) {
        ii = h, t.cancelPendingCommit = _e(
          D0.bind(
            null,
            t,
            n,
            h,
            i,
            o,
            f,
            w,
            T,
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
    D0(
      t,
      n,
      h,
      i,
      o,
      f,
      w,
      T,
      q
    );
  }
  function AE(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Ln(h(), f)) return !1;
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
    n &= ~ud, n &= ~fr, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), w = 1 << h;
      o[h] = -1, f &= ~w;
    }
    i !== 0 && ca(t, i, n);
  }
  function Ks() {
    return (ht & 6) === 0 ? (ho(0), !1) : !0;
  }
  function md() {
    if (Pe !== null) {
      if (xt === 0)
        var t = Pe.return;
      else
        t = Pe, Fa = nr = null, Df(t), Xr = null, Zl = 0, t = Pe;
      for (; t !== null; )
        Wg(t.alternate, t), t = t.return;
      Pe = null;
    }
  }
  function nl(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, KE(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), ii = 0, md(), Rt = t, Pe = i = Ga(t.current, null), et = n, xt = 0, Un = null, Di = !1, Wr = vt(t, n), sd = !1, el = Vn = ud = fr = Ai = Bt = 0, Mn = co = null, cd = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return ai = n, vs(), i;
  }
  function E0(t, n) {
    qe = null, M.H = no, n === Gr || n === Cs ? (n = Up(), xt = 3) : n === vf ? (n = Up(), xt = 4) : xt = n === Xf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Un = n, Pe === null && (Bt = 1, Vs(
      t,
      Pn(n, t.current)
    ));
  }
  function _0() {
    var t = kn.current;
    return t === null ? !0 : (et & 4194048) === et ? ea === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === ea : !1;
  }
  function N0() {
    var t = M.H;
    return M.H = no, t === null ? no : t;
  }
  function C0() {
    var t = M.A;
    return M.A = TE, t;
  }
  function Js() {
    Bt = 4, Di || (et & 4194048) !== et && kn.current !== null || (Wr = !0), (Ai & 134217727) === 0 && (fr & 134217727) === 0 || Rt === null || ji(
      Rt,
      et,
      Vn,
      !1
    );
  }
  function pd(t, n, i) {
    var o = ht;
    ht |= 2;
    var f = N0(), h = C0();
    (Rt !== t || et !== n) && (Ps = null, nl(t, n)), n = !1;
    var w = Bt;
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          var T = Pe, q = Un;
          switch (xt) {
            case 8:
              md(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              kn.current === null && (n = !0);
              var ie = xt;
              if (xt = 0, Un = null, al(t, T, q, ie), i && Wr) {
                w = 0;
                break e;
              }
              break;
            default:
              ie = xt, xt = 0, Un = null, al(t, T, q, ie);
          }
        }
        zE(), w = Bt;
        break;
      } catch (ue) {
        E0(t, ue);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Fa = nr = null, ht = o, M.H = f, M.A = h, Pe === null && (Rt = null, et = 0, vs()), w;
  }
  function zE() {
    for (; Pe !== null; ) R0(Pe);
  }
  function OE(t, n) {
    var i = ht;
    ht |= 2;
    var o = N0(), f = C0();
    Rt !== t || et !== n ? (Ps = null, Qs = Qe() + 500, nl(t, n)) : Wr = vt(
      t,
      n
    );
    e: do
      try {
        if (xt !== 0 && Pe !== null) {
          n = Pe;
          var h = Un;
          t: switch (xt) {
            case 1:
              xt = 0, Un = null, al(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (kp(h)) {
                xt = 0, Un = null, M0(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Rt !== t || (xt = 7), Ta(t);
              }, h.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              kp(h) ? (xt = 0, Un = null, M0(n)) : (xt = 0, Un = null, al(t, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (Pe.tag) {
                case 26:
                  w = Pe.memoizedState;
                case 5:
                case 27:
                  var T = Pe;
                  if (w ? hy(w) : T.stateNode.complete) {
                    xt = 0, Un = null;
                    var q = T.sibling;
                    if (q !== null) Pe = q;
                    else {
                      var ie = T.return;
                      ie !== null ? (Pe = ie, Ws(ie)) : Pe = null;
                    }
                    break t;
                  }
              }
              xt = 0, Un = null, al(t, n, h, 5);
              break;
            case 6:
              xt = 0, Un = null, al(t, n, h, 6);
              break;
            case 8:
              md(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        jE();
        break;
      } catch (ue) {
        E0(t, ue);
      }
    while (!0);
    return Fa = nr = null, M.H = o, M.A = f, ht = i, Pe !== null ? 0 : (Rt = null, et = 0, vs(), Bt);
  }
  function jE() {
    for (; Pe !== null && !Je(); )
      R0(Pe);
  }
  function R0(t) {
    var n = Kg(t.alternate, t, ai);
    t.memoizedProps = t.pendingProps, n === null ? Ws(t) : Pe = n;
  }
  function M0(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Gg(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = Gg(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        Df(n);
      default:
        Wg(i, n), n = Pe = Cp(n, ai), n = Kg(i, n, ai);
    }
    t.memoizedProps = t.pendingProps, n === null ? Ws(t) : Pe = n;
  }
  function al(t, n, i, o) {
    Fa = nr = null, Df(n), Xr = null, Zl = 0;
    var f = n.return;
    try {
      if (SE(
        t,
        f,
        n,
        i,
        et
      )) {
        Bt = 1, Vs(
          t,
          Pn(i, t.current)
        ), Pe = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Pe = f, h;
      Bt = 1, Vs(
        t,
        Pn(i, t.current)
      ), Pe = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : Wr || (et & 536870912) !== 0 ? t = !1 : (Di = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = kn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), T0(n, t)) : Ws(n);
  }
  function Ws(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        T0(
          n,
          Di
        );
        return;
      }
      t = n.return;
      var i = NE(
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
  function T0(t, n) {
    do {
      var i = CE(t.alternate, t);
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
  function D0(t, n, i, o, f, h, w, T, q) {
    t.cancelPendingCommit = null;
    do
      eu();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= nf, Kt(
        t,
        i,
        h,
        w,
        T,
        q
      ), t === Rt && (Pe = Rt = null, et = 0), tl = n, Oi = t, ii = i, fd = h, dd = f, b0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, BE(Lt, function() {
        return L0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = M.T, M.T = null, f = L.p, L.p = 2, w = ht, ht |= 4;
        try {
          RE(t, n, i);
        } finally {
          ht = w, L.p = f, M.T = o;
        }
      }
      Jt = 1, A0(), z0(), O0();
    }
  }
  function A0() {
    if (Jt === 1) {
      Jt = 0;
      var t = Oi, n = tl, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = M.T, M.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          f0(n, t);
          var h = Rd, w = yp(t.containerInfo), T = h.focusedElem, q = h.selectionRange;
          if (w !== T && T && T.ownerDocument && gp(
            T.ownerDocument.documentElement,
            T
          )) {
            if (q !== null && Kc(T)) {
              var ie = q.start, ue = q.end;
              if (ue === void 0 && (ue = ie), "selectionStart" in T)
                T.selectionStart = ie, T.selectionEnd = Math.min(
                  ue,
                  T.value.length
                );
              else {
                var fe = T.ownerDocument || document, re = fe && fe.defaultView || window;
                if (re.getSelection) {
                  var oe = re.getSelection(), _e = T.textContent.length, Le = Math.min(q.start, _e), Nt = q.end === void 0 ? Le : Math.min(q.end, _e);
                  !oe.extend && Le > Nt && (w = Nt, Nt = Le, Le = w);
                  var J = pp(
                    T,
                    Le
                  ), X = pp(
                    T,
                    Nt
                  );
                  if (J && X && (oe.rangeCount !== 1 || oe.anchorNode !== J.node || oe.anchorOffset !== J.offset || oe.focusNode !== X.node || oe.focusOffset !== X.offset)) {
                    var ae = fe.createRange();
                    ae.setStart(J.node, J.offset), oe.removeAllRanges(), Le > Nt ? (oe.addRange(ae), oe.extend(X.node, X.offset)) : (ae.setEnd(X.node, X.offset), oe.addRange(ae));
                  }
                }
              }
            }
            for (fe = [], oe = T; oe = oe.parentNode; )
              oe.nodeType === 1 && fe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof T.focus == "function" && T.focus(), T = 0; T < fe.length; T++) {
              var ce = fe[T];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          du = !!Cd, Rd = Cd = null;
        } finally {
          ht = f, L.p = o, M.T = i;
        }
      }
      t.current = n, Jt = 2;
    }
  }
  function z0() {
    if (Jt === 2) {
      Jt = 0;
      var t = Oi, n = tl, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = M.T, M.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          l0(t, n.alternate, n);
        } finally {
          ht = f, L.p = o, M.T = i;
        }
      }
      Jt = 3;
    }
  }
  function O0() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Ze();
      var t = Oi, n = tl, i = ii, o = b0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, tl = Oi = null, j0(t, t.pendingLanes));
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
        n = M.T, f = L.p, L.p = 2, M.T = null;
        try {
          for (var h = t.onRecoverableError, w = 0; w < o.length; w++) {
            var T = o[w];
            h(T.value, {
              componentStack: T.stack
            });
          }
        } finally {
          M.T = n, L.p = f;
        }
      }
      (ii & 3) !== 0 && eu(), Ta(t), f = t.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? t === hd ? fo++ : (fo = 0, hd = t) : fo = 0, ho(0);
    }
  }
  function j0(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Xl(n)));
  }
  function eu() {
    return A0(), z0(), O0(), L0();
  }
  function L0() {
    if (Jt !== 5) return !1;
    var t = Oi, n = fd;
    fd = 0;
    var i = W(ii), o = M.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, M.T = null, i = dd, dd = null;
      var h = Oi, w = ii;
      if (Jt = 0, tl = Oi = null, ii = 0, (ht & 6) !== 0) throw Error(l(331));
      var T = ht;
      if (ht |= 4, g0(h.current), h0(
        h,
        h.current,
        w,
        i
      ), ht = T, ho(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(tn, h);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, M.T = o, j0(t, n);
    }
  }
  function H0(t, n, i) {
    n = Pn(i, n), n = Gf(t.stateNode, n, 2), t = Ci(t, n, 2), t !== null && (pt(t, 2), Ta(t));
  }
  function wt(t, n, i) {
    if (t.tag === 3)
      H0(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          H0(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (zi === null || !zi.has(o))) {
            t = Pn(i, t), i = kg(2), o = Ci(n, i, 2), o !== null && (Bg(
              i,
              o,
              n,
              t
            ), pt(o, 2), Ta(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function gd(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new DE();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (sd = !0, f.add(i), t = LE.bind(null, t, n, i), n.then(t, t));
  }
  function LE(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Rt === t && (et & i) === i && (Bt === 4 || Bt === 3 && (et & 62914560) === et && 300 > Qe() - Zs ? (ht & 2) === 0 && nl(t, 0) : ud |= i, el === et && (el = 0)), Ta(t);
  }
  function k0(t, n) {
    n === 0 && (n = Vt()), t = Wi(t, n), t !== null && (pt(t, n), Ta(t));
  }
  function HE(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), k0(t, i);
  }
  function kE(t, n) {
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
    o !== null && o.delete(n), k0(t, i);
  }
  function BE(t, n) {
    return Ie(t, n);
  }
  var tu = null, il = null, yd = !1, nu = !1, vd = !1, Li = 0;
  function Ta(t) {
    t !== il && t.next === null && (il === null ? tu = il = t : il = il.next = t), nu = !0, yd || (yd = !0, VE());
  }
  function ho(t, n) {
    if (!vd && nu) {
      vd = !0;
      do
        for (var i = !1, o = tu; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var w = o.suspendedLanes, T = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(w & ~T), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (i = !0, q0(o, h));
          } else
            h = et, h = He(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || vt(o, h) || (i = !0, q0(o, h));
          o = o.next;
        }
      while (i);
      vd = !1;
    }
  }
  function UE() {
    B0();
  }
  function B0() {
    nu = yd = !1;
    var t = 0;
    Li !== 0 && PE() && (t = Li);
    for (var n = Qe(), i = null, o = tu; o !== null; ) {
      var f = o.next, h = U0(o, n);
      h === 0 ? (o.next = null, i === null ? tu = f : i.next = f, f === null && (il = i)) : (i = o, (t !== 0 || (h & 3) !== 0) && (nu = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || ho(t), Li !== 0 && (Li = 0);
  }
  function U0(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var w = 31 - Ut(h), T = 1 << w, q = f[w];
      q === -1 ? ((T & i) === 0 || (T & o) !== 0) && (f[w] = Ht(T, n)) : q <= n && (t.expiredLanes |= T), h &= ~T;
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
          i = Yt;
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
      return o = V0.bind(null, t), i = Ie(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && St(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function V0(t, n) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (eu() && t.callbackNode !== i)
      return null;
    var o = et;
    return o = He(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (w0(t, o, n), U0(t, Qe()), t.callbackNode != null && t.callbackNode === i ? V0.bind(null, t) : null);
  }
  function q0(t, n) {
    if (eu()) return null;
    w0(t, n, !0);
  }
  function VE() {
    JE(function() {
      (ht & 6) !== 0 ? Ie(
        yt,
        UE
      ) : B0();
    });
  }
  function bd() {
    if (Li === 0) {
      var t = Ir;
      t === 0 && (t = ua, ua <<= 1, (ua & 261888) === 0 && (ua = 256)), Li = t;
    }
    return Li;
  }
  function $0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : cs("" + t);
  }
  function I0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function qE(t, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var h = $0(
        (f[we] || null).action
      ), w = o.submitter;
      w && (n = (n = w[we] || null) ? $0(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var T = new ms(
        "action",
        "action",
        null,
        o,
        f
      );
      t.push({
        event: T,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (Li !== 0) {
                  var q = w ? I0(f, w) : new FormData(f);
                  Uf(
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
                typeof h == "function" && (T.preventDefault(), q = w ? I0(f, w) : new FormData(f), Uf(
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
  for (var xd = 0; xd < tf.length; xd++) {
    var wd = tf[xd], $E = wd.toLowerCase(), IE = wd[0].toUpperCase() + wd.slice(1);
    ha(
      $E,
      "on" + IE
    );
  }
  ha(xp, "onAnimationEnd"), ha(wp, "onAnimationIteration"), ha(Sp, "onAnimationStart"), ha("dblclick", "onDoubleClick"), ha("focusin", "onFocus"), ha("focusout", "onBlur"), ha(rE, "onTransitionRun"), ha(lE, "onTransitionStart"), ha(oE, "onTransitionCancel"), ha(Ep, "onTransitionEnd"), nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]), cn(
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
  var mo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), YE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mo)
  );
  function Y0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], f = o.event;
      o = o.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var w = o.length - 1; 0 <= w; w--) {
            var T = o[w], q = T.instance, ie = T.currentTarget;
            if (T = T.listener, q !== h && f.isPropagationStopped())
              break e;
            h = T, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              ys(ue);
            }
            f.currentTarget = null, h = q;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (T = o[w], q = T.instance, ie = T.currentTarget, T = T.listener, q !== h && f.isPropagationStopped())
              break e;
            h = T, f.currentTarget = ie;
            try {
              h(f);
            } catch (ue) {
              ys(ue);
            }
            f.currentTarget = null, h = q;
          }
      }
    }
  }
  function Ke(t, n) {
    var i = n[Te];
    i === void 0 && (i = n[Te] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (G0(n, t, 2, !1), i.add(o));
  }
  function Sd(t, n, i) {
    var o = 0;
    n && (o |= 4), G0(
      i,
      t,
      o,
      n
    );
  }
  var au = "_reactListening" + Math.random().toString(36).slice(2);
  function Ed(t) {
    if (!t[au]) {
      t[au] = !0, Na.forEach(function(i) {
        i !== "selectionchange" && (YE.has(i) || Sd(i, !1, t), Sd(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[au] || (n[au] = !0, Sd("selectionchange", !1, n));
    }
  }
  function G0(t, n, i, o) {
    switch (xy(n)) {
      case 2:
        var f = v_;
        break;
      case 8:
        f = b_;
        break;
      default:
        f = Bd;
    }
    i = f.bind(
      null,
      n,
      i,
      t
    ), f = void 0, !$c || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, i, !0) : f !== void 0 ? t.addEventListener(n, i, {
      passive: f
    }) : t.addEventListener(n, i, !1);
  }
  function _d(t, n, i, o, f) {
    var h = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var w = o.tag;
        if (w === 3 || w === 4) {
          var T = o.stateNode.containerInfo;
          if (T === f) break;
          if (w === 4)
            for (w = o.return; w !== null; ) {
              var q = w.tag;
              if ((q === 3 || q === 4) && w.stateNode.containerInfo === f)
                return;
              w = w.return;
            }
          for (; T !== null; ) {
            if (w = Ct(T), w === null) return;
            if (q = w.tag, q === 5 || q === 6 || q === 26 || q === 27) {
              o = h = w;
              continue e;
            }
            T = T.parentNode;
          }
        }
        o = o.return;
      }
    Pm(function() {
      var ie = h, ue = Vc(i), fe = [];
      e: {
        var re = _p.get(t);
        if (re !== void 0) {
          var oe = ms, _e = t;
          switch (t) {
            case "keypress":
              if (ds(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = kS;
              break;
            case "focusin":
              _e = "focus", oe = Xc;
              break;
            case "focusout":
              _e = "blur", oe = Xc;
              break;
            case "beforeblur":
            case "afterblur":
              oe = Xc;
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
              oe = Wm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = NS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = VS;
              break;
            case xp:
            case wp:
            case Sp:
              oe = MS;
              break;
            case Ep:
              oe = $S;
              break;
            case "scroll":
            case "scrollend":
              oe = ES;
              break;
            case "wheel":
              oe = YS;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = DS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = tp;
              break;
            case "toggle":
            case "beforetoggle":
              oe = XS;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (t === "scroll" || t === "scrollend"), J = Le ? re !== null ? re + "Capture" : null : re;
          Le = [];
          for (var X = ie, ae; X !== null; ) {
            var ce = X;
            if (ae = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ae === null || J === null || (ce = Ll(X, J), ce != null && Le.push(
              po(X, ce, ae)
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
          if (re = t === "mouseover" || t === "pointerover", oe = t === "mouseout" || t === "pointerout", re && i !== Uc && (_e = i.relatedTarget || i.fromElement) && (Ct(_e) || _e[be]))
            break e;
          if ((oe || re) && (re = ue.window === ue ? ue : (re = ue.ownerDocument) ? re.defaultView || re.parentWindow : window, oe ? (_e = i.relatedTarget || i.toElement, oe = ie, _e = _e ? Ct(_e) : null, _e !== null && (Nt = u(_e), Le = _e.tag, _e !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (_e = null)) : (oe = null, _e = ie), oe !== _e)) {
            if (Le = Wm, ce = "onMouseLeave", J = "onMouseEnter", X = "mouse", (t === "pointerout" || t === "pointerover") && (Le = tp, ce = "onPointerLeave", J = "onPointerEnter", X = "pointer"), Nt = oe == null ? re : We(oe), ae = _e == null ? re : We(_e), re = new Le(
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
                for (Le = GE, J = oe, X = _e, ae = 0, ce = J; ce; ce = Le(ce))
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
            oe !== null && X0(
              fe,
              re,
              oe,
              Le,
              !1
            ), _e !== null && Nt !== null && X0(
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
            var ut = up;
          else if (op(re))
            if (cp)
              ut = nE;
            else {
              ut = eE;
              var Ne = WS;
            }
          else
            oe = re.nodeName, !oe || oe.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? ie && Bc(ie.elementType) && (ut = up) : ut = tE;
          if (ut && (ut = ut(t, ie))) {
            sp(
              fe,
              ut,
              i,
              ue
            );
            break e;
          }
          Ne && Ne(t, re, ie), t === "focusout" && ie && re.type === "number" && ie.memoizedProps.value != null && Ol(re, "number", re.value);
        }
        switch (Ne = ie ? We(ie) : window, t) {
          case "focusin":
            (op(Ne) || Ne.contentEditable === "true") && (Lr = Ne, Jc = ie, Il = null);
            break;
          case "focusout":
            Il = Jc = Lr = null;
            break;
          case "mousedown":
            Wc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Wc = !1, vp(fe, i, ue);
            break;
          case "selectionchange":
            if (iE) break;
          case "keydown":
          case "keyup":
            vp(fe, i, ue);
        }
        var Ye;
        if (Zc)
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
          jr ? rp(t, i) && (tt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (np && i.locale !== "ko" && (jr || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && jr && (Ye = Km()) : (bi = ue, Ic = "value" in bi ? bi.value : bi.textContent, jr = !0)), Ne = iu(ie, tt), 0 < Ne.length && (tt = new ep(
          tt,
          t,
          null,
          i,
          ue
        ), fe.push({ event: tt, listeners: Ne }), Ye ? tt.data = Ye : (Ye = lp(i), Ye !== null && (tt.data = Ye)))), (Ye = ZS ? QS(t, i) : PS(t, i)) && (tt = iu(ie, "onBeforeInput"), 0 < tt.length && (Ne = new ep(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: tt
        }), Ne.data = Ye)), qE(
          fe,
          t,
          ie,
          i,
          ue
        );
      }
      Y0(fe, n);
    });
  }
  function po(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function iu(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = Ll(t, i), f != null && o.unshift(
        po(t, f, h)
      ), f = Ll(t, n), f != null && o.push(
        po(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function GE(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function X0(t, n, i, o, f) {
    for (var h = n._reactName, w = []; i !== null && i !== o; ) {
      var T = i, q = T.alternate, ie = T.stateNode;
      if (T = T.tag, q !== null && q === o) break;
      T !== 5 && T !== 26 && T !== 27 || ie === null || (q = ie, f ? (ie = Ll(i, h), ie != null && w.unshift(
        po(i, ie, q)
      )) : f || (ie = Ll(i, h), ie != null && w.push(
        po(i, ie, q)
      ))), i = i.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var XE = /\r\n?/g, FE = /\u0000|\uFFFD/g;
  function F0(t) {
    return (typeof t == "string" ? t : "" + t).replace(XE, `
`).replace(FE, "");
  }
  function Z0(t, n) {
    return n = F0(n), F0(t) === n;
  }
  function _t(t, n, i, o, f, h) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Ar(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Ar(t, "" + o);
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
        Zm(t, o, h);
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
        o = cs("" + o), t.setAttribute(i, o);
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
        o = cs("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = Ia);
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
        i = cs("" + o), t.setAttributeNS(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = wS.get(i) || i, fa(t, i, o));
    }
  }
  function Nd(t, n, i, o, f, h) {
    switch (i) {
      case "style":
        Zm(t, o, h);
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
        typeof o == "string" ? Ar(t, o) : (typeof o == "number" || typeof o == "bigint") && Ar(t, "" + o);
        break;
      case "onScroll":
        o != null && Ke("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Ia);
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
        if (!On.hasOwnProperty(i))
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
        var T = h = w = f = null, q = null, ie = null;
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
                  T = ue;
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
        Dr(
          t,
          h,
          T,
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
          if (i.hasOwnProperty(f) && (T = i[f], T != null))
            switch (f) {
              case "value":
                h = T;
                break;
              case "defaultValue":
                w = T;
                break;
              case "multiple":
                o = T;
              default:
                _t(t, n, f, T, i, null);
            }
        n = h, i = w, t.multiple = !!o, n != null ? vi(t, !!o, n, !1) : i != null && vi(t, !!o, i, !0);
        return;
      case "textarea":
        Ke("invalid", t), h = f = o = null;
        for (w in i)
          if (i.hasOwnProperty(w) && (T = i[w], T != null))
            switch (w) {
              case "value":
                o = T;
                break;
              case "defaultValue":
                f = T;
                break;
              case "children":
                h = T;
                break;
              case "dangerouslySetInnerHTML":
                if (T != null) throw Error(l(91));
                break;
              default:
                _t(t, n, w, T, i, null);
            }
        Xm(t, o, f, h);
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
        for (o = 0; o < mo.length; o++)
          Ke(mo[o], t);
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
        if (Bc(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (o = i[ue], o !== void 0 && Nd(
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
    for (T in i)
      i.hasOwnProperty(T) && (o = i[T], o != null && _t(t, n, T, o, i, null));
  }
  function ZE(t, n, i, o) {
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
        var f = null, h = null, w = null, T = null, q = null, ie = null, ue = null;
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
                T = oe;
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
          T,
          q,
          ie,
          ue,
          h,
          f
        );
        return;
      case "select":
        oe = w = T = re = null;
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
                T = h;
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
        n = T, i = w, o = oe, re != null ? vi(t, !!i, re, !1) : !!o != !!i && (n != null ? vi(t, !!i, n, !0) : vi(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        oe = re = null;
        for (T in i)
          if (f = i[T], i.hasOwnProperty(T) && f != null && !o.hasOwnProperty(T))
            switch (T) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(t, n, T, null, o, f);
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
        jl(t, re, oe);
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
        if (Bc(n)) {
          for (var Nt in i)
            re = i[Nt], i.hasOwnProperty(Nt) && re !== void 0 && !o.hasOwnProperty(Nt) && Nd(
              t,
              n,
              Nt,
              void 0,
              o,
              re
            );
          for (ue in o)
            re = o[ue], oe = i[ue], !o.hasOwnProperty(ue) || re === oe || re === void 0 && oe === void 0 || Nd(
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
  function Q0(t) {
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
  function QE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], h = f.transferSize, w = f.initiatorType, T = f.duration;
        if (h && T && Q0(w)) {
          for (w = 0, T = f.responseEnd, o += 1; o < i.length; o++) {
            var q = i[o], ie = q.startTime;
            if (ie > T) break;
            var ue = q.transferSize, fe = q.initiatorType;
            ue && Q0(fe) && (q = q.responseEnd, w += ue * (q < T ? 1 : (T - ie) / (q - ie)));
          }
          if (--o, n += 8 * (h + w) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Cd = null, Rd = null;
  function ru(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function P0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function K0(t, n) {
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
  function Md(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Td = null;
  function PE() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Td ? !1 : (Td = t, !0) : (Td = null, !1);
  }
  var J0 = typeof setTimeout == "function" ? setTimeout : void 0, KE = typeof clearTimeout == "function" ? clearTimeout : void 0, W0 = typeof Promise == "function" ? Promise : void 0, JE = typeof queueMicrotask == "function" ? queueMicrotask : typeof W0 < "u" ? function(t) {
    return W0.resolve(null).then(t).catch(WE);
  } : J0;
  function WE(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Hi(t) {
    return t === "head";
  }
  function ey(t, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (t.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(f), sl(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          go(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, go(i);
          for (var h = i.firstChild; h; ) {
            var w = h.nextSibling, T = h.nodeName;
            h[Ge] || T === "SCRIPT" || T === "STYLE" || T === "LINK" && h.rel.toLowerCase() === "stylesheet" || i.removeChild(h), h = w;
          }
        } else
          i === "body" && go(t.ownerDocument.body);
      i = f;
    } while (i);
    sl(n);
  }
  function ty(t, n) {
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
  function Dd(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Dd(i), rt(i);
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
  function e_(t, n, i, o) {
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
  function t_(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ta(t.nextSibling), t === null)) return null;
    return t;
  }
  function ny(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ta(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ad(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function zd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function n_(t, n) {
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
  var Od = null;
  function ay(t) {
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
  function iy(t) {
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
  function ry(t, n, i) {
    switch (n = ru(i), t) {
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
  function go(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    rt(t);
  }
  var na = /* @__PURE__ */ new Map(), ly = /* @__PURE__ */ new Set();
  function lu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ri = L.d;
  L.d = {
    f: a_,
    r: i_,
    D: r_,
    C: l_,
    L: o_,
    m: s_,
    X: c_,
    S: u_,
    M: f_
  };
  function a_() {
    var t = ri.f(), n = Ks();
    return t || n;
  }
  function i_(t) {
    var n = st(t);
    n !== null && n.tag === 5 && n.type === "form" ? Eg(n) : ri.r(t);
  }
  var rl = typeof document > "u" ? null : document;
  function oy(t, n, i) {
    var o = rl;
    if (o && typeof n == "string" && n) {
      var f = an(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), ly.has(f) || (ly.add(f), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), sn(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function r_(t) {
    ri.D(t), oy("dns-prefetch", t, null);
  }
  function l_(t, n) {
    ri.C(t, n), oy("preconnect", t, n);
  }
  function o_(t, n, i) {
    ri.L(t, n, i);
    var o = rl;
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
          h = ll(t);
          break;
        case "script":
          h = ol(t);
      }
      na.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), na.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(yo(h)) || n === "script" && o.querySelector(vo(h)) || (n = o.createElement("link"), sn(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function s_(t, n) {
    ri.m(t, n);
    var i = rl;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + an(o) + '"][href="' + an(t) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = ol(t);
      }
      if (!na.has(h) && (t = g({ rel: "modulepreload", href: t }, n), na.set(h, t), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(vo(h)))
              return;
        }
        o = i.createElement("link"), sn(o, "link", t), at(o), i.head.appendChild(o);
      }
    }
  }
  function u_(t, n, i) {
    ri.S(t, n, i);
    var o = rl;
    if (o && t) {
      var f = jt(o).hoistableStyles, h = ll(t);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var T = { loading: 0, preload: null };
        if (w = o.querySelector(
          yo(h)
        ))
          T.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = na.get(h)) && jd(t, i);
          var q = w = o.createElement("link");
          at(q), sn(q, "link", t), q._p = new Promise(function(ie, ue) {
            q.onload = ie, q.onerror = ue;
          }), q.addEventListener("load", function() {
            T.loading |= 1;
          }), q.addEventListener("error", function() {
            T.loading |= 2;
          }), T.loading |= 4, ou(w, n, o);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: T
        }, f.set(h, w);
      }
    }
  }
  function c_(t, n) {
    ri.X(t, n);
    var i = rl;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = ol(t), h = o.get(f);
      h || (h = i.querySelector(vo(f)), h || (t = g({ src: t, async: !0 }, n), (n = na.get(f)) && Ld(t, n), h = i.createElement("script"), at(h), sn(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function f_(t, n) {
    ri.M(t, n);
    var i = rl;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = ol(t), h = o.get(f);
      h || (h = i.querySelector(vo(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = na.get(f)) && Ld(t, n), h = i.createElement("script"), at(h), sn(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function sy(t, n, i, o) {
    var f = (f = he.current) ? lu(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = ll(i.href), i = jt(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = ll(i.href);
          var h = jt(
            f
          ).hoistableStyles, w = h.get(t);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, w), (h = f.querySelector(
            yo(t)
          )) && !h._p && (w.instance = h, w.state.loading = 5), na.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, na.set(t, i), h || d_(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ol(i), i = jt(
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
  function ll(t) {
    return 'href="' + an(t) + '"';
  }
  function yo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function uy(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function d_(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), sn(n, "link", i), at(n), t.head.appendChild(n));
  }
  function ol(t) {
    return '[src="' + an(t) + '"]';
  }
  function vo(t) {
    return "script[async]" + t;
  }
  function cy(t, n, i) {
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
          ), at(o), sn(o, "style", f), ou(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          f = ll(i.href);
          var h = t.querySelector(
            yo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, at(h), h;
          o = uy(i), (f = na.get(f)) && jd(o, f), h = (t.ownerDocument || t).createElement("link"), at(h);
          var w = h;
          return w._p = new Promise(function(T, q) {
            w.onload = T, w.onerror = q;
          }), sn(h, "link", o), n.state.loading |= 4, ou(h, i.precedence, t), n.instance = h;
        case "script":
          return h = ol(i.src), (f = t.querySelector(
            vo(h)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = na.get(h)) && (o = g({}, i), Ld(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), at(f), sn(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, ou(o, i.precedence, t));
    return n.instance;
  }
  function ou(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, w = 0; w < o.length; w++) {
      var T = o[w];
      if (T.dataset.precedence === n) h = T;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function jd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Ld(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var su = null;
  function fy(t, n, i) {
    if (su === null) {
      var o = /* @__PURE__ */ new Map(), f = su = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = su, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), f = 0; f < i.length; f++) {
      var h = i[f];
      if (!(h[Ge] || h[ve] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = h.getAttribute(n) || "";
        w = t + w;
        var T = o.get(w);
        T ? T.push(h) : o.set(w, [h]);
      }
    }
    return o;
  }
  function dy(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function h_(t, n, i) {
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
  function hy(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function m_(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = ll(o.href), h = n.querySelector(
          yo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = uu.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = h, at(h);
          return;
        }
        h = n.ownerDocument || n, o = uy(o), (f = na.get(f)) && jd(o, f), h = h.createElement("link"), at(h);
        var w = h;
        w._p = new Promise(function(T, q) {
          w.onload = T, w.onerror = q;
        }), sn(h, "link", o), i.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = uu.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Hd = 0;
  function p_(t, n) {
    return t.stylesheets && t.count === 0 && fu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && fu(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Hd === 0 && (Hd = 62500 * QE());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && fu(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Hd ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function uu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) fu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var cu = null;
  function fu(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, cu = /* @__PURE__ */ new Map(), n.forEach(g_, t), cu = null, uu.call(t));
  }
  function g_(t, n) {
    if (!(n.state.loading & 4)) {
      var i = cu.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), cu.set(t, i);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (i.set(w.dataset.precedence, w), o = w);
        }
        o && i.set(null, o);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = i.get(w) || o, h === o && i.set(null, f), i.set(w, f), this.count++, o = uu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var bo = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function y_(t, n, i, o, f, h, w, T, q) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = pn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = pn(0), this.hiddenUpdates = pn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function my(t, n, i, o, f, h, w, T, q, ie, ue, fe) {
    return t = new y_(
      t,
      n,
      i,
      w,
      q,
      ie,
      ue,
      fe,
      T
    ), n = 1, h === !0 && (n |= 24), h = Hn(3, null, null, n), t.current = h, h.stateNode = t, n = pf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, bf(h), t;
  }
  function py(t) {
    return t ? (t = Br, t) : Br;
  }
  function gy(t, n, i, o, f, h) {
    f = py(f), o.context === null ? o.context = f : o.pendingContext = f, o = Ni(n), o.payload = { element: i }, h = h === void 0 ? null : h, h !== null && (o.callback = h), i = Ci(t, o, n), i !== null && (Tn(i, t, n), Pl(i, t, n));
  }
  function yy(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function kd(t, n) {
    yy(t, n), (t = t.alternate) && yy(t, n);
  }
  function vy(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Wi(t, 67108864);
      n !== null && Tn(n, t, 67108864), kd(t, 67108864);
    }
  }
  function by(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = qn();
      n = Q(n);
      var i = Wi(t, n);
      i !== null && Tn(i, t, n), kd(t, n);
    }
  }
  var du = !0;
  function v_(t, n, i, o) {
    var f = M.T;
    M.T = null;
    var h = L.p;
    try {
      L.p = 2, Bd(t, n, i, o);
    } finally {
      L.p = h, M.T = f;
    }
  }
  function b_(t, n, i, o) {
    var f = M.T;
    M.T = null;
    var h = L.p;
    try {
      L.p = 8, Bd(t, n, i, o);
    } finally {
      L.p = h, M.T = f;
    }
  }
  function Bd(t, n, i, o) {
    if (du) {
      var f = Ud(o);
      if (f === null)
        _d(
          t,
          n,
          o,
          hu,
          i
        ), wy(t, o);
      else if (w_(
        f,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (wy(t, o), n & 4 && -1 < x_.indexOf(t)) {
        for (; f !== null; ) {
          var h = st(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var w = un(h.pendingLanes);
                  if (w !== 0) {
                    var T = h;
                    for (T.pendingLanes |= 2, T.entangledLanes |= 2; w; ) {
                      var q = 1 << 31 - Ut(w);
                      T.entanglements[1] |= q, w &= ~q;
                    }
                    Ta(h), (ht & 6) === 0 && (Qs = Qe() + 500, ho(0));
                  }
                }
                break;
              case 31:
              case 13:
                T = Wi(h, 2), T !== null && Tn(T, h, 2), Ks(), kd(h, 2);
            }
          if (h = Ud(o), h === null && _d(
            t,
            n,
            o,
            hu,
            i
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        _d(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function Ud(t) {
    return t = Vc(t), Vd(t);
  }
  var hu = null;
  function Vd(t) {
    if (hu = null, t = Ct(t), t !== null) {
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
    return hu = t, null;
  }
  function xy(t) {
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
          case Yt:
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
  var qd = !1, ki = null, Bi = null, Ui = null, xo = /* @__PURE__ */ new Map(), wo = /* @__PURE__ */ new Map(), Vi = [], x_ = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function wy(t, n) {
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
        xo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        wo.delete(n.pointerId);
    }
  }
  function So(t, n, i, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && vy(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function w_(t, n, i, o, f) {
    switch (n) {
      case "focusin":
        return ki = So(
          ki,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return Bi = So(
          Bi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return Ui = So(
          Ui,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return xo.set(
          h,
          So(
            xo.get(h) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, wo.set(
          h,
          So(
            wo.get(h) || null,
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
  function Sy(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            t.blockedOn = n, pe(t.priority, function() {
              by(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(i), n !== null) {
            t.blockedOn = n, pe(t.priority, function() {
              by(i);
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
  function mu(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Ud(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Uc = o, i.target.dispatchEvent(o), Uc = null;
      } else
        return n = st(i), n !== null && vy(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Ey(t, n, i) {
    mu(t) && i.delete(n);
  }
  function S_() {
    qd = !1, ki !== null && mu(ki) && (ki = null), Bi !== null && mu(Bi) && (Bi = null), Ui !== null && mu(Ui) && (Ui = null), xo.forEach(Ey), wo.forEach(Ey);
  }
  function pu(t, n) {
    t.blockedOn === n && (t.blockedOn = null, qd || (qd = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      S_
    )));
  }
  var gu = null;
  function _y(t) {
    gu !== t && (gu = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        gu === t && (gu = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Vd(o || i) === null)
              continue;
            break;
          }
          var h = st(i);
          h !== null && (t.splice(n, 3), n -= 3, Uf(
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
  function sl(t) {
    function n(q) {
      return pu(q, t);
    }
    ki !== null && pu(ki, t), Bi !== null && pu(Bi, t), Ui !== null && pu(Ui, t), xo.forEach(n), wo.forEach(n);
    for (var i = 0; i < Vi.length; i++) {
      var o = Vi[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Vi.length && (i = Vi[0], i.blockedOn === null); )
      Sy(i), i.blockedOn === null && Vi.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], h = i[o + 1], w = f[we] || null;
        if (typeof h == "function")
          w || _y(i);
        else if (w) {
          var T = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[we] || null)
              T = w.formAction;
            else if (Vd(f) !== null) continue;
          } else T = w.action;
          typeof T == "function" ? i[o + 1] = T : (i.splice(o, 3), o -= 3), _y(i);
        }
      }
  }
  function Ny() {
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
  function $d(t) {
    this._internalRoot = t;
  }
  yu.prototype.render = $d.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = qn();
    gy(i, o, t, n, null, null);
  }, yu.prototype.unmount = $d.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      gy(t.current, 2, null, t, null, null), Ks(), n[be] = null;
    }
  };
  function yu(t) {
    this._internalRoot = t;
  }
  yu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = de();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < Vi.length && n !== 0 && n < Vi[i].priority; i++) ;
      Vi.splice(i, 0, t), i === 0 && Sy(t);
    }
  };
  var Cy = a.version;
  if (Cy !== "19.2.7")
    throw Error(
      l(
        527,
        Cy,
        "19.2.7"
      )
    );
  L.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var E_ = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var vu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vu.isDisabled && vu.supportsFiber)
      try {
        tn = vu.inject(
          E_
        ), Pt = vu;
      } catch {
      }
  }
  return _o.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var i = !1, o = "", f = Og, h = jg, w = Lg;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = my(
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
      Ny
    ), t[be] = n.current, Ed(t), new $d(n);
  }, _o.hydrateRoot = function(t, n, i) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = Og, w = jg, T = Lg, q = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (w = i.onCaughtError), i.onRecoverableError !== void 0 && (T = i.onRecoverableError), i.formState !== void 0 && (q = i.formState)), n = my(
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
      T,
      Ny
    ), n.context = py(null), i = n.current, o = qn(), o = Q(o), f = Ni(o), f.callback = null, Ci(i, f, o), i = o, n.current.lanes = i, pt(n, i), Ta(n), t[be] = n.current, Ed(t), new yu(n);
  }, _o.version = "19.2.7", _o;
}
var Hy;
function j_() {
  if (Hy) return Gd.exports;
  Hy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Gd.exports = O_(), Gd.exports;
}
var L_ = j_();
/**
 * react-router v7.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var p1 = (e) => {
  throw TypeError(e);
}, g1 = (e, a, r) => a.has(e) || p1("Cannot " + r), ia = (e, a, r) => (g1(e, a, "read from private field"), r ? r.call(e) : a.get(e)), zo = (e, a, r) => a.has(e) ? p1("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), Da = (e, a, r, l) => (g1(e, a, "write to private field"), a.set(e, r), r), hc = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i, rm = /^[\\/]{2}/;
function y1(e, a) {
  return a + e.replace(/\\/g, "/");
}
function ky(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function H_(e = {}) {
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
  function y(x, S = null, R, N) {
    let C = _h(
      s ? m().pathname : "/",
      x,
      S,
      R,
      N
    );
    return It(
      C.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), C;
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
      let R = ky(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, R), l && d && d({ action: c, location: R, delta: 1 });
    },
    replace(x, S) {
      c = "REPLACE";
      let R = ky(x) ? x : y(x, S);
      s[u] = R, l && d && d({ action: c, location: R, delta: 0 });
    },
    go(x) {
      c = "POP";
      let S = p(u + x), R = s[S];
      u = S, d && d({ action: c, location: R, delta: x });
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
function It(e, a) {
  if (!e) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function k_() {
  return Math.random().toString(36).substring(2, 10);
}
function _h(e, a, r = null, l, s) {
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
    key: a && a.key || l || k_(),
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
function B_(e, a, r = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Fe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ua(a);
  return s = s.replace(/ $/, "%20"), !r && rm.test(s) && (s = l + s), new URL(s, l);
}
var Oo, By = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (zo(this, Oo, /* @__PURE__ */ new Map()), e)
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
    if (ia(this, Oo).has(e))
      return ia(this, Oo).get(e);
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
    ia(this, Oo).set(e, a);
  }
};
Oo = /* @__PURE__ */ new WeakMap();
var U_ = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function V_(e) {
  return U_.has(
    e
  );
}
var q_ = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function $_(e) {
  return q_.has(
    e
  );
}
function I_(e) {
  return e.index === !0;
}
function Vo(e, a, r = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...r, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Fe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Fe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), I_(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = Uy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = Uy(
        m,
        a(m)
      ), u.children && (m.children = Vo(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function Uy(e, a) {
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
function v1(e, a, r = "/") {
  return ga(e, a, r, !1);
}
function ga(e, a, r, l, s) {
  let u = typeof a == "string" ? Sa(a) : a, c = oa(u.pathname || "/", r);
  if (c == null)
    return null;
  let d = s ?? Vu(e), p = null, m = t2(c);
  for (let y = 0; p == null && y < d.length; ++y)
    p = e2(
      d[y],
      m,
      l
    );
  return p;
}
function Y_(e, a) {
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
function Vu(e) {
  let a = b1(e);
  return G_(a), a;
}
function b1(e, a = [], r = [], l = "", s = !1) {
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
    ), b1(
      c.children,
      a,
      v,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: J_(g, c.index),
      routesMeta: v.map((x, S) => {
        let [R, N] = S1(
          x.relativePath,
          x.caseSensitive,
          S === v.length - 1
        );
        return {
          ...x,
          matcher: R,
          compiledParams: N
        };
      })
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of x1(c.path))
        u(c, d, !0, p);
  }), a;
}
function x1(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = x1(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function G_(e) {
  e.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : W_(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var X_ = /^:[\w-]+$/, F_ = 3, Z_ = 2, Q_ = 1, P_ = 10, K_ = -2, Vy = (e) => e === "*";
function J_(e, a) {
  let r = e.split("/"), l = r.length;
  return r.some(Vy) && (l += K_), a && (l += Z_), r.filter((s) => !Vy(s)).reduce(
    (s, u) => s + (X_.test(u) ? F_ : u === "" ? Q_ : P_),
    l
  );
}
function W_(e, a) {
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
function e2(e, a, r = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", g = {
      path: p.relativePath,
      caseSensitive: p.caseSensitive,
      end: m
    }, v = (
      // Use precomputed matcher if it exists
      p.matcher && p.compiledParams ? w1(
        g,
        y,
        p.matcher,
        p.compiledParams
      ) : Pu(g, y)
    ), x = p.route;
    if (!v && m && r && !l[l.length - 1].route.index && (v = Pu(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !v)
      return null;
    Object.assign(s, v.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: la([u, v.pathname]),
      pathnameBase: i2(
        la([u, v.pathnameBase])
      ),
      route: x
    }), v.pathnameBase !== "/" && (u = la([u, v.pathnameBase]));
  }
  return c;
}
function Pu(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, l] = S1(
    e.path,
    e.caseSensitive,
    e.end
  );
  return w1(e, a, r, l);
}
function w1(e, a, r, l) {
  let s = a.match(r);
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
function S1(e, a = !1, r = !0) {
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
  return e.endsWith("*") ? (l.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function t2(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return It(
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
function n2({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : la([e, a]);
}
var lm = (e) => hc.test(e);
function a2(e, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Sa(e) : e, u;
  return r ? (r = sm(r), r.startsWith("/") ? u = qy(r.substring(1), "/") : u = qy(r, a)) : u = a, {
    pathname: u,
    search: r2(l),
    hash: l2(s)
  };
}
function qy(e, a) {
  let r = Ku(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Qd(e, a, r, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function E1(e) {
  return e.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function om(e) {
  let a = E1(e);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function mc(e, a, r, l = !1) {
  let s;
  typeof e == "string" ? s = Sa(e) : (s = { ...e }, Fe(
    !s.pathname || !s.pathname.includes("?"),
    Qd("?", "pathname", "search", s)
  ), Fe(
    !s.pathname || !s.pathname.includes("#"),
    Qd("#", "pathname", "hash", s)
  ), Fe(
    !s.search || !s.search.includes("#"),
    Qd("#", "search", "hash", s)
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
  let p = a2(s, d), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var sm = (e) => e.replace(/[\\/]{2,}/g, "/"), la = (e) => sm(e.join("/")), Ku = (e) => e.replace(/\/+$/, ""), i2 = (e) => Ku(e).replace(/^\/*/, "/"), r2 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, l2 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, $y = (e, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", e), new Response(null, { ...r, headers: l });
}, pc = class {
  constructor(e, a, r, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function qo(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function es(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return la(a) || "/";
}
var _1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function N1(e, a) {
  let r = e;
  if (typeof r != "string" || !hc.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (_1)
    try {
      let u = new URL(window.location.href), c = rm.test(r) ? new URL(y1(r, u.protocol)) : new URL(r), d = oa(c.pathname, a);
      c.origin === u.origin && d != null ? r = d + c.search + c.hash : s = !0;
    } catch {
      It(
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
function o2(e, a) {
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
    let s = ml(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = r[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = ml(d, c, () => {
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
      let c = u[Fi] ?? u, d = ml(
        r[s],
        c,
        (...p) => Iy(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[Fi] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Fi] ?? s, c = ml(
      r.middleware,
      u,
      (...d) => Iy(d[0])
    );
    return c ? (c[Fi] = u, c) : s;
  })), l;
}
function s2(e, a) {
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
    let l = e.navigate[Fi] ?? e.navigate, s = ml(
      r.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? Ua(c) : ".",
          ...Yy(e, d ?? {})
        };
      }
    );
    s && (s[Fi] = l, e.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = e.fetch[Fi] ?? e.fetch, s = ml(r.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...Yy(e, p ?? {})
      };
    });
    s && (s[Fi] = l, e.fetch = s);
  }
  return e;
}
function ml(e, a, r) {
  return e.length === 0 ? null : async (...l) => {
    let s = await C1(
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
async function C1(e, a, r, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = C1(e, a, r, l - 1), u = await c, Fe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function Iy(e) {
  let { request: a, context: r, params: l, pattern: s } = e;
  return {
    request: u2(a),
    params: { ...l },
    pattern: s,
    context: c2(r)
  };
}
function Yy(e, a) {
  return {
    currentUrl: Ua(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function u2(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function c2(e) {
  if (d2(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var f2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function d2(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === f2;
}
var R1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], h2 = new Set(
  R1
), m2 = [
  "GET",
  ...R1
], p2 = new Set(m2), M1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), g2 = /* @__PURE__ */ new Set([307, 308]), Pd = {
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
}, y2 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, No = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, v2 = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), T1 = "remix-router-transitions", D1 = Symbol("ResetLoaderData"), pr, fl, Yi, dl, b2 = class {
  constructor(e) {
    zo(this, pr), zo(this, fl), zo(this, Yi), zo(this, dl), Da(this, pr, e), Da(this, fl, Vu(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return ia(this, pr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return ia(this, Yi) ?? ia(this, pr);
  }
  /** Pre-computed branches */
  get branches() {
    return ia(this, dl) ?? ia(this, fl);
  }
  get hasHMRRoutes() {
    return ia(this, Yi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Da(this, pr, e), Da(this, fl, Vu(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Da(this, Yi, e), Da(this, dl, Vu(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    ia(this, Yi) && (Da(this, pr, ia(this, Yi)), Da(this, fl, ia(this, dl)), Da(this, Yi, void 0), Da(this, dl, void 0));
  }
};
pr = /* @__PURE__ */ new WeakMap();
fl = /* @__PURE__ */ new WeakMap();
Yi = /* @__PURE__ */ new WeakMap();
dl = /* @__PURE__ */ new WeakMap();
function x2(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Fe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || v2, u = s;
  if (e.instrumentations) {
    let U = e.instrumentations;
    u = (Q) => ({
      ...s(Q),
      ...o2(
        U.map((W) => W.route).filter(Boolean),
        Q
      )
    });
  }
  let c = {}, d = new b2(
    Vo(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || N2, y = {
    ...e.future
  }, g = null, v = /* @__PURE__ */ new Set(), x = null, S = null, R = null, N = null, C = e.hydrationData != null, z = ga(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), E = !1, O = null, k, B;
  if (z == null && !e.patchRoutesOnNavigation) {
    let U = ra(404, {
      pathname: e.history.location.pathname
    }), { matches: Q, route: W } = bu(d.activeRoutes);
    k = !0, B = !k, z = Q, O = { [W.id]: U };
  } else if (z && !e.hydrationData && pn(
    z,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (z = null), z)
    if (z.some((U) => U.route.lazy))
      k = !1, B = !k;
    else if (!z.some((U) => um(U.route)))
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
        let pe = A1(de.route, U, Q);
        B = B || pe.renderFallback, k = k && !pe.shouldLoad;
      });
    }
  else {
    k = !1, B = !k, z = [];
    let U = pn(
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
    navigation: Pd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || O,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", te = null, $ = !1, K, le = !1, j = /* @__PURE__ */ new Map(), Y = null, M = !1, L = !1, F = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), Z = 0, D = -1, H = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), me = /* @__PURE__ */ new Map(), ee, ge = null;
  function ze() {
    if (g = e.history.listen(
      ({ action: U, location: Q, delta: W }) => {
        if (ee) {
          ee(), ee = void 0;
          return;
        }
        It(
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
          e.history.go(W * -1), zn(de, {
            state: "blocked",
            location: Q,
            proceed() {
              zn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Q
              }), pe.then(() => e.history.go(W));
            },
            reset() {
              let Ee = new Map(A.blockers);
              Ee.set(de, No), xe({ blockers: Ee });
            }
          }), te?.resolve(), te = null;
          return;
        }
        return Me(U, Q);
      }
    ), r) {
      Y2(a, j);
      let U = () => G2(a, j);
      a.addEventListener("pagehide", U), Y = () => a.removeEventListener("pagehide", U);
    }
    return A.initialized || Me("POP", A.location, {
      initialHydration: !0
    }), V;
  }
  function Re() {
    g && g(), Y && Y(), v.clear(), K && K.abort(), A.fetchers.forEach((U, Q) => tn(A.fetchers, Q)), A.blockers.forEach((U, Q) => ua(Q));
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
    let Ee = Q.loaderData ? ev(
      A.loaderData,
      Q.loaderData,
      Q.matches || [],
      Q.errors
    ) : A.loaderData, ve = A.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((De, Ue) => ve.set(Ue, No)));
    let we = M ? !1 : Vt(U, Q.matches || A.matches), be = $ === !0 || A.navigation.formMethod != null && dn(A.navigation.formMethod) && U.state?._isRedirect !== !0;
    d.commitHmrRoutes(), M || I === "POP" || (I === "PUSH" ? e.history.push(U, U.state) : I === "REPLACE" && e.history.replace(U, U.state));
    let Te;
    if (I === "POP") {
      let De = j.get(A.location.pathname);
      De && De.has(U.pathname) ? Te = {
        currentLocation: A.location,
        nextLocation: U
      } : j.has(U.pathname) && (Te = {
        currentLocation: U,
        nextLocation: A.location
      });
    } else if (le) {
      let De = j.get(A.location.pathname);
      De ? De.add(U.pathname) : (De = /* @__PURE__ */ new Set([U.pathname]), j.set(A.location.pathname, De)), Te = {
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
        historyAction: I,
        location: U,
        initialized: !0,
        renderFallback: !1,
        navigation: Pd,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Te,
        flushSync: W === !0
      }
    ), I = "POP", $ = !1, le = !1, M = !1, L = !1, te?.resolve(), te = null, ge?.resolve(), ge = null;
  }
  async function $e(U, Q) {
    if (te?.resolve(), te = null, typeof U == "number") {
      te || (te = iv());
      let rt = te.promise;
      return e.history.go(U), rt;
    }
    let W = Nh(
      A.location,
      A.matches,
      p,
      U,
      Q?.fromRouteId,
      Q?.relative
    ), { path: de, submission: pe, error: Ee } = Gy(
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
    let we = A.location, be = _h(
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
    let Te = Q && Q.replace != null ? Q.replace : void 0, De = "PUSH";
    Te === !0 ? De = "REPLACE" : Te === !1 || pe != null && dn(pe.formMethod) && pe.formAction === A.location.pathname + A.location.search && (De = "REPLACE");
    let Ue = Q && "preventScrollReset" in Q ? Q.preventScrollReset === !0 : void 0, je = (Q && Q.flushSync) === !0, Ge = Fn({
      currentLocation: we,
      nextLocation: be,
      historyAction: De
    });
    if (Ge) {
      zn(Ge, {
        state: "blocked",
        location: be,
        proceed() {
          zn(Ge, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), $e(U, Q);
        },
        reset() {
          let rt = new Map(A.blockers);
          rt.set(Ge, No), xe({ blockers: rt });
        }
      });
      return;
    }
    await Me(De, be, {
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
    ge || (ge = iv()), Lt(), xe({ revalidation: "loading" });
    let U = ge.promise;
    return A.navigation.state === "submitting" ? U : A.navigation.state === "idle" ? (Me(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), U) : (Me(
      I || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: le === !0
      }
    ), U);
  }
  async function Me(U, Q, W) {
    K && K.abort(), K = null, I = U, M = (W && W.startUninterruptedRevalidation) === !0, Ht(A.location, A.matches), $ = (W && W.preventScrollReset) === !0, le = (W && W.enableViewTransition) === !0;
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
    if (pe && A.initialized && !L && j2(A.location, Q) && !(W && W.submission && dn(W.submission.formMethod))) {
      Ce(Q, { matches: pe }, { flushSync: Ee });
      return;
    }
    let ve = pn(pe, de, Q.pathname);
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
    let be = hl(
      e.history,
      Q,
      K.signal,
      W && W.submission
    ), Te = e.getContext ? await e.getContext() : new By(), De;
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
        Te,
        ve.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, jt] = st.pendingActionResult;
        if ($n(jt) && qo(jt.error) && jt.error.status === 404) {
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
      pe = st.matches || pe, De = st.pendingActionResult, we = Kd(
        Q,
        pe,
        U,
        W.submission
      ), Ee = !1, ve.active = !1, be = hl(
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
      Te,
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
      ...tv(De),
      loaderData: Ge,
      errors: rt,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function Xe(U, Q, W, de, pe, Ee, ve, we, be = {}) {
    Lt();
    let Te = $2(
      Q,
      de,
      pe,
      W
    );
    if (xe({ navigation: Te }, { flushSync: be.flushSync === !0 }), ve) {
      let je = await pt(
        de,
        Q.pathname,
        U.signal
      );
      if (je.type === "aborted")
        return { shortCircuited: !0 };
      if (je.type === "error") {
        if (je.partialMatches.length === 0) {
          let { matches: rt, route: Ct } = bu(
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
    let De, Ue = qu(de, Q);
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
      let je = yl(
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
      return be && be.replace != null ? je = be.replace : je = Ky(
        De.response.headers.get("Location"),
        new URL(U.url),
        p,
        e.history
      ) === A.location.pathname + A.location.search, await gt(U, De, !0, {
        submission: W,
        replace: je
      }), { shortCircuited: !0 };
    }
    if ($n(De)) {
      let je = Gi(de, Ue.route.id);
      return (be && be.replace) !== !0 && (I = "PUSH"), {
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
  async function ke(U, Q, W, de, pe, Ee, ve, we, be, Te, De, Ue, je, Ge) {
    let rt = ve || Kd(Q, W, de, we), Ct = we || be || av(rt), st = !M && !De;
    if (Ee) {
      if (st) {
        let bt = Ie(je);
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
          let { matches: gn, route: jn } = bu(
            d.activeRoutes
          );
          return {
            matches: gn,
            loaderData: {},
            errors: {
              [jn.id]: Be.error
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
        let { error: bt, notFoundMatches: gn, route: jn } = un(
          Q.pathname
        );
        return {
          matches: gn,
          loaderData: {},
          errors: {
            [jn.id]: bt
          }
        };
      }
    }
    let We = d.activeRoutes, { dsMatches: jt, revalidatingFetchers: at } = Xy(
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
          errors: je && $n(je[1]) ? { [je[0]]: je[1].error } : null,
          ...tv(je),
          ...bt ? { fetchers: Be } : {}
        },
        { flushSync: Ue }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let Be = {};
      if (!Ee) {
        Be.navigation = rt;
        let bt = Ie(je);
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
    let { loaderResults: On, fetcherResults: cn } = await Yt(
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
    let nn = xu(On);
    if (nn)
      return await gt(U, nn.result, !0, {
        replace: Te
      }), { shortCircuited: !0 };
    if (nn = xu(cn), nn)
      return P.add(nn.key), await gt(U, nn.result, !0, {
        replace: Te
      }), { shortCircuited: !0 };
    let Sn = new Map(A.fetchers), { loaderData: pi, errors: En } = Wy(
      A,
      W,
      On,
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
  function Ie(U) {
    if (U && !$n(U[1]))
      return {
        [U[0]]: U[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function St(U) {
    let Q = new Map(A.fetchers);
    return U.forEach((W) => {
      let de = Q.get(W.key), pe = Co(
        void 0,
        de ? de.data : void 0
      );
      Q.set(W.key, pe);
    }), Q;
  }
  async function Je(U, Q, W, de) {
    Ot(U);
    let pe = (de && de.flushSync) === !0, Ee = d.activeRoutes, ve = Nh(
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
    ), be = pn(we, Ee, ve);
    if (be.active && be.matches && (we = be.matches), !we) {
      ot(
        U,
        Q,
        ra(404, { pathname: ve }),
        { flushSync: pe }
      );
      return;
    }
    let { path: Te, submission: De, error: Ue } = Gy(
      !0,
      ve,
      de
    );
    if (Ue) {
      ot(U, Q, Ue, { flushSync: pe });
      return;
    }
    let je = e.getContext ? await e.getContext() : new By(), Ge = (de && de.preventScrollReset) === !0;
    if (De && dn(De.formMethod)) {
      await Ze(
        U,
        Q,
        Te,
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
    ne.set(U, { routeId: Q, path: Te }), await Qe(
      U,
      Q,
      Te,
      we,
      je,
      be.active,
      pe,
      Ge,
      De
    );
  }
  async function Ze(U, Q, W, de, pe, Ee, ve, we, be, Te) {
    Lt(), ne.delete(U);
    let De = A.fetchers.get(U);
    mt(U, I2(be, De), {
      flushSync: ve
    });
    let Ue = new AbortController(), je = hl(
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
    let Ge = qu(de, W);
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
    let rt = Z, Ct = yl(
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
      if (yr(We) || $n(We)) {
        mt(U, za(void 0));
        return;
      }
    } else {
      if (yr(We))
        if (G.delete(U), D > rt) {
          mt(U, za(void 0));
          return;
        } else
          return P.add(U), mt(U, Co(be)), gt(je, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: we
          });
      if ($n(We)) {
        ot(U, Q, We.error);
        return;
      }
    }
    let jt = A.navigation.location || A.location, at = hl(
      e.history,
      jt,
      Ue.signal
    ), Na = d.activeRoutes, On = A.navigation.state !== "idle" ? ga(
      Na,
      A.navigation.location,
      p,
      !1,
      d.branches
    ) : A.matches;
    Fe(On, "Didn't find any matches after fetcher action");
    let cn = ++Z;
    H.set(U, cn);
    let { dsMatches: nn, revalidatingFetchers: Sn } = Xy(
      at,
      pe,
      u,
      c,
      e.history,
      A,
      On,
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
      Te
    ), pi = Co(be, We.data), En = new Map(A.fetchers);
    En.set(U, pi), Sn.filter((dt) => dt.key !== U).forEach((dt) => {
      let Zn = dt.key, an = En.get(Zn), Qi = Co(
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
    let { loaderResults: fa, fetcherResults: da } = await Yt(
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
    }, gn = xu(fa);
    if (gn)
      return A = bt(A), gt(
        at,
        gn.result,
        !1,
        { preventScrollReset: we }
      );
    if (gn = xu(da), gn)
      return P.add(gn.key), A = bt(A), gt(
        at,
        gn.result,
        !1,
        { preventScrollReset: we }
      );
    let jn = new Map(A.fetchers);
    Be && jn.set(U, za(We.data));
    let { loaderData: yi, errors: $a } = Wy(
      A,
      On,
      fa,
      void 0,
      Sn,
      da,
      jn
    );
    _a(cn, jn), A.navigation.state === "loading" && cn > D ? (Fe(I, "Expected pending action"), K && K.abort(), Ce(A.navigation.location, {
      matches: On,
      loaderData: yi,
      errors: $a,
      fetchers: jn
    })) : (xe({
      errors: $a,
      loaderData: ev(
        A.loaderData,
        yi,
        On,
        $a
      ),
      fetchers: jn
    }), L = !1);
  }
  async function Qe(U, Q, W, de, pe, Ee, ve, we, be) {
    let Te = A.fetchers.get(U);
    mt(
      U,
      Co(
        be,
        Te ? Te.data : void 0
      ),
      { flushSync: ve }
    );
    let De = new AbortController(), Ue = hl(
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
    let je = qu(de, W);
    G.set(U, De);
    let Ge = Z, rt = yl(
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
      if ($n(st)) {
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
    Fe(we, "Expected a Location header on the redirect Response"), we = Ky(
      we,
      new URL(U.url),
      p,
      e.history
    );
    let be = _h(A.location, we, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Q.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (lm(we)) {
        const Ct = B_(a, we, !0);
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
    let Te = ve === !0 || Q.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: Ue, formEncType: je } = A.navigation;
    !de && !pe && De && Ue && je && (de = av(A.navigation));
    let Ge = de || pe;
    if (g2.has(Q.response.status) && Ge && dn(Ge.formMethod))
      await Me(Te, be, {
        submission: {
          ...Ge,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? le : void 0
      });
    else {
      let rt = Kd(
        be,
        [],
        Te,
        de
      );
      await Me(Te, be, {
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
      Ee = await R2(
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
      if (B2(be)) {
        let Te = be.result;
        ve[we] = {
          type: "redirect",
          response: A2(
            Te,
            U,
            we,
            W,
            p
          )
        };
      } else
        ve[we] = await D2(be);
    return ve;
  }
  async function Yt(U, Q, W, de, pe) {
    let Ee = yt(
      W,
      de,
      U,
      pe,
      null
    ), ve = Promise.all(
      Q.map(async (Te) => {
        if (Te.matches && Te.match && Te.request && Te.controller) {
          let Ue = (await yt(
            Te.request,
            Te.path,
            Te.matches,
            pe,
            Te.key
          ))[Te.match.route.id];
          return { [Te.key]: Ue };
        } else
          return Promise.resolve({
            [Te.key]: {
              type: "error",
              error: ra(404, {
                pathname: Te.path
              })
            }
          });
      })
    ), we = await Ee, be = (await ve).reduce(
      (Te, De) => Object.assign(Te, De),
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
    return se.set(U, (se.get(U) || 0) + 1), he.has(U) && he.delete(U), A.fetchers.get(U) || y2;
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
    let W = A.blockers.get(U) || No;
    return me.get(U) !== Q && me.set(U, Q), W;
  }
  function ua(U) {
    A.blockers.delete(U), me.delete(U);
  }
  function zn(U, Q) {
    let W = A.blockers.get(U) || No;
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
    me.size > 1 && It(!1, "A router only supports one blocker at a time");
    let de = Array.from(me.entries()), [pe, Ee] = de[de.length - 1], ve = A.blockers.get(pe);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: U, nextLocation: Q, historyAction: W }))
      return pe;
  }
  function un(U) {
    let Q = ra(404, { pathname: U }), W = d.activeRoutes, { matches: de, route: pe } = bu(W);
    return { notFoundMatches: de, route: pe, error: Q };
  }
  function He(U, Q, W) {
    if (S = U, N = Q, R = W || null, !C && A.navigation === Pd) {
      C = !0;
      let de = Vt(A.location, A.matches);
      de != null && xe({ restoreScrollPosition: de });
    }
    return () => {
      S = null, N = null, R = null;
    };
  }
  function vt(U, Q) {
    return R && R(
      U,
      Q.map((de) => Y_(de, A.loaderData))
    ) || U.key;
  }
  function Ht(U, Q) {
    if (S && N) {
      let W = vt(U, Q);
      S[W] = N();
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
  function pn(U, Q, W) {
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
          patch: (Te, De) => {
            W.aborted || Fy(
              Te,
              De,
              d,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Te) {
        return { type: "error", error: Te, partialMatches: pe };
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
      Vo(
        U,
        u,
        void 0,
        c
      )
    );
  }
  function Wt(U, Q, W = !1) {
    Fy(
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
  }, e.instrumentations && (V = s2(
    V,
    e.instrumentations.map((U) => U.router).filter(Boolean)
  )), V;
}
function w2(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function Nh(e, a, r, l, s, u) {
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
  let p = mc(
    l || ".",
    om(c),
    oa(e.pathname, r) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = fm(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let y = new URLSearchParams(p.search), g = y.getAll("index");
      y.delete("index"), g.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (p.pathname = n2({ basename: r, pathname: p.pathname })), Ua(p);
}
function Gy(e, a, r) {
  if (!r || !w2(r))
    return { path: a };
  if (r.formMethod && !q2(r.formMethod))
    return {
      path: a,
      error: ra(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: ra(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = B1(a);
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
    d = Mh(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    d = Mh(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    d = r.body, p = Jy(d);
  else if (r.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(r.body), p = Jy(d);
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
  return e && y.search && fm(y.search) && d.append("index", ""), y.search = `?${d}`, { path: Ua(y), submission: m };
}
function Xy(e, a, r, l, s, u, c, d, p, m, y, g, v, x, S, R, N, C, z, E, O, k) {
  let B = O ? $n(O[1]) ? O[1].error : O[1].data : void 0, V = s.createURL(u.location), A = s.createURL(p), I;
  if (y && u.errors) {
    let M = Object.keys(u.errors)[0];
    I = c.findIndex((L) => L.route.id === M);
  } else if (O && $n(O[1])) {
    let M = O[0];
    I = c.findIndex((L) => L.route.id === M) - 1;
  }
  let te = O ? O[1].statusCode : void 0, $ = te && te >= 400, K = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...d,
    actionResult: B,
    actionStatus: te
  }, le = es(c), j = c.map((M, L) => {
    let { route: F } = M, G = null;
    if (I != null && L > I)
      G = !1;
    else if (F.lazy)
      G = !0;
    else if (!um(F))
      G = !1;
    else if (y) {
      let { shouldLoad: P } = A1(
        F,
        u.loaderData,
        u.errors
      );
      G = P;
    } else S2(u.loaderData, u.matches[L], M) && (G = !0);
    if (G !== null)
      return Ch(
        r,
        l,
        e,
        p,
        le,
        M,
        m,
        a,
        G
      );
    let Z = !1;
    typeof k == "boolean" ? Z = k : $ ? Z = !1 : (g || V.pathname + V.search === A.pathname + A.search || V.search !== A.search || E2(u.matches[L], M)) && (Z = !0);
    let D = {
      ...K,
      defaultShouldRevalidate: Z
    }, H = Ho(M, D);
    return Ch(
      r,
      l,
      e,
      p,
      le,
      M,
      m,
      a,
      H,
      D,
      k
    );
  }), Y = [];
  return S.forEach((M, L) => {
    if (y || !c.some((se) => se.route.id === M.routeId) || x.has(L))
      return;
    let F = u.fetchers.get(L), G = F && F.state !== "idle" && F.data === void 0, Z = ga(
      N,
      M.path,
      C ?? "/",
      !1,
      E
    );
    if (!Z) {
      if (z && G)
        return;
      Y.push({
        key: L,
        routeId: M.routeId,
        path: M.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(L))
      return;
    let D = qu(Z, M.path), H = new AbortController(), P = hl(
      s,
      M.path,
      H.signal
    ), ne = null;
    if (v.has(L))
      v.delete(L), ne = yl(
        r,
        l,
        P,
        M.path,
        Z,
        D,
        m,
        a
      );
    else if (G)
      g && (ne = yl(
        r,
        l,
        P,
        M.path,
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
      Ho(D, he) && (ne = yl(
        r,
        l,
        P,
        M.path,
        Z,
        D,
        m,
        a,
        he
      ));
    }
    ne && Y.push({
      key: L,
      routeId: M.routeId,
      path: M.path,
      matches: ne,
      match: D,
      request: P,
      controller: H
    });
  }), { dsMatches: j, revalidatingFetchers: Y };
}
function um(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function A1(e, a, r) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!um(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = r != null && r[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function S2(e, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !e.hasOwnProperty(r.route.id);
  return l || s;
}
function E2(e, a) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function Ho(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Fy(e, a, r, l, s, u) {
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
      (g) => z1(m, g)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = Vo(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: g } = p[m], v = y, [x] = Vo(
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
function z1(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (r, l) => a.children?.some((s) => z1(r, s))
  ) ?? !1 : !1;
}
var Zy = /* @__PURE__ */ new WeakMap(), O1 = ({
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
  let c = Zy.get(s);
  c || (c = {}, Zy.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = V_(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
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
      let v = await u();
      v != null && (Object.assign(s, { [e]: v }), Object.assign(s, l(s)));
    }
    typeof s.lazy == "object" && (s.lazy[e] = void 0, Object.values(s.lazy).every((v) => v === void 0) && (s.lazy = void 0));
  })();
  return c[e] = p, p;
}, Qy = /* @__PURE__ */ new WeakMap();
function _2(e, a, r, l, s) {
  let u = r[e.id];
  if (Fe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let y = Qy.get(u);
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
        let R = v[S];
        if (R === void 0)
          continue;
        let N = $_(S), z = u[S] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        S !== "hasErrorBoundary";
        N ? It(
          !N,
          "Route property " + S + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? It(
          !z,
          `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`
        ) : x[S] = R;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return Qy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let g = O1({
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
async function Py(e) {
  let a = e.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function N2(e) {
  return e.matches.some((a) => a.route.middleware) ? j1(e, () => Py(e)) : Py(e);
}
function j1(e, a) {
  return C2(
    e,
    a,
    (l) => {
      if (V2(l))
        throw l;
      return l;
    },
    H2,
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
async function C2(e, a, r, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await L1(
    c,
    d,
    a,
    r,
    l,
    s
  );
}
async function L1(e, a, r, l, s, u, c = 0) {
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
      return g = { value: await L1(
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
function H1(e, a, r, l, s) {
  let u = O1({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = _2(
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
function Ch(e, a, r, l, s, u, c, d, p, m = null, y) {
  let g = !1, v = H1(
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
      return g = !0, m ? typeof y == "boolean" ? Ho(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? Ho(u, {
        ...m,
        defaultShouldRevalidate: x
      }) : Ho(u, m) : p;
    },
    resolve(x) {
      let { lazy: S, loader: R, middleware: N } = u.route, C = g || p || x && !dn(r.method) && (S || R), z = N && N.length > 0 && !R && !S;
      return C && (dn(r.method) || !z) ? M2({
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
function yl(e, a, r, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: H1(
      e,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Ch(
    e,
    a,
    r,
    l,
    es(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function R2(e, a, r, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let d = {
    request: a,
    url: k1(a, r),
    pattern: es(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let g = d;
      return j1(g, () => y({
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
async function M2({
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
    let S, R = new Promise((z, E) => S = E);
    m = () => S(), e.signal.addEventListener("abort", m);
    let N = (z) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: k1(e, a),
        pattern: r,
        params: l.params,
        context: d
      },
      ...z !== void 0 ? [z] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => N(E)) : N()) };
      } catch (z) {
        return { type: "error", result: z };
      }
    })();
    return Promise.race([C, R]);
  };
  try {
    let x = y ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let S, [R] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(x).catch((N) => {
            S = N;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (S !== void 0)
          throw S;
        p = R;
      } else {
        await s;
        let S = y ? l.route.action : l.route.loader;
        if (S)
          [p] = await Promise.all([v(S), u]);
        else if (g === "action") {
          let R = new URL(e.url), N = R.pathname + R.search;
          throw ra(405, {
            method: e.method,
            pathname: N,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await v(x);
    else {
      let S = new URL(e.url), R = S.pathname + S.search;
      throw ra(404, {
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
async function T2(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function D2(e) {
  let { result: a, type: r } = e;
  if (cm(a)) {
    let l;
    try {
      l = await T2(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new pc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? nv(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: L2(a),
    statusCode: qo(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: qo(a) ? a.status : void 0
  } : nv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function A2(e, a, r, l, s) {
  let u = e.headers.get("Location");
  if (Fe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !lm(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === r) + 1
    );
    u = Nh(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var z2 = [
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
function Rh(e) {
  try {
    return z2.includes(new URL(e).protocol);
  } catch {
    return !1;
  }
}
function Ky(e, a, r, l) {
  if (lm(e)) {
    let s = e, u = rm.test(s) ? new URL(
      y1(s, a.protocol)
    ) : new URL(s);
    if (Rh(u.toString()))
      throw new Error("Invalid redirect location");
    let c = oa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return sm(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (Rh(s.toString()))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function hl(e, a, r, l) {
  let s = e.createURL(B1(a)).toString(), u = { signal: r };
  if (l && dn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = Mh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function k1(e, a) {
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
function Mh(e) {
  let a = new URLSearchParams();
  for (let [r, l] of e.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function Jy(e) {
  let a = new FormData();
  for (let [r, l] of e.entries())
    a.append(r, l);
  return a;
}
function O2(e, a, r, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, y = r && $n(r[1]) ? r[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let v = g.route.id, x = a[v];
    if (Fe(
      !yr(x),
      "Cannot handle redirect results in processLoaderData"
    ), $n(x)) {
      let S = x.error;
      if (y !== void 0 && (S = y, y = void 0), c = c || {}, s)
        c[v] = S;
      else {
        let R = Gi(e, v);
        c[R.route.id] == null && (c[R.route.id] = S);
      }
      l || (u[v] = D1), p || (p = !0, d = qo(x.error) ? x.error.status : 500), x.headers && (m[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (m[v] = x.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function Wy(e, a, r, l, s, u, c) {
  let { loaderData: d, errors: p } = O2(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: g, controller: v } = m;
    if (v && v.signal.aborted)
      return;
    let x = u[y];
    if (Fe(x, "Did not find corresponding fetcher result"), $n(x)) {
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
function ev(e, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== D1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function tv(e) {
  return e ? $n(e[1]) ? {
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
function bu(e) {
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
  return e === 400 ? (c = "Bad Request", l && a && r ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${r}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && r ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new pc(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function xu(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (yr(s))
      return { key: l, result: s };
  }
}
function B1(e) {
  let a = typeof e == "string" ? Sa(e) : e;
  return Ua({ ...a, hash: "" });
}
function j2(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function L2(e) {
  return new pc(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function H2(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, r]) => typeof a == "string" && k2(r)
  );
}
function k2(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function B2(e) {
  return cm(e.result) && M1.has(e.result.status);
}
function $n(e) {
  return e.type === "error";
}
function yr(e) {
  return (e && e.type) === "redirect";
}
function nv(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function cm(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function U2(e) {
  return M1.has(e);
}
function V2(e) {
  return cm(e) && U2(e.status) && e.headers.has("Location");
}
function q2(e) {
  return p2.has(e.toUpperCase());
}
function dn(e) {
  return h2.has(e.toUpperCase());
}
function fm(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function qu(e, a) {
  let r = typeof a == "string" ? Sa(a).search : a.search;
  if (e[e.length - 1].route.index && fm(r || ""))
    return e[e.length - 1];
  let l = E1(e);
  return l[l.length - 1];
}
function av(e) {
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
function Kd(e, a, r, l) {
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
function $2(e, a, r, l) {
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
function Co(e, a) {
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
function I2(e, a) {
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
function Y2(e, a) {
  try {
    let r = e.sessionStorage.getItem(
      T1
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function G2(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      e.sessionStorage.setItem(
        T1,
        JSON.stringify(r)
      );
    } catch (l) {
      It(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function iv() {
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
var Mr = _.createContext(null);
Mr.displayName = "DataRouter";
var ts = _.createContext(null);
ts.displayName = "DataRouterState";
var U1 = _.createContext(!1);
function V1() {
  return _.useContext(U1);
}
var dm = _.createContext({
  isTransitioning: !1
});
dm.displayName = "ViewTransition";
var q1 = _.createContext(
  /* @__PURE__ */ new Map()
);
q1.displayName = "Fetchers";
var X2 = _.createContext(null);
X2.displayName = "Await";
var sa = _.createContext(
  null
);
sa.displayName = "Navigation";
var gc = _.createContext(
  null
);
gc.displayName = "Location";
var Va = _.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Va.displayName = "Route";
var hm = _.createContext(null);
hm.displayName = "RouteError";
var $1 = "REACT_ROUTER_ERROR", F2 = "REDIRECT", Z2 = "ROUTE_ERROR_RESPONSE";
function Q2(e) {
  if (e.startsWith(`${$1}:${F2}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function P2(e) {
  if (e.startsWith(
    `${$1}:${Z2}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new pc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function K2(e, { relative: a } = {}) {
  Fe(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = _.useContext(sa), { hash: s, pathname: u, search: c } = as(e, { relative: a }), d = u;
  return r !== "/" && (d = u === "/" ? r : la([r, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function ns() {
  return _.useContext(gc) != null;
}
function di() {
  return Fe(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), _.useContext(gc).location;
}
var I1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Y1(e) {
  _.useContext(sa).static || _.useLayoutEffect(e);
}
function J2() {
  let { isDataRoute: e } = _.useContext(Va);
  return e ? hN() : W2();
}
function W2() {
  Fe(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = _.useContext(Mr), { basename: a, navigator: r } = _.useContext(sa), { matches: l } = _.useContext(Va), { pathname: s } = di(), u = JSON.stringify(om(l)), c = _.useRef(!1);
  return Y1(() => {
    c.current = !0;
  }), _.useCallback(
    (p, m = {}) => {
      if (It(c.current, I1), !c.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let y = mc(
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
var eN = _.createContext(null);
function tN(e) {
  let a = _.useContext(Va).outlet;
  return _.useMemo(
    () => a && /* @__PURE__ */ _.createElement(eN.Provider, { value: e }, a),
    [a, e]
  );
}
function as(e, { relative: a } = {}) {
  let { matches: r } = _.useContext(Va), { pathname: l } = di(), s = JSON.stringify(om(r));
  return _.useMemo(
    () => mc(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function nN(e, a, r) {
  Fe(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = _.useContext(sa), { matches: s } = _.useContext(Va), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let N = m && m.path || "";
    F1(
      d,
      !m || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let y = di(), g;
  g = y;
  let v = g.pathname || "/", x = v;
  if (p !== "/") {
    let N = p.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let S = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (N) => Object.assign(N, {
        route: r.manifest[N.route.id] || N.route
      })
    )
  ) : v1(e, { pathname: x });
  return It(
    m || S != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), It(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), oN(
    S && S.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, c, N.params),
        pathname: la([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            N.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? p : la([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            N.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function aN() {
  let e = dN(), a = qo(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ _.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ _.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ _.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ _.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ _.createElement("pre", { style: s }, r) : null, c);
}
var iN = /* @__PURE__ */ _.createElement(aN, null), G1 = class extends _.Component {
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
      const r = P2(e.digest);
      r && (e = r);
    }
    let a = e !== void 0 ? /* @__PURE__ */ _.createElement(Va.Provider, { value: this.props.routeContext }, /* @__PURE__ */ _.createElement(
      hm.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ _.createElement(rN, { error: e }, a) : a;
  }
};
G1.contextType = U1;
var Jd = /* @__PURE__ */ new WeakMap();
function rN({
  children: e,
  error: a
}) {
  let { basename: r } = _.useContext(sa);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = Q2(a.digest);
    if (l) {
      let s = Jd.get(a);
      if (s) throw s;
      let u = N1(l.location, r), c = u.absoluteURL || u.to;
      if (Rh(c))
        throw new Error("Invalid redirect location");
      if (_1 && !Jd.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = c;
        else {
          const d = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw Jd.set(a, d), d;
        }
      return /* @__PURE__ */ _.createElement("meta", { httpEquiv: "refresh", content: `0;url=${c}` });
    }
  }
  return e;
}
function lN({ routeContext: e, match: a, children: r }) {
  let l = _.useContext(Mr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ _.createElement(Va.Provider, { value: e }, r);
}
function oN(e, a = [], r) {
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
      pattern: es(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (y, g, v) => {
      let x, S = !1, R = null, N = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, R = g.route.errorElement || iN, c && (d < 0 && v === 0 ? (F1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, N = null) : d === v && (S = !0, N = g.route.hydrateFallbackElement || null)));
      let C = a.concat(s.slice(0, v + 1)), z = () => {
        let E;
        return x ? E = R : S ? E = N : g.route.Component ? E = /* @__PURE__ */ _.createElement(g.route.Component, null) : g.route.element ? E = g.route.element : E = y, /* @__PURE__ */ _.createElement(
          lN,
          {
            match: g,
            routeContext: {
              outlet: y,
              matches: C,
              isDataRoute: l != null
            },
            children: E
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || v === 0) ? /* @__PURE__ */ _.createElement(
        G1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: R,
          error: x,
          children: z(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: m
        }
      ) : z();
    },
    null
  );
}
function mm(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function sN(e) {
  let a = _.useContext(Mr);
  return Fe(a, mm(e)), a;
}
function X1(e) {
  let a = _.useContext(ts);
  return Fe(a, mm(e)), a;
}
function uN(e) {
  let a = _.useContext(Va);
  return Fe(a, mm(e)), a;
}
function yc(e) {
  let a = uN(e), r = a.matches[a.matches.length - 1];
  return Fe(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function cN() {
  return yc(
    "useRouteId"
    /* UseRouteId */
  );
}
function fN() {
  let e = X1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = yc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function dN() {
  let e = _.useContext(hm), a = X1(
    "useRouteError"
    /* UseRouteError */
  ), r = yc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[r];
}
function hN() {
  let { router: e } = sN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = yc(
    "useNavigate"
    /* UseNavigateStable */
  ), r = _.useRef(!1);
  return Y1(() => {
    r.current = !0;
  }), _.useCallback(
    async (s, u = {}) => {
      It(r.current, I1), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var rv = {};
function F1(e, a, r) {
  !a && !rv[e] && (rv[e] = !0, It(!1, r));
}
var lv = {};
function ov(e, a) {
  !e && !lv[a] && (lv[a] = !0, console.warn(a));
}
var mN = "useOptimistic", sv = T_[mN], pN = () => {
};
function gN(e) {
  return sv ? sv(e) : [e, pN];
}
function yN(e) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null
  };
  return e.Component && (e.element && It(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: _.createElement(e.Component),
    Component: void 0
  })), e.HydrateFallback && (e.hydrateFallbackElement && It(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: _.createElement(e.HydrateFallback),
    HydrateFallback: void 0
  })), e.ErrorBoundary && (e.errorElement && It(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: _.createElement(e.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var vN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function bN(e, a) {
  return x2({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: H_({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: vN,
    mapRouteProperties: yN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var xN = class {
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
function wN({
  router: e,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = V1() || l;
  let [u, c] = _.useState(e.state), [d, p] = gN(u), [m, y] = _.useState(), [g, v] = _.useState({
    isTransitioning: !1
  }), [x, S] = _.useState(), [R, N] = _.useState(), [C, z] = _.useState(), E = _.useRef(/* @__PURE__ */ new Map()), O = _.useCallback(
    (A, { deletedFetchers: I, newErrors: te, flushSync: $, viewTransitionOpts: K }) => {
      te && r && Object.values(te).forEach(
        (j) => r(j, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: es(A.matches)
        })
      ), A.fetchers.forEach((j, Y) => {
        j.data !== void 0 && E.current.set(Y, j.data);
      }), I.forEach((j) => E.current.delete(j)), ov(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let le = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (ov(
        K == null || le,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !le) {
        a && $ ? a(() => c(A)) : l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && p((j) => uv(j, A)), c(A);
        });
        return;
      }
      if (a && $) {
        a(() => {
          R && (x?.resolve(), R.skipTransition()), v({
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
            S(void 0), N(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => N(j));
        return;
      }
      R ? (x?.resolve(), R.skipTransition(), z({
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
      R,
      x,
      l,
      p,
      r
    ]
  );
  _.useLayoutEffect(() => e.subscribe(O), [e, O]), _.useEffect(() => {
    g.isTransitioning && !g.flushSync && S(new xN());
  }, [g]), _.useEffect(() => {
    if (x && m && e.window) {
      let A = m, I = x.promise, te = e.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : _.startTransition(() => {
          l === !0 && p(($) => uv($, A)), c(A);
        }), await I;
      });
      te.finished.finally(() => {
        S(void 0), N(void 0), y(void 0), v({ isTransitioning: !1 });
      }), N(te);
    }
  }, [
    m,
    x,
    e.window,
    l,
    p
  ]), _.useEffect(() => {
    x && m && d.location.key === m.location.key && x.resolve();
  }, [x, R, d.location, m]), _.useEffect(() => {
    !g.isTransitioning && C && (y(C.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), z(void 0));
  }, [g.isTransitioning, C]);
  let k = _.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (A) => e.navigate(A),
    push: (A, I, te) => e.navigate(A, {
      state: I,
      preventScrollReset: te?.preventScrollReset
    }),
    replace: (A, I, te) => e.navigate(A, {
      replace: !0,
      state: I,
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
  return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(Mr.Provider, { value: V }, /* @__PURE__ */ _.createElement(ts.Provider, { value: d }, /* @__PURE__ */ _.createElement(q1.Provider, { value: E.current }, /* @__PURE__ */ _.createElement(dm.Provider, { value: g }, /* @__PURE__ */ _.createElement(
    NN,
    {
      basename: B,
      location: d.location,
      navigationType: d.historyAction,
      navigator: k,
      useTransitions: l
    },
    /* @__PURE__ */ _.createElement(
      SN,
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
function uv(e, a) {
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
var SN = _.memo(EN);
function EN({
  routes: e,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return nN(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function _N(e) {
  return tN(e.context);
}
function NN({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Fe(
    !ns(),
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
  } = r, R = _.useMemo(() => {
    let N = oa(m, d);
    return N == null ? null : {
      location: {
        pathname: N,
        search: y,
        hash: g,
        state: v,
        key: x,
        mask: S
      },
      navigationType: l
    };
  }, [d, m, y, g, v, x, l, S]);
  return It(
    R != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), R == null ? null : /* @__PURE__ */ _.createElement(sa.Provider, { value: p }, /* @__PURE__ */ _.createElement(gc.Provider, { children: a, value: R }));
}
var $u = "get", Iu = "application/x-www-form-urlencoded";
function vc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function CN(e) {
  return vc(e) && e.tagName.toLowerCase() === "button";
}
function RN(e) {
  return vc(e) && e.tagName.toLowerCase() === "form";
}
function MN(e) {
  return vc(e) && e.tagName.toLowerCase() === "input";
}
function TN(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function DN(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !TN(e);
}
var wu = null;
function AN() {
  if (wu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), wu = !1;
    } catch {
      wu = !0;
    }
  return wu;
}
var zN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Wd(e) {
  return e != null && !zN.has(e) ? (It(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Iu}"`
  ), null) : e;
}
function ON(e, a) {
  let r, l, s, u, c;
  if (RN(e)) {
    let d = e.getAttribute("action");
    l = d ? oa(d, a) : null, r = e.getAttribute("method") || $u, s = Wd(e.getAttribute("enctype")) || Iu, u = new FormData(e);
  } else if (CN(e) || MN(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? oa(p, a) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || $u, s = Wd(e.getAttribute("formenctype")) || Wd(d.getAttribute("enctype")) || Iu, u = new FormData(d, e), !AN()) {
      let { name: m, type: y, value: g } = e;
      if (y === "image") {
        let v = m ? `${m}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else m && u.append(m, g);
    }
  } else {
    if (vc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = $u, l = null, s = Iu, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function pm(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function Z1(e, a, r, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && oa(s.pathname, a) === "/" ? s.pathname = `${Ku(a)}/_root.${l}` : s.pathname = `${Ku(s.pathname)}.${l}`, s;
}
async function jN(e, a) {
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
function LN(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function HN(e, a, r) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await jN(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return VN(
    l.flat(1).filter(LN).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function cv(e, a, r, l, s, u) {
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
function kN(e, a, { includeHydrateFallback: r } = {}) {
  return BN(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function BN(e) {
  return [...new Set(e)];
}
function UN(e) {
  let a = {}, r = Object.keys(e).sort();
  for (let l of r)
    a[l] = e[l];
  return a;
}
function VN(e, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(UN(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function gm() {
  let e = _.useContext(Mr);
  return pm(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function qN() {
  let e = _.useContext(ts);
  return pm(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var ym = _.createContext(void 0);
ym.displayName = "FrameworkContext";
function bc() {
  let e = _.useContext(ym);
  return pm(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function $N(e, a) {
  let r = _.useContext(ym), [l, s] = _.useState(!1), [u, c] = _.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: g } = a, v = _.useRef(null);
  _.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let R = (C) => {
        C.forEach((z) => {
          c(z.isIntersecting);
        });
      }, N = new IntersectionObserver(R, { threshold: 0.5 });
      return v.current && N.observe(v.current), () => {
        N.disconnect();
      };
    }
  }, [e]), _.useEffect(() => {
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
  }, S = () => {
    s(!1), c(!1);
  };
  return r ? e !== "intent" ? [u, v, {}] : [
    u,
    v,
    {
      onFocus: Ro(d, x),
      onBlur: Ro(p, S),
      onMouseEnter: Ro(m, x),
      onMouseLeave: Ro(y, S),
      onTouchStart: Ro(g, x)
    }
  ] : [!1, v, {}];
}
function Ro(e, a) {
  return (r) => {
    e && e(r), r.defaultPrevented || a(r);
  };
}
function IN({ page: e, ...a }) {
  let r = V1(), { nonce: l } = bc(), { router: s } = gm(), u = _.useMemo(
    () => v1(s.routes, e, s.basename),
    [s.routes, e, s.basename]
  );
  return u ? (a.nonce == null && l && (a = { ...a, nonce: l }), r ? /* @__PURE__ */ _.createElement(GN, { page: e, matches: u, ...a }) : /* @__PURE__ */ _.createElement(XN, { page: e, matches: u, ...a })) : null;
}
function YN(e) {
  let { manifest: a, routeModules: r } = bc(), [l, s] = _.useState([]);
  return _.useEffect(() => {
    let u = !1;
    return HN(e, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, r]), l;
}
function GN({
  page: e,
  matches: a,
  ...r
}) {
  let l = di(), { future: s } = bc(), { basename: u } = gm(), c = _.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = Z1(
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
function XN({
  page: e,
  matches: a,
  ...r
}) {
  let l = di(), { future: s, manifest: u, routeModules: c } = bc(), { basename: d } = gm(), { loaderData: p, matches: m } = qN(), y = _.useMemo(
    () => cv(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = _.useMemo(
    () => cv(
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
    let R = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((z) => {
      let E = u.routes[z.route.id];
      !E || !E.hasLoader || (!y.some((O) => O.route.id === z.route.id) && z.route.id in p && c[z.route.id]?.shouldRevalidate || E.hasClientLoader ? N = !0 : R.add(z.route.id));
    }), R.size === 0)
      return [];
    let C = Z1(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return N && R.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((z) => R.has(z.route.id)).map((z) => z.route.id).join(",")
    ), [C.pathname + C.search];
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
    () => kN(g, u),
    [g, u]
  ), S = YN(g);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, v.map((R) => /* @__PURE__ */ _.createElement("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...r })), x.map((R) => /* @__PURE__ */ _.createElement("link", { key: R, rel: "modulepreload", href: R, ...r })), S.map(({ key: R, link: N }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ _.createElement(
      "link",
      {
        key: R,
        nonce: r.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function FN(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var ZN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  ZN && (window.__reactRouterVersion = // @ts-expect-error
  "7.18.0");
} catch {
}
var Q1 = _.forwardRef(
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
  }, R) {
    let { basename: N, navigator: C, useTransitions: z } = _.useContext(sa), E = typeof y == "string" && hc.test(y), O = N1(y, N);
    y = O.to;
    let k = K2(y, { relative: s }), B = di(), V = null;
    if (d) {
      let Y = mc(
        d,
        [],
        B.mask ? B.mask.pathname : "/",
        !0
      );
      N !== "/" && (Y.pathname = Y.pathname === "/" ? N : la([N, Y.pathname])), V = C.createHref(Y);
    }
    let [A, I, te] = $N(
      l,
      S
    ), $ = JN(y, {
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
    function K(Y) {
      a && a(Y), Y.defaultPrevented || $(Y);
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
          ref: FN(R, I),
          target: m,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !E ? /* @__PURE__ */ _.createElement(_.Fragment, null, j, /* @__PURE__ */ _.createElement(IN, { page: k })) : j;
  }
);
Q1.displayName = "Link";
var QN = _.forwardRef(
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
    let g = as(c, { relative: m.relative }), v = di(), x = _.useContext(ts), { navigator: S, basename: R } = _.useContext(sa), N = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    aC(g) && d === !0, C = S.encodeLocation ? S.encodeLocation(g).pathname : g.pathname, z = v.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (z = z.toLowerCase(), E = E ? E.toLowerCase() : null, C = C.toLowerCase()), E && R && (E = oa(E, R) || E);
    const O = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let k = z === C || !s && z.startsWith(C) && z.charAt(O) === "/", B = E != null && (E === C || !s && E.startsWith(C) && E.charAt(C.length) === "/"), V = {
      isActive: k,
      isPending: B,
      isTransitioning: N
    }, A = k ? a : void 0, I;
    typeof l == "function" ? I = l(V) : I = [
      l,
      k ? "active" : null,
      B ? "pending" : null,
      N ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let te = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ _.createElement(
      Q1,
      {
        ...m,
        "aria-current": A,
        className: I,
        ref: y,
        style: te,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(V) : p
    );
  }
);
QN.displayName = "NavLink";
var PN = _.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = $u,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: g,
    defaultShouldRevalidate: v,
    ...x
  }, S) => {
    let { useTransitions: R } = _.useContext(sa), N = tC(), C = nC(d, { relative: m }), z = c.toLowerCase() === "get" ? "get" : "post", E = typeof d == "string" && hc.test(d), O = (k) => {
      if (p && p(k), k.defaultPrevented) return;
      k.preventDefault();
      let B = k.nativeEvent.submitter, V = B?.getAttribute("formmethod") || c, A = () => N(B || k.currentTarget, {
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
      R && r !== !1 ? _.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ _.createElement(
      "form",
      {
        ref: S,
        method: z,
        action: C,
        onSubmit: l ? p : O,
        ...x,
        "data-discover": !E && e === "render" ? "true" : void 0
      }
    );
  }
);
PN.displayName = "Form";
function KN(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function P1(e) {
  let a = _.useContext(Mr);
  return Fe(a, KN(e)), a;
}
function JN(e, {
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
  let y = J2(), g = di(), v = as(e, { relative: c });
  return _.useCallback(
    (x) => {
      if (DN(x, a)) {
        x.preventDefault();
        let S = r !== void 0 ? r : Ua(g) === Ua(v), R = () => y(e, {
          replace: S,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? _.startTransition(() => R()) : R();
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
var WN = 0, eC = () => `__${String(++WN)}__`;
function tC() {
  let { router: e } = P1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = _.useContext(sa), r = cN(), l = e.fetch, s = e.navigate;
  return _.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: y, body: g } = ON(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || eC();
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
function nC(e, { relative: a } = {}) {
  let { basename: r } = _.useContext(sa), l = _.useContext(Va);
  Fe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...as(e || ".", { relative: a }) }, c = di();
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
function aC(e, { relative: a } = {}) {
  let r = _.useContext(dm);
  Fe(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = P1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = as(e, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = oa(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = oa(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return Pu(s.pathname, c) != null || Pu(s.pathname, u) != null;
}
const iC = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], rC = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], K1 = {
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
}, lC = "Wan2.2-I2V-A14B fp8 (Kijai, bundled)";
class xc extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const wc = "/api/v1/extensions/nexus.video.svi2-pro";
async function Tr(e, a) {
  const r = e.startsWith("http") ? e : `${wc}${e}`, l = await fetch(r, {
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
    throw new xc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function oC(e, a, r) {
  const l = e.startsWith("http") ? e : `${wc}${e}`, s = new EventSource(l);
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
async function J1() {
  return Tr("/presets");
}
async function sC() {
  return Tr("/settings");
}
async function W1(e) {
  return Tr("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var uC = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function In({ tone: e = "neutral", children: a, className: r }) {
  const l = [uC[e], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsx("span", { className: l, children: a });
}
var cC = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, fC = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, dC = "_1h48t1v9";
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
  const p = [cC[e], fC[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ b.jsx("span", { className: dC, "aria-hidden": "true" }) : null,
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
var hC = { value: () => {
} };
function Sc() {
  for (var e = 0, a = arguments.length, r = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new Yu(r);
}
function Yu(e) {
  this._ = e;
}
function mC(e, a) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
Yu.prototype = Sc.prototype = {
  constructor: Yu,
  on: function(e, a) {
    var r = this._, l = mC(e + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = pC(r[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) r[s] = fv(r[s], e.name, a);
      else if (a == null) for (s in r) r[s] = fv(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var r in a) e[r] = a[r].slice();
    return new Yu(e);
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
function pC(e, a) {
  for (var r = 0, l = e.length, s; r < l; ++r)
    if ((s = e[r]).name === a)
      return s.value;
}
function fv(e, a, r) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = hC, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return r != null && e.push({ name: a, value: r }), e;
}
var Th = "http://www.w3.org/1999/xhtml";
const dv = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Th,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ec(e) {
  var a = e += "", r = a.indexOf(":");
  return r >= 0 && (a = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), dv.hasOwnProperty(a) ? { space: dv[a], local: e } : e;
}
function gC(e) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === Th && a.documentElement.namespaceURI === Th ? a.createElement(e) : a.createElementNS(r, e);
  };
}
function yC(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function ex(e) {
  var a = Ec(e);
  return (a.local ? yC : gC)(a);
}
function vC() {
}
function vm(e) {
  return e == null ? vC : function() {
    return this.querySelector(e);
  };
}
function bC(e) {
  typeof e != "function" && (e = vm(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, y = 0; y < c; ++y)
      (p = u[y]) && (m = e.call(p, p.__data__, y, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[y] = m);
  return new Gn(l, this._parents);
}
function xC(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function wC() {
  return [];
}
function tx(e) {
  return e == null ? wC : function() {
    return this.querySelectorAll(e);
  };
}
function SC(e) {
  return function() {
    return xC(e.apply(this, arguments));
  };
}
function EC(e) {
  typeof e == "function" ? e = SC(e) : e = tx(e);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new Gn(l, s);
}
function nx(e) {
  return function() {
    return this.matches(e);
  };
}
function ax(e) {
  return function(a) {
    return a.matches(e);
  };
}
var _C = Array.prototype.find;
function NC(e) {
  return function() {
    return _C.call(this.children, e);
  };
}
function CC() {
  return this.firstElementChild;
}
function RC(e) {
  return this.select(e == null ? CC : NC(typeof e == "function" ? e : ax(e)));
}
var MC = Array.prototype.filter;
function TC() {
  return Array.from(this.children);
}
function DC(e) {
  return function() {
    return MC.call(this.children, e);
  };
}
function AC(e) {
  return this.selectAll(e == null ? TC : DC(typeof e == "function" ? e : ax(e)));
}
function zC(e) {
  typeof e != "function" && (e = nx(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Gn(l, this._parents);
}
function ix(e) {
  return new Array(e.length);
}
function OC() {
  return new Gn(this._enter || this._groups.map(ix), this._parents);
}
function Ju(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
Ju.prototype = {
  constructor: Ju,
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
function jC(e) {
  return function() {
    return e;
  };
}
function LC(e, a, r, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : r[c] = new Ju(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function HC(e, a, r, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), y = a.length, g = u.length, v = new Array(y), x;
  for (d = 0; d < y; ++d)
    (p = a[d]) && (v[d] = x = c.call(p, p.__data__, d, a) + "", m.has(x) ? s[d] = p : m.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = m.get(x)) ? (l[d] = p, p.__data__ = u[d], m.delete(x)) : r[d] = new Ju(e, u[d]);
  for (d = 0; d < y; ++d)
    (p = a[d]) && m.get(v[d]) === p && (s[d] = p);
}
function kC(e) {
  return e.__data__;
}
function BC(e, a) {
  if (!arguments.length) return Array.from(this, kC);
  var r = a ? HC : LC, l = this._parents, s = this._groups;
  typeof e != "function" && (e = jC(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], g = s[m], v = g.length, x = UC(e.call(y, y && y.__data__, m, l)), S = x.length, R = d[m] = new Array(S), N = c[m] = new Array(S), C = p[m] = new Array(v);
    r(y, g, R, N, C, x, a);
    for (var z = 0, E = 0, O, k; z < S; ++z)
      if (O = R[z]) {
        for (z >= E && (E = z + 1); !(k = N[E]) && ++E < S; ) ;
        O._next = k || null;
      }
  }
  return c = new Gn(c, l), c._enter = d, c._exit = p, c;
}
function UC(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function VC() {
  return new Gn(this._exit || this._groups.map(ix), this._parents);
}
function qC(e, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function $C(e) {
  for (var a = e.selection ? e.selection() : e, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = r[p], y = l[p], g = m.length, v = d[p] = new Array(g), x, S = 0; S < g; ++S)
      (x = m[S] || y[S]) && (v[S] = x);
  for (; p < s; ++p)
    d[p] = r[p];
  return new Gn(d, this._parents);
}
function IC() {
  for (var e = this._groups, a = -1, r = e.length; ++a < r; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function YC(e) {
  e || (e = GC);
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
function GC(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function XC() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function FC() {
  return Array.from(this);
}
function ZC() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function QC() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function PC() {
  return !this.node();
}
function KC(e) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function JC(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function WC(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function eR(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function tR(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function nR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function aR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function iR(e, a) {
  var r = Ec(e);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? WC : JC : typeof a == "function" ? r.local ? aR : nR : r.local ? tR : eR)(r, a));
}
function rx(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function rR(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function lR(e, a, r) {
  return function() {
    this.style.setProperty(e, a, r);
  };
}
function oR(e, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, r);
  };
}
function sR(e, a, r) {
  return arguments.length > 1 ? this.each((a == null ? rR : typeof a == "function" ? oR : lR)(e, a, r ?? "")) : wl(this.node(), e);
}
function wl(e, a) {
  return e.style.getPropertyValue(a) || rx(e).getComputedStyle(e, null).getPropertyValue(a);
}
function uR(e) {
  return function() {
    delete this[e];
  };
}
function cR(e, a) {
  return function() {
    this[e] = a;
  };
}
function fR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function dR(e, a) {
  return arguments.length > 1 ? this.each((a == null ? uR : typeof a == "function" ? fR : cR)(e, a)) : this.node()[e];
}
function lx(e) {
  return e.trim().split(/^|\s+/);
}
function bm(e) {
  return e.classList || new ox(e);
}
function ox(e) {
  this._node = e, this._names = lx(e.getAttribute("class") || "");
}
ox.prototype = {
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
function sx(e, a) {
  for (var r = bm(e), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function ux(e, a) {
  for (var r = bm(e), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function hR(e) {
  return function() {
    sx(this, e);
  };
}
function mR(e) {
  return function() {
    ux(this, e);
  };
}
function pR(e, a) {
  return function() {
    (a.apply(this, arguments) ? sx : ux)(this, e);
  };
}
function gR(e, a) {
  var r = lx(e + "");
  if (arguments.length < 2) {
    for (var l = bm(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? pR : a ? hR : mR)(r, a));
}
function yR() {
  this.textContent = "";
}
function vR(e) {
  return function() {
    this.textContent = e;
  };
}
function bR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function xR(e) {
  return arguments.length ? this.each(e == null ? yR : (typeof e == "function" ? bR : vR)(e)) : this.node().textContent;
}
function wR() {
  this.innerHTML = "";
}
function SR(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ER(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function _R(e) {
  return arguments.length ? this.each(e == null ? wR : (typeof e == "function" ? ER : SR)(e)) : this.node().innerHTML;
}
function NR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function CR() {
  return this.each(NR);
}
function RR() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function MR() {
  return this.each(RR);
}
function TR(e) {
  var a = typeof e == "function" ? e : ex(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function DR() {
  return null;
}
function AR(e, a) {
  var r = typeof e == "function" ? e : ex(e), l = a == null ? DR : typeof a == "function" ? a : vm(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function zR() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function OR() {
  return this.each(zR);
}
function jR() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function LR() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function HR(e) {
  return this.select(e ? LR : jR);
}
function kR(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function BR(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function UR(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function VR(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function qR(e, a, r) {
  return function() {
    var l = this.__on, s, u = BR(a);
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
function $R(e, a, r) {
  var l = UR(e + ""), s, u = l.length, c;
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
  for (d = a ? qR : VR, s = 0; s < u; ++s) this.each(d(l[s], a, r));
  return this;
}
function cx(e, a, r) {
  var l = rx(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function IR(e, a) {
  return function() {
    return cx(this, e, a);
  };
}
function YR(e, a) {
  return function() {
    return cx(this, e, a.apply(this, arguments));
  };
}
function GR(e, a) {
  return this.each((typeof a == "function" ? YR : IR)(e, a));
}
function* XR() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var fx = [null];
function Gn(e, a) {
  this._groups = e, this._parents = a;
}
function is() {
  return new Gn([[document.documentElement]], fx);
}
function FR() {
  return this;
}
Gn.prototype = is.prototype = {
  constructor: Gn,
  select: bC,
  selectAll: EC,
  selectChild: RC,
  selectChildren: AC,
  filter: zC,
  data: BC,
  enter: OC,
  exit: VC,
  join: qC,
  merge: $C,
  selection: FR,
  order: IC,
  sort: YC,
  call: XC,
  nodes: FC,
  node: ZC,
  size: QC,
  empty: PC,
  each: KC,
  attr: iR,
  style: sR,
  property: dR,
  classed: gR,
  text: xR,
  html: _R,
  raise: CR,
  lower: MR,
  append: TR,
  insert: AR,
  remove: OR,
  clone: HR,
  datum: kR,
  on: $R,
  dispatch: GR,
  [Symbol.iterator]: XR
};
function Yn(e) {
  return typeof e == "string" ? new Gn([[document.querySelector(e)]], [document.documentElement]) : new Gn([[e]], fx);
}
function ZR(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function ya(e, a) {
  if (e = ZR(e), a === void 0 && (a = e.currentTarget), a) {
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
const QR = { passive: !1 }, $o = { capture: !0, passive: !1 };
function eh(e) {
  e.stopImmediatePropagation();
}
function vl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function dx(e) {
  var a = e.document.documentElement, r = Yn(e).on("dragstart.drag", vl, $o);
  "onselectstart" in a ? r.on("selectstart.drag", vl, $o) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function hx(e, a) {
  var r = e.document.documentElement, l = Yn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", vl, $o), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const Su = (e) => () => e;
function Dh(e, {
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
Dh.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function PR(e) {
  return !e.ctrlKey && !e.button;
}
function KR() {
  return this.parentNode;
}
function JR(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function WR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function mx() {
  var e = PR, a = KR, r = JR, l = WR, s = {}, u = Sc("start", "drag", "end"), c = 0, d, p, m, y, g = 0;
  function v(O) {
    O.on("mousedown.drag", x).filter(l).on("touchstart.drag", N).on("touchmove.drag", C, QR).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(O, k) {
    if (!(y || !e.call(this, O, k))) {
      var B = E(this, a.call(this, O, k), O, k, "mouse");
      B && (Yn(O.view).on("mousemove.drag", S, $o).on("mouseup.drag", R, $o), dx(O.view), eh(O), m = !1, d = O.clientX, p = O.clientY, B("start", O));
    }
  }
  function S(O) {
    if (vl(O), !m) {
      var k = O.clientX - d, B = O.clientY - p;
      m = k * k + B * B > g;
    }
    s.mouse("drag", O);
  }
  function R(O) {
    Yn(O.view).on("mousemove.drag mouseup.drag", null), hx(O.view, m), vl(O), s.mouse("end", O);
  }
  function N(O, k) {
    if (e.call(this, O, k)) {
      var B = O.changedTouches, V = a.call(this, O, k), A = B.length, I, te;
      for (I = 0; I < A; ++I)
        (te = E(this, V, O, k, B[I].identifier, B[I])) && (eh(O), te("start", O, B[I]));
    }
  }
  function C(O) {
    var k = O.changedTouches, B = k.length, V, A;
    for (V = 0; V < B; ++V)
      (A = s[k[V].identifier]) && (vl(O), A("drag", O, k[V]));
  }
  function z(O) {
    var k = O.changedTouches, B = k.length, V, A;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), V = 0; V < B; ++V)
      (A = s[k[V].identifier]) && (eh(O), A("end", O, k[V]));
  }
  function E(O, k, B, V, A, I) {
    var te = u.copy(), $ = ya(I || B, k), K, le, j;
    if ((j = r.call(O, new Dh("beforestart", {
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
      return K = j.x - $[0] || 0, le = j.y - $[1] || 0, function Y(M, L, F) {
        var G = $, Z;
        switch (M) {
          case "start":
            s[A] = Y, Z = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            $ = ya(F || L, k), Z = c;
            break;
        }
        te.call(
          M,
          O,
          new Dh(M, {
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
    return arguments.length ? (e = typeof O == "function" ? O : Su(!!O), v) : e;
  }, v.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : Su(O), v) : a;
  }, v.subject = function(O) {
    return arguments.length ? (r = typeof O == "function" ? O : Su(O), v) : r;
  }, v.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : Su(!!O), v) : l;
  }, v.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? v : O;
  }, v.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, v) : Math.sqrt(g);
  }, v;
}
function xm(e, a, r) {
  e.prototype = a.prototype = r, r.constructor = e;
}
function px(e, a) {
  var r = Object.create(e.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function rs() {
}
var Io = 0.7, Wu = 1 / Io, bl = "\\s*([+-]?\\d+)\\s*", Yo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ka = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", eM = /^#([0-9a-f]{3,8})$/, tM = new RegExp(`^rgb\\(${bl},${bl},${bl}\\)$`), nM = new RegExp(`^rgb\\(${ka},${ka},${ka}\\)$`), aM = new RegExp(`^rgba\\(${bl},${bl},${bl},${Yo}\\)$`), iM = new RegExp(`^rgba\\(${ka},${ka},${ka},${Yo}\\)$`), rM = new RegExp(`^hsl\\(${Yo},${ka},${ka}\\)$`), lM = new RegExp(`^hsla\\(${Yo},${ka},${ka},${Yo}\\)$`), hv = {
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
xm(rs, Sr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: mv,
  // Deprecated! Use color.formatHex.
  formatHex: mv,
  formatHex8: oM,
  formatHsl: sM,
  formatRgb: pv,
  toString: pv
});
function mv() {
  return this.rgb().formatHex();
}
function oM() {
  return this.rgb().formatHex8();
}
function sM() {
  return gx(this).formatHsl();
}
function pv() {
  return this.rgb().formatRgb();
}
function Sr(e) {
  var a, r;
  return e = (e + "").trim().toLowerCase(), (a = eM.exec(e)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? gv(a) : r === 3 ? new An(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? Eu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? Eu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = tM.exec(e)) ? new An(a[1], a[2], a[3], 1) : (a = nM.exec(e)) ? new An(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = aM.exec(e)) ? Eu(a[1], a[2], a[3], a[4]) : (a = iM.exec(e)) ? Eu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = rM.exec(e)) ? bv(a[1], a[2] / 100, a[3] / 100, 1) : (a = lM.exec(e)) ? bv(a[1], a[2] / 100, a[3] / 100, a[4]) : hv.hasOwnProperty(e) ? gv(hv[e]) : e === "transparent" ? new An(NaN, NaN, NaN, 0) : null;
}
function gv(e) {
  return new An(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Eu(e, a, r, l) {
  return l <= 0 && (e = a = r = NaN), new An(e, a, r, l);
}
function uM(e) {
  return e instanceof rs || (e = Sr(e)), e ? (e = e.rgb(), new An(e.r, e.g, e.b, e.opacity)) : new An();
}
function Ah(e, a, r, l) {
  return arguments.length === 1 ? uM(e) : new An(e, a, r, l ?? 1);
}
function An(e, a, r, l) {
  this.r = +e, this.g = +a, this.b = +r, this.opacity = +l;
}
xm(An, Ah, px(rs, {
  brighter(e) {
    return e = e == null ? Wu : Math.pow(Wu, e), new An(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Io : Math.pow(Io, e), new An(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new An(xr(this.r), xr(this.g), xr(this.b), ec(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: yv,
  // Deprecated! Use color.formatHex.
  formatHex: yv,
  formatHex8: cM,
  formatRgb: vv,
  toString: vv
}));
function yv() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}`;
}
function cM() {
  return `#${vr(this.r)}${vr(this.g)}${vr(this.b)}${vr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function vv() {
  const e = ec(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${xr(this.r)}, ${xr(this.g)}, ${xr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ec(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function xr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function vr(e) {
  return e = xr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function bv(e, a, r, l) {
  return l <= 0 ? e = a = r = NaN : r <= 0 || r >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new va(e, a, r, l);
}
function gx(e) {
  if (e instanceof va) return new va(e.h, e.s, e.l, e.opacity);
  if (e instanceof rs || (e = Sr(e)), !e) return new va();
  if (e instanceof va) return e;
  e = e.rgb();
  var a = e.r / 255, r = e.g / 255, l = e.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (r - l) / d + (r < l) * 6 : r === u ? c = (l - a) / d + 2 : c = (a - r) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new va(c, d, p, e.opacity);
}
function fM(e, a, r, l) {
  return arguments.length === 1 ? gx(e) : new va(e, a, r, l ?? 1);
}
function va(e, a, r, l) {
  this.h = +e, this.s = +a, this.l = +r, this.opacity = +l;
}
xm(va, fM, px(rs, {
  brighter(e) {
    return e = e == null ? Wu : Math.pow(Wu, e), new va(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Io : Math.pow(Io, e), new va(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new An(
      th(e >= 240 ? e - 240 : e + 120, s, l),
      th(e, s, l),
      th(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new va(xv(this.h), _u(this.s), _u(this.l), ec(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = ec(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${xv(this.h)}, ${_u(this.s) * 100}%, ${_u(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function xv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function _u(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function th(e, a, r) {
  return (e < 60 ? a + (r - a) * e / 60 : e < 180 ? r : e < 240 ? a + (r - a) * (240 - e) / 60 : a) * 255;
}
const wm = (e) => () => e;
function dM(e, a) {
  return function(r) {
    return e + r * a;
  };
}
function hM(e, a, r) {
  return e = Math.pow(e, r), a = Math.pow(a, r) - e, r = 1 / r, function(l) {
    return Math.pow(e + l * a, r);
  };
}
function mM(e) {
  return (e = +e) == 1 ? yx : function(a, r) {
    return r - a ? hM(a, r, e) : wm(isNaN(a) ? r : a);
  };
}
function yx(e, a) {
  var r = a - e;
  return r ? dM(e, r) : wm(isNaN(e) ? a : e);
}
const tc = (function e(a) {
  var r = mM(a);
  function l(s, u) {
    var c = r((s = Ah(s)).r, (u = Ah(u)).r), d = r(s.g, u.g), p = r(s.b, u.b), m = yx(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = d(y), s.b = p(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function pM(e, a) {
  a || (a = []);
  var r = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function gM(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function yM(e, a) {
  var r = a ? a.length : 0, l = e ? Math.min(r, e.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = ko(e[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function vM(e, a) {
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
function bM(e, a) {
  var r = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? r[s] = ko(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var zh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, nh = new RegExp(zh.source, "g");
function xM(e) {
  return function() {
    return e;
  };
}
function wM(e) {
  return function(a) {
    return e(a) + "";
  };
}
function vx(e, a) {
  var r = zh.lastIndex = nh.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = zh.exec(e)) && (s = nh.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: ja(l, s) })), r = nh.lastIndex;
  return r < a.length && (u = a.slice(r), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? wM(p[0].x) : xM(a) : (a = p.length, function(m) {
    for (var y = 0, g; y < a; ++y) d[(g = p[y]).i] = g.x(m);
    return d.join("");
  });
}
function ko(e, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? wm(a) : (r === "number" ? ja : r === "string" ? (l = Sr(a)) ? (a = l, tc) : vx : a instanceof Sr ? tc : a instanceof Date ? vM : gM(a) ? pM : Array.isArray(a) ? yM : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? bM : ja)(e, a);
}
var wv = 180 / Math.PI, Oh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function bx(e, a, r, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * r + a * l) && (r -= e * p, l -= a * p), (d = Math.sqrt(r * r + l * l)) && (r /= d, l /= d, p /= d), e * l < a * r && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * wv,
    skewX: Math.atan(p) * wv,
    scaleX: c,
    scaleY: d
  };
}
var Nu;
function SM(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Oh : bx(a.a, a.b, a.c, a.d, a.e, a.f);
}
function EM(e) {
  return e == null || (Nu || (Nu = document.createElementNS("http://www.w3.org/2000/svg", "g")), Nu.setAttribute("transform", e), !(e = Nu.transform.baseVal.consolidate())) ? Oh : (e = e.matrix, bx(e.a, e.b, e.c, e.d, e.e, e.f));
}
function xx(e, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, g, v, x, S) {
    if (m !== g || y !== v) {
      var R = x.push("translate(", null, a, null, r);
      S.push({ i: R - 4, x: ja(m, g) }, { i: R - 2, x: ja(y, v) });
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
      var R = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: R - 4, x: ja(m, g) }, { i: R - 2, x: ja(y, v) });
    } else (g !== 1 || v !== 1) && x.push(s(x) + "scale(" + g + "," + v + ")");
  }
  return function(m, y) {
    var g = [], v = [];
    return m = e(m), y = e(y), u(m.translateX, m.translateY, y.translateX, y.translateY, g, v), c(m.rotate, y.rotate, g, v), d(m.skewX, y.skewX, g, v), p(m.scaleX, m.scaleY, y.scaleX, y.scaleY, g, v), m = y = null, function(x) {
      for (var S = -1, R = v.length, N; ++S < R; ) g[(N = v[S]).i] = N.x(x);
      return g.join("");
    };
  };
}
var _M = xx(SM, "px, ", "px)", "deg)"), NM = xx(EM, ", ", ")", ")"), CM = 1e-12;
function Sv(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function RM(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function MM(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Gu = (function e(a, r, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], y = c[0], g = c[1], v = c[2], x = y - d, S = g - p, R = x * x + S * S, N, C;
    if (R < CM)
      C = Math.log(v / m) / a, N = function(V) {
        return [
          d + V * x,
          p + V * S,
          m * Math.exp(a * V * C)
        ];
      };
    else {
      var z = Math.sqrt(R), E = (v * v - m * m + l * R) / (2 * m * r * z), O = (v * v - m * m - l * R) / (2 * v * r * z), k = Math.log(Math.sqrt(E * E + 1) - E), B = Math.log(Math.sqrt(O * O + 1) - O);
      C = (B - k) / a, N = function(V) {
        var A = V * C, I = Sv(k), te = m / (r * z) * (I * MM(a * A + k) - RM(k));
        return [
          d + te * x,
          p + te * S,
          m * I / Sv(a * A + k)
        ];
      };
    }
    return N.duration = C * 1e3 * a / Math.SQRT2, N;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Sl = 0, jo = 0, Mo = 0, wx = 1e3, nc, Lo, ac = 0, Er = 0, _c = 0, Go = typeof performance == "object" && performance.now ? performance : Date, Sx = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Sm() {
  return Er || (Sx(TM), Er = Go.now() + _c);
}
function TM() {
  Er = 0;
}
function ic() {
  this._call = this._time = this._next = null;
}
ic.prototype = Ex.prototype = {
  constructor: ic,
  restart: function(e, a, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Sm() : +r) + (a == null ? 0 : +a), !this._next && Lo !== this && (Lo ? Lo._next = this : nc = this, Lo = this), this._call = e, this._time = r, jh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, jh());
  }
};
function Ex(e, a, r) {
  var l = new ic();
  return l.restart(e, a, r), l;
}
function DM() {
  Sm(), ++Sl;
  for (var e = nc, a; e; )
    (a = Er - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Sl;
}
function Ev() {
  Er = (ac = Go.now()) + _c, Sl = jo = 0;
  try {
    DM();
  } finally {
    Sl = 0, zM(), Er = 0;
  }
}
function AM() {
  var e = Go.now(), a = e - ac;
  a > wx && (_c -= a, ac = e);
}
function zM() {
  for (var e, a = nc, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (r = a._next, a._next = null, a = e ? e._next = r : nc = r);
  Lo = e, jh(l);
}
function jh(e) {
  if (!Sl) {
    jo && (jo = clearTimeout(jo));
    var a = e - Er;
    a > 24 ? (e < 1 / 0 && (jo = setTimeout(Ev, e - Go.now() - _c)), Mo && (Mo = clearInterval(Mo))) : (Mo || (ac = Go.now(), Mo = setInterval(AM, wx)), Sl = 1, Sx(Ev));
  }
}
function _v(e, a, r) {
  var l = new ic();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, r), l;
}
var OM = Sc("start", "end", "cancel", "interrupt"), jM = [], _x = 0, Nv = 1, Lh = 2, Xu = 3, Cv = 4, Hh = 5, Fu = 6;
function Nc(e, a, r, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (r in c) return;
  LM(e, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: OM,
    tween: jM,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: _x
  });
}
function Em(e, a) {
  var r = Ea(e, a);
  if (r.state > _x) throw new Error("too late; already scheduled");
  return r;
}
function qa(e, a) {
  var r = Ea(e, a);
  if (r.state > Xu) throw new Error("too late; already running");
  return r;
}
function Ea(e, a) {
  var r = e.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function LM(e, a, r) {
  var l = e.__transition, s;
  l[a] = r, r.timer = Ex(u, 0, r.time);
  function u(m) {
    r.state = Nv, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var y, g, v, x;
    if (r.state !== Nv) return p();
    for (y in l)
      if (x = l[y], x.name === r.name) {
        if (x.state === Xu) return _v(c);
        x.state === Cv ? (x.state = Fu, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[y]) : +y < a && (x.state = Fu, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[y]);
      }
    if (_v(function() {
      r.state === Xu && (r.state = Cv, r.timer.restart(d, r.delay, r.time), d(m));
    }), r.state = Lh, r.on.call("start", e, e.__data__, r.index, r.group), r.state === Lh) {
      for (r.state = Xu, s = new Array(v = r.tween.length), y = 0, g = -1; y < v; ++y)
        (x = r.tween[y].value.call(e, e.__data__, r.index, r.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var y = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(p), r.state = Hh, 1), g = -1, v = s.length; ++g < v; )
      s[g].call(e, y);
    r.state === Hh && (r.on.call("end", e, e.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = Fu, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function Zu(e, a) {
  var r = e.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > Lh && l.state < Hh, l.state = Fu, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete r[c];
    }
    u && delete e.__transition;
  }
}
function HM(e) {
  return this.each(function() {
    Zu(this, e);
  });
}
function kM(e, a) {
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
function BM(e, a, r) {
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
function UM(e, a) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = Ea(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? kM : BM)(r, e, a));
}
function _m(e, a, r) {
  var l = e._id;
  return e.each(function() {
    var s = qa(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return Ea(s, l).value[a];
  };
}
function Nx(e, a) {
  var r;
  return (typeof a == "number" ? ja : a instanceof Sr ? tc : (r = Sr(a)) ? (a = r, tc) : vx)(e, a);
}
function VM(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function qM(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function $M(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function IM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function YM(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function GM(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function XM(e, a) {
  var r = Ec(e), l = r === "transform" ? NM : Nx;
  return this.attrTween(e, typeof a == "function" ? (r.local ? GM : YM)(r, l, _m(this, "attr." + e, a)) : a == null ? (r.local ? qM : VM)(r) : (r.local ? IM : $M)(r, l, a));
}
function FM(e, a) {
  return function(r) {
    this.setAttribute(e, a.call(this, r));
  };
}
function ZM(e, a) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, a.call(this, r));
  };
}
function QM(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && ZM(e, u)), r;
  }
  return s._value = a, s;
}
function PM(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && FM(e, u)), r;
  }
  return s._value = a, s;
}
function KM(e, a) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = Ec(e);
  return this.tween(r, (l.local ? QM : PM)(l, a));
}
function JM(e, a) {
  return function() {
    Em(this, e).delay = +a.apply(this, arguments);
  };
}
function WM(e, a) {
  return a = +a, function() {
    Em(this, e).delay = a;
  };
}
function eT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? JM : WM)(a, e)) : Ea(this.node(), a).delay;
}
function tT(e, a) {
  return function() {
    qa(this, e).duration = +a.apply(this, arguments);
  };
}
function nT(e, a) {
  return a = +a, function() {
    qa(this, e).duration = a;
  };
}
function aT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? tT : nT)(a, e)) : Ea(this.node(), a).duration;
}
function iT(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    qa(this, e).ease = a;
  };
}
function rT(e) {
  var a = this._id;
  return arguments.length ? this.each(iT(a, e)) : Ea(this.node(), a).ease;
}
function lT(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    qa(this, e).ease = r;
  };
}
function oT(e) {
  if (typeof e != "function") throw new Error();
  return this.each(lT(this._id, e));
}
function sT(e) {
  typeof e != "function" && (e = nx(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new fi(l, this._parents, this._name, this._id);
}
function uT(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, r = e._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = r[d], y = p.length, g = c[d] = new Array(y), v, x = 0; x < y; ++x)
      (v = p[x] || m[x]) && (g[x] = v);
  for (; d < l; ++d)
    c[d] = a[d];
  return new fi(c, this._parents, this._name, this._id);
}
function cT(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function fT(e, a, r) {
  var l, s, u = cT(a) ? Em : qa;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, r), c.on = s;
  };
}
function dT(e, a) {
  var r = this._id;
  return arguments.length < 2 ? Ea(this.node(), r).on.on(e) : this.each(fT(r, e, a));
}
function hT(e) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    a && a.removeChild(this);
  };
}
function mT() {
  return this.on("end.remove", hT(this._id));
}
function pT(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = vm(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), y, g, v = 0; v < p; ++v)
      (y = d[v]) && (g = e.call(y, y.__data__, v, d)) && ("__data__" in y && (g.__data__ = y.__data__), m[v] = g, Nc(m[v], a, r, v, m, Ea(y, r)));
  return new fi(u, this._parents, a, r);
}
function gT(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = tx(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, y, g = 0; g < m; ++g)
      if (y = p[g]) {
        for (var v = e.call(y, y.__data__, g, p), x, S = Ea(y, r), R = 0, N = v.length; R < N; ++R)
          (x = v[R]) && Nc(x, a, r, R, v, S);
        u.push(v), c.push(y);
      }
  return new fi(u, c, a, r);
}
var yT = is.prototype.constructor;
function vT() {
  return new yT(this._groups, this._parents);
}
function bT(e, a) {
  var r, l, s;
  return function() {
    var u = wl(this, e), c = (this.style.removeProperty(e), wl(this, e));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function Cx(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function xT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = wl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function wT(e, a, r) {
  var l, s, u;
  return function() {
    var c = wl(this, e), d = r(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), wl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function ST(e, a) {
  var r, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = qa(this, e), m = p.on, y = p.value[u] == null ? d || (d = Cx(a)) : void 0;
    (m !== r || s !== y) && (l = (r = m).copy()).on(c, s = y), p.on = l;
  };
}
function ET(e, a, r) {
  var l = (e += "") == "transform" ? _M : Nx;
  return a == null ? this.styleTween(e, bT(e, l)).on("end.style." + e, Cx(e)) : typeof a == "function" ? this.styleTween(e, wT(e, l, _m(this, "style." + e, a))).each(ST(this._id, e)) : this.styleTween(e, xT(e, l, a), r).on("end.style." + e, null);
}
function _T(e, a, r) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), r);
  };
}
function NT(e, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && _T(e, c, r)), l;
  }
  return u._value = a, u;
}
function CT(e, a, r) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, NT(e, a, r ?? ""));
}
function RT(e) {
  return function() {
    this.textContent = e;
  };
}
function MT(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function TT(e) {
  return this.tween("text", typeof e == "function" ? MT(_m(this, "text", e)) : RT(e == null ? "" : e + ""));
}
function DT(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function AT(e) {
  var a, r;
  function l() {
    var s = e.apply(this, arguments);
    return s !== r && (a = (r = s) && DT(s)), a;
  }
  return l._value = e, l;
}
function zT(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, AT(e));
}
function OT() {
  for (var e = this._name, a = this._id, r = Rx(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var y = Ea(p, a);
        Nc(p, e, r, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new fi(l, this._parents, e, r);
}
function jT() {
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
var LT = 0;
function fi(e, a, r, l) {
  this._groups = e, this._parents = a, this._name = r, this._id = l;
}
function Rx() {
  return ++LT;
}
var li = is.prototype;
fi.prototype = {
  constructor: fi,
  select: pT,
  selectAll: gT,
  selectChild: li.selectChild,
  selectChildren: li.selectChildren,
  filter: sT,
  merge: uT,
  selection: vT,
  transition: OT,
  call: li.call,
  nodes: li.nodes,
  node: li.node,
  size: li.size,
  empty: li.empty,
  each: li.each,
  on: dT,
  attr: XM,
  attrTween: KM,
  style: ET,
  styleTween: CT,
  text: TT,
  textTween: zT,
  remove: mT,
  tween: UM,
  delay: eT,
  duration: aT,
  ease: rT,
  easeVarying: oT,
  end: jT,
  [Symbol.iterator]: li[Symbol.iterator]
};
function HT(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var kT = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: HT
};
function BT(e, a) {
  for (var r; !(r = e.__transition) || !(r = r[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function UT(e) {
  var a, r;
  e instanceof fi ? (a = e._id, e = e._name) : (a = Rx(), (r = kT).time = Sm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && Nc(p, e, a, m, c, r || BT(p, a));
  return new fi(l, this._parents, e, a);
}
is.prototype.interrupt = HM;
is.prototype.transition = UT;
const Cu = (e) => () => e;
function VT(e, {
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
var Cc = new ui(1, 0, 0);
Mx.prototype = ui.prototype;
function Mx(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Cc;
  return e.__zoom;
}
function ah(e) {
  e.stopImmediatePropagation();
}
function To(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function qT(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function $T() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Rv() {
  return this.__zoom || Cc;
}
function IT(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function YT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function GT(e, a, r) {
  var l = e.invertX(a[0][0]) - r[0][0], s = e.invertX(a[1][0]) - r[1][0], u = e.invertY(a[0][1]) - r[0][1], c = e.invertY(a[1][1]) - r[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function Tx() {
  var e = qT, a = $T, r = GT, l = IT, s = YT, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = Gu, m = Sc("start", "zoom", "end"), y, g, v, x = 500, S = 150, R = 0, N = 10;
  function C(j) {
    j.property("__zoom", Rv).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", te).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", le).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  C.transform = function(j, Y, M, L) {
    var F = j.selection ? j.selection() : j;
    F.property("__zoom", Rv), j !== F ? k(j, Y, M, L) : F.interrupt().each(function() {
      B(this, arguments).event(L).start().zoom(null, typeof Y == "function" ? Y.apply(this, arguments) : Y).end();
    });
  }, C.scaleBy = function(j, Y, M, L) {
    C.scaleTo(j, function() {
      var F = this.__zoom.k, G = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return F * G;
    }, M, L);
  }, C.scaleTo = function(j, Y, M, L) {
    C.transform(j, function() {
      var F = a.apply(this, arguments), G = this.__zoom, Z = M == null ? O(F) : typeof M == "function" ? M.apply(this, arguments) : M, D = G.invert(Z), H = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return r(E(z(G, H), Z, D), F, c);
    }, M, L);
  }, C.translateBy = function(j, Y, M, L) {
    C.transform(j, function() {
      return r(this.__zoom.translate(
        typeof Y == "function" ? Y.apply(this, arguments) : Y,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), a.apply(this, arguments), c);
    }, null, L);
  }, C.translateTo = function(j, Y, M, L, F) {
    C.transform(j, function() {
      var G = a.apply(this, arguments), Z = this.__zoom, D = L == null ? O(G) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(Cc.translate(D[0], D[1]).scale(Z.k).translate(
        typeof Y == "function" ? -Y.apply(this, arguments) : -Y,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), G, c);
    }, L, F);
  };
  function z(j, Y) {
    return Y = Math.max(u[0], Math.min(u[1], Y)), Y === j.k ? j : new ui(Y, j.x, j.y);
  }
  function E(j, Y, M) {
    var L = Y[0] - M[0] * j.k, F = Y[1] - M[1] * j.k;
    return L === j.x && F === j.y ? j : new ui(j.k, L, F);
  }
  function O(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function k(j, Y, M, L) {
    j.on("start.zoom", function() {
      B(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      B(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var F = this, G = arguments, Z = B(F, G).event(L), D = a.apply(F, G), H = M == null ? O(D) : typeof M == "function" ? M.apply(F, G) : M, P = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), ne = F.__zoom, se = typeof Y == "function" ? Y.apply(F, G) : Y, he = p(ne.invert(H).concat(P / ne.k), se.invert(H).concat(P / se.k));
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
  function B(j, Y, M) {
    return !M && j.__zooming || new V(j, Y);
  }
  function V(j, Y) {
    this.that = j, this.args = Y, this.active = 0, this.sourceEvent = null, this.extent = a.apply(j, Y), this.taps = 0;
  }
  V.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, Y) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = Y.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = Y.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = Y.invert(this.touch1[0])), this.that.__zoom = Y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var Y = Yn(this.that).datum();
      m.call(
        j,
        this.that,
        new VT(j, {
          sourceEvent: this.sourceEvent,
          target: C,
          transform: this.that.__zoom,
          dispatch: m
        }),
        Y
      );
    }
  };
  function A(j, ...Y) {
    if (!e.apply(this, arguments)) return;
    var M = B(this, Y).event(j), L = this.__zoom, F = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, l.apply(this, arguments)))), G = ya(j);
    if (M.wheel)
      (M.mouse[0][0] !== G[0] || M.mouse[0][1] !== G[1]) && (M.mouse[1] = L.invert(M.mouse[0] = G)), clearTimeout(M.wheel);
    else {
      if (L.k === F) return;
      M.mouse = [G, L.invert(G)], Zu(this), M.start();
    }
    To(j), M.wheel = setTimeout(Z, S), M.zoom("mouse", r(E(z(L, F), M.mouse[0], M.mouse[1]), M.extent, c));
    function Z() {
      M.wheel = null, M.end();
    }
  }
  function I(j, ...Y) {
    if (v || !e.apply(this, arguments)) return;
    var M = j.currentTarget, L = B(this, Y, !0).event(j), F = Yn(j.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", P, !0), G = ya(j, M), Z = j.clientX, D = j.clientY;
    dx(j.view), ah(j), L.mouse = [G, this.__zoom.invert(G)], Zu(this), L.start();
    function H(ne) {
      if (To(ne), !L.moved) {
        var se = ne.clientX - Z, he = ne.clientY - D;
        L.moved = se * se + he * he > R;
      }
      L.event(ne).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = ya(ne, M), L.mouse[1]), L.extent, c));
    }
    function P(ne) {
      F.on("mousemove.zoom mouseup.zoom", null), hx(ne.view, L.moved), To(ne), L.event(ne).end();
    }
  }
  function te(j, ...Y) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, L = ya(j.changedTouches ? j.changedTouches[0] : j, this), F = M.invert(L), G = M.k * (j.shiftKey ? 0.5 : 2), Z = r(E(z(M, G), L, F), a.apply(this, Y), c);
      To(j), d > 0 ? Yn(this).transition().duration(d).call(k, Z, L, j) : Yn(this).call(C.transform, Z, L, j);
    }
  }
  function $(j, ...Y) {
    if (e.apply(this, arguments)) {
      var M = j.touches, L = M.length, F = B(this, Y, j.changedTouches.length === L).event(j), G, Z, D, H;
      for (ah(j), Z = 0; Z < L; ++Z)
        D = M[Z], H = ya(D, this), H = [H, this.__zoom.invert(H), D.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== H[2] && (F.touch1 = H, F.taps = 0) : (F.touch0 = H, G = !0, F.taps = 1 + !!y);
      y && (y = clearTimeout(y)), G && (F.taps < 2 && (g = H[0], y = setTimeout(function() {
        y = null;
      }, x)), Zu(this), F.start());
    }
  }
  function K(j, ...Y) {
    if (this.__zooming) {
      var M = B(this, Y).event(j), L = j.changedTouches, F = L.length, G, Z, D, H;
      for (To(j), G = 0; G < F; ++G)
        Z = L[G], D = ya(Z, this), M.touch0 && M.touch0[2] === Z.identifier ? M.touch0[0] = D : M.touch1 && M.touch1[2] === Z.identifier && (M.touch1[0] = D);
      if (Z = M.that.__zoom, M.touch1) {
        var P = M.touch0[0], ne = M.touch0[1], se = M.touch1[0], he = M.touch1[1], me = (me = se[0] - P[0]) * me + (me = se[1] - P[1]) * me, ee = (ee = he[0] - ne[0]) * ee + (ee = he[1] - ne[1]) * ee;
        Z = z(Z, Math.sqrt(me / ee)), D = [(P[0] + se[0]) / 2, (P[1] + se[1]) / 2], H = [(ne[0] + he[0]) / 2, (ne[1] + he[1]) / 2];
      } else if (M.touch0) D = M.touch0[0], H = M.touch0[1];
      else return;
      M.zoom("touch", r(E(Z, D, H), M.extent, c));
    }
  }
  function le(j, ...Y) {
    if (this.__zooming) {
      var M = B(this, Y).event(j), L = j.changedTouches, F = L.length, G, Z;
      for (ah(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), G = 0; G < F; ++G)
        Z = L[G], M.touch0 && M.touch0[2] === Z.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === Z.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0) M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (Z = ya(Z, this), Math.hypot(g[0] - Z[0], g[1] - Z[1]) < N)) {
        var D = Yn(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return C.wheelDelta = function(j) {
    return arguments.length ? (l = typeof j == "function" ? j : Cu(+j), C) : l;
  }, C.filter = function(j) {
    return arguments.length ? (e = typeof j == "function" ? j : Cu(!!j), C) : e;
  }, C.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : Cu(!!j), C) : s;
  }, C.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : Cu([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), C) : a;
  }, C.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], C) : [u[0], u[1]];
  }, C.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], C) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, C.constrain = function(j) {
    return arguments.length ? (r = j, C) : r;
  }, C.duration = function(j) {
    return arguments.length ? (d = +j, C) : d;
  }, C.interpolate = function(j) {
    return arguments.length ? (p = j, C) : p;
  }, C.on = function() {
    var j = m.on.apply(m, arguments);
    return j === m ? C : j;
  }, C.clickDistance = function(j) {
    return arguments.length ? (R = (j = +j) * j, C) : Math.sqrt(R);
  }, C.tapDistance = function(j) {
    return arguments.length ? (N = +j, C) : N;
  }, C;
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
}, Xo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Dx = ["Enter", " ", "Escape"], Ax = {
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
var El;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(El || (El = {}));
var wr;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(wr || (wr = {}));
var Fo;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Fo || (Fo = {}));
const zx = {
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
var rc;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(rc || (rc = {}));
var Ae;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(Ae || (Ae = {}));
const Mv = {
  [Ae.Left]: Ae.Right,
  [Ae.Right]: Ae.Left,
  [Ae.Top]: Ae.Bottom,
  [Ae.Bottom]: Ae.Top
};
function Ox(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const jx = (e) => "id" in e && "source" in e && "target" in e, XT = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Nm = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), ls = (e, a = [0, 0]) => {
  const { width: r, height: l } = hi(e), s = e.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, FT = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Nm(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? lc(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Rc(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Mc(r);
}, os = (e, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = Rc(r, lc(s)), l = !0);
  }), l ? Mc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Cm = (e, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...Tl(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: y, selectable: g = !0, hidden: v = !1 } = m;
    if (c && !g || v)
      continue;
    const x = y.width ?? m.width ?? m.initialWidth ?? null, S = y.height ?? m.height ?? m.initialHeight ?? null, R = Zo(d, Nl(m)), N = (x ?? 0) * (S ?? 0), C = u && R > 0;
    (!m.internals.handleBounds || C || R >= N || m.dragging) && p.push(m);
  }
  return p;
}, ZT = (e, a) => {
  const r = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function QT(e, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function PT({ nodes: e, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = QT(e, c), p = os(d), m = Mm(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function Lx({ nodeId: e, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
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
async function KT({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && c.find((R) => R.id === v.parentId);
    (x || S) && c.push(v);
  }
  const d = new Set(a.map((v) => v.id)), p = l.filter((v) => v.deletable !== !1), y = ZT(c, p);
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
const _l = (e, a = 0, r = 1) => Math.min(Math.max(e, a), r), _r = (e = { x: 0, y: 0 }, a, r) => ({
  x: _l(e.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: _l(e.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function Hx(e, a, r) {
  const { width: l, height: s } = hi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return _r(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const Tv = (e, a, r) => e < a ? _l(Math.abs(e - a), 1, a) / a : e > r ? -_l(Math.abs(e - r), 1, a) / a : 0, Rm = (e, a, r = 15, l = 40) => {
  const s = Tv(e.x, l, a.width - l) * r, u = Tv(e.y, l, a.height - l) * r;
  return [s, u];
}, Rc = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), kh = ({ x: e, y: a, width: r, height: l }) => ({
  x: e,
  y: a,
  x2: e + r,
  y2: a + l
}), Mc = ({ x: e, y: a, x2: r, y2: l }) => ({
  x: e,
  y: a,
  width: r - e,
  height: l - a
}), Nl = (e, a = [0, 0]) => {
  const { x: r, y: l } = Nm(e) ? e.internals.positionAbsolute : ls(e, a);
  return {
    x: r,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, lc = (e, a = [0, 0]) => {
  const { x: r, y: l } = Nm(e) ? e.internals.positionAbsolute : ls(e, a);
  return {
    x: r,
    y: l,
    x2: r + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, kx = (e, a) => Mc(Rc(kh(e), kh(a))), Zo = (e, a) => {
  const r = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(r * l);
}, Dv = (e) => ba(e.width) && ba(e.height) && ba(e.x) && ba(e.y), ba = (e) => !isNaN(e) && isFinite(e), Bx = (e, a) => (r, l) => {
}, ss = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), Tl = ({ x: e, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - r) / s,
    y: (a - l) / s
  };
  return u ? ss(d, c) : d;
}, Cl = ({ x: e, y: a }, [r, l, s]) => ({
  x: e * s + r,
  y: a * s + l
});
function ul(e, a) {
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
function JT(e, a, r) {
  if (typeof e == "string" || typeof e == "number") {
    const l = ul(e, r), s = ul(e, a);
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
    const l = ul(e.top ?? e.y ?? 0, r), s = ul(e.bottom ?? e.y ?? 0, r), u = ul(e.left ?? e.x ?? 0, a), c = ul(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function WT(e, a, r, l, s, u) {
  const { x: c, y: d } = Cl(e, [a, r, l]), { x: p, y: m } = Cl({ x: e.x + e.width, y: e.y + e.height }, [a, r, l]), y = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(y),
    bottom: Math.floor(g)
  };
}
const Mm = (e, a, r, l, s, u) => {
  const c = JT(u, a, r), d = (a - c.x) / e.width, p = (r - c.y) / e.height, m = Math.min(d, p), y = _l(m, l, s), g = e.x + e.width / 2, v = e.y + e.height / 2, x = a / 2 - g * y, S = r / 2 - v * y, R = WT(e, x, S, y, a, r), N = {
    left: Math.min(R.left - c.left, 0),
    top: Math.min(R.top - c.top, 0),
    right: Math.min(R.right - c.right, 0),
    bottom: Math.min(R.bottom - c.bottom, 0)
  };
  return {
    x: x - N.left + N.right,
    y: S - N.top + N.bottom,
    zoom: y
  };
}, Qo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Nr(e) {
  return e != null && e !== "parent";
}
function hi(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function Ux(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function Vx(e, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...e }, c = l.get(r);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function Av(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const r of e)
    if (!a.has(r))
      return !1;
  return !0;
}
function eD() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function tD(e) {
  return { ...Ax, ...e || {} };
}
function Bo(e, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = xa(e), d = Tl({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = r ? ss(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const Tm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), qx = (e) => e?.getRootNode?.() || window?.document, nD = ["INPUT", "SELECT", "TEXTAREA"];
function $x(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : nD.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const Ix = (e) => "clientX" in e, xa = (e, a) => {
  const r = Ix(e), l = r ? e.clientX : e.touches?.[0].clientX, s = r ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, zv = (e, a, r, l, s) => {
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
      ...Tm(c)
    };
  });
};
function Yx({ sourceX: e, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, y = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, y, g];
}
function Ru(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function Ov({ pos: e, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (e) {
    case Ae.Left:
      return [a - Ru(a - l, u), r];
    case Ae.Right:
      return [a + Ru(l - a, u), r];
    case Ae.Top:
      return [a, r - Ru(r - s, u)];
    case Ae.Bottom:
      return [a, r + Ru(s - r, u)];
  }
}
function Gx({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, curvature: c = 0.25 }) {
  const [d, p] = Ov({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = Ov({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, v, x, S] = Yx({
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
function Xx({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - e) / 2, u = r < e ? r + s : r - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function aD({ sourceNode: e, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function iD({ sourceNode: e, targetNode: a, width: r, height: l, transform: s }) {
  const u = Rc(lc(e), lc(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Zo(c, Mc(u)) > 0;
}
const rD = ({ source: e, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${e}${a || ""}-${r}${l || ""}`, lD = (e, a) => a.some((r) => r.source === e.source && r.target === e.target && (r.sourceHandle === e.sourceHandle || !r.sourceHandle && !e.sourceHandle) && (r.targetHandle === e.targetHandle || !r.targetHandle && !e.targetHandle)), oD = (e, a, r = {}) => {
  if (!e.source || !e.target)
    return r.onError?.("006", wa.error006()), a;
  const l = r.getEdgeId || rD;
  let s;
  return jx(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, lD(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function Fx({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, d] = Xx({
    sourceX: e,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${e},${a}L ${r},${l}`, s, u, c, d];
}
const jv = {
  [Ae.Left]: { x: -1, y: 0 },
  [Ae.Right]: { x: 1, y: 0 },
  [Ae.Top]: { x: 0, y: -1 },
  [Ae.Bottom]: { x: 0, y: 1 }
}, sD = ({ source: e, sourcePosition: a = Ae.Bottom, target: r }) => a === Ae.Left || a === Ae.Right ? e.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Lv = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function uD({ source: e, sourcePosition: a = Ae.Bottom, target: r, targetPosition: l = Ae.Top, center: s, offset: u, stepPosition: c }) {
  const d = jv[a], p = jv[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, y = { x: r.x + p.x * u, y: r.y + p.y * u }, g = sD({
    source: m,
    sourcePosition: a,
    target: y
  }), v = g.x !== 0 ? "x" : "y", x = g[v];
  let S = [], R, N;
  const C = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [, , E, O] = Xx({
    sourceX: e.x,
    sourceY: e.y,
    targetX: r.x,
    targetY: r.y
  });
  if (d[v] * p[v] === -1) {
    v === "x" ? (R = s.x ?? m.x + (y.x - m.x) * c, N = s.y ?? (m.y + y.y) / 2) : (R = s.x ?? (m.x + y.x) / 2, N = s.y ?? m.y + (y.y - m.y) * c);
    const A = [
      { x: R, y: m.y },
      { x: R, y: y.y }
    ], I = [
      { x: m.x, y: N },
      { x: y.x, y: N }
    ];
    d[v] === x ? S = v === "x" ? A : I : S = v === "x" ? I : A;
  } else {
    const A = [{ x: m.x, y: y.y }], I = [{ x: y.x, y: m.y }];
    if (v === "x" ? S = d.x === x ? I : A : S = d.y === x ? A : I, a === l) {
      const j = Math.abs(e[v] - r[v]);
      if (j <= u) {
        const Y = Math.min(u - 1, u - j);
        d[v] === x ? C[v] = (m[v] > e[v] ? -1 : 1) * Y : z[v] = (y[v] > r[v] ? -1 : 1) * Y;
      }
    }
    if (a !== l) {
      const j = v === "x" ? "y" : "x", Y = d[v] === p[j], M = m[j] > y[j], L = m[j] < y[j];
      (d[v] === 1 && (!Y && M || Y && L) || d[v] !== 1 && (!Y && L || Y && M)) && (S = v === "x" ? A : I);
    }
    const te = { x: m.x + C.x, y: m.y + C.y }, $ = { x: y.x + z.x, y: y.y + z.y }, K = Math.max(Math.abs(te.x - S[0].x), Math.abs($.x - S[0].x)), le = Math.max(Math.abs(te.y - S[0].y), Math.abs($.y - S[0].y));
    K >= le ? (R = (te.x + $.x) / 2, N = S[0].y) : (R = S[0].x, N = (te.y + $.y) / 2);
  }
  const k = { x: m.x + C.x, y: m.y + C.y }, B = { x: y.x + z.x, y: y.y + z.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...k.x !== S[0].x || k.y !== S[0].y ? [k] : [],
    ...S,
    ...B.x !== S[S.length - 1].x || B.y !== S[S.length - 1].y ? [B] : [],
    r
  ], R, N, E, O];
}
function cD(e, a, r, l) {
  const s = Math.min(Lv(e, a) / 2, Lv(a, r) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === r.x || e.y === c && c === r.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < r.x ? -1 : 1, y = e.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const d = e.x < r.x ? 1 : -1, p = e.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function Bh({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: y = 0.5 }) {
  const [g, v, x, S, R] = uD({
    source: { x: e, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: y
  });
  let N = `M${g[0].x} ${g[0].y}`;
  for (let C = 1; C < g.length - 1; C++)
    N += cD(g[C - 1], g[C], g[C + 1], c);
  return N += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [N, v, x, S, R];
}
function Hv(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function fD(e) {
  const { sourceNode: a, targetNode: r } = e;
  if (!Hv(a) || !Hv(r))
    return null;
  const l = a.internals.handleBounds || kv(a.handles), s = r.internals.handleBounds || kv(r.handles), u = Bv(l?.source ?? [], e.sourceHandle), c = Bv(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === El.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
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
function kv(e) {
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
function Bv(e, a) {
  return e && (a ? e.find((r) => r.id === a) : e[0]) || null;
}
function Uh(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function dD(e, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = Uh(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || r, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const Zx = 1e3, hD = 10, Dm = {
  nodeOrigin: [0, 0],
  nodeExtent: Xo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, mD = {
  ...Dm,
  checkEquality: !0
};
function Am(e, a) {
  const r = { ...e };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function pD(e, a, r) {
  const l = Am(Dm, r);
  for (const s of e.values())
    if (s.parentId)
      Om(s, e, a, l);
    else {
      const u = ls(s, l.nodeOrigin), c = Nr(s.extent) ? s.extent : l.nodeExtent, d = _r(u, c, hi(s));
      s.internals.positionAbsolute = d;
    }
}
function gD(e, a) {
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
function zm(e) {
  return e === "manual";
}
function Vh(e, a, r, l = {}) {
  const s = Am(mD, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !zm(s.zIndexMode) ? Zx : 0;
  let p = e.length > 0, m = !1;
  a.clear(), r.clear();
  for (const y of e) {
    let g = c.get(y.id);
    if (s.checkEquality && y === g?.internals.userNode)
      a.set(y.id, g);
    else {
      const v = ls(y, s.nodeOrigin), x = Nr(y.extent) ? y.extent : s.nodeExtent, S = _r(v, x, hi(y));
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
          handleBounds: gD(y, g),
          z: Qx(y, d, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), y.parentId && Om(g, a, r, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function yD(e, a) {
  if (!e.parentId)
    return;
  const r = a.get(e.parentId);
  r ? r.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Om(e, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = Am(Dm, l), m = e.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  yD(e, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * hD), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const g = u && !zm(p) ? Zx : 0, { x: v, y: x, z: S } = vD(e, y, c, d, g, p), { positionAbsolute: R } = e.internals, N = v !== R.x || x !== R.y;
  (N || S !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: N ? { x: v, y: x } : R,
      z: S
    }
  });
}
function Qx(e, a, r) {
  const l = ba(e.zIndex) ? e.zIndex : 0;
  return zm(r) ? l : l + (e.selected ? a : 0);
}
function vD(e, a, r, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = hi(e), m = ls(e, r), y = Nr(e.extent) ? _r(m, e.extent, p) : m;
  let g = _r({ x: c + y.x, y: d + y.y }, l, p);
  e.extent === "parent" && (g = Hx(g, p, a));
  const v = Qx(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= v ? x + 1 : v
  };
}
function jm(e, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? Nl(d), m = kx(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, y = hi(d), g = d.origin ?? l, v = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, x = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, S = Math.max(y.width, Math.round(c.width)), R = Math.max(y.height, Math.round(c.height)), N = (S - y.width) * g[0], C = (R - y.height) * g[1];
    (v > 0 || x > 0 || N || C) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - v + N,
        y: d.position.y - x + C
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
        width: S + (v ? g[0] * v - N : 0),
        height: R + (x ? g[1] * x - C : 0)
      }
    });
  }), s;
}
function bD(e, a, r, l, s, u, c) {
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
    const R = Tm(x.nodeElement), N = S.measured.width !== R.width || S.measured.height !== R.height;
    if (!!(R.width && R.height && (N || !S.internals.handleBounds || x.force))) {
      const z = x.nodeElement.getBoundingClientRect(), E = Nr(S.extent) ? S.extent : u;
      let { positionAbsolute: O } = S.internals;
      S.parentId && S.extent === "parent" ? O = Hx(O, R, a.get(S.parentId)) : E && (O = _r(O, E, R));
      const k = {
        ...S,
        measured: R,
        internals: {
          ...S.internals,
          positionAbsolute: O,
          handleBounds: {
            source: zv("source", x.nodeElement, z, g, S.id),
            target: zv("target", x.nodeElement, z, g, S.id)
          }
        }
      };
      a.set(S.id, k), S.parentId && Om(k, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, N && (m.push({
        id: S.id,
        type: "dimensions",
        dimensions: R
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: Nl(k, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = jm(v, a, r, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: p };
}
async function xD({ delta: e, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
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
function Uv(e, a, r, l, s, u) {
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
function Px(e, a, r) {
  e.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, y = `${u}-${d}--${s}-${c}`;
    Uv("source", p, y, e, s, c), Uv("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function Kx(e, a) {
  if (!e.parentId)
    return !1;
  const r = a.get(e.parentId);
  return r ? r.selected ? !0 : Kx(r, a) : !1;
}
function Vv(e, a, r) {
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
function wD(e, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !Kx(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function ih({ nodeId: e, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
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
function SD({ dragItems: e, snapGrid: a, x: r, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = ss(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function ED({ onNodeMouseDown: e, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, y = null, g = !1, v = null, x = !1, S = !1, R = null;
  function N({ noDragClassName: z, handleSelector: E, domNode: O, isSelectable: k, nodeId: B, nodeClickDistance: V = 0 }) {
    v = Yn(O);
    function A({ x: K, y: le }) {
      const { nodeLookup: j, nodeExtent: Y, snapGrid: M, snapToGrid: L, nodeOrigin: F, onNodeDrag: G, onSelectionDrag: Z, onError: D, updateNodePositions: H } = a();
      u = { x: K, y: le };
      let P = !1;
      const ne = d.size > 1, se = ne && Y ? kh(os(d)) : null, he = ne && L ? SD({
        dragItems: d,
        snapGrid: M,
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
        } : ss(ge, M));
        let ze = null;
        if (ne && Y && !ee.extent && se) {
          const { positionAbsolute: xe } = ee.internals, Ce = xe.x - se.x + Y[0][0], $e = xe.x + ee.measured.width - se.x2 + Y[1][0], ft = xe.y - se.y + Y[0][1], Me = xe.y + ee.measured.height - se.y2 + Y[1][1];
          ze = [
            [Ce, ft],
            [$e, Me]
          ];
        }
        const { position: Re, positionAbsolute: Se } = Lx({
          nodeId: me,
          nextPosition: ge,
          nodeLookup: j,
          nodeExtent: ze || Y,
          nodeOrigin: F,
          onError: D
        });
        P = P || ee.position.x !== Re.x || ee.position.y !== Re.y, ee.position = Re, ee.internals.positionAbsolute = Se;
      }
      if (S = S || P, !!P && (H(d, !0), R && (l || G || !B && Z))) {
        const [me, ee] = ih({
          nodeId: B,
          dragItems: d,
          nodeLookup: j
        });
        l?.(R, d, me, ee), G?.(R, me, ee), B || Z?.(R, ee);
      }
    }
    async function I() {
      if (!y)
        return;
      const { transform: K, panBy: le, autoPanSpeed: j, autoPanOnNodeDrag: Y } = a();
      if (!Y) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [M, L] = Rm(m, y, j);
      (M !== 0 || L !== 0) && (u.x = (u.x ?? 0) - M / K[2], u.y = (u.y ?? 0) - L / K[2], await le({ x: M, y: L }) && A(u)), c = requestAnimationFrame(I);
    }
    function te(K) {
      const { nodeLookup: le, multiSelectionActive: j, nodesDraggable: Y, transform: M, snapGrid: L, snapToGrid: F, selectNodesOnDrag: G, onNodeDragStart: Z, onSelectionDragStart: D, unselectNodesAndEdges: H } = a();
      g = !0, (!G || !k) && !j && B && (le.get(B)?.selected || H()), k && G && B && e?.(B);
      const P = Bo(K.sourceEvent, { transform: M, snapGrid: L, snapToGrid: F, containerBounds: y });
      if (u = P, d = wD(le, Y, P, B), d.size > 0 && (r || Z || !B && D)) {
        const [ne, se] = ih({
          nodeId: B,
          dragItems: d,
          nodeLookup: le
        });
        r?.(K.sourceEvent, d, ne, se), Z?.(K.sourceEvent, ne, se), B || D?.(K.sourceEvent, se);
      }
    }
    const $ = mx().clickDistance(V).on("start", (K) => {
      const { domNode: le, nodeDragThreshold: j, transform: Y, snapGrid: M, snapToGrid: L } = a();
      y = le?.getBoundingClientRect() || null, x = !1, S = !1, R = K.sourceEvent, j === 0 && te(K), u = Bo(K.sourceEvent, { transform: Y, snapGrid: M, snapToGrid: L, containerBounds: y }), m = xa(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: le, transform: j, snapGrid: Y, snapToGrid: M, nodeDragThreshold: L, nodeLookup: F } = a(), G = Bo(K.sourceEvent, { transform: j, snapGrid: Y, snapToGrid: M, containerBounds: y });
      if (R = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      B && !F.has(B)) && (x = !0), !x) {
        if (!p && le && g && (p = !0, I()), !g) {
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
        const { nodeLookup: le, updateNodePositions: j, onNodeDragStop: Y, onSelectionDragStop: M } = a();
        if (S && (j(d, !1), S = !1), s || Y || !B && M) {
          const [L, F] = ih({
            nodeId: B,
            dragItems: d,
            nodeLookup: le,
            dragging: !1
          });
          s?.(K.sourceEvent, d, L, F), Y?.(K.sourceEvent, L, F), B || M?.(K.sourceEvent, F);
        }
      }
    }).filter((K) => {
      const le = K.target;
      return !K.button && (!z || !Vv(le, `.${z}`, O)) && (!E || Vv(le, E, O));
    });
    v.call($);
  }
  function C() {
    v?.on(".drag", null);
  }
  return {
    update: N,
    destroy: C
  };
}
function _D(e, a, r) {
  const l = [], s = {
    x: e.x - r,
    y: e.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Zo(s, Nl(u)) > 0 && l.push(u);
  return l;
}
const ND = 250;
function CD(e, a, r, l) {
  let s = [], u = 1 / 0;
  const c = _D(e, r, a + ND);
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
function Jx(e, a, r, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? d?.find((m) => m.id === r) : d?.[0]) ?? null;
  return p && u ? { ...p, ...Cr(c, p, p.position, !0) } : p;
}
function Wx(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function RD(e, a) {
  let r = null;
  return a ? r = !0 : e && !a && (r = !1), r;
}
const ew = () => !0;
function MD(e, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: y, flowId: g, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: R, onConnectEnd: N, isValidConnection: C = ew, onReconnectEnd: z, updateConnection: E, getTransform: O, getFromHandle: k, autoPanSpeed: B, dragThreshold: V = 1, handleDomNode: A }) {
  const I = qx(e.target);
  let te = 0, $;
  const { x: K, y: le } = xa(e), j = Wx(u, A), Y = d?.getBoundingClientRect();
  let M = !1;
  if (!Y || !j)
    return;
  const L = Jx(s, j, l, p, a);
  if (!L)
    return;
  let F = xa(e, Y), G = !1, Z = null, D = !1, H = null;
  function P() {
    if (!y || !Y)
      return;
    const [Re, Se] = Rm(F, Y, B);
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
    toPosition: Mv[ne.position],
    toNode: null,
    pointer: F
  };
  function ee() {
    M = !0, E(me), S?.(e, { nodeId: s, handleId: l, handleType: j });
  }
  V === 0 && ee();
  function ge(Re) {
    if (!M) {
      const { x: Me, y: Xe } = xa(Re), ke = Me - K, Ie = Xe - le;
      if (!(ke * ke + Ie * Ie > V * V))
        return;
      ee();
    }
    if (!k() || !ne) {
      ze(Re);
      return;
    }
    const Se = O();
    F = xa(Re, Y), $ = CD(Tl(F, Se, !1, [1, 1]), r, p, ne), G || (P(), G = !0);
    const xe = tw(Re, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: C,
      doc: I,
      lib: m,
      flowId: g,
      nodeLookup: p
    });
    H = xe.handleDomNode, Z = xe.connection, D = RD(!!$, xe.isValid);
    const Ce = p.get(s), $e = Ce ? Cr(Ce, ne, Ae.Left, !0) : me.from, ft = {
      ...me,
      from: $e,
      isValid: D,
      to: xe.toHandle && D ? Cl({ x: xe.toHandle.x, y: xe.toHandle.y }, Se) : F,
      toHandle: xe.toHandle,
      toPosition: D && xe.toHandle ? xe.toHandle.position : Mv[ne.position],
      toNode: xe.toHandle ? p.get(xe.toHandle.nodeId) : null,
      pointer: F
    };
    E(ft), me = ft;
  }
  function ze(Re) {
    if (!("touches" in Re && Re.touches.length > 0)) {
      if (M) {
        ($ || H) && Z && D && R?.(Z);
        const { inProgress: Se, ...xe } = me, Ce = {
          ...xe,
          toPosition: me.toHandle ? me.toPosition : null
        };
        N?.(Re, Ce), u && z?.(Re, Ce);
      }
      x(), cancelAnimationFrame(te), G = !1, D = !1, Z = null, H = null, I.removeEventListener("mousemove", ge), I.removeEventListener("mouseup", ze), I.removeEventListener("touchmove", ge), I.removeEventListener("touchend", ze);
    }
  }
  I.addEventListener("mousemove", ge), I.addEventListener("mouseup", ze), I.addEventListener("touchmove", ge), I.addEventListener("touchend", ze);
}
function tw(e, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = ew, nodeLookup: y }) {
  const g = u === "target", v = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = xa(e), R = c.elementFromPoint(x, S), N = R?.classList.contains(`${d}-flow__handle`) ? R : v, C = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const z = Wx(void 0, N), E = N.getAttribute("data-nodeid"), O = N.getAttribute("data-handleid"), k = N.classList.contains("connectable"), B = N.classList.contains("connectableend");
    if (!E || !z)
      return C;
    const V = {
      source: g ? E : l,
      sourceHandle: g ? O : s,
      target: g ? l : E,
      targetHandle: g ? s : O
    };
    C.connection = V;
    const I = k && B && (r === El.Strict ? g && z === "source" || !g && z === "target" : E !== l || O !== s);
    C.isValid = I && m(V), C.toHandle = Jx(E, z, O, y, r, !0);
  }
  return C;
}
const qh = {
  onPointerDown: MD,
  isValid: tw
};
function TD({ domNode: e, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = Yn(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: y = 1, pannable: g = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const O = r(), k = E.sourceEvent.ctrlKey && Qo() ? 10 : 1, B = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, V = O[2] * Math.pow(2, B * k);
      a.scaleTo(V);
    };
    let R = [0, 0];
    const N = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (R = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, C = (E) => {
      const O = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const k = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], B = [k[0] - R[0], k[1] - R[1]];
      R = k;
      const V = l() * Math.max(O[2], Math.log(O[2])) * (x ? -1 : 1), A = {
        x: O[0] - B[0] * V,
        y: O[1] - B[1] * V
      }, I = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: O[2]
      }, I, d);
    }, z = Tx().on("start", N).on("zoom", g ? C : null).on("zoom.wheel", v ? S : null);
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
const Tc = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), rh = ({ x: e, y: a, zoom: r }) => Cc.translate(e, a).scale(r), pl = (e, a) => e.target.closest(`.${a}`), nw = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), DD = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, lh = (e, a = 0, r = DD, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(r).on("end", l) : e;
}, aw = (e) => {
  const a = e.ctrlKey && Qo() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function AD({ zoomPanValues: e, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (y) => {
    if (pl(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const g = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const N = ya(y), C = aw(y), z = g * Math.pow(2, C);
      l.scaleTo(r, z, N, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === wr.Vertical ? 0 : y.deltaX * v, S = s === wr.Horizontal ? 0 : y.deltaY * v;
    !Qo() && y.shiftKey && s !== wr.Vertical && (x = y.deltaY * v, S = 0), l.translateBy(
      r,
      -(x / g) * u,
      -(S / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const R = Tc(r.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(y, R), e.panScrollTimeout = setTimeout(() => {
      m?.(y, R), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(y, R));
  };
}
function zD({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = pl(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function OD({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = Tc(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function jD({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(r && nw(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Tc(u.transform));
  };
}
function LD({ zoomPanValues: e, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && nw(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = Tc(c.transform);
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
function HD({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: y }) {
  return (g) => {
    const v = e || a, x = r && g.ctrlKey, S = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (pl(g, `${m}-flow__node`) || pl(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !v && !s && !u && !r || c || y && !S || pl(g, d) && S || pl(g, p) && (!S || s && S && !e) || !r && g.ctrlKey && S)
      return !1;
    if (!r && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!v && !s && !x && S || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const R = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || S) && R;
  };
}
function kD({ domNode: e, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = e.getBoundingClientRect(), g = Tx().scaleExtent([a, r]).translateExtent(l), v = Yn(e).call(g);
  z({
    x: s.x,
    y: s.y,
    zoom: _l(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  g.wheelDelta(aw);
  async function R($, K) {
    return v ? new Promise((le) => {
      g?.interpolate(K?.interpolate === "linear" ? ko : Gu).transform(lh(v, K?.duration, K?.ease, () => le(!0)), $);
    }) : !1;
  }
  function N({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: le, userSelectionActive: j, panOnScroll: Y, panOnDrag: M, panOnScrollMode: L, panOnScrollSpeed: F, preventScrolling: G, zoomOnPinch: Z, zoomOnScroll: D, zoomOnDoubleClick: H, zoomActivationKeyPressed: P, lib: ne, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: ee }) {
    j && !m.isZoomingOrPanning && C();
    const ge = Y && !P && !j;
    g.clickDistance(ee ? 1 / 0 : !ba(me) || me < 0 ? 0 : me);
    const ze = ge ? AD({
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
    }) : zD({
      noWheelClassName: $,
      preventScrolling: G,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Re = OD({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", Re);
    const Se = jD({
      zoomPanValues: m,
      panOnDrag: M,
      onPaneContextMenu: !!le,
      onPanZoom: u,
      onTransformChange: se
    });
    g.on("zoom", Se);
    const xe = LD({
      zoomPanValues: m,
      panOnDrag: M,
      panOnScroll: Y,
      onPaneContextMenu: le,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", xe);
    const Ce = HD({
      zoomActivationKeyPressed: P,
      panOnDrag: M,
      zoomOnScroll: D,
      panOnScroll: Y,
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
  function C() {
    g.on("zoom", null);
  }
  async function z($, K, le) {
    const j = rh($), Y = g?.constrain()(j, K, le);
    return Y && await R(Y), Y;
  }
  async function E($, K) {
    const le = rh($);
    return await R(le, K), le;
  }
  function O($) {
    if (v) {
      const K = rh($), le = v.property("__zoom");
      (le.k !== $.zoom || le.x !== $.x || le.y !== $.y) && g?.transform(v, K, null, { sync: !0 });
    }
  }
  function k() {
    const $ = v ? Mx(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function B($, K) {
    return v ? new Promise((le) => {
      g?.interpolate(K?.interpolate === "linear" ? ko : Gu).scaleTo(lh(v, K?.duration, K?.ease, () => le(!0)), $);
    }) : !1;
  }
  async function V($, K) {
    return v ? new Promise((le) => {
      g?.interpolate(K?.interpolate === "linear" ? ko : Gu).scaleBy(lh(v, K?.duration, K?.ease, () => le(!0)), $);
    }) : !1;
  }
  function A($) {
    g?.scaleExtent($);
  }
  function I($) {
    g?.translateExtent($);
  }
  function te($) {
    const K = !ba($) || $ < 0 ? 0 : $;
    g?.clickDistance(K);
  }
  return {
    update: N,
    destroy: C,
    setViewport: E,
    setViewportConstrained: z,
    getViewport: k,
    scaleTo: B,
    scaleBy: V,
    setScaleExtent: A,
    setTranslateExtent: I,
    syncViewport: O,
    setClickDistance: te
  };
}
var Rl;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Rl || (Rl = {}));
function BD({ width: e, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = r - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function qv(e) {
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
function Ii(e, a) {
  return Math.max(0, e - a);
}
function Mu(e, a, r) {
  return Math.max(0, a - e, e - r);
}
function $v(e, a) {
  return e ? !a : a;
}
function UD(e, a, r, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: y, isVertical: g } = a, v = y && g, { xSnapped: x, ySnapped: S } = r, { minWidth: R, maxWidth: N, minHeight: C, maxHeight: z } = l, { x: E, y: O, width: k, height: B, aspectRatio: V } = e;
  let A = Math.floor(y ? x - e.pointerX : 0), I = Math.floor(g ? S - e.pointerY : 0);
  const te = k + (p ? -A : A), $ = B + (m ? -I : I), K = -u[0] * k, le = -u[1] * B;
  let j = Mu(te, R, N), Y = Mu($, C, z);
  if (c) {
    let F = 0, G = 0;
    p && A < 0 ? F = $i(E + A + K, c[0][0]) : !p && A > 0 && (F = Ii(E + te + K, c[1][0])), m && I < 0 ? G = $i(O + I + le, c[0][1]) : !m && I > 0 && (G = Ii(O + $ + le, c[1][1])), j = Math.max(j, F), Y = Math.max(Y, G);
  }
  if (d) {
    let F = 0, G = 0;
    p && A > 0 ? F = Ii(E + A, d[0][0]) : !p && A < 0 && (F = $i(E + te, d[1][0])), m && I > 0 ? G = Ii(O + I, d[0][1]) : !m && I < 0 && (G = $i(O + $, d[1][1])), j = Math.max(j, F), Y = Math.max(Y, G);
  }
  if (s) {
    if (y) {
      const F = Mu(te / V, C, z) * V;
      if (j = Math.max(j, F), c) {
        let G = 0;
        !p && !m || p && !m && v ? G = Ii(O + le + te / V, c[1][1]) * V : G = $i(O + le + (p ? A : -A) / V, c[0][1]) * V, j = Math.max(j, G);
      }
      if (d) {
        let G = 0;
        !p && !m || p && !m && v ? G = $i(O + te / V, d[1][1]) * V : G = Ii(O + (p ? A : -A) / V, d[0][1]) * V, j = Math.max(j, G);
      }
    }
    if (g) {
      const F = Mu($ * V, R, N) / V;
      if (Y = Math.max(Y, F), c) {
        let G = 0;
        !p && !m || m && !p && v ? G = Ii(E + $ * V + K, c[1][0]) / V : G = $i(E + (m ? I : -I) * V + K, c[0][0]) / V, Y = Math.max(Y, G);
      }
      if (d) {
        let G = 0;
        !p && !m || m && !p && v ? G = $i(E + $ * V, d[1][0]) / V : G = Ii(E + (m ? I : -I) * V, d[0][0]) / V, Y = Math.max(Y, G);
      }
    }
  }
  I = I + (I < 0 ? Y : -Y), A = A + (A < 0 ? j : -j), s && (v ? te > $ * V ? I = ($v(p, m) ? -A : A) / V : A = ($v(p, m) ? -I : I) * V : y ? (I = A / V, m = p) : (A = I * V, p = m));
  const M = p ? E + A : E, L = m ? O + I : O;
  return {
    width: k + (p ? -A : A),
    height: B + (m ? -I : I),
    x: u[0] * A * (p ? -1 : 1) + M,
    y: u[1] * I * (m ? -1 : 1) + L
  };
}
const iw = { width: 0, height: 0, x: 0, y: 0 }, VD = {
  ...iw,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function qD(e, a, r) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = r[0] * u, p = r[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function $D({ domNode: e, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = Yn(e);
  let c = {
    controlDirection: qv("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: y, keepAspectRatio: g, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: R, shouldResize: N }) {
    let C = { ...iw }, z = { ...VD };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: g,
      controlDirection: qv(m)
    };
    let E, O = null, k = [], B, V, A, I = !1;
    const te = mx().on("start", ($) => {
      const { nodeLookup: K, transform: le, snapGrid: j, snapToGrid: Y, nodeOrigin: M, paneDomNode: L } = r();
      if (E = K.get(a), !E)
        return;
      O = L?.getBoundingClientRect() ?? null;
      const { xSnapped: F, ySnapped: G } = Bo($.sourceEvent, {
        transform: le,
        snapGrid: j,
        snapToGrid: Y,
        containerBounds: O
      });
      C = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, z = {
        ...C,
        pointerX: F,
        pointerY: G,
        aspectRatio: C.width / C.height
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
          const H = qD(D, E, D.origin ?? M);
          A ? A = [
            [Math.min(H[0][0], A[0][0]), Math.min(H[0][1], A[0][1])],
            [Math.max(H[1][0], A[1][0]), Math.max(H[1][1], A[1][1])]
          ] : A = H;
        }
      x?.($, { ...C });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: le, snapToGrid: j, nodeOrigin: Y } = r(), M = Bo($.sourceEvent, {
        transform: K,
        snapGrid: le,
        snapToGrid: j,
        containerBounds: O
      }), L = [];
      if (!E)
        return;
      const { x: F, y: G, width: Z, height: D } = C, H = {}, P = E.origin ?? Y, { width: ne, height: se, x: he, y: me } = UD(z, c.controlDirection, M, c.boundaries, c.keepAspectRatio, P, V, A), ee = ne !== Z, ge = se !== D, ze = he !== F && ee, Re = me !== G && ge;
      if (!ze && !Re && !ee && !ge)
        return;
      if ((ze || Re || P[0] === 1 || P[1] === 1) && (H.x = ze ? he : C.x, H.y = Re ? me : C.y, C.x = H.x, C.y = H.y, k.length > 0)) {
        const $e = he - F, ft = me - G;
        for (const Me of k)
          Me.position = {
            x: Me.position.x - $e + P[0] * (ne - Z),
            y: Me.position.y - ft + P[1] * (se - D)
          }, L.push(Me);
      }
      if ((ee || ge) && (H.width = ee && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ne : C.width, H.height = ge && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : C.height, C.width = H.width, C.height = H.height), B && E.expandParent) {
        const $e = P[0] * (H.width ?? 0);
        H.x && H.x < $e && (C.x = $e, z.x = z.x - (H.x - $e));
        const ft = P[1] * (H.height ?? 0);
        H.y && H.y < ft && (C.y = ft, z.y = z.y - (H.y - ft));
      }
      const Se = BD({
        width: C.width,
        prevWidth: Z,
        height: C.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...C, direction: Se };
      N?.($, xe) !== !1 && (I = !0, S?.($, xe), l(H, L));
    }).on("end", ($) => {
      I && (R?.($, { ...C }), s?.({ ...C }), I = !1);
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
var oh = { exports: {} }, sh = {}, uh = { exports: {} }, ch = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Iv;
function ID() {
  if (Iv) return ch;
  Iv = 1;
  var e = Wo();
  function a(g, v) {
    return g === v && (g !== 0 || 1 / g === 1 / v) || g !== g && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, v) {
    var x = v(), S = l({ inst: { value: x, getSnapshot: v } }), R = S[0].inst, N = S[1];
    return u(
      function() {
        R.value = x, R.getSnapshot = v, p(R) && N({ inst: R });
      },
      [g, x, v]
    ), s(
      function() {
        return p(R) && N({ inst: R }), g(function() {
          p(R) && N({ inst: R });
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
  return ch.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y, ch;
}
var Yv;
function rw() {
  return Yv || (Yv = 1, uh.exports = ID()), uh.exports;
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
var Gv;
function YD() {
  if (Gv) return sh;
  Gv = 1;
  var e = Wo(), a = rw();
  function r(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return sh.useSyncExternalStoreWithSelector = function(m, y, g, v, x) {
    var S = u(null);
    if (S.current === null) {
      var R = { hasValue: !1, value: null };
      S.current = R;
    } else R = S.current;
    S = d(
      function() {
        function C(B) {
          if (!z) {
            if (z = !0, E = B, B = v(B), x !== void 0 && R.hasValue) {
              var V = R.value;
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
            return C(y());
          },
          k === null ? void 0 : function() {
            return C(k());
          }
        ];
      },
      [y, g, v, x]
    );
    var N = s(m, S[0], S[1]);
    return c(
      function() {
        R.hasValue = !0, R.value = N;
      },
      [N]
    ), p(N), N;
  }, sh;
}
var Xv;
function GD() {
  return Xv || (Xv = 1, oh.exports = YD()), oh.exports;
}
var XD = GD();
const FD = /* @__PURE__ */ im(XD), ZD = {}, Fv = (e) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (y, g) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = g ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((S) => S(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (ZD ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = e(l, s, p);
  return p;
}, QD = (e) => e ? Fv(e) : Fv, { useDebugValue: PD } = ye, { useSyncExternalStoreWithSelector: KD } = FD, JD = (e) => e;
function lw(e, a = JD, r) {
  const l = KD(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    r
  );
  return PD(l), l;
}
const Zv = (e, a) => {
  const r = QD(e), l = (s, u = a) => lw(r, s, u);
  return Object.assign(l, r), l;
}, WD = (e, a) => e ? Zv(e, a) : Zv;
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
var eA = m1();
const tA = /* @__PURE__ */ im(eA), Dc = _.createContext(null), nA = Dc.Provider, ow = wa.error001("react");
function lt(e, a) {
  const r = _.useContext(Dc);
  if (r === null)
    throw new Error(ow);
  return lw(r, e, a);
}
function zt() {
  const e = _.useContext(Dc);
  if (e === null)
    throw new Error(ow);
  return _.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const Qv = { display: "none" }, aA = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, sw = "react-flow__node-desc", uw = "react-flow__edge-desc", iA = "react-flow__aria-live", rA = (e) => e.ariaLiveMessage, lA = (e) => e.ariaLabelConfig;
function oA({ rfId: e }) {
  const a = lt(rA);
  return b.jsx("div", { id: `${iA}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: aA, children: a });
}
function sA({ rfId: e, disableKeyboardA11y: a }) {
  const r = lt(lA);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${sw}-${e}`, style: Qv, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${uw}-${e}`, style: Qv, children: r["edge.a11yDescription.default"] }), !a && b.jsx(oA, { rfId: e })] });
}
const Ac = _.forwardRef(({ position: e = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return b.jsx("div", { className: Qt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
Ac.displayName = "Panel";
function uA({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : b.jsx(Ac, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: b.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const cA = (e) => {
  const a = [], r = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, Tu = (e) => e.id;
function fA(e, a) {
  return At(e.selectedNodes.map(Tu), a.selectedNodes.map(Tu)) && At(e.selectedEdges.map(Tu), a.selectedEdges.map(Tu));
}
function dA({ onSelectionChange: e }) {
  const a = zt(), { selectedNodes: r, selectedEdges: l } = lt(cA, fA);
  return _.useEffect(() => {
    const s = { nodes: r, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, e]), null;
}
const hA = (e) => !!e.onSelectionChangeHandlers;
function mA({ onSelectionChange: e }) {
  const a = lt(hA);
  return e || a ? b.jsx(dA, { onSelectionChange: e }) : null;
}
const cw = [0, 0], pA = { x: 0, y: 0, zoom: 1 }, gA = [
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
], Pv = [...gA, "rfId"], yA = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), Kv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Xo,
  nodeOrigin: cw,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function vA(e) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = lt(yA, At), m = zt();
  _.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    y.current = Kv, d();
  }), []);
  const y = _.useRef(Kv);
  return _.useEffect(
    () => {
      for (const g of Pv) {
        const v = e[g], x = y.current[g];
        v !== x && (typeof e[g] > "u" || (g === "nodes" ? a(v) : g === "edges" ? r(v) : g === "minZoom" ? l(v) : g === "maxZoom" ? s(v) : g === "translateExtent" ? u(v) : g === "nodeExtent" ? c(v) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: tD(v) }) : g === "fitView" ? m.setState({ fitViewQueued: v }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: v }) : m.setState({ [g]: v })));
      }
      y.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    Pv.map((g) => e[g])
  ), null;
}
function Jv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function bA(e) {
  const [a, r] = _.useState(e === "system" ? null : e);
  return _.useEffect(() => {
    if (e !== "system") {
      r(e);
      return;
    }
    const l = Jv(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : Jv()?.matches ? "dark" : "light";
}
const Wv = typeof document < "u" ? document : null;
function Po(e = null, a = { target: Wv, actInsideInputWithModifier: !0 }) {
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
    const p = a?.target ?? Wv, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && $x(x))
          return !1;
        const R = tb(x.code, d);
        if (u.current.add(x[R]), eb(c, u.current, !1)) {
          const N = x.composedPath?.()?.[0] || x.target, C = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !C) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const S = tb(x.code, d);
        eb(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", g), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", g), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [e, l]), r;
}
function eb(e, a, r) {
  return e.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function tb(e, a) {
  return a.includes(e) ? "code" : "key";
}
const xA = () => {
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
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = Mm(a, l, s, u, c, r?.padding ?? 0.1);
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
      const { x: s, y: u } = l.getBoundingClientRect(), c = Cl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function fw(e, a) {
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
      wA(p, d);
    r.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function wA(e, a) {
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
function SA(e, a) {
  return fw(e, a);
}
function EA(e, a) {
  return fw(e, a);
}
function gr(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function gl(e, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(gr(u.id, c)));
  }
  return l;
}
function nb({ items: e = [], lookup: a }) {
  const r = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && r.push({ id: u.id, item: u, type: "replace" }), d === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function ab(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const _A = Bx();
function NA(e, a, r = {}) {
  return oD(e, a, {
    ...r,
    onError: r.onError ?? _A
  });
}
const ib = (e) => XT(e), CA = (e) => jx(e);
function dw(e) {
  return _.forwardRef(e);
}
const RA = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function rb(e) {
  const [a, r] = _.useState(BigInt(0)), [l] = _.useState(() => MA(() => r((s) => s + BigInt(1))));
  return RA(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function MA(e) {
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
const hw = _.createContext(null);
function TA({ children: e }) {
  const a = zt(), r = _.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: y, onNodesChange: g, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let R = p;
    for (const C of d)
      R = typeof C == "function" ? C(R) : C;
    let N = nb({
      items: R,
      lookup: v
    });
    for (const C of S.values())
      N = C(N);
    y && m(R), N.length > 0 ? g?.(N) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: C, nodes: z, setNodes: E } = a.getState();
      C && E(z);
    });
  }, []), l = rb(r), s = _.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: g, edgeLookup: v } = a.getState();
    let x = p;
    for (const S of d)
      x = typeof S == "function" ? S(x) : S;
    y ? m(x) : g && g(nb({
      items: x,
      lookup: v
    }));
  }, []), u = rb(s), c = _.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return b.jsx(hw.Provider, { value: c, children: e });
}
function DA() {
  const e = _.useContext(hw);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const AA = (e) => !!e.panZoom;
function Lm() {
  const e = xA(), a = zt(), r = DA(), l = lt(AA), s = _.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      r.nodeQueue.push(g);
    }, d = (g) => {
      r.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = ib(g) ? g : v.get(g.id), R = S.parentId ? Vx(S.position, S.measured, S.parentId, v, x) : S.position, N = {
        ...S,
        position: R,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return Nl(N);
    }, m = (g, v, x = { replace: !1 }) => {
      c((S) => S.map((R) => {
        if (R.id === g) {
          const N = typeof v == "function" ? v(R) : v;
          return x.replace && ib(N) ? N : { ...R, ...N };
        }
        return R;
      }));
    }, y = (g, v, x = { replace: !1 }) => {
      d((S) => S.map((R) => {
        if (R.id === g) {
          const N = typeof v == "function" ? v(R) : v;
          return x.replace && CA(N) ? N : { ...R, ...N };
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
        const { nodes: g = [], edges: v = [], transform: x } = a.getState(), [S, R, N] = x;
        return {
          nodes: g.map((C) => ({ ...C })),
          edges: v.map((C) => ({ ...C })),
          viewport: {
            x: S,
            y: R,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: R, onEdgesDelete: N, triggerNodeChanges: C, triggerEdgeChanges: z, onDelete: E, onBeforeDelete: O } = a.getState(), { nodes: k, edges: B } = await KT({
          nodesToRemove: g,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: O
        }), V = B.length > 0, A = k.length > 0;
        if (V) {
          const I = B.map(ab);
          N?.(B), z(I);
        }
        if (A) {
          const I = k.map(ab);
          R?.(k), C(I);
        }
        return (A || V) && E?.({ nodes: k, edges: B }), { deletedNodes: k, deletedEdges: B };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, v = !0, x) => {
        const S = Dv(g), R = S ? g : p(g), N = x !== void 0;
        return R ? (x || a.getState().nodes).filter((C) => {
          const z = a.getState().nodeLookup.get(C.id);
          if (z && !S && (C.id === g.id || !z.internals.positionAbsolute))
            return !1;
          const E = Nl(N ? C : z), O = Zo(E, R);
          return v && O > 0 || O >= E.width * E.height || O >= R.width * R.height;
        }) : [];
      },
      isNodeIntersecting: (g, v, x = !0) => {
        const R = Dv(g) ? g : p(g);
        if (!R)
          return !1;
        const N = Zo(R, v);
        return x && N > 0 || N >= v.width * v.height || N >= R.width * R.height;
      },
      updateNode: m,
      updateNodeData: (g, v, x = { replace: !1 }) => {
        m(g, (S) => {
          const R = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: R } : { ...S, data: { ...S.data, ...R } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (g, v, x = { replace: !1 }) => {
        y(g, (S) => {
          const R = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: R } : { ...S, data: { ...S.data, ...R } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: v, nodeOrigin: x } = a.getState();
        return FT(g, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? v ? `-${g}-${v}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const v = a.getState().fitViewResolver ?? eD();
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
const lb = (e) => e.selected, zA = typeof window < "u" ? window : void 0;
function OA({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: l } = Lm(), s = Po(e, { actInsideInputWithModifier: !1 }), u = Po(a, { target: zA });
  _.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = r.getState();
      l({ nodes: d.filter(lb), edges: c.filter(lb) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), _.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function jA(e) {
  const a = zt();
  _.useEffect(() => {
    const r = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = Tm(e.current);
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
const zc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, LA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function HA({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = wr.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: y, maxZoom: g, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: R, noPanClassName: N, onViewportChange: C, isControlledViewport: z, paneClickDistance: E, selectionOnDrag: O }) {
  const k = zt(), B = _.useRef(null), { userSelectionActive: V, lib: A, connectionInProgress: I } = lt(LA, At), te = Po(v), $ = _.useRef();
  jA(B);
  const K = _.useCallback((le) => {
    C?.({ x: le[0], y: le[1], zoom: le[2] }), z || k.setState({ transform: le });
  }, [C, z]);
  return _.useEffect(() => {
    if (B.current) {
      $.current = kD({
        domNode: B.current,
        minZoom: y,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (M) => k.setState((L) => L.paneDragging === M ? L : { paneDragging: M }),
        onPanZoomStart: (M, L) => {
          const { onViewportChangeStart: F, onMoveStart: G } = k.getState();
          G?.(M, L), F?.(L);
        },
        onPanZoom: (M, L) => {
          const { onViewportChange: F, onMove: G } = k.getState();
          G?.(M, L), F?.(L);
        },
        onPanZoomEnd: (M, L) => {
          const { onViewportChangeEnd: F, onMoveEnd: G } = k.getState();
          G?.(M, L), F?.(L);
        }
      });
      const { x: le, y: j, zoom: Y } = $.current.getViewport();
      return k.setState({
        panZoom: $.current,
        transform: [le, j, Y],
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
      noPanClassName: N,
      userSelectionActive: V,
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
    r,
    l,
    s,
    u,
    c,
    d,
    te,
    x,
    N,
    V,
    R,
    A,
    K,
    I,
    O,
    E
  ]), b.jsx("div", { className: "react-flow__renderer", ref: B, style: zc, children: S });
}
const kA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function BA() {
  const { userSelectionActive: e, userSelectionRect: a } = lt(kA, At);
  return e && a ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const fh = (e, a) => (r) => {
  r.target === a.current && e?.(r);
}, UA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function VA({ isSelecting: e, selectionKeyPressed: a, selectionMode: r = Fo.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: g, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: R }) {
  const N = _.useRef(0), C = zt(), { userSelectionActive: z, elementsSelectable: E, dragging: O, connectionInProgress: k, panBy: B, autoPanSpeed: V } = lt(UA, At), A = E && (e || z), I = _.useRef(null), te = _.useRef(), $ = _.useRef(/* @__PURE__ */ new Set()), K = _.useRef(/* @__PURE__ */ new Set()), le = _.useRef(!1), j = _.useRef({ x: 0, y: 0 }), Y = _.useRef(!1), M = (ee) => {
    if (le.current || k) {
      le.current = !1;
      return;
    }
    m?.(ee), C.getState().resetSelectedElements(), C.setState({ nodesSelectionActive: !1 });
  }, L = (ee) => {
    if (Array.isArray(l) && l?.includes(2)) {
      ee.preventDefault();
      return;
    }
    y?.(ee);
  }, F = g ? (ee) => g(ee) : void 0, G = (ee) => {
    le.current && (ee.stopPropagation(), le.current = !1);
  }, Z = (ee) => {
    const { domNode: ge, transform: ze } = C.getState();
    if (te.current = ge?.getBoundingClientRect(), !te.current)
      return;
    const Re = ee.target === I.current;
    if (!Re && !!ee.target.closest(".nokey") || !e || !(c && Re || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), le.current = !1;
    const { x: Ce, y: $e } = xa(ee.nativeEvent, te.current), ft = Tl({ x: Ce, y: $e }, ze);
    C.setState({
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
    const { userSelectionRect: ze } = C.getState();
    if (!ze)
      return;
    const { transform: Re, nodeLookup: Se, edgeLookup: xe, connectionLookup: Ce, triggerNodeChanges: $e, triggerEdgeChanges: ft, defaultEdgeOptions: Me } = C.getState(), Xe = { x: ze.startX, y: ze.startY }, { x: ke, y: Ie } = Cl(Xe, Re), St = {
      startX: Xe.x,
      startY: Xe.y,
      x: ee < ke ? ee : ke,
      y: ge < Ie ? ge : Ie,
      width: Math.abs(ee - ke),
      height: Math.abs(ge - Ie)
    }, Je = $.current, Ze = K.current;
    $.current = new Set(Cm(Se, St, Re, r === Fo.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Qe = Me?.selectable ?? !0;
    for (const gt of $.current) {
      const yt = Ce.get(gt);
      if (yt)
        for (const { edgeId: Yt } of yt.values()) {
          const Lt = xe.get(Yt);
          Lt && (Lt.selectable ?? Qe) && K.current.add(Yt);
        }
    }
    if (!Av(Je, $.current)) {
      const gt = gl(Se, $.current, !0);
      $e(gt);
    }
    if (!Av(Ze, K.current)) {
      const gt = gl(xe, K.current);
      ft(gt);
    }
    C.setState({
      userSelectionRect: St,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function H() {
    if (!s || !te.current)
      return;
    const [ee, ge] = Rm(j.current, te.current, V);
    B({ x: ee, y: ge }).then((ze) => {
      if (!le.current || !ze) {
        N.current = requestAnimationFrame(H);
        return;
      }
      const { x: Re, y: Se } = j.current;
      D(Re, Se), N.current = requestAnimationFrame(H);
    });
  }
  const P = () => {
    cancelAnimationFrame(N.current), N.current = 0, Y.current = !1;
  };
  _.useEffect(() => () => P(), []);
  const ne = (ee) => {
    const { userSelectionRect: ge, transform: ze, resetSelectedElements: Re } = C.getState();
    if (!te.current || !ge)
      return;
    const { x: Se, y: xe } = xa(ee.nativeEvent, te.current);
    j.current = { x: Se, y: xe };
    const Ce = Cl({ x: ge.startX, y: ge.startY }, ze);
    if (!le.current) {
      const $e = a ? 0 : u;
      if (Math.hypot(Se - Ce.x, xe - Ce.y) <= $e)
        return;
      Re(), d?.(ee);
    }
    le.current = !0, Y.current || (H(), Y.current = !0), D(Se, xe);
  }, se = (ee) => {
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !z && ee.target === I.current && C.getState().userSelectionRect && M?.(ee), C.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), le.current && (p?.(ee), C.setState({
      nodesSelectionActive: $.current.size > 0
    })), P());
  }, he = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), P();
  }, me = l === !0 || Array.isArray(l) && l.includes(0);
  return b.jsxs("div", { className: Qt(["react-flow__pane", { draggable: me, dragging: O, selection: e }]), onClick: A ? void 0 : fh(M, I), onContextMenu: fh(L, I), onWheel: fh(F, I), onPointerEnter: A ? void 0 : v, onPointerMove: A ? ne : x, onPointerUp: A ? se : void 0, onPointerCancel: A ? he : void 0, onPointerDownCapture: A ? Z : void 0, onClickCapture: A ? G : void 0, onPointerLeave: S, ref: I, style: zc, children: [R, b.jsx(BA, {})] });
}
function $h({ id: e, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", wa.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function mw({ nodeRef: e, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = zt(), [p, m] = _.useState(!1), y = _.useRef();
  return _.useEffect(() => {
    y.current = ED({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        $h({
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
const qA = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function pw() {
  const e = zt();
  return _.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: y } = e.getState(), g = /* @__PURE__ */ new Map(), v = qA(c), x = s ? u[0] : 5, S = s ? u[1] : 5, R = r.direction.x * x * r.factor, N = r.direction.y * S * r.factor;
    for (const [, C] of m) {
      if (!v(C))
        continue;
      let z = {
        x: C.internals.positionAbsolute.x + R,
        y: C.internals.positionAbsolute.y + N
      };
      s && (z = ss(z, u));
      const { position: E, positionAbsolute: O } = Lx({
        nodeId: C.id,
        nextPosition: z,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: d
      });
      C.position = E, C.internals.positionAbsolute = O, g.set(C.id, C);
    }
    p(g);
  }, []);
}
const Hm = _.createContext(null), $A = Hm.Provider;
Hm.Consumer;
const gw = () => _.useContext(Hm), IA = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), YA = (e, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, y = p?.nodeId === e && p?.id === a && p?.type === r;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === El.Strict ? d?.type !== r : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function GA({ type: e = "source", position: a = Ae.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: y, onTouchStart: g, ...v }, x) {
  const S = c || null, R = e === "target", N = zt(), C = gw(), { connectOnClick: z, noPanClassName: E, rfId: O } = lt(IA, At), { connectingFrom: k, connectingTo: B, clickConnecting: V, isPossibleEndHandle: A, connectionInProcess: I, clickConnectionInProcess: te, valid: $ } = lt(YA(C, S, e), At);
  C || N.getState().onError?.("010", wa.error010());
  const K = (Y) => {
    const { defaultEdgeOptions: M, onConnect: L, hasDefaultEdges: F } = N.getState(), G = {
      ...M,
      ...Y
    };
    if (F) {
      const { edges: Z, setEdges: D, onError: H } = N.getState();
      D(NA(G, Z, { onError: H }));
    }
    L?.(G), d?.(G);
  }, le = (Y) => {
    if (!C)
      return;
    const M = Ix(Y.nativeEvent);
    if (s && (M && Y.button === 0 || !M)) {
      const L = N.getState();
      qh.onPointerDown(Y.nativeEvent, {
        handleDomNode: Y.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: R,
        handleId: S,
        nodeId: C,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...F) => N.getState().onConnectEnd?.(...F),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...F) => N.getState().isValidConnection?.(...F) ?? !0),
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    M ? y?.(Y) : g?.(Y);
  }, j = (Y) => {
    const { onClickConnectStart: M, onClickConnectEnd: L, connectionClickStartHandle: F, connectionMode: G, isValidConnection: Z, lib: D, rfId: H, nodeLookup: P, connection: ne } = N.getState();
    if (!C || !F && !s)
      return;
    if (!F) {
      M?.(Y.nativeEvent, { nodeId: C, handleId: S, handleType: e }), N.setState({ connectionClickStartHandle: { nodeId: C, type: e, id: S } });
      return;
    }
    const se = qx(Y.target), he = r || Z, { connection: me, isValid: ee } = qh.isValid(Y.nativeEvent, {
      handle: {
        nodeId: C,
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
    delete ge.inProgress, ge.toPosition = ge.toHandle ? ge.toHandle.position : null, L?.(Y, ge), N.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": S, "data-nodeid": C, "data-handlepos": a, "data-id": `${O}-${C}-${S}-${e}`, className: Qt([
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
      clickconnecting: V,
      connectingfrom: k,
      connectingto: B,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!I || A) && (I || te ? u : s)
    }
  ]), onMouseDown: le, onTouchStart: le, onClick: z ? j : void 0, ref: x, ...v, children: p });
}
const Ml = _.memo(dw(GA));
function XA({ data: e, isConnectable: a, sourcePosition: r = Ae.Bottom }) {
  return b.jsxs(b.Fragment, { children: [e?.label, b.jsx(Ml, { type: "source", position: r, isConnectable: a })] });
}
function FA({ data: e, isConnectable: a, targetPosition: r = Ae.Top, sourcePosition: l = Ae.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Ml, { type: "target", position: r, isConnectable: a }), e?.label, b.jsx(Ml, { type: "source", position: l, isConnectable: a })] });
}
function ZA() {
  return null;
}
function QA({ data: e, isConnectable: a, targetPosition: r = Ae.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Ml, { type: "target", position: r, isConnectable: a }), e?.label] });
}
const oc = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, ob = {
  input: XA,
  default: FA,
  output: QA,
  group: ZA
};
function PA(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const KA = (e) => {
  const { width: a, height: r, x: l, y: s } = os(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: ba(a) ? a : null,
    height: ba(r) ? r : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function JA({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = zt(), { width: s, height: u, transformString: c, userSelectionActive: d } = lt(KA, At), p = pw(), m = _.useRef(null);
  _.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !d && s !== null && u !== null;
  if (mw({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const g = e ? (x) => {
    const S = l.getState().nodes.filter((R) => R.selected);
    e(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(oc, x.key) && (x.preventDefault(), p({
      direction: oc[x.key],
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
const sb = typeof window < "u" ? window : void 0, WA = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function yw({ children: e, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: y, selectionMode: g, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: R, zoomActivationKeyCode: N, elementsSelectable: C, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: k, panOnScrollMode: B, zoomOnDoubleClick: V, panOnDrag: A, autoPanOnSelection: I, defaultViewport: te, translateExtent: $, minZoom: K, maxZoom: le, preventScrolling: j, onSelectionContextMenu: Y, noWheelClassName: M, noPanClassName: L, disableKeyboardA11y: F, onViewportChange: G, isControlledViewport: Z }) {
  const { nodesSelectionActive: D, userSelectionActive: H } = lt(WA, At), P = Po(m, { target: sb }), ne = Po(R, { target: sb }), se = ne || A, he = ne || O, me = y && se !== !0, ee = P || H || me;
  return OA({ deleteKeyCode: p, multiSelectionKeyCode: S }), b.jsx(HA, { onPaneContextMenu: u, elementsSelectable: C, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: he, panOnScrollSpeed: k, panOnScrollMode: B, zoomOnDoubleClick: V, panOnDrag: !P && se, defaultViewport: te, translateExtent: $, minZoom: K, maxZoom: le, zoomActivationKeyCode: N, preventScrolling: j, noWheelClassName: M, noPanClassName: L, onViewportChange: G, isControlledViewport: Z, paneClickDistance: d, selectionOnDrag: me, children: b.jsxs(VA, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: I, isSelecting: !!ee, selectionMode: g, selectionKeyPressed: P, paneClickDistance: d, selectionOnDrag: me, children: [e, D && b.jsx(JA, { onSelectionContextMenu: Y, noPanClassName: L, disableKeyboardA11y: F })] }) });
}
yw.displayName = "FlowRenderer";
const e3 = _.memo(yw), t3 = (e) => (a) => e ? Cm(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function n3(e) {
  return lt(_.useCallback(t3(e), [e]), At);
}
const a3 = (e) => e.updateNodeInternals;
function i3() {
  const e = lt(a3), [a] = _.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
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
function r3({ node: e, nodeType: a, hasDimensions: r, resizeObserver: l }) {
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
function l3({ id: e, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: y, resizeObserver: g, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: R, nodeTypes: N, nodeClickDistance: C, onError: z }) {
  const { node: E, internals: O, isParent: k } = lt((ee) => {
    const ge = ee.nodeLookup.get(e), ze = ee.parentLookup.has(e);
    return {
      node: ge,
      internals: ge.internals,
      isParent: ze
    };
  }, At);
  let B = E.type || "default", V = N?.[B] || ob[B];
  V === void 0 && (z?.("003", wa.error003(B)), B = "default", V = N?.default || ob.default);
  const A = !!(E.draggable || d && typeof E.draggable > "u"), I = !!(E.selectable || p && typeof E.selectable > "u"), te = !!(E.connectable || m && typeof E.connectable > "u"), $ = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), le = Ux(E), j = r3({ node: E, nodeType: B, hasDimensions: le, resizeObserver: g }), Y = mw({
    nodeRef: j,
    disabled: E.hidden || !A,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: e,
    isSelectable: I,
    nodeClickDistance: C
  }), M = pw();
  if (E.hidden)
    return null;
  const L = hi(E), F = PA(E), G = I || A || a || r || l || s, Z = r ? (ee) => r(ee, { ...O.userNode }) : void 0, D = l ? (ee) => l(ee, { ...O.userNode }) : void 0, H = s ? (ee) => s(ee, { ...O.userNode }) : void 0, P = u ? (ee) => u(ee, { ...O.userNode }) : void 0, ne = c ? (ee) => c(ee, { ...O.userNode }) : void 0, se = (ee) => {
    const { selectNodesOnDrag: ge, nodeDragThreshold: ze } = K.getState();
    I && (!ge || !A || ze > 0) && $h({
      id: e,
      store: K,
      nodeRef: j
    }), a && a(ee, { ...O.userNode });
  }, he = (ee) => {
    if (!($x(ee.nativeEvent) || S)) {
      if (Dx.includes(ee.key) && I) {
        const ge = ee.key === "Escape";
        $h({
          id: e,
          store: K,
          unselect: ge,
          nodeRef: j
        });
      } else if (A && E.selected && Object.prototype.hasOwnProperty.call(oc, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: ge } = K.getState();
        K.setState({
          ariaLiveMessage: ge["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), M({
          direction: oc[ee.key],
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
    Cm(/* @__PURE__ */ new Map([[e, E]]), { x: 0, y: 0, width: ge, height: ze }, ee, !0).length > 0 || Se(E.position.x + L.width / 2, E.position.y + L.height / 2, {
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
      selectable: I,
      parent: k,
      draggable: A,
      dragging: Y
    }
  ]), ref: j, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: G ? "all" : "none",
    visibility: le ? "visible" : "hidden",
    ...E.style,
    ...F
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: Z, onMouseMove: D, onMouseLeave: H, onContextMenu: P, onClick: se, onDoubleClick: ne, onKeyDown: $ ? he : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? me : void 0, role: E.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${sw}-${R}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: b.jsx($A, { value: e, children: b.jsx(V, { id: e, data: E.data, type: B, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: E.selected ?? !1, selectable: I, draggable: A, deletable: E.deletable ?? !0, isConnectable: te, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: Y, dragHandle: E.dragHandle, zIndex: O.z, parentId: E.parentId, ...L }) }) });
}
var o3 = _.memo(l3);
const s3 = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function vw(e) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(s3, At), c = n3(e.onlyRenderVisibleElements), d = i3();
  return b.jsx("div", { className: "react-flow__nodes", style: zc, children: c.map((p) => (
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
    b.jsx(o3, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
vw.displayName = "NodeRenderer";
const u3 = _.memo(vw);
function c3(e) {
  return lt(_.useCallback((r) => {
    if (!e)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && iD({
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
const f3 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return b.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, d3 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return b.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, ub = {
  [rc.Arrow]: f3,
  [rc.ArrowClosed]: d3
};
function h3(e) {
  const a = zt();
  return _.useMemo(() => Object.prototype.hasOwnProperty.call(ub, e) ? ub[e] : (a.getState().onError?.("009", wa.error009(e)), null), [e]);
}
const m3 = ({ id: e, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = h3(a);
  return p ? b.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: b.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, bw = ({ defaultColor: e, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = _.useMemo(() => dD(r, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, e]);
  return s.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: s.map((u) => b.jsx(m3, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
bw.displayName = "MarkerDefinitions";
var p3 = _.memo(bw);
function xw({ x: e, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...y }) {
  const [g, v] = _.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Qt(["react-flow__edge-textwrapper", m]), S = _.useRef(null);
  return _.useEffect(() => {
    if (S.current) {
      const R = S.current.getBBox();
      v({
        x: R.x,
        y: R.y,
        width: R.width,
        height: R.height
      });
    }
  }, [r]), r ? b.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...y, children: [s && b.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), b.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: S, style: l, children: r }), p] }) : null;
}
xw.displayName = "EdgeText";
const g3 = _.memo(xw);
function Oc({ path: e, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...y }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...y, d: e, fill: "none", className: Qt(["react-flow__edge-path", y.className]) }), m ? b.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && ba(a) && ba(r) ? b.jsx(g3, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function cb({ pos: e, x1: a, y1: r, x2: l, y2: s }) {
  return e === Ae.Left || e === Ae.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function ww({ sourceX: e, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top }) {
  const [c, d] = cb({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = cb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [y, g, v, x] = Yx({
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
function Sw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: N, interactionWidth: C }) => {
    const [z, E, O] = ww({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), k = e.isInternal ? void 0 : a;
    return b.jsx(Oc, { id: k, path: z, labelX: E, labelY: O, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: N, interactionWidth: C });
  });
}
const y3 = Sw({ isInternal: !1 }), Ew = Sw({ isInternal: !0 });
y3.displayName = "SimpleBezierEdge";
Ew.displayName = "SimpleBezierEdgeInternal";
function _w(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, sourcePosition: x = Ae.Bottom, targetPosition: S = Ae.Top, markerEnd: R, markerStart: N, pathOptions: C, interactionWidth: z }) => {
    const [E, O, k] = Bh({
      sourceX: r,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: C?.borderRadius,
      offset: C?.offset,
      stepPosition: C?.stepPosition
    }), B = e.isInternal ? void 0 : a;
    return b.jsx(Oc, { id: B, path: E, labelX: O, labelY: k, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: R, markerStart: N, interactionWidth: z });
  });
}
const Nw = _w({ isInternal: !1 }), Cw = _w({ isInternal: !0 });
Nw.displayName = "SmoothStepEdge";
Cw.displayName = "SmoothStepEdgeInternal";
function Rw(e) {
  return _.memo(({ id: a, ...r }) => {
    const l = e.isInternal ? void 0 : a;
    return b.jsx(Nw, { ...r, id: l, pathOptions: _.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const v3 = Rw({ isInternal: !1 }), Mw = Rw({ isInternal: !0 });
v3.displayName = "StepEdge";
Mw.displayName = "StepEdgeInternal";
function Tw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: x, markerStart: S, interactionWidth: R }) => {
    const [N, C, z] = Fx({ sourceX: r, sourceY: l, targetX: s, targetY: u }), E = e.isInternal ? void 0 : a;
    return b.jsx(Oc, { id: E, path: N, labelX: C, labelY: z, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: x, markerStart: S, interactionWidth: R });
  });
}
const b3 = Tw({ isInternal: !1 }), Dw = Tw({ isInternal: !0 });
b3.displayName = "StraightEdge";
Dw.displayName = "StraightEdgeInternal";
function Aw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = Ae.Bottom, targetPosition: d = Ae.Top, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: N, pathOptions: C, interactionWidth: z }) => {
    const [E, O, k] = Gx({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: C?.curvature
    }), B = e.isInternal ? void 0 : a;
    return b.jsx(Oc, { id: B, path: E, labelX: O, labelY: k, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: R, markerStart: N, interactionWidth: z });
  });
}
const x3 = Aw({ isInternal: !1 }), zw = Aw({ isInternal: !0 });
x3.displayName = "BezierEdge";
zw.displayName = "BezierEdgeInternal";
const fb = {
  default: zw,
  straight: Dw,
  step: Mw,
  smoothstep: Cw,
  simplebezier: Ew
}, db = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, w3 = (e, a, r) => r === Ae.Left ? e - a : r === Ae.Right ? e + a : e, S3 = (e, a, r) => r === Ae.Top ? e - a : r === Ae.Bottom ? e + a : e, hb = "react-flow__edgeupdater";
function mb({ position: e, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return b.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Qt([hb, `${hb}-${d}`]), cx: w3(a, l, e), cy: S3(r, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function E3({ isReconnectable: e, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: y, onReconnectEnd: g, setReconnecting: v, setUpdateHover: x }) {
  const S = zt(), R = (O, k) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: B, domNode: V, connectionMode: A, connectionRadius: I, lib: te, onConnectStart: $, cancelConnection: K, nodeLookup: le, rfId: j, panBy: Y, updateConnection: M } = S.getState(), L = k.type === "target", F = (D, H) => {
      v(!1), g?.(D, r, k.type, H);
    }, G = (D) => m?.(r, D), Z = (D, H) => {
      v(!0), y?.(O, r, k.type), $?.(D, H);
    };
    qh.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: B,
      connectionMode: A,
      connectionRadius: I,
      domNode: V,
      handleId: k.id,
      nodeId: k.nodeId,
      nodeLookup: le,
      isTarget: L,
      edgeUpdaterType: k.type,
      lib: te,
      flowId: j,
      cancelConnection: K,
      panBy: Y,
      isValidConnection: (...D) => S.getState().isValidConnection?.(...D) ?? !0,
      onConnect: G,
      onConnectStart: Z,
      onConnectEnd: (...D) => S.getState().onConnectEnd?.(...D),
      onReconnectEnd: F,
      updateConnection: M,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, N = (O) => R(O, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), C = (O) => R(O, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), z = () => x(!0), E = () => x(!1);
  return b.jsxs(b.Fragment, { children: [(e === !0 || e === "source") && b.jsx(mb, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: N, onMouseEnter: z, onMouseOut: E, type: "source" }), (e === !0 || e === "target") && b.jsx(mb, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: C, onMouseEnter: z, onMouseOut: E, type: "target" })] });
}
function _3({ id: e, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: R, noPanClassName: N, onError: C, disableKeyboardA11y: z }) {
  let E = lt((Se) => Se.edgeLookup.get(e));
  const O = lt((Se) => Se.defaultEdgeOptions);
  E = O ? { ...O, ...E } : E;
  let k = E.type || "default", B = R?.[k] || fb[k];
  B === void 0 && (C?.("011", wa.error011(k)), k = "default", B = R?.default || fb.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), A = typeof g < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), I = !!(E.selectable || l && typeof E.selectable > "u"), te = _.useRef(null), [$, K] = _.useState(!1), [le, j] = _.useState(!1), Y = zt(), { zIndex: M, sourceX: L, sourceY: F, targetX: G, targetY: Z, sourcePosition: D, targetPosition: H } = lt(_.useCallback((Se) => {
    const xe = Se.nodeLookup.get(E.source), Ce = Se.nodeLookup.get(E.target);
    if (!xe || !Ce)
      return {
        zIndex: E.zIndex,
        ...db
      };
    const $e = fD({
      id: e,
      sourceNode: xe,
      targetNode: Ce,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: Se.connectionMode,
      onError: C
    });
    return {
      zIndex: aD({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Ce,
        elevateOnSelect: Se.elevateEdgesOnSelect,
        zIndexMode: Se.zIndexMode
      }),
      ...$e || db
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), P = _.useMemo(() => E.markerStart ? `url('#${Uh(E.markerStart, S)}')` : void 0, [E.markerStart, S]), ne = _.useMemo(() => E.markerEnd ? `url('#${Uh(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
  if (E.hidden || L === null || F === null || G === null || Z === null)
    return null;
  const se = (Se) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Ce, multiSelectionActive: $e } = Y.getState();
    I && (Y.setState({ nodesSelectionActive: !1 }), E.selected && $e ? (Ce({ nodes: [], edges: [E] }), te.current?.blur()) : xe([e])), s && s(Se, E);
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
    if (!z && Dx.includes(Se.key) && I) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Ce } = Y.getState();
      Se.key === "Escape" ? (te.current?.blur(), xe({ edges: [E] })) : Ce([e]);
    }
  };
  return b.jsx("svg", { style: { zIndex: M }, children: b.jsxs("g", { className: Qt([
    "react-flow__edge",
    `react-flow__edge-${k}`,
    E.className,
    N,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !I && !s,
      updating: $,
      selectable: I
    }
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: ee, onMouseMove: ge, onMouseLeave: ze, onKeyDown: V ? Re : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${uw}-${S}` : void 0, ref: te, ...E.domAttributes, children: [!le && b.jsx(B, { id: e, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: I, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: F, targetX: G, targetY: Z, sourcePosition: D, targetPosition: H, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: P, markerEnd: ne, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), A && b.jsx(E3, { edge: E, isReconnectable: A, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: x, sourceX: L, sourceY: F, targetX: G, targetY: Z, sourcePosition: D, targetPosition: H, setUpdateHover: K, setReconnecting: j })] }) });
}
var N3 = _.memo(_3);
const C3 = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function Ow({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: g, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: R }) {
  const { edgesFocusable: N, edgesReconnectable: C, elementsSelectable: z, onError: E } = lt(C3, At), O = c3(a);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(p3, { defaultColor: e, rfId: r }), O.map((k) => b.jsx(N3, { id: k, edgesFocusable: N, edgesReconnectable: C, elementsSelectable: z, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: y, reconnectRadius: g, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: r, onError: E, edgeTypes: l, disableKeyboardA11y: R }, k))] });
}
Ow.displayName = "EdgeRenderer";
const R3 = _.memo(Ow), M3 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function T3({ children: e }) {
  const a = lt(M3);
  return b.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function D3(e) {
  const a = Lm(), r = _.useRef(!1);
  _.useEffect(() => {
    !r.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), r.current = !0);
  }, [e, a.viewportInitialized]);
}
const A3 = (e) => e.panZoom?.syncViewport;
function z3(e) {
  const a = lt(A3), r = zt();
  return _.useEffect(() => {
    e && (a?.(e), r.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function O3(e) {
  return e.connection.inProgress ? { ...e.connection, to: Tl(e.connection.to, e.transform) } : { ...e.connection };
}
function j3(e) {
  return O3;
}
function L3(e) {
  const a = j3();
  return lt(a, At);
}
const H3 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function k3({ containerStyle: e, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = lt(H3, At);
  return !(u && s && p) ? null : b.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: Qt(["react-flow__connection", Ox(d)]), children: b.jsx(jw, { style: a, type: r, CustomComponent: l, isValid: d }) }) });
}
const jw = ({ style: e, type: a = Xi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: y, toHandle: g, toPosition: v, pointer: x } = L3();
  if (!s)
    return;
  if (r)
    return b.jsx(r, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: v, connectionStatus: Ox(l), toNode: y, toHandle: g, pointer: x });
  let S = "";
  const R = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v
  };
  switch (a) {
    case Xi.Bezier:
      [S] = Gx(R);
      break;
    case Xi.SimpleBezier:
      [S] = ww(R);
      break;
    case Xi.Step:
      [S] = Bh({
        ...R,
        borderRadius: 0
      });
      break;
    case Xi.SmoothStep:
      [S] = Bh(R);
      break;
    default:
      [S] = Fx(R);
  }
  return b.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: e });
};
jw.displayName = "ConnectionLine";
const B3 = {};
function pb(e = B3) {
  _.useRef(e), zt(), _.useEffect(() => {
  }, [e]);
}
function U3() {
  zt(), _.useRef(!1), _.useEffect(() => {
  }, []);
}
function Lw({ nodeTypes: e, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: g, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: R, connectionLineComponent: N, connectionLineContainerStyle: C, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, multiSelectionKeyCode: k, panActivationKeyCode: B, zoomActivationKeyCode: V, deleteKeyCode: A, onlyRenderVisibleElements: I, elementsSelectable: te, defaultViewport: $, translateExtent: K, minZoom: le, maxZoom: j, preventScrolling: Y, defaultMarkerColor: M, zoomOnScroll: L, zoomOnPinch: F, panOnScroll: G, panOnScrollSpeed: Z, panOnScrollMode: D, zoomOnDoubleClick: H, panOnDrag: P, autoPanOnSelection: ne, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneScroll: ge, onPaneContextMenu: ze, paneClickDistance: Re, nodeClickDistance: Se, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, onReconnect: Xe, onReconnectStart: ke, onReconnectEnd: Ie, noDragClassName: St, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt, viewport: Yt, onViewportChange: Lt }) {
  return pb(e), pb(a), U3(), D3(r), z3(Yt), b.jsx(e3, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: ee, onPaneContextMenu: ze, onPaneScroll: ge, paneClickDistance: Re, deleteKeyCode: A, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: k, panActivationKeyCode: B, zoomActivationKeyCode: V, elementsSelectable: te, zoomOnScroll: L, zoomOnPinch: F, zoomOnDoubleClick: H, panOnScroll: G, panOnScrollSpeed: Z, panOnScrollMode: D, panOnDrag: P, autoPanOnSelection: ne, defaultViewport: $, translateExtent: K, minZoom: le, maxZoom: j, onSelectionContextMenu: g, preventScrolling: Y, noDragClassName: St, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Qe, onViewportChange: Lt, isControlledViewport: !!Yt, children: b.jsxs(T3, { children: [b.jsx(R3, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Xe, onReconnectStart: ke, onReconnectEnd: Ie, onlyRenderVisibleElements: I, onEdgeContextMenu: xe, onEdgeMouseEnter: Ce, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, defaultMarkerColor: M, noPanClassName: Ze, disableKeyboardA11y: Qe, rfId: yt }), b.jsx(k3, { style: R, type: S, component: N, containerStyle: C }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(u3, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: Se, onlyRenderVisibleElements: I, noPanClassName: Ze, noDragClassName: St, disableKeyboardA11y: Qe, nodeExtent: gt, rfId: yt }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Lw.displayName = "GraphView";
const V3 = _.memo(Lw), q3 = Bx(), gb = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: g, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), C = l ?? a ?? [], z = r ?? e ?? [], E = y ?? [0, 0], O = g ?? Xo;
  Px(R, N, C);
  const { nodesInitialized: k } = Vh(z, x, S, {
    nodeOrigin: E,
    nodeExtent: O,
    zIndexMode: v
  });
  let B = [0, 0, 1];
  if (c && s && u) {
    const V = os(x, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: A, y: I, zoom: te } = Mm(V, s, u, p, m, d?.padding ?? 0.1);
    B = [A, I, te];
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
    edges: C,
    edgeLookup: N,
    connectionLookup: R,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: Xo,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: El.Strict,
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
    connection: { ...zx },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: q3,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Ax,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, $3 = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v }) => WD((x, S) => {
  async function R() {
    const { nodeLookup: N, panZoom: C, fitViewOptions: z, fitViewResolver: E, width: O, height: k, minZoom: B, maxZoom: V } = S();
    C && (await PT({
      nodes: N,
      width: O,
      height: k,
      panZoom: C,
      minZoom: B,
      maxZoom: V
    }, z), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...gb({
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
    setNodes: (N) => {
      const { nodeLookup: C, parentLookup: z, nodeOrigin: E, elevateNodesOnSelect: O, fitViewQueued: k, zIndexMode: B, nodesSelectionActive: V } = S(), { nodesInitialized: A, hasSelectedNodes: I } = Vh(N, C, z, {
        nodeOrigin: E,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: B
      }), te = V && I;
      k && A ? (R(), x({
        nodes: N,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: te
      })) : x({ nodes: N, nodesInitialized: A, nodesSelectionActive: te });
    },
    setEdges: (N) => {
      const { connectionLookup: C, edgeLookup: z } = S();
      Px(C, z, N), x({ edges: N });
    },
    setDefaultNodesAndEdges: (N, C) => {
      if (N) {
        const { setNodes: z } = S();
        z(N), x({ hasDefaultNodes: !0 });
      }
      if (C) {
        const { setEdges: z } = S();
        z(C), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (N) => {
      const { triggerNodeChanges: C, nodeLookup: z, parentLookup: E, domNode: O, nodeOrigin: k, nodeExtent: B, debug: V, fitViewQueued: A, zIndexMode: I } = S(), { changes: te, updatedInternals: $ } = bD(N, z, E, O, k, B, I);
      $ && (pD(z, E, { nodeOrigin: k, nodeExtent: B, zIndexMode: I }), A ? (R(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), te?.length > 0 && (V && console.log("React Flow: trigger node changes", te), C?.(te)));
    },
    updateNodePositions: (N, C = !1) => {
      const z = [];
      let E = [];
      const { nodeLookup: O, triggerNodeChanges: k, connection: B, updateConnection: V, onNodesChangeMiddlewareMap: A } = S();
      for (const [I, te] of N) {
        const $ = O.get(I), K = !!($?.expandParent && $?.parentId && te?.position), le = {
          id: I,
          type: "position",
          position: K ? {
            x: Math.max(0, te.position.x),
            y: Math.max(0, te.position.y)
          } : te.position,
          dragging: C
        };
        if ($ && B.inProgress && B.fromNode.id === $.id) {
          const j = Cr($, B.fromHandle, Ae.Left, !0);
          V({ ...B, from: j });
        }
        K && $.parentId && z.push({
          id: I,
          parentId: $.parentId,
          rect: {
            ...te.internals.positionAbsolute,
            width: te.measured.width ?? 0,
            height: te.measured.height ?? 0
          }
        }), E.push(le);
      }
      if (z.length > 0) {
        const { parentLookup: I, nodeOrigin: te } = S(), $ = jm(z, O, I, te);
        E.push(...$);
      }
      for (const I of A.values())
        E = I(E);
      k(E);
    },
    triggerNodeChanges: (N) => {
      const { onNodesChange: C, setNodes: z, nodes: E, hasDefaultNodes: O, debug: k } = S();
      if (N?.length) {
        if (O) {
          const B = SA(N, E);
          z(B);
        }
        k && console.log("React Flow: trigger node changes", N), C?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: C, setEdges: z, edges: E, hasDefaultEdges: O, debug: k } = S();
      if (N?.length) {
        if (O) {
          const B = EA(N, E);
          z(B);
        }
        k && console.log("React Flow: trigger edge changes", N), C?.(N);
      }
    },
    addSelectedNodes: (N) => {
      const { multiSelectionActive: C, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: k } = S();
      if (C) {
        const B = N.map((V) => gr(V, !0));
        O(B);
        return;
      }
      O(gl(E, /* @__PURE__ */ new Set([...N]), !0)), k(gl(z));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: C, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: k } = S();
      if (C) {
        const B = N.map((V) => gr(V, !0));
        k(B);
        return;
      }
      k(gl(z, /* @__PURE__ */ new Set([...N]))), O(gl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: N, edges: C } = {}) => {
      const { edges: z, nodes: E, nodeLookup: O, triggerNodeChanges: k, triggerEdgeChanges: B } = S(), V = N || E, A = C || z, I = [];
      for (const $ of V) {
        if (!$.selected)
          continue;
        const K = O.get($.id);
        K && (K.selected = !1), I.push(gr($.id, !1));
      }
      const te = [];
      for (const $ of A)
        $.selected && te.push(gr($.id, !1));
      k(I), B(te);
    },
    setMinZoom: (N) => {
      const { panZoom: C, maxZoom: z } = S();
      C?.setScaleExtent([N, z]), x({ minZoom: N });
    },
    setMaxZoom: (N) => {
      const { panZoom: C, minZoom: z } = S();
      C?.setScaleExtent([z, N]), x({ maxZoom: N });
    },
    setTranslateExtent: (N) => {
      S().panZoom?.setTranslateExtent(N), x({ translateExtent: N });
    },
    resetSelectedElements: () => {
      const { edges: N, nodes: C, triggerNodeChanges: z, triggerEdgeChanges: E, elementsSelectable: O } = S();
      if (!O)
        return;
      const k = C.reduce((V, A) => A.selected ? [...V, gr(A.id, !1)] : V, []), B = N.reduce((V, A) => A.selected ? [...V, gr(A.id, !1)] : V, []);
      z(k), E(B);
    },
    setNodeExtent: (N) => {
      const { nodes: C, nodeLookup: z, parentLookup: E, nodeOrigin: O, elevateNodesOnSelect: k, nodeExtent: B, zIndexMode: V } = S();
      N[0][0] === B[0][0] && N[0][1] === B[0][1] && N[1][0] === B[1][0] && N[1][1] === B[1][1] || (Vh(C, z, E, {
        nodeOrigin: O,
        nodeExtent: N,
        elevateNodesOnSelect: k,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: C, width: z, height: E, panZoom: O, translateExtent: k } = S();
      return xD({ delta: N, panZoom: O, transform: C, translateExtent: k, width: z, height: E });
    },
    setCenter: async (N, C, z) => {
      const { width: E, height: O, maxZoom: k, panZoom: B } = S();
      if (!B)
        return !1;
      const V = typeof z?.zoom < "u" ? z.zoom : k;
      return await B.setViewport({
        x: E / 2 - N * V,
        y: O / 2 - C * V,
        zoom: V
      }, { duration: z?.duration, ease: z?.ease, interpolate: z?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...zx }
      });
    },
    updateConnection: (N) => {
      x({ connection: N });
    },
    reset: () => x({ ...gb() })
  };
}, Object.is);
function Hw({ initialNodes: e, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v, children: x }) {
  const [S] = _.useState(() => $3({
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
  return b.jsx(nA, { value: S, children: b.jsx(TA, { children: x }) });
}
function I3({ children: e, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: x }) {
  return _.useContext(Dc) ? b.jsx(b.Fragment, { children: e }) : b.jsx(Hw, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: x, children: e });
}
const Y3 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function G3({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: y, onMoveStart: g, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: R, onClickConnectStart: N, onClickConnectEnd: C, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: k, onNodeDoubleClick: B, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: I, onNodesDelete: te, onEdgesDelete: $, onDelete: K, onSelectionChange: le, onSelectionDragStart: j, onSelectionDrag: Y, onSelectionDragStop: M, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onBeforeDelete: Z, connectionMode: D, connectionLineType: H = Xi.Bezier, connectionLineStyle: P, connectionLineComponent: ne, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: ee = !1, selectionMode: ge = Fo.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Re = Qo() ? "Meta" : "Control", zoomActivationKeyCode: Se = Qo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Ce, onlyRenderVisibleElements: $e = !1, selectNodesOnDrag: ft, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: ke, nodesFocusable: Ie, nodeOrigin: St = cw, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Qe = !0, defaultViewport: gt = pA, minZoom: yt = 0.5, maxZoom: Yt = 2, translateExtent: Lt = Xo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: Xn = "#b1b1b7", zoomOnScroll: xn = !0, zoomOnPinch: tn = !0, panOnScroll: Pt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = wr.Free, zoomOnDoubleClick: mi = !0, panOnDrag: _a = !0, onPaneClick: wn, onPaneMouseEnter: ua, onPaneMouseMove: zn, onPaneMouseLeave: Fn, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: pn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ca, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Q, onEdgeMouseLeave: W, reconnectRadius: de = 10, onNodesChange: pe, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: we = "nowheel", noPanClassName: be = "nopan", fitView: Te, fitViewOptions: De, connectOnClick: Ue, attributionPosition: je, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanOnSelection: Na = !0, autoPanSpeed: On, connectionRadius: cn, isValidConnection: nn, onError: Sn, style: pi, id: En, nodeDragThreshold: gi, connectionDragThreshold: fa, viewport: da, onViewportChange: Be, width: bt, height: gn, colorMode: jn = "light", debug: yi, onScroll: $a, ariaLabelConfig: dt, zIndexMode: Zn = "basic", ...an }, Qi) {
  const Dr = En || "1", Ol = bA(jn), vi = _.useCallback((jl) => {
    jl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), $a?.(jl);
  }, [$a]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ...an, onScroll: vi, style: { ...pi, ...Y3 }, ref: Qi, className: Qt(["react-flow", s, Ol]), id: En, role: "application", children: b.jsxs(I3, { nodes: e, edges: a, width: bt, height: gn, fitView: Te, fitViewOptions: De, minZoom: yt, maxZoom: Yt, nodeOrigin: St, nodeExtent: ot, zIndexMode: Zn, children: [b.jsx(vA, { nodes: e, edges: a, defaultNodes: r, defaultEdges: l, onConnect: x, onConnectStart: S, onConnectEnd: R, onClickConnectStart: N, onClickConnectEnd: C, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: ke, nodesFocusable: Ie, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Qe, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: Yt, nodeExtent: ot, onNodesChange: pe, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Ce, connectionMode: D, translateExtent: Lt, connectOnClick: Ue, defaultEdgeOptions: rt, fitView: Te, fitViewOptions: De, onNodesDelete: te, onEdgesDelete: $, onDelete: K, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: I, onSelectionDrag: Y, onSelectionDragStart: j, onSelectionDragStop: M, onMove: y, onMoveStart: g, onMoveEnd: v, noPanClassName: be, nodeOrigin: St, rfId: Dr, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanSpeed: On, onError: Sn, connectionRadius: cn, isValidConnection: nn, selectNodesOnDrag: ft, nodeDragThreshold: gi, connectionDragThreshold: fa, onBeforeDelete: Z, debug: yi, ariaLabelConfig: dt, zIndexMode: Zn }), b.jsx(V3, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: k, onNodeDoubleClick: B, nodeTypes: u, edgeTypes: c, connectionLineType: H, connectionLineStyle: P, connectionLineComponent: ne, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: ee, selectionMode: ge, deleteKeyCode: he, multiSelectionKeyCode: Re, panActivationKeyCode: ze, zoomActivationKeyCode: Se, onlyRenderVisibleElements: $e, defaultViewport: gt, translateExtent: Lt, minZoom: yt, maxZoom: Yt, preventScrolling: mt, zoomOnScroll: xn, zoomOnPinch: tn, zoomOnDoubleClick: mi, panOnScroll: Pt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: _a, autoPanOnSelection: Na, onPaneClick: wn, onPaneMouseEnter: ua, onPaneMouseMove: zn, onPaneMouseLeave: Fn, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onReconnect: pn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ca, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Q, onEdgeMouseLeave: W, reconnectRadius: de, defaultMarkerColor: Xn, noDragClassName: ve, noWheelClassName: we, noPanClassName: be, rfId: Dr, disableKeyboardA11y: We, nodeExtent: ot, viewport: da, onViewportChange: Be }), b.jsx(mA, { onSelectionChange: le }), Vt, b.jsx(uA, { proOptions: Ge, position: je }), b.jsx(sA, { rfId: Dr, disableKeyboardA11y: We })] }) });
}
var X3 = dw(G3);
function F3({ dimensions: e, lineWidth: a, variant: r, className: l }) {
  return b.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Qt(["react-flow__background-pattern", r, l]) });
}
function Z3({ radius: e, className: a }) {
  return b.jsx("circle", { cx: e, cy: e, r: e, className: Qt(["react-flow__background-pattern", "dots", a]) });
}
var Ba;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ba || (Ba = {}));
const Q3 = {
  [Ba.Dots]: 1,
  [Ba.Lines]: 1,
  [Ba.Cross]: 6
}, P3 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function kw({
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
  const g = _.useRef(null), { transform: v, patternId: x } = lt(P3, At), S = l || Q3[a], R = a === Ba.Dots, N = a === Ba.Cross, C = Array.isArray(r) ? r : [r, r], z = [C[0] * v[2] || 1, C[1] * v[2] || 1], E = S * v[2], O = Array.isArray(u) ? u : [u, u], k = N ? [E, E] : z, B = [
    O[0] * v[2] || 1 + k[0] / 2,
    O[1] * v[2] || 1 + k[1] / 2
  ], V = `${x}${e || ""}`;
  return b.jsxs("svg", { className: Qt(["react-flow__background", m]), style: {
    ...p,
    ...zc,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [b.jsx("pattern", { id: V, x: v[0] % z[0], y: v[1] % z[1], width: z[0], height: z[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${B[0]},-${B[1]})`, children: R ? b.jsx(Z3, { radius: E / 2, className: y }) : b.jsx(F3, { dimensions: k, lineWidth: s, variant: a, className: y }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
kw.displayName = "Background";
const yb = _.memo(kw);
function K3() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function J3() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function W3() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function e4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function t4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Du({ children: e, className: a, ...r }) {
  return b.jsx("button", { type: "button", className: Qt(["react-flow__controls-button", a]), ...r, children: e });
}
const n4 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function Bw({ style: e, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: y, position: g = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = zt(), { isInteractive: R, minZoomReached: N, maxZoomReached: C, ariaLabelConfig: z } = lt(n4, At), { zoomIn: E, zoomOut: O, fitView: k } = Lm(), B = () => {
    E(), u?.();
  }, V = () => {
    O(), c?.();
  }, A = () => {
    k(s), d?.();
  }, I = () => {
    S.setState({
      nodesDraggable: !R,
      nodesConnectable: !R,
      elementsSelectable: !R
    }), p?.(!R);
  }, te = v === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(Ac, { className: Qt(["react-flow__controls", te, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? z["controls.ariaLabel"], children: [a && b.jsxs(b.Fragment, { children: [b.jsx(Du, { onClick: B, className: "react-flow__controls-zoomin", title: z["controls.zoomIn.ariaLabel"], "aria-label": z["controls.zoomIn.ariaLabel"], disabled: C, children: b.jsx(K3, {}) }), b.jsx(Du, { onClick: V, className: "react-flow__controls-zoomout", title: z["controls.zoomOut.ariaLabel"], "aria-label": z["controls.zoomOut.ariaLabel"], disabled: N, children: b.jsx(J3, {}) })] }), r && b.jsx(Du, { className: "react-flow__controls-fitview", onClick: A, title: z["controls.fitView.ariaLabel"], "aria-label": z["controls.fitView.ariaLabel"], children: b.jsx(W3, {}) }), l && b.jsx(Du, { className: "react-flow__controls-interactive", onClick: I, title: z["controls.interactive.ariaLabel"], "aria-label": z["controls.interactive.ariaLabel"], children: R ? b.jsx(t4, {}) : b.jsx(e4, {}) }), y] });
}
Bw.displayName = "Controls";
const a4 = _.memo(Bw);
function i4({ id: e, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: y, shapeRendering: g, selected: v, onClick: x }) {
  const { background: S, backgroundColor: R } = u || {}, N = c || S || R;
  return b.jsx("rect", { className: Qt(["react-flow__minimap-node", { selected: v }, m]), x: a, y: r, rx: y, ry: y, width: l, height: s, style: {
    fill: N,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (C) => x(C, e) : void 0 });
}
const r4 = _.memo(i4), l4 = (e) => e.nodes.map((a) => a.id), dh = (e) => e instanceof Function ? e : () => e;
function o4({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = r4,
  onClick: c
}) {
  const d = lt(l4, At), p = dh(a), m = dh(e), y = dh(r), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: d.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    b.jsx(u4, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, v)
  )) });
}
function s4({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: y, y: g, width: v, height: x } = lt((S) => {
    const R = S.nodeLookup.get(e);
    if (!R)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = R.internals.userNode, { x: C, y: z } = R.internals.positionAbsolute, { width: E, height: O } = hi(N);
    return {
      node: N,
      x: C,
      y: z,
      width: E,
      height: O
    };
  }, At);
  return !m || m.hidden || !Ux(m) ? null : b.jsx(d, { x: y, y: g, width: v, height: x, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const u4 = _.memo(s4);
var c4 = _.memo(o4);
const f4 = 200, d4 = 150, h4 = (e) => !e.hidden, m4 = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? kx(os(e.nodeLookup, { filter: h4 }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, p4 = "react-flow__minimap-desc";
function Uw({
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
  pannable: R = !1,
  zoomable: N = !1,
  ariaLabel: C,
  inversePan: z,
  zoomStep: E = 1,
  offsetScale: O = 5
}) {
  const k = zt(), B = _.useRef(null), { boundingRect: V, viewBB: A, rfId: I, panZoom: te, translateExtent: $, flowWidth: K, flowHeight: le, ariaLabelConfig: j } = lt(m4, At), Y = e?.width ?? f4, M = e?.height ?? d4, L = V.width / Y, F = V.height / M, G = Math.max(L, F), Z = G * Y, D = G * M, H = O * G, P = V.x - (Z - V.width) / 2 - H, ne = V.y - (D - V.height) / 2 - H, se = Z + H * 2, he = D + H * 2, me = `${p4}-${I}`, ee = _.useRef(0), ge = _.useRef();
  ee.current = G, _.useEffect(() => {
    if (B.current && te)
      return ge.current = TD({
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
      pannable: R,
      zoomStep: E,
      zoomable: N
    });
  }, [R, N, z, E, $, K, le]);
  const ze = x ? (xe) => {
    const [Ce, $e] = ge.current?.pointer(xe) || [0, 0];
    x(xe, { x: Ce, y: $e });
  } : void 0, Re = S ? _.useCallback((xe, Ce) => {
    const $e = k.getState().nodeLookup.get(Ce).internals.userNode;
    S(xe, $e);
  }, []) : void 0, Se = C ?? j["minimap.ariaLabel"];
  return b.jsx(Ac, { position: v, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * G : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Qt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: Y, height: M, viewBox: `${P} ${ne} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: B, onClick: ze, children: [Se && b.jsx("title", { id: me, children: Se }), b.jsx(c4, { onClick: Re, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${P - H},${ne - H}h${se + H * 2}v${he + H * 2}h${-se - H * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Uw.displayName = "MiniMap";
const g4 = _.memo(Uw), y4 = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, v4 = {
  [Rl.Line]: "right",
  [Rl.Handle]: "bottom-right"
};
function b4({ nodeId: e, position: a, variant: r = Rl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: R, onResize: N, onResizeEnd: C }) {
  const z = gw(), E = typeof e == "string" ? e : z, O = zt(), k = _.useRef(null), B = r === Rl.Handle, V = lt(_.useCallback(y4(B && x), [B, x]), At), A = _.useRef(null), I = a ?? v4[r];
  _.useEffect(() => {
    if (!(!k.current || !E))
      return A.current || (A.current = $D({
        domNode: k.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: le, snapToGrid: j, nodeOrigin: Y, domNode: M } = O.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: le,
            snapToGrid: j,
            nodeOrigin: Y,
            paneDomNode: M
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: le, nodeLookup: j, parentLookup: Y, nodeOrigin: M } = O.getState(), L = [], F = { x: $.x, y: $.y }, G = j.get(E);
          if (G && G.expandParent && G.parentId) {
            const Z = G.origin ?? M, D = $.width ?? G.measured.width ?? 0, H = $.height ?? G.measured.height ?? 0, P = {
              id: G.id,
              parentId: G.parentId,
              rect: {
                width: D,
                height: H,
                ...Vx({
                  x: $.x ?? G.position.x,
                  y: $.y ?? G.position.y
                }, { width: D, height: H }, G.parentId, j, Z)
              }
            }, ne = jm([P], j, Y, M);
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
        controlPosition: I,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: g,
        resizeDirection: v,
        onResizeStart: R,
        onResize: N,
        onResizeEnd: C,
        shouldResize: S
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
    N,
    C,
    S
  ]);
  const te = I.split("-");
  return b.jsx("div", { className: Qt(["react-flow__resize-control", "nodrag", ...te, r, l]), ref: k, style: {
    ...s,
    scale: V,
    ...c && { [B ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
_.memo(b4);
var x4 = "_1bllf8b0", w4 = "_1bllf8b1";
const vb = 16, S4 = "rgba(186, 158, 255, 0.14)", E4 = "rgba(186, 158, 255, 0.06)", _4 = "rgba(0, 0, 0, 0.6)", N4 = "#1d2023", C4 = "#ba9eff";
function R4({
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
  const y = [x4, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsx("div", { className: y, "aria-label": d ?? "node graph", children: /* @__PURE__ */ b.jsxs(
    X3,
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
          yb,
          {
            id: "minor",
            variant: Ba.Dots,
            gap: vb,
            size: 1.1,
            color: S4
          }
        ),
        /* @__PURE__ */ b.jsx(
          yb,
          {
            id: "major",
            variant: Ba.Lines,
            gap: vb * 5,
            lineWidth: 1,
            color: E4
          }
        ),
        s && /* @__PURE__ */ b.jsx(a4, { showInteractive: !1 }),
        l && /* @__PURE__ */ b.jsx(
          g4,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: _4,
            nodeColor: () => N4,
            nodeStrokeColor: () => C4,
            className: w4
          }
        ),
        p
      ]
    }
  ) });
}
function M4(e) {
  return /* @__PURE__ */ b.jsx(Hw, { children: /* @__PURE__ */ b.jsx(R4, { ...e }) });
}
var T4 = "a9gtw0", D4 = "a9gtw1", A4 = "a9gtw2", z4 = "a9gtw3", O4 = "a9gtw4", j4 = "a9gtw5", L4 = "a9gtw6", H4 = "a9gtw7";
const k4 = {
  default: "",
  raised: D4,
  inset: A4
};
function Oa({
  title: e,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [T4, k4[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("section", { className: c, children: [
    (e || r) && /* @__PURE__ */ b.jsxs("header", { className: z4, children: [
      /* @__PURE__ */ b.jsxs("div", { className: O4, children: [
        e && /* @__PURE__ */ b.jsx("span", { className: L4, children: e }),
        a && /* @__PURE__ */ b.jsx("span", { className: H4, children: a })
      ] }),
      r && /* @__PURE__ */ b.jsx("div", { className: j4, children: r })
    ] }),
    l
  ] });
}
const km = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function Bm() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function sc() {
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
    stageStates: Bm()
  };
}
function B4(e, a, r = Date.now()) {
  return {
    ...sc(),
    phase: "running",
    jobId: e,
    lastFrameAt: r,
    stageStates: {
      ...Bm(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function U4(e, a, r = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: I4(a.params.fraction),
        stage: a.params.stage ?? l.stage
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: F4(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: G4(
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
        stageStates: Vw(l.stageStates)
      };
    default:
      return l;
  }
}
function V4(e) {
  return { ...e, phase: "cancelled", stageStates: Bm() };
}
const q4 = -32108;
function $4(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: q4,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: Vw(e.stageStates)
  };
}
function bb(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function xb(e) {
  const a = sc();
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
function I4(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const Y4 = 0.3;
function G4(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + Y4 * (a - e);
}
function X4(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), r = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + r * e.totalSteps) * e.secondsPerStep;
}
function F4(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function Vw(e) {
  const a = { ...e };
  for (const r of km)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const qw = [
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
], jc = [
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
function Z4(e) {
  return jc.filter((a) => a.tier === e);
}
function Q4() {
  const e = {};
  for (const a of jc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function wb(e) {
  return {
    ...Q4(),
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
function Sb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const $w = [10, 20, 30, 60, 120], P4 = "custom", hh = { framesPerClip: 85, fps: 16, overlap: 5 };
function Dl(e) {
  return {
    framesPerClip: e.frames_per_clip ?? hh.framesPerClip,
    fps: e.fps ?? hh.fps,
    overlap: e.num_overlap_frame ?? hh.overlap
  };
}
function Iw(e, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (e - 1) * (r - l);
}
function Yw(e, a) {
  return a.fps <= 0 ? 0 : Iw(e, a) / a.fps;
}
function Gw(e, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
const K4 = 5, Xw = 129, J4 = [2, 3, 4, 5, 6, 8];
function Fw(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(Xw, Math.max(K4, a));
}
function Eb(e, a) {
  return Fw(e * a);
}
function W4(e) {
  return e <= 0 ? 0 : Math.floor(Xw / e);
}
function Zw(e) {
  const { framesPerClip: a, fps: r } = Dl(e);
  return r <= 0 ? 0 : a / r;
}
function e5(e) {
  const { framesPerClip: a, fps: r } = Dl(e), l = `1 × ${a} frames @ ${r} fps → ${Zw(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function t5(e, a) {
  for (const r of $w)
    if (Gw(r, a) === e) return r;
  return P4;
}
function n5(e) {
  const a = Dl(e), r = e.num_clips ?? 1, l = Yw(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
const Ko = "svi-canonical", a5 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), i5 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), r5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function l5(e) {
  const a = e.frames_per_clip, r = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function o5(e) {
  const a = e.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = l5(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = a5.has(e.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: y,
    isLowVram: p,
    isOffDistribution: i5.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : r5.has(e.id)
  };
}
function s5(e) {
  return [...e].sort((a, r) => a.id === Ko ? -1 : r.id === Ko ? 1 : 0);
}
function u5(e) {
  const a = e.filter((r) => !r.hidden);
  return {
    featured: s5(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function c5(e = 25) {
  return Tr(`/render/jobs?limit=${e}`);
}
async function f5(e) {
  return Tr(`/render/jobs/${e}`);
}
async function d5(e) {
  return Tr("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function h5(e) {
  return Tr(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function m5(e, a, r) {
  return oC(`/render/jobs/${e}/events`, a, r);
}
const p5 = 9e4, g5 = 24e4, y5 = 5e3, Qw = _.createContext(null);
function v5({
  initialSettings: e = K1,
  initialPreset: a = null,
  children: r
}) {
  const [l, s] = _.useState(e), [u, c] = _.useState(
    a?.id ?? Ko
  ), [d, p] = _.useState(a !== null), [m, y] = _.useState(() => {
    const Z = wb(e);
    return a ? Sb(Z, a) : Z;
  }), [g, v] = _.useState(null), [x, S] = _.useState(null), [R, N] = _.useState({
    enabled: !1,
    prompt: ""
  }), [C, z] = _.useState(sc), E = _.useRef(null), O = _.useRef(null), k = _.useCallback(() => {
    O.current !== null && (clearInterval(O.current), O.current = null);
  }, []), B = _.useCallback(() => {
    k(), O.current = setInterval(() => {
      z((Z) => {
        if (Z.phase !== "running" || Z.lastFrameAt === null) return Z;
        const D = Date.now() - Z.lastFrameAt;
        return D >= g5 ? (E.current?.(), E.current = null, k(), $4(Z)) : D >= p5 ? bb(Z) : Z;
      });
    }, y5);
  }, [k]), V = _.useCallback(
    (Z) => {
      const D = Z.params.requires_last_image === !0;
      c(Z.id), p(!0), y((H) => {
        const P = {
          ...wb(l),
          mode: H.mode ?? "image_to_video",
          ref_image_path: H.ref_image_path,
          prompts: H.prompts,
          last_image_path: D ? H.last_image_path ?? null : null
        };
        return Sb(P, Z);
      }), D || S(null);
    },
    [l]
  ), A = _.useCallback((Z) => {
    y((D) => {
      if (Z === "text_to_video") return { ...D, mode: Z };
      const { seed: H, ...P } = D;
      return { ...P, mode: Z };
    });
  }, []), I = _.useCallback(
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
      frames_per_clip: Fw(H.frames_per_clip ?? 81)
    });
  }, []), le = _.useCallback((Z) => {
    N((D) => ({ ...D, ...Z }));
  }, []), j = _.useCallback((Z) => {
    s(Z);
  }, []), Y = _.useCallback(() => {
    E.current?.(), E.current = null, k(), z(sc());
  }, [k]), M = _.useCallback(async () => {
    E.current?.();
    const { jobId: Z } = await d5({ presetId: u, params: m });
    z(B4(Z, R.enabled)), E.current = m5(
      Z,
      (D) => {
        z((H) => U4(H, D));
      },
      () => {
        z((D) => bb(D));
      }
    ), B();
  }, [m, u, R.enabled, B]), L = _.useCallback(async () => {
    const Z = C.jobId;
    if (!Z) return;
    const { status: D } = await h5(Z);
    D !== "cancelling" && (E.current?.(), E.current = null, k(), z((H) => V4(H)));
  }, [C.jobId, k]), F = _.useCallback(
    async (Z) => {
      E.current?.(), E.current = null, k();
      try {
        const D = await f5(Z.id);
        z(xb(D));
      } catch {
        z(xb(Z));
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
      qwenEdit: R,
      render: C,
      applyPresetById: V,
      setMode: A,
      updateParam: I,
      setPrompts: te,
      setRefImage: $,
      setLastImage: K,
      setQwenEdit: le,
      setSettings: j,
      startRenderJob: M,
      cancelRenderJob: L,
      resetRender: Y,
      showJobResult: F
    }),
    [
      l,
      u,
      d,
      m,
      g,
      x,
      R,
      C,
      V,
      A,
      I,
      te,
      $,
      K,
      le,
      j,
      M,
      L,
      Y,
      F
    ]
  );
  return /* @__PURE__ */ b.jsx(Qw.Provider, { value: G, children: r });
}
function mn() {
  const e = _.useContext(Qw);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
function b5(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
const x5 = (e) => {
  switch (e) {
    case "success":
      return E5;
    case "info":
      return N5;
    case "warning":
      return _5;
    case "error":
      return C5;
    default:
      return null;
  }
}, w5 = Array(12).fill(0), S5 = ({ visible: e, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, w5.map((r, l) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), E5 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), _5 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), N5 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), C5 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), R5 = /* @__PURE__ */ ye.createElement("svg", {
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
})), M5 = () => {
  const [e, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), e;
};
let Ih = 1;
class T5 {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : Ih++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
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
        else if (A5(m) && !m.ok) {
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
      const l = r?.id || Ih++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Dn = new T5(), D5 = (e, a) => {
  const r = a?.id || Ih++;
  return Dn.addToast({
    title: e,
    ...a,
    id: r
  }), r;
}, A5 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", z5 = D5, O5 = () => Dn.toasts, j5 = () => Dn.getActiveToasts(), br = Object.assign(z5, {
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
  getHistory: O5,
  getToasts: j5
});
b5("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Au(e) {
  return e.label !== void 0;
}
const L5 = 3, H5 = "24px", k5 = "16px", _b = 4e3, B5 = 356, U5 = 14, V5 = 45, q5 = 200;
function Aa(...e) {
  return e.filter(Boolean).join(" ");
}
function $5(e) {
  const [a, r] = e.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const I5 = (e) => {
  var a, r, l, s, u, c, d, p, m;
  const { invert: y, toast: g, unstyled: v, interacting: x, setHeights: S, visibleToasts: R, heights: N, index: C, toasts: z, expanded: E, removeToast: O, defaultRichColors: k, closeButton: B, style: V, cancelButtonStyle: A, actionButtonStyle: I, className: te = "", descriptionClassName: $ = "", duration: K, position: le, gap: j, expandByDefault: Y, classNames: M, icons: L, closeButtonAriaLabel: F = "Close toast" } = e, [G, Z] = ye.useState(null), [D, H] = ye.useState(null), [P, ne] = ye.useState(!1), [se, he] = ye.useState(!1), [me, ee] = ye.useState(!1), [ge, ze] = ye.useState(!1), [Re, Se] = ye.useState(!1), [xe, Ce] = ye.useState(0), [$e, ft] = ye.useState(0), Me = ye.useRef(g.duration || K || _b), Xe = ye.useRef(null), ke = ye.useRef(null), Ie = C === 0, St = C + 1 <= R, Je = g.type, Ze = g.dismissible !== !1, Qe = g.className || "", gt = g.descriptionClassName || "", yt = ye.useMemo(() => N.findIndex((He) => He.toastId === g.id) || 0, [
    N,
    g.id
  ]), Yt = ye.useMemo(() => {
    var He;
    return (He = g.closeButton) != null ? He : B;
  }, [
    g.closeButton,
    B
  ]), Lt = ye.useMemo(() => g.duration || K || _b, [
    g.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), Xn = ye.useRef(0), xn = ye.useRef(null), [tn, Pt] = le.split("-"), Ot = ye.useMemo(() => N.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    N,
    yt
  ]), Ut = M5(), mi = g.invert || y, _a = Je === "loading";
  ot.current = ye.useMemo(() => yt * j + Ot, [
    yt,
    Ot
  ]), ye.useEffect(() => {
    Me.current = Lt;
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
    }, q5);
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
        Me.current = Me.current - Vt;
      }
      Xn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Me.current !== 1 / 0 && (mt.current = (/* @__PURE__ */ new Date()).getTime(), He = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), wn();
      }, Me.current));
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
        className: Aa(M?.loader, g == null || (vt = g.classNames) == null ? void 0 : vt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ye.createElement(S5, {
      className: Aa(M?.loader, g == null || (He = g.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const zn = g.icon || L?.[Je] || x5(Je);
  var Fn, un;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: ke,
    className: Aa(te, Qe, M?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, M?.default, M?.[Je], g == null || (r = g.classNames) == null ? void 0 : r[Je]),
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
    "data-index": C,
    "data-front": Ie,
    "data-swiping": me,
    "data-dismissible": Ze,
    "data-type": Je,
    "data-invert": mi,
    "data-swipe-out": ge,
    "data-swipe-direction": D,
    "data-expanded": !!(E || Y && P),
    "data-testid": g.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": z.length - C,
      "--offset": `${se ? xe : ot.current}px`,
      "--initial-height": Y ? "auto" : `${$e}px`,
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
      const Vt = Number(((He = ke.current) == null ? void 0 : He.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), pn = Number(((vt = ke.current) == null ? void 0 : vt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((Ht = Xe.current) == null ? void 0 : Ht.getTime()), Kt = G === "x" ? Vt : pn, ca = Math.abs(Kt) / pt;
      if (Math.abs(Kt) >= V5 || ca > 0.11) {
        Ce(ot.current), g.onDismiss == null || g.onDismiss.call(g, g), H(G === "x" ? Vt > 0 ? "right" : "left" : pn > 0 ? "down" : "up"), wn(), ze(!0);
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
      const Wt = (ca = e.swipeDirections) != null ? ca : $5(le);
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
  }, Yt && !g.jsx && Je !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": F,
    "data-disabled": _a,
    "data-close-button": !0,
    onClick: _a || !Ze ? () => {
    } : () => {
      wn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: Aa(M?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (un = L?.close) != null ? un : R5) : null, (Je || g.icon || g.promise) && g.icon !== null && (L?.[Je] !== null || g.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Aa(M?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || ua() : null, g.type !== "loading" ? zn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Aa(M?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Aa(M?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Aa($, gt, M?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ ye.isValidElement(g.cancel) ? g.cancel : g.cancel && Au(g.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (He) => {
      Au(g.cancel) && Ze && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, He), wn());
    },
    className: Aa(M?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(g.action) ? g.action : g.action && Au(g.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || I,
    onClick: (He) => {
      Au(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, He), !He.defaultPrevented && wn());
    },
    className: Aa(M?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function Nb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function Y5(e, a) {
  const r = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? k5 : H5;
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
const G5 = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: y, mobileOffset: g, theme: v = "light", richColors: x, duration: S, style: R, visibleToasts: N = L5, toastOptions: C, dir: z = Nb(), gap: E = U5, icons: O, containerAriaLabel: k = "Notifications" } = a, [B, V] = ye.useState([]), A = ye.useMemo(() => l ? B.filter((P) => P.toasterId === l) : B.filter((P) => !P.toasterId), [
    B,
    l
  ]), I = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((P) => P.position).map((P) => P.position)))), [
    A,
    u
  ]), [te, $] = ye.useState([]), [K, le] = ye.useState(!1), [j, Y] = ye.useState(!1), [M, L] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = ye.useRef(null), G = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), Z = ye.useRef(null), D = ye.useRef(!1), H = ye.useCallback((P) => {
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
      tA.flushSync(() => {
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
  }, I.map((P, ne) => {
    var se;
    const [he, me] = P.split("-");
    return A.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: P,
      dir: z === "auto" ? Nb() : z,
      tabIndex: -1,
      ref: F,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": M,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = te[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${B5}px`,
        "--gap": `${E}px`,
        ...R,
        ...Y5(y, g)
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
        ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || Y(!0);
      },
      onPointerUp: () => Y(!1)
    }, A.filter((ee) => !ee.position && ne === 0 || ee.position === P).map((ee, ge) => {
      var ze, Re;
      return /* @__PURE__ */ ye.createElement(I5, {
        key: ee.id,
        icons: O,
        index: ge,
        toast: ee,
        defaultRichColors: x,
        duration: (ze = C?.duration) != null ? ze : S,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: s,
        visibleToasts: N,
        closeButton: (Re = C?.closeButton) != null ? Re : p,
        interacting: j,
        position: P,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
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
}), Yh = "svi2-pro:trigger-render", Gh = "svi2-pro:render-state";
function X5() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Yh));
}
function F5(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Gh, { detail: e }));
}
function Z5(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Yh, e), () => window.removeEventListener(Yh, e));
}
function Q5(e) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && e(l);
  };
  return window.addEventListener(Gh, a), () => window.removeEventListener(Gh, a);
}
const P5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), K5 = 832 * 480, J5 = 0.85;
function Um(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && P5.has(e);
}
function Lc(e, a) {
  return Um(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function Cb(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function W5(e, a) {
  const r = [];
  (e.mode ?? "image_to_video") !== "text_to_video" && (!a.hasRefImage || !e.ref_image_path) && r.push({
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
  Cb(d, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), Cb(p, 16) || r.push({
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
  }), Um(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Lc(a.presetId, e) && g !== void 0 && g > 1 && r.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < K5 * J5 && r.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function ez(e) {
  return e.some((a) => a.severity === "error");
}
function Pw() {
  const {
    params: e,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = mn(), d = _.useMemo(
    () => W5(e, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, r, l]
  ), p = ez(d), m = s.phase === "running", [y, g] = _.useState(null), v = _.useCallback(async () => {
    if (p) {
      const S = d.find((R) => R.severity === "error");
      S && g({ field: S.field, token: Date.now() }), br.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), br.success("Render started.");
    } catch (S) {
      const R = S instanceof xc ? S.message : "Could not start the render.";
      br.error(R);
    }
  }, [p, d, u]), x = _.useCallback(async () => {
    try {
      await c();
    } catch {
      br.error("Could not cancel the render.");
    }
  }, [c]);
  return _.useEffect(() => Z5(() => void v()), [v]), _.useEffect(() => {
    F5({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: v, cancel: x, focusRequest: y };
}
const tz = 220, nz = 80;
function az(e) {
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
function iz(e, a) {
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
function rz(e) {
  const a = km.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: az(s),
      subtitle: iz(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * tz, y: nz },
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
var lz = "dk8hba0", oz = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, sz = "dk8hba5", uz = "dk8hba6", cz = "dk8hba7", fz = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, dz = "dk8hbac";
function hz({ data: e }) {
  const a = e, r = [lz, oz[a.state]].join(" "), l = [dz, fz[a.state]].join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ b.jsx(Ml, { type: "target", position: Ae.Left }),
    /* @__PURE__ */ b.jsxs("div", { className: sz, children: [
      /* @__PURE__ */ b.jsx("span", { className: uz, children: a.title }),
      /* @__PURE__ */ b.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ b.jsx("span", { className: cz, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ b.jsx(Ml, { type: "source", position: Ae.Right })
  ] });
}
const mz = { pipeline: hz };
var pz = "_1g4g8kk0", gz = "_1g4g8kk1", yz = "_1g4g8kk2", vz = "_1g4g8kk3", bz = "_1g4g8kk4", xz = "_1g4g8kk5";
const wz = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, Sz = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function Ez() {
  const { render: e, params: a, qwenEdit: r } = mn(), { busy: l, blocked: s, submit: u, cancel: c } = Pw(), d = _.useMemo(
    () => rz({ render: e, params: a, qwenEditEnabled: r.enabled }),
    [e, a, r.enabled]
  ), p = km.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ b.jsxs("div", { className: pz, children: [
    /* @__PURE__ */ b.jsx("div", { className: gz, children: /* @__PURE__ */ b.jsx(
      M4,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: mz,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ b.jsx("div", { className: yz, children: /* @__PURE__ */ b.jsxs(
      Oa,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ b.jsx("div", { className: vz, children: p.map((m) => /* @__PURE__ */ b.jsxs("div", { className: bz, children: [
            /* @__PURE__ */ b.jsx("span", { children: Sz[m] }),
            /* @__PURE__ */ b.jsx(In, { tone: wz[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ b.jsx("div", { className: xz, children: l ? /* @__PURE__ */ b.jsx(Ha, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ b.jsx(Ha, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var Rb = rw();
const Kw = 0, Jw = 1, Ww = 2, Mb = 3;
var Tb = Object.prototype.hasOwnProperty;
function Xh(e, a) {
  var r, l;
  if (e === a) return !0;
  if (e && a && (r = e.constructor) === a.constructor) {
    if (r === Date) return e.getTime() === a.getTime();
    if (r === RegExp) return e.toString() === a.toString();
    if (r === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && Xh(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof e == "object") {
      l = 0;
      for (r in e)
        if (Tb.call(e, r) && ++l && !Tb.call(a, r) || !(r in a) || !Xh(e[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const si = /* @__PURE__ */ new WeakMap(), ci = () => {
}, hn = (
  /*#__NOINLINE__*/
  ci()
), Fh = Object, nt = (e) => e === hn, La = (e) => typeof e == "function", Zi = (e, a) => ({
  ...e,
  ...a
}), eS = (e) => La(e.then), mh = {}, zu = {}, Vm = "undefined", us = typeof window != Vm, Zh = typeof document != Vm, _z = us && "Deno" in window, Nz = () => us && typeof window.requestAnimationFrame != Vm, tS = (e, a) => {
  const r = si.get(e);
  return [
    // Getter
    () => !nt(a) && e.get(a) || mh,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = e.get(a);
        a in zu || (zu[a] = s), r[5](a, Zi(s, l), s || mh);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in zu ? zu[a] : !nt(a) && e.get(a) || mh
  ];
};
let Qh = !0;
const Cz = () => Qh, [Ph, Kh] = us && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ci,
  ci
], Rz = () => {
  const e = Zh && document.visibilityState;
  return nt(e) || e !== "hidden";
}, Mz = (e) => (Zh && document.addEventListener("visibilitychange", e), Ph("focus", e), () => {
  Zh && document.removeEventListener("visibilitychange", e), Kh("focus", e);
}), Tz = (e) => {
  const a = () => {
    Qh = !0, e();
  }, r = () => {
    Qh = !1;
  };
  return Ph("online", a), Ph("offline", r), () => {
    Kh("online", a), Kh("offline", r);
  };
}, Dz = {
  isOnline: Cz,
  isVisible: Rz
}, Az = {
  initFocus: Mz,
  initReconnect: Tz
}, Db = !ye.useId, xl = !us || _z, zz = (e) => Nz() ? window.requestAnimationFrame(e) : setTimeout(e, 1), ph = xl ? _.useEffect : _.useLayoutEffect, gh = typeof navigator < "u" && navigator.connection, Ab = !xl && gh && ([
  "slow-2g",
  "2g"
].includes(gh.effectiveType) || gh.saveData), Ou = /* @__PURE__ */ new WeakMap(), Oz = (e) => Fh.prototype.toString.call(e), yh = (e, a) => e === `[object ${a}]`;
let jz = 0;
const Jh = (e) => {
  const a = typeof e, r = Oz(e), l = yh(r, "Date"), s = yh(r, "RegExp"), u = yh(r, "Object");
  let c, d;
  if (Fh(e) === e && !l && !s) {
    if (c = Ou.get(e), c) return c;
    if (c = ++jz + "~", Ou.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += Jh(e[d]) + ",";
      Ou.set(e, c);
    }
    if (u) {
      c = "#";
      const p = Fh.keys(e).sort();
      for (; !nt(d = p.pop()); )
        nt(e[d]) || (c += d + ":" + Jh(e[d]) + ",");
      Ou.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, qm = (e) => {
  if (La(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? Jh(e) : "", [
    e,
    a
  ];
};
let Lz = 0;
const Wh = () => ++Lz;
async function nS(...e) {
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
    for (const R of S)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(R) && v(a.get(R)._k) && x.push(R);
    return Promise.all(x.map(g));
  }
  return g(r);
  async function g(v) {
    const [x] = qm(v);
    if (!x) return;
    const [S, R] = tS(a, x), [N, C, z, E] = si.get(a), O = () => {
      const j = N[x];
      return (La(u.revalidate) ? u.revalidate(S().data, v) : u.revalidate !== !1) && (delete z[x], delete E[x], j && j[0]) ? j[0](Ww).then(() => S().data) : S().data;
    };
    if (e.length < 3)
      return O();
    let k = l, B, V = !1;
    const A = Wh();
    C[x] = [
      A,
      0
    ];
    const I = !nt(p), te = S(), $ = te.data, K = te._c, le = nt(K) ? $ : K;
    if (I && (p = La(p) ? p(le, $) : p, R({
      data: p,
      _c: le
    })), La(k))
      try {
        k = k(le);
      } catch (j) {
        B = j, V = !0;
      }
    if (k && eS(k))
      if (k = await k.catch((j) => {
        B = j, V = !0;
      }), A !== C[x][0]) {
        if (V) throw B;
        return k;
      } else V && I && m(B) && (c = !0, R({
        data: le,
        _c: hn
      }));
    if (c && !V)
      if (La(c)) {
        const j = c(k, le);
        R({
          data: j,
          error: hn,
          _c: hn
        });
      } else
        R({
          data: k,
          error: hn,
          _c: hn
        });
    if (C[x][1] = Wh(), Promise.resolve(O()).then(() => {
      R({
        _c: hn
      });
    }), V) {
      if (y) throw B;
      return;
    }
    return k;
  }
}
const zb = (e, a) => {
  for (const r in e)
    e[r][0] && e[r][0](a);
}, Hz = (e, a) => {
  if (!si.has(e)) {
    const r = Zi(Az, a), l = /* @__PURE__ */ Object.create(null), s = nS.bind(hn, e);
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
      ]), !xl)) {
        const y = r.initFocus(setTimeout.bind(hn, zb.bind(hn, l, Kw))), g = r.initReconnect(setTimeout.bind(hn, zb.bind(hn, l, Jw)));
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
}, kz = (e, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, d, s);
}, Bz = Xh, [aS, Uz] = Hz(/* @__PURE__ */ new Map()), Vz = Zi(
  {
    // events
    onLoadingSlow: ci,
    onSuccess: ci,
    onError: ci,
    onErrorRetry: kz,
    onDiscarded: ci,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Ab ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Ab ? 5e3 : 3e3,
    // providers
    compare: Bz,
    isPaused: () => !1,
    cache: aS,
    mutate: Uz,
    fallback: {}
  },
  // use web preset by default
  Dz
), qz = (e, a) => {
  const r = Zi(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Zi(s, c));
  }
  return r;
}, $z = _.createContext({}), Iz = "$inf$", iS = us && window.__SWR_DEVTOOLS_USE__, Yz = iS ? window.__SWR_DEVTOOLS_USE__ : [], Gz = () => {
  iS && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, Xz = (e) => La(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], Fz = () => {
  const e = _.useContext($z);
  return _.useMemo(() => Zi(Vz, e), [
    e
  ]);
}, Zz = (e) => (a, r, l) => e(a, r && ((...u) => {
  const [c] = qm(a), [, , , d] = si.get(aS);
  if (c.startsWith(Iz))
    return r(...u);
  const p = d[c];
  return nt(p) ? r(...u) : (delete d[c], p);
}), l), Qz = Yz.concat(Zz), Pz = (e) => function(...r) {
  const l = Fz(), [s, u, c] = Xz(r), d = qz(l, c);
  let p = e;
  const { use: m } = d, y = (m || []).concat(Qz);
  for (let g = y.length; g--; )
    p = y[g](p);
  return p(s, u || d.fetcher || null, d);
}, Kz = (e, a, r) => {
  const l = a[e] || (a[e] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
Gz();
const vh = ye.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), bh = {
  dedupe: !0
}, Ob = Promise.resolve(hn), Jz = () => ci, Wz = (e, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: g, keepPreviousData: v, strictServerPrefetchWarning: x } = r, [S, R, N, C] = si.get(l), [z, E] = qm(e), O = _.useRef(!1), k = _.useRef(!1), B = _.useRef(z), V = _.useRef(a), A = _.useRef(r), I = () => A.current, te = () => I().isVisible() && I().isOnline(), [$, K, le, j] = tS(l, z), Y = _.useRef({}).current, M = nt(c) ? nt(r.fallback) ? hn : r.fallback[z] : c, L = (Me, Xe) => {
    for (const ke in Y) {
      const Ie = ke;
      if (Ie === "data") {
        if (!s(Me[Ie], Xe[Ie]) && (!nt(Me[Ie]) || !s(he, Xe[Ie])))
          return !1;
      } else if (Xe[Ie] !== Me[Ie])
        return !1;
    }
    return !0;
  }, F = !O.current, G = _.useMemo(() => {
    const Me = $(), Xe = j(), ke = (Ze) => {
      const Qe = Zi(Ze);
      return delete Qe._k, (() => {
        if (!z || !a || I().isPaused()) return !1;
        if (F && !nt(d)) return d;
        const yt = nt(M) ? Qe.data : M;
        return nt(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Qe
      } : Qe;
    }, Ie = ke(Me), St = Me === Xe ? Ie : ke(Xe);
    let Je = Ie;
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
  ]), Z = Rb.useSyncExternalStore(_.useCallback(
    (Me) => le(z, (Xe, ke) => {
      L(ke, Xe) || Me();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      z
    ]
  ), G[0], G[1]), D = S[z] && S[z].length > 0, H = Z.data, P = nt(H) ? M && eS(M) ? vh(M) : M : H, ne = Z.error, se = _.useRef(P), he = v ? nt(H) ? nt(se.current) ? P : se.current : H : P, me = z && nt(P), ee = _.useRef(null);
  !xl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Rb.useSyncExternalStore(Jz, () => (ee.current = !1, ee), () => (ee.current = !0, ee));
  const ge = ee.current;
  x && ge && !u && me && console.warn(`Missing pre-initiated data for serialized key "${z}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ze = !z || !a || I().isPaused() || D && !nt(ne) ? !1 : F && !nt(d) ? d : u ? nt(P) ? !1 : p : nt(P) || p, Re = F && ze, Se = nt(Z.isValidating) ? Re : Z.isValidating, xe = nt(Z.isLoading) ? Re : Z.isLoading, Ce = _.useCallback(
    async (Me) => {
      const Xe = V.current;
      if (!z || !Xe || k.current || I().isPaused())
        return !1;
      let ke, Ie, St = !0;
      const Je = Me || {}, Ze = !N[z] || !Je.dedupe, Qe = () => Db ? !k.current && z === B.current && O.current : z === B.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(gt);
      }, Yt = () => {
        const mt = N[z];
        mt && mt[1] === Ie && delete N[z];
      }, Lt = {
        isValidating: !0
      };
      nt($().data) && (Lt.isLoading = !0);
      try {
        if (Ze && (K(Lt), r.loadingTimeout && nt($().data) && setTimeout(() => {
          St && Qe() && I().onLoadingSlow(z, r);
        }, r.loadingTimeout), N[z] = [
          Xe(E),
          Wh()
        ]), [ke, Ie] = N[z], ke = await ke, Ze && setTimeout(Yt, r.dedupingInterval), !N[z] || N[z][1] !== Ie)
          return Ze && Qe() && I().onDiscarded(z), !1;
        gt.error = hn;
        const mt = R[z];
        if (!nt(mt) && // case 1
        (Ie <= mt[0] || // case 2
        Ie <= mt[1] || // case 3
        mt[1] === 0))
          return yt(), Ze && Qe() && I().onDiscarded(z), !1;
        const ot = $().data;
        gt.data = s(ot, ke) ? ot : ke, Ze && Qe() && I().onSuccess(ke, z, r);
      } catch (mt) {
        Yt();
        const ot = I(), { shouldRetryOnError: Xn } = ot;
        ot.isPaused() || (gt.error = mt, Ze && Qe() && (ot.onError(mt, z, ot), (Xn === !0 || La(Xn) && Xn(mt)) && (!I().revalidateOnFocus || !I().revalidateOnReconnect || te()) && ot.onErrorRetry(mt, z, ot, (xn) => {
          const tn = S[z];
          tn && tn[0] && tn[0](Mb, xn);
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
    (...Me) => nS(l, B.current, ...Me),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ph(() => {
    V.current = a, A.current = r, nt(H) || (se.current = H);
  }), ph(() => {
    if (!z) return;
    const Me = Ce.bind(hn, bh);
    let Xe = 0;
    I().revalidateOnFocus && (Xe = Date.now() + I().focusThrottleInterval);
    const Ie = Kz(z, S, (St, Je = {}) => {
      if (St == Kw) {
        const Ze = Date.now();
        I().revalidateOnFocus && Ze > Xe && te() && (Xe = Ze + I().focusThrottleInterval, Me());
      } else if (St == Jw)
        I().revalidateOnReconnect && te() && Me();
      else {
        if (St == Ww)
          return Ce();
        if (St == Mb)
          return Ce(Je);
      }
    });
    return k.current = !1, B.current = z, O.current = !0, K({
      _k: E
    }), ze && (N[z] || (nt(P) || xl ? Me() : zz(Me))), () => {
      k.current = !0, Ie();
    };
  }, [
    z
  ]), ph(() => {
    let Me;
    function Xe() {
      const Ie = La(m) ? m($().data) : m;
      Ie && Me !== -1 && (Me = setTimeout(ke, Ie));
    }
    function ke() {
      !$().error && (y || I().isVisible()) && (g || I().isOnline()) ? Ce(bh).then(Xe) : Xe();
    }
    return Xe(), () => {
      Me && (clearTimeout(Me), Me = -1);
    };
  }, [
    m,
    y,
    g,
    z
  ]), _.useDebugValue(he), u) {
    if (!Db && xl && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (V.current = a, A.current = r, k.current = !1);
    const Me = C[z], Xe = !nt(Me) && me ? $e(Me) : Ob;
    if (vh(Xe), !nt(ne) && me)
      throw ne;
    const ke = me ? Ce(bh) : Ob;
    !nt(he) && me && (ke.status = "fulfilled", ke.value = !0), vh(ke);
  }
  return {
    mutate: $e,
    get data() {
      return Y.data = !0, he;
    },
    get error() {
      return Y.error = !0, ne;
    },
    get isValidating() {
      return Y.isValidating = !0, Se;
    },
    get isLoading() {
      return Y.isLoading = !0, xe;
    }
  };
}, em = Pz(Wz);
var eO = "_1xasopc0", tO = "_1xasopc1", nO = "_1xasopc2", aO = "_1xasopc3", iO = "_1xasopc4", rO = "_1xasopc5", lO = "_1xasopc6", oO = "_1xasopc7", sO = "_1xasopc8";
function uO(e, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function cO(e, a, r) {
  for (const l of e) {
    if (a && !uO(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function jb({
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
  const y = _.useRef(null), g = _.useId(), v = _.useId(), [x, S] = _.useState(!1), [R, N] = _.useState(null), [C, z] = _.useState([]), E = _.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), le = r ? K : K.slice(0, 1), j = cO(le, e, a);
      if (j) {
        N(j);
        return;
      }
      N(null), z(le), m(le);
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
  }, []), I = [u ? v : null, R ? g : null].filter(Boolean).join(" "), te = [
    eO,
    x ? tO : "",
    l ? nO : "",
    R !== null ? aO : "",
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
        "aria-describedby": I || void 0,
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
              className: iO,
              accept: e,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => E($.target.files)
            }
          ),
          /* @__PURE__ */ b.jsx("span", { className: rO, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ b.jsx("span", { id: v, className: lO, children: u }),
          p && C.length > 0 && /* @__PURE__ */ b.jsx("div", { className: sO, children: p(C) })
        ]
      }
    ),
    R && /* @__PURE__ */ b.jsx("div", { id: g, role: "alert", className: oO, children: R })
  ] });
}
function Lb(e) {
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
async function fO(e) {
  const a = new FormData();
  a.append("file", e);
  const r = await fetch(`${wc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new xc(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function Hb(e) {
  const [a, r] = _.useState(null), [l, s] = _.useState(!1), [u, c] = _.useState(null), d = _.useCallback(
    async (p) => {
      if (r(p), c(null), !p) {
        e(null, null);
        return;
      }
      s(!0);
      try {
        const { path: m } = await fO(p);
        e(p.name, m);
      } catch (m) {
        const y = m instanceof xc ? m.message : "Upload failed. Try again.";
        c(y), e(null, null), br.error(y);
      } finally {
        s(!1);
      }
    },
    [e]
  );
  return { file: a, uploading: l, uploadError: u, pick: d };
}
var dO = "cyswg40", kb = "cyswg41", Bb = "cyswg42", Ub = "cyswg43", Vb = "cyswg44", qb = "cyswg45", ju = "cyswg46";
const $b = 32 * 1024 * 1024;
function hO({
  refImageRequired: e,
  lastImageRequired: a,
  refError: r,
  lastError: l
}) {
  const { setRefImage: s, setLastImage: u } = mn(), c = _.useCallback(
    (v, x) => s(v, x ?? ""),
    [s]
  ), d = _.useCallback(
    (v, x) => u(v, x),
    [u]
  ), p = Hb(c), m = Hb(d), y = Lb(p.file), g = Lb(m.file);
  return /* @__PURE__ */ b.jsxs("div", { className: dO, children: [
    /* @__PURE__ */ b.jsxs("div", { className: kb, children: [
      /* @__PURE__ */ b.jsxs("span", { className: Bb, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ b.jsx(In, { tone: "accent", children: "required" }) : /* @__PURE__ */ b.jsx(In, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ b.jsx(
        jb,
        {
          accept: "image/*",
          maxSizeBytes: $b,
          ariaLabel: "reference image upload",
          label: p.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (v) => void p.pick(v[0] ?? null),
          renderPreview: () => y ? /* @__PURE__ */ b.jsx("img", { className: Ub, src: y, alt: "reference preview" }) : null
        }
      ),
      p.uploading && /* @__PURE__ */ b.jsx("span", { className: qb, children: "Uploading…" }),
      !p.uploading && p.file && /* @__PURE__ */ b.jsx("span", { className: Vb, children: p.file.name }),
      p.uploadError && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ju, children: p.uploadError }),
      r && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ju, children: r })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: kb, children: [
      /* @__PURE__ */ b.jsxs("span", { className: Bb, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ b.jsx(In, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ b.jsx(In, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ b.jsx(
        jb,
        {
          accept: "image/*",
          maxSizeBytes: $b,
          ariaLabel: "last image upload",
          label: m.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (v) => void m.pick(v[0] ?? null),
          renderPreview: () => g ? /* @__PURE__ */ b.jsx("img", { className: Ub, src: g, alt: "last preview" }) : null
        }
      ),
      m.uploading && /* @__PURE__ */ b.jsx("span", { className: qb, children: "Uploading…" }),
      !m.uploading && m.file && /* @__PURE__ */ b.jsx("span", { className: Vb, children: m.file.name }),
      m.uploadError && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ju, children: m.uploadError }),
      l && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ju, children: l })
    ] })
  ] });
}
const mO = /wan[\s._-]?2[._]2/i, pO = /i2v/i, gO = /high/i, yO = /low/i, vO = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function bO(e) {
  const a = `${e.family_id} ${e.filename}`;
  return vO.has(e.format) && e.install_path !== null && mO.test(a) && pO.test(a);
}
function xO(e) {
  const a = /* @__PURE__ */ new Map();
  for (const l of e) {
    if (!bO(l)) continue;
    const s = a.get(l.family_id) ?? [];
    a.set(l.family_id, [...s, l]);
  }
  const r = [];
  for (const [l, s] of a) {
    const u = s.find((d) => gO.test(d.filename)), c = s.find((d) => yO.test(d.filename) && d !== u);
    !u?.install_path || !c?.install_path || r.push({
      familyId: l,
      label: l.replace(/^huggingface:/, ""),
      ditHighPath: u.install_path,
      ditLowPath: c.install_path
    });
  }
  return r.sort((l, s) => l.label.localeCompare(s.label));
}
const wO = "/api/v1/model-store/installed";
async function SO() {
  const e = await fetch(wO, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var Al = "_1czy96m0", zl = "_1czy96m1", Hc = "_1czy96m2", $m = "_1czy96m3", Im = "_1czy96m4", rS = "_1czy96m5", lS = "_1czy96m6", oS = "_1czy96m7", sS = "_1czy96m8", uS = "_1czy96m9", EO = "_1czy96ma", Ib = "_1czy96mb", Yb = "_1czy96mc", Gb = "_1czy96md", Xb = "_1czy96me", Fb = "_1czy96mf", Zb = "_1czy96mg", Qb = "_1czy96mh", _O = "_1czy96mi", NO = "_1czy96mk _1czy96mj", CO = "_1czy96ml _1czy96mj", RO = "_1czy96mm", MO = "_1czy96mn", TO = "_1czy96mo", DO = "_1czy96mp", AO = "_1czy96mq", cS = "_1czy96mr", zO = "_1czy96ms", Pb = "_1czy96mt", OO = "_1czy96mu", jO = "_1czy96mv", LO = "_1czy96mw", HO = "_1czy96mx", kO = "_1czy96my", BO = "_1czy96mz", UO = "_1czy96m10", VO = "_1czy96m11", qO = "_1czy96m12", xh = "_1czy96m13", $O = "_1czy96m14", IO = "_1czy96m15", YO = "_1czy96m16", uc = "_1czy96m17";
const Kb = "__bundled__";
function GO() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = mn(), s = em("svi2/installed-models", SO), u = _.useMemo(
    () => xO(s.data?.installed ?? []),
    [s.data]
  ), c = u.find((m) => m.ditHighPath === e.dit_high_path)?.familyId ?? Kb, d = _.useCallback(
    (m) => {
      const y = u.find((v) => v.familyId === m), g = y ? {
        ...a,
        baseModelFamilyId: y.familyId,
        ditHighPath: y.ditHighPath,
        ditLowPath: y.ditLowPath
      } : { ...a, baseModelFamilyId: "", ditHighPath: "", ditLowPath: "" };
      r("dit_high_path", y ? y.ditHighPath : void 0), r("dit_low_path", y ? y.ditLowPath : void 0), l(g), W1(g).catch(() => {
      });
    },
    [u, a, r, l]
  ), p = s.error !== void 0;
  return /* @__PURE__ */ b.jsxs("div", { className: Al, children: [
    /* @__PURE__ */ b.jsx("label", { className: zl, htmlFor: "svi2-base-model", children: "Base model (Wan2.2-I2V)" }),
    /* @__PURE__ */ b.jsxs("div", { className: $O, children: [
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          id: "svi2-base-model",
          className: IO,
          value: c,
          onChange: (m) => d(m.target.value),
          children: [
            /* @__PURE__ */ b.jsx("option", { value: Kb, children: lC }),
            u.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.familyId, children: m.label }, m.familyId))
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: YO, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
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
    p && /* @__PURE__ */ b.jsx("span", { className: uc, children: "Model Foundry list unavailable — using the bundled base model." }),
    !p && u.length === 0 && /* @__PURE__ */ b.jsx("span", { className: uc, children: "No substitutable Wan2.2-I2V high/low pairs installed via Model Foundry yet." })
  ] });
}
const kc = "custom", XO = [
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
function Ym(e) {
  const a = new Map(e.map((l) => [l.id, l])), r = [];
  for (const l of XO) {
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
function Gm(e, a) {
  const r = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return r ? r.id : kc;
}
var FO = "_14qe5430", ZO = "_14qe5431", QO = "_14qe5432", PO = "_14qe5433", KO = "_14qe5434", JO = "_14qe5435", WO = "_14qe5436", ej = "_14qe5437", tj = "_14qe5438", nj = "_14qe543a _14qe5439", aj = "_14qe543b _14qe5439", ij = "_14qe543c _14qe5439";
const rj = {
  ok: ZO,
  neutral: QO,
  warn: PO
}, lj = {
  ok: JO,
  neutral: WO,
  warn: ej
}, oj = {
  ok: nj,
  neutral: aj,
  warn: ij
};
function sj(e, a) {
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
function uj({ tone: e }) {
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
function cj({
  presets: e,
  warningText: a
}) {
  const { params: r } = mn(), l = _.useMemo(() => Ym(e), [e]);
  if (l.length === 0) return null;
  const s = Gm(r, l), u = s === kc ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = sj(u, a);
  return /* @__PURE__ */ b.jsxs(
    "output",
    {
      className: [FO, rj[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ b.jsx("span", { className: [KO, lj[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ b.jsx(uj, { tone: c.tone }) }),
        /* @__PURE__ */ b.jsx("span", { className: tj, children: c.text }),
        /* @__PURE__ */ b.jsx("span", { className: oj[c.tone], children: c.tag })
      ]
    }
  );
}
var fj = "_5d10lv0";
const Do = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], dj = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.", hj = /* @__PURE__ */ new Set(["ArrowRight", "ArrowDown"]), mj = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowUp"]);
function pj(e) {
  return [Im, e ? rS : ""].filter(Boolean).join(" ");
}
function gj({ value: e, onChange: a }) {
  const r = _.useId(), l = (s) => {
    const u = hj.has(s.key), c = mj.has(s.key);
    if (!u && !c) return;
    s.preventDefault();
    const d = Do.findIndex((y) => y.value === e), m = Do[(d + (u ? 1 : -1) + Do.length) % Do.length];
    m && m.value !== e && a(m.value);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: Al, children: [
    /* @__PURE__ */ b.jsx("span", { className: zl, id: r, children: "Mode" }),
    /* @__PURE__ */ b.jsx("div", { className: Hc, children: /* @__PURE__ */ b.jsx(
      "div",
      {
        className: $m,
        role: "radiogroup",
        "aria-labelledby": r,
        onKeyDown: l,
        children: Do.map((s) => {
          const u = e === s.value;
          return /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": u,
              tabIndex: u ? 0 : -1,
              className: pj(u),
              onClick: () => a(s.value),
              children: s.label
            },
            s.value
          );
        })
      }
    ) }),
    e === "text_to_video" && /* @__PURE__ */ b.jsx("p", { className: fj, "aria-live": "polite", children: dj })
  ] });
}
var yj = "dck790", vj = "dck791", bj = "dck792";
function cc({ title: e, detail: a, action: r, className: l }) {
  const s = [yj, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: s, children: [
    /* @__PURE__ */ b.jsx("span", { className: vj, children: e }),
    a && /* @__PURE__ */ b.jsx("span", { className: bj, children: a }),
    r
  ] });
}
var xj = "_1880igs0", wj = "_1880igs1", Sj = "_1880igs2", Ej = "_1880igs3", _j = "_1880igs4", Nj = "_1880igs5", Cj = "_1880igs6";
const Rj = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function Mj({ jobs: e, onOpen: a }) {
  return e.length === 0 ? /* @__PURE__ */ b.jsx(
    cc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ b.jsx("div", { className: xj, children: e.map((r) => /* @__PURE__ */ b.jsxs("button", { type: "button", className: wj, onClick: () => a(r), children: [
    /* @__PURE__ */ b.jsxs("span", { className: Sj, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ej, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ b.jsx("span", { className: _j, children: Tj(r) })
    ] }),
    /* @__PURE__ */ b.jsxs("span", { className: Nj, children: [
      /* @__PURE__ */ b.jsx("time", { className: Cj, dateTime: r.createdAt, title: Dj(r.createdAt), children: Aj(r.createdAt) }),
      /* @__PURE__ */ b.jsx(In, { tone: Rj[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function Tj(e) {
  const a = e.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function Dj(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function Aj(e) {
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
function zj() {
  const { presetId: e, params: a } = mn();
  return Lc(e, a) ? /* @__PURE__ */ b.jsx(jj, {}) : /* @__PURE__ */ b.jsx(Oj, {});
}
function fS(e) {
  return [Im, e ? rS : ""].filter(Boolean).join(" ");
}
function Oj() {
  const { params: e, updateParam: a } = mn(), r = Dl(e), l = t5(e.num_clips ?? 1, r), [s, u] = _.useState(
    () => Number(Yw(e.num_clips ?? 1, r).toFixed(1))
  ), c = (d) => {
    a("num_clips", Gw(d, r));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: Al, children: [
    /* @__PURE__ */ b.jsx("span", { className: zl, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ b.jsxs("div", { className: Hc, children: [
      /* @__PURE__ */ b.jsx("div", { className: $m, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: $w.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: fS(p),
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
      /* @__PURE__ */ b.jsxs("div", { className: lS, children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: oS,
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
        /* @__PURE__ */ b.jsx("span", { className: sS, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("output", { className: uS, "aria-live": "polite", children: n5(e) })
  ] });
}
function jj() {
  const { params: e, updateParam: a } = mn(), r = Dl(e), l = W4(r.fps), [s, u] = _.useState(() => Number(Zw(e).toFixed(1))), c = J4.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", Eb(m, r.fps));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: Al, children: [
    /* @__PURE__ */ b.jsx("span", { className: zl, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ b.jsxs("div", { className: Hc, children: [
      /* @__PURE__ */ b.jsx("div", { className: $m, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = Eb(p, r.fps) === r.framesPerClip;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: fS(m),
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
      }) : /* @__PURE__ */ b.jsxs("span", { className: Im, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ b.jsxs("div", { className: lS, children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: oS,
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
        /* @__PURE__ */ b.jsx("span", { className: sS, children: "sec" })
      ] }),
      /* @__PURE__ */ b.jsxs("span", { className: uc, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        r.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("output", { className: uS, "aria-live": "polite", children: e5(e) })
  ] });
}
var Lj = "_17owg2e0", Hj = "_17owg2e1", kj = "_17owg2e2", Lu = "_17owg2e3", Hu = "_17owg2e4", Bj = "_17owg2e5", Uj = "_17owg2e6", Vj = "_17owg2e7", qj = "_17owg2e8";
function wh() {
  return /* @__PURE__ */ b.jsx("span", { className: Bj, "aria-hidden": "true" });
}
function $j({ presets: e }) {
  const { presetId: a, params: r } = mn(), l = _.useMemo(() => Ym(e), [e]), s = Dl(r), u = Lc(a, r), c = u ? 1 : r.num_clips ?? 1, d = u ? s.framesPerClip : Iw(c, s), p = s.fps > 0 ? d / s.fps : 0, m = r.interpolate_fps ?? 0, y = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, v = typeof r.upscale_factor == "number" ? r.upscale_factor : 0, x = v > 0 ? v : 1, S = (r.width ?? 0) * x, R = (r.height ?? 0) * x, N = Gm(r, l), C = N === kc || (l.find((E) => E.id === N)?.stepsDown ?? 0) >= 2, z = [Vj, C ? qj : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: Lj, children: [
    /* @__PURE__ */ b.jsx("span", { className: Hj, children: "Output" }),
    /* @__PURE__ */ b.jsxs("div", { className: kj, children: [
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: Lu, children: g }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Hu, children: "frames" })
      ] }),
      /* @__PURE__ */ b.jsx(wh, {}),
      /* @__PURE__ */ b.jsxs("span", { className: Lu, children: [
        S,
        "×",
        R
      ] }),
      /* @__PURE__ */ b.jsx(wh, {}),
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: Lu, children: y }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Hu, children: "fps" })
      ] }),
      /* @__PURE__ */ b.jsx(wh, {}),
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: Hu, children: "~" }),
        /* @__PURE__ */ b.jsx("span", { className: Lu, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Hu, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("span", { className: Uj, children: [
      /* @__PURE__ */ b.jsx("span", { className: z, "aria-hidden": "true" }),
      C ? "off-distribution" : "ready"
    ] })
  ] });
}
var Ij = "dgx4n20", Yj = "dgx4n21", Gj = "dgx4n22", Xj = "dgx4n23", Fj = "dgx4n24", Zj = "dgx4n25", Qj = "dgx4n26", Pj = "dgx4n27", Kj = "dgx4n28", Jj = "dgx4n29", Wj = "dgx4n2a", e6 = "dgx4n2b", Jb = "dgx4n2c", t6 = "dgx4n2d", n6 = "dgx4n2e";
function a6(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function i6({
  presets: e,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = _.useState(!1), u = _.useMemo(() => u5(e), [e]), c = _.useMemo(() => {
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
      cc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((v) => v.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ b.jsxs("div", { className: Wj, children: [
    /* @__PURE__ */ b.jsx("div", { className: Ij, role: "radiogroup", "aria-label": "Render presets", children: c.map((v, x) => {
      const S = o5(v), R = v.id === a, N = v.id === Ko, C = [
        Yj,
        v.legacy ? "" : Gj,
        N ? Xj : "",
        R ? Fj : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ b.jsxs(
        "button",
        {
          ref: (z) => {
            d.current[x] = z;
          },
          type: "button",
          role: "radio",
          "aria-checked": R,
          tabIndex: x === y ? 0 : -1,
          title: v.description,
          className: C,
          onClick: () => r(v),
          onKeyDown: (z) => m(z, x),
          children: [
            /* @__PURE__ */ b.jsxs("div", { className: Qj, children: [
              /* @__PURE__ */ b.jsx("span", { className: Pj, children: v.label }),
              N && /* @__PURE__ */ b.jsx(In, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ b.jsx("span", { className: Zj, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
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
            /* @__PURE__ */ b.jsx("span", { className: Kj, children: a6(v.description) }),
            /* @__PURE__ */ b.jsxs("div", { className: Jj, children: [
              /* @__PURE__ */ b.jsx(In, { tone: "neutral", children: S.resolution }),
              /* @__PURE__ */ b.jsx(In, { tone: "neutral", children: S.duration }),
              /* @__PURE__ */ b.jsx(In, { tone: S.isLowVram ? "success" : "neutral", children: S.vram }),
              S.isOffDistribution && /* @__PURE__ */ b.jsx(In, { tone: "warning", children: "off-distribution" }),
              S.requiresLastImage && /* @__PURE__ */ b.jsx(In, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        v.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ b.jsxs("div", { className: e6, children: [
      /* @__PURE__ */ b.jsx("span", { className: Jb, "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: t6,
          "aria-expanded": l,
          onClick: () => s((v) => !v),
          children: [
            /* @__PURE__ */ b.jsx("span", { className: n6, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Jb, "aria-hidden": "true" })
    ] })
  ] });
}
var r6 = "_1ntn2zv0", l6 = "_1ntn2zv1", o6 = "_1ntn2zv2", s6 = "_1ntn2zv3", u6 = "_1ntn2zv4", c6 = "_1ntn2zv5", Wb = "_1ntn2zv6", f6 = "_1ntn2zv7", d6 = "_1ntn2zv8", h6 = "_1ntn2zv9", m6 = "_1ntn2zva";
function p6({ error: e, textareaId: a }) {
  const { params: r, setPrompts: l } = mn(), [s, u] = _.useState(!1), c = r.prompts ?? [""], d = _.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), p = _.useMemo(
    () => c.slice(d).filter((v) => v.trim().length > 0).length,
    [c, d]
  ), m = (v) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = v, l(x);
  }, y = (v, x) => {
    const S = Math.max(d, c.length, v + 1), R = Array.from({ length: S }, (N, C) => c[C] ?? "");
    R[v] = x, l(R);
  }, g = (v) => {
    if (u(v), v) {
      const x = c[0] ?? "", S = Math.max(d, c.length);
      l(Array.from({ length: S }, (R, N) => c[N] ?? x));
    }
  };
  return /* @__PURE__ */ b.jsxs("div", { className: r6, children: [
    /* @__PURE__ */ b.jsx("div", { className: l6, children: /* @__PURE__ */ b.jsxs("span", { className: o6, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: s6,
          onClick: () => g(!s),
          children: /* @__PURE__ */ b.jsx("span", { className: u6, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (v, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ b.jsxs("div", { className: f6, children: [
        /* @__PURE__ */ b.jsxs("span", { className: d6, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ b.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: Wb,
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
        className: Wb,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (v) => m(v.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ b.jsxs("output", { className: c6, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ b.jsx("p", { className: h6, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ b.jsx("span", { role: "alert", className: m6, children: e })
  ] });
}
var g6 = "_1itrxk30", y6 = "_1itrxk31", v6 = "_1itrxk32", b6 = "_1itrxk33", x6 = "_1itrxk34", w6 = "_1itrxk35", S6 = "_1itrxk36", E6 = "_1itrxk37";
function _6() {
  const { qwenEdit: e, setQwenEdit: a } = mn();
  return /* @__PURE__ */ b.jsxs("div", { className: g6, children: [
    /* @__PURE__ */ b.jsxs("div", { className: y6, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: S6,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ b.jsx("span", { className: E6, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ b.jsxs("span", { className: v6, children: [
        /* @__PURE__ */ b.jsx("span", { className: b6, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ b.jsx("span", { className: x6, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: w6,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var N6 = "ob7g5b0", C6 = "ob7g5b1", R6 = "ob7g5b3", M6 = "ob7g5b4", T6 = "ob7g5b5", D6 = "ob7g5b6", A6 = "ob7g5b7", z6 = "ob7g5b8", O6 = "ob7g5b9", j6 = "ob7g5ba";
function L6({
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
  const [x, S] = _.useState("loading"), [R, N] = _.useState(null), C = _.useCallback(() => {
    S("ready"), g?.();
  }, [g]), z = _.useCallback(
    (O) => {
      const k = O.target, B = k.error?.message || `media error code ${k.error?.code ?? "?"}`;
      S("error"), N(B), v?.(new Error(B));
    },
    [v]
  ), E = [N6, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ b.jsx("div", { className: E, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ b.jsxs("div", { className: A6, children: [
    /* @__PURE__ */ b.jsx("div", { className: z6, children: "Could not play video" }),
    /* @__PURE__ */ b.jsx("div", { className: O6, children: R ?? "unknown error" }),
    /* @__PURE__ */ b.jsx("a", { className: j6, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ b.jsxs("div", { className: E, children: [
    x === "loading" && /* @__PURE__ */ b.jsx("div", { className: R6, "aria-hidden": "true", children: /* @__PURE__ */ b.jsx("div", { className: M6 }) }),
    r && /* @__PURE__ */ b.jsx("span", { className: T6, children: r }),
    /* @__PURE__ */ b.jsx(
      "video",
      {
        className: C6,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: C,
        onEnded: y,
        onError: z,
        children: /* @__PURE__ */ b.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ b.jsx("div", { className: E, "aria-label": d ?? "no video", children: /* @__PURE__ */ b.jsx("div", { className: D6, children: m ?? "No video to display yet." }) });
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
}, e1 = {
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
function H6(e, a) {
  return e !== null && e1[e] ? e1[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function k6(e) {
  return e ? `${wc}/media?path=${encodeURIComponent(e)}` : null;
}
var ku = "_1ojc56g0", B6 = "_1ojc56g1", U6 = "_1ojc56g2", V6 = "_1ojc56g3", q6 = "_1ojc56g4", $6 = "_1ojc56g5", I6 = "_1ojc56g6", Y6 = "_1ojc56g7", G6 = "_1ojc56g8", Bu = "_1ojc56g9", X6 = "_1ojc56ga", F6 = "_1ojc56gb", Z6 = "_1ojc56gc", Q6 = "_1ojc56gd", P6 = "_1ojc56ge", K6 = "_1ojc56gf", J6 = "_1ojc56gg", W6 = "_1ojc56gh", eL = "_51y2ql0", tL = "_51y2ql1", nL = "_51y2ql2", aL = "_51y2ql3", iL = "_51y2ql4", Sh = "_51y2ql5", rL = "_51y2ql6", lL = "_51y2ql7 _51y2ql6", oL = "_51y2ql8 _51y2ql6", sL = "_51y2ql9", uL = "_51y2qla", cL = "_51y2qlb", fL = "_51y2qlc", dL = "_51y2qld";
const vn = 60, aa = 62, bn = 46, hL = 180, Uo = 75, Qu = 45, mL = [0, 0.25, 0.5, 0.75, 1];
function pL(e) {
  const a = Math.PI * (1 - e), r = Math.cos(a), l = Math.sin(a);
  return {
    x1: vn + r * (bn - 9),
    y1: aa - l * (bn - 9),
    x2: vn + r * (bn - 14),
    y2: aa - l * (bn - 14)
  };
}
function gL(e) {
  const a = Uo - Qu, r = (Uo - e) / a;
  return Math.min(1, Math.max(0.02, r));
}
function yL(e) {
  return e >= 0.55 ? rL : e >= 0.25 ? lL : oL;
}
function vL({ secondsPerStep: e }) {
  const a = e !== null && e > 0, r = a ? gL(e) : 0, l = hL * r, s = a ? e.toFixed(1) : "—";
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: eL,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": Qu,
      "aria-valuemax": Uo,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ b.jsx("span", { className: tL, children: "Speed" }),
        /* @__PURE__ */ b.jsxs("svg", { className: nL, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ b.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ b.jsx(
            "path",
            {
              className: aL,
              d: `M ${vn - bn} ${aa} A ${bn} ${bn} 0 0 1 ${vn + bn} ${aa}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          mL.map((u) => {
            const c = pL(u);
            return /* @__PURE__ */ b.jsx(
              "line",
              {
                className: iL,
                strokeWidth: 1.4,
                x1: c.x1,
                y1: c.y1,
                x2: c.x2,
                y2: c.y2
              },
              u
            );
          }),
          /* @__PURE__ */ b.jsx("text", { className: Sh, x: vn - bn, y: aa + 12, fontSize: 6, textAnchor: "middle", children: Uo }),
          /* @__PURE__ */ b.jsx("text", { className: Sh, x: vn, y: 9, fontSize: 6, textAnchor: "middle", children: (Uo + Qu) / 2 }),
          /* @__PURE__ */ b.jsx("text", { className: Sh, x: vn + bn, y: aa + 12, fontSize: 6, textAnchor: "middle", children: Qu }),
          a && /* @__PURE__ */ b.jsx(
            "path",
            {
              className: yL(r),
              d: `M ${vn - bn} ${aa} A ${bn} ${bn} 0 0 1 ${vn + bn} ${aa}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, r * 100)} 100`
            }
          ),
          /* @__PURE__ */ b.jsx(
            "g",
            {
              className: sL,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${vn}px ${aa}px`
              },
              children: /* @__PURE__ */ b.jsx(
                "line",
                {
                  className: uL,
                  strokeWidth: 2.4,
                  x1: vn,
                  y1: aa,
                  x2: vn - bn + 16,
                  y2: aa
                }
              )
            }
          ),
          /* @__PURE__ */ b.jsx("circle", { className: cL, cx: vn, cy: aa, r: 3.6 }),
          /* @__PURE__ */ b.jsx("text", { className: fL, x: vn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ b.jsx("text", { className: dL, x: vn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] })
      ]
    }
  );
}
function bL({ state: e, onCancel: a, onReset: r }) {
  const [l, s] = _.useState(!1);
  _.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = _.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ b.jsx(
      cc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = H6(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ b.jsxs("div", { className: ku, children: [
      /* @__PURE__ */ b.jsxs("div", { className: K6, role: "alert", children: [
        /* @__PURE__ */ b.jsx("span", { className: J6, children: m.title }),
        /* @__PURE__ */ b.jsx("span", { className: W6, children: m.hint })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: Bu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ b.jsxs("div", { className: ku, children: [
      /* @__PURE__ */ b.jsx(cc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ b.jsx("div", { className: Bu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ b.jsxs("output", { className: ku, children: [
      /* @__PURE__ */ b.jsx(
        L6,
        {
          src: k6(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ b.jsx(EL, { state: e }),
      /* @__PURE__ */ b.jsx("div", { className: Bu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ b.jsxs("div", { className: ku, children: [
    /* @__PURE__ */ b.jsx("output", { className: B6, "aria-live": "polite", children: SL(e) }),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        className: Y6,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ b.jsx(
          "div",
          {
            className: G6,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ b.jsx("output", { className: P6, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ b.jsxs("div", { className: U6, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx(vL, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ b.jsxs("div", { className: V6, children: [
        /* @__PURE__ */ b.jsx(Ao, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ b.jsx(
          Ao,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ b.jsx(
          Ao,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ b.jsx(Ao, { label: "ETA", value: xL(X4(e)) }),
        /* @__PURE__ */ b.jsx(
          Ao,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("div", { className: Bu, children: /* @__PURE__ */ b.jsx(Ha, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function xL(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), r = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return r > 0 ? `${r}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const wL = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading Wan2.2 diffusion experts (~28 GiB)…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function SL(e) {
  if (!e.stage) return "Starting worker…";
  const a = wL[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function Ao({ label: e, value: a }) {
  return /* @__PURE__ */ b.jsxs("div", { className: q6, children: [
    /* @__PURE__ */ b.jsx("span", { className: $6, children: e }),
    /* @__PURE__ */ b.jsx("span", { className: I6, children: a })
  ] });
}
function EL({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && r.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && r.push(["Output", e.outputPath]), r.length === 0 ? null : /* @__PURE__ */ b.jsx("div", { className: X6, children: r.map(([l, s]) => /* @__PURE__ */ b.jsxs("div", { className: F6, children: [
    /* @__PURE__ */ b.jsx("span", { className: Z6, children: l }),
    /* @__PURE__ */ b.jsx("span", { className: Q6, children: s })
  ] }, l)) });
}
const tm = 16, Rr = 128, fc = 1920, _L = 832 * 480, dS = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "3:2", label: "3:2", w: 3, h: 2 },
  { id: "4:3", label: "4:3", w: 4, h: 3 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "3:4", label: "3:4", w: 3, h: 4 },
  { id: "9:16", label: "9:16", w: 9, h: 16 }
];
function hS(e, a, r) {
  return Math.min(r, Math.max(a, e));
}
function Jo(e) {
  if (!Number.isFinite(e)) return Rr;
  const a = Math.round(e / tm) * tm;
  return hS(a, Rr, fc);
}
function t1(e, a) {
  const r = Jo(e);
  return hS(r + a * tm, Rr, fc);
}
function dc(e, a) {
  return { width: Jo(e), height: Jo(a) };
}
function NL(e) {
  return { width: e.height, height: e.width };
}
function mS(e) {
  return e.width * e.height;
}
function pS(e) {
  return e.height === 0 ? 0 : e.width / e.height;
}
function CL(e, a, r) {
  if (e <= 0 || a <= 0 || r <= 0)
    return dc(Rr, Rr);
  const l = e / a, s = Math.sqrt(r * l), u = r / s;
  return dc(s, u);
}
function gS(e) {
  const a = pS(e);
  if (a <= 0) return null;
  let r = null;
  for (const l of dS) {
    const s = Math.abs(a - l.w / l.h);
    s < 0.06 && (r === null || s < r.delta) && (r = { id: l.id, delta: s });
  }
  return r?.id ?? null;
}
function RL(e) {
  return e.width === e.height ? "square" : e.width > e.height ? "landscape" : "portrait";
}
function yS(e, a) {
  return a === 0 ? e : yS(a, e % a);
}
function ML(e) {
  const a = gS(e);
  if (a) return a;
  const r = yS(e.width, e.height) || 1, l = e.width / r, s = e.height / r;
  return l <= 64 && s <= 64 ? `${l}:${s}` : `${pS(e).toFixed(2)}:1`;
}
function TL(e) {
  const a = mS(e);
  return {
    megapixels: (a / 1e6).toFixed(2),
    aspect: ML(e),
    orientation: RL(e),
    budgetPct: Math.round(a / _L * 100)
  };
}
function DL() {
  return /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("title", { children: "swap" }),
    /* @__PURE__ */ b.jsx(
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
function n1({
  id: e,
  label: a,
  value: r,
  draft: l,
  onDraft: s,
  onCommit: u,
  onStep: c
}) {
  return /* @__PURE__ */ b.jsxs("div", { className: AO, children: [
    /* @__PURE__ */ b.jsx("label", { className: cS, htmlFor: e, children: a }),
    /* @__PURE__ */ b.jsxs("div", { className: zO, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Pb,
          "aria-label": `Decrease ${a} by 16`,
          disabled: r <= Rr,
          onClick: () => c(-1),
          children: "−"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          id: e,
          type: "number",
          inputMode: "numeric",
          className: OO,
          "aria-label": a,
          min: Rr,
          max: fc,
          step: 16,
          value: l,
          onChange: (d) => s(d.target.value),
          onBlur: (d) => u(Number(d.target.value)),
          onKeyDown: (d) => {
            d.key === "Enter" && u(Number(d.target.value));
          }
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Pb,
          "aria-label": `Increase ${a} by 16`,
          disabled: r >= fc,
          onClick: () => c(1),
          children: "+"
        }
      )
    ] })
  ] });
}
function AL({
  width: e,
  height: a,
  onChange: r
}) {
  const [l, s] = _.useState(() => String(e)), [u, c] = _.useState(() => String(a));
  _.useEffect(() => {
    s(String(e));
  }, [e]), _.useEffect(() => {
    c(String(a));
  }, [a]);
  const d = { width: e, height: a }, p = TL(d), m = gS(d), y = (N) => {
    const C = Jo(N);
    s(String(C)), C !== e && r({ width: C, height: a });
  }, g = (N) => {
    const C = Jo(N);
    c(String(C)), C !== a && r({ width: e, height: C });
  }, v = (N) => {
    r({ width: t1(e, N), height: a });
  }, x = (N) => {
    r({ width: e, height: t1(a, N) });
  }, S = () => r(NL(d)), R = (N, C) => {
    r(CL(N, C, mS(d)));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: TO, children: [
    /* @__PURE__ */ b.jsxs("div", { className: DO, children: [
      /* @__PURE__ */ b.jsx(
        n1,
        {
          id: "svi2-custom-width",
          label: "Width",
          value: e,
          draft: l,
          onDraft: s,
          onCommit: y,
          onStep: v
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: jO, "aria-hidden": "true", children: "×" }),
      /* @__PURE__ */ b.jsx(
        n1,
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
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: LO,
          onClick: S,
          title: "Reverse the aspect ratio — swap width and height at the same pixel count",
          children: [
            /* @__PURE__ */ b.jsx("span", { className: HO, children: /* @__PURE__ */ b.jsx(DL, {}) }),
            "Swap"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: kO, children: [
      /* @__PURE__ */ b.jsx("span", { className: cS, children: "Aspect ratio · same pixel budget" }),
      /* @__PURE__ */ b.jsx(
        "div",
        {
          className: BO,
          role: "group",
          "aria-label": "Aspect ratio presets",
          children: dS.map((N) => {
            const C = m === N.id, z = [UO, C ? VO : ""].filter(Boolean).join(" ");
            return /* @__PURE__ */ b.jsx(
              "button",
              {
                type: "button",
                className: z,
                "aria-pressed": C,
                onClick: () => R(N.w, N.h),
                children: N.label
              },
              N.id
            );
          })
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("output", { className: qO, "aria-live": "polite", children: [
      dc(e, a).width,
      "×",
      dc(e, a).height,
      /* @__PURE__ */ b.jsx("span", { className: xh, children: "·" }),
      p.megapixels,
      " MP",
      /* @__PURE__ */ b.jsx("span", { className: xh, children: "·" }),
      p.aspect,
      " ",
      p.orientation,
      /* @__PURE__ */ b.jsx("span", { className: xh, children: "·" }),
      p.budgetPct,
      "% of 480p budget"
    ] })
  ] });
}
function a1() {
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
function zL({ presets: e }) {
  const { params: a, updateParam: r } = mn(), l = _.useMemo(() => Ym(e), [e]), [s, u] = _.useState(!1);
  if (l.length === 0) return null;
  const c = Gm(a, l), d = c === kc || s, p = a.width ?? 832, m = a.height ?? 480, y = (g) => {
    r("width", g.width), r("height", g.height);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: Al, children: [
    /* @__PURE__ */ b.jsx("span", { className: zl, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ b.jsxs("div", { className: EO, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: [
      l.map((g) => {
        const v = !d && c === g.id, x = [Ib, v ? Yb : ""].filter(Boolean).join(" "), S = [Fb, v ? Zb : ""].filter(Boolean).join(" ");
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": v,
            className: x,
            onClick: () => {
              u(!1), r("width", g.width), r("height", g.height);
            },
            children: [
              /* @__PURE__ */ b.jsxs("span", { className: Gb, children: [
                /* @__PURE__ */ b.jsxs("span", { className: Xb, children: [
                  g.width,
                  "×",
                  g.height
                ] }),
                /* @__PURE__ */ b.jsx("span", { className: S, children: /* @__PURE__ */ b.jsx(a1, {}) })
              ] }),
              /* @__PURE__ */ b.jsx("span", { className: Qb, children: g.label }),
              /* @__PURE__ */ b.jsx("span", { className: _O, children: g.sub }),
              g.stepsDown > 0 && /* @__PURE__ */ b.jsx(
                "span",
                {
                  className: g.stepsDown >= 2 ? CO : NO,
                  children: g.stepsDown >= 2 ? "off-distribution" : "below native"
                }
              )
            ]
          },
          g.id
        );
      }),
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": d,
          className: [Ib, RO, d ? Yb : ""].filter(Boolean).join(" "),
          onClick: () => u(!0),
          children: [
            /* @__PURE__ */ b.jsxs("span", { className: Gb, children: [
              /* @__PURE__ */ b.jsx("span", { className: Xb, children: "Custom" }),
              /* @__PURE__ */ b.jsx(
                "span",
                {
                  className: [Fb, d ? Zb : ""].join(" "),
                  children: /* @__PURE__ */ b.jsx(a1, {})
                }
              )
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: Qb, children: "Any aspect & budget" }),
            /* @__PURE__ */ b.jsx("span", { className: MO, children: "9:16 portrait, square, or a custom Wan2.2 canvas" })
          ]
        }
      )
    ] }),
    d && /* @__PURE__ */ b.jsx(AL, { width: p, height: m, onChange: y })
  ] });
}
var OL = "_1x63kpu0";
const jL = "Random each render";
function LL(e) {
  const a = e.trim();
  if (a.length === 0) return;
  const r = Number(a);
  if (!(!Number.isFinite(r) || r < 0))
    return Math.trunc(r);
}
function HL() {
  const { params: e, updateParam: a } = mn(), r = _.useId(), l = e.seed, s = (u) => {
    a("seed", LL(u.target.value));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: Al, children: [
    /* @__PURE__ */ b.jsx("span", { className: zl, id: r, children: "Seed" }),
    /* @__PURE__ */ b.jsxs("div", { className: Hc, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          className: OL,
          "aria-labelledby": r,
          min: 0,
          step: 1,
          placeholder: jL,
          value: l ?? "",
          onChange: s
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: uc, children: "Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize." })
    ] })
  ] });
}
var kL = "_1hbttwg0", BL = "_1hbttwg1", UL = "_1hbttwg2", VL = "_1hbttwg3", vS = "_1hbttwg4", qL = "_1hbttwg5", $L = "_1hbttwg7 _1hbttwg6", IL = "_1hbttwg8 _1hbttwg6", i1 = "_1hbttwg9", YL = "_1hbttwga", GL = "_1hbttwgb", XL = "_1hbttwgc", FL = "_1hbttwgd";
function ZL({
  spec: e,
  value: a,
  error: r,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = _.useId(), d = `${c}-help`, p = r ? `${c}-error` : d;
  return /* @__PURE__ */ b.jsxs("div", { className: kL, title: s ? u : void 0, children: [
    /* @__PURE__ */ b.jsxs("div", { className: BL, children: [
      /* @__PURE__ */ b.jsx("label", { className: UL, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ b.jsx("span", { className: VL, children: PL(a, e.step) })
    ] }),
    QL(e, a, l, c, p, r !== void 0, s),
    /* @__PURE__ */ b.jsx("span", { id: d, className: vS, children: s && u ? u : e.help }),
    r && /* @__PURE__ */ b.jsx("span", { id: `${c}-error`, role: "alert", className: qL, children: r })
  ] });
}
function QL(e, a, r, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ b.jsxs("div", { className: GL, children: [
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: XL,
            onClick: () => r(!d),
            children: /* @__PURE__ */ b.jsx("span", { className: FL, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ b.jsx("span", { className: vS, children: d ? "On" : "Off" })
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
          className: [IL, u ? i1 : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => r(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ b.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = r1(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ b.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: YL,
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
          className: [$L, u ? i1 : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: r1(a, e),
          onChange: (d) => r(Number(d.target.value))
        }
      );
  }
}
function r1(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function PL(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var KL = "_1f0q5gf0", JL = "_1f0q5gf1", WL = "_1f0q5gf2", e8 = "_1f0q5gf3", t8 = "_1f0q5gf4", n8 = "_1f0q5gf5", a8 = "_1f0q5gf6", i8 = "_1f0q5gf7", r8 = "_1f0q5gf8", l8 = "_1f0q5gf9", o8 = "_1f0q5gfa", s8 = "_1f0q5gfb", u8 = "_1f0q5gfc";
function c8({
  title: e,
  description: a,
  badge: r,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = _.useId(), [m, y] = _.useState(u ? s : !1), g = [KL, c].filter(Boolean).join(" "), v = [WL, m ? e8 : ""].filter(Boolean).join(" "), x = !u || !m;
  return /* @__PURE__ */ b.jsxs("section", { className: g, children: [
    /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        className: JL,
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
          /* @__PURE__ */ b.jsxs("span", { className: t8, children: [
            /* @__PURE__ */ b.jsx("span", { className: n8, children: e }),
            a && /* @__PURE__ */ b.jsx("span", { className: a8, children: a })
          ] }),
          (l || r) && /* @__PURE__ */ b.jsxs("span", { className: i8, children: [
            l && /* @__PURE__ */ b.jsx("span", { className: r8, children: l }),
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        id: p,
        className: [l8, x ? o8 : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ b.jsx("div", { className: s8, children: /* @__PURE__ */ b.jsx("div", { className: u8, children: d }) })
      }
    )
  ] });
}
const f8 = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function l1(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function d8(e) {
  return jc.find((a) => a.key === e)?.default;
}
function cl(e, a) {
  const r = e[a];
  if (typeof r == "number" && Number.isFinite(r)) return r;
  const l = d8(a);
  return typeof l == "number" ? l : 0;
}
function h8(e, a) {
  if (e === "core") {
    const r = cl(a, "fps"), l = cl(a, "interpolate_fps"), s = l > 0 ? l : r, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = f8[u] ?? u, d = cl(a, "upscale_factor"), p = `${r} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const r = cl(a, "num_inference_steps"), l = cl(a, "cfg_scale"), s = cl(a, "sigma_shift");
    return `${r} steps · CFG ${l1(l)} · shift ${l1(s)}`;
  }
  return null;
}
var m8 = "kn07ek0", p8 = "kn07ek1";
const g8 = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function y8({ issues: e }) {
  const { presetId: a, params: r, updateParam: l } = mn(), s = Lc(a, r), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ b.jsx("div", { className: m8, children: qw.map((c) => {
    const d = Z4(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ b.jsx(
      c8,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: h8(c.id, r),
        badge: c.defaultCollapsed ? /* @__PURE__ */ b.jsx(In, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ b.jsx("div", { className: p8, children: d.map((p) => {
          const m = s ? g8[p.key] : void 0;
          return /* @__PURE__ */ b.jsx(
            ZL,
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
var v8 = "_1w9jfpf0", b8 = "_1w9jfpf1", x8 = "_1w9jfpf2", w8 = "_1w9jfpf3", S8 = "_1w9jfpf4", E8 = "_1w9jfpf5";
const nm = "svi2-anchor-panel", bS = "svi2-prompt-input";
function _8() {
  const {
    presetId: e,
    presetApplied: a,
    params: r,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d
  } = mn(), { issues: p, blocked: m, busy: y, submit: g, cancel: v, focusRequest: x } = Pw();
  C8(x);
  const S = em("svi2/presets", J1), R = em("svi2/history", () => c5(25)), N = S.data?.presets ?? [];
  _.useEffect(() => {
    if (a || N.length === 0) return;
    const te = N.find(($) => $.id === e) ?? N[0];
    te && s(te);
  }, [a, N, e, s]);
  const C = R.data?.jobs ?? [], z = r.mode ?? "image_to_video", E = z !== "text_to_video", O = Um(e, r), k = p.find((te) => te.field === "ref_image_path")?.message, B = p.find((te) => te.field === "last_image_path")?.message, V = p.find((te) => te.field === "prompts")?.message, A = p.find(
    (te) => te.field === "width" && te.severity === "warning"
  )?.message, I = _.useCallback(
    (te) => {
      d(te);
    },
    [d]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: v8, children: [
    /* @__PURE__ */ b.jsxs("div", { className: b8, children: [
      /* @__PURE__ */ b.jsx(
        Oa,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ b.jsx(i6, { presets: N, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: [
            /* @__PURE__ */ b.jsx(gj, { value: z, onChange: u }),
            z === "text_to_video" && /* @__PURE__ */ b.jsx(HL, {})
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("div", { id: nm, children: /* @__PURE__ */ b.jsx(
        Oa,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ b.jsx(
            hO,
            {
              refImageRequired: E,
              lastImageRequired: O,
              refError: k,
              lastError: B
            }
          )
        }
      ) }),
      /* @__PURE__ */ b.jsx(Oa, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ b.jsx(p6, { error: V, textareaId: bS }) }),
      /* @__PURE__ */ b.jsx(Oa, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ b.jsx(_6, {}) }),
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            /* @__PURE__ */ b.jsx("span", { className: S8, children: "Inference · Parameters" }),
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
                const te = N.find(($) => $.id === e);
                te && s(te);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ b.jsx(cj, { presets: N, warningText: A }),
            /* @__PURE__ */ b.jsxs("div", { className: E8, children: [
              /* @__PURE__ */ b.jsx(zj, {}),
              /* @__PURE__ */ b.jsx(zL, { presets: N }),
              /* @__PURE__ */ b.jsx(GO, {})
            ] }),
            /* @__PURE__ */ b.jsx(y8, { issues: p }),
            /* @__PURE__ */ b.jsx($j, { presets: N })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: x8, children: [
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: "Render",
          description: y ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ b.jsx(bL, { state: l, onCancel: v, onReset: c }),
            !y && /* @__PURE__ */ b.jsx("div", { className: w8, children: /* @__PURE__ */ b.jsx(
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
      /* @__PURE__ */ b.jsx(Oa, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ b.jsx(Mj, { jobs: C, onOpen: I }) })
    ] })
  ] });
}
const N8 = {
  ref_image_path: nm,
  last_image_path: nm,
  prompts: bS
};
function C8(e) {
  _.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = N8[e.field];
    if (a) {
      const l = document.getElementById(a);
      o1(l);
      return;
    }
    R8(e.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      o1(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [e]);
}
function R8(e) {
  const a = jc.find((s) => s.key === e);
  if (!a) return;
  const r = qw.find((s) => s.id === a.tier);
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
function o1(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var M8 = "_1smvon90", dr = "_1smvon91", hr = "_1smvon92", mr = "_1smvon93", Uu = "_1smvon94", Eh = "_1smvon95 _1smvon94", T8 = "_1smvon96", D8 = "_1smvon97";
const A8 = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function z8() {
  const { settings: e, setSettings: a } = mn(), [r, l] = _.useState(e), [s, u] = _.useState(!1), c = _.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== e[m]
    ),
    [r, e]
  ), d = (m, y) => {
    l((g) => ({ ...g, [m]: y }));
  }, p = async () => {
    u(!0);
    try {
      const m = await W1(r);
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
        /* @__PURE__ */ b.jsxs("div", { className: M8, children: [
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Models directory" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Uu,
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
                className: Uu,
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
                className: Eh,
                value: r.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: iC.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ b.jsx(
              "select",
              {
                className: Eh,
                value: r.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: rC.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Blocks to swap" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Uu,
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
                className: Eh,
                value: r.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: A8.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: mr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: dr, children: [
            /* @__PURE__ */ b.jsx("span", { className: hr, children: "Interpolate target fps" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Uu,
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
        /* @__PURE__ */ b.jsxs("div", { className: T8, children: [
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
          c && /* @__PURE__ */ b.jsx("output", { className: D8, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var O8 = "_1ugwva20", j8 = "_1ugwva21", L8 = "_1ugwva22", H8 = "_1ugwva23", k8 = "_1ugwva24", B8 = "_1ugwva25";
function U8() {
  const e = fN(), a = V8(e.catalog?.presets ?? []);
  return /* @__PURE__ */ b.jsxs(v5, { initialSettings: e.settings, initialPreset: a, children: [
    /* @__PURE__ */ b.jsxs("div", { className: O8, children: [
      /* @__PURE__ */ b.jsx("header", { className: j8, children: /* @__PURE__ */ b.jsxs("div", { className: L8, children: [
        /* @__PURE__ */ b.jsx("h1", { className: H8, children: "SVI 2.0 Pro" }),
        /* @__PURE__ */ b.jsx("p", { className: k8, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
      ] }) }),
      /* @__PURE__ */ b.jsx("main", { className: B8, children: /* @__PURE__ */ b.jsx(_N, {}) })
    ] }),
    /* @__PURE__ */ b.jsx(G5, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function V8(e) {
  return e.find((a) => a.id === Ko) ?? e[0] ?? null;
}
async function q8() {
  const [e, a] = await Promise.all([
    J1().catch(() => null),
    sC().catch(() => K1)
  ]);
  return { catalog: e, settings: a };
}
function $8() {
  return [
    {
      path: "/",
      loader: () => $y("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: q8,
      Component: U8,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => $y(`/${I8(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: _8 },
        { path: "dag", Component: Ez },
        { path: "settings", Component: z8 }
      ]
    }
  ];
}
function I8(e, a) {
  const r = e[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const s1 = "ext-actions-request", Y8 = "ext-actions-declare", G8 = "ext-action-state", u1 = "ext-action-invoke", c1 = "svi2-pro:navigate", f1 = "svi2-pro.render";
function X8(e, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: f1,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(Y8, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(G8, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === f1 && X5();
  }, y = Q5((g) => {
    r = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(s1, p), e.addEventListener(u1, m), c(), {
    dispose: () => {
      y(), e.removeEventListener(s1, p), e.removeEventListener(u1, m);
    }
  };
}
const am = "svi2-pro-app", F8 = "ext-event", d1 = "svi2-pro-stylesheet", h1 = ["accent", "density", "card"];
function Z8(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function Q8() {
  if (typeof document > "u" || document.getElementById(d1)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = d1, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
Q8();
class P8 extends HTMLElement {
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
    this.root = L_.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(c1, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = X8(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(c1, a);
  }
  syncTweaksFromBody() {
    for (const a of h1) {
      const r = Z8(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: h1.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = bN($8(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ b.jsx(_.StrictMode, { children: /* @__PURE__ */ b.jsx(wN, { router: r }) })
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
      new CustomEvent(F8, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function K8() {
  typeof customElements > "u" || customElements.get(am) || customElements.define(am, P8);
}
typeof customElements < "u" && !customElements.get(am) && K8();
export {
  K8 as register
};
//# sourceMappingURL=svi2-pro.js.map
