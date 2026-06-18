function fE(e, a) {
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
function tm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $d = { exports: {} }, Eo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oy;
function dE() {
  if (Oy) return Eo;
  Oy = 1;
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
var jy;
function hE() {
  return jy || (jy = 1, $d.exports = dE()), $d.exports;
}
var b = hE(), Id = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ly;
function mE() {
  if (Ly) return Ve;
  Ly = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), v = Symbol.iterator;
  function x(A) {
    return A === null || typeof A != "object" ? null : (A = v && A[v] || A["@@iterator"], typeof A == "function" ? A : null);
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
  }, C = Object.assign, R = {};
  function N(A, U, Q) {
    this.props = A, this.context = U, this.refs = R, this.updater = Q || S;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(A, U) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, U, "setState");
  }, N.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function z() {
  }
  z.prototype = N.prototype;
  function E(A, U, Q) {
    this.props = A, this.context = U, this.refs = R, this.updater = Q || S;
  }
  var O = E.prototype = new z();
  O.constructor = E, C(O, N.prototype), O.isPureReactComponent = !0;
  var H = Array.isArray;
  function k() {
  }
  var V = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function I(A, U, Q) {
    var ee = Q.ref;
    return {
      $$typeof: e,
      type: A,
      key: U,
      ref: ee !== void 0 ? ee : null,
      props: Q
    };
  }
  function ne(A, U) {
    return I(A.type, U, A.props);
  }
  function $(A) {
    return typeof A == "object" && A !== null && A.$$typeof === e;
  }
  function K(A) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(Q) {
      return U[Q];
    });
  }
  var oe = /\/+/g;
  function j(A, U) {
    return typeof A == "object" && A !== null && A.key != null ? K("" + A.key) : U.toString(36);
  }
  function Y(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(k, k) : (A.status = "pending", A.then(
          function(U) {
            A.status === "pending" && (A.status = "fulfilled", A.value = U);
          },
          function(U) {
            A.status === "pending" && (A.status = "rejected", A.reason = U);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function T(A, U, Q, ee, ce) {
    var ae = typeof A;
    (ae === "undefined" || ae === "boolean") && (A = null);
    var se = !1;
    if (A === null) se = !0;
    else
      switch (ae) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case e:
            case a:
              se = !0;
              break;
            case y:
              return se = A._init, T(
                se(A._payload),
                U,
                Q,
                ee,
                ce
              );
          }
      }
    if (se)
      return ce = ce(A), se = ee === "" ? "." + j(A, 0) : ee, H(ce) ? (Q = "", se != null && (Q = se.replace(oe, "$&/") + "/"), T(ce, U, Q, "", function(Se) {
        return Se;
      })) : ce != null && ($(ce) && (ce = ne(
        ce,
        Q + (ce.key == null || A && A.key === ce.key ? "" : ("" + ce.key).replace(
          oe,
          "$&/"
        ) + "/") + se
      )), U.push(ce)), 1;
    se = 0;
    var P = ee === "" ? "." : ee + ":";
    if (H(A))
      for (var me = 0; me < A.length; me++)
        ee = A[me], ae = P + j(ee, me), se += T(
          ee,
          U,
          Q,
          ae,
          ce
        );
    else if (me = x(A), typeof me == "function")
      for (A = me.call(A), me = 0; !(ee = A.next()).done; )
        ee = ee.value, ae = P + j(ee, me++), se += T(
          ee,
          U,
          Q,
          ae,
          ce
        );
    else if (ae === "object") {
      if (typeof A.then == "function")
        return T(
          Y(A),
          U,
          Q,
          ee,
          ce
        );
      throw U = String(A), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return se;
  }
  function L(A, U, Q) {
    if (A == null) return A;
    var ee = [], ce = 0;
    return T(A, ee, "", "", function(ae) {
      return U.call(Q, ae, ce++);
    }), ee;
  }
  function F(A) {
    if (A._status === -1) {
      var U = A._result;
      U = U(), U.then(
        function(Q) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = Q);
        },
        function(Q) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = Q);
        }
      ), A._status === -1 && (A._status = 0, A._result = U);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var G = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, te = {
    map: L,
    forEach: function(A, U, Q) {
      L(
        A,
        function() {
          U.apply(this, arguments);
        },
        Q
      );
    },
    count: function(A) {
      var U = 0;
      return L(A, function() {
        U++;
      }), U;
    },
    toArray: function(A) {
      return L(A, function(U) {
        return U;
      }) || [];
    },
    only: function(A) {
      if (!$(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Ve.Activity = g, Ve.Children = te, Ve.Component = N, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = l, Ve.Suspense = p, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return V.H.useMemoCache(A);
    }
  }, Ve.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Ve.cacheSignal = function() {
    return null;
  }, Ve.cloneElement = function(A, U, Q) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var ee = C({}, A.props), ce = A.key;
    if (U != null)
      for (ae in U.key !== void 0 && (ce = "" + U.key), U)
        !D.call(U, ae) || ae === "key" || ae === "__self" || ae === "__source" || ae === "ref" && U.ref === void 0 || (ee[ae] = U[ae]);
    var ae = arguments.length - 2;
    if (ae === 1) ee.children = Q;
    else if (1 < ae) {
      for (var se = Array(ae), P = 0; P < ae; P++)
        se[P] = arguments[P + 2];
      ee.children = se;
    }
    return I(A.type, ce, ee);
  }, Ve.createContext = function(A) {
    return A = {
      $$typeof: c,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: u,
      _context: A
    }, A;
  }, Ve.createElement = function(A, U, Q) {
    var ee, ce = {}, ae = null;
    if (U != null)
      for (ee in U.key !== void 0 && (ae = "" + U.key), U)
        D.call(U, ee) && ee !== "key" && ee !== "__self" && ee !== "__source" && (ce[ee] = U[ee]);
    var se = arguments.length - 2;
    if (se === 1) ce.children = Q;
    else if (1 < se) {
      for (var P = Array(se), me = 0; me < se; me++)
        P[me] = arguments[me + 2];
      ce.children = P;
    }
    if (A && A.defaultProps)
      for (ee in se = A.defaultProps, se)
        ce[ee] === void 0 && (ce[ee] = se[ee]);
    return I(A, ae, ce);
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(A) {
    return { $$typeof: d, render: A };
  }, Ve.isValidElement = $, Ve.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: F
    };
  }, Ve.memo = function(A, U) {
    return {
      $$typeof: m,
      type: A,
      compare: U === void 0 ? null : U
    };
  }, Ve.startTransition = function(A) {
    var U = V.T, Q = {};
    V.T = Q;
    try {
      var ee = A(), ce = V.S;
      ce !== null && ce(Q, ee), typeof ee == "object" && ee !== null && typeof ee.then == "function" && ee.then(k, G);
    } catch (ae) {
      G(ae);
    } finally {
      U !== null && Q.types !== null && (U.types = Q.types), V.T = U;
    }
  }, Ve.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ve.use = function(A) {
    return V.H.use(A);
  }, Ve.useActionState = function(A, U, Q) {
    return V.H.useActionState(A, U, Q);
  }, Ve.useCallback = function(A, U) {
    return V.H.useCallback(A, U);
  }, Ve.useContext = function(A) {
    return V.H.useContext(A);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(A, U) {
    return V.H.useDeferredValue(A, U);
  }, Ve.useEffect = function(A, U) {
    return V.H.useEffect(A, U);
  }, Ve.useEffectEvent = function(A) {
    return V.H.useEffectEvent(A);
  }, Ve.useId = function() {
    return V.H.useId();
  }, Ve.useImperativeHandle = function(A, U, Q) {
    return V.H.useImperativeHandle(A, U, Q);
  }, Ve.useInsertionEffect = function(A, U) {
    return V.H.useInsertionEffect(A, U);
  }, Ve.useLayoutEffect = function(A, U) {
    return V.H.useLayoutEffect(A, U);
  }, Ve.useMemo = function(A, U) {
    return V.H.useMemo(A, U);
  }, Ve.useOptimistic = function(A, U) {
    return V.H.useOptimistic(A, U);
  }, Ve.useReducer = function(A, U, Q) {
    return V.H.useReducer(A, U, Q);
  }, Ve.useRef = function(A) {
    return V.H.useRef(A);
  }, Ve.useState = function(A) {
    return V.H.useState(A);
  }, Ve.useSyncExternalStore = function(A, U, Q) {
    return V.H.useSyncExternalStore(
      A,
      U,
      Q
    );
  }, Ve.useTransition = function() {
    return V.H.useTransition();
  }, Ve.version = "19.2.7", Ve;
}
var Hy;
function es() {
  return Hy || (Hy = 1, Id.exports = mE()), Id.exports;
}
var _ = es();
const ye = /* @__PURE__ */ tm(_), pE = /* @__PURE__ */ fE({
  __proto__: null,
  default: ye
}, [_]);
var Yd = { exports: {} }, No = {}, Gd = { exports: {} }, Xd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ky;
function gE() {
  return ky || (ky = 1, (function(e) {
    function a(T, L) {
      var F = T.length;
      T.push(L);
      e: for (; 0 < F; ) {
        var G = F - 1 >>> 1, te = T[G];
        if (0 < s(te, L))
          T[G] = L, T[F] = te, F = G;
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
        e: for (var G = 0, te = T.length, A = te >>> 1; G < A; ) {
          var U = 2 * (G + 1) - 1, Q = T[U], ee = U + 1, ce = T[ee];
          if (0 > s(Q, F))
            ee < te && 0 > s(ce, Q) ? (T[G] = ce, T[ee] = F, G = ee) : (T[G] = Q, T[U] = F, G = U);
          else if (ee < te && 0 > s(ce, F))
            T[G] = ce, T[ee] = F, G = ee;
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
    var p = [], m = [], y = 1, g = null, v = 3, x = !1, S = !1, C = !1, R = !1, N = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function O(T) {
      for (var L = r(m); L !== null; ) {
        if (L.callback === null) l(m);
        else if (L.startTime <= T)
          l(m), L.sortIndex = L.expirationTime, a(p, L);
        else break;
        L = r(m);
      }
    }
    function H(T) {
      if (C = !1, O(T), !S)
        if (r(p) !== null)
          S = !0, k || (k = !0, K());
        else {
          var L = r(m);
          L !== null && Y(H, L.startTime - T);
        }
    }
    var k = !1, V = -1, D = 5, I = -1;
    function ne() {
      return R ? !0 : !(e.unstable_now() - I < D);
    }
    function $() {
      if (R = !1, k) {
        var T = e.unstable_now();
        I = T;
        var L = !0;
        try {
          e: {
            S = !1, C && (C = !1, z(V), V = -1), x = !0;
            var F = v;
            try {
              t: {
                for (O(T), g = r(p); g !== null && !(g.expirationTime > T && ne()); ) {
                  var G = g.callback;
                  if (typeof G == "function") {
                    g.callback = null, v = g.priorityLevel;
                    var te = G(
                      g.expirationTime <= T
                    );
                    if (T = e.unstable_now(), typeof te == "function") {
                      g.callback = te, O(T), L = !0;
                      break t;
                    }
                    g === r(p) && l(p), O(T);
                  } else l(p);
                  g = r(p);
                }
                if (g !== null) L = !0;
                else {
                  var A = r(m);
                  A !== null && Y(
                    H,
                    A.startTime - T
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
          L ? K() : k = !1;
        }
      }
    }
    var K;
    if (typeof E == "function")
      K = function() {
        E($);
      };
    else if (typeof MessageChannel < "u") {
      var oe = new MessageChannel(), j = oe.port2;
      oe.port1.onmessage = $, K = function() {
        j.postMessage(null);
      };
    } else
      K = function() {
        N($, 0);
      };
    function Y(T, L) {
      V = N(function() {
        T(e.unstable_now());
      }, L);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, e.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < T ? Math.floor(1e3 / T) : 5;
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
      R = !0;
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
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return te = F + te, T = {
        id: y++,
        callback: L,
        priorityLevel: T,
        startTime: F,
        expirationTime: te,
        sortIndex: -1
      }, F > G ? (T.sortIndex = F, a(m, T), r(p) === null && T === r(m) && (C ? (z(V), V = -1) : C = !0, Y(H, F - G))) : (T.sortIndex = te, a(p, T), S || x || (S = !0, k || (k = !0, K()))), T;
    }, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(T) {
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
  })(Xd)), Xd;
}
var By;
function yE() {
  return By || (By = 1, Gd.exports = gE()), Gd.exports;
}
var Fd = { exports: {} }, dn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uy;
function vE() {
  if (Uy) return dn;
  Uy = 1;
  var e = es();
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
  return dn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, dn.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(p, m, null, y);
  }, dn.flushSync = function(p) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, dn.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(p, m));
  }, dn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, dn.preinit = function(p, m) {
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
  }, dn.preinitModule = function(p, m) {
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
  }, dn.preload = function(p, m) {
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
  }, dn.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = d(m.as, m.crossOrigin);
        l.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(p);
  }, dn.requestFormReset = function(p) {
    l.d.r(p);
  }, dn.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, dn.useFormState = function(p, m, y) {
    return c.H.useFormState(p, m, y);
  }, dn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, dn.version = "19.2.7", dn;
}
var Vy;
function h1() {
  if (Vy) return Fd.exports;
  Vy = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Fd.exports = vE(), Fd.exports;
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
var qy;
function bE() {
  if (qy) return No;
  qy = 1;
  var e = yE(), a = es(), r = h1();
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
  var g = Object.assign, v = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), E = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), ne = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var oe = Symbol.for("react.client.reference");
  function j(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === oe ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case N:
        return "Profiler";
      case R:
        return "StrictMode";
      case H:
        return "Suspense";
      case k:
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
        case D:
          n = t._payload, t = t._init;
          try {
            return j(t(n));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, T = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], te = -1;
  function A(t) {
    return { current: t };
  }
  function U(t) {
    0 > te || (t.current = G[te], G[te] = null, te--);
  }
  function Q(t, n) {
    te++, G[te] = t.current, t.current = n;
  }
  var ee = A(null), ce = A(null), ae = A(null), se = A(null);
  function P(t, n) {
    switch (Q(ae, n), Q(ce, t), Q(ee, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? ny(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = ny(n), t = ay(n, t);
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
    U(ee), Q(ee, t);
  }
  function me() {
    U(ee), U(ce), U(ae);
  }
  function Se(t) {
    t.memoizedState !== null && Q(se, t);
    var n = ee.current, i = ay(n, t.type);
    n !== i && (Q(ce, t), Q(ee, i));
  }
  function Te(t) {
    ce.current === t && (U(ee), U(ce)), se.current === t && (U(se), xo._currentValue = F);
  }
  var _e, xe;
  function Re(t) {
    if (_e === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        _e = n && n[1] || "", xe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _e + t + xe;
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
              var he = function() {
                throw Error();
              };
              if (Object.defineProperty(he.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(he, []);
                } catch (ue) {
                  var le = ue;
                }
                Reflect.construct(t, [], he);
              } else {
                try {
                  he.call();
                } catch (ue) {
                  le = ue;
                }
                t.call(he.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ue) {
                le = ue;
              }
              (he = t()) && typeof he.catch == "function" && he.catch(function() {
              });
            }
          } catch (ue) {
            if (ue && le && typeof ue.stack == "string")
              return [ue.stack, le.stack];
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
`), re = M.split(`
`);
        for (f = o = 0; o < q.length && !q[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < re.length && !re[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === q.length || f === re.length)
          for (o = q.length - 1, f = re.length - 1; 1 <= o && 0 <= f && q[o] !== re[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (q[o] !== re[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || q[o] !== re[f]) {
                  var fe = `
` + q[o].replace(" at new ", " at ");
                  return t.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", t.displayName)), fe;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      $e = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? Re(i) : "";
  }
  function Me(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Re(t.type);
      case 16:
        return Re("Lazy");
      case 13:
        return t.child !== n && n !== null ? Re("Suspense Fallback") : Re("Suspense");
      case 19:
        return Re("SuspenseList");
      case 0:
      case 15:
        return ft(t.type, !1);
      case 11:
        return ft(t.type.render, !1);
      case 1:
        return ft(t.type, !0);
      case 31:
        return Re("Activity");
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
  var ke = Object.prototype.hasOwnProperty, Ie = e.unstable_scheduleCallback, St = e.unstable_cancelCallback, Je = e.unstable_shouldYield, Ze = e.unstable_requestPaint, Pe = e.unstable_now, gt = e.unstable_getCurrentPriorityLevel, yt = e.unstable_ImmediatePriority, Yt = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, mt = e.unstable_LowPriority, ot = e.unstable_IdlePriority, Xn = e.log, xn = e.unstable_setDisableYieldValue, nn = null, Qt = null;
  function Ot(t) {
    if (typeof Xn == "function" && xn(t), Qt && typeof Qt.setStrictMode == "function")
      try {
        Qt.setStrictMode(nn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : wn, gi = Math.log, Ea = Math.LN2;
  function wn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (gi(t) / Ea | 0) | 0;
  }
  var ua = 256, On = 262144, Fn = 4194304;
  function cn(t) {
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
    return M !== 0 ? (o = M & ~h, o !== 0 ? f = cn(o) : (w &= M, w !== 0 ? f = cn(w) : i || (i = M & ~t, i !== 0 && (f = cn(i))))) : (M = o & ~h, M !== 0 ? f = cn(M) : w !== 0 ? f = cn(w) : i || (i = o & ~t, i !== 0 && (f = cn(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, i = n & -n, h >= i || h === 32 && (i & 4194048) !== 0) ? n : f;
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
    var M = t.entanglements, q = t.expirationTimes, re = t.hiddenUpdates;
    for (i = w & ~i; 0 < i; ) {
      var fe = 31 - Ut(i), he = 1 << fe;
      M[fe] = 0, q[fe] = -1;
      var le = re[fe];
      if (le !== null)
        for (re[fe] = null, fe = 0; fe < le.length; fe++) {
          var ue = le[fe];
          ue !== null && (ue.lane &= -536870913);
        }
      i &= ~he;
    }
    o !== 0 && ca(t, o, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(w & ~n));
  }
  function ca(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ut(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function en(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ut(i), f = 1 << o;
      f & n | t[o] & n && (t[o] |= n), i &= ~f;
    }
  }
  function B(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Z(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
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
  function W(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function pe() {
    var t = L.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Cy(t.type));
  }
  function ge(t, n) {
    var i = L.p;
    try {
      return L.p = t, n();
    } finally {
      L.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, we = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, De = "__reactEvents$" + Ee, Ae = "__reactListeners$" + Ee, Ue = "__reactHandles$" + Ee, je = "__reactResources$" + Ee, Ge = "__reactMarker$" + Ee;
  function rt(t) {
    delete t[ve], delete t[we], delete t[De], delete t[Ae], delete t[Ue];
  }
  function Ct(t) {
    var n = t[ve];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = cy(t); t !== null; ) {
            if (i = t[ve]) return i;
            t = cy(t);
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
  function fn(t, n) {
    an(t, n), an(t + "Capture", n);
  }
  function an(t, n) {
    for (jn[t] = n, t = 0; t < n.length; t++)
      Na.add(n[t]);
  }
  var Sn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), yi = {}, _n = {};
  function vi(t) {
    return ke.call(_n, t) ? !0 : ke.call(yi, t) ? !1 : Sn.test(t) ? _n[t] = !0 : (yi[t] = !0, !1);
  }
  function fa(t, n, i) {
    if (vi(n))
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
  function bi(t) {
    if (!t._valueTracker) {
      var n = gn(t) ? "checked" : "value";
      t._valueTracker = Ln(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Ia(t) {
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
  function rn(t) {
    return t.replace(
      Zn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Wi(t, n, i, o, f, h, w, M) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + bt(n)) : t.value !== "" + bt(n) && (t.value = "" + bt(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? jl(t, w, bt(n)) : i != null ? jl(t, w, bt(i)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + bt(M) : t.removeAttribute("name");
  }
  function Or(t, n, i, o, f, h, w, M) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || i != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        bi(t);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), bi(t);
  }
  function jl(t, n, i) {
    n === "number" && dt(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function xi(t, n, i, o) {
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
  function Ll(t, n, i) {
    if (n != null && (n = "" + bt(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + bt(i) : "";
  }
  function Jm(t, n, i, o) {
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
    i = bt(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), bi(t);
  }
  function jr(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var lS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Wm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || lS.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function ep(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && Wm(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Wm(t, h, n[h]);
  }
  function kc(t) {
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
  var oS = /* @__PURE__ */ new Map([
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
  ]), sS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function fs(t) {
    return sS.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Ya() {
  }
  var Bc = null;
  function Uc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Lr = null, Hr = null;
  function tp(t) {
    var n = st(t);
    if (n && (t = n.stateNode)) {
      var i = t[we] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (Wi(
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
              'input[name="' + rn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var f = o[we] || null;
                if (!f) throw Error(l(90));
                Wi(
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
              o = i[n], o.form === t.form && Ia(o);
          }
          break e;
        case "textarea":
          Ll(t, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && xi(t, !!i.multiple, n, !1);
      }
    }
  }
  var Vc = !1;
  function np(t, n, i) {
    if (Vc) return t(n, i);
    Vc = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (Vc = !1, (Lr !== null || Hr !== null) && (Js(), Lr && (n = Lr, t = Hr, Hr = Lr = null, tp(n), t)))
        for (n = 0; n < t.length; n++) tp(t[n]);
    }
  }
  function Hl(t, n) {
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
  var Ga = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qc = !1;
  if (Ga)
    try {
      var kl = {};
      Object.defineProperty(kl, "passive", {
        get: function() {
          qc = !0;
        }
      }), window.addEventListener("test", kl, kl), window.removeEventListener("test", kl, kl);
    } catch {
      qc = !1;
    }
  var wi = null, $c = null, ds = null;
  function ap() {
    if (ds) return ds;
    var t, n = $c, i = n.length, o, f = "value" in wi ? wi.value : wi.textContent, h = f.length;
    for (t = 0; t < i && n[t] === f[t]; t++) ;
    var w = i - t;
    for (o = 1; o <= w && n[i - o] === f[h - o]; o++) ;
    return ds = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function hs(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ms() {
    return !0;
  }
  function ip() {
    return !1;
  }
  function En(t) {
    function n(i, o, f, h, w) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (i = t[M], this[M] = i ? i(h) : h[M]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? ms : ip, this.isPropagationStopped = ip, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = ms);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = ms);
      },
      persist: function() {
      },
      isPersistent: ms
    }), n;
  }
  var er = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ps = En(er), Bl = g({}, er, { view: 0, detail: 0 }), uS = En(Bl), Ic, Yc, Ul, gs = g({}, Bl, {
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
    getModifierState: Xc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ul && (Ul && t.type === "mousemove" ? (Ic = t.screenX - Ul.screenX, Yc = t.screenY - Ul.screenY) : Yc = Ic = 0, Ul = t), Ic);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Yc;
    }
  }), rp = En(gs), cS = g({}, gs, { dataTransfer: 0 }), fS = En(cS), dS = g({}, Bl, { relatedTarget: 0 }), Gc = En(dS), hS = g({}, er, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mS = En(hS), pS = g({}, er, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), gS = En(pS), yS = g({}, er, { data: 0 }), lp = En(yS), vS = {
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
  }, bS = {
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
  }, xS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function wS(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = xS[t]) ? !!n[t] : !1;
  }
  function Xc() {
    return wS;
  }
  var SS = g({}, Bl, {
    key: function(t) {
      if (t.key) {
        var n = vS[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = hs(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? bS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Xc,
    charCode: function(t) {
      return t.type === "keypress" ? hs(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? hs(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), _S = En(SS), ES = g({}, gs, {
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
  }), op = En(ES), NS = g({}, Bl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Xc
  }), CS = En(NS), RS = g({}, er, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), TS = En(RS), MS = g({}, gs, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), DS = En(MS), AS = g({}, er, {
    newState: 0,
    oldState: 0
  }), zS = En(AS), OS = [9, 13, 27, 32], Fc = Ga && "CompositionEvent" in window, Vl = null;
  Ga && "documentMode" in document && (Vl = document.documentMode);
  var jS = Ga && "TextEvent" in window && !Vl, sp = Ga && (!Fc || Vl && 8 < Vl && 11 >= Vl), up = " ", cp = !1;
  function fp(t, n) {
    switch (t) {
      case "keyup":
        return OS.indexOf(n.keyCode) !== -1;
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
  function dp(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var kr = !1;
  function LS(t, n) {
    switch (t) {
      case "compositionend":
        return dp(n);
      case "keypress":
        return n.which !== 32 ? null : (cp = !0, up);
      case "textInput":
        return t = n.data, t === up && cp ? null : t;
      default:
        return null;
    }
  }
  function HS(t, n) {
    if (kr)
      return t === "compositionend" || !Fc && fp(t, n) ? (t = ap(), ds = $c = wi = null, kr = !1, t) : null;
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
        return sp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var kS = {
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
  function hp(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!kS[t.type] : n === "textarea";
  }
  function mp(t, n, i, o) {
    Lr ? Hr ? Hr.push(o) : Hr = [o] : Lr = o, n = ru(n, "onChange"), 0 < n.length && (i = new ps(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var ql = null, $l = null;
  function BS(t) {
    Q0(t, 0);
  }
  function ys(t) {
    var n = We(t);
    if (Ia(n)) return t;
  }
  function pp(t, n) {
    if (t === "change") return n;
  }
  var gp = !1;
  if (Ga) {
    var Zc;
    if (Ga) {
      var Pc = "oninput" in document;
      if (!Pc) {
        var yp = document.createElement("div");
        yp.setAttribute("oninput", "return;"), Pc = typeof yp.oninput == "function";
      }
      Zc = Pc;
    } else Zc = !1;
    gp = Zc && (!document.documentMode || 9 < document.documentMode);
  }
  function vp() {
    ql && (ql.detachEvent("onpropertychange", bp), $l = ql = null);
  }
  function bp(t) {
    if (t.propertyName === "value" && ys($l)) {
      var n = [];
      mp(
        n,
        $l,
        t,
        Uc(t)
      ), np(BS, n);
    }
  }
  function US(t, n, i) {
    t === "focusin" ? (vp(), ql = n, $l = i, ql.attachEvent("onpropertychange", bp)) : t === "focusout" && vp();
  }
  function VS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ys($l);
  }
  function qS(t, n) {
    if (t === "click") return ys(n);
  }
  function $S(t, n) {
    if (t === "input" || t === "change")
      return ys(n);
  }
  function IS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Hn = typeof Object.is == "function" ? Object.is : IS;
  function Il(t, n) {
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
  function xp(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function wp(t, n) {
    var i = xp(t);
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
      i = xp(i);
    }
  }
  function Sp(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Sp(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function _p(t) {
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
  function Qc(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var YS = Ga && "documentMode" in document && 11 >= document.documentMode, Br = null, Kc = null, Yl = null, Jc = !1;
  function Ep(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Jc || Br == null || Br !== dt(o) || (o = Br, "selectionStart" in o && Qc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Yl && Il(Yl, o) || (Yl = o, o = ru(Kc, "onSelect"), 0 < o.length && (n = new ps(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = Br)));
  }
  function tr(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var Ur = {
    animationend: tr("Animation", "AnimationEnd"),
    animationiteration: tr("Animation", "AnimationIteration"),
    animationstart: tr("Animation", "AnimationStart"),
    transitionrun: tr("Transition", "TransitionRun"),
    transitionstart: tr("Transition", "TransitionStart"),
    transitioncancel: tr("Transition", "TransitionCancel"),
    transitionend: tr("Transition", "TransitionEnd")
  }, Wc = {}, Np = {};
  Ga && (Np = document.createElement("div").style, "AnimationEvent" in window || (delete Ur.animationend.animation, delete Ur.animationiteration.animation, delete Ur.animationstart.animation), "TransitionEvent" in window || delete Ur.transitionend.transition);
  function nr(t) {
    if (Wc[t]) return Wc[t];
    if (!Ur[t]) return t;
    var n = Ur[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Np)
        return Wc[t] = n[i];
    return t;
  }
  var Cp = nr("animationend"), Rp = nr("animationiteration"), Tp = nr("animationstart"), GS = nr("transitionrun"), XS = nr("transitionstart"), FS = nr("transitioncancel"), Mp = nr("transitionend"), Dp = /* @__PURE__ */ new Map(), ef = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ef.push("scrollEnd");
  function ha(t, n) {
    Dp.set(t, n), fn(n, [t]);
  }
  var vs = typeof reportError == "function" ? reportError : function(t) {
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
  }, Pn = [], Vr = 0, tf = 0;
  function bs() {
    for (var t = Vr, n = tf = Vr = 0; n < t; ) {
      var i = Pn[n];
      Pn[n++] = null;
      var o = Pn[n];
      Pn[n++] = null;
      var f = Pn[n];
      Pn[n++] = null;
      var h = Pn[n];
      if (Pn[n++] = null, o !== null && f !== null) {
        var w = o.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), o.pending = f;
      }
      h !== 0 && Ap(i, f, h);
    }
  }
  function xs(t, n, i, o) {
    Pn[Vr++] = t, Pn[Vr++] = n, Pn[Vr++] = i, Pn[Vr++] = o, tf |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function nf(t, n, i, o) {
    return xs(t, n, i, o), ws(t);
  }
  function ar(t, n) {
    return xs(t, null, null, n), ws(t);
  }
  function Ap(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= i, o = h.alternate, o !== null && (o.childLanes |= i), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(i), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = i | 536870912), h) : null;
  }
  function ws(t) {
    if (50 < ho)
      throw ho = 0, dd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var qr = {};
  function ZS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function kn(t, n, i, o) {
    return new ZS(t, n, i, o);
  }
  function af(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Xa(t, n) {
    var i = t.alternate;
    return i === null ? (i = kn(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function zp(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Ss(t, n, i, o, f, h) {
    var w = 0;
    if (o = t, typeof t == "function") af(t) && (w = 1);
    else if (typeof t == "string")
      w = W_(
        t,
        i,
        ee.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case I:
          return t = kn(31, i, n, f), t.elementType = I, t.lanes = h, t;
        case C:
          return ir(i.children, f, h, n);
        case R:
          w = 8, f |= 24;
          break;
        case N:
          return t = kn(12, i, n, f | 2), t.elementType = N, t.lanes = h, t;
        case H:
          return t = kn(13, i, n, f), t.elementType = H, t.lanes = h, t;
        case k:
          return t = kn(19, i, n, f), t.elementType = k, t.lanes = h, t;
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
              case D:
                w = 16, o = null;
                break e;
            }
          w = 29, i = Error(
            l(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = kn(w, i, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function ir(t, n, i, o) {
    return t = kn(7, t, o, n), t.lanes = i, t;
  }
  function rf(t, n, i) {
    return t = kn(6, t, null, n), t.lanes = i, t;
  }
  function Op(t) {
    var n = kn(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function lf(t, n, i) {
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
  var jp = /* @__PURE__ */ new WeakMap();
  function Qn(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = jp.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Xe(n)
      }, jp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Xe(n)
    };
  }
  var $r = [], Ir = 0, _s = null, Gl = 0, Kn = [], Jn = 0, Si = null, Ca = 1, Ra = "";
  function Fa(t, n) {
    $r[Ir++] = Gl, $r[Ir++] = _s, _s = t, Gl = n;
  }
  function Lp(t, n, i) {
    Kn[Jn++] = Ca, Kn[Jn++] = Ra, Kn[Jn++] = Si, Si = t;
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
  function of(t) {
    t.return !== null && (Fa(t, 1), Lp(t, 1, 0));
  }
  function sf(t) {
    for (; t === _s; )
      _s = $r[--Ir], $r[Ir] = null, Gl = $r[--Ir], $r[Ir] = null;
    for (; t === Si; )
      Si = Kn[--Jn], Kn[Jn] = null, Ra = Kn[--Jn], Kn[Jn] = null, Ca = Kn[--Jn], Kn[Jn] = null;
  }
  function Hp(t, n) {
    Kn[Jn++] = Ca, Kn[Jn++] = Ra, Kn[Jn++] = Si, Ca = n.id, Ra = n.overflow, Si = t;
  }
  var ln = null, Tt = null, it = !1, _i = null, Wn = !1, uf = Error(l(519));
  function Ei(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Xl(Qn(n, t)), uf;
  }
  function kp(t) {
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
        for (i = 0; i < po.length; i++)
          Ke(po[i], n);
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
        Ke("invalid", n), Or(
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
        Ke("invalid", n), Jm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || ey(n.textContent, i) ? (o.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), o.onScroll != null && Ke("scroll", n), o.onScrollEnd != null && Ke("scrollend", n), o.onClick != null && (n.onclick = Ya), n = !0) : n = !1, n || Ei(t, !0);
  }
  function Bp(t) {
    for (ln = t.return; ln; )
      switch (ln.tag) {
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
          ln = ln.return;
      }
  }
  function Yr(t) {
    if (t !== ln) return !1;
    if (!it) return Bp(t), it = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || Rd(t.type, t.memoizedProps)), i = !i), i && Tt && Ei(t), Bp(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = uy(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = uy(t);
    } else
      n === 27 ? (n = Tt, Bi(t.type) ? (t = zd, zd = null, Tt = t) : Tt = n) : Tt = ln ? ta(t.stateNode.nextSibling) : null;
    return !0;
  }
  function rr() {
    Tt = ln = null, it = !1;
  }
  function cf() {
    var t = _i;
    return t !== null && (Tn === null ? Tn = t : Tn.push.apply(
      Tn,
      t
    ), _i = null), t;
  }
  function Xl(t) {
    _i === null ? _i = [t] : _i.push(t);
  }
  var ff = A(null), lr = null, Za = null;
  function Ni(t, n, i) {
    Q(ff, n._currentValue), n._currentValue = i;
  }
  function Pa(t) {
    t._currentValue = ff.current, U(ff);
  }
  function df(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function hf(t, n, i, o) {
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
              h.lanes |= i, M = h.alternate, M !== null && (M.lanes |= i), df(
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
        w.lanes |= i, h = w.alternate, h !== null && (h.lanes |= i), df(w, i, t), w = null;
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
  function Gr(t, n, i, o) {
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
      } else if (f === se.current) {
        if (w = f.alternate, w === null) throw Error(l(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(xo) : t = [xo]);
      }
      f = f.return;
    }
    t !== null && hf(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Es(t) {
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
  function or(t) {
    lr = t, Za = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function on(t) {
    return Up(lr, t);
  }
  function Ns(t, n) {
    return lr === null && or(t), Up(t, n);
  }
  function Up(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Za === null) {
      if (t === null) throw Error(l(308));
      Za = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Za = Za.next = n;
    return i;
  }
  var PS = typeof AbortController < "u" ? AbortController : function() {
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
  }, QS = e.unstable_scheduleCallback, KS = e.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function mf() {
    return {
      controller: new PS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Fl(t) {
    t.refCount--, t.refCount === 0 && QS(KS, function() {
      t.controller.abort();
    });
  }
  var Zl = null, pf = 0, Xr = 0, Fr = null;
  function JS(t, n) {
    if (Zl === null) {
      var i = Zl = [];
      pf = 0, Xr = vd(), Fr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return pf++, n.then(Vp, Vp), n;
  }
  function Vp() {
    if (--pf === 0 && Zl !== null) {
      Fr !== null && (Fr.status = "fulfilled");
      var t = Zl;
      Zl = null, Xr = 0, Fr = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function WS(t, n) {
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
  var qp = T.S;
  T.S = function(t, n) {
    E0 = Pe(), typeof n == "object" && n !== null && typeof n.then == "function" && JS(t, n), qp !== null && qp(t, n);
  };
  var sr = A(null);
  function gf() {
    var t = sr.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function Cs(t, n) {
    n === null ? Q(sr, sr.current) : Q(sr, n.pool);
  }
  function $p() {
    var t = gf();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Zr = Error(l(460)), yf = Error(l(474)), Rs = Error(l(542)), Ts = { then: function() {
  } };
  function Ip(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Yp(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Ya, Ya), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, Xp(t), t;
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
            throw t = n.reason, Xp(t), t;
        }
        throw cr = n, Zr;
    }
  }
  function ur(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (cr = i, Zr) : i;
    }
  }
  var cr = null;
  function Gp() {
    if (cr === null) throw Error(l(459));
    var t = cr;
    return cr = null, t;
  }
  function Xp(t) {
    if (t === Zr || t === Rs)
      throw Error(l(483));
  }
  var Pr = null, Pl = 0;
  function Ms(t) {
    var n = Pl;
    return Pl += 1, Pr === null && (Pr = []), Yp(Pr, t, n);
  }
  function Ql(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Ds(t, n) {
    throw n.$$typeof === v ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function Fp(t) {
    function n(J, X) {
      if (t) {
        var ie = J.deletions;
        ie === null ? (J.deletions = [X], J.flags |= 16) : ie.push(X);
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
      return J = Xa(J, X), J.index = 0, J.sibling = null, J;
    }
    function h(J, X, ie) {
      return J.index = ie, t ? (ie = J.alternate, ie !== null ? (ie = ie.index, ie < X ? (J.flags |= 67108866, X) : ie) : (J.flags |= 67108866, X)) : (J.flags |= 1048576, X);
    }
    function w(J) {
      return t && J.alternate === null && (J.flags |= 67108866), J;
    }
    function M(J, X, ie, de) {
      return X === null || X.tag !== 6 ? (X = rf(ie, J.mode, de), X.return = J, X) : (X = f(X, ie), X.return = J, X);
    }
    function q(J, X, ie, de) {
      var Oe = ie.type;
      return Oe === C ? fe(
        J,
        X,
        ie.props.children,
        de,
        ie.key
      ) : X !== null && (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === D && ur(Oe) === X.type) ? (X = f(X, ie.props), Ql(X, ie), X.return = J, X) : (X = Ss(
        ie.type,
        ie.key,
        ie.props,
        null,
        J.mode,
        de
      ), Ql(X, ie), X.return = J, X);
    }
    function re(J, X, ie, de) {
      return X === null || X.tag !== 4 || X.stateNode.containerInfo !== ie.containerInfo || X.stateNode.implementation !== ie.implementation ? (X = lf(ie, J.mode, de), X.return = J, X) : (X = f(X, ie.children || []), X.return = J, X);
    }
    function fe(J, X, ie, de, Oe) {
      return X === null || X.tag !== 7 ? (X = ir(
        ie,
        J.mode,
        de,
        Oe
      ), X.return = J, X) : (X = f(X, ie), X.return = J, X);
    }
    function he(J, X, ie) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return X = rf(
          "" + X,
          J.mode,
          ie
        ), X.return = J, X;
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case x:
            return ie = Ss(
              X.type,
              X.key,
              X.props,
              null,
              J.mode,
              ie
            ), Ql(ie, X), ie.return = J, ie;
          case S:
            return X = lf(
              X,
              J.mode,
              ie
            ), X.return = J, X;
          case D:
            return X = ur(X), he(J, X, ie);
        }
        if (Y(X) || K(X))
          return X = ir(
            X,
            J.mode,
            ie,
            null
          ), X.return = J, X;
        if (typeof X.then == "function")
          return he(J, Ms(X), ie);
        if (X.$$typeof === E)
          return he(
            J,
            Ns(J, X),
            ie
          );
        Ds(J, X);
      }
      return null;
    }
    function le(J, X, ie, de) {
      var Oe = X !== null ? X.key : null;
      if (typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint")
        return Oe !== null ? null : M(J, X, "" + ie, de);
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case x:
            return ie.key === Oe ? q(J, X, ie, de) : null;
          case S:
            return ie.key === Oe ? re(J, X, ie, de) : null;
          case D:
            return ie = ur(ie), le(J, X, ie, de);
        }
        if (Y(ie) || K(ie))
          return Oe !== null ? null : fe(J, X, ie, de, null);
        if (typeof ie.then == "function")
          return le(
            J,
            X,
            Ms(ie),
            de
          );
        if (ie.$$typeof === E)
          return le(
            J,
            X,
            Ns(J, ie),
            de
          );
        Ds(J, ie);
      }
      return null;
    }
    function ue(J, X, ie, de, Oe) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return J = J.get(ie) || null, M(X, J, "" + de, Oe);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case x:
            return J = J.get(
              de.key === null ? ie : de.key
            ) || null, q(X, J, de, Oe);
          case S:
            return J = J.get(
              de.key === null ? ie : de.key
            ) || null, re(X, J, de, Oe);
          case D:
            return de = ur(de), ue(
              J,
              X,
              ie,
              de,
              Oe
            );
        }
        if (Y(de) || K(de))
          return J = J.get(ie) || null, fe(X, J, de, Oe, null);
        if (typeof de.then == "function")
          return ue(
            J,
            X,
            ie,
            Ms(de),
            Oe
          );
        if (de.$$typeof === E)
          return ue(
            J,
            X,
            ie,
            Ns(X, de),
            Oe
          );
        Ds(X, de);
      }
      return null;
    }
    function Ne(J, X, ie, de) {
      for (var Oe = null, ut = null, Ce = X, Ye = X = 0, tt = null; Ce !== null && Ye < ie.length; Ye++) {
        Ce.index > Ye ? (tt = Ce, Ce = null) : tt = Ce.sibling;
        var ct = le(
          J,
          Ce,
          ie[Ye],
          de
        );
        if (ct === null) {
          Ce === null && (Ce = tt);
          break;
        }
        t && Ce && ct.alternate === null && n(J, Ce), X = h(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ce = tt;
      }
      if (Ye === ie.length)
        return i(J, Ce), it && Fa(J, Ye), Oe;
      if (Ce === null) {
        for (; Ye < ie.length; Ye++)
          Ce = he(J, ie[Ye], de), Ce !== null && (X = h(
            Ce,
            X,
            Ye
          ), ut === null ? Oe = Ce : ut.sibling = Ce, ut = Ce);
        return it && Fa(J, Ye), Oe;
      }
      for (Ce = o(Ce); Ye < ie.length; Ye++)
        tt = ue(
          Ce,
          J,
          Ye,
          ie[Ye],
          de
        ), tt !== null && (t && tt.alternate !== null && Ce.delete(
          tt.key === null ? Ye : tt.key
        ), X = h(
          tt,
          X,
          Ye
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return t && Ce.forEach(function(Ii) {
        return n(J, Ii);
      }), it && Fa(J, Ye), Oe;
    }
    function Le(J, X, ie, de) {
      if (ie == null) throw Error(l(151));
      for (var Oe = null, ut = null, Ce = X, Ye = X = 0, tt = null, ct = ie.next(); Ce !== null && !ct.done; Ye++, ct = ie.next()) {
        Ce.index > Ye ? (tt = Ce, Ce = null) : tt = Ce.sibling;
        var Ii = le(J, Ce, ct.value, de);
        if (Ii === null) {
          Ce === null && (Ce = tt);
          break;
        }
        t && Ce && Ii.alternate === null && n(J, Ce), X = h(Ii, X, Ye), ut === null ? Oe = Ii : ut.sibling = Ii, ut = Ii, Ce = tt;
      }
      if (ct.done)
        return i(J, Ce), it && Fa(J, Ye), Oe;
      if (Ce === null) {
        for (; !ct.done; Ye++, ct = ie.next())
          ct = he(J, ct.value, de), ct !== null && (X = h(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && Fa(J, Ye), Oe;
      }
      for (Ce = o(Ce); !ct.done; Ye++, ct = ie.next())
        ct = ue(Ce, J, Ye, ct.value, de), ct !== null && (t && ct.alternate !== null && Ce.delete(ct.key === null ? Ye : ct.key), X = h(ct, X, Ye), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return t && Ce.forEach(function(cE) {
        return n(J, cE);
      }), it && Fa(J, Ye), Oe;
    }
    function Nt(J, X, ie, de) {
      if (typeof ie == "object" && ie !== null && ie.type === C && ie.key === null && (ie = ie.props.children), typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case x:
            e: {
              for (var Oe = ie.key; X !== null; ) {
                if (X.key === Oe) {
                  if (Oe = ie.type, Oe === C) {
                    if (X.tag === 7) {
                      i(
                        J,
                        X.sibling
                      ), de = f(
                        X,
                        ie.props.children
                      ), de.return = J, J = de;
                      break e;
                    }
                  } else if (X.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === D && ur(Oe) === X.type) {
                    i(
                      J,
                      X.sibling
                    ), de = f(X, ie.props), Ql(de, ie), de.return = J, J = de;
                    break e;
                  }
                  i(J, X);
                  break;
                } else n(J, X);
                X = X.sibling;
              }
              ie.type === C ? (de = ir(
                ie.props.children,
                J.mode,
                de,
                ie.key
              ), de.return = J, J = de) : (de = Ss(
                ie.type,
                ie.key,
                ie.props,
                null,
                J.mode,
                de
              ), Ql(de, ie), de.return = J, J = de);
            }
            return w(J);
          case S:
            e: {
              for (Oe = ie.key; X !== null; ) {
                if (X.key === Oe)
                  if (X.tag === 4 && X.stateNode.containerInfo === ie.containerInfo && X.stateNode.implementation === ie.implementation) {
                    i(
                      J,
                      X.sibling
                    ), de = f(X, ie.children || []), de.return = J, J = de;
                    break e;
                  } else {
                    i(J, X);
                    break;
                  }
                else n(J, X);
                X = X.sibling;
              }
              de = lf(ie, J.mode, de), de.return = J, J = de;
            }
            return w(J);
          case D:
            return ie = ur(ie), Nt(
              J,
              X,
              ie,
              de
            );
        }
        if (Y(ie))
          return Ne(
            J,
            X,
            ie,
            de
          );
        if (K(ie)) {
          if (Oe = K(ie), typeof Oe != "function") throw Error(l(150));
          return ie = Oe.call(ie), Le(
            J,
            X,
            ie,
            de
          );
        }
        if (typeof ie.then == "function")
          return Nt(
            J,
            X,
            Ms(ie),
            de
          );
        if (ie.$$typeof === E)
          return Nt(
            J,
            X,
            Ns(J, ie),
            de
          );
        Ds(J, ie);
      }
      return typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint" ? (ie = "" + ie, X !== null && X.tag === 6 ? (i(J, X.sibling), de = f(X, ie), de.return = J, J = de) : (i(J, X), de = rf(ie, J.mode, de), de.return = J, J = de), w(J)) : i(J, X);
    }
    return function(J, X, ie, de) {
      try {
        Pl = 0;
        var Oe = Nt(
          J,
          X,
          ie,
          de
        );
        return Pr = null, Oe;
      } catch (Ce) {
        if (Ce === Zr || Ce === Rs) throw Ce;
        var ut = kn(29, Ce, null, J.mode);
        return ut.lanes = de, ut.return = J, ut;
      } finally {
      }
    };
  }
  var fr = Fp(!0), Zp = Fp(!1), Ci = !1;
  function vf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function bf(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ri(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ti(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = ws(t), Ap(t, null, i), n;
    }
    return xs(t, o, n, i), ws(t);
  }
  function Kl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  function xf(t, n) {
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
  var wf = !1;
  function Jl() {
    if (wf) {
      var t = Fr;
      if (t !== null) throw t;
    }
  }
  function Wl(t, n, i, o) {
    wf = !1;
    var f = t.updateQueue;
    Ci = !1;
    var h = f.firstBaseUpdate, w = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var q = M, re = q.next;
      q.next = null, w === null ? h = re : w.next = re, w = q;
      var fe = t.alternate;
      fe !== null && (fe = fe.updateQueue, M = fe.lastBaseUpdate, M !== w && (M === null ? fe.firstBaseUpdate = re : M.next = re, fe.lastBaseUpdate = q));
    }
    if (h !== null) {
      var he = f.baseState;
      w = 0, fe = re = q = null, M = h;
      do {
        var le = M.lane & -536870913, ue = le !== M.lane;
        if (ue ? (et & le) === le : (o & le) === le) {
          le !== 0 && le === Xr && (wf = !0), fe !== null && (fe = fe.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var Ne = t, Le = M;
            le = n;
            var Nt = i;
            switch (Le.tag) {
              case 1:
                if (Ne = Le.payload, typeof Ne == "function") {
                  he = Ne.call(Nt, he, le);
                  break e;
                }
                he = Ne;
                break e;
              case 3:
                Ne.flags = Ne.flags & -65537 | 128;
              case 0:
                if (Ne = Le.payload, le = typeof Ne == "function" ? Ne.call(Nt, he, le) : Ne, le == null) break e;
                he = g({}, he, le);
                break e;
              case 2:
                Ci = !0;
            }
          }
          le = M.callback, le !== null && (t.flags |= 64, ue && (t.flags |= 8192), ue = f.callbacks, ue === null ? f.callbacks = [le] : ue.push(le));
        } else
          ue = {
            lane: le,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, fe === null ? (re = fe = ue, q = he) : fe = fe.next = ue, w |= le;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          ue = M, M = ue.next, ue.next = null, f.lastBaseUpdate = ue, f.shared.pending = null;
        }
      } while (!0);
      fe === null && (q = he), f.baseState = q, f.firstBaseUpdate = re, f.lastBaseUpdate = fe, h === null && (f.shared.lanes = 0), Oi |= w, t.lanes = w, t.memoizedState = he;
    }
  }
  function Pp(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function Qp(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        Pp(i[t], n);
  }
  var Qr = A(null), As = A(0);
  function Kp(t, n) {
    t = ii, Q(As, t), Q(Qr, n), ii = t | n.baseLanes;
  }
  function Sf() {
    Q(As, ii), Q(Qr, Qr.current);
  }
  function _f() {
    ii = As.current, U(Qr), U(As);
  }
  var Bn = A(null), ea = null;
  function Mi(t) {
    var n = t.alternate;
    Q(qt, qt.current & 1), Q(Bn, t), ea === null && (n === null || Qr.current !== null || n.memoizedState !== null) && (ea = t);
  }
  function Ef(t) {
    Q(qt, qt.current), Q(Bn, t), ea === null && (ea = t);
  }
  function Jp(t) {
    t.tag === 22 ? (Q(qt, qt.current), Q(Bn, t), ea === null && (ea = t)) : Di();
  }
  function Di() {
    Q(qt, qt.current), Q(Bn, Bn.current);
  }
  function Un(t) {
    U(Bn), ea === t && (ea = null), U(qt);
  }
  var qt = A(0);
  function zs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Dd(i) || Ad(i)))
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
  var Qa = 0, qe = null, _t = null, Xt = null, Os = !1, Kr = !1, dr = !1, js = 0, eo = 0, Jr = null, e_ = 0;
  function kt() {
    throw Error(l(321));
  }
  function Nf(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Hn(t[i], n[i])) return !1;
    return !0;
  }
  function Cf(t, n, i, o, f, h) {
    return Qa = h, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, T.H = t === null || t.memoizedState === null ? Lg : qf, dr = !1, h = i(o, f), dr = !1, Kr && (h = eg(
      n,
      i,
      o,
      f
    )), Wp(t), h;
  }
  function Wp(t) {
    T.H = ao;
    var n = _t !== null && _t.next !== null;
    if (Qa = 0, Xt = _t = qe = null, Os = !1, eo = 0, Jr = null, n) throw Error(l(300));
    t === null || Ft || (t = t.dependencies, t !== null && Es(t) && (Ft = !0));
  }
  function eg(t, n, i, o) {
    qe = t;
    var f = 0;
    do {
      if (Kr && (Jr = null), eo = 0, Kr = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Xt = _t = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      T.H = Hg, h = n(i, o);
    } while (Kr);
    return h;
  }
  function t_() {
    var t = T.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? to(n) : n, t = t.useState()[0], (_t !== null ? _t.memoizedState : null) !== t && (qe.flags |= 1024), n;
  }
  function Rf() {
    var t = js !== 0;
    return js = 0, t;
  }
  function Tf(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Mf(t) {
    if (Os) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Os = !1;
    }
    Qa = 0, Xt = _t = qe = null, Kr = !1, eo = js = 0, Jr = null;
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
    if (_t === null) {
      var t = qe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = _t.next;
    var n = Xt === null ? qe.memoizedState : Xt.next;
    if (n !== null)
      Xt = n, _t = t;
    else {
      if (t === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      _t = t, t = {
        memoizedState: _t.memoizedState,
        baseState: _t.baseState,
        baseQueue: _t.baseQueue,
        queue: _t.queue,
        next: null
      }, Xt === null ? qe.memoizedState = Xt = t : Xt = Xt.next = t;
    }
    return Xt;
  }
  function Ls() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function to(t) {
    var n = eo;
    return eo += 1, Jr === null && (Jr = []), t = Yp(Jr, t, n), n = qe, (Xt === null ? n.memoizedState : Xt.next) === null && (n = n.alternate, T.H = n === null || n.memoizedState === null ? Lg : qf), t;
  }
  function Hs(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return to(t);
      if (t.$$typeof === E) return on(t);
    }
    throw Error(l(438, String(t)));
  }
  function Df(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = Ls(), qe.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = ne;
    return n.index++, i;
  }
  function Ka(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function ks(t) {
    var n = $t();
    return Af(n, _t, t);
  }
  function Af(t, n, i) {
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
      var M = w = null, q = null, re = n, fe = !1;
      do {
        var he = re.lane & -536870913;
        if (he !== re.lane ? (et & he) === he : (Qa & he) === he) {
          var le = re.revertLane;
          if (le === 0)
            q !== null && (q = q.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }), he === Xr && (fe = !0);
          else if ((Qa & le) === le) {
            re = re.next, le === Xr && (fe = !0);
            continue;
          } else
            he = {
              lane: 0,
              revertLane: re.revertLane,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }, q === null ? (M = q = he, w = h) : q = q.next = he, qe.lanes |= le, Oi |= le;
          he = re.action, dr && i(h, he), h = re.hasEagerState ? re.eagerState : i(h, he);
        } else
          le = {
            lane: he,
            revertLane: re.revertLane,
            gesture: re.gesture,
            action: re.action,
            hasEagerState: re.hasEagerState,
            eagerState: re.eagerState,
            next: null
          }, q === null ? (M = q = le, w = h) : q = q.next = le, qe.lanes |= he, Oi |= he;
        re = re.next;
      } while (re !== null && re !== n);
      if (q === null ? w = h : q.next = M, !Hn(h, t.memoizedState) && (Ft = !0, fe && (i = Fr, i !== null)))
        throw i;
      t.memoizedState = h, t.baseState = w, t.baseQueue = q, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function zf(t) {
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
  function tg(t, n, i) {
    var o = qe, f = $t(), h = it;
    if (h) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var w = !Hn(
      (_t || f).memoizedState,
      i
    );
    if (w && (f.memoizedState = i, Ft = !0), f = f.queue, Lf(ig.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || w || Xt !== null && Xt.memoizedState.tag & 1) {
      if (o.flags |= 2048, Wr(
        9,
        { destroy: void 0 },
        ag.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (Qa & 127) !== 0 || ng(o, n, i);
    }
    return i;
  }
  function ng(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = Ls(), qe.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function ag(t, n, i, o) {
    n.value = i, n.getSnapshot = o, rg(n) && lg(t);
  }
  function ig(t, n, i) {
    return i(function() {
      rg(n) && lg(t);
    });
  }
  function rg(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Hn(t, i);
    } catch {
      return !0;
    }
  }
  function lg(t) {
    var n = ar(t, 2);
    n !== null && Mn(n, t, 2);
  }
  function Of(t) {
    var n = yn();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), dr) {
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
      lastRenderedReducer: Ka,
      lastRenderedState: t
    }, n;
  }
  function og(t, n, i, o) {
    return t.baseState = i, Af(
      t,
      _t,
      typeof o == "function" ? o : Ka
    );
  }
  function n_(t, n, i, o, f) {
    if (Vs(t)) throw Error(l(485));
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
      T.T !== null ? i(!0) : h.isTransition = !1, o(h), i = n.pending, i === null ? (h.next = n.pending = h, sg(n, h)) : (h.next = i.next, n.pending = i.next = h);
    }
  }
  function sg(t, n) {
    var i = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = T.T, w = {};
      T.T = w;
      try {
        var M = i(f, o), q = T.S;
        q !== null && q(w, M), ug(t, n, M);
      } catch (re) {
        jf(t, n, re);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), T.T = h;
      }
    } else
      try {
        h = i(f, o), ug(t, n, h);
      } catch (re) {
        jf(t, n, re);
      }
  }
  function ug(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        cg(t, n, o);
      },
      function(o) {
        return jf(t, n, o);
      }
    ) : cg(t, n, i);
  }
  function cg(t, n, i) {
    n.status = "fulfilled", n.value = i, fg(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, sg(t, i)));
  }
  function jf(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, fg(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function fg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function dg(t, n) {
    return n;
  }
  function hg(t, n) {
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
            Ei(o);
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
      lastRenderedReducer: dg,
      lastRenderedState: n
    }, i.queue = o, i = zg.bind(
      null,
      qe,
      o
    ), o.dispatch = i, o = Of(!1), h = Vf.bind(
      null,
      qe,
      !1,
      o.queue
    ), o = yn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, i = n_.bind(
      null,
      qe,
      f,
      h,
      i
    ), f.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function mg(t) {
    var n = $t();
    return pg(n, _t, t);
  }
  function pg(t, n, i) {
    if (n = Af(
      t,
      n,
      dg
    )[0], t = ks(Ka)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = to(n);
      } catch (w) {
        throw w === Zr ? Rs : w;
      }
    else o = n;
    n = $t();
    var f = n.queue, h = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, Wr(
      9,
      { destroy: void 0 },
      a_.bind(null, f, i),
      null
    )), [o, h, t];
  }
  function a_(t, n) {
    t.action = n;
  }
  function gg(t) {
    var n = $t(), i = _t;
    if (i !== null)
      return pg(n, i, t);
    $t(), n = n.memoizedState, i = $t();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Wr(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = Ls(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function yg() {
    return $t().memoizedState;
  }
  function Bs(t, n, i, o) {
    var f = yn();
    qe.flags |= t, f.memoizedState = Wr(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Us(t, n, i, o) {
    var f = $t();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    _t !== null && o !== null && Nf(o, _t.memoizedState.deps) ? f.memoizedState = Wr(n, h, i, o) : (qe.flags |= t, f.memoizedState = Wr(
      1 | n,
      h,
      i,
      o
    ));
  }
  function vg(t, n) {
    Bs(8390656, 8, t, n);
  }
  function Lf(t, n) {
    Us(2048, 8, t, n);
  }
  function i_(t) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = Ls(), qe.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function bg(t) {
    var n = $t().memoizedState;
    return i_({ ref: n, nextImpl: t }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function xg(t, n) {
    return Us(4, 2, t, n);
  }
  function wg(t, n) {
    return Us(4, 4, t, n);
  }
  function Sg(t, n) {
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
  function _g(t, n, i) {
    i = i != null ? i.concat([t]) : null, Us(4, 4, Sg.bind(null, n, t), i);
  }
  function Hf() {
  }
  function Eg(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && Nf(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Ng(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && Nf(n, o[1]))
      return o[0];
    if (o = t(), dr) {
      Ot(!0);
      try {
        t();
      } finally {
        Ot(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function kf(t, n, i) {
    return i === void 0 || (Qa & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = C0(), qe.lanes |= t, Oi |= t, i);
  }
  function Cg(t, n, i, o) {
    return Hn(i, n) ? i : Qr.current !== null ? (t = kf(t, i, o), Hn(t, n) || (Ft = !0), t) : (Qa & 42) === 0 || (Qa & 1073741824) !== 0 && (et & 261930) === 0 ? (Ft = !0, t.memoizedState = i) : (t = C0(), qe.lanes |= t, Oi |= t, n);
  }
  function Rg(t, n, i, o, f) {
    var h = L.p;
    L.p = h !== 0 && 8 > h ? h : 8;
    var w = T.T, M = {};
    T.T = M, Vf(t, !1, n, i);
    try {
      var q = f(), re = T.S;
      if (re !== null && re(M, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var fe = WS(
          q,
          o
        );
        no(
          t,
          n,
          fe,
          $n(t)
        );
      } else
        no(
          t,
          n,
          o,
          $n(t)
        );
    } catch (he) {
      no(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: he },
        $n()
      );
    } finally {
      L.p = h, w !== null && M.types !== null && (w.types = M.types), T.T = w;
    }
  }
  function r_() {
  }
  function Bf(t, n, i, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = Tg(t).queue;
    Rg(
      t,
      f,
      n,
      F,
      i === null ? r_ : function() {
        return Mg(t), i(o);
      }
    );
  }
  function Tg(t) {
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
        lastRenderedReducer: Ka,
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
        lastRenderedReducer: Ka,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Mg(t) {
    var n = Tg(t);
    n.next === null && (n = t.alternate.memoizedState), no(
      t,
      n.next.queue,
      {},
      $n()
    );
  }
  function Uf() {
    return on(xo);
  }
  function Dg() {
    return $t().memoizedState;
  }
  function Ag() {
    return $t().memoizedState;
  }
  function l_(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = $n();
          t = Ri(i);
          var o = Ti(n, t, i);
          o !== null && (Mn(o, n, i), Kl(o, n, i)), n = { cache: mf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function o_(t, n, i) {
    var o = $n();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Vs(t) ? Og(n, i) : (i = nf(t, n, i, o), i !== null && (Mn(i, t, o), jg(i, n, o)));
  }
  function zg(t, n, i) {
    var o = $n();
    no(t, n, i, o);
  }
  function no(t, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Vs(t)) Og(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, M = h(w, i);
          if (f.hasEagerState = !0, f.eagerState = M, Hn(M, w))
            return xs(t, n, f, 0), Rt === null && bs(), !1;
        } catch {
        } finally {
        }
      if (i = nf(t, n, f, o), i !== null)
        return Mn(i, t, o), jg(i, n, o), !0;
    }
    return !1;
  }
  function Vf(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: vd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Vs(t)) {
      if (n) throw Error(l(479));
    } else
      n = nf(
        t,
        i,
        o,
        2
      ), n !== null && Mn(n, t, 2);
  }
  function Vs(t) {
    var n = t.alternate;
    return t === qe || n !== null && n === qe;
  }
  function Og(t, n) {
    Kr = Os = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function jg(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  var ao = {
    readContext: on,
    use: Hs,
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
  ao.useEffectEvent = kt;
  var Lg = {
    readContext: on,
    use: Hs,
    useCallback: function(t, n) {
      return yn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: on,
    useEffect: vg,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, Bs(
        4194308,
        4,
        Sg.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return Bs(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      Bs(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = yn();
      n = n === void 0 ? null : n;
      var o = t();
      if (dr) {
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
        if (dr) {
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
      }, o.queue = t, t = t.dispatch = o_.bind(
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
      t = Of(t);
      var n = t.queue, i = zg.bind(null, qe, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Hf,
    useDeferredValue: function(t, n) {
      var i = yn();
      return kf(i, t, n);
    },
    useTransition: function() {
      var t = Of(!1);
      return t = Rg.bind(
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
        (et & 127) !== 0 || ng(o, n, i);
      }
      f.memoizedState = i;
      var h = { value: i, getSnapshot: n };
      return f.queue = h, vg(ig.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, Wr(
        9,
        { destroy: void 0 },
        ag.bind(
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
        i = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = js++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = e_++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Uf,
    useFormState: hg,
    useActionState: hg,
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
      return n.queue = i, n = Vf.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Df,
    useCacheRefresh: function() {
      return yn().memoizedState = l_.bind(
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
  }, qf = {
    readContext: on,
    use: Hs,
    useCallback: Eg,
    useContext: on,
    useEffect: Lf,
    useImperativeHandle: _g,
    useInsertionEffect: xg,
    useLayoutEffect: wg,
    useMemo: Ng,
    useReducer: ks,
    useRef: yg,
    useState: function() {
      return ks(Ka);
    },
    useDebugValue: Hf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return Cg(
        i,
        _t.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = ks(Ka)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : to(t),
        n
      ];
    },
    useSyncExternalStore: tg,
    useId: Dg,
    useHostTransitionStatus: Uf,
    useFormState: mg,
    useActionState: mg,
    useOptimistic: function(t, n) {
      var i = $t();
      return og(i, _t, t, n);
    },
    useMemoCache: Df,
    useCacheRefresh: Ag
  };
  qf.useEffectEvent = bg;
  var Hg = {
    readContext: on,
    use: Hs,
    useCallback: Eg,
    useContext: on,
    useEffect: Lf,
    useImperativeHandle: _g,
    useInsertionEffect: xg,
    useLayoutEffect: wg,
    useMemo: Ng,
    useReducer: zf,
    useRef: yg,
    useState: function() {
      return zf(Ka);
    },
    useDebugValue: Hf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return _t === null ? kf(i, t, n) : Cg(
        i,
        _t.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = zf(Ka)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : to(t),
        n
      ];
    },
    useSyncExternalStore: tg,
    useId: Dg,
    useHostTransitionStatus: Uf,
    useFormState: gg,
    useActionState: gg,
    useOptimistic: function(t, n) {
      var i = $t();
      return _t !== null ? og(i, _t, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Df,
    useCacheRefresh: Ag
  };
  Hg.useEffectEvent = bg;
  function $f(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : g({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var If = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = $n(), f = Ri(o);
      f.payload = n, i != null && (f.callback = i), n = Ti(t, f, o), n !== null && (Mn(n, t, o), Kl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = $n(), f = Ri(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Ti(t, f, o), n !== null && (Mn(n, t, o), Kl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = $n(), o = Ri(i);
      o.tag = 2, n != null && (o.callback = n), n = Ti(t, o, i), n !== null && (Mn(n, t, i), Kl(n, t, i));
    }
  };
  function kg(t, n, i, o, f, h, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, w) : n.prototype && n.prototype.isPureReactComponent ? !Il(i, o) || !Il(f, h) : !0;
  }
  function Bg(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && If.enqueueReplaceState(n, n.state, null);
  }
  function hr(t, n) {
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
  function Ug(t) {
    vs(t);
  }
  function Vg(t) {
    console.error(t);
  }
  function qg(t) {
    vs(t);
  }
  function qs(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function $g(t, n, i) {
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
  function Yf(t, n, i) {
    return i = Ri(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      qs(t, n);
    }, i;
  }
  function Ig(t) {
    return t = Ri(t), t.tag = 3, t;
  }
  function Yg(t, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        $g(n, i, o);
      };
    }
    var w = i.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      $g(n, i, o), typeof f != "function" && (ji === null ? ji = /* @__PURE__ */ new Set([this]) : ji.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function s_(t, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && Gr(
        n,
        i,
        f,
        !0
      ), i = Bn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return ea === null ? Ws() : i.alternate === null && Bt === 0 && (Bt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === Ts ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), pd(t, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === Ts ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), pd(t, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return pd(t, o, f), Ws(), !1;
    }
    if (it)
      return n = Bn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== uf && (t = Error(l(422), { cause: o }), Xl(Qn(t, i)))) : (o !== uf && (n = Error(l(423), {
        cause: o
      }), Xl(
        Qn(n, i)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Qn(o, i), f = Yf(
        t.stateNode,
        o,
        f
      ), xf(t, f), Bt !== 4 && (Bt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Qn(h, i), fo === null ? fo = [h] : fo.push(h), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Qn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = f & -f, i.lanes |= t, t = Yf(i.stateNode, o, t), xf(i, t), !1;
        case 1:
          if (n = i.type, h = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (ji === null || !ji.has(h))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = Ig(f), Yg(
              f,
              t,
              i,
              o
            ), xf(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Gf = Error(l(461)), Ft = !1;
  function sn(t, n, i, o) {
    n.child = t === null ? Zp(n, null, i, o) : fr(
      n,
      t.child,
      i,
      o
    );
  }
  function Gg(t, n, i, o, f) {
    i = i.render;
    var h = n.ref;
    if ("ref" in o) {
      var w = {};
      for (var M in o)
        M !== "ref" && (w[M] = o[M]);
    } else w = o;
    return or(n), o = Cf(
      t,
      n,
      i,
      w,
      h,
      f
    ), M = Rf(), t !== null && !Ft ? (Tf(t, n, f), Ja(t, n, f)) : (it && M && of(n), n.flags |= 1, sn(t, n, o, f), n.child);
  }
  function Xg(t, n, i, o, f) {
    if (t === null) {
      var h = i.type;
      return typeof h == "function" && !af(h) && h.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = h, Fg(
        t,
        n,
        h,
        o,
        f
      )) : (t = Ss(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !Wf(t, f)) {
      var w = h.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Il, i(w, o) && t.ref === n.ref)
        return Ja(t, n, f);
    }
    return n.flags |= 1, t = Xa(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function Fg(t, n, i, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Il(h, o) && t.ref === n.ref)
        if (Ft = !1, n.pendingProps = o = h, Wf(t, f))
          (t.flags & 131072) !== 0 && (Ft = !0);
        else
          return n.lanes = t.lanes, Ja(t, n, f);
    }
    return Xf(
      t,
      n,
      i,
      o,
      f
    );
  }
  function Zg(t, n, i, o) {
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
        return Pg(
          t,
          n,
          h,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Cs(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Kp(n, h) : Sf(), Jp(n);
      else
        return o = n.lanes = 536870912, Pg(
          t,
          n,
          h !== null ? h.baseLanes | i : i,
          i,
          o
        );
    } else
      h !== null ? (Cs(n, h.cachePool), Kp(n, h), Di(), n.memoizedState = null) : (t !== null && Cs(n, null), Sf(), Di());
    return sn(t, n, f, i), n.child;
  }
  function io(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Pg(t, n, i, o, f) {
    var h = gf();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: i,
      cachePool: h
    }, t !== null && Cs(n, null), Sf(), Jp(n), t !== null && Gr(t, n, o, !0), n.childLanes = f, null;
  }
  function $s(t, n) {
    return n = Ys(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function Qg(t, n, i) {
    return fr(n, t.child, null, i), t = $s(n, n.pendingProps), t.flags |= 2, Un(n), n.memoizedState = null, t;
  }
  function u_(t, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = $s(n, o), n.lanes = 536870912, io(null, t);
        if (Ef(n), (t = Tt) ? (t = sy(
          t,
          Wn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Si !== null ? { id: Ca, overflow: Ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Op(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ei(n);
        return n.lanes = 536870912, null;
      }
      return $s(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if (Ef(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = Qg(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ft || Gr(t, n, i, !1), f = (i & t.childLanes) !== 0, Ft || f) {
        if (o = Rt, o !== null && (w = B(o, i), w !== 0 && w !== h.retryLane))
          throw h.retryLane = w, ar(t, w), Mn(o, t, w), Gf;
        Ws(), n = Qg(
          t,
          n,
          i
        );
      } else
        t = h.treeContext, Tt = ta(w.nextSibling), ln = n, it = !0, _i = null, Wn = !1, t !== null && Hp(n, t), n = $s(n, o), n.flags |= 4096;
      return n;
    }
    return t = Xa(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Is(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function Xf(t, n, i, o, f) {
    return or(n), i = Cf(
      t,
      n,
      i,
      o,
      void 0,
      f
    ), o = Rf(), t !== null && !Ft ? (Tf(t, n, f), Ja(t, n, f)) : (it && o && of(n), n.flags |= 1, sn(t, n, i, f), n.child);
  }
  function Kg(t, n, i, o, f, h) {
    return or(n), n.updateQueue = null, i = eg(
      n,
      o,
      i,
      f
    ), Wp(t), o = Rf(), t !== null && !Ft ? (Tf(t, n, h), Ja(t, n, h)) : (it && o && of(n), n.flags |= 1, sn(t, n, i, h), n.child);
  }
  function Jg(t, n, i, o, f) {
    if (or(n), n.stateNode === null) {
      var h = qr, w = i.contextType;
      typeof w == "object" && w !== null && (h = on(w)), h = new i(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = If, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, vf(n), w = i.contextType, h.context = typeof w == "object" && w !== null ? on(w) : qr, h.state = n.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && ($f(
        n,
        i,
        w,
        o
      ), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && If.enqueueReplaceState(h, h.state, null), Wl(n, o, h, f), Jl(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var M = n.memoizedProps, q = hr(i, M);
      h.props = q;
      var re = h.context, fe = i.contextType;
      w = qr, typeof fe == "object" && fe !== null && (w = on(fe));
      var he = i.getDerivedStateFromProps;
      fe = typeof he == "function" || typeof h.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, fe || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (M || re !== w) && Bg(
        n,
        h,
        o,
        w
      ), Ci = !1;
      var le = n.memoizedState;
      h.state = le, Wl(n, o, h, f), Jl(), re = n.memoizedState, M || le !== re || Ci ? (typeof he == "function" && ($f(
        n,
        i,
        he,
        o
      ), re = n.memoizedState), (q = Ci || kg(
        n,
        i,
        q,
        o,
        le,
        re,
        w
      )) ? (fe || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = re), h.props = o, h.state = re, h.context = w, o = q) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, bf(t, n), w = n.memoizedProps, fe = hr(i, w), h.props = fe, he = n.pendingProps, le = h.context, re = i.contextType, q = qr, typeof re == "object" && re !== null && (q = on(re)), M = i.getDerivedStateFromProps, (re = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== he || le !== q) && Bg(
        n,
        h,
        o,
        q
      ), Ci = !1, le = n.memoizedState, h.state = le, Wl(n, o, h, f), Jl();
      var ue = n.memoizedState;
      w !== he || le !== ue || Ci || t !== null && t.dependencies !== null && Es(t.dependencies) ? (typeof M == "function" && ($f(
        n,
        i,
        M,
        o
      ), ue = n.memoizedState), (fe = Ci || kg(
        n,
        i,
        fe,
        o,
        le,
        ue,
        q
      ) || t !== null && t.dependencies !== null && Es(t.dependencies)) ? (re || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, ue, q), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        ue,
        q
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = ue), h.props = o, h.state = ue, h.context = q, o = fe) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, Is(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = fr(
      n,
      t.child,
      null,
      f
    ), n.child = fr(
      n,
      null,
      i,
      f
    )) : sn(t, n, i, f), n.memoizedState = h.state, t = n.child) : t = Ja(
      t,
      n,
      f
    ), t;
  }
  function Wg(t, n, i, o) {
    return rr(), n.flags |= 256, sn(t, n, i, o), n.child;
  }
  var Ff = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Zf(t) {
    return { baseLanes: t, cachePool: $p() };
  }
  function Pf(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= qn), t;
  }
  function e0(t, n, i) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = t !== null && t.memoizedState === null ? !1 : (qt.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Mi(n) : Di(), (t = Tt) ? (t = sy(
          t,
          Wn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Si !== null ? { id: Ca, overflow: Ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Op(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ei(n);
        return Ad(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (Di(), f = n.mode, M = Ys(
        { mode: "hidden", children: M },
        f
      ), o = ir(
        o,
        f,
        i,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = Zf(i), o.childLanes = Pf(
        t,
        w,
        i
      ), n.memoizedState = Ff, io(null, o)) : (Mi(n), Qf(n, M));
    }
    var q = t.memoizedState;
    if (q !== null && (M = q.dehydrated, M !== null)) {
      if (h)
        n.flags & 256 ? (Mi(n), n.flags &= -257, n = Kf(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (Di(), n.child = t.child, n.flags |= 128, n = null) : (Di(), M = o.fallback, f = n.mode, o = Ys(
          { mode: "visible", children: o.children },
          f
        ), M = ir(
          M,
          f,
          i,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, fr(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = Zf(i), o.childLanes = Pf(
          t,
          w,
          i
        ), n.memoizedState = Ff, n = io(null, o));
      else if (Mi(n), Ad(M)) {
        if (w = M.nextSibling && M.nextSibling.dataset, w) var re = w.dgst;
        w = re, o = Error(l(419)), o.stack = "", o.digest = w, Xl({ value: o, source: null, stack: null }), n = Kf(
          t,
          n,
          i
        );
      } else if (Ft || Gr(t, n, i, !1), w = (i & t.childLanes) !== 0, Ft || w) {
        if (w = Rt, w !== null && (o = B(w, i), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, ar(t, o), Mn(w, t, o), Gf;
        Dd(M) || Ws(), n = Kf(
          t,
          n,
          i
        );
      } else
        Dd(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = q.treeContext, Tt = ta(
          M.nextSibling
        ), ln = n, it = !0, _i = null, Wn = !1, t !== null && Hp(n, t), n = Qf(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Di(), M = o.fallback, f = n.mode, q = t.child, re = q.sibling, o = Xa(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, re !== null ? M = Xa(
      re,
      M
    ) : (M = ir(
      M,
      f,
      i,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, io(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = Zf(i) : (f = M.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = $p(), M = {
      baseLanes: M.baseLanes | i,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = Pf(
      t,
      w,
      i
    ), n.memoizedState = Ff, io(t.child, o)) : (Mi(n), i = t.child, t = i.sibling, i = Xa(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function Qf(t, n) {
    return n = Ys(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Ys(t, n) {
    return t = kn(22, t, null, n), t.lanes = 0, t;
  }
  function Kf(t, n, i) {
    return fr(n, t.child, null, i), t = Qf(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function t0(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), df(t.return, n, i);
  }
  function Jf(t, n, i, o, f, h) {
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
  function n0(t, n, i) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var w = qt.current, M = (w & 2) !== 0;
    if (M ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, Q(qt, w), sn(t, n, o, i), o = it ? Gl : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && t0(t, i, n);
        else if (t.tag === 19)
          t0(t, i, n);
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
          t = i.alternate, t !== null && zs(t) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), Jf(
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
          if (t = f.alternate, t !== null && zs(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = i, i = f, f = t;
        }
        Jf(
          n,
          !0,
          i,
          null,
          h,
          o
        );
        break;
      case "together":
        Jf(
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
  function Ja(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), Oi |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (Gr(
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
      for (t = n.child, i = Xa(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Xa(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Wf(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Es(t)));
  }
  function c_(t, n, i) {
    switch (n.tag) {
      case 3:
        P(n, n.stateNode.containerInfo), Ni(n, Gt, t.memoizedState.cache), rr();
        break;
      case 27:
      case 5:
        Se(n);
        break;
      case 4:
        P(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ni(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Ef(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Mi(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? e0(t, n, i) : (Mi(n), t = Ja(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        Mi(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (Gr(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return n0(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Q(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, Zg(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ni(n, Gt, t.memoizedState.cache);
    }
    return Ja(t, n, i);
  }
  function a0(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Ft = !0;
      else {
        if (!Wf(t, i) && (n.flags & 128) === 0)
          return Ft = !1, c_(
            t,
            n,
            i
          );
        Ft = (t.flags & 131072) !== 0;
      }
    else
      Ft = !1, it && (n.flags & 1048576) !== 0 && Lp(n, Gl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = ur(n.elementType), n.type = t, typeof t == "function")
            af(t) ? (o = hr(t, o), n.tag = 1, n = Jg(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = Xf(
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
                n.tag = 11, n = Gg(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = Xg(
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
        return Xf(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, f = hr(
          o,
          n.pendingProps
        ), Jg(
          t,
          n,
          o,
          f,
          i
        );
      case 3:
        e: {
          if (P(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, bf(t, n), Wl(n, o, null, i);
          var w = n.memoizedState;
          if (o = w.cache, Ni(n, Gt, o), o !== h.cache && hf(
            n,
            [Gt],
            i,
            !0
          ), Jl(), o = w.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Wg(
                t,
                n,
                o,
                i
              );
              break e;
            } else if (o !== f) {
              f = Qn(
                Error(l(424)),
                n
              ), Xl(f), n = Wg(
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
              for (Tt = ta(t.firstChild), ln = n, it = !0, _i = null, Wn = !0, i = Zp(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (rr(), o === f) {
              n = Ja(
                t,
                n,
                i
              );
              break e;
            }
            sn(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Is(t, n), t === null ? (i = my(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, t = n.pendingProps, o = lu(
          ae.current
        ).createElement(i), o[ve] = n, o[we] = t, un(o, i, t), at(o), n.stateNode = o) : n.memoizedState = my(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Se(n), t === null && it && (o = n.stateNode = fy(
          n.type,
          n.pendingProps,
          ae.current
        ), ln = n, Wn = !0, f = Tt, Bi(n.type) ? (zd = f, Tt = ta(o.firstChild)) : Tt = f), sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), Is(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Tt) && (o = V_(
          o,
          n.type,
          n.pendingProps,
          Wn
        ), o !== null ? (n.stateNode = o, ln = n, Tt = ta(o.firstChild), Wn = !1, f = !0) : f = !1), f || Ei(n)), Se(n), f = n.type, h = n.pendingProps, w = t !== null ? t.memoizedProps : null, o = h.children, Rd(f, h) ? o = null : w !== null && Rd(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = Cf(
          t,
          n,
          t_,
          null,
          null,
          i
        ), xo._currentValue = f), Is(t, n), sn(t, n, o, i), n.child;
      case 6:
        return t === null && it && ((t = i = Tt) && (i = q_(
          i,
          n.pendingProps,
          Wn
        ), i !== null ? (n.stateNode = i, ln = n, Tt = null, t = !0) : t = !1), t || Ei(n)), null;
      case 13:
        return e0(t, n, i);
      case 4:
        return P(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = fr(
          n,
          null,
          o,
          i
        ) : sn(t, n, o, i), n.child;
      case 11:
        return Gg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return sn(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, Ni(n, n.type, o.value), sn(t, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, or(n), f = on(f), o = o(f), n.flags |= 1, sn(t, n, o, i), n.child;
      case 14:
        return Xg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Fg(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return n0(t, n, i);
      case 31:
        return u_(t, n, i);
      case 22:
        return Zg(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return or(n), o = on(Gt), t === null ? (f = gf(), f === null && (f = Rt, h = mf(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= i), f = h), n.memoizedState = { parent: o, cache: f }, vf(n), Ni(n, Gt, f)) : ((t.lanes & i) !== 0 && (bf(t, n), Wl(n, null, null, i), Jl()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ni(n, Gt, o)) : (o = h.cache, Ni(n, Gt, o), o !== f.cache && hf(
          n,
          [Gt],
          i,
          !0
        ))), sn(
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
  function Wa(t) {
    t.flags |= 4;
  }
  function ed(t, n, i, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (D0()) t.flags |= 8192;
        else
          throw cr = Ts, yf;
    } else t.flags &= -16777217;
  }
  function i0(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !by(n))
      if (D0()) t.flags |= 8192;
      else
        throw cr = Ts, yf;
  }
  function Gs(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, al |= n);
  }
  function ro(t, n) {
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
  function f_(t, n, i) {
    var o = n.pendingProps;
    switch (sf(n), n.tag) {
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
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Pa(Gt), me(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Yr(n) ? Wa(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, cf())), Mt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (Wa(n), h !== null ? (Mt(n), i0(n, h)) : (Mt(n), ed(
          n,
          f,
          null,
          o,
          i
        ))) : h ? h !== t.memoizedState ? (Wa(n), Mt(n), i0(n, h)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Wa(n), Mt(n), ed(
          n,
          f,
          t,
          o,
          i
        )), null;
      case 27:
        if (Te(n), i = ae.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Wa(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = ee.current, Yr(n) ? kp(n) : (t = fy(f, o, i), n.stateNode = t, Wa(n));
        }
        return Mt(n), null;
      case 5:
        if (Te(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Wa(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (h = ee.current, Yr(n))
            kp(n);
          else {
            var w = lu(
              ae.current
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
            o && Wa(n);
          }
        }
        return Mt(n), ed(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Wa(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = ae.current, Yr(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, f = ln, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[ve] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || ey(t.nodeValue, i)), t || Ei(n, !0);
          } else
            t = lu(t).createTextNode(
              o
            ), t[ve] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Yr(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[ve] = n;
            } else
              rr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            i = cf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Yr(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ve] = n;
            } else
              rr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = cf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
        }
        return Un(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), Gs(n, n.updateQueue), Mt(n), null);
      case 4:
        return me(), t === null && Sd(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Pa(n.type), Mt(n), null;
      case 19:
        if (U(qt), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) ro(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = zs(t), h !== null) {
                  for (n.flags |= 128, ro(o, !1), t = h.updateQueue, n.updateQueue = t, Gs(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    zp(i, t), i = i.sibling;
                  return Q(
                    qt,
                    qt.current & 1 | 2
                  ), it && Fa(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Pe() > Qs && (n.flags |= 128, f = !0, ro(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = zs(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, Gs(n, t), ro(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !it)
                return Mt(n), null;
            } else
              2 * Pe() - o.renderingStartTime > Qs && i !== 536870912 && (n.flags |= 128, f = !0, ro(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Pe(), t.sibling = null, i = qt.current, Q(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && Fa(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return Un(n), _f(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && Gs(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && U(sr), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Pa(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function d_(t, n) {
    switch (sf(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Pa(Gt), me(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Te(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Un(n), n.alternate === null)
            throw Error(l(340));
          rr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (Un(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          rr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return U(qt), null;
      case 4:
        return me(), null;
      case 10:
        return Pa(n.type), null;
      case 22:
      case 23:
        return Un(n), _f(), t !== null && U(sr), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Pa(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function r0(t, n) {
    switch (sf(n), n.tag) {
      case 3:
        Pa(Gt), me();
        break;
      case 26:
      case 27:
      case 5:
        Te(n);
        break;
      case 4:
        me();
        break;
      case 31:
        n.memoizedState !== null && Un(n);
        break;
      case 13:
        Un(n);
        break;
      case 19:
        U(qt);
        break;
      case 10:
        Pa(n.type);
        break;
      case 22:
      case 23:
        Un(n), _f(), t !== null && U(sr);
        break;
      case 24:
        Pa(Gt);
    }
  }
  function lo(t, n) {
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
  function Ai(t, n, i) {
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
              var q = i, re = M;
              try {
                re();
              } catch (fe) {
                wt(
                  f,
                  q,
                  fe
                );
              }
            }
          }
          o = o.next;
        } while (o !== h);
      }
    } catch (fe) {
      wt(n, n.return, fe);
    }
  }
  function l0(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        Qp(n, i);
      } catch (o) {
        wt(t, t.return, o);
      }
    }
  }
  function o0(t, n, i) {
    i.props = hr(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      wt(t, n, o);
    }
  }
  function oo(t, n) {
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
  function s0(t) {
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
  function td(t, n, i) {
    try {
      var o = t.stateNode;
      j_(o, t.type, i, n), o[we] = n;
    } catch (f) {
      wt(t, t.return, f);
    }
  }
  function u0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Bi(t.type) || t.tag === 4;
  }
  function nd(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || u0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Bi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ad(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Ya));
    else if (o !== 4 && (o === 27 && Bi(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (ad(t, n, i), t = t.sibling; t !== null; )
        ad(t, n, i), t = t.sibling;
  }
  function Xs(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && Bi(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (Xs(t, n, i), t = t.sibling; t !== null; )
        Xs(t, n, i), t = t.sibling;
  }
  function c0(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      un(n, o, i), n[ve] = t, n[we] = i;
    } catch (h) {
      wt(t, t.return, h);
    }
  }
  var ei = !1, Zt = !1, id = !1, f0 = typeof WeakSet == "function" ? WeakSet : Set, tn = null;
  function h_(t, n) {
    if (t = t.containerInfo, Nd = hu, t = _p(t), Qc(t)) {
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
            var w = 0, M = -1, q = -1, re = 0, fe = 0, he = t, le = null;
            t: for (; ; ) {
              for (var ue; he !== i || f !== 0 && he.nodeType !== 3 || (M = w + f), he !== h || o !== 0 && he.nodeType !== 3 || (q = w + o), he.nodeType === 3 && (w += he.nodeValue.length), (ue = he.firstChild) !== null; )
                le = he, he = ue;
              for (; ; ) {
                if (he === t) break t;
                if (le === i && ++re === f && (M = w), le === h && ++fe === o && (q = w), (ue = he.nextSibling) !== null) break;
                he = le, le = he.parentNode;
              }
              he = ue;
            }
            i = M === -1 || q === -1 ? null : { start: M, end: q };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Cd = { focusedElem: t, selectionRange: i }, hu = !1, tn = n; tn !== null; )
      if (n = tn, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, tn = t;
      else
        for (; tn !== null; ) {
          switch (n = tn, h = n.alternate, t = n.flags, n.tag) {
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
                  var Ne = hr(
                    i.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    Ne,
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
                  Md(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Md(t);
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
  function d0(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ni(t, i), o & 4 && lo(5, i);
        break;
      case 1:
        if (ni(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (w) {
              wt(i, i.return, w);
            }
          else {
            var f = hr(
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
        o & 64 && l0(i), o & 512 && oo(i, i.return);
        break;
      case 3:
        if (ni(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            Qp(t, n);
          } catch (w) {
            wt(i, i.return, w);
          }
        }
        break;
      case 27:
        n === null && o & 4 && c0(i);
      case 26:
      case 5:
        ni(t, i), n === null && o & 4 && s0(i), o & 512 && oo(i, i.return);
        break;
      case 12:
        ni(t, i);
        break;
      case 31:
        ni(t, i), o & 4 && p0(t, i);
        break;
      case 13:
        ni(t, i), o & 4 && g0(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = S_.bind(
          null,
          i
        ), $_(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || ei, !o) {
          n = n !== null && n.memoizedState !== null || Zt, f = ei;
          var h = Zt;
          ei = o, (Zt = n) && !h ? ai(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ni(t, i), ei = f, Zt = h;
        }
        break;
      case 30:
        break;
      default:
        ni(t, i);
    }
  }
  function h0(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, h0(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && rt(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, Nn = !1;
  function ti(t, n, i) {
    for (i = i.child; i !== null; )
      m0(t, n, i), i = i.sibling;
  }
  function m0(t, n, i) {
    if (Qt && typeof Qt.onCommitFiberUnmount == "function")
      try {
        Qt.onCommitFiberUnmount(nn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Zt || Ta(i, n), ti(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Zt || Ta(i, n);
        var o = Dt, f = Nn;
        Bi(i.type) && (Dt = i.stateNode, Nn = !1), ti(
          t,
          n,
          i
        ), yo(i.stateNode), Dt = o, Nn = f;
        break;
      case 5:
        Zt || Ta(i, n);
      case 6:
        if (o = Dt, f = Nn, Dt = null, ti(
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
        Dt !== null && (Nn ? (t = Dt, ly(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), fl(t)) : ly(Dt, i.stateNode));
        break;
      case 4:
        o = Dt, f = Nn, Dt = i.stateNode.containerInfo, Nn = !0, ti(
          t,
          n,
          i
        ), Dt = o, Nn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ai(2, i, n), Zt || Ai(4, i, n), ti(
          t,
          n,
          i
        );
        break;
      case 1:
        Zt || (Ta(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && o0(
          i,
          n,
          o
        )), ti(
          t,
          n,
          i
        );
        break;
      case 21:
        ti(
          t,
          n,
          i
        );
        break;
      case 22:
        Zt = (o = Zt) || i.memoizedState !== null, ti(
          t,
          n,
          i
        ), Zt = o;
        break;
      default:
        ti(
          t,
          n,
          i
        );
    }
  }
  function p0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        fl(t);
      } catch (i) {
        wt(n, n.return, i);
      }
    }
  }
  function g0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        fl(t);
      } catch (i) {
        wt(n, n.return, i);
      }
  }
  function m_(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new f0()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new f0()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function Fs(t, n) {
    var i = m_(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = __.bind(null, t, o);
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
              if (Bi(M.type)) {
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
        m0(h, w, f), Dt = null, Nn = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        y0(n, t), n = n.sibling;
  }
  var ma = null;
  function y0(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Cn(n, t), Rn(t), o & 4 && (Ai(3, t, t.return), lo(3, t), Ai(5, t, t.return));
        break;
      case 1:
        Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ta(i, i.return)), o & 64 && ei && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
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
                      )), un(h, o, i), h[ve] = t, at(h), o = h;
                      break e;
                    case "link":
                      var w = yy(
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
                      h = f.createElement(o), un(h, o, i), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (w = yy(
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
                      h = f.createElement(o), un(h, o, i), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[ve] = t, at(h), o = h;
                }
                t.stateNode = o;
              } else
                vy(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = gy(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : h.count--, o === null ? vy(
              f,
              t.type,
              t.stateNode
            ) : gy(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && td(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ta(i, i.return)), i !== null && o & 4 && td(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Cn(n, t), Rn(t), o & 512 && (Zt || i === null || Ta(i, i.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            jr(f, "");
          } catch (Ne) {
            wt(t, t.return, Ne);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, td(
          t,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (id = !0);
        break;
      case 6:
        if (Cn(n, t), Rn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (Ne) {
            wt(t, t.return, Ne);
          }
        }
        break;
      case 3:
        if (uu = null, f = ma, ma = ou(n.containerInfo), Cn(n, t), ma = f, Rn(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            fl(n.containerInfo);
          } catch (Ne) {
            wt(t, t.return, Ne);
          }
        id && (id = !1, v0(t));
        break;
      case 4:
        o = ma, ma = ou(
          t.stateNode.containerInfo
        ), Cn(n, t), Rn(t), ma = o;
        break;
      case 12:
        Cn(n, t), Rn(t);
        break;
      case 31:
        Cn(n, t), Rn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Fs(t, o)));
        break;
      case 13:
        Cn(n, t), Rn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Ps = Pe()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Fs(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var q = i !== null && i.memoizedState !== null, re = ei, fe = Zt;
        if (ei = re || f, Zt = fe || q, Cn(n, t), Zt = fe, ei = re, Rn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || q || ei || Zt || mr(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                q = i = n;
                try {
                  if (h = q.stateNode, f)
                    w = h.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    M = q.stateNode;
                    var he = q.memoizedProps.style, le = he != null && he.hasOwnProperty("display") ? he.display : null;
                    M.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (Ne) {
                  wt(q, q.return, Ne);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                q = n;
                try {
                  q.stateNode.nodeValue = f ? "" : q.memoizedProps;
                } catch (Ne) {
                  wt(q, q.return, Ne);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                q = n;
                try {
                  var ue = q.stateNode;
                  f ? oy(ue, !0) : oy(q.stateNode, !1);
                } catch (Ne) {
                  wt(q, q.return, Ne);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Fs(t, i))));
        break;
      case 19:
        Cn(n, t), Rn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Fs(t, o)));
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
          if (u0(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, h = nd(t);
            Xs(t, h, f);
            break;
          case 5:
            var w = i.stateNode;
            i.flags & 32 && (jr(w, ""), i.flags &= -33);
            var M = nd(t);
            Xs(t, M, w);
            break;
          case 3:
          case 4:
            var q = i.stateNode.containerInfo, re = nd(t);
            ad(
              t,
              re,
              q
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (fe) {
        wt(t, t.return, fe);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function v0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        v0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function ni(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        d0(t, n.alternate, n), n = n.sibling;
  }
  function mr(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ai(4, n, n.return), mr(n);
          break;
        case 1:
          Ta(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && o0(
            n,
            n.return,
            i
          ), mr(n);
          break;
        case 27:
          yo(n.stateNode);
        case 26:
        case 5:
          Ta(n, n.return), mr(n);
          break;
        case 22:
          n.memoizedState === null && mr(n);
          break;
        case 30:
          mr(n);
          break;
        default:
          mr(n);
      }
      t = t.sibling;
    }
  }
  function ai(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, h = n, w = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ai(
            f,
            h,
            i
          ), lo(4, h);
          break;
        case 1:
          if (ai(
            f,
            h,
            i
          ), o = h, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (re) {
              wt(o, o.return, re);
            }
          if (o = h, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var q = f.shared.hiddenCallbacks;
              if (q !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < q.length; f++)
                  Pp(q[f], M);
            } catch (re) {
              wt(o, o.return, re);
            }
          }
          i && w & 64 && l0(h), oo(h, h.return);
          break;
        case 27:
          c0(h);
        case 26:
        case 5:
          ai(
            f,
            h,
            i
          ), i && o === null && w & 4 && s0(h), oo(h, h.return);
          break;
        case 12:
          ai(
            f,
            h,
            i
          );
          break;
        case 31:
          ai(
            f,
            h,
            i
          ), i && w & 4 && p0(f, h);
          break;
        case 13:
          ai(
            f,
            h,
            i
          ), i && w & 4 && g0(f, h);
          break;
        case 22:
          h.memoizedState === null && ai(
            f,
            h,
            i
          ), oo(h, h.return);
          break;
        case 30:
          break;
        default:
          ai(
            f,
            h,
            i
          );
      }
      n = n.sibling;
    }
  }
  function rd(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Fl(i));
  }
  function ld(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Fl(t));
  }
  function pa(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        b0(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function b0(t, n, i, o) {
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
        ), f & 2048 && lo(9, n);
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
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Fl(t)));
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
        ) : so(t, n) : h._visibility & 2 ? pa(
          t,
          n,
          i,
          o
        ) : (h._visibility |= 2, el(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && rd(w, n);
        break;
      case 24:
        pa(
          t,
          n,
          i,
          o
        ), f & 2048 && ld(n.alternate, n);
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
  function el(t, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, w = n, M = i, q = o, re = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          el(
            h,
            w,
            M,
            q,
            f
          ), lo(8, w);
          break;
        case 23:
          break;
        case 22:
          var fe = w.stateNode;
          w.memoizedState !== null ? fe._visibility & 2 ? el(
            h,
            w,
            M,
            q,
            f
          ) : so(
            h,
            w
          ) : (fe._visibility |= 2, el(
            h,
            w,
            M,
            q,
            f
          )), f && re & 2048 && rd(
            w.alternate,
            w
          );
          break;
        case 24:
          el(
            h,
            w,
            M,
            q,
            f
          ), f && re & 2048 && ld(w.alternate, w);
          break;
        default:
          el(
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
  function so(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            so(i, o), f & 2048 && rd(
              o.alternate,
              o
            );
            break;
          case 24:
            so(i, o), f & 2048 && ld(o.alternate, o);
            break;
          default:
            so(i, o);
        }
        n = n.sibling;
      }
  }
  var uo = 8192;
  function tl(t, n, i) {
    if (t.subtreeFlags & uo)
      for (t = t.child; t !== null; )
        x0(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function x0(t, n, i) {
    switch (t.tag) {
      case 26:
        tl(
          t,
          n,
          i
        ), t.flags & uo && t.memoizedState !== null && eE(
          i,
          ma,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        tl(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = ma;
        ma = ou(t.stateNode.containerInfo), tl(
          t,
          n,
          i
        ), ma = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = uo, uo = 16777216, tl(
          t,
          n,
          i
        ), uo = o) : tl(
          t,
          n,
          i
        ));
        break;
      default:
        tl(
          t,
          n,
          i
        );
    }
  }
  function w0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function co(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, _0(
            o,
            t
          );
        }
      w0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        S0(t), t = t.sibling;
  }
  function S0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        co(t), t.flags & 2048 && Ai(9, t, t.return);
        break;
      case 3:
        co(t);
        break;
      case 12:
        co(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, Zs(t)) : co(t);
        break;
      default:
        co(t);
    }
  }
  function Zs(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, _0(
            o,
            t
          );
        }
      w0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Ai(8, n, n.return), Zs(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, Zs(n));
          break;
        default:
          Zs(n);
      }
      t = t.sibling;
    }
  }
  function _0(t, n) {
    for (; tn !== null; ) {
      var i = tn;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ai(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Fl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, tn = o;
      else
        e: for (i = t; tn !== null; ) {
          o = tn;
          var f = o.sibling, h = o.return;
          if (h0(o), o === i) {
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
  var p_ = {
    getCacheForType: function(t) {
      var n = on(Gt), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return on(Gt).controller.signal;
    }
  }, g_ = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Rt = null, Qe = null, et = 0, xt = 0, Vn = null, zi = !1, nl = !1, od = !1, ii = 0, Bt = 0, Oi = 0, pr = 0, sd = 0, qn = 0, al = 0, fo = null, Tn = null, ud = !1, Ps = 0, E0 = 0, Qs = 1 / 0, Ks = null, ji = null, Jt = 0, Li = null, il = null, ri = 0, cd = 0, fd = null, N0 = null, ho = 0, dd = null;
  function $n() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : T.T !== null ? vd() : pe();
  }
  function C0() {
    if (qn === 0)
      if ((et & 536870912) === 0 || it) {
        var t = On;
        On <<= 1, (On & 3932160) === 0 && (On = 262144), qn = t;
      } else qn = 536870912;
    return t = Bn.current, t !== null && (t.flags |= 32), qn;
  }
  function Mn(t, n, i) {
    (t === Rt && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null) && (rl(t, 0), Hi(
      t,
      et,
      qn,
      !1
    )), pt(t, i), ((ht & 2) === 0 || t !== Rt) && (t === Rt && ((ht & 2) === 0 && (pr |= i), Bt === 4 && Hi(
      t,
      et,
      qn,
      !1
    )), Ma(t));
  }
  function R0(t, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || vt(t, n), f = o ? b_(t, n) : md(t, n, !0), h = o;
    do {
      if (f === 0) {
        nl && !o && Hi(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, h && !y_(i)) {
          f = md(t, n, !1), h = !1;
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
              f = fo;
              var q = M.current.memoizedState.isDehydrated;
              if (q && (rl(M, w).flags |= 256), w = md(
                M,
                w,
                !1
              ), w !== 2) {
                if (od && !q) {
                  M.errorRecoveryDisabledLanes |= h, pr |= h, f = 4;
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
          rl(t, 0), Hi(t, n, 0, !0);
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
              Hi(
                o,
                n,
                qn,
                !zi
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
          if ((n & 62914560) === n && (f = Ps + 300 - Pe(), 10 < f)) {
            if (Hi(
              o,
              n,
              qn,
              !zi
            ), He(o, 0, !0) !== 0) break e;
            ri = n, o.timeoutHandle = iy(
              T0.bind(
                null,
                o,
                i,
                Tn,
                Ks,
                ud,
                n,
                qn,
                pr,
                al,
                zi,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          T0(
            o,
            i,
            Tn,
            Ks,
            ud,
            n,
            qn,
            pr,
            al,
            zi,
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
  function T0(t, n, i, o, f, h, w, M, q, re, fe, he, le, ue) {
    if (t.timeoutHandle = -1, he = n.subtreeFlags, he & 8192 || (he & 16785408) === 16785408) {
      he = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ya
      }, x0(
        n,
        h,
        he
      );
      var Ne = (h & 62914560) === h ? Ps - Pe() : (h & 4194048) === h ? E0 - Pe() : 0;
      if (Ne = tE(
        he,
        Ne
      ), Ne !== null) {
        ri = h, t.cancelPendingCommit = Ne(
          H0.bind(
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
            fe,
            he,
            null,
            le,
            ue
          )
        ), Hi(t, h, w, !re);
        return;
      }
    }
    H0(
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
  function y_(t) {
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
  function Hi(t, n, i, o) {
    n &= ~sd, n &= ~pr, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), w = 1 << h;
      o[h] = -1, f &= ~w;
    }
    i !== 0 && ca(t, i, n);
  }
  function Js() {
    return (ht & 6) === 0 ? (mo(0), !1) : !0;
  }
  function hd() {
    if (Qe !== null) {
      if (xt === 0)
        var t = Qe.return;
      else
        t = Qe, Za = lr = null, Mf(t), Pr = null, Pl = 0, t = Qe;
      for (; t !== null; )
        r0(t.alternate, t), t = t.return;
      Qe = null;
    }
  }
  function rl(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, k_(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), ri = 0, hd(), Rt = t, Qe = i = Xa(t.current, null), et = n, xt = 0, Vn = null, zi = !1, nl = vt(t, n), od = !1, al = qn = sd = pr = Oi = Bt = 0, Tn = fo = null, ud = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return ii = n, bs(), i;
  }
  function M0(t, n) {
    qe = null, T.H = ao, n === Zr || n === Rs ? (n = Gp(), xt = 3) : n === yf ? (n = Gp(), xt = 4) : xt = n === Gf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Vn = n, Qe === null && (Bt = 1, qs(
      t,
      Qn(n, t.current)
    ));
  }
  function D0() {
    var t = Bn.current;
    return t === null ? !0 : (et & 4194048) === et ? ea === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === ea : !1;
  }
  function A0() {
    var t = T.H;
    return T.H = ao, t === null ? ao : t;
  }
  function z0() {
    var t = T.A;
    return T.A = p_, t;
  }
  function Ws() {
    Bt = 4, zi || (et & 4194048) !== et && Bn.current !== null || (nl = !0), (Oi & 134217727) === 0 && (pr & 134217727) === 0 || Rt === null || Hi(
      Rt,
      et,
      qn,
      !1
    );
  }
  function md(t, n, i) {
    var o = ht;
    ht |= 2;
    var f = A0(), h = z0();
    (Rt !== t || et !== n) && (Ks = null, rl(t, n)), n = !1;
    var w = Bt;
    e: do
      try {
        if (xt !== 0 && Qe !== null) {
          var M = Qe, q = Vn;
          switch (xt) {
            case 8:
              hd(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Bn.current === null && (n = !0);
              var re = xt;
              if (xt = 0, Vn = null, ll(t, M, q, re), i && nl) {
                w = 0;
                break e;
              }
              break;
            default:
              re = xt, xt = 0, Vn = null, ll(t, M, q, re);
          }
        }
        v_(), w = Bt;
        break;
      } catch (fe) {
        M0(t, fe);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Za = lr = null, ht = o, T.H = f, T.A = h, Qe === null && (Rt = null, et = 0, bs()), w;
  }
  function v_() {
    for (; Qe !== null; ) O0(Qe);
  }
  function b_(t, n) {
    var i = ht;
    ht |= 2;
    var o = A0(), f = z0();
    Rt !== t || et !== n ? (Ks = null, Qs = Pe() + 500, rl(t, n)) : nl = vt(
      t,
      n
    );
    e: do
      try {
        if (xt !== 0 && Qe !== null) {
          n = Qe;
          var h = Vn;
          t: switch (xt) {
            case 1:
              xt = 0, Vn = null, ll(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (Ip(h)) {
                xt = 0, Vn = null, j0(n);
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
              Ip(h) ? (xt = 0, Vn = null, j0(n)) : (xt = 0, Vn = null, ll(t, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (Qe.tag) {
                case 26:
                  w = Qe.memoizedState;
                case 5:
                case 27:
                  var M = Qe;
                  if (w ? by(w) : M.stateNode.complete) {
                    xt = 0, Vn = null;
                    var q = M.sibling;
                    if (q !== null) Qe = q;
                    else {
                      var re = M.return;
                      re !== null ? (Qe = re, eu(re)) : Qe = null;
                    }
                    break t;
                  }
              }
              xt = 0, Vn = null, ll(t, n, h, 5);
              break;
            case 6:
              xt = 0, Vn = null, ll(t, n, h, 6);
              break;
            case 8:
              hd(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        x_();
        break;
      } catch (fe) {
        M0(t, fe);
      }
    while (!0);
    return Za = lr = null, T.H = o, T.A = f, ht = i, Qe !== null ? 0 : (Rt = null, et = 0, bs(), Bt);
  }
  function x_() {
    for (; Qe !== null && !Je(); )
      O0(Qe);
  }
  function O0(t) {
    var n = a0(t.alternate, t, ii);
    t.memoizedProps = t.pendingProps, n === null ? eu(t) : Qe = n;
  }
  function j0(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Kg(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = Kg(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        Mf(n);
      default:
        r0(i, n), n = Qe = zp(n, ii), n = a0(i, n, ii);
    }
    t.memoizedProps = t.pendingProps, n === null ? eu(t) : Qe = n;
  }
  function ll(t, n, i, o) {
    Za = lr = null, Mf(n), Pr = null, Pl = 0;
    var f = n.return;
    try {
      if (s_(
        t,
        f,
        n,
        i,
        et
      )) {
        Bt = 1, qs(
          t,
          Qn(i, t.current)
        ), Qe = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Qe = f, h;
      Bt = 1, qs(
        t,
        Qn(i, t.current)
      ), Qe = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : nl || (et & 536870912) !== 0 ? t = !1 : (zi = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Bn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), L0(n, t)) : eu(n);
  }
  function eu(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        L0(
          n,
          zi
        );
        return;
      }
      t = n.return;
      var i = f_(
        n.alternate,
        n,
        ii
      );
      if (i !== null) {
        Qe = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Qe = n;
        return;
      }
      Qe = n = t;
    } while (n !== null);
    Bt === 0 && (Bt = 5);
  }
  function L0(t, n) {
    do {
      var i = d_(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, Qe = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        Qe = t;
        return;
      }
      Qe = t = i;
    } while (t !== null);
    Bt = 6, Qe = null;
  }
  function H0(t, n, i, o, f, h, w, M, q) {
    t.cancelPendingCommit = null;
    do
      tu();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= tf, Kt(
        t,
        i,
        h,
        w,
        M,
        q
      ), t === Rt && (Qe = Rt = null, et = 0), il = n, Li = t, ri = i, cd = h, fd = f, N0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, E_(Lt, function() {
        return q0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = T.T, T.T = null, f = L.p, L.p = 2, w = ht, ht |= 4;
        try {
          h_(t, n, i);
        } finally {
          ht = w, L.p = f, T.T = o;
        }
      }
      Jt = 1, k0(), B0(), U0();
    }
  }
  function k0() {
    if (Jt === 1) {
      Jt = 0;
      var t = Li, n = il, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          y0(n, t);
          var h = Cd, w = _p(t.containerInfo), M = h.focusedElem, q = h.selectionRange;
          if (w !== M && M && M.ownerDocument && Sp(
            M.ownerDocument.documentElement,
            M
          )) {
            if (q !== null && Qc(M)) {
              var re = q.start, fe = q.end;
              if (fe === void 0 && (fe = re), "selectionStart" in M)
                M.selectionStart = re, M.selectionEnd = Math.min(
                  fe,
                  M.value.length
                );
              else {
                var he = M.ownerDocument || document, le = he && he.defaultView || window;
                if (le.getSelection) {
                  var ue = le.getSelection(), Ne = M.textContent.length, Le = Math.min(q.start, Ne), Nt = q.end === void 0 ? Le : Math.min(q.end, Ne);
                  !ue.extend && Le > Nt && (w = Nt, Nt = Le, Le = w);
                  var J = wp(
                    M,
                    Le
                  ), X = wp(
                    M,
                    Nt
                  );
                  if (J && X && (ue.rangeCount !== 1 || ue.anchorNode !== J.node || ue.anchorOffset !== J.offset || ue.focusNode !== X.node || ue.focusOffset !== X.offset)) {
                    var ie = he.createRange();
                    ie.setStart(J.node, J.offset), ue.removeAllRanges(), Le > Nt ? (ue.addRange(ie), ue.extend(X.node, X.offset)) : (ie.setEnd(X.node, X.offset), ue.addRange(ie));
                  }
                }
              }
            }
            for (he = [], ue = M; ue = ue.parentNode; )
              ue.nodeType === 1 && he.push({
                element: ue,
                left: ue.scrollLeft,
                top: ue.scrollTop
              });
            for (typeof M.focus == "function" && M.focus(), M = 0; M < he.length; M++) {
              var de = he[M];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          hu = !!Nd, Cd = Nd = null;
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      t.current = n, Jt = 2;
    }
  }
  function B0() {
    if (Jt === 2) {
      Jt = 0;
      var t = Li, n = il, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          d0(t, n.alternate, n);
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      Jt = 3;
    }
  }
  function U0() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Ze();
      var t = Li, n = il, i = ri, o = N0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, il = Li = null, V0(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (ji = null), W(i), n = n.stateNode, Qt && typeof Qt.onCommitFiberRoot == "function")
        try {
          Qt.onCommitFiberRoot(
            nn,
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
      (ri & 3) !== 0 && tu(), Ma(t), f = t.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? t === dd ? ho++ : (ho = 0, dd = t) : ho = 0, mo(0);
    }
  }
  function V0(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Fl(n)));
  }
  function tu() {
    return k0(), B0(), U0(), q0();
  }
  function q0() {
    if (Jt !== 5) return !1;
    var t = Li, n = cd;
    cd = 0;
    var i = W(ri), o = T.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, T.T = null, i = fd, fd = null;
      var h = Li, w = ri;
      if (Jt = 0, il = Li = null, ri = 0, (ht & 6) !== 0) throw Error(l(331));
      var M = ht;
      if (ht |= 4, S0(h.current), b0(
        h,
        h.current,
        w,
        i
      ), ht = M, mo(0, !1), Qt && typeof Qt.onPostCommitFiberRoot == "function")
        try {
          Qt.onPostCommitFiberRoot(nn, h);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, T.T = o, V0(t, n);
    }
  }
  function $0(t, n, i) {
    n = Qn(i, n), n = Yf(t.stateNode, n, 2), t = Ti(t, n, 2), t !== null && (pt(t, 2), Ma(t));
  }
  function wt(t, n, i) {
    if (t.tag === 3)
      $0(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          $0(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ji === null || !ji.has(o))) {
            t = Qn(i, t), i = Ig(2), o = Ti(n, i, 2), o !== null && (Yg(
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
  function pd(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new g_();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (od = !0, f.add(i), t = w_.bind(null, t, n, i), n.then(t, t));
  }
  function w_(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Rt === t && (et & i) === i && (Bt === 4 || Bt === 3 && (et & 62914560) === et && 300 > Pe() - Ps ? (ht & 2) === 0 && rl(t, 0) : sd |= i, al === et && (al = 0)), Ma(t);
  }
  function I0(t, n) {
    n === 0 && (n = Vt()), t = ar(t, n), t !== null && (pt(t, n), Ma(t));
  }
  function S_(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), I0(t, i);
  }
  function __(t, n) {
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
    o !== null && o.delete(n), I0(t, i);
  }
  function E_(t, n) {
    return Ie(t, n);
  }
  var nu = null, ol = null, gd = !1, au = !1, yd = !1, ki = 0;
  function Ma(t) {
    t !== ol && t.next === null && (ol === null ? nu = ol = t : ol = ol.next = t), au = !0, gd || (gd = !0, C_());
  }
  function mo(t, n) {
    if (!yd && au) {
      yd = !0;
      do
        for (var i = !1, o = nu; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var w = o.suspendedLanes, M = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(w & ~M), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (i = !0, F0(o, h));
          } else
            h = et, h = He(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || vt(o, h) || (i = !0, F0(o, h));
          o = o.next;
        }
      while (i);
      yd = !1;
    }
  }
  function N_() {
    Y0();
  }
  function Y0() {
    au = gd = !1;
    var t = 0;
    ki !== 0 && H_() && (t = ki);
    for (var n = Pe(), i = null, o = nu; o !== null; ) {
      var f = o.next, h = G0(o, n);
      h === 0 ? (o.next = null, i === null ? nu = f : i.next = f, f === null && (ol = i)) : (i = o, (t !== 0 || (h & 3) !== 0) && (au = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || mo(t), ki !== 0 && (ki = 0);
  }
  function G0(t, n) {
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
      return o = X0.bind(null, t), i = Ie(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && St(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function X0(t, n) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (tu() && t.callbackNode !== i)
      return null;
    var o = et;
    return o = He(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (R0(t, o, n), G0(t, Pe()), t.callbackNode != null && t.callbackNode === i ? X0.bind(null, t) : null);
  }
  function F0(t, n) {
    if (tu()) return null;
    R0(t, n, !0);
  }
  function C_() {
    B_(function() {
      (ht & 6) !== 0 ? Ie(
        yt,
        N_
      ) : Y0();
    });
  }
  function vd() {
    if (ki === 0) {
      var t = Xr;
      t === 0 && (t = ua, ua <<= 1, (ua & 261888) === 0 && (ua = 256)), ki = t;
    }
    return ki;
  }
  function Z0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : fs("" + t);
  }
  function P0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function R_(t, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var h = Z0(
        (f[we] || null).action
      ), w = o.submitter;
      w && (n = (n = w[we] || null) ? Z0(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var M = new ps(
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
                if (ki !== 0) {
                  var q = w ? P0(f, w) : new FormData(f);
                  Bf(
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
                typeof h == "function" && (M.preventDefault(), q = w ? P0(f, w) : new FormData(f), Bf(
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
  for (var bd = 0; bd < ef.length; bd++) {
    var xd = ef[bd], T_ = xd.toLowerCase(), M_ = xd[0].toUpperCase() + xd.slice(1);
    ha(
      T_,
      "on" + M_
    );
  }
  ha(Cp, "onAnimationEnd"), ha(Rp, "onAnimationIteration"), ha(Tp, "onAnimationStart"), ha("dblclick", "onDoubleClick"), ha("focusin", "onFocus"), ha("focusout", "onBlur"), ha(GS, "onTransitionRun"), ha(XS, "onTransitionStart"), ha(FS, "onTransitionCancel"), ha(Mp, "onTransitionEnd"), an("onMouseEnter", ["mouseout", "mouseover"]), an("onMouseLeave", ["mouseout", "mouseover"]), an("onPointerEnter", ["pointerout", "pointerover"]), an("onPointerLeave", ["pointerout", "pointerover"]), fn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), fn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), fn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), fn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), fn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), fn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var po = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), D_ = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(po)
  );
  function Q0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], f = o.event;
      o = o.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var w = o.length - 1; 0 <= w; w--) {
            var M = o[w], q = M.instance, re = M.currentTarget;
            if (M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = re;
            try {
              h(f);
            } catch (fe) {
              vs(fe);
            }
            f.currentTarget = null, h = q;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (M = o[w], q = M.instance, re = M.currentTarget, M = M.listener, q !== h && f.isPropagationStopped())
              break e;
            h = M, f.currentTarget = re;
            try {
              h(f);
            } catch (fe) {
              vs(fe);
            }
            f.currentTarget = null, h = q;
          }
      }
    }
  }
  function Ke(t, n) {
    var i = n[De];
    i === void 0 && (i = n[De] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (K0(n, t, 2, !1), i.add(o));
  }
  function wd(t, n, i) {
    var o = 0;
    n && (o |= 4), K0(
      i,
      t,
      o,
      n
    );
  }
  var iu = "_reactListening" + Math.random().toString(36).slice(2);
  function Sd(t) {
    if (!t[iu]) {
      t[iu] = !0, Na.forEach(function(i) {
        i !== "selectionchange" && (D_.has(i) || wd(i, !1, t), wd(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[iu] || (n[iu] = !0, wd("selectionchange", !1, n));
    }
  }
  function K0(t, n, i, o) {
    switch (Cy(n)) {
      case 2:
        var f = iE;
        break;
      case 8:
        f = rE;
        break;
      default:
        f = kd;
    }
    i = f.bind(
      null,
      n,
      i,
      t
    ), f = void 0, !qc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, i, {
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
    np(function() {
      var re = h, fe = Uc(i), he = [];
      e: {
        var le = Dp.get(t);
        if (le !== void 0) {
          var ue = ps, Ne = t;
          switch (t) {
            case "keypress":
              if (hs(i) === 0) break e;
            case "keydown":
            case "keyup":
              ue = _S;
              break;
            case "focusin":
              Ne = "focus", ue = Gc;
              break;
            case "focusout":
              Ne = "blur", ue = Gc;
              break;
            case "beforeblur":
            case "afterblur":
              ue = Gc;
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
              ue = rp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ue = fS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ue = CS;
              break;
            case Cp:
            case Rp:
            case Tp:
              ue = mS;
              break;
            case Mp:
              ue = TS;
              break;
            case "scroll":
            case "scrollend":
              ue = uS;
              break;
            case "wheel":
              ue = DS;
              break;
            case "copy":
            case "cut":
            case "paste":
              ue = gS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ue = op;
              break;
            case "toggle":
            case "beforetoggle":
              ue = zS;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (t === "scroll" || t === "scrollend"), J = Le ? le !== null ? le + "Capture" : null : le;
          Le = [];
          for (var X = re, ie; X !== null; ) {
            var de = X;
            if (ie = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || ie === null || J === null || (de = Hl(X, J), de != null && Le.push(
              go(X, de, ie)
            )), Nt) break;
            X = X.return;
          }
          0 < Le.length && (le = new ue(
            le,
            Ne,
            null,
            i,
            fe
          ), he.push({ event: le, listeners: Le }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = t === "mouseover" || t === "pointerover", ue = t === "mouseout" || t === "pointerout", le && i !== Bc && (Ne = i.relatedTarget || i.fromElement) && (Ct(Ne) || Ne[be]))
            break e;
          if ((ue || le) && (le = fe.window === fe ? fe : (le = fe.ownerDocument) ? le.defaultView || le.parentWindow : window, ue ? (Ne = i.relatedTarget || i.toElement, ue = re, Ne = Ne ? Ct(Ne) : null, Ne !== null && (Nt = u(Ne), Le = Ne.tag, Ne !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (Ne = null)) : (ue = null, Ne = re), ue !== Ne)) {
            if (Le = rp, de = "onMouseLeave", J = "onMouseEnter", X = "mouse", (t === "pointerout" || t === "pointerover") && (Le = op, de = "onPointerLeave", J = "onPointerEnter", X = "pointer"), Nt = ue == null ? le : We(ue), ie = Ne == null ? le : We(Ne), le = new Le(
              de,
              X + "leave",
              ue,
              i,
              fe
            ), le.target = Nt, le.relatedTarget = ie, de = null, Ct(fe) === re && (Le = new Le(
              J,
              X + "enter",
              Ne,
              i,
              fe
            ), Le.target = ie, Le.relatedTarget = Nt, de = Le), Nt = de, ue && Ne)
              t: {
                for (Le = A_, J = ue, X = Ne, ie = 0, de = J; de; de = Le(de))
                  ie++;
                de = 0;
                for (var Oe = X; Oe; Oe = Le(Oe))
                  de++;
                for (; 0 < ie - de; )
                  J = Le(J), ie--;
                for (; 0 < de - ie; )
                  X = Le(X), de--;
                for (; ie--; ) {
                  if (J === X || X !== null && J === X.alternate) {
                    Le = J;
                    break t;
                  }
                  J = Le(J), X = Le(X);
                }
                Le = null;
              }
            else Le = null;
            ue !== null && J0(
              he,
              le,
              ue,
              Le,
              !1
            ), Ne !== null && Nt !== null && J0(
              he,
              Nt,
              Ne,
              Le,
              !0
            );
          }
        }
        e: {
          if (le = re ? We(re) : window, ue = le.nodeName && le.nodeName.toLowerCase(), ue === "select" || ue === "input" && le.type === "file")
            var ut = pp;
          else if (hp(le))
            if (gp)
              ut = $S;
            else {
              ut = VS;
              var Ce = US;
            }
          else
            ue = le.nodeName, !ue || ue.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? re && kc(re.elementType) && (ut = pp) : ut = qS;
          if (ut && (ut = ut(t, re))) {
            mp(
              he,
              ut,
              i,
              fe
            );
            break e;
          }
          Ce && Ce(t, le, re), t === "focusout" && re && le.type === "number" && re.memoizedProps.value != null && jl(le, "number", le.value);
        }
        switch (Ce = re ? We(re) : window, t) {
          case "focusin":
            (hp(Ce) || Ce.contentEditable === "true") && (Br = Ce, Kc = re, Yl = null);
            break;
          case "focusout":
            Yl = Kc = Br = null;
            break;
          case "mousedown":
            Jc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jc = !1, Ep(he, i, fe);
            break;
          case "selectionchange":
            if (YS) break;
          case "keydown":
          case "keyup":
            Ep(he, i, fe);
        }
        var Ye;
        if (Fc)
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
          kr ? fp(t, i) && (tt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (sp && i.locale !== "ko" && (kr || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && kr && (Ye = ap()) : (wi = fe, $c = "value" in wi ? wi.value : wi.textContent, kr = !0)), Ce = ru(re, tt), 0 < Ce.length && (tt = new lp(
          tt,
          t,
          null,
          i,
          fe
        ), he.push({ event: tt, listeners: Ce }), Ye ? tt.data = Ye : (Ye = dp(i), Ye !== null && (tt.data = Ye)))), (Ye = jS ? LS(t, i) : HS(t, i)) && (tt = ru(re, "onBeforeInput"), 0 < tt.length && (Ce = new lp(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          fe
        ), he.push({
          event: Ce,
          listeners: tt
        }), Ce.data = Ye)), R_(
          he,
          t,
          re,
          i,
          fe
        );
      }
      Q0(he, n);
    });
  }
  function go(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function ru(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = Hl(t, i), f != null && o.unshift(
        go(t, f, h)
      ), f = Hl(t, n), f != null && o.push(
        go(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function A_(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function J0(t, n, i, o, f) {
    for (var h = n._reactName, w = []; i !== null && i !== o; ) {
      var M = i, q = M.alternate, re = M.stateNode;
      if (M = M.tag, q !== null && q === o) break;
      M !== 5 && M !== 26 && M !== 27 || re === null || (q = re, f ? (re = Hl(i, h), re != null && w.unshift(
        go(i, re, q)
      )) : f || (re = Hl(i, h), re != null && w.push(
        go(i, re, q)
      ))), i = i.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var z_ = /\r\n?/g, O_ = /\u0000|\uFFFD/g;
  function W0(t) {
    return (typeof t == "string" ? t : "" + t).replace(z_, `
`).replace(O_, "");
  }
  function ey(t, n) {
    return n = W0(n), W0(t) === n;
  }
  function Et(t, n, i, o, f, h) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || jr(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && jr(t, "" + o);
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
        ep(t, o, h);
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
        o = fs("" + o), t.setAttribute(i, o);
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
          typeof h == "function" && (i === "formAction" ? (n !== "input" && Et(t, n, "name", f.name, f, null), Et(
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
          t.removeAttribute(i);
          break;
        }
        o = fs("" + o), t.setAttribute(i, o);
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
        i = fs("" + o), t.setAttributeNS(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = oS.get(i) || i, fa(t, i, o));
    }
  }
  function Ed(t, n, i, o, f, h) {
    switch (i) {
      case "style":
        ep(t, o, h);
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
        typeof o == "string" ? jr(t, o) : (typeof o == "number" || typeof o == "bigint") && jr(t, "" + o);
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
  function un(t, n, i) {
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
                  Et(t, n, h, w, i, null);
              }
          }
        f && Et(t, n, "srcSet", i.srcSet, i, null), o && Et(t, n, "src", i.src, i, null);
        return;
      case "input":
        Ke("invalid", t);
        var M = h = w = f = null, q = null, re = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var fe = i[o];
            if (fe != null)
              switch (o) {
                case "name":
                  f = fe;
                  break;
                case "type":
                  w = fe;
                  break;
                case "checked":
                  q = fe;
                  break;
                case "defaultChecked":
                  re = fe;
                  break;
                case "value":
                  h = fe;
                  break;
                case "defaultValue":
                  M = fe;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (fe != null)
                    throw Error(l(137, n));
                  break;
                default:
                  Et(t, n, o, fe, i, null);
              }
          }
        Or(
          t,
          h,
          M,
          q,
          re,
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
                Et(t, n, f, M, i, null);
            }
        n = h, i = w, t.multiple = !!o, n != null ? xi(t, !!o, n, !1) : i != null && xi(t, !!o, i, !0);
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
                Et(t, n, w, M, i, null);
            }
        Jm(t, o, f, h);
        return;
      case "option":
        for (q in i)
          if (i.hasOwnProperty(q) && (o = i[q], o != null))
            switch (q) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Et(t, n, q, o, i, null);
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
        for (o = 0; o < po.length; o++)
          Ke(po[o], t);
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
        for (re in i)
          if (i.hasOwnProperty(re) && (o = i[re], o != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                Et(t, n, re, o, i, null);
            }
        return;
      default:
        if (kc(n)) {
          for (fe in i)
            i.hasOwnProperty(fe) && (o = i[fe], o !== void 0 && Ed(
              t,
              n,
              fe,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (M in i)
      i.hasOwnProperty(M) && (o = i[M], o != null && Et(t, n, M, o, i, null));
  }
  function j_(t, n, i, o) {
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
        var f = null, h = null, w = null, M = null, q = null, re = null, fe = null;
        for (ue in i) {
          var he = i[ue];
          if (i.hasOwnProperty(ue) && he != null)
            switch (ue) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = he;
              default:
                o.hasOwnProperty(ue) || Et(t, n, ue, null, o, he);
            }
        }
        for (var le in o) {
          var ue = o[le];
          if (he = i[le], o.hasOwnProperty(le) && (ue != null || he != null))
            switch (le) {
              case "type":
                h = ue;
                break;
              case "name":
                f = ue;
                break;
              case "checked":
                re = ue;
                break;
              case "defaultChecked":
                fe = ue;
                break;
              case "value":
                w = ue;
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
                ue !== he && Et(
                  t,
                  n,
                  le,
                  ue,
                  o,
                  he
                );
            }
        }
        Wi(
          t,
          w,
          M,
          q,
          re,
          fe,
          h,
          f
        );
        return;
      case "select":
        ue = w = M = le = null;
        for (h in i)
          if (q = i[h], i.hasOwnProperty(h) && q != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                ue = q;
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
          if (h = o[f], q = i[f], o.hasOwnProperty(f) && (h != null || q != null))
            switch (f) {
              case "value":
                le = h;
                break;
              case "defaultValue":
                M = h;
                break;
              case "multiple":
                w = h;
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
        n = M, i = w, o = ue, le != null ? xi(t, !!i, le, !1) : !!o != !!i && (n != null ? xi(t, !!i, n, !0) : xi(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        ue = le = null;
        for (M in i)
          if (f = i[M], i.hasOwnProperty(M) && f != null && !o.hasOwnProperty(M))
            switch (M) {
              case "value":
                break;
              case "children":
                break;
              default:
                Et(t, n, M, null, o, f);
            }
        for (w in o)
          if (f = o[w], h = i[w], o.hasOwnProperty(w) && (f != null || h != null))
            switch (w) {
              case "value":
                le = f;
                break;
              case "defaultValue":
                ue = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(l(91));
                break;
              default:
                f !== h && Et(t, n, w, f, o, h);
            }
        Ll(t, le, ue);
        return;
      case "option":
        for (var Ne in i)
          if (le = i[Ne], i.hasOwnProperty(Ne) && le != null && !o.hasOwnProperty(Ne))
            switch (Ne) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  n,
                  Ne,
                  null,
                  o,
                  le
                );
            }
        for (q in o)
          if (le = o[q], ue = i[q], o.hasOwnProperty(q) && le !== ue && (le != null || ue != null))
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
                  ue
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
          le = i[Le], i.hasOwnProperty(Le) && le != null && !o.hasOwnProperty(Le) && Et(t, n, Le, null, o, le);
        for (re in o)
          if (le = o[re], ue = i[re], o.hasOwnProperty(re) && le !== ue && (le != null || ue != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(l(137, n));
                break;
              default:
                Et(
                  t,
                  n,
                  re,
                  le,
                  o,
                  ue
                );
            }
        return;
      default:
        if (kc(n)) {
          for (var Nt in i)
            le = i[Nt], i.hasOwnProperty(Nt) && le !== void 0 && !o.hasOwnProperty(Nt) && Ed(
              t,
              n,
              Nt,
              void 0,
              o,
              le
            );
          for (fe in o)
            le = o[fe], ue = i[fe], !o.hasOwnProperty(fe) || le === ue || le === void 0 && ue === void 0 || Ed(
              t,
              n,
              fe,
              le,
              o,
              ue
            );
          return;
        }
    }
    for (var J in i)
      le = i[J], i.hasOwnProperty(J) && le != null && !o.hasOwnProperty(J) && Et(t, n, J, null, o, le);
    for (he in o)
      le = o[he], ue = i[he], !o.hasOwnProperty(he) || le === ue || le == null && ue == null || Et(t, n, he, le, o, ue);
  }
  function ty(t) {
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
  function L_() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], h = f.transferSize, w = f.initiatorType, M = f.duration;
        if (h && M && ty(w)) {
          for (w = 0, M = f.responseEnd, o += 1; o < i.length; o++) {
            var q = i[o], re = q.startTime;
            if (re > M) break;
            var fe = q.transferSize, he = q.initiatorType;
            fe && ty(he) && (q = q.responseEnd, w += fe * (q < M ? 1 : (M - re) / (q - re)));
          }
          if (--o, n += 8 * (h + w) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Nd = null, Cd = null;
  function lu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function ny(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ay(t, n) {
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
  function Rd(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Td = null;
  function H_() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Td ? !1 : (Td = t, !0) : (Td = null, !1);
  }
  var iy = typeof setTimeout == "function" ? setTimeout : void 0, k_ = typeof clearTimeout == "function" ? clearTimeout : void 0, ry = typeof Promise == "function" ? Promise : void 0, B_ = typeof queueMicrotask == "function" ? queueMicrotask : typeof ry < "u" ? function(t) {
    return ry.resolve(null).then(t).catch(U_);
  } : iy;
  function U_(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Bi(t) {
    return t === "head";
  }
  function ly(t, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (t.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(f), fl(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          yo(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, yo(i);
          for (var h = i.firstChild; h; ) {
            var w = h.nextSibling, M = h.nodeName;
            h[Ge] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && h.rel.toLowerCase() === "stylesheet" || i.removeChild(h), h = w;
          }
        } else
          i === "body" && yo(t.ownerDocument.body);
      i = f;
    } while (i);
    fl(n);
  }
  function oy(t, n) {
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
  function Md(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Md(i), rt(i);
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
  function V_(t, n, i, o) {
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
  function q_(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ta(t.nextSibling), t === null)) return null;
    return t;
  }
  function sy(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ta(t.nextSibling), t === null)) return null;
    return t;
  }
  function Dd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ad(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function $_(t, n) {
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
  var zd = null;
  function uy(t) {
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
  function cy(t) {
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
  function fy(t, n, i) {
    switch (n = lu(i), t) {
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
  function yo(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    rt(t);
  }
  var na = /* @__PURE__ */ new Map(), dy = /* @__PURE__ */ new Set();
  function ou(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var li = L.d;
  L.d = {
    f: I_,
    r: Y_,
    D: G_,
    C: X_,
    L: F_,
    m: Z_,
    X: Q_,
    S: P_,
    M: K_
  };
  function I_() {
    var t = li.f(), n = Js();
    return t || n;
  }
  function Y_(t) {
    var n = st(t);
    n !== null && n.tag === 5 && n.type === "form" ? Mg(n) : li.r(t);
  }
  var sl = typeof document > "u" ? null : document;
  function hy(t, n, i) {
    var o = sl;
    if (o && typeof n == "string" && n) {
      var f = rn(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), dy.has(f) || (dy.add(f), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), un(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function G_(t) {
    li.D(t), hy("dns-prefetch", t, null);
  }
  function X_(t, n) {
    li.C(t, n), hy("preconnect", t, n);
  }
  function F_(t, n, i) {
    li.L(t, n, i);
    var o = sl;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + rn(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + rn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + rn(
        i.imageSizes
      ) + '"]')) : f += '[href="' + rn(t) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = ul(t);
          break;
        case "script":
          h = cl(t);
      }
      na.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), na.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(vo(h)) || n === "script" && o.querySelector(bo(h)) || (n = o.createElement("link"), un(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function Z_(t, n) {
    li.m(t, n);
    var i = sl;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + rn(o) + '"][href="' + rn(t) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = cl(t);
      }
      if (!na.has(h) && (t = g({ rel: "modulepreload", href: t }, n), na.set(h, t), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(bo(h)))
              return;
        }
        o = i.createElement("link"), un(o, "link", t), at(o), i.head.appendChild(o);
      }
    }
  }
  function P_(t, n, i) {
    li.S(t, n, i);
    var o = sl;
    if (o && t) {
      var f = jt(o).hoistableStyles, h = ul(t);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var M = { loading: 0, preload: null };
        if (w = o.querySelector(
          vo(h)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = na.get(h)) && Od(t, i);
          var q = w = o.createElement("link");
          at(q), un(q, "link", t), q._p = new Promise(function(re, fe) {
            q.onload = re, q.onerror = fe;
          }), q.addEventListener("load", function() {
            M.loading |= 1;
          }), q.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, su(w, n, o);
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
  function Q_(t, n) {
    li.X(t, n);
    var i = sl;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = cl(t), h = o.get(f);
      h || (h = i.querySelector(bo(f)), h || (t = g({ src: t, async: !0 }, n), (n = na.get(f)) && jd(t, n), h = i.createElement("script"), at(h), un(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function K_(t, n) {
    li.M(t, n);
    var i = sl;
    if (i && t) {
      var o = jt(i).hoistableScripts, f = cl(t), h = o.get(f);
      h || (h = i.querySelector(bo(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = na.get(f)) && jd(t, n), h = i.createElement("script"), at(h), un(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function my(t, n, i, o) {
    var f = (f = ae.current) ? ou(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = ul(i.href), i = jt(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = ul(i.href);
          var h = jt(
            f
          ).hoistableStyles, w = h.get(t);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, w), (h = f.querySelector(
            vo(t)
          )) && !h._p && (w.instance = h, w.state.loading = 5), na.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, na.set(t, i), h || J_(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = cl(i), i = jt(
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
  function ul(t) {
    return 'href="' + rn(t) + '"';
  }
  function vo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function py(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function J_(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), un(n, "link", i), at(n), t.head.appendChild(n));
  }
  function cl(t) {
    return '[src="' + rn(t) + '"]';
  }
  function bo(t) {
    return "script[async]" + t;
  }
  function gy(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + rn(i.href) + '"]'
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
          ), at(o), un(o, "style", f), su(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          f = ul(i.href);
          var h = t.querySelector(
            vo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, at(h), h;
          o = py(i), (f = na.get(f)) && Od(o, f), h = (t.ownerDocument || t).createElement("link"), at(h);
          var w = h;
          return w._p = new Promise(function(M, q) {
            w.onload = M, w.onerror = q;
          }), un(h, "link", o), n.state.loading |= 4, su(h, i.precedence, t), n.instance = h;
        case "script":
          return h = cl(i.src), (f = t.querySelector(
            bo(h)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = na.get(h)) && (o = g({}, i), jd(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), at(f), un(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, su(o, i.precedence, t));
    return n.instance;
  }
  function su(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, w = 0; w < o.length; w++) {
      var M = o[w];
      if (M.dataset.precedence === n) h = M;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Od(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function jd(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var uu = null;
  function yy(t, n, i) {
    if (uu === null) {
      var o = /* @__PURE__ */ new Map(), f = uu = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = uu, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
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
  function vy(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function W_(t, n, i) {
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
  function by(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function eE(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = ul(o.href), h = n.querySelector(
          vo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = cu.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = h, at(h);
          return;
        }
        h = n.ownerDocument || n, o = py(o), (f = na.get(f)) && Od(o, f), h = h.createElement("link"), at(h);
        var w = h;
        w._p = new Promise(function(M, q) {
          w.onload = M, w.onerror = q;
        }), un(h, "link", o), i.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = cu.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Ld = 0;
  function tE(t, n) {
    return t.stylesheets && t.count === 0 && du(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && du(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Ld === 0 && (Ld = 62500 * L_());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && du(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Ld ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function cu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) du(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var fu = null;
  function du(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, fu = /* @__PURE__ */ new Map(), n.forEach(nE, t), fu = null, cu.call(t));
  }
  function nE(t, n) {
    if (!(n.state.loading & 4)) {
      var i = fu.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), fu.set(t, i);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (i.set(w.dataset.precedence, w), o = w);
        }
        o && i.set(null, o);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = i.get(w) || o, h === o && i.set(null, f), i.set(w, f), this.count++, o = cu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var xo = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function aE(t, n, i, o, f, h, w, M, q) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = pn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = pn(0), this.hiddenUpdates = pn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function xy(t, n, i, o, f, h, w, M, q, re, fe, he) {
    return t = new aE(
      t,
      n,
      i,
      w,
      q,
      re,
      fe,
      he,
      M
    ), n = 1, h === !0 && (n |= 24), h = kn(3, null, null, n), t.current = h, h.stateNode = t, n = mf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, vf(h), t;
  }
  function wy(t) {
    return t ? (t = qr, t) : qr;
  }
  function Sy(t, n, i, o, f, h) {
    f = wy(f), o.context === null ? o.context = f : o.pendingContext = f, o = Ri(n), o.payload = { element: i }, h = h === void 0 ? null : h, h !== null && (o.callback = h), i = Ti(t, o, n), i !== null && (Mn(i, t, n), Kl(i, t, n));
  }
  function _y(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Hd(t, n) {
    _y(t, n), (t = t.alternate) && _y(t, n);
  }
  function Ey(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = ar(t, 67108864);
      n !== null && Mn(n, t, 67108864), Hd(t, 67108864);
    }
  }
  function Ny(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = $n();
      n = Z(n);
      var i = ar(t, n);
      i !== null && Mn(i, t, n), Hd(t, n);
    }
  }
  var hu = !0;
  function iE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = L.p;
    try {
      L.p = 2, kd(t, n, i, o);
    } finally {
      L.p = h, T.T = f;
    }
  }
  function rE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = L.p;
    try {
      L.p = 8, kd(t, n, i, o);
    } finally {
      L.p = h, T.T = f;
    }
  }
  function kd(t, n, i, o) {
    if (hu) {
      var f = Bd(o);
      if (f === null)
        _d(
          t,
          n,
          o,
          mu,
          i
        ), Ry(t, o);
      else if (oE(
        f,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (Ry(t, o), n & 4 && -1 < lE.indexOf(t)) {
        for (; f !== null; ) {
          var h = st(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var w = cn(h.pendingLanes);
                  if (w !== 0) {
                    var M = h;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; w; ) {
                      var q = 1 << 31 - Ut(w);
                      M.entanglements[1] |= q, w &= ~q;
                    }
                    Ma(h), (ht & 6) === 0 && (Qs = Pe() + 500, mo(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = ar(h, 2), M !== null && Mn(M, h, 2), Js(), Hd(h, 2);
            }
          if (h = Bd(o), h === null && _d(
            t,
            n,
            o,
            mu,
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
  function Bd(t) {
    return t = Uc(t), Ud(t);
  }
  var mu = null;
  function Ud(t) {
    if (mu = null, t = Ct(t), t !== null) {
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
    return mu = t, null;
  }
  function Cy(t) {
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
  var Vd = !1, Ui = null, Vi = null, qi = null, wo = /* @__PURE__ */ new Map(), So = /* @__PURE__ */ new Map(), $i = [], lE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Ry(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ui = null;
        break;
      case "dragenter":
      case "dragleave":
        Vi = null;
        break;
      case "mouseover":
      case "mouseout":
        qi = null;
        break;
      case "pointerover":
      case "pointerout":
        wo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        So.delete(n.pointerId);
    }
  }
  function _o(t, n, i, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && Ey(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function oE(t, n, i, o, f) {
    switch (n) {
      case "focusin":
        return Ui = _o(
          Ui,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return Vi = _o(
          Vi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return qi = _o(
          qi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return wo.set(
          h,
          _o(
            wo.get(h) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, So.set(
          h,
          _o(
            So.get(h) || null,
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
  function Ty(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Ny(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Ny(i);
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
  function pu(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Bd(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Bc = o, i.target.dispatchEvent(o), Bc = null;
      } else
        return n = st(i), n !== null && Ey(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function My(t, n, i) {
    pu(t) && i.delete(n);
  }
  function sE() {
    Vd = !1, Ui !== null && pu(Ui) && (Ui = null), Vi !== null && pu(Vi) && (Vi = null), qi !== null && pu(qi) && (qi = null), wo.forEach(My), So.forEach(My);
  }
  function gu(t, n) {
    t.blockedOn === n && (t.blockedOn = null, Vd || (Vd = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      sE
    )));
  }
  var yu = null;
  function Dy(t) {
    yu !== t && (yu = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        yu === t && (yu = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Ud(o || i) === null)
              continue;
            break;
          }
          var h = st(i);
          h !== null && (t.splice(n, 3), n -= 3, Bf(
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
  function fl(t) {
    function n(q) {
      return gu(q, t);
    }
    Ui !== null && gu(Ui, t), Vi !== null && gu(Vi, t), qi !== null && gu(qi, t), wo.forEach(n), So.forEach(n);
    for (var i = 0; i < $i.length; i++) {
      var o = $i[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < $i.length && (i = $i[0], i.blockedOn === null); )
      Ty(i), i.blockedOn === null && $i.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], h = i[o + 1], w = f[we] || null;
        if (typeof h == "function")
          w || Dy(i);
        else if (w) {
          var M = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[we] || null)
              M = w.formAction;
            else if (Ud(f) !== null) continue;
          } else M = w.action;
          typeof M == "function" ? i[o + 1] = M : (i.splice(o, 3), o -= 3), Dy(i);
        }
      }
  }
  function Ay() {
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
  function qd(t) {
    this._internalRoot = t;
  }
  vu.prototype.render = qd.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = $n();
    Sy(i, o, t, n, null, null);
  }, vu.prototype.unmount = qd.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      Sy(t.current, 2, null, t, null, null), Js(), n[be] = null;
    }
  };
  function vu(t) {
    this._internalRoot = t;
  }
  vu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = pe();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < $i.length && n !== 0 && n < $i[i].priority; i++) ;
      $i.splice(i, 0, t), i === 0 && Ty(t);
    }
  };
  var zy = a.version;
  if (zy !== "19.2.7")
    throw Error(
      l(
        527,
        zy,
        "19.2.7"
      )
    );
  L.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var uE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bu.isDisabled && bu.supportsFiber)
      try {
        nn = bu.inject(
          uE
        ), Qt = bu;
      } catch {
      }
  }
  return No.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var i = !1, o = "", f = Ug, h = Vg, w = qg;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = xy(
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
      Ay
    ), t[be] = n.current, Sd(t), new qd(n);
  }, No.hydrateRoot = function(t, n, i) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = Ug, w = Vg, M = qg, q = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (w = i.onCaughtError), i.onRecoverableError !== void 0 && (M = i.onRecoverableError), i.formState !== void 0 && (q = i.formState)), n = xy(
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
      Ay
    ), n.context = wy(null), i = n.current, o = $n(), o = Z(o), f = Ri(o), f.callback = null, Ti(i, f, o), i = o, n.current.lanes = i, pt(n, i), Ma(n), t[be] = n.current, Sd(t), new vu(n);
  }, No.version = "19.2.7", No;
}
var $y;
function xE() {
  if ($y) return Yd.exports;
  $y = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Yd.exports = bE(), Yd.exports;
}
var wE = xE();
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
var m1 = (e) => {
  throw TypeError(e);
}, p1 = (e, a, r) => a.has(e) || m1("Cannot " + r), ia = (e, a, r) => (p1(e, a, "read from private field"), r ? r.call(e) : a.get(e)), Oo = (e, a, r) => a.has(e) ? m1("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), Da = (e, a, r, l) => (p1(e, a, "write to private field"), a.set(e, r), r);
function Iy(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function SE(e = {}) {
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
  function y(x, S = null, C, R) {
    let N = _h(
      s ? m().pathname : "/",
      x,
      S,
      C,
      R
    );
    return It(
      N.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), N;
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
      let C = Iy(x) ? x : y(x, S);
      u += 1, s.splice(u, s.length, C), l && d && d({ action: c, location: C, delta: 1 });
    },
    replace(x, S) {
      c = "REPLACE";
      let C = Iy(x) ? x : y(x, S);
      s[u] = C, l && d && d({ action: c, location: C, delta: 0 });
    },
    go(x) {
      c = "POP";
      let S = p(u + x), C = s[S];
      u = S, d && d({ action: c, location: C, delta: x });
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
function _E() {
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
    key: a && a.key || l || _E(),
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
function EE(e, a, r = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Fe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ua(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var jo, Yy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (Oo(this, jo, /* @__PURE__ */ new Map()), e)
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
    if (ia(this, jo).has(e))
      return ia(this, jo).get(e);
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
    ia(this, jo).set(e, a);
  }
};
jo = /* @__PURE__ */ new WeakMap();
var NE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function CE(e) {
  return NE.has(
    e
  );
}
var RE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function TE(e) {
  return RE.has(
    e
  );
}
function ME(e) {
  return e.index === !0;
}
function qo(e, a, r = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...r, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Fe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Fe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), ME(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = Gy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = Gy(
        m,
        a(m)
      ), u.children && (m.children = qo(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function Gy(e, a) {
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
function g1(e, a, r = "/") {
  return ga(e, a, r, !1);
}
function ga(e, a, r, l, s) {
  let u = typeof a == "string" ? Sa(a) : a, c = oa(u.pathname || "/", r);
  if (c == null)
    return null;
  let d = s ?? Yu(e), p = null, m = $E(c);
  for (let y = 0; p == null && y < d.length; ++y)
    p = VE(
      d[y],
      m,
      l
    );
  return p;
}
function DE(e, a) {
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
function Yu(e) {
  let a = y1(e);
  return AE(a), a;
}
function y1(e, a = [], r = [], l = "", s = !1) {
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
    ), y1(
      c.children,
      a,
      v,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: BE(g, c.index),
      routesMeta: v
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of v1(c.path))
        u(c, d, !0, p);
  }), a;
}
function v1(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = v1(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function AE(e) {
  e.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : UE(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var zE = /^:[\w-]+$/, OE = 3, jE = 2, LE = 1, HE = 10, kE = -2, Xy = (e) => e === "*";
function BE(e, a) {
  let r = e.split("/"), l = r.length;
  return r.some(Xy) && (l += kE), a && (l += jE), r.filter((s) => !Xy(s)).reduce(
    (s, u) => s + (zE.test(u) ? OE : u === "" ? LE : HE),
    l
  );
}
function UE(e, a) {
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
function VE(e, a, r = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", g = ec(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), v = p.route;
    if (!g && m && r && !l[l.length - 1].route.index && (g = ec(
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
      pathnameBase: GE(
        la([u, g.pathnameBase])
      ),
      route: v
    }), g.pathnameBase !== "/" && (u = la([u, g.pathnameBase]));
  }
  return c;
}
function ec(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, l] = qE(
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
function qE(e, a = !1, r = !0) {
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
function $E(e) {
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
function IE({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : la([e, a]);
}
var b1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, nm = (e) => b1.test(e);
function YE(e, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Sa(e) : e, u;
  return r ? (r = im(r), r.startsWith("/") ? u = Fy(r.substring(1), "/") : u = Fy(r, a)) : u = a, {
    pathname: u,
    search: XE(l),
    hash: FE(s)
  };
}
function Fy(e, a) {
  let r = tc(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Zd(e, a, r, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function x1(e) {
  return e.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function am(e) {
  let a = x1(e);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function mc(e, a, r, l = !1) {
  let s;
  typeof e == "string" ? s = Sa(e) : (s = { ...e }, Fe(
    !s.pathname || !s.pathname.includes("?"),
    Zd("?", "pathname", "search", s)
  ), Fe(
    !s.pathname || !s.pathname.includes("#"),
    Zd("#", "pathname", "hash", s)
  ), Fe(
    !s.search || !s.search.includes("#"),
    Zd("#", "search", "hash", s)
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
  let p = YE(s, d), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var im = (e) => e.replace(/\/\/+/g, "/"), la = (e) => im(e.join("/")), tc = (e) => e.replace(/\/+$/, ""), GE = (e) => tc(e).replace(/^\/*/, "/"), XE = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, FE = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Zy = (e, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", e), new Response(null, { ...r, headers: l });
}, pc = class {
  constructor(e, a, r, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function $o(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function ts(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return la(a) || "/";
}
var w1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function S1(e, a) {
  let r = e;
  if (typeof r != "string" || !b1.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (w1)
    try {
      let u = new URL(window.location.href), c = r.startsWith("//") ? new URL(u.protocol + r) : new URL(r), d = oa(c.pathname, a);
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
var Pi = Symbol("Uninstrumented");
function ZE(e, a) {
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
    let s = vl(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = r[`lazy.${u}`];
      if (typeof c == "function" && d.length > 0) {
        let p = vl(d, c, () => {
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
      let c = u[Pi] ?? u, d = vl(
        r[s],
        c,
        (...p) => Py(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[Pi] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Pi] ?? s, c = vl(
      r.middleware,
      u,
      (...d) => Py(d[0])
    );
    return c ? (c[Pi] = u, c) : s;
  })), l;
}
function PE(e, a) {
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
    let l = e.navigate[Pi] ?? e.navigate, s = vl(
      r.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? Ua(c) : ".",
          ...Qy(e, d ?? {})
        };
      }
    );
    s && (s[Pi] = l, e.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = e.fetch[Pi] ?? e.fetch, s = vl(r.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...Qy(e, p ?? {})
      };
    });
    s && (s[Pi] = l, e.fetch = s);
  }
  return e;
}
function vl(e, a, r) {
  return e.length === 0 ? null : async (...l) => {
    let s = await _1(
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
async function _1(e, a, r, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = _1(e, a, r, l - 1), u = await c, Fe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function Py(e) {
  let { request: a, context: r, params: l, pattern: s } = e;
  return {
    request: QE(a),
    params: { ...l },
    pattern: s,
    context: KE(r)
  };
}
function Qy(e, a) {
  return {
    currentUrl: Ua(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function QE(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function KE(e) {
  if (WE(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var JE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function WE(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === JE;
}
var E1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], e2 = new Set(
  E1
), t2 = [
  "GET",
  ...E1
], n2 = new Set(t2), N1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), a2 = /* @__PURE__ */ new Set([307, 308]), Pd = {
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
}, i2 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Co = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, r2 = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), C1 = "remix-router-transitions", R1 = Symbol("ResetLoaderData"), br, ml, Xi, pl, l2 = class {
  constructor(e) {
    Oo(this, br), Oo(this, ml), Oo(this, Xi), Oo(this, pl), Da(this, br, e), Da(this, ml, Yu(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return ia(this, br);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return ia(this, Xi) ?? ia(this, br);
  }
  /** Pre-computed branches */
  get branches() {
    return ia(this, pl) ?? ia(this, ml);
  }
  get hasHMRRoutes() {
    return ia(this, Xi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Da(this, br, e), Da(this, ml, Yu(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Da(this, Xi, e), Da(this, pl, Yu(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    ia(this, Xi) && (Da(this, br, ia(this, Xi)), Da(this, ml, ia(this, pl)), Da(this, Xi, void 0), Da(this, pl, void 0));
  }
};
br = /* @__PURE__ */ new WeakMap();
ml = /* @__PURE__ */ new WeakMap();
Xi = /* @__PURE__ */ new WeakMap();
pl = /* @__PURE__ */ new WeakMap();
function o2(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Fe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || r2, u = s;
  if (e.instrumentations) {
    let B = e.instrumentations;
    u = (Z) => ({
      ...s(Z),
      ...ZE(
        B.map((W) => W.route).filter(Boolean),
        Z
      )
    });
  }
  let c = {}, d = new l2(
    qo(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || d2, y = {
    ...e.future
  }, g = null, v = /* @__PURE__ */ new Set(), x = null, S = null, C = null, R = null, N = e.hydrationData != null, z = ga(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), E = !1, O = null, H, k;
  if (z == null && !e.patchRoutesOnNavigation) {
    let B = ra(404, {
      pathname: e.history.location.pathname
    }), { matches: Z, route: W } = xu(d.activeRoutes);
    H = !0, k = !H, z = Z, O = { [W.id]: B };
  } else if (z && !e.hydrationData && pn(
    z,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (z = null), z)
    if (z.some((B) => B.route.lazy))
      H = !1, k = !H;
    else if (!z.some((B) => rm(B.route)))
      H = !0, k = !H;
    else {
      let B = e.hydrationData ? e.hydrationData.loaderData : null, Z = e.hydrationData ? e.hydrationData.errors : null, W = z;
      if (Z) {
        let pe = z.findIndex(
          (ge) => Z[ge.route.id] !== void 0
        );
        W = W.slice(0, pe + 1);
      }
      k = !1, H = !0, W.forEach((pe) => {
        let ge = T1(pe.route, B, Z);
        k = k || ge.renderFallback, H = H && !ge.shouldLoad;
      });
    }
  else {
    H = !1, k = !H, z = [];
    let B = pn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    B.active && B.matches && (E = !0, z = B.matches);
  }
  let V, D = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: z,
    initialized: H,
    renderFallback: k,
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
  }, I = "POP", ne = null, $ = !1, K, oe = !1, j = /* @__PURE__ */ new Map(), Y = null, T = !1, L = !1, F = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), te = 0, A = -1, U = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Map(), ce = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), P, me = null;
  function Se() {
    if (g = e.history.listen(
      ({ action: B, location: Z, delta: W }) => {
        if (P) {
          P(), P = void 0;
          return;
        }
        It(
          se.size === 0 || W != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let pe = Fn({
          currentLocation: D.location,
          nextLocation: Z,
          historyAction: B
        });
        if (pe && W != null) {
          let ge = new Promise((Ee) => {
            P = Ee;
          });
          e.history.go(W * -1), On(pe, {
            state: "blocked",
            location: Z,
            proceed() {
              On(pe, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Z
              }), ge.then(() => e.history.go(W));
            },
            reset() {
              let Ee = new Map(D.blockers);
              Ee.set(pe, Co), xe({ blockers: Ee });
            }
          }), ne?.resolve(), ne = null;
          return;
        }
        return Me(B, Z);
      }
    ), r) {
      D2(a, j);
      let B = () => A2(a, j);
      a.addEventListener("pagehide", B), Y = () => a.removeEventListener("pagehide", B);
    }
    return D.initialized || Me("POP", D.location, {
      initialHydration: !0
    }), V;
  }
  function Te() {
    g && g(), Y && Y(), v.clear(), K && K.abort(), D.fetchers.forEach((B, Z) => nn(D.fetchers, Z)), D.blockers.forEach((B, Z) => ua(Z));
  }
  function _e(B) {
    if (v.add(B), x) {
      let { newErrors: Z } = x;
      x = null, B(D, {
        deletedFetchers: [],
        newErrors: Z,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(B);
  }
  function xe(B, Z = {}) {
    B.matches && (B.matches = B.matches.map((ge) => {
      let Ee = c[ge.route.id], ve = ge.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...ge,
        route: Ee
      } : ge;
    })), D = {
      ...D,
      ...B
    };
    let W = [], pe = [];
    D.fetchers.forEach((ge, Ee) => {
      ge.state === "idle" && (ae.has(Ee) ? W.push(Ee) : pe.push(Ee));
    }), ae.forEach((ge) => {
      !D.fetchers.has(ge) && !G.has(ge) && W.push(ge);
    }), v.size === 0 && (x = { newErrors: B.errors ?? null }), [...v].forEach(
      (ge) => ge(D, {
        deletedFetchers: W,
        newErrors: B.errors ?? null,
        viewTransitionOpts: Z.viewTransitionOpts,
        flushSync: Z.flushSync === !0
      })
    ), W.forEach((ge) => nn(D.fetchers, ge)), pe.forEach((ge) => D.fetchers.delete(ge));
  }
  function Re(B, Z, { flushSync: W } = {}) {
    let pe = D.actionData != null && D.navigation.formMethod != null && hn(D.navigation.formMethod) && D.navigation.state === "loading" && B.state?._isRedirect !== !0, ge;
    Z.actionData ? Object.keys(Z.actionData).length > 0 ? ge = Z.actionData : ge = null : pe ? ge = D.actionData : ge = null;
    let Ee = Z.loaderData ? ov(
      D.loaderData,
      Z.loaderData,
      Z.matches || [],
      Z.errors
    ) : D.loaderData, ve = D.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((Ae, Ue) => ve.set(Ue, Co)));
    let we = T ? !1 : Vt(B, Z.matches || D.matches), be = $ === !0 || D.navigation.formMethod != null && hn(D.navigation.formMethod) && B.state?._isRedirect !== !0;
    d.commitHmrRoutes(), T || I === "POP" || (I === "PUSH" ? e.history.push(B, B.state) : I === "REPLACE" && e.history.replace(B, B.state));
    let De;
    if (I === "POP") {
      let Ae = j.get(D.location.pathname);
      Ae && Ae.has(B.pathname) ? De = {
        currentLocation: D.location,
        nextLocation: B
      } : j.has(B.pathname) && (De = {
        currentLocation: B,
        nextLocation: D.location
      });
    } else if (oe) {
      let Ae = j.get(D.location.pathname);
      Ae ? Ae.add(B.pathname) : (Ae = /* @__PURE__ */ new Set([B.pathname]), j.set(D.location.pathname, Ae)), De = {
        currentLocation: D.location,
        nextLocation: B
      };
    }
    xe(
      {
        ...Z,
        // matches, errors, fetchers go through as-is
        actionData: ge,
        loaderData: Ee,
        historyAction: I,
        location: B,
        initialized: !0,
        renderFallback: !1,
        navigation: Pd,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: De,
        flushSync: W === !0
      }
    ), I = "POP", $ = !1, oe = !1, T = !1, L = !1, ne?.resolve(), ne = null, me?.resolve(), me = null;
  }
  async function $e(B, Z) {
    if (ne?.resolve(), ne = null, typeof B == "number") {
      ne || (ne = fv());
      let rt = ne.promise;
      return e.history.go(B), rt;
    }
    let W = Eh(
      D.location,
      D.matches,
      p,
      B,
      Z?.fromRouteId,
      Z?.relative
    ), { path: pe, submission: ge, error: Ee } = Ky(
      !1,
      W,
      Z
    ), ve;
    Z?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Z.mask == "string" ? Sa(Z.mask) : {
        ...D.location.mask,
        ...Z.mask
      }
    });
    let we = D.location, be = _h(
      we,
      pe,
      Z && Z.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...e.history.encodeLocation(be)
    };
    let De = Z && Z.replace != null ? Z.replace : void 0, Ae = "PUSH";
    De === !0 ? Ae = "REPLACE" : De === !1 || ge != null && hn(ge.formMethod) && ge.formAction === D.location.pathname + D.location.search && (Ae = "REPLACE");
    let Ue = Z && "preventScrollReset" in Z ? Z.preventScrollReset === !0 : void 0, je = (Z && Z.flushSync) === !0, Ge = Fn({
      currentLocation: we,
      nextLocation: be,
      historyAction: Ae
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
          }), $e(B, Z);
        },
        reset() {
          let rt = new Map(D.blockers);
          rt.set(Ge, Co), xe({ blockers: rt });
        }
      });
      return;
    }
    await Me(Ae, be, {
      submission: ge,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: Ue,
      replace: Z && Z.replace,
      enableViewTransition: Z && Z.viewTransition,
      flushSync: je,
      callSiteDefaultShouldRevalidate: Z && Z.defaultShouldRevalidate
    });
  }
  function ft() {
    me || (me = fv()), Lt(), xe({ revalidation: "loading" });
    let B = me.promise;
    return D.navigation.state === "submitting" ? B : D.navigation.state === "idle" ? (Me(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), B) : (Me(
      I || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: oe === !0
      }
    ), B);
  }
  async function Me(B, Z, W) {
    K && K.abort(), K = null, I = B, T = (W && W.startUninterruptedRevalidation) === !0, Ht(D.location, D.matches), $ = (W && W.preventScrollReset) === !0, oe = (W && W.enableViewTransition) === !0;
    let pe = d.activeRoutes, ge = W?.initialHydration && D.matches && D.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : ga(
      pe,
      Z,
      p,
      !1,
      d.branches
    ), Ee = (W && W.flushSync) === !0;
    if (ge && D.initialized && !L && x2(D.location, Z) && !(W && W.submission && hn(W.submission.formMethod))) {
      Re(Z, { matches: ge }, { flushSync: Ee });
      return;
    }
    let ve = pn(ge, pe, Z.pathname);
    if (ve.active && ve.matches && (ge = ve.matches), !ge) {
      let { error: st, notFoundMatches: We, route: jt } = cn(
        Z.pathname
      );
      Re(
        Z,
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
      matches: ge,
      historyAction: B
    } : void 0;
    K = new AbortController();
    let be = gl(
      e.history,
      Z,
      K.signal,
      W && W.submission
    ), De = e.getContext ? await e.getContext() : new Yy(), Ae;
    if (W && W.pendingError)
      Ae = [
        Fi(ge).route.id,
        { type: "error", error: W.pendingError }
      ];
    else if (W && W.submission && hn(W.submission.formMethod)) {
      let st = await Xe(
        be,
        Z,
        W.submission,
        ge,
        B,
        De,
        ve.active,
        W && W.initialHydration === !0,
        { replace: W.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, jt] = st.pendingActionResult;
        if (In(jt) && $o(jt.error) && jt.error.status === 404) {
          K = null, Re(Z, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [We]: jt.error
            }
          });
          return;
        }
      }
      ge = st.matches || ge, Ae = st.pendingActionResult, we = Qd(
        Z,
        ge,
        B,
        W.submission
      ), Ee = !1, ve.active = !1, be = gl(
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
      Z,
      ge,
      B,
      De,
      ve.active,
      we,
      W && W.submission,
      W && W.fetcherSubmission,
      W && W.replace,
      W && W.initialHydration === !0,
      Ee,
      Ae,
      W && W.callSiteDefaultShouldRevalidate
    );
    Ue || (K = null, Re(Z, {
      matches: je || ge,
      ...sv(Ae),
      loaderData: Ge,
      errors: rt,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function Xe(B, Z, W, pe, ge, Ee, ve, we, be = {}) {
    Lt();
    let De = T2(
      Z,
      pe,
      ge,
      W
    );
    if (xe({ navigation: De }, { flushSync: be.flushSync === !0 }), ve) {
      let je = await pt(
        pe,
        Z.pathname,
        B.signal
      );
      if (je.type === "aborted")
        return { shortCircuited: !0 };
      if (je.type === "error") {
        if (je.partialMatches.length === 0) {
          let { matches: rt, route: Ct } = xu(
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
        let Ge = Fi(je.partialMatches).route.id;
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
        pe = je.matches;
      else {
        let { notFoundMatches: Ge, error: rt, route: Ct } = cn(
          Z.pathname
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
    let Ae, Ue = Gu(pe, Z);
    if (!Ue.route.action && !Ue.route.lazy)
      Ae = {
        type: "error",
        error: ra(405, {
          method: B.method,
          pathname: Z.pathname,
          routeId: Ue.route.id
        })
      };
    else {
      let je = wl(
        u,
        c,
        B,
        Z,
        pe,
        Ue,
        we ? [] : l,
        Ee
      ), Ge = await yt(
        B,
        Z,
        je,
        Ee,
        null
      );
      if (Ae = Ge[Ue.route.id], !Ae) {
        for (let rt of pe)
          if (Ge[rt.route.id]) {
            Ae = Ge[rt.route.id];
            break;
          }
      }
      if (B.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (wr(Ae)) {
      let je;
      return be && be.replace != null ? je = be.replace : je = iv(
        Ae.response.headers.get("Location"),
        new URL(B.url),
        p,
        e.history
      ) === D.location.pathname + D.location.search, await gt(B, Ae, !0, {
        submission: W,
        replace: je
      }), { shortCircuited: !0 };
    }
    if (In(Ae)) {
      let je = Fi(pe, Ue.route.id);
      return (be && be.replace) !== !0 && (I = "PUSH"), {
        matches: pe,
        pendingActionResult: [
          je.route.id,
          Ae,
          Ue.route.id
        ]
      };
    }
    return {
      matches: pe,
      pendingActionResult: [Ue.route.id, Ae]
    };
  }
  async function ke(B, Z, W, pe, ge, Ee, ve, we, be, De, Ae, Ue, je, Ge) {
    let rt = ve || Qd(Z, W, pe, we), Ct = we || be || cv(rt), st = !T && !Ae;
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
        Z.pathname,
        B.signal
      );
      if (Be.type === "aborted")
        return { shortCircuited: !0 };
      if (Be.type === "error") {
        if (Be.partialMatches.length === 0) {
          let { matches: gn, route: Ln } = xu(
            d.activeRoutes
          );
          return {
            matches: gn,
            loaderData: {},
            errors: {
              [Ln.id]: Be.error
            }
          };
        }
        let bt = Fi(Be.partialMatches).route.id;
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
        let { error: bt, notFoundMatches: gn, route: Ln } = cn(
          Z.pathname
        );
        return {
          matches: gn,
          loaderData: {},
          errors: {
            [Ln.id]: bt
          }
        };
      }
    }
    let We = d.activeRoutes, { dsMatches: jt, revalidatingFetchers: at } = Jy(
      B,
      ge,
      u,
      c,
      e.history,
      D,
      W,
      Ct,
      Z,
      Ae ? [] : l,
      Ae === !0,
      L,
      F,
      ae,
      ee,
      Q,
      We,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      je,
      Ge
    );
    if (A = ++te, !e.dataStrategy && !jt.some((Be) => Be.shouldLoad) && !jt.some(
      (Be) => Be.route.middleware && Be.route.middleware.length > 0
    ) && at.length === 0) {
      let Be = new Map(D.fetchers), bt = gi(Be);
      return Re(
        Z,
        {
          matches: W,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: je && In(je[1]) ? { [je[0]]: je[1].error } : null,
          ...sv(je),
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
    let { loaderResults: jn, fetcherResults: fn } = await Yt(
      jt,
      at,
      B,
      Z,
      ge
    );
    if (B.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      Na
    ), at.forEach((Be) => G.delete(Be.key));
    let an = wu(jn);
    if (an)
      return await gt(B, an.result, !0, {
        replace: De
      }), { shortCircuited: !0 };
    if (an = wu(fn), an)
      return Q.add(an.key), await gt(B, an.result, !0, {
        replace: De
      }), { shortCircuited: !0 };
    let Sn = new Map(D.fetchers), { loaderData: yi, errors: _n } = lv(
      D,
      W,
      jn,
      je,
      at,
      fn,
      Sn
    );
    Ae && D.errors && (_n = { ...D.errors, ..._n });
    let vi = gi(Sn), fa = Ea(
      A,
      Sn
    ), da = vi || fa || at.length > 0;
    return {
      matches: W,
      loaderData: yi,
      errors: _n,
      ...da ? { workingFetchers: Sn } : {}
    };
  }
  function Ie(B) {
    if (B && !In(B[1]))
      return {
        [B[0]]: B[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function St(B) {
    let Z = new Map(D.fetchers);
    return B.forEach((W) => {
      let pe = Z.get(W.key), ge = Ro(
        void 0,
        pe ? pe.data : void 0
      );
      Z.set(W.key, ge);
    }), Z;
  }
  async function Je(B, Z, W, pe) {
    Ot(B);
    let ge = (pe && pe.flushSync) === !0, Ee = d.activeRoutes, ve = Eh(
      D.location,
      D.matches,
      p,
      W,
      Z,
      pe?.relative
    ), we = ga(
      Ee,
      ve,
      p,
      !1,
      d.branches
    ), be = pn(we, Ee, ve);
    if (be.active && be.matches && (we = be.matches), !we) {
      ot(
        B,
        Z,
        ra(404, { pathname: ve }),
        { flushSync: ge }
      );
      return;
    }
    let { path: De, submission: Ae, error: Ue } = Ky(
      !0,
      ve,
      pe
    );
    if (Ue) {
      ot(B, Z, Ue, { flushSync: ge });
      return;
    }
    let je = e.getContext ? await e.getContext() : new Yy(), Ge = (pe && pe.preventScrollReset) === !0;
    if (Ae && hn(Ae.formMethod)) {
      await Ze(
        B,
        Z,
        De,
        we,
        je,
        be.active,
        ge,
        Ge,
        Ae,
        pe && pe.defaultShouldRevalidate
      );
      return;
    }
    ee.set(B, { routeId: Z, path: De }), await Pe(
      B,
      Z,
      De,
      we,
      je,
      be.active,
      ge,
      Ge,
      Ae
    );
  }
  async function Ze(B, Z, W, pe, ge, Ee, ve, we, be, De) {
    Lt(), ee.delete(B);
    let Ae = D.fetchers.get(B);
    mt(B, M2(be, Ae), {
      flushSync: ve
    });
    let Ue = new AbortController(), je = gl(
      e.history,
      W,
      Ue.signal,
      be
    );
    if (Ee) {
      let dt = await pt(
        pe,
        new URL(je.url).pathname,
        je.signal,
        B
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(B, Z, dt.error, { flushSync: ve });
        return;
      } else if (dt.matches)
        pe = dt.matches;
      else {
        ot(
          B,
          Z,
          ra(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ge = Gu(pe, W);
    if (!Ge.route.action && !Ge.route.lazy) {
      let dt = ra(405, {
        method: be.formMethod,
        pathname: W,
        routeId: Z
      });
      ot(B, Z, dt, { flushSync: ve });
      return;
    }
    G.set(B, Ue);
    let rt = te, Ct = wl(
      u,
      c,
      je,
      W,
      pe,
      Ge,
      l,
      ge
    ), st = await yt(
      je,
      W,
      Ct,
      ge,
      B
    ), We = st[Ge.route.id];
    if (!We) {
      for (let dt of Ct)
        if (st[dt.route.id]) {
          We = st[dt.route.id];
          break;
        }
    }
    if (je.signal.aborted) {
      G.get(B) === Ue && G.delete(B);
      return;
    }
    if (ae.has(B)) {
      if (wr(We) || In(We)) {
        mt(B, za(void 0));
        return;
      }
    } else {
      if (wr(We))
        if (G.delete(B), A > rt) {
          mt(B, za(void 0));
          return;
        } else
          return Q.add(B), mt(B, Ro(be)), gt(je, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: we
          });
      if (In(We)) {
        ot(B, Z, We.error);
        return;
      }
    }
    let jt = D.navigation.location || D.location, at = gl(
      e.history,
      jt,
      Ue.signal
    ), Na = d.activeRoutes, jn = D.navigation.state !== "idle" ? ga(
      Na,
      D.navigation.location,
      p,
      !1,
      d.branches
    ) : D.matches;
    Fe(jn, "Didn't find any matches after fetcher action");
    let fn = ++te;
    U.set(B, fn);
    let { dsMatches: an, revalidatingFetchers: Sn } = Jy(
      at,
      ge,
      u,
      c,
      e.history,
      D,
      jn,
      be,
      jt,
      l,
      !1,
      L,
      F,
      ae,
      ee,
      Q,
      Na,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Ge.route.id, We],
      De
    ), yi = Ro(be, We.data), _n = new Map(D.fetchers);
    _n.set(B, yi), Sn.filter((dt) => dt.key !== B).forEach((dt) => {
      let Zn = dt.key, rn = _n.get(Zn), Wi = Ro(
        void 0,
        rn ? rn.data : void 0
      );
      _n.set(Zn, Wi), Ot(Zn), dt.controller && G.set(Zn, dt.controller);
    }), xe({ fetchers: _n });
    let vi = () => Sn.forEach((dt) => Ot(dt.key));
    Ue.signal.addEventListener(
      "abort",
      vi
    );
    let { loaderResults: fa, fetcherResults: da } = await Yt(
      an,
      Sn,
      at,
      jt,
      ge
    );
    if (Ue.signal.aborted)
      return;
    Ue.signal.removeEventListener(
      "abort",
      vi
    ), U.delete(B), G.delete(B), Sn.forEach((dt) => G.delete(dt.key));
    let Be = D.fetchers.has(B), bt = (dt) => {
      if (!Be) return dt;
      let Zn = new Map(dt.fetchers);
      return Zn.set(B, za(We.data)), { ...dt, fetchers: Zn };
    }, gn = wu(fa);
    if (gn)
      return D = bt(D), gt(
        at,
        gn.result,
        !1,
        { preventScrollReset: we }
      );
    if (gn = wu(da), gn)
      return Q.add(gn.key), D = bt(D), gt(
        at,
        gn.result,
        !1,
        { preventScrollReset: we }
      );
    let Ln = new Map(D.fetchers);
    Be && Ln.set(B, za(We.data));
    let { loaderData: bi, errors: Ia } = lv(
      D,
      jn,
      fa,
      void 0,
      Sn,
      da,
      Ln
    );
    Ea(fn, Ln), D.navigation.state === "loading" && fn > A ? (Fe(I, "Expected pending action"), K && K.abort(), Re(D.navigation.location, {
      matches: jn,
      loaderData: bi,
      errors: Ia,
      fetchers: Ln
    })) : (xe({
      errors: Ia,
      loaderData: ov(
        D.loaderData,
        bi,
        jn,
        Ia
      ),
      fetchers: Ln
    }), L = !1);
  }
  async function Pe(B, Z, W, pe, ge, Ee, ve, we, be) {
    let De = D.fetchers.get(B);
    mt(
      B,
      Ro(
        be,
        De ? De.data : void 0
      ),
      { flushSync: ve }
    );
    let Ae = new AbortController(), Ue = gl(
      e.history,
      W,
      Ae.signal
    );
    if (Ee) {
      let We = await pt(
        pe,
        new URL(Ue.url).pathname,
        Ue.signal,
        B
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        ot(B, Z, We.error, { flushSync: ve });
        return;
      } else if (We.matches)
        pe = We.matches;
      else {
        ot(
          B,
          Z,
          ra(404, { pathname: W }),
          { flushSync: ve }
        );
        return;
      }
    }
    let je = Gu(pe, W);
    G.set(B, Ae);
    let Ge = te, rt = wl(
      u,
      c,
      Ue,
      W,
      pe,
      je,
      l,
      ge
    ), Ct = await yt(
      Ue,
      W,
      rt,
      ge,
      B
    ), st = Ct[je.route.id];
    if (!st) {
      for (let We of pe)
        if (Ct[We.route.id]) {
          st = Ct[We.route.id];
          break;
        }
    }
    if (G.get(B) === Ae && G.delete(B), !Ue.signal.aborted) {
      if (ae.has(B)) {
        mt(B, za(void 0));
        return;
      }
      if (wr(st))
        if (A > Ge) {
          mt(B, za(void 0));
          return;
        } else {
          Q.add(B), await gt(Ue, st, !1, {
            preventScrollReset: we
          });
          return;
        }
      if (In(st)) {
        ot(B, Z, st.error);
        return;
      }
      mt(B, za(st.data));
    }
  }
  async function gt(B, Z, W, {
    submission: pe,
    fetcherSubmission: ge,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    W || (ne?.resolve(), ne = null), Z.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let we = Z.response.headers.get("Location");
    Fe(we, "Expected a Location header on the redirect Response"), we = iv(
      we,
      new URL(B.url),
      p,
      e.history
    );
    let be = _h(D.location, we, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Z.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (nm(we)) {
        const Ct = EE(a, we, !0);
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
    let De = ve === !0 || Z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ae, formAction: Ue, formEncType: je } = D.navigation;
    !pe && !ge && Ae && Ue && je && (pe = cv(D.navigation));
    let Ge = pe || ge;
    if (a2.has(Z.response.status) && Ge && hn(Ge.formMethod))
      await Me(De, be, {
        submission: {
          ...Ge,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? oe : void 0
      });
    else {
      let rt = Qd(
        be,
        [],
        De,
        pe
      );
      await Me(De, be, {
        overrideNavigation: rt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ge,
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: W ? oe : void 0
      });
    }
  }
  async function yt(B, Z, W, pe, ge) {
    let Ee, ve = {};
    try {
      Ee = await m2(
        m,
        B,
        Z,
        W,
        ge,
        pe,
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
    if (B.signal.aborted)
      return ve;
    if (!hn(B.method))
      for (let we of W) {
        if (Ee[we.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(we.route.id) && !D.loaderData.hasOwnProperty(we.route.id) && (!D.errors || !D.errors.hasOwnProperty(we.route.id)) && we.shouldCallHandler() && (Ee[we.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${we.route.id}`
          )
        });
      }
    for (let [we, be] of Object.entries(Ee))
      if (E2(be)) {
        let De = be.result;
        ve[we] = {
          type: "redirect",
          response: v2(
            De,
            B,
            we,
            W,
            p
          )
        };
      } else
        ve[we] = await y2(be);
    return ve;
  }
  async function Yt(B, Z, W, pe, ge) {
    let Ee = yt(
      W,
      pe,
      B,
      ge,
      null
    ), ve = Promise.all(
      Z.map(async (De) => {
        if (De.matches && De.match && De.request && De.controller) {
          let Ue = (await yt(
            De.request,
            De.path,
            De.matches,
            ge,
            De.key
          ))[De.match.route.id];
          return { [De.key]: Ue };
        } else
          return Promise.resolve({
            [De.key]: {
              type: "error",
              error: ra(404, {
                pathname: De.path
              })
            }
          });
      })
    ), we = await Ee, be = (await ve).reduce(
      (De, Ae) => Object.assign(De, Ae),
      {}
    );
    return {
      loaderResults: we,
      fetcherResults: be
    };
  }
  function Lt() {
    L = !0, ee.forEach((B, Z) => {
      G.has(Z) && F.add(Z), Ot(Z);
    });
  }
  function mt(B, Z, W = {}) {
    let pe = new Map(D.fetchers);
    pe.set(B, Z), xe(
      { fetchers: pe },
      { flushSync: (W && W.flushSync) === !0 }
    );
  }
  function ot(B, Z, W, pe = {}) {
    let ge = Fi(D.matches, Z), Ee = new Map(D.fetchers);
    nn(Ee, B), xe(
      {
        errors: {
          [ge.route.id]: W
        },
        fetchers: Ee
      },
      { flushSync: (pe && pe.flushSync) === !0 }
    );
  }
  function Xn(B) {
    return ce.set(B, (ce.get(B) || 0) + 1), ae.has(B) && ae.delete(B), D.fetchers.get(B) || i2;
  }
  function xn(B, Z) {
    Ot(B, Z?.reason), mt(B, za(null));
  }
  function nn(B, Z) {
    let W = D.fetchers.get(Z);
    G.has(Z) && !(W && W.state === "loading" && U.has(Z)) && Ot(Z), ee.delete(Z), U.delete(Z), Q.delete(Z), ae.delete(Z), F.delete(Z), B.delete(Z);
  }
  function Qt(B) {
    let Z = (ce.get(B) || 0) - 1;
    Z <= 0 ? (ce.delete(B), ae.add(B)) : ce.set(B, Z), xe({ fetchers: new Map(D.fetchers) });
  }
  function Ot(B, Z) {
    let W = G.get(B);
    W && (W.abort(Z), G.delete(B));
  }
  function Ut(B, Z) {
    for (let W of B) {
      let pe = Z.get(W);
      Fe(pe, `Expected fetcher: ${W}`);
      let ge = za(pe.data);
      Z.set(W, ge);
    }
  }
  function gi(B) {
    let Z = [], W = !1;
    for (let pe of Q) {
      let ge = B.get(pe);
      Fe(ge, `Expected fetcher: ${pe}`), ge.state === "loading" && (Q.delete(pe), Z.push(pe), W = !0);
    }
    return Ut(Z, B), W;
  }
  function Ea(B, Z) {
    let W = [];
    for (let [pe, ge] of U)
      if (ge < B) {
        let Ee = Z.get(pe);
        Fe(Ee, `Expected fetcher: ${pe}`), Ee.state === "loading" && (Ot(pe), U.delete(pe), W.push(pe));
      }
    return Ut(W, Z), W.length > 0;
  }
  function wn(B, Z) {
    let W = D.blockers.get(B) || Co;
    return se.get(B) !== Z && se.set(B, Z), W;
  }
  function ua(B) {
    D.blockers.delete(B), se.delete(B);
  }
  function On(B, Z) {
    let W = D.blockers.get(B) || Co;
    Fe(
      W.state === "unblocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "blocked" || W.state === "blocked" && Z.state === "proceeding" || W.state === "blocked" && Z.state === "unblocked" || W.state === "proceeding" && Z.state === "unblocked",
      `Invalid blocker state transition: ${W.state} -> ${Z.state}`
    );
    let pe = new Map(D.blockers);
    pe.set(B, Z), xe({ blockers: pe });
  }
  function Fn({
    currentLocation: B,
    nextLocation: Z,
    historyAction: W
  }) {
    if (se.size === 0)
      return;
    se.size > 1 && It(!1, "A router only supports one blocker at a time");
    let pe = Array.from(se.entries()), [ge, Ee] = pe[pe.length - 1], ve = D.blockers.get(ge);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: B, nextLocation: Z, historyAction: W }))
      return ge;
  }
  function cn(B) {
    let Z = ra(404, { pathname: B }), W = d.activeRoutes, { matches: pe, route: ge } = xu(W);
    return { notFoundMatches: pe, route: ge, error: Z };
  }
  function He(B, Z, W) {
    if (S = B, R = Z, C = W || null, !N && D.navigation === Pd) {
      N = !0;
      let pe = Vt(D.location, D.matches);
      pe != null && xe({ restoreScrollPosition: pe });
    }
    return () => {
      S = null, R = null, C = null;
    };
  }
  function vt(B, Z) {
    return C && C(
      B,
      Z.map((pe) => DE(pe, D.loaderData))
    ) || B.key;
  }
  function Ht(B, Z) {
    if (S && R) {
      let W = vt(B, Z);
      S[W] = R();
    }
  }
  function Vt(B, Z) {
    if (S) {
      let W = vt(B, Z), pe = S[W];
      if (typeof pe == "number")
        return pe;
    }
    return null;
  }
  function pn(B, Z, W) {
    if (e.patchRoutesOnNavigation) {
      let pe = d.branches;
      if (B) {
        if (Object.keys(B[0].params).length > 0)
          return { active: !0, matches: ga(
            Z,
            W,
            p,
            !0,
            pe
          ) };
      } else
        return { active: !0, matches: ga(
          Z,
          W,
          p,
          !0,
          pe
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(B, Z, W, pe) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: B };
    let ge = B;
    for (; ; ) {
      let Ee = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: W,
          path: Z,
          matches: ge,
          fetcherKey: pe,
          patch: (De, Ae) => {
            W.aborted || Wy(
              De,
              Ae,
              d,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (De) {
        return { type: "error", error: De, partialMatches: ge };
      }
      if (W.aborted)
        return { type: "aborted" };
      let ve = d.branches, we = ga(
        d.activeRoutes,
        Z,
        p,
        !1,
        ve
      ), be = null;
      if (we) {
        if (Object.keys(we[0].params).length === 0)
          return { type: "success", matches: we };
        if (be = ga(
          d.activeRoutes,
          Z,
          p,
          !0,
          ve
        ), !(be && ge.length < be.length && Kt(
          ge,
          be.slice(0, ge.length)
        )))
          return { type: "success", matches: we };
      }
      if (be || (be = ga(
        d.activeRoutes,
        Z,
        p,
        !0,
        ve
      )), !be || Kt(ge, be))
        return { type: "success", matches: null };
      ge = be;
    }
  }
  function Kt(B, Z) {
    return B.length === Z.length && B.every((W, pe) => W.route.id === Z[pe].route.id);
  }
  function ca(B) {
    c = {}, d.setHmrRoutes(
      qo(
        B,
        u,
        void 0,
        c
      )
    );
  }
  function en(B, Z, W = !1) {
    Wy(
      B,
      Z,
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
      return D;
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
    initialize: Se,
    subscribe: _e,
    enableScrollRestoration: He,
    navigate: $e,
    fetch: Je,
    revalidate: ft,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (B) => e.history.createHref(B),
    encodeLocation: (B) => e.history.encodeLocation(B),
    getFetcher: Xn,
    resetFetcher: xn,
    deleteFetcher: Qt,
    dispose: Te,
    getBlocker: wn,
    deleteBlocker: ua,
    patchRoutes: en,
    _internalFetchControllers: G,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ca,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(B) {
      xe(B);
    }
  }, e.instrumentations && (V = PE(
    V,
    e.instrumentations.map((B) => B.router).filter(Boolean)
  )), V;
}
function s2(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function Eh(e, a, r, l, s, u) {
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
    am(c),
    oa(e.pathname, r) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = om(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let y = new URLSearchParams(p.search), g = y.getAll("index");
      y.delete("index"), g.filter((x) => x).forEach((x) => y.append("index", x));
      let v = y.toString();
      p.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (p.pathname = IE({ basename: r, pathname: p.pathname })), Ua(p);
}
function Ky(e, a, r) {
  if (!r || !s2(r))
    return { path: a };
  if (r.formMethod && !R2(r.formMethod))
    return {
      path: a,
      error: ra(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: ra(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = L1(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!hn(u))
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
      if (!hn(u))
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
    d = Ch(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    d = Ch(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    d = r.body, p = rv(d);
  else if (r.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(r.body), p = rv(d);
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
  if (hn(m.formMethod))
    return { path: a, submission: m };
  let y = Sa(a);
  return e && y.search && om(y.search) && d.append("index", ""), y.search = `?${d}`, { path: Ua(y), submission: m };
}
function Jy(e, a, r, l, s, u, c, d, p, m, y, g, v, x, S, C, R, N, z, E, O, H) {
  let k = O ? In(O[1]) ? O[1].error : O[1].data : void 0, V = s.createURL(u.location), D = s.createURL(p), I;
  if (y && u.errors) {
    let T = Object.keys(u.errors)[0];
    I = c.findIndex((L) => L.route.id === T);
  } else if (O && In(O[1])) {
    let T = O[0];
    I = c.findIndex((L) => L.route.id === T) - 1;
  }
  let ne = O ? O[1].statusCode : void 0, $ = ne && ne >= 400, K = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: D,
    nextParams: c[0].params,
    ...d,
    actionResult: k,
    actionStatus: ne
  }, oe = ts(c), j = c.map((T, L) => {
    let { route: F } = T, G = null;
    if (I != null && L > I)
      G = !1;
    else if (F.lazy)
      G = !0;
    else if (!rm(F))
      G = !1;
    else if (y) {
      let { shouldLoad: Q } = T1(
        F,
        u.loaderData,
        u.errors
      );
      G = Q;
    } else u2(u.loaderData, u.matches[L], T) && (G = !0);
    if (G !== null)
      return Nh(
        r,
        l,
        e,
        p,
        oe,
        T,
        m,
        a,
        G
      );
    let te = !1;
    typeof H == "boolean" ? te = H : $ ? te = !1 : (g || V.pathname + V.search === D.pathname + D.search || V.search !== D.search || c2(u.matches[L], T)) && (te = !0);
    let A = {
      ...K,
      defaultShouldRevalidate: te
    }, U = ko(T, A);
    return Nh(
      r,
      l,
      e,
      p,
      oe,
      T,
      m,
      a,
      U,
      A,
      H
    );
  }), Y = [];
  return S.forEach((T, L) => {
    if (y || !c.some((ce) => ce.route.id === T.routeId) || x.has(L))
      return;
    let F = u.fetchers.get(L), G = F && F.state !== "idle" && F.data === void 0, te = ga(
      R,
      T.path,
      N ?? "/",
      !1,
      E
    );
    if (!te) {
      if (z && G)
        return;
      Y.push({
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
    if (C.has(L))
      return;
    let A = Gu(te, T.path), U = new AbortController(), Q = gl(
      s,
      T.path,
      U.signal
    ), ee = null;
    if (v.has(L))
      v.delete(L), ee = wl(
        r,
        l,
        Q,
        T.path,
        te,
        A,
        m,
        a
      );
    else if (G)
      g && (ee = wl(
        r,
        l,
        Q,
        T.path,
        te,
        A,
        m,
        a
      ));
    else {
      let ce;
      typeof H == "boolean" ? ce = H : $ ? ce = !1 : ce = g;
      let ae = {
        ...K,
        defaultShouldRevalidate: ce
      };
      ko(A, ae) && (ee = wl(
        r,
        l,
        Q,
        T.path,
        te,
        A,
        m,
        a,
        ae
      ));
    }
    ee && Y.push({
      key: L,
      routeId: T.routeId,
      path: T.path,
      matches: ee,
      match: A,
      request: Q,
      controller: U
    });
  }), { dsMatches: j, revalidatingFetchers: Y };
}
function rm(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function T1(e, a, r) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!rm(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = r != null && r[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function u2(e, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !e.hasOwnProperty(r.route.id);
  return l || s;
}
function c2(e, a) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function ko(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Wy(e, a, r, l, s, u) {
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
      (g) => M1(m, g)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = qo(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: g } = p[m], v = y, [x] = qo(
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
function M1(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (r, l) => a.children?.some((s) => M1(r, s))
  ) ?? !1 : !1;
}
var ev = /* @__PURE__ */ new WeakMap(), D1 = ({
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
  let c = ev.get(s);
  c || (c = {}, ev.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = CE(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
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
}, tv = /* @__PURE__ */ new WeakMap();
function f2(e, a, r, l, s) {
  let u = r[e.id];
  if (Fe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let y = tv.get(u);
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
        let C = v[S];
        if (C === void 0)
          continue;
        let R = TE(S), z = u[S] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        S !== "hasErrorBoundary";
        R ? It(
          !R,
          "Route property " + S + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? It(
          !z,
          `Route "${u.id}" has a static property "${S}" defined but its lazy function is also returning a value for this property. The lazy route property "${S}" will be ignored.`
        ) : x[S] = C;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return tv.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let g = D1({
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
async function nv(e) {
  let a = e.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function d2(e) {
  return e.matches.some((a) => a.route.middleware) ? A1(e, () => nv(e)) : nv(e);
}
function A1(e, a) {
  return h2(
    e,
    a,
    (l) => {
      if (C2(l))
        throw l;
      return l;
    },
    S2,
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
      ), p = Fi(
        c,
        c[d].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: l }
      });
    }
  }
}
async function h2(e, a, r, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await z1(
    c,
    d,
    a,
    r,
    l,
    s
  );
}
async function z1(e, a, r, l, s, u, c = 0) {
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
      return g = { value: await z1(
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
function O1(e, a, r, l, s) {
  let u = D1({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = f2(
    l.route,
    hn(r.method) ? "action" : "loader",
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
function Nh(e, a, r, l, s, u, c, d, p, m = null, y) {
  let g = !1, v = O1(
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
      return g = !0, m ? typeof y == "boolean" ? ko(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof x == "boolean" ? ko(u, {
        ...m,
        defaultShouldRevalidate: x
      }) : ko(u, m) : p;
    },
    resolve(x) {
      let { lazy: S, loader: C, middleware: R } = u.route, N = g || p || x && !hn(r.method) && (S || C), z = R && R.length > 0 && !C && !S;
      return N && (hn(r.method) || !z) ? p2({
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
function wl(e, a, r, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: O1(
      e,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Nh(
    e,
    a,
    r,
    l,
    ts(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function m2(e, a, r, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let d = {
    request: a,
    url: j1(a, r),
    pattern: ts(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let g = d;
      return A1(g, () => y({
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
async function p2({
  request: e,
  path: a,
  pattern: r,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, m, y = hn(e.method), g = y ? "action" : "loader", v = (x) => {
    let S, C = new Promise((z, E) => S = E);
    m = () => S(), e.signal.addEventListener("abort", m);
    let R = (z) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: j1(e, a),
        pattern: r,
        params: l.params,
        context: d
      },
      ...z !== void 0 ? [z] : []
    ), N = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => R(E)) : R()) };
      } catch (z) {
        return { type: "error", result: z };
      }
    })();
    return Promise.race([N, C]);
  };
  try {
    let x = y ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let S, [C] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(x).catch((R) => {
            S = R;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (S !== void 0)
          throw S;
        p = C;
      } else {
        await s;
        let S = y ? l.route.action : l.route.loader;
        if (S)
          [p] = await Promise.all([v(S), u]);
        else if (g === "action") {
          let C = new URL(e.url), R = C.pathname + C.search;
          throw ra(405, {
            method: e.method,
            pathname: R,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await v(x);
    else {
      let S = new URL(e.url), C = S.pathname + S.search;
      throw ra(404, {
        pathname: C
      });
    }
  } catch (x) {
    return { type: "error", result: x };
  } finally {
    m && e.signal.removeEventListener("abort", m);
  }
  return p;
}
async function g2(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function y2(e) {
  let { result: a, type: r } = e;
  if (lm(a)) {
    let l;
    try {
      l = await g2(a);
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
  return r === "error" ? uv(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: w2(a),
    statusCode: $o(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: $o(a) ? a.status : void 0
  } : uv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function v2(e, a, r, l, s) {
  let u = e.headers.get("Location");
  if (Fe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !nm(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === r) + 1
    );
    u = Eh(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var av = [
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
function iv(e, a, r, l) {
  if (nm(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (av.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = oa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return im(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (av.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function gl(e, a, r, l) {
  let s = e.createURL(L1(a)).toString(), u = { signal: r };
  if (l && hn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = Ch(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function j1(e, a) {
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
function Ch(e) {
  let a = new URLSearchParams();
  for (let [r, l] of e.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function rv(e) {
  let a = new FormData();
  for (let [r, l] of e.entries())
    a.append(r, l);
  return a;
}
function b2(e, a, r, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, y = r && In(r[1]) ? r[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let v = g.route.id, x = a[v];
    if (Fe(
      !wr(x),
      "Cannot handle redirect results in processLoaderData"
    ), In(x)) {
      let S = x.error;
      if (y !== void 0 && (S = y, y = void 0), c = c || {}, s)
        c[v] = S;
      else {
        let C = Fi(e, v);
        c[C.route.id] == null && (c[C.route.id] = S);
      }
      l || (u[v] = R1), p || (p = !0, d = $o(x.error) ? x.error.status : 500), x.headers && (m[v] = x.headers);
    } else
      u[v] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (m[v] = x.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function lv(e, a, r, l, s, u, c) {
  let { loaderData: d, errors: p } = b2(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: g, controller: v } = m;
    if (v && v.signal.aborted)
      return;
    let x = u[y];
    if (Fe(x, "Did not find corresponding fetcher result"), In(x)) {
      let S = Fi(e.matches, g?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: x.error
      }), c.delete(y);
    } else if (wr(x))
      Fe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = za(x.data);
      c.set(y, S);
    }
  }), { loaderData: d, errors: p };
}
function ov(e, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== R1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function sv(e) {
  return e ? In(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Fi(e, a) {
  return (a ? e.slice(0, e.findIndex((l) => l.route.id === a) + 1) : [...e]).reverse().find((l) => l.route.hasErrorBoundary === !0) || e[0];
}
function xu(e) {
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
function wu(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (wr(s))
      return { key: l, result: s };
  }
}
function L1(e) {
  let a = typeof e == "string" ? Sa(e) : e;
  return Ua({ ...a, hash: "" });
}
function x2(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function w2(e) {
  return new pc(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function S2(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, r]) => typeof a == "string" && _2(r)
  );
}
function _2(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function E2(e) {
  return lm(e.result) && N1.has(e.result.status);
}
function In(e) {
  return e.type === "error";
}
function wr(e) {
  return (e && e.type) === "redirect";
}
function uv(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function lm(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function N2(e) {
  return N1.has(e);
}
function C2(e) {
  return lm(e) && N2(e.status) && e.headers.has("Location");
}
function R2(e) {
  return n2.has(e.toUpperCase());
}
function hn(e) {
  return e2.has(e.toUpperCase());
}
function om(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function Gu(e, a) {
  let r = typeof a == "string" ? Sa(a).search : a.search;
  if (e[e.length - 1].route.index && om(r || ""))
    return e[e.length - 1];
  let l = x1(e);
  return l[l.length - 1];
}
function cv(e) {
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
function Qd(e, a, r, l) {
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
function T2(e, a, r, l) {
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
function Ro(e, a) {
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
function M2(e, a) {
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
function D2(e, a) {
  try {
    let r = e.sessionStorage.getItem(
      C1
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function A2(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      e.sessionStorage.setItem(
        C1,
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
function fv() {
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
var zr = _.createContext(null);
zr.displayName = "DataRouter";
var ns = _.createContext(null);
ns.displayName = "DataRouterState";
var H1 = _.createContext(!1);
function k1() {
  return _.useContext(H1);
}
var sm = _.createContext({
  isTransitioning: !1
});
sm.displayName = "ViewTransition";
var B1 = _.createContext(
  /* @__PURE__ */ new Map()
);
B1.displayName = "Fetchers";
var z2 = _.createContext(null);
z2.displayName = "Await";
var sa = _.createContext(
  null
);
sa.displayName = "Navigation";
var gc = _.createContext(
  null
);
gc.displayName = "Location";
var qa = _.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
qa.displayName = "Route";
var um = _.createContext(null);
um.displayName = "RouteError";
var U1 = "REACT_ROUTER_ERROR", O2 = "REDIRECT", j2 = "ROUTE_ERROR_RESPONSE";
function L2(e) {
  if (e.startsWith(`${U1}:${O2}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function H2(e) {
  if (e.startsWith(
    `${U1}:${j2}:{`
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
function k2(e, { relative: a } = {}) {
  Fe(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = _.useContext(sa), { hash: s, pathname: u, search: c } = is(e, { relative: a }), d = u;
  return r !== "/" && (d = u === "/" ? r : la([r, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function as() {
  return _.useContext(gc) != null;
}
function hi() {
  return Fe(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), _.useContext(gc).location;
}
var V1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function q1(e) {
  _.useContext(sa).static || _.useLayoutEffect(e);
}
function B2() {
  let { isDataRoute: e } = _.useContext(qa);
  return e ? W2() : U2();
}
function U2() {
  Fe(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = _.useContext(zr), { basename: a, navigator: r } = _.useContext(sa), { matches: l } = _.useContext(qa), { pathname: s } = hi(), u = JSON.stringify(am(l)), c = _.useRef(!1);
  return q1(() => {
    c.current = !0;
  }), _.useCallback(
    (p, m = {}) => {
      if (It(c.current, V1), !c.current) return;
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
var V2 = _.createContext(null);
function q2(e) {
  let a = _.useContext(qa).outlet;
  return _.useMemo(
    () => a && /* @__PURE__ */ _.createElement(V2.Provider, { value: e }, a),
    [a, e]
  );
}
function is(e, { relative: a } = {}) {
  let { matches: r } = _.useContext(qa), { pathname: l } = hi(), s = JSON.stringify(am(r));
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
function $2(e, a, r) {
  Fe(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = _.useContext(sa), { matches: s } = _.useContext(qa), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let R = m && m.path || "";
    Y1(
      d,
      !m || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let y = hi(), g;
  g = y;
  let v = g.pathname || "/", x = v;
  if (p !== "/") {
    let R = p.replace(/^\//, "").split("/");
    x = "/" + v.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let S = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (R) => Object.assign(R, {
        route: r.manifest[R.route.id] || R.route
      })
    )
  ) : g1(e, { pathname: x });
  return It(
    m || S != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), It(
    S == null || S[S.length - 1].route.element !== void 0 || S[S.length - 1].route.Component !== void 0 || S[S.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), F2(
    S && S.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, c, R.params),
        pathname: la([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? p : la([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function I2() {
  let e = J2(), a = $o(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ _.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ _.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ _.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ _.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ _.createElement("pre", { style: s }, r) : null, c);
}
var Y2 = /* @__PURE__ */ _.createElement(I2, null), $1 = class extends _.Component {
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
      const r = H2(e.digest);
      r && (e = r);
    }
    let a = e !== void 0 ? /* @__PURE__ */ _.createElement(qa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ _.createElement(
      um.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ _.createElement(G2, { error: e }, a) : a;
  }
};
$1.contextType = H1;
var Kd = /* @__PURE__ */ new WeakMap();
function G2({
  children: e,
  error: a
}) {
  let { basename: r } = _.useContext(sa);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = L2(a.digest);
    if (l) {
      let s = Kd.get(a);
      if (s) throw s;
      let u = S1(l.location, r);
      if (w1 && !Kd.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw Kd.set(a, c), c;
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
function X2({ routeContext: e, match: a, children: r }) {
  let l = _.useContext(zr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ _.createElement(qa.Provider, { value: e }, r);
}
function F2(e, a = [], r) {
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
      pattern: ts(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (y, g, v) => {
      let x, S = !1, C = null, R = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, C = g.route.errorElement || Y2, c && (d < 0 && v === 0 ? (Y1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), S = !0, R = null) : d === v && (S = !0, R = g.route.hydrateFallbackElement || null)));
      let N = a.concat(s.slice(0, v + 1)), z = () => {
        let E;
        return x ? E = C : S ? E = R : g.route.Component ? E = /* @__PURE__ */ _.createElement(g.route.Component, null) : g.route.element ? E = g.route.element : E = y, /* @__PURE__ */ _.createElement(
          X2,
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
      return l && (g.route.ErrorBoundary || g.route.errorElement || v === 0) ? /* @__PURE__ */ _.createElement(
        $1,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: C,
          error: x,
          children: z(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: m
        }
      ) : z();
    },
    null
  );
}
function cm(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Z2(e) {
  let a = _.useContext(zr);
  return Fe(a, cm(e)), a;
}
function I1(e) {
  let a = _.useContext(ns);
  return Fe(a, cm(e)), a;
}
function P2(e) {
  let a = _.useContext(qa);
  return Fe(a, cm(e)), a;
}
function yc(e) {
  let a = P2(e), r = a.matches[a.matches.length - 1];
  return Fe(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Q2() {
  return yc(
    "useRouteId"
    /* UseRouteId */
  );
}
function K2() {
  let e = I1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = yc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function J2() {
  let e = _.useContext(um), a = I1(
    "useRouteError"
    /* UseRouteError */
  ), r = yc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[r];
}
function W2() {
  let { router: e } = Z2(
    "useNavigate"
    /* UseNavigateStable */
  ), a = yc(
    "useNavigate"
    /* UseNavigateStable */
  ), r = _.useRef(!1);
  return q1(() => {
    r.current = !0;
  }), _.useCallback(
    async (s, u = {}) => {
      It(r.current, V1), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var dv = {};
function Y1(e, a, r) {
  !a && !dv[e] && (dv[e] = !0, It(!1, r));
}
var hv = {};
function mv(e, a) {
  !e && !hv[a] && (hv[a] = !0, console.warn(a));
}
var eN = "useOptimistic", pv = pE[eN], tN = () => {
};
function nN(e) {
  return pv ? pv(e) : [e, tN];
}
function aN(e) {
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
var iN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function rN(e, a) {
  return o2({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: SE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: iN,
    mapRouteProperties: aN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var lN = class {
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
function oN({
  router: e,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = k1() || l;
  let [u, c] = _.useState(e.state), [d, p] = nN(u), [m, y] = _.useState(), [g, v] = _.useState({
    isTransitioning: !1
  }), [x, S] = _.useState(), [C, R] = _.useState(), [N, z] = _.useState(), E = _.useRef(/* @__PURE__ */ new Map()), O = _.useCallback(
    (D, { deletedFetchers: I, newErrors: ne, flushSync: $, viewTransitionOpts: K }) => {
      ne && r && Object.values(ne).forEach(
        (j) => r(j, {
          location: D.location,
          params: D.matches[0]?.params ?? {},
          pattern: ts(D.matches)
        })
      ), D.fetchers.forEach((j, Y) => {
        j.data !== void 0 && E.current.set(Y, j.data);
      }), I.forEach((j) => E.current.delete(j)), mv(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (mv(
        K == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !oe) {
        a && $ ? a(() => c(D)) : l === !1 ? c(D) : _.startTransition(() => {
          l === !0 && p((j) => gv(j, D)), c(D);
        });
        return;
      }
      if (a && $) {
        a(() => {
          C && (x?.resolve(), C.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let j = e.window.document.startViewTransition(() => {
          a(() => c(D));
        });
        j.finished.finally(() => {
          a(() => {
            S(void 0), R(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => R(j));
        return;
      }
      C ? (x?.resolve(), C.skipTransition(), z({
        state: D,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (y(D), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      }));
    },
    [
      e.window,
      a,
      C,
      x,
      l,
      p,
      r
    ]
  );
  _.useLayoutEffect(() => e.subscribe(O), [e, O]), _.useEffect(() => {
    g.isTransitioning && !g.flushSync && S(new lN());
  }, [g]), _.useEffect(() => {
    if (x && m && e.window) {
      let D = m, I = x.promise, ne = e.window.document.startViewTransition(async () => {
        l === !1 ? c(D) : _.startTransition(() => {
          l === !0 && p(($) => gv($, D)), c(D);
        }), await I;
      });
      ne.finished.finally(() => {
        S(void 0), R(void 0), y(void 0), v({ isTransitioning: !1 });
      }), R(ne);
    }
  }, [
    m,
    x,
    e.window,
    l,
    p
  ]), _.useEffect(() => {
    x && m && d.location.key === m.location.key && x.resolve();
  }, [x, C, d.location, m]), _.useEffect(() => {
    !g.isTransitioning && N && (y(N.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: N.currentLocation,
      nextLocation: N.nextLocation
    }), z(void 0));
  }, [g.isTransitioning, N]);
  let H = _.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (D) => e.navigate(D),
    push: (D, I, ne) => e.navigate(D, {
      state: I,
      preventScrollReset: ne?.preventScrollReset
    }),
    replace: (D, I, ne) => e.navigate(D, {
      replace: !0,
      state: I,
      preventScrollReset: ne?.preventScrollReset
    })
  }), [e]), k = e.basename || "/", V = _.useMemo(
    () => ({
      router: e,
      navigator: H,
      static: !1,
      basename: k,
      onError: r
    }),
    [e, H, k, r]
  );
  return /* @__PURE__ */ _.createElement(_.Fragment, null, /* @__PURE__ */ _.createElement(zr.Provider, { value: V }, /* @__PURE__ */ _.createElement(ns.Provider, { value: d }, /* @__PURE__ */ _.createElement(B1.Provider, { value: E.current }, /* @__PURE__ */ _.createElement(sm.Provider, { value: g }, /* @__PURE__ */ _.createElement(
    fN,
    {
      basename: k,
      location: d.location,
      navigationType: d.historyAction,
      navigator: H,
      useTransitions: l
    },
    /* @__PURE__ */ _.createElement(
      sN,
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
function gv(e, a) {
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
var sN = _.memo(uN);
function uN({
  routes: e,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return $2(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function cN(e) {
  return q2(e.context);
}
function fN({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Fe(
    !as(),
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
  } = r, C = _.useMemo(() => {
    let R = oa(m, d);
    return R == null ? null : {
      location: {
        pathname: R,
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
    C != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ _.createElement(sa.Provider, { value: p }, /* @__PURE__ */ _.createElement(gc.Provider, { children: a, value: C }));
}
var Xu = "get", Fu = "application/x-www-form-urlencoded";
function vc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function dN(e) {
  return vc(e) && e.tagName.toLowerCase() === "button";
}
function hN(e) {
  return vc(e) && e.tagName.toLowerCase() === "form";
}
function mN(e) {
  return vc(e) && e.tagName.toLowerCase() === "input";
}
function pN(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function gN(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !pN(e);
}
var Su = null;
function yN() {
  if (Su === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Su = !1;
    } catch {
      Su = !0;
    }
  return Su;
}
var vN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Jd(e) {
  return e != null && !vN.has(e) ? (It(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fu}"`
  ), null) : e;
}
function bN(e, a) {
  let r, l, s, u, c;
  if (hN(e)) {
    let d = e.getAttribute("action");
    l = d ? oa(d, a) : null, r = e.getAttribute("method") || Xu, s = Jd(e.getAttribute("enctype")) || Fu, u = new FormData(e);
  } else if (dN(e) || mN(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? oa(p, a) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || Xu, s = Jd(e.getAttribute("formenctype")) || Jd(d.getAttribute("enctype")) || Fu, u = new FormData(d, e), !yN()) {
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
    r = Xu, l = null, s = Fu, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function fm(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function G1(e, a, r, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && oa(s.pathname, a) === "/" ? s.pathname = `${tc(a)}/_root.${l}` : s.pathname = `${tc(s.pathname)}.${l}`, s;
}
async function xN(e, a) {
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
function wN(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function SN(e, a, r) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await xN(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return CN(
    l.flat(1).filter(wN).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function yv(e, a, r, l, s, u) {
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
function _N(e, a, { includeHydrateFallback: r } = {}) {
  return EN(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function EN(e) {
  return [...new Set(e)];
}
function NN(e) {
  let a = {}, r = Object.keys(e).sort();
  for (let l of r)
    a[l] = e[l];
  return a;
}
function CN(e, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(NN(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function dm() {
  let e = _.useContext(zr);
  return fm(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function RN() {
  let e = _.useContext(ns);
  return fm(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var hm = _.createContext(void 0);
hm.displayName = "FrameworkContext";
function mm() {
  let e = _.useContext(hm);
  return fm(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function TN(e, a) {
  let r = _.useContext(hm), [l, s] = _.useState(!1), [u, c] = _.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: g } = a, v = _.useRef(null);
  _.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let C = (N) => {
        N.forEach((z) => {
          c(z.isIntersecting);
        });
      }, R = new IntersectionObserver(C, { threshold: 0.5 });
      return v.current && R.observe(v.current), () => {
        R.disconnect();
      };
    }
  }, [e]), _.useEffect(() => {
    if (l) {
      let C = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(C);
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
      onFocus: To(d, x),
      onBlur: To(p, S),
      onMouseEnter: To(m, x),
      onMouseLeave: To(y, S),
      onTouchStart: To(g, x)
    }
  ] : [!1, v, {}];
}
function To(e, a) {
  return (r) => {
    e && e(r), r.defaultPrevented || a(r);
  };
}
function MN({ page: e, ...a }) {
  let r = k1(), { router: l } = dm(), s = _.useMemo(
    () => g1(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? r ? /* @__PURE__ */ _.createElement(AN, { page: e, matches: s, ...a }) : /* @__PURE__ */ _.createElement(zN, { page: e, matches: s, ...a }) : null;
}
function DN(e) {
  let { manifest: a, routeModules: r } = mm(), [l, s] = _.useState([]);
  return _.useEffect(() => {
    let u = !1;
    return SN(e, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, r]), l;
}
function AN({
  page: e,
  matches: a,
  ...r
}) {
  let l = hi(), { future: s } = mm(), { basename: u } = dm(), c = _.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = G1(
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
function zN({
  page: e,
  matches: a,
  ...r
}) {
  let l = hi(), { future: s, manifest: u, routeModules: c } = mm(), { basename: d } = dm(), { loaderData: p, matches: m } = RN(), y = _.useMemo(
    () => yv(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = _.useMemo(
    () => yv(
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
    let C = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((z) => {
      let E = u.routes[z.route.id];
      !E || !E.hasLoader || (!y.some((O) => O.route.id === z.route.id) && z.route.id in p && c[z.route.id]?.shouldRevalidate || E.hasClientLoader ? R = !0 : C.add(z.route.id));
    }), C.size === 0)
      return [];
    let N = G1(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return R && C.size > 0 && N.searchParams.set(
      "_routes",
      a.filter((z) => C.has(z.route.id)).map((z) => z.route.id).join(",")
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
  ]), x = _.useMemo(
    () => _N(g, u),
    [g, u]
  ), S = DN(g);
  return /* @__PURE__ */ _.createElement(_.Fragment, null, v.map((C) => /* @__PURE__ */ _.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...r })), x.map((C) => /* @__PURE__ */ _.createElement("link", { key: C, rel: "modulepreload", href: C, ...r })), S.map(({ key: C, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ _.createElement(
      "link",
      {
        key: C,
        nonce: r.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function ON(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var jN = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  jN && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var X1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, F1 = _.forwardRef(
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
  }, C) {
    let { basename: R, navigator: N, useTransitions: z } = _.useContext(sa), E = typeof y == "string" && X1.test(y), O = S1(y, R);
    y = O.to;
    let H = k2(y, { relative: s }), k = hi(), V = null;
    if (d) {
      let Y = mc(
        d,
        [],
        k.mask ? k.mask.pathname : "/",
        !0
      );
      R !== "/" && (Y.pathname = Y.pathname === "/" ? R : la([R, Y.pathname])), V = N.createHref(Y);
    }
    let [D, I, ne] = TN(
      l,
      S
    ), $ = BN(y, {
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
    let oe = !(O.isExternal || u), j = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ _.createElement(
        "a",
        {
          ...S,
          ...ne,
          href: (oe ? V : void 0) || O.absoluteURL || H,
          onClick: oe ? K : a,
          ref: ON(C, I),
          target: m,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return D && !E ? /* @__PURE__ */ _.createElement(_.Fragment, null, j, /* @__PURE__ */ _.createElement(MN, { page: H })) : j;
  }
);
F1.displayName = "Link";
var LN = _.forwardRef(
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
    let g = is(c, { relative: m.relative }), v = hi(), x = _.useContext(ns), { navigator: S, basename: C } = _.useContext(sa), R = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    IN(g) && d === !0, N = S.encodeLocation ? S.encodeLocation(g).pathname : g.pathname, z = v.pathname, E = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (z = z.toLowerCase(), E = E ? E.toLowerCase() : null, N = N.toLowerCase()), E && C && (E = oa(E, C) || E);
    const O = N !== "/" && N.endsWith("/") ? N.length - 1 : N.length;
    let H = z === N || !s && z.startsWith(N) && z.charAt(O) === "/", k = E != null && (E === N || !s && E.startsWith(N) && E.charAt(N.length) === "/"), V = {
      isActive: H,
      isPending: k,
      isTransitioning: R
    }, D = H ? a : void 0, I;
    typeof l == "function" ? I = l(V) : I = [
      l,
      H ? "active" : null,
      k ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let ne = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ _.createElement(
      F1,
      {
        ...m,
        "aria-current": D,
        className: I,
        ref: y,
        style: ne,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(V) : p
    );
  }
);
LN.displayName = "NavLink";
var HN = _.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = Xu,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: g,
    defaultShouldRevalidate: v,
    ...x
  }, S) => {
    let { useTransitions: C } = _.useContext(sa), R = qN(), N = $N(d, { relative: m }), z = c.toLowerCase() === "get" ? "get" : "post", E = typeof d == "string" && X1.test(d), O = (H) => {
      if (p && p(H), H.defaultPrevented) return;
      H.preventDefault();
      let k = H.nativeEvent.submitter, V = k?.getAttribute("formmethod") || c, D = () => R(k || H.currentTarget, {
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
      C && r !== !1 ? _.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ _.createElement(
      "form",
      {
        ref: S,
        method: z,
        action: N,
        onSubmit: l ? p : O,
        ...x,
        "data-discover": !E && e === "render" ? "true" : void 0
      }
    );
  }
);
HN.displayName = "Form";
function kN(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Z1(e) {
  let a = _.useContext(zr);
  return Fe(a, kN(e)), a;
}
function BN(e, {
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
  let y = B2(), g = hi(), v = is(e, { relative: c });
  return _.useCallback(
    (x) => {
      if (gN(x, a)) {
        x.preventDefault();
        let S = r !== void 0 ? r : Ua(g) === Ua(v), C = () => y(e, {
          replace: S,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? _.startTransition(() => C()) : C();
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
var UN = 0, VN = () => `__${String(++UN)}__`;
function qN() {
  let { router: e } = Z1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = _.useContext(sa), r = Q2(), l = e.fetch, s = e.navigate;
  return _.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: y, body: g } = bN(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || VN();
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
function $N(e, { relative: a } = {}) {
  let { basename: r } = _.useContext(sa), l = _.useContext(qa);
  Fe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...is(e || ".", { relative: a }) }, c = hi();
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
function IN(e, { relative: a } = {}) {
  let r = _.useContext(sm);
  Fe(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = Z1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = is(e, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = oa(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = oa(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return ec(s.pathname, c) != null || ec(s.pathname, u) != null;
}
const pm = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "flash3_fp4", label: "FlashAttention 3 FP4" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], YN = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], P1 = {
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
}, GN = "Wan2.2-I2V-A14B fp8 (Kijai, bundled)";
class bc extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const xc = "/api/v1/extensions/nexus.video.svi2-pro";
async function Ji(e, a) {
  const r = e.startsWith("http") ? e : `${xc}${e}`, l = await fetch(r, {
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
    throw new bc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function XN(e, a, r) {
  const l = e.startsWith("http") ? e : `${xc}${e}`, s = new EventSource(l);
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
async function Q1() {
  return Ji("/presets");
}
async function FN() {
  return Ji("/settings");
}
async function gm(e) {
  return Ji("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var ZN = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function An({ tone: e = "neutral", children: a, className: r }) {
  const l = [ZN[e], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsx("span", { className: l, children: a });
}
var PN = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, QN = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, KN = "_1h48t1v9";
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
  const p = [PN[e], QN[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ b.jsx("span", { className: KN, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Pt(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let a = "";
  if (Array.isArray(e))
    for (let r = 0, l; r < e.length; r++)
      (l = Pt(e[r])) !== "" && (a += (a && " ") + l);
  else
    for (let r in e)
      e[r] && (a += (a && " ") + r);
  return a;
}
var JN = { value: () => {
} };
function wc() {
  for (var e = 0, a = arguments.length, r = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new Zu(r);
}
function Zu(e) {
  this._ = e;
}
function WN(e, a) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
Zu.prototype = wc.prototype = {
  constructor: Zu,
  on: function(e, a) {
    var r = this._, l = WN(e + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = eC(r[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) r[s] = vv(r[s], e.name, a);
      else if (a == null) for (s in r) r[s] = vv(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var r in a) e[r] = a[r].slice();
    return new Zu(e);
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
function eC(e, a) {
  for (var r = 0, l = e.length, s; r < l; ++r)
    if ((s = e[r]).name === a)
      return s.value;
}
function vv(e, a, r) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = JN, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return r != null && e.push({ name: a, value: r }), e;
}
var Rh = "http://www.w3.org/1999/xhtml";
const bv = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Rh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Sc(e) {
  var a = e += "", r = a.indexOf(":");
  return r >= 0 && (a = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), bv.hasOwnProperty(a) ? { space: bv[a], local: e } : e;
}
function tC(e) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === Rh && a.documentElement.namespaceURI === Rh ? a.createElement(e) : a.createElementNS(r, e);
  };
}
function nC(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function K1(e) {
  var a = Sc(e);
  return (a.local ? nC : tC)(a);
}
function aC() {
}
function ym(e) {
  return e == null ? aC : function() {
    return this.querySelector(e);
  };
}
function iC(e) {
  typeof e != "function" && (e = ym(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, y = 0; y < c; ++y)
      (p = u[y]) && (m = e.call(p, p.__data__, y, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[y] = m);
  return new Gn(l, this._parents);
}
function rC(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function lC() {
  return [];
}
function J1(e) {
  return e == null ? lC : function() {
    return this.querySelectorAll(e);
  };
}
function oC(e) {
  return function() {
    return rC(e.apply(this, arguments));
  };
}
function sC(e) {
  typeof e == "function" ? e = oC(e) : e = J1(e);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new Gn(l, s);
}
function W1(e) {
  return function() {
    return this.matches(e);
  };
}
function ex(e) {
  return function(a) {
    return a.matches(e);
  };
}
var uC = Array.prototype.find;
function cC(e) {
  return function() {
    return uC.call(this.children, e);
  };
}
function fC() {
  return this.firstElementChild;
}
function dC(e) {
  return this.select(e == null ? fC : cC(typeof e == "function" ? e : ex(e)));
}
var hC = Array.prototype.filter;
function mC() {
  return Array.from(this.children);
}
function pC(e) {
  return function() {
    return hC.call(this.children, e);
  };
}
function gC(e) {
  return this.selectAll(e == null ? mC : pC(typeof e == "function" ? e : ex(e)));
}
function yC(e) {
  typeof e != "function" && (e = W1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Gn(l, this._parents);
}
function tx(e) {
  return new Array(e.length);
}
function vC() {
  return new Gn(this._enter || this._groups.map(tx), this._parents);
}
function nc(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
nc.prototype = {
  constructor: nc,
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
function bC(e) {
  return function() {
    return e;
  };
}
function xC(e, a, r, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : r[c] = new nc(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function wC(e, a, r, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), y = a.length, g = u.length, v = new Array(y), x;
  for (d = 0; d < y; ++d)
    (p = a[d]) && (v[d] = x = c.call(p, p.__data__, d, a) + "", m.has(x) ? s[d] = p : m.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = m.get(x)) ? (l[d] = p, p.__data__ = u[d], m.delete(x)) : r[d] = new nc(e, u[d]);
  for (d = 0; d < y; ++d)
    (p = a[d]) && m.get(v[d]) === p && (s[d] = p);
}
function SC(e) {
  return e.__data__;
}
function _C(e, a) {
  if (!arguments.length) return Array.from(this, SC);
  var r = a ? wC : xC, l = this._parents, s = this._groups;
  typeof e != "function" && (e = bC(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], g = s[m], v = g.length, x = EC(e.call(y, y && y.__data__, m, l)), S = x.length, C = d[m] = new Array(S), R = c[m] = new Array(S), N = p[m] = new Array(v);
    r(y, g, C, R, N, x, a);
    for (var z = 0, E = 0, O, H; z < S; ++z)
      if (O = C[z]) {
        for (z >= E && (E = z + 1); !(H = R[E]) && ++E < S; ) ;
        O._next = H || null;
      }
  }
  return c = new Gn(c, l), c._enter = d, c._exit = p, c;
}
function EC(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function NC() {
  return new Gn(this._exit || this._groups.map(tx), this._parents);
}
function CC(e, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function RC(e) {
  for (var a = e.selection ? e.selection() : e, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = r[p], y = l[p], g = m.length, v = d[p] = new Array(g), x, S = 0; S < g; ++S)
      (x = m[S] || y[S]) && (v[S] = x);
  for (; p < s; ++p)
    d[p] = r[p];
  return new Gn(d, this._parents);
}
function TC() {
  for (var e = this._groups, a = -1, r = e.length; ++a < r; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function MC(e) {
  e || (e = DC);
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
function DC(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function AC() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function zC() {
  return Array.from(this);
}
function OC() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function jC() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function LC() {
  return !this.node();
}
function HC(e) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function kC(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function BC(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function UC(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function VC(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function qC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function $C(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function IC(e, a) {
  var r = Sc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? BC : kC : typeof a == "function" ? r.local ? $C : qC : r.local ? VC : UC)(r, a));
}
function nx(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function YC(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function GC(e, a, r) {
  return function() {
    this.style.setProperty(e, a, r);
  };
}
function XC(e, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, r);
  };
}
function FC(e, a, r) {
  return arguments.length > 1 ? this.each((a == null ? YC : typeof a == "function" ? XC : GC)(e, a, r ?? "")) : Nl(this.node(), e);
}
function Nl(e, a) {
  return e.style.getPropertyValue(a) || nx(e).getComputedStyle(e, null).getPropertyValue(a);
}
function ZC(e) {
  return function() {
    delete this[e];
  };
}
function PC(e, a) {
  return function() {
    this[e] = a;
  };
}
function QC(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function KC(e, a) {
  return arguments.length > 1 ? this.each((a == null ? ZC : typeof a == "function" ? QC : PC)(e, a)) : this.node()[e];
}
function ax(e) {
  return e.trim().split(/^|\s+/);
}
function vm(e) {
  return e.classList || new ix(e);
}
function ix(e) {
  this._node = e, this._names = ax(e.getAttribute("class") || "");
}
ix.prototype = {
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
function rx(e, a) {
  for (var r = vm(e), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function lx(e, a) {
  for (var r = vm(e), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function JC(e) {
  return function() {
    rx(this, e);
  };
}
function WC(e) {
  return function() {
    lx(this, e);
  };
}
function eR(e, a) {
  return function() {
    (a.apply(this, arguments) ? rx : lx)(this, e);
  };
}
function tR(e, a) {
  var r = ax(e + "");
  if (arguments.length < 2) {
    for (var l = vm(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? eR : a ? JC : WC)(r, a));
}
function nR() {
  this.textContent = "";
}
function aR(e) {
  return function() {
    this.textContent = e;
  };
}
function iR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function rR(e) {
  return arguments.length ? this.each(e == null ? nR : (typeof e == "function" ? iR : aR)(e)) : this.node().textContent;
}
function lR() {
  this.innerHTML = "";
}
function oR(e) {
  return function() {
    this.innerHTML = e;
  };
}
function sR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function uR(e) {
  return arguments.length ? this.each(e == null ? lR : (typeof e == "function" ? sR : oR)(e)) : this.node().innerHTML;
}
function cR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function fR() {
  return this.each(cR);
}
function dR() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function hR() {
  return this.each(dR);
}
function mR(e) {
  var a = typeof e == "function" ? e : K1(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function pR() {
  return null;
}
function gR(e, a) {
  var r = typeof e == "function" ? e : K1(e), l = a == null ? pR : typeof a == "function" ? a : ym(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function yR() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function vR() {
  return this.each(yR);
}
function bR() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function xR() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function wR(e) {
  return this.select(e ? xR : bR);
}
function SR(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function _R(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function ER(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function NR(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function CR(e, a, r) {
  return function() {
    var l = this.__on, s, u = _R(a);
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
function RR(e, a, r) {
  var l = ER(e + ""), s, u = l.length, c;
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
  for (d = a ? CR : NR, s = 0; s < u; ++s) this.each(d(l[s], a, r));
  return this;
}
function ox(e, a, r) {
  var l = nx(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function TR(e, a) {
  return function() {
    return ox(this, e, a);
  };
}
function MR(e, a) {
  return function() {
    return ox(this, e, a.apply(this, arguments));
  };
}
function DR(e, a) {
  return this.each((typeof a == "function" ? MR : TR)(e, a));
}
function* AR() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var sx = [null];
function Gn(e, a) {
  this._groups = e, this._parents = a;
}
function rs() {
  return new Gn([[document.documentElement]], sx);
}
function zR() {
  return this;
}
Gn.prototype = rs.prototype = {
  constructor: Gn,
  select: iC,
  selectAll: sC,
  selectChild: dC,
  selectChildren: gC,
  filter: yC,
  data: _C,
  enter: vC,
  exit: NC,
  join: CC,
  merge: RC,
  selection: zR,
  order: TC,
  sort: MC,
  call: AC,
  nodes: zC,
  node: OC,
  size: jC,
  empty: LC,
  each: HC,
  attr: IC,
  style: FC,
  property: KC,
  classed: tR,
  text: rR,
  html: uR,
  raise: fR,
  lower: hR,
  append: mR,
  insert: gR,
  remove: vR,
  clone: wR,
  datum: SR,
  on: RR,
  dispatch: DR,
  [Symbol.iterator]: AR
};
function Yn(e) {
  return typeof e == "string" ? new Gn([[document.querySelector(e)]], [document.documentElement]) : new Gn([[e]], sx);
}
function OR(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function ya(e, a) {
  if (e = OR(e), a === void 0 && (a = e.currentTarget), a) {
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
const jR = { passive: !1 }, Io = { capture: !0, passive: !1 };
function Wd(e) {
  e.stopImmediatePropagation();
}
function Sl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ux(e) {
  var a = e.document.documentElement, r = Yn(e).on("dragstart.drag", Sl, Io);
  "onselectstart" in a ? r.on("selectstart.drag", Sl, Io) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function cx(e, a) {
  var r = e.document.documentElement, l = Yn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", Sl, Io), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const _u = (e) => () => e;
function Th(e, {
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
Th.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function LR(e) {
  return !e.ctrlKey && !e.button;
}
function HR() {
  return this.parentNode;
}
function kR(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function BR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function fx() {
  var e = LR, a = HR, r = kR, l = BR, s = {}, u = wc("start", "drag", "end"), c = 0, d, p, m, y, g = 0;
  function v(O) {
    O.on("mousedown.drag", x).filter(l).on("touchstart.drag", R).on("touchmove.drag", N, jR).on("touchend.drag touchcancel.drag", z).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(O, H) {
    if (!(y || !e.call(this, O, H))) {
      var k = E(this, a.call(this, O, H), O, H, "mouse");
      k && (Yn(O.view).on("mousemove.drag", S, Io).on("mouseup.drag", C, Io), ux(O.view), Wd(O), m = !1, d = O.clientX, p = O.clientY, k("start", O));
    }
  }
  function S(O) {
    if (Sl(O), !m) {
      var H = O.clientX - d, k = O.clientY - p;
      m = H * H + k * k > g;
    }
    s.mouse("drag", O);
  }
  function C(O) {
    Yn(O.view).on("mousemove.drag mouseup.drag", null), cx(O.view, m), Sl(O), s.mouse("end", O);
  }
  function R(O, H) {
    if (e.call(this, O, H)) {
      var k = O.changedTouches, V = a.call(this, O, H), D = k.length, I, ne;
      for (I = 0; I < D; ++I)
        (ne = E(this, V, O, H, k[I].identifier, k[I])) && (Wd(O), ne("start", O, k[I]));
    }
  }
  function N(O) {
    var H = O.changedTouches, k = H.length, V, D;
    for (V = 0; V < k; ++V)
      (D = s[H[V].identifier]) && (Sl(O), D("drag", O, H[V]));
  }
  function z(O) {
    var H = O.changedTouches, k = H.length, V, D;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), V = 0; V < k; ++V)
      (D = s[H[V].identifier]) && (Wd(O), D("end", O, H[V]));
  }
  function E(O, H, k, V, D, I) {
    var ne = u.copy(), $ = ya(I || k, H), K, oe, j;
    if ((j = r.call(O, new Th("beforestart", {
      sourceEvent: k,
      target: v,
      identifier: D,
      active: c,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: ne
    }), V)) != null)
      return K = j.x - $[0] || 0, oe = j.y - $[1] || 0, function Y(T, L, F) {
        var G = $, te;
        switch (T) {
          case "start":
            s[D] = Y, te = c++;
            break;
          case "end":
            delete s[D], --c;
          // falls through
          case "drag":
            $ = ya(F || L, H), te = c;
            break;
        }
        ne.call(
          T,
          O,
          new Th(T, {
            sourceEvent: L,
            subject: j,
            target: v,
            identifier: D,
            active: te,
            x: $[0] + K,
            y: $[1] + oe,
            dx: $[0] - G[0],
            dy: $[1] - G[1],
            dispatch: ne
          }),
          V
        );
      };
  }
  return v.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : _u(!!O), v) : e;
  }, v.container = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : _u(O), v) : a;
  }, v.subject = function(O) {
    return arguments.length ? (r = typeof O == "function" ? O : _u(O), v) : r;
  }, v.touchable = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : _u(!!O), v) : l;
  }, v.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? v : O;
  }, v.clickDistance = function(O) {
    return arguments.length ? (g = (O = +O) * O, v) : Math.sqrt(g);
  }, v;
}
function bm(e, a, r) {
  e.prototype = a.prototype = r, r.constructor = e;
}
function dx(e, a) {
  var r = Object.create(e.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function ls() {
}
var Yo = 0.7, ac = 1 / Yo, _l = "\\s*([+-]?\\d+)\\s*", Go = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ka = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", UR = /^#([0-9a-f]{3,8})$/, VR = new RegExp(`^rgb\\(${_l},${_l},${_l}\\)$`), qR = new RegExp(`^rgb\\(${ka},${ka},${ka}\\)$`), $R = new RegExp(`^rgba\\(${_l},${_l},${_l},${Go}\\)$`), IR = new RegExp(`^rgba\\(${ka},${ka},${ka},${Go}\\)$`), YR = new RegExp(`^hsl\\(${Go},${ka},${ka}\\)$`), GR = new RegExp(`^hsla\\(${Go},${ka},${ka},${Go}\\)$`), xv = {
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
bm(ls, Cr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: wv,
  // Deprecated! Use color.formatHex.
  formatHex: wv,
  formatHex8: XR,
  formatHsl: FR,
  formatRgb: Sv,
  toString: Sv
});
function wv() {
  return this.rgb().formatHex();
}
function XR() {
  return this.rgb().formatHex8();
}
function FR() {
  return hx(this).formatHsl();
}
function Sv() {
  return this.rgb().formatRgb();
}
function Cr(e) {
  var a, r;
  return e = (e + "").trim().toLowerCase(), (a = UR.exec(e)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? _v(a) : r === 3 ? new zn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? Eu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? Eu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = VR.exec(e)) ? new zn(a[1], a[2], a[3], 1) : (a = qR.exec(e)) ? new zn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = $R.exec(e)) ? Eu(a[1], a[2], a[3], a[4]) : (a = IR.exec(e)) ? Eu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = YR.exec(e)) ? Cv(a[1], a[2] / 100, a[3] / 100, 1) : (a = GR.exec(e)) ? Cv(a[1], a[2] / 100, a[3] / 100, a[4]) : xv.hasOwnProperty(e) ? _v(xv[e]) : e === "transparent" ? new zn(NaN, NaN, NaN, 0) : null;
}
function _v(e) {
  return new zn(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Eu(e, a, r, l) {
  return l <= 0 && (e = a = r = NaN), new zn(e, a, r, l);
}
function ZR(e) {
  return e instanceof ls || (e = Cr(e)), e ? (e = e.rgb(), new zn(e.r, e.g, e.b, e.opacity)) : new zn();
}
function Mh(e, a, r, l) {
  return arguments.length === 1 ? ZR(e) : new zn(e, a, r, l ?? 1);
}
function zn(e, a, r, l) {
  this.r = +e, this.g = +a, this.b = +r, this.opacity = +l;
}
bm(zn, Mh, dx(ls, {
  brighter(e) {
    return e = e == null ? ac : Math.pow(ac, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Yo : Math.pow(Yo, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new zn(Er(this.r), Er(this.g), Er(this.b), ic(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ev,
  // Deprecated! Use color.formatHex.
  formatHex: Ev,
  formatHex8: PR,
  formatRgb: Nv,
  toString: Nv
}));
function Ev() {
  return `#${Sr(this.r)}${Sr(this.g)}${Sr(this.b)}`;
}
function PR() {
  return `#${Sr(this.r)}${Sr(this.g)}${Sr(this.b)}${Sr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Nv() {
  const e = ic(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Er(this.r)}, ${Er(this.g)}, ${Er(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ic(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Er(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Sr(e) {
  return e = Er(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Cv(e, a, r, l) {
  return l <= 0 ? e = a = r = NaN : r <= 0 || r >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new va(e, a, r, l);
}
function hx(e) {
  if (e instanceof va) return new va(e.h, e.s, e.l, e.opacity);
  if (e instanceof ls || (e = Cr(e)), !e) return new va();
  if (e instanceof va) return e;
  e = e.rgb();
  var a = e.r / 255, r = e.g / 255, l = e.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (r - l) / d + (r < l) * 6 : r === u ? c = (l - a) / d + 2 : c = (a - r) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new va(c, d, p, e.opacity);
}
function QR(e, a, r, l) {
  return arguments.length === 1 ? hx(e) : new va(e, a, r, l ?? 1);
}
function va(e, a, r, l) {
  this.h = +e, this.s = +a, this.l = +r, this.opacity = +l;
}
bm(va, QR, dx(ls, {
  brighter(e) {
    return e = e == null ? ac : Math.pow(ac, e), new va(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Yo : Math.pow(Yo, e), new va(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new zn(
      eh(e >= 240 ? e - 240 : e + 120, s, l),
      eh(e, s, l),
      eh(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new va(Rv(this.h), Nu(this.s), Nu(this.l), ic(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = ic(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Rv(this.h)}, ${Nu(this.s) * 100}%, ${Nu(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Rv(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Nu(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function eh(e, a, r) {
  return (e < 60 ? a + (r - a) * e / 60 : e < 180 ? r : e < 240 ? a + (r - a) * (240 - e) / 60 : a) * 255;
}
const xm = (e) => () => e;
function KR(e, a) {
  return function(r) {
    return e + r * a;
  };
}
function JR(e, a, r) {
  return e = Math.pow(e, r), a = Math.pow(a, r) - e, r = 1 / r, function(l) {
    return Math.pow(e + l * a, r);
  };
}
function WR(e) {
  return (e = +e) == 1 ? mx : function(a, r) {
    return r - a ? JR(a, r, e) : xm(isNaN(a) ? r : a);
  };
}
function mx(e, a) {
  var r = a - e;
  return r ? KR(e, r) : xm(isNaN(e) ? a : e);
}
const rc = (function e(a) {
  var r = WR(a);
  function l(s, u) {
    var c = r((s = Mh(s)).r, (u = Mh(u)).r), d = r(s.g, u.g), p = r(s.b, u.b), m = mx(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = d(y), s.b = p(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function eT(e, a) {
  a || (a = []);
  var r = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function tT(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function nT(e, a) {
  var r = a ? a.length : 0, l = e ? Math.min(r, e.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = Bo(e[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function aT(e, a) {
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
function iT(e, a) {
  var r = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? r[s] = Bo(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var Dh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, th = new RegExp(Dh.source, "g");
function rT(e) {
  return function() {
    return e;
  };
}
function lT(e) {
  return function(a) {
    return e(a) + "";
  };
}
function px(e, a) {
  var r = Dh.lastIndex = th.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = Dh.exec(e)) && (s = th.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: ja(l, s) })), r = th.lastIndex;
  return r < a.length && (u = a.slice(r), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? lT(p[0].x) : rT(a) : (a = p.length, function(m) {
    for (var y = 0, g; y < a; ++y) d[(g = p[y]).i] = g.x(m);
    return d.join("");
  });
}
function Bo(e, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? xm(a) : (r === "number" ? ja : r === "string" ? (l = Cr(a)) ? (a = l, rc) : px : a instanceof Cr ? rc : a instanceof Date ? aT : tT(a) ? eT : Array.isArray(a) ? nT : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? iT : ja)(e, a);
}
var Tv = 180 / Math.PI, Ah = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function gx(e, a, r, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * r + a * l) && (r -= e * p, l -= a * p), (d = Math.sqrt(r * r + l * l)) && (r /= d, l /= d, p /= d), e * l < a * r && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * Tv,
    skewX: Math.atan(p) * Tv,
    scaleX: c,
    scaleY: d
  };
}
var Cu;
function oT(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Ah : gx(a.a, a.b, a.c, a.d, a.e, a.f);
}
function sT(e) {
  return e == null || (Cu || (Cu = document.createElementNS("http://www.w3.org/2000/svg", "g")), Cu.setAttribute("transform", e), !(e = Cu.transform.baseVal.consolidate())) ? Ah : (e = e.matrix, gx(e.a, e.b, e.c, e.d, e.e, e.f));
}
function yx(e, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, g, v, x, S) {
    if (m !== g || y !== v) {
      var C = x.push("translate(", null, a, null, r);
      S.push({ i: C - 4, x: ja(m, g) }, { i: C - 2, x: ja(y, v) });
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
      var C = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: C - 4, x: ja(m, g) }, { i: C - 2, x: ja(y, v) });
    } else (g !== 1 || v !== 1) && x.push(s(x) + "scale(" + g + "," + v + ")");
  }
  return function(m, y) {
    var g = [], v = [];
    return m = e(m), y = e(y), u(m.translateX, m.translateY, y.translateX, y.translateY, g, v), c(m.rotate, y.rotate, g, v), d(m.skewX, y.skewX, g, v), p(m.scaleX, m.scaleY, y.scaleX, y.scaleY, g, v), m = y = null, function(x) {
      for (var S = -1, C = v.length, R; ++S < C; ) g[(R = v[S]).i] = R.x(x);
      return g.join("");
    };
  };
}
var uT = yx(oT, "px, ", "px)", "deg)"), cT = yx(sT, ", ", ")", ")"), fT = 1e-12;
function Mv(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function dT(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function hT(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Pu = (function e(a, r, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], y = c[0], g = c[1], v = c[2], x = y - d, S = g - p, C = x * x + S * S, R, N;
    if (C < fT)
      N = Math.log(v / m) / a, R = function(V) {
        return [
          d + V * x,
          p + V * S,
          m * Math.exp(a * V * N)
        ];
      };
    else {
      var z = Math.sqrt(C), E = (v * v - m * m + l * C) / (2 * m * r * z), O = (v * v - m * m - l * C) / (2 * v * r * z), H = Math.log(Math.sqrt(E * E + 1) - E), k = Math.log(Math.sqrt(O * O + 1) - O);
      N = (k - H) / a, R = function(V) {
        var D = V * N, I = Mv(H), ne = m / (r * z) * (I * hT(a * D + H) - dT(H));
        return [
          d + ne * x,
          p + ne * S,
          m * I / Mv(a * D + H)
        ];
      };
    }
    return R.duration = N * 1e3 * a / Math.SQRT2, R;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Cl = 0, Lo = 0, Mo = 0, vx = 1e3, lc, Ho, oc = 0, Rr = 0, _c = 0, Xo = typeof performance == "object" && performance.now ? performance : Date, bx = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function wm() {
  return Rr || (bx(mT), Rr = Xo.now() + _c);
}
function mT() {
  Rr = 0;
}
function sc() {
  this._call = this._time = this._next = null;
}
sc.prototype = xx.prototype = {
  constructor: sc,
  restart: function(e, a, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? wm() : +r) + (a == null ? 0 : +a), !this._next && Ho !== this && (Ho ? Ho._next = this : lc = this, Ho = this), this._call = e, this._time = r, zh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, zh());
  }
};
function xx(e, a, r) {
  var l = new sc();
  return l.restart(e, a, r), l;
}
function pT() {
  wm(), ++Cl;
  for (var e = lc, a; e; )
    (a = Rr - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Cl;
}
function Dv() {
  Rr = (oc = Xo.now()) + _c, Cl = Lo = 0;
  try {
    pT();
  } finally {
    Cl = 0, yT(), Rr = 0;
  }
}
function gT() {
  var e = Xo.now(), a = e - oc;
  a > vx && (_c -= a, oc = e);
}
function yT() {
  for (var e, a = lc, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (r = a._next, a._next = null, a = e ? e._next = r : lc = r);
  Ho = e, zh(l);
}
function zh(e) {
  if (!Cl) {
    Lo && (Lo = clearTimeout(Lo));
    var a = e - Rr;
    a > 24 ? (e < 1 / 0 && (Lo = setTimeout(Dv, e - Xo.now() - _c)), Mo && (Mo = clearInterval(Mo))) : (Mo || (oc = Xo.now(), Mo = setInterval(gT, vx)), Cl = 1, bx(Dv));
  }
}
function Av(e, a, r) {
  var l = new sc();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, r), l;
}
var vT = wc("start", "end", "cancel", "interrupt"), bT = [], wx = 0, zv = 1, Oh = 2, Qu = 3, Ov = 4, jh = 5, Ku = 6;
function Ec(e, a, r, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (r in c) return;
  xT(e, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: vT,
    tween: bT,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: wx
  });
}
function Sm(e, a) {
  var r = _a(e, a);
  if (r.state > wx) throw new Error("too late; already scheduled");
  return r;
}
function $a(e, a) {
  var r = _a(e, a);
  if (r.state > Qu) throw new Error("too late; already running");
  return r;
}
function _a(e, a) {
  var r = e.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function xT(e, a, r) {
  var l = e.__transition, s;
  l[a] = r, r.timer = xx(u, 0, r.time);
  function u(m) {
    r.state = zv, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var y, g, v, x;
    if (r.state !== zv) return p();
    for (y in l)
      if (x = l[y], x.name === r.name) {
        if (x.state === Qu) return Av(c);
        x.state === Ov ? (x.state = Ku, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[y]) : +y < a && (x.state = Ku, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[y]);
      }
    if (Av(function() {
      r.state === Qu && (r.state = Ov, r.timer.restart(d, r.delay, r.time), d(m));
    }), r.state = Oh, r.on.call("start", e, e.__data__, r.index, r.group), r.state === Oh) {
      for (r.state = Qu, s = new Array(v = r.tween.length), y = 0, g = -1; y < v; ++y)
        (x = r.tween[y].value.call(e, e.__data__, r.index, r.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var y = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(p), r.state = jh, 1), g = -1, v = s.length; ++g < v; )
      s[g].call(e, y);
    r.state === jh && (r.on.call("end", e, e.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = Ku, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function Ju(e, a) {
  var r = e.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > Oh && l.state < jh, l.state = Ku, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete r[c];
    }
    u && delete e.__transition;
  }
}
function wT(e) {
  return this.each(function() {
    Ju(this, e);
  });
}
function ST(e, a) {
  var r, l;
  return function() {
    var s = $a(this, e), u = s.tween;
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
function _T(e, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = $a(this, e), c = u.tween;
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
function ET(e, a) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = _a(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? ST : _T)(r, e, a));
}
function _m(e, a, r) {
  var l = e._id;
  return e.each(function() {
    var s = $a(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return _a(s, l).value[a];
  };
}
function Sx(e, a) {
  var r;
  return (typeof a == "number" ? ja : a instanceof Cr ? rc : (r = Cr(a)) ? (a = r, rc) : px)(e, a);
}
function NT(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function CT(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function RT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function TT(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function MT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function DT(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function AT(e, a) {
  var r = Sc(e), l = r === "transform" ? cT : Sx;
  return this.attrTween(e, typeof a == "function" ? (r.local ? DT : MT)(r, l, _m(this, "attr." + e, a)) : a == null ? (r.local ? CT : NT)(r) : (r.local ? TT : RT)(r, l, a));
}
function zT(e, a) {
  return function(r) {
    this.setAttribute(e, a.call(this, r));
  };
}
function OT(e, a) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, a.call(this, r));
  };
}
function jT(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && OT(e, u)), r;
  }
  return s._value = a, s;
}
function LT(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && zT(e, u)), r;
  }
  return s._value = a, s;
}
function HT(e, a) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = Sc(e);
  return this.tween(r, (l.local ? jT : LT)(l, a));
}
function kT(e, a) {
  return function() {
    Sm(this, e).delay = +a.apply(this, arguments);
  };
}
function BT(e, a) {
  return a = +a, function() {
    Sm(this, e).delay = a;
  };
}
function UT(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? kT : BT)(a, e)) : _a(this.node(), a).delay;
}
function VT(e, a) {
  return function() {
    $a(this, e).duration = +a.apply(this, arguments);
  };
}
function qT(e, a) {
  return a = +a, function() {
    $a(this, e).duration = a;
  };
}
function $T(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? VT : qT)(a, e)) : _a(this.node(), a).duration;
}
function IT(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    $a(this, e).ease = a;
  };
}
function YT(e) {
  var a = this._id;
  return arguments.length ? this.each(IT(a, e)) : _a(this.node(), a).ease;
}
function GT(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    $a(this, e).ease = r;
  };
}
function XT(e) {
  if (typeof e != "function") throw new Error();
  return this.each(GT(this._id, e));
}
function FT(e) {
  typeof e != "function" && (e = W1(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new di(l, this._parents, this._name, this._id);
}
function ZT(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, r = e._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = r[d], y = p.length, g = c[d] = new Array(y), v, x = 0; x < y; ++x)
      (v = p[x] || m[x]) && (g[x] = v);
  for (; d < l; ++d)
    c[d] = a[d];
  return new di(c, this._parents, this._name, this._id);
}
function PT(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function QT(e, a, r) {
  var l, s, u = PT(a) ? Sm : $a;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, r), c.on = s;
  };
}
function KT(e, a) {
  var r = this._id;
  return arguments.length < 2 ? _a(this.node(), r).on.on(e) : this.each(QT(r, e, a));
}
function JT(e) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    a && a.removeChild(this);
  };
}
function WT() {
  return this.on("end.remove", JT(this._id));
}
function eM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = ym(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), y, g, v = 0; v < p; ++v)
      (y = d[v]) && (g = e.call(y, y.__data__, v, d)) && ("__data__" in y && (g.__data__ = y.__data__), m[v] = g, Ec(m[v], a, r, v, m, _a(y, r)));
  return new di(u, this._parents, a, r);
}
function tM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = J1(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, y, g = 0; g < m; ++g)
      if (y = p[g]) {
        for (var v = e.call(y, y.__data__, g, p), x, S = _a(y, r), C = 0, R = v.length; C < R; ++C)
          (x = v[C]) && Ec(x, a, r, C, v, S);
        u.push(v), c.push(y);
      }
  return new di(u, c, a, r);
}
var nM = rs.prototype.constructor;
function aM() {
  return new nM(this._groups, this._parents);
}
function iM(e, a) {
  var r, l, s;
  return function() {
    var u = Nl(this, e), c = (this.style.removeProperty(e), Nl(this, e));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function _x(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function rM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = Nl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function lM(e, a, r) {
  var l, s, u;
  return function() {
    var c = Nl(this, e), d = r(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), Nl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function oM(e, a) {
  var r, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = $a(this, e), m = p.on, y = p.value[u] == null ? d || (d = _x(a)) : void 0;
    (m !== r || s !== y) && (l = (r = m).copy()).on(c, s = y), p.on = l;
  };
}
function sM(e, a, r) {
  var l = (e += "") == "transform" ? uT : Sx;
  return a == null ? this.styleTween(e, iM(e, l)).on("end.style." + e, _x(e)) : typeof a == "function" ? this.styleTween(e, lM(e, l, _m(this, "style." + e, a))).each(oM(this._id, e)) : this.styleTween(e, rM(e, l, a), r).on("end.style." + e, null);
}
function uM(e, a, r) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), r);
  };
}
function cM(e, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && uM(e, c, r)), l;
  }
  return u._value = a, u;
}
function fM(e, a, r) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, cM(e, a, r ?? ""));
}
function dM(e) {
  return function() {
    this.textContent = e;
  };
}
function hM(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function mM(e) {
  return this.tween("text", typeof e == "function" ? hM(_m(this, "text", e)) : dM(e == null ? "" : e + ""));
}
function pM(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function gM(e) {
  var a, r;
  function l() {
    var s = e.apply(this, arguments);
    return s !== r && (a = (r = s) && pM(s)), a;
  }
  return l._value = e, l;
}
function yM(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, gM(e));
}
function vM() {
  for (var e = this._name, a = this._id, r = Ex(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var y = _a(p, a);
        Ec(p, e, r, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new di(l, this._parents, e, r);
}
function bM() {
  var e, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var m = $a(this, l), y = m.on;
      y !== e && (a = (e = y).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), m.on = a;
    }), s === 0 && u();
  });
}
var xM = 0;
function di(e, a, r, l) {
  this._groups = e, this._parents = a, this._name = r, this._id = l;
}
function Ex() {
  return ++xM;
}
var oi = rs.prototype;
di.prototype = {
  constructor: di,
  select: eM,
  selectAll: tM,
  selectChild: oi.selectChild,
  selectChildren: oi.selectChildren,
  filter: FT,
  merge: ZT,
  selection: aM,
  transition: vM,
  call: oi.call,
  nodes: oi.nodes,
  node: oi.node,
  size: oi.size,
  empty: oi.empty,
  each: oi.each,
  on: KT,
  attr: AT,
  attrTween: HT,
  style: sM,
  styleTween: fM,
  text: mM,
  textTween: yM,
  remove: WT,
  tween: ET,
  delay: UT,
  duration: $T,
  ease: YT,
  easeVarying: XT,
  end: bM,
  [Symbol.iterator]: oi[Symbol.iterator]
};
function wM(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var SM = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: wM
};
function _M(e, a) {
  for (var r; !(r = e.__transition) || !(r = r[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function EM(e) {
  var a, r;
  e instanceof di ? (a = e._id, e = e._name) : (a = Ex(), (r = SM).time = wm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && Ec(p, e, a, m, c, r || _M(p, a));
  return new di(l, this._parents, e, a);
}
rs.prototype.interrupt = wT;
rs.prototype.transition = EM;
const Ru = (e) => () => e;
function NM(e, {
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
function ci(e, a, r) {
  this.k = e, this.x = a, this.y = r;
}
ci.prototype = {
  constructor: ci,
  scale: function(e) {
    return e === 1 ? this : new ci(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new ci(this.k, this.x + this.k * e, this.y + this.k * a);
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
var Nc = new ci(1, 0, 0);
Nx.prototype = ci.prototype;
function Nx(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Nc;
  return e.__zoom;
}
function nh(e) {
  e.stopImmediatePropagation();
}
function Do(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function CM(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function RM() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function jv() {
  return this.__zoom || Nc;
}
function TM(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function MM() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function DM(e, a, r) {
  var l = e.invertX(a[0][0]) - r[0][0], s = e.invertX(a[1][0]) - r[1][0], u = e.invertY(a[0][1]) - r[0][1], c = e.invertY(a[1][1]) - r[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function Cx() {
  var e = CM, a = RM, r = DM, l = TM, s = MM, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = Pu, m = wc("start", "zoom", "end"), y, g, v, x = 500, S = 150, C = 0, R = 10;
  function N(j) {
    j.property("__zoom", jv).on("wheel.zoom", D, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", ne).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", oe).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function(j, Y, T, L) {
    var F = j.selection ? j.selection() : j;
    F.property("__zoom", jv), j !== F ? H(j, Y, T, L) : F.interrupt().each(function() {
      k(this, arguments).event(L).start().zoom(null, typeof Y == "function" ? Y.apply(this, arguments) : Y).end();
    });
  }, N.scaleBy = function(j, Y, T, L) {
    N.scaleTo(j, function() {
      var F = this.__zoom.k, G = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return F * G;
    }, T, L);
  }, N.scaleTo = function(j, Y, T, L) {
    N.transform(j, function() {
      var F = a.apply(this, arguments), G = this.__zoom, te = T == null ? O(F) : typeof T == "function" ? T.apply(this, arguments) : T, A = G.invert(te), U = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return r(E(z(G, U), te, A), F, c);
    }, T, L);
  }, N.translateBy = function(j, Y, T, L) {
    N.transform(j, function() {
      return r(this.__zoom.translate(
        typeof Y == "function" ? Y.apply(this, arguments) : Y,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), a.apply(this, arguments), c);
    }, null, L);
  }, N.translateTo = function(j, Y, T, L, F) {
    N.transform(j, function() {
      var G = a.apply(this, arguments), te = this.__zoom, A = L == null ? O(G) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(Nc.translate(A[0], A[1]).scale(te.k).translate(
        typeof Y == "function" ? -Y.apply(this, arguments) : -Y,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), G, c);
    }, L, F);
  };
  function z(j, Y) {
    return Y = Math.max(u[0], Math.min(u[1], Y)), Y === j.k ? j : new ci(Y, j.x, j.y);
  }
  function E(j, Y, T) {
    var L = Y[0] - T[0] * j.k, F = Y[1] - T[1] * j.k;
    return L === j.x && F === j.y ? j : new ci(j.k, L, F);
  }
  function O(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function H(j, Y, T, L) {
    j.on("start.zoom", function() {
      k(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var F = this, G = arguments, te = k(F, G).event(L), A = a.apply(F, G), U = T == null ? O(A) : typeof T == "function" ? T.apply(F, G) : T, Q = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), ee = F.__zoom, ce = typeof Y == "function" ? Y.apply(F, G) : Y, ae = p(ee.invert(U).concat(Q / ee.k), ce.invert(U).concat(Q / ce.k));
      return function(se) {
        if (se === 1) se = ce;
        else {
          var P = ae(se), me = Q / P[2];
          se = new ci(me, U[0] - P[0] * me, U[1] - P[1] * me);
        }
        te.zoom(null, se);
      };
    });
  }
  function k(j, Y, T) {
    return !T && j.__zooming || new V(j, Y);
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
        new NM(j, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: m
        }),
        Y
      );
    }
  };
  function D(j, ...Y) {
    if (!e.apply(this, arguments)) return;
    var T = k(this, Y).event(j), L = this.__zoom, F = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, l.apply(this, arguments)))), G = ya(j);
    if (T.wheel)
      (T.mouse[0][0] !== G[0] || T.mouse[0][1] !== G[1]) && (T.mouse[1] = L.invert(T.mouse[0] = G)), clearTimeout(T.wheel);
    else {
      if (L.k === F) return;
      T.mouse = [G, L.invert(G)], Ju(this), T.start();
    }
    Do(j), T.wheel = setTimeout(te, S), T.zoom("mouse", r(E(z(L, F), T.mouse[0], T.mouse[1]), T.extent, c));
    function te() {
      T.wheel = null, T.end();
    }
  }
  function I(j, ...Y) {
    if (v || !e.apply(this, arguments)) return;
    var T = j.currentTarget, L = k(this, Y, !0).event(j), F = Yn(j.view).on("mousemove.zoom", U, !0).on("mouseup.zoom", Q, !0), G = ya(j, T), te = j.clientX, A = j.clientY;
    ux(j.view), nh(j), L.mouse = [G, this.__zoom.invert(G)], Ju(this), L.start();
    function U(ee) {
      if (Do(ee), !L.moved) {
        var ce = ee.clientX - te, ae = ee.clientY - A;
        L.moved = ce * ce + ae * ae > C;
      }
      L.event(ee).zoom("mouse", r(E(L.that.__zoom, L.mouse[0] = ya(ee, T), L.mouse[1]), L.extent, c));
    }
    function Q(ee) {
      F.on("mousemove.zoom mouseup.zoom", null), cx(ee.view, L.moved), Do(ee), L.event(ee).end();
    }
  }
  function ne(j, ...Y) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, L = ya(j.changedTouches ? j.changedTouches[0] : j, this), F = T.invert(L), G = T.k * (j.shiftKey ? 0.5 : 2), te = r(E(z(T, G), L, F), a.apply(this, Y), c);
      Do(j), d > 0 ? Yn(this).transition().duration(d).call(H, te, L, j) : Yn(this).call(N.transform, te, L, j);
    }
  }
  function $(j, ...Y) {
    if (e.apply(this, arguments)) {
      var T = j.touches, L = T.length, F = k(this, Y, j.changedTouches.length === L).event(j), G, te, A, U;
      for (nh(j), te = 0; te < L; ++te)
        A = T[te], U = ya(A, this), U = [U, this.__zoom.invert(U), A.identifier], F.touch0 ? !F.touch1 && F.touch0[2] !== U[2] && (F.touch1 = U, F.taps = 0) : (F.touch0 = U, G = !0, F.taps = 1 + !!y);
      y && (y = clearTimeout(y)), G && (F.taps < 2 && (g = U[0], y = setTimeout(function() {
        y = null;
      }, x)), Ju(this), F.start());
    }
  }
  function K(j, ...Y) {
    if (this.__zooming) {
      var T = k(this, Y).event(j), L = j.changedTouches, F = L.length, G, te, A, U;
      for (Do(j), G = 0; G < F; ++G)
        te = L[G], A = ya(te, this), T.touch0 && T.touch0[2] === te.identifier ? T.touch0[0] = A : T.touch1 && T.touch1[2] === te.identifier && (T.touch1[0] = A);
      if (te = T.that.__zoom, T.touch1) {
        var Q = T.touch0[0], ee = T.touch0[1], ce = T.touch1[0], ae = T.touch1[1], se = (se = ce[0] - Q[0]) * se + (se = ce[1] - Q[1]) * se, P = (P = ae[0] - ee[0]) * P + (P = ae[1] - ee[1]) * P;
        te = z(te, Math.sqrt(se / P)), A = [(Q[0] + ce[0]) / 2, (Q[1] + ce[1]) / 2], U = [(ee[0] + ae[0]) / 2, (ee[1] + ae[1]) / 2];
      } else if (T.touch0) A = T.touch0[0], U = T.touch0[1];
      else return;
      T.zoom("touch", r(E(te, A, U), T.extent, c));
    }
  }
  function oe(j, ...Y) {
    if (this.__zooming) {
      var T = k(this, Y).event(j), L = j.changedTouches, F = L.length, G, te;
      for (nh(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), G = 0; G < F; ++G)
        te = L[G], T.touch0 && T.touch0[2] === te.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === te.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (te = ya(te, this), Math.hypot(g[0] - te[0], g[1] - te[1]) < R)) {
        var A = Yn(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function(j) {
    return arguments.length ? (l = typeof j == "function" ? j : Ru(+j), N) : l;
  }, N.filter = function(j) {
    return arguments.length ? (e = typeof j == "function" ? j : Ru(!!j), N) : e;
  }, N.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : Ru(!!j), N) : s;
  }, N.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : Ru([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), N) : a;
  }, N.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], N) : [u[0], u[1]];
  }, N.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], N) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, N.constrain = function(j) {
    return arguments.length ? (r = j, N) : r;
  }, N.duration = function(j) {
    return arguments.length ? (d = +j, N) : d;
  }, N.interpolate = function(j) {
    return arguments.length ? (p = j, N) : p;
  }, N.on = function() {
    var j = m.on.apply(m, arguments);
    return j === m ? N : j;
  }, N.clickDistance = function(j) {
    return arguments.length ? (C = (j = +j) * j, N) : Math.sqrt(C);
  }, N.tapDistance = function(j) {
    return arguments.length ? (R = +j, N) : R;
  }, N;
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
}, Fo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Rx = ["Enter", " ", "Escape"], Tx = {
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
var Rl;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Rl || (Rl = {}));
var Nr;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Nr || (Nr = {}));
var Zo;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Zo || (Zo = {}));
const Mx = {
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
var Zi;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Zi || (Zi = {}));
var uc;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(uc || (uc = {}));
var ze;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(ze || (ze = {}));
const Lv = {
  [ze.Left]: ze.Right,
  [ze.Right]: ze.Left,
  [ze.Top]: ze.Bottom,
  [ze.Bottom]: ze.Top
};
function Dx(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const Ax = (e) => "id" in e && "source" in e && "target" in e, AM = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Em = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), os = (e, a = [0, 0]) => {
  const { width: r, height: l } = mi(e), s = e.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, zM = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Em(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? cc(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Cc(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Rc(r);
}, ss = (e, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = Cc(r, cc(s)), l = !0);
  }), l ? Rc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Nm = (e, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...Ol(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: y, selectable: g = !0, hidden: v = !1 } = m;
    if (c && !g || v)
      continue;
    const x = y.width ?? m.width ?? m.initialWidth ?? null, S = y.height ?? m.height ?? m.initialHeight ?? null, C = Po(d, Ml(m)), R = (x ?? 0) * (S ?? 0), N = u && C > 0;
    (!m.internals.handleBounds || N || C >= R || m.dragging) && p.push(m);
  }
  return p;
}, OM = (e, a) => {
  const r = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function jM(e, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function LM({ nodes: e, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = jM(e, c), p = ss(d), m = Rm(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function zx({ nodeId: e, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
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
  else d && Mr(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + m],
    [c.extent[1][0] + p, c.extent[1][1] + m]
  ]);
  const v = Mr(g) ? Tr(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", wa.error015()), {
    position: {
      x: v.x - p + (c.measured.width ?? 0) * y[0],
      y: v.y - m + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function HM({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), S = !x && v.parentId && c.find((C) => C.id === v.parentId);
    (x || S) && c.push(v);
  }
  const d = new Set(a.map((v) => v.id)), p = l.filter((v) => v.deletable !== !1), y = OM(c, p);
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
const Tl = (e, a = 0, r = 1) => Math.min(Math.max(e, a), r), Tr = (e = { x: 0, y: 0 }, a, r) => ({
  x: Tl(e.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: Tl(e.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function Ox(e, a, r) {
  const { width: l, height: s } = mi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return Tr(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const Hv = (e, a, r) => e < a ? Tl(Math.abs(e - a), 1, a) / a : e > r ? -Tl(Math.abs(e - r), 1, a) / a : 0, Cm = (e, a, r = 15, l = 40) => {
  const s = Hv(e.x, l, a.width - l) * r, u = Hv(e.y, l, a.height - l) * r;
  return [s, u];
}, Cc = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), Lh = ({ x: e, y: a, width: r, height: l }) => ({
  x: e,
  y: a,
  x2: e + r,
  y2: a + l
}), Rc = ({ x: e, y: a, x2: r, y2: l }) => ({
  x: e,
  y: a,
  width: r - e,
  height: l - a
}), Ml = (e, a = [0, 0]) => {
  const { x: r, y: l } = Em(e) ? e.internals.positionAbsolute : os(e, a);
  return {
    x: r,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, cc = (e, a = [0, 0]) => {
  const { x: r, y: l } = Em(e) ? e.internals.positionAbsolute : os(e, a);
  return {
    x: r,
    y: l,
    x2: r + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, jx = (e, a) => Rc(Cc(Lh(e), Lh(a))), Po = (e, a) => {
  const r = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(r * l);
}, kv = (e) => ba(e.width) && ba(e.height) && ba(e.x) && ba(e.y), ba = (e) => !isNaN(e) && isFinite(e), Lx = (e, a) => (r, l) => {
}, us = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), Ol = ({ x: e, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - r) / s,
    y: (a - l) / s
  };
  return u ? us(d, c) : d;
}, Dl = ({ x: e, y: a }, [r, l, s]) => ({
  x: e * s + r,
  y: a * s + l
});
function dl(e, a) {
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
function kM(e, a, r) {
  if (typeof e == "string" || typeof e == "number") {
    const l = dl(e, r), s = dl(e, a);
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
    const l = dl(e.top ?? e.y ?? 0, r), s = dl(e.bottom ?? e.y ?? 0, r), u = dl(e.left ?? e.x ?? 0, a), c = dl(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function BM(e, a, r, l, s, u) {
  const { x: c, y: d } = Dl(e, [a, r, l]), { x: p, y: m } = Dl({ x: e.x + e.width, y: e.y + e.height }, [a, r, l]), y = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(y),
    bottom: Math.floor(g)
  };
}
const Rm = (e, a, r, l, s, u) => {
  const c = kM(u, a, r), d = (a - c.x) / e.width, p = (r - c.y) / e.height, m = Math.min(d, p), y = Tl(m, l, s), g = e.x + e.width / 2, v = e.y + e.height / 2, x = a / 2 - g * y, S = r / 2 - v * y, C = BM(e, x, S, y, a, r), R = {
    left: Math.min(C.left - c.left, 0),
    top: Math.min(C.top - c.top, 0),
    right: Math.min(C.right - c.right, 0),
    bottom: Math.min(C.bottom - c.bottom, 0)
  };
  return {
    x: x - R.left + R.right,
    y: S - R.top + R.bottom,
    zoom: y
  };
}, Qo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Mr(e) {
  return e != null && e !== "parent";
}
function mi(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function Hx(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function kx(e, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...e }, c = l.get(r);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function Bv(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const r of e)
    if (!a.has(r))
      return !1;
  return !0;
}
function UM() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function VM(e) {
  return { ...Tx, ...e || {} };
}
function Uo(e, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = xa(e), d = Ol({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = r ? us(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const Tm = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), Bx = (e) => e?.getRootNode?.() || window?.document, qM = ["INPUT", "SELECT", "TEXTAREA"];
function Ux(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : qM.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const Vx = (e) => "clientX" in e, xa = (e, a) => {
  const r = Vx(e), l = r ? e.clientX : e.touches?.[0].clientX, s = r ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, Uv = (e, a, r, l, s) => {
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
function qx({ sourceX: e, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, y = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, y, g];
}
function Tu(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function Vv({ pos: e, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (e) {
    case ze.Left:
      return [a - Tu(a - l, u), r];
    case ze.Right:
      return [a + Tu(l - a, u), r];
    case ze.Top:
      return [a, r - Tu(r - s, u)];
    case ze.Bottom:
      return [a, r + Tu(s - r, u)];
  }
}
function $x({ sourceX: e, sourceY: a, sourcePosition: r = ze.Bottom, targetX: l, targetY: s, targetPosition: u = ze.Top, curvature: c = 0.25 }) {
  const [d, p] = Vv({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = Vv({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, v, x, S] = qx({
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
function Ix({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - e) / 2, u = r < e ? r + s : r - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function $M({ sourceNode: e, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function IM({ sourceNode: e, targetNode: a, width: r, height: l, transform: s }) {
  const u = Cc(cc(e), cc(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Po(c, Rc(u)) > 0;
}
const YM = ({ source: e, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${e}${a || ""}-${r}${l || ""}`, GM = (e, a) => a.some((r) => r.source === e.source && r.target === e.target && (r.sourceHandle === e.sourceHandle || !r.sourceHandle && !e.sourceHandle) && (r.targetHandle === e.targetHandle || !r.targetHandle && !e.targetHandle)), XM = (e, a, r = {}) => {
  if (!e.source || !e.target)
    return r.onError?.("006", wa.error006()), a;
  const l = r.getEdgeId || YM;
  let s;
  return Ax(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, GM(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function Yx({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, d] = Ix({
    sourceX: e,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${e},${a}L ${r},${l}`, s, u, c, d];
}
const qv = {
  [ze.Left]: { x: -1, y: 0 },
  [ze.Right]: { x: 1, y: 0 },
  [ze.Top]: { x: 0, y: -1 },
  [ze.Bottom]: { x: 0, y: 1 }
}, FM = ({ source: e, sourcePosition: a = ze.Bottom, target: r }) => a === ze.Left || a === ze.Right ? e.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, $v = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function ZM({ source: e, sourcePosition: a = ze.Bottom, target: r, targetPosition: l = ze.Top, center: s, offset: u, stepPosition: c }) {
  const d = qv[a], p = qv[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, y = { x: r.x + p.x * u, y: r.y + p.y * u }, g = FM({
    source: m,
    sourcePosition: a,
    target: y
  }), v = g.x !== 0 ? "x" : "y", x = g[v];
  let S = [], C, R;
  const N = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [, , E, O] = Ix({
    sourceX: e.x,
    sourceY: e.y,
    targetX: r.x,
    targetY: r.y
  });
  if (d[v] * p[v] === -1) {
    v === "x" ? (C = s.x ?? m.x + (y.x - m.x) * c, R = s.y ?? (m.y + y.y) / 2) : (C = s.x ?? (m.x + y.x) / 2, R = s.y ?? m.y + (y.y - m.y) * c);
    const D = [
      { x: C, y: m.y },
      { x: C, y: y.y }
    ], I = [
      { x: m.x, y: R },
      { x: y.x, y: R }
    ];
    d[v] === x ? S = v === "x" ? D : I : S = v === "x" ? I : D;
  } else {
    const D = [{ x: m.x, y: y.y }], I = [{ x: y.x, y: m.y }];
    if (v === "x" ? S = d.x === x ? I : D : S = d.y === x ? D : I, a === l) {
      const j = Math.abs(e[v] - r[v]);
      if (j <= u) {
        const Y = Math.min(u - 1, u - j);
        d[v] === x ? N[v] = (m[v] > e[v] ? -1 : 1) * Y : z[v] = (y[v] > r[v] ? -1 : 1) * Y;
      }
    }
    if (a !== l) {
      const j = v === "x" ? "y" : "x", Y = d[v] === p[j], T = m[j] > y[j], L = m[j] < y[j];
      (d[v] === 1 && (!Y && T || Y && L) || d[v] !== 1 && (!Y && L || Y && T)) && (S = v === "x" ? D : I);
    }
    const ne = { x: m.x + N.x, y: m.y + N.y }, $ = { x: y.x + z.x, y: y.y + z.y }, K = Math.max(Math.abs(ne.x - S[0].x), Math.abs($.x - S[0].x)), oe = Math.max(Math.abs(ne.y - S[0].y), Math.abs($.y - S[0].y));
    K >= oe ? (C = (ne.x + $.x) / 2, R = S[0].y) : (C = S[0].x, R = (ne.y + $.y) / 2);
  }
  const H = { x: m.x + N.x, y: m.y + N.y }, k = { x: y.x + z.x, y: y.y + z.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...H.x !== S[0].x || H.y !== S[0].y ? [H] : [],
    ...S,
    ...k.x !== S[S.length - 1].x || k.y !== S[S.length - 1].y ? [k] : [],
    r
  ], C, R, E, O];
}
function PM(e, a, r, l) {
  const s = Math.min($v(e, a) / 2, $v(a, r) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === r.x || e.y === c && c === r.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < r.x ? -1 : 1, y = e.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const d = e.x < r.x ? 1 : -1, p = e.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function Hh({ sourceX: e, sourceY: a, sourcePosition: r = ze.Bottom, targetX: l, targetY: s, targetPosition: u = ze.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: y = 0.5 }) {
  const [g, v, x, S, C] = ZM({
    source: { x: e, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: y
  });
  let R = `M${g[0].x} ${g[0].y}`;
  for (let N = 1; N < g.length - 1; N++)
    R += PM(g[N - 1], g[N], g[N + 1], c);
  return R += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [R, v, x, S, C];
}
function Iv(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function QM(e) {
  const { sourceNode: a, targetNode: r } = e;
  if (!Iv(a) || !Iv(r))
    return null;
  const l = a.internals.handleBounds || Yv(a.handles), s = r.internals.handleBounds || Yv(r.handles), u = Gv(l?.source ?? [], e.sourceHandle), c = Gv(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Rl.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", wa.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || ze.Bottom, p = c?.position || ze.Top, m = Dr(a, u, d), y = Dr(r, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function Yv(e) {
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
function Dr(e, a, r = ze.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? mi(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? r) {
    case ze.Top:
      return { x: s + c / 2, y: u };
    case ze.Right:
      return { x: s + c, y: u + d / 2 };
    case ze.Bottom:
      return { x: s + c / 2, y: u + d };
    case ze.Left:
      return { x: s, y: u + d / 2 };
  }
}
function Gv(e, a) {
  return e && (a ? e.find((r) => r.id === a) : e[0]) || null;
}
function kh(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function KM(e, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = kh(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || r, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const Gx = 1e3, JM = 10, Mm = {
  nodeOrigin: [0, 0],
  nodeExtent: Fo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, WM = {
  ...Mm,
  checkEquality: !0
};
function Dm(e, a) {
  const r = { ...e };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function eD(e, a, r) {
  const l = Dm(Mm, r);
  for (const s of e.values())
    if (s.parentId)
      zm(s, e, a, l);
    else {
      const u = os(s, l.nodeOrigin), c = Mr(s.extent) ? s.extent : l.nodeExtent, d = Tr(u, c, mi(s));
      s.internals.positionAbsolute = d;
    }
}
function tD(e, a) {
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
function Am(e) {
  return e === "manual";
}
function Bh(e, a, r, l = {}) {
  const s = Dm(WM, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !Am(s.zIndexMode) ? Gx : 0;
  let p = e.length > 0, m = !1;
  a.clear(), r.clear();
  for (const y of e) {
    let g = c.get(y.id);
    if (s.checkEquality && y === g?.internals.userNode)
      a.set(y.id, g);
    else {
      const v = os(y, s.nodeOrigin), x = Mr(y.extent) ? y.extent : s.nodeExtent, S = Tr(v, x, mi(y));
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
          handleBounds: tD(y, g),
          z: Xx(y, d, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), y.parentId && zm(g, a, r, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function nD(e, a) {
  if (!e.parentId)
    return;
  const r = a.get(e.parentId);
  r ? r.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function zm(e, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = Dm(Mm, l), m = e.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  nD(e, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && p === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * JM), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const g = u && !Am(p) ? Gx : 0, { x: v, y: x, z: S } = aD(e, y, c, d, g, p), { positionAbsolute: C } = e.internals, R = v !== C.x || x !== C.y;
  (R || S !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: R ? { x: v, y: x } : C,
      z: S
    }
  });
}
function Xx(e, a, r) {
  const l = ba(e.zIndex) ? e.zIndex : 0;
  return Am(r) ? l : l + (e.selected ? a : 0);
}
function aD(e, a, r, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = mi(e), m = os(e, r), y = Mr(e.extent) ? Tr(m, e.extent, p) : m;
  let g = Tr({ x: c + y.x, y: d + y.y }, l, p);
  e.extent === "parent" && (g = Ox(g, p, a));
  const v = Xx(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= v ? x + 1 : v
  };
}
function Om(e, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? Ml(d), m = jx(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, y = mi(d), g = d.origin ?? l, v = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, x = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, S = Math.max(y.width, Math.round(c.width)), C = Math.max(y.height, Math.round(c.height)), R = (S - y.width) * g[0], N = (C - y.height) * g[1];
    (v > 0 || x > 0 || R || N) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - v + R,
        y: d.position.y - x + N
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
        width: S + (v ? g[0] * v - R : 0),
        height: C + (x ? g[1] * x - N : 0)
      }
    });
  }), s;
}
function iD(e, a, r, l, s, u, c) {
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
    const C = Tm(x.nodeElement), R = S.measured.width !== C.width || S.measured.height !== C.height;
    if (!!(C.width && C.height && (R || !S.internals.handleBounds || x.force))) {
      const z = x.nodeElement.getBoundingClientRect(), E = Mr(S.extent) ? S.extent : u;
      let { positionAbsolute: O } = S.internals;
      S.parentId && S.extent === "parent" ? O = Ox(O, C, a.get(S.parentId)) : E && (O = Tr(O, E, C));
      const H = {
        ...S,
        measured: C,
        internals: {
          ...S.internals,
          positionAbsolute: O,
          handleBounds: {
            source: Uv("source", x.nodeElement, z, g, S.id),
            target: Uv("target", x.nodeElement, z, g, S.id)
          }
        }
      };
      a.set(S.id, H), S.parentId && zm(H, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, R && (m.push({
        id: S.id,
        type: "dimensions",
        dimensions: C
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: Ml(H, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Om(v, a, r, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: p };
}
async function rD({ delta: e, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
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
function Xv(e, a, r, l, s, u) {
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
function Fx(e, a, r) {
  e.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, y = `${u}-${d}--${s}-${c}`;
    Xv("source", p, y, e, s, c), Xv("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function Zx(e, a) {
  if (!e.parentId)
    return !1;
  const r = a.get(e.parentId);
  return r ? r.selected ? !0 : Zx(r, a) : !1;
}
function Fv(e, a, r) {
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
function lD(e, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !Zx(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function ah({ nodeId: e, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
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
function oD({ dragItems: e, snapGrid: a, x: r, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = us(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function sD({ onNodeMouseDown: e, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, y = null, g = !1, v = null, x = !1, S = !1, C = null;
  function R({ noDragClassName: z, handleSelector: E, domNode: O, isSelectable: H, nodeId: k, nodeClickDistance: V = 0 }) {
    v = Yn(O);
    function D({ x: K, y: oe }) {
      const { nodeLookup: j, nodeExtent: Y, snapGrid: T, snapToGrid: L, nodeOrigin: F, onNodeDrag: G, onSelectionDrag: te, onError: A, updateNodePositions: U } = a();
      u = { x: K, y: oe };
      let Q = !1;
      const ee = d.size > 1, ce = ee && Y ? Lh(ss(d)) : null, ae = ee && L ? oD({
        dragItems: d,
        snapGrid: T,
        x: K,
        y: oe
      }) : null;
      for (const [se, P] of d) {
        if (!j.has(se))
          continue;
        let me = { x: K - P.distance.x, y: oe - P.distance.y };
        L && (me = ae ? {
          x: Math.round(me.x + ae.x),
          y: Math.round(me.y + ae.y)
        } : us(me, T));
        let Se = null;
        if (ee && Y && !P.extent && ce) {
          const { positionAbsolute: xe } = P.internals, Re = xe.x - ce.x + Y[0][0], $e = xe.x + P.measured.width - ce.x2 + Y[1][0], ft = xe.y - ce.y + Y[0][1], Me = xe.y + P.measured.height - ce.y2 + Y[1][1];
          Se = [
            [Re, ft],
            [$e, Me]
          ];
        }
        const { position: Te, positionAbsolute: _e } = zx({
          nodeId: se,
          nextPosition: me,
          nodeLookup: j,
          nodeExtent: Se || Y,
          nodeOrigin: F,
          onError: A
        });
        Q = Q || P.position.x !== Te.x || P.position.y !== Te.y, P.position = Te, P.internals.positionAbsolute = _e;
      }
      if (S = S || Q, !!Q && (U(d, !0), C && (l || G || !k && te))) {
        const [se, P] = ah({
          nodeId: k,
          dragItems: d,
          nodeLookup: j
        });
        l?.(C, d, se, P), G?.(C, se, P), k || te?.(C, P);
      }
    }
    async function I() {
      if (!y)
        return;
      const { transform: K, panBy: oe, autoPanSpeed: j, autoPanOnNodeDrag: Y } = a();
      if (!Y) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [T, L] = Cm(m, y, j);
      (T !== 0 || L !== 0) && (u.x = (u.x ?? 0) - T / K[2], u.y = (u.y ?? 0) - L / K[2], await oe({ x: T, y: L }) && D(u)), c = requestAnimationFrame(I);
    }
    function ne(K) {
      const { nodeLookup: oe, multiSelectionActive: j, nodesDraggable: Y, transform: T, snapGrid: L, snapToGrid: F, selectNodesOnDrag: G, onNodeDragStart: te, onSelectionDragStart: A, unselectNodesAndEdges: U } = a();
      g = !0, (!G || !H) && !j && k && (oe.get(k)?.selected || U()), H && G && k && e?.(k);
      const Q = Uo(K.sourceEvent, { transform: T, snapGrid: L, snapToGrid: F, containerBounds: y });
      if (u = Q, d = lD(oe, Y, Q, k), d.size > 0 && (r || te || !k && A)) {
        const [ee, ce] = ah({
          nodeId: k,
          dragItems: d,
          nodeLookup: oe
        });
        r?.(K.sourceEvent, d, ee, ce), te?.(K.sourceEvent, ee, ce), k || A?.(K.sourceEvent, ce);
      }
    }
    const $ = fx().clickDistance(V).on("start", (K) => {
      const { domNode: oe, nodeDragThreshold: j, transform: Y, snapGrid: T, snapToGrid: L } = a();
      y = oe?.getBoundingClientRect() || null, x = !1, S = !1, C = K.sourceEvent, j === 0 && ne(K), u = Uo(K.sourceEvent, { transform: Y, snapGrid: T, snapToGrid: L, containerBounds: y }), m = xa(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: oe, transform: j, snapGrid: Y, snapToGrid: T, nodeDragThreshold: L, nodeLookup: F } = a(), G = Uo(K.sourceEvent, { transform: j, snapGrid: Y, snapToGrid: T, containerBounds: y });
      if (C = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      k && !F.has(k)) && (x = !0), !x) {
        if (!p && oe && g && (p = !0, I()), !g) {
          const te = xa(K.sourceEvent, y), A = te.x - m.x, U = te.y - m.y;
          Math.sqrt(A * A + U * U) > L && ne(K);
        }
        (u.x !== G.xSnapped || u.y !== G.ySnapped) && d && g && (m = xa(K.sourceEvent, y), D(G));
      }
    }).on("end", (K) => {
      if (!g || x) {
        x && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: oe, updateNodePositions: j, onNodeDragStop: Y, onSelectionDragStop: T } = a();
        if (S && (j(d, !1), S = !1), s || Y || !k && T) {
          const [L, F] = ah({
            nodeId: k,
            dragItems: d,
            nodeLookup: oe,
            dragging: !1
          });
          s?.(K.sourceEvent, d, L, F), Y?.(K.sourceEvent, L, F), k || T?.(K.sourceEvent, F);
        }
      }
    }).filter((K) => {
      const oe = K.target;
      return !K.button && (!z || !Fv(oe, `.${z}`, O)) && (!E || Fv(oe, E, O));
    });
    v.call($);
  }
  function N() {
    v?.on(".drag", null);
  }
  return {
    update: R,
    destroy: N
  };
}
function uD(e, a, r) {
  const l = [], s = {
    x: e.x - r,
    y: e.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Po(s, Ml(u)) > 0 && l.push(u);
  return l;
}
const cD = 250;
function fD(e, a, r, l) {
  let s = [], u = 1 / 0;
  const c = uD(e, r, a + cD);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const m of p) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: y, y: g } = Dr(d, m, m.position, !0), v = Math.sqrt(Math.pow(y - e.x, 2) + Math.pow(g - e.y, 2));
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
function Px(e, a, r, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? d?.find((m) => m.id === r) : d?.[0]) ?? null;
  return p && u ? { ...p, ...Dr(c, p, p.position, !0) } : p;
}
function Qx(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function dD(e, a) {
  let r = null;
  return a ? r = !0 : e && !a && (r = !1), r;
}
const Kx = () => !0;
function hD(e, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: y, flowId: g, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: C, onConnectEnd: R, isValidConnection: N = Kx, onReconnectEnd: z, updateConnection: E, getTransform: O, getFromHandle: H, autoPanSpeed: k, dragThreshold: V = 1, handleDomNode: D }) {
  const I = Bx(e.target);
  let ne = 0, $;
  const { x: K, y: oe } = xa(e), j = Qx(u, D), Y = d?.getBoundingClientRect();
  let T = !1;
  if (!Y || !j)
    return;
  const L = Px(s, j, l, p, a);
  if (!L)
    return;
  let F = xa(e, Y), G = !1, te = null, A = !1, U = null;
  function Q() {
    if (!y || !Y)
      return;
    const [Te, _e] = Cm(F, Y, k);
    v({ x: Te, y: _e }), ne = requestAnimationFrame(Q);
  }
  const ee = {
    ...L,
    nodeId: s,
    type: j,
    position: L.position
  }, ce = p.get(s);
  let se = {
    inProgress: !0,
    isValid: null,
    from: Dr(ce, ee, ze.Left, !0),
    fromHandle: ee,
    fromPosition: ee.position,
    fromNode: ce,
    to: F,
    toHandle: null,
    toPosition: Lv[ee.position],
    toNode: null,
    pointer: F
  };
  function P() {
    T = !0, E(se), S?.(e, { nodeId: s, handleId: l, handleType: j });
  }
  V === 0 && P();
  function me(Te) {
    if (!T) {
      const { x: Me, y: Xe } = xa(Te), ke = Me - K, Ie = Xe - oe;
      if (!(ke * ke + Ie * Ie > V * V))
        return;
      P();
    }
    if (!H() || !ee) {
      Se(Te);
      return;
    }
    const _e = O();
    F = xa(Te, Y), $ = fD(Ol(F, _e, !1, [1, 1]), r, p, ee), G || (Q(), G = !0);
    const xe = Jx(Te, {
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
    U = xe.handleDomNode, te = xe.connection, A = dD(!!$, xe.isValid);
    const Re = p.get(s), $e = Re ? Dr(Re, ee, ze.Left, !0) : se.from, ft = {
      ...se,
      from: $e,
      isValid: A,
      to: xe.toHandle && A ? Dl({ x: xe.toHandle.x, y: xe.toHandle.y }, _e) : F,
      toHandle: xe.toHandle,
      toPosition: A && xe.toHandle ? xe.toHandle.position : Lv[ee.position],
      toNode: xe.toHandle ? p.get(xe.toHandle.nodeId) : null,
      pointer: F
    };
    E(ft), se = ft;
  }
  function Se(Te) {
    if (!("touches" in Te && Te.touches.length > 0)) {
      if (T) {
        ($ || U) && te && A && C?.(te);
        const { inProgress: _e, ...xe } = se, Re = {
          ...xe,
          toPosition: se.toHandle ? se.toPosition : null
        };
        R?.(Te, Re), u && z?.(Te, Re);
      }
      x(), cancelAnimationFrame(ne), G = !1, A = !1, te = null, U = null, I.removeEventListener("mousemove", me), I.removeEventListener("mouseup", Se), I.removeEventListener("touchmove", me), I.removeEventListener("touchend", Se);
    }
  }
  I.addEventListener("mousemove", me), I.addEventListener("mouseup", Se), I.addEventListener("touchmove", me), I.addEventListener("touchend", Se);
}
function Jx(e, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = Kx, nodeLookup: y }) {
  const g = u === "target", v = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: S } = xa(e), C = c.elementFromPoint(x, S), R = C?.classList.contains(`${d}-flow__handle`) ? C : v, N = {
    handleDomNode: R,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (R) {
    const z = Qx(void 0, R), E = R.getAttribute("data-nodeid"), O = R.getAttribute("data-handleid"), H = R.classList.contains("connectable"), k = R.classList.contains("connectableend");
    if (!E || !z)
      return N;
    const V = {
      source: g ? E : l,
      sourceHandle: g ? O : s,
      target: g ? l : E,
      targetHandle: g ? s : O
    };
    N.connection = V;
    const I = H && k && (r === Rl.Strict ? g && z === "source" || !g && z === "target" : E !== l || O !== s);
    N.isValid = I && m(V), N.toHandle = Px(E, z, O, y, r, !0);
  }
  return N;
}
const Uh = {
  onPointerDown: hD,
  isValid: Jx
};
function mD({ domNode: e, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = Yn(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: y = 1, pannable: g = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const O = r(), H = E.sourceEvent.ctrlKey && Qo() ? 10 : 1, k = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, V = O[2] * Math.pow(2, k * H);
      a.scaleTo(V);
    };
    let C = [0, 0];
    const R = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (C = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, N = (E) => {
      const O = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const H = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], k = [H[0] - C[0], H[1] - C[1]];
      C = H;
      const V = l() * Math.max(O[2], Math.log(O[2])) * (x ? -1 : 1), D = {
        x: O[0] - k[0] * V,
        y: O[1] - k[1] * V
      }, I = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: D.x,
        y: D.y,
        zoom: O[2]
      }, I, d);
    }, z = Cx().on("start", R).on("zoom", g ? N : null).on("zoom.wheel", v ? S : null);
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
}), ih = ({ x: e, y: a, zoom: r }) => Nc.translate(e, a).scale(r), bl = (e, a) => e.target.closest(`.${a}`), Wx = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), pD = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, rh = (e, a = 0, r = pD, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(r).on("end", l) : e;
}, ew = (e) => {
  const a = e.ctrlKey && Qo() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function gD({ zoomPanValues: e, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (y) => {
    if (bl(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const g = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const R = ya(y), N = ew(y), z = g * Math.pow(2, N);
      l.scaleTo(r, z, R, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === Nr.Vertical ? 0 : y.deltaX * v, S = s === Nr.Horizontal ? 0 : y.deltaY * v;
    !Qo() && y.shiftKey && s !== Nr.Vertical && (x = y.deltaY * v, S = 0), l.translateBy(
      r,
      -(x / g) * u,
      -(S / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const C = Tc(r.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(y, C), e.panScrollTimeout = setTimeout(() => {
      m?.(y, C), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(y, C));
  };
}
function yD({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = bl(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function vD({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = Tc(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function bD({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(r && Wx(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Tc(u.transform));
  };
}
function xD({ zoomPanValues: e, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && Wx(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
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
function wD({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: y }) {
  return (g) => {
    const v = e || a, x = r && g.ctrlKey, S = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (bl(g, `${m}-flow__node`) || bl(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !v && !s && !u && !r || c || y && !S || bl(g, d) && S || bl(g, p) && (!S || s && S && !e) || !r && g.ctrlKey && S)
      return !1;
    if (!r && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!v && !s && !x && S || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const C = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || S) && C;
  };
}
function SD({ domNode: e, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = e.getBoundingClientRect(), g = Cx().scaleExtent([a, r]).translateExtent(l), v = Yn(e).call(g);
  z({
    x: s.x,
    y: s.y,
    zoom: Tl(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  g.wheelDelta(ew);
  async function C($, K) {
    return v ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? Bo : Pu).transform(rh(v, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function R({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: oe, userSelectionActive: j, panOnScroll: Y, panOnDrag: T, panOnScrollMode: L, panOnScrollSpeed: F, preventScrolling: G, zoomOnPinch: te, zoomOnScroll: A, zoomOnDoubleClick: U, zoomActivationKeyPressed: Q, lib: ee, onTransformChange: ce, connectionInProgress: ae, paneClickDistance: se, selectionOnDrag: P }) {
    j && !m.isZoomingOrPanning && N();
    const me = Y && !Q && !j;
    g.clickDistance(P ? 1 / 0 : !ba(se) || se < 0 ? 0 : se);
    const Se = me ? gD({
      zoomPanValues: m,
      noWheelClassName: $,
      d3Selection: v,
      d3Zoom: g,
      panOnScrollMode: L,
      panOnScrollSpeed: F,
      zoomOnPinch: te,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : yD({
      noWheelClassName: $,
      preventScrolling: G,
      d3ZoomHandler: x
    });
    v.on("wheel.zoom", Se, { passive: !1 });
    const Te = vD({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", Te);
    const _e = bD({
      zoomPanValues: m,
      panOnDrag: T,
      onPaneContextMenu: !!oe,
      onPanZoom: u,
      onTransformChange: ce
    });
    g.on("zoom", _e);
    const xe = xD({
      zoomPanValues: m,
      panOnDrag: T,
      panOnScroll: Y,
      onPaneContextMenu: oe,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", xe);
    const Re = wD({
      zoomActivationKeyPressed: Q,
      panOnDrag: T,
      zoomOnScroll: A,
      panOnScroll: Y,
      zoomOnDoubleClick: U,
      zoomOnPinch: te,
      userSelectionActive: j,
      noPanClassName: K,
      noWheelClassName: $,
      lib: ee,
      connectionInProgress: ae
    });
    g.filter(Re), U ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function N() {
    g.on("zoom", null);
  }
  async function z($, K, oe) {
    const j = ih($), Y = g?.constrain()(j, K, oe);
    return Y && await C(Y), Y;
  }
  async function E($, K) {
    const oe = ih($);
    return await C(oe, K), oe;
  }
  function O($) {
    if (v) {
      const K = ih($), oe = v.property("__zoom");
      (oe.k !== $.zoom || oe.x !== $.x || oe.y !== $.y) && g?.transform(v, K, null, { sync: !0 });
    }
  }
  function H() {
    const $ = v ? Nx(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function k($, K) {
    return v ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? Bo : Pu).scaleTo(rh(v, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  async function V($, K) {
    return v ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? Bo : Pu).scaleBy(rh(v, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function D($) {
    g?.scaleExtent($);
  }
  function I($) {
    g?.translateExtent($);
  }
  function ne($) {
    const K = !ba($) || $ < 0 ? 0 : $;
    g?.clickDistance(K);
  }
  return {
    update: R,
    destroy: N,
    setViewport: E,
    setViewportConstrained: z,
    getViewport: H,
    scaleTo: k,
    scaleBy: V,
    setScaleExtent: D,
    setTranslateExtent: I,
    syncViewport: O,
    setClickDistance: ne
  };
}
var Al;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Al || (Al = {}));
function _D({ width: e, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = r - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function Zv(e) {
  const a = e.includes("right") || e.includes("left"), r = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function Yi(e, a) {
  return Math.max(0, a - e);
}
function Gi(e, a) {
  return Math.max(0, e - a);
}
function Mu(e, a, r) {
  return Math.max(0, a - e, e - r);
}
function Pv(e, a) {
  return e ? !a : a;
}
function ED(e, a, r, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: y, isVertical: g } = a, v = y && g, { xSnapped: x, ySnapped: S } = r, { minWidth: C, maxWidth: R, minHeight: N, maxHeight: z } = l, { x: E, y: O, width: H, height: k, aspectRatio: V } = e;
  let D = Math.floor(y ? x - e.pointerX : 0), I = Math.floor(g ? S - e.pointerY : 0);
  const ne = H + (p ? -D : D), $ = k + (m ? -I : I), K = -u[0] * H, oe = -u[1] * k;
  let j = Mu(ne, C, R), Y = Mu($, N, z);
  if (c) {
    let F = 0, G = 0;
    p && D < 0 ? F = Yi(E + D + K, c[0][0]) : !p && D > 0 && (F = Gi(E + ne + K, c[1][0])), m && I < 0 ? G = Yi(O + I + oe, c[0][1]) : !m && I > 0 && (G = Gi(O + $ + oe, c[1][1])), j = Math.max(j, F), Y = Math.max(Y, G);
  }
  if (d) {
    let F = 0, G = 0;
    p && D > 0 ? F = Gi(E + D, d[0][0]) : !p && D < 0 && (F = Yi(E + ne, d[1][0])), m && I > 0 ? G = Gi(O + I, d[0][1]) : !m && I < 0 && (G = Yi(O + $, d[1][1])), j = Math.max(j, F), Y = Math.max(Y, G);
  }
  if (s) {
    if (y) {
      const F = Mu(ne / V, N, z) * V;
      if (j = Math.max(j, F), c) {
        let G = 0;
        !p && !m || p && !m && v ? G = Gi(O + oe + ne / V, c[1][1]) * V : G = Yi(O + oe + (p ? D : -D) / V, c[0][1]) * V, j = Math.max(j, G);
      }
      if (d) {
        let G = 0;
        !p && !m || p && !m && v ? G = Yi(O + ne / V, d[1][1]) * V : G = Gi(O + (p ? D : -D) / V, d[0][1]) * V, j = Math.max(j, G);
      }
    }
    if (g) {
      const F = Mu($ * V, C, R) / V;
      if (Y = Math.max(Y, F), c) {
        let G = 0;
        !p && !m || m && !p && v ? G = Gi(E + $ * V + K, c[1][0]) / V : G = Yi(E + (m ? I : -I) * V + K, c[0][0]) / V, Y = Math.max(Y, G);
      }
      if (d) {
        let G = 0;
        !p && !m || m && !p && v ? G = Yi(E + $ * V, d[1][0]) / V : G = Gi(E + (m ? I : -I) * V, d[0][0]) / V, Y = Math.max(Y, G);
      }
    }
  }
  I = I + (I < 0 ? Y : -Y), D = D + (D < 0 ? j : -j), s && (v ? ne > $ * V ? I = (Pv(p, m) ? -D : D) / V : D = (Pv(p, m) ? -I : I) * V : y ? (I = D / V, m = p) : (D = I * V, p = m));
  const T = p ? E + D : E, L = m ? O + I : O;
  return {
    width: H + (p ? -D : D),
    height: k + (m ? -I : I),
    x: u[0] * D * (p ? -1 : 1) + T,
    y: u[1] * I * (m ? -1 : 1) + L
  };
}
const tw = { width: 0, height: 0, x: 0, y: 0 }, ND = {
  ...tw,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function CD(e, a, r) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = r[0] * u, p = r[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function RD({ domNode: e, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = Yn(e);
  let c = {
    controlDirection: Zv("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: y, keepAspectRatio: g, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: C, shouldResize: R }) {
    let N = { ...tw }, z = { ...ND };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: g,
      controlDirection: Zv(m)
    };
    let E, O = null, H = [], k, V, D, I = !1;
    const ne = fx().on("start", ($) => {
      const { nodeLookup: K, transform: oe, snapGrid: j, snapToGrid: Y, nodeOrigin: T, paneDomNode: L } = r();
      if (E = K.get(a), !E)
        return;
      O = L?.getBoundingClientRect() ?? null;
      const { xSnapped: F, ySnapped: G } = Uo($.sourceEvent, {
        transform: oe,
        snapGrid: j,
        snapToGrid: Y,
        containerBounds: O
      });
      N = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, z = {
        ...N,
        pointerX: F,
        pointerY: G,
        aspectRatio: N.width / N.height
      }, k = void 0, V = Mr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (k = K.get(E.parentId)), k && E.extent === "parent" && (V = [
        [0, 0],
        [k.measured.width, k.measured.height]
      ]), H = [], D = void 0;
      for (const [te, A] of K)
        if (A.parentId === a && (H.push({
          id: te,
          position: { ...A.position },
          extent: A.extent
        }), A.extent === "parent" || A.expandParent)) {
          const U = CD(A, E, A.origin ?? T);
          D ? D = [
            [Math.min(U[0][0], D[0][0]), Math.min(U[0][1], D[0][1])],
            [Math.max(U[1][0], D[1][0]), Math.max(U[1][1], D[1][1])]
          ] : D = U;
        }
      x?.($, { ...N });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: oe, snapToGrid: j, nodeOrigin: Y } = r(), T = Uo($.sourceEvent, {
        transform: K,
        snapGrid: oe,
        snapToGrid: j,
        containerBounds: O
      }), L = [];
      if (!E)
        return;
      const { x: F, y: G, width: te, height: A } = N, U = {}, Q = E.origin ?? Y, { width: ee, height: ce, x: ae, y: se } = ED(z, c.controlDirection, T, c.boundaries, c.keepAspectRatio, Q, V, D), P = ee !== te, me = ce !== A, Se = ae !== F && P, Te = se !== G && me;
      if (!Se && !Te && !P && !me)
        return;
      if ((Se || Te || Q[0] === 1 || Q[1] === 1) && (U.x = Se ? ae : N.x, U.y = Te ? se : N.y, N.x = U.x, N.y = U.y, H.length > 0)) {
        const $e = ae - F, ft = se - G;
        for (const Me of H)
          Me.position = {
            x: Me.position.x - $e + Q[0] * (ee - te),
            y: Me.position.y - ft + Q[1] * (ce - A)
          }, L.push(Me);
      }
      if ((P || me) && (U.width = P && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ee : N.width, U.height = me && (!c.resizeDirection || c.resizeDirection === "vertical") ? ce : N.height, N.width = U.width, N.height = U.height), k && E.expandParent) {
        const $e = Q[0] * (U.width ?? 0);
        U.x && U.x < $e && (N.x = $e, z.x = z.x - (U.x - $e));
        const ft = Q[1] * (U.height ?? 0);
        U.y && U.y < ft && (N.y = ft, z.y = z.y - (U.y - ft));
      }
      const _e = _D({
        width: N.width,
        prevWidth: te,
        height: N.height,
        prevHeight: A,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...N, direction: _e };
      R?.($, xe) !== !1 && (I = !0, S?.($, xe), l(U, L));
    }).on("end", ($) => {
      I && (C?.($, { ...N }), s?.({ ...N }), I = !1);
    });
    u.call(ne);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: p
  };
}
var lh = { exports: {} }, oh = {}, sh = { exports: {} }, uh = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qv;
function TD() {
  if (Qv) return uh;
  Qv = 1;
  var e = es();
  function a(g, v) {
    return g === v && (g !== 0 || 1 / g === 1 / v) || g !== g && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, v) {
    var x = v(), S = l({ inst: { value: x, getSnapshot: v } }), C = S[0].inst, R = S[1];
    return u(
      function() {
        C.value = x, C.getSnapshot = v, p(C) && R({ inst: C });
      },
      [g, x, v]
    ), s(
      function() {
        return p(C) && R({ inst: C }), g(function() {
          p(C) && R({ inst: C });
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
  return uh.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : y, uh;
}
var Kv;
function nw() {
  return Kv || (Kv = 1, sh.exports = TD()), sh.exports;
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
var Jv;
function MD() {
  if (Jv) return oh;
  Jv = 1;
  var e = es(), a = nw();
  function r(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return oh.useSyncExternalStoreWithSelector = function(m, y, g, v, x) {
    var S = u(null);
    if (S.current === null) {
      var C = { hasValue: !1, value: null };
      S.current = C;
    } else C = S.current;
    S = d(
      function() {
        function N(k) {
          if (!z) {
            if (z = !0, E = k, k = v(k), x !== void 0 && C.hasValue) {
              var V = C.value;
              if (x(V, k))
                return O = V;
            }
            return O = k;
          }
          if (V = O, l(E, k)) return V;
          var D = v(k);
          return x !== void 0 && x(V, D) ? (E = k, V) : (E = k, O = D);
        }
        var z = !1, E, O, H = g === void 0 ? null : g;
        return [
          function() {
            return N(y());
          },
          H === null ? void 0 : function() {
            return N(H());
          }
        ];
      },
      [y, g, v, x]
    );
    var R = s(m, S[0], S[1]);
    return c(
      function() {
        C.hasValue = !0, C.value = R;
      },
      [R]
    ), p(R), R;
  }, oh;
}
var Wv;
function DD() {
  return Wv || (Wv = 1, lh.exports = MD()), lh.exports;
}
var AD = DD();
const zD = /* @__PURE__ */ tm(AD), OD = {}, eb = (e) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (y, g) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const x = a;
      a = g ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((S) => S(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (OD ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = e(l, s, p);
  return p;
}, jD = (e) => e ? eb(e) : eb, { useDebugValue: LD } = ye, { useSyncExternalStoreWithSelector: HD } = zD, kD = (e) => e;
function aw(e, a = kD, r) {
  const l = HD(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    r
  );
  return LD(l), l;
}
const tb = (e, a) => {
  const r = jD(e), l = (s, u = a) => aw(r, s, u);
  return Object.assign(l, r), l;
}, BD = (e, a) => e ? tb(e, a) : tb;
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
var UD = h1();
const VD = /* @__PURE__ */ tm(UD), Mc = _.createContext(null), qD = Mc.Provider, iw = wa.error001("react");
function lt(e, a) {
  const r = _.useContext(Mc);
  if (r === null)
    throw new Error(iw);
  return aw(r, e, a);
}
function zt() {
  const e = _.useContext(Mc);
  if (e === null)
    throw new Error(iw);
  return _.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const nb = { display: "none" }, $D = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, rw = "react-flow__node-desc", lw = "react-flow__edge-desc", ID = "react-flow__aria-live", YD = (e) => e.ariaLiveMessage, GD = (e) => e.ariaLabelConfig;
function XD({ rfId: e }) {
  const a = lt(YD);
  return b.jsx("div", { id: `${ID}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: $D, children: a });
}
function FD({ rfId: e, disableKeyboardA11y: a }) {
  const r = lt(GD);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${rw}-${e}`, style: nb, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${lw}-${e}`, style: nb, children: r["edge.a11yDescription.default"] }), !a && b.jsx(XD, { rfId: e })] });
}
const Dc = _.forwardRef(({ position: e = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return b.jsx("div", { className: Pt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
Dc.displayName = "Panel";
function ZD({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : b.jsx(Dc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: b.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const PD = (e) => {
  const a = [], r = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, Du = (e) => e.id;
function QD(e, a) {
  return At(e.selectedNodes.map(Du), a.selectedNodes.map(Du)) && At(e.selectedEdges.map(Du), a.selectedEdges.map(Du));
}
function KD({ onSelectionChange: e }) {
  const a = zt(), { selectedNodes: r, selectedEdges: l } = lt(PD, QD);
  return _.useEffect(() => {
    const s = { nodes: r, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, e]), null;
}
const JD = (e) => !!e.onSelectionChangeHandlers;
function WD({ onSelectionChange: e }) {
  const a = lt(JD);
  return e || a ? b.jsx(KD, { onSelectionChange: e }) : null;
}
const ow = [0, 0], eA = { x: 0, y: 0, zoom: 1 }, tA = [
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
], ab = [...tA, "rfId"], nA = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), ib = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Fo,
  nodeOrigin: ow,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function aA(e) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = lt(nA, At), m = zt();
  _.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    y.current = ib, d();
  }), []);
  const y = _.useRef(ib);
  return _.useEffect(
    () => {
      for (const g of ab) {
        const v = e[g], x = y.current[g];
        v !== x && (typeof e[g] > "u" || (g === "nodes" ? a(v) : g === "edges" ? r(v) : g === "minZoom" ? l(v) : g === "maxZoom" ? s(v) : g === "translateExtent" ? u(v) : g === "nodeExtent" ? c(v) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: VM(v) }) : g === "fitView" ? m.setState({ fitViewQueued: v }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: v }) : m.setState({ [g]: v })));
      }
      y.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    ab.map((g) => e[g])
  ), null;
}
function rb() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function iA(e) {
  const [a, r] = _.useState(e === "system" ? null : e);
  return _.useEffect(() => {
    if (e !== "system") {
      r(e);
      return;
    }
    const l = rb(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : rb()?.matches ? "dark" : "light";
}
const lb = typeof document < "u" ? document : null;
function Ko(e = null, a = { target: lb, actInsideInputWithModifier: !0 }) {
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
    const p = a?.target ?? lb, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && Ux(x))
          return !1;
        const C = sb(x.code, d);
        if (u.current.add(x[C]), ob(c, u.current, !1)) {
          const R = x.composedPath?.()?.[0] || x.target, N = R?.nodeName === "BUTTON" || R?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !N) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const S = sb(x.code, d);
        ob(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[S]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", y), p?.addEventListener("keyup", g), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", y), p?.removeEventListener("keyup", g), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [e, l]), r;
}
function ob(e, a, r) {
  return e.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function sb(e, a) {
  return a.includes(e) ? "code" : "key";
}
const rA = () => {
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
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = Rm(a, l, s, u, c, r?.padding ?? 0.1);
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
      return Ol(m, l, g, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = Dl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function sw(e, a) {
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
      lA(p, d);
    r.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function lA(e, a) {
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
function oA(e, a) {
  return sw(e, a);
}
function sA(e, a) {
  return sw(e, a);
}
function xr(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function xl(e, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(xr(u.id, c)));
  }
  return l;
}
function ub({ items: e = [], lookup: a }) {
  const r = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && r.push({ id: u.id, item: u, type: "replace" }), d === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function cb(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const uA = Lx();
function cA(e, a, r = {}) {
  return XM(e, a, {
    ...r,
    onError: r.onError ?? uA
  });
}
const fb = (e) => AM(e), fA = (e) => Ax(e);
function uw(e) {
  return _.forwardRef(e);
}
const dA = typeof window < "u" ? _.useLayoutEffect : _.useEffect;
function db(e) {
  const [a, r] = _.useState(BigInt(0)), [l] = _.useState(() => hA(() => r((s) => s + BigInt(1))));
  return dA(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function hA(e) {
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
const cw = _.createContext(null);
function mA({ children: e }) {
  const a = zt(), r = _.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: y, onNodesChange: g, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = a.getState();
    let C = p;
    for (const N of d)
      C = typeof N == "function" ? N(C) : N;
    let R = ub({
      items: C,
      lookup: v
    });
    for (const N of S.values())
      R = N(R);
    y && m(C), R.length > 0 ? g?.(R) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: N, nodes: z, setNodes: E } = a.getState();
      N && E(z);
    });
  }, []), l = db(r), s = _.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: g, edgeLookup: v } = a.getState();
    let x = p;
    for (const S of d)
      x = typeof S == "function" ? S(x) : S;
    y ? m(x) : g && g(ub({
      items: x,
      lookup: v
    }));
  }, []), u = db(s), c = _.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return b.jsx(cw.Provider, { value: c, children: e });
}
function pA() {
  const e = _.useContext(cw);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const gA = (e) => !!e.panZoom;
function jm() {
  const e = rA(), a = zt(), r = pA(), l = lt(gA), s = _.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      r.nodeQueue.push(g);
    }, d = (g) => {
      r.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: v, nodeOrigin: x } = a.getState(), S = fb(g) ? g : v.get(g.id), C = S.parentId ? kx(S.position, S.measured, S.parentId, v, x) : S.position, R = {
        ...S,
        position: C,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return Ml(R);
    }, m = (g, v, x = { replace: !1 }) => {
      c((S) => S.map((C) => {
        if (C.id === g) {
          const R = typeof v == "function" ? v(C) : v;
          return x.replace && fb(R) ? R : { ...C, ...R };
        }
        return C;
      }));
    }, y = (g, v, x = { replace: !1 }) => {
      d((S) => S.map((C) => {
        if (C.id === g) {
          const R = typeof v == "function" ? v(C) : v;
          return x.replace && fA(R) ? R : { ...C, ...R };
        }
        return C;
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
        const { nodes: g = [], edges: v = [], transform: x } = a.getState(), [S, C, R] = x;
        return {
          nodes: g.map((N) => ({ ...N })),
          edges: v.map((N) => ({ ...N })),
          viewport: {
            x: S,
            y: C,
            zoom: R
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: C, onEdgesDelete: R, triggerNodeChanges: N, triggerEdgeChanges: z, onDelete: E, onBeforeDelete: O } = a.getState(), { nodes: H, edges: k } = await HM({
          nodesToRemove: g,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: O
        }), V = k.length > 0, D = H.length > 0;
        if (V) {
          const I = k.map(cb);
          R?.(k), z(I);
        }
        if (D) {
          const I = H.map(cb);
          C?.(H), N(I);
        }
        return (D || V) && E?.({ nodes: H, edges: k }), { deletedNodes: H, deletedEdges: k };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, v = !0, x) => {
        const S = kv(g), C = S ? g : p(g), R = x !== void 0;
        return C ? (x || a.getState().nodes).filter((N) => {
          const z = a.getState().nodeLookup.get(N.id);
          if (z && !S && (N.id === g.id || !z.internals.positionAbsolute))
            return !1;
          const E = Ml(R ? N : z), O = Po(E, C);
          return v && O > 0 || O >= E.width * E.height || O >= C.width * C.height;
        }) : [];
      },
      isNodeIntersecting: (g, v, x = !0) => {
        const C = kv(g) ? g : p(g);
        if (!C)
          return !1;
        const R = Po(C, v);
        return x && R > 0 || R >= v.width * v.height || R >= C.width * C.height;
      },
      updateNode: m,
      updateNodeData: (g, v, x = { replace: !1 }) => {
        m(g, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (g, v, x = { replace: !1 }) => {
        y(g, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: v, nodeOrigin: x } = a.getState();
        return zM(g, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: v, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? v ? `-${g}-${v}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const v = a.getState().fitViewResolver ?? UM();
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
const hb = (e) => e.selected, yA = typeof window < "u" ? window : void 0;
function vA({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: l } = jm(), s = Ko(e, { actInsideInputWithModifier: !1 }), u = Ko(a, { target: yA });
  _.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = r.getState();
      l({ nodes: d.filter(hb), edges: c.filter(hb) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), _.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function bA(e) {
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
const Ac = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, xA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function wA({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = Nr.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: y, maxZoom: g, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: C, noPanClassName: R, onViewportChange: N, isControlledViewport: z, paneClickDistance: E, selectionOnDrag: O }) {
  const H = zt(), k = _.useRef(null), { userSelectionActive: V, lib: D, connectionInProgress: I } = lt(xA, At), ne = Ko(v), $ = _.useRef();
  bA(k);
  const K = _.useCallback((oe) => {
    N?.({ x: oe[0], y: oe[1], zoom: oe[2] }), z || H.setState({ transform: oe });
  }, [N, z]);
  return _.useEffect(() => {
    if (k.current) {
      $.current = SD({
        domNode: k.current,
        minZoom: y,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (T) => H.setState((L) => L.paneDragging === T ? L : { paneDragging: T }),
        onPanZoomStart: (T, L) => {
          const { onViewportChangeStart: F, onMoveStart: G } = H.getState();
          G?.(T, L), F?.(L);
        },
        onPanZoom: (T, L) => {
          const { onViewportChange: F, onMove: G } = H.getState();
          G?.(T, L), F?.(L);
        },
        onPanZoomEnd: (T, L) => {
          const { onViewportChangeEnd: F, onMoveEnd: G } = H.getState();
          G?.(T, L), F?.(L);
        }
      });
      const { x: oe, y: j, zoom: Y } = $.current.getViewport();
      return H.setState({
        panZoom: $.current,
        transform: [oe, j, Y],
        domNode: k.current.closest(".react-flow")
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
      zoomActivationKeyPressed: ne,
      preventScrolling: x,
      noPanClassName: R,
      userSelectionActive: V,
      noWheelClassName: C,
      lib: D,
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
    ne,
    x,
    R,
    V,
    C,
    D,
    K,
    I,
    O,
    E
  ]), b.jsx("div", { className: "react-flow__renderer", ref: k, style: Ac, children: S });
}
const SA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function _A() {
  const { userSelectionActive: e, userSelectionRect: a } = lt(SA, At);
  return e && a ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const ch = (e, a) => (r) => {
  r.target === a.current && e?.(r);
}, EA = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function NA({ isSelecting: e, selectionKeyPressed: a, selectionMode: r = Zo.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: g, onPaneMouseEnter: v, onPaneMouseMove: x, onPaneMouseLeave: S, children: C }) {
  const R = _.useRef(0), N = zt(), { userSelectionActive: z, elementsSelectable: E, dragging: O, connectionInProgress: H, panBy: k, autoPanSpeed: V } = lt(EA, At), D = E && (e || z), I = _.useRef(null), ne = _.useRef(), $ = _.useRef(/* @__PURE__ */ new Set()), K = _.useRef(/* @__PURE__ */ new Set()), oe = _.useRef(!1), j = _.useRef({ x: 0, y: 0 }), Y = _.useRef(!1), T = (P) => {
    if (oe.current || H) {
      oe.current = !1;
      return;
    }
    m?.(P), N.getState().resetSelectedElements(), N.setState({ nodesSelectionActive: !1 });
  }, L = (P) => {
    if (Array.isArray(l) && l?.includes(2)) {
      P.preventDefault();
      return;
    }
    y?.(P);
  }, F = g ? (P) => g(P) : void 0, G = (P) => {
    oe.current && (P.stopPropagation(), oe.current = !1);
  }, te = (P) => {
    const { domNode: me, transform: Se } = N.getState();
    if (ne.current = me?.getBoundingClientRect(), !ne.current)
      return;
    const Te = P.target === I.current;
    if (!Te && !!P.target.closest(".nokey") || !e || !(c && Te || a) || P.button !== 0 || !P.isPrimary)
      return;
    P.target?.setPointerCapture?.(P.pointerId), oe.current = !1;
    const { x: Re, y: $e } = xa(P.nativeEvent, ne.current), ft = Ol({ x: Re, y: $e }, Se);
    N.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Re,
        y: $e
      }
    }), Te || (P.stopPropagation(), P.preventDefault());
  };
  function A(P, me) {
    const { userSelectionRect: Se } = N.getState();
    if (!Se)
      return;
    const { transform: Te, nodeLookup: _e, edgeLookup: xe, connectionLookup: Re, triggerNodeChanges: $e, triggerEdgeChanges: ft, defaultEdgeOptions: Me } = N.getState(), Xe = { x: Se.startX, y: Se.startY }, { x: ke, y: Ie } = Dl(Xe, Te), St = {
      startX: Xe.x,
      startY: Xe.y,
      x: P < ke ? P : ke,
      y: me < Ie ? me : Ie,
      width: Math.abs(P - ke),
      height: Math.abs(me - Ie)
    }, Je = $.current, Ze = K.current;
    $.current = new Set(Nm(_e, St, Te, r === Zo.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Pe = Me?.selectable ?? !0;
    for (const gt of $.current) {
      const yt = Re.get(gt);
      if (yt)
        for (const { edgeId: Yt } of yt.values()) {
          const Lt = xe.get(Yt);
          Lt && (Lt.selectable ?? Pe) && K.current.add(Yt);
        }
    }
    if (!Bv(Je, $.current)) {
      const gt = xl(_e, $.current, !0);
      $e(gt);
    }
    if (!Bv(Ze, K.current)) {
      const gt = xl(xe, K.current);
      ft(gt);
    }
    N.setState({
      userSelectionRect: St,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function U() {
    if (!s || !ne.current)
      return;
    const [P, me] = Cm(j.current, ne.current, V);
    k({ x: P, y: me }).then((Se) => {
      if (!oe.current || !Se) {
        R.current = requestAnimationFrame(U);
        return;
      }
      const { x: Te, y: _e } = j.current;
      A(Te, _e), R.current = requestAnimationFrame(U);
    });
  }
  const Q = () => {
    cancelAnimationFrame(R.current), R.current = 0, Y.current = !1;
  };
  _.useEffect(() => () => Q(), []);
  const ee = (P) => {
    const { userSelectionRect: me, transform: Se, resetSelectedElements: Te } = N.getState();
    if (!ne.current || !me)
      return;
    const { x: _e, y: xe } = xa(P.nativeEvent, ne.current);
    j.current = { x: _e, y: xe };
    const Re = Dl({ x: me.startX, y: me.startY }, Se);
    if (!oe.current) {
      const $e = a ? 0 : u;
      if (Math.hypot(_e - Re.x, xe - Re.y) <= $e)
        return;
      Te(), d?.(P);
    }
    oe.current = !0, Y.current || (U(), Y.current = !0), A(_e, xe);
  }, ce = (P) => {
    P.button === 0 && (P.target?.releasePointerCapture?.(P.pointerId), !z && P.target === I.current && N.getState().userSelectionRect && T?.(P), N.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), oe.current && (p?.(P), N.setState({
      nodesSelectionActive: $.current.size > 0
    })), Q());
  }, ae = (P) => {
    P.target?.releasePointerCapture?.(P.pointerId), Q();
  }, se = l === !0 || Array.isArray(l) && l.includes(0);
  return b.jsxs("div", { className: Pt(["react-flow__pane", { draggable: se, dragging: O, selection: e }]), onClick: D ? void 0 : ch(T, I), onContextMenu: ch(L, I), onWheel: ch(F, I), onPointerEnter: D ? void 0 : v, onPointerMove: D ? ee : x, onPointerUp: D ? ce : void 0, onPointerCancel: D ? ae : void 0, onPointerDownCapture: D ? te : void 0, onClickCapture: D ? G : void 0, onPointerLeave: S, ref: I, style: Ac, children: [C, b.jsx(_A, {})] });
}
function Vh({ id: e, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", wa.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function fw({ nodeRef: e, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = zt(), [p, m] = _.useState(!1), y = _.useRef();
  return _.useEffect(() => {
    y.current = sD({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        Vh({
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
const CA = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function dw() {
  const e = zt();
  return _.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: y } = e.getState(), g = /* @__PURE__ */ new Map(), v = CA(c), x = s ? u[0] : 5, S = s ? u[1] : 5, C = r.direction.x * x * r.factor, R = r.direction.y * S * r.factor;
    for (const [, N] of m) {
      if (!v(N))
        continue;
      let z = {
        x: N.internals.positionAbsolute.x + C,
        y: N.internals.positionAbsolute.y + R
      };
      s && (z = us(z, u));
      const { position: E, positionAbsolute: O } = zx({
        nodeId: N.id,
        nextPosition: z,
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
const Lm = _.createContext(null), RA = Lm.Provider;
Lm.Consumer;
const hw = () => _.useContext(Lm), TA = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), MA = (e, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, y = p?.nodeId === e && p?.id === a && p?.type === r;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === Rl.Strict ? d?.type !== r : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function DA({ type: e = "source", position: a = ze.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: y, onTouchStart: g, ...v }, x) {
  const S = c || null, C = e === "target", R = zt(), N = hw(), { connectOnClick: z, noPanClassName: E, rfId: O } = lt(TA, At), { connectingFrom: H, connectingTo: k, clickConnecting: V, isPossibleEndHandle: D, connectionInProcess: I, clickConnectionInProcess: ne, valid: $ } = lt(MA(N, S, e), At);
  N || R.getState().onError?.("010", wa.error010());
  const K = (Y) => {
    const { defaultEdgeOptions: T, onConnect: L, hasDefaultEdges: F } = R.getState(), G = {
      ...T,
      ...Y
    };
    if (F) {
      const { edges: te, setEdges: A, onError: U } = R.getState();
      A(cA(G, te, { onError: U }));
    }
    L?.(G), d?.(G);
  }, oe = (Y) => {
    if (!N)
      return;
    const T = Vx(Y.nativeEvent);
    if (s && (T && Y.button === 0 || !T)) {
      const L = R.getState();
      Uh.onPointerDown(Y.nativeEvent, {
        handleDomNode: Y.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: C,
        handleId: S,
        nodeId: N,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...F) => R.getState().onConnectEnd?.(...F),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...F) => R.getState().isValidConnection?.(...F) ?? !0),
        getTransform: () => R.getState().transform,
        getFromHandle: () => R.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    T ? y?.(Y) : g?.(Y);
  }, j = (Y) => {
    const { onClickConnectStart: T, onClickConnectEnd: L, connectionClickStartHandle: F, connectionMode: G, isValidConnection: te, lib: A, rfId: U, nodeLookup: Q, connection: ee } = R.getState();
    if (!N || !F && !s)
      return;
    if (!F) {
      T?.(Y.nativeEvent, { nodeId: N, handleId: S, handleType: e }), R.setState({ connectionClickStartHandle: { nodeId: N, type: e, id: S } });
      return;
    }
    const ce = Bx(Y.target), ae = r || te, { connection: se, isValid: P } = Uh.isValid(Y.nativeEvent, {
      handle: {
        nodeId: N,
        id: S,
        type: e
      },
      connectionMode: G,
      fromNodeId: F.nodeId,
      fromHandleId: F.id || null,
      fromType: F.type,
      isValidConnection: ae,
      flowId: U,
      doc: ce,
      lib: A,
      nodeLookup: Q
    });
    P && se && K(se);
    const me = structuredClone(ee);
    delete me.inProgress, me.toPosition = me.toHandle ? me.toHandle.position : null, L?.(Y, me), R.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": S, "data-nodeid": N, "data-handlepos": a, "data-id": `${O}-${N}-${S}-${e}`, className: Pt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    m,
    {
      source: !C,
      target: C,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: V,
      connectingfrom: H,
      connectingto: k,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!I || D) && (I || ne ? u : s)
    }
  ]), onMouseDown: oe, onTouchStart: oe, onClick: z ? j : void 0, ref: x, ...v, children: p });
}
const zl = _.memo(uw(DA));
function AA({ data: e, isConnectable: a, sourcePosition: r = ze.Bottom }) {
  return b.jsxs(b.Fragment, { children: [e?.label, b.jsx(zl, { type: "source", position: r, isConnectable: a })] });
}
function zA({ data: e, isConnectable: a, targetPosition: r = ze.Top, sourcePosition: l = ze.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(zl, { type: "target", position: r, isConnectable: a }), e?.label, b.jsx(zl, { type: "source", position: l, isConnectable: a })] });
}
function OA() {
  return null;
}
function jA({ data: e, isConnectable: a, targetPosition: r = ze.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(zl, { type: "target", position: r, isConnectable: a }), e?.label] });
}
const fc = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, mb = {
  input: AA,
  default: zA,
  output: jA,
  group: OA
};
function LA(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const HA = (e) => {
  const { width: a, height: r, x: l, y: s } = ss(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: ba(a) ? a : null,
    height: ba(r) ? r : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function kA({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = zt(), { width: s, height: u, transformString: c, userSelectionActive: d } = lt(HA, At), p = dw(), m = _.useRef(null);
  _.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !d && s !== null && u !== null;
  if (fw({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const g = e ? (x) => {
    const S = l.getState().nodes.filter((C) => C.selected);
    e(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(fc, x.key) && (x.preventDefault(), p({
      direction: fc[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return b.jsx("div", { className: Pt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: b.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const pb = typeof window < "u" ? window : void 0, BA = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function mw({ children: e, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: y, selectionMode: g, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: C, zoomActivationKeyCode: R, elementsSelectable: N, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: H, panOnScrollMode: k, zoomOnDoubleClick: V, panOnDrag: D, autoPanOnSelection: I, defaultViewport: ne, translateExtent: $, minZoom: K, maxZoom: oe, preventScrolling: j, onSelectionContextMenu: Y, noWheelClassName: T, noPanClassName: L, disableKeyboardA11y: F, onViewportChange: G, isControlledViewport: te }) {
  const { nodesSelectionActive: A, userSelectionActive: U } = lt(BA, At), Q = Ko(m, { target: pb }), ee = Ko(C, { target: pb }), ce = ee || D, ae = ee || O, se = y && ce !== !0, P = Q || U || se;
  return vA({ deleteKeyCode: p, multiSelectionKeyCode: S }), b.jsx(wA, { onPaneContextMenu: u, elementsSelectable: N, zoomOnScroll: z, zoomOnPinch: E, panOnScroll: ae, panOnScrollSpeed: H, panOnScrollMode: k, zoomOnDoubleClick: V, panOnDrag: !Q && ce, defaultViewport: ne, translateExtent: $, minZoom: K, maxZoom: oe, zoomActivationKeyCode: R, preventScrolling: j, noWheelClassName: T, noPanClassName: L, onViewportChange: G, isControlledViewport: te, paneClickDistance: d, selectionOnDrag: se, children: b.jsxs(NA, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: ce, autoPanOnSelection: I, isSelecting: !!P, selectionMode: g, selectionKeyPressed: Q, paneClickDistance: d, selectionOnDrag: se, children: [e, A && b.jsx(kA, { onSelectionContextMenu: Y, noPanClassName: L, disableKeyboardA11y: F })] }) });
}
mw.displayName = "FlowRenderer";
const UA = _.memo(mw), VA = (e) => (a) => e ? Nm(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function qA(e) {
  return lt(_.useCallback(VA(e), [e]), At);
}
const $A = (e) => e.updateNodeInternals;
function IA() {
  const e = lt($A), [a] = _.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
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
function YA({ node: e, nodeType: a, hasDimensions: r, resizeObserver: l }) {
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
function GA({ id: e, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: y, resizeObserver: g, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: C, nodeTypes: R, nodeClickDistance: N, onError: z }) {
  const { node: E, internals: O, isParent: H } = lt((P) => {
    const me = P.nodeLookup.get(e), Se = P.parentLookup.has(e);
    return {
      node: me,
      internals: me.internals,
      isParent: Se
    };
  }, At);
  let k = E.type || "default", V = R?.[k] || mb[k];
  V === void 0 && (z?.("003", wa.error003(k)), k = "default", V = R?.default || mb.default);
  const D = !!(E.draggable || d && typeof E.draggable > "u"), I = !!(E.selectable || p && typeof E.selectable > "u"), ne = !!(E.connectable || m && typeof E.connectable > "u"), $ = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), oe = Hx(E), j = YA({ node: E, nodeType: k, hasDimensions: oe, resizeObserver: g }), Y = fw({
    nodeRef: j,
    disabled: E.hidden || !D,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: e,
    isSelectable: I,
    nodeClickDistance: N
  }), T = dw();
  if (E.hidden)
    return null;
  const L = mi(E), F = LA(E), G = I || D || a || r || l || s, te = r ? (P) => r(P, { ...O.userNode }) : void 0, A = l ? (P) => l(P, { ...O.userNode }) : void 0, U = s ? (P) => s(P, { ...O.userNode }) : void 0, Q = u ? (P) => u(P, { ...O.userNode }) : void 0, ee = c ? (P) => c(P, { ...O.userNode }) : void 0, ce = (P) => {
    const { selectNodesOnDrag: me, nodeDragThreshold: Se } = K.getState();
    I && (!me || !D || Se > 0) && Vh({
      id: e,
      store: K,
      nodeRef: j
    }), a && a(P, { ...O.userNode });
  }, ae = (P) => {
    if (!(Ux(P.nativeEvent) || S)) {
      if (Rx.includes(P.key) && I) {
        const me = P.key === "Escape";
        Vh({
          id: e,
          store: K,
          unselect: me,
          nodeRef: j
        });
      } else if (D && E.selected && Object.prototype.hasOwnProperty.call(fc, P.key)) {
        P.preventDefault();
        const { ariaLabelConfig: me } = K.getState();
        K.setState({
          ariaLiveMessage: me["node.a11yDescription.ariaLiveMessage"]({
            direction: P.key.replace("Arrow", "").toLowerCase(),
            x: ~~O.positionAbsolute.x,
            y: ~~O.positionAbsolute.y
          })
        }), T({
          direction: fc[P.key],
          factor: P.shiftKey ? 4 : 1
        });
      }
    }
  }, se = () => {
    if (S || !j.current?.matches(":focus-visible"))
      return;
    const { transform: P, width: me, height: Se, autoPanOnNodeFocus: Te, setCenter: _e } = K.getState();
    if (!Te)
      return;
    Nm(/* @__PURE__ */ new Map([[e, E]]), { x: 0, y: 0, width: me, height: Se }, P, !0).length > 0 || _e(E.position.x + L.width / 2, E.position.y + L.height / 2, {
      zoom: P[2]
    });
  };
  return b.jsx("div", { className: Pt([
    "react-flow__node",
    `react-flow__node-${k}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: D
    },
    E.className,
    {
      selected: E.selected,
      selectable: I,
      parent: H,
      draggable: D,
      dragging: Y
    }
  ]), ref: j, style: {
    zIndex: O.z,
    transform: `translate(${O.positionAbsolute.x}px,${O.positionAbsolute.y}px)`,
    pointerEvents: G ? "all" : "none",
    visibility: oe ? "visible" : "hidden",
    ...E.style,
    ...F
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: te, onMouseMove: A, onMouseLeave: U, onContextMenu: Q, onClick: ce, onDoubleClick: ee, onKeyDown: $ ? ae : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? se : void 0, role: E.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${rw}-${C}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: b.jsx(RA, { value: e, children: b.jsx(V, { id: e, data: E.data, type: k, positionAbsoluteX: O.positionAbsolute.x, positionAbsoluteY: O.positionAbsolute.y, selected: E.selected ?? !1, selectable: I, draggable: D, deletable: E.deletable ?? !0, isConnectable: ne, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: Y, dragHandle: E.dragHandle, zIndex: O.z, parentId: E.parentId, ...L }) }) });
}
var XA = _.memo(GA);
const FA = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function pw(e) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(FA, At), c = qA(e.onlyRenderVisibleElements), d = IA();
  return b.jsx("div", { className: "react-flow__nodes", style: Ac, children: c.map((p) => (
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
    b.jsx(XA, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
pw.displayName = "NodeRenderer";
const ZA = _.memo(pw);
function PA(e) {
  return lt(_.useCallback((r) => {
    if (!e)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && IM({
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
const QA = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return b.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, KA = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return b.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, gb = {
  [uc.Arrow]: QA,
  [uc.ArrowClosed]: KA
};
function JA(e) {
  const a = zt();
  return _.useMemo(() => Object.prototype.hasOwnProperty.call(gb, e) ? gb[e] : (a.getState().onError?.("009", wa.error009(e)), null), [e]);
}
const WA = ({ id: e, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = JA(a);
  return p ? b.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: b.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, gw = ({ defaultColor: e, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = _.useMemo(() => KM(r, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, e]);
  return s.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: s.map((u) => b.jsx(WA, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
gw.displayName = "MarkerDefinitions";
var e4 = _.memo(gw);
function yw({ x: e, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...y }) {
  const [g, v] = _.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Pt(["react-flow__edge-textwrapper", m]), S = _.useRef(null);
  return _.useEffect(() => {
    if (S.current) {
      const C = S.current.getBBox();
      v({
        x: C.x,
        y: C.y,
        width: C.width,
        height: C.height
      });
    }
  }, [r]), r ? b.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...y, children: [s && b.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), b.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: S, style: l, children: r }), p] }) : null;
}
yw.displayName = "EdgeText";
const t4 = _.memo(yw);
function zc({ path: e, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...y }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...y, d: e, fill: "none", className: Pt(["react-flow__edge-path", y.className]) }), m ? b.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && ba(a) && ba(r) ? b.jsx(t4, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function yb({ pos: e, x1: a, y1: r, x2: l, y2: s }) {
  return e === ze.Left || e === ze.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function vw({ sourceX: e, sourceY: a, sourcePosition: r = ze.Bottom, targetX: l, targetY: s, targetPosition: u = ze.Top }) {
  const [c, d] = yb({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = yb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [y, g, v, x] = qx({
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
function bw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: R, interactionWidth: N }) => {
    const [z, E, O] = vw({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), H = e.isInternal ? void 0 : a;
    return b.jsx(zc, { id: H, path: z, labelX: E, labelY: O, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: R, interactionWidth: N });
  });
}
const n4 = bw({ isInternal: !1 }), xw = bw({ isInternal: !0 });
n4.displayName = "SimpleBezierEdge";
xw.displayName = "SimpleBezierEdgeInternal";
function ww(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, sourcePosition: x = ze.Bottom, targetPosition: S = ze.Top, markerEnd: C, markerStart: R, pathOptions: N, interactionWidth: z }) => {
    const [E, O, H] = Hh({
      sourceX: r,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: N?.borderRadius,
      offset: N?.offset,
      stepPosition: N?.stepPosition
    }), k = e.isInternal ? void 0 : a;
    return b.jsx(zc, { id: k, path: E, labelX: O, labelY: H, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: C, markerStart: R, interactionWidth: z });
  });
}
const Sw = ww({ isInternal: !1 }), _w = ww({ isInternal: !0 });
Sw.displayName = "SmoothStepEdge";
_w.displayName = "SmoothStepEdgeInternal";
function Ew(e) {
  return _.memo(({ id: a, ...r }) => {
    const l = e.isInternal ? void 0 : a;
    return b.jsx(Sw, { ...r, id: l, pathOptions: _.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const a4 = Ew({ isInternal: !1 }), Nw = Ew({ isInternal: !0 });
a4.displayName = "StepEdge";
Nw.displayName = "StepEdgeInternal";
function Cw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: x, markerStart: S, interactionWidth: C }) => {
    const [R, N, z] = Yx({ sourceX: r, sourceY: l, targetX: s, targetY: u }), E = e.isInternal ? void 0 : a;
    return b.jsx(zc, { id: E, path: R, labelX: N, labelY: z, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: g, style: v, markerEnd: x, markerStart: S, interactionWidth: C });
  });
}
const i4 = Cw({ isInternal: !1 }), Rw = Cw({ isInternal: !0 });
i4.displayName = "StraightEdge";
Rw.displayName = "StraightEdgeInternal";
function Tw(e) {
  return _.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = ze.Bottom, targetPosition: d = ze.Top, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: R, pathOptions: N, interactionWidth: z }) => {
    const [E, O, H] = $x({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: N?.curvature
    }), k = e.isInternal ? void 0 : a;
    return b.jsx(zc, { id: k, path: E, labelX: O, labelY: H, label: p, labelStyle: m, labelShowBg: y, labelBgStyle: g, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: R, interactionWidth: z });
  });
}
const r4 = Tw({ isInternal: !1 }), Mw = Tw({ isInternal: !0 });
r4.displayName = "BezierEdge";
Mw.displayName = "BezierEdgeInternal";
const vb = {
  default: Mw,
  straight: Rw,
  step: Nw,
  smoothstep: _w,
  simplebezier: xw
}, bb = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, l4 = (e, a, r) => r === ze.Left ? e - a : r === ze.Right ? e + a : e, o4 = (e, a, r) => r === ze.Top ? e - a : r === ze.Bottom ? e + a : e, xb = "react-flow__edgeupdater";
function wb({ position: e, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return b.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Pt([xb, `${xb}-${d}`]), cx: l4(a, l, e), cy: o4(r, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function s4({ isReconnectable: e, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: y, onReconnectEnd: g, setReconnecting: v, setUpdateHover: x }) {
  const S = zt(), C = (O, H) => {
    if (O.button !== 0)
      return;
    const { autoPanOnConnect: k, domNode: V, connectionMode: D, connectionRadius: I, lib: ne, onConnectStart: $, cancelConnection: K, nodeLookup: oe, rfId: j, panBy: Y, updateConnection: T } = S.getState(), L = H.type === "target", F = (A, U) => {
      v(!1), g?.(A, r, H.type, U);
    }, G = (A) => m?.(r, A), te = (A, U) => {
      v(!0), y?.(O, r, H.type), $?.(A, U);
    };
    Uh.onPointerDown(O.nativeEvent, {
      autoPanOnConnect: k,
      connectionMode: D,
      connectionRadius: I,
      domNode: V,
      handleId: H.id,
      nodeId: H.nodeId,
      nodeLookup: oe,
      isTarget: L,
      edgeUpdaterType: H.type,
      lib: ne,
      flowId: j,
      cancelConnection: K,
      panBy: Y,
      isValidConnection: (...A) => S.getState().isValidConnection?.(...A) ?? !0,
      onConnect: G,
      onConnectStart: te,
      onConnectEnd: (...A) => S.getState().onConnectEnd?.(...A),
      onReconnectEnd: F,
      updateConnection: T,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: O.currentTarget
    });
  }, R = (O) => C(O, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), N = (O) => C(O, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), z = () => x(!0), E = () => x(!1);
  return b.jsxs(b.Fragment, { children: [(e === !0 || e === "source") && b.jsx(wb, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: R, onMouseEnter: z, onMouseOut: E, type: "source" }), (e === !0 || e === "target") && b.jsx(wb, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: N, onMouseEnter: z, onMouseOut: E, type: "target" })] });
}
function u4({ id: e, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: C, noPanClassName: R, onError: N, disableKeyboardA11y: z }) {
  let E = lt((_e) => _e.edgeLookup.get(e));
  const O = lt((_e) => _e.defaultEdgeOptions);
  E = O ? { ...O, ...E } : E;
  let H = E.type || "default", k = C?.[H] || vb[H];
  k === void 0 && (N?.("011", wa.error011(H)), H = "default", k = C?.default || vb.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), D = typeof g < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), I = !!(E.selectable || l && typeof E.selectable > "u"), ne = _.useRef(null), [$, K] = _.useState(!1), [oe, j] = _.useState(!1), Y = zt(), { zIndex: T, sourceX: L, sourceY: F, targetX: G, targetY: te, sourcePosition: A, targetPosition: U } = lt(_.useCallback((_e) => {
    const xe = _e.nodeLookup.get(E.source), Re = _e.nodeLookup.get(E.target);
    if (!xe || !Re)
      return {
        zIndex: E.zIndex,
        ...bb
      };
    const $e = QM({
      id: e,
      sourceNode: xe,
      targetNode: Re,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: _e.connectionMode,
      onError: N
    });
    return {
      zIndex: $M({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Re,
        elevateOnSelect: _e.elevateEdgesOnSelect,
        zIndexMode: _e.zIndexMode
      }),
      ...$e || bb
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), Q = _.useMemo(() => E.markerStart ? `url('#${kh(E.markerStart, S)}')` : void 0, [E.markerStart, S]), ee = _.useMemo(() => E.markerEnd ? `url('#${kh(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
  if (E.hidden || L === null || F === null || G === null || te === null)
    return null;
  const ce = (_e) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Re, multiSelectionActive: $e } = Y.getState();
    I && (Y.setState({ nodesSelectionActive: !1 }), E.selected && $e ? (Re({ nodes: [], edges: [E] }), ne.current?.blur()) : xe([e])), s && s(_e, E);
  }, ae = u ? (_e) => {
    u(_e, { ...E });
  } : void 0, se = c ? (_e) => {
    c(_e, { ...E });
  } : void 0, P = d ? (_e) => {
    d(_e, { ...E });
  } : void 0, me = p ? (_e) => {
    p(_e, { ...E });
  } : void 0, Se = m ? (_e) => {
    m(_e, { ...E });
  } : void 0, Te = (_e) => {
    if (!z && Rx.includes(_e.key) && I) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Re } = Y.getState();
      _e.key === "Escape" ? (ne.current?.blur(), xe({ edges: [E] })) : Re([e]);
    }
  };
  return b.jsx("svg", { style: { zIndex: T }, children: b.jsxs("g", { className: Pt([
    "react-flow__edge",
    `react-flow__edge-${H}`,
    E.className,
    R,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !I && !s,
      updating: $,
      selectable: I
    }
  ]), onClick: ce, onDoubleClick: ae, onContextMenu: se, onMouseEnter: P, onMouseMove: me, onMouseLeave: Se, onKeyDown: V ? Te : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${lw}-${S}` : void 0, ref: ne, ...E.domAttributes, children: [!oe && b.jsx(k, { id: e, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: I, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: L, sourceY: F, targetX: G, targetY: te, sourcePosition: A, targetPosition: U, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: Q, markerEnd: ee, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), D && b.jsx(s4, { edge: E, isReconnectable: D, reconnectRadius: y, onReconnect: g, onReconnectStart: v, onReconnectEnd: x, sourceX: L, sourceY: F, targetX: G, targetY: te, sourcePosition: A, targetPosition: U, setUpdateHover: K, setReconnecting: j })] }) });
}
var c4 = _.memo(u4);
const f4 = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function Dw({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: g, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: C }) {
  const { edgesFocusable: R, edgesReconnectable: N, elementsSelectable: z, onError: E } = lt(f4, At), O = PA(a);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(e4, { defaultColor: e, rfId: r }), O.map((H) => b.jsx(c4, { id: H, edgesFocusable: R, edgesReconnectable: N, elementsSelectable: z, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: y, reconnectRadius: g, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: r, onError: E, edgeTypes: l, disableKeyboardA11y: C }, H))] });
}
Dw.displayName = "EdgeRenderer";
const d4 = _.memo(Dw), h4 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function m4({ children: e }) {
  const a = lt(h4);
  return b.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function p4(e) {
  const a = jm(), r = _.useRef(!1);
  _.useEffect(() => {
    !r.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), r.current = !0);
  }, [e, a.viewportInitialized]);
}
const g4 = (e) => e.panZoom?.syncViewport;
function y4(e) {
  const a = lt(g4), r = zt();
  return _.useEffect(() => {
    e && (a?.(e), r.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function v4(e) {
  return e.connection.inProgress ? { ...e.connection, to: Ol(e.connection.to, e.transform) } : { ...e.connection };
}
function b4(e) {
  return v4;
}
function x4(e) {
  const a = b4();
  return lt(a, At);
}
const w4 = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function S4({ containerStyle: e, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = lt(w4, At);
  return !(u && s && p) ? null : b.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: Pt(["react-flow__connection", Dx(d)]), children: b.jsx(Aw, { style: a, type: r, CustomComponent: l, isValid: d }) }) });
}
const Aw = ({ style: e, type: a = Zi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: y, toHandle: g, toPosition: v, pointer: x } = x4();
  if (!s)
    return;
  if (r)
    return b.jsx(r, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: v, connectionStatus: Dx(l), toNode: y, toHandle: g, pointer: x });
  let S = "";
  const C = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v
  };
  switch (a) {
    case Zi.Bezier:
      [S] = $x(C);
      break;
    case Zi.SimpleBezier:
      [S] = vw(C);
      break;
    case Zi.Step:
      [S] = Hh({
        ...C,
        borderRadius: 0
      });
      break;
    case Zi.SmoothStep:
      [S] = Hh(C);
      break;
    default:
      [S] = Yx(C);
  }
  return b.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: e });
};
Aw.displayName = "ConnectionLine";
const _4 = {};
function Sb(e = _4) {
  _.useRef(e), zt(), _.useEffect(() => {
  }, [e]);
}
function E4() {
  zt(), _.useRef(!1), _.useEffect(() => {
  }, []);
}
function zw({ nodeTypes: e, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: g, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: C, connectionLineComponent: R, connectionLineContainerStyle: N, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, multiSelectionKeyCode: H, panActivationKeyCode: k, zoomActivationKeyCode: V, deleteKeyCode: D, onlyRenderVisibleElements: I, elementsSelectable: ne, defaultViewport: $, translateExtent: K, minZoom: oe, maxZoom: j, preventScrolling: Y, defaultMarkerColor: T, zoomOnScroll: L, zoomOnPinch: F, panOnScroll: G, panOnScrollSpeed: te, panOnScrollMode: A, zoomOnDoubleClick: U, panOnDrag: Q, autoPanOnSelection: ee, onPaneClick: ce, onPaneMouseEnter: ae, onPaneMouseMove: se, onPaneMouseLeave: P, onPaneScroll: me, onPaneContextMenu: Se, paneClickDistance: Te, nodeClickDistance: _e, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, onReconnect: Xe, onReconnectStart: ke, onReconnectEnd: Ie, noDragClassName: St, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Pe, nodeExtent: gt, rfId: yt, viewport: Yt, onViewportChange: Lt }) {
  return Sb(e), Sb(a), E4(), p4(r), y4(Yt), b.jsx(UA, { onPaneClick: ce, onPaneMouseEnter: ae, onPaneMouseMove: se, onPaneMouseLeave: P, onPaneContextMenu: Se, onPaneScroll: me, paneClickDistance: Te, deleteKeyCode: D, selectionKeyCode: z, selectionOnDrag: E, selectionMode: O, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: H, panActivationKeyCode: k, zoomActivationKeyCode: V, elementsSelectable: ne, zoomOnScroll: L, zoomOnPinch: F, zoomOnDoubleClick: U, panOnScroll: G, panOnScrollSpeed: te, panOnScrollMode: A, panOnDrag: Q, autoPanOnSelection: ee, defaultViewport: $, translateExtent: K, minZoom: oe, maxZoom: j, onSelectionContextMenu: g, preventScrolling: Y, noDragClassName: St, noWheelClassName: Je, noPanClassName: Ze, disableKeyboardA11y: Pe, onViewportChange: Lt, isControlledViewport: !!Yt, children: b.jsxs(m4, { children: [b.jsx(d4, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Xe, onReconnectStart: ke, onReconnectEnd: Ie, onlyRenderVisibleElements: I, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, defaultMarkerColor: T, noPanClassName: Ze, disableKeyboardA11y: Pe, rfId: yt }), b.jsx(S4, { style: C, type: S, component: R, containerStyle: N }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(ZA, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: _e, onlyRenderVisibleElements: I, noPanClassName: Ze, noDragClassName: St, disableKeyboardA11y: Pe, nodeExtent: gt, rfId: yt }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
zw.displayName = "GraphView";
const N4 = _.memo(zw), C4 = Lx(), _b = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: g, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), N = l ?? a ?? [], z = r ?? e ?? [], E = y ?? [0, 0], O = g ?? Fo;
  Fx(C, R, N);
  const { nodesInitialized: H } = Bh(z, x, S, {
    nodeOrigin: E,
    nodeExtent: O,
    zIndexMode: v
  });
  let k = [0, 0, 1];
  if (c && s && u) {
    const V = ss(x, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: D, y: I, zoom: ne } = Rm(V, s, u, p, m, d?.padding ?? 0.1);
    k = [D, I, ne];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: k,
    nodes: z,
    nodesInitialized: H,
    nodeLookup: x,
    parentLookup: S,
    edges: N,
    edgeLookup: R,
    connectionLookup: C,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: Fo,
    nodeExtent: O,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Rl.Strict,
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
    connection: { ...Mx },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: C4,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Tx,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, R4 = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v }) => BD((x, S) => {
  async function C() {
    const { nodeLookup: R, panZoom: N, fitViewOptions: z, fitViewResolver: E, width: O, height: H, minZoom: k, maxZoom: V } = S();
    N && (await LM({
      nodes: R,
      width: O,
      height: H,
      panZoom: N,
      minZoom: k,
      maxZoom: V
    }, z), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ..._b({
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
    setNodes: (R) => {
      const { nodeLookup: N, parentLookup: z, nodeOrigin: E, elevateNodesOnSelect: O, fitViewQueued: H, zIndexMode: k, nodesSelectionActive: V } = S(), { nodesInitialized: D, hasSelectedNodes: I } = Bh(R, N, z, {
        nodeOrigin: E,
        nodeExtent: g,
        elevateNodesOnSelect: O,
        checkEquality: !0,
        zIndexMode: k
      }), ne = V && I;
      H && D ? (C(), x({
        nodes: R,
        nodesInitialized: D,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: ne
      })) : x({ nodes: R, nodesInitialized: D, nodesSelectionActive: ne });
    },
    setEdges: (R) => {
      const { connectionLookup: N, edgeLookup: z } = S();
      Fx(N, z, R), x({ edges: R });
    },
    setDefaultNodesAndEdges: (R, N) => {
      if (R) {
        const { setNodes: z } = S();
        z(R), x({ hasDefaultNodes: !0 });
      }
      if (N) {
        const { setEdges: z } = S();
        z(N), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (R) => {
      const { triggerNodeChanges: N, nodeLookup: z, parentLookup: E, domNode: O, nodeOrigin: H, nodeExtent: k, debug: V, fitViewQueued: D, zIndexMode: I } = S(), { changes: ne, updatedInternals: $ } = iD(R, z, E, O, H, k, I);
      $ && (eD(z, E, { nodeOrigin: H, nodeExtent: k, zIndexMode: I }), D ? (C(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), ne?.length > 0 && (V && console.log("React Flow: trigger node changes", ne), N?.(ne)));
    },
    updateNodePositions: (R, N = !1) => {
      const z = [];
      let E = [];
      const { nodeLookup: O, triggerNodeChanges: H, connection: k, updateConnection: V, onNodesChangeMiddlewareMap: D } = S();
      for (const [I, ne] of R) {
        const $ = O.get(I), K = !!($?.expandParent && $?.parentId && ne?.position), oe = {
          id: I,
          type: "position",
          position: K ? {
            x: Math.max(0, ne.position.x),
            y: Math.max(0, ne.position.y)
          } : ne.position,
          dragging: N
        };
        if ($ && k.inProgress && k.fromNode.id === $.id) {
          const j = Dr($, k.fromHandle, ze.Left, !0);
          V({ ...k, from: j });
        }
        K && $.parentId && z.push({
          id: I,
          parentId: $.parentId,
          rect: {
            ...ne.internals.positionAbsolute,
            width: ne.measured.width ?? 0,
            height: ne.measured.height ?? 0
          }
        }), E.push(oe);
      }
      if (z.length > 0) {
        const { parentLookup: I, nodeOrigin: ne } = S(), $ = Om(z, O, I, ne);
        E.push(...$);
      }
      for (const I of D.values())
        E = I(E);
      H(E);
    },
    triggerNodeChanges: (R) => {
      const { onNodesChange: N, setNodes: z, nodes: E, hasDefaultNodes: O, debug: H } = S();
      if (R?.length) {
        if (O) {
          const k = oA(R, E);
          z(k);
        }
        H && console.log("React Flow: trigger node changes", R), N?.(R);
      }
    },
    triggerEdgeChanges: (R) => {
      const { onEdgesChange: N, setEdges: z, edges: E, hasDefaultEdges: O, debug: H } = S();
      if (R?.length) {
        if (O) {
          const k = sA(R, E);
          z(k);
        }
        H && console.log("React Flow: trigger edge changes", R), N?.(R);
      }
    },
    addSelectedNodes: (R) => {
      const { multiSelectionActive: N, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = S();
      if (N) {
        const k = R.map((V) => xr(V, !0));
        O(k);
        return;
      }
      O(xl(E, /* @__PURE__ */ new Set([...R]), !0)), H(xl(z));
    },
    addSelectedEdges: (R) => {
      const { multiSelectionActive: N, edgeLookup: z, nodeLookup: E, triggerNodeChanges: O, triggerEdgeChanges: H } = S();
      if (N) {
        const k = R.map((V) => xr(V, !0));
        H(k);
        return;
      }
      H(xl(z, /* @__PURE__ */ new Set([...R]))), O(xl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: R, edges: N } = {}) => {
      const { edges: z, nodes: E, nodeLookup: O, triggerNodeChanges: H, triggerEdgeChanges: k } = S(), V = R || E, D = N || z, I = [];
      for (const $ of V) {
        if (!$.selected)
          continue;
        const K = O.get($.id);
        K && (K.selected = !1), I.push(xr($.id, !1));
      }
      const ne = [];
      for (const $ of D)
        $.selected && ne.push(xr($.id, !1));
      H(I), k(ne);
    },
    setMinZoom: (R) => {
      const { panZoom: N, maxZoom: z } = S();
      N?.setScaleExtent([R, z]), x({ minZoom: R });
    },
    setMaxZoom: (R) => {
      const { panZoom: N, minZoom: z } = S();
      N?.setScaleExtent([z, R]), x({ maxZoom: R });
    },
    setTranslateExtent: (R) => {
      S().panZoom?.setTranslateExtent(R), x({ translateExtent: R });
    },
    resetSelectedElements: () => {
      const { edges: R, nodes: N, triggerNodeChanges: z, triggerEdgeChanges: E, elementsSelectable: O } = S();
      if (!O)
        return;
      const H = N.reduce((V, D) => D.selected ? [...V, xr(D.id, !1)] : V, []), k = R.reduce((V, D) => D.selected ? [...V, xr(D.id, !1)] : V, []);
      z(H), E(k);
    },
    setNodeExtent: (R) => {
      const { nodes: N, nodeLookup: z, parentLookup: E, nodeOrigin: O, elevateNodesOnSelect: H, nodeExtent: k, zIndexMode: V } = S();
      R[0][0] === k[0][0] && R[0][1] === k[0][1] && R[1][0] === k[1][0] && R[1][1] === k[1][1] || (Bh(N, z, E, {
        nodeOrigin: O,
        nodeExtent: R,
        elevateNodesOnSelect: H,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: R }));
    },
    panBy: (R) => {
      const { transform: N, width: z, height: E, panZoom: O, translateExtent: H } = S();
      return rD({ delta: R, panZoom: O, transform: N, translateExtent: H, width: z, height: E });
    },
    setCenter: async (R, N, z) => {
      const { width: E, height: O, maxZoom: H, panZoom: k } = S();
      if (!k)
        return !1;
      const V = typeof z?.zoom < "u" ? z.zoom : H;
      return await k.setViewport({
        x: E / 2 - R * V,
        y: O / 2 - N * V,
        zoom: V
      }, { duration: z?.duration, ease: z?.ease, interpolate: z?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...Mx }
      });
    },
    updateConnection: (R) => {
      x({ connection: R });
    },
    reset: () => x({ ..._b() })
  };
}, Object.is);
function Ow({ initialNodes: e, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: y, nodeExtent: g, zIndexMode: v, children: x }) {
  const [S] = _.useState(() => R4({
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
  return b.jsx(qD, { value: S, children: b.jsx(mA, { children: x }) });
}
function T4({ children: e, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: x }) {
  return _.useContext(Mc) ? b.jsx(b.Fragment, { children: e }) : b.jsx(Ow, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: g, nodeExtent: v, zIndexMode: x, children: e });
}
const M4 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function D4({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: y, onMoveStart: g, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: R, onClickConnectEnd: N, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: k, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: I, onNodesDelete: ne, onEdgesDelete: $, onDelete: K, onSelectionChange: oe, onSelectionDragStart: j, onSelectionDrag: Y, onSelectionDragStop: T, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onBeforeDelete: te, connectionMode: A, connectionLineType: U = Zi.Bezier, connectionLineStyle: Q, connectionLineComponent: ee, connectionLineContainerStyle: ce, deleteKeyCode: ae = "Backspace", selectionKeyCode: se = "Shift", selectionOnDrag: P = !1, selectionMode: me = Zo.Full, panActivationKeyCode: Se = "Space", multiSelectionKeyCode: Te = Qo() ? "Meta" : "Control", zoomActivationKeyCode: _e = Qo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Re, onlyRenderVisibleElements: $e = !1, selectNodesOnDrag: ft, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: ke, nodesFocusable: Ie, nodeOrigin: St = ow, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Pe = !0, defaultViewport: gt = eA, minZoom: yt = 0.5, maxZoom: Yt = 2, translateExtent: Lt = Fo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: Xn = "#b1b1b7", zoomOnScroll: xn = !0, zoomOnPinch: nn = !0, panOnScroll: Qt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: Ut = Nr.Free, zoomOnDoubleClick: gi = !0, panOnDrag: Ea = !0, onPaneClick: wn, onPaneMouseEnter: ua, onPaneMouseMove: On, onPaneMouseLeave: Fn, onPaneScroll: cn, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: pn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ca, onEdgeDoubleClick: en, onEdgeMouseEnter: B, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: pe = 10, onNodesChange: ge, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: we = "nowheel", noPanClassName: be = "nopan", fitView: De, fitViewOptions: Ae, connectOnClick: Ue, attributionPosition: je, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanOnSelection: Na = !0, autoPanSpeed: jn, connectionRadius: fn, isValidConnection: an, onError: Sn, style: yi, id: _n, nodeDragThreshold: vi, connectionDragThreshold: fa, viewport: da, onViewportChange: Be, width: bt, height: gn, colorMode: Ln = "light", debug: bi, onScroll: Ia, ariaLabelConfig: dt, zIndexMode: Zn = "basic", ...rn }, Wi) {
  const Or = _n || "1", jl = iA(Ln), xi = _.useCallback((Ll) => {
    Ll.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ia?.(Ll);
  }, [Ia]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ...rn, onScroll: xi, style: { ...yi, ...M4 }, ref: Wi, className: Pt(["react-flow", s, jl]), id: _n, role: "application", children: b.jsxs(T4, { nodes: e, edges: a, width: bt, height: gn, fitView: De, fitViewOptions: Ae, minZoom: yt, maxZoom: Yt, nodeOrigin: St, nodeExtent: ot, zIndexMode: Zn, children: [b.jsx(aA, { nodes: e, edges: a, defaultNodes: r, defaultEdges: l, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: R, onClickConnectEnd: N, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: ke, nodesFocusable: Ie, edgesFocusable: Je, edgesReconnectable: Ze, elementsSelectable: Pe, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: Yt, nodeExtent: ot, onNodesChange: ge, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Re, connectionMode: A, translateExtent: Lt, connectOnClick: Ue, defaultEdgeOptions: rt, fitView: De, fitViewOptions: Ae, onNodesDelete: ne, onEdgesDelete: $, onDelete: K, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: I, onSelectionDrag: Y, onSelectionDragStart: j, onSelectionDragStop: T, onMove: y, onMoveStart: g, onMoveEnd: v, noPanClassName: be, nodeOrigin: St, rfId: Or, autoPanOnConnect: jt, autoPanOnNodeDrag: at, autoPanSpeed: jn, onError: Sn, connectionRadius: fn, isValidConnection: an, selectNodesOnDrag: ft, nodeDragThreshold: vi, connectionDragThreshold: fa, onBeforeDelete: te, debug: bi, ariaLabelConfig: dt, zIndexMode: Zn }), b.jsx(N4, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: z, onNodeMouseMove: E, onNodeMouseLeave: O, onNodeContextMenu: H, onNodeDoubleClick: k, nodeTypes: u, edgeTypes: c, connectionLineType: U, connectionLineStyle: Q, connectionLineComponent: ee, connectionLineContainerStyle: ce, selectionKeyCode: se, selectionOnDrag: P, selectionMode: me, deleteKeyCode: ae, multiSelectionKeyCode: Te, panActivationKeyCode: Se, zoomActivationKeyCode: _e, onlyRenderVisibleElements: $e, defaultViewport: gt, translateExtent: Lt, minZoom: yt, maxZoom: Yt, preventScrolling: mt, zoomOnScroll: xn, zoomOnPinch: nn, zoomOnDoubleClick: gi, panOnScroll: Qt, panOnScrollSpeed: Ot, panOnScrollMode: Ut, panOnDrag: Ea, autoPanOnSelection: Na, onPaneClick: wn, onPaneMouseEnter: ua, onPaneMouseMove: On, onPaneMouseLeave: Fn, onPaneScroll: cn, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: L, onSelectionStart: F, onSelectionEnd: G, onReconnect: pn, onReconnectStart: pt, onReconnectEnd: Kt, onEdgeContextMenu: ca, onEdgeDoubleClick: en, onEdgeMouseEnter: B, onEdgeMouseMove: Z, onEdgeMouseLeave: W, reconnectRadius: pe, defaultMarkerColor: Xn, noDragClassName: ve, noWheelClassName: we, noPanClassName: be, rfId: Or, disableKeyboardA11y: We, nodeExtent: ot, viewport: da, onViewportChange: Be }), b.jsx(WD, { onSelectionChange: oe }), Vt, b.jsx(ZD, { proOptions: Ge, position: je }), b.jsx(FD, { rfId: Or, disableKeyboardA11y: We })] }) });
}
var A4 = uw(D4);
function z4({ dimensions: e, lineWidth: a, variant: r, className: l }) {
  return b.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Pt(["react-flow__background-pattern", r, l]) });
}
function O4({ radius: e, className: a }) {
  return b.jsx("circle", { cx: e, cy: e, r: e, className: Pt(["react-flow__background-pattern", "dots", a]) });
}
var Ba;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(Ba || (Ba = {}));
const j4 = {
  [Ba.Dots]: 1,
  [Ba.Lines]: 1,
  [Ba.Cross]: 6
}, L4 = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function jw({
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
  const g = _.useRef(null), { transform: v, patternId: x } = lt(L4, At), S = l || j4[a], C = a === Ba.Dots, R = a === Ba.Cross, N = Array.isArray(r) ? r : [r, r], z = [N[0] * v[2] || 1, N[1] * v[2] || 1], E = S * v[2], O = Array.isArray(u) ? u : [u, u], H = R ? [E, E] : z, k = [
    O[0] * v[2] || 1 + H[0] / 2,
    O[1] * v[2] || 1 + H[1] / 2
  ], V = `${x}${e || ""}`;
  return b.jsxs("svg", { className: Pt(["react-flow__background", m]), style: {
    ...p,
    ...Ac,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [b.jsx("pattern", { id: V, x: v[0] % z[0], y: v[1] % z[1], width: z[0], height: z[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${k[0]},-${k[1]})`, children: C ? b.jsx(O4, { radius: E / 2, className: y }) : b.jsx(z4, { dimensions: H, lineWidth: s, variant: a, className: y }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
jw.displayName = "Background";
const Eb = _.memo(jw);
function H4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function k4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function B4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function U4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function V4() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Au({ children: e, className: a, ...r }) {
  return b.jsx("button", { type: "button", className: Pt(["react-flow__controls-button", a]), ...r, children: e });
}
const q4 = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function Lw({ style: e, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: y, position: g = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = zt(), { isInteractive: C, minZoomReached: R, maxZoomReached: N, ariaLabelConfig: z } = lt(q4, At), { zoomIn: E, zoomOut: O, fitView: H } = jm(), k = () => {
    E(), u?.();
  }, V = () => {
    O(), c?.();
  }, D = () => {
    H(s), d?.();
  }, I = () => {
    S.setState({
      nodesDraggable: !C,
      nodesConnectable: !C,
      elementsSelectable: !C
    }), p?.(!C);
  }, ne = v === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(Dc, { className: Pt(["react-flow__controls", ne, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? z["controls.ariaLabel"], children: [a && b.jsxs(b.Fragment, { children: [b.jsx(Au, { onClick: k, className: "react-flow__controls-zoomin", title: z["controls.zoomIn.ariaLabel"], "aria-label": z["controls.zoomIn.ariaLabel"], disabled: N, children: b.jsx(H4, {}) }), b.jsx(Au, { onClick: V, className: "react-flow__controls-zoomout", title: z["controls.zoomOut.ariaLabel"], "aria-label": z["controls.zoomOut.ariaLabel"], disabled: R, children: b.jsx(k4, {}) })] }), r && b.jsx(Au, { className: "react-flow__controls-fitview", onClick: D, title: z["controls.fitView.ariaLabel"], "aria-label": z["controls.fitView.ariaLabel"], children: b.jsx(B4, {}) }), l && b.jsx(Au, { className: "react-flow__controls-interactive", onClick: I, title: z["controls.interactive.ariaLabel"], "aria-label": z["controls.interactive.ariaLabel"], children: C ? b.jsx(V4, {}) : b.jsx(U4, {}) }), y] });
}
Lw.displayName = "Controls";
const $4 = _.memo(Lw);
function I4({ id: e, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: y, shapeRendering: g, selected: v, onClick: x }) {
  const { background: S, backgroundColor: C } = u || {}, R = c || S || C;
  return b.jsx("rect", { className: Pt(["react-flow__minimap-node", { selected: v }, m]), x: a, y: r, rx: y, ry: y, width: l, height: s, style: {
    fill: R,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (N) => x(N, e) : void 0 });
}
const Y4 = _.memo(I4), G4 = (e) => e.nodes.map((a) => a.id), fh = (e) => e instanceof Function ? e : () => e;
function X4({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = Y4,
  onClick: c
}) {
  const d = lt(G4, At), p = fh(a), m = fh(e), y = fh(r), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: d.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    b.jsx(Z4, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, v)
  )) });
}
function F4({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: y, y: g, width: v, height: x } = lt((S) => {
    const C = S.nodeLookup.get(e);
    if (!C)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const R = C.internals.userNode, { x: N, y: z } = C.internals.positionAbsolute, { width: E, height: O } = mi(R);
    return {
      node: R,
      x: N,
      y: z,
      width: E,
      height: O
    };
  }, At);
  return !m || m.hidden || !Hx(m) ? null : b.jsx(d, { x: y, y: g, width: v, height: x, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const Z4 = _.memo(F4);
var P4 = _.memo(X4);
const Q4 = 200, K4 = 150, J4 = (e) => !e.hidden, W4 = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? jx(ss(e.nodeLookup, { filter: J4 }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, e5 = "react-flow__minimap-desc";
function Hw({
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
  pannable: C = !1,
  zoomable: R = !1,
  ariaLabel: N,
  inversePan: z,
  zoomStep: E = 1,
  offsetScale: O = 5
}) {
  const H = zt(), k = _.useRef(null), { boundingRect: V, viewBB: D, rfId: I, panZoom: ne, translateExtent: $, flowWidth: K, flowHeight: oe, ariaLabelConfig: j } = lt(W4, At), Y = e?.width ?? Q4, T = e?.height ?? K4, L = V.width / Y, F = V.height / T, G = Math.max(L, F), te = G * Y, A = G * T, U = O * G, Q = V.x - (te - V.width) / 2 - U, ee = V.y - (A - V.height) / 2 - U, ce = te + U * 2, ae = A + U * 2, se = `${e5}-${I}`, P = _.useRef(0), me = _.useRef();
  P.current = G, _.useEffect(() => {
    if (k.current && ne)
      return me.current = mD({
        domNode: k.current,
        panZoom: ne,
        getTransform: () => H.getState().transform,
        getViewScale: () => P.current
      }), () => {
        me.current?.destroy();
      };
  }, [ne]), _.useEffect(() => {
    me.current?.update({
      translateExtent: $,
      width: K,
      height: oe,
      inversePan: z,
      pannable: C,
      zoomStep: E,
      zoomable: R
    });
  }, [C, R, z, E, $, K, oe]);
  const Se = x ? (xe) => {
    const [Re, $e] = me.current?.pointer(xe) || [0, 0];
    x(xe, { x: Re, y: $e });
  } : void 0, Te = S ? _.useCallback((xe, Re) => {
    const $e = H.getState().nodeLookup.get(Re).internals.userNode;
    S(xe, $e);
  }, []) : void 0, _e = N ?? j["minimap.ariaLabel"];
  return b.jsx(Dc, { position: v, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * G : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Pt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: Y, height: T, viewBox: `${Q} ${ee} ${ce} ${ae}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": se, ref: k, onClick: Se, children: [_e && b.jsx("title", { id: se, children: _e }), b.jsx(P4, { onClick: Te, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${Q - U},${ee - U}h${ce + U * 2}v${ae + U * 2}h${-ce - U * 2}z
        M${D.x},${D.y}h${D.width}v${D.height}h${-D.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Hw.displayName = "MiniMap";
const t5 = _.memo(Hw), n5 = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, a5 = {
  [Al.Line]: "right",
  [Al.Handle]: "bottom-right"
};
function i5({ nodeId: e, position: a, variant: r = Al.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: C, onResize: R, onResizeEnd: N }) {
  const z = hw(), E = typeof e == "string" ? e : z, O = zt(), H = _.useRef(null), k = r === Al.Handle, V = lt(_.useCallback(n5(k && x), [k, x]), At), D = _.useRef(null), I = a ?? a5[r];
  _.useEffect(() => {
    if (!(!H.current || !E))
      return D.current || (D.current = RD({
        domNode: H.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: oe, snapToGrid: j, nodeOrigin: Y, domNode: T } = O.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: oe,
            snapToGrid: j,
            nodeOrigin: Y,
            paneDomNode: T
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: oe, nodeLookup: j, parentLookup: Y, nodeOrigin: T } = O.getState(), L = [], F = { x: $.x, y: $.y }, G = j.get(E);
          if (G && G.expandParent && G.parentId) {
            const te = G.origin ?? T, A = $.width ?? G.measured.width ?? 0, U = $.height ?? G.measured.height ?? 0, Q = {
              id: G.id,
              parentId: G.parentId,
              rect: {
                width: A,
                height: U,
                ...kx({
                  x: $.x ?? G.position.x,
                  y: $.y ?? G.position.y
                }, { width: A, height: U }, G.parentId, j, te)
              }
            }, ee = Om([Q], j, Y, T);
            L.push(...ee), F.x = $.x ? Math.max(te[0] * A, $.x) : void 0, F.y = $.y ? Math.max(te[1] * U, $.y) : void 0;
          }
          if (F.x !== void 0 && F.y !== void 0) {
            const te = {
              id: E,
              type: "position",
              position: { ...F }
            };
            L.push(te);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const A = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            L.push(A);
          }
          for (const te of K) {
            const A = {
              ...te,
              type: "position"
            };
            L.push(A);
          }
          oe(L);
        },
        onEnd: ({ width: $, height: K }) => {
          const oe = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: $,
              height: K
            }
          };
          O.getState().triggerNodeChanges([oe]);
        }
      })), D.current.update({
        controlPosition: I,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: g,
        resizeDirection: v,
        onResizeStart: C,
        onResize: R,
        onResizeEnd: N,
        shouldResize: S
      }), () => {
        D.current?.destroy();
      };
  }, [
    I,
    d,
    p,
    m,
    y,
    g,
    C,
    R,
    N,
    S
  ]);
  const ne = I.split("-");
  return b.jsx("div", { className: Pt(["react-flow__resize-control", "nodrag", ...ne, r, l]), ref: H, style: {
    ...s,
    scale: V,
    ...c && { [k ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
_.memo(i5);
var r5 = "_1bllf8b0", l5 = "_1bllf8b1";
const Nb = 16, o5 = "rgba(186, 158, 255, 0.14)", s5 = "rgba(186, 158, 255, 0.06)", u5 = "rgba(0, 0, 0, 0.6)", c5 = "#1d2023", f5 = "#ba9eff";
function d5({
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
  const y = [r5, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsx("div", { className: y, "aria-label": d ?? "node graph", children: /* @__PURE__ */ b.jsxs(
    A4,
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
          Eb,
          {
            id: "minor",
            variant: Ba.Dots,
            gap: Nb,
            size: 1.1,
            color: o5
          }
        ),
        /* @__PURE__ */ b.jsx(
          Eb,
          {
            id: "major",
            variant: Ba.Lines,
            gap: Nb * 5,
            lineWidth: 1,
            color: s5
          }
        ),
        s && /* @__PURE__ */ b.jsx($4, { showInteractive: !1 }),
        l && /* @__PURE__ */ b.jsx(
          t5,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: u5,
            nodeColor: () => c5,
            nodeStrokeColor: () => f5,
            className: l5
          }
        ),
        p
      ]
    }
  ) });
}
function h5(e) {
  return /* @__PURE__ */ b.jsx(Ow, { children: /* @__PURE__ */ b.jsx(d5, { ...e }) });
}
var m5 = "a9gtw0", p5 = "a9gtw1", g5 = "a9gtw2", y5 = "a9gtw3", v5 = "a9gtw4", b5 = "a9gtw5", x5 = "a9gtw6", w5 = "a9gtw7";
const S5 = {
  default: "",
  raised: p5,
  inset: g5
};
function Oa({
  title: e,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [m5, S5[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("section", { className: c, children: [
    (e || r) && /* @__PURE__ */ b.jsxs("header", { className: y5, children: [
      /* @__PURE__ */ b.jsxs("div", { className: v5, children: [
        e && /* @__PURE__ */ b.jsx("span", { className: x5, children: e }),
        a && /* @__PURE__ */ b.jsx("span", { className: w5, children: a })
      ] }),
      r && /* @__PURE__ */ b.jsx("div", { className: b5, children: r })
    ] }),
    l
  ] });
}
const Hm = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function km() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function dc() {
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
    stageStates: km()
  };
}
function Cb(e, a, r = Date.now()) {
  return {
    ...dc(),
    phase: "running",
    jobId: e,
    lastFrameAt: r,
    stageStates: {
      ...km(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function _5(e, a, r = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: R5(a.params.fraction),
        stage: a.params.stage ?? l.stage
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: A5(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: M5(
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
        stageStates: kw(l.stageStates)
      };
    default:
      return l;
  }
}
function E5(e) {
  return { ...e, phase: "cancelled", stageStates: km() };
}
const N5 = -32108;
function C5(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: N5,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: kw(e.stageStates)
  };
}
function Rb(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function zu(e) {
  const a = dc();
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
function R5(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const T5 = 0.3;
function M5(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + T5 * (a - e);
}
function D5(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), r = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + r * e.totalSteps) * e.secondsPerStep;
}
function A5(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function kw(e) {
  const a = { ...e };
  for (const r of Hm)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const Bw = [
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
], Oc = [
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
function z5(e) {
  return Oc.filter((a) => a.tier === e);
}
function O5() {
  const e = {};
  for (const a of Oc)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function Tb(e) {
  return {
    ...O5(),
    mode: "image_to_video",
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    blocks_to_swap: e.blocksToSwap,
    attention: e.attentionBackend,
    interpolate_method: e.interpolateMethod,
    interpolate_fps: e.interpolateFps,
    models_dir: e.modelsDir || void 0,
    output_path: e.outputDir ? `${e.outputDir}/svi2_out.mp4` : void 0,
    dit_high_path: e.ditHighPath || void 0,
    dit_low_path: e.ditLowPath || void 0
  };
}
function Mb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const Uw = [10, 20, 30, 60, 120], j5 = "custom", yl = 85, dh = { framesPerClip: yl, fps: 16, overlap: 5 };
function Ar(e) {
  return {
    framesPerClip: e.frames_per_clip ?? dh.framesPerClip,
    fps: e.fps ?? dh.fps,
    overlap: e.num_overlap_frame ?? dh.overlap
  };
}
function Vw(e, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (e - 1) * (r - l);
}
function qh(e, a) {
  return a.fps <= 0 ? 0 : Vw(e, a) / a.fps;
}
function L5(e, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
function H5(e, a) {
  const { fps: r, overlap: l } = a;
  if (r <= 0) return { numClips: 1, framesPerClip: yl };
  const s = Math.round(e * r);
  if (s <= Bm)
    return { numClips: 1, framesPerClip: Um(s) };
  const u = yl - l;
  return u <= 0 ? { numClips: 1, framesPerClip: yl } : { numClips: Math.max(2, Math.round((s - yl) / u) + 1), framesPerClip: yl };
}
const k5 = 5, Bm = 129, B5 = [2, 3, 4, 5, 6, 8];
function Um(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(Bm, Math.max(k5, a));
}
function Db(e, a) {
  return Um(e * a);
}
function U5(e) {
  return e <= 0 ? 0 : Math.floor(Bm / e);
}
function qw(e) {
  const { framesPerClip: a, fps: r } = Ar(e);
  return r <= 0 ? 0 : a / r;
}
function V5(e) {
  const { framesPerClip: a, fps: r } = Ar(e), l = `1 × ${a} frames @ ${r} fps → ${qw(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function q5(e, a) {
  for (const r of Uw)
    if (L5(r, a) === e) return r;
  return j5;
}
function $5(e) {
  const a = Ar(e), r = e.num_clips ?? 1, l = qh(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
const Jo = "svi-canonical", I5 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), Y5 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), G5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function X5(e) {
  const a = e.frames_per_clip, r = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function F5(e) {
  const a = e.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = X5(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = I5.has(e.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: y,
    isLowVram: p,
    isOffDistribution: Y5.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : G5.has(e.id)
  };
}
function Z5(e) {
  return [...e].sort((a, r) => a.id === Jo ? -1 : r.id === Jo ? 1 : 0);
}
function P5(e) {
  const a = e.filter((r) => !r.hidden);
  return {
    featured: Z5(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function Q5(e = 25) {
  return Ji(`/render/jobs?limit=${e}`);
}
async function hh(e) {
  return Ji(`/render/jobs/${e}`);
}
async function K5(e) {
  return Ji("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function J5(e) {
  return Ji(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function W5(e, a, r) {
  return XN(`/render/jobs/${e}/events`, a, r);
}
const e3 = 9e4, Ab = 24e4, t3 = 5e3, Vm = "nexus.video.svi2-pro.active-render";
function n3(e) {
  try {
    sessionStorage.setItem(Vm, JSON.stringify({ jobId: e }));
  } catch {
  }
}
function Ou() {
  try {
    sessionStorage.removeItem(Vm);
  } catch {
  }
}
function a3() {
  try {
    const e = sessionStorage.getItem(Vm);
    if (!e) return null;
    const a = JSON.parse(e);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
const $w = _.createContext(null);
function i3({
  initialSettings: e = P1,
  initialPreset: a = null,
  children: r
}) {
  const [l, s] = _.useState(e), [u, c] = _.useState(
    a?.id ?? Jo
  ), [d, p] = _.useState(a !== null), [m, y] = _.useState(() => {
    const ae = Tb(e);
    return a ? Mb(ae, a) : ae;
  }), [g, v] = _.useState(null), [x, S] = _.useState(null), [C, R] = _.useState({
    enabled: !1,
    prompt: ""
  }), [N, z] = _.useState(dc), E = _.useRef(null), O = _.useRef(null), H = _.useRef(N);
  H.current = N;
  const k = _.useRef(!1), V = _.useRef(0), D = _.useRef(null), I = _.useCallback(() => {
    O.current !== null && (clearInterval(O.current), O.current = null);
  }, []), ne = _.useCallback(() => {
    I(), O.current = setInterval(() => {
      const ae = H.current;
      if (ae.phase !== "running" || ae.lastFrameAt === null || k.current) return;
      const se = Date.now() - ae.lastFrameAt, P = Date.now() - V.current;
      if (se >= Ab && P >= Ab) {
        ae.jobId && D.current?.(ae.jobId);
        return;
      }
      se >= e3 && z((me) => Rb(me));
    }, t3);
  }, [I]), $ = _.useCallback(
    (ae) => {
      E.current?.(), E.current = W5(
        ae,
        (se) => {
          z((P) => _5(P, se));
        },
        () => {
          k.current || z((se) => Rb(se));
        }
      ), ne();
    },
    [ne]
  ), K = _.useCallback(
    (ae) => {
      if (k.current) return;
      const se = ae;
      k.current = !0, V.current = Date.now(), $(ae), z(
        (Se) => Se.phase === "running" ? { ...Se, lastFrameAt: Date.now() } : Se
      );
      const P = () => H.current.jobId === se && H.current.phase === "running", me = (Se) => {
        P() && (E.current?.(), E.current = null, I(), z(Se));
      };
      hh(ae).then((Se) => {
        (Se.status === "succeeded" || Se.status === "failed" || Se.status === "cancelled") && me(zu(Se));
      }).catch(() => {
        me(C5(H.current));
      }).finally(() => {
        k.current = !1;
      });
    },
    [$, I]
  );
  D.current = K;
  const oe = _.useCallback(
    (ae) => {
      const se = ae.params.requires_last_image === !0;
      c(ae.id), p(!0), y((P) => {
        const me = {
          ...Tb(l),
          mode: P.mode ?? "image_to_video",
          ref_image_path: P.ref_image_path,
          prompts: P.prompts,
          last_image_path: se ? P.last_image_path ?? null : null
        };
        return Mb(me, ae);
      }), se || S(null);
    },
    [l]
  ), j = _.useCallback((ae) => {
    y((se) => {
      if (ae === "text_to_video") return { ...se, mode: ae };
      const { seed: P, ...me } = se;
      return { ...me, mode: ae };
    });
  }, []), Y = _.useCallback(
    (ae, se) => {
      y((P) => ({ ...P, [ae]: se }));
    },
    []
  ), T = _.useCallback((ae) => {
    y((se) => ({ ...se, prompts: ae }));
  }, []), L = _.useCallback((ae, se) => {
    v(ae), y((P) => ({ ...P, ref_image_path: se }));
  }, []), F = _.useCallback((ae, se) => {
    S(ae), y((P) => se === null || se.length === 0 ? { ...P, last_image_path: se } : {
      ...P,
      last_image_path: se,
      num_clips: 1,
      frames_per_clip: Um(P.frames_per_clip ?? 81)
    });
  }, []), G = _.useCallback((ae) => {
    R((se) => ({ ...se, ...ae }));
  }, []), te = _.useCallback((ae) => {
    s(ae);
  }, []), A = _.useCallback(() => {
    E.current?.(), E.current = null, I(), Ou(), z(dc());
  }, [I]), U = _.useCallback(async () => {
    E.current?.(), V.current = 0;
    const { jobId: ae } = await K5({ presetId: u, params: m });
    z(Cb(ae, C.enabled)), n3(ae), $(ae);
  }, [m, u, C.enabled, $]), Q = _.useCallback(async () => {
    const ae = H.current.jobId ?? N.jobId;
    if (!ae) return;
    const { status: se } = await J5(ae);
    se !== "cancelling" && (E.current?.(), E.current = null, I(), Ou(), z((P) => E5(P)));
  }, [N.jobId, I]), ee = _.useCallback(
    async (ae) => {
      E.current?.(), E.current = null, I();
      try {
        const se = await hh(ae.id);
        z(zu(se));
      } catch {
        z(zu(ae));
      }
    },
    [I]
  );
  _.useEffect(() => {
    (N.phase === "done" || N.phase === "error" || N.phase === "cancelled") && Ou();
  }, [N.phase]), _.useEffect(() => {
    const ae = () => {
      const me = H.current;
      me.phase !== "running" || !me.jobId || ($(me.jobId), z(
        (Se) => Se.phase === "running" ? { ...Se, stalled: !1, lastFrameAt: Date.now() } : Se
      ));
    }, se = () => {
      document.visibilityState === "visible" && ae();
    }, P = () => ae();
    return document.addEventListener("visibilitychange", se), window.addEventListener("focus", P), () => {
      document.removeEventListener("visibilitychange", se), window.removeEventListener("focus", P);
    };
  }, [$]), _.useEffect(() => {
    const ae = a3();
    if (!ae) return;
    let se = !1;
    return hh(ae).then((P) => {
      if (!se) {
        if (P.status === "succeeded" || P.status === "failed" || P.status === "cancelled") {
          Ou(), z(zu(P));
          return;
        }
        z(Cb(ae, !1)), $(ae);
      }
    }).catch(() => {
    }), () => {
      se = !0;
    };
  }, [$]), _.useEffect(() => () => {
    E.current?.(), E.current = null, I();
  }, [I]);
  const ce = _.useMemo(
    () => ({
      settings: l,
      presetId: u,
      presetApplied: d,
      params: m,
      refImageName: g,
      lastImageName: x,
      qwenEdit: C,
      render: N,
      applyPresetById: oe,
      setMode: j,
      updateParam: Y,
      setPrompts: T,
      setRefImage: L,
      setLastImage: F,
      setQwenEdit: G,
      setSettings: te,
      startRenderJob: U,
      cancelRenderJob: Q,
      resetRender: A,
      showJobResult: ee
    }),
    [
      l,
      u,
      d,
      m,
      g,
      x,
      C,
      N,
      oe,
      j,
      Y,
      T,
      L,
      F,
      G,
      te,
      U,
      Q,
      A,
      ee
    ]
  );
  return /* @__PURE__ */ b.jsx($w.Provider, { value: ce, children: r });
}
function Wt() {
  const e = _.useContext($w);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
function r3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
const l3 = (e) => {
  switch (e) {
    case "success":
      return u3;
    case "info":
      return f3;
    case "warning":
      return c3;
    case "error":
      return d3;
    default:
      return null;
  }
}, o3 = Array(12).fill(0), s3 = ({ visible: e, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, o3.map((r, l) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), u3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), c3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), f3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), d3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), h3 = /* @__PURE__ */ ye.createElement("svg", {
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
})), m3 = () => {
  const [e, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), e;
};
let $h = 1;
class p3 {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : $h++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
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
        else if (y3(m) && !m.ok) {
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
      const l = r?.id || $h++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Dn = new p3(), g3 = (e, a) => {
  const r = a?.id || $h++;
  return Dn.addToast({
    title: e,
    ...a,
    id: r
  }), r;
}, y3 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", v3 = g3, b3 = () => Dn.toasts, x3 = () => Dn.getActiveToasts(), _r = Object.assign(v3, {
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
  getHistory: b3,
  getToasts: x3
});
r3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function ju(e) {
  return e.label !== void 0;
}
const w3 = 3, S3 = "24px", _3 = "16px", zb = 4e3, E3 = 356, N3 = 14, C3 = 45, R3 = 200;
function Aa(...e) {
  return e.filter(Boolean).join(" ");
}
function T3(e) {
  const [a, r] = e.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const M3 = (e) => {
  var a, r, l, s, u, c, d, p, m;
  const { invert: y, toast: g, unstyled: v, interacting: x, setHeights: S, visibleToasts: C, heights: R, index: N, toasts: z, expanded: E, removeToast: O, defaultRichColors: H, closeButton: k, style: V, cancelButtonStyle: D, actionButtonStyle: I, className: ne = "", descriptionClassName: $ = "", duration: K, position: oe, gap: j, expandByDefault: Y, classNames: T, icons: L, closeButtonAriaLabel: F = "Close toast" } = e, [G, te] = ye.useState(null), [A, U] = ye.useState(null), [Q, ee] = ye.useState(!1), [ce, ae] = ye.useState(!1), [se, P] = ye.useState(!1), [me, Se] = ye.useState(!1), [Te, _e] = ye.useState(!1), [xe, Re] = ye.useState(0), [$e, ft] = ye.useState(0), Me = ye.useRef(g.duration || K || zb), Xe = ye.useRef(null), ke = ye.useRef(null), Ie = N === 0, St = N + 1 <= C, Je = g.type, Ze = g.dismissible !== !1, Pe = g.className || "", gt = g.descriptionClassName || "", yt = ye.useMemo(() => R.findIndex((He) => He.toastId === g.id) || 0, [
    R,
    g.id
  ]), Yt = ye.useMemo(() => {
    var He;
    return (He = g.closeButton) != null ? He : k;
  }, [
    g.closeButton,
    k
  ]), Lt = ye.useMemo(() => g.duration || K || zb, [
    g.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), Xn = ye.useRef(0), xn = ye.useRef(null), [nn, Qt] = oe.split("-"), Ot = ye.useMemo(() => R.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    R,
    yt
  ]), Ut = m3(), gi = g.invert || y, Ea = Je === "loading";
  ot.current = ye.useMemo(() => yt * j + Ot, [
    yt,
    Ot
  ]), ye.useEffect(() => {
    Me.current = Lt;
  }, [
    Lt
  ]), ye.useEffect(() => {
    ee(!0);
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
    if (!Q) return;
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
    Q,
    g.title,
    g.description,
    S,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const wn = ye.useCallback(() => {
    ae(!0), Re(ot.current), S((He) => He.filter((vt) => vt.toastId !== g.id)), setTimeout(() => {
      O(g);
    }, R3);
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
        className: Aa(T?.loader, g == null || (vt = g.classNames) == null ? void 0 : vt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ye.createElement(s3, {
      className: Aa(T?.loader, g == null || (He = g.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const On = g.icon || L?.[Je] || l3(Je);
  var Fn, cn;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: ke,
    className: Aa(ne, Pe, T?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, T?.default, T?.[Je], g == null || (r = g.classNames) == null ? void 0 : r[Je]),
    "data-sonner-toast": "",
    "data-rich-colors": (Fn = g.richColors) != null ? Fn : H,
    "data-styled": !(g.jsx || g.unstyled || v),
    "data-mounted": Q,
    "data-promise": !!g.promise,
    "data-swiped": Te,
    "data-removed": ce,
    "data-visible": St,
    "data-y-position": nn,
    "data-x-position": Qt,
    "data-index": N,
    "data-front": Ie,
    "data-swiping": se,
    "data-dismissible": Ze,
    "data-type": Je,
    "data-invert": gi,
    "data-swipe-out": me,
    "data-swipe-direction": A,
    "data-expanded": !!(E || Y && Q),
    "data-testid": g.testId,
    style: {
      "--index": N,
      "--toasts-before": N,
      "--z-index": z.length - N,
      "--offset": `${ce ? xe : ot.current}px`,
      "--initial-height": Y ? "auto" : `${$e}px`,
      ...V,
      ...g.style
    },
    onDragEnd: () => {
      P(!1), te(null), xn.current = null;
    },
    onPointerDown: (He) => {
      He.button !== 2 && (Ea || !Ze || (Xe.current = /* @__PURE__ */ new Date(), Re(ot.current), He.target.setPointerCapture(He.pointerId), He.target.tagName !== "BUTTON" && (P(!0), xn.current = {
        x: He.clientX,
        y: He.clientY
      })));
    },
    onPointerUp: () => {
      var He, vt, Ht;
      if (me || !Ze) return;
      xn.current = null;
      const Vt = Number(((He = ke.current) == null ? void 0 : He.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), pn = Number(((vt = ke.current) == null ? void 0 : vt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((Ht = Xe.current) == null ? void 0 : Ht.getTime()), Kt = G === "x" ? Vt : pn, ca = Math.abs(Kt) / pt;
      if (Math.abs(Kt) >= C3 || ca > 0.11) {
        Re(ot.current), g.onDismiss == null || g.onDismiss.call(g, g), U(G === "x" ? Vt > 0 ? "right" : "left" : pn > 0 ? "down" : "up"), wn(), Se(!0);
        return;
      } else {
        var en, B;
        (en = ke.current) == null || en.style.setProperty("--swipe-amount-x", "0px"), (B = ke.current) == null || B.style.setProperty("--swipe-amount-y", "0px");
      }
      _e(!1), P(!1), te(null);
    },
    onPointerMove: (He) => {
      var vt, Ht, Vt;
      if (!xn.current || !Ze || ((vt = window.getSelection()) == null ? void 0 : vt.toString().length) > 0) return;
      const pt = He.clientY - xn.current.y, Kt = He.clientX - xn.current.x;
      var ca;
      const en = (ca = e.swipeDirections) != null ? ca : T3(oe);
      !G && (Math.abs(Kt) > 1 || Math.abs(pt) > 1) && te(Math.abs(Kt) > Math.abs(pt) ? "x" : "y");
      let B = {
        x: 0,
        y: 0
      };
      const Z = (W) => 1 / (1.5 + Math.abs(W) / 20);
      if (G === "y") {
        if (en.includes("top") || en.includes("bottom"))
          if (en.includes("top") && pt < 0 || en.includes("bottom") && pt > 0)
            B.y = pt;
          else {
            const W = pt * Z(pt);
            B.y = Math.abs(W) < Math.abs(pt) ? W : pt;
          }
      } else if (G === "x" && (en.includes("left") || en.includes("right")))
        if (en.includes("left") && Kt < 0 || en.includes("right") && Kt > 0)
          B.x = Kt;
        else {
          const W = Kt * Z(Kt);
          B.x = Math.abs(W) < Math.abs(Kt) ? W : Kt;
        }
      (Math.abs(B.x) > 0 || Math.abs(B.y) > 0) && _e(!0), (Ht = ke.current) == null || Ht.style.setProperty("--swipe-amount-x", `${B.x}px`), (Vt = ke.current) == null || Vt.style.setProperty("--swipe-amount-y", `${B.y}px`);
    }
  }, Yt && !g.jsx && Je !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": F,
    "data-disabled": Ea,
    "data-close-button": !0,
    onClick: Ea || !Ze ? () => {
    } : () => {
      wn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: Aa(T?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (cn = L?.close) != null ? cn : h3) : null, (Je || g.icon || g.promise) && g.icon !== null && (L?.[Je] !== null || g.icon) ? /* @__PURE__ */ ye.createElement("div", {
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
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ ye.isValidElement(g.cancel) ? g.cancel : g.cancel && ju(g.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || D,
    onClick: (He) => {
      ju(g.cancel) && Ze && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, He), wn());
    },
    className: Aa(T?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(g.action) ? g.action : g.action && ju(g.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || I,
    onClick: (He) => {
      ju(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, He), !He.defaultPrevented && wn());
    },
    className: Aa(T?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function Ob() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function D3(e, a) {
  const r = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? _3 : S3;
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
const A3 = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: y, mobileOffset: g, theme: v = "light", richColors: x, duration: S, style: C, visibleToasts: R = w3, toastOptions: N, dir: z = Ob(), gap: E = N3, icons: O, containerAriaLabel: H = "Notifications" } = a, [k, V] = ye.useState([]), D = ye.useMemo(() => l ? k.filter((Q) => Q.toasterId === l) : k.filter((Q) => !Q.toasterId), [
    k,
    l
  ]), I = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((Q) => Q.position).map((Q) => Q.position)))), [
    D,
    u
  ]), [ne, $] = ye.useState([]), [K, oe] = ye.useState(!1), [j, Y] = ye.useState(!1), [T, L] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = ye.useRef(null), G = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), te = ye.useRef(null), A = ye.useRef(!1), U = ye.useCallback((Q) => {
    V((ee) => {
      var ce;
      return (ce = ee.find((ae) => ae.id === Q.id)) != null && ce.delete || Dn.dismiss(Q.id), ee.filter(({ id: ae }) => ae !== Q.id);
    });
  }, []);
  return ye.useEffect(() => Dn.subscribe((Q) => {
    if (Q.dismiss) {
      requestAnimationFrame(() => {
        V((ee) => ee.map((ce) => ce.id === Q.id ? {
          ...ce,
          delete: !0
        } : ce));
      });
      return;
    }
    setTimeout(() => {
      VD.flushSync(() => {
        V((ee) => {
          const ce = ee.findIndex((ae) => ae.id === Q.id);
          return ce !== -1 ? [
            ...ee.slice(0, ce),
            {
              ...ee[ce],
              ...Q
            },
            ...ee.slice(ce + 1)
          ] : [
            Q,
            ...ee
          ];
        });
      });
    });
  }), [
    k
  ]), ye.useEffect(() => {
    if (v !== "system") {
      L(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), typeof window > "u") return;
    const Q = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Q.addEventListener("change", ({ matches: ee }) => {
        L(ee ? "dark" : "light");
      });
    } catch {
      Q.addListener(({ matches: ce }) => {
        try {
          L(ce ? "dark" : "light");
        } catch (ae) {
          console.error(ae);
        }
      });
    }
  }, [
    v
  ]), ye.useEffect(() => {
    k.length <= 1 && oe(!1);
  }, [
    k
  ]), ye.useEffect(() => {
    const Q = (ee) => {
      var ce;
      if (c.every((P) => ee[P] || ee.code === P)) {
        var se;
        oe(!0), (se = F.current) == null || se.focus();
      }
      ee.code === "Escape" && (document.activeElement === F.current || (ce = F.current) != null && ce.contains(document.activeElement)) && oe(!1);
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [
    c
  ]), ye.useEffect(() => {
    if (F.current)
      return () => {
        te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null, A.current = !1);
      };
  }, [
    F.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: r,
    "aria-label": `${H} ${G}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((Q, ee) => {
    var ce;
    const [ae, se] = Q.split("-");
    return D.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: Q,
      dir: z === "auto" ? Ob() : z,
      tabIndex: -1,
      ref: F,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": T,
      "data-y-position": ae,
      "data-x-position": se,
      style: {
        "--front-toast-height": `${((ce = ne[0]) == null ? void 0 : ce.height) || 0}px`,
        "--width": `${E3}px`,
        "--gap": `${E}px`,
        ...C,
        ...D3(y, g)
      },
      onBlur: (P) => {
        A.current && !P.currentTarget.contains(P.relatedTarget) && (A.current = !1, te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null));
      },
      onFocus: (P) => {
        P.target instanceof HTMLElement && P.target.dataset.dismissible === "false" || A.current || (A.current = !0, te.current = P.relatedTarget);
      },
      onMouseEnter: () => oe(!0),
      onMouseMove: () => oe(!0),
      onMouseLeave: () => {
        j || oe(!1);
      },
      onDragEnd: () => oe(!1),
      onPointerDown: (P) => {
        P.target instanceof HTMLElement && P.target.dataset.dismissible === "false" || Y(!0);
      },
      onPointerUp: () => Y(!1)
    }, D.filter((P) => !P.position && ee === 0 || P.position === Q).map((P, me) => {
      var Se, Te;
      return /* @__PURE__ */ ye.createElement(M3, {
        key: P.id,
        icons: O,
        index: me,
        toast: P,
        defaultRichColors: x,
        duration: (Se = N?.duration) != null ? Se : S,
        className: N?.className,
        descriptionClassName: N?.descriptionClassName,
        invert: s,
        visibleToasts: R,
        closeButton: (Te = N?.closeButton) != null ? Te : p,
        interacting: j,
        position: Q,
        style: N?.style,
        unstyled: N?.unstyled,
        classNames: N?.classNames,
        cancelButtonStyle: N?.cancelButtonStyle,
        actionButtonStyle: N?.actionButtonStyle,
        closeButtonAriaLabel: N?.closeButtonAriaLabel,
        removeToast: U,
        toasts: D.filter((_e) => _e.position == P.position),
        heights: ne.filter((_e) => _e.position == P.position),
        setHeights: $,
        expandByDefault: d,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Ih = "svi2-pro:trigger-render", Yh = "svi2-pro:render-state";
function z3() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Ih));
}
function O3(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Yh, { detail: e }));
}
function j3(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Ih, e), () => window.removeEventListener(Ih, e));
}
function L3(e) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && e(l);
  };
  return window.addEventListener(Yh, a), () => window.removeEventListener(Yh, a);
}
const H3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), k3 = 832 * 480, B3 = 0.85;
function qm(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && H3.has(e);
}
function jc(e, a) {
  return qm(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function jb(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function U3(e, a) {
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
  jb(d, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), jb(p, 16) || r.push({
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
  }), qm(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), jc(a.presetId, e) && g !== void 0 && g > 1 && r.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < k3 * B3 && r.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function V3(e) {
  return e.some((a) => a.severity === "error");
}
function Iw() {
  const {
    params: e,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Wt(), d = _.useMemo(
    () => U3(e, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, r, l]
  ), p = V3(d), m = s.phase === "running", [y, g] = _.useState(null), v = _.useCallback(async () => {
    if (p) {
      const S = d.find((C) => C.severity === "error");
      S && g({ field: S.field, token: Date.now() }), _r.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), _r.success("Render started.");
    } catch (S) {
      const C = S instanceof bc ? S.message : "Could not start the render.";
      _r.error(C);
    }
  }, [p, d, u]), x = _.useCallback(async () => {
    try {
      await c();
    } catch {
      _r.error("Could not cancel the render.");
    }
  }, [c]);
  return _.useEffect(() => j3(() => void v()), [v]), _.useEffect(() => {
    O3({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: v, cancel: x, focusRequest: y };
}
const q3 = 220, $3 = 80;
function I3(e) {
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
function Y3(e, a) {
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
function G3(e) {
  const a = Hm.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: I3(s),
      subtitle: Y3(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * q3, y: $3 },
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
var X3 = "dk8hba0", F3 = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, Z3 = "dk8hba5", P3 = "dk8hba6", Q3 = "dk8hba7", K3 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, J3 = "dk8hbac";
function W3({ data: e }) {
  const a = e, r = [X3, F3[a.state]].join(" "), l = [J3, K3[a.state]].join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ b.jsx(zl, { type: "target", position: ze.Left }),
    /* @__PURE__ */ b.jsxs("div", { className: Z3, children: [
      /* @__PURE__ */ b.jsx("span", { className: P3, children: a.title }),
      /* @__PURE__ */ b.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ b.jsx("span", { className: Q3, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ b.jsx(zl, { type: "source", position: ze.Right })
  ] });
}
const ez = { pipeline: W3 };
var tz = "_1g4g8kk0", nz = "_1g4g8kk1", az = "_1g4g8kk2", iz = "_1g4g8kk3", rz = "_1g4g8kk4", lz = "_1g4g8kk5";
const oz = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, sz = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function uz() {
  const { render: e, params: a, qwenEdit: r } = Wt(), { busy: l, blocked: s, submit: u, cancel: c } = Iw(), d = _.useMemo(
    () => G3({ render: e, params: a, qwenEditEnabled: r.enabled }),
    [e, a, r.enabled]
  ), p = Hm.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ b.jsxs("div", { className: tz, children: [
    /* @__PURE__ */ b.jsx("div", { className: nz, children: /* @__PURE__ */ b.jsx(
      h5,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: ez,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ b.jsx("div", { className: az, children: /* @__PURE__ */ b.jsxs(
      Oa,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ b.jsx("div", { className: iz, children: p.map((m) => /* @__PURE__ */ b.jsxs("div", { className: rz, children: [
            /* @__PURE__ */ b.jsx("span", { children: sz[m] }),
            /* @__PURE__ */ b.jsx(An, { tone: oz[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ b.jsx("div", { className: lz, children: l ? /* @__PURE__ */ b.jsx(Ha, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ b.jsx(Ha, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var Lb = nw();
const Yw = 0, Gw = 1, Xw = 2, Hb = 3;
var kb = Object.prototype.hasOwnProperty;
function Gh(e, a) {
  var r, l;
  if (e === a) return !0;
  if (e && a && (r = e.constructor) === a.constructor) {
    if (r === Date) return e.getTime() === a.getTime();
    if (r === RegExp) return e.toString() === a.toString();
    if (r === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && Gh(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof e == "object") {
      l = 0;
      for (r in e)
        if (kb.call(e, r) && ++l && !kb.call(a, r) || !(r in a) || !Gh(e[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const ui = /* @__PURE__ */ new WeakMap(), fi = () => {
}, mn = (
  /*#__NOINLINE__*/
  fi()
), Xh = Object, nt = (e) => e === mn, La = (e) => typeof e == "function", Ki = (e, a) => ({
  ...e,
  ...a
}), Fw = (e) => La(e.then), mh = {}, Lu = {}, $m = "undefined", cs = typeof window != $m, Fh = typeof document != $m, cz = cs && "Deno" in window, fz = () => cs && typeof window.requestAnimationFrame != $m, Zw = (e, a) => {
  const r = ui.get(e);
  return [
    // Getter
    () => !nt(a) && e.get(a) || mh,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = e.get(a);
        a in Lu || (Lu[a] = s), r[5](a, Ki(s, l), s || mh);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in Lu ? Lu[a] : !nt(a) && e.get(a) || mh
  ];
};
let Zh = !0;
const dz = () => Zh, [Ph, Qh] = cs && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  fi,
  fi
], hz = () => {
  const e = Fh && document.visibilityState;
  return nt(e) || e !== "hidden";
}, mz = (e) => (Fh && document.addEventListener("visibilitychange", e), Ph("focus", e), () => {
  Fh && document.removeEventListener("visibilitychange", e), Qh("focus", e);
}), pz = (e) => {
  const a = () => {
    Zh = !0, e();
  }, r = () => {
    Zh = !1;
  };
  return Ph("online", a), Ph("offline", r), () => {
    Qh("online", a), Qh("offline", r);
  };
}, gz = {
  isOnline: dz,
  isVisible: hz
}, yz = {
  initFocus: mz,
  initReconnect: pz
}, Bb = !ye.useId, El = !cs || cz, vz = (e) => fz() ? window.requestAnimationFrame(e) : setTimeout(e, 1), ph = El ? _.useEffect : _.useLayoutEffect, gh = typeof navigator < "u" && navigator.connection, Ub = !El && gh && ([
  "slow-2g",
  "2g"
].includes(gh.effectiveType) || gh.saveData), Hu = /* @__PURE__ */ new WeakMap(), bz = (e) => Xh.prototype.toString.call(e), yh = (e, a) => e === `[object ${a}]`;
let xz = 0;
const Kh = (e) => {
  const a = typeof e, r = bz(e), l = yh(r, "Date"), s = yh(r, "RegExp"), u = yh(r, "Object");
  let c, d;
  if (Xh(e) === e && !l && !s) {
    if (c = Hu.get(e), c) return c;
    if (c = ++xz + "~", Hu.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += Kh(e[d]) + ",";
      Hu.set(e, c);
    }
    if (u) {
      c = "#";
      const p = Xh.keys(e).sort();
      for (; !nt(d = p.pop()); )
        nt(e[d]) || (c += d + ":" + Kh(e[d]) + ",");
      Hu.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, Im = (e) => {
  if (La(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? Kh(e) : "", [
    e,
    a
  ];
};
let wz = 0;
const Jh = () => ++wz;
async function Pw(...e) {
  const [a, r, l, s] = e, u = Ki({
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
    for (const C of S)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(C) && v(a.get(C)._k) && x.push(C);
    return Promise.all(x.map(g));
  }
  return g(r);
  async function g(v) {
    const [x] = Im(v);
    if (!x) return;
    const [S, C] = Zw(a, x), [R, N, z, E] = ui.get(a), O = () => {
      const j = R[x];
      return (La(u.revalidate) ? u.revalidate(S().data, v) : u.revalidate !== !1) && (delete z[x], delete E[x], j && j[0]) ? j[0](Xw).then(() => S().data) : S().data;
    };
    if (e.length < 3)
      return O();
    let H = l, k, V = !1;
    const D = Jh();
    N[x] = [
      D,
      0
    ];
    const I = !nt(p), ne = S(), $ = ne.data, K = ne._c, oe = nt(K) ? $ : K;
    if (I && (p = La(p) ? p(oe, $) : p, C({
      data: p,
      _c: oe
    })), La(H))
      try {
        H = H(oe);
      } catch (j) {
        k = j, V = !0;
      }
    if (H && Fw(H))
      if (H = await H.catch((j) => {
        k = j, V = !0;
      }), D !== N[x][0]) {
        if (V) throw k;
        return H;
      } else V && I && m(k) && (c = !0, C({
        data: oe,
        _c: mn
      }));
    if (c && !V)
      if (La(c)) {
        const j = c(H, oe);
        C({
          data: j,
          error: mn,
          _c: mn
        });
      } else
        C({
          data: H,
          error: mn,
          _c: mn
        });
    if (N[x][1] = Jh(), Promise.resolve(O()).then(() => {
      C({
        _c: mn
      });
    }), V) {
      if (y) throw k;
      return;
    }
    return H;
  }
}
const Vb = (e, a) => {
  for (const r in e)
    e[r][0] && e[r][0](a);
}, Sz = (e, a) => {
  if (!ui.has(e)) {
    const r = Ki(yz, a), l = /* @__PURE__ */ Object.create(null), s = Pw.bind(mn, e);
    let u = fi;
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
      if (!ui.has(e) && (ui.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !El)) {
        const y = r.initFocus(setTimeout.bind(mn, Vb.bind(mn, l, Yw))), g = r.initReconnect(setTimeout.bind(mn, Vb.bind(mn, l, Gw)));
        u = () => {
          y && y(), g && g(), ui.delete(e);
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
    ui.get(e)[4]
  ];
}, _z = (e, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, d, s);
}, Ez = Gh, [Qw, Nz] = Sz(/* @__PURE__ */ new Map()), Cz = Ki(
  {
    // events
    onLoadingSlow: fi,
    onSuccess: fi,
    onError: fi,
    onErrorRetry: _z,
    onDiscarded: fi,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Ub ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Ub ? 5e3 : 3e3,
    // providers
    compare: Ez,
    isPaused: () => !1,
    cache: Qw,
    mutate: Nz,
    fallback: {}
  },
  // use web preset by default
  gz
), Rz = (e, a) => {
  const r = Ki(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Ki(s, c));
  }
  return r;
}, Tz = _.createContext({}), Mz = "$inf$", Kw = cs && window.__SWR_DEVTOOLS_USE__, Dz = Kw ? window.__SWR_DEVTOOLS_USE__ : [], Az = () => {
  Kw && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, zz = (e) => La(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], Oz = () => {
  const e = _.useContext(Tz);
  return _.useMemo(() => Ki(Cz, e), [
    e
  ]);
}, jz = (e) => (a, r, l) => e(a, r && ((...u) => {
  const [c] = Im(a), [, , , d] = ui.get(Qw);
  if (c.startsWith(Mz))
    return r(...u);
  const p = d[c];
  return nt(p) ? r(...u) : (delete d[c], p);
}), l), Lz = Dz.concat(jz), Hz = (e) => function(...r) {
  const l = Oz(), [s, u, c] = zz(r), d = Rz(l, c);
  let p = e;
  const { use: m } = d, y = (m || []).concat(Lz);
  for (let g = y.length; g--; )
    p = y[g](p);
  return p(s, u || d.fetcher || null, d);
}, kz = (e, a, r) => {
  const l = a[e] || (a[e] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
Az();
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
}, qb = Promise.resolve(mn), Bz = () => fi, Uz = (e, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: g, keepPreviousData: v, strictServerPrefetchWarning: x } = r, [S, C, R, N] = ui.get(l), [z, E] = Im(e), O = _.useRef(!1), H = _.useRef(!1), k = _.useRef(z), V = _.useRef(a), D = _.useRef(r), I = () => D.current, ne = () => I().isVisible() && I().isOnline(), [$, K, oe, j] = Zw(l, z), Y = _.useRef({}).current, T = nt(c) ? nt(r.fallback) ? mn : r.fallback[z] : c, L = (Me, Xe) => {
    for (const ke in Y) {
      const Ie = ke;
      if (Ie === "data") {
        if (!s(Me[Ie], Xe[Ie]) && (!nt(Me[Ie]) || !s(ae, Xe[Ie])))
          return !1;
      } else if (Xe[Ie] !== Me[Ie])
        return !1;
    }
    return !0;
  }, F = !O.current, G = _.useMemo(() => {
    const Me = $(), Xe = j(), ke = (Ze) => {
      const Pe = Ki(Ze);
      return delete Pe._k, (() => {
        if (!z || !a || I().isPaused()) return !1;
        if (F && !nt(d)) return d;
        const yt = nt(T) ? Pe.data : T;
        return nt(yt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Pe
      } : Pe;
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
  ]), te = Lb.useSyncExternalStore(_.useCallback(
    (Me) => oe(z, (Xe, ke) => {
      L(ke, Xe) || Me();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      z
    ]
  ), G[0], G[1]), A = S[z] && S[z].length > 0, U = te.data, Q = nt(U) ? T && Fw(T) ? vh(T) : T : U, ee = te.error, ce = _.useRef(Q), ae = v ? nt(U) ? nt(ce.current) ? Q : ce.current : U : Q, se = z && nt(Q), P = _.useRef(null);
  !El && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Lb.useSyncExternalStore(Bz, () => (P.current = !1, P), () => (P.current = !0, P));
  const me = P.current;
  x && me && !u && se && console.warn(`Missing pre-initiated data for serialized key "${z}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const Se = !z || !a || I().isPaused() || A && !nt(ee) ? !1 : F && !nt(d) ? d : u ? nt(Q) ? !1 : p : nt(Q) || p, Te = F && Se, _e = nt(te.isValidating) ? Te : te.isValidating, xe = nt(te.isLoading) ? Te : te.isLoading, Re = _.useCallback(
    async (Me) => {
      const Xe = V.current;
      if (!z || !Xe || H.current || I().isPaused())
        return !1;
      let ke, Ie, St = !0;
      const Je = Me || {}, Ze = !R[z] || !Je.dedupe, Pe = () => Bb ? !H.current && z === k.current && O.current : z === k.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(gt);
      }, Yt = () => {
        const mt = R[z];
        mt && mt[1] === Ie && delete R[z];
      }, Lt = {
        isValidating: !0
      };
      nt($().data) && (Lt.isLoading = !0);
      try {
        if (Ze && (K(Lt), r.loadingTimeout && nt($().data) && setTimeout(() => {
          St && Pe() && I().onLoadingSlow(z, r);
        }, r.loadingTimeout), R[z] = [
          Xe(E),
          Jh()
        ]), [ke, Ie] = R[z], ke = await ke, Ze && setTimeout(Yt, r.dedupingInterval), !R[z] || R[z][1] !== Ie)
          return Ze && Pe() && I().onDiscarded(z), !1;
        gt.error = mn;
        const mt = C[z];
        if (!nt(mt) && // case 1
        (Ie <= mt[0] || // case 2
        Ie <= mt[1] || // case 3
        mt[1] === 0))
          return yt(), Ze && Pe() && I().onDiscarded(z), !1;
        const ot = $().data;
        gt.data = s(ot, ke) ? ot : ke, Ze && Pe() && I().onSuccess(ke, z, r);
      } catch (mt) {
        Yt();
        const ot = I(), { shouldRetryOnError: Xn } = ot;
        ot.isPaused() || (gt.error = mt, Ze && Pe() && (ot.onError(mt, z, ot), (Xn === !0 || La(Xn) && Xn(mt)) && (!I().revalidateOnFocus || !I().revalidateOnReconnect || ne()) && ot.onErrorRetry(mt, z, ot, (xn) => {
          const nn = S[z];
          nn && nn[0] && nn[0](Hb, xn);
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
    (...Me) => Pw(l, k.current, ...Me),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ph(() => {
    V.current = a, D.current = r, nt(U) || (ce.current = U);
  }), ph(() => {
    if (!z) return;
    const Me = Re.bind(mn, bh);
    let Xe = 0;
    I().revalidateOnFocus && (Xe = Date.now() + I().focusThrottleInterval);
    const Ie = kz(z, S, (St, Je = {}) => {
      if (St == Yw) {
        const Ze = Date.now();
        I().revalidateOnFocus && Ze > Xe && ne() && (Xe = Ze + I().focusThrottleInterval, Me());
      } else if (St == Gw)
        I().revalidateOnReconnect && ne() && Me();
      else {
        if (St == Xw)
          return Re();
        if (St == Hb)
          return Re(Je);
      }
    });
    return H.current = !1, k.current = z, O.current = !0, K({
      _k: E
    }), Se && (R[z] || (nt(Q) || El ? Me() : vz(Me))), () => {
      H.current = !0, Ie();
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
      !$().error && (y || I().isVisible()) && (g || I().isOnline()) ? Re(bh).then(Xe) : Xe();
    }
    return Xe(), () => {
      Me && (clearTimeout(Me), Me = -1);
    };
  }, [
    m,
    y,
    g,
    z
  ]), _.useDebugValue(ae), u) {
    if (!Bb && El && se)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    se && (V.current = a, D.current = r, H.current = !1);
    const Me = N[z], Xe = !nt(Me) && se ? $e(Me) : qb;
    if (vh(Xe), !nt(ee) && se)
      throw ee;
    const ke = se ? Re(bh) : qb;
    !nt(ae) && se && (ke.status = "fulfilled", ke.value = !0), vh(ke);
  }
  return {
    mutate: $e,
    get data() {
      return Y.data = !0, ae;
    },
    get error() {
      return Y.error = !0, ee;
    },
    get isValidating() {
      return Y.isValidating = !0, _e;
    },
    get isLoading() {
      return Y.isLoading = !0, xe;
    }
  };
}, Wo = Hz(Uz);
var Vz = "_1xasopc0", qz = "_1xasopc1", $z = "_1xasopc2", Iz = "_1xasopc3", Yz = "_1xasopc4", Gz = "_1xasopc5", Xz = "_1xasopc6", Fz = "_1xasopc7", Zz = "_1xasopc8";
function Pz(e, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function Qz(e, a, r) {
  for (const l of e) {
    if (a && !Pz(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function $b({
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
  const y = _.useRef(null), g = _.useId(), v = _.useId(), [x, S] = _.useState(!1), [C, R] = _.useState(null), [N, z] = _.useState([]), E = _.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), oe = r ? K : K.slice(0, 1), j = Qz(oe, e, a);
      if (j) {
        R(j);
        return;
      }
      R(null), z(oe), m(oe);
    },
    [e, a, r, m]
  ), O = _.useCallback(() => {
    l || y.current?.click();
  }, [l]), H = _.useCallback(
    ($) => {
      l || ($.key === "Enter" || $.key === " ") && ($.preventDefault(), O());
    },
    [l, O]
  ), k = _.useCallback(
    ($) => {
      $.preventDefault(), S(!1), !l && E($.dataTransfer.files);
    },
    [l, E]
  ), V = _.useCallback(
    ($) => {
      $.preventDefault(), l || S(!0);
    },
    [l]
  ), D = _.useCallback(($) => {
    $.preventDefault(), S(!1);
  }, []), I = [u ? v : null, C ? g : null].filter(Boolean).join(" "), ne = [
    Vz,
    x ? qz : "",
    l ? $z : "",
    C !== null ? Iz : "",
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
        className: ne,
        onClick: O,
        onKeyDown: H,
        onDrop: k,
        onDragOver: V,
        onDragLeave: D,
        children: [
          /* @__PURE__ */ b.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: Yz,
              accept: e,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => E($.target.files)
            }
          ),
          /* @__PURE__ */ b.jsx("span", { className: Gz, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ b.jsx("span", { id: v, className: Xz, children: u }),
          p && N.length > 0 && /* @__PURE__ */ b.jsx("div", { className: Zz, children: p(N) })
        ]
      }
    ),
    C && /* @__PURE__ */ b.jsx("div", { id: g, role: "alert", className: Fz, children: C })
  ] });
}
function Ib(e) {
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
async function Kz(e) {
  const a = new FormData();
  a.append("file", e);
  const r = await fetch(`${xc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new bc(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function Yb(e) {
  const [a, r] = _.useState(null), [l, s] = _.useState(!1), [u, c] = _.useState(null), d = _.useCallback(
    async (p) => {
      if (r(p), c(null), !p) {
        e(null, null);
        return;
      }
      s(!0);
      try {
        const { path: m } = await Kz(p);
        e(p.name, m);
      } catch (m) {
        const y = m instanceof bc ? m.message : "Upload failed. Try again.";
        c(y), e(null, null), _r.error(y);
      } finally {
        s(!1);
      }
    },
    [e]
  );
  return { file: a, uploading: l, uploadError: u, pick: d };
}
var Jz = "cyswg40", Gb = "cyswg41", Xb = "cyswg42", Fb = "cyswg43", Zb = "cyswg44", Pb = "cyswg45", ku = "cyswg46";
const Qb = 32 * 1024 * 1024;
function Wz({
  refImageRequired: e,
  lastImageRequired: a,
  refError: r,
  lastError: l
}) {
  const { setRefImage: s, setLastImage: u } = Wt(), c = _.useCallback(
    (v, x) => s(v, x ?? ""),
    [s]
  ), d = _.useCallback(
    (v, x) => u(v, x),
    [u]
  ), p = Yb(c), m = Yb(d), y = Ib(p.file), g = Ib(m.file);
  return /* @__PURE__ */ b.jsxs("div", { className: Jz, children: [
    /* @__PURE__ */ b.jsxs("div", { className: Gb, children: [
      /* @__PURE__ */ b.jsxs("span", { className: Xb, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ b.jsx(An, { tone: "accent", children: "required" }) : /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ b.jsx(
        $b,
        {
          accept: "image/*",
          maxSizeBytes: Qb,
          ariaLabel: "reference image upload",
          label: p.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (v) => void p.pick(v[0] ?? null),
          renderPreview: () => y ? /* @__PURE__ */ b.jsx("img", { className: Fb, src: y, alt: "reference preview" }) : null
        }
      ),
      p.uploading && /* @__PURE__ */ b.jsx("span", { className: Pb, children: "Uploading…" }),
      !p.uploading && p.file && /* @__PURE__ */ b.jsx("span", { className: Zb, children: p.file.name }),
      p.uploadError && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ku, children: p.uploadError }),
      r && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ku, children: r })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Gb, children: [
      /* @__PURE__ */ b.jsxs("span", { className: Xb, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ b.jsx(An, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ b.jsx(
        $b,
        {
          accept: "image/*",
          maxSizeBytes: Qb,
          ariaLabel: "last image upload",
          label: m.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (v) => void m.pick(v[0] ?? null),
          renderPreview: () => g ? /* @__PURE__ */ b.jsx("img", { className: Fb, src: g, alt: "last preview" }) : null
        }
      ),
      m.uploading && /* @__PURE__ */ b.jsx("span", { className: Pb, children: "Uploading…" }),
      !m.uploading && m.file && /* @__PURE__ */ b.jsx("span", { className: Zb, children: m.file.name }),
      m.uploadError && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ku, children: m.uploadError }),
      l && /* @__PURE__ */ b.jsx("span", { role: "alert", className: ku, children: l })
    ] })
  ] });
}
const eO = /wan[\s._-]?2[._]2/i, tO = /i2v/i, nO = /high/i, aO = /low/i, iO = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function rO(e) {
  const a = `${e.family_id} ${e.filename}`;
  return iO.has(e.format) && e.install_path !== null && eO.test(a) && tO.test(a);
}
function lO(e) {
  const a = /* @__PURE__ */ new Map();
  for (const l of e) {
    if (!rO(l)) continue;
    const s = a.get(l.family_id) ?? [];
    a.set(l.family_id, [...s, l]);
  }
  const r = [];
  for (const [l, s] of a) {
    const u = s.find((d) => nO.test(d.filename)), c = s.find((d) => aO.test(d.filename) && d !== u);
    !u?.install_path || !c?.install_path || r.push({
      familyId: l,
      label: l.replace(/^huggingface:/, ""),
      ditHighPath: u.install_path,
      ditLowPath: c.install_path
    });
  }
  return r.sort((l, s) => l.label.localeCompare(s.label));
}
const oO = "/api/v1/model-store/installed";
async function sO() {
  const e = await fetch(oO, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var pi = "_1czy96m0", Va = "_1czy96m1", Lc = "_1czy96m2", Ym = "_1czy96m3", Gm = "_1czy96m4", Jw = "_1czy96m5", Ww = "_1czy96m6", eS = "_1czy96m7", tS = "_1czy96m8", Xm = "_1czy96m9", uO = "_1czy96ma", cO = "_1czy96mb", fO = "_1czy96mc", dO = "_1czy96md", hO = "_1czy96me", mO = "_1czy96mf", pO = "_1czy96mg", gO = "_1czy96mh", yO = "_1czy96mi", vO = "_1czy96mk _1czy96mj", bO = "_1czy96ml _1czy96mj", Fm = "_1czy96mm", Zm = "_1czy96mn", Pm = "_1czy96mo", Qi = "_1czy96mp", xO = "_1czy96mq", nS = "_1czy96mr";
const Kb = "__bundled__";
function wO() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Wt(), s = Wo("svi2/installed-models", sO), u = _.useMemo(
    () => lO(s.data?.installed ?? []),
    [s.data]
  ), c = u.find((m) => m.ditHighPath === e.dit_high_path)?.familyId ?? Kb, d = _.useCallback(
    (m) => {
      const y = u.find((v) => v.familyId === m), g = y ? {
        ...a,
        baseModelFamilyId: y.familyId,
        ditHighPath: y.ditHighPath,
        ditLowPath: y.ditLowPath
      } : { ...a, baseModelFamilyId: "", ditHighPath: "", ditLowPath: "" };
      r("dit_high_path", y ? y.ditHighPath : void 0), r("dit_low_path", y ? y.ditLowPath : void 0), l(g), gm(g).catch(() => {
      });
    },
    [u, a, r, l]
  ), p = s.error !== void 0;
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("label", { className: Va, htmlFor: "svi2-base-model", children: "Base model (Wan2.2-I2V)" }),
    /* @__PURE__ */ b.jsxs("div", { className: Fm, children: [
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          id: "svi2-base-model",
          className: Zm,
          value: c,
          onChange: (m) => d(m.target.value),
          children: [
            /* @__PURE__ */ b.jsx("option", { value: Kb, children: GN }),
            u.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.familyId, children: m.label }, m.familyId))
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Pm, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
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
    p && /* @__PURE__ */ b.jsx("span", { className: Qi, children: "Model Foundry list unavailable — using the bundled base model." }),
    !p && u.length === 0 && /* @__PURE__ */ b.jsx("span", { className: Qi, children: "No substitutable Wan2.2-I2V high/low pairs installed via Model Foundry yet." })
  ] });
}
const SO = "/api/v1/model-store/installed";
function _O(e) {
  return e.filter((a) => a.role === "lora" && a.install_path !== null && a.install_path.length > 0).map((a) => ({
    artifactId: a.artifact_id,
    familyId: a.family_id,
    filename: a.filename,
    installPath: a.install_path
  }));
}
async function EO() {
  const e = await fetch(SO, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json(), r = "installed" in a ? a : a.data ?? { installed: [] };
  return _O(r.installed);
}
const Bu = "__none__";
function Jb({
  label: e,
  pickerId: a,
  value: r,
  weight: l,
  options: s,
  onChange: u,
  onWeight: c
}) {
  const d = _.useId(), p = (g) => {
    u(g === Bu ? null : g);
  }, m = r ?? Bu, y = l.toFixed(2);
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("label", { className: Va, htmlFor: a, children: e }),
    /* @__PURE__ */ b.jsxs("div", { className: Fm, children: [
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          id: a,
          className: Zm,
          value: m,
          onChange: (g) => p(g.target.value),
          children: [
            /* @__PURE__ */ b.jsx("option", { value: Bu, children: "None" }),
            s.map((g) => /* @__PURE__ */ b.jsxs("option", { value: g.installPath, children: [
              g.filename,
              g.familyId ? ` (${g.familyId.replace(/^[^:]+:/, "")})` : ""
            ] }, g.artifactId))
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Pm, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
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
    m !== Bu && /* @__PURE__ */ b.jsxs("div", { className: nS, children: [
      /* @__PURE__ */ b.jsx("label", { className: Va, htmlFor: d, children: "weight" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          id: d,
          type: "range",
          min: 0,
          max: 2,
          step: 0.05,
          value: l,
          onChange: (g) => c(parseFloat(g.target.value)),
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Xm, children: y })
    ] })
  ] });
}
function NO() {
  const { params: e, updateParam: a } = Wt(), r = Wo("svi2/installed-loras", EO, {
    shouldRetryOnError: !1
  }), l = r.data ?? [];
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    r.error && /* @__PURE__ */ b.jsx("div", { className: xO, role: "alert", children: "Failed to load installed LoRAs" }),
    /* @__PURE__ */ b.jsx(
      Jb,
      {
        label: "LoRA — high noise",
        pickerId: "svi2-lora-high",
        value: e.user_lora_high_path,
        weight: e.user_lora_high_weight ?? 1,
        options: l,
        onChange: (s) => a("user_lora_high_path", s),
        onWeight: (s) => a("user_lora_high_weight", s)
      }
    ),
    /* @__PURE__ */ b.jsx(
      Jb,
      {
        label: "LoRA — low noise",
        pickerId: "svi2-lora-low",
        value: e.user_lora_low_path,
        weight: e.user_lora_low_weight ?? 1,
        options: l,
        onChange: (s) => a("user_lora_low_path", s),
        onWeight: (s) => a("user_lora_low_weight", s)
      }
    )
  ] });
}
const Hc = "custom", CO = [
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
function Qm(e) {
  const a = new Map(e.map((l) => [l.id, l])), r = [];
  for (const l of CO) {
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
function Km(e, a) {
  const r = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return r ? r.id : Hc;
}
var RO = "_14qe5430", TO = "_14qe5431", MO = "_14qe5432", DO = "_14qe5433", AO = "_14qe5434", zO = "_14qe5435", OO = "_14qe5436", jO = "_14qe5437", LO = "_14qe5438", HO = "_14qe543a _14qe5439", kO = "_14qe543b _14qe5439", BO = "_14qe543c _14qe5439";
const UO = {
  ok: TO,
  neutral: MO,
  warn: DO
}, VO = {
  ok: zO,
  neutral: OO,
  warn: jO
}, qO = {
  ok: HO,
  neutral: kO,
  warn: BO
};
function $O(e, a) {
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
function IO({ tone: e }) {
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
function YO({
  presets: e,
  warningText: a
}) {
  const { params: r } = Wt(), l = _.useMemo(() => Qm(e), [e]);
  if (l.length === 0) return null;
  const s = Km(r, l), u = s === Hc ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = $O(u, a);
  return /* @__PURE__ */ b.jsxs(
    "output",
    {
      className: [RO, UO[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ b.jsx("span", { className: [AO, VO[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ b.jsx(IO, { tone: c.tone }) }),
        /* @__PURE__ */ b.jsx("span", { className: LO, children: c.text }),
        /* @__PURE__ */ b.jsx("span", { className: qO[c.tone], children: c.tag })
      ]
    }
  );
}
var GO = "_5d10lv0";
const Ao = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], XO = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.", FO = /* @__PURE__ */ new Set(["ArrowRight", "ArrowDown"]), ZO = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowUp"]);
function PO(e) {
  return [Gm, e ? Jw : ""].filter(Boolean).join(" ");
}
function QO({ value: e, onChange: a }) {
  const r = _.useId(), l = (s) => {
    const u = FO.has(s.key), c = ZO.has(s.key);
    if (!u && !c) return;
    s.preventDefault();
    const d = Ao.findIndex((y) => y.value === e), m = Ao[(d + (u ? 1 : -1) + Ao.length) % Ao.length];
    m && m.value !== e && a(m.value);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("span", { className: Va, id: r, children: "Mode" }),
    /* @__PURE__ */ b.jsx("div", { className: Lc, children: /* @__PURE__ */ b.jsx(
      "div",
      {
        className: Ym,
        role: "radiogroup",
        "aria-labelledby": r,
        onKeyDown: l,
        children: Ao.map((s) => {
          const u = e === s.value;
          return /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": u,
              tabIndex: u ? 0 : -1,
              className: PO(u),
              onClick: () => a(s.value),
              children: s.label
            },
            s.value
          );
        })
      }
    ) }),
    e === "text_to_video" && /* @__PURE__ */ b.jsx("p", { className: GO, "aria-live": "polite", children: XO })
  ] });
}
var KO = "dck790", JO = "dck791", WO = "dck792";
function hc({ title: e, detail: a, action: r, className: l }) {
  const s = [KO, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: s, children: [
    /* @__PURE__ */ b.jsx("span", { className: JO, children: e }),
    a && /* @__PURE__ */ b.jsx("span", { className: WO, children: a }),
    r
  ] });
}
var ej = "_1880igs0", tj = "_1880igs1", nj = "_1880igs2", aj = "_1880igs3", ij = "_1880igs4", rj = "_1880igs5", lj = "_1880igs6";
const oj = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function sj({ jobs: e, onOpen: a }) {
  return e.length === 0 ? /* @__PURE__ */ b.jsx(
    hc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ b.jsx("div", { className: ej, children: e.map((r) => /* @__PURE__ */ b.jsxs("button", { type: "button", className: tj, onClick: () => a(r), children: [
    /* @__PURE__ */ b.jsxs("span", { className: nj, children: [
      /* @__PURE__ */ b.jsx("span", { className: aj, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ b.jsx("span", { className: ij, children: uj(r) })
    ] }),
    /* @__PURE__ */ b.jsxs("span", { className: rj, children: [
      /* @__PURE__ */ b.jsx("time", { className: lj, dateTime: r.createdAt, title: cj(r.createdAt), children: fj(r.createdAt) }),
      /* @__PURE__ */ b.jsx(An, { tone: oj[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function uj(e) {
  const a = e.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function cj(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function fj(e) {
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
function dj() {
  const { presetId: e, params: a } = Wt();
  return jc(e, a) ? /* @__PURE__ */ b.jsx(mj, {}) : /* @__PURE__ */ b.jsx(hj, {});
}
function aS(e) {
  return [Gm, e ? Jw : ""].filter(Boolean).join(" ");
}
function hj() {
  const { params: e, updateParam: a } = Wt(), r = Ar(e), l = q5(e.num_clips ?? 1, r), [s, u] = _.useState(
    () => Number(qh(e.num_clips ?? 1, r).toFixed(1))
  ), c = (d) => {
    const p = H5(d, r);
    a("num_clips", p.numClips), a("frames_per_clip", p.framesPerClip);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("span", { className: Va, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ b.jsxs("div", { className: Lc, children: [
      /* @__PURE__ */ b.jsx("div", { className: Ym, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: Uw.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: aS(p),
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
      /* @__PURE__ */ b.jsxs("div", { className: Ww, children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: eS,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            },
            onBlur: () => {
              u(Number(qh(e.num_clips ?? 1, Ar(e)).toFixed(1)));
            }
          }
        ),
        /* @__PURE__ */ b.jsx("span", { className: tS, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("output", { className: Xm, "aria-live": "polite", children: $5(e) })
  ] });
}
function mj() {
  const { params: e, updateParam: a } = Wt(), r = Ar(e), l = U5(r.fps), [s, u] = _.useState(() => Number(qw(e).toFixed(1))), c = B5.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", Db(m, r.fps));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("span", { className: Va, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ b.jsxs("div", { className: Lc, children: [
      /* @__PURE__ */ b.jsx("div", { className: Ym, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = Db(p, r.fps) === r.framesPerClip;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: aS(m),
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
      }) : /* @__PURE__ */ b.jsxs("span", { className: Gm, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ b.jsxs("div", { className: Ww, children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: eS,
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
        /* @__PURE__ */ b.jsx("span", { className: tS, children: "sec" })
      ] }),
      /* @__PURE__ */ b.jsxs("span", { className: Qi, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        r.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("output", { className: Xm, "aria-live": "polite", children: V5(e) })
  ] });
}
var pj = "_17owg2e0", gj = "_17owg2e1", yj = "_17owg2e2", Uu = "_17owg2e3", Vu = "_17owg2e4", vj = "_17owg2e5", bj = "_17owg2e6", xj = "_17owg2e7", wj = "_17owg2e8";
function xh() {
  return /* @__PURE__ */ b.jsx("span", { className: vj, "aria-hidden": "true" });
}
function Sj({ presets: e }) {
  const { presetId: a, params: r } = Wt(), l = _.useMemo(() => Qm(e), [e]), s = Ar(r), u = jc(a, r), c = u ? 1 : r.num_clips ?? 1, d = u ? s.framesPerClip : Vw(c, s), p = s.fps > 0 ? d / s.fps : 0, m = r.interpolate_fps ?? 0, y = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, v = typeof r.upscale_factor == "number" ? r.upscale_factor : 0, x = v > 0 ? v : 1, S = (r.width ?? 0) * x, C = (r.height ?? 0) * x, R = Km(r, l), N = R === Hc || (l.find((E) => E.id === R)?.stepsDown ?? 0) >= 2, z = [xj, N ? wj : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: pj, children: [
    /* @__PURE__ */ b.jsx("span", { className: gj, children: "Output" }),
    /* @__PURE__ */ b.jsxs("div", { className: yj, children: [
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: Uu, children: g }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Vu, children: "frames" })
      ] }),
      /* @__PURE__ */ b.jsx(xh, {}),
      /* @__PURE__ */ b.jsxs("span", { className: Uu, children: [
        S,
        "×",
        C
      ] }),
      /* @__PURE__ */ b.jsx(xh, {}),
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: Uu, children: y }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Vu, children: "fps" })
      ] }),
      /* @__PURE__ */ b.jsx(xh, {}),
      /* @__PURE__ */ b.jsxs("span", { children: [
        /* @__PURE__ */ b.jsx("span", { className: Vu, children: "~" }),
        /* @__PURE__ */ b.jsx("span", { className: Uu, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ b.jsx("span", { className: Vu, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("span", { className: bj, children: [
      /* @__PURE__ */ b.jsx("span", { className: z, "aria-hidden": "true" }),
      N ? "off-distribution" : "ready"
    ] })
  ] });
}
var _j = "dgx4n20", Ej = "dgx4n21", Nj = "dgx4n22", Cj = "dgx4n23", Rj = "dgx4n24", Tj = "dgx4n25", Mj = "dgx4n26", Dj = "dgx4n27", Aj = "dgx4n28", zj = "dgx4n29", Oj = "dgx4n2a", jj = "dgx4n2b", Wb = "dgx4n2c", Lj = "dgx4n2d", Hj = "dgx4n2e";
function kj(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function Bj({
  presets: e,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = _.useState(!1), u = _.useMemo(() => P5(e), [e]), c = _.useMemo(() => {
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
      hc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const y = Math.max(
    0,
    c.findIndex((v) => v.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ b.jsxs("div", { className: Oj, children: [
    /* @__PURE__ */ b.jsx("div", { className: _j, role: "radiogroup", "aria-label": "Render presets", children: c.map((v, x) => {
      const S = F5(v), C = v.id === a, R = v.id === Jo, N = [
        Ej,
        v.legacy ? "" : Nj,
        R ? Cj : "",
        C ? Rj : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ b.jsxs(
        "button",
        {
          ref: (z) => {
            d.current[x] = z;
          },
          type: "button",
          role: "radio",
          "aria-checked": C,
          tabIndex: x === y ? 0 : -1,
          title: v.description,
          className: N,
          onClick: () => r(v),
          onKeyDown: (z) => m(z, x),
          children: [
            /* @__PURE__ */ b.jsxs("div", { className: Mj, children: [
              /* @__PURE__ */ b.jsx("span", { className: Dj, children: v.label }),
              R && /* @__PURE__ */ b.jsx(An, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ b.jsx("span", { className: Tj, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
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
            /* @__PURE__ */ b.jsx("span", { className: Aj, children: kj(v.description) }),
            /* @__PURE__ */ b.jsxs("div", { className: zj, children: [
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
    g > 0 && /* @__PURE__ */ b.jsxs("div", { className: jj, children: [
      /* @__PURE__ */ b.jsx("span", { className: Wb, "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: Lj,
          "aria-expanded": l,
          onClick: () => s((v) => !v),
          children: [
            /* @__PURE__ */ b.jsx("span", { className: Hj, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Wb, "aria-hidden": "true" })
    ] })
  ] });
}
var Uj = "_1ntn2zv0", Vj = "_1ntn2zv1", qj = "_1ntn2zv2", $j = "_1ntn2zv3", Ij = "_1ntn2zv4", Yj = "_1ntn2zv5", e1 = "_1ntn2zv6", Gj = "_1ntn2zv7", Xj = "_1ntn2zv8", Fj = "_1ntn2zv9", Zj = "_1ntn2zva";
function Pj({ error: e, textareaId: a }) {
  const { params: r, setPrompts: l } = Wt(), [s, u] = _.useState(!1), c = r.prompts ?? [""], d = _.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), p = _.useMemo(
    () => c.slice(d).filter((v) => v.trim().length > 0).length,
    [c, d]
  ), m = (v) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = v, l(x);
  }, y = (v, x) => {
    const S = Math.max(d, c.length, v + 1), C = Array.from({ length: S }, (R, N) => c[N] ?? "");
    C[v] = x, l(C);
  }, g = (v) => {
    if (u(v), v) {
      const x = c[0] ?? "", S = Math.max(d, c.length);
      l(Array.from({ length: S }, (C, R) => c[R] ?? x));
    }
  };
  return /* @__PURE__ */ b.jsxs("div", { className: Uj, children: [
    /* @__PURE__ */ b.jsx("div", { className: Vj, children: /* @__PURE__ */ b.jsxs("span", { className: qj, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: $j,
          onClick: () => g(!s),
          children: /* @__PURE__ */ b.jsx("span", { className: Ij, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (v, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ b.jsxs("div", { className: Gj, children: [
        /* @__PURE__ */ b.jsxs("span", { className: Xj, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ b.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: e1,
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
        className: e1,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (v) => m(v.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ b.jsxs("output", { className: Yj, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ b.jsx("p", { className: Fj, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ b.jsx("span", { role: "alert", className: Zj, children: e })
  ] });
}
var Qj = "_1itrxk30", Kj = "_1itrxk31", Jj = "_1itrxk32", Wj = "_1itrxk33", e6 = "_1itrxk34", t6 = "_1itrxk35", n6 = "_1itrxk36", a6 = "_1itrxk37";
function i6() {
  const { qwenEdit: e, setQwenEdit: a } = Wt();
  return /* @__PURE__ */ b.jsxs("div", { className: Qj, children: [
    /* @__PURE__ */ b.jsxs("div", { className: Kj, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: n6,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ b.jsx("span", { className: a6, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ b.jsxs("span", { className: Jj, children: [
        /* @__PURE__ */ b.jsx("span", { className: Wj, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ b.jsx("span", { className: e6, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: t6,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var r6 = "ob7g5b0", l6 = "ob7g5b1", o6 = "ob7g5b3", s6 = "ob7g5b4", u6 = "ob7g5b5", c6 = "ob7g5b6", f6 = "ob7g5b7", d6 = "ob7g5b8", h6 = "ob7g5b9", m6 = "ob7g5ba";
function p6({
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
  const [x, S] = _.useState("loading"), [C, R] = _.useState(null), N = _.useCallback(() => {
    S("ready"), g?.();
  }, [g]), z = _.useCallback(
    (O) => {
      const H = O.target, k = H.error?.message || `media error code ${H.error?.code ?? "?"}`;
      S("error"), R(k), v?.(new Error(k));
    },
    [v]
  ), E = [r6, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ b.jsx("div", { className: E, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ b.jsxs("div", { className: f6, children: [
    /* @__PURE__ */ b.jsx("div", { className: d6, children: "Could not play video" }),
    /* @__PURE__ */ b.jsx("div", { className: h6, children: C ?? "unknown error" }),
    /* @__PURE__ */ b.jsx("a", { className: m6, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ b.jsxs("div", { className: E, children: [
    x === "loading" && /* @__PURE__ */ b.jsx("div", { className: o6, "aria-hidden": "true", children: /* @__PURE__ */ b.jsx("div", { className: s6 }) }),
    r && /* @__PURE__ */ b.jsx("span", { className: u6, children: r }),
    /* @__PURE__ */ b.jsx(
      "video",
      {
        className: l6,
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
        onError: z,
        children: /* @__PURE__ */ b.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ b.jsx("div", { className: E, "aria-label": d ?? "no video", children: /* @__PURE__ */ b.jsx("div", { className: c6, children: m ?? "No video to display yet." }) });
}
const si = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, t1 = {
  [si.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [si.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [si.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [si.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [si.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [si.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [si.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [si.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [si.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function g6(e, a) {
  return e !== null && t1[e] ? t1[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function y6(e) {
  return e ? `${xc}/media?path=${encodeURIComponent(e)}` : null;
}
var qu = "_1ojc56g0", v6 = "_1ojc56g1", b6 = "_1ojc56g2", x6 = "_1ojc56g3", w6 = "_1ojc56g4", S6 = "_1ojc56g5", _6 = "_1ojc56g6", E6 = "_1ojc56g7", N6 = "_1ojc56g8", $u = "_1ojc56g9", C6 = "_1ojc56ga", R6 = "_1ojc56gb", T6 = "_1ojc56gc", M6 = "_1ojc56gd", D6 = "_1ojc56ge", A6 = "_1ojc56gf", z6 = "_1ojc56gg", O6 = "_1ojc56gh", j6 = "_51y2ql0", L6 = "_51y2ql1", H6 = "_51y2ql2", k6 = "_51y2ql3", B6 = "_51y2ql4", wh = "_51y2ql5", U6 = "_51y2ql6", V6 = "_51y2ql7 _51y2ql6", q6 = "_51y2ql8 _51y2ql6", $6 = "_51y2ql9", I6 = "_51y2qla", Y6 = "_51y2qlb", G6 = "_51y2qlc", X6 = "_51y2qld", F6 = "_51y2qle";
const vn = 60, aa = 62, bn = 46, Z6 = 180, Vo = 75, Wu = 45, P6 = [0, 0.25, 0.5, 0.75, 1];
function Q6(e) {
  const a = Math.PI * (1 - e), r = Math.cos(a), l = Math.sin(a);
  return {
    x1: vn + r * (bn - 9),
    y1: aa - l * (bn - 9),
    x2: vn + r * (bn - 14),
    y2: aa - l * (bn - 14)
  };
}
function K6(e) {
  const a = Vo - Wu, r = (Vo - e) / a;
  return Math.min(1, Math.max(0.02, r));
}
function J6(e) {
  return e >= 0.55 ? U6 : e >= 0.25 ? V6 : q6;
}
function W6({ secondsPerStep: e }) {
  const a = e !== null && e > 0, r = a ? K6(e) : 0, l = Z6 * r, s = a ? e.toFixed(1) : "—", u = a ? 1 / e : null, c = u === null ? "—" : u >= 1 ? u.toFixed(2) : u.toFixed(3);
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: j6,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": Wu,
      "aria-valuemax": Vo,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ b.jsx("span", { className: L6, children: "Speed" }),
        /* @__PURE__ */ b.jsxs("svg", { className: H6, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ b.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ b.jsx(
            "path",
            {
              className: k6,
              d: `M ${vn - bn} ${aa} A ${bn} ${bn} 0 0 1 ${vn + bn} ${aa}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          P6.map((d) => {
            const p = Q6(d);
            return /* @__PURE__ */ b.jsx(
              "line",
              {
                className: B6,
                strokeWidth: 1.4,
                x1: p.x1,
                y1: p.y1,
                x2: p.x2,
                y2: p.y2
              },
              d
            );
          }),
          /* @__PURE__ */ b.jsx("text", { className: wh, x: vn - bn, y: aa + 12, fontSize: 6, textAnchor: "middle", children: Vo }),
          /* @__PURE__ */ b.jsx("text", { className: wh, x: vn, y: 9, fontSize: 6, textAnchor: "middle", children: (Vo + Wu) / 2 }),
          /* @__PURE__ */ b.jsx("text", { className: wh, x: vn + bn, y: aa + 12, fontSize: 6, textAnchor: "middle", children: Wu }),
          a && /* @__PURE__ */ b.jsx(
            "path",
            {
              className: J6(r),
              d: `M ${vn - bn} ${aa} A ${bn} ${bn} 0 0 1 ${vn + bn} ${aa}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, r * 100)} 100`
            }
          ),
          /* @__PURE__ */ b.jsx(
            "g",
            {
              className: $6,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${vn}px ${aa}px`
              },
              children: /* @__PURE__ */ b.jsx(
                "line",
                {
                  className: I6,
                  strokeWidth: 2.4,
                  x1: vn,
                  y1: aa,
                  x2: vn - bn + 16,
                  y2: aa
                }
              )
            }
          ),
          /* @__PURE__ */ b.jsx("circle", { className: Y6, cx: vn, cy: aa, r: 3.6 }),
          /* @__PURE__ */ b.jsx("text", { className: G6, x: vn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ b.jsx("text", { className: X6, x: vn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] }),
        /* @__PURE__ */ b.jsxs("span", { className: F6, children: [
          c,
          " it/s"
        ] })
      ]
    }
  );
}
function eL({ state: e, onCancel: a, onReset: r }) {
  const [l, s] = _.useState(!1);
  _.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = _.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ b.jsx(
      hc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = g6(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ b.jsxs("div", { className: qu, children: [
      /* @__PURE__ */ b.jsxs("div", { className: A6, role: "alert", children: [
        /* @__PURE__ */ b.jsx("span", { className: z6, children: m.title }),
        /* @__PURE__ */ b.jsx("span", { className: O6, children: m.hint })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: $u, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ b.jsxs("div", { className: qu, children: [
      /* @__PURE__ */ b.jsx(hc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ b.jsx("div", { className: $u, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ b.jsxs("output", { className: qu, children: [
      /* @__PURE__ */ b.jsx(
        p6,
        {
          src: y6(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ b.jsx(iL, { state: e }),
      /* @__PURE__ */ b.jsx("div", { className: $u, children: /* @__PURE__ */ b.jsx(Ha, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ b.jsxs("div", { className: qu, children: [
    /* @__PURE__ */ b.jsx("output", { className: v6, "aria-live": "polite", children: aL(e) }),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        className: E6,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ b.jsx(
          "div",
          {
            className: N6,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ b.jsx("output", { className: D6, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ b.jsxs("div", { className: b6, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx(W6, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ b.jsxs("div", { className: x6, children: [
        /* @__PURE__ */ b.jsx(zo, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ b.jsx(
          zo,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ b.jsx(
          zo,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ b.jsx(zo, { label: "ETA", value: tL(D5(e)) }),
        /* @__PURE__ */ b.jsx(
          zo,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("div", { className: $u, children: /* @__PURE__ */ b.jsx(Ha, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function tL(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), r = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return r > 0 ? `${r}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const nL = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading Wan2.2 diffusion experts (~28 GiB)…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function aL(e) {
  if (!e.stage) return "Starting worker…";
  const a = nL[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function zo({ label: e, value: a }) {
  return /* @__PURE__ */ b.jsxs("div", { className: w6, children: [
    /* @__PURE__ */ b.jsx("span", { className: S6, children: e }),
    /* @__PURE__ */ b.jsx("span", { className: _6, children: a })
  ] });
}
function iL({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && r.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && r.push(["Output", e.outputPath]), r.length === 0 ? null : /* @__PURE__ */ b.jsx("div", { className: C6, children: r.map(([l, s]) => /* @__PURE__ */ b.jsxs("div", { className: R6, children: [
    /* @__PURE__ */ b.jsx("span", { className: T6, children: l }),
    /* @__PURE__ */ b.jsx("span", { className: M6, children: s })
  ] }, l)) });
}
function rL() {
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
function lL({ presets: e }) {
  const { params: a, updateParam: r } = Wt(), l = _.useMemo(() => Qm(e), [e]);
  if (l.length === 0) return null;
  const s = Km(a, l);
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("span", { className: Va, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ b.jsx("div", { className: uO, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: l.map((u) => {
      const c = s === u.id, d = [cO, c ? fO : ""].filter(Boolean).join(" "), p = [mO, c ? pO : ""].filter(Boolean).join(" ");
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
            /* @__PURE__ */ b.jsxs("span", { className: dO, children: [
              /* @__PURE__ */ b.jsxs("span", { className: hO, children: [
                u.width,
                "×",
                u.height
              ] }),
              /* @__PURE__ */ b.jsx("span", { className: p, children: /* @__PURE__ */ b.jsx(rL, {}) })
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: gO, children: u.label }),
            /* @__PURE__ */ b.jsx("span", { className: yO, children: u.sub }),
            u.stepsDown > 0 && /* @__PURE__ */ b.jsx(
              "span",
              {
                className: u.stepsDown >= 2 ? bO : vO,
                children: u.stepsDown >= 2 ? "off-distribution" : "below native"
              }
            )
          ]
        },
        u.id
      );
    }) }),
    s === Hc && /* @__PURE__ */ b.jsx("div", { className: nS, children: /* @__PURE__ */ b.jsxs(An, { tone: "warning", children: [
      "custom ",
      a.width,
      "×",
      a.height
    ] }) })
  ] });
}
var oL = "_1x63kpu0";
const sL = "Random each render";
function uL(e) {
  const a = e.trim();
  if (a.length === 0) return;
  const r = Number(a);
  if (!(!Number.isFinite(r) || r < 0))
    return Math.trunc(r);
}
function cL() {
  const { params: e, updateParam: a } = Wt(), r = _.useId(), l = e.seed, s = (u) => {
    a("seed", uL(u.target.value));
  };
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("span", { className: Va, id: r, children: "Seed" }),
    /* @__PURE__ */ b.jsxs("div", { className: Lc, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          className: oL,
          "aria-labelledby": r,
          min: 0,
          step: 1,
          placeholder: sL,
          value: l ?? "",
          onChange: s
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Qi, children: "Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize." })
    ] })
  ] });
}
var fL = "_1hbttwg0", dL = "_1hbttwg1", hL = "_1hbttwg2", mL = "_1hbttwg3", iS = "_1hbttwg4", pL = "_1hbttwg5", gL = "_1hbttwg7 _1hbttwg6", yL = "_1hbttwg8 _1hbttwg6", n1 = "_1hbttwg9", vL = "_1hbttwga", bL = "_1hbttwgb", xL = "_1hbttwgc", wL = "_1hbttwgd";
function SL({
  spec: e,
  value: a,
  error: r,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = _.useId(), d = `${c}-help`, p = r ? `${c}-error` : d;
  return /* @__PURE__ */ b.jsxs("div", { className: fL, title: s ? u : void 0, children: [
    /* @__PURE__ */ b.jsxs("div", { className: dL, children: [
      /* @__PURE__ */ b.jsx("label", { className: hL, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ b.jsx("span", { className: mL, children: EL(a, e.step) })
    ] }),
    _L(e, a, l, c, p, r !== void 0, s),
    /* @__PURE__ */ b.jsx("span", { id: d, className: iS, children: s && u ? u : e.help }),
    r && /* @__PURE__ */ b.jsx("span", { id: `${c}-error`, role: "alert", className: pL, children: r })
  ] });
}
function _L(e, a, r, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ b.jsxs("div", { className: bL, children: [
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: xL,
            onClick: () => r(!d),
            children: /* @__PURE__ */ b.jsx("span", { className: wL, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ b.jsx("span", { className: iS, children: d ? "On" : "Off" })
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
          className: [yL, u ? n1 : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => r(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ b.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = a1(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ b.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: vL,
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
          className: [gL, u ? n1 : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: a1(a, e),
          onChange: (d) => r(Number(d.target.value))
        }
      );
  }
}
function a1(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function EL(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var NL = "_1f0q5gf0", CL = "_1f0q5gf1", RL = "_1f0q5gf2", TL = "_1f0q5gf3", ML = "_1f0q5gf4", DL = "_1f0q5gf5", AL = "_1f0q5gf6", zL = "_1f0q5gf7", OL = "_1f0q5gf8", jL = "_1f0q5gf9", LL = "_1f0q5gfa", HL = "_1f0q5gfb", kL = "_1f0q5gfc";
function BL({
  title: e,
  description: a,
  badge: r,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = _.useId(), [m, y] = _.useState(u ? s : !1), g = [NL, c].filter(Boolean).join(" "), v = [RL, m ? TL : ""].filter(Boolean).join(" "), x = !u || !m;
  return /* @__PURE__ */ b.jsxs("section", { className: g, children: [
    /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        className: CL,
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
          /* @__PURE__ */ b.jsxs("span", { className: ML, children: [
            /* @__PURE__ */ b.jsx("span", { className: DL, children: e }),
            a && /* @__PURE__ */ b.jsx("span", { className: AL, children: a })
          ] }),
          (l || r) && /* @__PURE__ */ b.jsxs("span", { className: zL, children: [
            l && /* @__PURE__ */ b.jsx("span", { className: OL, children: l }),
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        id: p,
        className: [jL, x ? LL : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ b.jsx("div", { className: HL, children: /* @__PURE__ */ b.jsx("div", { className: kL, children: d }) })
      }
    )
  ] });
}
const UL = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function i1(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function VL(e) {
  return Oc.find((a) => a.key === e)?.default;
}
function hl(e, a) {
  const r = e[a];
  if (typeof r == "number" && Number.isFinite(r)) return r;
  const l = VL(a);
  return typeof l == "number" ? l : 0;
}
function qL(e, a) {
  if (e === "core") {
    const r = hl(a, "fps"), l = hl(a, "interpolate_fps"), s = l > 0 ? l : r, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = UL[u] ?? u, d = hl(a, "upscale_factor"), p = `${r} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const r = hl(a, "num_inference_steps"), l = hl(a, "cfg_scale"), s = hl(a, "sigma_shift");
    return `${r} steps · CFG ${i1(l)} · shift ${i1(s)}`;
  }
  return null;
}
async function $L() {
  return Ji("/capabilities/attention");
}
const r1 = Object.fromEntries(
  pm.map((e) => [e.value, e.label])
);
function IL() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Wt(), s = Wo("svi2/attention-capabilities", $L, {
    shouldRetryOnError: !1
  }), u = e.attention ?? a.attentionBackend ?? "flash2", c = _.useCallback(
    (v) => {
      r("attention", v);
      const x = { ...a, attentionBackend: v };
      l(x), gm(x).catch(() => {
      });
    },
    [a, r, l]
  ), d = s.data, p = d === void 0, m = s.error !== void 0, y = d?.backends.find((v) => v.id === u), g = y !== void 0 && !y.supported;
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("label", { className: Va, htmlFor: "svi2-attention", children: "Attention mechanism" }),
    /* @__PURE__ */ b.jsxs("div", { className: Fm, children: [
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          id: "svi2-attention",
          className: Zm,
          value: u,
          onChange: (v) => c(v.target.value),
          children: [
            /* @__PURE__ */ b.jsx("option", { value: "auto", children: r1.auto }),
            d ? d.backends.map((v) => /* @__PURE__ */ b.jsx(
              "option",
              {
                value: v.id,
                disabled: !v.supported,
                title: v.reason ?? void 0,
                children: r1[v.id] ?? v.id
              },
              v.id
            )) : pm.filter((v) => v.value !== "auto").map((v) => /* @__PURE__ */ b.jsx("option", { value: v.value, children: v.label }, v.value))
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("span", { className: Pm, "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
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
    m && /* @__PURE__ */ b.jsx("span", { className: Qi, children: "GPU capabilities unavailable — all options shown." }),
    g && /* @__PURE__ */ b.jsxs("span", { className: Qi, children: [
      y.reason ?? "This backend is not supported on the current GPU",
      " — will fall back to flash2 at render time."
    ] }),
    !p && u === "sage3_fp4" && !g && /* @__PURE__ */ b.jsx("span", { className: Qi, children: "FP4 — may show artifacts on some GPUs." })
  ] });
}
function YL() {
  const { params: e, updateParam: a } = Wt(), r = (e.blocks_to_swap ?? 0) > 0, l = !r && (e.use_torch_compile ?? !1);
  return /* @__PURE__ */ b.jsxs("div", { className: pi, children: [
    /* @__PURE__ */ b.jsx("label", { className: Va, htmlFor: "svi2-torch-compile", children: "torch.compile (experimental)" }),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        id: "svi2-torch-compile",
        type: "checkbox",
        checked: l,
        disabled: r,
        onChange: (s) => a("use_torch_compile", s.target.checked)
      }
    ),
    r && /* @__PURE__ */ b.jsx("span", { className: Qi, children: "Set Blocks to swap = 0 to enable." })
  ] });
}
var GL = "kn07ek0", XL = "kn07ek1";
const FL = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function ZL({ issues: e }) {
  const { presetId: a, params: r, updateParam: l } = Wt(), s = jc(a, r), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ b.jsx("div", { className: GL, children: Bw.map((c) => {
    const d = z5(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ b.jsx(
      BL,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: qL(c.id, r),
        badge: c.defaultCollapsed ? /* @__PURE__ */ b.jsx(An, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ b.jsxs("div", { className: XL, children: [
          c.id === "perf" && /* @__PURE__ */ b.jsx(IL, {}),
          c.id === "perf" && /* @__PURE__ */ b.jsx(YL, {}),
          d.map((p) => {
            const m = s ? FL[p.key] : void 0;
            return /* @__PURE__ */ b.jsx(
              SL,
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
          })
        ] })
      },
      c.id
    );
  }) });
}
var PL = "_1w9jfpf0", QL = "_1w9jfpf1", KL = "_1w9jfpf2", JL = "_1w9jfpf3", WL = "_1w9jfpf4", e8 = "_1w9jfpf5";
const Wh = "svi2-anchor-panel", rS = "svi2-prompt-input";
function t8() {
  const {
    presetId: e,
    presetApplied: a,
    params: r,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d
  } = Wt(), { issues: p, blocked: m, busy: y, submit: g, cancel: v, focusRequest: x } = Iw();
  a8(x);
  const S = Wo("svi2/presets", Q1), C = Wo("svi2/history", () => Q5(25)), R = S.data?.presets ?? [];
  _.useEffect(() => {
    if (a || R.length === 0) return;
    const ne = R.find(($) => $.id === e) ?? R[0];
    ne && s(ne);
  }, [a, R, e, s]);
  const N = C.data?.jobs ?? [], z = r.mode ?? "image_to_video", E = z !== "text_to_video", O = qm(e, r), H = p.find((ne) => ne.field === "ref_image_path")?.message, k = p.find((ne) => ne.field === "last_image_path")?.message, V = p.find((ne) => ne.field === "prompts")?.message, D = p.find(
    (ne) => ne.field === "width" && ne.severity === "warning"
  )?.message, I = _.useCallback(
    (ne) => {
      d(ne);
    },
    [d]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: PL, children: [
    /* @__PURE__ */ b.jsxs("div", { className: QL, children: [
      /* @__PURE__ */ b.jsx(
        Oa,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ b.jsx(Bj, { presets: R, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: [
            /* @__PURE__ */ b.jsx(QO, { value: z, onChange: u }),
            z === "text_to_video" && /* @__PURE__ */ b.jsx(cL, {})
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("div", { id: Wh, children: /* @__PURE__ */ b.jsx(
        Oa,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ b.jsx(
            Wz,
            {
              refImageRequired: E,
              lastImageRequired: O,
              refError: H,
              lastError: k
            }
          )
        }
      ) }),
      /* @__PURE__ */ b.jsx(Oa, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ b.jsx(Pj, { error: V, textareaId: rS }) }),
      /* @__PURE__ */ b.jsx(Oa, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ b.jsx(i6, {}) }),
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            /* @__PURE__ */ b.jsx("span", { className: WL, children: "Inference · Parameters" }),
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
                const ne = R.find(($) => $.id === e);
                ne && s(ne);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ b.jsx(YO, { presets: R, warningText: D }),
            /* @__PURE__ */ b.jsxs("div", { className: e8, children: [
              /* @__PURE__ */ b.jsx(dj, {}),
              /* @__PURE__ */ b.jsx(lL, { presets: R }),
              /* @__PURE__ */ b.jsx(wO, {}),
              /* @__PURE__ */ b.jsx(NO, {})
            ] }),
            /* @__PURE__ */ b.jsx(ZL, { issues: p }),
            /* @__PURE__ */ b.jsx(Sj, { presets: R })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: KL, children: [
      /* @__PURE__ */ b.jsxs(
        Oa,
        {
          title: "Render",
          description: y ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ b.jsx(eL, { state: l, onCancel: v, onReset: c }),
            !y && /* @__PURE__ */ b.jsx("div", { className: JL, children: /* @__PURE__ */ b.jsx(
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
      /* @__PURE__ */ b.jsx(Oa, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ b.jsx(sj, { jobs: N, onOpen: I }) })
    ] })
  ] });
}
const n8 = {
  ref_image_path: Wh,
  last_image_path: Wh,
  prompts: rS
};
function a8(e) {
  _.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = n8[e.field];
    if (a) {
      const l = document.getElementById(a);
      l1(l);
      return;
    }
    i8(e.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      l1(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [e]);
}
function i8(e) {
  const a = Oc.find((s) => s.key === e);
  if (!a) return;
  const r = Bw.find((s) => s.id === a.tier);
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
function l1(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var r8 = "_1smvon90", gr = "_1smvon91", yr = "_1smvon92", vr = "_1smvon93", Iu = "_1smvon94", Sh = "_1smvon95 _1smvon94", l8 = "_1smvon96", o8 = "_1smvon97";
const s8 = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function u8() {
  const { settings: e, setSettings: a } = Wt(), [r, l] = _.useState(e), [s, u] = _.useState(!1), c = _.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== e[m]
    ),
    [r, e]
  ), d = (m, y) => {
    l((g) => ({ ...g, [m]: y }));
  }, p = async () => {
    u(!0);
    try {
      const m = await gm(r);
      a(m), l(m), _r.success("Settings saved. Applied to new renders.");
    } catch {
      _r.error("Could not save settings.");
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
        /* @__PURE__ */ b.jsxs("div", { className: r8, children: [
          /* @__PURE__ */ b.jsxs("label", { className: gr, children: [
            /* @__PURE__ */ b.jsx("span", { className: yr, children: "Models directory" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Iu,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => d("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: vr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: gr, children: [
            /* @__PURE__ */ b.jsx("span", { className: yr, children: "Output directory" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Iu,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => d("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: vr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: gr, children: [
            /* @__PURE__ */ b.jsx("span", { className: yr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ b.jsx(
              "select",
              {
                className: Sh,
                value: r.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: pm.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: vr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: gr, children: [
            /* @__PURE__ */ b.jsx("span", { className: yr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ b.jsx(
              "select",
              {
                className: Sh,
                value: r.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: YN.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: vr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: gr, children: [
            /* @__PURE__ */ b.jsx("span", { className: yr, children: "Blocks to swap" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Iu,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (m) => d("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: vr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: gr, children: [
            /* @__PURE__ */ b.jsx("span", { className: yr, children: "Interpolation method" }),
            /* @__PURE__ */ b.jsx(
              "select",
              {
                className: Sh,
                value: r.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: s8.map((m) => /* @__PURE__ */ b.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: vr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: gr, children: [
            /* @__PURE__ */ b.jsx("span", { className: yr, children: "Interpolate target fps" }),
            /* @__PURE__ */ b.jsx(
              "input",
              {
                className: Iu,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (m) => d("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ b.jsx("span", { className: vr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ b.jsxs("div", { className: l8, children: [
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
          c && /* @__PURE__ */ b.jsx("output", { className: o8, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var c8 = "_1ugwva20", f8 = "_1ugwva21", d8 = "_1ugwva22", h8 = "_1ugwva23", m8 = "_1ugwva24", p8 = "_1ugwva25";
function g8() {
  const e = K2(), a = y8(e.catalog?.presets ?? []);
  return /* @__PURE__ */ b.jsxs(i3, { initialSettings: e.settings, initialPreset: a, children: [
    /* @__PURE__ */ b.jsxs("div", { className: c8, children: [
      /* @__PURE__ */ b.jsx("header", { className: f8, children: /* @__PURE__ */ b.jsxs("div", { className: d8, children: [
        /* @__PURE__ */ b.jsx("h1", { className: h8, children: "SVI 2.0 Pro" }),
        /* @__PURE__ */ b.jsx("p", { className: m8, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
      ] }) }),
      /* @__PURE__ */ b.jsx("main", { className: p8, children: /* @__PURE__ */ b.jsx(cN, {}) })
    ] }),
    /* @__PURE__ */ b.jsx(A3, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function y8(e) {
  return e.find((a) => a.id === Jo) ?? e[0] ?? null;
}
async function v8() {
  const [e, a] = await Promise.all([
    Q1().catch(() => null),
    FN().catch(() => P1)
  ]);
  return { catalog: e, settings: a };
}
function b8() {
  return [
    {
      path: "/",
      loader: () => Zy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: v8,
      Component: g8,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => Zy(`/${x8(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: t8 },
        { path: "dag", Component: uz },
        { path: "settings", Component: u8 }
      ]
    }
  ];
}
function x8(e, a) {
  const r = e[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const o1 = "ext-actions-request", w8 = "ext-actions-declare", S8 = "ext-action-state", s1 = "ext-action-invoke", u1 = "svi2-pro:navigate", c1 = "svi2-pro.render";
function _8(e, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: c1,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(w8, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(S8, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === c1 && z3();
  }, y = L3((g) => {
    r = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(o1, p), e.addEventListener(s1, m), c(), {
    dispose: () => {
      y(), e.removeEventListener(o1, p), e.removeEventListener(s1, m);
    }
  };
}
const em = "svi2-pro-app", E8 = "ext-event", f1 = "svi2-pro-stylesheet", d1 = ["accent", "density", "card"];
function N8(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function C8() {
  if (typeof document > "u" || document.getElementById(f1)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = f1, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
C8();
class R8 extends HTMLElement {
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
    this.root = wE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(u1, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = _8(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(u1, a);
  }
  syncTweaksFromBody() {
    for (const a of d1) {
      const r = N8(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: d1.map((a) => `data-${a}`)
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
    const r = rN(b8(), { initialEntries: [a] });
    this.router = r, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ b.jsx(_.StrictMode, { children: /* @__PURE__ */ b.jsx(oN, { router: r }) })
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
      new CustomEvent(E8, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function T8() {
  typeof customElements > "u" || customElements.get(em) || customElements.define(em, R8);
}
typeof customElements < "u" && !customElements.get(em) && T8();
export {
  T8 as register
};
//# sourceMappingURL=svi2-pro.js.map
