function fT(n, a) {
  for (var r = 0; r < a.length; r++) {
    const s = a[r];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in n)) {
          const f = Object.getOwnPropertyDescriptor(s, o);
          f && Object.defineProperty(n, o, f.get ? f : {
            enumerable: !0,
            get: () => s[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function dT(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Nf = { exports: {} }, Mr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gg;
function hT() {
  if (gg) return Mr;
  gg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(s, o, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      f = {};
      for (var m in o)
        m !== "key" && (f[m] = o[m]);
    } else f = o;
    return o = f.ref, {
      $$typeof: n,
      type: s,
      key: d,
      ref: o !== void 0 ? o : null,
      props: f
    };
  }
  return Mr.Fragment = a, Mr.jsx = r, Mr.jsxs = r, Mr;
}
var vg;
function mT() {
  return vg || (vg = 1, Nf.exports = hT()), Nf.exports;
}
var b = mT(), zf = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bg;
function pT() {
  if (bg) return Ae;
  bg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), d = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function T(w) {
    return w === null || typeof w != "object" ? null : (w = S && w[S] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var R = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, C = Object.assign, N = {};
  function z(w, k, ee) {
    this.props = w, this.context = k, this.refs = N, this.updater = ee || R;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(w, k) {
    if (typeof w != "object" && typeof w != "function" && w != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, w, k, "setState");
  }, z.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function H() {
  }
  H.prototype = z.prototype;
  function B(w, k, ee) {
    this.props = w, this.context = k, this.refs = N, this.updater = ee || R;
  }
  var Q = B.prototype = new H();
  Q.constructor = B, C(Q, z.prototype), Q.isPureReactComponent = !0;
  var $ = Array.isArray;
  function de() {
  }
  var ie = { H: null, A: null, T: null, S: null }, j = Object.prototype.hasOwnProperty;
  function I(w, k, ee) {
    var se = ee.ref;
    return {
      $$typeof: n,
      type: w,
      key: k,
      ref: se !== void 0 ? se : null,
      props: ee
    };
  }
  function te(w, k) {
    return I(w.type, k, w.props);
  }
  function F(w) {
    return typeof w == "object" && w !== null && w.$$typeof === n;
  }
  function P(w) {
    var k = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(ee) {
      return k[ee];
    });
  }
  var ae = /\/+/g;
  function fe(w, k) {
    return typeof w == "object" && w !== null && w.key != null ? P("" + w.key) : k.toString(36);
  }
  function re(w) {
    switch (w.status) {
      case "fulfilled":
        return w.value;
      case "rejected":
        throw w.reason;
      default:
        switch (typeof w.status == "string" ? w.then(de, de) : (w.status = "pending", w.then(
          function(k) {
            w.status === "pending" && (w.status = "fulfilled", w.value = k);
          },
          function(k) {
            w.status === "pending" && (w.status = "rejected", w.reason = k);
          }
        )), w.status) {
          case "fulfilled":
            return w.value;
          case "rejected":
            throw w.reason;
        }
    }
    throw w;
  }
  function U(w, k, ee, se, Te) {
    var Me = typeof w;
    (Me === "undefined" || Me === "boolean") && (w = null);
    var De = !1;
    if (w === null) De = !0;
    else
      switch (Me) {
        case "bigint":
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (w.$$typeof) {
            case n:
            case a:
              De = !0;
              break;
            case g:
              return De = w._init, U(
                De(w._payload),
                k,
                ee,
                se,
                Te
              );
          }
      }
    if (De)
      return Te = Te(w), De = se === "" ? "." + fe(w, 0) : se, $(Te) ? (ee = "", De != null && (ee = De.replace(ae, "$&/") + "/"), U(Te, k, ee, "", function(Wa) {
        return Wa;
      })) : Te != null && (F(Te) && (Te = te(
        Te,
        ee + (Te.key == null || w && w.key === Te.key ? "" : ("" + Te.key).replace(
          ae,
          "$&/"
        ) + "/") + De
      )), k.push(Te)), 1;
    De = 0;
    var mt = se === "" ? "." : se + ":";
    if ($(w))
      for (var Ze = 0; Ze < w.length; Ze++)
        se = w[Ze], Me = mt + fe(se, Ze), De += U(
          se,
          k,
          ee,
          Me,
          Te
        );
    else if (Ze = T(w), typeof Ze == "function")
      for (w = Ze.call(w), Ze = 0; !(se = w.next()).done; )
        se = se.value, Me = mt + fe(se, Ze++), De += U(
          se,
          k,
          ee,
          Me,
          Te
        );
    else if (Me === "object") {
      if (typeof w.then == "function")
        return U(
          re(w),
          k,
          ee,
          se,
          Te
        );
      throw k = String(w), Error(
        "Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function W(w, k, ee) {
    if (w == null) return w;
    var se = [], Te = 0;
    return U(w, se, "", "", function(Me) {
      return k.call(ee, Me, Te++);
    }), se;
  }
  function le(w) {
    if (w._status === -1) {
      var k = w._result;
      k = k(), k.then(
        function(ee) {
          (w._status === 0 || w._status === -1) && (w._status = 1, w._result = ee);
        },
        function(ee) {
          (w._status === 0 || w._status === -1) && (w._status = 2, w._result = ee);
        }
      ), w._status === -1 && (w._status = 0, w._result = k);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var ce = typeof reportError == "function" ? reportError : function(w) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var k = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof w == "object" && w !== null && typeof w.message == "string" ? String(w.message) : String(w),
        error: w
      });
      if (!window.dispatchEvent(k)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", w);
      return;
    }
    console.error(w);
  }, Re = {
    map: W,
    forEach: function(w, k, ee) {
      W(
        w,
        function() {
          k.apply(this, arguments);
        },
        ee
      );
    },
    count: function(w) {
      var k = 0;
      return W(w, function() {
        k++;
      }), k;
    },
    toArray: function(w) {
      return W(w, function(k) {
        return k;
      }) || [];
    },
    only: function(w) {
      if (!F(w))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return w;
    }
  };
  return Ae.Activity = v, Ae.Children = Re, Ae.Component = z, Ae.Fragment = r, Ae.Profiler = o, Ae.PureComponent = B, Ae.StrictMode = s, Ae.Suspense = p, Ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie, Ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(w) {
      return ie.H.useMemoCache(w);
    }
  }, Ae.cache = function(w) {
    return function() {
      return w.apply(null, arguments);
    };
  }, Ae.cacheSignal = function() {
    return null;
  }, Ae.cloneElement = function(w, k, ee) {
    if (w == null)
      throw Error(
        "The argument must be a React element, but you passed " + w + "."
      );
    var se = C({}, w.props), Te = w.key;
    if (k != null)
      for (Me in k.key !== void 0 && (Te = "" + k.key), k)
        !j.call(k, Me) || Me === "key" || Me === "__self" || Me === "__source" || Me === "ref" && k.ref === void 0 || (se[Me] = k[Me]);
    var Me = arguments.length - 2;
    if (Me === 1) se.children = ee;
    else if (1 < Me) {
      for (var De = Array(Me), mt = 0; mt < Me; mt++)
        De[mt] = arguments[mt + 2];
      se.children = De;
    }
    return I(w.type, Te, se);
  }, Ae.createContext = function(w) {
    return w = {
      $$typeof: d,
      _currentValue: w,
      _currentValue2: w,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, w.Provider = w, w.Consumer = {
      $$typeof: f,
      _context: w
    }, w;
  }, Ae.createElement = function(w, k, ee) {
    var se, Te = {}, Me = null;
    if (k != null)
      for (se in k.key !== void 0 && (Me = "" + k.key), k)
        j.call(k, se) && se !== "key" && se !== "__self" && se !== "__source" && (Te[se] = k[se]);
    var De = arguments.length - 2;
    if (De === 1) Te.children = ee;
    else if (1 < De) {
      for (var mt = Array(De), Ze = 0; Ze < De; Ze++)
        mt[Ze] = arguments[Ze + 2];
      Te.children = mt;
    }
    if (w && w.defaultProps)
      for (se in De = w.defaultProps, De)
        Te[se] === void 0 && (Te[se] = De[se]);
    return I(w, Me, Te);
  }, Ae.createRef = function() {
    return { current: null };
  }, Ae.forwardRef = function(w) {
    return { $$typeof: m, render: w };
  }, Ae.isValidElement = F, Ae.lazy = function(w) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: w },
      _init: le
    };
  }, Ae.memo = function(w, k) {
    return {
      $$typeof: h,
      type: w,
      compare: k === void 0 ? null : k
    };
  }, Ae.startTransition = function(w) {
    var k = ie.T, ee = {};
    ie.T = ee;
    try {
      var se = w(), Te = ie.S;
      Te !== null && Te(ee, se), typeof se == "object" && se !== null && typeof se.then == "function" && se.then(de, ce);
    } catch (Me) {
      ce(Me);
    } finally {
      k !== null && ee.types !== null && (k.types = ee.types), ie.T = k;
    }
  }, Ae.unstable_useCacheRefresh = function() {
    return ie.H.useCacheRefresh();
  }, Ae.use = function(w) {
    return ie.H.use(w);
  }, Ae.useActionState = function(w, k, ee) {
    return ie.H.useActionState(w, k, ee);
  }, Ae.useCallback = function(w, k) {
    return ie.H.useCallback(w, k);
  }, Ae.useContext = function(w) {
    return ie.H.useContext(w);
  }, Ae.useDebugValue = function() {
  }, Ae.useDeferredValue = function(w, k) {
    return ie.H.useDeferredValue(w, k);
  }, Ae.useEffect = function(w, k) {
    return ie.H.useEffect(w, k);
  }, Ae.useEffectEvent = function(w) {
    return ie.H.useEffectEvent(w);
  }, Ae.useId = function() {
    return ie.H.useId();
  }, Ae.useImperativeHandle = function(w, k, ee) {
    return ie.H.useImperativeHandle(w, k, ee);
  }, Ae.useInsertionEffect = function(w, k) {
    return ie.H.useInsertionEffect(w, k);
  }, Ae.useLayoutEffect = function(w, k) {
    return ie.H.useLayoutEffect(w, k);
  }, Ae.useMemo = function(w, k) {
    return ie.H.useMemo(w, k);
  }, Ae.useOptimistic = function(w, k) {
    return ie.H.useOptimistic(w, k);
  }, Ae.useReducer = function(w, k, ee) {
    return ie.H.useReducer(w, k, ee);
  }, Ae.useRef = function(w) {
    return ie.H.useRef(w);
  }, Ae.useState = function(w) {
    return ie.H.useState(w);
  }, Ae.useSyncExternalStore = function(w, k, ee) {
    return ie.H.useSyncExternalStore(
      w,
      k,
      ee
    );
  }, Ae.useTransition = function() {
    return ie.H.useTransition();
  }, Ae.version = "19.2.5", Ae;
}
var Sg;
function Yd() {
  return Sg || (Sg = 1, zf.exports = pT()), zf.exports;
}
var E = Yd();
const yT = /* @__PURE__ */ dT(E), gT = /* @__PURE__ */ fT({
  __proto__: null,
  default: yT
}, [E]);
var Of = { exports: {} }, Ar = {}, _f = { exports: {} }, Lf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xg;
function vT() {
  return xg || (xg = 1, (function(n) {
    function a(U, W) {
      var le = U.length;
      U.push(W);
      e: for (; 0 < le; ) {
        var ce = le - 1 >>> 1, Re = U[ce];
        if (0 < o(Re, W))
          U[ce] = W, U[le] = Re, le = ce;
        else break e;
      }
    }
    function r(U) {
      return U.length === 0 ? null : U[0];
    }
    function s(U) {
      if (U.length === 0) return null;
      var W = U[0], le = U.pop();
      if (le !== W) {
        U[0] = le;
        e: for (var ce = 0, Re = U.length, w = Re >>> 1; ce < w; ) {
          var k = 2 * (ce + 1) - 1, ee = U[k], se = k + 1, Te = U[se];
          if (0 > o(ee, le))
            se < Re && 0 > o(Te, ee) ? (U[ce] = Te, U[se] = le, ce = se) : (U[ce] = ee, U[k] = le, ce = k);
          else if (se < Re && 0 > o(Te, le))
            U[ce] = Te, U[se] = le, ce = se;
          else break e;
        }
      }
      return W;
    }
    function o(U, W) {
      var le = U.sortIndex - W.sortIndex;
      return le !== 0 ? le : U.id - W.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, m = d.now();
      n.unstable_now = function() {
        return d.now() - m;
      };
    }
    var p = [], h = [], g = 1, v = null, S = 3, T = !1, R = !1, C = !1, N = !1, z = typeof setTimeout == "function" ? setTimeout : null, H = typeof clearTimeout == "function" ? clearTimeout : null, B = typeof setImmediate < "u" ? setImmediate : null;
    function Q(U) {
      for (var W = r(h); W !== null; ) {
        if (W.callback === null) s(h);
        else if (W.startTime <= U)
          s(h), W.sortIndex = W.expirationTime, a(p, W);
        else break;
        W = r(h);
      }
    }
    function $(U) {
      if (C = !1, Q(U), !R)
        if (r(p) !== null)
          R = !0, de || (de = !0, P());
        else {
          var W = r(h);
          W !== null && re($, W.startTime - U);
        }
    }
    var de = !1, ie = -1, j = 5, I = -1;
    function te() {
      return N ? !0 : !(n.unstable_now() - I < j);
    }
    function F() {
      if (N = !1, de) {
        var U = n.unstable_now();
        I = U;
        var W = !0;
        try {
          e: {
            R = !1, C && (C = !1, H(ie), ie = -1), T = !0;
            var le = S;
            try {
              t: {
                for (Q(U), v = r(p); v !== null && !(v.expirationTime > U && te()); ) {
                  var ce = v.callback;
                  if (typeof ce == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var Re = ce(
                      v.expirationTime <= U
                    );
                    if (U = n.unstable_now(), typeof Re == "function") {
                      v.callback = Re, Q(U), W = !0;
                      break t;
                    }
                    v === r(p) && s(p), Q(U);
                  } else s(p);
                  v = r(p);
                }
                if (v !== null) W = !0;
                else {
                  var w = r(h);
                  w !== null && re(
                    $,
                    w.startTime - U
                  ), W = !1;
                }
              }
              break e;
            } finally {
              v = null, S = le, T = !1;
            }
            W = void 0;
          }
        } finally {
          W ? P() : de = !1;
        }
      }
    }
    var P;
    if (typeof B == "function")
      P = function() {
        B(F);
      };
    else if (typeof MessageChannel < "u") {
      var ae = new MessageChannel(), fe = ae.port2;
      ae.port1.onmessage = F, P = function() {
        fe.postMessage(null);
      };
    } else
      P = function() {
        z(F, 0);
      };
    function re(U, W) {
      ie = z(function() {
        U(n.unstable_now());
      }, W);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, n.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : j = 0 < U ? Math.floor(1e3 / U) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(U) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var W = 3;
          break;
        default:
          W = S;
      }
      var le = S;
      S = W;
      try {
        return U();
      } finally {
        S = le;
      }
    }, n.unstable_requestPaint = function() {
      N = !0;
    }, n.unstable_runWithPriority = function(U, W) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var le = S;
      S = U;
      try {
        return W();
      } finally {
        S = le;
      }
    }, n.unstable_scheduleCallback = function(U, W, le) {
      var ce = n.unstable_now();
      switch (typeof le == "object" && le !== null ? (le = le.delay, le = typeof le == "number" && 0 < le ? ce + le : ce) : le = ce, U) {
        case 1:
          var Re = -1;
          break;
        case 2:
          Re = 250;
          break;
        case 5:
          Re = 1073741823;
          break;
        case 4:
          Re = 1e4;
          break;
        default:
          Re = 5e3;
      }
      return Re = le + Re, U = {
        id: g++,
        callback: W,
        priorityLevel: U,
        startTime: le,
        expirationTime: Re,
        sortIndex: -1
      }, le > ce ? (U.sortIndex = le, a(h, U), r(p) === null && U === r(h) && (C ? (H(ie), ie = -1) : C = !0, re($, le - ce))) : (U.sortIndex = Re, a(p, U), R || T || (R = !0, de || (de = !0, P()))), U;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(U) {
      var W = S;
      return function() {
        var le = S;
        S = W;
        try {
          return U.apply(this, arguments);
        } finally {
          S = le;
        }
      };
    };
  })(Lf)), Lf;
}
var Tg;
function bT() {
  return Tg || (Tg = 1, _f.exports = vT()), _f.exports;
}
var Vf = { exports: {} }, Vt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eg;
function ST() {
  if (Eg) return Vt;
  Eg = 1;
  var n = Yd();
  function a(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        h += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var s = {
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
  }, o = Symbol.for("react.portal");
  function f(p, h, g) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: h,
      implementation: g
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Vt.createPortal = function(p, h) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(a(299));
    return f(p, h, null, g);
  }, Vt.flushSync = function(p) {
    var h = d.T, g = s.p;
    try {
      if (d.T = null, s.p = 2, p) return p();
    } finally {
      d.T = h, s.p = g, s.d.f();
    }
  }, Vt.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, s.d.C(p, h));
  }, Vt.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, Vt.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var g = h.as, v = m(g, h.crossOrigin), S = typeof h.integrity == "string" ? h.integrity : void 0, T = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      g === "style" ? s.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: T
        }
      ) : g === "script" && s.d.X(p, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: T,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Vt.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var g = m(
            h.as,
            h.crossOrigin
          );
          s.d.M(p, {
            crossOrigin: g,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && s.d.M(p);
  }, Vt.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var g = h.as, v = m(g, h.crossOrigin);
      s.d.L(p, g, {
        crossOrigin: v,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, Vt.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var g = m(h.as, h.crossOrigin);
        s.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: g,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else s.d.m(p);
  }, Vt.requestFormReset = function(p) {
    s.d.r(p);
  }, Vt.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, Vt.useFormState = function(p, h, g) {
    return d.H.useFormState(p, h, g);
  }, Vt.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Vt.version = "19.2.5", Vt;
}
var Rg;
function xT() {
  if (Rg) return Vf.exports;
  Rg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Vf.exports = ST(), Vf.exports;
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
var Mg;
function TT() {
  if (Mg) return Ar;
  Mg = 1;
  var n = bT(), a = Yd(), r = xT();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        t += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function f(e) {
    var t = e, i = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (i = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? i : null;
  }
  function d(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (f(e) !== e)
      throw Error(s(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = f(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var i = e, l = t; ; ) {
      var u = i.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (l = u.return, l !== null) {
          i = l;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === i) return p(u), e;
          if (c === l) return p(u), t;
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== l.return) i = u, l = c;
      else {
        for (var y = !1, x = u.child; x; ) {
          if (x === i) {
            y = !0, i = u, l = c;
            break;
          }
          if (x === l) {
            y = !0, l = u, i = c;
            break;
          }
          x = x.sibling;
        }
        if (!y) {
          for (x = c.child; x; ) {
            if (x === i) {
              y = !0, i = c, l = u;
              break;
            }
            if (x === l) {
              y = !0, l = c, i = u;
              break;
            }
            x = x.sibling;
          }
          if (!y) throw Error(s(189));
        }
      }
      if (i.alternate !== l) throw Error(s(190));
    }
    if (i.tag !== 3) throw Error(s(188));
    return i.stateNode.current === i ? e : t;
  }
  function g(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = g(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, S = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), z = Symbol.for("react.profiler"), H = Symbol.for("react.consumer"), B = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), de = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
  function P(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ae = Symbol.for("react.client.reference");
  function fe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ae ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case z:
        return "Profiler";
      case N:
        return "StrictMode";
      case $:
        return "Suspense";
      case de:
        return "SuspenseList";
      case I:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case R:
          return "Portal";
        case B:
          return e.displayName || "Context";
        case H:
          return (e._context.displayName || "Context") + ".Consumer";
        case Q:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ie:
          return t = e.displayName || null, t !== null ? t : fe(e.type) || "Memo";
        case j:
          t = e._payload, e = e._init;
          try {
            return fe(e(t));
          } catch {
          }
      }
    return null;
  }
  var re = Array.isArray, U = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, le = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ce = [], Re = -1;
  function w(e) {
    return { current: e };
  }
  function k(e) {
    0 > Re || (e.current = ce[Re], ce[Re] = null, Re--);
  }
  function ee(e, t) {
    Re++, ce[Re] = e.current, e.current = t;
  }
  var se = w(null), Te = w(null), Me = w(null), De = w(null);
  function mt(e, t) {
    switch (ee(Me, t), ee(Te, e), ee(se, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? qy(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = qy(t), e = Yy(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    k(se), ee(se, e);
  }
  function Ze() {
    k(se), k(Te), k(Me);
  }
  function Wa(e) {
    e.memoizedState !== null && ee(De, e);
    var t = se.current, i = Yy(t, e.type);
    t !== i && (ee(Te, e), ee(se, i));
  }
  function zi(e) {
    Te.current === e && (k(se), k(Te)), De.current === e && (k(De), xr._currentValue = le);
  }
  var zl, Tt;
  function Pt(e) {
    if (zl === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        zl = t && t[1] || "", Tt = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + zl + e + Tt;
  }
  var Oi = !1;
  function Ol(e, t) {
    if (!e || Oi) return "";
    Oi = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var Z = function() {
                throw Error();
              };
              if (Object.defineProperty(Z.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Z, []);
                } catch (G) {
                  var Y = G;
                }
                Reflect.construct(e, [], Z);
              } else {
                try {
                  Z.call();
                } catch (G) {
                  Y = G;
                }
                e.call(Z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (G) {
                Y = G;
              }
              (Z = e()) && typeof Z.catch == "function" && Z.catch(function() {
              });
            }
          } catch (G) {
            if (G && Y && typeof G.stack == "string")
              return [G.stack, Y.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = l.DetermineComponentFrameRoot(), y = c[0], x = c[1];
      if (y && x) {
        var M = y.split(`
`), V = x.split(`
`);
        for (u = l = 0; l < M.length && !M[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < V.length && !V[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === M.length || u === V.length)
          for (l = M.length - 1, u = V.length - 1; 1 <= l && 0 <= u && M[l] !== V[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (M[l] !== V[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || M[l] !== V[u]) {
                  var X = `
` + M[l].replace(" at new ", " at ");
                  return e.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", e.displayName)), X;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Oi = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Pt(i) : "";
  }
  function Xn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Pt(e.type);
      case 16:
        return Pt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Pt("Suspense Fallback") : Pt("Suspense");
      case 19:
        return Pt("SuspenseList");
      case 0:
      case 15:
        return Ol(e.type, !1);
      case 11:
        return Ol(e.type.render, !1);
      case 1:
        return Ol(e.type, !0);
      case 31:
        return Pt("Activity");
      default:
        return "";
    }
  }
  function us(e) {
    try {
      var t = "", i = null;
      do
        t += Xn(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var _l = Object.prototype.hasOwnProperty, _i = n.unstable_scheduleCallback, Ll = n.unstable_cancelCallback, bu = n.unstable_shouldYield, Su = n.unstable_requestPaint, Bt = n.unstable_now, Fn = n.unstable_getCurrentPriorityLevel, pa = n.unstable_ImmediatePriority, Vl = n.unstable_UserBlockingPriority, ya = n.unstable_NormalPriority, En = n.unstable_LowPriority, sn = n.unstable_IdlePriority, cs = n.log, xu = n.unstable_setDisableYieldValue, Kn = null, Ht = null;
  function Mt(e) {
    if (typeof cs == "function" && xu(e), Ht && typeof Ht.setStrictMode == "function")
      try {
        Ht.setStrictMode(Kn, e);
      } catch {
      }
  }
  var _t = Math.clz32 ? Math.clz32 : Tu, fs = Math.log, ds = Math.LN2;
  function Tu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (fs(e) / ds | 0) | 0;
  }
  var ei = 256, Qn = 262144, ti = 4194304;
  function Rn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function Li(e, t, i) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, c = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var x = l & 134217727;
    return x !== 0 ? (l = x & ~c, l !== 0 ? u = Rn(l) : (y &= x, y !== 0 ? u = Rn(y) : i || (i = x & ~e, i !== 0 && (u = Rn(i))))) : (x = l & ~c, x !== 0 ? u = Rn(x) : y !== 0 ? u = Rn(y) : i || (i = l & ~e, i !== 0 && (u = Rn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & c) === 0 && (c = u & -u, i = t & -t, c >= i || c === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function ga(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Eu(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
  function Ul() {
    var e = ti;
    return ti <<= 1, (ti & 62914560) === 0 && (ti = 4194304), e;
  }
  function va(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function On(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function hs(e, t, i, l, u, c) {
    var y = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var x = e.entanglements, M = e.expirationTimes, V = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var X = 31 - _t(i), Z = 1 << X;
      x[X] = 0, M[X] = -1;
      var Y = V[X];
      if (Y !== null)
        for (V[X] = null, X = 0; X < Y.length; X++) {
          var G = Y[X];
          G !== null && (G.lane &= -536870913);
        }
      i &= ~Z;
    }
    l !== 0 && ms(e, l, 0), c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(y & ~t));
  }
  function ms(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - _t(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function ps(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var l = 31 - _t(i), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), i &= ~u;
    }
  }
  function A(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : O(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function O(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function q(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function J() {
    var e = W.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : cg(e.type));
  }
  function ne(e, t) {
    var i = W.p;
    try {
      return W.p = e, t();
    } finally {
      W.p = i;
    }
  }
  var pe = Math.random().toString(36).slice(2), oe = "__reactFiber$" + pe, ue = "__reactProps$" + pe, ge = "__reactContainer$" + pe, he = "__reactEvents$" + pe, xe = "__reactListeners$" + pe, be = "__reactHandles$" + pe, He = "__reactResources$" + pe, je = "__reactMarker$" + pe;
  function $e(e) {
    delete e[oe], delete e[ue], delete e[he], delete e[xe], delete e[be];
  }
  function Xe(e) {
    var t = e[oe];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[ge] || i[oe]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = Qy(e); e !== null; ) {
            if (i = e[oe]) return i;
            e = Qy(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function it(e) {
    if (e = e[oe] || e[ge]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Oe(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function pt(e) {
    var t = e[He];
    return t || (t = e[He] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function We(e) {
    e[je] = !0;
  }
  var ba = /* @__PURE__ */ new Set(), Mn = {};
  function At(e, t) {
    _n(e, t), _n(e + "Capture", t);
  }
  function _n(e, t) {
    for (Mn[e] = t, e = 0; e < t.length; e++)
      ba.add(t[e]);
  }
  var ni = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ln = {}, ai = {};
  function Vi(e) {
    return _l.call(ai, e) ? !0 : _l.call(Ln, e) ? !1 : ni.test(e) ? ai[e] = !0 : (Ln[e] = !0, !1);
  }
  function Ne(e, t, i) {
    if (Vi(t))
      if (i === null) e.removeAttribute(t);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + i);
      }
  }
  function ct(e, t, i) {
    if (i === null) e.removeAttribute(t);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + i);
    }
  }
  function Lt(e, t, i, l) {
    if (l === null) e.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(t, i, "" + l);
    }
  }
  function yt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function et(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ui(e, t, i) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get, c = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(y) {
          i = "" + y, c.call(this, y);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(y) {
          i = "" + y;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Bi(e) {
    if (!e._valueTracker) {
      var t = et(e) ? "checked" : "value";
      e._valueTracker = Ui(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function ys(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), l = "";
    return e && (l = et(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (t.setValue(e), !0) : !1;
  }
  function gs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var l1 = /[\n"\\]/g;
  function on(e) {
    return e.replace(
      l1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ru(e, t, i, l, u, c, y, x) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? Mu(e, y, yt(t)) : i != null ? Mu(e, y, yt(i)) : l != null && e.removeAttribute("value"), u == null && c != null && (e.defaultChecked = !!c), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + yt(x) : e.removeAttribute("name");
  }
  function _h(e, t, i, l, u, c, y, x) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || i != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        Bi(e);
        return;
      }
      i = i != null ? "" + yt(i) : "", t = t != null ? "" + yt(t) : i, x || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = x ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), Bi(e);
  }
  function Mu(e, t, i) {
    t === "number" && gs(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Hi(e, t, i, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && l && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + yt(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Lh(e, t, i) {
    if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + yt(i) : "";
  }
  function Vh(e, t, i, l) {
    if (t == null) {
      if (l != null) {
        if (i != null) throw Error(s(92));
        if (re(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        i = l;
      }
      i == null && (i = ""), t = i;
    }
    i = yt(t), e.defaultValue = i, l = e.textContent, l === i && l !== "" && l !== null && (e.value = l), Bi(e);
  }
  function qi(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var r1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Uh(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || r1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Bh(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && Uh(e, u, l);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Uh(e, c, t[c]);
  }
  function Au(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
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
  var s1 = /* @__PURE__ */ new Map([
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
  ]), o1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function vs(e) {
    return o1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Zn() {
  }
  var Cu = null;
  function wu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Yi = null, Gi = null;
  function Hh(e) {
    var t = it(e);
    if (t && (e = t.stateNode)) {
      var i = e[ue] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ru(
            e,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), t = i.name, i.type === "radio" && t != null) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + on(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var l = i[t];
              if (l !== e && l.form === e.form) {
                var u = l[ue] || null;
                if (!u) throw Error(s(90));
                Ru(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < i.length; t++)
              l = i[t], l.form === e.form && ys(l);
          }
          break e;
        case "textarea":
          Lh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && Hi(e, !!i.multiple, t, !1);
      }
    }
  }
  var Du = !1;
  function qh(e, t, i) {
    if (Du) return e(t, i);
    Du = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Du = !1, (Yi !== null || Gi !== null) && (lo(), Yi && (t = Yi, e = Gi, Gi = Yi = null, Hh(t), e)))
        for (t = 0; t < e.length; t++) Hh(e[t]);
    }
  }
  function Bl(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[ue] || null;
    if (l === null) return null;
    i = l[t];
    e: switch (t) {
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
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function")
      throw Error(
        s(231, t, typeof i)
      );
    return i;
  }
  var $n = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ju = !1;
  if ($n)
    try {
      var Hl = {};
      Object.defineProperty(Hl, "passive", {
        get: function() {
          ju = !0;
        }
      }), window.addEventListener("test", Hl, Hl), window.removeEventListener("test", Hl, Hl);
    } catch {
      ju = !1;
    }
  var Sa = null, Nu = null, bs = null;
  function Yh() {
    if (bs) return bs;
    var e, t = Nu, i = t.length, l, u = "value" in Sa ? Sa.value : Sa.textContent, c = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[c - l]; l++) ;
    return bs = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ss(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function xs() {
    return !0;
  }
  function Gh() {
    return !1;
  }
  function kt(e) {
    function t(i, l, u, c, y) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = c, this.target = y, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (i = e[x], this[x] = i ? i(c) : c[x]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? xs : Gh, this.isPropagationStopped = Gh, this;
    }
    return v(t.prototype, {
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
    }), t;
  }
  var ii = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ts = kt(ii), ql = v({}, ii, { view: 0, detail: 0 }), u1 = kt(ql), zu, Ou, Yl, Es = v({}, ql, {
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
    getModifierState: Lu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Yl && (Yl && e.type === "mousemove" ? (zu = e.screenX - Yl.screenX, Ou = e.screenY - Yl.screenY) : Ou = zu = 0, Yl = e), zu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ou;
    }
  }), Ph = kt(Es), c1 = v({}, Es, { dataTransfer: 0 }), f1 = kt(c1), d1 = v({}, ql, { relatedTarget: 0 }), _u = kt(d1), h1 = v({}, ii, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), m1 = kt(h1), p1 = v({}, ii, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), y1 = kt(p1), g1 = v({}, ii, { data: 0 }), kh = kt(g1), v1 = {
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
  }, b1 = {
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
  }, S1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function x1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = S1[e]) ? !!t[e] : !1;
  }
  function Lu() {
    return x1;
  }
  var T1 = v({}, ql, {
    key: function(e) {
      if (e.key) {
        var t = v1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ss(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? b1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Lu,
    charCode: function(e) {
      return e.type === "keypress" ? Ss(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ss(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), E1 = kt(T1), R1 = v({}, Es, {
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
  }), Xh = kt(R1), M1 = v({}, ql, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Lu
  }), A1 = kt(M1), C1 = v({}, ii, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), w1 = kt(C1), D1 = v({}, Es, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), j1 = kt(D1), N1 = v({}, ii, {
    newState: 0,
    oldState: 0
  }), z1 = kt(N1), O1 = [9, 13, 27, 32], Vu = $n && "CompositionEvent" in window, Gl = null;
  $n && "documentMode" in document && (Gl = document.documentMode);
  var _1 = $n && "TextEvent" in window && !Gl, Fh = $n && (!Vu || Gl && 8 < Gl && 11 >= Gl), Kh = " ", Qh = !1;
  function Zh(e, t) {
    switch (e) {
      case "keyup":
        return O1.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function $h(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Pi = !1;
  function L1(e, t) {
    switch (e) {
      case "compositionend":
        return $h(t);
      case "keypress":
        return t.which !== 32 ? null : (Qh = !0, Kh);
      case "textInput":
        return e = t.data, e === Kh && Qh ? null : e;
      default:
        return null;
    }
  }
  function V1(e, t) {
    if (Pi)
      return e === "compositionend" || !Vu && Zh(e, t) ? (e = Yh(), bs = Nu = Sa = null, Pi = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Fh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var U1 = {
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
  function Jh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!U1[e.type] : t === "textarea";
  }
  function Ih(e, t, i, l) {
    Yi ? Gi ? Gi.push(l) : Gi = [l] : Yi = l, t = ho(t, "onChange"), 0 < t.length && (i = new Ts(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var Pl = null, kl = null;
  function B1(e) {
    _y(e, 0);
  }
  function Rs(e) {
    var t = Oe(e);
    if (ys(t)) return e;
  }
  function Wh(e, t) {
    if (e === "change") return t;
  }
  var em = !1;
  if ($n) {
    var Uu;
    if ($n) {
      var Bu = "oninput" in document;
      if (!Bu) {
        var tm = document.createElement("div");
        tm.setAttribute("oninput", "return;"), Bu = typeof tm.oninput == "function";
      }
      Uu = Bu;
    } else Uu = !1;
    em = Uu && (!document.documentMode || 9 < document.documentMode);
  }
  function nm() {
    Pl && (Pl.detachEvent("onpropertychange", am), kl = Pl = null);
  }
  function am(e) {
    if (e.propertyName === "value" && Rs(kl)) {
      var t = [];
      Ih(
        t,
        kl,
        e,
        wu(e)
      ), qh(B1, t);
    }
  }
  function H1(e, t, i) {
    e === "focusin" ? (nm(), Pl = t, kl = i, Pl.attachEvent("onpropertychange", am)) : e === "focusout" && nm();
  }
  function q1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Rs(kl);
  }
  function Y1(e, t) {
    if (e === "click") return Rs(t);
  }
  function G1(e, t) {
    if (e === "input" || e === "change")
      return Rs(t);
  }
  function P1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var It = typeof Object.is == "function" ? Object.is : P1;
  function Xl(e, t) {
    if (It(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!_l.call(t, u) || !It(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function im(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function lm(e, t) {
    var i = im(e);
    e = 0;
    for (var l; i; ) {
      if (i.nodeType === 3) {
        if (l = e + i.textContent.length, e <= t && l >= t)
          return { node: i, offset: t - e };
        e = l;
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
      i = im(i);
    }
  }
  function rm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? rm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function sm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = gs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = gs(e.document);
    }
    return t;
  }
  function Hu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var k1 = $n && "documentMode" in document && 11 >= document.documentMode, ki = null, qu = null, Fl = null, Yu = !1;
  function om(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Yu || ki == null || ki !== gs(l) || (l = ki, "selectionStart" in l && Hu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Fl && Xl(Fl, l) || (Fl = l, l = ho(qu, "onSelect"), 0 < l.length && (t = new Ts(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: l }), t.target = ki)));
  }
  function li(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var Xi = {
    animationend: li("Animation", "AnimationEnd"),
    animationiteration: li("Animation", "AnimationIteration"),
    animationstart: li("Animation", "AnimationStart"),
    transitionrun: li("Transition", "TransitionRun"),
    transitionstart: li("Transition", "TransitionStart"),
    transitioncancel: li("Transition", "TransitionCancel"),
    transitionend: li("Transition", "TransitionEnd")
  }, Gu = {}, um = {};
  $n && (um = document.createElement("div").style, "AnimationEvent" in window || (delete Xi.animationend.animation, delete Xi.animationiteration.animation, delete Xi.animationstart.animation), "TransitionEvent" in window || delete Xi.transitionend.transition);
  function ri(e) {
    if (Gu[e]) return Gu[e];
    if (!Xi[e]) return e;
    var t = Xi[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in um)
        return Gu[e] = t[i];
    return e;
  }
  var cm = ri("animationend"), fm = ri("animationiteration"), dm = ri("animationstart"), X1 = ri("transitionrun"), F1 = ri("transitionstart"), K1 = ri("transitioncancel"), hm = ri("transitionend"), mm = /* @__PURE__ */ new Map(), Pu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Pu.push("scrollEnd");
  function An(e, t) {
    mm.set(e, t), At(t, [e]);
  }
  var Ms = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, un = [], Fi = 0, ku = 0;
  function As() {
    for (var e = Fi, t = ku = Fi = 0; t < e; ) {
      var i = un[t];
      un[t++] = null;
      var l = un[t];
      un[t++] = null;
      var u = un[t];
      un[t++] = null;
      var c = un[t];
      if (un[t++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      c !== 0 && pm(i, u, c);
    }
  }
  function Cs(e, t, i, l) {
    un[Fi++] = e, un[Fi++] = t, un[Fi++] = i, un[Fi++] = l, ku |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Xu(e, t, i, l) {
    return Cs(e, t, i, l), ws(e);
  }
  function si(e, t) {
    return Cs(e, null, null, t), ws(e);
  }
  function pm(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, c = e.return; c !== null; )
      c.childLanes |= i, l = c.alternate, l !== null && (l.childLanes |= i), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (u = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, u && t !== null && (u = 31 - _t(i), e = c.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), c) : null;
  }
  function ws(e) {
    if (50 < mr)
      throw mr = 0, ef = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ki = {};
  function Q1(e, t, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Wt(e, t, i, l) {
    return new Q1(e, t, i, l);
  }
  function Fu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Jn(e, t) {
    var i = e.alternate;
    return i === null ? (i = Wt(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function ym(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ds(e, t, i, l, u, c) {
    var y = 0;
    if (l = e, typeof e == "function") Fu(e) && (y = 1);
    else if (typeof e == "string")
      y = Wx(
        e,
        i,
        se.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case I:
          return e = Wt(31, i, t, u), e.elementType = I, e.lanes = c, e;
        case C:
          return oi(i.children, u, c, t);
        case N:
          y = 8, u |= 24;
          break;
        case z:
          return e = Wt(12, i, t, u | 2), e.elementType = z, e.lanes = c, e;
        case $:
          return e = Wt(13, i, t, u), e.elementType = $, e.lanes = c, e;
        case de:
          return e = Wt(19, i, t, u), e.elementType = de, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case B:
                y = 10;
                break e;
              case H:
                y = 9;
                break e;
              case Q:
                y = 11;
                break e;
              case ie:
                y = 14;
                break e;
              case j:
                y = 16, l = null;
                break e;
            }
          y = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Wt(y, i, t, u), t.elementType = e, t.type = l, t.lanes = c, t;
  }
  function oi(e, t, i, l) {
    return e = Wt(7, e, l, t), e.lanes = i, e;
  }
  function Ku(e, t, i) {
    return e = Wt(6, e, null, t), e.lanes = i, e;
  }
  function gm(e) {
    var t = Wt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Qu(e, t, i) {
    return t = Wt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = i, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var vm = /* @__PURE__ */ new WeakMap();
  function cn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = vm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: us(t)
      }, vm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: us(t)
    };
  }
  var Qi = [], Zi = 0, js = null, Kl = 0, fn = [], dn = 0, xa = null, Vn = 1, Un = "";
  function In(e, t) {
    Qi[Zi++] = Kl, Qi[Zi++] = js, js = e, Kl = t;
  }
  function bm(e, t, i) {
    fn[dn++] = Vn, fn[dn++] = Un, fn[dn++] = xa, xa = e;
    var l = Vn;
    e = Un;
    var u = 32 - _t(l) - 1;
    l &= ~(1 << u), i += 1;
    var c = 32 - _t(t) + u;
    if (30 < c) {
      var y = u - u % 5;
      c = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, Vn = 1 << 32 - _t(t) + u | i << u | l, Un = c + e;
    } else
      Vn = 1 << c | i << u | l, Un = e;
  }
  function Zu(e) {
    e.return !== null && (In(e, 1), bm(e, 1, 0));
  }
  function $u(e) {
    for (; e === js; )
      js = Qi[--Zi], Qi[Zi] = null, Kl = Qi[--Zi], Qi[Zi] = null;
    for (; e === xa; )
      xa = fn[--dn], fn[dn] = null, Un = fn[--dn], fn[dn] = null, Vn = fn[--dn], fn[dn] = null;
  }
  function Sm(e, t) {
    fn[dn++] = Vn, fn[dn++] = Un, fn[dn++] = xa, Vn = t.id, Un = t.overflow, xa = e;
  }
  var wt = null, tt = null, Be = !1, Ta = null, hn = !1, Ju = Error(s(519));
  function Ea(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ql(cn(t, e)), Ju;
  }
  function xm(e) {
    var t = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (t[oe] = e, t[ue] = l, i) {
      case "dialog":
        Le("cancel", t), Le("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Le("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < yr.length; i++)
          Le(yr[i], t);
        break;
      case "source":
        Le("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Le("error", t), Le("load", t);
        break;
      case "details":
        Le("toggle", t);
        break;
      case "input":
        Le("invalid", t), _h(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        Le("invalid", t);
        break;
      case "textarea":
        Le("invalid", t), Vh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || By(t.textContent, i) ? (l.popover != null && (Le("beforetoggle", t), Le("toggle", t)), l.onScroll != null && Le("scroll", t), l.onScrollEnd != null && Le("scrollend", t), l.onClick != null && (t.onclick = Zn), t = !0) : t = !1, t || Ea(e, !0);
  }
  function Tm(e) {
    for (wt = e.return; wt; )
      switch (wt.tag) {
        case 5:
        case 31:
        case 13:
          hn = !1;
          return;
        case 27:
        case 3:
          hn = !0;
          return;
        default:
          wt = wt.return;
      }
  }
  function $i(e) {
    if (e !== wt) return !1;
    if (!Be) return Tm(e), Be = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || yf(e.type, e.memoizedProps)), i = !i), i && tt && Ea(e), Tm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = Ky(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = Ky(e);
    } else
      t === 27 ? (t = tt, Ua(e.type) ? (e = xf, xf = null, tt = e) : tt = t) : tt = wt ? pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ui() {
    tt = wt = null, Be = !1;
  }
  function Iu() {
    var e = Ta;
    return e !== null && (Qt === null ? Qt = e : Qt.push.apply(
      Qt,
      e
    ), Ta = null), e;
  }
  function Ql(e) {
    Ta === null ? Ta = [e] : Ta.push(e);
  }
  var Wu = w(null), ci = null, Wn = null;
  function Ra(e, t, i) {
    ee(Wu, t._currentValue), t._currentValue = i;
  }
  function ea(e) {
    e._currentValue = Wu.current, k(Wu);
  }
  function ec(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function tc(e, t, i, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var y = u.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var x = c;
          c = u;
          for (var M = 0; M < t.length; M++)
            if (x.context === t[M]) {
              c.lanes |= i, x = c.alternate, x !== null && (x.lanes |= i), ec(
                c.return,
                i,
                e
              ), l || (y = null);
              break e;
            }
          c = x.next;
        }
      } else if (u.tag === 18) {
        if (y = u.return, y === null) throw Error(s(341));
        y.lanes |= i, c = y.alternate, c !== null && (c.lanes |= i), ec(y, i, e), y = null;
      } else y = u.child;
      if (y !== null) y.return = u;
      else
        for (y = u; y !== null; ) {
          if (y === e) {
            y = null;
            break;
          }
          if (u = y.sibling, u !== null) {
            u.return = y.return, y = u;
            break;
          }
          y = y.return;
        }
      u = y;
    }
  }
  function Ji(e, t, i, l) {
    e = null;
    for (var u = t, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(s(387));
        if (y = y.memoizedProps, y !== null) {
          var x = u.type;
          It(u.pendingProps.value, y.value) || (e !== null ? e.push(x) : e = [x]);
        }
      } else if (u === De.current) {
        if (y = u.alternate, y === null) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(xr) : e = [xr]);
      }
      u = u.return;
    }
    e !== null && tc(
      t,
      e,
      i,
      l
    ), t.flags |= 262144;
  }
  function Ns(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!It(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function fi(e) {
    ci = e, Wn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Dt(e) {
    return Em(ci, e);
  }
  function zs(e, t) {
    return ci === null && fi(e), Em(e, t);
  }
  function Em(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, Wn === null) {
      if (e === null) throw Error(s(308));
      Wn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Wn = Wn.next = t;
    return i;
  }
  var Z1 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(i, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, $1 = n.unstable_scheduleCallback, J1 = n.unstable_NormalPriority, gt = {
    $$typeof: B,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function nc() {
    return {
      controller: new Z1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Zl(e) {
    e.refCount--, e.refCount === 0 && $1(J1, function() {
      e.controller.abort();
    });
  }
  var $l = null, ac = 0, Ii = 0, Wi = null;
  function I1(e, t) {
    if ($l === null) {
      var i = $l = [];
      ac = 0, Ii = sf(), Wi = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return ac++, t.then(Rm, Rm), t;
  }
  function Rm() {
    if (--ac === 0 && $l !== null) {
      Wi !== null && (Wi.status = "fulfilled");
      var e = $l;
      $l = null, Ii = 0, Wi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function W1(e, t) {
    var i = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        i.push(u);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var u = 0; u < i.length; u++) (0, i[u])(t);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < i.length; u++)
          (0, i[u])(void 0);
      }
    ), l;
  }
  var Mm = U.S;
  U.S = function(e, t) {
    oy = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && I1(e, t), Mm !== null && Mm(e, t);
  };
  var di = w(null);
  function ic() {
    var e = di.current;
    return e !== null ? e : Je.pooledCache;
  }
  function Os(e, t) {
    t === null ? ee(di, di.current) : ee(di, t.pool);
  }
  function Am() {
    var e = ic();
    return e === null ? null : { parent: gt._currentValue, pool: e };
  }
  var el = Error(s(460)), lc = Error(s(474)), _s = Error(s(542)), Ls = { then: function() {
  } };
  function Cm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function wm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(Zn, Zn), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, jm(e), e;
      default:
        if (typeof t.status == "string") t.then(Zn, Zn);
        else {
          if (e = Je, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, jm(e), e;
        }
        throw mi = t, el;
    }
  }
  function hi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (mi = i, el) : i;
    }
  }
  var mi = null;
  function Dm() {
    if (mi === null) throw Error(s(459));
    var e = mi;
    return mi = null, e;
  }
  function jm(e) {
    if (e === el || e === _s)
      throw Error(s(483));
  }
  var tl = null, Jl = 0;
  function Vs(e) {
    var t = Jl;
    return Jl += 1, tl === null && (tl = []), wm(tl, e, t);
  }
  function Il(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Us(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Nm(e) {
    function t(_, D) {
      if (e) {
        var L = _.deletions;
        L === null ? (_.deletions = [D], _.flags |= 16) : L.push(D);
      }
    }
    function i(_, D) {
      if (!e) return null;
      for (; D !== null; )
        t(_, D), D = D.sibling;
      return null;
    }
    function l(_) {
      for (var D = /* @__PURE__ */ new Map(); _ !== null; )
        _.key !== null ? D.set(_.key, _) : D.set(_.index, _), _ = _.sibling;
      return D;
    }
    function u(_, D) {
      return _ = Jn(_, D), _.index = 0, _.sibling = null, _;
    }
    function c(_, D, L) {
      return _.index = L, e ? (L = _.alternate, L !== null ? (L = L.index, L < D ? (_.flags |= 67108866, D) : L) : (_.flags |= 67108866, D)) : (_.flags |= 1048576, D);
    }
    function y(_) {
      return e && _.alternate === null && (_.flags |= 67108866), _;
    }
    function x(_, D, L, K) {
      return D === null || D.tag !== 6 ? (D = Ku(L, _.mode, K), D.return = _, D) : (D = u(D, L), D.return = _, D);
    }
    function M(_, D, L, K) {
      var Se = L.type;
      return Se === C ? X(
        _,
        D,
        L.props.children,
        K,
        L.key
      ) : D !== null && (D.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === j && hi(Se) === D.type) ? (D = u(D, L.props), Il(D, L), D.return = _, D) : (D = Ds(
        L.type,
        L.key,
        L.props,
        null,
        _.mode,
        K
      ), Il(D, L), D.return = _, D);
    }
    function V(_, D, L, K) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== L.containerInfo || D.stateNode.implementation !== L.implementation ? (D = Qu(L, _.mode, K), D.return = _, D) : (D = u(D, L.children || []), D.return = _, D);
    }
    function X(_, D, L, K, Se) {
      return D === null || D.tag !== 7 ? (D = oi(
        L,
        _.mode,
        K,
        Se
      ), D.return = _, D) : (D = u(D, L), D.return = _, D);
    }
    function Z(_, D, L) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return D = Ku(
          "" + D,
          _.mode,
          L
        ), D.return = _, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case T:
            return L = Ds(
              D.type,
              D.key,
              D.props,
              null,
              _.mode,
              L
            ), Il(L, D), L.return = _, L;
          case R:
            return D = Qu(
              D,
              _.mode,
              L
            ), D.return = _, D;
          case j:
            return D = hi(D), Z(_, D, L);
        }
        if (re(D) || P(D))
          return D = oi(
            D,
            _.mode,
            L,
            null
          ), D.return = _, D;
        if (typeof D.then == "function")
          return Z(_, Vs(D), L);
        if (D.$$typeof === B)
          return Z(
            _,
            zs(_, D),
            L
          );
        Us(_, D);
      }
      return null;
    }
    function Y(_, D, L, K) {
      var Se = D !== null ? D.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return Se !== null ? null : x(_, D, "" + L, K);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case T:
            return L.key === Se ? M(_, D, L, K) : null;
          case R:
            return L.key === Se ? V(_, D, L, K) : null;
          case j:
            return L = hi(L), Y(_, D, L, K);
        }
        if (re(L) || P(L))
          return Se !== null ? null : X(_, D, L, K, null);
        if (typeof L.then == "function")
          return Y(
            _,
            D,
            Vs(L),
            K
          );
        if (L.$$typeof === B)
          return Y(
            _,
            D,
            zs(_, L),
            K
          );
        Us(_, L);
      }
      return null;
    }
    function G(_, D, L, K, Se) {
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return _ = _.get(L) || null, x(D, _, "" + K, Se);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case T:
            return _ = _.get(
              K.key === null ? L : K.key
            ) || null, M(D, _, K, Se);
          case R:
            return _ = _.get(
              K.key === null ? L : K.key
            ) || null, V(D, _, K, Se);
          case j:
            return K = hi(K), G(
              _,
              D,
              L,
              K,
              Se
            );
        }
        if (re(K) || P(K))
          return _ = _.get(L) || null, X(D, _, K, Se, null);
        if (typeof K.then == "function")
          return G(
            _,
            D,
            L,
            Vs(K),
            Se
          );
        if (K.$$typeof === B)
          return G(
            _,
            D,
            L,
            zs(D, K),
            Se
          );
        Us(D, K);
      }
      return null;
    }
    function me(_, D, L, K) {
      for (var Se = null, qe = null, ve = D, we = D = 0, Ue = null; ve !== null && we < L.length; we++) {
        ve.index > we ? (Ue = ve, ve = null) : Ue = ve.sibling;
        var Ye = Y(
          _,
          ve,
          L[we],
          K
        );
        if (Ye === null) {
          ve === null && (ve = Ue);
          break;
        }
        e && ve && Ye.alternate === null && t(_, ve), D = c(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye, ve = Ue;
      }
      if (we === L.length)
        return i(_, ve), Be && In(_, we), Se;
      if (ve === null) {
        for (; we < L.length; we++)
          ve = Z(_, L[we], K), ve !== null && (D = c(
            ve,
            D,
            we
          ), qe === null ? Se = ve : qe.sibling = ve, qe = ve);
        return Be && In(_, we), Se;
      }
      for (ve = l(ve); we < L.length; we++)
        Ue = G(
          ve,
          _,
          we,
          L[we],
          K
        ), Ue !== null && (e && Ue.alternate !== null && ve.delete(
          Ue.key === null ? we : Ue.key
        ), D = c(
          Ue,
          D,
          we
        ), qe === null ? Se = Ue : qe.sibling = Ue, qe = Ue);
      return e && ve.forEach(function(Ga) {
        return t(_, Ga);
      }), Be && In(_, we), Se;
    }
    function Ee(_, D, L, K) {
      if (L == null) throw Error(s(151));
      for (var Se = null, qe = null, ve = D, we = D = 0, Ue = null, Ye = L.next(); ve !== null && !Ye.done; we++, Ye = L.next()) {
        ve.index > we ? (Ue = ve, ve = null) : Ue = ve.sibling;
        var Ga = Y(_, ve, Ye.value, K);
        if (Ga === null) {
          ve === null && (ve = Ue);
          break;
        }
        e && ve && Ga.alternate === null && t(_, ve), D = c(Ga, D, we), qe === null ? Se = Ga : qe.sibling = Ga, qe = Ga, ve = Ue;
      }
      if (Ye.done)
        return i(_, ve), Be && In(_, we), Se;
      if (ve === null) {
        for (; !Ye.done; we++, Ye = L.next())
          Ye = Z(_, Ye.value, K), Ye !== null && (D = c(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye);
        return Be && In(_, we), Se;
      }
      for (ve = l(ve); !Ye.done; we++, Ye = L.next())
        Ye = G(ve, _, we, Ye.value, K), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? we : Ye.key), D = c(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye);
      return e && ve.forEach(function(cT) {
        return t(_, cT);
      }), Be && In(_, we), Se;
    }
    function Qe(_, D, L, K) {
      if (typeof L == "object" && L !== null && L.type === C && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case T:
            e: {
              for (var Se = L.key; D !== null; ) {
                if (D.key === Se) {
                  if (Se = L.type, Se === C) {
                    if (D.tag === 7) {
                      i(
                        _,
                        D.sibling
                      ), K = u(
                        D,
                        L.props.children
                      ), K.return = _, _ = K;
                      break e;
                    }
                  } else if (D.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === j && hi(Se) === D.type) {
                    i(
                      _,
                      D.sibling
                    ), K = u(D, L.props), Il(K, L), K.return = _, _ = K;
                    break e;
                  }
                  i(_, D);
                  break;
                } else t(_, D);
                D = D.sibling;
              }
              L.type === C ? (K = oi(
                L.props.children,
                _.mode,
                K,
                L.key
              ), K.return = _, _ = K) : (K = Ds(
                L.type,
                L.key,
                L.props,
                null,
                _.mode,
                K
              ), Il(K, L), K.return = _, _ = K);
            }
            return y(_);
          case R:
            e: {
              for (Se = L.key; D !== null; ) {
                if (D.key === Se)
                  if (D.tag === 4 && D.stateNode.containerInfo === L.containerInfo && D.stateNode.implementation === L.implementation) {
                    i(
                      _,
                      D.sibling
                    ), K = u(D, L.children || []), K.return = _, _ = K;
                    break e;
                  } else {
                    i(_, D);
                    break;
                  }
                else t(_, D);
                D = D.sibling;
              }
              K = Qu(L, _.mode, K), K.return = _, _ = K;
            }
            return y(_);
          case j:
            return L = hi(L), Qe(
              _,
              D,
              L,
              K
            );
        }
        if (re(L))
          return me(
            _,
            D,
            L,
            K
          );
        if (P(L)) {
          if (Se = P(L), typeof Se != "function") throw Error(s(150));
          return L = Se.call(L), Ee(
            _,
            D,
            L,
            K
          );
        }
        if (typeof L.then == "function")
          return Qe(
            _,
            D,
            Vs(L),
            K
          );
        if (L.$$typeof === B)
          return Qe(
            _,
            D,
            zs(_, L),
            K
          );
        Us(_, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint" ? (L = "" + L, D !== null && D.tag === 6 ? (i(_, D.sibling), K = u(D, L), K.return = _, _ = K) : (i(_, D), K = Ku(L, _.mode, K), K.return = _, _ = K), y(_)) : i(_, D);
    }
    return function(_, D, L, K) {
      try {
        Jl = 0;
        var Se = Qe(
          _,
          D,
          L,
          K
        );
        return tl = null, Se;
      } catch (ve) {
        if (ve === el || ve === _s) throw ve;
        var qe = Wt(29, ve, null, _.mode);
        return qe.lanes = K, qe.return = _, qe;
      } finally {
      }
    };
  }
  var pi = Nm(!0), zm = Nm(!1), Ma = !1;
  function rc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function sc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Aa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ca(e, t, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ge & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = ws(e), pm(e, null, i), t;
    }
    return Cs(e, l, t, i), ws(e);
  }
  function Wl(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, ps(e, i);
    }
  }
  function oc(e, t) {
    var i = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, i === l)) {
      var u = null, c = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var y = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          c === null ? u = c = y : c = c.next = y, i = i.next;
        } while (i !== null);
        c === null ? u = c = t : c = c.next = t;
      } else u = c = t;
      i = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var uc = !1;
  function er() {
    if (uc) {
      var e = Wi;
      if (e !== null) throw e;
    }
  }
  function tr(e, t, i, l) {
    uc = !1;
    var u = e.updateQueue;
    Ma = !1;
    var c = u.firstBaseUpdate, y = u.lastBaseUpdate, x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var M = x, V = M.next;
      M.next = null, y === null ? c = V : y.next = V, y = M;
      var X = e.alternate;
      X !== null && (X = X.updateQueue, x = X.lastBaseUpdate, x !== y && (x === null ? X.firstBaseUpdate = V : x.next = V, X.lastBaseUpdate = M));
    }
    if (c !== null) {
      var Z = u.baseState;
      y = 0, X = V = M = null, x = c;
      do {
        var Y = x.lane & -536870913, G = Y !== x.lane;
        if (G ? (Ve & Y) === Y : (l & Y) === Y) {
          Y !== 0 && Y === Ii && (uc = !0), X !== null && (X = X.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, Ee = x;
            Y = t;
            var Qe = i;
            switch (Ee.tag) {
              case 1:
                if (me = Ee.payload, typeof me == "function") {
                  Z = me.call(Qe, Z, Y);
                  break e;
                }
                Z = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Ee.payload, Y = typeof me == "function" ? me.call(Qe, Z, Y) : me, Y == null) break e;
                Z = v({}, Z, Y);
                break e;
              case 2:
                Ma = !0;
            }
          }
          Y = x.callback, Y !== null && (e.flags |= 64, G && (e.flags |= 8192), G = u.callbacks, G === null ? u.callbacks = [Y] : G.push(Y));
        } else
          G = {
            lane: Y,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, X === null ? (V = X = G, M = Z) : X = X.next = G, y |= Y;
        if (x = x.next, x === null) {
          if (x = u.shared.pending, x === null)
            break;
          G = x, x = G.next, G.next = null, u.lastBaseUpdate = G, u.shared.pending = null;
        }
      } while (!0);
      X === null && (M = Z), u.baseState = M, u.firstBaseUpdate = V, u.lastBaseUpdate = X, c === null && (u.shared.lanes = 0), za |= y, e.lanes = y, e.memoizedState = Z;
    }
  }
  function Om(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function _m(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Om(i[e], t);
  }
  var nl = w(null), Bs = w(0);
  function Lm(e, t) {
    e = ua, ee(Bs, e), ee(nl, t), ua = e | t.baseLanes;
  }
  function cc() {
    ee(Bs, ua), ee(nl, nl.current);
  }
  function fc() {
    ua = Bs.current, k(nl), k(Bs);
  }
  var en = w(null), mn = null;
  function wa(e) {
    var t = e.alternate;
    ee(ft, ft.current & 1), ee(en, e), mn === null && (t === null || nl.current !== null || t.memoizedState !== null) && (mn = e);
  }
  function dc(e) {
    ee(ft, ft.current), ee(en, e), mn === null && (mn = e);
  }
  function Vm(e) {
    e.tag === 22 ? (ee(ft, ft.current), ee(en, e), mn === null && (mn = e)) : Da();
  }
  function Da() {
    ee(ft, ft.current), ee(en, en.current);
  }
  function tn(e) {
    k(en), mn === e && (mn = null), k(ft);
  }
  var ft = w(0);
  function Hs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || bf(i) || Sf(i)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var ta = 0, Ce = null, Fe = null, vt = null, qs = !1, al = !1, yi = !1, Ys = 0, nr = 0, il = null, ex = 0;
  function ot() {
    throw Error(s(321));
  }
  function hc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!It(e[i], t[i])) return !1;
    return !0;
  }
  function mc(e, t, i, l, u, c) {
    return ta = c, Ce = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? bp : Dc, yi = !1, c = i(l, u), yi = !1, al && (c = Bm(
      t,
      i,
      l,
      u
    )), Um(e), c;
  }
  function Um(e) {
    U.H = lr;
    var t = Fe !== null && Fe.next !== null;
    if (ta = 0, vt = Fe = Ce = null, qs = !1, nr = 0, il = null, t) throw Error(s(300));
    e === null || bt || (e = e.dependencies, e !== null && Ns(e) && (bt = !0));
  }
  function Bm(e, t, i, l) {
    Ce = e;
    var u = 0;
    do {
      if (al && (il = null), nr = 0, al = !1, 25 <= u) throw Error(s(301));
      if (u += 1, vt = Fe = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      U.H = Sp, c = t(i, l);
    } while (al);
    return c;
  }
  function tx() {
    var e = U.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? ar(t) : t, e = e.useState()[0], (Fe !== null ? Fe.memoizedState : null) !== e && (Ce.flags |= 1024), t;
  }
  function pc() {
    var e = Ys !== 0;
    return Ys = 0, e;
  }
  function yc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function gc(e) {
    if (qs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      qs = !1;
    }
    ta = 0, vt = Fe = Ce = null, al = !1, nr = Ys = 0, il = null;
  }
  function qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return vt === null ? Ce.memoizedState = vt = e : vt = vt.next = e, vt;
  }
  function dt() {
    if (Fe === null) {
      var e = Ce.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Fe.next;
    var t = vt === null ? Ce.memoizedState : vt.next;
    if (t !== null)
      vt = t, Fe = e;
    else {
      if (e === null)
        throw Ce.alternate === null ? Error(s(467)) : Error(s(310));
      Fe = e, e = {
        memoizedState: Fe.memoizedState,
        baseState: Fe.baseState,
        baseQueue: Fe.baseQueue,
        queue: Fe.queue,
        next: null
      }, vt === null ? Ce.memoizedState = vt = e : vt = vt.next = e;
    }
    return vt;
  }
  function Gs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ar(e) {
    var t = nr;
    return nr += 1, il === null && (il = []), e = wm(il, e, t), t = Ce, (vt === null ? t.memoizedState : vt.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? bp : Dc), e;
  }
  function Ps(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ar(e);
      if (e.$$typeof === B) return Dt(e);
    }
    throw Error(s(438, String(e)));
  }
  function vc(e) {
    var t = null, i = Ce.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var l = Ce.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = Gs(), Ce.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++)
        i[l] = te;
    return t.index++, i;
  }
  function na(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ks(e) {
    var t = dt();
    return bc(t, Fe, e);
  }
  function bc(e, t, i) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = i;
    var u = e.baseQueue, c = l.pending;
    if (c !== null) {
      if (u !== null) {
        var y = u.next;
        u.next = c.next, c.next = y;
      }
      t.baseQueue = u = c, l.pending = null;
    }
    if (c = e.baseState, u === null) e.memoizedState = c;
    else {
      t = u.next;
      var x = y = null, M = null, V = t, X = !1;
      do {
        var Z = V.lane & -536870913;
        if (Z !== V.lane ? (Ve & Z) === Z : (ta & Z) === Z) {
          var Y = V.revertLane;
          if (Y === 0)
            M !== null && (M = M.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: V.action,
              hasEagerState: V.hasEagerState,
              eagerState: V.eagerState,
              next: null
            }), Z === Ii && (X = !0);
          else if ((ta & Y) === Y) {
            V = V.next, Y === Ii && (X = !0);
            continue;
          } else
            Z = {
              lane: 0,
              revertLane: V.revertLane,
              gesture: null,
              action: V.action,
              hasEagerState: V.hasEagerState,
              eagerState: V.eagerState,
              next: null
            }, M === null ? (x = M = Z, y = c) : M = M.next = Z, Ce.lanes |= Y, za |= Y;
          Z = V.action, yi && i(c, Z), c = V.hasEagerState ? V.eagerState : i(c, Z);
        } else
          Y = {
            lane: Z,
            revertLane: V.revertLane,
            gesture: V.gesture,
            action: V.action,
            hasEagerState: V.hasEagerState,
            eagerState: V.eagerState,
            next: null
          }, M === null ? (x = M = Y, y = c) : M = M.next = Y, Ce.lanes |= Z, za |= Z;
        V = V.next;
      } while (V !== null && V !== t);
      if (M === null ? y = c : M.next = x, !It(c, e.memoizedState) && (bt = !0, X && (i = Wi, i !== null)))
        throw i;
      e.memoizedState = c, e.baseState = y, e.baseQueue = M, l.lastRenderedState = c;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Sc(e) {
    var t = dt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch, u = i.pending, c = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var y = u = u.next;
      do
        c = e(c, y.action), y = y.next;
      while (y !== u);
      It(c, t.memoizedState) || (bt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), i.lastRenderedState = c;
    }
    return [c, l];
  }
  function Hm(e, t, i) {
    var l = Ce, u = dt(), c = Be;
    if (c) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var y = !It(
      (Fe || u).memoizedState,
      i
    );
    if (y && (u.memoizedState = i, bt = !0), u = u.queue, Ec(Gm.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || vt !== null && vt.memoizedState.tag & 1) {
      if (l.flags |= 2048, ll(
        9,
        { destroy: void 0 },
        Ym.bind(
          null,
          l,
          u,
          i,
          t
        ),
        null
      ), Je === null) throw Error(s(349));
      c || (ta & 127) !== 0 || qm(l, t, i);
    }
    return i;
  }
  function qm(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = Ce.updateQueue, t === null ? (t = Gs(), Ce.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Ym(e, t, i, l) {
    t.value = i, t.getSnapshot = l, Pm(t) && km(e);
  }
  function Gm(e, t, i) {
    return i(function() {
      Pm(t) && km(e);
    });
  }
  function Pm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !It(e, i);
    } catch {
      return !0;
    }
  }
  function km(e) {
    var t = si(e, 2);
    t !== null && Zt(t, e, 2);
  }
  function xc(e) {
    var t = qt();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), yi) {
        Mt(!0);
        try {
          i();
        } finally {
          Mt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: na,
      lastRenderedState: e
    }, t;
  }
  function Xm(e, t, i, l) {
    return e.baseState = i, bc(
      e,
      Fe,
      typeof l == "function" ? l : na
    );
  }
  function nx(e, t, i, l, u) {
    if (Ks(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          c.listeners.push(y);
        }
      };
      U.T !== null ? i(!0) : c.isTransition = !1, l(c), i = t.pending, i === null ? (c.next = t.pending = c, Fm(t, c)) : (c.next = i.next, t.pending = i.next = c);
    }
  }
  function Fm(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var c = U.T, y = {};
      U.T = y;
      try {
        var x = i(u, l), M = U.S;
        M !== null && M(y, x), Km(e, t, x);
      } catch (V) {
        Tc(e, t, V);
      } finally {
        c !== null && y.types !== null && (c.types = y.types), U.T = c;
      }
    } else
      try {
        c = i(u, l), Km(e, t, c);
      } catch (V) {
        Tc(e, t, V);
      }
  }
  function Km(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        Qm(e, t, l);
      },
      function(l) {
        return Tc(e, t, l);
      }
    ) : Qm(e, t, i);
  }
  function Qm(e, t, i) {
    t.status = "fulfilled", t.value = i, Zm(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, Fm(e, i)));
  }
  function Tc(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, Zm(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Zm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function $m(e, t) {
    return t;
  }
  function Jm(e, t) {
    if (Be) {
      var i = Je.formState;
      if (i !== null) {
        e: {
          var l = Ce;
          if (Be) {
            if (tt) {
              t: {
                for (var u = tt, c = hn; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (u = pn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                c = u.data, u = c === "F!" || c === "F" ? u : null;
              }
              if (u) {
                tt = pn(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Ea(l);
          }
          l = !1;
        }
        l && (t = i[0]);
      }
    }
    return i = qt(), i.memoizedState = i.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $m,
      lastRenderedState: t
    }, i.queue = l, i = yp.bind(
      null,
      Ce,
      l
    ), l.dispatch = i, l = xc(!1), c = wc.bind(
      null,
      Ce,
      !1,
      l.queue
    ), l = qt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, i = nx.bind(
      null,
      Ce,
      u,
      c,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function Im(e) {
    var t = dt();
    return Wm(t, Fe, e);
  }
  function Wm(e, t, i) {
    if (t = bc(
      e,
      t,
      $m
    )[0], e = ks(na)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = ar(t);
      } catch (y) {
        throw y === el ? _s : y;
      }
    else l = t;
    t = dt();
    var u = t.queue, c = u.dispatch;
    return i !== t.memoizedState && (Ce.flags |= 2048, ll(
      9,
      { destroy: void 0 },
      ax.bind(null, u, i),
      null
    )), [l, c, e];
  }
  function ax(e, t) {
    e.action = t;
  }
  function ep(e) {
    var t = dt(), i = Fe;
    if (i !== null)
      return Wm(t, i, e);
    dt(), t = t.memoizedState, i = dt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function ll(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = Ce.updateQueue, t === null && (t = Gs(), Ce.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function tp() {
    return dt().memoizedState;
  }
  function Xs(e, t, i, l) {
    var u = qt();
    Ce.flags |= e, u.memoizedState = ll(
      1 | t,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function Fs(e, t, i, l) {
    var u = dt();
    l = l === void 0 ? null : l;
    var c = u.memoizedState.inst;
    Fe !== null && l !== null && hc(l, Fe.memoizedState.deps) ? u.memoizedState = ll(t, c, i, l) : (Ce.flags |= e, u.memoizedState = ll(
      1 | t,
      c,
      i,
      l
    ));
  }
  function np(e, t) {
    Xs(8390656, 8, e, t);
  }
  function Ec(e, t) {
    Fs(2048, 8, e, t);
  }
  function ix(e) {
    Ce.flags |= 4;
    var t = Ce.updateQueue;
    if (t === null)
      t = Gs(), Ce.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function ap(e) {
    var t = dt().memoizedState;
    return ix({ ref: t, nextImpl: e }), function() {
      if ((Ge & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ip(e, t) {
    return Fs(4, 2, e, t);
  }
  function lp(e, t) {
    return Fs(4, 4, e, t);
  }
  function rp(e, t) {
    if (typeof t == "function") {
      e = e();
      var i = t(e);
      return function() {
        typeof i == "function" ? i() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function sp(e, t, i) {
    i = i != null ? i.concat([e]) : null, Fs(4, 4, rp.bind(null, t, e), i);
  }
  function Rc() {
  }
  function op(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && hc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function up(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && hc(t, l[1]))
      return l[0];
    if (l = e(), yi) {
      Mt(!0);
      try {
        e();
      } finally {
        Mt(!1);
      }
    }
    return i.memoizedState = [l, t], l;
  }
  function Mc(e, t, i) {
    return i === void 0 || (ta & 1073741824) !== 0 && (Ve & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = cy(), Ce.lanes |= e, za |= e, i);
  }
  function cp(e, t, i, l) {
    return It(i, t) ? i : nl.current !== null ? (e = Mc(e, i, l), It(e, t) || (bt = !0), e) : (ta & 42) === 0 || (ta & 1073741824) !== 0 && (Ve & 261930) === 0 ? (bt = !0, e.memoizedState = i) : (e = cy(), Ce.lanes |= e, za |= e, t);
  }
  function fp(e, t, i, l, u) {
    var c = W.p;
    W.p = c !== 0 && 8 > c ? c : 8;
    var y = U.T, x = {};
    U.T = x, wc(e, !1, t, i);
    try {
      var M = u(), V = U.S;
      if (V !== null && V(x, M), M !== null && typeof M == "object" && typeof M.then == "function") {
        var X = W1(
          M,
          l
        );
        ir(
          e,
          t,
          X,
          ln(e)
        );
      } else
        ir(
          e,
          t,
          l,
          ln(e)
        );
    } catch (Z) {
      ir(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Z },
        ln()
      );
    } finally {
      W.p = c, y !== null && x.types !== null && (y.types = x.types), U.T = y;
    }
  }
  function lx() {
  }
  function Ac(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = dp(e).queue;
    fp(
      e,
      u,
      t,
      le,
      i === null ? lx : function() {
        return hp(e), i(l);
      }
    );
  }
  function dp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: le,
      baseState: le,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: na,
        lastRenderedState: le
      },
      next: null
    };
    var i = {};
    return t.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: na,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function hp(e) {
    var t = dp(e);
    t.next === null && (t = e.alternate.memoizedState), ir(
      e,
      t.next.queue,
      {},
      ln()
    );
  }
  function Cc() {
    return Dt(xr);
  }
  function mp() {
    return dt().memoizedState;
  }
  function pp() {
    return dt().memoizedState;
  }
  function rx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = ln();
          e = Aa(i);
          var l = Ca(t, e, i);
          l !== null && (Zt(l, t, i), Wl(l, t, i)), t = { cache: nc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function sx(e, t, i) {
    var l = ln();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ks(e) ? gp(t, i) : (i = Xu(e, t, i, l), i !== null && (Zt(i, e, l), vp(i, t, l)));
  }
  function yp(e, t, i) {
    var l = ln();
    ir(e, t, i, l);
  }
  function ir(e, t, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ks(e)) gp(t, u);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var y = t.lastRenderedState, x = c(y, i);
          if (u.hasEagerState = !0, u.eagerState = x, It(x, y))
            return Cs(e, t, u, 0), Je === null && As(), !1;
        } catch {
        } finally {
        }
      if (i = Xu(e, t, u, l), i !== null)
        return Zt(i, e, l), vp(i, t, l), !0;
    }
    return !1;
  }
  function wc(e, t, i, l) {
    if (l = {
      lane: 2,
      revertLane: sf(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ks(e)) {
      if (t) throw Error(s(479));
    } else
      t = Xu(
        e,
        i,
        l,
        2
      ), t !== null && Zt(t, e, 2);
  }
  function Ks(e) {
    var t = e.alternate;
    return e === Ce || t !== null && t === Ce;
  }
  function gp(e, t) {
    al = qs = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function vp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, ps(e, i);
    }
  }
  var lr = {
    readContext: Dt,
    use: Ps,
    useCallback: ot,
    useContext: ot,
    useEffect: ot,
    useImperativeHandle: ot,
    useLayoutEffect: ot,
    useInsertionEffect: ot,
    useMemo: ot,
    useReducer: ot,
    useRef: ot,
    useState: ot,
    useDebugValue: ot,
    useDeferredValue: ot,
    useTransition: ot,
    useSyncExternalStore: ot,
    useId: ot,
    useHostTransitionStatus: ot,
    useFormState: ot,
    useActionState: ot,
    useOptimistic: ot,
    useMemoCache: ot,
    useCacheRefresh: ot
  };
  lr.useEffectEvent = ot;
  var bp = {
    readContext: Dt,
    use: Ps,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Dt,
    useEffect: np,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Xs(
        4194308,
        4,
        rp.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return Xs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Xs(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = qt();
      t = t === void 0 ? null : t;
      var l = e();
      if (yi) {
        Mt(!0);
        try {
          e();
        } finally {
          Mt(!1);
        }
      }
      return i.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, i) {
      var l = qt();
      if (i !== void 0) {
        var u = i(t);
        if (yi) {
          Mt(!0);
          try {
            i(t);
          } finally {
            Mt(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = sx.bind(
        null,
        Ce,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = qt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = xc(e);
      var t = e.queue, i = yp.bind(null, Ce, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var i = qt();
      return Mc(i, e, t);
    },
    useTransition: function() {
      var e = xc(!1);
      return e = fp.bind(
        null,
        Ce,
        e.queue,
        !0,
        !1
      ), qt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var l = Ce, u = qt();
      if (Be) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), Je === null)
          throw Error(s(349));
        (Ve & 127) !== 0 || qm(l, t, i);
      }
      u.memoizedState = i;
      var c = { value: i, getSnapshot: t };
      return u.queue = c, np(Gm.bind(null, l, c, e), [
        e
      ]), l.flags |= 2048, ll(
        9,
        { destroy: void 0 },
        Ym.bind(
          null,
          l,
          c,
          i,
          t
        ),
        null
      ), i;
    },
    useId: function() {
      var e = qt(), t = Je.identifierPrefix;
      if (Be) {
        var i = Un, l = Vn;
        i = (l & ~(1 << 32 - _t(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Ys++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = ex++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Cc,
    useFormState: Jm,
    useActionState: Jm,
    useOptimistic: function(e) {
      var t = qt();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = wc.bind(
        null,
        Ce,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: vc,
    useCacheRefresh: function() {
      return qt().memoizedState = rx.bind(
        null,
        Ce
      );
    },
    useEffectEvent: function(e) {
      var t = qt(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((Ge & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Dc = {
    readContext: Dt,
    use: Ps,
    useCallback: op,
    useContext: Dt,
    useEffect: Ec,
    useImperativeHandle: sp,
    useInsertionEffect: ip,
    useLayoutEffect: lp,
    useMemo: up,
    useReducer: ks,
    useRef: tp,
    useState: function() {
      return ks(na);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return cp(
        i,
        Fe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ks(na)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : ar(e),
        t
      ];
    },
    useSyncExternalStore: Hm,
    useId: mp,
    useHostTransitionStatus: Cc,
    useFormState: Im,
    useActionState: Im,
    useOptimistic: function(e, t) {
      var i = dt();
      return Xm(i, Fe, e, t);
    },
    useMemoCache: vc,
    useCacheRefresh: pp
  };
  Dc.useEffectEvent = ap;
  var Sp = {
    readContext: Dt,
    use: Ps,
    useCallback: op,
    useContext: Dt,
    useEffect: Ec,
    useImperativeHandle: sp,
    useInsertionEffect: ip,
    useLayoutEffect: lp,
    useMemo: up,
    useReducer: Sc,
    useRef: tp,
    useState: function() {
      return Sc(na);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return Fe === null ? Mc(i, e, t) : cp(
        i,
        Fe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Sc(na)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : ar(e),
        t
      ];
    },
    useSyncExternalStore: Hm,
    useId: mp,
    useHostTransitionStatus: Cc,
    useFormState: ep,
    useActionState: ep,
    useOptimistic: function(e, t) {
      var i = dt();
      return Fe !== null ? Xm(i, Fe, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: vc,
    useCacheRefresh: pp
  };
  Sp.useEffectEvent = ap;
  function jc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : v({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Nc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var l = ln(), u = Aa(l);
      u.payload = t, i != null && (u.callback = i), t = Ca(e, u, l), t !== null && (Zt(t, e, l), Wl(t, e, l));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var l = ln(), u = Aa(l);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Ca(e, u, l), t !== null && (Zt(t, e, l), Wl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = ln(), l = Aa(i);
      l.tag = 2, t != null && (l.callback = t), t = Ca(e, l, i), t !== null && (Zt(t, e, i), Wl(t, e, i));
    }
  };
  function xp(e, t, i, l, u, c, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, c, y) : t.prototype && t.prototype.isPureReactComponent ? !Xl(i, l) || !Xl(u, c) : !0;
  }
  function Tp(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && Nc.enqueueReplaceState(t, t.state, null);
  }
  function gi(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var l in t)
        l !== "ref" && (i[l] = t[l]);
    }
    if (e = e.defaultProps) {
      i === t && (i = v({}, i));
      for (var u in e)
        i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  function Ep(e) {
    Ms(e);
  }
  function Rp(e) {
    console.error(e);
  }
  function Mp(e) {
    Ms(e);
  }
  function Qs(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Ap(e, t, i) {
    try {
      var l = e.onCaughtError;
      l(i.value, {
        componentStack: i.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function zc(e, t, i) {
    return i = Aa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Qs(e, t);
    }, i;
  }
  function Cp(e) {
    return e = Aa(e), e.tag = 3, e;
  }
  function wp(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = l.value;
      e.payload = function() {
        return u(c);
      }, e.callback = function() {
        Ap(t, i, l);
      };
    }
    var y = i.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      Ap(t, i, l), typeof u != "function" && (Oa === null ? Oa = /* @__PURE__ */ new Set([this]) : Oa.add(this));
      var x = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function ox(e, t, i, l, u) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = i.alternate, t !== null && Ji(
        t,
        i,
        u,
        !0
      ), i = en.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return mn === null ? ro() : i.alternate === null && ut === 0 && (ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === Ls ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), af(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === Ls ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), af(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return af(e, l, u), ro(), !1;
    }
    if (Be)
      return t = en.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== Ju && (e = Error(s(422), { cause: l }), Ql(cn(e, i)))) : (l !== Ju && (t = Error(s(423), {
        cause: l
      }), Ql(
        cn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = cn(l, i), u = zc(
        e.stateNode,
        l,
        u
      ), oc(e, u), ut !== 4 && (ut = 2)), !1;
    var c = Error(s(520), { cause: l });
    if (c = cn(c, i), hr === null ? hr = [c] : hr.push(c), ut !== 4 && (ut = 2), t === null) return !0;
    l = cn(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = zc(i.stateNode, l, e), oc(i, e), !1;
        case 1:
          if (t = i.type, c = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Oa === null || !Oa.has(c))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Cp(u), wp(
              u,
              e,
              i,
              l
            ), oc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Oc = Error(s(461)), bt = !1;
  function jt(e, t, i, l) {
    t.child = e === null ? zm(t, null, i, l) : pi(
      t,
      e.child,
      i,
      l
    );
  }
  function Dp(e, t, i, l, u) {
    i = i.render;
    var c = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var x in l)
        x !== "ref" && (y[x] = l[x]);
    } else y = l;
    return fi(t), l = mc(
      e,
      t,
      i,
      y,
      c,
      u
    ), x = pc(), e !== null && !bt ? (yc(e, t, u), aa(e, t, u)) : (Be && x && Zu(t), t.flags |= 1, jt(e, t, l, u), t.child);
  }
  function jp(e, t, i, l, u) {
    if (e === null) {
      var c = i.type;
      return typeof c == "function" && !Fu(c) && c.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = c, Np(
        e,
        t,
        c,
        l,
        u
      )) : (e = Ds(
        i.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !Yc(e, u)) {
      var y = c.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Xl, i(y, l) && e.ref === t.ref)
        return aa(e, t, u);
    }
    return t.flags |= 1, e = Jn(c, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Np(e, t, i, l, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Xl(c, l) && e.ref === t.ref)
        if (bt = !1, t.pendingProps = l = c, Yc(e, u))
          (e.flags & 131072) !== 0 && (bt = !0);
        else
          return t.lanes = e.lanes, aa(e, t, u);
    }
    return _c(
      e,
      t,
      i,
      l,
      u
    );
  }
  function zp(e, t, i, l) {
    var u = l.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | i : i, e !== null) {
          for (l = t.child = e.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~c;
        } else l = 0, t.child = null;
        return Op(
          e,
          t,
          c,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Os(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Lm(t, c) : cc(), Vm(t);
      else
        return l = t.lanes = 536870912, Op(
          e,
          t,
          c !== null ? c.baseLanes | i : i,
          i,
          l
        );
    } else
      c !== null ? (Os(t, c.cachePool), Lm(t, c), Da(), t.memoizedState = null) : (e !== null && Os(t, null), cc(), Da());
    return jt(e, t, u, i), t.child;
  }
  function rr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Op(e, t, i, l, u) {
    var c = ic();
    return c = c === null ? null : { parent: gt._currentValue, pool: c }, t.memoizedState = {
      baseLanes: i,
      cachePool: c
    }, e !== null && Os(t, null), cc(), Vm(t), e !== null && Ji(e, t, l, !0), t.childLanes = u, null;
  }
  function Zs(e, t) {
    return t = Js(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function _p(e, t, i) {
    return pi(t, e.child, null, i), e = Zs(t, t.pendingProps), e.flags |= 2, tn(t), t.memoizedState = null, e;
  }
  function ux(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Be) {
        if (l.mode === "hidden")
          return e = Zs(t, l), t.lanes = 536870912, rr(null, e);
        if (dc(t), (e = tt) ? (e = Fy(
          e,
          hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xa !== null ? { id: Vn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = gm(e), i.return = t, t.child = i, wt = t, tt = null)) : e = null, e === null) throw Ea(t);
        return t.lanes = 536870912, null;
      }
      return Zs(t, l);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var y = c.dehydrated;
      if (dc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = _p(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (bt || Ji(e, t, i, !1), u = (i & e.childLanes) !== 0, bt || u) {
        if (l = Je, l !== null && (y = A(l, i), y !== 0 && y !== c.retryLane))
          throw c.retryLane = y, si(e, y), Zt(l, e, y), Oc;
        ro(), t = _p(
          e,
          t,
          i
        );
      } else
        e = c.treeContext, tt = pn(y.nextSibling), wt = t, Be = !0, Ta = null, hn = !1, e !== null && Sm(t, e), t = Zs(t, l), t.flags |= 4096;
      return t;
    }
    return e = Jn(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function $s(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function _c(e, t, i, l, u) {
    return fi(t), i = mc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = pc(), e !== null && !bt ? (yc(e, t, u), aa(e, t, u)) : (Be && l && Zu(t), t.flags |= 1, jt(e, t, i, u), t.child);
  }
  function Lp(e, t, i, l, u, c) {
    return fi(t), t.updateQueue = null, i = Bm(
      t,
      l,
      i,
      u
    ), Um(e), l = pc(), e !== null && !bt ? (yc(e, t, c), aa(e, t, c)) : (Be && l && Zu(t), t.flags |= 1, jt(e, t, i, c), t.child);
  }
  function Vp(e, t, i, l, u) {
    if (fi(t), t.stateNode === null) {
      var c = Ki, y = i.contextType;
      typeof y == "object" && y !== null && (c = Dt(y)), c = new i(l, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = Nc, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = l, c.state = t.memoizedState, c.refs = {}, rc(t), y = i.contextType, c.context = typeof y == "object" && y !== null ? Dt(y) : Ki, c.state = t.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (jc(
        t,
        i,
        y,
        l
      ), c.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (y = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), y !== c.state && Nc.enqueueReplaceState(c, c.state, null), tr(t, l, c, u), er(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      c = t.stateNode;
      var x = t.memoizedProps, M = gi(i, x);
      c.props = M;
      var V = c.context, X = i.contextType;
      y = Ki, typeof X == "object" && X !== null && (y = Dt(X));
      var Z = i.getDerivedStateFromProps;
      X = typeof Z == "function" || typeof c.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, X || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (x || V !== y) && Tp(
        t,
        c,
        l,
        y
      ), Ma = !1;
      var Y = t.memoizedState;
      c.state = Y, tr(t, l, c, u), er(), V = t.memoizedState, x || Y !== V || Ma ? (typeof Z == "function" && (jc(
        t,
        i,
        Z,
        l
      ), V = t.memoizedState), (M = Ma || xp(
        t,
        i,
        M,
        l,
        Y,
        V,
        y
      )) ? (X || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = V), c.props = l, c.state = V, c.context = y, l = M) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      c = t.stateNode, sc(e, t), y = t.memoizedProps, X = gi(i, y), c.props = X, Z = t.pendingProps, Y = c.context, V = i.contextType, M = Ki, typeof V == "object" && V !== null && (M = Dt(V)), x = i.getDerivedStateFromProps, (V = typeof x == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (y !== Z || Y !== M) && Tp(
        t,
        c,
        l,
        M
      ), Ma = !1, Y = t.memoizedState, c.state = Y, tr(t, l, c, u), er();
      var G = t.memoizedState;
      y !== Z || Y !== G || Ma || e !== null && e.dependencies !== null && Ns(e.dependencies) ? (typeof x == "function" && (jc(
        t,
        i,
        x,
        l
      ), G = t.memoizedState), (X = Ma || xp(
        t,
        i,
        X,
        l,
        Y,
        G,
        M
      ) || e !== null && e.dependencies !== null && Ns(e.dependencies)) ? (V || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(l, G, M), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        l,
        G,
        M
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = G), c.props = l, c.state = G, c.context = M, l = X) : (typeof c.componentDidUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return c = l, $s(e, t), l = (t.flags & 128) !== 0, c || l ? (c = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && l ? (t.child = pi(
      t,
      e.child,
      null,
      u
    ), t.child = pi(
      t,
      null,
      i,
      u
    )) : jt(e, t, i, u), t.memoizedState = c.state, e = t.child) : e = aa(
      e,
      t,
      u
    ), e;
  }
  function Up(e, t, i, l) {
    return ui(), t.flags |= 256, jt(e, t, i, l), t.child;
  }
  var Lc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Vc(e) {
    return { baseLanes: e, cachePool: Am() };
  }
  function Uc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= an), e;
  }
  function Bp(e, t, i) {
    var l = t.pendingProps, u = !1, c = (t.flags & 128) !== 0, y;
    if ((y = c) || (y = e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Be) {
        if (u ? wa(t) : Da(), (e = tt) ? (e = Fy(
          e,
          hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xa !== null ? { id: Vn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = gm(e), i.return = t, t.child = i, wt = t, tt = null)) : e = null, e === null) throw Ea(t);
        return Sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var x = l.children;
      return l = l.fallback, u ? (Da(), u = t.mode, x = Js(
        { mode: "hidden", children: x },
        u
      ), l = oi(
        l,
        u,
        i,
        null
      ), x.return = t, l.return = t, x.sibling = l, t.child = x, l = t.child, l.memoizedState = Vc(i), l.childLanes = Uc(
        e,
        y,
        i
      ), t.memoizedState = Lc, rr(null, l)) : (wa(t), Bc(t, x));
    }
    var M = e.memoizedState;
    if (M !== null && (x = M.dehydrated, x !== null)) {
      if (c)
        t.flags & 256 ? (wa(t), t.flags &= -257, t = Hc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Da(), t.child = e.child, t.flags |= 128, t = null) : (Da(), x = l.fallback, u = t.mode, l = Js(
          { mode: "visible", children: l.children },
          u
        ), x = oi(
          x,
          u,
          i,
          null
        ), x.flags |= 2, l.return = t, x.return = t, l.sibling = x, t.child = l, pi(
          t,
          e.child,
          null,
          i
        ), l = t.child, l.memoizedState = Vc(i), l.childLanes = Uc(
          e,
          y,
          i
        ), t.memoizedState = Lc, t = rr(null, l));
      else if (wa(t), Sf(x)) {
        if (y = x.nextSibling && x.nextSibling.dataset, y) var V = y.dgst;
        y = V, l = Error(s(419)), l.stack = "", l.digest = y, Ql({ value: l, source: null, stack: null }), t = Hc(
          e,
          t,
          i
        );
      } else if (bt || Ji(e, t, i, !1), y = (i & e.childLanes) !== 0, bt || y) {
        if (y = Je, y !== null && (l = A(y, i), l !== 0 && l !== M.retryLane))
          throw M.retryLane = l, si(e, l), Zt(y, e, l), Oc;
        bf(x) || ro(), t = Hc(
          e,
          t,
          i
        );
      } else
        bf(x) ? (t.flags |= 192, t.child = e.child, t = null) : (e = M.treeContext, tt = pn(
          x.nextSibling
        ), wt = t, Be = !0, Ta = null, hn = !1, e !== null && Sm(t, e), t = Bc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Da(), x = l.fallback, u = t.mode, M = e.child, V = M.sibling, l = Jn(M, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = M.subtreeFlags & 65011712, V !== null ? x = Jn(
      V,
      x
    ) : (x = oi(
      x,
      u,
      i,
      null
    ), x.flags |= 2), x.return = t, l.return = t, l.sibling = x, t.child = l, rr(null, l), l = t.child, x = e.child.memoizedState, x === null ? x = Vc(i) : (u = x.cachePool, u !== null ? (M = gt._currentValue, u = u.parent !== M ? { parent: M, pool: M } : u) : u = Am(), x = {
      baseLanes: x.baseLanes | i,
      cachePool: u
    }), l.memoizedState = x, l.childLanes = Uc(
      e,
      y,
      i
    ), t.memoizedState = Lc, rr(e.child, l)) : (wa(t), i = e.child, e = i.sibling, i = Jn(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Bc(e, t) {
    return t = Js(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Js(e, t) {
    return e = Wt(22, e, null, t), e.lanes = 0, e;
  }
  function Hc(e, t, i) {
    return pi(t, e.child, null, i), e = Bc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Hp(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), ec(e.return, t, i);
  }
  function qc(e, t, i, l, u, c) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: i,
      tailMode: u,
      treeForkCount: c
    } : (y.isBackwards = t, y.rendering = null, y.renderingStartTime = 0, y.last = l, y.tail = i, y.tailMode = u, y.treeForkCount = c);
  }
  function qp(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, c = l.tail;
    l = l.children;
    var y = ft.current, x = (y & 2) !== 0;
    if (x ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, ee(ft, y), jt(e, t, l, i), l = Be ? Kl : 0, !x && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Hp(e, i, t);
        else if (e.tag === 19)
          Hp(e, i, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (u) {
      case "forwards":
        for (i = t.child, u = null; i !== null; )
          e = i.alternate, e !== null && Hs(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), qc(
          t,
          !1,
          u,
          i,
          c,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Hs(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        qc(
          t,
          !0,
          i,
          null,
          c,
          l
        );
        break;
      case "together":
        qc(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function aa(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), za |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (Ji(
          e,
          t,
          i,
          !1
        ), (i & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, i = Jn(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = Jn(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Yc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ns(e)));
  }
  function cx(e, t, i) {
    switch (t.tag) {
      case 3:
        mt(t, t.stateNode.containerInfo), Ra(t, gt, e.memoizedState.cache), ui();
        break;
      case 27:
      case 5:
        Wa(t);
        break;
      case 4:
        mt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ra(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, dc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (wa(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Bp(e, t, i) : (wa(t), e = aa(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        wa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (i & t.childLanes) !== 0, l || (Ji(
          e,
          t,
          i,
          !1
        ), l = (i & t.childLanes) !== 0), u) {
          if (l)
            return qp(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ee(ft, ft.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, zp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Ra(t, gt, e.memoizedState.cache);
    }
    return aa(e, t, i);
  }
  function Yp(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        bt = !0;
      else {
        if (!Yc(e, i) && (t.flags & 128) === 0)
          return bt = !1, cx(
            e,
            t,
            i
          );
        bt = (e.flags & 131072) !== 0;
      }
    else
      bt = !1, Be && (t.flags & 1048576) !== 0 && bm(t, Kl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = hi(t.elementType), t.type = e, typeof e == "function")
            Fu(e) ? (l = gi(e, l), t.tag = 1, t = Vp(
              null,
              t,
              e,
              l,
              i
            )) : (t.tag = 0, t = _c(
              null,
              t,
              e,
              l,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === Q) {
                t.tag = 11, t = Dp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              } else if (u === ie) {
                t.tag = 14, t = jp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              }
            }
            throw t = fe(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return _c(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return l = t.type, u = gi(
          l,
          t.pendingProps
        ), Vp(
          e,
          t,
          l,
          u,
          i
        );
      case 3:
        e: {
          if (mt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var c = t.memoizedState;
          u = c.element, sc(e, t), tr(t, l, null, i);
          var y = t.memoizedState;
          if (l = y.cache, Ra(t, gt, l), l !== c.cache && tc(
            t,
            [gt],
            i,
            !0
          ), er(), l = y.element, c.isDehydrated)
            if (c = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Up(
                e,
                t,
                l,
                i
              );
              break e;
            } else if (l !== u) {
              u = cn(
                Error(s(424)),
                t
              ), Ql(u), t = Up(
                e,
                t,
                l,
                i
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (tt = pn(e.firstChild), wt = t, Be = !0, Ta = null, hn = !0, i = zm(
                t,
                null,
                l,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (ui(), l === u) {
              t = aa(
                e,
                t,
                i
              );
              break e;
            }
            jt(e, t, l, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return $s(e, t), e === null ? (i = Iy(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Be || (i = t.type, e = t.pendingProps, l = mo(
          Me.current
        ).createElement(i), l[oe] = t, l[ue] = e, Nt(l, i, e), We(l), t.stateNode = l) : t.memoizedState = Iy(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Wa(t), e === null && Be && (l = t.stateNode = Zy(
          t.type,
          t.pendingProps,
          Me.current
        ), wt = t, hn = !0, u = tt, Ua(t.type) ? (xf = u, tt = pn(l.firstChild)) : tt = u), jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), $s(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Be && ((u = l = tt) && (l = qx(
          l,
          t.type,
          t.pendingProps,
          hn
        ), l !== null ? (t.stateNode = l, wt = t, tt = pn(l.firstChild), hn = !1, u = !0) : u = !1), u || Ea(t)), Wa(t), u = t.type, c = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = c.children, yf(u, c) ? l = null : y !== null && yf(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = mc(
          e,
          t,
          tx,
          null,
          null,
          i
        ), xr._currentValue = u), $s(e, t), jt(e, t, l, i), t.child;
      case 6:
        return e === null && Be && ((e = i = tt) && (i = Yx(
          i,
          t.pendingProps,
          hn
        ), i !== null ? (t.stateNode = i, wt = t, tt = null, e = !0) : e = !1), e || Ea(t)), null;
      case 13:
        return Bp(e, t, i);
      case 4:
        return mt(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = pi(
          t,
          null,
          l,
          i
        ) : jt(e, t, l, i), t.child;
      case 11:
        return Dp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return jt(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return l = t.pendingProps, Ra(t, t.type, l.value), jt(e, t, l.children, i), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, fi(t), u = Dt(u), l = l(u), t.flags |= 1, jt(e, t, l, i), t.child;
      case 14:
        return jp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Np(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return qp(e, t, i);
      case 31:
        return ux(e, t, i);
      case 22:
        return zp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return fi(t), l = Dt(gt), e === null ? (u = ic(), u === null && (u = Je, c = nc(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= i), u = c), t.memoizedState = { parent: l, cache: u }, rc(t), Ra(t, gt, u)) : ((e.lanes & i) !== 0 && (sc(e, t), tr(t, null, null, i), er()), u = e.memoizedState, c = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ra(t, gt, l)) : (l = c.cache, Ra(t, gt, l), l !== u.cache && tc(
          t,
          [gt],
          i,
          !0
        ))), jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function ia(e) {
    e.flags |= 4;
  }
  function Gc(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (my()) e.flags |= 8192;
        else
          throw mi = Ls, lc;
    } else e.flags &= -16777217;
  }
  function Gp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !ag(t))
      if (my()) e.flags |= 8192;
      else
        throw mi = Ls, lc;
  }
  function Is(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ul() : 536870912, e.lanes |= t, ul |= t);
  }
  function sr(e, t) {
    if (!Be)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var i = null; t !== null; )
            t.alternate !== null && (i = t), t = t.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var l = null; i !== null; )
            i.alternate !== null && (l = i), i = i.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function nt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = i, t;
  }
  function fx(e, t, i) {
    var l = t.pendingProps;
    switch ($u(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return nt(t), null;
      case 1:
        return nt(t), null;
      case 3:
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), ea(gt), Ze(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && ($i(t) ? ia(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Iu())), nt(t), null;
      case 26:
        var u = t.type, c = t.memoizedState;
        return e === null ? (ia(t), c !== null ? (nt(t), Gp(t, c)) : (nt(t), Gc(
          t,
          u,
          null,
          l,
          i
        ))) : c ? c !== e.memoizedState ? (ia(t), nt(t), Gp(t, c)) : (nt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && ia(t), nt(t), Gc(
          t,
          u,
          e,
          l,
          i
        )), null;
      case 27:
        if (zi(t), i = Me.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          e = se.current, $i(t) ? xm(t) : (e = Zy(u, l, i), t.stateNode = e, ia(t));
        }
        return nt(t), null;
      case 5:
        if (zi(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          if (c = se.current, $i(t))
            xm(t);
          else {
            var y = mo(
              Me.current
            );
            switch (c) {
              case 1:
                c = y.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                c = y.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    c = y.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    c = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    c = y.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof l.is == "string" ? y.createElement("select", {
                      is: l.is
                    }) : y.createElement("select"), l.multiple ? c.multiple = !0 : l.size && (c.size = l.size);
                    break;
                  default:
                    c = typeof l.is == "string" ? y.createElement(u, { is: l.is }) : y.createElement(u);
                }
            }
            c[oe] = t, c[ue] = l;
            e: for (y = t.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                c.appendChild(y.stateNode);
              else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
                y.child.return = y, y = y.child;
                continue;
              }
              if (y === t) break e;
              for (; y.sibling === null; ) {
                if (y.return === null || y.return === t)
                  break e;
                y = y.return;
              }
              y.sibling.return = y.return, y = y.sibling;
            }
            t.stateNode = c;
            e: switch (Nt(c, u, l), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && ia(t);
          }
        }
        return nt(t), Gc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = Me.current, $i(t)) {
            if (e = t.stateNode, i = t.memoizedProps, l = null, u = wt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[oe] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || By(e.nodeValue, i)), e || Ea(t, !0);
          } else
            e = mo(e).createTextNode(
              l
            ), e[oe] = t, t.stateNode = e;
        }
        return nt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = $i(t), i !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[oe] = t;
            } else
              ui(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), e = !1;
          } else
            i = Iu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return nt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = $i(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[oe] = t;
            } else
              ui(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), u = !1;
          } else
            u = Iu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
        }
        return tn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), c = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (c = l.memoizedState.cachePool.pool), c !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), Is(t, t.updateQueue), nt(t), null);
      case 4:
        return Ze(), e === null && ff(t.stateNode.containerInfo), nt(t), null;
      case 10:
        return ea(t.type), nt(t), null;
      case 19:
        if (k(ft), l = t.memoizedState, l === null) return nt(t), null;
        if (u = (t.flags & 128) !== 0, c = l.rendering, c === null)
          if (u) sr(l, !1);
          else {
            if (ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = Hs(e), c !== null) {
                  for (t.flags |= 128, sr(l, !1), e = c.updateQueue, t.updateQueue = e, Is(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    ym(i, e), i = i.sibling;
                  return ee(
                    ft,
                    ft.current & 1 | 2
                  ), Be && In(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Bt() > ao && (t.flags |= 128, u = !0, sr(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Hs(c), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Is(t, e), sr(l, !0), l.tail === null && l.tailMode === "hidden" && !c.alternate && !Be)
                return nt(t), null;
            } else
              2 * Bt() - l.renderingStartTime > ao && i !== 536870912 && (t.flags |= 128, u = !0, sr(l, !1), t.lanes = 4194304);
          l.isBackwards ? (c.sibling = t.child, t.child = c) : (e = l.last, e !== null ? e.sibling = c : t.child = c, l.last = c);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Bt(), e.sibling = null, i = ft.current, ee(
          ft,
          u ? i & 1 | 2 : i & 1
        ), Be && In(t, l.treeForkCount), e) : (nt(t), null);
      case 22:
      case 23:
        return tn(t), fc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (nt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : nt(t), i = t.updateQueue, i !== null && Is(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && k(di), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ea(gt), nt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function dx(e, t) {
    switch ($u(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ea(gt), Ze(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return zi(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (tn(t), t.alternate === null)
            throw Error(s(340));
          ui();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (tn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          ui();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return k(ft), null;
      case 4:
        return Ze(), null;
      case 10:
        return ea(t.type), null;
      case 22:
      case 23:
        return tn(t), fc(), e !== null && k(di), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ea(gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Pp(e, t) {
    switch ($u(t), t.tag) {
      case 3:
        ea(gt), Ze();
        break;
      case 26:
      case 27:
      case 5:
        zi(t);
        break;
      case 4:
        Ze();
        break;
      case 31:
        t.memoizedState !== null && tn(t);
        break;
      case 13:
        tn(t);
        break;
      case 19:
        k(ft);
        break;
      case 10:
        ea(t.type);
        break;
      case 22:
      case 23:
        tn(t), fc(), e !== null && k(di);
        break;
      case 24:
        ea(gt);
    }
  }
  function or(e, t) {
    try {
      var i = t.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            l = void 0;
            var c = i.create, y = i.inst;
            l = c(), y.destroy = l;
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (x) {
      ke(t, t.return, x);
    }
  }
  function ja(e, t, i) {
    try {
      var l = t.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        l = c;
        do {
          if ((l.tag & e) === e) {
            var y = l.inst, x = y.destroy;
            if (x !== void 0) {
              y.destroy = void 0, u = t;
              var M = i, V = x;
              try {
                V();
              } catch (X) {
                ke(
                  u,
                  M,
                  X
                );
              }
            }
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (X) {
      ke(t, t.return, X);
    }
  }
  function kp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        _m(t, i);
      } catch (l) {
        ke(e, e.return, l);
      }
    }
  }
  function Xp(e, t, i) {
    i.props = gi(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (l) {
      ke(e, t, l);
    }
  }
  function ur(e, t) {
    try {
      var i = e.ref;
      if (i !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof i == "function" ? e.refCleanup = i(l) : i.current = l;
      }
    } catch (u) {
      ke(e, t, u);
    }
  }
  function Bn(e, t) {
    var i = e.ref, l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          ke(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          ke(e, t, u);
        }
      else i.current = null;
  }
  function Fp(e) {
    var t = e.type, i = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && l.focus();
          break e;
        case "img":
          i.src ? l.src = i.src : i.srcSet && (l.srcset = i.srcSet);
      }
    } catch (u) {
      ke(e, e.return, u);
    }
  }
  function Pc(e, t, i) {
    try {
      var l = e.stateNode;
      _x(l, e.type, i, t), l[ue] = t;
    } catch (u) {
      ke(e, e.return, u);
    }
  }
  function Kp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ua(e.type) || e.tag === 4;
  }
  function kc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Kp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ua(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Xc(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = Zn));
    else if (l !== 4 && (l === 27 && Ua(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Xc(e, t, i), e = e.sibling; e !== null; )
        Xc(e, t, i), e = e.sibling;
  }
  function Ws(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && Ua(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Ws(e, t, i), e = e.sibling; e !== null; )
        Ws(e, t, i), e = e.sibling;
  }
  function Qp(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Nt(t, l, i), t[oe] = e, t[ue] = i;
    } catch (c) {
      ke(e, e.return, c);
    }
  }
  var la = !1, St = !1, Fc = !1, Zp = typeof WeakSet == "function" ? WeakSet : Set, Ct = null;
  function hx(e, t) {
    if (e = e.containerInfo, mf = xo, e = sm(e), Hu(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var l = i.getSelection && i.getSelection();
          if (l && l.rangeCount !== 0) {
            i = l.anchorNode;
            var u = l.anchorOffset, c = l.focusNode;
            l = l.focusOffset;
            try {
              i.nodeType, c.nodeType;
            } catch {
              i = null;
              break e;
            }
            var y = 0, x = -1, M = -1, V = 0, X = 0, Z = e, Y = null;
            t: for (; ; ) {
              for (var G; Z !== i || u !== 0 && Z.nodeType !== 3 || (x = y + u), Z !== c || l !== 0 && Z.nodeType !== 3 || (M = y + l), Z.nodeType === 3 && (y += Z.nodeValue.length), (G = Z.firstChild) !== null; )
                Y = Z, Z = G;
              for (; ; ) {
                if (Z === e) break t;
                if (Y === i && ++V === u && (x = y), Y === c && ++X === l && (M = y), (G = Z.nextSibling) !== null) break;
                Z = Y, Y = Z.parentNode;
              }
              Z = G;
            }
            i = x === -1 || M === -1 ? null : { start: x, end: M };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (pf = { focusedElem: e, selectionRange: i }, xo = !1, Ct = t; Ct !== null; )
      if (t = Ct, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ct = e;
      else
        for (; Ct !== null; ) {
          switch (t = Ct, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  u = e[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, i = t, u = c.memoizedProps, c = c.memoizedState, l = i.stateNode;
                try {
                  var me = gi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    me,
                    c
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ee) {
                  ke(
                    i,
                    i.return,
                    Ee
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  vf(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      vf(e);
                      break;
                    default:
                      e.textContent = "";
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ct = e;
            break;
          }
          Ct = t.return;
        }
  }
  function $p(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        sa(e, i), l & 4 && or(5, i);
        break;
      case 1:
        if (sa(e, i), l & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (y) {
              ke(i, i.return, y);
            }
          else {
            var u = gi(
              i.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              ke(
                i,
                i.return,
                y
              );
            }
          }
        l & 64 && kp(i), l & 512 && ur(i, i.return);
        break;
      case 3:
        if (sa(e, i), l & 64 && (e = i.updateQueue, e !== null)) {
          if (t = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                t = i.child.stateNode;
                break;
              case 1:
                t = i.child.stateNode;
            }
          try {
            _m(e, t);
          } catch (y) {
            ke(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Qp(i);
      case 26:
      case 5:
        sa(e, i), t === null && l & 4 && Fp(i), l & 512 && ur(i, i.return);
        break;
      case 12:
        sa(e, i);
        break;
      case 31:
        sa(e, i), l & 4 && Wp(e, i);
        break;
      case 13:
        sa(e, i), l & 4 && ey(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = Tx.bind(
          null,
          i
        ), Gx(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || la, !l) {
          t = t !== null && t.memoizedState !== null || St, u = la;
          var c = St;
          la = l, (St = t) && !c ? oa(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : sa(e, i), la = u, St = c;
        }
        break;
      case 30:
        break;
      default:
        sa(e, i);
    }
  }
  function Jp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Jp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && $e(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var lt = null, Xt = !1;
  function ra(e, t, i) {
    for (i = i.child; i !== null; )
      Ip(e, t, i), i = i.sibling;
  }
  function Ip(e, t, i) {
    if (Ht && typeof Ht.onCommitFiberUnmount == "function")
      try {
        Ht.onCommitFiberUnmount(Kn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        St || Bn(i, t), ra(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        St || Bn(i, t);
        var l = lt, u = Xt;
        Ua(i.type) && (lt = i.stateNode, Xt = !1), ra(
          e,
          t,
          i
        ), vr(i.stateNode), lt = l, Xt = u;
        break;
      case 5:
        St || Bn(i, t);
      case 6:
        if (l = lt, u = Xt, lt = null, ra(
          e,
          t,
          i
        ), lt = l, Xt = u, lt !== null)
          if (Xt)
            try {
              (lt.nodeType === 9 ? lt.body : lt.nodeName === "HTML" ? lt.ownerDocument.body : lt).removeChild(i.stateNode);
            } catch (c) {
              ke(
                i,
                t,
                c
              );
            }
          else
            try {
              lt.removeChild(i.stateNode);
            } catch (c) {
              ke(
                i,
                t,
                c
              );
            }
        break;
      case 18:
        lt !== null && (Xt ? (e = lt, ky(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), gl(e)) : ky(lt, i.stateNode));
        break;
      case 4:
        l = lt, u = Xt, lt = i.stateNode.containerInfo, Xt = !0, ra(
          e,
          t,
          i
        ), lt = l, Xt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ja(2, i, t), St || ja(4, i, t), ra(
          e,
          t,
          i
        );
        break;
      case 1:
        St || (Bn(i, t), l = i.stateNode, typeof l.componentWillUnmount == "function" && Xp(
          i,
          t,
          l
        )), ra(
          e,
          t,
          i
        );
        break;
      case 21:
        ra(
          e,
          t,
          i
        );
        break;
      case 22:
        St = (l = St) || i.memoizedState !== null, ra(
          e,
          t,
          i
        ), St = l;
        break;
      default:
        ra(
          e,
          t,
          i
        );
    }
  }
  function Wp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        gl(e);
      } catch (i) {
        ke(t, t.return, i);
      }
    }
  }
  function ey(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        gl(e);
      } catch (i) {
        ke(t, t.return, i);
      }
  }
  function mx(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Zp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Zp()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function eo(e, t) {
    var i = mx(e);
    t.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var u = Ex.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function Ft(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l], c = e, y = t, x = y;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (Ua(x.type)) {
                lt = x.stateNode, Xt = !1;
                break e;
              }
              break;
            case 5:
              lt = x.stateNode, Xt = !1;
              break e;
            case 3:
            case 4:
              lt = x.stateNode.containerInfo, Xt = !0;
              break e;
          }
          x = x.return;
        }
        if (lt === null) throw Error(s(160));
        Ip(c, y, u), lt = null, Xt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ty(t, e), t = t.sibling;
  }
  var Cn = null;
  function ty(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ft(t, e), Kt(e), l & 4 && (ja(3, e, e.return), or(3, e), ja(5, e, e.return));
        break;
      case 1:
        Ft(t, e), Kt(e), l & 512 && (St || i === null || Bn(i, i.return)), l & 64 && la && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var u = Cn;
        if (Ft(t, e), Kt(e), l & 512 && (St || i === null || Bn(i, i.return)), l & 4) {
          var c = i !== null ? i.memoizedState : null;
          if (l = e.memoizedState, i === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      c = u.getElementsByTagName("title")[0], (!c || c[je] || c[oe] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = u.createElement(l), u.head.insertBefore(
                        c,
                        u.querySelector("head > title")
                      )), Nt(c, l, i), c[oe] = e, We(c), l = c;
                      break e;
                    case "link":
                      var y = tg(
                        "link",
                        "href",
                        u
                      ).get(l + (i.href || ""));
                      if (y) {
                        for (var x = 0; x < y.length; x++)
                          if (c = y[x], c.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && c.getAttribute("rel") === (i.rel == null ? null : i.rel) && c.getAttribute("title") === (i.title == null ? null : i.title) && c.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            y.splice(x, 1);
                            break t;
                          }
                      }
                      c = u.createElement(l), Nt(c, l, i), u.head.appendChild(c);
                      break;
                    case "meta":
                      if (y = tg(
                        "meta",
                        "content",
                        u
                      ).get(l + (i.content || ""))) {
                        for (x = 0; x < y.length; x++)
                          if (c = y[x], c.getAttribute("content") === (i.content == null ? null : "" + i.content) && c.getAttribute("name") === (i.name == null ? null : i.name) && c.getAttribute("property") === (i.property == null ? null : i.property) && c.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && c.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            y.splice(x, 1);
                            break t;
                          }
                      }
                      c = u.createElement(l), Nt(c, l, i), u.head.appendChild(c);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  c[oe] = e, We(c), l = c;
                }
                e.stateNode = l;
              } else
                ng(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = eg(
                u,
                l,
                e.memoizedProps
              );
          else
            c !== l ? (c === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : c.count--, l === null ? ng(
              u,
              e.type,
              e.stateNode
            ) : eg(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Pc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Ft(t, e), Kt(e), l & 512 && (St || i === null || Bn(i, i.return)), i !== null && l & 4 && Pc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Ft(t, e), Kt(e), l & 512 && (St || i === null || Bn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            qi(u, "");
          } catch (me) {
            ke(e, e.return, me);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, Pc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (Fc = !0);
        break;
      case 6:
        if (Ft(t, e), Kt(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (me) {
            ke(e, e.return, me);
          }
        }
        break;
      case 3:
        if (go = null, u = Cn, Cn = po(t.containerInfo), Ft(t, e), Cn = u, Kt(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            gl(t.containerInfo);
          } catch (me) {
            ke(e, e.return, me);
          }
        Fc && (Fc = !1, ny(e));
        break;
      case 4:
        l = Cn, Cn = po(
          e.stateNode.containerInfo
        ), Ft(t, e), Kt(e), Cn = l;
        break;
      case 12:
        Ft(t, e), Kt(e);
        break;
      case 31:
        Ft(t, e), Kt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, eo(e, l)));
        break;
      case 13:
        Ft(t, e), Kt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (no = Bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, eo(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var M = i !== null && i.memoizedState !== null, V = la, X = St;
        if (la = V || u, St = X || M, Ft(t, e), St = X, la = V, Kt(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || M || la || St || vi(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                M = i = t;
                try {
                  if (c = M.stateNode, u)
                    y = c.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    x = M.stateNode;
                    var Z = M.memoizedProps.style, Y = Z != null && Z.hasOwnProperty("display") ? Z.display : null;
                    x.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (me) {
                  ke(M, M.return, me);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                M = t;
                try {
                  M.stateNode.nodeValue = u ? "" : M.memoizedProps;
                } catch (me) {
                  ke(M, M.return, me);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                M = t;
                try {
                  var G = M.stateNode;
                  u ? Xy(G, !0) : Xy(M.stateNode, !1);
                } catch (me) {
                  ke(M, M.return, me);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              i === t && (i = null), t = t.return;
            }
            i === t && (i = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, eo(e, i))));
        break;
      case 19:
        Ft(t, e), Kt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, eo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ft(t, e), Kt(e);
    }
  }
  function Kt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, l = e.return; l !== null; ) {
          if (Kp(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, c = kc(e);
            Ws(e, c, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (qi(y, ""), i.flags &= -33);
            var x = kc(e);
            Ws(e, x, y);
            break;
          case 3:
          case 4:
            var M = i.stateNode.containerInfo, V = kc(e);
            Xc(
              e,
              V,
              M
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (X) {
        ke(e, e.return, X);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ny(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        ny(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function sa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        $p(e, t.alternate, t), t = t.sibling;
  }
  function vi(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ja(4, t, t.return), vi(t);
          break;
        case 1:
          Bn(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && Xp(
            t,
            t.return,
            i
          ), vi(t);
          break;
        case 27:
          vr(t.stateNode);
        case 26:
        case 5:
          Bn(t, t.return), vi(t);
          break;
        case 22:
          t.memoizedState === null && vi(t);
          break;
        case 30:
          vi(t);
          break;
        default:
          vi(t);
      }
      e = e.sibling;
    }
  }
  function oa(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, c = t, y = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          oa(
            u,
            c,
            i
          ), or(4, c);
          break;
        case 1:
          if (oa(
            u,
            c,
            i
          ), l = c, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (V) {
              ke(l, l.return, V);
            }
          if (l = c, u = l.updateQueue, u !== null) {
            var x = l.stateNode;
            try {
              var M = u.shared.hiddenCallbacks;
              if (M !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < M.length; u++)
                  Om(M[u], x);
            } catch (V) {
              ke(l, l.return, V);
            }
          }
          i && y & 64 && kp(c), ur(c, c.return);
          break;
        case 27:
          Qp(c);
        case 26:
        case 5:
          oa(
            u,
            c,
            i
          ), i && l === null && y & 4 && Fp(c), ur(c, c.return);
          break;
        case 12:
          oa(
            u,
            c,
            i
          );
          break;
        case 31:
          oa(
            u,
            c,
            i
          ), i && y & 4 && Wp(u, c);
          break;
        case 13:
          oa(
            u,
            c,
            i
          ), i && y & 4 && ey(u, c);
          break;
        case 22:
          c.memoizedState === null && oa(
            u,
            c,
            i
          ), ur(c, c.return);
          break;
        case 30:
          break;
        default:
          oa(
            u,
            c,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Kc(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Zl(i));
  }
  function Qc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zl(e));
  }
  function wn(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ay(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function ay(e, t, i, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        wn(
          e,
          t,
          i,
          l
        ), u & 2048 && or(9, t);
        break;
      case 1:
        wn(
          e,
          t,
          i,
          l
        );
        break;
      case 3:
        wn(
          e,
          t,
          i,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Zl(e)));
        break;
      case 12:
        if (u & 2048) {
          wn(
            e,
            t,
            i,
            l
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, y = c.id, x = c.onPostCommit;
            typeof x == "function" && x(
              y,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (M) {
            ke(t, t.return, M);
          }
        } else
          wn(
            e,
            t,
            i,
            l
          );
        break;
      case 31:
        wn(
          e,
          t,
          i,
          l
        );
        break;
      case 13:
        wn(
          e,
          t,
          i,
          l
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, y = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? wn(
          e,
          t,
          i,
          l
        ) : cr(e, t) : c._visibility & 2 ? wn(
          e,
          t,
          i,
          l
        ) : (c._visibility |= 2, rl(
          e,
          t,
          i,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Kc(y, t);
        break;
      case 24:
        wn(
          e,
          t,
          i,
          l
        ), u & 2048 && Qc(t.alternate, t);
        break;
      default:
        wn(
          e,
          t,
          i,
          l
        );
    }
  }
  function rl(e, t, i, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, y = t, x = i, M = l, V = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          rl(
            c,
            y,
            x,
            M,
            u
          ), or(8, y);
          break;
        case 23:
          break;
        case 22:
          var X = y.stateNode;
          y.memoizedState !== null ? X._visibility & 2 ? rl(
            c,
            y,
            x,
            M,
            u
          ) : cr(
            c,
            y
          ) : (X._visibility |= 2, rl(
            c,
            y,
            x,
            M,
            u
          )), u && V & 2048 && Kc(
            y.alternate,
            y
          );
          break;
        case 24:
          rl(
            c,
            y,
            x,
            M,
            u
          ), u && V & 2048 && Qc(y.alternate, y);
          break;
        default:
          rl(
            c,
            y,
            x,
            M,
            u
          );
      }
      t = t.sibling;
    }
  }
  function cr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            cr(i, l), u & 2048 && Kc(
              l.alternate,
              l
            );
            break;
          case 24:
            cr(i, l), u & 2048 && Qc(l.alternate, l);
            break;
          default:
            cr(i, l);
        }
        t = t.sibling;
      }
  }
  var fr = 8192;
  function sl(e, t, i) {
    if (e.subtreeFlags & fr)
      for (e = e.child; e !== null; )
        iy(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function iy(e, t, i) {
    switch (e.tag) {
      case 26:
        sl(
          e,
          t,
          i
        ), e.flags & fr && e.memoizedState !== null && eT(
          i,
          Cn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        sl(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var l = Cn;
        Cn = po(e.stateNode.containerInfo), sl(
          e,
          t,
          i
        ), Cn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = fr, fr = 16777216, sl(
          e,
          t,
          i
        ), fr = l) : sl(
          e,
          t,
          i
        ));
        break;
      default:
        sl(
          e,
          t,
          i
        );
    }
  }
  function ly(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function dr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ct = l, sy(
            l,
            e
          );
        }
      ly(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ry(e), e = e.sibling;
  }
  function ry(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        dr(e), e.flags & 2048 && ja(9, e, e.return);
        break;
      case 3:
        dr(e);
        break;
      case 12:
        dr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, to(e)) : dr(e);
        break;
      default:
        dr(e);
    }
  }
  function to(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ct = l, sy(
            l,
            e
          );
        }
      ly(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, t, t.return), to(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, to(t));
          break;
        default:
          to(t);
      }
      e = e.sibling;
    }
  }
  function sy(e, t) {
    for (; Ct !== null; ) {
      var i = Ct;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Zl(i.memoizedState.cache);
      }
      if (l = i.child, l !== null) l.return = i, Ct = l;
      else
        e: for (i = e; Ct !== null; ) {
          l = Ct;
          var u = l.sibling, c = l.return;
          if (Jp(l), l === i) {
            Ct = null;
            break e;
          }
          if (u !== null) {
            u.return = c, Ct = u;
            break e;
          }
          Ct = c;
        }
    }
  }
  var px = {
    getCacheForType: function(e) {
      var t = Dt(gt), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Dt(gt).controller.signal;
    }
  }, yx = typeof WeakMap == "function" ? WeakMap : Map, Ge = 0, Je = null, _e = null, Ve = 0, Pe = 0, nn = null, Na = !1, ol = !1, Zc = !1, ua = 0, ut = 0, za = 0, bi = 0, $c = 0, an = 0, ul = 0, hr = null, Qt = null, Jc = !1, no = 0, oy = 0, ao = 1 / 0, io = null, Oa = null, Et = 0, _a = null, cl = null, ca = 0, Ic = 0, Wc = null, uy = null, mr = 0, ef = null;
  function ln() {
    return (Ge & 2) !== 0 && Ve !== 0 ? Ve & -Ve : U.T !== null ? sf() : J();
  }
  function cy() {
    if (an === 0)
      if ((Ve & 536870912) === 0 || Be) {
        var e = Qn;
        Qn <<= 1, (Qn & 3932160) === 0 && (Qn = 262144), an = e;
      } else an = 536870912;
    return e = en.current, e !== null && (e.flags |= 32), an;
  }
  function Zt(e, t, i) {
    (e === Je && (Pe === 2 || Pe === 9) || e.cancelPendingCommit !== null) && (fl(e, 0), La(
      e,
      Ve,
      an,
      !1
    )), On(e, i), ((Ge & 2) === 0 || e !== Je) && (e === Je && ((Ge & 2) === 0 && (bi |= i), ut === 4 && La(
      e,
      Ve,
      an,
      !1
    )), Hn(e));
  }
  function fy(e, t, i) {
    if ((Ge & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ga(e, t), u = l ? bx(e, t) : nf(e, t, !0), c = l;
    do {
      if (u === 0) {
        ol && !l && La(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, c && !gx(i)) {
          u = nf(e, t, !1), c = !1;
          continue;
        }
        if (u === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var y = 0;
          else
            y = e.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            t = y;
            e: {
              var x = e;
              u = hr;
              var M = x.current.memoizedState.isDehydrated;
              if (M && (fl(x, y).flags |= 256), y = nf(
                x,
                y,
                !1
              ), y !== 2) {
                if (Zc && !M) {
                  x.errorRecoveryDisabledLanes |= c, bi |= c, u = 4;
                  break e;
                }
                c = Qt, Qt = u, c !== null && (Qt === null ? Qt = c : Qt.push.apply(
                  Qt,
                  c
                ));
              }
              u = y;
            }
            if (c = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          fl(e, 0), La(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, c = u, c) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              La(
                l,
                t,
                an,
                !Na
              );
              break e;
            case 2:
              Qt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = no + 300 - Bt(), 10 < u)) {
            if (La(
              l,
              t,
              an,
              !Na
            ), Li(l, 0, !0) !== 0) break e;
            ca = t, l.timeoutHandle = Gy(
              dy.bind(
                null,
                l,
                i,
                Qt,
                io,
                Jc,
                t,
                an,
                bi,
                ul,
                Na,
                c,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          dy(
            l,
            i,
            Qt,
            io,
            Jc,
            t,
            an,
            bi,
            ul,
            Na,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Hn(e);
  }
  function dy(e, t, i, l, u, c, y, x, M, V, X, Z, Y, G) {
    if (e.timeoutHandle = -1, Z = t.subtreeFlags, Z & 8192 || (Z & 16785408) === 16785408) {
      Z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Zn
      }, iy(
        t,
        c,
        Z
      );
      var me = (c & 62914560) === c ? no - Bt() : (c & 4194048) === c ? oy - Bt() : 0;
      if (me = tT(
        Z,
        me
      ), me !== null) {
        ca = c, e.cancelPendingCommit = me(
          Sy.bind(
            null,
            e,
            t,
            c,
            i,
            l,
            u,
            y,
            x,
            M,
            X,
            Z,
            null,
            Y,
            G
          )
        ), La(e, c, y, !V);
        return;
      }
    }
    Sy(
      e,
      t,
      c,
      i,
      l,
      u,
      y,
      x,
      M
    );
  }
  function gx(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var u = i[l], c = u.getSnapshot;
          u = u.value;
          try {
            if (!It(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = t.child, t.subtreeFlags & 16384 && i !== null)
        i.return = t, t = i;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function La(e, t, i, l) {
    t &= ~$c, t &= ~bi, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var c = 31 - _t(u), y = 1 << c;
      l[c] = -1, u &= ~y;
    }
    i !== 0 && ms(e, i, t);
  }
  function lo() {
    return (Ge & 6) === 0 ? (pr(0), !1) : !0;
  }
  function tf() {
    if (_e !== null) {
      if (Pe === 0)
        var e = _e.return;
      else
        e = _e, Wn = ci = null, gc(e), tl = null, Jl = 0, e = _e;
      for (; e !== null; )
        Pp(e.alternate, e), e = e.return;
      _e = null;
    }
  }
  function fl(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Ux(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), ca = 0, tf(), Je = e, _e = i = Jn(e.current, null), Ve = t, Pe = 0, nn = null, Na = !1, ol = ga(e, t), Zc = !1, ul = an = $c = bi = za = ut = 0, Qt = hr = null, Jc = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - _t(l), c = 1 << u;
        t |= e[u], l &= ~c;
      }
    return ua = t, As(), i;
  }
  function hy(e, t) {
    Ce = null, U.H = lr, t === el || t === _s ? (t = Dm(), Pe = 3) : t === lc ? (t = Dm(), Pe = 4) : Pe = t === Oc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, nn = t, _e === null && (ut = 1, Qs(
      e,
      cn(t, e.current)
    ));
  }
  function my() {
    var e = en.current;
    return e === null ? !0 : (Ve & 4194048) === Ve ? mn === null : (Ve & 62914560) === Ve || (Ve & 536870912) !== 0 ? e === mn : !1;
  }
  function py() {
    var e = U.H;
    return U.H = lr, e === null ? lr : e;
  }
  function yy() {
    var e = U.A;
    return U.A = px, e;
  }
  function ro() {
    ut = 4, Na || (Ve & 4194048) !== Ve && en.current !== null || (ol = !0), (za & 134217727) === 0 && (bi & 134217727) === 0 || Je === null || La(
      Je,
      Ve,
      an,
      !1
    );
  }
  function nf(e, t, i) {
    var l = Ge;
    Ge |= 2;
    var u = py(), c = yy();
    (Je !== e || Ve !== t) && (io = null, fl(e, t)), t = !1;
    var y = ut;
    e: do
      try {
        if (Pe !== 0 && _e !== null) {
          var x = _e, M = nn;
          switch (Pe) {
            case 8:
              tf(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              en.current === null && (t = !0);
              var V = Pe;
              if (Pe = 0, nn = null, dl(e, x, M, V), i && ol) {
                y = 0;
                break e;
              }
              break;
            default:
              V = Pe, Pe = 0, nn = null, dl(e, x, M, V);
          }
        }
        vx(), y = ut;
        break;
      } catch (X) {
        hy(e, X);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Wn = ci = null, Ge = l, U.H = u, U.A = c, _e === null && (Je = null, Ve = 0, As()), y;
  }
  function vx() {
    for (; _e !== null; ) gy(_e);
  }
  function bx(e, t) {
    var i = Ge;
    Ge |= 2;
    var l = py(), u = yy();
    Je !== e || Ve !== t ? (io = null, ao = Bt() + 500, fl(e, t)) : ol = ga(
      e,
      t
    );
    e: do
      try {
        if (Pe !== 0 && _e !== null) {
          t = _e;
          var c = nn;
          t: switch (Pe) {
            case 1:
              Pe = 0, nn = null, dl(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (Cm(c)) {
                Pe = 0, nn = null, vy(t);
                break;
              }
              t = function() {
                Pe !== 2 && Pe !== 9 || Je !== e || (Pe = 7), Hn(e);
              }, c.then(t, t);
              break e;
            case 3:
              Pe = 7;
              break e;
            case 4:
              Pe = 5;
              break e;
            case 7:
              Cm(c) ? (Pe = 0, nn = null, vy(t)) : (Pe = 0, nn = null, dl(e, t, c, 7));
              break;
            case 5:
              var y = null;
              switch (_e.tag) {
                case 26:
                  y = _e.memoizedState;
                case 5:
                case 27:
                  var x = _e;
                  if (y ? ag(y) : x.stateNode.complete) {
                    Pe = 0, nn = null;
                    var M = x.sibling;
                    if (M !== null) _e = M;
                    else {
                      var V = x.return;
                      V !== null ? (_e = V, so(V)) : _e = null;
                    }
                    break t;
                  }
              }
              Pe = 0, nn = null, dl(e, t, c, 5);
              break;
            case 6:
              Pe = 0, nn = null, dl(e, t, c, 6);
              break;
            case 8:
              tf(), ut = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Sx();
        break;
      } catch (X) {
        hy(e, X);
      }
    while (!0);
    return Wn = ci = null, U.H = l, U.A = u, Ge = i, _e !== null ? 0 : (Je = null, Ve = 0, As(), ut);
  }
  function Sx() {
    for (; _e !== null && !bu(); )
      gy(_e);
  }
  function gy(e) {
    var t = Yp(e.alternate, e, ua);
    e.memoizedProps = e.pendingProps, t === null ? so(e) : _e = t;
  }
  function vy(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Lp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ve
        );
        break;
      case 11:
        t = Lp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ve
        );
        break;
      case 5:
        gc(t);
      default:
        Pp(i, t), t = _e = ym(t, ua), t = Yp(i, t, ua);
    }
    e.memoizedProps = e.pendingProps, t === null ? so(e) : _e = t;
  }
  function dl(e, t, i, l) {
    Wn = ci = null, gc(t), tl = null, Jl = 0;
    var u = t.return;
    try {
      if (ox(
        e,
        u,
        t,
        i,
        Ve
      )) {
        ut = 1, Qs(
          e,
          cn(i, e.current)
        ), _e = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw _e = u, c;
      ut = 1, Qs(
        e,
        cn(i, e.current)
      ), _e = null;
      return;
    }
    t.flags & 32768 ? (Be || l === 1 ? e = !0 : ol || (Ve & 536870912) !== 0 ? e = !1 : (Na = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = en.current, l !== null && l.tag === 13 && (l.flags |= 16384))), by(t, e)) : so(t);
  }
  function so(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        by(
          t,
          Na
        );
        return;
      }
      e = t.return;
      var i = fx(
        t.alternate,
        t,
        ua
      );
      if (i !== null) {
        _e = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        _e = t;
        return;
      }
      _e = t = e;
    } while (t !== null);
    ut === 0 && (ut = 5);
  }
  function by(e, t) {
    do {
      var i = dx(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, _e = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        _e = e;
        return;
      }
      _e = e = i;
    } while (e !== null);
    ut = 6, _e = null;
  }
  function Sy(e, t, i, l, u, c, y, x, M) {
    e.cancelPendingCommit = null;
    do
      oo();
    while (Et !== 0);
    if ((Ge & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (c = t.lanes | t.childLanes, c |= ku, hs(
        e,
        i,
        c,
        y,
        x,
        M
      ), e === Je && (_e = Je = null, Ve = 0), cl = t, _a = e, ca = i, Ic = c, Wc = u, uy = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Rx(ya, function() {
        return My(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = U.T, U.T = null, u = W.p, W.p = 2, y = Ge, Ge |= 4;
        try {
          hx(e, t, i);
        } finally {
          Ge = y, W.p = u, U.T = l;
        }
      }
      Et = 1, xy(), Ty(), Ey();
    }
  }
  function xy() {
    if (Et === 1) {
      Et = 0;
      var e = _a, t = cl, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = U.T, U.T = null;
        var l = W.p;
        W.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          ty(t, e);
          var c = pf, y = sm(e.containerInfo), x = c.focusedElem, M = c.selectionRange;
          if (y !== x && x && x.ownerDocument && rm(
            x.ownerDocument.documentElement,
            x
          )) {
            if (M !== null && Hu(x)) {
              var V = M.start, X = M.end;
              if (X === void 0 && (X = V), "selectionStart" in x)
                x.selectionStart = V, x.selectionEnd = Math.min(
                  X,
                  x.value.length
                );
              else {
                var Z = x.ownerDocument || document, Y = Z && Z.defaultView || window;
                if (Y.getSelection) {
                  var G = Y.getSelection(), me = x.textContent.length, Ee = Math.min(M.start, me), Qe = M.end === void 0 ? Ee : Math.min(M.end, me);
                  !G.extend && Ee > Qe && (y = Qe, Qe = Ee, Ee = y);
                  var _ = lm(
                    x,
                    Ee
                  ), D = lm(
                    x,
                    Qe
                  );
                  if (_ && D && (G.rangeCount !== 1 || G.anchorNode !== _.node || G.anchorOffset !== _.offset || G.focusNode !== D.node || G.focusOffset !== D.offset)) {
                    var L = Z.createRange();
                    L.setStart(_.node, _.offset), G.removeAllRanges(), Ee > Qe ? (G.addRange(L), G.extend(D.node, D.offset)) : (L.setEnd(D.node, D.offset), G.addRange(L));
                  }
                }
              }
            }
            for (Z = [], G = x; G = G.parentNode; )
              G.nodeType === 1 && Z.push({
                element: G,
                left: G.scrollLeft,
                top: G.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < Z.length; x++) {
              var K = Z[x];
              K.element.scrollLeft = K.left, K.element.scrollTop = K.top;
            }
          }
          xo = !!mf, pf = mf = null;
        } finally {
          Ge = u, W.p = l, U.T = i;
        }
      }
      e.current = t, Et = 2;
    }
  }
  function Ty() {
    if (Et === 2) {
      Et = 0;
      var e = _a, t = cl, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = U.T, U.T = null;
        var l = W.p;
        W.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          $p(e, t.alternate, t);
        } finally {
          Ge = u, W.p = l, U.T = i;
        }
      }
      Et = 3;
    }
  }
  function Ey() {
    if (Et === 4 || Et === 3) {
      Et = 0, Su();
      var e = _a, t = cl, i = ca, l = uy;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Et = 5 : (Et = 0, cl = _a = null, Ry(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Oa = null), q(i), t = t.stateNode, Ht && typeof Ht.onCommitFiberRoot == "function")
        try {
          Ht.onCommitFiberRoot(
            Kn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = U.T, u = W.p, W.p = 2, U.T = null;
        try {
          for (var c = e.onRecoverableError, y = 0; y < l.length; y++) {
            var x = l[y];
            c(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          U.T = t, W.p = u;
        }
      }
      (ca & 3) !== 0 && oo(), Hn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === ef ? mr++ : (mr = 0, ef = e) : mr = 0, pr(0);
    }
  }
  function Ry(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Zl(t)));
  }
  function oo() {
    return xy(), Ty(), Ey(), My();
  }
  function My() {
    if (Et !== 5) return !1;
    var e = _a, t = Ic;
    Ic = 0;
    var i = q(ca), l = U.T, u = W.p;
    try {
      W.p = 32 > i ? 32 : i, U.T = null, i = Wc, Wc = null;
      var c = _a, y = ca;
      if (Et = 0, cl = _a = null, ca = 0, (Ge & 6) !== 0) throw Error(s(331));
      var x = Ge;
      if (Ge |= 4, ry(c.current), ay(
        c,
        c.current,
        y,
        i
      ), Ge = x, pr(0, !1), Ht && typeof Ht.onPostCommitFiberRoot == "function")
        try {
          Ht.onPostCommitFiberRoot(Kn, c);
        } catch {
        }
      return !0;
    } finally {
      W.p = u, U.T = l, Ry(e, t);
    }
  }
  function Ay(e, t, i) {
    t = cn(i, t), t = zc(e.stateNode, t, 2), e = Ca(e, t, 2), e !== null && (On(e, 2), Hn(e));
  }
  function ke(e, t, i) {
    if (e.tag === 3)
      Ay(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ay(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Oa === null || !Oa.has(l))) {
            e = cn(i, e), i = Cp(2), l = Ca(t, i, 2), l !== null && (wp(
              i,
              l,
              t,
              e
            ), On(l, 2), Hn(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function af(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new yx();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || (Zc = !0, u.add(i), e = xx.bind(null, e, t, i), t.then(e, e));
  }
  function xx(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Je === e && (Ve & i) === i && (ut === 4 || ut === 3 && (Ve & 62914560) === Ve && 300 > Bt() - no ? (Ge & 2) === 0 && fl(e, 0) : $c |= i, ul === Ve && (ul = 0)), Hn(e);
  }
  function Cy(e, t) {
    t === 0 && (t = Ul()), e = si(e, t), e !== null && (On(e, t), Hn(e));
  }
  function Tx(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), Cy(e, i);
  }
  function Ex(e, t) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, u = e.memoizedState;
        u !== null && (i = u.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    l !== null && l.delete(t), Cy(e, i);
  }
  function Rx(e, t) {
    return _i(e, t);
  }
  var uo = null, hl = null, lf = !1, co = !1, rf = !1, Va = 0;
  function Hn(e) {
    e !== hl && e.next === null && (hl === null ? uo = hl = e : hl = hl.next = e), co = !0, lf || (lf = !0, Ax());
  }
  function pr(e, t) {
    if (!rf && co) {
      rf = !0;
      do
        for (var i = !1, l = uo; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var y = l.suspendedLanes, x = l.pingedLanes;
              c = (1 << 31 - _t(42 | e) + 1) - 1, c &= u & ~(y & ~x), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (i = !0, Ny(l, c));
          } else
            c = Ve, c = Li(
              l,
              l === Je ? c : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (c & 3) === 0 || ga(l, c) || (i = !0, Ny(l, c));
          l = l.next;
        }
      while (i);
      rf = !1;
    }
  }
  function Mx() {
    wy();
  }
  function wy() {
    co = lf = !1;
    var e = 0;
    Va !== 0 && Vx() && (e = Va);
    for (var t = Bt(), i = null, l = uo; l !== null; ) {
      var u = l.next, c = Dy(l, t);
      c === 0 ? (l.next = null, i === null ? uo = u : i.next = u, u === null && (hl = i)) : (i = l, (e !== 0 || (c & 3) !== 0) && (co = !0)), l = u;
    }
    Et !== 0 && Et !== 5 || pr(e), Va !== 0 && (Va = 0);
  }
  function Dy(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var y = 31 - _t(c), x = 1 << y, M = u[y];
      M === -1 ? ((x & i) === 0 || (x & l) !== 0) && (u[y] = Eu(x, t)) : M <= t && (e.expiredLanes |= x), c &= ~x;
    }
    if (t = Je, i = Ve, i = Li(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (Pe === 2 || Pe === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Ll(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ga(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (l !== null && Ll(l), q(i)) {
        case 2:
        case 8:
          i = Vl;
          break;
        case 32:
          i = ya;
          break;
        case 268435456:
          i = sn;
          break;
        default:
          i = ya;
      }
      return l = jy.bind(null, e), i = _i(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && Ll(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function jy(e, t) {
    if (Et !== 0 && Et !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (oo() && e.callbackNode !== i)
      return null;
    var l = Ve;
    return l = Li(
      e,
      e === Je ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (fy(e, l, t), Dy(e, Bt()), e.callbackNode != null && e.callbackNode === i ? jy.bind(null, e) : null);
  }
  function Ny(e, t) {
    if (oo()) return null;
    fy(e, t, !0);
  }
  function Ax() {
    Bx(function() {
      (Ge & 6) !== 0 ? _i(
        pa,
        Mx
      ) : wy();
    });
  }
  function sf() {
    if (Va === 0) {
      var e = Ii;
      e === 0 && (e = ei, ei <<= 1, (ei & 261888) === 0 && (ei = 256)), Va = e;
    }
    return Va;
  }
  function zy(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : vs("" + e);
  }
  function Oy(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function Cx(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var c = zy(
        (u[ue] || null).action
      ), y = l.submitter;
      y && (t = (t = y[ue] || null) ? zy(t.formAction) : y.getAttribute("formAction"), t !== null && (c = t, y = null));
      var x = new Ts(
        "action",
        "action",
        null,
        l,
        u
      );
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Va !== 0) {
                  var M = y ? Oy(u, y) : new FormData(u);
                  Ac(
                    i,
                    {
                      pending: !0,
                      data: M,
                      method: u.method,
                      action: c
                    },
                    null,
                    M
                  );
                }
              } else
                typeof c == "function" && (x.preventDefault(), M = y ? Oy(u, y) : new FormData(u), Ac(
                  i,
                  {
                    pending: !0,
                    data: M,
                    method: u.method,
                    action: c
                  },
                  c,
                  M
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var of = 0; of < Pu.length; of++) {
    var uf = Pu[of], wx = uf.toLowerCase(), Dx = uf[0].toUpperCase() + uf.slice(1);
    An(
      wx,
      "on" + Dx
    );
  }
  An(cm, "onAnimationEnd"), An(fm, "onAnimationIteration"), An(dm, "onAnimationStart"), An("dblclick", "onDoubleClick"), An("focusin", "onFocus"), An("focusout", "onBlur"), An(X1, "onTransitionRun"), An(F1, "onTransitionStart"), An(K1, "onTransitionCancel"), An(hm, "onTransitionEnd"), _n("onMouseEnter", ["mouseout", "mouseover"]), _n("onMouseLeave", ["mouseout", "mouseover"]), _n("onPointerEnter", ["pointerout", "pointerover"]), _n("onPointerLeave", ["pointerout", "pointerover"]), At(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), At(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), At("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), At(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), At(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), At(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var yr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), jx = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yr)
  );
  function _y(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], u = l.event;
      l = l.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var x = l[y], M = x.instance, V = x.currentTarget;
            if (x = x.listener, M !== c && u.isPropagationStopped())
              break e;
            c = x, u.currentTarget = V;
            try {
              c(u);
            } catch (X) {
              Ms(X);
            }
            u.currentTarget = null, c = M;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (x = l[y], M = x.instance, V = x.currentTarget, x = x.listener, M !== c && u.isPropagationStopped())
              break e;
            c = x, u.currentTarget = V;
            try {
              c(u);
            } catch (X) {
              Ms(X);
            }
            u.currentTarget = null, c = M;
          }
      }
    }
  }
  function Le(e, t) {
    var i = t[he];
    i === void 0 && (i = t[he] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (Ly(t, e, 2, !1), i.add(l));
  }
  function cf(e, t, i) {
    var l = 0;
    t && (l |= 4), Ly(
      i,
      e,
      l,
      t
    );
  }
  var fo = "_reactListening" + Math.random().toString(36).slice(2);
  function ff(e) {
    if (!e[fo]) {
      e[fo] = !0, ba.forEach(function(i) {
        i !== "selectionchange" && (jx.has(i) || cf(i, !1, e), cf(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[fo] || (t[fo] = !0, cf("selectionchange", !1, t));
    }
  }
  function Ly(e, t, i, l) {
    switch (cg(t)) {
      case 2:
        var u = iT;
        break;
      case 8:
        u = lT;
        break;
      default:
        u = Af;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !ju || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function df(e, t, i, l, u) {
    var c = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var y = l.tag;
        if (y === 3 || y === 4) {
          var x = l.stateNode.containerInfo;
          if (x === u) break;
          if (y === 4)
            for (y = l.return; y !== null; ) {
              var M = y.tag;
              if ((M === 3 || M === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; x !== null; ) {
            if (y = Xe(x), y === null) return;
            if (M = y.tag, M === 5 || M === 6 || M === 26 || M === 27) {
              l = c = y;
              continue e;
            }
            x = x.parentNode;
          }
        }
        l = l.return;
      }
    qh(function() {
      var V = c, X = wu(i), Z = [];
      e: {
        var Y = mm.get(e);
        if (Y !== void 0) {
          var G = Ts, me = e;
          switch (e) {
            case "keypress":
              if (Ss(i) === 0) break e;
            case "keydown":
            case "keyup":
              G = E1;
              break;
            case "focusin":
              me = "focus", G = _u;
              break;
            case "focusout":
              me = "blur", G = _u;
              break;
            case "beforeblur":
            case "afterblur":
              G = _u;
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
              G = Ph;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              G = f1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              G = A1;
              break;
            case cm:
            case fm:
            case dm:
              G = m1;
              break;
            case hm:
              G = w1;
              break;
            case "scroll":
            case "scrollend":
              G = u1;
              break;
            case "wheel":
              G = j1;
              break;
            case "copy":
            case "cut":
            case "paste":
              G = y1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              G = Xh;
              break;
            case "toggle":
            case "beforetoggle":
              G = z1;
          }
          var Ee = (t & 4) !== 0, Qe = !Ee && (e === "scroll" || e === "scrollend"), _ = Ee ? Y !== null ? Y + "Capture" : null : Y;
          Ee = [];
          for (var D = V, L; D !== null; ) {
            var K = D;
            if (L = K.stateNode, K = K.tag, K !== 5 && K !== 26 && K !== 27 || L === null || _ === null || (K = Bl(D, _), K != null && Ee.push(
              gr(D, K, L)
            )), Qe) break;
            D = D.return;
          }
          0 < Ee.length && (Y = new G(
            Y,
            me,
            null,
            i,
            X
          ), Z.push({ event: Y, listeners: Ee }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (Y = e === "mouseover" || e === "pointerover", G = e === "mouseout" || e === "pointerout", Y && i !== Cu && (me = i.relatedTarget || i.fromElement) && (Xe(me) || me[ge]))
            break e;
          if ((G || Y) && (Y = X.window === X ? X : (Y = X.ownerDocument) ? Y.defaultView || Y.parentWindow : window, G ? (me = i.relatedTarget || i.toElement, G = V, me = me ? Xe(me) : null, me !== null && (Qe = f(me), Ee = me.tag, me !== Qe || Ee !== 5 && Ee !== 27 && Ee !== 6) && (me = null)) : (G = null, me = V), G !== me)) {
            if (Ee = Ph, K = "onMouseLeave", _ = "onMouseEnter", D = "mouse", (e === "pointerout" || e === "pointerover") && (Ee = Xh, K = "onPointerLeave", _ = "onPointerEnter", D = "pointer"), Qe = G == null ? Y : Oe(G), L = me == null ? Y : Oe(me), Y = new Ee(
              K,
              D + "leave",
              G,
              i,
              X
            ), Y.target = Qe, Y.relatedTarget = L, K = null, Xe(X) === V && (Ee = new Ee(
              _,
              D + "enter",
              me,
              i,
              X
            ), Ee.target = L, Ee.relatedTarget = Qe, K = Ee), Qe = K, G && me)
              t: {
                for (Ee = Nx, _ = G, D = me, L = 0, K = _; K; K = Ee(K))
                  L++;
                K = 0;
                for (var Se = D; Se; Se = Ee(Se))
                  K++;
                for (; 0 < L - K; )
                  _ = Ee(_), L--;
                for (; 0 < K - L; )
                  D = Ee(D), K--;
                for (; L--; ) {
                  if (_ === D || D !== null && _ === D.alternate) {
                    Ee = _;
                    break t;
                  }
                  _ = Ee(_), D = Ee(D);
                }
                Ee = null;
              }
            else Ee = null;
            G !== null && Vy(
              Z,
              Y,
              G,
              Ee,
              !1
            ), me !== null && Qe !== null && Vy(
              Z,
              Qe,
              me,
              Ee,
              !0
            );
          }
        }
        e: {
          if (Y = V ? Oe(V) : window, G = Y.nodeName && Y.nodeName.toLowerCase(), G === "select" || G === "input" && Y.type === "file")
            var qe = Wh;
          else if (Jh(Y))
            if (em)
              qe = G1;
            else {
              qe = q1;
              var ve = H1;
            }
          else
            G = Y.nodeName, !G || G.toLowerCase() !== "input" || Y.type !== "checkbox" && Y.type !== "radio" ? V && Au(V.elementType) && (qe = Wh) : qe = Y1;
          if (qe && (qe = qe(e, V))) {
            Ih(
              Z,
              qe,
              i,
              X
            );
            break e;
          }
          ve && ve(e, Y, V), e === "focusout" && V && Y.type === "number" && V.memoizedProps.value != null && Mu(Y, "number", Y.value);
        }
        switch (ve = V ? Oe(V) : window, e) {
          case "focusin":
            (Jh(ve) || ve.contentEditable === "true") && (ki = ve, qu = V, Fl = null);
            break;
          case "focusout":
            Fl = qu = ki = null;
            break;
          case "mousedown":
            Yu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Yu = !1, om(Z, i, X);
            break;
          case "selectionchange":
            if (k1) break;
          case "keydown":
          case "keyup":
            om(Z, i, X);
        }
        var we;
        if (Vu)
          e: {
            switch (e) {
              case "compositionstart":
                var Ue = "onCompositionStart";
                break e;
              case "compositionend":
                Ue = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ue = "onCompositionUpdate";
                break e;
            }
            Ue = void 0;
          }
        else
          Pi ? Zh(e, i) && (Ue = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Ue = "onCompositionStart");
        Ue && (Fh && i.locale !== "ko" && (Pi || Ue !== "onCompositionStart" ? Ue === "onCompositionEnd" && Pi && (we = Yh()) : (Sa = X, Nu = "value" in Sa ? Sa.value : Sa.textContent, Pi = !0)), ve = ho(V, Ue), 0 < ve.length && (Ue = new kh(
          Ue,
          e,
          null,
          i,
          X
        ), Z.push({ event: Ue, listeners: ve }), we ? Ue.data = we : (we = $h(i), we !== null && (Ue.data = we)))), (we = _1 ? L1(e, i) : V1(e, i)) && (Ue = ho(V, "onBeforeInput"), 0 < Ue.length && (ve = new kh(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          X
        ), Z.push({
          event: ve,
          listeners: Ue
        }), ve.data = we)), Cx(
          Z,
          e,
          V,
          i,
          X
        );
      }
      _y(Z, t);
    });
  }
  function gr(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function ho(e, t) {
    for (var i = t + "Capture", l = []; e !== null; ) {
      var u = e, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = Bl(e, i), u != null && l.unshift(
        gr(e, u, c)
      ), u = Bl(e, t), u != null && l.push(
        gr(e, u, c)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Nx(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Vy(e, t, i, l, u) {
    for (var c = t._reactName, y = []; i !== null && i !== l; ) {
      var x = i, M = x.alternate, V = x.stateNode;
      if (x = x.tag, M !== null && M === l) break;
      x !== 5 && x !== 26 && x !== 27 || V === null || (M = V, u ? (V = Bl(i, c), V != null && y.unshift(
        gr(i, V, M)
      )) : u || (V = Bl(i, c), V != null && y.push(
        gr(i, V, M)
      ))), i = i.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var zx = /\r\n?/g, Ox = /\u0000|\uFFFD/g;
  function Uy(e) {
    return (typeof e == "string" ? e : "" + e).replace(zx, `
`).replace(Ox, "");
  }
  function By(e, t) {
    return t = Uy(t), Uy(e) === t;
  }
  function Ke(e, t, i, l, u, c) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || qi(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && qi(e, "" + l);
        break;
      case "className":
        ct(e, "class", l);
        break;
      case "tabIndex":
        ct(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ct(e, i, l);
        break;
      case "style":
        Bh(e, l, c);
        break;
      case "data":
        if (t !== "object") {
          ct(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = vs("" + l), e.setAttribute(i, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (i === "formAction" ? (t !== "input" && Ke(e, t, "name", u.name, u, null), Ke(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Ke(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Ke(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Ke(e, t, "encType", u.encType, u, null), Ke(e, t, "method", u.method, u, null), Ke(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = vs("" + l), e.setAttribute(i, l);
        break;
      case "onClick":
        l != null && (e.onclick = Zn);
        break;
      case "onScroll":
        l != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Le("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (i = l.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = i;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
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
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        i = vs("" + l), e.setAttributeNS(
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, "" + l) : e.removeAttribute(i);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(i, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, l) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(i, l) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(i) : e.setAttribute(i, l);
        break;
      case "popover":
        Le("beforetoggle", e), Le("toggle", e), Ne(e, "popover", l);
        break;
      case "xlinkActuate":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Ne(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = s1.get(i) || i, Ne(e, i, l));
    }
  }
  function hf(e, t, i, l, u, c) {
    switch (i) {
      case "style":
        Bh(e, l, c);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (i = l.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof l == "string" ? qi(e, l) : (typeof l == "number" || typeof l == "bigint") && qi(e, "" + l);
        break;
      case "onScroll":
        l != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Le("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Zn);
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
        if (!Mn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), c = e[ue] || null, c = c != null ? c[i] : null, typeof c == "function" && e.removeEventListener(t, c, u), typeof l == "function")) {
              typeof c != "function" && c !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, l, u);
              break e;
            }
            i in e ? e[i] = l : l === !0 ? e.setAttribute(i, "") : Ne(e, i, l);
          }
    }
  }
  function Nt(e, t, i) {
    switch (t) {
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
        Le("error", e), Le("load", e);
        var l = !1, u = !1, c;
        for (c in i)
          if (i.hasOwnProperty(c)) {
            var y = i[c];
            if (y != null)
              switch (c) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  Ke(e, t, c, y, i, null);
              }
          }
        u && Ke(e, t, "srcSet", i.srcSet, i, null), l && Ke(e, t, "src", i.src, i, null);
        return;
      case "input":
        Le("invalid", e);
        var x = c = y = u = null, M = null, V = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var X = i[l];
            if (X != null)
              switch (l) {
                case "name":
                  u = X;
                  break;
                case "type":
                  y = X;
                  break;
                case "checked":
                  M = X;
                  break;
                case "defaultChecked":
                  V = X;
                  break;
                case "value":
                  c = X;
                  break;
                case "defaultValue":
                  x = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null)
                    throw Error(s(137, t));
                  break;
                default:
                  Ke(e, t, l, X, i, null);
              }
          }
        _h(
          e,
          c,
          x,
          M,
          V,
          y,
          u,
          !1
        );
        return;
      case "select":
        Le("invalid", e), l = y = c = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (x = i[u], x != null))
            switch (u) {
              case "value":
                c = x;
                break;
              case "defaultValue":
                y = x;
                break;
              case "multiple":
                l = x;
              default:
                Ke(e, t, u, x, i, null);
            }
        t = c, i = y, e.multiple = !!l, t != null ? Hi(e, !!l, t, !1) : i != null && Hi(e, !!l, i, !0);
        return;
      case "textarea":
        Le("invalid", e), c = u = l = null;
        for (y in i)
          if (i.hasOwnProperty(y) && (x = i[y], x != null))
            switch (y) {
              case "value":
                l = x;
                break;
              case "defaultValue":
                u = x;
                break;
              case "children":
                c = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(s(91));
                break;
              default:
                Ke(e, t, y, x, i, null);
            }
        Vh(e, l, u, c);
        return;
      case "option":
        for (M in i)
          if (i.hasOwnProperty(M) && (l = i[M], l != null))
            switch (M) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ke(e, t, M, l, i, null);
            }
        return;
      case "dialog":
        Le("beforetoggle", e), Le("toggle", e), Le("cancel", e), Le("close", e);
        break;
      case "iframe":
      case "object":
        Le("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < yr.length; l++)
          Le(yr[l], e);
        break;
      case "image":
        Le("error", e), Le("load", e);
        break;
      case "details":
        Le("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Le("error", e), Le("load", e);
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
        for (V in i)
          if (i.hasOwnProperty(V) && (l = i[V], l != null))
            switch (V) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Ke(e, t, V, l, i, null);
            }
        return;
      default:
        if (Au(t)) {
          for (X in i)
            i.hasOwnProperty(X) && (l = i[X], l !== void 0 && hf(
              e,
              t,
              X,
              l,
              i,
              void 0
            ));
          return;
        }
    }
    for (x in i)
      i.hasOwnProperty(x) && (l = i[x], l != null && Ke(e, t, x, l, i, null));
  }
  function _x(e, t, i, l) {
    switch (t) {
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
        var u = null, c = null, y = null, x = null, M = null, V = null, X = null;
        for (G in i) {
          var Z = i[G];
          if (i.hasOwnProperty(G) && Z != null)
            switch (G) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                M = Z;
              default:
                l.hasOwnProperty(G) || Ke(e, t, G, null, l, Z);
            }
        }
        for (var Y in l) {
          var G = l[Y];
          if (Z = i[Y], l.hasOwnProperty(Y) && (G != null || Z != null))
            switch (Y) {
              case "type":
                c = G;
                break;
              case "name":
                u = G;
                break;
              case "checked":
                V = G;
                break;
              case "defaultChecked":
                X = G;
                break;
              case "value":
                y = G;
                break;
              case "defaultValue":
                x = G;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(s(137, t));
                break;
              default:
                G !== Z && Ke(
                  e,
                  t,
                  Y,
                  G,
                  l,
                  Z
                );
            }
        }
        Ru(
          e,
          y,
          x,
          M,
          V,
          X,
          c,
          u
        );
        return;
      case "select":
        G = y = x = Y = null;
        for (c in i)
          if (M = i[c], i.hasOwnProperty(c) && M != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                G = M;
              default:
                l.hasOwnProperty(c) || Ke(
                  e,
                  t,
                  c,
                  null,
                  l,
                  M
                );
            }
        for (u in l)
          if (c = l[u], M = i[u], l.hasOwnProperty(u) && (c != null || M != null))
            switch (u) {
              case "value":
                Y = c;
                break;
              case "defaultValue":
                x = c;
                break;
              case "multiple":
                y = c;
              default:
                c !== M && Ke(
                  e,
                  t,
                  u,
                  c,
                  l,
                  M
                );
            }
        t = x, i = y, l = G, Y != null ? Hi(e, !!i, Y, !1) : !!l != !!i && (t != null ? Hi(e, !!i, t, !0) : Hi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        G = Y = null;
        for (x in i)
          if (u = i[x], i.hasOwnProperty(x) && u != null && !l.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ke(e, t, x, null, l, u);
            }
        for (y in l)
          if (u = l[y], c = i[y], l.hasOwnProperty(y) && (u != null || c != null))
            switch (y) {
              case "value":
                Y = u;
                break;
              case "defaultValue":
                G = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== c && Ke(e, t, y, u, l, c);
            }
        Lh(e, Y, G);
        return;
      case "option":
        for (var me in i)
          if (Y = i[me], i.hasOwnProperty(me) && Y != null && !l.hasOwnProperty(me))
            switch (me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ke(
                  e,
                  t,
                  me,
                  null,
                  l,
                  Y
                );
            }
        for (M in l)
          if (Y = l[M], G = i[M], l.hasOwnProperty(M) && Y !== G && (Y != null || G != null))
            switch (M) {
              case "selected":
                e.selected = Y && typeof Y != "function" && typeof Y != "symbol";
                break;
              default:
                Ke(
                  e,
                  t,
                  M,
                  Y,
                  l,
                  G
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
        for (var Ee in i)
          Y = i[Ee], i.hasOwnProperty(Ee) && Y != null && !l.hasOwnProperty(Ee) && Ke(e, t, Ee, null, l, Y);
        for (V in l)
          if (Y = l[V], G = i[V], l.hasOwnProperty(V) && Y !== G && (Y != null || G != null))
            switch (V) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(s(137, t));
                break;
              default:
                Ke(
                  e,
                  t,
                  V,
                  Y,
                  l,
                  G
                );
            }
        return;
      default:
        if (Au(t)) {
          for (var Qe in i)
            Y = i[Qe], i.hasOwnProperty(Qe) && Y !== void 0 && !l.hasOwnProperty(Qe) && hf(
              e,
              t,
              Qe,
              void 0,
              l,
              Y
            );
          for (X in l)
            Y = l[X], G = i[X], !l.hasOwnProperty(X) || Y === G || Y === void 0 && G === void 0 || hf(
              e,
              t,
              X,
              Y,
              l,
              G
            );
          return;
        }
    }
    for (var _ in i)
      Y = i[_], i.hasOwnProperty(_) && Y != null && !l.hasOwnProperty(_) && Ke(e, t, _, null, l, Y);
    for (Z in l)
      Y = l[Z], G = i[Z], !l.hasOwnProperty(Z) || Y === G || Y == null && G == null || Ke(e, t, Z, Y, l, G);
  }
  function Hy(e) {
    switch (e) {
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
  function Lx() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l], c = u.transferSize, y = u.initiatorType, x = u.duration;
        if (c && x && Hy(y)) {
          for (y = 0, x = u.responseEnd, l += 1; l < i.length; l++) {
            var M = i[l], V = M.startTime;
            if (V > x) break;
            var X = M.transferSize, Z = M.initiatorType;
            X && Hy(Z) && (M = M.responseEnd, y += X * (M < x ? 1 : (x - V) / (M - V)));
          }
          if (--l, t += 8 * (c + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var mf = null, pf = null;
  function mo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function qy(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Yy(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function yf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var gf = null;
  function Vx() {
    var e = window.event;
    return e && e.type === "popstate" ? e === gf ? !1 : (gf = e, !0) : (gf = null, !1);
  }
  var Gy = typeof setTimeout == "function" ? setTimeout : void 0, Ux = typeof clearTimeout == "function" ? clearTimeout : void 0, Py = typeof Promise == "function" ? Promise : void 0, Bx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Py < "u" ? function(e) {
    return Py.resolve(null).then(e).catch(Hx);
  } : Gy;
  function Hx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ua(e) {
    return e === "head";
  }
  function ky(e, t) {
    var i = t, l = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(u), gl(t);
            return;
          }
          l--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          l++;
        else if (i === "html")
          vr(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, vr(i);
          for (var c = i.firstChild; c; ) {
            var y = c.nextSibling, x = c.nodeName;
            c[je] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && c.rel.toLowerCase() === "stylesheet" || i.removeChild(c), c = y;
          }
        } else
          i === "body" && vr(e.ownerDocument.body);
      i = u;
    } while (i);
    gl(t);
  }
  function Xy(e, t) {
    var i = e;
    e = 0;
    do {
      var l = i.nextSibling;
      if (i.nodeType === 1 ? t ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (t ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), l && l.nodeType === 8)
        if (i = l.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = l;
    } while (i);
  }
  function vf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          vf(i), $e(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(i);
    }
  }
  function qx(e, t, i, l) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[je])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = pn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Yx(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Fy(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function bf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Sf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Gx(e, t) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || i.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), i.removeEventListener("DOMContentLoaded", l);
      };
      i.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function pn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var xf = null;
  function Ky(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return pn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Qy(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (t === 0) return e;
          t--;
        } else i !== "/$" && i !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Zy(e, t, i) {
    switch (t = mo(i), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(s(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(s(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function vr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    $e(e);
  }
  var yn = /* @__PURE__ */ new Map(), $y = /* @__PURE__ */ new Set();
  function po(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var fa = W.d;
  W.d = {
    f: Px,
    r: kx,
    D: Xx,
    C: Fx,
    L: Kx,
    m: Qx,
    X: $x,
    S: Zx,
    M: Jx
  };
  function Px() {
    var e = fa.f(), t = lo();
    return e || t;
  }
  function kx(e) {
    var t = it(e);
    t !== null && t.tag === 5 && t.type === "form" ? hp(t) : fa.r(e);
  }
  var ml = typeof document > "u" ? null : document;
  function Jy(e, t, i) {
    var l = ml;
    if (l && typeof t == "string" && t) {
      var u = on(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), $y.has(u) || ($y.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function Xx(e) {
    fa.D(e), Jy("dns-prefetch", e, null);
  }
  function Fx(e, t) {
    fa.C(e, t), Jy("preconnect", e, t);
  }
  function Kx(e, t, i) {
    fa.L(e, t, i);
    var l = ml;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + on(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + on(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + on(
        i.imageSizes
      ) + '"]')) : u += '[href="' + on(e) + '"]';
      var c = u;
      switch (t) {
        case "style":
          c = pl(e);
          break;
        case "script":
          c = yl(e);
      }
      yn.has(c) || (e = v(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), yn.set(c, e), l.querySelector(u) !== null || t === "style" && l.querySelector(br(c)) || t === "script" && l.querySelector(Sr(c)) || (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function Qx(e, t) {
    fa.m(e, t);
    var i = ml;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + on(l) + '"][href="' + on(e) + '"]', c = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = yl(e);
      }
      if (!yn.has(c) && (e = v({ rel: "modulepreload", href: e }, t), yn.set(c, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Sr(c)))
              return;
        }
        l = i.createElement("link"), Nt(l, "link", e), We(l), i.head.appendChild(l);
      }
    }
  }
  function Zx(e, t, i) {
    fa.S(e, t, i);
    var l = ml;
    if (l && e) {
      var u = pt(l).hoistableStyles, c = pl(e);
      t = t || "default";
      var y = u.get(c);
      if (!y) {
        var x = { loading: 0, preload: null };
        if (y = l.querySelector(
          br(c)
        ))
          x.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = yn.get(c)) && Tf(e, i);
          var M = y = l.createElement("link");
          We(M), Nt(M, "link", e), M._p = new Promise(function(V, X) {
            M.onload = V, M.onerror = X;
          }), M.addEventListener("load", function() {
            x.loading |= 1;
          }), M.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, yo(y, t, l);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: x
        }, u.set(c, y);
      }
    }
  }
  function $x(e, t) {
    fa.X(e, t);
    var i = ml;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = yl(e), c = l.get(u);
      c || (c = i.querySelector(Sr(u)), c || (e = v({ src: e, async: !0 }, t), (t = yn.get(u)) && Ef(e, t), c = i.createElement("script"), We(c), Nt(c, "link", e), i.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function Jx(e, t) {
    fa.M(e, t);
    var i = ml;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = yl(e), c = l.get(u);
      c || (c = i.querySelector(Sr(u)), c || (e = v({ src: e, async: !0, type: "module" }, t), (t = yn.get(u)) && Ef(e, t), c = i.createElement("script"), We(c), Nt(c, "link", e), i.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function Iy(e, t, i, l) {
    var u = (u = Me.current) ? po(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = pl(i.href), i = pt(
          u
        ).hoistableStyles, l = i.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = pl(i.href);
          var c = pt(
            u
          ).hoistableStyles, y = c.get(e);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, y), (c = u.querySelector(
            br(e)
          )) && !c._p && (y.instance = c, y.state.loading = 5), yn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, yn.set(e, i), c || Ix(
            u,
            e,
            i,
            y.state
          ))), t && l === null)
            throw Error(s(528, ""));
          return y;
        }
        if (t && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = yl(i), i = pt(
          u
        ).hoistableScripts, l = i.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function pl(e) {
    return 'href="' + on(e) + '"';
  }
  function br(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Wy(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Ix(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Nt(t, "link", i), We(t), e.head.appendChild(t));
  }
  function yl(e) {
    return '[src="' + on(e) + '"]';
  }
  function Sr(e) {
    return "script[async]" + e;
  }
  function eg(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + on(i.href) + '"]'
          );
          if (l)
            return t.instance = l, We(l), l;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), We(l), Nt(l, "style", u), yo(l, i.precedence, e), t.instance = l;
        case "stylesheet":
          u = pl(i.href);
          var c = e.querySelector(
            br(u)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, We(c), c;
          l = Wy(i), (u = yn.get(u)) && Tf(l, u), c = (e.ownerDocument || e).createElement("link"), We(c);
          var y = c;
          return y._p = new Promise(function(x, M) {
            y.onload = x, y.onerror = M;
          }), Nt(c, "link", l), t.state.loading |= 4, yo(c, i.precedence, e), t.instance = c;
        case "script":
          return c = yl(i.src), (u = e.querySelector(
            Sr(c)
          )) ? (t.instance = u, We(u), u) : (l = i, (u = yn.get(c)) && (l = v({}, i), Ef(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), We(u), Nt(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, yo(l, i.precedence, e));
    return t.instance;
  }
  function yo(e, t, i) {
    for (var l = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, c = u, y = 0; y < l.length; y++) {
      var x = l[y];
      if (x.dataset.precedence === t) c = x;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Tf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ef(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var go = null;
  function tg(e, t, i) {
    if (go === null) {
      var l = /* @__PURE__ */ new Map(), u = go = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = go, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var c = i[u];
      if (!(c[je] || c[oe] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = c.getAttribute(t) || "";
        y = e + y;
        var x = l.get(y);
        x ? x.push(c) : l.set(y, [c]);
      }
    }
    return l;
  }
  function ng(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Wx(e, t, i) {
    if (i === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function ag(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function eT(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = pl(l.href), c = t.querySelector(
          br(u)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = vo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = c, We(c);
          return;
        }
        c = t.ownerDocument || t, l = Wy(l), (u = yn.get(u)) && Tf(l, u), c = c.createElement("link"), We(c);
        var y = c;
        y._p = new Promise(function(x, M) {
          y.onload = x, y.onerror = M;
        }), Nt(c, "link", l), i.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = vo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Rf = 0;
  function tT(e, t) {
    return e.stylesheets && e.count === 0 && So(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && So(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Rf === 0 && (Rf = 62500 * Lx());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && So(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > Rf ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function vo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) So(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var bo = null;
  function So(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, bo = /* @__PURE__ */ new Map(), t.forEach(nT, e), bo = null, vo.call(e));
  }
  function nT(e, t) {
    if (!(t.state.loading & 4)) {
      var i = bo.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), bo.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var y = u[c];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (i.set(y.dataset.precedence, y), l = y);
        }
        l && i.set(null, l);
      }
      u = t.instance, y = u.getAttribute("data-precedence"), c = i.get(y) || l, c === l && i.set(null, u), i.set(y, u), this.count++, l = vo.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), c ? c.parentNode.insertBefore(u, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var xr = {
    $$typeof: B,
    Provider: null,
    Consumer: null,
    _currentValue: le,
    _currentValue2: le,
    _threadCount: 0
  };
  function aT(e, t, i, l, u, c, y, x, M) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = va(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = va(0), this.hiddenUpdates = va(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = M, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ig(e, t, i, l, u, c, y, x, M, V, X, Z) {
    return e = new aT(
      e,
      t,
      i,
      y,
      M,
      V,
      X,
      Z,
      x
    ), t = 1, c === !0 && (t |= 24), c = Wt(3, null, null, t), e.current = c, c.stateNode = e, t = nc(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, rc(c), e;
  }
  function lg(e) {
    return e ? (e = Ki, e) : Ki;
  }
  function rg(e, t, i, l, u, c) {
    u = lg(u), l.context === null ? l.context = u : l.pendingContext = u, l = Aa(t), l.payload = { element: i }, c = c === void 0 ? null : c, c !== null && (l.callback = c), i = Ca(e, l, t), i !== null && (Zt(i, e, t), Wl(i, e, t));
  }
  function sg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Mf(e, t) {
    sg(e, t), (e = e.alternate) && sg(e, t);
  }
  function og(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = si(e, 67108864);
      t !== null && Zt(t, e, 67108864), Mf(e, 67108864);
    }
  }
  function ug(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ln();
      t = O(t);
      var i = si(e, t);
      i !== null && Zt(i, e, t), Mf(e, t);
    }
  }
  var xo = !0;
  function iT(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var c = W.p;
    try {
      W.p = 2, Af(e, t, i, l);
    } finally {
      W.p = c, U.T = u;
    }
  }
  function lT(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var c = W.p;
    try {
      W.p = 8, Af(e, t, i, l);
    } finally {
      W.p = c, U.T = u;
    }
  }
  function Af(e, t, i, l) {
    if (xo) {
      var u = Cf(l);
      if (u === null)
        df(
          e,
          t,
          l,
          To,
          i
        ), fg(e, l);
      else if (sT(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (fg(e, l), t & 4 && -1 < rT.indexOf(e)) {
        for (; u !== null; ) {
          var c = it(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var y = Rn(c.pendingLanes);
                  if (y !== 0) {
                    var x = c;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; y; ) {
                      var M = 1 << 31 - _t(y);
                      x.entanglements[1] |= M, y &= ~M;
                    }
                    Hn(c), (Ge & 6) === 0 && (ao = Bt() + 500, pr(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = si(c, 2), x !== null && Zt(x, c, 2), lo(), Mf(c, 2);
            }
          if (c = Cf(l), c === null && df(
            e,
            t,
            l,
            To,
            i
          ), c === u) break;
          u = c;
        }
        u !== null && l.stopPropagation();
      } else
        df(
          e,
          t,
          l,
          null,
          i
        );
    }
  }
  function Cf(e) {
    return e = wu(e), wf(e);
  }
  var To = null;
  function wf(e) {
    if (To = null, e = Xe(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return To = e, null;
  }
  function cg(e) {
    switch (e) {
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
        switch (Fn()) {
          case pa:
            return 2;
          case Vl:
            return 8;
          case ya:
          case En:
            return 32;
          case sn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Df = !1, Ba = null, Ha = null, qa = null, Tr = /* @__PURE__ */ new Map(), Er = /* @__PURE__ */ new Map(), Ya = [], rT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function fg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ba = null;
        break;
      case "dragenter":
      case "dragleave":
        Ha = null;
        break;
      case "mouseover":
      case "mouseout":
        qa = null;
        break;
      case "pointerover":
      case "pointerout":
        Tr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Er.delete(t.pointerId);
    }
  }
  function Rr(e, t, i, l, u, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: c,
      targetContainers: [u]
    }, t !== null && (t = it(t), t !== null && og(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function sT(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return Ba = Rr(
          Ba,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "dragenter":
        return Ha = Rr(
          Ha,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "mouseover":
        return qa = Rr(
          qa,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return Tr.set(
          c,
          Rr(
            Tr.get(c) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, Er.set(
          c,
          Rr(
            Er.get(c) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function dg(e) {
    var t = Xe(e.target);
    if (t !== null) {
      var i = f(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, ne(e.priority, function() {
              ug(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(i), t !== null) {
            e.blockedOn = t, ne(e.priority, function() {
              ug(i);
            });
            return;
          }
        } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Eo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = Cf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        Cu = l, i.target.dispatchEvent(l), Cu = null;
      } else
        return t = it(i), t !== null && og(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function hg(e, t, i) {
    Eo(e) && i.delete(t);
  }
  function oT() {
    Df = !1, Ba !== null && Eo(Ba) && (Ba = null), Ha !== null && Eo(Ha) && (Ha = null), qa !== null && Eo(qa) && (qa = null), Tr.forEach(hg), Er.forEach(hg);
  }
  function Ro(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Df || (Df = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      oT
    )));
  }
  var Mo = null;
  function mg(e) {
    Mo !== e && (Mo = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Mo === e && (Mo = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (wf(l || i) === null)
              continue;
            break;
          }
          var c = it(i);
          c !== null && (e.splice(t, 3), t -= 3, Ac(
            c,
            {
              pending: !0,
              data: u,
              method: i.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function gl(e) {
    function t(M) {
      return Ro(M, e);
    }
    Ba !== null && Ro(Ba, e), Ha !== null && Ro(Ha, e), qa !== null && Ro(qa, e), Tr.forEach(t), Er.forEach(t);
    for (var i = 0; i < Ya.length; i++) {
      var l = Ya[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ya.length && (i = Ya[0], i.blockedOn === null); )
      dg(i), i.blockedOn === null && Ya.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], c = i[l + 1], y = u[ue] || null;
        if (typeof c == "function")
          y || mg(i);
        else if (y) {
          var x = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, y = c[ue] || null)
              x = y.formAction;
            else if (wf(u) !== null) continue;
          } else x = y.action;
          typeof x == "function" ? i[l + 1] = x : (i.splice(l, 3), l -= 3), mg(i);
        }
      }
  }
  function pg() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(y) {
            return u = y;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), l || setTimeout(i, 20);
    }
    function i() {
      if (!l && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(i, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function jf(e) {
    this._internalRoot = e;
  }
  Ao.prototype.render = jf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = ln();
    rg(i, l, e, t, null, null);
  }, Ao.prototype.unmount = jf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      rg(e.current, 2, null, e, null, null), lo(), t[ge] = null;
    }
  };
  function Ao(e) {
    this._internalRoot = e;
  }
  Ao.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = J();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < Ya.length && t !== 0 && t < Ya[i].priority; i++) ;
      Ya.splice(i, 0, e), i === 0 && dg(e);
    }
  };
  var yg = a.version;
  if (yg !== "19.2.5")
    throw Error(
      s(
        527,
        yg,
        "19.2.5"
      )
    );
  W.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = h(t), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var uT = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Co = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Co.isDisabled && Co.supportsFiber)
      try {
        Kn = Co.inject(
          uT
        ), Ht = Co;
      } catch {
      }
  }
  return Ar.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = Ep, c = Rp, y = Mp;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = ig(
      e,
      1,
      !1,
      null,
      null,
      i,
      l,
      null,
      u,
      c,
      y,
      pg
    ), e[ge] = t.current, ff(e), new jf(t);
  }, Ar.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", c = Ep, y = Rp, x = Mp, M = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (c = i.onUncaughtError), i.onCaughtError !== void 0 && (y = i.onCaughtError), i.onRecoverableError !== void 0 && (x = i.onRecoverableError), i.formState !== void 0 && (M = i.formState)), t = ig(
      e,
      1,
      !0,
      t,
      i ?? null,
      l,
      u,
      M,
      c,
      y,
      x,
      pg
    ), t.context = lg(null), i = t.current, l = ln(), l = O(l), u = Aa(l), u.callback = null, Ca(i, u, l), i = l, t.current.lanes = i, On(t, i), Hn(t), e[ge] = t.current, ff(e), new Ao(t);
  }, Ar.version = "19.2.5", Ar;
}
var Ag;
function ET() {
  if (Ag) return Of.exports;
  Ag = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Of.exports = TT(), Of.exports;
}
var RT = ET();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var w0 = (n) => {
  throw TypeError(n);
}, MT = (n, a, r) => a.has(n) || w0("Cannot " + r), Uf = (n, a, r) => (MT(n, a, "read from private field"), r ? r.call(n) : a.get(n)), AT = (n, a, r) => a.has(n) ? w0("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function Cg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function CT(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: s = !1 } = n, o;
  o = a.map(
    (T, R) => g(
      T,
      typeof T == "string" ? null : T.state,
      R === 0 ? "default" : void 0,
      typeof T == "string" ? void 0 : T.unstable_mask
    )
  );
  let f = p(
    r ?? o.length - 1
  ), d = "POP", m = null;
  function p(T) {
    return Math.min(Math.max(T, 0), o.length - 1);
  }
  function h() {
    return o[f];
  }
  function g(T, R = null, C, N) {
    let z = cd(
      o ? h().pathname : "/",
      T,
      R,
      C,
      N
    );
    return ht(
      z.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        T
      )}`
    ), z;
  }
  function v(T) {
    return typeof T == "string" ? T : Pn(T);
  }
  return {
    get index() {
      return f;
    },
    get action() {
      return d;
    },
    get location() {
      return h();
    },
    createHref: v,
    createURL(T) {
      return new URL(v(T), "http://localhost");
    },
    encodeLocation(T) {
      let R = typeof T == "string" ? zn(T) : T;
      return {
        pathname: R.pathname || "",
        search: R.search || "",
        hash: R.hash || ""
      };
    },
    push(T, R) {
      d = "PUSH";
      let C = Cg(T) ? T : g(T, R);
      f += 1, o.splice(f, o.length, C), s && m && m({ action: d, location: C, delta: 1 });
    },
    replace(T, R) {
      d = "REPLACE";
      let C = Cg(T) ? T : g(T, R);
      o[f] = C, s && m && m({ action: d, location: C, delta: 0 });
    },
    go(T) {
      d = "POP";
      let R = p(f + T), C = o[R];
      f = R, m && m({ action: d, location: C, delta: T });
    },
    listen(T) {
      return m = T, () => {
        m = null;
      };
    }
  };
}
function ze(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function ht(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function wT() {
  return Math.random().toString(36).substring(2, 10);
}
function cd(n, a, r = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? zn(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || wT(),
    unstable_mask: o
  };
}
function Pn({
  pathname: n = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (n += r.charAt(0) === "#" ? r : "#" + r), n;
}
function zn(n) {
  let a = {};
  if (n) {
    let r = n.indexOf("#");
    r >= 0 && (a.hash = n.substring(r), n = n.substring(0, r));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function DT(n, a = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), ze(r, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : Pn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var Vr, wg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (AT(this, Vr, /* @__PURE__ */ new Map()), n)
      for (let [a, r] of n)
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
  get(n) {
    if (Uf(this, Vr).has(n))
      return Uf(this, Vr).get(n);
    if (n.defaultValue !== void 0)
      return n.defaultValue;
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
  set(n, a) {
    Uf(this, Vr).set(n, a);
  }
};
Vr = /* @__PURE__ */ new WeakMap();
var jT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function NT(n) {
  return jT.has(
    n
  );
}
var zT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function OT(n) {
  return zT.has(
    n
  );
}
function _T(n) {
  return n.index === !0;
}
function kr(n, a, r = [], s = {}, o = !1) {
  return n.map((f, d) => {
    let m = [...r, String(d)], p = typeof f.id == "string" ? f.id : m.join("-");
    if (ze(
      f.index !== !0 || !f.children,
      "Cannot specify children on an index route"
    ), ze(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), _T(f)) {
      let h = {
        ...f,
        id: p
      };
      return s[p] = Dg(
        h,
        a(h)
      ), h;
    } else {
      let h = {
        ...f,
        id: p,
        children: void 0
      };
      return s[p] = Dg(
        h,
        a(h)
      ), f.children && (h.children = kr(
        f.children,
        a,
        m,
        s,
        o
      )), h;
    }
  });
}
function Dg(n, a) {
  return Object.assign(n, {
    ...a,
    ...typeof a.lazy == "object" && a.lazy != null ? {
      lazy: {
        ...n.lazy,
        ...a.lazy
      }
    } : {}
  });
}
function Fa(n, a, r = "/") {
  return Ur(n, a, r, !1);
}
function Ur(n, a, r, s) {
  let o = typeof a == "string" ? zn(a) : a, f = xn(o.pathname || "/", r);
  if (f == null)
    return null;
  let d = D0(n);
  VT(d);
  let m = null;
  for (let p = 0; m == null && p < d.length; ++p) {
    let h = KT(f);
    m = XT(
      d[p],
      h,
      s
    );
  }
  return m;
}
function LT(n, a) {
  let { route: r, pathname: s, params: o } = n;
  return {
    id: r.id,
    pathname: s,
    params: o,
    data: a[r.id],
    loaderData: a[r.id],
    handle: r.handle
  };
}
function D0(n, a = [], r = [], s = "", o = !1) {
  let f = (d, m, p = o, h) => {
    let g = {
      relativePath: h === void 0 ? d.path || "" : h,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: m,
      route: d
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(s) && p)
        return;
      ze(
        g.relativePath.startsWith(s),
        `Absolute route path "${g.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), g.relativePath = g.relativePath.slice(s.length);
    }
    let v = bn([s, g.relativePath]), S = r.concat(g);
    d.children && d.children.length > 0 && (ze(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      d.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), D0(
      d.children,
      a,
      S,
      v,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: v,
      score: PT(v, d.index),
      routesMeta: S
    });
  };
  return n.forEach((d, m) => {
    if (d.path === "" || !d.path?.includes("?"))
      f(d, m);
    else
      for (let p of j0(d.path))
        f(d, m, !0, p);
  }), a;
}
function j0(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), f = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [f, ""] : [f];
  let d = j0(s.join("/")), m = [];
  return m.push(
    ...d.map(
      (p) => p === "" ? f : [f, p].join("/")
    )
  ), o && m.push(...d), m.map(
    (p) => n.startsWith("/") && p === "" ? "/" : p
  );
}
function VT(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : kT(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var UT = /^:[\w-]+$/, BT = 3, HT = 2, qT = 1, YT = 10, GT = -2, jg = (n) => n === "*";
function PT(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(jg) && (s += GT), a && (s += HT), r.filter((o) => !jg(o)).reduce(
    (o, f) => o + (UT.test(f) ? BT : f === "" ? qT : YT),
    s
  );
}
function kT(n, a) {
  return n.length === a.length && n.slice(0, -1).every((s, o) => s === a[o]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    n[n.length - 1] - a[a.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function XT(n, a, r = !1) {
  let { routesMeta: s } = n, o = {}, f = "/", d = [];
  for (let m = 0; m < s.length; ++m) {
    let p = s[m], h = m === s.length - 1, g = f === "/" ? a : a.slice(f.length) || "/", v = Zo(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: h },
      g
    ), S = p.route;
    if (!v && h && r && !s[s.length - 1].route.index && (v = Zo(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      g
    )), !v)
      return null;
    Object.assign(o, v.params), d.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: bn([f, v.pathname]),
      pathnameBase: $T(
        bn([f, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (f = bn([f, v.pathnameBase]));
  }
  return d;
}
function Zo(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [r, s] = FT(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(r);
  if (!o) return null;
  let f = o[0], d = f.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
      (h, { paramName: g, isOptional: v }, S) => {
        if (g === "*") {
          let R = m[S] || "";
          d = f.slice(0, f.length - R.length).replace(/(.)\/+$/, "$1");
        }
        const T = m[S];
        return v && !T ? h[g] = void 0 : h[g] = (T || "").replace(/%2F/g, "/"), h;
      },
      {}
    ),
    pathname: f,
    pathnameBase: d,
    pattern: n
  };
}
function FT(n, a = !1, r = !0) {
  ht(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (d, m, p, h, g) => {
      if (s.push({ paramName: m, isOptional: p != null }), p) {
        let v = g.charAt(h + d.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function KT(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return ht(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function xn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(r);
  return s && s !== "/" ? null : n.slice(r) || "/";
}
function QT({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : bn([n, a]);
}
var N0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Gd = (n) => N0.test(n);
function ZT(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? zn(n) : n, f;
  return r ? (r = kd(r), r.startsWith("/") ? f = Ng(r.substring(1), "/") : f = Ng(r, a)) : f = a, {
    pathname: f,
    search: JT(s),
    hash: IT(o)
  };
}
function Ng(n, a) {
  let r = $o(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Bf(n, a, r, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function z0(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Pd(n) {
  let a = z0(n);
  return a.map(
    (r, s) => s === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function ou(n, a, r, s = !1) {
  let o;
  typeof n == "string" ? o = zn(n) : (o = { ...n }, ze(
    !o.pathname || !o.pathname.includes("?"),
    Bf("?", "pathname", "search", o)
  ), ze(
    !o.pathname || !o.pathname.includes("#"),
    Bf("#", "pathname", "hash", o)
  ), ze(
    !o.search || !o.search.includes("#"),
    Bf("#", "search", "hash", o)
  ));
  let f = n === "" || o.pathname === "", d = f ? "/" : o.pathname, m;
  if (d == null)
    m = r;
  else {
    let v = a.length - 1;
    if (!s && d.startsWith("..")) {
      let S = d.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let p = ZT(o, m), h = d && d !== "/" && d.endsWith("/"), g = (f || d === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (h || g) && (p.pathname += "/"), p;
}
var kd = (n) => n.replace(/\/\/+/g, "/"), bn = (n) => kd(n.join("/")), $o = (n) => n.replace(/\/+$/, ""), $T = (n) => $o(n).replace(/^\/*/, "/"), JT = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, IT = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, WT = (n, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let s = new Headers(r.headers);
  return s.set("Location", n), new Response(null, { ...r, headers: s });
}, uu = class {
  constructor(n, a, r, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Xr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function $r(n) {
  let a = n.map((r) => r.route.path).filter(Boolean);
  return bn(a) || "/";
}
var O0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function _0(n, a) {
  let r = n;
  if (typeof r != "string" || !N0.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (O0)
    try {
      let f = new URL(window.location.href), d = r.startsWith("//") ? new URL(f.protocol + r) : new URL(r), m = xn(d.pathname, a);
      d.origin === f.origin && m != null ? r = m + d.search + d.hash : o = !0;
    } catch {
      ht(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: s,
    isExternal: o,
    to: r
  };
}
var Qa = Symbol("Uninstrumented");
function eE(n, a) {
  let r = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  n.forEach(
    (o) => o({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(f) {
        let d = Object.keys(r);
        for (let m of d)
          f[m] && r[m].push(f[m]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let o = xl(r.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((f) => {
      let d = o[f], m = r[`lazy.${f}`];
      if (typeof d == "function" && m.length > 0) {
        let p = xl(m, d, () => {
        });
        p && (s.lazy = Object.assign(s.lazy || {}, {
          [f]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let f = a[o];
    if (typeof f == "function" && r[o].length > 0) {
      let d = f[Qa] ?? f, m = xl(
        r[o],
        d,
        (...p) => zg(p[0])
      );
      m && (o === "loader" && d.hydrate === !0 && (m.hydrate = !0), m[Qa] = d, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let f = o[Qa] ?? o, d = xl(
      r.middleware,
      f,
      (...m) => zg(m[0])
    );
    return d ? (d[Qa] = f, d) : o;
  })), s;
}
function tE(n, a) {
  let r = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let f = Object.keys(o);
        for (let d of f)
          o[d] && r[d].push(o[d]);
      }
    })
  ), r.navigate.length > 0) {
    let s = n.navigate[Qa] ?? n.navigate, o = xl(
      r.navigate,
      s,
      (...f) => {
        let [d, m] = f;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? Pn(d) : ".",
          ...Og(n, m ?? {})
        };
      }
    );
    o && (o[Qa] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[Qa] ?? n.fetch, o = xl(r.fetch, s, (...f) => {
      let [d, , m, p] = f;
      return {
        href: m ?? ".",
        fetcherKey: d,
        ...Og(n, p ?? {})
      };
    });
    o && (o[Qa] = s, n.fetch = o);
  }
  return n;
}
function xl(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await L0(
      n,
      r(...s),
      () => a(...s),
      n.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function L0(n, a, r, s) {
  let o = n[s], f;
  if (o) {
    let d, m = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = L0(n, a, r, s - 1), f = await d, ze(f, "Expected a result"), f.type === "error" && f.value instanceof Error ? { status: "error", error: f.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    d || await m(), await d;
  } else
    try {
      f = { type: "success", value: await r() };
    } catch (d) {
      f = { type: "error", value: d };
    }
  return f || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function zg(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: nE(a),
    params: { ...s },
    unstable_pattern: o,
    context: aE(r)
  };
}
function Og(n, a) {
  return {
    currentUrl: Pn(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function nE(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function aE(n) {
  if (lE(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var iE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function lE(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === iE;
}
var V0 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], rE = new Set(
  V0
), sE = [
  "GET",
  ...V0
], oE = new Set(sE), U0 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), uE = /* @__PURE__ */ new Set([307, 308]), Hf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, cE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Cr = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, fE = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), B0 = "remix-router-transitions", H0 = Symbol("ResetLoaderData");
function dE(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  ze(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || fE, f = o;
  if (n.unstable_instrumentations) {
    let A = n.unstable_instrumentations;
    f = (O) => ({
      ...o(O),
      ...eE(
        A.map((q) => q.route).filter(Boolean),
        O
      )
    });
  }
  let d = {}, m = kr(
    n.routes,
    f,
    void 0,
    d
  ), p, h = n.basename || "/";
  h.startsWith("/") || (h = `/${h}`);
  let g = n.dataStrategy || gE, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, T = /* @__PURE__ */ new Set(), R = null, C = null, N = null, z = n.hydrationData != null, H = Fa(m, n.history.location, h), B = !1, Q = null, $, de;
  if (H == null && !n.patchRoutesOnNavigation) {
    let A = gn(404, {
      pathname: n.history.location.pathname
    }), { matches: O, route: q } = wo(m);
    $ = !0, de = !$, H = O, Q = { [q.id]: A };
  } else if (H && !n.hydrationData && va(
    H,
    m,
    n.history.location.pathname
  ).active && (H = null), H)
    if (H.some((A) => A.route.lazy))
      $ = !1, de = !$;
    else if (!H.some((A) => Xd(A.route)))
      $ = !0, de = !$;
    else {
      let A = n.hydrationData ? n.hydrationData.loaderData : null, O = n.hydrationData ? n.hydrationData.errors : null, q = H;
      if (O) {
        let J = H.findIndex(
          (ne) => O[ne.route.id] !== void 0
        );
        q = q.slice(0, J + 1);
      }
      de = !1, $ = !0, q.forEach((J) => {
        let ne = q0(J.route, A, O);
        de = de || ne.renderFallback, $ = $ && !ne.shouldLoad;
      });
    }
  else {
    $ = !1, de = !$, H = [];
    let A = va(
      null,
      m,
      n.history.location.pathname
    );
    A.active && A.matches && (B = !0, H = A.matches);
  }
  let ie, j = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: H,
    initialized: $,
    renderFallback: de,
    navigation: Hf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || Q,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", te = null, F = !1, P, ae = !1, fe = /* @__PURE__ */ new Map(), re = null, U = !1, W = !1, le = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), Re = 0, w = -1, k = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), mt, Ze = null;
  function Wa() {
    if (S = n.history.listen(
      ({ action: A, location: O, delta: q }) => {
        if (mt) {
          mt(), mt = void 0;
          return;
        }
        ht(
          De.size === 0 || q != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let J = ti({
          currentLocation: j.location,
          nextLocation: O,
          historyAction: A
        });
        if (J && q != null) {
          let ne = new Promise((pe) => {
            mt = pe;
          });
          n.history.go(q * -1), Qn(J, {
            state: "blocked",
            location: O,
            proceed() {
              Qn(J, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: O
              }), ne.then(() => n.history.go(q));
            },
            reset() {
              let pe = new Map(j.blockers);
              pe.set(J, Cr), Tt({ blockers: pe });
            }
          }), te?.resolve(), te = null;
          return;
        }
        return Xn(A, O);
      }
    ), r) {
      LE(a, fe);
      let A = () => VE(a, fe);
      a.addEventListener("pagehide", A), re = () => a.removeEventListener("pagehide", A);
    }
    return j.initialized || Xn("POP", j.location, {
      initialHydration: !0
    }), ie;
  }
  function zi() {
    S && S(), re && re(), T.clear(), P && P.abort(), j.fetchers.forEach((A, O) => Kn(O)), j.blockers.forEach((A, O) => ei(O));
  }
  function zl(A) {
    return T.add(A), () => T.delete(A);
  }
  function Tt(A, O = {}) {
    A.matches && (A.matches = A.matches.map((ne) => {
      let pe = d[ne.route.id], oe = ne.route;
      return oe.element !== pe.element || oe.errorElement !== pe.errorElement || oe.hydrateFallbackElement !== pe.hydrateFallbackElement ? {
        ...ne,
        route: pe
      } : ne;
    })), j = {
      ...j,
      ...A
    };
    let q = [], J = [];
    j.fetchers.forEach((ne, pe) => {
      ne.state === "idle" && (Me.has(pe) ? q.push(pe) : J.push(pe));
    }), Me.forEach((ne) => {
      !j.fetchers.has(ne) && !ce.has(ne) && q.push(ne);
    }), [...T].forEach(
      (ne) => ne(j, {
        deletedFetchers: q,
        newErrors: A.errors ?? null,
        viewTransitionOpts: O.viewTransitionOpts,
        flushSync: O.flushSync === !0
      })
    ), q.forEach((ne) => Kn(ne)), J.forEach((ne) => j.fetchers.delete(ne));
  }
  function Pt(A, O, { flushSync: q } = {}) {
    let J = j.actionData != null && j.navigation.formMethod != null && Ut(j.navigation.formMethod) && j.navigation.state === "loading" && A.state?._isRedirect !== !0, ne;
    O.actionData ? Object.keys(O.actionData).length > 0 ? ne = O.actionData : ne = null : J ? ne = j.actionData : ne = null;
    let pe = O.loaderData ? kg(
      j.loaderData,
      O.loaderData,
      O.matches || [],
      O.errors
    ) : j.loaderData, oe = j.blockers;
    oe.size > 0 && (oe = new Map(oe), oe.forEach((xe, be) => oe.set(be, Cr)));
    let ue = U ? !1 : Ul(A, O.matches || j.matches), ge = F === !0 || j.navigation.formMethod != null && Ut(j.navigation.formMethod) && A.state?._isRedirect !== !0;
    p && (m = p, p = void 0), U || I === "POP" || (I === "PUSH" ? n.history.push(A, A.state) : I === "REPLACE" && n.history.replace(A, A.state));
    let he;
    if (I === "POP") {
      let xe = fe.get(j.location.pathname);
      xe && xe.has(A.pathname) ? he = {
        currentLocation: j.location,
        nextLocation: A
      } : fe.has(A.pathname) && (he = {
        currentLocation: A,
        nextLocation: j.location
      });
    } else if (ae) {
      let xe = fe.get(j.location.pathname);
      xe ? xe.add(A.pathname) : (xe = /* @__PURE__ */ new Set([A.pathname]), fe.set(j.location.pathname, xe)), he = {
        currentLocation: j.location,
        nextLocation: A
      };
    }
    Tt(
      {
        ...O,
        // matches, errors, fetchers go through as-is
        actionData: ne,
        loaderData: pe,
        historyAction: I,
        location: A,
        initialized: !0,
        renderFallback: !1,
        navigation: Hf,
        revalidation: "idle",
        restoreScrollPosition: ue,
        preventScrollReset: ge,
        blockers: oe
      },
      {
        viewTransitionOpts: he,
        flushSync: q === !0
      }
    ), I = "POP", F = !1, ae = !1, U = !1, W = !1, te?.resolve(), te = null, Ze?.resolve(), Ze = null;
  }
  async function Oi(A, O) {
    if (te?.resolve(), te = null, typeof A == "number") {
      te || (te = Qg());
      let $e = te.promise;
      return n.history.go(A), $e;
    }
    let q = fd(
      j.location,
      j.matches,
      h,
      A,
      O?.fromRouteId,
      O?.relative
    ), { path: J, submission: ne, error: pe } = _g(
      !1,
      q,
      O
    ), oe;
    O?.unstable_mask && (oe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof O.unstable_mask == "string" ? zn(O.unstable_mask) : {
        ...j.location.unstable_mask,
        ...O.unstable_mask
      }
    });
    let ue = j.location, ge = cd(
      ue,
      J,
      O && O.state,
      void 0,
      oe
    );
    ge = {
      ...ge,
      ...n.history.encodeLocation(ge)
    };
    let he = O && O.replace != null ? O.replace : void 0, xe = "PUSH";
    he === !0 ? xe = "REPLACE" : he === !1 || ne != null && Ut(ne.formMethod) && ne.formAction === j.location.pathname + j.location.search && (xe = "REPLACE");
    let be = O && "preventScrollReset" in O ? O.preventScrollReset === !0 : void 0, He = (O && O.flushSync) === !0, je = ti({
      currentLocation: ue,
      nextLocation: ge,
      historyAction: xe
    });
    if (je) {
      Qn(je, {
        state: "blocked",
        location: ge,
        proceed() {
          Qn(je, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ge
          }), Oi(A, O);
        },
        reset() {
          let $e = new Map(j.blockers);
          $e.set(je, Cr), Tt({ blockers: $e });
        }
      });
      return;
    }
    await Xn(xe, ge, {
      submission: ne,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: pe,
      preventScrollReset: be,
      replace: O && O.replace,
      enableViewTransition: O && O.viewTransition,
      flushSync: He,
      callSiteDefaultShouldRevalidate: O && O.unstable_defaultShouldRevalidate
    });
  }
  function Ol() {
    Ze || (Ze = Qg()), ya(), Tt({ revalidation: "loading" });
    let A = Ze.promise;
    return j.navigation.state === "submitting" ? A : j.navigation.state === "idle" ? (Xn(j.historyAction, j.location, {
      startUninterruptedRevalidation: !0
    }), A) : (Xn(
      I || j.historyAction,
      j.navigation.location,
      {
        overrideNavigation: j.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ae === !0
      }
    ), A);
  }
  async function Xn(A, O, q) {
    P && P.abort(), P = null, I = A, U = (q && q.startUninterruptedRevalidation) === !0, Eu(j.location, j.matches), F = (q && q.preventScrollReset) === !0, ae = (q && q.enableViewTransition) === !0;
    let J = p || m, ne = q && q.overrideNavigation, pe = q?.initialHydration && j.matches && j.matches.length > 0 && !B ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      j.matches
    ) : Fa(J, O, h), oe = (q && q.flushSync) === !0;
    if (pe && j.initialized && !W && ME(j.location, O) && !(q && q.submission && Ut(q.submission.formMethod))) {
      Pt(O, { matches: pe }, { flushSync: oe });
      return;
    }
    let ue = va(pe, J, O.pathname);
    if (ue.active && ue.matches && (pe = ue.matches), !pe) {
      let { error: Xe, notFoundMatches: it, route: Oe } = Rn(
        O.pathname
      );
      Pt(
        O,
        {
          matches: it,
          loaderData: {},
          errors: {
            [Oe.id]: Xe
          }
        },
        { flushSync: oe }
      );
      return;
    }
    P = new AbortController();
    let ge = bl(
      n.history,
      O,
      P.signal,
      q && q.submission
    ), he = n.getContext ? await n.getContext() : new wg(), xe;
    if (q && q.pendingError)
      xe = [
        Ka(pe).route.id,
        { type: "error", error: q.pendingError }
      ];
    else if (q && q.submission && Ut(q.submission.formMethod)) {
      let Xe = await us(
        ge,
        O,
        q.submission,
        pe,
        he,
        ue.active,
        q && q.initialHydration === !0,
        { replace: q.replace, flushSync: oe }
      );
      if (Xe.shortCircuited)
        return;
      if (Xe.pendingActionResult) {
        let [it, Oe] = Xe.pendingActionResult;
        if (rn(Oe) && Xr(Oe.error) && Oe.error.status === 404) {
          P = null, Pt(O, {
            matches: Xe.matches,
            loaderData: {},
            errors: {
              [it]: Oe.error
            }
          });
          return;
        }
      }
      pe = Xe.matches || pe, xe = Xe.pendingActionResult, ne = qf(O, q.submission), oe = !1, ue.active = !1, ge = bl(
        n.history,
        ge.url,
        ge.signal
      );
    }
    let {
      shortCircuited: be,
      matches: He,
      loaderData: je,
      errors: $e
    } = await _l(
      ge,
      O,
      pe,
      he,
      ue.active,
      ne,
      q && q.submission,
      q && q.fetcherSubmission,
      q && q.replace,
      q && q.initialHydration === !0,
      oe,
      xe,
      q && q.callSiteDefaultShouldRevalidate
    );
    be || (P = null, Pt(O, {
      matches: He || pe,
      ...Xg(xe),
      loaderData: je,
      errors: $e
    }));
  }
  async function us(A, O, q, J, ne, pe, oe, ue = {}) {
    ya();
    let ge = OE(O, q);
    if (Tt({ navigation: ge }, { flushSync: ue.flushSync === !0 }), pe) {
      let be = await On(
        J,
        O.pathname,
        A.signal
      );
      if (be.type === "aborted")
        return { shortCircuited: !0 };
      if (be.type === "error") {
        if (be.partialMatches.length === 0) {
          let { matches: je, route: $e } = wo(m);
          return {
            matches: je,
            pendingActionResult: [
              $e.id,
              {
                type: "error",
                error: be.error
              }
            ]
          };
        }
        let He = Ka(be.partialMatches).route.id;
        return {
          matches: be.partialMatches,
          pendingActionResult: [
            He,
            {
              type: "error",
              error: be.error
            }
          ]
        };
      } else if (be.matches)
        J = be.matches;
      else {
        let { notFoundMatches: He, error: je, route: $e } = Rn(
          O.pathname
        );
        return {
          matches: He,
          pendingActionResult: [
            $e.id,
            {
              type: "error",
              error: je
            }
          ]
        };
      }
    }
    let he, xe = Uo(J, O);
    if (!xe.route.action && !xe.route.lazy)
      he = {
        type: "error",
        error: gn(405, {
          method: A.method,
          pathname: O.pathname,
          routeId: xe.route.id
        })
      };
    else {
      let be = Al(
        f,
        d,
        A,
        O,
        J,
        xe,
        oe ? [] : s,
        ne
      ), He = await pa(
        A,
        O,
        be,
        ne,
        null
      );
      if (he = He[xe.route.id], !he) {
        for (let je of J)
          if (He[je.route.id]) {
            he = He[je.route.id];
            break;
          }
      }
      if (A.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Ri(he)) {
      let be;
      return ue && ue.replace != null ? be = ue.replace : be = Yg(
        he.response.headers.get("Location"),
        new URL(A.url),
        h,
        n.history
      ) === j.location.pathname + j.location.search, await Fn(A, he, !0, {
        submission: q,
        replace: be
      }), { shortCircuited: !0 };
    }
    if (rn(he)) {
      let be = Ka(J, xe.route.id);
      return (ue && ue.replace) !== !0 && (I = "PUSH"), {
        matches: J,
        pendingActionResult: [
          be.route.id,
          he,
          xe.route.id
        ]
      };
    }
    return {
      matches: J,
      pendingActionResult: [xe.route.id, he]
    };
  }
  async function _l(A, O, q, J, ne, pe, oe, ue, ge, he, xe, be, He) {
    let je = pe || qf(O, oe), $e = oe || ue || Kg(je), Xe = !U && !he;
    if (ne) {
      if (Xe) {
        let ct = _i(be);
        Tt(
          {
            navigation: je,
            ...ct !== void 0 ? { actionData: ct } : {}
          },
          {
            flushSync: xe
          }
        );
      }
      let Ne = await On(
        q,
        O.pathname,
        A.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: Lt, route: yt } = wo(m);
          return {
            matches: Lt,
            loaderData: {},
            errors: {
              [yt.id]: Ne.error
            }
          };
        }
        let ct = Ka(Ne.partialMatches).route.id;
        return {
          matches: Ne.partialMatches,
          loaderData: {},
          errors: {
            [ct]: Ne.error
          }
        };
      } else if (Ne.matches)
        q = Ne.matches;
      else {
        let { error: ct, notFoundMatches: Lt, route: yt } = Rn(
          O.pathname
        );
        return {
          matches: Lt,
          loaderData: {},
          errors: {
            [yt.id]: ct
          }
        };
      }
    }
    let it = p || m, { dsMatches: Oe, revalidatingFetchers: pt } = Lg(
      A,
      J,
      f,
      d,
      n.history,
      j,
      q,
      $e,
      O,
      he ? [] : s,
      he === !0,
      W,
      le,
      Me,
      se,
      ee,
      it,
      h,
      n.patchRoutesOnNavigation != null,
      be,
      He
    );
    if (w = ++Re, !n.dataStrategy && !Oe.some((Ne) => Ne.shouldLoad) && !Oe.some(
      (Ne) => Ne.route.middleware && Ne.route.middleware.length > 0
    ) && pt.length === 0) {
      let Ne = fs();
      return Pt(
        O,
        {
          matches: q,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: be && rn(be[1]) ? { [be[0]]: be[1].error } : null,
          ...Xg(be),
          ...Ne ? { fetchers: new Map(j.fetchers) } : {}
        },
        { flushSync: xe }
      ), { shortCircuited: !0 };
    }
    if (Xe) {
      let Ne = {};
      if (!ne) {
        Ne.navigation = je;
        let ct = _i(be);
        ct !== void 0 && (Ne.actionData = ct);
      }
      pt.length > 0 && (Ne.fetchers = Ll(pt)), Tt(Ne, { flushSync: xe });
    }
    pt.forEach((Ne) => {
      Mt(Ne.key), Ne.controller && ce.set(Ne.key, Ne.controller);
    });
    let We = () => pt.forEach((Ne) => Mt(Ne.key));
    P && P.signal.addEventListener(
      "abort",
      We
    );
    let { loaderResults: ba, fetcherResults: Mn } = await Vl(
      Oe,
      pt,
      A,
      O,
      J
    );
    if (A.signal.aborted)
      return { shortCircuited: !0 };
    P && P.signal.removeEventListener(
      "abort",
      We
    ), pt.forEach((Ne) => ce.delete(Ne.key));
    let At = Do(ba);
    if (At)
      return await Fn(A, At.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    if (At = Do(Mn), At)
      return ee.add(At.key), await Fn(A, At.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    let { loaderData: _n, errors: ni } = Pg(
      j,
      q,
      ba,
      be,
      pt,
      Mn
    );
    he && j.errors && (ni = { ...j.errors, ...ni });
    let Ln = fs(), ai = ds(w), Vi = Ln || ai || pt.length > 0;
    return {
      matches: q,
      loaderData: _n,
      errors: ni,
      ...Vi ? { fetchers: new Map(j.fetchers) } : {}
    };
  }
  function _i(A) {
    if (A && !rn(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (j.actionData)
      return Object.keys(j.actionData).length === 0 ? null : j.actionData;
  }
  function Ll(A) {
    return A.forEach((O) => {
      let q = j.fetchers.get(O.key), J = wr(
        void 0,
        q ? q.data : void 0
      );
      j.fetchers.set(O.key, J);
    }), new Map(j.fetchers);
  }
  async function bu(A, O, q, J) {
    Mt(A);
    let ne = (J && J.flushSync) === !0, pe = p || m, oe = fd(
      j.location,
      j.matches,
      h,
      q,
      O,
      J?.relative
    ), ue = Fa(pe, oe, h), ge = va(ue, pe, oe);
    if (ge.active && ge.matches && (ue = ge.matches), !ue) {
      sn(
        A,
        O,
        gn(404, { pathname: oe }),
        { flushSync: ne }
      );
      return;
    }
    let { path: he, submission: xe, error: be } = _g(
      !0,
      oe,
      J
    );
    if (be) {
      sn(A, O, be, { flushSync: ne });
      return;
    }
    let He = n.getContext ? await n.getContext() : new wg(), je = (J && J.preventScrollReset) === !0;
    if (xe && Ut(xe.formMethod)) {
      await Su(
        A,
        O,
        he,
        ue,
        He,
        ge.active,
        ne,
        je,
        xe,
        J && J.unstable_defaultShouldRevalidate
      );
      return;
    }
    se.set(A, { routeId: O, path: he }), await Bt(
      A,
      O,
      he,
      ue,
      He,
      ge.active,
      ne,
      je,
      xe
    );
  }
  async function Su(A, O, q, J, ne, pe, oe, ue, ge, he) {
    ya(), se.delete(A);
    let xe = j.fetchers.get(A);
    En(A, _E(ge, xe), {
      flushSync: oe
    });
    let be = new AbortController(), He = bl(
      n.history,
      q,
      be.signal,
      ge
    );
    if (pe) {
      let et = await On(
        J,
        new URL(He.url).pathname,
        He.signal,
        A
      );
      if (et.type === "aborted")
        return;
      if (et.type === "error") {
        sn(A, O, et.error, { flushSync: oe });
        return;
      } else if (et.matches)
        J = et.matches;
      else {
        sn(
          A,
          O,
          gn(404, { pathname: q }),
          { flushSync: oe }
        );
        return;
      }
    }
    let je = Uo(J, q);
    if (!je.route.action && !je.route.lazy) {
      let et = gn(405, {
        method: ge.formMethod,
        pathname: q,
        routeId: O
      });
      sn(A, O, et, { flushSync: oe });
      return;
    }
    ce.set(A, be);
    let $e = Re, Xe = Al(
      f,
      d,
      He,
      q,
      J,
      je,
      s,
      ne
    ), it = await pa(
      He,
      q,
      Xe,
      ne,
      A
    ), Oe = it[je.route.id];
    if (!Oe) {
      for (let et of Xe)
        if (it[et.route.id]) {
          Oe = it[et.route.id];
          break;
        }
    }
    if (He.signal.aborted) {
      ce.get(A) === be && ce.delete(A);
      return;
    }
    if (Me.has(A)) {
      if (Ri(Oe) || rn(Oe)) {
        En(A, da(void 0));
        return;
      }
    } else {
      if (Ri(Oe))
        if (ce.delete(A), w > $e) {
          En(A, da(void 0));
          return;
        } else
          return ee.add(A), En(A, wr(ge)), Fn(He, Oe, !1, {
            fetcherSubmission: ge,
            preventScrollReset: ue
          });
      if (rn(Oe)) {
        sn(A, O, Oe.error);
        return;
      }
    }
    let pt = j.navigation.location || j.location, We = bl(
      n.history,
      pt,
      be.signal
    ), ba = p || m, Mn = j.navigation.state !== "idle" ? Fa(ba, j.navigation.location, h) : j.matches;
    ze(Mn, "Didn't find any matches after fetcher action");
    let At = ++Re;
    k.set(A, At);
    let _n = wr(ge, Oe.data);
    j.fetchers.set(A, _n);
    let { dsMatches: ni, revalidatingFetchers: Ln } = Lg(
      We,
      ne,
      f,
      d,
      n.history,
      j,
      Mn,
      ge,
      pt,
      s,
      !1,
      W,
      le,
      Me,
      se,
      ee,
      ba,
      h,
      n.patchRoutesOnNavigation != null,
      [je.route.id, Oe],
      he
    );
    Ln.filter((et) => et.key !== A).forEach((et) => {
      let Ui = et.key, Bi = j.fetchers.get(Ui), ys = wr(
        void 0,
        Bi ? Bi.data : void 0
      );
      j.fetchers.set(Ui, ys), Mt(Ui), et.controller && ce.set(Ui, et.controller);
    }), Tt({ fetchers: new Map(j.fetchers) });
    let ai = () => Ln.forEach((et) => Mt(et.key));
    be.signal.addEventListener(
      "abort",
      ai
    );
    let { loaderResults: Vi, fetcherResults: Ne } = await Vl(
      ni,
      Ln,
      We,
      pt,
      ne
    );
    if (be.signal.aborted)
      return;
    if (be.signal.removeEventListener(
      "abort",
      ai
    ), k.delete(A), ce.delete(A), Ln.forEach((et) => ce.delete(et.key)), j.fetchers.has(A)) {
      let et = da(Oe.data);
      j.fetchers.set(A, et);
    }
    let ct = Do(Vi);
    if (ct)
      return Fn(
        We,
        ct.result,
        !1,
        { preventScrollReset: ue }
      );
    if (ct = Do(Ne), ct)
      return ee.add(ct.key), Fn(
        We,
        ct.result,
        !1,
        { preventScrollReset: ue }
      );
    let { loaderData: Lt, errors: yt } = Pg(
      j,
      Mn,
      Vi,
      void 0,
      Ln,
      Ne
    );
    ds(At), j.navigation.state === "loading" && At > w ? (ze(I, "Expected pending action"), P && P.abort(), Pt(j.navigation.location, {
      matches: Mn,
      loaderData: Lt,
      errors: yt,
      fetchers: new Map(j.fetchers)
    })) : (Tt({
      errors: yt,
      loaderData: kg(
        j.loaderData,
        Lt,
        Mn,
        yt
      ),
      fetchers: new Map(j.fetchers)
    }), W = !1);
  }
  async function Bt(A, O, q, J, ne, pe, oe, ue, ge) {
    let he = j.fetchers.get(A);
    En(
      A,
      wr(
        ge,
        he ? he.data : void 0
      ),
      { flushSync: oe }
    );
    let xe = new AbortController(), be = bl(
      n.history,
      q,
      xe.signal
    );
    if (pe) {
      let Oe = await On(
        J,
        new URL(be.url).pathname,
        be.signal,
        A
      );
      if (Oe.type === "aborted")
        return;
      if (Oe.type === "error") {
        sn(A, O, Oe.error, { flushSync: oe });
        return;
      } else if (Oe.matches)
        J = Oe.matches;
      else {
        sn(
          A,
          O,
          gn(404, { pathname: q }),
          { flushSync: oe }
        );
        return;
      }
    }
    let He = Uo(J, q);
    ce.set(A, xe);
    let je = Re, $e = Al(
      f,
      d,
      be,
      q,
      J,
      He,
      s,
      ne
    ), Xe = await pa(
      be,
      q,
      $e,
      ne,
      A
    ), it = Xe[He.route.id];
    if (!it) {
      for (let Oe of J)
        if (Xe[Oe.route.id]) {
          it = Xe[Oe.route.id];
          break;
        }
    }
    if (ce.get(A) === xe && ce.delete(A), !be.signal.aborted) {
      if (Me.has(A)) {
        En(A, da(void 0));
        return;
      }
      if (Ri(it))
        if (w > je) {
          En(A, da(void 0));
          return;
        } else {
          ee.add(A), await Fn(be, it, !1, {
            preventScrollReset: ue
          });
          return;
        }
      if (rn(it)) {
        sn(A, O, it.error);
        return;
      }
      En(A, da(it.data));
    }
  }
  async function Fn(A, O, q, {
    submission: J,
    fetcherSubmission: ne,
    preventScrollReset: pe,
    replace: oe
  } = {}) {
    q || (te?.resolve(), te = null), O.response.headers.has("X-Remix-Revalidate") && (W = !0);
    let ue = O.response.headers.get("Location");
    ze(ue, "Expected a Location header on the redirect Response"), ue = Yg(
      ue,
      new URL(A.url),
      h,
      n.history
    );
    let ge = cd(j.location, ue, {
      _isRedirect: !0
    });
    if (r) {
      let $e = !1;
      if (O.response.headers.has("X-Remix-Reload-Document"))
        $e = !0;
      else if (Gd(ue)) {
        const Xe = DT(ue, !0);
        $e = // Hard reload if it's an absolute URL to a new origin
        Xe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        xn(Xe.pathname, h) == null;
      }
      if ($e) {
        oe ? a.location.replace(ue) : a.location.assign(ue);
        return;
      }
    }
    P = null;
    let he = oe === !0 || O.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: xe, formAction: be, formEncType: He } = j.navigation;
    !J && !ne && xe && be && He && (J = Kg(j.navigation));
    let je = J || ne;
    if (uE.has(O.response.status) && je && Ut(je.formMethod))
      await Xn(he, ge, {
        submission: {
          ...je,
          formAction: ue
        },
        // Preserve these flags across redirects
        preventScrollReset: pe || F,
        enableViewTransition: q ? ae : void 0
      });
    else {
      let $e = qf(
        ge,
        J
      );
      await Xn(he, ge, {
        overrideNavigation: $e,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ne,
        // Preserve these flags across redirects
        preventScrollReset: pe || F,
        enableViewTransition: q ? ae : void 0
      });
    }
  }
  async function pa(A, O, q, J, ne) {
    let pe, oe = {};
    try {
      pe = await bE(
        g,
        A,
        O,
        q,
        ne,
        J,
        !1
      );
    } catch (ue) {
      return q.filter((ge) => ge.shouldLoad).forEach((ge) => {
        oe[ge.route.id] = {
          type: "error",
          error: ue
        };
      }), oe;
    }
    if (A.signal.aborted)
      return oe;
    if (!Ut(A.method))
      for (let ue of q) {
        if (pe[ue.route.id]?.type === "error")
          break;
        !pe.hasOwnProperty(ue.route.id) && !j.loaderData.hasOwnProperty(ue.route.id) && (!j.errors || !j.errors.hasOwnProperty(ue.route.id)) && ue.shouldCallHandler() && (pe[ue.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ue.route.id}`
          )
        });
      }
    for (let [ue, ge] of Object.entries(pe))
      if (DE(ge)) {
        let he = ge.result;
        oe[ue] = {
          type: "redirect",
          response: EE(
            he,
            A,
            ue,
            q,
            h
          )
        };
      } else
        oe[ue] = await TE(ge);
    return oe;
  }
  async function Vl(A, O, q, J, ne) {
    let pe = pa(
      q,
      J,
      A,
      ne,
      null
    ), oe = Promise.all(
      O.map(async (he) => {
        if (he.matches && he.match && he.request && he.controller) {
          let be = (await pa(
            he.request,
            he.path,
            he.matches,
            ne,
            he.key
          ))[he.match.route.id];
          return { [he.key]: be };
        } else
          return Promise.resolve({
            [he.key]: {
              type: "error",
              error: gn(404, {
                pathname: he.path
              })
            }
          });
      })
    ), ue = await pe, ge = (await oe).reduce(
      (he, xe) => Object.assign(he, xe),
      {}
    );
    return {
      loaderResults: ue,
      fetcherResults: ge
    };
  }
  function ya() {
    W = !0, se.forEach((A, O) => {
      ce.has(O) && le.add(O), Mt(O);
    });
  }
  function En(A, O, q = {}) {
    j.fetchers.set(A, O), Tt(
      { fetchers: new Map(j.fetchers) },
      { flushSync: (q && q.flushSync) === !0 }
    );
  }
  function sn(A, O, q, J = {}) {
    let ne = Ka(j.matches, O);
    Kn(A), Tt(
      {
        errors: {
          [ne.route.id]: q
        },
        fetchers: new Map(j.fetchers)
      },
      { flushSync: (J && J.flushSync) === !0 }
    );
  }
  function cs(A) {
    return Te.set(A, (Te.get(A) || 0) + 1), Me.has(A) && Me.delete(A), j.fetchers.get(A) || cE;
  }
  function xu(A, O) {
    Mt(A, O?.reason), En(A, da(null));
  }
  function Kn(A) {
    let O = j.fetchers.get(A);
    ce.has(A) && !(O && O.state === "loading" && k.has(A)) && Mt(A), se.delete(A), k.delete(A), ee.delete(A), Me.delete(A), le.delete(A), j.fetchers.delete(A);
  }
  function Ht(A) {
    let O = (Te.get(A) || 0) - 1;
    O <= 0 ? (Te.delete(A), Me.add(A)) : Te.set(A, O), Tt({ fetchers: new Map(j.fetchers) });
  }
  function Mt(A, O) {
    let q = ce.get(A);
    q && (q.abort(O), ce.delete(A));
  }
  function _t(A) {
    for (let O of A) {
      let q = cs(O), J = da(q.data);
      j.fetchers.set(O, J);
    }
  }
  function fs() {
    let A = [], O = !1;
    for (let q of ee) {
      let J = j.fetchers.get(q);
      ze(J, `Expected fetcher: ${q}`), J.state === "loading" && (ee.delete(q), A.push(q), O = !0);
    }
    return _t(A), O;
  }
  function ds(A) {
    let O = [];
    for (let [q, J] of k)
      if (J < A) {
        let ne = j.fetchers.get(q);
        ze(ne, `Expected fetcher: ${q}`), ne.state === "loading" && (Mt(q), k.delete(q), O.push(q));
      }
    return _t(O), O.length > 0;
  }
  function Tu(A, O) {
    let q = j.blockers.get(A) || Cr;
    return De.get(A) !== O && De.set(A, O), q;
  }
  function ei(A) {
    j.blockers.delete(A), De.delete(A);
  }
  function Qn(A, O) {
    let q = j.blockers.get(A) || Cr;
    ze(
      q.state === "unblocked" && O.state === "blocked" || q.state === "blocked" && O.state === "blocked" || q.state === "blocked" && O.state === "proceeding" || q.state === "blocked" && O.state === "unblocked" || q.state === "proceeding" && O.state === "unblocked",
      `Invalid blocker state transition: ${q.state} -> ${O.state}`
    );
    let J = new Map(j.blockers);
    J.set(A, O), Tt({ blockers: J });
  }
  function ti({
    currentLocation: A,
    nextLocation: O,
    historyAction: q
  }) {
    if (De.size === 0)
      return;
    De.size > 1 && ht(!1, "A router only supports one blocker at a time");
    let J = Array.from(De.entries()), [ne, pe] = J[J.length - 1], oe = j.blockers.get(ne);
    if (!(oe && oe.state === "proceeding") && pe({ currentLocation: A, nextLocation: O, historyAction: q }))
      return ne;
  }
  function Rn(A) {
    let O = gn(404, { pathname: A }), q = p || m, { matches: J, route: ne } = wo(q);
    return { notFoundMatches: J, route: ne, error: O };
  }
  function Li(A, O, q) {
    if (R = A, N = O, C = q || null, !z && j.navigation === Hf) {
      z = !0;
      let J = Ul(j.location, j.matches);
      J != null && Tt({ restoreScrollPosition: J });
    }
    return () => {
      R = null, N = null, C = null;
    };
  }
  function ga(A, O) {
    return C && C(
      A,
      O.map((J) => LT(J, j.loaderData))
    ) || A.key;
  }
  function Eu(A, O) {
    if (R && N) {
      let q = ga(A, O);
      R[q] = N();
    }
  }
  function Ul(A, O) {
    if (R) {
      let q = ga(A, O), J = R[q];
      if (typeof J == "number")
        return J;
    }
    return null;
  }
  function va(A, O, q) {
    if (n.patchRoutesOnNavigation)
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: Ur(
            O,
            q,
            h,
            !0
          ) };
      } else
        return { active: !0, matches: Ur(
          O,
          q,
          h,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function On(A, O, q, J) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: A };
    let ne = A;
    for (; ; ) {
      let pe = p == null, oe = p || m, ue = d;
      try {
        await n.patchRoutesOnNavigation({
          signal: q,
          path: O,
          matches: ne,
          fetcherKey: J,
          patch: (xe, be) => {
            q.aborted || Vg(
              xe,
              be,
              oe,
              ue,
              f,
              !1
            );
          }
        });
      } catch (xe) {
        return { type: "error", error: xe, partialMatches: ne };
      } finally {
        pe && !q.aborted && (m = [...m]);
      }
      if (q.aborted)
        return { type: "aborted" };
      let ge = Fa(oe, O, h), he = null;
      if (ge) {
        if (Object.keys(ge[0].params).length === 0)
          return { type: "success", matches: ge };
        if (he = Ur(
          oe,
          O,
          h,
          !0
        ), !(he && ne.length < he.length && hs(
          ne,
          he.slice(0, ne.length)
        )))
          return { type: "success", matches: ge };
      }
      if (he || (he = Ur(
        oe,
        O,
        h,
        !0
      )), !he || hs(ne, he))
        return { type: "success", matches: null };
      ne = he;
    }
  }
  function hs(A, O) {
    return A.length === O.length && A.every((q, J) => q.route.id === O[J].route.id);
  }
  function ms(A) {
    d = {}, p = kr(
      A,
      f,
      void 0,
      d
    );
  }
  function ps(A, O, q = !1) {
    let J = p == null;
    Vg(
      A,
      O,
      p || m,
      d,
      f,
      q
    ), J && (m = [...m], Tt({}));
  }
  return ie = {
    get basename() {
      return h;
    },
    get future() {
      return v;
    },
    get state() {
      return j;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: Wa,
    subscribe: zl,
    enableScrollRestoration: Li,
    navigate: Oi,
    fetch: bu,
    revalidate: Ol,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => n.history.createHref(A),
    encodeLocation: (A) => n.history.encodeLocation(A),
    getFetcher: cs,
    resetFetcher: xu,
    deleteFetcher: Ht,
    dispose: zi,
    getBlocker: Tu,
    deleteBlocker: ei,
    patchRoutes: ps,
    _internalFetchControllers: ce,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ms,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
      Tt(A);
    }
  }, n.unstable_instrumentations && (ie = tE(
    ie,
    n.unstable_instrumentations.map((A) => A.router).filter(Boolean)
  )), ie;
}
function hE(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function fd(n, a, r, s, o, f) {
  let d, m;
  if (o) {
    d = [];
    for (let h of a)
      if (d.push(h), h.route.id === o) {
        m = h;
        break;
      }
  } else
    d = a, m = a[a.length - 1];
  let p = ou(
    s || ".",
    Pd(d),
    xn(n.pathname, r) || n.pathname,
    f === "path"
  );
  if (s == null && (p.search = n.search, p.hash = n.hash), (s == null || s === "" || s === ".") && m) {
    let h = Kd(p.search);
    if (m.route.index && !h)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && h) {
      let g = new URLSearchParams(p.search), v = g.getAll("index");
      g.delete("index"), v.filter((T) => T).forEach((T) => g.append("index", T));
      let S = g.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (p.pathname = QT({ basename: r, pathname: p.pathname })), Pn(p);
}
function _g(n, a, r) {
  if (!r || !hE(r))
    return { path: a };
  if (r.formMethod && !zE(r.formMethod))
    return {
      path: a,
      error: gn(405, { method: r.formMethod })
    };
  let s = () => ({
    path: a,
    error: gn(400, { type: "invalid-body" })
  }), f = (r.formMethod || "get").toUpperCase(), d = K0(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!Ut(f))
        return s();
      let v = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (S, [T, R]) => `${S}${T}=${R}
`,
          ""
        )
      ) : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: f,
          formAction: d,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!Ut(f))
        return s();
      try {
        let v = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: f,
            formAction: d,
            formEncType: r.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return s();
      }
    }
  }
  ze(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, p;
  if (r.formData)
    m = hd(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    m = hd(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    m = r.body, p = Gg(m);
  else if (r.body == null)
    m = new URLSearchParams(), p = new FormData();
  else
    try {
      m = new URLSearchParams(r.body), p = Gg(m);
    } catch {
      return s();
    }
  let h = {
    formMethod: f,
    formAction: d,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (Ut(h.formMethod))
    return { path: a, submission: h };
  let g = zn(a);
  return n && g.search && Kd(g.search) && m.append("index", ""), g.search = `?${m}`, { path: Pn(g), submission: h };
}
function Lg(n, a, r, s, o, f, d, m, p, h, g, v, S, T, R, C, N, z, H, B, Q) {
  let $ = B ? rn(B[1]) ? B[1].error : B[1].data : void 0, de = o.createURL(f.location), ie = o.createURL(p), j;
  if (g && f.errors) {
    let re = Object.keys(f.errors)[0];
    j = d.findIndex((U) => U.route.id === re);
  } else if (B && rn(B[1])) {
    let re = B[0];
    j = d.findIndex((U) => U.route.id === re) - 1;
  }
  let I = B ? B[1].statusCode : void 0, te = I && I >= 400, F = {
    currentUrl: de,
    currentParams: f.matches[0]?.params || {},
    nextUrl: ie,
    nextParams: d[0].params,
    ...m,
    actionResult: $,
    actionStatus: I
  }, P = $r(d), ae = d.map((re, U) => {
    let { route: W } = re, le = null;
    if (j != null && U > j)
      le = !1;
    else if (W.lazy)
      le = !0;
    else if (!Xd(W))
      le = !1;
    else if (g) {
      let { shouldLoad: k } = q0(
        W,
        f.loaderData,
        f.errors
      );
      le = k;
    } else mE(f.loaderData, f.matches[U], re) && (le = !0);
    if (le !== null)
      return dd(
        r,
        s,
        n,
        p,
        P,
        re,
        h,
        a,
        le
      );
    let ce = !1;
    typeof Q == "boolean" ? ce = Q : te ? ce = !1 : (v || de.pathname + de.search === ie.pathname + ie.search || de.search !== ie.search || pE(f.matches[U], re)) && (ce = !0);
    let Re = {
      ...F,
      defaultShouldRevalidate: ce
    }, w = Hr(re, Re);
    return dd(
      r,
      s,
      n,
      p,
      P,
      re,
      h,
      a,
      w,
      Re,
      Q
    );
  }), fe = [];
  return R.forEach((re, U) => {
    if (g || !d.some((se) => se.route.id === re.routeId) || T.has(U))
      return;
    let W = f.fetchers.get(U), le = W && W.state !== "idle" && W.data === void 0, ce = Fa(N, re.path, z);
    if (!ce) {
      if (H && le)
        return;
      fe.push({
        key: U,
        routeId: re.routeId,
        path: re.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (C.has(U))
      return;
    let Re = Uo(ce, re.path), w = new AbortController(), k = bl(
      o,
      re.path,
      w.signal
    ), ee = null;
    if (S.has(U))
      S.delete(U), ee = Al(
        r,
        s,
        k,
        re.path,
        ce,
        Re,
        h,
        a
      );
    else if (le)
      v && (ee = Al(
        r,
        s,
        k,
        re.path,
        ce,
        Re,
        h,
        a
      ));
    else {
      let se;
      typeof Q == "boolean" ? se = Q : te ? se = !1 : se = v;
      let Te = {
        ...F,
        defaultShouldRevalidate: se
      };
      Hr(Re, Te) && (ee = Al(
        r,
        s,
        k,
        re.path,
        ce,
        Re,
        h,
        a,
        Te
      ));
    }
    ee && fe.push({
      key: U,
      routeId: re.routeId,
      path: re.path,
      matches: ee,
      match: Re,
      request: k,
      controller: w
    });
  }), { dsMatches: ae, revalidatingFetchers: fe };
}
function Xd(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function q0(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Xd(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let f = !s && !o;
  return { shouldLoad: f, renderFallback: f };
}
function mE(n, a, r) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), o = !n.hasOwnProperty(r.route.id);
  return s || o;
}
function pE(n, a) {
  let r = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function Hr(n, a) {
  if (n.route.shouldRevalidate) {
    let r = n.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Vg(n, a, r, s, o, f) {
  let d;
  if (n) {
    let h = s[n];
    ze(
      h,
      `No route found to patch children into: routeId = ${n}`
    ), h.children || (h.children = []), d = h.children;
  } else
    d = r;
  let m = [], p = [];
  if (a.forEach((h) => {
    let g = d.find(
      (v) => Y0(h, v)
    );
    g ? p.push({ existingRoute: g, newRoute: h }) : m.push(h);
  }), m.length > 0) {
    let h = kr(
      m,
      o,
      [n || "_", "patch", String(d?.length || "0")],
      s
    );
    d.push(...h);
  }
  if (f && p.length > 0)
    for (let h = 0; h < p.length; h++) {
      let { existingRoute: g, newRoute: v } = p[h], S = g, [T] = kr(
        [v],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(S, {
        element: T.element ? T.element : S.element,
        errorElement: T.errorElement ? T.errorElement : S.errorElement,
        hydrateFallbackElement: T.hydrateFallbackElement ? T.hydrateFallbackElement : S.hydrateFallbackElement
      });
    }
}
function Y0(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => Y0(r, o))
  ) ?? !1 : !1;
}
var Ug = /* @__PURE__ */ new WeakMap(), G0 = ({
  key: n,
  route: a,
  manifest: r,
  mapRouteProperties: s
}) => {
  let o = r[a.id];
  if (ze(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let f = o.lazy[n];
  if (!f)
    return;
  let d = Ug.get(o);
  d || (d = {}, Ug.set(o, d));
  let m = d[n];
  if (m)
    return m;
  let p = (async () => {
    let h = NT(n), v = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (h)
      ht(
        !h,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), d[n] = Promise.resolve();
    else if (v)
      ht(
        !1,
        `Route "${o.id}" has a static property "${n}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await f();
      S != null && (Object.assign(o, { [n]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[n] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return d[n] = p, p;
}, Bg = /* @__PURE__ */ new WeakMap();
function yE(n, a, r, s, o) {
  let f = r[n.id];
  if (ze(f, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let g = Bg.get(f);
    if (g)
      return {
        lazyRoutePromise: g,
        lazyHandlerPromise: g
      };
    let v = (async () => {
      ze(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), T = {};
      for (let R in S) {
        let C = S[R];
        if (C === void 0)
          continue;
        let N = OT(R), H = f[R] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        R !== "hasErrorBoundary";
        N ? ht(
          !N,
          "Route property " + R + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : H ? ht(
          !H,
          `Route "${f.id}" has a static property "${R}" defined but its lazy function is also returning a value for this property. The lazy route property "${R}" will be ignored.`
        ) : T[R] = C;
      }
      Object.assign(f, T), Object.assign(f, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(f),
        lazy: void 0
      });
    })();
    return Bg.set(f, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let d = Object.keys(n.lazy), m = [], p;
  for (let g of d) {
    if (o && o.includes(g))
      continue;
    let v = G0({
      key: g,
      route: n,
      manifest: r,
      mapRouteProperties: s
    });
    v && (m.push(v), g === a && (p = v));
  }
  let h = m.length > 0 ? Promise.all(m).then(() => {
  }) : void 0;
  return h?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: h,
    lazyHandlerPromise: p
  };
}
async function Hg(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, f) => {
    r[a[f].route.id] = o;
  }), r;
}
async function gE(n) {
  return n.matches.some((a) => a.route.middleware) ? P0(n, () => Hg(n)) : Hg(n);
}
function P0(n, a) {
  return vE(
    n,
    a,
    (s) => {
      if (NE(s))
        throw s;
      return s;
    },
    CE,
    r
  );
  function r(s, o, f) {
    if (f)
      return Promise.resolve(
        Object.assign(f.value, {
          [o]: { type: "error", result: s }
        })
      );
    {
      let { matches: d } = n, m = Math.min(
        // Throwing route
        Math.max(
          d.findIndex((h) => h.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          d.findIndex((h) => h.shouldCallHandler()),
          0
        )
      ), p = Ka(
        d,
        d[m].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function vE(n, a, r, s, o) {
  let { matches: f, ...d } = n, m = f.flatMap(
    (h) => h.route.middleware ? h.route.middleware.map((g) => [h.route.id, g]) : []
  );
  return await k0(
    d,
    m,
    a,
    r,
    s,
    o
  );
}
async function k0(n, a, r, s, o, f, d = 0) {
  let { request: m } = n;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let p = a[d];
  if (!p)
    return await r();
  let [h, g] = p, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await k0(
        n,
        a,
        r,
        s,
        o,
        f,
        d + 1
      ) }, v.value;
    } catch (T) {
      return v = { value: await f(T, h, v) }, v.value;
    }
  };
  try {
    let T = await g(n, S), R = T != null ? s(T) : void 0;
    return o(R) ? R : v ? R ?? v.value : (v = { value: await S() }, v.value);
  } catch (T) {
    return await f(T, h, v);
  }
}
function X0(n, a, r, s, o) {
  let f = G0({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), d = yE(
    s.route,
    Ut(r.method) ? "action" : "loader",
    a,
    n,
    o
  );
  return {
    middleware: f,
    route: d.lazyRoutePromise,
    handler: d.lazyHandlerPromise
  };
}
function dd(n, a, r, s, o, f, d, m, p, h = null, g) {
  let v = !1, S = X0(
    n,
    a,
    r,
    f,
    d
  );
  return {
    ...f,
    _lazyPromises: S,
    shouldLoad: p,
    shouldRevalidateArgs: h,
    shouldCallHandler(T) {
      return v = !0, h ? typeof g == "boolean" ? Hr(f, {
        ...h,
        defaultShouldRevalidate: g
      }) : typeof T == "boolean" ? Hr(f, {
        ...h,
        defaultShouldRevalidate: T
      }) : Hr(f, h) : p;
    },
    resolve(T) {
      let { lazy: R, loader: C, middleware: N } = f.route, z = v || p || T && !Ut(r.method) && (R || C), H = N && N.length > 0 && !C && !R;
      return z && (Ut(r.method) || !H) ? SE({
        request: r,
        path: s,
        unstable_pattern: o,
        match: f,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: T,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Al(n, a, r, s, o, f, d, m, p = null) {
  return o.map((h) => h.route.id !== f.route.id ? {
    ...h,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: X0(
      n,
      a,
      r,
      h,
      d
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : dd(
    n,
    a,
    r,
    s,
    $r(o),
    h,
    d,
    m,
    !0,
    p
  ));
}
async function bE(n, a, r, s, o, f, d) {
  s.some((g) => g._lazyPromises?.middleware) && await Promise.all(s.map((g) => g._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: F0(a, r),
    unstable_pattern: $r(s),
    params: s[0].params,
    context: f,
    matches: s
  }, h = await n({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (g) => {
      let v = m;
      return P0(v, () => g({
        ...v,
        fetcherKey: o,
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
      s.flatMap((g) => [
        g._lazyPromises?.handler,
        g._lazyPromises?.route
      ])
    );
  } catch {
  }
  return h;
}
async function SE({
  request: n,
  path: a,
  unstable_pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: f,
  handlerOverride: d,
  scopedContext: m
}) {
  let p, h, g = Ut(n.method), v = g ? "action" : "loader", S = (T) => {
    let R, C = new Promise((H, B) => R = B);
    h = () => R(), n.signal.addEventListener("abort", h);
    let N = (H) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: n,
        unstable_url: F0(n, a),
        unstable_pattern: r,
        params: s.params,
        context: m
      },
      ...H !== void 0 ? [H] : []
    ), z = (async () => {
      try {
        return { type: "data", result: await (d ? d((B) => N(B)) : N()) };
      } catch (H) {
        return { type: "error", result: H };
      }
    })();
    return Promise.race([z, C]);
  };
  try {
    let T = g ? s.route.action : s.route.loader;
    if (o || f)
      if (T) {
        let R, [C] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(T).catch((N) => {
            R = N;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          f
        ]);
        if (R !== void 0)
          throw R;
        p = C;
      } else {
        await o;
        let R = g ? s.route.action : s.route.loader;
        if (R)
          [p] = await Promise.all([S(R), f]);
        else if (v === "action") {
          let C = new URL(n.url), N = C.pathname + C.search;
          throw gn(405, {
            method: n.method,
            pathname: N,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (T)
      p = await S(T);
    else {
      let R = new URL(n.url), C = R.pathname + R.search;
      throw gn(404, {
        pathname: C
      });
    }
  } catch (T) {
    return { type: "error", result: T };
  } finally {
    h && n.signal.removeEventListener("abort", h);
  }
  return p;
}
async function xE(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function TE(n) {
  let { result: a, type: r } = n;
  if (Fd(a)) {
    let s;
    try {
      s = await xE(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error" ? {
      type: "error",
      error: new uu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Fg(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: AE(a),
    statusCode: Xr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Xr(a) ? a.status : void 0
  } : Fg(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function EE(n, a, r, s, o) {
  let f = n.headers.get("Location");
  if (ze(
    f,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Gd(f)) {
    let d = s.slice(
      0,
      s.findIndex((m) => m.route.id === r) + 1
    );
    f = fd(
      new URL(a.url),
      d,
      o,
      f
    ), n.headers.set("Location", f);
  }
  return n;
}
var qg = [
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
function Yg(n, a, r, s) {
  if (Gd(n)) {
    let o = n, f = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (qg.includes(f.protocol))
      throw new Error("Invalid redirect location");
    let d = xn(f.pathname, r) != null;
    if (f.origin === a.origin && d)
      return kd(f.pathname) + f.search + f.hash;
  }
  try {
    let o = s.createURL(n);
    if (qg.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function bl(n, a, r, s) {
  let o = n.createURL(K0(a)).toString(), f = { signal: r };
  if (s && Ut(s.formMethod)) {
    let { formMethod: d, formEncType: m } = s;
    f.method = d.toUpperCase(), m === "application/json" ? (f.headers = new Headers({ "Content-Type": m }), f.body = JSON.stringify(s.json)) : m === "text/plain" ? f.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? f.body = hd(s.formData) : f.body = s.formData;
  }
  return new Request(o, f);
}
function F0(n, a) {
  let r = new URL(n.url), s = typeof a == "string" ? zn(a) : a;
  if (r.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), f = o.getAll("index");
    o.delete("index");
    for (let d of f.filter(Boolean))
      o.append("index", d);
    r.search = o.size ? `?${o.toString()}` : "";
  } else
    r.search = "";
  return r.hash = s.hash || "", r;
}
function hd(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function Gg(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function RE(n, a, r, s = !1, o = !1) {
  let f = {}, d = null, m, p = !1, h = {}, g = r && rn(r[1]) ? r[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, T = a[S];
    if (ze(
      !Ri(T),
      "Cannot handle redirect results in processLoaderData"
    ), rn(T)) {
      let R = T.error;
      if (g !== void 0 && (R = g, g = void 0), d = d || {}, o)
        d[S] = R;
      else {
        let C = Ka(n, S);
        d[C.route.id] == null && (d[C.route.id] = R);
      }
      s || (f[S] = H0), p || (p = !0, m = Xr(T.error) ? T.error.status : 500), T.headers && (h[S] = T.headers);
    } else
      f[S] = T.data, T.statusCode && T.statusCode !== 200 && !p && (m = T.statusCode), T.headers && (h[S] = T.headers);
  }), g !== void 0 && r && (d = { [r[0]]: g }, r[2] && (f[r[2]] = void 0)), {
    loaderData: f,
    errors: d,
    statusCode: m || 200,
    loaderHeaders: h
  };
}
function Pg(n, a, r, s, o, f) {
  let { loaderData: d, errors: m } = RE(
    a,
    r,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((h) => h.shouldLoad)).forEach((p) => {
    let { key: h, match: g, controller: v } = p;
    if (v && v.signal.aborted)
      return;
    let S = f[h];
    if (ze(S, "Did not find corresponding fetcher result"), rn(S)) {
      let T = Ka(n.matches, g?.route.id);
      m && m[T.route.id] || (m = {
        ...m,
        [T.route.id]: S.error
      }), n.fetchers.delete(h);
    } else if (Ri(S))
      ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let T = da(S.data);
      n.fetchers.set(h, T);
    }
  }), { loaderData: d, errors: m };
}
function kg(n, a, r, s) {
  let o = Object.entries(a).filter(([, f]) => f !== H0).reduce((f, [d, m]) => (f[d] = m, f), {});
  for (let f of r) {
    let d = f.route.id;
    if (!a.hasOwnProperty(d) && n.hasOwnProperty(d) && f.route.loader && (o[d] = n[d]), s && s.hasOwnProperty(d))
      break;
  }
  return o;
}
function Xg(n) {
  return n ? rn(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function Ka(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function wo(n) {
  let a = n.length === 1 ? n[0] : n.find((r) => r.index || !r.path || r.path === "/") || {
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
function gn(n, {
  pathname: a,
  routeId: r,
  method: s,
  type: o,
  message: f
} = {}) {
  let d = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return n === 400 ? (d = "Bad Request", s && a && r ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : n === 403 ? (d = "Forbidden", m = `Route "${r}" does not match URL "${a}"`) : n === 404 ? (d = "Not Found", m = `No route matches URL "${a}"`) : n === 405 && (d = "Method Not Allowed", s && a && r ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new uu(
    n || 500,
    d,
    new Error(m),
    !0
  );
}
function Do(n) {
  let a = Object.entries(n);
  for (let r = a.length - 1; r >= 0; r--) {
    let [s, o] = a[r];
    if (Ri(o))
      return { key: s, result: o };
  }
}
function K0(n) {
  let a = typeof n == "string" ? zn(n) : n;
  return Pn({ ...a, hash: "" });
}
function ME(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function AE(n) {
  return new uu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function CE(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, r]) => typeof a == "string" && wE(r)
  );
}
function wE(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function DE(n) {
  return Fd(n.result) && U0.has(n.result.status);
}
function rn(n) {
  return n.type === "error";
}
function Ri(n) {
  return (n && n.type) === "redirect";
}
function Fg(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Fd(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function jE(n) {
  return U0.has(n);
}
function NE(n) {
  return Fd(n) && jE(n.status) && n.headers.has("Location");
}
function zE(n) {
  return oE.has(n.toUpperCase());
}
function Ut(n) {
  return rE.has(n.toUpperCase());
}
function Kd(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function Uo(n, a) {
  let r = typeof a == "string" ? zn(a).search : a.search;
  if (n[n.length - 1].route.index && Kd(r || ""))
    return n[n.length - 1];
  let s = z0(n);
  return s[s.length - 1];
}
function Kg(n) {
  let { formMethod: a, formAction: r, formEncType: s, text: o, formData: f, json: d } = n;
  if (!(!a || !r || !s)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (f != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: f,
        json: void 0,
        text: void 0
      };
    if (d !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: d,
        text: void 0
      };
  }
}
function qf(n, a) {
  return a ? {
    state: "loading",
    location: n,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  } : {
    state: "loading",
    location: n,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function OE(n, a) {
  return {
    state: "submitting",
    location: n,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  };
}
function wr(n, a) {
  return n ? {
    state: "loading",
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
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
function _E(n, a) {
  return {
    state: "submitting",
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
    data: a ? a.data : void 0
  };
}
function da(n) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: n
  };
}
function LE(n, a) {
  try {
    let r = n.sessionStorage.getItem(
      B0
    );
    if (r) {
      let s = JSON.parse(r);
      for (let [o, f] of Object.entries(s || {}))
        f && Array.isArray(f) && a.set(o, new Set(f || []));
    }
  } catch {
  }
}
function VE(n, a) {
  if (a.size > 0) {
    let r = {};
    for (let [s, o] of a)
      r[s] = [...o];
    try {
      n.sessionStorage.setItem(
        B0,
        JSON.stringify(r)
      );
    } catch (s) {
      ht(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function Qg() {
  let n, a, r = new Promise((s, o) => {
    n = async (f) => {
      s(f);
      try {
        await r;
      } catch {
      }
    }, a = async (f) => {
      o(f);
      try {
        await r;
      } catch {
      }
    };
  });
  return {
    promise: r,
    //@ts-ignore
    resolve: n,
    //@ts-ignore
    reject: a
  };
}
var ji = E.createContext(null);
ji.displayName = "DataRouter";
var Jr = E.createContext(null);
Jr.displayName = "DataRouterState";
var Q0 = E.createContext(!1);
function Z0() {
  return E.useContext(Q0);
}
var Qd = E.createContext({
  isTransitioning: !1
});
Qd.displayName = "ViewTransition";
var $0 = E.createContext(
  /* @__PURE__ */ new Map()
);
$0.displayName = "Fetchers";
var UE = E.createContext(null);
UE.displayName = "Await";
var Tn = E.createContext(
  null
);
Tn.displayName = "Navigation";
var cu = E.createContext(
  null
);
cu.displayName = "Location";
var ha = E.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ha.displayName = "Route";
var Zd = E.createContext(null);
Zd.displayName = "RouteError";
var J0 = "REACT_ROUTER_ERROR", BE = "REDIRECT", HE = "ROUTE_ERROR_RESPONSE";
function qE(n) {
  if (n.startsWith(`${J0}:${BE}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function YE(n) {
  if (n.startsWith(
    `${J0}:${HE}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new uu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function GE(n, { relative: a } = {}) {
  ze(
    Ir(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = E.useContext(Tn), { hash: o, pathname: f, search: d } = es(n, { relative: a }), m = f;
  return r !== "/" && (m = f === "/" ? r : bn([r, f])), s.createHref({ pathname: m, search: d, hash: o });
}
function Ir() {
  return E.useContext(cu) != null;
}
function ma() {
  return ze(
    Ir(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), E.useContext(cu).location;
}
var I0 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function W0(n) {
  E.useContext(Tn).static || E.useLayoutEffect(n);
}
function Wr() {
  let { isDataRoute: n } = E.useContext(ha);
  return n ? eR() : PE();
}
function PE() {
  ze(
    Ir(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = E.useContext(ji), { basename: a, navigator: r } = E.useContext(Tn), { matches: s } = E.useContext(ha), { pathname: o } = ma(), f = JSON.stringify(Pd(s)), d = E.useRef(!1);
  return W0(() => {
    d.current = !0;
  }), E.useCallback(
    (p, h = {}) => {
      if (ht(d.current, I0), !d.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let g = ou(
        p,
        JSON.parse(f),
        o,
        h.relative === "path"
      );
      n == null && a !== "/" && (g.pathname = g.pathname === "/" ? a : bn([a, g.pathname])), (h.replace ? r.replace : r.push)(
        g,
        h.state,
        h
      );
    },
    [
      a,
      r,
      f,
      o,
      n
    ]
  );
}
E.createContext(null);
function es(n, { relative: a } = {}) {
  let { matches: r } = E.useContext(ha), { pathname: s } = ma(), o = JSON.stringify(Pd(r));
  return E.useMemo(
    () => ou(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function kE(n, a, r) {
  ze(
    Ir(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = E.useContext(Tn), { matches: o } = E.useContext(ha), f = o[o.length - 1], d = f ? f.params : {}, m = f ? f.pathname : "/", p = f ? f.pathnameBase : "/", h = f && f.route;
  {
    let N = h && h.path || "";
    nb(
      m,
      !h || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`
    );
  }
  let g = ma(), v;
  v = g;
  let S = v.pathname || "/", T = S;
  if (p !== "/") {
    let N = p.replace(/^\//, "").split("/");
    T = "/" + S.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let R = Fa(n, { pathname: T });
  return ht(
    h || R != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), ht(
    R == null || R[R.length - 1].route.element !== void 0 || R[R.length - 1].route.Component !== void 0 || R[R.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), ZE(
    R && R.map(
      (N) => Object.assign({}, N, {
        params: Object.assign({}, d, N.params),
        pathname: bn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            N.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathname
        ]),
        pathnameBase: N.pathnameBase === "/" ? p : bn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            N.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : N.pathnameBase
        ])
      })
    ),
    o,
    r
  );
}
function XE() {
  let n = WE(), a = Xr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, f = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), d = /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ E.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ E.createElement("code", { style: f }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ E.createElement("code", { style: f }, "errorElement"), " prop on your route.")), /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ E.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ E.createElement("pre", { style: o }, r) : null, d);
}
var FE = /* @__PURE__ */ E.createElement(XE, null), eb = class extends E.Component {
  constructor(n) {
    super(n), this.state = {
      location: n.location,
      revalidation: n.revalidation,
      error: n.error
    };
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  static getDerivedStateFromProps(n, a) {
    return a.location !== n.location || a.revalidation !== "idle" && n.revalidation === "idle" ? {
      error: n.error,
      location: n.location,
      revalidation: n.revalidation
    } : {
      error: n.error !== void 0 ? n.error : a.error,
      location: a.location,
      revalidation: n.revalidation || a.revalidation
    };
  }
  componentDidCatch(n, a) {
    this.props.onError ? this.props.onError(n, a) : console.error(
      "React Router caught the following error during render",
      n
    );
  }
  render() {
    let n = this.state.error;
    if (this.context && typeof n == "object" && n && "digest" in n && typeof n.digest == "string") {
      const r = YE(n.digest);
      r && (n = r);
    }
    let a = n !== void 0 ? /* @__PURE__ */ E.createElement(ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ E.createElement(
      Zd.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ E.createElement(KE, { error: n }, a) : a;
  }
};
eb.contextType = Q0;
var Yf = /* @__PURE__ */ new WeakMap();
function KE({
  children: n,
  error: a
}) {
  let { basename: r } = E.useContext(Tn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = qE(a.digest);
    if (s) {
      let o = Yf.get(a);
      if (o) throw o;
      let f = _0(s.location, r);
      if (O0 && !Yf.get(a))
        if (f.isExternal || s.reloadDocument)
          window.location.href = f.absoluteURL || f.to;
        else {
          const d = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(f.to, {
              replace: s.replace
            })
          );
          throw Yf.set(a, d), d;
        }
      return /* @__PURE__ */ E.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${f.absoluteURL || f.to}`
        }
      );
    }
  }
  return n;
}
function QE({ routeContext: n, match: a, children: r }) {
  let s = E.useContext(ji);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ E.createElement(ha.Provider, { value: n }, r);
}
function ZE(n, a = [], r) {
  let s = r?.state;
  if (n == null) {
    if (!s)
      return null;
    if (s.errors)
      n = s.matches;
    else if (a.length === 0 && !s.initialized && s.matches.length > 0)
      n = s.matches;
    else
      return null;
  }
  let o = n, f = s?.errors;
  if (f != null) {
    let g = o.findIndex(
      (v) => v.route.id && f?.[v.route.id] !== void 0
    );
    ze(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        f
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, g + 1)
    );
  }
  let d = !1, m = -1;
  if (r && s) {
    d = s.renderFallback;
    for (let g = 0; g < o.length; g++) {
      let v = o[g];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = g), v.route.id) {
        let { loaderData: S, errors: T } = s, R = v.route.loader && !S.hasOwnProperty(v.route.id) && (!T || T[v.route.id] === void 0);
        if (v.route.lazy || R) {
          r.isStatic && (d = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, h = s && p ? (g, v) => {
    p(g, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: $r(s.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (g, v, S) => {
      let T, R = !1, C = null, N = null;
      s && (T = f && v.route.id ? f[v.route.id] : void 0, C = v.route.errorElement || FE, d && (m < 0 && S === 0 ? (nb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), R = !0, N = null) : m === S && (R = !0, N = v.route.hydrateFallbackElement || null)));
      let z = a.concat(o.slice(0, S + 1)), H = () => {
        let B;
        return T ? B = C : R ? B = N : v.route.Component ? B = /* @__PURE__ */ E.createElement(v.route.Component, null) : v.route.element ? B = v.route.element : B = g, /* @__PURE__ */ E.createElement(
          QE,
          {
            match: v,
            routeContext: {
              outlet: g,
              matches: z,
              isDataRoute: s != null
            },
            children: B
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ E.createElement(
        eb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: C,
          error: T,
          children: H(),
          routeContext: { outlet: null, matches: z, isDataRoute: !0 },
          onError: h
        }
      ) : H();
    },
    null
  );
}
function $d(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function $E(n) {
  let a = E.useContext(ji);
  return ze(a, $d(n)), a;
}
function tb(n) {
  let a = E.useContext(Jr);
  return ze(a, $d(n)), a;
}
function JE(n) {
  let a = E.useContext(ha);
  return ze(a, $d(n)), a;
}
function fu(n) {
  let a = JE(n), r = a.matches[a.matches.length - 1];
  return ze(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function IE() {
  return fu(
    "useRouteId"
    /* UseRouteId */
  );
}
function ts() {
  let n = tb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = fu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function WE() {
  let n = E.useContext(Zd), a = tb(
    "useRouteError"
    /* UseRouteError */
  ), r = fu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function eR() {
  let { router: n } = $E(
    "useNavigate"
    /* UseNavigateStable */
  ), a = fu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = E.useRef(!1);
  return W0(() => {
    r.current = !0;
  }), E.useCallback(
    async (o, f = {}) => {
      ht(r.current, I0), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...f }));
    },
    [n, a]
  );
}
var Zg = {};
function nb(n, a, r) {
  !a && !Zg[n] && (Zg[n] = !0, ht(!1, r));
}
var $g = {};
function Jg(n, a) {
  !n && !$g[a] && ($g[a] = !0, console.warn(a));
}
var tR = "useOptimistic", Ig = gT[tR], nR = () => {
};
function aR(n) {
  return Ig ? Ig(n) : [n, nR];
}
function iR(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && ht(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: E.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && ht(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: E.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && ht(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: E.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var lR = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function rR(n, a) {
  return dE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: CT({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: lR,
    mapRouteProperties: iR,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var sR = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((n, a) => {
      this.resolve = (r) => {
        this.status === "pending" && (this.status = "resolved", n(r));
      }, this.reject = (r) => {
        this.status === "pending" && (this.status = "rejected", a(r));
      };
    });
  }
};
function oR({
  router: n,
  flushSync: a,
  onError: r,
  unstable_useTransitions: s
}) {
  s = Z0() || s;
  let [f, d] = E.useState(n.state), [m, p] = aR(f), [h, g] = E.useState(), [v, S] = E.useState({
    isTransitioning: !1
  }), [T, R] = E.useState(), [C, N] = E.useState(), [z, H] = E.useState(), B = E.useRef(/* @__PURE__ */ new Map()), Q = E.useCallback(
    (I, { deletedFetchers: te, newErrors: F, flushSync: P, viewTransitionOpts: ae }) => {
      F && r && Object.values(F).forEach(
        (re) => r(re, {
          location: I.location,
          params: I.matches[0]?.params ?? {},
          unstable_pattern: $r(I.matches)
        })
      ), I.fetchers.forEach((re, U) => {
        re.data !== void 0 && B.current.set(U, re.data);
      }), te.forEach((re) => B.current.delete(re)), Jg(
        P === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let fe = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (Jg(
        ae == null || fe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !ae || !fe) {
        a && P ? a(() => d(I)) : s === !1 ? d(I) : E.startTransition(() => {
          s === !0 && p((re) => Wg(re, I)), d(I);
        });
        return;
      }
      if (a && P) {
        a(() => {
          C && (T?.resolve(), C.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: ae.currentLocation,
            nextLocation: ae.nextLocation
          });
        });
        let re = n.window.document.startViewTransition(() => {
          a(() => d(I));
        });
        re.finished.finally(() => {
          a(() => {
            R(void 0), N(void 0), g(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => N(re));
        return;
      }
      C ? (T?.resolve(), C.skipTransition(), H({
        state: I,
        currentLocation: ae.currentLocation,
        nextLocation: ae.nextLocation
      })) : (g(I), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: ae.currentLocation,
        nextLocation: ae.nextLocation
      }));
    },
    [
      n.window,
      a,
      C,
      T,
      s,
      p,
      r
    ]
  );
  E.useLayoutEffect(() => n.subscribe(Q), [n, Q]);
  let $ = m.initialized;
  E.useLayoutEffect(() => {
    !$ && n.state.initialized && Q(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [$, Q, n.state]), E.useEffect(() => {
    v.isTransitioning && !v.flushSync && R(new sR());
  }, [v]), E.useEffect(() => {
    if (T && h && n.window) {
      let I = h, te = T.promise, F = n.window.document.startViewTransition(async () => {
        s === !1 ? d(I) : E.startTransition(() => {
          s === !0 && p((P) => Wg(P, I)), d(I);
        }), await te;
      });
      F.finished.finally(() => {
        R(void 0), N(void 0), g(void 0), S({ isTransitioning: !1 });
      }), N(F);
    }
  }, [
    h,
    T,
    n.window,
    s,
    p
  ]), E.useEffect(() => {
    T && h && m.location.key === h.location.key && T.resolve();
  }, [T, C, m.location, h]), E.useEffect(() => {
    !v.isTransitioning && z && (g(z.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: z.currentLocation,
      nextLocation: z.nextLocation
    }), H(void 0));
  }, [v.isTransitioning, z]);
  let de = E.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (I) => n.navigate(I),
    push: (I, te, F) => n.navigate(I, {
      state: te,
      preventScrollReset: F?.preventScrollReset
    }),
    replace: (I, te, F) => n.navigate(I, {
      replace: !0,
      state: te,
      preventScrollReset: F?.preventScrollReset
    })
  }), [n]), ie = n.basename || "/", j = E.useMemo(
    () => ({
      router: n,
      navigator: de,
      static: !1,
      basename: ie,
      onError: r
    }),
    [n, de, ie, r]
  );
  return /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement(ji.Provider, { value: j }, /* @__PURE__ */ E.createElement(Jr.Provider, { value: m }, /* @__PURE__ */ E.createElement($0.Provider, { value: B.current }, /* @__PURE__ */ E.createElement(Qd.Provider, { value: v }, /* @__PURE__ */ E.createElement(
    fR,
    {
      basename: ie,
      location: m.location,
      navigationType: m.historyAction,
      navigator: de,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ E.createElement(
      uR,
      {
        routes: n.routes,
        future: n.future,
        state: m,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function Wg(n, a) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...n,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: a.navigation.state !== "idle" ? a.navigation : n.navigation,
    revalidation: a.revalidation !== "idle" ? a.revalidation : n.revalidation,
    actionData: a.navigation.state !== "submitting" ? a.actionData : n.actionData,
    fetchers: a.fetchers
  };
}
var uR = E.memo(cR);
function cR({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return kE(n, void 0, { state: r, isStatic: s, onError: o });
}
function fR({
  basename: n = "/",
  children: a = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: f = !1,
  unstable_useTransitions: d
}) {
  ze(
    !Ir(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = n.replace(/^\/*/, "/"), p = E.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: f,
      unstable_useTransitions: d,
      future: {}
    }),
    [m, o, f, d]
  );
  typeof r == "string" && (r = zn(r));
  let {
    pathname: h = "/",
    search: g = "",
    hash: v = "",
    state: S = null,
    key: T = "default",
    unstable_mask: R
  } = r, C = E.useMemo(() => {
    let N = xn(h, m);
    return N == null ? null : {
      location: {
        pathname: N,
        search: g,
        hash: v,
        state: S,
        key: T,
        unstable_mask: R
      },
      navigationType: s
    };
  }, [
    m,
    h,
    g,
    v,
    S,
    T,
    s,
    R
  ]);
  return ht(
    C != null,
    `<Router basename="${m}"> is not able to match the URL "${h}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ E.createElement(Tn.Provider, { value: p }, /* @__PURE__ */ E.createElement(cu.Provider, { children: a, value: C }));
}
var Bo = "get", Ho = "application/x-www-form-urlencoded";
function du(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function dR(n) {
  return du(n) && n.tagName.toLowerCase() === "button";
}
function hR(n) {
  return du(n) && n.tagName.toLowerCase() === "form";
}
function mR(n) {
  return du(n) && n.tagName.toLowerCase() === "input";
}
function pR(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function yR(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !pR(n);
}
var jo = null;
function gR() {
  if (jo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), jo = !1;
    } catch {
      jo = !0;
    }
  return jo;
}
var vR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Gf(n) {
  return n != null && !vR.has(n) ? (ht(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ho}"`
  ), null) : n;
}
function bR(n, a) {
  let r, s, o, f, d;
  if (hR(n)) {
    let m = n.getAttribute("action");
    s = m ? xn(m, a) : null, r = n.getAttribute("method") || Bo, o = Gf(n.getAttribute("enctype")) || Ho, f = new FormData(n);
  } else if (dR(n) || mR(n) && (n.type === "submit" || n.type === "image")) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || m.getAttribute("action");
    if (s = p ? xn(p, a) : null, r = n.getAttribute("formmethod") || m.getAttribute("method") || Bo, o = Gf(n.getAttribute("formenctype")) || Gf(m.getAttribute("enctype")) || Ho, f = new FormData(m, n), !gR()) {
      let { name: h, type: g, value: v } = n;
      if (g === "image") {
        let S = h ? `${h}.` : "";
        f.append(`${S}x`, "0"), f.append(`${S}y`, "0");
      } else h && f.append(h, v);
    }
  } else {
    if (du(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Bo, s = null, o = Ho, d = n;
  }
  return f && o === "text/plain" && (d = f, f = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: f, body: d };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Jd(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function ab(n, a, r, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return r ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && xn(o.pathname, a) === "/" ? o.pathname = `${$o(a)}/_root.${s}` : o.pathname = `${$o(o.pathname)}.${s}`, o;
}
async function SR(n, a) {
  if (n.id in a)
    return a[n.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      n.module
    );
    return a[n.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${n.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function xR(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function TR(n, a, r) {
  let s = await Promise.all(
    n.map(async (o) => {
      let f = a.routes[o.route.id];
      if (f) {
        let d = await SR(f, r);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return AR(
    s.flat(1).filter(xR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function ev(n, a, r, s, o, f) {
  let d = (p, h) => r[h] ? p.route.id !== r[h].route.id : !0, m = (p, h) => (
    // param change, /users/123 -> /users/456
    r[h].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[h].route.path?.endsWith("*") && r[h].params["*"] !== p.params["*"]
  );
  return f === "assets" ? a.filter(
    (p, h) => d(p, h) || m(p, h)
  ) : f === "data" ? a.filter((p, h) => {
    let g = s.routes[p.route.id];
    if (!g || !g.hasLoader)
      return !1;
    if (d(p, h) || m(p, h))
      return !0;
    if (p.route.shouldRevalidate) {
      let v = p.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(n, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function ER(n, a, { includeHydrateFallback: r } = {}) {
  return RR(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let f = [o.module];
      return o.clientActionModule && (f = f.concat(o.clientActionModule)), o.clientLoaderModule && (f = f.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (f = f.concat(o.hydrateFallbackModule)), o.imports && (f = f.concat(o.imports)), f;
    }).flat(1)
  );
}
function RR(n) {
  return [...new Set(n)];
}
function MR(n) {
  let a = {}, r = Object.keys(n).sort();
  for (let s of r)
    a[s] = n[s];
  return a;
}
function AR(n, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let f = JSON.stringify(MR(o));
    return r.has(f) || (r.add(f), s.push({ key: f, link: o })), s;
  }, []);
}
function Id() {
  let n = E.useContext(ji);
  return Jd(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function CR() {
  let n = E.useContext(Jr);
  return Jd(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var Wd = E.createContext(void 0);
Wd.displayName = "FrameworkContext";
function eh() {
  let n = E.useContext(Wd);
  return Jd(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function wR(n, a) {
  let r = E.useContext(Wd), [s, o] = E.useState(!1), [f, d] = E.useState(!1), { onFocus: m, onBlur: p, onMouseEnter: h, onMouseLeave: g, onTouchStart: v } = a, S = E.useRef(null);
  E.useEffect(() => {
    if (n === "render" && d(!0), n === "viewport") {
      let C = (z) => {
        z.forEach((H) => {
          d(H.isIntersecting);
        });
      }, N = new IntersectionObserver(C, { threshold: 0.5 });
      return S.current && N.observe(S.current), () => {
        N.disconnect();
      };
    }
  }, [n]), E.useEffect(() => {
    if (s) {
      let C = setTimeout(() => {
        d(!0);
      }, 100);
      return () => {
        clearTimeout(C);
      };
    }
  }, [s]);
  let T = () => {
    o(!0);
  }, R = () => {
    o(!1), d(!1);
  };
  return r ? n !== "intent" ? [f, S, {}] : [
    f,
    S,
    {
      onFocus: Dr(m, T),
      onBlur: Dr(p, R),
      onMouseEnter: Dr(h, T),
      onMouseLeave: Dr(g, R),
      onTouchStart: Dr(v, T)
    }
  ] : [!1, S, {}];
}
function Dr(n, a) {
  return (r) => {
    n && n(r), r.defaultPrevented || a(r);
  };
}
function DR({ page: n, ...a }) {
  let r = Z0(), { router: s } = Id(), o = E.useMemo(
    () => Fa(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ E.createElement(NR, { page: n, matches: o, ...a }) : /* @__PURE__ */ E.createElement(zR, { page: n, matches: o, ...a }) : null;
}
function jR(n) {
  let { manifest: a, routeModules: r } = eh(), [s, o] = E.useState([]);
  return E.useEffect(() => {
    let f = !1;
    return TR(n, a, r).then(
      (d) => {
        f || o(d);
      }
    ), () => {
      f = !0;
    };
  }, [n, a, r]), s;
}
function NR({
  page: n,
  matches: a,
  ...r
}) {
  let s = ma(), { future: o } = eh(), { basename: f } = Id(), d = E.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let m = ab(
      n,
      f,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, h = [];
    for (let g of a)
      typeof g.route.shouldRevalidate == "function" ? p = !0 : h.push(g.route.id);
    return p && h.length > 0 && m.searchParams.set("_routes", h.join(",")), [m.pathname + m.search];
  }, [
    f,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, d.map((m) => /* @__PURE__ */ E.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...r })));
}
function zR({
  page: n,
  matches: a,
  ...r
}) {
  let s = ma(), { future: o, manifest: f, routeModules: d } = eh(), { basename: m } = Id(), { loaderData: p, matches: h } = CR(), g = E.useMemo(
    () => ev(
      n,
      a,
      h,
      f,
      s,
      "data"
    ),
    [n, a, h, f, s]
  ), v = E.useMemo(
    () => ev(
      n,
      a,
      h,
      f,
      s,
      "assets"
    ),
    [n, a, h, f, s]
  ), S = E.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let C = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((H) => {
      let B = f.routes[H.route.id];
      !B || !B.hasLoader || (!g.some((Q) => Q.route.id === H.route.id) && H.route.id in p && d[H.route.id]?.shouldRevalidate || B.hasClientLoader ? N = !0 : C.add(H.route.id));
    }), C.size === 0)
      return [];
    let z = ab(
      n,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return N && C.size > 0 && z.searchParams.set(
      "_routes",
      a.filter((H) => C.has(H.route.id)).map((H) => H.route.id).join(",")
    ), [z.pathname + z.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    p,
    s,
    f,
    g,
    a,
    n,
    d
  ]), T = E.useMemo(
    () => ER(v, f),
    [v, f]
  ), R = jR(v);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, S.map((C) => /* @__PURE__ */ E.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...r })), T.map((C) => /* @__PURE__ */ E.createElement("link", { key: C, rel: "modulepreload", href: C, ...r })), R.map(({ key: C, link: N }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ E.createElement(
      "link",
      {
        key: C,
        nonce: r.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function OR(...n) {
  return (a) => {
    n.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var _R = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  _R && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var ib = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ns = E.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: f,
    replace: d,
    unstable_mask: m,
    state: p,
    target: h,
    to: g,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: T,
    ...R
  }, C) {
    let { basename: N, navigator: z, unstable_useTransitions: H } = E.useContext(Tn), B = typeof g == "string" && ib.test(g), Q = _0(g, N);
    g = Q.to;
    let $ = GE(g, { relative: o }), de = ma(), ie = null;
    if (m) {
      let re = ou(
        m,
        [],
        de.unstable_mask ? de.unstable_mask.pathname : "/",
        !0
      );
      N !== "/" && (re.pathname = re.pathname === "/" ? N : bn([N, re.pathname])), ie = z.createHref(re);
    }
    let [j, I, te] = wR(
      s,
      R
    ), F = BR(g, {
      replace: d,
      unstable_mask: m,
      state: p,
      target: h,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: T,
      unstable_useTransitions: H
    });
    function P(re) {
      a && a(re), re.defaultPrevented || F(re);
    }
    let ae = !(Q.isExternal || f), fe = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ E.createElement(
        "a",
        {
          ...R,
          ...te,
          href: (ae ? ie : void 0) || Q.absoluteURL || $,
          onClick: ae ? P : a,
          ref: OR(C, I),
          target: h,
          "data-discover": !B && r === "render" ? "true" : void 0
        }
      )
    );
    return j && !B ? /* @__PURE__ */ E.createElement(E.Fragment, null, fe, /* @__PURE__ */ E.createElement(DR, { page: $ })) : fe;
  }
);
ns.displayName = "Link";
var LR = E.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: f,
    to: d,
    viewTransition: m,
    children: p,
    ...h
  }, g) {
    let v = es(d, { relative: h.relative }), S = ma(), T = E.useContext(Jr), { navigator: R, basename: C } = E.useContext(Tn), N = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    PR(v) && m === !0, z = R.encodeLocation ? R.encodeLocation(v).pathname : v.pathname, H = S.pathname, B = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    r || (H = H.toLowerCase(), B = B ? B.toLowerCase() : null, z = z.toLowerCase()), B && C && (B = xn(B, C) || B);
    const Q = z !== "/" && z.endsWith("/") ? z.length - 1 : z.length;
    let $ = H === z || !o && H.startsWith(z) && H.charAt(Q) === "/", de = B != null && (B === z || !o && B.startsWith(z) && B.charAt(z.length) === "/"), ie = {
      isActive: $,
      isPending: de,
      isTransitioning: N
    }, j = $ ? a : void 0, I;
    typeof s == "function" ? I = s(ie) : I = [
      s,
      $ ? "active" : null,
      de ? "pending" : null,
      N ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let te = typeof f == "function" ? f(ie) : f;
    return /* @__PURE__ */ E.createElement(
      ns,
      {
        ...h,
        "aria-current": j,
        className: I,
        ref: g,
        style: te,
        to: d,
        viewTransition: m
      },
      typeof p == "function" ? p(ie) : p
    );
  }
);
LR.displayName = "NavLink";
var VR = E.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: f,
    method: d = Bo,
    action: m,
    onSubmit: p,
    relative: h,
    preventScrollReset: g,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...T
  }, R) => {
    let { unstable_useTransitions: C } = E.useContext(Tn), N = YR(), z = GR(m, { relative: h }), H = d.toLowerCase() === "get" ? "get" : "post", B = typeof m == "string" && ib.test(m), Q = ($) => {
      if (p && p($), $.defaultPrevented) return;
      $.preventDefault();
      let de = $.nativeEvent.submitter, ie = de?.getAttribute("formmethod") || d, j = () => N(de || $.currentTarget, {
        fetcherKey: a,
        method: ie,
        navigate: r,
        replace: o,
        state: f,
        relative: h,
        preventScrollReset: g,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      C && r !== !1 ? E.startTransition(() => j()) : j();
    };
    return /* @__PURE__ */ E.createElement(
      "form",
      {
        ref: R,
        method: H,
        action: z,
        onSubmit: s ? p : Q,
        ...T,
        "data-discover": !B && n === "render" ? "true" : void 0
      }
    );
  }
);
VR.displayName = "Form";
function UR(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function lb(n) {
  let a = E.useContext(ji);
  return ze(a, UR(n)), a;
}
function BR(n, {
  target: a,
  replace: r,
  unstable_mask: s,
  state: o,
  preventScrollReset: f,
  relative: d,
  viewTransition: m,
  unstable_defaultShouldRevalidate: p,
  unstable_useTransitions: h
} = {}) {
  let g = Wr(), v = ma(), S = es(n, { relative: d });
  return E.useCallback(
    (T) => {
      if (yR(T, a)) {
        T.preventDefault();
        let R = r !== void 0 ? r : Pn(v) === Pn(S), C = () => g(n, {
          replace: R,
          unstable_mask: s,
          state: o,
          preventScrollReset: f,
          relative: d,
          viewTransition: m,
          unstable_defaultShouldRevalidate: p
        });
        h ? E.startTransition(() => C()) : C();
      }
    },
    [
      v,
      g,
      S,
      r,
      s,
      o,
      a,
      n,
      f,
      d,
      m,
      p,
      h
    ]
  );
}
var HR = 0, qR = () => `__${String(++HR)}__`;
function YR() {
  let { router: n } = lb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = E.useContext(Tn), r = IE(), s = n.fetch, o = n.navigate;
  return E.useCallback(
    async (f, d = {}) => {
      let { action: m, method: p, encType: h, formData: g, body: v } = bR(
        f,
        a
      );
      if (d.navigate === !1) {
        let S = d.fetcherKey || qR();
        await s(S, r, d.action || m, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: g,
          body: v,
          formMethod: d.method || p,
          formEncType: d.encType || h,
          flushSync: d.flushSync
        });
      } else
        await o(d.action || m, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: g,
          body: v,
          formMethod: d.method || p,
          formEncType: d.encType || h,
          replace: d.replace,
          state: d.state,
          fromRouteId: r,
          flushSync: d.flushSync,
          viewTransition: d.viewTransition
        });
    },
    [s, o, a, r]
  );
}
function GR(n, { relative: a } = {}) {
  let { basename: r } = E.useContext(Tn), s = E.useContext(ha);
  ze(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), f = { ...es(n || ".", { relative: a }) }, d = ma();
  if (n == null) {
    f.search = d.search;
    let m = new URLSearchParams(f.search), p = m.getAll("index");
    if (p.some((g) => g === "")) {
      m.delete("index"), p.filter((v) => v).forEach((v) => m.append("index", v));
      let g = m.toString();
      f.search = g ? `?${g}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (f.pathname = f.pathname === "/" ? r : bn([r, f.pathname])), Pn(f);
}
function PR(n, { relative: a } = {}) {
  let r = E.useContext(Qd);
  ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = lb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = es(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let f = xn(r.currentLocation.pathname, s) || r.currentLocation.pathname, d = xn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return Zo(o.pathname, d) != null || Zo(o.pathname, f) != null;
}
class Ni extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const th = "/api/v1/extensions/nexus.audio.emotiontts";
async function rt(n, a) {
  const r = n.startsWith("http") ? n : `${th}${n}`, s = await fetch(r, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!s.ok) {
    let o = null;
    try {
      o = await s.json();
    } catch {
      o = null;
    }
    throw new Ni(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function kR(n, a, r) {
  const s = n.startsWith("http") ? n : `${th}${n}`, o = new EventSource(s);
  return o.onmessage = (f) => {
    if (f.data)
      try {
        a(JSON.parse(f.data));
      } catch {
      }
  }, o.onerror = (f) => {
    r?.(f);
  }, () => o.close();
}
async function XR() {
  return rt("/deployments");
}
async function tv(n) {
  return rt(`/deployments/${n}`);
}
async function nv(n) {
  return rt(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function rb(n, a) {
  return rt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function FR(n, a) {
  return rt(`/mappings/${n}`, {
    method: "PATCH",
    body: JSON.stringify(a)
  });
}
async function KR(n, a) {
  await rt(`/mappings/${a}`, { method: "DELETE" });
}
async function QR(n) {
  return rt(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function ZR(n, a, r = "error") {
  return rt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function $R(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return rt(`/deployments/${n}/runs${o}`);
}
async function JR(n, a) {
  return rt(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function sb(n, a) {
  return rt(`/deployments/${n}/runs/${a}`);
}
async function IR(n, a) {
  return rt(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function ob(n, a) {
  return rt(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function WR(n, a) {
  return rt(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function eM(n, a, r, s) {
  return kR(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function md(n) {
  return rt(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function tM(n, a, r, s, o) {
  const f = new FormData();
  f.append("deploymentId", n), f.append("displayName", r), f.append("kind", s), f.append("audio", a);
  const d = await fetch(`${th}/voice-assets`, {
    method: "POST",
    body: f
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function nM(n) {
  return rt(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var aM = "_93p6291", iM = "_93p6292", lM = "_93p6293", rM = "_93p6294", sM = "_93p6295", oM = "_93p6296", uM = "_93p6297", cM = "_93p6298", fM = "_93p6299", dM = "_93p629a", hM = "_93p629b", mM = "_93p629c", pM = "_93p629d", yM = "_93p629e", gM = "_93p629f", vM = "_93p629g", bM = "_93p629h", SM = "_93p629i";
function xM() {
  const { deployments: n } = ts();
  return /* @__PURE__ */ b.jsxs("main", { className: aM, children: [
    /* @__PURE__ */ b.jsxs("header", { className: iM, children: [
      /* @__PURE__ */ b.jsx("p", { className: lM, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ b.jsxs("h1", { className: rM, children: [
        "Direct your characters.",
        /* @__PURE__ */ b.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: sM, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: oM, children: [
      /* @__PURE__ */ b.jsx("h2", { className: uM, children: "Deployments" }),
      n.length === 0 ? /* @__PURE__ */ b.jsxs("div", { className: yM, children: [
        /* @__PURE__ */ b.jsx("span", { className: gM, "aria-hidden": "true", children: "◈" }),
        /* @__PURE__ */ b.jsx("p", { className: vM, children: "No deployments yet" }),
        /* @__PURE__ */ b.jsx("p", { className: bM, children: "A deployment is a named character-cast that binds voices, presets, and the runtime settings for a script. Create your first one from the host shell." }),
        /* @__PURE__ */ b.jsx("p", { className: SM, children: "Host shell → Extensions → EmotionTTS → New" })
      ] }) : /* @__PURE__ */ b.jsx("ul", { className: cM, children: n.map((a) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(ns, { to: `/${a.deploymentId}/recipe`, className: fM, children: [
        /* @__PURE__ */ b.jsx("span", { className: dM, "aria-hidden": "true", children: TM(a.displayName) }),
        /* @__PURE__ */ b.jsxs("span", { children: [
          /* @__PURE__ */ b.jsx("span", { className: hM, children: a.displayName }),
          /* @__PURE__ */ b.jsx("span", { className: mM, children: a.deploymentId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: pM, "aria-hidden": "true", children: "→" })
      ] }) }, a.deploymentId)) })
    ] })
  ] });
}
function TM(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const EM = "huggingface/IndexTeam/IndexTTS-2";
async function RM(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function MM() {
  return rt("/runtime/health");
}
async function AM() {
  await rt("/runtime/start", { method: "POST" });
}
async function CM() {
  return rt("/runtime/stop", { method: "POST" });
}
async function wM() {
  await rt("/runtime/restart", { method: "POST" });
}
function DM(n) {
  switch (n) {
    case "not_installed":
      return "Not installed";
    case "installing":
      return "Installing";
    case "starting":
      return "Starting";
    case "ready":
      return "Ready";
    case "running":
      return "Running";
    case "stopping":
      return "Stopping";
    case "failed":
      return "Failed";
    case "stopped":
      return "Stopped";
  }
}
var jM = "g5r6d10", NM = "g5r6d11", zM = "g5r6d12", jr = "g5r6d13", Nr = "g5r6d14", OM = "g5r6d15", _M = "g5r6d16", LM = "g5r6d17", $t = "g5r6d18", Xa = "g5r6d19", Jo = "g5r6d1b g5r6d1a", as = "g5r6d1c g5r6d1a", ub = "g5r6d1d g5r6d1a", cb = "g5r6d1e", hu = "g5r6d1f", pd = "g5r6d1g", VM = "g5r6d1h", UM = "g5r6d1i", Pa = "g5r6d1j", fb = "g5r6d1k", db = "g5r6d1l g5r6d1k", nh = "g5r6d1m g5r6d1k", ah = "g5r6d1n g5r6d1k";
const BM = 4e3;
function HM({ deployment: n }) {
  const [a, r] = E.useState(null), [s, o] = E.useState(null), [f, d] = E.useState(!1);
  E.useEffect(() => {
    let C = !1;
    const N = async () => {
      try {
        const H = await MM();
        C || (r(H), o(null));
      } catch (H) {
        C || o(zr(H));
      }
    };
    N();
    const z = setInterval(N, BM);
    return () => {
      C = !0, clearInterval(z);
    };
  }, []);
  const m = E.useCallback(async () => {
    d(!0), o(null);
    try {
      await AM();
    } catch (C) {
      o(zr(C));
    } finally {
      d(!1);
    }
  }, []), p = E.useCallback(async () => {
    d(!0);
    try {
      await CM();
    } catch (C) {
      o(zr(C));
    } finally {
      d(!1);
    }
  }, []), h = E.useCallback(async () => {
    d(!0);
    try {
      await wM();
    } catch (C) {
      o(zr(C));
    } finally {
      d(!1);
    }
  }, []), g = E.useCallback(async () => {
    d(!0);
    try {
      await RM(EM);
    } catch (C) {
      o(zr(C));
    } finally {
      d(!1);
    }
  }, []), v = a?.badge ?? "not_installed", S = v === "stopped" || v === "not_installed", T = v === "ready" || v === "running" || v === "starting", R = s?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { className: Xa, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ b.jsx("span", { className: $t, children: "Runtime" }),
    /* @__PURE__ */ b.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ b.jsx("span", { className: $t, children: "Badge" }),
    /* @__PURE__ */ b.jsx("span", { className: qM(v), children: DM(v) }),
    a && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Uptime" }),
      /* @__PURE__ */ b.jsx("span", { children: YM(a.uptimeSeconds) }),
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "VRAM" }),
      /* @__PURE__ */ b.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    S && /* @__PURE__ */ b.jsx("button", { type: "button", className: Jo, disabled: f, onClick: m, children: "Install / Start runtime" }),
    T && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("button", { type: "button", className: ub, disabled: f, onClick: p, children: "Stop backend" }),
      /* @__PURE__ */ b.jsx("button", { type: "button", className: as, disabled: f, onClick: h, children: "Restart" })
    ] }),
    R && /* @__PURE__ */ b.jsx("button", { type: "button", className: Jo, disabled: f, onClick: g, children: "Download IndexTTS-2 model" }),
    s && !R && /* @__PURE__ */ b.jsx("span", { className: hu, children: s })
  ] });
}
function qM(n) {
  switch (n) {
    case "ready":
    case "running":
      return db;
    case "starting":
    case "stopping":
    case "installing":
      return nh;
    case "failed":
      return ah;
    default:
      return fb;
  }
}
function YM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function zr(n) {
  return n instanceof Ni || n instanceof Error ? n.message : "unknown error";
}
async function GM(n) {
  return rt(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function PM(n, a, r) {
  return rt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: r })
  });
}
async function kM(n) {
  await rt(`/presets/${n}`, { method: "DELETE" });
}
var XM = "wfqeb50", FM = "wfqeb51", KM = "wfqeb52", QM = "wfqeb53", ZM = "wfqeb54", $M = "wfqeb55 wfqeb54", JM = "wfqeb56", IM = "wfqeb57", hb = "wfqeb58", mb = "wfqeb59", pb = "wfqeb5a", WM = "wfqeb5b", eA = "wfqeb5c", av = "wfqeb5d", tA = "wfqeb5e wfqeb5d", nA = "wfqeb5f wfqeb5d", aA = "wfqeb5g", iA = "wfqeb5h", Pf = "wfqeb5i", lA = "wfqeb5j", rA = "wfqeb5k", sA = "wfqeb5l", oA = "wfqeb5m";
const ih = E.createContext({});
function lh(n) {
  const a = E.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const uA = typeof window < "u", yb = uA ? E.useLayoutEffect : E.useEffect, mu = /* @__PURE__ */ E.createContext(null);
function rh(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function Io(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const kn = (n, a, r) => r > a ? a : r < n ? n : r;
function iv(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let is = () => {
}, Di = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (is = (n, a, r) => {
  !n && typeof console < "u" && console.warn(iv(a, r));
}, Di = (n, a, r) => {
  if (!n)
    throw new Error(iv(a, r));
});
const $a = {}, gb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function vb(n) {
  return typeof n == "object" && n !== null;
}
const bb = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Sb(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Sn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, cA = (n, a) => (r) => a(n(r)), ls = (...n) => n.reduce(cA), Fr = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class sh {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return rh(this.subscriptions, a), () => Io(this.subscriptions, a);
  }
  notify(a, r, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, r, s);
      else
        for (let f = 0; f < o; f++) {
          const d = this.subscriptions[f];
          d && d(a, r, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Jt = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, vn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function xb(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Tb = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, fA = 1e-7, dA = 12;
function hA(n, a, r, s, o) {
  let f, d, m = 0;
  do
    d = a + (r - a) / 2, f = Tb(d, s, o) - n, f > 0 ? r = d : a = d;
  while (Math.abs(f) > fA && ++m < dA);
  return d;
}
function rs(n, a, r, s) {
  if (n === a && r === s)
    return Sn;
  const o = (f) => hA(f, 0, 1, n, r);
  return (f) => f === 0 || f === 1 ? f : Tb(o(f), a, s);
}
const Eb = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Rb = (n) => (a) => 1 - n(1 - a), Mb = /* @__PURE__ */ rs(0.33, 1.53, 0.69, 0.99), oh = /* @__PURE__ */ Rb(Mb), Ab = /* @__PURE__ */ Eb(oh), Cb = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * oh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), uh = (n) => 1 - Math.sin(Math.acos(n)), wb = Rb(uh), Db = Eb(uh), mA = /* @__PURE__ */ rs(0.42, 0, 1, 1), pA = /* @__PURE__ */ rs(0, 0, 0.58, 1), jb = /* @__PURE__ */ rs(0.42, 0, 0.58, 1), yA = (n) => Array.isArray(n) && typeof n[0] != "number", Nb = (n) => Array.isArray(n) && typeof n[0] == "number", lv = {
  linear: Sn,
  easeIn: mA,
  easeInOut: jb,
  easeOut: pA,
  circIn: uh,
  circInOut: Db,
  circOut: wb,
  backIn: oh,
  backInOut: Ab,
  backOut: Mb,
  anticipate: Cb
}, gA = (n) => typeof n == "string", rv = (n) => {
  if (Nb(n)) {
    Di(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return rs(a, r, s, o);
  } else if (gA(n))
    return Di(lv[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), lv[n];
  return n;
}, No = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function vA(n, a) {
  let r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, f = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function p(g) {
    d.has(g) && (h.schedule(g), n()), g(m);
  }
  const h = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (g, v = !1, S = !1) => {
      const R = S && o ? r : s;
      return v && d.add(g), R.add(g), g;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (g) => {
      s.delete(g), d.delete(g);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (g) => {
      if (m = g, o) {
        f = !0;
        return;
      }
      o = !0;
      const v = r;
      r = s, s = v, r.forEach(p), r.clear(), o = !1, f && (f = !1, h.process(g));
    }
  };
  return h;
}
const bA = 40;
function zb(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, f = () => r = !0, d = No.reduce((B, Q) => (B[Q] = vA(f), B), {}), { setup: m, read: p, resolveKeyframes: h, preUpdate: g, update: v, preRender: S, render: T, postRender: R } = d, C = () => {
    const B = $a.useManualTiming, Q = B ? o.timestamp : performance.now();
    r = !1, B || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(Q - o.timestamp, bA), 1)), o.timestamp = Q, o.isProcessing = !0, m.process(o), p.process(o), h.process(o), g.process(o), v.process(o), S.process(o), T.process(o), R.process(o), o.isProcessing = !1, r && a && (s = !1, n(C));
  }, N = () => {
    r = !0, s = !0, o.isProcessing || n(C);
  };
  return { schedule: No.reduce((B, Q) => {
    const $ = d[Q];
    return B[Q] = (de, ie = !1, j = !1) => (r || N(), $.schedule(de, ie, j)), B;
  }, {}), cancel: (B) => {
    for (let Q = 0; Q < No.length; Q++)
      d[No[Q]].cancel(B);
  }, state: o, steps: d };
}
const { schedule: Ie, cancel: Ja, state: zt, steps: kf } = /* @__PURE__ */ zb(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Sn, !0);
let qo;
function SA() {
  qo = void 0;
}
const Yt = {
  now: () => (qo === void 0 && Yt.set(zt.isProcessing || $a.useManualTiming ? zt.timestamp : performance.now()), qo),
  set: (n) => {
    qo = n, queueMicrotask(SA);
  }
}, Ob = (n) => (a) => typeof a == "string" && a.startsWith(n), _b = /* @__PURE__ */ Ob("--"), xA = /* @__PURE__ */ Ob("var(--"), ch = (n) => xA(n) ? TA.test(n.split("/*")[0].trim()) : !1, TA = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function sv(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Dl = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, Kr = {
  ...Dl,
  transform: (n) => kn(0, 1, n)
}, zo = {
  ...Dl,
  default: 1
}, qr = (n) => Math.round(n * 1e5) / 1e5, fh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function EA(n) {
  return n == null;
}
const RA = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, dh = (n, a) => (r) => !!(typeof r == "string" && RA.test(r) && r.startsWith(n) || a && !EA(r) && Object.prototype.hasOwnProperty.call(r, a)), Lb = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, f, d, m] = s.match(fh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(f),
    [r]: parseFloat(d),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, MA = (n) => kn(0, 255, n), Xf = {
  ...Dl,
  transform: (n) => Math.round(MA(n))
}, Mi = {
  test: /* @__PURE__ */ dh("rgb", "red"),
  parse: /* @__PURE__ */ Lb("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + Xf.transform(n) + ", " + Xf.transform(a) + ", " + Xf.transform(r) + ", " + qr(Kr.transform(s)) + ")"
};
function AA(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const yd = {
  test: /* @__PURE__ */ dh("#"),
  parse: AA,
  transform: Mi.transform
}, ss = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), ka = /* @__PURE__ */ ss("deg"), Gn = /* @__PURE__ */ ss("%"), ye = /* @__PURE__ */ ss("px"), CA = /* @__PURE__ */ ss("vh"), wA = /* @__PURE__ */ ss("vw"), ov = {
  ...Gn,
  parse: (n) => Gn.parse(n) / 100,
  transform: (n) => Gn.transform(n * 100)
}, Tl = {
  test: /* @__PURE__ */ dh("hsl", "hue"),
  parse: /* @__PURE__ */ Lb("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Gn.transform(qr(a)) + ", " + Gn.transform(qr(r)) + ", " + qr(Kr.transform(s)) + ")"
}, xt = {
  test: (n) => Mi.test(n) || yd.test(n) || Tl.test(n),
  parse: (n) => Mi.test(n) ? Mi.parse(n) : Tl.test(n) ? Tl.parse(n) : yd.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Mi.transform(n) : Tl.transform(n),
  getAnimatableNone: (n) => {
    const a = xt.parse(n);
    return a.alpha = 0, xt.transform(a);
  }
}, DA = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function jA(n) {
  return isNaN(n) && typeof n == "string" && (n.match(fh)?.length || 0) + (n.match(DA)?.length || 0) > 0;
}
const Vb = "number", Ub = "color", NA = "var", zA = "var(", uv = "${}", OA = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Cl(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let f = 0;
  const m = a.replace(OA, (p) => (xt.test(p) ? (s.color.push(f), o.push(Ub), r.push(xt.parse(p))) : p.startsWith(zA) ? (s.var.push(f), o.push(NA), r.push(p)) : (s.number.push(f), o.push(Vb), r.push(parseFloat(p))), ++f, uv)).split(uv);
  return { values: r, split: m, indexes: s, types: o };
}
function _A(n) {
  return Cl(n).values;
}
function Bb({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let f = 0; f < r; f++)
      if (o += n[f], s[f] !== void 0) {
        const d = a[f];
        d === Vb ? o += qr(s[f]) : d === Ub ? o += xt.transform(s[f]) : o += s[f];
      }
    return o;
  };
}
function LA(n) {
  return Bb(Cl(n));
}
const VA = (n) => typeof n == "number" ? 0 : xt.test(n) ? xt.getAnimatableNone(n) : n, UA = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : VA(n);
function BA(n) {
  const a = Cl(n);
  return Bb(a)(a.values.map((s, o) => UA(s, a.split[o])));
}
const Nn = {
  test: jA,
  parse: _A,
  createTransformer: LA,
  getAnimatableNone: BA
};
function Ff(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function HA({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, f = 0, d = 0;
  if (!a)
    o = f = d = r;
  else {
    const m = r < 0.5 ? r * (1 + a) : r + a - r * a, p = 2 * r - m;
    o = Ff(p, m, n + 1 / 3), f = Ff(p, m, n), d = Ff(p, m, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(f * 255),
    blue: Math.round(d * 255),
    alpha: s
  };
}
function Wo(n, a) {
  return (r) => r > 0 ? a : n;
}
const at = (n, a, r) => n + (a - n) * r, Kf = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, qA = [yd, Mi, Tl], YA = (n) => qA.find((a) => a.test(n));
function cv(n) {
  const a = YA(n);
  if (is(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === Tl && (r = HA(r)), r;
}
const fv = (n, a) => {
  const r = cv(n), s = cv(a);
  if (!r || !s)
    return Wo(n, a);
  const o = { ...r };
  return (f) => (o.red = Kf(r.red, s.red, f), o.green = Kf(r.green, s.green, f), o.blue = Kf(r.blue, s.blue, f), o.alpha = at(r.alpha, s.alpha, f), Mi.transform(o));
}, gd = /* @__PURE__ */ new Set(["none", "hidden"]);
function GA(n, a) {
  return gd.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function PA(n, a) {
  return (r) => at(n, a, r);
}
function hh(n) {
  return typeof n == "number" ? PA : typeof n == "string" ? ch(n) ? Wo : xt.test(n) ? fv : FA : Array.isArray(n) ? Hb : typeof n == "object" ? xt.test(n) ? fv : kA : Wo;
}
function Hb(n, a) {
  const r = [...n], s = r.length, o = n.map((f, d) => hh(f)(f, a[d]));
  return (f) => {
    for (let d = 0; d < s; d++)
      r[d] = o[d](f);
    return r;
  };
}
function kA(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = hh(n[o])(n[o], a[o]));
  return (o) => {
    for (const f in s)
      r[f] = s[f](o);
    return r;
  };
}
function XA(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const f = a.types[o], d = n.indexes[f][s[f]], m = n.values[d] ?? 0;
    r[o] = m, s[f]++;
  }
  return r;
}
const FA = (n, a) => {
  const r = Nn.createTransformer(a), s = Cl(n), o = Cl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? gd.has(n) && !o.values.length || gd.has(a) && !s.values.length ? GA(n, a) : ls(Hb(XA(s, o), o.values), r) : (is(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Wo(n, a));
};
function qb(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? at(n, a, r) : hh(n)(n, a);
}
const KA = (n) => {
  const a = ({ timestamp: r }) => n(r);
  return {
    start: (r = !0) => Ie.update(a, r),
    stop: () => Ja(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => zt.isProcessing ? zt.timestamp : Yt.now()
  };
}, Yb = (n, a, r = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / r), 2);
  for (let f = 0; f < o; f++)
    s += Math.round(n(f / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, eu = 2e4;
function mh(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < eu; )
    a += r, s = n.next(a);
  return a >= eu ? 1 / 0 : a;
}
function QA(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(mh(s), eu);
  return {
    type: "keyframes",
    ease: (f) => s.next(o * f).value / a,
    duration: /* @__PURE__ */ vn(o)
  };
}
const st = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function vd(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const ZA = 12;
function $A(n, a, r) {
  let s = r;
  for (let o = 1; o < ZA; o++)
    s = s - n(s) / a(s);
  return s;
}
const Qf = 1e-3;
function JA({ duration: n = st.duration, bounce: a = st.bounce, velocity: r = st.velocity, mass: s = st.mass }) {
  let o, f;
  is(n <= /* @__PURE__ */ Jt(st.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = kn(st.minDamping, st.maxDamping, d), n = kn(st.minDuration, st.maxDuration, /* @__PURE__ */ vn(n)), d < 1 ? (o = (h) => {
    const g = h * d, v = g * n, S = g - r, T = vd(h, d), R = Math.exp(-v);
    return Qf - S / T * R;
  }, f = (h) => {
    const v = h * d * n, S = v * r + r, T = Math.pow(d, 2) * Math.pow(h, 2) * n, R = Math.exp(-v), C = vd(Math.pow(h, 2), d);
    return (-o(h) + Qf > 0 ? -1 : 1) * ((S - T) * R) / C;
  }) : (o = (h) => {
    const g = Math.exp(-h * n), v = (h - r) * n + 1;
    return -Qf + g * v;
  }, f = (h) => {
    const g = Math.exp(-h * n), v = (r - h) * (n * n);
    return g * v;
  });
  const m = 5 / n, p = $A(o, f, m);
  if (n = /* @__PURE__ */ Jt(n), isNaN(p))
    return {
      stiffness: st.stiffness,
      damping: st.damping,
      duration: n
    };
  {
    const h = Math.pow(p, 2) * s;
    return {
      stiffness: h,
      damping: d * 2 * Math.sqrt(s * h),
      duration: n
    };
  }
}
const IA = ["duration", "bounce"], WA = ["stiffness", "damping", "mass"];
function dv(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function eC(n) {
  let a = {
    velocity: st.velocity,
    stiffness: st.stiffness,
    damping: st.damping,
    mass: st.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!dv(n, WA) && dv(n, IA))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, f = 2 * kn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: st.mass,
        stiffness: o,
        damping: f
      };
    } else {
      const r = JA({ ...n, velocity: 0 });
      a = {
        ...a,
        ...r,
        mass: st.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function tu(n = st.visualDuration, a = st.bounce) {
  const r = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = r;
  const f = r.keyframes[0], d = r.keyframes[r.keyframes.length - 1], m = { done: !1, value: f }, { stiffness: p, damping: h, mass: g, duration: v, velocity: S, isResolvedFromDuration: T } = eC({
    ...r,
    velocity: -/* @__PURE__ */ vn(r.velocity || 0)
  }), R = S || 0, C = h / (2 * Math.sqrt(p * g)), N = d - f, z = /* @__PURE__ */ vn(Math.sqrt(p / g)), H = Math.abs(N) < 5;
  s || (s = H ? st.restSpeed.granular : st.restSpeed.default), o || (o = H ? st.restDelta.granular : st.restDelta.default);
  let B, Q, $, de, ie, j;
  if (C < 1)
    $ = vd(z, C), de = (R + C * z * N) / $, B = (te) => {
      const F = Math.exp(-C * z * te);
      return d - F * (de * Math.sin($ * te) + N * Math.cos($ * te));
    }, ie = C * z * de + N * $, j = C * z * N - de * $, Q = (te) => Math.exp(-C * z * te) * (ie * Math.sin($ * te) + j * Math.cos($ * te));
  else if (C === 1) {
    B = (F) => d - Math.exp(-z * F) * (N + (R + z * N) * F);
    const te = R + z * N;
    Q = (F) => Math.exp(-z * F) * (z * te * F - R);
  } else {
    const te = z * Math.sqrt(C * C - 1);
    B = (fe) => {
      const re = Math.exp(-C * z * fe), U = Math.min(te * fe, 300);
      return d - re * ((R + C * z * N) * Math.sinh(U) + te * N * Math.cosh(U)) / te;
    };
    const F = (R + C * z * N) / te, P = C * z * F - N * te, ae = C * z * N - F * te;
    Q = (fe) => {
      const re = Math.exp(-C * z * fe), U = Math.min(te * fe, 300);
      return re * (P * Math.sinh(U) + ae * Math.cosh(U));
    };
  }
  const I = {
    calculatedDuration: T && v || null,
    velocity: (te) => /* @__PURE__ */ Jt(Q(te)),
    next: (te) => {
      if (!T && C < 1) {
        const P = Math.exp(-C * z * te), ae = Math.sin($ * te), fe = Math.cos($ * te), re = d - P * (de * ae + N * fe), U = /* @__PURE__ */ Jt(P * (ie * ae + j * fe));
        return m.done = Math.abs(U) <= s && Math.abs(d - re) <= o, m.value = m.done ? d : re, m;
      }
      const F = B(te);
      if (T)
        m.done = te >= v;
      else {
        const P = /* @__PURE__ */ Jt(Q(te));
        m.done = Math.abs(P) <= s && Math.abs(d - F) <= o;
      }
      return m.value = m.done ? d : F, m;
    },
    toString: () => {
      const te = Math.min(mh(I), eu), F = Yb((P) => I.next(te * P).value, te, 30);
      return te + "ms " + F;
    },
    toTransition: () => {
    }
  };
  return I;
}
tu.applyToOptions = (n) => {
  const a = QA(n, 100, tu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Jt(a.duration), n.type = "keyframes", n;
};
const tC = 5;
function Gb(n, a, r) {
  const s = Math.max(a - tC, 0);
  return xb(r - n(s), a - s);
}
function bd({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: f = 500, modifyTarget: d, min: m, max: p, restDelta: h = 0.5, restSpeed: g }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, T = (j) => m !== void 0 && j < m || p !== void 0 && j > p, R = (j) => m === void 0 ? p : p === void 0 || Math.abs(m - j) < Math.abs(p - j) ? m : p;
  let C = r * a;
  const N = v + C, z = d === void 0 ? N : d(N);
  z !== N && (C = z - v);
  const H = (j) => -C * Math.exp(-j / s), B = (j) => z + H(j), Q = (j) => {
    const I = H(j), te = B(j);
    S.done = Math.abs(I) <= h, S.value = S.done ? z : te;
  };
  let $, de;
  const ie = (j) => {
    T(S.value) && ($ = j, de = tu({
      keyframes: [S.value, R(S.value)],
      velocity: Gb(B, j, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: f,
      restDelta: h,
      restSpeed: g
    }));
  };
  return ie(0), {
    calculatedDuration: null,
    next: (j) => {
      let I = !1;
      return !de && $ === void 0 && (I = !0, Q(j), ie(j)), $ !== void 0 && j >= $ ? de.next(j - $) : (!I && Q(j), S);
    }
  };
}
function nC(n, a, r) {
  const s = [], o = r || $a.mix || qb, f = n.length - 1;
  for (let d = 0; d < f; d++) {
    let m = o(n[d], n[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || Sn : a;
      m = ls(p, m);
    }
    s.push(m);
  }
  return s;
}
function aC(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const f = n.length;
  if (Di(f === a.length, "Both input and output ranges must be the same length", "range-length"), f === 1)
    return () => a[0];
  if (f === 2 && a[0] === a[1])
    return () => a[1];
  const d = n[0] === n[1];
  n[0] > n[f - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const m = nC(a, s, o), p = m.length, h = (g) => {
    if (d && g < n[0])
      return a[0];
    let v = 0;
    if (p > 1)
      for (; v < n.length - 2 && !(g < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ Fr(n[v], n[v + 1], g);
    return m[v](S);
  };
  return r ? (g) => h(kn(n[0], n[f - 1], g)) : h;
}
function iC(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Fr(0, a, s);
    n.push(at(r, 1, o));
  }
}
function lC(n) {
  const a = [0];
  return iC(a, n.length - 1), a;
}
function rC(n, a) {
  return n.map((r) => r * a);
}
function sC(n, a) {
  return n.map(() => a || jb).splice(0, n.length - 1);
}
function Yr({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = yA(s) ? s.map(rv) : rv(s), f = {
    done: !1,
    value: a[0]
  }, d = rC(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : lC(a),
    n
  ), m = aC(d, a, {
    ease: Array.isArray(o) ? o : sC(a, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (f.value = m(p), f.done = p >= n, f)
  };
}
const oC = (n) => n !== null;
function pu(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const f = n.filter(oC), m = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : f.length - 1;
  return !m || s === void 0 ? f[m] : s;
}
const uC = {
  decay: bd,
  inertia: bd,
  tween: Yr,
  keyframes: Yr,
  spring: tu
};
function Pb(n) {
  typeof n.type == "string" && (n.type = uC[n.type]);
}
class ph {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((a) => {
      this.resolve = a;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(a, r) {
    return this.finished.then(a, r);
  }
}
const cC = (n) => n / 100;
class nu extends ph {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: r } = this.options;
      r && r.updatedAt !== Yt.now() && this.tick(Yt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    Pb(a);
    const { type: r = Yr, repeat: s = 0, repeatDelay: o = 0, repeatType: f, velocity: d = 0 } = a;
    let { keyframes: m } = a;
    const p = r || Yr;
    p !== Yr && typeof m[0] != "number" && (this.mixKeyframes = ls(cC, qb(m[0], m[1])), m = [0, 100]);
    const h = p({ ...a, keyframes: m });
    f === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -d
    })), h.calculatedDuration === null && (h.calculatedDuration = mh(h));
    const { calculatedDuration: g } = h;
    this.calculatedDuration = g, this.resolvedDuration = g + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = h;
  }
  updateTime(a) {
    const r = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(a, r = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: f, mirroredGenerator: d, resolvedDuration: m, calculatedDuration: p } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: h = 0, keyframes: g, repeat: v, repeatType: S, repeatDelay: T, type: R, onUpdate: C, finalKeyframe: N } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const z = this.currentTime - h * (this.playbackSpeed >= 0 ? 1 : -1), H = this.playbackSpeed >= 0 ? z < 0 : z > o;
    this.currentTime = Math.max(z, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let B = this.currentTime, Q = s;
    if (v) {
      const j = Math.min(this.currentTime, o) / m;
      let I = Math.floor(j), te = j % 1;
      !te && j >= 1 && (te = 1), te === 1 && I--, I = Math.min(I, v + 1), !!(I % 2) && (S === "reverse" ? (te = 1 - te, T && (te -= T / m)) : S === "mirror" && (Q = d)), B = kn(0, 1, te) * m;
    }
    let $;
    H ? (this.delayState.value = g[0], $ = this.delayState) : $ = Q.next(B), f && !H && ($.value = f($.value));
    let { done: de } = $;
    !H && p !== null && (de = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ie = this.holdTime === null && (this.state === "finished" || this.state === "running" && de);
    return ie && R !== bd && ($.value = pu(g, this.options, N, this.speed)), C && C($.value), ie && this.finish(), $;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, r) {
    return this.finished.then(a, r);
  }
  get duration() {
    return /* @__PURE__ */ vn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ vn(a);
  }
  get time() {
    return /* @__PURE__ */ vn(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Jt(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const a = this.currentTime;
    if (a <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(a);
    const r = this.generator.next(a).value;
    return Gb((s) => this.generator.next(s).value, a, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const r = this.playbackSpeed !== a;
    r && this.driver && this.updateTime(Yt.now()), this.playbackSpeed = a, r && this.driver && (this.time = /* @__PURE__ */ vn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = KA, startTime: r } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = r ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Yt.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(a) {
    return this.startTime = 0, this.tick(a, !0);
  }
  attachTimeline(a) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), a.observe(this);
  }
}
function fC(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Ai = (n) => n * 180 / Math.PI, Sd = (n) => {
  const a = Ai(Math.atan2(n[1], n[0]));
  return xd(a);
}, dC = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Sd,
  rotateZ: Sd,
  skewX: (n) => Ai(Math.atan(n[1])),
  skewY: (n) => Ai(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, xd = (n) => (n = n % 360, n < 0 && (n += 360), n), hv = Sd, mv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), pv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), hC = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: mv,
  scaleY: pv,
  scale: (n) => (mv(n) + pv(n)) / 2,
  rotateX: (n) => xd(Ai(Math.atan2(n[6], n[5]))),
  rotateY: (n) => xd(Ai(Math.atan2(-n[2], n[0]))),
  rotateZ: hv,
  rotate: hv,
  skewX: (n) => Ai(Math.atan(n[4])),
  skewY: (n) => Ai(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Td(n) {
  return n.includes("scale") ? 1 : 0;
}
function Ed(n, a) {
  if (!n || n === "none")
    return Td(a);
  const r = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (r)
    s = hC, o = r;
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = dC, o = m;
  }
  if (!o)
    return Td(a);
  const f = s[a], d = o[1].split(",").map(pC);
  return typeof f == "function" ? f(d) : d[f];
}
const mC = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Ed(r, a);
};
function pC(n) {
  return parseFloat(n.trim());
}
const jl = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Nl = new Set(jl), yv = (n) => n === Dl || n === ye, yC = /* @__PURE__ */ new Set(["x", "y", "z"]), gC = jl.filter((n) => !yC.has(n));
function vC(n) {
  const a = [];
  return gC.forEach((r) => {
    const s = n.getValue(r);
    s !== void 0 && (a.push([r, s.get()]), s.set(r.startsWith("scale") ? 1 : 0));
  }), a;
}
const Za = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: a = "0", paddingRight: r = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(r);
  },
  height: ({ y: n }, { paddingTop: a = "0", paddingBottom: r = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(r);
  },
  top: (n, { top: a }) => parseFloat(a),
  left: (n, { left: a }) => parseFloat(a),
  bottom: ({ y: n }, { top: a }) => parseFloat(a) + (n.max - n.min),
  right: ({ x: n }, { left: a }) => parseFloat(a) + (n.max - n.min),
  // Transform
  x: (n, { transform: a }) => Ed(a, "x"),
  y: (n, { transform: a }) => Ed(a, "y")
};
Za.translateX = Za.x;
Za.translateY = Za.y;
const Ci = /* @__PURE__ */ new Set();
let Rd = !1, Md = !1, Ad = !1;
function kb() {
  if (Md) {
    const n = Array.from(Ci).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = vC(s);
      o.length && (r.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = r.get(s);
      o && o.forEach(([f, d]) => {
        s.getValue(f)?.set(d);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Md = !1, Rd = !1, Ci.forEach((n) => n.complete(Ad)), Ci.clear();
}
function Xb() {
  Ci.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Md = !0);
  });
}
function bC() {
  Ad = !0, Xb(), kb(), Ad = !1;
}
class yh {
  constructor(a, r, s, o, f, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = f, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Ci.add(this), Rd || (Rd = !0, Ie.read(Xb), Ie.resolveKeyframes(kb))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: r, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const f = o?.get(), d = a[a.length - 1];
      if (f !== void 0)
        a[0] = f;
      else if (s && r) {
        const m = s.readValue(r, d);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = d), o && f === void 0 && o.set(a[0]);
    }
    fC(a);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(a = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Ci.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Ci.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const SC = (n) => n.startsWith("--");
function Fb(n, a, r) {
  SC(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const xC = {};
function Kb(n, a) {
  const r = /* @__PURE__ */ Sb(n);
  return () => xC[a] ?? r();
}
const TC = /* @__PURE__ */ Kb(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Qb = /* @__PURE__ */ Kb(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Br = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, gv = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Br([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Br([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Br([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Br([0.33, 1.53, 0.69, 0.99])
};
function Zb(n, a) {
  if (n)
    return typeof n == "function" ? Qb() ? Yb(n, a) : "ease-out" : Nb(n) ? Br(n) : Array.isArray(n) ? n.map((r) => Zb(r, a) || gv.easeOut) : gv[n];
}
function EC(n, a, r, { delay: s = 0, duration: o = 300, repeat: f = 0, repeatType: d = "loop", ease: m = "easeOut", times: p } = {}, h = void 0) {
  const g = {
    [a]: r
  };
  p && (g.offset = p);
  const v = Zb(m, o);
  Array.isArray(v) && (g.easing = v);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: f + 1,
    direction: d === "reverse" ? "alternate" : "normal"
  };
  return h && (S.pseudoElement = h), n.animate(g, S);
}
function $b(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function RC({ type: n, ...a }) {
  return $b(n) && Qb() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class Jb extends ph {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: f, allowFlatten: d = !1, finalKeyframe: m, onComplete: p } = a;
    this.isPseudoElement = !!f, this.allowFlatten = d, this.options = a, Di(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const h = RC(a);
    this.animation = EC(r, s, o, h, f), h.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !f) {
        const g = pu(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Fb(r, s, g), this.animation.cancel();
      }
      p?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: a } = this;
    a === "idle" || a === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const a = this.options?.element;
    !this.isPseudoElement && a?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const a = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ vn(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ vn(a);
  }
  get time() {
    return /* @__PURE__ */ vn(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const r = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Jt(a), r && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(a) {
    a < 0 && (this.finishedTime = null), this.animation.playbackRate = a;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(a) {
    this.manualStartTime = this.animation.startTime = a;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: a, rangeStart: r, rangeEnd: s, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && TC() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Sn) : o(this);
  }
}
const Ib = {
  anticipate: Cb,
  backInOut: Ab,
  circInOut: Db
};
function MC(n) {
  return n in Ib;
}
function AC(n) {
  typeof n.ease == "string" && MC(n.ease) && (n.ease = Ib[n.ease]);
}
const Zf = 10;
class CC extends Jb {
  constructor(a) {
    AC(a), Pb(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(a) {
    const { motionValue: r, onUpdate: s, onComplete: o, element: f, ...d } = this.options;
    if (!r)
      return;
    if (a !== void 0) {
      r.set(a);
      return;
    }
    const m = new nu({
      ...d,
      autoplay: !1
    }), p = Math.max(Zf, Yt.now() - this.startTime), h = kn(0, Zf, p - Zf), g = m.sample(p).value, { name: v } = this.options;
    f && v && Fb(f, v, g), r.setWithVelocity(m.sample(Math.max(0, p - h)).value, g, h), m.stop();
  }
}
const vv = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Nn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function wC(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function DC(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const f = n[n.length - 1], d = vv(o, a), m = vv(f, a);
  return is(d === m, `You are trying to animate ${a} from "${o}" to "${f}". "${d ? f : o}" is not an animatable value.`, "value-not-animatable"), !d || !m ? !1 : wC(n) || (r === "spring" || $b(r)) && s;
}
function Cd(n) {
  n.duration = 0, n.type = "keyframes";
}
const Wb = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), jC = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function NC(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && jC.test(n[a]))
      return !0;
  return !1;
}
const zC = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), OC = /* @__PURE__ */ Sb(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function _C(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: f, type: d, keyframes: m } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: h, transformTemplate: g } = a.owner.getProps();
  return OC() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Wb.has(r) || zC.has(r) && NC(m)) && (r !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !h && !s && o !== "mirror" && f !== 0 && d !== "inertia";
}
const LC = 40;
class VC extends ph {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: f = 0, repeatType: d = "loop", keyframes: m, name: p, motionValue: h, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Yt.now();
    const S = {
      autoplay: a,
      delay: r,
      type: s,
      repeat: o,
      repeatDelay: f,
      repeatType: d,
      name: p,
      motionValue: h,
      element: g,
      ...v
    }, T = g?.KeyframeResolver || yh;
    this.keyframeResolver = new T(m, (R, C, N) => this.onKeyframesResolved(R, C, S, !N), p, h, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: f, type: d, velocity: m, delay: p, isHandoff: h, onUpdate: g } = s;
    this.resolvedAt = Yt.now();
    let v = !0;
    DC(a, f, d, m) || (v = !1, ($a.instantAnimations || !p) && g?.(pu(a, s, r)), a[0] = a[a.length - 1], Cd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > LC ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, R = v && !h && _C(T), C = T.motionValue?.owner?.current;
    let N;
    if (R)
      try {
        N = new CC({
          ...T,
          element: C
        });
      } catch {
        N = new nu(T);
      }
    else
      N = new nu(T);
    N.finished.then(() => {
      this.notifyFinished();
    }).catch(Sn), this.pendingTimeline && (this.stopTimeline = N.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = N;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, r) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), bC()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(a) {
    this.animation.time = a;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(a) {
    this.animation.speed = a;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(a) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(a) : this.pendingTimeline = a, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function eS(n, a, r, s = 0, o = 1) {
  const f = Array.from(n).sort((h, g) => h.sortNodePosition(g)).indexOf(a), d = n.size, m = (d - 1) * s;
  return typeof r == "function" ? r(f, d) : o === 1 ? f * s : m - f * s;
}
const UC = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function BC(n) {
  const a = UC.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const HC = 4;
function tS(n, a, r = 1) {
  Di(r <= HC, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = BC(n);
  if (!s)
    return;
  const f = window.getComputedStyle(a).getPropertyValue(s);
  if (f) {
    const d = f.trim();
    return gb(d) ? parseFloat(d) : d;
  }
  return ch(o) ? tS(o, a, r + 1) : o;
}
const qC = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, YC = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), GC = {
  type: "keyframes",
  duration: 0.8
}, PC = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, kC = (n, { keyframes: a }) => a.length > 2 ? GC : Nl.has(n) ? n.startsWith("scale") ? YC(a[1]) : qC : PC;
function nS(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function gh(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? nS(r, n) : r;
}
const XC = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function FC(n) {
  for (const a in n)
    if (!XC.has(a))
      return !0;
  return !1;
}
const vh = (n, a, r, s = {}, o, f) => (d) => {
  const m = gh(s, n) || {}, p = m.delay || s.delay || 0;
  let { elapsed: h = 0 } = s;
  h = h - /* @__PURE__ */ Jt(p);
  const g = {
    keyframes: Array.isArray(r) ? r : [null, r],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -h,
    onUpdate: (S) => {
      a.set(S), m.onUpdate && m.onUpdate(S);
    },
    onComplete: () => {
      d(), m.onComplete && m.onComplete();
    },
    name: n,
    motionValue: a,
    element: f ? void 0 : o
  };
  FC(m) || Object.assign(g, kC(n, g)), g.duration && (g.duration = /* @__PURE__ */ Jt(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Jt(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (Cd(g), g.delay === 0 && (v = !0)), ($a.instantAnimations || $a.skipAnimations || o?.shouldSkipAnimations) && (v = !0, Cd(g), g.delay = 0), g.allowFlatten = !m.type && !m.ease, v && !f && a.get() !== void 0) {
    const S = pu(g.keyframes, m);
    if (S !== void 0) {
      Ie.update(() => {
        g.onUpdate(S), g.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new nu(g) : new VC(g);
};
function bv(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function bh(n, a, r, s) {
  if (typeof a == "function") {
    const [o, f] = bv(s);
    a = a(r !== void 0 ? r : n.custom, o, f);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, f] = bv(s);
    a = a(r !== void 0 ? r : n.custom, o, f);
  }
  return a;
}
function wi(n, a, r) {
  const s = n.getProps();
  return bh(s, a, r !== void 0 ? r : s.custom, n);
}
const aS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...jl
]), Sv = 30, KC = (n) => !isNaN(parseFloat(n));
class QC {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Yt.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const f of this.dependents)
          f.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = r.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Yt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = KC(this.current));
  }
  setPrevFrameValue(a = this.current) {
    this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(a) {
    return this.on("change", a);
  }
  on(a, r) {
    this.events[a] || (this.events[a] = new sh());
    const s = this.events[a].add(r);
    return a === "change" ? () => {
      s(), Ie.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const a in this.events)
      this.events[a].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(a, r) {
    this.passiveEffect = a, this.stopPassiveEffect = r;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(a) {
    this.passiveEffect ? this.passiveEffect(a, this.updateAndNotify) : this.updateAndNotify(a);
  }
  setWithVelocity(a, r, s) {
    this.set(r), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, r = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, r && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(a) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(a);
  }
  removeDependent(a) {
    this.dependents && this.dependents.delete(a);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const a = Yt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Sv)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, Sv);
    return xb(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(a) {
    return this.stop(), new Promise((r) => {
      this.hasAnimated = !0, this.animation = a(r), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function wl(n, a) {
  return new QC(n, a);
}
const wd = (n) => Array.isArray(n);
function ZC(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, wl(r));
}
function $C(n) {
  return wd(n) ? n[n.length - 1] || 0 : n;
}
function JC(n, a) {
  const r = wi(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...f } = r || {};
  f = { ...f, ...s };
  for (const d in f) {
    const m = $C(f[d]);
    ZC(n, d, m);
  }
}
const Ot = (n) => !!(n && n.getVelocity);
function IC(n) {
  return !!(Ot(n) && n.add);
}
function Dd(n, a) {
  const r = n.getValue("willChange");
  if (IC(r))
    return r.add(a);
  if (!r && $a.WillChange) {
    const s = new $a.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Sh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const WC = "framerAppearId", iS = "data-" + Sh(WC);
function lS(n) {
  return n.props[iS];
}
function ew({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function rS(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: f, transitionEnd: d, ...m } = a;
  const p = n.getDefaultTransition();
  f = f ? nS(f, p) : p;
  const h = f?.reduceMotion;
  s && (f = s);
  const g = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in m) {
    const T = n.getValue(S, n.latestValues[S] ?? null), R = m[S];
    if (R === void 0 || v && ew(v, S))
      continue;
    const C = {
      delay: r,
      ...gh(f || {}, S)
    }, N = T.get();
    if (N !== void 0 && !T.isAnimating() && !Array.isArray(R) && R === N && !C.velocity) {
      Ie.update(() => T.set(R));
      continue;
    }
    let z = !1;
    if (window.MotionHandoffAnimation) {
      const Q = lS(n);
      if (Q) {
        const $ = window.MotionHandoffAnimation(Q, S, Ie);
        $ !== null && (C.startTime = $, z = !0);
      }
    }
    Dd(n, S);
    const H = h ?? n.shouldReduceMotion;
    T.start(vh(S, T, R, H && aS.has(S) ? { type: !1 } : C, n, z));
    const B = T.animation;
    B && g.push(B);
  }
  if (d) {
    const S = () => Ie.update(() => {
      d && JC(n, d);
    });
    g.length ? Promise.all(g).then(S) : S();
  }
  return g;
}
function jd(n, a, r = {}) {
  const s = wi(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const f = s ? () => Promise.all(rS(n, s, r)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: h = 0, staggerChildren: g, staggerDirection: v } = o;
    return tw(n, a, p, h, g, v, r);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [p, h] = m === "beforeChildren" ? [f, d] : [d, f];
    return p().then(() => h());
  } else
    return Promise.all([f(), d(r.delay)]);
}
function tw(n, a, r = 0, s = 0, o = 0, f = 1, d) {
  const m = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", a), m.push(jd(p, a, {
      ...d,
      delay: r + (typeof s == "function" ? 0 : s) + eS(n.variantChildren, p, s, o, f)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function nw(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((f) => jd(n, f, r));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = jd(n, a, r);
  else {
    const o = typeof a == "function" ? wi(n, a, r.custom) : a;
    s = Promise.all(rS(n, o, r));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const aw = {
  test: (n) => n === "auto",
  parse: (n) => n
}, sS = (n) => (a) => a.test(n), oS = [Dl, ye, Gn, ka, wA, CA, aw], xv = (n) => oS.find(sS(n));
function iw(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || bb(n) : !0;
}
const lw = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function rw(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(fh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let f = lw.has(a) ? 1 : 0;
  return s !== r && (f *= 100), a + "(" + f + o + ")";
}
const sw = /\b([a-z-]*)\(.*?\)/gu, Nd = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = n.match(sw);
    return a ? a.map(rw).join(" ") : n;
  }
}, zd = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = Nn.parse(n);
    return Nn.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Tv = {
  ...Dl,
  transform: Math.round
}, ow = {
  rotate: ka,
  rotateX: ka,
  rotateY: ka,
  rotateZ: ka,
  scale: zo,
  scaleX: zo,
  scaleY: zo,
  scaleZ: zo,
  skew: ka,
  skewX: ka,
  skewY: ka,
  distance: ye,
  translateX: ye,
  translateY: ye,
  translateZ: ye,
  x: ye,
  y: ye,
  z: ye,
  perspective: ye,
  transformPerspective: ye,
  opacity: Kr,
  originX: ov,
  originY: ov,
  originZ: ye
}, xh = {
  // Border props
  borderWidth: ye,
  borderTopWidth: ye,
  borderRightWidth: ye,
  borderBottomWidth: ye,
  borderLeftWidth: ye,
  borderRadius: ye,
  borderTopLeftRadius: ye,
  borderTopRightRadius: ye,
  borderBottomRightRadius: ye,
  borderBottomLeftRadius: ye,
  // Positioning props
  width: ye,
  maxWidth: ye,
  height: ye,
  maxHeight: ye,
  top: ye,
  right: ye,
  bottom: ye,
  left: ye,
  inset: ye,
  insetBlock: ye,
  insetBlockStart: ye,
  insetBlockEnd: ye,
  insetInline: ye,
  insetInlineStart: ye,
  insetInlineEnd: ye,
  // Spacing props
  padding: ye,
  paddingTop: ye,
  paddingRight: ye,
  paddingBottom: ye,
  paddingLeft: ye,
  paddingBlock: ye,
  paddingBlockStart: ye,
  paddingBlockEnd: ye,
  paddingInline: ye,
  paddingInlineStart: ye,
  paddingInlineEnd: ye,
  margin: ye,
  marginTop: ye,
  marginRight: ye,
  marginBottom: ye,
  marginLeft: ye,
  marginBlock: ye,
  marginBlockStart: ye,
  marginBlockEnd: ye,
  marginInline: ye,
  marginInlineStart: ye,
  marginInlineEnd: ye,
  // Typography
  fontSize: ye,
  // Misc
  backgroundPositionX: ye,
  backgroundPositionY: ye,
  ...ow,
  zIndex: Tv,
  // SVG
  fillOpacity: Kr,
  strokeOpacity: Kr,
  numOctaves: Tv
}, uw = {
  ...xh,
  // Color props
  color: xt,
  backgroundColor: xt,
  outlineColor: xt,
  fill: xt,
  stroke: xt,
  // Border props
  borderColor: xt,
  borderTopColor: xt,
  borderRightColor: xt,
  borderBottomColor: xt,
  borderLeftColor: xt,
  filter: Nd,
  WebkitFilter: Nd,
  mask: zd,
  WebkitMask: zd
}, uS = (n) => uw[n], cw = /* @__PURE__ */ new Set([Nd, zd]);
function cS(n, a) {
  let r = uS(n);
  return cw.has(r) || (r = Nn), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const fw = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function dw(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const f = n[s];
    typeof f == "string" && !fw.has(f) && Cl(f).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const f of a)
      n[f] = cS(r, o);
}
class hw extends yh {
  constructor(a, r, s, o, f) {
    super(a, r, s, o, f, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: r, name: s } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let g = 0; g < a.length; g++) {
      let v = a[g];
      if (typeof v == "string" && (v = v.trim(), ch(v))) {
        const S = tS(v, r.current);
        S !== void 0 && (a[g] = S), g === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !aS.has(s) || a.length !== 2)
      return;
    const [o, f] = a, d = xv(o), m = xv(f), p = sv(o), h = sv(f);
    if (p !== h && Za[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== m)
      if (yv(d) && yv(m))
        for (let g = 0; g < a.length; g++) {
          const v = a[g];
          typeof v == "string" && (a[g] = parseFloat(v));
        }
      else Za[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || iw(a[o])) && s.push(o);
    s.length && dw(a, s, r);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: r, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Za[s](a.measureViewportBox(), window.getComputedStyle(a.current)), r[0] = this.measuredOrigin;
    const o = r[r.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: r, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const f = s.length - 1, d = s[f];
    s[f] = Za[r](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([m, p]) => {
      a.getValue(m).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function fS(n, a, r) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let s = document;
    const o = r?.[n] ?? s.querySelectorAll(n);
    return o ? Array.from(o) : [];
  }
  return Array.from(n).filter((s) => s != null);
}
const dS = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function Yo(n) {
  return vb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Th } = /* @__PURE__ */ zb(queueMicrotask, !1), jn = {
  x: !1,
  y: !1
};
function hS() {
  return jn.x || jn.y;
}
function mw(n) {
  return n === "x" || n === "y" ? jn[n] ? null : (jn[n] = !0, () => {
    jn[n] = !1;
  }) : jn.x || jn.y ? null : (jn.x = jn.y = !0, () => {
    jn.x = jn.y = !1;
  });
}
function mS(n, a) {
  const r = fS(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [r, o, () => s.abort()];
}
function pw(n) {
  return !(n.pointerType === "touch" || hS());
}
function yw(n, a, r = {}) {
  const [s, o, f] = mS(n, r);
  return s.forEach((d) => {
    let m = !1, p = !1, h;
    const g = () => {
      d.removeEventListener("pointerleave", R);
    }, v = (N) => {
      h && (h(N), h = void 0), g();
    }, S = (N) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), p && (p = !1, v(N));
    }, T = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, R = (N) => {
      if (N.pointerType !== "touch") {
        if (m) {
          p = !0;
          return;
        }
        v(N);
      }
    }, C = (N) => {
      if (!pw(N))
        return;
      p = !1;
      const z = a(d, N);
      typeof z == "function" && (h = z, d.addEventListener("pointerleave", R, o));
    };
    d.addEventListener("pointerenter", C, o), d.addEventListener("pointerdown", T, o);
  }), f;
}
const pS = (n, a) => a ? n === a ? !0 : pS(n, a.parentElement) : !1, Eh = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, gw = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function vw(n) {
  return gw.has(n.tagName) || n.isContentEditable === !0;
}
const bw = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Sw(n) {
  return bw.has(n.tagName) || n.isContentEditable === !0;
}
const Go = /* @__PURE__ */ new WeakSet();
function Ev(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function $f(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const xw = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = Ev(() => {
    if (Go.has(r))
      return;
    $f(r, "down");
    const o = Ev(() => {
      $f(r, "up");
    }), f = () => $f(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", f, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function Rv(n) {
  return Eh(n) && !hS();
}
const Mv = /* @__PURE__ */ new WeakSet();
function Tw(n, a, r = {}) {
  const [s, o, f] = mS(n, r), d = (m) => {
    const p = m.currentTarget;
    if (!Rv(m) || Mv.has(m))
      return;
    Go.add(p), r.stopPropagation && Mv.add(m);
    const h = a(p, m), g = (T, R) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), Go.has(p) && Go.delete(p), Rv(T) && typeof h == "function" && h(T, { success: R });
    }, v = (T) => {
      g(T, p === window || p === document || r.useGlobalTarget || pS(p, T.target));
    }, S = (T) => {
      g(T, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((m) => {
    (r.useGlobalTarget ? window : m).addEventListener("pointerdown", d, o), Yo(m) && (m.addEventListener("focus", (h) => xw(h, o)), !vw(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), f;
}
function Rh(n) {
  return vb(n) && "ownerSVGElement" in n;
}
const Po = /* @__PURE__ */ new WeakMap();
let ko;
const yS = (n, a, r) => (s, o) => o && o[0] ? o[0][n + "Size"] : Rh(s) && "getBBox" in s ? s.getBBox()[a] : s[r], Ew = /* @__PURE__ */ yS("inline", "width", "offsetWidth"), Rw = /* @__PURE__ */ yS("block", "height", "offsetHeight");
function Mw({ target: n, borderBoxSize: a }) {
  Po.get(n)?.forEach((r) => {
    r(n, {
      get width() {
        return Ew(n, a);
      },
      get height() {
        return Rw(n, a);
      }
    });
  });
}
function Aw(n) {
  n.forEach(Mw);
}
function Cw() {
  typeof ResizeObserver > "u" || (ko = new ResizeObserver(Aw));
}
function ww(n, a) {
  ko || Cw();
  const r = fS(n);
  return r.forEach((s) => {
    let o = Po.get(s);
    o || (o = /* @__PURE__ */ new Set(), Po.set(s, o)), o.add(a), ko?.observe(s);
  }), () => {
    r.forEach((s) => {
      const o = Po.get(s);
      o?.delete(a), o?.size || ko?.unobserve(s);
    });
  };
}
const Xo = /* @__PURE__ */ new Set();
let El;
function Dw() {
  El = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Xo.forEach((a) => a(n));
  }, window.addEventListener("resize", El);
}
function jw(n) {
  return Xo.add(n), El || Dw(), () => {
    Xo.delete(n), !Xo.size && typeof El == "function" && (window.removeEventListener("resize", El), El = void 0);
  };
}
function Av(n, a) {
  return typeof n == "function" ? jw(n) : ww(n, a);
}
function Nw(n) {
  return Rh(n) && n.tagName === "svg";
}
const zw = [...oS, xt, Nn], Ow = (n) => zw.find(sS(n)), Cv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Rl = () => ({
  x: Cv(),
  y: Cv()
}), wv = () => ({ min: 0, max: 0 }), Rt = () => ({
  x: wv(),
  y: wv()
}), _w = /* @__PURE__ */ new WeakMap();
function yu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Qr(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Mh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ah = ["initial", ...Mh];
function gu(n) {
  return yu(n.animate) || Ah.some((a) => Qr(n[a]));
}
function gS(n) {
  return !!(gu(n) || n.variants);
}
function Lw(n, a, r) {
  for (const s in a) {
    const o = a[s], f = r[s];
    if (Ot(o))
      n.addValue(s, o);
    else if (Ot(f))
      n.addValue(s, wl(o, { owner: n }));
    else if (f !== o)
      if (n.hasValue(s)) {
        const d = n.getValue(s);
        d.liveStyle === !0 ? d.jump(o) : d.hasAnimated || d.set(o);
      } else {
        const d = n.getStaticValue(s);
        n.addValue(s, wl(d !== void 0 ? d : o, { owner: n }));
      }
  }
  for (const s in r)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const au = { current: null }, Ch = { current: !1 }, Vw = typeof window < "u";
function vS() {
  if (Ch.current = !0, !!Vw)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => au.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      au.current = !1;
}
const Dv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let iu = {};
function bS(n) {
  iu = n;
}
function Uw() {
  return iu;
}
class Bw {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, r, s) {
    return {};
  }
  constructor({ parent: a, props: r, presenceContext: s, reducedMotionConfig: o, skipAnimations: f, blockInitialAnimation: d, visualState: m }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = yh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Yt.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Ie.render(this.render, !1, !0));
    };
    const { latestValues: h, renderState: g } = m;
    this.latestValues = h, this.baseTarget = { ...h }, this.initialValues = r.initial ? { ...h } : {}, this.renderState = g, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = f, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = gu(r), this.isVariantNode = gS(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const T in S) {
      const R = S[T];
      h[T] !== void 0 && Ot(R) && R.set(h[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, _w.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Ch.current || vS(), this.shouldReduceMotion = au.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Ja(this.notifyUpdate), Ja(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const r = this.features[a];
      r && (r.unmount(), r.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, r) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), r.accelerate && Wb.has(a) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: m, times: p, ease: h, duration: g } = r.accelerate, v = new Jb({
        element: this.current,
        name: a,
        keyframes: m,
        times: p,
        ease: h,
        duration: /* @__PURE__ */ Jt(g)
      }), S = d(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const s = Nl.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = r.on("change", (d) => {
      this.latestValues[a] = d, this.props.onUpdate && Ie.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let f;
    typeof window < "u" && window.MotionCheckAppearSync && (f = window.MotionCheckAppearSync(this, a, r)), this.valueSubscriptions.set(a, () => {
      o(), f && f(), r.owner && r.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in iu) {
      const r = iu[a];
      if (!r)
        continue;
      const { isEnabled: s, Feature: o } = r;
      if (!this.features[a] && o && s(this.props) && (this.features[a] = new o(this)), this.features[a]) {
        const f = this.features[a];
        f.isMounted ? f.update() : (f.mount(), f.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Rt();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, r) {
    this.latestValues[a] = r;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, r) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = r;
    for (let s = 0; s < Dv.length; s++) {
      const o = Dv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const f = "on" + o, d = a[f];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    this.prevMotionValues = Lw(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(a) {
    return this.props.variants ? this.props.variants[a] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(a) {
    const r = this.getClosestVariantNode();
    if (r)
      return r.variantChildren && r.variantChildren.add(a), () => r.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, r) {
    const s = this.values.get(a);
    r !== s && (s && this.removeValue(a), this.bindToMotionValue(a, r), this.values.set(a, r), this.latestValues[a] = r.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const r = this.valueSubscriptions.get(a);
    r && (r(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, r) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let s = this.values.get(a);
    return s === void 0 && r !== void 0 && (s = wl(r === null ? void 0 : r, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, r) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (gb(s) || bb(s)) ? s = parseFloat(s) : !Ow(s) && Nn.test(r) && (s = cS(a, r)), this.setBaseTarget(a, Ot(s) ? s.get() : s)), Ot(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, r) {
    this.baseTarget[a] = r;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: r } = this.props;
    let s;
    if (typeof r == "string" || typeof r == "object") {
      const f = bh(this.props, r, this.presenceContext?.custom);
      f && (s = f[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Ot(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new sh()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    Th.render(this.render);
  }
}
class SS extends Bw {
  constructor() {
    super(...arguments), this.KeyframeResolver = hw;
  }
  sortInstanceNodePosition(a, r) {
    return a.compareDocumentPosition(r) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, r) {
    const s = a.style;
    return s ? s[r] : void 0;
  }
  removeValueFromRenderState(a, { vars: r, style: s }) {
    delete r[a], delete s[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    Ot(a) && (this.childSubscription = a.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
class Ia {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function xS({ top: n, left: a, right: r, bottom: s }) {
  return {
    x: { min: a, max: r },
    y: { min: n, max: s }
  };
}
function Hw({ x: n, y: a }) {
  return { top: a.min, right: n.max, bottom: a.max, left: n.min };
}
function qw(n, a) {
  if (!a)
    return n;
  const r = a({ x: n.left, y: n.top }), s = a({ x: n.right, y: n.bottom });
  return {
    top: r.y,
    left: r.x,
    bottom: s.y,
    right: s.x
  };
}
function Jf(n) {
  return n === void 0 || n === 1;
}
function Od({ scale: n, scaleX: a, scaleY: r }) {
  return !Jf(n) || !Jf(a) || !Jf(r);
}
function Ei(n) {
  return Od(n) || TS(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function TS(n) {
  return jv(n.x) || jv(n.y);
}
function jv(n) {
  return n && n !== "0%";
}
function lu(n, a, r) {
  const s = n - r, o = a * s;
  return r + o;
}
function Nv(n, a, r, s, o) {
  return o !== void 0 && (n = lu(n, o, s)), lu(n, r, s) + a;
}
function _d(n, a = 0, r = 1, s, o) {
  n.min = Nv(n.min, a, r, s, o), n.max = Nv(n.max, a, r, s, o);
}
function ES(n, { x: a, y: r }) {
  _d(n.x, a.translate, a.scale, a.originPoint), _d(n.y, r.translate, r.scale, r.originPoint);
}
const zv = 0.999999999999, Ov = 1.0000000000001;
function Yw(n, a, r, s = !1) {
  const o = r.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let f, d;
  for (let m = 0; m < o; m++) {
    f = r[m], d = f.projectionDelta;
    const { visualElement: p } = f.options;
    p && p.props.style && p.props.style.display === "contents" || (s && f.options.layoutScroll && f.scroll && f !== f.root && (Yn(n.x, -f.scroll.offset.x), Yn(n.y, -f.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, ES(n, d)), s && Ei(f.latestValues) && Fo(n, f.latestValues, f.layout?.layoutBox));
  }
  a.x < Ov && a.x > zv && (a.x = 1), a.y < Ov && a.y > zv && (a.y = 1);
}
function Yn(n, a) {
  n.min += a, n.max += a;
}
function _v(n, a, r, s, o = 0.5) {
  const f = at(n.min, n.max, o);
  _d(n, a, r, f, s);
}
function Lv(n, a) {
  return typeof n == "string" ? parseFloat(n) / 100 * (a.max - a.min) : n;
}
function Fo(n, a, r) {
  const s = r ?? n;
  _v(n.x, Lv(a.x, s.x), a.scaleX, a.scale, a.originX), _v(n.y, Lv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function RS(n, a) {
  return xS(qw(n.getBoundingClientRect(), a));
}
function Gw(n, a, r) {
  const s = RS(n, r), { scroll: o } = a;
  return o && (Yn(s.x, o.offset.x), Yn(s.y, o.offset.y)), s;
}
const Pw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, kw = jl.length;
function Xw(n, a, r) {
  let s = "", o = !0;
  for (let f = 0; f < kw; f++) {
    const d = jl[f], m = n[d];
    if (m === void 0)
      continue;
    let p = !0;
    if (typeof m == "number")
      p = m === (d.startsWith("scale") ? 1 : 0);
    else {
      const h = parseFloat(m);
      p = d.startsWith("scale") ? h === 1 : h === 0;
    }
    if (!p || r) {
      const h = dS(m, xh[d]);
      if (!p) {
        o = !1;
        const g = Pw[d] || d;
        s += `${g}(${h}) `;
      }
      r && (a[d] = h);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function wh(n, a, r) {
  const { style: s, vars: o, transformOrigin: f } = n;
  let d = !1, m = !1;
  for (const p in a) {
    const h = a[p];
    if (Nl.has(p)) {
      d = !0;
      continue;
    } else if (_b(p)) {
      o[p] = h;
      continue;
    } else {
      const g = dS(h, xh[p]);
      p.startsWith("origin") ? (m = !0, f[p] = g) : s[p] = g;
    }
  }
  if (a.transform || (d || r ? s.transform = Xw(a, n.transform, r) : s.transform && (s.transform = "none")), m) {
    const { originX: p = "50%", originY: h = "50%", originZ: g = 0 } = f;
    s.transformOrigin = `${p} ${h} ${g}`;
  }
}
function MS(n, { style: a, vars: r }, s, o) {
  const f = n.style;
  let d;
  for (d in a)
    f[d] = a[d];
  o?.applyProjectionStyles(f, s);
  for (d in r)
    f.setProperty(d, r[d]);
}
function Vv(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Or = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (ye.test(n))
        n = parseFloat(n);
      else
        return n;
    const r = Vv(n, a.target.x), s = Vv(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, Fw = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = Nn.parse(n);
    if (o.length > 5)
      return s;
    const f = Nn.createTransformer(n), d = typeof o[0] != "number" ? 1 : 0, m = r.x.scale * a.x, p = r.y.scale * a.y;
    o[0 + d] /= m, o[1 + d] /= p;
    const h = at(m, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= h), typeof o[3 + d] == "number" && (o[3 + d] /= h), f(o);
  }
}, Ld = {
  borderRadius: {
    ...Or,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Or,
  borderTopRightRadius: Or,
  borderBottomLeftRadius: Or,
  borderBottomRightRadius: Or,
  boxShadow: Fw
};
function AS(n, { layout: a, layoutId: r }) {
  return Nl.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!Ld[n] || n === "opacity");
}
function Dh(n, a, r) {
  const s = n.style, o = a?.style, f = {};
  if (!s)
    return f;
  for (const d in s)
    (Ot(s[d]) || o && Ot(o[d]) || AS(d, n) || r?.getValue(d)?.liveStyle !== void 0) && (f[d] = s[d]);
  return f;
}
function Kw(n) {
  return window.getComputedStyle(n);
}
class Qw extends SS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = MS;
  }
  readValueFromInstance(a, r) {
    if (Nl.has(r))
      return this.projection?.isProjecting ? Td(r) : mC(a, r);
    {
      const s = Kw(a), o = (_b(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return RS(a, r);
  }
  build(a, r, s) {
    wh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return Dh(a, r, s);
  }
}
const Zw = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, $w = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Jw(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const f = o ? Zw : $w;
  n[f.offset] = `${-s}`, n[f.array] = `${a} ${r}`;
}
const Iw = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function CS(n, {
  attrX: a,
  attrY: r,
  attrScale: s,
  pathLength: o,
  pathSpacing: f = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, p, h, g) {
  if (wh(n, m, h), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of Iw)
    v[T] !== void 0 && (S[T] = v[T], delete v[T]);
  a !== void 0 && (v.x = a), r !== void 0 && (v.y = r), s !== void 0 && (v.scale = s), o !== void 0 && Jw(v, o, f, d, !1);
}
const wS = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), DS = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function Ww(n, a, r, s) {
  MS(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(wS.has(o) ? o : Sh(o), a.attrs[o]);
}
function jS(n, a, r) {
  const s = Dh(n, a, r);
  for (const o in n)
    if (Ot(n[o]) || Ot(a[o])) {
      const f = jl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[f] = n[o];
    }
  return s;
}
class e2 extends SS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Rt;
  }
  getBaseTargetFromProps(a, r) {
    return a[r];
  }
  readValueFromInstance(a, r) {
    if (Nl.has(r)) {
      const s = uS(r);
      return s && s.default || 0;
    }
    return r = wS.has(r) ? r : Sh(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return jS(a, r, s);
  }
  build(a, r, s) {
    CS(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    Ww(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = DS(a.tagName), super.mount(a);
  }
}
const t2 = Ah.length;
function NS(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? NS(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < t2; r++) {
    const s = Ah[r], o = n.props[s];
    (Qr(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function zS(n, a) {
  if (!Array.isArray(a))
    return !1;
  const r = a.length;
  if (r !== n.length)
    return !1;
  for (let s = 0; s < r; s++)
    if (a[s] !== n[s])
      return !1;
  return !0;
}
const n2 = [...Mh].reverse(), a2 = Mh.length;
function i2(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => nw(n, r, s)));
}
function l2(n) {
  let a = i2(n), r = Uv(), s = !0, o = !1;
  const f = (h) => (g, v) => {
    const S = wi(n, v, h === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: T, transitionEnd: R, ...C } = S;
      g = { ...g, ...C, ...R };
    }
    return g;
  };
  function d(h) {
    a = h(n);
  }
  function m(h) {
    const { props: g } = n, v = NS(n.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let R = {}, C = 1 / 0;
    for (let z = 0; z < a2; z++) {
      const H = n2[z], B = r[H], Q = g[H] !== void 0 ? g[H] : v[H], $ = Qr(Q), de = H === h ? B.isActive : null;
      de === !1 && (C = z);
      let ie = Q === v[H] && Q !== g[H] && $;
      if (ie && (s || o) && n.manuallyAnimateOnMount && (ie = !1), B.protectedKeys = { ...R }, // If it isn't active and hasn't *just* been set as inactive
      !B.isActive && de === null || // If we didn't and don't have any defined prop for this animation type
      !Q && !B.prevProp || // Or if the prop doesn't define an animation
      yu(Q) || typeof Q == "boolean")
        continue;
      if (H === "exit" && B.isActive && de !== !0) {
        B.prevResolvedValues && (R = {
          ...R,
          ...B.prevResolvedValues
        });
        continue;
      }
      const j = r2(B.prevProp, Q);
      let I = j || // If we're making this variant active, we want to always make it active
      H === h && B.isActive && !ie && $ || // If we removed a higher-priority variant (i is in reverse order)
      z > C && $, te = !1;
      const F = Array.isArray(Q) ? Q : [Q];
      let P = F.reduce(f(H), {});
      de === !1 && (P = {});
      const { prevResolvedValues: ae = {} } = B, fe = {
        ...ae,
        ...P
      }, re = (le) => {
        I = !0, T.has(le) && (te = !0, T.delete(le)), B.needsAnimating[le] = !0;
        const ce = n.getValue(le);
        ce && (ce.liveStyle = !1);
      };
      for (const le in fe) {
        const ce = P[le], Re = ae[le];
        if (R.hasOwnProperty(le))
          continue;
        let w = !1;
        wd(ce) && wd(Re) ? w = !zS(ce, Re) : w = ce !== Re, w ? ce != null ? re(le) : T.add(le) : ce !== void 0 && T.has(le) ? re(le) : B.protectedKeys[le] = !0;
      }
      B.prevProp = Q, B.prevResolvedValues = P, B.isActive && (R = { ...R, ...P }), (s || o) && n.blockInitialAnimation && (I = !1);
      const U = ie && j;
      I && (!U || te) && S.push(...F.map((le) => {
        const ce = { type: H };
        if (typeof le == "string" && (s || o) && !U && n.manuallyAnimateOnMount && n.parent) {
          const { parent: Re } = n, w = wi(Re, le);
          if (Re.enteringChildren && w) {
            const { delayChildren: k } = w.transition || {};
            ce.delay = eS(Re.enteringChildren, n, k);
          }
        }
        return {
          animation: le,
          options: ce
        };
      }));
    }
    if (T.size) {
      const z = {};
      if (typeof g.initial != "boolean") {
        const H = wi(n, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        H && H.transition && (z.transition = H.transition);
      }
      T.forEach((H) => {
        const B = n.getBaseTarget(H), Q = n.getValue(H);
        Q && (Q.liveStyle = !0), z[H] = B ?? null;
      }), S.push({ animation: z });
    }
    let N = !!S.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !n.manuallyAnimateOnMount && (N = !1), s = !1, o = !1, N ? a(S) : Promise.resolve();
  }
  function p(h, g) {
    if (r[h].isActive === g)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(h, g)), r[h].isActive = g;
    const v = m(h);
    for (const S in r)
      r[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: p,
    setAnimateFunction: d,
    getState: () => r,
    reset: () => {
      r = Uv(), o = !0;
    }
  };
}
function r2(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !zS(a, n) : !1;
}
function Si(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Uv() {
  return {
    animate: Si(!0),
    whileInView: Si(),
    whileHover: Si(),
    whileTap: Si(),
    whileDrag: Si(),
    whileFocus: Si(),
    exit: Si()
  };
}
function Vd(n, a) {
  n.min = a.min, n.max = a.max;
}
function Dn(n, a) {
  Vd(n.x, a.x), Vd(n.y, a.y);
}
function Bv(n, a) {
  n.translate = a.translate, n.scale = a.scale, n.originPoint = a.originPoint, n.origin = a.origin;
}
const OS = 1e-4, s2 = 1 - OS, o2 = 1 + OS, _S = 0.01, u2 = 0 - _S, c2 = 0 + _S;
function Gt(n) {
  return n.max - n.min;
}
function f2(n, a, r) {
  return Math.abs(n - a) <= r;
}
function Hv(n, a, r, s = 0.5) {
  n.origin = s, n.originPoint = at(a.min, a.max, n.origin), n.scale = Gt(r) / Gt(a), n.translate = at(r.min, r.max, n.origin) - n.originPoint, (n.scale >= s2 && n.scale <= o2 || isNaN(n.scale)) && (n.scale = 1), (n.translate >= u2 && n.translate <= c2 || isNaN(n.translate)) && (n.translate = 0);
}
function Gr(n, a, r, s) {
  Hv(n.x, a.x, r.x, s ? s.originX : void 0), Hv(n.y, a.y, r.y, s ? s.originY : void 0);
}
function qv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = o + a.min, n.max = n.min + Gt(a);
}
function d2(n, a, r, s) {
  qv(n.x, a.x, r.x, s?.x), qv(n.y, a.y, r.y, s?.y);
}
function Yv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = a.min - o, n.max = n.min + Gt(a);
}
function ru(n, a, r, s) {
  Yv(n.x, a.x, r.x, s?.x), Yv(n.y, a.y, r.y, s?.y);
}
function Gv(n, a, r, s, o) {
  return n -= a, n = lu(n, 1 / r, s), o !== void 0 && (n = lu(n, 1 / o, s)), n;
}
function h2(n, a = 0, r = 1, s = 0.5, o, f = n, d = n) {
  if (Gn.test(a) && (a = parseFloat(a), a = at(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let m = at(f.min, f.max, s);
  n === f && (m -= a), n.min = Gv(n.min, a, r, m, o), n.max = Gv(n.max, a, r, m, o);
}
function Pv(n, a, [r, s, o], f, d) {
  h2(n, a[r], a[s], a[o], a.scale, f, d);
}
const m2 = ["x", "scaleX", "originX"], p2 = ["y", "scaleY", "originY"];
function kv(n, a, r, s) {
  Pv(n.x, a, m2, r ? r.x : void 0, s ? s.x : void 0), Pv(n.y, a, p2, r ? r.y : void 0, s ? s.y : void 0);
}
function Xv(n) {
  return n.translate === 0 && n.scale === 1;
}
function LS(n) {
  return Xv(n.x) && Xv(n.y);
}
function Fv(n, a) {
  return n.min === a.min && n.max === a.max;
}
function y2(n, a) {
  return Fv(n.x, a.x) && Fv(n.y, a.y);
}
function Kv(n, a) {
  return Math.round(n.min) === Math.round(a.min) && Math.round(n.max) === Math.round(a.max);
}
function VS(n, a) {
  return Kv(n.x, a.x) && Kv(n.y, a.y);
}
function Qv(n) {
  return Gt(n.x) / Gt(n.y);
}
function Zv(n, a) {
  return n.translate === a.translate && n.scale === a.scale && n.originPoint === a.originPoint;
}
function qn(n) {
  return [n("x"), n("y")];
}
function g2(n, a, r) {
  let s = "";
  const o = n.x.translate / a.x, f = n.y.translate / a.y, d = r?.z || 0;
  if ((o || f || d) && (s = `translate3d(${o}px, ${f}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), r) {
    const { transformPerspective: h, rotate: g, rotateX: v, rotateY: S, skewX: T, skewY: R } = r;
    h && (s = `perspective(${h}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotateX(${v}deg) `), S && (s += `rotateY(${S}deg) `), T && (s += `skewX(${T}deg) `), R && (s += `skewY(${R}deg) `);
  }
  const m = n.x.scale * a.x, p = n.y.scale * a.y;
  return (m !== 1 || p !== 1) && (s += `scale(${m}, ${p})`), s || "none";
}
const US = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], v2 = US.length, $v = (n) => typeof n == "string" ? parseFloat(n) : n, Jv = (n) => typeof n == "number" || ye.test(n);
function b2(n, a, r, s, o, f) {
  o ? (n.opacity = at(0, r.opacity ?? 1, S2(s)), n.opacityExit = at(a.opacity ?? 1, 0, x2(s))) : f && (n.opacity = at(a.opacity ?? 1, r.opacity ?? 1, s));
  for (let d = 0; d < v2; d++) {
    const m = US[d];
    let p = Iv(a, m), h = Iv(r, m);
    if (p === void 0 && h === void 0)
      continue;
    p || (p = 0), h || (h = 0), p === 0 || h === 0 || Jv(p) === Jv(h) ? (n[m] = Math.max(at($v(p), $v(h), s), 0), (Gn.test(h) || Gn.test(p)) && (n[m] += "%")) : n[m] = h;
  }
  (a.rotate || r.rotate) && (n.rotate = at(a.rotate || 0, r.rotate || 0, s));
}
function Iv(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const S2 = /* @__PURE__ */ BS(0, 0.5, wb), x2 = /* @__PURE__ */ BS(0.5, 0.95, Sn);
function BS(n, a, r) {
  return (s) => s < n ? 0 : s > a ? 1 : r(/* @__PURE__ */ Fr(n, a, s));
}
function T2(n, a, r) {
  const s = Ot(n) ? n : wl(n);
  return s.start(vh("", s, a, r)), s.animation;
}
function Zr(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
const E2 = (n, a) => n.depth - a.depth;
class R2 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    rh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    Io(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(E2), this.isDirty = !1, this.children.forEach(a);
  }
}
function M2(n, a) {
  const r = Yt.now(), s = ({ timestamp: o }) => {
    const f = o - r;
    f >= a && (Ja(s), n(f - a));
  };
  return Ie.setup(s, !0), () => Ja(s);
}
function Ko(n) {
  return Ot(n) ? n.get() : n;
}
class A2 {
  constructor() {
    this.members = [];
  }
  add(a) {
    rh(this.members, a);
    for (let r = this.members.length - 1; r >= 0; r--) {
      const s = this.members[r];
      if (s === a || s === this.lead || s === this.prevLead)
        continue;
      const o = s.instance;
      (!o || o.isConnected === !1) && !s.snapshot && (Io(this.members, s), s.unmount());
    }
    a.scheduleRender();
  }
  remove(a) {
    if (Io(this.members, a), a === this.prevLead && (this.prevLead = void 0), a === this.lead) {
      const r = this.members[this.members.length - 1];
      r && this.promote(r);
    }
  }
  relegate(a) {
    for (let r = this.members.indexOf(a) - 1; r >= 0; r--) {
      const s = this.members[r];
      if (s.isPresent !== !1 && s.instance?.isConnected !== !1)
        return this.promote(s), !0;
    }
    return !1;
  }
  promote(a, r) {
    const s = this.lead;
    if (a !== s && (this.prevLead = s, this.lead = a, a.show(), s)) {
      s.updateSnapshot(), a.scheduleRender();
      const { layoutDependency: o } = s.options, { layoutDependency: f } = a.options;
      (o === void 0 || o !== f) && (a.resumeFrom = s, r && (s.preserveOpacity = !0), s.snapshot && (a.snapshot = s.snapshot, a.snapshot.latestValues = s.animationValues || s.latestValues), a.root?.isUpdating && (a.isLayoutDirty = !0)), a.options.crossfade === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((a) => {
      a.options.onExitComplete?.(), a.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((a) => a.instance && a.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const Qo = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, If = ["", "X", "Y", "Z"], C2 = 1e3;
let w2 = 0;
function Wf(n, a, r, s) {
  const { latestValues: o } = a;
  o[n] && (r[n] = o[n], a.setStaticValue(n, 0), s && (s[n] = 0));
}
function HS(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: a } = n.options;
  if (!a)
    return;
  const r = lS(a);
  if (window.MotionHasOptimisedAnimation(r, "transform")) {
    const { layout: o, layoutId: f } = n.options;
    window.MotionCancelOptimisedAnimation(r, "transform", Ie, !(o || f));
  }
  const { parent: s } = n;
  s && !s.hasCheckedOptimisedAppear && HS(s);
}
function qS({ attachResizeListener: n, defaultParent: a, measureScroll: r, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, m = a?.()) {
      this.id = w2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(N2), this.nodes.forEach(U2), this.nodes.forEach(B2), this.nodes.forEach(z2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = m ? m.root || m : this, this.path = m ? [...m.path, m] : [], this.parent = m, this.depth = m ? m.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new R2());
    }
    addEventListener(d, m) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new sh()), this.eventHandlers.get(d).add(m);
    }
    notifyListeners(d, ...m) {
      const p = this.eventHandlers.get(d);
      p && p.notify(...m);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    /**
     * Lifecycles
     */
    mount(d) {
      if (this.instance)
        return;
      this.isSVG = Rh(d) && !Nw(d), this.instance = d;
      const { layoutId: m, layout: p, visualElement: h } = this.options;
      if (h && !h.current && h.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || m) && (this.isLayoutDirty = !0), n) {
        let g, v = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Ie.read(() => {
          v = window.innerWidth;
        }), n(d, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = M2(S, 250), Qo.hasAnimatedSinceResize && (Qo.hasAnimatedSinceResize = !1, this.nodes.forEach(t0)));
        });
      }
      m && this.root.registerSharedNode(m, this), this.options.animate !== !1 && h && (m || p) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const R = this.options.transition || h.getDefaultTransition() || P2, { onLayoutAnimationStart: C, onLayoutAnimationComplete: N } = h.getProps(), z = !this.targetLayout || !VS(this.targetLayout, T), H = !v && S;
        if (this.options.layoutRoot || this.resumeFrom || H || v && (z || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const B = {
            ...gh(R, "layout"),
            onPlay: C,
            onComplete: N
          };
          (h.shouldReduceMotion || this.options.layoutRoot) && (B.delay = 0, B.type = !1), this.startAnimation(B), this.setAnimationOrigin(g, H);
        } else
          v || t0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Ja(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(H2), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && HS(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: m, layout: p } = this.options;
      if (m === void 0 && !p)
        return;
      const h = this.getTransformTemplate();
      this.prevTransformTemplateValue = h ? h(this.latestValues, "") : void 0, this.updateSnapshot(), d && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const p = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(_2), this.nodes.forEach(Wv);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(e0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(L2), this.nodes.forEach(V2), this.nodes.forEach(D2), this.nodes.forEach(j2)) : this.nodes.forEach(e0), this.clearAllSnapshots();
      const m = Yt.now();
      zt.delta = kn(0, 1e3 / 60, m - zt.timestamp), zt.timestamp = m, zt.isProcessing = !0, kf.update.process(zt), kf.preRender.process(zt), kf.render.process(zt), zt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Th.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(O2), this.sharedNodes.forEach(q2);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Ie.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ie.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Gt(this.snapshot.measuredBox.x) && !Gt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const d = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = Rt()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: m } = this.options;
      m && m.notify("LayoutMeasure", this.layout.layoutBox, d ? d.layoutBox : void 0);
    }
    updateScroll(d = "measure") {
      let m = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === d && (m = !1), m && this.instance) {
        const p = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: p,
          offset: r(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!o)
        return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, m = this.projectionDelta && !LS(this.projectionDelta), p = this.getTransformTemplate(), h = p ? p(this.latestValues, "") : void 0, g = h !== this.prevTransformTemplateValue;
      d && this.instance && (m || Ei(this.latestValues) || g) && (o(this.instance, h), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const m = this.measurePageBox();
      let p = this.removeElementScroll(m);
      return d && (p = this.removeTransform(p)), k2(p), {
        animationId: this.root.animationId,
        measuredBox: m,
        layoutBox: p,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: d } = this.options;
      if (!d)
        return Rt();
      const m = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(X2))) {
        const { scroll: h } = this.root;
        h && (Yn(m.x, h.offset.x), Yn(m.y, h.offset.y));
      }
      return m;
    }
    removeElementScroll(d) {
      const m = Rt();
      if (Dn(m, d), this.scroll?.wasRoot)
        return m;
      for (let p = 0; p < this.path.length; p++) {
        const h = this.path[p], { scroll: g, options: v } = h;
        h !== this.root && g && v.layoutScroll && (g.wasRoot && Dn(m, d), Yn(m.x, g.offset.x), Yn(m.y, g.offset.y));
      }
      return m;
    }
    applyTransform(d, m = !1, p) {
      const h = p || Rt();
      Dn(h, d);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !m && v.options.layoutScroll && v.scroll && v !== v.root && (Yn(h.x, -v.scroll.offset.x), Yn(h.y, -v.scroll.offset.y)), Ei(v.latestValues) && Fo(h, v.latestValues, v.layout?.layoutBox);
      }
      return Ei(this.latestValues) && Fo(h, this.latestValues, this.layout?.layoutBox), h;
    }
    removeTransform(d) {
      const m = Rt();
      Dn(m, d);
      for (let p = 0; p < this.path.length; p++) {
        const h = this.path[p];
        if (!Ei(h.latestValues))
          continue;
        let g;
        h.instance && (Od(h.latestValues) && h.updateSnapshot(), g = Rt(), Dn(g, h.measurePageBox())), kv(m, h.latestValues, h.snapshot?.layoutBox, g);
      }
      return Ei(this.latestValues) && kv(m, this.latestValues), m;
    }
    setTargetDelta(d) {
      this.targetDelta = d, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== zt.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      const m = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = m.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = m.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = m.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== m;
      if (!(d || p && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!this.layout || !(g || v))
        return;
      this.resolvedRelativeTargetAt = zt.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Rt(), this.targetWithTransforms = Rt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), d2(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Dn(this.target, this.layout.layoutBox), ES(this.target, this.targetDelta)) : Dn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Od(this.parent.latestValues) || TS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, m, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Rt(), this.relativeTargetOrigin = Rt(), ru(this.relativeTargetOrigin, m, p, this.options.layoutAnchor || void 0), Dn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(), m = !!this.resumingFrom || this !== d;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), m && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === zt.timestamp && (p = !1), p)
        return;
      const { layout: h, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(h || g))
        return;
      Dn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, S = this.treeScale.y;
      Yw(this.layoutCorrected, this.treeScale, this.path, m), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = Rt());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Bv(this.prevProjectionDelta.x, this.projectionDelta.x), Bv(this.prevProjectionDelta.y, this.projectionDelta.y)), Gr(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== S || !Zv(this.projectionDelta.x, this.prevProjectionDelta.x) || !Zv(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      if (this.options.visualElement?.scheduleRender(), d) {
        const m = this.getStack();
        m && m.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Rl(), this.projectionDelta = Rl(), this.projectionDeltaWithTransform = Rl();
    }
    setAnimationOrigin(d, m = !1) {
      const p = this.snapshot, h = p ? p.latestValues : {}, g = { ...this.latestValues }, v = Rl();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !m;
      const S = Rt(), T = p ? p.source : void 0, R = this.layout ? this.layout.source : void 0, C = T !== R, N = this.getStack(), z = !N || N.members.length <= 1, H = !!(C && !z && this.options.crossfade === !0 && !this.path.some(G2));
      this.animationProgress = 0;
      let B;
      this.mixTargetDelta = (Q) => {
        const $ = Q / 1e3;
        n0(v.x, d.x, $), n0(v.y, d.y, $), this.setTargetDelta(v), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (ru(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), Y2(this.relativeTarget, this.relativeTargetOrigin, S, $), B && y2(this.relativeTarget, B) && (this.isProjectionDirty = !1), B || (B = Rt()), Dn(B, this.relativeTarget)), C && (this.animationValues = g, b2(g, h, this.latestValues, $, H, z)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = $;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Ja(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Ie.update(() => {
        Qo.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = wl(0)), this.motionValue.jump(0, !1), this.currentAnimation = T2(this.motionValue, [0, 1e3], {
          ...d,
          velocity: 0,
          isSync: !0,
          onUpdate: (m) => {
            this.mixTargetDelta(m), d.onUpdate && d.onUpdate(m);
          },
          onStop: () => {
          },
          onComplete: () => {
            d.onComplete && d.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const d = this.getStack();
      d && d.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(C2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: m, target: p, layout: h, latestValues: g } = d;
      if (!(!m || !p || !h)) {
        if (this !== d && this.layout && h && YS(this.options.animationType, this.layout.layoutBox, h.layoutBox)) {
          p = this.target || Rt();
          const v = Gt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + v;
          const S = Gt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        Dn(m, p), Fo(m, g), Gr(this.projectionDeltaWithTransform, this.layoutCorrected, m, g);
      }
    }
    registerSharedNode(d, m) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new A2()), this.sharedNodes.get(d).add(m);
      const h = m.options.initialPromotionConfig;
      m.promote({
        transition: h ? h.transition : void 0,
        preserveFollowOpacity: h && h.shouldPreserveFollowOpacity ? h.shouldPreserveFollowOpacity(m) : void 0
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d)
        return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: m, preserveFollowOpacity: p } = {}) {
      const h = this.getStack();
      h && h.promote(this, p), d && (this.projectionDelta = void 0, this.needsReset = !0), m && this.setOptions({ transition: m });
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d)
        return;
      let m = !1;
      const { latestValues: p } = d;
      if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (m = !0), !m)
        return;
      const h = {};
      p.z && Wf("z", d, h, this.animationValues);
      for (let g = 0; g < If.length; g++)
        Wf(`rotate${If[g]}`, d, h, this.animationValues), Wf(`skew${If[g]}`, d, h, this.animationValues);
      d.render();
      for (const g in h)
        d.setStaticValue(g, h[g]), this.animationValues && (this.animationValues[g] = h[g]);
      d.scheduleRender();
    }
    applyProjectionStyles(d, m) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = Ko(m?.pointerEvents) || "", d.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const h = this.getLead();
      if (!this.projectionDelta || !this.layout || !h.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = Ko(m?.pointerEvents) || ""), this.hasProjected && !Ei(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const g = h.animationValues || h.latestValues;
      this.applyTransformsToTarget();
      let v = g2(this.projectionDeltaWithTransform, this.treeScale, g);
      p && (v = p(g, v)), d.transform = v;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, h.animationValues ? d.opacity = h === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : d.opacity = h === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const R in Ld) {
        if (g[R] === void 0)
          continue;
        const { correct: C, applyTo: N, isCSSVariable: z } = Ld[R], H = v === "none" ? g[R] : C(g[R], h);
        if (N) {
          const B = N.length;
          for (let Q = 0; Q < B; Q++)
            d[N[Q]] = H;
        } else
          z ? this.options.visualElement.renderState.vars[R] = H : d[R] = H;
      }
      this.options.layoutId && (d.pointerEvents = h === this ? Ko(m?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(Wv), this.root.sharedNodes.clear();
    }
  };
}
function D2(n) {
  n.updateLayout();
}
function j2(n) {
  const a = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && a && n.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: s } = n.layout, { animationType: o } = n.options, f = a.source !== n.layout.source;
    if (o === "size")
      qn((g) => {
        const v = f ? a.measuredBox[g] : a.layoutBox[g], S = Gt(v);
        v.min = r[g].min, v.max = v.min + S;
      });
    else if (o === "x" || o === "y") {
      const g = o === "x" ? "y" : "x";
      Vd(f ? a.measuredBox[g] : a.layoutBox[g], r[g]);
    } else YS(o, a.layoutBox, r) && qn((g) => {
      const v = f ? a.measuredBox[g] : a.layoutBox[g], S = Gt(r[g]);
      v.max = v.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[g].max = n.relativeTarget[g].min + S);
    });
    const d = Rl();
    Gr(d, r, a.layoutBox);
    const m = Rl();
    f ? Gr(m, n.applyTransform(s, !0), a.measuredBox) : Gr(m, r, a.layoutBox);
    const p = !LS(d);
    let h = !1;
    if (!n.resumeFrom) {
      const g = n.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: S } = g;
        if (v && S) {
          const T = n.options.layoutAnchor || void 0, R = Rt();
          ru(R, a.layoutBox, v.layoutBox, T);
          const C = Rt();
          ru(C, r, S.layoutBox, T), VS(R, C) || (h = !0), g.options.layoutRoot && (n.relativeTarget = C, n.relativeTargetOrigin = R, n.relativeParent = g);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: r,
      snapshot: a,
      delta: m,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: h
    });
  } else if (n.isLead()) {
    const { onExitComplete: r } = n.options;
    r && r();
  }
  n.options.transition = void 0;
}
function N2(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function z2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function O2(n) {
  n.clearSnapshot();
}
function Wv(n) {
  n.clearMeasurements();
}
function _2(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function e0(n) {
  n.isLayoutDirty = !1;
}
function L2(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function V2(n) {
  const { visualElement: a } = n.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function t0(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function U2(n) {
  n.resolveTargetDelta();
}
function B2(n) {
  n.calcProjection();
}
function H2(n) {
  n.resetSkewAndRotation();
}
function q2(n) {
  n.removeLeadSnapshot();
}
function n0(n, a, r) {
  n.translate = at(a.translate, 0, r), n.scale = at(a.scale, 1, r), n.origin = a.origin, n.originPoint = a.originPoint;
}
function a0(n, a, r, s) {
  n.min = at(a.min, r.min, s), n.max = at(a.max, r.max, s);
}
function Y2(n, a, r, s) {
  a0(n.x, a.x, r.x, s), a0(n.y, a.y, r.y, s);
}
function G2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const P2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, i0 = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), l0 = i0("applewebkit/") && !i0("chrome/") ? Math.round : Sn;
function r0(n) {
  n.min = l0(n.min), n.max = l0(n.max);
}
function k2(n) {
  r0(n.x), r0(n.y);
}
function YS(n, a, r) {
  return n === "position" || n === "preserve-aspect" && !f2(Qv(a), Qv(r), 0.2);
}
function X2(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const F2 = qS({
  attachResizeListener: (n, a) => Zr(n, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), ed = {
  current: void 0
}, GS = qS({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!ed.current) {
      const n = new F2({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), ed.current = n;
    }
    return ed.current;
  },
  resetTransform: (n, a) => {
    n.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), jh = E.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function s0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function K2(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const f = s0(o, a);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const f = s[o];
          typeof f == "function" ? f() : s0(n[o], null);
        }
      };
  };
}
function Q2(...n) {
  return E.useCallback(K2(...n), n);
}
class Z2 extends E.Component {
  getSnapshotBeforeUpdate(a) {
    const r = this.props.childRef.current;
    if (Yo(r) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = r.offsetParent, o = Yo(s) && s.offsetWidth || 0, f = Yo(s) && s.offsetHeight || 0, d = getComputedStyle(r), m = this.props.sizeRef.current;
      m.height = parseFloat(d.height), m.width = parseFloat(d.width), m.top = r.offsetTop, m.left = r.offsetLeft, m.right = o - m.width - m.left, m.bottom = f - m.height - m.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function $2({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: f }) {
  const d = E.useId(), m = E.useRef(null), p = E.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: h } = E.useContext(jh), g = n.props?.ref ?? n?.ref, v = Q2(m, g);
  return E.useInsertionEffect(() => {
    const { width: S, height: T, top: R, left: C, right: N, bottom: z } = p.current;
    if (a || f === !1 || !m.current || !S || !T)
      return;
    const H = r === "left" ? `left: ${C}` : `right: ${N}`, B = s === "bottom" ? `bottom: ${z}` : `top: ${R}`;
    m.current.dataset.motionPopId = d;
    const Q = document.createElement("style");
    h && (Q.nonce = h);
    const $ = o ?? document.head;
    return $.appendChild(Q), Q.sheet && Q.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${T}px !important;
            ${H}px !important;
            ${B}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), $.contains(Q) && $.removeChild(Q);
    };
  }, [a]), b.jsx(Z2, { isPresent: a, childRef: m, sizeRef: p, pop: f, children: f === !1 ? n : E.cloneElement(n, { ref: v }) });
}
const J2 = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: f, mode: d, anchorX: m, anchorY: p, root: h }) => {
  const g = lh(I2), v = E.useId();
  let S = !0, T = E.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: r,
    custom: o,
    onExitComplete: (R) => {
      g.set(R, !0);
      for (const C of g.values())
        if (!C)
          return;
      s && s();
    },
    register: (R) => (g.set(R, !1), () => g.delete(R))
  }), [r, g, s]);
  return f && S && (T = { ...T }), E.useMemo(() => {
    g.forEach((R, C) => g.set(C, !1));
  }, [r]), E.useEffect(() => {
    !r && !g.size && s && s();
  }, [r]), n = b.jsx($2, { pop: d === "popLayout", isPresent: r, anchorX: m, anchorY: p, root: h, children: n }), b.jsx(mu.Provider, { value: T, children: n });
};
function I2() {
  return /* @__PURE__ */ new Map();
}
function PS(n = !0) {
  const a = E.useContext(mu);
  if (a === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: s, register: o } = a, f = E.useId();
  E.useEffect(() => {
    if (n)
      return o(f);
  }, [n]);
  const d = E.useCallback(() => n && s && s(f), [f, s, n]);
  return !r && s ? [!1, d] : [!0];
}
const Oo = (n) => n.key || "";
function o0(n) {
  const a = [];
  return E.Children.forEach(n, (r) => {
    E.isValidElement(r) && a.push(r);
  }), a;
}
const W2 = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: f = "sync", propagate: d = !1, anchorX: m = "left", anchorY: p = "top", root: h }) => {
  const [g, v] = PS(d), S = E.useMemo(() => o0(n), [n]), T = d && !g ? [] : S.map(Oo), R = E.useRef(!0), C = E.useRef(S), N = lh(() => /* @__PURE__ */ new Map()), z = E.useRef(/* @__PURE__ */ new Set()), [H, B] = E.useState(S), [Q, $] = E.useState(S);
  yb(() => {
    R.current = !1, C.current = S;
    for (let j = 0; j < Q.length; j++) {
      const I = Oo(Q[j]);
      T.includes(I) ? (N.delete(I), z.current.delete(I)) : N.get(I) !== !0 && N.set(I, !1);
    }
  }, [Q, T.length, T.join("-")]);
  const de = [];
  if (S !== H) {
    let j = [...S];
    for (let I = 0; I < Q.length; I++) {
      const te = Q[I], F = Oo(te);
      T.includes(F) || (j.splice(I, 0, te), de.push(te));
    }
    return f === "wait" && de.length && (j = de), $(o0(j)), B(S), null;
  }
  const { forceRender: ie } = E.useContext(ih);
  return b.jsx(b.Fragment, { children: Q.map((j) => {
    const I = Oo(j), te = d && !g ? !1 : S === Q || T.includes(I), F = () => {
      if (z.current.has(I))
        return;
      if (N.has(I))
        z.current.add(I), N.set(I, !0);
      else
        return;
      let P = !0;
      N.forEach((ae) => {
        ae || (P = !1);
      }), P && (ie?.(), $(C.current), d && v?.(), s && s());
    };
    return b.jsx(J2, { isPresent: te, initial: !R.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: f, root: h, onExitComplete: te ? void 0 : F, anchorX: m, anchorY: p, children: j }, I);
  }) });
}, kS = E.createContext({ strict: !1 }), u0 = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let c0 = !1;
function eD() {
  if (c0)
    return;
  const n = {};
  for (const a in u0)
    n[a] = {
      isEnabled: (r) => u0[a].some((s) => !!r[s])
    };
  bS(n), c0 = !0;
}
function XS() {
  return eD(), Uw();
}
function tD(n) {
  const a = XS();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  bS(a);
}
const nD = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function su(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || nD.has(n);
}
let FS = (n) => !su(n);
function aD(n) {
  typeof n == "function" && (FS = (a) => a.startsWith("on") ? !su(a) : n(a));
}
try {
  aD(require("@emotion/is-prop-valid").default);
} catch {
}
function iD(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ot(n[o]) || (FS(o) || r === !0 && su(o) || !a && !su(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const vu = /* @__PURE__ */ E.createContext({});
function lD(n, a) {
  if (gu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || Qr(r) ? r : void 0,
      animate: Qr(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function rD(n) {
  const { initial: a, animate: r } = lD(n, E.useContext(vu));
  return E.useMemo(() => ({ initial: a, animate: r }), [f0(a), f0(r)]);
}
function f0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Nh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function KS(n, a, r) {
  for (const s in a)
    !Ot(a[s]) && !AS(s, r) && (n[s] = a[s]);
}
function sD({ transformTemplate: n }, a) {
  return E.useMemo(() => {
    const r = Nh();
    return wh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function oD(n, a) {
  const r = n.style || {}, s = {};
  return KS(s, r, n), Object.assign(s, sD(n, a)), s;
}
function uD(n, a) {
  const r = {}, s = oD(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const QS = () => ({
  ...Nh(),
  attrs: {}
});
function cD(n, a, r, s) {
  const o = E.useMemo(() => {
    const f = QS();
    return CS(f, a, DS(s), n.transformTemplate, n.style), {
      ...f.attrs,
      style: { ...f.style }
    };
  }, [a]);
  if (n.style) {
    const f = {};
    KS(f, n.style, n), o.style = { ...f, ...o.style };
  }
  return o;
}
const fD = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function zh(n) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof n != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    n.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(fD.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function dD(n, a, r, { latestValues: s }, o, f = !1, d) {
  const p = (d ?? zh(n) ? cD : uD)(a, s, o, n), h = iD(a, typeof n == "string", f), g = n !== E.Fragment ? { ...h, ...p, ref: r } : {}, { children: v } = a, S = E.useMemo(() => Ot(v) ? v.get() : v, [v]);
  return E.createElement(n, {
    ...g,
    children: S
  });
}
function hD({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: mD(r, s, o, n),
    renderState: a()
  };
}
function mD(n, a, r, s) {
  const o = {}, f = s(n, {});
  for (const S in f)
    o[S] = Ko(f[S]);
  let { initial: d, animate: m } = n;
  const p = gu(n), h = gS(n);
  a && h && !p && n.inherit !== !1 && (d === void 0 && (d = a.initial), m === void 0 && (m = a.animate));
  let g = r ? r.initial === !1 : !1;
  g = g || d === !1;
  const v = g ? m : d;
  if (v && typeof v != "boolean" && !yu(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let T = 0; T < S.length; T++) {
      const R = bh(n, S[T]);
      if (R) {
        const { transitionEnd: C, transition: N, ...z } = R;
        for (const H in z) {
          let B = z[H];
          if (Array.isArray(B)) {
            const Q = g ? B.length - 1 : 0;
            B = B[Q];
          }
          B !== null && (o[H] = B);
        }
        for (const H in C)
          o[H] = C[H];
      }
    }
  }
  return o;
}
const ZS = (n) => (a, r) => {
  const s = E.useContext(vu), o = E.useContext(mu), f = () => hD(n, a, s, o);
  return r ? f() : lh(f);
}, pD = /* @__PURE__ */ ZS({
  scrapeMotionValuesFromProps: Dh,
  createRenderState: Nh
}), yD = /* @__PURE__ */ ZS({
  scrapeMotionValuesFromProps: jS,
  createRenderState: QS
}), gD = Symbol.for("motionComponentSymbol");
function vD(n, a, r) {
  const s = E.useRef(r);
  E.useInsertionEffect(() => {
    s.current = r;
  });
  const o = E.useRef(null);
  return E.useCallback((f) => {
    f && n.onMount?.(f);
    const d = s.current;
    if (typeof d == "function")
      if (f) {
        const m = d(f);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : d(f);
    else d && (d.current = f);
    a && (f ? a.mount(f) : a.unmount());
  }, [a]);
}
const $S = E.createContext({});
function Sl(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function bD(n, a, r, s, o, f) {
  const { visualElement: d } = E.useContext(vu), m = E.useContext(kS), p = E.useContext(mu), h = E.useContext(jh), g = h.reducedMotion, v = h.skipAnimations, S = E.useRef(null), T = E.useRef(!1);
  s = s || m.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: d,
    props: r,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: v,
    isSVG: f
  }), T.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const R = S.current, C = E.useContext($S);
  R && !R.projection && o && (R.type === "html" || R.type === "svg") && SD(S.current, r, o, C);
  const N = E.useRef(!1);
  E.useInsertionEffect(() => {
    R && N.current && R.update(r, p);
  });
  const z = r[iS], H = E.useRef(!!z && typeof window < "u" && !window.MotionHandoffIsComplete?.(z) && window.MotionHasOptimisedAnimation?.(z));
  return yb(() => {
    T.current = !0, R && (N.current = !0, window.MotionIsMounted = !0, R.updateFeatures(), R.scheduleRenderMicrotask(), H.current && R.animationState && R.animationState.animateChanges());
  }), E.useEffect(() => {
    R && (!H.current && R.animationState && R.animationState.animateChanges(), H.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(z);
    }), H.current = !1), R.enteringChildren = void 0);
  }), R;
}
function SD(n, a, r, s) {
  const { layoutId: o, layout: f, drag: d, dragConstraints: m, layoutScroll: p, layoutRoot: h, layoutAnchor: g, layoutCrossfade: v } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : JS(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: f,
    alwaysMeasureLayout: !!d || m && Sl(m),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof f == "string" ? f : "both",
    initialPromotionConfig: s,
    crossfade: v,
    layoutScroll: p,
    layoutRoot: h,
    layoutAnchor: g
  });
}
function JS(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : JS(n.parent);
}
function td(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && tD(s);
  const f = r ? r === "svg" : zh(n), d = f ? yD : pD;
  function m(h, g) {
    let v;
    const S = {
      ...E.useContext(jh),
      ...h,
      layoutId: xD(h)
    }, { isStatic: T } = S, R = rD(h), C = d(h, T);
    if (!T && typeof window < "u") {
      TD();
      const N = ED(S);
      v = N.MeasureLayout, R.visualElement = bD(n, C, S, o, N.ProjectionNode, f);
    }
    return b.jsxs(vu.Provider, { value: R, children: [v && R.visualElement ? b.jsx(v, { visualElement: R.visualElement, ...S }) : null, dD(n, h, vD(C, R.visualElement, g), C, T, a, f)] });
  }
  m.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = E.forwardRef(m);
  return p[gD] = n, p;
}
function xD({ layoutId: n }) {
  const a = E.useContext(ih).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function TD(n, a) {
  E.useContext(kS).strict;
}
function ED(n) {
  const a = XS(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function RD(n, a) {
  if (typeof Proxy > "u")
    return td;
  const r = /* @__PURE__ */ new Map(), s = (f, d) => td(f, d, n, a), o = (f, d) => s(f, d);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (f, d) => d === "create" ? s : (r.has(d) || r.set(d, td(d, void 0, n, a)), r.get(d))
  });
}
const MD = (n, a) => a.isSVG ?? zh(n) ? new e2(a) : new Qw(a, {
  allowProjection: n !== E.Fragment
});
class AD extends Ia {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = l2(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    yu(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: r } = this.node.prevProps || {};
    a !== r && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let CD = 0;
class wD extends Ia {
  constructor() {
    super(...arguments), this.id = CD++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: r } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: f, custom: d } = this.node.getProps();
        if (typeof f == "string") {
          const m = wi(this.node, f, d);
          if (m) {
            const { transition: p, transitionEnd: h, ...g } = m;
            for (const v in g)
              this.node.getValue(v)?.jump(g[v]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const o = this.node.animationState.setActive("exit", !a);
    r && !a && o.then(() => {
      this.isExitComplete = !0, r(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: r } = this.node.presenceContext || {};
    r && r(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const DD = {
  animation: {
    Feature: AD
  },
  exit: {
    Feature: wD
  }
};
function os(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const jD = (n) => (a) => Eh(a) && n(a, os(a));
function Pr(n, a, r, s) {
  return Zr(n, a, jD(r), s);
}
const IS = ({ current: n }) => n ? n.ownerDocument.defaultView : null, d0 = (n, a) => Math.abs(n - a);
function ND(n, a) {
  const r = d0(n.x, a.x), s = d0(n.y, a.y);
  return Math.sqrt(r ** 2 + s ** 2);
}
const h0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class WS {
  constructor(a, r, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: f = !1, distanceThreshold: d = 3, element: m } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = _o(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = nd(this.lastMoveEventInfo, this.history), R = this.startEvent !== null, C = ND(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!R && !C)
        return;
      const { point: N } = T, { timestamp: z } = zt;
      this.history.push({ ...N, timestamp: z });
      const { onStart: H, onMove: B } = this.handlers;
      R || (H && H(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), B && B(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, R) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = R, this.lastMoveEventInfo = _o(R, this.transformPagePoint), Ie.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, R) => {
      this.end();
      const { onEnd: C, onSessionEnd: N, resumeAnimation: z } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && z && z(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const H = nd(T.type === "pointercancel" ? this.lastMoveEventInfo : _o(R, this.transformPagePoint), this.history);
      this.startEvent && C && C(T, H), N && N(T, H);
    }, !Eh(a))
      return;
    this.dragSnapToOrigin = f, this.handlers = r, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = os(a), h = _o(p, this.transformPagePoint), { point: g } = h, { timestamp: v } = zt;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: S } = r;
    S && S(a, nd(h, this.history)), this.removeListeners = ls(Pr(this.contextWindow, "pointermove", this.handlePointerMove), Pr(this.contextWindow, "pointerup", this.handlePointerUp), Pr(this.contextWindow, "pointercancel", this.handlePointerUp)), m && this.startScrollTracking(m);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let r = a.parentElement;
    for (; r; ) {
      const s = getComputedStyle(r);
      (h0.has(s.overflowX) || h0.has(s.overflowY)) && this.scrollPositions.set(r, {
        x: r.scrollLeft,
        y: r.scrollTop
      }), r = r.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(a) {
    const r = this.scrollPositions.get(a);
    if (!r)
      return;
    const s = a === window, o = s ? { x: window.scrollX, y: window.scrollY } : {
      x: a.scrollLeft,
      y: a.scrollTop
    }, f = { x: o.x - r.x, y: o.y - r.y };
    f.x === 0 && f.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += f.x, this.lastMoveEventInfo.point.y += f.y) : this.history.length > 0 && (this.history[0].x -= f.x, this.history[0].y -= f.y), this.scrollPositions.set(a, o), Ie.update(this.updatePoint, !0));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Ja(this.updatePoint);
  }
}
function _o(n, a) {
  return a ? { point: a(n.point) } : n;
}
function m0(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function nd({ point: n }, a) {
  return {
    point: n,
    delta: m0(n, e1(a)),
    offset: m0(n, zD(a)),
    velocity: OD(a, 0.1)
  };
}
function zD(n) {
  return n[0];
}
function e1(n) {
  return n[n.length - 1];
}
function OD(n, a) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let r = n.length - 1, s = null;
  const o = e1(n);
  for (; r >= 0 && (s = n[r], !(o.timestamp - s.timestamp > /* @__PURE__ */ Jt(a))); )
    r--;
  if (!s)
    return { x: 0, y: 0 };
  s === n[0] && n.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ Jt(a) * 2 && (s = n[1]);
  const f = /* @__PURE__ */ vn(o.timestamp - s.timestamp);
  if (f === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (o.x - s.x) / f,
    y: (o.y - s.y) / f
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function _D(n, { min: a, max: r }, s) {
  return a !== void 0 && n < a ? n = s ? at(a, n, s.min) : Math.max(n, a) : r !== void 0 && n > r && (n = s ? at(r, n, s.max) : Math.min(n, r)), n;
}
function p0(n, a, r) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: r !== void 0 ? n.max + r - (n.max - n.min) : void 0
  };
}
function LD(n, { top: a, left: r, bottom: s, right: o }) {
  return {
    x: p0(n.x, r, o),
    y: p0(n.y, a, s)
  };
}
function y0(n, a) {
  let r = a.min - n.min, s = a.max - n.max;
  return a.max - a.min < n.max - n.min && ([r, s] = [s, r]), { min: r, max: s };
}
function VD(n, a) {
  return {
    x: y0(n.x, a.x),
    y: y0(n.y, a.y)
  };
}
function UD(n, a) {
  let r = 0.5;
  const s = Gt(n), o = Gt(a);
  return o > s ? r = /* @__PURE__ */ Fr(a.min, a.max - s, n.min) : s > o && (r = /* @__PURE__ */ Fr(n.min, n.max - o, a.min)), kn(0, 1, r);
}
function BD(n, a) {
  const r = {};
  return a.min !== void 0 && (r.min = a.min - n.min), a.max !== void 0 && (r.max = a.max - n.min), r;
}
const Ud = 0.35;
function HD(n = Ud) {
  return n === !1 ? n = 0 : n === !0 && (n = Ud), {
    x: g0(n, "left", "right"),
    y: g0(n, "top", "bottom")
  };
}
function g0(n, a, r) {
  return {
    min: v0(n, a),
    max: v0(n, r)
  };
}
function v0(n, a) {
  return typeof n == "number" ? n : n[a] || 0;
}
const qD = /* @__PURE__ */ new WeakMap();
class YD {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Rt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: r = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const f = (v) => {
      r && this.snapToCursor(os(v).point), this.stopAnimation();
    }, d = (v, S) => {
      const { drag: T, dragPropagation: R, onDragStart: C } = this.getProps();
      if (T && !R && (this.openDragLock && this.openDragLock(), this.openDragLock = mw(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), qn((z) => {
        let H = this.getAxisMotionValue(z).get() || 0;
        if (Gn.test(H)) {
          const { projection: B } = this.visualElement;
          if (B && B.layout) {
            const Q = B.layout.layoutBox[z];
            Q && (H = Gt(Q) * (parseFloat(H) / 100));
          }
        }
        this.originPoint[z] = H;
      }), C && Ie.update(() => C(v, S), !1, !0), Dd(this.visualElement, "transform");
      const { animationState: N } = this.visualElement;
      N && N.setActive("whileDrag", !0);
    }, m = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: R, onDirectionLock: C, onDrag: N } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: z } = S;
      if (R && this.currentDirection === null) {
        this.currentDirection = PD(z), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, z), this.updateAxis("y", S.point, z), this.visualElement.render(), N && Ie.update(() => N(v, S), !1, !0);
    }, p = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S, this.stop(v, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, h = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new WS(a, {
      onSessionStart: f,
      onStart: d,
      onMove: m,
      onSessionEnd: p,
      resumeAnimation: h
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: IS(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(a, r) {
    const s = a || this.latestPointerEvent, o = r || this.latestPanInfo, f = this.isDragging;
    if (this.cancel(), !f || !o || !s)
      return;
    const { velocity: d } = o;
    this.startAnimation(d);
    const { onDragEnd: m } = this.getProps();
    m && Ie.postRender(() => m(s, o));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: a, animationState: r } = this.visualElement;
    a && (a.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), r && r.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(a, r, s) {
    const { drag: o } = this.getProps();
    if (!s || !Lo(a, o, this.currentDirection))
      return;
    const f = this.getAxisMotionValue(a);
    let d = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (d = _D(d, this.constraints[a], this.elastic[a])), f.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: r } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && Sl(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = LD(s.layoutBox, a) : this.constraints = !1, this.elastic = HD(r), o !== this.constraints && !Sl(a) && s && this.constraints && !this.hasMutatedConstraints && qn((f) => {
      this.constraints !== !1 && this.getAxisMotionValue(f) && (this.constraints[f] = BD(s.layoutBox[f], this.constraints[f]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: r } = this.getProps();
    if (!a || !Sl(a))
      return !1;
    const s = a.current;
    Di(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const f = Gw(s, o.root, this.visualElement.getTransformPagePoint());
    let d = VD(o.layout.layoutBox, f);
    if (r) {
      const m = r(Hw(d));
      this.hasMutatedConstraints = !!m, m && (d = xS(m));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: r, dragMomentum: s, dragElastic: o, dragTransition: f, dragSnapToOrigin: d, onDragTransitionEnd: m } = this.getProps(), p = this.constraints || {}, h = qn((g) => {
      if (!Lo(g, r, this.currentDirection))
        return;
      let v = p && p[g] || {};
      (d === !0 || d === g) && (v = { min: 0, max: 0 });
      const S = o ? 200 : 1e6, T = o ? 40 : 1e7, R = {
        type: "inertia",
        velocity: s ? a[g] : 0,
        bounceStiffness: S,
        bounceDamping: T,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...f,
        ...v
      };
      return this.startAxisValueAnimation(g, R);
    });
    return Promise.all(h).then(m);
  }
  startAxisValueAnimation(a, r) {
    const s = this.getAxisMotionValue(a);
    return Dd(this.visualElement, a), s.start(vh(a, s, 0, r, this.visualElement, !1));
  }
  stopAnimation() {
    qn((a) => this.getAxisMotionValue(a).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(a) {
    const r = `_drag${a.toUpperCase()}`, s = this.visualElement.getProps(), o = s[r];
    return o || this.visualElement.getValue(a, (s.initial ? s.initial[a] : void 0) || 0);
  }
  snapToCursor(a) {
    qn((r) => {
      const { drag: s } = this.getProps();
      if (!Lo(r, s, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, f = this.getAxisMotionValue(r);
      if (o && o.layout) {
        const { min: d, max: m } = o.layout.layoutBox[r], p = f.get() || 0;
        f.set(a[r] - at(d, m, 0.5) + p);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: a, dragConstraints: r } = this.getProps(), { projection: s } = this.visualElement;
    if (!Sl(r) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    qn((d) => {
      const m = this.getAxisMotionValue(d);
      if (m && this.constraints !== !1) {
        const p = m.get();
        o[d] = UD({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    this.visualElement.current.style.transform = f ? f({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), qn((d) => {
      if (!Lo(d, a, null))
        return;
      const m = this.getAxisMotionValue(d), { min: p, max: h } = this.constraints[d];
      m.set(at(p, h, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    qD.set(this.visualElement, this);
    const a = this.visualElement.current, r = Pr(a, "pointerdown", (h) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), S = h.target, T = S !== a && Sw(S);
      g && v && !T && this.start(h);
    });
    let s;
    const o = () => {
      const { dragConstraints: h } = this.getProps();
      Sl(h) && h.current && (this.constraints = this.resolveRefConstraints(), s || (s = GD(a, h.current, () => this.scalePositionWithinConstraints())));
    }, { projection: f } = this.visualElement, d = f.addEventListener("measure", o);
    f && !f.layout && (f.root && f.root.updateScroll(), f.updateLayout()), Ie.read(o);
    const m = Zr(window, "resize", () => this.scalePositionWithinConstraints()), p = f.addEventListener("didUpdate", (({ delta: h, hasLayoutChanged: g }) => {
      this.isDragging && g && (qn((v) => {
        const S = this.getAxisMotionValue(v);
        S && (this.originPoint[v] += h[v].translate, S.set(S.get() + h[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      m(), r(), d(), p && p(), s && s();
    };
  }
  getProps() {
    const a = this.visualElement.getProps(), { drag: r = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: f = !1, dragElastic: d = Ud, dragMomentum: m = !0 } = a;
    return {
      ...a,
      drag: r,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: m
    };
  }
}
function b0(n) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    n();
  };
}
function GD(n, a, r) {
  const s = Av(n, b0(r)), o = Av(a, b0(r));
  return () => {
    s(), o();
  };
}
function Lo(n, a, r) {
  return (a === !0 || a === n) && (r === null || r === n);
}
function PD(n, a = 10) {
  let r = null;
  return Math.abs(n.y) > a ? r = "y" : Math.abs(n.x) > a && (r = "x"), r;
}
class kD extends Ia {
  constructor(a) {
    super(a), this.removeGroupControls = Sn, this.removeListeners = Sn, this.controls = new YD(a);
  }
  mount() {
    const { dragControls: a } = this.node.getProps();
    a && (this.removeGroupControls = a.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Sn;
  }
  update() {
    const { dragControls: a } = this.node.getProps(), { dragControls: r } = this.node.prevProps || {};
    a !== r && (this.removeGroupControls(), a && (this.removeGroupControls = a.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const ad = (n) => (a, r) => {
  n && Ie.update(() => n(a, r), !1, !0);
};
class XD extends Ia {
  constructor() {
    super(...arguments), this.removePointerDownListener = Sn;
  }
  onPointerDown(a) {
    this.session = new WS(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: IS(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: a, onPanStart: r, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: ad(a),
      onStart: ad(r),
      onMove: ad(s),
      onEnd: (f, d) => {
        delete this.session, o && Ie.postRender(() => o(f, d));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Pr(this.node.current, "pointerdown", (a) => this.onPointerDown(a));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let id = !1;
class FD extends E.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s, layoutId: o } = this.props, { projection: f } = a;
    f && (r.group && r.group.add(f), s && s.register && o && s.register(f), id && f.root.didUpdate(), f.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), f.setOptions({
      ...f.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Qo.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(a) {
    const { layoutDependency: r, visualElement: s, drag: o, isPresent: f } = this.props, { projection: d } = s;
    return d && (d.isPresent = f, a.layoutDependency !== r && d.setOptions({
      ...d.options,
      layoutDependency: r
    }), id = !0, o || a.layoutDependency !== r || r === void 0 || a.isPresent !== f ? d.willUpdate() : this.safeToRemove(), a.isPresent !== f && (f ? d.promote() : d.relegate() || Ie.postRender(() => {
      const m = d.getStack();
      (!m || !m.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: a, layoutAnchor: r } = this.props, { projection: s } = a;
    s && (s.options.layoutAnchor = r, s.root.didUpdate(), Th.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s } = this.props, { projection: o } = a;
    id = !0, o && (o.scheduleCheckAfterUnmount(), r && r.group && r.group.remove(o), s && s.deregister && s.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: a } = this.props;
    a && a();
  }
  render() {
    return null;
  }
}
function t1(n) {
  const [a, r] = PS(), s = E.useContext(ih);
  return b.jsx(FD, { ...n, layoutGroup: s, switchLayoutGroup: E.useContext($S), isPresent: a, safeToRemove: r });
}
const KD = {
  pan: {
    Feature: XD
  },
  drag: {
    Feature: kD,
    ProjectionNode: GS,
    MeasureLayout: t1
  }
};
function S0(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, f = s[o];
  f && Ie.postRender(() => f(a, os(a)));
}
class QD extends Ia {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = yw(a, (r, s) => (S0(this.node, s, "Start"), (o) => S0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class ZD extends Ia {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let a = !1;
    try {
      a = this.node.current.matches(":focus-visible");
    } catch {
      a = !0;
    }
    !a || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = ls(Zr(this.node.current, "focus", () => this.onFocus()), Zr(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function x0(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), f = s[o];
  f && Ie.postRender(() => f(a, os(a)));
}
class $D extends Ia {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = Tw(a, (o, f) => (x0(this.node, f, "Start"), (d, { success: m }) => x0(this.node, d, m ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Bd = /* @__PURE__ */ new WeakMap(), ld = /* @__PURE__ */ new WeakMap(), JD = (n) => {
  const a = Bd.get(n.target);
  a && a(n);
}, ID = (n) => {
  n.forEach(JD);
};
function WD({ root: n, ...a }) {
  const r = n || document;
  ld.has(r) || ld.set(r, {});
  const s = ld.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(ID, { root: n, ...a })), s[o];
}
function ej(n, a, r) {
  const s = WD(a);
  return Bd.set(n, r), s.observe(n), () => {
    Bd.delete(n), s.unobserve(n);
  };
}
const tj = {
  some: 0,
  all: 1
};
class nj extends Ia {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: f } = a, d = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : tj[o]
    }, m = (p) => {
      const { isIntersecting: h } = p;
      if (this.isInView === h || (this.isInView = h, f && !h && this.hasEnteredView))
        return;
      h && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", h);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), S = h ? g : v;
      S && S(p);
    };
    this.stopObserver = ej(this.node.current, d, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(aj(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function aj({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const ij = {
  inView: {
    Feature: nj
  },
  tap: {
    Feature: $D
  },
  focus: {
    Feature: ZD
  },
  hover: {
    Feature: QD
  }
}, lj = {
  layout: {
    ProjectionNode: GS,
    MeasureLayout: t1
  }
}, rj = {
  ...DD,
  ...ij,
  ...KD,
  ...lj
}, Oh = /* @__PURE__ */ RD(rj, MD);
function sj() {
  !Ch.current && vS();
  const [n] = E.useState(au.current);
  return n;
}
const _r = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function oj({ vector: n, pulseKey: a, size: r = 220 }) {
  const s = sj(), o = r / 2, f = r / 2, d = r / 2 - 28, m = _r.length, p = _r.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / m, R = Math.max(0, Math.min(1, n[S] ?? 0));
    return { x: o + Math.cos(T) * d * R, y: f + Math.sin(T) * d * R };
  }), h = _r.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / m;
    return { x: o + Math.cos(T) * d, y: f + Math.sin(T) * d, angle: T };
  }), g = p.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" ");
  return /* @__PURE__ */ b.jsxs(
    "svg",
    {
      width: r,
      height: r,
      viewBox: `0 0 ${r} ${r}`,
      role: "img",
      "aria-label": "Emotion vector radar",
      children: [
        /* @__PURE__ */ b.jsxs("g", { stroke: "currentColor", strokeOpacity: 0.18, fill: "none", children: [
          [0.25, 0.5, 0.75, 1].map((v) => /* @__PURE__ */ b.jsx(
            "polygon",
            {
              points: h.map((S) => `${o + (S.x - o) * v},${f + (S.y - f) * v}`).join(" ")
            },
            v
          )),
          h.map((v, S) => /* @__PURE__ */ b.jsx("line", { x1: o, y1: f, x2: v.x, y2: v.y }, S))
        ] }),
        /* @__PURE__ */ b.jsx(
          Oh.polygon,
          {
            points: g,
            fill: "currentColor",
            fillOpacity: 0.32,
            stroke: "currentColor",
            strokeWidth: 1.5,
            initial: s || a === void 0 ? !1 : { scale: 0.92, opacity: 0.2 },
            animate: { scale: 1, opacity: 1 },
            style: { transformOrigin: `${o}px ${f}px` },
            transition: s ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
          },
          a ?? "static"
        ),
        h.map((v, S) => /* @__PURE__ */ b.jsx(
          "text",
          {
            x: o + Math.cos(v.angle) * (d + 16),
            y: f + Math.sin(v.angle) * (d + 16) + 3,
            textAnchor: "middle",
            fontSize: 10,
            fill: "currentColor",
            opacity: 0.72,
            children: _r[S]
          },
          _r[S]
        ))
      ]
    }
  );
}
const uj = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function cj({ vector: n, onChange: a, disabled: r = !1 }) {
  const s = (o, f) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(f) ? f : 0)), m = [...n];
    m[o] = d, a(m);
  };
  return /* @__PURE__ */ b.jsx("div", { className: JM, role: "group", "aria-label": "Emotion axes", children: uj.map((o, f) => /* @__PURE__ */ b.jsxs("div", { className: IM, children: [
    /* @__PURE__ */ b.jsx("label", { htmlFor: `emo-slider-${f}`, className: hb, children: o }),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        id: `emo-slider-${f}`,
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        value: n[f] ?? 0,
        disabled: r,
        onChange: (d) => s(f, Number(d.currentTarget.value)),
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": n[f] ?? 0,
        className: mb
      }
    ),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        type: "number",
        min: 0,
        max: 1,
        step: 0.01,
        value: Number((n[f] ?? 0).toFixed(2)),
        disabled: r,
        onChange: (d) => s(f, Number(d.currentTarget.value)),
        className: pb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const fj = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], n1 = [0, 0, 0, 0, 0, 0, 0, 0], dj = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function hj({ value: n, onChange: a, deploymentId: r }) {
  const s = n.mode ?? "none", o = mj(n.vector), f = n.emotionAlpha ?? 1, [d, m] = E.useState([]), [p, h] = E.useState(null), [g, v] = E.useState(""), [S, T] = E.useState(""), [R, C] = E.useState(0), [N, z] = E.useState(!1), H = E.useRef(!0);
  E.useEffect(() => (H.current = !0, () => {
    H.current = !1;
  }), []), E.useEffect(() => {
    let P = !1;
    return h(null), GM(r).then((ae) => {
      P || m(T0(ae.presets));
    }).catch((ae) => {
      P || h(rd(ae));
    }), () => {
      P = !0;
    };
  }, [r]);
  const B = E.useMemo(
    () => d.find((P) => P.presetId === S) ?? null,
    [d, S]
  ), Q = (P) => {
    a({ ...n, mode: P });
  }, $ = (P) => {
    a({ ...n, mode: "emotion_vector", vector: P }), B && !yj(B.vector, P) && T("");
  }, de = (P) => {
    const ae = Math.max(0, Math.min(1, Number.isFinite(P) ? P : 1));
    a({ ...n, emotionAlpha: ae });
  }, ie = (P) => {
    const ae = d.find((fe) => fe.presetId === P);
    ae && (T(P), a({ ...n, mode: "emotion_vector", vector: ae.vector }), C((fe) => fe + 1));
  }, j = async () => {
    const P = g.trim();
    if (P) {
      z(!0), h(null);
      try {
        const ae = await PM(r, P, o);
        if (!H.current) return;
        m((fe) => T0([ae, ...fe.filter((re) => re.presetId !== ae.presetId)])), T(ae.presetId), v(""), C((fe) => fe + 1);
      } catch (ae) {
        H.current && h(rd(ae));
      } finally {
        H.current && z(!1);
      }
    }
  }, I = async (P) => {
    const ae = d;
    m((fe) => fe.filter((re) => re.presetId !== P)), S === P && T("");
    try {
      await kM(P);
    } catch (fe) {
      H.current && (m(ae), h(rd(fe)));
    }
  }, te = () => $(n1), F = () => {
    const P = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    $(P), C((ae) => ae + 1);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: XM, children: [
    /* @__PURE__ */ b.jsxs("div", { className: FM, children: [
      /* @__PURE__ */ b.jsx(oj, { vector: o, pulseKey: R }),
      /* @__PURE__ */ b.jsx("span", { className: Pf, children: gj(s, B?.presetName) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: KM, children: [
      /* @__PURE__ */ b.jsx("div", { className: QM, role: "radiogroup", "aria-label": "Emotion source", children: fj.map((P) => /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === P.id,
          className: s === P.id ? $M : ZM,
          onClick: () => Q(P.id),
          children: P.label
        },
        P.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
        /* @__PURE__ */ b.jsxs("div", { className: WM, children: [
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: eA,
              value: S,
              onChange: (P) => ie(P.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— Load preset —" }),
                d.map((P) => /* @__PURE__ */ b.jsx("option", { value: P.presetId, children: P.presetName }, P.presetId))
              ]
            }
          ),
          S && /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: nA,
              onClick: () => void I(S),
              disabled: N,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: av, onClick: te, children: "Reset" }),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: av, onClick: F, children: "Random" })
        ] }),
        /* @__PURE__ */ b.jsx(cj, { vector: o, onChange: $ }),
        /* @__PURE__ */ b.jsxs(
          "form",
          {
            className: lA,
            onSubmit: (P) => {
              P.preventDefault(), j();
            },
            children: [
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  type: "text",
                  className: rA,
                  value: g,
                  placeholder: "Name current vector",
                  onChange: (P) => v(P.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ b.jsx(
                "button",
                {
                  type: "submit",
                  className: tA,
                  disabled: N || g.trim().length === 0,
                  children: "Save preset"
                }
              )
            ]
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { children: [
        /* @__PURE__ */ b.jsxs("span", { className: Pf, children: [
          "Qwen template — use ",
          "{seg}",
          " for the line text."
        ] }),
        /* @__PURE__ */ b.jsx(
          "textarea",
          {
            className: iA,
            value: n.qwenTemplate ?? "",
            onChange: (P) => a({ ...n, mode: "qwen_template", qwenTemplate: P.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ b.jsx("p", { className: Pf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ b.jsxs("div", { className: aA, children: [
        /* @__PURE__ */ b.jsx("span", { className: hb, children: "alpha" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: f,
            className: mb,
            onChange: (P) => de(Number(P.currentTarget.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            min: 0,
            max: 1,
            step: 0.01,
            value: Number(f.toFixed(2)),
            className: pb,
            onChange: (P) => de(Number(P.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ b.jsx("p", { className: sA, children: p }),
      /* @__PURE__ */ b.jsx("pre", { className: oA, children: dj })
    ] })
  ] });
}
function mj(n) {
  return !n || n.length !== 8 ? [...n1] : n.map((a) => pj(a));
}
function pj(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function yj(n, a) {
  for (let r = 0; r < 8; r += 1) {
    const s = n[r] ?? 0, o = a[r] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function T0(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function gj(n, a) {
  switch (n) {
    case "none":
      return "No global emotion — mappings and inline overrides still apply.";
    case "audio_ref":
      return "Audio reference — wire per-character refs in the mapping editor.";
    case "emotion_vector":
      return a ? `Vector preset: ${a}` : "Free-form vector.";
    case "qwen_template":
      return "Qwen template drives emotion for every utterance.";
  }
}
function rd(n) {
  return n instanceof Ni ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
const sd = [
  {
    id: "use_cache",
    label: "Use cache",
    help: "Read hits, write misses. Fastest on re-runs."
  },
  {
    id: "force_regenerate",
    label: "Force regenerate",
    help: "Always synthesize; still writes to cache."
  },
  {
    id: "read_only_cache",
    label: "Read-only cache",
    help: "Read hits, synthesize misses without writing back."
  }
];
function vj({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: f,
  generation: d,
  onGenerationChange: m
}) {
  const p = (g, v) => {
    m({ ...d, [g]: v });
  }, h = sd.find((g) => g.id === o) ?? sd[0];
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Format" }),
      /* @__PURE__ */ b.jsxs("select", { value: n, onChange: (g) => a(g.currentTarget.value), children: [
        /* @__PURE__ */ b.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ b.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ b.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Speed" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "range",
          min: 0.5,
          max: 2,
          step: 0.05,
          value: r,
          onChange: (g) => s(Number(g.currentTarget.value))
        }
      ),
      /* @__PURE__ */ b.jsxs("output", { children: [
        r.toFixed(2),
        "×"
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: Xa,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ b.jsx("span", { className: $t, children: "Cache" }),
          sd.map((g) => /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o === g.id,
              className: o === g.id ? Jo : as,
              onClick: () => f(g.id),
              title: g.help,
              children: g.label
            },
            g.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ b.jsx("p", { className: $t, "aria-live": "polite", children: h.help }),
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Temperature" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 2,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (g) => p("temperature", Number(g.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Top-p" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (g) => p("top_p", Number(g.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Seed" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "number",
          defaultValue: 42,
          onChange: (g) => p("seed", Number(g.currentTarget.value))
        }
      )
    ] })
  ] });
}
const bj = ["cancelled", "failed", "partial"];
function Sj({ runs: n, deploymentId: a }) {
  const r = Wr(), [s, o] = E.useState(null), [f, d] = E.useState(null);
  if (n.length === 0)
    return /* @__PURE__ */ b.jsx("p", { className: $t, children: "No runs yet." });
  const m = async (p) => {
    o(p), d(null);
    try {
      const { runId: h } = await ob(a, p);
      r(`/${a}/runs/${h}`);
    } catch (h) {
      d(Tj(h));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    f && /* @__PURE__ */ b.jsx("p", { className: hu, children: f }),
    /* @__PURE__ */ b.jsx("ul", { className: pd, children: n.map((p) => {
      const h = bj.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ b.jsxs("li", { children: [
        /* @__PURE__ */ b.jsxs(ns, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        h && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          " ",
          /* @__PURE__ */ b.jsx("span", { className: xj(p.status), children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: as,
              disabled: s === p.runId,
              onClick: () => void m(p.runId),
              children: s === p.runId ? "Resuming…" : "Resume"
            }
          )
        ] })
      ] }, p.runId);
    }) })
  ] });
}
function xj(n) {
  return n === "failed" ? ah : nh;
}
function Tj(n) {
  return n instanceof Ni ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function Ej(n) {
  const [a, r] = E.useState("idle"), [s, o] = E.useState(null), [f, d] = E.useState(/* @__PURE__ */ new Map()), [m, p] = E.useState(null), [h, g] = E.useState(null), v = E.useRef(null);
  E.useEffect(() => () => {
    v.current?.();
  }, []);
  const S = E.useCallback(async () => {
    r("starting"), p(null), d(/* @__PURE__ */ new Map()), g(null);
    try {
      const z = await JR(n.deploymentId, n.createPayload);
      o(z.runId), r("running"), v.current?.(), v.current = eM(
        n.deploymentId,
        z.runId,
        (H) => Rj(H, d, r, g, n.deploymentId, z.runId),
        () => r("error")
      );
    } catch (z) {
      r("error"), p(E0(z));
    }
  }, [n.deploymentId, n.createPayload]), T = E.useCallback(async () => {
    if (s)
      try {
        await IR(n.deploymentId, s);
      } catch (z) {
        p(E0(z));
      }
  }, [n.deploymentId, s]), R = Array.from(f.values()).sort((z, H) => z.globalIndex - H.globalIndex), C = a === "starting" || a === "running", N = h?.status === "partial";
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("div", { className: Xa, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Jo,
          disabled: !n.canGenerate || C,
          onClick: S,
          children: a === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: ub,
          disabled: !C,
          onClick: T,
          children: "Cancel"
        }
      )
    ] }),
    m && /* @__PURE__ */ b.jsx("div", { className: hu, children: m }),
    h?.exportArtifactRef && /* @__PURE__ */ b.jsx(
      "a",
      {
        href: `/api/v1/artifacts/${h.exportArtifactRef}/download`,
        download: !0,
        className: as,
        children: "Download ZIP"
      }
    ),
    N && /* @__PURE__ */ b.jsx("div", { className: cb, children: "Partial run — click Generate again to resume (cache-hit completed segments)." }),
    R.length > 0 && /* @__PURE__ */ b.jsxs("table", { className: VM, children: [
      /* @__PURE__ */ b.jsx("thead", { children: /* @__PURE__ */ b.jsxs("tr", { children: [
        /* @__PURE__ */ b.jsx("th", { className: Pa, children: "#" }),
        /* @__PURE__ */ b.jsx("th", { className: Pa, children: "Status" }),
        /* @__PURE__ */ b.jsx("th", { className: Pa, children: "Duration" }),
        /* @__PURE__ */ b.jsx("th", { className: Pa, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ b.jsx("tbody", { children: R.map((z) => /* @__PURE__ */ b.jsxs("tr", { className: UM, children: [
        /* @__PURE__ */ b.jsx("td", { className: Pa, children: z.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ b.jsx("td", { className: Pa, children: /* @__PURE__ */ b.jsx("span", { className: Mj(z.status), children: z.status }) }),
        /* @__PURE__ */ b.jsx("td", { className: Pa, children: z.durationMs ? `${z.durationMs} ms` : "—" }),
        /* @__PURE__ */ b.jsx("td", { className: Pa, children: z.failureCategory ?? "" })
      ] }, z.globalIndex)) })
    ] })
  ] });
}
async function Rj(n, a, r, s, o, f) {
  switch (n.type) {
    case "segment_started":
      a((d) => {
        const m = new Map(d);
        return m.set(n.globalIndex, { globalIndex: n.globalIndex, status: "running" }), m;
      });
      return;
    case "segment_completed":
      a((d) => {
        const m = new Map(d);
        return m.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "completed",
          durationMs: n.durationMs
        }), m;
      });
      return;
    case "segment_failed":
      a((d) => {
        const m = new Map(d);
        return m.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "failed",
          failureCategory: n.failureCategory
        }), m;
      });
      return;
    case "run_terminal":
      r("terminal");
      try {
        const d = await sb(o, f);
        s(d);
      } catch {
      }
      return;
  }
}
function Mj(n) {
  switch (n) {
    case "completed":
      return db;
    case "running":
      return nh;
    case "failed":
      return ah;
    default:
      return fb;
  }
}
function E0(n) {
  return n instanceof Ni || n instanceof Error ? n.message : "unknown error";
}
function Aj(n) {
  const a = Wr(), { attributions: r, unresolved: s, predictedFilenames: o } = E.useMemo(
    () => Cj(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  );
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: LM,
        value: n.value,
        onChange: (f) => n.onChange(f.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ b.jsxs("div", { className: hu, role: "alert", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      s.map((f) => /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: as,
          onClick: () => a(
            `/${n.deploymentId}/mappings/new?character=${encodeURIComponent(f)}`
          ),
          children: [
            "Create mapping for ",
            f
          ]
        },
        f
      ))
    ] }),
    r.length > 0 && /* @__PURE__ */ b.jsxs("div", { children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Parsed lines" }),
      /* @__PURE__ */ b.jsx("ul", { className: pd, children: r.map((f) => /* @__PURE__ */ b.jsxs("li", { children: [
        "#",
        f.lineNumber.toString().padStart(3, "0"),
        " [",
        f.character,
        "] ",
        f.text,
        !f.hasMapping && f.character !== "Narrator" && " — unresolved"
      ] }, f.lineNumber)) })
    ] }),
    o.length > 0 && /* @__PURE__ */ b.jsxs("div", { children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Predicted filenames" }),
      /* @__PURE__ */ b.jsx("ul", { className: pd, children: o.map((f) => /* @__PURE__ */ b.jsx("li", { children: f }, f)) })
    ] })
  ] });
}
function Cj(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], f = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), m = [], p = n.split(/\r?\n/);
  let h = 0;
  return p.forEach((g, v) => {
    const S = g.trim();
    if (!S) return;
    const T = v + 1, R = S.match(s);
    let C = "Narrator", N = S;
    if (R && R.groups) {
      const Q = (R.groups.body ?? "").trim(), $ = (R.groups.rest ?? "").trim();
      C = ((Q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", N = $;
    }
    h += 1;
    const z = C.toLowerCase(), H = (d.get(z) ?? 0) + 1;
    d.set(z, H);
    const B = C === "Narrator" || r.has(z);
    B || f.add(C), o.push({ lineNumber: T, character: C, text: N, hasMapping: B }), m.push(
      `${h.toString().padStart(3, "0")}_${wj(C)}_${H.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(f),
    predictedFilenames: m
  };
}
function wj(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function Dj(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [];
  return /* @__PURE__ */ b.jsxs("div", { className: jM, children: [
    /* @__PURE__ */ b.jsxs("header", { className: OM, children: [
      /* @__PURE__ */ b.jsx("h1", { className: _M, children: n.deployment.displayName }),
      n.header
    ] }),
    a && /* @__PURE__ */ b.jsxs("section", { className: cb, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ b.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: NM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: jr, "aria-label": "Dialogue script", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Nr, children: "Script" }),
        n.scriptEditor
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: jr, "aria-label": "Generation settings", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Nr, children: "Settings" }),
        n.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: zM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: jr, "aria-label": "Emotion panel", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Nr, children: "Emotion" }),
        n.emotionPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: jr, "aria-label": "Run", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Nr, children: "Run" }),
        n.runPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: jr, "aria-label": "Recent runs", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Nr, children: "Recent runs" }),
        n.historyPanel
      ] })
    ] })
  ] });
}
function jj() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = ts(), [o, f] = E.useState(""), [d, m] = E.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [p, h] = E.useState(n.defaultSpeedFactor ?? 1), [g, v] = E.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, T] = E.useState({}), [R, C] = E.useState("use_cache"), N = E.useMemo(
    () => ({
      script: o,
      outputFormat: d,
      speedFactor: p,
      globalEmotion: g,
      generation: S,
      cachePolicy: R
    }),
    [o, d, p, g, S, R]
  ), z = E.useMemo(() => {
    const H = /* @__PURE__ */ new Map();
    for (const B of a)
      H.set(B.characterName.toLowerCase(), B);
    return H;
  }, [a]);
  return /* @__PURE__ */ b.jsx(
    Dj,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ b.jsx(HM, { deployment: n }),
      scriptEditor: /* @__PURE__ */ b.jsx(
        Aj,
        {
          value: o,
          onChange: f,
          outputFormat: d,
          mappings: z,
          deploymentId: n.deploymentId
        }
      ),
      emotionPanel: /* @__PURE__ */ b.jsx(
        hj,
        {
          value: g,
          onChange: v,
          deploymentId: n.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ b.jsx(
        vj,
        {
          outputFormat: d,
          onOutputFormatChange: m,
          speedFactor: p,
          onSpeedFactorChange: h,
          cachePolicy: R,
          onCachePolicyChange: C,
          generation: S,
          onGenerationChange: T
        }
      ),
      runPanel: /* @__PURE__ */ b.jsx(
        Ej,
        {
          deploymentId: n.deploymentId,
          createPayload: N,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ b.jsx(Sj, { runs: r, deploymentId: n.deploymentId })
    }
  );
}
var Nj = "jq2zyb3", zj = "jq2zyb4", Oj = "jq2zyb5", _j = "jq2zyb6", Lj = "jq2zyb7", Vj = "jq2zyb8", Uj = "jq2zyb9", Bj = "jq2zyba", Hj = "jq2zybb", qj = { queued: "jq2zybd jq2zybc", running: "jq2zybe jq2zybc", completed: "jq2zybf jq2zybc", failed: "jq2zybg jq2zybc", cancelled: "jq2zybh jq2zybc", partial: "jq2zybi jq2zybc" }, Yj = "jq2zybj", Gj = "jq2zybk", Pj = "jq2zybl", kj = "jq2zybm", Xj = "jq2zybn jq2zybm", Fj = "jq2zybo", Kj = "jq2zybp", Qj = "jq2zybq", Zj = "jq2zybr", $j = "jq2zybs", Jj = "jq2zybt", Ij = "jq2zybu", Wj = "jq2zybv", eN = "jq2zybw", tN = "jq2zybx", nN = "jq2zyby", aN = "jq2zybz", iN = "jq2zyb10", lN = "jq2zyb11", rN = "jq2zyb12", sN = "jq2zyb13", oN = "jq2zyb14", uN = "jq2zyb15", cN = "jq2zyb16", fN = { queued: "jq2zyb18 jq2zyb17", running: "jq2zyb19 jq2zyb17", completed: "jq2zyb1a jq2zyb17", failed: "jq2zyb1b jq2zyb17", cancelled: "jq2zyb1c jq2zyb17" }, dN = "jq2zyb1d", hN = "jq2zyb1e", mN = "jq2zyb1f";
const pN = ["cancelled", "failed", "partial"];
function yN() {
  const { run: n } = ts(), a = Wr(), [r, s] = E.useState(!1), [o, f] = E.useState(null), d = E.useMemo(() => gN(n), [n]), m = pN.includes(n.status) && n.kind === "batch", p = async () => {
    if (n.deploymentId) {
      s(!0), f(null);
      try {
        const { runId: h } = await ob(n.deploymentId, n.runId);
        a(`/${n.deploymentId}/runs/${h}`);
      } catch (h) {
        f(SN(h));
      } finally {
        s(!1);
      }
    }
  };
  return /* @__PURE__ */ b.jsx("main", { className: Nj, children: /* @__PURE__ */ b.jsxs("div", { className: zj, children: [
    /* @__PURE__ */ b.jsxs("header", { className: Oj, children: [
      /* @__PURE__ */ b.jsxs("p", { className: _j, children: [
        n.deploymentId ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx(ns, { to: `/${n.deploymentId}/recipe`, className: Lj, children: "← Back to recipe" }),
          /* @__PURE__ */ b.jsx("span", { className: Vj, children: "·" })
        ] }) : null,
        /* @__PURE__ */ b.jsx("span", { children: "Run detail" })
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: Uj, children: [
        /* @__PURE__ */ b.jsxs("h1", { className: Bj, children: [
          vN(n.kind),
          /* @__PURE__ */ b.jsx("span", { className: Hj, children: n.runId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: qj[n.status], children: n.status })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: Yj, "aria-label": "Run statistics", children: [
      /* @__PURE__ */ b.jsx(Vo, { label: "Format", value: n.outputFormat.toUpperCase(), mono: !0 }),
      /* @__PURE__ */ b.jsx(Vo, { label: "Speed", value: `${n.speedFactor.toFixed(2)}×`, mono: !0 }),
      /* @__PURE__ */ b.jsx(
        Vo,
        {
          label: "Completed",
          value: `${d.completed} / ${d.total}`,
          progress: d.total > 0 ? d.completed / d.total : 0
        }
      ),
      /* @__PURE__ */ b.jsx(
        Vo,
        {
          label: "Cache hit",
          value: `${d.cacheRatio}%`,
          progress: d.cacheRatio / 100
        }
      )
    ] }),
    m && /* @__PURE__ */ b.jsxs("section", { className: Kj, "aria-label": "Resume run", children: [
      /* @__PURE__ */ b.jsxs("div", { className: Qj, children: [
        /* @__PURE__ */ b.jsx("p", { className: Zj, children: d.failed > 0 ? `${d.failed} line${d.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
        /* @__PURE__ */ b.jsx("p", { className: $j, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Jj,
          disabled: r,
          onClick: () => void p(),
          children: r ? "Resuming…" : d.failed > 0 ? "Rerun failed lines" : "Resume run"
        }
      ),
      o && /* @__PURE__ */ b.jsx("p", { className: Ij, role: "alert", children: o })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: Wj, "aria-label": "Utterances", children: [
      /* @__PURE__ */ b.jsxs("div", { className: eN, children: [
        /* @__PURE__ */ b.jsx("h2", { className: tN, children: "Utterances" }),
        d.completed > 0 && /* @__PURE__ */ b.jsxs("span", { className: nN, children: [
          /* @__PURE__ */ b.jsx("span", { className: aN, children: d.cached }),
          "/",
          d.completed,
          " from cache"
        ] })
      ] }),
      /* @__PURE__ */ b.jsx("ul", { className: iN, children: n.utterances.map((h) => /* @__PURE__ */ b.jsxs("li", { className: lN, children: [
        /* @__PURE__ */ b.jsxs("span", { className: rN, children: [
          "#",
          h.globalIndex.toString().padStart(3, "0")
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: sN, title: h.characterDisplay, children: h.characterDisplay }),
        /* @__PURE__ */ b.jsx("span", { className: oN, title: h.text, children: h.text }),
        /* @__PURE__ */ b.jsxs("span", { className: uN, children: [
          h.cacheHit && /* @__PURE__ */ b.jsx("span", { className: cN, children: "cached" }),
          h.durationMs ? /* @__PURE__ */ b.jsx("span", { children: bN(h.durationMs) }) : null,
          /* @__PURE__ */ b.jsx("span", { className: fN[h.status], children: h.status })
        ] })
      ] }, h.utteranceId)) })
    ] }),
    n.exportArtifactRef && /* @__PURE__ */ b.jsx("div", { className: dN, children: /* @__PURE__ */ b.jsxs(
      "a",
      {
        href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
        download: !0,
        className: hN,
        children: [
          "Download ZIP ",
          /* @__PURE__ */ b.jsx("span", { className: mN, children: "↓" })
        ]
      }
    ) })
  ] }) });
}
function Vo({ label: n, value: a, mono: r, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: Gj,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ b.jsx("span", { className: Pj, children: n }),
        /* @__PURE__ */ b.jsx("span", { className: r ? Xj : kj, children: a }),
        o !== void 0 && /* @__PURE__ */ b.jsx("span", { className: Fj, "aria-hidden": "true" })
      ]
    }
  );
}
function gN(n) {
  const a = n.utterances.length, r = n.utterances.filter((d) => d.status === "completed").length, s = n.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = n.utterances.filter((d) => d.cacheHit).length, f = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: f };
}
function vN(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function bN(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function SN(n) {
  return n instanceof Ni ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
var xN = "pcphqj2", TN = "pcphqj3", EN = "pcphqj4", RN = "pcphqj5", MN = "pcphqj6", AN = "pcphqj7", CN = "pcphqj8", wN = "pcphqj9", R0 = "pcphqja", DN = "pcphqjb", M0 = "pcphqjc", jN = "pcphqjd", NN = "pcphqje", zN = "pcphqjf pcphqje", ON = "pcphqjg", _N = "pcphqjh", LN = "pcphqji", VN = "pcphqjj", UN = "pcphqjk pcphqjj", BN = "pcphqjl pcphqjj", HN = "pcphqjm pcphqjj", qN = "pcphqjn", od = "pcphqjo", ud = "pcphqjp", YN = "pcphqjq", GN = "pcphqjr", PN = "pcphqjs", kN = "pcphqjt", XN = "pcphqju";
function FN() {
  const [n, a] = E.useState(null), [r, s] = E.useState(null);
  return E.useEffect(() => {
    let o = !1;
    const f = async () => {
      try {
        const m = await rt("/runtime/queue");
        o || (a(m.entries), s(null));
      } catch (m) {
        o || s(m instanceof Error ? m.message : "Unknown error");
      }
    };
    f();
    const d = setInterval(() => void f(), 3e3);
    return () => {
      o = !0, clearInterval(d);
    };
  }, []), /* @__PURE__ */ b.jsx("main", { className: xN, children: /* @__PURE__ */ b.jsxs("div", { className: TN, children: [
    /* @__PURE__ */ b.jsxs("header", { className: EN, children: [
      /* @__PURE__ */ b.jsx("p", { className: RN, children: "Runtime" }),
      /* @__PURE__ */ b.jsxs("div", { className: MN, children: [
        /* @__PURE__ */ b.jsx("h1", { className: AN, children: "Queue" }),
        /* @__PURE__ */ b.jsx("span", { className: CN, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: wN, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ b.jsx("section", { className: XN, role: "alert", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ b.jsx("section", { className: R0, children: /* @__PURE__ */ b.jsxs("div", { className: YN, children: [
      /* @__PURE__ */ b.jsx("span", { className: GN, children: "○" }),
      /* @__PURE__ */ b.jsx("p", { className: PN, children: "Queue is quiet" }),
      /* @__PURE__ */ b.jsx("p", { className: kN, children: "No runs are pending. Start a synthesis from a deployment's recipe surface." })
    ] }) }) : /* @__PURE__ */ b.jsx("section", { className: R0, "aria-label": "Queued runs", children: /* @__PURE__ */ b.jsx("ul", { className: DN, children: n.map((o) => {
      const f = o.position === 1;
      return /* @__PURE__ */ b.jsxs(
        "li",
        {
          className: f ? `${M0} ${jN}` : M0,
          children: [
            /* @__PURE__ */ b.jsx("span", { className: f ? zN : NN, children: o.position }),
            /* @__PURE__ */ b.jsxs("span", { className: ON, children: [
              /* @__PURE__ */ b.jsx("span", { className: _N, children: o.deploymentName ?? o.deploymentId }),
              /* @__PURE__ */ b.jsx("span", { className: LN, children: o.runId })
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: KN(o.kind), children: QN(o.kind) }),
            /* @__PURE__ */ b.jsx("span", { className: qN, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: od, children: ZN(o.etaSeconds) }),
              /* @__PURE__ */ b.jsx("span", { className: ud, children: "eta" })
            ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: od, children: o.utteranceTotal }),
              /* @__PURE__ */ b.jsx("span", { className: ud, children: "lines" })
            ] }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: od, children: "—" }),
              /* @__PURE__ */ b.jsx("span", { className: ud, children: "pending" })
            ] }) })
          ]
        },
        o.runId
      );
    }) }) })
  ] }) });
}
function KN(n) {
  switch (n) {
    case "batch":
      return UN;
    case "test_line":
      return BN;
    case "resume":
      return HN;
    default:
      return VN;
  }
}
function QN(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function ZN(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function $N() {
  const { deploymentId: n, prefillCharacterName: a } = ts(), r = Wr(), [s, o] = E.useState(a), [f, d] = E.useState(""), [m, p] = E.useState("none"), [h, g] = E.useState(!1), [v, S] = E.useState(null), T = E.useRef(null);
  E.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const R = async (C) => {
    C.preventDefault(), g(!0), S(null);
    try {
      await rb(n, {
        characterName: s,
        speakerVoiceAssetId: f,
        defaultEmotionMode: m
      }), r(`/${n}/recipe`);
    } catch (N) {
      S(N instanceof Error ? N.message : "failed");
    } finally {
      g(!1);
    }
  };
  return /* @__PURE__ */ b.jsxs("main", { children: [
    /* @__PURE__ */ b.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ b.jsxs("form", { onSubmit: R, children: [
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ b.jsx(
          "input",
          {
            ref: T,
            value: s,
            onChange: (C) => o(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ b.jsx(
          "input",
          {
            value: f,
            onChange: (C) => d(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ b.jsxs("select", { value: m, onChange: (C) => p(C.currentTarget.value), children: [
          /* @__PURE__ */ b.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ b.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ b.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ b.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ b.jsx("button", { type: "submit", disabled: h, children: "Save mapping" }),
      v && /* @__PURE__ */ b.jsx("p", { role: "alert", children: v })
    ] })
  ] });
}
var JN = "go9vi12", IN = "go9vi13", WN = "go9vi14", ez = "go9vi15", tz = "go9vi16", nz = "go9vi17", az = "go9vi18", iz = "go9vi19", lz = "go9vi1a go9vi19", rz = "go9vi1b", sz = "go9vi1c", oz = "go9vi1d", uz = "go9vi1e", cz = "go9vi1f", fz = "go9vi1g", dz = "go9vi1h", hz = "go9vi1i", mz = "go9vi1j", pz = "go9vi1k", Hd = "go9vi1l", xi = "go9vi1m", Lr = "go9vi1n", Ml = "go9vi1o", yz = "go9vi1p go9vi1o", gz = "go9vi1q", vz = "go9vi1r go9vi1q", bz = "go9vi1s go9vi1q", Sz = "go9vi1t", xz = "go9vi1u", Tz = "go9vi1v", Ez = "go9vi1w", Rz = "go9vi1x", Mz = "go9vi1y", a1 = "go9vi1z", i1 = "go9vi110", A0 = "go9vi111 go9vi110", Az = "go9vi112 go9vi110", Cz = "go9vi113", wz = "go9vi114", Dz = "go9vi115", jz = "go9vi116 go9vi1o", Nz = "go9vi117", zz = "go9vi118";
const Oz = ["none", "audio_ref", "vector_preset", "qwen_template"];
function _z() {
  const { deployment: n, mappings: a, voiceAssets: r } = ts(), [s, o] = E.useState(a), [f, d] = E.useState(r), [m, p] = E.useState(
    a[0]?.mappingId ?? null
  ), [h, g] = E.useState(""), [v, S] = E.useState(null), [T, R] = E.useState(null), C = E.useMemo(() => {
    const F = /* @__PURE__ */ new Map();
    for (const P of f) F.set(P.voiceAssetId, P);
    return F;
  }, [f]), N = E.useMemo(() => {
    const F = h.trim().toLowerCase();
    return F ? s.filter((P) => P.characterName.toLowerCase().includes(F)) : s;
  }, [s, h]), z = E.useMemo(
    () => s.find((F) => F.mappingId === m) ?? null,
    [s, m]
  );
  E.useEffect(() => {
    o(a), d(r), p(a[0]?.mappingId ?? null);
  }, [a, r]), E.useEffect(() => {
    if (!T) return;
    const F = setTimeout(() => R(null), 2600);
    return () => clearTimeout(F);
  }, [T]);
  const H = E.useCallback(async () => {
    const F = await md(n.deploymentId);
    d(F.voiceAssets);
  }, [n.deploymentId]), B = E.useCallback(
    (F) => {
      o(
        (P) => P.map((ae) => ae.mappingId === m ? { ...ae, ...F } : ae)
      );
    },
    [m]
  ), Q = E.useCallback(
    async (F) => {
      if (!z) return;
      const P = z;
      try {
        const ae = await FR(z.mappingId, F);
        o((fe) => fe.map((re) => re.mappingId === ae.mappingId ? ae : re));
      } catch (ae) {
        o(
          (fe) => fe.map((re) => re.mappingId === P.mappingId ? P : re)
        ), S(Ti(ae));
      }
    },
    [z]
  ), $ = E.useCallback(async () => {
    const F = f[0];
    if (!F) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const P = Yz(s), ae = await rb(n.deploymentId, {
        characterName: P,
        speakerVoiceAssetId: F.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((fe) => [...fe, ae]), p(ae.mappingId);
    } catch (P) {
      S(Ti(P));
    }
  }, [n.deploymentId, f, s]), de = E.useCallback(async () => {
    if (z && confirm(`Deactivate mapping for ${z.characterName}?`))
      try {
        await KR(n.deploymentId, z.mappingId), o((F) => F.filter((P) => P.mappingId !== z.mappingId)), p(null), R(`Mapping for ${z.characterName} deactivated.`);
      } catch (F) {
        S(Ti(F));
      }
  }, [n.deploymentId, z]), ie = E.useCallback(
    async (F, P, ae) => {
      try {
        const fe = await tM(n.deploymentId, F, P, ae);
        return d((re) => [fe, ...re]), R(`${fe.displayName} uploaded.`), fe;
      } catch (fe) {
        return S(Ti(fe)), null;
      }
    },
    [n.deploymentId]
  ), j = E.useCallback(async () => {
    try {
      const F = await QR(n.deploymentId);
      Kz(F, `${n.deploymentId}-mappings.json`), R("Mappings exported to JSON.");
    } catch (F) {
      S(Ti(F));
    }
  }, [n.deploymentId]), I = E.useCallback(
    async (F, P) => {
      try {
        const ae = await ZR(
          n.deploymentId,
          F.mappings,
          P
        );
        R(
          `Imported ${ae.created.length} • skipped ${ae.skipped.length} • replaced ${ae.replaced.length}.`
        );
        const fe = await md(n.deploymentId);
        d(fe.voiceAssets);
      } catch (ae) {
        S(Ti(ae));
      }
    },
    [n.deploymentId]
  ), te = E.useCallback(
    async (F, P) => {
      if (!z) return;
      const ae = F.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        const fe = await WR(n.deploymentId, {
          line: ae,
          outputFormat: P
        });
        R(`Test-line queued • run ${fe.runId.slice(0, 12)}… • ETA ${Math.round(fe.etaSeconds)}s`);
      } catch (fe) {
        S(Ti(fe));
      }
    },
    [n.deploymentId, z]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: JN, children: [
    /* @__PURE__ */ b.jsxs("aside", { className: IN, "aria-label": "Character mappings", children: [
      /* @__PURE__ */ b.jsxs("header", { className: WN, children: [
        /* @__PURE__ */ b.jsxs("div", { children: [
          /* @__PURE__ */ b.jsx("h1", { className: ez, children: "Mappings" }),
          /* @__PURE__ */ b.jsxs("span", { className: tz, children: [
            s.length,
            " active · ",
            f.length,
            " voice",
            f.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ b.jsx("button", { type: "button", className: i1, onClick: $, children: "+ Add" })
      ] }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "search",
          className: nz,
          placeholder: "Search characters",
          value: h,
          onChange: (F) => g(F.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ b.jsx(qz, { onExport: j, onImport: I }),
      /* @__PURE__ */ b.jsx("div", { className: az, children: N.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: cz, children: "No mappings yet. Click Add to create one." }) : N.map((F) => {
        const P = C.get(F.speakerVoiceAssetId), ae = F.mappingId === m;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            className: ae ? lz : iz,
            onClick: () => p(F.mappingId),
            "aria-pressed": ae,
            children: [
              /* @__PURE__ */ b.jsx("span", { className: rz, "aria-hidden": "true", children: Gz(F.characterName) }),
              /* @__PURE__ */ b.jsxs("span", { className: sz, children: [
                /* @__PURE__ */ b.jsx("span", { className: oz, children: F.characterName }),
                /* @__PURE__ */ b.jsxs("span", { className: uz, children: [
                  F.defaultEmotionMode,
                  " · ",
                  P?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          F.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: fz, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ b.jsx(W2, { children: T && /* @__PURE__ */ b.jsx(
        Oh.div,
        {
          className: wz,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }),
      v && /* @__PURE__ */ b.jsx("div", { className: Cz, role: "alert", children: v }),
      z ? /* @__PURE__ */ b.jsx(
        Vz,
        {
          mapping: z,
          voiceAssets: f,
          onNameChange: (F) => {
            B({ characterName: F });
          },
          onNameBlur: (F) => {
            F !== z.characterName && F.trim() && Q({ characterName: F.trim() });
          },
          onSpeakerChange: (F) => {
            B({ speakerVoiceAssetId: F }), Q({ speakerVoiceAssetId: F });
          },
          onModeChange: (F) => {
            B({ defaultEmotionMode: F }), Q({ defaultEmotionMode: F });
          },
          onQwenChange: (F) => {
            B({ defaultQwenTemplate: F });
          },
          onQwenBlur: (F) => {
            Q({ defaultQwenTemplate: F });
          },
          onSpeedChange: (F) => {
            B({ defaultSpeedFactor: F });
          },
          onSpeedCommit: (F) => {
            Q({ defaultSpeedFactor: F });
          },
          onEmotionVoiceChange: (F) => {
            const P = F || null;
            B({ defaultEmotionVoiceAssetId: P }), Q({ defaultEmotionVoiceAssetId: P });
          },
          onDelete: de,
          onUploadVoice: async (F, P, ae) => {
            const fe = await ie(F, P, ae);
            return fe && ae === "speaker" && (B({ speakerVoiceAssetId: fe.voiceAssetId }), Q({ speakerVoiceAssetId: fe.voiceAssetId })), await H(), fe;
          },
          onTestLine: te
        }
      ) : /* @__PURE__ */ b.jsx(Lz, {})
    ] })
  ] });
}
function Lz() {
  return /* @__PURE__ */ b.jsx("div", { className: Hd, style: { textAlign: "center", padding: "4rem" }, children: /* @__PURE__ */ b.jsxs("p", { style: { fontFamily: "var(--font)", fontSize: "1.1rem", color: "var(--text-muted)" }, children: [
    "Select a character on the left, or click ",
    /* @__PURE__ */ b.jsx("strong", { children: "+ Add" }),
    " to create one."
  ] }) });
}
function Vz(n) {
  const { mapping: a, voiceAssets: r } = n, s = r.find((h) => h.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = r.find((h) => h.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [f, d] = E.useState(""), [m, p] = E.useState("mp3");
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs("header", { className: dz, children: [
      /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsx("span", { className: mz, children: "Character" }),
        /* @__PURE__ */ b.jsx("h2", { className: hz, children: a.characterName })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: a1, children: /* @__PURE__ */ b.jsx("button", { type: "button", className: Az, onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Dz, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "text",
          className: jz,
          placeholder: `[${a.characterName}] This is a test of the voice.`,
          value: f,
          onChange: (h) => d(h.currentTarget.value),
          "aria-label": "Test-line text"
        }
      ),
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          className: Ml,
          value: m,
          onChange: (h) => p(h.currentTarget.value),
          "aria-label": "Test-line output format",
          children: [
            /* @__PURE__ */ b.jsx("option", { value: "mp3", children: "mp3" }),
            /* @__PURE__ */ b.jsx("option", { value: "wav", children: "wav" }),
            /* @__PURE__ */ b.jsx("option", { value: "flac", children: "flac" })
          ]
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: i1,
          onClick: () => n.onTestLine(f, m),
          children: "Test this line"
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: pz, children: [
      /* @__PURE__ */ b.jsxs("div", { className: Hd, children: [
        /* @__PURE__ */ b.jsxs("label", { className: Lr, children: [
          /* @__PURE__ */ b.jsx("span", { className: xi, children: "Character name" }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              className: Ml,
              value: a.characterName,
              onChange: (h) => n.onNameChange(h.currentTarget.value),
              onBlur: (h) => n.onNameBlur(h.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: Lr, children: [
          /* @__PURE__ */ b.jsx("span", { className: xi, children: "Emotion mode" }),
          /* @__PURE__ */ b.jsx(
            "select",
            {
              className: Ml,
              value: a.defaultEmotionMode,
              onChange: (h) => n.onModeChange(h.currentTarget.value),
              children: Oz.map((h) => /* @__PURE__ */ b.jsx("option", { value: h, children: Pz(h) }, h))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { className: Lr, children: [
          /* @__PURE__ */ b.jsxs("span", { className: xi, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ b.jsx(
            "textarea",
            {
              className: yz,
              value: a.defaultQwenTemplate ?? "",
              onChange: (h) => n.onQwenChange(h.currentTarget.value),
              onBlur: (h) => n.onQwenBlur(h.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ b.jsxs("label", { className: Lr, children: [
          /* @__PURE__ */ b.jsx("span", { className: xi, children: "Emotion reference" }),
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: Ml,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (h) => n.onEmotionVoiceChange(h.currentTarget.value),
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— none —" }),
                r.map((h) => /* @__PURE__ */ b.jsxs("option", { value: h.voiceAssetId, children: [
                  h.displayName,
                  " · ",
                  h.kind
                ] }, h.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: Lr, children: [
          /* @__PURE__ */ b.jsxs("span", { className: xi, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (h) => n.onSpeedChange(Number(h.currentTarget.value)),
              onMouseUp: (h) => n.onSpeedCommit(Number(h.currentTarget.value)),
              onTouchEnd: (h) => n.onSpeedCommit(Number(h.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: Hd, children: [
        /* @__PURE__ */ b.jsx("span", { className: xi, children: "Speaker reference" }),
        /* @__PURE__ */ b.jsx(
          Uz,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ b.jsx(C0, { voice: s }),
        /* @__PURE__ */ b.jsx(
          Hz,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (h) => n.onUploadVoice(h, h.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx("span", { className: xi, children: "Emotion reference voice" }),
          /* @__PURE__ */ b.jsx(C0, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function Uz({
  value: n,
  voices: a,
  onChange: r
}) {
  return /* @__PURE__ */ b.jsxs(
    "select",
    {
      className: Ml,
      value: n,
      onChange: (s) => r(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ b.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ b.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function C0({ voice: n }) {
  const a = kz(n.durationMs ?? null);
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("div", { className: Sz, children: [
      /* @__PURE__ */ b.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ b.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ b.jsx("span", { children: Xz(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ b.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ b.jsxs("div", { className: xz, children: [
      /* @__PURE__ */ b.jsx("div", { className: Tz, children: /* @__PURE__ */ b.jsx(
        Oh.div,
        {
          className: Ez,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }),
      a && /* @__PURE__ */ b.jsx(
        "span",
        {
          className: a.level === "warn" ? Rz : Mz,
          children: a.message
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(Bz, { seed: n.contentSha256 })
  ] });
}
function Bz({ seed: n }) {
  const a = E.useMemo(() => Fz(n, 48), [n]);
  return /* @__PURE__ */ b.jsx("div", { className: Nz, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ b.jsx(
    "span",
    {
      className: zz,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    s
  )) });
}
function Hz({
  label: n,
  onFile: a
}) {
  const [r, s] = E.useState(!1), [o, f] = E.useState(!1), d = E.useRef(null), m = E.useCallback(
    async (p) => {
      f(!0);
      try {
        await a(p);
      } finally {
        f(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: o ? bz : r ? vz : gz,
      onDragOver: (p) => {
        p.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (p) => {
        p.preventDefault(), s(!1);
        const h = p.dataTransfer.files?.[0];
        h && m(h);
      },
      onClick: () => d.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (p) => {
        (p.key === "Enter" || p.key === " ") && (p.preventDefault(), d.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            ref: d,
            type: "file",
            accept: "audio/*",
            onChange: (p) => {
              const h = p.currentTarget.files?.[0];
              h && m(h), p.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : n
      ]
    }
  );
}
function qz({
  onExport: n,
  onImport: a
}) {
  const [r, s] = E.useState("error"), o = E.useRef(null);
  return /* @__PURE__ */ b.jsxs("div", { className: a1, children: [
    /* @__PURE__ */ b.jsx("button", { type: "button", className: A0, onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        ref: o,
        type: "file",
        accept: "application/json,.json",
        style: { display: "none" },
        onChange: async (f) => {
          const d = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!d)
            try {
              const m = await d.text(), p = JSON.parse(m);
              a(p, r);
            } catch {
              alert("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ b.jsx("button", { type: "button", className: A0, onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ b.jsxs(
      "select",
      {
        className: Ml,
        value: r,
        onChange: (f) => s(f.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ b.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ b.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ b.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function Yz(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = n.length + 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function Gz(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function Pz(n) {
  switch (n) {
    case "none":
      return "None";
    case "audio_ref":
      return "Audio reference";
    case "vector_preset":
      return "Vector preset";
    case "qwen_template":
      return "Qwen template";
  }
}
function kz(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function Xz(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function Fz(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function Kz(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ti(n) {
  return n instanceof Ni || n instanceof Error ? n.message : "unknown error";
}
function Qz() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await XR();
        return { deployments: n };
      },
      Component: xM
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = vl(n, "deploymentId");
        return WT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = vl(n, "deploymentId"), [r, { mappings: s }, { runs: o }, f] = await Promise.all([
          tv(a),
          nv(a),
          $R(a, { limit: 10 }),
          nM(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: f };
      },
      Component: jj
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = vl(n, "deploymentId"), r = vl(n, "runId");
        return { run: await sb(a, r) };
      },
      Component: yN
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = vl(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          tv(a),
          nv(a),
          md(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: _z
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const r = vl(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: r,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: $N
    },
    {
      path: "/runtime/queue",
      Component: FN
    }
  ];
}
function vl(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const qd = "emotion-tts-app", Zz = "ext-event";
class $z extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = RT.createRoot(this), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  set hostContext(a) {
    this.ctx = a, this.paint();
  }
  get hostContext() {
    return this.ctx;
  }
  paint() {
    if (!this.root || !this.isConnected) return;
    const a = this.resolveInitialEntry(), r = rR(Qz(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ b.jsx(E.StrictMode, { children: /* @__PURE__ */ b.jsx(oR, { router: r }) })
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
      new CustomEvent(Zz, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function Jz() {
  typeof customElements > "u" || customElements.get(qd) || customElements.define(qd, $z);
}
typeof customElements < "u" && !customElements.get(qd) && Jz();
export {
  Jz as register
};
//# sourceMappingURL=emotion-tts.js.map
