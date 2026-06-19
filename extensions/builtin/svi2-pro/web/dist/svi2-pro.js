function ZE(e, a) {
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
function gm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Kd = { exports: {} }, Ro = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zv;
function PE() {
  if (Zv) return Ro;
  Zv = 1;
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
  return Ro.Fragment = a, Ro.jsx = r, Ro.jsxs = r, Ro;
}
var Pv;
function QE() {
  return Pv || (Pv = 1, Kd.exports = PE()), Kd.exports;
}
var y = QE(), Wd = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qv;
function KE() {
  if (Qv) return Ve;
  Qv = 1;
  var e = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), b = Symbol.iterator;
  function x(D) {
    return D === null || typeof D != "object" ? null : (D = b && D[b] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var _ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, C = Object.assign, E = {};
  function R(D, U, Q) {
    this.props = D, this.context = U, this.refs = E, this.updater = Q || _;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(D, U) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, U, "setState");
  }, R.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function j() {
  }
  j.prototype = R.prototype;
  function N(D, U, Q) {
    this.props = D, this.context = U, this.refs = E, this.updater = Q || _;
  }
  var z = N.prototype = new j();
  z.constructor = N, C(z, R.prototype), z.isPureReactComponent = !0;
  var H = Array.isArray;
  function k() {
  }
  var V = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function I(D, U, Q) {
    var te = Q.ref;
    return {
      $$typeof: e,
      type: D,
      key: U,
      ref: te !== void 0 ? te : null,
      props: Q
    };
  }
  function J(D, U) {
    return I(D.type, U, D.props);
  }
  function $(D) {
    return typeof D == "object" && D !== null && D.$$typeof === e;
  }
  function K(D) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(Q) {
      return U[Q];
    });
  }
  var oe = /\/+/g;
  function O(D, U) {
    return typeof D == "object" && D !== null && D.key != null ? K("" + D.key) : U.toString(36);
  }
  function Y(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(k, k) : (D.status = "pending", D.then(
          function(U) {
            D.status === "pending" && (D.status = "fulfilled", D.value = U);
          },
          function(U) {
            D.status === "pending" && (D.status = "rejected", D.reason = U);
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
  function T(D, U, Q, te, ue) {
    var pe = typeof D;
    (pe === "undefined" || pe === "boolean") && (D = null);
    var ae = !1;
    if (D === null) ae = !0;
    else
      switch (pe) {
        case "bigint":
        case "string":
        case "number":
          ae = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case e:
            case a:
              ae = !0;
              break;
            case v:
              return ae = D._init, T(
                ae(D._payload),
                U,
                Q,
                te,
                ue
              );
          }
      }
    if (ae)
      return ue = ue(D), ae = te === "" ? "." + O(D, 0) : te, H(ue) ? (Q = "", ae != null && (Q = ae.replace(oe, "$&/") + "/"), T(ue, U, Q, "", function(Ee) {
        return Ee;
      })) : ue != null && ($(ue) && (ue = J(
        ue,
        Q + (ue.key == null || D && D.key === ue.key ? "" : ("" + ue.key).replace(
          oe,
          "$&/"
        ) + "/") + ae
      )), U.push(ue)), 1;
    ae = 0;
    var G = te === "" ? "." : te + ":";
    if (H(D))
      for (var ce = 0; ce < D.length; ce++)
        te = D[ce], pe = G + O(te, ce), ae += T(
          te,
          U,
          Q,
          pe,
          ue
        );
    else if (ce = x(D), typeof ce == "function")
      for (D = ce.call(D), ce = 0; !(te = D.next()).done; )
        te = te.value, pe = G + O(te, ce++), ae += T(
          te,
          U,
          Q,
          pe,
          ue
        );
    else if (pe === "object") {
      if (typeof D.then == "function")
        return T(
          Y(D),
          U,
          Q,
          te,
          ue
        );
      throw U = String(D), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ae;
  }
  function L(D, U, Q) {
    if (D == null) return D;
    var te = [], ue = 0;
    return T(D, te, "", "", function(pe) {
      return U.call(Q, pe, ue++);
    }), te;
  }
  function Z(D) {
    if (D._status === -1) {
      var U = D._result;
      U = U(), U.then(
        function(Q) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = Q);
        },
        function(Q) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = Q);
        }
      ), D._status === -1 && (D._status = 0, D._result = U);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var X = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, ne = {
    map: L,
    forEach: function(D, U, Q) {
      L(
        D,
        function() {
          U.apply(this, arguments);
        },
        Q
      );
    },
    count: function(D) {
      var U = 0;
      return L(D, function() {
        U++;
      }), U;
    },
    toArray: function(D) {
      return L(D, function(U) {
        return U;
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
  return Ve.Activity = g, Ve.Children = ne, Ve.Component = R, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = N, Ve.StrictMode = l, Ve.Suspense = p, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
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
  }, Ve.cloneElement = function(D, U, Q) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var te = C({}, D.props), ue = D.key;
    if (U != null)
      for (pe in U.key !== void 0 && (ue = "" + U.key), U)
        !A.call(U, pe) || pe === "key" || pe === "__self" || pe === "__source" || pe === "ref" && U.ref === void 0 || (te[pe] = U[pe]);
    var pe = arguments.length - 2;
    if (pe === 1) te.children = Q;
    else if (1 < pe) {
      for (var ae = Array(pe), G = 0; G < pe; G++)
        ae[G] = arguments[G + 2];
      te.children = ae;
    }
    return I(D.type, ue, te);
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
  }, Ve.createElement = function(D, U, Q) {
    var te, ue = {}, pe = null;
    if (U != null)
      for (te in U.key !== void 0 && (pe = "" + U.key), U)
        A.call(U, te) && te !== "key" && te !== "__self" && te !== "__source" && (ue[te] = U[te]);
    var ae = arguments.length - 2;
    if (ae === 1) ue.children = Q;
    else if (1 < ae) {
      for (var G = Array(ae), ce = 0; ce < ae; ce++)
        G[ce] = arguments[ce + 2];
      ue.children = G;
    }
    if (D && D.defaultProps)
      for (te in ae = D.defaultProps, ae)
        ue[te] === void 0 && (ue[te] = ae[te]);
    return I(D, pe, ue);
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(D) {
    return { $$typeof: d, render: D };
  }, Ve.isValidElement = $, Ve.lazy = function(D) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: D },
      _init: Z
    };
  }, Ve.memo = function(D, U) {
    return {
      $$typeof: m,
      type: D,
      compare: U === void 0 ? null : U
    };
  }, Ve.startTransition = function(D) {
    var U = V.T, Q = {};
    V.T = Q;
    try {
      var te = D(), ue = V.S;
      ue !== null && ue(Q, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(k, X);
    } catch (pe) {
      X(pe);
    } finally {
      U !== null && Q.types !== null && (U.types = Q.types), V.T = U;
    }
  }, Ve.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ve.use = function(D) {
    return V.H.use(D);
  }, Ve.useActionState = function(D, U, Q) {
    return V.H.useActionState(D, U, Q);
  }, Ve.useCallback = function(D, U) {
    return V.H.useCallback(D, U);
  }, Ve.useContext = function(D) {
    return V.H.useContext(D);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(D, U) {
    return V.H.useDeferredValue(D, U);
  }, Ve.useEffect = function(D, U) {
    return V.H.useEffect(D, U);
  }, Ve.useEffectEvent = function(D) {
    return V.H.useEffectEvent(D);
  }, Ve.useId = function() {
    return V.H.useId();
  }, Ve.useImperativeHandle = function(D, U, Q) {
    return V.H.useImperativeHandle(D, U, Q);
  }, Ve.useInsertionEffect = function(D, U) {
    return V.H.useInsertionEffect(D, U);
  }, Ve.useLayoutEffect = function(D, U) {
    return V.H.useLayoutEffect(D, U);
  }, Ve.useMemo = function(D, U) {
    return V.H.useMemo(D, U);
  }, Ve.useOptimistic = function(D, U) {
    return V.H.useOptimistic(D, U);
  }, Ve.useReducer = function(D, U, Q) {
    return V.H.useReducer(D, U, Q);
  }, Ve.useRef = function(D) {
    return V.H.useRef(D);
  }, Ve.useState = function(D) {
    return V.H.useState(D);
  }, Ve.useSyncExternalStore = function(D, U, Q) {
    return V.H.useSyncExternalStore(
      D,
      U,
      Q
    );
  }, Ve.useTransition = function() {
    return V.H.useTransition();
  }, Ve.version = "19.2.7", Ve;
}
var Kv;
function rs() {
  return Kv || (Kv = 1, Wd.exports = KE()), Wd.exports;
}
var S = rs();
const ve = /* @__PURE__ */ gm(S), WE = /* @__PURE__ */ ZE({
  __proto__: null,
  default: ve
}, [S]);
var Jd = { exports: {} }, To = {}, eh = { exports: {} }, th = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wv;
function JE() {
  return Wv || (Wv = 1, (function(e) {
    function a(T, L) {
      var Z = T.length;
      T.push(L);
      e: for (; 0 < Z; ) {
        var X = Z - 1 >>> 1, ne = T[X];
        if (0 < s(ne, L))
          T[X] = L, T[Z] = ne, Z = X;
        else break e;
      }
    }
    function r(T) {
      return T.length === 0 ? null : T[0];
    }
    function l(T) {
      if (T.length === 0) return null;
      var L = T[0], Z = T.pop();
      if (Z !== L) {
        T[0] = Z;
        e: for (var X = 0, ne = T.length, D = ne >>> 1; X < D; ) {
          var U = 2 * (X + 1) - 1, Q = T[U], te = U + 1, ue = T[te];
          if (0 > s(Q, Z))
            te < ne && 0 > s(ue, Q) ? (T[X] = ue, T[te] = Z, X = te) : (T[X] = Q, T[U] = Z, X = U);
          else if (te < ne && 0 > s(ue, Z))
            T[X] = ue, T[te] = Z, X = te;
          else break e;
        }
      }
      return L;
    }
    function s(T, L) {
      var Z = T.sortIndex - L.sortIndex;
      return Z !== 0 ? Z : T.id - L.id;
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
    var p = [], m = [], v = 1, g = null, b = 3, x = !1, _ = !1, C = !1, E = !1, R = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, N = typeof setImmediate < "u" ? setImmediate : null;
    function z(T) {
      for (var L = r(m); L !== null; ) {
        if (L.callback === null) l(m);
        else if (L.startTime <= T)
          l(m), L.sortIndex = L.expirationTime, a(p, L);
        else break;
        L = r(m);
      }
    }
    function H(T) {
      if (C = !1, z(T), !_)
        if (r(p) !== null)
          _ = !0, k || (k = !0, K());
        else {
          var L = r(m);
          L !== null && Y(H, L.startTime - T);
        }
    }
    var k = !1, V = -1, A = 5, I = -1;
    function J() {
      return E ? !0 : !(e.unstable_now() - I < A);
    }
    function $() {
      if (E = !1, k) {
        var T = e.unstable_now();
        I = T;
        var L = !0;
        try {
          e: {
            _ = !1, C && (C = !1, j(V), V = -1), x = !0;
            var Z = b;
            try {
              t: {
                for (z(T), g = r(p); g !== null && !(g.expirationTime > T && J()); ) {
                  var X = g.callback;
                  if (typeof X == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var ne = X(
                      g.expirationTime <= T
                    );
                    if (T = e.unstable_now(), typeof ne == "function") {
                      g.callback = ne, z(T), L = !0;
                      break t;
                    }
                    g === r(p) && l(p), z(T);
                  } else l(p);
                  g = r(p);
                }
                if (g !== null) L = !0;
                else {
                  var D = r(m);
                  D !== null && Y(
                    H,
                    D.startTime - T
                  ), L = !1;
                }
              }
              break e;
            } finally {
              g = null, b = Z, x = !1;
            }
            L = void 0;
          }
        } finally {
          L ? K() : k = !1;
        }
      }
    }
    var K;
    if (typeof N == "function")
      K = function() {
        N($);
      };
    else if (typeof MessageChannel < "u") {
      var oe = new MessageChannel(), O = oe.port2;
      oe.port1.onmessage = $, K = function() {
        O.postMessage(null);
      };
    } else
      K = function() {
        R($, 0);
      };
    function Y(T, L) {
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
      return b;
    }, e.unstable_next = function(T) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = b;
      }
      var Z = b;
      b = L;
      try {
        return T();
      } finally {
        b = Z;
      }
    }, e.unstable_requestPaint = function() {
      E = !0;
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
      var Z = b;
      b = T;
      try {
        return L();
      } finally {
        b = Z;
      }
    }, e.unstable_scheduleCallback = function(T, L, Z) {
      var X = e.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? X + Z : X) : Z = X, T) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return ne = Z + ne, T = {
        id: v++,
        callback: L,
        priorityLevel: T,
        startTime: Z,
        expirationTime: ne,
        sortIndex: -1
      }, Z > X ? (T.sortIndex = Z, a(m, T), r(p) === null && T === r(m) && (C ? (j(V), V = -1) : C = !0, Y(H, Z - X))) : (T.sortIndex = ne, a(p, T), _ || x || (_ = !0, k || (k = !0, K()))), T;
    }, e.unstable_shouldYield = J, e.unstable_wrapCallback = function(T) {
      var L = b;
      return function() {
        var Z = b;
        b = L;
        try {
          return T.apply(this, arguments);
        } finally {
          b = Z;
        }
      };
    };
  })(th)), th;
}
var Jv;
function e2() {
  return Jv || (Jv = 1, eh.exports = JE()), eh.exports;
}
var nh = { exports: {} }, dn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ey;
function t2() {
  if (ey) return dn;
  ey = 1;
  var e = rs();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        m += "&args[]=" + encodeURIComponent(arguments[v]);
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
  function u(p, m, v) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: g == null ? null : "" + g,
      children: p,
      containerInfo: m,
      implementation: v
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(p, m) {
    if (p === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return dn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, dn.createPortal = function(p, m) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(p, m, null, v);
  }, dn.flushSync = function(p) {
    var m = c.T, v = l.p;
    try {
      if (c.T = null, l.p = 2, p) return p();
    } finally {
      c.T = m, l.p = v, l.d.f();
    }
  }, dn.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(p, m));
  }, dn.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, dn.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var v = m.as, g = d(v, m.crossOrigin), b = typeof m.integrity == "string" ? m.integrity : void 0, x = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      v === "style" ? l.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: g,
          integrity: b,
          fetchPriority: x
        }
      ) : v === "script" && l.d.X(p, {
        crossOrigin: g,
        integrity: b,
        fetchPriority: x,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, dn.preinitModule = function(p, m) {
    if (typeof p == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var v = d(
            m.as,
            m.crossOrigin
          );
          l.d.M(p, {
            crossOrigin: v,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && l.d.M(p);
  }, dn.preload = function(p, m) {
    if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var v = m.as, g = d(v, m.crossOrigin);
      l.d.L(p, v, {
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
        var v = d(m.as, m.crossOrigin);
        l.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: v,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(p);
  }, dn.requestFormReset = function(p) {
    l.d.r(p);
  }, dn.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, dn.useFormState = function(p, m, v) {
    return c.H.useFormState(p, m, v);
  }, dn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, dn.version = "19.2.7", dn;
}
var ty;
function U1() {
  if (ty) return nh.exports;
  ty = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), nh.exports = t2(), nh.exports;
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
var ny;
function n2() {
  if (ny) return To;
  ny = 1;
  var e = e2(), a = rs(), r = U1();
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
  function v(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (n = v(t), n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var g = Object.assign, b = Symbol.for("react.element"), x = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), N = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), J = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var oe = Symbol.for("react.client.reference");
  function O(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === oe ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case R:
        return "Profiler";
      case E:
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
        case _:
          return "Portal";
        case N:
          return t.displayName || "Context";
        case j:
          return (t._context.displayName || "Context") + ".Consumer";
        case z:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case V:
          return n = t.displayName || null, n !== null ? n : O(t.type) || "Memo";
        case A:
          n = t._payload, t = t._init;
          try {
            return O(t(n));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, T = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, X = [], ne = -1;
  function D(t) {
    return { current: t };
  }
  function U(t) {
    0 > ne || (t.current = X[ne], X[ne] = null, ne--);
  }
  function Q(t, n) {
    ne++, X[ne] = t.current, t.current = n;
  }
  var te = D(null), ue = D(null), pe = D(null), ae = D(null);
  function G(t, n) {
    switch (Q(pe, n), Q(ue, t), Q(te, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? vv(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = vv(n), t = yv(n, t);
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
    U(te), Q(te, t);
  }
  function ce() {
    U(te), U(ue), U(pe);
  }
  function Ee(t) {
    t.memoizedState !== null && Q(ae, t);
    var n = te.current, i = yv(n, t.type);
    n !== i && (Q(ue, t), Q(te, i));
  }
  function we(t) {
    ue.current === t && (U(te), U(ue)), ae.current === t && (U(ae), So._currentValue = Z);
  }
  var Se, xe;
  function Te(t) {
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
                } catch (se) {
                  var le = se;
                }
                Reflect.construct(t, [], he);
              } else {
                try {
                  he.call();
                } catch (se) {
                  le = se;
                }
                t.call(he.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (se) {
                le = se;
              }
              (he = t()) && typeof he.catch == "function" && he.catch(function() {
              });
            }
          } catch (se) {
            if (se && le && typeof se.stack == "string")
              return [se.stack, le.stack];
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
    return (i = t ? t.displayName || t.name : "") ? Te(i) : "";
  }
  function Me(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Te(t.type);
      case 16:
        return Te("Lazy");
      case 13:
        return t.child !== n && n !== null ? Te("Suspense Fallback") : Te("Suspense");
      case 19:
        return Te("SuspenseList");
      case 0:
      case 15:
        return ft(t.type, !1);
      case 11:
        return ft(t.type.render, !1);
      case 1:
        return ft(t.type, !0);
      case 31:
        return Te("Activity");
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
  var He = Object.prototype.hasOwnProperty, Ie = e.unstable_scheduleCallback, _t = e.unstable_cancelCallback, We = e.unstable_shouldYield, Ze = e.unstable_requestPaint, Pe = e.unstable_now, gt = e.unstable_getCurrentPriorityLevel, vt = e.unstable_ImmediatePriority, Yt = e.unstable_UserBlockingPriority, Lt = e.unstable_NormalPriority, mt = e.unstable_LowPriority, ot = e.unstable_IdlePriority, Pn = e.log, _n = e.unstable_setDisableYieldValue, nn = null, Kt = null;
  function zt(t) {
    if (typeof Pn == "function" && _n(t), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(nn, t);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : Sn, vi = Math.log, Ta = Math.LN2;
  function Sn(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (vi(t) / Ta | 0) | 0;
  }
  var da = 256, Ln = 262144, Qn = 4194304;
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
  function ke(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0, h = t.suspendedLanes, w = t.pingedLanes;
    t = t.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~h, o !== 0 ? f = cn(o) : (w &= M, w !== 0 ? f = cn(w) : i || (i = M & ~t, i !== 0 && (f = cn(i))))) : (M = o & ~h, M !== 0 ? f = cn(M) : w !== 0 ? f = cn(w) : i || (i = o & ~t, i !== 0 && (f = cn(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, i = n & -n, h >= i || h === 32 && (i & 4194048) !== 0) ? n : f;
  }
  function yt(t, n) {
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
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function pt(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Wt(t, n, i, o, f, h) {
    var w = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var M = t.entanglements, q = t.expirationTimes, re = t.hiddenUpdates;
    for (i = w & ~i; 0 < i; ) {
      var fe = 31 - Ut(i), he = 1 << fe;
      M[fe] = 0, q[fe] = -1;
      var le = re[fe];
      if (le !== null)
        for (re[fe] = null, fe = 0; fe < le.length; fe++) {
          var se = le[fe];
          se !== null && (se.lane &= -536870913);
        }
      i &= ~he;
    }
    o !== 0 && ha(t, o, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(w & ~n));
  }
  function ha(t, n, i) {
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
    return i = (i & 42) !== 0 ? 1 : P(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function P(t) {
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
  function ee(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function me() {
    var t = L.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : qv(t.type));
  }
  function ge(t, n) {
    var i = L.p;
    try {
      return L.p = t, n();
    } finally {
      L.p = i;
    }
  }
  var Ne = Math.random().toString(36).slice(2), ye = "__reactFiber$" + Ne, _e = "__reactProps$" + Ne, be = "__reactContainer$" + Ne, Ae = "__reactEvents$" + Ne, De = "__reactListeners$" + Ne, Ue = "__reactHandles$" + Ne, Oe = "__reactResources$" + Ne, Ge = "__reactMarker$" + Ne;
  function rt(t) {
    delete t[ye], delete t[_e], delete t[Ae], delete t[De], delete t[Ue];
  }
  function Ct(t) {
    var n = t[ye];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[be] || i[ye]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = Nv(t); t !== null; ) {
            if (i = t[ye]) return i;
            t = Nv(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function st(t) {
    if (t = t[ye] || t[be]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function Je(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(l(33));
  }
  function Ot(t) {
    var n = t[Oe];
    return n || (n = t[Oe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(t) {
    t[Ge] = !0;
  }
  var Ma = /* @__PURE__ */ new Set(), kn = {};
  function fn(t, n) {
    an(t, n), an(t + "Capture", n);
  }
  function an(t, n) {
    for (kn[t] = n, t = 0; t < n.length; t++)
      Ma.add(n[t]);
  }
  var En = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), yi = {}, Nn = {};
  function bi(t) {
    return He.call(Nn, t) ? !0 : He.call(yi, t) ? !1 : En.test(t) ? Nn[t] = !0 : (yi[t] = !0, !1);
  }
  function ma(t, n, i) {
    if (bi(n))
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
  function pa(t, n, i) {
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
  function vn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Hn(t, n, i) {
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
  function xi(t) {
    if (!t._valueTracker) {
      var n = vn(t) ? "checked" : "value";
      t._valueTracker = Hn(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Ga(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = vn(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function dt(t) {
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
  function tr(t, n, i, o, f, h, w, M) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + bt(n)) : t.value !== "" + bt(n) && (t.value = "" + bt(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? Hl(t, w, bt(n)) : i != null ? Hl(t, w, bt(i)) : o != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + bt(M) : t.removeAttribute("name");
  }
  function kr(t, n, i, o, f, h, w, M) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || i != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        xi(t);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, M || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = M ? t.checked : !!o, t.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), xi(t);
  }
  function Hl(t, n, i) {
    n === "number" && dt(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function wi(t, n, i, o) {
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
  function Bl(t, n, i) {
    if (n != null && (n = "" + bt(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + bt(i) : "";
  }
  function hp(t, n, i, o) {
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
    i = bt(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), xi(t);
  }
  function Hr(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var I_ = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function mp(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || I_.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function pp(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && mp(t, f, o);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && mp(t, h, n[h]);
  }
  function Xc(t) {
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
  var Y_ = /* @__PURE__ */ new Map([
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
  ]), G_ = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function vs(t) {
    return G_.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Xa() {
  }
  var Fc = null;
  function Zc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Br = null, Ur = null;
  function gp(t) {
    var n = st(t);
    if (n && (t = n.stateNode)) {
      var i = t[_e] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (tr(
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
                var f = o[_e] || null;
                if (!f) throw Error(l(90));
                tr(
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
              o = i[n], o.form === t.form && Ga(o);
          }
          break e;
        case "textarea":
          Bl(t, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && wi(t, !!i.multiple, n, !1);
      }
    }
  }
  var Pc = !1;
  function vp(t, n, i) {
    if (Pc) return t(n, i);
    Pc = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (Pc = !1, (Br !== null || Ur !== null) && (iu(), Br && (n = Br, t = Ur, Ur = Br = null, gp(n), t)))
        for (n = 0; n < t.length; n++) gp(t[n]);
    }
  }
  function Ul(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[_e] || null;
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
  var Fa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Qc = !1;
  if (Fa)
    try {
      var Vl = {};
      Object.defineProperty(Vl, "passive", {
        get: function() {
          Qc = !0;
        }
      }), window.addEventListener("test", Vl, Vl), window.removeEventListener("test", Vl, Vl);
    } catch {
      Qc = !1;
    }
  var _i = null, Kc = null, ys = null;
  function yp() {
    if (ys) return ys;
    var t, n = Kc, i = n.length, o, f = "value" in _i ? _i.value : _i.textContent, h = f.length;
    for (t = 0; t < i && n[t] === f[t]; t++) ;
    var w = i - t;
    for (o = 1; o <= w && n[i - o] === f[h - o]; o++) ;
    return ys = f.slice(t, 1 < o ? 1 - o : void 0);
  }
  function bs(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function xs() {
    return !0;
  }
  function bp() {
    return !1;
  }
  function Cn(t) {
    function n(i, o, f, h, w) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var M in t)
        t.hasOwnProperty(M) && (i = t[M], this[M] = i ? i(h) : h[M]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? xs : bp, this.isPropagationStopped = bp, this;
    }
    return g(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = xs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = xs);
      },
      persist: function() {
      },
      isPersistent: xs
    }), n;
  }
  var nr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ws = Cn(nr), ql = g({}, nr, { view: 0, detail: 0 }), X_ = Cn(ql), Wc, Jc, $l, _s = g({}, ql, {
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
    getModifierState: tf,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== $l && ($l && t.type === "mousemove" ? (Wc = t.screenX - $l.screenX, Jc = t.screenY - $l.screenY) : Jc = Wc = 0, $l = t), Wc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Jc;
    }
  }), xp = Cn(_s), F_ = g({}, _s, { dataTransfer: 0 }), Z_ = Cn(F_), P_ = g({}, ql, { relatedTarget: 0 }), ef = Cn(P_), Q_ = g({}, nr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), K_ = Cn(Q_), W_ = g({}, nr, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), J_ = Cn(W_), eS = g({}, nr, { data: 0 }), wp = Cn(eS), tS = {
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
  }, nS = {
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
  }, aS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function iS(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = aS[t]) ? !!n[t] : !1;
  }
  function tf() {
    return iS;
  }
  var rS = g({}, ql, {
    key: function(t) {
      if (t.key) {
        var n = tS[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = bs(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? nS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: tf,
    charCode: function(t) {
      return t.type === "keypress" ? bs(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? bs(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), lS = Cn(rS), oS = g({}, _s, {
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
  }), _p = Cn(oS), sS = g({}, ql, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: tf
  }), uS = Cn(sS), cS = g({}, nr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fS = Cn(cS), dS = g({}, _s, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), hS = Cn(dS), mS = g({}, nr, {
    newState: 0,
    oldState: 0
  }), pS = Cn(mS), gS = [9, 13, 27, 32], nf = Fa && "CompositionEvent" in window, Il = null;
  Fa && "documentMode" in document && (Il = document.documentMode);
  var vS = Fa && "TextEvent" in window && !Il, Sp = Fa && (!nf || Il && 8 < Il && 11 >= Il), Ep = " ", Np = !1;
  function Cp(t, n) {
    switch (t) {
      case "keyup":
        return gS.indexOf(n.keyCode) !== -1;
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
  function Rp(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Vr = !1;
  function yS(t, n) {
    switch (t) {
      case "compositionend":
        return Rp(n);
      case "keypress":
        return n.which !== 32 ? null : (Np = !0, Ep);
      case "textInput":
        return t = n.data, t === Ep && Np ? null : t;
      default:
        return null;
    }
  }
  function bS(t, n) {
    if (Vr)
      return t === "compositionend" || !nf && Cp(t, n) ? (t = yp(), ys = Kc = _i = null, Vr = !1, t) : null;
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
        return Sp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var xS = {
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
  function Tp(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!xS[t.type] : n === "textarea";
  }
  function Mp(t, n, i, o) {
    Br ? Ur ? Ur.push(o) : Ur = [o] : Br = o, n = fu(n, "onChange"), 0 < n.length && (i = new ws(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var Yl = null, Gl = null;
  function wS(t) {
    fv(t, 0);
  }
  function Ss(t) {
    var n = Je(t);
    if (Ga(n)) return t;
  }
  function Ap(t, n) {
    if (t === "change") return n;
  }
  var Dp = !1;
  if (Fa) {
    var af;
    if (Fa) {
      var rf = "oninput" in document;
      if (!rf) {
        var jp = document.createElement("div");
        jp.setAttribute("oninput", "return;"), rf = typeof jp.oninput == "function";
      }
      af = rf;
    } else af = !1;
    Dp = af && (!document.documentMode || 9 < document.documentMode);
  }
  function zp() {
    Yl && (Yl.detachEvent("onpropertychange", Op), Gl = Yl = null);
  }
  function Op(t) {
    if (t.propertyName === "value" && Ss(Gl)) {
      var n = [];
      Mp(
        n,
        Gl,
        t,
        Zc(t)
      ), vp(wS, n);
    }
  }
  function _S(t, n, i) {
    t === "focusin" ? (zp(), Yl = n, Gl = i, Yl.attachEvent("onpropertychange", Op)) : t === "focusout" && zp();
  }
  function SS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Ss(Gl);
  }
  function ES(t, n) {
    if (t === "click") return Ss(n);
  }
  function NS(t, n) {
    if (t === "input" || t === "change")
      return Ss(n);
  }
  function CS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Bn = typeof Object.is == "function" ? Object.is : CS;
  function Xl(t, n) {
    if (Bn(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!He.call(n, f) || !Bn(t[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Lp(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function kp(t, n) {
    var i = Lp(t);
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
      i = Lp(i);
    }
  }
  function Hp(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Hp(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Bp(t) {
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
  function lf(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var RS = Fa && "documentMode" in document && 11 >= document.documentMode, qr = null, of = null, Fl = null, sf = !1;
  function Up(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    sf || qr == null || qr !== dt(o) || (o = qr, "selectionStart" in o && lf(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Fl && Xl(Fl, o) || (Fl = o, o = fu(of, "onSelect"), 0 < o.length && (n = new ws(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = qr)));
  }
  function ar(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var $r = {
    animationend: ar("Animation", "AnimationEnd"),
    animationiteration: ar("Animation", "AnimationIteration"),
    animationstart: ar("Animation", "AnimationStart"),
    transitionrun: ar("Transition", "TransitionRun"),
    transitionstart: ar("Transition", "TransitionStart"),
    transitioncancel: ar("Transition", "TransitionCancel"),
    transitionend: ar("Transition", "TransitionEnd")
  }, uf = {}, Vp = {};
  Fa && (Vp = document.createElement("div").style, "AnimationEvent" in window || (delete $r.animationend.animation, delete $r.animationiteration.animation, delete $r.animationstart.animation), "TransitionEvent" in window || delete $r.transitionend.transition);
  function ir(t) {
    if (uf[t]) return uf[t];
    if (!$r[t]) return t;
    var n = $r[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Vp)
        return uf[t] = n[i];
    return t;
  }
  var qp = ir("animationend"), $p = ir("animationiteration"), Ip = ir("animationstart"), TS = ir("transitionrun"), MS = ir("transitionstart"), AS = ir("transitioncancel"), Yp = ir("transitionend"), Gp = /* @__PURE__ */ new Map(), cf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  cf.push("scrollEnd");
  function ga(t, n) {
    Gp.set(t, n), fn(n, [t]);
  }
  var Es = typeof reportError == "function" ? reportError : function(t) {
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
  }, Wn = [], Ir = 0, ff = 0;
  function Ns() {
    for (var t = Ir, n = ff = Ir = 0; n < t; ) {
      var i = Wn[n];
      Wn[n++] = null;
      var o = Wn[n];
      Wn[n++] = null;
      var f = Wn[n];
      Wn[n++] = null;
      var h = Wn[n];
      if (Wn[n++] = null, o !== null && f !== null) {
        var w = o.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), o.pending = f;
      }
      h !== 0 && Xp(i, f, h);
    }
  }
  function Cs(t, n, i, o) {
    Wn[Ir++] = t, Wn[Ir++] = n, Wn[Ir++] = i, Wn[Ir++] = o, ff |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function df(t, n, i, o) {
    return Cs(t, n, i, o), Rs(t);
  }
  function rr(t, n) {
    return Cs(t, null, null, n), Rs(t);
  }
  function Xp(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, h = t.return; h !== null; )
      h.childLanes |= i, o = h.alternate, o !== null && (o.childLanes |= i), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = !0)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Ut(i), t = h.hiddenUpdates, o = t[f], o === null ? t[f] = [n] : o.push(n), n.lane = i | 536870912), h) : null;
  }
  function Rs(t) {
    if (50 < go)
      throw go = 0, wd = null, Error(l(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Yr = {};
  function DS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Un(t, n, i, o) {
    return new DS(t, n, i, o);
  }
  function hf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Za(t, n) {
    var i = t.alternate;
    return i === null ? (i = Un(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Fp(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Ts(t, n, i, o, f, h) {
    var w = 0;
    if (o = t, typeof t == "function") hf(t) && (w = 1);
    else if (typeof t == "string")
      w = kE(
        t,
        i,
        te.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case I:
          return t = Un(31, i, n, f), t.elementType = I, t.lanes = h, t;
        case C:
          return lr(i.children, f, h, n);
        case E:
          w = 8, f |= 24;
          break;
        case R:
          return t = Un(12, i, n, f | 2), t.elementType = R, t.lanes = h, t;
        case H:
          return t = Un(13, i, n, f), t.elementType = H, t.lanes = h, t;
        case k:
          return t = Un(19, i, n, f), t.elementType = k, t.lanes = h, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case N:
                w = 10;
                break e;
              case j:
                w = 9;
                break e;
              case z:
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
    return n = Un(w, i, n, f), n.elementType = t, n.type = o, n.lanes = h, n;
  }
  function lr(t, n, i, o) {
    return t = Un(7, t, o, n), t.lanes = i, t;
  }
  function mf(t, n, i) {
    return t = Un(6, t, null, n), t.lanes = i, t;
  }
  function Zp(t) {
    var n = Un(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function pf(t, n, i) {
    return n = Un(
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
  var Pp = /* @__PURE__ */ new WeakMap();
  function Jn(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Pp.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Xe(n)
      }, Pp.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Xe(n)
    };
  }
  var Gr = [], Xr = 0, Ms = null, Zl = 0, ea = [], ta = 0, Si = null, Aa = 1, Da = "";
  function Pa(t, n) {
    Gr[Xr++] = Zl, Gr[Xr++] = Ms, Ms = t, Zl = n;
  }
  function Qp(t, n, i) {
    ea[ta++] = Aa, ea[ta++] = Da, ea[ta++] = Si, Si = t;
    var o = Aa;
    t = Da;
    var f = 32 - Ut(o) - 1;
    o &= ~(1 << f), i += 1;
    var h = 32 - Ut(n) + f;
    if (30 < h) {
      var w = f - f % 5;
      h = (o & (1 << w) - 1).toString(32), o >>= w, f -= w, Aa = 1 << 32 - Ut(n) + f | i << f | o, Da = h + t;
    } else
      Aa = 1 << h | i << f | o, Da = t;
  }
  function gf(t) {
    t.return !== null && (Pa(t, 1), Qp(t, 1, 0));
  }
  function vf(t) {
    for (; t === Ms; )
      Ms = Gr[--Xr], Gr[Xr] = null, Zl = Gr[--Xr], Gr[Xr] = null;
    for (; t === Si; )
      Si = ea[--ta], ea[ta] = null, Da = ea[--ta], ea[ta] = null, Aa = ea[--ta], ea[ta] = null;
  }
  function Kp(t, n) {
    ea[ta++] = Aa, ea[ta++] = Da, ea[ta++] = Si, Aa = n.id, Da = n.overflow, Si = t;
  }
  var ln = null, Tt = null, it = !1, Ei = null, na = !1, yf = Error(l(519));
  function Ni(t) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Pl(Jn(n, t)), yf;
  }
  function Wp(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ye] = t, n[_e] = o, i) {
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
        for (i = 0; i < yo.length; i++)
          Ke(yo[i], n);
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
        Ke("invalid", n), kr(
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
        Ke("invalid", n), hp(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || pv(n.textContent, i) ? (o.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), o.onScroll != null && Ke("scroll", n), o.onScrollEnd != null && Ke("scrollend", n), o.onClick != null && (n.onclick = Xa), n = !0) : n = !1, n || Ni(t, !0);
  }
  function Jp(t) {
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
  function Fr(t) {
    if (t !== ln) return !1;
    if (!it) return Jp(t), it = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || kd(t.type, t.memoizedProps)), i = !i), i && Tt && Ni(t), Jp(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Ev(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(317));
      Tt = Ev(t);
    } else
      n === 27 ? (n = Tt, Ui(t.type) ? (t = qd, qd = null, Tt = t) : Tt = n) : Tt = ln ? ia(t.stateNode.nextSibling) : null;
    return !0;
  }
  function or() {
    Tt = ln = null, it = !1;
  }
  function bf() {
    var t = Ei;
    return t !== null && (An === null ? An = t : An.push.apply(
      An,
      t
    ), Ei = null), t;
  }
  function Pl(t) {
    Ei === null ? Ei = [t] : Ei.push(t);
  }
  var xf = D(null), sr = null, Qa = null;
  function Ci(t, n, i) {
    Q(xf, n._currentValue), n._currentValue = i;
  }
  function Ka(t) {
    t._currentValue = xf.current, U(xf);
  }
  function wf(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function _f(t, n, i, o) {
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
              h.lanes |= i, M = h.alternate, M !== null && (M.lanes |= i), wf(
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
        w.lanes |= i, h = w.alternate, h !== null && (h.lanes |= i), wf(w, i, t), w = null;
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
  function Zr(t, n, i, o) {
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
          Bn(f.pendingProps.value, w.value) || (t !== null ? t.push(M) : t = [M]);
        }
      } else if (f === ae.current) {
        if (w = f.alternate, w === null) throw Error(l(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(So) : t = [So]);
      }
      f = f.return;
    }
    t !== null && _f(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function As(t) {
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
  function ur(t) {
    sr = t, Qa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function on(t) {
    return eg(sr, t);
  }
  function Ds(t, n) {
    return sr === null && ur(t), eg(t, n);
  }
  function eg(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Qa === null) {
      if (t === null) throw Error(l(308));
      Qa = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Qa = Qa.next = n;
    return i;
  }
  var jS = typeof AbortController < "u" ? AbortController : function() {
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
  }, zS = e.unstable_scheduleCallback, OS = e.unstable_NormalPriority, Gt = {
    $$typeof: N,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Sf() {
    return {
      controller: new jS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ql(t) {
    t.refCount--, t.refCount === 0 && zS(OS, function() {
      t.controller.abort();
    });
  }
  var Kl = null, Ef = 0, Pr = 0, Qr = null;
  function LS(t, n) {
    if (Kl === null) {
      var i = Kl = [];
      Ef = 0, Pr = Rd(), Qr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Ef++, n.then(tg, tg), n;
  }
  function tg() {
    if (--Ef === 0 && Kl !== null) {
      Qr !== null && (Qr.status = "fulfilled");
      var t = Kl;
      Kl = null, Pr = 0, Qr = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function kS(t, n) {
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
  var ng = T.S;
  T.S = function(t, n) {
    U0 = Pe(), typeof n == "object" && n !== null && typeof n.then == "function" && LS(t, n), ng !== null && ng(t, n);
  };
  var cr = D(null);
  function Nf() {
    var t = cr.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function js(t, n) {
    n === null ? Q(cr, cr.current) : Q(cr, n.pool);
  }
  function ag() {
    var t = Nf();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var Kr = Error(l(460)), Cf = Error(l(474)), zs = Error(l(542)), Os = { then: function() {
  } };
  function ig(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function rg(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Xa, Xa), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, og(t), t;
      default:
        if (typeof n.status == "string") n.then(Xa, Xa);
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
            throw t = n.reason, og(t), t;
        }
        throw dr = n, Kr;
    }
  }
  function fr(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (dr = i, Kr) : i;
    }
  }
  var dr = null;
  function lg() {
    if (dr === null) throw Error(l(459));
    var t = dr;
    return dr = null, t;
  }
  function og(t) {
    if (t === Kr || t === zs)
      throw Error(l(483));
  }
  var Wr = null, Wl = 0;
  function Ls(t) {
    var n = Wl;
    return Wl += 1, Wr === null && (Wr = []), rg(Wr, t, n);
  }
  function Jl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function ks(t, n) {
    throw n.$$typeof === b ? Error(l(525)) : (t = Object.prototype.toString.call(n), Error(
      l(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function sg(t) {
    function n(W, F) {
      if (t) {
        var ie = W.deletions;
        ie === null ? (W.deletions = [F], W.flags |= 16) : ie.push(F);
      }
    }
    function i(W, F) {
      if (!t) return null;
      for (; F !== null; )
        n(W, F), F = F.sibling;
      return null;
    }
    function o(W) {
      for (var F = /* @__PURE__ */ new Map(); W !== null; )
        W.key !== null ? F.set(W.key, W) : F.set(W.index, W), W = W.sibling;
      return F;
    }
    function f(W, F) {
      return W = Za(W, F), W.index = 0, W.sibling = null, W;
    }
    function h(W, F, ie) {
      return W.index = ie, t ? (ie = W.alternate, ie !== null ? (ie = ie.index, ie < F ? (W.flags |= 67108866, F) : ie) : (W.flags |= 67108866, F)) : (W.flags |= 1048576, F);
    }
    function w(W) {
      return t && W.alternate === null && (W.flags |= 67108866), W;
    }
    function M(W, F, ie, de) {
      return F === null || F.tag !== 6 ? (F = mf(ie, W.mode, de), F.return = W, F) : (F = f(F, ie), F.return = W, F);
    }
    function q(W, F, ie, de) {
      var ze = ie.type;
      return ze === C ? fe(
        W,
        F,
        ie.props.children,
        de,
        ie.key
      ) : F !== null && (F.elementType === ze || typeof ze == "object" && ze !== null && ze.$$typeof === A && fr(ze) === F.type) ? (F = f(F, ie.props), Jl(F, ie), F.return = W, F) : (F = Ts(
        ie.type,
        ie.key,
        ie.props,
        null,
        W.mode,
        de
      ), Jl(F, ie), F.return = W, F);
    }
    function re(W, F, ie, de) {
      return F === null || F.tag !== 4 || F.stateNode.containerInfo !== ie.containerInfo || F.stateNode.implementation !== ie.implementation ? (F = pf(ie, W.mode, de), F.return = W, F) : (F = f(F, ie.children || []), F.return = W, F);
    }
    function fe(W, F, ie, de, ze) {
      return F === null || F.tag !== 7 ? (F = lr(
        ie,
        W.mode,
        de,
        ze
      ), F.return = W, F) : (F = f(F, ie), F.return = W, F);
    }
    function he(W, F, ie) {
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return F = mf(
          "" + F,
          W.mode,
          ie
        ), F.return = W, F;
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case x:
            return ie = Ts(
              F.type,
              F.key,
              F.props,
              null,
              W.mode,
              ie
            ), Jl(ie, F), ie.return = W, ie;
          case _:
            return F = pf(
              F,
              W.mode,
              ie
            ), F.return = W, F;
          case A:
            return F = fr(F), he(W, F, ie);
        }
        if (Y(F) || K(F))
          return F = lr(
            F,
            W.mode,
            ie,
            null
          ), F.return = W, F;
        if (typeof F.then == "function")
          return he(W, Ls(F), ie);
        if (F.$$typeof === N)
          return he(
            W,
            Ds(W, F),
            ie
          );
        ks(W, F);
      }
      return null;
    }
    function le(W, F, ie, de) {
      var ze = F !== null ? F.key : null;
      if (typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint")
        return ze !== null ? null : M(W, F, "" + ie, de);
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case x:
            return ie.key === ze ? q(W, F, ie, de) : null;
          case _:
            return ie.key === ze ? re(W, F, ie, de) : null;
          case A:
            return ie = fr(ie), le(W, F, ie, de);
        }
        if (Y(ie) || K(ie))
          return ze !== null ? null : fe(W, F, ie, de, null);
        if (typeof ie.then == "function")
          return le(
            W,
            F,
            Ls(ie),
            de
          );
        if (ie.$$typeof === N)
          return le(
            W,
            F,
            Ds(W, ie),
            de
          );
        ks(W, ie);
      }
      return null;
    }
    function se(W, F, ie, de, ze) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return W = W.get(ie) || null, M(F, W, "" + de, ze);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case x:
            return W = W.get(
              de.key === null ? ie : de.key
            ) || null, q(F, W, de, ze);
          case _:
            return W = W.get(
              de.key === null ? ie : de.key
            ) || null, re(F, W, de, ze);
          case A:
            return de = fr(de), se(
              W,
              F,
              ie,
              de,
              ze
            );
        }
        if (Y(de) || K(de))
          return W = W.get(ie) || null, fe(F, W, de, ze, null);
        if (typeof de.then == "function")
          return se(
            W,
            F,
            ie,
            Ls(de),
            ze
          );
        if (de.$$typeof === N)
          return se(
            W,
            F,
            ie,
            Ds(F, de),
            ze
          );
        ks(F, de);
      }
      return null;
    }
    function Ce(W, F, ie, de) {
      for (var ze = null, ut = null, Re = F, Ye = F = 0, tt = null; Re !== null && Ye < ie.length; Ye++) {
        Re.index > Ye ? (tt = Re, Re = null) : tt = Re.sibling;
        var ct = le(
          W,
          Re,
          ie[Ye],
          de
        );
        if (ct === null) {
          Re === null && (Re = tt);
          break;
        }
        t && Re && ct.alternate === null && n(W, Re), F = h(ct, F, Ye), ut === null ? ze = ct : ut.sibling = ct, ut = ct, Re = tt;
      }
      if (Ye === ie.length)
        return i(W, Re), it && Pa(W, Ye), ze;
      if (Re === null) {
        for (; Ye < ie.length; Ye++)
          Re = he(W, ie[Ye], de), Re !== null && (F = h(
            Re,
            F,
            Ye
          ), ut === null ? ze = Re : ut.sibling = Re, ut = Re);
        return it && Pa(W, Ye), ze;
      }
      for (Re = o(Re); Ye < ie.length; Ye++)
        tt = se(
          Re,
          W,
          Ye,
          ie[Ye],
          de
        ), tt !== null && (t && tt.alternate !== null && Re.delete(
          tt.key === null ? Ye : tt.key
        ), F = h(
          tt,
          F,
          Ye
        ), ut === null ? ze = tt : ut.sibling = tt, ut = tt);
      return t && Re.forEach(function(Yi) {
        return n(W, Yi);
      }), it && Pa(W, Ye), ze;
    }
    function Le(W, F, ie, de) {
      if (ie == null) throw Error(l(151));
      for (var ze = null, ut = null, Re = F, Ye = F = 0, tt = null, ct = ie.next(); Re !== null && !ct.done; Ye++, ct = ie.next()) {
        Re.index > Ye ? (tt = Re, Re = null) : tt = Re.sibling;
        var Yi = le(W, Re, ct.value, de);
        if (Yi === null) {
          Re === null && (Re = tt);
          break;
        }
        t && Re && Yi.alternate === null && n(W, Re), F = h(Yi, F, Ye), ut === null ? ze = Yi : ut.sibling = Yi, ut = Yi, Re = tt;
      }
      if (ct.done)
        return i(W, Re), it && Pa(W, Ye), ze;
      if (Re === null) {
        for (; !ct.done; Ye++, ct = ie.next())
          ct = he(W, ct.value, de), ct !== null && (F = h(ct, F, Ye), ut === null ? ze = ct : ut.sibling = ct, ut = ct);
        return it && Pa(W, Ye), ze;
      }
      for (Re = o(Re); !ct.done; Ye++, ct = ie.next())
        ct = se(Re, W, Ye, ct.value, de), ct !== null && (t && ct.alternate !== null && Re.delete(ct.key === null ? Ye : ct.key), F = h(ct, F, Ye), ut === null ? ze = ct : ut.sibling = ct, ut = ct);
      return t && Re.forEach(function(FE) {
        return n(W, FE);
      }), it && Pa(W, Ye), ze;
    }
    function Nt(W, F, ie, de) {
      if (typeof ie == "object" && ie !== null && ie.type === C && ie.key === null && (ie = ie.props.children), typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case x:
            e: {
              for (var ze = ie.key; F !== null; ) {
                if (F.key === ze) {
                  if (ze = ie.type, ze === C) {
                    if (F.tag === 7) {
                      i(
                        W,
                        F.sibling
                      ), de = f(
                        F,
                        ie.props.children
                      ), de.return = W, W = de;
                      break e;
                    }
                  } else if (F.elementType === ze || typeof ze == "object" && ze !== null && ze.$$typeof === A && fr(ze) === F.type) {
                    i(
                      W,
                      F.sibling
                    ), de = f(F, ie.props), Jl(de, ie), de.return = W, W = de;
                    break e;
                  }
                  i(W, F);
                  break;
                } else n(W, F);
                F = F.sibling;
              }
              ie.type === C ? (de = lr(
                ie.props.children,
                W.mode,
                de,
                ie.key
              ), de.return = W, W = de) : (de = Ts(
                ie.type,
                ie.key,
                ie.props,
                null,
                W.mode,
                de
              ), Jl(de, ie), de.return = W, W = de);
            }
            return w(W);
          case _:
            e: {
              for (ze = ie.key; F !== null; ) {
                if (F.key === ze)
                  if (F.tag === 4 && F.stateNode.containerInfo === ie.containerInfo && F.stateNode.implementation === ie.implementation) {
                    i(
                      W,
                      F.sibling
                    ), de = f(F, ie.children || []), de.return = W, W = de;
                    break e;
                  } else {
                    i(W, F);
                    break;
                  }
                else n(W, F);
                F = F.sibling;
              }
              de = pf(ie, W.mode, de), de.return = W, W = de;
            }
            return w(W);
          case A:
            return ie = fr(ie), Nt(
              W,
              F,
              ie,
              de
            );
        }
        if (Y(ie))
          return Ce(
            W,
            F,
            ie,
            de
          );
        if (K(ie)) {
          if (ze = K(ie), typeof ze != "function") throw Error(l(150));
          return ie = ze.call(ie), Le(
            W,
            F,
            ie,
            de
          );
        }
        if (typeof ie.then == "function")
          return Nt(
            W,
            F,
            Ls(ie),
            de
          );
        if (ie.$$typeof === N)
          return Nt(
            W,
            F,
            Ds(W, ie),
            de
          );
        ks(W, ie);
      }
      return typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint" ? (ie = "" + ie, F !== null && F.tag === 6 ? (i(W, F.sibling), de = f(F, ie), de.return = W, W = de) : (i(W, F), de = mf(ie, W.mode, de), de.return = W, W = de), w(W)) : i(W, F);
    }
    return function(W, F, ie, de) {
      try {
        Wl = 0;
        var ze = Nt(
          W,
          F,
          ie,
          de
        );
        return Wr = null, ze;
      } catch (Re) {
        if (Re === Kr || Re === zs) throw Re;
        var ut = Un(29, Re, null, W.mode);
        return ut.lanes = de, ut.return = W, ut;
      } finally {
      }
    };
  }
  var hr = sg(!0), ug = sg(!1), Ri = !1;
  function Rf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Tf(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ti(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Mi(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = Rs(t), Xp(t, null, i), n;
    }
    return Cs(t, o, n, i), Rs(t);
  }
  function eo(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  function Mf(t, n) {
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
  var Af = !1;
  function to() {
    if (Af) {
      var t = Qr;
      if (t !== null) throw t;
    }
  }
  function no(t, n, i, o) {
    Af = !1;
    var f = t.updateQueue;
    Ri = !1;
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
        var le = M.lane & -536870913, se = le !== M.lane;
        if (se ? (et & le) === le : (o & le) === le) {
          le !== 0 && le === Pr && (Af = !0), fe !== null && (fe = fe.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var Ce = t, Le = M;
            le = n;
            var Nt = i;
            switch (Le.tag) {
              case 1:
                if (Ce = Le.payload, typeof Ce == "function") {
                  he = Ce.call(Nt, he, le);
                  break e;
                }
                he = Ce;
                break e;
              case 3:
                Ce.flags = Ce.flags & -65537 | 128;
              case 0:
                if (Ce = Le.payload, le = typeof Ce == "function" ? Ce.call(Nt, he, le) : Ce, le == null) break e;
                he = g({}, he, le);
                break e;
              case 2:
                Ri = !0;
            }
          }
          le = M.callback, le !== null && (t.flags |= 64, se && (t.flags |= 8192), se = f.callbacks, se === null ? f.callbacks = [le] : se.push(le));
        } else
          se = {
            lane: le,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, fe === null ? (re = fe = se, q = he) : fe = fe.next = se, w |= le;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          se = M, M = se.next, se.next = null, f.lastBaseUpdate = se, f.shared.pending = null;
        }
      } while (!0);
      fe === null && (q = he), f.baseState = q, f.firstBaseUpdate = re, f.lastBaseUpdate = fe, h === null && (f.shared.lanes = 0), Oi |= w, t.lanes = w, t.memoizedState = he;
    }
  }
  function cg(t, n) {
    if (typeof t != "function")
      throw Error(l(191, t));
    t.call(n);
  }
  function fg(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        cg(i[t], n);
  }
  var Jr = D(null), Hs = D(0);
  function dg(t, n) {
    t = li, Q(Hs, t), Q(Jr, n), li = t | n.baseLanes;
  }
  function Df() {
    Q(Hs, li), Q(Jr, Jr.current);
  }
  function jf() {
    li = Hs.current, U(Jr), U(Hs);
  }
  var Vn = D(null), aa = null;
  function Ai(t) {
    var n = t.alternate;
    Q(qt, qt.current & 1), Q(Vn, t), aa === null && (n === null || Jr.current !== null || n.memoizedState !== null) && (aa = t);
  }
  function zf(t) {
    Q(qt, qt.current), Q(Vn, t), aa === null && (aa = t);
  }
  function hg(t) {
    t.tag === 22 ? (Q(qt, qt.current), Q(Vn, t), aa === null && (aa = t)) : Di();
  }
  function Di() {
    Q(qt, qt.current), Q(Vn, Vn.current);
  }
  function qn(t) {
    U(Vn), aa === t && (aa = null), U(qt);
  }
  var qt = D(0);
  function Bs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Ud(i) || Vd(i)))
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
  var Wa = 0, qe = null, St = null, Xt = null, Us = !1, el = !1, mr = !1, Vs = 0, ao = 0, tl = null, HS = 0;
  function Ht() {
    throw Error(l(321));
  }
  function Of(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Bn(t[i], n[i])) return !1;
    return !0;
  }
  function Lf(t, n, i, o, f, h) {
    return Wa = h, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, T.H = t === null || t.memoizedState === null ? Qg : Qf, mr = !1, h = i(o, f), mr = !1, el && (h = pg(
      n,
      i,
      o,
      f
    )), mg(t), h;
  }
  function mg(t) {
    T.H = lo;
    var n = St !== null && St.next !== null;
    if (Wa = 0, Xt = St = qe = null, Us = !1, ao = 0, tl = null, n) throw Error(l(300));
    t === null || Ft || (t = t.dependencies, t !== null && As(t) && (Ft = !0));
  }
  function pg(t, n, i, o) {
    qe = t;
    var f = 0;
    do {
      if (el && (tl = null), ao = 0, el = !1, 25 <= f) throw Error(l(301));
      if (f += 1, Xt = St = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      T.H = Kg, h = n(i, o);
    } while (el);
    return h;
  }
  function BS() {
    var t = T.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? io(n) : n, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (qe.flags |= 1024), n;
  }
  function kf() {
    var t = Vs !== 0;
    return Vs = 0, t;
  }
  function Hf(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Bf(t) {
    if (Us) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Us = !1;
    }
    Wa = 0, Xt = St = qe = null, el = !1, ao = Vs = 0, tl = null;
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
    if (St === null) {
      var t = qe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var n = Xt === null ? qe.memoizedState : Xt.next;
    if (n !== null)
      Xt = n, St = t;
    else {
      if (t === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, Xt === null ? qe.memoizedState = Xt = t : Xt = Xt.next = t;
    }
    return Xt;
  }
  function qs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function io(t) {
    var n = ao;
    return ao += 1, tl === null && (tl = []), t = rg(tl, t, n), n = qe, (Xt === null ? n.memoizedState : Xt.next) === null && (n = n.alternate, T.H = n === null || n.memoizedState === null ? Qg : Qf), t;
  }
  function $s(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return io(t);
      if (t.$$typeof === N) return on(t);
    }
    throw Error(l(438, String(t)));
  }
  function Uf(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = qs(), qe.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = J;
    return n.index++, i;
  }
  function Ja(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function Is(t) {
    var n = $t();
    return Vf(n, St, t);
  }
  function Vf(t, n, i) {
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
        if (he !== re.lane ? (et & he) === he : (Wa & he) === he) {
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
            }), he === Pr && (fe = !0);
          else if ((Wa & le) === le) {
            re = re.next, le === Pr && (fe = !0);
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
          he = re.action, mr && i(h, he), h = re.hasEagerState ? re.eagerState : i(h, he);
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
      if (q === null ? w = h : q.next = M, !Bn(h, t.memoizedState) && (Ft = !0, fe && (i = Qr, i !== null)))
        throw i;
      t.memoizedState = h, t.baseState = w, t.baseQueue = q, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function qf(t) {
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
      Bn(h, n.memoizedState) || (Ft = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), i.lastRenderedState = h;
    }
    return [h, o];
  }
  function gg(t, n, i) {
    var o = qe, f = $t(), h = it;
    if (h) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var w = !Bn(
      (St || f).memoizedState,
      i
    );
    if (w && (f.memoizedState = i, Ft = !0), f = f.queue, Yf(bg.bind(null, o, f, t), [
      t
    ]), f.getSnapshot !== n || w || Xt !== null && Xt.memoizedState.tag & 1) {
      if (o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        yg.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Rt === null) throw Error(l(349));
      h || (Wa & 127) !== 0 || vg(o, n, i);
    }
    return i;
  }
  function vg(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = qs(), qe.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function yg(t, n, i, o) {
    n.value = i, n.getSnapshot = o, xg(n) && wg(t);
  }
  function bg(t, n, i) {
    return i(function() {
      xg(n) && wg(t);
    });
  }
  function xg(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Bn(t, i);
    } catch {
      return !0;
    }
  }
  function wg(t) {
    var n = rr(t, 2);
    n !== null && Dn(n, t, 2);
  }
  function $f(t) {
    var n = yn();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), mr) {
        zt(!0);
        try {
          i();
        } finally {
          zt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ja,
      lastRenderedState: t
    }, n;
  }
  function _g(t, n, i, o) {
    return t.baseState = i, Vf(
      t,
      St,
      typeof o == "function" ? o : Ja
    );
  }
  function US(t, n, i, o, f) {
    if (Xs(t)) throw Error(l(485));
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
      T.T !== null ? i(!0) : h.isTransition = !1, o(h), i = n.pending, i === null ? (h.next = n.pending = h, Sg(n, h)) : (h.next = i.next, n.pending = i.next = h);
    }
  }
  function Sg(t, n) {
    var i = n.action, o = n.payload, f = t.state;
    if (n.isTransition) {
      var h = T.T, w = {};
      T.T = w;
      try {
        var M = i(f, o), q = T.S;
        q !== null && q(w, M), Eg(t, n, M);
      } catch (re) {
        If(t, n, re);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), T.T = h;
      }
    } else
      try {
        h = i(f, o), Eg(t, n, h);
      } catch (re) {
        If(t, n, re);
      }
  }
  function Eg(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        Ng(t, n, o);
      },
      function(o) {
        return If(t, n, o);
      }
    ) : Ng(t, n, i);
  }
  function Ng(t, n, i) {
    n.status = "fulfilled", n.value = i, Cg(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, Sg(t, i)));
  }
  function If(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, Cg(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function Cg(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Rg(t, n) {
    return n;
  }
  function Tg(t, n) {
    if (it) {
      var i = Rt.formState;
      if (i !== null) {
        e: {
          var o = qe;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, h = na; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = ia(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Tt = ia(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            Ni(o);
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
      lastRenderedReducer: Rg,
      lastRenderedState: n
    }, i.queue = o, i = Fg.bind(
      null,
      qe,
      o
    ), o.dispatch = i, o = $f(!1), h = Pf.bind(
      null,
      qe,
      !1,
      o.queue
    ), o = yn(), f = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = f, i = US.bind(
      null,
      qe,
      f,
      h,
      i
    ), f.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function Mg(t) {
    var n = $t();
    return Ag(n, St, t);
  }
  function Ag(t, n, i) {
    if (n = Vf(
      t,
      n,
      Rg
    )[0], t = Is(Ja)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = io(n);
      } catch (w) {
        throw w === Kr ? zs : w;
      }
    else o = n;
    n = $t();
    var f = n.queue, h = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, nl(
      9,
      { destroy: void 0 },
      VS.bind(null, f, i),
      null
    )), [o, h, t];
  }
  function VS(t, n) {
    t.action = n;
  }
  function Dg(t) {
    var n = $t(), i = St;
    if (i !== null)
      return Ag(n, i, t);
    $t(), n = n.memoizedState, i = $t();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function nl(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = qs(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function jg() {
    return $t().memoizedState;
  }
  function Ys(t, n, i, o) {
    var f = yn();
    qe.flags |= t, f.memoizedState = nl(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Gs(t, n, i, o) {
    var f = $t();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    St !== null && o !== null && Of(o, St.memoizedState.deps) ? f.memoizedState = nl(n, h, i, o) : (qe.flags |= t, f.memoizedState = nl(
      1 | n,
      h,
      i,
      o
    ));
  }
  function zg(t, n) {
    Ys(8390656, 8, t, n);
  }
  function Yf(t, n) {
    Gs(2048, 8, t, n);
  }
  function qS(t) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = qs(), qe.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Og(t) {
    var n = $t().memoizedState;
    return qS({ ref: n, nextImpl: t }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Lg(t, n) {
    return Gs(4, 2, t, n);
  }
  function kg(t, n) {
    return Gs(4, 4, t, n);
  }
  function Hg(t, n) {
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
  function Bg(t, n, i) {
    i = i != null ? i.concat([t]) : null, Gs(4, 4, Hg.bind(null, n, t), i);
  }
  function Gf() {
  }
  function Ug(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && Of(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Vg(t, n) {
    var i = $t();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && Of(n, o[1]))
      return o[0];
    if (o = t(), mr) {
      zt(!0);
      try {
        t();
      } finally {
        zt(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function Xf(t, n, i) {
    return i === void 0 || (Wa & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = q0(), qe.lanes |= t, Oi |= t, i);
  }
  function qg(t, n, i, o) {
    return Bn(i, n) ? i : Jr.current !== null ? (t = Xf(t, i, o), Bn(t, n) || (Ft = !0), t) : (Wa & 42) === 0 || (Wa & 1073741824) !== 0 && (et & 261930) === 0 ? (Ft = !0, t.memoizedState = i) : (t = q0(), qe.lanes |= t, Oi |= t, n);
  }
  function $g(t, n, i, o, f) {
    var h = L.p;
    L.p = h !== 0 && 8 > h ? h : 8;
    var w = T.T, M = {};
    T.T = M, Pf(t, !1, n, i);
    try {
      var q = f(), re = T.S;
      if (re !== null && re(M, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var fe = kS(
          q,
          o
        );
        ro(
          t,
          n,
          fe,
          Yn(t)
        );
      } else
        ro(
          t,
          n,
          o,
          Yn(t)
        );
    } catch (he) {
      ro(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: he },
        Yn()
      );
    } finally {
      L.p = h, w !== null && M.types !== null && (w.types = M.types), T.T = w;
    }
  }
  function $S() {
  }
  function Ff(t, n, i, o) {
    if (t.tag !== 5) throw Error(l(476));
    var f = Ig(t).queue;
    $g(
      t,
      f,
      n,
      Z,
      i === null ? $S : function() {
        return Yg(t), i(o);
      }
    );
  }
  function Ig(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ja,
        lastRenderedState: Z
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
        lastRenderedReducer: Ja,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Yg(t) {
    var n = Ig(t);
    n.next === null && (n = t.alternate.memoizedState), ro(
      t,
      n.next.queue,
      {},
      Yn()
    );
  }
  function Zf() {
    return on(So);
  }
  function Gg() {
    return $t().memoizedState;
  }
  function Xg() {
    return $t().memoizedState;
  }
  function IS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Yn();
          t = Ti(i);
          var o = Mi(n, t, i);
          o !== null && (Dn(o, n, i), eo(o, n, i)), n = { cache: Sf() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function YS(t, n, i) {
    var o = Yn();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xs(t) ? Zg(n, i) : (i = df(t, n, i, o), i !== null && (Dn(i, t, o), Pg(i, n, o)));
  }
  function Fg(t, n, i) {
    var o = Yn();
    ro(t, n, i, o);
  }
  function ro(t, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xs(t)) Zg(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, M = h(w, i);
          if (f.hasEagerState = !0, f.eagerState = M, Bn(M, w))
            return Cs(t, n, f, 0), Rt === null && Ns(), !1;
        } catch {
        } finally {
        }
      if (i = df(t, n, f, o), i !== null)
        return Dn(i, t, o), Pg(i, n, o), !0;
    }
    return !1;
  }
  function Pf(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: Rd(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xs(t)) {
      if (n) throw Error(l(479));
    } else
      n = df(
        t,
        i,
        o,
        2
      ), n !== null && Dn(n, t, 2);
  }
  function Xs(t) {
    var n = t.alternate;
    return t === qe || n !== null && n === qe;
  }
  function Zg(t, n) {
    el = Us = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Pg(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, en(t, i);
    }
  }
  var lo = {
    readContext: on,
    use: $s,
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
  lo.useEffectEvent = Ht;
  var Qg = {
    readContext: on,
    use: $s,
    useCallback: function(t, n) {
      return yn().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: on,
    useEffect: zg,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, Ys(
        4194308,
        4,
        Hg.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return Ys(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      Ys(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = yn();
      n = n === void 0 ? null : n;
      var o = t();
      if (mr) {
        zt(!0);
        try {
          t();
        } finally {
          zt(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, i) {
      var o = yn();
      if (i !== void 0) {
        var f = i(n);
        if (mr) {
          zt(!0);
          try {
            i(n);
          } finally {
            zt(!1);
          }
        }
      } else f = n;
      return o.memoizedState = o.baseState = f, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: f
      }, o.queue = t, t = t.dispatch = YS.bind(
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
      t = $f(t);
      var n = t.queue, i = Fg.bind(null, qe, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Gf,
    useDeferredValue: function(t, n) {
      var i = yn();
      return Xf(i, t, n);
    },
    useTransition: function() {
      var t = $f(!1);
      return t = $g.bind(
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
        (et & 127) !== 0 || vg(o, n, i);
      }
      f.memoizedState = i;
      var h = { value: i, getSnapshot: n };
      return f.queue = h, zg(bg.bind(null, o, h, t), [
        t
      ]), o.flags |= 2048, nl(
        9,
        { destroy: void 0 },
        yg.bind(
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
        var i = Da, o = Aa;
        i = (o & ~(1 << 32 - Ut(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Vs++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = HS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Zf,
    useFormState: Tg,
    useActionState: Tg,
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
      return n.queue = i, n = Pf.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Uf,
    useCacheRefresh: function() {
      return yn().memoizedState = IS.bind(
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
  }, Qf = {
    readContext: on,
    use: $s,
    useCallback: Ug,
    useContext: on,
    useEffect: Yf,
    useImperativeHandle: Bg,
    useInsertionEffect: Lg,
    useLayoutEffect: kg,
    useMemo: Vg,
    useReducer: Is,
    useRef: jg,
    useState: function() {
      return Is(Ja);
    },
    useDebugValue: Gf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return qg(
        i,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Is(Ja)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : io(t),
        n
      ];
    },
    useSyncExternalStore: gg,
    useId: Gg,
    useHostTransitionStatus: Zf,
    useFormState: Mg,
    useActionState: Mg,
    useOptimistic: function(t, n) {
      var i = $t();
      return _g(i, St, t, n);
    },
    useMemoCache: Uf,
    useCacheRefresh: Xg
  };
  Qf.useEffectEvent = Og;
  var Kg = {
    readContext: on,
    use: $s,
    useCallback: Ug,
    useContext: on,
    useEffect: Yf,
    useImperativeHandle: Bg,
    useInsertionEffect: Lg,
    useLayoutEffect: kg,
    useMemo: Vg,
    useReducer: qf,
    useRef: jg,
    useState: function() {
      return qf(Ja);
    },
    useDebugValue: Gf,
    useDeferredValue: function(t, n) {
      var i = $t();
      return St === null ? Xf(i, t, n) : qg(
        i,
        St.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = qf(Ja)[0], n = $t().memoizedState;
      return [
        typeof t == "boolean" ? t : io(t),
        n
      ];
    },
    useSyncExternalStore: gg,
    useId: Gg,
    useHostTransitionStatus: Zf,
    useFormState: Dg,
    useActionState: Dg,
    useOptimistic: function(t, n) {
      var i = $t();
      return St !== null ? _g(i, St, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Uf,
    useCacheRefresh: Xg
  };
  Kg.useEffectEvent = Og;
  function Kf(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : g({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var Wf = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Yn(), f = Ti(o);
      f.payload = n, i != null && (f.callback = i), n = Mi(t, f, o), n !== null && (Dn(n, t, o), eo(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Yn(), f = Ti(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Mi(t, f, o), n !== null && (Dn(n, t, o), eo(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Yn(), o = Ti(i);
      o.tag = 2, n != null && (o.callback = n), n = Mi(t, o, i), n !== null && (Dn(n, t, i), eo(n, t, i));
    }
  };
  function Wg(t, n, i, o, f, h, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, h, w) : n.prototype && n.prototype.isPureReactComponent ? !Xl(i, o) || !Xl(f, h) : !0;
  }
  function Jg(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && Wf.enqueueReplaceState(n, n.state, null);
  }
  function pr(t, n) {
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
  function e0(t) {
    Es(t);
  }
  function t0(t) {
    console.error(t);
  }
  function n0(t) {
    Es(t);
  }
  function Fs(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function a0(t, n, i) {
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
  function Jf(t, n, i) {
    return i = Ti(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Fs(t, n);
    }, i;
  }
  function i0(t) {
    return t = Ti(t), t.tag = 3, t;
  }
  function r0(t, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        a0(n, i, o);
      };
    }
    var w = i.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      a0(n, i, o), typeof f != "function" && (Li === null ? Li = /* @__PURE__ */ new Set([this]) : Li.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function GS(t, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && Zr(
        n,
        i,
        f,
        !0
      ), i = Vn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return aa === null ? ru() : i.alternate === null && Bt === 0 && (Bt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === Os ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Ed(t, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === Os ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), Ed(t, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return Ed(t, o, f), ru(), !1;
    }
    if (it)
      return n = Vn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== yf && (t = Error(l(422), { cause: o }), Pl(Jn(t, i)))) : (o !== yf && (n = Error(l(423), {
        cause: o
      }), Pl(
        Jn(n, i)
      )), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, o = Jn(o, i), f = Jf(
        t.stateNode,
        o,
        f
      ), Mf(t, f), Bt !== 4 && (Bt = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = Jn(h, i), po === null ? po = [h] : po.push(h), Bt !== 4 && (Bt = 2), n === null) return !0;
    o = Jn(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = f & -f, i.lanes |= t, t = Jf(i.stateNode, o, t), Mf(i, t), !1;
        case 1:
          if (n = i.type, h = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (Li === null || !Li.has(h))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = i0(f), r0(
              f,
              t,
              i,
              o
            ), Mf(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var ed = Error(l(461)), Ft = !1;
  function sn(t, n, i, o) {
    n.child = t === null ? ug(n, null, i, o) : hr(
      n,
      t.child,
      i,
      o
    );
  }
  function l0(t, n, i, o, f) {
    i = i.render;
    var h = n.ref;
    if ("ref" in o) {
      var w = {};
      for (var M in o)
        M !== "ref" && (w[M] = o[M]);
    } else w = o;
    return ur(n), o = Lf(
      t,
      n,
      i,
      w,
      h,
      f
    ), M = kf(), t !== null && !Ft ? (Hf(t, n, f), ei(t, n, f)) : (it && M && gf(n), n.flags |= 1, sn(t, n, o, f), n.child);
  }
  function o0(t, n, i, o, f) {
    if (t === null) {
      var h = i.type;
      return typeof h == "function" && !hf(h) && h.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = h, s0(
        t,
        n,
        h,
        o,
        f
      )) : (t = Ts(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !sd(t, f)) {
      var w = h.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Xl, i(w, o) && t.ref === n.ref)
        return ei(t, n, f);
    }
    return n.flags |= 1, t = Za(h, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function s0(t, n, i, o, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (Xl(h, o) && t.ref === n.ref)
        if (Ft = !1, n.pendingProps = o = h, sd(t, f))
          (t.flags & 131072) !== 0 && (Ft = !0);
        else
          return n.lanes = t.lanes, ei(t, n, f);
    }
    return td(
      t,
      n,
      i,
      o,
      f
    );
  }
  function u0(t, n, i, o) {
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
        return c0(
          t,
          n,
          h,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && js(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? dg(n, h) : Df(), hg(n);
      else
        return o = n.lanes = 536870912, c0(
          t,
          n,
          h !== null ? h.baseLanes | i : i,
          i,
          o
        );
    } else
      h !== null ? (js(n, h.cachePool), dg(n, h), Di(), n.memoizedState = null) : (t !== null && js(n, null), Df(), Di());
    return sn(t, n, f, i), n.child;
  }
  function oo(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function c0(t, n, i, o, f) {
    var h = Nf();
    return h = h === null ? null : { parent: Gt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: i,
      cachePool: h
    }, t !== null && js(n, null), Df(), hg(n), t !== null && Zr(t, n, o, !0), n.childLanes = f, null;
  }
  function Zs(t, n) {
    return n = Qs(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function f0(t, n, i) {
    return hr(n, t.child, null, i), t = Zs(n, n.pendingProps), t.flags |= 2, qn(n), n.memoizedState = null, t;
  }
  function XS(t, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (it) {
        if (o.mode === "hidden")
          return t = Zs(n, o), n.lanes = 536870912, oo(null, t);
        if (zf(n), (t = Tt) ? (t = Sv(
          t,
          na
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Si !== null ? { id: Aa, overflow: Da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Zp(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ni(n);
        return n.lanes = 536870912, null;
      }
      return Zs(n, o);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if (zf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = f0(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ft || Zr(t, n, i, !1), f = (i & t.childLanes) !== 0, Ft || f) {
        if (o = Rt, o !== null && (w = B(o, i), w !== 0 && w !== h.retryLane))
          throw h.retryLane = w, rr(t, w), Dn(o, t, w), ed;
        ru(), n = f0(
          t,
          n,
          i
        );
      } else
        t = h.treeContext, Tt = ia(w.nextSibling), ln = n, it = !0, Ei = null, na = !1, t !== null && Kp(n, t), n = Zs(n, o), n.flags |= 4096;
      return n;
    }
    return t = Za(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function Ps(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function td(t, n, i, o, f) {
    return ur(n), i = Lf(
      t,
      n,
      i,
      o,
      void 0,
      f
    ), o = kf(), t !== null && !Ft ? (Hf(t, n, f), ei(t, n, f)) : (it && o && gf(n), n.flags |= 1, sn(t, n, i, f), n.child);
  }
  function d0(t, n, i, o, f, h) {
    return ur(n), n.updateQueue = null, i = pg(
      n,
      o,
      i,
      f
    ), mg(t), o = kf(), t !== null && !Ft ? (Hf(t, n, h), ei(t, n, h)) : (it && o && gf(n), n.flags |= 1, sn(t, n, i, h), n.child);
  }
  function h0(t, n, i, o, f) {
    if (ur(n), n.stateNode === null) {
      var h = Yr, w = i.contextType;
      typeof w == "object" && w !== null && (h = on(w)), h = new i(o, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = Wf, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = o, h.state = n.memoizedState, h.refs = {}, Rf(n), w = i.contextType, h.context = typeof w == "object" && w !== null ? on(w) : Yr, h.state = n.memoizedState, w = i.getDerivedStateFromProps, typeof w == "function" && (Kf(
        n,
        i,
        w,
        o
      ), h.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && Wf.enqueueReplaceState(h, h.state, null), no(n, o, h, f), to(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      h = n.stateNode;
      var M = n.memoizedProps, q = pr(i, M);
      h.props = q;
      var re = h.context, fe = i.contextType;
      w = Yr, typeof fe == "object" && fe !== null && (w = on(fe));
      var he = i.getDerivedStateFromProps;
      fe = typeof he == "function" || typeof h.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, fe || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (M || re !== w) && Jg(
        n,
        h,
        o,
        w
      ), Ri = !1;
      var le = n.memoizedState;
      h.state = le, no(n, o, h, f), to(), re = n.memoizedState, M || le !== re || Ri ? (typeof he == "function" && (Kf(
        n,
        i,
        he,
        o
      ), re = n.memoizedState), (q = Ri || Wg(
        n,
        i,
        q,
        o,
        le,
        re,
        w
      )) ? (fe || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = re), h.props = o, h.state = re, h.context = w, o = q) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      h = n.stateNode, Tf(t, n), w = n.memoizedProps, fe = pr(i, w), h.props = fe, he = n.pendingProps, le = h.context, re = i.contextType, q = Yr, typeof re == "object" && re !== null && (q = on(re)), M = i.getDerivedStateFromProps, (re = typeof M == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== he || le !== q) && Jg(
        n,
        h,
        o,
        q
      ), Ri = !1, le = n.memoizedState, h.state = le, no(n, o, h, f), to();
      var se = n.memoizedState;
      w !== he || le !== se || Ri || t !== null && t.dependencies !== null && As(t.dependencies) ? (typeof M == "function" && (Kf(
        n,
        i,
        M,
        o
      ), se = n.memoizedState), (fe = Ri || Wg(
        n,
        i,
        fe,
        o,
        le,
        se,
        q
      ) || t !== null && t.dependencies !== null && As(t.dependencies)) ? (re || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, se, q), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        se,
        q
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = se), h.props = o, h.state = se, h.context = q, o = fe) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && le === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return h = o, Ps(t, n), o = (n.flags & 128) !== 0, h || o ? (h = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && o ? (n.child = hr(
      n,
      t.child,
      null,
      f
    ), n.child = hr(
      n,
      null,
      i,
      f
    )) : sn(t, n, i, f), n.memoizedState = h.state, t = n.child) : t = ei(
      t,
      n,
      f
    ), t;
  }
  function m0(t, n, i, o) {
    return or(), n.flags |= 256, sn(t, n, i, o), n.child;
  }
  var nd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ad(t) {
    return { baseLanes: t, cachePool: ag() };
  }
  function id(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= In), t;
  }
  function p0(t, n, i) {
    var o = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = t !== null && t.memoizedState === null ? !1 : (qt.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (it) {
        if (f ? Ai(n) : Di(), (t = Tt) ? (t = Sv(
          t,
          na
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Si !== null ? { id: Aa, overflow: Da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Zp(t), i.return = n, n.child = i, ln = n, Tt = null)) : t = null, t === null) throw Ni(n);
        return Vd(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (Di(), f = n.mode, M = Qs(
        { mode: "hidden", children: M },
        f
      ), o = lr(
        o,
        f,
        i,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = ad(i), o.childLanes = id(
        t,
        w,
        i
      ), n.memoizedState = nd, oo(null, o)) : (Ai(n), rd(n, M));
    }
    var q = t.memoizedState;
    if (q !== null && (M = q.dehydrated, M !== null)) {
      if (h)
        n.flags & 256 ? (Ai(n), n.flags &= -257, n = ld(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (Di(), n.child = t.child, n.flags |= 128, n = null) : (Di(), M = o.fallback, f = n.mode, o = Qs(
          { mode: "visible", children: o.children },
          f
        ), M = lr(
          M,
          f,
          i,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, hr(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = ad(i), o.childLanes = id(
          t,
          w,
          i
        ), n.memoizedState = nd, n = oo(null, o));
      else if (Ai(n), Vd(M)) {
        if (w = M.nextSibling && M.nextSibling.dataset, w) var re = w.dgst;
        w = re, o = Error(l(419)), o.stack = "", o.digest = w, Pl({ value: o, source: null, stack: null }), n = ld(
          t,
          n,
          i
        );
      } else if (Ft || Zr(t, n, i, !1), w = (i & t.childLanes) !== 0, Ft || w) {
        if (w = Rt, w !== null && (o = B(w, i), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, rr(t, o), Dn(w, t, o), ed;
        Ud(M) || ru(), n = ld(
          t,
          n,
          i
        );
      } else
        Ud(M) ? (n.flags |= 192, n.child = t.child, n = null) : (t = q.treeContext, Tt = ia(
          M.nextSibling
        ), ln = n, it = !0, Ei = null, na = !1, t !== null && Kp(n, t), n = rd(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Di(), M = o.fallback, f = n.mode, q = t.child, re = q.sibling, o = Za(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, re !== null ? M = Za(
      re,
      M
    ) : (M = lr(
      M,
      f,
      i,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, oo(null, o), o = n.child, M = t.child.memoizedState, M === null ? M = ad(i) : (f = M.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = ag(), M = {
      baseLanes: M.baseLanes | i,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = id(
      t,
      w,
      i
    ), n.memoizedState = nd, oo(t.child, o)) : (Ai(n), i = t.child, t = i.sibling, i = Za(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function rd(t, n) {
    return n = Qs(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function Qs(t, n) {
    return t = Un(22, t, null, n), t.lanes = 0, t;
  }
  function ld(t, n, i) {
    return hr(n, t.child, null, i), t = rd(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function g0(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), wf(t.return, n, i);
  }
  function od(t, n, i, o, f, h) {
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
  function v0(t, n, i) {
    var o = n.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var w = qt.current, M = (w & 2) !== 0;
    if (M ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, Q(qt, w), sn(t, n, o, i), o = it ? Zl : 0, !M && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && g0(t, i, n);
        else if (t.tag === 19)
          g0(t, i, n);
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
          t = i.alternate, t !== null && Bs(t) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), od(
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
          if (t = f.alternate, t !== null && Bs(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = i, i = f, f = t;
        }
        od(
          n,
          !0,
          i,
          null,
          h,
          o
        );
        break;
      case "together":
        od(
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
  function ei(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), Oi |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (Zr(
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
      for (t = n.child, i = Za(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Za(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function sd(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && As(t)));
  }
  function FS(t, n, i) {
    switch (n.tag) {
      case 3:
        G(n, n.stateNode.containerInfo), Ci(n, Gt, t.memoizedState.cache), or();
        break;
      case 27:
      case 5:
        Ee(n);
        break;
      case 4:
        G(n, n.stateNode.containerInfo);
        break;
      case 10:
        Ci(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, zf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Ai(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? p0(t, n, i) : (Ai(n), t = ei(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        Ai(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (Zr(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return v0(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Q(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, u0(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Ci(n, Gt, t.memoizedState.cache);
    }
    return ei(t, n, i);
  }
  function y0(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Ft = !0;
      else {
        if (!sd(t, i) && (n.flags & 128) === 0)
          return Ft = !1, FS(
            t,
            n,
            i
          );
        Ft = (t.flags & 131072) !== 0;
      }
    else
      Ft = !1, it && (n.flags & 1048576) !== 0 && Qp(n, Zl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (t = fr(n.elementType), n.type = t, typeof t == "function")
            hf(t) ? (o = pr(t, o), n.tag = 1, n = h0(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = td(
              null,
              n,
              t,
              o,
              i
            ));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === z) {
                n.tag = 11, n = l0(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = o0(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break e;
              }
            }
            throw n = O(t) || t, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return td(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, f = pr(
          o,
          n.pendingProps
        ), h0(
          t,
          n,
          o,
          f,
          i
        );
      case 3:
        e: {
          if (G(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(l(387));
          o = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, Tf(t, n), no(n, o, null, i);
          var w = n.memoizedState;
          if (o = w.cache, Ci(n, Gt, o), o !== h.cache && _f(
            n,
            [Gt],
            i,
            !0
          ), to(), o = w.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = m0(
                t,
                n,
                o,
                i
              );
              break e;
            } else if (o !== f) {
              f = Jn(
                Error(l(424)),
                n
              ), Pl(f), n = m0(
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
              for (Tt = ia(t.firstChild), ln = n, it = !0, Ei = null, na = !0, i = ug(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (or(), o === f) {
              n = ei(
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
        return Ps(t, n), t === null ? (i = Mv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, t = n.pendingProps, o = du(
          pe.current
        ).createElement(i), o[ye] = n, o[_e] = t, un(o, i, t), at(o), n.stateNode = o) : n.memoizedState = Mv(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ee(n), t === null && it && (o = n.stateNode = Cv(
          n.type,
          n.pendingProps,
          pe.current
        ), ln = n, na = !0, f = Tt, Ui(n.type) ? (qd = f, Tt = ia(o.firstChild)) : Tt = f), sn(
          t,
          n,
          n.pendingProps.children,
          i
        ), Ps(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && it && ((f = o = Tt) && (o = SE(
          o,
          n.type,
          n.pendingProps,
          na
        ), o !== null ? (n.stateNode = o, ln = n, Tt = ia(o.firstChild), na = !1, f = !0) : f = !1), f || Ni(n)), Ee(n), f = n.type, h = n.pendingProps, w = t !== null ? t.memoizedProps : null, o = h.children, kd(f, h) ? o = null : w !== null && kd(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = Lf(
          t,
          n,
          BS,
          null,
          null,
          i
        ), So._currentValue = f), Ps(t, n), sn(t, n, o, i), n.child;
      case 6:
        return t === null && it && ((t = i = Tt) && (i = EE(
          i,
          n.pendingProps,
          na
        ), i !== null ? (n.stateNode = i, ln = n, Tt = null, t = !0) : t = !1), t || Ni(n)), null;
      case 13:
        return p0(t, n, i);
      case 4:
        return G(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = hr(
          n,
          null,
          o,
          i
        ) : sn(t, n, o, i), n.child;
      case 11:
        return l0(
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
        return o = n.pendingProps, Ci(n, n.type, o.value), sn(t, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, ur(n), f = on(f), o = o(f), n.flags |= 1, sn(t, n, o, i), n.child;
      case 14:
        return o0(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return s0(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return v0(t, n, i);
      case 31:
        return XS(t, n, i);
      case 22:
        return u0(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return ur(n), o = on(Gt), t === null ? (f = Nf(), f === null && (f = Rt, h = Sf(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= i), f = h), n.memoizedState = { parent: o, cache: f }, Rf(n), Ci(n, Gt, f)) : ((t.lanes & i) !== 0 && (Tf(t, n), no(n, null, null, i), to()), f = t.memoizedState, h = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Ci(n, Gt, o)) : (o = h.cache, Ci(n, Gt, o), o !== f.cache && _f(
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
  function ti(t) {
    t.flags |= 4;
  }
  function ud(t, n, i, o, f) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (G0()) t.flags |= 8192;
        else
          throw dr = Os, Cf;
    } else t.flags &= -16777217;
  }
  function b0(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Ov(n))
      if (G0()) t.flags |= 8192;
      else
        throw dr = Os, Cf;
  }
  function Ks(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Vt() : 536870912, t.lanes |= n, ll |= n);
  }
  function so(t, n) {
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
  function ZS(t, n, i) {
    var o = n.pendingProps;
    switch (vf(n), n.tag) {
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
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Ka(Gt), ce(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Fr(n) ? ti(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, bf())), Mt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (ti(n), h !== null ? (Mt(n), b0(n, h)) : (Mt(n), ud(
          n,
          f,
          null,
          o,
          i
        ))) : h ? h !== t.memoizedState ? (ti(n), Mt(n), b0(n, h)) : (Mt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && ti(n), Mt(n), ud(
          n,
          f,
          t,
          o,
          i
        )), null;
      case 27:
        if (we(n), i = pe.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ti(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          t = te.current, Fr(n) ? Wp(n) : (t = Cv(f, o, i), n.stateNode = t, ti(n));
        }
        return Mt(n), null;
      case 5:
        if (we(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && ti(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (h = te.current, Fr(n))
            Wp(n);
          else {
            var w = du(
              pe.current
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
            h[ye] = n, h[_e] = o;
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
            o && ti(n);
          }
        }
        return Mt(n), ud(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && ti(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (t = pe.current, Fr(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, f = ln, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            t[ye] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || pv(t.nodeValue, i)), t || Ni(n, !0);
          } else
            t = du(t).createTextNode(
              o
            ), t[ye] = n, n.stateNode = t;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Fr(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(l(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(l(557));
              t[ye] = n;
            } else
              or(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), t = !1;
          } else
            i = bf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (qn(n), n) : (qn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Fr(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ye] = n;
            } else
              or(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = bf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (qn(n), n) : (qn(n), null);
        }
        return qn(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), Ks(n, n.updateQueue), Mt(n), null);
      case 4:
        return ce(), t === null && Dd(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Ka(n.type), Mt(n), null;
      case 19:
        if (U(qt), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) so(o, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = Bs(t), h !== null) {
                  for (n.flags |= 128, so(o, !1), t = h.updateQueue, n.updateQueue = t, Ks(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Fp(i, t), i = i.sibling;
                  return Q(
                    qt,
                    qt.current & 1 | 2
                  ), it && Pa(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Pe() > nu && (n.flags |= 128, f = !0, so(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = Bs(h), t !== null) {
              if (n.flags |= 128, f = !0, t = t.updateQueue, n.updateQueue = t, Ks(n, t), so(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !it)
                return Mt(n), null;
            } else
              2 * Pe() - o.renderingStartTime > nu && i !== 536870912 && (n.flags |= 128, f = !0, so(o, !1), n.lanes = 4194304);
          o.isBackwards ? (h.sibling = n.child, n.child = h) : (t = o.last, t !== null ? t.sibling = h : n.child = h, o.last = h);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Pe(), t.sibling = null, i = qt.current, Q(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && Pa(n, o.treeForkCount), t) : (Mt(n), null);
      case 22:
      case 23:
        return qn(n), jf(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && Ks(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && U(cr), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Ka(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function PS(t, n) {
    switch (vf(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Ka(Gt), ce(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return we(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (qn(n), n.alternate === null)
            throw Error(l(340));
          or();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (qn(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          or();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return U(qt), null;
      case 4:
        return ce(), null;
      case 10:
        return Ka(n.type), null;
      case 22:
      case 23:
        return qn(n), jf(), t !== null && U(cr), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Ka(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function x0(t, n) {
    switch (vf(n), n.tag) {
      case 3:
        Ka(Gt), ce();
        break;
      case 26:
      case 27:
      case 5:
        we(n);
        break;
      case 4:
        ce();
        break;
      case 31:
        n.memoizedState !== null && qn(n);
        break;
      case 13:
        qn(n);
        break;
      case 19:
        U(qt);
        break;
      case 10:
        Ka(n.type);
        break;
      case 22:
      case 23:
        qn(n), jf(), t !== null && U(cr);
        break;
      case 24:
        Ka(Gt);
    }
  }
  function uo(t, n) {
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
  function ji(t, n, i) {
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
  function w0(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        fg(n, i);
      } catch (o) {
        wt(t, t.return, o);
      }
    }
  }
  function _0(t, n, i) {
    i.props = pr(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      wt(t, n, o);
    }
  }
  function co(t, n) {
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
  function ja(t, n) {
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
  function S0(t) {
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
  function cd(t, n, i) {
    try {
      var o = t.stateNode;
      vE(o, t.type, i, n), o[_e] = n;
    } catch (f) {
      wt(t, t.return, f);
    }
  }
  function E0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ui(t.type) || t.tag === 4;
  }
  function fd(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || E0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ui(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function dd(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Xa));
    else if (o !== 4 && (o === 27 && Ui(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (dd(t, n, i), t = t.sibling; t !== null; )
        dd(t, n, i), t = t.sibling;
  }
  function Ws(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && Ui(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (Ws(t, n, i), t = t.sibling; t !== null; )
        Ws(t, n, i), t = t.sibling;
  }
  function N0(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      un(n, o, i), n[ye] = t, n[_e] = i;
    } catch (h) {
      wt(t, t.return, h);
    }
  }
  var ni = !1, Zt = !1, hd = !1, C0 = typeof WeakSet == "function" ? WeakSet : Set, tn = null;
  function QS(t, n) {
    if (t = t.containerInfo, Od = bu, t = Bp(t), lf(t)) {
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
              for (var se; he !== i || f !== 0 && he.nodeType !== 3 || (M = w + f), he !== h || o !== 0 && he.nodeType !== 3 || (q = w + o), he.nodeType === 3 && (w += he.nodeValue.length), (se = he.firstChild) !== null; )
                le = he, he = se;
              for (; ; ) {
                if (he === t) break t;
                if (le === i && ++re === f && (M = w), le === h && ++fe === o && (q = w), (se = he.nextSibling) !== null) break;
                he = le, le = he.parentNode;
              }
              he = se;
            }
            i = M === -1 || q === -1 ? null : { start: M, end: q };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Ld = { focusedElem: t, selectionRange: i }, bu = !1, tn = n; tn !== null; )
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
                  var Ce = pr(
                    i.type,
                    f
                  );
                  t = o.getSnapshotBeforeUpdate(
                    Ce,
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
                  Bd(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Bd(t);
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
  function R0(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        ii(t, i), o & 4 && uo(5, i);
        break;
      case 1:
        if (ii(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (w) {
              wt(i, i.return, w);
            }
          else {
            var f = pr(
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
        o & 64 && w0(i), o & 512 && co(i, i.return);
        break;
      case 3:
        if (ii(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            fg(t, n);
          } catch (w) {
            wt(i, i.return, w);
          }
        }
        break;
      case 27:
        n === null && o & 4 && N0(i);
      case 26:
      case 5:
        ii(t, i), n === null && o & 4 && S0(i), o & 512 && co(i, i.return);
        break;
      case 12:
        ii(t, i);
        break;
      case 31:
        ii(t, i), o & 4 && A0(t, i);
        break;
      case 13:
        ii(t, i), o & 4 && D0(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = rE.bind(
          null,
          i
        ), NE(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || ni, !o) {
          n = n !== null && n.memoizedState !== null || Zt, f = ni;
          var h = Zt;
          ni = o, (Zt = n) && !h ? ri(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : ii(t, i), ni = f, Zt = h;
        }
        break;
      case 30:
        break;
      default:
        ii(t, i);
    }
  }
  function T0(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, T0(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && rt(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var At = null, Rn = !1;
  function ai(t, n, i) {
    for (i = i.child; i !== null; )
      M0(t, n, i), i = i.sibling;
  }
  function M0(t, n, i) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(nn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Zt || ja(i, n), ai(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Zt || ja(i, n);
        var o = At, f = Rn;
        Ui(i.type) && (At = i.stateNode, Rn = !1), ai(
          t,
          n,
          i
        ), xo(i.stateNode), At = o, Rn = f;
        break;
      case 5:
        Zt || ja(i, n);
      case 6:
        if (o = At, f = Rn, At = null, ai(
          t,
          n,
          i
        ), At = o, Rn = f, At !== null)
          if (Rn)
            try {
              (At.nodeType === 9 ? At.body : At.nodeName === "HTML" ? At.ownerDocument.body : At).removeChild(i.stateNode);
            } catch (h) {
              wt(
                i,
                n,
                h
              );
            }
          else
            try {
              At.removeChild(i.stateNode);
            } catch (h) {
              wt(
                i,
                n,
                h
              );
            }
        break;
      case 18:
        At !== null && (Rn ? (t = At, wv(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), ml(t)) : wv(At, i.stateNode));
        break;
      case 4:
        o = At, f = Rn, At = i.stateNode.containerInfo, Rn = !0, ai(
          t,
          n,
          i
        ), At = o, Rn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ji(2, i, n), Zt || ji(4, i, n), ai(
          t,
          n,
          i
        );
        break;
      case 1:
        Zt || (ja(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && _0(
          i,
          n,
          o
        )), ai(
          t,
          n,
          i
        );
        break;
      case 21:
        ai(
          t,
          n,
          i
        );
        break;
      case 22:
        Zt = (o = Zt) || i.memoizedState !== null, ai(
          t,
          n,
          i
        ), Zt = o;
        break;
      default:
        ai(
          t,
          n,
          i
        );
    }
  }
  function A0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ml(t);
      } catch (i) {
        wt(n, n.return, i);
      }
    }
  }
  function D0(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ml(t);
      } catch (i) {
        wt(n, n.return, i);
      }
  }
  function KS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new C0()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new C0()), n;
      default:
        throw Error(l(435, t.tag));
    }
  }
  function Js(t, n) {
    var i = KS(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = lE.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Tn(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], h = t, w = n, M = w;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (Ui(M.type)) {
                At = M.stateNode, Rn = !1;
                break e;
              }
              break;
            case 5:
              At = M.stateNode, Rn = !1;
              break e;
            case 3:
            case 4:
              At = M.stateNode.containerInfo, Rn = !0;
              break e;
          }
          M = M.return;
        }
        if (At === null) throw Error(l(160));
        M0(h, w, f), At = null, Rn = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        j0(n, t), n = n.sibling;
  }
  var va = null;
  function j0(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, t), Mn(t), o & 4 && (ji(3, t, t.return), uo(3, t), ji(5, t, t.return));
        break;
      case 1:
        Tn(n, t), Mn(t), o & 512 && (Zt || i === null || ja(i, i.return)), o & 64 && ni && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = va;
        if (Tn(n, t), Mn(t), o & 512 && (Zt || i === null || ja(i, i.return)), o & 4) {
          var h = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  o = t.type, i = t.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Ge] || h[ye] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(o), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), un(h, o, i), h[ye] = t, at(h), o = h;
                      break e;
                    case "link":
                      var w = jv(
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
                      if (w = jv(
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
                  h[ye] = t, at(h), o = h;
                }
                t.stateNode = o;
              } else
                zv(
                  f,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Dv(
                f,
                o,
                t.memoizedProps
              );
          else
            h !== o ? (h === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : h.count--, o === null ? zv(
              f,
              t.type,
              t.stateNode
            ) : Dv(
              f,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && cd(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, t), Mn(t), o & 512 && (Zt || i === null || ja(i, i.return)), i !== null && o & 4 && cd(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, t), Mn(t), o & 512 && (Zt || i === null || ja(i, i.return)), t.flags & 32) {
          f = t.stateNode;
          try {
            Hr(f, "");
          } catch (Ce) {
            wt(t, t.return, Ce);
          }
        }
        o & 4 && t.stateNode != null && (f = t.memoizedProps, cd(
          t,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (hd = !0);
        break;
      case 6:
        if (Tn(n, t), Mn(t), o & 4) {
          if (t.stateNode === null)
            throw Error(l(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (Ce) {
            wt(t, t.return, Ce);
          }
        }
        break;
      case 3:
        if (pu = null, f = va, va = hu(n.containerInfo), Tn(n, t), va = f, Mn(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            ml(n.containerInfo);
          } catch (Ce) {
            wt(t, t.return, Ce);
          }
        hd && (hd = !1, z0(t));
        break;
      case 4:
        o = va, va = hu(
          t.stateNode.containerInfo
        ), Tn(n, t), Mn(t), va = o;
        break;
      case 12:
        Tn(n, t), Mn(t);
        break;
      case 31:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Js(t, o)));
        break;
      case 13:
        Tn(n, t), Mn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (tu = Pe()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Js(t, o)));
        break;
      case 22:
        f = t.memoizedState !== null;
        var q = i !== null && i.memoizedState !== null, re = ni, fe = Zt;
        if (ni = re || f, Zt = fe || q, Tn(n, t), Zt = fe, ni = re, Mn(t), o & 8192)
          e: for (n = t.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || q || ni || Zt || gr(t)), i = null, n = t; ; ) {
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
                } catch (Ce) {
                  wt(q, q.return, Ce);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                q = n;
                try {
                  q.stateNode.nodeValue = f ? "" : q.memoizedProps;
                } catch (Ce) {
                  wt(q, q.return, Ce);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                q = n;
                try {
                  var se = q.stateNode;
                  f ? _v(se, !0) : _v(q.stateNode, !1);
                } catch (Ce) {
                  wt(q, q.return, Ce);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Js(t, i))));
        break;
      case 19:
        Tn(n, t), Mn(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Js(t, o)));
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
        for (var i, o = t.return; o !== null; ) {
          if (E0(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, h = fd(t);
            Ws(t, h, f);
            break;
          case 5:
            var w = i.stateNode;
            i.flags & 32 && (Hr(w, ""), i.flags &= -33);
            var M = fd(t);
            Ws(t, M, w);
            break;
          case 3:
          case 4:
            var q = i.stateNode.containerInfo, re = fd(t);
            dd(
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
  function z0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        z0(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function ii(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        R0(t, n.alternate, n), n = n.sibling;
  }
  function gr(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ji(4, n, n.return), gr(n);
          break;
        case 1:
          ja(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && _0(
            n,
            n.return,
            i
          ), gr(n);
          break;
        case 27:
          xo(n.stateNode);
        case 26:
        case 5:
          ja(n, n.return), gr(n);
          break;
        case 22:
          n.memoizedState === null && gr(n);
          break;
        case 30:
          gr(n);
          break;
        default:
          gr(n);
      }
      t = t.sibling;
    }
  }
  function ri(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = t, h = n, w = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ri(
            f,
            h,
            i
          ), uo(4, h);
          break;
        case 1:
          if (ri(
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
                  cg(q[f], M);
            } catch (re) {
              wt(o, o.return, re);
            }
          }
          i && w & 64 && w0(h), co(h, h.return);
          break;
        case 27:
          N0(h);
        case 26:
        case 5:
          ri(
            f,
            h,
            i
          ), i && o === null && w & 4 && S0(h), co(h, h.return);
          break;
        case 12:
          ri(
            f,
            h,
            i
          );
          break;
        case 31:
          ri(
            f,
            h,
            i
          ), i && w & 4 && A0(f, h);
          break;
        case 13:
          ri(
            f,
            h,
            i
          ), i && w & 4 && D0(f, h);
          break;
        case 22:
          h.memoizedState === null && ri(
            f,
            h,
            i
          ), co(h, h.return);
          break;
        case 30:
          break;
        default:
          ri(
            f,
            h,
            i
          );
      }
      n = n.sibling;
    }
  }
  function md(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Ql(i));
  }
  function pd(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Ql(t));
  }
  function ya(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        O0(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function O0(t, n, i, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ya(
          t,
          n,
          i,
          o
        ), f & 2048 && uo(9, n);
        break;
      case 1:
        ya(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        ya(
          t,
          n,
          i,
          o
        ), f & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Ql(t)));
        break;
      case 12:
        if (f & 2048) {
          ya(
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
          ya(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        ya(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        ya(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, w = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? ya(
          t,
          n,
          i,
          o
        ) : fo(t, n) : h._visibility & 2 ? ya(
          t,
          n,
          i,
          o
        ) : (h._visibility |= 2, al(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && md(w, n);
        break;
      case 24:
        ya(
          t,
          n,
          i,
          o
        ), f & 2048 && pd(n.alternate, n);
        break;
      default:
        ya(
          t,
          n,
          i,
          o
        );
    }
  }
  function al(t, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = t, w = n, M = i, q = o, re = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          al(
            h,
            w,
            M,
            q,
            f
          ), uo(8, w);
          break;
        case 23:
          break;
        case 22:
          var fe = w.stateNode;
          w.memoizedState !== null ? fe._visibility & 2 ? al(
            h,
            w,
            M,
            q,
            f
          ) : fo(
            h,
            w
          ) : (fe._visibility |= 2, al(
            h,
            w,
            M,
            q,
            f
          )), f && re & 2048 && md(
            w.alternate,
            w
          );
          break;
        case 24:
          al(
            h,
            w,
            M,
            q,
            f
          ), f && re & 2048 && pd(w.alternate, w);
          break;
        default:
          al(
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
  function fo(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            fo(i, o), f & 2048 && md(
              o.alternate,
              o
            );
            break;
          case 24:
            fo(i, o), f & 2048 && pd(o.alternate, o);
            break;
          default:
            fo(i, o);
        }
        n = n.sibling;
      }
  }
  var ho = 8192;
  function il(t, n, i) {
    if (t.subtreeFlags & ho)
      for (t = t.child; t !== null; )
        L0(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function L0(t, n, i) {
    switch (t.tag) {
      case 26:
        il(
          t,
          n,
          i
        ), t.flags & ho && t.memoizedState !== null && HE(
          i,
          va,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        il(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = va;
        va = hu(t.stateNode.containerInfo), il(
          t,
          n,
          i
        ), va = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = ho, ho = 16777216, il(
          t,
          n,
          i
        ), ho = o) : il(
          t,
          n,
          i
        ));
        break;
      default:
        il(
          t,
          n,
          i
        );
    }
  }
  function k0(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function mo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, B0(
            o,
            t
          );
        }
      k0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        H0(t), t = t.sibling;
  }
  function H0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        mo(t), t.flags & 2048 && ji(9, t, t.return);
        break;
      case 3:
        mo(t);
        break;
      case 12:
        mo(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, eu(t)) : mo(t);
        break;
      default:
        mo(t);
    }
  }
  function eu(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          tn = o, B0(
            o,
            t
          );
        }
      k0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          ji(8, n, n.return), eu(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, eu(n));
          break;
        default:
          eu(n);
      }
      t = t.sibling;
    }
  }
  function B0(t, n) {
    for (; tn !== null; ) {
      var i = tn;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ji(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Ql(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, tn = o;
      else
        e: for (i = t; tn !== null; ) {
          o = tn;
          var f = o.sibling, h = o.return;
          if (T0(o), o === i) {
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
  var WS = {
    getCacheForType: function(t) {
      var n = on(Gt), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return on(Gt).controller.signal;
    }
  }, JS = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Rt = null, Qe = null, et = 0, xt = 0, $n = null, zi = !1, rl = !1, gd = !1, li = 0, Bt = 0, Oi = 0, vr = 0, vd = 0, In = 0, ll = 0, po = null, An = null, yd = !1, tu = 0, U0 = 0, nu = 1 / 0, au = null, Li = null, Jt = 0, ki = null, ol = null, oi = 0, bd = 0, xd = null, V0 = null, go = 0, wd = null;
  function Yn() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : T.T !== null ? Rd() : me();
  }
  function q0() {
    if (In === 0)
      if ((et & 536870912) === 0 || it) {
        var t = Ln;
        Ln <<= 1, (Ln & 3932160) === 0 && (Ln = 262144), In = t;
      } else In = 536870912;
    return t = Vn.current, t !== null && (t.flags |= 32), In;
  }
  function Dn(t, n, i) {
    (t === Rt && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null) && (sl(t, 0), Hi(
      t,
      et,
      In,
      !1
    )), pt(t, i), ((ht & 2) === 0 || t !== Rt) && (t === Rt && ((ht & 2) === 0 && (vr |= i), Bt === 4 && Hi(
      t,
      et,
      In,
      !1
    )), za(t));
  }
  function $0(t, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || yt(t, n), f = o ? nE(t, n) : Sd(t, n, !0), h = o;
    do {
      if (f === 0) {
        rl && !o && Hi(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, h && !eE(i)) {
          f = Sd(t, n, !1), h = !1;
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
              f = po;
              var q = M.current.memoizedState.isDehydrated;
              if (q && (sl(M, w).flags |= 256), w = Sd(
                M,
                w,
                !1
              ), w !== 2) {
                if (gd && !q) {
                  M.errorRecoveryDisabledLanes |= h, vr |= h, f = 4;
                  break e;
                }
                h = An, An = f, h !== null && (An === null ? An = h : An.push.apply(
                  An,
                  h
                ));
              }
              f = w;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          sl(t, 0), Hi(t, n, 0, !0);
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
                In,
                !zi
              );
              break e;
            case 2:
              An = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = tu + 300 - Pe(), 10 < f)) {
            if (Hi(
              o,
              n,
              In,
              !zi
            ), ke(o, 0, !0) !== 0) break e;
            oi = n, o.timeoutHandle = bv(
              I0.bind(
                null,
                o,
                i,
                An,
                au,
                yd,
                n,
                In,
                vr,
                ll,
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
          I0(
            o,
            i,
            An,
            au,
            yd,
            n,
            In,
            vr,
            ll,
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
    za(t);
  }
  function I0(t, n, i, o, f, h, w, M, q, re, fe, he, le, se) {
    if (t.timeoutHandle = -1, he = n.subtreeFlags, he & 8192 || (he & 16785408) === 16785408) {
      he = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Xa
      }, L0(
        n,
        h,
        he
      );
      var Ce = (h & 62914560) === h ? tu - Pe() : (h & 4194048) === h ? U0 - Pe() : 0;
      if (Ce = BE(
        he,
        Ce
      ), Ce !== null) {
        oi = h, t.cancelPendingCommit = Ce(
          K0.bind(
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
            se
          )
        ), Hi(t, h, w, !re);
        return;
      }
    }
    K0(
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
  function eE(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Bn(h(), f)) return !1;
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
    n &= ~vd, n &= ~vr, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ut(f), w = 1 << h;
      o[h] = -1, f &= ~w;
    }
    i !== 0 && ha(t, i, n);
  }
  function iu() {
    return (ht & 6) === 0 ? (vo(0), !1) : !0;
  }
  function _d() {
    if (Qe !== null) {
      if (xt === 0)
        var t = Qe.return;
      else
        t = Qe, Qa = sr = null, Bf(t), Wr = null, Wl = 0, t = Qe;
      for (; t !== null; )
        x0(t.alternate, t), t = t.return;
      Qe = null;
    }
  }
  function sl(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, xE(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), oi = 0, _d(), Rt = t, Qe = i = Za(t.current, null), et = n, xt = 0, $n = null, zi = !1, rl = yt(t, n), gd = !1, ll = In = vd = vr = Oi = Bt = 0, An = po = null, yd = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - Ut(o), h = 1 << f;
        n |= t[f], o &= ~h;
      }
    return li = n, Ns(), i;
  }
  function Y0(t, n) {
    qe = null, T.H = lo, n === Kr || n === zs ? (n = lg(), xt = 3) : n === Cf ? (n = lg(), xt = 4) : xt = n === ed ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, $n = n, Qe === null && (Bt = 1, Fs(
      t,
      Jn(n, t.current)
    ));
  }
  function G0() {
    var t = Vn.current;
    return t === null ? !0 : (et & 4194048) === et ? aa === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === aa : !1;
  }
  function X0() {
    var t = T.H;
    return T.H = lo, t === null ? lo : t;
  }
  function F0() {
    var t = T.A;
    return T.A = WS, t;
  }
  function ru() {
    Bt = 4, zi || (et & 4194048) !== et && Vn.current !== null || (rl = !0), (Oi & 134217727) === 0 && (vr & 134217727) === 0 || Rt === null || Hi(
      Rt,
      et,
      In,
      !1
    );
  }
  function Sd(t, n, i) {
    var o = ht;
    ht |= 2;
    var f = X0(), h = F0();
    (Rt !== t || et !== n) && (au = null, sl(t, n)), n = !1;
    var w = Bt;
    e: do
      try {
        if (xt !== 0 && Qe !== null) {
          var M = Qe, q = $n;
          switch (xt) {
            case 8:
              _d(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Vn.current === null && (n = !0);
              var re = xt;
              if (xt = 0, $n = null, ul(t, M, q, re), i && rl) {
                w = 0;
                break e;
              }
              break;
            default:
              re = xt, xt = 0, $n = null, ul(t, M, q, re);
          }
        }
        tE(), w = Bt;
        break;
      } catch (fe) {
        Y0(t, fe);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Qa = sr = null, ht = o, T.H = f, T.A = h, Qe === null && (Rt = null, et = 0, Ns()), w;
  }
  function tE() {
    for (; Qe !== null; ) Z0(Qe);
  }
  function nE(t, n) {
    var i = ht;
    ht |= 2;
    var o = X0(), f = F0();
    Rt !== t || et !== n ? (au = null, nu = Pe() + 500, sl(t, n)) : rl = yt(
      t,
      n
    );
    e: do
      try {
        if (xt !== 0 && Qe !== null) {
          n = Qe;
          var h = $n;
          t: switch (xt) {
            case 1:
              xt = 0, $n = null, ul(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (ig(h)) {
                xt = 0, $n = null, P0(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Rt !== t || (xt = 7), za(t);
              }, h.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              ig(h) ? (xt = 0, $n = null, P0(n)) : (xt = 0, $n = null, ul(t, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (Qe.tag) {
                case 26:
                  w = Qe.memoizedState;
                case 5:
                case 27:
                  var M = Qe;
                  if (w ? Ov(w) : M.stateNode.complete) {
                    xt = 0, $n = null;
                    var q = M.sibling;
                    if (q !== null) Qe = q;
                    else {
                      var re = M.return;
                      re !== null ? (Qe = re, lu(re)) : Qe = null;
                    }
                    break t;
                  }
              }
              xt = 0, $n = null, ul(t, n, h, 5);
              break;
            case 6:
              xt = 0, $n = null, ul(t, n, h, 6);
              break;
            case 8:
              _d(), Bt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        aE();
        break;
      } catch (fe) {
        Y0(t, fe);
      }
    while (!0);
    return Qa = sr = null, T.H = o, T.A = f, ht = i, Qe !== null ? 0 : (Rt = null, et = 0, Ns(), Bt);
  }
  function aE() {
    for (; Qe !== null && !We(); )
      Z0(Qe);
  }
  function Z0(t) {
    var n = y0(t.alternate, t, li);
    t.memoizedProps = t.pendingProps, n === null ? lu(t) : Qe = n;
  }
  function P0(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = d0(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = d0(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        Bf(n);
      default:
        x0(i, n), n = Qe = Fp(n, li), n = y0(i, n, li);
    }
    t.memoizedProps = t.pendingProps, n === null ? lu(t) : Qe = n;
  }
  function ul(t, n, i, o) {
    Qa = sr = null, Bf(n), Wr = null, Wl = 0;
    var f = n.return;
    try {
      if (GS(
        t,
        f,
        n,
        i,
        et
      )) {
        Bt = 1, Fs(
          t,
          Jn(i, t.current)
        ), Qe = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Qe = f, h;
      Bt = 1, Fs(
        t,
        Jn(i, t.current)
      ), Qe = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? t = !0 : rl || (et & 536870912) !== 0 ? t = !1 : (zi = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Vn.current, o !== null && o.tag === 13 && (o.flags |= 16384))), Q0(n, t)) : lu(n);
  }
  function lu(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        Q0(
          n,
          zi
        );
        return;
      }
      t = n.return;
      var i = ZS(
        n.alternate,
        n,
        li
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
  function Q0(t, n) {
    do {
      var i = PS(t.alternate, t);
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
  function K0(t, n, i, o, f, h, w, M, q) {
    t.cancelPendingCommit = null;
    do
      ou();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === t.current) throw Error(l(177));
      if (h = n.lanes | n.childLanes, h |= ff, Wt(
        t,
        i,
        h,
        w,
        M,
        q
      ), t === Rt && (Qe = Rt = null, et = 0), ol = n, ki = t, oi = i, bd = h, xd = f, V0 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, oE(Lt, function() {
        return nv(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = T.T, T.T = null, f = L.p, L.p = 2, w = ht, ht |= 4;
        try {
          QS(t, n, i);
        } finally {
          ht = w, L.p = f, T.T = o;
        }
      }
      Jt = 1, W0(), J0(), ev();
    }
  }
  function W0() {
    if (Jt === 1) {
      Jt = 0;
      var t = ki, n = ol, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          j0(n, t);
          var h = Ld, w = Bp(t.containerInfo), M = h.focusedElem, q = h.selectionRange;
          if (w !== M && M && M.ownerDocument && Hp(
            M.ownerDocument.documentElement,
            M
          )) {
            if (q !== null && lf(M)) {
              var re = q.start, fe = q.end;
              if (fe === void 0 && (fe = re), "selectionStart" in M)
                M.selectionStart = re, M.selectionEnd = Math.min(
                  fe,
                  M.value.length
                );
              else {
                var he = M.ownerDocument || document, le = he && he.defaultView || window;
                if (le.getSelection) {
                  var se = le.getSelection(), Ce = M.textContent.length, Le = Math.min(q.start, Ce), Nt = q.end === void 0 ? Le : Math.min(q.end, Ce);
                  !se.extend && Le > Nt && (w = Nt, Nt = Le, Le = w);
                  var W = kp(
                    M,
                    Le
                  ), F = kp(
                    M,
                    Nt
                  );
                  if (W && F && (se.rangeCount !== 1 || se.anchorNode !== W.node || se.anchorOffset !== W.offset || se.focusNode !== F.node || se.focusOffset !== F.offset)) {
                    var ie = he.createRange();
                    ie.setStart(W.node, W.offset), se.removeAllRanges(), Le > Nt ? (se.addRange(ie), se.extend(F.node, F.offset)) : (ie.setEnd(F.node, F.offset), se.addRange(ie));
                  }
                }
              }
            }
            for (he = [], se = M; se = se.parentNode; )
              se.nodeType === 1 && he.push({
                element: se,
                left: se.scrollLeft,
                top: se.scrollTop
              });
            for (typeof M.focus == "function" && M.focus(), M = 0; M < he.length; M++) {
              var de = he[M];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          bu = !!Od, Ld = Od = null;
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      t.current = n, Jt = 2;
    }
  }
  function J0() {
    if (Jt === 2) {
      Jt = 0;
      var t = ki, n = ol, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = T.T, T.T = null;
        var o = L.p;
        L.p = 2;
        var f = ht;
        ht |= 4;
        try {
          R0(t, n.alternate, n);
        } finally {
          ht = f, L.p = o, T.T = i;
        }
      }
      Jt = 3;
    }
  }
  function ev() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Ze();
      var t = ki, n = ol, i = oi, o = V0;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, ol = ki = null, tv(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (f === 0 && (Li = null), ee(i), n = n.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
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
      (oi & 3) !== 0 && ou(), za(t), f = t.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? t === wd ? go++ : (go = 0, wd = t) : go = 0, vo(0);
    }
  }
  function tv(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Ql(n)));
  }
  function ou() {
    return W0(), J0(), ev(), nv();
  }
  function nv() {
    if (Jt !== 5) return !1;
    var t = ki, n = bd;
    bd = 0;
    var i = ee(oi), o = T.T, f = L.p;
    try {
      L.p = 32 > i ? 32 : i, T.T = null, i = xd, xd = null;
      var h = ki, w = oi;
      if (Jt = 0, ol = ki = null, oi = 0, (ht & 6) !== 0) throw Error(l(331));
      var M = ht;
      if (ht |= 4, H0(h.current), O0(
        h,
        h.current,
        w,
        i
      ), ht = M, vo(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(nn, h);
        } catch {
        }
      return !0;
    } finally {
      L.p = f, T.T = o, tv(t, n);
    }
  }
  function av(t, n, i) {
    n = Jn(i, n), n = Jf(t.stateNode, n, 2), t = Mi(t, n, 2), t !== null && (pt(t, 2), za(t));
  }
  function wt(t, n, i) {
    if (t.tag === 3)
      av(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          av(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Li === null || !Li.has(o))) {
            t = Jn(i, t), i = i0(2), o = Mi(n, i, 2), o !== null && (r0(
              i,
              o,
              n,
              t
            ), pt(o, 2), za(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Ed(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new JS();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (gd = !0, f.add(i), t = iE.bind(null, t, n, i), n.then(t, t));
  }
  function iE(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Rt === t && (et & i) === i && (Bt === 4 || Bt === 3 && (et & 62914560) === et && 300 > Pe() - tu ? (ht & 2) === 0 && sl(t, 0) : vd |= i, ll === et && (ll = 0)), za(t);
  }
  function iv(t, n) {
    n === 0 && (n = Vt()), t = rr(t, n), t !== null && (pt(t, n), za(t));
  }
  function rE(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), iv(t, i);
  }
  function lE(t, n) {
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
    o !== null && o.delete(n), iv(t, i);
  }
  function oE(t, n) {
    return Ie(t, n);
  }
  var su = null, cl = null, Nd = !1, uu = !1, Cd = !1, Bi = 0;
  function za(t) {
    t !== cl && t.next === null && (cl === null ? su = cl = t : cl = cl.next = t), uu = !0, Nd || (Nd = !0, uE());
  }
  function vo(t, n) {
    if (!Cd && uu) {
      Cd = !0;
      do
        for (var i = !1, o = su; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var w = o.suspendedLanes, M = o.pingedLanes;
              h = (1 << 31 - Ut(42 | t) + 1) - 1, h &= f & ~(w & ~M), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (i = !0, sv(o, h));
          } else
            h = et, h = ke(
              o,
              o === Rt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || yt(o, h) || (i = !0, sv(o, h));
          o = o.next;
        }
      while (i);
      Cd = !1;
    }
  }
  function sE() {
    rv();
  }
  function rv() {
    uu = Nd = !1;
    var t = 0;
    Bi !== 0 && bE() && (t = Bi);
    for (var n = Pe(), i = null, o = su; o !== null; ) {
      var f = o.next, h = lv(o, n);
      h === 0 ? (o.next = null, i === null ? su = f : i.next = f, f === null && (cl = i)) : (i = o, (t !== 0 || (h & 3) !== 0) && (uu = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || vo(t), Bi !== 0 && (Bi = 0);
  }
  function lv(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var w = 31 - Ut(h), M = 1 << w, q = f[w];
      q === -1 ? ((M & i) === 0 || (M & o) !== 0) && (f[w] = kt(M, n)) : q <= n && (t.expiredLanes |= M), h &= ~M;
    }
    if (n = Rt, i = et, i = ke(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (xt === 2 || xt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && _t(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || yt(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && _t(o), ee(i)) {
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
      return o = ov.bind(null, t), i = Ie(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && _t(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function ov(t, n) {
    if (Jt !== 0 && Jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (ou() && t.callbackNode !== i)
      return null;
    var o = et;
    return o = ke(
      t,
      t === Rt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : ($0(t, o, n), lv(t, Pe()), t.callbackNode != null && t.callbackNode === i ? ov.bind(null, t) : null);
  }
  function sv(t, n) {
    if (ou()) return null;
    $0(t, n, !0);
  }
  function uE() {
    wE(function() {
      (ht & 6) !== 0 ? Ie(
        vt,
        sE
      ) : rv();
    });
  }
  function Rd() {
    if (Bi === 0) {
      var t = Pr;
      t === 0 && (t = da, da <<= 1, (da & 261888) === 0 && (da = 256)), Bi = t;
    }
    return Bi;
  }
  function uv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : vs("" + t);
  }
  function cv(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function cE(t, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var h = uv(
        (f[_e] || null).action
      ), w = o.submitter;
      w && (n = (n = w[_e] || null) ? uv(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var M = new ws(
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
                if (Bi !== 0) {
                  var q = w ? cv(f, w) : new FormData(f);
                  Ff(
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
                typeof h == "function" && (M.preventDefault(), q = w ? cv(f, w) : new FormData(f), Ff(
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
  for (var Td = 0; Td < cf.length; Td++) {
    var Md = cf[Td], fE = Md.toLowerCase(), dE = Md[0].toUpperCase() + Md.slice(1);
    ga(
      fE,
      "on" + dE
    );
  }
  ga(qp, "onAnimationEnd"), ga($p, "onAnimationIteration"), ga(Ip, "onAnimationStart"), ga("dblclick", "onDoubleClick"), ga("focusin", "onFocus"), ga("focusout", "onBlur"), ga(TS, "onTransitionRun"), ga(MS, "onTransitionStart"), ga(AS, "onTransitionCancel"), ga(Yp, "onTransitionEnd"), an("onMouseEnter", ["mouseout", "mouseover"]), an("onMouseLeave", ["mouseout", "mouseover"]), an("onPointerEnter", ["pointerout", "pointerover"]), an("onPointerLeave", ["pointerout", "pointerover"]), fn(
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
  var yo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), hE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yo)
  );
  function fv(t, n) {
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
              Es(fe);
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
              Es(fe);
            }
            f.currentTarget = null, h = q;
          }
      }
    }
  }
  function Ke(t, n) {
    var i = n[Ae];
    i === void 0 && (i = n[Ae] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (dv(n, t, 2, !1), i.add(o));
  }
  function Ad(t, n, i) {
    var o = 0;
    n && (o |= 4), dv(
      i,
      t,
      o,
      n
    );
  }
  var cu = "_reactListening" + Math.random().toString(36).slice(2);
  function Dd(t) {
    if (!t[cu]) {
      t[cu] = !0, Ma.forEach(function(i) {
        i !== "selectionchange" && (hE.has(i) || Ad(i, !1, t), Ad(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[cu] || (n[cu] = !0, Ad("selectionchange", !1, n));
    }
  }
  function dv(t, n, i, o) {
    switch (qv(n)) {
      case 2:
        var f = qE;
        break;
      case 8:
        f = $E;
        break;
      default:
        f = Xd;
    }
    i = f.bind(
      null,
      n,
      i,
      t
    ), f = void 0, !Qc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : t.addEventListener(n, i, !0) : f !== void 0 ? t.addEventListener(n, i, {
      passive: f
    }) : t.addEventListener(n, i, !1);
  }
  function jd(t, n, i, o, f) {
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
    vp(function() {
      var re = h, fe = Zc(i), he = [];
      e: {
        var le = Gp.get(t);
        if (le !== void 0) {
          var se = ws, Ce = t;
          switch (t) {
            case "keypress":
              if (bs(i) === 0) break e;
            case "keydown":
            case "keyup":
              se = lS;
              break;
            case "focusin":
              Ce = "focus", se = ef;
              break;
            case "focusout":
              Ce = "blur", se = ef;
              break;
            case "beforeblur":
            case "afterblur":
              se = ef;
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
              se = xp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              se = Z_;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              se = uS;
              break;
            case qp:
            case $p:
            case Ip:
              se = K_;
              break;
            case Yp:
              se = fS;
              break;
            case "scroll":
            case "scrollend":
              se = X_;
              break;
            case "wheel":
              se = hS;
              break;
            case "copy":
            case "cut":
            case "paste":
              se = J_;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              se = _p;
              break;
            case "toggle":
            case "beforetoggle":
              se = pS;
          }
          var Le = (n & 4) !== 0, Nt = !Le && (t === "scroll" || t === "scrollend"), W = Le ? le !== null ? le + "Capture" : null : le;
          Le = [];
          for (var F = re, ie; F !== null; ) {
            var de = F;
            if (ie = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || ie === null || W === null || (de = Ul(F, W), de != null && Le.push(
              bo(F, de, ie)
            )), Nt) break;
            F = F.return;
          }
          0 < Le.length && (le = new se(
            le,
            Ce,
            null,
            i,
            fe
          ), he.push({ event: le, listeners: Le }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = t === "mouseover" || t === "pointerover", se = t === "mouseout" || t === "pointerout", le && i !== Fc && (Ce = i.relatedTarget || i.fromElement) && (Ct(Ce) || Ce[be]))
            break e;
          if ((se || le) && (le = fe.window === fe ? fe : (le = fe.ownerDocument) ? le.defaultView || le.parentWindow : window, se ? (Ce = i.relatedTarget || i.toElement, se = re, Ce = Ce ? Ct(Ce) : null, Ce !== null && (Nt = u(Ce), Le = Ce.tag, Ce !== Nt || Le !== 5 && Le !== 27 && Le !== 6) && (Ce = null)) : (se = null, Ce = re), se !== Ce)) {
            if (Le = xp, de = "onMouseLeave", W = "onMouseEnter", F = "mouse", (t === "pointerout" || t === "pointerover") && (Le = _p, de = "onPointerLeave", W = "onPointerEnter", F = "pointer"), Nt = se == null ? le : Je(se), ie = Ce == null ? le : Je(Ce), le = new Le(
              de,
              F + "leave",
              se,
              i,
              fe
            ), le.target = Nt, le.relatedTarget = ie, de = null, Ct(fe) === re && (Le = new Le(
              W,
              F + "enter",
              Ce,
              i,
              fe
            ), Le.target = ie, Le.relatedTarget = Nt, de = Le), Nt = de, se && Ce)
              t: {
                for (Le = mE, W = se, F = Ce, ie = 0, de = W; de; de = Le(de))
                  ie++;
                de = 0;
                for (var ze = F; ze; ze = Le(ze))
                  de++;
                for (; 0 < ie - de; )
                  W = Le(W), ie--;
                for (; 0 < de - ie; )
                  F = Le(F), de--;
                for (; ie--; ) {
                  if (W === F || F !== null && W === F.alternate) {
                    Le = W;
                    break t;
                  }
                  W = Le(W), F = Le(F);
                }
                Le = null;
              }
            else Le = null;
            se !== null && hv(
              he,
              le,
              se,
              Le,
              !1
            ), Ce !== null && Nt !== null && hv(
              he,
              Nt,
              Ce,
              Le,
              !0
            );
          }
        }
        e: {
          if (le = re ? Je(re) : window, se = le.nodeName && le.nodeName.toLowerCase(), se === "select" || se === "input" && le.type === "file")
            var ut = Ap;
          else if (Tp(le))
            if (Dp)
              ut = NS;
            else {
              ut = SS;
              var Re = _S;
            }
          else
            se = le.nodeName, !se || se.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? re && Xc(re.elementType) && (ut = Ap) : ut = ES;
          if (ut && (ut = ut(t, re))) {
            Mp(
              he,
              ut,
              i,
              fe
            );
            break e;
          }
          Re && Re(t, le, re), t === "focusout" && re && le.type === "number" && re.memoizedProps.value != null && Hl(le, "number", le.value);
        }
        switch (Re = re ? Je(re) : window, t) {
          case "focusin":
            (Tp(Re) || Re.contentEditable === "true") && (qr = Re, of = re, Fl = null);
            break;
          case "focusout":
            Fl = of = qr = null;
            break;
          case "mousedown":
            sf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            sf = !1, Up(he, i, fe);
            break;
          case "selectionchange":
            if (RS) break;
          case "keydown":
          case "keyup":
            Up(he, i, fe);
        }
        var Ye;
        if (nf)
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
          Vr ? Cp(t, i) && (tt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Sp && i.locale !== "ko" && (Vr || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Vr && (Ye = yp()) : (_i = fe, Kc = "value" in _i ? _i.value : _i.textContent, Vr = !0)), Re = fu(re, tt), 0 < Re.length && (tt = new wp(
          tt,
          t,
          null,
          i,
          fe
        ), he.push({ event: tt, listeners: Re }), Ye ? tt.data = Ye : (Ye = Rp(i), Ye !== null && (tt.data = Ye)))), (Ye = vS ? yS(t, i) : bS(t, i)) && (tt = fu(re, "onBeforeInput"), 0 < tt.length && (Re = new wp(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          fe
        ), he.push({
          event: Re,
          listeners: tt
        }), Re.data = Ye)), cE(
          he,
          t,
          re,
          i,
          fe
        );
      }
      fv(he, n);
    });
  }
  function bo(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function fu(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = Ul(t, i), f != null && o.unshift(
        bo(t, f, h)
      ), f = Ul(t, n), f != null && o.push(
        bo(t, f, h)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function mE(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function hv(t, n, i, o, f) {
    for (var h = n._reactName, w = []; i !== null && i !== o; ) {
      var M = i, q = M.alternate, re = M.stateNode;
      if (M = M.tag, q !== null && q === o) break;
      M !== 5 && M !== 26 && M !== 27 || re === null || (q = re, f ? (re = Ul(i, h), re != null && w.unshift(
        bo(i, re, q)
      )) : f || (re = Ul(i, h), re != null && w.push(
        bo(i, re, q)
      ))), i = i.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var pE = /\r\n?/g, gE = /\u0000|\uFFFD/g;
  function mv(t) {
    return (typeof t == "string" ? t : "" + t).replace(pE, `
`).replace(gE, "");
  }
  function pv(t, n) {
    return n = mv(n), mv(t) === n;
  }
  function Et(t, n, i, o, f, h) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Hr(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Hr(t, "" + o);
        break;
      case "className":
        pa(t, "class", o);
        break;
      case "tabIndex":
        pa(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        pa(t, i, o);
        break;
      case "style":
        pp(t, o, h);
        break;
      case "data":
        if (n !== "object") {
          pa(t, "data", o);
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
        o = vs("" + o), t.setAttribute(i, o);
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
        o = vs("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = Xa);
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
        i = vs("" + o), t.setAttributeNS(
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
        Ke("beforetoggle", t), Ke("toggle", t), ma(t, "popover", o);
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
        ma(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Y_.get(i) || i, ma(t, i, o));
    }
  }
  function zd(t, n, i, o, f, h) {
    switch (i) {
      case "style":
        pp(t, o, h);
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
        typeof o == "string" ? Hr(t, o) : (typeof o == "number" || typeof o == "bigint") && Hr(t, "" + o);
        break;
      case "onScroll":
        o != null && Ke("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ke("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Xa);
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
        if (!kn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), n = i.slice(2, f ? i.length - 7 : void 0), h = t[_e] || null, h = h != null ? h[i] : null, typeof h == "function" && t.removeEventListener(n, h, f), typeof o == "function")) {
              typeof h != "function" && h !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, f);
              break e;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : ma(t, i, o);
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
        kr(
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
        n = h, i = w, t.multiple = !!o, n != null ? wi(t, !!o, n, !1) : i != null && wi(t, !!o, i, !0);
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
        hp(t, o, f, h);
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
        for (o = 0; o < yo.length; o++)
          Ke(yo[o], t);
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
        if (Xc(n)) {
          for (fe in i)
            i.hasOwnProperty(fe) && (o = i[fe], o !== void 0 && zd(
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
  function vE(t, n, i, o) {
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
        for (se in i) {
          var he = i[se];
          if (i.hasOwnProperty(se) && he != null)
            switch (se) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = he;
              default:
                o.hasOwnProperty(se) || Et(t, n, se, null, o, he);
            }
        }
        for (var le in o) {
          var se = o[le];
          if (he = i[le], o.hasOwnProperty(le) && (se != null || he != null))
            switch (le) {
              case "type":
                h = se;
                break;
              case "name":
                f = se;
                break;
              case "checked":
                re = se;
                break;
              case "defaultChecked":
                fe = se;
                break;
              case "value":
                w = se;
                break;
              case "defaultValue":
                M = se;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (se != null)
                  throw Error(l(137, n));
                break;
              default:
                se !== he && Et(
                  t,
                  n,
                  le,
                  se,
                  o,
                  he
                );
            }
        }
        tr(
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
        se = w = M = le = null;
        for (h in i)
          if (q = i[h], i.hasOwnProperty(h) && q != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                se = q;
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
        n = M, i = w, o = se, le != null ? wi(t, !!i, le, !1) : !!o != !!i && (n != null ? wi(t, !!i, n, !0) : wi(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        se = le = null;
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
                se = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(l(91));
                break;
              default:
                f !== h && Et(t, n, w, f, o, h);
            }
        Bl(t, le, se);
        return;
      case "option":
        for (var Ce in i)
          if (le = i[Ce], i.hasOwnProperty(Ce) && le != null && !o.hasOwnProperty(Ce))
            switch (Ce) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  n,
                  Ce,
                  null,
                  o,
                  le
                );
            }
        for (q in o)
          if (le = o[q], se = i[q], o.hasOwnProperty(q) && le !== se && (le != null || se != null))
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
                  se
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
          if (le = o[re], se = i[re], o.hasOwnProperty(re) && le !== se && (le != null || se != null))
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
                  se
                );
            }
        return;
      default:
        if (Xc(n)) {
          for (var Nt in i)
            le = i[Nt], i.hasOwnProperty(Nt) && le !== void 0 && !o.hasOwnProperty(Nt) && zd(
              t,
              n,
              Nt,
              void 0,
              o,
              le
            );
          for (fe in o)
            le = o[fe], se = i[fe], !o.hasOwnProperty(fe) || le === se || le === void 0 && se === void 0 || zd(
              t,
              n,
              fe,
              le,
              o,
              se
            );
          return;
        }
    }
    for (var W in i)
      le = i[W], i.hasOwnProperty(W) && le != null && !o.hasOwnProperty(W) && Et(t, n, W, null, o, le);
    for (he in o)
      le = o[he], se = i[he], !o.hasOwnProperty(he) || le === se || le == null && se == null || Et(t, n, he, le, o, se);
  }
  function gv(t) {
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
  function yE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], h = f.transferSize, w = f.initiatorType, M = f.duration;
        if (h && M && gv(w)) {
          for (w = 0, M = f.responseEnd, o += 1; o < i.length; o++) {
            var q = i[o], re = q.startTime;
            if (re > M) break;
            var fe = q.transferSize, he = q.initiatorType;
            fe && gv(he) && (q = q.responseEnd, w += fe * (q < M ? 1 : (M - re) / (q - re)));
          }
          if (--o, n += 8 * (h + w) / (f.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Od = null, Ld = null;
  function du(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function vv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function yv(t, n) {
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
  function kd(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Hd = null;
  function bE() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Hd ? !1 : (Hd = t, !0) : (Hd = null, !1);
  }
  var bv = typeof setTimeout == "function" ? setTimeout : void 0, xE = typeof clearTimeout == "function" ? clearTimeout : void 0, xv = typeof Promise == "function" ? Promise : void 0, wE = typeof queueMicrotask == "function" ? queueMicrotask : typeof xv < "u" ? function(t) {
    return xv.resolve(null).then(t).catch(_E);
  } : bv;
  function _E(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ui(t) {
    return t === "head";
  }
  function wv(t, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (t.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(f), ml(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          xo(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, xo(i);
          for (var h = i.firstChild; h; ) {
            var w = h.nextSibling, M = h.nodeName;
            h[Ge] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && h.rel.toLowerCase() === "stylesheet" || i.removeChild(h), h = w;
          }
        } else
          i === "body" && xo(t.ownerDocument.body);
      i = f;
    } while (i);
    ml(n);
  }
  function _v(t, n) {
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
  function Bd(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Bd(i), rt(i);
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
  function SE(t, n, i, o) {
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
      if (t = ia(t.nextSibling), t === null) break;
    }
    return null;
  }
  function EE(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ia(t.nextSibling), t === null)) return null;
    return t;
  }
  function Sv(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ia(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ud(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Vd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function NE(t, n) {
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
  function ia(t) {
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
  var qd = null;
  function Ev(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return ia(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Nv(t) {
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
  function Cv(t, n, i) {
    switch (n = du(i), t) {
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
  function xo(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    rt(t);
  }
  var ra = /* @__PURE__ */ new Map(), Rv = /* @__PURE__ */ new Set();
  function hu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var si = L.d;
  L.d = {
    f: CE,
    r: RE,
    D: TE,
    C: ME,
    L: AE,
    m: DE,
    X: zE,
    S: jE,
    M: OE
  };
  function CE() {
    var t = si.f(), n = iu();
    return t || n;
  }
  function RE(t) {
    var n = st(t);
    n !== null && n.tag === 5 && n.type === "form" ? Yg(n) : si.r(t);
  }
  var fl = typeof document > "u" ? null : document;
  function Tv(t, n, i) {
    var o = fl;
    if (o && typeof n == "string" && n) {
      var f = rn(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), Rv.has(f) || (Rv.add(f), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), un(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function TE(t) {
    si.D(t), Tv("dns-prefetch", t, null);
  }
  function ME(t, n) {
    si.C(t, n), Tv("preconnect", t, n);
  }
  function AE(t, n, i) {
    si.L(t, n, i);
    var o = fl;
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
          h = dl(t);
          break;
        case "script":
          h = hl(t);
      }
      ra.has(h) || (t = g(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), ra.set(h, t), o.querySelector(f) !== null || n === "style" && o.querySelector(wo(h)) || n === "script" && o.querySelector(_o(h)) || (n = o.createElement("link"), un(n, "link", t), at(n), o.head.appendChild(n)));
    }
  }
  function DE(t, n) {
    si.m(t, n);
    var i = fl;
    if (i && t) {
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
      if (!ra.has(h) && (t = g({ rel: "modulepreload", href: t }, n), ra.set(h, t), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(_o(h)))
              return;
        }
        o = i.createElement("link"), un(o, "link", t), at(o), i.head.appendChild(o);
      }
    }
  }
  function jE(t, n, i) {
    si.S(t, n, i);
    var o = fl;
    if (o && t) {
      var f = Ot(o).hoistableStyles, h = dl(t);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var M = { loading: 0, preload: null };
        if (w = o.querySelector(
          wo(h)
        ))
          M.loading = 5;
        else {
          t = g(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = ra.get(h)) && $d(t, i);
          var q = w = o.createElement("link");
          at(q), un(q, "link", t), q._p = new Promise(function(re, fe) {
            q.onload = re, q.onerror = fe;
          }), q.addEventListener("load", function() {
            M.loading |= 1;
          }), q.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, mu(w, n, o);
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
  function zE(t, n) {
    si.X(t, n);
    var i = fl;
    if (i && t) {
      var o = Ot(i).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = i.querySelector(_o(f)), h || (t = g({ src: t, async: !0 }, n), (n = ra.get(f)) && Id(t, n), h = i.createElement("script"), at(h), un(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function OE(t, n) {
    si.M(t, n);
    var i = fl;
    if (i && t) {
      var o = Ot(i).hoistableScripts, f = hl(t), h = o.get(f);
      h || (h = i.querySelector(_o(f)), h || (t = g({ src: t, async: !0, type: "module" }, n), (n = ra.get(f)) && Id(t, n), h = i.createElement("script"), at(h), un(h, "link", t), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function Mv(t, n, i, o) {
    var f = (f = pe.current) ? hu(f) : null;
    if (!f) throw Error(l(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = dl(i.href), i = Ot(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = dl(i.href);
          var h = Ot(
            f
          ).hoistableStyles, w = h.get(t);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(t, w), (h = f.querySelector(
            wo(t)
          )) && !h._p && (w.instance = h, w.state.loading = 5), ra.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, ra.set(t, i), h || LE(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = hl(i), i = Ot(
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
  function dl(t) {
    return 'href="' + rn(t) + '"';
  }
  function wo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Av(t) {
    return g({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function LE(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), un(n, "link", i), at(n), t.head.appendChild(n));
  }
  function hl(t) {
    return '[src="' + rn(t) + '"]';
  }
  function _o(t) {
    return "script[async]" + t;
  }
  function Dv(t, n, i) {
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
          ), at(o), un(o, "style", f), mu(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          f = dl(i.href);
          var h = t.querySelector(
            wo(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, at(h), h;
          o = Av(i), (f = ra.get(f)) && $d(o, f), h = (t.ownerDocument || t).createElement("link"), at(h);
          var w = h;
          return w._p = new Promise(function(M, q) {
            w.onload = M, w.onerror = q;
          }), un(h, "link", o), n.state.loading |= 4, mu(h, i.precedence, t), n.instance = h;
        case "script":
          return h = hl(i.src), (f = t.querySelector(
            _o(h)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = ra.get(h)) && (o = g({}, i), Id(o, f)), t = t.ownerDocument || t, f = t.createElement("script"), at(f), un(f, "link", o), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, mu(o, i.precedence, t));
    return n.instance;
  }
  function mu(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, w = 0; w < o.length; w++) {
      var M = o[w];
      if (M.dataset.precedence === n) h = M;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function $d(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Id(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var pu = null;
  function jv(t, n, i) {
    if (pu === null) {
      var o = /* @__PURE__ */ new Map(), f = pu = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = pu, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), f = 0; f < i.length; f++) {
      var h = i[f];
      if (!(h[Ge] || h[ye] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = h.getAttribute(n) || "";
        w = t + w;
        var M = o.get(w);
        M ? M.push(h) : o.set(w, [h]);
      }
    }
    return o;
  }
  function zv(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function kE(t, n, i) {
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
  function Ov(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function HE(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = dl(o.href), h = n.querySelector(
          wo(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = gu.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = h, at(h);
          return;
        }
        h = n.ownerDocument || n, o = Av(o), (f = ra.get(f)) && $d(o, f), h = h.createElement("link"), at(h);
        var w = h;
        w._p = new Promise(function(M, q) {
          w.onload = M, w.onerror = q;
        }), un(h, "link", o), i.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = gu.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Yd = 0;
  function BE(t, n) {
    return t.stylesheets && t.count === 0 && yu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && yu(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Yd === 0 && (Yd = 62500 * yE());
      var f = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && yu(t, t.stylesheets), t.unsuspend)) {
            var h = t.unsuspend;
            t.unsuspend = null, h();
          }
        },
        (t.imgBytes > Yd ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function gu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) yu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var vu = null;
  function yu(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, vu = /* @__PURE__ */ new Map(), n.forEach(UE, t), vu = null, gu.call(t));
  }
  function UE(t, n) {
    if (!(n.state.loading & 4)) {
      var i = vu.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), vu.set(t, i);
        for (var f = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (i.set(w.dataset.precedence, w), o = w);
        }
        o && i.set(null, o);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = i.get(w) || o, h === o && i.set(null, f), i.set(w, f), this.count++, o = gu.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var So = {
    $$typeof: N,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function VE(t, n, i, o, f, h, w, M, q) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gn(0), this.hiddenUpdates = gn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Lv(t, n, i, o, f, h, w, M, q, re, fe, he) {
    return t = new VE(
      t,
      n,
      i,
      w,
      q,
      re,
      fe,
      he,
      M
    ), n = 1, h === !0 && (n |= 24), h = Un(3, null, null, n), t.current = h, h.stateNode = t, n = Sf(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Rf(h), t;
  }
  function kv(t) {
    return t ? (t = Yr, t) : Yr;
  }
  function Hv(t, n, i, o, f, h) {
    f = kv(f), o.context === null ? o.context = f : o.pendingContext = f, o = Ti(n), o.payload = { element: i }, h = h === void 0 ? null : h, h !== null && (o.callback = h), i = Mi(t, o, n), i !== null && (Dn(i, t, n), eo(i, t, n));
  }
  function Bv(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Gd(t, n) {
    Bv(t, n), (t = t.alternate) && Bv(t, n);
  }
  function Uv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = rr(t, 67108864);
      n !== null && Dn(n, t, 67108864), Gd(t, 67108864);
    }
  }
  function Vv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Yn();
      n = P(n);
      var i = rr(t, n);
      i !== null && Dn(i, t, n), Gd(t, n);
    }
  }
  var bu = !0;
  function qE(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = L.p;
    try {
      L.p = 2, Xd(t, n, i, o);
    } finally {
      L.p = h, T.T = f;
    }
  }
  function $E(t, n, i, o) {
    var f = T.T;
    T.T = null;
    var h = L.p;
    try {
      L.p = 8, Xd(t, n, i, o);
    } finally {
      L.p = h, T.T = f;
    }
  }
  function Xd(t, n, i, o) {
    if (bu) {
      var f = Fd(o);
      if (f === null)
        jd(
          t,
          n,
          o,
          xu,
          i
        ), $v(t, o);
      else if (YE(
        f,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if ($v(t, o), n & 4 && -1 < IE.indexOf(t)) {
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
                    za(h), (ht & 6) === 0 && (nu = Pe() + 500, vo(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = rr(h, 2), M !== null && Dn(M, h, 2), iu(), Gd(h, 2);
            }
          if (h = Fd(o), h === null && jd(
            t,
            n,
            o,
            xu,
            i
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        jd(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function Fd(t) {
    return t = Zc(t), Zd(t);
  }
  var xu = null;
  function Zd(t) {
    if (xu = null, t = Ct(t), t !== null) {
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
    return xu = t, null;
  }
  function qv(t) {
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
          case vt:
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
  var Pd = !1, Vi = null, qi = null, $i = null, Eo = /* @__PURE__ */ new Map(), No = /* @__PURE__ */ new Map(), Ii = [], IE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function $v(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Vi = null;
        break;
      case "dragenter":
      case "dragleave":
        qi = null;
        break;
      case "mouseover":
      case "mouseout":
        $i = null;
        break;
      case "pointerover":
      case "pointerout":
        Eo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        No.delete(n.pointerId);
    }
  }
  function Co(t, n, i, o, f, h) {
    return t === null || t.nativeEvent !== h ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && Uv(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function YE(t, n, i, o, f) {
    switch (n) {
      case "focusin":
        return Vi = Co(
          Vi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return qi = Co(
          qi,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return $i = Co(
          $i,
          t,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return Eo.set(
          h,
          Co(
            Eo.get(h) || null,
            t,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, No.set(
          h,
          Co(
            No.get(h) || null,
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
  function Iv(t) {
    var n = Ct(t.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Vv(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(i), n !== null) {
            t.blockedOn = n, ge(t.priority, function() {
              Vv(i);
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
  function wu(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Fd(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Fc = o, i.target.dispatchEvent(o), Fc = null;
      } else
        return n = st(i), n !== null && Uv(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function Yv(t, n, i) {
    wu(t) && i.delete(n);
  }
  function GE() {
    Pd = !1, Vi !== null && wu(Vi) && (Vi = null), qi !== null && wu(qi) && (qi = null), $i !== null && wu($i) && ($i = null), Eo.forEach(Yv), No.forEach(Yv);
  }
  function _u(t, n) {
    t.blockedOn === n && (t.blockedOn = null, Pd || (Pd = !0, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      GE
    )));
  }
  var Su = null;
  function Gv(t) {
    Su !== t && (Su = t, e.unstable_scheduleCallback(
      e.unstable_NormalPriority,
      function() {
        Su === t && (Su = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], f = t[n + 2];
          if (typeof o != "function") {
            if (Zd(o || i) === null)
              continue;
            break;
          }
          var h = st(i);
          h !== null && (t.splice(n, 3), n -= 3, Ff(
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
  function ml(t) {
    function n(q) {
      return _u(q, t);
    }
    Vi !== null && _u(Vi, t), qi !== null && _u(qi, t), $i !== null && _u($i, t), Eo.forEach(n), No.forEach(n);
    for (var i = 0; i < Ii.length; i++) {
      var o = Ii[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Ii.length && (i = Ii[0], i.blockedOn === null); )
      Iv(i), i.blockedOn === null && Ii.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], h = i[o + 1], w = f[_e] || null;
        if (typeof h == "function")
          w || Gv(i);
        else if (w) {
          var M = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[_e] || null)
              M = w.formAction;
            else if (Zd(f) !== null) continue;
          } else M = w.action;
          typeof M == "function" ? i[o + 1] = M : (i.splice(o, 3), o -= 3), Gv(i);
        }
      }
  }
  function Xv() {
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
  function Qd(t) {
    this._internalRoot = t;
  }
  Eu.prototype.render = Qd.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = Yn();
    Hv(i, o, t, n, null, null);
  }, Eu.prototype.unmount = Qd.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      Hv(t.current, 2, null, t, null, null), iu(), n[be] = null;
    }
  };
  function Eu(t) {
    this._internalRoot = t;
  }
  Eu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = me();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < Ii.length && n !== 0 && n < Ii[i].priority; i++) ;
      Ii.splice(i, 0, t), i === 0 && Iv(t);
    }
  };
  var Fv = a.version;
  if (Fv !== "19.2.7")
    throw Error(
      l(
        527,
        Fv,
        "19.2.7"
      )
    );
  L.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(l(188)) : (t = Object.keys(t).join(","), Error(l(268, t)));
    return t = m(n), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var XE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Nu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Nu.isDisabled && Nu.supportsFiber)
      try {
        nn = Nu.inject(
          XE
        ), Kt = Nu;
      } catch {
      }
  }
  return To.createRoot = function(t, n) {
    if (!s(t)) throw Error(l(299));
    var i = !1, o = "", f = e0, h = t0, w = n0;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = Lv(
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
      Xv
    ), t[be] = n.current, Dd(t), new Qd(n);
  }, To.hydrateRoot = function(t, n, i) {
    if (!s(t)) throw Error(l(299));
    var o = !1, f = "", h = e0, w = t0, M = n0, q = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (w = i.onCaughtError), i.onRecoverableError !== void 0 && (M = i.onRecoverableError), i.formState !== void 0 && (q = i.formState)), n = Lv(
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
      Xv
    ), n.context = kv(null), i = n.current, o = Yn(), o = P(o), f = Ti(o), f.callback = null, Mi(i, f, o), i = o, n.current.lanes = i, pt(n, i), za(n), t[be] = n.current, Dd(t), new Eu(n);
  }, To.version = "19.2.7", To;
}
var ay;
function a2() {
  if (ay) return Jd.exports;
  ay = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return e(), Jd.exports = n2(), Jd.exports;
}
var i2 = a2();
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
var V1 = (e) => {
  throw TypeError(e);
}, q1 = (e, a, r) => a.has(e) || V1("Cannot " + r), oa = (e, a, r) => (q1(e, a, "read from private field"), r ? r.call(e) : a.get(e)), ko = (e, a, r) => a.has(e) ? V1("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, r), Oa = (e, a, r, l) => (q1(e, a, "write to private field"), a.set(e, r), r);
function iy(e) {
  return typeof e == "object" && e != null && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function r2(e = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: l = !1 } = e, s;
  s = a.map(
    (x, _) => v(
      x,
      typeof x == "string" ? null : x.state,
      _ === 0 ? "default" : void 0,
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
  function v(x, _ = null, C, E) {
    let R = Hh(
      s ? m().pathname : "/",
      x,
      _,
      C,
      E
    );
    return It(
      R.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        x
      )}`
    ), R;
  }
  function g(x) {
    return typeof x == "string" ? x : Ia(x);
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
      let _ = typeof x == "string" ? Na(x) : x;
      return {
        pathname: _.pathname || "",
        search: _.search || "",
        hash: _.hash || ""
      };
    },
    push(x, _) {
      c = "PUSH";
      let C = iy(x) ? x : v(x, _);
      u += 1, s.splice(u, s.length, C), l && d && d({ action: c, location: C, delta: 1 });
    },
    replace(x, _) {
      c = "REPLACE";
      let C = iy(x) ? x : v(x, _);
      s[u] = C, l && d && d({ action: c, location: C, delta: 0 });
    },
    go(x) {
      c = "POP";
      let _ = p(u + x), C = s[_];
      u = _, d && d({ action: c, location: C, delta: x });
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
function l2() {
  return Math.random().toString(36).substring(2, 10);
}
function Hh(e, a, r = null, l, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? Na(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || l2(),
    mask: s
  };
}
function Ia({
  pathname: e = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function Na(e) {
  let a = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (a.hash = e.substring(r), e = e.substring(0, r));
    let l = e.indexOf("?");
    l >= 0 && (a.search = e.substring(l), e = e.substring(0, l)), e && (a.pathname = e);
  }
  return a;
}
function o2(e, a, r = !1) {
  let l = "http://localhost";
  e && (l = e.location.origin !== "null" ? e.location.origin : e.location.href), Fe(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : Ia(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Ho, ry = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(e) {
    if (ko(this, Ho, /* @__PURE__ */ new Map()), e)
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
    if (oa(this, Ho).has(e))
      return oa(this, Ho).get(e);
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
    oa(this, Ho).set(e, a);
  }
};
Ho = /* @__PURE__ */ new WeakMap();
var s2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function u2(e) {
  return s2.has(
    e
  );
}
var c2 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function f2(e) {
  return c2.has(
    e
  );
}
function d2(e) {
  return e.index === !0;
}
function Yo(e, a, r = [], l = {}, s = !1) {
  return e.map((u, c) => {
    let d = [...r, String(c)], p = typeof u.id == "string" ? u.id : d.join("-");
    if (Fe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Fe(
      s || !l[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), d2(u)) {
      let m = {
        ...u,
        id: p
      };
      return l[p] = ly(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: p,
        children: void 0
      };
      return l[p] = ly(
        m,
        a(m)
      ), u.children && (m.children = Yo(
        u.children,
        a,
        d,
        l,
        s
      )), m;
    }
  });
}
function ly(e, a) {
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
function $1(e, a, r = "/") {
  return ba(e, a, r, !1);
}
function ba(e, a, r, l, s) {
  let u = typeof a == "string" ? Na(a) : a, c = ca(u.pathname || "/", r);
  if (c == null)
    return null;
  let d = s ?? Qu(e), p = null, m = N2(c);
  for (let v = 0; p == null && v < d.length; ++v)
    p = S2(
      d[v],
      m,
      l
    );
  return p;
}
function h2(e, a) {
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
function Qu(e) {
  let a = I1(e);
  return m2(a), a;
}
function I1(e, a = [], r = [], l = "", s = !1) {
  let u = (c, d, p = s, m) => {
    let v = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: d,
      route: c
    };
    if (v.relativePath.startsWith("/")) {
      if (!v.relativePath.startsWith(l) && p)
        return;
      Fe(
        v.relativePath.startsWith(l),
        `Absolute route path "${v.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), v.relativePath = v.relativePath.slice(l.length);
    }
    let g = ua([l, v.relativePath]), b = r.concat(v);
    c.children && c.children.length > 0 && (Fe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), I1(
      c.children,
      a,
      b,
      g,
      p
    )), !(c.path == null && !c.index) && a.push({
      path: g,
      score: w2(g, c.index),
      routesMeta: b
    });
  };
  return e.forEach((c, d) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, d);
    else
      for (let p of Y1(c.path))
        u(c, d, !0, p);
  }), a;
}
function Y1(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Y1(l.join("/")), d = [];
  return d.push(
    ...c.map(
      (p) => p === "" ? u : [u, p].join("/")
    )
  ), s && d.push(...c), d.map(
    (p) => e.startsWith("/") && p === "" ? "/" : p
  );
}
function m2(e) {
  e.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : _2(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var p2 = /^:[\w-]+$/, g2 = 3, v2 = 2, y2 = 1, b2 = 10, x2 = -2, oy = (e) => e === "*";
function w2(e, a) {
  let r = e.split("/"), l = r.length;
  return r.some(oy) && (l += x2), a && (l += v2), r.filter((s) => !oy(s)).reduce(
    (s, u) => s + (p2.test(u) ? g2 : u === "" ? y2 : b2),
    l
  );
}
function _2(e, a) {
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
function S2(e, a, r = !1) {
  let { routesMeta: l } = e, s = {}, u = "/", c = [];
  for (let d = 0; d < l.length; ++d) {
    let p = l[d], m = d === l.length - 1, v = u === "/" ? a : a.slice(u.length) || "/", g = oc(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      v
    ), b = p.route;
    if (!g && m && r && !l[l.length - 1].route.index && (g = oc(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      v
    )), !g)
      return null;
    Object.assign(s, g.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: ua([u, g.pathname]),
      pathnameBase: T2(
        ua([u, g.pathnameBase])
      ),
      route: b
    }), g.pathnameBase !== "/" && (u = ua([u, g.pathnameBase]));
  }
  return c;
}
function oc(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, l] = E2(
    e.path,
    e.caseSensitive,
    e.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), d = s.slice(1);
  return {
    params: l.reduce(
      (m, { paramName: v, isOptional: g }, b) => {
        if (v === "*") {
          let _ = d[b] || "";
          c = u.slice(0, u.length - _.length).replace(/(.)\/+$/, "$1");
        }
        const x = d[b];
        return g && !x ? m[v] = void 0 : m[v] = (x || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: e
  };
}
function E2(e, a = !1, r = !0) {
  It(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let l = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, d, p, m, v) => {
      if (l.push({ paramName: d, isOptional: p != null }), p) {
        let g = v.charAt(m + c.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (l.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function N2(e) {
  try {
    return e.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return It(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), e;
  }
}
function ca(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, l = e.charAt(r);
  return l && l !== "/" ? null : e.slice(r) || "/";
}
function C2({
  basename: e,
  pathname: a
}) {
  return a === "/" ? e : ua([e, a]);
}
var G1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, vm = (e) => G1.test(e);
function R2(e, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof e == "string" ? Na(e) : e, u;
  return r ? (r = bm(r), r.startsWith("/") ? u = sy(r.substring(1), "/") : u = sy(r, a)) : u = a, {
    pathname: u,
    search: M2(l),
    hash: A2(s)
  };
}
function sy(e, a) {
  let r = sc(a).split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function ah(e, a, r, l) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function X1(e) {
  return e.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function ym(e) {
  let a = X1(e);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Ec(e, a, r, l = !1) {
  let s;
  typeof e == "string" ? s = Na(e) : (s = { ...e }, Fe(
    !s.pathname || !s.pathname.includes("?"),
    ah("?", "pathname", "search", s)
  ), Fe(
    !s.pathname || !s.pathname.includes("#"),
    ah("#", "pathname", "hash", s)
  ), Fe(
    !s.search || !s.search.includes("#"),
    ah("#", "search", "hash", s)
  ));
  let u = e === "" || s.pathname === "", c = u ? "/" : s.pathname, d;
  if (c == null)
    d = r;
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
  let p = R2(s, d), m = c && c !== "/" && c.endsWith("/"), v = (u || c === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || v) && (p.pathname += "/"), p;
}
var bm = (e) => e.replace(/\/\/+/g, "/"), ua = (e) => bm(e.join("/")), sc = (e) => e.replace(/\/+$/, ""), T2 = (e) => sc(e).replace(/^\/*/, "/"), M2 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, A2 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, uy = (e, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", e), new Response(null, { ...r, headers: l });
}, Nc = class {
  constructor(e, a, r, l = !1) {
    this.status = e, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Go(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function ls(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return ua(a) || "/";
}
var F1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Z1(e, a) {
  let r = e;
  if (typeof r != "string" || !G1.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (F1)
    try {
      let u = new URL(window.location.href), c = r.startsWith("//") ? new URL(u.protocol + r) : new URL(r), d = ca(c.pathname, a);
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
var Qi = Symbol("Uninstrumented");
function D2(e, a) {
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
    let s = wl(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], d = r[`lazy.${u}`];
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
    if (typeof u == "function" && r[s].length > 0) {
      let c = u[Qi] ?? u, d = wl(
        r[s],
        c,
        (...p) => cy(p[0])
      );
      d && (s === "loader" && c.hydrate === !0 && (d.hydrate = !0), d[Qi] = c, l[s] = d);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[Qi] ?? s, c = wl(
      r.middleware,
      u,
      (...d) => cy(d[0])
    );
    return c ? (c[Qi] = u, c) : s;
  })), l;
}
function j2(e, a) {
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
    let l = e.navigate[Qi] ?? e.navigate, s = wl(
      r.navigate,
      l,
      (...u) => {
        let [c, d] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? Ia(c) : ".",
          ...fy(e, d ?? {})
        };
      }
    );
    s && (s[Qi] = l, e.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = e.fetch[Qi] ?? e.fetch, s = wl(r.fetch, l, (...u) => {
      let [c, , d, p] = u;
      return {
        href: d ?? ".",
        fetcherKey: c,
        ...fy(e, p ?? {})
      };
    });
    s && (s[Qi] = l, e.fetch = s);
  }
  return e;
}
function wl(e, a, r) {
  return e.length === 0 ? null : async (...l) => {
    let s = await P1(
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
async function P1(e, a, r, l) {
  let s = e[l], u;
  if (s) {
    let c, d = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = P1(e, a, r, l - 1), u = await c, Fe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function cy(e) {
  let { request: a, context: r, params: l, pattern: s } = e;
  return {
    request: z2(a),
    params: { ...l },
    pattern: s,
    context: O2(r)
  };
}
function fy(e, a) {
  return {
    currentUrl: Ia(e.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function z2(e) {
  return {
    method: e.method,
    url: e.url,
    headers: {
      get: (...a) => e.headers.get(...a)
    }
  };
}
function O2(e) {
  if (k2(e)) {
    let a = { ...e };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => e.get(a)
    };
}
var L2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function k2(e) {
  if (e === null || typeof e != "object")
    return !1;
  const a = Object.getPrototypeOf(e);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === L2;
}
var Q1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], H2 = new Set(
  Q1
), B2 = [
  "GET",
  ...Q1
], U2 = new Set(B2), K1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), V2 = /* @__PURE__ */ new Set([307, 308]), ih = {
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
}, q2 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Mo = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, $2 = (e) => ({
  hasErrorBoundary: !!e.hasErrorBoundary
}), W1 = "remix-router-transitions", J1 = Symbol("ResetLoaderData"), wr, vl, Fi, yl, I2 = class {
  constructor(e) {
    ko(this, wr), ko(this, vl), ko(this, Fi), ko(this, yl), Oa(this, wr, e), Oa(this, vl, Qu(e));
  }
  /** The stable route tree */
  get stableRoutes() {
    return oa(this, wr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return oa(this, Fi) ?? oa(this, wr);
  }
  /** Pre-computed branches */
  get branches() {
    return oa(this, yl) ?? oa(this, vl);
  }
  get hasHMRRoutes() {
    return oa(this, Fi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(e) {
    Oa(this, wr, e), Oa(this, vl, Qu(e));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(e) {
    Oa(this, Fi, e), Oa(this, yl, Qu(e));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    oa(this, Fi) && (Oa(this, wr, oa(this, Fi)), Oa(this, vl, oa(this, yl)), Oa(this, Fi, void 0), Oa(this, yl, void 0));
  }
};
wr = /* @__PURE__ */ new WeakMap();
vl = /* @__PURE__ */ new WeakMap();
Fi = /* @__PURE__ */ new WeakMap();
yl = /* @__PURE__ */ new WeakMap();
function Y2(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Fe(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = e.hydrationRouteProperties || [], s = e.mapRouteProperties || $2, u = s;
  if (e.instrumentations) {
    let B = e.instrumentations;
    u = (P) => ({
      ...s(P),
      ...D2(
        B.map((ee) => ee.route).filter(Boolean),
        P
      )
    });
  }
  let c = {}, d = new I2(
    Yo(
      e.routes,
      u,
      void 0,
      c
    )
  ), p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || P2, v = {
    ...e.future
  }, g = null, b = /* @__PURE__ */ new Set(), x = null, _ = null, C = null, E = null, R = e.hydrationData != null, j = ba(
    d.activeRoutes,
    e.history.location,
    p,
    !1,
    d.branches
  ), N = !1, z = null, H, k;
  if (j == null && !e.patchRoutesOnNavigation) {
    let B = sa(404, {
      pathname: e.history.location.pathname
    }), { matches: P, route: ee } = Cu(d.activeRoutes);
    H = !0, k = !H, j = P, z = { [ee.id]: B };
  } else if (j && !e.hydrationData && gn(
    j,
    d.activeRoutes,
    e.history.location.pathname
  ).active && (j = null), j)
    if (j.some((B) => B.route.lazy))
      H = !1, k = !H;
    else if (!j.some((B) => xm(B.route)))
      H = !0, k = !H;
    else {
      let B = e.hydrationData ? e.hydrationData.loaderData : null, P = e.hydrationData ? e.hydrationData.errors : null, ee = j;
      if (P) {
        let me = j.findIndex(
          (ge) => P[ge.route.id] !== void 0
        );
        ee = ee.slice(0, me + 1);
      }
      k = !1, H = !0, ee.forEach((me) => {
        let ge = ex(me.route, B, P);
        k = k || ge.renderFallback, H = H && !ge.shouldLoad;
      });
    }
  else {
    H = !1, k = !H, j = [];
    let B = gn(
      null,
      d.activeRoutes,
      e.history.location.pathname
    );
    B.active && B.matches && (N = !0, j = B.matches);
  }
  let V, A = {
    historyAction: e.history.action,
    location: e.history.location,
    matches: j,
    initialized: H,
    renderFallback: k,
    navigation: ih,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: e.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: e.hydrationData && e.hydrationData.loaderData || {},
    actionData: e.hydrationData && e.hydrationData.actionData || null,
    errors: e.hydrationData && e.hydrationData.errors || z,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", J = null, $ = !1, K, oe = !1, O = /* @__PURE__ */ new Map(), Y = null, T = !1, L = !1, Z = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Map(), ne = 0, D = -1, U = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), te = /* @__PURE__ */ new Map(), ue = /* @__PURE__ */ new Map(), pe = /* @__PURE__ */ new Set(), ae = /* @__PURE__ */ new Map(), G, ce = null;
  function Ee() {
    if (g = e.history.listen(
      ({ action: B, location: P, delta: ee }) => {
        if (G) {
          G(), G = void 0;
          return;
        }
        It(
          ae.size === 0 || ee != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let me = Qn({
          currentLocation: A.location,
          nextLocation: P,
          historyAction: B
        });
        if (me && ee != null) {
          let ge = new Promise((Ne) => {
            G = Ne;
          });
          e.history.go(ee * -1), Ln(me, {
            state: "blocked",
            location: P,
            proceed() {
              Ln(me, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: P
              }), ge.then(() => e.history.go(ee));
            },
            reset() {
              let Ne = new Map(A.blockers);
              Ne.set(me, Mo), xe({ blockers: Ne });
            }
          }), J?.resolve(), J = null;
          return;
        }
        return Me(B, P);
      }
    ), r) {
      hN(a, O);
      let B = () => mN(a, O);
      a.addEventListener("pagehide", B), Y = () => a.removeEventListener("pagehide", B);
    }
    return A.initialized || Me("POP", A.location, {
      initialHydration: !0
    }), V;
  }
  function we() {
    g && g(), Y && Y(), b.clear(), K && K.abort(), A.fetchers.forEach((B, P) => nn(A.fetchers, P)), A.blockers.forEach((B, P) => da(P));
  }
  function Se(B) {
    if (b.add(B), x) {
      let { newErrors: P } = x;
      x = null, B(A, {
        deletedFetchers: [],
        newErrors: P,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => b.delete(B);
  }
  function xe(B, P = {}) {
    B.matches && (B.matches = B.matches.map((ge) => {
      let Ne = c[ge.route.id], ye = ge.route;
      return ye.element !== Ne.element || ye.errorElement !== Ne.errorElement || ye.hydrateFallbackElement !== Ne.hydrateFallbackElement ? {
        ...ge,
        route: Ne
      } : ge;
    })), A = {
      ...A,
      ...B
    };
    let ee = [], me = [];
    A.fetchers.forEach((ge, Ne) => {
      ge.state === "idle" && (pe.has(Ne) ? ee.push(Ne) : me.push(Ne));
    }), pe.forEach((ge) => {
      !A.fetchers.has(ge) && !X.has(ge) && ee.push(ge);
    }), b.size === 0 && (x = { newErrors: B.errors ?? null }), [...b].forEach(
      (ge) => ge(A, {
        deletedFetchers: ee,
        newErrors: B.errors ?? null,
        viewTransitionOpts: P.viewTransitionOpts,
        flushSync: P.flushSync === !0
      })
    ), ee.forEach((ge) => nn(A.fetchers, ge)), me.forEach((ge) => A.fetchers.delete(ge));
  }
  function Te(B, P, { flushSync: ee } = {}) {
    let me = A.actionData != null && A.navigation.formMethod != null && hn(A.navigation.formMethod) && A.navigation.state === "loading" && B.state?._isRedirect !== !0, ge;
    P.actionData ? Object.keys(P.actionData).length > 0 ? ge = P.actionData : ge = null : me ? ge = A.actionData : ge = null;
    let Ne = P.loaderData ? _y(
      A.loaderData,
      P.loaderData,
      P.matches || [],
      P.errors
    ) : A.loaderData, ye = A.blockers;
    ye.size > 0 && (ye = new Map(ye), ye.forEach((De, Ue) => ye.set(Ue, Mo)));
    let _e = T ? !1 : Vt(B, P.matches || A.matches), be = $ === !0 || A.navigation.formMethod != null && hn(A.navigation.formMethod) && B.state?._isRedirect !== !0;
    d.commitHmrRoutes(), T || I === "POP" || (I === "PUSH" ? e.history.push(B, B.state) : I === "REPLACE" && e.history.replace(B, B.state));
    let Ae;
    if (I === "POP") {
      let De = O.get(A.location.pathname);
      De && De.has(B.pathname) ? Ae = {
        currentLocation: A.location,
        nextLocation: B
      } : O.has(B.pathname) && (Ae = {
        currentLocation: B,
        nextLocation: A.location
      });
    } else if (oe) {
      let De = O.get(A.location.pathname);
      De ? De.add(B.pathname) : (De = /* @__PURE__ */ new Set([B.pathname]), O.set(A.location.pathname, De)), Ae = {
        currentLocation: A.location,
        nextLocation: B
      };
    }
    xe(
      {
        ...P,
        // matches, errors, fetchers go through as-is
        actionData: ge,
        loaderData: Ne,
        historyAction: I,
        location: B,
        initialized: !0,
        renderFallback: !1,
        navigation: ih,
        revalidation: "idle",
        restoreScrollPosition: _e,
        preventScrollReset: be,
        blockers: ye
      },
      {
        viewTransitionOpts: Ae,
        flushSync: ee === !0
      }
    ), I = "POP", $ = !1, oe = !1, T = !1, L = !1, J?.resolve(), J = null, ce?.resolve(), ce = null;
  }
  async function $e(B, P) {
    if (J?.resolve(), J = null, typeof B == "number") {
      J || (J = Cy());
      let rt = J.promise;
      return e.history.go(B), rt;
    }
    let ee = Bh(
      A.location,
      A.matches,
      p,
      B,
      P?.fromRouteId,
      P?.relative
    ), { path: me, submission: ge, error: Ne } = dy(
      !1,
      ee,
      P
    ), ye;
    P?.mask && (ye = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof P.mask == "string" ? Na(P.mask) : {
        ...A.location.mask,
        ...P.mask
      }
    });
    let _e = A.location, be = Hh(
      _e,
      me,
      P && P.state,
      void 0,
      ye
    );
    be = {
      ...be,
      ...e.history.encodeLocation(be)
    };
    let Ae = P && P.replace != null ? P.replace : void 0, De = "PUSH";
    Ae === !0 ? De = "REPLACE" : Ae === !1 || ge != null && hn(ge.formMethod) && ge.formAction === A.location.pathname + A.location.search && (De = "REPLACE");
    let Ue = P && "preventScrollReset" in P ? P.preventScrollReset === !0 : void 0, Oe = (P && P.flushSync) === !0, Ge = Qn({
      currentLocation: _e,
      nextLocation: be,
      historyAction: De
    });
    if (Ge) {
      Ln(Ge, {
        state: "blocked",
        location: be,
        proceed() {
          Ln(Ge, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), $e(B, P);
        },
        reset() {
          let rt = new Map(A.blockers);
          rt.set(Ge, Mo), xe({ blockers: rt });
        }
      });
      return;
    }
    await Me(De, be, {
      submission: ge,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ne,
      preventScrollReset: Ue,
      replace: P && P.replace,
      enableViewTransition: P && P.viewTransition,
      flushSync: Oe,
      callSiteDefaultShouldRevalidate: P && P.defaultShouldRevalidate
    });
  }
  function ft() {
    ce || (ce = Cy()), Lt(), xe({ revalidation: "loading" });
    let B = ce.promise;
    return A.navigation.state === "submitting" ? B : A.navigation.state === "idle" ? (Me(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), B) : (Me(
      I || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: oe === !0
      }
    ), B);
  }
  async function Me(B, P, ee) {
    K && K.abort(), K = null, I = B, T = (ee && ee.startUninterruptedRevalidation) === !0, kt(A.location, A.matches), $ = (ee && ee.preventScrollReset) === !0, oe = (ee && ee.enableViewTransition) === !0;
    let me = d.activeRoutes, ge = ee?.initialHydration && A.matches && A.matches.length > 0 && !N ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : ba(
      me,
      P,
      p,
      !1,
      d.branches
    ), Ne = (ee && ee.flushSync) === !0;
    if (ge && A.initialized && !L && aN(A.location, P) && !(ee && ee.submission && hn(ee.submission.formMethod))) {
      Te(P, { matches: ge }, { flushSync: Ne });
      return;
    }
    let ye = gn(ge, me, P.pathname);
    if (ye.active && ye.matches && (ge = ye.matches), !ge) {
      let { error: st, notFoundMatches: Je, route: Ot } = cn(
        P.pathname
      );
      Te(
        P,
        {
          matches: Je,
          loaderData: {},
          errors: {
            [Ot.id]: st
          }
        },
        { flushSync: Ne }
      );
      return;
    }
    let _e = ee && ee.overrideNavigation ? {
      ...ee.overrideNavigation,
      matches: ge,
      historyAction: B
    } : void 0;
    K = new AbortController();
    let be = bl(
      e.history,
      P,
      K.signal,
      ee && ee.submission
    ), Ae = e.getContext ? await e.getContext() : new ry(), De;
    if (ee && ee.pendingError)
      De = [
        Zi(ge).route.id,
        { type: "error", error: ee.pendingError }
      ];
    else if (ee && ee.submission && hn(ee.submission.formMethod)) {
      let st = await Xe(
        be,
        P,
        ee.submission,
        ge,
        B,
        Ae,
        ye.active,
        ee && ee.initialHydration === !0,
        { replace: ee.replace, flushSync: Ne }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [Je, Ot] = st.pendingActionResult;
        if (Gn(Ot) && Go(Ot.error) && Ot.error.status === 404) {
          K = null, Te(P, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [Je]: Ot.error
            }
          });
          return;
        }
      }
      ge = st.matches || ge, De = st.pendingActionResult, _e = rh(
        P,
        ge,
        B,
        ee.submission
      ), Ne = !1, ye.active = !1, be = bl(
        e.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: Ue,
      matches: Oe,
      loaderData: Ge,
      errors: rt,
      workingFetchers: Ct
    } = await He(
      be,
      P,
      ge,
      B,
      Ae,
      ye.active,
      _e,
      ee && ee.submission,
      ee && ee.fetcherSubmission,
      ee && ee.replace,
      ee && ee.initialHydration === !0,
      Ne,
      De,
      ee && ee.callSiteDefaultShouldRevalidate
    );
    Ue || (K = null, Te(P, {
      matches: Oe || ge,
      ...Sy(De),
      loaderData: Ge,
      errors: rt,
      ...Ct ? { fetchers: Ct } : {}
    }));
  }
  async function Xe(B, P, ee, me, ge, Ne, ye, _e, be = {}) {
    Lt();
    let Ae = fN(
      P,
      me,
      ge,
      ee
    );
    if (xe({ navigation: Ae }, { flushSync: be.flushSync === !0 }), ye) {
      let Oe = await pt(
        me,
        P.pathname,
        B.signal
      );
      if (Oe.type === "aborted")
        return { shortCircuited: !0 };
      if (Oe.type === "error") {
        if (Oe.partialMatches.length === 0) {
          let { matches: rt, route: Ct } = Cu(
            d.activeRoutes
          );
          return {
            matches: rt,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: Oe.error
              }
            ]
          };
        }
        let Ge = Zi(Oe.partialMatches).route.id;
        return {
          matches: Oe.partialMatches,
          pendingActionResult: [
            Ge,
            {
              type: "error",
              error: Oe.error
            }
          ]
        };
      } else if (Oe.matches)
        me = Oe.matches;
      else {
        let { notFoundMatches: Ge, error: rt, route: Ct } = cn(
          P.pathname
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
    let De, Ue = Ku(me, P);
    if (!Ue.route.action && !Ue.route.lazy)
      De = {
        type: "error",
        error: sa(405, {
          method: B.method,
          pathname: P.pathname,
          routeId: Ue.route.id
        })
      };
    else {
      let Oe = El(
        u,
        c,
        B,
        P,
        me,
        Ue,
        _e ? [] : l,
        Ne
      ), Ge = await vt(
        B,
        P,
        Oe,
        Ne,
        null
      );
      if (De = Ge[Ue.route.id], !De) {
        for (let rt of me)
          if (Ge[rt.route.id]) {
            De = Ge[rt.route.id];
            break;
          }
      }
      if (B.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Sr(De)) {
      let Oe;
      return be && be.replace != null ? Oe = be.replace : Oe = by(
        De.response.headers.get("Location"),
        new URL(B.url),
        p,
        e.history
      ) === A.location.pathname + A.location.search, await gt(B, De, !0, {
        submission: ee,
        replace: Oe
      }), { shortCircuited: !0 };
    }
    if (Gn(De)) {
      let Oe = Zi(me, Ue.route.id);
      return (be && be.replace) !== !0 && (I = "PUSH"), {
        matches: me,
        pendingActionResult: [
          Oe.route.id,
          De,
          Ue.route.id
        ]
      };
    }
    return {
      matches: me,
      pendingActionResult: [Ue.route.id, De]
    };
  }
  async function He(B, P, ee, me, ge, Ne, ye, _e, be, Ae, De, Ue, Oe, Ge) {
    let rt = ye || rh(P, ee, me, _e), Ct = _e || be || Ny(rt), st = !T && !De;
    if (Ne) {
      if (st) {
        let bt = Ie(Oe);
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
        ee,
        P.pathname,
        B.signal
      );
      if (Be.type === "aborted")
        return { shortCircuited: !0 };
      if (Be.type === "error") {
        if (Be.partialMatches.length === 0) {
          let { matches: vn, route: Hn } = Cu(
            d.activeRoutes
          );
          return {
            matches: vn,
            loaderData: {},
            errors: {
              [Hn.id]: Be.error
            }
          };
        }
        let bt = Zi(Be.partialMatches).route.id;
        return {
          matches: Be.partialMatches,
          loaderData: {},
          errors: {
            [bt]: Be.error
          }
        };
      } else if (Be.matches)
        ee = Be.matches;
      else {
        let { error: bt, notFoundMatches: vn, route: Hn } = cn(
          P.pathname
        );
        return {
          matches: vn,
          loaderData: {},
          errors: {
            [Hn.id]: bt
          }
        };
      }
    }
    let Je = d.activeRoutes, { dsMatches: Ot, revalidatingFetchers: at } = hy(
      B,
      ge,
      u,
      c,
      e.history,
      A,
      ee,
      Ct,
      P,
      De ? [] : l,
      De === !0,
      L,
      Z,
      pe,
      te,
      Q,
      Je,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      Oe,
      Ge
    );
    if (D = ++ne, !e.dataStrategy && !Ot.some((Be) => Be.shouldLoad) && !Ot.some(
      (Be) => Be.route.middleware && Be.route.middleware.length > 0
    ) && at.length === 0) {
      let Be = new Map(A.fetchers), bt = vi(Be);
      return Te(
        P,
        {
          matches: ee,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Oe && Gn(Oe[1]) ? { [Oe[0]]: Oe[1].error } : null,
          ...Sy(Oe),
          ...bt ? { fetchers: Be } : {}
        },
        { flushSync: Ue }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let Be = {};
      if (!Ne) {
        Be.navigation = rt;
        let bt = Ie(Oe);
        bt !== void 0 && (Be.actionData = bt);
      }
      at.length > 0 && (Be.fetchers = _t(at)), xe(Be, { flushSync: Ue });
    }
    at.forEach((Be) => {
      zt(Be.key), Be.controller && X.set(Be.key, Be.controller);
    });
    let Ma = () => at.forEach((Be) => zt(Be.key));
    K && K.signal.addEventListener(
      "abort",
      Ma
    );
    let { loaderResults: kn, fetcherResults: fn } = await Yt(
      Ot,
      at,
      B,
      P,
      ge
    );
    if (B.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      Ma
    ), at.forEach((Be) => X.delete(Be.key));
    let an = Ru(kn);
    if (an)
      return await gt(B, an.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    if (an = Ru(fn), an)
      return Q.add(an.key), await gt(B, an.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    let En = new Map(A.fetchers), { loaderData: yi, errors: Nn } = wy(
      A,
      ee,
      kn,
      Oe,
      at,
      fn,
      En
    );
    De && A.errors && (Nn = { ...A.errors, ...Nn });
    let bi = vi(En), ma = Ta(
      D,
      En
    ), pa = bi || ma || at.length > 0;
    return {
      matches: ee,
      loaderData: yi,
      errors: Nn,
      ...pa ? { workingFetchers: En } : {}
    };
  }
  function Ie(B) {
    if (B && !Gn(B[1]))
      return {
        [B[0]]: B[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function _t(B) {
    let P = new Map(A.fetchers);
    return B.forEach((ee) => {
      let me = P.get(ee.key), ge = Ao(
        void 0,
        me ? me.data : void 0
      );
      P.set(ee.key, ge);
    }), P;
  }
  async function We(B, P, ee, me) {
    zt(B);
    let ge = (me && me.flushSync) === !0, Ne = d.activeRoutes, ye = Bh(
      A.location,
      A.matches,
      p,
      ee,
      P,
      me?.relative
    ), _e = ba(
      Ne,
      ye,
      p,
      !1,
      d.branches
    ), be = gn(_e, Ne, ye);
    if (be.active && be.matches && (_e = be.matches), !_e) {
      ot(
        B,
        P,
        sa(404, { pathname: ye }),
        { flushSync: ge }
      );
      return;
    }
    let { path: Ae, submission: De, error: Ue } = dy(
      !0,
      ye,
      me
    );
    if (Ue) {
      ot(B, P, Ue, { flushSync: ge });
      return;
    }
    let Oe = e.getContext ? await e.getContext() : new ry(), Ge = (me && me.preventScrollReset) === !0;
    if (De && hn(De.formMethod)) {
      await Ze(
        B,
        P,
        Ae,
        _e,
        Oe,
        be.active,
        ge,
        Ge,
        De,
        me && me.defaultShouldRevalidate
      );
      return;
    }
    te.set(B, { routeId: P, path: Ae }), await Pe(
      B,
      P,
      Ae,
      _e,
      Oe,
      be.active,
      ge,
      Ge,
      De
    );
  }
  async function Ze(B, P, ee, me, ge, Ne, ye, _e, be, Ae) {
    Lt(), te.delete(B);
    let De = A.fetchers.get(B);
    mt(B, dN(be, De), {
      flushSync: ye
    });
    let Ue = new AbortController(), Oe = bl(
      e.history,
      ee,
      Ue.signal,
      be
    );
    if (Ne) {
      let dt = await pt(
        me,
        new URL(Oe.url).pathname,
        Oe.signal,
        B
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(B, P, dt.error, { flushSync: ye });
        return;
      } else if (dt.matches)
        me = dt.matches;
      else {
        ot(
          B,
          P,
          sa(404, { pathname: ee }),
          { flushSync: ye }
        );
        return;
      }
    }
    let Ge = Ku(me, ee);
    if (!Ge.route.action && !Ge.route.lazy) {
      let dt = sa(405, {
        method: be.formMethod,
        pathname: ee,
        routeId: P
      });
      ot(B, P, dt, { flushSync: ye });
      return;
    }
    X.set(B, Ue);
    let rt = ne, Ct = El(
      u,
      c,
      Oe,
      ee,
      me,
      Ge,
      l,
      ge
    ), st = await vt(
      Oe,
      ee,
      Ct,
      ge,
      B
    ), Je = st[Ge.route.id];
    if (!Je) {
      for (let dt of Ct)
        if (st[dt.route.id]) {
          Je = st[dt.route.id];
          break;
        }
    }
    if (Oe.signal.aborted) {
      X.get(B) === Ue && X.delete(B);
      return;
    }
    if (pe.has(B)) {
      if (Sr(Je) || Gn(Je)) {
        mt(B, ka(void 0));
        return;
      }
    } else {
      if (Sr(Je))
        if (X.delete(B), D > rt) {
          mt(B, ka(void 0));
          return;
        } else
          return Q.add(B), mt(B, Ao(be)), gt(Oe, Je, !1, {
            fetcherSubmission: be,
            preventScrollReset: _e
          });
      if (Gn(Je)) {
        ot(B, P, Je.error);
        return;
      }
    }
    let Ot = A.navigation.location || A.location, at = bl(
      e.history,
      Ot,
      Ue.signal
    ), Ma = d.activeRoutes, kn = A.navigation.state !== "idle" ? ba(
      Ma,
      A.navigation.location,
      p,
      !1,
      d.branches
    ) : A.matches;
    Fe(kn, "Didn't find any matches after fetcher action");
    let fn = ++ne;
    U.set(B, fn);
    let { dsMatches: an, revalidatingFetchers: En } = hy(
      at,
      ge,
      u,
      c,
      e.history,
      A,
      kn,
      be,
      Ot,
      l,
      !1,
      L,
      Z,
      pe,
      te,
      Q,
      Ma,
      p,
      e.patchRoutesOnNavigation != null,
      d.branches,
      [Ge.route.id, Je],
      Ae
    ), yi = Ao(be, Je.data), Nn = new Map(A.fetchers);
    Nn.set(B, yi), En.filter((dt) => dt.key !== B).forEach((dt) => {
      let Kn = dt.key, rn = Nn.get(Kn), tr = Ao(
        void 0,
        rn ? rn.data : void 0
      );
      Nn.set(Kn, tr), zt(Kn), dt.controller && X.set(Kn, dt.controller);
    }), xe({ fetchers: Nn });
    let bi = () => En.forEach((dt) => zt(dt.key));
    Ue.signal.addEventListener(
      "abort",
      bi
    );
    let { loaderResults: ma, fetcherResults: pa } = await Yt(
      an,
      En,
      at,
      Ot,
      ge
    );
    if (Ue.signal.aborted)
      return;
    Ue.signal.removeEventListener(
      "abort",
      bi
    ), U.delete(B), X.delete(B), En.forEach((dt) => X.delete(dt.key));
    let Be = A.fetchers.has(B), bt = (dt) => {
      if (!Be) return dt;
      let Kn = new Map(dt.fetchers);
      return Kn.set(B, ka(Je.data)), { ...dt, fetchers: Kn };
    }, vn = Ru(ma);
    if (vn)
      return A = bt(A), gt(
        at,
        vn.result,
        !1,
        { preventScrollReset: _e }
      );
    if (vn = Ru(pa), vn)
      return Q.add(vn.key), A = bt(A), gt(
        at,
        vn.result,
        !1,
        { preventScrollReset: _e }
      );
    let Hn = new Map(A.fetchers);
    Be && Hn.set(B, ka(Je.data));
    let { loaderData: xi, errors: Ga } = wy(
      A,
      kn,
      ma,
      void 0,
      En,
      pa,
      Hn
    );
    Ta(fn, Hn), A.navigation.state === "loading" && fn > D ? (Fe(I, "Expected pending action"), K && K.abort(), Te(A.navigation.location, {
      matches: kn,
      loaderData: xi,
      errors: Ga,
      fetchers: Hn
    })) : (xe({
      errors: Ga,
      loaderData: _y(
        A.loaderData,
        xi,
        kn,
        Ga
      ),
      fetchers: Hn
    }), L = !1);
  }
  async function Pe(B, P, ee, me, ge, Ne, ye, _e, be) {
    let Ae = A.fetchers.get(B);
    mt(
      B,
      Ao(
        be,
        Ae ? Ae.data : void 0
      ),
      { flushSync: ye }
    );
    let De = new AbortController(), Ue = bl(
      e.history,
      ee,
      De.signal
    );
    if (Ne) {
      let Je = await pt(
        me,
        new URL(Ue.url).pathname,
        Ue.signal,
        B
      );
      if (Je.type === "aborted")
        return;
      if (Je.type === "error") {
        ot(B, P, Je.error, { flushSync: ye });
        return;
      } else if (Je.matches)
        me = Je.matches;
      else {
        ot(
          B,
          P,
          sa(404, { pathname: ee }),
          { flushSync: ye }
        );
        return;
      }
    }
    let Oe = Ku(me, ee);
    X.set(B, De);
    let Ge = ne, rt = El(
      u,
      c,
      Ue,
      ee,
      me,
      Oe,
      l,
      ge
    ), Ct = await vt(
      Ue,
      ee,
      rt,
      ge,
      B
    ), st = Ct[Oe.route.id];
    if (!st) {
      for (let Je of me)
        if (Ct[Je.route.id]) {
          st = Ct[Je.route.id];
          break;
        }
    }
    if (X.get(B) === De && X.delete(B), !Ue.signal.aborted) {
      if (pe.has(B)) {
        mt(B, ka(void 0));
        return;
      }
      if (Sr(st))
        if (D > Ge) {
          mt(B, ka(void 0));
          return;
        } else {
          Q.add(B), await gt(Ue, st, !1, {
            preventScrollReset: _e
          });
          return;
        }
      if (Gn(st)) {
        ot(B, P, st.error);
        return;
      }
      mt(B, ka(st.data));
    }
  }
  async function gt(B, P, ee, {
    submission: me,
    fetcherSubmission: ge,
    preventScrollReset: Ne,
    replace: ye
  } = {}) {
    ee || (J?.resolve(), J = null), P.response.headers.has("X-Remix-Revalidate") && (L = !0);
    let _e = P.response.headers.get("Location");
    Fe(_e, "Expected a Location header on the redirect Response"), _e = by(
      _e,
      new URL(B.url),
      p,
      e.history
    );
    let be = Hh(A.location, _e, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (P.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (vm(_e)) {
        const Ct = o2(a, _e, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Ct.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        ca(Ct.pathname, p) == null;
      }
      if (rt) {
        ye ? a.location.replace(_e) : a.location.assign(_e);
        return;
      }
    }
    K = null;
    let Ae = ye === !0 || P.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: Ue, formEncType: Oe } = A.navigation;
    !me && !ge && De && Ue && Oe && (me = Ny(A.navigation));
    let Ge = me || ge;
    if (V2.has(P.response.status) && Ge && hn(Ge.formMethod))
      await Me(Ae, be, {
        submission: {
          ...Ge,
          formAction: _e
        },
        // Preserve these flags across redirects
        preventScrollReset: Ne || $,
        enableViewTransition: ee ? oe : void 0
      });
    else {
      let rt = rh(
        be,
        [],
        Ae,
        me
      );
      await Me(Ae, be, {
        overrideNavigation: rt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ge,
        // Preserve these flags across redirects
        preventScrollReset: Ne || $,
        enableViewTransition: ee ? oe : void 0
      });
    }
  }
  async function vt(B, P, ee, me, ge) {
    let Ne, ye = {};
    try {
      Ne = await K2(
        m,
        B,
        P,
        ee,
        ge,
        me,
        !1
      );
    } catch (_e) {
      return ee.filter((be) => be.shouldLoad).forEach((be) => {
        ye[be.route.id] = {
          type: "error",
          error: _e
        };
      }), ye;
    }
    if (B.signal.aborted)
      return ye;
    if (!hn(B.method))
      for (let _e of ee) {
        if (Ne[_e.route.id]?.type === "error")
          break;
        !Ne.hasOwnProperty(_e.route.id) && !A.loaderData.hasOwnProperty(_e.route.id) && (!A.errors || !A.errors.hasOwnProperty(_e.route.id)) && _e.shouldCallHandler() && (Ne[_e.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${_e.route.id}`
          )
        });
      }
    for (let [_e, be] of Object.entries(Ne))
      if (oN(be)) {
        let Ae = be.result;
        ye[_e] = {
          type: "redirect",
          response: tN(
            Ae,
            B,
            _e,
            ee,
            p
          )
        };
      } else
        ye[_e] = await eN(be);
    return ye;
  }
  async function Yt(B, P, ee, me, ge) {
    let Ne = vt(
      ee,
      me,
      B,
      ge,
      null
    ), ye = Promise.all(
      P.map(async (Ae) => {
        if (Ae.matches && Ae.match && Ae.request && Ae.controller) {
          let Ue = (await vt(
            Ae.request,
            Ae.path,
            Ae.matches,
            ge,
            Ae.key
          ))[Ae.match.route.id];
          return { [Ae.key]: Ue };
        } else
          return Promise.resolve({
            [Ae.key]: {
              type: "error",
              error: sa(404, {
                pathname: Ae.path
              })
            }
          });
      })
    ), _e = await Ne, be = (await ye).reduce(
      (Ae, De) => Object.assign(Ae, De),
      {}
    );
    return {
      loaderResults: _e,
      fetcherResults: be
    };
  }
  function Lt() {
    L = !0, te.forEach((B, P) => {
      X.has(P) && Z.add(P), zt(P);
    });
  }
  function mt(B, P, ee = {}) {
    let me = new Map(A.fetchers);
    me.set(B, P), xe(
      { fetchers: me },
      { flushSync: (ee && ee.flushSync) === !0 }
    );
  }
  function ot(B, P, ee, me = {}) {
    let ge = Zi(A.matches, P), Ne = new Map(A.fetchers);
    nn(Ne, B), xe(
      {
        errors: {
          [ge.route.id]: ee
        },
        fetchers: Ne
      },
      { flushSync: (me && me.flushSync) === !0 }
    );
  }
  function Pn(B) {
    return ue.set(B, (ue.get(B) || 0) + 1), pe.has(B) && pe.delete(B), A.fetchers.get(B) || q2;
  }
  function _n(B, P) {
    zt(B, P?.reason), mt(B, ka(null));
  }
  function nn(B, P) {
    let ee = A.fetchers.get(P);
    X.has(P) && !(ee && ee.state === "loading" && U.has(P)) && zt(P), te.delete(P), U.delete(P), Q.delete(P), pe.delete(P), Z.delete(P), B.delete(P);
  }
  function Kt(B) {
    let P = (ue.get(B) || 0) - 1;
    P <= 0 ? (ue.delete(B), pe.add(B)) : ue.set(B, P), xe({ fetchers: new Map(A.fetchers) });
  }
  function zt(B, P) {
    let ee = X.get(B);
    ee && (ee.abort(P), X.delete(B));
  }
  function Ut(B, P) {
    for (let ee of B) {
      let me = P.get(ee);
      Fe(me, `Expected fetcher: ${ee}`);
      let ge = ka(me.data);
      P.set(ee, ge);
    }
  }
  function vi(B) {
    let P = [], ee = !1;
    for (let me of Q) {
      let ge = B.get(me);
      Fe(ge, `Expected fetcher: ${me}`), ge.state === "loading" && (Q.delete(me), P.push(me), ee = !0);
    }
    return Ut(P, B), ee;
  }
  function Ta(B, P) {
    let ee = [];
    for (let [me, ge] of U)
      if (ge < B) {
        let Ne = P.get(me);
        Fe(Ne, `Expected fetcher: ${me}`), Ne.state === "loading" && (zt(me), U.delete(me), ee.push(me));
      }
    return Ut(ee, P), ee.length > 0;
  }
  function Sn(B, P) {
    let ee = A.blockers.get(B) || Mo;
    return ae.get(B) !== P && ae.set(B, P), ee;
  }
  function da(B) {
    A.blockers.delete(B), ae.delete(B);
  }
  function Ln(B, P) {
    let ee = A.blockers.get(B) || Mo;
    Fe(
      ee.state === "unblocked" && P.state === "blocked" || ee.state === "blocked" && P.state === "blocked" || ee.state === "blocked" && P.state === "proceeding" || ee.state === "blocked" && P.state === "unblocked" || ee.state === "proceeding" && P.state === "unblocked",
      `Invalid blocker state transition: ${ee.state} -> ${P.state}`
    );
    let me = new Map(A.blockers);
    me.set(B, P), xe({ blockers: me });
  }
  function Qn({
    currentLocation: B,
    nextLocation: P,
    historyAction: ee
  }) {
    if (ae.size === 0)
      return;
    ae.size > 1 && It(!1, "A router only supports one blocker at a time");
    let me = Array.from(ae.entries()), [ge, Ne] = me[me.length - 1], ye = A.blockers.get(ge);
    if (!(ye && ye.state === "proceeding") && Ne({ currentLocation: B, nextLocation: P, historyAction: ee }))
      return ge;
  }
  function cn(B) {
    let P = sa(404, { pathname: B }), ee = d.activeRoutes, { matches: me, route: ge } = Cu(ee);
    return { notFoundMatches: me, route: ge, error: P };
  }
  function ke(B, P, ee) {
    if (_ = B, E = P, C = ee || null, !R && A.navigation === ih) {
      R = !0;
      let me = Vt(A.location, A.matches);
      me != null && xe({ restoreScrollPosition: me });
    }
    return () => {
      _ = null, E = null, C = null;
    };
  }
  function yt(B, P) {
    return C && C(
      B,
      P.map((me) => h2(me, A.loaderData))
    ) || B.key;
  }
  function kt(B, P) {
    if (_ && E) {
      let ee = yt(B, P);
      _[ee] = E();
    }
  }
  function Vt(B, P) {
    if (_) {
      let ee = yt(B, P), me = _[ee];
      if (typeof me == "number")
        return me;
    }
    return null;
  }
  function gn(B, P, ee) {
    if (e.patchRoutesOnNavigation) {
      let me = d.branches;
      if (B) {
        if (Object.keys(B[0].params).length > 0)
          return { active: !0, matches: ba(
            P,
            ee,
            p,
            !0,
            me
          ) };
      } else
        return { active: !0, matches: ba(
          P,
          ee,
          p,
          !0,
          me
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(B, P, ee, me) {
    if (!e.patchRoutesOnNavigation)
      return { type: "success", matches: B };
    let ge = B;
    for (; ; ) {
      let Ne = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: ee,
          path: P,
          matches: ge,
          fetcherKey: me,
          patch: (Ae, De) => {
            ee.aborted || my(
              Ae,
              De,
              d,
              Ne,
              u,
              !1
            );
          }
        });
      } catch (Ae) {
        return { type: "error", error: Ae, partialMatches: ge };
      }
      if (ee.aborted)
        return { type: "aborted" };
      let ye = d.branches, _e = ba(
        d.activeRoutes,
        P,
        p,
        !1,
        ye
      ), be = null;
      if (_e) {
        if (Object.keys(_e[0].params).length === 0)
          return { type: "success", matches: _e };
        if (be = ba(
          d.activeRoutes,
          P,
          p,
          !0,
          ye
        ), !(be && ge.length < be.length && Wt(
          ge,
          be.slice(0, ge.length)
        )))
          return { type: "success", matches: _e };
      }
      if (be || (be = ba(
        d.activeRoutes,
        P,
        p,
        !0,
        ye
      )), !be || Wt(ge, be))
        return { type: "success", matches: null };
      ge = be;
    }
  }
  function Wt(B, P) {
    return B.length === P.length && B.every((ee, me) => ee.route.id === P[me].route.id);
  }
  function ha(B) {
    c = {}, d.setHmrRoutes(
      Yo(
        B,
        u,
        void 0,
        c
      )
    );
  }
  function en(B, P, ee = !1) {
    my(
      B,
      P,
      d,
      c,
      u,
      ee
    ), d.hasHMRRoutes || xe({});
  }
  return V = {
    get basename() {
      return p;
    },
    get future() {
      return v;
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
    initialize: Ee,
    subscribe: Se,
    enableScrollRestoration: ke,
    navigate: $e,
    fetch: We,
    revalidate: ft,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (B) => e.history.createHref(B),
    encodeLocation: (B) => e.history.encodeLocation(B),
    getFetcher: Pn,
    resetFetcher: _n,
    deleteFetcher: Kt,
    dispose: we,
    getBlocker: Sn,
    deleteBlocker: da,
    patchRoutes: en,
    _internalFetchControllers: X,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ha,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(B) {
      xe(B);
    }
  }, e.instrumentations && (V = j2(
    V,
    e.instrumentations.map((B) => B.router).filter(Boolean)
  )), V;
}
function G2(e) {
  return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0);
}
function Bh(e, a, r, l, s, u) {
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
  let p = Ec(
    l || ".",
    ym(c),
    ca(e.pathname, r) || e.pathname,
    u === "path"
  );
  if (l == null && (p.search = e.search, p.hash = e.hash), (l == null || l === "" || l === ".") && d) {
    let m = _m(p.search);
    if (d.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!d.route.index && m) {
      let v = new URLSearchParams(p.search), g = v.getAll("index");
      v.delete("index"), g.filter((x) => x).forEach((x) => v.append("index", x));
      let b = v.toString();
      p.search = b ? `?${b}` : "";
    }
  }
  return r !== "/" && (p.pathname = C2({ basename: r, pathname: p.pathname })), Ia(p);
}
function dy(e, a, r) {
  if (!r || !G2(r))
    return { path: a };
  if (r.formMethod && !cN(r.formMethod))
    return {
      path: a,
      error: sa(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: sa(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = ox(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!hn(u))
        return l();
      let g = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (b, [x, _]) => `${b}${x}=${_}
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
    d = Vh(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    d = Vh(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    d = r.body, p = xy(d);
  else if (r.body == null)
    d = new URLSearchParams(), p = new FormData();
  else
    try {
      d = new URLSearchParams(r.body), p = xy(d);
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
  let v = Na(a);
  return e && v.search && _m(v.search) && d.append("index", ""), v.search = `?${d}`, { path: Ia(v), submission: m };
}
function hy(e, a, r, l, s, u, c, d, p, m, v, g, b, x, _, C, E, R, j, N, z, H) {
  let k = z ? Gn(z[1]) ? z[1].error : z[1].data : void 0, V = s.createURL(u.location), A = s.createURL(p), I;
  if (v && u.errors) {
    let T = Object.keys(u.errors)[0];
    I = c.findIndex((L) => L.route.id === T);
  } else if (z && Gn(z[1])) {
    let T = z[0];
    I = c.findIndex((L) => L.route.id === T) - 1;
  }
  let J = z ? z[1].statusCode : void 0, $ = J && J >= 400, K = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: A,
    nextParams: c[0].params,
    ...d,
    actionResult: k,
    actionStatus: J
  }, oe = ls(c), O = c.map((T, L) => {
    let { route: Z } = T, X = null;
    if (I != null && L > I)
      X = !1;
    else if (Z.lazy)
      X = !0;
    else if (!xm(Z))
      X = !1;
    else if (v) {
      let { shouldLoad: Q } = ex(
        Z,
        u.loaderData,
        u.errors
      );
      X = Q;
    } else X2(u.loaderData, u.matches[L], T) && (X = !0);
    if (X !== null)
      return Uh(
        r,
        l,
        e,
        p,
        oe,
        T,
        m,
        a,
        X
      );
    let ne = !1;
    typeof H == "boolean" ? ne = H : $ ? ne = !1 : (g || V.pathname + V.search === A.pathname + A.search || V.search !== A.search || F2(u.matches[L], T)) && (ne = !0);
    let D = {
      ...K,
      defaultShouldRevalidate: ne
    }, U = Vo(T, D);
    return Uh(
      r,
      l,
      e,
      p,
      oe,
      T,
      m,
      a,
      U,
      D,
      H
    );
  }), Y = [];
  return _.forEach((T, L) => {
    if (v || !c.some((ue) => ue.route.id === T.routeId) || x.has(L))
      return;
    let Z = u.fetchers.get(L), X = Z && Z.state !== "idle" && Z.data === void 0, ne = ba(
      E,
      T.path,
      R ?? "/",
      !1,
      N
    );
    if (!ne) {
      if (j && X)
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
    let D = Ku(ne, T.path), U = new AbortController(), Q = bl(
      s,
      T.path,
      U.signal
    ), te = null;
    if (b.has(L))
      b.delete(L), te = El(
        r,
        l,
        Q,
        T.path,
        ne,
        D,
        m,
        a
      );
    else if (X)
      g && (te = El(
        r,
        l,
        Q,
        T.path,
        ne,
        D,
        m,
        a
      ));
    else {
      let ue;
      typeof H == "boolean" ? ue = H : $ ? ue = !1 : ue = g;
      let pe = {
        ...K,
        defaultShouldRevalidate: ue
      };
      Vo(D, pe) && (te = El(
        r,
        l,
        Q,
        T.path,
        ne,
        D,
        m,
        a,
        pe
      ));
    }
    te && Y.push({
      key: L,
      routeId: T.routeId,
      path: T.path,
      matches: te,
      match: D,
      request: Q,
      controller: U
    });
  }), { dsMatches: O, revalidatingFetchers: Y };
}
function xm(e) {
  return e.loader != null || e.middleware != null && e.middleware.length > 0;
}
function ex(e, a, r) {
  if (e.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!xm(e))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && e.id in a, s = r != null && r[e.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function X2(e, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !e.hasOwnProperty(r.route.id);
  return l || s;
}
function F2(e, a) {
  let r = e.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    e.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && e.params["*"] !== a.params["*"]
  );
}
function Vo(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function my(e, a, r, l, s, u) {
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
    let v = c.find(
      (g) => tx(m, g)
    );
    v ? p.push({ existingRoute: v, newRoute: m }) : d.push(m);
  }), d.length > 0) {
    let m = Yo(
      d,
      s,
      [e || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: v, newRoute: g } = p[m], b = v, [x] = Yo(
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
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function tx(e, a) {
  return "id" in e && "id" in a && e.id === a.id ? !0 : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : e.children?.every(
    (r, l) => a.children?.some((s) => tx(r, s))
  ) ?? !1 : !1;
}
var py = /* @__PURE__ */ new WeakMap(), nx = ({
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
  let c = py.get(s);
  c || (c = {}, py.set(s, c));
  let d = c[e];
  if (d)
    return d;
  let p = (async () => {
    let m = u2(e), g = s[e] !== void 0 && e !== "hasErrorBoundary";
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
}, gy = /* @__PURE__ */ new WeakMap();
function Z2(e, a, r, l, s) {
  let u = r[e.id];
  if (Fe(u, "No route found in manifest"), !e.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof e.lazy == "function") {
    let v = gy.get(u);
    if (v)
      return {
        lazyRoutePromise: v,
        lazyHandlerPromise: v
      };
    let g = (async () => {
      Fe(
        typeof e.lazy == "function",
        "No lazy route function found"
      );
      let b = await e.lazy(), x = {};
      for (let _ in b) {
        let C = b[_];
        if (C === void 0)
          continue;
        let E = f2(_), j = u[_] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        _ !== "hasErrorBoundary";
        E ? It(
          !E,
          "Route property " + _ + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : j ? It(
          !j,
          `Route "${u.id}" has a static property "${_}" defined but its lazy function is also returning a value for this property. The lazy route property "${_}" will be ignored.`
        ) : x[_] = C;
      }
      Object.assign(u, x), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return gy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let c = Object.keys(e.lazy), d = [], p;
  for (let v of c) {
    if (s && s.includes(v))
      continue;
    let g = nx({
      key: v,
      route: e,
      manifest: r,
      mapRouteProperties: l
    });
    g && (d.push(g), v === a && (p = g));
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
async function vy(e) {
  let a = e.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function P2(e) {
  return e.matches.some((a) => a.route.middleware) ? ax(e, () => vy(e)) : vy(e);
}
function ax(e, a) {
  return Q2(
    e,
    a,
    (l) => {
      if (uN(l))
        throw l;
      return l;
    },
    rN,
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
      ), p = Zi(
        c,
        c[d].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: l }
      });
    }
  }
}
async function Q2(e, a, r, l, s) {
  let { matches: u, ...c } = e, d = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((v) => [m.route.id, v]) : []
  );
  return await ix(
    c,
    d,
    a,
    r,
    l,
    s
  );
}
async function ix(e, a, r, l, s, u, c = 0) {
  let { request: d } = e;
  if (d.signal.aborted)
    throw d.signal.reason ?? new Error(`Request aborted: ${d.method} ${d.url}`);
  let p = a[c];
  if (!p)
    return await r();
  let [m, v] = p, g, b = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await ix(
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
    let x = await v(e, b), _ = x != null ? l(x) : void 0;
    return s(_) ? _ : g ? _ ?? g.value : (g = { value: await b() }, g.value);
  } catch (x) {
    return await u(x, m, g);
  }
}
function rx(e, a, r, l, s) {
  let u = nx({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: e
  }), c = Z2(
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
function Uh(e, a, r, l, s, u, c, d, p, m = null, v) {
  let g = !1, b = rx(
    e,
    a,
    r,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: b,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(x) {
      return g = !0, m ? typeof v == "boolean" ? Vo(u, {
        ...m,
        defaultShouldRevalidate: v
      }) : typeof x == "boolean" ? Vo(u, {
        ...m,
        defaultShouldRevalidate: x
      }) : Vo(u, m) : p;
    },
    resolve(x) {
      let { lazy: _, loader: C, middleware: E } = u.route, R = g || p || x && !hn(r.method) && (_ || C), j = E && E.length > 0 && !C && !_;
      return R && (hn(r.method) || !j) ? W2({
        request: r,
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
function El(e, a, r, l, s, u, c, d, p = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: rx(
      e,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Uh(
    e,
    a,
    r,
    l,
    ls(s),
    m,
    c,
    d,
    !0,
    p
  ));
}
async function K2(e, a, r, l, s, u, c) {
  l.some((v) => v._lazyPromises?.middleware) && await Promise.all(l.map((v) => v._lazyPromises?.middleware));
  let d = {
    request: a,
    url: lx(a, r),
    pattern: ls(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await e({
    ...d,
    fetcherKey: s,
    runClientMiddleware: (v) => {
      let g = d;
      return ax(g, () => v({
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
      l.flatMap((v) => [
        v._lazyPromises?.handler,
        v._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function W2({
  request: e,
  path: a,
  pattern: r,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: d
}) {
  let p, m, v = hn(e.method), g = v ? "action" : "loader", b = (x) => {
    let _, C = new Promise((j, N) => _ = N);
    m = () => _(), e.signal.addEventListener("abort", m);
    let E = (j) => typeof x != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${l.route.id}]`
      )
    ) : x(
      {
        request: e,
        url: lx(e, a),
        pattern: r,
        params: l.params,
        context: d
      },
      ...j !== void 0 ? [j] : []
    ), R = (async () => {
      try {
        return { type: "data", result: await (c ? c((N) => E(N)) : E()) };
      } catch (j) {
        return { type: "error", result: j };
      }
    })();
    return Promise.race([R, C]);
  };
  try {
    let x = v ? l.route.action : l.route.loader;
    if (s || u)
      if (x) {
        let _, [C] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          b(x).catch((E) => {
            _ = E;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (_ !== void 0)
          throw _;
        p = C;
      } else {
        await s;
        let _ = v ? l.route.action : l.route.loader;
        if (_)
          [p] = await Promise.all([b(_), u]);
        else if (g === "action") {
          let C = new URL(e.url), E = C.pathname + C.search;
          throw sa(405, {
            method: e.method,
            pathname: E,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (x)
      p = await b(x);
    else {
      let _ = new URL(e.url), C = _.pathname + _.search;
      throw sa(404, {
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
async function J2(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? e.body == null ? null : e.json() : e.text();
}
async function eN(e) {
  let { result: a, type: r } = e;
  if (wm(a)) {
    let l;
    try {
      l = await J2(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new Nc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Ey(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: iN(a),
    statusCode: Go(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Go(a) ? a.status : void 0
  } : Ey(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function tN(e, a, r, l, s) {
  let u = e.headers.get("Location");
  if (Fe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !vm(u)) {
    let c = l.slice(
      0,
      l.findIndex((d) => d.route.id === r) + 1
    );
    u = Bh(
      new URL(a.url),
      c,
      s,
      u
    ), e.headers.set("Location", u);
  }
  return e;
}
var yy = [
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
function by(e, a, r, l) {
  if (vm(e)) {
    let s = e, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (yy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = ca(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return bm(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(e);
    if (yy.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return e;
}
function bl(e, a, r, l) {
  let s = e.createURL(ox(a)).toString(), u = { signal: r };
  if (l && hn(l.formMethod)) {
    let { formMethod: c, formEncType: d } = l;
    u.method = c.toUpperCase(), d === "application/json" ? (u.headers = new Headers({ "Content-Type": d }), u.body = JSON.stringify(l.json)) : d === "text/plain" ? u.body = l.text : d === "application/x-www-form-urlencoded" && l.formData ? u.body = Vh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function lx(e, a) {
  let r = new URL(e.url), l = typeof a == "string" ? Na(a) : a;
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
function Vh(e) {
  let a = new URLSearchParams();
  for (let [r, l] of e.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function xy(e) {
  let a = new FormData();
  for (let [r, l] of e.entries())
    a.append(r, l);
  return a;
}
function nN(e, a, r, l = !1, s = !1) {
  let u = {}, c = null, d, p = !1, m = {}, v = r && Gn(r[1]) ? r[1].error : void 0;
  return e.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let b = g.route.id, x = a[b];
    if (Fe(
      !Sr(x),
      "Cannot handle redirect results in processLoaderData"
    ), Gn(x)) {
      let _ = x.error;
      if (v !== void 0 && (_ = v, v = void 0), c = c || {}, s)
        c[b] = _;
      else {
        let C = Zi(e, b);
        c[C.route.id] == null && (c[C.route.id] = _);
      }
      l || (u[b] = J1), p || (p = !0, d = Go(x.error) ? x.error.status : 500), x.headers && (m[b] = x.headers);
    } else
      u[b] = x.data, x.statusCode && x.statusCode !== 200 && !p && (d = x.statusCode), x.headers && (m[b] = x.headers);
  }), v !== void 0 && r && (c = { [r[0]]: v }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: d || 200,
    loaderHeaders: m
  };
}
function wy(e, a, r, l, s, u, c) {
  let { loaderData: d, errors: p } = nN(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((v) => v.shouldLoad)).forEach((m) => {
    let { key: v, match: g, controller: b } = m;
    if (b && b.signal.aborted)
      return;
    let x = u[v];
    if (Fe(x, "Did not find corresponding fetcher result"), Gn(x)) {
      let _ = Zi(e.matches, g?.route.id);
      p && p[_.route.id] || (p = {
        ...p,
        [_.route.id]: x.error
      }), c.delete(v);
    } else if (Sr(x))
      Fe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let _ = ka(x.data);
      c.set(v, _);
    }
  }), { loaderData: d, errors: p };
}
function _y(e, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== J1).reduce((u, [c, d]) => (u[c] = d, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Sy(e) {
  return e ? Gn(e[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [e[0]]: e[1].data
    }
  } : {};
}
function Zi(e, a) {
  return (a ? e.slice(0, e.findIndex((l) => l.route.id === a) + 1) : [...e]).reverse().find((l) => l.route.hasErrorBoundary === !0) || e[0];
}
function Cu(e) {
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
function sa(e, {
  pathname: a,
  routeId: r,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", d = "Unknown @remix-run/router error";
  return e === 400 ? (c = "Bad Request", l && a && r ? d = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (d = "Unable to encode submission body")) : e === 403 ? (c = "Forbidden", d = `Route "${r}" does not match URL "${a}"`) : e === 404 ? (c = "Not Found", d = `No route matches URL "${a}"`) : e === 405 && (c = "Method Not Allowed", l && a && r ? d = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (d = `Invalid request method "${l.toUpperCase()}"`)), new Nc(
    e || 500,
    c,
    new Error(d),
    !0
  );
}
function Ru(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (Sr(s))
      return { key: l, result: s };
  }
}
function ox(e) {
  let a = typeof e == "string" ? Na(e) : e;
  return Ia({ ...a, hash: "" });
}
function aN(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search ? !1 : e.hash === "" ? a.hash !== "" : e.hash === a.hash ? !0 : a.hash !== "";
}
function iN(e) {
  return new Nc(
    e.init?.status ?? 500,
    e.init?.statusText ?? "Internal Server Error",
    e.data
  );
}
function rN(e) {
  return e != null && typeof e == "object" && Object.entries(e).every(
    ([a, r]) => typeof a == "string" && lN(r)
  );
}
function lN(e) {
  return e != null && typeof e == "object" && "type" in e && "result" in e && (e.type === "data" || e.type === "error");
}
function oN(e) {
  return wm(e.result) && K1.has(e.result.status);
}
function Gn(e) {
  return e.type === "error";
}
function Sr(e) {
  return (e && e.type) === "redirect";
}
function Ey(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function wm(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function sN(e) {
  return K1.has(e);
}
function uN(e) {
  return wm(e) && sN(e.status) && e.headers.has("Location");
}
function cN(e) {
  return U2.has(e.toUpperCase());
}
function hn(e) {
  return H2.has(e.toUpperCase());
}
function _m(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function Ku(e, a) {
  let r = typeof a == "string" ? Na(a).search : a.search;
  if (e[e.length - 1].route.index && _m(r || ""))
    return e[e.length - 1];
  let l = X1(e);
  return l[l.length - 1];
}
function Ny(e) {
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
function rh(e, a, r, l) {
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
function fN(e, a, r, l) {
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
function Ao(e, a) {
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
function dN(e, a) {
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
function ka(e) {
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
function hN(e, a) {
  try {
    let r = e.sessionStorage.getItem(
      W1
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function mN(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      e.sessionStorage.setItem(
        W1,
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
function Cy() {
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
var Lr = S.createContext(null);
Lr.displayName = "DataRouter";
var os = S.createContext(null);
os.displayName = "DataRouterState";
var sx = S.createContext(!1);
function ux() {
  return S.useContext(sx);
}
var Sm = S.createContext({
  isTransitioning: !1
});
Sm.displayName = "ViewTransition";
var cx = S.createContext(
  /* @__PURE__ */ new Map()
);
cx.displayName = "Fetchers";
var pN = S.createContext(null);
pN.displayName = "Await";
var fa = S.createContext(
  null
);
fa.displayName = "Navigation";
var Cc = S.createContext(
  null
);
Cc.displayName = "Location";
var Ca = S.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ca.displayName = "Route";
var Em = S.createContext(null);
Em.displayName = "RouteError";
var fx = "REACT_ROUTER_ERROR", gN = "REDIRECT", vN = "ROUTE_ERROR_RESPONSE";
function yN(e) {
  if (e.startsWith(`${fx}:${gN}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function bN(e) {
  if (e.startsWith(
    `${fx}:${vN}:{`
  ))
    try {
      let a = JSON.parse(e.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Nc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function xN(e, { relative: a } = {}) {
  Fe(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = S.useContext(fa), { hash: s, pathname: u, search: c } = us(e, { relative: a }), d = u;
  return r !== "/" && (d = u === "/" ? r : ua([r, u])), l.createHref({ pathname: d, search: c, hash: s });
}
function ss() {
  return S.useContext(Cc) != null;
}
function pi() {
  return Fe(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), S.useContext(Cc).location;
}
var dx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function hx(e) {
  S.useContext(fa).static || S.useLayoutEffect(e);
}
function wN() {
  let { isDataRoute: e } = S.useContext(Ca);
  return e ? HN() : _N();
}
function _N() {
  Fe(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = S.useContext(Lr), { basename: a, navigator: r } = S.useContext(fa), { matches: l } = S.useContext(Ca), { pathname: s } = pi(), u = JSON.stringify(ym(l)), c = S.useRef(!1);
  return hx(() => {
    c.current = !0;
  }), S.useCallback(
    (p, m = {}) => {
      if (It(c.current, dx), !c.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let v = Ec(
        p,
        JSON.parse(u),
        s,
        m.relative === "path"
      );
      e == null && a !== "/" && (v.pathname = v.pathname === "/" ? a : ua([a, v.pathname])), (m.replace ? r.replace : r.push)(
        v,
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
var SN = S.createContext(null);
function EN(e) {
  let a = S.useContext(Ca).outlet;
  return S.useMemo(
    () => a && /* @__PURE__ */ S.createElement(SN.Provider, { value: e }, a),
    [a, e]
  );
}
function NN() {
  let { matches: e } = S.useContext(Ca);
  return e[e.length - 1]?.params ?? {};
}
function us(e, { relative: a } = {}) {
  let { matches: r } = S.useContext(Ca), { pathname: l } = pi(), s = JSON.stringify(ym(r));
  return S.useMemo(
    () => Ec(
      e,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [e, s, l, a]
  );
}
function CN(e, a, r) {
  Fe(
    ss(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = S.useContext(fa), { matches: s } = S.useContext(Ca), u = s[s.length - 1], c = u ? u.params : {}, d = u ? u.pathname : "/", p = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let E = m && m.path || "";
    gx(
      d,
      !m || E.endsWith("*") || E.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${E}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${E}"> to <Route path="${E === "/" ? "*" : `${E}/*`}">.`
    );
  }
  let v = pi(), g;
  g = v;
  let b = g.pathname || "/", x = b;
  if (p !== "/") {
    let E = p.replace(/^\//, "").split("/");
    x = "/" + b.replace(/^\//, "").split("/").slice(E.length).join("/");
  }
  let _ = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (E) => Object.assign(E, {
        route: r.manifest[E.route.id] || E.route
      })
    )
  ) : $1(e, { pathname: x });
  return It(
    m || _ != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), It(
    _ == null || _[_.length - 1].route.element !== void 0 || _[_.length - 1].route.Component !== void 0 || _[_.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), DN(
    _ && _.map(
      (E) => Object.assign({}, E, {
        params: Object.assign({}, c, E.params),
        pathname: ua([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            E.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : E.pathname
        ]),
        pathnameBase: E.pathnameBase === "/" ? p : ua([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            E.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : E.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function RN() {
  let e = kN(), a = Go(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), c = /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ S.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ S.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ S.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ S.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ S.createElement("pre", { style: s }, r) : null, c);
}
var TN = /* @__PURE__ */ S.createElement(RN, null), mx = class extends S.Component {
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
      const r = bN(e.digest);
      r && (e = r);
    }
    let a = e !== void 0 ? /* @__PURE__ */ S.createElement(Ca.Provider, { value: this.props.routeContext }, /* @__PURE__ */ S.createElement(
      Em.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ S.createElement(MN, { error: e }, a) : a;
  }
};
mx.contextType = sx;
var lh = /* @__PURE__ */ new WeakMap();
function MN({
  children: e,
  error: a
}) {
  let { basename: r } = S.useContext(fa);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = yN(a.digest);
    if (l) {
      let s = lh.get(a);
      if (s) throw s;
      let u = Z1(l.location, r);
      if (F1 && !lh.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw lh.set(a, c), c;
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
function AN({ routeContext: e, match: a, children: r }) {
  let l = S.useContext(Lr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ S.createElement(Ca.Provider, { value: e }, r);
}
function DN(e, a = [], r) {
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
    let v = s.findIndex(
      (g) => g.route.id && u?.[g.route.id] !== void 0
    );
    Fe(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, v + 1)
    );
  }
  let c = !1, d = -1;
  if (r && l) {
    c = l.renderFallback;
    for (let v = 0; v < s.length; v++) {
      let g = s[v];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (d = v), g.route.id) {
        let { loaderData: b, errors: x } = l, _ = g.route.loader && !b.hasOwnProperty(g.route.id) && (!x || x[g.route.id] === void 0);
        if (g.route.lazy || _) {
          r.isStatic && (c = !0), d >= 0 ? s = s.slice(0, d + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, m = l && p ? (v, g) => {
    p(v, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      pattern: ls(l.matches),
      errorInfo: g
    });
  } : void 0;
  return s.reduceRight(
    (v, g, b) => {
      let x, _ = !1, C = null, E = null;
      l && (x = u && g.route.id ? u[g.route.id] : void 0, C = g.route.errorElement || TN, c && (d < 0 && b === 0 ? (gx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), _ = !0, E = null) : d === b && (_ = !0, E = g.route.hydrateFallbackElement || null)));
      let R = a.concat(s.slice(0, b + 1)), j = () => {
        let N;
        return x ? N = C : _ ? N = E : g.route.Component ? N = /* @__PURE__ */ S.createElement(g.route.Component, null) : g.route.element ? N = g.route.element : N = v, /* @__PURE__ */ S.createElement(
          AN,
          {
            match: g,
            routeContext: {
              outlet: v,
              matches: R,
              isDataRoute: l != null
            },
            children: N
          }
        );
      };
      return l && (g.route.ErrorBoundary || g.route.errorElement || b === 0) ? /* @__PURE__ */ S.createElement(
        mx,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: C,
          error: x,
          children: j(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
          onError: m
        }
      ) : j();
    },
    null
  );
}
function Nm(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function jN(e) {
  let a = S.useContext(Lr);
  return Fe(a, Nm(e)), a;
}
function px(e) {
  let a = S.useContext(os);
  return Fe(a, Nm(e)), a;
}
function zN(e) {
  let a = S.useContext(Ca);
  return Fe(a, Nm(e)), a;
}
function Rc(e) {
  let a = zN(e), r = a.matches[a.matches.length - 1];
  return Fe(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function ON() {
  return Rc(
    "useRouteId"
    /* UseRouteId */
  );
}
function LN() {
  let e = px(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Rc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return e.loaderData[a];
}
function kN() {
  let e = S.useContext(Em), a = px(
    "useRouteError"
    /* UseRouteError */
  ), r = Rc(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : a.errors?.[r];
}
function HN() {
  let { router: e } = jN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Rc(
    "useNavigate"
    /* UseNavigateStable */
  ), r = S.useRef(!1);
  return hx(() => {
    r.current = !0;
  }), S.useCallback(
    async (s, u = {}) => {
      It(r.current, dx), r.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: a, ...u }));
    },
    [e, a]
  );
}
var Ry = {};
function gx(e, a, r) {
  !a && !Ry[e] && (Ry[e] = !0, It(!1, r));
}
var Ty = {};
function My(e, a) {
  !e && !Ty[a] && (Ty[a] = !0, console.warn(a));
}
var BN = "useOptimistic", Ay = WE[BN], UN = () => {
};
function VN(e) {
  return Ay ? Ay(e) : [e, UN];
}
function qN(e) {
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
var $N = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function IN(e, a) {
  return Y2({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: r2({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: e,
    hydrationRouteProperties: $N,
    mapRouteProperties: qN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var YN = class {
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
function GN({
  router: e,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = ux() || l;
  let [u, c] = S.useState(e.state), [d, p] = VN(u), [m, v] = S.useState(), [g, b] = S.useState({
    isTransitioning: !1
  }), [x, _] = S.useState(), [C, E] = S.useState(), [R, j] = S.useState(), N = S.useRef(/* @__PURE__ */ new Map()), z = S.useCallback(
    (A, { deletedFetchers: I, newErrors: J, flushSync: $, viewTransitionOpts: K }) => {
      J && r && Object.values(J).forEach(
        (O) => r(O, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: ls(A.matches)
        })
      ), A.fetchers.forEach((O, Y) => {
        O.data !== void 0 && N.current.set(Y, O.data);
      }), I.forEach((O) => N.current.delete(O)), My(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
      if (My(
        K == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !oe) {
        a && $ ? a(() => c(A)) : l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p((O) => Dy(O, A)), c(A);
        });
        return;
      }
      if (a && $) {
        a(() => {
          C && (x?.resolve(), C.skipTransition()), b({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let O = e.window.document.startViewTransition(() => {
          a(() => c(A));
        });
        O.finished.finally(() => {
          a(() => {
            _(void 0), E(void 0), v(void 0), b({ isTransitioning: !1 });
          });
        }), a(() => E(O));
        return;
      }
      C ? (x?.resolve(), C.skipTransition(), j({
        state: A,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (v(A), b({
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
  S.useLayoutEffect(() => e.subscribe(z), [e, z]), S.useEffect(() => {
    g.isTransitioning && !g.flushSync && _(new YN());
  }, [g]), S.useEffect(() => {
    if (x && m && e.window) {
      let A = m, I = x.promise, J = e.window.document.startViewTransition(async () => {
        l === !1 ? c(A) : S.startTransition(() => {
          l === !0 && p(($) => Dy($, A)), c(A);
        }), await I;
      });
      J.finished.finally(() => {
        _(void 0), E(void 0), v(void 0), b({ isTransitioning: !1 });
      }), E(J);
    }
  }, [
    m,
    x,
    e.window,
    l,
    p
  ]), S.useEffect(() => {
    x && m && d.location.key === m.location.key && x.resolve();
  }, [x, C, d.location, m]), S.useEffect(() => {
    !g.isTransitioning && R && (v(R.state), b({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: R.currentLocation,
      nextLocation: R.nextLocation
    }), j(void 0));
  }, [g.isTransitioning, R]);
  let H = S.useMemo(() => ({
    createHref: e.createHref,
    encodeLocation: e.encodeLocation,
    go: (A) => e.navigate(A),
    push: (A, I, J) => e.navigate(A, {
      state: I,
      preventScrollReset: J?.preventScrollReset
    }),
    replace: (A, I, J) => e.navigate(A, {
      replace: !0,
      state: I,
      preventScrollReset: J?.preventScrollReset
    })
  }), [e]), k = e.basename || "/", V = S.useMemo(
    () => ({
      router: e,
      navigator: H,
      static: !1,
      basename: k,
      onError: r
    }),
    [e, H, k, r]
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(Lr.Provider, { value: V }, /* @__PURE__ */ S.createElement(os.Provider, { value: d }, /* @__PURE__ */ S.createElement(cx.Provider, { value: N.current }, /* @__PURE__ */ S.createElement(Sm.Provider, { value: g }, /* @__PURE__ */ S.createElement(
    PN,
    {
      basename: k,
      location: d.location,
      navigationType: d.historyAction,
      navigator: H,
      useTransitions: l
    },
    /* @__PURE__ */ S.createElement(
      XN,
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
function Dy(e, a) {
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
var XN = S.memo(FN);
function FN({
  routes: e,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return CN(e, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function ZN(e) {
  return EN(e.context);
}
function PN({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Fe(
    !ss(),
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
  typeof r == "string" && (r = Na(r));
  let {
    pathname: m = "/",
    search: v = "",
    hash: g = "",
    state: b = null,
    key: x = "default",
    mask: _
  } = r, C = S.useMemo(() => {
    let E = ca(m, d);
    return E == null ? null : {
      location: {
        pathname: E,
        search: v,
        hash: g,
        state: b,
        key: x,
        mask: _
      },
      navigationType: l
    };
  }, [d, m, v, g, b, x, l, _]);
  return It(
    C != null,
    `<Router basename="${d}"> is not able to match the URL "${m}${v}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ S.createElement(fa.Provider, { value: p }, /* @__PURE__ */ S.createElement(Cc.Provider, { children: a, value: C }));
}
var Wu = "get", Ju = "application/x-www-form-urlencoded";
function Tc(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function QN(e) {
  return Tc(e) && e.tagName.toLowerCase() === "button";
}
function KN(e) {
  return Tc(e) && e.tagName.toLowerCase() === "form";
}
function WN(e) {
  return Tc(e) && e.tagName.toLowerCase() === "input";
}
function JN(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function eC(e, a) {
  return e.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !JN(e);
}
var Tu = null;
function tC() {
  if (Tu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Tu = !1;
    } catch {
      Tu = !0;
    }
  return Tu;
}
var nC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function oh(e) {
  return e != null && !nC.has(e) ? (It(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ju}"`
  ), null) : e;
}
function aC(e, a) {
  let r, l, s, u, c;
  if (KN(e)) {
    let d = e.getAttribute("action");
    l = d ? ca(d, a) : null, r = e.getAttribute("method") || Wu, s = oh(e.getAttribute("enctype")) || Ju, u = new FormData(e);
  } else if (QN(e) || WN(e) && (e.type === "submit" || e.type === "image")) {
    let d = e.form;
    if (d == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = e.getAttribute("formaction") || d.getAttribute("action");
    if (l = p ? ca(p, a) : null, r = e.getAttribute("formmethod") || d.getAttribute("method") || Wu, s = oh(e.getAttribute("formenctype")) || oh(d.getAttribute("enctype")) || Ju, u = new FormData(d, e), !tC()) {
      let { name: m, type: v, value: g } = e;
      if (v === "image") {
        let b = m ? `${m}.` : "";
        u.append(`${b}x`, "0"), u.append(`${b}y`, "0");
      } else m && u.append(m, g);
    }
  } else {
    if (Tc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Wu, l = null, s = Ju, c = e;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Cm(e, a) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(a);
}
function vx(e, a, r, l) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && ca(s.pathname, a) === "/" ? s.pathname = `${sc(a)}/_root.${l}` : s.pathname = `${sc(s.pathname)}.${l}`, s;
}
async function iC(e, a) {
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
function rC(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function lC(e, a, r) {
  let l = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await iC(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return cC(
    l.flat(1).filter(rC).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function jy(e, a, r, l, s, u) {
  let c = (p, m) => r[m] ? p.route.id !== r[m].route.id : !0, d = (p, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== p.params["*"]
  );
  return u === "assets" ? a.filter(
    (p, m) => c(p, m) || d(p, m)
  ) : u === "data" ? a.filter((p, m) => {
    let v = l.routes[p.route.id];
    if (!v || !v.hasLoader)
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
function oC(e, a, { includeHydrateFallback: r } = {}) {
  return sC(
    e.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function sC(e) {
  return [...new Set(e)];
}
function uC(e) {
  let a = {}, r = Object.keys(e).sort();
  for (let l of r)
    a[l] = e[l];
  return a;
}
function cC(e, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), e.reduce((l, s) => {
    let u = JSON.stringify(uC(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function Rm() {
  let e = S.useContext(Lr);
  return Cm(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function fC() {
  let e = S.useContext(os);
  return Cm(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var Tm = S.createContext(void 0);
Tm.displayName = "FrameworkContext";
function Mm() {
  let e = S.useContext(Tm);
  return Cm(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function dC(e, a) {
  let r = S.useContext(Tm), [l, s] = S.useState(!1), [u, c] = S.useState(!1), { onFocus: d, onBlur: p, onMouseEnter: m, onMouseLeave: v, onTouchStart: g } = a, b = S.useRef(null);
  S.useEffect(() => {
    if (e === "render" && c(!0), e === "viewport") {
      let C = (R) => {
        R.forEach((j) => {
          c(j.isIntersecting);
        });
      }, E = new IntersectionObserver(C, { threshold: 0.5 });
      return b.current && E.observe(b.current), () => {
        E.disconnect();
      };
    }
  }, [e]), S.useEffect(() => {
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
  }, _ = () => {
    s(!1), c(!1);
  };
  return r ? e !== "intent" ? [u, b, {}] : [
    u,
    b,
    {
      onFocus: Do(d, x),
      onBlur: Do(p, _),
      onMouseEnter: Do(m, x),
      onMouseLeave: Do(v, _),
      onTouchStart: Do(g, x)
    }
  ] : [!1, b, {}];
}
function Do(e, a) {
  return (r) => {
    e && e(r), r.defaultPrevented || a(r);
  };
}
function hC({ page: e, ...a }) {
  let r = ux(), { router: l } = Rm(), s = S.useMemo(
    () => $1(l.routes, e, l.basename),
    [l.routes, e, l.basename]
  );
  return s ? r ? /* @__PURE__ */ S.createElement(pC, { page: e, matches: s, ...a }) : /* @__PURE__ */ S.createElement(gC, { page: e, matches: s, ...a }) : null;
}
function mC(e) {
  let { manifest: a, routeModules: r } = Mm(), [l, s] = S.useState([]);
  return S.useEffect(() => {
    let u = !1;
    return lC(e, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [e, a, r]), l;
}
function pC({
  page: e,
  matches: a,
  ...r
}) {
  let l = pi(), { future: s } = Mm(), { basename: u } = Rm(), c = S.useMemo(() => {
    if (e === l.pathname + l.search + l.hash)
      return [];
    let d = vx(
      e,
      u,
      s.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, m = [];
    for (let v of a)
      typeof v.route.shouldRevalidate == "function" ? p = !0 : m.push(v.route.id);
    return p && m.length > 0 && d.searchParams.set("_routes", m.join(",")), [d.pathname + d.search];
  }, [
    u,
    s.v8_trailingSlashAwareDataRequests,
    e,
    l,
    a
  ]);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, c.map((d) => /* @__PURE__ */ S.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })));
}
function gC({
  page: e,
  matches: a,
  ...r
}) {
  let l = pi(), { future: s, manifest: u, routeModules: c } = Mm(), { basename: d } = Rm(), { loaderData: p, matches: m } = fC(), v = S.useMemo(
    () => jy(
      e,
      a,
      m,
      u,
      l,
      "data"
    ),
    [e, a, m, u, l]
  ), g = S.useMemo(
    () => jy(
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
    let C = /* @__PURE__ */ new Set(), E = !1;
    if (a.forEach((j) => {
      let N = u.routes[j.route.id];
      !N || !N.hasLoader || (!v.some((z) => z.route.id === j.route.id) && j.route.id in p && c[j.route.id]?.shouldRevalidate || N.hasClientLoader ? E = !0 : C.add(j.route.id));
    }), C.size === 0)
      return [];
    let R = vx(
      e,
      d,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return E && C.size > 0 && R.searchParams.set(
      "_routes",
      a.filter((j) => C.has(j.route.id)).map((j) => j.route.id).join(",")
    ), [R.pathname + R.search];
  }, [
    d,
    s.v8_trailingSlashAwareDataRequests,
    p,
    l,
    u,
    v,
    a,
    e,
    c
  ]), x = S.useMemo(
    () => oC(g, u),
    [g, u]
  ), _ = mC(g);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, b.map((C) => /* @__PURE__ */ S.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...r })), x.map((C) => /* @__PURE__ */ S.createElement("link", { key: C, rel: "modulepreload", href: C, ...r })), _.map(({ key: C, link: E }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ S.createElement(
      "link",
      {
        key: C,
        nonce: r.nonce,
        ...E,
        crossOrigin: E.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function vC(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var yC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  yC && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var yx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, bx = S.forwardRef(
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
    to: v,
    preventScrollReset: g,
    viewTransition: b,
    defaultShouldRevalidate: x,
    ..._
  }, C) {
    let { basename: E, navigator: R, useTransitions: j } = S.useContext(fa), N = typeof v == "string" && yx.test(v), z = Z1(v, E);
    v = z.to;
    let H = xN(v, { relative: s }), k = pi(), V = null;
    if (d) {
      let Y = Ec(
        d,
        [],
        k.mask ? k.mask.pathname : "/",
        !0
      );
      E !== "/" && (Y.pathname = Y.pathname === "/" ? E : ua([E, Y.pathname])), V = R.createHref(Y);
    }
    let [A, I, J] = dC(
      l,
      _
    ), $ = _C(v, {
      replace: c,
      mask: d,
      state: p,
      target: m,
      preventScrollReset: g,
      relative: s,
      viewTransition: b,
      defaultShouldRevalidate: x,
      useTransitions: j
    });
    function K(Y) {
      a && a(Y), Y.defaultPrevented || $(Y);
    }
    let oe = !(z.isExternal || u), O = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ S.createElement(
        "a",
        {
          ..._,
          ...J,
          href: (oe ? V : void 0) || z.absoluteURL || H,
          onClick: oe ? K : a,
          ref: vC(C, I),
          target: m,
          "data-discover": !N && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !N ? /* @__PURE__ */ S.createElement(S.Fragment, null, O, /* @__PURE__ */ S.createElement(hC, { page: H })) : O;
  }
);
bx.displayName = "Link";
var bC = S.forwardRef(
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
  }, v) {
    let g = us(c, { relative: m.relative }), b = pi(), x = S.useContext(os), { navigator: _, basename: C } = S.useContext(fa), E = x != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    RC(g) && d === !0, R = _.encodeLocation ? _.encodeLocation(g).pathname : g.pathname, j = b.pathname, N = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    r || (j = j.toLowerCase(), N = N ? N.toLowerCase() : null, R = R.toLowerCase()), N && C && (N = ca(N, C) || N);
    const z = R !== "/" && R.endsWith("/") ? R.length - 1 : R.length;
    let H = j === R || !s && j.startsWith(R) && j.charAt(z) === "/", k = N != null && (N === R || !s && N.startsWith(R) && N.charAt(R.length) === "/"), V = {
      isActive: H,
      isPending: k,
      isTransitioning: E
    }, A = H ? a : void 0, I;
    typeof l == "function" ? I = l(V) : I = [
      l,
      H ? "active" : null,
      k ? "pending" : null,
      E ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let J = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ S.createElement(
      bx,
      {
        ...m,
        "aria-current": A,
        className: I,
        ref: v,
        style: J,
        to: c,
        viewTransition: d
      },
      typeof p == "function" ? p(V) : p
    );
  }
);
bC.displayName = "NavLink";
var xC = S.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = Wu,
    action: d,
    onSubmit: p,
    relative: m,
    preventScrollReset: v,
    viewTransition: g,
    defaultShouldRevalidate: b,
    ...x
  }, _) => {
    let { useTransitions: C } = S.useContext(fa), E = NC(), R = CC(d, { relative: m }), j = c.toLowerCase() === "get" ? "get" : "post", N = typeof d == "string" && yx.test(d), z = (H) => {
      if (p && p(H), H.defaultPrevented) return;
      H.preventDefault();
      let k = H.nativeEvent.submitter, V = k?.getAttribute("formmethod") || c, A = () => E(k || H.currentTarget, {
        fetcherKey: a,
        method: V,
        navigate: r,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: v,
        viewTransition: g,
        defaultShouldRevalidate: b
      });
      C && r !== !1 ? S.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ S.createElement(
      "form",
      {
        ref: _,
        method: j,
        action: R,
        onSubmit: l ? p : z,
        ...x,
        "data-discover": !N && e === "render" ? "true" : void 0
      }
    );
  }
);
xC.displayName = "Form";
function wC(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function xx(e) {
  let a = S.useContext(Lr);
  return Fe(a, wC(e)), a;
}
function _C(e, {
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
  let v = wN(), g = pi(), b = us(e, { relative: c });
  return S.useCallback(
    (x) => {
      if (eC(x, a)) {
        x.preventDefault();
        let _ = r !== void 0 ? r : Ia(g) === Ia(b), C = () => v(e, {
          replace: _,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: d,
          defaultShouldRevalidate: p
        });
        m ? S.startTransition(() => C()) : C();
      }
    },
    [
      g,
      v,
      b,
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
var SC = 0, EC = () => `__${String(++SC)}__`;
function NC() {
  let { router: e } = xx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = S.useContext(fa), r = ON(), l = e.fetch, s = e.navigate;
  return S.useCallback(
    async (u, c = {}) => {
      let { action: d, method: p, encType: m, formData: v, body: g } = aC(
        u,
        a
      );
      if (c.navigate === !1) {
        let b = c.fetcherKey || EC();
        await l(b, r, c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: v,
          body: g,
          formMethod: c.method || p,
          formEncType: c.encType || m,
          flushSync: c.flushSync
        });
      } else
        await s(c.action || d, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: v,
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
function CC(e, { relative: a } = {}) {
  let { basename: r } = S.useContext(fa), l = S.useContext(Ca);
  Fe(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...us(e || ".", { relative: a }) }, c = pi();
  if (e == null) {
    u.search = c.search;
    let d = new URLSearchParams(u.search), p = d.getAll("index");
    if (p.some((v) => v === "")) {
      d.delete("index"), p.filter((g) => g).forEach((g) => d.append("index", g));
      let v = d.toString();
      u.search = v ? `?${v}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : ua([r, u.pathname])), Ia(u);
}
function RC(e, { relative: a } = {}) {
  let r = S.useContext(Sm);
  Fe(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = xx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = us(e, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = ca(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = ca(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return oc(s.pathname, c) != null || oc(s.pathname, u) != null;
}
const Am = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "flash3_fp4", label: "FlashAttention 3 FP4" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], TC = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], MC = [
  { value: "high", label: "High-noise SVI LoRA" },
  { value: "low", label: "Low-noise SVI LoRA" },
  { value: "off", label: "No SVI LoRA" }
], AC = [
  { value: "default", label: "Default (inductor)" },
  { value: "reduce-overhead", label: "Reduce-overhead (CUDA graphs)" },
  { value: "max-autotune", label: "Max-autotune (slow first build)" }
], wx = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  outputDir: "",
  baseModelFamilyId: "",
  ditHighPath: "",
  ditLowPath: "",
  sviLoraTier: "high"
};
class Mc extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const Ac = "/api/v1/extensions/nexus.video.svi2-pro";
async function er(e, a) {
  const r = e.startsWith("http") ? e : `${Ac}${e}`, l = await fetch(r, {
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
    throw new Mc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function DC(e, a, r) {
  const l = e.startsWith("http") ? e : `${Ac}${e}`, s = new EventSource(l);
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
async function _x() {
  return er("/presets");
}
async function jC() {
  return er("/settings");
}
async function uc(e) {
  return er("/settings", {
    method: "PUT",
    body: JSON.stringify(e)
  });
}
var zC = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function Xn({ tone: e = "neutral", children: a, className: r }) {
  const l = [zC[e], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsx("span", { className: l, children: a });
}
var OC = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, LC = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, kC = "_1h48t1v9";
function Va({
  variant: e = "primary",
  size: a = "md",
  type: r = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...d
}) {
  const p = [OC[e], LC[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs(
    "button",
    {
      type: r,
      className: p,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...d,
      children: [
        l ? /* @__PURE__ */ y.jsx("span", { className: kC, "aria-hidden": "true" }) : null,
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
var HC = { value: () => {
} };
function Dc() {
  for (var e = 0, a = arguments.length, r = {}, l; e < a; ++e) {
    if (!(l = arguments[e] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new ec(r);
}
function ec(e) {
  this._ = e;
}
function BC(e, a) {
  return e.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
ec.prototype = Dc.prototype = {
  constructor: ec,
  on: function(e, a) {
    var r = this._, l = BC(e + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (e = l[u]).type) && (s = UC(r[s], e.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (e = l[u]).type) r[s] = zy(r[s], e.name, a);
      else if (a == null) for (s in r) r[s] = zy(r[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, a = this._;
    for (var r in a) e[r] = a[r].slice();
    return new ec(e);
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
function UC(e, a) {
  for (var r = 0, l = e.length, s; r < l; ++r)
    if ((s = e[r]).name === a)
      return s.value;
}
function zy(e, a, r) {
  for (var l = 0, s = e.length; l < s; ++l)
    if (e[l].name === a) {
      e[l] = HC, e = e.slice(0, l).concat(e.slice(l + 1));
      break;
    }
  return r != null && e.push({ name: a, value: r }), e;
}
var qh = "http://www.w3.org/1999/xhtml";
const Oy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: qh,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function jc(e) {
  var a = e += "", r = a.indexOf(":");
  return r >= 0 && (a = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), Oy.hasOwnProperty(a) ? { space: Oy[a], local: e } : e;
}
function VC(e) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === qh && a.documentElement.namespaceURI === qh ? a.createElement(e) : a.createElementNS(r, e);
  };
}
function qC(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Sx(e) {
  var a = jc(e);
  return (a.local ? qC : VC)(a);
}
function $C() {
}
function Dm(e) {
  return e == null ? $C : function() {
    return this.querySelector(e);
  };
}
function IC(e) {
  typeof e != "function" && (e = Dm(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = new Array(c), p, m, v = 0; v < c; ++v)
      (p = u[v]) && (m = e.call(p, p.__data__, v, u)) && ("__data__" in p && (m.__data__ = p.__data__), d[v] = m);
  return new Zn(l, this._parents);
}
function YC(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function GC() {
  return [];
}
function Ex(e) {
  return e == null ? GC : function() {
    return this.querySelectorAll(e);
  };
}
function XC(e) {
  return function() {
    return YC(e.apply(this, arguments));
  };
}
function FC(e) {
  typeof e == "function" ? e = XC(e) : e = Ex(e);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && (l.push(e.call(p, p.__data__, m, c)), s.push(p));
  return new Zn(l, s);
}
function Nx(e) {
  return function() {
    return this.matches(e);
  };
}
function Cx(e) {
  return function(a) {
    return a.matches(e);
  };
}
var ZC = Array.prototype.find;
function PC(e) {
  return function() {
    return ZC.call(this.children, e);
  };
}
function QC() {
  return this.firstElementChild;
}
function KC(e) {
  return this.select(e == null ? QC : PC(typeof e == "function" ? e : Cx(e)));
}
var WC = Array.prototype.filter;
function JC() {
  return Array.from(this.children);
}
function eR(e) {
  return function() {
    return WC.call(this.children, e);
  };
}
function tR(e) {
  return this.selectAll(e == null ? JC : eR(typeof e == "function" ? e : Cx(e)));
}
function nR(e) {
  typeof e != "function" && (e = Nx(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new Zn(l, this._parents);
}
function Rx(e) {
  return new Array(e.length);
}
function aR() {
  return new Zn(this._enter || this._groups.map(Rx), this._parents);
}
function cc(e, a) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = a;
}
cc.prototype = {
  constructor: cc,
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
function iR(e) {
  return function() {
    return e;
  };
}
function rR(e, a, r, l, s, u) {
  for (var c = 0, d, p = a.length, m = u.length; c < m; ++c)
    (d = a[c]) ? (d.__data__ = u[c], l[c] = d) : r[c] = new cc(e, u[c]);
  for (; c < p; ++c)
    (d = a[c]) && (s[c] = d);
}
function lR(e, a, r, l, s, u, c) {
  var d, p, m = /* @__PURE__ */ new Map(), v = a.length, g = u.length, b = new Array(v), x;
  for (d = 0; d < v; ++d)
    (p = a[d]) && (b[d] = x = c.call(p, p.__data__, d, a) + "", m.has(x) ? s[d] = p : m.set(x, p));
  for (d = 0; d < g; ++d)
    x = c.call(e, u[d], d, u) + "", (p = m.get(x)) ? (l[d] = p, p.__data__ = u[d], m.delete(x)) : r[d] = new cc(e, u[d]);
  for (d = 0; d < v; ++d)
    (p = a[d]) && m.get(b[d]) === p && (s[d] = p);
}
function oR(e) {
  return e.__data__;
}
function sR(e, a) {
  if (!arguments.length) return Array.from(this, oR);
  var r = a ? lR : rR, l = this._parents, s = this._groups;
  typeof e != "function" && (e = iR(e));
  for (var u = s.length, c = new Array(u), d = new Array(u), p = new Array(u), m = 0; m < u; ++m) {
    var v = l[m], g = s[m], b = g.length, x = uR(e.call(v, v && v.__data__, m, l)), _ = x.length, C = d[m] = new Array(_), E = c[m] = new Array(_), R = p[m] = new Array(b);
    r(v, g, C, E, R, x, a);
    for (var j = 0, N = 0, z, H; j < _; ++j)
      if (z = C[j]) {
        for (j >= N && (N = j + 1); !(H = E[N]) && ++N < _; ) ;
        z._next = H || null;
      }
  }
  return c = new Zn(c, l), c._enter = d, c._exit = p, c;
}
function uR(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function cR() {
  return new Zn(this._exit || this._groups.map(Rx), this._parents);
}
function fR(e, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof e == "function" ? (l = e(l), l && (l = l.selection())) : l = l.append(e + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function dR(e) {
  for (var a = e.selection ? e.selection() : e, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), d = new Array(s), p = 0; p < c; ++p)
    for (var m = r[p], v = l[p], g = m.length, b = d[p] = new Array(g), x, _ = 0; _ < g; ++_)
      (x = m[_] || v[_]) && (b[_] = x);
  for (; p < s; ++p)
    d[p] = r[p];
  return new Zn(d, this._parents);
}
function hR() {
  for (var e = this._groups, a = -1, r = e.length; ++a < r; )
    for (var l = e[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function mR(e) {
  e || (e = pR);
  function a(g, b) {
    return g && b ? e(g.__data__, b.__data__) : !g - !b;
  }
  for (var r = this._groups, l = r.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = r[u], d = c.length, p = s[u] = new Array(d), m, v = 0; v < d; ++v)
      (m = c[v]) && (p[v] = m);
    p.sort(a);
  }
  return new Zn(s, this._parents).order();
}
function pR(e, a) {
  return e < a ? -1 : e > a ? 1 : e >= a ? 0 : NaN;
}
function gR() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function vR() {
  return Array.from(this);
}
function yR() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function bR() {
  let e = 0;
  for (const a of this) ++e;
  return e;
}
function xR() {
  return !this.node();
}
function wR(e) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && e.call(d, d.__data__, u, s);
  return this;
}
function _R(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function SR(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ER(e, a) {
  return function() {
    this.setAttribute(e, a);
  };
}
function NR(e, a) {
  return function() {
    this.setAttributeNS(e.space, e.local, a);
  };
}
function CR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
  };
}
function RR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
  };
}
function TR(e, a) {
  var r = jc(e);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? SR : _R : typeof a == "function" ? r.local ? RR : CR : r.local ? NR : ER)(r, a));
}
function Tx(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function MR(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function AR(e, a, r) {
  return function() {
    this.style.setProperty(e, a, r);
  };
}
function DR(e, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(e) : this.style.setProperty(e, l, r);
  };
}
function jR(e, a, r) {
  return arguments.length > 1 ? this.each((a == null ? MR : typeof a == "function" ? DR : AR)(e, a, r ?? "")) : Tl(this.node(), e);
}
function Tl(e, a) {
  return e.style.getPropertyValue(a) || Tx(e).getComputedStyle(e, null).getPropertyValue(a);
}
function zR(e) {
  return function() {
    delete this[e];
  };
}
function OR(e, a) {
  return function() {
    this[e] = a;
  };
}
function LR(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[e] : this[e] = r;
  };
}
function kR(e, a) {
  return arguments.length > 1 ? this.each((a == null ? zR : typeof a == "function" ? LR : OR)(e, a)) : this.node()[e];
}
function Mx(e) {
  return e.trim().split(/^|\s+/);
}
function jm(e) {
  return e.classList || new Ax(e);
}
function Ax(e) {
  this._node = e, this._names = Mx(e.getAttribute("class") || "");
}
Ax.prototype = {
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
function Dx(e, a) {
  for (var r = jm(e), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function jx(e, a) {
  for (var r = jm(e), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function HR(e) {
  return function() {
    Dx(this, e);
  };
}
function BR(e) {
  return function() {
    jx(this, e);
  };
}
function UR(e, a) {
  return function() {
    (a.apply(this, arguments) ? Dx : jx)(this, e);
  };
}
function VR(e, a) {
  var r = Mx(e + "");
  if (arguments.length < 2) {
    for (var l = jm(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? UR : a ? HR : BR)(r, a));
}
function qR() {
  this.textContent = "";
}
function $R(e) {
  return function() {
    this.textContent = e;
  };
}
function IR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function YR(e) {
  return arguments.length ? this.each(e == null ? qR : (typeof e == "function" ? IR : $R)(e)) : this.node().textContent;
}
function GR() {
  this.innerHTML = "";
}
function XR(e) {
  return function() {
    this.innerHTML = e;
  };
}
function FR(e) {
  return function() {
    var a = e.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function ZR(e) {
  return arguments.length ? this.each(e == null ? GR : (typeof e == "function" ? FR : XR)(e)) : this.node().innerHTML;
}
function PR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function QR() {
  return this.each(PR);
}
function KR() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function WR() {
  return this.each(KR);
}
function JR(e) {
  var a = typeof e == "function" ? e : Sx(e);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function eT() {
  return null;
}
function tT(e, a) {
  var r = typeof e == "function" ? e : Sx(e), l = a == null ? eT : typeof a == "function" ? a : Dm(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function nT() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function aT() {
  return this.each(nT);
}
function iT() {
  var e = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function rT() {
  var e = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(e, this.nextSibling) : e;
}
function lT(e) {
  return this.select(e ? rT : iT);
}
function oT(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function sT(e) {
  return function(a) {
    e.call(this, a, this.__data__);
  };
}
function uT(e) {
  return e.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function cT(e) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!e.type || u.type === e.type) && u.name === e.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function fT(e, a, r) {
  return function() {
    var l = this.__on, s, u = sT(a);
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
function dT(e, a, r) {
  var l = uT(e + ""), s, u = l.length, c;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var p = 0, m = d.length, v; p < m; ++p)
        for (s = 0, v = d[p]; s < u; ++s)
          if ((c = l[s]).type === v.type && c.name === v.name)
            return v.value;
    }
    return;
  }
  for (d = a ? fT : cT, s = 0; s < u; ++s) this.each(d(l[s], a, r));
  return this;
}
function zx(e, a, r) {
  var l = Tx(e), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), e.dispatchEvent(s);
}
function hT(e, a) {
  return function() {
    return zx(this, e, a);
  };
}
function mT(e, a) {
  return function() {
    return zx(this, e, a.apply(this, arguments));
  };
}
function pT(e, a) {
  return this.each((typeof a == "function" ? mT : hT)(e, a));
}
function* gT() {
  for (var e = this._groups, a = 0, r = e.length; a < r; ++a)
    for (var l = e[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var Ox = [null];
function Zn(e, a) {
  this._groups = e, this._parents = a;
}
function cs() {
  return new Zn([[document.documentElement]], Ox);
}
function vT() {
  return this;
}
Zn.prototype = cs.prototype = {
  constructor: Zn,
  select: IC,
  selectAll: FC,
  selectChild: KC,
  selectChildren: tR,
  filter: nR,
  data: sR,
  enter: aR,
  exit: cR,
  join: fR,
  merge: dR,
  selection: vT,
  order: hR,
  sort: mR,
  call: gR,
  nodes: vR,
  node: yR,
  size: bR,
  empty: xR,
  each: wR,
  attr: TR,
  style: jR,
  property: kR,
  classed: VR,
  text: YR,
  html: ZR,
  raise: QR,
  lower: WR,
  append: JR,
  insert: tT,
  remove: aT,
  clone: lT,
  datum: oT,
  on: dT,
  dispatch: pT,
  [Symbol.iterator]: gT
};
function Fn(e) {
  return typeof e == "string" ? new Zn([[document.querySelector(e)]], [document.documentElement]) : new Zn([[e]], Ox);
}
function yT(e) {
  let a;
  for (; a = e.sourceEvent; ) e = a;
  return e;
}
function xa(e, a) {
  if (e = yT(e), a === void 0 && (a = e.currentTarget), a) {
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
const bT = { passive: !1 }, Xo = { capture: !0, passive: !1 };
function sh(e) {
  e.stopImmediatePropagation();
}
function Nl(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Lx(e) {
  var a = e.document.documentElement, r = Fn(e).on("dragstart.drag", Nl, Xo);
  "onselectstart" in a ? r.on("selectstart.drag", Nl, Xo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function kx(e, a) {
  var r = e.document.documentElement, l = Fn(e).on("dragstart.drag", null);
  a && (l.on("click.drag", Nl, Xo), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const Mu = (e) => () => e;
function $h(e, {
  sourceEvent: a,
  subject: r,
  target: l,
  identifier: s,
  active: u,
  x: c,
  y: d,
  dx: p,
  dy: m,
  dispatch: v
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
    _: { value: v }
  });
}
$h.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function xT(e) {
  return !e.ctrlKey && !e.button;
}
function wT() {
  return this.parentNode;
}
function _T(e, a) {
  return a ?? { x: e.x, y: e.y };
}
function ST() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Hx() {
  var e = xT, a = wT, r = _T, l = ST, s = {}, u = Dc("start", "drag", "end"), c = 0, d, p, m, v, g = 0;
  function b(z) {
    z.on("mousedown.drag", x).filter(l).on("touchstart.drag", E).on("touchmove.drag", R, bT).on("touchend.drag touchcancel.drag", j).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(z, H) {
    if (!(v || !e.call(this, z, H))) {
      var k = N(this, a.call(this, z, H), z, H, "mouse");
      k && (Fn(z.view).on("mousemove.drag", _, Xo).on("mouseup.drag", C, Xo), Lx(z.view), sh(z), m = !1, d = z.clientX, p = z.clientY, k("start", z));
    }
  }
  function _(z) {
    if (Nl(z), !m) {
      var H = z.clientX - d, k = z.clientY - p;
      m = H * H + k * k > g;
    }
    s.mouse("drag", z);
  }
  function C(z) {
    Fn(z.view).on("mousemove.drag mouseup.drag", null), kx(z.view, m), Nl(z), s.mouse("end", z);
  }
  function E(z, H) {
    if (e.call(this, z, H)) {
      var k = z.changedTouches, V = a.call(this, z, H), A = k.length, I, J;
      for (I = 0; I < A; ++I)
        (J = N(this, V, z, H, k[I].identifier, k[I])) && (sh(z), J("start", z, k[I]));
    }
  }
  function R(z) {
    var H = z.changedTouches, k = H.length, V, A;
    for (V = 0; V < k; ++V)
      (A = s[H[V].identifier]) && (Nl(z), A("drag", z, H[V]));
  }
  function j(z) {
    var H = z.changedTouches, k = H.length, V, A;
    for (v && clearTimeout(v), v = setTimeout(function() {
      v = null;
    }, 500), V = 0; V < k; ++V)
      (A = s[H[V].identifier]) && (sh(z), A("end", z, H[V]));
  }
  function N(z, H, k, V, A, I) {
    var J = u.copy(), $ = xa(I || k, H), K, oe, O;
    if ((O = r.call(z, new $h("beforestart", {
      sourceEvent: k,
      target: b,
      identifier: A,
      active: c,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: J
    }), V)) != null)
      return K = O.x - $[0] || 0, oe = O.y - $[1] || 0, function Y(T, L, Z) {
        var X = $, ne;
        switch (T) {
          case "start":
            s[A] = Y, ne = c++;
            break;
          case "end":
            delete s[A], --c;
          // falls through
          case "drag":
            $ = xa(Z || L, H), ne = c;
            break;
        }
        J.call(
          T,
          z,
          new $h(T, {
            sourceEvent: L,
            subject: O,
            target: b,
            identifier: A,
            active: ne,
            x: $[0] + K,
            y: $[1] + oe,
            dx: $[0] - X[0],
            dy: $[1] - X[1],
            dispatch: J
          }),
          V
        );
      };
  }
  return b.filter = function(z) {
    return arguments.length ? (e = typeof z == "function" ? z : Mu(!!z), b) : e;
  }, b.container = function(z) {
    return arguments.length ? (a = typeof z == "function" ? z : Mu(z), b) : a;
  }, b.subject = function(z) {
    return arguments.length ? (r = typeof z == "function" ? z : Mu(z), b) : r;
  }, b.touchable = function(z) {
    return arguments.length ? (l = typeof z == "function" ? z : Mu(!!z), b) : l;
  }, b.on = function() {
    var z = u.on.apply(u, arguments);
    return z === u ? b : z;
  }, b.clickDistance = function(z) {
    return arguments.length ? (g = (z = +z) * z, b) : Math.sqrt(g);
  }, b;
}
function zm(e, a, r) {
  e.prototype = a.prototype = r, r.constructor = e;
}
function Bx(e, a) {
  var r = Object.create(e.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function fs() {
}
var Fo = 0.7, fc = 1 / Fo, Cl = "\\s*([+-]?\\d+)\\s*", Zo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", qa = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ET = /^#([0-9a-f]{3,8})$/, NT = new RegExp(`^rgb\\(${Cl},${Cl},${Cl}\\)$`), CT = new RegExp(`^rgb\\(${qa},${qa},${qa}\\)$`), RT = new RegExp(`^rgba\\(${Cl},${Cl},${Cl},${Zo}\\)$`), TT = new RegExp(`^rgba\\(${qa},${qa},${qa},${Zo}\\)$`), MT = new RegExp(`^hsl\\(${Zo},${qa},${qa}\\)$`), AT = new RegExp(`^hsla\\(${Zo},${qa},${qa},${Zo}\\)$`), Ly = {
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
zm(fs, Tr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ky,
  // Deprecated! Use color.formatHex.
  formatHex: ky,
  formatHex8: DT,
  formatHsl: jT,
  formatRgb: Hy,
  toString: Hy
});
function ky() {
  return this.rgb().formatHex();
}
function DT() {
  return this.rgb().formatHex8();
}
function jT() {
  return Ux(this).formatHsl();
}
function Hy() {
  return this.rgb().formatRgb();
}
function Tr(e) {
  var a, r;
  return e = (e + "").trim().toLowerCase(), (a = ET.exec(e)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? By(a) : r === 3 ? new zn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? Au(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? Au(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = NT.exec(e)) ? new zn(a[1], a[2], a[3], 1) : (a = CT.exec(e)) ? new zn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = RT.exec(e)) ? Au(a[1], a[2], a[3], a[4]) : (a = TT.exec(e)) ? Au(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = MT.exec(e)) ? qy(a[1], a[2] / 100, a[3] / 100, 1) : (a = AT.exec(e)) ? qy(a[1], a[2] / 100, a[3] / 100, a[4]) : Ly.hasOwnProperty(e) ? By(Ly[e]) : e === "transparent" ? new zn(NaN, NaN, NaN, 0) : null;
}
function By(e) {
  return new zn(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Au(e, a, r, l) {
  return l <= 0 && (e = a = r = NaN), new zn(e, a, r, l);
}
function zT(e) {
  return e instanceof fs || (e = Tr(e)), e ? (e = e.rgb(), new zn(e.r, e.g, e.b, e.opacity)) : new zn();
}
function Ih(e, a, r, l) {
  return arguments.length === 1 ? zT(e) : new zn(e, a, r, l ?? 1);
}
function zn(e, a, r, l) {
  this.r = +e, this.g = +a, this.b = +r, this.opacity = +l;
}
zm(zn, Ih, Bx(fs, {
  brighter(e) {
    return e = e == null ? fc : Math.pow(fc, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Fo : Math.pow(Fo, e), new zn(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new zn(Cr(this.r), Cr(this.g), Cr(this.b), dc(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Uy,
  // Deprecated! Use color.formatHex.
  formatHex: Uy,
  formatHex8: OT,
  formatRgb: Vy,
  toString: Vy
}));
function Uy() {
  return `#${Er(this.r)}${Er(this.g)}${Er(this.b)}`;
}
function OT() {
  return `#${Er(this.r)}${Er(this.g)}${Er(this.b)}${Er((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Vy() {
  const e = dc(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Cr(this.r)}, ${Cr(this.g)}, ${Cr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function dc(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Cr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Er(e) {
  return e = Cr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function qy(e, a, r, l) {
  return l <= 0 ? e = a = r = NaN : r <= 0 || r >= 1 ? e = a = NaN : a <= 0 && (e = NaN), new wa(e, a, r, l);
}
function Ux(e) {
  if (e instanceof wa) return new wa(e.h, e.s, e.l, e.opacity);
  if (e instanceof fs || (e = Tr(e)), !e) return new wa();
  if (e instanceof wa) return e;
  e = e.rgb();
  var a = e.r / 255, r = e.g / 255, l = e.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, d = u - s, p = (u + s) / 2;
  return d ? (a === u ? c = (r - l) / d + (r < l) * 6 : r === u ? c = (l - a) / d + 2 : c = (a - r) / d + 4, d /= p < 0.5 ? u + s : 2 - u - s, c *= 60) : d = p > 0 && p < 1 ? 0 : c, new wa(c, d, p, e.opacity);
}
function LT(e, a, r, l) {
  return arguments.length === 1 ? Ux(e) : new wa(e, a, r, l ?? 1);
}
function wa(e, a, r, l) {
  this.h = +e, this.s = +a, this.l = +r, this.opacity = +l;
}
zm(wa, LT, Bx(fs, {
  brighter(e) {
    return e = e == null ? fc : Math.pow(fc, e), new wa(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Fo : Math.pow(Fo, e), new wa(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, a = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new zn(
      uh(e >= 240 ? e - 240 : e + 120, s, l),
      uh(e, s, l),
      uh(e < 120 ? e + 240 : e - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new wa($y(this.h), Du(this.s), Du(this.l), dc(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = dc(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${$y(this.h)}, ${Du(this.s) * 100}%, ${Du(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function $y(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Du(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function uh(e, a, r) {
  return (e < 60 ? a + (r - a) * e / 60 : e < 180 ? r : e < 240 ? a + (r - a) * (240 - e) / 60 : a) * 255;
}
const Om = (e) => () => e;
function kT(e, a) {
  return function(r) {
    return e + r * a;
  };
}
function HT(e, a, r) {
  return e = Math.pow(e, r), a = Math.pow(a, r) - e, r = 1 / r, function(l) {
    return Math.pow(e + l * a, r);
  };
}
function BT(e) {
  return (e = +e) == 1 ? Vx : function(a, r) {
    return r - a ? HT(a, r, e) : Om(isNaN(a) ? r : a);
  };
}
function Vx(e, a) {
  var r = a - e;
  return r ? kT(e, r) : Om(isNaN(e) ? a : e);
}
const hc = (function e(a) {
  var r = BT(a);
  function l(s, u) {
    var c = r((s = Ih(s)).r, (u = Ih(u)).r), d = r(s.g, u.g), p = r(s.b, u.b), m = Vx(s.opacity, u.opacity);
    return function(v) {
      return s.r = c(v), s.g = d(v), s.b = p(v), s.opacity = m(v), s + "";
    };
  }
  return l.gamma = e, l;
})(1);
function UT(e, a) {
  a || (a = []);
  var r = e ? Math.min(a.length, e.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = e[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function VT(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function qT(e, a) {
  var r = a ? a.length : 0, l = e ? Math.min(r, e.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = qo(e[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(d) {
    for (c = 0; c < l; ++c) u[c] = s[c](d);
    return u;
  };
}
function $T(e, a) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, a = +a, function(l) {
    return r.setTime(e * (1 - l) + a * l), r;
  };
}
function Ba(e, a) {
  return e = +e, a = +a, function(r) {
    return e * (1 - r) + a * r;
  };
}
function IT(e, a) {
  var r = {}, l = {}, s;
  (e === null || typeof e != "object") && (e = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in e ? r[s] = qo(e[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var Yh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ch = new RegExp(Yh.source, "g");
function YT(e) {
  return function() {
    return e;
  };
}
function GT(e) {
  return function(a) {
    return e(a) + "";
  };
}
function qx(e, a) {
  var r = Yh.lastIndex = ch.lastIndex = 0, l, s, u, c = -1, d = [], p = [];
  for (e = e + "", a = a + ""; (l = Yh.exec(e)) && (s = ch.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), d[c] ? d[c] += u : d[++c] = u), (l = l[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, p.push({ i: c, x: Ba(l, s) })), r = ch.lastIndex;
  return r < a.length && (u = a.slice(r), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? p[0] ? GT(p[0].x) : YT(a) : (a = p.length, function(m) {
    for (var v = 0, g; v < a; ++v) d[(g = p[v]).i] = g.x(m);
    return d.join("");
  });
}
function qo(e, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? Om(a) : (r === "number" ? Ba : r === "string" ? (l = Tr(a)) ? (a = l, hc) : qx : a instanceof Tr ? hc : a instanceof Date ? $T : VT(a) ? UT : Array.isArray(a) ? qT : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? IT : Ba)(e, a);
}
var Iy = 180 / Math.PI, Gh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function $x(e, a, r, l, s, u) {
  var c, d, p;
  return (c = Math.sqrt(e * e + a * a)) && (e /= c, a /= c), (p = e * r + a * l) && (r -= e * p, l -= a * p), (d = Math.sqrt(r * r + l * l)) && (r /= d, l /= d, p /= d), e * l < a * r && (e = -e, a = -a, p = -p, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, e) * Iy,
    skewX: Math.atan(p) * Iy,
    scaleX: c,
    scaleY: d
  };
}
var ju;
function XT(e) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return a.isIdentity ? Gh : $x(a.a, a.b, a.c, a.d, a.e, a.f);
}
function FT(e) {
  return e == null || (ju || (ju = document.createElementNS("http://www.w3.org/2000/svg", "g")), ju.setAttribute("transform", e), !(e = ju.transform.baseVal.consolidate())) ? Gh : (e = e.matrix, $x(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Ix(e, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, v, g, b, x, _) {
    if (m !== g || v !== b) {
      var C = x.push("translate(", null, a, null, r);
      _.push({ i: C - 4, x: Ba(m, g) }, { i: C - 2, x: Ba(v, b) });
    } else (g || b) && x.push("translate(" + g + a + b + r);
  }
  function c(m, v, g, b) {
    m !== v ? (m - v > 180 ? v += 360 : v - m > 180 && (m += 360), b.push({ i: g.push(s(g) + "rotate(", null, l) - 2, x: Ba(m, v) })) : v && g.push(s(g) + "rotate(" + v + l);
  }
  function d(m, v, g, b) {
    m !== v ? b.push({ i: g.push(s(g) + "skewX(", null, l) - 2, x: Ba(m, v) }) : v && g.push(s(g) + "skewX(" + v + l);
  }
  function p(m, v, g, b, x, _) {
    if (m !== g || v !== b) {
      var C = x.push(s(x) + "scale(", null, ",", null, ")");
      _.push({ i: C - 4, x: Ba(m, g) }, { i: C - 2, x: Ba(v, b) });
    } else (g !== 1 || b !== 1) && x.push(s(x) + "scale(" + g + "," + b + ")");
  }
  return function(m, v) {
    var g = [], b = [];
    return m = e(m), v = e(v), u(m.translateX, m.translateY, v.translateX, v.translateY, g, b), c(m.rotate, v.rotate, g, b), d(m.skewX, v.skewX, g, b), p(m.scaleX, m.scaleY, v.scaleX, v.scaleY, g, b), m = v = null, function(x) {
      for (var _ = -1, C = b.length, E; ++_ < C; ) g[(E = b[_]).i] = E.x(x);
      return g.join("");
    };
  };
}
var ZT = Ix(XT, "px, ", "px)", "deg)"), PT = Ix(FT, ", ", ")", ")"), QT = 1e-12;
function Yy(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function KT(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function WT(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const tc = (function e(a, r, l) {
  function s(u, c) {
    var d = u[0], p = u[1], m = u[2], v = c[0], g = c[1], b = c[2], x = v - d, _ = g - p, C = x * x + _ * _, E, R;
    if (C < QT)
      R = Math.log(b / m) / a, E = function(V) {
        return [
          d + V * x,
          p + V * _,
          m * Math.exp(a * V * R)
        ];
      };
    else {
      var j = Math.sqrt(C), N = (b * b - m * m + l * C) / (2 * m * r * j), z = (b * b - m * m - l * C) / (2 * b * r * j), H = Math.log(Math.sqrt(N * N + 1) - N), k = Math.log(Math.sqrt(z * z + 1) - z);
      R = (k - H) / a, E = function(V) {
        var A = V * R, I = Yy(H), J = m / (r * j) * (I * WT(a * A + H) - KT(H));
        return [
          d + J * x,
          p + J * _,
          m * I / Yy(a * A + H)
        ];
      };
    }
    return E.duration = R * 1e3 * a / Math.SQRT2, E;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, p = d * d;
    return e(c, d, p);
  }, s;
})(Math.SQRT2, 2, 4);
var Ml = 0, Bo = 0, jo = 0, Yx = 1e3, mc, Uo, pc = 0, Mr = 0, zc = 0, Po = typeof performance == "object" && performance.now ? performance : Date, Gx = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Lm() {
  return Mr || (Gx(JT), Mr = Po.now() + zc);
}
function JT() {
  Mr = 0;
}
function gc() {
  this._call = this._time = this._next = null;
}
gc.prototype = Xx.prototype = {
  constructor: gc,
  restart: function(e, a, r) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Lm() : +r) + (a == null ? 0 : +a), !this._next && Uo !== this && (Uo ? Uo._next = this : mc = this, Uo = this), this._call = e, this._time = r, Xh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Xh());
  }
};
function Xx(e, a, r) {
  var l = new gc();
  return l.restart(e, a, r), l;
}
function eM() {
  Lm(), ++Ml;
  for (var e = mc, a; e; )
    (a = Mr - e._time) >= 0 && e._call.call(void 0, a), e = e._next;
  --Ml;
}
function Gy() {
  Mr = (pc = Po.now()) + zc, Ml = Bo = 0;
  try {
    eM();
  } finally {
    Ml = 0, nM(), Mr = 0;
  }
}
function tM() {
  var e = Po.now(), a = e - pc;
  a > Yx && (zc -= a, pc = e);
}
function nM() {
  for (var e, a = mc, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), e = a, a = a._next) : (r = a._next, a._next = null, a = e ? e._next = r : mc = r);
  Uo = e, Xh(l);
}
function Xh(e) {
  if (!Ml) {
    Bo && (Bo = clearTimeout(Bo));
    var a = e - Mr;
    a > 24 ? (e < 1 / 0 && (Bo = setTimeout(Gy, e - Po.now() - zc)), jo && (jo = clearInterval(jo))) : (jo || (pc = Po.now(), jo = setInterval(tM, Yx)), Ml = 1, Gx(Gy));
  }
}
function Xy(e, a, r) {
  var l = new gc();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), e(s + a);
  }, a, r), l;
}
var aM = Dc("start", "end", "cancel", "interrupt"), iM = [], Fx = 0, Fy = 1, Fh = 2, nc = 3, Zy = 4, Zh = 5, ac = 6;
function Oc(e, a, r, l, s, u) {
  var c = e.__transition;
  if (!c) e.__transition = {};
  else if (r in c) return;
  rM(e, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: aM,
    tween: iM,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: Fx
  });
}
function km(e, a) {
  var r = Ra(e, a);
  if (r.state > Fx) throw new Error("too late; already scheduled");
  return r;
}
function Ya(e, a) {
  var r = Ra(e, a);
  if (r.state > nc) throw new Error("too late; already running");
  return r;
}
function Ra(e, a) {
  var r = e.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function rM(e, a, r) {
  var l = e.__transition, s;
  l[a] = r, r.timer = Xx(u, 0, r.time);
  function u(m) {
    r.state = Fy, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var v, g, b, x;
    if (r.state !== Fy) return p();
    for (v in l)
      if (x = l[v], x.name === r.name) {
        if (x.state === nc) return Xy(c);
        x.state === Zy ? (x.state = ac, x.timer.stop(), x.on.call("interrupt", e, e.__data__, x.index, x.group), delete l[v]) : +v < a && (x.state = ac, x.timer.stop(), x.on.call("cancel", e, e.__data__, x.index, x.group), delete l[v]);
      }
    if (Xy(function() {
      r.state === nc && (r.state = Zy, r.timer.restart(d, r.delay, r.time), d(m));
    }), r.state = Fh, r.on.call("start", e, e.__data__, r.index, r.group), r.state === Fh) {
      for (r.state = nc, s = new Array(b = r.tween.length), v = 0, g = -1; v < b; ++v)
        (x = r.tween[v].value.call(e, e.__data__, r.index, r.group)) && (s[++g] = x);
      s.length = g + 1;
    }
  }
  function d(m) {
    for (var v = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(p), r.state = Zh, 1), g = -1, b = s.length; ++g < b; )
      s[g].call(e, v);
    r.state === Zh && (r.on.call("end", e, e.__data__, r.index, r.group), p());
  }
  function p() {
    r.state = ac, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete e.__transition;
  }
}
function ic(e, a) {
  var r = e.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > Fh && l.state < Zh, l.state = ac, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", e, e.__data__, l.index, l.group), delete r[c];
    }
    u && delete e.__transition;
  }
}
function lM(e) {
  return this.each(function() {
    ic(this, e);
  });
}
function oM(e, a) {
  var r, l;
  return function() {
    var s = Ya(this, e), u = s.tween;
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
function sM(e, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = Ya(this, e), c = u.tween;
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
function uM(e, a) {
  var r = this._id;
  if (e += "", arguments.length < 2) {
    for (var l = Ra(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === e)
        return c.value;
    return null;
  }
  return this.each((a == null ? oM : sM)(r, e, a));
}
function Hm(e, a, r) {
  var l = e._id;
  return e.each(function() {
    var s = Ya(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return Ra(s, l).value[a];
  };
}
function Zx(e, a) {
  var r;
  return (typeof a == "number" ? Ba : a instanceof Tr ? hc : (r = Tr(a)) ? (a = r, hc) : qx)(e, a);
}
function cM(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function fM(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function dM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function hM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(e.space, e.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function mM(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttribute(e) : (c = this.getAttribute(e), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function pM(e, a, r) {
  var l, s, u;
  return function() {
    var c, d = r(this), p;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (c = this.getAttributeNS(e.space, e.local), p = d + "", c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d)));
  };
}
function gM(e, a) {
  var r = jc(e), l = r === "transform" ? PT : Zx;
  return this.attrTween(e, typeof a == "function" ? (r.local ? pM : mM)(r, l, Hm(this, "attr." + e, a)) : a == null ? (r.local ? fM : cM)(r) : (r.local ? hM : dM)(r, l, a));
}
function vM(e, a) {
  return function(r) {
    this.setAttribute(e, a.call(this, r));
  };
}
function yM(e, a) {
  return function(r) {
    this.setAttributeNS(e.space, e.local, a.call(this, r));
  };
}
function bM(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && yM(e, u)), r;
  }
  return s._value = a, s;
}
function xM(e, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && vM(e, u)), r;
  }
  return s._value = a, s;
}
function wM(e, a) {
  var r = "attr." + e;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = jc(e);
  return this.tween(r, (l.local ? bM : xM)(l, a));
}
function _M(e, a) {
  return function() {
    km(this, e).delay = +a.apply(this, arguments);
  };
}
function SM(e, a) {
  return a = +a, function() {
    km(this, e).delay = a;
  };
}
function EM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? _M : SM)(a, e)) : Ra(this.node(), a).delay;
}
function NM(e, a) {
  return function() {
    Ya(this, e).duration = +a.apply(this, arguments);
  };
}
function CM(e, a) {
  return a = +a, function() {
    Ya(this, e).duration = a;
  };
}
function RM(e) {
  var a = this._id;
  return arguments.length ? this.each((typeof e == "function" ? NM : CM)(a, e)) : Ra(this.node(), a).duration;
}
function TM(e, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Ya(this, e).ease = a;
  };
}
function MM(e) {
  var a = this._id;
  return arguments.length ? this.each(TM(a, e)) : Ra(this.node(), a).ease;
}
function AM(e, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    Ya(this, e).ease = r;
  };
}
function DM(e) {
  if (typeof e != "function") throw new Error();
  return this.each(AM(this._id, e));
}
function jM(e) {
  typeof e != "function" && (e = Nx(e));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, d = l[s] = [], p, m = 0; m < c; ++m)
      (p = u[m]) && e.call(p, p.__data__, m, u) && d.push(p);
  return new mi(l, this._parents, this._name, this._id);
}
function zM(e) {
  if (e._id !== this._id) throw new Error();
  for (var a = this._groups, r = e._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), d = 0; d < u; ++d)
    for (var p = a[d], m = r[d], v = p.length, g = c[d] = new Array(v), b, x = 0; x < v; ++x)
      (b = p[x] || m[x]) && (g[x] = b);
  for (; d < l; ++d)
    c[d] = a[d];
  return new mi(c, this._parents, this._name, this._id);
}
function OM(e) {
  return (e + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function LM(e, a, r) {
  var l, s, u = OM(a) ? km : Ya;
  return function() {
    var c = u(this, e), d = c.on;
    d !== l && (s = (l = d).copy()).on(a, r), c.on = s;
  };
}
function kM(e, a) {
  var r = this._id;
  return arguments.length < 2 ? Ra(this.node(), r).on.on(e) : this.each(LM(r, e, a));
}
function HM(e) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== e) return;
    a && a.removeChild(this);
  };
}
function BM() {
  return this.on("end.remove", HM(this._id));
}
function UM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = Dm(e));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = l[c], p = d.length, m = u[c] = new Array(p), v, g, b = 0; b < p; ++b)
      (v = d[b]) && (g = e.call(v, v.__data__, b, d)) && ("__data__" in v && (g.__data__ = v.__data__), m[b] = g, Oc(m[b], a, r, b, m, Ra(v, r)));
  return new mi(u, this._parents, a, r);
}
function VM(e) {
  var a = this._name, r = this._id;
  typeof e != "function" && (e = Ex(e));
  for (var l = this._groups, s = l.length, u = [], c = [], d = 0; d < s; ++d)
    for (var p = l[d], m = p.length, v, g = 0; g < m; ++g)
      if (v = p[g]) {
        for (var b = e.call(v, v.__data__, g, p), x, _ = Ra(v, r), C = 0, E = b.length; C < E; ++C)
          (x = b[C]) && Oc(x, a, r, C, b, _);
        u.push(b), c.push(v);
      }
  return new mi(u, c, a, r);
}
var qM = cs.prototype.constructor;
function $M() {
  return new qM(this._groups, this._parents);
}
function IM(e, a) {
  var r, l, s;
  return function() {
    var u = Tl(this, e), c = (this.style.removeProperty(e), Tl(this, e));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function Px(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function YM(e, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = Tl(this, e);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function GM(e, a, r) {
  var l, s, u;
  return function() {
    var c = Tl(this, e), d = r(this), p = d + "";
    return d == null && (p = d = (this.style.removeProperty(e), Tl(this, e))), c === p ? null : c === l && p === s ? u : (s = p, u = a(l = c, d));
  };
}
function XM(e, a) {
  var r, l, s, u = "style." + a, c = "end." + u, d;
  return function() {
    var p = Ya(this, e), m = p.on, v = p.value[u] == null ? d || (d = Px(a)) : void 0;
    (m !== r || s !== v) && (l = (r = m).copy()).on(c, s = v), p.on = l;
  };
}
function FM(e, a, r) {
  var l = (e += "") == "transform" ? ZT : Zx;
  return a == null ? this.styleTween(e, IM(e, l)).on("end.style." + e, Px(e)) : typeof a == "function" ? this.styleTween(e, GM(e, l, Hm(this, "style." + e, a))).each(XM(this._id, e)) : this.styleTween(e, YM(e, l, a), r).on("end.style." + e, null);
}
function ZM(e, a, r) {
  return function(l) {
    this.style.setProperty(e, a.call(this, l), r);
  };
}
function PM(e, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && ZM(e, c, r)), l;
  }
  return u._value = a, u;
}
function QM(e, a, r) {
  var l = "style." + (e += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, PM(e, a, r ?? ""));
}
function KM(e) {
  return function() {
    this.textContent = e;
  };
}
function WM(e) {
  return function() {
    var a = e(this);
    this.textContent = a ?? "";
  };
}
function JM(e) {
  return this.tween("text", typeof e == "function" ? WM(Hm(this, "text", e)) : KM(e == null ? "" : e + ""));
}
function eA(e) {
  return function(a) {
    this.textContent = e.call(this, a);
  };
}
function tA(e) {
  var a, r;
  function l() {
    var s = e.apply(this, arguments);
    return s !== r && (a = (r = s) && eA(s)), a;
  }
  return l._value = e, l;
}
function nA(e) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (e == null) return this.tween(a, null);
  if (typeof e != "function") throw new Error();
  return this.tween(a, tA(e));
}
function aA() {
  for (var e = this._name, a = this._id, r = Qx(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      if (p = c[m]) {
        var v = Ra(p, a);
        Oc(p, e, r, m, c, {
          time: v.time + v.delay + v.duration,
          delay: 0,
          duration: v.duration,
          ease: v.ease
        });
      }
  return new mi(l, this._parents, e, r);
}
function iA() {
  var e, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var d = { value: c }, p = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var m = Ya(this, l), v = m.on;
      v !== e && (a = (e = v).copy(), a._.cancel.push(d), a._.interrupt.push(d), a._.end.push(p)), m.on = a;
    }), s === 0 && u();
  });
}
var rA = 0;
function mi(e, a, r, l) {
  this._groups = e, this._parents = a, this._name = r, this._id = l;
}
function Qx() {
  return ++rA;
}
var ui = cs.prototype;
mi.prototype = {
  constructor: mi,
  select: UM,
  selectAll: VM,
  selectChild: ui.selectChild,
  selectChildren: ui.selectChildren,
  filter: jM,
  merge: zM,
  selection: $M,
  transition: aA,
  call: ui.call,
  nodes: ui.nodes,
  node: ui.node,
  size: ui.size,
  empty: ui.empty,
  each: ui.each,
  on: kM,
  attr: gM,
  attrTween: wM,
  style: FM,
  styleTween: QM,
  text: JM,
  textTween: nA,
  remove: BM,
  tween: uM,
  delay: EM,
  duration: RM,
  ease: MM,
  easeVarying: DM,
  end: iA,
  [Symbol.iterator]: ui[Symbol.iterator]
};
function lA(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var oA = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: lA
};
function sA(e, a) {
  for (var r; !(r = e.__transition) || !(r = r[a]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function uA(e) {
  var a, r;
  e instanceof mi ? (a = e._id, e = e._name) : (a = Qx(), (r = oA).time = Lm(), e = e == null ? null : e + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], d = c.length, p, m = 0; m < d; ++m)
      (p = c[m]) && Oc(p, e, a, m, c, r || sA(p, a));
  return new mi(l, this._parents, e, a);
}
cs.prototype.interrupt = lM;
cs.prototype.transition = uA;
const zu = (e) => () => e;
function cA(e, {
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
function di(e, a, r) {
  this.k = e, this.x = a, this.y = r;
}
di.prototype = {
  constructor: di,
  scale: function(e) {
    return e === 1 ? this : new di(this.k * e, this.x, this.y);
  },
  translate: function(e, a) {
    return e === 0 & a === 0 ? this : new di(this.k, this.x + this.k * e, this.y + this.k * a);
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
var Lc = new di(1, 0, 0);
Kx.prototype = di.prototype;
function Kx(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Lc;
  return e.__zoom;
}
function fh(e) {
  e.stopImmediatePropagation();
}
function zo(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function fA(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function dA() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Py() {
  return this.__zoom || Lc;
}
function hA(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function mA() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function pA(e, a, r) {
  var l = e.invertX(a[0][0]) - r[0][0], s = e.invertX(a[1][0]) - r[1][0], u = e.invertY(a[0][1]) - r[0][1], c = e.invertY(a[1][1]) - r[1][1];
  return e.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function Wx() {
  var e = fA, a = dA, r = pA, l = hA, s = mA, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, p = tc, m = Dc("start", "zoom", "end"), v, g, b, x = 500, _ = 150, C = 0, E = 10;
  function R(O) {
    O.property("__zoom", Py).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", I).on("dblclick.zoom", J).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", oe).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  R.transform = function(O, Y, T, L) {
    var Z = O.selection ? O.selection() : O;
    Z.property("__zoom", Py), O !== Z ? H(O, Y, T, L) : Z.interrupt().each(function() {
      k(this, arguments).event(L).start().zoom(null, typeof Y == "function" ? Y.apply(this, arguments) : Y).end();
    });
  }, R.scaleBy = function(O, Y, T, L) {
    R.scaleTo(O, function() {
      var Z = this.__zoom.k, X = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return Z * X;
    }, T, L);
  }, R.scaleTo = function(O, Y, T, L) {
    R.transform(O, function() {
      var Z = a.apply(this, arguments), X = this.__zoom, ne = T == null ? z(Z) : typeof T == "function" ? T.apply(this, arguments) : T, D = X.invert(ne), U = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return r(N(j(X, U), ne, D), Z, c);
    }, T, L);
  }, R.translateBy = function(O, Y, T, L) {
    R.transform(O, function() {
      return r(this.__zoom.translate(
        typeof Y == "function" ? Y.apply(this, arguments) : Y,
        typeof T == "function" ? T.apply(this, arguments) : T
      ), a.apply(this, arguments), c);
    }, null, L);
  }, R.translateTo = function(O, Y, T, L, Z) {
    R.transform(O, function() {
      var X = a.apply(this, arguments), ne = this.__zoom, D = L == null ? z(X) : typeof L == "function" ? L.apply(this, arguments) : L;
      return r(Lc.translate(D[0], D[1]).scale(ne.k).translate(
        typeof Y == "function" ? -Y.apply(this, arguments) : -Y,
        typeof T == "function" ? -T.apply(this, arguments) : -T
      ), X, c);
    }, L, Z);
  };
  function j(O, Y) {
    return Y = Math.max(u[0], Math.min(u[1], Y)), Y === O.k ? O : new di(Y, O.x, O.y);
  }
  function N(O, Y, T) {
    var L = Y[0] - T[0] * O.k, Z = Y[1] - T[1] * O.k;
    return L === O.x && Z === O.y ? O : new di(O.k, L, Z);
  }
  function z(O) {
    return [(+O[0][0] + +O[1][0]) / 2, (+O[0][1] + +O[1][1]) / 2];
  }
  function H(O, Y, T, L) {
    O.on("start.zoom", function() {
      k(this, arguments).event(L).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(L).end();
    }).tween("zoom", function() {
      var Z = this, X = arguments, ne = k(Z, X).event(L), D = a.apply(Z, X), U = T == null ? z(D) : typeof T == "function" ? T.apply(Z, X) : T, Q = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), te = Z.__zoom, ue = typeof Y == "function" ? Y.apply(Z, X) : Y, pe = p(te.invert(U).concat(Q / te.k), ue.invert(U).concat(Q / ue.k));
      return function(ae) {
        if (ae === 1) ae = ue;
        else {
          var G = pe(ae), ce = Q / G[2];
          ae = new di(ce, U[0] - G[0] * ce, U[1] - G[1] * ce);
        }
        ne.zoom(null, ae);
      };
    });
  }
  function k(O, Y, T) {
    return !T && O.__zooming || new V(O, Y);
  }
  function V(O, Y) {
    this.that = O, this.args = Y, this.active = 0, this.sourceEvent = null, this.extent = a.apply(O, Y), this.taps = 0;
  }
  V.prototype = {
    event: function(O) {
      return O && (this.sourceEvent = O), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(O, Y) {
      return this.mouse && O !== "mouse" && (this.mouse[1] = Y.invert(this.mouse[0])), this.touch0 && O !== "touch" && (this.touch0[1] = Y.invert(this.touch0[0])), this.touch1 && O !== "touch" && (this.touch1[1] = Y.invert(this.touch1[0])), this.that.__zoom = Y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(O) {
      var Y = Fn(this.that).datum();
      m.call(
        O,
        this.that,
        new cA(O, {
          sourceEvent: this.sourceEvent,
          target: R,
          transform: this.that.__zoom,
          dispatch: m
        }),
        Y
      );
    }
  };
  function A(O, ...Y) {
    if (!e.apply(this, arguments)) return;
    var T = k(this, Y).event(O), L = this.__zoom, Z = Math.max(u[0], Math.min(u[1], L.k * Math.pow(2, l.apply(this, arguments)))), X = xa(O);
    if (T.wheel)
      (T.mouse[0][0] !== X[0] || T.mouse[0][1] !== X[1]) && (T.mouse[1] = L.invert(T.mouse[0] = X)), clearTimeout(T.wheel);
    else {
      if (L.k === Z) return;
      T.mouse = [X, L.invert(X)], ic(this), T.start();
    }
    zo(O), T.wheel = setTimeout(ne, _), T.zoom("mouse", r(N(j(L, Z), T.mouse[0], T.mouse[1]), T.extent, c));
    function ne() {
      T.wheel = null, T.end();
    }
  }
  function I(O, ...Y) {
    if (b || !e.apply(this, arguments)) return;
    var T = O.currentTarget, L = k(this, Y, !0).event(O), Z = Fn(O.view).on("mousemove.zoom", U, !0).on("mouseup.zoom", Q, !0), X = xa(O, T), ne = O.clientX, D = O.clientY;
    Lx(O.view), fh(O), L.mouse = [X, this.__zoom.invert(X)], ic(this), L.start();
    function U(te) {
      if (zo(te), !L.moved) {
        var ue = te.clientX - ne, pe = te.clientY - D;
        L.moved = ue * ue + pe * pe > C;
      }
      L.event(te).zoom("mouse", r(N(L.that.__zoom, L.mouse[0] = xa(te, T), L.mouse[1]), L.extent, c));
    }
    function Q(te) {
      Z.on("mousemove.zoom mouseup.zoom", null), kx(te.view, L.moved), zo(te), L.event(te).end();
    }
  }
  function J(O, ...Y) {
    if (e.apply(this, arguments)) {
      var T = this.__zoom, L = xa(O.changedTouches ? O.changedTouches[0] : O, this), Z = T.invert(L), X = T.k * (O.shiftKey ? 0.5 : 2), ne = r(N(j(T, X), L, Z), a.apply(this, Y), c);
      zo(O), d > 0 ? Fn(this).transition().duration(d).call(H, ne, L, O) : Fn(this).call(R.transform, ne, L, O);
    }
  }
  function $(O, ...Y) {
    if (e.apply(this, arguments)) {
      var T = O.touches, L = T.length, Z = k(this, Y, O.changedTouches.length === L).event(O), X, ne, D, U;
      for (fh(O), ne = 0; ne < L; ++ne)
        D = T[ne], U = xa(D, this), U = [U, this.__zoom.invert(U), D.identifier], Z.touch0 ? !Z.touch1 && Z.touch0[2] !== U[2] && (Z.touch1 = U, Z.taps = 0) : (Z.touch0 = U, X = !0, Z.taps = 1 + !!v);
      v && (v = clearTimeout(v)), X && (Z.taps < 2 && (g = U[0], v = setTimeout(function() {
        v = null;
      }, x)), ic(this), Z.start());
    }
  }
  function K(O, ...Y) {
    if (this.__zooming) {
      var T = k(this, Y).event(O), L = O.changedTouches, Z = L.length, X, ne, D, U;
      for (zo(O), X = 0; X < Z; ++X)
        ne = L[X], D = xa(ne, this), T.touch0 && T.touch0[2] === ne.identifier ? T.touch0[0] = D : T.touch1 && T.touch1[2] === ne.identifier && (T.touch1[0] = D);
      if (ne = T.that.__zoom, T.touch1) {
        var Q = T.touch0[0], te = T.touch0[1], ue = T.touch1[0], pe = T.touch1[1], ae = (ae = ue[0] - Q[0]) * ae + (ae = ue[1] - Q[1]) * ae, G = (G = pe[0] - te[0]) * G + (G = pe[1] - te[1]) * G;
        ne = j(ne, Math.sqrt(ae / G)), D = [(Q[0] + ue[0]) / 2, (Q[1] + ue[1]) / 2], U = [(te[0] + pe[0]) / 2, (te[1] + pe[1]) / 2];
      } else if (T.touch0) D = T.touch0[0], U = T.touch0[1];
      else return;
      T.zoom("touch", r(N(ne, D, U), T.extent, c));
    }
  }
  function oe(O, ...Y) {
    if (this.__zooming) {
      var T = k(this, Y).event(O), L = O.changedTouches, Z = L.length, X, ne;
      for (fh(O), b && clearTimeout(b), b = setTimeout(function() {
        b = null;
      }, x), X = 0; X < Z; ++X)
        ne = L[X], T.touch0 && T.touch0[2] === ne.identifier ? delete T.touch0 : T.touch1 && T.touch1[2] === ne.identifier && delete T.touch1;
      if (T.touch1 && !T.touch0 && (T.touch0 = T.touch1, delete T.touch1), T.touch0) T.touch0[1] = this.__zoom.invert(T.touch0[0]);
      else if (T.end(), T.taps === 2 && (ne = xa(ne, this), Math.hypot(g[0] - ne[0], g[1] - ne[1]) < E)) {
        var D = Fn(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return R.wheelDelta = function(O) {
    return arguments.length ? (l = typeof O == "function" ? O : zu(+O), R) : l;
  }, R.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : zu(!!O), R) : e;
  }, R.touchable = function(O) {
    return arguments.length ? (s = typeof O == "function" ? O : zu(!!O), R) : s;
  }, R.extent = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : zu([[+O[0][0], +O[0][1]], [+O[1][0], +O[1][1]]]), R) : a;
  }, R.scaleExtent = function(O) {
    return arguments.length ? (u[0] = +O[0], u[1] = +O[1], R) : [u[0], u[1]];
  }, R.translateExtent = function(O) {
    return arguments.length ? (c[0][0] = +O[0][0], c[1][0] = +O[1][0], c[0][1] = +O[0][1], c[1][1] = +O[1][1], R) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, R.constrain = function(O) {
    return arguments.length ? (r = O, R) : r;
  }, R.duration = function(O) {
    return arguments.length ? (d = +O, R) : d;
  }, R.interpolate = function(O) {
    return arguments.length ? (p = O, R) : p;
  }, R.on = function() {
    var O = m.on.apply(m, arguments);
    return O === m ? R : O;
  }, R.clickDistance = function(O) {
    return arguments.length ? (C = (O = +O) * O, R) : Math.sqrt(C);
  }, R.tapDistance = function(O) {
    return arguments.length ? (E = +O, R) : E;
  }, R;
}
const Ea = {
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
}, Qo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Jx = ["Enter", " ", "Escape"], ew = {
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
var Al;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Al || (Al = {}));
var Rr;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Rr || (Rr = {}));
var Ko;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Ko || (Ko = {}));
const tw = {
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
var Pi;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Pi || (Pi = {}));
var vc;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(vc || (vc = {}));
var je;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(je || (je = {}));
const Qy = {
  [je.Left]: je.Right,
  [je.Right]: je.Left,
  [je.Top]: je.Bottom,
  [je.Bottom]: je.Top
};
function nw(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const aw = (e) => "id" in e && "source" in e && "target" in e, gA = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Bm = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), ds = (e, a = [0, 0]) => {
  const { width: r, height: l } = gi(e), s = e.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: e.position.x - u,
    y: e.position.y - c
  };
}, vA = (e, a = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = e.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Bm(s) ? s : a.nodeLookup.get(s.id));
    const d = c ? yc(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return kc(l, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Hc(r);
}, hs = (e, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return e.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = kc(r, yc(s)), l = !0);
  }), l ? Hc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Um = (e, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...kl(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, p = [];
  for (const m of e.values()) {
    const { measured: v, selectable: g = !0, hidden: b = !1 } = m;
    if (c && !g || b)
      continue;
    const x = v.width ?? m.width ?? m.initialWidth ?? null, _ = v.height ?? m.height ?? m.initialHeight ?? null, C = Wo(d, jl(m)), E = (x ?? 0) * (_ ?? 0), R = u && C > 0;
    (!m.internals.handleBounds || R || C >= E || m.dragging) && p.push(m);
  }
  return p;
}, yA = (e, a) => {
  const r = /* @__PURE__ */ new Set();
  return e.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function bA(e, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return e.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function xA({ nodes: e, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (e.size === 0)
    return !0;
  const d = bA(e, c), p = hs(d), m = qm(p, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function iw({ nodeId: e, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(e), d = c.parentId ? r.get(c.parentId) : void 0, { x: p, y: m } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, v = c.origin ?? l;
  let g = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", Ea.error005());
    else {
      const x = d.measured.width, _ = d.measured.height;
      x && _ && (g = [
        [p, m],
        [p + x, m + _]
      ]);
    }
  else d && Dr(c.extent) && (g = [
    [c.extent[0][0] + p, c.extent[0][1] + m],
    [c.extent[1][0] + p, c.extent[1][1] + m]
  ]);
  const b = Dr(g) ? Ar(a, g, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", Ea.error015()), {
    position: {
      x: b.x - p + (c.measured.width ?? 0) * v[0],
      y: b.y - m + (c.measured.height ?? 0) * v[1]
    },
    positionAbsolute: b
  };
}
async function wA({ nodesToRemove: e = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(e.map((b) => b.id)), c = [];
  for (const b of r) {
    if (b.deletable === !1)
      continue;
    const x = u.has(b.id), _ = !x && b.parentId && c.find((C) => C.id === b.parentId);
    (x || _) && c.push(b);
  }
  const d = new Set(a.map((b) => b.id)), p = l.filter((b) => b.deletable !== !1), v = yA(c, p);
  for (const b of p)
    d.has(b.id) && !v.find((_) => _.id === b.id) && v.push(b);
  if (!s)
    return {
      edges: v,
      nodes: c
    };
  const g = await s({
    nodes: c,
    edges: v
  });
  return typeof g == "boolean" ? g ? { edges: v, nodes: c } : { edges: [], nodes: [] } : g;
}
const Dl = (e, a = 0, r = 1) => Math.min(Math.max(e, a), r), Ar = (e = { x: 0, y: 0 }, a, r) => ({
  x: Dl(e.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: Dl(e.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function rw(e, a, r) {
  const { width: l, height: s } = gi(r), { x: u, y: c } = r.internals.positionAbsolute;
  return Ar(e, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const Ky = (e, a, r) => e < a ? Dl(Math.abs(e - a), 1, a) / a : e > r ? -Dl(Math.abs(e - r), 1, a) / a : 0, Vm = (e, a, r = 15, l = 40) => {
  const s = Ky(e.x, l, a.width - l) * r, u = Ky(e.y, l, a.height - l) * r;
  return [s, u];
}, kc = (e, a) => ({
  x: Math.min(e.x, a.x),
  y: Math.min(e.y, a.y),
  x2: Math.max(e.x2, a.x2),
  y2: Math.max(e.y2, a.y2)
}), Ph = ({ x: e, y: a, width: r, height: l }) => ({
  x: e,
  y: a,
  x2: e + r,
  y2: a + l
}), Hc = ({ x: e, y: a, x2: r, y2: l }) => ({
  x: e,
  y: a,
  width: r - e,
  height: l - a
}), jl = (e, a = [0, 0]) => {
  const { x: r, y: l } = Bm(e) ? e.internals.positionAbsolute : ds(e, a);
  return {
    x: r,
    y: l,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, yc = (e, a = [0, 0]) => {
  const { x: r, y: l } = Bm(e) ? e.internals.positionAbsolute : ds(e, a);
  return {
    x: r,
    y: l,
    x2: r + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: l + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, lw = (e, a) => Hc(kc(Ph(e), Ph(a))), Wo = (e, a) => {
  const r = Math.max(0, Math.min(e.x + e.width, a.x + a.width) - Math.max(e.x, a.x)), l = Math.max(0, Math.min(e.y + e.height, a.y + a.height) - Math.max(e.y, a.y));
  return Math.ceil(r * l);
}, Wy = (e) => _a(e.width) && _a(e.height) && _a(e.x) && _a(e.y), _a = (e) => !isNaN(e) && isFinite(e), ow = (e, a) => (r, l) => {
}, ms = (e, a = [1, 1]) => ({
  x: a[0] * Math.round(e.x / a[0]),
  y: a[1] * Math.round(e.y / a[1])
}), kl = ({ x: e, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (e - r) / s,
    y: (a - l) / s
  };
  return u ? ms(d, c) : d;
}, zl = ({ x: e, y: a }, [r, l, s]) => ({
  x: e * s + r,
  y: a * s + l
});
function pl(e, a) {
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
function _A(e, a, r) {
  if (typeof e == "string" || typeof e == "number") {
    const l = pl(e, r), s = pl(e, a);
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
    const l = pl(e.top ?? e.y ?? 0, r), s = pl(e.bottom ?? e.y ?? 0, r), u = pl(e.left ?? e.x ?? 0, a), c = pl(e.right ?? e.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function SA(e, a, r, l, s, u) {
  const { x: c, y: d } = zl(e, [a, r, l]), { x: p, y: m } = zl({ x: e.x + e.width, y: e.y + e.height }, [a, r, l]), v = s - p, g = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(v),
    bottom: Math.floor(g)
  };
}
const qm = (e, a, r, l, s, u) => {
  const c = _A(u, a, r), d = (a - c.x) / e.width, p = (r - c.y) / e.height, m = Math.min(d, p), v = Dl(m, l, s), g = e.x + e.width / 2, b = e.y + e.height / 2, x = a / 2 - g * v, _ = r / 2 - b * v, C = SA(e, x, _, v, a, r), E = {
    left: Math.min(C.left - c.left, 0),
    top: Math.min(C.top - c.top, 0),
    right: Math.min(C.right - c.right, 0),
    bottom: Math.min(C.bottom - c.bottom, 0)
  };
  return {
    x: x - E.left + E.right,
    y: _ - E.top + E.bottom,
    zoom: v
  };
}, Jo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Dr(e) {
  return e != null && e !== "parent";
}
function gi(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function sw(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function uw(e, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...e }, c = l.get(r);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * d[1];
  }
  return u;
}
function Jy(e, a) {
  if (e.size !== a.size)
    return !1;
  for (const r of e)
    if (!a.has(r))
      return !1;
  return !0;
}
function EA() {
  let e, a;
  return { promise: new Promise((l, s) => {
    e = l, a = s;
  }), resolve: e, reject: a };
}
function NA(e) {
  return { ...ew, ...e || {} };
}
function $o(e, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = Sa(e), d = kl({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: p, y: m } = r ? ms(d, a) : d;
  return {
    xSnapped: p,
    ySnapped: m,
    ...d
  };
}
const $m = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), cw = (e) => e?.getRootNode?.() || window?.document, CA = ["INPUT", "SELECT", "TEXTAREA"];
function fw(e) {
  const a = e.composedPath?.()?.[0] || e.target;
  return a?.nodeType !== 1 ? !1 : CA.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const dw = (e) => "clientX" in e, Sa = (e, a) => {
  const r = dw(e), l = r ? e.clientX : e.touches?.[0].clientX, s = r ? e.clientY : e.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, eb = (e, a, r, l, s) => {
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
      ...$m(c)
    };
  });
};
function hw({ sourceX: e, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const p = e * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + d * 0.375 + l * 0.125, v = Math.abs(p - e), g = Math.abs(m - a);
  return [p, m, v, g];
}
function Ou(e, a) {
  return e >= 0 ? 0.5 * e : a * 25 * Math.sqrt(-e);
}
function tb({ pos: e, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (e) {
    case je.Left:
      return [a - Ou(a - l, u), r];
    case je.Right:
      return [a + Ou(l - a, u), r];
    case je.Top:
      return [a, r - Ou(r - s, u)];
    case je.Bottom:
      return [a, r + Ou(s - r, u)];
  }
}
function mw({ sourceX: e, sourceY: a, sourcePosition: r = je.Bottom, targetX: l, targetY: s, targetPosition: u = je.Top, curvature: c = 0.25 }) {
  const [d, p] = tb({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, v] = tb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a,
    c
  }), [g, b, x, _] = hw({
    sourceX: e,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: d,
    sourceControlY: p,
    targetControlX: m,
    targetControlY: v
  });
  return [
    `M${e},${a} C${d},${p} ${m},${v} ${l},${s}`,
    g,
    b,
    x,
    _
  ];
}
function pw({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - e) / 2, u = r < e ? r + s : r - s, c = Math.abs(l - a) / 2, d = l < a ? l + c : l - c;
  return [u, d, s, c];
}
function RA({ sourceNode: e, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, d = Math.max(e.parentId || s && e.selected ? e.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + d;
}
function TA({ sourceNode: e, targetNode: a, width: r, height: l, transform: s }) {
  const u = kc(yc(e), yc(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Wo(c, Hc(u)) > 0;
}
const MA = ({ source: e, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${e}${a || ""}-${r}${l || ""}`, AA = (e, a) => a.some((r) => r.source === e.source && r.target === e.target && (r.sourceHandle === e.sourceHandle || !r.sourceHandle && !e.sourceHandle) && (r.targetHandle === e.targetHandle || !r.targetHandle && !e.targetHandle)), DA = (e, a, r = {}) => {
  if (!e.source || !e.target)
    return r.onError?.("006", Ea.error006()), a;
  const l = r.getEdgeId || MA;
  let s;
  return aw(e) ? s = { ...e } : s = {
    ...e,
    id: l(e)
  }, AA(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function gw({ sourceX: e, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, d] = pw({
    sourceX: e,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${e},${a}L ${r},${l}`, s, u, c, d];
}
const nb = {
  [je.Left]: { x: -1, y: 0 },
  [je.Right]: { x: 1, y: 0 },
  [je.Top]: { x: 0, y: -1 },
  [je.Bottom]: { x: 0, y: 1 }
}, jA = ({ source: e, sourcePosition: a = je.Bottom, target: r }) => a === je.Left || a === je.Right ? e.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, ab = (e, a) => Math.sqrt(Math.pow(a.x - e.x, 2) + Math.pow(a.y - e.y, 2));
function zA({ source: e, sourcePosition: a = je.Bottom, target: r, targetPosition: l = je.Top, center: s, offset: u, stepPosition: c }) {
  const d = nb[a], p = nb[l], m = { x: e.x + d.x * u, y: e.y + d.y * u }, v = { x: r.x + p.x * u, y: r.y + p.y * u }, g = jA({
    source: m,
    sourcePosition: a,
    target: v
  }), b = g.x !== 0 ? "x" : "y", x = g[b];
  let _ = [], C, E;
  const R = { x: 0, y: 0 }, j = { x: 0, y: 0 }, [, , N, z] = pw({
    sourceX: e.x,
    sourceY: e.y,
    targetX: r.x,
    targetY: r.y
  });
  if (d[b] * p[b] === -1) {
    b === "x" ? (C = s.x ?? m.x + (v.x - m.x) * c, E = s.y ?? (m.y + v.y) / 2) : (C = s.x ?? (m.x + v.x) / 2, E = s.y ?? m.y + (v.y - m.y) * c);
    const A = [
      { x: C, y: m.y },
      { x: C, y: v.y }
    ], I = [
      { x: m.x, y: E },
      { x: v.x, y: E }
    ];
    d[b] === x ? _ = b === "x" ? A : I : _ = b === "x" ? I : A;
  } else {
    const A = [{ x: m.x, y: v.y }], I = [{ x: v.x, y: m.y }];
    if (b === "x" ? _ = d.x === x ? I : A : _ = d.y === x ? A : I, a === l) {
      const O = Math.abs(e[b] - r[b]);
      if (O <= u) {
        const Y = Math.min(u - 1, u - O);
        d[b] === x ? R[b] = (m[b] > e[b] ? -1 : 1) * Y : j[b] = (v[b] > r[b] ? -1 : 1) * Y;
      }
    }
    if (a !== l) {
      const O = b === "x" ? "y" : "x", Y = d[b] === p[O], T = m[O] > v[O], L = m[O] < v[O];
      (d[b] === 1 && (!Y && T || Y && L) || d[b] !== 1 && (!Y && L || Y && T)) && (_ = b === "x" ? A : I);
    }
    const J = { x: m.x + R.x, y: m.y + R.y }, $ = { x: v.x + j.x, y: v.y + j.y }, K = Math.max(Math.abs(J.x - _[0].x), Math.abs($.x - _[0].x)), oe = Math.max(Math.abs(J.y - _[0].y), Math.abs($.y - _[0].y));
    K >= oe ? (C = (J.x + $.x) / 2, E = _[0].y) : (C = _[0].x, E = (J.y + $.y) / 2);
  }
  const H = { x: m.x + R.x, y: m.y + R.y }, k = { x: v.x + j.x, y: v.y + j.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...H.x !== _[0].x || H.y !== _[0].y ? [H] : [],
    ..._,
    ...k.x !== _[_.length - 1].x || k.y !== _[_.length - 1].y ? [k] : [],
    r
  ], C, E, N, z];
}
function OA(e, a, r, l) {
  const s = Math.min(ab(e, a) / 2, ab(a, r) / 2, l), { x: u, y: c } = a;
  if (e.x === u && u === r.x || e.y === c && c === r.y)
    return `L${u} ${c}`;
  if (e.y === c) {
    const m = e.x < r.x ? -1 : 1, v = e.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * v}`;
  }
  const d = e.x < r.x ? 1 : -1, p = e.y < r.y ? -1 : 1;
  return `L ${u},${c + s * p}Q ${u},${c} ${u + s * d},${c}`;
}
function Qh({ sourceX: e, sourceY: a, sourcePosition: r = je.Bottom, targetX: l, targetY: s, targetPosition: u = je.Top, borderRadius: c = 5, centerX: d, centerY: p, offset: m = 20, stepPosition: v = 0.5 }) {
  const [g, b, x, _, C] = zA({
    source: { x: e, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: d, y: p },
    offset: m,
    stepPosition: v
  });
  let E = `M${g[0].x} ${g[0].y}`;
  for (let R = 1; R < g.length - 1; R++)
    E += OA(g[R - 1], g[R], g[R + 1], c);
  return E += `L${g[g.length - 1].x} ${g[g.length - 1].y}`, [E, b, x, _, C];
}
function ib(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function LA(e) {
  const { sourceNode: a, targetNode: r } = e;
  if (!ib(a) || !ib(r))
    return null;
  const l = a.internals.handleBounds || rb(a.handles), s = r.internals.handleBounds || rb(r.handles), u = lb(l?.source ?? [], e.sourceHandle), c = lb(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Al.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    e.targetHandle
  );
  if (!u || !c)
    return e.onError?.("008", Ea.error008(u ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const d = u?.position || je.Bottom, p = c?.position || je.Top, m = jr(a, u, d), v = jr(r, c, p);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: v.x,
    targetY: v.y,
    sourcePosition: d,
    targetPosition: p
  };
}
function rb(e) {
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
function jr(e, a, r = je.Left, l = !1) {
  const s = (a?.x ?? 0) + e.internals.positionAbsolute.x, u = (a?.y ?? 0) + e.internals.positionAbsolute.y, { width: c, height: d } = a ?? gi(e);
  if (l)
    return { x: s + c / 2, y: u + d / 2 };
  switch (a?.position ?? r) {
    case je.Top:
      return { x: s + c / 2, y: u };
    case je.Right:
      return { x: s + c, y: u + d / 2 };
    case je.Bottom:
      return { x: s + c / 2, y: u + d };
    case je.Left:
      return { x: s, y: u + d / 2 };
  }
}
function lb(e, a) {
  return e && (a ? e.find((r) => r.id === a) : e[0]) || null;
}
function Kh(e, a) {
  return e ? typeof e == "string" ? e : `${a ? `${a}__` : ""}${Object.keys(e).sort().map((l) => `${l}=${e[l]}`).join("&")}` : "";
}
function kA(e, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return e.reduce((c, d) => ([d.markerStart || l, d.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const m = Kh(p, a);
      u.has(m) || (c.push({ id: m, color: p.color || r, ...p }), u.add(m));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const vw = 1e3, HA = 10, Im = {
  nodeOrigin: [0, 0],
  nodeExtent: Qo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, BA = {
  ...Im,
  checkEquality: !0
};
function Ym(e, a) {
  const r = { ...e };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function UA(e, a, r) {
  const l = Ym(Im, r);
  for (const s of e.values())
    if (s.parentId)
      Xm(s, e, a, l);
    else {
      const u = ds(s, l.nodeOrigin), c = Dr(s.extent) ? s.extent : l.nodeExtent, d = Ar(u, c, gi(s));
      s.internals.positionAbsolute = d;
    }
}
function VA(e, a) {
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
function Gm(e) {
  return e === "manual";
}
function Wh(e, a, r, l = {}) {
  const s = Ym(BA, l), u = { i: 0 }, c = new Map(a), d = s?.elevateNodesOnSelect && !Gm(s.zIndexMode) ? vw : 0;
  let p = e.length > 0, m = !1;
  a.clear(), r.clear();
  for (const v of e) {
    let g = c.get(v.id);
    if (s.checkEquality && v === g?.internals.userNode)
      a.set(v.id, g);
    else {
      const b = ds(v, s.nodeOrigin), x = Dr(v.extent) ? v.extent : s.nodeExtent, _ = Ar(b, x, gi(v));
      g = {
        ...s.defaults,
        ...v,
        measured: {
          width: v.measured?.width,
          height: v.measured?.height
        },
        internals: {
          positionAbsolute: _,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: VA(v, g),
          z: yw(v, d, s.zIndexMode),
          userNode: v
        }
      }, a.set(v.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (p = !1), v.parentId && Xm(g, a, r, l, u), m ||= v.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: m };
}
function qA(e, a) {
  if (!e.parentId)
    return;
  const r = a.get(e.parentId);
  r ? r.set(e.id, e) : a.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Xm(e, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: p } = Ym(Im, l), m = e.parentId, v = a.get(m);
  if (!v) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  qA(e, r), s && !v.parentId && v.internals.rootParentIndex === void 0 && p === "auto" && (v.internals.rootParentIndex = ++s.i, v.internals.z = v.internals.z + s.i * HA), s && v.internals.rootParentIndex !== void 0 && (s.i = v.internals.rootParentIndex);
  const g = u && !Gm(p) ? vw : 0, { x: b, y: x, z: _ } = $A(e, v, c, d, g, p), { positionAbsolute: C } = e.internals, E = b !== C.x || x !== C.y;
  (E || _ !== e.internals.z) && a.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: E ? { x: b, y: x } : C,
      z: _
    }
  });
}
function yw(e, a, r) {
  const l = _a(e.zIndex) ? e.zIndex : 0;
  return Gm(r) ? l : l + (e.selected ? a : 0);
}
function $A(e, a, r, l, s, u) {
  const { x: c, y: d } = a.internals.positionAbsolute, p = gi(e), m = ds(e, r), v = Dr(e.extent) ? Ar(m, e.extent, p) : m;
  let g = Ar({ x: c + v.x, y: d + v.y }, l, p);
  e.extent === "parent" && (g = rw(g, p, a));
  const b = yw(e, s, u), x = a.internals.z ?? 0;
  return {
    x: g.x,
    y: g.y,
    z: x >= b ? x + 1 : b
  };
}
function Fm(e, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = a.get(c.parentId);
    if (!d)
      continue;
    const p = u.get(c.parentId)?.expandedRect ?? jl(d), m = lw(p, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, p) => {
    const m = d.internals.positionAbsolute, v = gi(d), g = d.origin ?? l, b = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, x = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, _ = Math.max(v.width, Math.round(c.width)), C = Math.max(v.height, Math.round(c.height)), E = (_ - v.width) * g[0], R = (C - v.height) * g[1];
    (b > 0 || x > 0 || E || R) && (s.push({
      id: p,
      type: "position",
      position: {
        x: d.position.x - b + E,
        y: d.position.y - x + R
      }
    }), r.get(p)?.forEach((j) => {
      e.some((N) => N.id === j.id) || s.push({
        id: j.id,
        type: "position",
        position: {
          x: j.position.x + b,
          y: j.position.y + x
        }
      });
    })), (v.width < c.width || v.height < c.height || b || x) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: _ + (b ? g[0] * b - E : 0),
        height: C + (x ? g[1] * x - R : 0)
      }
    });
  }), s;
}
function IA(e, a, r, l, s, u, c) {
  const d = l?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!d)
    return { changes: [], updatedInternals: p };
  const m = [], v = window.getComputedStyle(d), { m22: g } = new window.DOMMatrixReadOnly(v.transform), b = [];
  for (const x of e.values()) {
    const _ = a.get(x.id);
    if (!_)
      continue;
    if (_.hidden) {
      a.set(_.id, {
        ..._,
        internals: {
          ..._.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const C = $m(x.nodeElement), E = _.measured.width !== C.width || _.measured.height !== C.height;
    if (!!(C.width && C.height && (E || !_.internals.handleBounds || x.force))) {
      const j = x.nodeElement.getBoundingClientRect(), N = Dr(_.extent) ? _.extent : u;
      let { positionAbsolute: z } = _.internals;
      _.parentId && _.extent === "parent" ? z = rw(z, C, a.get(_.parentId)) : N && (z = Ar(z, N, C));
      const H = {
        ..._,
        measured: C,
        internals: {
          ..._.internals,
          positionAbsolute: z,
          handleBounds: {
            source: eb("source", x.nodeElement, j, g, _.id),
            target: eb("target", x.nodeElement, j, g, _.id)
          }
        }
      };
      a.set(_.id, H), _.parentId && Xm(H, a, r, { nodeOrigin: s, zIndexMode: c }), p = !0, E && (m.push({
        id: _.id,
        type: "dimensions",
        dimensions: C
      }), _.expandParent && _.parentId && b.push({
        id: _.id,
        parentId: _.parentId,
        rect: jl(H, s)
      }));
    }
  }
  if (b.length > 0) {
    const x = Fm(b, a, r, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: p };
}
async function YA({ delta: e, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
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
function ob(e, a, r, l, s, u) {
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
function bw(e, a, r) {
  e.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = l, p = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: d }, m = `${s}-${c}--${u}-${d}`, v = `${u}-${d}--${s}-${c}`;
    ob("source", p, v, e, s, c), ob("target", p, m, e, u, d), a.set(l.id, l);
  }
}
function xw(e, a) {
  if (!e.parentId)
    return !1;
  const r = a.get(e.parentId);
  return r ? r.selected ? !0 : xw(r, a) : !1;
}
function sb(e, a, r) {
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
function GA(e, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of e)
    if ((c.selected || c.id === l) && (!c.parentId || !xw(c, e)) && (c.draggable || a && typeof c.draggable > "u")) {
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
function dh({ nodeId: e, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
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
function XA({ dragItems: e, snapGrid: a, x: r, y: l }) {
  const s = e.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = ms(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function FA({ onNodeMouseDown: e, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), p = !1, m = { x: 0, y: 0 }, v = null, g = !1, b = null, x = !1, _ = !1, C = null;
  function E({ noDragClassName: j, handleSelector: N, domNode: z, isSelectable: H, nodeId: k, nodeClickDistance: V = 0 }) {
    b = Fn(z);
    function A({ x: K, y: oe }) {
      const { nodeLookup: O, nodeExtent: Y, snapGrid: T, snapToGrid: L, nodeOrigin: Z, onNodeDrag: X, onSelectionDrag: ne, onError: D, updateNodePositions: U } = a();
      u = { x: K, y: oe };
      let Q = !1;
      const te = d.size > 1, ue = te && Y ? Ph(hs(d)) : null, pe = te && L ? XA({
        dragItems: d,
        snapGrid: T,
        x: K,
        y: oe
      }) : null;
      for (const [ae, G] of d) {
        if (!O.has(ae))
          continue;
        let ce = { x: K - G.distance.x, y: oe - G.distance.y };
        L && (ce = pe ? {
          x: Math.round(ce.x + pe.x),
          y: Math.round(ce.y + pe.y)
        } : ms(ce, T));
        let Ee = null;
        if (te && Y && !G.extent && ue) {
          const { positionAbsolute: xe } = G.internals, Te = xe.x - ue.x + Y[0][0], $e = xe.x + G.measured.width - ue.x2 + Y[1][0], ft = xe.y - ue.y + Y[0][1], Me = xe.y + G.measured.height - ue.y2 + Y[1][1];
          Ee = [
            [Te, ft],
            [$e, Me]
          ];
        }
        const { position: we, positionAbsolute: Se } = iw({
          nodeId: ae,
          nextPosition: ce,
          nodeLookup: O,
          nodeExtent: Ee || Y,
          nodeOrigin: Z,
          onError: D
        });
        Q = Q || G.position.x !== we.x || G.position.y !== we.y, G.position = we, G.internals.positionAbsolute = Se;
      }
      if (_ = _ || Q, !!Q && (U(d, !0), C && (l || X || !k && ne))) {
        const [ae, G] = dh({
          nodeId: k,
          dragItems: d,
          nodeLookup: O
        });
        l?.(C, d, ae, G), X?.(C, ae, G), k || ne?.(C, G);
      }
    }
    async function I() {
      if (!v)
        return;
      const { transform: K, panBy: oe, autoPanSpeed: O, autoPanOnNodeDrag: Y } = a();
      if (!Y) {
        p = !1, cancelAnimationFrame(c);
        return;
      }
      const [T, L] = Vm(m, v, O);
      (T !== 0 || L !== 0) && (u.x = (u.x ?? 0) - T / K[2], u.y = (u.y ?? 0) - L / K[2], await oe({ x: T, y: L }) && A(u)), c = requestAnimationFrame(I);
    }
    function J(K) {
      const { nodeLookup: oe, multiSelectionActive: O, nodesDraggable: Y, transform: T, snapGrid: L, snapToGrid: Z, selectNodesOnDrag: X, onNodeDragStart: ne, onSelectionDragStart: D, unselectNodesAndEdges: U } = a();
      g = !0, (!X || !H) && !O && k && (oe.get(k)?.selected || U()), H && X && k && e?.(k);
      const Q = $o(K.sourceEvent, { transform: T, snapGrid: L, snapToGrid: Z, containerBounds: v });
      if (u = Q, d = GA(oe, Y, Q, k), d.size > 0 && (r || ne || !k && D)) {
        const [te, ue] = dh({
          nodeId: k,
          dragItems: d,
          nodeLookup: oe
        });
        r?.(K.sourceEvent, d, te, ue), ne?.(K.sourceEvent, te, ue), k || D?.(K.sourceEvent, ue);
      }
    }
    const $ = Hx().clickDistance(V).on("start", (K) => {
      const { domNode: oe, nodeDragThreshold: O, transform: Y, snapGrid: T, snapToGrid: L } = a();
      v = oe?.getBoundingClientRect() || null, x = !1, _ = !1, C = K.sourceEvent, O === 0 && J(K), u = $o(K.sourceEvent, { transform: Y, snapGrid: T, snapToGrid: L, containerBounds: v }), m = Sa(K.sourceEvent, v);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: oe, transform: O, snapGrid: Y, snapToGrid: T, nodeDragThreshold: L, nodeLookup: Z } = a(), X = $o(K.sourceEvent, { transform: O, snapGrid: Y, snapToGrid: T, containerBounds: v });
      if (C = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      k && !Z.has(k)) && (x = !0), !x) {
        if (!p && oe && g && (p = !0, I()), !g) {
          const ne = Sa(K.sourceEvent, v), D = ne.x - m.x, U = ne.y - m.y;
          Math.sqrt(D * D + U * U) > L && J(K);
        }
        (u.x !== X.xSnapped || u.y !== X.ySnapped) && d && g && (m = Sa(K.sourceEvent, v), A(X));
      }
    }).on("end", (K) => {
      if (!g || x) {
        x && d.size > 0 && a().updateNodePositions(d, !1);
        return;
      }
      if (p = !1, g = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: oe, updateNodePositions: O, onNodeDragStop: Y, onSelectionDragStop: T } = a();
        if (_ && (O(d, !1), _ = !1), s || Y || !k && T) {
          const [L, Z] = dh({
            nodeId: k,
            dragItems: d,
            nodeLookup: oe,
            dragging: !1
          });
          s?.(K.sourceEvent, d, L, Z), Y?.(K.sourceEvent, L, Z), k || T?.(K.sourceEvent, Z);
        }
      }
    }).filter((K) => {
      const oe = K.target;
      return !K.button && (!j || !sb(oe, `.${j}`, z)) && (!N || sb(oe, N, z));
    });
    b.call($);
  }
  function R() {
    b?.on(".drag", null);
  }
  return {
    update: E,
    destroy: R
  };
}
function ZA(e, a, r) {
  const l = [], s = {
    x: e.x - r,
    y: e.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Wo(s, jl(u)) > 0 && l.push(u);
  return l;
}
const PA = 250;
function QA(e, a, r, l) {
  let s = [], u = 1 / 0;
  const c = ZA(e, r, a + PA);
  for (const d of c) {
    const p = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const m of p) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: v, y: g } = jr(d, m, m.position, !0), b = Math.sqrt(Math.pow(v - e.x, 2) + Math.pow(g - e.y, 2));
      b > a || (b < u ? (s = [{ ...m, x: v, y: g }], u = b) : b === u && s.push({ ...m, x: v, y: g }));
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
function ww(e, a, r, l, s, u = !1) {
  const c = l.get(e);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], p = (r ? d?.find((m) => m.id === r) : d?.[0]) ?? null;
  return p && u ? { ...p, ...jr(c, p, p.position, !0) } : p;
}
function _w(e, a) {
  return e || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function KA(e, a) {
  let r = null;
  return a ? r = !0 : e && !a && (r = !1), r;
}
const Sw = () => !0;
function WA(e, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: p, lib: m, autoPanOnConnect: v, flowId: g, panBy: b, cancelConnection: x, onConnectStart: _, onConnect: C, onConnectEnd: E, isValidConnection: R = Sw, onReconnectEnd: j, updateConnection: N, getTransform: z, getFromHandle: H, autoPanSpeed: k, dragThreshold: V = 1, handleDomNode: A }) {
  const I = cw(e.target);
  let J = 0, $;
  const { x: K, y: oe } = Sa(e), O = _w(u, A), Y = d?.getBoundingClientRect();
  let T = !1;
  if (!Y || !O)
    return;
  const L = ww(s, O, l, p, a);
  if (!L)
    return;
  let Z = Sa(e, Y), X = !1, ne = null, D = !1, U = null;
  function Q() {
    if (!v || !Y)
      return;
    const [we, Se] = Vm(Z, Y, k);
    b({ x: we, y: Se }), J = requestAnimationFrame(Q);
  }
  const te = {
    ...L,
    nodeId: s,
    type: O,
    position: L.position
  }, ue = p.get(s);
  let ae = {
    inProgress: !0,
    isValid: null,
    from: jr(ue, te, je.Left, !0),
    fromHandle: te,
    fromPosition: te.position,
    fromNode: ue,
    to: Z,
    toHandle: null,
    toPosition: Qy[te.position],
    toNode: null,
    pointer: Z
  };
  function G() {
    T = !0, N(ae), _?.(e, { nodeId: s, handleId: l, handleType: O });
  }
  V === 0 && G();
  function ce(we) {
    if (!T) {
      const { x: Me, y: Xe } = Sa(we), He = Me - K, Ie = Xe - oe;
      if (!(He * He + Ie * Ie > V * V))
        return;
      G();
    }
    if (!H() || !te) {
      Ee(we);
      return;
    }
    const Se = z();
    Z = Sa(we, Y), $ = QA(kl(Z, Se, !1, [1, 1]), r, p, te), X || (Q(), X = !0);
    const xe = Ew(we, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: R,
      doc: I,
      lib: m,
      flowId: g,
      nodeLookup: p
    });
    U = xe.handleDomNode, ne = xe.connection, D = KA(!!$, xe.isValid);
    const Te = p.get(s), $e = Te ? jr(Te, te, je.Left, !0) : ae.from, ft = {
      ...ae,
      from: $e,
      isValid: D,
      to: xe.toHandle && D ? zl({ x: xe.toHandle.x, y: xe.toHandle.y }, Se) : Z,
      toHandle: xe.toHandle,
      toPosition: D && xe.toHandle ? xe.toHandle.position : Qy[te.position],
      toNode: xe.toHandle ? p.get(xe.toHandle.nodeId) : null,
      pointer: Z
    };
    N(ft), ae = ft;
  }
  function Ee(we) {
    if (!("touches" in we && we.touches.length > 0)) {
      if (T) {
        ($ || U) && ne && D && C?.(ne);
        const { inProgress: Se, ...xe } = ae, Te = {
          ...xe,
          toPosition: ae.toHandle ? ae.toPosition : null
        };
        E?.(we, Te), u && j?.(we, Te);
      }
      x(), cancelAnimationFrame(J), X = !1, D = !1, ne = null, U = null, I.removeEventListener("mousemove", ce), I.removeEventListener("mouseup", Ee), I.removeEventListener("touchmove", ce), I.removeEventListener("touchend", Ee);
    }
  }
  I.addEventListener("mousemove", ce), I.addEventListener("mouseup", Ee), I.addEventListener("touchmove", ce), I.addEventListener("touchend", Ee);
}
function Ew(e, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: p, isValidConnection: m = Sw, nodeLookup: v }) {
  const g = u === "target", b = a ? c.querySelector(`.${d}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x, y: _ } = Sa(e), C = c.elementFromPoint(x, _), E = C?.classList.contains(`${d}-flow__handle`) ? C : b, R = {
    handleDomNode: E,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (E) {
    const j = _w(void 0, E), N = E.getAttribute("data-nodeid"), z = E.getAttribute("data-handleid"), H = E.classList.contains("connectable"), k = E.classList.contains("connectableend");
    if (!N || !j)
      return R;
    const V = {
      source: g ? N : l,
      sourceHandle: g ? z : s,
      target: g ? l : N,
      targetHandle: g ? s : z
    };
    R.connection = V;
    const I = H && k && (r === Al.Strict ? g && j === "source" || !g && j === "target" : N !== l || z !== s);
    R.isValid = I && m(V), R.toHandle = ww(N, j, z, v, r, !0);
  }
  return R;
}
const Jh = {
  onPointerDown: WA,
  isValid: Ew
};
function JA({ domNode: e, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = Fn(e);
  function u({ translateExtent: d, width: p, height: m, zoomStep: v = 1, pannable: g = !0, zoomable: b = !0, inversePan: x = !1 }) {
    const _ = (N) => {
      if (N.sourceEvent.type !== "wheel" || !a)
        return;
      const z = r(), H = N.sourceEvent.ctrlKey && Jo() ? 10 : 1, k = -N.sourceEvent.deltaY * (N.sourceEvent.deltaMode === 1 ? 0.05 : N.sourceEvent.deltaMode ? 1 : 2e-3) * v, V = z[2] * Math.pow(2, k * H);
      a.scaleTo(V);
    };
    let C = [0, 0];
    const E = (N) => {
      (N.sourceEvent.type === "mousedown" || N.sourceEvent.type === "touchstart") && (C = [
        N.sourceEvent.clientX ?? N.sourceEvent.touches[0].clientX,
        N.sourceEvent.clientY ?? N.sourceEvent.touches[0].clientY
      ]);
    }, R = (N) => {
      const z = r();
      if (N.sourceEvent.type !== "mousemove" && N.sourceEvent.type !== "touchmove" || !a)
        return;
      const H = [
        N.sourceEvent.clientX ?? N.sourceEvent.touches[0].clientX,
        N.sourceEvent.clientY ?? N.sourceEvent.touches[0].clientY
      ], k = [H[0] - C[0], H[1] - C[1]];
      C = H;
      const V = l() * Math.max(z[2], Math.log(z[2])) * (x ? -1 : 1), A = {
        x: z[0] - k[0] * V,
        y: z[1] - k[1] * V
      }, I = [
        [0, 0],
        [p, m]
      ];
      a.setViewportConstrained({
        x: A.x,
        y: A.y,
        zoom: z[2]
      }, I, d);
    }, j = Wx().on("start", E).on("zoom", g ? R : null).on("zoom.wheel", b ? _ : null);
    s.call(j, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: xa
  };
}
const Bc = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), hh = ({ x: e, y: a, zoom: r }) => Lc.translate(e, a).scale(r), _l = (e, a) => e.target.closest(`.${a}`), Nw = (e, a) => a === 2 && Array.isArray(e) && e.includes(2), eD = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, mh = (e, a = 0, r = eD, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? e.transition().duration(a).ease(r).on("end", l) : e;
}, Cw = (e) => {
  const a = e.ctrlKey && Jo() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * a;
};
function tD({ zoomPanValues: e, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: p, onPanZoomEnd: m }) {
  return (v) => {
    if (_l(v, a))
      return v.ctrlKey && v.preventDefault(), !1;
    v.preventDefault(), v.stopImmediatePropagation();
    const g = r.property("__zoom").k || 1;
    if (v.ctrlKey && c) {
      const E = xa(v), R = Cw(v), j = g * Math.pow(2, R);
      l.scaleTo(r, j, E, v);
      return;
    }
    const b = v.deltaMode === 1 ? 20 : 1;
    let x = s === Rr.Vertical ? 0 : v.deltaX * b, _ = s === Rr.Horizontal ? 0 : v.deltaY * b;
    !Jo() && v.shiftKey && s !== Rr.Vertical && (x = v.deltaY * b, _ = 0), l.translateBy(
      r,
      -(x / g) * u,
      -(_ / g) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const C = Bc(r.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (p?.(v, C), e.panScrollTimeout = setTimeout(() => {
      m?.(v, C), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, d?.(v, C));
  };
}
function nD({ noWheelClassName: e, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, d = _l(l, e);
    if (l.ctrlKey && u && d && l.preventDefault(), c || d)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function aD({ zoomPanValues: e, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = Bc(l.transform);
    e.mouseButton = l.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function iD({ zoomPanValues: e, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    e.usedRightMouseButton = !!(r && Nw(a, e.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Bc(u.transform));
  };
}
function rD({ zoomPanValues: e, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (e.isZoomingOrPanning = !1, u && Nw(a, e.mouseButton ?? 0) && !e.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), e.usedRightMouseButton = !1, l(!1), s)) {
      const d = Bc(c.transform);
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
function lD({ zoomActivationKeyPressed: e, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: p, lib: m, connectionInProgress: v }) {
  return (g) => {
    const b = e || a, x = r && g.ctrlKey, _ = g.type === "wheel";
    if (g.button === 1 && g.type === "mousedown" && (_l(g, `${m}-flow__node`) || _l(g, `${m}-flow__edge`)))
      return !0;
    if (!l && !b && !s && !u && !r || c || v && !_ || _l(g, d) && _ || _l(g, p) && (!_ || s && _ && !e) || !r && g.ctrlKey && _)
      return !1;
    if (!r && g.type === "touchstart" && g.touches?.length > 1)
      return g.preventDefault(), !1;
    if (!b && !s && !x && _ || !l && (g.type === "mousedown" || g.type === "touchstart") || Array.isArray(l) && !l.includes(g.button) && g.type === "mousedown")
      return !1;
    const C = Array.isArray(l) && l.includes(g.button) || !g.button || g.button <= 1;
    return (!g.ctrlKey || _) && C;
  };
}
function oD({ domNode: e, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: p }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, v = e.getBoundingClientRect(), g = Wx().scaleExtent([a, r]).translateExtent(l), b = Fn(e).call(g);
  j({
    x: s.x,
    y: s.y,
    zoom: Dl(s.zoom, a, r)
  }, [
    [0, 0],
    [v.width, v.height]
  ], l);
  const x = b.on("wheel.zoom"), _ = b.on("dblclick.zoom");
  g.wheelDelta(Cw);
  async function C($, K) {
    return b ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? qo : tc).transform(mh(b, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function E({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: oe, userSelectionActive: O, panOnScroll: Y, panOnDrag: T, panOnScrollMode: L, panOnScrollSpeed: Z, preventScrolling: X, zoomOnPinch: ne, zoomOnScroll: D, zoomOnDoubleClick: U, zoomActivationKeyPressed: Q, lib: te, onTransformChange: ue, connectionInProgress: pe, paneClickDistance: ae, selectionOnDrag: G }) {
    O && !m.isZoomingOrPanning && R();
    const ce = Y && !Q && !O;
    g.clickDistance(G ? 1 / 0 : !_a(ae) || ae < 0 ? 0 : ae);
    const Ee = ce ? tD({
      zoomPanValues: m,
      noWheelClassName: $,
      d3Selection: b,
      d3Zoom: g,
      panOnScrollMode: L,
      panOnScrollSpeed: Z,
      zoomOnPinch: ne,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : nD({
      noWheelClassName: $,
      preventScrolling: X,
      d3ZoomHandler: x
    });
    b.on("wheel.zoom", Ee, { passive: !1 });
    const we = aD({
      zoomPanValues: m,
      onDraggingChange: p,
      onPanZoomStart: c
    });
    g.on("start", we);
    const Se = iD({
      zoomPanValues: m,
      panOnDrag: T,
      onPaneContextMenu: !!oe,
      onPanZoom: u,
      onTransformChange: ue
    });
    g.on("zoom", Se);
    const xe = rD({
      zoomPanValues: m,
      panOnDrag: T,
      panOnScroll: Y,
      onPaneContextMenu: oe,
      onPanZoomEnd: d,
      onDraggingChange: p
    });
    g.on("end", xe);
    const Te = lD({
      zoomActivationKeyPressed: Q,
      panOnDrag: T,
      zoomOnScroll: D,
      panOnScroll: Y,
      zoomOnDoubleClick: U,
      zoomOnPinch: ne,
      userSelectionActive: O,
      noPanClassName: K,
      noWheelClassName: $,
      lib: te,
      connectionInProgress: pe
    });
    g.filter(Te), U ? b.on("dblclick.zoom", _) : b.on("dblclick.zoom", null);
  }
  function R() {
    g.on("zoom", null);
  }
  async function j($, K, oe) {
    const O = hh($), Y = g?.constrain()(O, K, oe);
    return Y && await C(Y), Y;
  }
  async function N($, K) {
    const oe = hh($);
    return await C(oe, K), oe;
  }
  function z($) {
    if (b) {
      const K = hh($), oe = b.property("__zoom");
      (oe.k !== $.zoom || oe.x !== $.x || oe.y !== $.y) && g?.transform(b, K, null, { sync: !0 });
    }
  }
  function H() {
    const $ = b ? Kx(b.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function k($, K) {
    return b ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? qo : tc).scaleTo(mh(b, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  async function V($, K) {
    return b ? new Promise((oe) => {
      g?.interpolate(K?.interpolate === "linear" ? qo : tc).scaleBy(mh(b, K?.duration, K?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function A($) {
    g?.scaleExtent($);
  }
  function I($) {
    g?.translateExtent($);
  }
  function J($) {
    const K = !_a($) || $ < 0 ? 0 : $;
    g?.clickDistance(K);
  }
  return {
    update: E,
    destroy: R,
    setViewport: N,
    setViewportConstrained: j,
    getViewport: H,
    scaleTo: k,
    scaleBy: V,
    setScaleExtent: A,
    setTranslateExtent: I,
    syncViewport: z,
    setClickDistance: J
  };
}
var Ol;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Ol || (Ol = {}));
function sD({ width: e, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = e - a, d = r - l, p = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (p[0] = p[0] * -1), d && u && (p[1] = p[1] * -1), p;
}
function ub(e) {
  const a = e.includes("right") || e.includes("left"), r = e.includes("bottom") || e.includes("top"), l = e.includes("left"), s = e.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function Gi(e, a) {
  return Math.max(0, a - e);
}
function Xi(e, a) {
  return Math.max(0, e - a);
}
function Lu(e, a, r) {
  return Math.max(0, a - e, e - r);
}
function cb(e, a) {
  return e ? !a : a;
}
function uD(e, a, r, l, s, u, c, d) {
  let { affectsX: p, affectsY: m } = a;
  const { isHorizontal: v, isVertical: g } = a, b = v && g, { xSnapped: x, ySnapped: _ } = r, { minWidth: C, maxWidth: E, minHeight: R, maxHeight: j } = l, { x: N, y: z, width: H, height: k, aspectRatio: V } = e;
  let A = Math.floor(v ? x - e.pointerX : 0), I = Math.floor(g ? _ - e.pointerY : 0);
  const J = H + (p ? -A : A), $ = k + (m ? -I : I), K = -u[0] * H, oe = -u[1] * k;
  let O = Lu(J, C, E), Y = Lu($, R, j);
  if (c) {
    let Z = 0, X = 0;
    p && A < 0 ? Z = Gi(N + A + K, c[0][0]) : !p && A > 0 && (Z = Xi(N + J + K, c[1][0])), m && I < 0 ? X = Gi(z + I + oe, c[0][1]) : !m && I > 0 && (X = Xi(z + $ + oe, c[1][1])), O = Math.max(O, Z), Y = Math.max(Y, X);
  }
  if (d) {
    let Z = 0, X = 0;
    p && A > 0 ? Z = Xi(N + A, d[0][0]) : !p && A < 0 && (Z = Gi(N + J, d[1][0])), m && I > 0 ? X = Xi(z + I, d[0][1]) : !m && I < 0 && (X = Gi(z + $, d[1][1])), O = Math.max(O, Z), Y = Math.max(Y, X);
  }
  if (s) {
    if (v) {
      const Z = Lu(J / V, R, j) * V;
      if (O = Math.max(O, Z), c) {
        let X = 0;
        !p && !m || p && !m && b ? X = Xi(z + oe + J / V, c[1][1]) * V : X = Gi(z + oe + (p ? A : -A) / V, c[0][1]) * V, O = Math.max(O, X);
      }
      if (d) {
        let X = 0;
        !p && !m || p && !m && b ? X = Gi(z + J / V, d[1][1]) * V : X = Xi(z + (p ? A : -A) / V, d[0][1]) * V, O = Math.max(O, X);
      }
    }
    if (g) {
      const Z = Lu($ * V, C, E) / V;
      if (Y = Math.max(Y, Z), c) {
        let X = 0;
        !p && !m || m && !p && b ? X = Xi(N + $ * V + K, c[1][0]) / V : X = Gi(N + (m ? I : -I) * V + K, c[0][0]) / V, Y = Math.max(Y, X);
      }
      if (d) {
        let X = 0;
        !p && !m || m && !p && b ? X = Gi(N + $ * V, d[1][0]) / V : X = Xi(N + (m ? I : -I) * V, d[0][0]) / V, Y = Math.max(Y, X);
      }
    }
  }
  I = I + (I < 0 ? Y : -Y), A = A + (A < 0 ? O : -O), s && (b ? J > $ * V ? I = (cb(p, m) ? -A : A) / V : A = (cb(p, m) ? -I : I) * V : v ? (I = A / V, m = p) : (A = I * V, p = m));
  const T = p ? N + A : N, L = m ? z + I : z;
  return {
    width: H + (p ? -A : A),
    height: k + (m ? -I : I),
    x: u[0] * A * (p ? -1 : 1) + T,
    y: u[1] * I * (m ? -1 : 1) + L
  };
}
const Rw = { width: 0, height: 0, x: 0, y: 0 }, cD = {
  ...Rw,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function fD(e, a, r) {
  const l = a.position.x + e.position.x, s = a.position.y + e.position.y, u = e.measured.width ?? 0, c = e.measured.height ?? 0, d = r[0] * u, p = r[1] * c;
  return [
    [l - d, s - p],
    [l + u - d, s + c - p]
  ];
}
function dD({ domNode: e, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = Fn(e);
  let c = {
    controlDirection: ub("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: m, boundaries: v, keepAspectRatio: g, resizeDirection: b, onResizeStart: x, onResize: _, onResizeEnd: C, shouldResize: E }) {
    let R = { ...Rw }, j = { ...cD };
    c = {
      boundaries: v,
      resizeDirection: b,
      keepAspectRatio: g,
      controlDirection: ub(m)
    };
    let N, z = null, H = [], k, V, A, I = !1;
    const J = Hx().on("start", ($) => {
      const { nodeLookup: K, transform: oe, snapGrid: O, snapToGrid: Y, nodeOrigin: T, paneDomNode: L } = r();
      if (N = K.get(a), !N)
        return;
      z = L?.getBoundingClientRect() ?? null;
      const { xSnapped: Z, ySnapped: X } = $o($.sourceEvent, {
        transform: oe,
        snapGrid: O,
        snapToGrid: Y,
        containerBounds: z
      });
      R = {
        width: N.measured.width ?? 0,
        height: N.measured.height ?? 0,
        x: N.position.x ?? 0,
        y: N.position.y ?? 0
      }, j = {
        ...R,
        pointerX: Z,
        pointerY: X,
        aspectRatio: R.width / R.height
      }, k = void 0, V = Dr(N.extent) ? N.extent : void 0, N.parentId && (N.extent === "parent" || N.expandParent) && (k = K.get(N.parentId)), k && N.extent === "parent" && (V = [
        [0, 0],
        [k.measured.width, k.measured.height]
      ]), H = [], A = void 0;
      for (const [ne, D] of K)
        if (D.parentId === a && (H.push({
          id: ne,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const U = fD(D, N, D.origin ?? T);
          A ? A = [
            [Math.min(U[0][0], A[0][0]), Math.min(U[0][1], A[0][1])],
            [Math.max(U[1][0], A[1][0]), Math.max(U[1][1], A[1][1])]
          ] : A = U;
        }
      x?.($, { ...R });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: oe, snapToGrid: O, nodeOrigin: Y } = r(), T = $o($.sourceEvent, {
        transform: K,
        snapGrid: oe,
        snapToGrid: O,
        containerBounds: z
      }), L = [];
      if (!N)
        return;
      const { x: Z, y: X, width: ne, height: D } = R, U = {}, Q = N.origin ?? Y, { width: te, height: ue, x: pe, y: ae } = uD(j, c.controlDirection, T, c.boundaries, c.keepAspectRatio, Q, V, A), G = te !== ne, ce = ue !== D, Ee = pe !== Z && G, we = ae !== X && ce;
      if (!Ee && !we && !G && !ce)
        return;
      if ((Ee || we || Q[0] === 1 || Q[1] === 1) && (U.x = Ee ? pe : R.x, U.y = we ? ae : R.y, R.x = U.x, R.y = U.y, H.length > 0)) {
        const $e = pe - Z, ft = ae - X;
        for (const Me of H)
          Me.position = {
            x: Me.position.x - $e + Q[0] * (te - ne),
            y: Me.position.y - ft + Q[1] * (ue - D)
          }, L.push(Me);
      }
      if ((G || ce) && (U.width = G && (!c.resizeDirection || c.resizeDirection === "horizontal") ? te : R.width, U.height = ce && (!c.resizeDirection || c.resizeDirection === "vertical") ? ue : R.height, R.width = U.width, R.height = U.height), k && N.expandParent) {
        const $e = Q[0] * (U.width ?? 0);
        U.x && U.x < $e && (R.x = $e, j.x = j.x - (U.x - $e));
        const ft = Q[1] * (U.height ?? 0);
        U.y && U.y < ft && (R.y = ft, j.y = j.y - (U.y - ft));
      }
      const Se = sD({
        width: R.width,
        prevWidth: ne,
        height: R.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...R, direction: Se };
      E?.($, xe) !== !1 && (I = !0, _?.($, xe), l(U, L));
    }).on("end", ($) => {
      I && (C?.($, { ...R }), s?.({ ...R }), I = !1);
    });
    u.call(J);
  }
  function p() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: p
  };
}
var ph = { exports: {} }, gh = {}, vh = { exports: {} }, yh = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fb;
function hD() {
  if (fb) return yh;
  fb = 1;
  var e = rs();
  function a(g, b) {
    return g === b && (g !== 0 || 1 / g === 1 / b) || g !== g && b !== b;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = e.useState, s = e.useEffect, u = e.useLayoutEffect, c = e.useDebugValue;
  function d(g, b) {
    var x = b(), _ = l({ inst: { value: x, getSnapshot: b } }), C = _[0].inst, E = _[1];
    return u(
      function() {
        C.value = x, C.getSnapshot = b, p(C) && E({ inst: C });
      },
      [g, x, b]
    ), s(
      function() {
        return p(C) && E({ inst: C }), g(function() {
          p(C) && E({ inst: C });
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
      return !r(g, x);
    } catch {
      return !0;
    }
  }
  function m(g, b) {
    return b();
  }
  var v = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : d;
  return yh.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : v, yh;
}
var db;
function Tw() {
  return db || (db = 1, vh.exports = hD()), vh.exports;
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
var hb;
function mD() {
  if (hb) return gh;
  hb = 1;
  var e = rs(), a = Tw();
  function r(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = e.useRef, c = e.useEffect, d = e.useMemo, p = e.useDebugValue;
  return gh.useSyncExternalStoreWithSelector = function(m, v, g, b, x) {
    var _ = u(null);
    if (_.current === null) {
      var C = { hasValue: !1, value: null };
      _.current = C;
    } else C = _.current;
    _ = d(
      function() {
        function R(k) {
          if (!j) {
            if (j = !0, N = k, k = b(k), x !== void 0 && C.hasValue) {
              var V = C.value;
              if (x(V, k))
                return z = V;
            }
            return z = k;
          }
          if (V = z, l(N, k)) return V;
          var A = b(k);
          return x !== void 0 && x(V, A) ? (N = k, V) : (N = k, z = A);
        }
        var j = !1, N, z, H = g === void 0 ? null : g;
        return [
          function() {
            return R(v());
          },
          H === null ? void 0 : function() {
            return R(H());
          }
        ];
      },
      [v, g, b, x]
    );
    var E = s(m, _[0], _[1]);
    return c(
      function() {
        C.hasValue = !0, C.value = E;
      },
      [E]
    ), p(E), E;
  }, gh;
}
var mb;
function pD() {
  return mb || (mb = 1, ph.exports = mD()), ph.exports;
}
var gD = pD();
const vD = /* @__PURE__ */ gm(gD), yD = {}, pb = (e) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (v, g) => {
    const b = typeof v == "function" ? v(a) : v;
    if (!Object.is(b, a)) {
      const x = a;
      a = g ?? (typeof b != "object" || b === null) ? b : Object.assign({}, a, b), r.forEach((_) => _(a, x));
    }
  }, s = () => a, p = { setState: l, getState: s, getInitialState: () => m, subscribe: (v) => (r.add(v), () => r.delete(v)), destroy: () => {
    (yD ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = e(l, s, p);
  return p;
}, bD = (e) => e ? pb(e) : pb, { useDebugValue: xD } = ve, { useSyncExternalStoreWithSelector: wD } = vD, _D = (e) => e;
function Mw(e, a = _D, r) {
  const l = wD(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    a,
    r
  );
  return xD(l), l;
}
const gb = (e, a) => {
  const r = bD(e), l = (s, u = a) => Mw(r, s, u);
  return Object.assign(l, r), l;
}, SD = (e, a) => e ? gb(e, a) : gb;
function Dt(e, a) {
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
var ED = U1();
const ND = /* @__PURE__ */ gm(ED), Uc = S.createContext(null), CD = Uc.Provider, Aw = Ea.error001("react");
function lt(e, a) {
  const r = S.useContext(Uc);
  if (r === null)
    throw new Error(Aw);
  return Mw(r, e, a);
}
function jt() {
  const e = S.useContext(Uc);
  if (e === null)
    throw new Error(Aw);
  return S.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const vb = { display: "none" }, RD = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Dw = "react-flow__node-desc", jw = "react-flow__edge-desc", TD = "react-flow__aria-live", MD = (e) => e.ariaLiveMessage, AD = (e) => e.ariaLabelConfig;
function DD({ rfId: e }) {
  const a = lt(MD);
  return y.jsx("div", { id: `${TD}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: RD, children: a });
}
function jD({ rfId: e, disableKeyboardA11y: a }) {
  const r = lt(AD);
  return y.jsxs(y.Fragment, { children: [y.jsx("div", { id: `${Dw}-${e}`, style: vb, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), y.jsx("div", { id: `${jw}-${e}`, style: vb, children: r["edge.a11yDescription.default"] }), !a && y.jsx(DD, { rfId: e })] });
}
const Vc = S.forwardRef(({ position: e = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${e}`.split("-");
  return y.jsx("div", { className: Pt(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
Vc.displayName = "Panel";
function zD({ proOptions: e, position: a = "bottom-right" }) {
  return e?.hideAttribution ? null : y.jsx(Vc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: y.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const OD = (e) => {
  const a = [], r = [];
  for (const [, l] of e.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of e.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, ku = (e) => e.id;
function LD(e, a) {
  return Dt(e.selectedNodes.map(ku), a.selectedNodes.map(ku)) && Dt(e.selectedEdges.map(ku), a.selectedEdges.map(ku));
}
function kD({ onSelectionChange: e }) {
  const a = jt(), { selectedNodes: r, selectedEdges: l } = lt(OD, LD);
  return S.useEffect(() => {
    const s = { nodes: r, edges: l };
    e?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, e]), null;
}
const HD = (e) => !!e.onSelectionChangeHandlers;
function BD({ onSelectionChange: e }) {
  const a = lt(HD);
  return e || a ? y.jsx(kD, { onSelectionChange: e }) : null;
}
const zw = [0, 0], UD = { x: 0, y: 0, zoom: 1 }, VD = [
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
], yb = [...VD, "rfId"], qD = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), bb = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Qo,
  nodeOrigin: zw,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function $D(e) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: p } = lt(qD, Dt), m = jt();
  S.useEffect(() => (p(e.defaultNodes, e.defaultEdges), () => {
    v.current = bb, d();
  }), []);
  const v = S.useRef(bb);
  return S.useEffect(
    () => {
      for (const g of yb) {
        const b = e[g], x = v.current[g];
        b !== x && (typeof e[g] > "u" || (g === "nodes" ? a(b) : g === "edges" ? r(b) : g === "minZoom" ? l(b) : g === "maxZoom" ? s(b) : g === "translateExtent" ? u(b) : g === "nodeExtent" ? c(b) : g === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: NA(b) }) : g === "fitView" ? m.setState({ fitViewQueued: b }) : g === "fitViewOptions" ? m.setState({ fitViewOptions: b }) : m.setState({ [g]: b })));
      }
      v.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    yb.map((g) => e[g])
  ), null;
}
function xb() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function ID(e) {
  const [a, r] = S.useState(e === "system" ? null : e);
  return S.useEffect(() => {
    if (e !== "system") {
      r(e);
      return;
    }
    const l = xb(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [e]), a !== null ? a : xb()?.matches ? "dark" : "light";
}
const wb = typeof document < "u" ? document : null;
function es(e = null, a = { target: wb, actInsideInputWithModifier: !0 }) {
  const [r, l] = S.useState(!1), s = S.useRef(!1), u = S.useRef(/* @__PURE__ */ new Set([])), [c, d] = S.useMemo(() => {
    if (e !== null) {
      const m = (Array.isArray(e) ? e : [e]).filter((g) => typeof g == "string").map((g) => g.replace("+", `
`).replace(`

`, `
+`).split(`
`)), v = m.reduce((g, b) => g.concat(...b), []);
      return [m, v];
    }
    return [[], []];
  }, [e]);
  return S.useEffect(() => {
    const p = a?.target ?? wb, m = a?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const v = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && fw(x))
          return !1;
        const C = Sb(x.code, d);
        if (u.current.add(x[C]), _b(c, u.current, !1)) {
          const E = x.composedPath?.()?.[0] || x.target, R = E?.nodeName === "BUTTON" || E?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !R) && x.preventDefault(), l(!0);
        }
      }, g = (x) => {
        const _ = Sb(x.code, d);
        _b(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(x[_]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, b = () => {
        u.current.clear(), l(!1);
      };
      return p?.addEventListener("keydown", v), p?.addEventListener("keyup", g), window.addEventListener("blur", b), window.addEventListener("contextmenu", b), () => {
        p?.removeEventListener("keydown", v), p?.removeEventListener("keyup", g), window.removeEventListener("blur", b), window.removeEventListener("contextmenu", b);
      };
    }
  }, [e, l]), r;
}
function _b(e, a, r) {
  return e.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Sb(e, a) {
  return a.includes(e) ? "code" : "key";
}
const YD = () => {
  const e = jt();
  return S.useMemo(() => ({
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
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: d } = e.getState(), p = qm(a, l, s, u, c, r?.padding ?? 0.1);
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
      }, v = r.snapGrid ?? s, g = r.snapToGrid ?? u;
      return kl(m, l, g, v);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: l } = e.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = zl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function Ow(e, a) {
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
      GD(p, d);
    r.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function GD(e, a) {
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
function XD(e, a) {
  return Ow(e, a);
}
function FD(e, a) {
  return Ow(e, a);
}
function _r(e, a) {
  return {
    id: e,
    type: "select",
    selected: a
  };
}
function Sl(e, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of e) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(_r(u.id, c)));
  }
  return l;
}
function Eb({ items: e = [], lookup: a }) {
  const r = [], l = new Map(e.map((s) => [s.id, s]));
  for (const [s, u] of e.entries()) {
    const c = a.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && r.push({ id: u.id, item: u, type: "replace" }), d === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function Nb(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const ZD = ow();
function PD(e, a, r = {}) {
  return DA(e, a, {
    ...r,
    onError: r.onError ?? ZD
  });
}
const Cb = (e) => gA(e), QD = (e) => aw(e);
function Lw(e) {
  return S.forwardRef(e);
}
const KD = typeof window < "u" ? S.useLayoutEffect : S.useEffect;
function Rb(e) {
  const [a, r] = S.useState(BigInt(0)), [l] = S.useState(() => WD(() => r((s) => s + BigInt(1))));
  return KD(() => {
    const s = l.get();
    s.length && (e(s), l.reset());
  }, [a]), l;
}
function WD(e) {
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
const kw = S.createContext(null);
function JD({ children: e }) {
  const a = jt(), r = S.useCallback((d) => {
    const { nodes: p = [], setNodes: m, hasDefaultNodes: v, onNodesChange: g, nodeLookup: b, fitViewQueued: x, onNodesChangeMiddlewareMap: _ } = a.getState();
    let C = p;
    for (const R of d)
      C = typeof R == "function" ? R(C) : R;
    let E = Eb({
      items: C,
      lookup: b
    });
    for (const R of _.values())
      E = R(E);
    v && m(C), E.length > 0 ? g?.(E) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: R, nodes: j, setNodes: N } = a.getState();
      R && N(j);
    });
  }, []), l = Rb(r), s = S.useCallback((d) => {
    const { edges: p = [], setEdges: m, hasDefaultEdges: v, onEdgesChange: g, edgeLookup: b } = a.getState();
    let x = p;
    for (const _ of d)
      x = typeof _ == "function" ? _(x) : _;
    v ? m(x) : g && g(Eb({
      items: x,
      lookup: b
    }));
  }, []), u = Rb(s), c = S.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return y.jsx(kw.Provider, { value: c, children: e });
}
function e4() {
  const e = S.useContext(kw);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const t4 = (e) => !!e.panZoom;
function Zm() {
  const e = YD(), a = jt(), r = e4(), l = lt(t4), s = S.useMemo(() => {
    const u = (g) => a.getState().nodeLookup.get(g), c = (g) => {
      r.nodeQueue.push(g);
    }, d = (g) => {
      r.edgeQueue.push(g);
    }, p = (g) => {
      const { nodeLookup: b, nodeOrigin: x } = a.getState(), _ = Cb(g) ? g : b.get(g.id), C = _.parentId ? uw(_.position, _.measured, _.parentId, b, x) : _.position, E = {
        ..._,
        position: C,
        width: _.measured?.width ?? _.width,
        height: _.measured?.height ?? _.height
      };
      return jl(E);
    }, m = (g, b, x = { replace: !1 }) => {
      c((_) => _.map((C) => {
        if (C.id === g) {
          const E = typeof b == "function" ? b(C) : b;
          return x.replace && Cb(E) ? E : { ...C, ...E };
        }
        return C;
      }));
    }, v = (g, b, x = { replace: !1 }) => {
      d((_) => _.map((C) => {
        if (C.id === g) {
          const E = typeof b == "function" ? b(C) : b;
          return x.replace && QD(E) ? E : { ...C, ...E };
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
        return g.map((b) => ({ ...b }));
      },
      getEdge: (g) => a.getState().edgeLookup.get(g),
      setNodes: c,
      setEdges: d,
      addNodes: (g) => {
        const b = Array.isArray(g) ? g : [g];
        r.nodeQueue.push((x) => [...x, ...b]);
      },
      addEdges: (g) => {
        const b = Array.isArray(g) ? g : [g];
        r.edgeQueue.push((x) => [...x, ...b]);
      },
      toObject: () => {
        const { nodes: g = [], edges: b = [], transform: x } = a.getState(), [_, C, E] = x;
        return {
          nodes: g.map((R) => ({ ...R })),
          edges: b.map((R) => ({ ...R })),
          viewport: {
            x: _,
            y: C,
            zoom: E
          }
        };
      },
      deleteElements: async ({ nodes: g = [], edges: b = [] }) => {
        const { nodes: x, edges: _, onNodesDelete: C, onEdgesDelete: E, triggerNodeChanges: R, triggerEdgeChanges: j, onDelete: N, onBeforeDelete: z } = a.getState(), { nodes: H, edges: k } = await wA({
          nodesToRemove: g,
          edgesToRemove: b,
          nodes: x,
          edges: _,
          onBeforeDelete: z
        }), V = k.length > 0, A = H.length > 0;
        if (V) {
          const I = k.map(Nb);
          E?.(k), j(I);
        }
        if (A) {
          const I = H.map(Nb);
          C?.(H), R(I);
        }
        return (A || V) && N?.({ nodes: H, edges: k }), { deletedNodes: H, deletedEdges: k };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (g, b = !0, x) => {
        const _ = Wy(g), C = _ ? g : p(g), E = x !== void 0;
        return C ? (x || a.getState().nodes).filter((R) => {
          const j = a.getState().nodeLookup.get(R.id);
          if (j && !_ && (R.id === g.id || !j.internals.positionAbsolute))
            return !1;
          const N = jl(E ? R : j), z = Wo(N, C);
          return b && z > 0 || z >= N.width * N.height || z >= C.width * C.height;
        }) : [];
      },
      isNodeIntersecting: (g, b, x = !0) => {
        const C = Wy(g) ? g : p(g);
        if (!C)
          return !1;
        const E = Wo(C, b);
        return x && E > 0 || E >= b.width * b.height || E >= C.width * C.height;
      },
      updateNode: m,
      updateNodeData: (g, b, x = { replace: !1 }) => {
        m(g, (_) => {
          const C = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: C } : { ..._, data: { ..._.data, ...C } };
        }, x);
      },
      updateEdge: v,
      updateEdgeData: (g, b, x = { replace: !1 }) => {
        v(g, (_) => {
          const C = typeof b == "function" ? b(_) : b;
          return x.replace ? { ..._, data: C } : { ..._, data: { ..._.data, ...C } };
        }, x);
      },
      getNodesBounds: (g) => {
        const { nodeLookup: b, nodeOrigin: x } = a.getState();
        return vA(g, { nodeLookup: b, nodeOrigin: x });
      },
      getHandleConnections: ({ type: g, id: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}-${g}${b ? `-${b}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: g, handleId: b, nodeId: x }) => Array.from(a.getState().connectionLookup.get(`${x}${g ? b ? `-${g}-${b}` : `-${g}` : ""}`)?.values() ?? []),
      fitView: async (g) => {
        const b = a.getState().fitViewResolver ?? EA();
        return a.setState({ fitViewQueued: !0, fitViewOptions: g, fitViewResolver: b }), r.nodeQueue.push((x) => [...x]), b.promise;
      }
    };
  }, []);
  return S.useMemo(() => ({
    ...s,
    ...e,
    viewportInitialized: l
  }), [l]);
}
const Tb = (e) => e.selected, n4 = typeof window < "u" ? window : void 0;
function a4({ deleteKeyCode: e, multiSelectionKeyCode: a }) {
  const r = jt(), { deleteElements: l } = Zm(), s = es(e, { actInsideInputWithModifier: !1 }), u = es(a, { target: n4 });
  S.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = r.getState();
      l({ nodes: d.filter(Tb), edges: c.filter(Tb) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), S.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function i4(e) {
  const a = jt();
  S.useEffect(() => {
    const r = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const l = $m(e.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", Ea.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
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
const qc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, r4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function l4({ onPaneContextMenu: e, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = Rr.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: p, translateExtent: m, minZoom: v, maxZoom: g, zoomActivationKeyCode: b, preventScrolling: x = !0, children: _, noWheelClassName: C, noPanClassName: E, onViewportChange: R, isControlledViewport: j, paneClickDistance: N, selectionOnDrag: z }) {
  const H = jt(), k = S.useRef(null), { userSelectionActive: V, lib: A, connectionInProgress: I } = lt(r4, Dt), J = es(b), $ = S.useRef();
  i4(k);
  const K = S.useCallback((oe) => {
    R?.({ x: oe[0], y: oe[1], zoom: oe[2] }), j || H.setState({ transform: oe });
  }, [R, j]);
  return S.useEffect(() => {
    if (k.current) {
      $.current = oD({
        domNode: k.current,
        minZoom: v,
        maxZoom: g,
        translateExtent: m,
        viewport: p,
        onDraggingChange: (T) => H.setState((L) => L.paneDragging === T ? L : { paneDragging: T }),
        onPanZoomStart: (T, L) => {
          const { onViewportChangeStart: Z, onMoveStart: X } = H.getState();
          X?.(T, L), Z?.(L);
        },
        onPanZoom: (T, L) => {
          const { onViewportChange: Z, onMove: X } = H.getState();
          X?.(T, L), Z?.(L);
        },
        onPanZoomEnd: (T, L) => {
          const { onViewportChangeEnd: Z, onMoveEnd: X } = H.getState();
          X?.(T, L), Z?.(L);
        }
      });
      const { x: oe, y: O, zoom: Y } = $.current.getViewport();
      return H.setState({
        panZoom: $.current,
        transform: [oe, O, Y],
        domNode: k.current.closest(".react-flow")
      }), () => {
        $.current?.destroy();
      };
    }
  }, []), S.useEffect(() => {
    $.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: a,
      zoomOnPinch: r,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: J,
      preventScrolling: x,
      noPanClassName: E,
      userSelectionActive: V,
      noWheelClassName: C,
      lib: A,
      onTransformChange: K,
      connectionInProgress: I,
      selectionOnDrag: z,
      paneClickDistance: N
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
    J,
    x,
    E,
    V,
    C,
    A,
    K,
    I,
    z,
    N
  ]), y.jsx("div", { className: "react-flow__renderer", ref: k, style: qc, children: _ });
}
const o4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function s4() {
  const { userSelectionActive: e, userSelectionRect: a } = lt(o4, Dt);
  return e && a ? y.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const bh = (e, a) => (r) => {
  r.target === a.current && e?.(r);
}, u4 = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function c4({ isSelecting: e, selectionKeyPressed: a, selectionMode: r = Ko.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: p, onPaneClick: m, onPaneContextMenu: v, onPaneScroll: g, onPaneMouseEnter: b, onPaneMouseMove: x, onPaneMouseLeave: _, children: C }) {
  const E = S.useRef(0), R = jt(), { userSelectionActive: j, elementsSelectable: N, dragging: z, connectionInProgress: H, panBy: k, autoPanSpeed: V } = lt(u4, Dt), A = N && (e || j), I = S.useRef(null), J = S.useRef(), $ = S.useRef(/* @__PURE__ */ new Set()), K = S.useRef(/* @__PURE__ */ new Set()), oe = S.useRef(!1), O = S.useRef({ x: 0, y: 0 }), Y = S.useRef(!1), T = (G) => {
    if (oe.current || H) {
      oe.current = !1;
      return;
    }
    m?.(G), R.getState().resetSelectedElements(), R.setState({ nodesSelectionActive: !1 });
  }, L = (G) => {
    if (Array.isArray(l) && l?.includes(2)) {
      G.preventDefault();
      return;
    }
    v?.(G);
  }, Z = g ? (G) => g(G) : void 0, X = (G) => {
    oe.current && (G.stopPropagation(), oe.current = !1);
  }, ne = (G) => {
    const { domNode: ce, transform: Ee } = R.getState();
    if (J.current = ce?.getBoundingClientRect(), !J.current)
      return;
    const we = G.target === I.current;
    if (!we && !!G.target.closest(".nokey") || !e || !(c && we || a) || G.button !== 0 || !G.isPrimary)
      return;
    G.target?.setPointerCapture?.(G.pointerId), oe.current = !1;
    const { x: Te, y: $e } = Sa(G.nativeEvent, J.current), ft = kl({ x: Te, y: $e }, Ee);
    R.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Te,
        y: $e
      }
    }), we || (G.stopPropagation(), G.preventDefault());
  };
  function D(G, ce) {
    const { userSelectionRect: Ee } = R.getState();
    if (!Ee)
      return;
    const { transform: we, nodeLookup: Se, edgeLookup: xe, connectionLookup: Te, triggerNodeChanges: $e, triggerEdgeChanges: ft, defaultEdgeOptions: Me } = R.getState(), Xe = { x: Ee.startX, y: Ee.startY }, { x: He, y: Ie } = zl(Xe, we), _t = {
      startX: Xe.x,
      startY: Xe.y,
      x: G < He ? G : He,
      y: ce < Ie ? ce : Ie,
      width: Math.abs(G - He),
      height: Math.abs(ce - Ie)
    }, We = $.current, Ze = K.current;
    $.current = new Set(Um(Se, _t, we, r === Ko.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Pe = Me?.selectable ?? !0;
    for (const gt of $.current) {
      const vt = Te.get(gt);
      if (vt)
        for (const { edgeId: Yt } of vt.values()) {
          const Lt = xe.get(Yt);
          Lt && (Lt.selectable ?? Pe) && K.current.add(Yt);
        }
    }
    if (!Jy(We, $.current)) {
      const gt = Sl(Se, $.current, !0);
      $e(gt);
    }
    if (!Jy(Ze, K.current)) {
      const gt = Sl(xe, K.current);
      ft(gt);
    }
    R.setState({
      userSelectionRect: _t,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function U() {
    if (!s || !J.current)
      return;
    const [G, ce] = Vm(O.current, J.current, V);
    k({ x: G, y: ce }).then((Ee) => {
      if (!oe.current || !Ee) {
        E.current = requestAnimationFrame(U);
        return;
      }
      const { x: we, y: Se } = O.current;
      D(we, Se), E.current = requestAnimationFrame(U);
    });
  }
  const Q = () => {
    cancelAnimationFrame(E.current), E.current = 0, Y.current = !1;
  };
  S.useEffect(() => () => Q(), []);
  const te = (G) => {
    const { userSelectionRect: ce, transform: Ee, resetSelectedElements: we } = R.getState();
    if (!J.current || !ce)
      return;
    const { x: Se, y: xe } = Sa(G.nativeEvent, J.current);
    O.current = { x: Se, y: xe };
    const Te = zl({ x: ce.startX, y: ce.startY }, Ee);
    if (!oe.current) {
      const $e = a ? 0 : u;
      if (Math.hypot(Se - Te.x, xe - Te.y) <= $e)
        return;
      we(), d?.(G);
    }
    oe.current = !0, Y.current || (U(), Y.current = !0), D(Se, xe);
  }, ue = (G) => {
    G.button === 0 && (G.target?.releasePointerCapture?.(G.pointerId), !j && G.target === I.current && R.getState().userSelectionRect && T?.(G), R.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), oe.current && (p?.(G), R.setState({
      nodesSelectionActive: $.current.size > 0
    })), Q());
  }, pe = (G) => {
    G.target?.releasePointerCapture?.(G.pointerId), Q();
  }, ae = l === !0 || Array.isArray(l) && l.includes(0);
  return y.jsxs("div", { className: Pt(["react-flow__pane", { draggable: ae, dragging: z, selection: e }]), onClick: A ? void 0 : bh(T, I), onContextMenu: bh(L, I), onWheel: bh(Z, I), onPointerEnter: A ? void 0 : b, onPointerMove: A ? te : x, onPointerUp: A ? ue : void 0, onPointerCancel: A ? pe : void 0, onPointerDownCapture: A ? ne : void 0, onClickCapture: A ? X : void 0, onPointerLeave: _, ref: I, style: qc, children: [C, y.jsx(s4, {})] });
}
function em({ id: e, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: p } = a.getState(), m = d.get(e);
  if (!m) {
    p?.("012", Ea.error012(e));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([e]);
}
function Hw({ nodeRef: e, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = jt(), [p, m] = S.useState(!1), v = S.useRef();
  return S.useEffect(() => {
    v.current = FA({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (g) => {
        em({
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
    if (!(a || !e.current || !v.current))
      return v.current.update({
        noDragClassName: r,
        handleSelector: l,
        domNode: e.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        v.current?.destroy();
      };
  }, [r, l, a, u, e, s, c]), p;
}
const f4 = (e) => (a) => a.selected && (a.draggable || e && typeof a.draggable > "u");
function Bw() {
  const e = jt();
  return S.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: p, nodeLookup: m, nodeOrigin: v } = e.getState(), g = /* @__PURE__ */ new Map(), b = f4(c), x = s ? u[0] : 5, _ = s ? u[1] : 5, C = r.direction.x * x * r.factor, E = r.direction.y * _ * r.factor;
    for (const [, R] of m) {
      if (!b(R))
        continue;
      let j = {
        x: R.internals.positionAbsolute.x + C,
        y: R.internals.positionAbsolute.y + E
      };
      s && (j = ms(j, u));
      const { position: N, positionAbsolute: z } = iw({
        nodeId: R.id,
        nextPosition: j,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: v,
        onError: d
      });
      R.position = N, R.internals.positionAbsolute = z, g.set(R.id, R);
    }
    p(g);
  }, []);
}
const Pm = S.createContext(null), d4 = Pm.Provider;
Pm.Consumer;
const Uw = () => S.useContext(Pm), h4 = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), m4 = (e, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: d, toHandle: p, isValid: m } = c, v = p?.nodeId === e && p?.id === a && p?.type === r;
  return {
    connectingFrom: d?.nodeId === e && d?.id === a && d?.type === r,
    connectingTo: v,
    clickConnecting: s?.nodeId === e && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === Al.Strict ? d?.type !== r : e !== d?.nodeId || a !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: v && m
  };
};
function p4({ type: e = "source", position: a = je.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: p, className: m, onMouseDown: v, onTouchStart: g, ...b }, x) {
  const _ = c || null, C = e === "target", E = jt(), R = Uw(), { connectOnClick: j, noPanClassName: N, rfId: z } = lt(h4, Dt), { connectingFrom: H, connectingTo: k, clickConnecting: V, isPossibleEndHandle: A, connectionInProcess: I, clickConnectionInProcess: J, valid: $ } = lt(m4(R, _, e), Dt);
  R || E.getState().onError?.("010", Ea.error010());
  const K = (Y) => {
    const { defaultEdgeOptions: T, onConnect: L, hasDefaultEdges: Z } = E.getState(), X = {
      ...T,
      ...Y
    };
    if (Z) {
      const { edges: ne, setEdges: D, onError: U } = E.getState();
      D(PD(X, ne, { onError: U }));
    }
    L?.(X), d?.(X);
  }, oe = (Y) => {
    if (!R)
      return;
    const T = dw(Y.nativeEvent);
    if (s && (T && Y.button === 0 || !T)) {
      const L = E.getState();
      Jh.onPointerDown(Y.nativeEvent, {
        handleDomNode: Y.currentTarget,
        autoPanOnConnect: L.autoPanOnConnect,
        connectionMode: L.connectionMode,
        connectionRadius: L.connectionRadius,
        domNode: L.domNode,
        nodeLookup: L.nodeLookup,
        lib: L.lib,
        isTarget: C,
        handleId: _,
        nodeId: R,
        flowId: L.rfId,
        panBy: L.panBy,
        cancelConnection: L.cancelConnection,
        onConnectStart: L.onConnectStart,
        onConnectEnd: (...Z) => E.getState().onConnectEnd?.(...Z),
        updateConnection: L.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...Z) => E.getState().isValidConnection?.(...Z) ?? !0),
        getTransform: () => E.getState().transform,
        getFromHandle: () => E.getState().connection.fromHandle,
        autoPanSpeed: L.autoPanSpeed,
        dragThreshold: L.connectionDragThreshold
      });
    }
    T ? v?.(Y) : g?.(Y);
  }, O = (Y) => {
    const { onClickConnectStart: T, onClickConnectEnd: L, connectionClickStartHandle: Z, connectionMode: X, isValidConnection: ne, lib: D, rfId: U, nodeLookup: Q, connection: te } = E.getState();
    if (!R || !Z && !s)
      return;
    if (!Z) {
      T?.(Y.nativeEvent, { nodeId: R, handleId: _, handleType: e }), E.setState({ connectionClickStartHandle: { nodeId: R, type: e, id: _ } });
      return;
    }
    const ue = cw(Y.target), pe = r || ne, { connection: ae, isValid: G } = Jh.isValid(Y.nativeEvent, {
      handle: {
        nodeId: R,
        id: _,
        type: e
      },
      connectionMode: X,
      fromNodeId: Z.nodeId,
      fromHandleId: Z.id || null,
      fromType: Z.type,
      isValidConnection: pe,
      flowId: U,
      doc: ue,
      lib: D,
      nodeLookup: Q
    });
    G && ae && K(ae);
    const ce = structuredClone(te);
    delete ce.inProgress, ce.toPosition = ce.toHandle ? ce.toHandle.position : null, L?.(Y, ce), E.setState({ connectionClickStartHandle: null });
  };
  return y.jsx("div", { "data-handleid": _, "data-nodeid": R, "data-handlepos": a, "data-id": `${z}-${R}-${_}-${e}`, className: Pt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    N,
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
      connectionindicator: l && (!I || A) && (I || J ? u : s)
    }
  ]), onMouseDown: oe, onTouchStart: oe, onClick: j ? O : void 0, ref: x, ...b, children: p });
}
const Ll = S.memo(Lw(p4));
function g4({ data: e, isConnectable: a, sourcePosition: r = je.Bottom }) {
  return y.jsxs(y.Fragment, { children: [e?.label, y.jsx(Ll, { type: "source", position: r, isConnectable: a })] });
}
function v4({ data: e, isConnectable: a, targetPosition: r = je.Top, sourcePosition: l = je.Bottom }) {
  return y.jsxs(y.Fragment, { children: [y.jsx(Ll, { type: "target", position: r, isConnectable: a }), e?.label, y.jsx(Ll, { type: "source", position: l, isConnectable: a })] });
}
function y4() {
  return null;
}
function b4({ data: e, isConnectable: a, targetPosition: r = je.Top }) {
  return y.jsxs(y.Fragment, { children: [y.jsx(Ll, { type: "target", position: r, isConnectable: a }), e?.label] });
}
const bc = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Mb = {
  input: g4,
  default: v4,
  output: b4,
  group: y4
};
function x4(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const w4 = (e) => {
  const { width: a, height: r, x: l, y: s } = hs(e.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: _a(a) ? a : null,
    height: _a(r) ? r : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${l}px,${s}px)`
  };
};
function _4({ onSelectionContextMenu: e, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = jt(), { width: s, height: u, transformString: c, userSelectionActive: d } = lt(w4, Dt), p = Bw(), m = S.useRef(null);
  S.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const v = !d && s !== null && u !== null;
  if (Hw({
    nodeRef: m,
    disabled: !v
  }), !v)
    return null;
  const g = e ? (x) => {
    const _ = l.getState().nodes.filter((C) => C.selected);
    e(x, _);
  } : void 0, b = (x) => {
    Object.prototype.hasOwnProperty.call(bc, x.key) && (x.preventDefault(), p({
      direction: bc[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return y.jsx("div", { className: Pt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: y.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: g, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : b, style: {
    width: s,
    height: u
  } }) });
}
const Ab = typeof window < "u" ? window : void 0, S4 = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Vw({ children: e, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: p, selectionKeyCode: m, selectionOnDrag: v, selectionMode: g, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: _, panActivationKeyCode: C, zoomActivationKeyCode: E, elementsSelectable: R, zoomOnScroll: j, zoomOnPinch: N, panOnScroll: z, panOnScrollSpeed: H, panOnScrollMode: k, zoomOnDoubleClick: V, panOnDrag: A, autoPanOnSelection: I, defaultViewport: J, translateExtent: $, minZoom: K, maxZoom: oe, preventScrolling: O, onSelectionContextMenu: Y, noWheelClassName: T, noPanClassName: L, disableKeyboardA11y: Z, onViewportChange: X, isControlledViewport: ne }) {
  const { nodesSelectionActive: D, userSelectionActive: U } = lt(S4, Dt), Q = es(m, { target: Ab }), te = es(C, { target: Ab }), ue = te || A, pe = te || z, ae = v && ue !== !0, G = Q || U || ae;
  return a4({ deleteKeyCode: p, multiSelectionKeyCode: _ }), y.jsx(l4, { onPaneContextMenu: u, elementsSelectable: R, zoomOnScroll: j, zoomOnPinch: N, panOnScroll: pe, panOnScrollSpeed: H, panOnScrollMode: k, zoomOnDoubleClick: V, panOnDrag: !Q && ue, defaultViewport: J, translateExtent: $, minZoom: K, maxZoom: oe, zoomActivationKeyCode: E, preventScrolling: O, noWheelClassName: T, noPanClassName: L, onViewportChange: X, isControlledViewport: ne, paneClickDistance: d, selectionOnDrag: ae, children: y.jsxs(c4, { onSelectionStart: b, onSelectionEnd: x, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: ue, autoPanOnSelection: I, isSelecting: !!G, selectionMode: g, selectionKeyPressed: Q, paneClickDistance: d, selectionOnDrag: ae, children: [e, D && y.jsx(_4, { onSelectionContextMenu: Y, noPanClassName: L, disableKeyboardA11y: Z })] }) });
}
Vw.displayName = "FlowRenderer";
const E4 = S.memo(Vw), N4 = (e) => (a) => e ? Um(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function C4(e) {
  return lt(S.useCallback(N4(e), [e]), Dt);
}
const R4 = (e) => e.updateNodeInternals;
function T4() {
  const e = lt(R4), [a] = S.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
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
  return S.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function M4({ node: e, nodeType: a, hasDimensions: r, resizeObserver: l }) {
  const s = jt(), u = S.useRef(null), c = S.useRef(null), d = S.useRef(e.sourcePosition), p = S.useRef(e.targetPosition), m = S.useRef(a), v = r && !!e.internals.handleBounds;
  return S.useEffect(() => {
    u.current && !e.hidden && (!v || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [v, e.hidden]), S.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), S.useEffect(() => {
    if (u.current) {
      const g = m.current !== a, b = d.current !== e.sourcePosition, x = p.current !== e.targetPosition;
      (g || b || x) && (m.current = a, d.current = e.sourcePosition, p.current = e.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [e.id, a, e.sourcePosition, e.targetPosition]), u;
}
function A4({ id: e, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: p, nodesConnectable: m, nodesFocusable: v, resizeObserver: g, noDragClassName: b, noPanClassName: x, disableKeyboardA11y: _, rfId: C, nodeTypes: E, nodeClickDistance: R, onError: j }) {
  const { node: N, internals: z, isParent: H } = lt((G) => {
    const ce = G.nodeLookup.get(e), Ee = G.parentLookup.has(e);
    return {
      node: ce,
      internals: ce.internals,
      isParent: Ee
    };
  }, Dt);
  let k = N.type || "default", V = E?.[k] || Mb[k];
  V === void 0 && (j?.("003", Ea.error003(k)), k = "default", V = E?.default || Mb.default);
  const A = !!(N.draggable || d && typeof N.draggable > "u"), I = !!(N.selectable || p && typeof N.selectable > "u"), J = !!(N.connectable || m && typeof N.connectable > "u"), $ = !!(N.focusable || v && typeof N.focusable > "u"), K = jt(), oe = sw(N), O = M4({ node: N, nodeType: k, hasDimensions: oe, resizeObserver: g }), Y = Hw({
    nodeRef: O,
    disabled: N.hidden || !A,
    noDragClassName: b,
    handleSelector: N.dragHandle,
    nodeId: e,
    isSelectable: I,
    nodeClickDistance: R
  }), T = Bw();
  if (N.hidden)
    return null;
  const L = gi(N), Z = x4(N), X = I || A || a || r || l || s, ne = r ? (G) => r(G, { ...z.userNode }) : void 0, D = l ? (G) => l(G, { ...z.userNode }) : void 0, U = s ? (G) => s(G, { ...z.userNode }) : void 0, Q = u ? (G) => u(G, { ...z.userNode }) : void 0, te = c ? (G) => c(G, { ...z.userNode }) : void 0, ue = (G) => {
    const { selectNodesOnDrag: ce, nodeDragThreshold: Ee } = K.getState();
    I && (!ce || !A || Ee > 0) && em({
      id: e,
      store: K,
      nodeRef: O
    }), a && a(G, { ...z.userNode });
  }, pe = (G) => {
    if (!(fw(G.nativeEvent) || _)) {
      if (Jx.includes(G.key) && I) {
        const ce = G.key === "Escape";
        em({
          id: e,
          store: K,
          unselect: ce,
          nodeRef: O
        });
      } else if (A && N.selected && Object.prototype.hasOwnProperty.call(bc, G.key)) {
        G.preventDefault();
        const { ariaLabelConfig: ce } = K.getState();
        K.setState({
          ariaLiveMessage: ce["node.a11yDescription.ariaLiveMessage"]({
            direction: G.key.replace("Arrow", "").toLowerCase(),
            x: ~~z.positionAbsolute.x,
            y: ~~z.positionAbsolute.y
          })
        }), T({
          direction: bc[G.key],
          factor: G.shiftKey ? 4 : 1
        });
      }
    }
  }, ae = () => {
    if (_ || !O.current?.matches(":focus-visible"))
      return;
    const { transform: G, width: ce, height: Ee, autoPanOnNodeFocus: we, setCenter: Se } = K.getState();
    if (!we)
      return;
    Um(/* @__PURE__ */ new Map([[e, N]]), { x: 0, y: 0, width: ce, height: Ee }, G, !0).length > 0 || Se(N.position.x + L.width / 2, N.position.y + L.height / 2, {
      zoom: G[2]
    });
  };
  return y.jsx("div", { className: Pt([
    "react-flow__node",
    `react-flow__node-${k}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: A
    },
    N.className,
    {
      selected: N.selected,
      selectable: I,
      parent: H,
      draggable: A,
      dragging: Y
    }
  ]), ref: O, style: {
    zIndex: z.z,
    transform: `translate(${z.positionAbsolute.x}px,${z.positionAbsolute.y}px)`,
    pointerEvents: X ? "all" : "none",
    visibility: oe ? "visible" : "hidden",
    ...N.style,
    ...Z
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: ne, onMouseMove: D, onMouseLeave: U, onContextMenu: Q, onClick: ue, onDoubleClick: te, onKeyDown: $ ? pe : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? ae : void 0, role: N.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": _ ? void 0 : `${Dw}-${C}`, "aria-label": N.ariaLabel, ...N.domAttributes, children: y.jsx(d4, { value: e, children: y.jsx(V, { id: e, data: N.data, type: k, positionAbsoluteX: z.positionAbsolute.x, positionAbsoluteY: z.positionAbsolute.y, selected: N.selected ?? !1, selectable: I, draggable: A, deletable: N.deletable ?? !0, isConnectable: J, sourcePosition: N.sourcePosition, targetPosition: N.targetPosition, dragging: Y, dragHandle: N.dragHandle, zIndex: z.z, parentId: N.parentId, ...L }) }) });
}
var D4 = S.memo(A4);
const j4 = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function qw(e) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(j4, Dt), c = C4(e.onlyRenderVisibleElements), d = T4();
  return y.jsx("div", { className: "react-flow__nodes", style: qc, children: c.map((p) => (
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
    y.jsx(D4, { id: p, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: d, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: e.nodeClickDistance, onError: u }, p)
  )) });
}
qw.displayName = "NodeRenderer";
const z4 = S.memo(qw);
function O4(e) {
  return lt(S.useCallback((r) => {
    if (!e)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && TA({
          sourceNode: u,
          targetNode: c,
          width: r.width,
          height: r.height,
          transform: r.transform
        }) && l.push(s.id);
      }
    return l;
  }, [e]), Dt);
}
const L4 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e }
  };
  return y.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, k4 = ({ color: e = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...e && { stroke: e, fill: e }
  };
  return y.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Db = {
  [vc.Arrow]: L4,
  [vc.ArrowClosed]: k4
};
function H4(e) {
  const a = jt();
  return S.useMemo(() => Object.prototype.hasOwnProperty.call(Db, e) ? Db[e] : (a.getState().onError?.("009", Ea.error009(e)), null), [e]);
}
const B4 = ({ id: e, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const p = H4(a);
  return p ? y.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: y.jsx(p, { color: r, strokeWidth: c }) }) : null;
}, $w = ({ defaultColor: e, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = S.useMemo(() => kA(r, {
    id: a,
    defaultColor: e,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, e]);
  return s.length ? y.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: y.jsx("defs", { children: s.map((u) => y.jsx(B4, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
$w.displayName = "MarkerDefinitions";
var U4 = S.memo($w);
function Iw({ x: e, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: p, className: m, ...v }) {
  const [g, b] = S.useState({ x: 1, y: 0, width: 0, height: 0 }), x = Pt(["react-flow__edge-textwrapper", m]), _ = S.useRef(null);
  return S.useEffect(() => {
    if (_.current) {
      const C = _.current.getBBox();
      b({
        x: C.x,
        y: C.y,
        width: C.width,
        height: C.height
      });
    }
  }, [r]), r ? y.jsxs("g", { transform: `translate(${e - g.width / 2} ${a - g.height / 2})`, className: x, visibility: g.width ? "visible" : "hidden", ...v, children: [s && y.jsx("rect", { width: g.width + 2 * c[0], x: -c[0], y: -c[1], height: g.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), y.jsx("text", { className: "react-flow__edge-text", y: g.height / 2, dy: "0.3em", ref: _, style: l, children: r }), p] }) : null;
}
Iw.displayName = "EdgeText";
const V4 = S.memo(Iw);
function $c({ path: e, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p, interactionWidth: m = 20, ...v }) {
  return y.jsxs(y.Fragment, { children: [y.jsx("path", { ...v, d: e, fill: "none", className: Pt(["react-flow__edge-path", v.className]) }), m ? y.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && _a(a) && _a(r) ? y.jsx(V4, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: p }) : null] });
}
function jb({ pos: e, x1: a, y1: r, x2: l, y2: s }) {
  return e === je.Left || e === je.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function Yw({ sourceX: e, sourceY: a, sourcePosition: r = je.Bottom, targetX: l, targetY: s, targetPosition: u = je.Top }) {
  const [c, d] = jb({
    pos: r,
    x1: e,
    y1: a,
    x2: l,
    y2: s
  }), [p, m] = jb({
    pos: u,
    x1: l,
    y1: s,
    x2: e,
    y2: a
  }), [v, g, b, x] = hw({
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
    v,
    g,
    b,
    x
  ];
}
function Gw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: p, labelStyle: m, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: C, markerStart: E, interactionWidth: R }) => {
    const [j, N, z] = Yw({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), H = e.isInternal ? void 0 : a;
    return y.jsx($c, { id: H, path: j, labelX: N, labelY: z, label: p, labelStyle: m, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: C, markerStart: E, interactionWidth: R });
  });
}
const q4 = Gw({ isInternal: !1 }), Xw = Gw({ isInternal: !0 });
q4.displayName = "SimpleBezierEdge";
Xw.displayName = "SimpleBezierEdgeInternal";
function Fw(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: g, style: b, sourcePosition: x = je.Bottom, targetPosition: _ = je.Top, markerEnd: C, markerStart: E, pathOptions: R, interactionWidth: j }) => {
    const [N, z, H] = Qh({
      sourceX: r,
      sourceY: l,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: _,
      borderRadius: R?.borderRadius,
      offset: R?.offset,
      stepPosition: R?.stepPosition
    }), k = e.isInternal ? void 0 : a;
    return y.jsx($c, { id: k, path: N, labelX: z, labelY: H, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: g, style: b, markerEnd: C, markerStart: E, interactionWidth: j });
  });
}
const Zw = Fw({ isInternal: !1 }), Pw = Fw({ isInternal: !0 });
Zw.displayName = "SmoothStepEdge";
Pw.displayName = "SmoothStepEdgeInternal";
function Qw(e) {
  return S.memo(({ id: a, ...r }) => {
    const l = e.isInternal ? void 0 : a;
    return y.jsx(Zw, { ...r, id: l, pathOptions: S.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const $4 = Qw({ isInternal: !1 }), Kw = Qw({ isInternal: !0 });
$4.displayName = "StepEdge";
Kw.displayName = "StepEdgeInternal";
function Ww(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: C }) => {
    const [E, R, j] = gw({ sourceX: r, sourceY: l, targetX: s, targetY: u }), N = e.isInternal ? void 0 : a;
    return y.jsx($c, { id: N, path: E, labelX: R, labelY: j, label: c, labelStyle: d, labelShowBg: p, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: g, style: b, markerEnd: x, markerStart: _, interactionWidth: C });
  });
}
const I4 = Ww({ isInternal: !1 }), Jw = Ww({ isInternal: !0 });
I4.displayName = "StraightEdge";
Jw.displayName = "StraightEdgeInternal";
function e_(e) {
  return S.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = je.Bottom, targetPosition: d = je.Top, label: p, labelStyle: m, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: C, markerStart: E, pathOptions: R, interactionWidth: j }) => {
    const [N, z, H] = mw({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: R?.curvature
    }), k = e.isInternal ? void 0 : a;
    return y.jsx($c, { id: k, path: N, labelX: z, labelY: H, label: p, labelStyle: m, labelShowBg: v, labelBgStyle: g, labelBgPadding: b, labelBgBorderRadius: x, style: _, markerEnd: C, markerStart: E, interactionWidth: j });
  });
}
const Y4 = e_({ isInternal: !1 }), t_ = e_({ isInternal: !0 });
Y4.displayName = "BezierEdge";
t_.displayName = "BezierEdgeInternal";
const zb = {
  default: t_,
  straight: Jw,
  step: Kw,
  smoothstep: Pw,
  simplebezier: Xw
}, Ob = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, G4 = (e, a, r) => r === je.Left ? e - a : r === je.Right ? e + a : e, X4 = (e, a, r) => r === je.Top ? e - a : r === je.Bottom ? e + a : e, Lb = "react-flow__edgeupdater";
function kb({ position: e, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return y.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Pt([Lb, `${Lb}-${d}`]), cx: G4(a, l, e), cy: X4(r, l, e), r: l, stroke: "transparent", fill: "transparent" });
}
function F4({ isReconnectable: e, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: p, onReconnect: m, onReconnectStart: v, onReconnectEnd: g, setReconnecting: b, setUpdateHover: x }) {
  const _ = jt(), C = (z, H) => {
    if (z.button !== 0)
      return;
    const { autoPanOnConnect: k, domNode: V, connectionMode: A, connectionRadius: I, lib: J, onConnectStart: $, cancelConnection: K, nodeLookup: oe, rfId: O, panBy: Y, updateConnection: T } = _.getState(), L = H.type === "target", Z = (D, U) => {
      b(!1), g?.(D, r, H.type, U);
    }, X = (D) => m?.(r, D), ne = (D, U) => {
      b(!0), v?.(z, r, H.type), $?.(D, U);
    };
    Jh.onPointerDown(z.nativeEvent, {
      autoPanOnConnect: k,
      connectionMode: A,
      connectionRadius: I,
      domNode: V,
      handleId: H.id,
      nodeId: H.nodeId,
      nodeLookup: oe,
      isTarget: L,
      edgeUpdaterType: H.type,
      lib: J,
      flowId: O,
      cancelConnection: K,
      panBy: Y,
      isValidConnection: (...D) => _.getState().isValidConnection?.(...D) ?? !0,
      onConnect: X,
      onConnectStart: ne,
      onConnectEnd: (...D) => _.getState().onConnectEnd?.(...D),
      onReconnectEnd: Z,
      updateConnection: T,
      getTransform: () => _.getState().transform,
      getFromHandle: () => _.getState().connection.fromHandle,
      dragThreshold: _.getState().connectionDragThreshold,
      handleDomNode: z.currentTarget
    });
  }, E = (z) => C(z, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), R = (z) => C(z, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), j = () => x(!0), N = () => x(!1);
  return y.jsxs(y.Fragment, { children: [(e === !0 || e === "source") && y.jsx(kb, { position: d, centerX: l, centerY: s, radius: a, onMouseDown: E, onMouseEnter: j, onMouseOut: N, type: "source" }), (e === !0 || e === "target") && y.jsx(kb, { position: p, centerX: u, centerY: c, radius: a, onMouseDown: R, onMouseEnter: j, onMouseOut: N, type: "target" })] });
}
function Z4({ id: e, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, reconnectRadius: v, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, rfId: _, edgeTypes: C, noPanClassName: E, onError: R, disableKeyboardA11y: j }) {
  let N = lt((Se) => Se.edgeLookup.get(e));
  const z = lt((Se) => Se.defaultEdgeOptions);
  N = z ? { ...z, ...N } : N;
  let H = N.type || "default", k = C?.[H] || zb[H];
  k === void 0 && (R?.("011", Ea.error011(H)), H = "default", k = C?.default || zb.default);
  const V = !!(N.focusable || a && typeof N.focusable > "u"), A = typeof g < "u" && (N.reconnectable || r && typeof N.reconnectable > "u"), I = !!(N.selectable || l && typeof N.selectable > "u"), J = S.useRef(null), [$, K] = S.useState(!1), [oe, O] = S.useState(!1), Y = jt(), { zIndex: T, sourceX: L, sourceY: Z, targetX: X, targetY: ne, sourcePosition: D, targetPosition: U } = lt(S.useCallback((Se) => {
    const xe = Se.nodeLookup.get(N.source), Te = Se.nodeLookup.get(N.target);
    if (!xe || !Te)
      return {
        zIndex: N.zIndex,
        ...Ob
      };
    const $e = LA({
      id: e,
      sourceNode: xe,
      targetNode: Te,
      sourceHandle: N.sourceHandle || null,
      targetHandle: N.targetHandle || null,
      connectionMode: Se.connectionMode,
      onError: R
    });
    return {
      zIndex: RA({
        selected: N.selected,
        zIndex: N.zIndex,
        sourceNode: xe,
        targetNode: Te,
        elevateOnSelect: Se.elevateEdgesOnSelect,
        zIndexMode: Se.zIndexMode
      }),
      ...$e || Ob
    };
  }, [N.source, N.target, N.sourceHandle, N.targetHandle, N.selected, N.zIndex]), Dt), Q = S.useMemo(() => N.markerStart ? `url('#${Kh(N.markerStart, _)}')` : void 0, [N.markerStart, _]), te = S.useMemo(() => N.markerEnd ? `url('#${Kh(N.markerEnd, _)}')` : void 0, [N.markerEnd, _]);
  if (N.hidden || L === null || Z === null || X === null || ne === null)
    return null;
  const ue = (Se) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Te, multiSelectionActive: $e } = Y.getState();
    I && (Y.setState({ nodesSelectionActive: !1 }), N.selected && $e ? (Te({ nodes: [], edges: [N] }), J.current?.blur()) : xe([e])), s && s(Se, N);
  }, pe = u ? (Se) => {
    u(Se, { ...N });
  } : void 0, ae = c ? (Se) => {
    c(Se, { ...N });
  } : void 0, G = d ? (Se) => {
    d(Se, { ...N });
  } : void 0, ce = p ? (Se) => {
    p(Se, { ...N });
  } : void 0, Ee = m ? (Se) => {
    m(Se, { ...N });
  } : void 0, we = (Se) => {
    if (!j && Jx.includes(Se.key) && I) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Te } = Y.getState();
      Se.key === "Escape" ? (J.current?.blur(), xe({ edges: [N] })) : Te([e]);
    }
  };
  return y.jsx("svg", { style: { zIndex: T }, children: y.jsxs("g", { className: Pt([
    "react-flow__edge",
    `react-flow__edge-${H}`,
    N.className,
    E,
    {
      selected: N.selected,
      animated: N.animated,
      inactive: !I && !s,
      updating: $,
      selectable: I
    }
  ]), onClick: ue, onDoubleClick: pe, onContextMenu: ae, onMouseEnter: G, onMouseMove: ce, onMouseLeave: Ee, onKeyDown: V ? we : void 0, tabIndex: V ? 0 : void 0, role: N.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": N.ariaLabel === null ? void 0 : N.ariaLabel || `Edge from ${N.source} to ${N.target}`, "aria-describedby": V ? `${jw}-${_}` : void 0, ref: J, ...N.domAttributes, children: [!oe && y.jsx(k, { id: e, source: N.source, target: N.target, type: N.type, selected: N.selected, animated: N.animated, selectable: I, deletable: N.deletable ?? !0, label: N.label, labelStyle: N.labelStyle, labelShowBg: N.labelShowBg, labelBgStyle: N.labelBgStyle, labelBgPadding: N.labelBgPadding, labelBgBorderRadius: N.labelBgBorderRadius, sourceX: L, sourceY: Z, targetX: X, targetY: ne, sourcePosition: D, targetPosition: U, data: N.data, style: N.style, sourceHandleId: N.sourceHandle, targetHandleId: N.targetHandle, markerStart: Q, markerEnd: te, pathOptions: "pathOptions" in N ? N.pathOptions : void 0, interactionWidth: N.interactionWidth }), A && y.jsx(F4, { edge: N, isReconnectable: A, reconnectRadius: v, onReconnect: g, onReconnectStart: b, onReconnectEnd: x, sourceX: L, sourceY: Z, targetX: X, targetY: ne, sourcePosition: D, targetPosition: U, setUpdateHover: K, setReconnecting: O })] }) });
}
var P4 = S.memo(Z4);
const Q4 = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function n_({ defaultMarkerColor: e, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: p, onEdgeMouseLeave: m, onEdgeClick: v, reconnectRadius: g, onEdgeDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, disableKeyboardA11y: C }) {
  const { edgesFocusable: E, edgesReconnectable: R, elementsSelectable: j, onError: N } = lt(Q4, Dt), z = O4(a);
  return y.jsxs("div", { className: "react-flow__edges", children: [y.jsx(U4, { defaultColor: e, rfId: r }), z.map((H) => y.jsx(P4, { id: H, edgesFocusable: E, edgesReconnectable: R, elementsSelectable: j, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: p, onMouseLeave: m, onClick: v, reconnectRadius: g, onDoubleClick: b, onReconnectStart: x, onReconnectEnd: _, rfId: r, onError: N, edgeTypes: l, disableKeyboardA11y: C }, H))] });
}
n_.displayName = "EdgeRenderer";
const K4 = S.memo(n_), W4 = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function J4({ children: e }) {
  const a = lt(W4);
  return y.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: e });
}
function ej(e) {
  const a = Zm(), r = S.useRef(!1);
  S.useEffect(() => {
    !r.current && a.viewportInitialized && e && (setTimeout(() => e(a), 1), r.current = !0);
  }, [e, a.viewportInitialized]);
}
const tj = (e) => e.panZoom?.syncViewport;
function nj(e) {
  const a = lt(tj), r = jt();
  return S.useEffect(() => {
    e && (a?.(e), r.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, a]), null;
}
function aj(e) {
  return e.connection.inProgress ? { ...e.connection, to: kl(e.connection.to, e.transform) } : { ...e.connection };
}
function ij(e) {
  return aj;
}
function rj(e) {
  const a = ij();
  return lt(a, Dt);
}
const lj = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function oj({ containerStyle: e, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: p } = lt(lj, Dt);
  return !(u && s && p) ? null : y.jsx("svg", { style: e, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: y.jsx("g", { className: Pt(["react-flow__connection", nw(d)]), children: y.jsx(a_, { style: a, type: r, CustomComponent: l, isValid: d }) }) });
}
const a_ = ({ style: e, type: a = Pi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: p, to: m, toNode: v, toHandle: g, toPosition: b, pointer: x } = rj();
  if (!s)
    return;
  if (r)
    return y.jsx(r, { connectionLineType: a, connectionLineStyle: e, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: p, toPosition: b, connectionStatus: nw(l), toNode: v, toHandle: g, pointer: x });
  let _ = "";
  const C = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: p,
    targetX: m.x,
    targetY: m.y,
    targetPosition: b
  };
  switch (a) {
    case Pi.Bezier:
      [_] = mw(C);
      break;
    case Pi.SimpleBezier:
      [_] = Yw(C);
      break;
    case Pi.Step:
      [_] = Qh({
        ...C,
        borderRadius: 0
      });
      break;
    case Pi.SmoothStep:
      [_] = Qh(C);
      break;
    default:
      [_] = gw(C);
  }
  return y.jsx("path", { d: _, fill: "none", className: "react-flow__connection-path", style: e });
};
a_.displayName = "ConnectionLine";
const sj = {};
function Hb(e = sj) {
  S.useRef(e), jt(), S.useEffect(() => {
  }, [e]);
}
function uj() {
  jt(), S.useRef(!1), S.useEffect(() => {
  }, []);
}
function i_({ nodeTypes: e, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: v, onSelectionContextMenu: g, onSelectionStart: b, onSelectionEnd: x, connectionLineType: _, connectionLineStyle: C, connectionLineComponent: E, connectionLineContainerStyle: R, selectionKeyCode: j, selectionOnDrag: N, selectionMode: z, multiSelectionKeyCode: H, panActivationKeyCode: k, zoomActivationKeyCode: V, deleteKeyCode: A, onlyRenderVisibleElements: I, elementsSelectable: J, defaultViewport: $, translateExtent: K, minZoom: oe, maxZoom: O, preventScrolling: Y, defaultMarkerColor: T, zoomOnScroll: L, zoomOnPinch: Z, panOnScroll: X, panOnScrollSpeed: ne, panOnScrollMode: D, zoomOnDoubleClick: U, panOnDrag: Q, autoPanOnSelection: te, onPaneClick: ue, onPaneMouseEnter: pe, onPaneMouseMove: ae, onPaneMouseLeave: G, onPaneScroll: ce, onPaneContextMenu: Ee, paneClickDistance: we, nodeClickDistance: Se, onEdgeContextMenu: xe, onEdgeMouseEnter: Te, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, onReconnect: Xe, onReconnectStart: He, onReconnectEnd: Ie, noDragClassName: _t, noWheelClassName: We, noPanClassName: Ze, disableKeyboardA11y: Pe, nodeExtent: gt, rfId: vt, viewport: Yt, onViewportChange: Lt }) {
  return Hb(e), Hb(a), uj(), ej(r), nj(Yt), y.jsx(E4, { onPaneClick: ue, onPaneMouseEnter: pe, onPaneMouseMove: ae, onPaneMouseLeave: G, onPaneContextMenu: Ee, onPaneScroll: ce, paneClickDistance: we, deleteKeyCode: A, selectionKeyCode: j, selectionOnDrag: N, selectionMode: z, onSelectionStart: b, onSelectionEnd: x, multiSelectionKeyCode: H, panActivationKeyCode: k, zoomActivationKeyCode: V, elementsSelectable: J, zoomOnScroll: L, zoomOnPinch: Z, zoomOnDoubleClick: U, panOnScroll: X, panOnScrollSpeed: ne, panOnScrollMode: D, panOnDrag: Q, autoPanOnSelection: te, defaultViewport: $, translateExtent: K, minZoom: oe, maxZoom: O, onSelectionContextMenu: g, preventScrolling: Y, noDragClassName: _t, noWheelClassName: We, noPanClassName: Ze, disableKeyboardA11y: Pe, onViewportChange: Lt, isControlledViewport: !!Yt, children: y.jsxs(J4, { children: [y.jsx(K4, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Xe, onReconnectStart: He, onReconnectEnd: Ie, onlyRenderVisibleElements: I, onEdgeContextMenu: xe, onEdgeMouseEnter: Te, onEdgeMouseMove: $e, onEdgeMouseLeave: ft, reconnectRadius: Me, defaultMarkerColor: T, noPanClassName: Ze, disableKeyboardA11y: Pe, rfId: vt }), y.jsx(oj, { style: C, type: _, component: E, containerStyle: R }), y.jsx("div", { className: "react-flow__edgelabel-renderer" }), y.jsx(z4, { nodeTypes: e, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: p, onNodeMouseLeave: m, onNodeContextMenu: v, nodeClickDistance: Se, onlyRenderVisibleElements: I, noPanClassName: Ze, noDragClassName: _t, disableKeyboardA11y: Pe, nodeExtent: gt, rfId: vt }), y.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
i_.displayName = "GraphView";
const cj = S.memo(i_), fj = ow(), Bb = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p = 0.5, maxZoom: m = 2, nodeOrigin: v, nodeExtent: g, zIndexMode: b = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), R = l ?? a ?? [], j = r ?? e ?? [], N = v ?? [0, 0], z = g ?? Qo;
  bw(C, E, R);
  const { nodesInitialized: H } = Wh(j, x, _, {
    nodeOrigin: N,
    nodeExtent: z,
    zIndexMode: b
  });
  let k = [0, 0, 1];
  if (c && s && u) {
    const V = hs(x, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: A, y: I, zoom: J } = qm(V, s, u, p, m, d?.padding ?? 0.1);
    k = [A, I, J];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: k,
    nodes: j,
    nodesInitialized: H,
    nodeLookup: x,
    parentLookup: _,
    edges: R,
    edgeLookup: E,
    connectionLookup: C,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: m,
    translateExtent: Qo,
    nodeExtent: z,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Al.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: N,
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
    connection: { ...tw },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: fj,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: ew,
    zIndexMode: b,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, dj = ({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: p, maxZoom: m, nodeOrigin: v, nodeExtent: g, zIndexMode: b }) => SD((x, _) => {
  async function C() {
    const { nodeLookup: E, panZoom: R, fitViewOptions: j, fitViewResolver: N, width: z, height: H, minZoom: k, maxZoom: V } = _();
    R && (await xA({
      nodes: E,
      width: z,
      height: H,
      panZoom: R,
      minZoom: k,
      maxZoom: V
    }, j), N?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...Bb({
      nodes: e,
      edges: a,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: d,
      minZoom: p,
      maxZoom: m,
      nodeOrigin: v,
      nodeExtent: g,
      defaultNodes: r,
      defaultEdges: l,
      zIndexMode: b
    }),
    setNodes: (E) => {
      const { nodeLookup: R, parentLookup: j, nodeOrigin: N, elevateNodesOnSelect: z, fitViewQueued: H, zIndexMode: k, nodesSelectionActive: V } = _(), { nodesInitialized: A, hasSelectedNodes: I } = Wh(E, R, j, {
        nodeOrigin: N,
        nodeExtent: g,
        elevateNodesOnSelect: z,
        checkEquality: !0,
        zIndexMode: k
      }), J = V && I;
      H && A ? (C(), x({
        nodes: E,
        nodesInitialized: A,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: J
      })) : x({ nodes: E, nodesInitialized: A, nodesSelectionActive: J });
    },
    setEdges: (E) => {
      const { connectionLookup: R, edgeLookup: j } = _();
      bw(R, j, E), x({ edges: E });
    },
    setDefaultNodesAndEdges: (E, R) => {
      if (E) {
        const { setNodes: j } = _();
        j(E), x({ hasDefaultNodes: !0 });
      }
      if (R) {
        const { setEdges: j } = _();
        j(R), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (E) => {
      const { triggerNodeChanges: R, nodeLookup: j, parentLookup: N, domNode: z, nodeOrigin: H, nodeExtent: k, debug: V, fitViewQueued: A, zIndexMode: I } = _(), { changes: J, updatedInternals: $ } = IA(E, j, N, z, H, k, I);
      $ && (UA(j, N, { nodeOrigin: H, nodeExtent: k, zIndexMode: I }), A ? (C(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), J?.length > 0 && (V && console.log("React Flow: trigger node changes", J), R?.(J)));
    },
    updateNodePositions: (E, R = !1) => {
      const j = [];
      let N = [];
      const { nodeLookup: z, triggerNodeChanges: H, connection: k, updateConnection: V, onNodesChangeMiddlewareMap: A } = _();
      for (const [I, J] of E) {
        const $ = z.get(I), K = !!($?.expandParent && $?.parentId && J?.position), oe = {
          id: I,
          type: "position",
          position: K ? {
            x: Math.max(0, J.position.x),
            y: Math.max(0, J.position.y)
          } : J.position,
          dragging: R
        };
        if ($ && k.inProgress && k.fromNode.id === $.id) {
          const O = jr($, k.fromHandle, je.Left, !0);
          V({ ...k, from: O });
        }
        K && $.parentId && j.push({
          id: I,
          parentId: $.parentId,
          rect: {
            ...J.internals.positionAbsolute,
            width: J.measured.width ?? 0,
            height: J.measured.height ?? 0
          }
        }), N.push(oe);
      }
      if (j.length > 0) {
        const { parentLookup: I, nodeOrigin: J } = _(), $ = Fm(j, z, I, J);
        N.push(...$);
      }
      for (const I of A.values())
        N = I(N);
      H(N);
    },
    triggerNodeChanges: (E) => {
      const { onNodesChange: R, setNodes: j, nodes: N, hasDefaultNodes: z, debug: H } = _();
      if (E?.length) {
        if (z) {
          const k = XD(E, N);
          j(k);
        }
        H && console.log("React Flow: trigger node changes", E), R?.(E);
      }
    },
    triggerEdgeChanges: (E) => {
      const { onEdgesChange: R, setEdges: j, edges: N, hasDefaultEdges: z, debug: H } = _();
      if (E?.length) {
        if (z) {
          const k = FD(E, N);
          j(k);
        }
        H && console.log("React Flow: trigger edge changes", E), R?.(E);
      }
    },
    addSelectedNodes: (E) => {
      const { multiSelectionActive: R, edgeLookup: j, nodeLookup: N, triggerNodeChanges: z, triggerEdgeChanges: H } = _();
      if (R) {
        const k = E.map((V) => _r(V, !0));
        z(k);
        return;
      }
      z(Sl(N, /* @__PURE__ */ new Set([...E]), !0)), H(Sl(j));
    },
    addSelectedEdges: (E) => {
      const { multiSelectionActive: R, edgeLookup: j, nodeLookup: N, triggerNodeChanges: z, triggerEdgeChanges: H } = _();
      if (R) {
        const k = E.map((V) => _r(V, !0));
        H(k);
        return;
      }
      H(Sl(j, /* @__PURE__ */ new Set([...E]))), z(Sl(N, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: E, edges: R } = {}) => {
      const { edges: j, nodes: N, nodeLookup: z, triggerNodeChanges: H, triggerEdgeChanges: k } = _(), V = E || N, A = R || j, I = [];
      for (const $ of V) {
        if (!$.selected)
          continue;
        const K = z.get($.id);
        K && (K.selected = !1), I.push(_r($.id, !1));
      }
      const J = [];
      for (const $ of A)
        $.selected && J.push(_r($.id, !1));
      H(I), k(J);
    },
    setMinZoom: (E) => {
      const { panZoom: R, maxZoom: j } = _();
      R?.setScaleExtent([E, j]), x({ minZoom: E });
    },
    setMaxZoom: (E) => {
      const { panZoom: R, minZoom: j } = _();
      R?.setScaleExtent([j, E]), x({ maxZoom: E });
    },
    setTranslateExtent: (E) => {
      _().panZoom?.setTranslateExtent(E), x({ translateExtent: E });
    },
    resetSelectedElements: () => {
      const { edges: E, nodes: R, triggerNodeChanges: j, triggerEdgeChanges: N, elementsSelectable: z } = _();
      if (!z)
        return;
      const H = R.reduce((V, A) => A.selected ? [...V, _r(A.id, !1)] : V, []), k = E.reduce((V, A) => A.selected ? [...V, _r(A.id, !1)] : V, []);
      j(H), N(k);
    },
    setNodeExtent: (E) => {
      const { nodes: R, nodeLookup: j, parentLookup: N, nodeOrigin: z, elevateNodesOnSelect: H, nodeExtent: k, zIndexMode: V } = _();
      E[0][0] === k[0][0] && E[0][1] === k[0][1] && E[1][0] === k[1][0] && E[1][1] === k[1][1] || (Wh(R, j, N, {
        nodeOrigin: z,
        nodeExtent: E,
        elevateNodesOnSelect: H,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: E }));
    },
    panBy: (E) => {
      const { transform: R, width: j, height: N, panZoom: z, translateExtent: H } = _();
      return YA({ delta: E, panZoom: z, transform: R, translateExtent: H, width: j, height: N });
    },
    setCenter: async (E, R, j) => {
      const { width: N, height: z, maxZoom: H, panZoom: k } = _();
      if (!k)
        return !1;
      const V = typeof j?.zoom < "u" ? j.zoom : H;
      return await k.setViewport({
        x: N / 2 - E * V,
        y: z / 2 - R * V,
        zoom: V
      }, { duration: j?.duration, ease: j?.ease, interpolate: j?.interpolate }), !0;
    },
    cancelConnection: () => {
      x({
        connection: { ...tw }
      });
    },
    updateConnection: (E) => {
      x({ connection: E });
    },
    reset: () => x({ ...Bb() })
  };
}, Object.is);
function r_({ initialNodes: e, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: p, fitView: m, nodeOrigin: v, nodeExtent: g, zIndexMode: b, children: x }) {
  const [_] = S.useState(() => dj({
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
    nodeOrigin: v,
    nodeExtent: g,
    zIndexMode: b
  }));
  return y.jsx(CD, { value: _, children: y.jsx(JD, { children: x }) });
}
function hj({ children: e, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: p, minZoom: m, maxZoom: v, nodeOrigin: g, nodeExtent: b, zIndexMode: x }) {
  return S.useContext(Uc) ? y.jsx(y.Fragment, { children: e }) : y.jsx(r_, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: p, initialMinZoom: m, initialMaxZoom: v, nodeOrigin: g, nodeExtent: b, zIndexMode: x, children: e });
}
const mj = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function pj({ nodes: e, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: p, onInit: m, onMove: v, onMoveStart: g, onMoveEnd: b, onConnect: x, onConnectStart: _, onConnectEnd: C, onClickConnectStart: E, onClickConnectEnd: R, onNodeMouseEnter: j, onNodeMouseMove: N, onNodeMouseLeave: z, onNodeContextMenu: H, onNodeDoubleClick: k, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: I, onNodesDelete: J, onEdgesDelete: $, onDelete: K, onSelectionChange: oe, onSelectionDragStart: O, onSelectionDrag: Y, onSelectionDragStop: T, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: X, onBeforeDelete: ne, connectionMode: D, connectionLineType: U = Pi.Bezier, connectionLineStyle: Q, connectionLineComponent: te, connectionLineContainerStyle: ue, deleteKeyCode: pe = "Backspace", selectionKeyCode: ae = "Shift", selectionOnDrag: G = !1, selectionMode: ce = Ko.Full, panActivationKeyCode: Ee = "Space", multiSelectionKeyCode: we = Jo() ? "Meta" : "Control", zoomActivationKeyCode: Se = Jo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Te, onlyRenderVisibleElements: $e = !1, selectNodesOnDrag: ft, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: He, nodesFocusable: Ie, nodeOrigin: _t = zw, edgesFocusable: We, edgesReconnectable: Ze, elementsSelectable: Pe = !0, defaultViewport: gt = UD, minZoom: vt = 0.5, maxZoom: Yt = 2, translateExtent: Lt = Qo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: Pn = "#b1b1b7", zoomOnScroll: _n = !0, zoomOnPinch: nn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: zt = 0.5, panOnScrollMode: Ut = Rr.Free, zoomOnDoubleClick: vi = !0, panOnDrag: Ta = !0, onPaneClick: Sn, onPaneMouseEnter: da, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: cn, onPaneContextMenu: ke, paneClickDistance: yt = 1, nodeClickDistance: kt = 0, children: Vt, onReconnect: gn, onReconnectStart: pt, onReconnectEnd: Wt, onEdgeContextMenu: ha, onEdgeDoubleClick: en, onEdgeMouseEnter: B, onEdgeMouseMove: P, onEdgeMouseLeave: ee, reconnectRadius: me = 10, onNodesChange: ge, onEdgesChange: Ne, noDragClassName: ye = "nodrag", noWheelClassName: _e = "nowheel", noPanClassName: be = "nopan", fitView: Ae, fitViewOptions: De, connectOnClick: Ue, attributionPosition: Oe, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Ct = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: Je = !1, autoPanOnConnect: Ot, autoPanOnNodeDrag: at, autoPanOnSelection: Ma = !0, autoPanSpeed: kn, connectionRadius: fn, isValidConnection: an, onError: En, style: yi, id: Nn, nodeDragThreshold: bi, connectionDragThreshold: ma, viewport: pa, onViewportChange: Be, width: bt, height: vn, colorMode: Hn = "light", debug: xi, onScroll: Ga, ariaLabelConfig: dt, zIndexMode: Kn = "basic", ...rn }, tr) {
  const kr = Nn || "1", Hl = ID(Hn), wi = S.useCallback((Bl) => {
    Bl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ga?.(Bl);
  }, [Ga]);
  return y.jsx("div", { "data-testid": "rf__wrapper", ...rn, onScroll: wi, style: { ...yi, ...mj }, ref: tr, className: Pt(["react-flow", s, Hl]), id: Nn, role: "application", children: y.jsxs(hj, { nodes: e, edges: a, width: bt, height: vn, fitView: Ae, fitViewOptions: De, minZoom: vt, maxZoom: Yt, nodeOrigin: _t, nodeExtent: ot, zIndexMode: Kn, children: [y.jsx($D, { nodes: e, edges: a, defaultNodes: r, defaultEdges: l, onConnect: x, onConnectStart: _, onConnectEnd: C, onClickConnectStart: E, onClickConnectEnd: R, nodesDraggable: Me, autoPanOnNodeFocus: Xe, nodesConnectable: He, nodesFocusable: Ie, edgesFocusable: We, edgesReconnectable: Ze, elementsSelectable: Pe, elevateNodesOnSelect: Ct, elevateEdgesOnSelect: st, minZoom: vt, maxZoom: Yt, nodeExtent: ot, onNodesChange: ge, onEdgesChange: Ne, snapToGrid: xe, snapGrid: Te, connectionMode: D, translateExtent: Lt, connectOnClick: Ue, defaultEdgeOptions: rt, fitView: Ae, fitViewOptions: De, onNodesDelete: J, onEdgesDelete: $, onDelete: K, onNodeDragStart: V, onNodeDrag: A, onNodeDragStop: I, onSelectionDrag: Y, onSelectionDragStart: O, onSelectionDragStop: T, onMove: v, onMoveStart: g, onMoveEnd: b, noPanClassName: be, nodeOrigin: _t, rfId: kr, autoPanOnConnect: Ot, autoPanOnNodeDrag: at, autoPanSpeed: kn, onError: En, connectionRadius: fn, isValidConnection: an, selectNodesOnDrag: ft, nodeDragThreshold: bi, connectionDragThreshold: ma, onBeforeDelete: ne, debug: xi, ariaLabelConfig: dt, zIndexMode: Kn }), y.jsx(cj, { onInit: m, onNodeClick: d, onEdgeClick: p, onNodeMouseEnter: j, onNodeMouseMove: N, onNodeMouseLeave: z, onNodeContextMenu: H, onNodeDoubleClick: k, nodeTypes: u, edgeTypes: c, connectionLineType: U, connectionLineStyle: Q, connectionLineComponent: te, connectionLineContainerStyle: ue, selectionKeyCode: ae, selectionOnDrag: G, selectionMode: ce, deleteKeyCode: pe, multiSelectionKeyCode: we, panActivationKeyCode: Ee, zoomActivationKeyCode: Se, onlyRenderVisibleElements: $e, defaultViewport: gt, translateExtent: Lt, minZoom: vt, maxZoom: Yt, preventScrolling: mt, zoomOnScroll: _n, zoomOnPinch: nn, zoomOnDoubleClick: vi, panOnScroll: Kt, panOnScrollSpeed: zt, panOnScrollMode: Ut, panOnDrag: Ta, autoPanOnSelection: Ma, onPaneClick: Sn, onPaneMouseEnter: da, onPaneMouseMove: Ln, onPaneMouseLeave: Qn, onPaneScroll: cn, onPaneContextMenu: ke, paneClickDistance: yt, nodeClickDistance: kt, onSelectionContextMenu: L, onSelectionStart: Z, onSelectionEnd: X, onReconnect: gn, onReconnectStart: pt, onReconnectEnd: Wt, onEdgeContextMenu: ha, onEdgeDoubleClick: en, onEdgeMouseEnter: B, onEdgeMouseMove: P, onEdgeMouseLeave: ee, reconnectRadius: me, defaultMarkerColor: Pn, noDragClassName: ye, noWheelClassName: _e, noPanClassName: be, rfId: kr, disableKeyboardA11y: Je, nodeExtent: ot, viewport: pa, onViewportChange: Be }), y.jsx(BD, { onSelectionChange: oe }), Vt, y.jsx(zD, { proOptions: Ge, position: Oe }), y.jsx(jD, { rfId: kr, disableKeyboardA11y: Je })] }) });
}
var gj = Lw(pj);
function vj({ dimensions: e, lineWidth: a, variant: r, className: l }) {
  return y.jsx("path", { strokeWidth: a, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Pt(["react-flow__background-pattern", r, l]) });
}
function yj({ radius: e, className: a }) {
  return y.jsx("circle", { cx: e, cy: e, r: e, className: Pt(["react-flow__background-pattern", "dots", a]) });
}
var $a;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})($a || ($a = {}));
const bj = {
  [$a.Dots]: 1,
  [$a.Lines]: 1,
  [$a.Cross]: 6
}, xj = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function l_({
  id: e,
  variant: a = $a.Dots,
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
  patternClassName: v
}) {
  const g = S.useRef(null), { transform: b, patternId: x } = lt(xj, Dt), _ = l || bj[a], C = a === $a.Dots, E = a === $a.Cross, R = Array.isArray(r) ? r : [r, r], j = [R[0] * b[2] || 1, R[1] * b[2] || 1], N = _ * b[2], z = Array.isArray(u) ? u : [u, u], H = E ? [N, N] : j, k = [
    z[0] * b[2] || 1 + H[0] / 2,
    z[1] * b[2] || 1 + H[1] / 2
  ], V = `${x}${e || ""}`;
  return y.jsxs("svg", { className: Pt(["react-flow__background", m]), style: {
    ...p,
    ...qc,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: g, "data-testid": "rf__background", children: [y.jsx("pattern", { id: V, x: b[0] % j[0], y: b[1] % j[1], width: j[0], height: j[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${k[0]},-${k[1]})`, children: C ? y.jsx(yj, { radius: N / 2, className: v }) : y.jsx(vj, { dimensions: H, lineWidth: s, variant: a, className: v }) }), y.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
l_.displayName = "Background";
const Ub = S.memo(l_);
function wj() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: y.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function _j() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: y.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function Sj() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: y.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function Ej() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: y.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function Nj() {
  return y.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: y.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Hu({ children: e, className: a, ...r }) {
  return y.jsx("button", { type: "button", className: Pt(["react-flow__controls-button", a]), ...r, children: e });
}
const Cj = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function o_({ style: e, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: p, className: m, children: v, position: g = "bottom-left", orientation: b = "vertical", "aria-label": x }) {
  const _ = jt(), { isInteractive: C, minZoomReached: E, maxZoomReached: R, ariaLabelConfig: j } = lt(Cj, Dt), { zoomIn: N, zoomOut: z, fitView: H } = Zm(), k = () => {
    N(), u?.();
  }, V = () => {
    z(), c?.();
  }, A = () => {
    H(s), d?.();
  }, I = () => {
    _.setState({
      nodesDraggable: !C,
      nodesConnectable: !C,
      elementsSelectable: !C
    }), p?.(!C);
  }, J = b === "horizontal" ? "horizontal" : "vertical";
  return y.jsxs(Vc, { className: Pt(["react-flow__controls", J, m]), position: g, style: e, "data-testid": "rf__controls", "aria-label": x ?? j["controls.ariaLabel"], children: [a && y.jsxs(y.Fragment, { children: [y.jsx(Hu, { onClick: k, className: "react-flow__controls-zoomin", title: j["controls.zoomIn.ariaLabel"], "aria-label": j["controls.zoomIn.ariaLabel"], disabled: R, children: y.jsx(wj, {}) }), y.jsx(Hu, { onClick: V, className: "react-flow__controls-zoomout", title: j["controls.zoomOut.ariaLabel"], "aria-label": j["controls.zoomOut.ariaLabel"], disabled: E, children: y.jsx(_j, {}) })] }), r && y.jsx(Hu, { className: "react-flow__controls-fitview", onClick: A, title: j["controls.fitView.ariaLabel"], "aria-label": j["controls.fitView.ariaLabel"], children: y.jsx(Sj, {}) }), l && y.jsx(Hu, { className: "react-flow__controls-interactive", onClick: I, title: j["controls.interactive.ariaLabel"], "aria-label": j["controls.interactive.ariaLabel"], children: C ? y.jsx(Nj, {}) : y.jsx(Ej, {}) }), v] });
}
o_.displayName = "Controls";
const Rj = S.memo(o_);
function Tj({ id: e, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: d, strokeWidth: p, className: m, borderRadius: v, shapeRendering: g, selected: b, onClick: x }) {
  const { background: _, backgroundColor: C } = u || {}, E = c || _ || C;
  return y.jsx("rect", { className: Pt(["react-flow__minimap-node", { selected: b }, m]), x: a, y: r, rx: v, ry: v, width: l, height: s, style: {
    fill: E,
    stroke: d,
    strokeWidth: p
  }, shapeRendering: g, onClick: x ? (R) => x(R, e) : void 0 });
}
const Mj = S.memo(Tj), Aj = (e) => e.nodes.map((a) => a.id), xh = (e) => e instanceof Function ? e : () => e;
function Dj({
  nodeStrokeColor: e,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = Mj,
  onClick: c
}) {
  const d = lt(Aj, Dt), p = xh(a), m = xh(e), v = xh(r), g = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return y.jsx(y.Fragment, { children: d.map((b) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    y.jsx(zj, { id: b, nodeColorFunc: p, nodeStrokeColorFunc: m, nodeClassNameFunc: v, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: g }, b)
  )) });
}
function jj({ id: e, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: p }) {
  const { node: m, x: v, y: g, width: b, height: x } = lt((_) => {
    const C = _.nodeLookup.get(e);
    if (!C)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const E = C.internals.userNode, { x: R, y: j } = C.internals.positionAbsolute, { width: N, height: z } = gi(E);
    return {
      node: E,
      x: R,
      y: j,
      width: N,
      height: z
    };
  }, Dt);
  return !m || m.hidden || !sw(m) ? null : y.jsx(d, { x: v, y: g, width: b, height: x, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: p, id: m.id });
}
const zj = S.memo(jj);
var Oj = S.memo(Dj);
const Lj = 200, kj = 150, Hj = (e) => !e.hidden, Bj = (e) => {
  const a = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: e.nodeLookup.size > 0 ? lw(hs(e.nodeLookup, { filter: Hj }), a) : a,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, Uj = "react-flow__minimap-desc";
function s_({
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
  maskStrokeColor: v,
  maskStrokeWidth: g,
  position: b = "bottom-right",
  onClick: x,
  onNodeClick: _,
  pannable: C = !1,
  zoomable: E = !1,
  ariaLabel: R,
  inversePan: j,
  zoomStep: N = 1,
  offsetScale: z = 5
}) {
  const H = jt(), k = S.useRef(null), { boundingRect: V, viewBB: A, rfId: I, panZoom: J, translateExtent: $, flowWidth: K, flowHeight: oe, ariaLabelConfig: O } = lt(Bj, Dt), Y = e?.width ?? Lj, T = e?.height ?? kj, L = V.width / Y, Z = V.height / T, X = Math.max(L, Z), ne = X * Y, D = X * T, U = z * X, Q = V.x - (ne - V.width) / 2 - U, te = V.y - (D - V.height) / 2 - U, ue = ne + U * 2, pe = D + U * 2, ae = `${Uj}-${I}`, G = S.useRef(0), ce = S.useRef();
  G.current = X, S.useEffect(() => {
    if (k.current && J)
      return ce.current = JA({
        domNode: k.current,
        panZoom: J,
        getTransform: () => H.getState().transform,
        getViewScale: () => G.current
      }), () => {
        ce.current?.destroy();
      };
  }, [J]), S.useEffect(() => {
    ce.current?.update({
      translateExtent: $,
      width: K,
      height: oe,
      inversePan: j,
      pannable: C,
      zoomStep: N,
      zoomable: E
    });
  }, [C, E, j, N, $, K, oe]);
  const Ee = x ? (xe) => {
    const [Te, $e] = ce.current?.pointer(xe) || [0, 0];
    x(xe, { x: Te, y: $e });
  } : void 0, we = _ ? S.useCallback((xe, Te) => {
    const $e = H.getState().nodeLookup.get(Te).internals.userNode;
    _(xe, $e);
  }, []) : void 0, Se = R ?? O["minimap.ariaLabel"];
  return y.jsx(Vc, { position: b, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof v == "string" ? v : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof g == "number" ? g * X : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Pt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: y.jsxs("svg", { width: Y, height: T, viewBox: `${Q} ${te} ${ue} ${pe}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ae, ref: k, onClick: Ee, children: [Se && y.jsx("title", { id: ae, children: Se }), y.jsx(Oj, { onClick: we, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), y.jsx("path", { className: "react-flow__minimap-mask", d: `M${Q - U},${te - U}h${ue + U * 2}v${pe + U * 2}h${-ue - U * 2}z
        M${A.x},${A.y}h${A.width}v${A.height}h${-A.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
s_.displayName = "MiniMap";
const Vj = S.memo(s_), qj = (e) => (a) => e ? `${Math.max(1 / a.transform[2], 1)}` : void 0, $j = {
  [Ol.Line]: "right",
  [Ol.Handle]: "bottom-right"
};
function Ij({ nodeId: e, position: a, variant: r = Ol.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: p = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: v = Number.MAX_VALUE, keepAspectRatio: g = !1, resizeDirection: b, autoScale: x = !0, shouldResize: _, onResizeStart: C, onResize: E, onResizeEnd: R }) {
  const j = Uw(), N = typeof e == "string" ? e : j, z = jt(), H = S.useRef(null), k = r === Ol.Handle, V = lt(S.useCallback(qj(k && x), [k, x]), Dt), A = S.useRef(null), I = a ?? $j[r];
  S.useEffect(() => {
    if (!(!H.current || !N))
      return A.current || (A.current = dD({
        domNode: H.current,
        nodeId: N,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: oe, snapToGrid: O, nodeOrigin: Y, domNode: T } = z.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: oe,
            snapToGrid: O,
            nodeOrigin: Y,
            paneDomNode: T
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: oe, nodeLookup: O, parentLookup: Y, nodeOrigin: T } = z.getState(), L = [], Z = { x: $.x, y: $.y }, X = O.get(N);
          if (X && X.expandParent && X.parentId) {
            const ne = X.origin ?? T, D = $.width ?? X.measured.width ?? 0, U = $.height ?? X.measured.height ?? 0, Q = {
              id: X.id,
              parentId: X.parentId,
              rect: {
                width: D,
                height: U,
                ...uw({
                  x: $.x ?? X.position.x,
                  y: $.y ?? X.position.y
                }, { width: D, height: U }, X.parentId, O, ne)
              }
            }, te = Fm([Q], O, Y, T);
            L.push(...te), Z.x = $.x ? Math.max(ne[0] * D, $.x) : void 0, Z.y = $.y ? Math.max(ne[1] * U, $.y) : void 0;
          }
          if (Z.x !== void 0 && Z.y !== void 0) {
            const ne = {
              id: N,
              type: "position",
              position: { ...Z }
            };
            L.push(ne);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const D = {
              id: N,
              type: "dimensions",
              resizing: !0,
              setAttributes: b ? b === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            L.push(D);
          }
          for (const ne of K) {
            const D = {
              ...ne,
              type: "position"
            };
            L.push(D);
          }
          oe(L);
        },
        onEnd: ({ width: $, height: K }) => {
          const oe = {
            id: N,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: $,
              height: K
            }
          };
          z.getState().triggerNodeChanges([oe]);
        }
      })), A.current.update({
        controlPosition: I,
        boundaries: {
          minWidth: d,
          minHeight: p,
          maxWidth: m,
          maxHeight: v
        },
        keepAspectRatio: g,
        resizeDirection: b,
        onResizeStart: C,
        onResize: E,
        onResizeEnd: R,
        shouldResize: _
      }), () => {
        A.current?.destroy();
      };
  }, [
    I,
    d,
    p,
    m,
    v,
    g,
    C,
    E,
    R,
    _
  ]);
  const J = I.split("-");
  return y.jsx("div", { className: Pt(["react-flow__resize-control", "nodrag", ...J, r, l]), ref: H, style: {
    ...s,
    scale: V,
    ...c && { [k ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
S.memo(Ij);
var Yj = "_1bllf8b0", Gj = "_1bllf8b1";
const Vb = 16, Xj = "rgba(186, 158, 255, 0.14)", Fj = "rgba(186, 158, 255, 0.06)", Zj = "rgba(0, 0, 0, 0.6)", Pj = "#1d2023", Qj = "#ba9eff";
function Kj({
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
  const v = [Yj, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsx("div", { className: v, "aria-label": d ?? "node graph", children: /* @__PURE__ */ y.jsxs(
    gj,
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
      onNodeClick: (g, b) => m?.(b),
      children: [
        /* @__PURE__ */ y.jsx(
          Ub,
          {
            id: "minor",
            variant: $a.Dots,
            gap: Vb,
            size: 1.1,
            color: Xj
          }
        ),
        /* @__PURE__ */ y.jsx(
          Ub,
          {
            id: "major",
            variant: $a.Lines,
            gap: Vb * 5,
            lineWidth: 1,
            color: Fj
          }
        ),
        s && /* @__PURE__ */ y.jsx(Rj, { showInteractive: !1 }),
        l && /* @__PURE__ */ y.jsx(
          Vj,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: Zj,
            nodeColor: () => Pj,
            nodeStrokeColor: () => Qj,
            className: Gj
          }
        ),
        p
      ]
    }
  ) });
}
function Wj(e) {
  return /* @__PURE__ */ y.jsx(r_, { children: /* @__PURE__ */ y.jsx(Kj, { ...e }) });
}
var Jj = "a9gtw0", e3 = "a9gtw1", t3 = "a9gtw2", n3 = "a9gtw3", a3 = "a9gtw4", i3 = "a9gtw5", r3 = "a9gtw6", l3 = "a9gtw7";
const o3 = {
  default: "",
  raised: e3,
  inset: t3
};
function Ha({
  title: e,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [Jj, o3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("section", { className: c, children: [
    (e || r) && /* @__PURE__ */ y.jsxs("header", { className: n3, children: [
      /* @__PURE__ */ y.jsxs("div", { className: a3, children: [
        e && /* @__PURE__ */ y.jsx("span", { className: r3, children: e }),
        a && /* @__PURE__ */ y.jsx("span", { className: l3, children: a })
      ] }),
      r && /* @__PURE__ */ y.jsx("div", { className: i3, children: r })
    ] }),
    l
  ] });
}
const Qm = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function Km() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function xc() {
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
    stageStates: Km()
  };
}
function qb(e, a, r = Date.now()) {
  return {
    ...xc(),
    phase: "running",
    jobId: e,
    lastFrameAt: r,
    stageStates: {
      ...Km(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function s3(e, a, r = Date.now()) {
  const l = { ...e, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return {
        ...l,
        overallFraction: d3(a.params.fraction),
        stage: a.params.stage ?? l.stage,
        stageDetail: a.params.detail ?? l.stageDetail
      };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: g3(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps,
        secondsPerStep: m3(
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
        stageStates: u_(l.stageStates)
      };
    default:
      return l;
  }
}
function u3(e) {
  return { ...e, phase: "cancelled", stageStates: Km() };
}
const c3 = -32108;
function f3(e) {
  return {
    ...e,
    phase: "error",
    stalled: !1,
    errorCode: c3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: u_(e.stageStates)
  };
}
function $b(e) {
  return e.phase !== "running" || e.stalled ? e : { ...e, stalled: !0 };
}
function Bu(e) {
  const a = xc();
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
function d3(e) {
  return Number.isNaN(e) ? 0 : Math.min(1, Math.max(0, e));
}
const h3 = 0.3;
function m3(e, a) {
  return a === void 0 || !Number.isFinite(a) || a <= 0 ? e : e === null ? a : e + h3 * (a - e);
}
function p3(e) {
  if (e.secondsPerStep === null || e.totalSteps <= 0 || e.numClips <= 0)
    return null;
  const a = Math.max(0, e.totalSteps - e.step), r = Math.max(0, e.numClips - e.clipIndex - 1);
  return (a + r * e.totalSteps) * e.secondsPerStep;
}
function g3(e, a) {
  return e.stageStates[a] === "active" ? "done" : e.stageStates[a];
}
function u_(e) {
  const a = { ...e };
  for (const r of Qm)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const c_ = [
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
], Ic = [
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
    help: "High→low expert switch. Wan2.2 i2v = 0.9. Rarely changed."
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
function v3(e) {
  return Ic.filter((a) => a.tier === e);
}
function y3() {
  const e = {};
  for (const a of Ic)
    a.default !== void 0 && (e[a.key] = a.default);
  return e;
}
function Ib(e) {
  return {
    ...y3(),
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
    torch_compile_mode: "default"
  };
}
function Yb(e, a) {
  return {
    ...e,
    ...a.params,
    ref_image_path: e.ref_image_path,
    last_image_path: e.last_image_path ?? null,
    prompts: e.prompts
  };
}
const f_ = 1, b3 = "nexus.video.svi2-pro.recipe", x3 = ["ref_image_path", "last_image_path"];
function d_(e) {
  return `${b3}.${e}`;
}
function h_() {
  try {
    return typeof window < "u" ? window.localStorage : null;
  } catch {
    return null;
  }
}
function w3(e) {
  if (!e) return null;
  const a = h_();
  if (!a) return null;
  try {
    const r = a.getItem(d_(e));
    if (!r) return null;
    const l = JSON.parse(r);
    return l.v !== f_ || typeof l.params != "object" || l.params === null ? null : l.params;
  } catch {
    return null;
  }
}
function _3(e, a) {
  if (!e) return;
  const r = h_();
  if (r)
    try {
      const l = { ...a };
      for (const u of x3) delete l[u];
      const s = {
        v: f_,
        params: l
      };
      r.setItem(d_(e), JSON.stringify(s));
    } catch {
    }
}
const m_ = [10, 20, 30, 60, 120], S3 = "custom", xl = 85, wh = { framesPerClip: xl, fps: 16, overlap: 5 };
function zr(e) {
  return {
    framesPerClip: e.frames_per_clip ?? wh.framesPerClip,
    fps: e.fps ?? wh.fps,
    overlap: e.num_overlap_frame ?? wh.overlap
  };
}
function p_(e, a) {
  const { framesPerClip: r, overlap: l } = a;
  return r + (e - 1) * (r - l);
}
function tm(e, a) {
  return a.fps <= 0 ? 0 : p_(e, a) / a.fps;
}
function E3(e, a) {
  const { framesPerClip: r, fps: l, overlap: s } = a, u = r - s;
  if (u <= 0 || l <= 0) return 1;
  const c = e * l;
  return Math.max(1, Math.ceil((c - r) / u) + 1);
}
function N3(e, a) {
  const { fps: r, overlap: l } = a;
  if (r <= 0) return { numClips: 1, framesPerClip: xl };
  const s = Math.round(e * r);
  if (s <= Wm)
    return { numClips: 1, framesPerClip: Jm(s) };
  const u = xl - l;
  return u <= 0 ? { numClips: 1, framesPerClip: xl } : { numClips: Math.max(2, Math.round((s - xl) / u) + 1), framesPerClip: xl };
}
const C3 = 5, Wm = 129, R3 = [2, 3, 4, 5, 6, 8];
function Jm(e) {
  const a = Math.round((e - 1) / 4) * 4 + 1;
  return Math.min(Wm, Math.max(C3, a));
}
function Gb(e, a) {
  return Jm(e * a);
}
function T3(e) {
  return e <= 0 ? 0 : Math.floor(Wm / e);
}
function g_(e) {
  const { framesPerClip: a, fps: r } = zr(e);
  return r <= 0 ? 0 : a / r;
}
function M3(e) {
  const { framesPerClip: a, fps: r } = zr(e), l = `1 × ${a} frames @ ${r} fps → ${g_(e).toFixed(1)}s morph`, s = e.interpolate_fps ?? 0;
  return s > 0 ? `${l} (RIFE → ${s} fps)` : l;
}
function A3(e, a) {
  for (const r of m_)
    if (E3(r, a) === e) return r;
  return S3;
}
function D3(e) {
  const a = zr(e), r = e.num_clips ?? 1, l = tm(r, a), s = `${r} × ${a.framesPerClip} frames @ ${a.fps} fps → ${l.toFixed(1)}s native`, u = e.interpolate_fps ?? 0;
  return u > 0 ? `${s} (RIFE → ${u} fps)` : s;
}
const ts = "svi-canonical", j3 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), z3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), O3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function L3(e) {
  const a = e.frames_per_clip, r = e.num_clips, l = e.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function k3(e) {
  const a = e.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = L3(a), c = a.fps;
  let d = "—";
  u !== null && c && c > 0 && (d = `${(u / c).toFixed(1)}s`);
  const p = j3.has(e.id), m = a.blocks_to_swap ?? 0, v = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: d,
    vram: v,
    isLowVram: p,
    isOffDistribution: z3.has(e.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : O3.has(e.id)
  };
}
function H3(e) {
  return [...e].sort((a, r) => a.id === ts ? -1 : r.id === ts ? 1 : 0);
}
function B3(e) {
  const a = e.filter((r) => !r.hidden);
  return {
    featured: H3(a.filter((r) => !r.legacy)),
    legacy: a.filter((r) => r.legacy === !0)
  };
}
async function U3(e = 25) {
  return er(`/render/jobs?limit=${e}`);
}
async function _h(e) {
  return er(`/render/jobs/${e}`);
}
async function V3(e) {
  return er("/render/start", {
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function q3(e) {
  return er(`/render/jobs/${e}/cancel`, { method: "POST", body: "{}" });
}
function $3(e, a, r) {
  return DC(`/render/jobs/${e}/events`, a, r);
}
const I3 = 9e4, Xb = 24e4, Y3 = 5e3, ep = "nexus.video.svi2-pro.active-render";
function G3(e) {
  try {
    sessionStorage.setItem(ep, JSON.stringify({ jobId: e }));
  } catch {
  }
}
function Uu() {
  try {
    sessionStorage.removeItem(ep);
  } catch {
  }
}
function X3() {
  try {
    const e = sessionStorage.getItem(ep);
    if (!e) return null;
    const a = JSON.parse(e);
    return typeof a.jobId == "string" ? a.jobId : null;
  } catch {
    return null;
  }
}
const v_ = S.createContext(null);
function F3({
  initialSettings: e = wx,
  initialPreset: a = null,
  deploymentId: r,
  children: l
}) {
  const [s, u] = S.useState(e), [c, d] = S.useState(
    a?.id ?? ts
  ), [p, m] = S.useState(a !== null), [v, g] = S.useState(() => {
    const ae = Ib(e), G = a ? Yb(ae, a) : ae, ce = w3(r);
    return ce ? { ...G, ...ce } : G;
  }), [b, x] = S.useState(null), [_, C] = S.useState(null), [E, R] = S.useState({
    enabled: !1,
    prompt: ""
  }), [j, N] = S.useState(xc), z = S.useRef(null), H = S.useRef(null), k = S.useRef(j);
  k.current = j;
  const V = S.useRef(!1), A = S.useRef(0), I = S.useRef(null), J = S.useCallback(() => {
    H.current !== null && (clearInterval(H.current), H.current = null);
  }, []), $ = S.useCallback(() => {
    J(), H.current = setInterval(() => {
      const ae = k.current;
      if (ae.phase !== "running" || ae.lastFrameAt === null || V.current) return;
      const G = Date.now() - ae.lastFrameAt, ce = Date.now() - A.current;
      if (G >= Xb && ce >= Xb) {
        ae.jobId && I.current?.(ae.jobId);
        return;
      }
      G >= I3 && N((Ee) => $b(Ee));
    }, Y3);
  }, [J]), K = S.useCallback(
    (ae) => {
      z.current?.(), z.current = $3(
        ae,
        (G) => {
          N((ce) => s3(ce, G));
        },
        () => {
          V.current || N((G) => $b(G));
        }
      ), $();
    },
    [$]
  ), oe = S.useCallback(
    (ae) => {
      if (V.current) return;
      const G = ae;
      V.current = !0, A.current = Date.now(), K(ae), N(
        (we) => we.phase === "running" ? { ...we, lastFrameAt: Date.now() } : we
      );
      const ce = () => k.current.jobId === G && k.current.phase === "running", Ee = (we) => {
        ce() && (z.current?.(), z.current = null, J(), N(we));
      };
      _h(ae).then((we) => {
        (we.status === "succeeded" || we.status === "failed" || we.status === "cancelled") && Ee(Bu(we));
      }).catch(() => {
        Ee(f3(k.current));
      }).finally(() => {
        V.current = !1;
      });
    },
    [K, J]
  );
  I.current = oe;
  const O = S.useCallback(
    (ae) => {
      const G = ae.params.requires_last_image === !0;
      d(ae.id), m(!0), g((ce) => {
        const Ee = {
          ...Ib(s),
          mode: ce.mode ?? "image_to_video",
          ref_image_path: ce.ref_image_path,
          prompts: ce.prompts,
          last_image_path: G ? ce.last_image_path ?? null : null
        };
        return Yb(Ee, ae);
      }), G || C(null);
    },
    [s]
  ), Y = S.useCallback((ae) => {
    g((G) => {
      if (ae === "text_to_video") return { ...G, mode: ae };
      const { seed: ce, ...Ee } = G;
      return { ...Ee, mode: ae };
    });
  }, []), T = S.useCallback(
    (ae, G) => {
      g((ce) => ({ ...ce, [ae]: G }));
    },
    []
  ), L = S.useCallback((ae) => {
    g((G) => ({ ...G, prompts: ae }));
  }, []), Z = S.useCallback((ae, G) => {
    x(ae), g((ce) => ({ ...ce, ref_image_path: G }));
  }, []), X = S.useCallback((ae, G) => {
    C(ae), g((ce) => G === null || G.length === 0 ? { ...ce, last_image_path: G } : {
      ...ce,
      last_image_path: G,
      num_clips: 1,
      frames_per_clip: Jm(ce.frames_per_clip ?? 81)
    });
  }, []), ne = S.useCallback((ae) => {
    R((G) => ({ ...G, ...ae }));
  }, []), D = S.useCallback((ae) => {
    u(ae);
  }, []), U = S.useCallback(() => {
    z.current?.(), z.current = null, J(), Uu(), N(xc());
  }, [J]), Q = S.useCallback(async () => {
    z.current?.(), A.current = 0, console.info("[svi2] render → params", {
      base_model: {
        dit_high_path: v.dit_high_path ?? "(bundled)",
        dit_low_path: v.dit_low_path ?? "(bundled)",
        svi_lora_tier: v.svi_lora_tier ?? "high"
      },
      quality: {
        num_inference_steps: v.num_inference_steps,
        cfg_scale: v.cfg_scale,
        sigma_shift: v.sigma_shift,
        switch_boundary: v.switch_boundary,
        solver: v.solver,
        seed: v.seed,
        seed_multiplier: v.seed_multiplier
      },
      basics: {
        width: v.width,
        height: v.height,
        num_clips: v.num_clips,
        frames_per_clip: v.frames_per_clip,
        fps: v.fps,
        interpolate_fps: v.interpolate_fps,
        interpolate_method: v.interpolate_method,
        upscale_factor: v.upscale_factor,
        upscale_model: v.upscale_model,
        upscale_quality: v.upscale_quality
      },
      compile: {
        use_torch_compile: v.use_torch_compile,
        torch_compile_mode: v.torch_compile_mode,
        blocks_to_swap: v.blocks_to_swap
      },
      user_loras: v.user_loras ?? [],
      presetId: c
    });
    const { jobId: ae } = await V3({ presetId: c, params: v });
    N(qb(ae, E.enabled)), G3(ae), K(ae);
  }, [v, c, E.enabled, K]), te = S.useCallback(async () => {
    const ae = k.current.jobId ?? j.jobId;
    if (!ae) return;
    const { status: G } = await q3(ae);
    G !== "cancelling" && (z.current?.(), z.current = null, J(), Uu(), N((ce) => u3(ce)));
  }, [j.jobId, J]), ue = S.useCallback(
    async (ae) => {
      z.current?.(), z.current = null, J();
      try {
        const G = await _h(ae.id);
        N(Bu(G));
      } catch {
        N(Bu(ae));
      }
    },
    [J]
  );
  S.useEffect(() => {
    _3(r, v);
  }, [r, v]), S.useEffect(() => {
    (j.phase === "done" || j.phase === "error" || j.phase === "cancelled") && Uu();
  }, [j.phase]), S.useEffect(() => {
    const ae = () => {
      const Ee = k.current;
      Ee.phase !== "running" || !Ee.jobId || (K(Ee.jobId), N(
        (we) => we.phase === "running" ? { ...we, stalled: !1, lastFrameAt: Date.now() } : we
      ));
    }, G = () => {
      document.visibilityState === "visible" && ae();
    }, ce = () => ae();
    return document.addEventListener("visibilitychange", G), window.addEventListener("focus", ce), () => {
      document.removeEventListener("visibilitychange", G), window.removeEventListener("focus", ce);
    };
  }, [K]), S.useEffect(() => {
    const ae = X3();
    if (!ae) return;
    let G = !1;
    return _h(ae).then((ce) => {
      if (!G) {
        if (ce.status === "succeeded" || ce.status === "failed" || ce.status === "cancelled") {
          Uu(), N(Bu(ce));
          return;
        }
        N(qb(ae, !1)), K(ae);
      }
    }).catch(() => {
    }), () => {
      G = !0;
    };
  }, [K]), S.useEffect(() => () => {
    z.current?.(), z.current = null, J();
  }, [J]);
  const pe = S.useMemo(
    () => ({
      settings: s,
      presetId: c,
      presetApplied: p,
      params: v,
      refImageName: b,
      lastImageName: _,
      qwenEdit: E,
      render: j,
      applyPresetById: O,
      setMode: Y,
      updateParam: T,
      setPrompts: L,
      setRefImage: Z,
      setLastImage: X,
      setQwenEdit: ne,
      setSettings: D,
      startRenderJob: Q,
      cancelRenderJob: te,
      resetRender: U,
      showJobResult: ue
    }),
    [
      s,
      c,
      p,
      v,
      b,
      _,
      E,
      j,
      O,
      Y,
      T,
      L,
      Z,
      X,
      ne,
      D,
      Q,
      te,
      U,
      ue
    ]
  );
  return /* @__PURE__ */ y.jsx(v_.Provider, { value: pe, children: l });
}
function Qt() {
  const e = S.useContext(v_);
  if (!e)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return e;
}
function Z3(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
const P3 = (e) => {
  switch (e) {
    case "success":
      return W3;
    case "info":
      return e5;
    case "warning":
      return J3;
    case "error":
      return t5;
    default:
      return null;
  }
}, Q3 = Array(12).fill(0), K3 = ({ visible: e, className: a }) => /* @__PURE__ */ ve.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": e
}, /* @__PURE__ */ ve.createElement("div", {
  className: "sonner-spinner"
}, Q3.map((r, l) => /* @__PURE__ */ ve.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), W3 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), J3 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), e5 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), t5 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ve.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), n5 = /* @__PURE__ */ ve.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ ve.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ ve.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), a5 = () => {
  const [e, a] = ve.useState(document.hidden);
  return ve.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), e;
};
let nm = 1;
class i5 {
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
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : nm++, c = this.toasts.find((p) => p.id === u), d = a.dismissible === void 0 ? !0 : a.dismissible;
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
        ], ve.isValidElement(m))
          u = !1, this.create({
            id: l,
            type: "default",
            message: m
          });
        else if (l5(m) && !m.ok) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${m.status}`) : r.error, b = typeof r.description == "function" ? await r.description(`HTTP error! status: ${m.status}`) : r.description, _ = typeof g == "object" && !ve.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ..._
          });
        } else if (m instanceof Error) {
          u = !1;
          const g = typeof r.error == "function" ? await r.error(m) : r.error, b = typeof r.description == "function" ? await r.description(m) : r.description, _ = typeof g == "object" && !ve.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "error",
            description: b,
            ..._
          });
        } else if (r.success !== void 0) {
          u = !1;
          const g = typeof r.success == "function" ? await r.success(m) : r.success, b = typeof r.description == "function" ? await r.description(m) : r.description, _ = typeof g == "object" && !ve.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: l,
            type: "success",
            description: b,
            ..._
          });
        }
      }).catch(async (m) => {
        if (c = [
          "reject",
          m
        ], r.error !== void 0) {
          u = !1;
          const v = typeof r.error == "function" ? await r.error(m) : r.error, g = typeof r.description == "function" ? await r.description(m) : r.description, x = typeof v == "object" && !ve.isValidElement(v) ? v : {
            message: v
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
      }), p = () => new Promise((m, v) => d.then(() => c[0] === "reject" ? v(c[1]) : m(c[1])).catch(v));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: p
      } : Object.assign(l, {
        unwrap: p
      });
    }, this.custom = (a, r) => {
      const l = r?.id || nm++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const jn = new i5(), r5 = (e, a) => {
  const r = a?.id || nm++;
  return jn.addToast({
    title: e,
    ...a,
    id: r
  }), r;
}, l5 = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", o5 = r5, s5 = () => jn.toasts, u5 = () => jn.getActiveToasts(), Nr = Object.assign(o5, {
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
  getHistory: s5,
  getToasts: u5
});
Z3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Vu(e) {
  return e.label !== void 0;
}
const c5 = 3, f5 = "24px", d5 = "16px", Fb = 4e3, h5 = 356, m5 = 14, p5 = 45, g5 = 200;
function La(...e) {
  return e.filter(Boolean).join(" ");
}
function v5(e) {
  const [a, r] = e.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const y5 = (e) => {
  var a, r, l, s, u, c, d, p, m;
  const { invert: v, toast: g, unstyled: b, interacting: x, setHeights: _, visibleToasts: C, heights: E, index: R, toasts: j, expanded: N, removeToast: z, defaultRichColors: H, closeButton: k, style: V, cancelButtonStyle: A, actionButtonStyle: I, className: J = "", descriptionClassName: $ = "", duration: K, position: oe, gap: O, expandByDefault: Y, classNames: T, icons: L, closeButtonAriaLabel: Z = "Close toast" } = e, [X, ne] = ve.useState(null), [D, U] = ve.useState(null), [Q, te] = ve.useState(!1), [ue, pe] = ve.useState(!1), [ae, G] = ve.useState(!1), [ce, Ee] = ve.useState(!1), [we, Se] = ve.useState(!1), [xe, Te] = ve.useState(0), [$e, ft] = ve.useState(0), Me = ve.useRef(g.duration || K || Fb), Xe = ve.useRef(null), He = ve.useRef(null), Ie = R === 0, _t = R + 1 <= C, We = g.type, Ze = g.dismissible !== !1, Pe = g.className || "", gt = g.descriptionClassName || "", vt = ve.useMemo(() => E.findIndex((ke) => ke.toastId === g.id) || 0, [
    E,
    g.id
  ]), Yt = ve.useMemo(() => {
    var ke;
    return (ke = g.closeButton) != null ? ke : k;
  }, [
    g.closeButton,
    k
  ]), Lt = ve.useMemo(() => g.duration || K || Fb, [
    g.duration,
    K
  ]), mt = ve.useRef(0), ot = ve.useRef(0), Pn = ve.useRef(0), _n = ve.useRef(null), [nn, Kt] = oe.split("-"), zt = ve.useMemo(() => E.reduce((ke, yt, kt) => kt >= vt ? ke : ke + yt.height, 0), [
    E,
    vt
  ]), Ut = a5(), vi = g.invert || v, Ta = We === "loading";
  ot.current = ve.useMemo(() => vt * O + zt, [
    vt,
    zt
  ]), ve.useEffect(() => {
    Me.current = Lt;
  }, [
    Lt
  ]), ve.useEffect(() => {
    te(!0);
  }, []), ve.useEffect(() => {
    const ke = He.current;
    if (ke) {
      const yt = ke.getBoundingClientRect().height;
      return ft(yt), _((kt) => [
        {
          toastId: g.id,
          height: yt,
          position: g.position
        },
        ...kt
      ]), () => _((kt) => kt.filter((Vt) => Vt.toastId !== g.id));
    }
  }, [
    _,
    g.id
  ]), ve.useLayoutEffect(() => {
    if (!Q) return;
    const ke = He.current, yt = ke.style.height;
    ke.style.height = "auto";
    const kt = ke.getBoundingClientRect().height;
    ke.style.height = yt, ft(kt), _((Vt) => Vt.find((pt) => pt.toastId === g.id) ? Vt.map((pt) => pt.toastId === g.id ? {
      ...pt,
      height: kt
    } : pt) : [
      {
        toastId: g.id,
        height: kt,
        position: g.position
      },
      ...Vt
    ]);
  }, [
    Q,
    g.title,
    g.description,
    _,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const Sn = ve.useCallback(() => {
    pe(!0), Te(ot.current), _((ke) => ke.filter((yt) => yt.toastId !== g.id)), setTimeout(() => {
      z(g);
    }, g5);
  }, [
    g,
    z,
    _,
    ot
  ]);
  ve.useEffect(() => {
    if (g.promise && We === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let ke;
    return N || x || Ut ? (() => {
      if (Pn.current < mt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - mt.current;
        Me.current = Me.current - Vt;
      }
      Pn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Me.current !== 1 / 0 && (mt.current = (/* @__PURE__ */ new Date()).getTime(), ke = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), Sn();
      }, Me.current));
    })(), () => clearTimeout(ke);
  }, [
    N,
    x,
    g,
    We,
    Ut,
    Sn
  ]), ve.useEffect(() => {
    g.delete && (Sn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    Sn,
    g.delete
  ]);
  function da() {
    var ke;
    if (L?.loading) {
      var yt;
      return /* @__PURE__ */ ve.createElement("div", {
        className: La(T?.loader, g == null || (yt = g.classNames) == null ? void 0 : yt.loader, "sonner-loader"),
        "data-visible": We === "loading"
      }, L.loading);
    }
    return /* @__PURE__ */ ve.createElement(K3, {
      className: La(T?.loader, g == null || (ke = g.classNames) == null ? void 0 : ke.loader),
      visible: We === "loading"
    });
  }
  const Ln = g.icon || L?.[We] || P3(We);
  var Qn, cn;
  return /* @__PURE__ */ ve.createElement("li", {
    tabIndex: 0,
    ref: He,
    className: La(J, Pe, T?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, T?.default, T?.[We], g == null || (r = g.classNames) == null ? void 0 : r[We]),
    "data-sonner-toast": "",
    "data-rich-colors": (Qn = g.richColors) != null ? Qn : H,
    "data-styled": !(g.jsx || g.unstyled || b),
    "data-mounted": Q,
    "data-promise": !!g.promise,
    "data-swiped": we,
    "data-removed": ue,
    "data-visible": _t,
    "data-y-position": nn,
    "data-x-position": Kt,
    "data-index": R,
    "data-front": Ie,
    "data-swiping": ae,
    "data-dismissible": Ze,
    "data-type": We,
    "data-invert": vi,
    "data-swipe-out": ce,
    "data-swipe-direction": D,
    "data-expanded": !!(N || Y && Q),
    "data-testid": g.testId,
    style: {
      "--index": R,
      "--toasts-before": R,
      "--z-index": j.length - R,
      "--offset": `${ue ? xe : ot.current}px`,
      "--initial-height": Y ? "auto" : `${$e}px`,
      ...V,
      ...g.style
    },
    onDragEnd: () => {
      G(!1), ne(null), _n.current = null;
    },
    onPointerDown: (ke) => {
      ke.button !== 2 && (Ta || !Ze || (Xe.current = /* @__PURE__ */ new Date(), Te(ot.current), ke.target.setPointerCapture(ke.pointerId), ke.target.tagName !== "BUTTON" && (G(!0), _n.current = {
        x: ke.clientX,
        y: ke.clientY
      })));
    },
    onPointerUp: () => {
      var ke, yt, kt;
      if (ce || !Ze) return;
      _n.current = null;
      const Vt = Number(((ke = He.current) == null ? void 0 : ke.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), gn = Number(((yt = He.current) == null ? void 0 : yt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((kt = Xe.current) == null ? void 0 : kt.getTime()), Wt = X === "x" ? Vt : gn, ha = Math.abs(Wt) / pt;
      if (Math.abs(Wt) >= p5 || ha > 0.11) {
        Te(ot.current), g.onDismiss == null || g.onDismiss.call(g, g), U(X === "x" ? Vt > 0 ? "right" : "left" : gn > 0 ? "down" : "up"), Sn(), Ee(!0);
        return;
      } else {
        var en, B;
        (en = He.current) == null || en.style.setProperty("--swipe-amount-x", "0px"), (B = He.current) == null || B.style.setProperty("--swipe-amount-y", "0px");
      }
      Se(!1), G(!1), ne(null);
    },
    onPointerMove: (ke) => {
      var yt, kt, Vt;
      if (!_n.current || !Ze || ((yt = window.getSelection()) == null ? void 0 : yt.toString().length) > 0) return;
      const pt = ke.clientY - _n.current.y, Wt = ke.clientX - _n.current.x;
      var ha;
      const en = (ha = e.swipeDirections) != null ? ha : v5(oe);
      !X && (Math.abs(Wt) > 1 || Math.abs(pt) > 1) && ne(Math.abs(Wt) > Math.abs(pt) ? "x" : "y");
      let B = {
        x: 0,
        y: 0
      };
      const P = (ee) => 1 / (1.5 + Math.abs(ee) / 20);
      if (X === "y") {
        if (en.includes("top") || en.includes("bottom"))
          if (en.includes("top") && pt < 0 || en.includes("bottom") && pt > 0)
            B.y = pt;
          else {
            const ee = pt * P(pt);
            B.y = Math.abs(ee) < Math.abs(pt) ? ee : pt;
          }
      } else if (X === "x" && (en.includes("left") || en.includes("right")))
        if (en.includes("left") && Wt < 0 || en.includes("right") && Wt > 0)
          B.x = Wt;
        else {
          const ee = Wt * P(Wt);
          B.x = Math.abs(ee) < Math.abs(Wt) ? ee : Wt;
        }
      (Math.abs(B.x) > 0 || Math.abs(B.y) > 0) && Se(!0), (kt = He.current) == null || kt.style.setProperty("--swipe-amount-x", `${B.x}px`), (Vt = He.current) == null || Vt.style.setProperty("--swipe-amount-y", `${B.y}px`);
    }
  }, Yt && !g.jsx && We !== "loading" ? /* @__PURE__ */ ve.createElement("button", {
    "aria-label": Z,
    "data-disabled": Ta,
    "data-close-button": !0,
    onClick: Ta || !Ze ? () => {
    } : () => {
      Sn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: La(T?.closeButton, g == null || (l = g.classNames) == null ? void 0 : l.closeButton)
  }, (cn = L?.close) != null ? cn : n5) : null, (We || g.icon || g.promise) && g.icon !== null && (L?.[We] !== null || g.icon) ? /* @__PURE__ */ ve.createElement("div", {
    "data-icon": "",
    className: La(T?.icon, g == null || (s = g.classNames) == null ? void 0 : s.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || da() : null, g.type !== "loading" ? Ln : null) : null, /* @__PURE__ */ ve.createElement("div", {
    "data-content": "",
    className: La(T?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ve.createElement("div", {
    "data-title": "",
    className: La(T?.title, g == null || (c = g.classNames) == null ? void 0 : c.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ ve.createElement("div", {
    "data-description": "",
    className: La($, gt, T?.description, g == null || (d = g.classNames) == null ? void 0 : d.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ ve.isValidElement(g.cancel) ? g.cancel : g.cancel && Vu(g.cancel) ? /* @__PURE__ */ ve.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (ke) => {
      Vu(g.cancel) && Ze && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, ke), Sn());
    },
    className: La(T?.cancelButton, g == null || (p = g.classNames) == null ? void 0 : p.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ ve.isValidElement(g.action) ? g.action : g.action && Vu(g.action) ? /* @__PURE__ */ ve.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || I,
    onClick: (ke) => {
      Vu(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, ke), !ke.defaultPrevented && Sn());
    },
    className: La(T?.actionButton, g == null || (m = g.classNames) == null ? void 0 : m.actionButton)
  }, g.action.label) : null);
};
function Zb() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function b5(e, a) {
  const r = {};
  return [
    e,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", d = u ? d5 : f5;
    function p(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((v) => {
        r[`${c}-${v}`] = typeof m == "number" ? `${m}px` : m;
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
const x5 = /* @__PURE__ */ ve.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: d, closeButton: p, className: m, offset: v, mobileOffset: g, theme: b = "light", richColors: x, duration: _, style: C, visibleToasts: E = c5, toastOptions: R, dir: j = Zb(), gap: N = m5, icons: z, containerAriaLabel: H = "Notifications" } = a, [k, V] = ve.useState([]), A = ve.useMemo(() => l ? k.filter((Q) => Q.toasterId === l) : k.filter((Q) => !Q.toasterId), [
    k,
    l
  ]), I = ve.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((Q) => Q.position).map((Q) => Q.position)))), [
    A,
    u
  ]), [J, $] = ve.useState([]), [K, oe] = ve.useState(!1), [O, Y] = ve.useState(!1), [T, L] = ve.useState(b !== "system" ? b : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), Z = ve.useRef(null), X = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ne = ve.useRef(null), D = ve.useRef(!1), U = ve.useCallback((Q) => {
    V((te) => {
      var ue;
      return (ue = te.find((pe) => pe.id === Q.id)) != null && ue.delete || jn.dismiss(Q.id), te.filter(({ id: pe }) => pe !== Q.id);
    });
  }, []);
  return ve.useEffect(() => jn.subscribe((Q) => {
    if (Q.dismiss) {
      requestAnimationFrame(() => {
        V((te) => te.map((ue) => ue.id === Q.id ? {
          ...ue,
          delete: !0
        } : ue));
      });
      return;
    }
    setTimeout(() => {
      ND.flushSync(() => {
        V((te) => {
          const ue = te.findIndex((pe) => pe.id === Q.id);
          return ue !== -1 ? [
            ...te.slice(0, ue),
            {
              ...te[ue],
              ...Q
            },
            ...te.slice(ue + 1)
          ] : [
            Q,
            ...te
          ];
        });
      });
    });
  }), [
    k
  ]), ve.useEffect(() => {
    if (b !== "system") {
      L(b);
      return;
    }
    if (b === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? L("dark") : L("light")), typeof window > "u") return;
    const Q = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Q.addEventListener("change", ({ matches: te }) => {
        L(te ? "dark" : "light");
      });
    } catch {
      Q.addListener(({ matches: ue }) => {
        try {
          L(ue ? "dark" : "light");
        } catch (pe) {
          console.error(pe);
        }
      });
    }
  }, [
    b
  ]), ve.useEffect(() => {
    k.length <= 1 && oe(!1);
  }, [
    k
  ]), ve.useEffect(() => {
    const Q = (te) => {
      var ue;
      if (c.every((G) => te[G] || te.code === G)) {
        var ae;
        oe(!0), (ae = Z.current) == null || ae.focus();
      }
      te.code === "Escape" && (document.activeElement === Z.current || (ue = Z.current) != null && ue.contains(document.activeElement)) && oe(!1);
    };
    return document.addEventListener("keydown", Q), () => document.removeEventListener("keydown", Q);
  }, [
    c
  ]), ve.useEffect(() => {
    if (Z.current)
      return () => {
        ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null, D.current = !1);
      };
  }, [
    Z.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ve.createElement("section", {
    ref: r,
    "aria-label": `${H} ${X}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((Q, te) => {
    var ue;
    const [pe, ae] = Q.split("-");
    return A.length ? /* @__PURE__ */ ve.createElement("ol", {
      key: Q,
      dir: j === "auto" ? Zb() : j,
      tabIndex: -1,
      ref: Z,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": T,
      "data-y-position": pe,
      "data-x-position": ae,
      style: {
        "--front-toast-height": `${((ue = J[0]) == null ? void 0 : ue.height) || 0}px`,
        "--width": `${h5}px`,
        "--gap": `${N}px`,
        ...C,
        ...b5(v, g)
      },
      onBlur: (G) => {
        D.current && !G.currentTarget.contains(G.relatedTarget) && (D.current = !1, ne.current && (ne.current.focus({
          preventScroll: !0
        }), ne.current = null));
      },
      onFocus: (G) => {
        G.target instanceof HTMLElement && G.target.dataset.dismissible === "false" || D.current || (D.current = !0, ne.current = G.relatedTarget);
      },
      onMouseEnter: () => oe(!0),
      onMouseMove: () => oe(!0),
      onMouseLeave: () => {
        O || oe(!1);
      },
      onDragEnd: () => oe(!1),
      onPointerDown: (G) => {
        G.target instanceof HTMLElement && G.target.dataset.dismissible === "false" || Y(!0);
      },
      onPointerUp: () => Y(!1)
    }, A.filter((G) => !G.position && te === 0 || G.position === Q).map((G, ce) => {
      var Ee, we;
      return /* @__PURE__ */ ve.createElement(y5, {
        key: G.id,
        icons: z,
        index: ce,
        toast: G,
        defaultRichColors: x,
        duration: (Ee = R?.duration) != null ? Ee : _,
        className: R?.className,
        descriptionClassName: R?.descriptionClassName,
        invert: s,
        visibleToasts: E,
        closeButton: (we = R?.closeButton) != null ? we : p,
        interacting: O,
        position: Q,
        style: R?.style,
        unstyled: R?.unstyled,
        classNames: R?.classNames,
        cancelButtonStyle: R?.cancelButtonStyle,
        actionButtonStyle: R?.actionButtonStyle,
        closeButtonAriaLabel: R?.closeButtonAriaLabel,
        removeToast: U,
        toasts: A.filter((Se) => Se.position == G.position),
        heights: J.filter((Se) => Se.position == G.position),
        setHeights: $,
        expandByDefault: d,
        gap: N,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), am = "svi2-pro:trigger-render", im = "svi2-pro:render-state";
function w5() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(am));
}
function _5(e) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(im, { detail: e }));
}
function S5(e) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(am, e), () => window.removeEventListener(am, e));
}
function E5(e) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && e(l);
  };
  return window.addEventListener(im, a), () => window.removeEventListener(im, a);
}
const N5 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), C5 = 832 * 480, R5 = 0.85;
function tp(e, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : e !== null && N5.has(e);
}
function Yc(e, a) {
  return tp(e, a) ? !0 : typeof a.last_image_path == "string" && a.last_image_path.length > 0;
}
function Pb(e, a) {
  return Number.isFinite(e) && e % a === 0;
}
function T5(e, a) {
  const r = [];
  (e.mode ?? "image_to_video") !== "text_to_video" && (!a.hasRefImage || !e.ref_image_path) && r.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (e.prompts ?? []).some((b) => b.trim().length > 0) || r.push({
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
  Pb(d, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${d}).`,
    severity: "error"
  }), Pb(p, 16) || r.push({
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
  const v = e.cfg_scale ?? 5;
  (v < 1 || v > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const g = e.num_clips;
  return g !== void 0 && g < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), tp(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Yc(a.presetId, e) && g !== void 0 && g > 1 && r.push({
    field: "num_clips",
    message: `FLF2V (last-image morph) requires exactly 1 clip (got ${g}). The end keyframe pins the clip's final frame — chaining has no free tail to continue from.`,
    severity: "error"
  }), Number.isFinite(d) && Number.isFinite(p) && d * p < C5 * R5 && r.push({
    field: "width",
    message: `${d}×${p} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function M5(e) {
  return e.some((a) => a.severity === "error");
}
function y_() {
  const {
    params: e,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Qt(), d = S.useMemo(
    () => T5(e, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: e
    }),
    [e, a, r, l]
  ), p = M5(d), m = s.phase === "running", [v, g] = S.useState(null), b = S.useCallback(async () => {
    if (p) {
      const _ = d.find((C) => C.severity === "error");
      _ && g({ field: _.field, token: Date.now() }), Nr.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), Nr.success("Render started.");
    } catch (_) {
      const C = _ instanceof Mc ? _.message : "Could not start the render.";
      Nr.error(C);
    }
  }, [p, d, u]), x = S.useCallback(async () => {
    try {
      await c();
    } catch {
      Nr.error("Could not cancel the render.");
    }
  }, [c]);
  return S.useEffect(() => S5(() => void b()), [b]), S.useEffect(() => {
    _5({ busy: m, blocked: p });
  }, [m, p]), { issues: d, blocked: p, busy: m, submit: b, cancel: x, focusRequest: v };
}
const A5 = 220, D5 = 80;
function j5(e) {
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
function z5(e, a) {
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
function O5(e) {
  const a = Qm.filter(
    (s) => s !== "qwen_edit" || e.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: j5(s),
      subtitle: z5(s, e),
      state: e.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * A5, y: D5 },
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
var L5 = "dk8hba0", k5 = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, H5 = "dk8hba5", B5 = "dk8hba6", U5 = "dk8hba7", V5 = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, q5 = "dk8hbac";
function $5({ data: e }) {
  const a = e, r = [L5, k5[a.state]].join(" "), l = [q5, V5[a.state]].join(" ");
  return /* @__PURE__ */ y.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ y.jsx(Ll, { type: "target", position: je.Left }),
    /* @__PURE__ */ y.jsxs("div", { className: H5, children: [
      /* @__PURE__ */ y.jsx("span", { className: B5, children: a.title }),
      /* @__PURE__ */ y.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ y.jsx("span", { className: U5, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ y.jsx(Ll, { type: "source", position: je.Right })
  ] });
}
const I5 = { pipeline: $5 };
var Y5 = "_1g4g8kk0", G5 = "_1g4g8kk1", X5 = "_1g4g8kk2", F5 = "_1g4g8kk3", Z5 = "_1g4g8kk4", P5 = "_1g4g8kk5";
const Q5 = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, K5 = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function W5() {
  const { render: e, params: a, qwenEdit: r } = Qt(), { busy: l, blocked: s, submit: u, cancel: c } = y_(), d = S.useMemo(
    () => O5({ render: e, params: a, qwenEditEnabled: r.enabled }),
    [e, a, r.enabled]
  ), p = Qm.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ y.jsxs("div", { className: Y5, children: [
    /* @__PURE__ */ y.jsx("div", { className: G5, children: /* @__PURE__ */ y.jsx(
      Wj,
      {
        nodes: d.nodes,
        edges: d.edges,
        nodeTypes: I5,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ y.jsx("div", { className: X5, children: /* @__PURE__ */ y.jsxs(
      Ha,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ y.jsx("div", { className: F5, children: p.map((m) => /* @__PURE__ */ y.jsxs("div", { className: Z5, children: [
            /* @__PURE__ */ y.jsx("span", { children: K5[m] }),
            /* @__PURE__ */ y.jsx(Xn, { tone: Q5[e.stageStates[m]], children: e.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ y.jsx("div", { className: P5, children: l ? /* @__PURE__ */ y.jsx(Va, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ y.jsx(Va, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var Qb = Tw();
const b_ = 0, x_ = 1, w_ = 2, Kb = 3;
var Wb = Object.prototype.hasOwnProperty;
function rm(e, a) {
  var r, l;
  if (e === a) return !0;
  if (e && a && (r = e.constructor) === a.constructor) {
    if (r === Date) return e.getTime() === a.getTime();
    if (r === RegExp) return e.toString() === a.toString();
    if (r === Array) {
      if ((l = e.length) === a.length)
        for (; l-- && rm(e[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof e == "object") {
      l = 0;
      for (r in e)
        if (Wb.call(e, r) && ++l && !Wb.call(a, r) || !(r in a) || !rm(e[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return e !== e && a !== a;
}
const fi = /* @__PURE__ */ new WeakMap(), hi = () => {
}, mn = (
  /*#__NOINLINE__*/
  hi()
), lm = Object, nt = (e) => e === mn, Ua = (e) => typeof e == "function", Ji = (e, a) => ({
  ...e,
  ...a
}), __ = (e) => Ua(e.then), Sh = {}, qu = {}, np = "undefined", ps = typeof window != np, om = typeof document != np, J5 = ps && "Deno" in window, ez = () => ps && typeof window.requestAnimationFrame != np, S_ = (e, a) => {
  const r = fi.get(e);
  return [
    // Getter
    () => !nt(a) && e.get(a) || Sh,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = e.get(a);
        a in qu || (qu[a] = s), r[5](a, Ji(s, l), s || Sh);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in qu ? qu[a] : !nt(a) && e.get(a) || Sh
  ];
};
let sm = !0;
const tz = () => sm, [um, cm] = ps && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  hi,
  hi
], nz = () => {
  const e = om && document.visibilityState;
  return nt(e) || e !== "hidden";
}, az = (e) => (om && document.addEventListener("visibilitychange", e), um("focus", e), () => {
  om && document.removeEventListener("visibilitychange", e), cm("focus", e);
}), iz = (e) => {
  const a = () => {
    sm = !0, e();
  }, r = () => {
    sm = !1;
  };
  return um("online", a), um("offline", r), () => {
    cm("online", a), cm("offline", r);
  };
}, rz = {
  isOnline: tz,
  isVisible: nz
}, lz = {
  initFocus: az,
  initReconnect: iz
}, Jb = !ve.useId, Rl = !ps || J5, oz = (e) => ez() ? window.requestAnimationFrame(e) : setTimeout(e, 1), Eh = Rl ? S.useEffect : S.useLayoutEffect, Nh = typeof navigator < "u" && navigator.connection, e1 = !Rl && Nh && ([
  "slow-2g",
  "2g"
].includes(Nh.effectiveType) || Nh.saveData), $u = /* @__PURE__ */ new WeakMap(), sz = (e) => lm.prototype.toString.call(e), Ch = (e, a) => e === `[object ${a}]`;
let uz = 0;
const fm = (e) => {
  const a = typeof e, r = sz(e), l = Ch(r, "Date"), s = Ch(r, "RegExp"), u = Ch(r, "Object");
  let c, d;
  if (lm(e) === e && !l && !s) {
    if (c = $u.get(e), c) return c;
    if (c = ++uz + "~", $u.set(e, c), Array.isArray(e)) {
      for (c = "@", d = 0; d < e.length; d++)
        c += fm(e[d]) + ",";
      $u.set(e, c);
    }
    if (u) {
      c = "#";
      const p = lm.keys(e).sort();
      for (; !nt(d = p.pop()); )
        nt(e[d]) || (c += d + ":" + fm(e[d]) + ",");
      $u.set(e, c);
    }
  } else
    c = l ? e.toJSON() : a == "symbol" ? e.toString() : a == "string" ? JSON.stringify(e) : "" + e;
  return c;
}, ap = (e) => {
  if (Ua(e))
    try {
      e = e();
    } catch {
      e = "";
    }
  const a = e;
  return e = typeof e == "string" ? e : (Array.isArray(e) ? e.length : e) ? fm(e) : "", [
    e,
    a
  ];
};
let cz = 0;
const dm = () => ++cz;
async function E_(...e) {
  const [a, r, l, s] = e, u = Ji({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const d = u.rollbackOnError;
  let p = u.optimisticData;
  const m = (b) => typeof d == "function" ? d(b) : d !== !1, v = u.throwOnError;
  if (Ua(r)) {
    const b = r, x = [], _ = a.keys();
    for (const C of _)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(C) && b(a.get(C)._k) && x.push(C);
    return Promise.all(x.map(g));
  }
  return g(r);
  async function g(b) {
    const [x] = ap(b);
    if (!x) return;
    const [_, C] = S_(a, x), [E, R, j, N] = fi.get(a), z = () => {
      const O = E[x];
      return (Ua(u.revalidate) ? u.revalidate(_().data, b) : u.revalidate !== !1) && (delete j[x], delete N[x], O && O[0]) ? O[0](w_).then(() => _().data) : _().data;
    };
    if (e.length < 3)
      return z();
    let H = l, k, V = !1;
    const A = dm();
    R[x] = [
      A,
      0
    ];
    const I = !nt(p), J = _(), $ = J.data, K = J._c, oe = nt(K) ? $ : K;
    if (I && (p = Ua(p) ? p(oe, $) : p, C({
      data: p,
      _c: oe
    })), Ua(H))
      try {
        H = H(oe);
      } catch (O) {
        k = O, V = !0;
      }
    if (H && __(H))
      if (H = await H.catch((O) => {
        k = O, V = !0;
      }), A !== R[x][0]) {
        if (V) throw k;
        return H;
      } else V && I && m(k) && (c = !0, C({
        data: oe,
        _c: mn
      }));
    if (c && !V)
      if (Ua(c)) {
        const O = c(H, oe);
        C({
          data: O,
          error: mn,
          _c: mn
        });
      } else
        C({
          data: H,
          error: mn,
          _c: mn
        });
    if (R[x][1] = dm(), Promise.resolve(z()).then(() => {
      C({
        _c: mn
      });
    }), V) {
      if (v) throw k;
      return;
    }
    return H;
  }
}
const t1 = (e, a) => {
  for (const r in e)
    e[r][0] && e[r][0](a);
}, fz = (e, a) => {
  if (!fi.has(e)) {
    const r = Ji(lz, a), l = /* @__PURE__ */ Object.create(null), s = E_.bind(mn, e);
    let u = hi;
    const c = /* @__PURE__ */ Object.create(null), d = (v, g) => {
      const b = c[v] || [];
      return c[v] = b, b.push(g), () => b.splice(b.indexOf(g), 1);
    }, p = (v, g, b) => {
      e.set(v, g);
      const x = c[v];
      if (x)
        for (const _ of x)
          _(g, b);
    }, m = () => {
      if (!fi.has(e) && (fi.set(e, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        p,
        d
      ]), !Rl)) {
        const v = r.initFocus(setTimeout.bind(mn, t1.bind(mn, l, b_))), g = r.initReconnect(setTimeout.bind(mn, t1.bind(mn, l, x_)));
        u = () => {
          v && v(), g && g(), fi.delete(e);
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
    fi.get(e)[4]
  ];
}, dz = (e, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, d = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, d, s);
}, hz = rm, [N_, mz] = fz(/* @__PURE__ */ new Map()), pz = Ji(
  {
    // events
    onLoadingSlow: hi,
    onSuccess: hi,
    onError: hi,
    onErrorRetry: dz,
    onDiscarded: hi,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: e1 ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: e1 ? 5e3 : 3e3,
    // providers
    compare: hz,
    isPaused: () => !1,
    cache: N_,
    mutate: mz,
    fallback: {}
  },
  // use web preset by default
  rz
), gz = (e, a) => {
  const r = Ji(e, a);
  if (a) {
    const { use: l, fallback: s } = e, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Ji(s, c));
  }
  return r;
}, vz = S.createContext({}), yz = "$inf$", C_ = ps && window.__SWR_DEVTOOLS_USE__, bz = C_ ? window.__SWR_DEVTOOLS_USE__ : [], xz = () => {
  C_ && (window.__SWR_DEVTOOLS_REACT__ = ve);
}, wz = (e) => Ua(e[1]) ? [
  e[0],
  e[1],
  e[2] || {}
] : [
  e[0],
  null,
  (e[1] === null ? e[2] : e[1]) || {}
], _z = () => {
  const e = S.useContext(vz);
  return S.useMemo(() => Ji(pz, e), [
    e
  ]);
}, Sz = (e) => (a, r, l) => e(a, r && ((...u) => {
  const [c] = ap(a), [, , , d] = fi.get(N_);
  if (c.startsWith(yz))
    return r(...u);
  const p = d[c];
  return nt(p) ? r(...u) : (delete d[c], p);
}), l), Ez = bz.concat(Sz), Nz = (e) => function(...r) {
  const l = _z(), [s, u, c] = wz(r), d = gz(l, c);
  let p = e;
  const { use: m } = d, v = (m || []).concat(Ez);
  for (let g = v.length; g--; )
    p = v[g](p);
  return p(s, u || d.fetcher || null, d);
}, Cz = (e, a, r) => {
  const l = a[e] || (a[e] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
xz();
const Rh = ve.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), Th = {
  dedupe: !0
}, n1 = Promise.resolve(mn), Rz = () => hi, Tz = (e, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: d, revalidateIfStale: p, refreshInterval: m, refreshWhenHidden: v, refreshWhenOffline: g, keepPreviousData: b, strictServerPrefetchWarning: x } = r, [_, C, E, R] = fi.get(l), [j, N] = ap(e), z = S.useRef(!1), H = S.useRef(!1), k = S.useRef(j), V = S.useRef(a), A = S.useRef(r), I = () => A.current, J = () => I().isVisible() && I().isOnline(), [$, K, oe, O] = S_(l, j), Y = S.useRef({}).current, T = nt(c) ? nt(r.fallback) ? mn : r.fallback[j] : c, L = (Me, Xe) => {
    for (const He in Y) {
      const Ie = He;
      if (Ie === "data") {
        if (!s(Me[Ie], Xe[Ie]) && (!nt(Me[Ie]) || !s(pe, Xe[Ie])))
          return !1;
      } else if (Xe[Ie] !== Me[Ie])
        return !1;
    }
    return !0;
  }, Z = !z.current, X = S.useMemo(() => {
    const Me = $(), Xe = O(), He = (Ze) => {
      const Pe = Ji(Ze);
      return delete Pe._k, (() => {
        if (!j || !a || I().isPaused()) return !1;
        if (Z && !nt(d)) return d;
        const vt = nt(T) ? Pe.data : T;
        return nt(vt) || p;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Pe
      } : Pe;
    }, Ie = He(Me), _t = Me === Xe ? Ie : He(Xe);
    let We = Ie;
    return [
      () => {
        const Ze = He($());
        return L(Ze, We) ? (We.data = Ze.data, We.isLoading = Ze.isLoading, We.isValidating = Ze.isValidating, We.error = Ze.error, We) : (We = Ze, Ze);
      },
      () => _t
    ];
  }, [
    l,
    j
  ]), ne = Qb.useSyncExternalStore(S.useCallback(
    (Me) => oe(j, (Xe, He) => {
      L(He, Xe) || Me();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      j
    ]
  ), X[0], X[1]), D = _[j] && _[j].length > 0, U = ne.data, Q = nt(U) ? T && __(T) ? Rh(T) : T : U, te = ne.error, ue = S.useRef(Q), pe = b ? nt(U) ? nt(ue.current) ? Q : ue.current : U : Q, ae = j && nt(Q), G = S.useRef(null);
  !Rl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Qb.useSyncExternalStore(Rz, () => (G.current = !1, G), () => (G.current = !0, G));
  const ce = G.current;
  x && ce && !u && ae && console.warn(`Missing pre-initiated data for serialized key "${j}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const Ee = !j || !a || I().isPaused() || D && !nt(te) ? !1 : Z && !nt(d) ? d : u ? nt(Q) ? !1 : p : nt(Q) || p, we = Z && Ee, Se = nt(ne.isValidating) ? we : ne.isValidating, xe = nt(ne.isLoading) ? we : ne.isLoading, Te = S.useCallback(
    async (Me) => {
      const Xe = V.current;
      if (!j || !Xe || H.current || I().isPaused())
        return !1;
      let He, Ie, _t = !0;
      const We = Me || {}, Ze = !E[j] || !We.dedupe, Pe = () => Jb ? !H.current && j === k.current && z.current : j === k.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, vt = () => {
        K(gt);
      }, Yt = () => {
        const mt = E[j];
        mt && mt[1] === Ie && delete E[j];
      }, Lt = {
        isValidating: !0
      };
      nt($().data) && (Lt.isLoading = !0);
      try {
        if (Ze && (K(Lt), r.loadingTimeout && nt($().data) && setTimeout(() => {
          _t && Pe() && I().onLoadingSlow(j, r);
        }, r.loadingTimeout), E[j] = [
          Xe(N),
          dm()
        ]), [He, Ie] = E[j], He = await He, Ze && setTimeout(Yt, r.dedupingInterval), !E[j] || E[j][1] !== Ie)
          return Ze && Pe() && I().onDiscarded(j), !1;
        gt.error = mn;
        const mt = C[j];
        if (!nt(mt) && // case 1
        (Ie <= mt[0] || // case 2
        Ie <= mt[1] || // case 3
        mt[1] === 0))
          return vt(), Ze && Pe() && I().onDiscarded(j), !1;
        const ot = $().data;
        gt.data = s(ot, He) ? ot : He, Ze && Pe() && I().onSuccess(He, j, r);
      } catch (mt) {
        Yt();
        const ot = I(), { shouldRetryOnError: Pn } = ot;
        ot.isPaused() || (gt.error = mt, Ze && Pe() && (ot.onError(mt, j, ot), (Pn === !0 || Ua(Pn) && Pn(mt)) && (!I().revalidateOnFocus || !I().revalidateOnReconnect || J()) && ot.onErrorRetry(mt, j, ot, (_n) => {
          const nn = _[j];
          nn && nn[0] && nn[0](Kb, _n);
        }, {
          retryCount: (We.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return _t = !1, vt(), !0;
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
      j,
      l
    ]
  ), $e = S.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Me) => E_(l, k.current, ...Me),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Eh(() => {
    V.current = a, A.current = r, nt(U) || (ue.current = U);
  }), Eh(() => {
    if (!j) return;
    const Me = Te.bind(mn, Th);
    let Xe = 0;
    I().revalidateOnFocus && (Xe = Date.now() + I().focusThrottleInterval);
    const Ie = Cz(j, _, (_t, We = {}) => {
      if (_t == b_) {
        const Ze = Date.now();
        I().revalidateOnFocus && Ze > Xe && J() && (Xe = Ze + I().focusThrottleInterval, Me());
      } else if (_t == x_)
        I().revalidateOnReconnect && J() && Me();
      else {
        if (_t == w_)
          return Te();
        if (_t == Kb)
          return Te(We);
      }
    });
    return H.current = !1, k.current = j, z.current = !0, K({
      _k: N
    }), Ee && (E[j] || (nt(Q) || Rl ? Me() : oz(Me))), () => {
      H.current = !0, Ie();
    };
  }, [
    j
  ]), Eh(() => {
    let Me;
    function Xe() {
      const Ie = Ua(m) ? m($().data) : m;
      Ie && Me !== -1 && (Me = setTimeout(He, Ie));
    }
    function He() {
      !$().error && (v || I().isVisible()) && (g || I().isOnline()) ? Te(Th).then(Xe) : Xe();
    }
    return Xe(), () => {
      Me && (clearTimeout(Me), Me = -1);
    };
  }, [
    m,
    v,
    g,
    j
  ]), S.useDebugValue(pe), u) {
    if (!Jb && Rl && ae)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    ae && (V.current = a, A.current = r, H.current = !1);
    const Me = R[j], Xe = !nt(Me) && ae ? $e(Me) : n1;
    if (Rh(Xe), !nt(te) && ae)
      throw te;
    const He = ae ? Te(Th) : n1;
    !nt(pe) && ae && (He.status = "fulfilled", He.value = !0), Rh(He);
  }
  return {
    mutate: $e,
    get data() {
      return Y.data = !0, pe;
    },
    get error() {
      return Y.error = !0, te;
    },
    get isValidating() {
      return Y.isValidating = !0, Se;
    },
    get isLoading() {
      return Y.isLoading = !0, xe;
    }
  };
}, ns = Nz(Tz);
var Mz = "_1xasopc0", Az = "_1xasopc1", Dz = "_1xasopc2", jz = "_1xasopc3", zz = "_1xasopc4", Oz = "_1xasopc5", Lz = "_1xasopc6", kz = "_1xasopc7", Hz = "_1xasopc8";
function Bz(e, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = e.name.toLowerCase(), s = e.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function Uz(e, a, r) {
  for (const l of e) {
    if (a && !Bz(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function a1({
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
  const v = S.useRef(null), g = S.useId(), b = S.useId(), [x, _] = S.useState(!1), [C, E] = S.useState(null), [R, j] = S.useState([]), N = S.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), oe = r ? K : K.slice(0, 1), O = Uz(oe, e, a);
      if (O) {
        E(O);
        return;
      }
      E(null), j(oe), m(oe);
    },
    [e, a, r, m]
  ), z = S.useCallback(() => {
    l || v.current?.click();
  }, [l]), H = S.useCallback(
    ($) => {
      l || ($.key === "Enter" || $.key === " ") && ($.preventDefault(), z());
    },
    [l, z]
  ), k = S.useCallback(
    ($) => {
      $.preventDefault(), _(!1), !l && N($.dataTransfer.files);
    },
    [l, N]
  ), V = S.useCallback(
    ($) => {
      $.preventDefault(), l || _(!0);
    },
    [l]
  ), A = S.useCallback(($) => {
    $.preventDefault(), _(!1);
  }, []), I = [u ? b : null, C ? g : null].filter(Boolean).join(" "), J = [
    Mz,
    x ? Az : "",
    l ? Dz : "",
    C !== null ? jz : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("div", { children: [
    /* @__PURE__ */ y.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": l,
        "aria-describedby": I || void 0,
        className: J,
        onClick: z,
        onKeyDown: H,
        onDrop: k,
        onDragOver: V,
        onDragLeave: A,
        children: [
          /* @__PURE__ */ y.jsx(
            "input",
            {
              ref: v,
              type: "file",
              className: zz,
              accept: e,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => N($.target.files)
            }
          ),
          /* @__PURE__ */ y.jsx("span", { className: Oz, children: s ?? (x ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ y.jsx("span", { id: b, className: Lz, children: u }),
          p && R.length > 0 && /* @__PURE__ */ y.jsx("div", { className: Hz, children: p(R) })
        ]
      }
    ),
    C && /* @__PURE__ */ y.jsx("div", { id: g, role: "alert", className: kz, children: C })
  ] });
}
function i1(e) {
  const [a, r] = S.useState(null);
  return S.useEffect(() => {
    if (!e) {
      r(null);
      return;
    }
    const l = URL.createObjectURL(e);
    return r(l), () => URL.revokeObjectURL(l);
  }, [e]), a;
}
async function Vz(e) {
  const a = new FormData();
  a.append("file", e);
  const r = await fetch(`${Ac}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new Mc(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function r1(e) {
  const [a, r] = S.useState(null), [l, s] = S.useState(!1), [u, c] = S.useState(null), d = S.useCallback(
    async (p) => {
      if (r(p), c(null), !p) {
        e(null, null);
        return;
      }
      s(!0);
      try {
        const { path: m } = await Vz(p);
        e(p.name, m);
      } catch (m) {
        const v = m instanceof Mc ? m.message : "Upload failed. Try again.";
        c(v), e(null, null), Nr.error(v);
      } finally {
        s(!1);
      }
    },
    [e]
  );
  return { file: a, uploading: l, uploadError: u, pick: d };
}
var qz = "cyswg40", l1 = "cyswg41", o1 = "cyswg42", s1 = "cyswg43", u1 = "cyswg44", c1 = "cyswg45", Iu = "cyswg46";
const f1 = 32 * 1024 * 1024;
function $z({
  refImageRequired: e,
  lastImageRequired: a,
  refError: r,
  lastError: l
}) {
  const { setRefImage: s, setLastImage: u } = Qt(), c = S.useCallback(
    (b, x) => s(b, x ?? ""),
    [s]
  ), d = S.useCallback(
    (b, x) => u(b, x),
    [u]
  ), p = r1(c), m = r1(d), v = i1(p.file), g = i1(m.file);
  return /* @__PURE__ */ y.jsxs("div", { className: qz, children: [
    /* @__PURE__ */ y.jsxs("div", { className: l1, children: [
      /* @__PURE__ */ y.jsxs("span", { className: o1, children: [
        "Reference image",
        " ",
        e ? /* @__PURE__ */ y.jsx(Xn, { tone: "accent", children: "required" }) : /* @__PURE__ */ y.jsx(Xn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ y.jsx(
        a1,
        {
          accept: "image/*",
          maxSizeBytes: f1,
          ariaLabel: "reference image upload",
          label: p.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: e ? "Defines identity. Aspect-match to the render resolution; dims divisible by 16." : "Optional in Text-to-Video. Provide one to anchor identity, or leave empty to synthesize a seed from the prompt.",
          onFiles: (b) => void p.pick(b[0] ?? null),
          renderPreview: () => v ? /* @__PURE__ */ y.jsx("img", { className: s1, src: v, alt: "reference preview" }) : null
        }
      ),
      p.uploading && /* @__PURE__ */ y.jsx("span", { className: c1, children: "Uploading…" }),
      !p.uploading && p.file && /* @__PURE__ */ y.jsx("span", { className: u1, children: p.file.name }),
      p.uploadError && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Iu, children: p.uploadError }),
      r && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Iu, children: r })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: l1, children: [
      /* @__PURE__ */ y.jsxs("span", { className: o1, children: [
        "Last image",
        " ",
        a ? /* @__PURE__ */ y.jsx(Xn, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ y.jsx(Xn, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ y.jsx(
        a1,
        {
          accept: "image/*",
          maxSizeBytes: f1,
          ariaLabel: "last image upload",
          label: m.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over one clip — switches the render to single-clip morph (Clips locked to 1).",
          onFiles: (b) => void m.pick(b[0] ?? null),
          renderPreview: () => g ? /* @__PURE__ */ y.jsx("img", { className: s1, src: g, alt: "last preview" }) : null
        }
      ),
      m.uploading && /* @__PURE__ */ y.jsx("span", { className: c1, children: "Uploading…" }),
      !m.uploading && m.file && /* @__PURE__ */ y.jsx("span", { className: u1, children: m.file.name }),
      m.uploadError && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Iu, children: m.uploadError }),
      l && /* @__PURE__ */ y.jsx("span", { role: "alert", className: Iu, children: l })
    ] })
  ] });
}
const Iz = /* @__PURE__ */ new Set(["safetensors", "gguf"]);
function Yz(e) {
  return e.replace(/^[a-z0-9_]+:/i, "");
}
function Gz(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function Xz(e) {
  return Iz.has(e.format) && e.install_path !== null;
}
function Fz(e) {
  return e.filter((a) => Xz(a) && a.install_path).map((a) => ({
    value: a.install_path,
    label: `${Gz(a.filename)}${a.family_id ? ` (${Yz(a.family_id)})` : ""}`
  })).sort((a, r) => a.label.localeCompare(r.label));
}
const Zz = "/api/v1/model-store/installed";
async function Pz() {
  const e = await fetch(Zz, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json();
  return "installed" in a ? a : a.data && "installed" in a.data ? a.data : { family_ids: [], installed: [], truncated: !1 };
}
var Qz = "_1hbttwg0", Kz = "_1hbttwg1", Wz = "_1hbttwg2", Jz = "_1hbttwg3", R_ = "_1hbttwg4", eO = "_1hbttwg5", tO = "_1hbttwg7 _1hbttwg6", nO = "_1hbttwg8 _1hbttwg6", d1 = "_1hbttwg9", T_ = "_1hbttwga", ip = "_1hbttwgb", rp = "_1hbttwgc", lp = "_1hbttwgd", On = "_1czy96m0", wn = "_1czy96m1", Gc = "_1czy96m2", op = "_1czy96m3", sp = "_1czy96m4", M_ = "_1czy96m5", A_ = "_1czy96m6", D_ = "_1czy96m7", j_ = "_1czy96m8", up = "_1czy96m9", aO = "_1czy96ma", h1 = "_1czy96mb", m1 = "_1czy96mc", p1 = "_1czy96md", g1 = "_1czy96me", v1 = "_1czy96mf", y1 = "_1czy96mg", b1 = "_1czy96mh", iO = "_1czy96mi", rO = "_1czy96mk _1czy96mj", lO = "_1czy96ml _1czy96mj", oO = "_1czy96mm", sO = "_1czy96mn", uO = "_1czy96mo", cO = "_1czy96mp", fO = "_1czy96mq", z_ = "_1czy96mr", dO = "_1czy96ms", x1 = "_1czy96mt", hO = "_1czy96mu", mO = "_1czy96mv", pO = "_1czy96mw", gO = "_1czy96mx", vO = "_1czy96my", yO = "_1czy96mz", bO = "_1czy96m10", xO = "_1czy96m11", wO = "_1czy96m12", Mh = "_1czy96m13", Ki = "_1czy96m14", Wi = "_1czy96m15", gs = "_1czy96m16", pn = "_1czy96m17", _O = "_1czy96m18", SO = "_1czy96m19";
const Ah = "__bundled__";
function O_() {
  return /* @__PURE__ */ y.jsx("span", { className: gs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "open" }),
    /* @__PURE__ */ y.jsx(
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
function Dh({
  id: e,
  label: a,
  value: r,
  options: l,
  includeBundled: s,
  onChange: u
}) {
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: e, children: a }),
    /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsxs(
        "select",
        {
          id: e,
          className: Wi,
          value: r ?? Ah,
          onChange: (c) => u(c.target.value === Ah ? void 0 : c.target.value),
          children: [
            s && /* @__PURE__ */ y.jsx("option", { value: Ah, children: "Bundled Wan2.2 (default)" }),
            l.map((c) => /* @__PURE__ */ y.jsx("option", { value: c.value, children: c.label }, c.value))
          ]
        }
      ),
      /* @__PURE__ */ y.jsx(O_, {})
    ] })
  ] });
}
function EO() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Qt(), s = ns("svi2/installed-models", Pz), u = S.useMemo(
    () => Fz(s.data?.installed ?? []),
    [s.data]
  ), c = e.dit_high_path ?? void 0, d = e.dit_low_path ?? void 0, p = typeof c == "string" && c.length > 0 && c === d, m = p, v = s.error !== void 0, g = a.sviLoraTier ?? e.svi_lora_tier ?? "high", b = S.useCallback(
    (C, E) => {
      r("dit_high_path", C), r("dit_low_path", E);
      const R = { ...a, ditHighPath: C ?? "", ditLowPath: E ?? "" };
      l(R), uc(R).catch(() => {
      });
    },
    [a, r, l]
  ), x = S.useCallback(
    (C) => {
      if (C) {
        const E = c ?? d ?? u[0]?.value;
        E && b(E, E);
      } else
        b(c, void 0);
    },
    [c, d, u, b]
  ), _ = S.useCallback(
    (C) => {
      const E = C;
      r("svi_lora_tier", E);
      const R = { ...a, sviLoraTier: E };
      l(R), uc(R).catch(() => {
      });
    },
    [a, r, l]
  );
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: ip, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": p,
          "aria-label": "Use one model file for both experts",
          className: rp,
          onClick: () => x(!p),
          children: /* @__PURE__ */ y.jsx("span", { className: lp, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Same file for both experts (single-file model)" })
    ] }),
    p ? /* @__PURE__ */ y.jsx(
      Dh,
      {
        id: "svi2-base-model",
        label: "Base model",
        value: c,
        options: u,
        includeBundled: !1,
        onChange: (C) => b(C, C)
      }
    ) : /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
      /* @__PURE__ */ y.jsx(
        Dh,
        {
          id: "svi2-model-high",
          label: "High-noise expert (runs first)",
          value: c,
          options: u,
          includeBundled: !0,
          onChange: (C) => b(C, d)
        }
      ),
      /* @__PURE__ */ y.jsx(
        Dh,
        {
          id: "svi2-model-low",
          label: "Low-noise expert (runs second)",
          value: d,
          options: u,
          includeBundled: !0,
          onChange: (C) => b(c, C)
        }
      )
    ] }),
    v && /* @__PURE__ */ y.jsx("span", { className: pn, children: "Model Foundry list unavailable — using the bundled base model." }),
    !v && u.length === 0 && /* @__PURE__ */ y.jsx("span", { className: pn, children: "No models installed via Model Foundry yet — using the bundled base model." }),
    m && /* @__PURE__ */ y.jsxs("div", { className: On, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-svi-lora-tier", children: "SVI LoRA" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-svi-lora-tier",
            className: Wi,
            value: g,
            onChange: (C) => _(C.target.value),
            children: MC.map((C) => /* @__PURE__ */ y.jsx("option", { value: C.value, children: C.label }, C.value))
          }
        ),
        /* @__PURE__ */ y.jsx(O_, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Which SVI2 LoRA wraps this single-file model. Off for community merges (e.g. SmoothMix)." })
    ] })
  ] });
}
const NO = "/api/v1/model-store/installed";
function CO(e) {
  return e.filter(
    (a) => (a.role === "lora" || a.format === "safetensors") && a.install_path !== null && a.install_path.length > 0
  ).map((a) => ({
    artifactId: a.artifact_id,
    familyId: a.family_id,
    filename: a.filename,
    installPath: a.install_path
  }));
}
async function RO() {
  const e = await fetch(NO, {
    headers: { accept: "application/json" }
  });
  if (!e.ok)
    throw new Error(`model-store installed: HTTP ${e.status}`);
  const a = await e.json(), r = "installed" in a ? a : a.data ?? { installed: [] };
  return CO(r.installed);
}
const rc = 4, jh = 4;
function TO(e) {
  return e.weight_high ?? e.weight ?? 1;
}
function MO(e) {
  return e.weight_low ?? e.weight ?? 1;
}
function AO(e) {
  return e.length >= rc ? e : [...e, { path: "", weight_high: 1, weight_low: 1 }];
}
function DO(e, a) {
  return e.filter((r, l) => l !== a);
}
function jO(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, path: r } : l);
}
function zO(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, weight_high: r } : l);
}
function OO(e, a, r) {
  return e.map((l, s) => s === a ? { ...l, weight_low: r } : l);
}
const Yu = "__none__";
function w1({
  tier: e,
  value: a,
  onChange: r
}) {
  const l = S.useId(), u = { flex: 1, "--svi2-slider-fill": `${Math.max(0, Math.min(jh, a)) / jh * 100}%` };
  return /* @__PURE__ */ y.jsxs("div", { className: SO, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: l, style: { width: "34px" }, children: e }),
    /* @__PURE__ */ y.jsx(
      "input",
      {
        id: l,
        type: "range",
        className: T_,
        min: 0,
        max: jh,
        step: 0.05,
        value: a,
        onChange: (c) => r(parseFloat(c.target.value)),
        style: u
      }
    ),
    /* @__PURE__ */ y.jsx("span", { className: up, children: a.toFixed(2) })
  ] });
}
function LO({
  rowIndex: e,
  row: a,
  options: r,
  onPath: l,
  onWeightHigh: s,
  onWeightLow: u,
  onRemove: c
}) {
  const d = S.useId(), p = a.path.length > 0 ? a.path : Yu, m = (v) => {
    l(v === Yu ? null : v);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
      /* @__PURE__ */ y.jsxs("label", { className: wn, htmlFor: d, style: { flex: 1 }, children: [
        "LoRA ",
        e + 1
      ] }),
      /* @__PURE__ */ y.jsx(
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
    /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsxs(
        "select",
        {
          id: d,
          className: Wi,
          value: p,
          onChange: (v) => m(v.target.value),
          children: [
            /* @__PURE__ */ y.jsx("option", { value: Yu, children: "None" }),
            r.map((v) => /* @__PURE__ */ y.jsxs("option", { value: v.installPath, children: [
              v.filename,
              v.familyId ? ` (${v.familyId.replace(/^[^:]+:/, "")})` : ""
            ] }, v.artifactId))
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: gs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ y.jsx("title", { children: "open" }),
        /* @__PURE__ */ y.jsx(
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
    p !== Yu && /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
      /* @__PURE__ */ y.jsx(w1, { tier: "High", value: TO(a), onChange: s }),
      /* @__PURE__ */ y.jsx(w1, { tier: "Low", value: MO(a), onChange: u }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Per-expert weight (0 = off for that expert). Distill LoRAs like lightx2v run High>Low, e.g. 3.0 / 1.5." })
    ] })
  ] });
}
function kO() {
  const { params: e, updateParam: a } = Qt(), r = ns("svi2/installed-loras", RO, {
    shouldRetryOnError: !1
  }), l = r.data ?? [], s = e.user_loras ?? [], u = (c) => a("user_loras", c);
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    r.error && /* @__PURE__ */ y.jsx("div", { className: _O, role: "alert", children: "Failed to load installed LoRAs" }),
    /* @__PURE__ */ y.jsxs("div", { className: On, children: [
      /* @__PURE__ */ y.jsx("span", { className: wn, children: "LoRAs (applied to both experts)" }),
      s.map((c, d) => /* @__PURE__ */ y.jsx(
        LO,
        {
          rowIndex: d,
          row: c,
          options: l,
          onPath: (p) => u(jO(s, d, p ?? "")),
          onWeightHigh: (p) => u(zO(s, d, p)),
          onWeightLow: (p) => u(OO(s, d, p)),
          onRemove: () => u(DO(s, d))
        },
        d
      )),
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          onClick: () => u(AO(s)),
          disabled: s.length >= rc,
          className: pn,
          style: {
            background: "none",
            border: "none",
            cursor: s.length >= rc ? "not-allowed" : "pointer",
            padding: "4px 0",
            textAlign: "left",
            opacity: s.length >= rc ? 0.45 : 1
          },
          children: "+ Add LoRA"
        }
      )
    ] })
  ] });
}
const as = "custom", HO = [
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
function cp(e) {
  const a = new Map(e.map((l) => [l.id, l])), r = [];
  for (const l of HO) {
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
function fp(e, a) {
  const r = a.find(
    (l) => l.width === e.width && l.height === e.height
  );
  return r ? r.id : as;
}
var BO = "_14qe5430", UO = "_14qe5431", VO = "_14qe5432", qO = "_14qe5433", $O = "_14qe5434", IO = "_14qe5435", YO = "_14qe5436", GO = "_14qe5437", XO = "_14qe5438", FO = "_14qe543a _14qe5439", ZO = "_14qe543b _14qe5439", PO = "_14qe543c _14qe5439";
const QO = {
  ok: UO,
  neutral: VO,
  warn: qO
}, KO = {
  ok: IO,
  neutral: YO,
  warn: GO
}, WO = {
  ok: FO,
  neutral: ZO,
  warn: PO
};
function JO(e, a) {
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
function e6({ tone: e }) {
  return e === "ok" ? /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "in distribution" }),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M7 10l2.1 2.1L13.2 8",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }) : e === "warn" ? /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "warning" }),
    /* @__PURE__ */ y.jsx(
      "path",
      {
        d: "M10 2.6L18.6 17H1.4L10 2.6z",
        stroke: "currentColor",
        strokeWidth: "1.4",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ y.jsx("path", { d: "M10 8v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "14.4", r: "0.9", fill: "currentColor" })
  ] }) : /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "info" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ y.jsx("path", { d: "M10 9v5", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "6.2", r: "0.9", fill: "currentColor" })
  ] });
}
function t6({
  presets: e,
  warningText: a
}) {
  const { params: r } = Qt(), l = S.useMemo(() => cp(e), [e]);
  if (l.length === 0) return null;
  const s = fp(r, l), u = s === as ? null : l.find((d) => d.id === s)?.stepsDown ?? null, c = JO(u, a);
  return /* @__PURE__ */ y.jsxs(
    "output",
    {
      className: [BO, QO[c.tone]].join(" "),
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ y.jsx("span", { className: [$O, KO[c.tone]].join(" "), "aria-hidden": "true", children: /* @__PURE__ */ y.jsx(e6, { tone: c.tone }) }),
        /* @__PURE__ */ y.jsx("span", { className: XO, children: c.text }),
        /* @__PURE__ */ y.jsx("span", { className: WO[c.tone], children: c.tag })
      ]
    }
  );
}
var n6 = "_5d10lv0";
const Oo = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" }
], a6 = "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.", i6 = /* @__PURE__ */ new Set(["ArrowRight", "ArrowDown"]), r6 = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowUp"]);
function l6(e) {
  return [sp, e ? M_ : ""].filter(Boolean).join(" ");
}
function o6({ value: e, onChange: a }) {
  const r = S.useId(), l = (s) => {
    const u = i6.has(s.key), c = r6.has(s.key);
    if (!u && !c) return;
    s.preventDefault();
    const d = Oo.findIndex((v) => v.value === e), m = Oo[(d + (u ? 1 : -1) + Oo.length) % Oo.length];
    m && m.value !== e && a(m.value);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: r, children: "Mode" }),
    /* @__PURE__ */ y.jsx("div", { className: Gc, children: /* @__PURE__ */ y.jsx(
      "div",
      {
        className: op,
        role: "radiogroup",
        "aria-labelledby": r,
        onKeyDown: l,
        children: Oo.map((s) => {
          const u = e === s.value;
          return /* @__PURE__ */ y.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": u,
              tabIndex: u ? 0 : -1,
              className: l6(u),
              onClick: () => a(s.value),
              children: s.label
            },
            s.value
          );
        })
      }
    ) }),
    e === "text_to_video" && /* @__PURE__ */ y.jsx("p", { className: n6, "aria-live": "polite", children: a6 })
  ] });
}
var s6 = "dck790", u6 = "dck791", c6 = "dck792";
function wc({ title: e, detail: a, action: r, className: l }) {
  const s = [s6, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("div", { className: s, children: [
    /* @__PURE__ */ y.jsx("span", { className: u6, children: e }),
    a && /* @__PURE__ */ y.jsx("span", { className: c6, children: a }),
    r
  ] });
}
var f6 = "_1880igs0", d6 = "_1880igs1", h6 = "_1880igs2", m6 = "_1880igs3", p6 = "_1880igs4", g6 = "_1880igs5", v6 = "_1880igs6";
const y6 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function b6({ jobs: e, onOpen: a }) {
  return e.length === 0 ? /* @__PURE__ */ y.jsx(
    wc,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ y.jsx("div", { className: f6, children: e.map((r) => /* @__PURE__ */ y.jsxs("button", { type: "button", className: d6, onClick: () => a(r), children: [
    /* @__PURE__ */ y.jsxs("span", { className: h6, children: [
      /* @__PURE__ */ y.jsx("span", { className: m6, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ y.jsx("span", { className: p6, children: x6(r) })
    ] }),
    /* @__PURE__ */ y.jsxs("span", { className: g6, children: [
      /* @__PURE__ */ y.jsx("time", { className: v6, dateTime: r.createdAt, title: w6(r.createdAt), children: _6(r.createdAt) }),
      /* @__PURE__ */ y.jsx(Xn, { tone: y6[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function x6(e) {
  const a = e.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function w6(e) {
  const a = new Date(e);
  return Number.isNaN(a.getTime()) ? e : a.toLocaleString();
}
function _6(e) {
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
function S6() {
  const { presetId: e, params: a } = Qt();
  return Yc(e, a) ? /* @__PURE__ */ y.jsx(N6, {}) : /* @__PURE__ */ y.jsx(E6, {});
}
function L_(e) {
  return [sp, e ? M_ : ""].filter(Boolean).join(" ");
}
function E6() {
  const { params: e, updateParam: a } = Qt(), r = zr(e), l = A3(e.num_clips ?? 1, r), [s, u] = S.useState(
    () => Number(tm(e.num_clips ?? 1, r).toFixed(1))
  ), c = (d) => {
    const p = N3(d, r);
    a("num_clips", p.numClips), a("frames_per_clip", p.framesPerClip);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ y.jsxs("div", { className: Gc, children: [
      /* @__PURE__ */ y.jsx("div", { className: op, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: m_.map((d) => {
        const p = l === d;
        return /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": p,
            className: L_(p),
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
      /* @__PURE__ */ y.jsxs("div", { className: A_, children: [
        /* @__PURE__ */ y.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Length in seconds",
            className: D_,
            min: 1,
            max: 600,
            step: 1,
            value: s,
            onChange: (d) => {
              const p = Number(d.target.value);
              u(p), Number.isFinite(p) && p >= 1 && p <= 600 && c(p);
            },
            onBlur: () => {
              u(Number(tm(e.num_clips ?? 1, zr(e)).toFixed(1)));
            }
          }
        ),
        /* @__PURE__ */ y.jsx("span", { className: j_, children: "sec" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("output", { className: up, "aria-live": "polite", children: D3(e) })
  ] });
}
function N6() {
  const { params: e, updateParam: a } = Qt(), r = zr(e), l = T3(r.fps), [s, u] = S.useState(() => Number(g_(e).toFixed(1))), c = R3.filter((p) => p <= l), d = (p) => {
    const m = Math.min(l, Math.max(1, p));
    e.num_clips !== 1 && a("num_clips", 1), a("frames_per_clip", Gb(m, r.fps));
  };
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: "svi2-length-label", children: "Length" }),
    /* @__PURE__ */ y.jsxs("div", { className: Gc, children: [
      /* @__PURE__ */ y.jsx("div", { className: op, role: "radiogroup", "aria-labelledby": "svi2-length-label", children: c.length > 0 ? c.map((p) => {
        const m = Gb(p, r.fps) === r.framesPerClip;
        return /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": m,
            className: L_(m),
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
      }) : /* @__PURE__ */ y.jsxs("span", { className: sp, "aria-hidden": "true", children: [
        "1–",
        l,
        "s"
      ] }) }),
      /* @__PURE__ */ y.jsxs("div", { className: A_, children: [
        /* @__PURE__ */ y.jsx(
          "input",
          {
            type: "number",
            inputMode: "numeric",
            "aria-label": "Morph length in seconds",
            className: D_,
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
        /* @__PURE__ */ y.jsx("span", { className: j_, children: "sec" })
      ] }),
      /* @__PURE__ */ y.jsxs("span", { className: pn, children: [
        "1–",
        l,
        "s morph · single clip, frames = ",
        r.fps,
        " fps × seconds (4n+1)"
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("output", { className: up, "aria-live": "polite", children: M3(e) })
  ] });
}
var C6 = "_17owg2e0", R6 = "_17owg2e1", T6 = "_17owg2e2", Gu = "_17owg2e3", Xu = "_17owg2e4", M6 = "_17owg2e5", A6 = "_17owg2e6", D6 = "_17owg2e7", j6 = "_17owg2e8";
function zh() {
  return /* @__PURE__ */ y.jsx("span", { className: M6, "aria-hidden": "true" });
}
function z6({ presets: e }) {
  const { presetId: a, params: r } = Qt(), l = S.useMemo(() => cp(e), [e]), s = zr(r), u = Yc(a, r), c = u ? 1 : r.num_clips ?? 1, d = u ? s.framesPerClip : p_(c, s), p = s.fps > 0 ? d / s.fps : 0, m = r.interpolate_fps ?? 0, v = m > 0 ? m : s.fps, g = m > 0 && s.fps > 0 ? Math.round(d * (m / s.fps)) : d, b = typeof r.upscale_factor == "number" ? r.upscale_factor : 0, x = b > 0 ? b : 1, _ = (r.width ?? 0) * x, C = (r.height ?? 0) * x, E = fp(r, l), R = E === as || (l.find((N) => N.id === E)?.stepsDown ?? 0) >= 2, j = [D6, R ? j6 : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ y.jsxs("div", { className: C6, children: [
    /* @__PURE__ */ y.jsx("span", { className: R6, children: "Output" }),
    /* @__PURE__ */ y.jsxs("div", { className: T6, children: [
      /* @__PURE__ */ y.jsxs("span", { children: [
        /* @__PURE__ */ y.jsx("span", { className: Gu, children: g }),
        " ",
        /* @__PURE__ */ y.jsx("span", { className: Xu, children: "frames" })
      ] }),
      /* @__PURE__ */ y.jsx(zh, {}),
      /* @__PURE__ */ y.jsxs("span", { className: Gu, children: [
        _,
        "×",
        C
      ] }),
      /* @__PURE__ */ y.jsx(zh, {}),
      /* @__PURE__ */ y.jsxs("span", { children: [
        /* @__PURE__ */ y.jsx("span", { className: Gu, children: v }),
        " ",
        /* @__PURE__ */ y.jsx("span", { className: Xu, children: "fps" })
      ] }),
      /* @__PURE__ */ y.jsx(zh, {}),
      /* @__PURE__ */ y.jsxs("span", { children: [
        /* @__PURE__ */ y.jsx("span", { className: Xu, children: "~" }),
        /* @__PURE__ */ y.jsx("span", { className: Gu, children: p.toFixed(1) }),
        " ",
        /* @__PURE__ */ y.jsx("span", { className: Xu, children: "s" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsxs("span", { className: A6, children: [
      /* @__PURE__ */ y.jsx("span", { className: j, "aria-hidden": "true" }),
      R ? "off-distribution" : "ready"
    ] })
  ] });
}
var O6 = "dgx4n20", L6 = "dgx4n21", k6 = "dgx4n22", H6 = "dgx4n23", B6 = "dgx4n24", U6 = "dgx4n25", V6 = "dgx4n26", q6 = "dgx4n27", $6 = "dgx4n28", I6 = "dgx4n29", Y6 = "dgx4n2a", G6 = "dgx4n2b", _1 = "dgx4n2c", X6 = "dgx4n2d", F6 = "dgx4n2e";
function Z6(e) {
  const a = e.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function P6({
  presets: e,
  selectedId: a,
  onSelect: r
}) {
  const [l, s] = S.useState(!1), u = S.useMemo(() => B3(e), [e]), c = S.useMemo(() => {
    const b = u.legacy.filter((_) => _.id === a), x = l ? u.legacy : b;
    return [...u.featured, ...x];
  }, [u, l, a]), d = S.useRef([]), p = S.useCallback(
    (b) => {
      const x = c[b];
      x && (d.current[b]?.focus(), r(x));
    },
    [c, r]
  ), m = S.useCallback(
    (b, x) => {
      const _ = c.length - 1;
      switch (b.key) {
        case "ArrowRight":
        case "ArrowDown":
          b.preventDefault(), p(x === _ ? 0 : x + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          b.preventDefault(), p(x === 0 ? _ : x - 1);
          break;
        case "Home":
          b.preventDefault(), p(0);
          break;
        case "End":
          b.preventDefault(), p(_);
          break;
      }
    },
    [c, p]
  );
  if (e.length === 0)
    return /* @__PURE__ */ y.jsx(
      wc,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const v = Math.max(
    0,
    c.findIndex((b) => b.id === a)
  ), g = u.legacy.length;
  return /* @__PURE__ */ y.jsxs("div", { className: Y6, children: [
    /* @__PURE__ */ y.jsx("div", { className: O6, role: "radiogroup", "aria-label": "Render presets", children: c.map((b, x) => {
      const _ = k3(b), C = b.id === a, E = b.id === ts, R = [
        L6,
        b.legacy ? "" : k6,
        E ? H6 : "",
        C ? B6 : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ y.jsxs(
        "button",
        {
          ref: (j) => {
            d.current[x] = j;
          },
          type: "button",
          role: "radio",
          "aria-checked": C,
          tabIndex: x === v ? 0 : -1,
          title: b.description,
          className: R,
          onClick: () => r(b),
          onKeyDown: (j) => m(j, x),
          children: [
            /* @__PURE__ */ y.jsxs("div", { className: V6, children: [
              /* @__PURE__ */ y.jsx("span", { className: q6, children: b.label }),
              E && /* @__PURE__ */ y.jsx(Xn, { tone: "accent", children: "Default" }),
              /* @__PURE__ */ y.jsx("span", { className: U6, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", children: [
                /* @__PURE__ */ y.jsx("title", { children: "selected" }),
                /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
                /* @__PURE__ */ y.jsx(
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
            /* @__PURE__ */ y.jsx("span", { className: $6, children: Z6(b.description) }),
            /* @__PURE__ */ y.jsxs("div", { className: I6, children: [
              /* @__PURE__ */ y.jsx(Xn, { tone: "neutral", children: _.resolution }),
              /* @__PURE__ */ y.jsx(Xn, { tone: "neutral", children: _.duration }),
              /* @__PURE__ */ y.jsx(Xn, { tone: _.isLowVram ? "success" : "neutral", children: _.vram }),
              _.isOffDistribution && /* @__PURE__ */ y.jsx(Xn, { tone: "warning", children: "off-distribution" }),
              _.requiresLastImage && /* @__PURE__ */ y.jsx(Xn, { tone: "warning", children: "needs last image" })
            ] })
          ]
        },
        b.id
      );
    }) }),
    g > 0 && /* @__PURE__ */ y.jsxs("div", { className: G6, children: [
      /* @__PURE__ */ y.jsx("span", { className: _1, "aria-hidden": "true" }),
      /* @__PURE__ */ y.jsxs(
        "button",
        {
          type: "button",
          className: X6,
          "aria-expanded": l,
          onClick: () => s((b) => !b),
          children: [
            /* @__PURE__ */ y.jsx("span", { className: F6, "aria-hidden": "true" }),
            l ? "Hide legacy presets" : `Show legacy presets (${g})`
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: _1, "aria-hidden": "true" })
    ] })
  ] });
}
var Q6 = "_1ntn2zv0", K6 = "_1ntn2zv1", W6 = "_1ntn2zv2", J6 = "_1ntn2zv3", eL = "_1ntn2zv4", tL = "_1ntn2zv5", S1 = "_1ntn2zv6", nL = "_1ntn2zv7", aL = "_1ntn2zv8", iL = "_1ntn2zv9", rL = "_1ntn2zva";
function lL({ error: e, textareaId: a }) {
  const { params: r, setPrompts: l } = Qt(), [s, u] = S.useState(!1), c = r.prompts ?? [""], d = S.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), p = S.useMemo(
    () => c.slice(d).filter((b) => b.trim().length > 0).length,
    [c, d]
  ), m = (b) => {
    const x = c.length > 0 ? [...c] : [""];
    x[0] = b, l(x);
  }, v = (b, x) => {
    const _ = Math.max(d, c.length, b + 1), C = Array.from({ length: _ }, (E, R) => c[R] ?? "");
    C[b] = x, l(C);
  }, g = (b) => {
    if (u(b), b) {
      const x = c[0] ?? "", _ = Math.max(d, c.length);
      l(Array.from({ length: _ }, (C, E) => c[E] ?? x));
    }
  };
  return /* @__PURE__ */ y.jsxs("div", { className: Q6, children: [
    /* @__PURE__ */ y.jsx("div", { className: K6, children: /* @__PURE__ */ y.jsxs("span", { className: W6, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: J6,
          onClick: () => g(!s),
          children: /* @__PURE__ */ y.jsx("span", { className: eL, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: d }, (b, x) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ y.jsxs("div", { className: nL, children: [
        /* @__PURE__ */ y.jsxs("span", { className: aL, children: [
          "Clip ",
          x + 1
        ] }),
        /* @__PURE__ */ y.jsx(
          "textarea",
          {
            id: x === 0 ? a : void 0,
            className: S1,
            "aria-label": `prompt for clip ${x + 1}`,
            "aria-invalid": x === 0 && e !== void 0 ? !0 : void 0,
            value: c[x] ?? "",
            onChange: (_) => v(x, _.target.value)
          }
        )
      ] }, `clip-${x}`)
    )) : /* @__PURE__ */ y.jsx(
      "textarea",
      {
        id: a,
        className: S1,
        "aria-label": "single prompt",
        "aria-invalid": e !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (b) => m(b.target.value)
      }
    ),
    p > 0 && /* @__PURE__ */ y.jsxs("output", { className: tL, children: [
      p,
      " per-clip prompt",
      p > 1 ? "s" : "",
      " beyond the current Clips count ",
      p > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      p > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ y.jsx("p", { className: iL, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    e && /* @__PURE__ */ y.jsx("span", { role: "alert", className: rL, children: e })
  ] });
}
var oL = "_1itrxk30", sL = "_1itrxk31", uL = "_1itrxk32", cL = "_1itrxk33", fL = "_1itrxk34", dL = "_1itrxk35", hL = "_1itrxk36", mL = "_1itrxk37";
function pL() {
  const { qwenEdit: e, setQwenEdit: a } = Qt();
  return /* @__PURE__ */ y.jsxs("div", { className: oL, children: [
    /* @__PURE__ */ y.jsxs("div", { className: sL, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": e.enabled,
          "aria-label": "enable anchor edit",
          className: hL,
          onClick: () => a({ enabled: !e.enabled }),
          children: /* @__PURE__ */ y.jsx("span", { className: mL, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ y.jsxs("span", { className: uL, children: [
        /* @__PURE__ */ y.jsx("span", { className: cL, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ y.jsx("span", { className: fL, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    e.enabled && /* @__PURE__ */ y.jsx(
      "textarea",
      {
        className: dL,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: e.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var gL = "ob7g5b0", vL = "ob7g5b1", yL = "ob7g5b3", bL = "ob7g5b4", xL = "ob7g5b5", wL = "ob7g5b6", _L = "ob7g5b7", SL = "ob7g5b8", EL = "ob7g5b9", NL = "ob7g5ba";
function CL({
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
  onEnded: v,
  onReady: g,
  onError: b
}) {
  const [x, _] = S.useState("loading"), [C, E] = S.useState(null), R = S.useCallback(() => {
    _("ready"), g?.();
  }, [g]), j = S.useCallback(
    (z) => {
      const H = z.target, k = H.error?.message || `media error code ${H.error?.code ?? "?"}`;
      _("error"), E(k), b?.(new Error(k));
    },
    [b]
  ), N = [gL, p].filter(Boolean).join(" ");
  return e ? x === "error" ? /* @__PURE__ */ y.jsx("div", { className: N, role: "alert", "aria-label": d ?? "video playback error", children: /* @__PURE__ */ y.jsxs("div", { className: _L, children: [
    /* @__PURE__ */ y.jsx("div", { className: SL, children: "Could not play video" }),
    /* @__PURE__ */ y.jsx("div", { className: EL, children: C ?? "unknown error" }),
    /* @__PURE__ */ y.jsx("a", { className: NL, href: e, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ y.jsxs("div", { className: N, children: [
    x === "loading" && /* @__PURE__ */ y.jsx("div", { className: yL, "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("div", { className: bL }) }),
    r && /* @__PURE__ */ y.jsx("span", { className: xL, children: r }),
    /* @__PURE__ */ y.jsx(
      "video",
      {
        className: vL,
        src: e,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": d ?? "video player",
        onLoadedData: R,
        onEnded: v,
        onError: j,
        children: /* @__PURE__ */ y.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ y.jsx("div", { className: N, "aria-label": d ?? "no video", children: /* @__PURE__ */ y.jsx("div", { className: wL, children: m ?? "No video to display yet." }) });
}
const ci = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, E1 = {
  [ci.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [ci.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [ci.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [ci.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [ci.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [ci.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [ci.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [ci.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [ci.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function RL(e, a) {
  return e !== null && E1[e] ? E1[e] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function TL(e) {
  return e ? `${Ac}/media?path=${encodeURIComponent(e)}` : null;
}
var Fu = "_1ojc56g0", ML = "_1ojc56g1", AL = "_1ojc56g2", DL = "_1ojc56g3", jL = "_1ojc56g4", zL = "_1ojc56g5", OL = "_1ojc56g6", LL = "_1ojc56g7", kL = "_1ojc56g8", Zu = "_1ojc56g9", HL = "_1ojc56ga", BL = "_1ojc56gb", UL = "_1ojc56gc", VL = "_1ojc56gd", qL = "_1ojc56ge", $L = "_1ojc56gf", IL = "_1ojc56gg", YL = "_1ojc56gh", GL = "_51y2ql0", XL = "_51y2ql1", FL = "_51y2ql2", ZL = "_51y2ql3", PL = "_51y2ql4", Oh = "_51y2ql5", QL = "_51y2ql6", KL = "_51y2ql7 _51y2ql6", WL = "_51y2ql8 _51y2ql6", JL = "_51y2ql9", e8 = "_51y2qla", t8 = "_51y2qlb", n8 = "_51y2qlc", a8 = "_51y2qld", i8 = "_51y2qle";
const bn = 60, la = 62, xn = 46, r8 = 180, Io = 75, lc = 45, l8 = [0, 0.25, 0.5, 0.75, 1];
function o8(e) {
  const a = Math.PI * (1 - e), r = Math.cos(a), l = Math.sin(a);
  return {
    x1: bn + r * (xn - 9),
    y1: la - l * (xn - 9),
    x2: bn + r * (xn - 14),
    y2: la - l * (xn - 14)
  };
}
function s8(e) {
  const a = Io - lc, r = (Io - e) / a;
  return Math.min(1, Math.max(0.02, r));
}
function u8(e) {
  return e >= 0.55 ? QL : e >= 0.25 ? KL : WL;
}
function c8({ secondsPerStep: e }) {
  const a = e !== null && e > 0, r = a ? s8(e) : 0, l = r8 * r, s = a ? e.toFixed(1) : "—", u = a ? 1 / e : null, c = u === null ? "—" : u >= 1 ? u.toFixed(2) : u.toFixed(3);
  return /* @__PURE__ */ y.jsxs(
    "div",
    {
      className: GL,
      role: "meter",
      "aria-label": "render speed",
      "aria-valuemin": lc,
      "aria-valuemax": Io,
      "aria-valuenow": a ? Number(e.toFixed(1)) : void 0,
      "aria-valuetext": a ? `${s} seconds per step` : "no data yet",
      children: [
        /* @__PURE__ */ y.jsx("span", { className: XL, children: "Speed" }),
        /* @__PURE__ */ y.jsxs("svg", { className: FL, viewBox: "0 0 120 78", "aria-hidden": "true", children: [
          /* @__PURE__ */ y.jsx("title", { children: "speedometer" }),
          /* @__PURE__ */ y.jsx(
            "path",
            {
              className: ZL,
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100
            }
          ),
          l8.map((d) => {
            const p = o8(d);
            return /* @__PURE__ */ y.jsx(
              "line",
              {
                className: PL,
                strokeWidth: 1.4,
                x1: p.x1,
                y1: p.y1,
                x2: p.x2,
                y2: p.y2
              },
              d
            );
          }),
          /* @__PURE__ */ y.jsx("text", { className: Oh, x: bn - xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: Io }),
          /* @__PURE__ */ y.jsx("text", { className: Oh, x: bn, y: 9, fontSize: 6, textAnchor: "middle", children: (Io + lc) / 2 }),
          /* @__PURE__ */ y.jsx("text", { className: Oh, x: bn + xn, y: la + 12, fontSize: 6, textAnchor: "middle", children: lc }),
          a && /* @__PURE__ */ y.jsx(
            "path",
            {
              className: u8(r),
              d: `M ${bn - xn} ${la} A ${xn} ${xn} 0 0 1 ${bn + xn} ${la}`,
              strokeWidth: 8,
              pathLength: 100,
              strokeDasharray: `${Math.max(1.5, r * 100)} 100`
            }
          ),
          /* @__PURE__ */ y.jsx(
            "g",
            {
              className: JL,
              style: {
                transform: `rotate(${a ? l : 0}deg)`,
                transformOrigin: `${bn}px ${la}px`
              },
              children: /* @__PURE__ */ y.jsx(
                "line",
                {
                  className: e8,
                  strokeWidth: 2.4,
                  x1: bn,
                  y1: la,
                  x2: bn - xn + 16,
                  y2: la
                }
              )
            }
          ),
          /* @__PURE__ */ y.jsx("circle", { className: t8, cx: bn, cy: la, r: 3.6 }),
          /* @__PURE__ */ y.jsx("text", { className: n8, x: bn, y: 44, fontSize: 15, textAnchor: "middle", children: s }),
          /* @__PURE__ */ y.jsx("text", { className: a8, x: bn, y: 55, fontSize: 7.5, textAnchor: "middle", children: "s/it" })
        ] }),
        /* @__PURE__ */ y.jsxs("span", { className: i8, children: [
          c,
          " it/s"
        ] })
      ]
    }
  );
}
function f8({ state: e, onCancel: a, onReset: r }) {
  const [l, s] = S.useState(!1);
  S.useEffect(() => {
    e.phase !== "running" && s(!1);
  }, [e.phase]);
  const u = S.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (e.phase === "idle")
    return /* @__PURE__ */ y.jsx(
      wc,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (e.phase === "error") {
    const m = RL(e.errorCode, e.errorMessage);
    return /* @__PURE__ */ y.jsxs("div", { className: Fu, children: [
      /* @__PURE__ */ y.jsxs("div", { className: $L, role: "alert", children: [
        /* @__PURE__ */ y.jsx("span", { className: IL, children: m.title }),
        /* @__PURE__ */ y.jsx("span", { className: YL, children: m.hint })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: Zu, children: /* @__PURE__ */ y.jsx(Va, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (e.phase === "cancelled")
    return /* @__PURE__ */ y.jsxs("div", { className: Fu, children: [
      /* @__PURE__ */ y.jsx(wc, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ y.jsx("div", { className: Zu, children: /* @__PURE__ */ y.jsx(Va, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = e.renderReport?.fps, d = typeof c == "number" ? c : void 0;
  if (e.phase === "done")
    return /* @__PURE__ */ y.jsxs("output", { className: Fu, children: [
      /* @__PURE__ */ y.jsx(
        CL,
        {
          src: TL(e.outputPath),
          fpsLabel: d ? `${d} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ y.jsx(v8, { state: e }),
      /* @__PURE__ */ y.jsx("div", { className: Zu, children: /* @__PURE__ */ y.jsx(Va, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const p = Math.round(e.overallFraction * 100);
  return /* @__PURE__ */ y.jsxs("div", { className: Fu, children: [
    /* @__PURE__ */ y.jsx("output", { className: ML, "aria-live": "polite", children: m8(e) }),
    /* @__PURE__ */ y.jsx(
      "div",
      {
        className: LL,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": p,
        children: /* @__PURE__ */ y.jsx(
          "div",
          {
            className: kL,
            style: { transform: `scaleX(${Math.max(0.02, e.overallFraction)})` }
          }
        )
      }
    ),
    e.stalled && /* @__PURE__ */ y.jsx("output", { className: qL, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ y.jsxs("div", { className: AL, "aria-live": "polite", children: [
      /* @__PURE__ */ y.jsx(c8, { secondsPerStep: e.secondsPerStep }),
      /* @__PURE__ */ y.jsxs("div", { className: DL, children: [
        /* @__PURE__ */ y.jsx(Lo, { label: "Overall", value: `${p}%` }),
        /* @__PURE__ */ y.jsx(
          Lo,
          {
            label: "Clip",
            value: e.numClips ? `${e.clipIndex + 1} / ${e.numClips}` : "—"
          }
        ),
        /* @__PURE__ */ y.jsx(
          Lo,
          {
            label: "Step",
            value: e.totalSteps ? `${e.step} / ${e.totalSteps}` : "—"
          }
        ),
        /* @__PURE__ */ y.jsx(Lo, { label: "ETA", value: d8(p3(e)) }),
        /* @__PURE__ */ y.jsx(
          Lo,
          {
            label: "VRAM peak",
            value: e.vramPeakGib !== null ? `${e.vramPeakGib.toFixed(1)} GiB` : "—"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: Zu, children: /* @__PURE__ */ y.jsx(Va, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function d8(e) {
  if (e === null) return "—";
  const a = Math.max(0, Math.round(e)), r = Math.floor(a / 3600), l = Math.floor(a % 3600 / 60), s = a % 60;
  return r > 0 ? `${r}h ${String(l).padStart(2, "0")}m` : l > 0 ? `${l}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}
const h8 = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading diffusion experts…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…"
};
function m8(e) {
  if (!e.stage) return "Starting worker…";
  if (e.stage === "loading_experts" && e.stageDetail) return e.stageDetail;
  const a = h8[e.stage] ?? e.stage;
  return e.stage === "denoising" && e.numClips > 0 ? `${a} — clip ${e.clipIndex + 1} of ${e.numClips}` : a;
}
function p8(e) {
  const a = e.base_model_high, r = e.base_model_low;
  if (typeof a != "string") return null;
  const l = e.base_model_override === !0, s = l ? "custom" : "bundled", u = N1(a);
  if (typeof r == "string" && r !== a)
    return `${u} + ${N1(r)} (${s})`;
  const c = e.svi_lora_tier, d = l && typeof c == "string" ? `, SVI ${c}` : "";
  return `${u} (${s}${d})`;
}
function g8(e) {
  const a = e.torch_compile;
  if (!a || typeof a != "object") return null;
  const r = a;
  if (r.requested !== !0) return null;
  if (r.blocked_by_block_swap === !0) return "skipped — block-swap on";
  if (typeof r.error == "string") return "failed → eager";
  if (r.engaged !== !0) return "not engaged";
  const l = typeof r.mode == "string" ? r.mode : "default", s = r.dynamo ?? {}, u = typeof s.unique_graphs == "number" ? s.unique_graphs : null, c = typeof s.calls_captured == "number" ? s.calls_captured : null, d = typeof s.graph_breaks == "number" ? s.graph_breaks : null;
  if (u !== null && c !== null) {
    const p = d ? `, ${d} breaks` : "";
    return `${l} — ${u} graphs / ${c} calls${p}`;
  }
  return `${l} — engaged`;
}
function N1(e) {
  const a = e.split(/[\\/]/);
  return a[a.length - 1] || e;
}
function Lo({ label: e, value: a }) {
  return /* @__PURE__ */ y.jsxs("div", { className: jL, children: [
    /* @__PURE__ */ y.jsx("span", { className: zL, children: e }),
    /* @__PURE__ */ y.jsx("span", { className: OL, children: a })
  ] });
}
function v8({ state: e }) {
  const a = e.renderReport;
  if (!a) return null;
  const r = [], l = p8(a);
  l && r.push(["Base model", l]);
  const s = g8(a);
  return s && r.push(["torch.compile", s]), typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), e.vramPeakGib !== null && r.push(["VRAM peak", `${e.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), e.outputPath && r.push(["Output", e.outputPath]), r.length === 0 ? null : /* @__PURE__ */ y.jsx("div", { className: HL, children: r.map(([u, c]) => /* @__PURE__ */ y.jsxs("div", { className: BL, children: [
    /* @__PURE__ */ y.jsx("span", { className: UL, children: u }),
    /* @__PURE__ */ y.jsx("span", { className: VL, children: c })
  ] }, u)) });
}
const hm = 16, Or = 128, _c = 1920, y8 = 832 * 480, b8 = { width: 848, height: 480 }, k_ = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "3:2", label: "3:2", w: 3, h: 2 },
  { id: "4:3", label: "4:3", w: 4, h: 3 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "3:4", label: "3:4", w: 3, h: 4 },
  { id: "9:16", label: "9:16", w: 9, h: 16 }
];
function H_(e, a, r) {
  return Math.min(r, Math.max(a, e));
}
function is(e) {
  if (!Number.isFinite(e)) return Or;
  const a = Math.round(e / hm) * hm;
  return H_(a, Or, _c);
}
function C1(e, a) {
  const r = is(e);
  return H_(r + a * hm, Or, _c);
}
function Sc(e, a) {
  return { width: is(e), height: is(a) };
}
function x8(e) {
  return { width: e.height, height: e.width };
}
function B_(e) {
  return e.width * e.height;
}
function U_(e) {
  return e.height === 0 ? 0 : e.width / e.height;
}
function w8(e, a, r) {
  if (e <= 0 || a <= 0 || r <= 0)
    return Sc(Or, Or);
  const l = e / a, s = Math.sqrt(r * l), u = r / s;
  return Sc(s, u);
}
function V_(e) {
  const a = U_(e);
  if (a <= 0) return null;
  let r = null;
  for (const l of k_) {
    const s = Math.abs(a - l.w / l.h);
    s < 0.06 && (r === null || s < r.delta) && (r = { id: l.id, delta: s });
  }
  return r?.id ?? null;
}
function _8(e) {
  return e.width === e.height ? "square" : e.width > e.height ? "landscape" : "portrait";
}
function q_(e, a) {
  return a === 0 ? e : q_(a, e % a);
}
function S8(e) {
  const a = V_(e);
  if (a) return a;
  const r = q_(e.width, e.height) || 1, l = e.width / r, s = e.height / r;
  return l <= 64 && s <= 64 ? `${l}:${s}` : `${U_(e).toFixed(2)}:1`;
}
function E8(e) {
  const a = B_(e);
  return {
    megapixels: (a / 1e6).toFixed(2),
    aspect: S8(e),
    orientation: _8(e),
    budgetPct: Math.round(a / y8 * 100)
  };
}
function N8() {
  return /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "swap" }),
    /* @__PURE__ */ y.jsx(
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
function R1({
  id: e,
  label: a,
  value: r,
  draft: l,
  onDraft: s,
  onCommit: u,
  onStep: c
}) {
  return /* @__PURE__ */ y.jsxs("div", { className: fO, children: [
    /* @__PURE__ */ y.jsx("label", { className: z_, htmlFor: e, children: a }),
    /* @__PURE__ */ y.jsxs("div", { className: dO, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          className: x1,
          "aria-label": `Decrease ${a} by 16`,
          disabled: r <= Or,
          onClick: () => c(-1),
          children: "−"
        }
      ),
      /* @__PURE__ */ y.jsx(
        "input",
        {
          id: e,
          type: "number",
          inputMode: "numeric",
          className: hO,
          "aria-label": a,
          min: Or,
          max: _c,
          step: 16,
          value: l,
          onChange: (d) => s(d.target.value),
          onBlur: (d) => u(Number(d.target.value)),
          onKeyDown: (d) => {
            d.key === "Enter" && u(Number(d.target.value));
          }
        }
      ),
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          className: x1,
          "aria-label": `Increase ${a} by 16`,
          disabled: r >= _c,
          onClick: () => c(1),
          children: "+"
        }
      )
    ] })
  ] });
}
function C8({
  width: e,
  height: a,
  onChange: r
}) {
  const [l, s] = S.useState(() => String(e)), [u, c] = S.useState(() => String(a));
  S.useEffect(() => {
    s(String(e));
  }, [e]), S.useEffect(() => {
    c(String(a));
  }, [a]);
  const d = { width: e, height: a }, p = E8(d), m = V_(d), v = (E) => {
    const R = is(E);
    s(String(R)), R !== e && r({ width: R, height: a });
  }, g = (E) => {
    const R = is(E);
    c(String(R)), R !== a && r({ width: e, height: R });
  }, b = (E) => {
    r({ width: C1(e, E), height: a });
  }, x = (E) => {
    r({ width: e, height: C1(a, E) });
  }, _ = () => r(x8(d)), C = (E, R) => {
    r(w8(E, R, B_(d)));
  };
  return /* @__PURE__ */ y.jsxs("div", { className: uO, children: [
    /* @__PURE__ */ y.jsxs("div", { className: cO, children: [
      /* @__PURE__ */ y.jsx(
        R1,
        {
          id: "svi2-custom-width",
          label: "Width",
          value: e,
          draft: l,
          onDraft: s,
          onCommit: v,
          onStep: b
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: mO, "aria-hidden": "true", children: "×" }),
      /* @__PURE__ */ y.jsx(
        R1,
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
      /* @__PURE__ */ y.jsxs(
        "button",
        {
          type: "button",
          className: pO,
          onClick: _,
          title: "Reverse the aspect ratio — swap width and height at the same pixel count",
          children: [
            /* @__PURE__ */ y.jsx("span", { className: gO, children: /* @__PURE__ */ y.jsx(N8, {}) }),
            "Swap"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: vO, children: [
      /* @__PURE__ */ y.jsx("span", { className: z_, children: "Aspect ratio · same pixel budget" }),
      /* @__PURE__ */ y.jsx(
        "div",
        {
          className: yO,
          role: "group",
          "aria-label": "Aspect ratio presets",
          children: k_.map((E) => {
            const R = m === E.id, j = [bO, R ? xO : ""].filter(Boolean).join(" ");
            return /* @__PURE__ */ y.jsx(
              "button",
              {
                type: "button",
                className: j,
                "aria-pressed": R,
                onClick: () => C(E.w, E.h),
                children: E.label
              },
              E.id
            );
          })
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs("output", { className: wO, "aria-live": "polite", children: [
      Sc(e, a).width,
      "×",
      Sc(e, a).height,
      /* @__PURE__ */ y.jsx("span", { className: Mh, children: "·" }),
      p.megapixels,
      " MP",
      /* @__PURE__ */ y.jsx("span", { className: Mh, children: "·" }),
      p.aspect,
      " ",
      p.orientation,
      /* @__PURE__ */ y.jsx("span", { className: Mh, children: "·" }),
      p.budgetPct,
      "% of 480p budget"
    ] })
  ] });
}
function T1() {
  return /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 20 20", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "selected" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "10", cy: "10", r: "8.25", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ y.jsx(
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
function R8({ presets: e }) {
  const { params: a, updateParam: r } = Qt(), l = S.useMemo(() => cp(e), [e]), [s, u] = S.useState(!1);
  if (l.length === 0) return null;
  const c = fp(a, l), d = c === as || s, p = a.width ?? 832, m = a.height ?? 480, v = (g) => {
    r("width", g.width), r("height", g.height);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: "svi2-resolution-label", children: "Generation resolution" }),
    /* @__PURE__ */ y.jsxs("div", { className: aO, role: "radiogroup", "aria-labelledby": "svi2-resolution-label", children: [
      l.map((g) => {
        const b = !d && c === g.id, x = [h1, b ? m1 : ""].filter(Boolean).join(" "), _ = [v1, b ? y1 : ""].filter(Boolean).join(" ");
        return /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": b,
            className: x,
            onClick: () => {
              u(!1), r("width", g.width), r("height", g.height);
            },
            children: [
              /* @__PURE__ */ y.jsxs("span", { className: p1, children: [
                /* @__PURE__ */ y.jsxs("span", { className: g1, children: [
                  g.width,
                  "×",
                  g.height
                ] }),
                /* @__PURE__ */ y.jsx("span", { className: _, children: /* @__PURE__ */ y.jsx(T1, {}) })
              ] }),
              /* @__PURE__ */ y.jsx("span", { className: b1, children: g.label }),
              /* @__PURE__ */ y.jsx("span", { className: iO, children: g.sub }),
              g.stepsDown > 0 && /* @__PURE__ */ y.jsx(
                "span",
                {
                  className: g.stepsDown >= 2 ? lO : rO,
                  children: g.stepsDown >= 2 ? "off-distribution" : "below native"
                }
              )
            ]
          },
          g.id
        );
      }),
      /* @__PURE__ */ y.jsxs(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": d,
          className: [h1, oO, d ? m1 : ""].filter(Boolean).join(" "),
          onClick: () => {
            u(!0), c !== as && v(b8);
          },
          children: [
            /* @__PURE__ */ y.jsxs("span", { className: p1, children: [
              /* @__PURE__ */ y.jsx("span", { className: g1, children: "Custom" }),
              /* @__PURE__ */ y.jsx(
                "span",
                {
                  className: [v1, d ? y1 : ""].join(" "),
                  children: /* @__PURE__ */ y.jsx(T1, {})
                }
              )
            ] }),
            /* @__PURE__ */ y.jsx("span", { className: b1, children: "Any aspect & budget" }),
            /* @__PURE__ */ y.jsx("span", { className: sO, children: "9:16 portrait, square, or a custom Wan2.2 canvas" })
          ]
        }
      )
    ] }),
    d && /* @__PURE__ */ y.jsx(C8, { width: p, height: m, onChange: v })
  ] });
}
var T8 = "_1x63kpu0";
const M8 = "Random each render";
function A8(e) {
  const a = e.trim();
  if (a.length === 0) return;
  const r = Number(a);
  if (!(!Number.isFinite(r) || r < 0))
    return Math.trunc(r);
}
function D8() {
  const { params: e, updateParam: a } = Qt(), r = S.useId(), l = e.seed, s = (u) => {
    a("seed", A8(u.target.value));
  };
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("span", { className: wn, id: r, children: "Seed" }),
    /* @__PURE__ */ y.jsxs("div", { className: Gc, children: [
      /* @__PURE__ */ y.jsx(
        "input",
        {
          type: "number",
          inputMode: "numeric",
          className: T8,
          "aria-labelledby": r,
          min: 0,
          step: 1,
          placeholder: M8,
          value: l ?? "",
          onChange: s
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Fixes the synthesized seed frame for reproducible takes. Leave blank to randomize." })
    ] })
  ] });
}
function j8({
  spec: e,
  value: a,
  error: r,
  onChange: l,
  disabled: s = !1,
  disabledReason: u
}) {
  const c = S.useId(), d = `${c}-help`, p = r ? `${c}-error` : d;
  return /* @__PURE__ */ y.jsxs("div", { className: Qz, title: s ? u : void 0, children: [
    /* @__PURE__ */ y.jsxs("div", { className: Kz, children: [
      /* @__PURE__ */ y.jsx("label", { className: Wz, htmlFor: c, children: e.label }),
      e.control === "slider" && /* @__PURE__ */ y.jsx("span", { className: Jz, children: O8(a, e.step) })
    ] }),
    z8(e, a, l, c, p, r !== void 0, s),
    /* @__PURE__ */ y.jsx("span", { id: d, className: R_, children: s && u ? u : e.help }),
    r && /* @__PURE__ */ y.jsx("span", { id: `${c}-error`, role: "alert", className: eO, children: r })
  ] });
}
function z8(e, a, r, l, s, u, c) {
  switch (e.control) {
    case "toggle": {
      const d = !!a;
      return /* @__PURE__ */ y.jsxs("div", { className: ip, children: [
        /* @__PURE__ */ y.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": d,
            "aria-describedby": s,
            disabled: c,
            className: rp,
            onClick: () => r(!d),
            children: /* @__PURE__ */ y.jsx("span", { className: lp, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ y.jsx("span", { className: R_, children: d ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ y.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [nO, u ? d1 : ""].filter(Boolean).join(" "),
          value: String(a ?? e.default ?? ""),
          onChange: (d) => r(e.numeric ? Number(d.target.value) : d.target.value),
          children: e.options?.map((d) => /* @__PURE__ */ y.jsx("option", { value: d.value, children: d.label }, d.value))
        }
      );
    case "slider": {
      const d = M1(a, e), p = e.min ?? 0, m = e.max ?? 100, g = { "--svi2-slider-fill": `${m > p ? (d - p) / (m - p) * 100 : 0}%` };
      return /* @__PURE__ */ y.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: T_,
          style: g,
          min: e.min,
          max: e.max,
          step: e.step,
          value: d,
          onChange: (b) => r(Number(b.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ y.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          disabled: c,
          className: [tO, u ? d1 : ""].filter(Boolean).join(" "),
          min: e.min,
          max: e.max,
          step: e.step,
          value: M1(a, e),
          onChange: (d) => r(Number(d.target.value))
        }
      );
  }
}
function M1(e, a) {
  return typeof e == "number" && Number.isFinite(e) ? e : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function O8(e, a) {
  return typeof e != "number" ? "—" : a === void 0 || a >= 1 ? Number.isInteger(e) ? String(e) : e.toFixed(2) : e.toFixed(a >= 0.1 ? 1 : 2);
}
var L8 = "_1f0q5gf0", k8 = "_1f0q5gf1", H8 = "_1f0q5gf2", B8 = "_1f0q5gf3", U8 = "_1f0q5gf4", V8 = "_1f0q5gf5", q8 = "_1f0q5gf6", $8 = "_1f0q5gf7", I8 = "_1f0q5gf8", Y8 = "_1f0q5gf9", G8 = "_1f0q5gfa", X8 = "_1f0q5gfb", F8 = "_1f0q5gfc";
function Z8({
  title: e,
  description: a,
  badge: r,
  summary: l,
  defaultCollapsed: s = !1,
  collapsible: u = !0,
  className: c,
  children: d
}) {
  const p = S.useId(), [m, v] = S.useState(u ? s : !1), g = [L8, c].filter(Boolean).join(" "), b = [H8, m ? B8 : ""].filter(Boolean).join(" "), x = !u || !m;
  return /* @__PURE__ */ y.jsxs("section", { className: g, children: [
    /* @__PURE__ */ y.jsxs(
      "button",
      {
        type: "button",
        className: k8,
        "aria-expanded": x,
        "aria-controls": p,
        disabled: !u,
        onClick: () => u && v((_) => !_),
        children: [
          u && /* @__PURE__ */ y.jsx("span", { className: b, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ y.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ y.jsx(
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
          /* @__PURE__ */ y.jsxs("span", { className: U8, children: [
            /* @__PURE__ */ y.jsx("span", { className: V8, children: e }),
            a && /* @__PURE__ */ y.jsx("span", { className: q8, children: a })
          ] }),
          (l || r) && /* @__PURE__ */ y.jsxs("span", { className: $8, children: [
            l && /* @__PURE__ */ y.jsx("span", { className: I8, children: l }),
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ y.jsx(
      "div",
      {
        id: p,
        className: [Y8, x ? G8 : ""].filter(Boolean).join(" "),
        inert: !x || void 0,
        children: /* @__PURE__ */ y.jsx("div", { className: X8, children: /* @__PURE__ */ y.jsx("div", { className: F8, children: d }) })
      }
    )
  ] });
}
const P8 = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg"
};
function A1(e) {
  return (Math.round(e * 10) / 10).toFixed(1);
}
function Q8(e) {
  return Ic.find((a) => a.key === e)?.default;
}
function gl(e, a) {
  const r = e[a];
  if (typeof r == "number" && Number.isFinite(r)) return r;
  const l = Q8(a);
  return typeof l == "number" ? l : 0;
}
function K8(e, a) {
  if (e === "core") {
    const r = gl(a, "fps"), l = gl(a, "interpolate_fps"), s = l > 0 ? l : r, u = typeof a.interpolate_method == "string" ? a.interpolate_method : "rife", c = P8[u] ?? u, d = gl(a, "upscale_factor"), p = `${r} → ${s} fps · ${c}`;
    return d > 0 ? `${p} · ${d}× VSR` : p;
  }
  if (e === "quality") {
    const r = gl(a, "num_inference_steps"), l = gl(a, "cfg_scale"), s = gl(a, "sigma_shift");
    return `${r} steps · CFG ${A1(l)} · shift ${A1(s)}`;
  }
  return null;
}
async function W8() {
  return er("/capabilities/attention");
}
const D1 = Object.fromEntries(
  Am.map((e) => [e.value, e.label])
);
function J8() {
  const { params: e, settings: a, updateParam: r, setSettings: l } = Qt(), s = ns("svi2/attention-capabilities", W8, {
    shouldRetryOnError: !1
  }), u = e.attention ?? a.attentionBackend ?? "flash2", c = S.useCallback(
    (b) => {
      r("attention", b);
      const x = { ...a, attentionBackend: b };
      l(x), uc(x).catch(() => {
      });
    },
    [a, r, l]
  ), d = s.data, p = d === void 0, m = s.error !== void 0, v = d?.backends.find((b) => b.id === u), g = v !== void 0 && !v.supported;
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-attention", children: "Attention mechanism" }),
    /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsxs(
        "select",
        {
          id: "svi2-attention",
          className: Wi,
          value: u,
          onChange: (b) => c(b.target.value),
          children: [
            /* @__PURE__ */ y.jsx("option", { value: "auto", children: D1.auto }),
            d ? d.backends.map((b) => /* @__PURE__ */ y.jsx(
              "option",
              {
                value: b.id,
                disabled: !b.supported,
                title: b.reason ?? void 0,
                children: D1[b.id] ?? b.id
              },
              b.id
            )) : Am.filter((b) => b.value !== "auto").map((b) => /* @__PURE__ */ y.jsx("option", { value: b.value, children: b.label }, b.value))
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: gs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ y.jsx("title", { children: "open" }),
        /* @__PURE__ */ y.jsx(
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
    m && /* @__PURE__ */ y.jsx("span", { className: pn, children: "GPU capabilities unavailable — all options shown." }),
    g && /* @__PURE__ */ y.jsxs("span", { className: pn, children: [
      v.reason ?? "This backend is not supported on the current GPU",
      " — will fall back to flash2 at render time."
    ] }),
    !p && u === "sage3_fp4" && !g && /* @__PURE__ */ y.jsx("span", { className: pn, children: "FP4 — may show artifacts on some GPUs." })
  ] });
}
function ek() {
  const { params: e, updateParam: a } = Qt(), r = (e.blocks_to_swap ?? 0) > 0, l = !r && (e.use_torch_compile ?? !1), s = e.torch_compile_mode ?? "default";
  return /* @__PURE__ */ y.jsxs("div", { className: On, children: [
    /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-torch-compile", children: "torch.compile (experimental)" }),
    /* @__PURE__ */ y.jsxs("div", { className: ip, children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          id: "svi2-torch-compile",
          role: "switch",
          "aria-checked": l,
          disabled: r,
          className: rp,
          onClick: () => a("use_torch_compile", !l),
          children: /* @__PURE__ */ y.jsx("span", { className: lp, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: l ? "On" : "Off" })
    ] }),
    l && /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
      /* @__PURE__ */ y.jsx(
        "select",
        {
          "aria-label": "torch.compile mode",
          className: Wi,
          value: s,
          onChange: (u) => a("torch_compile_mode", u.target.value),
          children: AC.map((u) => /* @__PURE__ */ y.jsx("option", { value: u.value, children: u.label }, u.value))
        }
      ),
      /* @__PURE__ */ y.jsx("span", { className: gs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ y.jsx("title", { children: "open" }),
        /* @__PURE__ */ y.jsx(
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
    /* @__PURE__ */ y.jsx("span", { className: pn, children: r ? "Set Blocks to swap = 0 to enable — compile needs both experts VRAM-resident (no offload)." : "Compiles the DiT for faster steps; CUDA graphs via reduce-overhead. Falls back to eager if the backend is unavailable. Render report shows whether it engaged." })
  ] });
}
const dp = "off", tk = [
  { value: "off", label: "Off (native resolution)" },
  { value: "auto", label: "Auto (best available)" },
  { value: "maxine", label: "Maxine VSR — RTX (Windows only)" },
  { value: "drct-l-hq", label: "DRCT-L HQ (best, slow)" },
  { value: "drct-l-real", label: "DRCT-L Real (degraded sources)" },
  { value: "hat-l", label: "HAT-L (transformer)" },
  { value: "swinir-l", label: "SwinIR-L (real-world)" },
  { value: "realesrgan", label: "Real-ESRGAN (fast)" }
], nk = [
  { value: 2, label: "2×" },
  { value: 3, label: "3×" },
  { value: 4, label: "4×" }
], ak = [
  { value: "LOW", label: "Low (fastest)" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "ULTRA", label: "Ultra (best)" },
  { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
  { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" }
], ik = 2;
function rk(e) {
  return e === "maxine" || e === "auto";
}
function lk(e, a) {
  return !e || e <= 0 ? dp : a ?? "auto";
}
function ok(e, a) {
  return e === dp ? { upscale_factor: 0 } : { upscale_factor: a && a > 0 ? a : ik, upscale_model: e };
}
function Lh() {
  return /* @__PURE__ */ y.jsx("span", { className: gs, "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("title", { children: "open" }),
    /* @__PURE__ */ y.jsx(
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
function sk() {
  const { params: e, updateParam: a } = Qt(), r = lk(e.upscale_factor, e.upscale_model), l = r === dp, s = rk(r), u = S.useCallback(
    (c) => {
      const d = ok(c, e.upscale_factor);
      a("upscale_factor", d.upscale_factor), d.upscale_model !== void 0 && a("upscale_model", d.upscale_model);
    },
    [e.upscale_factor, a]
  );
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: On, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-upscale-engine", children: "Upscaler" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-upscale-engine",
            className: Wi,
            value: r,
            onChange: (c) => u(c.target.value),
            children: tk.map((c) => /* @__PURE__ */ y.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ y.jsx(Lh, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Super-resolution after stitch, before interpolation. Auto = Maxine (RTX/Windows) → DRCT-L → Real-ESRGAN. DRCT-L is the highest-quality transformer (runs on aarch64/GB10)." })
    ] }),
    !l && /* @__PURE__ */ y.jsxs("div", { className: On, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-upscale-scale", children: "Scale" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-upscale-scale",
            className: Wi,
            value: String(e.upscale_factor ?? 2),
            onChange: (c) => a("upscale_factor", Number(c.target.value)),
            children: nk.map((c) => /* @__PURE__ */ y.jsx("option", { value: String(c.value), children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ y.jsx(Lh, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Output multiplier applied to the rendered resolution." })
    ] }),
    !l && s && /* @__PURE__ */ y.jsxs("div", { className: On, children: [
      /* @__PURE__ */ y.jsx("label", { className: wn, htmlFor: "svi2-upscale-quality", children: "Maxine quality" }),
      /* @__PURE__ */ y.jsxs("div", { className: Ki, children: [
        /* @__PURE__ */ y.jsx(
          "select",
          {
            id: "svi2-upscale-quality",
            className: Wi,
            value: String(e.upscale_quality ?? "HIGH"),
            onChange: (c) => a("upscale_quality", c.target.value),
            children: ak.map((c) => /* @__PURE__ */ y.jsx("option", { value: c.value, children: c.label }, c.value))
          }
        ),
        /* @__PURE__ */ y.jsx(Lh, {})
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: pn, children: "Maxine VSR preset (Maxine/Auto on Windows only; ignored by DRCT-L/Real-ESRGAN)." })
    ] })
  ] });
}
var uk = "kn07ek0", ck = "kn07ek1";
const fk = {
  num_clips: "Locked to 1 in FLF2V morph — the end keyframe pins the clip, no chaining.",
  frames_per_clip: "Driven by the Length control in FLF2V morph (fps × seconds, snapped to 4n+1)."
};
function dk({ issues: e }) {
  const { presetId: a, params: r, updateParam: l } = Qt(), s = Yc(a, r), u = (c) => e.find((d) => d.field === c && d.severity === "error")?.message;
  return /* @__PURE__ */ y.jsx("div", { className: uk, children: c_.map((c) => {
    const d = v3(c.id);
    return d.length === 0 ? null : /* @__PURE__ */ y.jsx(
      Z8,
      {
        title: c.title,
        description: c.description,
        defaultCollapsed: c.defaultCollapsed,
        summary: K8(c.id, r),
        badge: c.defaultCollapsed ? /* @__PURE__ */ y.jsx(Xn, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ y.jsxs("div", { className: ck, children: [
          c.id === "perf" && /* @__PURE__ */ y.jsx(J8, {}),
          c.id === "perf" && /* @__PURE__ */ y.jsx(ek, {}),
          d.map((p) => {
            const m = s ? fk[p.key] : void 0;
            return /* @__PURE__ */ y.jsx(
              j8,
              {
                spec: p,
                value: r[p.key],
                error: u(p.key),
                disabled: m !== void 0,
                disabledReason: m,
                onChange: (v) => l(p.key, v)
              },
              p.key
            );
          }),
          c.id === "core" && /* @__PURE__ */ y.jsx(sk, {})
        ] })
      },
      c.id
    );
  }) });
}
var hk = "_1w9jfpf0", mk = "_1w9jfpf1", pk = "_1w9jfpf2", gk = "_1w9jfpf3", vk = "_1w9jfpf4", yk = "_1w9jfpf5";
const mm = "svi2-anchor-panel", $_ = "svi2-prompt-input";
function bk() {
  const {
    presetId: e,
    presetApplied: a,
    params: r,
    render: l,
    applyPresetById: s,
    setMode: u,
    resetRender: c,
    showJobResult: d
  } = Qt(), { issues: p, blocked: m, busy: v, submit: g, cancel: b, focusRequest: x } = y_();
  wk(x);
  const _ = ns("svi2/presets", _x), C = ns("svi2/history", () => U3(25)), E = _.data?.presets ?? [];
  S.useEffect(() => {
    if (a || E.length === 0) return;
    const J = E.find(($) => $.id === e) ?? E[0];
    J && s(J);
  }, [a, E, e, s]);
  const R = C.data?.jobs ?? [], j = r.mode ?? "image_to_video", N = j !== "text_to_video", z = tp(e, r), H = p.find((J) => J.field === "ref_image_path")?.message, k = p.find((J) => J.field === "last_image_path")?.message, V = p.find((J) => J.field === "prompts")?.message, A = p.find(
    (J) => J.field === "width" && J.severity === "warning"
  )?.message, I = S.useCallback(
    (J) => {
      d(J);
    },
    [d]
  );
  return /* @__PURE__ */ y.jsxs("div", { className: hk, children: [
    /* @__PURE__ */ y.jsxs("div", { className: mk, children: [
      /* @__PURE__ */ y.jsx(
        Ha,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ y.jsx(P6, { presets: E, selectedId: e, onSelect: s })
        }
      ),
      /* @__PURE__ */ y.jsxs(
        Ha,
        {
          title: "Mode",
          description: "Image-to-Video anchors identity to a reference. Text-to-Video synthesizes the seed from the prompt.",
          children: [
            /* @__PURE__ */ y.jsx(o6, { value: j, onChange: u }),
            j === "text_to_video" && /* @__PURE__ */ y.jsx(D8, {})
          ]
        }
      ),
      /* @__PURE__ */ y.jsx("div", { id: mm, children: /* @__PURE__ */ y.jsx(
        Ha,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ y.jsx(
            $z,
            {
              refImageRequired: N,
              lastImageRequired: z,
              refError: H,
              lastError: k
            }
          )
        }
      ) }),
      /* @__PURE__ */ y.jsx(Ha, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ y.jsx(lL, { error: V, textareaId: $_ }) }),
      /* @__PURE__ */ y.jsx(Ha, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ y.jsx(pL, {}) }),
      /* @__PURE__ */ y.jsxs(
        Ha,
        {
          title: /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
            /* @__PURE__ */ y.jsx("span", { className: vk, children: "Inference · Parameters" }),
            "Parameters"
          ] }),
          description: "Grouped by tier. Advanced tiers stay collapsed.",
          actions: /* @__PURE__ */ y.jsx(
            Va,
            {
              variant: "secondary",
              size: "sm",
              title: "Re-apply the active preset's defaults",
              onClick: () => {
                const J = E.find(($) => $.id === e);
                J && s(J);
              },
              children: "Reset to defaults"
            }
          ),
          children: [
            /* @__PURE__ */ y.jsx(t6, { presets: E, warningText: A }),
            /* @__PURE__ */ y.jsxs("div", { className: yk, children: [
              /* @__PURE__ */ y.jsx(S6, {}),
              /* @__PURE__ */ y.jsx(R8, { presets: E }),
              /* @__PURE__ */ y.jsx(EO, {}),
              /* @__PURE__ */ y.jsx(kO, {})
            ] }),
            /* @__PURE__ */ y.jsx(dk, { issues: p }),
            /* @__PURE__ */ y.jsx(z6, { presets: E })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: pk, children: [
      /* @__PURE__ */ y.jsxs(
        Ha,
        {
          title: "Render",
          description: v ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ y.jsx(f8, { state: l, onCancel: b, onReset: c }),
            !v && /* @__PURE__ */ y.jsx("div", { className: gk, children: /* @__PURE__ */ y.jsx(
              Va,
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
      /* @__PURE__ */ y.jsx(Ha, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ y.jsx(b6, { jobs: R, onOpen: I }) })
    ] })
  ] });
}
const xk = {
  ref_image_path: mm,
  last_image_path: mm,
  prompts: $_
};
function wk(e) {
  S.useEffect(() => {
    if (!e || typeof document > "u") return;
    const a = xk[e.field];
    if (a) {
      const l = document.getElementById(a);
      j1(l);
      return;
    }
    _k(e.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      j1(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [e]);
}
function _k(e) {
  const a = Ic.find((s) => s.key === e);
  if (!a) return;
  const r = c_.find((s) => s.id === a.tier);
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
function j1(e) {
  if (!e) return;
  const a = e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.tagName === "SELECT" ? e : e.querySelector("input, textarea, select, button");
  e.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var Sk = "_1smvon90", yr = "_1smvon91", br = "_1smvon92", xr = "_1smvon93", Pu = "_1smvon94", kh = "_1smvon95 _1smvon94", Ek = "_1smvon96", Nk = "_1smvon97";
const Ck = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function Rk() {
  const { settings: e, setSettings: a } = Qt(), [r, l] = S.useState(e), [s, u] = S.useState(!1), c = S.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== e[m]
    ),
    [r, e]
  ), d = (m, v) => {
    l((g) => ({ ...g, [m]: v }));
  }, p = async () => {
    u(!0);
    try {
      const m = await uc(r);
      a(m), l(m), Nr.success("Settings saved. Applied to new renders.");
    } catch {
      Nr.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ y.jsxs(
    Ha,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ y.jsxs("div", { className: Sk, children: [
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Models directory" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Pu,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => d("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Output directory" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Pu,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => d("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ y.jsx(
              "select",
              {
                className: kh,
                value: r.attentionBackend,
                onChange: (m) => d("attentionBackend", m.target.value),
                children: Am.map((m) => /* @__PURE__ */ y.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ y.jsx(
              "select",
              {
                className: kh,
                value: r.fp8Compute,
                onChange: (m) => d("fp8Compute", m.target.value),
                children: TC.map((m) => /* @__PURE__ */ y.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Blocks to swap" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Pu,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (m) => d("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Interpolation method" }),
            /* @__PURE__ */ y.jsx(
              "select",
              {
                className: kh,
                value: r.interpolateMethod,
                onChange: (m) => d("interpolateMethod", m.target.value),
                children: Ck.map((m) => /* @__PURE__ */ y.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ y.jsxs("label", { className: yr, children: [
            /* @__PURE__ */ y.jsx("span", { className: br, children: "Interpolate target fps" }),
            /* @__PURE__ */ y.jsx(
              "input",
              {
                className: Pu,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (m) => d("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ y.jsx("span", { className: xr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: Ek, children: [
          /* @__PURE__ */ y.jsx(Va, { loading: s, disabled: !c, onClick: () => void p(), children: "Save settings" }),
          /* @__PURE__ */ y.jsx(
            Va,
            {
              variant: "secondary",
              onClick: () => l(e),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ y.jsx("output", { className: Nk, children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var Tk = "_1ugwva20", Mk = "_1ugwva21", Ak = "_1ugwva22", Dk = "_1ugwva23", jk = "_1ugwva24", zk = "_1ugwva25";
function Ok() {
  const e = LN(), { deploymentId: a } = NN(), r = Lk(e.catalog?.presets ?? []);
  return /* @__PURE__ */ y.jsxs(
    F3,
    {
      initialSettings: e.settings,
      initialPreset: r,
      deploymentId: a,
      children: [
        /* @__PURE__ */ y.jsxs("div", { className: Tk, children: [
          /* @__PURE__ */ y.jsx("header", { className: Mk, children: /* @__PURE__ */ y.jsxs("div", { className: Ak, children: [
            /* @__PURE__ */ y.jsx("h1", { className: Dk, children: "SVI 2.0 Pro" }),
            /* @__PURE__ */ y.jsx("p", { className: jk, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
          ] }) }),
          /* @__PURE__ */ y.jsx("main", { className: zk, children: /* @__PURE__ */ y.jsx(ZN, {}) })
        ] }),
        /* @__PURE__ */ y.jsx(x5, { position: "bottom-right", theme: "dark", richColors: !0 })
      ]
    }
  );
}
function Lk(e) {
  return e.find((a) => a.id === ts) ?? e[0] ?? null;
}
async function kk() {
  const [e, a] = await Promise.all([
    _x().catch(() => null),
    jC().catch(() => wx)
  ]);
  return { catalog: e, settings: a };
}
function Hk() {
  return [
    {
      path: "/",
      loader: () => uy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: kk,
      Component: Ok,
      children: [
        {
          index: !0,
          loader: ({ params: e }) => uy(`/${Bk(e, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: bk },
        { path: "dag", Component: W5 },
        { path: "settings", Component: Rk }
      ]
    }
  ];
}
function Bk(e, a) {
  const r = e[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const z1 = "ext-actions-request", Uk = "ext-actions-declare", Vk = "ext-action-state", O1 = "ext-action-invoke", L1 = "svi2-pro:navigate", k1 = "svi2-pro.render";
function qk(e, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: k1,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s()
  }), c = () => {
    e.dispatchEvent(
      new CustomEvent(Uk, { detail: { actions: u() }, bubbles: !1 })
    );
  }, d = () => {
    e.dispatchEvent(
      new CustomEvent(Vk, { detail: { action: s() }, bubbles: !1 })
    );
  }, p = () => c(), m = (g) => {
    g.detail?.id === k1 && w5();
  }, v = E5((g) => {
    r = g.busy, l = g.blocked, d();
  });
  return e.addEventListener(z1, p), e.addEventListener(O1, m), c(), {
    dispose: () => {
      v(), e.removeEventListener(z1, p), e.removeEventListener(O1, m);
    }
  };
}
const pm = "svi2-pro-app", $k = "ext-event", H1 = "svi2-pro-stylesheet", B1 = ["accent", "density", "card"];
function Ik(e) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[e];
}
function Yk() {
  if (typeof document > "u" || document.getElementById(H1)) return;
  const e = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = H1, a.rel = "stylesheet", a.href = e, document.head.appendChild(a);
}
Yk();
class Gk extends HTMLElement {
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
    this.root = i2.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(L1, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = qk(this), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(L1, a);
  }
  syncTweaksFromBody() {
    for (const a of B1) {
      const r = Ik(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: B1.map((a) => `data-${a}`)
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
    const r = IN(Hk(), { initialEntries: [a] });
    this.router = r, this.paintedEntry = a, this.root.render(
      /* @__PURE__ */ y.jsx(S.StrictMode, { children: /* @__PURE__ */ y.jsx(GN, { router: r }) })
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
      new CustomEvent($k, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function Xk() {
  typeof customElements > "u" || customElements.get(pm) || customElements.define(pm, Gk);
}
typeof customElements < "u" && !customElements.get(pm) && Xk();
export {
  Xk as register
};
//# sourceMappingURL=svi2-pro.js.map
