function pT(n, a) {
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
function yT(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var zf = { exports: {} }, Cr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bg;
function gT() {
  if (bg) return Cr;
  bg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(s, o, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      f = {};
      for (var h in o)
        h !== "key" && (f[h] = o[h]);
    } else f = o;
    return o = f.ref, {
      $$typeof: n,
      type: s,
      key: d,
      ref: o !== void 0 ? o : null,
      props: f
    };
  }
  return Cr.Fragment = a, Cr.jsx = r, Cr.jsxs = r, Cr;
}
var Sg;
function vT() {
  return Sg || (Sg = 1, zf.exports = gT()), zf.exports;
}
var b = vT(), Of = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xg;
function bT() {
  if (xg) return Ae;
  xg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function T(C) {
    return C === null || typeof C != "object" ? null : (C = S && C[S] || C["@@iterator"], typeof C == "function" ? C : null);
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
  }, w = Object.assign, N = {};
  function _(C, X, ae) {
    this.props = C, this.context = X, this.refs = N, this.updater = ae || R;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(C, X) {
    if (typeof C != "object" && typeof C != "function" && C != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, C, X, "setState");
  }, _.prototype.forceUpdate = function(C) {
    this.updater.enqueueForceUpdate(this, C, "forceUpdate");
  };
  function q() {
  }
  q.prototype = _.prototype;
  function L(C, X, ae) {
    this.props = C, this.context = X, this.refs = N, this.updater = ae || R;
  }
  var K = L.prototype = new q();
  K.constructor = L, w(K, _.prototype), K.isPureReactComponent = !0;
  var I = Array.isArray;
  function $() {
  }
  var ee = { H: null, A: null, T: null, S: null }, j = Object.prototype.hasOwnProperty;
  function W(C, X, ae) {
    var oe = ae.ref;
    return {
      $$typeof: n,
      type: C,
      key: X,
      ref: oe !== void 0 ? oe : null,
      props: ae
    };
  }
  function te(C, X) {
    return W(C.type, X, C.props);
  }
  function P(C) {
    return typeof C == "object" && C !== null && C.$$typeof === n;
  }
  function k(C) {
    var X = { "=": "=0", ":": "=2" };
    return "$" + C.replace(/[=:]/g, function(ae) {
      return X[ae];
    });
  }
  var le = /\/+/g;
  function de(C, X) {
    return typeof C == "object" && C !== null && C.key != null ? k("" + C.key) : X.toString(36);
  }
  function se(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (typeof C.status == "string" ? C.then($, $) : (C.status = "pending", C.then(
          function(X) {
            C.status === "pending" && (C.status = "fulfilled", C.value = X);
          },
          function(X) {
            C.status === "pending" && (C.status = "rejected", C.reason = X);
          }
        )), C.status) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function B(C, X, ae, oe, Te) {
    var Me = typeof C;
    (Me === "undefined" || Me === "boolean") && (C = null);
    var De = !1;
    if (C === null) De = !0;
    else
      switch (Me) {
        case "bigint":
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case n:
            case a:
              De = !0;
              break;
            case g:
              return De = C._init, B(
                De(C._payload),
                X,
                ae,
                oe,
                Te
              );
          }
      }
    if (De)
      return Te = Te(C), De = oe === "" ? "." + de(C, 0) : oe, I(Te) ? (ae = "", De != null && (ae = De.replace(le, "$&/") + "/"), B(Te, X, ae, "", function(ei) {
        return ei;
      })) : Te != null && (P(Te) && (Te = te(
        Te,
        ae + (Te.key == null || C && C.key === Te.key ? "" : ("" + Te.key).replace(
          le,
          "$&/"
        ) + "/") + De
      )), X.push(Te)), 1;
    De = 0;
    var mt = oe === "" ? "." : oe + ":";
    if (I(C))
      for (var Ze = 0; Ze < C.length; Ze++)
        oe = C[Ze], Me = mt + de(oe, Ze), De += B(
          oe,
          X,
          ae,
          Me,
          Te
        );
    else if (Ze = T(C), typeof Ze == "function")
      for (C = Ze.call(C), Ze = 0; !(oe = C.next()).done; )
        oe = oe.value, Me = mt + de(oe, Ze++), De += B(
          oe,
          X,
          ae,
          Me,
          Te
        );
    else if (Me === "object") {
      if (typeof C.then == "function")
        return B(
          se(C),
          X,
          ae,
          oe,
          Te
        );
      throw X = String(C), Error(
        "Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function ne(C, X, ae) {
    if (C == null) return C;
    var oe = [], Te = 0;
    return B(C, oe, "", "", function(Me) {
      return X.call(ae, Me, Te++);
    }), oe;
  }
  function re(C) {
    if (C._status === -1) {
      var X = C._result;
      X = X(), X.then(
        function(ae) {
          (C._status === 0 || C._status === -1) && (C._status = 1, C._result = ae);
        },
        function(ae) {
          (C._status === 0 || C._status === -1) && (C._status = 2, C._result = ae);
        }
      ), C._status === -1 && (C._status = 0, C._result = X);
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var fe = typeof reportError == "function" ? reportError : function(C) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var X = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof C == "object" && C !== null && typeof C.message == "string" ? String(C.message) : String(C),
        error: C
      });
      if (!window.dispatchEvent(X)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", C);
      return;
    }
    console.error(C);
  }, Re = {
    map: ne,
    forEach: function(C, X, ae) {
      ne(
        C,
        function() {
          X.apply(this, arguments);
        },
        ae
      );
    },
    count: function(C) {
      var X = 0;
      return ne(C, function() {
        X++;
      }), X;
    },
    toArray: function(C) {
      return ne(C, function(X) {
        return X;
      }) || [];
    },
    only: function(C) {
      if (!P(C))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return C;
    }
  };
  return Ae.Activity = v, Ae.Children = Re, Ae.Component = _, Ae.Fragment = r, Ae.Profiler = o, Ae.PureComponent = L, Ae.StrictMode = s, Ae.Suspense = p, Ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ee, Ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(C) {
      return ee.H.useMemoCache(C);
    }
  }, Ae.cache = function(C) {
    return function() {
      return C.apply(null, arguments);
    };
  }, Ae.cacheSignal = function() {
    return null;
  }, Ae.cloneElement = function(C, X, ae) {
    if (C == null)
      throw Error(
        "The argument must be a React element, but you passed " + C + "."
      );
    var oe = w({}, C.props), Te = C.key;
    if (X != null)
      for (Me in X.key !== void 0 && (Te = "" + X.key), X)
        !j.call(X, Me) || Me === "key" || Me === "__self" || Me === "__source" || Me === "ref" && X.ref === void 0 || (oe[Me] = X[Me]);
    var Me = arguments.length - 2;
    if (Me === 1) oe.children = ae;
    else if (1 < Me) {
      for (var De = Array(Me), mt = 0; mt < Me; mt++)
        De[mt] = arguments[mt + 2];
      oe.children = De;
    }
    return W(C.type, Te, oe);
  }, Ae.createContext = function(C) {
    return C = {
      $$typeof: d,
      _currentValue: C,
      _currentValue2: C,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, C.Provider = C, C.Consumer = {
      $$typeof: f,
      _context: C
    }, C;
  }, Ae.createElement = function(C, X, ae) {
    var oe, Te = {}, Me = null;
    if (X != null)
      for (oe in X.key !== void 0 && (Me = "" + X.key), X)
        j.call(X, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (Te[oe] = X[oe]);
    var De = arguments.length - 2;
    if (De === 1) Te.children = ae;
    else if (1 < De) {
      for (var mt = Array(De), Ze = 0; Ze < De; Ze++)
        mt[Ze] = arguments[Ze + 2];
      Te.children = mt;
    }
    if (C && C.defaultProps)
      for (oe in De = C.defaultProps, De)
        Te[oe] === void 0 && (Te[oe] = De[oe]);
    return W(C, Me, Te);
  }, Ae.createRef = function() {
    return { current: null };
  }, Ae.forwardRef = function(C) {
    return { $$typeof: h, render: C };
  }, Ae.isValidElement = P, Ae.lazy = function(C) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: C },
      _init: re
    };
  }, Ae.memo = function(C, X) {
    return {
      $$typeof: m,
      type: C,
      compare: X === void 0 ? null : X
    };
  }, Ae.startTransition = function(C) {
    var X = ee.T, ae = {};
    ee.T = ae;
    try {
      var oe = C(), Te = ee.S;
      Te !== null && Te(ae, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then($, fe);
    } catch (Me) {
      fe(Me);
    } finally {
      X !== null && ae.types !== null && (X.types = ae.types), ee.T = X;
    }
  }, Ae.unstable_useCacheRefresh = function() {
    return ee.H.useCacheRefresh();
  }, Ae.use = function(C) {
    return ee.H.use(C);
  }, Ae.useActionState = function(C, X, ae) {
    return ee.H.useActionState(C, X, ae);
  }, Ae.useCallback = function(C, X) {
    return ee.H.useCallback(C, X);
  }, Ae.useContext = function(C) {
    return ee.H.useContext(C);
  }, Ae.useDebugValue = function() {
  }, Ae.useDeferredValue = function(C, X) {
    return ee.H.useDeferredValue(C, X);
  }, Ae.useEffect = function(C, X) {
    return ee.H.useEffect(C, X);
  }, Ae.useEffectEvent = function(C) {
    return ee.H.useEffectEvent(C);
  }, Ae.useId = function() {
    return ee.H.useId();
  }, Ae.useImperativeHandle = function(C, X, ae) {
    return ee.H.useImperativeHandle(C, X, ae);
  }, Ae.useInsertionEffect = function(C, X) {
    return ee.H.useInsertionEffect(C, X);
  }, Ae.useLayoutEffect = function(C, X) {
    return ee.H.useLayoutEffect(C, X);
  }, Ae.useMemo = function(C, X) {
    return ee.H.useMemo(C, X);
  }, Ae.useOptimistic = function(C, X) {
    return ee.H.useOptimistic(C, X);
  }, Ae.useReducer = function(C, X, ae) {
    return ee.H.useReducer(C, X, ae);
  }, Ae.useRef = function(C) {
    return ee.H.useRef(C);
  }, Ae.useState = function(C) {
    return ee.H.useState(C);
  }, Ae.useSyncExternalStore = function(C, X, ae) {
    return ee.H.useSyncExternalStore(
      C,
      X,
      ae
    );
  }, Ae.useTransition = function() {
    return ee.H.useTransition();
  }, Ae.version = "19.2.5", Ae;
}
var Tg;
function Gd() {
  return Tg || (Tg = 1, Of.exports = bT()), Of.exports;
}
var E = Gd();
const ST = /* @__PURE__ */ yT(E), xT = /* @__PURE__ */ pT({
  __proto__: null,
  default: ST
}, [E]);
var _f = { exports: {} }, wr = {}, Lf = { exports: {} }, Vf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eg;
function TT() {
  return Eg || (Eg = 1, (function(n) {
    function a(B, ne) {
      var re = B.length;
      B.push(ne);
      e: for (; 0 < re; ) {
        var fe = re - 1 >>> 1, Re = B[fe];
        if (0 < o(Re, ne))
          B[fe] = ne, B[re] = Re, re = fe;
        else break e;
      }
    }
    function r(B) {
      return B.length === 0 ? null : B[0];
    }
    function s(B) {
      if (B.length === 0) return null;
      var ne = B[0], re = B.pop();
      if (re !== ne) {
        B[0] = re;
        e: for (var fe = 0, Re = B.length, C = Re >>> 1; fe < C; ) {
          var X = 2 * (fe + 1) - 1, ae = B[X], oe = X + 1, Te = B[oe];
          if (0 > o(ae, re))
            oe < Re && 0 > o(Te, ae) ? (B[fe] = Te, B[oe] = re, fe = oe) : (B[fe] = ae, B[X] = re, fe = X);
          else if (oe < Re && 0 > o(Te, re))
            B[fe] = Te, B[oe] = re, fe = oe;
          else break e;
        }
      }
      return ne;
    }
    function o(B, ne) {
      var re = B.sortIndex - ne.sortIndex;
      return re !== 0 ? re : B.id - ne.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, h = d.now();
      n.unstable_now = function() {
        return d.now() - h;
      };
    }
    var p = [], m = [], g = 1, v = null, S = 3, T = !1, R = !1, w = !1, N = !1, _ = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function K(B) {
      for (var ne = r(m); ne !== null; ) {
        if (ne.callback === null) s(m);
        else if (ne.startTime <= B)
          s(m), ne.sortIndex = ne.expirationTime, a(p, ne);
        else break;
        ne = r(m);
      }
    }
    function I(B) {
      if (w = !1, K(B), !R)
        if (r(p) !== null)
          R = !0, $ || ($ = !0, k());
        else {
          var ne = r(m);
          ne !== null && se(I, ne.startTime - B);
        }
    }
    var $ = !1, ee = -1, j = 5, W = -1;
    function te() {
      return N ? !0 : !(n.unstable_now() - W < j);
    }
    function P() {
      if (N = !1, $) {
        var B = n.unstable_now();
        W = B;
        var ne = !0;
        try {
          e: {
            R = !1, w && (w = !1, q(ee), ee = -1), T = !0;
            var re = S;
            try {
              t: {
                for (K(B), v = r(p); v !== null && !(v.expirationTime > B && te()); ) {
                  var fe = v.callback;
                  if (typeof fe == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var Re = fe(
                      v.expirationTime <= B
                    );
                    if (B = n.unstable_now(), typeof Re == "function") {
                      v.callback = Re, K(B), ne = !0;
                      break t;
                    }
                    v === r(p) && s(p), K(B);
                  } else s(p);
                  v = r(p);
                }
                if (v !== null) ne = !0;
                else {
                  var C = r(m);
                  C !== null && se(
                    I,
                    C.startTime - B
                  ), ne = !1;
                }
              }
              break e;
            } finally {
              v = null, S = re, T = !1;
            }
            ne = void 0;
          }
        } finally {
          ne ? k() : $ = !1;
        }
      }
    }
    var k;
    if (typeof L == "function")
      k = function() {
        L(P);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), de = le.port2;
      le.port1.onmessage = P, k = function() {
        de.postMessage(null);
      };
    } else
      k = function() {
        _(P, 0);
      };
    function se(B, ne) {
      ee = _(function() {
        B(n.unstable_now());
      }, ne);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, n.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : j = 0 < B ? Math.floor(1e3 / B) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(B) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var ne = 3;
          break;
        default:
          ne = S;
      }
      var re = S;
      S = ne;
      try {
        return B();
      } finally {
        S = re;
      }
    }, n.unstable_requestPaint = function() {
      N = !0;
    }, n.unstable_runWithPriority = function(B, ne) {
      switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          B = 3;
      }
      var re = S;
      S = B;
      try {
        return ne();
      } finally {
        S = re;
      }
    }, n.unstable_scheduleCallback = function(B, ne, re) {
      var fe = n.unstable_now();
      switch (typeof re == "object" && re !== null ? (re = re.delay, re = typeof re == "number" && 0 < re ? fe + re : fe) : re = fe, B) {
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
      return Re = re + Re, B = {
        id: g++,
        callback: ne,
        priorityLevel: B,
        startTime: re,
        expirationTime: Re,
        sortIndex: -1
      }, re > fe ? (B.sortIndex = re, a(m, B), r(p) === null && B === r(m) && (w ? (q(ee), ee = -1) : w = !0, se(I, re - fe))) : (B.sortIndex = Re, a(p, B), R || T || (R = !0, $ || ($ = !0, k()))), B;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(B) {
      var ne = S;
      return function() {
        var re = S;
        S = ne;
        try {
          return B.apply(this, arguments);
        } finally {
          S = re;
        }
      };
    };
  })(Vf)), Vf;
}
var Rg;
function ET() {
  return Rg || (Rg = 1, Lf.exports = TT()), Lf.exports;
}
var Uf = { exports: {} }, Vt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mg;
function RT() {
  if (Mg) return Vt;
  Mg = 1;
  var n = Gd();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        m += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function f(p, m, g) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: m,
      implementation: g
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return Vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Vt.createPortal = function(p, m) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return f(p, m, null, g);
  }, Vt.flushSync = function(p) {
    var m = d.T, g = s.p;
    try {
      if (d.T = null, s.p = 2, p) return p();
    } finally {
      d.T = m, s.p = g, s.d.f();
    }
  }, Vt.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(p, m));
  }, Vt.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, Vt.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var g = m.as, v = h(g, m.crossOrigin), S = typeof m.integrity == "string" ? m.integrity : void 0, T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      g === "style" ? s.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: T
        }
      ) : g === "script" && s.d.X(p, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: T,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, Vt.preinitModule = function(p, m) {
    if (typeof p == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var g = h(
            m.as,
            m.crossOrigin
          );
          s.d.M(p, {
            crossOrigin: g,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && s.d.M(p);
  }, Vt.preload = function(p, m) {
    if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var g = m.as, v = h(g, m.crossOrigin);
      s.d.L(p, g, {
        crossOrigin: v,
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
  }, Vt.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var g = h(m.as, m.crossOrigin);
        s.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: g,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(p);
  }, Vt.requestFormReset = function(p) {
    s.d.r(p);
  }, Vt.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, Vt.useFormState = function(p, m, g) {
    return d.H.useFormState(p, m, g);
  }, Vt.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Vt.version = "19.2.5", Vt;
}
var Ag;
function MT() {
  if (Ag) return Uf.exports;
  Ag = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Uf.exports = RT(), Uf.exports;
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
var Cg;
function AT() {
  if (Cg) return wr;
  Cg = 1;
  var n = ET(), a = Gd(), r = MT();
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
  function h(e) {
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
  function m(e) {
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
  var v = Object.assign, S = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), q = Symbol.for("react.consumer"), L = Symbol.for("react.context"), K = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), W = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), P = Symbol.iterator;
  function k(e) {
    return e === null || typeof e != "object" ? null : (e = P && e[P] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function de(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case _:
        return "Profiler";
      case N:
        return "StrictMode";
      case I:
        return "Suspense";
      case $:
        return "SuspenseList";
      case W:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case R:
          return "Portal";
        case L:
          return e.displayName || "Context";
        case q:
          return (e._context.displayName || "Context") + ".Consumer";
        case K:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ee:
          return t = e.displayName || null, t !== null ? t : de(e.type) || "Memo";
        case j:
          t = e._payload, e = e._init;
          try {
            return de(e(t));
          } catch {
          }
      }
    return null;
  }
  var se = Array.isArray, B = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, fe = [], Re = -1;
  function C(e) {
    return { current: e };
  }
  function X(e) {
    0 > Re || (e.current = fe[Re], fe[Re] = null, Re--);
  }
  function ae(e, t) {
    Re++, fe[Re] = e.current, e.current = t;
  }
  var oe = C(null), Te = C(null), Me = C(null), De = C(null);
  function mt(e, t) {
    switch (ae(Me, t), ae(Te, e), ae(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Gy(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Gy(t), e = ky(t, e);
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
    X(oe), ae(oe, e);
  }
  function Ze() {
    X(oe), X(Te), X(Me);
  }
  function ei(e) {
    e.memoizedState !== null && ae(De, e);
    var t = oe.current, i = ky(t, e.type);
    t !== i && (ae(Te, e), ae(oe, i));
  }
  function _i(e) {
    Te.current === e && (X(oe), X(Te)), De.current === e && (X(De), Er._currentValue = re);
  }
  var _l, Tt;
  function kt(e) {
    if (_l === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        _l = t && t[1] || "", Tt = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _l + e + Tt;
  }
  var Li = !1;
  function Ll(e, t) {
    if (!e || Li) return "";
    Li = !0;
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
`), U = x.split(`
`);
        for (u = l = 0; l < M.length && !M[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < U.length && !U[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === M.length || u === U.length)
          for (l = M.length - 1, u = U.length - 1; 1 <= l && 0 <= u && M[l] !== U[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (M[l] !== U[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || M[l] !== U[u]) {
                  var F = `
` + M[l].replace(" at new ", " at ");
                  return e.displayName && F.includes("<anonymous>") && (F = F.replace("<anonymous>", e.displayName)), F;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Li = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? kt(i) : "";
  }
  function Xn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return kt(e.type);
      case 16:
        return kt("Lazy");
      case 13:
        return e.child !== t && t !== null ? kt("Suspense Fallback") : kt("Suspense");
      case 19:
        return kt("SuspenseList");
      case 0:
      case 15:
        return Ll(e.type, !1);
      case 11:
        return Ll(e.type.render, !1);
      case 1:
        return Ll(e.type, !0);
      case 31:
        return kt("Activity");
      default:
        return "";
    }
  }
  function cs(e) {
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
  var Vl = Object.prototype.hasOwnProperty, Vi = n.unstable_scheduleCallback, Ul = n.unstable_cancelCallback, Su = n.unstable_shouldYield, xu = n.unstable_requestPaint, Bt = n.unstable_now, Fn = n.unstable_getCurrentPriorityLevel, pa = n.unstable_ImmediatePriority, Bl = n.unstable_UserBlockingPriority, ya = n.unstable_NormalPriority, En = n.unstable_LowPriority, sn = n.unstable_IdlePriority, fs = n.log, Tu = n.unstable_setDisableYieldValue, Kn = null, Ht = null;
  function Mt(e) {
    if (typeof fs == "function" && Tu(e), Ht && typeof Ht.setStrictMode == "function")
      try {
        Ht.setStrictMode(Kn, e);
      } catch {
      }
  }
  var _t = Math.clz32 ? Math.clz32 : Eu, ds = Math.log, hs = Math.LN2;
  function Eu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ds(e) / hs | 0) | 0;
  }
  var ti = 256, Qn = 262144, ni = 4194304;
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
  function Ui(e, t, i) {
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
  function Ru(e, t) {
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
  function Hl() {
    var e = ni;
    return ni <<= 1, (ni & 62914560) === 0 && (ni = 4194304), e;
  }
  function va(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function On(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ms(e, t, i, l, u, c) {
    var y = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var x = e.entanglements, M = e.expirationTimes, U = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var F = 31 - _t(i), Z = 1 << F;
      x[F] = 0, M[F] = -1;
      var Y = U[F];
      if (Y !== null)
        for (U[F] = null, F = 0; F < Y.length; F++) {
          var G = Y[F];
          G !== null && (G.lane &= -536870913);
        }
      i &= ~Z;
    }
    l !== 0 && ps(e, l, 0), c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(y & ~t));
  }
  function ps(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - _t(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function ys(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var l = 31 - _t(i), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), i &= ~u;
    }
  }
  function A(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : z(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function z(e) {
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
  function H(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function J() {
    var e = ne.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : dg(e.type));
  }
  function ie(e, t) {
    var i = ne.p;
    try {
      return ne.p = e, t();
    } finally {
      ne.p = i;
    }
  }
  var pe = Math.random().toString(36).slice(2), ue = "__reactFiber$" + pe, ce = "__reactProps$" + pe, ge = "__reactContainer$" + pe, he = "__reactEvents$" + pe, xe = "__reactListeners$" + pe, be = "__reactHandles$" + pe, He = "__reactResources$" + pe, je = "__reactMarker$" + pe;
  function $e(e) {
    delete e[ue], delete e[ce], delete e[he], delete e[xe], delete e[be];
  }
  function Xe(e) {
    var t = e[ue];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[ge] || i[ue]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = $y(e); e !== null; ) {
            if (i = e[ue]) return i;
            e = $y(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function it(e) {
    if (e = e[ue] || e[ge]) {
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
  var ai = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ln = {}, ii = {};
  function Bi(e) {
    return Vl.call(ii, e) ? !0 : Vl.call(Ln, e) ? !1 : ai.test(e) ? ii[e] = !0 : (Ln[e] = !0, !1);
  }
  function Ne(e, t, i) {
    if (Bi(t))
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
  function Hi(e, t, i) {
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
  function qi(e) {
    if (!e._valueTracker) {
      var t = et(e) ? "checked" : "value";
      e._valueTracker = Hi(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function gs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), l = "";
    return e && (l = et(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (t.setValue(e), !0) : !1;
  }
  function vs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var u1 = /[\n"\\]/g;
  function on(e) {
    return e.replace(
      u1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Mu(e, t, i, l, u, c, y, x) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? Au(e, y, yt(t)) : i != null ? Au(e, y, yt(i)) : l != null && e.removeAttribute("value"), u == null && c != null && (e.defaultChecked = !!c), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + yt(x) : e.removeAttribute("name");
  }
  function Vh(e, t, i, l, u, c, y, x) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || i != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        qi(e);
        return;
      }
      i = i != null ? "" + yt(i) : "", t = t != null ? "" + yt(t) : i, x || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = x ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), qi(e);
  }
  function Au(e, t, i) {
    t === "number" && vs(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Yi(e, t, i, l) {
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
  function Uh(e, t, i) {
    if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + yt(i) : "";
  }
  function Bh(e, t, i, l) {
    if (t == null) {
      if (l != null) {
        if (i != null) throw Error(s(92));
        if (se(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        i = l;
      }
      i == null && (i = ""), t = i;
    }
    i = yt(t), e.defaultValue = i, l = e.textContent, l === i && l !== "" && l !== null && (e.value = l), qi(e);
  }
  function Gi(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var c1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Hh(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || c1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function qh(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && Hh(e, u, l);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Hh(e, c, t[c]);
  }
  function Cu(e) {
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
  var f1 = /* @__PURE__ */ new Map([
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
  ]), d1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function bs(e) {
    return d1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Zn() {
  }
  var wu = null;
  function Du(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ki = null, Pi = null;
  function Yh(e) {
    var t = it(e);
    if (t && (e = t.stateNode)) {
      var i = e[ce] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Mu(
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
                var u = l[ce] || null;
                if (!u) throw Error(s(90));
                Mu(
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
              l = i[t], l.form === e.form && gs(l);
          }
          break e;
        case "textarea":
          Uh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && Yi(e, !!i.multiple, t, !1);
      }
    }
  }
  var ju = !1;
  function Gh(e, t, i) {
    if (ju) return e(t, i);
    ju = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (ju = !1, (ki !== null || Pi !== null) && (ro(), ki && (t = ki, e = Pi, Pi = ki = null, Yh(t), e)))
        for (t = 0; t < e.length; t++) Yh(e[t]);
    }
  }
  function ql(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[ce] || null;
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
  var $n = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Nu = !1;
  if ($n)
    try {
      var Yl = {};
      Object.defineProperty(Yl, "passive", {
        get: function() {
          Nu = !0;
        }
      }), window.addEventListener("test", Yl, Yl), window.removeEventListener("test", Yl, Yl);
    } catch {
      Nu = !1;
    }
  var Sa = null, zu = null, Ss = null;
  function kh() {
    if (Ss) return Ss;
    var e, t = zu, i = t.length, l, u = "value" in Sa ? Sa.value : Sa.textContent, c = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[c - l]; l++) ;
    return Ss = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function xs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ts() {
    return !0;
  }
  function Ph() {
    return !1;
  }
  function Pt(e) {
    function t(i, l, u, c, y) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = c, this.target = y, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (i = e[x], this[x] = i ? i(c) : c[x]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Ts : Ph, this.isPropagationStopped = Ph, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Ts);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Ts);
      },
      persist: function() {
      },
      isPersistent: Ts
    }), t;
  }
  var li = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Es = Pt(li), Gl = v({}, li, { view: 0, detail: 0 }), h1 = Pt(Gl), Ou, _u, kl, Rs = v({}, Gl, {
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
    getModifierState: Vu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== kl && (kl && e.type === "mousemove" ? (Ou = e.screenX - kl.screenX, _u = e.screenY - kl.screenY) : _u = Ou = 0, kl = e), Ou);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : _u;
    }
  }), Xh = Pt(Rs), m1 = v({}, Rs, { dataTransfer: 0 }), p1 = Pt(m1), y1 = v({}, Gl, { relatedTarget: 0 }), Lu = Pt(y1), g1 = v({}, li, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), v1 = Pt(g1), b1 = v({}, li, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), S1 = Pt(b1), x1 = v({}, li, { data: 0 }), Fh = Pt(x1), T1 = {
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
  }, E1 = {
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
  }, R1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function M1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = R1[e]) ? !!t[e] : !1;
  }
  function Vu() {
    return M1;
  }
  var A1 = v({}, Gl, {
    key: function(e) {
      if (e.key) {
        var t = T1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = xs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? E1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Vu,
    charCode: function(e) {
      return e.type === "keypress" ? xs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? xs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), C1 = Pt(A1), w1 = v({}, Rs, {
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
  }), Kh = Pt(w1), D1 = v({}, Gl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vu
  }), j1 = Pt(D1), N1 = v({}, li, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), z1 = Pt(N1), O1 = v({}, Rs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), _1 = Pt(O1), L1 = v({}, li, {
    newState: 0,
    oldState: 0
  }), V1 = Pt(L1), U1 = [9, 13, 27, 32], Uu = $n && "CompositionEvent" in window, Pl = null;
  $n && "documentMode" in document && (Pl = document.documentMode);
  var B1 = $n && "TextEvent" in window && !Pl, Qh = $n && (!Uu || Pl && 8 < Pl && 11 >= Pl), Zh = " ", $h = !1;
  function Ih(e, t) {
    switch (e) {
      case "keyup":
        return U1.indexOf(t.keyCode) !== -1;
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
  function Jh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Xi = !1;
  function H1(e, t) {
    switch (e) {
      case "compositionend":
        return Jh(t);
      case "keypress":
        return t.which !== 32 ? null : ($h = !0, Zh);
      case "textInput":
        return e = t.data, e === Zh && $h ? null : e;
      default:
        return null;
    }
  }
  function q1(e, t) {
    if (Xi)
      return e === "compositionend" || !Uu && Ih(e, t) ? (e = kh(), Ss = zu = Sa = null, Xi = !1, e) : null;
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
        return Qh && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Y1 = {
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
  function Wh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Y1[e.type] : t === "textarea";
  }
  function em(e, t, i, l) {
    ki ? Pi ? Pi.push(l) : Pi = [l] : ki = l, t = mo(t, "onChange"), 0 < t.length && (i = new Es(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var Xl = null, Fl = null;
  function G1(e) {
    Vy(e, 0);
  }
  function Ms(e) {
    var t = Oe(e);
    if (gs(t)) return e;
  }
  function tm(e, t) {
    if (e === "change") return t;
  }
  var nm = !1;
  if ($n) {
    var Bu;
    if ($n) {
      var Hu = "oninput" in document;
      if (!Hu) {
        var am = document.createElement("div");
        am.setAttribute("oninput", "return;"), Hu = typeof am.oninput == "function";
      }
      Bu = Hu;
    } else Bu = !1;
    nm = Bu && (!document.documentMode || 9 < document.documentMode);
  }
  function im() {
    Xl && (Xl.detachEvent("onpropertychange", lm), Fl = Xl = null);
  }
  function lm(e) {
    if (e.propertyName === "value" && Ms(Fl)) {
      var t = [];
      em(
        t,
        Fl,
        e,
        Du(e)
      ), Gh(G1, t);
    }
  }
  function k1(e, t, i) {
    e === "focusin" ? (im(), Xl = t, Fl = i, Xl.attachEvent("onpropertychange", lm)) : e === "focusout" && im();
  }
  function P1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ms(Fl);
  }
  function X1(e, t) {
    if (e === "click") return Ms(t);
  }
  function F1(e, t) {
    if (e === "input" || e === "change")
      return Ms(t);
  }
  function K1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Jt = typeof Object.is == "function" ? Object.is : K1;
  function Kl(e, t) {
    if (Jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Vl.call(t, u) || !Jt(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function rm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function sm(e, t) {
    var i = rm(e);
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
      i = rm(i);
    }
  }
  function om(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? om(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function um(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = vs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = vs(e.document);
    }
    return t;
  }
  function qu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Q1 = $n && "documentMode" in document && 11 >= document.documentMode, Fi = null, Yu = null, Ql = null, Gu = !1;
  function cm(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Gu || Fi == null || Fi !== vs(l) || (l = Fi, "selectionStart" in l && qu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ql && Kl(Ql, l) || (Ql = l, l = mo(Yu, "onSelect"), 0 < l.length && (t = new Es(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: l }), t.target = Fi)));
  }
  function ri(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var Ki = {
    animationend: ri("Animation", "AnimationEnd"),
    animationiteration: ri("Animation", "AnimationIteration"),
    animationstart: ri("Animation", "AnimationStart"),
    transitionrun: ri("Transition", "TransitionRun"),
    transitionstart: ri("Transition", "TransitionStart"),
    transitioncancel: ri("Transition", "TransitionCancel"),
    transitionend: ri("Transition", "TransitionEnd")
  }, ku = {}, fm = {};
  $n && (fm = document.createElement("div").style, "AnimationEvent" in window || (delete Ki.animationend.animation, delete Ki.animationiteration.animation, delete Ki.animationstart.animation), "TransitionEvent" in window || delete Ki.transitionend.transition);
  function si(e) {
    if (ku[e]) return ku[e];
    if (!Ki[e]) return e;
    var t = Ki[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in fm)
        return ku[e] = t[i];
    return e;
  }
  var dm = si("animationend"), hm = si("animationiteration"), mm = si("animationstart"), Z1 = si("transitionrun"), $1 = si("transitionstart"), I1 = si("transitioncancel"), pm = si("transitionend"), ym = /* @__PURE__ */ new Map(), Pu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Pu.push("scrollEnd");
  function An(e, t) {
    ym.set(e, t), At(t, [e]);
  }
  var As = typeof reportError == "function" ? reportError : function(e) {
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
  }, un = [], Qi = 0, Xu = 0;
  function Cs() {
    for (var e = Qi, t = Xu = Qi = 0; t < e; ) {
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
      c !== 0 && gm(i, u, c);
    }
  }
  function ws(e, t, i, l) {
    un[Qi++] = e, un[Qi++] = t, un[Qi++] = i, un[Qi++] = l, Xu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Fu(e, t, i, l) {
    return ws(e, t, i, l), Ds(e);
  }
  function oi(e, t) {
    return ws(e, null, null, t), Ds(e);
  }
  function gm(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, c = e.return; c !== null; )
      c.childLanes |= i, l = c.alternate, l !== null && (l.childLanes |= i), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (u = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, u && t !== null && (u = 31 - _t(i), e = c.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), c) : null;
  }
  function Ds(e) {
    if (50 < yr)
      throw yr = 0, tf = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Zi = {};
  function J1(e, t, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Wt(e, t, i, l) {
    return new J1(e, t, i, l);
  }
  function Ku(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function In(e, t) {
    var i = e.alternate;
    return i === null ? (i = Wt(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function vm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function js(e, t, i, l, u, c) {
    var y = 0;
    if (l = e, typeof e == "function") Ku(e) && (y = 1);
    else if (typeof e == "string")
      y = aT(
        e,
        i,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case W:
          return e = Wt(31, i, t, u), e.elementType = W, e.lanes = c, e;
        case w:
          return ui(i.children, u, c, t);
        case N:
          y = 8, u |= 24;
          break;
        case _:
          return e = Wt(12, i, t, u | 2), e.elementType = _, e.lanes = c, e;
        case I:
          return e = Wt(13, i, t, u), e.elementType = I, e.lanes = c, e;
        case $:
          return e = Wt(19, i, t, u), e.elementType = $, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case L:
                y = 10;
                break e;
              case q:
                y = 9;
                break e;
              case K:
                y = 11;
                break e;
              case ee:
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
  function ui(e, t, i, l) {
    return e = Wt(7, e, l, t), e.lanes = i, e;
  }
  function Qu(e, t, i) {
    return e = Wt(6, e, null, t), e.lanes = i, e;
  }
  function bm(e) {
    var t = Wt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Zu(e, t, i) {
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
  var Sm = /* @__PURE__ */ new WeakMap();
  function cn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = Sm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: cs(t)
      }, Sm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: cs(t)
    };
  }
  var $i = [], Ii = 0, Ns = null, Zl = 0, fn = [], dn = 0, xa = null, Vn = 1, Un = "";
  function Jn(e, t) {
    $i[Ii++] = Zl, $i[Ii++] = Ns, Ns = e, Zl = t;
  }
  function xm(e, t, i) {
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
  function $u(e) {
    e.return !== null && (Jn(e, 1), xm(e, 1, 0));
  }
  function Iu(e) {
    for (; e === Ns; )
      Ns = $i[--Ii], $i[Ii] = null, Zl = $i[--Ii], $i[Ii] = null;
    for (; e === xa; )
      xa = fn[--dn], fn[dn] = null, Un = fn[--dn], fn[dn] = null, Vn = fn[--dn], fn[dn] = null;
  }
  function Tm(e, t) {
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
    throw $l(cn(t, e)), Ju;
  }
  function Em(e) {
    var t = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (t[ue] = e, t[ce] = l, i) {
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
        for (i = 0; i < vr.length; i++)
          Le(vr[i], t);
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
        Le("invalid", t), Vh(
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
        Le("invalid", t), Bh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || qy(t.textContent, i) ? (l.popover != null && (Le("beforetoggle", t), Le("toggle", t)), l.onScroll != null && Le("scroll", t), l.onScrollEnd != null && Le("scrollend", t), l.onClick != null && (t.onclick = Zn), t = !0) : t = !1, t || Ea(e, !0);
  }
  function Rm(e) {
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
  function Ji(e) {
    if (e !== wt) return !1;
    if (!Be) return Rm(e), Be = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || gf(e.type, e.memoizedProps)), i = !i), i && tt && Ea(e), Rm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = Zy(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = Zy(e);
    } else
      t === 27 ? (t = tt, Ua(e.type) ? (e = Tf, Tf = null, tt = e) : tt = t) : tt = wt ? pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ci() {
    tt = wt = null, Be = !1;
  }
  function Wu() {
    var e = Ta;
    return e !== null && (Qt === null ? Qt = e : Qt.push.apply(
      Qt,
      e
    ), Ta = null), e;
  }
  function $l(e) {
    Ta === null ? Ta = [e] : Ta.push(e);
  }
  var ec = C(null), fi = null, Wn = null;
  function Ra(e, t, i) {
    ae(ec, t._currentValue), t._currentValue = i;
  }
  function ea(e) {
    e._currentValue = ec.current, X(ec);
  }
  function tc(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function nc(e, t, i, l) {
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
              c.lanes |= i, x = c.alternate, x !== null && (x.lanes |= i), tc(
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
        y.lanes |= i, c = y.alternate, c !== null && (c.lanes |= i), tc(y, i, e), y = null;
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
  function Wi(e, t, i, l) {
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
          Jt(u.pendingProps.value, y.value) || (e !== null ? e.push(x) : e = [x]);
        }
      } else if (u === De.current) {
        if (y = u.alternate, y === null) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Er) : e = [Er]);
      }
      u = u.return;
    }
    e !== null && nc(
      t,
      e,
      i,
      l
    ), t.flags |= 262144;
  }
  function zs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Jt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function di(e) {
    fi = e, Wn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Dt(e) {
    return Mm(fi, e);
  }
  function Os(e, t) {
    return fi === null && di(e), Mm(e, t);
  }
  function Mm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, Wn === null) {
      if (e === null) throw Error(s(308));
      Wn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Wn = Wn.next = t;
    return i;
  }
  var W1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, ex = n.unstable_scheduleCallback, tx = n.unstable_NormalPriority, gt = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ac() {
    return {
      controller: new W1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Il(e) {
    e.refCount--, e.refCount === 0 && ex(tx, function() {
      e.controller.abort();
    });
  }
  var Jl = null, ic = 0, el = 0, tl = null;
  function nx(e, t) {
    if (Jl === null) {
      var i = Jl = [];
      ic = 0, el = of(), tl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return ic++, t.then(Am, Am), t;
  }
  function Am() {
    if (--ic === 0 && Jl !== null) {
      tl !== null && (tl.status = "fulfilled");
      var e = Jl;
      Jl = null, el = 0, tl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ax(e, t) {
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
  var Cm = B.S;
  B.S = function(e, t) {
    cy = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && nx(e, t), Cm !== null && Cm(e, t);
  };
  var hi = C(null);
  function lc() {
    var e = hi.current;
    return e !== null ? e : Ie.pooledCache;
  }
  function _s(e, t) {
    t === null ? ae(hi, hi.current) : ae(hi, t.pool);
  }
  function wm() {
    var e = lc();
    return e === null ? null : { parent: gt._currentValue, pool: e };
  }
  var nl = Error(s(460)), rc = Error(s(474)), Ls = Error(s(542)), Vs = { then: function() {
  } };
  function Dm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function jm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(Zn, Zn), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, zm(e), e;
      default:
        if (typeof t.status == "string") t.then(Zn, Zn);
        else {
          if (e = Ie, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, zm(e), e;
        }
        throw pi = t, nl;
    }
  }
  function mi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (pi = i, nl) : i;
    }
  }
  var pi = null;
  function Nm() {
    if (pi === null) throw Error(s(459));
    var e = pi;
    return pi = null, e;
  }
  function zm(e) {
    if (e === nl || e === Ls)
      throw Error(s(483));
  }
  var al = null, Wl = 0;
  function Us(e) {
    var t = Wl;
    return Wl += 1, al === null && (al = []), jm(al, e, t);
  }
  function er(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Bs(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Om(e) {
    function t(O, D) {
      if (e) {
        var V = O.deletions;
        V === null ? (O.deletions = [D], O.flags |= 16) : V.push(D);
      }
    }
    function i(O, D) {
      if (!e) return null;
      for (; D !== null; )
        t(O, D), D = D.sibling;
      return null;
    }
    function l(O) {
      for (var D = /* @__PURE__ */ new Map(); O !== null; )
        O.key !== null ? D.set(O.key, O) : D.set(O.index, O), O = O.sibling;
      return D;
    }
    function u(O, D) {
      return O = In(O, D), O.index = 0, O.sibling = null, O;
    }
    function c(O, D, V) {
      return O.index = V, e ? (V = O.alternate, V !== null ? (V = V.index, V < D ? (O.flags |= 67108866, D) : V) : (O.flags |= 67108866, D)) : (O.flags |= 1048576, D);
    }
    function y(O) {
      return e && O.alternate === null && (O.flags |= 67108866), O;
    }
    function x(O, D, V, Q) {
      return D === null || D.tag !== 6 ? (D = Qu(V, O.mode, Q), D.return = O, D) : (D = u(D, V), D.return = O, D);
    }
    function M(O, D, V, Q) {
      var Se = V.type;
      return Se === w ? F(
        O,
        D,
        V.props.children,
        Q,
        V.key
      ) : D !== null && (D.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === j && mi(Se) === D.type) ? (D = u(D, V.props), er(D, V), D.return = O, D) : (D = js(
        V.type,
        V.key,
        V.props,
        null,
        O.mode,
        Q
      ), er(D, V), D.return = O, D);
    }
    function U(O, D, V, Q) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== V.containerInfo || D.stateNode.implementation !== V.implementation ? (D = Zu(V, O.mode, Q), D.return = O, D) : (D = u(D, V.children || []), D.return = O, D);
    }
    function F(O, D, V, Q, Se) {
      return D === null || D.tag !== 7 ? (D = ui(
        V,
        O.mode,
        Q,
        Se
      ), D.return = O, D) : (D = u(D, V), D.return = O, D);
    }
    function Z(O, D, V) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return D = Qu(
          "" + D,
          O.mode,
          V
        ), D.return = O, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case T:
            return V = js(
              D.type,
              D.key,
              D.props,
              null,
              O.mode,
              V
            ), er(V, D), V.return = O, V;
          case R:
            return D = Zu(
              D,
              O.mode,
              V
            ), D.return = O, D;
          case j:
            return D = mi(D), Z(O, D, V);
        }
        if (se(D) || k(D))
          return D = ui(
            D,
            O.mode,
            V,
            null
          ), D.return = O, D;
        if (typeof D.then == "function")
          return Z(O, Us(D), V);
        if (D.$$typeof === L)
          return Z(
            O,
            Os(O, D),
            V
          );
        Bs(O, D);
      }
      return null;
    }
    function Y(O, D, V, Q) {
      var Se = D !== null ? D.key : null;
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return Se !== null ? null : x(O, D, "" + V, Q);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case T:
            return V.key === Se ? M(O, D, V, Q) : null;
          case R:
            return V.key === Se ? U(O, D, V, Q) : null;
          case j:
            return V = mi(V), Y(O, D, V, Q);
        }
        if (se(V) || k(V))
          return Se !== null ? null : F(O, D, V, Q, null);
        if (typeof V.then == "function")
          return Y(
            O,
            D,
            Us(V),
            Q
          );
        if (V.$$typeof === L)
          return Y(
            O,
            D,
            Os(O, V),
            Q
          );
        Bs(O, V);
      }
      return null;
    }
    function G(O, D, V, Q, Se) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number" || typeof Q == "bigint")
        return O = O.get(V) || null, x(D, O, "" + Q, Se);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case T:
            return O = O.get(
              Q.key === null ? V : Q.key
            ) || null, M(D, O, Q, Se);
          case R:
            return O = O.get(
              Q.key === null ? V : Q.key
            ) || null, U(D, O, Q, Se);
          case j:
            return Q = mi(Q), G(
              O,
              D,
              V,
              Q,
              Se
            );
        }
        if (se(Q) || k(Q))
          return O = O.get(V) || null, F(D, O, Q, Se, null);
        if (typeof Q.then == "function")
          return G(
            O,
            D,
            V,
            Us(Q),
            Se
          );
        if (Q.$$typeof === L)
          return G(
            O,
            D,
            V,
            Os(D, Q),
            Se
          );
        Bs(D, Q);
      }
      return null;
    }
    function me(O, D, V, Q) {
      for (var Se = null, qe = null, ve = D, we = D = 0, Ue = null; ve !== null && we < V.length; we++) {
        ve.index > we ? (Ue = ve, ve = null) : Ue = ve.sibling;
        var Ye = Y(
          O,
          ve,
          V[we],
          Q
        );
        if (Ye === null) {
          ve === null && (ve = Ue);
          break;
        }
        e && ve && Ye.alternate === null && t(O, ve), D = c(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye, ve = Ue;
      }
      if (we === V.length)
        return i(O, ve), Be && Jn(O, we), Se;
      if (ve === null) {
        for (; we < V.length; we++)
          ve = Z(O, V[we], Q), ve !== null && (D = c(
            ve,
            D,
            we
          ), qe === null ? Se = ve : qe.sibling = ve, qe = ve);
        return Be && Jn(O, we), Se;
      }
      for (ve = l(ve); we < V.length; we++)
        Ue = G(
          ve,
          O,
          we,
          V[we],
          Q
        ), Ue !== null && (e && Ue.alternate !== null && ve.delete(
          Ue.key === null ? we : Ue.key
        ), D = c(
          Ue,
          D,
          we
        ), qe === null ? Se = Ue : qe.sibling = Ue, qe = Ue);
      return e && ve.forEach(function(Ga) {
        return t(O, Ga);
      }), Be && Jn(O, we), Se;
    }
    function Ee(O, D, V, Q) {
      if (V == null) throw Error(s(151));
      for (var Se = null, qe = null, ve = D, we = D = 0, Ue = null, Ye = V.next(); ve !== null && !Ye.done; we++, Ye = V.next()) {
        ve.index > we ? (Ue = ve, ve = null) : Ue = ve.sibling;
        var Ga = Y(O, ve, Ye.value, Q);
        if (Ga === null) {
          ve === null && (ve = Ue);
          break;
        }
        e && ve && Ga.alternate === null && t(O, ve), D = c(Ga, D, we), qe === null ? Se = Ga : qe.sibling = Ga, qe = Ga, ve = Ue;
      }
      if (Ye.done)
        return i(O, ve), Be && Jn(O, we), Se;
      if (ve === null) {
        for (; !Ye.done; we++, Ye = V.next())
          Ye = Z(O, Ye.value, Q), Ye !== null && (D = c(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye);
        return Be && Jn(O, we), Se;
      }
      for (ve = l(ve); !Ye.done; we++, Ye = V.next())
        Ye = G(ve, O, we, Ye.value, Q), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? we : Ye.key), D = c(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye);
      return e && ve.forEach(function(mT) {
        return t(O, mT);
      }), Be && Jn(O, we), Se;
    }
    function Qe(O, D, V, Q) {
      if (typeof V == "object" && V !== null && V.type === w && V.key === null && (V = V.props.children), typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case T:
            e: {
              for (var Se = V.key; D !== null; ) {
                if (D.key === Se) {
                  if (Se = V.type, Se === w) {
                    if (D.tag === 7) {
                      i(
                        O,
                        D.sibling
                      ), Q = u(
                        D,
                        V.props.children
                      ), Q.return = O, O = Q;
                      break e;
                    }
                  } else if (D.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === j && mi(Se) === D.type) {
                    i(
                      O,
                      D.sibling
                    ), Q = u(D, V.props), er(Q, V), Q.return = O, O = Q;
                    break e;
                  }
                  i(O, D);
                  break;
                } else t(O, D);
                D = D.sibling;
              }
              V.type === w ? (Q = ui(
                V.props.children,
                O.mode,
                Q,
                V.key
              ), Q.return = O, O = Q) : (Q = js(
                V.type,
                V.key,
                V.props,
                null,
                O.mode,
                Q
              ), er(Q, V), Q.return = O, O = Q);
            }
            return y(O);
          case R:
            e: {
              for (Se = V.key; D !== null; ) {
                if (D.key === Se)
                  if (D.tag === 4 && D.stateNode.containerInfo === V.containerInfo && D.stateNode.implementation === V.implementation) {
                    i(
                      O,
                      D.sibling
                    ), Q = u(D, V.children || []), Q.return = O, O = Q;
                    break e;
                  } else {
                    i(O, D);
                    break;
                  }
                else t(O, D);
                D = D.sibling;
              }
              Q = Zu(V, O.mode, Q), Q.return = O, O = Q;
            }
            return y(O);
          case j:
            return V = mi(V), Qe(
              O,
              D,
              V,
              Q
            );
        }
        if (se(V))
          return me(
            O,
            D,
            V,
            Q
          );
        if (k(V)) {
          if (Se = k(V), typeof Se != "function") throw Error(s(150));
          return V = Se.call(V), Ee(
            O,
            D,
            V,
            Q
          );
        }
        if (typeof V.then == "function")
          return Qe(
            O,
            D,
            Us(V),
            Q
          );
        if (V.$$typeof === L)
          return Qe(
            O,
            D,
            Os(O, V),
            Q
          );
        Bs(O, V);
      }
      return typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint" ? (V = "" + V, D !== null && D.tag === 6 ? (i(O, D.sibling), Q = u(D, V), Q.return = O, O = Q) : (i(O, D), Q = Qu(V, O.mode, Q), Q.return = O, O = Q), y(O)) : i(O, D);
    }
    return function(O, D, V, Q) {
      try {
        Wl = 0;
        var Se = Qe(
          O,
          D,
          V,
          Q
        );
        return al = null, Se;
      } catch (ve) {
        if (ve === nl || ve === Ls) throw ve;
        var qe = Wt(29, ve, null, O.mode);
        return qe.lanes = Q, qe.return = O, qe;
      } finally {
      }
    };
  }
  var yi = Om(!0), _m = Om(!1), Ma = !1;
  function sc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function oc(e, t) {
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
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Ds(e), gm(e, null, i), t;
    }
    return ws(e, l, t, i), Ds(e);
  }
  function tr(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, ys(e, i);
    }
  }
  function uc(e, t) {
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
  var cc = !1;
  function nr() {
    if (cc) {
      var e = tl;
      if (e !== null) throw e;
    }
  }
  function ar(e, t, i, l) {
    cc = !1;
    var u = e.updateQueue;
    Ma = !1;
    var c = u.firstBaseUpdate, y = u.lastBaseUpdate, x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var M = x, U = M.next;
      M.next = null, y === null ? c = U : y.next = U, y = M;
      var F = e.alternate;
      F !== null && (F = F.updateQueue, x = F.lastBaseUpdate, x !== y && (x === null ? F.firstBaseUpdate = U : x.next = U, F.lastBaseUpdate = M));
    }
    if (c !== null) {
      var Z = u.baseState;
      y = 0, F = U = M = null, x = c;
      do {
        var Y = x.lane & -536870913, G = Y !== x.lane;
        if (G ? (Ve & Y) === Y : (l & Y) === Y) {
          Y !== 0 && Y === el && (cc = !0), F !== null && (F = F.next = {
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
          }, F === null ? (U = F = G, M = Z) : F = F.next = G, y |= Y;
        if (x = x.next, x === null) {
          if (x = u.shared.pending, x === null)
            break;
          G = x, x = G.next, G.next = null, u.lastBaseUpdate = G, u.shared.pending = null;
        }
      } while (!0);
      F === null && (M = Z), u.baseState = M, u.firstBaseUpdate = U, u.lastBaseUpdate = F, c === null && (u.shared.lanes = 0), za |= y, e.lanes = y, e.memoizedState = Z;
    }
  }
  function Lm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Vm(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Lm(i[e], t);
  }
  var il = C(null), Hs = C(0);
  function Um(e, t) {
    e = ua, ae(Hs, e), ae(il, t), ua = e | t.baseLanes;
  }
  function fc() {
    ae(Hs, ua), ae(il, il.current);
  }
  function dc() {
    ua = Hs.current, X(il), X(Hs);
  }
  var en = C(null), mn = null;
  function wa(e) {
    var t = e.alternate;
    ae(ft, ft.current & 1), ae(en, e), mn === null && (t === null || il.current !== null || t.memoizedState !== null) && (mn = e);
  }
  function hc(e) {
    ae(ft, ft.current), ae(en, e), mn === null && (mn = e);
  }
  function Bm(e) {
    e.tag === 22 ? (ae(ft, ft.current), ae(en, e), mn === null && (mn = e)) : Da();
  }
  function Da() {
    ae(ft, ft.current), ae(en, en.current);
  }
  function tn(e) {
    X(en), mn === e && (mn = null), X(ft);
  }
  var ft = C(0);
  function qs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Sf(i) || xf(i)))
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
  var ta = 0, Ce = null, Fe = null, vt = null, Ys = !1, ll = !1, gi = !1, Gs = 0, ir = 0, rl = null, ix = 0;
  function ot() {
    throw Error(s(321));
  }
  function mc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Jt(e[i], t[i])) return !1;
    return !0;
  }
  function pc(e, t, i, l, u, c) {
    return ta = c, Ce = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, B.H = e === null || e.memoizedState === null ? xp : jc, gi = !1, c = i(l, u), gi = !1, ll && (c = qm(
      t,
      i,
      l,
      u
    )), Hm(e), c;
  }
  function Hm(e) {
    B.H = sr;
    var t = Fe !== null && Fe.next !== null;
    if (ta = 0, vt = Fe = Ce = null, Ys = !1, ir = 0, rl = null, t) throw Error(s(300));
    e === null || bt || (e = e.dependencies, e !== null && zs(e) && (bt = !0));
  }
  function qm(e, t, i, l) {
    Ce = e;
    var u = 0;
    do {
      if (ll && (rl = null), ir = 0, ll = !1, 25 <= u) throw Error(s(301));
      if (u += 1, vt = Fe = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      B.H = Tp, c = t(i, l);
    } while (ll);
    return c;
  }
  function lx() {
    var e = B.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? lr(t) : t, e = e.useState()[0], (Fe !== null ? Fe.memoizedState : null) !== e && (Ce.flags |= 1024), t;
  }
  function yc() {
    var e = Gs !== 0;
    return Gs = 0, e;
  }
  function gc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function vc(e) {
    if (Ys) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ys = !1;
    }
    ta = 0, vt = Fe = Ce = null, ll = !1, ir = Gs = 0, rl = null;
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
  function ks() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function lr(e) {
    var t = ir;
    return ir += 1, rl === null && (rl = []), e = jm(rl, e, t), t = Ce, (vt === null ? t.memoizedState : vt.next) === null && (t = t.alternate, B.H = t === null || t.memoizedState === null ? xp : jc), e;
  }
  function Ps(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return lr(e);
      if (e.$$typeof === L) return Dt(e);
    }
    throw Error(s(438, String(e)));
  }
  function bc(e) {
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
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = ks(), Ce.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++)
        i[l] = te;
    return t.index++, i;
  }
  function na(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Xs(e) {
    var t = dt();
    return Sc(t, Fe, e);
  }
  function Sc(e, t, i) {
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
      var x = y = null, M = null, U = t, F = !1;
      do {
        var Z = U.lane & -536870913;
        if (Z !== U.lane ? (Ve & Z) === Z : (ta & Z) === Z) {
          var Y = U.revertLane;
          if (Y === 0)
            M !== null && (M = M.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), Z === el && (F = !0);
          else if ((ta & Y) === Y) {
            U = U.next, Y === el && (F = !0);
            continue;
          } else
            Z = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, M === null ? (x = M = Z, y = c) : M = M.next = Z, Ce.lanes |= Y, za |= Y;
          Z = U.action, gi && i(c, Z), c = U.hasEagerState ? U.eagerState : i(c, Z);
        } else
          Y = {
            lane: Z,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, M === null ? (x = M = Y, y = c) : M = M.next = Y, Ce.lanes |= Z, za |= Z;
        U = U.next;
      } while (U !== null && U !== t);
      if (M === null ? y = c : M.next = x, !Jt(c, e.memoizedState) && (bt = !0, F && (i = tl, i !== null)))
        throw i;
      e.memoizedState = c, e.baseState = y, e.baseQueue = M, l.lastRenderedState = c;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function xc(e) {
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
      Jt(c, t.memoizedState) || (bt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), i.lastRenderedState = c;
    }
    return [c, l];
  }
  function Ym(e, t, i) {
    var l = Ce, u = dt(), c = Be;
    if (c) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var y = !Jt(
      (Fe || u).memoizedState,
      i
    );
    if (y && (u.memoizedState = i, bt = !0), u = u.queue, Rc(Pm.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || vt !== null && vt.memoizedState.tag & 1) {
      if (l.flags |= 2048, sl(
        9,
        { destroy: void 0 },
        km.bind(
          null,
          l,
          u,
          i,
          t
        ),
        null
      ), Ie === null) throw Error(s(349));
      c || (ta & 127) !== 0 || Gm(l, t, i);
    }
    return i;
  }
  function Gm(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = Ce.updateQueue, t === null ? (t = ks(), Ce.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function km(e, t, i, l) {
    t.value = i, t.getSnapshot = l, Xm(t) && Fm(e);
  }
  function Pm(e, t, i) {
    return i(function() {
      Xm(t) && Fm(e);
    });
  }
  function Xm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Jt(e, i);
    } catch {
      return !0;
    }
  }
  function Fm(e) {
    var t = oi(e, 2);
    t !== null && Zt(t, e, 2);
  }
  function Tc(e) {
    var t = qt();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), gi) {
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
  function Km(e, t, i, l) {
    return e.baseState = i, Sc(
      e,
      Fe,
      typeof l == "function" ? l : na
    );
  }
  function rx(e, t, i, l, u) {
    if (Qs(e)) throw Error(s(485));
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
      B.T !== null ? i(!0) : c.isTransition = !1, l(c), i = t.pending, i === null ? (c.next = t.pending = c, Qm(t, c)) : (c.next = i.next, t.pending = i.next = c);
    }
  }
  function Qm(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var c = B.T, y = {};
      B.T = y;
      try {
        var x = i(u, l), M = B.S;
        M !== null && M(y, x), Zm(e, t, x);
      } catch (U) {
        Ec(e, t, U);
      } finally {
        c !== null && y.types !== null && (c.types = y.types), B.T = c;
      }
    } else
      try {
        c = i(u, l), Zm(e, t, c);
      } catch (U) {
        Ec(e, t, U);
      }
  }
  function Zm(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        $m(e, t, l);
      },
      function(l) {
        return Ec(e, t, l);
      }
    ) : $m(e, t, i);
  }
  function $m(e, t, i) {
    t.status = "fulfilled", t.value = i, Im(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, Qm(e, i)));
  }
  function Ec(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, Im(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Im(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Jm(e, t) {
    return t;
  }
  function Wm(e, t) {
    if (Be) {
      var i = Ie.formState;
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
      lastRenderedReducer: Jm,
      lastRenderedState: t
    }, i.queue = l, i = vp.bind(
      null,
      Ce,
      l
    ), l.dispatch = i, l = Tc(!1), c = Dc.bind(
      null,
      Ce,
      !1,
      l.queue
    ), l = qt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, i = rx.bind(
      null,
      Ce,
      u,
      c,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function ep(e) {
    var t = dt();
    return tp(t, Fe, e);
  }
  function tp(e, t, i) {
    if (t = Sc(
      e,
      t,
      Jm
    )[0], e = Xs(na)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = lr(t);
      } catch (y) {
        throw y === nl ? Ls : y;
      }
    else l = t;
    t = dt();
    var u = t.queue, c = u.dispatch;
    return i !== t.memoizedState && (Ce.flags |= 2048, sl(
      9,
      { destroy: void 0 },
      sx.bind(null, u, i),
      null
    )), [l, c, e];
  }
  function sx(e, t) {
    e.action = t;
  }
  function np(e) {
    var t = dt(), i = Fe;
    if (i !== null)
      return tp(t, i, e);
    dt(), t = t.memoizedState, i = dt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function sl(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = Ce.updateQueue, t === null && (t = ks(), Ce.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function ap() {
    return dt().memoizedState;
  }
  function Fs(e, t, i, l) {
    var u = qt();
    Ce.flags |= e, u.memoizedState = sl(
      1 | t,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function Ks(e, t, i, l) {
    var u = dt();
    l = l === void 0 ? null : l;
    var c = u.memoizedState.inst;
    Fe !== null && l !== null && mc(l, Fe.memoizedState.deps) ? u.memoizedState = sl(t, c, i, l) : (Ce.flags |= e, u.memoizedState = sl(
      1 | t,
      c,
      i,
      l
    ));
  }
  function ip(e, t) {
    Fs(8390656, 8, e, t);
  }
  function Rc(e, t) {
    Ks(2048, 8, e, t);
  }
  function ox(e) {
    Ce.flags |= 4;
    var t = Ce.updateQueue;
    if (t === null)
      t = ks(), Ce.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function lp(e) {
    var t = dt().memoizedState;
    return ox({ ref: t, nextImpl: e }), function() {
      if ((Ge & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function rp(e, t) {
    return Ks(4, 2, e, t);
  }
  function sp(e, t) {
    return Ks(4, 4, e, t);
  }
  function op(e, t) {
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
  function up(e, t, i) {
    i = i != null ? i.concat([e]) : null, Ks(4, 4, op.bind(null, t, e), i);
  }
  function Mc() {
  }
  function cp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && mc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function fp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && mc(t, l[1]))
      return l[0];
    if (l = e(), gi) {
      Mt(!0);
      try {
        e();
      } finally {
        Mt(!1);
      }
    }
    return i.memoizedState = [l, t], l;
  }
  function Ac(e, t, i) {
    return i === void 0 || (ta & 1073741824) !== 0 && (Ve & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = dy(), Ce.lanes |= e, za |= e, i);
  }
  function dp(e, t, i, l) {
    return Jt(i, t) ? i : il.current !== null ? (e = Ac(e, i, l), Jt(e, t) || (bt = !0), e) : (ta & 42) === 0 || (ta & 1073741824) !== 0 && (Ve & 261930) === 0 ? (bt = !0, e.memoizedState = i) : (e = dy(), Ce.lanes |= e, za |= e, t);
  }
  function hp(e, t, i, l, u) {
    var c = ne.p;
    ne.p = c !== 0 && 8 > c ? c : 8;
    var y = B.T, x = {};
    B.T = x, Dc(e, !1, t, i);
    try {
      var M = u(), U = B.S;
      if (U !== null && U(x, M), M !== null && typeof M == "object" && typeof M.then == "function") {
        var F = ax(
          M,
          l
        );
        rr(
          e,
          t,
          F,
          ln(e)
        );
      } else
        rr(
          e,
          t,
          l,
          ln(e)
        );
    } catch (Z) {
      rr(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Z },
        ln()
      );
    } finally {
      ne.p = c, y !== null && x.types !== null && (y.types = x.types), B.T = y;
    }
  }
  function ux() {
  }
  function Cc(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = mp(e).queue;
    hp(
      e,
      u,
      t,
      re,
      i === null ? ux : function() {
        return pp(e), i(l);
      }
    );
  }
  function mp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: re,
      baseState: re,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: na,
        lastRenderedState: re
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
  function pp(e) {
    var t = mp(e);
    t.next === null && (t = e.alternate.memoizedState), rr(
      e,
      t.next.queue,
      {},
      ln()
    );
  }
  function wc() {
    return Dt(Er);
  }
  function yp() {
    return dt().memoizedState;
  }
  function gp() {
    return dt().memoizedState;
  }
  function cx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = ln();
          e = Aa(i);
          var l = Ca(t, e, i);
          l !== null && (Zt(l, t, i), tr(l, t, i)), t = { cache: ac() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function fx(e, t, i) {
    var l = ln();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qs(e) ? bp(t, i) : (i = Fu(e, t, i, l), i !== null && (Zt(i, e, l), Sp(i, t, l)));
  }
  function vp(e, t, i) {
    var l = ln();
    rr(e, t, i, l);
  }
  function rr(e, t, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Qs(e)) bp(t, u);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var y = t.lastRenderedState, x = c(y, i);
          if (u.hasEagerState = !0, u.eagerState = x, Jt(x, y))
            return ws(e, t, u, 0), Ie === null && Cs(), !1;
        } catch {
        } finally {
        }
      if (i = Fu(e, t, u, l), i !== null)
        return Zt(i, e, l), Sp(i, t, l), !0;
    }
    return !1;
  }
  function Dc(e, t, i, l) {
    if (l = {
      lane: 2,
      revertLane: of(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qs(e)) {
      if (t) throw Error(s(479));
    } else
      t = Fu(
        e,
        i,
        l,
        2
      ), t !== null && Zt(t, e, 2);
  }
  function Qs(e) {
    var t = e.alternate;
    return e === Ce || t !== null && t === Ce;
  }
  function bp(e, t) {
    ll = Ys = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function Sp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, ys(e, i);
    }
  }
  var sr = {
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
  sr.useEffectEvent = ot;
  var xp = {
    readContext: Dt,
    use: Ps,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Dt,
    useEffect: ip,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Fs(
        4194308,
        4,
        op.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return Fs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Fs(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = qt();
      t = t === void 0 ? null : t;
      var l = e();
      if (gi) {
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
        if (gi) {
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
      }, l.queue = e, e = e.dispatch = fx.bind(
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
      e = Tc(e);
      var t = e.queue, i = vp.bind(null, Ce, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Mc,
    useDeferredValue: function(e, t) {
      var i = qt();
      return Ac(i, e, t);
    },
    useTransition: function() {
      var e = Tc(!1);
      return e = hp.bind(
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
        if (i = t(), Ie === null)
          throw Error(s(349));
        (Ve & 127) !== 0 || Gm(l, t, i);
      }
      u.memoizedState = i;
      var c = { value: i, getSnapshot: t };
      return u.queue = c, ip(Pm.bind(null, l, c, e), [
        e
      ]), l.flags |= 2048, sl(
        9,
        { destroy: void 0 },
        km.bind(
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
      var e = qt(), t = Ie.identifierPrefix;
      if (Be) {
        var i = Un, l = Vn;
        i = (l & ~(1 << 32 - _t(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Gs++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = ix++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: wc,
    useFormState: Wm,
    useActionState: Wm,
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
      return t.queue = i, t = Dc.bind(
        null,
        Ce,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: bc,
    useCacheRefresh: function() {
      return qt().memoizedState = cx.bind(
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
  }, jc = {
    readContext: Dt,
    use: Ps,
    useCallback: cp,
    useContext: Dt,
    useEffect: Rc,
    useImperativeHandle: up,
    useInsertionEffect: rp,
    useLayoutEffect: sp,
    useMemo: fp,
    useReducer: Xs,
    useRef: ap,
    useState: function() {
      return Xs(na);
    },
    useDebugValue: Mc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return dp(
        i,
        Fe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Xs(na)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : lr(e),
        t
      ];
    },
    useSyncExternalStore: Ym,
    useId: yp,
    useHostTransitionStatus: wc,
    useFormState: ep,
    useActionState: ep,
    useOptimistic: function(e, t) {
      var i = dt();
      return Km(i, Fe, e, t);
    },
    useMemoCache: bc,
    useCacheRefresh: gp
  };
  jc.useEffectEvent = lp;
  var Tp = {
    readContext: Dt,
    use: Ps,
    useCallback: cp,
    useContext: Dt,
    useEffect: Rc,
    useImperativeHandle: up,
    useInsertionEffect: rp,
    useLayoutEffect: sp,
    useMemo: fp,
    useReducer: xc,
    useRef: ap,
    useState: function() {
      return xc(na);
    },
    useDebugValue: Mc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return Fe === null ? Ac(i, e, t) : dp(
        i,
        Fe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = xc(na)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : lr(e),
        t
      ];
    },
    useSyncExternalStore: Ym,
    useId: yp,
    useHostTransitionStatus: wc,
    useFormState: np,
    useActionState: np,
    useOptimistic: function(e, t) {
      var i = dt();
      return Fe !== null ? Km(i, Fe, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: bc,
    useCacheRefresh: gp
  };
  Tp.useEffectEvent = lp;
  function Nc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : v({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var zc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var l = ln(), u = Aa(l);
      u.payload = t, i != null && (u.callback = i), t = Ca(e, u, l), t !== null && (Zt(t, e, l), tr(t, e, l));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var l = ln(), u = Aa(l);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Ca(e, u, l), t !== null && (Zt(t, e, l), tr(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = ln(), l = Aa(i);
      l.tag = 2, t != null && (l.callback = t), t = Ca(e, l, i), t !== null && (Zt(t, e, i), tr(t, e, i));
    }
  };
  function Ep(e, t, i, l, u, c, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, c, y) : t.prototype && t.prototype.isPureReactComponent ? !Kl(i, l) || !Kl(u, c) : !0;
  }
  function Rp(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && zc.enqueueReplaceState(t, t.state, null);
  }
  function vi(e, t) {
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
  function Mp(e) {
    As(e);
  }
  function Ap(e) {
    console.error(e);
  }
  function Cp(e) {
    As(e);
  }
  function Zs(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function wp(e, t, i) {
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
  function Oc(e, t, i) {
    return i = Aa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Zs(e, t);
    }, i;
  }
  function Dp(e) {
    return e = Aa(e), e.tag = 3, e;
  }
  function jp(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = l.value;
      e.payload = function() {
        return u(c);
      }, e.callback = function() {
        wp(t, i, l);
      };
    }
    var y = i.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      wp(t, i, l), typeof u != "function" && (Oa === null ? Oa = /* @__PURE__ */ new Set([this]) : Oa.add(this));
      var x = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function dx(e, t, i, l, u) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = i.alternate, t !== null && Wi(
        t,
        i,
        u,
        !0
      ), i = en.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return mn === null ? so() : i.alternate === null && ut === 0 && (ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === Vs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), lf(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === Vs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), lf(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return lf(e, l, u), so(), !1;
    }
    if (Be)
      return t = en.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== Ju && (e = Error(s(422), { cause: l }), $l(cn(e, i)))) : (l !== Ju && (t = Error(s(423), {
        cause: l
      }), $l(
        cn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = cn(l, i), u = Oc(
        e.stateNode,
        l,
        u
      ), uc(e, u), ut !== 4 && (ut = 2)), !1;
    var c = Error(s(520), { cause: l });
    if (c = cn(c, i), pr === null ? pr = [c] : pr.push(c), ut !== 4 && (ut = 2), t === null) return !0;
    l = cn(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = Oc(i.stateNode, l, e), uc(i, e), !1;
        case 1:
          if (t = i.type, c = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Oa === null || !Oa.has(c))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Dp(u), jp(
              u,
              e,
              i,
              l
            ), uc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var _c = Error(s(461)), bt = !1;
  function jt(e, t, i, l) {
    t.child = e === null ? _m(t, null, i, l) : yi(
      t,
      e.child,
      i,
      l
    );
  }
  function Np(e, t, i, l, u) {
    i = i.render;
    var c = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var x in l)
        x !== "ref" && (y[x] = l[x]);
    } else y = l;
    return di(t), l = pc(
      e,
      t,
      i,
      y,
      c,
      u
    ), x = yc(), e !== null && !bt ? (gc(e, t, u), aa(e, t, u)) : (Be && x && $u(t), t.flags |= 1, jt(e, t, l, u), t.child);
  }
  function zp(e, t, i, l, u) {
    if (e === null) {
      var c = i.type;
      return typeof c == "function" && !Ku(c) && c.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = c, Op(
        e,
        t,
        c,
        l,
        u
      )) : (e = js(
        i.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !Gc(e, u)) {
      var y = c.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Kl, i(y, l) && e.ref === t.ref)
        return aa(e, t, u);
    }
    return t.flags |= 1, e = In(c, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Op(e, t, i, l, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Kl(c, l) && e.ref === t.ref)
        if (bt = !1, t.pendingProps = l = c, Gc(e, u))
          (e.flags & 131072) !== 0 && (bt = !0);
        else
          return t.lanes = e.lanes, aa(e, t, u);
    }
    return Lc(
      e,
      t,
      i,
      l,
      u
    );
  }
  function _p(e, t, i, l) {
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
        return Lp(
          e,
          t,
          c,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && _s(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Um(t, c) : fc(), Bm(t);
      else
        return l = t.lanes = 536870912, Lp(
          e,
          t,
          c !== null ? c.baseLanes | i : i,
          i,
          l
        );
    } else
      c !== null ? (_s(t, c.cachePool), Um(t, c), Da(), t.memoizedState = null) : (e !== null && _s(t, null), fc(), Da());
    return jt(e, t, u, i), t.child;
  }
  function or(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Lp(e, t, i, l, u) {
    var c = lc();
    return c = c === null ? null : { parent: gt._currentValue, pool: c }, t.memoizedState = {
      baseLanes: i,
      cachePool: c
    }, e !== null && _s(t, null), fc(), Bm(t), e !== null && Wi(e, t, l, !0), t.childLanes = u, null;
  }
  function $s(e, t) {
    return t = Js(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Vp(e, t, i) {
    return yi(t, e.child, null, i), e = $s(t, t.pendingProps), e.flags |= 2, tn(t), t.memoizedState = null, e;
  }
  function hx(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Be) {
        if (l.mode === "hidden")
          return e = $s(t, l), t.lanes = 536870912, or(null, e);
        if (hc(t), (e = tt) ? (e = Qy(
          e,
          hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xa !== null ? { id: Vn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = bm(e), i.return = t, t.child = i, wt = t, tt = null)) : e = null, e === null) throw Ea(t);
        return t.lanes = 536870912, null;
      }
      return $s(t, l);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var y = c.dehydrated;
      if (hc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Vp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (bt || Wi(e, t, i, !1), u = (i & e.childLanes) !== 0, bt || u) {
        if (l = Ie, l !== null && (y = A(l, i), y !== 0 && y !== c.retryLane))
          throw c.retryLane = y, oi(e, y), Zt(l, e, y), _c;
        so(), t = Vp(
          e,
          t,
          i
        );
      } else
        e = c.treeContext, tt = pn(y.nextSibling), wt = t, Be = !0, Ta = null, hn = !1, e !== null && Tm(t, e), t = $s(t, l), t.flags |= 4096;
      return t;
    }
    return e = In(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Is(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Lc(e, t, i, l, u) {
    return di(t), i = pc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = yc(), e !== null && !bt ? (gc(e, t, u), aa(e, t, u)) : (Be && l && $u(t), t.flags |= 1, jt(e, t, i, u), t.child);
  }
  function Up(e, t, i, l, u, c) {
    return di(t), t.updateQueue = null, i = qm(
      t,
      l,
      i,
      u
    ), Hm(e), l = yc(), e !== null && !bt ? (gc(e, t, c), aa(e, t, c)) : (Be && l && $u(t), t.flags |= 1, jt(e, t, i, c), t.child);
  }
  function Bp(e, t, i, l, u) {
    if (di(t), t.stateNode === null) {
      var c = Zi, y = i.contextType;
      typeof y == "object" && y !== null && (c = Dt(y)), c = new i(l, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = zc, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = l, c.state = t.memoizedState, c.refs = {}, sc(t), y = i.contextType, c.context = typeof y == "object" && y !== null ? Dt(y) : Zi, c.state = t.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (Nc(
        t,
        i,
        y,
        l
      ), c.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (y = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), y !== c.state && zc.enqueueReplaceState(c, c.state, null), ar(t, l, c, u), nr(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      c = t.stateNode;
      var x = t.memoizedProps, M = vi(i, x);
      c.props = M;
      var U = c.context, F = i.contextType;
      y = Zi, typeof F == "object" && F !== null && (y = Dt(F));
      var Z = i.getDerivedStateFromProps;
      F = typeof Z == "function" || typeof c.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, F || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (x || U !== y) && Rp(
        t,
        c,
        l,
        y
      ), Ma = !1;
      var Y = t.memoizedState;
      c.state = Y, ar(t, l, c, u), nr(), U = t.memoizedState, x || Y !== U || Ma ? (typeof Z == "function" && (Nc(
        t,
        i,
        Z,
        l
      ), U = t.memoizedState), (M = Ma || Ep(
        t,
        i,
        M,
        l,
        Y,
        U,
        y
      )) ? (F || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = U), c.props = l, c.state = U, c.context = y, l = M) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      c = t.stateNode, oc(e, t), y = t.memoizedProps, F = vi(i, y), c.props = F, Z = t.pendingProps, Y = c.context, U = i.contextType, M = Zi, typeof U == "object" && U !== null && (M = Dt(U)), x = i.getDerivedStateFromProps, (U = typeof x == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (y !== Z || Y !== M) && Rp(
        t,
        c,
        l,
        M
      ), Ma = !1, Y = t.memoizedState, c.state = Y, ar(t, l, c, u), nr();
      var G = t.memoizedState;
      y !== Z || Y !== G || Ma || e !== null && e.dependencies !== null && zs(e.dependencies) ? (typeof x == "function" && (Nc(
        t,
        i,
        x,
        l
      ), G = t.memoizedState), (F = Ma || Ep(
        t,
        i,
        F,
        l,
        Y,
        G,
        M
      ) || e !== null && e.dependencies !== null && zs(e.dependencies)) ? (U || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(l, G, M), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        l,
        G,
        M
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = G), c.props = l, c.state = G, c.context = M, l = F) : (typeof c.componentDidUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && Y === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return c = l, Is(e, t), l = (t.flags & 128) !== 0, c || l ? (c = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && l ? (t.child = yi(
      t,
      e.child,
      null,
      u
    ), t.child = yi(
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
  function Hp(e, t, i, l) {
    return ci(), t.flags |= 256, jt(e, t, i, l), t.child;
  }
  var Vc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Uc(e) {
    return { baseLanes: e, cachePool: wm() };
  }
  function Bc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= an), e;
  }
  function qp(e, t, i) {
    var l = t.pendingProps, u = !1, c = (t.flags & 128) !== 0, y;
    if ((y = c) || (y = e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Be) {
        if (u ? wa(t) : Da(), (e = tt) ? (e = Qy(
          e,
          hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xa !== null ? { id: Vn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = bm(e), i.return = t, t.child = i, wt = t, tt = null)) : e = null, e === null) throw Ea(t);
        return xf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var x = l.children;
      return l = l.fallback, u ? (Da(), u = t.mode, x = Js(
        { mode: "hidden", children: x },
        u
      ), l = ui(
        l,
        u,
        i,
        null
      ), x.return = t, l.return = t, x.sibling = l, t.child = x, l = t.child, l.memoizedState = Uc(i), l.childLanes = Bc(
        e,
        y,
        i
      ), t.memoizedState = Vc, or(null, l)) : (wa(t), Hc(t, x));
    }
    var M = e.memoizedState;
    if (M !== null && (x = M.dehydrated, x !== null)) {
      if (c)
        t.flags & 256 ? (wa(t), t.flags &= -257, t = qc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Da(), t.child = e.child, t.flags |= 128, t = null) : (Da(), x = l.fallback, u = t.mode, l = Js(
          { mode: "visible", children: l.children },
          u
        ), x = ui(
          x,
          u,
          i,
          null
        ), x.flags |= 2, l.return = t, x.return = t, l.sibling = x, t.child = l, yi(
          t,
          e.child,
          null,
          i
        ), l = t.child, l.memoizedState = Uc(i), l.childLanes = Bc(
          e,
          y,
          i
        ), t.memoizedState = Vc, t = or(null, l));
      else if (wa(t), xf(x)) {
        if (y = x.nextSibling && x.nextSibling.dataset, y) var U = y.dgst;
        y = U, l = Error(s(419)), l.stack = "", l.digest = y, $l({ value: l, source: null, stack: null }), t = qc(
          e,
          t,
          i
        );
      } else if (bt || Wi(e, t, i, !1), y = (i & e.childLanes) !== 0, bt || y) {
        if (y = Ie, y !== null && (l = A(y, i), l !== 0 && l !== M.retryLane))
          throw M.retryLane = l, oi(e, l), Zt(y, e, l), _c;
        Sf(x) || so(), t = qc(
          e,
          t,
          i
        );
      } else
        Sf(x) ? (t.flags |= 192, t.child = e.child, t = null) : (e = M.treeContext, tt = pn(
          x.nextSibling
        ), wt = t, Be = !0, Ta = null, hn = !1, e !== null && Tm(t, e), t = Hc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Da(), x = l.fallback, u = t.mode, M = e.child, U = M.sibling, l = In(M, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = M.subtreeFlags & 65011712, U !== null ? x = In(
      U,
      x
    ) : (x = ui(
      x,
      u,
      i,
      null
    ), x.flags |= 2), x.return = t, l.return = t, l.sibling = x, t.child = l, or(null, l), l = t.child, x = e.child.memoizedState, x === null ? x = Uc(i) : (u = x.cachePool, u !== null ? (M = gt._currentValue, u = u.parent !== M ? { parent: M, pool: M } : u) : u = wm(), x = {
      baseLanes: x.baseLanes | i,
      cachePool: u
    }), l.memoizedState = x, l.childLanes = Bc(
      e,
      y,
      i
    ), t.memoizedState = Vc, or(e.child, l)) : (wa(t), i = e.child, e = i.sibling, i = In(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Hc(e, t) {
    return t = Js(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Js(e, t) {
    return e = Wt(22, e, null, t), e.lanes = 0, e;
  }
  function qc(e, t, i) {
    return yi(t, e.child, null, i), e = Hc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Yp(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), tc(e.return, t, i);
  }
  function Yc(e, t, i, l, u, c) {
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
  function Gp(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, c = l.tail;
    l = l.children;
    var y = ft.current, x = (y & 2) !== 0;
    if (x ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, ae(ft, y), jt(e, t, l, i), l = Be ? Zl : 0, !x && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Yp(e, i, t);
        else if (e.tag === 19)
          Yp(e, i, t);
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
          e = i.alternate, e !== null && qs(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), Yc(
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
          if (e = u.alternate, e !== null && qs(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        Yc(
          t,
          !0,
          i,
          null,
          c,
          l
        );
        break;
      case "together":
        Yc(
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
        if (Wi(
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
      for (e = t.child, i = In(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = In(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Gc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && zs(e)));
  }
  function mx(e, t, i) {
    switch (t.tag) {
      case 3:
        mt(t, t.stateNode.containerInfo), Ra(t, gt, e.memoizedState.cache), ci();
        break;
      case 27:
      case 5:
        ei(t);
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
          return t.flags |= 128, hc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (wa(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? qp(e, t, i) : (wa(t), e = aa(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        wa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (i & t.childLanes) !== 0, l || (Wi(
          e,
          t,
          i,
          !1
        ), l = (i & t.childLanes) !== 0), u) {
          if (l)
            return Gp(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ae(ft, ft.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, _p(
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
  function kp(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        bt = !0;
      else {
        if (!Gc(e, i) && (t.flags & 128) === 0)
          return bt = !1, mx(
            e,
            t,
            i
          );
        bt = (e.flags & 131072) !== 0;
      }
    else
      bt = !1, Be && (t.flags & 1048576) !== 0 && xm(t, Zl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = mi(t.elementType), t.type = e, typeof e == "function")
            Ku(e) ? (l = vi(e, l), t.tag = 1, t = Bp(
              null,
              t,
              e,
              l,
              i
            )) : (t.tag = 0, t = Lc(
              null,
              t,
              e,
              l,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === K) {
                t.tag = 11, t = Np(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              } else if (u === ee) {
                t.tag = 14, t = zp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              }
            }
            throw t = de(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Lc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return l = t.type, u = vi(
          l,
          t.pendingProps
        ), Bp(
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
          u = c.element, oc(e, t), ar(t, l, null, i);
          var y = t.memoizedState;
          if (l = y.cache, Ra(t, gt, l), l !== c.cache && nc(
            t,
            [gt],
            i,
            !0
          ), nr(), l = y.element, c.isDehydrated)
            if (c = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Hp(
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
              ), $l(u), t = Hp(
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
              for (tt = pn(e.firstChild), wt = t, Be = !0, Ta = null, hn = !0, i = _m(
                t,
                null,
                l,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (ci(), l === u) {
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
        return Is(e, t), e === null ? (i = eg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Be || (i = t.type, e = t.pendingProps, l = po(
          Me.current
        ).createElement(i), l[ue] = t, l[ce] = e, Nt(l, i, e), We(l), t.stateNode = l) : t.memoizedState = eg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ei(t), e === null && Be && (l = t.stateNode = Iy(
          t.type,
          t.pendingProps,
          Me.current
        ), wt = t, hn = !0, u = tt, Ua(t.type) ? (Tf = u, tt = pn(l.firstChild)) : tt = u), jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), Is(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Be && ((u = l = tt) && (l = Px(
          l,
          t.type,
          t.pendingProps,
          hn
        ), l !== null ? (t.stateNode = l, wt = t, tt = pn(l.firstChild), hn = !1, u = !0) : u = !1), u || Ea(t)), ei(t), u = t.type, c = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = c.children, gf(u, c) ? l = null : y !== null && gf(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = pc(
          e,
          t,
          lx,
          null,
          null,
          i
        ), Er._currentValue = u), Is(e, t), jt(e, t, l, i), t.child;
      case 6:
        return e === null && Be && ((e = i = tt) && (i = Xx(
          i,
          t.pendingProps,
          hn
        ), i !== null ? (t.stateNode = i, wt = t, tt = null, e = !0) : e = !1), e || Ea(t)), null;
      case 13:
        return qp(e, t, i);
      case 4:
        return mt(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = yi(
          t,
          null,
          l,
          i
        ) : jt(e, t, l, i), t.child;
      case 11:
        return Np(
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
        return u = t.type._context, l = t.pendingProps.children, di(t), u = Dt(u), l = l(u), t.flags |= 1, jt(e, t, l, i), t.child;
      case 14:
        return zp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Op(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return Gp(e, t, i);
      case 31:
        return hx(e, t, i);
      case 22:
        return _p(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return di(t), l = Dt(gt), e === null ? (u = lc(), u === null && (u = Ie, c = ac(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= i), u = c), t.memoizedState = { parent: l, cache: u }, sc(t), Ra(t, gt, u)) : ((e.lanes & i) !== 0 && (oc(e, t), ar(t, null, null, i), nr()), u = e.memoizedState, c = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ra(t, gt, l)) : (l = c.cache, Ra(t, gt, l), l !== u.cache && nc(
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
  function kc(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (yy()) e.flags |= 8192;
        else
          throw pi = Vs, rc;
    } else e.flags &= -16777217;
  }
  function Pp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !lg(t))
      if (yy()) e.flags |= 8192;
      else
        throw pi = Vs, rc;
  }
  function Ws(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Hl() : 536870912, e.lanes |= t, fl |= t);
  }
  function ur(e, t) {
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
  function px(e, t, i) {
    var l = t.pendingProps;
    switch (Iu(t), t.tag) {
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
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), ea(gt), Ze(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Ji(t) ? ia(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Wu())), nt(t), null;
      case 26:
        var u = t.type, c = t.memoizedState;
        return e === null ? (ia(t), c !== null ? (nt(t), Pp(t, c)) : (nt(t), kc(
          t,
          u,
          null,
          l,
          i
        ))) : c ? c !== e.memoizedState ? (ia(t), nt(t), Pp(t, c)) : (nt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && ia(t), nt(t), kc(
          t,
          u,
          e,
          l,
          i
        )), null;
      case 27:
        if (_i(t), i = Me.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          e = oe.current, Ji(t) ? Em(t) : (e = Iy(u, l, i), t.stateNode = e, ia(t));
        }
        return nt(t), null;
      case 5:
        if (_i(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          if (c = oe.current, Ji(t))
            Em(t);
          else {
            var y = po(
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
            c[ue] = t, c[ce] = l;
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
        return nt(t), kc(
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
          if (e = Me.current, Ji(t)) {
            if (e = t.stateNode, i = t.memoizedProps, l = null, u = wt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[ue] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || qy(e.nodeValue, i)), e || Ea(t, !0);
          } else
            e = po(e).createTextNode(
              l
            ), e[ue] = t, t.stateNode = e;
        }
        return nt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Ji(t), i !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[ue] = t;
            } else
              ci(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), e = !1;
          } else
            i = Wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return nt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Ji(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[ue] = t;
            } else
              ci(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), u = !1;
          } else
            u = Wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
        }
        return tn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), c = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (c = l.memoizedState.cachePool.pool), c !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), Ws(t, t.updateQueue), nt(t), null);
      case 4:
        return Ze(), e === null && df(t.stateNode.containerInfo), nt(t), null;
      case 10:
        return ea(t.type), nt(t), null;
      case 19:
        if (X(ft), l = t.memoizedState, l === null) return nt(t), null;
        if (u = (t.flags & 128) !== 0, c = l.rendering, c === null)
          if (u) ur(l, !1);
          else {
            if (ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = qs(e), c !== null) {
                  for (t.flags |= 128, ur(l, !1), e = c.updateQueue, t.updateQueue = e, Ws(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    vm(i, e), i = i.sibling;
                  return ae(
                    ft,
                    ft.current & 1 | 2
                  ), Be && Jn(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Bt() > io && (t.flags |= 128, u = !0, ur(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = qs(c), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Ws(t, e), ur(l, !0), l.tail === null && l.tailMode === "hidden" && !c.alternate && !Be)
                return nt(t), null;
            } else
              2 * Bt() - l.renderingStartTime > io && i !== 536870912 && (t.flags |= 128, u = !0, ur(l, !1), t.lanes = 4194304);
          l.isBackwards ? (c.sibling = t.child, t.child = c) : (e = l.last, e !== null ? e.sibling = c : t.child = c, l.last = c);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Bt(), e.sibling = null, i = ft.current, ae(
          ft,
          u ? i & 1 | 2 : i & 1
        ), Be && Jn(t, l.treeForkCount), e) : (nt(t), null);
      case 22:
      case 23:
        return tn(t), dc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (nt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : nt(t), i = t.updateQueue, i !== null && Ws(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && X(hi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ea(gt), nt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function yx(e, t) {
    switch (Iu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ea(gt), Ze(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return _i(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (tn(t), t.alternate === null)
            throw Error(s(340));
          ci();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (tn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          ci();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return X(ft), null;
      case 4:
        return Ze(), null;
      case 10:
        return ea(t.type), null;
      case 22:
      case 23:
        return tn(t), dc(), e !== null && X(hi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ea(gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Xp(e, t) {
    switch (Iu(t), t.tag) {
      case 3:
        ea(gt), Ze();
        break;
      case 26:
      case 27:
      case 5:
        _i(t);
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
        X(ft);
        break;
      case 10:
        ea(t.type);
        break;
      case 22:
      case 23:
        tn(t), dc(), e !== null && X(hi);
        break;
      case 24:
        ea(gt);
    }
  }
  function cr(e, t) {
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
      Pe(t, t.return, x);
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
              var M = i, U = x;
              try {
                U();
              } catch (F) {
                Pe(
                  u,
                  M,
                  F
                );
              }
            }
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (F) {
      Pe(t, t.return, F);
    }
  }
  function Fp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Vm(t, i);
      } catch (l) {
        Pe(e, e.return, l);
      }
    }
  }
  function Kp(e, t, i) {
    i.props = vi(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (l) {
      Pe(e, t, l);
    }
  }
  function fr(e, t) {
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
      Pe(e, t, u);
    }
  }
  function Bn(e, t) {
    var i = e.ref, l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          Pe(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Pe(e, t, u);
        }
      else i.current = null;
  }
  function Qp(e) {
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
      Pe(e, e.return, u);
    }
  }
  function Pc(e, t, i) {
    try {
      var l = e.stateNode;
      Bx(l, e.type, i, t), l[ce] = t;
    } catch (u) {
      Pe(e, e.return, u);
    }
  }
  function Zp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ua(e.type) || e.tag === 4;
  }
  function Xc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Zp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ua(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Fc(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = Zn));
    else if (l !== 4 && (l === 27 && Ua(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Fc(e, t, i), e = e.sibling; e !== null; )
        Fc(e, t, i), e = e.sibling;
  }
  function eo(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && Ua(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (eo(e, t, i), e = e.sibling; e !== null; )
        eo(e, t, i), e = e.sibling;
  }
  function $p(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Nt(t, l, i), t[ue] = e, t[ce] = i;
    } catch (c) {
      Pe(e, e.return, c);
    }
  }
  var la = !1, St = !1, Kc = !1, Ip = typeof WeakSet == "function" ? WeakSet : Set, Ct = null;
  function gx(e, t) {
    if (e = e.containerInfo, pf = To, e = um(e), qu(e)) {
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
            var y = 0, x = -1, M = -1, U = 0, F = 0, Z = e, Y = null;
            t: for (; ; ) {
              for (var G; Z !== i || u !== 0 && Z.nodeType !== 3 || (x = y + u), Z !== c || l !== 0 && Z.nodeType !== 3 || (M = y + l), Z.nodeType === 3 && (y += Z.nodeValue.length), (G = Z.firstChild) !== null; )
                Y = Z, Z = G;
              for (; ; ) {
                if (Z === e) break t;
                if (Y === i && ++U === u && (x = y), Y === c && ++F === l && (M = y), (G = Z.nextSibling) !== null) break;
                Z = Y, Y = Z.parentNode;
              }
              Z = G;
            }
            i = x === -1 || M === -1 ? null : { start: x, end: M };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (yf = { focusedElem: e, selectionRange: i }, To = !1, Ct = t; Ct !== null; )
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
                  var me = vi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    me,
                    c
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ee) {
                  Pe(
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
                  bf(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      bf(e);
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
  function Jp(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        sa(e, i), l & 4 && cr(5, i);
        break;
      case 1:
        if (sa(e, i), l & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (y) {
              Pe(i, i.return, y);
            }
          else {
            var u = vi(
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
              Pe(
                i,
                i.return,
                y
              );
            }
          }
        l & 64 && Fp(i), l & 512 && fr(i, i.return);
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
            Vm(e, t);
          } catch (y) {
            Pe(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && $p(i);
      case 26:
      case 5:
        sa(e, i), t === null && l & 4 && Qp(i), l & 512 && fr(i, i.return);
        break;
      case 12:
        sa(e, i);
        break;
      case 31:
        sa(e, i), l & 4 && ty(e, i);
        break;
      case 13:
        sa(e, i), l & 4 && ny(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = Ax.bind(
          null,
          i
        ), Fx(e, i))));
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
  function Wp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Wp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && $e(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var lt = null, Xt = !1;
  function ra(e, t, i) {
    for (i = i.child; i !== null; )
      ey(e, t, i), i = i.sibling;
  }
  function ey(e, t, i) {
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
        ), Sr(i.stateNode), lt = l, Xt = u;
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
              Pe(
                i,
                t,
                c
              );
            }
          else
            try {
              lt.removeChild(i.stateNode);
            } catch (c) {
              Pe(
                i,
                t,
                c
              );
            }
        break;
      case 18:
        lt !== null && (Xt ? (e = lt, Fy(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), bl(e)) : Fy(lt, i.stateNode));
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
        St || (Bn(i, t), l = i.stateNode, typeof l.componentWillUnmount == "function" && Kp(
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
  function ty(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        bl(e);
      } catch (i) {
        Pe(t, t.return, i);
      }
    }
  }
  function ny(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        bl(e);
      } catch (i) {
        Pe(t, t.return, i);
      }
  }
  function vx(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Ip()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ip()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function to(e, t) {
    var i = vx(e);
    t.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var u = Cx.bind(null, e, l);
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
        ey(c, y, u), lt = null, Xt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ay(t, e), t = t.sibling;
  }
  var Cn = null;
  function ay(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ft(t, e), Kt(e), l & 4 && (ja(3, e, e.return), cr(3, e), ja(5, e, e.return));
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
                      c = u.getElementsByTagName("title")[0], (!c || c[je] || c[ue] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = u.createElement(l), u.head.insertBefore(
                        c,
                        u.querySelector("head > title")
                      )), Nt(c, l, i), c[ue] = e, We(c), l = c;
                      break e;
                    case "link":
                      var y = ag(
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
                      if (y = ag(
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
                  c[ue] = e, We(c), l = c;
                }
                e.stateNode = l;
              } else
                ig(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = ng(
                u,
                l,
                e.memoizedProps
              );
          else
            c !== l ? (c === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : c.count--, l === null ? ig(
              u,
              e.type,
              e.stateNode
            ) : ng(
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
            Gi(u, "");
          } catch (me) {
            Pe(e, e.return, me);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, Pc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (Kc = !0);
        break;
      case 6:
        if (Ft(t, e), Kt(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (me) {
            Pe(e, e.return, me);
          }
        }
        break;
      case 3:
        if (vo = null, u = Cn, Cn = yo(t.containerInfo), Ft(t, e), Cn = u, Kt(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            bl(t.containerInfo);
          } catch (me) {
            Pe(e, e.return, me);
          }
        Kc && (Kc = !1, iy(e));
        break;
      case 4:
        l = Cn, Cn = yo(
          e.stateNode.containerInfo
        ), Ft(t, e), Kt(e), Cn = l;
        break;
      case 12:
        Ft(t, e), Kt(e);
        break;
      case 31:
        Ft(t, e), Kt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, to(e, l)));
        break;
      case 13:
        Ft(t, e), Kt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (ao = Bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, to(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var M = i !== null && i.memoizedState !== null, U = la, F = St;
        if (la = U || u, St = F || M, Ft(t, e), St = F, la = U, Kt(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || M || la || St || bi(e)), i = null, t = e; ; ) {
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
                  Pe(M, M.return, me);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                M = t;
                try {
                  M.stateNode.nodeValue = u ? "" : M.memoizedProps;
                } catch (me) {
                  Pe(M, M.return, me);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                M = t;
                try {
                  var G = M.stateNode;
                  u ? Ky(G, !0) : Ky(M.stateNode, !1);
                } catch (me) {
                  Pe(M, M.return, me);
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
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, to(e, i))));
        break;
      case 19:
        Ft(t, e), Kt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, to(e, l)));
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
          if (Zp(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, c = Xc(e);
            eo(e, c, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (Gi(y, ""), i.flags &= -33);
            var x = Xc(e);
            eo(e, x, y);
            break;
          case 3:
          case 4:
            var M = i.stateNode.containerInfo, U = Xc(e);
            Fc(
              e,
              U,
              M
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (F) {
        Pe(e, e.return, F);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function iy(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        iy(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function sa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Jp(e, t.alternate, t), t = t.sibling;
  }
  function bi(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ja(4, t, t.return), bi(t);
          break;
        case 1:
          Bn(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && Kp(
            t,
            t.return,
            i
          ), bi(t);
          break;
        case 27:
          Sr(t.stateNode);
        case 26:
        case 5:
          Bn(t, t.return), bi(t);
          break;
        case 22:
          t.memoizedState === null && bi(t);
          break;
        case 30:
          bi(t);
          break;
        default:
          bi(t);
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
          ), cr(4, c);
          break;
        case 1:
          if (oa(
            u,
            c,
            i
          ), l = c, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (U) {
              Pe(l, l.return, U);
            }
          if (l = c, u = l.updateQueue, u !== null) {
            var x = l.stateNode;
            try {
              var M = u.shared.hiddenCallbacks;
              if (M !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < M.length; u++)
                  Lm(M[u], x);
            } catch (U) {
              Pe(l, l.return, U);
            }
          }
          i && y & 64 && Fp(c), fr(c, c.return);
          break;
        case 27:
          $p(c);
        case 26:
        case 5:
          oa(
            u,
            c,
            i
          ), i && l === null && y & 4 && Qp(c), fr(c, c.return);
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
          ), i && y & 4 && ty(u, c);
          break;
        case 13:
          oa(
            u,
            c,
            i
          ), i && y & 4 && ny(u, c);
          break;
        case 22:
          c.memoizedState === null && oa(
            u,
            c,
            i
          ), fr(c, c.return);
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
  function Qc(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Il(i));
  }
  function Zc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Il(e));
  }
  function wn(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ly(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function ly(e, t, i, l) {
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
        ), u & 2048 && cr(9, t);
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
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Il(e)));
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
            Pe(t, t.return, M);
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
        ) : dr(e, t) : c._visibility & 2 ? wn(
          e,
          t,
          i,
          l
        ) : (c._visibility |= 2, ol(
          e,
          t,
          i,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Qc(y, t);
        break;
      case 24:
        wn(
          e,
          t,
          i,
          l
        ), u & 2048 && Zc(t.alternate, t);
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
  function ol(e, t, i, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, y = t, x = i, M = l, U = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          ol(
            c,
            y,
            x,
            M,
            u
          ), cr(8, y);
          break;
        case 23:
          break;
        case 22:
          var F = y.stateNode;
          y.memoizedState !== null ? F._visibility & 2 ? ol(
            c,
            y,
            x,
            M,
            u
          ) : dr(
            c,
            y
          ) : (F._visibility |= 2, ol(
            c,
            y,
            x,
            M,
            u
          )), u && U & 2048 && Qc(
            y.alternate,
            y
          );
          break;
        case 24:
          ol(
            c,
            y,
            x,
            M,
            u
          ), u && U & 2048 && Zc(y.alternate, y);
          break;
        default:
          ol(
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
  function dr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            dr(i, l), u & 2048 && Qc(
              l.alternate,
              l
            );
            break;
          case 24:
            dr(i, l), u & 2048 && Zc(l.alternate, l);
            break;
          default:
            dr(i, l);
        }
        t = t.sibling;
      }
  }
  var hr = 8192;
  function ul(e, t, i) {
    if (e.subtreeFlags & hr)
      for (e = e.child; e !== null; )
        ry(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function ry(e, t, i) {
    switch (e.tag) {
      case 26:
        ul(
          e,
          t,
          i
        ), e.flags & hr && e.memoizedState !== null && iT(
          i,
          Cn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ul(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var l = Cn;
        Cn = yo(e.stateNode.containerInfo), ul(
          e,
          t,
          i
        ), Cn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = hr, hr = 16777216, ul(
          e,
          t,
          i
        ), hr = l) : ul(
          e,
          t,
          i
        ));
        break;
      default:
        ul(
          e,
          t,
          i
        );
    }
  }
  function sy(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function mr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ct = l, uy(
            l,
            e
          );
        }
      sy(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        oy(e), e = e.sibling;
  }
  function oy(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        mr(e), e.flags & 2048 && ja(9, e, e.return);
        break;
      case 3:
        mr(e);
        break;
      case 12:
        mr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, no(e)) : mr(e);
        break;
      default:
        mr(e);
    }
  }
  function no(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ct = l, uy(
            l,
            e
          );
        }
      sy(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, t, t.return), no(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, no(t));
          break;
        default:
          no(t);
      }
      e = e.sibling;
    }
  }
  function uy(e, t) {
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
          Il(i.memoizedState.cache);
      }
      if (l = i.child, l !== null) l.return = i, Ct = l;
      else
        e: for (i = e; Ct !== null; ) {
          l = Ct;
          var u = l.sibling, c = l.return;
          if (Wp(l), l === i) {
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
  var bx = {
    getCacheForType: function(e) {
      var t = Dt(gt), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Dt(gt).controller.signal;
    }
  }, Sx = typeof WeakMap == "function" ? WeakMap : Map, Ge = 0, Ie = null, _e = null, Ve = 0, ke = 0, nn = null, Na = !1, cl = !1, $c = !1, ua = 0, ut = 0, za = 0, Si = 0, Ic = 0, an = 0, fl = 0, pr = null, Qt = null, Jc = !1, ao = 0, cy = 0, io = 1 / 0, lo = null, Oa = null, Et = 0, _a = null, dl = null, ca = 0, Wc = 0, ef = null, fy = null, yr = 0, tf = null;
  function ln() {
    return (Ge & 2) !== 0 && Ve !== 0 ? Ve & -Ve : B.T !== null ? of() : J();
  }
  function dy() {
    if (an === 0)
      if ((Ve & 536870912) === 0 || Be) {
        var e = Qn;
        Qn <<= 1, (Qn & 3932160) === 0 && (Qn = 262144), an = e;
      } else an = 536870912;
    return e = en.current, e !== null && (e.flags |= 32), an;
  }
  function Zt(e, t, i) {
    (e === Ie && (ke === 2 || ke === 9) || e.cancelPendingCommit !== null) && (hl(e, 0), La(
      e,
      Ve,
      an,
      !1
    )), On(e, i), ((Ge & 2) === 0 || e !== Ie) && (e === Ie && ((Ge & 2) === 0 && (Si |= i), ut === 4 && La(
      e,
      Ve,
      an,
      !1
    )), Hn(e));
  }
  function hy(e, t, i) {
    if ((Ge & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ga(e, t), u = l ? Ex(e, t) : af(e, t, !0), c = l;
    do {
      if (u === 0) {
        cl && !l && La(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, c && !xx(i)) {
          u = af(e, t, !1), c = !1;
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
              u = pr;
              var M = x.current.memoizedState.isDehydrated;
              if (M && (hl(x, y).flags |= 256), y = af(
                x,
                y,
                !1
              ), y !== 2) {
                if ($c && !M) {
                  x.errorRecoveryDisabledLanes |= c, Si |= c, u = 4;
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
          hl(e, 0), La(e, t, 0, !0);
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
          if ((t & 62914560) === t && (u = ao + 300 - Bt(), 10 < u)) {
            if (La(
              l,
              t,
              an,
              !Na
            ), Ui(l, 0, !0) !== 0) break e;
            ca = t, l.timeoutHandle = Py(
              my.bind(
                null,
                l,
                i,
                Qt,
                lo,
                Jc,
                t,
                an,
                Si,
                fl,
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
          my(
            l,
            i,
            Qt,
            lo,
            Jc,
            t,
            an,
            Si,
            fl,
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
  function my(e, t, i, l, u, c, y, x, M, U, F, Z, Y, G) {
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
      }, ry(
        t,
        c,
        Z
      );
      var me = (c & 62914560) === c ? ao - Bt() : (c & 4194048) === c ? cy - Bt() : 0;
      if (me = lT(
        Z,
        me
      ), me !== null) {
        ca = c, e.cancelPendingCommit = me(
          Ty.bind(
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
            F,
            Z,
            null,
            Y,
            G
          )
        ), La(e, c, y, !U);
        return;
      }
    }
    Ty(
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
  function xx(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var u = i[l], c = u.getSnapshot;
          u = u.value;
          try {
            if (!Jt(c(), u)) return !1;
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
    t &= ~Ic, t &= ~Si, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var c = 31 - _t(u), y = 1 << c;
      l[c] = -1, u &= ~y;
    }
    i !== 0 && ps(e, i, t);
  }
  function ro() {
    return (Ge & 6) === 0 ? (gr(0), !1) : !0;
  }
  function nf() {
    if (_e !== null) {
      if (ke === 0)
        var e = _e.return;
      else
        e = _e, Wn = fi = null, vc(e), al = null, Wl = 0, e = _e;
      for (; e !== null; )
        Xp(e.alternate, e), e = e.return;
      _e = null;
    }
  }
  function hl(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Yx(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), ca = 0, nf(), Ie = e, _e = i = In(e.current, null), Ve = t, ke = 0, nn = null, Na = !1, cl = ga(e, t), $c = !1, fl = an = Ic = Si = za = ut = 0, Qt = pr = null, Jc = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - _t(l), c = 1 << u;
        t |= e[u], l &= ~c;
      }
    return ua = t, Cs(), i;
  }
  function py(e, t) {
    Ce = null, B.H = sr, t === nl || t === Ls ? (t = Nm(), ke = 3) : t === rc ? (t = Nm(), ke = 4) : ke = t === _c ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, nn = t, _e === null && (ut = 1, Zs(
      e,
      cn(t, e.current)
    ));
  }
  function yy() {
    var e = en.current;
    return e === null ? !0 : (Ve & 4194048) === Ve ? mn === null : (Ve & 62914560) === Ve || (Ve & 536870912) !== 0 ? e === mn : !1;
  }
  function gy() {
    var e = B.H;
    return B.H = sr, e === null ? sr : e;
  }
  function vy() {
    var e = B.A;
    return B.A = bx, e;
  }
  function so() {
    ut = 4, Na || (Ve & 4194048) !== Ve && en.current !== null || (cl = !0), (za & 134217727) === 0 && (Si & 134217727) === 0 || Ie === null || La(
      Ie,
      Ve,
      an,
      !1
    );
  }
  function af(e, t, i) {
    var l = Ge;
    Ge |= 2;
    var u = gy(), c = vy();
    (Ie !== e || Ve !== t) && (lo = null, hl(e, t)), t = !1;
    var y = ut;
    e: do
      try {
        if (ke !== 0 && _e !== null) {
          var x = _e, M = nn;
          switch (ke) {
            case 8:
              nf(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              en.current === null && (t = !0);
              var U = ke;
              if (ke = 0, nn = null, ml(e, x, M, U), i && cl) {
                y = 0;
                break e;
              }
              break;
            default:
              U = ke, ke = 0, nn = null, ml(e, x, M, U);
          }
        }
        Tx(), y = ut;
        break;
      } catch (F) {
        py(e, F);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Wn = fi = null, Ge = l, B.H = u, B.A = c, _e === null && (Ie = null, Ve = 0, Cs()), y;
  }
  function Tx() {
    for (; _e !== null; ) by(_e);
  }
  function Ex(e, t) {
    var i = Ge;
    Ge |= 2;
    var l = gy(), u = vy();
    Ie !== e || Ve !== t ? (lo = null, io = Bt() + 500, hl(e, t)) : cl = ga(
      e,
      t
    );
    e: do
      try {
        if (ke !== 0 && _e !== null) {
          t = _e;
          var c = nn;
          t: switch (ke) {
            case 1:
              ke = 0, nn = null, ml(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (Dm(c)) {
                ke = 0, nn = null, Sy(t);
                break;
              }
              t = function() {
                ke !== 2 && ke !== 9 || Ie !== e || (ke = 7), Hn(e);
              }, c.then(t, t);
              break e;
            case 3:
              ke = 7;
              break e;
            case 4:
              ke = 5;
              break e;
            case 7:
              Dm(c) ? (ke = 0, nn = null, Sy(t)) : (ke = 0, nn = null, ml(e, t, c, 7));
              break;
            case 5:
              var y = null;
              switch (_e.tag) {
                case 26:
                  y = _e.memoizedState;
                case 5:
                case 27:
                  var x = _e;
                  if (y ? lg(y) : x.stateNode.complete) {
                    ke = 0, nn = null;
                    var M = x.sibling;
                    if (M !== null) _e = M;
                    else {
                      var U = x.return;
                      U !== null ? (_e = U, oo(U)) : _e = null;
                    }
                    break t;
                  }
              }
              ke = 0, nn = null, ml(e, t, c, 5);
              break;
            case 6:
              ke = 0, nn = null, ml(e, t, c, 6);
              break;
            case 8:
              nf(), ut = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Rx();
        break;
      } catch (F) {
        py(e, F);
      }
    while (!0);
    return Wn = fi = null, B.H = l, B.A = u, Ge = i, _e !== null ? 0 : (Ie = null, Ve = 0, Cs(), ut);
  }
  function Rx() {
    for (; _e !== null && !Su(); )
      by(_e);
  }
  function by(e) {
    var t = kp(e.alternate, e, ua);
    e.memoizedProps = e.pendingProps, t === null ? oo(e) : _e = t;
  }
  function Sy(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Up(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ve
        );
        break;
      case 11:
        t = Up(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ve
        );
        break;
      case 5:
        vc(t);
      default:
        Xp(i, t), t = _e = vm(t, ua), t = kp(i, t, ua);
    }
    e.memoizedProps = e.pendingProps, t === null ? oo(e) : _e = t;
  }
  function ml(e, t, i, l) {
    Wn = fi = null, vc(t), al = null, Wl = 0;
    var u = t.return;
    try {
      if (dx(
        e,
        u,
        t,
        i,
        Ve
      )) {
        ut = 1, Zs(
          e,
          cn(i, e.current)
        ), _e = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw _e = u, c;
      ut = 1, Zs(
        e,
        cn(i, e.current)
      ), _e = null;
      return;
    }
    t.flags & 32768 ? (Be || l === 1 ? e = !0 : cl || (Ve & 536870912) !== 0 ? e = !1 : (Na = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = en.current, l !== null && l.tag === 13 && (l.flags |= 16384))), xy(t, e)) : oo(t);
  }
  function oo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        xy(
          t,
          Na
        );
        return;
      }
      e = t.return;
      var i = px(
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
  function xy(e, t) {
    do {
      var i = yx(e.alternate, e);
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
  function Ty(e, t, i, l, u, c, y, x, M) {
    e.cancelPendingCommit = null;
    do
      uo();
    while (Et !== 0);
    if ((Ge & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (c = t.lanes | t.childLanes, c |= Xu, ms(
        e,
        i,
        c,
        y,
        x,
        M
      ), e === Ie && (_e = Ie = null, Ve = 0), dl = t, _a = e, ca = i, Wc = c, ef = u, fy = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, wx(ya, function() {
        return Cy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = B.T, B.T = null, u = ne.p, ne.p = 2, y = Ge, Ge |= 4;
        try {
          gx(e, t, i);
        } finally {
          Ge = y, ne.p = u, B.T = l;
        }
      }
      Et = 1, Ey(), Ry(), My();
    }
  }
  function Ey() {
    if (Et === 1) {
      Et = 0;
      var e = _a, t = dl, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = B.T, B.T = null;
        var l = ne.p;
        ne.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          ay(t, e);
          var c = yf, y = um(e.containerInfo), x = c.focusedElem, M = c.selectionRange;
          if (y !== x && x && x.ownerDocument && om(
            x.ownerDocument.documentElement,
            x
          )) {
            if (M !== null && qu(x)) {
              var U = M.start, F = M.end;
              if (F === void 0 && (F = U), "selectionStart" in x)
                x.selectionStart = U, x.selectionEnd = Math.min(
                  F,
                  x.value.length
                );
              else {
                var Z = x.ownerDocument || document, Y = Z && Z.defaultView || window;
                if (Y.getSelection) {
                  var G = Y.getSelection(), me = x.textContent.length, Ee = Math.min(M.start, me), Qe = M.end === void 0 ? Ee : Math.min(M.end, me);
                  !G.extend && Ee > Qe && (y = Qe, Qe = Ee, Ee = y);
                  var O = sm(
                    x,
                    Ee
                  ), D = sm(
                    x,
                    Qe
                  );
                  if (O && D && (G.rangeCount !== 1 || G.anchorNode !== O.node || G.anchorOffset !== O.offset || G.focusNode !== D.node || G.focusOffset !== D.offset)) {
                    var V = Z.createRange();
                    V.setStart(O.node, O.offset), G.removeAllRanges(), Ee > Qe ? (G.addRange(V), G.extend(D.node, D.offset)) : (V.setEnd(D.node, D.offset), G.addRange(V));
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
              var Q = Z[x];
              Q.element.scrollLeft = Q.left, Q.element.scrollTop = Q.top;
            }
          }
          To = !!pf, yf = pf = null;
        } finally {
          Ge = u, ne.p = l, B.T = i;
        }
      }
      e.current = t, Et = 2;
    }
  }
  function Ry() {
    if (Et === 2) {
      Et = 0;
      var e = _a, t = dl, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = B.T, B.T = null;
        var l = ne.p;
        ne.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          Jp(e, t.alternate, t);
        } finally {
          Ge = u, ne.p = l, B.T = i;
        }
      }
      Et = 3;
    }
  }
  function My() {
    if (Et === 4 || Et === 3) {
      Et = 0, xu();
      var e = _a, t = dl, i = ca, l = fy;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Et = 5 : (Et = 0, dl = _a = null, Ay(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Oa = null), H(i), t = t.stateNode, Ht && typeof Ht.onCommitFiberRoot == "function")
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
        t = B.T, u = ne.p, ne.p = 2, B.T = null;
        try {
          for (var c = e.onRecoverableError, y = 0; y < l.length; y++) {
            var x = l[y];
            c(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          B.T = t, ne.p = u;
        }
      }
      (ca & 3) !== 0 && uo(), Hn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === tf ? yr++ : (yr = 0, tf = e) : yr = 0, gr(0);
    }
  }
  function Ay(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Il(t)));
  }
  function uo() {
    return Ey(), Ry(), My(), Cy();
  }
  function Cy() {
    if (Et !== 5) return !1;
    var e = _a, t = Wc;
    Wc = 0;
    var i = H(ca), l = B.T, u = ne.p;
    try {
      ne.p = 32 > i ? 32 : i, B.T = null, i = ef, ef = null;
      var c = _a, y = ca;
      if (Et = 0, dl = _a = null, ca = 0, (Ge & 6) !== 0) throw Error(s(331));
      var x = Ge;
      if (Ge |= 4, oy(c.current), ly(
        c,
        c.current,
        y,
        i
      ), Ge = x, gr(0, !1), Ht && typeof Ht.onPostCommitFiberRoot == "function")
        try {
          Ht.onPostCommitFiberRoot(Kn, c);
        } catch {
        }
      return !0;
    } finally {
      ne.p = u, B.T = l, Ay(e, t);
    }
  }
  function wy(e, t, i) {
    t = cn(i, t), t = Oc(e.stateNode, t, 2), e = Ca(e, t, 2), e !== null && (On(e, 2), Hn(e));
  }
  function Pe(e, t, i) {
    if (e.tag === 3)
      wy(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          wy(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Oa === null || !Oa.has(l))) {
            e = cn(i, e), i = Dp(2), l = Ca(t, i, 2), l !== null && (jp(
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
  function lf(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Sx();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || ($c = !0, u.add(i), e = Mx.bind(null, e, t, i), t.then(e, e));
  }
  function Mx(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Ie === e && (Ve & i) === i && (ut === 4 || ut === 3 && (Ve & 62914560) === Ve && 300 > Bt() - ao ? (Ge & 2) === 0 && hl(e, 0) : Ic |= i, fl === Ve && (fl = 0)), Hn(e);
  }
  function Dy(e, t) {
    t === 0 && (t = Hl()), e = oi(e, t), e !== null && (On(e, t), Hn(e));
  }
  function Ax(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), Dy(e, i);
  }
  function Cx(e, t) {
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
    l !== null && l.delete(t), Dy(e, i);
  }
  function wx(e, t) {
    return Vi(e, t);
  }
  var co = null, pl = null, rf = !1, fo = !1, sf = !1, Va = 0;
  function Hn(e) {
    e !== pl && e.next === null && (pl === null ? co = pl = e : pl = pl.next = e), fo = !0, rf || (rf = !0, jx());
  }
  function gr(e, t) {
    if (!sf && fo) {
      sf = !0;
      do
        for (var i = !1, l = co; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var y = l.suspendedLanes, x = l.pingedLanes;
              c = (1 << 31 - _t(42 | e) + 1) - 1, c &= u & ~(y & ~x), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (i = !0, Oy(l, c));
          } else
            c = Ve, c = Ui(
              l,
              l === Ie ? c : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (c & 3) === 0 || ga(l, c) || (i = !0, Oy(l, c));
          l = l.next;
        }
      while (i);
      sf = !1;
    }
  }
  function Dx() {
    jy();
  }
  function jy() {
    fo = rf = !1;
    var e = 0;
    Va !== 0 && qx() && (e = Va);
    for (var t = Bt(), i = null, l = co; l !== null; ) {
      var u = l.next, c = Ny(l, t);
      c === 0 ? (l.next = null, i === null ? co = u : i.next = u, u === null && (pl = i)) : (i = l, (e !== 0 || (c & 3) !== 0) && (fo = !0)), l = u;
    }
    Et !== 0 && Et !== 5 || gr(e), Va !== 0 && (Va = 0);
  }
  function Ny(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var y = 31 - _t(c), x = 1 << y, M = u[y];
      M === -1 ? ((x & i) === 0 || (x & l) !== 0) && (u[y] = Ru(x, t)) : M <= t && (e.expiredLanes |= x), c &= ~x;
    }
    if (t = Ie, i = Ve, i = Ui(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (ke === 2 || ke === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Ul(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ga(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (l !== null && Ul(l), H(i)) {
        case 2:
        case 8:
          i = Bl;
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
      return l = zy.bind(null, e), i = Vi(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && Ul(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function zy(e, t) {
    if (Et !== 0 && Et !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (uo() && e.callbackNode !== i)
      return null;
    var l = Ve;
    return l = Ui(
      e,
      e === Ie ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (hy(e, l, t), Ny(e, Bt()), e.callbackNode != null && e.callbackNode === i ? zy.bind(null, e) : null);
  }
  function Oy(e, t) {
    if (uo()) return null;
    hy(e, t, !0);
  }
  function jx() {
    Gx(function() {
      (Ge & 6) !== 0 ? Vi(
        pa,
        Dx
      ) : jy();
    });
  }
  function of() {
    if (Va === 0) {
      var e = el;
      e === 0 && (e = ti, ti <<= 1, (ti & 261888) === 0 && (ti = 256)), Va = e;
    }
    return Va;
  }
  function _y(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : bs("" + e);
  }
  function Ly(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function Nx(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var c = _y(
        (u[ce] || null).action
      ), y = l.submitter;
      y && (t = (t = y[ce] || null) ? _y(t.formAction) : y.getAttribute("formAction"), t !== null && (c = t, y = null));
      var x = new Es(
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
                  var M = y ? Ly(u, y) : new FormData(u);
                  Cc(
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
                typeof c == "function" && (x.preventDefault(), M = y ? Ly(u, y) : new FormData(u), Cc(
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
  for (var uf = 0; uf < Pu.length; uf++) {
    var cf = Pu[uf], zx = cf.toLowerCase(), Ox = cf[0].toUpperCase() + cf.slice(1);
    An(
      zx,
      "on" + Ox
    );
  }
  An(dm, "onAnimationEnd"), An(hm, "onAnimationIteration"), An(mm, "onAnimationStart"), An("dblclick", "onDoubleClick"), An("focusin", "onFocus"), An("focusout", "onBlur"), An(Z1, "onTransitionRun"), An($1, "onTransitionStart"), An(I1, "onTransitionCancel"), An(pm, "onTransitionEnd"), _n("onMouseEnter", ["mouseout", "mouseover"]), _n("onMouseLeave", ["mouseout", "mouseover"]), _n("onPointerEnter", ["pointerout", "pointerover"]), _n("onPointerLeave", ["pointerout", "pointerover"]), At(
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
  var vr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), _x = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vr)
  );
  function Vy(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], u = l.event;
      l = l.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var x = l[y], M = x.instance, U = x.currentTarget;
            if (x = x.listener, M !== c && u.isPropagationStopped())
              break e;
            c = x, u.currentTarget = U;
            try {
              c(u);
            } catch (F) {
              As(F);
            }
            u.currentTarget = null, c = M;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (x = l[y], M = x.instance, U = x.currentTarget, x = x.listener, M !== c && u.isPropagationStopped())
              break e;
            c = x, u.currentTarget = U;
            try {
              c(u);
            } catch (F) {
              As(F);
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
    i.has(l) || (Uy(t, e, 2, !1), i.add(l));
  }
  function ff(e, t, i) {
    var l = 0;
    t && (l |= 4), Uy(
      i,
      e,
      l,
      t
    );
  }
  var ho = "_reactListening" + Math.random().toString(36).slice(2);
  function df(e) {
    if (!e[ho]) {
      e[ho] = !0, ba.forEach(function(i) {
        i !== "selectionchange" && (_x.has(i) || ff(i, !1, e), ff(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ho] || (t[ho] = !0, ff("selectionchange", !1, t));
    }
  }
  function Uy(e, t, i, l) {
    switch (dg(t)) {
      case 2:
        var u = oT;
        break;
      case 8:
        u = uT;
        break;
      default:
        u = Cf;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !Nu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function hf(e, t, i, l, u) {
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
    Gh(function() {
      var U = c, F = Du(i), Z = [];
      e: {
        var Y = ym.get(e);
        if (Y !== void 0) {
          var G = Es, me = e;
          switch (e) {
            case "keypress":
              if (xs(i) === 0) break e;
            case "keydown":
            case "keyup":
              G = C1;
              break;
            case "focusin":
              me = "focus", G = Lu;
              break;
            case "focusout":
              me = "blur", G = Lu;
              break;
            case "beforeblur":
            case "afterblur":
              G = Lu;
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
              G = Xh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              G = p1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              G = j1;
              break;
            case dm:
            case hm:
            case mm:
              G = v1;
              break;
            case pm:
              G = z1;
              break;
            case "scroll":
            case "scrollend":
              G = h1;
              break;
            case "wheel":
              G = _1;
              break;
            case "copy":
            case "cut":
            case "paste":
              G = S1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              G = Kh;
              break;
            case "toggle":
            case "beforetoggle":
              G = V1;
          }
          var Ee = (t & 4) !== 0, Qe = !Ee && (e === "scroll" || e === "scrollend"), O = Ee ? Y !== null ? Y + "Capture" : null : Y;
          Ee = [];
          for (var D = U, V; D !== null; ) {
            var Q = D;
            if (V = Q.stateNode, Q = Q.tag, Q !== 5 && Q !== 26 && Q !== 27 || V === null || O === null || (Q = ql(D, O), Q != null && Ee.push(
              br(D, Q, V)
            )), Qe) break;
            D = D.return;
          }
          0 < Ee.length && (Y = new G(
            Y,
            me,
            null,
            i,
            F
          ), Z.push({ event: Y, listeners: Ee }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (Y = e === "mouseover" || e === "pointerover", G = e === "mouseout" || e === "pointerout", Y && i !== wu && (me = i.relatedTarget || i.fromElement) && (Xe(me) || me[ge]))
            break e;
          if ((G || Y) && (Y = F.window === F ? F : (Y = F.ownerDocument) ? Y.defaultView || Y.parentWindow : window, G ? (me = i.relatedTarget || i.toElement, G = U, me = me ? Xe(me) : null, me !== null && (Qe = f(me), Ee = me.tag, me !== Qe || Ee !== 5 && Ee !== 27 && Ee !== 6) && (me = null)) : (G = null, me = U), G !== me)) {
            if (Ee = Xh, Q = "onMouseLeave", O = "onMouseEnter", D = "mouse", (e === "pointerout" || e === "pointerover") && (Ee = Kh, Q = "onPointerLeave", O = "onPointerEnter", D = "pointer"), Qe = G == null ? Y : Oe(G), V = me == null ? Y : Oe(me), Y = new Ee(
              Q,
              D + "leave",
              G,
              i,
              F
            ), Y.target = Qe, Y.relatedTarget = V, Q = null, Xe(F) === U && (Ee = new Ee(
              O,
              D + "enter",
              me,
              i,
              F
            ), Ee.target = V, Ee.relatedTarget = Qe, Q = Ee), Qe = Q, G && me)
              t: {
                for (Ee = Lx, O = G, D = me, V = 0, Q = O; Q; Q = Ee(Q))
                  V++;
                Q = 0;
                for (var Se = D; Se; Se = Ee(Se))
                  Q++;
                for (; 0 < V - Q; )
                  O = Ee(O), V--;
                for (; 0 < Q - V; )
                  D = Ee(D), Q--;
                for (; V--; ) {
                  if (O === D || D !== null && O === D.alternate) {
                    Ee = O;
                    break t;
                  }
                  O = Ee(O), D = Ee(D);
                }
                Ee = null;
              }
            else Ee = null;
            G !== null && By(
              Z,
              Y,
              G,
              Ee,
              !1
            ), me !== null && Qe !== null && By(
              Z,
              Qe,
              me,
              Ee,
              !0
            );
          }
        }
        e: {
          if (Y = U ? Oe(U) : window, G = Y.nodeName && Y.nodeName.toLowerCase(), G === "select" || G === "input" && Y.type === "file")
            var qe = tm;
          else if (Wh(Y))
            if (nm)
              qe = F1;
            else {
              qe = P1;
              var ve = k1;
            }
          else
            G = Y.nodeName, !G || G.toLowerCase() !== "input" || Y.type !== "checkbox" && Y.type !== "radio" ? U && Cu(U.elementType) && (qe = tm) : qe = X1;
          if (qe && (qe = qe(e, U))) {
            em(
              Z,
              qe,
              i,
              F
            );
            break e;
          }
          ve && ve(e, Y, U), e === "focusout" && U && Y.type === "number" && U.memoizedProps.value != null && Au(Y, "number", Y.value);
        }
        switch (ve = U ? Oe(U) : window, e) {
          case "focusin":
            (Wh(ve) || ve.contentEditable === "true") && (Fi = ve, Yu = U, Ql = null);
            break;
          case "focusout":
            Ql = Yu = Fi = null;
            break;
          case "mousedown":
            Gu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Gu = !1, cm(Z, i, F);
            break;
          case "selectionchange":
            if (Q1) break;
          case "keydown":
          case "keyup":
            cm(Z, i, F);
        }
        var we;
        if (Uu)
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
          Xi ? Ih(e, i) && (Ue = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Ue = "onCompositionStart");
        Ue && (Qh && i.locale !== "ko" && (Xi || Ue !== "onCompositionStart" ? Ue === "onCompositionEnd" && Xi && (we = kh()) : (Sa = F, zu = "value" in Sa ? Sa.value : Sa.textContent, Xi = !0)), ve = mo(U, Ue), 0 < ve.length && (Ue = new Fh(
          Ue,
          e,
          null,
          i,
          F
        ), Z.push({ event: Ue, listeners: ve }), we ? Ue.data = we : (we = Jh(i), we !== null && (Ue.data = we)))), (we = B1 ? H1(e, i) : q1(e, i)) && (Ue = mo(U, "onBeforeInput"), 0 < Ue.length && (ve = new Fh(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          F
        ), Z.push({
          event: ve,
          listeners: Ue
        }), ve.data = we)), Nx(
          Z,
          e,
          U,
          i,
          F
        );
      }
      Vy(Z, t);
    });
  }
  function br(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function mo(e, t) {
    for (var i = t + "Capture", l = []; e !== null; ) {
      var u = e, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = ql(e, i), u != null && l.unshift(
        br(e, u, c)
      ), u = ql(e, t), u != null && l.push(
        br(e, u, c)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Lx(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function By(e, t, i, l, u) {
    for (var c = t._reactName, y = []; i !== null && i !== l; ) {
      var x = i, M = x.alternate, U = x.stateNode;
      if (x = x.tag, M !== null && M === l) break;
      x !== 5 && x !== 26 && x !== 27 || U === null || (M = U, u ? (U = ql(i, c), U != null && y.unshift(
        br(i, U, M)
      )) : u || (U = ql(i, c), U != null && y.push(
        br(i, U, M)
      ))), i = i.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var Vx = /\r\n?/g, Ux = /\u0000|\uFFFD/g;
  function Hy(e) {
    return (typeof e == "string" ? e : "" + e).replace(Vx, `
`).replace(Ux, "");
  }
  function qy(e, t) {
    return t = Hy(t), Hy(e) === t;
  }
  function Ke(e, t, i, l, u, c) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || Gi(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && Gi(e, "" + l);
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
        qh(e, l, c);
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
        l = bs("" + l), e.setAttribute(i, l);
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
        l = bs("" + l), e.setAttribute(i, l);
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
        i = bs("" + l), e.setAttributeNS(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = f1.get(i) || i, Ne(e, i, l));
    }
  }
  function mf(e, t, i, l, u, c) {
    switch (i) {
      case "style":
        qh(e, l, c);
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
        typeof l == "string" ? Gi(e, l) : (typeof l == "number" || typeof l == "bigint") && Gi(e, "" + l);
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
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), c = e[ce] || null, c = c != null ? c[i] : null, typeof c == "function" && e.removeEventListener(t, c, u), typeof l == "function")) {
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
        var x = c = y = u = null, M = null, U = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var F = i[l];
            if (F != null)
              switch (l) {
                case "name":
                  u = F;
                  break;
                case "type":
                  y = F;
                  break;
                case "checked":
                  M = F;
                  break;
                case "defaultChecked":
                  U = F;
                  break;
                case "value":
                  c = F;
                  break;
                case "defaultValue":
                  x = F;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (F != null)
                    throw Error(s(137, t));
                  break;
                default:
                  Ke(e, t, l, F, i, null);
              }
          }
        Vh(
          e,
          c,
          x,
          M,
          U,
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
        t = c, i = y, e.multiple = !!l, t != null ? Yi(e, !!l, t, !1) : i != null && Yi(e, !!l, i, !0);
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
        Bh(e, l, u, c);
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
        for (l = 0; l < vr.length; l++)
          Le(vr[l], e);
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
        for (U in i)
          if (i.hasOwnProperty(U) && (l = i[U], l != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Ke(e, t, U, l, i, null);
            }
        return;
      default:
        if (Cu(t)) {
          for (F in i)
            i.hasOwnProperty(F) && (l = i[F], l !== void 0 && mf(
              e,
              t,
              F,
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
  function Bx(e, t, i, l) {
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
        var u = null, c = null, y = null, x = null, M = null, U = null, F = null;
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
                U = G;
                break;
              case "defaultChecked":
                F = G;
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
        Mu(
          e,
          y,
          x,
          M,
          U,
          F,
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
        t = x, i = y, l = G, Y != null ? Yi(e, !!i, Y, !1) : !!l != !!i && (t != null ? Yi(e, !!i, t, !0) : Yi(e, !!i, i ? [] : "", !1));
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
        Uh(e, Y, G);
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
        for (U in l)
          if (Y = l[U], G = i[U], l.hasOwnProperty(U) && Y !== G && (Y != null || G != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(s(137, t));
                break;
              default:
                Ke(
                  e,
                  t,
                  U,
                  Y,
                  l,
                  G
                );
            }
        return;
      default:
        if (Cu(t)) {
          for (var Qe in i)
            Y = i[Qe], i.hasOwnProperty(Qe) && Y !== void 0 && !l.hasOwnProperty(Qe) && mf(
              e,
              t,
              Qe,
              void 0,
              l,
              Y
            );
          for (F in l)
            Y = l[F], G = i[F], !l.hasOwnProperty(F) || Y === G || Y === void 0 && G === void 0 || mf(
              e,
              t,
              F,
              Y,
              l,
              G
            );
          return;
        }
    }
    for (var O in i)
      Y = i[O], i.hasOwnProperty(O) && Y != null && !l.hasOwnProperty(O) && Ke(e, t, O, null, l, Y);
    for (Z in l)
      Y = l[Z], G = i[Z], !l.hasOwnProperty(Z) || Y === G || Y == null && G == null || Ke(e, t, Z, Y, l, G);
  }
  function Yy(e) {
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
  function Hx() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l], c = u.transferSize, y = u.initiatorType, x = u.duration;
        if (c && x && Yy(y)) {
          for (y = 0, x = u.responseEnd, l += 1; l < i.length; l++) {
            var M = i[l], U = M.startTime;
            if (U > x) break;
            var F = M.transferSize, Z = M.initiatorType;
            F && Yy(Z) && (M = M.responseEnd, y += F * (M < x ? 1 : (x - U) / (M - U)));
          }
          if (--l, t += 8 * (c + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var pf = null, yf = null;
  function po(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Gy(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ky(e, t) {
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
  function gf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var vf = null;
  function qx() {
    var e = window.event;
    return e && e.type === "popstate" ? e === vf ? !1 : (vf = e, !0) : (vf = null, !1);
  }
  var Py = typeof setTimeout == "function" ? setTimeout : void 0, Yx = typeof clearTimeout == "function" ? clearTimeout : void 0, Xy = typeof Promise == "function" ? Promise : void 0, Gx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xy < "u" ? function(e) {
    return Xy.resolve(null).then(e).catch(kx);
  } : Py;
  function kx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ua(e) {
    return e === "head";
  }
  function Fy(e, t) {
    var i = t, l = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(u), bl(t);
            return;
          }
          l--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          l++;
        else if (i === "html")
          Sr(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Sr(i);
          for (var c = i.firstChild; c; ) {
            var y = c.nextSibling, x = c.nodeName;
            c[je] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && c.rel.toLowerCase() === "stylesheet" || i.removeChild(c), c = y;
          }
        } else
          i === "body" && Sr(e.ownerDocument.body);
      i = u;
    } while (i);
    bl(t);
  }
  function Ky(e, t) {
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
  function bf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          bf(i), $e(i);
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
  function Px(e, t, i, l) {
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
  function Xx(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Qy(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Sf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function xf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Fx(e, t) {
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
  var Tf = null;
  function Zy(e) {
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
  function $y(e) {
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
  function Iy(e, t, i) {
    switch (t = po(i), e) {
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
  function Sr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    $e(e);
  }
  var yn = /* @__PURE__ */ new Map(), Jy = /* @__PURE__ */ new Set();
  function yo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var fa = ne.d;
  ne.d = {
    f: Kx,
    r: Qx,
    D: Zx,
    C: $x,
    L: Ix,
    m: Jx,
    X: eT,
    S: Wx,
    M: tT
  };
  function Kx() {
    var e = fa.f(), t = ro();
    return e || t;
  }
  function Qx(e) {
    var t = it(e);
    t !== null && t.tag === 5 && t.type === "form" ? pp(t) : fa.r(e);
  }
  var yl = typeof document > "u" ? null : document;
  function Wy(e, t, i) {
    var l = yl;
    if (l && typeof t == "string" && t) {
      var u = on(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), Jy.has(u) || (Jy.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function Zx(e) {
    fa.D(e), Wy("dns-prefetch", e, null);
  }
  function $x(e, t) {
    fa.C(e, t), Wy("preconnect", e, t);
  }
  function Ix(e, t, i) {
    fa.L(e, t, i);
    var l = yl;
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
          c = gl(e);
          break;
        case "script":
          c = vl(e);
      }
      yn.has(c) || (e = v(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), yn.set(c, e), l.querySelector(u) !== null || t === "style" && l.querySelector(xr(c)) || t === "script" && l.querySelector(Tr(c)) || (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function Jx(e, t) {
    fa.m(e, t);
    var i = yl;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + on(l) + '"][href="' + on(e) + '"]', c = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = vl(e);
      }
      if (!yn.has(c) && (e = v({ rel: "modulepreload", href: e }, t), yn.set(c, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Tr(c)))
              return;
        }
        l = i.createElement("link"), Nt(l, "link", e), We(l), i.head.appendChild(l);
      }
    }
  }
  function Wx(e, t, i) {
    fa.S(e, t, i);
    var l = yl;
    if (l && e) {
      var u = pt(l).hoistableStyles, c = gl(e);
      t = t || "default";
      var y = u.get(c);
      if (!y) {
        var x = { loading: 0, preload: null };
        if (y = l.querySelector(
          xr(c)
        ))
          x.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = yn.get(c)) && Ef(e, i);
          var M = y = l.createElement("link");
          We(M), Nt(M, "link", e), M._p = new Promise(function(U, F) {
            M.onload = U, M.onerror = F;
          }), M.addEventListener("load", function() {
            x.loading |= 1;
          }), M.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, go(y, t, l);
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
  function eT(e, t) {
    fa.X(e, t);
    var i = yl;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = vl(e), c = l.get(u);
      c || (c = i.querySelector(Tr(u)), c || (e = v({ src: e, async: !0 }, t), (t = yn.get(u)) && Rf(e, t), c = i.createElement("script"), We(c), Nt(c, "link", e), i.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function tT(e, t) {
    fa.M(e, t);
    var i = yl;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = vl(e), c = l.get(u);
      c || (c = i.querySelector(Tr(u)), c || (e = v({ src: e, async: !0, type: "module" }, t), (t = yn.get(u)) && Rf(e, t), c = i.createElement("script"), We(c), Nt(c, "link", e), i.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function eg(e, t, i, l) {
    var u = (u = Me.current) ? yo(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = gl(i.href), i = pt(
          u
        ).hoistableStyles, l = i.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = gl(i.href);
          var c = pt(
            u
          ).hoistableStyles, y = c.get(e);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, y), (c = u.querySelector(
            xr(e)
          )) && !c._p && (y.instance = c, y.state.loading = 5), yn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, yn.set(e, i), c || nT(
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
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = vl(i), i = pt(
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
  function gl(e) {
    return 'href="' + on(e) + '"';
  }
  function xr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function tg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function nT(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Nt(t, "link", i), We(t), e.head.appendChild(t));
  }
  function vl(e) {
    return '[src="' + on(e) + '"]';
  }
  function Tr(e) {
    return "script[async]" + e;
  }
  function ng(e, t, i) {
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
          ), We(l), Nt(l, "style", u), go(l, i.precedence, e), t.instance = l;
        case "stylesheet":
          u = gl(i.href);
          var c = e.querySelector(
            xr(u)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, We(c), c;
          l = tg(i), (u = yn.get(u)) && Ef(l, u), c = (e.ownerDocument || e).createElement("link"), We(c);
          var y = c;
          return y._p = new Promise(function(x, M) {
            y.onload = x, y.onerror = M;
          }), Nt(c, "link", l), t.state.loading |= 4, go(c, i.precedence, e), t.instance = c;
        case "script":
          return c = vl(i.src), (u = e.querySelector(
            Tr(c)
          )) ? (t.instance = u, We(u), u) : (l = i, (u = yn.get(c)) && (l = v({}, i), Rf(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), We(u), Nt(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, go(l, i.precedence, e));
    return t.instance;
  }
  function go(e, t, i) {
    for (var l = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, c = u, y = 0; y < l.length; y++) {
      var x = l[y];
      if (x.dataset.precedence === t) c = x;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Ef(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Rf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var vo = null;
  function ag(e, t, i) {
    if (vo === null) {
      var l = /* @__PURE__ */ new Map(), u = vo = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = vo, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var c = i[u];
      if (!(c[je] || c[ue] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = c.getAttribute(t) || "";
        y = e + y;
        var x = l.get(y);
        x ? x.push(c) : l.set(y, [c]);
      }
    }
    return l;
  }
  function ig(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function aT(e, t, i) {
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
  function lg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function iT(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = gl(l.href), c = t.querySelector(
          xr(u)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = bo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = c, We(c);
          return;
        }
        c = t.ownerDocument || t, l = tg(l), (u = yn.get(u)) && Ef(l, u), c = c.createElement("link"), We(c);
        var y = c;
        y._p = new Promise(function(x, M) {
          y.onload = x, y.onerror = M;
        }), Nt(c, "link", l), i.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = bo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Mf = 0;
  function lT(e, t) {
    return e.stylesheets && e.count === 0 && xo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && xo(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Mf === 0 && (Mf = 62500 * Hx());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && xo(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > Mf ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function bo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) xo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var So = null;
  function xo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, So = /* @__PURE__ */ new Map(), t.forEach(rT, e), So = null, bo.call(e));
  }
  function rT(e, t) {
    if (!(t.state.loading & 4)) {
      var i = So.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), So.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var y = u[c];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (i.set(y.dataset.precedence, y), l = y);
        }
        l && i.set(null, l);
      }
      u = t.instance, y = u.getAttribute("data-precedence"), c = i.get(y) || l, c === l && i.set(null, u), i.set(y, u), this.count++, l = bo.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), c ? c.parentNode.insertBefore(u, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Er = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: re,
    _currentValue2: re,
    _threadCount: 0
  };
  function sT(e, t, i, l, u, c, y, x, M) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = va(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = va(0), this.hiddenUpdates = va(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = M, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function rg(e, t, i, l, u, c, y, x, M, U, F, Z) {
    return e = new sT(
      e,
      t,
      i,
      y,
      M,
      U,
      F,
      Z,
      x
    ), t = 1, c === !0 && (t |= 24), c = Wt(3, null, null, t), e.current = c, c.stateNode = e, t = ac(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, sc(c), e;
  }
  function sg(e) {
    return e ? (e = Zi, e) : Zi;
  }
  function og(e, t, i, l, u, c) {
    u = sg(u), l.context === null ? l.context = u : l.pendingContext = u, l = Aa(t), l.payload = { element: i }, c = c === void 0 ? null : c, c !== null && (l.callback = c), i = Ca(e, l, t), i !== null && (Zt(i, e, t), tr(i, e, t));
  }
  function ug(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Af(e, t) {
    ug(e, t), (e = e.alternate) && ug(e, t);
  }
  function cg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = oi(e, 67108864);
      t !== null && Zt(t, e, 67108864), Af(e, 67108864);
    }
  }
  function fg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ln();
      t = z(t);
      var i = oi(e, t);
      i !== null && Zt(i, e, t), Af(e, t);
    }
  }
  var To = !0;
  function oT(e, t, i, l) {
    var u = B.T;
    B.T = null;
    var c = ne.p;
    try {
      ne.p = 2, Cf(e, t, i, l);
    } finally {
      ne.p = c, B.T = u;
    }
  }
  function uT(e, t, i, l) {
    var u = B.T;
    B.T = null;
    var c = ne.p;
    try {
      ne.p = 8, Cf(e, t, i, l);
    } finally {
      ne.p = c, B.T = u;
    }
  }
  function Cf(e, t, i, l) {
    if (To) {
      var u = wf(l);
      if (u === null)
        hf(
          e,
          t,
          l,
          Eo,
          i
        ), hg(e, l);
      else if (fT(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (hg(e, l), t & 4 && -1 < cT.indexOf(e)) {
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
                    Hn(c), (Ge & 6) === 0 && (io = Bt() + 500, gr(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = oi(c, 2), x !== null && Zt(x, c, 2), ro(), Af(c, 2);
            }
          if (c = wf(l), c === null && hf(
            e,
            t,
            l,
            Eo,
            i
          ), c === u) break;
          u = c;
        }
        u !== null && l.stopPropagation();
      } else
        hf(
          e,
          t,
          l,
          null,
          i
        );
    }
  }
  function wf(e) {
    return e = Du(e), Df(e);
  }
  var Eo = null;
  function Df(e) {
    if (Eo = null, e = Xe(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Eo = e, null;
  }
  function dg(e) {
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
          case Bl:
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
  var jf = !1, Ba = null, Ha = null, qa = null, Rr = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Map(), Ya = [], cT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function hg(e, t) {
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
        Rr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mr.delete(t.pointerId);
    }
  }
  function Ar(e, t, i, l, u, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: c,
      targetContainers: [u]
    }, t !== null && (t = it(t), t !== null && cg(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function fT(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return Ba = Ar(
          Ba,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "dragenter":
        return Ha = Ar(
          Ha,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "mouseover":
        return qa = Ar(
          qa,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return Rr.set(
          c,
          Ar(
            Rr.get(c) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, Mr.set(
          c,
          Ar(
            Mr.get(c) || null,
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
  function mg(e) {
    var t = Xe(e.target);
    if (t !== null) {
      var i = f(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, ie(e.priority, function() {
              fg(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, ie(e.priority, function() {
              fg(i);
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
  function Ro(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = wf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        wu = l, i.target.dispatchEvent(l), wu = null;
      } else
        return t = it(i), t !== null && cg(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function pg(e, t, i) {
    Ro(e) && i.delete(t);
  }
  function dT() {
    jf = !1, Ba !== null && Ro(Ba) && (Ba = null), Ha !== null && Ro(Ha) && (Ha = null), qa !== null && Ro(qa) && (qa = null), Rr.forEach(pg), Mr.forEach(pg);
  }
  function Mo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, jf || (jf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      dT
    )));
  }
  var Ao = null;
  function yg(e) {
    Ao !== e && (Ao = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ao === e && (Ao = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (Df(l || i) === null)
              continue;
            break;
          }
          var c = it(i);
          c !== null && (e.splice(t, 3), t -= 3, Cc(
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
  function bl(e) {
    function t(M) {
      return Mo(M, e);
    }
    Ba !== null && Mo(Ba, e), Ha !== null && Mo(Ha, e), qa !== null && Mo(qa, e), Rr.forEach(t), Mr.forEach(t);
    for (var i = 0; i < Ya.length; i++) {
      var l = Ya[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ya.length && (i = Ya[0], i.blockedOn === null); )
      mg(i), i.blockedOn === null && Ya.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], c = i[l + 1], y = u[ce] || null;
        if (typeof c == "function")
          y || yg(i);
        else if (y) {
          var x = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, y = c[ce] || null)
              x = y.formAction;
            else if (Df(u) !== null) continue;
          } else x = y.action;
          typeof x == "function" ? i[l + 1] = x : (i.splice(l, 3), l -= 3), yg(i);
        }
      }
  }
  function gg() {
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
  function Nf(e) {
    this._internalRoot = e;
  }
  Co.prototype.render = Nf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = ln();
    og(i, l, e, t, null, null);
  }, Co.prototype.unmount = Nf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      og(e.current, 2, null, e, null, null), ro(), t[ge] = null;
    }
  };
  function Co(e) {
    this._internalRoot = e;
  }
  Co.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = J();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < Ya.length && t !== 0 && t < Ya[i].priority; i++) ;
      Ya.splice(i, 0, e), i === 0 && mg(e);
    }
  };
  var vg = a.version;
  if (vg !== "19.2.5")
    throw Error(
      s(
        527,
        vg,
        "19.2.5"
      )
    );
  ne.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(t), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var hT = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: B,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var wo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!wo.isDisabled && wo.supportsFiber)
      try {
        Kn = wo.inject(
          hT
        ), Ht = wo;
      } catch {
      }
  }
  return wr.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = Mp, c = Ap, y = Cp;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = rg(
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
      gg
    ), e[ge] = t.current, df(e), new Nf(t);
  }, wr.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", c = Mp, y = Ap, x = Cp, M = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (c = i.onUncaughtError), i.onCaughtError !== void 0 && (y = i.onCaughtError), i.onRecoverableError !== void 0 && (x = i.onRecoverableError), i.formState !== void 0 && (M = i.formState)), t = rg(
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
      gg
    ), t.context = sg(null), i = t.current, l = ln(), l = z(l), u = Aa(l), u.callback = null, Ca(i, u, l), i = l, t.current.lanes = i, On(t, i), Hn(t), e[ge] = t.current, df(e), new Co(t);
  }, wr.version = "19.2.5", wr;
}
var wg;
function CT() {
  if (wg) return _f.exports;
  wg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), _f.exports = AT(), _f.exports;
}
var wT = CT();
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
var z0 = (n) => {
  throw TypeError(n);
}, DT = (n, a, r) => a.has(n) || z0("Cannot " + r), Bf = (n, a, r) => (DT(n, a, "read from private field"), r ? r.call(n) : a.get(n)), jT = (n, a, r) => a.has(n) ? z0("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function Dg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function NT(n = {}) {
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
  ), d = "POP", h = null;
  function p(T) {
    return Math.min(Math.max(T, 0), o.length - 1);
  }
  function m() {
    return o[f];
  }
  function g(T, R = null, w, N) {
    let _ = dd(
      o ? m().pathname : "/",
      T,
      R,
      w,
      N
    );
    return ht(
      _.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        T
      )}`
    ), _;
  }
  function v(T) {
    return typeof T == "string" ? T : kn(T);
  }
  return {
    get index() {
      return f;
    },
    get action() {
      return d;
    },
    get location() {
      return m();
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
      let w = Dg(T) ? T : g(T, R);
      f += 1, o.splice(f, o.length, w), s && h && h({ action: d, location: w, delta: 1 });
    },
    replace(T, R) {
      d = "REPLACE";
      let w = Dg(T) ? T : g(T, R);
      o[f] = w, s && h && h({ action: d, location: w, delta: 0 });
    },
    go(T) {
      d = "POP";
      let R = p(f + T), w = o[R];
      f = R, h && h({ action: d, location: w, delta: T });
    },
    listen(T) {
      return h = T, () => {
        h = null;
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
function zT() {
  return Math.random().toString(36).substring(2, 10);
}
function dd(n, a, r = null, s, o) {
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
    key: a && a.key || s || zT(),
    unstable_mask: o
  };
}
function kn({
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
function OT(n, a = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), ze(r, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : kn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var Br, jg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (jT(this, Br, /* @__PURE__ */ new Map()), n)
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
    if (Bf(this, Br).has(n))
      return Bf(this, Br).get(n);
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
    Bf(this, Br).set(n, a);
  }
};
Br = /* @__PURE__ */ new WeakMap();
var _T = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function LT(n) {
  return _T.has(
    n
  );
}
var VT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function UT(n) {
  return VT.has(
    n
  );
}
function BT(n) {
  return n.index === !0;
}
function Fr(n, a, r = [], s = {}, o = !1) {
  return n.map((f, d) => {
    let h = [...r, String(d)], p = typeof f.id == "string" ? f.id : h.join("-");
    if (ze(
      f.index !== !0 || !f.children,
      "Cannot specify children on an index route"
    ), ze(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), BT(f)) {
      let m = {
        ...f,
        id: p
      };
      return s[p] = Ng(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...f,
        id: p,
        children: void 0
      };
      return s[p] = Ng(
        m,
        a(m)
      ), f.children && (m.children = Fr(
        f.children,
        a,
        h,
        s,
        o
      )), m;
    }
  });
}
function Ng(n, a) {
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
  return Hr(n, a, r, !1);
}
function Hr(n, a, r, s) {
  let o = typeof a == "string" ? zn(a) : a, f = xn(o.pathname || "/", r);
  if (f == null)
    return null;
  let d = O0(n);
  qT(d);
  let h = null;
  for (let p = 0; h == null && p < d.length; ++p) {
    let m = IT(f);
    h = ZT(
      d[p],
      m,
      s
    );
  }
  return h;
}
function HT(n, a) {
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
function O0(n, a = [], r = [], s = "", o = !1) {
  let f = (d, h, p = o, m) => {
    let g = {
      relativePath: m === void 0 ? d.path || "" : m,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: h,
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
    ), O0(
      d.children,
      a,
      S,
      v,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: v,
      score: KT(v, d.index),
      routesMeta: S
    });
  };
  return n.forEach((d, h) => {
    if (d.path === "" || !d.path?.includes("?"))
      f(d, h);
    else
      for (let p of _0(d.path))
        f(d, h, !0, p);
  }), a;
}
function _0(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), f = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [f, ""] : [f];
  let d = _0(s.join("/")), h = [];
  return h.push(
    ...d.map(
      (p) => p === "" ? f : [f, p].join("/")
    )
  ), o && h.push(...d), h.map(
    (p) => n.startsWith("/") && p === "" ? "/" : p
  );
}
function qT(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : QT(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var YT = /^:[\w-]+$/, GT = 3, kT = 2, PT = 1, XT = 10, FT = -2, zg = (n) => n === "*";
function KT(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(zg) && (s += FT), a && (s += kT), r.filter((o) => !zg(o)).reduce(
    (o, f) => o + (YT.test(f) ? GT : f === "" ? PT : XT),
    s
  );
}
function QT(n, a) {
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
function ZT(n, a, r = !1) {
  let { routesMeta: s } = n, o = {}, f = "/", d = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, g = f === "/" ? a : a.slice(f.length) || "/", v = $o(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      g
    ), S = p.route;
    if (!v && m && r && !s[s.length - 1].route.index && (v = $o(
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
      pathnameBase: eE(
        bn([f, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (f = bn([f, v.pathnameBase]));
  }
  return d;
}
function $o(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [r, s] = $T(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(r);
  if (!o) return null;
  let f = o[0], d = f.replace(/(.)\/+$/, "$1"), h = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: g, isOptional: v }, S) => {
        if (g === "*") {
          let R = h[S] || "";
          d = f.slice(0, f.length - R.length).replace(/(.)\/+$/, "$1");
        }
        const T = h[S];
        return v && !T ? m[g] = void 0 : m[g] = (T || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: f,
    pathnameBase: d,
    pattern: n
  };
}
function $T(n, a = !1, r = !0) {
  ht(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (d, h, p, m, g) => {
      if (s.push({ paramName: h, isOptional: p != null }), p) {
        let v = g.charAt(m + d.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function IT(n) {
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
function JT({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : bn([n, a]);
}
var L0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, kd = (n) => L0.test(n);
function WT(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? zn(n) : n, f;
  return r ? (r = Xd(r), r.startsWith("/") ? f = Og(r.substring(1), "/") : f = Og(r, a)) : f = a, {
    pathname: f,
    search: tE(s),
    hash: nE(o)
  };
}
function Og(n, a) {
  let r = Io(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Hf(n, a, r, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function V0(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Pd(n) {
  let a = V0(n);
  return a.map(
    (r, s) => s === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function cu(n, a, r, s = !1) {
  let o;
  typeof n == "string" ? o = zn(n) : (o = { ...n }, ze(
    !o.pathname || !o.pathname.includes("?"),
    Hf("?", "pathname", "search", o)
  ), ze(
    !o.pathname || !o.pathname.includes("#"),
    Hf("#", "pathname", "hash", o)
  ), ze(
    !o.search || !o.search.includes("#"),
    Hf("#", "search", "hash", o)
  ));
  let f = n === "" || o.pathname === "", d = f ? "/" : o.pathname, h;
  if (d == null)
    h = r;
  else {
    let v = a.length - 1;
    if (!s && d.startsWith("..")) {
      let S = d.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    h = v >= 0 ? a[v] : "/";
  }
  let p = WT(o, h), m = d && d !== "/" && d.endsWith("/"), g = (f || d === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || g) && (p.pathname += "/"), p;
}
var Xd = (n) => n.replace(/\/\/+/g, "/"), bn = (n) => Xd(n.join("/")), Io = (n) => n.replace(/\/+$/, ""), eE = (n) => Io(n).replace(/^\/*/, "/"), tE = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, nE = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, aE = (n, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let s = new Headers(r.headers);
  return s.set("Location", n), new Response(null, { ...r, headers: s });
}, fu = class {
  constructor(n, a, r, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Kr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function Wr(n) {
  let a = n.map((r) => r.route.path).filter(Boolean);
  return bn(a) || "/";
}
var U0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function B0(n, a) {
  let r = n;
  if (typeof r != "string" || !L0.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (U0)
    try {
      let f = new URL(window.location.href), d = r.startsWith("//") ? new URL(f.protocol + r) : new URL(r), h = xn(d.pathname, a);
      d.origin === f.origin && h != null ? r = h + d.search + d.hash : o = !0;
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
function iE(n, a) {
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
        for (let h of d)
          f[h] && r[h].push(f[h]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let o = El(r.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((f) => {
      let d = o[f], h = r[`lazy.${f}`];
      if (typeof d == "function" && h.length > 0) {
        let p = El(h, d, () => {
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
      let d = f[Qa] ?? f, h = El(
        r[o],
        d,
        (...p) => _g(p[0])
      );
      h && (o === "loader" && d.hydrate === !0 && (h.hydrate = !0), h[Qa] = d, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let f = o[Qa] ?? o, d = El(
      r.middleware,
      f,
      (...h) => _g(h[0])
    );
    return d ? (d[Qa] = f, d) : o;
  })), s;
}
function lE(n, a) {
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
    let s = n.navigate[Qa] ?? n.navigate, o = El(
      r.navigate,
      s,
      (...f) => {
        let [d, h] = f;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? kn(d) : ".",
          ...Lg(n, h ?? {})
        };
      }
    );
    o && (o[Qa] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[Qa] ?? n.fetch, o = El(r.fetch, s, (...f) => {
      let [d, , h, p] = f;
      return {
        href: h ?? ".",
        fetcherKey: d,
        ...Lg(n, p ?? {})
      };
    });
    o && (o[Qa] = s, n.fetch = o);
  }
  return n;
}
function El(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await H0(
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
async function H0(n, a, r, s) {
  let o = n[s], f;
  if (o) {
    let d, h = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = H0(n, a, r, s - 1), f = await d, ze(f, "Expected a result"), f.type === "error" && f.value instanceof Error ? { status: "error", error: f.value } : { status: "success", error: void 0 });
    try {
      await o(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    d || await h(), await d;
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
function _g(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: rE(a),
    params: { ...s },
    unstable_pattern: o,
    context: sE(r)
  };
}
function Lg(n, a) {
  return {
    currentUrl: kn(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function rE(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function sE(n) {
  if (uE(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var oE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function uE(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === oE;
}
var q0 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], cE = new Set(
  q0
), fE = [
  "GET",
  ...q0
], dE = new Set(fE), Y0 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), hE = /* @__PURE__ */ new Set([307, 308]), qf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, mE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Dr = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, pE = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), G0 = "remix-router-transitions", k0 = Symbol("ResetLoaderData");
function yE(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  ze(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || pE, f = o;
  if (n.unstable_instrumentations) {
    let A = n.unstable_instrumentations;
    f = (z) => ({
      ...o(z),
      ...iE(
        A.map((H) => H.route).filter(Boolean),
        z
      )
    });
  }
  let d = {}, h = Fr(
    n.routes,
    f,
    void 0,
    d
  ), p, m = n.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let g = n.dataStrategy || xE, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, T = /* @__PURE__ */ new Set(), R = null, w = null, N = null, _ = n.hydrationData != null, q = Fa(h, n.history.location, m), L = !1, K = null, I, $;
  if (q == null && !n.patchRoutesOnNavigation) {
    let A = gn(404, {
      pathname: n.history.location.pathname
    }), { matches: z, route: H } = Do(h);
    I = !0, $ = !I, q = z, K = { [H.id]: A };
  } else if (q && !n.hydrationData && va(
    q,
    h,
    n.history.location.pathname
  ).active && (q = null), q)
    if (q.some((A) => A.route.lazy))
      I = !1, $ = !I;
    else if (!q.some((A) => Fd(A.route)))
      I = !0, $ = !I;
    else {
      let A = n.hydrationData ? n.hydrationData.loaderData : null, z = n.hydrationData ? n.hydrationData.errors : null, H = q;
      if (z) {
        let J = q.findIndex(
          (ie) => z[ie.route.id] !== void 0
        );
        H = H.slice(0, J + 1);
      }
      $ = !1, I = !0, H.forEach((J) => {
        let ie = P0(J.route, A, z);
        $ = $ || ie.renderFallback, I = I && !ie.shouldLoad;
      });
    }
  else {
    I = !1, $ = !I, q = [];
    let A = va(
      null,
      h,
      n.history.location.pathname
    );
    A.active && A.matches && (L = !0, q = A.matches);
  }
  let ee, j = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: q,
    initialized: I,
    renderFallback: $,
    navigation: qf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || K,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, W = "POP", te = null, P = !1, k, le = !1, de = /* @__PURE__ */ new Map(), se = null, B = !1, ne = !1, re = /* @__PURE__ */ new Set(), fe = /* @__PURE__ */ new Map(), Re = 0, C = -1, X = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), oe = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), mt, Ze = null;
  function ei() {
    if (S = n.history.listen(
      ({ action: A, location: z, delta: H }) => {
        if (mt) {
          mt(), mt = void 0;
          return;
        }
        ht(
          De.size === 0 || H != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let J = ni({
          currentLocation: j.location,
          nextLocation: z,
          historyAction: A
        });
        if (J && H != null) {
          let ie = new Promise((pe) => {
            mt = pe;
          });
          n.history.go(H * -1), Qn(J, {
            state: "blocked",
            location: z,
            proceed() {
              Qn(J, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: z
              }), ie.then(() => n.history.go(H));
            },
            reset() {
              let pe = new Map(j.blockers);
              pe.set(J, Dr), Tt({ blockers: pe });
            }
          }), te?.resolve(), te = null;
          return;
        }
        return Xn(A, z);
      }
    ), r) {
      HE(a, de);
      let A = () => qE(a, de);
      a.addEventListener("pagehide", A), se = () => a.removeEventListener("pagehide", A);
    }
    return j.initialized || Xn("POP", j.location, {
      initialHydration: !0
    }), ee;
  }
  function _i() {
    S && S(), se && se(), T.clear(), k && k.abort(), j.fetchers.forEach((A, z) => Kn(z)), j.blockers.forEach((A, z) => ti(z));
  }
  function _l(A) {
    return T.add(A), () => T.delete(A);
  }
  function Tt(A, z = {}) {
    A.matches && (A.matches = A.matches.map((ie) => {
      let pe = d[ie.route.id], ue = ie.route;
      return ue.element !== pe.element || ue.errorElement !== pe.errorElement || ue.hydrateFallbackElement !== pe.hydrateFallbackElement ? {
        ...ie,
        route: pe
      } : ie;
    })), j = {
      ...j,
      ...A
    };
    let H = [], J = [];
    j.fetchers.forEach((ie, pe) => {
      ie.state === "idle" && (Me.has(pe) ? H.push(pe) : J.push(pe));
    }), Me.forEach((ie) => {
      !j.fetchers.has(ie) && !fe.has(ie) && H.push(ie);
    }), [...T].forEach(
      (ie) => ie(j, {
        deletedFetchers: H,
        newErrors: A.errors ?? null,
        viewTransitionOpts: z.viewTransitionOpts,
        flushSync: z.flushSync === !0
      })
    ), H.forEach((ie) => Kn(ie)), J.forEach((ie) => j.fetchers.delete(ie));
  }
  function kt(A, z, { flushSync: H } = {}) {
    let J = j.actionData != null && j.navigation.formMethod != null && Ut(j.navigation.formMethod) && j.navigation.state === "loading" && A.state?._isRedirect !== !0, ie;
    z.actionData ? Object.keys(z.actionData).length > 0 ? ie = z.actionData : ie = null : J ? ie = j.actionData : ie = null;
    let pe = z.loaderData ? Fg(
      j.loaderData,
      z.loaderData,
      z.matches || [],
      z.errors
    ) : j.loaderData, ue = j.blockers;
    ue.size > 0 && (ue = new Map(ue), ue.forEach((xe, be) => ue.set(be, Dr)));
    let ce = B ? !1 : Hl(A, z.matches || j.matches), ge = P === !0 || j.navigation.formMethod != null && Ut(j.navigation.formMethod) && A.state?._isRedirect !== !0;
    p && (h = p, p = void 0), B || W === "POP" || (W === "PUSH" ? n.history.push(A, A.state) : W === "REPLACE" && n.history.replace(A, A.state));
    let he;
    if (W === "POP") {
      let xe = de.get(j.location.pathname);
      xe && xe.has(A.pathname) ? he = {
        currentLocation: j.location,
        nextLocation: A
      } : de.has(A.pathname) && (he = {
        currentLocation: A,
        nextLocation: j.location
      });
    } else if (le) {
      let xe = de.get(j.location.pathname);
      xe ? xe.add(A.pathname) : (xe = /* @__PURE__ */ new Set([A.pathname]), de.set(j.location.pathname, xe)), he = {
        currentLocation: j.location,
        nextLocation: A
      };
    }
    Tt(
      {
        ...z,
        // matches, errors, fetchers go through as-is
        actionData: ie,
        loaderData: pe,
        historyAction: W,
        location: A,
        initialized: !0,
        renderFallback: !1,
        navigation: qf,
        revalidation: "idle",
        restoreScrollPosition: ce,
        preventScrollReset: ge,
        blockers: ue
      },
      {
        viewTransitionOpts: he,
        flushSync: H === !0
      }
    ), W = "POP", P = !1, le = !1, B = !1, ne = !1, te?.resolve(), te = null, Ze?.resolve(), Ze = null;
  }
  async function Li(A, z) {
    if (te?.resolve(), te = null, typeof A == "number") {
      te || (te = $g());
      let $e = te.promise;
      return n.history.go(A), $e;
    }
    let H = hd(
      j.location,
      j.matches,
      m,
      A,
      z?.fromRouteId,
      z?.relative
    ), { path: J, submission: ie, error: pe } = Vg(
      !1,
      H,
      z
    ), ue;
    z?.unstable_mask && (ue = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof z.unstable_mask == "string" ? zn(z.unstable_mask) : {
        ...j.location.unstable_mask,
        ...z.unstable_mask
      }
    });
    let ce = j.location, ge = dd(
      ce,
      J,
      z && z.state,
      void 0,
      ue
    );
    ge = {
      ...ge,
      ...n.history.encodeLocation(ge)
    };
    let he = z && z.replace != null ? z.replace : void 0, xe = "PUSH";
    he === !0 ? xe = "REPLACE" : he === !1 || ie != null && Ut(ie.formMethod) && ie.formAction === j.location.pathname + j.location.search && (xe = "REPLACE");
    let be = z && "preventScrollReset" in z ? z.preventScrollReset === !0 : void 0, He = (z && z.flushSync) === !0, je = ni({
      currentLocation: ce,
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
          }), Li(A, z);
        },
        reset() {
          let $e = new Map(j.blockers);
          $e.set(je, Dr), Tt({ blockers: $e });
        }
      });
      return;
    }
    await Xn(xe, ge, {
      submission: ie,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: pe,
      preventScrollReset: be,
      replace: z && z.replace,
      enableViewTransition: z && z.viewTransition,
      flushSync: He,
      callSiteDefaultShouldRevalidate: z && z.unstable_defaultShouldRevalidate
    });
  }
  function Ll() {
    Ze || (Ze = $g()), ya(), Tt({ revalidation: "loading" });
    let A = Ze.promise;
    return j.navigation.state === "submitting" ? A : j.navigation.state === "idle" ? (Xn(j.historyAction, j.location, {
      startUninterruptedRevalidation: !0
    }), A) : (Xn(
      W || j.historyAction,
      j.navigation.location,
      {
        overrideNavigation: j.navigation,
        // Proxy through any rending view transition
        enableViewTransition: le === !0
      }
    ), A);
  }
  async function Xn(A, z, H) {
    k && k.abort(), k = null, W = A, B = (H && H.startUninterruptedRevalidation) === !0, Ru(j.location, j.matches), P = (H && H.preventScrollReset) === !0, le = (H && H.enableViewTransition) === !0;
    let J = p || h, ie = H && H.overrideNavigation, pe = H?.initialHydration && j.matches && j.matches.length > 0 && !L ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      j.matches
    ) : Fa(J, z, m), ue = (H && H.flushSync) === !0;
    if (pe && j.initialized && !ne && DE(j.location, z) && !(H && H.submission && Ut(H.submission.formMethod))) {
      kt(z, { matches: pe }, { flushSync: ue });
      return;
    }
    let ce = va(pe, J, z.pathname);
    if (ce.active && ce.matches && (pe = ce.matches), !pe) {
      let { error: Xe, notFoundMatches: it, route: Oe } = Rn(
        z.pathname
      );
      kt(
        z,
        {
          matches: it,
          loaderData: {},
          errors: {
            [Oe.id]: Xe
          }
        },
        { flushSync: ue }
      );
      return;
    }
    k = new AbortController();
    let ge = xl(
      n.history,
      z,
      k.signal,
      H && H.submission
    ), he = n.getContext ? await n.getContext() : new jg(), xe;
    if (H && H.pendingError)
      xe = [
        Ka(pe).route.id,
        { type: "error", error: H.pendingError }
      ];
    else if (H && H.submission && Ut(H.submission.formMethod)) {
      let Xe = await cs(
        ge,
        z,
        H.submission,
        pe,
        he,
        ce.active,
        H && H.initialHydration === !0,
        { replace: H.replace, flushSync: ue }
      );
      if (Xe.shortCircuited)
        return;
      if (Xe.pendingActionResult) {
        let [it, Oe] = Xe.pendingActionResult;
        if (rn(Oe) && Kr(Oe.error) && Oe.error.status === 404) {
          k = null, kt(z, {
            matches: Xe.matches,
            loaderData: {},
            errors: {
              [it]: Oe.error
            }
          });
          return;
        }
      }
      pe = Xe.matches || pe, xe = Xe.pendingActionResult, ie = Yf(z, H.submission), ue = !1, ce.active = !1, ge = xl(
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
    } = await Vl(
      ge,
      z,
      pe,
      he,
      ce.active,
      ie,
      H && H.submission,
      H && H.fetcherSubmission,
      H && H.replace,
      H && H.initialHydration === !0,
      ue,
      xe,
      H && H.callSiteDefaultShouldRevalidate
    );
    be || (k = null, kt(z, {
      matches: He || pe,
      ...Kg(xe),
      loaderData: je,
      errors: $e
    }));
  }
  async function cs(A, z, H, J, ie, pe, ue, ce = {}) {
    ya();
    let ge = UE(z, H);
    if (Tt({ navigation: ge }, { flushSync: ce.flushSync === !0 }), pe) {
      let be = await On(
        J,
        z.pathname,
        A.signal
      );
      if (be.type === "aborted")
        return { shortCircuited: !0 };
      if (be.type === "error") {
        if (be.partialMatches.length === 0) {
          let { matches: je, route: $e } = Do(h);
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
          z.pathname
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
    let he, xe = Bo(J, z);
    if (!xe.route.action && !xe.route.lazy)
      he = {
        type: "error",
        error: gn(405, {
          method: A.method,
          pathname: z.pathname,
          routeId: xe.route.id
        })
      };
    else {
      let be = wl(
        f,
        d,
        A,
        z,
        J,
        xe,
        ue ? [] : s,
        ie
      ), He = await pa(
        A,
        z,
        be,
        ie,
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
    if (Mi(he)) {
      let be;
      return ce && ce.replace != null ? be = ce.replace : be = kg(
        he.response.headers.get("Location"),
        new URL(A.url),
        m,
        n.history
      ) === j.location.pathname + j.location.search, await Fn(A, he, !0, {
        submission: H,
        replace: be
      }), { shortCircuited: !0 };
    }
    if (rn(he)) {
      let be = Ka(J, xe.route.id);
      return (ce && ce.replace) !== !0 && (W = "PUSH"), {
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
  async function Vl(A, z, H, J, ie, pe, ue, ce, ge, he, xe, be, He) {
    let je = pe || Yf(z, ue), $e = ue || ce || Zg(je), Xe = !B && !he;
    if (ie) {
      if (Xe) {
        let ct = Vi(be);
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
        H,
        z.pathname,
        A.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: Lt, route: yt } = Do(h);
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
        H = Ne.matches;
      else {
        let { error: ct, notFoundMatches: Lt, route: yt } = Rn(
          z.pathname
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
    let it = p || h, { dsMatches: Oe, revalidatingFetchers: pt } = Ug(
      A,
      J,
      f,
      d,
      n.history,
      j,
      H,
      $e,
      z,
      he ? [] : s,
      he === !0,
      ne,
      re,
      Me,
      oe,
      ae,
      it,
      m,
      n.patchRoutesOnNavigation != null,
      be,
      He
    );
    if (C = ++Re, !n.dataStrategy && !Oe.some((Ne) => Ne.shouldLoad) && !Oe.some(
      (Ne) => Ne.route.middleware && Ne.route.middleware.length > 0
    ) && pt.length === 0) {
      let Ne = ds();
      return kt(
        z,
        {
          matches: H,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: be && rn(be[1]) ? { [be[0]]: be[1].error } : null,
          ...Kg(be),
          ...Ne ? { fetchers: new Map(j.fetchers) } : {}
        },
        { flushSync: xe }
      ), { shortCircuited: !0 };
    }
    if (Xe) {
      let Ne = {};
      if (!ie) {
        Ne.navigation = je;
        let ct = Vi(be);
        ct !== void 0 && (Ne.actionData = ct);
      }
      pt.length > 0 && (Ne.fetchers = Ul(pt)), Tt(Ne, { flushSync: xe });
    }
    pt.forEach((Ne) => {
      Mt(Ne.key), Ne.controller && fe.set(Ne.key, Ne.controller);
    });
    let We = () => pt.forEach((Ne) => Mt(Ne.key));
    k && k.signal.addEventListener(
      "abort",
      We
    );
    let { loaderResults: ba, fetcherResults: Mn } = await Bl(
      Oe,
      pt,
      A,
      z,
      J
    );
    if (A.signal.aborted)
      return { shortCircuited: !0 };
    k && k.signal.removeEventListener(
      "abort",
      We
    ), pt.forEach((Ne) => fe.delete(Ne.key));
    let At = jo(ba);
    if (At)
      return await Fn(A, At.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    if (At = jo(Mn), At)
      return ae.add(At.key), await Fn(A, At.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    let { loaderData: _n, errors: ai } = Xg(
      j,
      H,
      ba,
      be,
      pt,
      Mn
    );
    he && j.errors && (ai = { ...j.errors, ...ai });
    let Ln = ds(), ii = hs(C), Bi = Ln || ii || pt.length > 0;
    return {
      matches: H,
      loaderData: _n,
      errors: ai,
      ...Bi ? { fetchers: new Map(j.fetchers) } : {}
    };
  }
  function Vi(A) {
    if (A && !rn(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (j.actionData)
      return Object.keys(j.actionData).length === 0 ? null : j.actionData;
  }
  function Ul(A) {
    return A.forEach((z) => {
      let H = j.fetchers.get(z.key), J = jr(
        void 0,
        H ? H.data : void 0
      );
      j.fetchers.set(z.key, J);
    }), new Map(j.fetchers);
  }
  async function Su(A, z, H, J) {
    Mt(A);
    let ie = (J && J.flushSync) === !0, pe = p || h, ue = hd(
      j.location,
      j.matches,
      m,
      H,
      z,
      J?.relative
    ), ce = Fa(pe, ue, m), ge = va(ce, pe, ue);
    if (ge.active && ge.matches && (ce = ge.matches), !ce) {
      sn(
        A,
        z,
        gn(404, { pathname: ue }),
        { flushSync: ie }
      );
      return;
    }
    let { path: he, submission: xe, error: be } = Vg(
      !0,
      ue,
      J
    );
    if (be) {
      sn(A, z, be, { flushSync: ie });
      return;
    }
    let He = n.getContext ? await n.getContext() : new jg(), je = (J && J.preventScrollReset) === !0;
    if (xe && Ut(xe.formMethod)) {
      await xu(
        A,
        z,
        he,
        ce,
        He,
        ge.active,
        ie,
        je,
        xe,
        J && J.unstable_defaultShouldRevalidate
      );
      return;
    }
    oe.set(A, { routeId: z, path: he }), await Bt(
      A,
      z,
      he,
      ce,
      He,
      ge.active,
      ie,
      je,
      xe
    );
  }
  async function xu(A, z, H, J, ie, pe, ue, ce, ge, he) {
    ya(), oe.delete(A);
    let xe = j.fetchers.get(A);
    En(A, BE(ge, xe), {
      flushSync: ue
    });
    let be = new AbortController(), He = xl(
      n.history,
      H,
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
        sn(A, z, et.error, { flushSync: ue });
        return;
      } else if (et.matches)
        J = et.matches;
      else {
        sn(
          A,
          z,
          gn(404, { pathname: H }),
          { flushSync: ue }
        );
        return;
      }
    }
    let je = Bo(J, H);
    if (!je.route.action && !je.route.lazy) {
      let et = gn(405, {
        method: ge.formMethod,
        pathname: H,
        routeId: z
      });
      sn(A, z, et, { flushSync: ue });
      return;
    }
    fe.set(A, be);
    let $e = Re, Xe = wl(
      f,
      d,
      He,
      H,
      J,
      je,
      s,
      ie
    ), it = await pa(
      He,
      H,
      Xe,
      ie,
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
      fe.get(A) === be && fe.delete(A);
      return;
    }
    if (Me.has(A)) {
      if (Mi(Oe) || rn(Oe)) {
        En(A, da(void 0));
        return;
      }
    } else {
      if (Mi(Oe))
        if (fe.delete(A), C > $e) {
          En(A, da(void 0));
          return;
        } else
          return ae.add(A), En(A, jr(ge)), Fn(He, Oe, !1, {
            fetcherSubmission: ge,
            preventScrollReset: ce
          });
      if (rn(Oe)) {
        sn(A, z, Oe.error);
        return;
      }
    }
    let pt = j.navigation.location || j.location, We = xl(
      n.history,
      pt,
      be.signal
    ), ba = p || h, Mn = j.navigation.state !== "idle" ? Fa(ba, j.navigation.location, m) : j.matches;
    ze(Mn, "Didn't find any matches after fetcher action");
    let At = ++Re;
    X.set(A, At);
    let _n = jr(ge, Oe.data);
    j.fetchers.set(A, _n);
    let { dsMatches: ai, revalidatingFetchers: Ln } = Ug(
      We,
      ie,
      f,
      d,
      n.history,
      j,
      Mn,
      ge,
      pt,
      s,
      !1,
      ne,
      re,
      Me,
      oe,
      ae,
      ba,
      m,
      n.patchRoutesOnNavigation != null,
      [je.route.id, Oe],
      he
    );
    Ln.filter((et) => et.key !== A).forEach((et) => {
      let Hi = et.key, qi = j.fetchers.get(Hi), gs = jr(
        void 0,
        qi ? qi.data : void 0
      );
      j.fetchers.set(Hi, gs), Mt(Hi), et.controller && fe.set(Hi, et.controller);
    }), Tt({ fetchers: new Map(j.fetchers) });
    let ii = () => Ln.forEach((et) => Mt(et.key));
    be.signal.addEventListener(
      "abort",
      ii
    );
    let { loaderResults: Bi, fetcherResults: Ne } = await Bl(
      ai,
      Ln,
      We,
      pt,
      ie
    );
    if (be.signal.aborted)
      return;
    if (be.signal.removeEventListener(
      "abort",
      ii
    ), X.delete(A), fe.delete(A), Ln.forEach((et) => fe.delete(et.key)), j.fetchers.has(A)) {
      let et = da(Oe.data);
      j.fetchers.set(A, et);
    }
    let ct = jo(Bi);
    if (ct)
      return Fn(
        We,
        ct.result,
        !1,
        { preventScrollReset: ce }
      );
    if (ct = jo(Ne), ct)
      return ae.add(ct.key), Fn(
        We,
        ct.result,
        !1,
        { preventScrollReset: ce }
      );
    let { loaderData: Lt, errors: yt } = Xg(
      j,
      Mn,
      Bi,
      void 0,
      Ln,
      Ne
    );
    hs(At), j.navigation.state === "loading" && At > C ? (ze(W, "Expected pending action"), k && k.abort(), kt(j.navigation.location, {
      matches: Mn,
      loaderData: Lt,
      errors: yt,
      fetchers: new Map(j.fetchers)
    })) : (Tt({
      errors: yt,
      loaderData: Fg(
        j.loaderData,
        Lt,
        Mn,
        yt
      ),
      fetchers: new Map(j.fetchers)
    }), ne = !1);
  }
  async function Bt(A, z, H, J, ie, pe, ue, ce, ge) {
    let he = j.fetchers.get(A);
    En(
      A,
      jr(
        ge,
        he ? he.data : void 0
      ),
      { flushSync: ue }
    );
    let xe = new AbortController(), be = xl(
      n.history,
      H,
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
        sn(A, z, Oe.error, { flushSync: ue });
        return;
      } else if (Oe.matches)
        J = Oe.matches;
      else {
        sn(
          A,
          z,
          gn(404, { pathname: H }),
          { flushSync: ue }
        );
        return;
      }
    }
    let He = Bo(J, H);
    fe.set(A, xe);
    let je = Re, $e = wl(
      f,
      d,
      be,
      H,
      J,
      He,
      s,
      ie
    ), Xe = await pa(
      be,
      H,
      $e,
      ie,
      A
    ), it = Xe[He.route.id];
    if (!it) {
      for (let Oe of J)
        if (Xe[Oe.route.id]) {
          it = Xe[Oe.route.id];
          break;
        }
    }
    if (fe.get(A) === xe && fe.delete(A), !be.signal.aborted) {
      if (Me.has(A)) {
        En(A, da(void 0));
        return;
      }
      if (Mi(it))
        if (C > je) {
          En(A, da(void 0));
          return;
        } else {
          ae.add(A), await Fn(be, it, !1, {
            preventScrollReset: ce
          });
          return;
        }
      if (rn(it)) {
        sn(A, z, it.error);
        return;
      }
      En(A, da(it.data));
    }
  }
  async function Fn(A, z, H, {
    submission: J,
    fetcherSubmission: ie,
    preventScrollReset: pe,
    replace: ue
  } = {}) {
    H || (te?.resolve(), te = null), z.response.headers.has("X-Remix-Revalidate") && (ne = !0);
    let ce = z.response.headers.get("Location");
    ze(ce, "Expected a Location header on the redirect Response"), ce = kg(
      ce,
      new URL(A.url),
      m,
      n.history
    );
    let ge = dd(j.location, ce, {
      _isRedirect: !0
    });
    if (r) {
      let $e = !1;
      if (z.response.headers.has("X-Remix-Reload-Document"))
        $e = !0;
      else if (kd(ce)) {
        const Xe = OT(ce, !0);
        $e = // Hard reload if it's an absolute URL to a new origin
        Xe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        xn(Xe.pathname, m) == null;
      }
      if ($e) {
        ue ? a.location.replace(ce) : a.location.assign(ce);
        return;
      }
    }
    k = null;
    let he = ue === !0 || z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: xe, formAction: be, formEncType: He } = j.navigation;
    !J && !ie && xe && be && He && (J = Zg(j.navigation));
    let je = J || ie;
    if (hE.has(z.response.status) && je && Ut(je.formMethod))
      await Xn(he, ge, {
        submission: {
          ...je,
          formAction: ce
        },
        // Preserve these flags across redirects
        preventScrollReset: pe || P,
        enableViewTransition: H ? le : void 0
      });
    else {
      let $e = Yf(
        ge,
        J
      );
      await Xn(he, ge, {
        overrideNavigation: $e,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ie,
        // Preserve these flags across redirects
        preventScrollReset: pe || P,
        enableViewTransition: H ? le : void 0
      });
    }
  }
  async function pa(A, z, H, J, ie) {
    let pe, ue = {};
    try {
      pe = await EE(
        g,
        A,
        z,
        H,
        ie,
        J,
        !1
      );
    } catch (ce) {
      return H.filter((ge) => ge.shouldLoad).forEach((ge) => {
        ue[ge.route.id] = {
          type: "error",
          error: ce
        };
      }), ue;
    }
    if (A.signal.aborted)
      return ue;
    if (!Ut(A.method))
      for (let ce of H) {
        if (pe[ce.route.id]?.type === "error")
          break;
        !pe.hasOwnProperty(ce.route.id) && !j.loaderData.hasOwnProperty(ce.route.id) && (!j.errors || !j.errors.hasOwnProperty(ce.route.id)) && ce.shouldCallHandler() && (pe[ce.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ce.route.id}`
          )
        });
      }
    for (let [ce, ge] of Object.entries(pe))
      if (OE(ge)) {
        let he = ge.result;
        ue[ce] = {
          type: "redirect",
          response: CE(
            he,
            A,
            ce,
            H,
            m
          )
        };
      } else
        ue[ce] = await AE(ge);
    return ue;
  }
  async function Bl(A, z, H, J, ie) {
    let pe = pa(
      H,
      J,
      A,
      ie,
      null
    ), ue = Promise.all(
      z.map(async (he) => {
        if (he.matches && he.match && he.request && he.controller) {
          let be = (await pa(
            he.request,
            he.path,
            he.matches,
            ie,
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
    ), ce = await pe, ge = (await ue).reduce(
      (he, xe) => Object.assign(he, xe),
      {}
    );
    return {
      loaderResults: ce,
      fetcherResults: ge
    };
  }
  function ya() {
    ne = !0, oe.forEach((A, z) => {
      fe.has(z) && re.add(z), Mt(z);
    });
  }
  function En(A, z, H = {}) {
    j.fetchers.set(A, z), Tt(
      { fetchers: new Map(j.fetchers) },
      { flushSync: (H && H.flushSync) === !0 }
    );
  }
  function sn(A, z, H, J = {}) {
    let ie = Ka(j.matches, z);
    Kn(A), Tt(
      {
        errors: {
          [ie.route.id]: H
        },
        fetchers: new Map(j.fetchers)
      },
      { flushSync: (J && J.flushSync) === !0 }
    );
  }
  function fs(A) {
    return Te.set(A, (Te.get(A) || 0) + 1), Me.has(A) && Me.delete(A), j.fetchers.get(A) || mE;
  }
  function Tu(A, z) {
    Mt(A, z?.reason), En(A, da(null));
  }
  function Kn(A) {
    let z = j.fetchers.get(A);
    fe.has(A) && !(z && z.state === "loading" && X.has(A)) && Mt(A), oe.delete(A), X.delete(A), ae.delete(A), Me.delete(A), re.delete(A), j.fetchers.delete(A);
  }
  function Ht(A) {
    let z = (Te.get(A) || 0) - 1;
    z <= 0 ? (Te.delete(A), Me.add(A)) : Te.set(A, z), Tt({ fetchers: new Map(j.fetchers) });
  }
  function Mt(A, z) {
    let H = fe.get(A);
    H && (H.abort(z), fe.delete(A));
  }
  function _t(A) {
    for (let z of A) {
      let H = fs(z), J = da(H.data);
      j.fetchers.set(z, J);
    }
  }
  function ds() {
    let A = [], z = !1;
    for (let H of ae) {
      let J = j.fetchers.get(H);
      ze(J, `Expected fetcher: ${H}`), J.state === "loading" && (ae.delete(H), A.push(H), z = !0);
    }
    return _t(A), z;
  }
  function hs(A) {
    let z = [];
    for (let [H, J] of X)
      if (J < A) {
        let ie = j.fetchers.get(H);
        ze(ie, `Expected fetcher: ${H}`), ie.state === "loading" && (Mt(H), X.delete(H), z.push(H));
      }
    return _t(z), z.length > 0;
  }
  function Eu(A, z) {
    let H = j.blockers.get(A) || Dr;
    return De.get(A) !== z && De.set(A, z), H;
  }
  function ti(A) {
    j.blockers.delete(A), De.delete(A);
  }
  function Qn(A, z) {
    let H = j.blockers.get(A) || Dr;
    ze(
      H.state === "unblocked" && z.state === "blocked" || H.state === "blocked" && z.state === "blocked" || H.state === "blocked" && z.state === "proceeding" || H.state === "blocked" && z.state === "unblocked" || H.state === "proceeding" && z.state === "unblocked",
      `Invalid blocker state transition: ${H.state} -> ${z.state}`
    );
    let J = new Map(j.blockers);
    J.set(A, z), Tt({ blockers: J });
  }
  function ni({
    currentLocation: A,
    nextLocation: z,
    historyAction: H
  }) {
    if (De.size === 0)
      return;
    De.size > 1 && ht(!1, "A router only supports one blocker at a time");
    let J = Array.from(De.entries()), [ie, pe] = J[J.length - 1], ue = j.blockers.get(ie);
    if (!(ue && ue.state === "proceeding") && pe({ currentLocation: A, nextLocation: z, historyAction: H }))
      return ie;
  }
  function Rn(A) {
    let z = gn(404, { pathname: A }), H = p || h, { matches: J, route: ie } = Do(H);
    return { notFoundMatches: J, route: ie, error: z };
  }
  function Ui(A, z, H) {
    if (R = A, N = z, w = H || null, !_ && j.navigation === qf) {
      _ = !0;
      let J = Hl(j.location, j.matches);
      J != null && Tt({ restoreScrollPosition: J });
    }
    return () => {
      R = null, N = null, w = null;
    };
  }
  function ga(A, z) {
    return w && w(
      A,
      z.map((J) => HT(J, j.loaderData))
    ) || A.key;
  }
  function Ru(A, z) {
    if (R && N) {
      let H = ga(A, z);
      R[H] = N();
    }
  }
  function Hl(A, z) {
    if (R) {
      let H = ga(A, z), J = R[H];
      if (typeof J == "number")
        return J;
    }
    return null;
  }
  function va(A, z, H) {
    if (n.patchRoutesOnNavigation)
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: Hr(
            z,
            H,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: Hr(
          z,
          H,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function On(A, z, H, J) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: A };
    let ie = A;
    for (; ; ) {
      let pe = p == null, ue = p || h, ce = d;
      try {
        await n.patchRoutesOnNavigation({
          signal: H,
          path: z,
          matches: ie,
          fetcherKey: J,
          patch: (xe, be) => {
            H.aborted || Bg(
              xe,
              be,
              ue,
              ce,
              f,
              !1
            );
          }
        });
      } catch (xe) {
        return { type: "error", error: xe, partialMatches: ie };
      } finally {
        pe && !H.aborted && (h = [...h]);
      }
      if (H.aborted)
        return { type: "aborted" };
      let ge = Fa(ue, z, m), he = null;
      if (ge) {
        if (Object.keys(ge[0].params).length === 0)
          return { type: "success", matches: ge };
        if (he = Hr(
          ue,
          z,
          m,
          !0
        ), !(he && ie.length < he.length && ms(
          ie,
          he.slice(0, ie.length)
        )))
          return { type: "success", matches: ge };
      }
      if (he || (he = Hr(
        ue,
        z,
        m,
        !0
      )), !he || ms(ie, he))
        return { type: "success", matches: null };
      ie = he;
    }
  }
  function ms(A, z) {
    return A.length === z.length && A.every((H, J) => H.route.id === z[J].route.id);
  }
  function ps(A) {
    d = {}, p = Fr(
      A,
      f,
      void 0,
      d
    );
  }
  function ys(A, z, H = !1) {
    let J = p == null;
    Bg(
      A,
      z,
      p || h,
      d,
      f,
      H
    ), J && (h = [...h], Tt({}));
  }
  return ee = {
    get basename() {
      return m;
    },
    get future() {
      return v;
    },
    get state() {
      return j;
    },
    get routes() {
      return h;
    },
    get window() {
      return a;
    },
    initialize: ei,
    subscribe: _l,
    enableScrollRestoration: Ui,
    navigate: Li,
    fetch: Su,
    revalidate: Ll,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => n.history.createHref(A),
    encodeLocation: (A) => n.history.encodeLocation(A),
    getFetcher: fs,
    resetFetcher: Tu,
    deleteFetcher: Ht,
    dispose: _i,
    getBlocker: Eu,
    deleteBlocker: ti,
    patchRoutes: ys,
    _internalFetchControllers: fe,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ps,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
      Tt(A);
    }
  }, n.unstable_instrumentations && (ee = lE(
    ee,
    n.unstable_instrumentations.map((A) => A.router).filter(Boolean)
  )), ee;
}
function gE(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function hd(n, a, r, s, o, f) {
  let d, h;
  if (o) {
    d = [];
    for (let m of a)
      if (d.push(m), m.route.id === o) {
        h = m;
        break;
      }
  } else
    d = a, h = a[a.length - 1];
  let p = cu(
    s || ".",
    Pd(d),
    xn(n.pathname, r) || n.pathname,
    f === "path"
  );
  if (s == null && (p.search = n.search, p.hash = n.hash), (s == null || s === "" || s === ".") && h) {
    let m = Qd(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let g = new URLSearchParams(p.search), v = g.getAll("index");
      g.delete("index"), v.filter((T) => T).forEach((T) => g.append("index", T));
      let S = g.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (p.pathname = JT({ basename: r, pathname: p.pathname })), kn(p);
}
function Vg(n, a, r) {
  if (!r || !gE(r))
    return { path: a };
  if (r.formMethod && !VE(r.formMethod))
    return {
      path: a,
      error: gn(405, { method: r.formMethod })
    };
  let s = () => ({
    path: a,
    error: gn(400, { type: "invalid-body" })
  }), f = (r.formMethod || "get").toUpperCase(), d = I0(a);
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
  let h, p;
  if (r.formData)
    h = pd(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    h = pd(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    h = r.body, p = Pg(h);
  else if (r.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(r.body), p = Pg(h);
    } catch {
      return s();
    }
  let m = {
    formMethod: f,
    formAction: d,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (Ut(m.formMethod))
    return { path: a, submission: m };
  let g = zn(a);
  return n && g.search && Qd(g.search) && h.append("index", ""), g.search = `?${h}`, { path: kn(g), submission: m };
}
function Ug(n, a, r, s, o, f, d, h, p, m, g, v, S, T, R, w, N, _, q, L, K) {
  let I = L ? rn(L[1]) ? L[1].error : L[1].data : void 0, $ = o.createURL(f.location), ee = o.createURL(p), j;
  if (g && f.errors) {
    let se = Object.keys(f.errors)[0];
    j = d.findIndex((B) => B.route.id === se);
  } else if (L && rn(L[1])) {
    let se = L[0];
    j = d.findIndex((B) => B.route.id === se) - 1;
  }
  let W = L ? L[1].statusCode : void 0, te = W && W >= 400, P = {
    currentUrl: $,
    currentParams: f.matches[0]?.params || {},
    nextUrl: ee,
    nextParams: d[0].params,
    ...h,
    actionResult: I,
    actionStatus: W
  }, k = Wr(d), le = d.map((se, B) => {
    let { route: ne } = se, re = null;
    if (j != null && B > j)
      re = !1;
    else if (ne.lazy)
      re = !0;
    else if (!Fd(ne))
      re = !1;
    else if (g) {
      let { shouldLoad: X } = P0(
        ne,
        f.loaderData,
        f.errors
      );
      re = X;
    } else vE(f.loaderData, f.matches[B], se) && (re = !0);
    if (re !== null)
      return md(
        r,
        s,
        n,
        p,
        k,
        se,
        m,
        a,
        re
      );
    let fe = !1;
    typeof K == "boolean" ? fe = K : te ? fe = !1 : (v || $.pathname + $.search === ee.pathname + ee.search || $.search !== ee.search || bE(f.matches[B], se)) && (fe = !0);
    let Re = {
      ...P,
      defaultShouldRevalidate: fe
    }, C = Yr(se, Re);
    return md(
      r,
      s,
      n,
      p,
      k,
      se,
      m,
      a,
      C,
      Re,
      K
    );
  }), de = [];
  return R.forEach((se, B) => {
    if (g || !d.some((oe) => oe.route.id === se.routeId) || T.has(B))
      return;
    let ne = f.fetchers.get(B), re = ne && ne.state !== "idle" && ne.data === void 0, fe = Fa(N, se.path, _);
    if (!fe) {
      if (q && re)
        return;
      de.push({
        key: B,
        routeId: se.routeId,
        path: se.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (w.has(B))
      return;
    let Re = Bo(fe, se.path), C = new AbortController(), X = xl(
      o,
      se.path,
      C.signal
    ), ae = null;
    if (S.has(B))
      S.delete(B), ae = wl(
        r,
        s,
        X,
        se.path,
        fe,
        Re,
        m,
        a
      );
    else if (re)
      v && (ae = wl(
        r,
        s,
        X,
        se.path,
        fe,
        Re,
        m,
        a
      ));
    else {
      let oe;
      typeof K == "boolean" ? oe = K : te ? oe = !1 : oe = v;
      let Te = {
        ...P,
        defaultShouldRevalidate: oe
      };
      Yr(Re, Te) && (ae = wl(
        r,
        s,
        X,
        se.path,
        fe,
        Re,
        m,
        a,
        Te
      ));
    }
    ae && de.push({
      key: B,
      routeId: se.routeId,
      path: se.path,
      matches: ae,
      match: Re,
      request: X,
      controller: C
    });
  }), { dsMatches: le, revalidatingFetchers: de };
}
function Fd(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function P0(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Fd(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let f = !s && !o;
  return { shouldLoad: f, renderFallback: f };
}
function vE(n, a, r) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), o = !n.hasOwnProperty(r.route.id);
  return s || o;
}
function bE(n, a) {
  let r = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function Yr(n, a) {
  if (n.route.shouldRevalidate) {
    let r = n.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Bg(n, a, r, s, o, f) {
  let d;
  if (n) {
    let m = s[n];
    ze(
      m,
      `No route found to patch children into: routeId = ${n}`
    ), m.children || (m.children = []), d = m.children;
  } else
    d = r;
  let h = [], p = [];
  if (a.forEach((m) => {
    let g = d.find(
      (v) => X0(m, v)
    );
    g ? p.push({ existingRoute: g, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = Fr(
      h,
      o,
      [n || "_", "patch", String(d?.length || "0")],
      s
    );
    d.push(...m);
  }
  if (f && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: g, newRoute: v } = p[m], S = g, [T] = Fr(
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
function X0(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => X0(r, o))
  ) ?? !1 : !1;
}
var Hg = /* @__PURE__ */ new WeakMap(), F0 = ({
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
  let d = Hg.get(o);
  d || (d = {}, Hg.set(o, d));
  let h = d[n];
  if (h)
    return h;
  let p = (async () => {
    let m = LT(n), v = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (m)
      ht(
        !m,
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
}, qg = /* @__PURE__ */ new WeakMap();
function SE(n, a, r, s, o) {
  let f = r[n.id];
  if (ze(f, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let g = qg.get(f);
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
        let w = S[R];
        if (w === void 0)
          continue;
        let N = UT(R), q = f[R] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        R !== "hasErrorBoundary";
        N ? ht(
          !N,
          "Route property " + R + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : q ? ht(
          !q,
          `Route "${f.id}" has a static property "${R}" defined but its lazy function is also returning a value for this property. The lazy route property "${R}" will be ignored.`
        ) : T[R] = w;
      }
      Object.assign(f, T), Object.assign(f, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(f),
        lazy: void 0
      });
    })();
    return qg.set(f, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let d = Object.keys(n.lazy), h = [], p;
  for (let g of d) {
    if (o && o.includes(g))
      continue;
    let v = F0({
      key: g,
      route: n,
      manifest: r,
      mapRouteProperties: s
    });
    v && (h.push(v), g === a && (p = v));
  }
  let m = h.length > 0 ? Promise.all(h).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: p
  };
}
async function Yg(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, f) => {
    r[a[f].route.id] = o;
  }), r;
}
async function xE(n) {
  return n.matches.some((a) => a.route.middleware) ? K0(n, () => Yg(n)) : Yg(n);
}
function K0(n, a) {
  return TE(
    n,
    a,
    (s) => {
      if (LE(s))
        throw s;
      return s;
    },
    NE,
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
      let { matches: d } = n, h = Math.min(
        // Throwing route
        Math.max(
          d.findIndex((m) => m.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          d.findIndex((m) => m.shouldCallHandler()),
          0
        )
      ), p = Ka(
        d,
        d[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function TE(n, a, r, s, o) {
  let { matches: f, ...d } = n, h = f.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((g) => [m.route.id, g]) : []
  );
  return await Q0(
    d,
    h,
    a,
    r,
    s,
    o
  );
}
async function Q0(n, a, r, s, o, f, d = 0) {
  let { request: h } = n;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[d];
  if (!p)
    return await r();
  let [m, g] = p, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await Q0(
        n,
        a,
        r,
        s,
        o,
        f,
        d + 1
      ) }, v.value;
    } catch (T) {
      return v = { value: await f(T, m, v) }, v.value;
    }
  };
  try {
    let T = await g(n, S), R = T != null ? s(T) : void 0;
    return o(R) ? R : v ? R ?? v.value : (v = { value: await S() }, v.value);
  } catch (T) {
    return await f(T, m, v);
  }
}
function Z0(n, a, r, s, o) {
  let f = F0({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), d = SE(
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
function md(n, a, r, s, o, f, d, h, p, m = null, g) {
  let v = !1, S = Z0(
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
    shouldRevalidateArgs: m,
    shouldCallHandler(T) {
      return v = !0, m ? typeof g == "boolean" ? Yr(f, {
        ...m,
        defaultShouldRevalidate: g
      }) : typeof T == "boolean" ? Yr(f, {
        ...m,
        defaultShouldRevalidate: T
      }) : Yr(f, m) : p;
    },
    resolve(T) {
      let { lazy: R, loader: w, middleware: N } = f.route, _ = v || p || T && !Ut(r.method) && (R || w), q = N && N.length > 0 && !w && !R;
      return _ && (Ut(r.method) || !q) ? RE({
        request: r,
        path: s,
        unstable_pattern: o,
        match: f,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: T,
        scopedContext: h
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function wl(n, a, r, s, o, f, d, h, p = null) {
  return o.map((m) => m.route.id !== f.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: Z0(
      n,
      a,
      r,
      m,
      d
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : md(
    n,
    a,
    r,
    s,
    Wr(o),
    m,
    d,
    h,
    !0,
    p
  ));
}
async function EE(n, a, r, s, o, f, d) {
  s.some((g) => g._lazyPromises?.middleware) && await Promise.all(s.map((g) => g._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: $0(a, r),
    unstable_pattern: Wr(s),
    params: s[0].params,
    context: f,
    matches: s
  }, m = await n({
    ...h,
    fetcherKey: o,
    runClientMiddleware: (g) => {
      let v = h;
      return K0(v, () => g({
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
  return m;
}
async function RE({
  request: n,
  path: a,
  unstable_pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: f,
  handlerOverride: d,
  scopedContext: h
}) {
  let p, m, g = Ut(n.method), v = g ? "action" : "loader", S = (T) => {
    let R, w = new Promise((q, L) => R = L);
    m = () => R(), n.signal.addEventListener("abort", m);
    let N = (q) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: n,
        unstable_url: $0(n, a),
        unstable_pattern: r,
        params: s.params,
        context: h
      },
      ...q !== void 0 ? [q] : []
    ), _ = (async () => {
      try {
        return { type: "data", result: await (d ? d((L) => N(L)) : N()) };
      } catch (q) {
        return { type: "error", result: q };
      }
    })();
    return Promise.race([_, w]);
  };
  try {
    let T = g ? s.route.action : s.route.loader;
    if (o || f)
      if (T) {
        let R, [w] = await Promise.all([
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
        p = w;
      } else {
        await o;
        let R = g ? s.route.action : s.route.loader;
        if (R)
          [p] = await Promise.all([S(R), f]);
        else if (v === "action") {
          let w = new URL(n.url), N = w.pathname + w.search;
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
      let R = new URL(n.url), w = R.pathname + R.search;
      throw gn(404, {
        pathname: w
      });
    }
  } catch (T) {
    return { type: "error", result: T };
  } finally {
    m && n.signal.removeEventListener("abort", m);
  }
  return p;
}
async function ME(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function AE(n) {
  let { result: a, type: r } = n;
  if (Kd(a)) {
    let s;
    try {
      s = await ME(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error" ? {
      type: "error",
      error: new fu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Qg(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: jE(a),
    statusCode: Kr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Kr(a) ? a.status : void 0
  } : Qg(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function CE(n, a, r, s, o) {
  let f = n.headers.get("Location");
  if (ze(
    f,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !kd(f)) {
    let d = s.slice(
      0,
      s.findIndex((h) => h.route.id === r) + 1
    );
    f = hd(
      new URL(a.url),
      d,
      o,
      f
    ), n.headers.set("Location", f);
  }
  return n;
}
var Gg = [
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
function kg(n, a, r, s) {
  if (kd(n)) {
    let o = n, f = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Gg.includes(f.protocol))
      throw new Error("Invalid redirect location");
    let d = xn(f.pathname, r) != null;
    if (f.origin === a.origin && d)
      return Xd(f.pathname) + f.search + f.hash;
  }
  try {
    let o = s.createURL(n);
    if (Gg.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function xl(n, a, r, s) {
  let o = n.createURL(I0(a)).toString(), f = { signal: r };
  if (s && Ut(s.formMethod)) {
    let { formMethod: d, formEncType: h } = s;
    f.method = d.toUpperCase(), h === "application/json" ? (f.headers = new Headers({ "Content-Type": h }), f.body = JSON.stringify(s.json)) : h === "text/plain" ? f.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? f.body = pd(s.formData) : f.body = s.formData;
  }
  return new Request(o, f);
}
function $0(n, a) {
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
function pd(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function Pg(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function wE(n, a, r, s = !1, o = !1) {
  let f = {}, d = null, h, p = !1, m = {}, g = r && rn(r[1]) ? r[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, T = a[S];
    if (ze(
      !Mi(T),
      "Cannot handle redirect results in processLoaderData"
    ), rn(T)) {
      let R = T.error;
      if (g !== void 0 && (R = g, g = void 0), d = d || {}, o)
        d[S] = R;
      else {
        let w = Ka(n, S);
        d[w.route.id] == null && (d[w.route.id] = R);
      }
      s || (f[S] = k0), p || (p = !0, h = Kr(T.error) ? T.error.status : 500), T.headers && (m[S] = T.headers);
    } else
      f[S] = T.data, T.statusCode && T.statusCode !== 200 && !p && (h = T.statusCode), T.headers && (m[S] = T.headers);
  }), g !== void 0 && r && (d = { [r[0]]: g }, r[2] && (f[r[2]] = void 0)), {
    loaderData: f,
    errors: d,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function Xg(n, a, r, s, o, f) {
  let { loaderData: d, errors: h } = wE(
    a,
    r,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: g, controller: v } = p;
    if (v && v.signal.aborted)
      return;
    let S = f[m];
    if (ze(S, "Did not find corresponding fetcher result"), rn(S)) {
      let T = Ka(n.matches, g?.route.id);
      h && h[T.route.id] || (h = {
        ...h,
        [T.route.id]: S.error
      }), n.fetchers.delete(m);
    } else if (Mi(S))
      ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let T = da(S.data);
      n.fetchers.set(m, T);
    }
  }), { loaderData: d, errors: h };
}
function Fg(n, a, r, s) {
  let o = Object.entries(a).filter(([, f]) => f !== k0).reduce((f, [d, h]) => (f[d] = h, f), {});
  for (let f of r) {
    let d = f.route.id;
    if (!a.hasOwnProperty(d) && n.hasOwnProperty(d) && f.route.loader && (o[d] = n[d]), s && s.hasOwnProperty(d))
      break;
  }
  return o;
}
function Kg(n) {
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
function Do(n) {
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
  let d = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return n === 400 ? (d = "Bad Request", s && a && r ? h = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : o === "invalid-body" && (h = "Unable to encode submission body")) : n === 403 ? (d = "Forbidden", h = `Route "${r}" does not match URL "${a}"`) : n === 404 ? (d = "Not Found", h = `No route matches URL "${a}"`) : n === 405 && (d = "Method Not Allowed", s && a && r ? h = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : s && (h = `Invalid request method "${s.toUpperCase()}"`)), new fu(
    n || 500,
    d,
    new Error(h),
    !0
  );
}
function jo(n) {
  let a = Object.entries(n);
  for (let r = a.length - 1; r >= 0; r--) {
    let [s, o] = a[r];
    if (Mi(o))
      return { key: s, result: o };
  }
}
function I0(n) {
  let a = typeof n == "string" ? zn(n) : n;
  return kn({ ...a, hash: "" });
}
function DE(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function jE(n) {
  return new fu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function NE(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, r]) => typeof a == "string" && zE(r)
  );
}
function zE(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function OE(n) {
  return Kd(n.result) && Y0.has(n.result.status);
}
function rn(n) {
  return n.type === "error";
}
function Mi(n) {
  return (n && n.type) === "redirect";
}
function Qg(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Kd(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function _E(n) {
  return Y0.has(n);
}
function LE(n) {
  return Kd(n) && _E(n.status) && n.headers.has("Location");
}
function VE(n) {
  return dE.has(n.toUpperCase());
}
function Ut(n) {
  return cE.has(n.toUpperCase());
}
function Qd(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function Bo(n, a) {
  let r = typeof a == "string" ? zn(a).search : a.search;
  if (n[n.length - 1].route.index && Qd(r || ""))
    return n[n.length - 1];
  let s = V0(n);
  return s[s.length - 1];
}
function Zg(n) {
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
function Yf(n, a) {
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
function UE(n, a) {
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
function jr(n, a) {
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
function BE(n, a) {
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
function HE(n, a) {
  try {
    let r = n.sessionStorage.getItem(
      G0
    );
    if (r) {
      let s = JSON.parse(r);
      for (let [o, f] of Object.entries(s || {}))
        f && Array.isArray(f) && a.set(o, new Set(f || []));
    }
  } catch {
  }
}
function qE(n, a) {
  if (a.size > 0) {
    let r = {};
    for (let [s, o] of a)
      r[s] = [...o];
    try {
      n.sessionStorage.setItem(
        G0,
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
function $g() {
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
var Ni = E.createContext(null);
Ni.displayName = "DataRouter";
var es = E.createContext(null);
es.displayName = "DataRouterState";
var J0 = E.createContext(!1);
function W0() {
  return E.useContext(J0);
}
var Zd = E.createContext({
  isTransitioning: !1
});
Zd.displayName = "ViewTransition";
var eb = E.createContext(
  /* @__PURE__ */ new Map()
);
eb.displayName = "Fetchers";
var YE = E.createContext(null);
YE.displayName = "Await";
var Tn = E.createContext(
  null
);
Tn.displayName = "Navigation";
var du = E.createContext(
  null
);
du.displayName = "Location";
var ha = E.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ha.displayName = "Route";
var $d = E.createContext(null);
$d.displayName = "RouteError";
var tb = "REACT_ROUTER_ERROR", GE = "REDIRECT", kE = "ROUTE_ERROR_RESPONSE";
function PE(n) {
  if (n.startsWith(`${tb}:${GE}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function XE(n) {
  if (n.startsWith(
    `${tb}:${kE}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new fu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function FE(n, { relative: a } = {}) {
  ze(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = E.useContext(Tn), { hash: o, pathname: f, search: d } = ns(n, { relative: a }), h = f;
  return r !== "/" && (h = f === "/" ? r : bn([r, f])), s.createHref({ pathname: h, search: d, hash: o });
}
function ts() {
  return E.useContext(du) != null;
}
function ma() {
  return ze(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), E.useContext(du).location;
}
var nb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function ab(n) {
  E.useContext(Tn).static || E.useLayoutEffect(n);
}
function zi() {
  let { isDataRoute: n } = E.useContext(ha);
  return n ? iR() : KE();
}
function KE() {
  ze(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = E.useContext(Ni), { basename: a, navigator: r } = E.useContext(Tn), { matches: s } = E.useContext(ha), { pathname: o } = ma(), f = JSON.stringify(Pd(s)), d = E.useRef(!1);
  return ab(() => {
    d.current = !0;
  }), E.useCallback(
    (p, m = {}) => {
      if (ht(d.current, nb), !d.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let g = cu(
        p,
        JSON.parse(f),
        o,
        m.relative === "path"
      );
      n == null && a !== "/" && (g.pathname = g.pathname === "/" ? a : bn([a, g.pathname])), (m.replace ? r.replace : r.push)(
        g,
        m.state,
        m
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
function ns(n, { relative: a } = {}) {
  let { matches: r } = E.useContext(ha), { pathname: s } = ma(), o = JSON.stringify(Pd(r));
  return E.useMemo(
    () => cu(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function QE(n, a, r) {
  ze(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = E.useContext(Tn), { matches: o } = E.useContext(ha), f = o[o.length - 1], d = f ? f.params : {}, h = f ? f.pathname : "/", p = f ? f.pathnameBase : "/", m = f && f.route;
  {
    let N = m && m.path || "";
    rb(
      h,
      !m || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

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
    m || R != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), ht(
    R == null || R[R.length - 1].route.element !== void 0 || R[R.length - 1].route.Component !== void 0 || R[R.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), WE(
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
function ZE() {
  let n = aR(), a = Kr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, f = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), d = /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ E.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ E.createElement("code", { style: f }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ E.createElement("code", { style: f }, "errorElement"), " prop on your route.")), /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ E.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ E.createElement("pre", { style: o }, r) : null, d);
}
var $E = /* @__PURE__ */ E.createElement(ZE, null), ib = class extends E.Component {
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
      const r = XE(n.digest);
      r && (n = r);
    }
    let a = n !== void 0 ? /* @__PURE__ */ E.createElement(ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ E.createElement(
      $d.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ E.createElement(IE, { error: n }, a) : a;
  }
};
ib.contextType = J0;
var Gf = /* @__PURE__ */ new WeakMap();
function IE({
  children: n,
  error: a
}) {
  let { basename: r } = E.useContext(Tn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = PE(a.digest);
    if (s) {
      let o = Gf.get(a);
      if (o) throw o;
      let f = B0(s.location, r);
      if (U0 && !Gf.get(a))
        if (f.isExternal || s.reloadDocument)
          window.location.href = f.absoluteURL || f.to;
        else {
          const d = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(f.to, {
              replace: s.replace
            })
          );
          throw Gf.set(a, d), d;
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
function JE({ routeContext: n, match: a, children: r }) {
  let s = E.useContext(Ni);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ E.createElement(ha.Provider, { value: n }, r);
}
function WE(n, a = [], r) {
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
  let d = !1, h = -1;
  if (r && s) {
    d = s.renderFallback;
    for (let g = 0; g < o.length; g++) {
      let v = o[g];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (h = g), v.route.id) {
        let { loaderData: S, errors: T } = s, R = v.route.loader && !S.hasOwnProperty(v.route.id) && (!T || T[v.route.id] === void 0);
        if (v.route.lazy || R) {
          r.isStatic && (d = !0), h >= 0 ? o = o.slice(0, h + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, m = s && p ? (g, v) => {
    p(g, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: Wr(s.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (g, v, S) => {
      let T, R = !1, w = null, N = null;
      s && (T = f && v.route.id ? f[v.route.id] : void 0, w = v.route.errorElement || $E, d && (h < 0 && S === 0 ? (rb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), R = !0, N = null) : h === S && (R = !0, N = v.route.hydrateFallbackElement || null)));
      let _ = a.concat(o.slice(0, S + 1)), q = () => {
        let L;
        return T ? L = w : R ? L = N : v.route.Component ? L = /* @__PURE__ */ E.createElement(v.route.Component, null) : v.route.element ? L = v.route.element : L = g, /* @__PURE__ */ E.createElement(
          JE,
          {
            match: v,
            routeContext: {
              outlet: g,
              matches: _,
              isDataRoute: s != null
            },
            children: L
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ E.createElement(
        ib,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: w,
          error: T,
          children: q(),
          routeContext: { outlet: null, matches: _, isDataRoute: !0 },
          onError: m
        }
      ) : q();
    },
    null
  );
}
function Id(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function eR(n) {
  let a = E.useContext(Ni);
  return ze(a, Id(n)), a;
}
function lb(n) {
  let a = E.useContext(es);
  return ze(a, Id(n)), a;
}
function tR(n) {
  let a = E.useContext(ha);
  return ze(a, Id(n)), a;
}
function hu(n) {
  let a = tR(n), r = a.matches[a.matches.length - 1];
  return ze(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function nR() {
  return hu(
    "useRouteId"
    /* UseRouteId */
  );
}
function as() {
  let n = lb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = hu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function aR() {
  let n = E.useContext($d), a = lb(
    "useRouteError"
    /* UseRouteError */
  ), r = hu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function iR() {
  let { router: n } = eR(
    "useNavigate"
    /* UseNavigateStable */
  ), a = hu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = E.useRef(!1);
  return ab(() => {
    r.current = !0;
  }), E.useCallback(
    async (o, f = {}) => {
      ht(r.current, nb), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...f }));
    },
    [n, a]
  );
}
var Ig = {};
function rb(n, a, r) {
  !a && !Ig[n] && (Ig[n] = !0, ht(!1, r));
}
var Jg = {};
function Wg(n, a) {
  !n && !Jg[a] && (Jg[a] = !0, console.warn(a));
}
var lR = "useOptimistic", ev = xT[lR], rR = () => {
};
function sR(n) {
  return ev ? ev(n) : [n, rR];
}
function oR(n) {
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
var uR = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function cR(n, a) {
  return yE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: NT({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: uR,
    mapRouteProperties: oR,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var fR = class {
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
function dR({
  router: n,
  flushSync: a,
  onError: r,
  unstable_useTransitions: s
}) {
  s = W0() || s;
  let [f, d] = E.useState(n.state), [h, p] = sR(f), [m, g] = E.useState(), [v, S] = E.useState({
    isTransitioning: !1
  }), [T, R] = E.useState(), [w, N] = E.useState(), [_, q] = E.useState(), L = E.useRef(/* @__PURE__ */ new Map()), K = E.useCallback(
    (W, { deletedFetchers: te, newErrors: P, flushSync: k, viewTransitionOpts: le }) => {
      P && r && Object.values(P).forEach(
        (se) => r(se, {
          location: W.location,
          params: W.matches[0]?.params ?? {},
          unstable_pattern: Wr(W.matches)
        })
      ), W.fetchers.forEach((se, B) => {
        se.data !== void 0 && L.current.set(B, se.data);
      }), te.forEach((se) => L.current.delete(se)), Wg(
        k === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let de = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (Wg(
        le == null || de,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !le || !de) {
        a && k ? a(() => d(W)) : s === !1 ? d(W) : E.startTransition(() => {
          s === !0 && p((se) => tv(se, W)), d(W);
        });
        return;
      }
      if (a && k) {
        a(() => {
          w && (T?.resolve(), w.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: le.currentLocation,
            nextLocation: le.nextLocation
          });
        });
        let se = n.window.document.startViewTransition(() => {
          a(() => d(W));
        });
        se.finished.finally(() => {
          a(() => {
            R(void 0), N(void 0), g(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => N(se));
        return;
      }
      w ? (T?.resolve(), w.skipTransition(), q({
        state: W,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      })) : (g(W), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      }));
    },
    [
      n.window,
      a,
      w,
      T,
      s,
      p,
      r
    ]
  );
  E.useLayoutEffect(() => n.subscribe(K), [n, K]);
  let I = h.initialized;
  E.useLayoutEffect(() => {
    !I && n.state.initialized && K(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [I, K, n.state]), E.useEffect(() => {
    v.isTransitioning && !v.flushSync && R(new fR());
  }, [v]), E.useEffect(() => {
    if (T && m && n.window) {
      let W = m, te = T.promise, P = n.window.document.startViewTransition(async () => {
        s === !1 ? d(W) : E.startTransition(() => {
          s === !0 && p((k) => tv(k, W)), d(W);
        }), await te;
      });
      P.finished.finally(() => {
        R(void 0), N(void 0), g(void 0), S({ isTransitioning: !1 });
      }), N(P);
    }
  }, [
    m,
    T,
    n.window,
    s,
    p
  ]), E.useEffect(() => {
    T && m && h.location.key === m.location.key && T.resolve();
  }, [T, w, h.location, m]), E.useEffect(() => {
    !v.isTransitioning && _ && (g(_.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: _.currentLocation,
      nextLocation: _.nextLocation
    }), q(void 0));
  }, [v.isTransitioning, _]);
  let $ = E.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (W) => n.navigate(W),
    push: (W, te, P) => n.navigate(W, {
      state: te,
      preventScrollReset: P?.preventScrollReset
    }),
    replace: (W, te, P) => n.navigate(W, {
      replace: !0,
      state: te,
      preventScrollReset: P?.preventScrollReset
    })
  }), [n]), ee = n.basename || "/", j = E.useMemo(
    () => ({
      router: n,
      navigator: $,
      static: !1,
      basename: ee,
      onError: r
    }),
    [n, $, ee, r]
  );
  return /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement(Ni.Provider, { value: j }, /* @__PURE__ */ E.createElement(es.Provider, { value: h }, /* @__PURE__ */ E.createElement(eb.Provider, { value: L.current }, /* @__PURE__ */ E.createElement(Zd.Provider, { value: v }, /* @__PURE__ */ E.createElement(
    pR,
    {
      basename: ee,
      location: h.location,
      navigationType: h.historyAction,
      navigator: $,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ E.createElement(
      hR,
      {
        routes: n.routes,
        future: n.future,
        state: h,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function tv(n, a) {
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
var hR = E.memo(mR);
function mR({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return QE(n, void 0, { state: r, isStatic: s, onError: o });
}
function pR({
  basename: n = "/",
  children: a = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: f = !1,
  unstable_useTransitions: d
}) {
  ze(
    !ts(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = n.replace(/^\/*/, "/"), p = E.useMemo(
    () => ({
      basename: h,
      navigator: o,
      static: f,
      unstable_useTransitions: d,
      future: {}
    }),
    [h, o, f, d]
  );
  typeof r == "string" && (r = zn(r));
  let {
    pathname: m = "/",
    search: g = "",
    hash: v = "",
    state: S = null,
    key: T = "default",
    unstable_mask: R
  } = r, w = E.useMemo(() => {
    let N = xn(m, h);
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
    h,
    m,
    g,
    v,
    S,
    T,
    s,
    R
  ]);
  return ht(
    w != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), w == null ? null : /* @__PURE__ */ E.createElement(Tn.Provider, { value: p }, /* @__PURE__ */ E.createElement(du.Provider, { children: a, value: w }));
}
var Ho = "get", qo = "application/x-www-form-urlencoded";
function mu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function yR(n) {
  return mu(n) && n.tagName.toLowerCase() === "button";
}
function gR(n) {
  return mu(n) && n.tagName.toLowerCase() === "form";
}
function vR(n) {
  return mu(n) && n.tagName.toLowerCase() === "input";
}
function bR(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function SR(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !bR(n);
}
var No = null;
function xR() {
  if (No === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), No = !1;
    } catch {
      No = !0;
    }
  return No;
}
var TR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function kf(n) {
  return n != null && !TR.has(n) ? (ht(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${qo}"`
  ), null) : n;
}
function ER(n, a) {
  let r, s, o, f, d;
  if (gR(n)) {
    let h = n.getAttribute("action");
    s = h ? xn(h, a) : null, r = n.getAttribute("method") || Ho, o = kf(n.getAttribute("enctype")) || qo, f = new FormData(n);
  } else if (yR(n) || vR(n) && (n.type === "submit" || n.type === "image")) {
    let h = n.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? xn(p, a) : null, r = n.getAttribute("formmethod") || h.getAttribute("method") || Ho, o = kf(n.getAttribute("formenctype")) || kf(h.getAttribute("enctype")) || qo, f = new FormData(h, n), !xR()) {
      let { name: m, type: g, value: v } = n;
      if (g === "image") {
        let S = m ? `${m}.` : "";
        f.append(`${S}x`, "0"), f.append(`${S}y`, "0");
      } else m && f.append(m, v);
    }
  } else {
    if (mu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Ho, s = null, o = qo, d = n;
  }
  return f && o === "text/plain" && (d = f, f = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: f, body: d };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Jd(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function sb(n, a, r, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return r ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && xn(o.pathname, a) === "/" ? o.pathname = `${Io(a)}/_root.${s}` : o.pathname = `${Io(o.pathname)}.${s}`, o;
}
async function RR(n, a) {
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
function MR(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function AR(n, a, r) {
  let s = await Promise.all(
    n.map(async (o) => {
      let f = a.routes[o.route.id];
      if (f) {
        let d = await RR(f, r);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return jR(
    s.flat(1).filter(MR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function nv(n, a, r, s, o, f) {
  let d = (p, m) => r[m] ? p.route.id !== r[m].route.id : !0, h = (p, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== p.params["*"]
  );
  return f === "assets" ? a.filter(
    (p, m) => d(p, m) || h(p, m)
  ) : f === "data" ? a.filter((p, m) => {
    let g = s.routes[p.route.id];
    if (!g || !g.hasLoader)
      return !1;
    if (d(p, m) || h(p, m))
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
function CR(n, a, { includeHydrateFallback: r } = {}) {
  return wR(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let f = [o.module];
      return o.clientActionModule && (f = f.concat(o.clientActionModule)), o.clientLoaderModule && (f = f.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (f = f.concat(o.hydrateFallbackModule)), o.imports && (f = f.concat(o.imports)), f;
    }).flat(1)
  );
}
function wR(n) {
  return [...new Set(n)];
}
function DR(n) {
  let a = {}, r = Object.keys(n).sort();
  for (let s of r)
    a[s] = n[s];
  return a;
}
function jR(n, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let f = JSON.stringify(DR(o));
    return r.has(f) || (r.add(f), s.push({ key: f, link: o })), s;
  }, []);
}
function Wd() {
  let n = E.useContext(Ni);
  return Jd(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function NR() {
  let n = E.useContext(es);
  return Jd(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var eh = E.createContext(void 0);
eh.displayName = "FrameworkContext";
function th() {
  let n = E.useContext(eh);
  return Jd(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function zR(n, a) {
  let r = E.useContext(eh), [s, o] = E.useState(!1), [f, d] = E.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: g, onTouchStart: v } = a, S = E.useRef(null);
  E.useEffect(() => {
    if (n === "render" && d(!0), n === "viewport") {
      let w = (_) => {
        _.forEach((q) => {
          d(q.isIntersecting);
        });
      }, N = new IntersectionObserver(w, { threshold: 0.5 });
      return S.current && N.observe(S.current), () => {
        N.disconnect();
      };
    }
  }, [n]), E.useEffect(() => {
    if (s) {
      let w = setTimeout(() => {
        d(!0);
      }, 100);
      return () => {
        clearTimeout(w);
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
      onFocus: Nr(h, T),
      onBlur: Nr(p, R),
      onMouseEnter: Nr(m, T),
      onMouseLeave: Nr(g, R),
      onTouchStart: Nr(v, T)
    }
  ] : [!1, S, {}];
}
function Nr(n, a) {
  return (r) => {
    n && n(r), r.defaultPrevented || a(r);
  };
}
function OR({ page: n, ...a }) {
  let r = W0(), { router: s } = Wd(), o = E.useMemo(
    () => Fa(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ E.createElement(LR, { page: n, matches: o, ...a }) : /* @__PURE__ */ E.createElement(VR, { page: n, matches: o, ...a }) : null;
}
function _R(n) {
  let { manifest: a, routeModules: r } = th(), [s, o] = E.useState([]);
  return E.useEffect(() => {
    let f = !1;
    return AR(n, a, r).then(
      (d) => {
        f || o(d);
      }
    ), () => {
      f = !0;
    };
  }, [n, a, r]), s;
}
function LR({
  page: n,
  matches: a,
  ...r
}) {
  let s = ma(), { future: o } = th(), { basename: f } = Wd(), d = E.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let h = sb(
      n,
      f,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, m = [];
    for (let g of a)
      typeof g.route.shouldRevalidate == "function" ? p = !0 : m.push(g.route.id);
    return p && m.length > 0 && h.searchParams.set("_routes", m.join(",")), [h.pathname + h.search];
  }, [
    f,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, d.map((h) => /* @__PURE__ */ E.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })));
}
function VR({
  page: n,
  matches: a,
  ...r
}) {
  let s = ma(), { future: o, manifest: f, routeModules: d } = th(), { basename: h } = Wd(), { loaderData: p, matches: m } = NR(), g = E.useMemo(
    () => nv(
      n,
      a,
      m,
      f,
      s,
      "data"
    ),
    [n, a, m, f, s]
  ), v = E.useMemo(
    () => nv(
      n,
      a,
      m,
      f,
      s,
      "assets"
    ),
    [n, a, m, f, s]
  ), S = E.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let w = /* @__PURE__ */ new Set(), N = !1;
    if (a.forEach((q) => {
      let L = f.routes[q.route.id];
      !L || !L.hasLoader || (!g.some((K) => K.route.id === q.route.id) && q.route.id in p && d[q.route.id]?.shouldRevalidate || L.hasClientLoader ? N = !0 : w.add(q.route.id));
    }), w.size === 0)
      return [];
    let _ = sb(
      n,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return N && w.size > 0 && _.searchParams.set(
      "_routes",
      a.filter((q) => w.has(q.route.id)).map((q) => q.route.id).join(",")
    ), [_.pathname + _.search];
  }, [
    h,
    o.unstable_trailingSlashAwareDataRequests,
    p,
    s,
    f,
    g,
    a,
    n,
    d
  ]), T = E.useMemo(
    () => CR(v, f),
    [v, f]
  ), R = _R(v);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, S.map((w) => /* @__PURE__ */ E.createElement("link", { key: w, rel: "prefetch", as: "fetch", href: w, ...r })), T.map((w) => /* @__PURE__ */ E.createElement("link", { key: w, rel: "modulepreload", href: w, ...r })), R.map(({ key: w, link: N }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ E.createElement(
      "link",
      {
        key: w,
        nonce: r.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function UR(...n) {
  return (a) => {
    n.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var BR = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  BR && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var ob = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, is = E.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: f,
    replace: d,
    unstable_mask: h,
    state: p,
    target: m,
    to: g,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: T,
    ...R
  }, w) {
    let { basename: N, navigator: _, unstable_useTransitions: q } = E.useContext(Tn), L = typeof g == "string" && ob.test(g), K = B0(g, N);
    g = K.to;
    let I = FE(g, { relative: o }), $ = ma(), ee = null;
    if (h) {
      let se = cu(
        h,
        [],
        $.unstable_mask ? $.unstable_mask.pathname : "/",
        !0
      );
      N !== "/" && (se.pathname = se.pathname === "/" ? N : bn([N, se.pathname])), ee = _.createHref(se);
    }
    let [j, W, te] = zR(
      s,
      R
    ), P = GR(g, {
      replace: d,
      unstable_mask: h,
      state: p,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: T,
      unstable_useTransitions: q
    });
    function k(se) {
      a && a(se), se.defaultPrevented || P(se);
    }
    let le = !(K.isExternal || f), de = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ E.createElement(
        "a",
        {
          ...R,
          ...te,
          href: (le ? ee : void 0) || K.absoluteURL || I,
          onClick: le ? k : a,
          ref: UR(w, W),
          target: m,
          "data-discover": !L && r === "render" ? "true" : void 0
        }
      )
    );
    return j && !L ? /* @__PURE__ */ E.createElement(E.Fragment, null, de, /* @__PURE__ */ E.createElement(OR, { page: I })) : de;
  }
);
is.displayName = "Link";
var HR = E.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: f,
    to: d,
    viewTransition: h,
    children: p,
    ...m
  }, g) {
    let v = ns(d, { relative: m.relative }), S = ma(), T = E.useContext(es), { navigator: R, basename: w } = E.useContext(Tn), N = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    KR(v) && h === !0, _ = R.encodeLocation ? R.encodeLocation(v).pathname : v.pathname, q = S.pathname, L = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    r || (q = q.toLowerCase(), L = L ? L.toLowerCase() : null, _ = _.toLowerCase()), L && w && (L = xn(L, w) || L);
    const K = _ !== "/" && _.endsWith("/") ? _.length - 1 : _.length;
    let I = q === _ || !o && q.startsWith(_) && q.charAt(K) === "/", $ = L != null && (L === _ || !o && L.startsWith(_) && L.charAt(_.length) === "/"), ee = {
      isActive: I,
      isPending: $,
      isTransitioning: N
    }, j = I ? a : void 0, W;
    typeof s == "function" ? W = s(ee) : W = [
      s,
      I ? "active" : null,
      $ ? "pending" : null,
      N ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let te = typeof f == "function" ? f(ee) : f;
    return /* @__PURE__ */ E.createElement(
      is,
      {
        ...m,
        "aria-current": j,
        className: W,
        ref: g,
        style: te,
        to: d,
        viewTransition: h
      },
      typeof p == "function" ? p(ee) : p
    );
  }
);
HR.displayName = "NavLink";
var qR = E.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: f,
    method: d = Ho,
    action: h,
    onSubmit: p,
    relative: m,
    preventScrollReset: g,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...T
  }, R) => {
    let { unstable_useTransitions: w } = E.useContext(Tn), N = XR(), _ = FR(h, { relative: m }), q = d.toLowerCase() === "get" ? "get" : "post", L = typeof h == "string" && ob.test(h), K = (I) => {
      if (p && p(I), I.defaultPrevented) return;
      I.preventDefault();
      let $ = I.nativeEvent.submitter, ee = $?.getAttribute("formmethod") || d, j = () => N($ || I.currentTarget, {
        fetcherKey: a,
        method: ee,
        navigate: r,
        replace: o,
        state: f,
        relative: m,
        preventScrollReset: g,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      w && r !== !1 ? E.startTransition(() => j()) : j();
    };
    return /* @__PURE__ */ E.createElement(
      "form",
      {
        ref: R,
        method: q,
        action: _,
        onSubmit: s ? p : K,
        ...T,
        "data-discover": !L && n === "render" ? "true" : void 0
      }
    );
  }
);
qR.displayName = "Form";
function YR(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ub(n) {
  let a = E.useContext(Ni);
  return ze(a, YR(n)), a;
}
function GR(n, {
  target: a,
  replace: r,
  unstable_mask: s,
  state: o,
  preventScrollReset: f,
  relative: d,
  viewTransition: h,
  unstable_defaultShouldRevalidate: p,
  unstable_useTransitions: m
} = {}) {
  let g = zi(), v = ma(), S = ns(n, { relative: d });
  return E.useCallback(
    (T) => {
      if (SR(T, a)) {
        T.preventDefault();
        let R = r !== void 0 ? r : kn(v) === kn(S), w = () => g(n, {
          replace: R,
          unstable_mask: s,
          state: o,
          preventScrollReset: f,
          relative: d,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? E.startTransition(() => w()) : w();
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
      h,
      p,
      m
    ]
  );
}
var kR = 0, PR = () => `__${String(++kR)}__`;
function XR() {
  let { router: n } = ub(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = E.useContext(Tn), r = nR(), s = n.fetch, o = n.navigate;
  return E.useCallback(
    async (f, d = {}) => {
      let { action: h, method: p, encType: m, formData: g, body: v } = ER(
        f,
        a
      );
      if (d.navigate === !1) {
        let S = d.fetcherKey || PR();
        await s(S, r, d.action || h, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: g,
          body: v,
          formMethod: d.method || p,
          formEncType: d.encType || m,
          flushSync: d.flushSync
        });
      } else
        await o(d.action || h, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: g,
          body: v,
          formMethod: d.method || p,
          formEncType: d.encType || m,
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
function FR(n, { relative: a } = {}) {
  let { basename: r } = E.useContext(Tn), s = E.useContext(ha);
  ze(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), f = { ...ns(n || ".", { relative: a }) }, d = ma();
  if (n == null) {
    f.search = d.search;
    let h = new URLSearchParams(f.search), p = h.getAll("index");
    if (p.some((g) => g === "")) {
      h.delete("index"), p.filter((v) => v).forEach((v) => h.append("index", v));
      let g = h.toString();
      f.search = g ? `?${g}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (f.pathname = f.pathname === "/" ? r : bn([r, f.pathname])), kn(f);
}
function KR(n, { relative: a } = {}) {
  let r = E.useContext(Zd);
  ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = ub(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = ns(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let f = xn(r.currentLocation.pathname, s) || r.currentLocation.pathname, d = xn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return $o(o.pathname, d) != null || $o(o.pathname, f) != null;
}
class Oi extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const nh = "/api/v1/extensions/nexus.audio.emotiontts";
async function rt(n, a) {
  const r = n.startsWith("http") ? n : `${nh}${n}`, s = await fetch(r, {
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
    throw new Oi(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function QR(n, a, r) {
  const s = n.startsWith("http") ? n : `${nh}${n}`, o = new EventSource(s);
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
async function ZR() {
  return rt("/deployments");
}
async function av(n) {
  return rt(`/deployments/${n}`);
}
async function iv(n) {
  return rt(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function cb(n, a) {
  return rt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function $R(n, a) {
  return rt(`/mappings/${n}`, {
    method: "PATCH",
    body: JSON.stringify(a)
  });
}
async function IR(n, a) {
  await rt(`/mappings/${a}`, { method: "DELETE" });
}
async function JR(n) {
  return rt(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function WR(n, a, r = "error") {
  return rt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function eM(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return rt(`/deployments/${n}/runs${o}`);
}
async function tM(n, a) {
  return rt(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function fb(n, a) {
  return rt(`/deployments/${n}/runs/${a}`);
}
async function nM(n, a) {
  return rt(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function ah(n, a) {
  return rt(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function aM(n, a) {
  return rt(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function lv(n, a, r, s) {
  return QR(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function yd(n) {
  return rt(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function iM(n, a, r, s, o) {
  const f = new FormData();
  f.append("deploymentId", n), f.append("displayName", r), f.append("kind", s), f.append("audio", a);
  const d = await fetch(`${nh}/voice-assets`, {
    method: "POST",
    body: f
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function lM(n) {
  return rt(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var rM = "_93p6291", sM = "_93p6292", oM = "_93p6293", uM = "_93p6294", cM = "_93p6295", fM = "_93p6296", dM = "_93p6297", hM = "_93p6298", mM = "_93p6299", pM = "_93p629a", yM = "_93p629b", gM = "_93p629c", vM = "_93p629d", bM = "_93p629e", SM = "_93p629f", xM = "_93p629g", TM = "_93p629h", EM = "_93p629i";
function RM() {
  const { deployments: n } = as();
  return /* @__PURE__ */ b.jsxs("main", { className: rM, children: [
    /* @__PURE__ */ b.jsxs("header", { className: sM, children: [
      /* @__PURE__ */ b.jsx("p", { className: oM, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ b.jsxs("h1", { className: uM, children: [
        "Direct your characters.",
        /* @__PURE__ */ b.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: cM, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: fM, children: [
      /* @__PURE__ */ b.jsx("h2", { className: dM, children: "Deployments" }),
      n.length === 0 ? /* @__PURE__ */ b.jsxs("div", { className: bM, children: [
        /* @__PURE__ */ b.jsx("span", { className: SM, "aria-hidden": "true", children: "◈" }),
        /* @__PURE__ */ b.jsx("p", { className: xM, children: "No deployments yet" }),
        /* @__PURE__ */ b.jsx("p", { className: TM, children: "A deployment is a named character-cast that binds voices, presets, and the runtime settings for a script. Create your first one from the host shell." }),
        /* @__PURE__ */ b.jsx("p", { className: EM, children: "Host shell → Extensions → EmotionTTS → New" })
      ] }) : /* @__PURE__ */ b.jsx("ul", { className: hM, children: n.map((a) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(is, { to: `/${a.deploymentId}/recipe`, className: mM, children: [
        /* @__PURE__ */ b.jsx("span", { className: pM, "aria-hidden": "true", children: MM(a.displayName) }),
        /* @__PURE__ */ b.jsxs("span", { children: [
          /* @__PURE__ */ b.jsx("span", { className: yM, children: a.displayName }),
          /* @__PURE__ */ b.jsx("span", { className: gM, children: a.deploymentId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: vM, "aria-hidden": "true", children: "→" })
      ] }) }, a.deploymentId)) })
    ] })
  ] });
}
function MM(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const AM = "huggingface/IndexTeam/IndexTTS-2";
async function CM(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function wM() {
  return rt("/runtime/health");
}
async function DM() {
  await rt("/runtime/start", { method: "POST" });
}
async function jM() {
  return rt("/runtime/stop", { method: "POST" });
}
async function NM() {
  await rt("/runtime/restart", { method: "POST" });
}
function zM(n) {
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
var OM = "g5r6d10", _M = "g5r6d11", LM = "g5r6d12", zr = "g5r6d13", Or = "g5r6d14", VM = "g5r6d15", UM = "g5r6d16", BM = "g5r6d17", $t = "g5r6d18", Xa = "g5r6d19", Jo = "g5r6d1b g5r6d1a", $a = "g5r6d1c g5r6d1a", db = "g5r6d1d g5r6d1a", hb = "g5r6d1e", Qr = "g5r6d1f", gd = "g5r6d1g", HM = "g5r6d1h", qM = "g5r6d1i", ka = "g5r6d1j", mb = "g5r6d1k", pb = "g5r6d1l g5r6d1k", ih = "g5r6d1m g5r6d1k", lh = "g5r6d1n g5r6d1k";
const YM = 4e3;
function GM({ deployment: n }) {
  const a = zi(), [r, s] = E.useState(null), [o, f] = E.useState(null), [d, h] = E.useState(!1);
  E.useEffect(() => {
    let N = !1;
    const _ = async () => {
      try {
        const L = await wM();
        N || (s(L), f(null));
      } catch (L) {
        N || f(_r(L));
      }
    };
    _();
    const q = setInterval(_, YM);
    return () => {
      N = !0, clearInterval(q);
    };
  }, []);
  const p = E.useCallback(async () => {
    h(!0), f(null);
    try {
      await DM();
    } catch (N) {
      f(_r(N));
    } finally {
      h(!1);
    }
  }, []), m = E.useCallback(async () => {
    h(!0);
    try {
      await jM();
    } catch (N) {
      f(_r(N));
    } finally {
      h(!1);
    }
  }, []), g = E.useCallback(async () => {
    h(!0);
    try {
      await NM();
    } catch (N) {
      f(_r(N));
    } finally {
      h(!1);
    }
  }, []), v = E.useCallback(async () => {
    h(!0);
    try {
      await CM(AM);
    } catch (N) {
      f(_r(N));
    } finally {
      h(!1);
    }
  }, []), S = r?.badge ?? "not_installed", T = S === "stopped" || S === "not_installed", R = S === "ready" || S === "running" || S === "starting", w = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { className: Xa, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ b.jsx("span", { className: $t, children: "Runtime" }),
    /* @__PURE__ */ b.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ b.jsx("span", { className: $t, children: "Badge" }),
    /* @__PURE__ */ b.jsx("span", { className: kM(S), children: zM(S) }),
    r && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Uptime" }),
      /* @__PURE__ */ b.jsx("span", { children: PM(r.uptimeSeconds) }),
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "VRAM" }),
      /* @__PURE__ */ b.jsxs("span", { children: [
        r.vramUsedMb,
        " / ",
        r.vramTotalMb,
        " MB"
      ] })
    ] }),
    T && /* @__PURE__ */ b.jsx("button", { type: "button", className: Jo, disabled: d, onClick: p, children: "Install / Start runtime" }),
    R && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("button", { type: "button", className: db, disabled: d, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ b.jsx("button", { type: "button", className: $a, disabled: d, onClick: g, children: "Restart" })
    ] }),
    w && /* @__PURE__ */ b.jsx("button", { type: "button", className: Jo, disabled: d, onClick: v, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: $a,
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !w && /* @__PURE__ */ b.jsx("span", { className: Qr, children: o })
  ] });
}
function kM(n) {
  switch (n) {
    case "ready":
    case "running":
      return pb;
    case "starting":
    case "stopping":
    case "installing":
      return ih;
    case "failed":
      return lh;
    default:
      return mb;
  }
}
function PM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function _r(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
async function XM(n) {
  return rt(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function FM(n, a, r) {
  return rt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: r })
  });
}
async function KM(n) {
  await rt(`/presets/${n}`, { method: "DELETE" });
}
var QM = "wfqeb50", ZM = "wfqeb51", $M = "wfqeb52", IM = "wfqeb53", JM = "wfqeb54", WM = "wfqeb55 wfqeb54", eA = "wfqeb56", tA = "wfqeb57", yb = "wfqeb58", gb = "wfqeb59", vb = "wfqeb5a", nA = "wfqeb5b", aA = "wfqeb5c", rv = "wfqeb5d", iA = "wfqeb5e wfqeb5d", lA = "wfqeb5f wfqeb5d", rA = "wfqeb5g", sA = "wfqeb5h", Pf = "wfqeb5i", oA = "wfqeb5j", uA = "wfqeb5k", cA = "wfqeb5l", fA = "wfqeb5m";
const rh = E.createContext({});
function sh(n) {
  const a = E.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const dA = typeof window < "u", bb = dA ? E.useLayoutEffect : E.useEffect, pu = /* @__PURE__ */ E.createContext(null);
function oh(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function Wo(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const Pn = (n, a, r) => r > a ? a : r < n ? n : r;
function sv(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let ls = () => {
}, ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (ls = (n, a, r) => {
  !n && typeof console < "u" && console.warn(sv(a, r));
}, ji = (n, a, r) => {
  if (!n)
    throw new Error(sv(a, r));
});
const Ia = {}, Sb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function xb(n) {
  return typeof n == "object" && n !== null;
}
const Tb = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Eb(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Sn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, hA = (n, a) => (r) => a(n(r)), rs = (...n) => n.reduce(hA), Zr = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class uh {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return oh(this.subscriptions, a), () => Wo(this.subscriptions, a);
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
const It = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, vn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Rb(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Mb = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, mA = 1e-7, pA = 12;
function yA(n, a, r, s, o) {
  let f, d, h = 0;
  do
    d = a + (r - a) / 2, f = Mb(d, s, o) - n, f > 0 ? r = d : a = d;
  while (Math.abs(f) > mA && ++h < pA);
  return d;
}
function ss(n, a, r, s) {
  if (n === a && r === s)
    return Sn;
  const o = (f) => yA(f, 0, 1, n, r);
  return (f) => f === 0 || f === 1 ? f : Mb(o(f), a, s);
}
const Ab = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Cb = (n) => (a) => 1 - n(1 - a), wb = /* @__PURE__ */ ss(0.33, 1.53, 0.69, 0.99), ch = /* @__PURE__ */ Cb(wb), Db = /* @__PURE__ */ Ab(ch), jb = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * ch(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), fh = (n) => 1 - Math.sin(Math.acos(n)), Nb = Cb(fh), zb = Ab(fh), gA = /* @__PURE__ */ ss(0.42, 0, 1, 1), vA = /* @__PURE__ */ ss(0, 0, 0.58, 1), Ob = /* @__PURE__ */ ss(0.42, 0, 0.58, 1), bA = (n) => Array.isArray(n) && typeof n[0] != "number", _b = (n) => Array.isArray(n) && typeof n[0] == "number", ov = {
  linear: Sn,
  easeIn: gA,
  easeInOut: Ob,
  easeOut: vA,
  circIn: fh,
  circInOut: zb,
  circOut: Nb,
  backIn: ch,
  backInOut: Db,
  backOut: wb,
  anticipate: jb
}, SA = (n) => typeof n == "string", uv = (n) => {
  if (_b(n)) {
    ji(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return ss(a, r, s, o);
  } else if (SA(n))
    return ji(ov[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), ov[n];
  return n;
}, zo = [
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
function xA(n, a) {
  let r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, f = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function p(g) {
    d.has(g) && (m.schedule(g), n()), g(h);
  }
  const m = {
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
      if (h = g, o) {
        f = !0;
        return;
      }
      o = !0;
      const v = r;
      r = s, s = v, r.forEach(p), r.clear(), o = !1, f && (f = !1, m.process(g));
    }
  };
  return m;
}
const TA = 40;
function Lb(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, f = () => r = !0, d = zo.reduce((L, K) => (L[K] = xA(f), L), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: g, update: v, preRender: S, render: T, postRender: R } = d, w = () => {
    const L = Ia.useManualTiming, K = L ? o.timestamp : performance.now();
    r = !1, L || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(K - o.timestamp, TA), 1)), o.timestamp = K, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), g.process(o), v.process(o), S.process(o), T.process(o), R.process(o), o.isProcessing = !1, r && a && (s = !1, n(w));
  }, N = () => {
    r = !0, s = !0, o.isProcessing || n(w);
  };
  return { schedule: zo.reduce((L, K) => {
    const I = d[K];
    return L[K] = ($, ee = !1, j = !1) => (r || N(), I.schedule($, ee, j)), L;
  }, {}), cancel: (L) => {
    for (let K = 0; K < zo.length; K++)
      d[zo[K]].cancel(L);
  }, state: o, steps: d };
}
const { schedule: Je, cancel: Ja, state: zt, steps: Xf } = /* @__PURE__ */ Lb(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Sn, !0);
let Yo;
function EA() {
  Yo = void 0;
}
const Yt = {
  now: () => (Yo === void 0 && Yt.set(zt.isProcessing || Ia.useManualTiming ? zt.timestamp : performance.now()), Yo),
  set: (n) => {
    Yo = n, queueMicrotask(EA);
  }
}, Vb = (n) => (a) => typeof a == "string" && a.startsWith(n), Ub = /* @__PURE__ */ Vb("--"), RA = /* @__PURE__ */ Vb("var(--"), dh = (n) => RA(n) ? MA.test(n.split("/*")[0].trim()) : !1, MA = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function cv(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Nl = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, $r = {
  ...Nl,
  transform: (n) => Pn(0, 1, n)
}, Oo = {
  ...Nl,
  default: 1
}, Gr = (n) => Math.round(n * 1e5) / 1e5, hh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function AA(n) {
  return n == null;
}
const CA = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, mh = (n, a) => (r) => !!(typeof r == "string" && CA.test(r) && r.startsWith(n) || a && !AA(r) && Object.prototype.hasOwnProperty.call(r, a)), Bb = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, f, d, h] = s.match(hh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(f),
    [r]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, wA = (n) => Pn(0, 255, n), Ff = {
  ...Nl,
  transform: (n) => Math.round(wA(n))
}, Ai = {
  test: /* @__PURE__ */ mh("rgb", "red"),
  parse: /* @__PURE__ */ Bb("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + Ff.transform(n) + ", " + Ff.transform(a) + ", " + Ff.transform(r) + ", " + Gr($r.transform(s)) + ")"
};
function DA(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const vd = {
  test: /* @__PURE__ */ mh("#"),
  parse: DA,
  transform: Ai.transform
}, os = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), Pa = /* @__PURE__ */ os("deg"), Gn = /* @__PURE__ */ os("%"), ye = /* @__PURE__ */ os("px"), jA = /* @__PURE__ */ os("vh"), NA = /* @__PURE__ */ os("vw"), fv = {
  ...Gn,
  parse: (n) => Gn.parse(n) / 100,
  transform: (n) => Gn.transform(n * 100)
}, Rl = {
  test: /* @__PURE__ */ mh("hsl", "hue"),
  parse: /* @__PURE__ */ Bb("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Gn.transform(Gr(a)) + ", " + Gn.transform(Gr(r)) + ", " + Gr($r.transform(s)) + ")"
}, xt = {
  test: (n) => Ai.test(n) || vd.test(n) || Rl.test(n),
  parse: (n) => Ai.test(n) ? Ai.parse(n) : Rl.test(n) ? Rl.parse(n) : vd.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Ai.transform(n) : Rl.transform(n),
  getAnimatableNone: (n) => {
    const a = xt.parse(n);
    return a.alpha = 0, xt.transform(a);
  }
}, zA = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function OA(n) {
  return isNaN(n) && typeof n == "string" && (n.match(hh)?.length || 0) + (n.match(zA)?.length || 0) > 0;
}
const Hb = "number", qb = "color", _A = "var", LA = "var(", dv = "${}", VA = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Dl(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let f = 0;
  const h = a.replace(VA, (p) => (xt.test(p) ? (s.color.push(f), o.push(qb), r.push(xt.parse(p))) : p.startsWith(LA) ? (s.var.push(f), o.push(_A), r.push(p)) : (s.number.push(f), o.push(Hb), r.push(parseFloat(p))), ++f, dv)).split(dv);
  return { values: r, split: h, indexes: s, types: o };
}
function UA(n) {
  return Dl(n).values;
}
function Yb({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let f = 0; f < r; f++)
      if (o += n[f], s[f] !== void 0) {
        const d = a[f];
        d === Hb ? o += Gr(s[f]) : d === qb ? o += xt.transform(s[f]) : o += s[f];
      }
    return o;
  };
}
function BA(n) {
  return Yb(Dl(n));
}
const HA = (n) => typeof n == "number" ? 0 : xt.test(n) ? xt.getAnimatableNone(n) : n, qA = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : HA(n);
function YA(n) {
  const a = Dl(n);
  return Yb(a)(a.values.map((s, o) => qA(s, a.split[o])));
}
const Nn = {
  test: OA,
  parse: UA,
  createTransformer: BA,
  getAnimatableNone: YA
};
function Kf(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function GA({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, f = 0, d = 0;
  if (!a)
    o = f = d = r;
  else {
    const h = r < 0.5 ? r * (1 + a) : r + a - r * a, p = 2 * r - h;
    o = Kf(p, h, n + 1 / 3), f = Kf(p, h, n), d = Kf(p, h, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(f * 255),
    blue: Math.round(d * 255),
    alpha: s
  };
}
function eu(n, a) {
  return (r) => r > 0 ? a : n;
}
const at = (n, a, r) => n + (a - n) * r, Qf = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, kA = [vd, Ai, Rl], PA = (n) => kA.find((a) => a.test(n));
function hv(n) {
  const a = PA(n);
  if (ls(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === Rl && (r = GA(r)), r;
}
const mv = (n, a) => {
  const r = hv(n), s = hv(a);
  if (!r || !s)
    return eu(n, a);
  const o = { ...r };
  return (f) => (o.red = Qf(r.red, s.red, f), o.green = Qf(r.green, s.green, f), o.blue = Qf(r.blue, s.blue, f), o.alpha = at(r.alpha, s.alpha, f), Ai.transform(o));
}, bd = /* @__PURE__ */ new Set(["none", "hidden"]);
function XA(n, a) {
  return bd.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function FA(n, a) {
  return (r) => at(n, a, r);
}
function ph(n) {
  return typeof n == "number" ? FA : typeof n == "string" ? dh(n) ? eu : xt.test(n) ? mv : ZA : Array.isArray(n) ? Gb : typeof n == "object" ? xt.test(n) ? mv : KA : eu;
}
function Gb(n, a) {
  const r = [...n], s = r.length, o = n.map((f, d) => ph(f)(f, a[d]));
  return (f) => {
    for (let d = 0; d < s; d++)
      r[d] = o[d](f);
    return r;
  };
}
function KA(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = ph(n[o])(n[o], a[o]));
  return (o) => {
    for (const f in s)
      r[f] = s[f](o);
    return r;
  };
}
function QA(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const f = a.types[o], d = n.indexes[f][s[f]], h = n.values[d] ?? 0;
    r[o] = h, s[f]++;
  }
  return r;
}
const ZA = (n, a) => {
  const r = Nn.createTransformer(a), s = Dl(n), o = Dl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? bd.has(n) && !o.values.length || bd.has(a) && !s.values.length ? XA(n, a) : rs(Gb(QA(s, o), o.values), r) : (ls(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), eu(n, a));
};
function kb(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? at(n, a, r) : ph(n)(n, a);
}
const $A = (n) => {
  const a = ({ timestamp: r }) => n(r);
  return {
    start: (r = !0) => Je.update(a, r),
    stop: () => Ja(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => zt.isProcessing ? zt.timestamp : Yt.now()
  };
}, Pb = (n, a, r = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / r), 2);
  for (let f = 0; f < o; f++)
    s += Math.round(n(f / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, tu = 2e4;
function yh(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < tu; )
    a += r, s = n.next(a);
  return a >= tu ? 1 / 0 : a;
}
function IA(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(yh(s), tu);
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
function Sd(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const JA = 12;
function WA(n, a, r) {
  let s = r;
  for (let o = 1; o < JA; o++)
    s = s - n(s) / a(s);
  return s;
}
const Zf = 1e-3;
function eC({ duration: n = st.duration, bounce: a = st.bounce, velocity: r = st.velocity, mass: s = st.mass }) {
  let o, f;
  ls(n <= /* @__PURE__ */ It(st.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = Pn(st.minDamping, st.maxDamping, d), n = Pn(st.minDuration, st.maxDuration, /* @__PURE__ */ vn(n)), d < 1 ? (o = (m) => {
    const g = m * d, v = g * n, S = g - r, T = Sd(m, d), R = Math.exp(-v);
    return Zf - S / T * R;
  }, f = (m) => {
    const v = m * d * n, S = v * r + r, T = Math.pow(d, 2) * Math.pow(m, 2) * n, R = Math.exp(-v), w = Sd(Math.pow(m, 2), d);
    return (-o(m) + Zf > 0 ? -1 : 1) * ((S - T) * R) / w;
  }) : (o = (m) => {
    const g = Math.exp(-m * n), v = (m - r) * n + 1;
    return -Zf + g * v;
  }, f = (m) => {
    const g = Math.exp(-m * n), v = (r - m) * (n * n);
    return g * v;
  });
  const h = 5 / n, p = WA(o, f, h);
  if (n = /* @__PURE__ */ It(n), isNaN(p))
    return {
      stiffness: st.stiffness,
      damping: st.damping,
      duration: n
    };
  {
    const m = Math.pow(p, 2) * s;
    return {
      stiffness: m,
      damping: d * 2 * Math.sqrt(s * m),
      duration: n
    };
  }
}
const tC = ["duration", "bounce"], nC = ["stiffness", "damping", "mass"];
function pv(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function aC(n) {
  let a = {
    velocity: st.velocity,
    stiffness: st.stiffness,
    damping: st.damping,
    mass: st.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!pv(n, nC) && pv(n, tC))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, f = 2 * Pn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: st.mass,
        stiffness: o,
        damping: f
      };
    } else {
      const r = eC({ ...n, velocity: 0 });
      a = {
        ...a,
        ...r,
        mass: st.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function nu(n = st.visualDuration, a = st.bounce) {
  const r = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = r;
  const f = r.keyframes[0], d = r.keyframes[r.keyframes.length - 1], h = { done: !1, value: f }, { stiffness: p, damping: m, mass: g, duration: v, velocity: S, isResolvedFromDuration: T } = aC({
    ...r,
    velocity: -/* @__PURE__ */ vn(r.velocity || 0)
  }), R = S || 0, w = m / (2 * Math.sqrt(p * g)), N = d - f, _ = /* @__PURE__ */ vn(Math.sqrt(p / g)), q = Math.abs(N) < 5;
  s || (s = q ? st.restSpeed.granular : st.restSpeed.default), o || (o = q ? st.restDelta.granular : st.restDelta.default);
  let L, K, I, $, ee, j;
  if (w < 1)
    I = Sd(_, w), $ = (R + w * _ * N) / I, L = (te) => {
      const P = Math.exp(-w * _ * te);
      return d - P * ($ * Math.sin(I * te) + N * Math.cos(I * te));
    }, ee = w * _ * $ + N * I, j = w * _ * N - $ * I, K = (te) => Math.exp(-w * _ * te) * (ee * Math.sin(I * te) + j * Math.cos(I * te));
  else if (w === 1) {
    L = (P) => d - Math.exp(-_ * P) * (N + (R + _ * N) * P);
    const te = R + _ * N;
    K = (P) => Math.exp(-_ * P) * (_ * te * P - R);
  } else {
    const te = _ * Math.sqrt(w * w - 1);
    L = (de) => {
      const se = Math.exp(-w * _ * de), B = Math.min(te * de, 300);
      return d - se * ((R + w * _ * N) * Math.sinh(B) + te * N * Math.cosh(B)) / te;
    };
    const P = (R + w * _ * N) / te, k = w * _ * P - N * te, le = w * _ * N - P * te;
    K = (de) => {
      const se = Math.exp(-w * _ * de), B = Math.min(te * de, 300);
      return se * (k * Math.sinh(B) + le * Math.cosh(B));
    };
  }
  const W = {
    calculatedDuration: T && v || null,
    velocity: (te) => /* @__PURE__ */ It(K(te)),
    next: (te) => {
      if (!T && w < 1) {
        const k = Math.exp(-w * _ * te), le = Math.sin(I * te), de = Math.cos(I * te), se = d - k * ($ * le + N * de), B = /* @__PURE__ */ It(k * (ee * le + j * de));
        return h.done = Math.abs(B) <= s && Math.abs(d - se) <= o, h.value = h.done ? d : se, h;
      }
      const P = L(te);
      if (T)
        h.done = te >= v;
      else {
        const k = /* @__PURE__ */ It(K(te));
        h.done = Math.abs(k) <= s && Math.abs(d - P) <= o;
      }
      return h.value = h.done ? d : P, h;
    },
    toString: () => {
      const te = Math.min(yh(W), tu), P = Pb((k) => W.next(te * k).value, te, 30);
      return te + "ms " + P;
    },
    toTransition: () => {
    }
  };
  return W;
}
nu.applyToOptions = (n) => {
  const a = IA(n, 100, nu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ It(a.duration), n.type = "keyframes", n;
};
const iC = 5;
function Xb(n, a, r) {
  const s = Math.max(a - iC, 0);
  return Rb(r - n(s), a - s);
}
function xd({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: f = 500, modifyTarget: d, min: h, max: p, restDelta: m = 0.5, restSpeed: g }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, T = (j) => h !== void 0 && j < h || p !== void 0 && j > p, R = (j) => h === void 0 ? p : p === void 0 || Math.abs(h - j) < Math.abs(p - j) ? h : p;
  let w = r * a;
  const N = v + w, _ = d === void 0 ? N : d(N);
  _ !== N && (w = _ - v);
  const q = (j) => -w * Math.exp(-j / s), L = (j) => _ + q(j), K = (j) => {
    const W = q(j), te = L(j);
    S.done = Math.abs(W) <= m, S.value = S.done ? _ : te;
  };
  let I, $;
  const ee = (j) => {
    T(S.value) && (I = j, $ = nu({
      keyframes: [S.value, R(S.value)],
      velocity: Xb(L, j, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: f,
      restDelta: m,
      restSpeed: g
    }));
  };
  return ee(0), {
    calculatedDuration: null,
    next: (j) => {
      let W = !1;
      return !$ && I === void 0 && (W = !0, K(j), ee(j)), I !== void 0 && j >= I ? $.next(j - I) : (!W && K(j), S);
    }
  };
}
function lC(n, a, r) {
  const s = [], o = r || Ia.mix || kb, f = n.length - 1;
  for (let d = 0; d < f; d++) {
    let h = o(n[d], n[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || Sn : a;
      h = rs(p, h);
    }
    s.push(h);
  }
  return s;
}
function rC(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const f = n.length;
  if (ji(f === a.length, "Both input and output ranges must be the same length", "range-length"), f === 1)
    return () => a[0];
  if (f === 2 && a[0] === a[1])
    return () => a[1];
  const d = n[0] === n[1];
  n[0] > n[f - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const h = lC(a, s, o), p = h.length, m = (g) => {
    if (d && g < n[0])
      return a[0];
    let v = 0;
    if (p > 1)
      for (; v < n.length - 2 && !(g < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ Zr(n[v], n[v + 1], g);
    return h[v](S);
  };
  return r ? (g) => m(Pn(n[0], n[f - 1], g)) : m;
}
function sC(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Zr(0, a, s);
    n.push(at(r, 1, o));
  }
}
function oC(n) {
  const a = [0];
  return sC(a, n.length - 1), a;
}
function uC(n, a) {
  return n.map((r) => r * a);
}
function cC(n, a) {
  return n.map(() => a || Ob).splice(0, n.length - 1);
}
function kr({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = bA(s) ? s.map(uv) : uv(s), f = {
    done: !1,
    value: a[0]
  }, d = uC(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : oC(a),
    n
  ), h = rC(d, a, {
    ease: Array.isArray(o) ? o : cC(a, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (f.value = h(p), f.done = p >= n, f)
  };
}
const fC = (n) => n !== null;
function yu(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const f = n.filter(fC), h = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : f.length - 1;
  return !h || s === void 0 ? f[h] : s;
}
const dC = {
  decay: xd,
  inertia: xd,
  tween: kr,
  keyframes: kr,
  spring: nu
};
function Fb(n) {
  typeof n.type == "string" && (n.type = dC[n.type]);
}
class gh {
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
const hC = (n) => n / 100;
class au extends gh {
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
    Fb(a);
    const { type: r = kr, repeat: s = 0, repeatDelay: o = 0, repeatType: f, velocity: d = 0 } = a;
    let { keyframes: h } = a;
    const p = r || kr;
    p !== kr && typeof h[0] != "number" && (this.mixKeyframes = rs(hC, kb(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    f === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -d
    })), m.calculatedDuration === null && (m.calculatedDuration = yh(m));
    const { calculatedDuration: g } = m;
    this.calculatedDuration = g, this.resolvedDuration = g + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const r = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(a, r = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: f, mirroredGenerator: d, resolvedDuration: h, calculatedDuration: p } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: g, repeat: v, repeatType: S, repeatDelay: T, type: R, onUpdate: w, finalKeyframe: N } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const _ = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), q = this.playbackSpeed >= 0 ? _ < 0 : _ > o;
    this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let L = this.currentTime, K = s;
    if (v) {
      const j = Math.min(this.currentTime, o) / h;
      let W = Math.floor(j), te = j % 1;
      !te && j >= 1 && (te = 1), te === 1 && W--, W = Math.min(W, v + 1), !!(W % 2) && (S === "reverse" ? (te = 1 - te, T && (te -= T / h)) : S === "mirror" && (K = d)), L = Pn(0, 1, te) * h;
    }
    let I;
    q ? (this.delayState.value = g[0], I = this.delayState) : I = K.next(L), f && !q && (I.value = f(I.value));
    let { done: $ } = I;
    !q && p !== null && ($ = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ee = this.holdTime === null && (this.state === "finished" || this.state === "running" && $);
    return ee && R !== xd && (I.value = yu(g, this.options, N, this.speed)), w && w(I.value), ee && this.finish(), I;
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
    a = /* @__PURE__ */ It(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return Xb((s) => this.generator.next(s).value, a, r);
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
    const { driver: a = $A, startTime: r } = this.options;
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
function mC(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Ci = (n) => n * 180 / Math.PI, Td = (n) => {
  const a = Ci(Math.atan2(n[1], n[0]));
  return Ed(a);
}, pC = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Td,
  rotateZ: Td,
  skewX: (n) => Ci(Math.atan(n[1])),
  skewY: (n) => Ci(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, Ed = (n) => (n = n % 360, n < 0 && (n += 360), n), yv = Td, gv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), vv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), yC = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: gv,
  scaleY: vv,
  scale: (n) => (gv(n) + vv(n)) / 2,
  rotateX: (n) => Ed(Ci(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Ed(Ci(Math.atan2(-n[2], n[0]))),
  rotateZ: yv,
  rotate: yv,
  skewX: (n) => Ci(Math.atan(n[4])),
  skewY: (n) => Ci(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Rd(n) {
  return n.includes("scale") ? 1 : 0;
}
function Md(n, a) {
  if (!n || n === "none")
    return Rd(a);
  const r = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (r)
    s = yC, o = r;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = pC, o = h;
  }
  if (!o)
    return Rd(a);
  const f = s[a], d = o[1].split(",").map(vC);
  return typeof f == "function" ? f(d) : d[f];
}
const gC = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Md(r, a);
};
function vC(n) {
  return parseFloat(n.trim());
}
const zl = [
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
], Ol = new Set(zl), bv = (n) => n === Nl || n === ye, bC = /* @__PURE__ */ new Set(["x", "y", "z"]), SC = zl.filter((n) => !bC.has(n));
function xC(n) {
  const a = [];
  return SC.forEach((r) => {
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
  x: (n, { transform: a }) => Md(a, "x"),
  y: (n, { transform: a }) => Md(a, "y")
};
Za.translateX = Za.x;
Za.translateY = Za.y;
const wi = /* @__PURE__ */ new Set();
let Ad = !1, Cd = !1, wd = !1;
function Kb() {
  if (Cd) {
    const n = Array.from(wi).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = xC(s);
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
  Cd = !1, Ad = !1, wi.forEach((n) => n.complete(wd)), wi.clear();
}
function Qb() {
  wi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Cd = !0);
  });
}
function TC() {
  wd = !0, Qb(), Kb(), wd = !1;
}
class vh {
  constructor(a, r, s, o, f, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = f, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (wi.add(this), Ad || (Ad = !0, Je.read(Qb), Je.resolveKeyframes(Kb))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: r, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const f = o?.get(), d = a[a.length - 1];
      if (f !== void 0)
        a[0] = f;
      else if (s && r) {
        const h = s.readValue(r, d);
        h != null && (a[0] = h);
      }
      a[0] === void 0 && (a[0] = d), o && f === void 0 && o.set(a[0]);
    }
    mC(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), wi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (wi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const EC = (n) => n.startsWith("--");
function Zb(n, a, r) {
  EC(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const RC = {};
function $b(n, a) {
  const r = /* @__PURE__ */ Eb(n);
  return () => RC[a] ?? r();
}
const MC = /* @__PURE__ */ $b(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Ib = /* @__PURE__ */ $b(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), qr = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, Sv = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ qr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ qr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ qr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ qr([0.33, 1.53, 0.69, 0.99])
};
function Jb(n, a) {
  if (n)
    return typeof n == "function" ? Ib() ? Pb(n, a) : "ease-out" : _b(n) ? qr(n) : Array.isArray(n) ? n.map((r) => Jb(r, a) || Sv.easeOut) : Sv[n];
}
function AC(n, a, r, { delay: s = 0, duration: o = 300, repeat: f = 0, repeatType: d = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const g = {
    [a]: r
  };
  p && (g.offset = p);
  const v = Jb(h, o);
  Array.isArray(v) && (g.easing = v);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: f + 1,
    direction: d === "reverse" ? "alternate" : "normal"
  };
  return m && (S.pseudoElement = m), n.animate(g, S);
}
function Wb(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function CC({ type: n, ...a }) {
  return Wb(n) && Ib() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class eS extends gh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: f, allowFlatten: d = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!f, this.allowFlatten = d, this.options = a, ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = CC(a);
    this.animation = AC(r, s, o, m, f), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !f) {
        const g = yu(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Zb(r, s, g), this.animation.cancel();
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
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ It(a), r && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && MC() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Sn) : o(this);
  }
}
const tS = {
  anticipate: jb,
  backInOut: Db,
  circInOut: zb
};
function wC(n) {
  return n in tS;
}
function DC(n) {
  typeof n.ease == "string" && wC(n.ease) && (n.ease = tS[n.ease]);
}
const $f = 10;
class jC extends eS {
  constructor(a) {
    DC(a), Fb(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const h = new au({
      ...d,
      autoplay: !1
    }), p = Math.max($f, Yt.now() - this.startTime), m = Pn(0, $f, p - $f), g = h.sample(p).value, { name: v } = this.options;
    f && v && Zb(f, v, g), r.setWithVelocity(h.sample(Math.max(0, p - m)).value, g, m), h.stop();
  }
}
const xv = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Nn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function NC(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function zC(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const f = n[n.length - 1], d = xv(o, a), h = xv(f, a);
  return ls(d === h, `You are trying to animate ${a} from "${o}" to "${f}". "${d ? f : o}" is not an animatable value.`, "value-not-animatable"), !d || !h ? !1 : NC(n) || (r === "spring" || Wb(r)) && s;
}
function Dd(n) {
  n.duration = 0, n.type = "keyframes";
}
const nS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), OC = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function _C(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && OC.test(n[a]))
      return !0;
  return !1;
}
const LC = /* @__PURE__ */ new Set([
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
]), VC = /* @__PURE__ */ Eb(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function UC(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: f, type: d, keyframes: h } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: g } = a.owner.getProps();
  return VC() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (nS.has(r) || LC.has(r) && _C(h)) && (r !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && f !== 0 && d !== "inertia";
}
const BC = 40;
class HC extends gh {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: f = 0, repeatType: d = "loop", keyframes: h, name: p, motionValue: m, element: g, ...v }) {
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
      motionValue: m,
      element: g,
      ...v
    }, T = g?.KeyframeResolver || vh;
    this.keyframeResolver = new T(h, (R, w, N) => this.onKeyframesResolved(R, w, S, !N), p, m, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: f, type: d, velocity: h, delay: p, isHandoff: m, onUpdate: g } = s;
    this.resolvedAt = Yt.now();
    let v = !0;
    zC(a, f, d, h) || (v = !1, (Ia.instantAnimations || !p) && g?.(yu(a, s, r)), a[0] = a[a.length - 1], Dd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > BC ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, R = v && !m && UC(T), w = T.motionValue?.owner?.current;
    let N;
    if (R)
      try {
        N = new jC({
          ...T,
          element: w
        });
      } catch {
        N = new au(T);
      }
    else
      N = new au(T);
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
    return this._animation || (this.keyframeResolver?.resume(), TC()), this._animation;
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
function aS(n, a, r, s = 0, o = 1) {
  const f = Array.from(n).sort((m, g) => m.sortNodePosition(g)).indexOf(a), d = n.size, h = (d - 1) * s;
  return typeof r == "function" ? r(f, d) : o === 1 ? f * s : h - f * s;
}
const qC = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function YC(n) {
  const a = qC.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const GC = 4;
function iS(n, a, r = 1) {
  ji(r <= GC, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = YC(n);
  if (!s)
    return;
  const f = window.getComputedStyle(a).getPropertyValue(s);
  if (f) {
    const d = f.trim();
    return Sb(d) ? parseFloat(d) : d;
  }
  return dh(o) ? iS(o, a, r + 1) : o;
}
const kC = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, PC = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), XC = {
  type: "keyframes",
  duration: 0.8
}, FC = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, KC = (n, { keyframes: a }) => a.length > 2 ? XC : Ol.has(n) ? n.startsWith("scale") ? PC(a[1]) : kC : FC;
function lS(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function bh(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? lS(r, n) : r;
}
const QC = /* @__PURE__ */ new Set([
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
function ZC(n) {
  for (const a in n)
    if (!QC.has(a))
      return !0;
  return !1;
}
const Sh = (n, a, r, s = {}, o, f) => (d) => {
  const h = bh(s, n) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ It(p);
  const g = {
    keyframes: Array.isArray(r) ? r : [null, r],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...h,
    delay: -m,
    onUpdate: (S) => {
      a.set(S), h.onUpdate && h.onUpdate(S);
    },
    onComplete: () => {
      d(), h.onComplete && h.onComplete();
    },
    name: n,
    motionValue: a,
    element: f ? void 0 : o
  };
  ZC(h) || Object.assign(g, KC(n, g)), g.duration && (g.duration = /* @__PURE__ */ It(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ It(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (Dd(g), g.delay === 0 && (v = !0)), (Ia.instantAnimations || Ia.skipAnimations || o?.shouldSkipAnimations) && (v = !0, Dd(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !f && a.get() !== void 0) {
    const S = yu(g.keyframes, h);
    if (S !== void 0) {
      Je.update(() => {
        g.onUpdate(S), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new au(g) : new HC(g);
};
function Tv(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function xh(n, a, r, s) {
  if (typeof a == "function") {
    const [o, f] = Tv(s);
    a = a(r !== void 0 ? r : n.custom, o, f);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, f] = Tv(s);
    a = a(r !== void 0 ? r : n.custom, o, f);
  }
  return a;
}
function Di(n, a, r) {
  const s = n.getProps();
  return xh(s, a, r !== void 0 ? r : s.custom, n);
}
const rS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...zl
]), Ev = 30, $C = (n) => !isNaN(parseFloat(n));
class IC {
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
    this.current = a, this.updatedAt = Yt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = $C(this.current));
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
    this.events[a] || (this.events[a] = new uh());
    const s = this.events[a].add(r);
    return a === "change" ? () => {
      s(), Je.read(() => {
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Ev)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, Ev);
    return Rb(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
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
function jl(n, a) {
  return new IC(n, a);
}
const jd = (n) => Array.isArray(n);
function JC(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, jl(r));
}
function WC(n) {
  return jd(n) ? n[n.length - 1] || 0 : n;
}
function ew(n, a) {
  const r = Di(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...f } = r || {};
  f = { ...f, ...s };
  for (const d in f) {
    const h = WC(f[d]);
    JC(n, d, h);
  }
}
const Ot = (n) => !!(n && n.getVelocity);
function tw(n) {
  return !!(Ot(n) && n.add);
}
function Nd(n, a) {
  const r = n.getValue("willChange");
  if (tw(r))
    return r.add(a);
  if (!r && Ia.WillChange) {
    const s = new Ia.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Th(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const nw = "framerAppearId", sS = "data-" + Th(nw);
function oS(n) {
  return n.props[sS];
}
function aw({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function uS(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: f, transitionEnd: d, ...h } = a;
  const p = n.getDefaultTransition();
  f = f ? lS(f, p) : p;
  const m = f?.reduceMotion;
  s && (f = s);
  const g = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in h) {
    const T = n.getValue(S, n.latestValues[S] ?? null), R = h[S];
    if (R === void 0 || v && aw(v, S))
      continue;
    const w = {
      delay: r,
      ...bh(f || {}, S)
    }, N = T.get();
    if (N !== void 0 && !T.isAnimating() && !Array.isArray(R) && R === N && !w.velocity) {
      Je.update(() => T.set(R));
      continue;
    }
    let _ = !1;
    if (window.MotionHandoffAnimation) {
      const K = oS(n);
      if (K) {
        const I = window.MotionHandoffAnimation(K, S, Je);
        I !== null && (w.startTime = I, _ = !0);
      }
    }
    Nd(n, S);
    const q = m ?? n.shouldReduceMotion;
    T.start(Sh(S, T, R, q && rS.has(S) ? { type: !1 } : w, n, _));
    const L = T.animation;
    L && g.push(L);
  }
  if (d) {
    const S = () => Je.update(() => {
      d && ew(n, d);
    });
    g.length ? Promise.all(g).then(S) : S();
  }
  return g;
}
function zd(n, a, r = {}) {
  const s = Di(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const f = s ? () => Promise.all(uS(n, s, r)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: g, staggerDirection: v } = o;
    return iw(n, a, p, m, g, v, r);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [f, d] : [d, f];
    return p().then(() => m());
  } else
    return Promise.all([f(), d(r.delay)]);
}
function iw(n, a, r = 0, s = 0, o = 0, f = 1, d) {
  const h = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", a), h.push(zd(p, a, {
      ...d,
      delay: r + (typeof s == "function" ? 0 : s) + aS(n.variantChildren, p, s, o, f)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function lw(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((f) => zd(n, f, r));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = zd(n, a, r);
  else {
    const o = typeof a == "function" ? Di(n, a, r.custom) : a;
    s = Promise.all(uS(n, o, r));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const rw = {
  test: (n) => n === "auto",
  parse: (n) => n
}, cS = (n) => (a) => a.test(n), fS = [Nl, ye, Gn, Pa, NA, jA, rw], Rv = (n) => fS.find(cS(n));
function sw(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Tb(n) : !0;
}
const ow = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function uw(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(hh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let f = ow.has(a) ? 1 : 0;
  return s !== r && (f *= 100), a + "(" + f + o + ")";
}
const cw = /\b([a-z-]*)\(.*?\)/gu, Od = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = n.match(cw);
    return a ? a.map(uw).join(" ") : n;
  }
}, _d = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = Nn.parse(n);
    return Nn.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Mv = {
  ...Nl,
  transform: Math.round
}, fw = {
  rotate: Pa,
  rotateX: Pa,
  rotateY: Pa,
  rotateZ: Pa,
  scale: Oo,
  scaleX: Oo,
  scaleY: Oo,
  scaleZ: Oo,
  skew: Pa,
  skewX: Pa,
  skewY: Pa,
  distance: ye,
  translateX: ye,
  translateY: ye,
  translateZ: ye,
  x: ye,
  y: ye,
  z: ye,
  perspective: ye,
  transformPerspective: ye,
  opacity: $r,
  originX: fv,
  originY: fv,
  originZ: ye
}, Eh = {
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
  ...fw,
  zIndex: Mv,
  // SVG
  fillOpacity: $r,
  strokeOpacity: $r,
  numOctaves: Mv
}, dw = {
  ...Eh,
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
  filter: Od,
  WebkitFilter: Od,
  mask: _d,
  WebkitMask: _d
}, dS = (n) => dw[n], hw = /* @__PURE__ */ new Set([Od, _d]);
function hS(n, a) {
  let r = dS(n);
  return hw.has(r) || (r = Nn), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const mw = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function pw(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const f = n[s];
    typeof f == "string" && !mw.has(f) && Dl(f).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const f of a)
      n[f] = hS(r, o);
}
class yw extends vh {
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
      if (typeof v == "string" && (v = v.trim(), dh(v))) {
        const S = iS(v, r.current);
        S !== void 0 && (a[g] = S), g === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !rS.has(s) || a.length !== 2)
      return;
    const [o, f] = a, d = Rv(o), h = Rv(f), p = cv(o), m = cv(f);
    if (p !== m && Za[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (bv(d) && bv(h))
        for (let g = 0; g < a.length; g++) {
          const v = a[g];
          typeof v == "string" && (a[g] = parseFloat(v));
        }
      else Za[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || sw(a[o])) && s.push(o);
    s.length && pw(a, s, r);
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
    s[f] = Za[r](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function mS(n, a, r) {
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
const pS = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function Go(n) {
  return xb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Rh } = /* @__PURE__ */ Lb(queueMicrotask, !1), jn = {
  x: !1,
  y: !1
};
function yS() {
  return jn.x || jn.y;
}
function gw(n) {
  return n === "x" || n === "y" ? jn[n] ? null : (jn[n] = !0, () => {
    jn[n] = !1;
  }) : jn.x || jn.y ? null : (jn.x = jn.y = !0, () => {
    jn.x = jn.y = !1;
  });
}
function gS(n, a) {
  const r = mS(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [r, o, () => s.abort()];
}
function vw(n) {
  return !(n.pointerType === "touch" || yS());
}
function bw(n, a, r = {}) {
  const [s, o, f] = gS(n, r);
  return s.forEach((d) => {
    let h = !1, p = !1, m;
    const g = () => {
      d.removeEventListener("pointerleave", R);
    }, v = (N) => {
      m && (m(N), m = void 0), g();
    }, S = (N) => {
      h = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), p && (p = !1, v(N));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, R = (N) => {
      if (N.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        v(N);
      }
    }, w = (N) => {
      if (!vw(N))
        return;
      p = !1;
      const _ = a(d, N);
      typeof _ == "function" && (m = _, d.addEventListener("pointerleave", R, o));
    };
    d.addEventListener("pointerenter", w, o), d.addEventListener("pointerdown", T, o);
  }), f;
}
const vS = (n, a) => a ? n === a ? !0 : vS(n, a.parentElement) : !1, Mh = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, Sw = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function xw(n) {
  return Sw.has(n.tagName) || n.isContentEditable === !0;
}
const Tw = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Ew(n) {
  return Tw.has(n.tagName) || n.isContentEditable === !0;
}
const ko = /* @__PURE__ */ new WeakSet();
function Av(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function If(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Rw = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = Av(() => {
    if (ko.has(r))
      return;
    If(r, "down");
    const o = Av(() => {
      If(r, "up");
    }), f = () => If(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", f, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function Cv(n) {
  return Mh(n) && !yS();
}
const wv = /* @__PURE__ */ new WeakSet();
function Mw(n, a, r = {}) {
  const [s, o, f] = gS(n, r), d = (h) => {
    const p = h.currentTarget;
    if (!Cv(h) || wv.has(h))
      return;
    ko.add(p), r.stopPropagation && wv.add(h);
    const m = a(p, h), g = (T, R) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), ko.has(p) && ko.delete(p), Cv(T) && typeof m == "function" && m(T, { success: R });
    }, v = (T) => {
      g(T, p === window || p === document || r.useGlobalTarget || vS(p, T.target));
    }, S = (T) => {
      g(T, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((h) => {
    (r.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o), Go(h) && (h.addEventListener("focus", (m) => Rw(m, o)), !xw(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), f;
}
function Ah(n) {
  return xb(n) && "ownerSVGElement" in n;
}
const Po = /* @__PURE__ */ new WeakMap();
let Xo;
const bS = (n, a, r) => (s, o) => o && o[0] ? o[0][n + "Size"] : Ah(s) && "getBBox" in s ? s.getBBox()[a] : s[r], Aw = /* @__PURE__ */ bS("inline", "width", "offsetWidth"), Cw = /* @__PURE__ */ bS("block", "height", "offsetHeight");
function ww({ target: n, borderBoxSize: a }) {
  Po.get(n)?.forEach((r) => {
    r(n, {
      get width() {
        return Aw(n, a);
      },
      get height() {
        return Cw(n, a);
      }
    });
  });
}
function Dw(n) {
  n.forEach(ww);
}
function jw() {
  typeof ResizeObserver > "u" || (Xo = new ResizeObserver(Dw));
}
function Nw(n, a) {
  Xo || jw();
  const r = mS(n);
  return r.forEach((s) => {
    let o = Po.get(s);
    o || (o = /* @__PURE__ */ new Set(), Po.set(s, o)), o.add(a), Xo?.observe(s);
  }), () => {
    r.forEach((s) => {
      const o = Po.get(s);
      o?.delete(a), o?.size || Xo?.unobserve(s);
    });
  };
}
const Fo = /* @__PURE__ */ new Set();
let Ml;
function zw() {
  Ml = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Fo.forEach((a) => a(n));
  }, window.addEventListener("resize", Ml);
}
function Ow(n) {
  return Fo.add(n), Ml || zw(), () => {
    Fo.delete(n), !Fo.size && typeof Ml == "function" && (window.removeEventListener("resize", Ml), Ml = void 0);
  };
}
function Dv(n, a) {
  return typeof n == "function" ? Ow(n) : Nw(n, a);
}
function _w(n) {
  return Ah(n) && n.tagName === "svg";
}
const Lw = [...fS, xt, Nn], Vw = (n) => Lw.find(cS(n)), jv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Al = () => ({
  x: jv(),
  y: jv()
}), Nv = () => ({ min: 0, max: 0 }), Rt = () => ({
  x: Nv(),
  y: Nv()
}), Uw = /* @__PURE__ */ new WeakMap();
function gu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Ir(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Ch = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], wh = ["initial", ...Ch];
function vu(n) {
  return gu(n.animate) || wh.some((a) => Ir(n[a]));
}
function SS(n) {
  return !!(vu(n) || n.variants);
}
function Bw(n, a, r) {
  for (const s in a) {
    const o = a[s], f = r[s];
    if (Ot(o))
      n.addValue(s, o);
    else if (Ot(f))
      n.addValue(s, jl(o, { owner: n }));
    else if (f !== o)
      if (n.hasValue(s)) {
        const d = n.getValue(s);
        d.liveStyle === !0 ? d.jump(o) : d.hasAnimated || d.set(o);
      } else {
        const d = n.getStaticValue(s);
        n.addValue(s, jl(d !== void 0 ? d : o, { owner: n }));
      }
  }
  for (const s in r)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const iu = { current: null }, Dh = { current: !1 }, Hw = typeof window < "u";
function xS() {
  if (Dh.current = !0, !!Hw)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => iu.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      iu.current = !1;
}
const zv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let lu = {};
function TS(n) {
  lu = n;
}
function qw() {
  return lu;
}
class Yw {
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
  constructor({ parent: a, props: r, presenceContext: s, reducedMotionConfig: o, skipAnimations: f, blockInitialAnimation: d, visualState: h }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = vh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Yt.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Je.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: g } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = r.initial ? { ...m } : {}, this.renderState = g, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = f, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = vu(r), this.isVariantNode = SS(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const T in S) {
      const R = S[T];
      m[T] !== void 0 && Ot(R) && R.set(m[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, Uw.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Dh.current || xS(), this.shouldReduceMotion = iu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), r.accelerate && nS.has(a) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: h, times: p, ease: m, duration: g } = r.accelerate, v = new eS({
        element: this.current,
        name: a,
        keyframes: h,
        times: p,
        ease: m,
        duration: /* @__PURE__ */ It(g)
      }), S = d(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const s = Ol.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = r.on("change", (d) => {
      this.latestValues[a] = d, this.props.onUpdate && Je.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (a in lu) {
      const r = lu[a];
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
    for (let s = 0; s < zv.length; s++) {
      const o = zv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const f = "on" + o, d = a[f];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    this.prevMotionValues = Bw(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && r !== void 0 && (s = jl(r === null ? void 0 : r, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, r) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Sb(s) || Tb(s)) ? s = parseFloat(s) : !Vw(s) && Nn.test(r) && (s = hS(a, r)), this.setBaseTarget(a, Ot(s) ? s.get() : s)), Ot(s) ? s.get() : s;
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
      const f = xh(this.props, r, this.presenceContext?.custom);
      f && (s = f[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Ot(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new uh()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    Rh.render(this.render);
  }
}
class ES extends Yw {
  constructor() {
    super(...arguments), this.KeyframeResolver = yw;
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
class Wa {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function RS({ top: n, left: a, right: r, bottom: s }) {
  return {
    x: { min: a, max: r },
    y: { min: n, max: s }
  };
}
function Gw({ x: n, y: a }) {
  return { top: a.min, right: n.max, bottom: a.max, left: n.min };
}
function kw(n, a) {
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
function Ld({ scale: n, scaleX: a, scaleY: r }) {
  return !Jf(n) || !Jf(a) || !Jf(r);
}
function Ri(n) {
  return Ld(n) || MS(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function MS(n) {
  return Ov(n.x) || Ov(n.y);
}
function Ov(n) {
  return n && n !== "0%";
}
function ru(n, a, r) {
  const s = n - r, o = a * s;
  return r + o;
}
function _v(n, a, r, s, o) {
  return o !== void 0 && (n = ru(n, o, s)), ru(n, r, s) + a;
}
function Vd(n, a = 0, r = 1, s, o) {
  n.min = _v(n.min, a, r, s, o), n.max = _v(n.max, a, r, s, o);
}
function AS(n, { x: a, y: r }) {
  Vd(n.x, a.translate, a.scale, a.originPoint), Vd(n.y, r.translate, r.scale, r.originPoint);
}
const Lv = 0.999999999999, Vv = 1.0000000000001;
function Pw(n, a, r, s = !1) {
  const o = r.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let f, d;
  for (let h = 0; h < o; h++) {
    f = r[h], d = f.projectionDelta;
    const { visualElement: p } = f.options;
    p && p.props.style && p.props.style.display === "contents" || (s && f.options.layoutScroll && f.scroll && f !== f.root && (Yn(n.x, -f.scroll.offset.x), Yn(n.y, -f.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, AS(n, d)), s && Ri(f.latestValues) && Ko(n, f.latestValues, f.layout?.layoutBox));
  }
  a.x < Vv && a.x > Lv && (a.x = 1), a.y < Vv && a.y > Lv && (a.y = 1);
}
function Yn(n, a) {
  n.min += a, n.max += a;
}
function Uv(n, a, r, s, o = 0.5) {
  const f = at(n.min, n.max, o);
  Vd(n, a, r, f, s);
}
function Bv(n, a) {
  return typeof n == "string" ? parseFloat(n) / 100 * (a.max - a.min) : n;
}
function Ko(n, a, r) {
  const s = r ?? n;
  Uv(n.x, Bv(a.x, s.x), a.scaleX, a.scale, a.originX), Uv(n.y, Bv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function CS(n, a) {
  return RS(kw(n.getBoundingClientRect(), a));
}
function Xw(n, a, r) {
  const s = CS(n, r), { scroll: o } = a;
  return o && (Yn(s.x, o.offset.x), Yn(s.y, o.offset.y)), s;
}
const Fw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Kw = zl.length;
function Qw(n, a, r) {
  let s = "", o = !0;
  for (let f = 0; f < Kw; f++) {
    const d = zl[f], h = n[d];
    if (h === void 0)
      continue;
    let p = !0;
    if (typeof h == "number")
      p = h === (d.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(h);
      p = d.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!p || r) {
      const m = pS(h, Eh[d]);
      if (!p) {
        o = !1;
        const g = Fw[d] || d;
        s += `${g}(${m}) `;
      }
      r && (a[d] = m);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function jh(n, a, r) {
  const { style: s, vars: o, transformOrigin: f } = n;
  let d = !1, h = !1;
  for (const p in a) {
    const m = a[p];
    if (Ol.has(p)) {
      d = !0;
      continue;
    } else if (Ub(p)) {
      o[p] = m;
      continue;
    } else {
      const g = pS(m, Eh[p]);
      p.startsWith("origin") ? (h = !0, f[p] = g) : s[p] = g;
    }
  }
  if (a.transform || (d || r ? s.transform = Qw(a, n.transform, r) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: g = 0 } = f;
    s.transformOrigin = `${p} ${m} ${g}`;
  }
}
function wS(n, { style: a, vars: r }, s, o) {
  const f = n.style;
  let d;
  for (d in a)
    f[d] = a[d];
  o?.applyProjectionStyles(f, s);
  for (d in r)
    f.setProperty(d, r[d]);
}
function Hv(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Lr = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (ye.test(n))
        n = parseFloat(n);
      else
        return n;
    const r = Hv(n, a.target.x), s = Hv(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, Zw = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = Nn.parse(n);
    if (o.length > 5)
      return s;
    const f = Nn.createTransformer(n), d = typeof o[0] != "number" ? 1 : 0, h = r.x.scale * a.x, p = r.y.scale * a.y;
    o[0 + d] /= h, o[1 + d] /= p;
    const m = at(h, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= m), typeof o[3 + d] == "number" && (o[3 + d] /= m), f(o);
  }
}, Ud = {
  borderRadius: {
    ...Lr,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Lr,
  borderTopRightRadius: Lr,
  borderBottomLeftRadius: Lr,
  borderBottomRightRadius: Lr,
  boxShadow: Zw
};
function DS(n, { layout: a, layoutId: r }) {
  return Ol.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!Ud[n] || n === "opacity");
}
function Nh(n, a, r) {
  const s = n.style, o = a?.style, f = {};
  if (!s)
    return f;
  for (const d in s)
    (Ot(s[d]) || o && Ot(o[d]) || DS(d, n) || r?.getValue(d)?.liveStyle !== void 0) && (f[d] = s[d]);
  return f;
}
function $w(n) {
  return window.getComputedStyle(n);
}
class Iw extends ES {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = wS;
  }
  readValueFromInstance(a, r) {
    if (Ol.has(r))
      return this.projection?.isProjecting ? Rd(r) : gC(a, r);
    {
      const s = $w(a), o = (Ub(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return CS(a, r);
  }
  build(a, r, s) {
    jh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return Nh(a, r, s);
  }
}
const Jw = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Ww = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function e2(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const f = o ? Jw : Ww;
  n[f.offset] = `${-s}`, n[f.array] = `${a} ${r}`;
}
const t2 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function jS(n, {
  attrX: a,
  attrY: r,
  attrScale: s,
  pathLength: o,
  pathSpacing: f = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, g) {
  if (jh(n, h, m), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of t2)
    v[T] !== void 0 && (S[T] = v[T], delete v[T]);
  a !== void 0 && (v.x = a), r !== void 0 && (v.y = r), s !== void 0 && (v.scale = s), o !== void 0 && e2(v, o, f, d, !1);
}
const NS = /* @__PURE__ */ new Set([
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
]), zS = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function n2(n, a, r, s) {
  wS(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(NS.has(o) ? o : Th(o), a.attrs[o]);
}
function OS(n, a, r) {
  const s = Nh(n, a, r);
  for (const o in n)
    if (Ot(n[o]) || Ot(a[o])) {
      const f = zl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[f] = n[o];
    }
  return s;
}
class a2 extends ES {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Rt;
  }
  getBaseTargetFromProps(a, r) {
    return a[r];
  }
  readValueFromInstance(a, r) {
    if (Ol.has(r)) {
      const s = dS(r);
      return s && s.default || 0;
    }
    return r = NS.has(r) ? r : Th(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return OS(a, r, s);
  }
  build(a, r, s) {
    jS(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    n2(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = zS(a.tagName), super.mount(a);
  }
}
const i2 = wh.length;
function _S(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? _S(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < i2; r++) {
    const s = wh[r], o = n.props[s];
    (Ir(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function LS(n, a) {
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
const l2 = [...Ch].reverse(), r2 = Ch.length;
function s2(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => lw(n, r, s)));
}
function o2(n) {
  let a = s2(n), r = qv(), s = !0, o = !1;
  const f = (m) => (g, v) => {
    const S = Di(n, v, m === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: T, transitionEnd: R, ...w } = S;
      g = { ...g, ...w, ...R };
    }
    return g;
  };
  function d(m) {
    a = m(n);
  }
  function h(m) {
    const { props: g } = n, v = _S(n.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let R = {}, w = 1 / 0;
    for (let _ = 0; _ < r2; _++) {
      const q = l2[_], L = r[q], K = g[q] !== void 0 ? g[q] : v[q], I = Ir(K), $ = q === m ? L.isActive : null;
      $ === !1 && (w = _);
      let ee = K === v[q] && K !== g[q] && I;
      if (ee && (s || o) && n.manuallyAnimateOnMount && (ee = !1), L.protectedKeys = { ...R }, // If it isn't active and hasn't *just* been set as inactive
      !L.isActive && $ === null || // If we didn't and don't have any defined prop for this animation type
      !K && !L.prevProp || // Or if the prop doesn't define an animation
      gu(K) || typeof K == "boolean")
        continue;
      if (q === "exit" && L.isActive && $ !== !0) {
        L.prevResolvedValues && (R = {
          ...R,
          ...L.prevResolvedValues
        });
        continue;
      }
      const j = u2(L.prevProp, K);
      let W = j || // If we're making this variant active, we want to always make it active
      q === m && L.isActive && !ee && I || // If we removed a higher-priority variant (i is in reverse order)
      _ > w && I, te = !1;
      const P = Array.isArray(K) ? K : [K];
      let k = P.reduce(f(q), {});
      $ === !1 && (k = {});
      const { prevResolvedValues: le = {} } = L, de = {
        ...le,
        ...k
      }, se = (re) => {
        W = !0, T.has(re) && (te = !0, T.delete(re)), L.needsAnimating[re] = !0;
        const fe = n.getValue(re);
        fe && (fe.liveStyle = !1);
      };
      for (const re in de) {
        const fe = k[re], Re = le[re];
        if (R.hasOwnProperty(re))
          continue;
        let C = !1;
        jd(fe) && jd(Re) ? C = !LS(fe, Re) : C = fe !== Re, C ? fe != null ? se(re) : T.add(re) : fe !== void 0 && T.has(re) ? se(re) : L.protectedKeys[re] = !0;
      }
      L.prevProp = K, L.prevResolvedValues = k, L.isActive && (R = { ...R, ...k }), (s || o) && n.blockInitialAnimation && (W = !1);
      const B = ee && j;
      W && (!B || te) && S.push(...P.map((re) => {
        const fe = { type: q };
        if (typeof re == "string" && (s || o) && !B && n.manuallyAnimateOnMount && n.parent) {
          const { parent: Re } = n, C = Di(Re, re);
          if (Re.enteringChildren && C) {
            const { delayChildren: X } = C.transition || {};
            fe.delay = aS(Re.enteringChildren, n, X);
          }
        }
        return {
          animation: re,
          options: fe
        };
      }));
    }
    if (T.size) {
      const _ = {};
      if (typeof g.initial != "boolean") {
        const q = Di(n, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        q && q.transition && (_.transition = q.transition);
      }
      T.forEach((q) => {
        const L = n.getBaseTarget(q), K = n.getValue(q);
        K && (K.liveStyle = !0), _[q] = L ?? null;
      }), S.push({ animation: _ });
    }
    let N = !!S.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !n.manuallyAnimateOnMount && (N = !1), s = !1, o = !1, N ? a(S) : Promise.resolve();
  }
  function p(m, g) {
    if (r[m].isActive === g)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(m, g)), r[m].isActive = g;
    const v = h(m);
    for (const S in r)
      r[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: h,
    setActive: p,
    setAnimateFunction: d,
    getState: () => r,
    reset: () => {
      r = qv(), o = !0;
    }
  };
}
function u2(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !LS(a, n) : !1;
}
function xi(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function qv() {
  return {
    animate: xi(!0),
    whileInView: xi(),
    whileHover: xi(),
    whileTap: xi(),
    whileDrag: xi(),
    whileFocus: xi(),
    exit: xi()
  };
}
function Bd(n, a) {
  n.min = a.min, n.max = a.max;
}
function Dn(n, a) {
  Bd(n.x, a.x), Bd(n.y, a.y);
}
function Yv(n, a) {
  n.translate = a.translate, n.scale = a.scale, n.originPoint = a.originPoint, n.origin = a.origin;
}
const VS = 1e-4, c2 = 1 - VS, f2 = 1 + VS, US = 0.01, d2 = 0 - US, h2 = 0 + US;
function Gt(n) {
  return n.max - n.min;
}
function m2(n, a, r) {
  return Math.abs(n - a) <= r;
}
function Gv(n, a, r, s = 0.5) {
  n.origin = s, n.originPoint = at(a.min, a.max, n.origin), n.scale = Gt(r) / Gt(a), n.translate = at(r.min, r.max, n.origin) - n.originPoint, (n.scale >= c2 && n.scale <= f2 || isNaN(n.scale)) && (n.scale = 1), (n.translate >= d2 && n.translate <= h2 || isNaN(n.translate)) && (n.translate = 0);
}
function Pr(n, a, r, s) {
  Gv(n.x, a.x, r.x, s ? s.originX : void 0), Gv(n.y, a.y, r.y, s ? s.originY : void 0);
}
function kv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = o + a.min, n.max = n.min + Gt(a);
}
function p2(n, a, r, s) {
  kv(n.x, a.x, r.x, s?.x), kv(n.y, a.y, r.y, s?.y);
}
function Pv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = a.min - o, n.max = n.min + Gt(a);
}
function su(n, a, r, s) {
  Pv(n.x, a.x, r.x, s?.x), Pv(n.y, a.y, r.y, s?.y);
}
function Xv(n, a, r, s, o) {
  return n -= a, n = ru(n, 1 / r, s), o !== void 0 && (n = ru(n, 1 / o, s)), n;
}
function y2(n, a = 0, r = 1, s = 0.5, o, f = n, d = n) {
  if (Gn.test(a) && (a = parseFloat(a), a = at(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let h = at(f.min, f.max, s);
  n === f && (h -= a), n.min = Xv(n.min, a, r, h, o), n.max = Xv(n.max, a, r, h, o);
}
function Fv(n, a, [r, s, o], f, d) {
  y2(n, a[r], a[s], a[o], a.scale, f, d);
}
const g2 = ["x", "scaleX", "originX"], v2 = ["y", "scaleY", "originY"];
function Kv(n, a, r, s) {
  Fv(n.x, a, g2, r ? r.x : void 0, s ? s.x : void 0), Fv(n.y, a, v2, r ? r.y : void 0, s ? s.y : void 0);
}
function Qv(n) {
  return n.translate === 0 && n.scale === 1;
}
function BS(n) {
  return Qv(n.x) && Qv(n.y);
}
function Zv(n, a) {
  return n.min === a.min && n.max === a.max;
}
function b2(n, a) {
  return Zv(n.x, a.x) && Zv(n.y, a.y);
}
function $v(n, a) {
  return Math.round(n.min) === Math.round(a.min) && Math.round(n.max) === Math.round(a.max);
}
function HS(n, a) {
  return $v(n.x, a.x) && $v(n.y, a.y);
}
function Iv(n) {
  return Gt(n.x) / Gt(n.y);
}
function Jv(n, a) {
  return n.translate === a.translate && n.scale === a.scale && n.originPoint === a.originPoint;
}
function qn(n) {
  return [n("x"), n("y")];
}
function S2(n, a, r) {
  let s = "";
  const o = n.x.translate / a.x, f = n.y.translate / a.y, d = r?.z || 0;
  if ((o || f || d) && (s = `translate3d(${o}px, ${f}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), r) {
    const { transformPerspective: m, rotate: g, rotateX: v, rotateY: S, skewX: T, skewY: R } = r;
    m && (s = `perspective(${m}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotateX(${v}deg) `), S && (s += `rotateY(${S}deg) `), T && (s += `skewX(${T}deg) `), R && (s += `skewY(${R}deg) `);
  }
  const h = n.x.scale * a.x, p = n.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const qS = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], x2 = qS.length, Wv = (n) => typeof n == "string" ? parseFloat(n) : n, e0 = (n) => typeof n == "number" || ye.test(n);
function T2(n, a, r, s, o, f) {
  o ? (n.opacity = at(0, r.opacity ?? 1, E2(s)), n.opacityExit = at(a.opacity ?? 1, 0, R2(s))) : f && (n.opacity = at(a.opacity ?? 1, r.opacity ?? 1, s));
  for (let d = 0; d < x2; d++) {
    const h = qS[d];
    let p = t0(a, h), m = t0(r, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || e0(p) === e0(m) ? (n[h] = Math.max(at(Wv(p), Wv(m), s), 0), (Gn.test(m) || Gn.test(p)) && (n[h] += "%")) : n[h] = m;
  }
  (a.rotate || r.rotate) && (n.rotate = at(a.rotate || 0, r.rotate || 0, s));
}
function t0(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const E2 = /* @__PURE__ */ YS(0, 0.5, Nb), R2 = /* @__PURE__ */ YS(0.5, 0.95, Sn);
function YS(n, a, r) {
  return (s) => s < n ? 0 : s > a ? 1 : r(/* @__PURE__ */ Zr(n, a, s));
}
function M2(n, a, r) {
  const s = Ot(n) ? n : jl(n);
  return s.start(Sh("", s, a, r)), s.animation;
}
function Jr(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
const A2 = (n, a) => n.depth - a.depth;
class C2 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    oh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    Wo(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(A2), this.isDirty = !1, this.children.forEach(a);
  }
}
function w2(n, a) {
  const r = Yt.now(), s = ({ timestamp: o }) => {
    const f = o - r;
    f >= a && (Ja(s), n(f - a));
  };
  return Je.setup(s, !0), () => Ja(s);
}
function Qo(n) {
  return Ot(n) ? n.get() : n;
}
class D2 {
  constructor() {
    this.members = [];
  }
  add(a) {
    oh(this.members, a);
    for (let r = this.members.length - 1; r >= 0; r--) {
      const s = this.members[r];
      if (s === a || s === this.lead || s === this.prevLead)
        continue;
      const o = s.instance;
      (!o || o.isConnected === !1) && !s.snapshot && (Wo(this.members, s), s.unmount());
    }
    a.scheduleRender();
  }
  remove(a) {
    if (Wo(this.members, a), a === this.prevLead && (this.prevLead = void 0), a === this.lead) {
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
const Zo = {
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
}, Wf = ["", "X", "Y", "Z"], j2 = 1e3;
let N2 = 0;
function ed(n, a, r, s) {
  const { latestValues: o } = a;
  o[n] && (r[n] = o[n], a.setStaticValue(n, 0), s && (s[n] = 0));
}
function GS(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: a } = n.options;
  if (!a)
    return;
  const r = oS(a);
  if (window.MotionHasOptimisedAnimation(r, "transform")) {
    const { layout: o, layoutId: f } = n.options;
    window.MotionCancelOptimisedAnimation(r, "transform", Je, !(o || f));
  }
  const { parent: s } = n;
  s && !s.hasCheckedOptimisedAppear && GS(s);
}
function kS({ attachResizeListener: n, defaultParent: a, measureScroll: r, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, h = a?.()) {
      this.id = N2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(_2), this.nodes.forEach(q2), this.nodes.forEach(Y2), this.nodes.forEach(L2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new C2());
    }
    addEventListener(d, h) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new uh()), this.eventHandlers.get(d).add(h);
    }
    notifyListeners(d, ...h) {
      const p = this.eventHandlers.get(d);
      p && p.notify(...h);
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
      this.isSVG = Ah(d) && !_w(d), this.instance = d;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), n) {
        let g, v = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Je.read(() => {
          v = window.innerWidth;
        }), n(d, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = w2(S, 250), Zo.hasAnimatedSinceResize && (Zo.hasAnimatedSinceResize = !1, this.nodes.forEach(i0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const R = this.options.transition || m.getDefaultTransition() || F2, { onLayoutAnimationStart: w, onLayoutAnimationComplete: N } = m.getProps(), _ = !this.targetLayout || !HS(this.targetLayout, T), q = !v && S;
        if (this.options.layoutRoot || this.resumeFrom || q || v && (_ || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const L = {
            ...bh(R, "layout"),
            onPlay: w,
            onComplete: N
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (L.delay = 0, L.type = !1), this.startAnimation(L), this.setAnimationOrigin(g, q);
        } else
          v || i0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(G2), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && GS(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: h, layout: p } = this.options;
      if (h === void 0 && !p)
        return;
      const m = this.getTransformTemplate();
      this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0, this.updateSnapshot(), d && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const p = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(U2), this.nodes.forEach(n0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(a0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(B2), this.nodes.forEach(H2), this.nodes.forEach(z2), this.nodes.forEach(O2)) : this.nodes.forEach(a0), this.clearAllSnapshots();
      const h = Yt.now();
      zt.delta = Pn(0, 1e3 / 60, h - zt.timestamp), zt.timestamp = h, zt.isProcessing = !0, Xf.update.process(zt), Xf.preRender.process(zt), Xf.render.process(zt), zt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Rh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(V2), this.sharedNodes.forEach(k2);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Je.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Je.postRender(() => {
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
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, d ? d.layoutBox : void 0);
    }
    updateScroll(d = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === d && (h = !1), h && this.instance) {
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
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !BS(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, g = m !== this.prevTransformTemplateValue;
      d && this.instance && (h || Ri(this.latestValues) || g) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return d && (p = this.removeTransform(p)), K2(p), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: p,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: d } = this.options;
      if (!d)
        return Rt();
      const h = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Q2))) {
        const { scroll: m } = this.root;
        m && (Yn(h.x, m.offset.x), Yn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      const h = Rt();
      if (Dn(h, d), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: g, options: v } = m;
        m !== this.root && g && v.layoutScroll && (g.wasRoot && Dn(h, d), Yn(h.x, g.offset.x), Yn(h.y, g.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1, p) {
      const m = p || Rt();
      Dn(m, d);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (Yn(m.x, -v.scroll.offset.x), Yn(m.y, -v.scroll.offset.y)), Ri(v.latestValues) && Ko(m, v.latestValues, v.layout?.layoutBox);
      }
      return Ri(this.latestValues) && Ko(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(d) {
      const h = Rt();
      Dn(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!Ri(m.latestValues))
          continue;
        let g;
        m.instance && (Ld(m.latestValues) && m.updateSnapshot(), g = Rt(), Dn(g, m.measurePageBox())), Kv(h, m.latestValues, m.snapshot?.layoutBox, g);
      }
      return Ri(this.latestValues) && Kv(h, this.latestValues), h;
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
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== h;
      if (!(d || p && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!this.layout || !(g || v))
        return;
      this.resolvedRelativeTargetAt = zt.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Rt(), this.targetWithTransforms = Rt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), p2(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Dn(this.target, this.layout.layoutBox), AS(this.target, this.targetDelta)) : Dn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Ld(this.parent.latestValues) || MS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Rt(), this.relativeTargetOrigin = Rt(), su(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), Dn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(), h = !!this.resumingFrom || this !== d;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === zt.timestamp && (p = !1), p)
        return;
      const { layout: m, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || g))
        return;
      Dn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, S = this.treeScale.y;
      Pw(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = Rt());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Yv(this.prevProjectionDelta.x, this.projectionDelta.x), Yv(this.prevProjectionDelta.y, this.projectionDelta.y)), Pr(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== S || !Jv(this.projectionDelta.x, this.prevProjectionDelta.x) || !Jv(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      if (this.options.visualElement?.scheduleRender(), d) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Al(), this.projectionDelta = Al(), this.projectionDeltaWithTransform = Al();
    }
    setAnimationOrigin(d, h = !1) {
      const p = this.snapshot, m = p ? p.latestValues : {}, g = { ...this.latestValues }, v = Al();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const S = Rt(), T = p ? p.source : void 0, R = this.layout ? this.layout.source : void 0, w = T !== R, N = this.getStack(), _ = !N || N.members.length <= 1, q = !!(w && !_ && this.options.crossfade === !0 && !this.path.some(X2));
      this.animationProgress = 0;
      let L;
      this.mixTargetDelta = (K) => {
        const I = K / 1e3;
        l0(v.x, d.x, I), l0(v.y, d.y, I), this.setTargetDelta(v), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (su(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), P2(this.relativeTarget, this.relativeTargetOrigin, S, I), L && b2(this.relativeTarget, L) && (this.isProjectionDirty = !1), L || (L = Rt()), Dn(L, this.relativeTarget)), w && (this.animationValues = g, T2(g, m, this.latestValues, I, q, _)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = I;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Ja(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Je.update(() => {
        Zo.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = jl(0)), this.motionValue.jump(0, !1), this.currentAnimation = M2(this.motionValue, [0, 1e3], {
          ...d,
          velocity: 0,
          isSync: !0,
          onUpdate: (h) => {
            this.mixTargetDelta(h), d.onUpdate && d.onUpdate(h);
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(j2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: g } = d;
      if (!(!h || !p || !m)) {
        if (this !== d && this.layout && m && PS(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || Rt();
          const v = Gt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + v;
          const S = Gt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        Dn(h, p), Ko(h, g), Pr(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new D2()), this.sharedNodes.get(d).add(h);
      const m = h.options.initialPromotionConfig;
      h.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity: m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(h) : void 0
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
    promote({ needsReset: d, transition: h, preserveFollowOpacity: p } = {}) {
      const m = this.getStack();
      m && m.promote(this, p), d && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d)
        return;
      let h = !1;
      const { latestValues: p } = d;
      if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (h = !0), !h)
        return;
      const m = {};
      p.z && ed("z", d, m, this.animationValues);
      for (let g = 0; g < Wf.length; g++)
        ed(`rotate${Wf[g]}`, d, m, this.animationValues), ed(`skew${Wf[g]}`, d, m, this.animationValues);
      d.render();
      for (const g in m)
        d.setStaticValue(g, m[g]), this.animationValues && (this.animationValues[g] = m[g]);
      d.scheduleRender();
    }
    applyProjectionStyles(d, h) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = Qo(h?.pointerEvents) || "", d.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = Qo(h?.pointerEvents) || ""), this.hasProjected && !Ri(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const g = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = S2(this.projectionDeltaWithTransform, this.treeScale, g);
      p && (v = p(g, v)), d.transform = v;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? d.opacity = m === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : d.opacity = m === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const R in Ud) {
        if (g[R] === void 0)
          continue;
        const { correct: w, applyTo: N, isCSSVariable: _ } = Ud[R], q = v === "none" ? g[R] : w(g[R], m);
        if (N) {
          const L = N.length;
          for (let K = 0; K < L; K++)
            d[N[K]] = q;
        } else
          _ ? this.options.visualElement.renderState.vars[R] = q : d[R] = q;
      }
      this.options.layoutId && (d.pointerEvents = m === this ? Qo(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(n0), this.root.sharedNodes.clear();
    }
  };
}
function z2(n) {
  n.updateLayout();
}
function O2(n) {
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
      Bd(f ? a.measuredBox[g] : a.layoutBox[g], r[g]);
    } else PS(o, a.layoutBox, r) && qn((g) => {
      const v = f ? a.measuredBox[g] : a.layoutBox[g], S = Gt(r[g]);
      v.max = v.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[g].max = n.relativeTarget[g].min + S);
    });
    const d = Al();
    Pr(d, r, a.layoutBox);
    const h = Al();
    f ? Pr(h, n.applyTransform(s, !0), a.measuredBox) : Pr(h, r, a.layoutBox);
    const p = !BS(d);
    let m = !1;
    if (!n.resumeFrom) {
      const g = n.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: S } = g;
        if (v && S) {
          const T = n.options.layoutAnchor || void 0, R = Rt();
          su(R, a.layoutBox, v.layoutBox, T);
          const w = Rt();
          su(w, r, S.layoutBox, T), HS(R, w) || (m = !0), g.options.layoutRoot && (n.relativeTarget = w, n.relativeTargetOrigin = R, n.relativeParent = g);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: r,
      snapshot: a,
      delta: h,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: m
    });
  } else if (n.isLead()) {
    const { onExitComplete: r } = n.options;
    r && r();
  }
  n.options.transition = void 0;
}
function _2(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function L2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function V2(n) {
  n.clearSnapshot();
}
function n0(n) {
  n.clearMeasurements();
}
function U2(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function a0(n) {
  n.isLayoutDirty = !1;
}
function B2(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function H2(n) {
  const { visualElement: a } = n.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function i0(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function q2(n) {
  n.resolveTargetDelta();
}
function Y2(n) {
  n.calcProjection();
}
function G2(n) {
  n.resetSkewAndRotation();
}
function k2(n) {
  n.removeLeadSnapshot();
}
function l0(n, a, r) {
  n.translate = at(a.translate, 0, r), n.scale = at(a.scale, 1, r), n.origin = a.origin, n.originPoint = a.originPoint;
}
function r0(n, a, r, s) {
  n.min = at(a.min, r.min, s), n.max = at(a.max, r.max, s);
}
function P2(n, a, r, s) {
  r0(n.x, a.x, r.x, s), r0(n.y, a.y, r.y, s);
}
function X2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const F2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, s0 = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), o0 = s0("applewebkit/") && !s0("chrome/") ? Math.round : Sn;
function u0(n) {
  n.min = o0(n.min), n.max = o0(n.max);
}
function K2(n) {
  u0(n.x), u0(n.y);
}
function PS(n, a, r) {
  return n === "position" || n === "preserve-aspect" && !m2(Iv(a), Iv(r), 0.2);
}
function Q2(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const Z2 = kS({
  attachResizeListener: (n, a) => Jr(n, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), td = {
  current: void 0
}, XS = kS({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!td.current) {
      const n = new Z2({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), td.current = n;
    }
    return td.current;
  },
  resetTransform: (n, a) => {
    n.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), zh = E.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function c0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function $2(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const f = c0(o, a);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const f = s[o];
          typeof f == "function" ? f() : c0(n[o], null);
        }
      };
  };
}
function I2(...n) {
  return E.useCallback($2(...n), n);
}
class J2 extends E.Component {
  getSnapshotBeforeUpdate(a) {
    const r = this.props.childRef.current;
    if (Go(r) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = r.offsetParent, o = Go(s) && s.offsetWidth || 0, f = Go(s) && s.offsetHeight || 0, d = getComputedStyle(r), h = this.props.sizeRef.current;
      h.height = parseFloat(d.height), h.width = parseFloat(d.width), h.top = r.offsetTop, h.left = r.offsetLeft, h.right = o - h.width - h.left, h.bottom = f - h.height - h.top;
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
function W2({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: f }) {
  const d = E.useId(), h = E.useRef(null), p = E.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = E.useContext(zh), g = n.props?.ref ?? n?.ref, v = I2(h, g);
  return E.useInsertionEffect(() => {
    const { width: S, height: T, top: R, left: w, right: N, bottom: _ } = p.current;
    if (a || f === !1 || !h.current || !S || !T)
      return;
    const q = r === "left" ? `left: ${w}` : `right: ${N}`, L = s === "bottom" ? `bottom: ${_}` : `top: ${R}`;
    h.current.dataset.motionPopId = d;
    const K = document.createElement("style");
    m && (K.nonce = m);
    const I = o ?? document.head;
    return I.appendChild(K), K.sheet && K.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${T}px !important;
            ${q}px !important;
            ${L}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), I.contains(K) && I.removeChild(K);
    };
  }, [a]), b.jsx(J2, { isPresent: a, childRef: h, sizeRef: p, pop: f, children: f === !1 ? n : E.cloneElement(n, { ref: v }) });
}
const eD = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: f, mode: d, anchorX: h, anchorY: p, root: m }) => {
  const g = sh(tD), v = E.useId();
  let S = !0, T = E.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: r,
    custom: o,
    onExitComplete: (R) => {
      g.set(R, !0);
      for (const w of g.values())
        if (!w)
          return;
      s && s();
    },
    register: (R) => (g.set(R, !1), () => g.delete(R))
  }), [r, g, s]);
  return f && S && (T = { ...T }), E.useMemo(() => {
    g.forEach((R, w) => g.set(w, !1));
  }, [r]), E.useEffect(() => {
    !r && !g.size && s && s();
  }, [r]), n = b.jsx(W2, { pop: d === "popLayout", isPresent: r, anchorX: h, anchorY: p, root: m, children: n }), b.jsx(pu.Provider, { value: T, children: n });
};
function tD() {
  return /* @__PURE__ */ new Map();
}
function FS(n = !0) {
  const a = E.useContext(pu);
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
const _o = (n) => n.key || "";
function f0(n) {
  const a = [];
  return E.Children.forEach(n, (r) => {
    E.isValidElement(r) && a.push(r);
  }), a;
}
const nD = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: f = "sync", propagate: d = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [g, v] = FS(d), S = E.useMemo(() => f0(n), [n]), T = d && !g ? [] : S.map(_o), R = E.useRef(!0), w = E.useRef(S), N = sh(() => /* @__PURE__ */ new Map()), _ = E.useRef(/* @__PURE__ */ new Set()), [q, L] = E.useState(S), [K, I] = E.useState(S);
  bb(() => {
    R.current = !1, w.current = S;
    for (let j = 0; j < K.length; j++) {
      const W = _o(K[j]);
      T.includes(W) ? (N.delete(W), _.current.delete(W)) : N.get(W) !== !0 && N.set(W, !1);
    }
  }, [K, T.length, T.join("-")]);
  const $ = [];
  if (S !== q) {
    let j = [...S];
    for (let W = 0; W < K.length; W++) {
      const te = K[W], P = _o(te);
      T.includes(P) || (j.splice(W, 0, te), $.push(te));
    }
    return f === "wait" && $.length && (j = $), I(f0(j)), L(S), null;
  }
  const { forceRender: ee } = E.useContext(rh);
  return b.jsx(b.Fragment, { children: K.map((j) => {
    const W = _o(j), te = d && !g ? !1 : S === K || T.includes(W), P = () => {
      if (_.current.has(W))
        return;
      if (N.has(W))
        _.current.add(W), N.set(W, !0);
      else
        return;
      let k = !0;
      N.forEach((le) => {
        le || (k = !1);
      }), k && (ee?.(), I(w.current), d && v?.(), s && s());
    };
    return b.jsx(eD, { isPresent: te, initial: !R.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: f, root: m, onExitComplete: te ? void 0 : P, anchorX: h, anchorY: p, children: j }, W);
  }) });
}, KS = E.createContext({ strict: !1 }), d0 = {
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
let h0 = !1;
function aD() {
  if (h0)
    return;
  const n = {};
  for (const a in d0)
    n[a] = {
      isEnabled: (r) => d0[a].some((s) => !!r[s])
    };
  TS(n), h0 = !0;
}
function QS() {
  return aD(), qw();
}
function iD(n) {
  const a = QS();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  TS(a);
}
const lD = /* @__PURE__ */ new Set([
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
function ou(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || lD.has(n);
}
let ZS = (n) => !ou(n);
function rD(n) {
  typeof n == "function" && (ZS = (a) => a.startsWith("on") ? !ou(a) : n(a));
}
try {
  rD(require("@emotion/is-prop-valid").default);
} catch {
}
function sD(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ot(n[o]) || (ZS(o) || r === !0 && ou(o) || !a && !ou(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const bu = /* @__PURE__ */ E.createContext({});
function oD(n, a) {
  if (vu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || Ir(r) ? r : void 0,
      animate: Ir(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function uD(n) {
  const { initial: a, animate: r } = oD(n, E.useContext(bu));
  return E.useMemo(() => ({ initial: a, animate: r }), [m0(a), m0(r)]);
}
function m0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Oh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function $S(n, a, r) {
  for (const s in a)
    !Ot(a[s]) && !DS(s, r) && (n[s] = a[s]);
}
function cD({ transformTemplate: n }, a) {
  return E.useMemo(() => {
    const r = Oh();
    return jh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function fD(n, a) {
  const r = n.style || {}, s = {};
  return $S(s, r, n), Object.assign(s, cD(n, a)), s;
}
function dD(n, a) {
  const r = {}, s = fD(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const IS = () => ({
  ...Oh(),
  attrs: {}
});
function hD(n, a, r, s) {
  const o = E.useMemo(() => {
    const f = IS();
    return jS(f, a, zS(s), n.transformTemplate, n.style), {
      ...f.attrs,
      style: { ...f.style }
    };
  }, [a]);
  if (n.style) {
    const f = {};
    $S(f, n.style, n), o.style = { ...f, ...o.style };
  }
  return o;
}
const mD = [
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
function _h(n) {
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
      !!(mD.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function pD(n, a, r, { latestValues: s }, o, f = !1, d) {
  const p = (d ?? _h(n) ? hD : dD)(a, s, o, n), m = sD(a, typeof n == "string", f), g = n !== E.Fragment ? { ...m, ...p, ref: r } : {}, { children: v } = a, S = E.useMemo(() => Ot(v) ? v.get() : v, [v]);
  return E.createElement(n, {
    ...g,
    children: S
  });
}
function yD({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: gD(r, s, o, n),
    renderState: a()
  };
}
function gD(n, a, r, s) {
  const o = {}, f = s(n, {});
  for (const S in f)
    o[S] = Qo(f[S]);
  let { initial: d, animate: h } = n;
  const p = vu(n), m = SS(n);
  a && m && !p && n.inherit !== !1 && (d === void 0 && (d = a.initial), h === void 0 && (h = a.animate));
  let g = r ? r.initial === !1 : !1;
  g = g || d === !1;
  const v = g ? h : d;
  if (v && typeof v != "boolean" && !gu(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let T = 0; T < S.length; T++) {
      const R = xh(n, S[T]);
      if (R) {
        const { transitionEnd: w, transition: N, ..._ } = R;
        for (const q in _) {
          let L = _[q];
          if (Array.isArray(L)) {
            const K = g ? L.length - 1 : 0;
            L = L[K];
          }
          L !== null && (o[q] = L);
        }
        for (const q in w)
          o[q] = w[q];
      }
    }
  }
  return o;
}
const JS = (n) => (a, r) => {
  const s = E.useContext(bu), o = E.useContext(pu), f = () => yD(n, a, s, o);
  return r ? f() : sh(f);
}, vD = /* @__PURE__ */ JS({
  scrapeMotionValuesFromProps: Nh,
  createRenderState: Oh
}), bD = /* @__PURE__ */ JS({
  scrapeMotionValuesFromProps: OS,
  createRenderState: IS
}), SD = Symbol.for("motionComponentSymbol");
function xD(n, a, r) {
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
        const h = d(f);
        typeof h == "function" && (o.current = h);
      } else o.current ? (o.current(), o.current = null) : d(f);
    else d && (d.current = f);
    a && (f ? a.mount(f) : a.unmount());
  }, [a]);
}
const WS = E.createContext({});
function Tl(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function TD(n, a, r, s, o, f) {
  const { visualElement: d } = E.useContext(bu), h = E.useContext(KS), p = E.useContext(pu), m = E.useContext(zh), g = m.reducedMotion, v = m.skipAnimations, S = E.useRef(null), T = E.useRef(!1);
  s = s || h.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: d,
    props: r,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: v,
    isSVG: f
  }), T.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const R = S.current, w = E.useContext(WS);
  R && !R.projection && o && (R.type === "html" || R.type === "svg") && ED(S.current, r, o, w);
  const N = E.useRef(!1);
  E.useInsertionEffect(() => {
    R && N.current && R.update(r, p);
  });
  const _ = r[sS], q = E.useRef(!!_ && typeof window < "u" && !window.MotionHandoffIsComplete?.(_) && window.MotionHasOptimisedAnimation?.(_));
  return bb(() => {
    T.current = !0, R && (N.current = !0, window.MotionIsMounted = !0, R.updateFeatures(), R.scheduleRenderMicrotask(), q.current && R.animationState && R.animationState.animateChanges());
  }), E.useEffect(() => {
    R && (!q.current && R.animationState && R.animationState.animateChanges(), q.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(_);
    }), q.current = !1), R.enteringChildren = void 0);
  }), R;
}
function ED(n, a, r, s) {
  const { layoutId: o, layout: f, drag: d, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: g, layoutCrossfade: v } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : e1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: f,
    alwaysMeasureLayout: !!d || h && Tl(h),
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
    layoutRoot: m,
    layoutAnchor: g
  });
}
function e1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : e1(n.parent);
}
function nd(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && iD(s);
  const f = r ? r === "svg" : _h(n), d = f ? bD : vD;
  function h(m, g) {
    let v;
    const S = {
      ...E.useContext(zh),
      ...m,
      layoutId: RD(m)
    }, { isStatic: T } = S, R = uD(m), w = d(m, T);
    if (!T && typeof window < "u") {
      MD();
      const N = AD(S);
      v = N.MeasureLayout, R.visualElement = TD(n, w, S, o, N.ProjectionNode, f);
    }
    return b.jsxs(bu.Provider, { value: R, children: [v && R.visualElement ? b.jsx(v, { visualElement: R.visualElement, ...S }) : null, pD(n, m, xD(w, R.visualElement, g), w, T, a, f)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = E.forwardRef(h);
  return p[SD] = n, p;
}
function RD({ layoutId: n }) {
  const a = E.useContext(rh).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function MD(n, a) {
  E.useContext(KS).strict;
}
function AD(n) {
  const a = QS(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function CD(n, a) {
  if (typeof Proxy > "u")
    return nd;
  const r = /* @__PURE__ */ new Map(), s = (f, d) => nd(f, d, n, a), o = (f, d) => s(f, d);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (f, d) => d === "create" ? s : (r.has(d) || r.set(d, nd(d, void 0, n, a)), r.get(d))
  });
}
const wD = (n, a) => a.isSVG ?? _h(n) ? new a2(a) : new Iw(a, {
  allowProjection: n !== E.Fragment
});
class DD extends Wa {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = o2(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    gu(a) && (this.unmountControls = a.subscribe(this.node));
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
let jD = 0;
class ND extends Wa {
  constructor() {
    super(...arguments), this.id = jD++, this.isExitComplete = !1;
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
          const h = Di(this.node, f, d);
          if (h) {
            const { transition: p, transitionEnd: m, ...g } = h;
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
const zD = {
  animation: {
    Feature: DD
  },
  exit: {
    Feature: ND
  }
};
function us(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const OD = (n) => (a) => Mh(a) && n(a, us(a));
function Xr(n, a, r, s) {
  return Jr(n, a, OD(r), s);
}
const t1 = ({ current: n }) => n ? n.ownerDocument.defaultView : null, p0 = (n, a) => Math.abs(n - a);
function _D(n, a) {
  const r = p0(n.x, a.x), s = p0(n.y, a.y);
  return Math.sqrt(r ** 2 + s ** 2);
}
const y0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class n1 {
  constructor(a, r, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: f = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Lo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = ad(this.lastMoveEventInfo, this.history), R = this.startEvent !== null, w = _D(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!R && !w)
        return;
      const { point: N } = T, { timestamp: _ } = zt;
      this.history.push({ ...N, timestamp: _ });
      const { onStart: q, onMove: L } = this.handlers;
      R || (q && q(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), L && L(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, R) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = R, this.lastMoveEventInfo = Lo(R, this.transformPagePoint), Je.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, R) => {
      this.end();
      const { onEnd: w, onSessionEnd: N, resumeAnimation: _ } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && _ && _(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const q = ad(T.type === "pointercancel" ? this.lastMoveEventInfo : Lo(R, this.transformPagePoint), this.history);
      this.startEvent && w && w(T, q), N && N(T, q);
    }, !Mh(a))
      return;
    this.dragSnapToOrigin = f, this.handlers = r, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = us(a), m = Lo(p, this.transformPagePoint), { point: g } = m, { timestamp: v } = zt;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: S } = r;
    S && S(a, ad(m, this.history)), this.removeListeners = rs(Xr(this.contextWindow, "pointermove", this.handlePointerMove), Xr(this.contextWindow, "pointerup", this.handlePointerUp), Xr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let r = a.parentElement;
    for (; r; ) {
      const s = getComputedStyle(r);
      (y0.has(s.overflowX) || y0.has(s.overflowY)) && this.scrollPositions.set(r, {
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
    f.x === 0 && f.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += f.x, this.lastMoveEventInfo.point.y += f.y) : this.history.length > 0 && (this.history[0].x -= f.x, this.history[0].y -= f.y), this.scrollPositions.set(a, o), Je.update(this.updatePoint, !0));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Ja(this.updatePoint);
  }
}
function Lo(n, a) {
  return a ? { point: a(n.point) } : n;
}
function g0(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function ad({ point: n }, a) {
  return {
    point: n,
    delta: g0(n, a1(a)),
    offset: g0(n, LD(a)),
    velocity: VD(a, 0.1)
  };
}
function LD(n) {
  return n[0];
}
function a1(n) {
  return n[n.length - 1];
}
function VD(n, a) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let r = n.length - 1, s = null;
  const o = a1(n);
  for (; r >= 0 && (s = n[r], !(o.timestamp - s.timestamp > /* @__PURE__ */ It(a))); )
    r--;
  if (!s)
    return { x: 0, y: 0 };
  s === n[0] && n.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ It(a) * 2 && (s = n[1]);
  const f = /* @__PURE__ */ vn(o.timestamp - s.timestamp);
  if (f === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (o.x - s.x) / f,
    y: (o.y - s.y) / f
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function UD(n, { min: a, max: r }, s) {
  return a !== void 0 && n < a ? n = s ? at(a, n, s.min) : Math.max(n, a) : r !== void 0 && n > r && (n = s ? at(r, n, s.max) : Math.min(n, r)), n;
}
function v0(n, a, r) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: r !== void 0 ? n.max + r - (n.max - n.min) : void 0
  };
}
function BD(n, { top: a, left: r, bottom: s, right: o }) {
  return {
    x: v0(n.x, r, o),
    y: v0(n.y, a, s)
  };
}
function b0(n, a) {
  let r = a.min - n.min, s = a.max - n.max;
  return a.max - a.min < n.max - n.min && ([r, s] = [s, r]), { min: r, max: s };
}
function HD(n, a) {
  return {
    x: b0(n.x, a.x),
    y: b0(n.y, a.y)
  };
}
function qD(n, a) {
  let r = 0.5;
  const s = Gt(n), o = Gt(a);
  return o > s ? r = /* @__PURE__ */ Zr(a.min, a.max - s, n.min) : s > o && (r = /* @__PURE__ */ Zr(n.min, n.max - o, a.min)), Pn(0, 1, r);
}
function YD(n, a) {
  const r = {};
  return a.min !== void 0 && (r.min = a.min - n.min), a.max !== void 0 && (r.max = a.max - n.min), r;
}
const Hd = 0.35;
function GD(n = Hd) {
  return n === !1 ? n = 0 : n === !0 && (n = Hd), {
    x: S0(n, "left", "right"),
    y: S0(n, "top", "bottom")
  };
}
function S0(n, a, r) {
  return {
    min: x0(n, a),
    max: x0(n, r)
  };
}
function x0(n, a) {
  return typeof n == "number" ? n : n[a] || 0;
}
const kD = /* @__PURE__ */ new WeakMap();
class PD {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Rt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: r = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const f = (v) => {
      r && this.snapToCursor(us(v).point), this.stopAnimation();
    }, d = (v, S) => {
      const { drag: T, dragPropagation: R, onDragStart: w } = this.getProps();
      if (T && !R && (this.openDragLock && this.openDragLock(), this.openDragLock = gw(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), qn((_) => {
        let q = this.getAxisMotionValue(_).get() || 0;
        if (Gn.test(q)) {
          const { projection: L } = this.visualElement;
          if (L && L.layout) {
            const K = L.layout.layoutBox[_];
            K && (q = Gt(K) * (parseFloat(q) / 100));
          }
        }
        this.originPoint[_] = q;
      }), w && Je.update(() => w(v, S), !1, !0), Nd(this.visualElement, "transform");
      const { animationState: N } = this.visualElement;
      N && N.setActive("whileDrag", !0);
    }, h = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: R, onDirectionLock: w, onDrag: N } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: _ } = S;
      if (R && this.currentDirection === null) {
        this.currentDirection = FD(_), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, _), this.updateAxis("y", S.point, _), this.visualElement.render(), N && Je.update(() => N(v, S), !1, !0);
    }, p = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S, this.stop(v, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new n1(a, {
      onSessionStart: f,
      onStart: d,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: t1(this.visualElement),
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
    const { onDragEnd: h } = this.getProps();
    h && Je.postRender(() => h(s, o));
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
    if (!s || !Vo(a, o, this.currentDirection))
      return;
    const f = this.getAxisMotionValue(a);
    let d = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (d = UD(d, this.constraints[a], this.elastic[a])), f.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: r } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && Tl(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = BD(s.layoutBox, a) : this.constraints = !1, this.elastic = GD(r), o !== this.constraints && !Tl(a) && s && this.constraints && !this.hasMutatedConstraints && qn((f) => {
      this.constraints !== !1 && this.getAxisMotionValue(f) && (this.constraints[f] = YD(s.layoutBox[f], this.constraints[f]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: r } = this.getProps();
    if (!a || !Tl(a))
      return !1;
    const s = a.current;
    ji(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const f = Xw(s, o.root, this.visualElement.getTransformPagePoint());
    let d = HD(o.layout.layoutBox, f);
    if (r) {
      const h = r(Gw(d));
      this.hasMutatedConstraints = !!h, h && (d = RS(h));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: r, dragMomentum: s, dragElastic: o, dragTransition: f, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = qn((g) => {
      if (!Vo(g, r, this.currentDirection))
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
    return Promise.all(m).then(h);
  }
  startAxisValueAnimation(a, r) {
    const s = this.getAxisMotionValue(a);
    return Nd(this.visualElement, a), s.start(Sh(a, s, 0, r, this.visualElement, !1));
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
      if (!Vo(r, s, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, f = this.getAxisMotionValue(r);
      if (o && o.layout) {
        const { min: d, max: h } = o.layout.layoutBox[r], p = f.get() || 0;
        f.set(a[r] - at(d, h, 0.5) + p);
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
    if (!Tl(r) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    qn((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[d] = qD({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    this.visualElement.current.style.transform = f ? f({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), qn((d) => {
      if (!Vo(d, a, null))
        return;
      const h = this.getAxisMotionValue(d), { min: p, max: m } = this.constraints[d];
      h.set(at(p, m, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    kD.set(this.visualElement, this);
    const a = this.visualElement.current, r = Xr(a, "pointerdown", (m) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), S = m.target, T = S !== a && Ew(S);
      g && v && !T && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      Tl(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = XD(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: f } = this.visualElement, d = f.addEventListener("measure", o);
    f && !f.layout && (f.root && f.root.updateScroll(), f.updateLayout()), Je.read(o);
    const h = Jr(window, "resize", () => this.scalePositionWithinConstraints()), p = f.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: g }) => {
      this.isDragging && g && (qn((v) => {
        const S = this.getAxisMotionValue(v);
        S && (this.originPoint[v] += m[v].translate, S.set(S.get() + m[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), r(), d(), p && p(), s && s();
    };
  }
  getProps() {
    const a = this.visualElement.getProps(), { drag: r = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: f = !1, dragElastic: d = Hd, dragMomentum: h = !0 } = a;
    return {
      ...a,
      drag: r,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: h
    };
  }
}
function T0(n) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    n();
  };
}
function XD(n, a, r) {
  const s = Dv(n, T0(r)), o = Dv(a, T0(r));
  return () => {
    s(), o();
  };
}
function Vo(n, a, r) {
  return (a === !0 || a === n) && (r === null || r === n);
}
function FD(n, a = 10) {
  let r = null;
  return Math.abs(n.y) > a ? r = "y" : Math.abs(n.x) > a && (r = "x"), r;
}
class KD extends Wa {
  constructor(a) {
    super(a), this.removeGroupControls = Sn, this.removeListeners = Sn, this.controls = new PD(a);
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
const id = (n) => (a, r) => {
  n && Je.update(() => n(a, r), !1, !0);
};
class QD extends Wa {
  constructor() {
    super(...arguments), this.removePointerDownListener = Sn;
  }
  onPointerDown(a) {
    this.session = new n1(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: t1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: a, onPanStart: r, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: id(a),
      onStart: id(r),
      onMove: id(s),
      onEnd: (f, d) => {
        delete this.session, o && Je.postRender(() => o(f, d));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Xr(this.node.current, "pointerdown", (a) => this.onPointerDown(a));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let ld = !1;
class ZD extends E.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s, layoutId: o } = this.props, { projection: f } = a;
    f && (r.group && r.group.add(f), s && s.register && o && s.register(f), ld && f.root.didUpdate(), f.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), f.setOptions({
      ...f.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Zo.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(a) {
    const { layoutDependency: r, visualElement: s, drag: o, isPresent: f } = this.props, { projection: d } = s;
    return d && (d.isPresent = f, a.layoutDependency !== r && d.setOptions({
      ...d.options,
      layoutDependency: r
    }), ld = !0, o || a.layoutDependency !== r || r === void 0 || a.isPresent !== f ? d.willUpdate() : this.safeToRemove(), a.isPresent !== f && (f ? d.promote() : d.relegate() || Je.postRender(() => {
      const h = d.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: a, layoutAnchor: r } = this.props, { projection: s } = a;
    s && (s.options.layoutAnchor = r, s.root.didUpdate(), Rh.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s } = this.props, { projection: o } = a;
    ld = !0, o && (o.scheduleCheckAfterUnmount(), r && r.group && r.group.remove(o), s && s.deregister && s.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: a } = this.props;
    a && a();
  }
  render() {
    return null;
  }
}
function i1(n) {
  const [a, r] = FS(), s = E.useContext(rh);
  return b.jsx(ZD, { ...n, layoutGroup: s, switchLayoutGroup: E.useContext(WS), isPresent: a, safeToRemove: r });
}
const $D = {
  pan: {
    Feature: QD
  },
  drag: {
    Feature: KD,
    ProjectionNode: XS,
    MeasureLayout: i1
  }
};
function E0(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, f = s[o];
  f && Je.postRender(() => f(a, us(a)));
}
class ID extends Wa {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = bw(a, (r, s) => (E0(this.node, s, "Start"), (o) => E0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class JD extends Wa {
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
    this.unmount = rs(Jr(this.node.current, "focus", () => this.onFocus()), Jr(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function R0(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), f = s[o];
  f && Je.postRender(() => f(a, us(a)));
}
class WD extends Wa {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = Mw(a, (o, f) => (R0(this.node, f, "Start"), (d, { success: h }) => R0(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const qd = /* @__PURE__ */ new WeakMap(), rd = /* @__PURE__ */ new WeakMap(), ej = (n) => {
  const a = qd.get(n.target);
  a && a(n);
}, tj = (n) => {
  n.forEach(ej);
};
function nj({ root: n, ...a }) {
  const r = n || document;
  rd.has(r) || rd.set(r, {});
  const s = rd.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(tj, { root: n, ...a })), s[o];
}
function aj(n, a, r) {
  const s = nj(a);
  return qd.set(n, r), s.observe(n), () => {
    qd.delete(n), s.unobserve(n);
  };
}
const ij = {
  some: 0,
  all: 1
};
class lj extends Wa {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: f } = a, d = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : ij[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, f && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), S = m ? g : v;
      S && S(p);
    };
    this.stopObserver = aj(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(rj(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function rj({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const sj = {
  inView: {
    Feature: lj
  },
  tap: {
    Feature: WD
  },
  focus: {
    Feature: JD
  },
  hover: {
    Feature: ID
  }
}, oj = {
  layout: {
    ProjectionNode: XS,
    MeasureLayout: i1
  }
}, uj = {
  ...zD,
  ...sj,
  ...$D,
  ...oj
}, Lh = /* @__PURE__ */ CD(uj, wD);
function cj() {
  !Dh.current && xS();
  const [n] = E.useState(iu.current);
  return n;
}
const Vr = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function fj({ vector: n, pulseKey: a, size: r = 220 }) {
  const s = cj(), o = r / 2, f = r / 2, d = r / 2 - 28, h = Vr.length, p = Vr.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h, R = Math.max(0, Math.min(1, n[S] ?? 0));
    return { x: o + Math.cos(T) * d * R, y: f + Math.sin(T) * d * R };
  }), m = Vr.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h;
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
              points: m.map((S) => `${o + (S.x - o) * v},${f + (S.y - f) * v}`).join(" ")
            },
            v
          )),
          m.map((v, S) => /* @__PURE__ */ b.jsx("line", { x1: o, y1: f, x2: v.x, y2: v.y }, S))
        ] }),
        /* @__PURE__ */ b.jsx(
          Lh.polygon,
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
        m.map((v, S) => /* @__PURE__ */ b.jsx(
          "text",
          {
            x: o + Math.cos(v.angle) * (d + 16),
            y: f + Math.sin(v.angle) * (d + 16) + 3,
            textAnchor: "middle",
            fontSize: 10,
            fill: "currentColor",
            opacity: 0.72,
            children: Vr[S]
          },
          Vr[S]
        ))
      ]
    }
  );
}
const dj = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function hj({ vector: n, onChange: a, disabled: r = !1 }) {
  const s = (o, f) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(f) ? f : 0)), h = [...n];
    h[o] = d, a(h);
  };
  return /* @__PURE__ */ b.jsx("div", { className: eA, role: "group", "aria-label": "Emotion axes", children: dj.map((o, f) => /* @__PURE__ */ b.jsxs("div", { className: tA, children: [
    /* @__PURE__ */ b.jsx("label", { htmlFor: `emo-slider-${f}`, className: yb, children: o }),
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
        className: gb
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
        className: vb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const mj = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], l1 = [0, 0, 0, 0, 0, 0, 0, 0], pj = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function yj({ value: n, onChange: a, deploymentId: r }) {
  const s = n.mode ?? "none", o = gj(n.vector), f = n.emotionAlpha ?? 1, [d, h] = E.useState([]), [p, m] = E.useState(null), [g, v] = E.useState(""), [S, T] = E.useState(""), [R, w] = E.useState(0), [N, _] = E.useState(!1), q = E.useRef(!0);
  E.useEffect(() => (q.current = !0, () => {
    q.current = !1;
  }), []), E.useEffect(() => {
    let k = !1;
    return m(null), XM(r).then((le) => {
      k || h(M0(le.presets));
    }).catch((le) => {
      k || m(sd(le));
    }), () => {
      k = !0;
    };
  }, [r]);
  const L = E.useMemo(
    () => d.find((k) => k.presetId === S) ?? null,
    [d, S]
  ), K = (k) => {
    a({ ...n, mode: k });
  }, I = (k) => {
    a({ ...n, mode: "emotion_vector", vector: k }), L && !bj(L.vector, k) && T("");
  }, $ = (k) => {
    const le = Math.max(0, Math.min(1, Number.isFinite(k) ? k : 1));
    a({ ...n, emotionAlpha: le });
  }, ee = (k) => {
    const le = d.find((de) => de.presetId === k);
    le && (T(k), a({ ...n, mode: "emotion_vector", vector: le.vector }), w((de) => de + 1));
  }, j = async () => {
    const k = g.trim();
    if (k) {
      _(!0), m(null);
      try {
        const le = await FM(r, k, o);
        if (!q.current) return;
        h((de) => M0([le, ...de.filter((se) => se.presetId !== le.presetId)])), T(le.presetId), v(""), w((de) => de + 1);
      } catch (le) {
        q.current && m(sd(le));
      } finally {
        q.current && _(!1);
      }
    }
  }, W = async (k) => {
    const le = d;
    h((de) => de.filter((se) => se.presetId !== k)), S === k && T("");
    try {
      await KM(k);
    } catch (de) {
      q.current && (h(le), m(sd(de)));
    }
  }, te = () => I(l1), P = () => {
    const k = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    I(k), w((le) => le + 1);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: QM, children: [
    /* @__PURE__ */ b.jsxs("div", { className: ZM, children: [
      /* @__PURE__ */ b.jsx(fj, { vector: o, pulseKey: R }),
      /* @__PURE__ */ b.jsx("span", { className: Pf, children: Sj(s, L?.presetName) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: $M, children: [
      /* @__PURE__ */ b.jsx("div", { className: IM, role: "radiogroup", "aria-label": "Emotion source", children: mj.map((k) => /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === k.id,
          className: s === k.id ? WM : JM,
          onClick: () => K(k.id),
          children: k.label
        },
        k.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
        /* @__PURE__ */ b.jsxs("div", { className: nA, children: [
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: aA,
              value: S,
              onChange: (k) => ee(k.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— Load preset —" }),
                d.map((k) => /* @__PURE__ */ b.jsx("option", { value: k.presetId, children: k.presetName }, k.presetId))
              ]
            }
          ),
          S && /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: lA,
              onClick: () => void W(S),
              disabled: N,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: rv, onClick: te, children: "Reset" }),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: rv, onClick: P, children: "Random" })
        ] }),
        /* @__PURE__ */ b.jsx(hj, { vector: o, onChange: I }),
        /* @__PURE__ */ b.jsxs(
          "form",
          {
            className: oA,
            onSubmit: (k) => {
              k.preventDefault(), j();
            },
            children: [
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  type: "text",
                  className: uA,
                  value: g,
                  placeholder: "Name current vector",
                  onChange: (k) => v(k.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ b.jsx(
                "button",
                {
                  type: "submit",
                  className: iA,
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
            className: sA,
            value: n.qwenTemplate ?? "",
            onChange: (k) => a({ ...n, mode: "qwen_template", qwenTemplate: k.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ b.jsx("p", { className: Pf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ b.jsxs("div", { className: rA, children: [
        /* @__PURE__ */ b.jsx("span", { className: yb, children: "alpha" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: f,
            className: gb,
            onChange: (k) => $(Number(k.currentTarget.value)),
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
            className: vb,
            onChange: (k) => $(Number(k.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ b.jsx("p", { className: cA, children: p }),
      /* @__PURE__ */ b.jsx("pre", { className: fA, children: pj })
    ] })
  ] });
}
function gj(n) {
  return !n || n.length !== 8 ? [...l1] : n.map((a) => vj(a));
}
function vj(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function bj(n, a) {
  for (let r = 0; r < 8; r += 1) {
    const s = n[r] ?? 0, o = a[r] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function M0(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function Sj(n, a) {
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
function sd(n) {
  return n instanceof Oi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
const od = [
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
function xj({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: f,
  generation: d,
  onGenerationChange: h
}) {
  const p = (g, v) => {
    h({ ...d, [g]: v });
  }, m = od.find((g) => g.id === o) ?? od[0];
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
          od.map((g) => /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o === g.id,
              className: o === g.id ? Jo : $a,
              onClick: () => f(g.id),
              title: g.help,
              children: g.label
            },
            g.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ b.jsx("p", { className: $t, "aria-live": "polite", children: m.help }),
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
const Tj = ["cancelled", "failed", "partial"];
function Ej({ runs: n, deploymentId: a }) {
  const r = zi(), [s, o] = E.useState(null), [f, d] = E.useState(null);
  if (n.length === 0)
    return /* @__PURE__ */ b.jsx("p", { className: $t, children: "No runs yet." });
  const h = async (p) => {
    o(p), d(null);
    try {
      const { runId: m } = await ah(a, p);
      r(`/${a}/runs/${m}`);
    } catch (m) {
      d(Mj(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    f && /* @__PURE__ */ b.jsx("p", { className: Qr, children: f }),
    /* @__PURE__ */ b.jsx("ul", { className: gd, children: n.map((p) => {
      const m = Tj.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ b.jsxs("li", { children: [
        /* @__PURE__ */ b.jsxs(is, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        m && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          " ",
          /* @__PURE__ */ b.jsx("span", { className: Rj(p.status), children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: $a,
              disabled: s === p.runId,
              onClick: () => void h(p.runId),
              children: s === p.runId ? "Resuming…" : "Resume"
            }
          )
        ] })
      ] }, p.runId);
    }) })
  ] });
}
function Rj(n) {
  return n === "failed" ? lh : ih;
}
function Mj(n) {
  return n instanceof Oi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function Aj(n) {
  const a = zi(), [r, s] = E.useState("idle"), [o, f] = E.useState(null), [d, h] = E.useState(/* @__PURE__ */ new Map()), [p, m] = E.useState(null), [g, v] = E.useState(null), S = E.useRef(null);
  E.useEffect(() => () => {
    S.current?.();
  }, []);
  const T = E.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), v(null);
    try {
      const $ = await tM(n.deploymentId, n.createPayload);
      f($.runId), s("running"), S.current?.(), S.current = lv(
        n.deploymentId,
        $.runId,
        (ee) => A0(ee, h, s, v, n.deploymentId, $.runId),
        () => s("error")
      );
    } catch ($) {
      s("error"), m(ud($));
    }
  }, [n.deploymentId, n.createPayload]), R = E.useCallback(async () => {
    if (o)
      try {
        await nM(n.deploymentId, o);
      } catch ($) {
        m(ud($));
      }
  }, [n.deploymentId, o]), w = Array.from(d.values()).sort(($, ee) => $.globalIndex - ee.globalIndex), N = r === "starting" || r === "running", _ = g?.status === "partial", q = w.filter(($) => $.status === "failed"), L = (() => {
    if (r !== "terminal" || q.length === 0) return null;
    const $ = /* @__PURE__ */ new Map();
    for (const te of q) {
      const P = te.failureCategory ?? "unknown";
      $.set(P, ($.get(P) ?? 0) + 1);
    }
    let ee = "unknown", j = 0;
    for (const [te, P] of $)
      P > j && (ee = te, j = P);
    const W = w.length;
    return { category: ee, count: j, total: W };
  })(), K = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, I = p?.toLowerCase().includes("unmapped") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { children: [
    p && /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: Qr,
        role: "alert",
        "aria-live": "assertive",
        style: {
          marginBottom: 12,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: "0.95rem",
          lineHeight: 1.45
        },
        children: [
          /* @__PURE__ */ b.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ b.jsx("span", { children: p }),
          I && /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: $a,
              onClick: () => a(`/${n.deploymentId}/mappings`),
              style: { alignSelf: "flex-start" },
              children: "Open Mappings →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ b.jsxs("div", { className: Xa, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Jo,
          disabled: !n.canGenerate || N,
          onClick: T,
          children: r === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: db,
          disabled: !N,
          onClick: R,
          children: "Cancel"
        }
      )
    ] }),
    L && /* @__PURE__ */ b.jsxs("div", { className: Qr, role: "alert", children: [
      /* @__PURE__ */ b.jsxs("strong", { children: [
        "Run failed — ",
        L.count,
        " of ",
        L.total,
        " segments failed with ",
        /* @__PURE__ */ b.jsx("code", { children: L.category })
      ] }),
      K[L.category] && /* @__PURE__ */ b.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: K[L.category] })
    ] }),
    g?.exportArtifactRef && /* @__PURE__ */ b.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${g.exportArtifactRef}/download`,
        download: !0,
        className: $a,
        children: "Download ZIP"
      }
    ),
    _ && g && /* @__PURE__ */ b.jsxs("div", { className: hb, style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ b.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: $a,
          onClick: async () => {
            try {
              const $ = await ah(n.deploymentId, g.runId);
              f($.runId), h(/* @__PURE__ */ new Map()), v(null), s("running"), S.current?.(), S.current = lv(
                n.deploymentId,
                $.runId,
                (ee) => A0(ee, h, s, v, n.deploymentId, $.runId),
                () => s("error")
              );
            } catch ($) {
              m(ud($)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    w.length > 0 && /* @__PURE__ */ b.jsxs("table", { className: HM, children: [
      /* @__PURE__ */ b.jsx("thead", { children: /* @__PURE__ */ b.jsxs("tr", { children: [
        /* @__PURE__ */ b.jsx("th", { className: ka, children: "#" }),
        /* @__PURE__ */ b.jsx("th", { className: ka, children: "Status" }),
        /* @__PURE__ */ b.jsx("th", { className: ka, children: "Duration" }),
        /* @__PURE__ */ b.jsx("th", { className: ka, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ b.jsx("tbody", { children: w.map(($) => /* @__PURE__ */ b.jsxs("tr", { className: qM, children: [
        /* @__PURE__ */ b.jsx("td", { className: ka, children: $.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ b.jsx("td", { className: ka, children: /* @__PURE__ */ b.jsx("span", { className: Cj($.status), children: $.status }) }),
        /* @__PURE__ */ b.jsx("td", { className: ka, children: $.durationMs ? `${$.durationMs} ms` : "—" }),
        /* @__PURE__ */ b.jsx("td", { className: ka, children: $.failureCategory ?? "" })
      ] }, $.globalIndex)) })
    ] })
  ] });
}
async function A0(n, a, r, s, o, f) {
  switch (n.type) {
    case "segment_started":
      a((d) => {
        const h = new Map(d);
        return h.set(n.globalIndex, { globalIndex: n.globalIndex, status: "running" }), h;
      });
      return;
    case "segment_completed":
      a((d) => {
        const h = new Map(d);
        return h.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "completed",
          durationMs: n.durationMs
        }), h;
      });
      return;
    case "segment_failed":
      a((d) => {
        const h = new Map(d);
        return h.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "failed",
          failureCategory: n.failureCategory
        }), h;
      });
      return;
    case "run_terminal":
      r("terminal");
      try {
        const d = await fb(o, f);
        s(d);
      } catch {
      }
      return;
  }
}
function Cj(n) {
  switch (n) {
    case "completed":
      return pb;
    case "running":
      return ih;
    case "failed":
      return lh;
    default:
      return mb;
  }
}
function ud(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
function wj(n) {
  const a = zi(), { attributions: r, unresolved: s, predictedFilenames: o } = E.useMemo(
    () => Dj(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  );
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: BM,
        value: n.value,
        onChange: (f) => n.onChange(f.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ b.jsxs("div", { className: Qr, role: "alert", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      s.map((f) => /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: $a,
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
      /* @__PURE__ */ b.jsx("ul", { className: gd, children: r.map((f) => /* @__PURE__ */ b.jsxs("li", { children: [
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
      /* @__PURE__ */ b.jsx("ul", { className: gd, children: o.map((f) => /* @__PURE__ */ b.jsx("li", { children: f }, f)) })
    ] })
  ] });
}
function Dj(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], f = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), h = [], p = n.split(/\r?\n/);
  let m = 0;
  return p.forEach((g, v) => {
    const S = g.trim();
    if (!S) return;
    const T = v + 1, R = S.match(s);
    let w = "Narrator", N = S;
    if (R && R.groups) {
      const K = (R.groups.body ?? "").trim(), I = (R.groups.rest ?? "").trim();
      w = ((K.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", N = I;
    }
    m += 1;
    const _ = w.toLowerCase(), q = (d.get(_) ?? 0) + 1;
    d.set(_, q);
    const L = w === "Narrator" || r.has(_);
    L || f.add(w), o.push({ lineNumber: T, character: w, text: N, hasMapping: L }), h.push(
      `${m.toString().padStart(3, "0")}_${jj(w)}_${q.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(f),
    predictedFilenames: h
  };
}
function jj(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function Nj(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [];
  return /* @__PURE__ */ b.jsxs("div", { className: OM, children: [
    /* @__PURE__ */ b.jsxs("header", { className: VM, children: [
      /* @__PURE__ */ b.jsx("h1", { className: UM, children: n.deployment.displayName }),
      n.header
    ] }),
    a && /* @__PURE__ */ b.jsxs("section", { className: hb, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ b.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: _M, children: [
      /* @__PURE__ */ b.jsxs("section", { className: zr, "aria-label": "Dialogue script", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Or, children: "Script" }),
        n.scriptEditor
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: zr, "aria-label": "Generation settings", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Or, children: "Settings" }),
        n.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: LM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: zr, "aria-label": "Run", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Or, children: "Run" }),
        n.runPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: zr, "aria-label": "Emotion panel", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Or, children: "Emotion" }),
        n.emotionPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: zr, "aria-label": "Recent runs", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Or, children: "Recent runs" }),
        n.historyPanel
      ] })
    ] })
  ] });
}
function zj() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = as(), [o, f] = E.useState(""), [d, h] = E.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [p, m] = E.useState(n.defaultSpeedFactor ?? 1), [g, v] = E.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, T] = E.useState({}), [R, w] = E.useState("use_cache"), N = E.useMemo(
    () => ({
      script: o,
      outputFormat: d,
      speedFactor: p,
      globalEmotion: g,
      generation: S,
      cachePolicy: R
    }),
    [o, d, p, g, S, R]
  ), _ = E.useMemo(() => {
    const q = /* @__PURE__ */ new Map();
    for (const L of a)
      q.set(L.characterName.toLowerCase(), L);
    return q;
  }, [a]);
  return /* @__PURE__ */ b.jsx(
    Nj,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ b.jsx(GM, { deployment: n }),
      scriptEditor: /* @__PURE__ */ b.jsx(
        wj,
        {
          value: o,
          onChange: f,
          outputFormat: d,
          mappings: _,
          deploymentId: n.deploymentId
        }
      ),
      emotionPanel: /* @__PURE__ */ b.jsx(
        yj,
        {
          value: g,
          onChange: v,
          deploymentId: n.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ b.jsx(
        xj,
        {
          outputFormat: d,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: R,
          onCachePolicyChange: w,
          generation: S,
          onGenerationChange: T
        }
      ),
      runPanel: /* @__PURE__ */ b.jsx(
        Aj,
        {
          deploymentId: n.deploymentId,
          createPayload: N,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ b.jsx(Ej, { runs: r, deploymentId: n.deploymentId })
    }
  );
}
var Oj = "jq2zyb3", _j = "jq2zyb4", Lj = "jq2zyb5", Vj = "jq2zyb6", Uj = "jq2zyb7", Bj = "jq2zyb8", Hj = "jq2zyb9", qj = "jq2zyba", Yj = "jq2zybb", Gj = { queued: "jq2zybd jq2zybc", running: "jq2zybe jq2zybc", completed: "jq2zybf jq2zybc", failed: "jq2zybg jq2zybc", cancelled: "jq2zybh jq2zybc", partial: "jq2zybi jq2zybc" }, kj = "jq2zybj", Pj = "jq2zybk", Xj = "jq2zybl", Fj = "jq2zybm", Kj = "jq2zybn jq2zybm", Qj = "jq2zybo", Zj = "jq2zybp", $j = "jq2zybq", Ij = "jq2zybr", Jj = "jq2zybs", Wj = "jq2zybt", eN = "jq2zybu", tN = "jq2zybv", nN = "jq2zybw", aN = "jq2zybx", iN = "jq2zyby", lN = "jq2zybz", rN = "jq2zyb10", sN = "jq2zyb11", oN = "jq2zyb12", uN = "jq2zyb13", cN = "jq2zyb14", fN = "jq2zyb15", dN = "jq2zyb16", hN = { queued: "jq2zyb18 jq2zyb17", running: "jq2zyb19 jq2zyb17", completed: "jq2zyb1a jq2zyb17", failed: "jq2zyb1b jq2zyb17", cancelled: "jq2zyb1c jq2zyb17" }, mN = "jq2zyb1d", pN = "jq2zyb1e", yN = "jq2zyb1f";
const gN = ["cancelled", "failed", "partial"];
function vN() {
  const { run: n } = as(), a = zi(), [r, s] = E.useState(!1), [o, f] = E.useState(null), d = E.useMemo(() => bN(n), [n]), h = gN.includes(n.status) && n.kind === "batch", p = async () => {
    if (n.deploymentId) {
      s(!0), f(null);
      try {
        const { runId: m } = await ah(n.deploymentId, n.runId);
        a(`/${n.deploymentId}/runs/${m}`);
      } catch (m) {
        f(TN(m));
      } finally {
        s(!1);
      }
    }
  };
  return /* @__PURE__ */ b.jsx("main", { className: Oj, children: /* @__PURE__ */ b.jsxs("div", { className: _j, children: [
    /* @__PURE__ */ b.jsxs("header", { className: Lj, children: [
      /* @__PURE__ */ b.jsxs("p", { className: Vj, children: [
        n.deploymentId ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx(is, { to: `/${n.deploymentId}/recipe`, className: Uj, children: "← Back to recipe" }),
          /* @__PURE__ */ b.jsx("span", { className: Bj, children: "·" })
        ] }) : null,
        /* @__PURE__ */ b.jsx("span", { children: "Run detail" })
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: Hj, children: [
        /* @__PURE__ */ b.jsxs("h1", { className: qj, children: [
          SN(n.kind),
          /* @__PURE__ */ b.jsx("span", { className: Yj, children: n.runId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: Gj[n.status], children: n.status })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: kj, "aria-label": "Run statistics", children: [
      /* @__PURE__ */ b.jsx(Uo, { label: "Format", value: n.outputFormat.toUpperCase(), mono: !0 }),
      /* @__PURE__ */ b.jsx(Uo, { label: "Speed", value: `${n.speedFactor.toFixed(2)}×`, mono: !0 }),
      /* @__PURE__ */ b.jsx(
        Uo,
        {
          label: "Completed",
          value: `${d.completed} / ${d.total}`,
          progress: d.total > 0 ? d.completed / d.total : 0
        }
      ),
      /* @__PURE__ */ b.jsx(
        Uo,
        {
          label: "Cache hit",
          value: `${d.cacheRatio}%`,
          progress: d.cacheRatio / 100
        }
      )
    ] }),
    h && /* @__PURE__ */ b.jsxs("section", { className: Zj, "aria-label": "Resume run", children: [
      /* @__PURE__ */ b.jsxs("div", { className: $j, children: [
        /* @__PURE__ */ b.jsx("p", { className: Ij, children: d.failed > 0 ? `${d.failed} line${d.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
        /* @__PURE__ */ b.jsx("p", { className: Jj, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Wj,
          disabled: r,
          onClick: () => void p(),
          children: r ? "Resuming…" : d.failed > 0 ? "Rerun failed lines" : "Resume run"
        }
      ),
      o && /* @__PURE__ */ b.jsx("p", { className: eN, role: "alert", children: o })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: tN, "aria-label": "Utterances", children: [
      /* @__PURE__ */ b.jsxs("div", { className: nN, children: [
        /* @__PURE__ */ b.jsx("h2", { className: aN, children: "Utterances" }),
        d.completed > 0 && /* @__PURE__ */ b.jsxs("span", { className: iN, children: [
          /* @__PURE__ */ b.jsx("span", { className: lN, children: d.cached }),
          "/",
          d.completed,
          " from cache"
        ] })
      ] }),
      /* @__PURE__ */ b.jsx("ul", { className: rN, children: n.utterances.map((m) => /* @__PURE__ */ b.jsxs("li", { className: sN, children: [
        /* @__PURE__ */ b.jsxs("span", { className: oN, children: [
          "#",
          m.globalIndex.toString().padStart(3, "0")
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: uN, title: m.characterDisplay, children: m.characterDisplay }),
        /* @__PURE__ */ b.jsx("span", { className: cN, title: m.text, children: m.text }),
        /* @__PURE__ */ b.jsxs("span", { className: fN, children: [
          m.cacheHit && /* @__PURE__ */ b.jsx("span", { className: dN, children: "cached" }),
          m.durationMs ? /* @__PURE__ */ b.jsx("span", { children: xN(m.durationMs) }) : null,
          /* @__PURE__ */ b.jsx("span", { className: hN[m.status], children: m.status })
        ] })
      ] }, m.utteranceId)) })
    ] }),
    n.exportArtifactRef && /* @__PURE__ */ b.jsx("div", { className: mN, children: /* @__PURE__ */ b.jsxs(
      "a",
      {
        href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
        download: !0,
        className: pN,
        children: [
          "Download ZIP ",
          /* @__PURE__ */ b.jsx("span", { className: yN, children: "↓" })
        ]
      }
    ) })
  ] }) });
}
function Uo({ label: n, value: a, mono: r, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: Pj,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ b.jsx("span", { className: Xj, children: n }),
        /* @__PURE__ */ b.jsx("span", { className: r ? Kj : Fj, children: a }),
        o !== void 0 && /* @__PURE__ */ b.jsx("span", { className: Qj, "aria-hidden": "true" })
      ]
    }
  );
}
function bN(n) {
  const a = n.utterances.length, r = n.utterances.filter((d) => d.status === "completed").length, s = n.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = n.utterances.filter((d) => d.cacheHit).length, f = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: f };
}
function SN(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function xN(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function TN(n) {
  return n instanceof Oi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
var EN = "pcphqj2", RN = "pcphqj3", MN = "pcphqj4", AN = "pcphqj5", CN = "pcphqj6", wN = "pcphqj7", DN = "pcphqj8", jN = "pcphqj9", C0 = "pcphqja", NN = "pcphqjb", w0 = "pcphqjc", zN = "pcphqjd", ON = "pcphqje", _N = "pcphqjf pcphqje", LN = "pcphqjg", VN = "pcphqjh", UN = "pcphqji", BN = "pcphqjj", HN = "pcphqjk pcphqjj", qN = "pcphqjl pcphqjj", YN = "pcphqjm pcphqjj", GN = "pcphqjn", cd = "pcphqjo", fd = "pcphqjp", kN = "pcphqjq", PN = "pcphqjr", XN = "pcphqjs", FN = "pcphqjt", KN = "pcphqju";
function QN() {
  const [n, a] = E.useState(null), [r, s] = E.useState(null);
  return E.useEffect(() => {
    let o = !1;
    const f = async () => {
      try {
        const h = await rt("/runtime/queue");
        o || (a(h.entries), s(null));
      } catch (h) {
        o || s(h instanceof Error ? h.message : "Unknown error");
      }
    };
    f();
    const d = setInterval(() => void f(), 3e3);
    return () => {
      o = !0, clearInterval(d);
    };
  }, []), /* @__PURE__ */ b.jsx("main", { className: EN, children: /* @__PURE__ */ b.jsxs("div", { className: RN, children: [
    /* @__PURE__ */ b.jsxs("header", { className: MN, children: [
      /* @__PURE__ */ b.jsx("p", { className: AN, children: "Runtime" }),
      /* @__PURE__ */ b.jsxs("div", { className: CN, children: [
        /* @__PURE__ */ b.jsx("h1", { className: wN, children: "Queue" }),
        /* @__PURE__ */ b.jsx("span", { className: DN, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: jN, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ b.jsx("section", { className: KN, role: "alert", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ b.jsx("section", { className: C0, children: /* @__PURE__ */ b.jsxs("div", { className: kN, children: [
      /* @__PURE__ */ b.jsx("span", { className: PN, children: "○" }),
      /* @__PURE__ */ b.jsx("p", { className: XN, children: "Queue is quiet" }),
      /* @__PURE__ */ b.jsx("p", { className: FN, children: "No runs are pending. Start a synthesis from a deployment's recipe surface." })
    ] }) }) : /* @__PURE__ */ b.jsx("section", { className: C0, "aria-label": "Queued runs", children: /* @__PURE__ */ b.jsx("ul", { className: NN, children: n.map((o) => {
      const f = o.position === 1;
      return /* @__PURE__ */ b.jsxs(
        "li",
        {
          className: f ? `${w0} ${zN}` : w0,
          children: [
            /* @__PURE__ */ b.jsx("span", { className: f ? _N : ON, children: o.position }),
            /* @__PURE__ */ b.jsxs("span", { className: LN, children: [
              /* @__PURE__ */ b.jsx("span", { className: VN, children: o.deploymentName ?? o.deploymentId }),
              /* @__PURE__ */ b.jsx("span", { className: UN, children: o.runId })
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: ZN(o.kind), children: $N(o.kind) }),
            /* @__PURE__ */ b.jsx("span", { className: GN, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: cd, children: IN(o.etaSeconds) }),
              /* @__PURE__ */ b.jsx("span", { className: fd, children: "eta" })
            ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: cd, children: o.utteranceTotal }),
              /* @__PURE__ */ b.jsx("span", { className: fd, children: "lines" })
            ] }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: cd, children: "—" }),
              /* @__PURE__ */ b.jsx("span", { className: fd, children: "pending" })
            ] }) })
          ]
        },
        o.runId
      );
    }) }) })
  ] }) });
}
function ZN(n) {
  switch (n) {
    case "batch":
      return HN;
    case "test_line":
      return qN;
    case "resume":
      return YN;
    default:
      return BN;
  }
}
function $N(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function IN(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function JN() {
  const { deploymentId: n, prefillCharacterName: a } = as(), r = zi(), [s, o] = E.useState(a), [f, d] = E.useState(""), [h, p] = E.useState("none"), [m, g] = E.useState(!1), [v, S] = E.useState(null), T = E.useRef(null);
  E.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const R = async (w) => {
    w.preventDefault(), g(!0), S(null);
    try {
      await cb(n, {
        characterName: s,
        speakerVoiceAssetId: f,
        defaultEmotionMode: h
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
            onChange: (w) => o(w.currentTarget.value),
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
            onChange: (w) => d(w.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ b.jsxs("select", { value: h, onChange: (w) => p(w.currentTarget.value), children: [
          /* @__PURE__ */ b.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ b.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ b.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ b.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ b.jsx("button", { type: "submit", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ b.jsx("p", { role: "alert", children: v })
    ] })
  ] });
}
var WN = "go9vi12", ez = "go9vi13", tz = "go9vi14", nz = "go9vi15", az = "go9vi16", iz = "go9vi17", lz = "go9vi18", rz = "go9vi19", sz = "go9vi1a go9vi19", oz = "go9vi1b", uz = "go9vi1c", cz = "go9vi1d", fz = "go9vi1e", dz = "go9vi1f", hz = "go9vi1g", mz = "go9vi1h", pz = "go9vi1i", yz = "go9vi1j", gz = "go9vi1k", uu = "go9vi1l", Ti = "go9vi1m", Ur = "go9vi1n", Cl = "go9vi1o", vz = "go9vi1p go9vi1o", bz = "go9vi1q", Sz = "go9vi1r go9vi1q", xz = "go9vi1s go9vi1q", Tz = "go9vi1t", Ez = "go9vi1u", Rz = "go9vi1v", Mz = "go9vi1w", Az = "go9vi1x", Cz = "go9vi1y", r1 = "go9vi1z", s1 = "go9vi110", D0 = "go9vi111 go9vi110", wz = "go9vi112 go9vi110", Dz = "go9vi113", jz = "go9vi114", Nz = "go9vi115", zz = "go9vi116 go9vi1o", Oz = "go9vi117", _z = "go9vi118";
const Lz = ["none", "audio_ref", "vector_preset", "qwen_template"];
function Vz() {
  const { deployment: n, mappings: a, voiceAssets: r } = as(), [s, o] = E.useState(a), [f, d] = E.useState(r), [h, p] = E.useState(
    a[0]?.mappingId ?? null
  ), [m, g] = E.useState(""), [v, S] = E.useState(null), [T, R] = E.useState(null), w = E.useMemo(() => {
    const P = /* @__PURE__ */ new Map();
    for (const k of f) P.set(k.voiceAssetId, k);
    return P;
  }, [f]), N = E.useMemo(() => {
    const P = m.trim().toLowerCase();
    return P ? s.filter((k) => k.characterName.toLowerCase().includes(P)) : s;
  }, [s, m]), _ = E.useMemo(
    () => s.find((P) => P.mappingId === h) ?? null,
    [s, h]
  );
  E.useEffect(() => {
    o(a), d(r), p(a[0]?.mappingId ?? null);
  }, [a, r]), E.useEffect(() => {
    if (!T) return;
    const P = setTimeout(() => R(null), 2600);
    return () => clearTimeout(P);
  }, [T]);
  const q = E.useCallback(async () => {
    const P = await yd(n.deploymentId);
    d(P.voiceAssets);
  }, [n.deploymentId]), L = E.useCallback(
    (P) => {
      o(
        (k) => k.map((le) => le.mappingId === h ? { ...le, ...P } : le)
      );
    },
    [h]
  ), K = E.useCallback(
    async (P) => {
      if (!_) return;
      const k = _;
      try {
        const le = await $R(_.mappingId, P);
        o((de) => de.map((se) => se.mappingId === le.mappingId ? le : se));
      } catch (le) {
        o(
          (de) => de.map((se) => se.mappingId === k.mappingId ? k : se)
        ), S(Ei(le));
      }
    },
    [_]
  ), I = E.useCallback(async () => {
    const P = f[0];
    if (!P) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const k = Gz(s), le = await cb(n.deploymentId, {
        characterName: k,
        speakerVoiceAssetId: P.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((de) => [...de, le]), p(le.mappingId);
    } catch (k) {
      S(Ei(k));
    }
  }, [n.deploymentId, f, s]), $ = E.useCallback(async () => {
    if (_ && confirm(`Deactivate mapping for ${_.characterName}?`))
      try {
        await IR(n.deploymentId, _.mappingId), o((P) => P.filter((k) => k.mappingId !== _.mappingId)), p(null), R(`Mapping for ${_.characterName} deactivated.`);
      } catch (P) {
        S(Ei(P));
      }
  }, [n.deploymentId, _]), ee = E.useCallback(
    async (P, k, le) => {
      try {
        const de = await iM(n.deploymentId, P, k, le);
        return d((se) => [de, ...se]), R(`${de.displayName} uploaded.`), de;
      } catch (de) {
        return S(Ei(de)), null;
      }
    },
    [n.deploymentId]
  ), j = E.useCallback(async () => {
    try {
      const P = await JR(n.deploymentId);
      Qz(P, `${n.deploymentId}-mappings.json`), R("Mappings exported to JSON.");
    } catch (P) {
      S(Ei(P));
    }
  }, [n.deploymentId]), W = E.useCallback(
    async (P, k) => {
      try {
        const le = await WR(
          n.deploymentId,
          P.mappings,
          k
        );
        R(
          `Imported ${le.created.length} • skipped ${le.skipped.length} • replaced ${le.replaced.length}.`
        );
        const de = await yd(n.deploymentId);
        d(de.voiceAssets);
      } catch (le) {
        S(Ei(le));
      }
    },
    [n.deploymentId]
  ), te = E.useCallback(
    async (P, k) => {
      if (!_) return;
      const le = P.trim() || `[${_.characterName}] This is a test of the voice.`;
      try {
        const de = await aM(n.deploymentId, {
          line: le,
          outputFormat: k
        });
        R(`Test-line queued • run ${de.runId.slice(0, 12)}… • ETA ${Math.round(de.etaSeconds)}s`);
      } catch (de) {
        S(Ei(de));
      }
    },
    [n.deploymentId, _]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: WN, children: [
    /* @__PURE__ */ b.jsxs("aside", { className: ez, "aria-label": "Character mappings", children: [
      /* @__PURE__ */ b.jsxs("header", { className: tz, children: [
        /* @__PURE__ */ b.jsxs("div", { children: [
          /* @__PURE__ */ b.jsx("h1", { className: nz, children: "Mappings" }),
          /* @__PURE__ */ b.jsxs("span", { className: az, children: [
            s.length,
            " active · ",
            f.length,
            " voice",
            f.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ b.jsx("button", { type: "button", className: s1, onClick: I, children: "+ Add" })
      ] }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "search",
          className: iz,
          placeholder: "Search characters",
          value: m,
          onChange: (P) => g(P.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ b.jsx(Yz, { onExport: j, onImport: W }),
      /* @__PURE__ */ b.jsx("div", { className: lz, children: N.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: dz, children: "No mappings yet. Click Add to create one." }) : N.map((P) => {
        const k = w.get(P.speakerVoiceAssetId), le = P.mappingId === h;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            className: le ? sz : rz,
            onClick: () => p(P.mappingId),
            "aria-pressed": le,
            children: [
              /* @__PURE__ */ b.jsx("span", { className: oz, "aria-hidden": "true", children: kz(P.characterName) }),
              /* @__PURE__ */ b.jsxs("span", { className: uz, children: [
                /* @__PURE__ */ b.jsx("span", { className: cz, children: P.characterName }),
                /* @__PURE__ */ b.jsxs("span", { className: fz, children: [
                  P.defaultEmotionMode,
                  " · ",
                  k?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          P.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: hz, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ b.jsx(nD, { children: T && /* @__PURE__ */ b.jsx(
        Lh.div,
        {
          className: jz,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }),
      v && /* @__PURE__ */ b.jsx("div", { className: Dz, role: "alert", children: v }),
      _ ? /* @__PURE__ */ b.jsx(
        Bz,
        {
          mapping: _,
          voiceAssets: f,
          onNameChange: (P) => {
            L({ characterName: P });
          },
          onNameBlur: (P) => {
            P !== _.characterName && P.trim() && K({ characterName: P.trim() });
          },
          onSpeakerChange: (P) => {
            L({ speakerVoiceAssetId: P }), K({ speakerVoiceAssetId: P });
          },
          onModeChange: (P) => {
            L({ defaultEmotionMode: P }), K({ defaultEmotionMode: P });
          },
          onQwenChange: (P) => {
            L({ defaultQwenTemplate: P });
          },
          onQwenBlur: (P) => {
            K({ defaultQwenTemplate: P });
          },
          onSpeedChange: (P) => {
            L({ defaultSpeedFactor: P });
          },
          onSpeedCommit: (P) => {
            K({ defaultSpeedFactor: P });
          },
          onEmotionVoiceChange: (P) => {
            const k = P || null;
            L({ defaultEmotionVoiceAssetId: k }), K({ defaultEmotionVoiceAssetId: k });
          },
          onDelete: $,
          onUploadVoice: async (P, k, le) => {
            const de = await ee(P, k, le);
            return de && le === "speaker" && (L({ speakerVoiceAssetId: de.voiceAssetId }), K({ speakerVoiceAssetId: de.voiceAssetId })), await q(), de;
          },
          onTestLine: te
        }
      ) : /* @__PURE__ */ b.jsx(
        Uz,
        {
          voiceCount: f.length,
          onUploadVoice: async (P) => {
            await ee(P, P.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function Uz({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ b.jsxs("div", { className: uu, style: { padding: "3rem 2rem" }, children: [
    /* @__PURE__ */ b.jsxs("div", { style: { textAlign: "center", marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ b.jsx(
        "h2",
        {
          style: {
            fontFamily: "var(--font-display, var(--font))",
            fontSize: "1.4rem",
            margin: "0 0 0.75rem",
            color: "var(--text)"
          },
          children: "Upload your first voice"
        }
      ),
      /* @__PURE__ */ b.jsxs(
        "p",
        {
          style: {
            fontFamily: "var(--font)",
            fontSize: "1rem",
            color: "var(--text-muted)",
            maxWidth: "44ch",
            margin: "0 auto",
            lineHeight: 1.5
          },
          children: [
            "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
            /* @__PURE__ */ b.jsx("strong", { children: "+ Add" }),
            " ",
            "on the left to map a character to it."
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(
      o1,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (r) => (await a(r), null)
      }
    )
  ] }) : /* @__PURE__ */ b.jsx("div", { className: uu, style: { textAlign: "center", padding: "4rem" }, children: /* @__PURE__ */ b.jsxs("p", { style: { fontFamily: "var(--font)", fontSize: "1.1rem", color: "var(--text-muted)" }, children: [
    "Select a character on the left, or click ",
    /* @__PURE__ */ b.jsx("strong", { children: "+ Add" }),
    " to create one."
  ] }) });
}
function Bz(n) {
  const { mapping: a, voiceAssets: r } = n, s = r.find((m) => m.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = r.find((m) => m.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [f, d] = E.useState(""), [h, p] = E.useState("mp3");
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs("header", { className: mz, children: [
      /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsx("span", { className: yz, children: "Character" }),
        /* @__PURE__ */ b.jsx("h2", { className: pz, children: a.characterName })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: r1, children: /* @__PURE__ */ b.jsx("button", { type: "button", className: wz, onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Nz, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "text",
          className: zz,
          placeholder: `[${a.characterName}] This is a test of the voice.`,
          value: f,
          onChange: (m) => d(m.currentTarget.value),
          "aria-label": "Test-line text"
        }
      ),
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          className: Cl,
          value: h,
          onChange: (m) => p(m.currentTarget.value),
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
          className: s1,
          onClick: () => n.onTestLine(f, h),
          children: "Test this line"
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: gz, children: [
      /* @__PURE__ */ b.jsxs("div", { className: uu, children: [
        /* @__PURE__ */ b.jsxs("label", { className: Ur, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Character name" }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              className: Cl,
              value: a.characterName,
              onChange: (m) => n.onNameChange(m.currentTarget.value),
              onBlur: (m) => n.onNameBlur(m.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: Ur, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion mode" }),
          /* @__PURE__ */ b.jsx(
            "select",
            {
              className: Cl,
              value: a.defaultEmotionMode,
              onChange: (m) => n.onModeChange(m.currentTarget.value),
              children: Lz.map((m) => /* @__PURE__ */ b.jsx("option", { value: m, children: Pz(m) }, m))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { className: Ur, children: [
          /* @__PURE__ */ b.jsxs("span", { className: Ti, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ b.jsx(
            "textarea",
            {
              className: vz,
              value: a.defaultQwenTemplate ?? "",
              onChange: (m) => n.onQwenChange(m.currentTarget.value),
              onBlur: (m) => n.onQwenBlur(m.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ b.jsxs("label", { className: Ur, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion reference" }),
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: Cl,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (m) => n.onEmotionVoiceChange(m.currentTarget.value),
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— none —" }),
                r.map((m) => /* @__PURE__ */ b.jsxs("option", { value: m.voiceAssetId, children: [
                  m.displayName,
                  " · ",
                  m.kind
                ] }, m.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: Ur, children: [
          /* @__PURE__ */ b.jsxs("span", { className: Ti, children: [
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
              onChange: (m) => n.onSpeedChange(Number(m.currentTarget.value)),
              onMouseUp: (m) => n.onSpeedCommit(Number(m.currentTarget.value)),
              onTouchEnd: (m) => n.onSpeedCommit(Number(m.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: uu, children: [
        /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Speaker reference" }),
        /* @__PURE__ */ b.jsx(
          Hz,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ b.jsx(j0, { voice: s }),
        /* @__PURE__ */ b.jsx(
          o1,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (m) => n.onUploadVoice(m, m.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion reference voice" }),
          /* @__PURE__ */ b.jsx(j0, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function Hz({
  value: n,
  voices: a,
  onChange: r
}) {
  return /* @__PURE__ */ b.jsxs(
    "select",
    {
      className: Cl,
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
function j0({ voice: n }) {
  const a = Xz(n.durationMs ?? null);
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("div", { className: Tz, children: [
      /* @__PURE__ */ b.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ b.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ b.jsx("span", { children: Fz(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ b.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ b.jsxs("div", { className: Ez, children: [
      /* @__PURE__ */ b.jsx("div", { className: Rz, children: /* @__PURE__ */ b.jsx(
        Lh.div,
        {
          className: Mz,
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
          className: a.level === "warn" ? Az : Cz,
          children: a.message
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(qz, { seed: n.contentSha256 })
  ] });
}
function qz({ seed: n }) {
  const a = E.useMemo(() => Kz(n, 48), [n]);
  return /* @__PURE__ */ b.jsx("div", { className: Oz, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ b.jsx(
    "span",
    {
      className: _z,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    s
  )) });
}
function o1({
  label: n,
  onFile: a
}) {
  const [r, s] = E.useState(!1), [o, f] = E.useState(!1), d = E.useRef(null), h = E.useCallback(
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
      className: o ? xz : r ? Sz : bz,
      onDragOver: (p) => {
        p.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (p) => {
        p.preventDefault(), s(!1);
        const m = p.dataTransfer.files?.[0];
        m && h(m);
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
              const m = p.currentTarget.files?.[0];
              m && h(m), p.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : n
      ]
    }
  );
}
function Yz({
  onExport: n,
  onImport: a
}) {
  const [r, s] = E.useState("error"), o = E.useRef(null);
  return /* @__PURE__ */ b.jsxs("div", { className: r1, children: [
    /* @__PURE__ */ b.jsx("button", { type: "button", className: D0, onClick: n, children: "Export JSON" }),
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
              const h = await d.text(), p = JSON.parse(h);
              a(p, r);
            } catch {
              alert("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ b.jsx("button", { type: "button", className: D0, onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ b.jsxs(
      "select",
      {
        className: Cl,
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
function Gz(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = n.length + 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function kz(n) {
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
function Xz(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function Fz(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function Kz(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function Qz(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ei(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
function Zz() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await ZR();
        return { deployments: n };
      },
      Component: RM
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Sl(n, "deploymentId");
        return aE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Sl(n, "deploymentId"), [r, { mappings: s }, { runs: o }, f] = await Promise.all([
          av(a),
          iv(a),
          eM(a, { limit: 10 }),
          lM(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: f };
      },
      Component: zj
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Sl(n, "deploymentId"), r = Sl(n, "runId");
        return { run: await fb(a, r) };
      },
      Component: vN
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Sl(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          av(a),
          iv(a),
          yd(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: Vz
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const r = Sl(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: r,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: JN
    },
    {
      path: "/runtime/queue",
      Component: QN
    }
  ];
}
function Sl(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const Yd = "emotion-tts-app", $z = "ext-event", N0 = "emotion-tts-stylesheet";
function Iz() {
  if (typeof document > "u" || document.getElementById(N0)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = N0, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
Iz();
class Jz extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = wT.createRoot(this), this.paint();
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
    const a = this.resolveInitialEntry(), r = cR(Zz(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ b.jsx(E.StrictMode, { children: /* @__PURE__ */ b.jsx(dR, { router: r }) })
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
      new CustomEvent($z, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function Wz() {
  typeof customElements > "u" || customElements.get(Yd) || customElements.define(Yd, Jz);
}
typeof customElements < "u" && !customElements.get(Yd) && Wz();
export {
  Wz as register
};
//# sourceMappingURL=emotion-tts.js.map
